/**
 * ChiemTinh NarrativePane
 *
 * Narrative interpretation view for Chiêm Tinh (Western Astrology) charts.
 * Renders introduction, archetype summary, strengths, life-area sections,
 * yearly outlook, and closing meditation using the synthesis engine.
 */
import React, { useMemo, useState, useCallback } from 'react';
import type { NatalChart } from '../../types/westernAstro';
import type { LifeAreaType, NarrativeResult, TraitItem } from '../../services/interpretation/types';
import { LIFE_AREA_ORDER } from '../../services/interpretation/types';
import { generateFullNarrative } from '../../services/interpretation/synthesisEngine';
import type { ChiemTinhChartSummary } from '../../services/interpretation/archetypeDetector';
import IntroductionBlock from '../shared/IntroductionBlock';
import StrengthsCard from '../shared/StrengthsCard';
import NarrativeSection from '../shared/NarrativeSection';
import SectionNav from '../shared/SectionNav';
import YearlyOutlookCard from '../shared/YearlyOutlookCard';
import DecorativeDivider from '../shared/DecorativeDivider';
import '../../styles/interpretation.css';

interface ChiemTinhNarrativePaneProps {
    readonly chart: NatalChart;
}

/** Map NatalChart to a ChiemTinhChartSummary for the synthesis engine. */
function toChartSummary(chart: NatalChart): ChiemTinhChartSummary {
    // Get dominant element from chart overview
    const elementBalance = chart.overview.elementBalance;
    const dominantElement = (['fire', 'earth', 'air', 'water'] as const)
        .reduce((a, b) => elementBalance[a] > elementBalance[b] ? a : b);

    // Get dominant modality from chart overview
    const qualityBalance = chart.overview.qualityBalance;
    const dominantModality = (['cardinal', 'fixed', 'mutable'] as const)
        .reduce((a, b) => qualityBalance[a] > qualityBalance[b] ? a : b);

    return {
        placements: chart.planets.map(p => ({
            planet: p.id,
            sign: p.sign,
            house: p.house,
            degree: p.degree,
        })),
        dominantElement: dominantElement.charAt(0).toUpperCase() + dominantElement.slice(1),
        dominantModality: dominantModality.charAt(0).toUpperCase() + dominantModality.slice(1),
    };
}

export default function ChiemTinhNarrativePane({ chart }: ChiemTinhNarrativePaneProps) {
    const [activeArea, setActiveArea] = useState<LifeAreaType>('personality');

    const result: NarrativeResult = useMemo(() => {
        const summary = toChartSummary(chart);
        return generateFullNarrative('chiemtinh', summary);
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
            <div className="flex items-center gap-2 mb-4">
                <span className="material-icons-round text-gold dark:text-gold-dark text-xl">auto_awesome</span>
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
                    id={`ct-narrative-${activeNarrative.area}`}
                />
            )}

            <DecorativeDivider />

            {/* Yearly Outlook */}
            <YearlyOutlookCard outlook={result.yearlyOutlook} />

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
