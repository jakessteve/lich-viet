import type { TuViPalace, TuViStar, TuViChartData } from '../tuviTypes';
import { BRIGHTNESS_LABELS, MUTAGEN_CONFIG } from '../tuviTypes';
import { PALACE_ORDER } from '../palaceDescriptions';

// ═══════════════════════════════════════════════════════════════════
// Tuần Không / Triệt Không Impact
// ═══════════════════════════════════════════════════════════════════
export const TUAN_TRIET_DESCRIPTIONS: Record<string, string> = {
    'tuanKhong': '⭕ **Tuần Không** tại cung này: Tuần Không mang tính chất "hư vô", giảm bớt sức mạnh của các sao tại cung — kể cả cát tinh lẫn hung tinh. Cát tinh gặp Tuần Không thì giảm cát; sát tinh gặp Tuần Không thì giảm hung ("Không trung tàng ẩn"). Người có Tuần Không thường hướng nội, thích triết học, tâm linh, hoặc tôn giáo.',
    'trietKhong': '✂️ **Triệt Không** tại cung này: Triệt Không mang tính chất "cắt đứt, đoạn tuyệt" — mạnh hơn Tuần Không. Mọi sao tại cung đều bị triệt giảm lực lượng đáng kể. Tuy nhiên, nếu bản mệnh biết tu tập hoặc hướng vào tôn giáo, nghệ thuật thì Triệt Không lại trở thành cơ sở giải thoát.',
};

// ═══════════════════════════════════════════════════════════════════
// Đối Cung (Opposite Palace) Mapping
// ═══════════════════════════════════════════════════════════════════
export const OPPOSITE_BRANCHES: Record<string, string> = {
    'Tý': 'Ngọ', 'Ngọ': 'Tý',
    'Sửu': 'Mùi', 'Mùi': 'Sửu',
    'Dần': 'Thân', 'Thân': 'Dần',
    'Mão': 'Dậu', 'Dậu': 'Mão',
    'Thìn': 'Tuất', 'Tuất': 'Thìn',
    'Tỵ': 'Hợi', 'Hợi': 'Tỵ',
};

// ═══════════════════════════════════════════════════════════════════
// Brightness helper
// ═══════════════════════════════════════════════════════════════════
export function getBrightnessCategory(brightness: string): 'strong' | 'neutral' | 'weak' {
    if (brightness === '庙' || brightness === '旺') return 'strong';
    if (brightness === '不' || brightness === '陷') return 'weak';
    return 'neutral'; // 得, 利, 平, or empty
}

export function getBrightnessLabel(brightness: string): string {
    return BRIGHTNESS_LABELS[brightness] ?? brightness;
}

// ═══════════════════════════════════════════════════════════════════
// Mutagen helper (P1.5: Vietnamese labels instead of raw Chinese)
// ═══════════════════════════════════════════════════════════════════
export function formatMutagen(star: TuViStar): string {
    if (!star.mutagen || star.mutagen.length === 0) return '';
    return star.mutagen
        .map(m => {
            const config = MUTAGEN_CONFIG[m];
            return config ? config.label : m;
        })
        .join(', ');
}

// ═══════════════════════════════════════════════════════════════════
// Đối Cung (Opposite Palace) Analysis Helper
// ═══════════════════════════════════════════════════════════════════
export function analyzeDoiCung(palace: TuViPalace, chart: TuViChartData): string | null {
    const oppBranch = OPPOSITE_BRANCHES[palace.earthlyBranch];
    if (!oppBranch) return null;

    const oppPalace = chart.palaces.find(p => p.earthlyBranch === oppBranch);
    if (!oppPalace) return null;

    const parts: string[] = [];
    parts.push(`Đối cung (xung chiếu) là **${oppPalace.name}** (${oppBranch}).`);

    if (oppPalace.majorStars.length > 0) {
        const oppStarNames = oppPalace.majorStars.map(s => {
            const bl = getBrightnessLabel(s.brightness);
            return bl ? `${s.name} (${bl})` : s.name;
        }).join(', ');
        parts.push(`Chính tinh chiếu từ đối cung: **${oppStarNames}**. Các sao này ảnh hưởng gián tiếp, bổ trợ hoặc kiềm chế năng lượng cung ${palace.name}.`);

        // Evaluate quality of đối cung stars
        const catStars = oppPalace.majorStars.filter(s => getBrightnessCategory(s.brightness) === 'strong');
        const hamStars = oppPalace.majorStars.filter(s => getBrightnessCategory(s.brightness) === 'weak');
        if (catStars.length > 0 && hamStars.length === 0) {
            parts.push('Đối cung Miếu Vượng, chiếu sang rất tốt — bổ trợ mạnh mẽ cho cung này.');
        } else if (hamStars.length > 0 && catStars.length === 0) {
            parts.push('Đối cung Hãm địa, sức chiếu yếu — không hỗ trợ nhiều, cần dựa vào phụ tinh tại bản cung.');
        }
    } else {
        parts.push(`Đối cung ${oppPalace.name} cũng ở trạng thái vô chính diệu, sức chiếu rất yếu.`);
    }

    // Check if đối cung has notable aux stars
    const oppAux = [...(oppPalace.minorStars ?? []), ...(oppPalace.adjectiveStars ?? [])];
    const notableOppAux = oppAux.filter(s =>
        ['Văn Xương', 'Văn Khúc', 'Tả Phụ', 'Hữu Bật', 'Thiên Khôi', 'Thiên Việt',
            'Kình Dương', 'Đà La', 'Hỏa Tinh', 'Linh Tinh', 'Địa Không', 'Địa Kiếp',
            'Lộc Tồn', 'Thiên Mã'].includes(s.name)
    );
    if (notableOppAux.length > 0) {
        const auxNames = notableOppAux.map(s => s.name).join(', ');
        parts.push(`Phụ tinh đáng chú ý từ đối cung chiếu vào: ${auxNames}.`);
    }

    return parts.join(' ');
}

// ═══════════════════════════════════════════════════════════════════
// Tuần/Triệt Analysis Helper
// ═══════════════════════════════════════════════════════════════════
export function analyzeTuanTriet(palace: TuViPalace): string[] {
    const results: string[] = [];
    if (palace.hasTuanKhong) {
        results.push(TUAN_TRIET_DESCRIPTIONS['tuanKhong']);
    }
    if (palace.hasTrietKhong) {
        results.push(TUAN_TRIET_DESCRIPTIONS['trietKhong']);
    }
    return results;
}

/** Extract the base palace name (e.g. "Mệnh" from "Mệnh (Ngọ)") */
export function extractBasePalaceName(fullName: string): string {
    for (const name of PALACE_ORDER) {
        if (fullName.includes(name)) return name;
    }
    return fullName;
}
