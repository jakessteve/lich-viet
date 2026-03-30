/**
 * AspectTable — Aspect list grouped by planet
 * Shows all aspects with Vietnamese names & orb values
 */
import React from 'react';
import Icon from '../shared/Icon';
import type { NatalChart, AspectData, PlanetId } from '../../types/westernAstro';
import { PLANETS, PLANET_ORDER, ASPECT_NAMES } from '../../data/westernAstro/planetData';

interface Props { chart: NatalChart; }

/** Vietnamese names for non-planet aspect endpoints */
const POINT_LABELS: Record<string, { name: string; symbol: string }> = {
    chiron: { name: 'Chiron', symbol: '⚷' },
    lilith: { name: 'Lilith', symbol: '⚸' },
    northNode: { name: 'La Hầu', symbol: '☊' },
    southNode: { name: 'Kế Đô', symbol: '☋' },
    partOfFortune: { name: 'P. of Fortune', symbol: '⊕' },
    vertex: { name: 'Vertex', symbol: 'Vx' },
    ascendant: { name: 'Điểm Mọc', symbol: 'As' },
    midheaven: { name: 'Thiên Đỉnh', symbol: 'MC' },
};

/** Get display name for any body ID */
function getBodyLabel(id: string): { name: string; symbol: string } {
    const planetInfo = PLANETS[id as PlanetId];
    if (planetInfo) return { name: planetInfo.name, symbol: planetInfo.symbol };
    return POINT_LABELS[id] ?? { name: id, symbol: '' };
}

/** Aspect color */
function getAspectColor(type: string): string {
    const info = ASPECT_NAMES[type];
    if (!info) return 'currentColor';
    if (info.nature === 'harmonious') return '#0066CC';
    if (info.nature === 'challenging') return '#CC0000';
    return '#228B22';
}

export default function AspectTable({ chart }: Props) {
    // Group aspects by planet1
    const grouped = new Map<string, AspectData[]>();
    for (const aspect of chart.aspects) {
        if (!grouped.has(aspect.planet1)) grouped.set(aspect.planet1, []);
        grouped.get(aspect.planet1)!.push(aspect);
    }

    // Order: main planets first, then points, then angles
    const allEndpoints = [
        ...PLANET_ORDER,
        'chiron', 'lilith', 'northNode', 'partOfFortune', 'vertex',
        'ascendant', 'midheaven',
    ];
    const orderedKeys = allEndpoints.filter(k => grouped.has(k));

    const totalAspects = chart.aspects.length;

    return (
        <div className="p-4">
            <h3 className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark flex items-center gap-2 mb-3">
                <Icon name="link" className="w-4 h-4 text-blue-500" /> Danh sách Góc chiếu
                <span className="text-[10px] font-normal text-text-secondary-light dark:text-text-secondary-dark opacity-60">
                    ({totalAspects} góc chiếu)
                </span>
            </h3>

            <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                    <thead>
                        <tr className="border-b border-black/10 dark:border-white/10 text-text-secondary-light dark:text-text-secondary-dark">
                            <th className="text-left py-2 px-2 font-semibold">Hành tinh A</th>
                            <th className="text-left py-2 px-2 font-semibold">Góc chiếu</th>
                            <th className="text-left py-2 px-2 font-semibold">Hành tinh B</th>
                            <th className="text-right py-2 px-2 font-semibold">Sai số</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderedKeys.map(bodyId => {
                            const aspects = grouped.get(bodyId)!;
                            const label = getBodyLabel(bodyId);

                            return (
                                <React.Fragment key={bodyId}>
                                    {/* Separator row with planet name */}
                                    <tr>
                                        <td colSpan={4} className="pt-2 pb-0.5 px-2">
                                            <span className="text-[10px] font-semibold text-text-secondary-light dark:text-text-secondary-dark opacity-60">
                                                {label.symbol} {label.name}
                                            </span>
                                        </td>
                                    </tr>
                                    {aspects.map((asp, i) => {
                                        const info = ASPECT_NAMES[asp.type];
                                        const body2 = getBodyLabel(asp.planet2);
                                        const color = getAspectColor(asp.type);

                                        return (
                                            <tr key={`${bodyId}-${i}`} className="border-b border-black/5 dark:border-white/5 hover:bg-black/3 dark:hover:bg-white/3 transition-colors">
                                                <td className="py-1 px-2 text-text-primary-light dark:text-text-primary-dark">
                                                    {label.symbol} {label.name}
                                                </td>
                                                <td className="py-1 px-2" style={{ color }}>
                                                    <span className="font-medium">
                                                        {info?.symbol ?? ''} {info?.name ?? asp.type}{' '}
                                                        <span className="opacity-60">{info?.angle ?? ''}°</span>
                                                    </span>
                                                </td>
                                                <td className="py-1 px-2 text-text-primary-light dark:text-text-primary-dark">
                                                    {body2.symbol} {body2.name}
                                                </td>
                                                <td className="py-1 px-2 text-right text-text-secondary-light dark:text-text-secondary-dark">
                                                    {asp.orb.toFixed(2)}°
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
