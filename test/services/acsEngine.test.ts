import { describe, it, expect } from 'vitest';
import { computeACS } from '../../src/services/crossValidation/acsEngine';
import type { BasicProfile, ExtendedProfile } from '../../src/types/auth';

describe('acsEngine', () => {
  const basicProfile: BasicProfile = { birthYear: 1990, birthMonth: 6, birthDay: 15 };
  const extendedProfile: ExtendedProfile = {
    birthYear: 1990, birthMonth: 6, birthDay: 15,
    birthTime: '10:00',
    birthPlace: 'Hanoi'
  } as ExtendedProfile;

  it('degrades to 2/4 mode without extended profile', async () => {
    const result = await computeACS(basicProfile, null, new Date(2026, 2, 18));
    expect(result.tier).toBe('2/4');
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(result.verdict).toBeDefined();
  });

  it('uses 4/4 mode with extended profile', async () => {
    const result = await computeACS(basicProfile, extendedProfile, new Date(2026, 2, 18));
    expect(result.tier).toBe('4/4');
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it('returns a valid breakdown with all 4 systems', async () => {
    const result = await computeACS(basicProfile, extendedProfile, new Date(2026, 2, 18));
    expect(result.breakdown).toBeDefined();
    expect(result.breakdown.bazi).toBeDefined();
    expect(result.breakdown.numerology).toBeDefined();
    expect(result.breakdown.tuvi).toBeDefined();
    expect(result.breakdown.transit).toBeDefined();
  });

  it('returns valid verdicts in range', async () => {
    const result = await computeACS(basicProfile, null, new Date(2026, 2, 18));
    const validVerdicts = ['Rất Tốt', 'Tốt', 'Bình Thường', 'Cẩn Thận', 'Tránh'];
    expect(validVerdicts).toContain(result.verdict);
  });

  it('returns 50 score for completely null profiles', async () => {
    const result = await computeACS(null, null, new Date(2026, 2, 18));
    expect(result.score).toBe(50);
  });

  it('score is bounded 0–100 for any input', async () => {
    for (const day of [1, 10, 20, 28]) {
      const result = await computeACS(basicProfile, null, new Date(2026, 2, day));
      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(100);
    }
  });
});
