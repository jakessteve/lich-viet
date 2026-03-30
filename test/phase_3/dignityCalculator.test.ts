import { calculateDignity, dignityScore } from '../../src/utils/dignityCalculator';
import type { DignityState } from '../../src/types/westernAstro';

describe('Dignity Calculator', () => {
    describe('calculateDignity', () => {
        it('returns domicile for Sun in Leo', () => {
            expect(calculateDignity('sun', 'leo')).toBe('domicile');
        });

        it('returns domicile for Moon in Cancer', () => {
            expect(calculateDignity('moon', 'cancer')).toBe('domicile');
        });

        it('returns exaltation for Sun in Aries', () => {
            expect(calculateDignity('sun', 'aries')).toBe('exaltation');
        });

        it('returns detriment for Sun in Aquarius', () => {
            expect(calculateDignity('sun', 'aquarius')).toBe('detriment');
        });

        it('returns fall for Sun in Libra', () => {
            expect(calculateDignity('sun', 'libra')).toBe('fall');
        });

        it('returns peregrine for Sun in Gemini', () => {
            expect(calculateDignity('sun', 'gemini')).toBe('peregrine');
        });

        it('returns peregrine for unknown planet', () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            expect(calculateDignity('nonexistent' as any, 'aries')).toBe('peregrine');
        });

        // Mars dignities
        it('returns domicile for Mars in Aries', () => {
            expect(calculateDignity('mars', 'aries')).toBe('domicile');
        });

        it('returns domicile for Mars in Scorpio', () => {
            expect(calculateDignity('mars', 'scorpio')).toBe('domicile');
        });

        // Venus dignities
        it('returns domicile for Venus in Taurus', () => {
            expect(calculateDignity('venus', 'taurus')).toBe('domicile');
        });

        it('returns domicile for Venus in Libra', () => {
            expect(calculateDignity('venus', 'libra')).toBe('domicile');
        });

        // Jupiter and Saturn
        it('returns domicile for Jupiter in Sagittarius', () => {
            expect(calculateDignity('jupiter', 'sagittarius')).toBe('domicile');
        });

        it('returns domicile for Saturn in Capricorn', () => {
            expect(calculateDignity('saturn', 'capricorn')).toBe('domicile');
        });
    });

    describe('dignityScore', () => {
        const expectedScores: [DignityState, number][] = [
            ['domicile', 5],
            ['exaltation', 4],
            ['peregrine', 0],
            ['detriment', -3],
            ['fall', -4],
        ];

        expectedScores.forEach(([state, score]) => {
            it(`returns ${score} for ${state}`, () => {
                expect(dignityScore(state)).toBe(score);
            });
        });
    });
});
