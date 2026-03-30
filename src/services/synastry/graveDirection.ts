/**
 * Grave Direction Service — Simplified Táng Thư (葬書) Analysis
 *
 * Reuses the existing Flying Star (Phi Tinh) engine for yin-house (grave)
 * orientation analysis. Adds Nạp Âm element compatibility check between
 * the deceased's year Nạp Âm and the proposed grave facing direction.
 *
 * Source: S9 Táng Thư + S1 Hiệp Kỷ Nạp Âm tables.
 */

import { generateFlyingStarChart, type FlyingStarChart } from '../../utils/flyingStarEngine';

// ── Types ─────────────────────────────────────────────────────

export interface GraveDirectionResult {
  chart: FlyingStarChart;
  napAmElement: string;
  suitableDirections: string[];
  unsuitableDirections: string[];
  assessment: string;
}

// ── Nạp Âm Direction Compatibility ─────────────────────────────

/** Direction-to-element mapping (8 directions → Ngũ Hành) */
const DIRECTION_ELEMENT: Record<string, string> = {
  'Bắc': 'Thủy',
  'Đông Bắc': 'Thổ',
  'Đông': 'Mộc',
  'Đông Nam': 'Mộc',
  'Nam': 'Hỏa',
  'Tây Nam': 'Thổ',
  'Tây': 'Kim',
  'Tây Bắc': 'Kim',
};

/** Ngũ Hành sinh relationship: A sinh B */
const SINH: Record<string, string> = {
  'Kim': 'Thủy', 'Thủy': 'Mộc', 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim',
};

/** Ngũ Hành khắc relationship: A khắc B */
const KHAC: Record<string, string> = {
  'Kim': 'Mộc', 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim',
};

/** Extract Nạp Âm element from year Can Chi string (e.g., "Giáp Tý" → "Kim") */
const NAP_AM_TABLE: Record<string, string> = {
  'Giáp Tý': 'Kim', 'Ất Sửu': 'Kim', 'Bính Dần': 'Hỏa', 'Đinh Mão': 'Hỏa',
  'Mậu Thìn': 'Mộc', 'Kỷ Tỵ': 'Mộc', 'Canh Ngọ': 'Thổ', 'Tân Mùi': 'Thổ',
  'Nhâm Thân': 'Kim', 'Quý Dậu': 'Kim', 'Giáp Tuất': 'Hỏa', 'Ất Hợi': 'Hỏa',
  'Bính Tý': 'Thủy', 'Đinh Sửu': 'Thủy', 'Mậu Dần': 'Thổ', 'Kỷ Mão': 'Thổ',
  'Canh Thìn': 'Kim', 'Tân Tỵ': 'Kim', 'Nhâm Ngọ': 'Mộc', 'Quý Mùi': 'Mộc',
  'Giáp Thân': 'Thủy', 'Ất Dậu': 'Thủy', 'Bính Tuất': 'Thổ', 'Đinh Hợi': 'Thổ',
  'Mậu Tý': 'Hỏa', 'Kỷ Sửu': 'Hỏa', 'Canh Dần': 'Mộc', 'Tân Mão': 'Mộc',
  'Nhâm Thìn': 'Thủy', 'Quý Tỵ': 'Thủy', 'Giáp Ngọ': 'Kim', 'Ất Mùi': 'Kim',
  'Bính Thân': 'Hỏa', 'Đinh Dậu': 'Hỏa', 'Mậu Tuất': 'Mộc', 'Kỷ Hợi': 'Mộc',
  'Canh Tý': 'Thổ', 'Tân Sửu': 'Thổ', 'Nhâm Dần': 'Kim', 'Quý Mão': 'Kim',
  'Giáp Thìn': 'Hỏa', 'Ất Tỵ': 'Hỏa', 'Bính Ngọ': 'Thủy', 'Đinh Mùi': 'Thủy',
  'Mậu Thân': 'Thổ', 'Kỷ Dậu': 'Thổ', 'Canh Tuất': 'Kim', 'Tân Hợi': 'Kim',
  'Nhâm Tý': 'Mộc', 'Quý Sửu': 'Mộc', 'Giáp Dần': 'Thủy', 'Ất Mão': 'Thủy',
  'Bính Thìn': 'Thổ', 'Đinh Tỵ': 'Thổ', 'Mậu Ngọ': 'Hỏa', 'Kỷ Mùi': 'Hỏa',
  'Canh Thân': 'Mộc', 'Tân Dậu': 'Mộc', 'Nhâm Tuất': 'Thủy', 'Quý Hợi': 'Thủy',
};

/**
 * Get Nạp Âm element from a birth year.
 */
function getNapAmFromYear(year: number): string {
  const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
  const canIdx = (year + 6) % 10;
  const chiIdx = (year + 8) % 12;
  const canChi = `${CAN[canIdx]} ${CHI[chiIdx]}`;
  return NAP_AM_TABLE[canChi] || 'Thổ';
}

/**
 * Check if a direction is compatible with the deceased's Nạp Âm element.
 * Returns: 'sinh' (favorable), 'hoa' (neutral), 'khac' (unfavorable)
 */
function checkDirectionCompat(napAmElement: string, direction: string): 'sinh' | 'hoa' | 'khac' {
  const dirElement = DIRECTION_ELEMENT[direction];
  if (!dirElement) return 'hoa';

  // Direction element sinh Nạp Âm → very good (ground nourishes deceased)
  if (SINH[dirElement] === napAmElement) return 'sinh';
  // Same element → neutral/harmonious
  if (dirElement === napAmElement) return 'hoa';
  // Nạp Âm sinh Direction → acceptable
  if (SINH[napAmElement] === dirElement) return 'hoa';
  // Direction element khắc Nạp Âm → unfavorable
  if (KHAC[dirElement] === napAmElement) return 'khac';
  // Nạp Âm khắc Direction → also unfavorable
  if (KHAC[napAmElement] === dirElement) return 'khac';

  return 'hoa';
}

// ── Public API ─────────────────────────────────────────────────

const ALL_DIRECTIONS = ['Bắc', 'Đông Bắc', 'Đông', 'Đông Nam', 'Nam', 'Tây Nam', 'Tây', 'Tây Bắc'];

/**
 * Compute grave direction recommendation.
 *
 * @param deceasedBirthYear - Deceased's birth year (solar)
 * @param burialYear - Year of burial (for Flying Star period)
 * @param facingDirection - Proposed facing direction
 */
export function computeGraveDirection(
  deceasedBirthYear: number,
  burialYear: number,
  facingDirection: string,
): GraveDirectionResult {
  // 1. Generate yin-house Flying Star chart
  const chart = generateFlyingStarChart(burialYear, facingDirection);

  // 2. Get deceased's Nạp Âm element
  const napAmElement = getNapAmFromYear(deceasedBirthYear);

  // 3. Check all directions for compatibility
  const suitableDirections: string[] = [];
  const unsuitableDirections: string[] = [];

  for (const dir of ALL_DIRECTIONS) {
    const compat = checkDirectionCompat(napAmElement, dir);
    // Also check Flying Star — find the palace for this direction
    const palace = chart.palaces.find(p => p.positionVi === dir);
    const isFlyingStarGood = palace ? palace.nature !== 'hung' : true;

    if (compat === 'sinh' && isFlyingStarGood) {
      suitableDirections.push(dir);
    } else if (compat === 'khac' || !isFlyingStarGood) {
      unsuitableDirections.push(dir);
    }
  }

  // 4. Assess proposed direction
  const proposedCompat = checkDirectionCompat(napAmElement, facingDirection);
  const proposedPalace = chart.palaces.find(p => p.positionVi === facingDirection);
  const flyingStarOk = proposedPalace ? proposedPalace.nature !== 'hung' : true;

  let assessment: string;
  if (proposedCompat === 'sinh' && flyingStarOk) {
    assessment = `Hướng ${facingDirection} thuận lợi — Nạp Âm ${napAmElement} được sinh, Phi Tinh cát.`;
  } else if (proposedCompat === 'khac') {
    assessment = `Hướng ${facingDirection} KHÔNG thuận — Nạp Âm ${napAmElement} bị khắc. Nên chọn: ${suitableDirections.join(', ') || 'cần xem thêm'}.`;
  } else if (!flyingStarOk) {
    assessment = `Hướng ${facingDirection} có Phi Tinh hung. Nên chọn: ${suitableDirections.join(', ') || 'cần xem thêm'}.`;
  } else {
    assessment = `Hướng ${facingDirection} bình thường — Nạp Âm ${napAmElement} hòa hợp.`;
  }

  return {
    chart,
    napAmElement,
    suitableDirections,
    unsuitableDirections,
    assessment,
  };
}
