/**
 * NatalChartWheel — Professional SVG natal chart visualization
 * Matches the reference quality of chochiemtinh.com
 *
 * Features:
 *  - Zodiac ring with degree tick marks & sign symbols
 *  - Planet glyphs with exact degree°minute' annotations, color-coded
 *  - House cusp lines with degree labels
 *  - Aspect lines color-coded (red=hard, blue=soft, green=neutral)
 *  - Anti-overlap logic for clustered planets
 *  - Birth info header
 *  - ASC/MC/DSC/IC labels with degrees
 */
import React, { useCallback, useMemo } from 'react';
import '../../styles/natal-chart.css';
import type { NatalChart, PlanetPosition } from '../../types/westernAstro';
import { ZODIAC_SIGNS, ZODIAC_ORDER } from '../../data/westernAstro/zodiacSigns';
import { PLANETS, ASPECT_NAMES, PLANET_COLORS, ASPECT_LINE_COLORS } from '../../data/westernAstro/planetData';
interface Props {
  chart: NatalChart;
  outerPlanets?: PlanetPosition[]; // Thêm vòng tròn bên ngoài cho Transits / Progressions
  outerLabel?: string; // Tên của vòng ngoài (e.g. "Transits", "Progressions")
}

// ─── Layout constants ───────────────────────────────────────────────────────
const SIZE = 640;
const CX = SIZE / 2;
const CY = SIZE / 2;

// Radii from outside in
const R_OUTER = 295;  // Outermost circle (degree tick marks)
const R_SIGN_MID = 270;  // Middle of sign ring (symbol placement)
const R_SIGN_INNER = 245;  // Inner edge of sign ring
const R_PLANET_DEG = 225;  // Planet degree labels
const R_PLANET = 205;  // Planet glyph circles
const R_HOUSE_NUM = 170;  // House number placement
const R_HOUSE_LINE = 145;  // House cusp lines extend to here
const R_ASPECT = 140;  // Aspect lines drawn at this radius

// Planet colors and aspect line colors imported from shared planetData.ts

// ─── Pre-computed tick marks (only 5° intervals → ~72 ticks, not 360) ───────
const TICK_MARKS: { deg: number; isMajor: boolean; isMid: boolean }[] = [];
for (let i = 0; i < 360; i += 5) {
    const isMajor = i % 30 === 0;
    const isMid = i % 10 === 0;
    TICK_MARKS.push({ deg: i, isMajor, isMid });
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function polar(degree: number, radius: number): { x: number; y: number } {
    // 0° = left (9 o'clock), counter-clockwise
    const rad = ((180 - degree) * Math.PI) / 180;
    return {
        x: CX + radius * Math.cos(rad),
        y: CY - radius * Math.sin(rad),
    };
}

/** Format Vietnamese day of week */
function getDayOfWeek(y: number, m: number, d: number): string {
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    return days[new Date(y, m - 1, d).getDay()];
}

/** Resolve overlapping planet positions by spreading them apart */
function resolveOverlaps(planets: PlanetPosition[], rotFn: (d: number) => number): Map<string, number> {
    const MIN_SPACING = 12; // Minimum degrees apart for labels
    // Build list of {id, rotatedDeg}
    const items = planets.map(p => ({ id: p.id, deg: rotFn(p.degree) }));
    items.sort((a, b) => a.deg - b.deg);

    // Greedy spread
    const resolved = new Map<string, number>();
    for (let i = 0; i < items.length; i++) {
        let placed = items[i].deg;
        if (i > 0) {
            const prev = resolved.get(items[i - 1].id)!;
            if (placed - prev < MIN_SPACING) {
                placed = prev + MIN_SPACING;
            }
        }
        resolved.set(items[i].id, placed % 360);
    }

    // Check wrap-around: if last overlaps first
    if (items.length > 1) {
        const lastDeg = resolved.get(items[items.length - 1].id)!;
        const firstDeg = resolved.get(items[0].id)!;
        if ((360 - lastDeg + firstDeg) < MIN_SPACING) {
            resolved.set(items[items.length - 1].id, (firstDeg - MIN_SPACING + 360) % 360);
        }
    }

    return resolved;
}

// ─── House system name mapping ──────────────────────────────────────────────
const HOUSE_SYSTEM_NAMES: Record<string, string> = {
    placidus: 'Placidus',
    wholeSigns: 'Trọn Cung',
    koch: 'Koch',
    equalHouse: 'Equal House',
    campanus: 'Campanus',
    regiomontanus: 'Regiomontanus',
    topocentric: 'Topocentric',
    porphyry: 'Porphyry',
    alcabitius: 'Alcabitius',
    morinus: 'Morinus',
};

const R_OUTER_PLANET = 320;
const R_OUTER_PLANET_DEG = 340;

// ═══════════════════════════════════════════════════════════════════════════
export default function NatalChartWheel({ chart, outerPlanets, outerLabel }: Props) {
    const ascDeg = chart.angles.ascendant.degree;
    const rot = useCallback((deg: number) => ((deg - ascDeg + 360) % 360), [ascDeg]);

    const planetLabelPositions = useMemo(
        () => resolveOverlaps(chart.planets, rot),
        [chart.planets, rot],
    );

    const outerPlanetLabelPositions = useMemo(
        () => outerPlanets ? resolveOverlaps(outerPlanets, rot) : new Map(),
        [outerPlanets, rot]
    );

    const { birthData } = chart;
    const dayName = getDayOfWeek(birthData.year, birthData.month, birthData.day);
    const houseSystemName = HOUSE_SYSTEM_NAMES[chart.houseSystem] || chart.houseSystem;

    // Kéo giãn viewBox nếu có vòng ngoài
    const viewBox = outerPlanets ? '-50 -50 740 740' : `0 0 ${SIZE} ${SIZE}`;

    return (
        <div className="card-surface p-4 space-y-3">
            {/* ═══ Birth Info Header ═══ */}
            <div className="text-center space-y-0.5">
                <h3 className="text-base font-semibold text-text-primary-light dark:text-text-primary-dark">
                    {birthData.name ? `${birthData.name}, sinh` : 'Sinh'} ngày {dayName}, {birthData.day} tháng {birthData.month} năm {birthData.year} lúc {String(birthData.hour).padStart(2, '0')}:{String(birthData.minute).padStart(2, '0')}{' '}
                    <span className="opacity-70">(múi giờ = GMT {birthData.timezone >= 0 ? '+' : ''}{birthData.timezone}.0)</span>
                </h3>
                {birthData.locationName && (
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark opacity-70">
                        tại {birthData.locationName} — {Math.abs(birthData.longitude).toFixed(2)}° kinh {birthData.longitude >= 0 ? 'Đông' : 'Tây'} và {Math.abs(birthData.latitude).toFixed(2)}° vĩ {birthData.latitude >= 0 ? 'Bắc' : 'Nam'}
                    </p>
                )}
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark opacity-60">
                    Hệ thống cung Nhà: <strong>{houseSystemName}</strong>
                </p>
            </div>

            {/* ═══ Chart SVG ═══ */}
            <div className="flex justify-center">
                <svg viewBox={viewBox} className="w-full max-w-[640px]" style={{ aspectRatio: '1' }}>
                    <defs />

                    {/* ─── Background circles ─── */}
                    <circle cx={CX} cy={CY} r={R_OUTER} fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
                    <circle cx={CX} cy={CY} r={R_SIGN_INNER} fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
                    <circle cx={CX} cy={CY} r={R_HOUSE_LINE} fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />

                    {/* ─── Degree tick marks on outer ring (pre-filtered ~72 ticks) ─── */}
                    {TICK_MARKS.map(({ deg: i, isMajor, isMid }) => {
                        const deg = rot(i);
                        const outerP = polar(deg, R_OUTER);
                        const tickLen = isMajor ? 8 : isMid ? 5 : 3;
                        const innerP = polar(deg, R_OUTER - tickLen);

                        return (
                            <line key={`tick-${i}`}
                                x1={outerP.x} y1={outerP.y} x2={innerP.x} y2={innerP.y}
                                stroke="currentColor" strokeWidth={isMajor ? 1.2 : 0.5} opacity={isMajor ? 0.5 : 0.25}
                            />
                        );
                    })}

                    {/* ─── 0° labels at sign boundaries ─── */}
                    {ZODIAC_ORDER.map((_, i) => {
                        const boundaryDeg = rot(i * 30);
                        const labelPos = polar(boundaryDeg, R_OUTER + 10);
                        return (
                            <text key={`0deg-${i}`} x={labelPos.x} y={labelPos.y}
                                textAnchor="middle" dominantBaseline="central"
                                className="chart-text deg-label" fill="currentColor" opacity="0.4">
                                0°
                            </text>
                        );
                    })}

                    {/* ─── Zodiac sign dividers + symbols ─── */}
                    {ZODIAC_ORDER.map((signId, i) => {
                        const sign = ZODIAC_SIGNS[signId];
                        const startDeg = rot(i * 30);
                        const midDeg = rot(i * 30 + 15);
                        const outerPt = polar(startDeg, R_OUTER);
                        const innerPt = polar(startDeg, R_SIGN_INNER);
                        const symPt = polar(midDeg, R_SIGN_MID);

                        // Sign background color (very faint)
                        const elementColors: Record<string, string> = {
                            fire: '#FF4500', earth: '#8B4513', air: '#4682B4', water: '#1E90FF',
                        };

                        return (
                            <g key={signId}>
                                {/* Sign boundary line */}
                                <line x1={outerPt.x} y1={outerPt.y} x2={innerPt.x} y2={innerPt.y}
                                    stroke="currentColor" strokeWidth="1" opacity="0.4" />
                                {/* Sign symbol */}
                                <text x={symPt.x} y={symPt.y} textAnchor="middle" dominantBaseline="central"
                                    className="chart-text sign-symbol"
                                    fill={elementColors[sign.element] || 'currentColor'}>
                                    {sign.symbol}
                                </text>
                            </g>
                        );
                    })}

                    {/* ─── House cusps with degree labels ─── */}
                    {chart.houses.map((house) => {
                        const deg = rot(house.degree);
                        const isAngular = [1, 4, 7, 10].includes(house.number);
                        const outerPt = polar(deg, R_SIGN_INNER);
                        const innerPt = polar(deg, isAngular ? 0 : R_HOUSE_LINE);

                        // House cusp degree label position (just inside sign ring)
                        const labelPt = polar(deg, R_SIGN_INNER - 12);
                        const signDeg = house.signDegree;
                        const signSym = ZODIAC_SIGNS[house.sign]?.symbol || '';

                        // House number in center of house sector
                        const nextHouse = chart.houses[(house.number) % 12];
                        const nextDeg = rot(nextHouse.degree);
                        let midHouseDeg = deg + ((nextDeg - deg + 360) % 360) / 2;
                        midHouseDeg = midHouseDeg % 360;
                        const numPt = polar(midHouseDeg, R_HOUSE_NUM);

                        return (
                            <g key={`house-${house.number}`}>
                                {/* House cusp line */}
                                <line x1={outerPt.x} y1={outerPt.y} x2={innerPt.x} y2={innerPt.y}
                                    stroke="currentColor"
                                    strokeWidth={isAngular ? 2 : 0.7}
                                    opacity={isAngular ? 0.5 : 0.2}
                                />

                                {/* Cusp degree label */}
                                <text x={labelPt.x} y={labelPt.y}
                                    textAnchor="middle" dominantBaseline="central"
                                    className="chart-text planet-deg" fill="currentColor" opacity="0.5">
                                    {signDeg}°{signSym}
                                </text>

                                {/* House number */}
                                <text x={numPt.x} y={numPt.y}
                                    textAnchor="middle" dominantBaseline="central"
                                    className="chart-text house-num" fill="currentColor">
                                    {house.number}
                                </text>
                            </g>
                        );
                    })}

                    {/* ─── Aspect lines (innermost) ─── */}
                    {chart.aspects.map((aspect, i) => {
                        const p1 = chart.planets.find(p => p.id === aspect.planet1);
                        const p2 = chart.planets.find(p => p.id === aspect.planet2);
                        if (!p1 || !p2) return null;

                        const pos1 = polar(rot(p1.degree), R_ASPECT);
                        const pos2 = polar(rot(p2.degree), R_ASPECT);

                        const color = ASPECT_LINE_COLORS[aspect.type] || '#888';
                        const _info = ASPECT_NAMES[aspect.type];
                        const isDashed = aspect.type === 'quincunx' || aspect.type === 'semiSextile';

                        return (
                            <line key={`asp-${i}`}
                                x1={pos1.x} y1={pos1.y} x2={pos2.x} y2={pos2.y}
                                stroke={color} strokeWidth="0.8" opacity="0.5"
                                strokeDasharray={isDashed ? '3,2' : 'none'}
                            />
                        );
                    })}

                    {/* ─── Planet glyphs with degree annotations ─── */}
                    {chart.planets.map((planet) => {
                        const info = PLANETS[planet.id];
                        const color = PLANET_COLORS[planet.id];
                        const actualDeg = rot(planet.degree);
                        const labelDeg = planetLabelPositions.get(planet.id) ?? actualDeg;

                        // Planet glyph position
                        const glyphPt = polar(labelDeg, R_PLANET);
                        // Degree annotation position (further out)
                        const degPt = polar(labelDeg, R_PLANET_DEG);
                        // Connection line from actual position on inner ring
                        const actualPt = polar(actualDeg, R_SIGN_INNER);
                        const glyphEdge = polar(labelDeg, R_PLANET + 11);

                        // Build degree string: e.g. "24°27'"
                        const degStr = `${planet.signDegree}°${String(planet.signMinute).padStart(2, '0')}'`;
                        const _signSym = ZODIAC_SIGNS[planet.sign]?.symbol || '';

                        return (
                            <g key={planet.id}>
                                {/* Connection tick from zodiac ring to glyph area */}
                                {Math.abs(actualDeg - labelDeg) > 2 && (
                                    <line x1={actualPt.x} y1={actualPt.y} x2={glyphEdge.x} y2={glyphEdge.y}
                                        stroke={color} strokeWidth="0.5" opacity="0.3" />
                                )}

                                {/* Planet glyph circle */}
                                <circle cx={glyphPt.x} cy={glyphPt.y} r={10}
                                    fill="var(--bg-surface-light, #fff)" stroke={color}
                                    strokeWidth="1.5" className="dark:fill-gray-800"
                                />

                                {/* Planet symbol */}
                                <text x={glyphPt.x} y={glyphPt.y}
                                    textAnchor="middle" dominantBaseline="central"
                                    className="chart-text planet-symbol" fill={color}>
                                    {info.symbol}
                                </text>

                                {/* Degree + sign annotation */}
                                <text x={degPt.x} y={degPt.y}
                                    textAnchor="middle" dominantBaseline="central"
                                    className="chart-text planet-deg" fill={color}>
                                    {degStr}
                                </text>

                                {/* Retrograde marker */}
                                {planet.isRetrograde && (
                                    <text x={glyphPt.x + 12} y={glyphPt.y - 8}
                                        className="chart-text rx-label" fill="#CC0000">
                                        Rx
                                    </text>
                                )}
                            </g>
                        );
                    })}

                    {/* ─── Angle labels (ASC/MC/DSC/IC) ─── */}
                    {[
                        { label: 'As', angle: chart.angles.ascendant, pos: 'left' },
                        { label: 'MC', angle: chart.angles.midheaven, pos: 'top' },
                        { label: 'Ds', angle: chart.angles.descendant, pos: 'right' },
                        { label: 'IC', angle: chart.angles.imumCoeli, pos: 'bottom' },
                    ].map(({ label, angle }) => {
                        const deg = rot(angle.degree);
                        const pt = polar(deg, R_SIGN_INNER - 25);
                        const signSym = ZODIAC_SIGNS[angle.sign]?.symbol || '';

                        return (
                            <g key={label}>
                                <text x={pt.x} y={pt.y - 5} textAnchor="middle" dominantBaseline="central"
                                    className="chart-text angle-label" fill="currentColor" opacity="0.7">
                                    {label}
                                </text>
                                <text x={pt.x} y={pt.y + 6} textAnchor="middle" dominantBaseline="central"
                                    className="chart-text planet-deg" fill="currentColor" opacity="0.5">
                                    {angle.signDegree}°{signSym}
                                </text>
                            </g>
                        );
                    })}

                    {/* ─── Outer Ring (Transits/Progressions) ─── */}
                    {outerPlanets && (
                         <g className="outer-wheel-planets">
                             {/* Border line separating inner and outer */}
                             <circle cx={CX} cy={CY} r={R_OUTER + 8} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="4 4"/>
                             
                             {outerPlanets.map((planet) => {
                                 const info = PLANETS[planet.id];
                                 const color = PLANET_COLORS[planet.id];
                                 const actualDeg = rot(planet.degree);
                                 const labelDeg = outerPlanetLabelPositions.get(planet.id) ?? actualDeg;

                                 const glyphPt = polar(labelDeg, R_OUTER_PLANET);
                                 const degPt = polar(labelDeg, R_OUTER_PLANET_DEG);
                                 
                                 // Draw a tick connecting to the zodiac mark
                                 const innerTickPt = polar(actualDeg, R_OUTER + 8);
                                 const tickDest = polar(labelDeg, R_OUTER_PLANET - 10);
                                 const degStr = `${planet.signDegree}°`;

                                 return (
                                     <g key={`outer-${planet.id}`}>
                                        <line x1={innerTickPt.x} y1={innerTickPt.y} x2={tickDest.x} y2={tickDest.y} stroke={color} strokeWidth={0.5} opacity={0.4} />
                                        
                                        {/* Outer background circle */}
                                        <circle cx={glyphPt.x} cy={glyphPt.y} r={9} fill="var(--bg-card-light, rgba(255,255,255,0.8))" className="dark:fill-gray-900" />
                                        
                                        <text x={glyphPt.x} y={glyphPt.y} textAnchor="middle" dominantBaseline="central"
                                            className="chart-text planet-symbol" fill={color}>
                                            {info.symbol}
                                        </text>

                                        <text x={degPt.x} y={degPt.y} textAnchor="middle" dominantBaseline="central"
                                            className="chart-text planet-deg" fill={color} opacity="0.8">
                                            {degStr}
                                        </text>
                                     </g>
                                 );
                             })}

                             {outerLabel && (
                                <text x={CX} y={CY - R_OUTER_PLANET_DEG + 10} textAnchor="middle" className="text-sm font-bold opacity-80" fill="currentColor">
                                    {outerLabel}
                                </text>
                             )}
                         </g>
                    )}
                </svg>
            </div>

            {/* Footer attribution */}
            <p className="text-center text-[10px] text-text-secondary-light dark:text-text-secondary-dark opacity-40">
                Bản đồ sao được tạo bởi Lịch Việt
            </p>
        </div>
    );
}
