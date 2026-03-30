/**
 * Thái Ất Engine — Unit Tests
 */

import { describe, it, expect } from 'vitest';
import { getThaiAtYearChart, getThaiAtMonthOverlay, getCosmicForecast } from '../../src/utils/thaiAtEngine';

describe('thaiAtEngine', () => {

  describe('getThaiAtYearChart', () => {
    it('returns a valid chart for 2026', () => {
      const chart = getThaiAtYearChart(2026);
      expect(chart).toBeDefined();
      expect(chart.lunarYear).toBe(2026);
      expect(chart.canChiYear).toBeTruthy();
      expect(chart.thaiAtPalace).toBeGreaterThanOrEqual(1);
      expect(chart.thaiAtPalace).toBeLessThanOrEqual(16);
    });

    it('has correct structure for palace info', () => {
      const chart = getThaiAtYearChart(2026);
      expect(chart.thaiAtPalaceInfo).toBeDefined();
      expect(chart.thaiAtPalaceInfo.nameVi).toBeTruthy();
      expect(chart.thaiAtPalaceInfo.direction).toBeTruthy();
      expect(chart.thaiAtPalaceInfo.element).toBeTruthy();
    });

    it('places exactly 5 deities', () => {
      const chart = getThaiAtYearChart(2026);
      expect(chart.deityPositions).toHaveLength(5);
      const ids = chart.deityPositions.map(d => d.id);
      expect(ids).toContain('thaiAt');
      expect(ids).toContain('vanXuong');
      expect(ids).toContain('thiKich');
    });

    it('calculates host/guest counts', () => {
      const chart = getThaiAtYearChart(2026);
      expect(chart.hostGuest.hostCount).toBeGreaterThan(0);
      expect(chart.hostGuest.guestCount).toBeGreaterThan(0);
      expect(['hostDominant', 'guestDominant', 'balanced']).toContain(chart.hostGuest.dominance);
      expect(chart.hostGuest.dominanceLabel).toBeTruthy();
    });

    it('has correct epoch position structure', () => {
      const chart = getThaiAtYearChart(2026);
      expect(chart.epochPosition.superiorEpochYear).toBeGreaterThanOrEqual(1);
      expect(chart.epochPosition.superiorEpochYear).toBeLessThanOrEqual(360);
      expect(chart.epochPosition.cycleNumber).toBeGreaterThanOrEqual(1);
      expect(chart.epochPosition.cycleNumber).toBeLessThanOrEqual(5);
      expect(chart.epochPosition.cycleYear).toBeGreaterThanOrEqual(1);
      expect(chart.epochPosition.cycleYear).toBeLessThanOrEqual(72);
    });

    it('produces different charts for different years', () => {
      const chart2025 = getThaiAtYearChart(2025);
      const chart2026 = getThaiAtYearChart(2026);
      const chart2030 = getThaiAtYearChart(2030);
      // At least one field should differ
      const palacesDiffer = chart2025.thaiAtPalace !== chart2026.thaiAtPalace || chart2026.thaiAtPalace !== chart2030.thaiAtPalace;
      const hostsDiffer = chart2025.hostGuest.hostCount !== chart2026.hostGuest.hostCount;
      expect(palacesDiffer || hostsDiffer).toBe(true);
    });
  });

  describe('getThaiAtMonthOverlay', () => {
    it('returns valid monthly data', () => {
      const overlay = getThaiAtMonthOverlay(2026, 3);
      expect(overlay).toBeDefined();
      expect(overlay.lunarMonth).toBe(3);
      expect(overlay.adjustedPalace).toBeGreaterThanOrEqual(1);
      expect(overlay.adjustedPalace).toBeLessThanOrEqual(16);
      expect(overlay.shiftNote).toBeTruthy();
    });

    it('covers all 12 months without error', () => {
      for (let m = 1; m <= 12; m++) {
        const overlay = getThaiAtMonthOverlay(2026, m);
        expect(overlay.lunarMonth).toBe(m);
        expect(overlay.adjustedPalace).toBeGreaterThanOrEqual(1);
      }
    });
  });

  describe('getCosmicForecast', () => {
    it('returns a compact forecast for landing page', () => {
      const forecast = getCosmicForecast(2026);
      expect(forecast).toBeDefined();
      expect(forecast.year).toBe(2026);
      expect(forecast.canChiYear).toBeTruthy();
      expect(forecast.oneLiner).toBeTruthy();
      expect(['optimistic', 'neutral', 'cautious']).toContain(forecast.tone);
      expect(forecast.element).toBeTruthy();
      expect(forecast.palaceName).toBeTruthy();
      expect(forecast.hostGuestLabel).toBeTruthy();
    });
  });
});
