/**
 * ZodiacProfileCard — Big 3 display (Sun, Moon, Rising)
 * A6: Responsive grid — stacks vertically on mobile
 */
import React from 'react';
import type { NatalChart } from '../../types/westernAstro';
import { ZODIAC_SIGNS, ELEMENT_COLORS } from '../../data/westernAstro/zodiacSigns';

interface Props { chart: NatalChart; }

export default function ZodiacProfileCard({ chart }: Props) {
    const sunSign = ZODIAC_SIGNS[chart.sun.sign];
    const moonSign = ZODIAC_SIGNS[chart.moon.sign];
    const ascSign = ZODIAC_SIGNS[chart.ascendantSign];

    const items = [
        { label: 'Mặt Trời', symbol: '☉', sign: sunSign, planet: chart.sun, desc: 'Bản ngã cốt lõi' },
        { label: 'Mặt Trăng', symbol: '☽', sign: moonSign, planet: chart.moon, desc: 'Cảm xúc nội tâm' },
        { label: 'Cung Mọc', symbol: '↑', sign: ascSign, planet: null, desc: 'Ấn tượng đầu tiên' },
    ];

    // Determine Sect (Day chart = Sun in houses 7-12, Night chart = Sun in houses 1-6)
    const isDayChart = chart.sun.house >= 7 && chart.sun.house <= 12;

    const translateDignity = (dignity?: string) => {
        if (!dignity) return null;
        switch(dignity) {
            case 'domicile': return { label: 'Miếu Vượng (Domicile)', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30' };
            case 'exaltation': return { label: 'Thăng Hoa (Exalted)', color: 'text-blue-500 bg-blue-500/10 border-blue-500/30' };
            case 'detriment': return { label: 'Tù Hãm (Detriment)', color: 'text-rose-500 bg-rose-500/10 border-rose-500/30' };
            case 'fall': return { label: 'Suy Vi (Fall)', color: 'text-orange-500 bg-orange-500/10 border-orange-500/30' };
            default: return null;
        }
    };

    return (
        <div className="space-y-4">
            {/* Hellenistic Sect Indicator */}
            <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-text-secondary-light dark:text-text-secondary-dark">Phân loại bản đồ sao:</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${isDayChart ? 'text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-900/30 dark:border-amber-700/50' : 'text-indigo-600 bg-indigo-50 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-900/30 dark:border-indigo-700/50'}`}>
                    {isDayChart ? '☀️ Biểu Đồ Ngày (Day Sect)' : '🌙 Biểu Đồ Đêm (Night Sect)'}
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {items.map((item, i) => {
                    const dignityClass = item.planet ? translateDignity(item.planet.dignity) : null;
                    return (
                        <div key={i}
                            className="card-surface p-4 text-center space-y-2 relative overflow-hidden"
                            style={{ borderTop: `3px solid ${ELEMENT_COLORS[item.sign.element]}` }}>
                            <div className="text-2xl">{item.sign.symbol}</div>
                            <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium leading-none">
                                {item.symbol} {item.label}
                            </div>
                            <div className="text-base font-bold text-text-primary-light dark:text-text-primary-dark">
                                {item.sign.name}
                            </div>
                            
                            {/* Dignity Badge */}
                            {dignityClass && (
                                <div className={`mx-auto inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${dignityClass.color}`}>
                                    {dignityClass.label}
                                </div>
                            )}

                            {item.planet && (
                                <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark opacity-80 pt-1">
                                    {item.planet.signDegree}°{item.planet.signMinute}' · Nhà {item.planet.house}
                                </div>
                            )}
                            <div className="text-[10.5px] font-medium text-text-secondary-light dark:text-text-secondary-dark opacity-60">
                                {item.desc}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
