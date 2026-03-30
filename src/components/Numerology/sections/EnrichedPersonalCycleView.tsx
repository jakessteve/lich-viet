/**
 * EnrichedPersonalCycleView — Personal year/month/day cycle with deep meanings
 */

import React from 'react';
import type { NumerologyProfile } from '@lich-viet/core/numerology';
import { PERSONAL_YEAR_MEANINGS, PERSONAL_MONTH_MEANINGS } from '../../../data/interpretation/numerology/personalCycles';

export default function EnrichedPersonalCycleView({ profile }: { profile: NumerologyProfile }) {
  const { personalCycle } = profile;
  const yearData = PERSONAL_YEAR_MEANINGS[personalCycle.personalYear];
  const monthData = PERSONAL_MONTH_MEANINGS[personalCycle.personalMonth];

  return (
    <div className="space-y-4">
      {/* Year/Month/Day numbers */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Năm Cá Nhân', value: personalCycle.personalYear },
          { label: 'Tháng Cá Nhân', value: personalCycle.personalMonth },
          { label: 'Ngày Cá Nhân', value: personalCycle.personalDay },
        ].map((item, i) => (
          <div key={i} className="glass-card p-3 text-center space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-text-secondary-light/50 dark:text-text-secondary-dark/40">{item.label}</p>
            <p className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-br from-gold to-amber-600 dark:from-gold-dark dark:to-amber-400">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Rich Year interpretation */}
      {yearData && (
        <div className="glass-card p-4 space-y-2">
          <p className="text-xs font-bold text-gold dark:text-gold-dark">📅 Năm Cá Nhân {personalCycle.personalYear}</p>
          <p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">{yearData.theme}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-emerald-50/50 dark:bg-emerald-900/10">
              <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mb-0.5">Nên tập trung</p>
              <p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-snug">{yearData.focus}</p>
            </div>
            <div className="p-2 rounded-lg bg-red-50/50 dark:bg-red-900/10">
              <p className="text-[10px] font-bold text-red-600 dark:text-red-400 mb-0.5">Nên tránh</p>
              <p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-snug">{yearData.avoid}</p>
            </div>
            <div className="p-2 rounded-lg bg-amber-50/50 dark:bg-amber-900/10">
              <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 mb-0.5">Cơ hội</p>
              <p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-snug">{yearData.opportunities}</p>
            </div>
            <div className="p-2 rounded-lg bg-pink-50/50 dark:bg-pink-900/10">
              <p className="text-[10px] font-bold text-pink-600 dark:text-pink-400 mb-0.5">Tình cảm</p>
              <p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-snug">{yearData.relationships}</p>
            </div>
          </div>
        </div>
      )}

      {/* Rich Month interpretation */}
      {monthData && (
        <div className="glass-card p-3 space-y-1">
          <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">📆 Tháng Cá Nhân {personalCycle.personalMonth} — {monthData.theme}</p>
          <p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-snug">{monthData.advice}</p>
        </div>
      )}
    </div>
  );
}
