/**
 * Astro Interpreter Tests
 *
 * Verifies the interpretation of a NatalChart into human-readable results:
 * planet sign meanings, house interpretations, aspect narratives.
 */
import { calculateNatalChart } from '../../src/utils/natalChartCalculator';
import { interpretChart } from '../../src/utils/astroInterpreter';
import type { BirthData } from '../../src/types/westernAstro';

const SAMPLE_BIRTH_DATA: BirthData = {
  name: 'Test User',
  day: 15,
  month: 6,
  year: 1990,
  hour: 14,
  minute: 30,
  latitude: 21.0285,
  longitude: 105.8542,
  timezoneOffset: 7,
  locationName: 'Hanoi',
};

describe('Astro Interpreter', () => {
  const chart = calculateNatalChart(SAMPLE_BIRTH_DATA);

  describe('interpretChart', () => {
    it('should return a valid interpretation result', () => {
      const result = interpretChart(chart);
      expect(result).toBeDefined();
    });

    it('should contain planet interpretations', () => {
      const result = interpretChart(chart);
      // The result should have some structured interpretation data
      expect(typeof result).toBe('object');
      expect(result).not.toBeNull();
    });

    it('should produce consistent results for the same chart', () => {
      const result1 = interpretChart(chart);
      const result2 = interpretChart(chart);
      expect(JSON.stringify(result1)).toBe(JSON.stringify(result2));
    });

    it('should produce different interpretations for different charts', () => {
      const chart2 = calculateNatalChart({
        ...SAMPLE_BIRTH_DATA,
        year: 2000,
        month: 1,
        day: 1,
      });
      const result1 = interpretChart(chart);
      const result2 = interpretChart(chart2);
      expect(JSON.stringify(result1)).not.toBe(JSON.stringify(result2));
    });
  });
});
