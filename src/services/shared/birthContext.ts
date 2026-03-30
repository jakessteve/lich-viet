/**
 * BirthContext — Shared birth data service for all astrological engines.
 *
 * Centralizes birth date/time/place data and computes True Solar Time corrections
 * using the existing astronomyMath.ts getTrueSolarTime() function.
 *
 * Consumed by:
 * - Tử Vi Engine (star placement based on corrected hour branch)
 * - Bát Tự Engine (four pillars with TST-corrected hour)
 * - Chiêm Tinh Engine (natal chart with precise birth time)
 * - ACS Engine (cross-validation synthesis)
 *
 * Supports school-specific reference meridians for multi-school Tử Vi.
 */

import { getTrueSolarTime } from '../../utils/astronomyMath';

// ── Types ──────────────────────────────────────────────────────

/** Birth location data */
export interface BirthLocation {
  /** Latitude in decimal degrees (e.g., 21.03 for Hanoi) */
  readonly latitude: number;
  /** Longitude in decimal degrees (e.g., 105.85 for Hanoi) */
  readonly longitude: number;
  /** IANA timezone string (e.g., 'Asia/Ho_Chi_Minh') or UTC offset in hours */
  readonly timezone: number;
}

/** School-specific reference meridian configuration */
export interface SchoolMeridian {
  readonly school: string;
  readonly label: string;
  readonly referenceMeridian: number; // degrees East
  readonly referenceCity: string;
}

/** Result of BirthContext computation */
export interface BirthContext {
  /** Original clock time (user input) */
  readonly clockTime: Date;
  /** True Solar Time after correction */
  readonly trueSolarTime: Date;
  /** Corrected hour (0-23) from TST */
  readonly correctedHour: number;
  /** Earthly Branch index for the corrected hour (0=Tý, 11=Hợi) */
  readonly earthlyBranchIndex: number;
  /** Earthly Branch name */
  readonly earthlyBranch: string;
  /** Time index for Tử Vi (0-12, where 0=Tý early, 12=Tý late) */
  readonly timeIndex: number;
  /** Whether the TST correction shifted the hour branch */
  readonly branchShifted: boolean;
  /** Original branch before correction (for explanation modal) */
  readonly originalBranch: string;
  /** Total correction in minutes */
  readonly correctionMinutes: number;
  /** Birth location used */
  readonly location: BirthLocation;
}

// ── Constants ──────────────────────────────────────────────────

/** Default birth location: Hanoi, Vietnam */
export const DEFAULT_LOCATION: BirthLocation = {
  latitude: 21.0285,
  longitude: 105.8542,
  timezone: 7, // UTC+7
};

/** Earthly Branches in Vietnamese order */
const CHI_NAMES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'] as const;

/** School-specific reference meridians for multi-school Tử Vi */
export const SCHOOL_MERIDIANS: readonly SchoolMeridian[] = [
  { school: 'vi', label: 'Việt Nam (Tam Hợp)', referenceMeridian: -1, referenceCity: 'Nơi sinh (giờ thật)' }, // -1 = use birth longitude
  { school: 'cn', label: 'Trung Quốc (Toàn Thư)', referenceMeridian: 120, referenceCity: 'Múi giờ UTC+8 (Bắc Kinh)' }, // China standard time
  { school: 'tw', label: 'Đài Loan', referenceMeridian: 121.56, referenceCity: 'Đài Bắc' },
  { school: 'northern', label: 'Bắc Phái (Phi Tinh)', referenceMeridian: 116.40, referenceCity: 'Bắc Kinh' },
  { school: 'trungchau', label: 'Trung Châu (Vương Đ.C.)', referenceMeridian: 112.45, referenceCity: 'Lạc Dương' },
] as const;

// ── Core Functions ─────────────────────────────────────────────

/**
 * Converts a solar hour (0-23) to the Earthly Branch index (0=Tý, 11=Hợi).
 *
 * Vietnamese Chi hours:
 * Tý = 23:00–01:00 (index 0)
 * Sửu = 01:00–03:00 (index 1)
 * ...
 * Hợi = 21:00–23:00 (index 11)
 */
export function hourToEarthlyBranchIndex(hour: number): number {
  // Tý starts at 23, so shift by +1 then divide by 2
  return Math.floor(((hour + 1) % 24) / 2);
}

/**
 * Converts Earthly Branch index (0-11) to Tử Vi timeIndex (0-12).
 *
 * In Tử Vi, timeIndex maps:
 * 0 = Tý (23:00-01:00)
 * 1 = Sửu (01:00-03:00)
 * ...
 * 11 = Hợi (21:00-23:00)
 * 12 = Tý late (used by some schools for 00:00-01:00 distinction)
 */
export function branchIndexToTimeIndex(branchIndex: number, hour: number): number {
  // Standard mapping: branchIndex directly maps to timeIndex
  // Special case: if hour is 23-24, branchIndex is 0 (Tý), but we use timeIndex 0
  // If hour is 0-1, branchIndex is also 0 (Tý), but some schools use 12
  if (branchIndex === 0 && hour >= 0 && hour < 1) {
    return 12; // Late Tý (after midnight)
  }
  return branchIndex;
}

/**
 * Computes a complete BirthContext from birth data.
 *
 * @param birthDate - The birth date/time in local civil time
 * @param location - Birth location (lat/lon/timezone). Defaults to Hanoi.
 * @param schoolMeridian - Optional school-specific reference meridian override.
 *   If provided, TST is calculated relative to this meridian instead of the timezone standard.
 *   Use -1 (default for 'vi' school) to use birthplace longitude for local true solar time.
 * @returns Complete BirthContext with corrected time data.
 */
export function computeBirthContext(
  birthDate: Date,
  location: BirthLocation = DEFAULT_LOCATION,
  schoolMeridian?: number,
): BirthContext {
  // Original hour and branch
  const clockHour = birthDate.getHours();
  const originalBranchIndex = hourToEarthlyBranchIndex(clockHour);
  const originalBranch = CHI_NAMES[originalBranchIndex];

  // Determine the reference meridian for TST calculation
  // schoolMeridian = -1 means "use birth longitude" (Vietnamese school: local true solar time)
  // schoolMeridian = undefined means "use timezone standard meridian" (default)
  const effectiveLongitude = (schoolMeridian !== undefined && schoolMeridian !== -1)
    ? schoolMeridian
    : location.longitude;

  // Compute True Solar Time using existing astronomyMath function
  const timezoneOffsetMinutes = -location.timezone * 60; // Convert UTC+ hours to minutes offset
  const trueSolarTime = getTrueSolarTime(birthDate, effectiveLongitude, timezoneOffsetMinutes);

  // Corrected time values
  const correctedHour = trueSolarTime.getHours();
  const correctedBranchIndex = hourToEarthlyBranchIndex(correctedHour);
  const correctedBranch = CHI_NAMES[correctedBranchIndex];
  const branchShifted = correctedBranchIndex !== originalBranchIndex;

  // Correction amount
  const correctionMinutes = (trueSolarTime.getTime() - birthDate.getTime()) / 60000;

  // Tử Vi time index
  const timeIndex = branchIndexToTimeIndex(correctedBranchIndex, correctedHour);

  return {
    clockTime: birthDate,
    trueSolarTime,
    correctedHour,
    earthlyBranchIndex: correctedBranchIndex,
    earthlyBranch: correctedBranch,
    timeIndex,
    branchShifted,
    originalBranch,
    correctionMinutes: Math.round(correctionMinutes * 10) / 10,
    location,
  };
}

/**
 * Computes BirthContext for a specific school's reference meridian.
 *
 * @param birthDate - Birth date/time
 * @param location - Birth location
 * @param school - School identifier (vi, cn, tw, northern, trungchau)
 * @returns BirthContext with school-specific TST correction
 */
export function computeSchoolBirthContext(
  birthDate: Date,
  location: BirthLocation,
  school: string,
): BirthContext {
  const meridianConfig = SCHOOL_MERIDIANS.find(m => m.school === school);
  if (!meridianConfig) {
    throw new Error(`Unknown school: ${school}. Valid: ${SCHOOL_MERIDIANS.map(m => m.school).join(', ')}`);
  }

  const meridian = meridianConfig.referenceMeridian;
  return computeBirthContext(birthDate, location, meridian);
}

/**
 * Formats a human-readable explanation of the TST correction.
 * Used for the hour-shift explanation modal.
 *
 * Example: "Giờ đồng hồ: Tý (00:30) → Giờ thật: Hợi (23:47) — Chênh lệch: -43 phút"
 */
export function formatTSTExplanation(ctx: BirthContext): string {
  const clockStr = ctx.clockTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const tstStr = ctx.trueSolarTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const sign = ctx.correctionMinutes >= 0 ? '+' : '';

  if (!ctx.branchShifted) {
    return `Giờ đồng hồ: ${ctx.originalBranch} (${clockStr}) — Giờ thật: ${ctx.earthlyBranch} (${tstStr}) — Chênh lệch: ${sign}${ctx.correctionMinutes} phút (không đổi chi)`;
  }

  return `⚠️ Giờ đồng hồ: ${ctx.originalBranch} (${clockStr}) → Giờ thật: ${ctx.earthlyBranch} (${tstStr}) — Chênh lệch: ${sign}${ctx.correctionMinutes} phút`;
}
