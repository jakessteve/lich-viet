/**
 * SkyMap — Interactive star map showing the sky at the moment of birth.
 *
 * Features:
 *  - Stereographic projection centered on zenith
 *  - Stars sized by magnitude, colored by spectral class
 *  - Constellation lines and Vietnamese labels
 *  - Natal chart planets overlaid with symbols
 *  - Horizon circle with cardinal directions (Bắc/Nam/Đông/Tây)
 *  - Day/night gradient based on sun altitude
 *  - Mouse/touch drag to rotate the sky azimuthally
 */
import React, { useState, useMemo, useCallback, useRef } from 'react';
import type { NatalChart } from '../../types/westernAstro';
import { PLANETS, PLANET_COLORS } from '../../data/westernAstro/planetData';
import { STAR_CATALOG, SPECTRAL_COLORS } from '../../data/westernAstro/starCatalog';
import { CONSTELLATIONS } from '../../data/westernAstro/constellationData';
import {
    toJulianDate, projectStarToScreen, projectPlanetToScreen,
    sunAltitude, magnitudeToRadius,
} from '@lich-viet/core/chiemtinh';
import SkyMapControls, { type SkyMapOptions } from './SkyMapControls';

// ─── Layout ─────────────────────────────────────────────────────────────────
const SIZE = 600; // SVG viewBox size
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 270; // Sky circle radius (horizon)
const _MARGIN = 30; // Space for labels outside horizon

// ─── Planet colors imported from shared planetData.ts ───────────────────────

interface Props { chart: NatalChart; }

export default function SkyMap({ chart }: Props) {
    const [dragOffset, setDragOffset] = useState(0);
    const [options, setOptions] = useState<SkyMapOptions>({
        showConstellationLines: true,
        showStarLabels: false,
        showPlanetLabels: true,
        showDayNight: true,
    });

    // Drag state
    const dragRef = useRef<{ startX: number; startRot: number } | null>(null);

    const { birthData } = chart;

    // ─── Computed astronomical values ───────────────────────────────────
    const jd = useMemo(() =>
        toJulianDate(birthData.year, birthData.month, birthData.day,
            birthData.hour, birthData.minute, birthData.timezone),
        [birthData],
    );

    const sunAlt = useMemo(() =>
        sunAltitude(jd, birthData.latitude, birthData.longitude),
        [jd, birthData.latitude, birthData.longitude],
    );

    // ─── Project stars (WITHOUT rotation — applied via CSS) ──────────
    const projectedStars = useMemo(() => {
        const starLookup = new Map<string, { x: number; y: number; visible: boolean; alt: number }>();
        const result = STAR_CATALOG.map(star => {
            const proj = projectStarToScreen(
                star.ra, star.dec, jd,
                birthData.latitude, birthData.longitude, 0,
            );
            const sx = CX + proj.x * R;
            const sy = CY + proj.y * R;
            const r = magnitudeToRadius(star.mag);
            starLookup.set(star.id, { x: sx, y: sy, visible: proj.visible, alt: proj.alt });
            return { ...star, sx, sy, r, visible: proj.visible, alt: proj.alt };
        });
        return { stars: result, lookup: starLookup };
    }, [jd, birthData.latitude, birthData.longitude]);

    // ─── Project planets (WITHOUT rotation — applied via CSS) ────────
    const projectedPlanets = useMemo(() =>
        chart.planets.map(planet => {
            const proj = projectPlanetToScreen(
                planet.degree, jd,
                birthData.latitude, birthData.longitude, 0,
            );
            return {
                ...planet,
                sx: CX + proj.x * R,
                sy: CY + proj.y * R,
                visible: proj.visible,
                alt: proj.alt,
            };
        }),
        [chart.planets, jd, birthData.latitude, birthData.longitude],
    );

    // ─── Sky gradient ───────────────────────────────────────────────────
    const skyGradient = useMemo(() => {
        if (!options.showDayNight) return { center: '#0a1628', edge: '#060d1a' };
        if (sunAlt > 6) return { center: '#4a90d9', edge: '#2a5aa0' };      // Day
        if (sunAlt > 0) return { center: '#2a4a7a', edge: '#162a50' };      // Golden hour
        if (sunAlt > -6) return { center: '#1a2a4a', edge: '#0e1a30' };     // Civil twilight
        if (sunAlt > -12) return { center: '#101830', edge: '#080e1e' };    // Nautical twilight
        if (sunAlt > -18) return { center: '#0c1424', edge: '#06101c' };    // Astronomical twilight
        return { center: '#0a1020', edge: '#050a14' };                       // Full night
    }, [sunAlt, options.showDayNight]);

    // ─── Drag handlers ──────────────────────────────────────────────────
    const onPointerDown = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
        dragRef.current = { startX: e.clientX, startRot: dragOffset };
        (e.target as Element).setPointerCapture?.(e.pointerId);
    }, [dragOffset]);

    const onPointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
        if (!dragRef.current) return;
        const dx = e.clientX - dragRef.current.startX;
        setDragOffset(dragRef.current.startRot + dx * 0.5);
    }, []);

    const onPointerUp = useCallback(() => {
        dragRef.current = null;
    }, []);

    // ─── Build star index for constellation lines ───────────────────────
    const { stars, lookup: starLookup } = projectedStars;

    return (
        <div className="card-surface p-4 space-y-3">
            {/* Header */}
            <h3 className="text-base font-semibold text-text-primary-light dark:text-text-primary-dark flex items-center gap-2">
                <span>🌌</span> Bản Đồ Bầu Trời
                <span className="text-[10px] font-normal text-text-secondary-light dark:text-text-secondary-dark opacity-60 ml-auto">
                    Kéo để xoay bầu trời
                </span>
            </h3>

            {/* Controls */}
            <SkyMapControls options={options} onChange={setOptions} />

            {/* Sky Map SVG */}
            <div className="flex justify-center select-none">
                <svg
                    viewBox={`0 0 ${SIZE} ${SIZE}`}
                    className="w-full max-w-[600px] rounded-2xl cursor-grab active:cursor-grabbing"
                    style={{ aspectRatio: '1', touchAction: 'pan-y' }}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                >
                    <defs>
                        {/* Sky background gradient */}
                        <radialGradient id="sky-bg-grad" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor={skyGradient.center} />
                            <stop offset="100%" stopColor={skyGradient.edge} />
                        </radialGradient>

                        {/* Glow filter for bright stars */}
                        <filter id="star-glow" x="-100%" y="-100%" width="300%" height="300%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* Planet marker glow */}
                        <filter id="planet-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* Clip path for the sky circle */}
                        <clipPath id="sky-clip">
                            <circle cx={CX} cy={CY} r={R + 2} />
                        </clipPath>
                    </defs>

                    {/* ─── Background ─── */}
                    <rect width={SIZE} height={SIZE} fill={skyGradient.edge} rx="16" />
                    <circle cx={CX} cy={CY} r={R} fill="url(#sky-bg-grad)" />

                    {/* All sky elements clipped to the horizon circle, rotated via CSS */}
                    <g clipPath="url(#sky-clip)" style={{ transformOrigin: `${CX}px ${CY}px`, transform: `rotate(${dragOffset}deg)` }}>

                        {/* ─── Constellation lines ─── */}
                        {options.showConstellationLines && CONSTELLATIONS.map(constellation =>
                            constellation.lines.map(([id1, id2], li) => {
                                const s1 = starLookup.get(id1);
                                const s2 = starLookup.get(id2);
                                if (!s1 || !s2) return null;
                                if (!s1.visible && !s2.visible) return null;
                                if (id1 === id2) return null; // Single-star placeholder

                                return (
                                    <line
                                        key={`${constellation.id}-${li}`}
                                        x1={s1.x} y1={s1.y}
                                        x2={s2.x} y2={s2.y}
                                        stroke={constellation.isZodiacal ? '#ffd700' : '#4a6fa5'}
                                        strokeWidth={constellation.isZodiacal ? 0.8 : 0.5}
                                        opacity={constellation.isZodiacal ? 0.3 : 0.2}
                                    />
                                );
                            }),
                        )}

                        {/* ─── Stars ─── */}
                        {stars.map(star => {
                            if (!star.visible) return null;

                            const color = SPECTRAL_COLORS[star.spectral] || '#fff';
                            const isBright = star.mag < 1.5;

                            return (
                                <g key={star.id}>
                                    <circle
                                        cx={star.sx} cy={star.sy}
                                        r={star.r}
                                        fill={color}
                                        opacity={Math.min(1, 0.5 + (3 - star.mag) * 0.2)}
                                        filter={isBright ? 'url(#star-glow)' : undefined}
                                    />
                                    {/* Star label */}
                                    {options.showStarLabels && star.mag < 2.0 && (
                                        <text
                                            x={star.sx + star.r + 3}
                                            y={star.sy + 1}
                                            fill="#8ab4f8"
                                            fontSize="7"
                                            fontFamily="'Segoe UI', system-ui, sans-serif"
                                            opacity="0.7"
                                        >
                                            {star.nameVi}
                                        </text>
                                    )}
                                </g>
                            );
                        })}

                        {/* ─── Constellation labels (at star midpoints) ─── */}
                        {options.showConstellationLines && CONSTELLATIONS.map(constellation => {
                            // Find the average position of all stars in this constellation
                            const cStars = stars.filter(s => s.constellation === constellation.id && s.visible);
                            if (cStars.length === 0) return null;
                            const mx = cStars.reduce((s, st) => s + st.sx, 0) / cStars.length;
                            const my = cStars.reduce((s, st) => s + st.sy, 0) / cStars.length;

                            return (
                                <text
                                    key={`label-${constellation.id}`}
                                    x={mx} y={my - 8}
                                    fill={constellation.isZodiacal ? '#ffd700' : '#6a8fc5'}
                                    fontSize="8"
                                    fontFamily="'Segoe UI', system-ui, sans-serif"
                                    fontWeight={constellation.isZodiacal ? '600' : '400'}
                                    textAnchor="middle"
                                    opacity={constellation.isZodiacal ? 0.6 : 0.35}
                                >
                                    {constellation.nameVi}
                                </text>
                            );
                        })}

                        {/* ─── Planets ─── */}
                        {projectedPlanets.map(planet => {
                            if (!planet.visible) return null;

                            const info = PLANETS[planet.id];
                            const color = PLANET_COLORS[planet.id];

                            return (
                                <g key={`planet-${planet.id}`} filter="url(#planet-glow)">
                                    {/* Outer ring */}
                                    <circle
                                        cx={planet.sx} cy={planet.sy}
                                        r={8}
                                        fill="rgba(0,0,0,0.5)"
                                        stroke={color}
                                        strokeWidth="1.5"
                                    />
                                    {/* Planet symbol */}
                                    <text
                                        x={planet.sx} y={planet.sy}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        fill={color}
                                        fontSize="10"
                                        fontWeight="bold"
                                        fontFamily="'Segoe UI', system-ui, sans-serif"
                                    >
                                        {info.symbol}
                                    </text>
                                    {/* Planet label */}
                                    {options.showPlanetLabels && (
                                        <text
                                            x={planet.sx}
                                            y={planet.sy + 15}
                                            textAnchor="middle"
                                            fill={color}
                                            fontSize="7"
                                            fontWeight="600"
                                            fontFamily="'Segoe UI', system-ui, sans-serif"
                                            opacity="0.85"
                                        >
                                            {info.name}
                                        </text>
                                    )}
                                </g>
                            );
                        })}

                    </g>

                    {/* ─── Horizon circle ─── */}
                    <circle
                        cx={CX} cy={CY} r={R}
                        fill="none"
                        stroke="#2a4a6a"
                        strokeWidth="1.5"
                        opacity="0.6"
                    />

                    {/* ─── Cardinal directions ─── */}
                    {[
                        { label: 'B', full: 'Bắc', angle: 0 },
                        { label: 'Đ', full: 'Đông', angle: 270 },
                        { label: 'N', full: 'Nam', angle: 180 },
                        { label: 'T', full: 'Tây', angle: 90 },
                    ].map(({ label, full, angle }) => {
                        const az = (angle + dragOffset) * Math.PI / 180;
                        const lx = CX - (R + 14) * Math.sin(az);
                        const ly = CY - (R + 14) * Math.cos(az);
                        // Tick mark on horizon
                        const tx1 = CX - (R - 4) * Math.sin(az);
                        const ty1 = CY - (R - 4) * Math.cos(az);
                        const tx2 = CX - (R + 4) * Math.sin(az);
                        const ty2 = CY - (R + 4) * Math.cos(az);

                        return (
                            <g key={label}>
                                <line
                                    x1={tx1} y1={ty1} x2={tx2} y2={ty2}
                                    stroke="#5a8aba"
                                    strokeWidth="1.5"
                                    opacity="0.6"
                                />
                                <text
                                    x={lx} y={ly}
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    fill="#8ab4f8"
                                    fontSize="10"
                                    fontWeight="bold"
                                    fontFamily="'Segoe UI', system-ui, sans-serif"
                                    opacity="0.8"
                                >
                                    {full}
                                </text>
                            </g>
                        );
                    })}

                    {/* ─── Zenith marker ─── */}
                    <text
                        x={CX} y={CY - R + 20}
                        textAnchor="middle"
                        fill="#5a8aba"
                        fontSize="7"
                        fontFamily="'Segoe UI', system-ui, sans-serif"
                        opacity="0.4"
                    >
                        Thiên Đỉnh ↑
                    </text>
                    <circle cx={CX} cy={CY} r={2} fill="#5a8aba" opacity="0.3" />
                </svg>
            </div>

            {/* Info footer */}
            <div className="text-center space-y-0.5">
                <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark opacity-50">
                    Bầu trời lúc {String(birthData.hour).padStart(2, '0')}:{String(birthData.minute).padStart(2, '0')},
                    {' '}{birthData.day}/{birthData.month}/{birthData.year}
                    {birthData.locationName && ` tại ${birthData.locationName}`}
                    {' '}— Mặt Trời: {sunAlt > 0 ? 'trên' : 'dưới'} chân trời ({sunAlt.toFixed(1)}°)
                </p>
                <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark opacity-30">
                    Bản đồ bầu trời được tạo bởi Lịch Việt • Phép chiếu lập thể (Stereographic)
                </p>
            </div>
        </div>
    );
}
