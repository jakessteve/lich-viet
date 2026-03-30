import { describe, it, expect } from 'vitest';
import { generateLucNhamChart, interpretChart, getQuickVerdict } from '../src/utils/lucNhamEngine';

describe('Lục Nhâm — Battle Testing & Fuzz Oracle', () => {

  it('Generates 1,000 random Lục Nhâm charts without crashing and maintains structural integrity', () => {
    const iterations = 1000;
    let seed = 556677;
    function random() {
      seed = (1103515245 * seed + 12345) % 2147483648;
      return seed / 2147483648;
    }

    const validBranches = ['ti', 'suu', 'dan', 'mao', 'thin', 'ty', 'ngo', 'mui', 'than', 'dau', 'tuat', 'hoi'];
    const validVerdictLevels = ['daiCat', 'cat', 'trungBinh', 'hung', 'daiHung'];
    const validElementRelations = ['Sinh', 'Khắc', 'Bị Sinh', 'Bị Khắc', 'Tỷ Hòa'];

    for (let i = 0; i < iterations; i++) {
      const year = Math.floor(random() * 200) + 1900;
      const month = Math.floor(random() * 12) + 1;
      const day = Math.floor(random() * 28) + 1;
      const date = new Date(year, month - 1, day);
      const hourBranchId = Math.floor(random() * 12);

      // --- Full Chart ---
      const chart = generateLucNhamChart(date, hourBranchId);

      expect(chart).toBeDefined();

      // Board has exactly 12 positions
      expect(chart.board.length).toBe(12);
      for (const pos of chart.board) {
        expect(validBranches).toContain(pos.diaBan);
        expect(validBranches).toContain(pos.tianBan);
        expect(pos.diaBanName).toBeTruthy();
        expect(pos.tianBanName).toBeTruthy();
      }

      // All 12 Địa Bàn slots are unique
      const diaBanSet = new Set(chart.board.map(b => b.diaBan));
      expect(diaBanSet.size).toBe(12);

      // Tứ Khóa has exactly 4 lessons
      expect(chart.tuKhoa.lessons.length).toBe(4);
      for (const lesson of chart.tuKhoa.lessons) {
        expect(lesson.index).toBeGreaterThanOrEqual(1);
        expect(lesson.index).toBeLessThanOrEqual(4);
        expect(validElementRelations).toContain(lesson.relationship);
      }

      // Tam Truyền has exactly 3 steps
      expect(chart.tamTruyen.steps.length).toBe(3);
      for (const step of chart.tamTruyen.steps) {
        expect(validBranches).toContain(step.branch);
        expect(step.branchName).toBeTruthy();
      }

      // Khóa Thức exists with valid structure
      expect(chart.khoaThuc).toBeDefined();
      expect(chart.khoaThuc.id).toBeTruthy();
      expect(chart.khoaThuc.nameVi).toBeTruthy();

      // Verdict
      expect(validVerdictLevels).toContain(chart.verdict.level);
      expect(chart.verdict.label).toBeTruthy();

      // Hour branch
      expect(validBranches).toContain(chart.hourBranch);

      // --- Interpretation ---
      const interp = interpretChart(chart);
      expect(interp.summary).toBeTruthy();
      expect(interp.categoryAdvice.length).toBeGreaterThan(0);

      // --- Quick Verdict ---
      const quick = getQuickVerdict(date, hourBranchId);
      expect(quick.label).toBeTruthy();
      expect(typeof quick.isCat).toBe('boolean');
    }
  }, 30000);
});
