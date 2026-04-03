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
                        <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl w-full" />
                        <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl w-full" />
                        <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl w-full" />
                        <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl w-full" />
                        <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl w-full" />
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

            {/* ── Palace Content (Tabbed) ── */}
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[8000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-3 pb-4 pt-1">
                    <PalaceTabbedContent analysis={analysis} />
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
// PalaceTabbedContent — Renders sections grouped into 4 tabs
// ═══════════════════════════════════════════════════════════════════

type TabId = 'overview' | 'stars' | 'linkages' | 'modifiers';

function PalaceTabbedContent({ analysis }: { analysis: PalaceAnalysis }) {
    const [activeTab, setActiveTab] = useState<TabId>('overview');

    const tabs: Record<TabId, SectionData[]> = useMemo(() => {
        const allSections = buildSections(analysis);
        return {
            overview: allSections.filter(s => s.groupId === 'overview'),
            stars: allSections.filter(s => s.groupId === 'stars'),
            linkages: allSections.filter(s => s.groupId === 'linkages'),
            modifiers: allSections.filter(s => s.groupId === 'modifiers'),
        };
    }, [analysis]);

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

            {/* Tab Navigation Pills */}
            <div className="flex overflow-x-auto hide-scrollbar -mx-1 px-1 py-1 gap-1.5">
                <TabPill
                    label="Tổng Quan"
                    icon="📋"
                    isActive={activeTab === 'overview'}
                    onClick={() => setActiveTab('overview')}
                    hasContent={tabs.overview.length > 0}
                />
                <TabPill
                    label="Tinh Hệ"
                    icon="⭐"
                    isActive={activeTab === 'stars'}
                    onClick={() => setActiveTab('stars')}
                    hasContent={tabs.stars.length > 0}
                />
                <TabPill
                    label="Giao Luận"
                    icon="🔗"
                    isActive={activeTab === 'linkages'}
                    onClick={() => setActiveTab('linkages')}
                    hasContent={tabs.linkages.length > 0}
                />
                <TabPill
                    label="Biến Số"
                    icon="🌀"
                    isActive={activeTab === 'modifiers'}
                    onClick={() => setActiveTab('modifiers')}
                    hasContent={tabs.modifiers.length > 0}
                />
            </div>

            {/* Tab Content Area */}
            <div className="min-h-[150px] animate-fade-in">
                {tabs[activeTab].length > 0 ? (
                    <div className="space-y-4">
                        {tabs[activeTab].map((section, idx) => (
                            <div key={section.title} className="bg-white/40 dark:bg-black/20 rounded-xl p-3.5 border border-border-light/5 dark:border-border-dark/10">
                                {/* Section header */}
                                <div className="flex items-center gap-2 mb-2.5">
                                    <span className={`w-1 h-4 rounded-full shrink-0 ${section.accentColor}`} />
                                    <span className="text-sm font-bold text-text-primary-light/90 dark:text-text-primary-dark/90 tracking-wide uppercase">
                                        {section.title}
                                    </span>
                                </div>

                                {/* Section content */}
                                <div className="text-sm leading-relaxed text-text-primary-light/85 dark:text-text-primary-dark/85">
                                    {section.content}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-24 flex items-center justify-center text-xs text-text-secondary-light dark:text-text-secondary-dark italic bg-white/40 dark:bg-black/20 rounded-xl border border-border-light/5 dark:border-border-dark/10">
                        Không có dữ liệu nổi bật cho mục này.
                    </div>
                )}
            </div>
        </div>
    );
}

function TabPill({ label, icon, isActive, onClick, hasContent }: { label: string; icon: string; isActive: boolean; onClick: () => void; hasContent: boolean }) {
    if (!hasContent) return null;
    return (
        <button
            onClick={onClick}
            className={`
                flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap
                ${isActive
                    ? 'bg-gold/90 dark:bg-gold-dark text-white shadow-sm'
                    : 'bg-surface-light/80 dark:bg-surface-dark/80 text-text-secondary-light dark:text-text-secondary-dark hover:bg-gold/10 dark:hover:bg-gold-dark/10 hover:text-gold dark:hover:text-gold-dark border border-border-light/10 dark:border-border-dark/10'
                }
            `}
        >
            <span>{icon}</span>
            <span>{label}</span>
        </button>
    );
}

// ═══════════════════════════════════════════════════════════════════
// Build sections from analysis data
// ═══════════════════════════════════════════════════════════════════

interface SectionData {
    groupId: TabId;
    icon: string;
    title: string;
    accentColor: string;
    content: React.ReactNode;
}

function buildSections(analysis: PalaceAnalysis): SectionData[] {
    const sections: SectionData[] = [];

    // TỔNG QUAN TAB (Overview)
    sections.push({
        groupId: 'overview',
        icon: '📋',
        title: 'Tổng Quan Cung',
        accentColor: 'bg-gold/70 dark:bg-gold-dark/70',
        content: (
            <div className="space-y-2">
                {analysis.basicInfo && <Line text={analysis.basicInfo} />}
                {analysis.overallAssessment && (
                    <div className="mt-3 p-3 rounded-lg bg-gradient-to-br from-gold/10 to-transparent dark:from-gold-dark/10 border border-gold/20 dark:border-gold-dark/20 shadow-sm">
                        <Line text={analysis.overallAssessment} />
                    </div>
                )}
            </div>
        ),
    });

    if (analysis.palaceFunction) {
        sections.push({
            groupId: 'overview',
            icon: '🏛️',
            title: 'Chức Năng Cung',
            accentColor: 'bg-violet-500/70 dark:bg-violet-400/70',
            content: (
                <div className="space-y-3">
                    <FuncRow label="Sức khỏe" color="rose" text={analysis.palaceFunction.health} />
                    <FuncRow label="Tính cách" color="violet" text={analysis.palaceFunction.personality} />
                    <FuncRow label="Sự nghiệp" color="amber" text={analysis.palaceFunction.career} />
                    <div className="mt-3 p-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light/20 dark:border-border-dark/20 shadow-sm">
                        <div className="text-xs font-bold text-violet-600 dark:text-violet-400 mb-1 flex items-center gap-1">
                            <span className="material-icons-round text-sm">lightbulb</span> Lời khuyên:
                        </div>
                        <div className="text-sm text-text-primary-light/90 dark:text-text-primary-dark/90 italic pl-5 border-l-2 border-violet-200 dark:border-violet-800">
                            {analysis.palaceFunction.advice}
                        </div>
                    </div>
                </div>
            ),
        });
    }

    // TINH HỆ TAB (Stars)
    sections.push({
        groupId: 'stars',
        icon: '⭐',
        title: 'Chính Tinh & Ngũ Hành',
        accentColor: 'bg-yellow-500/70 dark:bg-yellow-400/70',
        content: (
            <div className="space-y-3">
                {analysis.palaceSummary && <Line text={analysis.palaceSummary} />}
                
                {analysis.elementAnalysis && (
                    <div className="my-2 p-2.5 rounded-md bg-teal-50/50 dark:bg-teal-900/10 border border-teal-200/40 dark:border-teal-700/30 text-teal-800 dark:text-teal-200 italic">
                        <Line text={analysis.elementAnalysis} />
                    </div>
                )}

                {analysis.starInterpretation && (
                    <div className="space-y-2.5 mt-2">
                        {analysis.starInterpretation.split('\n\n').map((paragraph, idx) => {
                            if (paragraph.startsWith('- **')) {
                                return (
                                    <div key={idx} className="pl-3 py-1 border-l-2 border-gold/30 dark:border-gold-dark/30 bg-surface-light/30 dark:bg-surface-dark/30 rounded-r-md">
                                        <Line text={paragraph} />
                                    </div>
                                );
                            }
                            if (paragraph.startsWith('**')) {
                                return (
                                    <h4 key={idx} className="text-sm font-bold text-gold dark:text-gold-dark mt-3 mb-1">
                                        {paragraph.replace(/\*\*/g, '')}
                                    </h4>
                                );
                            }
                            return <Line key={idx} text={paragraph} />;
                        })}
                    </div>
                )}
            </div>
        ),
    });

    if (analysis.catHungGroups.catTinh.length > 0 || analysis.catHungGroups.hungSat.length > 0) {
        sections.push({
            groupId: 'stars',
            icon: '✨',
            title: 'Phân Bổ Cát Hung',
            accentColor: 'bg-emerald-500/70 dark:bg-emerald-400/70',
            content: (
                <div className="space-y-3">
                    {analysis.catHungGroups.catTinh.length > 0 && (
                        <div>
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1.5 uppercase tracking-wider">Cát Tinh Hội Tụ</span>
                            <div className="flex flex-wrap gap-1.5">
                                {analysis.catHungGroups.catTinh.map((s, i) => (
                                    <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50 shadow-sm">{s}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    {analysis.catHungGroups.hungSat.length > 0 && (
                        <div>
                            <span className="text-xs font-bold text-red-600 dark:text-red-400 block mb-1.5 uppercase tracking-wider">Hung Sát Tinh</span>
                            <div className="flex flex-wrap gap-1.5">
                                {analysis.catHungGroups.hungSat.map((s, i) => (
                                    <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700/50 shadow-sm">{s}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    {analysis.catHungGroups.dacBiet.length > 0 && (
                        <div>
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block mb-1.5 uppercase tracking-wider">Sao Phụ Trợ / Đặc Biệt</span>
                            <div className="flex flex-wrap gap-1.5">
                                {analysis.catHungGroups.dacBiet.map((s, i) => (
                                    <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50 shadow-sm">{s}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ),
        });
    }

    if (analysis.starCombinations.length > 0) {
        sections.push({
            groupId: 'stars',
            icon: '🏆',
            title: 'Cách Cục Mệnh',
            accentColor: 'bg-purple-500/70 dark:bg-purple-400/70',
            content: (
                <div className="space-y-2.5">
                    {analysis.starCombinations.map((combo, idx) => (
                        <div key={idx} className="pl-3 py-1.5 border-l-2 border-purple-400/50 dark:border-purple-500/50 bg-purple-50/30 dark:bg-purple-900/10 rounded-r-md">
                            <Line text={combo} />
                        </div>
                    ))}
                </div>
            ),
        });
    }

    if (analysis.tuHoaDeepAnalysis.length > 0 || analysis.tuHoaCombinations.length > 0) {
        sections.push({
            groupId: 'stars',
            icon: '💫',
            title: 'Tứ Hóa Tương Tác',
            accentColor: 'bg-indigo-500/70 dark:bg-indigo-400/70',
            content: (
                <div className="space-y-3">
                    {analysis.tuHoaCombinations.length > 0 && (
                        <div className="space-y-2">
                            {analysis.tuHoaCombinations.map((entry, idx) => (
                                <div key={idx} className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200/50 dark:border-indigo-700/50 shadow-sm">
                                    <Line text={entry} />
                                </div>
                            ))}
                        </div>
                    )}
                    {analysis.tuHoaDeepAnalysis.length > 0 && (
                        <div className="space-y-2 mt-2">
                            {analysis.tuHoaDeepAnalysis.map((entry, idx) => (
                                <div key={idx} className="font-medium text-indigo-800 dark:text-indigo-200 pl-3 border-l-2 border-indigo-300 dark:border-indigo-600">
                                    <Line text={entry} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ),
        });
    }

    // GIAO LUẬN TAB (Linkages)
    if (analysis.tamHopAnalysis) {
        sections.push({
            groupId: 'linkages',
            icon: '🔺',
            title: 'Tam Hợp Chiếu',
            accentColor: 'bg-orange-500/70 dark:bg-orange-400/70',
            content: <Line text={analysis.tamHopAnalysis} />,
        });
    }

    if (analysis.doiCungAnalysis || analysis.giapCungAnalysis) {
        sections.push({
            groupId: 'linkages',
            icon: '🔄',
            title: 'Đối Cung & Giáp Cung',
            accentColor: 'bg-sky-500/70 dark:bg-sky-400/70',
            content: (
                <div className="space-y-2.5">
                    {analysis.doiCungAnalysis && <Line text={analysis.doiCungAnalysis} />}
                    {analysis.giapCungAnalysis && (
                        <div className="pl-3 py-1.5 border-l-2 border-sky-400/50 dark:border-sky-500/50 bg-sky-50/30 dark:bg-sky-900/10 rounded-r-md mt-2">
                            <Line text={analysis.giapCungAnalysis} />
                        </div>
                    )}
                </div>
            ),
        });
    }

    if (analysis.nhiHopAnalysis) {
        sections.push({
            groupId: 'linkages',
            icon: '🤝',
            title: 'Nhị Hợp & Lục Hại',
            accentColor: 'bg-cyan-500/70 dark:bg-cyan-400/70',
            content: <Line text={analysis.nhiHopAnalysis} />,
        });
    }

    // BIẾN SỐ TAB (Modifiers)
    if (analysis.changShengAnalysis) {
        sections.push({
            groupId: 'modifiers',
            icon: '♻️',
            title: 'Vòng Tràng Sinh',
            accentColor: 'bg-lime-500/70 dark:bg-lime-400/70',
            content: <Line text={analysis.changShengAnalysis} />,
        });
    }

    if (analysis.tuanTrietAnalysis.length > 0) {
        sections.push({
            groupId: 'modifiers',
            icon: '🚫',
            title: 'Tuần Triệt Không Vong',
            accentColor: 'bg-amber-600/70 dark:bg-amber-500/70',
            content: (
                <div className="space-y-2.5">
                    {analysis.tuanTrietAnalysis.map((entry, idx) => (
                        <div key={idx} className="p-3 rounded-md bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 dark:border-amber-600 shadow-sm text-amber-900 dark:text-amber-100">
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
    rose: { border: 'border-rose-400 dark:border-rose-500', label: 'text-rose-600 dark:text-rose-400' },
    violet: { border: 'border-violet-400 dark:border-violet-500', label: 'text-violet-600 dark:text-violet-400' },
    amber: { border: 'border-amber-400 dark:border-amber-500', label: 'text-amber-600 dark:text-amber-400' },
} as const;

function FuncRow({ label, color, text }: { label: string; color: keyof typeof FUNC_COLORS; text: string }) {
    const c = FUNC_COLORS[color];
    return (
        <div className={`pl-3 border-l-2 ${c.border} py-1`}>
            <span className={`text-xs font-bold uppercase tracking-wider ${c.label} block mb-0.5`}>{label}</span>
            <span className="text-sm font-medium text-text-primary-light/85 dark:text-text-primary-dark/85">{text}</span>
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

