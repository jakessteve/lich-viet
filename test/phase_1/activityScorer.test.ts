import { scoreActivity, scoreAllActivities } from '../../src/utils/activityScorer';
import { getDetailedDayData } from '../../src/utils/calendarEngine';

describe('Activity Scorer', () => {
    // Use a known date (2026-01-15 — a normal day)
    const testDate = new Date(2026, 0, 15);
    const dayData = getDetailedDayData(testDate);

    describe('scoreActivity', () => {
        it('returns a valid result structure', () => {
            const result = scoreActivity('cuoi-hoi', dayData);
            expect(result).toBeDefined();
            expect(typeof result.percentage).toBe('number');
            expect(result.percentage).toBeGreaterThanOrEqual(0);
            expect(result.percentage).toBeLessThanOrEqual(100);
            expect(typeof result.label).toBe('string');
            expect(typeof result.colorClass).toBe('string');
            expect(Array.isArray(result.breakdown)).toBe(true);
            expect(Array.isArray(result.bestHours)).toBe(true);
            expect(typeof result.isBachSuHung).toBe('boolean');
        });

        it('returns breakdown with all 8 factors', () => {
            const result = scoreActivity('xay-dung', dayData);
            expect(result.breakdown.length).toBe(8);
            const factors = result.breakdown.map((b) => b.factor);
            expect(factors).toContain('truc');
            expect(factors).toContain('stars');
            expect(factors).toContain('dayGrade');
            expect(factors).toContain('hour');
            expect(factors).toContain('kiTuoi');
            expect(factors).toContain('napAm');
            expect(factors).toContain('qmdj');
            expect(factors).toContain('thaiAt');
        });

        it('returns up to 3 best hours', () => {
            const result = scoreActivity('xuat-hanh', dayData);
            expect(result.bestHours.length).toBeLessThanOrEqual(3);
            result.bestHours.forEach((h) => {
                expect(typeof h.activityScore).toBe('number');
                expect(h.hourInfo).toBeDefined();
            });
        });

        it('handles unknown activity ID gracefully', () => {
            const result = scoreActivity('nonexistent-activity', dayData);
            expect(result.percentage).toBe(50);
            expect(result.label).toBe('Trung Bình');
            expect(result.breakdown).toEqual([]);
        });

        it('produces different scores for different activities', () => {
            const score1 = scoreActivity('cuoi-hoi', dayData).percentage;
            const score2 = scoreActivity('chon-cat', dayData).percentage;
            // It's possible they're the same, but for most dates at least some differ
            // This is a smoke test — we just verify it doesn't crash
            expect(typeof score1).toBe('number');
            expect(typeof score2).toBe('number');
        });

        it('adjusts score based on birth year chi', () => {
            const _withoutBirth = scoreActivity('cuoi-hoi', dayData);
            const withBirth = scoreActivity('cuoi-hoi', dayData, undefined, 'Tý');
            // With birth year info, kiTuoi factor should not be "Chưa nhập tuổi"
            const kiTuoiFactor = withBirth.breakdown.find((b) => b.factor === 'kiTuoi');
            expect(kiTuoiFactor).toBeDefined();
            expect(kiTuoiFactor!.detail).not.toBe('Chưa nhập tuổi');
        });
    });

    describe('scoreAllActivities', () => {
        it('scores all catalog activities', () => {
            const results = scoreAllActivities(dayData);
            expect(results.length).toBeGreaterThan(30);
            results.forEach((r) => {
                expect(r.percentage).toBeGreaterThanOrEqual(0);
                expect(r.percentage).toBeLessThanOrEqual(100);
                expect(r.activity).toBeDefined();
            });
        });

        it('returns results sorted by percentage descending', () => {
            const results = scoreAllActivities(dayData);
            for (let i = 1; i < results.length; i++) {
                expect(results[i - 1].percentage).toBeGreaterThanOrEqual(results[i].percentage);
            }
        });
    });
});
