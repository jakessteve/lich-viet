import { calculateModifyingLayer } from '../../src/utils/modifyingLayer';
import { CanChi } from '../../src/types/calendar';

describe('Modifying Layer Logic', () => {
    it('calculates modifying stars for a normal day (no edge case)', () => {
        const testDate = new Date('2024-03-15T12:00:00Z');
        const lunarMatch = { day: 6, month: 2, year: 2024, isLeap: false };
        const dayCanChi: CanChi = { can: 'Đinh', chi: 'Mão' };

        const result = calculateModifyingLayer(testDate, lunarMatch, dayCanChi, 2);

        expect(result).toBeDefined();
        // Since test data can change, just ensure the format is correct
        expect(Array.isArray(result.stars)).toBe(true);
        expect(result.trucDetail).toBeDefined();
        expect(result.trucDetail.name).toBeDefined();
        expect(result.tuDetail).toBeDefined();
        expect(result.tuDetail.name).toBeDefined();
    });

    it('matches solar terms eve properly', () => {
        // e.g. Tứ Tuyệt days (day before Lập Xuân, Lập Hạ, Lập Thu, Lập Đông)
        // 2024 Lập Xuân is Feb 4, so Feb 3 is Tứ Tuyệt.
        const testDate = new Date('2024-02-03T12:00:00Z');
        const lunarMatch = { day: 24, month: 12, year: 2023, isLeap: false };
        const dayCanChi: CanChi = { can: 'Đinh', chi: 'Dậu' };

        const result = calculateModifyingLayer(testDate, lunarMatch, dayCanChi, 1);

        expect(result).toBeDefined();
        const hasTuTuyet = result.stars.some(s => s.name === 'Tứ Tuyệt');
        expect(hasTuTuyet).toBe(true);
    });
});
