/**
 * NumberInteractionsSection — Synergy analysis between core numbers
 */

import React, { useMemo } from 'react';
import type { NumerologyProfile } from '@lich-viet/core/numerology';
import { analyzeAllSynergies } from '../../../data/interpretation/numerology/numberSynergy';

export default function NumberInteractionsSection({ profile }: { profile: NumerologyProfile }) {
  const synergies = useMemo(() => analyzeAllSynergies({
    lifePath: profile.lifePath.value,
    expression: profile.expression.value,
    soulUrge: profile.soulUrge.value,
    personality: profile.personality.value,
    birthday: profile.birthday.value,
    maturity: profile.maturity.value,
  }), [profile]);

  const entries = Object.values(synergies);

  return (
    <div className="space-y-2">
      {entries.map((syn, i) => (
        <div key={i} className="glass-card p-3 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-base">{syn.emoji}</span>
            <span className="text-xs font-bold text-text-primary-light dark:text-text-primary-dark">{syn.pairNameVi}</span>
            <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold ${syn.category === 'harmonic' ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' :
              syn.category === 'challenging' ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' :
                'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
              }`}>
              {syn.categoryVi}
            </span>
          </div>
          <p className="text-base text-text-secondary-light/60 dark:text-text-secondary-dark/50">{syn.pairDescription}</p>
          <p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">{syn.analysis}</p>
        </div>
      ))}
    </div>
  );
}
