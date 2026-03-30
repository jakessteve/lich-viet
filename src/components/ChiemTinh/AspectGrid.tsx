/**
 * AspectGrid — Triangle matrix visualization of aspects between planets.
 * Classic astrology chart presentation: planets on both axes, aspect symbols at intersections.
 */
import React from 'react';
import Icon from '../shared/Icon';
import type { NatalChart, AspectData } from '../../types/westernAstro';
import { PLANET_ORDER, ASPECT_NAMES } from '../../data/westernAstro/planetData';

interface Props { chart: NatalChart; }

const GRID_BODIES: string[] = [
    ...PLANET_ORDER,
    'chiron', 'northNode',
    'ascendant', 'midheaven',
];

const BODY_LABELS: Record<string, { name: string; symbol: string }> = {
    sun: { name: 'Mặt Trời', symbol: '☉' },
    moon: { name: 'Mặt Trăng', symbol: '☽' },
    mercury: { name: 'Thủy Tinh', symbol: '☿' },
    venus: { name: 'Kim Tinh', symbol: '♀' },
    mars: { name: 'Hỏa Tinh', symbol: '♂' },
    jupiter: { name: 'Mộc Tinh', symbol: '♃' },
    saturn: { name: 'Thổ Tinh', symbol: '♄' },
    uranus: { name: 'Thiên Vương', symbol: '♅' },
    neptune: { name: 'Hải Vương', symbol: '♆' },
    pluto: { name: 'Diêm Vương', symbol: '♇' },
    chiron: { name: 'Chiron', symbol: '⚷' },
    northNode: { name: 'La Hầu', symbol: '☊' },
    ascendant: { name: 'ASC', symbol: 'As' },
    midheaven: { name: 'MC', symbol: 'MC' },
};

function getAspectColor(type: string): string {
    const info = ASPECT_NAMES[type];
    if (!info) return 'var(--text-secondary-light)';
    if (info.nature === 'harmonious') return '#3b82f6';
    if (info.nature === 'challenging') return '#ef4444';
    return '#22c55e';
}

export default function AspectGrid({ chart }: Props) {
    // Build lookup: "bodyA|bodyB" → AspectData
    const aspectLookup = new Map<string, AspectData>();
    for (const a of chart.aspects) {
        aspectLookup.set(`${a.planet1}|${a.planet2}`, a);
        aspectLookup.set(`${a.planet2}|${a.planet1}`, a);
    }

    // Filter to bodies that actually exist in the chart
    const existingBodies = new Set<string>();
    for (const a of chart.aspects) {
        existingBodies.add(a.planet1);
        existingBodies.add(a.planet2);
    }
    const bodies = GRID_BODIES.filter(b => existingBodies.has(b));

    if (bodies.length < 2) return null;

    return (
        <div className="p-4 border-t border-border-light/30 dark:border-border-dark/30">
            <h3 className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark flex items-center gap-2 mb-3">
                <Icon name="grid_on" className="w-4 h-4 text-violet-500" /> Lưới Góc Chiếu (Aspect Grid)
            </h3>

            <div className="overflow-x-auto">
                <table className="border-collapse" style={{ fontSize: '11px' }}>
                    <thead>
                        <tr>
                            <th className="p-1" />
                            {bodies.slice(1).map(b => {
                                const label = BODY_LABELS[b];
                                return (
                                    <th key={b} className="p-1 text-center text-text-secondary-light dark:text-text-secondary-dark font-medium" style={{ minWidth: '28px' }}>
                                        <span title={label?.name}>{label?.symbol ?? b}</span>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {bodies.slice(0, -1).map((rowBody, rowIdx) => {
                            const rowLabel = BODY_LABELS[rowBody];
                            return (
                                <tr key={rowBody}>
                                    <td className="p-1 text-right text-text-secondary-light dark:text-text-secondary-dark font-medium whitespace-nowrap pr-2">
                                        <span title={rowLabel?.name}>{rowLabel?.symbol ?? rowBody}</span>
                                    </td>
                                    {bodies.slice(1).map((colBody, colIdx) => {
                                        // Only show lower triangle (colIdx >= rowIdx)
                                        if (colIdx < rowIdx) {
                                            const a = aspectLookup.get(`${rowBody}|${colBody}`);
                                            if (a) {
                                                const info = ASPECT_NAMES[a.type];
                                                const color = getAspectColor(a.type);
                                                return (
                                                    <td
                                                        key={colBody}
                                                        className="p-1 text-center border border-black/5 dark:border-white/5"
                                                        title={`${rowLabel?.name} ${info?.name ?? a.type} ${BODY_LABELS[colBody]?.name} (orb: ${a.orb.toFixed(1)}°)`}
                                                        style={{ color }}
                                                    >
                                                        <span className="font-bold">{info?.symbol ?? '·'}</span>
                                                    </td>
                                                );
                                            }
                                            return (
                                                <td key={colBody} className="p-1 text-center border border-black/5 dark:border-white/5 text-text-secondary-light/20 dark:text-text-secondary-dark/20">
                                                    ·
                                                </td>
                                            );
                                        }
                                        // Diagonal or upper triangle: empty
                                        return (
                                            <td key={colBody} className="p-1 bg-black/2 dark:bg-white/2" />
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* Legend */}
                <div className="flex flex-wrap gap-3 mt-3 text-[10px] text-text-secondary-light dark:text-text-secondary-dark">
                    {Object.entries(ASPECT_NAMES)
                        .filter(([k]) => ['conjunction', 'sextile', 'square', 'trine', 'opposition', 'quincunx'].includes(k))
                        .map(([key, info]) => (
                            <span key={key} className="flex items-center gap-1">
                                <span style={{ color: getAspectColor(key) }} className="font-bold">{info.symbol}</span>
                                {info.name}
                            </span>
                        ))}
                </div>
            </div>
        </div>
    );
}
