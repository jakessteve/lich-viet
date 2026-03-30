/**
 * Bazi Constants — Shared lookup tables for Bát Tự calculations
 *
 * Extracted from baziEngine.ts for modular reuse across baziEngine + baziStars.
 */

import type { Can, Chi } from '../types/calendar';
import type { NguHanh } from '../types/bazi';

// ── Stem & Branch Lists ──────────────────────────────────────

export const CAN_LIST: Can[] = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
export const CHI_LIST: Chi[] = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

// ── Element Maps ─────────────────────────────────────────────

export const CAN_ELEMENT: Record<Can, NguHanh> = {
  'Giáp': 'Mộc', 'Ất': 'Mộc',
  'Bính': 'Hỏa', 'Đinh': 'Hỏa',
  'Mậu': 'Thổ', 'Kỷ': 'Thổ',
  'Canh': 'Kim', 'Tân': 'Kim',
  'Nhâm': 'Thủy', 'Quý': 'Thủy',
};

export const CHI_ELEMENT: Record<Chi, NguHanh> = {
  'Tý': 'Thủy', 'Sửu': 'Thổ', 'Dần': 'Mộc', 'Mão': 'Mộc',
  'Thìn': 'Thổ', 'Tỵ': 'Hỏa', 'Ngọ': 'Hỏa', 'Mùi': 'Thổ',
  'Thân': 'Kim', 'Dậu': 'Kim', 'Tuất': 'Thổ', 'Hợi': 'Thủy',
};

// ── Element Cycles ───────────────────────────────────────────

/** Element generation cycle (Tương Sinh) */
export const GENERATES: Record<NguHanh, NguHanh> = {
  'Kim': 'Thủy', 'Thủy': 'Mộc', 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim',
};

/** Element destruction cycle (Tương Khắc) */
export const DESTROYS: Record<NguHanh, NguHanh> = {
  'Kim': 'Mộc', 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim',
};

// ── Element Cycle Helpers ────────────────────────────────────

/**
 * Find the element that generates the given element (母 — "mother").
 * E.g., findGeneratingElement('Mộc') → 'Thủy' (water generates wood).
 */
export function findGeneratingElement(element: NguHanh): NguHanh | undefined {
  return (Object.entries(GENERATES) as [NguHanh, NguHanh][])
    .find(([, child]) => child === element)?.[0];
}

/**
 * Find the element that controls/destroys the given element (克 — "overcomer").
 * E.g., findControllingElement('Mộc') → 'Kim' (metal overcomes wood).
 */
export function findControllingElement(element: NguHanh): NguHanh | undefined {
  return (Object.entries(DESTROYS) as [NguHanh, NguHanh][])
    .find(([, victim]) => victim === element)?.[0];
}

// ── Nạp Âm (Sound Element) ──────────────────────────────────

/** 60 sexagenary cycle → element name */
export const NAP_AM_TABLE: Record<string, { name: string; element: NguHanh }> = {
  'Giáp Tý': { name: 'Hải Trung Kim', element: 'Kim' }, 'Ất Sửu': { name: 'Hải Trung Kim', element: 'Kim' },
  'Bính Dần': { name: 'Lô Trung Hỏa', element: 'Hỏa' }, 'Đinh Mão': { name: 'Lô Trung Hỏa', element: 'Hỏa' },
  'Mậu Thìn': { name: 'Đại Lâm Mộc', element: 'Mộc' }, 'Kỷ Tỵ': { name: 'Đại Lâm Mộc', element: 'Mộc' },
  'Canh Ngọ': { name: 'Lộ Bàng Thổ', element: 'Thổ' }, 'Tân Mùi': { name: 'Lộ Bàng Thổ', element: 'Thổ' },
  'Nhâm Thân': { name: 'Kiếm Phong Kim', element: 'Kim' }, 'Quý Dậu': { name: 'Kiếm Phong Kim', element: 'Kim' },
  'Giáp Tuất': { name: 'Sơn Đầu Hỏa', element: 'Hỏa' }, 'Ất Hợi': { name: 'Sơn Đầu Hỏa', element: 'Hỏa' },
  'Bính Tý': { name: 'Giản Hạ Thủy', element: 'Thủy' }, 'Đinh Sửu': { name: 'Giản Hạ Thủy', element: 'Thủy' },
  'Mậu Dần': { name: 'Thành Đầu Thổ', element: 'Thổ' }, 'Kỷ Mão': { name: 'Thành Đầu Thổ', element: 'Thổ' },
  'Canh Thìn': { name: 'Bạch Lạp Kim', element: 'Kim' }, 'Tân Tỵ': { name: 'Bạch Lạp Kim', element: 'Kim' },
  'Nhâm Ngọ': { name: 'Dương Liễu Mộc', element: 'Mộc' }, 'Quý Mùi': { name: 'Dương Liễu Mộc', element: 'Mộc' },
  'Giáp Thân': { name: 'Tuyền Trung Thủy', element: 'Thủy' }, 'Ất Dậu': { name: 'Tuyền Trung Thủy', element: 'Thủy' },
  'Bính Tuất': { name: 'Ốc Thượng Thổ', element: 'Thổ' }, 'Đinh Hợi': { name: 'Ốc Thượng Thổ', element: 'Thổ' },
  'Mậu Tý': { name: 'Tích Lịch Hỏa', element: 'Hỏa' }, 'Kỷ Sửu': { name: 'Tích Lịch Hỏa', element: 'Hỏa' },
  'Canh Dần': { name: 'Tùng Bách Mộc', element: 'Mộc' }, 'Tân Mão': { name: 'Tùng Bách Mộc', element: 'Mộc' },
  'Nhâm Thìn': { name: 'Trường Lưu Thủy', element: 'Thủy' }, 'Quý Tỵ': { name: 'Trường Lưu Thủy', element: 'Thủy' },
  'Giáp Ngọ': { name: 'Sa Trung Kim', element: 'Kim' }, 'Ất Mùi': { name: 'Sa Trung Kim', element: 'Kim' },
  'Bính Thân': { name: 'Sơn Hạ Hỏa', element: 'Hỏa' }, 'Đinh Dậu': { name: 'Sơn Hạ Hỏa', element: 'Hỏa' },
  'Mậu Tuất': { name: 'Bình Địa Mộc', element: 'Mộc' }, 'Kỷ Hợi': { name: 'Bình Địa Mộc', element: 'Mộc' },
  'Canh Tý': { name: 'Bích Thượng Thổ', element: 'Thổ' }, 'Tân Sửu': { name: 'Bích Thượng Thổ', element: 'Thổ' },
  'Nhâm Dần': { name: 'Kim Bạc Kim', element: 'Kim' }, 'Quý Mão': { name: 'Kim Bạc Kim', element: 'Kim' },
  'Giáp Thìn': { name: 'Phú Đăng Hỏa', element: 'Hỏa' }, 'Ất Tỵ': { name: 'Phú Đăng Hỏa', element: 'Hỏa' },
  'Bính Ngọ': { name: 'Thiên Hà Thủy', element: 'Thủy' }, 'Đinh Mùi': { name: 'Thiên Hà Thủy', element: 'Thủy' },
  'Mậu Thân': { name: 'Đại Trạch Thổ', element: 'Thổ' }, 'Kỷ Dậu': { name: 'Đại Trạch Thổ', element: 'Thổ' },
  'Canh Tuất': { name: 'Thoa Xuyến Kim', element: 'Kim' }, 'Tân Hợi': { name: 'Thoa Xuyến Kim', element: 'Kim' },
  'Nhâm Tý': { name: 'Tang Đố Mộc', element: 'Mộc' }, 'Quý Sửu': { name: 'Tang Đố Mộc', element: 'Mộc' },
  'Giáp Dần': { name: 'Đại Khê Thủy', element: 'Thủy' }, 'Ất Mão': { name: 'Đại Khê Thủy', element: 'Thủy' },
  'Bính Thìn': { name: 'Sa Trung Thổ', element: 'Thổ' }, 'Đinh Tỵ': { name: 'Sa Trung Thổ', element: 'Thổ' },
  'Mậu Ngọ': { name: 'Thiên Thượng Hỏa', element: 'Hỏa' }, 'Kỷ Mùi': { name: 'Thiên Thượng Hỏa', element: 'Hỏa' },
  'Canh Thân': { name: 'Thạch Lựu Mộc', element: 'Mộc' }, 'Tân Dậu': { name: 'Thạch Lựu Mộc', element: 'Mộc' },
  'Nhâm Tuất': { name: 'Đại Hải Thủy', element: 'Thủy' }, 'Quý Hợi': { name: 'Đại Hải Thủy', element: 'Thủy' },
};

// ── Season Maps ─────────────────────────────────────────────

/** Season from solar term month (1-12, Dần-based) */
export const MONTH_SEASON: Record<number, string> = {
  1: 'Xuân', 2: 'Xuân', 3: 'Xuân',
  4: 'Hạ', 5: 'Hạ', 6: 'Hạ',
  7: 'Thu', 8: 'Thu', 9: 'Thu',
  10: 'Đông', 11: 'Đông', 12: 'Đông',
};

/** Element that each season supports most */
export const SEASON_STRONG: Record<string, NguHanh> = {
  'Xuân': 'Mộc', 'Hạ': 'Hỏa', 'Thu': 'Kim', 'Đông': 'Thủy',
};
