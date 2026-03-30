/**
 * Tests for the decomposed sub-functions of calendarEngine.
 *
 * These test the extracted helper functions:
 * - integrateExtraStars
 * - calculateNguHanhInteraction
 * - calculateFinalScore
 * - buildNapAmInteraction
 * - buildCanChiXungHop
 * - collectStarLists
 */
import {
    integrateExtraStars,
    calculateNguHanhInteraction,
    calculateFinalScore,
    buildNapAmInteraction,
    buildCanChiXungHop,
    collectStarLists,
} from '../../src/utils/calendarEngine';
import type { StarData, Can, Chi } from '../../src/types/calendar';

describe('integrateExtraStars', () => {
    const masterCat: StarData[] = [
        { name: 'Thiên Đức', type: 'Good', description: 'Trời phù hộ', suitable: ['Xuất hành'], unsuitable: [] },
    ];
    const masterHung: StarData[] = [
        { name: 'Thiên Hình', type: 'Bad', description: 'Hung sát', suitable: [], unsuitable: ['Cầu tài'] },
    ];

    it('should merge good extra stars into the list with correct metadata', () => {
        const result = integrateExtraStars({
            modifyingStars: [],
            extraGoodStars: ['Thiên Đức'],
            extraBadStars: [],
            masterCat,
            masterHung,
        });
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('Thiên Đức');
        expect(result[0].type).toBe('Good');
        expect(result[0].description).toBe('Trời phù hộ');
        expect(result[0].suitable).toEqual(['Xuất hành']);
    });

    it('should merge bad extra stars into the list with correct metadata', () => {
        const result = integrateExtraStars({
            modifyingStars: [],
            extraGoodStars: [],
            extraBadStars: ['Thiên Hình'],
            masterCat,
            masterHung,
        });
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('Thiên Hình');
        expect(result[0].type).toBe('Bad');
        expect(result[0].unsuitable).toEqual(['Cầu tài']);
    });

    it('should preserve existing modifying stars', () => {
        const existing: StarData[] = [
            { name: 'Existing', type: 'Good', weight: 5 },
        ];
        const result = integrateExtraStars({
            modifyingStars: existing,
            extraGoodStars: ['Thiên Đức'],
            extraBadStars: [],
            masterCat,
            masterHung,
        });
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('Existing');
        expect(result[1].name).toBe('Thiên Đức');
    });

    it('should not mutate the original modifying stars array', () => {
        const original: StarData[] = [{ name: 'Original', type: 'Good' }];
        const originalLength = original.length;
        integrateExtraStars({
            modifyingStars: original,
            extraGoodStars: ['Thiên Đức'],
            extraBadStars: [],
            masterCat,
            masterHung,
        });
        expect(original).toHaveLength(originalLength);
    });

    it('should handle unknown stars with empty metadata', () => {
        const result = integrateExtraStars({
            modifyingStars: [],
            extraGoodStars: ['Unknown Star'],
            extraBadStars: [],
            masterCat,
            masterHung,
        });
        expect(result[0].description).toBe('');
        expect(result[0].suitable).toEqual([]);
    });
});

describe('calculateNguHanhInteraction', () => {
    it('should return Chuyên nhật when Can and Chi have the same element', () => {
        // Bính Ngọ: Bính=Hỏa, Ngọ=Hỏa → same element
        const result = calculateNguHanhInteraction({ can: 'Bính' as Can, chi: 'Ngọ' as Chi });
        expect(result.nguHanhGrade).toBe('Chuyên nhật');
        expect(result.nguHanhInteraction).toContain('chuyên nhật');
    });

    it('should return Phạt nhật when Chi overcomes Can', () => {
        // Giáp Thân: Giáp=Mộc, Thân=Kim → Kim khắc Mộc (Chi khắc Can)
        const result = calculateNguHanhInteraction({ can: 'Giáp' as Can, chi: 'Thân' as Chi });
        expect(result.nguHanhGrade).toBe('Phạt nhật');
        expect(result.nguHanhInteraction).toContain('phạt nhật');
    });

    it('should always return a nguHanhInteraction string starting with "Ngày:"', () => {
        const result = calculateNguHanhInteraction({ can: 'Giáp' as Can, chi: 'Tý' as Chi });
        expect(result.nguHanhInteraction).toMatch(/^Ngày:/);
    });
});

describe('calculateFinalScore', () => {
    it('should sum base score with star weights', () => {
        const stars: StarData[] = [
            { name: 'A', weight: 3 },
            { name: 'B', weight: -2 },
        ];
        const result = calculateFinalScore(10, stars, 'Neutral', 'Neutral', 0);
        expect(result.finalScore).toBe(11); // 10 + 3 + (-2) = 11
    });

    it('should add Truc/Tu quality bonuses', () => {
        const result = calculateFinalScore(0, [], 'Good', 'Good', 0);
        expect(result.finalScore).toBeGreaterThan(0);
    });

    it('should subtract Truc/Tu quality penalties', () => {
        const result = calculateFinalScore(0, [], 'Bad', 'Bad', 0);
        expect(result.finalScore).toBeLessThan(0);
    });

    it('should include nguHanhScore in the total', () => {
        const result = calculateFinalScore(0, [], 'Neutral', 'Neutral', 8);
        expect(result.finalScore).toBe(8);
    });

    it('should grade as Tốt above threshold', () => {
        const result = calculateFinalScore(100, [], 'Good', 'Good', 8);
        expect(result.dayGrade).toBe('Tốt');
    });

    it('should grade as Đại Kỵ below threshold', () => {
        const result = calculateFinalScore(-100, [], 'Bad', 'Bad', -8);
        expect(result.dayGrade).toBe('Đại Kỵ');
    });

    it('should handle stars with undefined weight', () => {
        const stars: StarData[] = [{ name: 'NoWeight' }]; // weight is undefined
        const result = calculateFinalScore(10, stars, 'Neutral', 'Neutral', 0);
        expect(result.finalScore).toBe(10); // 0 from undefined weight
    });
});

describe('buildNapAmInteraction', () => {
    it('should contain "Nạp Âm:" prefix', () => {
        const result = buildNapAmInteraction({ can: 'Giáp' as Can, chi: 'Tý' as Chi });
        expect(result).toMatch(/^Nạp Âm:/);
    });

    it('should include kị tuổi information', () => {
        const result = buildNapAmInteraction({ can: 'Giáp' as Can, chi: 'Tý' as Chi });
        expect(result).toContain('kị tuổi');
    });

    it('should include ngũ hành element name', () => {
        const result = buildNapAmInteraction({ can: 'Giáp' as Can, chi: 'Tý' as Chi });
        // Giáp = Mộc
        expect(result).toContain('Mộc');
    });
});

describe('buildCanChiXungHop', () => {
    it('should contain lục hợp for Tý', () => {
        const result = buildCanChiXungHop('Tý' as Chi);
        expect(result).toContain('lục hợp');
        expect(result).toContain('Sửu'); // Tý hợp Sửu
    });

    it('should contain xung for Tý', () => {
        const result = buildCanChiXungHop('Tý' as Chi);
        expect(result).toContain('xung');
        expect(result).toContain('Ngọ'); // Tý xung Ngọ
    });

    it('should contain tam hợp, hình, hại, phá, tuyệt', () => {
        const result = buildCanChiXungHop('Tý' as Chi);
        expect(result).toContain('tam hợp');
        expect(result).toContain('hình');
        expect(result).toContain('hại');
        expect(result).toContain('phá');
        expect(result).toContain('tuyệt');
    });
});

describe('collectStarLists', () => {
    it('should collect good stars from thanSat and modifying stars', () => {
        const thanSat: StarData[] = [
            { name: 'ThanSat Good', type: 'Good' },
            { name: 'ThanSat Bad', type: 'Bad' },
        ];
        const modStars: StarData[] = [
            { name: 'Mod Good', type: 'Good' },
        ];
        const result = collectStarLists(thanSat, modStars, { name: 'Khai', quality: 'Neutral' }, { name: 'Giác', quality: 'Neutral' });
        expect(result.goodStars).toContain('Mod Good');
        expect(result.goodStars).toContain('ThanSat Good');
        expect(result.badStars).toContain('ThanSat Bad');
    });

    it('should include Trực name when Trực quality is Good', () => {
        const result = collectStarLists([], [], { name: 'Khai', quality: 'Good' }, { name: 'Giác', quality: 'Neutral' });
        expect(result.goodStars).toContain('Trực Khai');
    });

    it('should include Sao name when Tú quality is Bad', () => {
        const result = collectStarLists([], [], { name: 'Khai', quality: 'Neutral' }, { name: 'Liễu', quality: 'Bad' });
        expect(result.badStars).toContain('Sao Liễu');
    });

    it('should deduplicate star names', () => {
        const thanSat: StarData[] = [{ name: 'Duplicate', type: 'Good' }];
        const modStars: StarData[] = [{ name: 'Duplicate', type: 'Good' }];
        const result = collectStarLists(thanSat, modStars, { name: 'X', quality: 'Neutral' }, { name: 'Y', quality: 'Neutral' });
        expect(result.goodStars.filter(s => s === 'Duplicate')).toHaveLength(1);
    });

    it('should sort star names alphabetically', () => {
        const modStars: StarData[] = [
            { name: 'Zebra', type: 'Good' },
            { name: 'Alpha', type: 'Good' },
        ];
        const result = collectStarLists([], modStars, { name: 'X', quality: 'Neutral' }, { name: 'Y', quality: 'Neutral' });
        expect(result.goodStars[0]).toBe('Alpha');
        expect(result.goodStars[1]).toBe('Zebra');
    });

    it('should exclude thanSat with day_hour_chi criteria', () => {
        const thanSat: StarData[] = [
            { name: 'HourOnly', type: 'Good', criteria: { day_hour_chi: { 'Tý': 'Ngọ' } as unknown } },
        ];
        const result = collectStarLists(thanSat, [], { name: 'X', quality: 'Neutral' }, { name: 'Y', quality: 'Neutral' });
        expect(result.goodStars).not.toContain('HourOnly');
    });
});
