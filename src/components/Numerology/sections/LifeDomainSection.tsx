/**
 * LifeDomainSection — Career, love, health, money, spiritual interpretations
 */

import React from 'react';
import type { NumerologyProfile } from '@lich-viet/core/numerology';
import { CORE_MEANINGS } from '../../../data/interpretation/numerology/coreMeanings';

export default function LifeDomainSection({ profile }: { profile: NumerologyProfile }) {
  const coreMeaning = CORE_MEANINGS[profile.lifePath.value];
  if (!coreMeaning) return null;

  const domains = [
    { icon: '💼', title: 'Sự Nghiệp', content: coreMeaning.career },
    { icon: '❤️', title: 'Tình Cảm', content: coreMeaning.love },
    { icon: '🧘', title: 'Sức Khỏe', content: coreMeaning.health },
    { icon: '💰', title: 'Tài Chính', content: coreMeaning.money },
    { icon: '🌱', title: 'Tâm Linh', content: coreMeaning.spiritual },
  ];

  return (
    <div className="space-y-2">
      {domains.map((d, i) => (
        <div key={i} className="glass-card p-3 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-base">{d.icon}</span>
            <span className="text-xs font-bold text-text-primary-light dark:text-text-primary-dark">{d.title}</span>
          </div>
          <p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">{d.content}</p>
        </div>
      ))}
    </div>
  );
}
