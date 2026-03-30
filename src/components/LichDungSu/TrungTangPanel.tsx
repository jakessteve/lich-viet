/**
 * TrungTangPanel — Funeral Safety Check UI
 * 
 * Shows a prominent safety panel when the FAQ intent is "Tang lễ".
 * Uses the Bấm Cung Tay algorithm to determine Trùng Tang risk.
 */

import React, { useMemo, useState } from 'react';
import { checkTrungTang, yearToChiString, type TrungTangResult } from '../../services/synastry/trungTang';

interface TrungTangPanelProps {
  /** Deceased's birth year */
  deceasedBirthYear: string;
  /** Deceased's gender */
  deceasedGender: 'male' | 'female';
  /** Funeral day's Earthly Branch (Chi) — from data.canChi.day.chi */
  funeralDayChi: string;
}

const REGION_VARIANTS = ['Bắc', 'Trung', 'Nam'] as const;

const TrungTangPanel: React.FC<TrungTangPanelProps> = ({
  deceasedBirthYear,
  deceasedGender,
  funeralDayChi,
}) => {
  const [region, setRegion] = useState<typeof REGION_VARIANTS[number]>('Bắc');

  const result: TrungTangResult | null = useMemo(() => {
    const year = parseInt(deceasedBirthYear, 10);
    if (!year || year < 1900 || year > 2100 || !funeralDayChi) return null;

    const birthChi = yearToChiString(year);
    return checkTrungTang(birthChi, funeralDayChi, deceasedGender);
  }, [deceasedBirthYear, deceasedGender, funeralDayChi]);

  if (!result) {
    return (
      <div className="p-4 rounded-xl border border-border-light dark:border-border-dark bg-surface-subtle-light dark:bg-white/5 text-center">
        <span className="text-3xl mb-2 block">🕯️</span>
        <p className="text-base text-text-secondary-light dark:text-text-secondary-dark">
          Nhập năm sinh người quá cố để kiểm tra Trùng Tang
        </p>
      </div>
    );
  }

  const bgClass = result.classification === 'safe'
    ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800'
    : result.classification === 'trung-tang'
      ? 'bg-red-50 dark:bg-red-900/10 border-red-300 dark:border-red-700'
      : result.classification === 'thien-di'
        ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800'
        : 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800';

  const iconEmoji = result.classification === 'safe' ? '✅'
    : result.classification === 'trung-tang' ? '❌'
      : result.classification === 'thien-di' ? '⚠️'
        : '🔴';

  return (
    <div className={`rounded-xl border-2 overflow-hidden animate-in fade-in duration-300 ${bgClass}`}>
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <span className="text-3xl">{iconEmoji}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-text-primary-light dark:text-text-primary-dark">
            Kiểm tra Trùng Tang
          </h3>
          <p className="text-sm font-semibold mt-0.5" style={{
            color: result.safe ? '#059669' : result.classification === 'trung-tang' ? '#DC2626' : '#D97706',
          }}>
            {result.summary}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="px-4 pb-3 space-y-2">
        <div className="flex items-center gap-2 text-xs text-text-secondary-light dark:text-text-secondary-dark">
          <span className="font-semibold">Cung đáp:</span>
          <span className="px-2 py-0.5 rounded-full bg-white/50 dark:bg-white/10 font-medium">
            {result.cungLanding}
          </span>
          <span className="text-text-secondary-light/60 dark:text-text-secondary-dark/60">
            (vị trí {result.cungIndex + 1}/12)
          </span>
        </div>

        {result.warning && (
          <p className="text-xs text-red-600 dark:text-red-400 leading-relaxed bg-red-100/50 dark:bg-red-900/20 rounded-lg p-2">
            ⚠️ {result.warning}
          </p>
        )}

        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
          💡 {result.advice}
        </p>
      </div>

      {/* Region Toggle */}
      <div className="flex items-center gap-1 px-4 pb-3">
        <span className="text-[10px] font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mr-1">
          Phong tục:
        </span>
        {REGION_VARIANTS.map(r => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all ${
              region === r
                ? 'bg-gold/20 dark:bg-gold-dark/20 text-gold dark:text-gold-dark ring-1 ring-gold/30 dark:ring-gold-dark/30'
                : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-white/30 dark:hover:bg-white/10'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Source Attribution */}
      <div className="flex items-center gap-1.5 px-4 pb-3 text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/60">
        <span>📖</span>
        <span>Theo phương pháp Bấm Cung Tay truyền thống</span>
      </div>
    </div>
  );
};

export default TrungTangPanel;
