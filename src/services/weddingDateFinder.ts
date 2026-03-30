/**
 * Wedding Date Finder — Batch Day Scoring Service
 *
 * Computes composite auspiciousness scores for every day in a given month,
 * using the full scoring pipeline (calendar engine + activity scorer + synastry).
 * Designed for the color-coded wedding calendar visualization.
 */

import { getDetailedDayData } from '../utils/calendarEngine';
import { scoreActivity, type ActivityScoreResult, type HourScoreEntry } from '../utils/activityScorer';
import type { BaziSynastryResult } from '../services/synastry/baziSynastry';
import type { TuViSynastryResult } from '../services/synastry/tuviSynastry';
import type { NumerologySynastryResult } from '../services/synastry/numerologySynastry';

// ── Types ─────────────────────────────────────────────────────

export interface WeddingDay {
  date: Date;
  lunarDay: number;
  lunarMonth: number;
  score: number;         // 0–100
  grade: string;         // Rất Tốt / Tốt / Khá / Bình Thường / Kém / Xấu
  colorClass: string;    // CSS class for background
  bestHours: string[];   // Top 3 hours
  isHoangDao: boolean;
}

export interface WeddingMonthResult {
  year: number;
  month: number;         // 0-indexed
  days: WeddingDay[];
}

// ── Core Logic ────────────────────────────────────────────────

/**
 * Score all days in a month for a specific wedding activity.
 *
 * @param year Solar year
 * @param month Solar month (0-indexed, JS convention)
 * @param activityId Activity to score (default: 'cuoi-hoi')
 * @param birthYearChi Optional birth year Chi for Kị Tuổi
 * @param synastryResult Optional Bát Tự synastry
 * @param tuviSynastryResult Optional Tử Vi synastry
 * @param numerologySynastryResult Optional Numerology synastry
 * @param westernSynastryResult Optional Western synastry
 */
export function scoreMonthForWedding(
  year: number,
  month: number,
  activityId = 'cuoi-hoi',
  birthYearChi?: string,
  synastryResult?: BaziSynastryResult,
  tuviSynastryResult?: TuViSynastryResult,
  numerologySynastryResult?: NumerologySynastryResult,
): WeddingMonthResult {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: WeddingDay[] = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);

    try {
      const dayData = getDetailedDayData(date);

      const result: ActivityScoreResult | null = scoreActivity(
        activityId,
        dayData,
        undefined,
        birthYearChi as import('../types/calendar').Chi | undefined,
        synastryResult,
        tuviSynastryResult,
        numerologySynastryResult,
      );

      const score = result?.percentage ?? 50;
      const scoreLabel = result?.label ?? 'Bình Thường';

      // Color class based on score
      let colorClass: string;
      if (score >= 70) colorClass = 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300';
      else if (score >= 40) colorClass = 'bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300';
      else colorClass = 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300';

      // Best hours — top 3 from hour scoring
      const bestHours = (result?.bestHours || [])
        .slice(0, 3)
        .map((h: HourScoreEntry) => String(h.hourInfo?.canChi || ''));

      days.push({
        date,
        lunarDay: dayData.lunarDate.day,
        lunarMonth: dayData.lunarDate.month,
        score,
        grade: scoreLabel,
        colorClass,
        bestHours,
        isHoangDao: dayData.deityStatus === 'Ngày Hoàng Đạo',
      });
    } catch {
      // If scoring fails for a day, add a neutral entry
      days.push({
        date,
        lunarDay: d,
        lunarMonth: month + 1,
        score: 50,
        grade: 'Không rõ',
        colorClass: 'bg-gray-100 dark:bg-gray-800/20 text-gray-500',
        bestHours: [],
        isHoangDao: false,
      });
    }
  }

  return { year, month, days };
}
