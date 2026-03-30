import type { NatalChart, InterpretationResult, InterpretationEntry, DetectedPattern } from '../types/westernAstro';
import { ZODIAC_SIGNS } from '../data/westernAstro/zodiacSigns';
import { PLANETS } from '../data/westernAstro/planetData';
import { getInterpretation } from '../data/westernAstro/planetInSign';
import { CHART_PATTERNS, ELEMENT_DOMINANT_TEXTS, ELEMENT_DEFICIT_TEXTS } from '../data/westernAstro/chartPatterns';
import { DIGNITY_NAMES } from '../data/westernAstro/planetData';
import { getPlanetInHouseInterpretation } from '../data/westernAstro/planetInHouse';
import { getSignOnHouseInterpretation } from '../data/westernAstro/signInHouseMeanings';
import { getAspectInterpretation } from '../data/westernAstro/aspectMeanings';
import { ASPECT_PATTERN_MEANINGS } from '../data/westernAstro/patternMeanings';
import { detectAspectPatterns } from './aspectPatternDetector';


// =============================================================================
// Astro Interpreter — generates Vietnamese interpretation text from NatalChart
// Phase 2: Full 8-step pipeline (Steps 1-6)
// =============================================================================

/**
 * Generate interpretation text from a calculated natal chart.
 */
export function interpretChart(chart: NatalChart): InterpretationResult {
    const big3Summary = generateBig3Summary(chart);
    const planetInterpretations = generatePlanetInterpretations(chart);
    const houseInterpretations = generateHouseInterpretations(chart);
    const houseCuspInterpretations = generateHouseCuspInterpretations(chart);
    const aspectInterpretations = generateAspectInterpretations(chart);
    const detectedPatterns = detectAspectPatterns(chart.aspects, chart.planets);
    const patternInterpretations = generatePatternInterpretations(detectedPatterns);
    const chartOverviewText = generateChartOverviewText(chart);

    return {
        big3Summary,
        planetInterpretations,
        houseInterpretations,
        houseCuspInterpretations,
        aspectInterpretations,
        patternInterpretations,
        detectedPatterns,
        chartOverviewText,
    };
}

// ─── Big 3 Summary ──────────────────────────────────────────────────────────

function generateBig3Summary(chart: NatalChart): string {
    const sunSign = ZODIAC_SIGNS[chart.sun.sign];
    const moonSign = ZODIAC_SIGNS[chart.moon.sign];
    const ascSign = ZODIAC_SIGNS[chart.ascendantSign];

    const sun = PLANETS.sun;
    const moon = PLANETS.moon;

    const parts = [
        `☉ **${sun.name} trong ${sunSign.name}** (${sunSign.symbol})`,
        `→ ${sun.domain}`,
        '',
        `☽ **${moon.name} trong ${moonSign.name}** (${moonSign.symbol})`,
        `→ ${moon.domain}`,
        '',
        `↑ **Cung Mọc ${ascSign.name}** (${ascSign.symbol})`,
        `→ Ngoại hình và cách thể hiện ra ngoài`,
    ];

    return parts.join('\n');
}

// ─── Planet-in-Sign Interpretations ─────────────────────────────────────────

function generatePlanetInterpretations(chart: NatalChart): InterpretationEntry[] {
    const results: InterpretationEntry[] = [];

    for (const planet of chart.planets) {
        const interp = getInterpretation(planet.id, planet.sign);
        if (interp) {
            const dignityLabel = DIGNITY_NAMES[planet.dignity] ?? '';
            const dignityNote = planet.dignity !== 'peregrine'
                ? `\n\n⚖️ *Trạng thái: ${dignityLabel}*`
                : '';

            results.push({
                ...interp,
                body: interp.body + dignityNote + (planet.isRetrograde ? '\n\n🔄 *Hành tinh nghịch hành (Rx): Năng lượng hướng nội, cần thời gian suy ngẫm.*' : ''),
            });
        } else {
            const planetInfo = PLANETS[planet.id];
            const signInfo = ZODIAC_SIGNS[planet.sign];
            if (planetInfo && signInfo) {
                results.push({
                    key: `${planet.id}-in-${planet.sign}`,
                    title: `${planetInfo.name} trong ${signInfo.name}`,
                    body: `${planetInfo.name} (${planetInfo.symbol}) nằm trong ${signInfo.name} (${signInfo.symbol}), Nhà ${planet.house}. ${planetInfo.domain}.`,
                    keywords: signInfo.keywords,
                });
            }
        }
    }

    return results;
}

// ─── Planet-in-House Interpretations (Phase 2) ──────────────────────────────

function generateHouseInterpretations(chart: NatalChart): InterpretationEntry[] {
    const results: InterpretationEntry[] = [];

    for (const planet of chart.planets) {
        const interp = getPlanetInHouseInterpretation(planet.id, planet.house);
        if (interp) {
            results.push(interp);
        } else {
            // Fallback
            const planetInfo = PLANETS[planet.id];
            if (planetInfo) {
                results.push({
                    key: `${planet.id}-in-house-${planet.house}`,
                    title: `${planetInfo.symbol} ${planetInfo.name} ở Nhà ${planet.house}`,
                    body: `${planetInfo.name} nằm ở Nhà ${planet.house}. ${planetInfo.domain}.`,
                    keywords: [],
                });
            }
        }
    }

    return results;
}

// ─── Sign-on-House-Cusp Interpretations (Phase 2) ───────────────────────────

function generateHouseCuspInterpretations(chart: NatalChart): InterpretationEntry[] {
    const results: InterpretationEntry[] = [];

    for (const house of chart.houses) {
        const interp = getSignOnHouseInterpretation(house.sign, house.number);
        if (interp) {
            results.push(interp);
        } else {
            // Fallback
            const signInfo = ZODIAC_SIGNS[house.sign];
            if (signInfo) {
                results.push({
                    key: `${house.sign}-on-house-${house.number}`,
                    title: `${signInfo.symbol} ${signInfo.name} trên đầu Nhà ${house.number}`,
                    body: `Cung ${signInfo.name} trên đầu Nhà ${house.number}.`,
                    keywords: signInfo.keywords,
                });
            }
        }
    }

    return results;
}

// ─── Aspect Interpretations (Phase 2) ───────────────────────────────────────

function generateAspectInterpretations(chart: NatalChart): InterpretationEntry[] {
    const results: InterpretationEntry[] = [];
    const seen = new Set<string>();

    for (const aspect of chart.aspects) {
        const sortedKey = [aspect.planet1, aspect.type, aspect.planet2].sort().join('-');
        if (seen.has(sortedKey)) continue;
        seen.add(sortedKey);

        const interp = getAspectInterpretation(aspect.planet1, aspect.planet2, aspect.type);
        if (interp) {
            results.push(interp);
        }
        // Only show authored interpretations, skip fallback for aspects
        // to avoid overwhelming the user with generic text
    }

    return results;
}

// ─── Pattern Interpretations (Phase 2) ──────────────────────────────────────

function generatePatternInterpretations(detectedPatterns: DetectedPattern[]): InterpretationEntry[] {
    const results: InterpretationEntry[] = [];

    for (const pattern of detectedPatterns) {
        const meaning = ASPECT_PATTERN_MEANINGS[pattern.type as keyof typeof ASPECT_PATTERN_MEANINGS];
        if (meaning) {
            results.push({
                key: `pattern-${pattern.type}-${pattern.involvedBodies.join('-')}`,
                title: `${meaning.symbol} ${meaning.name}`,
                body: `${meaning.description}\n\n🌟 *Hành tinh liên quan: ${pattern.description}*`,
                keywords: meaning.keywords,
            });
        }
    }

    return results;
}

// ─── Chart Overview Text ────────────────────────────────────────────────────

function generateChartOverviewText(chart: NatalChart): string {
    const o = chart.overview;
    const parts: string[] = [];

    // Chart pattern
    if (o.pattern && CHART_PATTERNS[o.pattern]) {
        const p = CHART_PATTERNS[o.pattern];
        parts.push(`📊 **Hình dạng bản đồ sao: ${p.name}**`);
        parts.push(p.description);
        parts.push('');
    }

    // Element balance
    parts.push('🔥🌍💨💧 **Cân bằng Nguyên tố:**');
    parts.push(`  Lửa: ${o.elementBalance.fire} · Đất: ${o.elementBalance.earth} · Khí: ${o.elementBalance.air} · Nước: ${o.elementBalance.water}`);

    if (o.dominantElement) {
        const text = ELEMENT_DOMINANT_TEXTS[o.dominantElement];
        if (text) parts.push(`  → ${text}`);
    }

    const total = chart.planets.length;
    for (const [element, count] of Object.entries(o.elementBalance)) {
        if (count === 0 || count <= total * 0.1) {
            const text = ELEMENT_DEFICIT_TEXTS[element];
            if (text) parts.push(`  ⚠️ ${text}`);
        }
    }

    parts.push('');

    // Quality balance
    parts.push('⚖️ **Cân bằng Chế độ:**');
    parts.push(`  Khởi xướng: ${o.qualityBalance.cardinal} · Bền vững: ${o.qualityBalance.fixed} · Thích nghi: ${o.qualityBalance.mutable}`);
    parts.push('');

    // Polarity
    parts.push('☯ **Cực tính:**');
    parts.push(`  Dương (Yang): ${o.polarityBalance.yang} · Âm (Yin): ${o.polarityBalance.yin}`);

    // Dominant planet/sign
    if (o.dominantPlanet) {
        const p = PLANETS[o.dominantPlanet];
        parts.push('');
        parts.push(`🌟 **Hành tinh trội:** ${p.name} (${p.symbol})`);
    }
    if (o.dominantSign) {
        const s = ZODIAC_SIGNS[o.dominantSign];
        parts.push(`🌟 **Cung trội:** ${s.name} (${s.symbol})`);
    }

    return parts.join('\n');
}
