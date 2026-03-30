/**
 * HourPickerGrid — Redesigned hour selection with score context
 * Shows 12 Chinese hours as cards with color-coded scores,
 * sorted by score when available. Larger touch targets for mobile.
 */

import React, { useMemo } from 'react';
import type { Chi } from '../../types/calendar';
import type { HourInfo } from '../../types/calendar';
import type { HourScoreEntry } from '@lich-viet/core/dungsu';

interface HourPickerGridProps {
  allHours: HourInfo[];
  selectedHour: Chi | null;
  onSelectHour: (chi: Chi | null) => void;
  hourScores?: HourScoreEntry[];    // Activity-specific scores per hour
  activityName?: string;
}

function getHourColor(score: number | undefined, isAuspicious: boolean): {
  bg: string; text: string; ring: string; dot: string;
} {
  if (score !== undefined) {
    if (score >= 70) return {
      bg: 'bg-emerald-50/80 dark:bg-emerald-900/15',
      text: 'text-emerald-600 dark:text-emerald-400',
      ring: 'ring-emerald-300/40 dark:ring-emerald-600/30',
      dot: 'bg-emerald-500',
    };
    if (score >= 50) return {
      bg: 'bg-amber-50/60 dark:bg-amber-900/10',
      text: 'text-amber-600 dark:text-amber-400',
      ring: 'ring-amber-300/40 dark:ring-amber-600/30',
      dot: 'bg-amber-500',
    };
    return {
      bg: 'bg-red-50/40 dark:bg-red-900/8',
      text: 'text-red-600 dark:text-red-400',
      ring: 'ring-red-300/30 dark:ring-red-600/20',
      dot: 'bg-red-400',
    };
  }
  if (isAuspicious) return {
    bg: 'bg-emerald-50/80 dark:bg-emerald-900/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    ring: 'ring-emerald-300/30',
    dot: 'bg-emerald-500',
  };
  return {
    bg: 'bg-white dark:bg-transparent',
    text: 'text-text-secondary-light dark:text-text-secondary-dark',
    ring: '',
    dot: 'bg-red-400/60',
  };
}

const HourPickerGrid: React.FC<HourPickerGridProps> = ({
  allHours,
  selectedHour,
  onSelectHour,
  hourScores,
  activityName,
}) => {
  // Map hour chi to score
  const scoreMap = useMemo(() => {
    if (!hourScores) return new Map<string, number>();
    return new Map(hourScores.map(hs => [hs.hourInfo.canChi.chi, hs.activityScore]));
  }, [hourScores]);

  const [sortByScore, setSortByScore] = React.useState(false);

  const displayHours = useMemo(() => {
    const hours = [...allHours];
    if (sortByScore && scoreMap.size > 0) {
      hours.sort((a, b) => (scoreMap.get(b.canChi.chi) || 0) - (scoreMap.get(a.canChi.chi) || 0));
    }
    return hours;
  }, [allHours, sortByScore, scoreMap]);

  return (
    <div className="space-y-2">
      {/* Header with sort toggle */}
      {scoreMap.size > 0 && (
        <div className="flex items-center justify-between px-1">
          <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
            {activityName ? `Giờ tốt cho "${activityName}"` : 'Chọn giờ'}
          </span>
          <button
            onClick={() => setSortByScore(!sortByScore)}
            className="text-xs text-gold dark:text-gold-dark hover:underline flex items-center gap-1"
          >
            <span className="material-icons-round" style={{ fontSize: '14px' }}>
              {sortByScore ? 'sort' : 'schedule'}
            </span>
            {sortByScore ? 'Sắp xếp theo điểm' : 'Theo thứ tự giờ'}
          </button>
        </div>
      )}

      {/* Hour grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
        {displayHours.map((h) => {
          const chi = h.canChi.chi;
          const isSelected = selectedHour === chi;
          const score = scoreMap.get(chi);
          const colors = getHourColor(score, h.isAuspicious);
          const timeLabel = h.timeRange.replace(/:00/g, '');

          return (
            <button
              key={h.name}
              onClick={() => onSelectHour(isSelected ? null : chi as Chi)}
              className={`flex flex-col items-center py-2.5 px-2 rounded-xl transition-all duration-200 border ${
                isSelected
                  ? 'bg-gold/15 dark:bg-gold-dark/15 border-gold/40 dark:border-gold-dark/40 ring-1 ring-gold/30 dark:ring-gold-dark/30 shadow-sm scale-[0.97]'
                  : `${colors.bg} border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm`
              }`}
            >
              {/* Chi name */}
              <span className={`text-sm font-bold ${
                isSelected ? 'text-gold dark:text-gold-dark' : colors.text
              }`}>
                {chi}
              </span>

              {/* Time range */}
              <span className="text-[10px] text-text-secondary-light/70 dark:text-text-secondary-dark/70 mt-0.5">
                {timeLabel}
              </span>

              {/* Score or dot indicator */}
              {score !== undefined ? (
                <span className={`text-xs font-bold mt-1 tabular-nums ${
                  isSelected ? 'text-gold dark:text-gold-dark' : colors.text
                }`}>
                  {score}%
                </span>
              ) : (
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${colors.dot}`} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HourPickerGrid;
