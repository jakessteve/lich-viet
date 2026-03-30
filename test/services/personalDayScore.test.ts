import { describe, it, expect } from 'vitest';
import { calculatePersonalDayScore, getYearChi, isTamHop, getYearThaiTueType, CHI_LIST } from '../../src/services/personalization/personalDayScore';
import type { BasicProfile } from '../../src/types/auth';

describe('personalDayScore', () => {
  describe('getYearChi', () => {
    it('returns the correct Earthly Branch for a known year', () => {
      expect(getYearChi(1990)).toBe('Ngọ'); // Canh Ngọ
      expect(getYearChi(2000)).toBe('Thìn'); // Canh Thìn
      expect(getYearChi(1996)).toBe('Tý'); // Bính Tý
    });

    it('cycles through all 12 branches correctly', () => {
      const chi2020 = getYearChi(2020);
      expect(chi2020).toBe('Tý'); // Canh Tý
    });
  });

  describe('isTamHop', () => {
    it('detects Tam Hợp pairs', () => {
      expect(isTamHop('Dần', 'Ngọ')).toBe(true);
      expect(isTamHop('Ngọ', 'Tuất')).toBe(true);
      expect(isTamHop('Thân', 'Tý')).toBe(true);
    });

    it('rejects non-Tam Hợp pairs', () => {
      expect(isTamHop('Tý', 'Ngọ')).toBe(false); // This is Xung
      expect(isTamHop('Dần', 'Thân')).toBe(false);
    });
  });

  describe('getYearThaiTueType', () => {
    it('identifies Trị Thái Tuế (same branch)', () => {
      expect(getYearThaiTueType(1996, 2008)).toBe('Trị Thái Tuế (Năm bản mệnh)'); // Both Tý
    });

    it('identifies Xung Thái Tuế', () => {
      expect(getYearThaiTueType(1996, 2002)).toBe('Xung Thái Tuế'); // Tý xung Ngọ
    });

    it('returns null for neutral years', () => {
      expect(getYearThaiTueType(1996, 2001)).toBeNull(); // Tý vs Tỵ — no relation
    });
  });

  describe('calculatePersonalDayScore', () => {
    const profile: BasicProfile = { birthYear: 1990, birthMonth: 1, birthDay: 1 }; // Ngọ

    it('returns undefined for null profile', () => {
      expect(calculatePersonalDayScore(null, 'Tý')).toBeUndefined();
      expect(calculatePersonalDayScore(undefined, 'Tý')).toBeUndefined();
    });

    it('returns undefined for profile without birthYear', () => {
      expect(calculatePersonalDayScore({} as BasicProfile, 'Tý')).toBeUndefined();
    });

    it('returns a positive score for Tam Hợp days (Dần,Tuất for Ngọ)', () => {
      const score = calculatePersonalDayScore(profile, 'Dần');
      expect(score).toBeDefined();
      expect(score!.isTamHop).toBe(true);
      expect(score!.actionScore).toBeGreaterThan(0);
    });

    it('returns a negative score for Xung days (Tý for Ngọ)', () => {
      const score = calculatePersonalDayScore(profile, 'Tý');
      expect(score).toBeDefined();
      expect(score!.isTuongXung).toBe(true);
      expect(score!.actionScore).toBeLessThan(0);
    });

    it('returns Đại Cát label for score >= 3', () => {
      const score = calculatePersonalDayScore(profile, 'Dần');
      expect(score).toBeDefined();
      expect(score!.label).toBe('Đại Cát');
    });

    it('returns Bình Hòa for neutral days', () => {
      const score = calculatePersonalDayScore(profile, 'Thìn');
      expect(score).toBeDefined();
      // Ngọ vs Thìn — no major relationship
      expect(score!.actionScore).toBe(0);
      expect(score!.label).toBe('Bình Hòa');
    });

    it('detects Lục Hợp (Ngọ—Mùi)', () => {
      const score = calculatePersonalDayScore(profile, 'Mùi');
      expect(score!.isLucHop).toBe(true);
      expect(score!.actionScore).toBeGreaterThan(0);
    });
  });
});
