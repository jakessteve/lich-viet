import { describe, it, expect } from 'vitest';
import { generateBaziChart } from '../src/utils/baziEngine';

describe('Bazi Year Boundary Reproduction', () => {
  it('should correctly identify Bazi year 2026 (Bính Ngọ) for birth after Lập Xuân but before Tet', () => {
    // 2026-02-10 is after Lập Xuân (Feb 4) but before Tet (Feb 17)
    // Lunar year is still 2025 (Ất Tỵ)
    // Bazi year should be 2026 (Bính Ngọ)
    const birthDate = new Date(2026, 1, 10); // Month is 0-indexed, 1 = February
    const chart = generateBaziChart(birthDate, 10, true);
    
    console.log('Birth Date:', birthDate.toDateString());
    console.log('Year Pillar:', chart.yearPillar.can, chart.yearPillar.chi);
    
    // This is expected to FAIL with current implementation
    expect(chart.yearPillar.can).toBe('Bính');
    expect(chart.yearPillar.chi).toBe('Ngọ');
  });
});
