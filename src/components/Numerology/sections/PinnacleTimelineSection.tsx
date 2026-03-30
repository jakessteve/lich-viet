/**
 * PinnacleTimelineSection — Pinnacles, challenges, and life periods
 */

import React from 'react';
import type { NumerologyProfile } from '@lich-viet/core/numerology';
import { PINNACLE_MEANINGS, CHALLENGE_MEANINGS, LIFE_PERIOD_MEANINGS } from '../../../data/interpretation/numerology/pinnacleChallenge';

export default function PinnacleTimelineSection({ profile }: { profile: NumerologyProfile }) {
  const currentAge = Math.floor((Date.now() - profile.birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

  return (
    <div className="space-y-4">
      {/* Pinnacles */}
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-gold dark:text-gold-dark">
          🏔️ 4 Đỉnh Cao Cuộc Đời
        </p>
        <div className="grid grid-cols-2 gap-2">
          {profile.pinnacles.map((p, i) => {
            const isCurrent = currentAge >= p.startAge && (p.endAge === null || currentAge <= p.endAge);
            const meaning = PINNACLE_MEANINGS[p.number];
            return (
              <div key={i} className={`glass-card p-3 space-y-1 ${isCurrent ? 'ring-2 ring-gold/50' : ''}`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-text-secondary-light/50 dark:text-text-secondary-dark/40">
                    Đỉnh {i + 1}
                  </span>
                  {isCurrent && <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-gold/15 text-gold dark:text-gold-dark">Hiện tại</span>}
                </div>
                <p className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-br from-gold to-amber-600 dark:from-gold-dark dark:to-amber-400">{p.number}</p>
                <p className="text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/40">
                  {p.startAge}–{p.endAge ?? '∞'} tuổi
                </p>
                {meaning && <p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-snug">{meaning}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Challenges */}
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
          ⚔️ 4 Thử Thách Cuộc Đời
        </p>
        <div className="grid grid-cols-2 gap-2">
          {profile.challenges.map((c, i) => {
            const isCurrent = currentAge >= c.startAge && (c.endAge === null || currentAge <= c.endAge);
            const meaning = CHALLENGE_MEANINGS[c.number];
            return (
              <div key={i} className={`glass-card p-3 space-y-1 ${isCurrent ? 'ring-2 ring-red-500/50' : ''}`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-text-secondary-light/50 dark:text-text-secondary-dark/40">
                    Thử thách {i + 1}
                  </span>
                  {isCurrent && <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-red-500/15 text-red-600 dark:text-red-400">Hiện tại</span>}
                </div>
                <p className="text-xl font-black text-red-600 dark:text-red-400">{c.number}</p>
                <p className="text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/40">
                  {c.startAge}–{c.endAge ?? '∞'} tuổi
                </p>
                {meaning && <p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-snug">{meaning}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Life Periods */}
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          🌊 3 Giai Đoạn Lớn Cuộc Đời
        </p>
        <div className="space-y-2">
          {profile.lifePeriods.map((lp, i) => {
            const isCurrent = currentAge >= lp.startAge && (lp.endAge === null || currentAge <= lp.endAge);
            const periodData = LIFE_PERIOD_MEANINGS[lp.number];
            const periodKey = i === 0 ? 'formative' : i === 1 ? 'productive' : 'harvest';
            const meaning = periodData?.[periodKey as 'formative' | 'productive' | 'harvest'];
            return (
              <div key={i} className={`glass-card p-3 space-y-1 ${isCurrent ? 'ring-2 ring-indigo-500/50' : ''}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-text-primary-light dark:text-text-primary-dark">{lp.nameVi}</p>
                    <p className="text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/40">{lp.name} · Số {lp.number} · {lp.startAge}–{lp.endAge ?? '∞'} tuổi</p>
                  </div>
                  {isCurrent && <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">Hiện tại</span>}
                </div>
                {meaning && <p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">{meaning}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
