/**
 * Tử Vi Synastry Service — F10
 * 
 * Cross-chart comparison of two Tử Vi (Purple Star) charts.
 * Focuses on Phu Thê (Spouse) palace analysis per 紫微斗數全書.
 * 
 * Uses the existing `tuviEngine.generateChart()` to generate both charts,
 * then compares star quality, brightness, and Tứ Hóa landing in Phu Thê palace.
 */

import { generateChart } from '../tuvi/tuviEngine';
import type { TuViChartData, TuViPalace } from '../tuvi/tuviTypes';

export interface TuViSynastryResult {
  /** Aggregate score (-15 to +15) */
  totalScore: number;
  /** Compatibility label */
  compatibility: 'excellent' | 'good' | 'neutral' | 'caution' | 'poor';
  /** Summary text */
  detail: string;
  /** Individual layer results */
  layers: TuViSynastryLayer[];
  /** Phu Thê palace summary for Person A */
  phuTheSummaryA: string;
  /** Phu Thê palace summary for Person B */
  phuTheSummaryB: string;
}

export interface TuViSynastryLayer {
  label: string;
  score: number;
  detail: string;
}

// Major stars considered auspicious in Phu Thê palace
const AUSPICIOUS_PHU_THE_STARS = new Set([
  'Thiên Phủ', 'Thái Âm', 'Thiên Đồng', 'Thiên Lương',
  'Tả Phụ', 'Hữu Bật', 'Thiên Khôi', 'Thiên Việt',
  'Văn Xương', 'Văn Khúc', 'Lộc Tồn',
  'Hồng Loan', 'Thiên Hỷ',
]);

// Stars that bring turbulence to marriage
const TROUBLED_PHU_THE_STARS = new Set([
  'Thất Sát', 'Phá Quân', 'Tham Lang', 'Liêm Trinh',
  'Kình Dương', 'Đà La', 'Hỏa Tinh', 'Linh Tinh',
  'Địa Không', 'Địa Kiếp',
  'Thiên Hình',
]);

// Brightness levels that amplify star influence
const BRIGHT_LEVELS = new Set(['Miếu', 'Vượng', '旺', '廟']);
const DIM_LEVELS = new Set(['Hãm', 'Lạc', '落', '陷']);

/**
 * Extract the Phu Thê palace from a chart.
 */
function findPhuThePalace(chart: TuViChartData): TuViPalace | undefined {
  return chart.palaces.find(p => p.name === 'Phu Thê');
}

/**
 * Score a Phu Thê palace's star quality.
 * Auspicious stars add points; troubled stars subtract.
 * Brightness amplifies the effect.
 */
function scorePhuTheStars(palace: TuViPalace): { score: number; details: string[] } {
  let score = 0;
  const details: string[] = [];
  const allStars = [...palace.majorStars, ...(palace.minorStars ?? []), ...(palace.adjectiveStars ?? [])];

  for (const star of allStars) {
    const brightnessMult = BRIGHT_LEVELS.has(star.brightness) ? 1.5
      : DIM_LEVELS.has(star.brightness) ? 0.5
        : 1.0;

    if (AUSPICIOUS_PHU_THE_STARS.has(star.name)) {
      const pts = Math.round(2 * brightnessMult);
      score += pts;
      details.push(`${star.name} ${star.brightness || ''} +${pts}`);
    } else if (TROUBLED_PHU_THE_STARS.has(star.name)) {
      const pts = Math.round(2 * brightnessMult);
      score -= pts;
      details.push(`${star.name} ${star.brightness || ''} -${pts}`);
    }

    // Tứ Hóa bonuses
    if (star.mutagen) {
      for (const m of star.mutagen) {
        if (m === 'Hóa Lộc' || m === 'Lộc') { score += 2; details.push(`${star.name} Hóa Lộc +2`); }
        else if (m === 'Hóa Quyền' || m === 'Quyền') { score += 1; details.push(`${star.name} Hóa Quyền +1`); }
        else if (m === 'Hóa Khoa' || m === 'Khoa') { score += 1; details.push(`${star.name} Hóa Khoa +1`); }
        else if (m === 'Hóa Kỵ' || m === 'Kỵ') { score -= 3; details.push(`${star.name} Hóa Kỵ -3`); }
      }
    }
  }

  // Tuần/Triệt Không in Phu Thê = weakened marriage
  if (palace.hasTuanKhong) { score -= 2; details.push('Tuần Không nhập Phu Thê -2'); }
  if (palace.hasTrietKhong) { score -= 2; details.push('Triệt Không nhập Phu Thê -2'); }

  return { score, details };
}

/**
 * Build a human-readable Phu Thê summary from star composition.
 */
function buildPhuTheSummary(palace: TuViPalace): string {
  const majors = palace.majorStars.filter(s => s.type === 'major');
  if (majors.length === 0) return 'Phu Thê vô chính diệu';
  return majors.map(s => `${s.name}${s.brightness ? ` (${s.brightness})` : ''}`).join(', ');
}

/**
 * Compute Tử Vi synastry by comparing two charts' Phu Thê palaces.
 * 
 * @param dobA - Date of Birth for Person A
 * @param hourIndexA - Birth hour index (0-12) for Person A
 * @param genderA - Gender of Person A
 * @param dobB - Date of Birth for Person B  
 * @param hourIndexB - Birth hour index (0-12) for Person B
 * @param genderB - Gender of Person B
 */
export function computeTuViSynastry(
  dobA: Date,
  hourIndexA: number,
  genderA: 'male' | 'female',
  dobB: Date,
  hourIndexB: number,
  genderB: 'male' | 'female',
): TuViSynastryResult {
  // Generate both charts
  const dateToStr = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

  const chartA = generateChart({
    dateType: 'solar',
    solarDate: dateToStr(dobA),
    timeIndex: hourIndexA,
    gender: genderA,
    name: 'A',
  });

  const chartB = generateChart({
    dateType: 'solar',
    solarDate: dateToStr(dobB),
    timeIndex: hourIndexB,
    gender: genderB,
    name: 'B',
  });

  const phuTheA = findPhuThePalace(chartA);
  const phuTheB = findPhuThePalace(chartB);

  const layers: TuViSynastryLayer[] = [];
  let totalScore = 0;

  // Layer 1: Phu Thê star quality for Person A
  if (phuTheA) {
    const { score } = scorePhuTheStars(phuTheA);
    const capped = Math.max(-5, Math.min(5, score));
    totalScore += capped;
    layers.push({
      label: 'Phu Thê A',
      score: capped,
      detail: `Cung Phu Thê của A: ${buildPhuTheSummary(phuTheA)}`,
    });
  }

  // Layer 2: Phu Thê star quality for Person B
  if (phuTheB) {
    const { score } = scorePhuTheStars(phuTheB);
    const capped = Math.max(-5, Math.min(5, score));
    totalScore += capped;
    layers.push({
      label: 'Phu Thê B',
      score: capped,
      detail: `Cung Phu Thê của B: ${buildPhuTheSummary(phuTheB)}`,
    });
  }

  // Layer 3: Nạp Âm compatibility (birth year element)
  const napAmCompat = compareNapAm(chartA.napAmYear ?? '', chartB.napAmYear ?? '');
  totalScore += napAmCompat.score;
  layers.push(napAmCompat);

  // Cap total to [-15, 15]
  totalScore = Math.max(-15, Math.min(15, totalScore));

  const compatibility = totalScore >= 10 ? 'excellent'
    : totalScore >= 5 ? 'good'
      : totalScore >= -2 ? 'neutral'
        : totalScore >= -8 ? 'caution'
          : 'poor';

  const COMPAT_LABELS: Record<string, string> = {
    excellent: 'Rất hợp',
    good: 'Tương hợp',
    neutral: 'Bình thường',
    caution: 'Cần cẩn trọng',
    poor: 'Không thuận lợi',
  };

  return {
    totalScore,
    compatibility,
    detail: `Tử Vi 斗數: ${COMPAT_LABELS[compatibility]} (${totalScore > 0 ? '+' : ''}${totalScore}/15)`,
    layers,
    phuTheSummaryA: phuTheA ? buildPhuTheSummary(phuTheA) : 'N/A',
    phuTheSummaryB: phuTheB ? buildPhuTheSummary(phuTheB) : 'N/A',
  };
}

/**
 * Compare two persons' Nạp Âm (birth year element).
 * Same element = neutral, Sinh cycle = good, Khắc = bad.
 */
function compareNapAm(napAmA: string, napAmB: string): TuViSynastryLayer {
  const extractElement = (napAm: string): string => {
    const els = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
    for (const el of els) {
      if (napAm.endsWith(el)) return el;
    }
    return '';
  };

  const elA = extractElement(napAmA);
  const elB = extractElement(napAmB);

  if (!elA || !elB) {
    return { label: 'Nạp Âm', score: 0, detail: 'Không xác định được Nạp Âm' };
  }

  if (elA === elB) {
    return { label: 'Nạp Âm', score: 2, detail: `${napAmA} ↔ ${napAmB} — Đồng hành (+2)` };
  }

  const SINH: Record<string, string> = {
    Kim: 'Thủy', Thủy: 'Mộc', Mộc: 'Hỏa', Hỏa: 'Thổ', Thổ: 'Kim',
  };

  if (SINH[elA] === elB || SINH[elB] === elA) {
    return { label: 'Nạp Âm', score: 3, detail: `${napAmA} ↔ ${napAmB} — Tương sinh (+3)` };
  }

  const KHAC: Record<string, string> = {
    Kim: 'Mộc', Mộc: 'Thổ', Thổ: 'Thủy', Thủy: 'Hỏa', Hỏa: 'Kim',
  };

  if (KHAC[elA] === elB || KHAC[elB] === elA) {
    return { label: 'Nạp Âm', score: -3, detail: `${napAmA} ↔ ${napAmB} — Tương khắc (-3)` };
  }

  return { label: 'Nạp Âm', score: 0, detail: `${napAmA} ↔ ${napAmB} — Bình hòa` };
}
