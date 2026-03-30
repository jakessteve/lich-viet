import { Origin, Horoscope } from 'circular-natal-horoscope-js';
import type {
    BirthData, NatalChart, PlanetPosition, CelestialPointPosition,
    HouseCusp, AspectData, ChartAngles,
    PlanetId, ZodiacSignId, AspectType, HouseSystemId, ChartConfig,
} from '../types/westernAstro';
import { DEFAULT_CHART_CONFIG } from '../types/westernAstro';
import { getSignFromDegree, getSignDegree, ZODIAC_SIGNS } from '../data/westernAstro/zodiacSigns';
import { calculateDignity } from './dignityCalculator';
import { analyzeChartOverview } from './chartPatternDetector';
import { computeHouseRulers, computeDepositors } from './houseRulerCalculator';

// =============================================================================
// Natal Chart Calculator — wraps CircularNatalHoroscopeJS
// Input: BirthData → Output: NatalChart
// =============================================================================

/**
 * Typed interface for the Horoscope object returned by circular-natal-horoscope-js.
 * This replaces raw `any` usages and provides type safety for property access.
 */
interface HoroscopeChartPosition {
    readonly Ecliptic?: {
        readonly DecimalDegrees?: number;
    };
    readonly StartPosition?: {
        readonly Ecliptic?: {
            readonly DecimalDegrees?: number;
        };
    };
}

interface HoroscopeCelestialBody {
    readonly key?: string;
    readonly ChartPosition?: HoroscopeChartPosition;
    readonly House?: { readonly id?: number };
    readonly isRetrograde?: boolean;
}

interface HoroscopeAspect {
    readonly point1Key?: string;
    readonly point2Key?: string;
    readonly aspectKey?: string;
    readonly angle?: number;
    readonly orb?: number;
    readonly isApplying?: boolean;
}

interface HoroscopeHouse {
    readonly ChartPosition?: HoroscopeChartPosition;
}

interface HoroscopeResponse {
    readonly CelestialBodies: { readonly all: readonly HoroscopeCelestialBody[] };
    readonly CelestialPoints?: { readonly all?: readonly HoroscopeCelestialBody[] };
    readonly Aspects?: { readonly all?: readonly HoroscopeAspect[] };
    readonly Houses: readonly HoroscopeHouse[];
    readonly Ascendant?: { readonly ChartPosition?: HoroscopeChartPosition };
    readonly Midheaven?: { readonly ChartPosition?: HoroscopeChartPosition };
}

/** Map our house system IDs to the library's expected strings */
const HOUSE_SYSTEM_MAP: Record<HouseSystemId, string> = {
    placidus: 'placidus',
    wholeSigns: 'whole-sign',
    koch: 'koch',
    equalHouse: 'equal-house',
    campanus: 'campanus',
    regiomontanus: 'regiomontanus',
    topocentric: 'topocentric',
    porphyry: 'placidus', // fallback
    alcabitius: 'placidus', // fallback
    morinus: 'placidus',   // fallback
};

/** Map library planet keys to our PlanetId */
const PLANET_KEY_MAP: Record<string, PlanetId> = {
    sun: 'sun', moon: 'moon', mercury: 'mercury', venus: 'venus', mars: 'mars',
    jupiter: 'jupiter', saturn: 'saturn', uranus: 'uranus', neptune: 'neptune', pluto: 'pluto',
};

/** Map library aspect keys to our AspectType */
const ASPECT_KEY_MAP: Record<string, AspectType> = {
    conjunction: 'conjunction', sextile: 'sextile', square: 'square',
    trine: 'trine', opposition: 'opposition', quincunx: 'quincunx',
    'semi-sextile': 'semiSextile', 'semi-square': 'semiSquare',
    sesquiquadrate: 'sesquiquadrate', quintile: 'quintile',
};

/** Map for celestial points from the library */
const POINT_KEY_MAP: Record<string, { id: string; name: string; symbol: string }> = {
    chiron: { id: 'chiron', name: 'Chiron', symbol: '⚷' },
    northnode: { id: 'northNode', name: 'La Hầu (North Node)', symbol: '☊' },
    southnode: { id: 'southNode', name: 'Kế Đô (South Node)', symbol: '☋' },
    lilith: { id: 'lilith', name: 'Lilith', symbol: '⚸' },
};

/** Map for aspect endpoints (planets + points + angles) */
const ALL_BODY_KEY_MAP: Record<string, string> = {
    ...PLANET_KEY_MAP,
    chiron: 'chiron',
    northnode: 'northNode',
    southnode: 'southNode',
    lilith: 'lilith',
    ascendant: 'ascendant',
    midheaven: 'midheaven',
};

/** Helper: decompose degree into degrees, minutes, seconds */
function decomposeSignDegree(signDeg: number): { deg: number; min: number; sec: number } {
    const deg = Math.floor(signDeg);
    const remainder = (signDeg - deg) * 60;
    const min = Math.floor(remainder);
    const sec = Math.round((remainder - min) * 60);
    return { deg, min, sec };
}

/**
 * Calculate a complete natal chart from birth data.
 */
export function calculateNatalChart(
    birthData: BirthData,
    config: Partial<ChartConfig> = {},
): NatalChart {
    if (birthData.year < 1800 || birthData.year > 2200) {
        throw new Error("Birth year must be between 1800 and 2200 to ensure mathematical stability in the ephemeris calculations.");
    }
    const cfg = { ...DEFAULT_CHART_CONFIG, ...config };

    // Create Origin (month is 0-indexed in the library)
    const origin = new Origin({
        year: birthData.year,
        month: birthData.month - 1, // Library uses 0-indexed months
        date: birthData.day,
        hour: birthData.hour,
        minute: birthData.minute,
        latitude: birthData.latitude,
        longitude: birthData.longitude,
    });

    // Create Horoscope
    const horoscope = new Horoscope({
        origin,
        houseSystem: HOUSE_SYSTEM_MAP[cfg.houseSystem] || 'placidus',
        zodiac: cfg.zodiacType,
        aspectPoints: ['bodies', 'points', 'angles'],
        aspectWithPoints: ['bodies', 'points', 'angles'],
        aspectTypes: cfg.showMinorAspects ? ['major', 'minor'] : ['major'],
        customOrbs: {
            conjunction: cfg.aspectOrbs.conjunction,
            opposition: cfg.aspectOrbs.opposition,
            trine: cfg.aspectOrbs.trine,
            square: cfg.aspectOrbs.square,
            sextile: cfg.aspectOrbs.sextile,
            quincunx: cfg.aspectOrbs.quincunx,
        },
        language: 'en', // We handle Vietnamese labels ourselves
    });

    // Extract planet positions
    const planets = extractPlanets(horoscope);

    // Extract house cusps
    const houses = extractHouses(horoscope);

    // Assign houses to planets
    assignHousesToPlanets(planets, houses);

    // Extract celestial points (Chiron, Lilith, Nodes)
    const points = extractCelestialPoints(horoscope, houses);

    // Calculate Part of Fortune manually
    const ascDeg = horoscope.Ascendant?.ChartPosition?.Ecliptic?.DecimalDegrees ?? 0;
    const sunDeg = planets.find(p => p.id === 'sun')?.degree ?? 0;
    const moonDeg = planets.find(p => p.id === 'moon')?.degree ?? 0;
    // Day chart: PoF = ASC + Moon - Sun; Night chart: ASC + Sun - Moon
    // Simple: use day formula (Sun above horizon = house 7-12 occupies top half)
    const sunHouse = planets.find(p => p.id === 'sun')?.house ?? 1;
    const isDay = sunHouse >= 7 && sunHouse <= 12;
    const pofDeg = isDay
        ? ((ascDeg + moonDeg - sunDeg + 720) % 360)
        : ((ascDeg + sunDeg - moonDeg + 720) % 360);
    const pofSign = getSignFromDegree(pofDeg);
    const pofSignDeg = getSignDegree(pofDeg);
    const pofDecomp = decomposeSignDegree(pofSignDeg);
    points.push({
        id: 'partOfFortune',
        name: 'P. of Fortune',
        symbol: '⊕',
        sign: pofSign,
        degree: pofDeg,
        signDegree: pofDecomp.deg,
        signMinute: pofDecomp.min,
        signSecond: pofDecomp.sec,
        house: determineHouse(pofDeg, houses),
        isRetrograde: false,
    });

    // Calculate Vertex (roughly: DSC projected to equator — simplified approximation)
    // Vertex ≈ ASC + 180° + correction based on latitude
    // For simplicity, use the IC-based calculation: attempt from horoscope data first
    // Note: true Vertex requires complex math; we'll provide it as the IC complement
    // This is an approximation; professional software uses full spherical trigonometry

    // Extract aspects (now includes angles + points)
    const aspects = extractAspects(horoscope);

    // Extract angles
    const angles = extractAngles(horoscope);

    // Calculate chart overview (Step 1)
    const overview = analyzeChartOverview(planets, angles);

    // Compute house rulers (Table B)
    const houseRulers = computeHouseRulers(houses, planets);

    // Compute depositors (Table C)
    const depositors = computeDepositors(planets, points, angles, planets);

    // Convenience references
    const sun = planets.find(p => p.id === 'sun')!;
    const moon = planets.find(p => p.id === 'moon')!;
    const ascendantSign = angles.ascendant.sign;

    return {
        birthData,
        planets,
        points,
        houses,
        aspects,
        angles,
        overview,
        houseSystem: cfg.houseSystem,
        zodiacType: cfg.zodiacType,
        houseRulers,
        depositors,
        sun,
        moon,
        ascendantSign,
    };
}

// ─── Extraction helpers ─────────────────────────────────────────────────────

function extractPlanets(horoscope: HoroscopeResponse): PlanetPosition[] {
    const planets: PlanetPosition[] = [];

    for (const body of horoscope.CelestialBodies.all) {
        const key = body.key?.toLowerCase();
        if (!key) continue;
        const planetId = PLANET_KEY_MAP[key];
        if (!planetId) continue;

        const degree = body.ChartPosition?.Ecliptic?.DecimalDegrees ?? 0;
        const sign = getSignFromDegree(degree);
        const signDeg = getSignDegree(degree);
        const decomp = decomposeSignDegree(signDeg);

        planets.push({
            id: planetId,
            sign,
            degree,
            signDegree: decomp.deg,
            signMinute: decomp.min,
            signSecond: decomp.sec,
            house: body.House?.id ?? 1,
            isRetrograde: body.isRetrograde ?? false,
            dignity: calculateDignity(planetId, sign),
        });
    }

    return planets;
}

function extractCelestialPoints(horoscope: HoroscopeResponse, houses: HouseCusp[]): CelestialPointPosition[] {
    const points: CelestialPointPosition[] = [];

    // From CelestialPoints (Nodes, Lilith)
    if (horoscope.CelestialPoints?.all) {
        for (const pt of horoscope.CelestialPoints.all) {
            const key = pt.key?.toLowerCase();
            if (!key) continue;
            const info = POINT_KEY_MAP[key];
            if (!info) continue;

            const degree = pt.ChartPosition?.Ecliptic?.DecimalDegrees ?? 0;
            const sign = getSignFromDegree(degree);
            const signDeg = getSignDegree(degree);
            const decomp = decomposeSignDegree(signDeg);

            points.push({
                id: info.id,
                name: info.name,
                symbol: info.symbol,
                sign,
                degree,
                signDegree: decomp.deg,
                signMinute: decomp.min,
                signSecond: decomp.sec,
                house: determineHouse(degree, houses),
                isRetrograde: pt.isRetrograde ?? false,
            });
        }
    }

    // Chiron is in CelestialBodies
    for (const body of horoscope.CelestialBodies.all) {
        const key = body.key?.toLowerCase();
        if (key === 'chiron') {
            const degree = body.ChartPosition?.Ecliptic?.DecimalDegrees ?? 0;
            const sign = getSignFromDegree(degree);
            const signDeg = getSignDegree(degree);
            const decomp = decomposeSignDegree(signDeg);

            points.push({
                id: 'chiron',
                name: 'Chiron',
                symbol: '⚷',
                sign,
                degree,
                signDegree: decomp.deg,
                signMinute: decomp.min,
                signSecond: decomp.sec,
                house: body.House?.id ?? determineHouse(degree, houses),
                isRetrograde: body.isRetrograde ?? false,
            });
        }
    }

    // Add South Node as opposite of North Node if not extracted
    const northNode = points.find(p => p.id === 'northNode');
    const hasSouthNode = points.some(p => p.id === 'southNode');
    if (northNode && !hasSouthNode) {
        const snDeg = (northNode.degree + 180) % 360;
        const snSign = getSignFromDegree(snDeg);
        const snSignDeg = getSignDegree(snDeg);
        const snDecomp = decomposeSignDegree(snSignDeg);
        points.push({
            id: 'southNode',
            name: 'Kế Đô (South Node)',
            symbol: '☋',
            sign: snSign,
            degree: snDeg,
            signDegree: snDecomp.deg,
            signMinute: snDecomp.min,
            signSecond: snDecomp.sec,
            house: determineHouse(snDeg, houses),
            isRetrograde: northNode.isRetrograde,
        });
    }

    return points;
}

function extractHouses(horoscope: HoroscopeResponse): HouseCusp[] {
    const houses: HouseCusp[] = [];

    for (let i = 0; i < horoscope.Houses.length; i++) {
        const house = horoscope.Houses[i];
        const degree = house.ChartPosition?.StartPosition?.Ecliptic?.DecimalDegrees ?? (i * 30);
        const sign = getSignFromDegree(degree);
        const signDeg = getSignDegree(degree);
        const decomp = decomposeSignDegree(signDeg);

        // Get the traditional ruler of the sign on the cusp
        const ruler = ZODIAC_SIGNS[sign]?.traditionalRuler ?? 'sun';

        houses.push({
            number: i + 1,
            sign,
            degree,
            signDegree: decomp.deg,
            signMinute: decomp.min,
            signSecond: decomp.sec,
            ruler,
        });
    }

    return houses;
}

function assignHousesToPlanets(planets: PlanetPosition[], houses: HouseCusp[]): void {
    // If the library already assigned houses, keep them.
    // Otherwise, determine house from cusps.
    for (const planet of planets) {
        if (planet.house < 1 || planet.house > 12) {
            planet.house = determineHouse(planet.degree, houses);
        }
    }
}

function determineHouse(degree: number, houses: HouseCusp[]): number {
    for (let i = 0; i < 12; i++) {
        const cusp = houses[i].degree;
        const nextCusp = houses[(i + 1) % 12].degree;

        if (nextCusp > cusp) {
            if (degree >= cusp && degree < nextCusp) return i + 1;
        } else {
            // Wraps around 360°
            if (degree >= cusp || degree < nextCusp) return i + 1;
        }
    }
    return 1;
}

function extractAspects(horoscope: HoroscopeResponse): AspectData[] {
    const aspects: AspectData[] = [];
    const seen = new Set<string>();

    for (const aspect of (horoscope.Aspects?.all ?? [])) {
        const p1 = aspect.point1Key?.toLowerCase();
        const p2 = aspect.point2Key?.toLowerCase();
        const aspectKey = aspect.aspectKey?.toLowerCase();
        if (!aspectKey || !p1 || !p2) continue;
        const type = ASPECT_KEY_MAP[aspectKey];

        if (!type) continue;

        // Map both endpoints (planets, points, and angles)
        const id1 = ALL_BODY_KEY_MAP[p1];
        const id2 = ALL_BODY_KEY_MAP[p2];
        if (!id1 || !id2) continue;

        // Deduplicate (A→B and B→A)
        const key = [id1, id2].sort().join('|') + '|' + type;
        if (seen.has(key)) continue;
        seen.add(key);

        aspects.push({
            planet1: id1,
            planet2: id2,
            type,
            angle: aspect.angle ?? 0,
            orb: aspect.orb ?? 0,
            isApplying: aspect.isApplying ?? false,
        });
    }

    return aspects;
}

function extractAngles(horoscope: HoroscopeResponse): ChartAngles {
    const ascDeg = horoscope.Ascendant?.ChartPosition?.Ecliptic?.DecimalDegrees ?? 0;
    const mcDeg = horoscope.Midheaven?.ChartPosition?.Ecliptic?.DecimalDegrees ?? 0;
    const dscDeg = (ascDeg + 180) % 360;
    const icDeg = (mcDeg + 180) % 360;

    return {
        ascendant: { sign: getSignFromDegree(ascDeg), degree: ascDeg, signDegree: Math.floor(getSignDegree(ascDeg)) },
        midheaven: { sign: getSignFromDegree(mcDeg), degree: mcDeg, signDegree: Math.floor(getSignDegree(mcDeg)) },
        descendant: { sign: getSignFromDegree(dscDeg), degree: dscDeg, signDegree: Math.floor(getSignDegree(dscDeg)) },
        imumCoeli: { sign: getSignFromDegree(icDeg), degree: icDeg, signDegree: Math.floor(getSignDegree(icDeg)) },
    };
}

// ── P3.3: Secondary Progressions & Transit Tracking ────────────

export interface ProgressedPosition {
    planet: string;
    natalDegree: number;
    progressedDegree: number;
    natalSign: string;
    progressedSign: string;
    hasChangedSign: boolean;
}

export interface SecondaryProgressionResult {
    targetAge: number;
    progressedDate: Date;
    positions: ProgressedPosition[];
    interpretation: string;
}

/**
 * P3.3: Calculate Secondary Progressions using the "day-for-a-year" method.
 *
 * Secondary progressions advance the birth chart by 1 day for each year of life.
 * For example, at age 30, the progressed chart is for birth date + 30 days.
 *
 * @param birthData - Original birth data
 * @param natalChart - The natal chart
 * @param targetAge - Age to progress to
 * @returns Progressed positions with sign-change detection
 */
export function calculateSecondaryProgressions(
    birthData: BirthData,
    natalChart: NatalChart,
    targetAge: number,
): SecondaryProgressionResult {
    // Progressed date = birth date + targetAge days
    const progressedDate = new Date(birthData.year, birthData.month - 1, birthData.day + targetAge);

    // Approximate progressed positions using solar rate (~1°/day for Sun)
    const positions: ProgressedPosition[] = [];

    // Sun progresses ~1° per year
    const natalSunDeg = natalChart.planets.find(p => p.id === 'sun')?.degree ?? 0;
    const progressedSunDeg = (natalSunDeg + targetAge * 0.9856) % 360;
    positions.push({
        planet: 'Sun (Mặt Trời)',
        natalDegree: natalSunDeg,
        progressedDegree: progressedSunDeg,
        natalSign: getSignFromDegree(natalSunDeg),
        progressedSign: getSignFromDegree(progressedSunDeg),
        hasChangedSign: getSignFromDegree(natalSunDeg) !== getSignFromDegree(progressedSunDeg),
    });

    // Moon progresses ~12°/year (fastest moving)
    const natalMoonDeg = natalChart.planets.find(p => p.id === 'moon')?.degree ?? 0;
    const progressedMoonDeg = (natalMoonDeg + targetAge * 12.19) % 360;
    positions.push({
        planet: 'Moon (Mặt Trăng)',
        natalDegree: natalMoonDeg,
        progressedDegree: progressedMoonDeg,
        natalSign: getSignFromDegree(natalMoonDeg),
        progressedSign: getSignFromDegree(progressedMoonDeg),
        hasChangedSign: getSignFromDegree(natalMoonDeg) !== getSignFromDegree(progressedMoonDeg),
    });

    // Ascendant progresses ~1° per year (solar arc)
    const natalAscDeg = natalChart.angles.ascendant.degree;
    const progressedAscDeg = (natalAscDeg + targetAge * 0.9856) % 360;
    positions.push({
        planet: 'Ascendant (Cung Mệnh)',
        natalDegree: natalAscDeg,
        progressedDegree: progressedAscDeg,
        natalSign: getSignFromDegree(natalAscDeg),
        progressedSign: getSignFromDegree(progressedAscDeg),
        hasChangedSign: getSignFromDegree(natalAscDeg) !== getSignFromDegree(progressedAscDeg),
    });

    const signChanges = positions.filter(p => p.hasChangedSign);
    const interpretation = signChanges.length > 0
        ? `Tại tuổi ${targetAge}: ${signChanges.map(p => `${p.planet} đã chuyển sang ${ZODIAC_SIGNS[p.progressedSign as ZodiacSignId]?.name || p.progressedSign}`).join(', ')}. Đây là giai đoạn chuyển đổi quan trọng trong cuộc sống.`
        : `Tại tuổi ${targetAge}: Không có hành tinh nào đổi cung. Giai đoạn ổn định, tiếp tục xu hướng hiện tại.`;

    return {
        targetAge,
        progressedDate,
        positions,
        interpretation,
    };
}
