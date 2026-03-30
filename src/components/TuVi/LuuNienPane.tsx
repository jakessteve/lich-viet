import React, { useMemo, useState, useCallback } from 'react';
import type { TuViChartData, ChartInput } from '../../services/tuvi/tuviTypes';
import { getLuuNienAnalysis } from '../../services/tuvi/chartAnalysis';
import CollapsibleCard from '../CollapsibleCard';

interface LuuNienPaneProps {
    readonly chart: TuViChartData;
    readonly input: ChartInput;
    readonly onUpdateInput: (input: ChartInput) => void;
}

export default function LuuNienPane({ chart, input, onUpdateInput }: LuuNienPaneProps) {
    const luuNienData = useMemo(() => getLuuNienAnalysis(chart), [chart]);

    const _currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState<number | null>(input?.targetYear ?? null);
    const [expandedPalaces, setExpandedPalaces] = useState<Set<string>>(new Set());

    const birthYear = parseInt(input.solarDate.split('-')[0], 10);

    const handleYearChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        if (!val) {
            setSelectedYear(null);
            onUpdateInput({ ...input, targetYear: undefined });
            return;
        }
        const year = parseInt(val, 10);
        setSelectedYear(year);
        onUpdateInput({ ...input, targetYear: year });
    }, [onUpdateInput, input]);

    const togglePalace = useCallback((roleName: string) => {
        setExpandedPalaces(prev => {
            const next = new Set(prev);
            if (next.has(roleName)) next.delete(roleName);
            else next.add(roleName);
            return next;
        });
    }, []);

    return (
        <CollapsibleCard title="Hạn Lưu Niên" defaultOpen={false} collapseOnMobile={true}>
            <div className="p-4 space-y-4">
                <p className="text-base text-text-secondary-light dark:text-text-secondary-dark">
                    Chọn năm để xem phân tích vận hạn chi tiết theo lý thuyết Tử Vi Đẩu Số.
                </p>

                {/* Year Selector */}
                <select
                    id="luuNienYear"
                    className="tuvi-year-select w-full"
                    value={selectedYear || ''}
                    onChange={handleYearChange}
                >
                    <option value="">— Chọn năm xem hạn —</option>
                    {Array.from({ length: 81 }).map((_, i) => {
                        const y = birthYear + i;
                        return (
                            <option key={y} value={y}>
                                Năm {y} ({y - birthYear + 1} tuổi)
                            </option>
                        );
                    })}
                </select>

                {/* Analysis Results */}
                {luuNienData ? (
                    <div className="space-y-4 animate-fade-in-up">
                        {/* Overall Assessment */}
                        <div className="p-3 rounded-lg border border-gold/30 dark:border-gold-dark/30 bg-gold/5 dark:bg-gold-dark/5">
                            <div className="text-xs font-bold text-gold dark:text-gold-dark mb-2 uppercase tracking-wider">
                                Tổng Quan Năm {selectedYear}
                                {chart.targetYearStemBranch && (
                                    <span className="ml-2 normal-case tracking-normal font-semibold">
                                        ({chart.targetYearStemBranch})
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-text-primary-light/90 dark:text-text-primary-dark/90 leading-relaxed">
                                {luuNienData.overallAssessment}
                            </p>
                        </div>

                        {/* Lưu Niên Tứ Hóa */}
                        {luuNienData.tuHoaYearly.length > 0 && (
                            <div>
                                <div className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark mb-2 uppercase tracking-wider">
                                    Lưu Niên Tứ Hóa
                                </div>
                                <div className="space-y-1.5">
                                    {luuNienData.tuHoaYearly.map((entry, idx) => (
                                        <div
                                            key={`lnth-${entry.starName}-${entry.mutagenKey}-${idx}`}
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
                            </div>
                        )}

                        {/* Per-Palace Analyses */}
                        <div>
                            <div className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark mb-2 uppercase tracking-wider">
                                Phân Tích Các Cung Chính
                            </div>
                            <div className="space-y-2">
                                {luuNienData.palaceAnalyses.map((pa) => {
                                    const isExpanded = expandedPalaces.has(pa.luuNienRole);
                                    const severityClass = pa.luuNienRole === 'Mệnh'
                                        ? 'border-gold/30 dark:border-gold-dark/30 bg-gold/5 dark:bg-gold-dark/5'
                                        : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30';

                                    return (
                                        <div
                                            key={`pa-${pa.luuNienRole}`}
                                            className={`rounded-lg border ${severityClass} overflow-hidden`}
                                        >
                                            <button
                                                onClick={() => togglePalace(pa.luuNienRole)}
                                                className="w-full p-3 flex items-center justify-between text-left hover:bg-black/3 dark:hover:bg-white/3 transition-colors"
                                            >
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <span className="text-base font-bold text-text-primary-light dark:text-text-primary-dark">
                                                        LN {pa.luuNienRole}
                                                    </span>
                                                    <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                                                        → cung {pa.palaceName}
                                                    </span>
                                                </div>
                                                <span className={`text-xs text-text-secondary-light dark:text-text-secondary-dark transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                                                    ▼
                                                </span>
                                            </button>

                                            {isExpanded && (
                                                <div className="px-3 pb-3 animate-fade-in-up">
                                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                                        {pa.natalMajorStars.map(name => (
                                                            <span key={name} className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100/60 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 font-semibold">
                                                                {name}
                                                            </span>
                                                        ))}
                                                        {pa.overlayStars.map(name => (
                                                            <span key={`ol-${name}`} className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100/60 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium italic">
                                                                {name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <p className="text-sm text-text-primary-light/80 dark:text-text-primary-dark/80 leading-relaxed">
                                                        {pa.interpretation}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ) : selectedYear ? (
                    <div className="text-sm text-text-secondary-light/60 dark:text-text-secondary-dark/60 italic p-3">
                        Đang tải dữ liệu vận hạn...
                    </div>
                ) : null}
            </div>
        </CollapsibleCard>
    );
}
