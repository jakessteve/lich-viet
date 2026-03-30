import { describe, it, expect } from 'vitest';
import { generateQmdjChart } from '../src/utils/qmdjEngine';
import type { Chi } from '../src/types/calendar';

const CHI_LIST: Chi[] = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

describe('Kỳ Môn Độn Giáp - Battle Testing & Fuzz Oracle', () => {

  it('Generates 1,000 random QMDJ charts without crashing and maintains structural integrity', () => {
    const iterations = 1000;
    
    // Seeded random for deterministic but wide coverage
    let seed = 123456789;
    function random() {
      seed = (1103515245 * seed + 12345) % 2147483648;
      return seed / 2147483648;
    }

    for (let i = 0; i < iterations; i++) {
      // Generate random date between 1900 and 2100
      const year = Math.floor(random() * 200) + 1900;
      const month = Math.floor(random() * 12);
      const day = Math.floor(random() * 28) + 1;
      const date = new Date(year, month, day);
      
      const hourChiIndex = Math.floor(random() * 12);
      const hourChi = CHI_LIST[hourChiIndex];

      // Ensure no crashes
      const chart = generateQmdjChart(date, hourChi);

      // --- Structural Integrity Checks ---

      // 1. Basic properties exist
      expect(chart).toBeDefined();
      expect(chart.gameNumber).toBeGreaterThanOrEqual(1);
      expect(chart.gameNumber).toBeLessThanOrEqual(9);
      expect(typeof chart.isDuongDon).toBe('boolean');
      expect(chart.palaces.length).toBe(9);

      // 2. Palace Contents
      let centerPalaceCount = 0;
      let peripheralPalaceCount = 0;

      for (const palace of chart.palaces) {
        if (palace.number === 5) {
          centerPalaceCount++;
          // Center palace has no door or deity in standard QMDJ
          expect(palace.door).toBeNull();
          expect(palace.deity).toBeNull();
          // Heavenly stem and earth stem should still exist (Ký Cung)
          expect(palace.earthStem).toBeTruthy();
        } else {
          peripheralPalaceCount++;
          // Every other palace MUST have a Door, Deity, Heaven Stem, Earth Stem, and Star
          try {
            if (!palace.door) throw new Error(`Missing Door in palace ${palace.number} for ${date.toISOString()} hour ${hourChi}`);
            if (!palace.deity) throw new Error(`Missing Deity in palace ${palace.number} for ${date.toISOString()} hour ${hourChi}`);
            if (!palace.star) throw new Error(`Missing Star in palace ${palace.number} for ${date.toISOString()} hour ${hourChi}`);
            if (!palace.heavenlyStem) throw new Error(`Missing Heavenly Stem in palace ${palace.number} for ${date.toISOString()} hour ${hourChi}`);
            if (!palace.earthStem) throw new Error(`Missing Earth Stem in palace ${palace.number} for ${date.toISOString()} hour ${hourChi}`);
          } catch (e: any) {
            console.error(e.message);
            throw e;
          }
        }
      }

      expect(centerPalaceCount).toBe(1);
      expect(peripheralPalaceCount).toBe(8);

      // 3. Formations Array is robust
      expect(Array.isArray(chart.formations)).toBe(true);
    }
  });

});
