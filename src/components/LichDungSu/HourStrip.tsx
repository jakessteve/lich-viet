/**
 * HourStrip — Horizontal 12-hour selector
 * Shows all 12 Chinese hours with auspicious/inauspicious color coding.
 */

import React from 'react';
import { HourInfo } from '../../types/calendar';
import type { Chi } from '../../types/calendar';

interface HourStripProps {
    hours: HourInfo[];
    selectedHour: Chi | null;
    onSelectHour: (chi: Chi | null) => void;
}

const HourStrip: React.FC<HourStripProps> = ({ hours, selectedHour, onSelectHour }) => {
    const handleClick = (chi: Chi) => {
        onSelectHour(selectedHour === chi ? null : chi);
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Chọn giờ (tùy chọn)</span>
                {selectedHour && (
                    <button
                        onClick={() => onSelectHour(null)}
                        className="text-xs text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-white transition-colors"
                    >
                        Bỏ chọn
                    </button>
                )}
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
                {hours.map((h) => {
                    const isSelected = selectedHour === h.canChi.chi;
                    const timeLabel = h.timeRange.replace(/:00/g, 'h').replace(' - ', '-');

                    return (
                        <button
                            key={h.canChi.chi}
                            onClick={() => handleClick(h.canChi.chi)}
                            className={`flex flex-col items-center gap-0.5 px-1 py-2 rounded-lg text-center transition-all duration-200 ${isSelected
                                    ? 'bg-gold/15 dark:bg-gold-dark/15 ring-2 ring-gold dark:ring-gold-dark scale-[0.97]'
                                    : h.isAuspicious
                                        ? 'bg-emerald-50 dark:bg-emerald-900/15 hover:bg-emerald-100 dark:hover:bg-emerald-900/25'
                                        : 'bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                                }`}
                            title={`${h.canChi.can} ${h.canChi.chi} — ${h.isAuspicious ? 'Hoàng Đạo' : 'Hắc Đạo'} — ${h.score}%`}
                        >
                            <span className={`text-[10px] font-bold ${isSelected
                                    ? 'text-gold dark:text-gold-dark'
                                    : h.isAuspicious
                                        ? 'text-emerald-600 dark:text-emerald-400'
                                        : 'text-text-primary-light dark:text-text-primary-dark'
                                }`}>
                                {h.canChi.chi}
                            </span>
                            <span className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark leading-tight">
                                {timeLabel}
                            </span>
                            {/* Score dot indicator */}
                            <div className={`w-1.5 h-1.5 rounded-full mt-0.5 ${h.score >= 70 ? 'bg-emerald-500' :
                                    h.score >= 50 ? 'bg-amber-500' :
                                        'bg-red-500'
                                }`} />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default HourStrip;
