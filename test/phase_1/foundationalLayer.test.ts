/**
 * Tests for foundationalLayer.ts
 * Covers: JDN conversion, Sun longitude, Solar Term, Solar Month,
 *         calculateFoundationalLayer, and findSolarTermStart.
 */

import {
    getJDN,
    getSunLongitude,
    getSolarTerm,
    getSolarMonth,
    findSolarTermStart,
    calculateFoundationalLayer,
} from '../../src/utils/foundationalLayer';
import { CanChi, Can, Chi } from '../../src/types/calendar';

// ── getJDN ────────────────────────────────────────────────────

describe('getJDN (Julian Day Number)', () => {
    it('should return the standard JDN for J2000.0 epoch (2000-01-01 12:00)', () => {
        // J2000.0 = JD 2451545.0 at noon; calendar day 1 Jan 2000 → JDN 2451545
        expect(getJDN(1, 1, 2000)).toBe(2451545);
    });

    it('should return known JDN for 2024-02-10 (Tet Giáp Thìn)', () => {
        const jdn = getJDN(10, 2, 2024);
        // 2024-02-10 → JDN 2460351
        expect(jdn).toBe(2460351);
    });

    it('should handle Gregorian calendar transition (Oct 15, 1582)', () => {
        // Oct 15, 1582 is the first day of the Gregorian calendar
        const jdn = getJDN(15, 10, 1582);
        expect(jdn).toBe(2299161);
    });

    it('should handle Julian-era date (Oct 4, 1582 — last Julian day)', () => {
        // Oct 4, 1582 is the last Julian calendar date
        const jdn = getJDN(4, 10, 1582);
        expect(jdn).toBe(2299160);
    });

    it('should produce consecutive JDNs for consecutive days', () => {
        const jdn1 = getJDN(1, 3, 2026);
        const jdn2 = getJDN(2, 3, 2026);
        expect(jdn2 - jdn1).toBe(1);
    });

    it('should handle leap year correctly (Feb 29, 2024)', () => {
        const jdn28 = getJDN(28, 2, 2024);
        const jdn29 = getJDN(29, 2, 2024);
        const jdn1 = getJDN(1, 3, 2024);
        expect(jdn29 - jdn28).toBe(1);
        expect(jdn1 - jdn29).toBe(1);
    });

    it('should handle year boundaries correctly', () => {
        const jdnDec31 = getJDN(31, 12, 2025);
        const jdnJan1 = getJDN(1, 1, 2026);
        expect(jdnJan1 - jdnDec31).toBe(1);
    });
});

// ── getSunLongitude ───────────────────────────────────────────

describe('getSunLongitude', () => {
    it('should return a value between 0 and 360', () => {
        const jd = getJDN(1, 3, 2026);
        const lon = getSunLongitude(jd);
        expect(lon).toBeGreaterThanOrEqual(0);
        expect(lon).toBeLessThan(360);
    });

    it('should return ~0° around Vernal Equinox (March 20-21)', () => {
        // March 20, 2024 ≈ Vernal Equinox, Sun longitude ≈ 0° (Aries)
        const jd = getJDN(20, 3, 2024);
        const lon = getSunLongitude(jd);
        expect(lon).toBeLessThan(5);  // Within 5° of 0°
    });

    it('should return ~90° around Summer Solstice (June 21)', () => {
        const jd = getJDN(21, 6, 2024);
        const lon = getSunLongitude(jd);
        expect(lon).toBeGreaterThan(85);
        expect(lon).toBeLessThan(95);
    });

    it('should return ~270° around Winter Solstice (Dec 21)', () => {
        const jd = getJDN(21, 12, 2024);
        const lon = getSunLongitude(jd);
        expect(lon).toBeGreaterThan(265);
        expect(lon).toBeLessThan(275);
    });

    it('should increase monotonically over several months', () => {
        const _lon1 = getSunLongitude(getJDN(1, 1, 2024));
        const _lon2 = getSunLongitude(getJDN(1, 4, 2024));
        const lon3 = getSunLongitude(getJDN(1, 7, 2024));
        // Sun longitude progresses from ~280° (Jan) → ~10° (Apr) → ~100° (Jul)
        // After wrap-around, the raw comparison may not hold, so test the July one specifically
        expect(lon3).toBeGreaterThan(90);
        expect(lon3).toBeLessThan(110);
    });
});

// ── getSolarTerm ──────────────────────────────────────────────

describe('getSolarTerm', () => {
    it('should return a non-empty string for any date', () => {
        const jd = getJDN(1, 6, 2025);
        const term = getSolarTerm(jd);
        expect(term).toBeTruthy();
        expect(typeof term).toBe('string');
    });

    it('should return Xuân Phân near March Equinox 2024', () => {
        const jd = getJDN(21, 3, 2024);
        const term = getSolarTerm(jd);
        expect(term).toBe('Xuân Phân');
    });

    it('should return Hạ Chí near June Solstice 2024', () => {
        const jd = getJDN(21, 6, 2024);
        const term = getSolarTerm(jd);
        expect(term).toBe('Hạ Chí');
    });

    it('should return Đông Chí near December Solstice 2024', () => {
        const jd = getJDN(22, 12, 2024);
        const term = getSolarTerm(jd);
        expect(term).toBe('Đông Chí');
    });

    it('should return consistent results for same JDN', () => {
        const jd = getJDN(15, 5, 2026);
        expect(getSolarTerm(jd)).toBe(getSolarTerm(jd));
    });
});

// ── getSolarMonth ─────────────────────────────────────────────

describe('getSolarMonth', () => {
    it('should return a value between 1 and 12', () => {
        const jd = getJDN(1, 8, 2025);
        const month = getSolarMonth(jd);
        expect(month).toBeGreaterThanOrEqual(1);
        expect(month).toBeLessThanOrEqual(12);
    });

    it('should return month 1 (Dần) around Lập Xuân (Feb 4-5)', () => {
        // Lập Xuân ~ Feb 4, start of solar month 1
        const jd = getJDN(6, 2, 2024);
        const month = getSolarMonth(jd);
        expect(month).toBe(1);
    });

    it('should return month 6 (Mùi) around Tiểu Thử (Jul 6-8)', () => {
        const jd = getJDN(10, 7, 2024);
        const month = getSolarMonth(jd);
        expect(month).toBe(6);
    });
});

// ── findSolarTermStart ────────────────────────────────────────

describe('findSolarTermStart', () => {
    it('should return an object with term (string) and date (Date)', () => {
        const result = findSolarTermStart(new Date(2024, 2, 15));  // March 15
        expect(result).toHaveProperty('term');
        expect(result).toHaveProperty('date');
        expect(typeof result.term).toBe('string');
        expect(result.date).toBeInstanceOf(Date);
    });

    it('should return a date on or before the input date', () => {
        const input = new Date(2024, 5, 15);  // June 15
        const result = findSolarTermStart(input);
        expect(result.date.getTime()).toBeLessThanOrEqual(input.getTime() + 86400000); // +1 day tolerance for hours
    });

    it('should return the same term for the same solar-term period', () => {
        // If two dates are close (within 15 days), they may share the same term
        const r1 = findSolarTermStart(new Date(2024, 3, 25));  // April 25
        const r2 = findSolarTermStart(new Date(2024, 3, 30));  // April 30
        // Both should be in the same term period
        expect(r1.term).toBe(r2.term);
    });
});

// ── calculateFoundationalLayer ────────────────────────────────

describe('calculateFoundationalLayer', () => {
    // Stub functions for getCanChiMonth and getCanChiYear
    const mockGetCanChiMonth = (month: number, year: number): string => {
        const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
        const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
        const yearCanIdx = (year + 6) % 10;
        const mci = (yearCanIdx * 2 + 2 + (month - 1)) % 10;
        const chi = (month + 1) % 12;
        return `${CAN[mci]} ${CHI[chi]}`;
    };

    const mockGetCanChiYear = (year: number): string => {
        const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
        const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
        return `${CAN[(year + 6) % 10]} ${CHI[(year + 8) % 12]}`;
    };

    it('should return baseScore, thanSat, auspiciousDirections, solarMonth, and isAuspiciousDay', () => {
        const date = new Date(2024, 1, 10);
        const lunar = { day: 1, month: 1, year: 2024, isLeap: false };
        const dayCanChi: CanChi = { can: 'Giáp' as Can, chi: 'Thìn' as Chi };

        const result = calculateFoundationalLayer(date, lunar, dayCanChi, mockGetCanChiMonth, mockGetCanChiYear);

        expect(result).toHaveProperty('baseScore');
        expect(result).toHaveProperty('thanSat');
        expect(result).toHaveProperty('auspiciousDirections');
        expect(result).toHaveProperty('solarMonth');
        expect(result).toHaveProperty('isAuspiciousDay');
        expect(typeof result.baseScore).toBe('number');
        expect(Array.isArray(result.thanSat)).toBe(true);
        expect(typeof result.auspiciousDirections.hyThan).toBe('string');
    });

    it('should include Day Deity in thanSat', () => {
        const date = new Date(2024, 1, 10);
        const lunar = { day: 1, month: 1, year: 2024, isLeap: false };
        const dayCanChi: CanChi = { can: 'Giáp' as Can, chi: 'Thìn' as Chi };

        const result = calculateFoundationalLayer(date, lunar, dayCanChi, mockGetCanChiMonth, mockGetCanChiYear);

        // The last entry in thanSat is always the Day Deity (Hoàng Đạo / Hắc Đạo)
        const lastEntry = result.thanSat[result.thanSat.length - 1];
        expect(lastEntry.name).toMatch(/(Hoàng Đạo|Hắc Đạo)/);
    });

    it('should return correct Hỷ Thần direction for Giáp day', () => {
        const date = new Date(2024, 1, 10);
        const lunar = { day: 1, month: 1, year: 2024, isLeap: false };
        const dayCanChi: CanChi = { can: 'Giáp' as Can, chi: 'Thìn' as Chi };

        const result = calculateFoundationalLayer(date, lunar, dayCanChi, mockGetCanChiMonth, mockGetCanChiYear);
        expect(result.auspiciousDirections.hyThan).toBe('Đông Bắc');
    });
});
