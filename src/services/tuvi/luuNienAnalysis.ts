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

/** Conversational interpretation templates for palace roles */
const PALACE_ROLE_CONTEXT: Record<string, string> = {
    'Mệnh': 'Năm nay, trọng tâm của bạn xoay quanh vấn đề năng lượng bản thân, sức khỏe tổng quan và hướng đi chủ đạo trong cuộc sống.',
    'Tài Bạch': 'Về phương diện tài chính, đây là lúc cần chú ý đến dòng tiền, các cơ hội gia tăng thu nhập cũng như rủi ro hao tài.',
    'Quan Lộc': 'Trong công việc và sự nghiệp, năm nay mang đến những mốc thời gian quan trọng về thăng tiến hoặc thay đổi môi trường làm việc.',
    'Phu Thê': 'Về mặt tình cảm và các mối quan hệ gắn kết (hôn nhân, đối tác), năm nay sẽ có những điểm nhấn đáng chú ý.',
    'Phúc Đức': 'Về khía cạnh tinh thần và may mắn cốt lõi, đây là lúc đánh giá lại sự bình an nội tâm và phước báu của bạn.',
    'Thiên Di': 'Các hoạt động giao tế xã hội, thay đổi môi trường hoặc những chuyến đi xa sẽ mang lại nhiều tác động trong năm nay.',
    'Huynh Đệ': 'Mối quan hệ với anh chị em, bạn bè thân thiết hoặc cộng sự sẽ là một chủ đề quan trọng bạn cần lưu tâm.',
    'Tử Tức': 'Những vấn đề liên quan đến con cái, người dưới quyền hoặc các dự án đầu tư tâm huyết của bạn sẽ nổi bật.',
    'Tật Ách': 'Bạn cần đặc biệt lưu ý chăm sóc bản thân, phòng ngừa bệnh tật hoặc giải tỏa những áp lực tinh thần tiềm ẩn.',
    'Điền Trạch': 'Các vấn đề liên quan đến nhà cửa, bất động sản và môi trường sống của gia đình bạn có thể sẽ có biến động.',
    'Nô Bộc': 'Mối quan hệ với cấp dưới, đối tác xã giao hoặc khách quan sẽ đem lại cho bạn cả cơ hội lẫn thử thách.',
    'Phụ Mẫu': 'Năm nay, bạn cần dành sự quan tâm cho các bậc bề trên, cha mẹ hoặc chú ý các vấn đề liên quan đến giấy tờ, pháp lý.',
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
            parts.push(`Với năng lượng nền tảng từ chòm sao ${natalMajorStars.join(', ')}, bạn có cơ sở nội lực vững vàng để đối diện với các vấn đề này.`);
        } else {
            parts.push('Tuy nhiên, do cung này không có chính tinh tọa thủ (Vô Chính Diệu), bạn sẽ dễ bị tác động bởi hoàn cảnh bên ngoài và cần linh hoạt ứng biến theo thời cuộc.');
        }

        // Overlay stars (Lưu Niên tinh) const overlayStars = ... is evaluated above
        if (overlayStars.length > 0) {
            parts.push(`Đặc biệt, sự hiện diện của các sao lưu niên như ${overlayStars.join(', ')} sẽ trực tiếp kích phát nhiều sự kiện hội tụ trong năm.`);
        }

        // Lưu Niên Tứ Hóa landing in this palace
        const tuHoaHere = tuHoaYearly.filter(t => t.palaceName === palace.name);
        if (tuHoaHere.length > 0) {
            const labels = tuHoaHere.map(t => `${t.starName} biến thành ${t.mutagenLabel}`).join('; ');
            parts.push(`Điểm nhấn đáng kể là dấu ấn của Tứ Hóa bay về đây (${labels}), mang đến nguồn năng lượng chuyển hóa mạnh mẽ.`);
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

        // Conversational conclusion
        const conclusions: string[] = [];
        if (hasHoaLoc || hasLocTon) {
            conclusions.push('mở ra những cơ hội đón nhận tài lộc, sự sinh sôi và những kết quả rực rỡ mang tính tích cực');
        }
        if (hasAuspicious && !hasMalefic) {
            conclusions.push('dễ dàng gặp được quý nhân phù trợ, mọi việc diễn ra khá hanh thông và thuận lợi');
        }
        if (hasHoaKy) {
            conclusions.push('tiềm ẩn những rắc rối, thị phi hoặc cảm giác bế tắc cần kiên nhẫn tháo gỡ');
        }
        if (hasMalefic && !hasAuspicious) {
            conclusions.push('cảnh báo những chướng ngại, áp lực hoặc rủi ro bất ngờ đòi hỏi sự phòng bị kỹ lưỡng');
        }

        if (conclusions.length > 0) {
            let conclusionText: string;
            if (conclusions.length === 1) {
                conclusionText = conclusions[0];
            } else if (conclusions.length === 2) {
                conclusionText = conclusions[0] + ', nhưng đồng thời cũng ' + conclusions[1];
            } else {
                conclusionText = conclusions.slice(0, -1).join(', ') + ', và ' + conclusions[conclusions.length - 1];
            }
            parts.push(`👉 Lời khuyên: Tổ hợp sao báo hiệu năm nay sẽ ${conclusionText}.`);
        } else {
            parts.push('👉 Lời khuyên: Hãy giữ trạng thái cân bằng, làm tốt công việc hiện tại vì đây là khoảng thời gian bình ổn, không có quá nhiều xáo trộn lớn ở khía cạnh này.');
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
            assessmentParts.push(`Năm nay, trọng tâm cuộc vận (Lưu Niên Mệnh) của bạn rơi vào cung ${luuNienMenhPalace}. Sở hữu dàn chính tinh hội tụ cùng nhiều cát tinh ủng hộ, đây hứa hẹn sẽ là một năm rực rỡ, mọi sự thuận lợi hanh thông và có nhiều bước tiến lớn cần nắm bắt.`);
        } else if (hasMajors && menhMalefic.length > 0) {
            assessmentParts.push(`Năm nay, trọng tâm cuộc vận (Lưu Niên Mệnh) rơi vào cung ${luuNienMenhPalace}. Dù có nền tảng chính tinh vững chắc, sự đan xen của các sát tinh cho thấy bạn sẽ trải qua một năm đầy biến động — cơ hội luôn song hành cùng thử thách, đòi hỏi bản lĩnh ứng biến cao.`);
        } else if (!hasMajors) {
            assessmentParts.push(`Năm nay, trọng tâm cuộc vận (Lưu Niên Mệnh) rơi vào cung ${luuNienMenhPalace} — một cung Vô Chính Diệu. Năng lượng năm nay khá bấp bênh, bạn sẽ chịu nhiều tác động từ hoàn cảnh bên ngoài. Hãy học cách mượn lực từ quý nhân thay vì tự mình gánh vác mọi thứ.`);
        } else {
            assessmentParts.push(`Năm nay, trọng tâm cuộc vận (Lưu Niên Mệnh) rơi vào cung ${luuNienMenhPalace}. Đây là giai đoạn để bạn củng cố nội lực và hành động dựa trên những gì đã tích lũy.`);
        }
    }

    // Đại Hạn note
    if (daiHanPalace) {
        assessmentParts.push(`(Ghi chú: Vận trình lưu niên này nằm trong bối cảnh vĩ mô của Đại Hạn ${daiHanRange} tại cung ${daiHanPalace}).`);
    }

    // Lưu Niên Tứ Hóa summary
    const locPalaces = tuHoaYearly.filter(t => t.mutagenLabel === 'Hóa Lộc').map(t => t.palaceName);
    const kyPalaces = tuHoaYearly.filter(t => t.mutagenLabel === 'Hóa Kỵ').map(t => t.palaceName);
    if (locPalaces.length > 0) {
        assessmentParts.push(`✨ Điểm sáng lớn nhất: Hóa Lộc chiếu rọi cung ${locPalaces.join(', ')}, báo hiệu đây là nơi khởi nguồn cho tài lộc, sự sinh sôi và cơ hội tốt lành nhất trong năm.`);
    }
    if (kyPalaces.length > 0) {
        assessmentParts.push(`⚠️ Góc khuất cần lưu tâm: Hóa Kỵ ngự tại cung ${kyPalaces.join(', ')}, hãy đặc biệt cẩn trọng với những quyết định liên quan đến lĩnh vực này để tránh chuốc lấy phiền muộn, thị phi.`);
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
