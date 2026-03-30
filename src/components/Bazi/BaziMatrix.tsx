import React from 'react';
import type { BaziChart } from '@lich-viet/core/bazi';
import { ELEMENT_COLORS, ELEMENT_EMOJI } from './baziConstants';

interface BaziMatrixProps {
  chart: BaziChart;
}

export default function BaziMatrix({ chart }: BaziMatrixProps) {
  // Traditional Right-to-Left conceptually, but rendered Left-to-Right in our array: Giờ, Ngày, Tháng, Năm
  const pillars = [
    { p: chart.hourPillar, label: chart.hourPillar.labelVi, thapThan: chart.thapThan.filter(t => t.pillar === chart.hourPillar.labelVi), tangCan: chart.tangCan.find(tc => tc.chi === chart.hourPillar.chi), thanSat: chart.thanSat.filter(ts => ts.pillar === chart.hourPillar.labelVi), truongSinh: chart.truongSinh?.find(ts => ts.pillarName === chart.hourPillar.labelVi), isDay: false },
    { p: chart.dayPillar, label: chart.dayPillar.labelVi, thapThan: chart.thapThan.filter(t => t.pillar === chart.dayPillar.labelVi), tangCan: chart.tangCan.find(tc => tc.chi === chart.dayPillar.chi), thanSat: chart.thanSat.filter(ts => ts.pillar === chart.dayPillar.labelVi), truongSinh: chart.truongSinh?.find(ts => ts.pillarName === chart.dayPillar.labelVi), isDay: true },
    { p: chart.monthPillar, label: chart.monthPillar.labelVi, thapThan: chart.thapThan.filter(t => t.pillar === chart.monthPillar.labelVi), tangCan: chart.tangCan.find(tc => tc.chi === chart.monthPillar.chi), thanSat: chart.thanSat.filter(ts => ts.pillar === chart.monthPillar.labelVi), truongSinh: chart.truongSinh?.find(ts => ts.pillarName === chart.monthPillar.labelVi), isDay: false },
    { p: chart.yearPillar, label: chart.yearPillar.labelVi, thapThan: chart.thapThan.filter(t => t.pillar === chart.yearPillar.labelVi), tangCan: chart.tangCan.find(tc => tc.chi === chart.yearPillar.chi), thanSat: chart.thanSat.filter(ts => ts.pillar === chart.yearPillar.labelVi), truongSinh: chart.truongSinh?.find(ts => ts.pillarName === chart.yearPillar.labelVi), isDay: false },
  ];

  // Helper to determine maximum number of elements for row heights
  const maxThapThanTop = Math.max(...pillars.map(pd => pd.thapThan.filter(t => t.position === 'can').length));
  const maxThapThanBottom = Math.max(...pillars.map(pd => pd.thapThan.filter(t => t.position !== 'can').length));
  const maxTangCan = Math.max(...pillars.map(pd => pd.tangCan?.hiddenStems.length || 0));
  const maxThanSat = Math.max(...pillars.map(pd => pd.thanSat?.length || 0));

  return (
    <div className="glass-card p-3 sm:p-4 overflow-x-auto w-full">
      <div className="min-w-[480px]">
        {/* ROW: Labels */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          {pillars.map((pd, i) => (
            <div key={`lbl-${i}`} className="text-center pb-2 border-b border-black/5 dark:border-white/5 relative">
              <p className="text-xs font-bold uppercase tracking-widest text-text-secondary-light/60 dark:text-text-secondary-dark/60">
                {pd.label}
              </p>
              {pd.isDay && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] uppercase font-bold bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                  Nhật Chủ
                </span>
              )}
            </div>
          ))}
        </div>

        {/* ROW: Thập Thần (Thiên Can) */}
        {maxThapThanTop > 0 && (
          <div className="grid grid-cols-4 gap-2 mb-2">
            {pillars.map((pd, i) => (
              <div key={`ttTop-${i}`} className="text-center flex flex-col gap-1 items-center justify-end" style={{ minHeight: `${maxThapThanTop * 20}px` }}>
                {pd.thapThan.filter(t => t.position === 'can').map((t, idx) => (
                  <span key={idx} className={`px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-bold ${t.godNature === 'cat' ? 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400' :
                    t.godNature === 'hung' ? 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400' :
                      'text-amber-600 bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400'
                    }`}>
                    {t.god}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ROW: Thiên Can */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          {pillars.map((pd, i) => {
            const colors = ELEMENT_COLORS[pd.p.canElement];
            return (
              <div key={`can-${i}`} className={`rounded-xl p-2 ${colors.bg} border ${pd.isDay ? 'border-purple-400/50 shadow-[0_0_10px_rgba(168,85,247,0.2)]' : 'border-current/10'} text-center`}>
                <p className={`text-2xl sm:text-3xl font-black ${colors.text}`}>{pd.p.can}</p>
                <p className="text-[10px] sm:text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
                  {ELEMENT_EMOJI[pd.p.canElement]} {pd.p.canElement}
                </p>
              </div>
            );
          })}
        </div>

        {/* ROW: Địa Chi */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {pillars.map((pd, i) => {
            const colors = ELEMENT_COLORS[pd.p.chiElement];
            return (
              <div key={`chi-${i}`} className={`rounded-xl p-2 ${colors.bg} border border-current/10 text-center`}>
                <p className={`text-2xl sm:text-3xl font-black ${colors.text}`}>{pd.p.chi}</p>
                <p className="text-[10px] sm:text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
                  {ELEMENT_EMOJI[pd.p.chiElement]} {pd.p.chiElement}
                </p>
              </div>
            );
          })}
        </div>

        {/* ROW: Tàng Can */}
        {maxTangCan > 0 && (
          <div className="grid grid-cols-4 gap-2 mb-3 px-1">
            {pillars.map((pd, i) => (
              <div key={`tangcan-${i}`} className="flex flex-col gap-1 items-center" style={{ minHeight: `${maxTangCan * 22}px` }}>
                {pd.tangCan?.hiddenStems.map((h, idx) => (
                  <p key={idx} className={`text-[11px] sm:text-xs font-semibold ${ELEMENT_COLORS[h.element].text}`}>
                    {h.can} <span className="opacity-50 text-[9px] font-normal">({h.strength === 'chính_khí' ? 'Chính' : h.strength === 'trung_khí' ? 'Trung' : 'Dư'})</span>
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ROW: Thập Thần (Tàng Can) */}
        {maxThapThanBottom > 0 && (
          <div className="grid grid-cols-4 gap-2 mb-3 px-1 border-t border-black/5 dark:border-white/5 pt-2">
            {pillars.map((pd, i) => (
              <div key={`ttBot-${i}`} className="text-center flex flex-col gap-1 items-center" style={{ minHeight: `${maxThapThanBottom * 20}px` }}>
                {pd.thapThan.filter(t => t.position !== 'can').map((t, idx) => (
                  <span key={idx} className={`px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold ${t.godNature === 'cat' ? 'text-emerald-600 bg-emerald-100/50 dark:bg-emerald-900/20 dark:text-emerald-400' :
                    t.godNature === 'hung' ? 'text-red-600 bg-red-100/50 dark:bg-red-900/20 dark:text-red-400' :
                      'text-amber-600 bg-amber-100/50 dark:bg-amber-900/20 dark:text-amber-400'
                    }`}>
                    {t.god}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ROW: Nạp Âm & Trường Sinh */}
        <div className="grid grid-cols-4 gap-2 mb-3 border-t border-black/5 dark:border-white/5 pt-2">
          {pillars.map((pd, i) => (
            <div key={`napam-${i}`} className="flex flex-col gap-1 items-center justify-start text-center">
              <p className="text-[10px] sm:text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark leading-tight line-clamp-2 min-h-[2.5em]">
                {pd.p.napAm}
              </p>
              {pd.truongSinh && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-surface-subtle-light dark:bg-surface-subtle-dark text-text-primary-light dark:text-text-primary-dark">
                  {pd.truongSinh.phase}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* ROW: Thần Sát */}
        {maxThanSat > 0 && (
          <div className="grid grid-cols-4 gap-2 border-t border-black/5 dark:border-white/5 pt-2">
            {pillars.map((pd, i) => (
              <div key={`ht-${i}`} className="flex flex-col gap-1 text-center" style={{ minHeight: `${maxThanSat * 18}px` }}>
                {pd.thanSat?.map((ts, idx) => (
                  <p key={idx} className={`text-[10px] sm:text-[11px] leading-tight font-medium ${ts.nature === 'cat' ? 'text-emerald-600 dark:text-emerald-500' :
                      ts.nature === 'hung' ? 'text-red-600 dark:text-red-500' :
                        'text-amber-600 dark:text-amber-500'
                    }`}>
                    {ts.nameVi}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
