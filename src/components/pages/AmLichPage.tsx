/**
 * AmLichPage — Tabbed container for Âm Lịch and Dụng Sự.
 *
 * Consolidates three previously separate nav items into one page
 * with sub-tab pill navigation.
 *
 * Free/guest users are limited to MAX_DAILY_QUERIES Âm Lịch lookups per day.
 * Premium+ users have unlimited access.
 */

import React, { useState, Suspense, useEffect, useRef } from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useAppStore } from '@/stores/appStore';
import DetailedDayView from '../DetailedDayView';
import LoadingState from '../shared/LoadingState';
import { useDailyQueryLimit, MAX_DAILY_QUERIES } from '@/hooks/useDailyQueryLimit';
import { useUserTier } from '@/hooks/useUserTier';
import { useNavigate } from 'react-router-dom';

// Lazy-load heavier modules
const DungSuView = React.lazy(() => import('../LichDungSu/DungSuView'));

type SubTab = 'am-lich' | 'dung-su';

const SUB_TABS: { id: SubTab; label: string; icon: string }[] = [
  { id: 'am-lich', label: 'Âm Lịch', icon: 'calendar_month' },
  { id: 'dung-su', label: 'Dụng Sự', icon: 'event_available' },
];

// ──────────── Inline Daily Limit CTA ────────────
function AmLichLimitReached({ remaining, total }: { remaining: number; total: number }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in-up space-y-5">
      <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center mx-auto">
        <span className="material-icons-round text-3xl text-amber-500 dark:text-amber-400">hourglass_disabled</span>
      </div>
      <div>
        <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-1">
          Đã dùng hết {total} lượt tra cứu hôm nay
        </h3>
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark max-w-xs mx-auto">
          Gói Miễn phí giới hạn {total} lần xem chi tiết âm lịch mỗi ngày. Nâng cấp để tra cứu không giới hạn.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => navigate('/app/nang-cap')}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-semibold shadow-md shadow-amber-500/25 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          <span className="material-icons-round text-[18px]">workspace_premium</span>
          Nâng cấp Premium
        </button>
        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark self-center">
          Còn {remaining}/{total} · Làm mới lúc nửa đêm
        </p>
      </div>
    </div>
  );
}

export default function AmLichPage() {
  usePageTitle('Âm Lịch');
  const [activeTab, setActiveTab] = useState<SubTab>('am-lich');
  const selectedDate = useAppStore((s) => s.selectedDate);
  const setSelectedDate = useAppStore((s) => s.setSelectedDate);
  const data = useAppStore((s) => s.dayData);

  // Daily query limit — only enforced for guest/free tier
  const { hasAccess } = useUserTier();
  const isPremiumOrAbove = hasAccess('premium');
  const { queriesRemaining, isLimitReached, recordQuery } = useDailyQueryLimit();

  // Record one query per unique selectedDate change (am-lich tab only)
  const lastRecordedDateRef = useRef<string | null>(null);
  useEffect(() => {
    if (activeTab !== 'am-lich') return;
    if (isPremiumOrAbove) return;
    const dateKey = selectedDate.toISOString().split('T')[0];
    if (lastRecordedDateRef.current === dateKey) return;
    lastRecordedDateRef.current = dateKey;
    recordQuery();
  }, [selectedDate, activeTab, isPremiumOrAbove, recordQuery]);

  return (
    <div className="space-y-4">
      {/* Sub-tab navigation — Segmented Control */}
      <nav
        className="glass-card p-1.5 flex gap-1 flex-1"
        role="tablist"
        aria-label="Chức năng Âm Lịch"
      >
        {SUB_TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                ? 'bg-gradient-to-r from-gold via-gold-light to-amber-500 text-white shadow-md shadow-gold/20'
                : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
          >
            <span className="material-icons-round text-base">{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden text-xs">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Daily query counter pill — visible to free/guest on am-lich tab */}
      {!isPremiumOrAbove && activeTab === 'am-lich' && (
        <div className={`flex items-center justify-between px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
          isLimitReached
            ? 'bg-red-50 dark:bg-red-900/15 text-red-600 dark:text-red-400 border border-red-200/40 dark:border-red-700/25'
            : 'bg-blue-50 dark:bg-blue-900/15 text-blue-600 dark:text-blue-400 border border-blue-200/40 dark:border-blue-700/25'
        }`}>
          <span className="flex items-center gap-1.5">
            <span className="material-icons-round text-sm" aria-hidden="true">
              {isLimitReached ? 'block' : 'hourglass_empty'}
            </span>
            {isLimitReached
              ? 'Đã dùng hết lượt tra cứu hôm nay'
              : `Còn ${queriesRemaining}/${MAX_DAILY_QUERIES} lượt tra cứu hôm nay`}
          </span>
          {isLimitReached && (
            <a href="/app/nang-cap" className="font-semibold hover:underline flex items-center gap-1">
              Nâng cấp <span className="material-icons-round text-sm" aria-hidden="true">arrow_forward</span>
            </a>
          )}
        </div>
      )}

      {/* Tab content */}
      <div className="animate-fade-scale">
        {activeTab === 'am-lich' && (
          <>
            {isLimitReached && !isPremiumOrAbove ? (
              <AmLichLimitReached remaining={queriesRemaining} total={MAX_DAILY_QUERIES} />
            ) : (
              <DetailedDayView date={selectedDate} data={data} />
            )}
          </>
        )}
        {activeTab === 'dung-su' && (
          <Suspense fallback={<LoadingState />}>
            <DungSuView
              selectedDate={selectedDate}
              data={data}
              onSelectDate={setSelectedDate}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}
