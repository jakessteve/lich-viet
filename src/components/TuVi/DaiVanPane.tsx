/**
 * DaiVanPane — Đại Vận 10-Year Major Period Analysis (Enhanced)
 *
 * Rich multi-section layout for each decadal period:
 * §1 Chính Tinh (major stars with brightness)
 * §2 Tứ Hóa Phi Tinh (destination tracking cards)
 * §3 Phụ Tinh (auspicious/malefic categorization)
 * §4 Tam Hợp & Đối Cung
 * §5 Ngũ Hành & Tràng Sinh
 * §6 Tuần/Triệt warning
 * §7 Multi-Domain life analysis mini-cards
 * §8 Tổng Hợp (score, trend, synthesis)
 */

import React, { useMemo, useState } from 'react';
import type { TuViChartData, ChartInput } from '../../services/tuvi/tuviTypes';
import { getDaiVanAnalysis, type DaiVanPeriod, type DomainAnalysis, type TuHoaDestination } from '../../services/tuvi/daiVanAnalysis';
import CollapsibleCard from '../CollapsibleCard';

interface DaiVanPaneProps {
    readonly chart: TuViChartData;
    readonly input: ChartInput;
}

/** Quality badge config */
const QUALITY_CONFIG: Record<DaiVanPeriod['quality'], { label: string; className: string }> = {
    favorable: { label: 'Thuận lợi', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
    mixed: { label: 'Hỗn hợp', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
    challenging: { label: 'Cần cẩn trọng', className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
    neutral: { label: 'Bình hòa', className: 'bg-slate-100 text-slate-600 dark:bg-slate-800/50 dark:text-slate-400' },
};

/** Tứ Hóa card color config */
const TU_HOA_CARD_CONFIG: Record<string, { bg: string; border: string; icon: string }> = {
    'Lộc': { bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800/50', icon: '💰' },
    'Quyền': { bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800/50', icon: '👑' },
    'Khoa': { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800/50', icon: '📜' },
    'Kỵ': { bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800/50', icon: '⚠️' },
};

/** Domain assessment badges */
const DOMAIN_ASSESSMENT_CONFIG: Record<DomainAnalysis['assessment'], { className: string }> = {
    favorable: { className: 'text-emerald-600 dark:text-emerald-400' },
    mixed: { className: 'text-amber-600 dark:text-amber-400' },
    challenging: { className: 'text-red-600 dark:text-red-400' },
    neutral: { className: 'text-slate-500 dark:text-slate-400' },
};

/** Trend arrow display */
function TrendArrow({ trend }: { trend: DaiVanPeriod['trend'] }) {
    if (!trend) return null;
    if (trend === 'ascending') return <span className="text-emerald-600 dark:text-emerald-400" title="Xu hướng tăng">▲</span>;
    if (trend === 'descending') return <span className="text-red-500 dark:text-red-400" title="Xu hướng giảm">▼</span>;
    return <span className="text-slate-400 dark:text-slate-500" title="Ổn định">━</span>;
}

/** Score bar component */
function ScoreBar({ score }: { score: number }) {
    const getColor = () => {
        if (score >= 70) return 'bg-emerald-500';
        if (score >= 50) return 'bg-amber-500';
        if (score >= 30) return 'bg-orange-500';
        return 'bg-red-500';
    };
    return (
        <div className="flex items-center gap-2 w-full">
            <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${getColor()}`} style={{ width: `${score}%` }} />
            </div>
            <span className="text-xs font-bold tabular-nums text-text-primary-light dark:text-text-primary-dark min-w-[36px] text-right">{score}/100</span>
        </div>
    );
}

/** Section header component */
function SectionHeader({ icon, title }: { icon: string; title: string }) {
    return (
        <h4 className="flex items-center gap-1.5 text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-2">
            <span>{icon}</span> {title}
        </h4>
    );
}

/** Tứ Hóa destination card */
function TuHoaCard({ dest }: { dest: TuHoaDestination }) {
    const config = TU_HOA_CARD_CONFIG[dest.type] ?? TU_HOA_CARD_CONFIG['Kỵ'];
    return (
        <div className={`rounded-lg border p-2.5 ${config.bg} ${config.border}`}>
            <div className="flex items-center gap-1.5 mb-1">
                <span className="text-sm">{config.icon}</span>
                <span className="text-xs font-bold text-text-primary-light dark:text-text-primary-dark">
                    Hóa {dest.type}
                </span>
            </div>
            <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                {dest.starName} → <span className="font-medium text-text-primary-light dark:text-text-primary-dark">{dest.destinationPalace}</span>
            </div>
            {dest.interpretation && (
                <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark mt-1 leading-relaxed">
                    {dest.interpretation}
                </p>
            )}
        </div>
    );
}

/** Domain mini-card */
function DomainCard({ domain }: { domain: DomainAnalysis }) {
    const assessCfg = DOMAIN_ASSESSMENT_CONFIG[domain.assessment];
    return (
        <div className="rounded-lg border border-border-light/40 dark:border-border-dark/40 p-2.5 bg-surface-subtle-light/50 dark:bg-surface-subtle-dark/50">
            <div className="flex items-center gap-1.5 mb-1">
                <span className="text-sm">{domain.icon}</span>
                <span className="text-xs font-bold text-text-primary-light dark:text-text-primary-dark">{domain.label}</span>
                <span className={`text-[10px] font-semibold ml-auto ${assessCfg.className}`}>
                    {domain.assessment === 'favorable' ? '★' : domain.assessment === 'challenging' ? '✗' : '●'}
                </span>
            </div>
            <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark leading-relaxed line-clamp-3">
                {domain.summary}
            </p>
        </div>
    );
}

export default function DaiVanPane({ chart, input }: DaiVanPaneProps) {
    const birthYear = useMemo(() => {
        const dateStr = input.solarDate || chart.solarDate || '';
        const parts = dateStr.split('-');
        return parts.length >= 1 ? parseInt(parts[0], 10) : undefined;
    }, [input.solarDate, chart.solarDate]);

    const analysis = useMemo(
        () => getDaiVanAnalysis(chart, birthYear),
        [chart, birthYear]
    );

    const [expandedIdx, setExpandedIdx] = useState<number | null>(
        analysis?.currentPeriodIndex ?? null
    );

    if (!analysis || analysis.periods.length === 0) return null;

    const togglePeriod = (idx: number) => {
        setExpandedIdx(prev => prev === idx ? null : idx);
    };

    return (
        <CollapsibleCard
            title="Đại Vận 10 Năm"
            defaultOpen={false}
        >
            {/* Overall assessment */}
            <div className="mb-4 p-3 rounded-xl bg-surface-subtle-light dark:bg-surface-subtle-dark border border-border-light/50 dark:border-border-dark/50">
                <p className="text-sm text-text-primary-light dark:text-text-primary-dark leading-relaxed">
                    {analysis.overallAssessment}
                </p>
                {analysis.currentAge > 0 && (
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                        Tuổi hiện tại (âm lịch): <strong>{analysis.currentAge}</strong>
                    </p>
                )}
            </div>

            {/* Period list */}
            <div className="space-y-2">
                {analysis.periods.map((period, idx) => {
                    const isActive = idx === analysis.currentPeriodIndex;
                    const isExpanded = expandedIdx === idx;
                    const qualityConfig = QUALITY_CONFIG[period.quality];

                    return (
                        <div
                            key={`${period.palaceName}-${period.ageRange[0]}`}
                            className={`rounded-xl border transition-all duration-200 ${isActive
                                ? 'border-gold dark:border-gold-dark ring-1 ring-gold/20 dark:ring-gold-dark/20'
                                : 'border-border-light/50 dark:border-border-dark/50'
                                }`}
                        >
                            {/* Period header — clickable */}
                            <button
                                type="button"
                                onClick={() => togglePeriod(idx)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors rounded-xl cursor-pointer ${isExpanded
                                    ? 'bg-surface-subtle-light dark:bg-surface-subtle-dark'
                                    : 'hover:bg-surface-subtle-light/50 dark:hover:bg-surface-subtle-dark/50'
                                    }`}
                            >
                                {/* Age range */}
                                <div className={`text-xs font-bold tabular-nums whitespace-nowrap px-2 py-1 rounded-lg ${isActive
                                    ? 'bg-gold/15 text-gold dark:bg-gold-dark/15 dark:text-gold-dark'
                                    : 'bg-surface-subtle-light dark:bg-surface-subtle-dark text-text-secondary-light dark:text-text-secondary-dark'
                                    }`}>
                                    {period.ageRange[0]}–{period.ageRange[1]}
                                </div>

                                {/* Palace name + stem + score */}
                                <div className="flex-1 min-w-0">
                                    <span className="font-semibold text-sm text-text-primary-light dark:text-text-primary-dark">
                                        {period.palaceName}
                                    </span>
                                    {period.heavenlyStem && (
                                        <span className="ml-1.5 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                                            ({period.heavenlyStem} {period.earthlyBranch})
                                        </span>
                                    )}
                                    <span className="ml-1.5 text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark">
                                        {period.score}pt <TrendArrow trend={period.trend} />
                                    </span>
                                </div>

                                {/* Quality badge */}
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${qualityConfig.className}`}>
                                    {qualityConfig.label}
                                </span>

                                {/* Current badge */}
                                {isActive && (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold text-white dark:bg-gold-dark whitespace-nowrap">
                                        Hiện tại
                                    </span>
                                )}

                                {/* Chevron */}
                                <span className={`material-icons-round text-base text-text-secondary-light dark:text-text-secondary-dark transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                                    expand_more
                                </span>
                            </button>

                            {/* Expanded content — multi-section layout */}
                            {isExpanded && (
                                <div className="px-4 pb-4 space-y-4">

                                    {/* §1 Chính Tinh */}
                                    {period.majorStars.length > 0 ? (
                                        <div>
                                            <SectionHeader icon="⭐" title="Chính Tinh" />
                                            <div className="flex flex-wrap items-center gap-1.5">
                                                {period.brightnessDetail.split(', ').map((s, si) => (
                                                    <span key={si} className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <SectionHeader icon="⭐" title="Chính Tinh" />
                                            <p className="text-xs text-amber-600 dark:text-amber-400 italic">
                                                Vô chính diệu — cần mượn sao đối cung để luận.
                                            </p>
                                        </div>
                                    )}

                                    {/* §2 Tứ Hóa Phi Tinh */}
                                    {period.tuHoaDestinations.length > 0 && (
                                        <div>
                                            <SectionHeader icon="🔄" title={`Tứ Hóa Phi Tinh (Can ${period.heavenlyStem})`} />
                                            <div className="grid grid-cols-2 gap-2">
                                                {period.tuHoaDestinations.map((dest, di) => (
                                                    <TuHoaCard key={di} dest={dest} />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* §3 Phụ Tinh */}
                                    {period.minorStarSummary && (
                                        <div>
                                            <SectionHeader icon="✨" title="Phụ Tinh" />
                                            <div className="flex flex-wrap gap-1.5">
                                                {period.minorStarSummary.split(' | ').map((group, gi) => {
                                                    const isCat = group.startsWith('Cát:');
                                                    const isSat = group.startsWith('Sát:');
                                                    return (
                                                        <span key={gi} className={`text-xs font-medium px-2 py-0.5 rounded-full ${isCat ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                                                            : isSat ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                                                                : 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
                                                            }`}>
                                                            {group}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* §4 Tam Hợp & Đối Cung */}
                                    {(period.tamHopAnalysis || period.doiCungAnalysis) && (
                                        <div>
                                            <SectionHeader icon="🔺" title="Tam Hợp & Đối Cung" />
                                            <div className="space-y-1.5">
                                                {period.tamHopAnalysis && (
                                                    <p className="text-xs text-text-primary-light dark:text-text-primary-dark leading-relaxed">
                                                        {period.tamHopAnalysis}
                                                    </p>
                                                )}
                                                {period.doiCungAnalysis && (
                                                    <p className="text-xs text-text-primary-light dark:text-text-primary-dark leading-relaxed">
                                                        {period.doiCungAnalysis}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* §5 Ngũ Hành & Tràng Sinh */}
                                    {(period.nguHanhAnalysis || period.trangSinhStage) && (
                                        <div>
                                            <SectionHeader icon="🌀" title="Ngũ Hành & Tràng Sinh" />
                                            <div className="space-y-1.5">
                                                {period.nguHanhAnalysis && (
                                                    <p className="text-xs text-text-primary-light dark:text-text-primary-dark leading-relaxed">
                                                        {period.nguHanhAnalysis}
                                                    </p>
                                                )}
                                                {period.trangSinhStage && (
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${period.trangSinhQuality === 'strong'
                                                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                            : period.trangSinhQuality === 'weak'
                                                                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800/50 dark:text-slate-400'
                                                            }`}>
                                                            {period.trangSinhStage}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* §6 Tuần/Triệt */}
                                    {period.tuanTrietNote && (
                                        <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50/80 dark:bg-amber-900/20 p-3">
                                            <SectionHeader icon="🚫" title="Tuần/Triệt Không" />
                                            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                                                {period.tuanTrietNote}
                                            </p>
                                        </div>
                                    )}

                                    {/* §7 Multi-Domain Life Analysis */}
                                    {period.domainAnalyses.length > 0 && (
                                        <div>
                                            <SectionHeader icon="📊" title="Luận Theo Lĩnh Vực" />
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                {period.domainAnalyses.map((domain, di) => (
                                                    <DomainCard key={di} domain={domain} />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* §8 Tổng Hợp & Xu Hướng */}
                                    <div className="border-t border-border-light/30 dark:border-border-dark/30 pt-3">
                                        <SectionHeader icon="📈" title="Tổng Hợp" />
                                        <div className="space-y-2">
                                            <ScoreBar score={period.score} />
                                            {period.trend && (
                                                <div className="flex items-center gap-1.5 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                                                    <span>So với kỳ trước:</span>
                                                    <TrendArrow trend={period.trend} />
                                                    <span>
                                                        {period.trend === 'ascending' ? 'Xu hướng tăng'
                                                            : period.trend === 'descending' ? 'Xu hướng giảm'
                                                                : 'Ổn định'}
                                                    </span>
                                                </div>
                                            )}
                                            <p className="text-sm text-text-primary-light dark:text-text-primary-dark leading-relaxed">
                                                {period.synthesis}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </CollapsibleCard>
    );
}
