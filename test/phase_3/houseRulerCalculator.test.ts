import { computeHouseRulers, computeHousesRuledByPlanet, computeDepositors } from '../../src/utils/houseRulerCalculator';
import type { PlanetPosition, HouseCusp, CelestialPointPosition, ZodiacSignId } from '../../src/types/westernAstro';

// Helper fixtures
function makeHouseCusp(number: number, sign: ZodiacSignId, degree: number): HouseCusp {
    return { number, sign, degree };
}

function makePlanet(id: string, sign: ZodiacSignId, degree: number, house: number): PlanetPosition {
    return {
        id: id as unknown as PlanetPosition['id'],
        name: id,
        sign,
        degree,
        house,
        isRetrograde: false,
        dignity: 'peregrine',
    } as PlanetPosition;
}

describe('House Ruler Calculator', () => {
    const houses: HouseCusp[] = [
        makeHouseCusp(1, 'aries', 0),
        makeHouseCusp(2, 'taurus', 30),
        makeHouseCusp(3, 'gemini', 60),
        makeHouseCusp(4, 'cancer', 90),
        makeHouseCusp(5, 'leo', 120),
        makeHouseCusp(6, 'virgo', 150),
        makeHouseCusp(7, 'libra', 180),
        makeHouseCusp(8, 'scorpio', 210),
        makeHouseCusp(9, 'sagittarius', 240),
        makeHouseCusp(10, 'capricorn', 270),
        makeHouseCusp(11, 'aquarius', 300),
        makeHouseCusp(12, 'pisces', 330),
    ];

    const planets: PlanetPosition[] = [
        makePlanet('sun', 'leo', 130, 5),
        makePlanet('moon', 'cancer', 100, 4),
        makePlanet('mercury', 'virgo', 165, 6),
        makePlanet('venus', 'libra', 195, 7),
        makePlanet('mars', 'aries', 15, 1),
        makePlanet('jupiter', 'sagittarius', 255, 9),
        makePlanet('saturn', 'capricorn', 285, 10),
    ];

    describe('computeHouseRulers', () => {
        it('returns 12 house ruler entries', () => {
            const rulers = computeHouseRulers(houses, planets);
            expect(rulers.length).toBe(12);
        });

        it('maps Aries cusp to Mars as traditional ruler', () => {
            const rulers = computeHouseRulers(houses, planets);
            const house1 = rulers.find((r) => r.houseNumber === 1);
            expect(house1).toBeDefined();
            expect(house1!.sign).toBe('aries');
            expect(house1!.traditionalRuler).toBe('mars');
        });

        it('provides the house where the ruler planet sits', () => {
            const rulers = computeHouseRulers(houses, planets);
            const house1 = rulers.find((r) => r.houseNumber === 1);
            // Mars is in house 1
            expect(house1!.traditionalRulerHouse).toBe(1);
        });

        it('maps Leo cusp to Sun', () => {
            const rulers = computeHouseRulers(houses, planets);
            const house5 = rulers.find((r) => r.houseNumber === 5);
            expect(house5!.traditionalRuler).toBe('sun');
        });
    });

    describe('computeHousesRuledByPlanet', () => {
        it('Mars rules Aries and Scorpio houses', () => {
            const ruledHouses = computeHousesRuledByPlanet('mars', houses, false);
            expect(ruledHouses).toContain(1);  // Aries
            expect(ruledHouses).toContain(8);  // Scorpio
        });

        it('Sun rules Leo house', () => {
            const ruledHouses = computeHousesRuledByPlanet('sun', houses, false);
            expect(ruledHouses).toContain(5);  // Leo
        });

        it('returns empty for a planet that rules no house cusps', () => {
            // In this fixture, no house cusp is in a sign ruled solely by... 
            // Actually all planets rule at least one sign, so test a different scenario
            const ruledByNeptune = computeHousesRuledByPlanet('neptune', houses, false);
            // Neptune traditionally doesn't rule any sign (Pisces is ruled by Jupiter traditionally)
            expect(ruledByNeptune.length).toBe(0);
        });
    });

    describe('computeDepositors', () => {
        const points: CelestialPointPosition[] = [];
        const angles = {
            ascendant: { sign: 'aries' as ZodiacSignId, degree: 0 },
            midheaven: { sign: 'capricorn' as ZodiacSignId, degree: 270 },
        };

        it('returns depositors for all planets + angles', () => {
            const depositors = computeDepositors(planets, points, angles, planets);
            // 7 planets + 0 points + 2 angles = 9
            expect(depositors.length).toBe(9);
        });

        it('Sun in Leo has Sun as its own ruler (domicile)', () => {
            const depositors = computeDepositors(planets, points, angles, planets);
            const sunDep = depositors.find((d) => d.bodyId === 'sun');
            expect(sunDep).toBeDefined();
            expect(sunDep!.sign).toBe('leo');
            expect(sunDep!.traditionalRuler).toBe('sun');
        });

        it('Ascendant in Aries has Mars as traditional ruler', () => {
            const depositors = computeDepositors(planets, points, angles, planets);
            const ascDep = depositors.find((d) => d.bodyId === 'ascendant');
            expect(ascDep).toBeDefined();
            expect(ascDep!.traditionalRuler).toBe('mars');
        });
    });
});
