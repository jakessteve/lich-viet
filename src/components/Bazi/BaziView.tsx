/**
 * BaziView — Bát Tự / Tứ Trụ Main View
 *
 * Four Pillars of Destiny with unified multi-school analysis.
 */

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { generateBaziChart, type BaziChart, type BaziSchool, type BaziInput } from '@lich-viet/core/bazi';
import { getSolarDate as getVnSolarDate } from '../../packages/vn-lunar';
import { BIRTH_HOURS, type Gender } from '../../services/tuvi/tuviTypes';
import {
  TIMEZONE_OPTIONS,
  INPUT_CLASS,
  SELECT_CLASS,
  timeZoneToLongitude,
  getCanChiYearLabel,
  type DateType,
} from './baziConstants';
import BaziResultsView from './BaziResultsView';
import LocationPicker, { type SelectedLocation } from '../ChiemTinh/LocationPicker';
import { computeBirthContext } from '../../services/shared/birthContext';




// ── Main View ──────────────────────────────────────────────────

export default function BaziView() {
  const user = useAuthStore((s) => s.user);
  const [name, setName] = useState('');
  // Initial parsing from user profile/birthday
  const { initialDay, initialMonth, initialYear, initialHour, initialMinute, initialGender, hasPrefill } = useMemo(() => {
      let y = new Date().getFullYear(), m = 1, d = 1, h = 12, min = 0;
      let pGender: Gender | undefined;
      let hasPrefill = false;
      if (user?.profile?.birthYear) {
          y = user.profile.birthYear;
          m = user.profile.birthMonth || 1;
          d = user.profile.birthDay || 1;
          h = typeof user.profile.birthHour === 'number' ? user.profile.birthHour : 12;
          min = typeof user.profile.birthMinute === 'number' ? user.profile.birthMinute : 0;
          pGender = user.profile.gender as Gender;
          hasPrefill = true;
      } else if (user?.birthday) {
          const [py, pm, pd] = user.birthday.split('-').map(Number);
          if (!isNaN(py)) { y = py; m = pm; d = pd; hasPrefill = true; }
      }
      return { initialDay: d, initialMonth: m, initialYear: y, initialHour: h, initialMinute: min, initialGender: pGender, hasPrefill };
  }, [user]);

  const [dateType, setDateType] = useState<DateType>('solar');
  const [birthdayPrefilled] = useState(hasPrefill);
  
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

  // Lunar mode: Địa Chi time index
  const [lunarTimeIndex, setLunarTimeIndex] = useState(0);
  const [gender, setGender] = useState<'male' | 'female'>(initialGender || 'male');
  
  // Location/Timezone
  const [timeZone, setTimeZone] = useState<number>(7); // Default GMT+7
  const [latitude, setLatitude] = useState<string>(user?.extendedProfile?.birthLocation ? String(user.extendedProfile.birthLocation.lat) : '');
  const [longitude, setLongitude] = useState<string>(user?.extendedProfile?.birthLocation ? String(user.extendedProfile.birthLocation.lng) : '');
  const [locationName, setLocationName] = useState<string>(user?.extendedProfile?.birthLocation?.city || '');

  const [school, setSchool] = useState<BaziSchool>('vi');
  const [baziInput, setBaziInput] = useState<BaziInput | null>(null);
  const [chart, setChart] = useState<BaziChart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLocationSelect = useCallback((loc: SelectedLocation) => {
      setLatitude(loc.lat.toString());
      setLongitude(loc.lng.toString());
      setTimeZone(loc.timezone);
      setLocationName(loc.locationName);
  }, []);

  // Year options for lunar dropdown (current year first, then descending, then ascending)
  const yearOptions = useMemo(() => {
    const years: number[] = [];
    for (let y = currentYear; y >= 1900; y--) years.push(y);
    for (let y = currentYear + 1; y <= 2100; y++) years.push(y);
    return years;
  }, [currentYear]);

  const handleGenerate = useCallback((targetSchool: BaziSchool = school) => {
    setError('');

    const latStr = parseFloat(latitude);
    const lngStr = parseFloat(longitude);
    const hasValidLocation = !isNaN(latStr) && !isNaN(lngStr);
    const usedLongitude = hasValidLocation ? lngStr : timeZoneToLongitude(timeZone);

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

      const dateObj = new Date(y, m - 1, d, h, min, 0);
      if (dateObj.getFullYear() !== y || dateObj.getMonth() !== m - 1 || dateObj.getDate() !== d) {
          setError(`Ngày ${d}/${m}/${y} không hợp lệ.`);
          return;
      }

      // If location provided, use computeBirthContext to get TST
      let exactTstHour = h + (min / 60);
      if (hasValidLocation) {
        const ctx = computeBirthContext(dateObj, { latitude: latStr, longitude: lngStr, timezone: timeZone });
        const tst = ctx.trueSolarTime;
        exactTstHour = tst.getHours() + (tst.getMinutes() / 60);
      }

      setIsLoading(true);
      setTimeout(() => {
        try {
          const result = generateBaziChart(dateObj, exactTstHour, gender === 'male', usedLongitude, true, targetSchool);
          setChart(result);
          setBaziInput({ dateObj, exactTstHour, isMale: gender === 'male', longitude: usedLongitude, school: targetSchool });
        } catch (e) {
          setError(e instanceof Error ? e.message : 'Có lỗi xảy ra.');
        }
        setIsLoading(false);
      }, 800);
    } else {
      // Lunar mode: convert to solar first
      if (!lunarDay || !lunarMonth || !lunarYear) {
        setError('Vui lòng nhập đầy đủ ngày tháng năm âm lịch.');
        return;
      }
      if (lunarYear < 1900 || lunarYear > 2100) {
        setError('Năm sinh phải từ 1900 đến 2100.');
        return;
      }

      // Map Địa Chi index to representative hour for the engine
      const chiHourMap = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
      let effectiveHour = chiHourMap[lunarTimeIndex % 12] ?? 0;
      
      setIsLoading(true);
      setTimeout(() => {
        try {
          const solar = getVnSolarDate(lunarDay, lunarMonth, lunarYear, isLeapMonth);
          const solarDateObj = new Date(solar.year, solar.month - 1, solar.day, Math.floor(effectiveHour), 0, 0);
          
          if (hasValidLocation) {
            const ctx = computeBirthContext(solarDateObj, { latitude: latStr, longitude: lngStr, timezone: timeZone });
            const tst = ctx.trueSolarTime;
            effectiveHour = tst.getHours() + (tst.getMinutes() / 60);
          }

          const result = generateBaziChart(solarDateObj, effectiveHour, gender === 'male', usedLongitude, true, targetSchool);
          setChart(result);
          setBaziInput({ dateObj: solarDateObj, exactTstHour: effectiveHour, isMale: gender === 'male', longitude: usedLongitude, school: targetSchool });
        } catch (e) {
          setError(e instanceof Error ? e.message : 'Có lỗi xảy ra.');
        }
        setIsLoading(false);
      }, 800);
    }
  }, [dateType, day, month, year, birthHour, birthMinute, lunarDay, lunarMonth, lunarYear, isLeapMonth, lunarTimeIndex, gender, timeZone, latitude, longitude, school]);

  const isValid = dateType === 'solar' ? (day && month && year && birthHour) : (lunarDay && lunarMonth && lunarYear);

  const handleReset = useCallback(() => {
    setChart(null);
    setBaziInput(null);
    setError('');
  }, []);

  return (
    <div className="space-y-6">
      {/* Input Card — matches Tử Vi layout */}
      {!chart && (
        <form
          className="card-surface"
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerate();
          }}
        >
          <div className="card-header">
            <div className="text-center w-full space-y-1">
              <h2 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark flex items-center justify-center gap-2">
                <span className="material-icons-round text-xl text-red-500 dark:text-red-400">local_fire_department</span>
                Lập Lá Số Bát Tự
              </h2>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                Phân tích Tứ Trụ theo thuật toán đa trường phái: Tử Bình · Cách Cục · Điều Hậu
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 space-y-5">
            {/* ① Thông tin cá nhân */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-gold dark:text-gold-dark">
                <span className="w-5 h-5 rounded-full bg-gold/10 dark:bg-gold-dark/10 flex items-center justify-center text-xs font-bold">1</span>
                Thông tin cá nhân
              </div>
              <div>
                <label htmlFor="bazi-name" className="label-standard block mb-1.5">Tên (tùy chọn)</label>
                <input
                  id="bazi-name"
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

              {/* ── Date Input + Hour ── */}
              {dateType === 'solar' ? (
                <div>
                  <label className="label-standard block mb-1.5 flex items-center gap-2">
                    <span>Ngày giờ sinh (dương lịch) <span className="text-red-500">*</span></span>
                    {birthdayPrefilled && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                        🎂 Đã điền từ hồ sơ
                      </span>
                    )}
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
                      Định dạng: Ngày / Tháng / Năm / Giờ / Phút.
                  </p>
                </div>
              ) : (
                /* Lunar: Day/Month/Year dropdowns + Leap + Địa Chi hour */
                <div className="space-y-4">
                  <div>
                    <label className="label-standard block mb-1.5">
                      Ngày sinh (âm lịch) <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
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
                      <select
                        value={lunarYear}
                        onChange={(e) => setLunarYear(Number(e.target.value))}
                        className={SELECT_CLASS}
                        aria-label="Năm âm lịch"
                      >
                        {yearOptions.map((y) => (
                          <option key={y} value={y}>{getCanChiYearLabel(y)} ({y} DL)</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Leap month + Địa Chi hour */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="bazi-hour-lunar" className="label-standard block mb-1.5">
                        Giờ sinh <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="bazi-hour-lunar"
                        value={lunarTimeIndex}
                        onChange={(e) => setLunarTimeIndex(Number(e.target.value))}
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
                        <span className="text-sm text-text-primary-light dark:text-text-primary-dark font-medium">
                          Tháng nhuận
                        </span>
                        <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">(nếu có)</span>
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



              {/* Gender */}
              <fieldset>
                <legend className="label-standard mb-2">
                  Giới tính <span className="text-red-500">*</span>
                </legend>
                <div className="flex gap-3">
                  {([
                    { value: 'male' as const, label: 'Nam' },
                    { value: 'female' as const, label: 'Nữ' },
                  ]).map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all duration-200 text-sm font-medium ${gender === opt.value
                        ? 'border-gold bg-gold/10 dark:bg-gold-dark/10 text-gold dark:text-gold-dark'
                        : 'border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:border-gold/40'
                        }`}
                    >
                      <input
                        type="radio"
                        name="bazi-gender"
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

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-gold via-gold-light to-amber-500 text-white font-bold text-sm shadow-md hover:shadow-lg hover:brightness-110 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  Đang lập Tứ Trụ...
                </>
              ) : (
                <>
                  Lập Lá Số Bát Tự
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="glass-card p-8 flex flex-col items-center gap-4 animate-fade-in-up">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center">
            <span
              className="material-icons-round text-3xl text-amber-500 dark:text-amber-400 animate-spin"
              style={{ animationDuration: '2s' }}
            >
              temple_buddhist
            </span>
          </div>
          <p className="font-semibold text-text-primary-light dark:text-text-primary-dark">Đang phân tích Tứ Trụ...</p>
          <div className="w-48 h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-red-500 to-rose-500 loading-shimmer"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      )}

      {/* Results */}
      {chart && !isLoading && (
        <div className="space-y-4 animate-fade-in-up" id="bazi-workspace">
            {/* Action toolbar */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
                {/* Left side info */}
                <div className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark font-medium px-2">
                    <span className="material-icons-round text-base text-gold dark:text-gold-dark">library_books</span>
                    So Sánh & Phân Tích:
                </div>
                {/* Right Actions */}
                <div className="flex items-center gap-2">
                    <select
                        value={chart.school || 'vi'}
                        onChange={(e) => {
                            const newSchool = e.target.value as BaziSchool;
                            setSchool(newSchool);
                            handleGenerate(newSchool);
                        }}
                        className="px-4 py-2 rounded-full text-xs font-semibold border-2 border-border-light dark:border-border-dark bg-surface-subtle-light dark:bg-surface-subtle-dark text-text-primary-light dark:text-text-primary-dark appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all relative custom-select-arrow"
                        style={{
                            paddingRight: '2.5rem',
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: `right 0.75rem center`,
                            backgroundRepeat: `no-repeat`,
                            backgroundSize: `1.5em 1.5em`
                        }}
                    >
                        <option value="vi">Việt Nam (Lý Số)</option>
                        <option value="cn">Trung Châu Phái</option>
                        <option value="tw">Bắc Phái (Đài Loan)</option>
                    </select>
                </div>
            </div>

            {chart && baziInput && (
                <BaziResultsView chart={chart} input={baziInput} name={name} onReset={handleReset} />
            )}
        </div>
      )}
    </div>
  );
}
