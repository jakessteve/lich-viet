import { describe, it, expect } from 'vitest';
import { synthesizeTamThuc } from '../../src/utils/tamThucSynthesis';

describe('Tam Thuc Synthesis Integration', () => {
  it('should run all three engines and produce a combined verdict', () => {
    // 2024-02-15 10:00 AM (Hour Tỵ)
    const testDate = new Date(2024, 1, 15, 10, 0, 0);
    const hourIndex = 5; // Tỵ

    const result = synthesizeTamThuc(testDate, hourIndex);

    expect(result.date).toBe(testDate);
    expect(result.hourBranchName).toBe('Tỵ');
    expect(result.methods.qmdj).toBeDefined();
    expect(result.methods.lucNham).toBeDefined();
    expect(result.methods.thaiAt).toBeDefined();
    expect(result.combinedVerdict).toBeDefined();
    expect(result.narrative).toBeDefined();
    expect(result.narrative.length).toBeGreaterThan(0);
  });
});
