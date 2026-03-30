import type { TuViPalace, TuViChartData } from '../tuviTypes';
import { PALACE_ORDER, PALACE_DESCRIPTIONS } from '../palaceDescriptions';
import { STAR_MEANINGS, BRIGHTNESS_MODIFIER, AUXILIARY_STAR_MEANINGS } from './starMeanings';
import { detectStarCombinations } from './starCombinations';
import { analyzeTuHoaDeep, analyzeTuHoaCombinations } from './tuHoa';
import {
    getBrightnessCategory,
    getBrightnessLabel,
    formatMutagen,
    analyzeDoiCung,
    analyzeTuanTriet,
    extractBasePalaceName
} from './palaceHelpers';
import { generatePalaceSummary } from './palaceSummary';
import {
    analyzeBasicInfo,
    analyzeElementRelations,
    categorizeAuxStars,
    analyzeTamHop,
    analyzeNhiHop,
    analyzeGiapCung,
    analyzeChangSheng,
    analyzePalaceFunction,
    generateOverallAssessment
} from './academicFramework';

/** Structured analysis for a single palace */
export interface PalaceAnalysis {
    readonly palaceName: string;
    readonly icon: string;
    readonly domain: string;
    readonly academicContext: string;
    readonly starInterpretation: string;
    readonly isSoulPalace: boolean;
    readonly isBodyPalace: boolean;
    readonly hasNoMajorStars: boolean;
    readonly majorStarNames: string[];
    // ── Enriched Sections ──
    readonly palaceSummary: string;
    readonly starCombinations: string[];
    readonly doiCungAnalysis: string | null;
    readonly tuHoaDeepAnalysis: string[];
    readonly tuanTrietAnalysis: string[];
    // ── Academic Framework (9-section) ──
    readonly basicInfo: string;
    readonly elementAnalysis: string;
    readonly catHungGroups: { catTinh: string[]; hungSat: string[]; dacBiet: string[] };
    readonly tuHoaCombinations: string[];
    readonly tamHopAnalysis: string | null;
    readonly nhiHopAnalysis: string | null;
    readonly giapCungAnalysis: string | null;
    readonly changShengAnalysis: string | null;
    readonly palaceFunction: { health: string; personality: string; career: string; advice: string } | null;
    readonly overallAssessment: string;
}

// ═══════════════════════════════════════════════════════════════════
// Main Interpretation Function (Enriched)
// ═══════════════════════════════════════════════════════════════════
export function interpretPalace(palace: TuViPalace, _chart?: TuViChartData): string {
    if (!palace) return '';

    const parts: string[] = [];

    // ── Empty Palace (Vô Chính Diệu) ───────────────────────
    if (palace.majorStars.length === 0) {
        parts.push(`Cung ${palace.name} ở trạng thái **vô chính diệu** (không có chính tinh tọa thủ). Phải mượn chính tinh ở cung đối diện (xung chiếu) để luận đoán cơ bản. Sự ảnh hưởng của các phụ tinh, sát tinh và hoàn cảnh bên ngoài là rất lớn.`);
    } else {
        // ── Major Stars ─────────────────────────────────────────
        const starNames = palace.majorStars.map(s => s.name).join(', ');
        parts.push(`Cung ${palace.name} có các chính tinh: **${starNames}** tọa thủ.`);

        palace.majorStars.forEach(star => {
            const brightnessLabel = getBrightnessLabel(star.brightness);
            const brightnessCategory = getBrightnessCategory(star.brightness);
            const brightnessMod = BRIGHTNESS_MODIFIER[star.name]?.[brightnessCategory];
            const baseMeaning = STAR_MEANINGS[star.name] ?? '';
            const mutagenStr = formatMutagen(star);

            let line = `- **${star.name}`;
            if (brightnessLabel) line += ` (${brightnessLabel})`;
            line += '**: ';

            // Use brightness-specific text if available, else fall back to base
            if (brightnessMod) {
                line += brightnessMod;
            } else if (baseMeaning) {
                line += baseMeaning;
            }

            if (mutagenStr) {
                line += ` • ${mutagenStr}.`;
            }

            parts.push(line);
        });
    }

    // ── Auxiliary Stars (Phụ Tinh) ──────────────────────────────
    const auxStars = [
        ...(palace.minorStars ?? []),
        ...(palace.adjectiveStars ?? []),
    ];
    const auxWithMeanings = auxStars
        .filter(s => AUXILIARY_STAR_MEANINGS[s.name])
        .map(s => {
            const mutagenStr = formatMutagen(s);
            const brightnessCategory = getBrightnessCategory(s.brightness);
            const brightnessMod = BRIGHTNESS_MODIFIER[s.name]?.[brightnessCategory];
            let line = `- **${s.name}**: `;
            if (brightnessMod) {
                line += brightnessMod;
            } else {
                line += AUXILIARY_STAR_MEANINGS[s.name];
            }
            if (mutagenStr) line += ` • ${mutagenStr}.`;
            return line;
        });

    if (auxWithMeanings.length > 0) {
        parts.push(`\n**Phụ tinh đáng chú ý:**`);
        parts.push(...auxWithMeanings);
    }

    // ── Tứ Hóa Summary ─────────────────────────────────────────
    const allStars = [...palace.majorStars, ...auxStars];
    const tuHoaEntries = allStars
        .filter(s => s.mutagen && s.mutagen.length > 0)
        .map(s => `${s.name} ${formatMutagen(s)}`);

    if (tuHoaEntries.length > 0) {
        parts.push(`\n**Tứ Hóa tại cung:** ${tuHoaEntries.join(', ')} — mang lại những năng lượng biến hóa đặc thù.`);
    }

    return parts.join('\n\n');
}

/**
 * Generate detailed analysis for all 12 palaces in canonical order.
 *
 * Follows the 9-section academic framework combining Tam Hợp Phái,
 * Tứ Hóa Phái, and modern hybrid approaches.
 */
export function getDetailedPalaceAnalysis(chart: TuViChartData): PalaceAnalysis[] {
    const results: PalaceAnalysis[] = [];

    for (const palaceName of PALACE_ORDER) {
        const palace = chart.palaces.find(p => p.name.includes(palaceName));
        if (!palace) continue;

        const desc = PALACE_DESCRIPTIONS[palaceName];
        const starInterpretation = interpretPalace(palace, chart);
        const baseName = extractBasePalaceName(palace.name);
        const catHung = categorizeAuxStars(palace);

        results.push({
            palaceName: palace.name,
            icon: desc?.icon ?? '📌',
            domain: desc?.domain ?? '',
            academicContext: desc?.academicContext ?? '',
            starInterpretation,
            isSoulPalace: !!palace.isSoulPalace,
            isBodyPalace: !!palace.isBodyPalace,
            hasNoMajorStars: palace.majorStars.length === 0,
            majorStarNames: palace.majorStars.map(s => s.name),
            // ── Enriched (existing) ──
            palaceSummary: generatePalaceSummary(palace, baseName, chart),
            starCombinations: detectStarCombinations(palace.majorStars.map(s => s.name)),
            doiCungAnalysis: analyzeDoiCung(palace, chart),
            tuHoaDeepAnalysis: analyzeTuHoaDeep(palace, baseName),
            tuanTrietAnalysis: analyzeTuanTriet(palace),
            // ── Academic Framework (new) ──
            basicInfo: analyzeBasicInfo(palace, baseName, chart),
            elementAnalysis: analyzeElementRelations(palace, chart),
            catHungGroups: catHung,
            tuHoaCombinations: analyzeTuHoaCombinations(palace),
            tamHopAnalysis: analyzeTamHop(palace, chart),
            nhiHopAnalysis: analyzeNhiHop(palace, chart),
            giapCungAnalysis: analyzeGiapCung(palace, chart),
            changShengAnalysis: analyzeChangSheng(palace),
            palaceFunction: analyzePalaceFunction(baseName, palace, chart),
            overallAssessment: generateOverallAssessment(palace, baseName, catHung, chart),
        });
    }

    return results;
}

// Re-exports
export * from './starMeanings';
export * from './starCombinations';
export * from './tuHoa';
export * from './palaceHelpers';
export * from './palaceSummary';
export * from './academicFramework';
