/**
 * Overall Chart Assessment — Phú · Quý · Thọ scoring and life milestones
 *
 * Extracted from chartAnalysis.ts for maintainability.
 * Scores key palace groups and derives strengths, weaknesses,
 * milestone predictions, and element-based advice.
 */

import type { TuViChartData, TuViPalace } from './tuviTypes';

// ═══════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════

export interface OverallAssessment {
    readonly phuRating: number;       // 1-5 wealth rating
    readonly quyRating: number;       // 1-5 nobility rating
    readonly thoRating: number;       // 1-5 longevity rating
    readonly strengths: string[];
    readonly weaknesses: string[];
    readonly milestones: string[];    // Key life period predictions
    readonly advice: string[];        // Remediation advice
    readonly summary: string;
}

// ═══════════════════════════════════════════════════════════════════
// Main Function
// ═══════════════════════════════════════════════════════════════════

export function getOverallChartAssessment(chart: TuViChartData): OverallAssessment {
    const AUSPICIOUS = new Set(['Văn Xương', 'Văn Khúc', 'Tả Phụ', 'Hữu Bật', 'Thiên Khôi', 'Thiên Việt']);
    const MALEFIC = new Set(['Kình Dương', 'Đà La', 'Hỏa Tinh', 'Linh Tinh', 'Địa Không', 'Địa Kiếp']);

    const findPalace = (prefix: string) => chart.palaces.find(p => p.name.includes(prefix));

    const scorePalace = (palace: TuViPalace | undefined): number => {
        if (!palace) return 2;
        let score = 3; // baseline

        // Major stars brightness
        for (const star of palace.majorStars) {
            if (['庙', '旺', '得', 'Miếu', 'Vượng', 'Đắc'].includes(star.brightness)) score += 0.5;
            else if (['陷', '不', 'Hãm', 'Bất'].includes(star.brightness)) score -= 0.5;
        }
        if (palace.majorStars.length === 0) score -= 1;

        // Auspicious stars
        const allMinors = [...(palace.minorStars ?? []), ...(palace.adjectiveStars ?? [])];
        for (const s of allMinors) {
            if (AUSPICIOUS.has(s.name)) score += 0.3;
            if (MALEFIC.has(s.name)) score -= 0.3;
        }

        // Tứ Hóa
        const allStars = [...palace.majorStars, ...allMinors];
        for (const s of allStars) {
            if (s.mutagen?.some(m => m === '禄' || m === 'Lộc')) score += 0.5;
            if (s.mutagen?.some(m => m === '忌' || m === 'Kỵ')) score -= 0.5;
        }

        return Math.max(1, Math.min(5, Math.round(score)));
    };

    // Phú (wealth): Tài Bạch + Quan Lộc + Điền Trạch
    const taiPalace = findPalace('Tài Bạch');
    const quanPalace = findPalace('Quan Lộc');
    const dienPalace = findPalace('Điền Trạch');
    const phu = Math.round((scorePalace(taiPalace) + scorePalace(quanPalace) + scorePalace(dienPalace)) / 3);

    // Quý (nobility): Mệnh + Quan Lộc + Phúc Đức
    const menhPalace = chart.palaces.find(p => p.isSoulPalace);
    const phucPalace = findPalace('Phúc Đức');
    const quy = Math.round((scorePalace(menhPalace) + scorePalace(quanPalace) + scorePalace(phucPalace)) / 3);

    // Thọ (longevity): Phúc Đức + Tật Ách + Mệnh
    const tatPalace = findPalace('Tật Ách');
    const tho = Math.round((scorePalace(phucPalace) + scorePalace(tatPalace) + scorePalace(menhPalace)) / 3);

    // Strengths & Weaknesses
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    const palacePairs: [string, TuViPalace | undefined][] = [
        ['Mệnh', menhPalace], ['Tài Bạch', taiPalace], ['Quan Lộc', quanPalace],
        ['Phúc Đức', phucPalace], ['Phu Thê', findPalace('Phu Thê')],
        ['Tật Ách', tatPalace], ['Điền Trạch', dienPalace],
    ];

    for (const [name, palace] of palacePairs) {
        if (!palace) continue;
        const score = scorePalace(palace);
        if (score >= 4) {
            const starStr = palace.majorStars.map(s => s.name).join(', ') || 'đặc biệt';
            strengths.push(`Cung ${name} tốt (${starStr}) — lĩnh vực này là thế mạnh.`);
        }
        if (score <= 2) {
            weaknesses.push(`Cung ${name} yếu — lĩnh vực cần chú ý và bổ trợ.`);
        }
    }

    if (strengths.length === 0) strengths.push('Lá số phân bố đều, không có cung nào nổi trội đặc biệt.');
    if (weaknesses.length === 0) weaknesses.push('Không có cung nào quá yếu, lá số khá cân bằng.');

    // Milestones from Đại Vận peaks
    const milestones: string[] = [];
    const sortedPalaces = [...chart.palaces].sort((a, b) => a.stage.range[0] - b.stage.range[0]);
    for (const p of sortedPalaces) {
        const [startAge, endAge] = p.stage.range;
        if (startAge === 0 && endAge === 0) continue;
        const score = scorePalace(p);
        if (score >= 4) {
            milestones.push(`${startAge}–${endAge} tuổi: giai đoạn thuận lợi (Đại Vận cung ${p.name}).`);
        } else if (score <= 2) {
            milestones.push(`${startAge}–${endAge} tuổi: giai đoạn cần cẩn trọng (Đại Vận cung ${p.name}).`);
        }
    }
    if (milestones.length === 0) milestones.push('Các giai đoạn Đại Vận tương đối đồng đều, không có đỉnh cao hay đáy sâu rõ rệt.');

    // Advice based on element deficiency
    const advice: string[] = [];
    const cucEl = chart.cucElement || chart.fiveElementsClass || '';
    if (cucEl) {
        const EL_ADVICE: Record<string, string> = {
            'Kim': 'Bản mệnh Kim — nên gần gũi ngành liên quan đến kim loại, tài chính, ngân hàng. Tránh xung đột với người mệnh Hỏa.',
            'Mộc': 'Bản mệnh Mộc — nên phát triển ngành giáo dục, nông nghiệp, sáng tạo. Bổ sung ngũ hành Thủy (nước, du lịch) để sinh Mộc.',
            'Thủy': 'Bản mệnh Thủy — nên phát triển ngành thương mại, du lịch, truyền thông. Bổ sung ngũ hành Kim (kim loại) để sinh Thủy.',
            'Hỏa': 'Bản mệnh Hỏa — nên phát triển ngành năng lượng, công nghệ, giải trí. Bổ sung ngũ hành Mộc (cây xanh) để sinh Hỏa.',
            'Thổ': 'Bản mệnh Thổ — nên phát triển ngành bất động sản, xây dựng, nông nghiệp. Bổ sung ngũ hành Hỏa (ánh sáng) để sinh Thổ.',
        };
        const elAdvice = EL_ADVICE[cucEl];
        if (elAdvice) advice.push(elAdvice);
    }

    if (weaknesses.length > 0 && weaknesses[0].includes('Tài Bạch')) {
        advice.push('Tài Bạch yếu — cần tiết kiệm, tránh đầu tư mạo hiểm, xây dựng nền tảng tài chính vững.');
    }
    if (weaknesses.some(w => w.includes('Tật Ách'))) {
        advice.push('Tật Ách yếu — cần chú trọng sức khỏe, tập thể dục, khám sức khỏe định kỳ.');
    }
    advice.push('Luôn nhớ: lá số là tiềm năng, nỗ lực cá nhân và tu dưỡng đạo đức mới quyết định kết quả.');

    // Summary
    const ratingLabel = (r: number) =>
        r >= 5 ? 'Tốt' : r >= 4 ? 'Khá Tốt' : r >= 3 ? 'Trung Bình' : r >= 2 ? 'Khá Xấu' : 'Xấu';

    const summary = `Phú: ${ratingLabel(phu)} | Quý: ${ratingLabel(quy)} | Thọ: ${ratingLabel(tho)}. ` +
        `Điểm mạnh: ${strengths.length} lĩnh vực. Điểm yếu: ${weaknesses.length} lĩnh vực.`;

    return {
        phuRating: phu,
        quyRating: quy,
        thoRating: tho,
        strengths,
        weaknesses,
        milestones,
        advice,
        summary,
    };
}
