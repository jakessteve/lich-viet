import React, { useState, useMemo } from 'react';
import Icon from '../shared/Icon';
import type { TuViChartData, ChartInput, TuViPalace } from '../../services/tuvi/tuviTypes';
import TuViGrid from './TuViGrid';
import TongQuanLaSo from './TongQuanLaSo';
import DetailedInterpretationPane from './DetailedInterpretationPane';
import AcademicToggle from '../shared/AcademicToggle';
import DaiVanPane from './DaiVanPane';
import LuuNienPane from './LuuNienPane';
import { ContentGate } from '../shared/ContentGate';
import SchoolTabSwitcher from './SchoolTabSwitcher';
import { UpgradeBanner } from '../shared/UpgradeBanner';
import { useUserTier } from '../../hooks/useUserTier';
import { downloadPdf } from '../../services/pdf/pdfGenerator';
import { generateFullNarrative } from '../../services/interpretation/synthesisEngine';
import PdfDownloadButton from '../shared/PdfDownloadButton';
import ShareButton from '../shared/ShareButton';
import PremiumStickyActionBar from '../shared/PremiumStickyActionBar';
import ProModeToggle from '../shared/ProModeToggle';

interface TuViWorkspaceProps {
  readonly chart: TuViChartData;
  readonly input: ChartInput;
  readonly chartRef: React.RefObject<HTMLDivElement | null>;
  readonly onUpdateInput?: (newInput: ChartInput) => void;
  readonly isProMode?: boolean;
}

export default function TuViWorkspace({ chart, input, chartRef, onUpdateInput, isProMode = false }: TuViWorkspaceProps) {
  const [selectedPalace, setSelectedPalace] = useState<TuViPalace | null>(
    chart.palaces.find((p) => p.name.includes('Mệnh')) || null,
  );
  const [isDownloading, setIsDownloading] = useState(false);
  const { isTier, hasAccess, tier: _tier } = useUserTier();

  // Generate narrative result for PDF
  const narrativeResult = useMemo(() => {
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
    return generateFullNarrative('tuvi', chartSummary);
  }, [chart]);

  return (
    <div className="flex flex-col gap-4">


      {/* ① Chart Grid — ELITE PRO MODE ONLY */}
      <div id="tuvi-chart-export">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark">
            {isProMode && hasAccess('elite') ? 'Lưới Lá Số (Pro Mode)' : 'Tổng Quan'}
          </h2>
        </div>

        {isProMode && hasAccess('elite') && (
          <div className="w-full transition-all duration-300 animate-fade-scale">
            <TuViGrid
              chart={chart}
              input={input}
              chartRef={chartRef}
              onPalaceClick={setSelectedPalace}
              selectedBranch={selectedPalace?.earthlyBranch}
            />

            {/* Chart summary footer */}
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
        )}
      </div>

      {/* Premium Sticky Action Bar */}
      <PremiumStickyActionBar>
        <PdfDownloadButton
          label="Tải Báo Cáo Tử Vi (PDF)"
          onDownload={async (pdfTier) => {
            await downloadPdf(narrativeResult, 'tuvi', pdfTier);
          }}
        />
        <ShareButton targetId="tuvi-chart-export" fileName={`lá-số-tử-vi`} label="Tải Ảnh Lá Số" className="flex-1 min-w-[140px]" />
      </PremiumStickyActionBar>

      {/* Upgrade Banner for partial-premium users */}
      {isTier('premium') && <UpgradeBanner />}

      {/* ② Tổng Quan Lá Số — Unified Hook (ALL TIERS) */}
      <TongQuanLaSo chart={chart} />

      {/* ②b Multi-School Tab Switcher — PREMIUM */}
      <ContentGate requiredTier="premium" sectionTitle="Phân Tích Đa Trường Phái" showBlurPreview>
        <SchoolTabSwitcher chart={chart} />
      </ContentGate>

      {/* ③④⑤ Detailed Analysis + Đại Vận + Lưu Niên — SINGLE GATE */}
      <ContentGate requiredTier="premium" sectionTitle="Luận Giải & Vận Hạn Chi Tiết" showBlurPreview>
        <AcademicToggle label="Luận Giải Chi Tiết Từng Cung — Học Thuật">
          <DetailedInterpretationPane chart={chart} />
        </AcademicToggle>

        <DaiVanPane chart={chart} input={input} />

        {onUpdateInput && <LuuNienPane chart={chart} input={input} onUpdateInput={onUpdateInput} />}
      </ContentGate>
    </div>
  );
}
