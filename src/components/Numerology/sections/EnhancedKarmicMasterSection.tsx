/**
 * EnhancedKarmicMasterSection — Karmic debts and master numbers display
 */

import React from 'react';
import type { NumerologyProfile } from '@lich-viet/core/numerology';
import { KARMIC_DEBT_PROFILES } from '../../../data/interpretation/numerology/karmicDebt';
import { MASTER_NUMBER_PROFILES } from '../../../data/interpretation/numerology/masterNumbers';

export default function EnhancedKarmicMasterSection({ profile }: { profile: NumerologyProfile }) {
  return (
    <div className="space-y-4">
      {/* Karmic Debts */}
      {profile.karmicDebts.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-red-600 dark:text-red-400">⚡ Nợ Nghiệp (Karmic Debt)</p>
          {profile.karmicDebts.map(n => {
            const dp = KARMIC_DEBT_PROFILES[n];
            if (!dp) return (
              <div key={n} className="glass-card p-3">
                <span className="px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-900/15 text-red-700 dark:text-red-400 text-sm font-bold">{n}</span>
              </div>
            );
            return (
              <div key={n} className="glass-card p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-400 to-rose-500 text-white text-sm font-black flex items-center justify-center">{n}</span>
                  <span className="text-sm font-bold text-red-700 dark:text-red-400">Nợ Nghiệp Số {n}</span>
                </div>
                <div className="space-y-1.5">
                  <div><p className="text-xs font-bold text-text-secondary-light/50 dark:text-text-secondary-dark/40">NGUỒN GỐC</p><p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-snug">{dp.origin}</p></div>
                  <div><p className="text-xs font-bold text-text-secondary-light/50 dark:text-text-secondary-dark/40">BIỂU HIỆN</p><p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-snug">{dp.manifestation}</p></div>
                  <div><p className="text-xs font-bold text-text-secondary-light/50 dark:text-text-secondary-dark/40">THỬ THÁCH</p><p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-snug">{dp.challenges}</p></div>
                  <div><p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">CON ĐƯỜNG GIẢI NỢ</p><p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-snug">{dp.redemption}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Master Numbers */}
      {profile.masterNumbers.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-amber-600 dark:text-amber-400">✨ Số Bậc Thầy (Master Numbers)</p>
          {profile.masterNumbers.map(n => {
            const mp = MASTER_NUMBER_PROFILES[n];
            if (!mp) return (
              <div key={n} className="glass-card p-3">
                <span className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-900/15 text-amber-700 dark:text-amber-400 text-sm font-bold">{n}</span>
              </div>
            );
            return (
              <div key={n} className="glass-card p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white text-sm font-black flex items-center justify-center">{n}</span>
                  <span className="text-sm font-bold text-amber-700 dark:text-amber-400">Số Bậc Thầy {n}</span>
                </div>
                <div className="space-y-1.5">
                  <div><p className="text-xs font-bold text-text-secondary-light/50 dark:text-text-secondary-dark/40">LƯỠNG TÍNH</p><p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-snug">{mp.dualNature}</p></div>
                  <div><p className="text-xs font-bold text-text-secondary-light/50 dark:text-text-secondary-dark/40">KÍCH HOẠT</p><p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-snug">{mp.activation}</p></div>
                  <div><p className="text-xs font-bold text-text-secondary-light/50 dark:text-text-secondary-dark/40">MẶT TỐI</p><p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-snug">{mp.shadow}</p></div>
                  <div><p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">HƯỚNG DẪN</p><p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-snug">{mp.guidance}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
