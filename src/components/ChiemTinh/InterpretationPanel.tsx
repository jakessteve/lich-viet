/**
 * InterpretationPanel — Multi-section tabbed accordion for all interpretation categories
 * Phase 2: 5 sections — Planet-in-Sign, Planet-in-House, House Cusps, Aspects, Patterns
 *
 * B2: Tab scroll indicators (gradient fade on overflow)
 * B3: Multi-expand accordion (can open multiple items simultaneously)
 * A5: Emoji icons → Lucide SVG icons
 */
import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import Icon from '../shared/Icon';
import type { InterpretationResult, InterpretationEntry } from '../../types/westernAstro';

interface Props { interpretation: InterpretationResult; }

interface TabConfig {
    id: string;
    icon: React.ReactNode;
    label: string;
    entries: InterpretationEntry[];
}

/**
 * B3: Multi-expand accordion — users can expand multiple items simultaneously
 */
function AccordionSection({ entries }: { entries: InterpretationEntry[] }) {
    const [expandedSet, setExpandedSet] = useState<Set<number>>(new Set());

    const toggle = useCallback((index: number) => {
        setExpandedSet(prev => {
            const next = new Set(prev);
            if (next.has(index)) next.delete(index);
            else next.add(index);
            return next;
        });
    }, []);

    if (entries.length === 0) {
        return (
            <div className="px-4 py-6 text-center text-base text-text-secondary-light dark:text-text-secondary-dark opacity-60">
                Chưa có dữ liệu luận giải cho mục này.
            </div>
        );
    }

    return (
        <div className="divide-y divide-border-light/50 dark:divide-border-dark/50">
            {entries.map((entry, i) => {
                const isOpen = expandedSet.has(i);
                return (
                    <div key={entry.key}>
                        <button
                            onClick={() => toggle(i)}
                            className="w-full px-4 py-3 text-left flex items-center justify-between gap-2 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                        >
                            <span className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark">
                                {entry.title}
                            </span>
                            <span className={`material-icons-round text-base text-text-secondary-light dark:text-text-secondary-dark shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                                expand_more
                            </span>
                        </button>
                        {isOpen && (
                            <div className="px-4 pb-4 animate-fade-in-up">
                                <p className="text-sm leading-relaxed text-text-primary-light dark:text-text-primary-dark whitespace-pre-line">
                                    {entry.body}
                                </p>
                                {entry.keywords.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {entry.keywords.map(kw => (
                                            <span key={kw} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gold/10 dark:bg-gold-dark/10 text-gold dark:text-gold-dark border border-gold/20 dark:border-gold-dark/20">
                                                {kw}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default function InterpretationPanel({ interpretation }: Props) {
    // Memoize tabs to avoid re-creation on every render
    const tabs: TabConfig[] = useMemo(() => [
        { id: 'planet-sign', icon: <Icon name="star" className="w-3.5 h-3.5" />, label: 'Hành Tinh trong Cung', entries: interpretation.planetInterpretations },
        { id: 'planet-house', icon: <Icon name="home" className="w-3.5 h-3.5" />, label: 'Hành Tinh trong Nhà', entries: interpretation.houseInterpretations },
        { id: 'house-cusp', icon: <Icon name="door_front" className="w-3.5 h-3.5" />, label: 'Cung trên đầu Nhà', entries: interpretation.houseCuspInterpretations },
        { id: 'aspects', icon: <Icon name="link" className="w-3.5 h-3.5" />, label: 'Góc Chiếu', entries: interpretation.aspectInterpretations },
        { id: 'patterns', icon: <Icon name="diamond" className="w-3.5 h-3.5" />, label: 'Hình Thái Đặc Biệt', entries: interpretation.patternInterpretations },
    ], [interpretation]);

    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const activeTabConfig = tabs.find(t => t.id === activeTab) ?? tabs[0];

    // B2: Tab scroll overflow detection
    const tabsRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = useCallback(() => {
        const el = tabsRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 4);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    }, []);

    useEffect(() => {
        const el = tabsRef.current;
        if (!el) return;
        checkScroll();
        el.addEventListener('scroll', checkScroll, { passive: true });
        const ro = new ResizeObserver(checkScroll);
        ro.observe(el);
        return () => { el.removeEventListener('scroll', checkScroll); ro.disconnect(); };
    }, [checkScroll]);

    return (
        <div className="card-surface overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-border-light dark:border-border-dark">
                <h3 className="text-base font-bold text-text-primary-light dark:text-text-primary-dark flex items-center gap-2">
                    <Icon name="menu_book" className="w-4 h-4 text-gold dark:text-gold-dark" />
                    Luận Giải Chi Tiết
                </h3>
            </div>

            {/* Chart Overview Text */}
            {interpretation.chartOverviewText && (
                <div className="px-4 py-3 border-b border-border-light/50 dark:border-border-dark/50 bg-indigo-50/30 dark:bg-indigo-900/10">
                    <div className="text-xs leading-relaxed text-text-primary-light dark:text-text-primary-dark whitespace-pre-line">
                        {interpretation.chartOverviewText}
                    </div>
                </div>
            )}

            {/* Tab Navigation with scroll indicators */}
            <div className="relative">
                {/* Left fade indicator */}
                {canScrollLeft && (
                    <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
                )}
                {/* Right fade indicator */}
                {canScrollRight && (
                    <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
                )}

                <div
                    ref={tabsRef}
                    className="flex overflow-x-auto border-b border-border-light/50 dark:border-border-dark/50 bg-black/2 dark:bg-white/2 scrollbar-none"
                >
                    {tabs.map(tab => {
                        const isActive = activeTab === tab.id;
                        const count = tab.entries.length;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium whitespace-nowrap transition-all duration-200 border-b-2 ${isActive
                                        ? 'border-gold dark:border-gold-dark text-gold dark:text-gold-dark bg-gold/5 dark:bg-gold-dark/5'
                                        : 'border-transparent text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark'
                                    }`}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                                {count > 0 && (
                                    <span className={`text-[10px] px-1 rounded-full ${isActive ? 'bg-gold/15 dark:bg-gold-dark/15' : 'bg-black/5 dark:bg-white/5'
                                        }`}>
                                        {count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Active Tab Content */}
            <AccordionSection entries={activeTabConfig.entries} />
        </div>
    );
}
