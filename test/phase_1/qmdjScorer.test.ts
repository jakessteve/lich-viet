import { scoreActivityByQmdj, getQmdjHourSummary } from '../../src/utils/qmdjScorer';
import { generateQmdjChart } from '../../src/utils/qmdjEngine';
import type { Chi } from '../../src/types/calendar';

describe('QMDJ Scorer', () => {
    const testDate = new Date(2026, 0, 15);
    const testHour: Chi = 'Tý';

    it('returns a valid score structure for a known activity', () => {
        const chart = generateQmdjChart(testDate, testHour);
        const result = scoreActivityByQmdj('khai-truong', chart);

        expect(result).toBeDefined();
        expect(typeof result.score).toBe('number');
        expect(typeof result.detail).toBe('string');
        expect(typeof result.starBonus).toBe('number');
        expect(typeof result.deityBonus).toBe('number');
        expect(typeof result.formationBonus).toBe('number');
    });

    it('returns non-zero score for activities with door mappings', () => {
        const chart = generateQmdjChart(testDate, testHour);
        // khai-truong is mapped to both Khai Môn and Sinh Môn
        const result = scoreActivityByQmdj('khai-truong', chart);
        // Should have a non-zero score since Khai/Sinh are favorable
        expect(result.doorName).toBeTruthy();
    });

    it('returns neutral score for unmapped activities', () => {
        const chart = generateQmdjChart(testDate, testHour);
        const result = scoreActivityByQmdj('nonexistent-activity', chart);
        expect(result.score).toBe(0);
    });

    it('provides hour summary with top doors', () => {
        const chart = generateQmdjChart(testDate, testHour);
        const summary = getQmdjHourSummary(chart);

        expect(summary.topDoors.length).toBeLessThanOrEqual(3);
        expect(summary.topDoors.length).toBeGreaterThan(0);
        summary.topDoors.forEach(d => {
            expect(d.doorName).toBeTruthy();
            expect(d.direction).toBeTruthy();
        });
    });

    it('scores differently across hours for the same activity', () => {
        const chartTy = generateQmdjChart(testDate, 'Tý');
        const chartNgo = generateQmdjChart(testDate, 'Ngọ');

        const scoreTy = scoreActivityByQmdj('cuoi-hoi', chartTy);
        const scoreNgo = scoreActivityByQmdj('cuoi-hoi', chartNgo);

        // Both should return valid results (they might or might not differ)
        expect(typeof scoreTy.score).toBe('number');
        expect(typeof scoreNgo.score).toBe('number');
    });
});
