/**
 * TuViPage — Tabbed container for Tử Vi and Bát Tự.
 *
 * Consolidates two previously separate nav items into one page
 * with sub-tab pill navigation.
 */

import React, { useState, Suspense } from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import LoadingState from '../shared/LoadingState';

// Lazy-load both modules
const TuViModule = React.lazy(() => import('../TuVi/TuViModule'));
const BaziView = React.lazy(() => import('../Bazi/BaziView'));

type SubTab = 'tu-vi' | 'bat-tu';

const SUB_TABS: { id: SubTab; label: string; icon: string }[] = [
  { id: 'tu-vi', label: 'Tử Vi', icon: 'auto_awesome' },
  { id: 'bat-tu', label: 'Bát Tự', icon: 'temple_buddhist' },
];

export default function TuViPage() {
  usePageTitle('Tử Vi');
  const [activeTab, setActiveTab] = useState<SubTab>('tu-vi');

  return (
    <div className="space-y-4">
      {/* Sub-tab navigation — Segmented Control */}
      <nav
        className="glass-card p-1.5 flex gap-1"
        role="tablist"
        aria-label="Chức năng Tử Vi"
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

      {/* Tab content */}
      <div className="animate-fade-scale">
        {activeTab === 'tu-vi' && (
          <Suspense fallback={<LoadingState />}>
            <TuViModule />
          </Suspense>
        )}
        {activeTab === 'bat-tu' && (
          <Suspense fallback={<LoadingState />}>
            <BaziView />
          </Suspense>
        )}
      </div>
    </div>
  );
}
