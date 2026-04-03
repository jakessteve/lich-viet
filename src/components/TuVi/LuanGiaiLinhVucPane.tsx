import React, { useState, useMemo, useCallback } from 'react';
import type { TuViChartData } from '../../services/tuvi/tuviTypes';
import type { LifeAreaType, NarrativeResult } from '../../services/interpretation/types';
import { LIFE_AREA_ORDER } from '../../services/interpretation/types';
import { generateFullNarrative } from '../../services/interpretation/synthesisEngine';
import { useUserTier } from '../../hooks/useUserTier';
import { BlurredPreview } from '../shared/BlurredPreview';
import SectionNav from '../shared/SectionNav';
import NarrativeSection from '../shared/NarrativeSection';
import CollapsibleCard from '../CollapsibleCard';

interface LuanGiaiLinhVucPaneProps {
    readonly chart: TuViChartData;
}

export default function LuanGiaiLinhVucPane({ chart }: LuanGiaiLinhVucPaneProps) {
    const { tier, hasAccess } = useUserTier();
    const [activeArea, setActiveArea] = useState<LifeAreaType>('personality');

    // Generate narrative result
    const narrativeResult: NarrativeResult = useMemo(() => {
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

    const handleAreaClick = useCallback((area: LifeAreaType) => {
        setActiveArea(area);
    }, []);

    const activeNarrative = useMemo(() => {
        return narrativeResult.lifeAreas.find(n => n.area === activeArea) || narrativeResult.lifeAreas[0];
    }, [narrativeResult.lifeAreas, activeArea]);

    // Determine which life areas are accessible
    const isLifeAreaLocked = (area: LifeAreaType): boolean => {
        if (hasAccess('premium')) return false; // All tabs for partial+
        if (hasAccess('free') && (area === 'personality' || area === 'career')) return false; // Free: Tính Cách + Sự Nghiệp
        if (tier === 'guest' && area === 'personality') return false; // Guest: Tính Cách preview
        return true;
    };

    return (
        <CollapsibleCard
            title="Luận Giải Các Lĩnh Vực"
            icon="auto_awesome_mosaic"
            defaultOpen={true}
        >
            <div className="p-4 sm:p-6">
                <SectionNav
                    areas={LIFE_AREA_ORDER}
                    activeArea={activeArea}
                    onAreaClick={(area) => {
                        if (!isLifeAreaLocked(area)) {
                            handleAreaClick(area);
                        }
                    }}
                    lockedAreas={LIFE_AREA_ORDER.filter(isLifeAreaLocked)}
                />

                {isLifeAreaLocked(activeArea) ? (
                    <BlurredPreview
                        maxHeight={100}
                        ctaOverlay={
                            tier === 'guest' ? (
                                <div className="text-center">
                                    <p className="text-sm font-semibold mb-2">🔒 Đăng ký để đọc luận giải chi tiết</p>
                                    <a href="/app/dang-ky" className="btn-primary text-xs px-4 py-1.5 inline-block">Đăng Ký Miễn Phí</a>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <p className="text-sm font-semibold mb-2">⭐ Nâng cấp Premium để mở khóa</p>
                                    <a href="/app/cai-dat" className="btn-primary text-xs px-4 py-1.5 inline-block">Xem gói Premium</a>
                                </div>
                            )
                        }
                    >
                        {/* Show placeholder text as blurred preview */}
                        <div className="text-sm text-text-primary-light/90 dark:text-text-primary-dark/90 leading-relaxed">
                            <p>Luận giải chi tiết về lĩnh vực này dựa trên phân tích toàn diện lá số Tử Vi của bạn, bao gồm vị trí các sao chính, phụ tinh, và tương tác giữa các cung trong tam hợp...</p>
                            <p className="mt-2">Phân tích bao gồm ảnh hưởng của Tứ Hóa, các cách cục liên quan, và dự báo xu hướng phát triển trong tương lai gần...</p>
                        </div>
                    </BlurredPreview>
                ) : (
                    activeNarrative && (
                        <div className="mt-6">
                            <NarrativeSection
                                narrative={activeNarrative}
                                id={`narrative-${activeNarrative.area}`}
                            />
                        </div>
                    )
                )}
            </div>
        </CollapsibleCard>
    );
}
