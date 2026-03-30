import React, { Suspense, useState, lazy, useCallback, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/stores/appStore';
import { useHolidays } from '@/hooks/useHolidays';
import MonthCalendar from '../MonthCalendar';
import HolidaysCard from '../Calendar/HolidaysCard';
import CollapsibleCard from '../CollapsibleCard';
import type { ActiveTab } from '../../router/constants';



interface AppSidebarProps {
  activeTab: ActiveTab;
}

function AppSidebar({ activeTab }: AppSidebarProps) {
  const selectedDate = useAppStore((s) => s.selectedDate);
  const data = useAppStore((s) => s.dayData);
  const _setSelectedDate = useAppStore((s) => s.setSelectedDate);
  const navigate = useNavigate();

  // P2-11: Wrap date changes in startTransition to keep UI responsive
  const onSelectDate = useCallback((date: Date) => {
    startTransition(() => {
      _setSelectedDate(date);
    });
  }, [_setSelectedDate]);

  // Autonomous holiday fetching
  const { holidays, isLoading: holidaysLoading, countryName, isVietnam } = useHolidays(selectedDate);

  const isPremiumTool = ['tu-vi', 'chiem-tinh', 'bazi', 'numerology', 'mai-hoa'].includes(activeTab);

  return (
    <aside id="tour-sidebar" className="w-full lg:w-[400px] shrink-0 lg:sticky lg:top-20 flex flex-col gap-6" aria-label="Lịch tháng và thông tin nhanh">
      
      {/* Mobile Conversion Banner (Only on explicit premium tools) */}
      {isPremiumTool && (
        <div className="lg:hidden w-full bg-gradient-to-br from-gold/10 via-amber-500/10 to-gold/5 dark:from-gold-dark/20 dark:via-amber-600/10 dark:to-gold-dark/10 border border-gold/30 dark:border-gold-dark/30 rounded-2xl p-4 sm:p-5 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
           <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 dark:bg-gold-dark/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
           <span className="material-icons-round text-gold dark:text-gold-dark text-3xl mb-1.5 relative z-10" aria-hidden="true">workspace_premium</span>
           <h3 className="text-gold dark:text-gold-dark font-bold text-base sm:text-base mb-1 relative z-10">Lịch Việt Premium</h3>
           <p className="text-xs sm:text-sm text-text-secondary-light dark:text-text-secondary-dark mb-3.5 relative z-10 leading-relaxed max-w-[280px]">Mở khóa luận giải AI chuyên sâu và lưu trữ lá số không giới hạn.</p>
           <button onClick={() => navigate('/app/upgrade')} className="bg-gradient-to-r from-gold to-amber-500 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-md hover:shadow-lg hover:brightness-110 transition-all active:scale-95 relative z-10">Khám Phá</button>
        </div>
      )}

      {/* Main Sidebar Content (Hidden on mobile for premium tools) */}
      <div className={`space-y-6 ${isPremiumTool ? 'hidden lg:block' : 'block'}`}>
        <div id="tour-calendar">
          <MonthCalendar selectedDate={selectedDate} onSelectDate={onSelectDate} collapseOnMobile={true} />
        </div>

        {/* Holidays Card — only on Âm Lịch tab */}
        {activeTab === 'am-lich' && (
          <HolidaysCard
            holidays={holidays}
            isLoading={holidaysLoading}
            countryName={countryName}
            isVietnam={isVietnam}
          />
        )}

        {/* Daily Astrological Summary — shown on all tabs, collapsible */}
        <CollapsibleCard
          title={
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="section-title">{data.dayOfWeek}</span>
              <span className="text-xs sm:text-xs text-text-secondary-light dark:text-text-secondary-dark leading-tight font-normal whitespace-nowrap">
                ngày <span className="font-bold text-text-primary-light dark:text-text-primary-dark">{selectedDate.getDate()}</span> tháng <span className="font-bold text-text-primary-light dark:text-text-primary-dark">{selectedDate.getMonth() + 1}</span> năm <span className="font-bold text-text-primary-light dark:text-text-primary-dark">{selectedDate.getFullYear()}</span>
              </span>
            </div>
          }
          defaultOpen={true}
          collapseOnMobile={activeTab !== 'am-lich'}
          alwaysOpenOnDesktop={true}
          headerRight={
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className={`text-xs sm:text-sm font-bold ${(data.deityStatus || '').includes('Hắc') ? 'text-text-primary-light dark:text-text-primary-dark' : 'text-good dark:text-good-dark'}`}>
                {data.deityStatus}
              </span>
              {data.nguHanhGrade && (
                <span title={data.nguHanhGrade === 'Phạt nhật' ? 'Ngày xung hành với tháng — nên cẩn trọng, hạn chế khởi sự' : data.nguHanhGrade === 'Chế nhật' ? 'Ngày khắc hành với tháng — cần xem xét kỹ trước khi hành động' : 'Ngày hài hòa ngũ hành với tháng — tốt cho khởi sự'} className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full cursor-help ${data.nguHanhGrade === 'Phạt nhật' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                  : data.nguHanhGrade === 'Chế nhật' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700/40 dark:text-gray-300'
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                  }`}>
                  {data.nguHanhGrade}
                </span>
              )}
            </div>
          }
        >
          <div className="p-5">
            <div className="flex flex-col gap-2.5 mb-6 border-b border-border-light/50 dark:border-border-dark/50 pb-6 text-sm sm:text-base leading-relaxed">
              <div>
                <span className="font-semibold text-text-secondary-light dark:text-text-secondary-dark">Âm lịch:</span>{' '}
                <span className="text-text-primary-light dark:text-text-primary-dark">
                  ngày <span className="font-bold">{data.lunarDate.day}</span> tháng <span className="font-bold">{data.lunarDate.month}</span> năm <span className="font-bold">{data.canChi.year.can} {data.canChi.year.chi}</span>
                </span>
              </div>
              <div>
                <span className="font-semibold text-text-secondary-light dark:text-text-secondary-dark">Tiết khí:</span>{' '}
                <span className="font-bold text-text-primary-light dark:text-text-primary-dark">{data.solarTerm}</span>
                {data.tietKhiDetail && (
                  <div className="text-sm sm:text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
                    ({data.tietKhiDetail})
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 text-center gap-y-6 gap-x-4">
              <div className="flex flex-col items-center">
                <span className="label-standard block mb-1">Ngày</span>
                <p className="font-bold text-base sm:text-base text-text-primary-light dark:text-text-primary-dark">{data.canChi.day.can} {data.canChi.day.chi}</p>
                <p className="text-xs sm:text-sm text-text-secondary-light dark:text-text-secondary-dark mt-0.5 truncate max-w-full">{data.fiveElements.napAm}</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="label-standard block mb-1">Tháng</span>
                <p className="font-bold text-base sm:text-base text-text-primary-light dark:text-text-primary-dark">{data.canChi.month.can} {data.canChi.month.chi}</p>
                <p className="text-xs sm:text-sm text-text-secondary-light dark:text-text-secondary-dark mt-0.5 truncate max-w-full">{data.fiveElements.napAmMonth}</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="label-standard block mb-1">Năm</span>
                <p className="font-bold text-base sm:text-base text-text-primary-light dark:text-text-primary-dark">{data.canChi.year.can} {data.canChi.year.chi}</p>
                <p className="text-xs sm:text-sm text-text-secondary-light dark:text-text-secondary-dark mt-0.5 truncate max-w-full">{data.fiveElements.napAmYear}</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="label-standard block mb-1">Phật Lịch</span>
                <p className="font-bold text-base sm:text-base text-text-primary-light dark:text-text-primary-dark">{data.buddhistYear}</p>
              </div>
            </div>
          </div>
        </CollapsibleCard>

      </div>
    </aside>
  );
}

export default React.memo(AppSidebar);
