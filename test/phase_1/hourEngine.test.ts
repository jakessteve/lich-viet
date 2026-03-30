/**
 * Tests for hourEngine.ts
 * Covers: getHourCanChi, getAllHours, getAuspiciousHours, getInauspiciousHours
 * Tests are run through the calendarEngine orchestrator wrappers.
 */

import {
    getHourCanChi,
    getAllHours,
    getAuspiciousHours,
    getInauspiciousHours,
} from '../../src/utils/calendarEngine';
import { Can, Chi, HourInfo } from '../../src/types/calendar';

// ── getHourCanChi ─────────────────────────────────────────────

describe('getHourCanChi', () => {
    it('should return a valid CanChi object', () => {
        const result = getHourCanChi('Giáp' as Can, 'Tý' as Chi);
        expect(result).toHaveProperty('can');
        expect(result).toHaveProperty('chi');
    });

    it('should return the same Chi as input (hour Chi does not change)', () => {
        const result = getHourCanChi('Giáp' as Can, 'Ngọ' as Chi);
        expect(result.chi).toBe('Ngọ');
    });

    it('should calculate Can correctly for Giáp day, Tý hour → Giáp Tý', () => {
        // Formula: hourCanIndex = (dayCanIndex * 2 + hourChiIndex) % 10
        // Giáp=0, Tý=0 → (0*2 + 0) % 10 = 0 → Giáp
        const result = getHourCanChi('Giáp' as Can, 'Tý' as Chi);
        expect(result.can).toBe('Giáp');
    });

    it('should calculate Can correctly for Ất day, Tý hour → Bính Tý', () => {
        // Ất=1, Tý=0 → (1*2 + 0) % 10 = 2 → Bính
        const result = getHourCanChi('Ất' as Can, 'Tý' as Chi);
        expect(result.can).toBe('Bính');
    });

    it('should calculate Can correctly for Bính day, Tý hour → Mậu Tý', () => {
        // Bính=2, Tý=0 → (2*2 + 0) % 10 = 4 → Mậu
        const result = getHourCanChi('Bính' as Can, 'Tý' as Chi);
        expect(result.can).toBe('Mậu');
    });

    it('should calculate Can correctly for Giáp day, Sửu hour → Ất Sửu', () => {
        // Giáp=0, Sửu=1 → (0*2 + 1) % 10 = 1 → Ất
        const result = getHourCanChi('Giáp' as Can, 'Sửu' as Chi);
        expect(result.can).toBe('Ất');
    });

    it('should wrap around correctly for large index', () => {
        // Quý=9, Hợi=11 → (9*2 + 11) % 10 = 29 % 10 = 9 → Quý
        const result = getHourCanChi('Quý' as Can, 'Hợi' as Chi);
        expect(result.can).toBe('Quý');
        expect(result.chi).toBe('Hợi');
    });
});

// ── getAllHours ────────────────────────────────────────────────

describe('getAllHours', () => {
    let hours: HourInfo[];

    beforeAll(() => {
        hours = getAllHours(new Date(2024, 1, 10));  // Feb 10, 2024
    });

    it('should return exactly 12 hours', () => {
        expect(hours).toHaveLength(12);
    });

    it('should start with Tý hour (23:00 - 01:00)', () => {
        expect(hours[0].name).toBe('Tý');
        expect(hours[0].timeRange).toBe('23:00 - 01:00');
    });

    it('should end with Hợi hour (21:00 - 23:00)', () => {
        expect(hours[11].name).toBe('Hợi');
        expect(hours[11].timeRange).toBe('21:00 - 23:00');
    });

    it('should provide valid scores between 0 and 100', () => {
        hours.forEach(h => {
            expect(h.score).toBeGreaterThanOrEqual(0);
            expect(h.score).toBeLessThanOrEqual(100);
        });
    });

    it('should have canChi with valid Can and Chi for each hour', () => {
        const validCan = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
        const validChi = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

        hours.forEach(h => {
            expect(validCan).toContain(h.canChi.can);
            expect(validChi).toContain(h.canChi.chi);
        });
    });

    it('should have isAuspicious as boolean for each hour', () => {
        hours.forEach(h => {
            expect(typeof h.isAuspicious).toBe('boolean');
        });
    });

    it('should have nghi and ky arrays for each hour', () => {
        hours.forEach(h => {
            expect(Array.isArray(h.nghi)).toBe(true);
            expect(Array.isArray(h.ky)).toBe(true);
        });
    });
});

// ── getAuspiciousHours ────────────────────────────────────────

describe('getAuspiciousHours', () => {
    it('should return exactly 6 auspicious hours', () => {
        const hours = getAuspiciousHours(new Date(2024, 1, 10));
        expect(hours).toHaveLength(6);
    });

    it('should only contain hours marked isAuspicious=true', () => {
        const hours = getAuspiciousHours(new Date(2024, 5, 15));
        hours.forEach(h => {
            expect(h.isAuspicious).toBe(true);
        });
    });

    it('should return a subset of getAllHours', () => {
        const date = new Date(2024, 1, 10);
        const all = getAllHours(date);
        const auspicious = getAuspiciousHours(date);
        auspicious.forEach(ah => {
            expect(all.find(h => h.name === ah.name && h.isAuspicious === true)).toBeDefined();
        });
    });
});

// ── getInauspiciousHours ──────────────────────────────────────

describe('getInauspiciousHours', () => {
    it('should return exactly 6 inauspicious hours', () => {
        const hours = getInauspiciousHours(new Date(2024, 1, 10));
        expect(hours).toHaveLength(6);
    });

    it('should only contain hours marked isAuspicious=false', () => {
        const hours = getInauspiciousHours(new Date(2024, 5, 15));
        hours.forEach(h => {
            expect(h.isAuspicious).toBe(false);
        });
    });

    it('auspicious + inauspicious should equal allHours', () => {
        const date = new Date(2026, 2, 1);
        const all = getAllHours(date);
        const good = getAuspiciousHours(date);
        const bad = getInauspiciousHours(date);
        expect(good.length + bad.length).toBe(all.length);
    });
});

// ── Consistency Across Different Dates ────────────────────────

describe('Hour engine consistency', () => {
    it('should produce different Can-Chi for different day stems', () => {
        // Two consecutive days have different day stems, so hour Can should differ
        const hours1 = getAllHours(new Date(2024, 1, 10));
        const hours2 = getAllHours(new Date(2024, 1, 11));

        // Tý hour should have different Can due to different day stems
        expect(hours1[0].canChi.can).not.toBe(hours2[0].canChi.can);
    });

    it('should always have exactly 12 hours regardless of date', () => {
        const dates = [
            new Date(2024, 0, 1),
            new Date(2024, 5, 21),
            new Date(2024, 11, 31),
            new Date(2026, 2, 1),
        ];
        dates.forEach(d => {
            expect(getAllHours(d)).toHaveLength(12);
        });
    });
});
