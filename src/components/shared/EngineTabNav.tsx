/**
 * EngineTabNav — Unified tab navigation for all engine pages.
 *
 * Replaces:
 *  - ChiemTinhView's inline gray-bg segmented control
 *  - HopLaPage's glass-nav pill nav
 *  - (New) BaziResultsView and NumerologyView tabs
 *
 * Design spec (implementation_plan.md §G1):
 *  - bg-surface-subtle-light dark:bg-surface-subtle-dark container
 *  - rounded-2xl p-1.5
 *  - Active pill: bg-white dark:bg-gray-700  text-gold shadow-sm rounded-xl
 *  - Icon (material-icons-round) + label per tab
 *  - Optional headerRight slot for ProModeToggle or CreditWalletBadge
 *  - Scrollable on mobile: overflow-x-auto scrollbar-none
 */

import React from 'react';

export interface EngineTab {
  id: string;
  label: string;
  /** material-icons-round icon name */
  icon?: string;
  /** If true, tab is dimmed but still clickable (for tier-locked sections) */
  locked?: boolean;
}

interface EngineTabNavProps {
  tabs: EngineTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  /** Optional element rendered to the far right of the nav bar (e.g. ProModeToggle) */
  headerRight?: React.ReactNode;
  className?: string;
}

export default function EngineTabNav({
  tabs,
  activeTab,
  onTabChange,
  headerRight,
  className = '',
}: EngineTabNavProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Tab strip */}
      <div className="flex-1 flex bg-surface-subtle-light dark:bg-surface-subtle-dark rounded-2xl p-1.5 overflow-x-auto scrollbar-none gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              role="tab"
              aria-selected={isActive}
              className={`
                flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap
                transition-all duration-200 relative
                ${isActive
                  ? 'bg-white dark:bg-gray-700 text-gold dark:text-gold-dark shadow-sm'
                  : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-gold dark:hover:text-gold-dark hover:bg-white/50 dark:hover:bg-gray-700/50'
                }
                ${tab.locked ? 'opacity-60' : ''}
              `}
            >
              {tab.icon && (
                <span className="material-icons-round text-[18px] leading-none" aria-hidden="true">
                  {tab.icon}
                </span>
              )}
              <span>{tab.label}</span>
              {tab.locked && (
                <span className="material-icons-round text-[14px] leading-none opacity-60" aria-hidden="true">
                  lock
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Optional right slot (e.g. ProModeToggle, CreditWalletBadge) */}
      {headerRight && (
        <div className="shrink-0 flex items-center">
          {headerRight}
        </div>
      )}
    </div>
  );
}
