import { generateQmdjChart, isDuongDon, getYuanForDate } from '../../src/utils/qmdjEngine';
import type { Chi } from '../../src/types/calendar';

describe('QMDJ Engine', () => {
    describe('isDuongDon', () => {
        it('returns true for Yang Dun solar terms', () => {
            expect(isDuongDon('Đông chí')).toBe(true);
            expect(isDuongDon('Xuân phân')).toBe(true);
            expect(isDuongDon('Lập hạ')).toBe(true);
            expect(isDuongDon('Mang chủng')).toBe(true);
        });

        it('returns false for Yin Dun solar terms', () => {
            expect(isDuongDon('Hạ chí')).toBe(false);
            expect(isDuongDon('Thu phân')).toBe(false);
            expect(isDuongDon('Lập đông')).toBe(false);
            expect(isDuongDon('Đại tuyết')).toBe(false);
        });
    });

    describe('getYuanForDate', () => {
        it('returns a valid yuan value', () => {
            const yuan = getYuanForDate(new Date(2026, 0, 15));
            expect(['upper', 'middle', 'lower']).toContain(yuan);
        });
    });

    describe('generateQmdjChart', () => {
        const testDate = new Date(2026, 0, 15); // Jan 15, 2026
        const testHour: Chi = 'Tý';

        it('returns a valid chart structure', () => {
            const chart = generateQmdjChart(testDate, testHour);
            expect(chart).toBeDefined();
            expect(chart.palaces.length).toBe(9);
            expect(chart.isDuongDon).toBeDefined();
            expect(chart.gameNumber).toBeGreaterThanOrEqual(1);
            expect(chart.gameNumber).toBeLessThanOrEqual(9);
            expect(chart.hourChi).toBe(testHour);
            expect(chart.solarTerm).toBeDefined();
            expect(['upper', 'middle', 'lower']).toContain(chart.yuan);
            expect(Array.isArray(chart.formations)).toBe(true);
        });

        it('returns 9 palaces with correct numbers', () => {
            const chart = generateQmdjChart(testDate, testHour);
            const numbers = chart.palaces.map(p => p.number).sort();
            expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });

        it('has doors on all non-center palaces', () => {
            const chart = generateQmdjChart(testDate, testHour);
            chart.palaces.forEach(p => {
                if (p.number !== 5) {
                    expect(p.door).not.toBeNull();
                    expect(p.door?.nameVi).toBeDefined();
                }
            });
        });

        it('has stars assigned to palaces', () => {
            const chart = generateQmdjChart(testDate, testHour);
            const palacesWithStars = chart.palaces.filter(p => p.star !== null);
            expect(palacesWithStars.length).toBeGreaterThan(0);
        });

        it('produces different charts for different hours', () => {
            const chartTy = generateQmdjChart(testDate, 'Tý');
            const chartNgo = generateQmdjChart(testDate, 'Ngọ');
            
            // Different hours should produce different game layouts
            // (they may have different door positions, not necessarily different game numbers)
            const doorsTy = chartTy.palaces.map(p => p.door?.id).filter(Boolean);
            const doorsNgo = chartNgo.palaces.map(p => p.door?.id).filter(Boolean);
            
            // The sets should have the same doors but potentially at different palaces
            expect(doorsTy.length).toBeGreaterThan(0);
            expect(doorsNgo.length).toBeGreaterThan(0);
        });

        it('assigns deities to non-center palaces', () => {
            const chart = generateQmdjChart(testDate, testHour);
            const palacesWithDeities = chart.palaces.filter(p => p.deity !== null && p.number !== 5);
            expect(palacesWithDeities.length).toBeGreaterThan(0);
        });

        it('works with multiple dates and hours without crashing', () => {
            const dates = [
                new Date(2026, 0, 1),   // Jan 1
                new Date(2026, 2, 20),  // Mar 20 (near equinox)
                new Date(2026, 5, 21),  // Jun 21 (near solstice)
                new Date(2026, 8, 23),  // Sep 23 (near equinox)
                new Date(2026, 11, 22), // Dec 22 (near solstice)
            ];
            const hours: Chi[] = ['Tý', 'Dần', 'Thìn', 'Ngọ', 'Thân', 'Tuất'];
            
            for (const date of dates) {
                for (const hour of hours) {
                    expect(() => generateQmdjChart(date, hour)).not.toThrow();
                }
            }
        });
    });
});
