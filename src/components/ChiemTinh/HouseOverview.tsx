/**
 * HouseOverview — 12-house panel showing sign on cusp, ruling planet, and planets inside.
 * Collapsible cards for each house with sign-on-cusp interpretation.
 * A5: Emoji → Lucide SVG. Removed internal collapse (now handled by outer CollapsibleCard).
 */
import React, { useState } from 'react';
import type { NatalChart, PlanetPosition } from '../../types/westernAstro';
import { ZODIAC_SIGNS } from '../../data/westernAstro/zodiacSigns';
import { PLANETS } from '../../data/westernAstro/planetData';
import { HOUSES } from '../../data/westernAstro/houseMeanings';

interface Props { chart: NatalChart; }

export default function HouseOverview({ chart }: Props) {
    const [openHouse, setOpenHouse] = useState<number | null>(null);

    // Build planet-in-house lookup
    const planetsInHouse = new Map<number, PlanetPosition[]>();
    for (const p of chart.planets) {
        if (!planetsInHouse.has(p.house)) planetsInHouse.set(p.house, []);
        planetsInHouse.get(p.house)!.push(p);
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {chart.houses.map(house => {
                const signInfo = ZODIAC_SIGNS[house.sign];
                const houseInfo = HOUSES[house.number - 1];
                const planets = planetsInHouse.get(house.number) ?? [];
                const rulerInfo = PLANETS[house.ruler];
                const isOpen = openHouse === house.number;

                return (
                    <div
                        key={house.number}
                        className={`rounded-lg border transition-all duration-200 cursor-pointer ${planets.length > 0
                                ? 'border-gold/30 dark:border-gold-dark/30 bg-gold/5 dark:bg-gold-dark/5'
                                : 'border-border-light/50 dark:border-border-dark/50'
                            } ${isOpen ? 'ring-1 ring-gold/40 dark:ring-gold-dark/40' : ''}`}
                        onClick={() => setOpenHouse(isOpen ? null : house.number)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setOpenHouse(isOpen ? null : house.number);
                            }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-expanded={isOpen}
                        aria-label={`Cung ${house.number}: ${houseInfo?.lifeDomain}`}
                    >
                        {/* Header */}
                        <div className="flex items-center gap-2 px-3 py-2">
                            <span className="text-lg font-bold text-gold dark:text-gold-dark leading-none">
                                {house.number}
                            </span>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-semibold text-text-primary-light dark:text-text-primary-dark flex items-center gap-1">
                                    {signInfo.symbol} {signInfo.name}
                                    <span className="text-[10px] font-normal text-text-secondary-light dark:text-text-secondary-dark">
                                        {house.signDegree}°{house.signMinute}'
                                    </span>
                                </div>
                                <div className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark truncate">
                                    {houseInfo?.lifeDomain}
                                </div>
                            </div>
                            {/* Ruler */}
                            {rulerInfo && (
                                <span className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark" title={`Chủ nhà: ${rulerInfo.name}`}>
                                    {rulerInfo.symbol}
                                </span>
                            )}
                        </div>

                        {/* Planets inside */}
                        {planets.length > 0 && (
                            <div className="px-3 pb-2 flex flex-wrap gap-1">
                                {planets.map(p => {
                                    const pInfo = PLANETS[p.id];
                                    return (
                                        <span
                                            key={p.id}
                                            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-gold/10 dark:bg-gold-dark/10 text-gold dark:text-gold-dark"
                                            title={`${pInfo.name} ${p.signDegree}°${p.signMinute}' ${p.isRetrograde ? '(Rx)' : ''}`}
                                        >
                                            {pInfo.symbol}
                                            {p.isRetrograde && <span className="text-[8px] opacity-60">Rx</span>}
                                        </span>
                                    );
                                })}
                            </div>
                        )}

                        {/* Expanded detail */}
                        {isOpen && houseInfo && (
                            <div className="px-3 pb-3 pt-1 border-t border-border-light/30 dark:border-border-dark/30 animate-fade-in-up">
                                <div className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark mb-1">
                                    Tương đương Tử Vi: <span className="font-medium text-text-primary-light dark:text-text-primary-dark">{houseInfo.tuViEquivalent}</span>
                                </div>
                                {rulerInfo && (
                                    <div className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark">
                                        Chủ nhà: <span className="font-medium text-text-primary-light dark:text-text-primary-dark">{rulerInfo.symbol} {rulerInfo.name}</span>
                                    </div>
                                )}
                                {houseInfo.keywords.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1.5">
                                        {houseInfo.keywords.map(kw => (
                                            <span key={kw} className="px-1.5 py-0.5 rounded text-[10px] bg-black/5 dark:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark">
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
