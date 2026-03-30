import type { TuViPalace, TuViChartData, TuViStar } from '../tuviTypes';
import {
    TRANG_SINH_MEANINGS,
    TRANG_SINH_VN_LABELS,
    getElementRelation,
    CAT_TINH_NAMES,
    HUNG_SAT_NAMES,
    DAC_BIET_NAMES,
    TAM_HOP_GROUPS,
    TAM_HOP_ELEMENT,
    getGiapCungBranches,
    DUONG_BRANCHES,
    PALACE_FUNCTIONAL_CONTEXT,
    STAR_IN_PALACE_CONTEXT,
    NHI_HOP_PAIRS,
    LUC_HAI_PAIRS,
    MALE_PRIORITY_PALACES,
    FEMALE_PRIORITY_PALACES,
} from '../palaceKnowledgeBase';
import { MUTAGEN_CONFIG } from '../tuviTypes';
import { getBrightnessCategory, getBrightnessLabel, extractBasePalaceName, formatMutagen, OPPOSITE_BRANCHES } from './palaceHelpers';

// ── §I Basic Info ─────────────────────────────────────────────
export function analyzeBasicInfo(palace: TuViPalace, baseName: string, chart: TuViChartData): string {
    const parts: string[] = [];
    const branch = palace.earthlyBranch;
    const stem = palace.heavenlyStem;
    const isYang = DUONG_BRANCHES.has(branch);

    parts.push(`Cung ${baseName} tọa tại **${stem} ${branch}** (${isYang ? 'Dương' : 'Âm'} cung).`);

    // Cục-Mệnh relationship
    if (chart.cucElement && chart.cucMenhRelation) {
        parts.push(`Cục: **${chart.fiveElementsClass}** — ${chart.cucMenhRelation}.`);
    }
    // Âm Dương lý
    if (chart.amDuongLy) {
        parts.push(`Âm Dương: **${chart.amDuongLy}** (${chart.amDuongLy === 'Thuận lý' ? 'an mệnh thuận chiều, cuộc đời ít trở ngại lớn' : 'an mệnh nghịch chiều, cuộc đời nhiều thử thách nhưng lại rèn luyện bản thân'}).`);
    }
    // Body palace note
    if (palace.isBodyPalace) {
        parts.push('⚡ Cung an **Thân** đồng cung — cung này ảnh hưởng mạnh mẽ đến đời sống sau 30 tuổi.');
    } else if (chart.bodyPalaceName) {
        const bodyBaseName = extractBasePalaceName(chart.bodyPalaceName);
        if (baseName === 'Mệnh') {
            parts.push(`Cung Thân tọa tại **${bodyBaseName}** — khác Mệnh, cho thấy cuộc đời hai giai đoạn rõ rệt.`);
        }
    }
    return parts.join(' ');
}

// ── §II Element Relationship ──────────────────────────────────
export function analyzeElementRelations(palace: TuViPalace, chart: TuViChartData): string {
    if (palace.majorStars.length === 0) return '';
    const parts: string[] = [];
    const cucEl = chart.cucElement ?? '';

    // Extract natal element from fiveElementsClass (e.g. "Thủy Nhị Cục" → "Thủy")
    const napAmYear = chart.napAmYear ?? '';

    for (const star of palace.majorStars) {
        if (!star.element) continue;
        // Star vs Cục
        if (cucEl) {
            const rel = getElementRelation(star.element, cucEl);
            if (rel) {
                parts.push(`**${star.name}** (${star.element}) vs Cục (${cucEl}): ${rel}.`);
            }
        }
    }

    // Ngũ Hành bản mệnh (nạp âm) note if available
    if (napAmYear) {
        parts.push(`Nạp âm năm sinh: **${napAmYear}**.`);
    }

    return parts.length > 0
        ? `Phân tích Ngũ Hành: ${parts.join(' ')}`
        : '';
}

// ── §III Cát/Hung Star Categorization ─────────────────────────
export function categorizeAuxStars(palace: TuViPalace): { catTinh: string[]; hungSat: string[]; dacBiet: string[] } {
    const auxStars: TuViStar[] = [...(palace.minorStars ?? []), ...(palace.adjectiveStars ?? [])];
    const catTinh: string[] = [];
    const hungSat: string[] = [];
    const dacBiet: string[] = [];

    for (const s of auxStars) {
        if (CAT_TINH_NAMES.has(s.name)) {
            const mutStr = formatMutagen(s);
            catTinh.push(mutStr ? `${s.name} (${mutStr})` : s.name);
        } else if (HUNG_SAT_NAMES.has(s.name)) {
            const mutStr = formatMutagen(s);
            hungSat.push(mutStr ? `${s.name} (${mutStr})` : s.name);
        } else if (DAC_BIET_NAMES.has(s.name)) {
            dacBiet.push(s.name);
        }
    }
    return { catTinh, hungSat, dacBiet };
}

// ── §V Tam Hợp Analysis ──────────────────────────────────────
export function analyzeTamHop(palace: TuViPalace, chart: TuViChartData): string | null {
    const branch = palace.earthlyBranch;
    const trineGroup = TAM_HOP_GROUPS[branch];
    if (!trineGroup) return null;

    const element = TAM_HOP_ELEMENT[branch] ?? '';
    const otherBranches = trineGroup.filter(b => b !== branch);
    const parts: string[] = [];
    parts.push(`Nhóm Tam Hợp **${element} cục** (${trineGroup.join(' – ')}).`);

    for (const otherBranch of otherBranches) {
        const otherPalace = chart.palaces.find(p => p.earthlyBranch === otherBranch);
        if (!otherPalace) continue;
        const otherName = extractBasePalaceName(otherPalace.name);
        if (otherPalace.majorStars.length > 0) {
            const starList = otherPalace.majorStars.map(s => {
                const bl = getBrightnessLabel(s.brightness);
                return bl ? `${s.name} (${bl})` : s.name;
            }).join(', ');
            parts.push(`Từ **${otherName}** (${otherBranch}): ${starList} hội chiếu.`);
        } else {
            parts.push(`**${otherName}** (${otherBranch}): vô chính diệu, sức hội chiếu yếu.`);
        }
    }

    return parts.join(' ');
}

// ── §V-bis Nhị Hợp & Lục Hại Analysis ────────────────────────
export function analyzeNhiHop(palace: TuViPalace, chart: TuViChartData): string | null {
    const branch = palace.earthlyBranch;
    const parts: string[] = [];

    // Nhị Hợp (Lục Hợp)
    const nhiHop = NHI_HOP_PAIRS[branch];
    if (nhiHop) {
        const partnerPalace = chart.palaces.find(p => p.earthlyBranch === nhiHop.partner);
        if (partnerPalace) {
            const partnerName = extractBasePalaceName(partnerPalace.name);
            parts.push(`🤝 **Nhị Hợp (Lục Hợp):** ${nhiHop.description}`);
            if (partnerPalace.majorStars.length > 0) {
                const starList = partnerPalace.majorStars.map(s => {
                    const bl = getBrightnessLabel(s.brightness);
                    return bl ? `${s.name} (${bl})` : s.name;
                }).join(', ');
                parts.push(`Cung hợp: **${partnerName}** (${nhiHop.partner}) — chính tinh: ${starList}. Hai cung tương trợ bổ sung năng lượng cho nhau.`);
            } else {
                parts.push(`Cung hợp: **${partnerName}** (${nhiHop.partner}) — vô chính diệu, sức hợp yếu.`);
            }
        }
    }

    // Lục Hại
    const lucHai = LUC_HAI_PAIRS[branch];
    if (lucHai) {
        const harmPalace = chart.palaces.find(p => p.earthlyBranch === lucHai.partner);
        if (harmPalace) {
            const harmName = extractBasePalaceName(harmPalace.name);
            parts.push(`⚡ **Lục Hại:** ${lucHai.description}`);
            parts.push(`Cung hại: **${harmName}** (${lucHai.partner}) — cần chú ý mâu thuẫn ngầm trong lĩnh vực ${harmName.toLowerCase()}.`);
        }
    }

    return parts.length > 0 ? parts.join(' ') : null;
}

// ── §V Giáp Cung Analysis ─────────────────────────────────────
export function analyzeGiapCung(palace: TuViPalace, chart: TuViChartData): string | null {
    const [prevBranch, nextBranch] = getGiapCungBranches(palace.earthlyBranch);
    if (!prevBranch || !nextBranch) return null;

    const prevPalace = chart.palaces.find(p => p.earthlyBranch === prevBranch);
    const nextPalace = chart.palaces.find(p => p.earthlyBranch === nextBranch);
    if (!prevPalace && !nextPalace) return null;

    const parts: string[] = ['Hai cung giáp (kẹp) hai bên:'];

    for (const [label, adj] of [['Trước', prevPalace], ['Sau', nextPalace]] as const) {
        if (!adj) continue;
        const adjName = extractBasePalaceName(adj.name);
        // Collect notable stars by category
        const allAdj = [...adj.majorStars, ...(adj.minorStars ?? []), ...(adj.adjectiveStars ?? [])];
        const majorNames = adj.majorStars.map(s => {
            const bl = getBrightnessLabel(s.brightness);
            return bl ? `${s.name} (${bl})` : s.name;
        });
        const catNames = allAdj.filter(s => CAT_TINH_NAMES.has(s.name)).map(s => s.name);
        const hungNames = allAdj.filter(s => HUNG_SAT_NAMES.has(s.name)).map(s => s.name);

        // Build detailed description
        const detail: string[] = [];
        if (majorNames.length > 0) detail.push(majorNames.join(', '));
        if (catNames.length > 0) detail.push(`cát: ${catNames.join(', ')}`);
        if (hungNames.length > 0) detail.push(`hung: ${hungNames.join(', ')}`);

        if (catNames.length > 0 && hungNames.length === 0) {
            parts.push(`${label} — **${adjName}**: ${detail.join('; ')} → giáp cát, hỗ trợ bảo vệ cung này.`);
        } else if (hungNames.length > 0 && catNames.length === 0) {
            parts.push(`${label} — **${adjName}**: ${detail.join('; ')} → giáp hung, tạo áp lực hai bên.`);
        } else if (catNames.length > 0 && hungNames.length > 0) {
            parts.push(`${label} — **${adjName}**: ${detail.join('; ')} → cát hung lẫn lộn, ảnh hưởng hỗn hợp.`);
        } else if (majorNames.length > 0) {
            parts.push(`${label} — **${adjName}**: ${majorNames.join(', ')} giáp cung.`);
        }
    }

    return parts.length > 1 ? parts.join(' ') : null;
}

// ── §VI Tràng Sinh Cycle Analysis ─────────────────────────────
export function analyzeChangSheng(palace: TuViPalace): string | null {
    const cs = palace.changsheng12;
    if (!cs) return null;
    const info = TRANG_SINH_MEANINGS[cs];
    if (!info) return null;
    const label = TRANG_SINH_VN_LABELS[cs] ?? cs;
    const qualityEmoji = info.quality === 'strong' ? '🟢' : info.quality === 'weak' ? '🔴' : '🟡';
    return `${qualityEmoji} Vị trí Tràng Sinh: **${label}** — ${info.meaning}`;
}

// ── §VII Palace Functional Meaning (Star-Aware) ──────────────
export function analyzePalaceFunction(
    baseName: string,
    palace: TuViPalace,
    chart: TuViChartData,
): { health: string; personality: string; career: string; advice: string } | null {
    const ctx = PALACE_FUNCTIONAL_CONTEXT[baseName];
    if (!ctx) return null;

    // Start with static base
    const health = ctx.healthFocus;
    let personality = ctx.personalityFocus;
    const career = ctx.careerFocus;
    const advice = ctx.keyAdvice;

    // ── Enrich with actual star context ──
    const starsPresent = palace.majorStars.length > 0
        ? palace.majorStars
        : (() => {
            // Borrow from đối cung for vô chính diệu
            const oppBranch = OPPOSITE_BRANCHES[palace.earthlyBranch];
            const oppPalace = oppBranch ? chart.palaces.find(p => p.earthlyBranch === oppBranch) : undefined;
            return oppPalace?.majorStars ?? [];
        })();

    if (starsPresent.length > 0) {
        const starContexts: string[] = [];
        for (const star of starsPresent) {
            const starCtx = STAR_IN_PALACE_CONTEXT[star.name]?.[baseName];
            if (starCtx) {
                // Extract health/career hints from star context
                starContexts.push(`${star.name}: ${starCtx.split('.')[0]}.`);
            }
        }
        if (starContexts.length > 0) {
            const starSummary = starContexts.join(' ');
            const brightnessNote = starsPresent.some(s => getBrightnessCategory(s.brightness) === 'strong')
                ? 'Chính tinh đắc địa nên khía cạnh này được tăng cường.'
                : starsPresent.some(s => getBrightnessCategory(s.brightness) === 'weak')
                    ? 'Chính tinh hãm nên khía cạnh này bị suy giảm.'
                    : '';
            personality = `${ctx.personalityFocus} Với ${starSummary} ${brightnessNote}`.trim();
        }
    }

    return { health, personality, career, advice };
}

// ── §IX Overall Assessment ────────────────────────────────────
export function generateOverallAssessment(
    palace: TuViPalace,
    baseName: string,
    catHung: { catTinh: string[]; hungSat: string[]; dacBiet: string[] },
    chart: TuViChartData,
): string {
    const parts: string[] = [];

    // Star brightness assessment
    const strong = palace.majorStars.filter(s => getBrightnessCategory(s.brightness) === 'strong').length;
    const weak = palace.majorStars.filter(s => getBrightnessCategory(s.brightness) === 'weak').length;
    const total = palace.majorStars.length;

    // Cát/Hung balance
    const catCount = catHung.catTinh.length;
    const hungCount = catHung.hungSat.length;

    // Tứ Hóa present
    const allStars = [...palace.majorStars, ...(palace.minorStars ?? []), ...(palace.adjectiveStars ?? [])];
    const hasLoc = allStars.some(s => s.mutagen?.some(m => MUTAGEN_CONFIG[m]?.label === 'Hóa Lộc'));
    const hasKy = allStars.some(s => s.mutagen?.some(m => MUTAGEN_CONFIG[m]?.label === 'Hóa Kỵ'));

    // Tràng Sinh quality
    const cs = palace.changsheng12;
    const csInfo = cs ? TRANG_SINH_MEANINGS[cs] : undefined;

    // Determine overall grade
    let grade: string;
    let score = 0;
    if (total > 0) score += strong * 2 - weak * 2;
    score += catCount - hungCount;
    if (hasLoc) score += 2;
    if (hasKy) score -= 2;
    if (csInfo?.quality === 'strong') score += 1;
    if (csInfo?.quality === 'weak') score -= 1;
    if (palace.hasTuanKhong) score -= 1;
    if (palace.hasTrietKhong) score -= 1;

    if (total === 0) {
        grade = 'Vô Chính Diệu — phụ thuộc đối cung và phụ tinh';
    } else if (score >= 4) {
        grade = '⭐ Cách cục rất tốt (Thượng Cách)';
    } else if (score >= 2) {
        grade = '✅ Cách cục tốt (Trung Thượng)';
    } else if (score >= 0) {
        grade = '🟡 Cách cục trung bình (Trung Cách)';
    } else if (score >= -2) {
        grade = '⚠️ Cách cục kém (Trung Hạ)';
    } else {
        grade = '🔴 Cách cục xấu (Hạ Cách) — cần cát tinh cứu giải';
    }

    parts.push(`**Đánh giá cung ${baseName}:** ${grade}.`);

    // Balance summary
    if (catCount > 0 && hungCount === 0) {
        parts.push('Phụ tinh toàn cát, hỗ trợ tích cực.');
    } else if (hungCount > 0 && catCount === 0) {
        parts.push('Phụ tinh toàn hung sát, cần chú ý hóa giải.');
    } else if (catCount > 0 && hungCount > 0) {
        parts.push(`Cát hung hỗn tạp (${catCount} cát, ${hungCount} hung) — cát giảm bớt sức mạnh, hung được hóa giải phần nào.`);
    }

    // Gender-aware palace priority note
    const isMalePriority = MALE_PRIORITY_PALACES.includes(baseName);
    const isFemalePriority = FEMALE_PRIORITY_PALACES.includes(baseName);
    if (isMalePriority && isFemalePriority) {
        parts.push('Đây là cung trọng yếu cho cả nam và nữ mệnh.');
    } else if (isMalePriority) {
        parts.push('Đây là cung trọng yếu đặc biệt cho **nam mệnh** (Phúc-Mệnh-Quan-Tài).');
    } else if (isFemalePriority) {
        parts.push('Đây là cung trọng yếu đặc biệt cho **nữ mệnh** (Phúc-Mệnh-Phu-Tài-Tử).');
    }

    // Mệnh-Thân-Phúc Đức cross-reference triangle
    if (baseName === 'Mệnh') {
        const phucDuc = chart.palaces.find(p => p.name.includes('Phúc Đức'));
        if (phucDuc) {
            const phucStars = phucDuc.majorStars;
            const phucStrong = phucStars.filter(s => getBrightnessCategory(s.brightness) === 'strong').length;
            const phucWeak = phucStars.filter(s => getBrightnessCategory(s.brightness) === 'weak').length;
            if (phucStrong > 0 && phucWeak === 0) {
                parts.push('📌 Phúc Đức (gốc rễ Mệnh) đắc địa — nền tảng phúc đức vững chắc, hỗ trợ toàn cục.');
            } else if (phucWeak > 0 && phucStrong === 0) {
                parts.push('📌 Phúc Đức (gốc rễ Mệnh) hãm — nền tảng phúc đức yếu, cần tu dưỡng bồi đắp.');
            }
        }
        if (chart.bodyPalaceName && !palace.isBodyPalace) {
            parts.push(`Thân cư tại ${extractBasePalaceName(chart.bodyPalaceName)} — khác Mệnh, cuộc đời hai giai đoạn rõ rệt (trẻ theo Mệnh, sau 30 theo Thân).`);
        } else if (palace.isBodyPalace) {
            parts.push('Mệnh-Thân đồng cung — cuộc đời ít biến đổi lớn giữa tiền vận và hậu vận.');
        }
    }

    // School-specific synthesis note
    if (total > 0) {
        const tamHopNote = strong > 0
            ? 'Theo Tam Hợp Phái: chính tinh đắc địa, cách cục sáng — ưu tiên xem tam hợp chiếu và miếu địa.'
            : weak > 0
                ? 'Theo Tam Hợp Phái: chính tinh hãm — cần phụ tinh cát giải cứu, xem tam hợp chiếu bổ sung.'
                : '';
        const tuHoaNote = (hasLoc || hasKy)
            ? `Theo Tứ Hóa Phái: ${hasLoc ? 'Hóa Lộc mang tài lộc' : ''}${hasLoc && hasKy ? ', ' : ''}${hasKy ? 'Hóa Kỵ tạo trở ngại nhưng cũng là động lực' : ''} — xem phi tinh dẫn động giữa các cung.`
            : '';
        if (tamHopNote) parts.push(tamHopNote);
        if (tuHoaNote) parts.push(tuHoaNote);
    }

    return parts.join(' ');
}
