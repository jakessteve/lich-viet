import React, { useState, useMemo, useEffect } from 'react';
import DayCell from './DayCell';
import { getMonthDays } from '@lich-viet/core/calendar';
import { useIsMobile } from '../hooks/useIsMobile';
import { useAuthStore } from '../stores/authStore';
import { calculatePersonalDayScore, getYearThaiTueType } from '../services/personalization/personalDayScore';


interface MonthCalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  /** Start collapsed on mobile (shows only selected week row) */
  collapseOnMobile?: boolean;
}

const MonthCalendar: React.FC<MonthCalendarProps> = ({ selectedDate, onSelectDate, collapseOnMobile = false }) => {
  const [currentDate, setCurrentDate] = useState(new Date(selectedDate));

  const days = useMemo(() => {
    return getMonthDays(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  // Labels matching the design order (Starting from Monday/T2)
  const visualWeekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(!(collapseOnMobile && isMobile));
  
  const user = useAuthStore(s => s.user);

  const _annualThaiTue = useMemo(() => {
    if (!user?.profile?.birthYear) return null;
    return getYearThaiTueType(user.profile.birthYear, currentDate.getFullYear());
  }, [user?.profile, currentDate]);

  const daysWithScore = useMemo(() => {
    if (!user?.profile?.birthYear) return days;
    return days.map(d => {
      if (!d.dayChi) return d;
      return {
        ...d,
        personalScore: calculatePersonalDayScore(user.profile, d.dayChi)
      };
    });
  }, [days, user?.profile]);

  // Sync expanded state when navigating between tabs (prop changes)
  useEffect(() => {
    if (collapseOnMobile && isMobile) {
      setIsExpanded(false);
    } else if (!collapseOnMobile) {
      setIsExpanded(true);
    }
  }, [collapseOnMobile, isMobile]);

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Compute which row index (0-based, 7 days per row) contains the selected date
  const selectedRowIndex = useMemo(() => {
    const selectedStr = selectedDate.toDateString();
    const idx = daysWithScore.findIndex(d => d.fullDate.toDateString() === selectedStr);
    if (idx === -1) return 0; // fallback to first row
    return Math.floor(idx / 7);
  }, [daysWithScore, selectedDate]);

  // When collapsed, show the row containing the selected date
  const collapsedRowDays = useMemo(() => {
    const start = selectedRowIndex * 7;
    return daysWithScore.slice(start, start + 7);
  }, [daysWithScore, selectedRowIndex]);

  // Month/Year dropdown selection handlers
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value, 10);
    setCurrentDate(new Date(currentDate.getFullYear(), newMonth, 1));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value, 10);
    setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
  };

  // Shared select styling
  const selectClass = "appearance-none bg-transparent font-semibold text-sm sm:text-sm text-text-primary-light dark:text-text-primary-dark cursor-pointer hover:text-primary dark:hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 rounded-md px-1.5 py-1 text-center";

  return (
    <div className="space-y-4">
      {/* Month/Year Picker */}
      <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-2 shadow-apple border border-border-light dark:border-border-dark flex items-center justify-between w-full relative">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-text-secondary-light transition-colors z-10"
          aria-label="Tháng trước"
        >
          <span className="material-icons-round text-xl">chevron_left</span>
        </button>

        <div className="flex-1 flex justify-center py-1.5">
          <div className="flex items-center gap-1 sm:gap-2 font-semibold text-sm sm:text-sm">
            <select
              value={currentDate.getMonth()}
              onChange={handleMonthChange}
              className={selectClass}
              aria-label="Chọn tháng"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>Tháng {i + 1}</option>
              ))}
            </select>
            <span className="text-gray-300 dark:text-gray-600 select-none">|</span>
            <select
              value={currentDate.getFullYear()}
              onChange={handleYearChange}
              className={selectClass}
              aria-label="Chọn năm"
            >
              {Array.from({ length: 201 }, (_, i) => {
                const year = 1900 + i;
                return <option key={year} value={year}>{year}</option>;
              })}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-1 z-10">
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-text-secondary-light transition-colors"
            aria-label="Tháng sau"
          >
            <span className="material-icons-round text-xl">chevron_right</span>
          </button>
          <button
            onClick={() => {
              const today = new Date();
              setCurrentDate(today);
              onSelectDate(today);
            }}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-text-secondary-light transition-colors flex items-center justify-center"
            title="Hôm nay"
            aria-label="Về hôm nay"
          >
            <span className="material-icons-round text-xl">today</span>
          </button>
          <div className="w-px h-4 bg-border-light dark:bg-border-dark mx-1" />
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-text-secondary-light transition-colors"
            aria-label={isExpanded ? 'Thu gọn lịch' : 'Mở rộng lịch'}
          >
            <span className={`material-icons-round text-lg transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>
        </div>
      </div>

      {/* Grid - Collapsible */}
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-apple border border-border-light dark:border-border-dark p-3 transition-colors flex flex-col" role="grid" aria-label={`Lịch tháng ${currentDate.getMonth() + 1} năm ${currentDate.getFullYear()}`}>
        {/* Weekday header — always visible */}
        <div className="grid grid-cols-7 mb-1 pb-1 border-b border-border-light dark:border-border-dark">
          {visualWeekDays.map((day) => (
            <div
              key={day}
              className={`text-center text-[10px] font-bold py-1 ${day === 'CN' || day === 'T7' ? 'text-calendar-weekend' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
            >
              {day}
            </div>
          ))}
        </div>

        {isExpanded ? (
          /* Full calendar grid */
          <div className="flex flex-col bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-800 overflow-visible">
            {Array.from({ length: Math.ceil(daysWithScore.length / 7) }).map((_, rowIdx) => {
              const rowDays = daysWithScore.slice(rowIdx * 7, rowIdx * 7 + 7);
              const isFirst = rowIdx === 0;
              const isLast = rowIdx === Math.ceil(days.length / 7) - 1;
              return (
                <div key={rowIdx} className={`grid grid-cols-7 gap-px w-full ${rowIdx > 0 ? 'mt-px' : ''}`}>
                  {rowDays.map((day, colIdx) => {
                    let roundedClass = '';
                    if (isFirst && colIdx === 0) roundedClass = 'rounded-tl-lg';
                    else if (isFirst && colIdx === 6) roundedClass = 'rounded-tr-lg';
                    else if (isLast && colIdx === 0) roundedClass = 'rounded-bl-lg';
                    else if (isLast && colIdx === 6) roundedClass = 'rounded-br-lg';

                    return (
                      <DayCell
                        key={rowIdx * 7 + colIdx}
                        data={day}
                        isSelected={selectedDate.toDateString() === day.fullDate.toDateString()}
                        onClick={onSelectDate}
                        roundedClass={roundedClass}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : (
          /* Collapsed: show only the row containing the selected date */
          <div className="flex flex-col bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-800 overflow-visible">
            <div className="grid grid-cols-7 gap-px w-full">
              {collapsedRowDays.map((day, colIdx) => {
                let roundedClass = '';
                if (colIdx === 0) roundedClass = 'rounded-l-lg';
                else if (colIdx === 6) roundedClass = 'rounded-r-lg';

                return (
                  <DayCell
                    key={`collapsed-${colIdx}`}
                    data={day}
                    isSelected={selectedDate.toDateString() === day.fullDate.toDateString()}
                    onClick={onSelectDate}
                    roundedClass={roundedClass}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Calendar Legend — all color-coded indicators */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2 pt-2 border-t border-border-light/50 dark:border-border-dark/50 text-[10px] text-text-secondary-light dark:text-text-secondary-dark select-none">
          {/* Day quality indicators */}
          <span className="flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            Hoàng Đạo
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 bg-red-500 dark:bg-red-400 rotate-45 shrink-0" />
            Hắc Đạo
          </span>
          {/* Personal score indicators */}
          <span className="flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-sm bg-purple-500 shrink-0" />
            Cát theo tuổi
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 bg-orange-500 rotate-45 shrink-0" />
            Hung theo tuổi
          </span>
          {/* Today & Weekend */}
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-2 rounded-sm bg-amber-100 dark:bg-amber-900/40 border border-amber-300/60 dark:border-amber-700/40 shrink-0" />
            Hôm nay
          </span>
          <span className="flex items-center gap-1">
            <span className="text-calendar-weekend font-bold text-[10px] shrink-0">T7</span>
            Cuối tuần
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MonthCalendar);
