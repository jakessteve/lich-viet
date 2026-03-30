/**
 * US_MH_D01, US_MH_D02, US_MH_D03, US_MH_D04 — Data Integrity Tests
 *
 * Verifies that all Mai Hoa static data files:
 * - Have the correct number of entries
 * - Contain no orphan references
 * - Match the TypeScript interfaces
 * - Are internally consistent
 */
// Jest globals (describe, it, expect) provided by test runner
import trigrams from '../../src/data/phase_2/trigrams.json';
import hexagrams from '../../src/data/phase_2/hexagrams.json';
import nguHanhInteraction from '../../src/data/phase_2/nguHanhInteraction.json';
import type {
    Trigram,
    Hexagram,
    NguHanh,
    NguHanhRelation,
    ElementStrength,
    TrigramNature,
} from '../../src/types/maiHoa';

// ── Type Guards / Constants ──────────────────────────────────
const VALID_ELEMENTS: NguHanh[] = ['Kim', 'Thủy', 'Mộc', 'Hỏa', 'Thổ'];
const VALID_NATURES: TrigramNature[] = ['Thiên', 'Địa', 'Lôi', 'Phong', 'Thủy', 'Hỏa', 'Sơn', 'Trạch'];
const VALID_RELATIONS: NguHanhRelation[] = ['Sinh', 'Khắc', 'Bị Sinh', 'Bị Khắc', 'Tỷ Hòa'];
const VALID_STRENGTHS: ElementStrength[] = ['Vượng', 'Tướng', 'Hưu', 'Tù', 'Tử'];
const VALID_SEASONS = ['Xuân', 'Hạ', 'Thu', 'Đông'];

// ── US_MH_D01: Trigrams ──────────────────────────────────────
describe('US_MH_D01: Trigram Data (trigrams.json)', () => {
    const trigramData = trigrams as unknown as Trigram[];

    it('should contain exactly 8 trigrams', () => {
        expect(trigramData).toHaveLength(8);
    });

    it('should have Tiên Thiên Bát Quái IDs 1–8', () => {
        const ids = trigramData.map((t) => t.id).sort((a, b) => a - b);
        expect(ids).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it('should have unique IDs', () => {
        const ids = new Set(trigramData.map((t) => t.id));
        expect(ids.size).toBe(8);
    });

    it('should have unique names', () => {
        const names = new Set(trigramData.map((t) => t.name));
        expect(names.size).toBe(8);
    });

    it('each trigram should have a valid Ngũ Hành element', () => {
        for (const t of trigramData) {
            expect(VALID_ELEMENTS).toContain(t.element);
        }
    });

    it('each trigram should have a valid nature', () => {
        for (const t of trigramData) {
            expect(VALID_NATURES).toContain(t.nature);
        }
    });

    it('each trigram should have exactly 3 boolean lines', () => {
        for (const t of trigramData) {
            expect(t.lines).toHaveLength(3);
            for (const line of t.lines) {
                expect(typeof line).toBe('boolean');
            }
        }
    });

    it('should have correct Tiên Thiên Bát Quái ordering', () => {
        const expected = ['Càn', 'Đoài', 'Ly', 'Chấn', 'Tốn', 'Khảm', 'Cấn', 'Khôn'];
        for (let i = 0; i < expected.length; i++) {
            expect(trigramData[i].name).toBe(expected[i]);
            expect(trigramData[i].id).toBe(i + 1);
        }
    });

    it('Càn should be all-Dương (3 solid lines) and Khôn all-Âm (3 broken lines)', () => {
        const can = trigramData.find((t) => t.name === 'Càn')!;
        expect(can.lines).toEqual([true, true, true]);

        const khon = trigramData.find((t) => t.name === 'Khôn')!;
        expect(khon.lines).toEqual([false, false, false]);
    });

    it('should have correct line patterns for all 8 trigrams', () => {
        const patterns: Record<string, readonly [boolean, boolean, boolean]> = {
            'Càn': [true, true, true],       // ☰
            'Đoài': [true, true, false],      // ☱
            'Ly': [true, false, true],         // ☲
            'Chấn': [true, false, false],      // ☳
            'Tốn': [false, true, true],        // ☴
            'Khảm': [false, true, false],      // ☵
            'Cấn': [false, false, true],       // ☶
            'Khôn': [false, false, false],     // ☷
        };
        for (const t of trigramData) {
            expect(t.lines).toEqual(patterns[t.name]);
        }
    });

    it('should have correct element assignments', () => {
        const expected: Record<string, NguHanh> = {
            'Càn': 'Kim', 'Đoài': 'Kim',
            'Ly': 'Hỏa',
            'Chấn': 'Mộc', 'Tốn': 'Mộc',
            'Khảm': 'Thủy',
            'Cấn': 'Thổ', 'Khôn': 'Thổ',
        };
        for (const t of trigramData) {
            expect(t.element).toBe(expected[t.name]);
        }
    });
});

// ── US_MH_D02: Hexagrams ──────────────────────────────────────
describe('US_MH_D02: Hexagram Data (hexagrams.json)', () => {
    const hexagramData = hexagrams as Hexagram[];
    const validTrigramIds = new Set([1, 2, 3, 4, 5, 6, 7, 8]);

    it('should contain exactly 64 hexagrams', () => {
        expect(hexagramData).toHaveLength(64);
    });

    it('should have sequential IDs 1–64', () => {
        const ids = hexagramData.map((h) => h.id);
        expect(ids).toEqual(Array.from({ length: 64 }, (_, i) => i + 1));
    });

    it('should have unique IDs', () => {
        const ids = new Set(hexagramData.map((h) => h.id));
        expect(ids.size).toBe(64);
    });

    it('every upper trigram ID should map to a valid trigram (1–8)', () => {
        for (const h of hexagramData) {
            expect(validTrigramIds.has(h.upper)).toBe(true);
        }
    });

    it('every lower trigram ID should map to a valid trigram (1–8)', () => {
        for (const h of hexagramData) {
            expect(validTrigramIds.has(h.lower)).toBe(true);
        }
    });

    it('every hexagram should have a non-empty name', () => {
        for (const h of hexagramData) {
            expect(h.name.trim().length).toBeGreaterThan(0);
        }
    });

    it('every hexagram should have a non-empty meaning', () => {
        for (const h of hexagramData) {
            expect(h.meaning.trim().length).toBeGreaterThan(0);
        }
    });

    it('every hexagram should have a non-empty image', () => {
        for (const h of hexagramData) {
            expect(h.image.trim().length).toBeGreaterThan(0);
        }
    });

    it('the 8 pure (doubled) hexagrams should exist', () => {
        const pureHexagrams = hexagramData.filter((h) => h.upper === h.lower);
        expect(pureHexagrams.length).toBe(8);
    });

    it('Hexagram #1 (Thuần Càn) should have upper=1, lower=1', () => {
        const h = hexagramData[0];
        expect(h.name).toBe('Thuần Càn');
        expect(h.upper).toBe(1);
        expect(h.lower).toBe(1);
    });

    it('Hexagram #2 (Thuần Khôn) should have upper=8, lower=8', () => {
        const h = hexagramData[1];
        expect(h.name).toBe('Thuần Khôn');
        expect(h.upper).toBe(8);
        expect(h.lower).toBe(8);
    });

    it('every upper+lower combination should be resolvable via trigrams lookup', () => {
        const trigramMap = new Map((trigrams as unknown as Trigram[]).map((t: Trigram) => [t.id, t]));
        for (const h of hexagramData) {
            expect(trigramMap.has(h.upper)).toBe(true);
            expect(trigramMap.has(h.lower)).toBe(true);
        }
    });
});

// ── US_MH_D03: Ngũ Hành Interaction ──────────────────────────
describe('US_MH_D03: Ngũ Hành Interaction (nguHanhInteraction.json)', () => {
    const data = nguHanhInteraction as {
        interactionMatrix: Record<string, Record<string, string>>;
        seasonalStrength: Record<string, Record<string, string>>;
    };

    describe('Interaction Matrix', () => {
        it('should have entries for all 5 elements', () => {
            for (const el of VALID_ELEMENTS) {
                expect(data.interactionMatrix).toHaveProperty(el);
            }
        });

        it('should be a complete 5×5 matrix', () => {
            for (const source of VALID_ELEMENTS) {
                for (const target of VALID_ELEMENTS) {
                    expect(data.interactionMatrix[source]).toHaveProperty(target);
                }
            }
        });

        it('every value should be a valid NguHanhRelation', () => {
            for (const source of VALID_ELEMENTS) {
                for (const target of VALID_ELEMENTS) {
                    expect(VALID_RELATIONS).toContain(data.interactionMatrix[source][target]);
                }
            }
        });

        it('diagonal should be Tỷ Hòa (same element)', () => {
            for (const el of VALID_ELEMENTS) {
                expect(data.interactionMatrix[el][el]).toBe('Tỷ Hòa');
            }
        });

        it('Sinh cycle should be correct: Kim→Thủy→Mộc→Hỏa→Thổ→Kim', () => {
            const cycle: [string, string][] = [
                ['Kim', 'Thủy'],
                ['Thủy', 'Mộc'],
                ['Mộc', 'Hỏa'],
                ['Hỏa', 'Thổ'],
                ['Thổ', 'Kim'],
            ];
            for (const [source, target] of cycle) {
                expect(data.interactionMatrix[source][target]).toBe('Sinh');
            }
        });

        it('Khắc cycle should be correct: Kim→Mộc→Thổ→Thủy→Hỏa→Kim', () => {
            const cycle: [string, string][] = [
                ['Kim', 'Mộc'],
                ['Mộc', 'Thổ'],
                ['Thổ', 'Thủy'],
                ['Thủy', 'Hỏa'],
                ['Hỏa', 'Kim'],
            ];
            for (const [source, target] of cycle) {
                expect(data.interactionMatrix[source][target]).toBe('Khắc');
            }
        });

        it('Sinh and Bị Sinh should be symmetric inverses', () => {
            for (const source of VALID_ELEMENTS) {
                for (const target of VALID_ELEMENTS) {
                    if (data.interactionMatrix[source][target] === 'Sinh') {
                        expect(data.interactionMatrix[target][source]).toBe('Bị Sinh');
                    }
                }
            }
        });

        it('Khắc and Bị Khắc should be symmetric inverses', () => {
            for (const source of VALID_ELEMENTS) {
                for (const target of VALID_ELEMENTS) {
                    if (data.interactionMatrix[source][target] === 'Khắc') {
                        expect(data.interactionMatrix[target][source]).toBe('Bị Khắc');
                    }
                }
            }
        });
    });

    describe('Seasonal Strength', () => {
        it('should have entries for all 5 elements', () => {
            for (const el of VALID_ELEMENTS) {
                expect(data.seasonalStrength).toHaveProperty(el);
            }
        });

        it('should have entries for all 4 seasons per element', () => {
            for (const el of VALID_ELEMENTS) {
                for (const season of VALID_SEASONS) {
                    expect(data.seasonalStrength[el]).toHaveProperty(season);
                }
            }
        });

        it('every value should be a valid ElementStrength', () => {
            for (const el of VALID_ELEMENTS) {
                for (const season of VALID_SEASONS) {
                    expect(VALID_STRENGTHS).toContain(data.seasonalStrength[el][season]);
                }
            }
        });

        it('each element should be Vượng in its own season', () => {
            const elementSeason: Record<string, string> = {
                'Mộc': 'Xuân',
                'Hỏa': 'Hạ',
                'Kim': 'Thu',
                'Thủy': 'Đông',
                'Thổ': 'Thu',
            };
            for (const [el, season] of Object.entries(elementSeason)) {
                expect(data.seasonalStrength[el][season]).toBe('Vượng');
            }
        });
    });
});

// ── US_MH_D04: TypeScript Interface Compatibility ─────────────
describe('US_MH_D04: TypeScript Interface Shape Validation', () => {
    it('Trigram data should satisfy the Trigram interface shape', () => {
        const t = trigrams[0] as unknown as Trigram;
        expect(typeof t.id).toBe('number');
        expect(typeof t.name).toBe('string');
        expect(typeof t.element).toBe('string');
        expect(Array.isArray(t.lines)).toBe(true);
        expect(typeof t.nature).toBe('string');
    });

    it('Hexagram data should satisfy the Hexagram interface shape', () => {
        const h = hexagrams[0] as Hexagram;
        expect(typeof h.id).toBe('number');
        expect(typeof h.name).toBe('string');
        expect(typeof h.upper).toBe('number');
        expect(typeof h.lower).toBe('number');
        expect(typeof h.meaning).toBe('string');
        expect(typeof h.image).toBe('string');
    });

    it('NguHanhInteraction data should satisfy the expected shape', () => {
        expect(typeof nguHanhInteraction.interactionMatrix).toBe('object');
        expect(typeof nguHanhInteraction.seasonalStrength).toBe('object');
    });
});

// ── US_MH_D05: Enriched Classical Texts Validation ────────────
describe('US_MH_D05: Enriched Classical Texts Validation', () => {
    const hexagramData = hexagrams as Hexagram[];

    it('hexagrams with haoTexts should have exactly 6 entries with positions 1-6', () => {
        const enrichedHexagrams = hexagramData.filter(h => h.haoTexts && h.haoTexts.length > 0);

        for (const h of enrichedHexagrams) {
            expect(h.haoTexts).toBeDefined();
            expect(h.haoTexts).toHaveLength(6);

            const positions = h.haoTexts!.map(hao => hao.position).sort((a, b) => a - b);
            expect(positions).toEqual([1, 2, 3, 4, 5, 6]);
        }
    });

    it('hexagrams with thoanTu should have both original and meaning strings', () => {
        const hexagramsWithThoanTu = hexagramData.filter(h => h.thoanTu);

        for (const h of hexagramsWithThoanTu) {
            expect(h.thoanTu).toBeDefined();
            expect(typeof h.thoanTu!.original).toBe('string');
            expect(h.thoanTu!.original.length).toBeGreaterThan(0);
            expect(typeof h.thoanTu!.meaning).toBe('string');
            expect(h.thoanTu!.meaning.length).toBeGreaterThan(0);
        }
    });
});
