// =============================================================================
// Western Astrology Type Definitions — Chiêm Tinh Module
// =============================================================================

// ─── Enums ──────────────────────────────────────────────────────────────────

export type ZodiacSignId =
    | 'aries' | 'taurus' | 'gemini' | 'cancer'
    | 'leo' | 'virgo' | 'libra' | 'scorpio'
    | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';

export type PlanetId =
    | 'sun' | 'moon' | 'mercury' | 'venus' | 'mars'
    | 'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto';

export type PointId =
    | 'northNode' | 'southNode' | 'chiron' | 'lilith'
    | 'partOfFortune' | 'vertex'
    | 'ceres' | 'pallas' | 'juno' | 'vesta';

export type CelestialBodyId = PlanetId | PointId;

export type HouseSystemId =
    | 'placidus' | 'wholeSigns' | 'koch' | 'equalHouse'
    | 'campanus' | 'regiomontanus' | 'topocentric'
    | 'porphyry' | 'alcabitius' | 'morinus';

export type ZodiacType = 'tropical' | 'sidereal';

export type Element = 'fire' | 'earth' | 'air' | 'water';
export type Quality = 'cardinal' | 'fixed' | 'mutable';
export type Polarity = 'yang' | 'yin';

export type AspectType =
    | 'conjunction' | 'sextile' | 'square' | 'trine' | 'opposition' | 'quincunx'
    | 'semiSextile' | 'semiSquare' | 'sesquiquadrate' | 'quintile';

export type DignityState = 'domicile' | 'exaltation' | 'detriment' | 'fall' | 'peregrine';

export type ChartPatternType =
    | 'bowl' | 'bucket' | 'locomotive' | 'splash'
    | 'bundle' | 'seesaw' | 'splay';

export type AspectPatternType =
    | 'grandTrine' | 'tSquare' | 'grandCross'
    | 'stellium' | 'yod' | 'kite' | 'mysticRectangle';

export interface DetectedPattern {
    type: AspectPatternType;
    involvedBodies: string[];
    description: string;
}

// ─── Data Structures ────────────────────────────────────────────────────────

export interface ZodiacSign {
    id: ZodiacSignId;
    name: string;         // Vietnamese name (e.g., "Bạch Dương")
    symbol: string;       // Unicode symbol (e.g., "♈")
    element: Element;
    quality: Quality;
    polarity: Polarity;
    traditionalRuler: PlanetId;
    modernRuler: PlanetId;
    degreeStart: number;  // 0-360
    degreeEnd: number;
    keywords: string[];   // Vietnamese keywords
}

export interface PlanetInfo {
    id: PlanetId;
    name: string;          // Vietnamese name
    symbol: string;        // Unicode symbol
    domain: string;        // Vietnamese description
    domicile: ZodiacSignId[];
    exaltation: ZodiacSignId[];
    detriment: ZodiacSignId[];
    fall: ZodiacSignId[];
    isPersonal: boolean;
    isSocial: boolean;
    isOuter: boolean;
}

export interface HouseInfo {
    number: number;        // 1-12
    name: string;          // Vietnamese name (e.g., "Nhà 1")
    lifeDomain: string;    // Vietnamese description
    tuViEquivalent: string; // Tử Vi palace equivalent
    keywords: string[];
}

// ─── Calculation Results ────────────────────────────────────────────────────

export interface BirthData {
    year: number;
    month: number;  // 1-12
    day: number;
    hour: number;   // 0-23
    minute: number; // 0-59
    latitude: number;
    longitude: number;
    timezone: number; // UTC offset in hours (e.g., 7 for Vietnam)
    name?: string;
    gender?: 'male' | 'female';
    locationName?: string;
}

export interface PlanetPosition {
    id: PlanetId;
    sign: ZodiacSignId;
    degree: number;       // Absolute degree 0-360
    signDegree: number;   // Degree within sign 0-30
    signMinute: number;   // Arc minute within degree
    signSecond: number;   // Arc second within minute
    house: number;        // House number 1-12
    isRetrograde: boolean;
    dignity: DignityState;
}

export interface CelestialPointPosition {
    id: string;            // e.g. 'chiron', 'lilith', 'northNode', 'southNode', 'partOfFortune', 'vertex'
    name: string;          // Vietnamese name
    symbol: string;        // Unicode symbol
    sign: ZodiacSignId;
    degree: number;        // Absolute degree 0-360
    signDegree: number;
    signMinute: number;
    signSecond: number;
    house: number;
    isRetrograde: boolean;
}

export interface HouseCusp {
    number: number;        // 1-12
    sign: ZodiacSignId;
    degree: number;        // Absolute degree 0-360
    signDegree: number;    // Degree within sign 0-30
    signMinute: number;    // Arc minute within degree
    signSecond: number;    // Arc second within minute
    ruler: PlanetId;       // Traditional ruler of the sign on cusp
}

export interface AspectData {
    planet1: string;       // PlanetId or point/angle id
    planet2: string;       // PlanetId or point/angle id
    type: AspectType;
    angle: number;         // Exact angle in degrees
    orb: number;           // Difference from perfect aspect
    isApplying: boolean;   // Getting closer vs separating
}

export interface HouseRulerInfo {
    houseNumber: number;
    sign: ZodiacSignId;
    traditionalRuler: PlanetId;
    traditionalRulerHouse: number;
    modernRuler: PlanetId;
    modernRulerHouse: number;
}

export interface DepositorInfo {
    bodyId: string;        // PlanetId or point id
    bodyName: string;
    sign: ZodiacSignId;
    traditionalRuler: PlanetId;
    traditionalRulerHouse: number;
    modernRuler: PlanetId;
    modernRulerHouse: number;
}

export interface ChartAngles {
    ascendant: { sign: ZodiacSignId; degree: number; signDegree: number };
    midheaven: { sign: ZodiacSignId; degree: number; signDegree: number };
    descendant: { sign: ZodiacSignId; degree: number; signDegree: number };
    imumCoeli: { sign: ZodiacSignId; degree: number; signDegree: number };
}

export interface ElementBalance {
    fire: number;
    earth: number;
    air: number;
    water: number;
}

export interface QualityBalance {
    cardinal: number;
    fixed: number;
    mutable: number;
}

export interface ChartOverview {
    pattern: ChartPatternType | null;
    patternDescription: string;
    elementBalance: ElementBalance;
    qualityBalance: QualityBalance;
    polarityBalance: { yang: number; yin: number };
    dominantPlanet: PlanetId | null;
    dominantSign: ZodiacSignId | null;
    dominantElement: Element | null;
    dominantQuality: Quality | null;
}

export interface NatalChart {
    birthData: BirthData;
    planets: PlanetPosition[];
    points: CelestialPointPosition[];  // Chiron, Lilith, Nodes, PoF, Vertex
    houses: HouseCusp[];
    aspects: AspectData[];
    angles: ChartAngles;
    overview: ChartOverview;
    houseSystem: HouseSystemId;
    zodiacType: ZodiacType;
    houseRulers: HouseRulerInfo[];     // Table B
    depositors: DepositorInfo[];       // Table C

    // Convenience accessors
    sun: PlanetPosition;
    moon: PlanetPosition;
    ascendantSign: ZodiacSignId;
}

// ─── Interpretation ─────────────────────────────────────────────────────────

export interface InterpretationEntry {
    key: string;           // e.g., "sun-in-aries"
    title: string;         // Vietnamese title
    body: string;          // Vietnamese interpretation text
    keywords: string[];    // Short tags
}

export interface InterpretationResult {
    big3Summary: string;
    planetInterpretations: InterpretationEntry[];   // Planet-in-Sign
    houseInterpretations: InterpretationEntry[];    // Planet-in-House
    houseCuspInterpretations: InterpretationEntry[]; // Sign-on-House-Cusp
    aspectInterpretations: InterpretationEntry[];   // Aspect pair texts
    patternInterpretations: InterpretationEntry[];  // Detected pattern texts
    detectedPatterns: DetectedPattern[];            // Raw detected patterns
    chartOverviewText: string;
}

// ─── Configuration ──────────────────────────────────────────────────────────

export interface ChartConfig {
    houseSystem: HouseSystemId;
    zodiacType: ZodiacType;
    aspectOrbs: Record<AspectType, number>;
    showMinorAspects: boolean;
    language: 'vi';
}

export const DEFAULT_CHART_CONFIG: ChartConfig = {
    houseSystem: 'wholeSigns',
    zodiacType: 'tropical',
    aspectOrbs: {
        conjunction: 8,
        sextile: 6,
        square: 7,
        trine: 8,
        opposition: 8,
        quincunx: 3,
        semiSextile: 2,
        semiSquare: 2,
        sesquiquadrate: 2,
        quintile: 2,
    },
    showMinorAspects: false,
    language: 'vi',
};
