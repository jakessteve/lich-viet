/**
 * Western Synastry (F13) — Cross-Chart Aspect Comparison
 *
 * Generates two natal charts via the existing `calculateNatalChart` engine
 * and computes inter-chart aspects between key planets (Sun, Moon, Venus, Mars, Jupiter).
 * Scoring favors harmonious aspects (trine, sextile, conjunction of luminaries)
 * and penalizes harsh aspects (square, opposition of malefics).
 *
 * Source: Modern Western Astrology synastry conventions.
 */

import { calculateNatalChart } from '../../utils/natalChartCalculator';
import type { BirthData, NatalChart, PlanetPosition, AspectType } from '../../types/westernAstro';

// ── Types ─────────────────────────────────────────────────────

export interface CrossAspect {
  planetA: string;
  planetB: string;
  aspect: AspectType;
  orb: number;
  score: number;
  description: string;
}

export interface WesternSynastryResult {
  score: number;          // raw score, typically -15..+15
  aspects: CrossAspect[];
  compatibility: string;  // human-readable label
  chartA?: NatalChart;
  chartB?: NatalChart;
}

// ── Constants ─────────────────────────────────────────────────

/** Key relationship planets for synastry */
const SYNASTRY_PLANETS = ['sun', 'moon', 'venus', 'mars', 'jupiter'];

/** Aspect orb limits (tighter for synastry) */
const ASPECT_ORBS: Record<string, number> = {
  conjunction: 8,
  trine: 7,
  sextile: 6,
  square: 7,
  opposition: 8,
  quincunx: 3,
};

/** Aspect angles */
const ASPECT_ANGLES: Record<string, number> = {
  conjunction: 0,
  sextile: 60,
  square: 90,
  trine: 120,
  opposition: 180,
  quincunx: 150,
};

/** Scoring weights per aspect type and planet pair category */
function getAspectScore(aspect: string, planetA: string, planetB: string): number {
  const isLuminary = (p: string) => p === 'sun' || p === 'moon';
  const isVenus = (p: string) => p === 'venus';
  const isMalefic = (p: string) => p === 'mars' || p === 'saturn';

  const bothLuminaries = isLuminary(planetA) && isLuminary(planetB);
  const luminaryVenus = (isLuminary(planetA) && isVenus(planetB)) || (isVenus(planetA) && isLuminary(planetB));
  const bothMalefic = isMalefic(planetA) && isMalefic(planetB);

  switch (aspect) {
    case 'conjunction':
      if (bothLuminaries) return 3;
      if (luminaryVenus) return 3;
      if (bothMalefic) return -2;
      return 2;
    case 'trine':
      if (bothLuminaries || luminaryVenus) return 3;
      return 2;
    case 'sextile':
      return 2;
    case 'square':
      if (bothMalefic) return -3;
      if (bothLuminaries) return -2;
      return -1;
    case 'opposition':
      if (bothMalefic) return -3;
      if (bothLuminaries) return -2;
      return -1;
    case 'quincunx':
      return -1;
    default:
      return 0;
  }
}

/** Vietnamese aspect descriptions */
const ASPECT_LABELS: Record<string, string> = {
  conjunction: 'Hợp (0°)',
  sextile: 'Lục hợp (60°)',
  square: 'Vuông góc (90°)',
  trine: 'Tam hợp (120°)',
  opposition: 'Đối xung (180°)',
  quincunx: 'Bất hợp (150°)',
};

const PLANET_LABELS: Record<string, string> = {
  sun: 'Mặt Trời ☉',
  moon: 'Mặt Trăng ☽',
  venus: 'Kim Tinh ♀',
  mars: 'Hỏa Tinh ♂',
  jupiter: 'Mộc Tinh ♃',
};

// ── Core Logic ────────────────────────────────────────────────

/**
 * Find the angular distance between two ecliptic degrees.
 */
function angularDistance(deg1: number, deg2: number): number {
  const diff = Math.abs(deg1 - deg2) % 360;
  return diff > 180 ? 360 - diff : diff;
}

/**
 * Detect inter-chart aspects between planet lists.
 */
function findCrossAspects(planetsA: PlanetPosition[], planetsB: PlanetPosition[]): CrossAspect[] {
  const results: CrossAspect[] = [];
  const seen = new Set<string>();

  for (const pA of planetsA) {
    if (!SYNASTRY_PLANETS.includes(pA.id)) continue;

    for (const pB of planetsB) {
      if (!SYNASTRY_PLANETS.includes(pB.id)) continue;

      const key = [pA.id, pB.id].sort().join('|');
      if (seen.has(key)) continue;

      const dist = angularDistance(pA.degree, pB.degree);

      for (const [aspectName, targetAngle] of Object.entries(ASPECT_ANGLES)) {
        const orb = Math.abs(dist - targetAngle);
        const maxOrb = ASPECT_ORBS[aspectName] ?? 5;

        if (orb <= maxOrb) {
          seen.add(key);
          const score = getAspectScore(aspectName, pA.id, pB.id);
          results.push({
            planetA: pA.id,
            planetB: pB.id,
            aspect: aspectName as AspectType,
            orb: Math.round(orb * 10) / 10,
            score,
            description: `${PLANET_LABELS[pA.id] || pA.id} ${ASPECT_LABELS[aspectName] || aspectName} ${PLANET_LABELS[pB.id] || pB.id}`,
          });
          break; // one aspect per pair
        }
      }
    }
  }

  return results;
}

// ── Public API ─────────────────────────────────────────────────

/**
 * Compute Western synastry between two birth data sets.
 *
 * Uses default Hanoi coordinates (21.03°N, 105.85°E) and noon birth time
 * as fallback when exact birth location/time is unknown.
 */
export function computeWesternSynastry(
  dobA: Date,
  dobB: Date,
  hourA = 12,
  hourB = 12,
  latA = 21.03,
  lngA = 105.85,
  latB = 21.03,
  lngB = 105.85,
): WesternSynastryResult {
  const birthDataA: BirthData = {
    year: dobA.getFullYear(),
    month: dobA.getMonth() + 1,
    day: dobA.getDate(),
    hour: hourA,
    minute: 0,
    latitude: latA,
    longitude: lngA,
    timezone: 7,
  };

  const birthDataB: BirthData = {
    year: dobB.getFullYear(),
    month: dobB.getMonth() + 1,
    day: dobB.getDate(),
    hour: hourB,
    minute: 0,
    latitude: latB,
    longitude: lngB,
    timezone: 7,
  };

  const chartA = calculateNatalChart(birthDataA);
  const chartB = calculateNatalChart(birthDataB);

  const crossAspects = findCrossAspects(chartA.planets, chartB.planets);

  const totalScore = crossAspects.reduce((sum, a) => sum + a.score, 0);
  const clampedScore = Math.max(-15, Math.min(15, totalScore));

  let compatibility: string;
  if (clampedScore >= 8) compatibility = 'Rất hợp ✨';
  else if (clampedScore >= 4) compatibility = 'Khá hợp 🌟';
  else if (clampedScore >= 0) compatibility = 'Bình thường ⭐';
  else if (clampedScore >= -4) compatibility = 'Ít hợp ⚠️';
  else compatibility = 'Xung khắc ❌';

  return {
    score: clampedScore,
    aspects: crossAspects,
    compatibility,
    chartA,
    chartB,
  };
}
