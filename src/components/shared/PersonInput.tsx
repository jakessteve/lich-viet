/**
 * PersonInput — Reusable DOB/time/gender input form
 * Used for both Person A (self) and Person B (partner/family) in synastry flows.
 */

import React from 'react';

export interface PersonData {
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  birthHour: string;
  gender: 'male' | 'female';
}

interface PersonInputProps {
  label: string;
  icon: string;
  person: PersonData;
  onChange: (person: PersonData) => void;
  showName?: boolean;
  compact?: boolean;
}

const PersonInput: React.FC<PersonInputProps> = ({
  label,
  icon,
  person,
  onChange,
  showName = false,
  compact = false,
}) => {
  const inputClass =
    'w-full px-2.5 py-2 text-center rounded-lg bg-surface-subtle-light dark:bg-white/10 border border-border-light dark:border-border-dark text-sm font-medium text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-gold/50 dark:focus:ring-gold-dark/50 tabular-nums transition-all';

  const update = (field: keyof PersonData, value: string) => {
    onChange({ ...person, [field]: value });
  };

  return (
    <div className={`rounded-xl border border-border-light dark:border-border-dark overflow-hidden ${
      compact ? '' : 'bg-white/50 dark:bg-white/[0.02]'
    }`}>
      {/* Header */}
      {(label || icon) && (
        <div className="flex items-center gap-2 px-3 py-2 bg-surface-subtle-light dark:bg-white/5 border-b border-border-light/50 dark:border-border-dark/50">
          {icon && <span className="text-lg material-icons-round">{icon}</span>}
          {label && (
            <span className="text-xs font-semibold text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider">
              {label}
            </span>
          )}
        </div>
      )}

      <div className="p-3 space-y-2.5">
        {showName && (
          <div>
            <label className="block text-[10px] font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-1">
              Tên
            </label>
            <input
              type="text"
              placeholder="Nhập tên..."
              value={person.name}
              onChange={(e) => update('name', e.target.value)}
              className={inputClass.replace('text-center', 'text-left')}
            />
          </div>
        )}

        <div className="grid grid-cols-4 gap-2">
          <div>
            <label className="block text-[10px] font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-1">
              Ngày
            </label>
            <input
              type="number"
              min={1} max={31}
              placeholder="--"
              value={person.birthDay}
              onChange={(e) => update('birthDay', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-1">
              Tháng
            </label>
            <input
              type="number"
              min={1} max={12}
              placeholder="--"
              value={person.birthMonth}
              onChange={(e) => update('birthMonth', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-1">
              Năm
            </label>
            <input
              type="number"
              min={1900} max={2100}
              placeholder="--"
              value={person.birthYear}
              onChange={(e) => update('birthYear', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-1">
              Giờ
            </label>
            <input
              type="number"
              min={0} max={23}
              placeholder="--"
              value={person.birthHour}
              onChange={(e) => update('birthHour', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Gender buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => update('gender', 'male')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              person.gender === 'male'
                ? 'bg-blue-500/15 dark:bg-blue-400/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 dark:border-blue-400/30'
                : 'bg-surface-subtle-light dark:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark border border-transparent hover:bg-gray-100 dark:hover:bg-white/10'
            }`}
          >
            ♂ Nam
          </button>
          <button
            onClick={() => update('gender', 'female')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              person.gender === 'female'
                ? 'bg-pink-500/15 dark:bg-pink-400/15 text-pink-600 dark:text-pink-400 border border-pink-500/30 dark:border-pink-400/30'
                : 'bg-surface-subtle-light dark:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark border border-transparent hover:bg-gray-100 dark:hover:bg-white/10'
            }`}
          >
            ♀ Nữ
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonInput;
