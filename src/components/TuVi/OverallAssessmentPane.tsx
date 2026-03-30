import React, { useMemo } from 'react';
import type { TuViChartData } from '../../services/tuvi/tuviTypes';
import { getOverallChartAssessment } from '../../services/tuvi/chartAnalysis';
import CollapsibleCard from '../CollapsibleCard';

interface OverallAssessmentPaneProps {
    readonly chart: TuViChartData;
}

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
            <span className="text-xs font-bold text-text-primary-light dark:text-text-primary-dark w-8 shrink-0">{label}</span>
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

export default function OverallAssessmentPane({ chart }: OverallAssessmentPaneProps) {
    const assessment = useMemo(() => getOverallChartAssessment(chart), [chart]);

    return (
        <CollapsibleCard
            title="Tổng Hợp Đánh Giá"
            defaultOpen={false}
        >
            <div className="p-4 space-y-5">

                {/* ═══ Phú – Quý – Thọ Ratings ═══ */}
                <section>
                    <h3 className="text-sm font-bold text-gold dark:text-gold-dark mb-3">
                        Đánh Giá Phú – Quý – Thọ
                    </h3>
                    <div className="space-y-2.5">
                        <RatingBar label="Phú" value={assessment.phuRating} icon="💰" />
                        <RatingBar label="Quý" value={assessment.quyRating} icon="👑" />
                        <RatingBar label="Thọ" value={assessment.thoRating} icon="🏥" />
                    </div>
                </section>

                <hr className="border-border-light/30 dark:border-border-dark/30" />

                {/* ═══ Strengths ═══ */}
                <section>
                    <h3 className="text-sm font-bold text-gold dark:text-gold-dark mb-2">
                        💪 Điểm Mạnh
                    </h3>
                    <div className="space-y-1.5">
                        {assessment.strengths.map((s, i) => (
                            <div
                                key={i}
                                className="text-sm text-text-primary-light/90 dark:text-text-primary-dark/90 pl-2.5 border-l-2 border-green-400/40 dark:border-green-500/40 leading-relaxed"
                            >
                                {s}
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══ Weaknesses ═══ */}
                <section>
                    <h3 className="text-sm font-bold text-gold dark:text-gold-dark mb-2">
                        ⚠️ Điểm Yếu
                    </h3>
                    <div className="space-y-1.5">
                        {assessment.weaknesses.map((w, i) => (
                            <div
                                key={i}
                                className="text-sm text-text-primary-light/90 dark:text-text-primary-dark/90 pl-2.5 border-l-2 border-amber-400/40 dark:border-amber-500/40 leading-relaxed"
                            >
                                {w}
                            </div>
                        ))}
                    </div>
                </section>

                <hr className="border-border-light/30 dark:border-border-dark/30" />

                {/* ═══ Key Milestones ═══ */}
                <section>
                    <h3 className="text-sm font-bold text-gold dark:text-gold-dark mb-2">
                        🎯 Các Mốc Quan Trọng
                    </h3>
                    <div className="space-y-1.5">
                        {assessment.milestones.map((m, i) => (
                            <div
                                key={i}
                                className="text-sm text-text-primary-light/90 dark:text-text-primary-dark/90 pl-2.5 border-l-2 border-indigo-400/40 dark:border-indigo-500/40 leading-relaxed"
                            >
                                {m}
                            </div>
                        ))}
                    </div>
                </section>

                <hr className="border-border-light/30 dark:border-border-dark/30" />

                {/* ═══ Advice ═══ */}
                <section>
                    <h3 className="text-sm font-bold text-gold dark:text-gold-dark mb-2">
                        🧭 Lời Khuyên Cải Vận
                    </h3>
                    <div className="space-y-2">
                        {assessment.advice.map((a, i) => (
                            <div
                                key={i}
                                className="p-2.5 rounded-lg text-sm text-text-primary-light/90 dark:text-text-primary-dark/90 leading-relaxed bg-surface-light/50 dark:bg-surface-dark/50 border border-border-light/10 dark:border-border-dark/10"
                            >
                                {a}
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </CollapsibleCard>
    );
}
