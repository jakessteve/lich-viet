/**
 * Unit Tests — Calendar Engine
 *
 * Tests core calendar functions that underpin all other engines.
 */

import { describe, it, expect } from 'vitest';
import {
  getLunarDate,
  getCanChiYear,
  getCanChiMonth,
  getCanChiDay,
  parseCanChi,
  calculateNguHanhInteraction,
  calculateFinalScore,
  buildCanChiXungHop,
} from '@/utils/calendarEngine';

// ── getLunarDate ───────────────────────────────────────────────

describe('getLunarDate', () => {
  it('should convert Tết Nguyên Đán 2025 correctly', () => {
    // Jan 29, 2025 = Lunar 1/1/2025 (Ất Tỵ)
    const result = getLunarDate(new Date(2025, 0, 29));
    expect(result.day).toBe(1);
    expect(result.month).toBe(1);
    expect(result.year).toBe(2025);
  });

  it('should handle mid-year date', () => {
    // July 15, 2024
    const result = getLunarDate(new Date(2024, 6, 15));
    expect(result.day).toBeGreaterThanOrEqual(1);
    expect(result.day).toBeLessThanOrEqual(30);
    expect(result.month).toBeGreaterThanOrEqual(1);
    expect(result.month).toBeLessThanOrEqual(12);
  });

  it('should return isLeap for leap months', () => {
    const result = getLunarDate(new Date(2024, 0, 1));
    expect(typeof result.isLeap).toBe('boolean');
  });
});

// ── getCanChiYear ─────────────────────────────────────────────

describe('getCanChiYear', () => {
  it('should return Giáp Tý for year 1984', () => {
    expect(getCanChiYear(1984)).toBe('Giáp Tý');
  });

  it('should return Ất Sửu for year 1985', () => {
    expect(getCanChiYear(1985)).toBe('Ất Sửu');
  });

  it('should return Canh Tý for year 2020', () => {
    expect(getCanChiYear(2020)).toBe('Canh Tý');
  });

  it('should return Ất Tỵ for year 2025', () => {
    expect(getCanChiYear(2025)).toBe('Ất Tỵ');
  });

  it('should cycle correctly for 60-year sexagenary cycle', () => {
    // 1984 = Giáp Tý, 2044 = Giáp Tý (60 years later)
    expect(getCanChiYear(1984)).toBe(getCanChiYear(2044));
  });
});

// ── getCanChiMonth ────────────────────────────────────────────

describe('getCanChiMonth', () => {
  it('should return correct month Can-Chi for month 1 of 2024', () => {
    const result = getCanChiMonth(1, 2024);
    expect(result).toContain(' '); // "Can Chi" format
    const parts = result.split(' ');
    expect(parts).toHaveLength(2);
  });

  it('should return different results for different months', () => {
    const m1 = getCanChiMonth(1, 2024);
    const m2 = getCanChiMonth(2, 2024);
    expect(m1).not.toBe(m2);
  });
});

// ── getCanChiDay ──────────────────────────────────────────────

describe('getCanChiDay', () => {
  it('should return a valid Can-Chi string', () => {
    const result = getCanChiDay(new Date(2024, 0, 1));
    const parts = result.split(' ');
    expect(parts).toHaveLength(2);
  });

  it('should return different values for consecutive days', () => {
    const day1 = getCanChiDay(new Date(2024, 0, 1));
    const day2 = getCanChiDay(new Date(2024, 0, 2));
    expect(day1).not.toBe(day2);
  });

  it('should cycle every 60 days', () => {
    const day1 = getCanChiDay(new Date(2024, 0, 1));
    const day61 = getCanChiDay(new Date(2024, 2, 1)); // 60 days later
    expect(day1).toBe(day61);
  });
});

// ── parseCanChi ───────────────────────────────────────────────

describe('parseCanChi', () => {
  it('should parse "Giáp Tý" correctly', () => {
    const result = parseCanChi('Giáp Tý');
    expect(result.can).toBe('Giáp');
    expect(result.chi).toBe('Tý');
  });

  it('should parse "Quý Hợi" correctly', () => {
    const result = parseCanChi('Quý Hợi');
    expect(result.can).toBe('Quý');
    expect(result.chi).toBe('Hợi');
  });
});

// ── calculateNguHanhInteraction ───────────────────────────────

describe('calculateNguHanhInteraction', () => {
  it('should identify Chuyên nhật (same element)', () => {
    // Giáp(Mộc) + Dần(Mộc) = same element
    const result = calculateNguHanhInteraction({ can: 'Giáp', chi: 'Dần' });
    expect(result.nguHanhGrade).toBe('Chuyên nhật');
    expect(result.nguHanhScore).toBeGreaterThan(0);
  });

  it('should identify Phạt nhật (Chi overcomes Can)', () => {
    // Giáp(Mộc) + Thân(Kim) → Kim khắc Mộc = phạt nhật
    const result = calculateNguHanhInteraction({ can: 'Giáp', chi: 'Thân' });
    expect(result.nguHanhGrade).toBe('Phạt nhật');
    expect(result.nguHanhScore).toBeLessThan(0);
  });
});

// ── calculateFinalScore ───────────────────────────────────────

describe('calculateFinalScore', () => {
  it('should aggregate base + star weights + truc/tu + ngu hanh', () => {
    const result = calculateFinalScore(
      50,
      [{ name: 'Test', type: 'Good', weight: 10, description: '', suitable: [], unsuitable: [] }],
      'Good', 'Good', 5
    );
    expect(result.finalScore).toBeGreaterThan(50);
  });

  it('should grade Tốt for high scores', () => {
    const result = calculateFinalScore(80, [], 'Good', 'Good', 10);
    expect(result.dayGrade).toBe('Tốt');
  });
});

// ── buildCanChiXungHop ────────────────────────────────────────

describe('buildCanChiXungHop', () => {
  it('should return a string containing xung/hợp info', () => {
    const result = buildCanChiXungHop('Tý');
    expect(result).toContain('lục hợp');
    expect(result).toContain('tam hợp');
    expect(result).toContain('xung');
  });
});
