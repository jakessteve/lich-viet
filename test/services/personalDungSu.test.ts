import { describe, it, expect } from 'vitest';
import { getPersonalDungSu } from '../../src/services/personalization/personalDungSu';
import type { BasicProfile, ExtendedProfile } from '../../src/types/auth';

describe('personalDungSu', () => {
  const basicProfile: BasicProfile = { birthYear: 1990, birthMonth: 1, birthDay: 1 }; // Ngọ
  const activities = ['Cưới hỏi', 'Khai trương', 'Động thổ', 'Xuất hành', 'An táng'];

  it('returns empty arrays when no activities provided', () => {
    const result = getPersonalDungSu(basicProfile, null, 'Tý', []);
    expect(result.recommended).toHaveLength(0);
    expect(result.warned).toHaveLength(0);
    expect(result.regular).toHaveLength(0);
  });

  it('categorizes activities on a neutral day', () => {
    const result = getPersonalDungSu(basicProfile, null, 'Thìn', activities);
    expect(result.voidDayWarning).toBeUndefined();
    expect(result.regular.length + result.recommended.length + result.warned.length).toBe(activities.length);
  });

  it('boosts activities on a Đại Cát day (Tam Hợp)', () => {
    const result = getPersonalDungSu(basicProfile, null, 'Dần', activities);
    // Ngọ-Dần = Tam Hợp → +3 score → should boost activities
    expect(result.recommended.length).toBeGreaterThan(0);
    expect(result.recommended.every(a => a.isBoosted)).toBe(true);
  });

  it('warns activities on a Xung day', () => {
    const result = getPersonalDungSu(basicProfile, null, 'Tý', activities);
    // Ngọ-Tý = Xung → -3 → should warn
    expect(result.warned.length).toBeGreaterThan(0);
  });

  it('applies Tuần Không penalty when extended profile has matching Chi', () => {
    const ext: ExtendedProfile = {
      birthYear: 1990, birthMonth: 1, birthDay: 1,
      birthTime: '10:00',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tuanKhong: ['Thìn', 'Tỵ'] as any
    } as ExtendedProfile;

    const result = getPersonalDungSu(basicProfile, ext, 'Thìn', activities);
    expect(result.voidDayWarning).toBeDefined();
    expect(result.voidDayWarning).toContain('Không Vong');
    expect(result.warned.length).toBeGreaterThan(0);
    expect(result.warned.every(a => a.reason === 'Phạm Tuần Không')).toBe(true);
  });

  it('handles null profile gracefully (no score overlay)', () => {
    const result = getPersonalDungSu(null, null, 'Dần', activities);
    // No personal overlay, all activities stay at base score
    expect(result.regular.length).toBe(activities.length);
  });
});
