/**
 * Bazi Stars Tests
 *
 * Verifies Thập Thần derivation, Tàng Can tables, Branch interactions,
 * Thần Sát stars, Day Master analysis, Trường Sinh cycle, and Cách Cục.
 */
import {
  deriveThapThan,
  buildTangCan,
  detectBranchInteractions,
  deriveThanSat,
  analyzeDayMaster,
  classifyCachCuc,
  assessDieuHau,
  calculateTruongSinh,
  TANG_CAN_TABLE,
} from '../../src/utils/baziStars';
import type { Can, Chi } from '../../src/types/bazi';

// Helper to create a Pillar with all required fields
function makePillar(can: Can, chi: Chi, label: string, labelVi: string) {
  return { can, chi, label, labelVi, canElement: 'Mộc' as const, chiElement: 'Thủy' as const, napAm: 'Test', napAmElement: 'Mộc' as const };
}

describe('Bazi Stars', () => {
  describe('TANG_CAN_TABLE', () => {
    it('should have entries for all 12 Earthly Branches', () => {
      const branches: Chi[] = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
      branches.forEach(chi => {
        expect(TANG_CAN_TABLE[chi]).toBeDefined();
        expect(TANG_CAN_TABLE[chi].length).toBeGreaterThan(0);
      });
    });

    it('should have valid strength values', () => {
      Object.values(TANG_CAN_TABLE).forEach(entries => {
        entries.forEach(entry => {
          expect(['chính_khí', 'trung_khí', 'dư_khí']).toContain(entry.strength);
        });
      });
    });
  });

  describe('deriveThapThan', () => {
    it('should return Tỉ Kiên for same stem (same polarity)', () => {
      const result = deriveThapThan('Giáp', 'Giáp');
      expect(result).toBe('Tỉ Kiên');
    });

    it('should return Kiếp Tài for same element different polarity', () => {
      const result = deriveThapThan('Giáp', 'Ất');
      expect(result).toBe('Kiếp Tài');
    });

    it('should produce different results for different can pairs', () => {
      const r1 = deriveThapThan('Giáp', 'Bính');
      const r2 = deriveThapThan('Giáp', 'Canh');
      expect(r1).not.toBe(r2);
    });

    it('should return a non-empty string for all valid combinations', () => {
      const cans: Can[] = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
      cans.forEach(dm => {
        cans.forEach(target => {
          const result = deriveThapThan(dm, target);
          expect(typeof result).toBe('string');
          expect(result.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('buildTangCan', () => {
    it('should return Tàng Can for each pillar', () => {
      const pillars = [
        makePillar('Giáp', 'Tý', 'Year', 'Năm'),
        makePillar('Ất', 'Sửu', 'Month', 'Tháng'),
        makePillar('Bính', 'Dần', 'Day', 'Ngày'),
        makePillar('Đinh', 'Mão', 'Hour', 'Giờ'),
      ];
      const result = buildTangCan(pillars);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(4);
    });
  });

  describe('detectBranchInteractions', () => {
    it('should detect xung (clash) interactions', () => {
      // Tý-Ngọ and Mão-Dậu are classic clashes
      const pillars = [
        makePillar('Giáp', 'Tý', 'Year', 'Năm'),
        makePillar('Ất', 'Ngọ', 'Month', 'Tháng'),
        makePillar('Bính', 'Mão', 'Day', 'Ngày'),
        makePillar('Đinh', 'Dậu', 'Hour', 'Giờ'),
      ];
      const result = detectBranchInteractions(pillars);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should detect tam hợp (triple harmony)', () => {
      // Dần-Ngọ-Tuất = Fire triple
      const pillars = [
        makePillar('Giáp', 'Dần', 'Year', 'Năm'),
        makePillar('Ất', 'Ngọ', 'Month', 'Tháng'),
        makePillar('Bính', 'Tuất', 'Day', 'Ngày'),
        makePillar('Đinh', 'Hợi', 'Hour', 'Giờ'),
      ];
      const result = detectBranchInteractions(pillars);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('deriveThanSat', () => {
    it('should return an array of Thần Sát stars', () => {
      const result = deriveThanSat('Tý', 'Dần', 'Giáp');
      expect(Array.isArray(result)).toBe(true);
      result.forEach(star => {
        expect(star.name).toBeDefined();
        expect(typeof star.name).toBe('string');
      });
    });

    it('should produce results for all 12 year branches', () => {
      const branches: Chi[] = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
      branches.forEach(yearChi => {
        expect(() => deriveThanSat(yearChi, 'Dần', 'Giáp')).not.toThrow();
      });
    });
  });

  describe('analyzeDayMaster', () => {
    it('should return a valid Day Master analysis', () => {
      const dayPillar = makePillar('Bính', 'Dần', 'Day', 'Ngày');
      const elementCount = { Kim: 1, Mộc: 3, Thủy: 2, Hỏa: 1, Thổ: 1 };
      const result = analyzeDayMaster(dayPillar, elementCount, 'Xuân');
      expect(result).toBeDefined();
      expect(result.dayMasterElement).toBeDefined();
      expect(result.strength).toBeDefined();
      expect(['vượng', 'trung_bình', 'suy']).toContain(result.strength);
      expect(result.favorableElements).toBeDefined();
      expect(result.unfavorableElements).toBeDefined();
    });
  });

  describe('classifyCachCuc', () => {
    it('should return a classification with name and description', () => {
      const dayPillar = makePillar('Bính', 'Dần', 'Day', 'Ngày');
      const elementCount = { Kim: 1, Mộc: 3, Thủy: 2, Hỏa: 1, Thổ: 1 };
      const dm = analyzeDayMaster(dayPillar, elementCount, 'Xuân');
      const result = classifyCachCuc(dm, elementCount);
      expect(result.name).toBeDefined();
      expect(result.description).toBeDefined();
    });
  });

  describe('assessDieuHau', () => {
    it('should return seasonal assessment', () => {
      const result = assessDieuHau('Mộc', 1);
      expect(result.season).toBeDefined();
      expect(result.neededElement).toBeDefined();
      expect(result.assessment).toBeDefined();
    });

    it('should handle all 12 months', () => {
      for (let m = 1; m <= 12; m++) {
        expect(() => assessDieuHau('Kim', m)).not.toThrow();
      }
    });
  });

  describe('calculateTruongSinh', () => {
    it('should return Trường Sinh entries for each pillar', () => {
      const pillars = [
        makePillar('Giáp', 'Tý', 'Year', 'Năm'),
        makePillar('Ất', 'Sửu', 'Month', 'Tháng'),
        makePillar('Bính', 'Dần', 'Day', 'Ngày'),
        makePillar('Đinh', 'Mão', 'Hour', 'Giờ'),
      ];
      const result = calculateTruongSinh(pillars, 'Mộc', 0);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(4);
      result.forEach(entry => {
        expect(entry.phase).toBeDefined();
        expect(typeof entry.phase).toBe('string');
      });
    });
  });
});
