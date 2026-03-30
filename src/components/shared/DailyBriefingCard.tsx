// ══════════════════════════════════════════════════════════
// DailyBriefingCard — Premium personalized day-briefing card
//
// Shows a premium retention widget for today's astrological
// summary: day quality %, best hour, and a one-liner insight.
//
// Free/guest users see a gated teaser with upgrade CTA.
// Premium/Elite see the full card.
// ══════════════════════════════════════════════════════════

import React from 'react';
import { useUserTier } from '../../hooks/useUserTier';
import type { DayDetailsData } from '../../types/calendar';

interface DailyBriefingCardProps {
  data: DayDetailsData;
  date: Date;
  className?: string;
}

function getQualityLabel(score: number): { label: string; color: string; emoji: string } {
  if (score >= 80) return { label: 'Đại Cát', color: 'emerald', emoji: '🌟' };
  if (score >= 65) return { label: 'Tốt Lành', color: 'blue', emoji: '✨' };
  if (score >= 50) return { label: 'Bình Thường', color: 'amber', emoji: '🌤' };
  return { label: 'Cần Cẩn Thận', color: 'red', emoji: '⚠️' };
}

function DailyBriefingCardFull({ data, date }: DailyBriefingCardProps) {
  // Compute day quality from auspicious hours ratio
  const auspiciousCount = data.allHours.filter((h) => h.isAuspicious).length;
  const dayScore = Math.round((auspiciousCount / Math.max(data.allHours.length, 1)) * 100);
  const { label, color, emoji } = getQualityLabel(dayScore);

  // Best auspicious hour
  const bestHour = data.allHours.filter((h) => h.isAuspicious)[0];

  // Day can-chi
  const dayCanChi = `${data.canChi.day.can} ${data.canChi.day.chi}`;

  // Key insight from suitability
  const topActivity = data.dungSu.suitable[0];

  const colorMap: Record<string, string> = {
    emerald: 'from-emerald-400 to-teal-500',
    blue: 'from-blue-400 to-indigo-500',
    amber: 'from-amber-400 to-orange-500',
    red: 'from-red-400 to-rose-500',
  };
  const bgMap: Record<string, string> = {
    emerald: 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200/40 dark:border-emerald-700/25',
    blue: 'bg-blue-50 dark:bg-blue-900/10 border-blue-200/40 dark:border-blue-700/25',
    amber: 'bg-amber-50 dark:bg-amber-900/10 border-amber-200/40 dark:border-amber-700/25',
    red: 'bg-red-50 dark:bg-red-900/10 border-red-200/40 dark:border-red-700/25',
  };

  return (
    <div className={`glass-card p-4 space-y-3 border ${bgMap[color]}`}>
      {/* Header row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center shrink-0 shadow-sm`}>
            <span className="text-xl" role="img" aria-label={label}>{emoji}</span>
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">
              {label}
            </p>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
              {dayCanChi} · {date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'short' })}
            </p>
          </div>
        </div>
        {/* Day score ring */}
        <div className="relative w-12 h-12 shrink-0">
          <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-200 dark:text-gray-700" />
            <circle
              cx="18" cy="18" r="15" fill="none" strokeWidth="3"
              strokeDasharray={`${dayScore * 0.942} 94.2`}
              strokeLinecap="round"
              className={`text-${color}-500 dark:text-${color}-400 transition-all duration-1000`}
              stroke="currentColor"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-text-primary-light dark:text-text-primary-dark">{dayScore}%</span>
          </div>
        </div>
      </div>

      {/* Best hour + top activity */}
      <div className="grid grid-cols-2 gap-2">
        {bestHour && (
          <div className="rounded-lg bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/5 p-2.5 text-center">
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-0.5 font-medium">Giờ Tốt Nhất</p>
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{bestHour.canChi.chi}</p>
          </div>
        )}
        <div className="rounded-lg bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/5 p-2.5 text-center">
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-0.5 font-medium">Ngày Âm</p>
          <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">
            {data.lunarDate.day}/{data.lunarDate.month}
          </p>
        </div>
      </div>

      {/* Top suitable activity */}
      {topActivity && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5">
          <span className="material-icons-round text-sm text-emerald-500" aria-hidden="true">check_circle</span>
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
            <span className="font-semibold text-text-primary-light dark:text-text-primary-dark">Nên làm: </span>
            {topActivity}
          </p>
        </div>
      )}
    </div>
  );
}

function DailyBriefingCardTeaser({ date }: { date: Date }) {
  return (
    <div className="glass-card p-4 border border-border-light/30 dark:border-border-dark/20 relative overflow-hidden">
      {/* Blurred preview */}
      <div className="blur-sm opacity-40 pointer-events-none space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
            <span className="text-xl">🌟</span>
          </div>
          <div>
            <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700 mb-1" />
            <div className="h-3 w-28 rounded bg-gray-100 dark:bg-gray-800" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-14 rounded-lg bg-gray-100 dark:bg-gray-800" />
          <div className="h-14 rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>
      </div>

      {/* CTA overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-[2px] rounded-2xl">
        <div className="text-center space-y-2 px-4">
          <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">
            📅 Tóm Tắt Ngày {date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'short' })}
          </p>
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
            Phân tích điểm ngày, giờ tốt và gợi ý hoạt động
          </p>
          <a
            href="/app/nang-cap"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold shadow-sm hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="material-icons-round text-sm" aria-hidden="true">workspace_premium</span>
            Mở khóa Premium
          </a>
        </div>
      </div>
    </div>
  );
}

export function DailyBriefingCard({ data, date, className = '' }: DailyBriefingCardProps) {
  const { hasAccess } = useUserTier();

  return (
    <div className={className}>
      {hasAccess('premium') ? (
        <DailyBriefingCardFull data={data} date={date} />
      ) : (
        <DailyBriefingCardTeaser date={date} />
      )}
    </div>
  );
}
