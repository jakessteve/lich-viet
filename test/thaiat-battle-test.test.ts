import { describe, it, expect } from 'vitest';
import { getThaiAtYearChart, getThaiAtMonthOverlay, getCosmicForecast } from '../src/utils/thaiAtEngine';

describe('Thái Ất Thần Số — Battle Testing & Fuzz Oracle', () => {

  it('Generates 1,000 random Thái Ất year charts without crashing and maintains structural integrity', () => {
    const iterations = 1000;
    let seed = 112233;
    function random() {
      seed = (1103515245 * seed + 12345) % 2147483648;
      return seed / 2147483648;
    }

    const validElements = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
    const validDominance = ['hostDominant', 'guestDominant', 'balanced'];

    for (let i = 0; i < iterations; i++) {
      const lunarYear = Math.floor(random() * 200) + 1900;

      // --- Year Chart ---
      const chart = getThaiAtYearChart(lunarYear);

      expect(chart).toBeDefined();
      expect(chart.lunarYear).toBe(lunarYear);

      // Palace number ∈ [1, 16]
      expect(chart.thaiAtPalace).toBeGreaterThanOrEqual(1);
      expect(chart.thaiAtPalace).toBeLessThanOrEqual(16);

      // Palace info exists
      expect(chart.thaiAtPalaceInfo).toBeDefined();
      expect(chart.thaiAtPalaceInfo.nameVi).toBeTruthy();

      // All 5 deities are placed
      expect(chart.deityPositions.length).toBe(5);
      for (const deity of chart.deityPositions) {
        expect(deity.palace).toBeGreaterThanOrEqual(1);
        expect(deity.palace).toBeLessThanOrEqual(16);
        expect(deity.nameVi).toBeTruthy();
      }

      // Host/Guest results
      expect(chart.hostGuest.hostCount).toBeGreaterThan(0);
      expect(chart.hostGuest.guestCount).toBeGreaterThan(0);
      expect(chart.hostGuest.fixedCount).toBeGreaterThan(0);
      expect(validDominance).toContain(chart.hostGuest.dominance);

      // Element validity
      expect(validElements).toContain(chart.element);

      // Epoch position
      expect(chart.epochPosition.superiorEpochYear).toBeGreaterThanOrEqual(1);
      expect(chart.epochPosition.superiorEpochYear).toBeLessThanOrEqual(360);

      // Forecast tone
      expect(['optimistic', 'cautious', 'neutral']).toContain(chart.forecastTone);

      // Palace element analysis
      expect(chart.palaceElementAnalysis).toBeDefined();
      expect(validElements).toContain(chart.palaceElementAnalysis.yearElement);

      // --- Month Overlay (random month 1–12) ---
      const month = Math.floor(random() * 12) + 1;
      const overlay = getThaiAtMonthOverlay(lunarYear, month);
      expect(overlay.adjustedPalace).toBeGreaterThanOrEqual(1);
      expect(overlay.adjustedPalace).toBeLessThanOrEqual(16);
      expect(overlay.lunarMonth).toBe(month);

      // --- Cosmic Forecast ---
      const forecast = getCosmicForecast(lunarYear);
      expect(forecast.year).toBe(lunarYear);
      expect(forecast.oneLiner).toBeTruthy();
      expect(forecast.palaceName).toBeTruthy();
    }
  });
});
