import React, { useMemo, useState, useCallback } from 'react';
import type { TuViChartData } from '../../services/tuvi/tuviTypes';
import { getDetailedPalaceAnalysis } from '../../services/tuvi/palaceInterpretation';
import type { PalaceAnalysis } from '../../services/tuvi/palaceInterpretation';
import CollapsibleCard from '../CollapsibleCard';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useAppStore } from '../../stores/appStore';
import PremiumPaywallModal from '../shared/PremiumPaywallModal';

interface DetailedInterpretationPaneProps {
    readonly chart: TuViChartData;
}

export default function DetailedInterpretationPane({ chart }: DetailedInterpretationPaneProps) {
    const analyses = useMemo(() => getDetailedPalaceAnalysis(chart), [chart]);
    const [openPalaces, setOpenPalaces] = useState<Set<number>>(new Set([0]));
    const isMobile = useIsMobile();
    const isPremium = useAppStore(state => state.isPremium);

    const togglePalace = useCallback((idx: number) => {
        setOpenPalaces(prev => {
            const next = new Set(prev);
            if (next.has(idx)) next.delete(idx);
            else next.add(idx);
            return next;
        });
    }, []);

    return (
        <CollapsibleCard
            title="Luận Giải Chi Tiết"
            defaultOpen={false}
        >
            {!isPremium ? (
                <div className="relative p-6 overflow-hidden">
                    <PremiumPaywallModal featureName="Luận Giải Mệnh & 12 Cung" />
                    <div className="blur-md select-none opacity-40 pointer-events-none mt-4 space-y-4">
                        <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl w-full"></div>
                        <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl w-full"></div>
                        <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl w-full"></div>
                        <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl w-full"></div>
                        <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl w-full"></div>
                    </div>
                </div>
            ) : (
                <>
                    {/* Badge legend */}
                    <BadgeLegend />

                    {/* Palace accordion list */}
                    <div className="rounded-xl border border-border-light/15 dark:border-border-dark/15 overflow-hidden divide-y divide-border-light/10 dark:divide-border-dark/10">
                        {analyses.map((analysis, idx) => (
                            <PalaceAccordionItem
                                key={analysis.palaceName}
                                analysis={analysis}
                                isOpen={openPalaces.has(idx)}
                                onToggle={() => togglePalace(idx)}
                                isMobile={isMobile}
                            />
                        ))}
                    </div>
                </>
            )}
        </CollapsibleCard>
    );
}

// ═══════════════════════════════════════════════════════════════════
// Badge Legend — Shows what the dot colors mean
// ═══════════════════════════════════════════════════════════════════

function BadgeLegend() {
    return (
        <div className="flex items-center gap-3 mb-3 text-[10px] text-text-secondary-light dark:text-text-secondary-dark">
            <span className="flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold dark:bg-gold-dark" />
                Mệnh
            </span>
            <span className="flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
                Thân
            </span>
            <span className="flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
                VCĐ
            </span>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════
// PalaceAccordionItem — One collapsible row per palace
// ═══════════════════════════════════════════════════════════════════

function PalaceAccordionItem({
    analysis,
    isOpen,
    onToggle,
    isMobile,
}: {
    analysis: PalaceAnalysis;
    isOpen: boolean;
    onToggle: () => void;
    isMobile: boolean;
}) {
    const shortName = analysis.palaceName.split(' (')[0];
    const hasBadge = analysis.isSoulPalace || analysis.isBodyPalace || analysis.hasNoMajorStars;

    return (
        <div className={`transition-colors duration-200 ${isOpen ? 'bg-surface-light/30 dark:bg-surface-dark/20' : ''}`}>
            {/* ── Palace Header ── */}
            <button
                onClick={onToggle}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left cursor-pointer hover:bg-surface-light/50 dark:hover:bg-surface-dark/30 transition-colors duration-150 group"
                aria-expanded={isOpen}
            >
                <span className={`text-base shrink-0 transition-transform duration-300 ${isOpen ? 'scale-110' : 'group-hover:scale-105'}`}>
                    {analysis.icon}
                </span>
                <span className={`font-semibold text-text-primary-light/90 dark:text-text-primary-dark/90 flex-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    {shortName}
                </span>

                {/* Badge dots */}
                {hasBadge && (
                    <span className="flex gap-1 mr-1">
                        {analysis.isSoulPalace && <DotIndicator color="bg-gold dark:bg-gold-dark" title="Mệnh" />}
                        {analysis.isBodyPalace && <DotIndicator color="bg-blue-500 dark:bg-blue-400" title="Thân" />}
                        {analysis.hasNoMajorStars && <DotIndicator color="bg-amber-500 dark:bg-amber-400" title="Vô Chính Diệu" />}
                    </span>
                )}

                <span
                    className={`material-icons-round text-base text-text-secondary-light dark:text-text-secondary-dark transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                >
                    expand_more
                </span>
            </button>

            {/* ── Palace Content (flat, no nested accordions) ── */}
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[8000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-3 pb-4 pt-1">
                    <PalaceFlatContent analysis={analysis} />
                </div>
            </div>
        </div>
    );
}

function DotIndicator({ color, title }: { color: string; title: string }) {
    return (
        <span
            className={`inline-block w-1.5 h-1.5 rounded-full ${color}`}
            title={title}
            aria-label={title}
        />
    );
}

// ═══════════════════════════════════════════════════════════════════
// PalaceFlatContent — All sections rendered flat (no nested collapse)
// ═══════════════════════════════════════════════════════════════════

function PalaceFlatContent({ analysis }: { analysis: PalaceAnalysis }) {
    const sections = useMemo(() => buildSections(analysis), [analysis]);

    return (
        <div className="space-y-4">
            {/* Academic intro */}
            {analysis.academicContext && (
                <div className="p-3 rounded-lg bg-gradient-to-r from-violet-50/60 to-indigo-50/40 dark:from-violet-900/10 dark:to-indigo-900/10 border border-violet-200/30 dark:border-violet-700/20">
                    <div className="flex items-start gap-2">
                        <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark leading-relaxed italic">
                            {analysis.academicContext}
                        </span>
                    </div>
                </div>
            )}

            {/* All sections rendered as flat blocks */}
            {sections.map((section, idx) => (
                <div key={section.title}>
                    {/* Section header */}
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`w-1 h-5 rounded-full shrink-0 ${section.accentColor}`} />
                        <span className="text-base font-bold text-text-primary-light/80 dark:text-text-primary-dark/80 tracking-wide">
                            {section.title}
                        </span>
                    </div>

                    {/* Section content */}
                    <div className="pl-4 text-sm leading-relaxed text-text-primary-light/85 dark:text-text-primary-dark/85">
                        {section.content}
                    </div>

                    {/* Divider between sections (except last) */}
                    {idx < sections.length - 1 && (
                        <div className="mt-4 border-t border-border-light/8 dark:border-border-dark/8" />
                    )}
                </div>
            ))}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════
// Build sections from analysis data
// ═══════════════════════════════════════════════════════════════════

interface SectionData {
    icon: string;
    title: string;
    accentColor: string;
    content: React.ReactNode;
}

function buildSections(analysis: PalaceAnalysis): SectionData[] {
    const sections: SectionData[] = [];

    // §1 Tổng Quan Cung — basic info + overall grade
    sections.push({
        icon: '📋',
        title: 'Tổng Quan Cung',
        accentColor: 'bg-gold/70 dark:bg-gold-dark/70',
        content: (
            <div className="space-y-2">
                {analysis.basicInfo && <Line text={analysis.basicInfo} />}
                {analysis.overallAssessment && (
                    <div className="mt-2 p-2.5 rounded-lg bg-gradient-to-r from-gold/8 to-transparent dark:from-gold-dark/8 border border-gold/15 dark:border-gold-dark/15">
                        <Line text={analysis.overallAssessment} />
                    </div>
                )}
            </div>
        ),
    });

    // §2 Chức Năng Cung
    if (analysis.palaceFunction) {
        sections.push({
            icon: '🏛️',
            title: 'Chức Năng Cung',
            accentColor: 'bg-violet-500/70 dark:bg-violet-400/70',
            content: (
                <div className="space-y-2">
                    <FuncRow label="Sức khỏe" color="rose" text={analysis.palaceFunction.health} />
                    <FuncRow label="Tính cách" color="violet" text={analysis.palaceFunction.personality} />
                    <FuncRow label="Sự nghiệp" color="amber" text={analysis.palaceFunction.career} />
                    <div className="mt-2 p-2.5 rounded-lg bg-surface-light/50 dark:bg-surface-dark/50 border border-border-light/10 dark:border-border-dark/10">
                        <span className="text-xs font-bold text-gold dark:text-gold-dark">Lưu ý: </span>
                        <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark italic">
                            {analysis.palaceFunction.advice}
                        </span>
                    </div>
                </div>
            ),
        });
    }

    // §3 Chính Tinh & Ngũ Hành — includes palace summary + star meanings
    sections.push({
        icon: '⭐',
        title: 'Chính Tinh & Ngũ Hành',
        accentColor: 'bg-yellow-500/70 dark:bg-yellow-400/70',
        content: (
            <div className="space-y-2">
                {analysis.palaceSummary && <Line text={analysis.palaceSummary} />}
                {analysis.starInterpretation.split('\n\n').map((paragraph, idx) => {
                    if (paragraph.startsWith('- **')) {
                        return (
                            <div key={idx} className="pl-2.5 border-l-2 border-gold/30 dark:border-gold-dark/30">
                                <Line text={paragraph} />
                            </div>
                        );
                    }
                    if (paragraph.startsWith('**')) {
                        return (
                            <h4 key={idx} className="text-xs font-bold text-gold dark:text-gold-dark mt-2.5 mb-1">
                                {paragraph.replace(/\*\*/g, '')}
                            </h4>
                        );
                    }
                    return <Line key={idx} text={paragraph} />;
                })}
                {analysis.elementAnalysis && (
                    <div className="mt-2 pl-2.5 border-l-2 border-teal-400/40 dark:border-teal-500/40">
                        <Line text={analysis.elementAnalysis} />
                    </div>
                )}
            </div>
        ),
    });

    // §4 Tổ Hợp Sao
    if (analysis.starCombinations.length > 0) {
        sections.push({
            icon: '🔗',
            title: 'Tổ Hợp Sao',
            accentColor: 'bg-purple-500/70 dark:bg-purple-400/70',
            content: (
                <div className="space-y-2">
                    {analysis.starCombinations.map((combo, idx) => (
                        <div key={idx} className="pl-2.5 border-l-2 border-purple-400/40 dark:border-purple-500/40">
                            <Line text={combo} />
                        </div>
                    ))}
                </div>
            ),
        });
    }

    // §5 Cát Tinh & Hung Tinh
    if (analysis.catHungGroups.catTinh.length > 0 || analysis.catHungGroups.hungSat.length > 0) {
        sections.push({
            icon: '✨',
            title: 'Cát Tinh & Hung Tinh',
            accentColor: 'bg-emerald-500/70 dark:bg-emerald-400/70',
            content: (
                <div className="space-y-2.5">
                    {analysis.catHungGroups.catTinh.length > 0 && (
                        <div>
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Cát Tinh</span>
                            <div className="flex flex-wrap gap-1.5">
                                {analysis.catHungGroups.catTinh.map((s, i) => (
                                    <span key={i} className="text-xs px-2 py-1 rounded-md bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200/40 dark:border-emerald-700/30">{s}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    {analysis.catHungGroups.hungSat.length > 0 && (
                        <div>
                            <span className="text-xs font-bold text-red-600 dark:text-red-400 block mb-1">Hung Tinh</span>
                            <div className="flex flex-wrap gap-1.5">
                                {analysis.catHungGroups.hungSat.map((s, i) => (
                                    <span key={i} className="text-xs px-2 py-1 rounded-md bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200/40 dark:border-red-700/30">{s}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    {analysis.catHungGroups.dacBiet.length > 0 && (
                        <div>
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block mb-1">Đặc biệt</span>
                            <div className="flex flex-wrap gap-1.5">
                                {analysis.catHungGroups.dacBiet.map((s, i) => (
                                    <span key={i} className="text-xs px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200/40 dark:border-blue-700/30">{s}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ),
        });
    }

    // §6 Tứ Hóa Phân Tích
    if (analysis.tuHoaDeepAnalysis.length > 0 || analysis.tuHoaCombinations.length > 0) {
        sections.push({
            icon: '🌀',
            title: 'Tứ Hóa Phân Tích',
            accentColor: 'bg-indigo-500/70 dark:bg-indigo-400/70',
            content: (
                <div className="space-y-2">
                    {analysis.tuHoaCombinations.length > 0 && (
                        <div className="space-y-2">
                            {analysis.tuHoaCombinations.map((entry, idx) => (
                                <div key={idx} className="p-2.5 rounded-lg bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-200/30 dark:border-indigo-700/30">
                                    <Line text={entry} />
                                </div>
                            ))}
                        </div>
                    )}
                    {analysis.tuHoaDeepAnalysis.length > 0 && (
                        <div className="space-y-2">
                            {analysis.tuHoaDeepAnalysis.map((entry, idx) => (
                                <div key={idx} className="pl-2.5 border-l-2 border-emerald-400/40 dark:border-emerald-500/40">
                                    <Line text={entry} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ),
        });
    }

    // §7 Tam Hợp Chiếu
    if (analysis.tamHopAnalysis) {
        sections.push({
            icon: '🔺',
            title: 'Tam Hợp Chiếu',
            accentColor: 'bg-orange-500/70 dark:bg-orange-400/70',
            content: <Line text={analysis.tamHopAnalysis} />,
        });
    }

    // §8 Đối Cung & Giáp Cung
    if (analysis.doiCungAnalysis || analysis.giapCungAnalysis) {
        sections.push({
            icon: '🔄',
            title: 'Đối Cung & Giáp Cung',
            accentColor: 'bg-sky-500/70 dark:bg-sky-400/70',
            content: (
                <div className="space-y-2">
                    {analysis.doiCungAnalysis && <Line text={analysis.doiCungAnalysis} />}
                    {analysis.giapCungAnalysis && (
                        <div className="pl-2.5 border-l-2 border-sky-400/40 dark:border-sky-500/40">
                            <Line text={analysis.giapCungAnalysis} />
                        </div>
                    )}
                </div>
            ),
        });
    }

    // §9 Nhị Hợp & Lục Hại
    if (analysis.nhiHopAnalysis) {
        sections.push({
            icon: '🤝',
            title: 'Nhị Hợp & Lục Hại',
            accentColor: 'bg-cyan-500/70 dark:bg-cyan-400/70',
            content: <Line text={analysis.nhiHopAnalysis} />,
        });
    }

    // §10 Vòng Tràng Sinh
    if (analysis.changShengAnalysis) {
        sections.push({
            icon: '♻️',
            title: 'Vòng Tràng Sinh',
            accentColor: 'bg-lime-500/70 dark:bg-lime-400/70',
            content: <Line text={analysis.changShengAnalysis} />,
        });
    }

    // §10 Tuần Không / Triệt Không
    if (analysis.tuanTrietAnalysis.length > 0) {
        sections.push({
            icon: '🚫',
            title: 'Tuần Không / Triệt Không',
            accentColor: 'bg-amber-500/70 dark:bg-amber-400/70',
            content: (
                <div className="space-y-2">
                    {analysis.tuanTrietAnalysis.map((entry, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/30 dark:border-amber-700/30">
                            <Line text={entry} />
                        </div>
                    ))}
                </div>
            ),
        });
    }

    return sections;
}

// ═══════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════

const FUNC_COLORS = {
    rose: { border: 'border-rose-400/40 dark:border-rose-500/40', label: 'text-rose-600 dark:text-rose-400' },
    violet: { border: 'border-violet-400/40 dark:border-violet-500/40', label: 'text-violet-600 dark:text-violet-400' },
    amber: { border: 'border-amber-400/40 dark:border-amber-500/40', label: 'text-amber-600 dark:text-amber-400' },
} as const;

function FuncRow({ label, color, text }: { label: string; color: keyof typeof FUNC_COLORS; text: string }) {
    const c = FUNC_COLORS[color];
    return (
        <div className={`pl-2.5 border-l-2 ${c.border} py-0.5`}>
            <span className={`text-xs font-bold ${c.label}`}>{label}: </span>
            <span className="text-text-primary-light/80 dark:text-text-primary-dark/80">{text}</span>
        </div>
    );
}

function Line({ text }: { text: string }) {
    const parts = text.replace(/^- /, '').split(/(\*\*[^*]+\*\*)/g);
    return (
        <span className="text-sm leading-relaxed">
            {parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                        <strong key={i} className="text-text-primary-light dark:text-text-primary-dark font-semibold">
                            {part.slice(2, -2)}
                        </strong>
                    );
                }
                return <span key={i}>{part}</span>;
            })}
        </span>
    );
}
