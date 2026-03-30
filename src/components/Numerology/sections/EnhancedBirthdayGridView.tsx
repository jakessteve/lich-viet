/**
 * EnhancedBirthdayGridView — Birthday grid with arrows, frequencies, and missing numbers
 */

import React from 'react';
import type { NumerologyProfile } from '@lich-viet/core/numerology';
import { ARROW_INTERPRETATIONS, MISSING_NUMBER_MEANINGS } from '../../../data/interpretation/numerology/arrowInterpretations';
import { NUMBER_FREQUENCY } from '../../../data/interpretation/numerology/numberFrequency';

export default function EnhancedBirthdayGridView({ profile }: { profile: NumerologyProfile }) {
  const { grid, arrows: _arrows, missing } = profile.birthdayGrid;
  const GRID_LABELS = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  const ARROW_KEYS = ['row-0', 'row-1', 'row-2', 'col-0', 'col-1', 'col-2', 'diag-0', 'diag-1'];

  // Detect present & absent arrows
  const presentArrowKeys = ARROW_KEYS.filter(k => {
    if (k.startsWith('row-')) { const r = parseInt(k.split('-')[1]); return grid[r][0] > 0 && grid[r][1] > 0 && grid[r][2] > 0; }
    if (k.startsWith('col-')) { const c = parseInt(k.split('-')[1]); return grid[0][c] > 0 && grid[1][c] > 0 && grid[2][c] > 0; }
    if (k === 'diag-0') return grid[0][0] > 0 && grid[1][1] > 0 && grid[2][2] > 0;
    if (k === 'diag-1') return grid[0][2] > 0 && grid[1][1] > 0 && grid[2][0] > 0;
    return false;
  });
  const absentArrowKeys = ARROW_KEYS.filter(k => !presentArrowKeys.includes(k));

  return (
    <div className="space-y-4">
      {/* Grid */}
      <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto">
        {GRID_LABELS.map((row, r) =>
          row.map((num, c) => {
            const count = grid[r][c];
            const isPresent = count > 0;
            const freq = NUMBER_FREQUENCY[num];
            const freqKey = count >= 4 ? 'x4plus' : count === 3 ? 'x3' : count === 2 ? 'x2' : 'x1';
            return (
              <div
                key={num}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center border transition-all ${isPresent
                  ? count >= 3 ? 'bg-purple-100 dark:bg-purple-900/25 border-purple-300/60 dark:border-purple-600/40'
                    : 'bg-purple-50 dark:bg-purple-900/15 border-purple-200/60 dark:border-purple-700/30'
                  : 'bg-gray-50 dark:bg-white/3 border-gray-200/40 dark:border-white/5 opacity-40'
                  }`}
                title={isPresent && freq ? freq[freqKey] : undefined}
              >
                <span className={`text-lg font-black ${isPresent ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400 dark:text-gray-600'
                  }`}>{num}</span>
                {isPresent && (
                  <span className={`text-[10px] font-bold ${count >= 3 ? 'text-purple-600/80 dark:text-purple-300/70' : 'text-purple-500/60 dark:text-purple-400/50'}`}>
                    ×{count}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Number Frequency Insights (for numbers ×2+) */}
      {(() => {
        const multiNums = Array.from({ length: 9 }, (_, i) => i + 1).filter(n => {
          const r = Math.floor((n - 1) / 3), c = (n - 1) % 3;
          return grid[r][c] >= 2;
        });
        if (multiNums.length === 0) return null;
        return (
          <div className="space-y-1.5">
            <p className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Tần suất nổi bật:</p>
            {multiNums.map(n => {
              const r = Math.floor((n - 1) / 3), c = (n - 1) % 3;
              const count = grid[r][c];
              const freq = NUMBER_FREQUENCY[n];
              const freqKey = count >= 4 ? 'x4plus' : count === 3 ? 'x3' : 'x2';
              return (
                <div key={n} className="glass-card p-2">
                  <p className="text-xs font-bold text-purple-700 dark:text-purple-300">Số {n} × {count}</p>
                  <p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-snug">{freq?.[freqKey]}</p>
                </div>
              );
            })}
          </div>
        );
      })()}

      {/* Present Arrows with meanings */}
      {presentArrowKeys.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Mũi tên hiện diện:</p>
          {presentArrowKeys.map(k => {
            const interp = ARROW_INTERPRETATIONS[k];
            return (
              <div key={k} className="glass-card p-2">
                <p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-snug">{interp?.present}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Missing Arrows */}
      {absentArrowKeys.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Mũi tên thiếu:</p>
          {absentArrowKeys.slice(0, 3).map(k => {
            const interp = ARROW_INTERPRETATIONS[k];
            return (
              <div key={k} className="glass-card p-2">
                <p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-snug">{interp?.absent}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Missing Numbers with meanings */}
      {missing.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Số thiếu:</p>
          <div className="space-y-1.5">
            {missing.map(n => {
              const m = MISSING_NUMBER_MEANINGS[n];
              return (
                <div key={n} className="glass-card p-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-lg bg-amber-50 dark:bg-amber-900/15 text-amber-700 dark:text-amber-400 text-xs font-bold flex items-center justify-center border border-amber-200/40 dark:border-amber-700/20">{n}</span>
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-400">Thiếu số {n}</span>
                  </div>
                  {m && (
                    <>
                      <p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-snug">{m.meaning}</p>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-0.5">💡 {m.advice}</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
