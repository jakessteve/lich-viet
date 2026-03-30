// ══════════════════════════════════════════════════════════
// CreditRefreshBanner — Elite credit wallet status banner
//
// Shown only for Elite (★) users. Displays:
//   - Credits remaining / total this month
//   - Days until next monthly refresh
//   - CTA to reset (dev/admin only)
// ══════════════════════════════════════════════════════════

import React from 'react';
import { useCreditStore, MONTHLY_ELITE_CREDITS } from '../../stores/creditStore';
import { useUserTier } from '../../hooks/useUserTier';

interface CreditRefreshBannerProps {
  className?: string;
  /** Compact mode: single-line pill (default: false = full card) */
  compact?: boolean;
}

function daysUntilNextMonth(): number {
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return Math.ceil((next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function CreditRefreshBanner({ className = '', compact = false }: CreditRefreshBannerProps) {
  const { hasAccess } = useUserTier();

  // Only render for elite tier
  if (!hasAccess('elite')) return null;

  return <CreditRefreshBannerInner className={className} compact={compact} />;
}

function CreditRefreshBannerInner({ className, compact }: { className?: string; compact?: boolean }) {
  const { creditsRemaining, resetCredits } = useCreditStore();
  const days = daysUntilNextMonth();
  const usedCredits = MONTHLY_ELITE_CREDITS - creditsRemaining;
  const pct = Math.round((creditsRemaining / MONTHLY_ELITE_CREDITS) * 100);

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-violet-50 dark:bg-violet-900/15 text-violet-700 dark:text-violet-400 border border-violet-200/40 dark:border-violet-700/25 ${className}`}
        title={`${creditsRemaining} / ${MONTHLY_ELITE_CREDITS} credit cá nhân hóa còn lại tháng này`}
      >
        <span className="material-icons-round text-sm" aria-hidden="true">toll</span>
        <span>{creditsRemaining}/{MONTHLY_ELITE_CREDITS} credit</span>
      </div>
    );
  }

  return (
    <div className={`glass-card p-4 space-y-3 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-900/25 flex items-center justify-center shrink-0">
            <span className="material-icons-round text-base text-violet-600 dark:text-violet-400" aria-hidden="true">toll</span>
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">
              Credit Cá Nhân Hóa
            </p>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
              Làm mới sau {days} ngày
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-violet-600 dark:text-violet-400 leading-none">{creditsRemaining}</p>
          <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark">/{MONTHLY_ELITE_CREDITS} còn lại</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[10px] text-text-secondary-light dark:text-text-secondary-dark">
          <span>Đã dùng {usedCredits} credit</span>
          <span>{pct}% còn</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-600 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Credit slots */}
      <div className="flex gap-1 flex-wrap">
        {Array.from({ length: MONTHLY_ELITE_CREDITS }).map((_, i) => (
          <div
            key={i}
            className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
              i < usedCredits
                ? 'bg-gray-200 dark:bg-gray-700'
                : 'bg-violet-100 dark:bg-violet-900/30 ring-1 ring-violet-300/50 dark:ring-violet-600/40'
            }`}
            title={i < usedCredits ? 'Đã dùng' : 'Còn lại'}
          >
            <span className={`material-icons-round text-[10px] ${i < usedCredits ? 'text-gray-400 dark:text-gray-500' : 'text-violet-500 dark:text-violet-400'}`} aria-hidden="true">
              {i < usedCredits ? 'remove' : 'toll'}
            </span>
          </div>
        ))}
      </div>

      {/* Dev reset — only visible in dev mode */}
      {import.meta.env.DEV && (
        <button
          onClick={resetCredits}
          className="text-[10px] text-text-secondary-light/50 dark:text-text-secondary-dark/40 hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors"
        >
          [Dev] Reset credits
        </button>
      )}
    </div>
  );
}
