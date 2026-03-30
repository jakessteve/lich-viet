/**
 * HeroBirthdayInput — Interactive "Try Now" mini-demo for the hero section.
 * Lets users enter birth date to see instant zodiac/element preview,
 * driving engagement and reducing bounce rate.
 */

import React, { useState, useCallback } from 'react';
import { getLunarDate, getCanChiYear } from '@lich-viet/core/calendar';

interface QuickResult {
  zodiac: string;
  element: string;
  canChi: string;
  lunarYear: number;
}

const ZODIAC = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
const ZODIAC_EMOJI = ['🐀', '🐂', '🐅', '🐇', '🐲', '🐍', '🐴', '🐐', '🐒', '🐓', '🐕', '🐷'];
const ELEMENTS = ['Kim', 'Thủy', 'Hỏa', 'Mộc', 'Thổ'];
const ELEMENT_COLORS: Record<string, string> = {
  Kim: 'text-gray-300',
  Thủy: 'text-blue-400',
  Hỏa: 'text-red-400',
  Mộc: 'text-emerald-400',
  Thổ: 'text-amber-400',
};

function getZodiacEmoji(lunarYear: number): string {
  return ZODIAC_EMOJI[(lunarYear - 4) % 12];
}

function getZodiacName(lunarYear: number): string {
  return ZODIAC[(lunarYear - 4) % 12];
}

function getRoughElement(lunarYear: number): string {
  return ELEMENTS[Math.floor(((lunarYear - 4) % 10) / 2)];
}

const HeroBirthdayInput: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<QuickResult | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/[^\d]/g, '');
    if (v.length > 8) v = v.slice(0, 8);
    if (v.length > 4) v = v.slice(0, 2) + '/' + v.slice(2, 4) + '/' + v.slice(4);
    else if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
    setBirthDate(v);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate || birthDate.length < 10) return;

    const [dd, mm, yyyy] = birthDate.split('/').map(Number);
    if (!dd || !mm || !yyyy || dd > 31 || mm > 12 || yyyy < 1900 || yyyy > new Date().getFullYear()) return;

    setIsAnimating(true);
    const date = new Date(yyyy, mm - 1, dd);
    const lunar = getLunarDate(date);
    const canChi = getCanChiYear(lunar.year);
    const zodiac = getZodiacName(lunar.year);
    const element = getRoughElement(lunar.year);

    setTimeout(() => {
      setResult({ zodiac, element, canChi, lunarYear: lunar.year });
      setIsAnimating(false);
    }, 600);
  }, [birthDate]);

  return (
    <div className="w-full h-full flex flex-col">
      {!result ? (
        <form onSubmit={handleSubmit} className="glass-card-strong glass-shimmer glass-noise p-5 flex flex-col flex-1 animate-fade-in-up animate-delay-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-icons-round text-base text-gold dark:text-gold-dark">auto_awesome</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-secondary-light/60 dark:text-text-secondary-dark/50">
              Khám phá nhanh
            </span>
          </div>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-4">
            Nhập ngày sinh để xem con giáp, ngũ hành và lá số của bạn.
          </p>
          <div className="mt-auto space-y-3">
            <input
              type="text"
              inputMode="numeric"
              value={birthDate}
              onChange={handleDateChange}
              placeholder="dd/mm/yyyy"
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/[0.06] border border-border-light/50 dark:border-white/10 text-sm text-center text-text-primary-light dark:text-text-primary-dark focus:border-gold dark:focus:border-gold-dark focus:ring-1 focus:ring-gold/20 dark:focus:ring-gold-dark/20 transition-all outline-none placeholder:text-text-secondary-light/40 dark:placeholder:text-text-secondary-dark/30"
              required
              maxLength={10}
              aria-label="Ngày sinh (dd/mm/yyyy)"
            />
            <button
              type="submit"
              disabled={isAnimating}
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-mystery-deep to-indigo-950 text-gold-light dark:from-gold dark:to-amber-500 dark:text-indigo-950 font-bold text-sm shadow-lg shadow-mystery-deep/15 dark:shadow-gold-dark/20 hover:shadow-xl hover:shadow-mystery-deep/25 dark:hover:shadow-gold/25 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-60 ring-1 ring-gold/20 dark:ring-0"
            >
              {isAnimating ? (
                <>
                  <span className="material-icons-round text-sm animate-spin">autorenew</span>
                  Đang phân tích...
                </>
              ) : (
                <>
                  Xem kết quả
                  <span className="material-icons-round text-sm">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="glass-card-strong glass-shimmer glass-noise mystery-glow-border p-5 animate-fade-scale flex flex-col flex-1">
          {/* Result Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{getZodiacEmoji(result.lunarYear)}</span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary-light/60 dark:text-text-secondary-dark/50">
                  Con giáp
                </p>
                <p className="text-lg font-bold tracking-tight">
                  {result.zodiac}
                </p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold bg-white/50 dark:bg-white/5 ${ELEMENT_COLORS[result.element] || 'text-gold dark:text-gold-dark'}`}>
              {result.element}
            </span>
          </div>

          {/* Can Chi */}
          <div className="p-3 rounded-xl bg-surface-subtle-light/50 dark:bg-white/[0.025] border border-border-light/10 dark:border-border-dark/10">
            <p className="text-[10px] uppercase tracking-widest text-text-secondary-light/60 dark:text-text-secondary-dark/50 font-bold mb-0.5">
              Năm Can Chi
            </p>
            <p className="text-sm font-semibold text-gold dark:text-gold-dark">{result.canChi}</p>
          </div>

          {/* CTA to full chart */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onNavigate('/app/tu-vi')}
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-mystery-deep to-indigo-950 text-gold-light dark:from-gold dark:to-amber-500 dark:text-indigo-950 font-bold text-sm shadow-lg shadow-mystery-deep/15 dark:shadow-gold-dark/20 hover:shadow-xl hover:shadow-mystery-deep/25 dark:hover:shadow-gold/25 transition-all duration-300 hover:scale-[1.02] active:scale-95 ring-1 ring-gold/20 dark:ring-0"
            >
              Lập lá số đầy đủ
              <span className="material-icons-round text-sm">arrow_forward</span>
            </button>
            <button
              onClick={() => { setResult(null); setBirthDate(''); }}
              className="text-xs text-text-secondary-light/50 dark:text-text-secondary-dark/40 hover:text-text-primary-light dark:hover:text-white transition-colors"
            >
              ← Thử ngày sinh khác
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(HeroBirthdayInput);
