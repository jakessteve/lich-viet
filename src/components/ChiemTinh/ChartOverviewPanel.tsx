/**
 * ChartOverviewPanel — Step 1: Element / Modality / Polarity balance + chart pattern
 */
import React from 'react';
import Icon from '../shared/Icon';
import type { NatalChart, InterpretationResult } from '../../types/westernAstro';
import { ELEMENT_NAMES, ELEMENT_COLORS } from '../../data/westernAstro/zodiacSigns';
import { QUALITY_NAMES } from '../../data/westernAstro/zodiacSigns';

interface Props {
  chart: NatalChart;
  interpretation: InterpretationResult;
}

export default function ChartOverviewPanel({ chart, interpretation: _interpretation }: Props) {
  const o = chart.overview;
  const total = chart.planets.length;

  return (
    <div className="card-surface p-4 space-y-4">
      <h3 className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark flex items-center gap-2">
        <Icon name="bar_chart" className="w-4 h-4 text-gold dark:text-gold-dark" /> Tổng Quan Bản Đồ Sao
      </h3>

      {/* Chart Pattern */}
      {o.pattern && (
        <div className="px-3 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200/50 dark:border-indigo-700/30">
          <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
            Hình dạng: {o.patternDescription}
          </p>
        </div>
      )}

      {/* Element Balance */}
      <div>
        <p className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">Ưu Thế Nguyên Tố (%)</p>
        <div className="grid grid-cols-4 gap-2">
          {(['fire', 'earth', 'air', 'water'] as const).map((el) => {
            const pct = o.elementBalance[el] || 0;
            return (
              <div key={el} className="text-center">
                <div className="h-16 relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-1">
                  <div
                    className="absolute bottom-0 w-full rounded-b-lg transition-all duration-500"
                    style={{ height: `${pct}%`, backgroundColor: ELEMENT_COLORS[el], opacity: 0.7 }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">{Math.round(pct)}%</span>
                </div>
                <span className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">
                  {ELEMENT_NAMES[el]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modality Balance */}
      <div>
        <p className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">Ưu Thế Đặc Tính (%)</p>
        <div className="space-y-1.5">
          {(['cardinal', 'fixed', 'mutable'] as const).map((q) => {
            const pct = o.qualityBalance[q] || 0;
            return (
              <div key={q} className="flex items-center gap-2">
                <span className="text-xs font-medium w-20 text-text-secondary-light dark:text-text-secondary-dark">
                  {QUALITY_NAMES[q]}
                </span>
                <div className="flex-1 h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-gold/60 dark:bg-gold-dark/60 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono leading-none">{Math.round(pct)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Polarity */}
      <div className="flex items-center gap-3 text-sm">
        <span className="font-medium text-text-secondary-light dark:text-text-secondary-dark">Cực tính:</span>
        <span>
          ☯ Dương {o.polarityBalance.yang} · Âm {o.polarityBalance.yin}
        </span>
      </div>
    </div>
  );
}
