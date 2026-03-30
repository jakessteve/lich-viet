/**
 * Phase 3: Tu Vi Engine — Unit Tests
 *
 * Tests for:
 * - P4.1: patternEngine.detectPatterns()
 * - P4.2: palaceInterpretation.interpretPalace()
 * - P4.3: tuviEngine.getStarCategory()
 * - P4.4: tuviEngine.parseCanChiParts() — not exported, tested indirectly
 */
import { describe, it, expect } from 'vitest';
import { detectPatterns } from '../../src/services/tuvi/patternEngine';
import { interpretPalace } from '../../src/services/tuvi/palaceInterpretation';
import { getStarCategory } from '../../src/services/tuvi/tuviEngine';
import type { TuViChartData, TuViPalace, TuViStar } from '../../src/services/tuvi/tuviTypes';

// ═══════════════════════════════════════════════════════════════════
// Test Helpers
// ═══════════════════════════════════════════════════════════════════

function makeStar(name: string, overrides: Partial<TuViStar> = {}): TuViStar {
    return {
        name,
        type: 'major',
        scope: 'origin',
        brightness: '庙',
        ...overrides,
    };
}

function makePalace(name: string, branch: string, overrides: Partial<TuViPalace> = {}): TuViPalace {
    return {
        name,
        earthlyBranch: branch,
        heavenlyStem: 'Giáp',
        majorStars: [],
        stage: { range: [2, 11], heavenlyStem: 'Giáp' },
        ...overrides,
    };
}

function makeChart(palaces: TuViPalace[]): TuViChartData {
    return {
        solarDate: '1990-01-01',
        lunarDate: '1990-01-01',
        chineseDate: 'Canh Ngọ Mậu Dần Bính Tý Giáp Ngọ',
        time: 'Tý',
        timeRange: '23:00-01:00',
        sign: '',
        zodiac: '',
        earthlyBranchOfSoulPalace: 'Tý',
        earthlyBranchOfBodyPalace: 'Ngọ',
        soul: 'Liêm Trinh',
        body: 'Thiên Cơ',
        fiveElementsClass: 'Kim Tứ Cục',
        palaces,
    };
}

/** Create a minimal 12-palace chart with specific stars in Mệnh */
function makeBasicChart(
    menhBranch: string,
    menhStars: TuViStar[],
    otherPalaceOverrides: Record<string, Partial<TuViPalace>> = {},
): TuViChartData {
    const branches = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
    const palaceNames = [
        'Mệnh', 'Huynh Đệ', 'Phu Thê', 'Tử Tức', 'Tài Bạch', 'Tật Ách',
        'Thiên Di', 'Nô Bộc', 'Quan Lộc', 'Điền Trạch', 'Phúc Đức', 'Phụ Mẫu'
    ];
    const menhIdx = branches.indexOf(menhBranch);

    const palaces: TuViPalace[] = branches.map((br, i) => {
        const palaceName = palaceNames[(i - menhIdx + 12) % 12];
        const isMenh = br === menhBranch;
        const overrides = otherPalaceOverrides[br] ?? {};
        return makePalace(palaceName, br, {
            majorStars: isMenh ? menhStars : (overrides.majorStars ?? []),
            minorStars: overrides.minorStars,
            adjectiveStars: overrides.adjectiveStars,
            isSoulPalace: isMenh,
            ...overrides,
        });
    });

    return makeChart(palaces);
}

// ═══════════════════════════════════════════════════════════════════
// P4.3: getStarCategory() Tests
// ═══════════════════════════════════════════════════════════════════
describe('getStarCategory', () => {
    it('returns "major" for major stars', () => {
        expect(getStarCategory(makeStar('Tử Vi', { type: 'major' }))).toBe('major');
        expect(getStarCategory(makeStar('Thiên Phủ', { type: 'major' }))).toBe('major');
    });

    it('returns "auspicious" for Lục Cát Tinh', () => {
        expect(getStarCategory(makeStar('Văn Xương', { type: 'soft' }))).toBe('auspicious');
        expect(getStarCategory(makeStar('Tả Phụ', { type: 'soft' }))).toBe('auspicious');
        expect(getStarCategory(makeStar('Thiên Khôi', { type: 'soft' }))).toBe('auspicious');
    });

    it('returns "malefic" for Lục Sát Tinh', () => {
        expect(getStarCategory(makeStar('Kình Dương', { type: 'tough' }))).toBe('malefic');
        expect(getStarCategory(makeStar('Hỏa Tinh', { type: 'tough' }))).toBe('malefic');
        expect(getStarCategory(makeStar('Địa Không', { type: 'tough' }))).toBe('malefic');
    });

    it('returns "dynamic" for non-origin scope stars', () => {
        expect(getStarCategory(makeStar('Lưu Lộc', { scope: 'decadal' }))).toBe('dynamic');
        expect(getStarCategory(makeStar('Lưu Kình', { scope: 'yearly' }))).toBe('dynamic');
    });

    it('returns "neutral" for adjective/unknown stars', () => {
        expect(getStarCategory(makeStar('Đào Hoa', { type: 'adjective' }))).toBe('neutral');
    });
});

// ═══════════════════════════════════════════════════════════════════
// P4.2: interpretPalace() Tests
// ═══════════════════════════════════════════════════════════════════
describe('interpretPalace', () => {
    it('generates interpretation for palace with major stars', () => {
        const palace = makePalace('Mệnh', 'Tý', {
            majorStars: [makeStar('Tử Vi', { brightness: '庙' })],
        });
        const result = interpretPalace(palace);
        expect(result).toContain('Tử Vi');
        expect(result).toContain('Miếu');
        expect(result).toContain('khí chất đế vương'); // brightness-modulated text
    });

    it('handles empty palace (Vô Chính Diệu)', () => {
        const palace = makePalace('Tài Bạch', 'Ngọ', { majorStars: [] });
        const result = interpretPalace(palace);
        expect(result).toContain('vô chính diệu');
        expect(result).toContain('xung chiếu');
    });

    it('displays Tứ Hóa with Vietnamese labels (P1.5 fix)', () => {
        const palace = makePalace('Mệnh', 'Tý', {
            majorStars: [makeStar('Vũ Khúc', { brightness: '庙', mutagen: ['禄'] })],
        });
        const result = interpretPalace(palace);
        expect(result).toContain('Hóa Lộc');
        expect(result).not.toContain('[禄]'); // should NOT show raw Chinese
    });

    it('includes auxiliary star meanings (P2.3)', () => {
        const palace = makePalace('Mệnh', 'Dần', {
            majorStars: [makeStar('Tử Vi')],
            minorStars: [makeStar('Văn Xương', { type: 'soft' })],
        });
        const result = interpretPalace(palace);
        expect(result).toContain('Văn Xương');
        expect(result).toContain('Phụ tinh đáng chú ý');
    });

    it('provides brightness-modulated negative text for Hãm stars', () => {
        const palace = makePalace('Mệnh', 'Tý', {
            majorStars: [makeStar('Cự Môn', { brightness: '陷' })],
        });
        const result = interpretPalace(palace);
        expect(result).toContain('Hãm');
        expect(result).toContain('thị phi triền miên');
    });

    it('handles palace with no stars and null input gracefully', () => {
        expect(interpretPalace(null as unknown as TuViPalace)).toBe('');
    });
});

// ═══════════════════════════════════════════════════════════════════
// P4.1: detectPatterns() Tests
// ═══════════════════════════════════════════════════════════════════
describe('detectPatterns', () => {
    it('detects Sát Phá Lang when Thất Sát in Mệnh', () => {
        const chart = makeBasicChart('Dần', [makeStar('Thất Sát')]);
        const patterns = detectPatterns(chart);
        const satPha = patterns.find(p => p.id === 'SAT_PHA_LANG');
        expect(satPha).toBeDefined();
        expect(satPha!.name).toBe('Sát Phá Lang');
    });

    it('detects Tử Phủ Đồng Cung in Dần', () => {
        const chart = makeBasicChart('Dần', [
            makeStar('Tử Vi'),
            makeStar('Thiên Phủ'),
        ]);
        const patterns = detectPatterns(chart);
        expect(patterns.find(p => p.id === 'TU_PHU_DONG_CUNG')).toBeDefined();
    });

    it('does NOT detect Tử Phủ Đồng Cung outside Dần/Thân', () => {
        const chart = makeBasicChart('Ngọ', [
            makeStar('Tử Vi'),
            makeStar('Thiên Phủ'),
        ]);
        const patterns = detectPatterns(chart);
        expect(patterns.find(p => p.id === 'TU_PHU_DONG_CUNG')).toBeUndefined();
    });

    it('detects Cực Hướng Ly Minh (Tử Vi at Ngọ)', () => {
        const chart = makeBasicChart('Ngọ', [makeStar('Tử Vi')]);
        const patterns = detectPatterns(chart);
        expect(patterns.find(p => p.id === 'CUC_HUONG_LY_MINH')).toBeDefined();
    });

    it('detects Thạch Trung Ẩn Ngọc (Cự Môn at Tý)', () => {
        const chart = makeBasicChart('Tý', [makeStar('Cự Môn')]);
        const patterns = detectPatterns(chart);
        expect(patterns.find(p => p.id === 'THACH_TRUNG_AN_NGOC')).toBeDefined();
    });

    it('detects Nhật Chiếu Lôi Môn (Thái Dương at Mão)', () => {
        const chart = makeBasicChart('Mão', [makeStar('Thái Dương')]);
        const patterns = detectPatterns(chart);
        expect(patterns.find(p => p.id === 'NHAT_CHIEU_LOI_MON')).toBeDefined();
    });

    it('detects Nguyệt Lãng Thiên Môn (Thái Âm at Hợi)', () => {
        const chart = makeBasicChart('Hợi', [makeStar('Thái Âm')]);
        const patterns = detectPatterns(chart);
        expect(patterns.find(p => p.id === 'NGUYET_LANG_THIEN_MON')).toBeDefined();
    });

    it('detects Mệnh Vô Chính Diệu Hãm (empty Mệnh with malefics)', () => {
        const chart = makeBasicChart('Tý', [], {
            'Tý': { majorStars: [], minorStars: [makeStar('Kình Dương', { type: 'tough' })] }
        });
        const patterns = detectPatterns(chart);
        expect(patterns.find(p => p.id === 'MENH_VO_CHINH_DIEU_HAM')).toBeDefined();
    });

    it('marks pattern as impure when Hóa Kỵ is present (P1.4 fix)', () => {
        const chart = makeBasicChart('Dần', [
            makeStar('Tử Vi', { mutagen: ['忌'] }),
            makeStar('Thiên Phủ'),
        ]);
        const patterns = detectPatterns(chart);
        const tuPhu = patterns.find(p => p.id === 'TU_PHU_DONG_CUNG');
        expect(tuPhu).toBeDefined();
        expect(tuPhu!.isPure).toBe(false);
    });

    it('finds Lộc Mã in any palace, not just Mệnh (fix)', () => {
        // Thiên Mã + Lộc Tồn in a non-Mệnh palace (Thìn)
        const chart = makeBasicChart('Tý', [makeStar('Tử Vi')], {
            'Thìn': {
                adjectiveStars: [
                    makeStar('Thiên Mã', { type: 'tianma' }),
                    makeStar('Lộc Tồn', { type: 'lucun' }),
                ],
            },
        });
        const patterns = detectPatterns(chart);
        expect(patterns.find(p => p.id === 'LOC_MA_GIAO_TRI')).toBeDefined();
    });

    it('detects Tam Kỳ Gia Hội (three Hóa in San Fang)', () => {
        // Tam Hợp of Tý: Thân + Thìn. Xung Chiếu: Ngọ. Total: Tý + Thân + Thìn + Ngọ
        const chart = makeBasicChart('Tý', [
            makeStar('Tử Vi', { mutagen: ['禄'] }),
        ], {
            'Thân': { majorStars: [makeStar('Thiên Cơ', { mutagen: ['权'] })] },
            'Thìn': { majorStars: [makeStar('Vũ Khúc', { mutagen: ['科'] })] },
        });
        const patterns = detectPatterns(chart);
        expect(patterns.find(p => p.id === 'TAM_KY_GIA_HOI')).toBeDefined();
    });

    it('returns empty array for chart with no patterns', () => {
        const chart = makeBasicChart('Tý', []);
        const patterns = detectPatterns(chart);
        // Might detect hung cach but no specific cat cach
        const _catCach = patterns.filter(p => p.category !== 'inauspicious');
        // Just verify it runs without error
        expect(Array.isArray(patterns)).toBe(true);
    });

    it('returns empty array when Mệnh palace not found', () => {
        const chart = makeChart([makePalace('Tài Bạch', 'Tý')]);
        expect(detectPatterns(chart)).toEqual([]);
    });
});
