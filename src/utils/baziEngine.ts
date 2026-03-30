/**
 * Bazi Engine — Bát Tự / Tứ Trụ (Four Pillars of Destiny)
 *
 * Unified multi-school algorithm combining:
 * - Tử Bình (子平) — Day Master analysis
 * - Mệnh Lý (命理) — Element interaction patterns
 * - Cách Cục (格局) — Pattern classification
 * - Điều Hậu (调候) — Seasonal climate adjustment
 *
 * Composes over calendarEngine (Can-Chi) and hourEngine (Hour Pillar).
 *
 * Architecture: Thin orchestrator that delegates to specialized modules:
 * - types/bazi.ts — Type definitions
 * - utils/baziConstants.ts — Shared lookup tables
 * - utils/baziStars.ts — Star derivation, analysis, interactions
 */

import { getCanChiYear, getCanChiMonth, getCanChiDay, parseCanChi } from './calendarEngine';
import { getHourCanChi } from './hourEngine';
import { getSolarMonth, getJDN } from './foundationalLayer';
import { getTrueSolarTime } from './astronomyMath';
import type { Can, Chi } from '../types/calendar';
import baziInterpretation from '../data/baziInterpretation.json';

// Re-export types for backward compatibility
export type {
  NguHanh, DayMasterStrength, CachCuc, Pillar, DayMasterAnalysis,
  ThanSat, LuckCycle, DieuHau, ThapThanEntry, TangCanEntry,
  BranchInteractionType, BranchInteraction, TruongSinhEntry, BaziChart, BaziSchool, BaziInput,
} from '../types/bazi';

import type { NguHanh, Pillar, BaziChart, LuckCycle, BaziSchool } from '../types/bazi';
import { getBaziSchoolStrategy } from '../services/bazi/baziSchoolStrategy';

// Import from split modules
import {
  CAN_LIST, CHI_LIST, CAN_ELEMENT, CHI_ELEMENT,
  NAP_AM_TABLE, MONTH_SEASON,
} from './baziConstants';

import {
  deriveThapThan, buildThapThan, buildTangCan,
  detectBranchInteractions, deriveThanSat,
  analyzeDayMaster, classifyCachCuc, assessDieuHau,
  calculateTruongSinh,
} from './baziStars';

// ── Helper Functions ──────────────────────────────────────────

function getNapAm(can: Can, chi: Chi): { name: string; element: NguHanh } {
  const key = `${can} ${chi}`;
  return NAP_AM_TABLE[key] || { name: 'Không rõ', element: 'Thổ' };
}

function buildPillar(label: string, labelVi: string, canChiStr: string): Pillar {
  const cc = parseCanChi(canChiStr);
  const napAm = getNapAm(cc.can, cc.chi);
  return {
    label,
    labelVi,
    can: cc.can,
    chi: cc.chi,
    canElement: CAN_ELEMENT[cc.can],
    chiElement: CHI_ELEMENT[cc.chi],
    napAm: napAm.name,
    napAmElement: napAm.element,
  };
}

function countElements(pillars: Pillar[]): Record<NguHanh, number> {
  const count: Record<NguHanh, number> = { 'Kim': 0, 'Mộc': 0, 'Thủy': 0, 'Hỏa': 0, 'Thổ': 0 };
  for (const p of pillars) {
    count[p.canElement]++;
    count[p.chiElement]++;
  }
  return count;
}

// ── True Solar Time Adjustment ────────────────────────────────

/**
 * Adjusts clock time to true solar time based on longitude and the Equation of Time.
 * Academic standard for Bazi: birth hour must be in true local solar time.
 */
export function adjustForTrueSolarTime(date: Date, hour: number, longitude: number): number {
  // Merge hour into a temporary Date representing local time
  const tempDate = new Date(date);
  tempDate.setHours(Math.floor(hour), (hour % 1) * 60, 0, 0);
  
  // Get the precise true solar time
  const trueDate = getTrueSolarTime(tempDate, longitude);
  
  // Return absolute float hours for boundary checking (e.g., 23.5)
  // Clamp to [0, 24) range — true solar time can shift past midnight
  const rawHours = trueDate.getHours() + trueDate.getMinutes() / 60 + trueDate.getSeconds() / 3600;
  return ((rawHours % 24) + 24) % 24;
}

// ── Luck Cycles ──────────────────────────────────────────────

function calculateLuckCycles(
  yearPillar: Pillar,
  monthPillar: Pillar,
  dayMaster: { dayMaster: Can; favorableElements: NguHanh[]; unfavorableElements: NguHanh[] },
  isMale: boolean,
  daiVanStartAge: number,
): LuckCycle[] {
  const cycles: LuckCycle[] = [];
  const yearCanIdx = CAN_LIST.indexOf(yearPillar.can);
  const monthCanIdx = CAN_LIST.indexOf(monthPillar.can);
  const monthChiIdx = CHI_LIST.indexOf(monthPillar.chi);

  const isYangYear = yearCanIdx % 2 === 0;
  const forward = (isMale && isYangYear) || (!isMale && !isYangYear);

  for (let i = 1; i <= 8; i++) {
    const canIdx = forward
      ? (monthCanIdx + i) % 10
      : ((monthCanIdx - i) % 10 + 10) % 10;
    const chiIdx = forward
      ? (monthChiIdx + i) % 12
      : ((monthChiIdx - i) % 12 + 12) % 12;

    const can = CAN_LIST[canIdx];
    const chi = CHI_LIST[chiIdx];
    const napAm = getNapAm(can, chi);
    const element = CAN_ELEMENT[can];

    let rating: LuckCycle['rating'] = 'trung';
    if (dayMaster.favorableElements.includes(element)) rating = 'cat';
    else if (dayMaster.unfavorableElements.includes(element)) rating = 'hung';

    const thapThan = deriveThapThan(dayMaster.dayMaster, can);

    const normalizeKey = (key: string) => key.replace('Tỉ', 'Tỷ');
    const interpretData = (baziInterpretation.thapThanLuckInterpretation as Record<string, { overall: string; career: string; finance: string; relationship: string }>)[normalizeKey(thapThan)]
      || (baziInterpretation.thapThanLuckInterpretation as Record<string, { overall: string; career: string; finance: string; relationship: string }>)[thapThan];

    const descriptions: Record<string, string> = {
      'cat': `Vận ${can} ${chi} (${napAm.name}) — ${thapThan}: thuận lợi, phát triển tốt.`,
      'hung': `Vận ${can} ${chi} (${napAm.name}) — ${thapThan}: cần cẩn trọng, nhiều thử thách.`,
      'trung': `Vận ${can} ${chi} (${napAm.name}) — ${thapThan}: bình ổn, giữ vững nền tảng.`,
    };

    cycles.push({
      startAge: daiVanStartAge + (i - 1) * 10,
      endAge: daiVanStartAge + (i * 10) - 1,
      can,
      chi,
      element,
      napAm: napAm.name,
      rating,
      description: descriptions[rating],
      thapThan,
      interpretation: interpretData || undefined,
    });
  }

  return cycles;
}

// ── Không Vong (Empty Branches) ──────────────────────────────

function calculateKhongVong(dayCan: Can, dayChi: Chi): { branch1: Chi; branch2: Chi; explanation: string } {
  const canIdx = CAN_LIST.indexOf(dayCan);
  const chiIdx = CHI_LIST.indexOf(dayChi);

  const emptyIdx1 = (chiIdx + (10 - canIdx) + 12) % 12;
  const emptyIdx2 = (chiIdx + (11 - canIdx) + 12) % 12;

  const branch1 = CHI_LIST[emptyIdx1];
  const branch2 = CHI_LIST[emptyIdx2];

  return {
    branch1,
    branch2,
    explanation: `Tuần ${dayCan}${dayChi}: Không Vong tại ${branch1} và ${branch2}. Các cung/trụ chứa 2 chi này bị giảm lực.`,
  };
}

// ── Precise Đại Vận Start Age ────────────────────────────────

function calculateDaiVanStartAge(
  birthDate: Date,
  isMale: boolean,
  yearCanIdx: number,
  method: 'flat' | 'fractional'
): number {
  const isYangYear = yearCanIdx % 2 === 0;
  const forward = (isYangYear && isMale) || (!isYangYear && !isMale);

  const searchDate = new Date(birthDate);
  searchDate.setHours(12, 0, 0, 0);
  const birthJd = getJDN(searchDate.getDate(), searchDate.getMonth() + 1, searchDate.getFullYear());
  const birthTerm = getSolarMonth(birthJd);

  let dayCount = 0;
  const direction = forward ? 1 : -1;

  for (let i = 1; i <= 90; i++) {
    const checkDate = new Date(searchDate);
    checkDate.setDate(checkDate.getDate() + i * direction);
    const checkJd = getJDN(checkDate.getDate(), checkDate.getMonth() + 1, checkDate.getFullYear());
    const checkTerm = getSolarMonth(checkJd);
    if (checkTerm !== birthTerm) {
      dayCount = i;
      break;
    }
  }

  // Fractional calculates precise fractional age, flat rounds to nearest integer
  if (method === 'fractional') {
    return Math.max(0.1, parseFloat((dayCount / 3).toFixed(2)));
  }
  return Math.max(1, Math.round(dayCount / 3));
}

// ── Main Public API ──────────────────────────────────────────

/**
 * Generate a full Bazi (Four Pillars) chart.
 *
 * @param birthDate Birth date
 * @param birthHour Birth hour (0-23)
 * @param isMale Gender for luck cycle direction (default: true)
 * @param longitude Optional: birth location longitude for true solar time (defaults to 105 for Vietnam)
 */
export function generateBaziChart(birthDate: Date, birthHour: number, isMale = true, longitude = 105, enableTST = true, schoolId: BaziSchool = 'vi'): BaziChart {
  const strategy = getBaziSchoolStrategy(schoolId);

  // P1.2: Adjust birth hour for true solar time if enabled
  const adjustedHour = enableTST ? adjustForTrueSolarTime(birthDate, birthHour, longitude) : birthHour;

  // P1.1: Use solar term (Tiết Khí) boundary for month pillar, integrating float hour resolution
  const jdInt = getJDN(birthDate.getDate(), birthDate.getMonth() + 1, birthDate.getFullYear());
  
  // Standard JDN calculation usually aligns with 12:00 UT. 
  // We incorporate the fraction of the day based on the UTC hour to determine the exact solar term crossing.
  const utcHours = birthDate.getUTCHours() + birthDate.getUTCMinutes() / 60;
  const exactJd = jdInt - 0.5 + (utcHours / 24);
  
  const solarMonth = getSolarMonth(exactJd);

  // Bazi Year Adjustment: Bazi year changes at Lập Xuân (solarMonth 1), not Tet.
  // If the solarMonth is 11 (Tý) or 12 (Sửu) but it's already January or February,
  // it means we are still in the previous Bazi year.
  let baziYear = birthDate.getFullYear();
  if (solarMonth >= 11 && birthDate.getMonth() < 2) {
    baziYear -= 1;
  }

  // Build four pillars using existing calendarEngine functions
  const yearCanChi = getCanChiYear(baziYear);
  const monthCanChi = getCanChiMonth(solarMonth, baziYear);
  let dayCanChi = getCanChiDay(birthDate);
  let dayCc = parseCanChi(dayCanChi);
  
  // Hour pillar: determine hour branch from adjusted birth hour
  const hourBranchIdx = Math.floor(((adjustedHour + 1) % 24) / 2);
  const hourChi = CHI_LIST[hourBranchIdx];

  if (adjustedHour >= 23 && strategy.ratHourRule === 'next_day') {
      const tmr = new Date(birthDate);
      tmr.setDate(tmr.getDate() + 1);
      dayCanChi = getCanChiDay(tmr);
      dayCc = parseCanChi(dayCanChi);
  }

  // Dạ Tý Rule (Late Rat) if strategy splits the Rat hour
  let hourDayCan = dayCc.can;
  if (adjustedHour >= 23 && strategy.ratHourRule === 'split') {
      const nextDayIdx = (CAN_LIST.indexOf(dayCc.can) + 1) % 10;
      hourDayCan = CAN_LIST[nextDayIdx];
  }
  
  const hourCanChi = getHourCanChi(hourDayCan, hourChi);
  const hourStr = `${hourCanChi.can} ${hourCanChi.chi}`;

  const yearPillar = buildPillar('Year', 'Trụ Năm', yearCanChi);
  const monthPillar = buildPillar('Month', 'Trụ Tháng', monthCanChi);
  const dayPillar = buildPillar('Day', 'Trụ Ngày', dayCanChi);
  const hourPillar = buildPillar('Hour', 'Trụ Giờ', hourStr);

  const pillars = [yearPillar, monthPillar, dayPillar, hourPillar];
  const elementCount = countElements(pillars);

  // Delegate to analysis modules
  const season = MONTH_SEASON[solarMonth] || 'Xuân';
  const dayMaster = analyzeDayMaster(dayPillar, elementCount, season, pillars);
  const cachCuc = classifyCachCuc(dayMaster, elementCount);
  const dieuHau = assessDieuHau(dayMaster.dayMasterElement, solarMonth);
  const thanSat = deriveThanSat(yearPillar.chi, dayPillar.chi, dayPillar.can);
  const thapThan = buildThapThan(dayPillar.can, pillars);
  const tangCan = buildTangCan(pillars);
  const branchInteractions = detectBranchInteractions(pillars);
  const khongVong = calculateKhongVong(dayPillar.can, dayPillar.chi);

  const yearCanIdx = CAN_LIST.indexOf(yearPillar.can);
  const daiVanStartAge = calculateDaiVanStartAge(birthDate, isMale, yearCanIdx, strategy.daiVanMethod);
  const luckCycles = calculateLuckCycles(yearPillar, monthPillar, dayMaster, isMale, daiVanStartAge);

  const dayCanIdx = CAN_LIST.indexOf(dayPillar.can);
  const truongSinh = calculateTruongSinh(pillars, dayMaster.dayMasterElement, dayCanIdx);

  return {
    birthDate,
    birthHour,
    school: schoolId,
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    dayMaster,
    cachCuc,
    dieuHau,
    elementCount,
    thanSat,
    luckCycles,
    thapThan,
    tangCan,
    branchInteractions,
    khongVong,
    daiVanStartAge,
    truongSinh,
  };
}
