/**
 * ThaiAtYearPanel — Annual Cosmic Climate panel for Âm Lịch view
 * Shows Thái Ất palace position, Host/Guest counts, and yearly forecast.
 */

import React, { useMemo } from 'react';
import { getThaiAtYearChart } from '@lich-viet/core/thaiAt';
import type { ThaiAtChart } from '../../types/thaiAt';

interface ThaiAtYearPanelProps {
  lunarYear: number;
}

const TONE_STYLES = {
  optimistic: {
    bg: 'bg-emerald-50/80 dark:bg-emerald-900/15',
    border: 'border-emerald-200/60 dark:border-emerald-700/30',
    text: 'text-emerald-700 dark:text-emerald-400',
    icon: 'trending_up',
  },
  neutral: {
    bg: 'bg-amber-50/80 dark:bg-amber-900/15',
    border: 'border-amber-200/60 dark:border-amber-700/30',
    text: 'text-amber-700 dark:text-amber-400',
    icon: 'balance',
  },
  cautious: {
    bg: 'bg-blue-50/80 dark:bg-blue-900/10',
    border: 'border-blue-200/60 dark:border-blue-700/30',
    text: 'text-blue-700 dark:text-blue-400',
    icon: 'visibility',
  },
};

const ThaiAtYearPanel: React.FC<ThaiAtYearPanelProps> = ({ lunarYear }) => {
  const chart: ThaiAtChart | null = useMemo(() => {
    try {
      return getThaiAtYearChart(lunarYear);
    } catch {
      return null;
    }
  }, [lunarYear]);

  if (!chart) {
    return (
      <div className="text-center py-3 text-xs text-text-secondary-light dark:text-text-secondary-dark">
        Không thể tính Thái Ất cho năm này
      </div>
    );
  }

  const toneStyle = TONE_STYLES[chart.forecastTone];
  const hostPct = Math.round((chart.hostGuest.hostCount / (chart.hostGuest.hostCount + chart.hostGuest.guestCount)) * 100);

  return (
    <div className="space-y-3 p-5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-icons-round text-lg text-purple-500 dark:text-purple-400">public</span>
          <h4 className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">
            Vận Khí Năm {chart.canChiYear} ({chart.lunarYear})
          </h4>
        </div>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${toneStyle.bg} ${toneStyle.text} ${toneStyle.border}`}>
          <span className="material-icons-round text-xs">{toneStyle.icon}</span>
          {chart.element}
        </span>
      </div>

      {/* Thái Ất position */}
      <div className={`rounded-xl p-3 border ${toneStyle.bg} ${toneStyle.border}`}>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-[10px] uppercase tracking-wider font-bold text-text-secondary-light/60 dark:text-text-secondary-dark/50 mb-0.5">Thái Ất tại</p>
            <p className="font-bold text-sm text-text-primary-light dark:text-text-primary-dark">
              {chart.thaiAtPalaceInfo.nameVi} ({chart.thaiAtPalace})
            </p>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mt-0.5 leading-snug">
              {chart.thaiAtPalaceInfo.direction}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-bold text-text-secondary-light/60 dark:text-text-secondary-dark/50 mb-0.5">Chủ / Khách</p>
            <p className="font-bold text-sm text-text-primary-light dark:text-text-primary-dark">
              {chart.hostGuest.hostCount} / {chart.hostGuest.guestCount}
            </p>
            <p className={`font-medium mt-0.5 ${toneStyle.text}`}>
              {chart.hostGuest.dominanceLabel}
            </p>
          </div>
        </div>

        {/* Host/Guest ratio bar */}
        <div className="mt-2.5">
          <div className="h-1.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${hostPct}%` }}
            />
          </div>
          <div className="flex justify-between mt-0.5 text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/50">
            <span>Chủ {hostPct}%</span>
            <span>Khách {100 - hostPct}%</span>
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div className="text-xs text-text-primary-light dark:text-text-primary-dark leading-relaxed">
        <p className="font-medium">{chart.forecast}</p>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 italic">
          {chart.hostGuest.dominanceAdvice}
        </p>
      </div>

      {/* Deities strip */}
      <div className="flex flex-wrap gap-1.5">
        {chart.deityPositions.map(d => {
          const isGood = d.nature === 'cat';
          const isBad = d.nature === 'hung';
          return (
            <span
              key={d.id}
              className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium border
                ${isGood ? 'bg-emerald-50/80 dark:bg-emerald-900/15 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-700/30'
                : isBad ? 'bg-red-50/80 dark:bg-red-900/10 text-red-600 dark:text-red-400 border-red-200/60 dark:border-red-700/30'
                : 'bg-gray-50/80 dark:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark border-gray-200/60 dark:border-white/10'}`}
            >
              {d.nameVi}
              <span className="opacity-50">Cung {d.palace}</span>
            </span>
          );
        })}
      </div>

      {/* Epoch info */}
      <p className="text-[10px] text-text-secondary-light/50 dark:text-text-secondary-dark/40">
        Nguyên niên: Chu kỳ {chart.epochPosition.cycleNumber}/5 · Năm {chart.epochPosition.cycleYear}/72 · Tiểu chu kỳ {chart.epochPosition.subCycleYear}/12
      </p>
    </div>
  );
};

export default ThaiAtYearPanel;
