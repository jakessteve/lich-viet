/**
 * BirthDataForm — Input form for birth data (date, time, location)
 * Uses LocationPicker with Nominatim geocoding for intuitive location selection.
 */

import React, { useState } from 'react';
import Icon from '../shared/Icon';
import LocationPicker, { type SelectedLocation } from './LocationPicker';
import type { BirthData, HouseSystemId } from '../../types/westernAstro';
import { DEFAULT_CHART_CONFIG } from '../../types/westernAstro';

/** House system options with Vietnamese labels */
const HOUSE_SYSTEM_OPTIONS: { id: HouseSystemId; label: string }[] = [
    { id: 'wholeSigns', label: 'Trọn Cung (Whole Sign)' },
    { id: 'placidus', label: 'Placidus' },
    { id: 'koch', label: 'Koch' },
    { id: 'equalHouse', label: 'Equal House' },
    { id: 'campanus', label: 'Campanus' },
    { id: 'regiomontanus', label: 'Regiomontanus' },
    { id: 'topocentric', label: 'Topocentric' },
    { id: 'porphyry', label: 'Porphyry' },
    { id: 'alcabitius', label: 'Alcabitius' },
    { id: 'morinus', label: 'Morinus' },
];

interface Props {
    onGenerate: (data: BirthData) => void;
    isLoading: boolean;
    /** Pre-fill birth data for edit-in-place mode */
    initialData?: BirthData | null;
    /** Current house system selection */
    houseSystem?: HouseSystemId;
    /** Callback when house system changes */
    onHouseSystemChange?: (hs: HouseSystemId) => void;
}

export default function BirthDataForm({ onGenerate, isLoading, initialData, houseSystem, onHouseSystemChange }: Props) {
    const [name, setName] = useState(initialData?.name ?? '');
    const [gender, setGender] = useState<'male' | 'female'>(initialData?.gender ?? 'male');
    const [day, setDay] = useState(initialData ? String(initialData.day) : '');
    const [month, setMonth] = useState(initialData ? String(initialData.month) : '');
    const [year, setYear] = useState(initialData ? String(initialData.year) : '');
    const [hour, setHour] = useState(initialData ? String(initialData.hour) : '');
    const [minute, setMinute] = useState(initialData ? String(initialData.minute) : '');
    const [latitude, setLatitude] = useState(initialData ? String(initialData.latitude) : '');
    const [longitude, setLongitude] = useState(initialData ? String(initialData.longitude) : '');
    const [timezone, setTimezone] = useState(initialData ? String(initialData.timezone) : '7');
    const [locationName, setLocationName] = useState(initialData?.locationName ?? '');
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    const selectedHouseSystem = houseSystem ?? DEFAULT_CHART_CONFIG.houseSystem;

    // ─── Location selection handler ─────────────────────────────────────

    const handleLocationSelect = (loc: SelectedLocation) => {
        setLatitude(loc.lat.toString());
        setLongitude(loc.lng.toString());
        setTimezone(loc.timezone.toString());
        setLocationName(loc.locationName);
    };

    // ─── Form submit ────────────────────────────────────────────────────

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setValidationError(null);

        const m = parseInt(month);
        const d = parseInt(day);
        const y = parseInt(year);
        const h = parseInt(hour) || 12;
        const min = parseInt(minute) || 0;
        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);
        const tz = parseFloat(timezone);

        if (isNaN(m) || m < 1 || m > 12) { setValidationError('Tháng phải từ 1 đến 12.'); return; }
        if (isNaN(d) || d < 1 || d > 31) { setValidationError('Ngày phải từ 1 đến 31.'); return; }
        if (isNaN(y) || y < 1900 || y > 2100) { setValidationError('Năm phải từ 1900 đến 2100.'); return; }
        if (h < 0 || h > 23) { setValidationError('Giờ phải từ 0 đến 23.'); return; }
        if (min < 0 || min > 59) { setValidationError('Phút phải từ 0 đến 59.'); return; }
        if (isNaN(lat) || lat < -90 || lat > 90) { setValidationError('Vĩ độ phải từ -90 đến 90.'); return; }
        if (isNaN(lng) || lng < -180 || lng > 180) { setValidationError('Kinh độ phải từ -180 đến 180.'); return; }
        if (isNaN(tz) || tz < -12 || tz > 14) { setValidationError('Múi giờ phải từ -12 đến +14.'); return; }

        const testDate = new Date(y, m - 1, d);
        if (testDate.getFullYear() !== y || testDate.getMonth() !== m - 1 || testDate.getDate() !== d) {
            setValidationError(`Ngày ${d}/${m}/${y} không hợp lệ.`);
            return;
        }

        const birthData: BirthData = {
            year: y,
            month: m,
            day: d,
            hour: h,
            minute: min,
            latitude: lat,
            longitude: lng,
            timezone: tz,
            name: name || undefined,
            gender,
            locationName: locationName || undefined,
        };

        onGenerate(birthData);
    };

    const isValid = day && month && year && latitude && longitude;

    return (
        <form onSubmit={handleSubmit} className="card-surface p-5 space-y-5">
            {/* Header */}
            <div className="text-center w-full space-y-1">
                <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark flex items-center justify-center gap-2">
                    <span className="material-icons-round text-2xl text-blue-500 dark:text-blue-400">public</span>
                    Lập Bản Đồ Sao
                </h2>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    Nhập thông tin sinh để tạo bản đồ sao chiêm tinh phương Tây
                </p>
            </div>

            {/* Name + Gender row */}
            <div className="grid grid-cols-[1fr_auto] gap-3">
                <div>
                    <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
                        Họ tên <span className="opacity-50">(tùy chọn)</span>
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className="w-full px-3 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-gold/30 dark:focus:ring-gold-dark/30 focus:border-gold dark:focus:border-gold-dark outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
                        Giới tính
                    </label>
                    <div className="flex rounded-lg border border-border-light dark:border-border-dark overflow-hidden h-[42px]">
                        <button type="button" onClick={() => setGender('male')}
                            className={`px-4 text-sm font-medium transition-colors ${gender === 'male' ? 'bg-gold/15 dark:bg-gold-dark/15 text-gold dark:text-gold-dark' : 'bg-white dark:bg-gray-800 text-text-secondary-light dark:text-text-secondary-dark'}`}>
                            Nam
                        </button>
                        <button type="button" onClick={() => setGender('female')}
                            className={`px-4 text-sm font-medium transition-colors border-l border-border-light dark:border-border-dark ${gender === 'female' ? 'bg-gold/15 dark:bg-gold-dark/15 text-gold dark:text-gold-dark' : 'bg-white dark:bg-gray-800 text-text-secondary-light dark:text-text-secondary-dark'}`}>
                            Nữ
                        </button>
                    </div>
                </div>
            </div>

            {/* Date + Time row */}
            <div>
                <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
                    Ngày sinh <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-5 gap-2">
                    <input type="number" value={day} onChange={e => setDay(e.target.value)} placeholder="Ngày" min="1" max="31" required
                        className="px-3 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-sm text-center focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none" />
                    <input type="number" value={month} onChange={e => setMonth(e.target.value)} placeholder="Tháng" min="1" max="12" required
                        className="px-3 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-sm text-center focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none" />
                    <input type="number" value={year} onChange={e => setYear(e.target.value)} placeholder="Năm" min="1900" max="2100" required
                        className="px-3 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-sm text-center focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none" />
                    <input type="number" value={hour} onChange={e => setHour(e.target.value)} placeholder="Giờ" min="0" max="23"
                        className="px-3 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-sm text-center focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none" />
                    <input type="number" value={minute} onChange={e => setMinute(e.target.value)} placeholder="Phút" min="0" max="59"
                        className="px-3 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-sm text-center focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none" />
                </div>
                <p className="text-base text-text-secondary-light dark:text-text-secondary-dark mt-1 opacity-70">
                    Ngày / Tháng / Năm / Giờ / Phút — Giờ sinh chính xác giúp xác định Cung Mọc (Ascendant)
                </p>
            </div>

            {/* Location — Searchable picker */}
            <LocationPicker
                onSelect={handleLocationSelect}
                initialLat={initialData?.latitude}
                initialLng={initialData?.longitude}
                initialLocationName={initialData?.locationName}
            />

            {/* Advanced options toggle */}
            <button type="button" onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-1.5 text-base text-text-secondary-light dark:text-text-secondary-dark hover:text-gold dark:hover:text-gold-dark transition-colors">
                <Icon name={showAdvanced ? 'expand_more' : 'chevron_right'} className="w-4 h-4" />
                Tùy chọn nâng cao
            </button>

            {showAdvanced && (
                <div className="space-y-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-border-light dark:border-border-dark">
                    {/* House system selector */}
                    <div>
                        <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
                            Hệ thống Nhà
                        </label>
                        <select
                            value={selectedHouseSystem}
                            onChange={e => onHouseSystemChange?.(e.target.value as HouseSystemId)}
                            className="w-full px-3 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-gold/30 dark:focus:ring-gold-dark/30 focus:border-gold dark:focus:border-gold-dark outline-none transition-all"
                        >
                            {HOUSE_SYSTEM_OPTIONS.map(opt => (
                                <option key={opt.id} value={opt.id}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Manual coordinate overrides */}
                    <p className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
                        Chỉnh tọa độ & múi giờ thủ công
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <label className="block text-xs text-text-secondary-light dark:text-text-secondary-dark mb-0.5">Vĩ độ</label>
                            <input type="number" value={latitude} onChange={e => setLatitude(e.target.value)} placeholder="Vĩ độ" step="0.0001"
                                className="w-full px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-sm text-center focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs text-text-secondary-light dark:text-text-secondary-dark mb-0.5">Kinh độ</label>
                            <input type="number" value={longitude} onChange={e => setLongitude(e.target.value)} placeholder="Kinh độ" step="0.0001"
                                className="w-full px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-sm text-center focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs text-text-secondary-light dark:text-text-secondary-dark mb-0.5">Múi giờ</label>
                            <select value={timezone} onChange={e => setTimezone(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none">
                                {Array.from({ length: 25 }, (_, i) => i - 12).map(tz => (
                                    <option key={tz} value={tz}>GMT{tz >= 0 ? '+' : ''}{tz}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <p className="text-xs text-text-secondary-light/60 dark:text-text-secondary-dark/60">
                        Hoàng đạo: Tropical
                    </p>
                </div>
            )}

            {/* Validation error */}
            {validationError && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40">
                    <p className="flex items-center gap-1.5 text-sm font-medium text-red-600 dark:text-red-400">
                        <Icon name="warning" className="w-3.5 h-3.5 shrink-0" /> {validationError}
                    </p>
                </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={!isValid || isLoading}
                className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-gold to-amber-600 dark:from-gold-dark dark:to-amber-500 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2">
                {isLoading ? (
                    <><Icon name="progress_activity" className="w-4 h-4 animate-spin" /> Đang tính toán...</>
                ) : (
                    <><Icon name="auto_awesome" className="w-4 h-4" /> Lập Bản Đồ Sao</>
                )}
            </button>
        </form>
    );
}
