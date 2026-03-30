/**
 * PillarCard — Displays a single Bazi pillar (Can + Chi + Nạp Âm)
 *
 * Extracted from BaziView.tsx for reusability.
 */

import type { Pillar, ThapThanEntry, TangCanEntry, ThanSat, TruongSinhEntry } from '../../types/bazi';
import { ELEMENT_COLORS, ELEMENT_EMOJI } from './baziConstants';

export default function PillarCard({
  pillar,
  isday,
  thapThan,
  tangCan,
  thanSat,
  truongSinh,
}: {
  pillar: Pillar;
  isday?: boolean;
  thapThan?: ThapThanEntry[];
  tangCan?: TangCanEntry;
  thanSat?: ThanSat[];
  truongSinh?: TruongSinhEntry;
}) {
  const canColor = ELEMENT_COLORS[pillar.canElement];
  const chiColor = ELEMENT_COLORS[pillar.chiElement];

  return (
    <div className={`glass-card p-3 text-center space-y-2 ${isday ? 'ring-2 ring-purple-500/30' : ''} flex flex-col h-full`}>
      <p className="text-xs font-bold uppercase tracking-widest text-text-secondary-light/50 dark:text-text-secondary-dark/40">
        {pillar.labelVi}
      </p>
      {isday && (
        <span className="inline-block px-2 py-0.5 rounded-full text-xs uppercase font-bold bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
          Nhật Chủ
        </span>
      )}

      {/* Thiên Can */}
      <div className={`rounded-xl p-2 ${canColor.bg} border border-current/10`}>
        <p className={`text-2xl font-black ${canColor.text}`}>{pillar.can}</p>
        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
          {ELEMENT_EMOJI[pillar.canElement]} {pillar.canElement}
        </p>
      </div>

      {/* Địa Chi */}
      <div className={`rounded-xl p-2 ${chiColor.bg} border border-current/10`}>
        <p className={`text-2xl font-black ${chiColor.text}`}>{pillar.chi}</p>
        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
          {ELEMENT_EMOJI[pillar.chiElement]} {pillar.chiElement}
        </p>
      </div>

      {/* Nạp Âm & Trường Sinh */}
      <div className="flex flex-col gap-1.5 items-center pb-2 border-b border-current/10">
        <p className="text-xs sm:text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark leading-tight">
          {pillar.napAm}
        </p>
        {truongSinh && (
           <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-surface-subtle-light dark:bg-surface-subtle-dark text-text-primary-light dark:text-text-primary-dark">
             {truongSinh.phase}
           </span>
        )}
      </div>

      {/* Thập Thần */}
      {thapThan && thapThan.length > 0 && (
        <div className="space-y-1.5 w-full pt-1">
          <p className="text-xs font-bold text-text-secondary-light/60 dark:text-text-secondary-dark/40 uppercase">Thần</p>
          <div className="flex flex-col gap-1.5">
             {thapThan.map((t, idx) => (
                <span key={idx} className={`px-1.5 py-0.5 rounded text-xs font-bold ${
                    t.godNature === 'cat' ? 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400' :
                    t.godNature === 'hung' ? 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400' :
                    'text-amber-600 bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400'
                }`}>
                  {t.god}
                </span>
             ))}
          </div>
        </div>
      )}

      {/* Tàng Can */}
      {tangCan && (
        <div className="space-y-1.5 w-full flex-grow pt-1">
          <p className="text-xs font-bold text-text-secondary-light/60 dark:text-text-secondary-dark/40 uppercase">Tàng</p>
          <div className="flex flex-col gap-1">
            {tangCan.hiddenStems.map((h, idx) => (
              <p key={idx} className={`text-xs sm:text-sm font-medium ${ELEMENT_COLORS[h.element].text}`}>
                {h.can} <span className="opacity-50 tracking-tighter text-[10px]">({h.strength === 'chính_khí' ? 'C' : h.strength === 'trung_khí' ? 'T' : 'D'})</span>
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Thần Sát */}
      {thanSat && thanSat.length > 0 && (
        <div className="space-y-1.5 w-full border-t border-current/10 pt-2 mt-auto">
          {thanSat.map((ts, idx) => (
             <p key={idx} className={`text-xs sm:text-sm leading-tight font-medium ${
                 ts.nature === 'cat' ? 'text-emerald-600 dark:text-emerald-400' :
                 ts.nature === 'hung' ? 'text-red-600 dark:text-red-400' :
                 'text-amber-600 dark:text-amber-400'
             }`}>
               {ts.nameVi.split(' ')[0]} {/* Abbreviate first word if long */}
             </p>
          ))}
        </div>
      )}
    </div>
  );
}
