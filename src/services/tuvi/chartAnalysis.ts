/**
 * Chart Analysis Service — Structured interpretation data extraction
 * 
 * Provides pure functions to derive analysis sections from TuViChartData,
 * including chart overview, Tứ Hóa distribution, Mệnh-Thân analysis,
 * and notable features detection.
 */

import type { TuViChartData, TuViPalace, TuViStar } from './tuviTypes';
import { MUTAGEN_CONFIG, BRIGHTNESS_LABELS } from './tuviTypes';

// ═══════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════

export interface ChartOverview {
    readonly cucLabel: string;          // e.g. "Thủy Nhị Cục"
    readonly fiveElements: string;      // e.g. "Thủy"
    readonly menhPalaceName: string;    // e.g. "Mệnh (Tý)"
    readonly bodyPalaceName: string;    // e.g. "Tài Bạch"
    readonly amDuongLy: string;         // e.g. "Thuận lý" / "Nghịch lý"
    readonly cucMenhRelation: string;   // e.g. "Cục sinh Mệnh"
    readonly soul: string;              // Mệnh chủ
    readonly body: string;              // Thân chủ
}

export interface TuHoaEntry {
    readonly starName: string;
    readonly mutagenLabel: string;      // e.g. "Hóa Lộc"
    readonly mutagenCssClass: string;
    readonly palaceName: string;
    readonly mutagenKey: string;        // raw key e.g. "禄"
}

export interface MenhThanAnalysis {
    readonly menhPalaceName: string;
    readonly menhBranch: string;
    readonly menhMajorStars: string[];
    readonly thanPalaceName: string;
    readonly thanBranch: string;
    readonly thanMajorStars: string[];
    readonly isSamePalace: boolean;
    readonly interpretation: string;
}

export interface NotableFeature {
    readonly icon: string;
    readonly title: string;
    readonly description: string;
    readonly severity: 'info' | 'warning' | 'positive';
}

// ═══════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════

function findPalaceByNamePrefix(palaces: TuViPalace[], prefix: string): TuViPalace | undefined {
    return palaces.find(p => p.name.includes(prefix));
}

function getAllStarsInPalace(palace: TuViPalace): TuViStar[] {
    return [
        ...palace.majorStars,
        ...(palace.minorStars ?? []),
        ...(palace.adjectiveStars ?? []),
    ];
}

function getBrightnessVietnamese(brightness: string): string {
    return BRIGHTNESS_LABELS[brightness] ?? brightness;
}

// ═══════════════════════════════════════════════════════════════════
// 1. Chart Overview
// ═══════════════════════════════════════════════════════════════════

export function getChartOverview(chart: TuViChartData): ChartOverview {
    const menhPalace = chart.palaces.find(p => p.isSoulPalace);
    const menhName = menhPalace
        ? `${menhPalace.name} (${menhPalace.earthlyBranch})`
        : 'N/A';

    const cucLabel = chart.cucElement && chart.cucNumber
        ? `${chart.cucElement} ${chart.cucNumber} Cục`
        : chart.fiveElementsClass || 'N/A';

    return {
        cucLabel,
        fiveElements: chart.cucElement || chart.fiveElementsClass || 'N/A',
        menhPalaceName: menhName,
        bodyPalaceName: chart.bodyPalaceName || 'N/A',
        amDuongLy: chart.amDuongLy || 'N/A',
        cucMenhRelation: chart.cucMenhRelation || 'N/A',
        soul: chart.soul || 'N/A',
        body: chart.body || 'N/A',
    };
}

// ═══════════════════════════════════════════════════════════════════
// 2. Tứ Hóa Distribution Map
// ═══════════════════════════════════════════════════════════════════

export function getTuHoaMap(chart: TuViChartData): TuHoaEntry[] {
    const entries: TuHoaEntry[] = [];

    for (const palace of chart.palaces) {
        const allStars = getAllStarsInPalace(palace);
        for (const star of allStars) {
            if (star.mutagen && star.mutagen.length > 0) {
                for (const m of star.mutagen) {
                    const config = MUTAGEN_CONFIG[m];
                    if (config) {
                        entries.push({
                            starName: star.name,
                            mutagenLabel: config.label,
                            mutagenCssClass: config.cssClass,
                            palaceName: palace.name,
                            mutagenKey: m,
                        });
                    }
                }
            }
        }
    }

    // Sort: Lộc → Quyền → Khoa → Kỵ
    const ORDER: Record<string, number> = { '禄': 0, 'Lộc': 0, '权': 1, 'Quyền': 1, '科': 2, 'Khoa': 2, '忌': 3, 'Kỵ': 3 };
    entries.sort((a, b) => (ORDER[a.mutagenKey] ?? 99) - (ORDER[b.mutagenKey] ?? 99));

    return entries;
}

// ═══════════════════════════════════════════════════════════════════
// 3. Mệnh — Thân Analysis
// ═══════════════════════════════════════════════════════════════════

export function getMenhThanAnalysis(chart: TuViChartData): MenhThanAnalysis | null {
    const menhPalace = chart.palaces.find(p => p.isSoulPalace);
    const thanPalace = chart.palaces.find(p => p.isBodyPalace);

    if (!menhPalace) return null;

    const menhStars = menhPalace.majorStars.map(s => s.name);
    const thanStars = thanPalace ? thanPalace.majorStars.map(s => s.name) : [];
    const isSame = menhPalace === thanPalace;

    let interpretation = '';
    if (isSame) {
        interpretation = 'Mệnh Thân đồng cung — cả tiền vận lẫn hậu vận đều chịu ảnh hưởng cùng một tổ hợp sao. Đời sống nhất quán, ít biến động lớn giữa hai nửa cuộc đời.';
    } else if (thanPalace) {
        const thanName = thanPalace.name.replace(/\s*\(Thân\)/, '');
        interpretation = `Thân cư cung ${thanName} — hậu vận (sau 30-35 tuổi) chịu ảnh hưởng mạnh từ lĩnh vực ${thanName}. `;

        if (thanPalace.majorStars.length === 0) {
            interpretation += 'Cung Thân vô chính diệu, hậu vận cần mượn sao đối cung để luận.';
        } else {
            const brightnessInfo = thanPalace.majorStars
                .map(s => {
                    const bLabel = getBrightnessVietnamese(s.brightness);
                    return bLabel ? `${s.name} (${bLabel})` : s.name;
                })
                .join(', ');
            interpretation += `Các chính tinh tọa thủ: ${brightnessInfo}.`;
        }
    }

    return {
        menhPalaceName: menhPalace.name,
        menhBranch: menhPalace.earthlyBranch,
        menhMajorStars: menhStars,
        thanPalaceName: thanPalace?.name ?? 'N/A',
        thanBranch: thanPalace?.earthlyBranch ?? '',
        thanMajorStars: thanStars,
        isSamePalace: isSame,
        interpretation,
    };
}

// ═══════════════════════════════════════════════════════════════════
// 4. Notable Features
// ═══════════════════════════════════════════════════════════════════

const KEY_PALACE_PREFIXES = ['Mệnh', 'Tài Bạch', 'Quan Lộc', 'Thiên Di', 'Phúc Đức', 'Phu Thê'];

export function getNotableFeatures(chart: TuViChartData): NotableFeature[] {
    const features: NotableFeature[] = [];

    // 1. Vô Chính Diệu at key palaces
    for (const prefix of KEY_PALACE_PREFIXES) {
        const palace = findPalaceByNamePrefix(chart.palaces, prefix);
        if (palace && palace.majorStars.length === 0) {
            features.push({
                icon: '🔲',
                title: `Cung ${palace.name} Vô Chính Diệu`,
                description: `Cung ${palace.name} không có chính tinh tọa thủ. Cần mượn sao đối cung (xung chiếu) để luận đoán. Sự ảnh hưởng của phụ tinh và hoàn cảnh bên ngoài là rất lớn.`,
                severity: 'warning',
            });
        }
    }

    // 2. Lộc Tồn position
    for (const palace of chart.palaces) {
        const allStars = getAllStarsInPalace(palace);
        const hasLocTon = allStars.some(s => s.name === 'Lộc Tồn');
        if (hasLocTon) {
            features.push({
                icon: '💰',
                title: `Lộc Tồn tại cung ${palace.name}`,
                description: `Lộc Tồn (tài lộc cố định) tọa tại cung ${palace.name}. Hai bên là Kình Dương và Đà La kẹp chặt, tạo "Dương Đà Giáp Lộc".`,
                severity: 'positive',
            });
            break;
        }
    }

    // 4. Thiên Mã position relative to Lộc
    for (const palace of chart.palaces) {
        const allStars = getAllStarsInPalace(palace);
        const hasMa = allStars.some(s => s.name === 'Thiên Mã');
        if (hasMa) {
            const hasLocSamePalace = allStars.some(s => s.name === 'Lộc Tồn') ||
                allStars.some(s => s.mutagen?.some(m => m === '禄' || m === 'Lộc'));
            if (hasLocSamePalace) {
                features.push({
                    icon: '🐎',
                    title: `Lộc Mã Giao Trì tại cung ${palace.name}`,
                    description: `Thiên Mã đồng cung với Lộc — "Lộc Mã Giao Trì", tượng trưng cho tài lộc đến nhanh, phát tài nhờ di chuyển, kinh doanh.`,
                    severity: 'positive',
                });
            }
            break;
        }
    }

    return features;
}

// ═══════════════════════════════════════════════════════════════════
// 4b. Star Distribution Map (Phân Bố Chính Tinh)
// ═══════════════════════════════════════════════════════════════════

export interface StarDistributionEntry {
    readonly palaceName: string;
    readonly earthlyBranch: string;
    readonly majorStarCount: number;
    readonly majorStarNames: string[];
    readonly isCungCuong: boolean;        // Is this a "strong palace"
}

export interface StarDistribution {
    readonly entries: StarDistributionEntry[];
    readonly dominantGroup: string;       // e.g. "Mệnh - Tài Bạch - Quan Lộc"
    readonly cungCuongNames: string[];    // Names of strongest palaces
    readonly emptyPalaceNames: string[];  // Vô chính diệu palaces
    readonly interpretation: string;
}

export function getStarDistribution(chart: TuViChartData): StarDistribution {
    const entries: StarDistributionEntry[] = [];
    let maxStars = 0;

    for (const palace of chart.palaces) {
        const majorNames = palace.majorStars.map(s => s.name);
        const count = majorNames.length;
        if (count > maxStars) maxStars = count;

        entries.push({
            palaceName: palace.name,
            earthlyBranch: palace.earthlyBranch,
            majorStarCount: count,
            majorStarNames: majorNames,
            isCungCuong: false, // Updated below
        });
    }

    // Mark cung cường: palaces with most major stars (and at least 2)
    const threshold = Math.max(2, maxStars);
    const cungCuongNames: string[] = [];
    const emptyPalaceNames: string[] = [];

    for (const entry of entries) {
        if (entry.majorStarCount >= threshold) {
            (entry as { isCungCuong: boolean }).isCungCuong = true;
            cungCuongNames.push(entry.palaceName);
        }
        if (entry.majorStarCount === 0) {
            emptyPalaceNames.push(entry.palaceName);
        }
    }

    // Find dominant tam hợp group
    const TAM_HOP_GROUPS: { name: string; palaces: string[] }[] = [
        { name: 'Mệnh – Tài Bạch – Quan Lộc', palaces: ['Mệnh', 'Tài Bạch', 'Quan Lộc'] },
        { name: 'Phúc Đức – Điền Trạch – Phụ Mẫu', palaces: ['Phúc Đức', 'Điền Trạch', 'Phụ Mẫu'] },
        { name: 'Phu Thê – Huynh Đệ – Nô Bộc', palaces: ['Phu Thê', 'Huynh Đệ', 'Nô Bộc'] },
        { name: 'Tử Tức – Tật Ách – Thiên Di', palaces: ['Tử Tức', 'Tật Ách', 'Thiên Di'] },
    ];

    let bestGroup = TAM_HOP_GROUPS[0];
    let bestGroupScore = 0;
    for (const group of TAM_HOP_GROUPS) {
        const score = group.palaces.reduce((sum, pName) => {
            const entry = entries.find(e => e.palaceName.includes(pName));
            return sum + (entry?.majorStarCount ?? 0);
        }, 0);
        if (score > bestGroupScore) {
            bestGroupScore = score;
            bestGroup = group;
        }
    }

    // Interpretation
    const parts: string[] = [];
    parts.push(`Chính tinh tập trung nhiều nhất ở nhóm ${bestGroup.name}.`);
    if (cungCuongNames.length > 0) {
        parts.push(`Cung cường: ${cungCuongNames.join(', ')} (${maxStars} chính tinh).`);
    }
    if (emptyPalaceNames.length > 0) {
        parts.push(`${emptyPalaceNames.length} cung vô chính diệu: ${emptyPalaceNames.join(', ')} — cần mượn sao đối cung.`);
    }

    return {
        entries,
        dominantGroup: bestGroup.name,
        cungCuongNames,
        emptyPalaceNames,
        interpretation: parts.join(' '),
    };
}

// ═══════════════════════════════════════════════════════════════════
// 4c. Phúc Đức Foundation (Gốc Rễ Lá Số)
// ═══════════════════════════════════════════════════════════════════

export interface PhucDucFoundation {
    readonly palaceName: string;
    readonly earthlyBranch: string;
    readonly majorStars: string[];
    readonly brightnessDetail: string;
    readonly tuHoaPresent: string[];
    readonly hasTuanKhong: boolean;
    readonly hasTrietKhong: boolean;
    readonly quality: 'excellent' | 'good' | 'average' | 'weak';
    readonly interpretation: string;
}

export function getPhucDucFoundation(chart: TuViChartData): PhucDucFoundation | null {
    const palace = chart.palaces.find(p => p.name.includes('Phúc Đức'));
    if (!palace) return null;

    const majorStars = palace.majorStars.map(s => s.name);
    const brightnessDetail = palace.majorStars
        .map(s => {
            const bLabel = BRIGHTNESS_LABELS[s.brightness] ?? s.brightness;
            return bLabel ? `${s.name} (${bLabel})` : s.name;
        })
        .join(', ');

    // Tứ Hóa present in this palace
    const tuHoaPresent: string[] = [];
    const allStars = getAllStarsInPalace(palace);
    for (const star of allStars) {
        if (star.mutagen && star.mutagen.length > 0) {
            for (const m of star.mutagen) {
                const config = MUTAGEN_CONFIG[m];
                if (config) {
                    tuHoaPresent.push(`${star.name} ${config.label}`);
                }
            }
        }
    }

    // Quality assessment
    const AUSPICIOUS = ['Văn Xương', 'Văn Khúc', 'Tả Phụ', 'Hữu Bật', 'Thiên Khôi', 'Thiên Việt'];
    const MALEFIC = ['Kình Dương', 'Đà La', 'Hỏa Tinh', 'Linh Tinh', 'Địa Không', 'Địa Kiếp'];
    const allMinors = [...(palace.minorStars ?? []), ...(palace.adjectiveStars ?? [])];
    const hasAuspicious = allMinors.some(s => AUSPICIOUS.includes(s.name));
    const hasMalefic = allMinors.some(s => MALEFIC.includes(s.name));

    let quality: PhucDucFoundation['quality'] = 'average';
    if (majorStars.length > 0) {
        const allBright = palace.majorStars.every(s =>
            ['庙', '旺', '得', 'Miếu', 'Vượng', 'Đắc'].includes(s.brightness));
        const anyDim = palace.majorStars.some(s =>
            ['陷', '不', 'Hãm', 'Bất'].includes(s.brightness));

        if (allBright && hasAuspicious && !hasMalefic) quality = 'excellent';
        else if (allBright || (hasAuspicious && !hasMalefic)) quality = 'good';
        else if (anyDim && hasMalefic) quality = 'weak';
    } else {
        quality = hasMalefic ? 'weak' : 'average';
    }

    // Interpretation
    const parts: string[] = [];
    parts.push('Cung Phúc Đức là gốc rễ của lá số — phản ánh phước đức tổ tiên, tiền nghiệp bản thân, ảnh hưởng lớn nhất đến thọ yểu, giàu nghèo, và đời sống tinh thần.');

    if (majorStars.length > 0) {
        parts.push(`Chính tinh tọa thủ: ${brightnessDetail}.`);
    } else {
        parts.push('Cung Phúc Đức vô chính diệu — phúc đức phải mượn từ đối cung (Tật Ách), dễ chịu ảnh hưởng ngoại lai.');
    }

    if (tuHoaPresent.length > 0) {
        parts.push(`Tứ Hóa: ${tuHoaPresent.join(', ')}.`);
    }

    if (quality === 'excellent') parts.push('→ Phúc đức tốt đẹp, gia tộc có tích đức. Đời sống tinh thần phong phú, lòng rộng rãi.');
    else if (quality === 'good') parts.push('→ Phúc đức khá, có nền tảng ổn. Biết tu dưỡng thì phúc ngày càng dày.');
    else if (quality === 'weak') parts.push('→ Phúc đức mỏng, cần tự tạo phúc. Hay lo lắng, đời sống tinh thần bất ổn.');
    else parts.push('→ Phúc đức trung bình, tùy thuộc vào nỗ lực cá nhân và tu dưỡng.');

    return {
        palaceName: palace.name,
        earthlyBranch: palace.earthlyBranch,
        majorStars,
        brightnessDetail,
        tuHoaPresent,
        hasTuanKhong: palace.hasTuanKhong ?? false,
        hasTrietKhong: palace.hasTrietKhong ?? false,
        quality,
        interpretation: parts.join(' '),
    };
}

// ═══════════════════════════════════════════════════════════════════
// 4d. Life Phase Overview (Tiền Vận & Hậu Vận)
// ═══════════════════════════════════════════════════════════════════

export interface LifePhaseOverview {
    readonly earlyLifePalace: string;     // Cung Mệnh
    readonly earlyLifeStars: string[];
    readonly earlyLifeAssessment: string;
    readonly lateLifePalace: string;      // Cung Thân
    readonly lateLifeStars: string[];
    readonly lateLifeAssessment: string;
    readonly isSamePalace: boolean;
    readonly transitionNote: string;
    readonly interpretation: string;
}

export function getLifePhaseOverview(chart: TuViChartData): LifePhaseOverview | null {
    const menhPalace = chart.palaces.find(p => p.isSoulPalace);
    const thanPalace = chart.palaces.find(p => p.isBodyPalace);
    if (!menhPalace) return null;

    const isSame = menhPalace === thanPalace;

    const assessPalace = (palace: TuViPalace): string => {
        const stars = palace.majorStars;
        if (stars.length === 0) return 'Vô chính diệu — chịu ảnh hưởng nhiều từ hoàn cảnh.';
        const allBright = stars.every(s =>
            ['庙', '旺', '得', 'Miếu', 'Vượng', 'Đắc'].includes(s.brightness));
        const anyDim = stars.some(s =>
            ['陷', '不', 'Hãm', 'Bất'].includes(s.brightness));
        const starList = stars.map(s => {
            const b = BRIGHTNESS_LABELS[s.brightness] ?? s.brightness;
            return b ? `${s.name} (${b})` : s.name;
        }).join(', ');

        if (allBright) return `${starList} — khí chất tốt, vận thế thuận lợi.`;
        if (anyDim) return `${starList} — gặp khó khăn, cần nỗ lực nhiều hơn.`;
        return `${starList} — vận thế bình ổn.`;
    };

    const earlyAssessment = assessPalace(menhPalace);
    const lateAssessment = thanPalace ? assessPalace(thanPalace) : 'N/A';

    let transitionNote = '';
    if (isSame) {
        transitionNote = 'Mệnh Thân đồng cung — cuộc đời nhất quán, tiền vận và hậu vận cùng xu hướng.';
    } else if (thanPalace) {
        const thanBaseName = thanPalace.name.replace(/\s*\(Thân\)/, '');
        transitionNote = `Sau trung niên (30-35 tuổi), vận mệnh chuyển dần sang lĩnh vực ${thanBaseName}. Cung Thân trở thành cung chủ đạo.`;
    }

    const parts: string[] = [];
    parts.push(`Tiền vận (trước 30-35 tuổi): cung Mệnh tại ${menhPalace.name}. ${earlyAssessment}`);
    if (!isSame && thanPalace) {
        parts.push(`Hậu vận (sau 30-35 tuổi): cung Thân cư ${thanPalace.name}. ${lateAssessment}`);
    }
    parts.push(transitionNote);

    return {
        earlyLifePalace: menhPalace.name,
        earlyLifeStars: menhPalace.majorStars.map(s => s.name),
        earlyLifeAssessment: earlyAssessment,
        lateLifePalace: thanPalace?.name ?? menhPalace.name,
        lateLifeStars: (thanPalace ?? menhPalace).majorStars.map(s => s.name),
        lateLifeAssessment: isSame ? earlyAssessment : lateAssessment,
        isSamePalace: isSame,
        transitionNote,
        interpretation: parts.join(' '),
    };
}

// ═══════════════════════════════════════════════════════════════════
// 4e. Overall Assessment — Moved to overallAssessment.ts
//     Re-exported here for backward compatibility
// ═══════════════════════════════════════════════════════════════════

export { getOverallChartAssessment } from './overallAssessment';
export type { OverallAssessment } from './overallAssessment';

// ═══════════════════════════════════════════════════════════════════
// 5. Lưu Niên Analysis — Moved to luuNienAnalysis.ts
//    Re-exported here for backward compatibility
// ═══════════════════════════════════════════════════════════════════

export { getLuuNienAnalysis } from './luuNienAnalysis';
export type { PalaceYearAnalysis, LuuNienAnalysis } from './luuNienAnalysis';

// ═══════════════════════════════════════════════════════════════════
// 6. Đại Vận (10-Year Major Period) Analysis
//    Moved to dedicated service: daiVanAnalysis.ts
//    Re-exported here for backward compatibility
// ═══════════════════════════════════════════════════════════════════

export { getDaiVanAnalysis } from './daiVanAnalysis';
export type { DaiVanPeriod, DaiVanAnalysis } from './daiVanAnalysis';

