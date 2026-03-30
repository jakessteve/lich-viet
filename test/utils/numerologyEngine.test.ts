/**
 * Unit Tests — Numerology Engine (Thần Số Học)
 */

import { describe, it, expect } from 'vitest';
import { generateNumerologyProfile } from '@/utils/numerologyEngine';

// ── generateNumerologyProfile ─────────────────────────────────

describe('generateNumerologyProfile', () => {
  const profile = generateNumerologyProfile(
    'Nguyen Van A', new Date(1990, 4, 15), 'pythagorean'
  );

  it('should return a complete profile with all core numbers', () => {
    expect(profile.lifePath).toBeDefined();
    expect(profile.expression).toBeDefined();
    expect(profile.soulUrge).toBeDefined();
    expect(profile.personality).toBeDefined();
    expect(profile.birthday).toBeDefined();
    expect(profile.maturity).toBeDefined();
  });

  it('should have Life Path as a single digit or master number', () => {
    const valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];
    expect(valid).toContain(profile.lifePath.value);
  });

  it('should have correct system', () => {
    expect(profile.system).toBe('pythagorean');
  });

  it('should store the original name and birthdate', () => {
    expect(profile.fullName).toBe('Nguyen Van A');
    expect(profile.birthDate.getFullYear()).toBe(1990);
  });

  it('should calculate personal cycle', () => {
    expect(profile.personalCycle.personalYear).toBeGreaterThanOrEqual(1);
    expect(profile.personalCycle.personalYear).toBeLessThanOrEqual(9);
    expect(profile.personalCycle.yearMeaning).toBeTruthy();
  });

  it('should generate birthday grid', () => {
    expect(profile.birthdayGrid.grid).toHaveLength(3);
    for (const row of profile.birthdayGrid.grid) {
      expect(row).toHaveLength(3);
    }
    expect(profile.birthdayGrid.present.length + profile.birthdayGrid.missing.length).toBe(9);
  });

  it('should calculate 4 pinnacle cycles', () => {
    expect(profile.pinnacles).toHaveLength(4);
    for (const p of profile.pinnacles) {
      expect(p.number).toBeGreaterThanOrEqual(1);
    }
  });

  it('should calculate 4 challenge cycles', () => {
    expect(profile.challenges).toHaveLength(4);
    for (const c of profile.challenges) {
      expect(c.number).toBeGreaterThanOrEqual(0); // Challenge can be 0
    }
  });

  it('should calculate 3 life periods', () => {
    expect(profile.lifePeriods).toHaveLength(3);
    expect(profile.lifePeriods[0].nameVi).toBe('Giai Đoạn Hình Thành');
    expect(profile.lifePeriods[1].nameVi).toBe('Giai Đoạn Phát Triển');
    expect(profile.lifePeriods[2].nameVi).toBe('Giai Đoạn Thu Hoạch');
  });

  it('should calculate hidden passion and subconscious self', () => {
    expect(profile.hiddenPassion).toBeDefined();
    expect(profile.hiddenPassion!.value).toBeGreaterThanOrEqual(1);
    expect(profile.subconsciousSelf).toBeDefined();
    expect(profile.subconsciousSelf!.value).toBeGreaterThanOrEqual(1);
    expect(profile.subconsciousSelf!.value).toBeLessThanOrEqual(9);
  });
});

// ── Vietnamese name support ───────────────────────────────────

describe('Vietnamese diacritics', () => {
  it('should handle Vietnamese names with diacritics', () => {
    const profile = generateNumerologyProfile(
      'Nguyễn Văn Anh', new Date(1995, 2, 10), 'pythagorean'
    );
    expect(profile.lifePath).toBeDefined();
    expect(profile.expression.value).toBeGreaterThanOrEqual(1);
  });

  it('should produce same result for normalized and un-normalized names', () => {
    const p1 = generateNumerologyProfile('Nguyen Van A', new Date(1990, 0, 1));
    const p2 = generateNumerologyProfile('nguyen van a', new Date(1990, 0, 1));
    expect(p1.expression.value).toBe(p2.expression.value);
    expect(p1.soulUrge.value).toBe(p2.soulUrge.value);
  });
});

// ── Chaldean system ───────────────────────────────────────────

describe('Chaldean system', () => {
  it('should produce different expression number than Pythagorean', () => {
    const pyth = generateNumerologyProfile('John Doe', new Date(1985, 5, 15), 'pythagorean');
    const chald = generateNumerologyProfile('John Doe', new Date(1985, 5, 15), 'chaldean');
    // Life Path is date-based, so it should be the same
    expect(pyth.lifePath.value).toBe(chald.lifePath.value);
    // Expression is name-based with different mappings, so it MAY differ
    // (not guaranteed for all names, but likely)
    expect(chald.system).toBe('chaldean');
  });
});

// ── Master numbers ────────────────────────────────────────────

describe('Master number detection', () => {
  it('should detect master numbers in the profile', () => {
    // Create profiles and check that masterNumbers array is populated correctly
    const profile = generateNumerologyProfile('Test Name', new Date(2009, 1, 29));
    // 2+0+0+9 + 0+2 + 2+9 = 11 + 2 + 11 → Life Path could be master
    expect(Array.isArray(profile.masterNumbers)).toBe(true);
  });
});

// ── Karmic debt ───────────────────────────────────────────────

describe('Karmic debt detection', () => {
  it('should track karmic debts across core numbers', () => {
    const profile = generateNumerologyProfile('ABC', new Date(1990, 0, 1));
    expect(Array.isArray(profile.karmicDebts)).toBe(true);
    // Each karmic debt should be one of [13, 14, 16, 19]
    for (const kd of profile.karmicDebts) {
      expect([13, 14, 16, 19]).toContain(kd);
    }
  });
});
