/**
 * GraveDirectionPanel — Compass Selector + Mini Flying Star Grid
 *
 * Auto-shown when FAQ intent = 'tang-le' and Trùng Tang result is safe.
 * Lets users select a facing direction and see the yin-house Flying Star analysis
 * with Nạp Âm compatibility highlighting.
 */

import React, { useState, useMemo } from 'react';
import { computeGraveDirection, type GraveDirectionResult } from '../../services/synastry/graveDirection';

interface GraveDirectionPanelProps {
  deceasedBirthYear: string;
  currentYear: number;
}

const DIRECTIONS = ['Bắc', 'Đông Bắc', 'Đông', 'Đông Nam', 'Nam', 'Tây Nam', 'Tây', 'Tây Bắc'];

const DIR_ICONS: Record<string, string> = {
  'Bắc': '⬆️', 'Đông Bắc': '↗️', 'Đông': '➡️', 'Đông Nam': '↘️',
  'Nam': '⬇️', 'Tây Nam': '↙️', 'Tây': '⬅️', 'Tây Bắc': '↖️',
};

const GraveDirectionPanel: React.FC<GraveDirectionPanelProps> = ({
  deceasedBirthYear,
  currentYear,
}) => {
  const [selectedDir, setSelectedDir] = useState('Nam');
  const year = parseInt(deceasedBirthYear, 10);

  const result: GraveDirectionResult | null = useMemo(() => {
    if (!year || year < 1900 || year > 2100) return null;
    try {
      return computeGraveDirection(year, currentYear, selectedDir);
    } catch {
      return null;
    }
  }, [year, currentYear, selectedDir]);

  if (!year || year < 1900 || year > 2100) return null;

  return (
    <div className="rounded-xl border border-black/5 dark:border-white/10 overflow-hidden bg-white/60 dark:bg-white/5">
      {/* Header */}
      <div className="px-4 py-3 bg-indigo-50 dark:bg-indigo-900/15 border-b border-black/5 dark:border-white/10">
        <h4 className="text-sm font-semibold text-indigo-800 dark:text-indigo-300 flex items-center gap-2">
          <span className="material-icons-round text-lg">explore</span>
          Hướng mộ — Phi Tinh Âm Trạch
        </h4>
        <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">
          Chọn hướng để xem Phi Tinh + Nạp Âm hợp tuổi
        </p>
      </div>

      {/* Direction Selector */}
      <div className="p-3">
        <div className="flex flex-wrap gap-1.5 justify-center">
          {DIRECTIONS.map((dir) => {
            const isSelected = selectedDir === dir;
            const isSuitable = result?.suitableDirections.includes(dir);
            const isUnsuitable = result?.unsuitableDirections.includes(dir);

            return (
              <button
                key={dir}
                onClick={() => setSelectedDir(dir)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
                  isSelected
                    ? 'bg-indigo-100 dark:bg-indigo-800/30 text-indigo-800 dark:text-indigo-200 ring-2 ring-indigo-400/30'
                    : isSuitable
                      ? 'bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400'
                      : isUnsuitable
                        ? 'bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400'
                        : 'bg-gray-50 dark:bg-gray-800/20 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/20'
                }`}
              >
                <span className="text-xs">{DIR_ICONS[dir]}</span>
                {dir}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="px-4 pb-4 space-y-3">
          {/* Assessment */}
          <div className={`p-3 rounded-lg text-sm ${
            result.suitableDirections.includes(selectedDir)
              ? 'bg-emerald-50 dark:bg-emerald-900/10 text-emerald-800 dark:text-emerald-300'
              : result.unsuitableDirections.includes(selectedDir)
                ? 'bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-300'
                : 'bg-amber-50 dark:bg-amber-900/10 text-amber-800 dark:text-amber-300'
          }`}>
            <p className="font-medium">{result.assessment}</p>
            <p className="text-xs mt-1 opacity-75">
              Nạp Âm mệnh: <strong>{result.napAmElement}</strong> · Vận {result.chart.period} ({result.chart.periodRange})
            </p>
          </div>

          {/* Mini 3×3 Flying Star Grid */}
          <div className="grid grid-cols-3 gap-1">
            {result.chart.palaces.map((palace) => (
              <div
                key={palace.position}
                className={`p-2 rounded-lg text-center text-xs border ${
                  palace.nature === 'cat'
                    ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/30'
                    : palace.nature === 'hung'
                      ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800/30'
                      : 'bg-gray-50 dark:bg-gray-800/20 border-gray-200 dark:border-gray-700/30'
                }`}
              >
                <div className="font-semibold text-gray-500 dark:text-gray-400 text-[10px]">
                  {palace.positionVi}
                </div>
                <div className="font-bold text-sm mt-0.5">
                  <span className="text-purple-600 dark:text-purple-400">{palace.mountainStar}</span>
                  <span className="text-gray-400 mx-0.5">·</span>
                  <span className="text-blue-600 dark:text-blue-400">{palace.waterStar}</span>
                </div>
                <div className="text-[10px] text-gray-500 dark:text-gray-500 mt-0.5 truncate">
                  {palace.combination.split('—')[0].trim()}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3 text-[10px] text-gray-500 dark:text-gray-500 justify-center">
            <span><span className="text-purple-600">■</span> Sơn tinh</span>
            <span><span className="text-blue-600">■</span> Thủy tinh</span>
            <span>🟢 Cát</span>
            <span>🔴 Hung</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GraveDirectionPanel;
