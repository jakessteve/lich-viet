/**
 * Shared Core — Phase 1 ↔ Phase 3 Integration Bridge
 *
 * Re-exports Phase 1 calendar engine functions that Phase 3 (Tử Vi)
 * needs for cross-validation, Nạp Âm annotation, Solar Term context,
 * and Hoàng Đạo hour classification.
 *
 * This module exists to:
 *   1. Eliminate duplicate lunar converters (Phase 1 vs iztro)
 *   2. Surface Phase 1's rich data (Nạp Âm, Tiết Khí, Hoàng Đạo) to Phase 3
 *   3. Prepare the integration contract for Phase 4
 */

import { getLunarDate } from '@lich-viet/core/calendar';
import { NAP_AM_MAPPING, HOANG_DAO_MAPPING } from '@lich-viet/core';
import { getJDN, getSolarTerm } from '@lich-viet/core/calendar';
import type { Chi } from '../types/calendar';

// ── Re-exports ────────────────────────────────────────────────
export { getLunarDate } from '@lich-viet/core/calendar';
export { getCanChiYear, getCanChiDay, parseCanChi } from '@lich-viet/core/calendar';
export { getNapAmIndex, NAP_AM_5_HANH } from '@lich-viet/core/calendar';
export { NAP_AM_MAPPING } from '@lich-viet/core';
export { getJDN, getSolarTerm, findSolarTermStart } from '@lich-viet/core/calendar';
export { getHourCanChiFromEngine as getHourCanChi } from '@lich-viet/core/calendar';
export { HOANG_DAO_MAPPING, CHI } from '@lich-viet/core';

// ═══════════════════════════════════════════════════════════════════
// Cross-Validation: Phase 1 (vn-lunar) vs Phase 3 (iztro)
// ═══════════════════════════════════════════════════════════════════

/**
 * Cross-validate Phase 1 lunar date against iztro's lunarDate string.
 *
 * iztro returns lunarDate in format e.g. "21 tháng 12" (day tháng month).
 * Phase 1 returns { day, month, year, isLeap }.
 *
 * @param solarDateStr - Solar date in "YYYY-M-D" format (as iztro outputs)
 * @param iztroLunarDateStr - Lunar date string from iztro (vi-VN locale)
 * @returns null if consistent, or a warning string if they disagree.
 */
export function crossValidateLunarDate(
    solarDateStr: string,
    iztroLunarDateStr: string,
): string | null {
    const parts = solarDateStr.split('-').map(Number);
    if (parts.length < 3 || parts.some(isNaN)) {
        return `[SharedCore] Cannot parse solarDate: "${solarDateStr}"`;
    }
    const [year, month, day] = parts;
    const solarDate = new Date(year, month - 1, day);

    const phase1 = getLunarDate(solarDate);

    // iztro vi-VN locale: "DD tháng MM"
    const iztroMatch = iztroLunarDateStr.match(/(\d+)\s*tháng\s*(\d+)/i);
    if (!iztroMatch) {
        return null; // Can't parse iztro format — not an error
    }

    const iztroDay = parseInt(iztroMatch[1], 10);
    const iztroMonth = parseInt(iztroMatch[2], 10);

    if (phase1.day !== iztroDay || phase1.month !== iztroMonth) {
        return (
            `[SharedCore] Lunar date MISMATCH for ${solarDateStr}: ` +
            `Phase1 = ${phase1.day}/${phase1.month} (year ${phase1.year}, leap=${phase1.isLeap}), ` +
            `iztro = ${iztroDay}/${iztroMonth}. ` +
            `Check UTC+7 boundary or leap month handling.`
        );
    }

    return null;
}

// ═══════════════════════════════════════════════════════════════════
// Birth-Hour Hoàng Đạo Classification
// ═══════════════════════════════════════════════════════════════════

/**
 * Classify birth hour as Hoàng Đạo (auspicious) or Hắc Đạo (inauspicious)
 * using Phase 1's HOANG_DAO_MAPPING table.
 *
 * @param dayChi - Earthly Branch of the birth day
 * @param hourChi - Earthly Branch of the birth hour
 * @returns Classification string for display
 */
export function classifyBirthHour(
    dayChi: string,
    hourChi: string,
): string {
    const auspiciousHours = HOANG_DAO_MAPPING[dayChi as Chi];
    if (!auspiciousHours) return '';

    const isHoangDao = auspiciousHours.includes(hourChi as Chi);
    return isHoangDao ? 'Giờ Hoàng Đạo' : 'Giờ Hắc Đạo';
}

// ═══════════════════════════════════════════════════════════════════
// Nạp Âm Lookup for Year Stem-Branch
// ═══════════════════════════════════════════════════════════════════

/**
 * Get the Nạp Âm element name for a Can-Chi pair.
 *
 * @param stemBranch - e.g. "Ất Sửu"
 * @returns e.g. "Hải Trung Kim" or empty string
 */
export function getNapAmForStemBranch(stemBranch: string): string {
    return NAP_AM_MAPPING[stemBranch] || '';
}

// ═══════════════════════════════════════════════════════════════════
// Solar Term at a given solar date
// ═══════════════════════════════════════════════════════════════════

/**
 * Get the Solar Term (Tiết Khí) for a given solar date string.
 *
 * @param solarDateStr - "YYYY-M-D" format
 * @returns Solar term name e.g. "Đông Chí", or empty string on parse failure
 */
export function getSolarTermForDate(solarDateStr: string): string {
    const parts = solarDateStr.split('-').map(Number);
    if (parts.length < 3 || parts.some(isNaN)) return '';
    const [year, month, day] = parts;
    const jd = getJDN(day, month, year);
    return getSolarTerm(jd);
}
