/**
 * TuViInputForm — Birth Data Input Form
 * 
 * Collects: Solar/Lunar date, birth hour, gender, timezone, and optional name.
 * Validates input before triggering chart generation.
 * 
 * Supports edge cases:
 * - Users who only know their lunar (âm lịch) birthdate
 * - Users born outside Vietnam (non-GMT+7 timezones)
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { BIRTH_HOURS, type ChartInput, type Gender, type SchoolStrategy } from '../../services/tuvi/tuviTypes';
import { useAuthStore } from '../../stores/authStore';
import LocationPicker, { type SelectedLocation } from '../ChiemTinh/LocationPicker';
import { computeBirthContext } from '../../services/shared/birthContext';


interface TuViInputFormProps {
    readonly onGenerate: (input: ChartInput) => void;
    readonly isLoading?: boolean;
}

type DateType = 'solar' | 'lunar';


/** Compute Can Chi for a solar year */
function getCanChiYear(year: number): string {
    const STEMS = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
    const BRANCHES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
    let stemIdx = (year - 4) % 10;
    let branchIdx = (year - 4) % 12;
    if (stemIdx < 0) stemIdx += 10;
    if (branchIdx < 0) branchIdx += 12;
    return `${STEMS[stemIdx]} ${BRANCHES[branchIdx]}`;
}

/** Common timezone presets */
const TIMEZONE_OPTIONS: { value: number; label: string }[] = [
    { value: -12, label: 'GMT-12' },
    { value: -11, label: 'GMT-11' },
    { value: -10, label: 'GMT-10 (Hawaii)' },
    { value: -9, label: 'GMT-9 (Alaska)' },
    { value: -8, label: 'GMT-8 (Los Angeles)' },
    { value: -7, label: 'GMT-7 (Denver)' },
    { value: -6, label: 'GMT-6 (Chicago)' },
    { value: -5, label: 'GMT-5 (New York)' },
    { value: -4, label: 'GMT-4' },
    { value: -3, label: 'GMT-3 (São Paulo)' },
    { value: -2, label: 'GMT-2' },
    { value: -1, label: 'GMT-1' },
    { value: 0, label: 'GMT+0 (London)' },
    { value: 1, label: 'GMT+1 (Paris, Berlin)' },
    { value: 2, label: 'GMT+2 (Kyiv, Cairo)' },
    { value: 3, label: 'GMT+3 (Moscow)' },
    { value: 3.5, label: 'GMT+3:30 (Tehran)' },
    { value: 4, label: 'GMT+4 (Dubai)' },
    { value: 5, label: 'GMT+5' },
    { value: 5.5, label: 'GMT+5:30 (India)' },
    { value: 6, label: 'GMT+6 (Dhaka)' },
    { value: 7, label: 'GMT+7 (Việt Nam, Thái Lan)' },
    { value: 8, label: 'GMT+8 (Singapore, Trung Quốc)' },
    { value: 9, label: 'GMT+9 (Nhật Bản, Hàn Quốc)' },
    { value: 9.5, label: 'GMT+9:30 (Úc - Adelaide)' },
    { value: 10, label: 'GMT+10 (Úc - Sydney)' },
    { value: 11, label: 'GMT+11' },
    { value: 12, label: 'GMT+12 (New Zealand)' },
];

/** Shared input class for consistency */
const INPUT_CLASS = 'w-full px-3.5 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-subtle-light dark:bg-surface-subtle-dark text-text-primary-light dark:text-text-primary-dark text-sm focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all outline-none';
const SELECT_CLASS = `${INPUT_CLASS} appearance-none`;

export default function TuViInputForm({ onGenerate, isLoading = false }: TuViInputFormProps) {
    const user = useAuthStore(state => state.user);

    // Initial parsing from user
    const { initialDay, initialMonth, initialYear, initialHour, initialMinute, initialGender } = useMemo(() => {
        let y = new Date().getFullYear(), m = 1, d = 1, h = 12, min = 0;
        let pGender: Gender | undefined;
        if (user?.profile?.birthYear) {
            y = user.profile.birthYear;
            m = user.profile.birthMonth || 1;
            d = user.profile.birthDay || 1;
            h = typeof user.profile.birthHour === 'number' ? user.profile.birthHour : 12;
            min = typeof user.profile.birthMinute === 'number' ? user.profile.birthMinute : 0;
            pGender = user.profile.gender as Gender;
        } else if (user?.birthday) {
            const [py, pm, pd] = user.birthday.split('-').map(Number);
            if (!isNaN(py)) { y = py; m = pm; d = pd; }
        }
        return { initialDay: d, initialMonth: m, initialYear: y, initialHour: h, initialMinute: min, initialGender: pGender };
    }, [user]);

    // Date type state
    const [dateType, setDateType] = useState<DateType>('solar');

    // Solar date state
    const [day, setDay] = useState(String(initialDay));
    const [month, setMonth] = useState(String(initialMonth));
    const [year, setYear] = useState(String(initialYear));
    const [birthHour, setBirthHour] = useState(String(initialHour));
    const [birthMinute, setBirthMinute] = useState(String(initialMinute));

    // Lunar date state
    const currentYear = new Date().getFullYear();
    const [lunarDay, setLunarDay] = useState(1);
    const [lunarMonth, setLunarMonth] = useState(1);
    const [lunarYear, setLunarYear] = useState(currentYear);
    const [isLeapMonth, setIsLeapMonth] = useState(false);

    // Common state
    const [timeIndex, setTimeIndex] = useState<number>(0);
    const [gender, setGender] = useState<Gender>(initialGender || 'male');
    const [name, setName] = useState<string>(user?.displayName || '');
    const [timeZone, setTimeZone] = useState<number>(7); // Default GMT+7 (kept for legacy/fallback)
    const [latitude, setLatitude] = useState<string>(user?.extendedProfile?.birthLocation ? String(user.extendedProfile.birthLocation.lat) : '');
    const [longitude, setLongitude] = useState<string>(user?.extendedProfile?.birthLocation ? String(user.extendedProfile.birthLocation.lng) : '');
    const [locationName, setLocationName] = useState<string>(user?.extendedProfile?.birthLocation?.city || '');
    const [school, setSchool] = useState<SchoolStrategy>('vi');
    const [error, setError] = useState<string>('');

    // ─── Location selection handler ─────────────────────────────────────
    const handleLocationSelect = useCallback((loc: SelectedLocation) => {
        setLatitude(loc.lat.toString());
        setLongitude(loc.lng.toString());
        setTimeZone(loc.timezone);
        setLocationName(loc.locationName);
    }, []);

    // Auto-update Timezone based on selected SchoolStrategy
    useEffect(() => {
        if (school === 'cn' || school === 'tw') {
            setTimeZone(8);
        } else if (school === 'vi') {
            setTimeZone(7);
        }
    }, [school]);

    // Generate year options (1900-2100)
    const yearOptions = useMemo(() => {
        const years: number[] = [];
        for (let y = currentYear; y >= 1900; y--) years.push(y);
        for (let y = currentYear + 1; y <= 2100; y++) years.push(y);
        return years;
    }, [currentYear]);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (dateType === 'solar') {
            const m = parseInt(month);
            const d = parseInt(day);
            const y = parseInt(year);
            const h = parseInt(birthHour) || 12;
            const min = parseInt(birthMinute) || 0;

            if (isNaN(m) || m < 1 || m > 12) { setError('Tháng phải từ 1 đến 12.'); return; }
            if (isNaN(d) || d < 1 || d > 31) { setError('Ngày phải từ 1 đến 31.'); return; }
            if (isNaN(y) || y < 1900 || y > 2100) { setError('Năm sinh phải từ 1900 đến 2100.'); return; }
            if (h < 0 || h > 23) { setError('Giờ phải từ 0 đến 23.'); return; }
            if (min < 0 || min > 59) { setError('Phút phải từ 0 đến 59.'); return; }

            const dateObj = new Date(y, m - 1, d);
            if (dateObj.getFullYear() !== y || dateObj.getMonth() !== m - 1 || dateObj.getDate() !== d) {
                setError(`Ngày ${d}/${m}/${y} không hợp lệ.`);
                return;
            }
            
            // Map solar clock hour (0-23) to Tử Vi timeIndex (0-12)
            const mapHourToTimeIndex = (hr: number) => {
                if (hr === 23 || hr === 0) return 0;
                return Math.ceil(hr / 2);
            };

            onGenerate({
                dateType: 'solar',
                solarDate: `${y}-${m}-${d}`, // Format required for Iztro
                timeIndex: mapHourToTimeIndex(h),
                gender,
                name: name.trim(),
                timeZone,
                school,
            });
        } else {
            // Lunar mode
            if (!lunarDay || !lunarMonth || !lunarYear) {
                setError('Vui lòng nhập đầy đủ ngày tháng năm âm lịch.');
                return;
            }
            if (lunarYear < 1900 || lunarYear > 2100) {
                setError('Năm sinh phải từ 1900 đến 2100.');
                return;
            }
            onGenerate({
                dateType: 'lunar',
                solarDate: '',
                lunarDay,
                lunarMonth,
                lunarYear,
                isLeapMonth,
                timeIndex,
                gender,
                name: name.trim(),
                timeZone,
                school,
            });
        }
    }, [dateType, day, month, year, birthHour, birthMinute, lunarDay, lunarMonth, lunarYear, isLeapMonth, timeIndex, gender, name, timeZone, latitude, longitude, school, onGenerate]);

    return (
        <form onSubmit={handleSubmit} className="card-surface" id="tuvi-input-form">
            <div className="card-header">
                <div className="text-center w-full space-y-1">
                    <h2 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark flex items-center justify-center gap-2">
                        <span className="material-icons-round text-xl text-gold dark:text-gold-dark">auto_awesome</span>
                        Lập Lá Số Tử Vi
                    </h2>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        Nhập thông tin ngày sinh để xem lá số Tử Vi Đẩu Số
                    </p>
                </div>
            </div>

            <div className="p-5 space-y-5">
                {/* ① Thông tin cá nhân */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-gold dark:text-gold-dark">
                        <span className="w-5 h-5 rounded-full bg-gold/10 dark:bg-gold-dark/10 flex items-center justify-center text-xs font-bold">1</span>
                        Thông tin cá nhân
                    </div>
                    <div>
                        <label htmlFor="tuvi-name" className="label-standard block mb-1.5">Họ và tên</label>
                        <input
                            id="tuvi-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="(tùy chọn)"
                            className={INPUT_CLASS}
                            maxLength={50}
                        />
                    </div>
                </div>

                {/* ② Ngày giờ sinh */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-gold dark:text-gold-dark">
                        <span className="w-5 h-5 rounded-full bg-gold/10 dark:bg-gold-dark/10 flex items-center justify-center text-xs font-bold">2</span>
                        Ngày giờ sinh
                    </div>

                {/* ── Date Type Toggle ─────────────────── */}
                <div>
                    <span className="label-standard block mb-1.5">
                        Loại lịch ngày sinh <span className="text-red-500">*</span>
                    </span>
                    <div className="flex rounded-xl overflow-hidden border border-border-light dark:border-border-dark">
                        {([
                            { value: 'solar' as DateType, label: 'Dương lịch' },
                            { value: 'lunar' as DateType, label: 'Âm lịch' },
                        ]).map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => setDateType(opt.value)}
                                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-semibold transition-all duration-200 ${dateType === opt.value
                                    ? 'bg-gold/15 dark:bg-gold-dark/15 text-gold dark:text-gold-dark'
                                    : 'bg-surface-subtle-light dark:bg-surface-subtle-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-gold/5'
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Date Input (Solar or Lunar) + Hour ── */}
                {dateType === 'solar' ? (
                    <div>
                        <label className="label-standard block mb-1.5">
                            Ngày giờ sinh (dương lịch) <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-5 gap-2">
                            <input type="number" value={day} onChange={e => setDay(e.target.value)} placeholder="Ngày" min="1" max="31" required
                                className="px-3 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-sm text-center focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none" />
                            <input type="number" value={month} onChange={e => setMonth(e.target.value)} placeholder="Tháng" min="1" max="12" required
                                className="px-3 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-sm text-center focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none" />
                            <input type="number" value={year} onChange={e => setYear(e.target.value)} placeholder="Năm" min="1900" max="2100" required
                                className="px-3 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-sm text-center focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none" />
                            <input type="number" value={birthHour} onChange={e => setBirthHour(e.target.value)} placeholder="Giờ" min="0" max="23" required
                                className="px-3 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-sm text-center focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none" />
                            <input type="number" value={birthMinute} onChange={e => setBirthMinute(e.target.value)} placeholder="Phút" min="0" max="59" required
                                className="px-3 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-sm text-center focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none" />
                        </div>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1.5 opacity-80">
                            Định dạng: Ngày / Tháng / Năm / Giờ / Phút. Giờ sinh quyết định Cung Mệnh.
                        </p>
                    </div>
                ) : (
                    /* Lunar: Day/Month/Year dropdowns + Leap + Hour */
                    <div className="space-y-4">
                        <div>
                            <label className="label-standard block mb-1.5">
                                Ngày sinh (âm lịch) <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {/* Lunar Day */}
                                <select
                                    value={lunarDay}
                                    onChange={(e) => setLunarDay(Number(e.target.value))}
                                    className={SELECT_CLASS}
                                    aria-label="Ngày âm lịch"
                                >
                                    {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                                        <option key={d} value={d}>Ngày {d}</option>
                                    ))}
                                </select>
                                {/* Lunar Month */}
                                <select
                                    value={lunarMonth}
                                    onChange={(e) => setLunarMonth(Number(e.target.value))}
                                    className={SELECT_CLASS}
                                    aria-label="Tháng âm lịch"
                                >
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                                        <option key={m} value={m}>Tháng {m}</option>
                                    ))}
                                </select>
                                {/* Lunar Year */}
                                <select
                                    value={lunarYear}
                                    onChange={(e) => setLunarYear(Number(e.target.value))}
                                    className={SELECT_CLASS}
                                    aria-label="Năm âm lịch"
                                >
                                    {yearOptions.map((y) => (
                                        <option key={y} value={y}>{getCanChiYear(y)} ({y} DL)</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Leap month + Hour row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="tuvi-hour-lunar" className="label-standard block mb-1.5">
                                    Giờ sinh <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="tuvi-hour-lunar"
                                    value={timeIndex}
                                    onChange={(e) => setTimeIndex(Number(e.target.value))}
                                    required
                                    className={SELECT_CLASS}
                                >
                                    {BIRTH_HOURS.map((h) => (
                                        <option key={h.index} value={h.index}>
                                            Giờ {h.label} ({h.timeRange})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-end pb-1">
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={isLeapMonth}
                                        onChange={(e) => setIsLeapMonth(e.target.checked)}
                                        className="w-4 h-4 rounded border-border-light dark:border-border-dark accent-gold"
                                    />
                                    <span className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark font-medium">
                                        Tháng nhuận
                                    </span>
                                    <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                                        (nếu có)
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                )}
                </div>

                {/* ③ Nơi sinh */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-gold dark:text-gold-dark">
                        <span className="w-5 h-5 rounded-full bg-gold/10 dark:bg-gold-dark/10 flex items-center justify-center text-xs font-bold">3</span>
                        Nơi sinh
                    </div>
                    <LocationPicker
                        onSelect={handleLocationSelect}
                        initialLat={parseFloat(latitude) || undefined}
                        initialLng={parseFloat(longitude) || undefined}
                        initialLocationName={locationName || undefined}
                    />
                </div>

                {/* ④ Thông tin bổ sung */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-gold dark:text-gold-dark">
                        <span className="w-5 h-5 rounded-full bg-gold/10 dark:bg-gold-dark/10 flex items-center justify-center text-xs font-bold">4</span>
                        Thông tin bổ sung
                    </div>



                {/* ── Astrology School Selector ─────────── */}
                <div>
                    <label htmlFor="tuvi-school" className="label-standard block mb-1.5">
                        Trường phái An Sao
                    </label>
                    <select
                        id="tuvi-school"
                        value={school}
                        onChange={(e) => setSchool(e.target.value as SchoolStrategy)}
                        className={SELECT_CLASS}
                    >
                        <option value="vi">Việt Nam (Lịch hiệp kỷ, UTC+7)</option>
                        <option value="cn">Trung Châu Phái (Trung Quốc, UTC+8)</option>
                        <option value="tw">Bắc Phái Phi Tinh (Đài Loan, UTC+8)</option>
                    </select>
                </div>

                {/* Gender */}
                <fieldset>
                    <legend className="label-standard mb-2">
                        Giới tính <span className="text-red-500">*</span>
                    </legend>
                    <div className="flex gap-3">
                        {([
                            { value: 'male' as Gender, label: 'Nam' },
                            { value: 'female' as Gender, label: 'Nữ' },
                        ]).map((opt) => (
                            <label
                                key={opt.value}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all duration-200 text-sm font-medium ${gender === opt.value
                                    ? 'border-gold bg-gold text-white shadow-md dark:border-gold-dark dark:bg-gold-dark dark:text-gray-900'
                                    : 'border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:border-gold/40 hover:bg-black/5 dark:hover:bg-white/5'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="tuvi-gender"
                                    value={opt.value}
                                    checked={gender === opt.value}
                                    onChange={() => setGender(opt.value)}
                                    className="sr-only"
                                />
                                {opt.label}
                            </label>
                        ))}
                    </div>
                </fieldset>
                </div>

                {/* Error */}
                {error && (
                    <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3.5 py-2.5 rounded-xl" role="alert">
                        <span className="material-icons-round text-base" aria-hidden="true">error_outline</span>
                        {error}
                    </div>
                )}

                {/* Submit & Secondary Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-gold via-gold-light to-amber-500 text-white font-bold text-sm shadow-md hover:shadow-lg hover:brightness-110 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                                Đang tính toán...
                            </>
                        ) : (
                            <>Lập Lá Số</>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => alert('Chức năng Lưu lá số & Theo dõi vận hạn yêu cầu tài khoản Lịch Việt Premium. Hiện đang trong quá trình phát triển.')}
                        className="flex-1 py-3 px-6 rounded-xl bg-surface-subtle-light dark:bg-surface-subtle-dark border border-gold/30 text-gold dark:text-gold-dark font-bold text-sm shadow-sm hover:bg-gold/5 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <span className="material-icons-round text-sm" aria-hidden="true">bookmark_add</span>
                        Lưu lá số 
                    </button>
                </div>
            </div>
        </form>
    );
}
