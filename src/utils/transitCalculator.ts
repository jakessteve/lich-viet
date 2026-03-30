import type { BirthData, NatalChart, PlanetPosition, AspectType, CelestialPointPosition } from '../types/westernAstro';
import { calculateNatalChart } from './natalChartCalculator';

/**
 * Calculates a Transit Chart, which compares the planets at a given target date (transits)
 * to the natal planets (birth chart).
 */
export interface TransitAspect {
    transitPlanetId: string;
    natalPlanetId: string;
    type: AspectType;
    orb: number;
    angle: number;
    isApplying: boolean;
}

export interface TransitChartResult {
    targetDate: Date;
    transitChart: NatalChart;
    currentSignChanges: { planetId: string, sign: string }[];
    interAspects: TransitAspect[];
}

export function calculateTransits(
    natalChart: NatalChart,
    targetDate: Date = new Date()
): TransitChartResult {
    if (isNaN(targetDate.getTime())) {
        return {
            targetDate,
            transitChart: natalChart, // Fallback
            currentSignChanges: [],
            interAspects: []
        };
    }

    // To prevent timezone offset conflicts when calculating Transits, we derive the exact
    // offset from the local JS Date object since that's where getHours() is coming from.
    const localTimezoneOffset = -(targetDate.getTimezoneOffset() / 60);

    const transitData: BirthData = {
        year: targetDate.getFullYear(),
        month: targetDate.getMonth() + 1,
        day: targetDate.getDate(),
        hour: targetDate.getHours(),
        minute: targetDate.getMinutes(),
        latitude: natalChart.birthData.latitude,
        longitude: natalChart.birthData.longitude,
        timezone: localTimezoneOffset,
    };

    const transitChart = calculateNatalChart(transitData, { houseSystem: natalChart.houseSystem });

    const interAspects = calculateInterAspects(transitChart, natalChart);

    return {
        targetDate,
        transitChart,
        currentSignChanges: [],
        interAspects
    };
}

export function calculateInterAspects(predictiveChart: NatalChart, baseChart: NatalChart, maxOrb: number = 3): TransitAspect[] {
    const interAspects: TransitAspect[] = [];
    
    // Merge planets and points for calculations
    const pBodies = [...predictiveChart.planets, ...predictiveChart.points];
    const nBodies = [...baseChart.planets, ...baseChart.points];

    for (const pPlanet of pBodies) {
        for (const nPlanet of nBodies) {
            // Find major aspects between predictive planet and natal planet
            const diff = Math.abs(pPlanet.degree - nPlanet.degree);
            const shortestDiff = Math.min(diff, 360 - diff);
            
            const aspectType = detectAspect(shortestDiff, maxOrb);
            if (aspectType) {
                const orb = Math.abs(shortestDiff - getAspectExactAngle(aspectType));
                interAspects.push({
                    transitPlanetId: pPlanet.id,
                    natalPlanetId: nPlanet.id,
                    type: aspectType,
                    orb,
                    angle: shortestDiff,
                    isApplying: isApplying(pPlanet, nPlanet, shortestDiff)
                });
            }
        }
    }
    return interAspects;
}

export function getAspectExactAngle(type: AspectType): number {
    switch (type) {
        case 'conjunction': return 0;
        case 'sextile': return 60;
        case 'square': return 90;
        case 'trine': return 120;
        case 'opposition': return 180;
        default: return 0;
    }
}

export function detectAspect(diff: number, orb: number = 3): AspectType | null {
    if (diff <= orb) return 'conjunction';
    if (Math.abs(diff - 60) <= orb) return 'sextile';
    if (Math.abs(diff - 90) <= orb) return 'square';
    if (Math.abs(diff - 120) <= orb) return 'trine';
    if (Math.abs(diff - 180) <= orb) return 'opposition';
    return null;
}

export function isApplying(_pPlanet: PlanetPosition | CelestialPointPosition, _nPlanet: PlanetPosition | CelestialPointPosition, _diff: number): boolean {
    return true; 
}
