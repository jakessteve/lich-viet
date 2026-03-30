import { describe, it, expect } from 'vitest';
import { computeSynastryP1, getSynastryVerdict } from '../../src/services/crossValidation/synastryEngine';
import type { BasicProfile, SecondPersonProfile } from '../../src/types/auth';

describe('synastryEngine', () => {
  describe('getSynastryVerdict', () => {
    it('returns correct verdicts for score ranges', () => {
      expect(getSynastryVerdict(85)).toBe('Đại Cát');
      expect(getSynastryVerdict(65)).toBe('Tiểu Cát');
      expect(getSynastryVerdict(45)).toBe('Bình Hòa');
      expect(getSynastryVerdict(25)).toBe('Tiểu Hung');
      expect(getSynastryVerdict(10)).toBe('Đại Hung');
    });
  });

  describe('computeSynastryP1', () => {
    it('returns null for missing profiles', () => {
      expect(computeSynastryP1(null, null)).toBeNull();
      expect(computeSynastryP1({ birthYear: 1990 } as BasicProfile, null)).toBeNull();
    });

    it('returns a Synastry result for valid profiles', () => {
      const p1: BasicProfile = { birthYear: 1990, birthMonth: 1, birthDay: 1 }; // Ngọ
      const p2: SecondPersonProfile = {
        birthYear: 1986, birthMonth: 1, birthDay: 1,
        computationTier: 'basic'
      } as SecondPersonProfile; // Dần → Tam Hợp with Ngọ

      const result = computeSynastryP1(p1, p2);
      expect(result).not.toBeNull();
      expect(result!.overallScore).toBeGreaterThanOrEqual(0);
      expect(result!.overallScore).toBeLessThanOrEqual(100);
      expect(result!.systems).toHaveLength(4);
    });

    it('detects Tam Hợp in Bazi sub-system', () => {
      const p1: BasicProfile = { birthYear: 1990, birthMonth: 1, birthDay: 1 }; // Ngọ
      const p2: SecondPersonProfile = {
        birthYear: 1986, birthMonth: 1, birthDay: 1,
        computationTier: 'basic'
      } as SecondPersonProfile; // Dần → Tam Hợp

      const result = computeSynastryP1(p1, p2)!;
      const baziSystem = result.systems.find(s => s.system === 'bazi');
      expect(baziSystem).toBeDefined();
      expect(baziSystem!.factors.some(f => f.name === 'Tam Hợp')).toBe(true);
    });

    it('detects Lục Xung in Bazi sub-system', () => {
      const p1: BasicProfile = { birthYear: 1990, birthMonth: 1, birthDay: 1 }; // Ngọ
      const p2: SecondPersonProfile = {
        birthYear: 1996, birthMonth: 1, birthDay: 1,
        computationTier: 'basic'
      } as SecondPersonProfile; // Tý → Xung with Ngọ

      const result = computeSynastryP1(p1, p2)!;
      const baziSystem = result.systems.find(s => s.system === 'bazi');
      expect(baziSystem!.factors.some(f => f.name === 'Lục Xung')).toBe(true);
    });

    it('evaluates numerology when Life Path is provided', () => {
      const p1: BasicProfile = { birthYear: 1990, birthMonth: 1, birthDay: 1, lifepathNumber: 7 };
      const p2: SecondPersonProfile = {
        birthYear: 1986, birthMonth: 1, birthDay: 1,
        lifepathNumber: 7,
        computationTier: 'basic'
      } as SecondPersonProfile;

      const result = computeSynastryP1(p1, p2)!;
      const numSystem = result.systems.find(s => s.system === 'numerology');
      expect(numSystem!.isAvailable).toBe(true);
      expect(numSystem!.score).toBe(90); // Same Life Path → highest score
    });

    it('marks TuVi and ChiemTinh as unavailable', () => {
      const p1: BasicProfile = { birthYear: 1990, birthMonth: 1, birthDay: 1 };
      const p2: SecondPersonProfile = {
        birthYear: 1986, birthMonth: 1, birthDay: 1,
        computationTier: 'basic'
      } as SecondPersonProfile;

      const result = computeSynastryP1(p1, p2)!;
      expect(result.systems.find(s => s.system === 'tuvi')!.isAvailable).toBe(false);
      expect(result.systems.find(s => s.system === 'chiemtinh')!.isAvailable).toBe(false);
    });
  });
});
