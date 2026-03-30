import { describe, it, expect } from 'vitest';
import { calculateNatalChart } from '../src/utils/natalChartCalculator';
import type { BirthData } from '../src/types/westernAstro';

describe('Chiêm Tinh (Western Astrology) — Battle Testing & Fuzz Oracle', () => {

  it('Generates 500 random natal charts without crashing and maintains structural integrity', () => {
    const iterations = 500;
    let seed = 889900;
    function random() {
      seed = (1103515245 * seed + 12345) % 2147483648;
      return seed / 2147483648;
    }

    const validSigns = [
      'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
      'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
    ];

    for (let i = 0; i < iterations; i++) {
      const year = Math.floor(random() * 200) + 1900;
      const month = Math.floor(random() * 12) + 1;
      const day = Math.floor(random() * 28) + 1;
      const hour = Math.floor(random() * 24);
      const minute = Math.floor(random() * 60);
      // Constrain latitude to valid range (-66 to 66 to avoid extreme polar issues)
      const latitude = (random() * 132) - 66;
      const longitude = (random() * 360) - 180;
      const timezone = Math.floor(longitude / 15);

      const birthData: BirthData = { year, month, day, hour, minute, latitude, longitude, timezone };

      const chart = calculateNatalChart(birthData);

      expect(chart).toBeDefined();

      // A. Exactly 10 planets
      expect(chart.planets.length).toBe(10);
      for (const planet of chart.planets) {
        expect(validSigns).toContain(planet.sign);
        expect(planet.degree).toBeGreaterThanOrEqual(0);
        expect(planet.degree).toBeLessThan(360);
        expect(planet.house).toBeGreaterThanOrEqual(1);
        expect(planet.house).toBeLessThanOrEqual(12);
      }

      // B. Exactly 12 house cusps
      expect(chart.houses.length).toBe(12);
      for (const house of chart.houses) {
        expect(house.number).toBeGreaterThanOrEqual(1);
        expect(house.number).toBeLessThanOrEqual(12);
        expect(validSigns).toContain(house.sign);
        expect(house.degree).toBeGreaterThanOrEqual(0);
        expect(house.degree).toBeLessThan(360);
      }

      // C. Angles exist with valid signs
      expect(validSigns).toContain(chart.angles.ascendant.sign);
      expect(validSigns).toContain(chart.angles.midheaven.sign);
      expect(validSigns).toContain(chart.angles.descendant.sign);
      expect(validSigns).toContain(chart.angles.imumCoeli.sign);

      // D. ASC + 180 ≈ DSC (within rounding)
      const ascDsc = Math.abs(((chart.angles.ascendant.degree + 180) % 360) - chart.angles.descendant.degree);
      expect(ascDsc).toBeLessThan(1);

      // E. Aspects have valid data
      for (const aspect of chart.aspects) {
        expect(aspect.planet1).toBeTruthy();
        expect(aspect.planet2).toBeTruthy();
        expect(aspect.angle).toBeGreaterThanOrEqual(0);
      }

      // F. Sun and Moon shortcuts exist
      expect(chart.sun).toBeDefined();
      expect(chart.moon).toBeDefined();
      expect(chart.ascendantSign).toBeTruthy();
    }
  }, 30000);
});
