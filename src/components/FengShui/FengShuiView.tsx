/**
 * FengShuiView — Phong Thủy / Flying Star View
 *
 * 9-palace grid with Mountain/Water/Period stars,
 * 24 Mountains compass selector, auto/manual period.
 */

import React, { useState, useCallback } from 'react';
import { generateFlyingStarChart, type FlyingStarChart, type PalaceInfo } from '@lich-viet/core/fengshui';
import CollapsibleCard from '../CollapsibleCard';

// ── Star Color Helpers ─────────────────────────────────────────

const STAR_COLORS: Record<string, string> = {
  cat: 'text-emerald-600 dark:text-emerald-400',
  hung: 'text-red-600 dark:text-red-400',
  trung: 'text-amber-600 dark:text-amber-400',
};

const NATURE_BG: Record<string, string> = {
  cat: 'bg-emerald-50/80 dark:bg-emerald-900/10 border-emerald-200/40 dark:border-emerald-700/20',
  hung: 'bg-red-50/80 dark:bg-red-900/10 border-red-200/40 dark:border-red-700/20',
  trung: 'bg-amber-50/80 dark:bg-amber-900/10 border-amber-200/40 dark:border-amber-700/20',
};

// ── Palace Cell ────────────────────────────────────────────────

function PalaceCell({ palace, isSelected, onClick }: { palace: PalaceInfo; isSelected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl p-2 border text-center transition-all cursor-pointer hover:scale-105 ${NATURE_BG[palace.nature]} ${
        isSelected ? 'ring-2 ring-purple-500 shadow-lg' : ''
      } ${palace.position === 'Center' ? 'col-start-2 row-start-2' : ''}`}
    >
      <p className="text-xs font-bold text-text-secondary-light/50 dark:text-text-secondary-dark/40 uppercase">
        {palace.positionVi}
      </p>

      {/* Star trio */}
      <div className="flex items-center justify-center gap-0.5 mt-1">
        <span className="text-xs text-blue-500 font-bold" title="Thủy tinh">
          {palace.waterStar}
        </span>
        <span className="text-lg font-black text-text-primary-light dark:text-text-primary-dark">
          {palace.periodStar}
        </span>
        <span className="text-xs text-amber-600 font-bold" title="Sơn tinh">
          {palace.mountainStar}
        </span>
      </div>

      <span className={`text-xs font-bold ${STAR_COLORS[palace.nature]}`}>
        {palace.nature === 'cat' ? '✅ Cát' : palace.nature === 'hung' ? '❌ Hung' : '☯️'}
      </span>
    </button>
  );
}

// ── Direction Groups for Compass Selector ──────────────────────

const DIRECTION_GROUPS = [
  { id: 'Bắc', icon: '⬆️', label: 'Bắc' },
  { id: 'Đông Bắc', icon: '↗️', label: 'ĐB' },
  { id: 'Đông', icon: '➡️', label: 'Đông' },
  { id: 'Đông Nam', icon: '↘️', label: 'ĐN' },
  { id: 'Nam', icon: '⬇️', label: 'Nam' },
  { id: 'Tây Nam', icon: '↙️', label: 'TN' },
  { id: 'Tây', icon: '⬅️', label: 'Tây' },
  { id: 'Tây Bắc', icon: '↖️', label: 'TB' },
];

// ── Main View ──────────────────────────────────────────────────

export default function FengShuiView() {
  const [constructionYear, setConstructionYear] = useState(new Date().getFullYear());
  const [facingDirection, setFacingDirection] = useState('Nam');
  const [useManualPeriod, setUseManualPeriod] = useState(false);
  const [manualPeriod, setManualPeriod] = useState(9);
  const [chart, setChart] = useState<FlyingStarChart | null>(null);
  const [selectedPalace, setSelectedPalace] = useState<PalaceInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      const result = generateFlyingStarChart(
        constructionYear,
        facingDirection,
        useManualPeriod ? manualPeriod : undefined,
      );
      setChart(result);
      setSelectedPalace(null);
      setIsLoading(false);
    }, 600);
  }, [constructionYear, facingDirection, useManualPeriod, manualPeriod]);

  // Map palaces to grid positions
  const gridOrder = ['SE', 'S', 'SW', 'E', 'Center', 'W', 'NE', 'N', 'NW'];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-5 animate-fade-in-up">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 dark:from-teal-400 dark:via-cyan-400 dark:to-sky-400">
            🧭 Phong Thủy — Huyền Không Phi Tinh
          </span>
        </h2>
        <p className="text-xs sm:text-base text-text-secondary-light dark:text-text-secondary-dark max-w-lg mx-auto">
          Phân tích Phi Tinh — Sơn & Thủy tinh theo 24 Sơn La Bàn
        </p>
      </div>

      {/* Input Form */}
      <div className="glass-card p-5 space-y-4">
        {/* Construction Year */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary-light/60 dark:text-text-secondary-dark/50 mb-1.5">
            Năm xây dựng
          </label>
          <input
            type="number"
            min={1864}
            max={2100}
            value={constructionYear}
            onChange={(e) => setConstructionYear(parseInt(e.target.value) || 2024)}
            className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          />
        </div>

        {/* Facing Direction Compass */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary-light/60 dark:text-text-secondary-dark/50 mb-2">
            Hướng nhà (Hướng cửa chính)
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
            {DIRECTION_GROUPS.map((dir) => (
              <button
                key={dir.id}
                onClick={() => setFacingDirection(dir.id)}
                className={`px-2 py-2 rounded-xl text-sm font-medium transition-all text-center ${
                  facingDirection === dir.id
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md shadow-teal-500/20'
                    : 'bg-gray-100 dark:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-200 dark:hover:bg-white/10'
                }`}
              >
                <span className="text-base block">{dir.icon}</span>
                <span className="text-sm">{dir.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Manual Period Override */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useManualPeriod}
              onChange={(e) => setUseManualPeriod(e.target.checked)}
              className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            <span className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
              Chọn vận thủ công
            </span>
          </label>
          {useManualPeriod && (
            <select
              value={manualPeriod}
              onChange={(e) => setManualPeriod(parseInt(e.target.value))}
              className="px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-white/5 text-xs"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((p) => (
                <option key={p} value={p}>
                  Vận {p}
                </option>
              ))}
            </select>
          )}
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-teal-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="material-icons-round text-sm animate-spin" style={{ animationDuration: '2s' }}>
                explore
              </span>
              Đang tạo bản đồ Phi Tinh...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span className="material-icons-round text-sm">explore</span>
              Lập Bản Đồ Phi Tinh
            </span>
          )}
        </button>
      </div>

      {/* Results */}
      {chart && !isLoading && (
        <div className="space-y-5 animate-fade-in-up">
          {/* Period & Direction Info */}
          <div className="glass-card p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-text-primary-light dark:text-text-primary-dark">
                {chart.periodRange}
              </p>
              <p className="text-base text-text-secondary-light dark:text-text-secondary-dark">
                Hướng: {chart.facingDirection}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                {chart.overallAssessment.substring(0, 60)}...
              </p>
            </div>
          </div>

          {/* 9-Palace Grid */}
          <div className="glass-card p-4">
            <div className="grid grid-cols-3 gap-2">
              {gridOrder.map((pos) => {
                const palace = chart.palaces.find((p) => p.position === pos);
                if (!palace) return <div key={pos} />;
                return (
                  <PalaceCell
                    key={pos}
                    palace={palace}
                    isSelected={selectedPalace?.position === pos}
                    onClick={() => setSelectedPalace(palace)}
                  />
                );
              })}
            </div>
            <div className="flex justify-center gap-4 mt-3 text-xs text-text-secondary-light/60 dark:text-text-secondary-dark/40">
              <span>
                <span className="text-blue-500 font-bold">Trái</span> = Thủy tinh
              </span>
              <span>
                <span className="font-bold">Giữa</span> = Vận tinh
              </span>
              <span>
                <span className="text-amber-600 font-bold">Phải</span> = Sơn tinh
              </span>
            </div>
          </div>

          {/* Selected Palace Detail */}
          {selectedPalace && (
            <div
              className={`rounded-2xl border-2 p-4 space-y-2 animate-fade-in-up ${NATURE_BG[selectedPalace.nature]}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">
                    Cung {selectedPalace.positionVi}
                  </p>
                  <p className="text-base text-text-secondary-light dark:text-text-secondary-dark">
                    {selectedPalace.combination}
                  </p>
                </div>
                <div className="flex gap-2 text-center">
                  <div>
                    <p className="text-xs text-blue-500 font-bold">Thủy</p>
                    <p className="text-lg font-black text-blue-600 dark:text-blue-400">{selectedPalace.waterStar}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold">Vận</p>
                    <p className="text-lg font-black text-text-primary-light dark:text-text-primary-dark">
                      {selectedPalace.periodStar}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-amber-600 font-bold">Sơn</p>
                    <p className="text-lg font-black text-amber-600 dark:text-amber-400">
                      {selectedPalace.mountainStar}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-base text-text-secondary-light dark:text-text-secondary-dark">
                {selectedPalace.interpretation}
              </p>
              <div className="p-2 rounded-lg bg-white/60 dark:bg-white/5">
                <p className="text-sm font-bold text-teal-600 dark:text-teal-400 mb-0.5">💡 Hóa Giải / Kích Hoạt</p>
                <p className="text-base text-text-secondary-light dark:text-text-secondary-dark">
                  {selectedPalace.remedy}
                </p>
              </div>
            </div>
          )}

          {/* Main Remedies */}
          <CollapsibleCard title="Tổng Quan & Hóa Giải" defaultOpen={true}>
            <div className="p-4 space-y-2">
              <p className="text-base text-text-secondary-light dark:text-text-secondary-dark">
                {chart.overallAssessment}
              </p>
              {chart.mainRemedies.map((remedy, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-sm text-text-primary-light dark:text-text-primary-dark"
                >
                  <span className="text-teal-500 mt-0.5">💡</span>
                  <span>{remedy}</span>
                </div>
              ))}
            </div>
          </CollapsibleCard>

          {/* All Palaces Summary */}
          <CollapsibleCard title="Chi Tiết Tất Cả Cung" defaultOpen={false}>
            <div className="p-4 space-y-2">
              {chart.palaces
                .filter((p) => p.position !== 'Center')
                .map((palace, i) => (
                  <div key={i} className={`p-3 rounded-xl border ${NATURE_BG[palace.nature]}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-text-primary-light dark:text-text-primary-dark">
                        {palace.positionVi}
                      </span>
                      <span className="text-base text-text-secondary-light dark:text-text-secondary-dark">
                        Sơn {palace.mountainStar} · Thủy {palace.waterStar} · Vận {palace.periodStar}
                      </span>
                      <span className={`text-sm font-bold ${STAR_COLORS[palace.nature]}`}>
                        {palace.nature === 'cat' ? '✅' : palace.nature === 'hung' ? '❌' : '☯️'}
                      </span>
                    </div>
                    <p className="text-base text-text-secondary-light dark:text-text-secondary-dark mt-1">
                      {palace.interpretation}
                    </p>
                  </div>
                ))}
            </div>
          </CollapsibleCard>

          {/* Footer */}
          <div className="text-center text-xs text-text-secondary-light/50 dark:text-text-secondary-dark/30">
            <p>
              {chart.periodRange} · Hướng {chart.facingDirection}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
