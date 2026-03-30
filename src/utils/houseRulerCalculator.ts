/**
 * House Ruler & Depositor Calculator
 * Computes:
 *  - Table B: For each house, the sign on its cusp & the traditional/modern ruler
 *  - Table C: For each planet/point, its depositor (ruler of the sign it's in)
 */
import type {
    PlanetPosition, CelestialPointPosition, HouseCusp,
    HouseRulerInfo, DepositorInfo, PlanetId, ZodiacSignId,
} from '../types/westernAstro';
import { ZODIAC_SIGNS } from '../data/westernAstro/zodiacSigns';
import { PLANETS } from '../data/westernAstro/planetData';

// ─── Vietnamese names for celestial points ──────────────────────────────────
const POINT_NAMES: Record<string, string> = {
    chiron: 'Chiron',
    lilith: 'Lilith',
    northNode: 'La Hầu (Long Thủ / North Node)',
    southNode: 'Kế Đô (Long Vĩ / South Node)',
    partOfFortune: 'P. of Fortune',
    vertex: 'Vertex',
    ascendant: 'Điểm Mọc (Ascendant)',
    midheaven: 'Thiên Đỉnh (Midheaven / MC)',
};

// ─── Helper: find which house a planet is in ────────────────────────────────
function findPlanetHouse(planetId: PlanetId, planets: PlanetPosition[]): number {
    const p = planets.find(pl => pl.id === planetId);
    return p?.house ?? 0;
}

/**
 * Compute house rulers — Table B
 * For each house cusp, determine the traditional & modern ruler and which house they sit in
 */
export function computeHouseRulers(
    houses: HouseCusp[],
    planets: PlanetPosition[],
): HouseRulerInfo[] {
    return houses.map(house => {
        const sign = ZODIAC_SIGNS[house.sign];
        const traditionalRuler = sign.traditionalRuler;
        const modernRuler = sign.modernRuler;

        return {
            houseNumber: house.number,
            sign: house.sign,
            traditionalRuler,
            traditionalRulerHouse: findPlanetHouse(traditionalRuler, planets),
            modernRuler,
            modernRulerHouse: findPlanetHouse(modernRuler, planets),
        };
    });
}

/**
 * Compute which houses are ruled by each planet (Table A "houses ruled" column)
 */
export function computeHousesRuledByPlanet(
    planetId: PlanetId,
    houses: HouseCusp[],
    useModern: boolean = false,
): number[] {
    return houses
        .filter(h => {
            const sign = ZODIAC_SIGNS[h.sign];
            const ruler = useModern ? sign.modernRuler : sign.traditionalRuler;
            return ruler === planetId;
        })
        .map(h => h.number);
}

/**
 * Compute depositor chain — Table C
 * For each planet/point, find the ruler of the sign it's in (traditional + modern)
 */
export function computeDepositors(
    planets: PlanetPosition[],
    points: CelestialPointPosition[],
    angles: { ascendant: { sign: ZodiacSignId; degree: number }; midheaven: { sign: ZodiacSignId; degree: number } },
    allPlanets: PlanetPosition[],
): DepositorInfo[] {
    const result: DepositorInfo[] = [];

    // Planets
    for (const planet of planets) {
        const sign = ZODIAC_SIGNS[planet.sign];
        const info = PLANETS[planet.id];
        result.push({
            bodyId: planet.id,
            bodyName: info?.name ?? planet.id,
            sign: planet.sign,
            traditionalRuler: sign.traditionalRuler,
            traditionalRulerHouse: findPlanetHouse(sign.traditionalRuler, allPlanets),
            modernRuler: sign.modernRuler,
            modernRulerHouse: findPlanetHouse(sign.modernRuler, allPlanets),
        });
    }

    // Celestial points
    for (const point of points) {
        const sign = ZODIAC_SIGNS[point.sign];
        result.push({
            bodyId: point.id,
            bodyName: point.name,
            sign: point.sign,
            traditionalRuler: sign.traditionalRuler,
            traditionalRulerHouse: findPlanetHouse(sign.traditionalRuler, allPlanets),
            modernRuler: sign.modernRuler,
            modernRulerHouse: findPlanetHouse(sign.modernRuler, allPlanets),
        });
    }

    // Angles (ASC, MC)
    const angleEntries = [
        { id: 'ascendant', name: POINT_NAMES['ascendant'], sign: angles.ascendant.sign },
        { id: 'midheaven', name: POINT_NAMES['midheaven'], sign: angles.midheaven.sign },
    ];
    for (const ang of angleEntries) {
        const sign = ZODIAC_SIGNS[ang.sign];
        result.push({
            bodyId: ang.id,
            bodyName: ang.name,
            sign: ang.sign,
            traditionalRuler: sign.traditionalRuler,
            traditionalRulerHouse: findPlanetHouse(sign.traditionalRuler, allPlanets),
            modernRuler: sign.modernRuler,
            modernRulerHouse: findPlanetHouse(sign.modernRuler, allPlanets),
        });
    }

    return result;
}
