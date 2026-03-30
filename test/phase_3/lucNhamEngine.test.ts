/**
 * Lục Nhâm Engine — Unit Tests
 */

import { describe, it, expect } from 'vitest';
import { generateLucNhamChart, interpretChart, getQuickVerdict } from '../../src/utils/lucNhamEngine';

describe('lucNhamEngine', () => {
  const testDate = new Date(2026, 2, 8); // March 8, 2026

  describe('generateLucNhamChart', () => {
    it('returns a valid chart for a given date and hour', () => {
      const chart = generateLucNhamChart(testDate, 3); // Mão hour
      expect(chart).toBeDefined();
      expect(chart.hourBranch).toBe('mao');
      expect(chart.hourBranchName).toBe('Mão');
    });

    it('has a valid board with 12 positions', () => {
      const chart = generateLucNhamChart(testDate, 0);
      expect(chart.board).toHaveLength(12);
      chart.board.forEach((pos) => {
        expect(pos.diaBan).toBeTruthy();
        expect(pos.tianBan).toBeTruthy();
        expect(pos.diaBanName).toBeTruthy();
        expect(pos.tianBanName).toBeTruthy();
      });
    });

    it('has Tứ Khóa with 4 lessons', () => {
      const chart = generateLucNhamChart(testDate, 6);
      expect(chart.tuKhoa.lessons).toHaveLength(4);
      chart.tuKhoa.lessons.forEach((lesson, i) => {
        expect(lesson.index).toBe(i + 1);
        expect(lesson.upperStem).toBeTruthy();
        expect(lesson.lowerBranch).toBeTruthy();
        expect(['Sinh', 'Khắc', 'Bị Sinh', 'Bị Khắc', 'Tỷ Hòa']).toContain(lesson.relationship);
      });
    });

    it('has Tam Truyền with 3 steps', () => {
      const chart = generateLucNhamChart(testDate, 6);
      expect(chart.tamTruyen.steps).toHaveLength(3);
      const labels = chart.tamTruyen.steps.map((s) => s.label);
      expect(labels).toEqual(['Sơ Truyền', 'Trung Truyền', 'Mạt Truyền']);
      chart.tamTruyen.steps.forEach((step) => {
        expect(step.branch).toBeTruthy();
        expect(step.branchName).toBeTruthy();
      });
    });

    it('identifies a Khóa Thức', () => {
      const chart = generateLucNhamChart(testDate, 6);
      expect(chart.khoaThuc).toBeDefined();
      expect(chart.khoaThuc.nameVi).toBeTruthy();
      expect(chart.khoaThuc.nameCn).toBeTruthy();
      expect(['cat', 'hung', 'trung_binh']).toContain(chart.khoaThuc.nature);
    });

    it('calculates a verdict', () => {
      const chart = generateLucNhamChart(testDate, 6);
      expect(chart.verdict).toBeDefined();
      expect(chart.verdict.label).toBeTruthy();
      expect(chart.verdict.description).toBeTruthy();
      expect(['daiCat', 'cat', 'trungBinh', 'hung', 'daiHung']).toContain(chart.verdict.level);
    });

    it('produces different board rotations for different hours', () => {
      const chart1 = generateLucNhamChart(testDate, 0);
      const chart6 = generateLucNhamChart(testDate, 6);
      // Board rotations should differ
      const samePositions = chart1.board.every((pos, i) => pos.tianBan === chart6.board[i].tianBan);
      expect(samePositions).toBe(false);
    });

    it('covers all 12 hours without error', () => {
      for (let h = 0; h < 12; h++) {
        const chart = generateLucNhamChart(testDate, h);
        expect(chart.board).toHaveLength(12);
        expect(chart.verdict).toBeDefined();
      }
    });
  });

  describe('interpretChart', () => {
    it('returns category advice for all 6 categories', () => {
      const chart = generateLucNhamChart(testDate, 3);
      const interp = interpretChart(chart);
      expect(interp.categoryAdvice).toHaveLength(6);
      const categories = interp.categoryAdvice.map((ca) => ca.category);
      expect(categories).toContain('general');
      expect(categories).toContain('career');
      expect(categories).toContain('love');
      expect(categories).toContain('finance');
    });

    it('returns a summary string', () => {
      const chart = generateLucNhamChart(testDate, 3);
      const interp = interpretChart(chart);
      expect(interp.summary).toBeTruthy();
      expect(typeof interp.summary).toBe('string');
    });
  });

  describe('getQuickVerdict', () => {
    it('returns a quick verdict', () => {
      const verdict = getQuickVerdict(testDate, 3);
      expect(verdict).toBeDefined();
      expect(verdict.label).toBeTruthy();
      expect(typeof verdict.isCat).toBe('boolean');
      expect(verdict.explanation).toBeTruthy();
    });
  });
});
