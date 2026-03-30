/**
 * Type declarations for circular-natal-horoscope-js
 * Partial stubs based on actual API usage in natalChartCalculator.ts
 */
declare module 'circular-natal-horoscope-js' {

    interface OriginInput {
        year: number;
        month: number;   // 0-indexed
        date: number;
        hour: number;
        minute: number;
        latitude: number;
        longitude: number;
    }

    interface EclipticPosition {
        DecimalDegrees: number;
    }

    interface ChartPosition {
        Ecliptic?: EclipticPosition;
    }

    interface HouseRef {
        id: number;
    }

    interface CelestialBody {
        key: string;
        ChartPosition?: ChartPosition;
        House?: HouseRef;
        isRetrograde?: boolean;
    }

    interface CelestialBodiesCollection {
        all: CelestialBody[];
    }

    interface CelestialPoint {
        key: string;
        ChartPosition?: ChartPosition;
        isRetrograde?: boolean;
    }

    interface CelestialPointsCollection {
        all: CelestialPoint[];
    }

    interface HouseStartPosition {
        Ecliptic?: EclipticPosition;
    }

    interface HouseChartPosition {
        StartPosition?: HouseStartPosition;
    }

    interface HouseData {
        ChartPosition?: HouseChartPosition;
    }

    interface AspectEntry {
        point1Key?: string;
        point2Key?: string;
        aspectKey?: string;
        angle?: number;
        orb?: number;
        isApplying?: boolean;
    }

    interface AspectsCollection {
        all: AspectEntry[];
    }

    interface AnglePoint {
        ChartPosition?: ChartPosition;
    }

    interface HoroscopeConfig {
        origin: Origin;
        houseSystem?: string;
        zodiac?: string;
        aspectPoints?: string[];
        aspectWithPoints?: string[];
        aspectTypes?: string[];
        customOrbs?: Record<string, number>;
        language?: string;
    }

    export class Origin {
        constructor(input: OriginInput);
    }

    export class Horoscope {
        constructor(config: HoroscopeConfig);
        CelestialBodies: CelestialBodiesCollection;
        CelestialPoints?: CelestialPointsCollection;
        Houses: HouseData[];
        Aspects?: AspectsCollection;
        Ascendant?: AnglePoint;
        Midheaven?: AnglePoint;
    }
}
