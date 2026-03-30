/**
 * Lưu Niên (Annual Fortune) Analysis
 *
 * Extracted from chartAnalysis.ts for maintainability.
 * Analyzes the annual fortune based on temporal overlay data
 * (yearlyName, yearlyStars, decadalName) populated on each palace.
 */

import type { TuViChartData } from './tuviTypes';
import { MUTAGEN_CONFIG } from './tuviTypes';
import type { TuHoaEntry } from './chartAnalysis';

// ═══════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════

/** A single palace's annual analysis */
export interface PalaceYearAnalysis {
    readonly palaceName: string;        // Natal palace name (e.g. "Tài Bạch")
    readonly luuNienRole: string;       // What this palace represents in Lưu Niên (e.g. "Mệnh")
    readonly natalMajorStars: string[]; // Major stars in the natal chart
    readonly overlayStars: string[];    // Yearly overlay stars
    readonly interpretation: string;    // Academic interpretation text
}

/** Overall Lưu Niên analysis result */
export interface LuuNienAnalysis {
    readonly luuNienMenhPalace: string;      // Natal palace that IS the Lưu Niên Mệnh
    readonly luuNienBranch: string;          // Earthly Branch of the target year
    readonly daiHanPalace: string;           // Đại Hạn palace name for context
    readonly daiHanRange: string;            // Đại Hạn age range
    readonly palaceAnalyses: PalaceYearAnalysis[];
    readonly tuHoaYearly: TuHoaEntry[];     // Year's Tứ Hóa distribution
    readonly overallAssessment: string;      // Summary verdict
}

// ═══════════════════════════════════════════════════════════════════
// Constants
// ═══════════════════════════════════════════════════════════════════

/** Key Lưu Niên palace names to analyze (in order) */
const LUU_NIEN_KEY_PALACES = ['Mệnh', 'Tài Bạch', 'Quan Lộc', 'Phu Thê', 'Phúc Đức'];

/** Classical interpretation templates for palace roles */
const PALACE_ROLE_CONTEXT: Record<string, string> = {
    'Mệnh': 'Tổng vận năm nay — phản ánh tâm thể, sức khỏe, tâm trạng và hướng đi chủ đạo.',
    'Tài Bạch': 'Tài chính năm nay — thu nhập, chi tiêu, cơ hội tài lộc và rủi ro tài chính.',
    'Quan Lộc': 'Sự nghiệp năm nay — công danh, thăng tiến, thay đổi nghề nghiệp.',
    'Phu Thê': 'Tình cảm năm nay — mối quan hệ tình cảm, hôn nhân, đối tác.',
    'Phúc Đức': 'Phúc đức năm nay — may mắn, sức khỏe tinh thần, sự bình an nội tâm.',
    'Thiên Di': 'Di chuyển năm nay — quan hệ xã hội, đi xa, thay đổi môi trường.',
    'Huynh Đệ': 'Anh em, bằng hữu năm nay — người đồng hành, cộng sự, hợp tác.',
    'Tử Tức': 'Con cái năm nay — vấn đề con cái, dự án sáng tạo, đầu tư.',
    'Tật Ách': 'Sức khỏe năm nay — bệnh tật, tai nạn, áp lực tinh thần.',
    'Điền Trạch': 'Nhà cửa năm nay — bất động sản, gia đình, nơi ở.',
    'Nô Bộc': 'Nhân sự năm nay — thuộc hạ, cộng sự, người dưới quyền.',
    'Phụ Mẫu': 'Cha mẹ năm nay — các bậc bề trên, giấy tờ, pháp luật.',
};

// ═══════════════════════════════════════════════════════════════════
// Main Function
// ═══════════════════════════════════════════════════════════════════

/**
 * Analyze the Lưu Niên (annual fortune) for the current targetYear.
 *
 * Requires the chart to have been generated with `targetYear` set,
 * so that temporal overlay data (yearlyName, yearlyStars, decadalName, etc.)
 * is already populated on each palace.
 *
 * Academic basis:
 * - Lưu Niên Mệnh is determined by the year's Earthly Branch
 * - The 12 Lưu Niên palaces rotate around the chart from there
 * - Stars in each Lưu Niên palace combine with natal stars
 * - Year's Heavenly Stem activates Lưu Niên Tứ Hóa
 */
export function getLuuNienAnalysis(chart: TuViChartData): LuuNienAnalysis | null {
    // Check if temporal data exists (requires targetYear to have been set)
    const hasYearlyData = chart.palaces.some(p => p.yearlyName);
    if (!hasYearlyData) return null;

    // 1. Find Lưu Niên Mệnh palace (the natal palace where yearlyName === 'Mệnh')
    const luuNienMenhIdx = chart.palaces.findIndex(p => p.yearlyName === 'Mệnh');
    const luuNienMenhPalace = luuNienMenhIdx >= 0
        ? chart.palaces[luuNienMenhIdx].name
        : '';

    // 2. Target year branch (from the chart's computed data)
    const luuNienBranch = chart.targetYearStemBranch
        ? chart.targetYearStemBranch.split(' ')[1] ?? ''
        : '';

    // 3. Đại Hạn context — find from the first palace that has decadal data
    let daiHanPalace = '';
    let daiHanRange = '';
    const daiHanMenhIdx = chart.palaces.findIndex(p => p.decadalName === 'Mệnh');
    if (daiHanMenhIdx >= 0) {
        const dhPalace = chart.palaces[daiHanMenhIdx];
        daiHanPalace = dhPalace.name;
        const range = dhPalace.stage.range;
        if (range[0] > 0 || range[1] > 0) {
            daiHanRange = `${range[0]}–${range[1]} tuổi`;
        }
    }

    // 4. Build Lưu Niên Tứ Hóa (overlay stars with mutagen)
    const tuHoaYearly: TuHoaEntry[] = [];
    for (const palace of chart.palaces) {
        if (!palace.yearlyStars) continue;
        for (const star of palace.yearlyStars) {
            if (star.mutagen && star.mutagen.length > 0) {
                for (const m of star.mutagen) {
                    const config = MUTAGEN_CONFIG[m];
                    if (config) {
                        tuHoaYearly.push({
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
    tuHoaYearly.sort((a, b) => (ORDER[a.mutagenKey] ?? 99) - (ORDER[b.mutagenKey] ?? 99));

    // 5. Build per-palace analyses for key Lưu Niên palaces
    const palaceAnalyses: PalaceYearAnalysis[] = [];

    for (const roleName of LUU_NIEN_KEY_PALACES) {
        const palaceIdx = chart.palaces.findIndex(p => p.yearlyName === roleName);
        if (palaceIdx < 0) continue;

        const palace = chart.palaces[palaceIdx];
        const natalMajorStars = palace.majorStars.map(s => s.name);
        const overlayStars = (palace.yearlyStars ?? []).map(s => s.name);

        // Build interpretation
        const parts: string[] = [];

        // Context sentence
        const roleContext = PALACE_ROLE_CONTEXT[roleName ?? ''];
        if (roleContext) parts.push(roleContext);

        // Natal stars in this palace
        if (natalMajorStars.length > 0) {
            parts.push(`Chính tinh gốc: ${natalMajorStars.join(', ')}.`);
        } else {
            parts.push('Cung này vô chính diệu, chịu ảnh hưởng từ cung chiếu và phụ tinh.');
        }

        // Overlay stars (Lưu Niên tinh)
        if (overlayStars.length > 0) {
            parts.push(`Sao lưu niên: ${overlayStars.join(', ')}.`);
        }

        // Lưu Niên Tứ Hóa landing in this palace
        const tuHoaHere = tuHoaYearly.filter(t => t.palaceName === palace.name);
        if (tuHoaHere.length > 0) {
            const labels = tuHoaHere.map(t => `${t.starName} ${t.mutagenLabel}`).join(', ');
            parts.push(`Lưu Niên Tứ Hóa tại đây: ${labels}.`);
        }

        // Auspicious / malefic star assessment
        const natalMinors = [...(palace.minorStars ?? [])];
        const auspiciousNames = ['Văn Xương', 'Văn Khúc', 'Tả Phụ', 'Hữu Bật', 'Thiên Khôi', 'Thiên Việt'];
        const maleficNames = ['Kình Dương', 'Đà La', 'Hỏa Tinh', 'Linh Tinh', 'Địa Không', 'Địa Kiếp'];
        const hasAuspicious = natalMinors.some(s => auspiciousNames.includes(s.name));
        const hasMalefic = natalMinors.some(s => maleficNames.includes(s.name));
        const hasLocTon = natalMinors.some(s => s.name === 'Lộc Tồn');
        const hasHoaLoc = tuHoaHere.some(t => t.mutagenLabel === 'Hóa Lộc');
        const hasHoaKy = tuHoaHere.some(t => t.mutagenLabel === 'Hóa Kỵ');

        if (hasHoaLoc || hasLocTon) {
            parts.push('→ Năm nay có tài lộc khá, cơ hội phát triển tích cực.');
        }
        if (hasHoaKy) {
            parts.push('→ Hóa Kỵ rơi vào đây — cần cẩn trọng, dễ gặp trở ngại hoặc thị phi.');
        }
        if (hasAuspicious && !hasMalefic) {
            parts.push('→ Cát tinh hội tụ, năm thuận lợi cho lĩnh vực này.');
        }
        if (hasMalefic && !hasAuspicious) {
            parts.push('→ Có sát tinh, cần chú ý phòng tránh rủi ro.');
        }

        palaceAnalyses.push({
            palaceName: palace.name,
            luuNienRole: roleName,
            natalMajorStars,
            overlayStars,
            interpretation: parts.join(' '),
        });
    }

    // 6. Overall assessment
    const assessmentParts: string[] = [];

    // Check Lưu Niên Mệnh quality
    if (luuNienMenhIdx >= 0) {
        const menhPalace = chart.palaces[luuNienMenhIdx];
        const hasMajors = menhPalace.majorStars.length > 0;
        const menhAuspicious = [...(menhPalace.minorStars ?? [])].filter(s =>
            ['Văn Xương', 'Văn Khúc', 'Tả Phụ', 'Hữu Bật', 'Thiên Khôi', 'Thiên Việt'].includes(s.name));
        const menhMalefic = [...(menhPalace.minorStars ?? [])].filter(s =>
            ['Kình Dương', 'Đà La', 'Hỏa Tinh', 'Linh Tinh', 'Địa Không', 'Địa Kiếp'].includes(s.name));

        if (hasMajors && menhAuspicious.length > 0 && menhMalefic.length === 0) {
            assessmentParts.push(`Lưu Niên Mệnh rơi vào cung ${luuNienMenhPalace} — có chính tinh tọa thủ và cát tinh hội tụ. Nhìn chung, đây là một năm thuận lợi.`);
        } else if (hasMajors && menhMalefic.length > 0) {
            assessmentParts.push(`Lưu Niên Mệnh rơi vào cung ${luuNienMenhPalace} — có chính tinh tọa thủ nhưng cũng có sát tinh. Năm có cả cơ hội lẫn thử thách, cần khéo léo ứng biến.`);
        } else if (!hasMajors) {
            assessmentParts.push(`Lưu Niên Mệnh rơi vào cung ${luuNienMenhPalace} — cung vô chính diệu. Năm nay chịu nhiều ảnh hưởng từ hoàn cảnh bên ngoài, cần chủ động hơn.`);
        } else {
            assessmentParts.push(`Lưu Niên Mệnh rơi vào cung ${luuNienMenhPalace}.`);
        }
    }

    // Đại Hạn note
    if (daiHanPalace) {
        assessmentParts.push(`Đại Hạn hiện tại: ${daiHanPalace} (${daiHanRange}). Lưu Niên nằm trong bối cảnh Đại Hạn này.`);
    }

    // Lưu Niên Tứ Hóa summary
    const locPalaces = tuHoaYearly.filter(t => t.mutagenLabel === 'Hóa Lộc').map(t => t.palaceName);
    const kyPalaces = tuHoaYearly.filter(t => t.mutagenLabel === 'Hóa Kỵ').map(t => t.palaceName);
    if (locPalaces.length > 0) {
        assessmentParts.push(`Hóa Lộc năm nay chiếu vào cung ${locPalaces.join(', ')} — hướng tài lộc thuận lợi.`);
    }
    if (kyPalaces.length > 0) {
        assessmentParts.push(`Hóa Kỵ năm nay rơi vào cung ${kyPalaces.join(', ')} — lĩnh vực cần cẩn trọng.`);
    }

    return {
        luuNienMenhPalace,
        luuNienBranch,
        daiHanPalace,
        daiHanRange,
        palaceAnalyses,
        tuHoaYearly,
        overallAssessment: assessmentParts.join(' '),
    };
}
