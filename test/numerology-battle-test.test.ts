import { describe, it, expect } from 'vitest';
import { generateNumerologyProfile, reduceToDigit } from '../src/utils/numerologyEngine';

describe('Thần Số Học (Numerology) — Battle Testing & Fuzz Oracle', () => {

  // Random Vietnamese name generator for fuzzing
  const FIRST_NAMES = ['An', 'Bình', 'Cường', 'Dũng', 'Hà', 'Khánh', 'Linh', 'Minh', 'Ngọc', 'Phương', 'Quang', 'Sơn', 'Thảo', 'Uyên', 'Vân'];
  const MIDDLE_NAMES = ['Văn', 'Thị', 'Hoàng', 'Đức', 'Minh', 'Thanh', 'Nguyệt', 'Kim'];
  const LAST_NAMES = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Đặng', 'Bùi'];

  it('Generates 1,000 random numerology profiles without crashing across both systems', () => {
    const iterations = 1000;
    let seed = 334455;
    function random() {
      seed = (1103515245 * seed + 12345) % 2147483648;
      return seed / 2147483648;
    }

    const validCoreValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];

    for (let i = 0; i < iterations; i++) {
      // Random Vietnamese name
      const lastName = LAST_NAMES[Math.floor(random() * LAST_NAMES.length)];
      const middleName = MIDDLE_NAMES[Math.floor(random() * MIDDLE_NAMES.length)];
      const firstName = FIRST_NAMES[Math.floor(random() * FIRST_NAMES.length)];
      const fullName = `${lastName} ${middleName} ${firstName}`;

      // Random birth date
      const year = Math.floor(random() * 200) + 1900;
      const month = Math.floor(random() * 12);
      const day = Math.floor(random() * 28) + 1;
      const birthDate = new Date(year, month, day);

      // Alternate between Pythagorean and Chaldean
      const system = i % 2 === 0 ? 'pythagorean' as const : 'chaldean' as const;

      const profile = generateNumerologyProfile(fullName, birthDate, system);

      expect(profile).toBeDefined();
      expect(profile.system).toBe(system);

      // A. Core numbers are valid single digits or master numbers
      expect(validCoreValues).toContain(profile.lifePath.value);
      expect(validCoreValues).toContain(profile.expression.value);
      expect(validCoreValues).toContain(profile.soulUrge.value);
      expect(validCoreValues).toContain(profile.personality.value);
      expect(profile.birthday.value).toBeGreaterThanOrEqual(1);
      expect(profile.birthday.value).toBeLessThanOrEqual(33);
      expect(validCoreValues).toContain(profile.maturity.value);

      // B. Birthday grid is 3×3 with non-negative values
      expect(profile.birthdayGrid.grid.length).toBe(3);
      for (const row of profile.birthdayGrid.grid) {
        expect(row.length).toBe(3);
        for (const cell of row) {
          expect(cell).toBeGreaterThanOrEqual(0);
        }
      }

      // C. Present + missing = 9 total digits (1-9)
      expect(profile.birthdayGrid.present.length + profile.birthdayGrid.missing.length).toBe(9);

      // D. Pinnacles: exactly 4
      expect(profile.pinnacles.length).toBe(4);
      for (const p of profile.pinnacles) {
        expect(p.number).toBeGreaterThanOrEqual(0);
        expect(p.startAge).toBeGreaterThanOrEqual(0);
      }

      // E. Challenges: exactly 4
      expect(profile.challenges.length).toBe(4);
      for (const c of profile.challenges) {
        expect(c.number).toBeGreaterThanOrEqual(0);
      }

      // F. Life Periods: exactly 3
      expect(profile.lifePeriods.length).toBe(3);

      // G. Hidden Passion and Subconscious Self exist
      expect(profile.hiddenPassion).toBeDefined();
      expect(profile.subconsciousSelf).toBeDefined();

      // H. Personal cycle
      expect(profile.personalCycle.personalYear).toBeGreaterThanOrEqual(1);
      expect(profile.personalCycle.personalYear).toBeLessThanOrEqual(9);
    }
  });

  it('reduceToDigit preserves master numbers correctly', () => {
    expect(reduceToDigit(11)).toBe(11);
    expect(reduceToDigit(22)).toBe(22);
    expect(reduceToDigit(33)).toBe(33);
    expect(reduceToDigit(11, false)).toBe(2);
    expect(reduceToDigit(22, false)).toBe(4);
    expect(reduceToDigit(33, false)).toBe(6);
    expect(reduceToDigit(29)).toBe(11); // 2+9 = 11
    expect(reduceToDigit(38)).toBe(11); // 3+8 = 11
  });
});
