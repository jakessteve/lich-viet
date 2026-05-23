/**
 * Huyền Khí (Mysterious Energy) Scoring Engine
 *
 * Pure TypeScript module for calculating Huyền Khí scores
 * across the 12 palaces of a Tử Vi chart.
 *
 * Zero React dependencies.
 */

import type { TuViPalace, TuViCombination, TuViHuyenKhi } from '../../types/tuvi';
import huyenKhiScoring from '../../data/tuvi/huyenKhiScoring.json';

// ── Typed scoring data ──────────────────────────────────────────

interface HuyenKhiScoringData {
  starScores: {
    chinhTinh: Record<string, number>;
    phuTinh: Record<string, number>;
    satTinh: Record<string, number>;
  };
  tuHoaBonus: Record<string, number>;
  combinationBonus: Record<string, number>;
  gradeThresholds: Record<string, number>;
  gradeLabels: Record<string, string>;
}

const scoring = huyenKhiScoring as HuyenKhiScoringData;
const HUYEN_KHI_REFERENCE_DIVISOR = 12.85;

function roundToSingleDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

// ── Public API ──────────────────────────────────────────────────

/**
 * Calculates the Huyền Khí score for a single palace.
 *
 * Sums brightness scores for Chính Tinh, Phụ Tinh, and Sát Tinh,
 * then adds Tứ Hóa bonuses (Lộc +5, Quyền +4, Khoa +3, Kỵ -4).
 *
 * @param palace — a single Tử Vi palace
 * @returns numeric Huyền Khí score
 */
export function calculatePalaceScore(palace: TuViPalace): number {
  let score = 0;

  // Chính Tinh brightness scores
  for (const star of palace.chinhTinh) {
    score += scoring.starScores.chinhTinh[star.brightness] ?? 0;
  }

  // Phụ Tinh brightness scores
  for (const star of palace.phuTinh) {
    score += scoring.starScores.phuTinh[star.brightness] ?? 0;
  }

  // Sát Tinh brightness scores
  for (const star of palace.satTinh) {
    score += scoring.starScores.satTinh[star.brightness] ?? 0;
  }

  // Tứ Hóa bonuses
  for (const tuHoa of palace.tuHoa) {
    score += scoring.tuHoaBonus[tuHoa.type] ?? 0;
  }

  return score;
}

/**
 * Calculates display-ready Huyền Khí scores for an entire chart.
 *
 * The displayed total follows the common reference-chart convention: use
 * raw palace khí, then normalize by the 12-palace chart scale instead of
 * showing the raw aggregate. This keeps values in the expected ~0-30 range.
 *
 * @param palaces      — all 12 palaces
 * @param combinations — detected named combinations
 * @returns `TuViHuyenKhi` with totalScore, palaceScores, and grade
 */
export function calculateHuyenKhi(
  palaces: TuViPalace[],
  combinations: TuViCombination[],
): TuViHuyenKhi {
  const palaceScores: Record<string, number> = {};
  let rawTotal = 0;

  for (const palace of palaces) {
    const score = calculatePalaceScore(palace);
    palaceScores[palace.name] = score;
    rawTotal += score;
  }

  let combinationScore = 0;
  for (const combo of combinations) {
    combinationScore += scoring.combinationBonus[combo.category] ?? 0;
  }
  const totalScore = roundToSingleDecimal(
    (rawTotal + combinationScore) / HUYEN_KHI_REFERENCE_DIVISOR,
  );

  // Grade determination
  let grade: string;
  if (totalScore >= scoring.gradeThresholds.thuong) {
    grade = scoring.gradeLabels.thuong;
  } else if (totalScore >= scoring.gradeThresholds.thuongTrung) {
    grade = scoring.gradeLabels.thuongTrung;
  } else if (totalScore >= scoring.gradeThresholds.trung) {
    grade = scoring.gradeLabels.trung;
  } else if (totalScore >= scoring.gradeThresholds.trungHa) {
    grade = scoring.gradeLabels.trungHa;
  } else {
    grade = scoring.gradeLabels.ha;
  }

  return { totalScore, palaceScores, grade };
}
