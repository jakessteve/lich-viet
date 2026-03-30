/**
 * Natal Chart Calculator Tests
 *
 * Verifies the Western astrology chart generation: planet positions,
 * house cusps, aspect detection, and secondary progressions.
 */
import { calculateNatalChart, calculateSecondaryProgressions } from '../../src/utils/natalChartCalculator';
import type { BirthData } from '../../src/types/westernAstro';

const SAMPLE_BIRTH_DATA: BirthData = {
  name: 'Test User',
  day: 15,
  month: 6,
  year: 1990,
  hour: 14,
  minute: 30,
  latitude: 21.0285,    // Hanoi
  longitude: 105.8542,
  timezone: 7,
  locationName: 'Hanoi',
};

describe('Natal Chart Calculator', () => {
  describe('calculateNatalChart', () => {
    it('should return a valid chart structure', () => {
      const chart = calculateNatalChart(SAMPLE_BIRTH_DATA);
      expect(chart).toBeDefined();
      expect(chart.birthData).toEqual(SAMPLE_BIRTH_DATA);
      expect(chart.planets).toBeDefined();
      expect(chart.houses).toBeDefined();
      expect(chart.aspects).toBeDefined();
      expect(chart.angles).toBeDefined();
      expect(chart.overview).toBeDefined();
    });

    it('should calculate all major planet positions', () => {
      const chart = calculateNatalChart(SAMPLE_BIRTH_DATA);
      const planetIds = chart.planets.map(p => p.id);
      expect(planetIds).toContain('sun');
      expect(planetIds).toContain('moon');
      expect(planetIds).toContain('mercury');
      expect(planetIds).toContain('venus');
      expect(planetIds).toContain('mars');
      expect(planetIds).toContain('jupiter');
      expect(planetIds).toContain('saturn');
    });

    it('should produce planet degrees in 0-360 range', () => {
      const chart = calculateNatalChart(SAMPLE_BIRTH_DATA);
      chart.planets.forEach(planet => {
        expect(planet.degree).toBeGreaterThanOrEqual(0);
        expect(planet.degree).toBeLessThan(360);
      });
    });

    it('should calculate 12 houses', () => {
      const chart = calculateNatalChart(SAMPLE_BIRTH_DATA);
      expect(chart.houses.length).toBe(12);
      chart.houses.forEach(house => {
        expect(house.degree).toBeGreaterThanOrEqual(0);
        expect(house.degree).toBeLessThan(360);
      });
    });

    it('should include Sun and Moon convenience accessors', () => {
      const chart = calculateNatalChart(SAMPLE_BIRTH_DATA);
      expect(chart.sun).toBeDefined();
      expect(chart.sun.id).toBe('sun');
      expect(chart.moon).toBeDefined();
      expect(chart.moon.id).toBe('moon');
    });

    it('should detect aspects between planets', () => {
      const chart = calculateNatalChart(SAMPLE_BIRTH_DATA);
      expect(Array.isArray(chart.aspects)).toBe(true);
      chart.aspects.forEach(aspect => {
        expect(aspect.planet1).toBeDefined();
        expect(aspect.planet2).toBeDefined();
        expect(aspect.type).toBeDefined();
        expect(typeof aspect.orb).toBe('number');
      });
    });

    it('should produce different charts for different birth data', () => {
      const chart1 = calculateNatalChart(SAMPLE_BIRTH_DATA);
      const chart2 = calculateNatalChart({
        ...SAMPLE_BIRTH_DATA,
        year: 2000,
        month: 1,
        day: 1,
      });
      expect(chart1.sun.degree).not.toBeCloseTo(chart2.sun.degree, 0);
    });

    it('should include chart angles (ASC, MC)', () => {
      const chart = calculateNatalChart(SAMPLE_BIRTH_DATA);
      expect(chart.angles.ascendant).toBeDefined();
      expect(chart.angles.midheaven).toBeDefined();
      expect(chart.ascendantSign).toBeDefined();
    });

    it('should not crash with edge-case birth data', () => {
      // Equator
      expect(() => calculateNatalChart({
        ...SAMPLE_BIRTH_DATA,
        latitude: 0,
        longitude: 0,
      })).not.toThrow();

      // Midnight
      expect(() => calculateNatalChart({
        ...SAMPLE_BIRTH_DATA,
        hour: 0,
        minute: 0,
      })).not.toThrow();
    });
  });

  describe('calculateSecondaryProgressions', () => {
    it('should return a valid progressions structure', () => {
      const chart = calculateNatalChart(SAMPLE_BIRTH_DATA);
      const progressions = calculateSecondaryProgressions(SAMPLE_BIRTH_DATA, chart, 36);
      expect(progressions).toBeDefined();
      expect(progressions.targetAge).toBe(36);
      expect(progressions.positions).toBeDefined();
      expect(progressions.positions.length).toBeGreaterThan(0);
    });

    it('should produce progressed degrees in 0-360 range', () => {
      const chart = calculateNatalChart(SAMPLE_BIRTH_DATA);
      const progressions = calculateSecondaryProgressions(SAMPLE_BIRTH_DATA, chart, 36);
      progressions.positions.forEach(pos => {
        expect(pos.progressedDegree).toBeGreaterThanOrEqual(0);
        expect(pos.progressedDegree).toBeLessThan(360);
      });
    });
  });
});
