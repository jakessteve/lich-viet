/**
 * WeddingCalendarView — Color-Coded Month Calendar
 *
 * Shows a month view where each day is green/yellow/red based on
 * the couple's composite score for a wedding activity.
 * Click a day to select it as the target date.
 */

import React, { useState, useMemo } from 'react';
import { scoreMonthForWedding, type WeddingDay } from '../../services/weddingDateFinder';
import type { BaziSynastryResult } from '../../services/synastry/baziSynastry';
import type { TuViSynastryResult } from '../../services/synastry/tuviSynastry';
import type { NumerologySynastryResult } from '../../services/synastry/numerologySynastry';

interface WeddingCalendarViewProps {
  initialYear: number;
  initialMonth: number; // 0-indexed
  activityId?: string;
  birthYearChi?: string;
  synastryResult?: BaziSynastryResult;
  tuviSynastryResult?: TuViSynastryResult;
  numerologySynastryResult?: NumerologySynastryResult;
  onSelectDate?: (date: Date) => void;
}

const DOW_LABELS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

const MONTH_NAMES = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
];

const WeddingCalendarView: React.FC<WeddingCalendarViewProps> = ({
  initialYear,
  initialMonth,
  activityId = 'cuoi-hoi',
  birthYearChi,
  synastryResult,
  tuviSynastryResult,
  numerologySynastryResult,
  onSelectDate,
}) => {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const monthResult = useMemo(() => {
    return scoreMonthForWedding(
      year, month, activityId, birthYearChi,
      synastryResult, tuviSynastryResult, numerologySynastryResult,
    );
  }, [year, month, activityId, birthYearChi, synastryResult, tuviSynastryResult, numerologySynastryResult]);

  const handlePrevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setSelectedDay(null);
  };

  const handleDayClick = (day: WeddingDay) => {
    setSelectedDay(day.date.getDate());
    onSelectDate?.(day.date);
  };

  // Build calendar grid with leading empty cells for day-of-week alignment
  const firstDayOfWeek = useMemo(() => {
    const dow = new Date(year, month, 1).getDay();
    return dow === 0 ? 6 : dow - 1; // Monday = 0
  }, [year, month]);

  // Count good/ok/bad days
  const stats = useMemo(() => {
    const good = monthResult.days.filter(d => d.score >= 70).length;
    const ok = monthResult.days.filter(d => d.score >= 40 && d.score < 70).length;
    const bad = monthResult.days.filter(d => d.score < 40).length;
    return { good, ok, bad };
  }, [monthResult]);

  return (
    <div className="rounded-xl border border-black/5 dark:border-white/10 overflow-hidden bg-white/60 dark:bg-white/5">
      {/* Header with Month Navigation */}
      <div className="px-4 py-3 bg-pink-50 dark:bg-pink-900/10 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
        <button
          onClick={handlePrevMonth}
          className="p-1.5 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-800/20 transition-colors"
        >
          <span className="material-icons-round text-lg text-pink-600 dark:text-pink-400">chevron_left</span>
        </button>
        <div className="text-center">
          <h4 className="text-sm font-semibold text-pink-800 dark:text-pink-300 flex items-center gap-2">
            <span className="material-icons-round text-lg">calendar_month</span>
            {MONTH_NAMES[month]} {year}
          </h4>
          <p className="text-[10px] text-pink-600 dark:text-pink-400 mt-0.5">
            🟢 {stats.good} ngày tốt · 🟡 {stats.ok} trung bình · 🔴 {stats.bad} không tốt
          </p>
        </div>
        <button
          onClick={handleNextMonth}
          className="p-1.5 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-800/20 transition-colors"
        >
          <span className="material-icons-round text-lg text-pink-600 dark:text-pink-400">chevron_right</span>
        </button>
      </div>

      {/* Day-of-Week Headers */}
      <div className="grid grid-cols-7 gap-px bg-gray-100 dark:bg-gray-800/30">
        {DOW_LABELS.map((dow) => (
          <div key={dow} className="py-1.5 text-center text-[10px] font-semibold text-gray-500 dark:text-gray-500 bg-white/80 dark:bg-white/3">
            {dow}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-100 dark:bg-gray-800/30 p-px">
        {/* Empty leading cells */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square bg-gray-50/50 dark:bg-gray-900/20" />
        ))}

        {/* Day cells */}
        {monthResult.days.map((day) => {
          const isSelected = selectedDay === day.date.getDate();
          return (
            <button
              key={day.date.getDate()}
              onClick={() => handleDayClick(day)}
              className={`aspect-square p-1 flex flex-col items-center justify-center gap-0.5 transition-all duration-200 relative ${day.colorClass} ${
                isSelected ? 'ring-2 ring-pink-500 dark:ring-pink-400 z-10 scale-105' : 'hover:scale-105'
              }`}
            >
              <span className="text-sm font-bold">{day.date.getDate()}</span>
              <span className="text-[10px] opacity-60">{day.lunarDay}/{day.lunarMonth}</span>
              <span className="text-[10px] font-semibold">{day.score}%</span>
              {day.isHoangDao && (
                <span className="absolute top-0.5 right-0.5 text-[8px]">🌟</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Day Detail */}
      {selectedDay && (() => {
        const day = monthResult.days.find(d => d.date.getDate() === selectedDay);
        if (!day) return null;
        return (
          <div className="p-3 border-t border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/3">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Ngày {selectedDay}/{month + 1} — {day.grade} ({day.score}%)
            </p>
            {day.bestHours.length > 0 && (
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Giờ tốt: {day.bestHours.join(', ')}
              </p>
            )}
          </div>
        );
      })()}
    </div>
  );
};

export default WeddingCalendarView;
