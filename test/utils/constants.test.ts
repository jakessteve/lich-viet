import { describe, it, expect } from 'vitest';
import {
  SCORING,
  SOLAR_TERM_SEARCH_LIMIT,
  CALENDAR_GRID_CELLS,
  BUDDHIST_YEAR_OFFSET,
  HOANG_DAO_DEITY_INDICES,
  SEASONS,
  getSeasonIndex,
  DAY_OF_WEEK_NAMES,
  HOUR_RANGES,
  CAN,
  CHI,
  TIET_KHI_NAMES,
  NGU_HANH_MAPPING,
  NAP_AM_MAPPING,
  LUC_HOP,
  TAM_HOP,
  CHI_XUNG,
  NGU_HANH_SINH,
  NGU_HANH_KHAC,
  DAY_DEITIES,
  DEITY_START_CHIS,
  CAN_KHAC_MAP,
  TAM_SAT_YEARLY,
  CUU_CUNG_PALACE_MAP,
  BACH_SU_NGHI_STARS,
  MAJOR_HUNG_STARS,
} from '../../src/utils/constants';

describe('constants', () => {
  describe('SCORING thresholds', () => {
    it('should have valid day grade thresholds', () => {
      expect(SCORING.DAY_GRADE_GOOD_THRESHOLD).toBeGreaterThan(0);
      expect(SCORING.DAY_GRADE_BAD_THRESHOLD).toBeLessThan(0);
    });

    it('should have valid hour score range', () => {
      expect(SCORING.HOUR_SCORE_MIN).toBe(0);
      expect(SCORING.HOUR_SCORE_MAX).toBe(100);
      expect(SCORING.HOUR_BASE_SCORE).toBeGreaterThan(0);
    });

    it('should have valid Ngũ Hành day-type scores', () => {
      expect(SCORING.NGU_HANH_CHUYEN_NHAT).toBeGreaterThan(0);
      expect(SCORING.NGU_HANH_PHAT_NHAT).toBeLessThan(0);
    });
  });

  describe('Astronomical constants', () => {
    it('should have valid solar term search limit', () => {
      expect(SOLAR_TERM_SEARCH_LIMIT).toBe(35);
    });

    it('should have valid calendar grid cells (6 weeks × 7 days)', () => {
      expect(CALENDAR_GRID_CELLS).toBe(42);
    });

    it('should have correct Buddhist year offset', () => {
      expect(BUDDHIST_YEAR_OFFSET).toBe(544);
    });

    it('should have 6 Hoàng Đạo deity indices', () => {
      expect(HOANG_DAO_DEITY_INDICES).toHaveLength(6);
    });
  });

  describe('getSeasonIndex', () => {
    it('should return 0 (Xuân) for months 1-3', () => {
      expect(getSeasonIndex(1)).toBe(0);
      expect(getSeasonIndex(2)).toBe(0);
      expect(getSeasonIndex(3)).toBe(0);
    });

    it('should return 1 (Hạ) for months 4-6', () => {
      expect(getSeasonIndex(4)).toBe(1);
      expect(getSeasonIndex(5)).toBe(1);
      expect(getSeasonIndex(6)).toBe(1);
    });

    it('should return 2 (Thu) for months 7-9', () => {
      expect(getSeasonIndex(7)).toBe(2);
      expect(getSeasonIndex(8)).toBe(2);
      expect(getSeasonIndex(9)).toBe(2);
    });

    it('should return 3 (Đông) for months 10-12', () => {
      expect(getSeasonIndex(10)).toBe(3);
      expect(getSeasonIndex(11)).toBe(3);
      expect(getSeasonIndex(12)).toBe(3);
    });
  });

  describe('UI Constants', () => {
    it('should have 7 day-of-week names', () => {
      expect(DAY_OF_WEEK_NAMES).toHaveLength(7);
      expect(DAY_OF_WEEK_NAMES[0]).toBe('Chủ Nhật');
    });

    it('should have 12 hour ranges', () => {
      expect(HOUR_RANGES).toHaveLength(12);
    });

    it('should have 4 seasons', () => {
      expect(SEASONS).toHaveLength(4);
    });
  });

  describe('Can Chi data', () => {
    it('should have 10 Thiên Can', () => {
      expect(CAN).toHaveLength(10);
    });

    it('should have 12 Địa Chi', () => {
      expect(CHI).toHaveLength(12);
    });

    it('should have 24 Tiết Khí', () => {
      expect(TIET_KHI_NAMES).toHaveLength(24);
    });

    it('should map all Can and Chi to Ngũ Hành', () => {
      expect(Object.keys(NGU_HANH_MAPPING)).toHaveLength(22); // 10 Can + 12 Chi
    });

    it('should have 60 Giáp Tý Nạp Âm mappings (sexagenary cycle)', () => {
      expect(Object.keys(NAP_AM_MAPPING)).toHaveLength(60);
    });
  });

  describe('Branch interactions', () => {
    it('should have Lục Hợp for all 12 Chi', () => {
      expect(Object.keys(LUC_HOP)).toHaveLength(12);
    });

    it('should have symmetrical Lục Hợp pairs', () => {
      expect(LUC_HOP['Tý']).toBe('Sửu');
      expect(LUC_HOP['Sửu']).toBe('Tý');
    });

    it('should have Tam Hợp for all 12 Chi', () => {
      expect(Object.keys(TAM_HOP)).toHaveLength(12);
    });

    it('should have Chi Xung for all 12 Chi', () => {
      expect(Object.keys(CHI_XUNG)).toHaveLength(12);
    });

    it('should have symmetrical Chi Xung', () => {
      expect(CHI_XUNG['Tý']).toBe('Ngọ');
      expect(CHI_XUNG['Ngọ']).toBe('Tý');
    });
  });

  describe('Ngũ Hành cycles', () => {
    it('should have complete sinh cycle (5 elements)', () => {
      expect(Object.keys(NGU_HANH_SINH)).toHaveLength(5);
    });

    it('should have complete khắc cycle (5 elements)', () => {
      expect(Object.keys(NGU_HANH_KHAC)).toHaveLength(5);
    });

    it('Kim sinh Thủy', () => {
      expect(NGU_HANH_SINH['Kim']).toBe('Thủy');
    });

    it('Kim khắc Mộc', () => {
      expect(NGU_HANH_KHAC['Kim']).toBe('Mộc');
    });
  });

  describe('Deity and direction data', () => {
    it('should have 12 day deities', () => {
      expect(DAY_DEITIES).toHaveLength(12);
    });

    it('should have deity start chis for all 12 chis', () => {
      expect(Object.keys(DEITY_START_CHIS)).toHaveLength(12);
    });

    it('should have Can Khắc map for all 10 Cans', () => {
      expect(Object.keys(CAN_KHAC_MAP)).toHaveLength(10);
    });

    it('should have 4 Tam Sát yearly groups', () => {
      expect(TAM_SAT_YEARLY).toHaveLength(4);
    });

    it('should have 9 Cửu Cung palaces', () => {
      expect(Object.keys(CUU_CUNG_PALACE_MAP)).toHaveLength(9);
    });
  });

  describe('Star lists', () => {
    it('should have Bách Sự Nghi stars', () => {
      expect(BACH_SU_NGHI_STARS.length).toBeGreaterThan(0);
    });

    it('should have Major Hung stars', () => {
      expect(MAJOR_HUNG_STARS.length).toBeGreaterThan(0);
    });
  });
});
