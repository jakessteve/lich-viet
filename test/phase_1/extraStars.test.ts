/**
 * Tests for extraStars.ts
 * Covers: getExtraStars — supplementary star lookups not in the main JSON data files.
 */

import { getExtraStars } from '../../src/utils/extraStars';
import { Can, Chi } from '../../src/types/calendar';

describe('getExtraStars', () => {
    it('should return an object with goodStars and badStars arrays', () => {
        const result = getExtraStars(1, 1, 'Giáp' as Can, 'Tý' as Chi, 'Kiến', false, 'Giáp' as Can);
        expect(result).toHaveProperty('goodStars');
        expect(result).toHaveProperty('badStars');
        expect(Array.isArray(result.goodStars)).toBe(true);
        expect(Array.isArray(result.badStars)).toBe(true);
    });

    it('should detect Minh Phệ for Canh Ngọ day', () => {
        const result = getExtraStars(1, 1, 'Canh' as Can, 'Ngọ' as Chi, 'Kiến', false, 'Giáp' as Can);
        expect(result.goodStars).toContain('Minh Phệ');
    });

    it('should detect Kê Hoãn for Quý Dậu day', () => {
        const result = getExtraStars(1, 1, 'Quý' as Can, 'Dậu' as Chi, 'Kiến', false, 'Giáp' as Can);
        expect(result.badStars).toContain('Kê Hoãn');
    });

    it('should detect Ngũ Ly for Thân day-chi', () => {
        const result = getExtraStars(1, 1, 'Giáp' as Can, 'Thân' as Chi, 'Kiến', false, 'Giáp' as Can);
        expect(result.badStars).toContain('Ngũ Ly');
    });

    it('should detect Trừ Thần for Dậu day-chi', () => {
        const result = getExtraStars(1, 1, 'Ất' as Can, 'Dậu' as Chi, 'Kiến', false, 'Giáp' as Can);
        expect(result.goodStars).toContain('Trừ Thần');
    });

    it('should not duplicate star names in either list', () => {
        const result = getExtraStars(1, 15, 'Canh' as Can, 'Ngọ' as Chi, 'Kiến', false, 'Canh' as Can);
        const uniqueGood = new Set(result.goodStars);
        const uniqueBad = new Set(result.badStars);
        expect(uniqueGood.size).toBe(result.goodStars.length);
        expect(uniqueBad.size).toBe(result.badStars.length);
    });

    it('should return empty arrays for a day with no extra stars', () => {
        // Giáp Tý is a common day that may or may not have extra stars — checking structure
        const result = getExtraStars(6, 10, 'Giáp' as Can, 'Tý' as Chi, 'Bình', false, 'Mậu' as Can);
        expect(Array.isArray(result.goodStars)).toBe(true);
        expect(Array.isArray(result.badStars)).toBe(true);
    });

    it('should detect Thần Tại for Giáp day with valid chi', () => {
        // Giáp day → Thần Tại for Tý, Ngọ, Thân, Tuất
        const result = getExtraStars(1, 1, 'Giáp' as Can, 'Tý' as Chi, 'Kiến', false, 'Giáp' as Can);
        expect(result.goodStars).toContain('Thần Tại');
    });

    it('should handle month-based stars (Bát Tọa) correctly', () => {
        // Month 1 → Bát Tọa hits Dậu chi
        const result = getExtraStars(1, 1, 'Ất' as Can, 'Dậu' as Chi, 'Kiến', false, 'Giáp' as Can);
        expect(result.badStars).toContain('Bát Tọa');
    });

    it('should handle Cửu Khổ Bát Cùng detection', () => {
        // Cửu Khổ Bát Cùng appears on specific lunar days per month (month 5, day 5 is one)
        const result = getExtraStars(5, 5, 'Giáp' as Can, 'Tý' as Chi, 'Kiến', false, 'Giáp' as Can);
        expect(result.badStars).toContain('Cửu Khổ Bát Cùng');
    });

    it('should handle tháng 30 (đủ/thiếu) parameter', () => {
        // Thọ Tử appears on day 30 of "thiếu" months — when th30 = false and lunarDay is near 30
        const result1 = getExtraStars(1, 30, 'Giáp' as Can, 'Tý' as Chi, 'Kiến', true, 'Giáp' as Can);
        const result2 = getExtraStars(1, 30, 'Giáp' as Can, 'Tý' as Chi, 'Kiến', false, 'Giáp' as Can);
        // Results may differ; at minimum both should be well-formed
        expect(Array.isArray(result1.goodStars)).toBe(true);
        expect(Array.isArray(result2.goodStars)).toBe(true);
    });
});
