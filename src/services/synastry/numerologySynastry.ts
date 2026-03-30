/**
 * Numerology Synastry Service — F11
 * 
 * Life Path compatibility based on the Pythagorean 9×9 matrix.
 * Uses existing `numerologyEngine.ts` for Life Path calculation.
 * 
 * Reference: Pythagorean Numerology compatibility standard.
 */

import { reduceToDigit } from '../../utils/numerologyEngine';

export interface NumerologySynastryResult {
  /** Score (-10 to +10) */
  totalScore: number;
  /** Compatibility label */
  compatibility: 'excellent' | 'good' | 'neutral' | 'caution' | 'poor';
  /** Summary text */
  detail: string;
  /** Life Path numbers */
  lifePathA: number;
  lifePathB: number;
}

/**
 * 9×9 Life Path compatibility matrix.
 * Values range from -2 (very incompatible) to +2 (very compatible).
 * Rows and columns indexed by Life Path number (1-9).
 * Master numbers (11, 22, 33) are reduced to their base.
 */
const COMPATIBILITY_MATRIX: Record<string, number> = {
  // 1
  '1-1': 1, '1-2': 1, '1-3': 2, '1-4': 0, '1-5': 2,
  '1-6': 0, '1-7': 1, '1-8': -1, '1-9': 1,
  // 2
  '2-2': 0, '2-3': 1, '2-4': 2, '2-5': -1, '2-6': 2,
  '2-7': 0, '2-8': 2, '2-9': 1,
  // 3
  '3-3': 1, '3-4': -1, '3-5': 2, '3-6': 1, '3-7': 1,
  '3-8': -1, '3-9': 2,
  // 4
  '4-4': 1, '4-5': -1, '4-6': 1, '4-7': 0, '4-8': 2,
  '4-9': -1,
  // 5
  '5-5': 0, '5-6': -1, '5-7': 2, '5-8': 0, '5-9': 1,
  // 6
  '6-6': 1, '6-7': -1, '6-8': 0, '6-9': 2,
  // 7
  '7-7': 1, '7-8': -1, '7-9': 1,
  // 8
  '8-8': 1, '8-9': -1,
  // 9
  '9-9': 1,
};

/**
 * Life Path descriptor keywords.
 */
const LIFE_PATH_NAMES: Record<number, string> = {
  1: 'Lãnh đạo',
  2: 'Hợp tác',
  3: 'Sáng tạo',
  4: 'Ổn định',
  5: 'Tự do',
  6: 'Gia đình',
  7: 'Tâm linh',
  8: 'Quyền lực',
  9: 'Nhân đạo',
};

/**
 * Calculate Life Path number from a birth date.
 * Uses the same algorithm as numerologyEngine.calcLifePath().
 */
function calcLifePath(date: Date): number {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  const dayReduced = reduceToDigit(d, false);
  const monthReduced = reduceToDigit(m, false);
  const yearReduced = reduceToDigit(
    String(y).split('').reduce((s, c) => s + parseInt(c), 0),
    false,
  );

  const rawSum = dayReduced + monthReduced + yearReduced;
  return reduceToDigit(rawSum);
}

/**
 * Look up compatibility score from the 9×9 matrix.
 */
function lookupCompatibility(a: number, b: number): number {
  // Reduce master numbers to base digit for matrix lookup
  const baseA = a > 9 ? reduceToDigit(a, false) : a;
  const baseB = b > 9 ? reduceToDigit(b, false) : b;

  const lo = Math.min(baseA, baseB);
  const hi = Math.max(baseA, baseB);
  const key = `${lo}-${hi}`;

  return COMPATIBILITY_MATRIX[key] ?? 0;
}

/**
 * Compute Numerology synastry between two persons.
 * 
 * @param dobA - Date of Birth for Person A
 * @param dobB - Date of Birth for Person B
 * @returns NumerologySynastryResult
 */
export function computeNumerologySynastry(
  dobA: Date,
  dobB: Date,
): NumerologySynastryResult {
  const lpA = calcLifePath(dobA);
  const lpB = calcLifePath(dobB);

  const rawScore = lookupCompatibility(lpA, lpB);
  // Scale to -10..+10 range (raw is -2..+2)
  const totalScore = rawScore * 5;

  const compatibility = totalScore >= 8 ? 'excellent'
    : totalScore >= 3 ? 'good'
      : totalScore >= -2 ? 'neutral'
        : totalScore >= -7 ? 'caution'
          : 'poor';

  const nameA = LIFE_PATH_NAMES[lpA > 9 ? reduceToDigit(lpA, false) : lpA] || '';
  const nameB = LIFE_PATH_NAMES[lpB > 9 ? reduceToDigit(lpB, false) : lpB] || '';

  const COMPAT_TEXT: Record<string, string> = {
    excellent: 'Rất hợp',
    good: 'Tương hợp',
    neutral: 'Bình thường',
    caution: 'Ít hợp',
    poor: 'Không hợp',
  };

  return {
    totalScore,
    compatibility,
    detail: `Thần Số Học: Số ${lpA} (${nameA}) × Số ${lpB} (${nameB}) — ${COMPAT_TEXT[compatibility]}`,
    lifePathA: lpA,
    lifePathB: lpB,
  };
}
