/**
 * TuViGrid — 4×4 CSS Grid Layout for Tử Vi Chart
 * 
 * The standard Tử Vi table layout:
 * - 12 outer cells represent the 12 palaces (fixed by Earthly Branch)
 * - Center 2×2 cells are merged into CenterInfoPanel
 * - Palace positions follow counter-clockwise from Dần (bottom-left)
 * - SVG overlay draws Tam Hợp connection lines from Mệnh palace
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import PalaceCell from './PalaceCell';
import CenterInfoPanel from './CenterInfoPanel';
import type { TuViChartData, TuViPalace, ChartInput } from '../../services/tuvi/tuviTypes';

/** All 12 Earthly Branches in standard Tử Vi grid render order */
const ALL_BRANCHES = [
    'Tỵ', 'Ngọ', 'Mùi', 'Thân',
    'Thìn', 'Mão',
    'Dậu', 'Tuất',
    'Dần', 'Sửu', 'Tý', 'Hợi',
] as const;

interface TuViGridProps {
    readonly chart: TuViChartData;
    readonly input: ChartInput;
    readonly chartRef?: React.RefObject<HTMLDivElement | null>;
    readonly onPalaceClick?: (palace: TuViPalace) => void;
    readonly selectedBranch?: string;
}

/** Map Vietnamese Earthly Branch name to grid area name */
const BRANCH_TO_AREA: Record<string, string> = {
    'Tỵ': 'ty_',
    'Ngọ': 'ngo',
    'Mùi': 'mui',
    'Thân': 'than',
    'Thìn': 'thin',
    'Dậu': 'dau',
    'Mão': 'mao',
    'Tuất': 'tuat',
    'Dần': 'dan',
    'Sửu': 'suu',
    'Tý': 'ty',
    'Hợi': 'hoi',
};

/**
 * Tam Hợp (三合) triangles — groups of 3 Earthly Branches
 * that form harmonious relationships in Tử Vi astrology.
 */
const TAM_HOP_TRIANGLES: readonly string[][] = [
    ['Dần', 'Ngọ', 'Tuất'],
    ['Thân', 'Tý', 'Thìn'],
    ['Tỵ', 'Dậu', 'Sửu'],
    ['Hợi', 'Mão', 'Mùi'],
];

/** Find connections: connects to the other 2 palaces in its Tam Hợp group */
function getTamHopConnections(branch: string): string[] {
    for (const triangle of TAM_HOP_TRIANGLES) {
        if (triangle.includes(branch)) {
            return triangle.filter(b => b !== branch);
        }
    }
    return [];
}

/** Xung Chiếu (Opposite) relationships based on Earthly Branches */
const OPPOSITE_PAIRS: Record<string, string> = {
    'Tý': 'Ngọ', 'Ngọ': 'Tý',
    'Sửu': 'Mùi', 'Mùi': 'Sửu',
    'Dần': 'Thân', 'Thân': 'Dần',
    'Mão': 'Dậu', 'Dậu': 'Mão',
    'Thìn': 'Tuất', 'Tuất': 'Thìn',
    'Tỵ': 'Hợi', 'Hợi': 'Tỵ'
};

/** Get center coordinate of a DOM element relative to its offset parent */
function getCellCenter(cell: HTMLElement, container: HTMLElement): { x: number; y: number } | null {
    const cellRect = cell.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    return {
        x: cellRect.left - containerRect.left + cellRect.width / 2,
        y: cellRect.top - containerRect.top + cellRect.height / 2,
    };
}

/**
 * Sort palaces into grid order based on their Earthly Branch positions.
 * This ensures each palace renders in the correct grid cell.
 */
function getPalaceForBranch(palaces: TuViPalace[], branch: string): TuViPalace | undefined {
    return palaces.find((p) => p.earthlyBranch === branch);
}

interface LineCoord {
    x1: number; y1: number;
    x2: number; y2: number;
}

export default function TuViGrid({ chart, input, chartRef, onPalaceClick, selectedBranch }: TuViGridProps) {
    const soulBranch = chart.earthlyBranchOfSoulPalace;
    const internalGridRef = useRef<HTMLDivElement>(null);
    const gridRef = chartRef || internalGridRef;
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [connectionLines, setConnectionLines] = useState<LineCoord[]>([]);
    const [mobileScale, setMobileScale] = useState(1);
    const [gridHeight, setGridHeight] = useState<number | undefined>(undefined);

    // Dynamically scale grid to fit container on mobile
    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        const GRID_MIN_WIDTH = 700;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const w = entry.contentRect.width;
                setMobileScale(w < GRID_MIN_WIDTH ? w / GRID_MIN_WIDTH : 1);
            }
        });
        observer.observe(wrapper);
        return () => observer.disconnect();
    }, []);

    // Track grid height for wrapper sizing when scaled
    useEffect(() => {
        const grid = (gridRef as React.RefObject<HTMLDivElement>).current;
        if (!grid) return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setGridHeight(entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height);
            }
        });
        observer.observe(grid);
        return () => observer.disconnect();
    }, [gridRef]);

    // Calculate connection lines after render
    const calculateLines = useCallback(() => {
        const container = (gridRef as React.RefObject<HTMLDivElement>).current;
        const activeBranch = selectedBranch || soulBranch;
        if (!container || !activeBranch) return;

        const connectedBranches = getTamHopConnections(activeBranch);
        if (connectedBranches.length === 0) return;

        // Find the active palace cell
        const soulCell = container.querySelector(`[data-branch="${activeBranch}"]`) as HTMLElement;
        if (!soulCell) return;

        const soulCenter = getCellCenter(soulCell, container);
        if (!soulCenter) return;

        // getBoundingClientRect returns scaled (visual) coords, but the SVG
        // is rendered inside the scaled grid and needs unscaled coords.
        const scale = mobileScale || 1;

        const lines: LineCoord[] = [];

        // Draw lines from Mệnh to each connected palace
        for (const branch of connectedBranches) {
            const targetCell = container.querySelector(`[data-branch="${branch}"]`) as HTMLElement;
            if (!targetCell) continue;
            const targetCenter = getCellCenter(targetCell, container);
            if (!targetCenter) continue;

            lines.push({
                x1: soulCenter.x / scale, y1: soulCenter.y / scale,
                x2: targetCenter.x / scale, y2: targetCenter.y / scale,
            });
        }

        // Also draw line between the two connected palaces (completing the triangle)
        if (connectedBranches.length === 2) {
            const cell1 = container.querySelector(`[data-branch="${connectedBranches[0]}"]`) as HTMLElement;
            const cell2 = container.querySelector(`[data-branch="${connectedBranches[1]}"]`) as HTMLElement;
            if (cell1 && cell2) {
                const center1 = getCellCenter(cell1, container);
                const center2 = getCellCenter(cell2, container);
                if (center1 && center2) {
                    lines.push({
                        x1: center1.x / scale, y1: center1.y / scale,
                        x2: center2.x / scale, y2: center2.y / scale,
                    });
                }
            }
        }

        setConnectionLines(lines);
    }, [soulBranch, selectedBranch, gridRef, mobileScale]);

    useEffect(() => {
        // Recalculate on mount and window resize
        const timer = setTimeout(calculateLines, 100);
        window.addEventListener('resize', calculateLines);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', calculateLines);
        };
    }, [calculateLines]);

    // Recalculate lines when scale changes
    useEffect(() => {
        if (mobileScale < 1) {
            const timer = setTimeout(calculateLines, 150);
            return () => clearTimeout(timer);
        }
    }, [mobileScale, calculateLines]);

    const needsScale = mobileScale < 1;

    return (
        <div
            className="tuvi-grid-wrapper"
            ref={wrapperRef}
            style={needsScale && gridHeight ? { height: gridHeight * mobileScale } : undefined}
        >
            <div
                ref={gridRef as React.RefObject<HTMLDivElement>}
                className="tuvi-grid"
                role="table"
                aria-label="Lá Số Tử Vi"
                style={{
                    position: 'relative',
                    ...(needsScale ? {
                        transform: `scale(${mobileScale})`,
                        transformOrigin: 'top left',
                    } : {}),
                }}
            >
                {/* ═══ SVG Connection Lines Overlay ═══ */}
                {connectionLines.length > 0 && (
                    <svg className="tuvi-connection-svg" aria-hidden="true">
                        {connectionLines.map((line, idx) => (
                            <line
                                key={idx}
                                className="tuvi-connection-line"
                                x1={line.x1} y1={line.y1}
                                x2={line.x2} y2={line.y2}
                            />
                        ))}
                    </svg>
                )}

                {/* All 12 palaces rendered in grid area order */}
                {ALL_BRANCHES.map((branch) => {
                    const palace = getPalaceForBranch(chart.palaces, branch);
                    const area = BRANCH_TO_AREA[branch];
                    if (!palace) return <div key={branch} className="tuvi-palace tuvi-palace-empty" style={{ gridArea: area }} />;
                    
                    const activeBranch = selectedBranch || soulBranch;
                    const trineBranches = activeBranch ? getTamHopConnections(activeBranch) : [];
                    const oppositeBranch = activeBranch ? OPPOSITE_PAIRS[activeBranch] : undefined;
                    
                    const _isSelected = branch === activeBranch;
                    const _isTrine = trineBranches.includes(branch);
                    const _isOpposite = branch === oppositeBranch;
                    const _isDimmed = !!activeBranch && !_isSelected && !_isTrine && !_isOpposite;

                    return (
                        <PalaceCell
                            key={branch}
                            palace={palace}
                            gridArea={area}
                            isMenhPalace={branch === soulBranch && !!palace.isSoulPalace}
                            isSelected={_isSelected}
                            isTrine={_isTrine}
                            isOpposite={_isOpposite}
                            isDimmed={_isDimmed}
                            onClick={() => onPalaceClick?.(palace)}
                        />
                    );
                })}

                {/* Center Panel (2×2) */}
                <div style={{ gridArea: 'center' }}>
                    <CenterInfoPanel chart={chart} input={input} />
                </div>
            </div>
        </div>
    );
}

