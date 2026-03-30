import React, { useMemo } from 'react';
import type { TuViChartData, TuViPalace } from '../../services/tuvi/tuviTypes';
import { detectPatterns } from '../../services/tuvi/patternEngine';
import {
    getChartOverview,
    getTuHoaMap,
    getMenhThanAnalysis,
    getNotableFeatures,
    getStarDistribution,
} from '../../services/tuvi/chartAnalysis';
import CollapsibleCard from '../CollapsibleCard';

interface InterpretationPaneProps {
    readonly chart: TuViChartData;
    readonly selectedPalace: TuViPalace | null;
}

export default function InterpretationPane({ chart, selectedPalace: _selectedPalace }: InterpretationPaneProps) {
    const patterns = useMemo(() => detectPatterns(chart), [chart]);
    const overview = useMemo(() => getChartOverview(chart), [chart]);
    const tuHoaMap = useMemo(() => getTuHoaMap(chart), [chart]);
    const menhThan = useMemo(() => getMenhThanAnalysis(chart), [chart]);
    const features = useMemo(() => getNotableFeatures(chart), [chart]);
    const starDistribution = useMemo(() => getStarDistribution(chart), [chart]);


    return (
        <CollapsibleCard title="Luận Giải Tổng Quan" defaultOpen={false} collapseOnMobile={true}>
            <div className="p-4 space-y-6">

                {/* ═══ 1. Tổng Quan Lá Số ═══ */}
                <section>
                    <h3 className="text-sm font-bold text-gold dark:text-gold-dark mb-3">
                        Tổng Quan Lá Số
                    </h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <OverviewRow label="Cục" value={overview.cucLabel} />
                        <OverviewRow label="Âm Dương" value={overview.amDuongLy} />
                        <OverviewRow label="Mệnh Chủ" value={overview.soul} />
                        <OverviewRow label="Thân Chủ" value={overview.body} />
                        <OverviewRow label="Thân Cư" value={overview.bodyPalaceName} />
                        <OverviewRow label="Cục – Mệnh" value={overview.cucMenhRelation} />
                    </div>
                </section>

                <hr className="border-border-light/30 dark:border-border-dark/30" />

                {/* ═══ 2. Tứ Hóa Phân Bố ═══ */}
                <section>
                    <h3 className="text-sm font-bold text-gold dark:text-gold-dark mb-3">
                        Tứ Hóa Phân Bố
                    </h3>

                    {tuHoaMap.length > 0 ? (
                        <div className="space-y-2">
                            {tuHoaMap.map((entry, idx) => (
                                <div
                                    key={`${entry.starName}-${entry.mutagenKey}-${idx}`}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <span className={`${entry.mutagenCssClass} font-bold text-xs min-w-[52px]`}>
                                        {entry.mutagenLabel}
                                    </span>
                                    <span className="text-text-primary-light dark:text-text-primary-dark font-medium">
                                        {entry.starName}
                                    </span>
                                    <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                                        → {entry.palaceName}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-sm text-text-secondary-light/60 dark:text-text-secondary-dark/60 italic">
                            Không phát hiện Tứ Hóa trong lá số.
                        </div>
                    )}
                </section>

                <hr className="border-border-light/30 dark:border-border-dark/30" />

                {/* ═══ 3. Mệnh — Thân ═══ */}
                {menhThan && (
                    <>
                        <section>
                            <h3 className="text-sm font-bold text-gold dark:text-gold-dark mb-3">
                                Mệnh — Thân
                            </h3>

                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div className="p-3 rounded-lg border border-gold/30 dark:border-gold-dark/30 bg-gold/5 dark:bg-gold-dark/5">
                                    <div className="text-xs font-semibold text-gold dark:text-gold-dark mb-1">Cung Mệnh</div>
                                    <div className="text-base font-bold text-text-primary-light dark:text-text-primary-dark">{menhThan.menhPalaceName}</div>
                                    <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                                        {menhThan.menhMajorStars.length > 0 ? menhThan.menhMajorStars.join(', ') : 'Vô chính diệu'}
                                    </div>
                                </div>
                                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
                                    <div className="text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark mb-1">Cung Thân</div>
                                    <div className="text-base font-bold text-text-primary-light dark:text-text-primary-dark">{menhThan.thanPalaceName}</div>
                                    <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                                        {menhThan.isSamePalace ? 'Đồng cung với Mệnh' : menhThan.thanMajorStars.length > 0 ? menhThan.thanMajorStars.join(', ') : 'Vô chính diệu'}
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm text-text-primary-light/90 dark:text-text-primary-dark/90 leading-relaxed">
                                {menhThan.interpretation}
                            </p>
                        </section>

                        <hr className="border-border-light/30 dark:border-border-dark/30" />
                    </>
                )}

                {/* ═══ 4. Đặc Điểm Nổi Bật ═══ */}
                {features.length > 0 && (
                    <>
                        <section>
                            <h3 className="text-sm font-bold text-gold dark:text-gold-dark mb-3">
                                Đặc Điểm Nổi Bật
                            </h3>
                            <div className="space-y-2">
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
                        </section>

                        <hr className="border-border-light/30 dark:border-border-dark/30" />
                    </>
                )}

                {/* ═══ 5. Cách Cục Chính ═══ */}
                <section>
                    <h3 className="text-sm font-bold text-gold dark:text-gold-dark mb-3">
                        Cách Cục Chính
                    </h3>

                    {patterns.length > 0 ? (
                        <div className="space-y-3">
                            {patterns.map((p) => (
                                <div
                                    key={p.id}
                                    className={`p-3 rounded-lg border ${p.isPure ? 'border-green-200 dark:border-green-900 bg-green-50/30 dark:bg-green-900/10' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30'}`}
                                >
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                        <h4 className="font-bold text-sm text-text-primary-light dark:text-text-primary-dark">{p.name}</h4>
                                        {p.isPure ? (
                                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 font-semibold">Thượng Cách</span>
                                        ) : (
                                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400">Bị Phá (Có Sát Tinh)</span>
                                        )}
                                    </div>
                                    <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-2">
                                        <span className="opacity-80">Các cung liên quan:</span> {p.relatedPalaces.join(', ')}
                                    </div>
                                    <p className="text-sm text-text-primary-light/90 dark:text-text-primary-dark/90 mt-2 leading-relaxed">
                                        {p.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-sm text-text-secondary-light/60 dark:text-text-secondary-dark/60 italic">
                            Lá số không có các cách cục chính điển hình (hoặc các tinh diệu phân tán bình hòa).
                        </div>
                    )}
                </section>

                <hr className="border-border-light/30 dark:border-border-dark/30" />

                {/* ═══ 6. Phân Bố Chính Tinh ═══ */}
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



            </div>
        </CollapsibleCard>
    );
}

function OverviewRow({ label, value }: { label: string; value: string }) {
    if (!value || value === 'N/A') return null;
    return (
        <div className="flex items-baseline gap-2">
            <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs min-w-[72px]">{label}:</span>
            <span className="text-text-primary-light dark:text-text-primary-dark font-medium text-sm">{value}</span>
        </div>
    );
}
