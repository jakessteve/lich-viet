/**
 * ChiemTinhView — Main Page Container for the Chiêm Tinh (Western Astrology) Module
 *
 * Orchestrates: Birth Data Input → Chart Calculation → Results Display
 *
 * Performance: Engine code + result panels are lazy-loaded — they are only
 * downloaded when the user generates a chart, keeping the initial tab load fast.
 */

import React, { useState, useCallback, useEffect, Suspense, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useAnalysisDepth } from '../../hooks/useAnalysisDepth';
import Icon from '../shared/Icon';

import PremiumLoader from '../shared/PremiumLoader';
import ErrorState from '../shared/ErrorState';
import type { BirthData, NatalChart, InterpretationResult, HouseSystemId } from '../../types/westernAstro';
import { DEFAULT_CHART_CONFIG } from '../../types/westernAstro';
import { ErrorBoundary } from '../ErrorBoundary';
import CollapsibleCard from '../CollapsibleCard';
import { ContentGate } from '../shared/ContentGate';
import BirthDataForm from './BirthDataForm';
import PremiumStickyActionBar from '../shared/PremiumStickyActionBar';
import ShareButton from '../shared/ShareButton';
import PdfDownloadButton from '../shared/PdfDownloadButton';
import ProModeToggle from '../shared/ProModeToggle';
import EngineTabNav, { type EngineTab } from '../shared/EngineTabNav';
import { useUserTier } from '../../hooks/useUserTier';

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

// ─── Section definitions for jump-nav ───
const SECTIONS = [
  { id: 'sec-profile', label: 'Hồ Sơ' },
  { id: 'sec-summary', label: 'Tóm Tắt' },
  { id: 'sec-wheel', label: 'Bản Đồ' },
  { id: 'sec-overview', label: 'Tổng Quan' },
  { id: 'sec-narrative', label: 'Luận Giải' },
  { id: 'sec-interp', label: 'Học Thuật' },
] as const;

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

// ─── Birth data summary bar (edit-in-place) ───
function BirthDataSummary({
  birthData,
  onEdit,
  onReset,
}: {
  birthData: BirthData;
  onEdit: () => void;
  onReset: () => void;
}) {
  const dateStr = `${String(birthData.day).padStart(2, '0')}/${String(birthData.month).padStart(2, '0')}/${birthData.year}`;
  const timeStr = `${String(birthData.hour).padStart(2, '0')}:${String(birthData.minute).padStart(2, '0')}`;

  return (
    <div className="card-surface px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap">
      <div className="flex items-center gap-4 text-sm text-text-secondary-light dark:text-text-secondary-dark min-w-0">
        <span className="font-semibold text-text-primary-light dark:text-text-primary-dark truncate">
          {birthData.name || 'Bản đồ sao'}
        </span>
        <span>
          {dateStr} · {timeStr}
        </span>
        {birthData.locationName && <span className="hidden sm:inline">{birthData.locationName}</span>}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onEdit}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium text-gold dark:text-gold-dark bg-gold/10 dark:bg-gold-dark/10 hover:bg-gold/20 dark:hover:bg-gold-dark/20 border border-gold/20 dark:border-gold-dark/20 transition-all"
        >
          <Icon name="edit" className="w-3 h-3" /> Sửa
        </button>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark hover:text-red-500 dark:hover:text-red-400 transition-colors"
          title="Lập bản đồ mới"
        >
          <Icon name="restart_alt" className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

// ─── Sticky Jump-Nav TOC ───
function JumpNav() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0.1 },
    );
    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="sticky top-0 z-20 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md border-b border-border-light/30 dark:border-border-dark/30 -mx-4 px-4 sm:-mx-0 sm:px-0">
      <div className="flex overflow-x-auto scrollbar-none gap-1 py-1.5">
        {SECTIONS.map((sec) => (
          <button
            key={sec.id}
            onClick={() => scrollTo(sec.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeSection === sec.id
              ? 'text-gold dark:text-gold-dark bg-gold/10 dark:bg-gold-dark/10'
              : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-gold dark:hover:text-gold-dark hover:bg-gold/5 dark:hover:bg-gold-dark/5'
              }`}
          >
            {sec.label}
          </button>
        ))}
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
  const [activeTab, setActiveTab] = useState<'natal' | 'transits'>('natal');
  const [isProMode, setIsProMode] = useState(false);
  const { hasAccess } = useUserTier();

  const handleGenerate = useCallback(
    async (birthData: BirthData) => {
      setIsLoading(true);
      setError('');

      try {
        // Dynamic import — engine code only loaded on first chart generation
        const { calculateNatalChart } = await import('../../utils/natalChartCalculator');
        const result = calculateNatalChart(birthData, { houseSystem });
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
          {/* Birth data summary bar with edit-in-place */}
          <BirthDataSummary birthData={chart.birthData} onEdit={handleEdit} onReset={handleReset} />

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

          {/* Header & Sticky Action Bar */}
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
          </PremiumStickyActionBar>

          {/* Action buttons on top */}
          <div className="flex items-center justify-end gap-2 mb-4 flex-wrap" data-html2canvas-ignore>
            <button
                onClick={() => navigate('/app/hop-la')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-pink-500/10 dark:bg-pink-400/10 text-pink-600 dark:text-pink-400 hover:bg-pink-500/20 dark:hover:bg-pink-400/20 border border-pink-500/25 dark:border-pink-400/25 transition-all duration-200"
            >
                <span className="material-icons-round text-sm" aria-hidden="true">diversity_1</span>
                Hợp Lá (Synastry)
            </button>
            <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gold/10 dark:bg-gold-dark/10 text-gold dark:text-gold-dark hover:bg-gold/20 dark:hover:bg-gold-dark/20 border border-gold/25 dark:border-gold-dark/25 transition-all duration-200"
            >
                <span className="material-icons-round text-sm" aria-hidden="true">add_circle</span>
                Tạo Bản đồ sao mới
            </button>
          </div>

          {/* View Mode Tabs — EngineTabNav with ProModeToggle in headerRight */}
          {(() => {
            const CHIEM_TINH_TABS: EngineTab[] = [
              { id: 'natal', label: 'Cá Nhân (Natal)', icon: 'person' },
              { id: 'transits', label: 'Vận Hạn (Transits)', icon: 'timeline' },
            ];
            return (
              <EngineTabNav
                tabs={CHIEM_TINH_TABS}
                activeTab={activeTab}
                onTabChange={(id) => setActiveTab(id as 'natal' | 'transits')}
                headerRight={
                  <ProModeToggle isProMode={isProMode} onToggle={setIsProMode} label="Bản đồ SVG" />
                }
                className="mb-4"
              />
            );
          })()}

          <Suspense fallback={<PremiumLoader />}>
            {activeTab === 'natal' && (
              <>
                {/* Sticky jump-nav */}
                <JumpNav />

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

                {/* All Analysis — GATED: Partial Premium+ */}
                <ContentGate requiredTier="premium" sectionTitle="Tổng Quan & Luận Giải" showBlurPreview>
                  <div id="sec-overview">
                    {interpretation && (
                      <CollapsibleCard title="Tổng Quan Bản Đồ" icon="📊" defaultOpen={defaultOpen('high')} collapseOnMobile={true}>
                        <div className="p-4">
                          <ChartOverviewPanel chart={chart} interpretation={interpretation} />
                        </div>
                      </CollapsibleCard>
                    )}
                  </div>

                  {/* Narrative Interpretation — Life Areas (NEW) */}
                  <div id="sec-narrative">
                    <ChiemTinhNarrativePane chart={chart} />
                  </div>

                  {/* Detailed Interpretations — Academic Detail */}
                  <div id="sec-interp">
                    {interpretation ? (
                      <AcademicToggle label="📚 Xem Luận Giải Chi Tiết — Góc Học Thuật" defaultOpen={expanded}>
                        <InterpretationPanel interpretation={interpretation} />
                      </AcademicToggle>
                    ) : (
                      <SkeletonCard height="h-48" />
                    )}
                  </div>
                </ContentGate>
              </>
            )}

            {activeTab === 'transits' && <TransitTab natalChart={chart} />}
          </Suspense>
        </div>
      )}
    </div>
  );
}
