/**
 * Strength Extractor — Derives top strengths and challenges from chart data.
 *
 * Analyzes star brightness distribution, element balance, pattern quality,
 * and palace configurations to produce a ranked list of traits.
 */

import type { TraitItem, AstrologySystem } from './types';
import type { TuViChartSummary } from './archetypeDetector';
import type { ChiemTinhChartSummary } from './archetypeDetector';

// ═══════════════════════════════════════════════════════════════════
// Tử Vi Strength/Challenge Rules
// ═══════════════════════════════════════════════════════════════════

interface TraitRule {
    condition: (chart: TuViChartSummary) => boolean;
    trait: TraitItem;
    type: 'strength' | 'challenge';
}

const BRIGHTNESS_HIGH = new Set(['庙', '旺', 'Miếu', 'Vượng']);
const BRIGHTNESS_LOW = new Set(['不', '陷', 'Bất', 'Hãm']);

function findStarInChart(chart: TuViChartSummary, starName: string) {
    for (const palace of chart.palaces) {
        const star = palace.majorStars.find(s => s.name === starName);
        if (star) return { star, palace: palace.name };
    }
    return null;
}

function isStarBright(chart: TuViChartSummary, starName: string): boolean {
    const found = findStarInChart(chart, starName);
    return found ? BRIGHTNESS_HIGH.has(found.star.brightness) : false;
}

function isStarWeak(chart: TuViChartSummary, starName: string): boolean {
    const found = findStarInChart(chart, starName);
    return found ? BRIGHTNESS_LOW.has(found.star.brightness) : false;
}

const TUVI_TRAIT_RULES: TraitRule[] = [
    // Strengths
    { condition: c => isStarBright(c, 'Tử Vi'), trait: { label: 'Khí chất lãnh đạo', description: 'Bạn có bản năng dẫn dắt và được người khác tin tưởng.' }, type: 'strength' },
    { condition: c => isStarBright(c, 'Thiên Cơ'), trait: { label: 'Trí tuệ sắc bén', description: 'Khả năng phân tích và lập kế hoạch vượt trội.' }, type: 'strength' },
    { condition: c => isStarBright(c, 'Thái Dương'), trait: { label: 'Sức thu hút tự nhiên', description: 'Bạn tỏa sáng và truyền cảm hứng cho mọi người xung quanh.' }, type: 'strength' },
    { condition: c => isStarBright(c, 'Vũ Khúc'), trait: { label: 'Tài chính bẩm sinh', description: 'Khả năng kiếm tiền và quản lý tài chính xuất sắc.' }, type: 'strength' },
    { condition: c => isStarBright(c, 'Thiên Đồng'), trait: { label: 'Phúc đức dày', description: 'Cuộc sống bình an, được quý nhân giúp đỡ.' }, type: 'strength' },
    { condition: c => isStarBright(c, 'Thiên Phủ'), trait: { label: 'Ổn định vững vàng', description: 'Nền tảng vật chất và tinh thần vững chắc.' }, type: 'strength' },
    { condition: c => isStarBright(c, 'Thái Âm'), trait: { label: 'Tâm hồn nghệ sĩ', description: 'Cảm xúc phong phú và năng khiếu nghệ thuật tự nhiên.' }, type: 'strength' },
    { condition: c => isStarBright(c, 'Thiên Lương'), trait: { label: 'Đạo đức và trường thọ', description: 'Phẩm chất chính trực, phúc đức bền lâu.' }, type: 'strength' },
    { condition: c => isStarBright(c, 'Tham Lang'), trait: { label: 'Đa tài đa nghệ', description: 'Giỏi giao tiếp, sáng tạo, và thu hút mọi người.' }, type: 'strength' },
    { condition: c => isStarBright(c, 'Thất Sát'), trait: { label: 'Ý chí sắt đá', description: 'Bản lĩnh vượt qua mọi thử thách.' }, type: 'strength' },

    // Challenges
    { condition: c => isStarWeak(c, 'Tử Vi'), trait: { label: 'Cô đơn trên đỉnh', description: 'Chí hướng lớn nhưng thiếu thực lực và người phò trợ.' }, type: 'challenge' },
    { condition: c => isStarWeak(c, 'Thiên Cơ'), trait: { label: 'Do dự quá mức', description: 'Suy nghĩ nhiều nhưng khó đưa ra quyết định.' }, type: 'challenge' },
    { condition: c => isStarWeak(c, 'Thái Dương'), trait: { label: 'Danh hư thực thiếu', description: 'Bên ngoài hào nhoáng nhưng bên trong thiếu nền tảng.' }, type: 'challenge' },
    { condition: c => isStarWeak(c, 'Vũ Khúc'), trait: { label: 'Tài chính bất ổn', description: 'Tiền đến khó giữ, dễ tranh chấp về tài sản.' }, type: 'challenge' },
    { condition: c => isStarWeak(c, 'Liêm Trinh'), trait: { label: 'Cảm xúc phức tạp', description: 'Dễ vướng vào thị phi và rắc rối tình cảm.' }, type: 'challenge' },
    { condition: c => isStarWeak(c, 'Tham Lang'), trait: { label: 'Ham muốn quá mức', description: 'Cần kiểm soát dục vọng và cám dỗ.' }, type: 'challenge' },
    { condition: c => isStarWeak(c, 'Cự Môn'), trait: { label: 'Thị phi bủa vây', description: 'Lời nói gây hiểu lầm, dễ bị kiện tụng.' }, type: 'challenge' },
    { condition: c => isStarWeak(c, 'Phá Quân'), trait: { label: 'Bất ổn triền miên', description: 'Cuộc sống nhiều thay đổi, khó ổn định lâu dài.' }, type: 'challenge' },
];

// ═══════════════════════════════════════════════════════════════════
// Chiêm Tinh Strength/Challenge Rules
// ═══════════════════════════════════════════════════════════════════

interface ChiemTinhTraitRule {
    condition: (chart: ChiemTinhChartSummary) => boolean;
    trait: TraitItem;
    type: 'strength' | 'challenge';
}

function hasPlacement(chart: ChiemTinhChartSummary, planet: string, sign?: string): boolean {
    return chart.placements.some(p =>
        p.planet === planet && (!sign || p.sign === sign)
    );
}

const CHIEMTINH_TRAIT_RULES: ChiemTinhTraitRule[] = [
    { condition: c => hasPlacement(c, 'Sun', 'Leo'), trait: { label: 'Sức sáng tạo rực rỡ', description: 'Năng lượng sáng tạo và tự tin bẩm sinh.' }, type: 'strength' },
    { condition: c => hasPlacement(c, 'Moon', 'Cancer'), trait: { label: 'Trực giác mạnh mẽ', description: 'Khả năng đọc cảm xúc và tình huống phi thường.' }, type: 'strength' },
    { condition: c => hasPlacement(c, 'Venus', 'Taurus') || hasPlacement(c, 'Venus', 'Libra'), trait: { label: 'Thẩm mỹ tinh tế', description: 'Cảm nhận về cái đẹp và hài hòa vượt trội.' }, type: 'strength' },
    { condition: c => hasPlacement(c, 'Mars', 'Aries') || hasPlacement(c, 'Mars', 'Scorpio'), trait: { label: 'Năng lượng hành động', description: 'Dám làm, dám chịu, hành động quyết đoán.' }, type: 'strength' },
    { condition: c => hasPlacement(c, 'Jupiter', 'Sagittarius') || hasPlacement(c, 'Jupiter', 'Pisces'), trait: { label: 'May mắn tự nhiên', description: 'Cơ hội đến dễ dàng, mở rộng chân trời thuận lợi.' }, type: 'strength' },
    { condition: c => c.dominantElement === 'Fire', trait: { label: 'Nhiệt huyết', description: 'Tràn đầy năng lượng và đam mê.' }, type: 'strength' },
    { condition: c => c.dominantElement === 'Earth', trait: { label: 'Thực tế vững chắc', description: 'Chân đứng vững trên mặt đất, đáng tin cậy.' }, type: 'strength' },

    { condition: c => hasPlacement(c, 'Saturn', 'Aries'), trait: { label: 'Kiên nhẫn là bài học', description: 'Cần học cách chờ đợi thay vì hành động vội.' }, type: 'challenge' },
    { condition: c => hasPlacement(c, 'Mars', 'Cancer') || hasPlacement(c, 'Mars', 'Libra'), trait: { label: 'Quyết đoán chưa đủ', description: 'Đôi khi do dự khi cần hành động nhanh.' }, type: 'challenge' },
    { condition: c => c.dominantElement === 'Water', trait: { label: 'Nhạy cảm quá mức', description: 'Cần xây dựng ranh giới cảm xúc rõ ràng hơn.' }, type: 'challenge' },
];

// ═══════════════════════════════════════════════════════════════════
// Extraction API
// ═══════════════════════════════════════════════════════════════════

export interface ExtractedTraits {
    strengths: TraitItem[];
    challenges: TraitItem[];
}

/**
 * Extract strengths and challenges from chart data.
 * Returns top 5 strengths and top 3-5 challenges, deduplicated.
 */
export function extractStrengths(
    system: AstrologySystem,
    chartData: TuViChartSummary | ChiemTinhChartSummary,
): ExtractedTraits {
    const strengths: TraitItem[] = [];
    const challenges: TraitItem[] = [];

    if (system === 'tuvi') {
        const chart = chartData as TuViChartSummary;
        for (const rule of TUVI_TRAIT_RULES) {
            if (rule.condition(chart)) {
                if (rule.type === 'strength') strengths.push(rule.trait);
                else challenges.push(rule.trait);
            }
        }
    } else {
        const chart = chartData as ChiemTinhChartSummary;
        for (const rule of CHIEMTINH_TRAIT_RULES) {
            if (rule.condition(chart)) {
                if (rule.type === 'strength') strengths.push(rule.trait);
                else challenges.push(rule.trait);
            }
        }
    }

    // Deduplicate by label
    const dedup = (items: TraitItem[]) => {
        const seen = new Set<string>();
        return items.filter(item => {
            if (seen.has(item.label)) return false;
            seen.add(item.label);
            return true;
        });
    };

    return {
        strengths: dedup(strengths).slice(0, 5),
        challenges: dedup(challenges).slice(0, 5),
    };
}
