/**
 * TuViModule — Main Page Container for the Tử Vi Module (Applet Architecture)
 *
 * Refactored to the standardized 4-Tab Applet Pattern:
 *  Tab 1: Tổng Quan (Dashboard) — 12-Palace Grid + Summary (Free)
 *  Tab 2: Luận Giải (Narrative) — Palace-by-palace interpretation (Freemium)
 *  Tab 3: Vận Hạn (Cycles) — Đại Vận + Lưu Niên Timeline Stepper (Premium)
 *  Tab 4: Học Thuật (Academic) — Multi-school switcher + raw star data (Elite)
 *
 * Features:
 *  - DataSummaryBar: Input form collapses into a compact sticky bar after generation
 *  - EngineTabNav: Unified tab navigation consistent across all modules
 *  - Lazy-loaded workspace panels for optimal initial load performance
 */

import React, { useState, useCallback, useRef, useMemo, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/tuvi.css';
import TuViInputForm from './TuViInputForm';
import type { TuViChartData, ChartInput, SchoolStrategy } from '../../services/tuvi/tuviTypes';
import type { NarrativeResult } from '../../services/interpretation/types';

import PremiumLoader from '../shared/PremiumLoader';
import ErrorState from '../shared/ErrorState';
import ProModeToggle from '../shared/ProModeToggle';
import DataSummaryBar from '../shared/DataSummaryBar';
import EngineTabNav, { type EngineTab } from '../shared/EngineTabNav';
import { runInWorker } from '../../workers/engineWorker';
import { ContentGate } from '../shared/ContentGate';
import PremiumStickyActionBar from '../shared/PremiumStickyActionBar';
import PdfDownloadButton from '../shared/PdfDownloadButton';
import ShareButton from '../shared/ShareButton';
import { UpgradeBanner } from '../shared/UpgradeBanner';
import { useUserTier } from '../../hooks/useUserTier';

// Lazy-load heavy workspace sub-panels
const TuViGrid = React.lazy(() => import('./TuViGrid'));
const TongQuanLaSo = React.lazy(() => import('./TongQuanLaSo'));
const DetailedInterpretationPane = React.lazy(() => import('./DetailedInterpretationPane'));
const DaiVanPane = React.lazy(() => import('./DaiVanPane'));
const LuuNienPane = React.lazy(() => import('./LuuNienPane'));
const SchoolTabSwitcher = React.lazy(() => import('./SchoolTabSwitcher'));

// ─── Tab Definitions ───
const TUVI_TABS: EngineTab[] = [
  { id: 'dashboard', label: 'Tổng Quan', icon: 'grid_view' },
  { id: 'narrative', label: 'Luận Giải', icon: 'auto_stories' },
  { id: 'cycles', label: 'Vận Hạn', icon: 'timeline' },
  { id: 'academic', label: 'Học Thuật', icon: 'school' },
];

export default function TuViModule() {
  const navigate = useNavigate();
  const [chart, setChart] = useState<TuViChartData | null>(null);
  const [input, setInput] = useState<ChartInput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isProMode, setIsProMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const chartRef = useRef<HTMLDivElement>(null);
  const { isTier, hasAccess } = useUserTier();

  const handleGenerate = useCallback(async (newInput: ChartInput) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await runInWorker<TuViChartData>('generateTuViChart', newInput);
      setChart(result);
      setInput(newInput);
      setError('');
      setIsEditing(false); // Collapse form after successful generation
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tạo lá số.';
      setError(message);
      setChart(null);
      setInput(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setChart(null);
    setInput(null);
    setError('');
    setIsEditing(false);
    setActiveTab('dashboard');
  }, []);

  // Narrative is now generated on-demand inside the PDF download handler to save memory.

  // Build summary bar data from input
  const summaryDate = useMemo(() => {
    if (!input) return '';
    if (input.dateType === 'solar' && input.solarDate) {
      const parts = input.solarDate.split('-');
      if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]} DL`;
    }
    if (input.dateType === 'lunar') {
      return `${input.lunarDay}/${input.lunarMonth}/${input.lunarYear} ÂL`;
    }
    return '';
  }, [input]);

  const summarySchoolLabel = useMemo(() => {
    if (!input?.school) return '';
    const labels: Record<string, string> = { vi: 'Việt Nam', cn: 'Trung Châu', tw: 'Bắc Phái' };
    return labels[input.school] || '';
  }, [input]);

  return (
    <div className="space-y-4">
      {/* ═══ PRE-GENERATION: Show Input Form ═══ */}
      {!chart && !isLoading && !isEditing && (
        <TuViInputForm onGenerate={handleGenerate} isLoading={isLoading} />
      )}

      {/* ═══ LOADING STATE ═══ */}
      {!chart && isLoading && (
        <div className="card-surface min-h-[400px] flex flex-col items-center justify-center">
          <PremiumLoader />
        </div>
      )}

      {/* ═══ ERROR STATE ═══ */}
      {error && (
        <ErrorState
          title="Lỗi tạo lá số"
          message={error}
          onRetry={handleReset}
          retryLabel="← Quay lại nhập thông tin"
        />
      )}

      {/* ═══ POST-GENERATION: The Applet Shell ═══ */}
      {chart && input && (
        <div className="space-y-4 animate-fade-in-up">
          {/* ① DataSummaryBar — Collapsed Input */}
          <DataSummaryBar
            name={input.name || 'Lá Số Tử Vi'}
            date={summaryDate}
            badges={summarySchoolLabel ? [{ label: summarySchoolLabel }] : undefined}
            onEdit={() => setIsEditing(prev => !prev)}
            onReset={handleReset}
          >
            {/* School selector inline */}
            <select
              value={input.school || 'vi'}
              onChange={(e) => {
                const newSchool = e.target.value as SchoolStrategy;
                handleGenerate({ ...input, school: newSchool });
              }}
              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold border border-border-light dark:border-border-dark bg-surface-subtle-light dark:bg-surface-subtle-dark text-text-primary-light dark:text-text-primary-dark appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
              style={{
                paddingRight: '1.75rem',
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: `right 0.25rem center`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `1.25em 1.25em`,
              }}
            >
              <option value="vi">VN</option>
              <option value="cn">TQ</option>
              <option value="tw">ĐL</option>
            </select>
          </DataSummaryBar>

          {/* Inline edit form (collapsible) */}
          {isEditing && (
            <div className="animate-fade-in-up">
              <TuViInputForm onGenerate={handleGenerate} isLoading={isLoading} />
            </div>
          )}

          {/* ② Floating Action Bar */}
          <PremiumStickyActionBar>
            <PdfDownloadButton
              label="Tải PDF Tử Vi"
              onDownload={async (pdfTier) => {
                if (!chart) return;
                try {
                  const chartSummary = {
                    palaces: chart.palaces.map(p => ({
                      name: p.name,
                      majorStars: (p.majorStars || []).map(s => ({
                        name: s.name,
                        brightness: s.brightness || '',
                      })),
                      minorStars: (p.minorStars || []).map(s => s.name),
                      auxiliaryStars: [],
                    })),
                  };
                  // Generate full narrative in background worker ONLY when downloading
                  const generatedNarrative = await runInWorker<NarrativeResult>('generateFullNarrative', 'tuvi', chartSummary);
                  const { downloadPdf } = await import('../../services/pdf/pdfGenerator');
                  await downloadPdf(generatedNarrative, 'tuvi', pdfTier);
                } catch (error) {
                  console.error('Failed to generate PDF narrative in worker', error);
                }
              }}
            />
            <ShareButton
              targetId="tuvi-chart-export"
              fileName={`lá-số-tử-vi`}
              label="Tải Ảnh Lá Số"
              className="flex-1 min-w-[140px]"
            />
            <button
              onClick={() => navigate('/app/hop-la')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-pink-500/10 dark:bg-pink-400/10 text-pink-600 dark:text-pink-400 hover:bg-pink-500/20 dark:hover:bg-pink-400/20 border border-pink-500/25 dark:border-pink-400/25 transition-all duration-200 whitespace-nowrap"
            >
              <span className="material-icons-round text-sm" aria-hidden="true">diversity_1</span>
              Hợp Lá
            </button>
          </PremiumStickyActionBar>

          {/* Upgrade Banner for partial-premium users */}
          {isTier('premium') && <UpgradeBanner />}

          {/* ③ Unified 4-Tab Navigation */}
          <EngineTabNav
            tabs={TUVI_TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            headerRight={
              <ProModeToggle isProMode={isProMode} onToggle={setIsProMode} />
            }
          />

          {/* ④ Tab Content Panels */}
          <Suspense fallback={<PremiumLoader />}>

            {/* ═══ TAB 1: DASHBOARD (Tổng Quan) — FREE ═══ */}
            {activeTab === 'dashboard' && (
              <div className="space-y-4" id="tuvi-chart-export">
                {/* The 12-Palace Grid */}
                {isProMode && hasAccess('elite') ? (
                  <div className="w-full transition-all duration-300 animate-fade-scale">
                    <TuViGrid
                      chart={chart}
                      input={input}
                      chartRef={chartRef}
                      onPalaceClick={() => {}}
                      selectedBranch={undefined}
                    />
                    {/* Legend */}
                    <div className="card-surface p-4 mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-wrap text-xs text-text-secondary-light dark:text-text-secondary-dark">
                        <div className="flex items-center gap-1.5">
                          <span className="tuvi-star-major tuvi-legend-icon">■</span> Chính Tinh
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="tuvi-star-auspicious tuvi-legend-icon">■</span> Cát Tinh
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="tuvi-star-malefic tuvi-legend-icon">■</span> Sát Tinh
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="tuvi-hua-loc tuvi-legend-icon font-bold">Lộc</span>
                          <span className="tuvi-hua-quyen tuvi-legend-icon font-bold">Quyền</span>
                          <span className="tuvi-hua-khoa tuvi-legend-icon font-bold">Khoa</span>
                          <span className="tuvi-hua-ky tuvi-legend-icon font-bold">Kỵ</span>
                          Tứ Hóa
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="card-surface p-4 text-center text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    <span className="material-icons-round text-3xl text-gold/30 dark:text-gold-dark/30 mb-2 block" aria-hidden="true">grid_view</span>
                    Bật Pro Mode để xem Lưới Lá Số tương tác
                  </div>
                )}

                {/* Tổng Quan Lá Số — Summary */}
                <TongQuanLaSo chart={chart} />
              </div>
            )}

            {/* ═══ TAB 2: NARRATIVE (Luận Giải) — FREEMIUM ═══ */}
            {activeTab === 'narrative' && (
              <ContentGate requiredTier="premium" sectionTitle="Luận Giải Từng Cung" showBlurPreview>
                <DetailedInterpretationPane chart={chart} />
              </ContentGate>
            )}

            {/* ═══ TAB 3: CYCLES (Vận Hạn) — PREMIUM ═══ */}
            {activeTab === 'cycles' && (
              <ContentGate requiredTier="premium" sectionTitle="Vận Hạn & Lưu Niên" showBlurPreview>
                <div className="space-y-4">
                  <DaiVanPane chart={chart} input={input} />
                  <LuuNienPane
                    chart={chart}
                    input={input}
                    onUpdateInput={handleGenerate}
                  />
                </div>
              </ContentGate>
            )}

            {/* ═══ TAB 4: ACADEMIC (Học Thuật) — ELITE ═══ */}
            {activeTab === 'academic' && (
              <ContentGate requiredTier="elite" sectionTitle="Phân Tích Đa Trường Phái" showBlurPreview>
                <SchoolTabSwitcher chart={chart} />
              </ContentGate>
            )}

          </Suspense>
        </div>
      )}
    </div>
  );
}
