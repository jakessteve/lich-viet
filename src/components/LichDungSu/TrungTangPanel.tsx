/**
 * TrungTangPanel — Funeral Safety Check UI
 * 
 * Shows a prominent safety panel when the FAQ intent is "Tang lễ".
 * Uses the authentic Bấm Cung Tay algorithm to determine Trùng Tang risk
 * based on the deceased's Lunar Age, Death Month, Death Day, and Death Hour.
 */

import React, { useMemo, useState } from 'react';
import { checkTrungTang, type TrungTangResult, type TrungTangClassification, type TrungTangLanding } from '../../services/synastry/trungTang';

interface TrungTangPanelProps {
  /** Deceased's birth year, used to calculate Lunar Age */
  deceasedBirthYear: string;
  /** Deceased's gender */
  deceasedGender: 'male' | 'female';
  /** Deceased's Lunar Death Year */
  deathYear: number;
  /** Deceased's Lunar Death Month (1-12) */
  deathLunarMonth: string;
  /** Deceased's Lunar Death Day (1-30) */
  deathLunarDay: string;
  /** Deceased's Death Hour Chi (Tý, Sửu...) */
  deathHourChi: string;
}

const REGION_VARIANTS = ['Bắc', 'Trung', 'Nam'] as const;

const LandingBadge: React.FC<{ label: string; landing: TrungTangLanding }> = ({ label, landing }) => {
  const isNhapMo = landing.classification === 'nhap-mo';
  const isThienDi = landing.classification === 'thien-di';
  
  const bgClass = isNhapMo ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
    : isThienDi ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border-amber-200 dark:border-amber-800'
    : 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300 border-red-200 dark:border-red-800';

  const title = isNhapMo ? 'Nhập Mộ' : isThienDi ? 'Thiên Di' : 'Trùng Tang';

  return (
    <div className={`flex flex-col items-center justify-center p-2 rounded-lg border ${bgClass} transition-transform hover:scale-105`}>
      <span className="text-[10px] uppercase font-bold opacity-70 mb-0.5 tracking-wider">{label}</span>
      <span className="text-xl font-black mb-0.5">{landing.chi}</span>
      <span className="text-[10px] font-semibold">{title}</span>
    </div>
  );
};

const TrungTangPanel: React.FC<TrungTangPanelProps> = ({
  deceasedBirthYear,
  deceasedGender,
  deathYear,
  deathLunarMonth,
  deathLunarDay,
  deathHourChi,
}) => {
  const [region, setRegion] = useState<typeof REGION_VARIANTS[number]>('Bắc');

  const result: TrungTangResult | null = useMemo(() => {
    const bYear = parseInt(deceasedBirthYear, 10);
    const m = parseInt(deathLunarMonth, 10);
    const d = parseInt(deathLunarDay, 10);

    if (!bYear || !m || !d || !deathHourChi || !deathYear) return null;
    if (bYear < 1900 || bYear > 2100 || m < 1 || m > 12 || d < 1 || d > 30) return null;

    // Lunar Age = Death Year - Birth Year + 1
    const lunarAge = deathYear - bYear + 1;
    if (lunarAge <= 0) return null;

    return checkTrungTang(lunarAge, m, d, deathHourChi, deceasedGender);
  }, [deceasedBirthYear, deathYear, deathLunarMonth, deathLunarDay, deathHourChi, deceasedGender]);

  if (!result) {
    return (
      <div className="p-4 sm:p-6 rounded-xl border border-border-light dark:border-border-dark bg-surface-subtle-light dark:bg-white/5 text-center transition-all">
        <span className="text-4xl mb-3 block">🕯️</span>
        <p className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark mb-1">
          Chưa đủ thông tin người quá cố
        </p>
        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark max-w-sm mx-auto leading-relaxed">
          Vui lòng nhập đầy đủ <span className="font-semibold text-gold dark:text-gold-dark">Năm Sinh</span> cùng <span className="font-semibold text-gold dark:text-gold-dark">Tháng, Ngày, Giờ mất (Âm Lịch)</span> ở phần dưới để hệ thống Bấm Cung Tay tự động tính toán.
        </p>
      </div>
    );
  }

  const isSafe = result.safe;
  // Determine overall color theme based on safety and presence of danger
  const bgClass = isSafe 
    ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800'
    : 'bg-red-50 dark:bg-red-900/10 border-red-300 dark:border-red-700';

  const iconEmoji = isSafe ? '✅' : '❌';

  return (
    <div className={`rounded-xl border-2 overflow-hidden animate-in fade-in zoom-in-95 duration-400 ${bgClass}`}>
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-black/5 dark:border-white/5">
        <span className="text-3xl">{iconEmoji}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-text-primary-light dark:text-text-primary-dark">
            Kết Quả Kiểm Tra Trùng Tang
          </h3>
          <p className="text-sm font-semibold mt-0.5" style={{
            color: isSafe ? '#059669' : '#DC2626',
          }}>
            {result.summary}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 space-y-4">
        
        {/* The 4 Landings */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          <LandingBadge label="Tuổi Đi" landing={result.ageLanding} />
          <LandingBadge label="Tháng" landing={result.monthLanding} />
          <LandingBadge label="Ngày" landing={result.dayLanding} />
          <LandingBadge label="Giờ" landing={result.hourLanding} />
        </div>

        {/* Warning & Advice */}
        {result.warning && (
          <p className="text-xs leading-relaxed text-red-700 dark:text-red-300 bg-red-100/50 dark:bg-red-900/30 rounded-lg p-3 font-medium border border-red-200/50 dark:border-red-800/50">
            <span className="font-bold">⚠️ LƯU Ý: </span>{result.warning}
          </p>
        )}

        <div className="mt-2 text-xs leading-relaxed text-text-secondary-light dark:text-text-secondary-dark p-2 bg-white/50 dark:bg-black/20 rounded-lg border border-border-light/50 dark:border-border-dark/50 shadow-inner">
          <span className="font-bold text-gold dark:text-gold-dark mb-1 block">💡 Lời khuyên:</span>
          {result.advice}
        </div>
      </div>

      {/* Region Toggle (For future extensibility, currently purely visual preference) */}
      <div className="flex items-center gap-2 px-4 pb-3">
        <span className="text-[10px] font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
          Phong tục:
        </span>
        <div className="flex gap-1">
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
      </div>

      {/* Source Attribution */}
      <div className="flex items-center gap-1.5 px-4 pb-3 text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/60">
        <span className="material-icons-round text-[12px]">menu_book</span>
        <span>Tính toán theo phương pháp Bấm Cung Tay truyền thống</span>
      </div>
    </div>
  );
};

export default TrungTangPanel;
