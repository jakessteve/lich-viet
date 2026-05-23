/**
 * AmLichPage — Tabbed container for Âm Lịch and Dụng Sự.
 *
 * Consolidates three previously separate nav items into one page
 * with sub-tab pill navigation.
 */

import React, { useState, Suspense } from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useAppStore } from '@/stores/appStore';
import DetailedDayView from '../DetailedDayView';
import LoadingState from '../shared/LoadingState';

// Lazy-load heavier modules
const DungSuView = React.lazy(() => import('../LichDungSu/DungSuView'));

type SubTab = 'am-lich' | 'dung-su';

const SUB_TABS: { id: SubTab; label: string; icon: string }[] = [
  { id: 'am-lich', label: 'Âm Lịch', icon: 'calendar_month' },
  { id: 'dung-su', label: 'Dụng Sự', icon: 'event_available' },
];

export default function AmLichPage() {
  usePageTitle('Âm Lịch');
  const [activeTab, setActiveTab] = useState<SubTab>('am-lich');
  const selectedDate = useAppStore((s) => s.selectedDate);
  const setSelectedDate = useAppStore((s) => s.setSelectedDate);
  const data = useAppStore((s) => s.dayData);

  return (
    <div className="space-y-4">
      {/* Sub-tab navigation — Segmented Control */}
      <nav className="glass-card p-1.5 flex gap-1 flex-1" role="tablist" aria-label="Chức năng Âm Lịch">
        {SUB_TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
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

      {/* Tab content */}
      <div className="animate-fade-scale">
        {activeTab === 'am-lich' && <DetailedDayView date={selectedDate} data={data} />}
        {activeTab === 'dung-su' && (
          <Suspense fallback={<LoadingState />}>
            <DungSuView selectedDate={selectedDate} data={data} onSelectDate={setSelectedDate} />
          </Suspense>
        )}
      </div>
    </div>
  );
}
