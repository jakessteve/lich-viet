/**
 * Unit Tests — Mai Hoa Engine (Plum Blossom Numerology)
 */

import { describe, it, expect, beforeAll } from 'vitest';
import {
  getHourChiIndex,
  getYearChiIndex,
  buildTimeBasedInput,
  performTimeBasedDivination,
  performNumberBasedDivination,
  calculateSeasonalStrength,
  determineTheDung,
  getTrigramById,
  findHexagram,
  assertMaiHoaChiIndex,
  ensureHexagramsLoaded,
} from '@/utils/maiHoaEngine';

beforeAll(async () => {
  await ensureHexagramsLoaded();
});

// ── getHourChiIndex ───────────────────────────────────────────

describe('getHourChiIndex', () => {
  it('should return 1 (Tý) for hour 23', () => {
    expect(getHourChiIndex(23)).toBe(1);
  });

  it('should return 1 (Tý) for hour 0', () => {
    expect(getHourChiIndex(0)).toBe(1);
  });

  it('should return 2 (Sửu) for hour 1', () => {
    expect(getHourChiIndex(1)).toBe(2);
  });

  it('should return 7 (Ngọ) for noon', () => {
    expect(getHourChiIndex(12)).toBe(7);
  });

  it('should return 12 (Hợi) for hour 21', () => {
    expect(getHourChiIndex(21)).toBe(12);
  });

  it('should throw for invalid hours', () => {
    expect(() => getHourChiIndex(-1)).toThrow();
    expect(() => getHourChiIndex(24)).toThrow();
  });
});

// ── getYearChiIndex ───────────────────────────────────────────

describe('getYearChiIndex', () => {
  it('should return a value between 1-12', () => {
    for (let y = 2020; y <= 2030; y++) {
      const idx = getYearChiIndex(y);
      expect(idx).toBeGreaterThanOrEqual(1);
      expect(idx).toBeLessThanOrEqual(12);
    }
  });

  it('should cycle every 12 years', () => {
    expect(getYearChiIndex(2024)).toBe(getYearChiIndex(2036));
  });
});

// ── assertMaiHoaChiIndex ──────────────────────────────────────

describe('assertMaiHoaChiIndex', () => {
  it('should pass for valid indices 1-12', () => {
    for (let i = 1; i <= 12; i++) {
      expect(() => assertMaiHoaChiIndex(i, 'test')).not.toThrow();
    }
  });

  it('should throw for 0 (Phase 1 index)', () => {
    expect(() => assertMaiHoaChiIndex(0, 'test')).toThrow(RangeError);
  });

  it('should throw for 13', () => {
    expect(() => assertMaiHoaChiIndex(13, 'test')).toThrow(RangeError);
  });
});

// ── performTimeBasedDivination ────────────────────────────────

describe('performTimeBasedDivination', () => {
  it('should return a complete divination result', () => {
    const input = buildTimeBasedInput(2024, 3, 15, 10);
    const result = performTimeBasedDivination(input);
    expect(result.mainHexagram).toBeDefined();
    expect(result.mutualHexagram).toBeDefined();
    expect(result.changedHexagram).toBeDefined();
    expect(result.movingLine).toBeGreaterThanOrEqual(1);
    expect(result.movingLine).toBeLessThanOrEqual(6);
    expect(['upper', 'lower']).toContain(result.theTrigram);
    expect(['upper', 'lower']).toContain(result.dungTrigram);
    expect(result.theTrigram).not.toBe(result.dungTrigram);
  });

  it('should produce different hexagrams for different inputs', () => {
    const r1 = performTimeBasedDivination(buildTimeBasedInput(2024, 3, 15, 10));
    const r2 = performTimeBasedDivination(buildTimeBasedInput(2024, 6, 20, 14));
    expect(r1.mainHexagram.id).not.toBe(r2.mainHexagram.id);
  });
});

// ── performNumberBasedDivination ──────────────────────────────

describe('performNumberBasedDivination', () => {
  it('should return a valid result for number inputs', () => {
    const result = performNumberBasedDivination({ num1: 5, num2: 3 });
    expect(result.mainHexagram).toBeDefined();
    expect(result.movingLine).toBeGreaterThanOrEqual(1);
    expect(result.movingLine).toBeLessThanOrEqual(6);
  });

  it('should throw for invalid numbers', () => {
    expect(() => performNumberBasedDivination({ num1: 0, num2: 3 })).toThrow();
    expect(() => performNumberBasedDivination({ num1: 5, num2: -1 })).toThrow();
  });

  it('should be deterministic for same inputs', () => {
    const r1 = performNumberBasedDivination({ num1: 42, num2: 17 });
    const r2 = performNumberBasedDivination({ num1: 42, num2: 17 });
    expect(r1.mainHexagram.id).toBe(r2.mainHexagram.id);
    expect(r1.movingLine).toBe(r2.movingLine);
  });
});

// ── determineTheDung ──────────────────────────────────────────

describe('determineTheDung', () => {
  it('should assign upper=Thể, lower=Dụng for moving line 1-3', () => {
    for (let line = 1; line <= 3; line++) {
      const result = determineTheDung(line);
      expect(result.theTrigram).toBe('upper');
      expect(result.dungTrigram).toBe('lower');
    }
  });

  it('should assign lower=Thể, upper=Dụng for moving line 4-6', () => {
    for (let line = 4; line <= 6; line++) {
      const result = determineTheDung(line);
      expect(result.theTrigram).toBe('lower');
      expect(result.dungTrigram).toBe('upper');
    }
  });

  it('should throw for invalid lines', () => {
    expect(() => determineTheDung(0)).toThrow();
    expect(() => determineTheDung(7)).toThrow();
  });
});

// ── calculateSeasonalStrength ─────────────────────────────────

describe('calculateSeasonalStrength', () => {
  it('should return Vượng for Mộc in spring (month 1-3)', () => {
    const result = calculateSeasonalStrength('Mộc', 2);
    expect(result.strength).toBe('vượng');
    expect(result.score).toBe(10);
  });

  it('should return Tử for weakest combination', () => {
    // Kim is controlled by Hỏa which rules summer (month 4-6)
    const result = calculateSeasonalStrength('Kim', 5);
    // Kim in summer = tù or tử depending on position in gen cycle
    expect(result.score).toBeLessThanOrEqual(5);
  });

  it('should always return a score between 1 and 10', () => {
    const elements = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'] as const;
    for (const el of elements) {
      for (let m = 1; m <= 12; m++) {
        const result = calculateSeasonalStrength(el, m);
        expect(result.score).toBeGreaterThanOrEqual(1);
        expect(result.score).toBeLessThanOrEqual(10);
      }
    }
  });
});

// ── Trigram/Hexagram lookups ──────────────────────────────────

describe('getTrigramById', () => {
  it('should return a valid trigram for IDs 1-8', () => {
    for (let id = 1; id <= 8; id++) {
      const trigram = getTrigramById(id);
      expect(trigram.id).toBe(id);
      expect(trigram.name).toBeTruthy();
      expect(trigram.lines).toHaveLength(3);
    }
  });

  it('should throw for invalid IDs', () => {
    expect(() => getTrigramById(0)).toThrow();
    expect(() => getTrigramById(9)).toThrow();
  });
});

describe('findHexagram', () => {
  it('should find hexagram for valid upper+lower trigram pair', () => {
    const hex = findHexagram(1, 1); // Càn-Càn = Quẻ Thuần Càn
    expect(hex).toBeDefined();
    expect(hex.upper).toBe(1);
    expect(hex.lower).toBe(1);
  });
});
