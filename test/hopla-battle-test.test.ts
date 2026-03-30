import { describe, it, expect } from 'vitest';
import { computeTuViSynastry } from '../src/services/synastry/tuviSynastry';
import { computeBaziSynastry } from '../src/services/synastry/baziSynastry';
import { computeNumerologySynastry } from '../src/services/synastry/numerologySynastry';
import { computeWesternSynastry } from '../src/services/synastry/westernSynastry';
import { generateBaziChart } from '../src/utils/baziEngine';

describe('Hợp La Số (Composite Synastry) — Battle Testing & Fuzz Oracle', () => {

  it('Generates 200 random person-pair synastry analyses without crashing', () => {
    const iterations = 200;
    let seed = 776655;
    function random() {
      seed = (1103515245 * seed + 12345) % 2147483648;
      return seed / 2147483648;
    }

    const genders: Array<'male' | 'female'> = ['male', 'female'];
    const validCompat = ['excellent', 'good', 'neutral', 'caution', 'poor'];

    for (let i = 0; i < iterations; i++) {
      // Random Person A
      const yearA = Math.floor(random() * 80) + 1950;
      const monthA = Math.floor(random() * 12) + 1;
      const dayA = Math.floor(random() * 28) + 1;
      const hourA = Math.floor(random() * 24);
      const genderA = genders[Math.floor(random() * 2)];
      const dobA = new Date(yearA, monthA - 1, dayA);

      // Random Person B
      const yearB = Math.floor(random() * 80) + 1950;
      const monthB = Math.floor(random() * 12) + 1;
      const dayB = Math.floor(random() * 28) + 1;
      const hourB = Math.floor(random() * 24);
      const genderB = genders[Math.floor(random() * 2)];
      const dobB = new Date(yearB, monthB - 1, dayB);

      const hourIndexA = Math.floor(((hourA + 1) % 24) / 2);
      const hourIndexB = Math.floor(((hourB + 1) % 24) / 2);

      // 1. Tử Vi Synastry
      const tuvi = computeTuViSynastry(dobA, hourIndexA, genderA, dobB, hourIndexB, genderB);
      expect(tuvi).toBeDefined();
      expect(typeof tuvi.totalScore).toBe('number');
      expect(tuvi.totalScore).toBeGreaterThanOrEqual(-15);
      expect(tuvi.totalScore).toBeLessThanOrEqual(15);
      expect(validCompat).toContain(tuvi.compatibility);
      expect(tuvi.detail).toBeTruthy();
      expect(tuvi.layers.length).toBeGreaterThan(0);

      // 2. Bát Tự Synastry
      const chartA = generateBaziChart(dobA, hourA, genderA === 'male');
      const chartB = generateBaziChart(dobB, hourB, genderB === 'male');
      const bazi = computeBaziSynastry(chartA, chartB, genderA, genderB);
      expect(bazi).toBeDefined();
      expect(typeof bazi.totalScore).toBe('number');
      expect(validCompat).toContain(bazi.compatibility);
      expect(bazi.layers.length).toBe(5);
      expect(bazi.detail).toBeTruthy();

      // 3. Thần Số Học Synastry
      const num = computeNumerologySynastry(dobA, dobB);
      expect(num).toBeDefined();
      expect(typeof num.totalScore).toBe('number');
      expect(num.lifePathA).toBeGreaterThanOrEqual(1);
      expect(num.lifePathB).toBeGreaterThanOrEqual(1);
      expect(num.detail).toBeTruthy();

      // 4. Western Synastry
      const western = computeWesternSynastry(dobA, dobB, hourA, hourB);
      expect(western).toBeDefined();
      expect(typeof western.score).toBe('number');
      expect(western.score).toBeGreaterThanOrEqual(-15);
      expect(western.score).toBeLessThanOrEqual(15);
      expect(western.compatibility).toBeTruthy();
      expect(Array.isArray(western.aspects)).toBe(true);

      // 5. Radar normalization sanity check
      const normalize = (score: number, max: number) =>
        Math.round(Math.max(0, Math.min(100, 50 + (score / max) * 50)));
      const tuviNorm = normalize(tuvi.totalScore, 15);
      const baziNorm = normalize(bazi.totalScore, bazi.maxScore || 100);
      const numNorm = normalize(num.totalScore, 10);
      const westernNorm = normalize(western.score, 15);

      expect(tuviNorm).toBeGreaterThanOrEqual(0);
      expect(tuviNorm).toBeLessThanOrEqual(100);
      expect(baziNorm).toBeGreaterThanOrEqual(0);
      expect(baziNorm).toBeLessThanOrEqual(100);
      expect(numNorm).toBeGreaterThanOrEqual(0);
      expect(numNorm).toBeLessThanOrEqual(100);
      expect(westernNorm).toBeGreaterThanOrEqual(0);
      expect(westernNorm).toBeLessThanOrEqual(100);
    }
  }, 30000);
});
