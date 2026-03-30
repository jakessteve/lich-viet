/**
 * Vietnamese Lunar Calendar Engine — Orchestrator
 * Re-exports all public APIs from the decomposed sub-modules.
 */

import {
  getLunarDate as getVnLunarDate,
  getDayCanChi
} from '../packages/vn-lunar';
import { DayCellData, DayQuality, DayDetailsData, CanChi, HourInfo, Can, Chi } from '../types/calendar';

// Sub-module imports
import { getJDN, getSolarTerm, calculateFoundationalLayer, findSolarTermStart } from './foundationalLayer';
import { calculateModifyingLayer } from './modifyingLayer';
import { generateDungSu } from './dungSuEngine';
import { getHourCanChi, getAllHours as _getAllHours, getAuspiciousHours as _getAuspiciousHours, getInauspiciousHours as _getInauspiciousHours } from './hourEngine';
import { StarData } from '../types/calendar';

// Data imports
import catThanData from '../data/phase_1/cat_than.json';
import hungThanData from '../data/phase_1/hung_than.json';
import banhToData from '../data/phase_1/banh_to_bach_ky.json';
import { getNapAmIndex, checkNapAmCompatibility, getNapAmExceptionComment } from './canchiHelper';
import { getYearlyStars } from './yearlyEngine';
import { getExtraStars } from './extraStars';
import {
  CAN,
  CHI,
  NGU_HANH_MAPPING,
  NAP_AM_MAPPING,
  LUC_HOP,
  TAM_HOP,
  CHI_XUNG,
  CHI_HINH,
  CHI_HAI,
  CHI_PHA,
  CHI_TUYET,
  TAM_HOP_CUC,
  TAM_SAT,
  KHONG_SO_KHAC,
  NGU_HANH_SINH,
  NGU_HANH_KHAC,
  CAN_KHAC_MAP,
  SCORING,
  BUDDHIST_YEAR_OFFSET,
  VESAK_MONTH,
  VESAK_DAY,
  DAY_OF_WEEK_NAMES,
  CALENDAR_GRID_CELLS,
  BACH_SU_HUNG_FALLBACK,
} from './constants';

// ── Re-export sub-module APIs ─────────────────────────────────

export { getHourCanChi } from './hourEngine';
export { getJDN, getSolarTerm, getSunLongitude, getSolarMonth, findSolarTermStart } from './foundationalLayer';

// ── Kị Tuổi Helper ────────────────────────────────────────────

function getKiTuoi(dayCan: Can, dayChi: Chi): string[] {
  const chiKhac = CHI_XUNG[dayChi];
  if (!CAN_KHAC_MAP[dayCan] || !chiKhac) return [];
  return CAN_KHAC_MAP[dayCan].map(c => `${c} ${chiKhac}`);
}

// ── Core Calendar Functions ───────────────────────────────────

export function getLunarDate(date: Date): { day: number; month: number; year: number; isLeap: boolean } {
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yy = date.getFullYear();

  const lunar = getVnLunarDate(dd, mm, yy);
  return {
    day: lunar.day,
    month: lunar.month,
    year: lunar.year,
    isLeap: lunar.leap
  };
}

export function getDayQuality(date: Date): DayQuality {
  const detailed = getDetailedDayData(date);

  if (detailed.nguHanhGrade === 'Chuyên nhật' || detailed.nguHanhGrade === 'Nghĩa nhật' || detailed.nguHanhGrade === 'Bảo nhật') {
    return 'Good';
  }
  if (detailed.nguHanhGrade === 'Phạt nhật') {
    return 'Bad';
  }
  return 'Neutral';
}

function isSameDay(d1: Date, d2: Date): boolean {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

export function getMonthDays(year: number, month: number): DayCellData[] {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const days: DayCellData[] = [];

  let firstDayOfWeek = firstDayOfMonth.getDay();
  firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, prevMonthLastDay - i);
    const day = d.getDate();
    const mon = d.getMonth() + 1;
    const yr = d.getFullYear();
    const lunar = getVnLunarDate(day, mon, yr);
    const jd = getJDN(day, mon, yr);
    days.push({
      solarDate: day,
      lunarDate: lunar.day === 1 ? `${lunar.day}/${lunar.month}` : lunar.day,
      dayQuality: getDayQuality(d),
      fullDate: d,
      isCurrentMonth: false,
      isToday: isSameDay(d, new Date()),
      dayChi: getDayCanChi(jd).split(' ')[1] as Chi
    });
  }

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const d = new Date(year, month, i);
    const day = d.getDate();
    const mon = d.getMonth() + 1;
    const yr = d.getFullYear();
    const lunar = getVnLunarDate(day, mon, yr);
    const jd = getJDN(day, mon, yr);
    days.push({
      solarDate: i,
      lunarDate: lunar.day === 1 ? `${lunar.day}/${lunar.month}` : lunar.day,
      dayQuality: getDayQuality(d),
      fullDate: d,
      isCurrentMonth: true,
      isToday: isSameDay(d, new Date()),
      dayChi: getDayCanChi(jd).split(' ')[1] as Chi
    });
  }

  const remaining = CALENDAR_GRID_CELLS - days.length;
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i);
    const day = d.getDate();
    const mon = d.getMonth() + 1;
    const yr = d.getFullYear();
    const lunar = getVnLunarDate(day, mon, yr);
    const jd = getJDN(day, mon, yr);
    days.push({
      solarDate: i,
      lunarDate: lunar.day === 1 ? `${lunar.day}/${lunar.month}` : lunar.day,
      dayQuality: getDayQuality(d),
      fullDate: d,
      isCurrentMonth: false,
      isToday: isSameDay(d, new Date()),
      dayChi: getDayCanChi(jd).split(' ')[1] as Chi
    });
  }

  return days;
}

// ── Can-Chi Parsing ───────────────────────────────────────────

export function getCanChiYear(lunarYear: number): string {
  const canIndex = (lunarYear + 6) % 10;
  const chiIndex = (lunarYear + 8) % 12;
  return `${CAN[canIndex]} ${CHI[chiIndex]}`;
}

export function getCanChiMonth(lunarMonth: number, lunarYear: number): string {
  const yearCanIndex = (lunarYear + 6) % 10;
  const monthCanIndex = (yearCanIndex * 2 + 2 + (lunarMonth - 1)) % 10;
  const monthChiIndex = (lunarMonth + 1) % 12;
  return `${CAN[monthCanIndex]} ${CHI[monthChiIndex]}`;
}

export function getCanChiDay(date: Date): string {
  const jd = getJDN(date.getDate(), date.getMonth() + 1, date.getFullYear());
  const canIndex = (jd + 9) % 10;
  const chiIndex = (jd + 1) % 12;
  return `${CAN[canIndex]} ${CHI[chiIndex]}`;
}

export function parseCanChi(canChiStr: string): CanChi {
  const parts = canChiStr.split(' ');
  return {
    can: parts[0] as Can,
    chi: parts[1] as Chi
  };
}

// ── Hour Wrappers (preserving public API) ─────────────────────

export function getAllHours(date: Date): HourInfo[] {
  return _getAllHours(date, parseCanChi, getCanChiDay);
}

export function getAuspiciousHours(date: Date): HourInfo[] {
  return _getAuspiciousHours(date, parseCanChi, getCanChiDay);
}

export function getInauspiciousHours(date: Date): HourInfo[] {
  return _getInauspiciousHours(date, parseCanChi, getCanChiDay);
}

// ── Day-of-Week Helper ────────────────────────────────────────

function getDayOfWeekName(date: Date): string {
  return DAY_OF_WEEK_NAMES[date.getDay()];
}

// ── Sub-function: Integrate Extra Stars ───────────────────────

interface ExtraStarIntegrationParams {
  modifyingStars: StarData[];
  extraGoodStars: string[];
  extraBadStars: string[];
  masterCat: StarData[];
  masterHung: StarData[];
}

/**
 * Merges extra star results into the modifying layer's star list.
 * Looks up each extra star name from the master catalogs for metadata.
 */
export function integrateExtraStars(params: ExtraStarIntegrationParams): StarData[] {
  const { modifyingStars, extraGoodStars, extraBadStars, masterCat, masterHung } = params;
  const result = [...modifyingStars];
  const existingNames = new Set(modifyingStars.map(s => s.name));

  extraGoodStars.forEach(sName => {
    if (existingNames.has(sName)) return;
    const master = masterCat.find((m) => m.name === sName);
    result.push({
      name: sName,
      type: 'Good',
      weight: SCORING.DEFAULT_GOOD_STAR_WEIGHT,
      description: master?.description || '',
      suitable: master?.suitable || [],
      unsuitable: master?.unsuitable || []
    });
    existingNames.add(sName);
  });

  extraBadStars.forEach(sName => {
    if (existingNames.has(sName)) return;
    const master = masterHung.find((m) => m.name === sName);
    result.push({
      name: sName,
      type: 'Bad',
      weight: SCORING.DEFAULT_BAD_STAR_WEIGHT,
      description: master?.description || '',
      suitable: master?.suitable || [],
      unsuitable: master?.unsuitable || (sName === 'Cửu Khổ Bát Cùng' ? [BACH_SU_HUNG_FALLBACK] : [])
    });
    existingNames.add(sName);
  });

  return result;
}

// ── Sub-function: Ngũ Hành Interaction ────────────────────────

interface NguHanhResult {
  interactionStr: string;
  nguHanhGrade: string;
  nguHanhScore: number;
  nguHanhInteraction: string;
}

/**
 * Determines the Ngũ Hành interaction between the day's Can and Chi.
 * Returns the grade (Chuyên/Nghĩa/Bảo/Chế/Phạt nhật) and score delta.
 *
 * Traditional hierarchy: 比和(chuyên) > 生我(nghĩa) > 我生(bảo) > 我克(chế) > 克我(phạt)
 */
export function calculateNguHanhInteraction(dayCanChi: CanChi): NguHanhResult {
  const dayCanNguHanh = NGU_HANH_MAPPING[dayCanChi.can as Can];
  const dayChiNguHanh = NGU_HANH_MAPPING[dayCanChi.chi];

  let interactionStr = '';
  let nguHanhGrade = '';
  let nguHanhScore = 0;

  if (dayCanNguHanh === dayChiNguHanh) {
    interactionStr = 'là ngày cát (chuyên nhật)';
    nguHanhGrade = 'Chuyên nhật';
    nguHanhScore = SCORING.NGU_HANH_CHUYEN_NHAT;
  } else if (NGU_HANH_SINH[dayChiNguHanh] === dayCanNguHanh) {
    interactionStr = `tức Chi sinh Can (${dayChiNguHanh}, ${dayCanNguHanh}), là ngày cát (nghĩa nhật)`;
    nguHanhGrade = 'Nghĩa nhật';
    nguHanhScore = SCORING.NGU_HANH_NGHIA_NHAT;
  } else if (NGU_HANH_SINH[dayCanNguHanh] === dayChiNguHanh) {
    interactionStr = `tức Can sinh Chi (${dayCanNguHanh}, ${dayChiNguHanh}), là ngày cát (bảo nhật)`;
    nguHanhGrade = 'Bảo nhật';
    nguHanhScore = SCORING.NGU_HANH_BAO_NHAT;
  } else if (NGU_HANH_KHAC[dayCanNguHanh] === dayChiNguHanh) {
    interactionStr = `tức Can khắc Chi (${dayCanNguHanh}, ${dayChiNguHanh}), là ngày cát trung bình (chế nhật)`;
    nguHanhGrade = 'Chế nhật';
    nguHanhScore = SCORING.NGU_HANH_CHE_NHAT;
  } else if (NGU_HANH_KHAC[dayChiNguHanh] === dayCanNguHanh) {
    interactionStr = `tức Chi khắc Can (${dayChiNguHanh}, ${dayCanNguHanh}), là ngày đại hung (phạt nhật)`;
    nguHanhGrade = 'Phạt nhật';
    nguHanhScore = SCORING.NGU_HANH_PHAT_NHAT;
  }

  const nguHanhInteraction = `Ngày: ${dayCanChi.can} ${dayCanChi.chi}; ${interactionStr}.`;
  return { interactionStr, nguHanhGrade, nguHanhScore, nguHanhInteraction };
}

// ── Sub-function: Final Score & Grade ─────────────────────────

interface FinalScoreResult {
  finalScore: number;
  dayGrade: string;
}

/**
 * Aggregates base score, star weights, Truc/Tu quality, and Ngũ Hành score
 * into a final score and day grade.
 */
export function calculateFinalScore(
  baseScore: number,
  stars: StarData[],
  trucQuality: string,
  tuQuality: string,
  nguHanhScore: number
): FinalScoreResult {
  let finalScore = baseScore;
  stars.forEach((s) => finalScore += (s.weight || 0));

  if (trucQuality === 'Good') finalScore += SCORING.TRUC_TU_QUALITY_DELTA;
  if (trucQuality === 'Bad') finalScore -= SCORING.TRUC_TU_QUALITY_DELTA;
  if (tuQuality === 'Good') finalScore += SCORING.TRUC_TU_QUALITY_DELTA;
  if (tuQuality === 'Bad') finalScore -= SCORING.TRUC_TU_QUALITY_DELTA;

  finalScore += nguHanhScore;

  let dayGrade = 'Trung Bình';
  if (finalScore >= SCORING.DAY_GRADE_GOOD_THRESHOLD) dayGrade = 'Tốt';
  if (finalScore <= SCORING.DAY_GRADE_BAD_THRESHOLD) dayGrade = 'Đại Kỵ';

  return { finalScore, dayGrade };
}

// ── Sub-function: Nạp Âm Interaction Text ─────────────────────

/**
 * Builds the Nạp Âm interaction description string,
 * including kị tuổi and exception comments.
 */
export function buildNapAmInteraction(dayCanChi: CanChi): string {
  const dayCanNguHanh = NGU_HANH_MAPPING[dayCanChi.can as Can];
  const napAmDay = NAP_AM_MAPPING[`${dayCanChi.can} ${dayCanChi.chi}`] || 'Chưa rõ';
  const kiTuoi = getKiTuoi(dayCanChi.can, dayCanChi.chi);

  const dayNaIdxForComment = getNapAmIndex(dayCanChi.can, dayCanChi.chi);
  const napAmExceptionSet = new Set<string>();
  for (let i = 0; i < 30; i++) {
    const comment = getNapAmExceptionComment(dayNaIdxForComment, i);
    if (comment) napAmExceptionSet.add(comment);
  }
  const napAmExceptions = Array.from(napAmExceptionSet);
  const napAmExceptionText = napAmExceptions.length > 0 ? `, ${napAmExceptions.join('; ')}` : '';

  return `Nạp Âm: ${napAmDay} kị tuổi: ${kiTuoi.join(', ')}.\nNgày thuộc hành ${dayCanNguHanh} khắc hành ${KHONG_SO_KHAC[dayCanNguHanh] || ''}${napAmExceptionText}.`;
}

// ── Sub-function: Can Chi Xung/Hợp Text ──────────────────────

/**
 * Builds the Can Chi relationship summary: Lục Hợp, Tam Hợp, Xung, Hình, Hại, Phá, Tuyệt, Tam Sát.
 */
export function buildCanChiXungHop(dayChi: Chi): string {
  const tamHopCuc = TAM_HOP_CUC[dayChi] ? ` thành ${TAM_HOP_CUC[dayChi]} cục` : '';
  const tamSatText = TAM_SAT[dayChi] ? ` Tam Sát kị mệnh tuổi ${TAM_SAT[dayChi]}.` : '';
  return `Ngày ${dayChi} lục hợp ${LUC_HOP[dayChi]}, tam hợp ${TAM_HOP[dayChi]}${tamHopCuc}; xung ${CHI_XUNG[dayChi]}, hình ${CHI_HINH[dayChi]}, hại ${CHI_HAI[dayChi]}, phá ${CHI_PHA[dayChi]}, tuyệt ${CHI_TUYET[dayChi]}.${tamSatText}`;
}

// ── Sub-function: Collect Star Lists ──────────────────────────

interface StarLists {
  goodStars: string[];
  badStars: string[];
}

/**
 * Collects and deduplicates good/bad star name lists from
 * foundational thanSat, modifying stars, and Truc/Tu quality.
 */
export function collectStarLists(
  thanSat: StarData[],
  modifyingStars: StarData[],
  trucDetail: { name: string; quality: string },
  tuDetail: { name: string; quality: string }
): StarLists {
  const goodList = [
    ...thanSat
      .filter((s) => s.type === 'Good' && !s.criteria?.day_hour_chi)
      .map((s) => s.name),
    ...modifyingStars.filter((s) => s.type === 'Good').map((s) => s.name),
    ...(trucDetail.quality === 'Good' ? [`Trực ${trucDetail.name}`] : []),
    ...(tuDetail.quality === 'Good' ? [`Sao ${tuDetail.name}`] : [])
  ];

  const badList = [
    ...thanSat
      .filter((s) => s.type === 'Bad' && !s.criteria?.day_hour_chi)
      .map((s) => s.name),
    ...modifyingStars.filter((s) => s.type === 'Bad').map((s) => s.name),
    ...(trucDetail.quality === 'Bad' ? [`Trực ${trucDetail.name}`] : []),
    ...(tuDetail.quality === 'Bad' ? [`Sao ${tuDetail.name}`] : [])
  ];

  return {
    goodStars: Array.from(new Set(goodList)).sort(),
    badStars: Array.from(new Set(badList)).sort()
  };
}

// ── Main Orchestrator ─────────────────────────────────────────

export function getDetailedDayData(date: Date): DayDetailsData {
  // 1. Parse core identifiers
  const lunar = getLunarDate(date);
  const yearCanChi = parseCanChi(getCanChiYear(date.getFullYear()));
  const monthCanChi = parseCanChi(getCanChiMonth(lunar.month, lunar.year));
  const dayCanChi = parseCanChi(getCanChiDay(date));

  // 2. Foundational Layer
  const foundational = calculateFoundationalLayer(date, lunar, dayCanChi, getCanChiMonth, getCanChiYear);

  // 3. Moon Phase (Tháng đủ/thiếu)
  const tempDate = new Date(date);
  tempDate.setDate(tempDate.getDate() + (30 - lunar.day));
  const tempLunar = getVnLunarDate(tempDate.getDate(), tempDate.getMonth() + 1, tempDate.getFullYear());
  const isDu = tempLunar.day === 30;
  const thangAmThieuDu = `Tháng ${lunar.month} ${isDu ? 'đủ' : 'thiếu'} kiên ${monthCanChi.can} ${monthCanChi.chi}`;

  // 4. Modifying Layer + Extra Stars integration
  const modifying = calculateModifyingLayer(date, lunar, dayCanChi, foundational.solarMonth);
  const extra = getExtraStars(lunar.month, lunar.day, dayCanChi.can, dayCanChi.chi, modifying.trucDetail.name, isDu, yearCanChi.can);
  const masterCat = ((catThanData as unknown) as { stars: StarData[] }).stars || [];
  const masterHung = ((hungThanData as unknown) as { stars: StarData[] }).stars || [];
  modifying.stars = integrateExtraStars({
    modifyingStars: modifying.stars,
    extraGoodStars: extra.goodStars,
    extraBadStars: extra.badStars,
    masterCat,
    masterHung
  });

  // 5. Dụng Sự
  const dayCanNguHanh = NGU_HANH_MAPPING[dayCanChi.can as Can];
  const dungSu = generateDungSu(modifying, dayCanNguHanh);

  // 6. Ngũ Hành Interaction
  const nguHanh = calculateNguHanhInteraction(dayCanChi);

  // 7. Final Score & Grade
  const { finalScore, dayGrade } = calculateFinalScore(
    foundational.baseScore,
    modifying.stars,
    modifying.trucDetail.quality,
    modifying.tuDetail.quality,
    nguHanh.nguHanhScore
  );

  // 8. Formatting helpers
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const solarDateStr = `${yyyy}-${mm}-${dd}`;

  const jd = getJDN(date.getDate(), date.getMonth() + 1, date.getFullYear());

  // 9. Buddhist year
  let buddhistYear = date.getFullYear() + BUDDHIST_YEAR_OFFSET;
  if (lunar.month < VESAK_MONTH || (lunar.month === VESAK_MONTH && lunar.day < VESAK_DAY)) {
    buddhistYear -= 1;
  }

  // 10. Tiết Khí detail
  const currentStart = findSolarTermStart(date);
  const prevTempDate = new Date(currentStart.date);
  prevTempDate.setDate(prevTempDate.getDate() - 1);
  const prevStart = findSolarTermStart(prevTempDate);
  const tietKhiDetail = `Tiết ${prevStart.term} khởi ngày ${prevStart.date.getDate()}/${prevStart.date.getMonth() + 1}/${prevStart.date.getFullYear()}; Tiết khí ${currentStart.term} khởi ngày ${currentStart.date.getDate()}/${currentStart.date.getMonth() + 1}/${currentStart.date.getFullYear()}`;

  // 11. Nạp Âm & Can Chi interaction texts
  const napAmInteraction = buildNapAmInteraction(dayCanChi);
  const canChiXungHop = buildCanChiXungHop(dayCanChi.chi);

  // 12. Star lists
  const starLists = collectStarLists(foundational.thanSat, modifying.stars, modifying.trucDetail, modifying.tuDetail);

  // 13. Assemble result
  return {
    solarDate: solarDateStr,
    dayOfWeek: getDayOfWeekName(date),
    lunarDate: {
      day: lunar.day,
      month: lunar.month,
      year: lunar.year,
      isLeapMonth: lunar.isLeap
    },
    buddhistYear,
    canChi: {
      year: yearCanChi,
      month: monthCanChi,
      day: dayCanChi
    },
    startHour: getHourCanChi(dayCanChi.can, 'Tý'),
    solarTerm: getSolarTerm(jd),
    fiveElements: {
      napAm: NAP_AM_MAPPING[`${dayCanChi.can} ${dayCanChi.chi}`] || '',
      napAmMonth: NAP_AM_MAPPING[`${monthCanChi.can} ${monthCanChi.chi}`] || '',
      napAmYear: NAP_AM_MAPPING[`${yearCanChi.can} ${yearCanChi.chi}`] || '',
      nguHanh: dayCanNguHanh
    },
    truc: `${modifying.trucDetail.name} (${modifying.trucDetail.description})`,
    tu: `${modifying.tuDetail.name} (${modifying.tuDetail.description})`,
    year: `${yearCanChi.can} ${yearCanChi.chi} (${NAP_AM_MAPPING[`${yearCanChi.can} ${yearCanChi.chi}`] || ''})`,
    allHours: getAllHours(date),
    auspiciousHours: getAuspiciousHours(date),
    inauspiciousHours: getInauspiciousHours(date),
    goodStars: starLists.goodStars,
    badStars: starLists.badStars,
    dayGrade,
    deityStatus: foundational.isAuspiciousDay ? "Ngày Hoàng Đạo" : "Ngày Hắc Đạo",
    nguHanhGrade: nguHanh.nguHanhGrade || undefined,
    dayScore: finalScore,
    fengShuiDirections: foundational.auspiciousDirections,
    canChiInteractions: [],
    nguHanhInteraction: nguHanh.nguHanhInteraction,
    napAmInteraction,
    canChiXungHop,
    tietKhiDetail,
    thangAmThieuDu,
    advancedIndicators: [],
    foundationalLayer: {
      baseScore: foundational.baseScore,
      thanSat: foundational.thanSat,
      auspiciousDirections: foundational.auspiciousDirections
    },
    modifyingLayer: modifying,
    dungSu,
    banhTo: {
      can: (banhToData.can as Record<string, string>)[dayCanChi.can] || '',
      chi: (banhToData.chi as Record<string, string>)[dayCanChi.chi] || ''
    },
    yearlyStars: getYearlyStars(yearCanChi.chi, lunar.year),
    napAmCompatibility: (() => {
      const dayNaIdx = getNapAmIndex(dayCanChi.can, dayCanChi.chi);
      const yearNaIdx = getNapAmIndex(yearCanChi.can, yearCanChi.chi);
      const comp = checkNapAmCompatibility(dayNaIdx, yearNaIdx);
      if (comp === 1) return `Hợp với ngũ hành của năm (${NAP_AM_MAPPING[`${yearCanChi.can} ${yearCanChi.chi}`]})`;
      if (comp === -1) return `Khắc với ngũ hành của năm (${NAP_AM_MAPPING[`${yearCanChi.can} ${yearCanChi.chi}`]})`;
      return 'Bình hòa với ngũ hành của năm';
    })(),
  };
}
