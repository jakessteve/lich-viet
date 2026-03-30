import { beforeAll, describe, it, expect } from 'vitest';
import { 
  buildTimeBasedInput, 
  performTimeBasedDivination, 
  ensureHexagramsLoaded 
} from '../src/utils/maiHoaEngine';

describe('Mai Hoa Dịch Số - Battle Testing & Fuzz Oracle', () => {

  beforeAll(async () => {
    // Mai Hoa engine lazy-loads 200KB of hexagram data.
    // Must be initialized before synchronous divination functions are called.
    await ensureHexagramsLoaded();
  });

  it('Generates 1,000 random Mai Hoa charts without crashing and maintains structural integrity', () => {
    const iterations = 1000;
    
    // Seeded random for deterministic coverage
    let seed = 987654321;
    function random() {
      seed = (1103515245 * seed + 12345) % 2147483648;
      return seed / 2147483648;
    }

    for (let i = 0; i < iterations; i++) {
      // 1. Generate acceptable random bounds for Mai Hoa inputs
      // Lunar year: 1900 - 2100
      const lunarYear = Math.floor(random() * 200) + 1900;
      // Lunar month: 1 - 12
      const lunarMonth = Math.floor(random() * 12) + 1;
      // Lunar day: 1 - 30
      const lunarDay = Math.floor(random() * 30) + 1;
      // Solar hour: 0 - 23
      const currentHour = Math.floor(random() * 24);

      // 2. Build input safely
      const input = buildTimeBasedInput(lunarYear, lunarMonth, lunarDay, currentHour);
      
      // 3. Perform divination
      const chart = performTimeBasedDivination(input);

      // --- Structural Integrity Checks ---

      // A. Main structures exist
      expect(chart).toBeDefined();
      expect(chart.mainHexagram).toBeDefined();
      expect(chart.mutualHexagram).toBeDefined();
      expect(chart.changedHexagram).toBeDefined();

      // B. Moving line is strictly bounded [1, 6]
      expect(chart.movingLine).toBeGreaterThanOrEqual(1);
      expect(chart.movingLine).toBeLessThanOrEqual(6);

      // C. Thể / Dụng identities
      expect(['upper', 'lower']).toContain(chart.theTrigram);
      expect(['upper', 'lower']).toContain(chart.dungTrigram);
      expect(chart.theTrigram).not.toBe(chart.dungTrigram);

      // D. Elements resolution
      const validElements = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
      expect(validElements).toContain(chart.elements.theElement);
      expect(validElements).toContain(chart.elements.dungElement);

      // E. Hào (Lines) details exist and count is exactly 6
      expect(chart.mainHaoDetails.length).toBe(6);
      expect(chart.mutualHaoDetails.length).toBe(6);
      expect(chart.changedHaoDetails.length).toBe(6);

      // F. Exactly one line is marked as moving in the main hexagram
      const movingLines = chart.mainHaoDetails.filter(hao => hao.isMoving);
      expect(movingLines.length).toBe(1);
      expect(movingLines[0].position).toBe(chart.movingLine);

      // G. Exactly one line is Thế and one is Ứng
      const theLines = chart.mainHaoDetails.filter(hao => hao.isTh);
      const ungLines = chart.mainHaoDetails.filter(hao => hao.isUng);
      expect(theLines.length).toBe(1);
      expect(ungLines.length).toBe(1);
    }
  });

});
