/**
 * ChiemTinhView — Main Page Container for the Chiêm Tinh (Western Astrology) Module
 * (Applet Architecture)
 *
 * Orchestrates: Birth Data Input → Chart Calculation → Results Display
 *
 * Standardized 4-Tab layout:
 *  Tab 1: Tổng Quan (Dashboard) — Big 3 Profile + Chart Wheel (Free)
 *  Tab 2: Luận Giải (Narrative) — Life domain narratives (Freemium)
 *  Tab 3: Vận Hạn (Cycles) — Transits + Progressions (Premium)
 *  Tab 4: Học Thuật (Academic) — Raw aspects, chart overview (Elite)
 *
 * Performance: Engine code + result panels are lazy-loaded.
 */

import React, { useState, useCallback, useEffect, Suspense, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useAnalysisDepth } from '../../hooks/useAnalysisDepth';

import PremiumLoader from '../shared/PremiumLoader';
import ErrorState from '../shared/ErrorState';
import type { BirthData, NatalChart, InterpretationResult, HouseSystemId } from '../../types/westernAstro';
import { DEFAULT_CHART_CONFIG } from '../../types/westernAstro';
import { ErrorBoundary } from '../ErrorBoundary';
import { ContentGate } from '../shared/ContentGate';
import BirthDataForm from './BirthDataForm';
import PremiumStickyActionBar from '../shared/PremiumStickyActionBar';
import ShareButton from '../shared/ShareButton';
import PdfDownloadButton from '../shared/PdfDownloadButton';
import ProModeToggle from '../shared/ProModeToggle';
import EngineTabNav, { type EngineTab } from '../shared/EngineTabNav';
import DataSummaryBar from '../shared/DataSummaryBar';
import { useUserTier } from '../../hooks/useUserTier';
import { runInWorker } from '../../workers/engineWorker';

// Lazy-load result panel components — only needed after chart generation
const ZodiacProfileCard = React.lazy(() => import('./ZodiacProfileCard'));
const PersonalitySummary = React.lazy(() => import('./PersonalitySummary'));
const ChartOverviewPanel = React.lazy(() => import('./ChartOverviewPanel'));
const InterpretationPanel = React.lazy(() => import('./InterpretationPanel'));
const ChiemTinhNarrativePane = React.lazy(() => import('./NarrativePane'));
const AcademicToggle = React.lazy(() => import('../shared/AcademicToggle'));

// Lazy-load new Dynamics Cycles panels
const TransitTab = React.lazy(() => import('./TransitTab'));

// Lazy-load heavy SVG visualization component
const NatalChartWheel = React.lazy(() => import('./NatalChartWheel'));


// ─── 4-Tab definitions ───
const CHIEM_TINH_TABS: EngineTab[] = [
  { id: 'dashboard', label: 'Tổng Quan', icon: 'grid_view' },
  { id: 'narrative', label: 'Luận Giải', icon: 'auto_stories' },
  { id: 'cycles', label: 'Vận Hạn', icon: 'timeline' },
  { id: 'academic', label: 'Học Thuật', icon: 'school' },
];

// ─── Skeleton shimmer placeholder ───
function SkeletonCard({ height = 'h-64' }: { height?: string }) {
  return (
    <div className={`card-surface ${height} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent animate-shimmer" />
      <div className="p-6 space-y-3">
        <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700/50" />
        <div className="h-3 w-2/3 rounded bg-gray-100 dark:bg-gray-800/50" />
        <div className="h-3 w-1/2 rounded bg-gray-100 dark:bg-gray-800/50" />
      </div>
    </div>
  );
}

export default function ChiemTinhView() {
  usePageTitle('Chiêm Tinh');
  const navigate = useNavigate();
  const { defaultOpen, expanded } = useAnalysisDepth();
  const [chart, setChart] = useState<NatalChart | null>(null);
  const [interpretation, setInterpretation] = useState<InterpretationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [houseSystem, setHouseSystem] = useState<HouseSystemId>(DEFAULT_CHART_CONFIG.houseSystem);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isProMode, setIsProMode] = useState(false);
  const { hasAccess } = useUserTier();

  const handleGenerate = useCallback(
    async (birthData: BirthData) => {
      setIsLoading(true);
      setError('');

      try {
        const result = await runInWorker<NatalChart>('calculateNatalChart', birthData, { houseSystem });
        startTransition(() => {
          setChart(result);
          setError('');
          setIsEditing(false);
        });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tạo bản đồ sao.';
        setError(message);
        setChart(null);
        setInterpretation(null);
      } finally {
        setIsLoading(false);
      }
    },
    [houseSystem],
  );

  // Deferred interpretation: compute AFTER chart renders
  useEffect(() => {
    if (!chart) {
      setInterpretation(null);
      return;
    }
    let cancelled = false;
    const rafId = requestAnimationFrame(async () => {
      try {
        // Dynamic import — interpreter only loaded when chart exists
        const { interpretChart } = await import('../../utils/astroInterpreter');
        const interp = interpretChart(chart);
        if (!cancelled) setInterpretation(interp);
      } catch {
        // Interpretation is non-critical
      }
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [chart]);

  const handleReset = useCallback(() => {
    setChart(null);
    setInterpretation(null);
    setError('');
    setIsEditing(false);
    setActiveTab('natal');
  }, []);

  // Auto-scroll to results when chart is generated
  useEffect(() => {
    if (chart && !isLoading) {
      const timer = setTimeout(() => {
        document.getElementById('sec-profile')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [chart, isLoading]);

  const handleEdit = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  return (
    <div className="space-y-4 chiem-tinh-module">
      {/* Show input form when no chart is generated */}
      {!chart && !isLoading && (
        <BirthDataForm
          onGenerate={handleGenerate}
          isLoading={isLoading}
          houseSystem={houseSystem}
          onHouseSystemChange={setHouseSystem}
        />
      )}

      {/* Show Value-Builder PremiumLoader when generating chart */}
      {!chart && isLoading && (
        <div className="card-surface min-h-[400px] flex flex-col items-center justify-center">
            <PremiumLoader />
        </div>
      )}

      {/* Error display */}
      {error && (
        <ErrorState
          title="Lỗi tạo bản đồ sao"
          message={error}
          onRetry={handleReset}
          retryLabel="← Quay lại nhập thông tin"
        />
      )}

      {/* Chart results */}
      {chart && (
        <div className="space-y-4 animate-fade-in-up">
          {/* ① DataSummaryBar — Replaces old BirthDataSummary */}
          <DataSummaryBar
            name={chart.birthData.name || 'Bản đồ sao'}
            date={`${String(chart.birthData.day).padStart(2, '0')}/${String(chart.birthData.month).padStart(2, '0')}/${chart.birthData.year}`}
            time={`${String(chart.birthData.hour).padStart(2, '0')}:${String(chart.birthData.minute).padStart(2, '0')}`}
            location={chart.birthData.locationName}
            onEdit={() => setIsEditing(prev => !prev)}
            onReset={handleReset}
          />

          {/* Inline edit form (collapsible) */}
          {isEditing && (
            <div className="animate-fade-in-up">
              <BirthDataForm
                onGenerate={handleGenerate}
                isLoading={isLoading}
                initialData={chart.birthData}
                houseSystem={houseSystem}
                onHouseSystemChange={setHouseSystem}
              />
            </div>
          )}

          {/* ② Sticky Action Bar */}
          <PremiumStickyActionBar>
            <PdfDownloadButton
                label="Tải Báo Cáo Chiêm Tinh (PDF)"
                onDownload={async (pdfTier) => {
                  const { generateFullNarrative } = await import('../../services/interpretation/synthesisEngine');
                  const { downloadPdf } = await import('../../services/pdf/pdfGenerator');
                  const dominantElement = (['fire', 'earth', 'air', 'water'] as const)
                      .reduce((a, b) => chart.overview.elementBalance[a] > chart.overview.elementBalance[b] ? a : b);
                  const dominantModality = (['cardinal', 'fixed', 'mutable'] as const)
                      .reduce((a, b) => chart.overview.qualityBalance[a] > chart.overview.qualityBalance[b] ? a : b);
                  const summary = {
                      placements: chart.planets.map(p => ({
                          planet: p.id, sign: p.sign, house: p.house, degree: p.degree,
                      })),
                      dominantElement: dominantElement.charAt(0).toUpperCase() + dominantElement.slice(1),
                      dominantModality: dominantModality.charAt(0).toUpperCase() + dominantModality.slice(1),
                  };
                  const result = generateFullNarrative('chiemtinh', summary);
                  await downloadPdf(result, 'chiemtinh', pdfTier);
                }}
              />
            <ShareButton targetId="sec-wheel" fileName={`chiem-tinh-${chart.birthData.name || 'lich-viet'}`} label="Tải Ảnh Bản Đồ" className="flex-1 min-w-[140px]" />
            <button
                onClick={() => navigate('/app/hop-la')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-pink-500/10 dark:bg-pink-400/10 text-pink-600 dark:text-pink-400 hover:bg-pink-500/20 dark:hover:bg-pink-400/20 border border-pink-500/25 dark:border-pink-400/25 transition-all duration-200 whitespace-nowrap"
            >
                <span className="material-icons-round text-sm" aria-hidden="true">diversity_1</span>
                Hợp Lá
            </button>
          </PremiumStickyActionBar>

          {/* ③ Unified 4-Tab Navigation */}
          <EngineTabNav
            tabs={CHIEM_TINH_TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            headerRight={
              <ProModeToggle isProMode={isProMode} onToggle={setIsProMode} label="Bản đồ SVG" />
            }
          />

          {/* ④ Tab Content Panels */}
          <Suspense fallback={<PremiumLoader />}>

            {/* ═══ TAB 1: DASHBOARD (Tổng Quan) — FREE ═══ */}
            {activeTab === 'dashboard' && (
              <div className="space-y-4">
                {/* Big 3 Profile Card */}
                <div id="sec-profile">
                  <ZodiacProfileCard chart={chart} />
                </div>

                {/* Personality Summary */}
                <div id="sec-summary">
                  {interpretation && <PersonalitySummary chart={chart} interpretation={interpretation} />}
                </div>

                {/* Natal Chart Wheel — ELITE PRO MODE */}
                <div id="sec-wheel">
                  {isProMode && hasAccess('elite') ? (
                    <ErrorBoundary viewName="Bản đồ sao">
                      <Suspense fallback={<SkeletonCard height="h-80" />}>
                        <NatalChartWheel chart={chart} />
                      </Suspense>
                    </ErrorBoundary>
                  ) : (
                    <div className="card-surface p-4 text-center text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      <span className="material-icons-round text-3xl text-gold/30 dark:text-gold-dark/30 mb-2 block" aria-hidden="true">auto_awesome</span>
                      Bật Pro Mode để xem Bản đồ sao SVG tương tác
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ═══ TAB 2: NARRATIVE (Luận Giải) — FREEMIUM ═══ */}
            {activeTab === 'narrative' && (
              <ContentGate requiredTier="premium" sectionTitle="Luận Giải Chuyên Sâu" showBlurPreview>
                <div className="space-y-4">
                  <ChiemTinhNarrativePane chart={chart} />
                  {interpretation && (
                    <ChartOverviewPanel chart={chart} interpretation={interpretation} />
                  )}
                </div>
              </ContentGate>
            )}

            {/* ═══ TAB 3: CYCLES (Vận Hạn) — PREMIUM ═══ */}
            {activeTab === 'cycles' && (
              <ContentGate requiredTier="premium" sectionTitle="Vận Hạn & Transits" showBlurPreview>
                <TransitTab natalChart={chart} />
              </ContentGate>
            )}

            {/* ═══ TAB 4: ACADEMIC (Học Thuật) — ELITE ═══ */}
            {activeTab === 'academic' && (
              <ContentGate requiredTier="elite" sectionTitle="Phân Tích Học Thuật" showBlurPreview>
                {interpretation ? (
                  <InterpretationPanel interpretation={interpretation} />
                ) : (
                  <SkeletonCard height="h-48" />
                )}
              </ContentGate>
            )}

          </Suspense>
        </div>
      )}
    </div>
  );
}
