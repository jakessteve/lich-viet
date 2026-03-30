import type { PlanetId, ZodiacSignId, DignityState } from '../types/westernAstro';
import { PLANETS } from '../data/westernAstro/planetData';

// =============================================================================
// Essential Dignity Calculator
// Determines how "strong" a planet is based on its zodiac sign position
// =============================================================================

/**
 * Calculate the Essential Dignity state for a planet in a given sign.
 * Order of precedence: Domicile → Exaltation → Detriment → Fall → Peregrine
 */
export function calculateDignity(planetId: PlanetId, signId: ZodiacSignId): DignityState {
    const planet = PLANETS[planetId];
    if (!planet) return 'peregrine';

    if (planet.domicile.includes(signId)) return 'domicile';
    if (planet.exaltation.includes(signId)) return 'exaltation';
    if (planet.detriment.includes(signId)) return 'detriment';
    if (planet.fall.includes(signId)) return 'fall';
    return 'peregrine';
}

/**
 * Get a numeric score for dignity (useful for dominant planet calculation).
 * Domicile = +5, Exaltation = +4, Peregrine = 0, Detriment = -3, Fall = -4
 */
export function dignityScore(state: DignityState): number {
    switch (state) {
        case 'domicile': return 5;
        case 'exaltation': return 4;
        case 'peregrine': return 0;
        case 'detriment': return -3;
        case 'fall': return -4;
    }
}
