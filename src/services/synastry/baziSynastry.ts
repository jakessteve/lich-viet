/**
 * Bát Tự Synastry — 合婚 (Marriage Compatibility) Scoring
 *
 * 5-layer pipeline derived from classical texts:
 *   L1: Day Master 五行 comparison (三命通會)
 *   L2: Spouse Star quality (三命通會 — 正財/正官)
 *   L3: Nạp Âm pair compatibility (三命通會)
 *   L4: 調候 seasonal balance (窮通寶鑑)
 *   L5: 用神 mutual benefit (子平真詮)
 *
 * Uses existing baziEngine.generateBaziChart() for both persons,
 * then COMPARES the two charts. No new Bazi calculation logic needed.
 */

import type { BaziChart, NguHanh } from '../../types/bazi';
import { BAZI_SYNASTRY_SCORING } from '../../config/scoring';

// ── Types ─────────────────────────────────────────────────────

export interface SynastryLayerResult {
  layer: string;
  label: string;
  score: number;
  maxScore: number;
  detail: string;
  academicSource: string;
}

export interface BaziSynastryResult {
  totalScore: number;
  maxScore: number;
  layers: SynastryLayerResult[];
  detail: string;
  compatibility: 'excellent' | 'good' | 'neutral' | 'caution' | 'poor';
}

// ── Ngũ Hành Interaction Tables ───────────────────────────────

/** 相生 (generates): Wood→Fire→Earth→Metal→Water→Wood */
const NGU_HANH_SINH: Record<NguHanh, NguHanh> = {
  'Mộc': 'Hỏa',
  'Hỏa': 'Thổ',
  'Thổ': 'Kim',
  'Kim': 'Thủy',
  'Thủy': 'Mộc',
};

/** 相克 (controls): Wood→Earth→Water→Fire→Metal→Wood */
const NGU_HANH_KHAC: Record<NguHanh, NguHanh> = {
  'Mộc': 'Thổ',
  'Hỏa': 'Kim',
  'Thổ': 'Thủy',
  'Kim': 'Mộc',
  'Thủy': 'Hỏa',
};

// ── Layer Functions ───────────────────────────────────────────

/**
 * L1: Day Master 五行 comparison
 * Source: 三命通會 — Base element relationship between Day Masters
 */
function scoreDayMasterRelation(
  elementA: NguHanh,
  elementB: NguHanh,
): SynastryLayerResult {
  const S = BAZI_SYNASTRY_SCORING;
  let score: number;
  let detail: string;

  if (elementA === elementB) {
    score = S.dayMasterSame;
    detail = `Cùng hành ${elementA} — Tương đồng, dễ hiểu nhau`;
  } else if (NGU_HANH_SINH[elementA] === elementB || NGU_HANH_SINH[elementB] === elementA) {
    score = S.dayMasterHarmony;
    detail = `${elementA} ↔ ${elementB} — Tương sinh, hỗ trợ lẫn nhau ✨`;
  } else if (NGU_HANH_KHAC[elementA] === elementB || NGU_HANH_KHAC[elementB] === elementA) {
    score = S.dayMasterClash;
    detail = `${elementA} ↔ ${elementB} — Tương khắc, nhiều mâu thuẫn ⚠️`;
  } else {
    // Neither sinh nor khac (e.g., Wood-Metal where Metal克Wood is handled above,
    // but if looked at differently they are 2 steps apart)
    score = 0;
    detail = `${elementA} ↔ ${elementB} — Bình hòa`;
  }

  return {
    layer: 'dayMaster',
    label: 'Ngũ Hành Nhật Chủ',
    score: Math.max(-S.max, Math.min(S.max, score)),
    maxScore: S.dayMasterHarmony,
    detail,
    academicSource: '三命通會 · 論五行生克',
  };
}

/**
 * L2: Spouse Star quality
 * Source: 三命通會 — 正財 for male represents wife, 正官 for female represents husband
 */
function scoreSpouseStar(
  chartA: BaziChart,
  chartB: BaziChart,
  genderA: 'male' | 'female',
  genderB: 'male' | 'female',
): SynastryLayerResult {
  const S = BAZI_SYNASTRY_SCORING;
  let score = 0;
  const details: string[] = [];

  // Check A's spouse star quality
  const spouseStarA = genderA === 'male' ? 'Chính Tài' : 'Chính Quan';
  const hasSpouseStarA = chartA.thapThan?.some(t => t.god === spouseStarA);
  if (hasSpouseStarA) {
    score += Math.round(S.spouseStarBonus / 2);
    details.push(`${genderA === 'male' ? 'Nam' : 'Nữ'}: có ${spouseStarA} — Tốt`);
  } else {
    score += Math.round(S.spouseStarPenalty / 2);
    details.push(`${genderA === 'male' ? 'Nam' : 'Nữ'}: thiếu ${spouseStarA} — Yếu`);
  }

  // Check B's spouse star quality
  const spouseStarB = genderB === 'male' ? 'Chính Tài' : 'Chính Quan';
  const hasSpouseStarB = chartB.thapThan?.some(t => t.god === spouseStarB);
  if (hasSpouseStarB) {
    score += Math.round(S.spouseStarBonus / 2);
    details.push(`${genderB === 'male' ? 'Nam' : 'Nữ'}: có ${spouseStarB} — Tốt`);
  } else {
    score += Math.round(S.spouseStarPenalty / 2);
    details.push(`${genderB === 'male' ? 'Nam' : 'Nữ'}: thiếu ${spouseStarB} — Yếu`);
  }

  return {
    layer: 'spouseStar',
    label: 'Sao Phu Thê (十神)',
    score: Math.max(-S.max, Math.min(S.max, score)),
    maxScore: S.spouseStarBonus,
    detail: details.join(' | '),
    academicSource: '三命通會 · 夫星夫宮',
  };
}

/**
 * L3: Nạp Âm pair compatibility
 * Source: 三命通會 — Compare Nạp Âm elements of both Day pillars
 */
function scoreNapAmPair(chartA: BaziChart, chartB: BaziChart): SynastryLayerResult {
  const S = BAZI_SYNASTRY_SCORING;
  const napAmA = chartA.dayPillar.napAmElement;
  const napAmB = chartB.dayPillar.napAmElement;

  let score: number;
  let detail: string;

  if (napAmA === napAmB) {
    score = Math.round(S.napAmMatch * 0.6);
    detail = `Nạp Âm: ${chartA.dayPillar.napAm} ↔ ${chartB.dayPillar.napAm} — Đồng hành`;
  } else if (NGU_HANH_SINH[napAmA] === napAmB || NGU_HANH_SINH[napAmB] === napAmA) {
    score = S.napAmMatch;
    detail = `Nạp Âm: ${chartA.dayPillar.napAm} ↔ ${chartB.dayPillar.napAm} — Tương sinh ✅`;
  } else if (NGU_HANH_KHAC[napAmA] === napAmB || NGU_HANH_KHAC[napAmB] === napAmA) {
    score = S.napAmClash;
    detail = `Nạp Âm: ${chartA.dayPillar.napAm} ↔ ${chartB.dayPillar.napAm} — Tương khắc ❌`;
  } else {
    score = 0;
    detail = `Nạp Âm: ${chartA.dayPillar.napAm} ↔ ${chartB.dayPillar.napAm} — Bình hòa`;
  }

  return {
    layer: 'napAm',
    label: 'Nạp Âm đôi',
    score,
    maxScore: S.napAmMatch,
    detail,
    academicSource: '三命通會 · 六十花甲納音',
  };
}

/**
 * L4: 調候 seasonal balance
 * Source: 窮通寶鑑 — Does one person's element balance the other's seasonal weakness?
 */
function scoreDieuHau(chartA: BaziChart, chartB: BaziChart): SynastryLayerResult {
  const S = BAZI_SYNASTRY_SCORING;
  let score = 0;
  let detail: string;

  // If A's Điều Hậu recommends an element that B naturally has (or vice versa)
  const aNeeds = chartA.dieuHau?.neededElement;
  const bNeeds = chartB.dieuHau?.neededElement;
  const aElement = chartA.dayMaster.dayMasterElement;
  const bElement = chartB.dayMaster.dayMasterElement;

  const aHelpsB = aElement === bNeeds;
  const bHelpsA = bElement === aNeeds;

  if (aHelpsB && bHelpsA) {
    score = S.dieuHauBonus;
    detail = `Điều Hậu tương trợ: ${aElement} giúp ${bNeeds} và ngược lại ✨`;
  } else if (aHelpsB || bHelpsA) {
    score = Math.round(S.dieuHauBonus * 0.6);
    detail = `Điều Hậu: một bên hỗ trợ mùa của bên kia`;
  } else {
    detail = 'Điều Hậu: không có hỗ trợ mùa đặc biệt';
  }

  return {
    layer: 'dieuHau',
    label: 'Điều Hậu (調候)',
    score,
    maxScore: S.dieuHauBonus,
    detail,
    academicSource: '窮通寶鑑 · 調候用神',
  };
}

/**
 * L5: 用神 mutual benefit
 * Source: 子平真詮 — Does one person naturally supply the other's 用神?
 */
function scoreYongShen(chartA: BaziChart, chartB: BaziChart): SynastryLayerResult {
  const S = BAZI_SYNASTRY_SCORING;
  const aFavorable = chartA.dayMaster.favorableElements || [];
  const bFavorable = chartB.dayMaster.favorableElements || [];
  const aElement = chartA.dayMaster.dayMasterElement;
  const bElement = chartB.dayMaster.dayMasterElement;

  let score = 0;
  const details: string[] = [];

  // A's element is B's favorable → A helps B
  if (bFavorable.includes(aElement)) {
    score += Math.round(S.yongShenBonus / 2);
    details.push(`${aElement} là dụng thần của đối phương`);
  }

  // B's element is A's favorable → B helps A
  if (aFavorable.includes(bElement)) {
    score += Math.round(S.yongShenBonus / 2);
    details.push(`${bElement} là dụng thần của bạn`);
  }

  // Mutual unfavorable
  const aUnfavorable = chartA.dayMaster.unfavorableElements || [];
  const bUnfavorable = chartB.dayMaster.unfavorableElements || [];
  if (bUnfavorable.includes(aElement) && aUnfavorable.includes(bElement)) {
    score -= Math.round(S.yongShenBonus / 2);
    details.push('Kỵ thần lẫn nhau — cần lưu ý');
  }

  return {
    layer: 'yongShen',
    label: 'Dụng Thần (用神)',
    score: Math.max(-S.max, Math.min(S.max, score)),
    maxScore: S.yongShenBonus,
    detail: details.length > 0 ? details.join(' | ') : 'Dụng thần không tương tác đặc biệt',
    academicSource: '子平真詮 · 論用神',
  };
}

// ── Main Public API ───────────────────────────────────────────

/**
 * Compute Bát Tự synastry (合婚) score between two people.
 *
 * @param chartA - BaziChart of Person A (from generateBaziChart)
 * @param chartB - BaziChart of Person B (from generateBaziChart)
 * @param genderA - Gender of Person A
 * @param genderB - Gender of Person B
 */
export function computeBaziSynastry(
  chartA: BaziChart,
  chartB: BaziChart,
  genderA: 'male' | 'female' = 'male',
  genderB: 'male' | 'female' = 'female',
): BaziSynastryResult {
  const layers: SynastryLayerResult[] = [
    scoreDayMasterRelation(chartA.dayMaster.dayMasterElement, chartB.dayMaster.dayMasterElement),
    scoreSpouseStar(chartA, chartB, genderA, genderB),
    scoreNapAmPair(chartA, chartB),
    scoreDieuHau(chartA, chartB),
    scoreYongShen(chartA, chartB),
  ];

  const totalScore = layers.reduce((sum, l) => sum + l.score, 0);
  const maxScore = BAZI_SYNASTRY_SCORING.max;
  const clampedScore = Math.max(-maxScore, Math.min(maxScore, totalScore));

  // Determine compatibility label
  let compatibility: BaziSynastryResult['compatibility'];
  if (clampedScore >= 15) compatibility = 'excellent';
  else if (clampedScore >= 8) compatibility = 'good';
  else if (clampedScore >= 0) compatibility = 'neutral';
  else if (clampedScore >= -8) compatibility = 'caution';
  else compatibility = 'poor';

  const compatLabels: Record<typeof compatibility, string> = {
    excellent: 'Rất Hợp ✨',
    good: 'Hợp ✅',
    neutral: 'Bình Thường',
    caution: 'Cần Lưu Ý ⚠️',
    poor: 'Không Hợp ❌',
  };

  return {
    totalScore: clampedScore,
    maxScore,
    layers,
    detail: `Bát Tự 合婚: ${compatLabels[compatibility]} (${clampedScore > 0 ? '+' : ''}${clampedScore}/${maxScore})`,
    compatibility,
  };
}
