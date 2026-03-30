/**
 * Unit Tests — Flying Star Engine (Huyền Không Phi Tinh)
 */

import { describe, it, expect } from 'vitest';
import {
  generateFlyingStarChart,
  calculateAnnualStar,
  calculateMonthlyStar,
  COMPASS_DIRECTIONS,
} from '@/utils/flyingStarEngine';

// ── generateFlyingStarChart ───────────────────────────────────

describe('generateFlyingStarChart', () => {
  it('should return a complete chart with 9 palaces', () => {
    const chart = generateFlyingStarChart(2024, 'Nam');
    expect(chart.palaces).toHaveLength(9);
    expect(chart.period).toBe(9); // 2024 = Period 9
    expect(chart.facingDirection).toBe('Nam');
  });

  it('should classify each palace as cat/hung/trung', () => {
    const chart = generateFlyingStarChart(2024, 'Bắc');
    for (const palace of chart.palaces) {
      expect(['cat', 'hung', 'trung']).toContain(palace.nature);
      expect(palace.periodStar).toBeGreaterThanOrEqual(1);
      expect(palace.periodStar).toBeLessThanOrEqual(9);
      expect(palace.mountainStar).toBeGreaterThanOrEqual(1);
      expect(palace.mountainStar).toBeLessThanOrEqual(9);
      expect(palace.waterStar).toBeGreaterThanOrEqual(1);
      expect(palace.waterStar).toBeLessThanOrEqual(9);
    }
  });

  it('should have valid interpretations and remedies', () => {
    const chart = generateFlyingStarChart(2024, 'Đông');
    for (const palace of chart.palaces) {
      expect(palace.interpretation).toBeTruthy();
      expect(palace.combination).toBeTruthy();
    }
  });

  it('should produce different charts for different facing directions', () => {
    const south = generateFlyingStarChart(2024, 'Nam');
    const north = generateFlyingStarChart(2024, 'Bắc');
    
    // At least some palaces should differ
    const southStars = south.palaces.map(p => `${p.mountainStar}-${p.waterStar}`);
    const northStars = north.palaces.map(p => `${p.mountainStar}-${p.waterStar}`);
    expect(southStars).not.toEqual(northStars);
  });

  it('should detect correct period from construction year', () => {
    expect(generateFlyingStarChart(2020, 'Nam').period).toBe(8); // 2004-2023 = Period 8
    expect(generateFlyingStarChart(2024, 'Nam').period).toBe(9); // 2024-2043 = Period 9
    expect(generateFlyingStarChart(1990, 'Nam').period).toBe(7); // 1984-2003 = Period 7
  });

  it('should respect manual period override', () => {
    const chart = generateFlyingStarChart(2024, 'Nam', 7);
    expect(chart.period).toBe(7);
  });

  it('should provide overall assessment', () => {
    const chart = generateFlyingStarChart(2024, 'Nam');
    expect(chart.overallAssessment).toBeTruthy();
    expect(chart.mainRemedies.length).toBeGreaterThan(0);
  });
});

// ── calculateAnnualStar ───────────────────────────────────────

describe('calculateAnnualStar', () => {
  it('should return center star between 1-9', () => {
    for (let y = 2020; y <= 2030; y++) {
      const result = calculateAnnualStar(y);
      expect(result.centerStar).toBeGreaterThanOrEqual(1);
      expect(result.centerStar).toBeLessThanOrEqual(9);
    }
  });

  it('should return a 3x3 star grid', () => {
    const result = calculateAnnualStar(2024);
    expect(result.starGrid).toHaveLength(3);
    for (const row of result.starGrid) {
      expect(row).toHaveLength(3);
      for (const cell of row) {
        expect(cell).toBeGreaterThanOrEqual(1);
        expect(cell).toBeLessThanOrEqual(9);
      }
    }
  });

  it('should cycle every 9 years', () => {
    const r1 = calculateAnnualStar(2024);
    const r2 = calculateAnnualStar(2033);
    expect(r1.centerStar).toBe(r2.centerStar);
  });

  it('should provide an interpretation', () => {
    const result = calculateAnnualStar(2024);
    expect(result.interpretation).toBeTruthy();
  });
});

// ── calculateMonthlyStar ──────────────────────────────────────

describe('calculateMonthlyStar', () => {
  it('should return center star between 1-9', () => {
    for (let m = 1; m <= 12; m++) {
      const result = calculateMonthlyStar(2024, m);
      expect(result.centerStar).toBeGreaterThanOrEqual(1);
      expect(result.centerStar).toBeLessThanOrEqual(9);
    }
  });

  it('should produce different values for different months', () => {
    const stars = new Set<number>();
    for (let m = 1; m <= 9; m++) {
      stars.add(calculateMonthlyStar(2024, m).centerStar);
    }
    // Should have at least 5 unique values across 9 months
    expect(stars.size).toBeGreaterThanOrEqual(5);
  });
});

// ── COMPASS_DIRECTIONS ────────────────────────────────────────

describe('COMPASS_DIRECTIONS', () => {
  it('should have exactly 24 entries', () => {
    expect(COMPASS_DIRECTIONS).toHaveLength(24);
  });

  it('should cover all 8 direction groups', () => {
    const groups = new Set(COMPASS_DIRECTIONS.map(d => d.group));
    expect(groups.size).toBe(8);
  });
});
