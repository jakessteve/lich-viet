/**
 * Đại Vận Analysis Service — Comprehensive 10-year period interpretation engine.
 *
 * Extracted from chartAnalysis.ts and enhanced with 9 new analysis sections:
 * §1 Tứ Hóa Destination Tracking
 * §2 Tam Hợp Chiếu Analysis
 * §3 Đối Cung (Opposition) Influence
 * §4 Ngũ Hành Interaction
 * §5 Tràng Sinh Cycle Stage
 * §6 Tuần/Triệt Impact
 * §7 Multi-Domain Life Analysis
 * §8 Period Scoring & Trend
 * §9 Synthesis & Advice
 */

import type { TuViChartData, TuViPalace, TuViStar } from './tuviTypes';
import { MUTAGEN_CONFIG, BRIGHTNESS_LABELS } from './tuviTypes';
import { getTuHoaForStem, type TuHoaSchool } from './tuHoaTables';
import {
    TRANG_SINH_MEANINGS,
    getElementRelation,
    CAT_TINH_NAMES,
    HUNG_SAT_NAMES,
    TAM_HOP_GROUPS,
    TAM_HOP_ELEMENT,
} from './palaceKnowledgeBase';
import {
    STEM_TU_HOA,
    DAI_VAN_PALACE_CONTEXT,
    DAI_VAN_TU_HOA_DESTINATION,
    DOMAIN_CONFIGS,
    SCORING_WEIGHTS,
    BRANCH_ELEMENT,
    OPPOSITE_BRANCHES,
    type DomainAnalysisConfig,
} from './daiVanKnowledgeBase';

// Re-export for backward compatibility
export { STEM_TU_HOA, DAI_VAN_PALACE_CONTEXT };

// ═══════════════════════════════════════════════════════════════════
// Helper Functions
// ═══════════════════════════════════════════════════════════════════

function getBrightnessVietnamese(brightness: string): string {
    return BRIGHTNESS_LABELS[brightness] ?? brightness;
}

function getBrightnessCategory(brightness: string): 'strong' | 'neutral' | 'weak' {
    if (brightness === '庙' || brightness === '旺' || brightness === 'Miếu' || brightness === 'Vượng') return 'strong';
    if (brightness === '不' || brightness === '陷' || brightness === 'Bất' || brightness === 'Hãm') return 'weak';
    return 'neutral';
}

function getAllStarsInPalace(palace: TuViPalace): TuViStar[] {
    return [
        ...palace.majorStars,
        ...(palace.minorStars ?? []),
        ...(palace.adjectiveStars ?? []),
    ];
}

const PALACE_ORDER = ['Mệnh', 'Huynh Đệ', 'Phu Thê', 'Tử Tức', 'Tài Bạch', 'Tật Ách',
    'Thiên Di', 'Nô Bộc', 'Quan Lộc', 'Điền Trạch', 'Phúc Đức', 'Phụ Mẫu'];

function extractBasePalaceName(fullName: string): string {
    for (const name of PALACE_ORDER) {
        if (fullName.includes(name)) return name;
    }
    return fullName;
}

// ═══════════════════════════════════════════════════════════════════
// Types — Enhanced DaiVanPeriod
// ═══════════════════════════════════════════════════════════════════

/** Tứ Hóa destination tracking */
export interface TuHoaDestination {
    readonly type: 'Lộc' | 'Quyền' | 'Khoa' | 'Kỵ';
    readonly starName: string;
    readonly destinationPalace: string;
    readonly interpretation: string;
}

/** Multi-domain life analysis */
export interface DomainAnalysis {
    readonly key: string;
    readonly label: string;
    readonly icon: string;
    readonly assessment: 'favorable' | 'mixed' | 'challenging' | 'neutral';
    readonly summary: string;
}

/** Enhanced Đại Vận period */
export interface DaiVanPeriod {
    readonly palaceName: string;
    readonly earthlyBranch: string;
    readonly heavenlyStem: string;
    readonly ageRange: [number, number];
    readonly majorStars: string[];
    readonly minorStarSummary: string;
    readonly brightnessDetail: string;
    readonly tuHoaActivated: string[];
    readonly quality: 'favorable' | 'mixed' | 'challenging' | 'neutral';
    readonly interpretation: string;
    // ── Enhanced sections ──
    readonly tuHoaDestinations: TuHoaDestination[];
    readonly tamHopAnalysis: string | null;
    readonly doiCungAnalysis: string | null;
    readonly nguHanhAnalysis: string | null;
    readonly trangSinhStage: string | null;
    readonly trangSinhQuality: 'strong' | 'neutral' | 'weak' | null;
    readonly tuanTrietNote: string | null;
    readonly domainAnalyses: DomainAnalysis[];
    readonly score: number;          // 0-100
    readonly trend: 'ascending' | 'descending' | 'stable' | null;
    readonly synthesis: string;
}

/** Overall Đại Vận analysis result */
export interface DaiVanAnalysis {
    readonly periods: DaiVanPeriod[];
    readonly currentPeriodIndex: number;
    readonly currentAge: number;
    readonly overallAssessment: string;
}

// ═══════════════════════════════════════════════════════════════════
// §1 — Tứ Hóa Destination Tracking
// ═══════════════════════════════════════════════════════════════════

function computeTuHoaDestinations(stem: string, chart: TuViChartData, school: TuHoaSchool = 'toanThu'): TuHoaDestination[] {
    const tuHoa = getTuHoaForStem(stem, school);
    if (!tuHoa) return [];

    const results: TuHoaDestination[] = [];
    const hoaEntries: { type: 'Lộc' | 'Quyền' | 'Khoa' | 'Kỵ'; starName: string }[] = [
        { type: 'Lộc', starName: tuHoa.loc },
        { type: 'Quyền', starName: tuHoa.quyen },
        { type: 'Khoa', starName: tuHoa.khoa },
        { type: 'Kỵ', starName: tuHoa.ky },
    ];

    for (const entry of hoaEntries) {
        // Find which natal palace contains this star
        let destPalace = '';
        for (const palace of chart.palaces) {
            const allStars = getAllStarsInPalace(palace);
            if (allStars.some(s => s.name === entry.starName)) {
                destPalace = palace.name;
                break;
            }
        }

        const baseName = destPalace ? extractBasePalaceName(destPalace) : '';
        const interp = DAI_VAN_TU_HOA_DESTINATION[`Hóa ${entry.type}`]?.[baseName] ?? '';

        results.push({
            type: entry.type,
            starName: entry.starName,
            destinationPalace: destPalace || 'Không xác định',
            interpretation: interp,
        });
    }

    return results;
}

// ═══════════════════════════════════════════════════════════════════
// §2 — Tam Hợp Chiếu Analysis
// ═══════════════════════════════════════════════════════════════════

function analyzeTamHopForPeriod(palace: TuViPalace, chart: TuViChartData): string | null {
    const branch = palace.earthlyBranch;
    const trineGroup = TAM_HOP_GROUPS[branch];
    if (!trineGroup) return null;

    const otherBranches = trineGroup.filter(b => b !== branch);
    const element = TAM_HOP_ELEMENT[branch] ?? '';
    const parts: string[] = [];

    parts.push(`Tam Hợp ${element} cục (${trineGroup.join('-')}).`);

    for (const otherBranch of otherBranches) {
        const otherPalace = chart.palaces.find(p => p.earthlyBranch === otherBranch);
        if (!otherPalace) continue;

        const starNames = otherPalace.majorStars.map(s => {
            const bl = getBrightnessVietnamese(s.brightness);
            return bl ? `${s.name} (${bl})` : s.name;
        });

        if (starNames.length > 0) {
            parts.push(`${otherPalace.name}: ${starNames.join(', ')} chiếu sang.`);
        } else {
            parts.push(`${otherPalace.name}: vô chính diệu.`);
        }
    }

    return parts.join(' ');
}

// ═══════════════════════════════════════════════════════════════════
// §3 — Đối Cung (Opposition) Influence
// ═══════════════════════════════════════════════════════════════════

function analyzeDoiCungForPeriod(palace: TuViPalace, chart: TuViChartData): string | null {
    const oppBranch = OPPOSITE_BRANCHES[palace.earthlyBranch];
    if (!oppBranch) return null;

    const oppPalace = chart.palaces.find(p => p.earthlyBranch === oppBranch);
    if (!oppPalace) return null;

    const parts: string[] = [];
    parts.push(`Đối cung: ${oppPalace.name} (${oppBranch}).`);

    if (oppPalace.majorStars.length > 0) {
        const starNames = oppPalace.majorStars.map(s => {
            const bl = getBrightnessVietnamese(s.brightness);
            return bl ? `${s.name} (${bl})` : s.name;
        });
        parts.push(`Chiếu sang: ${starNames.join(', ')}.`);

        const brightCount = oppPalace.majorStars.filter(s => getBrightnessCategory(s.brightness) === 'strong').length;
        const weakCount = oppPalace.majorStars.filter(s => getBrightnessCategory(s.brightness) === 'weak').length;
        if (brightCount > 0 && weakCount === 0) {
            parts.push('Đối cung Miếu Vượng — bổ trợ mạnh.');
        } else if (weakCount > 0 && brightCount === 0) {
            parts.push('Đối cung Hãm — sức chiếu yếu.');
        }
    } else {
        parts.push('Đối cung vô chính diệu — sức chiếu rất yếu.');
    }

    return parts.join(' ');
}

// ═══════════════════════════════════════════════════════════════════
// §4 — Ngũ Hành Interaction
// ═══════════════════════════════════════════════════════════════════

function analyzeNguHanh(palace: TuViPalace, chart: TuViChartData): string | null {
    const branchElement = BRANCH_ELEMENT[palace.earthlyBranch];
    if (!branchElement) return null;

    const cucEl = chart.cucElement ?? '';
    if (!cucEl) return null;

    const parts: string[] = [];
    const relation = getElementRelation(branchElement, cucEl);
    if (relation) {
        parts.push(`Cung ${palace.earthlyBranch} (${branchElement}) vs Cục (${cucEl}): ${relation}.`);
    }

    // Also check major star elements vs Cục
    for (const star of palace.majorStars) {
        if (star.element) {
            const starRel = getElementRelation(star.element, cucEl);
            if (starRel) {
                parts.push(`${star.name} (${star.element}) vs Cục: ${starRel}.`);
            }
        }
    }

    return parts.length > 0 ? parts.join(' ') : null;
}

// ═══════════════════════════════════════════════════════════════════
// §5 — Tràng Sinh Cycle Stage
// ═══════════════════════════════════════════════════════════════════

function analyzeTrangSinh(palace: TuViPalace): { stage: string | null; quality: 'strong' | 'neutral' | 'weak' | null } {
    const cs = palace.changsheng12;
    if (!cs) return { stage: null, quality: null };

    const info = TRANG_SINH_MEANINGS[cs];
    if (!info) return { stage: cs, quality: 'neutral' };

    return { stage: `${info.label}: ${info.meaning}`, quality: info.quality };
}

// ═══════════════════════════════════════════════════════════════════
// §6 — Tuần/Triệt Impact
// ═══════════════════════════════════════════════════════════════════

function analyzeTuanTriet(palace: TuViPalace): string | null {
    const parts: string[] = [];
    if (palace.hasTuanKhong) {
        parts.push('⭕ Tuần Không — giảm lực các sao tại cung, cát giảm cát, sát giảm sát. Hướng nội, phù hợp tu dưỡng.');
    }
    if (palace.hasTrietKhong) {
        parts.push('✂️ Triệt Không — cắt đứt năng lượng mạnh, các sao bị triệt giảm đáng kể. Nếu biết tu tập thì là cơ sở giải thoát.');
    }
    return parts.length > 0 ? parts.join(' ') : null;
}

// ═══════════════════════════════════════════════════════════════════
// §7 — Multi-Domain Life Analysis
// ═══════════════════════════════════════════════════════════════════

function analyzeDomain(config: DomainAnalysisConfig, chart: TuViChartData): DomainAnalysis {
    let positiveCount = 0;
    let negativeCount = 0;
    const details: string[] = [];

    for (const palaceName of config.keyPalaces) {
        const palace = chart.palaces.find(p => p.name.includes(palaceName));
        if (!palace) continue;

        const allStars = getAllStarsInPalace(palace);
        const starNames = allStars.map(s => s.name);

        // Count positive indicators
        const foundPositive = starNames.filter(n => config.positiveIndicators.includes(n));
        positiveCount += foundPositive.length;

        // Count negative indicators
        const foundNegative = starNames.filter(n => config.negativeIndicators.includes(n));
        negativeCount += foundNegative.length;

        // Major star brightness
        for (const s of palace.majorStars) {
            const cat = getBrightnessCategory(s.brightness);
            if (cat === 'strong') positiveCount++;
            if (cat === 'weak') negativeCount++;
        }

        // Tứ Hóa
        for (const s of allStars) {
            if (s.mutagen) {
                for (const m of s.mutagen) {
                    const cfg = MUTAGEN_CONFIG[m];
                    if (cfg?.label === 'Hóa Lộc') positiveCount += 2;
                    if (cfg?.label === 'Hóa Kỵ') negativeCount += 2;
                }
            }
        }

        if (foundPositive.length > 0) details.push(`Cát: ${foundPositive.join(', ')}`);
        if (foundNegative.length > 0) details.push(`Sát: ${foundNegative.join(', ')}`);
    }

    let assessment: DomainAnalysis['assessment'] = 'neutral';
    if (positiveCount > negativeCount + 2) assessment = 'favorable';
    else if (negativeCount > positiveCount + 2) assessment = 'challenging';
    else if (positiveCount > 0 && negativeCount > 0) assessment = 'mixed';

    const summary = details.length > 0 ? details.join('. ') + '.' : config.fallbackText;

    return {
        key: Object.keys(DOMAIN_CONFIGS).find(k => DOMAIN_CONFIGS[k] === config) ?? '',
        label: config.label,
        icon: config.icon,
        assessment,
        summary,
    };
}

// ═══════════════════════════════════════════════════════════════════
// §8 — Period Scoring
// ═══════════════════════════════════════════════════════════════════

function computePeriodScore(
    palace: TuViPalace,
    chart: TuViChartData,
    tuHoaDestinations: TuHoaDestination[],
    trangSinhQuality: 'strong' | 'neutral' | 'weak' | null
): number {
    const W = SCORING_WEIGHTS;
    let score = W.baseScore;

    // Major stars brightness
    if (palace.majorStars.length === 0) {
        score += W.emptyPalace;
    } else {
        for (const s of palace.majorStars) {
            const cat = getBrightnessCategory(s.brightness);
            if (cat === 'strong') score += W.majorStarBright;
            else if (cat === 'weak') score += W.majorStarWeak;
            else score += W.majorStarNeutral;
        }
    }

    // Aux stars
    const allMinors = [...(palace.minorStars ?? []), ...(palace.adjectiveStars ?? [])];
    for (const s of allMinors) {
        if (CAT_TINH_NAMES.has(s.name)) score += W.catTinh;
        if (HUNG_SAT_NAMES.has(s.name)) score += W.hungSat;
        if (s.name === 'Lộc Tồn') score += W.locTon;
    }

    // Tứ Hóa destinations — Lộc/Quyền/Khoa landing in key palaces = bonus
    for (const dest of tuHoaDestinations) {
        const baseName = extractBasePalaceName(dest.destinationPalace);
        const isKeyPalace = ['Mệnh', 'Tài Bạch', 'Quan Lộc', 'Phúc Đức'].includes(baseName);
        if (dest.type === 'Lộc') score += isKeyPalace ? W.hoaLoc : W.hoaLoc / 2;
        else if (dest.type === 'Quyền') score += isKeyPalace ? W.hoaQuyen : W.hoaQuyen / 2;
        else if (dest.type === 'Khoa') score += isKeyPalace ? W.hoaKhoa : W.hoaKhoa / 2;
        else if (dest.type === 'Kỵ') score += isKeyPalace ? W.hoaKy : W.hoaKy / 2;
    }

    // Tràng Sinh
    if (trangSinhQuality === 'strong') score += W.trangSinhStrong;
    else if (trangSinhQuality === 'weak') score += W.trangSinhWeak;
    else if (trangSinhQuality === 'neutral') score += W.trangSinhNeutral;

    // Tuần/Triệt
    if (palace.hasTuanKhong) score += W.tuanKhong;
    if (palace.hasTrietKhong) score += W.trietKhong;

    // Tam Hợp influence
    const trineGroup = TAM_HOP_GROUPS[palace.earthlyBranch];
    if (trineGroup) {
        for (const trineBranch of trineGroup) {
            if (trineBranch === palace.earthlyBranch) continue;
            const trinePalace = chart.palaces.find(p => p.earthlyBranch === trineBranch);
            if (!trinePalace) continue;
            for (const s of trinePalace.majorStars) {
                const cat = getBrightnessCategory(s.brightness);
                if (cat === 'strong') score += W.trineStarBright;
                if (cat === 'weak') score += W.trineStarWeak;
            }
        }
    }

    // Đối Cung influence
    const oppBranch = OPPOSITE_BRANCHES[palace.earthlyBranch];
    if (oppBranch) {
        const oppPalace = chart.palaces.find(p => p.earthlyBranch === oppBranch);
        if (oppPalace) {
            for (const s of oppPalace.majorStars) {
                const cat = getBrightnessCategory(s.brightness);
                if (cat === 'strong') score += W.oppStarBright;
                if (cat === 'weak') score += W.oppStarWeak;
            }
        }
    }

    return Math.max(0, Math.min(100, Math.round(score)));
}

// ═══════════════════════════════════════════════════════════════════
// §9 — Synthesis
// ═══════════════════════════════════════════════════════════════════

function synthesizePeriod(
    palace: TuViPalace,
    score: number,
    quality: DaiVanPeriod['quality'],
    domainAnalyses: DomainAnalysis[],
    trangSinhQuality: 'strong' | 'neutral' | 'weak' | null,
): string {
    const parts: string[] = [];

    // Score-based assessment
    if (score >= 70) {
        parts.push('Đại Vận thuận lợi, nhiều cơ hội phát triển. Nên tận dụng tốt giai đoạn này.');
    } else if (score >= 50) {
        parts.push('Đại Vận bình ổn, có cơ hội nhưng cũng cần nỗ lực. Giữ vững nền tảng.');
    } else if (score >= 30) {
        parts.push('Đại Vận nhiều thử thách, cần cẩn trọng và kiên nhẫn. Tránh mạo hiểm.');
    } else {
        parts.push('Đại Vận khó khăn, nên phòng thủ và bảo toàn. Tu dưỡng thân tâm để vượt qua.');
    }

    // Tràng Sinh advice
    if (trangSinhQuality === 'strong') {
        parts.push('Tràng Sinh đắc vị — năng lượng thăng hoa, phát huy tối đa tiềm năng.');
    } else if (trangSinhQuality === 'weak') {
        parts.push('Tràng Sinh suy yếu — nên bổ sung bằng hoạt động tâm linh, tu dưỡng, nghỉ ngơi.');
    }

    // Best domain to focus
    const bestDomain = domainAnalyses.find(d => d.assessment === 'favorable');
    if (bestDomain) {
        parts.push(`Lĩnh vực nổi bật: ${bestDomain.label}. Nên tập trung phát triển.`);
    }

    // Worst domain warning
    const worstDomain = domainAnalyses.find(d => d.assessment === 'challenging');
    if (worstDomain) {
        parts.push(`Cần chú ý: ${worstDomain.label}. Nên đề phòng và bổ trợ.`);
    }

    return parts.join(' ');
}

// ═══════════════════════════════════════════════════════════════════
// Main Analysis Function
// ═══════════════════════════════════════════════════════════════════

export function getDaiVanAnalysis(chart: TuViChartData, birthYear?: number, school: TuHoaSchool = 'toanThu'): DaiVanAnalysis {
    const AUSPICIOUS = ['Văn Xương', 'Văn Khúc', 'Tả Phụ', 'Hữu Bật', 'Thiên Khôi', 'Thiên Việt'];
    const MALEFIC = ['Kình Dương', 'Đà La', 'Hỏa Tinh', 'Linh Tinh', 'Địa Không', 'Địa Kiếp'];

    const now = new Date();
    const currentAge = birthYear ? (now.getFullYear() - birthYear + 1) : 0;

    const periods: DaiVanPeriod[] = [];
    let currentPeriodIndex = -1;

    const sortedPalaces = [...chart.palaces].sort((a, b) => a.stage.range[0] - b.stage.range[0]);

    for (let i = 0; i < sortedPalaces.length; i++) {
        const palace = sortedPalaces[i];
        const [startAge, endAge] = palace.stage.range;
        const stem = palace.stage.heavenlyStem;

        if (startAge === 0 && endAge === 0) continue;

        if (currentAge > 0 && currentAge >= startAge && currentAge <= endAge) {
            currentPeriodIndex = periods.length;
        }

        // ── Basic star analysis (original) ──
        const majorStars = palace.majorStars.map(s => s.name);
        const allMinors = [...(palace.minorStars ?? []), ...(palace.adjectiveStars ?? [])];
        const auspiciousHere = allMinors.filter(s => AUSPICIOUS.includes(s.name)).map(s => s.name);
        const maleficHere = allMinors.filter(s => MALEFIC.includes(s.name)).map(s => s.name);
        const hasLocTon = allMinors.some(s => s.name === 'Lộc Tồn');

        const minorParts: string[] = [];
        if (auspiciousHere.length > 0) minorParts.push(`Cát: ${auspiciousHere.join(', ')}`);
        if (maleficHere.length > 0) minorParts.push(`Sát: ${maleficHere.join(', ')}`);
        if (hasLocTon) minorParts.push('Lộc Tồn');

        const brightnessDetail = palace.majorStars
            .map(s => {
                const bLabel = getBrightnessVietnamese(s.brightness);
                return bLabel ? `${s.name} (${bLabel})` : s.name;
            })
            .join(', ');

        // Tứ Hóa listing (original format)
        const tuHoa = getTuHoaForStem(stem, school);
        const tuHoaList: string[] = [];
        if (tuHoa) {
            tuHoaList.push(
                `Hóa Lộc → ${tuHoa.loc}`,
                `Hóa Quyền → ${tuHoa.quyen}`,
                `Hóa Khoa → ${tuHoa.khoa}`,
                `Hóa Kỵ → ${tuHoa.ky}`
            );
        }

        // Quality assessment (original logic)
        let quality: DaiVanPeriod['quality'] = 'neutral';
        const hasGood = auspiciousHere.length > 0 || hasLocTon;
        const hasBad = maleficHere.length > 0;
        if (palace.majorStars.length > 0) {
            const allBright = palace.majorStars.every(s =>
                getBrightnessCategory(s.brightness) === 'strong');
            const anyDim = palace.majorStars.some(s =>
                getBrightnessCategory(s.brightness) === 'weak');
            if (allBright && hasGood && !hasBad) quality = 'favorable';
            else if (anyDim && hasBad && !hasGood) quality = 'challenging';
            else if (hasGood || hasBad) quality = 'mixed';
        } else {
            quality = hasBad ? 'challenging' : 'neutral';
        }

        // Build interpretation (original logic)
        const interpParts: string[] = [];
        const palaceContext = DAI_VAN_PALACE_CONTEXT[palace.name];
        if (palaceContext) interpParts.push(palaceContext);

        if (majorStars.length > 0) {
            interpParts.push(`Chính tinh tọa thủ: ${brightnessDetail}.`);
        } else {
            interpParts.push('Cung này vô chính diệu — cần mượn sao đối cung để luận. Giai đoạn dễ bị ảnh hưởng bởi ngoại cảnh.');
        }

        if (auspiciousHere.length > 0 && maleficHere.length === 0) {
            interpParts.push(`Cát tinh hội tụ (${auspiciousHere.join(', ')}) — giai đoạn thuận lợi, được quý nhân phù trợ.`);
        } else if (maleficHere.length > 0 && auspiciousHere.length === 0) {
            interpParts.push(`Có sát tinh (${maleficHere.join(', ')}) — giai đoạn nhiều biến động, cần cẩn trọng.`);
        } else if (auspiciousHere.length > 0 && maleficHere.length > 0) {
            interpParts.push(`Cát sát lẫn lộn (${auspiciousHere.join(', ')} vs ${maleficHere.join(', ')}) — giai đoạn vừa có cơ hội vừa có thử thách.`);
        }

        if (tuHoa) {
            const allStarNames = [...majorStars, ...allMinors.map(s => s.name)];
            if (allStarNames.includes(tuHoa.loc)) interpParts.push(`→ Hóa Lộc (${tuHoa.loc}) tại bản cung — tài lộc thuận lợi.`);
            if (allStarNames.includes(tuHoa.ky)) interpParts.push(`→ Hóa Kỵ (${tuHoa.ky}) tại bản cung — cần đề phòng trở ngại.`);
        }

        // ── §1 Tứ Hóa Destinations ──
        const tuHoaDestinations = computeTuHoaDestinations(stem, chart);

        // ── §2 Tam Hợp ──
        const tamHopAnalysis = analyzeTamHopForPeriod(palace, chart);

        // ── §3 Đối Cung ──
        const doiCungAnalysis = analyzeDoiCungForPeriod(palace, chart);

        // ── §4 Ngũ Hành ──
        const nguHanhAnalysis = analyzeNguHanh(palace, chart);

        // ── §5 Tràng Sinh ──
        const { stage: trangSinhStage, quality: trangSinhQuality } = analyzeTrangSinh(palace);

        // ── §6 Tuần/Triệt ──
        const tuanTrietNote = analyzeTuanTriet(palace);

        // ── §7 Multi-Domain ──
        const domainAnalyses: DomainAnalysis[] = Object.values(DOMAIN_CONFIGS).map(
            config => analyzeDomain(config, chart)
        );

        // ── §8 Scoring ──
        const score = computePeriodScore(palace, chart, tuHoaDestinations, trangSinhQuality);

        // ── §9 Synthesis ──
        const synthesis = synthesizePeriod(palace, score, quality, domainAnalyses, trangSinhQuality);

        // ── Trend (vs previous period) ──
        let trend: DaiVanPeriod['trend'] = null;
        if (periods.length > 0) {
            const prevScore = periods[periods.length - 1].score;
            if (score > prevScore + 5) trend = 'ascending';
            else if (score < prevScore - 5) trend = 'descending';
            else trend = 'stable';
        }

        periods.push({
            palaceName: palace.name,
            earthlyBranch: palace.earthlyBranch,
            heavenlyStem: stem,
            ageRange: [startAge, endAge],
            majorStars,
            minorStarSummary: minorParts.join(' | '),
            brightnessDetail,
            tuHoaActivated: tuHoaList,
            quality,
            interpretation: interpParts.join(' '),
            // Enhanced sections
            tuHoaDestinations,
            tamHopAnalysis,
            doiCungAnalysis,
            nguHanhAnalysis,
            trangSinhStage,
            trangSinhQuality,
            tuanTrietNote,
            domainAnalyses,
            score,
            trend,
            synthesis,
        });
    }

    // Overall assessment
    const overallParts: string[] = [];
    const favorableCount = periods.filter(p => p.quality === 'favorable').length;
    const challengingCount = periods.filter(p => p.quality === 'challenging').length;

    if (currentPeriodIndex >= 0) {
        const cp = periods[currentPeriodIndex];
        overallParts.push(`Đại Vận hiện tại (${cp.ageRange[0]}–${cp.ageRange[1]} tuổi): cung ${cp.palaceName} (${cp.earthlyBranch}). Điểm: ${cp.score}/100.`);
        if (cp.quality === 'favorable') overallParts.push('Giai đoạn này nhìn chung thuận lợi.');
        else if (cp.quality === 'challenging') overallParts.push('Giai đoạn này cần cẩn trọng, có nhiều biến động.');
        else if (cp.quality === 'mixed') overallParts.push('Giai đoạn này vừa có cơ hội vừa có thử thách.');
    }

    overallParts.push(`Tổng quan: ${favorableCount} giai đoạn thuận lợi, ${challengingCount} giai đoạn cần cẩn trọng.`);

    // Best/worst periods
    const sortedByScore = [...periods].sort((a, b) => b.score - a.score);
    if (sortedByScore.length > 0) {
        const best = sortedByScore[0];
        const worst = sortedByScore[sortedByScore.length - 1];
        overallParts.push(`Giai đoạn tốt nhất: ${best.ageRange[0]}–${best.ageRange[1]} tuổi (${best.score}/100). Giai đoạn cần chú ý nhất: ${worst.ageRange[0]}–${worst.ageRange[1]} tuổi (${worst.score}/100).`);
    }

    return {
        periods,
        currentPeriodIndex,
        currentAge,
        overallAssessment: overallParts.join(' '),
    };
}
