// ── Mai Hoa Engine Unit Tests ──────────────────────────────────
// Epic 2: Hexagram Calculation Engine — Phase 2
// Tests cover US_MH_01 through US_MH_05 plus the orchestrator.
import { beforeAll } from 'vitest';
import {
    getHourChiIndex,
    getYearChiIndex,
    buildTimeBasedInput,
    calculateUpperTrigramFromTime,
    calculateLowerTrigramFromTime,
    calculateUpperTrigramFromNumbers,
    calculateLowerTrigramFromNumbers,
    calculateMovingLineFromTime,
    calculateMovingLineFromNumbers,
    getMainHexagram,
    getMutualHexagram,
    getChangedHexagram,
    determineTheDung,
    performTimeBasedDivination,
    performNumberBasedDivination,
    getTrigramById,
    findHexagram,
    expandHexagramLines,
    assertMaiHoaChiIndex,
    adjustDateForTyBoundary,
    resolveCungAndThe,
    deriveLucThan,
    resolveHaoDetails,
    ensureHexagramsLoaded,
} from '../../src/utils/maiHoaEngine';

beforeAll(async () => {
    await ensureHexagramsLoaded();
});

import type { TimeBasedInput, NumberBasedInput } from '../../src/types/maiHoa';

// ================================================================
// US_MH_01: Time-based Setup
// ================================================================
describe('US_MH_01: Time-based Setup', () => {
    describe('getHourChiIndex', () => {
        it('maps hour 23 to Tý (index 1)', () => {
            expect(getHourChiIndex(23)).toBe(1);
        });

        it('maps hour 0 to Tý (index 1)', () => {
            expect(getHourChiIndex(0)).toBe(1);
        });

        it('maps hours 1,2 to Sửu (index 2)', () => {
            expect(getHourChiIndex(1)).toBe(2);
            expect(getHourChiIndex(2)).toBe(2);
        });

        it('maps hours 3,4 to Dần (index 3)', () => {
            expect(getHourChiIndex(3)).toBe(3);
            expect(getHourChiIndex(4)).toBe(3);
        });

        it('maps hours 5,6 to Mão (index 4)', () => {
            expect(getHourChiIndex(5)).toBe(4);
            expect(getHourChiIndex(6)).toBe(4);
        });

        it('maps hours 11,12 to Ngọ (index 7)', () => {
            expect(getHourChiIndex(11)).toBe(7);
            expect(getHourChiIndex(12)).toBe(7);
        });

        it('maps hours 21,22 to Hợi (index 12)', () => {
            expect(getHourChiIndex(21)).toBe(12);
            expect(getHourChiIndex(22)).toBe(12);
        });

        it('throws on invalid hour', () => {
            expect(() => getHourChiIndex(-1)).toThrow(RangeError);
            expect(() => getHourChiIndex(24)).toThrow(RangeError);
        });
    });

    describe('getYearChiIndex', () => {
        it('maps year 2024 (Thìn) to index 5', () => {
            expect(getYearChiIndex(2024)).toBe(5);
        });

        it('maps year 2026 (Ngọ) to index 7', () => {
            expect(getYearChiIndex(2026)).toBe(7);
        });

        it('maps year 2025 (Tỵ) to index 6', () => {
            expect(getYearChiIndex(2025)).toBe(6);
        });

        it('maps year 2020 (Tý) to index 1', () => {
            expect(getYearChiIndex(2020)).toBe(1);
        });

        it('maps year 2031 (Hợi) to index 12', () => {
            expect(getYearChiIndex(2031)).toBe(12);
        });
    });

    describe('buildTimeBasedInput', () => {
        it('builds correct input for 2026 Feb 1 at noon', () => {
            const input = buildTimeBasedInput(2026, 1, 15, 12);
            expect(input.yearChiIndex).toBe(7);      // Ngọ
            expect(input.lunarMonth).toBe(1);
            expect(input.lunarDay).toBe(15);
            expect(input.hourChiIndex).toBe(7);       // Ngọ hour (11-13)
        });
    });
});

// ================================================================
// US_MH_02: Trigram Calculation
// ================================================================
describe('US_MH_02: Trigram Calculation', () => {
    describe('getTrigramById', () => {
        it('returns Càn for id 1', () => {
            const t = getTrigramById(1);
            expect(t.name).toBe('Càn');
            expect(t.element).toBe('Kim');
        });

        it('returns Khôn for id 8', () => {
            const t = getTrigramById(8);
            expect(t.name).toBe('Khôn');
            expect(t.element).toBe('Thổ');
        });

        it('throws for invalid id 0', () => {
            expect(() => getTrigramById(0)).toThrow(RangeError);
        });

        it('throws for invalid id 9', () => {
            expect(() => getTrigramById(9)).toThrow(RangeError);
        });
    });

    describe('calculateUpperTrigramFromTime', () => {
        it('computes correctly with known values', () => {
            // Example: yearChi=7, month=1, day=15
            // sum = 7 + 1 + 15 = 23. 23 % 8 = 7 → Cấn
            const input: TimeBasedInput = { yearChiIndex: 7, lunarMonth: 1, lunarDay: 15, hourChiIndex: 1 };
            const trigram = calculateUpperTrigramFromTime(input);
            expect(trigram.id).toBe(7);
            expect(trigram.name).toBe('Cấn');
        });

        it('remainder 0 maps to Khôn (8)', () => {
            // sum = 8. 8 % 8 = 0 → Khôn (8)
            const input: TimeBasedInput = { yearChiIndex: 1, lunarMonth: 1, lunarDay: 6, hourChiIndex: 1 };
            const trigram = calculateUpperTrigramFromTime(input);
            expect(trigram.id).toBe(8);
            expect(trigram.name).toBe('Khôn');
        });
    });

    describe('calculateLowerTrigramFromTime', () => {
        it('computes correctly with known values', () => {
            // yearChi=7, month=1, day=15, hourChi=1
            // sum = 7 + 1 + 15 + 1 = 24. 24 % 8 = 0 → Khôn (8)
            const input: TimeBasedInput = { yearChiIndex: 7, lunarMonth: 1, lunarDay: 15, hourChiIndex: 1 };
            const trigram = calculateLowerTrigramFromTime(input);
            expect(trigram.id).toBe(8);
            expect(trigram.name).toBe('Khôn');
        });
    });

    describe('number-based trigram calculation', () => {
        it('calculates upper trigram from numbers', () => {
            // num1 = 5. 5 % 8 = 5 → Tốn
            const input: NumberBasedInput = { num1: 5, num2: 10 };
            const trigram = calculateUpperTrigramFromNumbers(input);
            expect(trigram.id).toBe(5);
            expect(trigram.name).toBe('Tốn');
        });

        it('calculates lower trigram from numbers', () => {
            // num2 = 10. 10 % 8 = 2 → Đoài
            const input: NumberBasedInput = { num1: 5, num2: 10 };
            const trigram = calculateLowerTrigramFromNumbers(input);
            expect(trigram.id).toBe(2);
            expect(trigram.name).toBe('Đoài');
        });

        it('remainder 0 maps to Khôn', () => {
            const input: NumberBasedInput = { num1: 16, num2: 24 };
            expect(calculateUpperTrigramFromNumbers(input).id).toBe(8);
            expect(calculateLowerTrigramFromNumbers(input).id).toBe(8);
        });
    });
});

// ================================================================
// US_MH_03: Moving Line Calculation
// ================================================================
describe('US_MH_03: Moving Line Calculation', () => {
    describe('calculateMovingLineFromTime', () => {
        it('computes moving line correctly', () => {
            // sum = 7+1+15+1 = 24. 24 % 6 = 0 → line 6
            const input: TimeBasedInput = { yearChiIndex: 7, lunarMonth: 1, lunarDay: 15, hourChiIndex: 1 };
            expect(calculateMovingLineFromTime(input)).toBe(6);
        });

        it('computes non-zero remainder correctly', () => {
            // sum = 7+1+15+3 = 26. 26 % 6 = 2 → line 2
            const input: TimeBasedInput = { yearChiIndex: 7, lunarMonth: 1, lunarDay: 15, hourChiIndex: 3 };
            expect(calculateMovingLineFromTime(input)).toBe(2);
        });
    });

    describe('calculateMovingLineFromNumbers', () => {
        it('computes moving line from numbers', () => {
            // sum = 5 + 10 = 15. 15 % 6 = 3 → line 3
            const input: NumberBasedInput = { num1: 5, num2: 10 };
            expect(calculateMovingLineFromNumbers(input)).toBe(3);
        });

        it('remainder 0 maps to line 6', () => {
            const input: NumberBasedInput = { num1: 6, num2: 12 };
            expect(calculateMovingLineFromNumbers(input)).toBe(6);
        });
    });
});

// ================================================================
// US_MH_04: Hexagram Generation
// ================================================================
describe('US_MH_04: Hexagram Generation', () => {
    describe('findHexagram', () => {
        it('finds Thuần Càn (upper=1, lower=1)', () => {
            const hex = findHexagram(1, 1);
            expect(hex.id).toBe(1);
            expect(hex.name).toBe('Thuần Càn');
        });

        it('finds Thuần Khôn (upper=8, lower=8)', () => {
            const hex = findHexagram(8, 8);
            expect(hex.id).toBe(2);
            expect(hex.name).toBe('Thuần Khôn');
        });

        it('throws for non-existent combination', () => {
            expect(() => findHexagram(0, 0)).toThrow(RangeError);
        });
    });

    describe('expandHexagramLines', () => {
        it('expands Thuần Càn to 6 solid lines', () => {
            const lines = expandHexagramLines(1, 1);
            expect(lines).toEqual([true, true, true, true, true, true]);
        });

        it('expands Thuần Khôn to 6 broken lines', () => {
            const lines = expandHexagramLines(8, 8);
            expect(lines).toEqual([false, false, false, false, false, false]);
        });

        it('expands Thủy Hỏa Ký Tế (Khảm upper, Ly lower)', () => {
            // Ly: [true, false, true], Khảm: [false, true, false]
            // Lines: [true, false, true, false, true, false]
            const hex = findHexagram(6, 3); // upper=Khảm, lower=Ly
            const lines = expandHexagramLines(hex.upper, hex.lower);
            expect(lines).toEqual([true, false, true, false, true, false]);
        });
    });

    describe('getMainHexagram', () => {
        it('returns correct hexagram for Càn + Khôn', () => {
            const upper = getTrigramById(1); // Càn
            const lower = getTrigramById(8); // Khôn
            const hex = getMainHexagram(upper, lower);
            expect(hex.name).toBe('Thiên Địa Bĩ');
        });
    });

    describe('getMutualHexagram', () => {
        it('computes Quẻ Hổ for Thiên Địa Bĩ correctly', () => {
            // Thiên Địa Bĩ: upper=Càn(111), lower=Khôn(000)
            // Lines: [0,0,0,1,1,1] (0=false, 1=true)
            // Hổ lower: lines 2,3,4 → [0,0,1] = Cấn(7)
            // Hổ upper: lines 3,4,5 → [0,1,1] = Tốn(5)
            // Expected: Phong Sơn Tiệm (upper=Tốn, lower=Cấn)
            const mainHex = findHexagram(1, 8); // Thiên Địa Bĩ
            const mutual = getMutualHexagram(mainHex);
            expect(mutual.upper).toBe(5); // Tốn
            expect(mutual.lower).toBe(7); // Cấn
            expect(mutual.name).toBe('Phong Sơn Tiệm');
        });

        it('computes Quẻ Hổ for Thuần Càn (all yang)', () => {
            // Lines: [1,1,1,1,1,1]
            // Hổ lower: lines 2,3,4 → [1,1,1] = Càn(1)
            // Hổ upper: lines 3,4,5 → [1,1,1] = Càn(1)
            // Expected: Thuần Càn
            const mainHex = findHexagram(1, 1);
            const mutual = getMutualHexagram(mainHex);
            expect(mutual.name).toBe('Thuần Càn');
        });
    });

    describe('getChangedHexagram', () => {
        it('inverts line 1 of Thuần Càn', () => {
            // Lines: [T,T,T,T,T,T] → invert line 1 → [F,T,T,T,T,T]
            // Lower: [F,T,T] = Tốn(5), Upper: [T,T,T] = Càn(1)
            // Expected: Thiên Phong Cấu
            const mainHex = findHexagram(1, 1);
            const changed = getChangedHexagram(mainHex, 1);
            expect(changed.name).toBe('Thiên Phong Cấu');
        });

        it('inverts line 6 of Thuần Càn', () => {
            // Lines: [T,T,T,T,T,T] → invert line 6 → [T,T,T,T,T,F]
            // Lower: [T,T,T] = Càn(1), Upper: [T,T,F] = Đoài(2)
            // Expected: Trạch Thiên Quải
            const mainHex = findHexagram(1, 1);
            const changed = getChangedHexagram(mainHex, 6);
            expect(changed.name).toBe('Trạch Thiên Quải');
        });

        it('inverts line 4 of Thuần Khôn', () => {
            // Lines: [F,F,F,F,F,F] → invert line 4 → [F,F,F,T,F,F]
            // Lower: [F,F,F] = Khôn(8), Upper: [T,F,F] = Chấn(4)
            // Expected: Lôi Địa Dự
            const mainHex = findHexagram(8, 8);
            const changed = getChangedHexagram(mainHex, 4);
            expect(changed.name).toBe('Lôi Địa Dự');
        });

        it('throws on invalid moving line', () => {
            const mainHex = findHexagram(1, 1);
            expect(() => getChangedHexagram(mainHex, 0)).toThrow(RangeError);
            expect(() => getChangedHexagram(mainHex, 7)).toThrow(RangeError);
        });
    });
});

// ================================================================
// US_MH_05: Thể and Dụng
// ================================================================
describe('US_MH_05: Thể and Dụng Determination', () => {
    it('moving line 1 → upper is Thể, lower is Dụng', () => {
        const result = determineTheDung(1);
        expect(result.theTrigram).toBe('upper');
        expect(result.dungTrigram).toBe('lower');
    });

    it('moving line 3 → upper is Thể, lower is Dụng', () => {
        const result = determineTheDung(3);
        expect(result.theTrigram).toBe('upper');
        expect(result.dungTrigram).toBe('lower');
    });

    it('moving line 4 → lower is Thể, upper is Dụng', () => {
        const result = determineTheDung(4);
        expect(result.theTrigram).toBe('lower');
        expect(result.dungTrigram).toBe('upper');
    });

    it('moving line 6 → lower is Thể, upper is Dụng', () => {
        const result = determineTheDung(6);
        expect(result.theTrigram).toBe('lower');
        expect(result.dungTrigram).toBe('upper');
    });

    it('throws on invalid moving line', () => {
        expect(() => determineTheDung(0)).toThrow(RangeError);
        expect(() => determineTheDung(7)).toThrow(RangeError);
    });
});

// ================================================================
// Orchestrator: Full Divination Flow
// ================================================================
describe('Orchestrator: performTimeBasedDivination', () => {
    it('produces a valid DivinationResult with known input', () => {
        // Scenario: Year Chi=7(Ngọ), Month=1, Day=15, Hour Chi=7(Ngọ)
        // Upper: (7+1+15) % 8 = 23 % 8 = 7 → Cấn
        // Lower: (7+1+15+7) % 8 = 30 % 8 = 6 → Khảm
        // Main Hex: upper=Cấn(7), lower=Khảm(6) → Sơn Thủy Mông (wait, let me check)
        // Looking up: Cấn upper + Khảm lower → id=4 "Sơn Thủy Mông"
        // Moving: (7+1+15+7) % 6 = 30 % 6 = 0 → 6
        // Moving line 6 → upper trigram has change → Dụng=upper, Thể=lower
        // Thể element: Khảm = Thủy
        // Dụng element: Cấn = Thổ

        const input: TimeBasedInput = { yearChiIndex: 7, lunarMonth: 1, lunarDay: 15, hourChiIndex: 7 };
        const result = performTimeBasedDivination(input);

        expect(result.mainHexagram.name).toBe('Sơn Thủy Mông');
        expect(result.movingLine).toBe(6);
        expect(result.theTrigram).toBe('lower');
        expect(result.dungTrigram).toBe('upper');
        expect(result.elements.theElement).toBe('Thủy');
        expect(result.elements.dungElement).toBe('Thổ');

        // Validate mutual hexagram
        // Sơn Thủy Mông: upper=Cấn(001), lower=Khảm(010)
        // Lines: [0,1,0,0,0,1]
        // Hổ lower: lines 2,3,4 → [1,0,0] = Chấn(4)? Wait.
        // Cấn lines = [false, false, true], Khảm lines = [false, true, false]
        // Full lines (lower first): [false, true, false, false, false, true]
        // Hổ lower: indices 1,2,3 → [true, false, false] = Chấn(4)
        // Hổ upper: indices 2,3,4 → [false, false, false] = Khôn(8)
        // Mutual: upper=Khôn, lower=Chấn → Địa Lôi Phục (id=24)
        expect(result.mutualHexagram.name).toBe('Địa Lôi Phục');

        // Validate changed hexagram
        // Invert line 6 (index 5): [false, true, false, false, false, false]
        // Lower: [false, true, false] = Khảm(6), Upper: [false, false, false] = Khôn(8)
        // Changed: upper=Khôn, lower=Khảm → Địa Thủy Sư (id=7)
        expect(result.changedHexagram.name).toBe('Địa Thủy Sư');
    });
});

describe('Orchestrator: performNumberBasedDivination', () => {
    it('produces a valid DivinationResult with num1=5, num2=10', () => {
        // Upper: 5 % 8 = 5 → Tốn
        // Lower: 10 % 8 = 2 → Đoài
        // Main Hex: upper=Tốn(5), lower=Đoài(2) → Phong Trạch Trung Phu (id=61)
        // Moving: (5+10) % 6 = 15 % 6 = 3 → line 3
        // Line 3 ≤ 3 → Thể=upper, Dụng=lower
        // Thể element: Tốn = Mộc
        // Dụng element: Đoài = Kim

        const input: NumberBasedInput = { num1: 5, num2: 10 };
        const result = performNumberBasedDivination(input);

        expect(result.mainHexagram.name).toBe('Phong Trạch Trung Phu');
        expect(result.movingLine).toBe(3);
        expect(result.theTrigram).toBe('upper');
        expect(result.dungTrigram).toBe('lower');
        expect(result.elements.theElement).toBe('Mộc');
        expect(result.elements.dungElement).toBe('Kim');
    });
});

// ================================================================
// Edge Case: All Remainders
// ================================================================
describe('Edge Cases: Modulo Boundaries', () => {
    it('mod 8 remainder cycles through all 8 trigrams', () => {
        // Verify each remainder 1–8 maps to the correct trigram
        for (let i = 1; i <= 8; i++) {
            const input: NumberBasedInput = { num1: i, num2: 1 };
            const trigram = calculateUpperTrigramFromNumbers(input);
            expect(trigram.id).toBe(i);
        }
    });

    it('num1=8 maps to Khôn (remainder 0 → 8)', () => {
        const input: NumberBasedInput = { num1: 8, num2: 1 };
        const trigram = calculateUpperTrigramFromNumbers(input);
        expect(trigram.id).toBe(8);
        expect(trigram.name).toBe('Khôn');
    });

    it('mod 6 remainder cycles through all 6 lines', () => {
        for (let target = 1; target <= 6; target++) {
            const input: NumberBasedInput = { num1: target, num2: 0 };
            const movingLine = calculateMovingLineFromNumbers(input);
            const expected = target % 6 === 0 ? 6 : target % 6;
            expect(movingLine).toBe(expected);
        }
    });
});

// ================================================================
// TEST-02: Full 12-year Chi Cycle
// ================================================================
describe('Full Chi Cycle: getYearChiIndex', () => {
    it('should cycle through all 12 Chi indices for 12 consecutive years (2020-2031)', () => {
        // 2020=Tý(1), 2021=Sửu(2), ..., 2031=Hợi(12)
        for (let i = 0; i < 12; i++) {
            expect(getYearChiIndex(2020 + i)).toBe(i + 1);
        }
    });
});

// ================================================================
// TEST-03: buildTimeBasedInput Validation
// ================================================================
describe('Input Validation: buildTimeBasedInput', () => {
    it('throws on lunarMonth = 0', () => {
        expect(() => buildTimeBasedInput(2026, 0, 15, 12)).toThrow(RangeError);
    });

    it('throws on lunarMonth = 13', () => {
        expect(() => buildTimeBasedInput(2026, 13, 15, 12)).toThrow(RangeError);
    });

    it('throws on lunarDay = 0', () => {
        expect(() => buildTimeBasedInput(2026, 1, 0, 12)).toThrow(RangeError);
    });

    it('throws on lunarDay = 31', () => {
        expect(() => buildTimeBasedInput(2026, 1, 31, 12)).toThrow(RangeError);
    });

    it('accepts valid boundary values (month=1, day=1)', () => {
        const input = buildTimeBasedInput(2026, 1, 1, 0);
        expect(input.lunarMonth).toBe(1);
        expect(input.lunarDay).toBe(1);
    });

    it('accepts valid boundary values (month=12, day=30)', () => {
        const input = buildTimeBasedInput(2026, 12, 30, 23);
        expect(input.lunarMonth).toBe(12);
        expect(input.lunarDay).toBe(30);
    });
});

// ================================================================
// TEST-01: Number-based Input Validation
// ================================================================
describe('Input Validation: performNumberBasedDivination', () => {
    it('throws on num1 = 0', () => {
        expect(() => performNumberBasedDivination({ num1: 0, num2: 5 })).toThrow(RangeError);
    });

    it('throws on num2 = 0', () => {
        expect(() => performNumberBasedDivination({ num1: 5, num2: 0 })).toThrow(RangeError);
    });

    it('throws on negative num1', () => {
        expect(() => performNumberBasedDivination({ num1: -3, num2: 5 })).toThrow(RangeError);
    });

    it('throws on negative num2', () => {
        expect(() => performNumberBasedDivination({ num1: 5, num2: -7 })).toThrow(RangeError);
    });

    it('throws on floating point num1', () => {
        expect(() => performNumberBasedDivination({ num1: 3.7, num2: 5 })).toThrow(RangeError);
    });

    it('throws on floating point num2', () => {
        expect(() => performNumberBasedDivination({ num1: 5, num2: 2.5 })).toThrow(RangeError);
    });
});

// ================================================================
// Integration Risk Fixes
// ================================================================

// ── Risk 1: Chi Index Convention Guard ──────────────────────────
describe('Integration Risk 1: assertMaiHoaChiIndex', () => {
    it('accepts valid 1-based index 1 (Tý)', () => {
        expect(() => assertMaiHoaChiIndex(1, 'test')).not.toThrow();
    });

    it('accepts valid 1-based index 12 (Hợi)', () => {
        expect(() => assertMaiHoaChiIndex(12, 'test')).not.toThrow();
    });

    it('rejects 0-based index 0 (Phase 1 convention)', () => {
        expect(() => assertMaiHoaChiIndex(0, 'yearChiIndex')).toThrow(RangeError);
        expect(() => assertMaiHoaChiIndex(0, 'yearChiIndex')).toThrow(/1-based/);
    });

    it('rejects out-of-range index 13', () => {
        expect(() => assertMaiHoaChiIndex(13, 'hourChiIndex')).toThrow(RangeError);
    });

    it('rejects non-integer index', () => {
        expect(() => assertMaiHoaChiIndex(1.5, 'test')).toThrow(RangeError);
    });

    it('rejects negative index', () => {
        expect(() => assertMaiHoaChiIndex(-1, 'test')).toThrow(RangeError);
    });

    it('performTimeBasedDivination rejects yearChiIndex=0', () => {
        const input: TimeBasedInput = { yearChiIndex: 0, lunarMonth: 1, lunarDay: 1, hourChiIndex: 1 };
        expect(() => performTimeBasedDivination(input)).toThrow(RangeError);
    });

    it('performTimeBasedDivination rejects hourChiIndex=0', () => {
        const input: TimeBasedInput = { yearChiIndex: 1, lunarMonth: 1, lunarDay: 1, hourChiIndex: 0 };
        expect(() => performTimeBasedDivination(input)).toThrow(RangeError);
    });
});

// ── Risk 2: Leap Month Edge Case ────────────────────────────────
describe('Integration Risk 2: Leap Month', () => {
    it('buildTimeBasedInput accepts leap month value (month 4)', () => {
        // Leap month 4 uses the same lunarMonth=4 value
        const input = buildTimeBasedInput(2025, 4, 10, 14);
        expect(input.lunarMonth).toBe(4);
        expect(input.lunarDay).toBe(10);
    });

    it('divination result is identical for leap and non-leap month (same number)', () => {
        // Both leap and non-leap month 6 produce the same result because
        // the engine only uses the numeric month value
        const inputA = buildTimeBasedInput(2025, 6, 15, 10);
        const inputB = buildTimeBasedInput(2028, 6, 15, 10);

        // yearChiIndex differs (different year), but lunarMonth & lunarDay are the same
        expect(inputA.lunarMonth).toBe(inputB.lunarMonth);
        expect(inputA.lunarDay).toBe(inputB.lunarDay);

        // If we normalize by using the same year, same exact result
        const resultA = performTimeBasedDivination(inputA);
        const normalizedB: TimeBasedInput = {
            yearChiIndex: inputA.yearChiIndex,
            lunarMonth: inputB.lunarMonth,
            lunarDay: inputB.lunarDay,
            hourChiIndex: inputA.hourChiIndex,
        };
        const resultB = performTimeBasedDivination(normalizedB);
        expect(resultA.mainHexagram.id).toBe(resultB.mainHexagram.id);
        expect(resultA.movingLine).toBe(resultB.movingLine);
    });
});

// ── Risk 3: Midnight Tý Boundary ────────────────────────────────
describe('Integration Risk 3: adjustDateForTyBoundary', () => {
    it('hour 22 → same date returned', () => {
        const date = new Date(2026, 2, 2); // March 2, 2026
        const result = adjustDateForTyBoundary(date, 22);
        expect(result.getDate()).toBe(2);
        expect(result.getMonth()).toBe(2);
    });

    it('hour 23 → date advanced by 1 day', () => {
        const date = new Date(2026, 2, 2);
        const result = adjustDateForTyBoundary(date, 23);
        expect(result.getDate()).toBe(3);
        expect(result.getMonth()).toBe(2);
    });

    it('hour 0 → same date (already the next day)', () => {
        const date = new Date(2026, 2, 3);
        const result = adjustDateForTyBoundary(date, 0);
        expect(result.getDate()).toBe(3);
    });

    it('month boundary: Jan 31 at 23:00 → Feb 1', () => {
        const date = new Date(2026, 0, 31); // January 31
        const result = adjustDateForTyBoundary(date, 23);
        expect(result.getDate()).toBe(1);
        expect(result.getMonth()).toBe(1); // February
    });

    it('year boundary: Dec 31 at 23:00 → Jan 1 of next year', () => {
        const date = new Date(2026, 11, 31); // December 31
        const result = adjustDateForTyBoundary(date, 23);
        expect(result.getDate()).toBe(1);
        expect(result.getMonth()).toBe(0); // January
        expect(result.getFullYear()).toBe(2027);
    });

    it('does not mutate the original date', () => {
        const date = new Date(2026, 2, 2);
        const original = date.getTime();
        adjustDateForTyBoundary(date, 23);
        expect(date.getTime()).toBe(original);
    });
});

// ================================================================
// Phase 3A: Lục Thân, Nạp Giáp, Cung Derivation
// ================================================================

describe('Phase 3A: Cung and Thế Derivation (resolveCungAndThe)', () => {
    it('resolves Cung and Thế/Ứng for Thuần Càn (Bát Thuần)', () => {
        const hex = { id: 1, name: 'Thuần Càn', upper: 1, lower: 1, meaning: '', image: '' };
        const { cungTrigram, the, ung } = resolveCungAndThe(hex);
        expect(cungTrigram.id).toBe(1); // Càn
        expect(the).toBe(6);
        expect(ung).toBe(3);
    });

    it('resolves Cung and Thế/Ứng for Thiên Phong Cấu (Nhất thế)', () => {
        const hex = { id: 44, name: 'Thiên Phong Cấu', upper: 1, lower: 5, meaning: '', image: '' };
        const { cungTrigram, the, ung } = resolveCungAndThe(hex);
        expect(cungTrigram.id).toBe(1); // Càn cung
        expect(the).toBe(1);
        expect(ung).toBe(4);
    });

    it('resolves Cung and Thế/Ứng for Thiên Hỏa Đồng Nhân (Quy Hồn)', () => {
        const hex = { id: 13, name: 'Thiên Hỏa Đồng Nhân', upper: 1, lower: 3, meaning: '', image: '' };
        const { cungTrigram, the, ung } = resolveCungAndThe(hex);
        expect(cungTrigram.id).toBe(3); // Cung Ly
        expect(the).toBe(3);
        expect(ung).toBe(6);
    });
});

describe('Phase 3A: deriveLucThan', () => {
    it('calculates correct Hexagram relations', () => {
        // deriveLucThan already imported at top level
        expect(deriveLucThan('Kim', 'Kim')).toBe('Huynh Đệ');
        expect(deriveLucThan('Kim', 'Thủy')).toBe('Tử Tôn');
        expect(deriveLucThan('Kim', 'Mộc')).toBe('Thê Tài');
        expect(deriveLucThan('Kim', 'Hỏa')).toBe('Quan Quỷ');
        expect(deriveLucThan('Kim', 'Thổ')).toBe('Phụ Mẫu');
    });
});

describe('Phase 3A: resolveHaoDetails', () => {
    it('assigns Nạp Giáp correctly for Thuần Càn', () => {
        const hex = { id: 1, name: 'Thuần Càn', upper: 1, lower: 1, meaning: '', image: '' };
        // resolveHaoDetails already imported at top level
        const details = resolveHaoDetails(hex, 2);

        expect(details.length).toBe(6);
        expect(details[0].can).toBe('Giáp');
        expect(details[0].chi).toBe('Tý');
        expect(details[0].element).toBe('Thủy'); // Tý is Thủy
        expect(details[0].lucThan).toBe('Tử Tôn'); // Cung Kim (Càn), Hào Thủy -> Tử Tôn

        expect(details[3].can).toBe('Nhâm'); // line 4
        expect(details[3].chi).toBe('Ngọ');
        expect(details[3].lucThan).toBe('Quan Quỷ'); // Ngọ Hỏa khắc Cung Kim -> Quan Quỷ

        expect(details[1].isMoving).toBe(true); // Hào 2 động
        expect(details[5].isTh).toBe(true); // Thuần Càn Thế ở Hào 6
        expect(details[2].isUng).toBe(true); // Ứng ở Hào 3
    });
});
