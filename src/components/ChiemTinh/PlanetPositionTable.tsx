/**
 * PlanetPositionTable — Enhanced Table A
 * Shows planets + celestial points with: sign + DD°MM'SS", house, houses ruled
 */
import React from 'react';
import Icon from '../shared/Icon';
import type { NatalChart, PlanetId } from '../../types/westernAstro';
import { PLANETS } from '../../data/westernAstro/planetData';
import { ZODIAC_SIGNS } from '../../data/westernAstro/zodiacSigns';
import { computeHousesRuledByPlanet } from '@lich-viet/core/chiemtinh';

interface Props { chart: NatalChart; }

export default function PlanetPositionTable({ chart }: Props) {
    const luminaries: PlanetId[] = ['sun', 'moon'];
    const personalPlanets: PlanetId[] = ['mercury', 'venus', 'mars'];
    const socialPlanets: PlanetId[] = ['jupiter', 'saturn'];
    const outerPlanets: PlanetId[] = ['uranus', 'neptune', 'pluto'];

    const renderPlanetGroup = (title: string, planetIds: PlanetId[], isOuter: boolean = false) => {
        const hasPlanets = planetIds.some(id => chart.planets.some(p => p.id === id));
        if (!hasPlanets) return null;

        return (
            <>
                <tr>
                    <td colSpan={4} className="pt-3 pb-1 px-2 text-[10px] font-bold uppercase text-text-secondary-light/70 dark:text-text-secondary-dark/70 tracking-wider bg-black/5 dark:bg-white/5">
                        {title}
                    </td>
                </tr>
                {planetIds.map(id => {
                    const planet = chart.planets.find(p => p.id === id);
                    if (!planet) return null;
                    const info = PLANETS[id];
                    const sign = ZODIAC_SIGNS[planet.sign];
                    const housesRuled = computeHousesRuledByPlanet(id, chart.houses, isOuter);
                    return (
                        <tr key={id} className={`border-b border-black/5 dark:border-white/5 transition-colors ${title === 'Nhóm Thể Sáng (Luminaries)' ? 'bg-amber-50/30 dark:bg-amber-900/10 hover:bg-amber-100/50 dark:hover:bg-amber-900/20' : 'hover:bg-black/3 dark:hover:bg-white/3'}`}>
                            <td className="py-2 px-2 flex items-center gap-2">
                                <span className={`text-lg font-black ${title === 'Nhóm Thể Sáng (Luminaries)' ? 'text-amber-500 shadow-amber-500/20 drop-shadow-sm' : ''}`}>{info.symbol}</span>
                                <span className={`font-bold ${title === 'Nhóm Thể Sáng (Luminaries)' ? 'text-text-primary-light dark:text-text-primary-dark' : 'text-text-secondary-light dark:text-text-secondary-dark font-medium'}`}>{info.name}</span>
                            </td>
                            <td className="py-2 px-2">
                                <span className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                                    {sign.symbol} {sign.name}
                                </span>
                                <span className="text-text-secondary-light dark:text-text-secondary-dark font-medium ml-1">
                                    {planet.signDegree}°{String(planet.signMinute).padStart(2, '0')}'{String(planet.signSecond).padStart(2, '0')}"
                                </span>
                                {planet.isRetrograde && <span className="ml-1 text-red-500 font-bold text-[10px] bg-red-100 dark:bg-red-900/30 px-1 rounded">Rx</span>}
                            </td>
                            <td className="py-2 px-2 text-center font-bold text-text-primary-light dark:text-text-primary-dark opacity-90">{planet.house}</td>
                            <td className="py-2 px-2 text-text-secondary-light dark:text-text-secondary-dark font-medium">
                                {housesRuled.length > 0 ? housesRuled.join(', ') : '—'}
                            </td>
                        </tr>
                    );
                })}
            </>
        );
    };

    return (
        <div className="p-4">
            <h3 className="text-base font-semibold text-text-primary-light dark:text-text-primary-dark flex items-center gap-2 mb-3">
                <Icon name="table_chart" className="w-4 h-4 text-gold dark:text-gold-dark" /> Vị trí các Hành tinh
            </h3>

            <div className="overflow-x-auto rounded-xl border border-black/10 dark:border-white/10 glass-card">
                <table className="w-full text-xs border-collapse">
                    <thead>
                        <tr className="border-b-2 border-black/10 dark:border-white/10 text-text-secondary-light dark:text-text-secondary-dark bg-black/5 dark:bg-white/5">
                            <th className="text-left py-2.5 px-3 font-bold uppercase tracking-wide text-[10px]">Tinh Thể</th>
                            <th className="text-left py-2.5 px-2 font-bold uppercase tracking-wide text-[10px]">Cung Hoàng Đạo & Tọa Độ</th>
                            <th className="text-center py-2.5 px-2 font-bold uppercase tracking-wide text-[10px]">Nhà</th>
                            <th className="text-left py-2.5 px-2 font-bold uppercase tracking-wide text-[10px]">Cai Quản Nhà</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderPlanetGroup("Nhóm Thể Sáng (Luminaries)", luminaries)}
                        {renderPlanetGroup("Hành tinh Cá nhân (Personal)", personalPlanets)}
                        {renderPlanetGroup("Hành tinh Xã hội (Social)", socialPlanets)}
                        {renderPlanetGroup("Hành tinh Thế hệ (Outer)", outerPlanets, true)}

                        {/* Celestial points header */}
                        {chart.points.length > 0 && (
                            <>
                                <tr>
                                    <td colSpan={4} className="pt-3 pb-1 px-2 text-[10px] font-semibold uppercase text-text-secondary-light dark:text-text-secondary-dark opacity-60 tracking-wider">
                                        Tiểu hành tinh & Điểm quan trọng
                                    </td>
                                </tr>
                                {chart.points.map(point => {
                                    const sign = ZODIAC_SIGNS[point.sign];
                                    return (
                                        <tr key={point.id} className="border-b border-black/5 dark:border-white/5 hover:bg-black/3 dark:hover:bg-white/3 transition-colors">
                                            <td className="py-1.5 px-2 flex items-center gap-1.5">
                                                <span className="text-base">{point.symbol}</span>
                                                <span className="font-medium text-text-primary-light dark:text-text-primary-dark">{point.name}</span>
                                            </td>
                                            <td className="py-1.5 px-2">
                                                <span className="text-text-primary-light dark:text-text-primary-dark">
                                                    {sign.symbol} {sign.name} {point.signDegree}°{String(point.signMinute).padStart(2, '0')}'{String(point.signSecond).padStart(2, '0')}"
                                                </span>
                                                {point.isRetrograde && <span className="ml-1 text-red-500 font-bold text-[10px]">R</span>}
                                            </td>
                                            <td className="py-1.5 px-2 text-center font-medium">{point.house}</td>
                                            <td className="py-1.5 px-2">—</td>
                                        </tr>
                                    );
                                })}

                                {/* Angles */}
                                {[
                                    { id: 'asc', label: 'Điểm Mọc (Ascendant)', ...chart.angles.ascendant, house: 1 },
                                    { id: 'mc', label: 'Thiên Đỉnh (MC)', ...chart.angles.midheaven, house: 10 },
                                ].map(ang => {
                                    const sign = ZODIAC_SIGNS[ang.sign];
                                    const degParts = getDecomp(ang.degree);
                                    return (
                                        <tr key={ang.id} className="border-b border-black/5 dark:border-white/5 hover:bg-black/3 dark:hover:bg-white/3 transition-colors">
                                            <td className="py-1.5 px-2">
                                                <span className="font-medium text-text-primary-light dark:text-text-primary-dark">{ang.label}</span>
                                            </td>
                                            <td className="py-1.5 px-2">
                                                <span className="text-text-primary-light dark:text-text-primary-dark">
                                                    {sign.symbol} {sign.name} {degParts.deg}°{String(degParts.min).padStart(2, '0')}'{String(degParts.sec).padStart(2, '0')}"
                                                </span>
                                            </td>
                                            <td className="py-1.5 px-2 text-center font-medium">{ang.house}</td>
                                            <td className="py-1.5 px-2">—</td>
                                        </tr>
                                    );
                                })}
                            </>
                        )}
                    </tbody>
                </table>
            </div>

            <p className="mt-2 text-[10px] text-text-secondary-light dark:text-text-secondary-dark opacity-50">
                (R) = nghịch hành (Retrograde)
            </p>
        </div>
    );
}

/** Decompose absolute degree to sign parts */
function getDecomp(absDeg: number) {
    const signDeg = ((absDeg % 360) + 360) % 360 % 30;
    const deg = Math.floor(signDeg);
    const rem = (signDeg - deg) * 60;
    const min = Math.floor(rem);
    const sec = Math.round((rem - min) * 60);
    return { deg, min, sec };
}
