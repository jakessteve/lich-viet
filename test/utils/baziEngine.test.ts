/**
 * Unit Tests — Bazi Engine (Bát Tự / Tứ Trụ)
 */

import { describe, it, expect } from 'vitest';
import { generateBaziChart, adjustForTrueSolarTime } from '../../src/utils/baziEngine';

// ── generateBaziChart ─────────────────────────────────────────

describe('generateBaziChart', () => {
  it('should return a complete chart with all required fields', () => {
    const chart = generateBaziChart(new Date(1990, 0, 15), 10, true);
    expect(chart).toHaveProperty('yearPillar');
    expect(chart).toHaveProperty('monthPillar');
    expect(chart).toHaveProperty('dayPillar');
    expect(chart).toHaveProperty('hourPillar');
    expect(chart).toHaveProperty('dayMaster');
    expect(chart).toHaveProperty('cachCuc');
    expect(chart).toHaveProperty('dieuHau');
    expect(chart).toHaveProperty('elementCount');
    expect(chart).toHaveProperty('thanSat');
    expect(chart).toHaveProperty('luckCycles');
    expect(chart).toHaveProperty('thapThan');
    expect(chart).toHaveProperty('tangCan');
    expect(chart).toHaveProperty('branchInteractions');
    expect(chart).toHaveProperty('khongVong');
    expect(chart).toHaveProperty('daiVanStartAge');
    expect(chart).toHaveProperty('truongSinh');
  });

  it('should produce valid four pillars with Can and Chi', () => {
    const chart = generateBaziChart(new Date(1990, 0, 15), 10, true);
    for (const pillar of [chart.yearPillar, chart.monthPillar, chart.dayPillar, chart.hourPillar]) {
      expect(pillar.can).toBeTruthy();
      expect(pillar.chi).toBeTruthy();
      expect(pillar.canElement).toBeTruthy();
      expect(pillar.chiElement).toBeTruthy();
      expect(pillar.napAm).toBeTruthy();
    }
  });

  it('should classify Day Master strength', () => {
    const chart = generateBaziChart(new Date(1990, 0, 15), 10, true);
    expect(['vượng', 'trung_bình', 'suy']).toContain(chart.dayMaster.strength);
    expect(chart.dayMaster.dayMaster).toBeTruthy();
    expect(chart.dayMaster.dayMasterElement).toBeTruthy();
    expect(chart.dayMaster.favorableElements.length).toBeGreaterThan(0);
  });

  it('should derive Cách Cục', () => {
    const chart = generateBaziChart(new Date(1990, 0, 15), 10, true);
    expect(chart.cachCuc.name).toBeTruthy();
    expect(chart.cachCuc.description).toBeTruthy();
  });

  it('should calculate element distribution totaling 8', () => {
    const chart = generateBaziChart(new Date(1990, 0, 15), 10, true);
    const total = Object.values(chart.elementCount).reduce((s: number, v: unknown) => s + (v as number), 0);
    expect(total).toBe(8); // 4 pillars × 2 (can + chi)
  });

  it('should produce at least one Thần Sát', () => {
    const chart = generateBaziChart(new Date(1990, 0, 15), 10, true);
    expect(chart.thanSat.length).toBeGreaterThan(0);
    for (const ts of chart.thanSat) {
      expect(['cat', 'hung', 'trung']).toContain(ts.nature);
    }
  });

  it('should generate 8 luck cycles', () => {
    const chart = generateBaziChart(new Date(1990, 0, 15), 10, true);
    expect(chart.luckCycles).toHaveLength(8);
    for (const cycle of chart.luckCycles) {
      expect(cycle.startAge).toBeLessThan(cycle.endAge);
      expect(['cat', 'hung', 'trung']).toContain(cycle.rating);
    }
  });

  it('should calculate Thập Thần entries', () => {
    const chart = generateBaziChart(new Date(1990, 0, 15), 10, true);
    expect(chart.thapThan.length).toBeGreaterThan(0);
    for (const tt of chart.thapThan) {
      expect(tt.god).toBeTruthy();
      expect(['cat', 'hung', 'trung']).toContain(tt.godNature);
    }
  });

  it('should calculate Tàng Can for all 4 branches', () => {
    const chart = generateBaziChart(new Date(1990, 0, 15), 10, true);
    expect(chart.tangCan).toHaveLength(4);
    for (const tc of chart.tangCan) {
      expect(tc.hiddenStems.length).toBeGreaterThan(0);
    }
  });

  it('should calculate Không Vong with two empty branches', () => {
    const chart = generateBaziChart(new Date(1990, 0, 15), 10, true);
    expect(chart.khongVong).toBeDefined();
    expect(chart.khongVong!.branch1).toBeTruthy();
    expect(chart.khongVong!.branch2).toBeTruthy();
    expect(chart.khongVong!.branch1).not.toBe(chart.khongVong!.branch2);
  });

  it('should calculate Đại Vận start age >= 1', () => {
    const chart = generateBaziChart(new Date(1990, 0, 15), 10, true);
    expect(chart.daiVanStartAge).toBeGreaterThanOrEqual(1);
  });

  it('should calculate Trường Sinh for all 4 pillars', () => {
    const chart = generateBaziChart(new Date(1990, 0, 15), 10, true);
    expect(chart.truongSinh).toHaveLength(4);
    for (const ts of chart.truongSinh!) {
      expect(ts.phase).toBeTruthy();
      expect(ts.meaning).toBeTruthy();
    }
  });

  it('should handle different genders producing different luck cycle directions', () => {
    const male = generateBaziChart(new Date(1990, 0, 15), 10, true);
    const female = generateBaziChart(new Date(1990, 0, 15), 10, false);
    // Luck cycles may differ in direction (can/chi sequence)
    const maleCans = male.luckCycles.map((c: any) => c.can);
    const femaleCans = female.luckCycles.map((c: any) => c.can);
    // At least some should differ for different genders
    expect(maleCans).not.toEqual(femaleCans);
  });
});

// ── adjustForTrueSolarTime ────────────────────────────────────

describe('adjustForTrueSolarTime', () => {
  it('should not change hour for Vietnam standard meridian (105°E)', () => {
    const adjusted = adjustForTrueSolarTime(new Date(2024, 5, 15), 12, 105);
    // At standard meridian, only EOT correction applies (small offset)
    expect(adjusted).toBeGreaterThanOrEqual(11);
    expect(adjusted).toBeLessThanOrEqual(13);
  });

  it('should shift hour for locations far from standard meridian', () => {
    // 120°E is 15° east of standard → +60 min shift
    const adjusted = adjustForTrueSolarTime(new Date(2024, 5, 15), 12, 120);
    expect(adjusted).toBeGreaterThanOrEqual(12);
    expect(adjusted).toBeLessThanOrEqual(14);
  });

  it('should always return 0-23', () => {
    for (let h = 0; h < 24; h++) {
      const adjusted = adjustForTrueSolarTime(new Date(2024, 0, 1), h, 105);
      expect(adjusted).toBeGreaterThanOrEqual(0);
      expect(adjusted).toBeLessThan(24); // float hours: 23.95 means 23:57, valid in [0, 24)
    }
  });
});
