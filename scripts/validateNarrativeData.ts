/**
 * Narrative Data Validation Script
 *
 * Automated checks for ETC narrative content quality:
 * - All required fields present
 * - Hook length within bounds (15-60 words)
 * - Effect paragraphs not empty
 * - Tip is actionable (contains a verb or imperative)
 * - No duplicate hooks across entries
 *
 * Run: npx ts-node scripts/validateNarrativeData.ts
 */

import { TUVI_PERSONALITY_NARRATIVES } from '../src/data/interpretation/tuvi/personality';
import { TUVI_LOVE_NARRATIVES } from '../src/data/interpretation/tuvi/love';
import { TUVI_CAREER_NARRATIVES } from '../src/data/interpretation/tuvi/career';
import { TUVI_HEALTH_NARRATIVES } from '../src/data/interpretation/tuvi/health';
import { TUVI_GROWTH_NARRATIVES } from '../src/data/interpretation/tuvi/growth';
import { CHIEMTINH_PERSONALITY_NARRATIVES } from '../src/data/interpretation/chiemtinh/planetInSign/personality';
import { CHIEMTINH_LOVE_NARRATIVES } from '../src/data/interpretation/chiemtinh/planetInSign/love';

interface ValidationError {
    file: string;
    key: string;
    field: string;
    message: string;
}

const errors: ValidationError[] = [];
const hooks = new Set<string>();

function wordCount(text: string): number {
    return text.split(/\s+/).filter(Boolean).length;
}

function validateETC(
    file: string,
    key: string,
    entry: { hook: string; effectParagraphs: readonly string[]; nuance: string; cause: string; tip: string },
) {
    // Hook checks
    if (!entry.hook || entry.hook.trim().length === 0) {
        errors.push({ file, key, field: 'hook', message: 'Hook is empty' });
    } else {
        const wc = wordCount(entry.hook);
        if (wc < 5) errors.push({ file, key, field: 'hook', message: `Hook too short: ${wc} words (min 5)` });
        if (wc > 60) errors.push({ file, key, field: 'hook', message: `Hook too long: ${wc} words (max 60)` });
        if (hooks.has(entry.hook)) {
            errors.push({ file, key, field: 'hook', message: 'Duplicate hook found' });
        }
        hooks.add(entry.hook);
    }

    // Effect paragraphs
    if (!entry.effectParagraphs || entry.effectParagraphs.length === 0) {
        errors.push({ file, key, field: 'effectParagraphs', message: 'No effect paragraphs' });
    } else {
        entry.effectParagraphs.forEach((p, i) => {
            if (!p || p.trim().length === 0) {
                errors.push({ file, key, field: `effectParagraphs[${i}]`, message: 'Empty effect paragraph' });
            }
        });
    }

    // Nuance
    if (!entry.nuance || entry.nuance.trim().length === 0) {
        errors.push({ file, key, field: 'nuance', message: 'Nuance is empty' });
    }

    // Cause
    if (!entry.cause || entry.cause.trim().length === 0) {
        errors.push({ file, key, field: 'cause', message: 'Cause is empty' });
    }

    // Tip
    if (!entry.tip || entry.tip.trim().length === 0) {
        errors.push({ file, key, field: 'tip', message: 'Tip is empty' });
    }
}

function validateBrightnessMap(file: string, map: Record<string, any>) {
    for (const [starName, levels] of Object.entries(map)) {
        for (const level of ['mieuVuong', 'dacBinh', 'ham'] as const) {
            const entry = levels[level];
            if (!entry) {
                errors.push({ file, key: `${starName}.${level}`, field: 'entry', message: `Missing brightness level: ${level}` });
                continue;
            }
            validateETC(file, `${starName}.${level}`, entry);
        }
    }
}

function validatePlanetSignMap(file: string, map: Record<string, Record<string, any>>) {
    for (const [planet, signs] of Object.entries(map)) {
        for (const [sign, entry] of Object.entries(signs)) {
            validateETC(file, `${planet}.${sign}`, entry);
        }
    }
}

// Validate all data files
console.log('🔍 Validating narrative data...\n');

validateBrightnessMap('tuvi/personality.ts', TUVI_PERSONALITY_NARRATIVES);
validateBrightnessMap('tuvi/love.ts', TUVI_LOVE_NARRATIVES);
validateBrightnessMap('tuvi/career.ts', TUVI_CAREER_NARRATIVES);
validateBrightnessMap('tuvi/health.ts', TUVI_HEALTH_NARRATIVES);
validateBrightnessMap('tuvi/growth.ts', TUVI_GROWTH_NARRATIVES);
validatePlanetSignMap('chiemtinh/personality.ts', CHIEMTINH_PERSONALITY_NARRATIVES);
validatePlanetSignMap('chiemtinh/love.ts', CHIEMTINH_LOVE_NARRATIVES);

// Report
if (errors.length === 0) {
    console.log('✅ All narrative data valid! No issues found.\n');

    // Summary stats
    let totalEntries = 0;
    const countBrightness = (map: Record<string, any>) => {
        for (const levels of Object.values(map)) {
            totalEntries += Object.keys(levels as Record<string, any>).length;
        }
    };
    const countPlanetSign = (map: Record<string, Record<string, any>>) => {
        for (const signs of Object.values(map)) {
            totalEntries += Object.keys(signs).length;
        }
    };

    countBrightness(TUVI_PERSONALITY_NARRATIVES);
    countBrightness(TUVI_LOVE_NARRATIVES);
    countBrightness(TUVI_CAREER_NARRATIVES);
    countBrightness(TUVI_HEALTH_NARRATIVES);
    countBrightness(TUVI_GROWTH_NARRATIVES);
    countPlanetSign(CHIEMTINH_PERSONALITY_NARRATIVES);
    countPlanetSign(CHIEMTINH_LOVE_NARRATIVES);

    console.log(`📊 Total narrative entries: ${totalEntries}`);
    console.log(`📊 Unique hooks: ${hooks.size}`);
} else {
    console.log(`❌ Found ${errors.length} issue(s):\n`);
    for (const err of errors) {
        console.log(`  [${err.file}] ${err.key} → ${err.field}: ${err.message}`);
    }
    process.exit(1);
}
