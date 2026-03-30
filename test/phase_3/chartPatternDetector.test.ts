import { analyzeChartOverview } from '../../src/utils/chartPatternDetector';
import type { PlanetPosition, ZodiacSignId, DignityState } from '../../src/types/westernAstro';

// Helper to create minimal planet position objects
function makePlanet(
    id: string,
    sign: ZodiacSignId,
    degree: number,
    house: number = 1,
    dignity: DignityState = 'peregrine',
): PlanetPosition {
    return {
        id: id as unknown as PlanetPosition['id'],
        name: id,
        sign,
        degree,
        house,
        isRetrograde: false,
        dignity,
    } as PlanetPosition;
}

describe('Chart Pattern Detector', () => {
    describe('analyzeChartOverview', () => {
        it('returns a valid overview structure', () => {
            const planets: PlanetPosition[] = [
                makePlanet('sun', 'aries', 15, 1),
                makePlanet('moon', 'taurus', 45, 2),
                makePlanet('mercury', 'gemini', 75, 3),
                makePlanet('venus', 'cancer', 105, 4),
                makePlanet('mars', 'leo', 145, 5),
                makePlanet('jupiter', 'virgo', 165, 6),
                makePlanet('saturn', 'libra', 195, 7),
            ];

            const overview = analyzeChartOverview(planets);

            expect(overview.elementBalance).toBeDefined();
            expect(overview.qualityBalance).toBeDefined();
            expect(overview.polarityBalance).toBeDefined();
            expect(overview.dominantPlanet).toBeDefined();
            expect(overview.dominantSign).toBeDefined();
            expect(overview.dominantElement).toBeDefined();
            expect(overview.dominantQuality).toBeDefined();
        });

        it('counts element balance correctly', () => {
            const planets: PlanetPosition[] = [
                makePlanet('sun', 'aries', 10, 1),     // fire
                makePlanet('moon', 'leo', 130, 5),     // fire
                makePlanet('mercury', 'taurus', 40, 2), // earth
                makePlanet('venus', 'cancer', 100, 4),  // water
                makePlanet('mars', 'scorpio', 220, 8),  // water
                makePlanet('jupiter', 'gemini', 70, 3), // air
                makePlanet('saturn', 'libra', 190, 7),  // air
            ];

            const overview = analyzeChartOverview(planets);
            expect(overview.elementBalance.fire).toBe(2);
            expect(overview.elementBalance.earth).toBe(1);
            expect(overview.elementBalance.water).toBe(2);
            expect(overview.elementBalance.air).toBe(2);
        });

        it('detects bundle pattern when all planets within ~120°', () => {
            // All planets clustered in 0-100°
            const planets: PlanetPosition[] = [
                makePlanet('sun', 'aries', 5, 1),
                makePlanet('moon', 'aries', 20, 1),
                makePlanet('mercury', 'taurus', 35, 2),
                makePlanet('venus', 'taurus', 50, 2),
                makePlanet('mars', 'gemini', 65, 3),
                makePlanet('jupiter', 'gemini', 80, 3),
                makePlanet('saturn', 'cancer', 95, 4),
            ];

            const overview = analyzeChartOverview(planets);
            expect(overview.pattern).toBe('bundle');
        });

        it('detects splash when planets evenly distributed', () => {
            // Spread around the chart evenly (~50° apart)
            const planets: PlanetPosition[] = [
                makePlanet('sun', 'aries', 0, 1),
                makePlanet('moon', 'taurus', 50, 2),
                makePlanet('mercury', 'cancer', 100, 4),
                makePlanet('venus', 'virgo', 150, 6),
                makePlanet('mars', 'scorpio', 200, 8),
                makePlanet('jupiter', 'capricorn', 250, 10),
                makePlanet('saturn', 'pisces', 310, 12),
            ];

            const overview = analyzeChartOverview(planets);
            expect(overview.pattern).toBe('splash');
        });

        it('handles small planet arrays (returns null pattern)', () => {
            const planets: PlanetPosition[] = [
                makePlanet('sun', 'aries', 15, 1),
                makePlanet('moon', 'taurus', 45, 2),
            ];

            const overview = analyzeChartOverview(planets);
            expect(overview.pattern).toBeNull();
        });

        it('identifies dominant planet based on dignity score', () => {
            const planets: PlanetPosition[] = [
                makePlanet('sun', 'leo', 130, 5, 'domicile'),   // dignity +5
                makePlanet('moon', 'cancer', 100, 4, 'domicile'), // dignity +5
                makePlanet('mercury', 'gemini', 70, 3, 'domicile'), // dignity +5
                makePlanet('venus', 'scorpio', 220, 8, 'detriment'), // dignity -3
                makePlanet('mars', 'cancer', 105, 4, 'fall'),    // dignity -4
                makePlanet('jupiter', 'sagittarius', 260, 9, 'domicile'), // dignity +5
                makePlanet('saturn', 'leo', 135, 5, 'detriment'), // dignity -3
            ];

            const overview = analyzeChartOverview(planets);
            // One of the domicile planets should be dominant
            expect(['sun', 'moon', 'mercury', 'jupiter']).toContain(overview.dominantPlanet);
        });
    });
});
