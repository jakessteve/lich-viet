/**
 * TierBadge — Unified pill indicator for tier-gated sections.
 *
 * Used anywhere a section requires a specific tier to unlock.
 * Replaces ad-hoc "lock" icons scattered across engine pages
 * (implementation_plan.md §B1 / Part G Design Audit).
 *
 * Tiers:
 *  - free    → gray  + lock icon       → "Đăng ký"
 *  - premium → amber + star icon       → "Premium"
 *  - elite   → purple + diamond icon  → "Elite"
 *  - credit  → indigo + sparkle icon  → "N tín dụng" (requires creditCost prop)
 */

import React from 'react';

export type TierBadgeLevel = 'free' | 'premium' | 'elite' | 'credit';

interface TierBadgeProps {
  tier: TierBadgeLevel;
  /** Credit cost — only used when tier="credit" */
  creditCost?: number;
  className?: string;
}

const CONFIG: Record<TierBadgeLevel, { label: string; icon: string; classes: string }> = {
  free: {
    label: 'Đăng ký',
    icon: 'lock',
    classes: 'bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600/40',
  },
  premium: {
    label: 'Premium',
    icon: 'workspace_premium',
    classes: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-700/40',
  },
  elite: {
    label: 'Elite',
    icon: 'diamond',
    classes: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-700/40',
  },
  credit: {
    label: 'tín dụng',
    icon: 'stars',
    classes: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700/40',
  },
};

export default function TierBadge({ tier, creditCost, className = '' }: TierBadgeProps) {
  const { label, icon, classes } = CONFIG[tier];

  const displayLabel =
    tier === 'credit' && creditCost != null
      ? `${creditCost} ${label}`
      : label;

  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2 py-0.5 rounded-full
        text-xs font-medium h-6 shrink-0 select-none
        ${classes} ${className}
      `}
      aria-label={`Yêu cầu: ${displayLabel}`}
    >
      <span className="material-icons-round text-[13px] leading-none" aria-hidden="true">
        {icon}
      </span>
      <span>{displayLabel}</span>
    </span>
  );
}
