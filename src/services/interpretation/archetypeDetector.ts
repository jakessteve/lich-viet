/**
 * Archetype Detector — Matches chart data against 50 archetypes.
 *
 * Scoring algorithm that evaluates each archetype's criteria against
 * the user's chart data for both Tử Vi and Chiêm Tinh systems.
 */

import type { Archetype, AstrologySystem, BrightnessLevel, TuViMatchCriteria, ChiemTinhMatchCriteria } from './types';
import { ARCHETYPE_LIBRARY, FALLBACK_ARCHETYPE } from '../../data/interpretation/archetypeLibrary';

// ═══════════════════════════════════════════════════════════════════
// Brightness Utilities
// ═══════════════════════════════════════════════════════════════════

const BRIGHTNESS_RANK: Record<string, number> = {
    '庙': 3, '旺': 3, 'Miếu': 3, 'Vượng': 3,
    '得': 2, '利': 2, '平': 2, 'Đắc': 2, 'Lợi': 2, 'Bình': 2,
    '不': 1, '陷': 1, 'Bất': 1, 'Hãm': 1,
    '': 0,
};

const BRIGHTNESS_LEVEL_RANK: Record<BrightnessLevel, number> = {
    mieuVuong: 3,
    dacBinh: 2,
    ham: 1,
};

function getBrightnessRank(brightness: string): number {
    return BRIGHTNESS_RANK[brightness] ?? 0;
}

function meetsBrightnessMin(starBrightness: string, minLevel?: BrightnessLevel): boolean {
    if (!minLevel) return true;
    return getBrightnessRank(starBrightness) >= BRIGHTNESS_LEVEL_RANK[minLevel];
}

// ═══════════════════════════════════════════════════════════════════
// Tử Vi Chart Interface (minimal — avoids coupling to full TuViChartData)
// ═══════════════════════════════════════════════════════════════════

export interface TuViChartSummary {
    palaces: {
        name: string;
        majorStars: { name: string; brightness: string }[];
        /** Minor stars (sao phụ tinh) */
        minorStars?: string[];
        /** Adjective/modifier stars (sao phụ trợ) */
        adjectiveStars?: string[];
        /** Trường Sinh 12-phase stage (e.g., Trường Sinh, Đế Vượng, Mộ, Tuyệt) */
        changsheng12?: string;
        /** Earthly Branch of this palace for đối cung calculation */
        earthlyBranch?: string;
        /** Stars with Tứ Hóa transformations */
        mutagenStars?: { name: string; mutagen: string }[];
        /** Tuần Không marker */
        hasTuanKhong?: boolean;
        /** Triệt Không marker */
        hasTrietKhong?: boolean;
    }[];
    detectedPatterns?: string[];
    cucElement?: string;
    /** Bureau-Mệnh relationship (e.g., "Cục sinh Mệnh") */
    cucMenhRelation?: string;
}

// ═══════════════════════════════════════════════════════════════════
// Chiêm Tinh Chart Interface (minimal)
// ═══════════════════════════════════════════════════════════════════

export interface ChiemTinhChartSummary {
    placements: {
        planet: string;
        sign: string;
        house: number;
    }[];
    detectedPatterns?: string[];
    dominantElement?: string;
    dominantModality?: string;
}

// ═══════════════════════════════════════════════════════════════════
// Scoring Functions
// ═══════════════════════════════════════════════════════════════════

function scoreTuViCriteria(
    criteria: TuViMatchCriteria | undefined,
    chart: TuViChartSummary,
): number {
    if (!criteria) return 0;
    let score = 0;
    const allStars = chart.palaces.flatMap(p =>
        p.majorStars.map(s => ({ ...s, palace: p.name }))
    );

    // Required stars
    if (criteria.requiredStars) {
        for (const req of criteria.requiredStars) {
            const found = allStars.find(s => {
                const nameMatch = s.name === req.star;
                const brightnessOk = meetsBrightnessMin(s.brightness, req.minBrightness);
                const palaceOk = !req.palace || s.palace.includes(req.palace);
                return nameMatch && brightnessOk && palaceOk;
            });
            if (found) {
                score += 10;
                // Bonus for high brightness
                if (getBrightnessRank(found.brightness) >= 3) score += 3;
            } else {
                score -= 5; // Penalty for missing required star
            }
        }
    }

    // Required patterns
    if (criteria.requiredPatterns && chart.detectedPatterns) {
        for (const pattern of criteria.requiredPatterns) {
            if (chart.detectedPatterns.includes(pattern)) {
                score += 8;
            }
        }
    }

    // Required elements
    if (criteria.requiredElements && chart.cucElement) {
        for (const el of criteria.requiredElements) {
            if (chart.cucElement.includes(el)) score += 5;
        }
    }

    return score;
}

function scoreChiemTinhCriteria(
    criteria: ChiemTinhMatchCriteria | undefined,
    chart: ChiemTinhChartSummary,
): number {
    if (!criteria) return 0;
    let score = 0;

    // Required placements
    if (criteria.requiredPlacements) {
        for (const req of criteria.requiredPlacements) {
            const found = chart.placements.find(p => {
                const planetMatch = p.planet === req.planet;
                const signOk = !req.sign || p.sign === req.sign;
                const houseOk = !req.house || p.house === req.house;
                return planetMatch && signOk && houseOk;
            });
            if (found) {
                score += 10;
            } else {
                score -= 5;
            }
        }
    }

    // Dominant element
    if (criteria.dominantElement && chart.dominantElement) {
        if (chart.dominantElement === criteria.dominantElement) score += 6;
    }

    // Dominant modality
    if (criteria.dominantModality && chart.dominantModality) {
        if (chart.dominantModality === criteria.dominantModality) score += 4;
    }

    // Required patterns
    if (criteria.requiredPatterns && chart.detectedPatterns) {
        for (const pattern of criteria.requiredPatterns) {
            if (chart.detectedPatterns.includes(pattern)) score += 8;
        }
    }

    return score;
}

// ═══════════════════════════════════════════════════════════════════
// Main Detection API
// ═══════════════════════════════════════════════════════════════════

export interface ArchetypeMatch {
    archetype: Archetype;
    score: number;
    confidence: 'high' | 'medium' | 'low';
}

/**
 * Detect the best-matching archetype for a chart.
 *
 * @param system - 'tuvi' or 'chiemtinh'
 * @param chartData - Minimal chart summary
 * @returns Top match + runner-ups
 */
export function detectArchetype(
    system: AstrologySystem,
    chartData: TuViChartSummary | ChiemTinhChartSummary,
): { primary: ArchetypeMatch; runners: ArchetypeMatch[] } {
    const scored: ArchetypeMatch[] = ARCHETYPE_LIBRARY.map(archetype => {
        let score: number;
        if (system === 'tuvi') {
            score = scoreTuViCriteria(archetype.tuViCriteria, chartData as TuViChartSummary);
        } else {
            score = scoreChiemTinhCriteria(archetype.chiemTinhCriteria, chartData as ChiemTinhChartSummary);
        }

        const confidence: 'high' | 'medium' | 'low' =
            score >= 15 ? 'high' :
                score >= 8 ? 'medium' : 'low';

        return { archetype, score, confidence };
    });

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);

    // Use fallback if top score is too low
    const topMatch = scored[0];
    if (!topMatch || topMatch.score < 5) {
        return {
            primary: { archetype: FALLBACK_ARCHETYPE, score: 0, confidence: 'low' },
            runners: scored.slice(0, 3),
        };
    }

    return {
        primary: topMatch,
        runners: scored.slice(1, 4),
    };
}

/**
 * Get archetype by ID (for direct lookup).
 */
export function getArchetypeById(id: string): Archetype | undefined {
    return ARCHETYPE_LIBRARY.find(a => a.id === id);
}
