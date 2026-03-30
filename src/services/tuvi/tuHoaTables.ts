/**
 * Multi-School Tứ Hóa Tables — School-specific star assignments per Heavenly Stem.
 *
 * Academic basis:
 * - 7/10 stems are IDENTICAL across all schools
 * - 3 disputed stems: Mậu (戊), Canh (庚), Nhâm (壬) differ on Hóa Khoa and/or Hóa Kỵ
 *
 * Schools supported:
 * - 'toanThu' (Toàn Thư / Tam Hợp) — most widely used, default
 * - 'trungChau' (Trung Châu Phái / Vương Đình Chi) — emphasis on Thiên Phủ
 * - 'phiTinh' (Phi Tinh Phái / Flying Star) — some variants differ on Canh
 *
 * See gap_analysis.md for detailed academic sources.
 */

import type { MutagenType } from './tuviTypes';

// ── Types ──────────────────────────────────────────────────────

export type TuHoaSchool = 'toanThu' | 'trungChau' | 'phiTinh';

/** Standard Tứ Hóa entry: 4 stars assigned to Lộc/Quyền/Khoa/Kỵ */
export interface TuHoaEntry {
  readonly loc: string;
  readonly quyen: string;
  readonly khoa: string;
  readonly ky: string;
}

/** Sihua-format entry using Chinese mutagen keys (for sihuaEngine compatibility) */
export type SihuaTableEntry = Record<MutagenType, string>;

// ── Base Table (7 undisputed stems) ────────────────────────────

const BASE_TABLE: Record<string, TuHoaEntry> = {
  'Giáp': { loc: 'Liêm Trinh', quyen: 'Phá Quân', khoa: 'Vũ Khúc', ky: 'Thái Dương' },
  'Ất':   { loc: 'Thiên Cơ',   quyen: 'Thiên Lương', khoa: 'Tử Vi',     ky: 'Thái Âm' },
  'Bính': { loc: 'Thiên Đồng', quyen: 'Thiên Cơ',   khoa: 'Văn Xương', ky: 'Liêm Trinh' },
  'Đinh': { loc: 'Thái Âm',   quyen: 'Thiên Đồng', khoa: 'Thiên Cơ',  ky: 'Cự Môn' },
  'Kỷ':   { loc: 'Vũ Khúc',   quyen: 'Tham Lang',  khoa: 'Thiên Lương', ky: 'Văn Khúc' },
  'Tân':  { loc: 'Cự Môn',    quyen: 'Thái Dương', khoa: 'Văn Khúc',  ky: 'Văn Xương' },
  'Quý':  { loc: 'Phá Quân',  quyen: 'Cự Môn',    khoa: 'Thái Âm',   ky: 'Tham Lang' },
};

// ── Disputed Stems Per School ──────────────────────────────────

/**
 * 戊 Mậu — Dispute on Hóa Khoa
 * - Toàn Thư + Phi Tinh: Hữu Bật
 * - Trung Châu: Thái Dương
 */
const MAU_VARIANTS: Record<TuHoaSchool, TuHoaEntry> = {
  toanThu:   { loc: 'Tham Lang', quyen: 'Thái Âm', khoa: 'Hữu Bật',    ky: 'Thiên Cơ' },
  trungChau: { loc: 'Tham Lang', quyen: 'Thái Âm', khoa: 'Thái Dương', ky: 'Thiên Cơ' },
  phiTinh:   { loc: 'Tham Lang', quyen: 'Thái Âm', khoa: 'Hữu Bật',    ky: 'Thiên Cơ' },
};

/**
 * 庚 Canh — Disputes on Hóa Khoa AND Hóa Kỵ
 * - Toàn Thư / Tam Hợp: Khoa=Thái Âm, Kỵ=Thiên Đồng
 * - Trung Châu: Khoa=Thiên Phủ, Kỵ=Thiên Đồng
 * - Phi Tinh (some variants): Khoa=Thiên Đồng, Kỵ=Thiên Tướng
 */
const CANH_VARIANTS: Record<TuHoaSchool, TuHoaEntry> = {
  toanThu:   { loc: 'Thái Dương', quyen: 'Vũ Khúc', khoa: 'Thái Âm',    ky: 'Thiên Đồng' },
  trungChau: { loc: 'Thái Dương', quyen: 'Vũ Khúc', khoa: 'Thiên Phủ',  ky: 'Thiên Đồng' },
  phiTinh:   { loc: 'Thái Dương', quyen: 'Vũ Khúc', khoa: 'Thiên Đồng', ky: 'Thiên Tướng' },
};

/**
 * 壬 Nhâm — Dispute on Hóa Khoa
 * - Toàn Thư + Phi Tinh: Tả Phụ
 * - Trung Châu: Thiên Phủ
 */
const NHAM_VARIANTS: Record<TuHoaSchool, TuHoaEntry> = {
  toanThu:   { loc: 'Thiên Lương', quyen: 'Tử Vi', khoa: 'Tả Phụ',    ky: 'Vũ Khúc' },
  trungChau: { loc: 'Thiên Lương', quyen: 'Tử Vi', khoa: 'Thiên Phủ', ky: 'Vũ Khúc' },
  phiTinh:   { loc: 'Thiên Lương', quyen: 'Tử Vi', khoa: 'Tả Phụ',    ky: 'Vũ Khúc' },
};

// ── Public API ─────────────────────────────────────────────────

/**
 * Returns the complete 10-stem Tứ Hóa table for a given school.
 *
 * @param school - The astrological school variant
 * @returns A Record mapping stem name → TuHoaEntry
 */
export function getTuHoaTable(school: TuHoaSchool = 'toanThu'): Record<string, TuHoaEntry> {
  return {
    ...BASE_TABLE,
    'Mậu': MAU_VARIANTS[school],
    'Canh': CANH_VARIANTS[school],
    'Nhâm': NHAM_VARIANTS[school],
  };
}

/**
 * Returns the Tứ Hóa entry for a specific stem under a given school.
 *
 * @param stem - Heavenly Stem name (Giáp, Ất, ..., Quý)
 * @param school - The astrological school variant
 * @returns TuHoaEntry or undefined if stem is not found
 */
export function getTuHoaForStem(stem: string, school: TuHoaSchool = 'toanThu'): TuHoaEntry | undefined {
  const table = getTuHoaTable(school);
  return table[stem];
}

/**
 * Returns the Sihua-format table (Chinese mutagen keys) for a given school.
 * Used by sihuaEngine.ts for Phi Tinh flying Tứ Hóa calculations.
 *
 * @param school - The astrological school variant
 * @returns A Record mapping stem name → SihuaTableEntry
 */
export function getSihuaTable(school: TuHoaSchool = 'toanThu'): Record<string, SihuaTableEntry> {
  const tuHoaTable = getTuHoaTable(school);
  const result: Record<string, SihuaTableEntry> = {};

  for (const [stem, entry] of Object.entries(tuHoaTable)) {
    result[stem] = {
      '禄': entry.loc,
      '权': entry.quyen,
      '科': entry.khoa,
      '忌': entry.ky,
    };
  }

  return result;
}

/**
 * Returns an array of stems where schools disagree.
 * Useful for cross-school comparison UI highlighting.
 */
export const DISPUTED_STEMS = ['Mậu', 'Canh', 'Nhâm'] as const;

/**
 * Returns the diff between two schools for a given stem.
 * Returns null if both schools agree; otherwise returns the fields that differ.
 */
export function getTuHoaDiff(
  stem: string,
  schoolA: TuHoaSchool,
  schoolB: TuHoaSchool,
): { field: string; schoolA: string; schoolB: string }[] | null {
  const a = getTuHoaForStem(stem, schoolA);
  const b = getTuHoaForStem(stem, schoolB);
  if (!a || !b) return null;

  const diffs: { field: string; schoolA: string; schoolB: string }[] = [];
  const fields = ['loc', 'quyen', 'khoa', 'ky'] as const;
  const labels = { loc: 'Hóa Lộc', quyen: 'Hóa Quyền', khoa: 'Hóa Khoa', ky: 'Hóa Kỵ' };

  for (const f of fields) {
    if (a[f] !== b[f]) {
      diffs.push({ field: labels[f], schoolA: a[f], schoolB: b[f] });
    }
  }

  return diffs.length > 0 ? diffs : null;
}
