/**
 * Bazi View Constants — Shared styling, element data, utility functions
 *
 * Extracted from BaziView.tsx to reduce file size and enable reuse.
 */

import type { NguHanh } from '@lich-viet/core/bazi';

// ── Element Colors ─────────────────────────────────────────────

export const ELEMENT_COLORS: Record<NguHanh, { bg: string; text: string; gradient: string }> = {
  Kim: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/10',
    text: 'text-yellow-700 dark:text-yellow-400',
    gradient: 'from-yellow-400 to-amber-500',
  },
  Mộc: {
    bg: 'bg-green-50 dark:bg-green-900/10',
    text: 'text-green-700 dark:text-green-400',
    gradient: 'from-green-400 to-emerald-500',
  },
  Thủy: {
    bg: 'bg-blue-50 dark:bg-blue-900/10',
    text: 'text-blue-700 dark:text-blue-400',
    gradient: 'from-blue-400 to-cyan-500',
  },
  Hỏa: {
    bg: 'bg-red-50 dark:bg-red-900/10',
    text: 'text-red-700 dark:text-red-400',
    gradient: 'from-red-400 to-orange-500',
  },
  Thổ: {
    bg: 'bg-amber-50 dark:bg-amber-900/10',
    text: 'text-amber-700 dark:text-amber-400',
    gradient: 'from-amber-400 to-yellow-600',
  },
};

export const ELEMENT_EMOJI: Record<NguHanh, string> = {
  Kim: '🪙',
  Mộc: '🌿',
  Thủy: '💧',
  Hỏa: '🔥',
  Thổ: '🏔️',
};

/** Hour options: 0-23 in 1-hour steps */
export const HOUR_OPTIONS = Array.from({ length: 24 }, (_, i) => i);

/** Minute options: 0-55 in 5-minute steps */
export const MINUTE_OPTIONS = Array.from({ length: 12 }, (_, i) => i * 5);

/** Common timezone presets */
export const TIMEZONE_OPTIONS: { value: number; label: string }[] = [
  { value: -12, label: 'GMT-12' },
  { value: -11, label: 'GMT-11' },
  { value: -10, label: 'GMT-10 (Hawaii)' },
  { value: -9, label: 'GMT-9 (Alaska)' },
  { value: -8, label: 'GMT-8 (Los Angeles)' },
  { value: -7, label: 'GMT-7 (Denver)' },
  { value: -6, label: 'GMT-6 (Chicago)' },
  { value: -5, label: 'GMT-5 (New York)' },
  { value: -4, label: 'GMT-4' },
  { value: -3, label: 'GMT-3 (São Paulo)' },
  { value: -2, label: 'GMT-2' },
  { value: -1, label: 'GMT-1' },
  { value: 0, label: 'GMT+0 (London)' },
  { value: 1, label: 'GMT+1 (Paris, Berlin)' },
  { value: 2, label: 'GMT+2 (Kyiv, Cairo)' },
  { value: 3, label: 'GMT+3 (Moscow)' },
  { value: 3.5, label: 'GMT+3:30 (Tehran)' },
  { value: 4, label: 'GMT+4 (Dubai)' },
  { value: 5, label: 'GMT+5' },
  { value: 5.5, label: 'GMT+5:30 (India)' },
  { value: 6, label: 'GMT+6 (Dhaka)' },
  { value: 7, label: 'GMT+7 (Việt Nam, Thái Lan)' },
  { value: 8, label: 'GMT+8 (Singapore, Trung Quốc)' },
  { value: 9, label: 'GMT+9 (Nhật Bản, Hàn Quốc)' },
  { value: 9.5, label: 'GMT+9:30 (Úc - Adelaide)' },
  { value: 10, label: 'GMT+10 (Úc - Sydney)' },
  { value: 11, label: 'GMT+11' },
  { value: 12, label: 'GMT+12 (New Zealand)' },
];

/** Map timezone offset (hours) to approximate longitude */
export function timeZoneToLongitude(tz: number): number {
  return tz * 15;
}

export const INPUT_CLASS =
  'w-full px-3.5 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-subtle-light dark:bg-surface-subtle-dark text-text-primary-light dark:text-text-primary-dark text-sm focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all outline-none';
export const SELECT_CLASS = `${INPUT_CLASS} appearance-none`;

export type DateType = 'solar' | 'lunar';

/** Get today's date as YYYY-MM-DD */
export function getTodayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Format YYYY-MM-DD to Vietnamese display */
export function formatDisplayDate(iso: string): string {
  if (!iso) return 'Chọn ngày sinh';
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

/** Compute Can Chi for a solar year */
export function getCanChiYearLabel(year: number): string {
  const STEMS = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  const BRANCHES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
  let stemIdx = (year - 4) % 10;
  let branchIdx = (year - 4) % 12;
  if (stemIdx < 0) stemIdx += 10;
  if (branchIdx < 0) branchIdx += 12;
  return `${STEMS[stemIdx]} ${BRANCHES[branchIdx]}`;
}
