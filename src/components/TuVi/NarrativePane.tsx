/**
 * TuVi NarrativePane
 *
 * Main narrative interpretation view for Tử Vi charts.
 * Renders introduction, archetype summary, strengths card, life-area sections,
 * yearly outlook, and closing meditation using the synthesis engine.
 */
import React, { useMemo, useState, useCallback } from 'react';
import type { TuViChartData } from '../../services/tuvi/tuviTypes';
import type { LifeAreaType, NarrativeResult, TraitItem } from '../../services/interpretation/types';
import { LIFE_AREA_ORDER } from '../../services/interpretation/types';
import { generateFullNarrative } from '../../services/interpretation/synthesisEngine';
import IntroductionBlock from '../shared/IntroductionBlock';
import StrengthsCard from '../shared/StrengthsCard';
import NarrativeSection from '../shared/NarrativeSection';
import SectionNav from '../shared/SectionNav';
import YearlyOutlookCard from '../shared/YearlyOutlookCard';
import ReadingProgress from '../shared/ReadingProgress';
import DecorativeDivider from '../shared/DecorativeDivider';
import PdfDownloadButton from '../shared/PdfDownloadButton';
import { downloadPdf } from '../../services/pdf/pdfGenerator';
import '../../styles/interpretation.css';

interface NarrativePaneProps {
    readonly chart: TuViChartData;
}

export default function TuViNarrativePane({ chart }: NarrativePaneProps) {
    const [activeArea, setActiveArea] = useState<LifeAreaType>('personality');

    const result: NarrativeResult = useMemo(() => {
        // Build chart summary for synthesis engine — thread full palace data
        const chartSummary = {
            palaces: chart.palaces.map(p => ({
                name: p.name,
                majorStars: (p.majorStars || []).map(s => ({
                    name: s.name,
                    brightness: s.brightness || '',
                })),
                minorStars: (p.minorStars || []).map(s => s.name),
                adjectiveStars: (p.adjectiveStars || []).map(s => s.name),
                changsheng12: p.changsheng12 || '',
                earthlyBranch: p.earthlyBranch || '',
                mutagenStars: [
                    ...(p.majorStars || []),
                    ...(p.minorStars || []),
                ].filter(s => s.mutagen && s.mutagen.length > 0)
                    .map(s => ({ name: s.name, mutagen: (s.mutagen || [])[0] || '' })),
                hasTuanKhong: p.hasTuanKhong || false,
                hasTrietKhong: p.hasTrietKhong || false,
            })),
            cucElement: chart.cucElement,
            cucMenhRelation: chart.cucMenhRelation,
        };
        return generateFullNarrative('tuvi', chartSummary);
    }, [chart]);

    const handleAreaClick = useCallback((area: LifeAreaType) => {
        setActiveArea(area);
    }, []);

    // Find the active life area narrative to display
    const activeNarrative = useMemo(() => {
        return result.lifeAreas.find(n => n.area === activeArea) || result.lifeAreas[0];
    }, [result.lifeAreas, activeArea]);

    return (
        <div className="card-surface p-4 sm:p-6">
            <ReadingProgress />

            <div className="flex items-center gap-2 mb-4">
                <span className="material-icons-round text-accent-start text-xl">auto_awesome</span>
                <h2 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
                    Luận Giải Tổng Hợp
                </h2>
            </div>

            {/* Introduction / Prologue */}
            <IntroductionBlock introduction={result.introduction} />

            <DecorativeDivider />

            {/* Strengths & Challenges */}
            <StrengthsCard
                strengths={result.strengths as TraitItem[]}
                challenges={result.challenges as TraitItem[]}
            />

            <DecorativeDivider />

            {/* Section Navigation — Tab Switching */}
            <SectionNav
                areas={LIFE_AREA_ORDER}
                activeArea={activeArea}
                onAreaClick={handleAreaClick}
            />

            {/* Active Life Area Narrative — Tab Content */}
            {activeNarrative && (
                <NarrativeSection
                    narrative={activeNarrative}
                    id={`narrative-${activeNarrative.area}`}
                />
            )}

            <DecorativeDivider />

            {/* Yearly Outlook */}
            <YearlyOutlookCard outlook={result.yearlyOutlook} />

            {/* PDF Download */}
            <PdfDownloadButton onDownload={(pdfTier) => downloadPdf(result, 'tuvi', pdfTier)} />

            {/* Closing Meditation */}
            <div className="closing-meditation">
                {result.closingMeditation.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                ))}
            </div>

            {/* Closing Advice */}
            <div className="closing-advice">
                {result.closingAdvice}
            </div>
        </div>
    );
}
