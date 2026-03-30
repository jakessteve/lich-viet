/**
 * School Strategy — Routes interpretation through school-specific Tứ Hóa tables
 * and provides school metadata for UI display.
 *
 * This is the "glue" between the Tab Switcher UI and the multi-school data layer.
 * The existing interpretation pipeline (patternEngine, academicFramework, etc.)
 * already handles Tam Hợp star-reading — this module adds school-awareness
 * by routing Tứ Hóa lookups through tuHoaTables.ts.
 */

import { getTuHoaTable, getTuHoaDiff, type TuHoaSchool, type TuHoaEntry, DISPUTED_STEMS } from './tuHoaTables';
import { calculateSihuaFlows } from './sihuaEngine';
import type { TuViPalace, SihuaFlow, TuViChartData } from './tuviTypes';

// ── Types ──────────────────────────────────────────────────────

export interface SchoolConfig {
  readonly id: TuHoaSchool;
  readonly label: string;
  readonly shortLabel: string;
  readonly description: string;
  readonly icon: string;
  /** Primary interpretation method */
  readonly method: 'star-reading' | 'flying-sihua' | 'hybrid';
}

/** Result of analyzing a chart through a specific school's lens */
export interface SchoolAnalysisResult {
  readonly school: SchoolConfig;
  /** School-specific Tứ Hóa table used */
  readonly tuHoaTable: Record<string, TuHoaEntry>;
  /** Flying Tứ Hóa flows (Phi Tinh) — school-specific star assignments */
  readonly sihuaFlows: SihuaFlow[];
  /** Key differences from the default school (Toàn Thư) */
  readonly diffs: Array<{
    stem: string;
    field: string;
    thisSchool: string;
    defaultSchool: string;
  }>;
}

/** Cross-school comparison result */
export interface CrossSchoolInsight {
  readonly consensusPoints: string[];
  readonly divergencePoints: Array<{
    topic: string;
    schools: Record<string, string>;
  }>;
  readonly recommendation: string;
}

// ── School Configurations ──────────────────────────────────────

export const SCHOOL_CONFIGS: readonly SchoolConfig[] = [
  {
    id: 'toanThu',
    label: 'Tam Hợp (Toàn Thư)',
    shortLabel: 'Tam Hợp',
    description: 'Trường phái phổ biến nhất, chú trọng đọc sao theo tính cách, vượng hãm, cách cục.',
    icon: '📖',
    method: 'star-reading',
  },
  {
    id: 'phiTinh',
    label: 'Phi Tinh (飛星)',
    shortLabel: 'Phi Tinh',
    description: 'Trường phái Đài Loan, phân tích Tứ Hóa bay giữa các cung tạo quan hệ nhân quả.',
    icon: '🌟',
    method: 'flying-sihua',
  },
  {
    id: 'trungChau',
    label: 'Trung Châu (中州)',
    shortLabel: 'Trung Châu',
    description: 'Trường phái Vương Đình Chi, nhấn mạnh Thiên Phủ và chia giờ thành 3 bàn (Thiên/Địa/Nhân).',
    icon: '🏛️',
    method: 'hybrid',
  },
] as const;

/** Get school config by ID */
export function getSchoolConfig(id: TuHoaSchool): SchoolConfig {
  const config = SCHOOL_CONFIGS.find(s => s.id === id);
  if (!config) throw new Error(`Unknown school: ${id}`);
  return config;
}

// ── School-Aware Analysis ──────────────────────────────────────

/**
 * Analyzes a chart through a specific school's lens.
 *
 * @param chart - The generated Tử Vi chart
 * @param school - Which school to apply
 * @returns School-specific analysis result including Tứ Hóa table, Sihua flows, and diffs
 */
export function analyzeBySchool(chart: TuViChartData, school: TuHoaSchool): SchoolAnalysisResult {
  const config = getSchoolConfig(school);
  const tuHoaTable = getTuHoaTable(school);
  const sihuaFlows = calculateSihuaFlows(chart.palaces, school);

  // Calculate diffs from default (toanThu) school
  const diffs: SchoolAnalysisResult['diffs'] = [];
  if (school !== 'toanThu') {
    for (const stem of DISPUTED_STEMS) {
      const diff = getTuHoaDiff(stem, 'toanThu', school);
      if (diff) {
        for (const d of diff) {
          diffs.push({
            stem,
            field: d.field,
            thisSchool: d.schoolB,
            defaultSchool: d.schoolA,
          });
        }
      }
    }
  }

  return {
    school: config,
    tuHoaTable,
    sihuaFlows,
    diffs,
  };
}

/**
 * Generates cross-school insights by comparing all 3 schools.
 *
 * @param chart - The generated Tử Vi chart
 * @returns Cross-school synthesis with consensus and divergence points
 */
export function generateCrossSchoolInsights(chart: TuViChartData): CrossSchoolInsight {
  const schools: TuHoaSchool[] = ['toanThu', 'phiTinh', 'trungChau'];
  const results = schools.map(s => analyzeBySchool(chart, s));

  const consensusPoints: string[] = [];
  const divergencePoints: CrossSchoolInsight['divergencePoints'] = [];

  // 1. Find the soul palace and its Tứ Hóa
  const menhPalace = chart.palaces.find(p => p.isSoulPalace);
  if (menhPalace) {
    const menhStem = menhPalace.heavenlyStem;
    const isDisputed = (DISPUTED_STEMS as readonly string[]).includes(menhStem);

    if (isDisputed) {
      // Divergence: Mệnh's Tứ Hóa differs across schools
      const schoolEntries: Record<string, string> = {};
      for (const r of results) {
        const entry = r.tuHoaTable[menhStem];
        if (entry) {
          schoolEntries[r.school.shortLabel] = `Khoa=${entry.khoa}, Kỵ=${entry.ky}`;
        }
      }
      divergencePoints.push({
        topic: `Cung Mệnh can ${menhStem} — Tứ Hóa khác nhau`,
        schools: schoolEntries,
      });
    } else {
      consensusPoints.push(
        `Cung Mệnh can ${menhStem} — tất cả trường phái đều đồng nhất Tứ Hóa.`
      );
    }

    // Consensus: Major star placement is always the same
    const majorStarNames = menhPalace.majorStars.map(s => s.name).join(', ');
    if (majorStarNames) {
      consensusPoints.push(
        `Chính tinh cung Mệnh: ${majorStarNames} — giống nhau 100% tất cả trường phái.`
      );
    }
  }

  // 2. Compare Sihua flow counts
  const flowCounts = results.map(r => r.sihuaFlows.length);
  const allSameFlows = flowCounts.every(c => c === flowCounts[0]);
  if (allSameFlows) {
    consensusPoints.push(`Phi Tinh Tứ Hóa: ${flowCounts[0]} luồng — đồng nhất.`);
  } else {
    const schoolFlows: Record<string, string> = {};
    for (const r of results) {
      schoolFlows[r.school.shortLabel] = `${r.sihuaFlows.length} luồng`;
    }
    divergencePoints.push({
      topic: 'Số luồng Phi Tinh Tứ Hóa khác nhau',
      schools: schoolFlows,
    });
  }

  // 3. Check for Hóa Kỵ landing on critical palaces
  const criticalPalaces = ['Mệnh', 'Tài Bạch', 'Quan Lộc'];
  for (const palaceName of criticalPalaces) {
    const kyLandings: Record<string, string[]> = {};
    for (const r of results) {
      const kyFlows = r.sihuaFlows.filter(f =>
        f.mutagen === '忌' &&
        chart.palaces.find(p => p.earthlyBranch === f.targetPalace)?.name.includes(palaceName)
      );
      if (kyFlows.length > 0) {
        kyLandings[r.school.shortLabel] = kyFlows.map(f => f.targetStar);
      }
    }
    const schoolsWithKy = Object.keys(kyLandings);
    if (schoolsWithKy.length > 0) {
      if (schoolsWithKy.length === schools.length) {
        consensusPoints.push(`⚠️ Hóa Kỵ vào cung ${palaceName} — tất cả trường phái đều cảnh báo.`);
      } else {
        const entries: Record<string, string> = {};
        for (const [school, stars] of Object.entries(kyLandings)) {
          entries[school] = `Kỵ: ${stars.join(', ')}`;
        }
        for (const s of results) {
          if (!kyLandings[s.school.shortLabel]) {
            entries[s.school.shortLabel] = 'Không có Kỵ';
          }
        }
        divergencePoints.push({
          topic: `Hóa Kỵ vào cung ${palaceName}`,
          schools: entries,
        });
      }
    }
  }

  // 4. Generate recommendation
  let recommendation = '';
  if (divergencePoints.length === 0) {
    recommendation = '✅ Tất cả trường phái đều đồng thuận — phân tích rất đáng tin cậy.';
  } else if (divergencePoints.length <= 2) {
    recommendation = '🟡 Có một vài khác biệt nhỏ — tham khảo thêm ý kiến từ mỗi trường phái.';
  } else {
    recommendation = '🔴 Nhiều điểm khác biệt — nên xem xét kỹ từng trường phái trước khi kết luận.';
  }

  return {
    consensusPoints,
    divergencePoints,
    recommendation,
  };
}
