/**
 * DeepAnalysisSection — Detailed position-by-position numerology analysis
 */

import React from 'react';
import type { NumerologyProfile, CoreNumber } from '@lich-viet/core/numerology';
import CollapsibleCard from '../../CollapsibleCard';
import { CORE_MEANINGS } from '../../../data/interpretation/numerology/coreMeanings';
import { POSITION_MEANINGS } from '../../../data/interpretation/numerology/positionMeanings';
import type { NumerologyPosition } from '../../../data/interpretation/numerology/types';
import { POSITION_META } from '../../../data/interpretation/numerology/types';

export default function DeepAnalysisSection({ profile }: { profile: NumerologyProfile }) {
  const positions: { key: NumerologyPosition; number: CoreNumber }[] = [
    { key: 'lifePath', number: profile.lifePath },
    { key: 'expression', number: profile.expression },
    { key: 'soulUrge', number: profile.soulUrge },
    { key: 'personality', number: profile.personality },
    { key: 'birthday', number: profile.birthday },
    { key: 'maturity', number: profile.maturity },
  ];

  return (
    <div className="space-y-2">
      {positions.map(({ key, number }) => {
        const meta = POSITION_META[key];
        const positionMeaning = POSITION_MEANINGS[number.value]?.[key];
        const coreMeaning = CORE_MEANINGS[number.value];

        return (
          <CollapsibleCard
            key={key}
            title={`${meta.nameVi} — Số ${number.value}`}
            defaultOpen={key === 'lifePath'}
          >
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black text-white ${number.masterNumber ? 'bg-gradient-to-br from-amber-400 to-orange-500' :
                  number.karmicDebt ? 'bg-gradient-to-br from-red-400 to-rose-500' :
                    'bg-gradient-to-br from-gold to-amber-600'
                  }`}>
                  {number.value}
                </div>
                <div>
                  <p className="text-base font-bold text-text-primary-light dark:text-text-primary-dark">{meta.name}</p>
                  <p className="text-base text-text-secondary-light dark:text-text-secondary-dark">{meta.description}</p>
                </div>
              </div>

              {positionMeaning && (
                <p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                  {positionMeaning.interpretation}
                </p>
              )}

              {coreMeaning && (
                <div className="space-y-2">
                  {/* Strengths */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">Điểm mạnh</p>
                    <ul className="space-y-0.5">
                      {coreMeaning.strengths.slice(0, 3).map((s, i) => (
                        <li key={i} className="text-base text-text-secondary-light dark:text-text-secondary-dark flex items-start gap-1.5">
                          <span className="text-emerald-500 mt-0.5 text-[8px]">●</span>{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Challenges */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">Thử thách</p>
                    <ul className="space-y-0.5">
                      {coreMeaning.challenges.slice(0, 3).map((c, i) => (
                        <li key={i} className="text-base text-text-secondary-light dark:text-text-secondary-dark flex items-start gap-1.5">
                          <span className="text-amber-500 mt-0.5 text-[8px]">●</span>{c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </CollapsibleCard>
        );
      })}
    </div>
  );
}
