/**
 * DataSummaryBar — Universal Collapsed Input Summary Bar
 *
 * After a chart/profile is generated, the full input form collapses into this
 * compact 50px sticky bar showing the key birth data. Tapping the edit button
 * re-opens the form as a modal overlay.
 *
 * Design spec (wireframes.md / implementation_plan.md):
 *  - Sticky top position below the main app header
 *  - Shows: Name | Date | Time (optional) | Location (optional)
 *  - Edit button (✎) on the right to re-open the form
 *  - Smooth collapse/expand animation
 *  - Consistent across all 5 astrology modules
 */

import React from 'react';

interface DataSummaryBarProps {
  /** Primary label — typically the person's name or chart title */
  name?: string;
  /** Date string, e.g., "01/01/1990" */
  date?: string;
  /** Time string, e.g., "12:30" */
  time?: string;
  /** Location name, e.g., "TP Hồ Chí Minh" */
  location?: string;
  /** Extra metadata badges (e.g., school name, system) */
  badges?: { label: string; color?: string }[];
  /** Callback when the edit button is tapped */
  onEdit: () => void;
  /** Callback for the "new chart" / reset button */
  onReset?: () => void;
  /** Optional children to render in the right slot (e.g., school selector) */
  children?: React.ReactNode;
  className?: string;
}

export default function DataSummaryBar({
  name,
  date,
  time,
  location,
  badges,
  onEdit,
  onReset,
  children,
  className = '',
}: DataSummaryBarProps) {
  return (
    <div
      className={`sticky top-0 z-30 flex items-center justify-between gap-3 px-4 py-2.5 
        bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md 
        border border-border-light/50 dark:border-border-dark/50 
        rounded-2xl shadow-sm transition-all duration-300 ${className}`}
    >
      {/* Left: Summary info */}
      <div className="flex items-center gap-3 min-w-0 overflow-hidden">
        {/* Avatar/Icon */}
        <div className="w-8 h-8 rounded-full bg-gold/10 dark:bg-gold-dark/10 flex items-center justify-center shrink-0">
          <span className="material-icons-round text-sm text-gold dark:text-gold-dark" aria-hidden="true">
            person
          </span>
        </div>

        {/* Text info */}
        <div className="flex items-center gap-2 text-sm min-w-0 overflow-hidden">
          {name && (
            <span className="font-semibold text-text-primary-light dark:text-text-primary-dark truncate max-w-[120px] sm:max-w-[200px]">
              {name}
            </span>
          )}
          {date && (
            <>
              <span className="text-text-secondary-light/30 dark:text-text-secondary-dark/30">|</span>
              <span className="text-text-secondary-light dark:text-text-secondary-dark whitespace-nowrap">
                {date}
              </span>
            </>
          )}
          {time && (
            <>
              <span className="text-text-secondary-light/30 dark:text-text-secondary-dark/30">|</span>
              <span className="text-text-secondary-light dark:text-text-secondary-dark whitespace-nowrap">
                {time}
              </span>
            </>
          )}
          {location && (
            <span className="hidden sm:inline text-text-secondary-light dark:text-text-secondary-dark truncate max-w-[150px]">
              · {location}
            </span>
          )}
        </div>

        {/* Badges */}
        {badges && badges.length > 0 && (
          <div className="hidden sm:flex items-center gap-1.5">
            {badges.map((badge, i) => (
              <span
                key={i}
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  badge.color || 'bg-gold/10 dark:bg-gold-dark/10 text-gold dark:text-gold-dark'
                }`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {children}

        <button
          onClick={onEdit}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold 
            text-gold dark:text-gold-dark bg-gold/10 dark:bg-gold-dark/10 
            hover:bg-gold/20 dark:hover:bg-gold-dark/20 
            border border-gold/20 dark:border-gold-dark/20 
            transition-all duration-200"
          title="Sửa thông tin"
        >
          <span className="material-icons-round text-sm" aria-hidden="true">edit</span>
          <span className="hidden sm:inline">Sửa</span>
        </button>

        {onReset && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold 
              text-text-secondary-light dark:text-text-secondary-dark 
              hover:text-gold dark:hover:text-gold-dark
              hover:bg-gold/5 dark:hover:bg-gold-dark/5
              transition-all duration-200"
            title="Lập lá số mới"
          >
            <span className="material-icons-round text-sm" aria-hidden="true">add_circle</span>
            <span className="hidden sm:inline">Mới</span>
          </button>
        )}
      </div>
    </div>
  );
}
