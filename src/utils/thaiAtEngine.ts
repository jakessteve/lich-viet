/**
 * Thái Ất Engine — Thái Ất Thần Số Chart Construction
 *
 * Implements the cosmic weather engine for yearly/monthly analysis
 * based on the 360-year Superior Epoch cycle.
 */

import type {
  ThaiAtChart,
  ThaiAtPalace,
  ThaiAtDeityPosition,
  HostGuestResult,
  ThaiAtMonthOverlay,
  CosmicForecast,
} from '../types/thaiAt';
import { getCanChiYear } from './calendarEngine';
import palacesData from '../data/thaiAt/thaiAtPalaces.json';
import deitiesData from '../data/thaiAt/thaiAtDeities.json';
import hexagramsData from '../data/thaiAt/thaiAtHexagrams.json';

// ── Constants ──────────────────────────────────────────────────

const PALACES = palacesData.palaces as ThaiAtPalace[];
const EPOCH_CONFIG = deitiesData.epochConfig;
const DEITIES = deitiesData.deities;
const PALACE_FORECASTS = hexagramsData.palaceForecasts as Record<
  string,
  { element: string; forecast: string; tone: string; detailedForecast?: string; monthlyHighlights?: string }
>;
const DOMINANCE_INTERP = hexagramsData.dominanceInterpretations;
const MONTHLY_MODS = hexagramsData.monthlyModifiers as Record<string, { shift: number; note: string }>;

// ── T2: Ngũ Hành Palace Element Interactions ───────────────────

type NguHanh = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';
type ElementRelation = 'sinh' | 'khac' | 'bi_sinh' | 'bi_khac' | 'ty_hoa';

const NGU_HANH_SINH: Record<NguHanh, NguHanh> = {
  Mộc: 'Hỏa',
  Hỏa: 'Thổ',
  Thổ: 'Kim',
  Kim: 'Thủy',
  Thủy: 'Mộc',
};
const NGU_HANH_KHAC: Record<NguHanh, NguHanh> = {
  Mộc: 'Thổ',
  Thổ: 'Thủy',
  Thủy: 'Hỏa',
  Hỏa: 'Kim',
  Kim: 'Mộc',
};

function getElementRelation(source: NguHanh, target: NguHanh): ElementRelation {
  if (source === target) return 'ty_hoa';
  if (NGU_HANH_SINH[source] === target) return 'sinh';
  if (NGU_HANH_SINH[target] === source) return 'bi_sinh';
  if (NGU_HANH_KHAC[source] === target) return 'khac';
  return 'bi_khac';
}

const ELEMENT_RELATION_LABELS: Record<ElementRelation, string> = {
  sinh: 'Sinh (tương sinh)',
  khac: 'Khắc (tương khắc)',
  bi_sinh: 'Bị Sinh (được sinh)',
  bi_khac: 'Bị Khắc (bị khắc chế)',
  ty_hoa: 'Tỷ Hòa (cùng hành)',
};

/** Nạp Âm element by Heavenly Stem + Earthly Branch pair index. Authentic 30-pair mapping (Lục Thập Hoa Giáp). */
const NAP_AM_ELEMENTS: NguHanh[] = [
  'Kim',   // 1. Giáp Tý - Ất Sửu (Hải Trung Kim)
  'Hỏa',   // 2. Bính Dần - Đinh Mão (Lư Trung Hỏa)
  'Mộc',   // 3. Mậu Thìn - Kỷ Tỵ (Đại Lâm Mộc)
  'Thổ',   // 4. Canh Ngọ - Tân Mùi (Lộ Bàng Thổ)
  'Kim',   // 5. Nhâm Thân - Quý Dậu (Kiếm Phong Kim)
  'Hỏa',   // 6. Giáp Tuất - Ất Hợi (Sơn Đầu Hỏa)
  'Thủy',  // 7. Bính Tý - Đinh Sửu (Giản Hạ Thủy)
  'Thổ',   // 8. Mậu Dần - Kỷ Mão (Thành Đầu Thổ)
  'Kim',   // 9. Canh Thìn - Tân Tỵ (Bạch Lạp Kim)
  'Mộc',   // 10. Nhâm Ngọ - Quý Mùi (Dương Liễu Mộc)
  'Thủy',  // 11. Giáp Thân - Ất Dậu (Tuyền Trung Thủy)
  'Thổ',   // 12. Bính Tuất - Đinh Hợi (Ốc Thượng Thổ)
  'Hỏa',   // 13. Mậu Tý - Kỷ Sửu (Tích Lịch Hỏa)
  'Mộc',   // 14. Canh Dần - Tân Mão (Tùng Bách Mộc)
  'Thủy',  // 15. Nhâm Thìn - Quý Tỵ (Trường Lưu Thủy)
  'Kim',   // 16. Giáp Ngọ - Ất Mùi (Sa Trung Kim)
  'Hỏa',   // 17. Bính Thân - Đinh Dậu (Sơn Hạ Hỏa)
  'Mộc',   // 18. Mậu Tuất - Kỷ Hợi (Bình Địa Mộc)
  'Thổ',   // 19. Canh Tý - Tân Sửu (Bích Thượng Thổ)
  'Kim',   // 20. Nhâm Dần - Quý Mão (Kim Bạch Kim)
  'Hỏa',   // 21. Giáp Thìn - Ất Tỵ (Phúc Đăng Hỏa)
  'Thủy',  // 22. Bính Ngọ - Đinh Mùi (Thiên Hà Thủy)
  'Thổ',   // 23. Mậu Thân - Kỷ Dậu (Đại Trạch Thổ)
  'Kim',   // 24. Canh Tuất - Tân Hợi (Thoa Xuyến Kim)
  'Mộc',   // 25. Nhâm Tý - Quý Sửu (Tang Đố Mộc)
  'Thủy',  // 26. Giáp Dần - Ất Mão (Đại Khê Thủy)
  'Thổ',   // 27. Bính Thìn - Đinh Tỵ (Sa Trung Thổ)
  'Hỏa',   // 28. Mậu Ngọ - Kỷ Mùi (Thiên Thượng Hỏa)
  'Mộc',   // 29. Canh Thân - Tân Dậu (Thạch Lựu Mộc)
  'Thủy',  // 30. Nhâm Tuất - Quý Hợi (Đại Hải Thủy)
];

function getYearNapAmElement(lunarYear: number): NguHanh {
  const idx = (((lunarYear - 4) % 60) + 60) % 60;
  return NAP_AM_ELEMENTS[Math.floor(idx / 2)];
}

export interface PalaceElementAnalysis {
  palaceElement: string;
  yearElement: string;
  relation: ElementRelation;
  relationLabel: string;
  score: number; // -2 to +2
  interpretation: string;
}

function analyzePalaceElement(palaceElement: string, lunarYear: number): PalaceElementAnalysis {
  const yearElement = getYearNapAmElement(lunarYear);
  const relation = getElementRelation(palaceElement as NguHanh, yearElement);
  const score =
    relation === 'sinh' ? 2 : relation === 'bi_sinh' ? 1 : relation === 'ty_hoa' ? 0 : relation === 'bi_khac' ? -1 : -2;

  const interpretations: Record<ElementRelation, string> = {
    sinh: `Cung (${palaceElement}) sinh năm (${yearElement}) — Năng lượng vũ trụ hỗ trợ, thuận lợi cho phát triển.`,
    bi_sinh: `Năm (${yearElement}) sinh Cung (${palaceElement}) — Năm cung cấp tài nguyên, thời cơ tự đến.`,
    ty_hoa: `Cung (${palaceElement}) hòa năm (${yearElement}) — Cân bằng, ổn định. Duy trì hiện trạng tốt.`,
    khac: `Cung (${palaceElement}) khắc năm (${yearElement}) — Áp lực biến đổi, cần nỗ lực vượt qua thử thách.`,
    bi_khac: `Năm (${yearElement}) khắc Cung (${palaceElement}) — Bị kiềm chế từ bên ngoài, cẩn thận hành động.`,
  };

  return {
    palaceElement,
    yearElement,
    relation,
    relationLabel: ELEMENT_RELATION_LABELS[relation],
    score,
    interpretation: interpretations[relation],
  };
}

// ── Epoch Calculations ─────────────────────────────────────────

/**
 * Calculate position within the 360-year Superior Epoch.
 */
function getEpochPosition(lunarYear: number) {
  const yearsSinceRef = lunarYear - EPOCH_CONFIG.referenceEpochStart;
  const superiorEpochYear =
    (((yearsSinceRef % EPOCH_CONFIG.superiorEpochYears) + EPOCH_CONFIG.superiorEpochYears) %
      EPOCH_CONFIG.superiorEpochYears) +
    1;
  const cycleNumber = Math.floor((superiorEpochYear - 1) / EPOCH_CONFIG.cycleYears) + 1;
  const cycleYear = ((superiorEpochYear - 1) % EPOCH_CONFIG.cycleYears) + 1;
  const subCycleYear = ((cycleYear - 1) % EPOCH_CONFIG.subCycleYears) + 1;

  return { superiorEpochYear, cycleNumber, cycleYear, subCycleYear };
}

/**
 * Calculate which of the 16 palaces Thái Ất occupies for the given year.
 * Uses the cycle year mapped to 16 palaces in a rotating pattern.
 */
function getThaiAtPalaceNumber(epochPosition: ReturnType<typeof getEpochPosition>): number {
  // Map cycle year (1-72) to palace (1-16) using modular rotation
  // Each palace governs approximately 4.5 years within a 72-year cycle
  const palaceIndex = (epochPosition.cycleYear - 1) % 16;
  return palaceIndex + 1;
}

// ── T3: Three Calculation Formulas (Host/Guest/Fixed) ──────────

/**
 * Derive Host Count (Chủ Toán), Guest Count (Khách Toán), and Fixed Count (Định Toán).
 *
 * T3 Enhancement: Implements three separate formulas:
 * 1. Host (Chủ Toán) — represents internal/domestic force, based on branch cycle
 * 2. Guest (Khách Toán) — represents external/foreign force, based on stem cycle
 * 3. Fixed (Định Toán) — represents cosmic constant, derived from both
 *
 * ⚠️ DISCLAIMER: These are improved approximations using more authentic modular
 * arithmetic patterns, but still awaiting full 積年 (Tích Niên) verification
 * from classical texts 《太乙金鏡式經》.
 */
function calculateHostGuest(lunarYear: number, palaceNumber: number): HostGuestResult {
  const branchIndex = (((lunarYear - 4) % 12) + 12) % 12;
  const stemIndex = (((lunarYear - 4) % 10) + 10) % 10;
  const sexagenaryIndex = (((lunarYear - 4) % 60) + 60) % 60;

  // T3 Formula 1: Host Count (Chủ Toán)
  // Internal force: Branch-based with palace modulation
  const hostBase = (branchIndex + 1) * 4 + palaceNumber;
  const hostCount = hostBase + (lunarYear % 7);

  // T3 Formula 2: Guest Count (Khách Toán)
  // External force: Stem-based with inverse palace factor
  const guestBase = (stemIndex + 1) * 3 + (16 - palaceNumber);
  const guestCount = guestBase + (lunarYear % 5);

  // T3 Formula 3: Fixed Count (Định Toán)
  // Cosmic constant: Sexagenary cycle midpoint with palace modulus
  const fixedCount = Math.floor(sexagenaryIndex / 4) + palaceNumber + (lunarYear % 3);

  // Dominance from Host vs Guest differential
  const differential = hostCount - guestCount;
  let dominance: HostGuestResult['dominance'];
  if (differential > 5) {
    dominance = 'hostDominant';
  } else if (differential < -5) {
    dominance = 'guestDominant';
  } else {
    dominance = 'balanced';
  }

  const interp = DOMINANCE_INTERP[dominance];

  return {
    hostCount,
    guestCount,
    fixedCount,
    dominance,
    dominanceLabel: interp.label,
    dominanceSummary: interp.summary,
    dominanceAdvice: interp.advice,
    detailedAnalysis: interp.detailedAnalysis,
    careerAdvice: interp.careerAdvice,
    personalAdvice: interp.personalAdvice,
    disclaimer:
      '⚠️ Chủ/Khách/Định Toán sử dụng công thức cải tiến (3 công thức riêng biệt), chưa phải thuật toán chính thống từ 《太乙金鏡式經》. Kết quả mang tính tham khảo.',
  };
}

// ── Deity Placement ────────────────────────────────────────────

function placeDeities(thaiAtPalace: number): ThaiAtDeityPosition[] {
  return DEITIES.map((deity) => {
    let palace: number;

    switch (deity.id) {
      case 'thaiAt':
        palace = thaiAtPalace;
        break;
      case 'vanXuong':
        palace = ((thaiAtPalace - 1 + 2) % 16) + 1;
        break;
      case 'thiKich':
        palace = ((thaiAtPalace - 1 + 8) % 16) + 1; // Opposite
        break;
      case 'keThan':
        palace = ((thaiAtPalace - 1 + 11) % 16) + 1;
        break;
      case 'thaiAm':
        palace = ((thaiAtPalace - 1 + 3) % 16) + 1;
        break;
      default:
        palace = thaiAtPalace;
    }

    return {
      id: deity.id,
      nameVi: deity.nameVi,
      palace,
      nature: deity.nature as ThaiAtDeityPosition['nature'],
      role: deity.role,
      personality: deity.personality,
      influenceWhenStrong: deity.influenceWhenStrong,
      influenceWhenWeak: deity.influenceWhenWeak,
    };
  });
}

// ── Main Chart Generation ──────────────────────────────────────

/**
 * Generate a full Thái Ất chart for a given lunar year.
 */
export function getThaiAtYearChart(lunarYear: number): ThaiAtChart {
  const epochPosition = getEpochPosition(lunarYear);
  const thaiAtPalace = getThaiAtPalaceNumber(epochPosition);
  const thaiAtPalaceInfo = PALACES.find((p) => p.number === thaiAtPalace) || PALACES[0];
  const deityPositions = placeDeities(thaiAtPalace);
  const hostGuest = calculateHostGuest(lunarYear, thaiAtPalace);

  const palaceForecast = PALACE_FORECASTS[thaiAtPalace.toString()];
  const canChiYear = getCanChiYear(lunarYear);

  // T2: Palace element interaction analysis
  const activeElement = palaceForecast?.element || thaiAtPalaceInfo.element;
  const palaceElementAnalysis = analyzePalaceElement(activeElement, lunarYear);

  return {
    lunarYear,
    canChiYear,
    thaiAtPalace,
    thaiAtPalaceInfo,
    deityPositions,
    hostGuest,
    epochPosition,
    forecast: palaceForecast?.forecast || 'Không có dữ liệu dự báo',
    forecastTone: (palaceForecast?.tone || 'neutral') as ThaiAtChart['forecastTone'],
    element: activeElement,
    detailedForecast: palaceForecast?.detailedForecast,
    monthlyHighlights: palaceForecast?.monthlyHighlights,
    palaceElementAnalysis,
  };
}

/**
 * Get monthly overlay within the year.
 */
export function getThaiAtMonthOverlay(lunarYear: number, lunarMonth: number): ThaiAtMonthOverlay {
  const yearChart = getThaiAtYearChart(lunarYear);
  const monthMod = MONTHLY_MODS[lunarMonth.toString()];

  const adjustedPalace = Math.max(
    1,
    Math.min(16, ((yearChart.thaiAtPalace - 1 + (monthMod?.shift || 0) + 16) % 16) + 1),
  );

  const adjustedForecast = PALACE_FORECASTS[adjustedPalace.toString()];

  return {
    lunarMonth,
    adjustedPalace,
    shiftNote: monthMod?.note || '',
    monthlyForecast: adjustedForecast?.forecast || yearChart.forecast,
    monthNote: monthMod?.note,
  };
}

/**
 * Get a one-line cosmic forecast for the Landing Page widget.
 */
export function getCosmicForecast(lunarYear: number): CosmicForecast {
  const chart = getThaiAtYearChart(lunarYear);
  const canChiYear = chart.canChiYear;

  // Build a compact one-liner
  const elementLabel = chart.element;
  const toneEmoji = chart.forecastTone === 'optimistic' ? '🌟' : chart.forecastTone === 'cautious' ? '⚠️' : '☯️';
  const oneLiner = `${toneEmoji} Năm ${canChiYear} (${lunarYear}): ${elementLabel} — ${chart.forecast}`;

  return {
    year: lunarYear,
    canChiYear,
    oneLiner,
    tone: chart.forecastTone,
    element: chart.element,
    palaceName: chart.thaiAtPalaceInfo.nameVi,
    hostGuestLabel: chart.hostGuest.dominanceLabel,
  };
}
