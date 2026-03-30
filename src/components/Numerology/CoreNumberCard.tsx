/**
 * CoreNumberCard — Displays a single numerology core number
 *
 * Extracted from NumerologyView.tsx for reusability.
 */

import type { CoreNumber } from '@lich-viet/core/numerology';

interface Props {
  number: CoreNumber;
  index: number;
  variant?: 'hero' | 'normal' | 'compact';
}

export default function CoreNumberCard({ number, index, variant = 'normal' }: Props) {
  const isMaster = number.masterNumber;
  const isKarmic = number.karmicDebt;

  const bgGradient = isMaster
    ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-500/30'
    : isKarmic
      ? 'bg-gradient-to-br from-red-400 to-rose-500 shadow-red-500/30'
      : 'bg-gradient-to-br from-gold to-amber-600 shadow-gold/20';

  if (variant === 'hero') {
    return (
      <div className="glass-card p-6 text-center space-y-3 animate-fade-in-up" style={{ animationDelay: `${index * 80}ms` }}>
        <p className="text-xs font-bold uppercase tracking-widest text-gold/80 dark:text-gold-dark/80">
          {number.nameVi} — {number.name}
        </p>
        <div className={`mx-auto w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black text-white shadow-xl ${bgGradient}`}>
          {number.value}
        </div>
        <p className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark">
          {number.description}
        </p>
        <p className="text-sm sm:text-base text-text-secondary-light dark:text-text-secondary-dark max-w-lg mx-auto leading-relaxed">
          {number.detailedMeaning}
        </p>
        <div className="flex justify-center gap-1.5 flex-wrap">
          {isMaster && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400">
              ✨ Số Bậc Thầy
            </span>
          )}
          {isKarmic && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400">
              ⚡ Nợ Nghiệp
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-card p-4 space-y-2 animate-fade-in-up`} style={{ animationDelay: `${index * 80}ms` }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-text-secondary-light/60 dark:text-text-secondary-dark/60">
            {number.nameVi}
          </p>
          <p className="text-[10px] text-text-secondary-light/40 dark:text-text-secondary-dark/30">
            {number.name}
          </p>
        </div>
        <div className={`rounded-2xl flex items-center justify-center font-black text-white shadow-lg ${bgGradient} ${variant === 'compact' ? 'w-10 h-10 text-lg' : 'w-12 h-12 text-xl'}`}>
          {number.value}
        </div>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {isMaster && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-700/30">
            ✨ Số Bậc Thầy
          </span>
        )}
        {isKarmic && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200/60 dark:border-red-700/30">
            ⚡ Nợ Nghiệp
          </span>
        )}
      </div>

      <p className={`font-medium text-text-primary-light dark:text-text-primary-dark ${variant === 'compact' ? 'text-xs' : 'text-sm'}`}>
        {number.description}
      </p>
      {variant !== 'compact' && (
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
          {number.detailedMeaning}
        </p>
      )}
    </div>
  );
}
