// ══════════════════════════════════════════════════════════
// DailyQueryCounter — Compact query-remaining pill for free users
//
// Shows "X/5 lượt hôm nay" for guest/free tier users.
// Premium+ users see nothing (they're unlimited).
// ══════════════════════════════════════════════════════════

import React from 'react';
import { useDailyQueryLimit, MAX_DAILY_QUERIES } from '../../hooks/useDailyQueryLimit';
import { useUserTier } from '../../hooks/useUserTier';

interface DailyQueryCounterProps {
  /** Optional extra classes on the wrapper */
  className?: string;
  /** Show a full row with upgrade CTA when limit is reached (default: false = pill only) */
  showUpgradeCta?: boolean;
}

export function DailyQueryCounter({ className = '', showUpgradeCta = false }: DailyQueryCounterProps) {
  const { hasAccess } = useUserTier();

  // Not shown for premium users
  if (hasAccess('premium')) return null;

  return <DailyQueryCounterInner className={className} showUpgradeCta={showUpgradeCta} />;
}

function DailyQueryCounterInner({ className, showUpgradeCta }: { className?: string; showUpgradeCta?: boolean }) {
  const { queriesRemaining, queriesUsedToday, isLimitReached } = useDailyQueryLimit();

  const pct = Math.round(((MAX_DAILY_QUERIES - queriesUsedToday) / MAX_DAILY_QUERIES) * 100);

  if (isLimitReached && showUpgradeCta) {
    return (
      <div className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/15 border border-amber-200/50 dark:border-amber-700/30 ${className}`}>
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-medium">
          <span className="material-icons-round text-sm" aria-hidden="true">hourglass_disabled</span>
          <span>Hết {MAX_DAILY_QUERIES} lượt hôm nay · Làm mới lúc 00:00</span>
        </div>
        <a
          href="/app/nang-cap"
          className="shrink-0 text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
        >
          Nâng cấp
          <span className="material-icons-round text-sm" aria-hidden="true">arrow_forward</span>
        </a>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
        isLimitReached
          ? 'bg-red-50 dark:bg-red-900/15 text-red-600 dark:text-red-400 border-red-200/40 dark:border-red-700/25'
          : pct > 40
            ? 'bg-blue-50 dark:bg-blue-900/15 text-blue-600 dark:text-blue-400 border-blue-200/40 dark:border-blue-700/25'
            : 'bg-amber-50 dark:bg-amber-900/15 text-amber-600 dark:text-amber-400 border-amber-200/40 dark:border-amber-700/25'
      } ${className}`}
      title={`${queriesRemaining} / ${MAX_DAILY_QUERIES} lượt tra cứu còn lại hôm nay`}
    >
      <span className="material-icons-round text-sm" aria-hidden="true">
        {isLimitReached ? 'block' : 'hourglass_empty'}
      </span>
      <span>
        {isLimitReached
          ? 'Hết lượt'
          : `${queriesRemaining}/${MAX_DAILY_QUERIES} lượt`}
      </span>
    </div>
  );
}
