/**
 * BondsScoreCard — Gamified Compatibility Score Hero Card
 *
 * Displays a bold overall compatibility percentage with color-coded
 * verdict badges and 🟢/🔴 quick flags extracted from per-engine results.
 *
 * Used as the headline card in HopLaPage results, above detail cards.
 */

import React, { useMemo } from 'react';

interface BondsScoreCardProps {
  /** Radar data from all synastry engines (key → 0-100 score) */
  radarData: Record<string, number>;
  /** Names of the two people */
  nameA: string;
  nameB: string;
  /** Per-engine result objects for flag extraction */
  tuvi?: { detail?: string; totalScore?: number } | null;
  bazi?: { detail?: string; totalScore?: number; layers?: Array<{ detail: string; type?: string }> } | null;
  num?: { detail?: string; totalScore?: number } | null;
  western?: { detail?: string; score?: number; aspects?: Array<{ description: string; score: number }> } | null;
}

// ── Verdict logic ──────────────────────────────────────────

function getVerdict(score: number): { text: string; emoji: string; color: string; bg: string } {
  if (score >= 85) return { text: 'Trời Sinh Một Cặp', emoji: '💕', color: 'text-pink-500', bg: 'from-pink-500/20 to-rose-500/10' };
  if (score >= 70) return { text: 'Rất Hòa Hợp', emoji: '❤️', color: 'text-emerald-500', bg: 'from-emerald-500/20 to-teal-500/10' };
  if (score >= 55) return { text: 'Bình Hòa', emoji: '🤝', color: 'text-blue-500', bg: 'from-blue-500/20 to-indigo-500/10' };
  if (score >= 40) return { text: 'Cần Nỗ Lực', emoji: '⚡', color: 'text-amber-500', bg: 'from-amber-500/20 to-orange-500/10' };
  return { text: 'Thử Thách Lớn', emoji: '🌊', color: 'text-red-500', bg: 'from-red-500/20 to-rose-500/10' };
}

// ── Flags extraction ────────────────────────────────────────

interface Flag {
  type: 'green' | 'red';
  label: string;
  source: string;
}

function extractFlags(
  radarData: Record<string, number>,
  tuvi: BondsScoreCardProps['tuvi'],
  bazi: BondsScoreCardProps['bazi'],
  western: BondsScoreCardProps['western'],
): Flag[] {
  const flags: Flag[] = [];

  // Green flags from high scores
  if ((radarData['tuvi'] ?? 0) >= 75) flags.push({ type: 'green', label: 'Cung Phu Thê hòa hợp', source: 'Tử Vi' });
  if ((radarData['bazi'] ?? 0) >= 75) flags.push({ type: 'green', label: 'Bát Tự tương sinh', source: 'Bát Tự' });
  if ((radarData['num'] ?? 0) >= 75) flags.push({ type: 'green', label: 'Số phận đồng điệu', source: 'Thần Số' });
  if ((radarData['western'] ?? 0) >= 75) flags.push({ type: 'green', label: 'Aspects thuận lợi', source: 'Chiêm Tinh' });

  // Red flags from low scores
  if ((radarData['tuvi'] ?? 100) <= 40) flags.push({ type: 'red', label: 'Cung Phu Thê xung khắc', source: 'Tử Vi' });
  if ((radarData['bazi'] ?? 100) <= 40) flags.push({ type: 'red', label: 'Bát Tự tương khắc', source: 'Bát Tự' });
  if ((radarData['western'] ?? 100) <= 40) flags.push({ type: 'red', label: 'Aspects khó khăn', source: 'Chiêm Tinh' });

  // Extract specific warnings from bazi layers
  if (bazi?.layers) {
    const harmLayer = bazi.layers.find((l) => l.detail?.includes('Tương Xung') || l.detail?.includes('Tương Hại'));
    if (harmLayer) flags.push({ type: 'red', label: 'Can Chi xung hại', source: 'Bát Tự' });
  }

  // Cap at 2 green + 2 red max for clean display
  const greens = flags.filter(f => f.type === 'green').slice(0, 2);
  const reds = flags.filter(f => f.type === 'red').slice(0, 2);
  return [...greens, ...reds];
}

// ── Component ──────────────────────────────────────────────

export default function BondsScoreCard({ radarData, nameA, nameB, tuvi, bazi, num, western }: BondsScoreCardProps) {
  const overallScore = useMemo(() => {
    const scores = Object.values(radarData);
    if (scores.length === 0) return 50;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, [radarData]);

  const verdict = useMemo(() => getVerdict(overallScore), [overallScore]);
  const flags = useMemo(() => extractFlags(radarData, tuvi, bazi, western), [radarData, tuvi, bazi, western]);

  // Animated ring progress (CSS custom property)
  const ringProgress = `${(overallScore / 100) * 283}`;

  return (
    <div className={`glass-card-strong p-6 sm:p-8 relative overflow-hidden bg-gradient-to-br ${verdict.bg}`}>
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/3 rounded-full blur-xl translate-y-1/3 -translate-x-1/4" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">

        {/* Score Ring */}
        <div className="relative shrink-0">
          <svg viewBox="0 0 100 100" className="w-32 h-32 sm:w-36 sm:h-36 -rotate-90">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6"
              className="text-gray-200/30 dark:text-gray-700/30" />
            <circle cx="50" cy="50" r="45" fill="none" strokeWidth="6" strokeLinecap="round"
              strokeDasharray="283" strokeDashoffset={`${283 - parseFloat(ringProgress)}`}
              className={verdict.color}
              style={{ transition: 'stroke-dashoffset 1.2s ease-in-out' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-4xl font-black text-text-primary-light dark:text-text-primary-dark">
              {overallScore}
            </span>
            <span className="text-[10px] font-semibold text-text-secondary-light dark:text-text-secondary-dark tracking-wider uppercase">
              /100
            </span>
          </div>
        </div>

        {/* Verdict + Flags */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <span className="text-2xl">{verdict.emoji}</span>
            <h2 className={`text-xl sm:text-2xl font-black ${verdict.color}`}>
              {verdict.text}
            </h2>
          </div>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
            <span className="font-semibold text-text-primary-light dark:text-text-primary-dark">{nameA}</span>
            {' '}&amp;{' '}
            <span className="font-semibold text-text-primary-light dark:text-text-primary-dark">{nameB}</span>
          </p>

          {/* Flags */}
          {flags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {flags.map((flag, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    flag.type === 'green'
                      ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-700/25'
                      : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200/50 dark:border-red-700/25'
                  }`}
                >
                  {flag.type === 'green' ? '🟢' : '🔴'} {flag.label}
                  <span className="opacity-50 text-[10px]">({flag.source})</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
