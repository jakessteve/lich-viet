/**
 * TongQuanLaSo — Unified Hook Section (② in freemium layout)
 *
 * Merges content from NarrativePane, InterpretationPane, and OverallAssessmentPane
 * into a single, always-visible section that serves as the freemium hook.
 *
 * Sub-blocks:
 *   A. Archetype Card — personality badge + traits + share
 *   B. Scorecard — Phú/Quý/Thọ bars + Strengths/Weaknesses
 *   C. Patterns — Cách Cục badges + Notable Features + Tứ Hóa
 *   D. Star Map — 4×3 star distribution grid
 *   E. Life Areas — Tab-switched narratives (gated per tier)
 *   F. Advice — Milestones + Lời Khuyên Cải Vận
 */
import React, { useMemo, useState, useCallback } from 'react';
import type { TuViChartData } from '../../services/tuvi/tuviTypes';
import type { LifeAreaType, NarrativeResult } from '../../services/interpretation/types';
import { LIFE_AREA_ORDER } from '../../services/interpretation/types';
import { generateFullNarrative } from '../../services/interpretation/synthesisEngine';
import { detectPatterns } from '../../services/tuvi/patternEngine';
import {
    getTuHoaMap,
    getNotableFeatures,
    getStarDistribution,
    getOverallChartAssessment,
} from '../../services/tuvi/chartAnalysis';
import { useUserTier } from '../../hooks/useUserTier';
import { BlurredPreview } from '../shared/BlurredPreview';
import SectionNav from '../shared/SectionNav';
import NarrativeSection from '../shared/NarrativeSection';
import DecorativeDivider from '../shared/DecorativeDivider';
import { downloadPdf } from '../../services/pdf/pdfGenerator';
import '../../styles/interpretation.css';
import '../../styles/freemium.css';

interface TongQuanLaSoProps {
    readonly chart: TuViChartData;
}

// ═══════════════════════════════════════════════════════════
// Sub-component: Rating Bar (from OverallAssessmentPane)
// ═══════════════════════════════════════════════════════════
function RatingBar({ label, value, icon }: { label: string; value: number; icon: string }) {
    const colorClass =
        value >= 4 ? 'bg-green-500 dark:bg-green-400'
            : value >= 3 ? 'bg-emerald-500 dark:bg-emerald-400'
                : value >= 2 ? 'bg-amber-500 dark:bg-amber-400'
                    : 'bg-red-500 dark:bg-red-400';

    const ratingText =
        value >= 5 ? 'Tốt' : value >= 4 ? 'Khá Tốt' : value >= 3 ? 'Trung Bình' : value >= 2 ? 'Khá Xấu' : 'Xấu';

    const badgeClass =
        value >= 4 ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400'
            : value >= 3 ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400'
                : value >= 2 ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400'
                    : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400';

    return (
        <div className="flex items-center gap-2">
            <span className="text-base shrink-0" aria-hidden="true">{icon}</span>
            <span className="text-base font-bold text-text-primary-light dark:text-text-primary-dark w-8 shrink-0">{label}</span>
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
                    style={{ width: `${(value / 5) * 100}%` }}
                />
            </div>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap ${badgeClass}`}>
                {ratingText}
            </span>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════
export default function TongQuanLaSo({ chart }: TongQuanLaSoProps) {
    const { tier, hasAccess } = useUserTier();
    const [activeArea, setActiveArea] = useState<LifeAreaType>('personality');
    const [pdfMenuOpen, setPdfMenuOpen] = useState(false);

    // ── Data from NarrativePane ────────────────────────────
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

    // ── Data from InterpretationPane ───────────────────────
    const patterns = useMemo(() => detectPatterns(chart), [chart]);
    const tuHoaMap = useMemo(() => getTuHoaMap(chart), [chart]);
    const features = useMemo(() => getNotableFeatures(chart), [chart]);
    const starDistribution = useMemo(() => getStarDistribution(chart), [chart]);

    // ── Data from OverallAssessmentPane ────────────────────
    const assessment = useMemo(() => getOverallChartAssessment(chart), [chart]);

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

    const handlePdfDownload = async (pdfTier: 'medium' | 'full') => {
        setPdfMenuOpen(false);
        await downloadPdf(narrativeResult, 'tuvi', pdfTier);
    };


    return (
        <div className="tong-quan-la-so card-surface" id="tong-quan-la-so">
            {/* ═══ Title Bar with PDF Button ═══ */}
            <div className="tong-quan-la-so__header">
                <div className="flex items-center gap-2">
                    <span className="material-icons-round text-accent-start text-xl">auto_awesome</span>
                    <h2 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
                        Tổng Quan Lá Số
                    </h2>
                </div>
            </div>

            <div className="p-4 sm:p-6 space-y-5">

                {/* ═══ B. Phú / Quý / Thọ Scorecard ═══ */}
                <section>
                    <h3 className="text-sm font-bold text-gold dark:text-gold-dark mb-3">
                        Đánh Giá Phú – Quý – Thọ
                    </h3>
                    <div className="space-y-2.5">
                        <RatingBar label="Phú" value={assessment.phuRating} icon="💰" />
                        <RatingBar label="Quý" value={assessment.quyRating} icon="👑" />
                        <RatingBar label="Thọ" value={assessment.thoRating} icon="🏥" />
                    </div>

                    {/* Strengths / Weaknesses bullets — fully visible */}
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-xs font-bold text-green-600 dark:text-green-400 mb-1.5">💪 Điểm Mạnh</h4>
                            {assessment.strengths.slice(0, 3).map((s, i) => (
                                <div key={i} className="text-xs text-text-primary-light/90 dark:text-text-primary-dark/90 pl-2 border-l-2 border-green-400/40 mb-1 leading-relaxed">
                                    {s}
                                </div>
                            ))}
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1.5">⚠️ Điểm Yếu</h4>
                            {assessment.weaknesses.slice(0, 3).map((w, i) => (
                                <div key={i} className="text-xs text-text-primary-light/90 dark:text-text-primary-dark/90 pl-2 border-l-2 border-amber-400/40 mb-1 leading-relaxed">
                                    {w}
                                </div>
                            ))}
                        </div>
                    </div>

                </section>

                <DecorativeDivider />

                {/* ═══ C. Cách Cục & Notable Features ═══ */}
                <section>
                    <h3 className="text-sm font-bold text-gold dark:text-gold-dark mb-3">
                        Cách Cục & Đặc Điểm Nổi Bật
                    </h3>

                    {/* Patterns — guests see top 2 only */}
                    {patterns.length > 0 && (
                        <div className="space-y-2 mb-4">
                            {(tier === 'guest' ? patterns.slice(0, 2) : patterns).map((p) => (
                                <div
                                    key={p.id}
                                    className={`p-3 rounded-lg border text-sm ${p.isPure ? 'border-green-200 dark:border-green-900 bg-green-50/30 dark:bg-green-900/10' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30'}`}
                                >
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                        <h4 className="font-bold text-sm text-text-primary-light dark:text-text-primary-dark">{p.name}</h4>
                                        {p.isPure ? (
                                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 font-semibold">Thượng Cách</span>
                                        ) : (
                                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400">Bị Phá</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">{p.description}</p>
                                </div>
                            ))}
                            {tier === 'guest' && patterns.length > 2 && (
                                <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark italic opacity-70">
                                    Đăng ký để xem thêm {patterns.length - 2} cách cục...
                                </div>
                            )}
                        </div>
                    )}

                    {/* Notable Features */}
                    {features.length > 0 && (
                        <div className="space-y-2 mb-4">
                            {features.map((f, idx) => (
                                <div
                                    key={`feature-${idx}`}
                                    className={`p-3 rounded-lg border text-sm ${f.severity === 'warning'
                                        ? 'border-amber-200 dark:border-amber-900/50 bg-amber-50/30 dark:bg-amber-900/10'
                                        : f.severity === 'positive'
                                            ? 'border-green-200 dark:border-green-900 bg-green-50/30 dark:bg-green-900/10'
                                            : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30'
                                        }`}
                                >
                                    <div className="font-bold text-text-primary-light dark:text-text-primary-dark flex items-center gap-1.5 mb-1">
                                        <span>{f.icon}</span> {f.title}
                                    </div>
                                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                                        {f.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Tứ Hóa Distribution */}
                    {tuHoaMap.length > 0 && (
                        <div className="space-y-1.5">
                            <h4 className="text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark mb-1">Tứ Hóa Phân Bố</h4>
                            {tuHoaMap.map((entry, idx) => (
                                <div key={`${entry.starName}-${entry.mutagenKey}-${idx}`} className="flex items-center gap-2 text-sm">
                                    <span className={`${entry.mutagenCssClass} font-bold text-xs min-w-[52px]`}>{entry.mutagenLabel}</span>
                                    <span className="text-text-primary-light dark:text-text-primary-dark font-medium">{entry.starName}</span>
                                    <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs">→ {entry.palaceName}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <DecorativeDivider />

                {/* ═══ D. Star Distribution Grid ═══ */}
                <section>
                    <h3 className="text-sm font-bold text-gold dark:text-gold-dark mb-3">
                        Phân Bố Chính Tinh
                    </h3>
                    <p className="text-sm text-text-primary-light/90 dark:text-text-primary-dark/90 leading-relaxed mb-3">
                        {starDistribution.interpretation}
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 text-xs">
                        {starDistribution.entries.map((e) => (
                            <div
                                key={e.palaceName}
                                className={`p-2 rounded-lg text-center border ${e.isCungCuong
                                    ? 'border-gold/40 dark:border-gold-dark/40 bg-gold/8 dark:bg-gold-dark/8'
                                    : e.majorStarCount === 0
                                        ? 'border-red-200/30 dark:border-red-800/30 bg-red-50/20 dark:bg-red-900/10'
                                        : 'border-border-light/20 dark:border-border-dark/20 bg-surface-light/30 dark:bg-surface-dark/30'
                                    }`}
                            >
                                <div className="font-semibold text-text-primary-light dark:text-text-primary-dark truncate">
                                    {e.palaceName.replace(/\s*\(.*\)/, '')}
                                </div>
                                {e.isCungCuong && (
                                    <span className="text-[10px] px-1 rounded bg-gold/20 dark:bg-gold-dark/20 text-gold dark:text-gold-dark font-bold">CƯỜNG</span>
                                )}
                                <div className="text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
                                    {e.majorStarCount > 0
                                        ? e.majorStarNames.map((n, i) => (
                                            <span key={i} className="block leading-tight">{n}</span>
                                        ))
                                        : <span className="italic opacity-60">Trống</span>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <DecorativeDivider />

                {/* ═══ E. Life Area Tabs ═══ */}
                <section>
                    <h3 className="text-sm font-bold text-gold dark:text-gold-dark mb-3">
                        Luận Giải Các Lĩnh Vực
                    </h3>
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
                            <NarrativeSection
                                narrative={activeNarrative}
                                id={`narrative-${activeNarrative.area}`}
                            />
                        )
                    )}
                </section>

                <DecorativeDivider />

                {/* ═══ F. Advice & Milestones ═══ */}
                <section>
                    {/* Milestones — visible to free+ */}
                    {hasAccess('free') && (
                        <>
                            <h3 className="text-sm font-bold text-gold dark:text-gold-dark mb-2">
                                🎯 Các Mốc Quan Trọng
                            </h3>
                            <div className="space-y-1.5 mb-4">
                                {assessment.milestones.slice(0, hasAccess('premium') ? undefined : 2).map((m, i) => (
                                    <div key={i} className="text-sm text-text-primary-light/90 dark:text-text-primary-dark/90 pl-2.5 border-l-2 border-indigo-400/40 dark:border-indigo-500/40 leading-relaxed">
                                        {m}
                                    </div>
                                ))}
                                {!hasAccess('premium') && assessment.milestones.length > 2 && (
                                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark italic pl-2.5">
                                        ⭐ Nâng cấp Premium để xem tất cả {assessment.milestones.length} mốc quan trọng
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                    {/* Advice — visible to free+ (limited for free) */}
                    {hasAccess('free') && (
                        <>
                            <h3 className="text-sm font-bold text-gold dark:text-gold-dark mb-2">
                                🧭 Lời Khuyên Cải Vận
                            </h3>
                            <div className="space-y-2">
                                {assessment.advice.slice(0, hasAccess('premium') ? undefined : 2).map((a, i) => (
                                    <div key={i} className="p-2.5 rounded-lg text-sm text-text-primary-light/90 dark:text-text-primary-dark/90 leading-relaxed bg-surface-light/50 dark:bg-surface-dark/50 border border-border-light/10 dark:border-border-dark/10">
                                        {a}
                                    </div>
                                ))}
                                {!hasAccess('premium') && assessment.advice.length > 2 && (
                                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark italic">
                                        ⭐ Nâng cấp Premium để xem toàn bộ {assessment.advice.length} lời khuyên cải vận
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                    {/* Guest: show CTA instead of advice */}
                    {tier === 'guest' && (
                        <div className="text-center py-4">
                            <p className="text-base text-text-secondary-light dark:text-text-secondary-dark mb-2">
                                🔒 Đăng ký miễn phí để xem lời khuyên cải vận
                            </p>
                            <a href="/app/dang-ky" className="btn-primary text-xs px-4 py-1.5 inline-block">Đăng Ký Ngay</a>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
