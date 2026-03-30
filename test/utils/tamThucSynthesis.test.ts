/**
 * Tam Thuc Synthesis Tests
 *
 * Verifies the three-method divination synthesis engine:
 * combining Thái Ất, QMDJ, and Lục Nhâm results.
 */
import { synthesizeTamThuc } from '../../src/utils/tamThucSynthesis';

describe('Tam Thuc Synthesis', () => {
  describe('synthesizeTamThuc', () => {
    it('should return a valid synthesis result', () => {
      const result = synthesizeTamThuc(new Date(2026, 0, 15), 3);
      expect(result).toBeDefined();
      expect(result.date).toBeDefined();
      expect(result.hourBranchName).toBeDefined();
    });

    it('should include method summaries for all three methods', () => {
      const result = synthesizeTamThuc(new Date(2026, 0, 15), 3);
      expect(result.methods).toBeDefined();
      expect(result.methods.qmdj).toBeDefined();
      expect(result.methods.lucNham).toBeDefined();
      expect(result.methods.thaiAt).toBeDefined();

      // Each method should have a verdict
      ['qmdj', 'lucNham', 'thaiAt'].forEach(key => {
        const method = result.methods[key as keyof typeof result.methods];
        expect(method.name).toBeDefined();
        expect(method.verdict).toBeDefined();
        expect(['cat', 'hung', 'trungBinh']).toContain(method.verdict);
      });
    });

    it('should produce a combined verdict', () => {
      const result = synthesizeTamThuc(new Date(2026, 0, 15), 3);
      expect(['cat', 'hung', 'trungBinh']).toContain(result.combinedVerdict);
      expect(result.combinedLabel).toBeDefined();
      expect(typeof result.combinedLabel).toBe('string');
    });

    it('should produce consistent results for the same inputs', () => {
      const date = new Date(2026, 5, 15);
      const r1 = synthesizeTamThuc(date, 5);
      const r2 = synthesizeTamThuc(date, 5);
      expect(r1.combinedVerdict).toBe(r2.combinedVerdict);
      expect(r1.narrative).toBe(r2.narrative);
    });

    it('should handle all 12 hour indices', () => {
      for (let h = 0; h < 12; h++) {
        expect(() => synthesizeTamThuc(new Date(2026, 0, 15), h)).not.toThrow();
      }
    });

    it('should include a narrative synthesis text', () => {
      const result = synthesizeTamThuc(new Date(2026, 3, 15), 6);
      expect(result.narrative).toBeDefined();
      expect(typeof result.narrative).toBe('string');
      expect(result.narrative.length).toBeGreaterThan(0);
    });

    it('should include agreement count', () => {
      const result = synthesizeTamThuc(new Date(2026, 0, 15), 0);
      expect(typeof result.agreementCount).toBe('number');
      expect(result.agreementCount).toBeGreaterThanOrEqual(0);
      expect(result.agreementCount).toBeLessThanOrEqual(3);
    });

    it('should map correct hour branch name', () => {
      const result = synthesizeTamThuc(new Date(2026, 0, 15), 0);
      expect(result.hourBranchName).toBe('Tý');

      const result6 = synthesizeTamThuc(new Date(2026, 0, 15), 6);
      expect(result6.hourBranchName).toBe('Ngọ');
    });
  });
});
