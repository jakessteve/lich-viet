import React, { useEffect, useRef, useState } from 'react';
import { useTuViStore } from '../../stores/tuviStore';
import { useAuthStore } from '../../stores/authStore';
import type { TuViGender } from '../../types/tuvi';
import { TuViLocationPicker } from './TuViLocationPicker';

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

const getTimezoneForLocation = (utcOffset: number) => {
  if (utcOffset === 7) return 'Asia/Ho_Chi_Minh';
  return `Etc/GMT${utcOffset >= 0 ? '-' : '+'}${Math.abs(utcOffset)}`;
};

const getChiHourFromClockHour = (hour: number) => (hour === 23 ? 0 : Math.floor((hour + 1) / 2) % 12);

export const TuViInputForm: React.FC = () => {
  const { input, setInput, calculateChart, isCalculating } = useTuViStore();
  const { user } = useAuthStore();
  const [error, setError] = useState('');
  const didPrefill = useRef(false);

  // Local string state for date inputs — allows free typing without
  // intermediate invalid Date construction
  const [dayStr, setDayStr] = useState(String(input.solarDate.getDate()));
  const [monthStr, setMonthStr] = useState(String(input.solarDate.getMonth() + 1));
  const [yearStr, setYearStr] = useState(String(input.solarDate.getFullYear()));

  const birthClockHour = input.birthClockHour ?? 0;
  const birthMinute = input.birthMinute ?? 0;

  // Sync local strings when the store date changes externally (e.g. prefill)
  useEffect(() => {
    setDayStr(String(input.solarDate.getDate()));
    setMonthStr(String(input.solarDate.getMonth() + 1));
    setYearStr(String(input.solarDate.getFullYear()));
  }, [input.solarDate]);

  /** Commit local date strings into a real Date and push to store */
  const commitDate = () => {
    const d = parseInt(dayStr, 10);
    const m = parseInt(monthStr, 10);
    const y = parseInt(yearStr, 10);
    if (!d || !m || !y) return; // incomplete — don't commit
    const date = new Date(y, m - 1, d, birthClockHour, birthMinute);
    // If the Date auto-corrected (e.g. Feb 31 → Mar 3), sync back
    const actualDay = date.getDate();
    const actualMonth = date.getMonth() + 1;
    const actualYear = date.getFullYear();
    setDayStr(String(actualDay));
    setMonthStr(String(actualMonth));
    setYearStr(String(actualYear));
    setInput({
      solarDate: date,
      birthClockHour,
      birthMinute,
      birthHour: getChiHourFromClockHour(birthClockHour),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const d = parseInt(dayStr, 10);
    const m = parseInt(monthStr, 10);
    const y = parseInt(yearStr, 10);

    if (!d || !m || !y) {
      setError('Vui lòng chọn đầy đủ ngày, tháng, năm sinh.');
      return;
    }

    // Commit the date before calculating
    const date = new Date(y, m - 1, d, birthClockHour, birthMinute);
    setInput({
      solarDate: date,
      birthClockHour,
      birthMinute,
      birthHour: getChiHourFromClockHour(birthClockHour),
    });
    calculateChart();
  };

  useEffect(() => {
    if (didPrefill.current || !user) return;

    const updates: Parameters<typeof setInput>[0] = {};

    if (user.displayName && !input.name) {
      updates.name = user.displayName;
    }

    if (user.birthday) {
      const [yearValue, monthValue, dayValue] = user.birthday.split('-').map(Number);
      if (yearValue && monthValue && dayValue) {
        const hourValue = typeof user.profile?.birthHour === 'number' ? user.profile.birthHour : 0;
        const minuteValue = typeof user.profile?.birthMinute === 'number' ? user.profile.birthMinute : 0;
        updates.solarDate = new Date(yearValue, monthValue - 1, dayValue, hourValue, minuteValue);
      }
    }

    if (typeof user.profile?.birthHour === 'number') {
      updates.birthClockHour = user.profile.birthHour;
      updates.birthHour = getChiHourFromClockHour(user.profile.birthHour);
    }

    if (typeof user.profile?.birthMinute === 'number') {
      updates.birthMinute = user.profile.birthMinute;
    }

    if (user.profile?.gender) {
      updates.gender = user.profile.gender === 'male' ? 'nam' : 'nữ';
    }

    const savedLocation = user.extendedProfile?.birthLocation;
    if (savedLocation) {
      const utcOffset = Math.max(-12, Math.min(14, Math.round(savedLocation.lng / 15)));
      updates.birthLocation = {
        locationName: savedLocation.city,
        lat: savedLocation.lat,
        lng: savedLocation.lng,
        timezone: utcOffset,
      };
      updates.timezone = getTimezoneForLocation(utcOffset);
    }

    if (Object.keys(updates).length > 0) {
      setInput(updates);
    }

    didPrefill.current = true;
  }, [input.name, setInput, user]);

  const labelBase =
    'block text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark mb-2 tracking-wide';
  const profileDateControl =
    'px-3 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-surface-subtle-light dark:bg-surface-subtle-dark text-sm text-center text-text-primary-light dark:text-text-primary-dark focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all';
  const profileSelectControl =
    'px-3 py-2.5 rounded-lg text-sm bg-surface-subtle-light dark:bg-surface-subtle-dark border border-border-light/30 dark:border-border-dark/25 text-text-primary-light dark:text-text-primary-dark focus:ring-2 focus:ring-gold/25 dark:focus:ring-gold-dark/25 outline-none transition-all';

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      <div>
        <label htmlFor="tuvi-name" className={labelBase}>
          Họ và tên (Tuỳ chọn)
        </label>
        <input
          id="tuvi-name"
          type="text"
          value={input.name ?? ''}
          onChange={(e) => setInput({ name: e.target.value })}
          placeholder="VD: Nguyễn Văn A"
          className="w-full px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-white/10 border border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-400"
        />
      </div>

      <div>
        <label className={labelBase}>
          Ngày giờ sinh (Dương lịch)
        </label>
        <div className="grid grid-cols-5 gap-2">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            aria-label="Ngày"
            placeholder="Ngày"
            value={dayStr}
            onChange={(e) => setDayStr(e.target.value)}
            onBlur={commitDate}
            className={profileDateControl}
          />
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            aria-label="Tháng"
            placeholder="Tháng"
            value={monthStr}
            onChange={(e) => setMonthStr(e.target.value)}
            onBlur={commitDate}
            className={profileDateControl}
          />
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            aria-label="Năm"
            placeholder="Năm"
            value={yearStr}
            onChange={(e) => setYearStr(e.target.value)}
            onBlur={commitDate}
            className={profileDateControl}
          />
          <select
            aria-label="Giờ"
            value={birthClockHour}
            onChange={(e) => {
              const hour = Number(e.target.value);
              setInput({
                birthClockHour: hour,
                birthHour: getChiHourFromClockHour(hour),
              });
            }}
            className={profileSelectControl}
          >
            {HOURS.map((hour) => (
              <option key={hour} value={hour}>
                {String(hour).padStart(2, '0')}
              </option>
            ))}
          </select>
          <select
            aria-label="Phút"
            value={birthMinute}
            onChange={(e) => {
              setInput({
                birthMinute: Number(e.target.value),
              });
            }}
            className={profileSelectControl}
          >
            {MINUTES.map((minute) => (
              <option key={minute} value={minute}>
                {String(minute).padStart(2, '0')}
              </option>
            ))}
          </select>
        </div>
        <p className="mt-1.5 text-xs text-text-secondary-light/70 dark:text-text-secondary-dark/70">
          Giờ Tử Vi được tự động quy đổi từ giờ đồng hồ.
        </p>
      </div>

      <div>
        <label className={labelBase}>
          Giới tính
        </label>
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-gray-100 p-1 dark:bg-white/5">
          {(['nam', 'nữ'] as TuViGender[]).map((g) => (
            <label
              key={g}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 transition-all duration-200 ${
                input.gender === g
                  ? 'bg-white text-gold shadow-sm dark:bg-white/15 dark:text-gold-light'
                  : 'text-text-secondary-light hover:bg-white/60 dark:text-text-secondary-dark dark:hover:bg-white/10'
              }`}
            >
              <input
                type="radio"
                name="tuvi-gender"
                value={g}
                checked={input.gender === g}
                onChange={() => setInput({ gender: g })}
                className="sr-only"
              />
              <span className="text-sm font-medium capitalize">{g}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelBase}>
          Nơi sinh
        </label>
        <TuViLocationPicker
          value={input.birthLocation}
          onChange={(birthLocation) =>
            setInput({
              birthLocation,
              timezone: getTimezoneForLocation(birthLocation.timezone),
            })
          }
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 dark:text-red-400 text-center" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isCalculating}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold via-gold-light to-amber-500 text-white font-bold text-sm shadow-md hover:shadow-lg hover:brightness-110 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isCalculating ? (
          <>
            <span className="material-icons-round text-base animate-spin">auto_awesome</span>
            Đang tính lá số...
          </>
        ) : (
          <>
            <span className="material-icons-round text-base">auto_awesome</span>
            Xem Lá Số
          </>
        )}
      </button>
    </form>
  );
};
