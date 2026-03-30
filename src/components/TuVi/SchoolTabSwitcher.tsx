/**
 * SchoolTabSwitcher — Tab UI for switching between Tử Vi interpretation schools.
 *
 * Layout: [📖 Tam Hợp] [🌟 Phi Tinh] [🏛️ Trung Châu] [⚖️ So Sánh]
 *
 * Visual design follows the existing app's premium aesthetic:
 * - Glassmorphism card surface
 * - Gold accent for active tab
 * - Smooth animated indicator
 * - Mobile-responsive (scrollable on small screens)
 */

import { useState, useCallback, useMemo } from 'react';
import type { TuViChartData } from '../../services/tuvi/tuviTypes';
import type { TuHoaSchool } from '../../services/tuvi/tuHoaTables';
import {
  SCHOOL_CONFIGS,
  analyzeBySchool,
  generateCrossSchoolInsights,
  type SchoolConfig,
  type SchoolAnalysisResult,
  type CrossSchoolInsight,
} from '../../services/tuvi/schoolStrategy';

// ── Types ──────────────────────────────────────────────────────

type TabId = TuHoaSchool | 'compare';

interface SchoolTabSwitcherProps {
  readonly chart: TuViChartData;
  /** Callback when school selection changes (for parent re-rendering) */
  readonly onSchoolChange?: (school: TuHoaSchool) => void;
}

// ── Tab Definitions ────────────────────────────────────────────

const TABS: Array<{ id: TabId; label: string; shortLabel: string; icon: string }> = [
  ...SCHOOL_CONFIGS.map(s => ({ id: s.id as TabId, label: s.label, shortLabel: s.shortLabel, icon: s.icon })),
  { id: 'compare', label: 'So Sánh Trường Phái', shortLabel: 'So Sánh', icon: '⚖️' },
];

// ── Component ──────────────────────────────────────────────────

export default function SchoolTabSwitcher({ chart, onSchoolChange }: SchoolTabSwitcherProps) {
  const [activeTab, setActiveTab] = useState<TabId>('toanThu');

  const handleTabChange = useCallback((tabId: TabId) => {
    setActiveTab(tabId);
    if (tabId !== 'compare' && onSchoolChange) {
      onSchoolChange(tabId);
    }
  }, [onSchoolChange]);

  // Memoize analysis results
  const schoolResult = useMemo<SchoolAnalysisResult | null>(() => {
    if (activeTab === 'compare') return null;
    return analyzeBySchool(chart, activeTab);
  }, [chart, activeTab]);

  const crossSchoolInsight = useMemo<CrossSchoolInsight | null>(() => {
    if (activeTab !== 'compare') return null;
    return generateCrossSchoolInsights(chart);
  }, [chart, activeTab]);

  const activeSchoolConfig = useMemo<SchoolConfig | null>(() => {
    if (activeTab === 'compare') return null;
    return SCHOOL_CONFIGS.find(s => s.id === activeTab) ?? null;
  }, [activeTab]);

  return (
    <div className="flex flex-col gap-3">
      {/* Tab Bar */}
      <div 
        className="flex gap-1 p-1 rounded-xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 overflow-x-auto hide-scrollbar" 
        role="tablist" 
        aria-label="Chọn trường phái Tử Vi"
      >
        {TABS.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border-none whitespace-nowrap transition-all duration-300 text-sm font-medium ${
                isActive 
                  ? 'bg-gradient-to-br from-[#c4993c] to-[#d4a94c] dark:from-[#d4a94c] dark:to-[#c4993c] text-white dark:text-[#1a1a1a] shadow-[0_2px_8px_rgba(196,153,60,0.3)] dark:shadow-[0_2px_12px_rgba(212,169,76,0.25)] font-semibold' 
                  : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-primary-light dark:hover:text-text-primary-dark'
              }`}
              onClick={() => handleTabChange(tab.id)}
            >
              <span className="text-base leading-none">{tab.icon}</span>
              <span className="leading-snug">{tab.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-1" role="tabpanel">
        {activeTab !== 'compare' && schoolResult && activeSchoolConfig && (
          <SchoolDetailPanel school={activeSchoolConfig} result={schoolResult} />
        )}
        {activeTab === 'compare' && crossSchoolInsight && (
          <CrossSchoolPanel insight={crossSchoolInsight} />
        )}
      </div>
    </div>
  );
}

// ── School Detail Panel ────────────────────────────────────────

function SchoolDetailPanel({ school, result }: { school: SchoolConfig; result: SchoolAnalysisResult }) {
  return (
    <div className="flex flex-col gap-3 animate-fade-in-up">
      {/* School Header */}
      <div className="flex items-start gap-3 p-3 rounded-xl bg-[#c4993c]/5 dark:bg-[#d4a94c]/5 border border-[#c4993c]/10 dark:border-[#d4a94c]/10">
        <span className="text-2xl leading-none shrink-0 mt-0.5">{school.icon}</span>
        <div>
          <h3 className="text-base font-semibold text-text-primary-light dark:text-text-primary-dark m-0">{school.label}</h3>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1 mb-0 leading-relaxed">{school.description}</p>
        </div>
      </div>

      {/* Tứ Hóa Diffs (only for non-default schools) */}
      {result.diffs.length > 0 && (
        <div className="p-3 rounded-xl bg-amber-500/5 dark:bg-amber-500/5 border border-amber-500/10 dark:border-amber-500/10">
          <h4 className="flex items-center gap-1.5 text-sm font-semibold text-amber-600 dark:text-amber-500 m-0 mb-2">
            <span className="material-icons-round text-sm" aria-hidden>compare_arrows</span>
            Khác biệt so với Toàn Thư
          </h4>
          <div className="flex flex-col gap-1.5">
            {result.diffs.map((diff, i) => (
              <div key={i} className="flex items-center gap-2 py-1.5 px-2.5 rounded-md bg-black/5 dark:bg-white/5 text-sm">
                <span className="font-semibold text-text-primary-light dark:text-text-primary-dark whitespace-nowrap">Can {diff.stem}</span>
                <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs">{diff.field}</span>
                <div className="flex items-center gap-1 ml-auto">
                  <span className="text-text-secondary-light dark:text-text-secondary-dark line-through text-xs px-1">{diff.defaultSchool}</span>
                  <span className="material-icons-round text-[10px] opacity-50" aria-hidden>arrow_forward</span>
                  <span className="text-[#c4993c] dark:text-[#d4a94c] font-semibold px-1">{diff.thisSchool}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sihua Flows Summary */}
      {result.sihuaFlows.length > 0 && (
        <div className="p-3 rounded-xl bg-indigo-500/5 dark:bg-indigo-500/5 border border-indigo-500/10 dark:border-indigo-500/10">
          <h4 className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 m-0 mb-2">
            <span className="material-icons-round text-sm" aria-hidden>route</span>
            Phi Tinh Tứ Hóa ({result.sihuaFlows.length} luồng)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {result.sihuaFlows.slice(0, 8).map((flow, i) => {
              // Map colors based on mutagen type
              const mutagenColorMap: Record<string, string> = {
                '禄': 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10',
                '权': 'text-red-600 dark:text-red-400 bg-red-500/10',
                '科': 'text-blue-600 dark:text-blue-400 bg-blue-500/10',
                '忌': 'text-purple-600 dark:text-purple-400 bg-purple-500/10',
              };
              const mutagenLabelMap: Record<string, string> = { '禄': 'Lộc', '权': 'Quyền', '科': 'Khoa', '忌': 'Kỵ' };
              
              const colorClass = mutagenColorMap[flow.mutagen] || 'text-gray-600 bg-gray-500/10';
              const label = mutagenLabelMap[flow.mutagen] || flow.mutagen;

              return (
                <div key={i} className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-md bg-black/5 dark:bg-white/5 text-sm">
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${colorClass} whitespace-nowrap`}>
                    {label}
                  </span>
                  <span className="font-medium text-text-primary-light dark:text-text-primary-dark">{flow.targetStar}</span>
                  <span className="material-icons-round text-[10px] opacity-40 shrink-0" aria-hidden>east</span>
                  <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs truncate">{flow.targetPalace}</span>
                </div>
              );
            })}
            {result.sihuaFlows.length > 8 && (
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1.5 italic">
                +{result.sihuaFlows.length - 8} luồng khác
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Cross-School Comparison Panel ──────────────────────────────

function CrossSchoolPanel({ insight }: { insight: CrossSchoolInsight }) {
  return (
    <div className="flex flex-col gap-3 animate-fade-in-up">
      <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/10">
        <span className="text-2xl shrink-0 mt-0.5">⚖️</span>
        <div>
          <h3 className="text-base font-semibold text-text-primary-light dark:text-text-primary-dark m-0">So Sánh Ba Trường Phái</h3>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1 mb-0 leading-relaxed">{insight.recommendation}</p>
        </div>
      </div>

      {/* Consensus */}
      {insight.consensusPoints.length > 0 && (
        <div className="p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/5 border border-emerald-500/10">
          <h4 className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-500 m-0 mb-2">
            <span className="material-icons-round text-sm" aria-hidden>check_circle</span>
            Đồng Thuận
          </h4>
          <ul className="flex flex-col gap-1.5 m-0 p-0 list-none">
            {insight.consensusPoints.map((point, i) => (
              <li key={i} className="text-sm leading-relaxed py-1 px-2 rounded-md font-medium text-text-primary-light dark:text-text-primary-dark bg-emerald-500/5 dark:bg-emerald-500/10">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Divergence */}
      {insight.divergencePoints.length > 0 && (
        <div className="p-3 rounded-xl bg-amber-500/5 dark:bg-amber-500/5 border border-amber-500/10">
          <h4 className="flex items-center gap-1.5 text-sm font-semibold text-amber-600 dark:text-amber-500 m-0 mb-2">
            <span className="material-icons-round text-sm" aria-hidden>warning</span>
            Khác Biệt
          </h4>
          {insight.divergencePoints.map((div, i) => (
            <div key={i} className="py-2 border-b border-black/5 dark:border-white/5 last:border-0 last:pb-0">
              <p className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark m-0 mb-1.5">{div.topic}</p>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(div.schools).map(([school, value]) => (
                  <div key={school} className="flex items-center gap-1.5 py-1 px-2 rounded-md bg-black/5 dark:bg-white/5 text-xs">
                    <span className="font-semibold text-[#c4993c] dark:text-[#d4a94c]">{school}</span>
                    <span className="text-text-secondary-light dark:text-text-secondary-dark break-words">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
