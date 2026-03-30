/**
 * Synthesis Engine — Core orchestrator for narrative generation.
 *
 * Transforms raw chart data into multi-chapter life-area narratives by:
 * 1. Detecting archetype via archetypeDetector
 * 2. Extracting strengths/challenges via strengthExtractor
 * 3. Mapping chart data to life areas via lifeAreaMapper
 * 4. Building multi-paragraph ETC narratives from the narrative knowledge base
 * 5. Generating introduction, yearly outlook, and closing meditation
 *
 * Psychology applied:
 * - Peak-End Rule: strong intro + memorable closing meditation
 * - Serial Position Effect: critical insights at beginning/end of chapters
 * - Narrative Transportation: multi-paragraph story arcs
 * - Zeigarnik Effect: open loops between sections
 */

import type {
    AstrologySystem,
    LifeAreaType,
    LifeAreaNarrative,
    NarrativeResult,
    ETCNarrative,
    KeyInfluence,
    BrightnessLevel,
    IntroductionBlock,
    YearlyOutlookBlock,
    ExecutiveSummaryBlock,
} from './types';
import { LIFE_AREA_ORDER, LIFE_AREA_META } from './types';
import { detectArchetype, type TuViChartSummary, type ChiemTinhChartSummary } from './archetypeDetector';
import { extractStrengths } from './strengthExtractor';
import { getLifeAreaSources } from './lifeAreaMapper';
import { lookupNarrative, AREA_FALLBACK_NARRATIVES } from '../../data/interpretation/tuvi/narrativeKnowledgeBase';
import { tuviPdfDictionary } from '../../data/interpretation/tuvi/pdfDictionary';
import { tuviSyndromesDictionary } from '../../data/interpretation/tuvi/syndromesDictionary';
import { CHIEMTINH_PERSONALITY_NARRATIVES } from '../../data/interpretation/chiemtinh/planetInSign/personality';
import { CHIEMTINH_LOVE_NARRATIVES } from '../../data/interpretation/chiemtinh/planetInSign/love';
import { CHIEMTINH_CAREER_NARRATIVES } from '../../data/interpretation/chiemtinh/planetInSign/career';
import { CHIEMTINH_HEALTH_NARRATIVES } from '../../data/interpretation/chiemtinh/planetInSign/health';
import { CHIEMTINH_GROWTH_NARRATIVES } from '../../data/interpretation/chiemtinh/planetInSign/growth';
import { CHIEMTINH_WEALTH_NARRATIVES } from '../../data/interpretation/chiemtinh/planetInSign/wealth';
import { CHIEMTINH_PARENTS_NARRATIVES } from '../../data/interpretation/chiemtinh/planetInSign/parents';
import { CHIEMTINH_KARMA_NARRATIVES } from '../../data/interpretation/chiemtinh/planetInSign/karma';
import { CHIEMTINH_PROPERTY_NARRATIVES } from '../../data/interpretation/chiemtinh/planetInSign/property';
import { CHIEMTINH_TRAVEL_NARRATIVES } from '../../data/interpretation/chiemtinh/planetInSign/travel';
import { CHIEMTINH_SERVANTS_NARRATIVES } from '../../data/interpretation/chiemtinh/planetInSign/servants';
import { CHIEMTINH_CHILDREN_NARRATIVES } from '../../data/interpretation/chiemtinh/planetInSign/children';
import { CHIEMTINH_SIBLINGS_NARRATIVES } from '../../data/interpretation/chiemtinh/planetInSign/siblings';

// ═══════════════════════════════════════════════════════════════════
// Reading Time Estimation
// ═══════════════════════════════════════════════════════════════════

/** Average Vietnamese reading speed: ~200 words/minute */
const VN_WORDS_PER_MINUTE = 200;

function countWords(text: string): number {
    return text.split(/\s+/).filter(Boolean).length;
}

function estimateReadingTime(result: {
    introduction: IntroductionBlock;
    executiveSummary: ExecutiveSummaryBlock;
    lifeAreas: LifeAreaNarrative[];
    yearlyOutlook: YearlyOutlookBlock;
    closingMeditation: string;
    closingAdvice: string;
}): number {
    let totalWords = 0;

    // Introduction
    for (const p of result.introduction.paragraphs) {
        totalWords += countWords(p);
    }

    // Executive Summary
    totalWords += countWords(result.executiveSummary.summaryParagraph);
    totalWords += countWords(result.executiveSummary.coreAdvice);

    // Life areas
    for (const area of result.lifeAreas) {
        for (const para of area.paragraphs) {
            totalWords += countWords(para.hook);
            for (const ep of para.effectParagraphs) {
                totalWords += countWords(ep);
            }
            totalWords += countWords(para.nuance);
            totalWords += countWords(para.cause);
            totalWords += countWords(para.tip);
        }
    }

    // Yearly + closing
    totalWords += countWords(result.yearlyOutlook.summary);
    totalWords += countWords(result.yearlyOutlook.advice);
    totalWords += countWords(result.closingMeditation);
    totalWords += countWords(result.closingAdvice);

    return Math.max(5, Math.ceil(totalWords / VN_WORDS_PER_MINUTE));
}

// ═══════════════════════════════════════════════════════════════════
// Key Influence Extraction
// ═══════════════════════════════════════════════════════════════════

function extractTuViInfluences(
    chart: TuViChartSummary,
    primaryPalaces: readonly string[],
): KeyInfluence[] {
    const influences: KeyInfluence[] = [];
    for (const palaceName of primaryPalaces) {
        const palace = chart.palaces.find(p => p.name.includes(palaceName));
        if (!palace) continue;
        for (const star of palace.majorStars) {
            influences.push({
                name: `${star.name} tại ${palaceName}`,
                description: `${star.name} ${star.brightness ? `(${star.brightness})` : ''} tọa thủ cung ${palaceName}`,
            });
        }
    }
    return influences.slice(0, 5);
}

function extractChiemTinhInfluences(
    chart: ChiemTinhChartSummary,
    primaryPlacements: readonly string[],
): KeyInfluence[] {
    const influences: KeyInfluence[] = [];
    for (const placementId of primaryPlacements) {
        const [planet] = placementId.split('_');
        const placement = chart.placements.find(p => p.planet === planet);
        if (!placement) continue;
        influences.push({
            name: `${placement.planet} in ${placement.sign}`,
            description: `${placement.planet} tại cung ${placement.sign} (nhà ${placement.house})`,
        });
    }
    return influences.slice(0, 5);
}

// ═══════════════════════════════════════════════════════════════════
// Brightness Utilities
// ═══════════════════════════════════════════════════════════════════

const BRIGHTNESS_HIGH_SET = new Set(['庙', '旺', 'Miếu', 'Vượng']);
const BRIGHTNESS_LOW_SET = new Set(['不', '陷', 'Bất', 'Hãm']);

function toBrightnessLevel(brightness: string): BrightnessLevel {
    if (BRIGHTNESS_HIGH_SET.has(brightness)) return 'mieuVuong';
    if (BRIGHTNESS_LOW_SET.has(brightness)) return 'ham';
    return 'dacBinh';
}

// ═══════════════════════════════════════════════════════════════════
// Multi-Paragraph Narrative Generators
// ═══════════════════════════════════════════════════════════════════

const LABELS_BRIGHTNESS: Record<BrightnessLevel, string> = {
    mieuVuong: 'Miếu Vượng',
    dacBinh: 'Đắc Địa / Bình Hòa',
    ham: 'Hãm Địa',
};

function joinTraitsGrammatically(traits: string[]): string {
    if (!traits || traits.length === 0) return '';
    if (traits.length === 1) return traits[0].charAt(0).toLowerCase() + traits[0].slice(1);
    const lowercased = traits.map(t => t.charAt(0).toLowerCase() + t.slice(1));
    const last = lowercased.pop();
    return lowercased.join(', ') + ' và ' + last;
}

/**
 * Generate multi-paragraph ETC narratives for a Tử Vi life area.
 * Now produces 2-4 paragraphs: primary + secondary palace narratives.
 * INTEGRATED NEW PHASE 2 LOGIC: Cross-House synthesis & Contradiction logic.
 */
function generateTuViNarratives(
    area: LifeAreaType,
    chart: TuViChartSummary,
    primaryPalaces: readonly string[],
    secondaryPalaces: readonly string[],
): ETCNarrative[] {
    const paragraphs: ETCNarrative[] = [];

    // Generic function to process a palace's stars to avoid repetition between primary and secondary
    const processPalace = (palaceName: string, palace: typeof chart.palaces[0], _isPrimary: boolean) => {
        const sorted = [...palace.majorStars].sort((a, b) => {
            const rankA = BRIGHTNESS_HIGH_SET.has(a.brightness) ? 3 : BRIGHTNESS_LOW_SET.has(a.brightness) ? 1 : 2;
            const rankB = BRIGHTNESS_HIGH_SET.has(b.brightness) ? 3 : BRIGHTNESS_LOW_SET.has(b.brightness) ? 1 : 2;
            return rankB - rankA;
        });
        const allStarNames = palace.majorStars.map(s => s.name).join(', ');

        for (let i = 0; i < sorted.length && i < 2; i++) {
            const currentStar = sorted[i];
            const brightness = toBrightnessLevel(currentStar.brightness);
            const starNameNormalized = currentStar.name.replace(/_/g, ' ');
            const starDictEntry = Object.values(tuviPdfDictionary).find(s => s.name.replace(/_/g, ' ') === starNameNormalized);

            if (starDictEntry) {
                interface AreaData {
                    personality?: string[]; strengths?: string[]; weaknesses?: string[]; advice?: string;
                    suitableCareers?: string[]; workStyle?: string[]; challenges?: string[];
                    vulnerableSystems?: string[]; stressResponse?: string;
                    attractionPattern?: string; partnerTraits?: string[]; conflictTrigger?: string;
                }
                let areaObj: AreaData | undefined;
                if (area === 'personality') areaObj = starDictEntry.menh as unknown as AreaData;
                else if (area === 'career') areaObj = starDictEntry.quanLoc as unknown as AreaData;
                else if (area === 'health') areaObj = starDictEntry.tatAch as unknown as AreaData;
                else if (area === 'love') areaObj = starDictEntry.phuThe as unknown as AreaData;

                if (areaObj) {
                    const chartElement = chart.cucElement || 'Thủy';
                    let elementalImpact = '';
                    if (starDictEntry.element === 'Hỏa' && chartElement.includes('Thủy')) elementalImpact = ' (Khắc xuất - Mất nhiều tâm sức để chinh phục)';
                    else if (starDictEntry.element === 'Kim' && chartElement.includes('Hỏa')) elementalImpact = ' (Bị khắc - Dễ gặp áp lực khách quan)';
                    else if (chartElement.includes(starDictEntry.element)) elementalImpact = ' (Tương hòa - Năng lượng hội tụ dễ dàng)';
                    
                    let hookText = '';
                    const effectTextList: string[] = [];
                    let tipText = '';
                    // Bold the star name for emphasis in the narrative
                    const displayName = `**${currentStar.name.replace(/_/g, ' ')}**`;
                    const brightnessLabel = LABELS_BRIGHTNESS[brightness];
                    const coreAttrStr = joinTraitsGrammatically(starDictEntry.coreAttributes);

                    if (area === 'personality') {
                        hookText = `Tại cung ${palaceName}, sự hiện diện của ${displayName}${elementalImpact} mang đến một nguồn năng lượng đặc biệt: ${coreAttrStr}. Đây chính là tần số định hình nên tấm màn tính cách của bạn.`;
                        effectTextList.push(`Nét tính cách nổi bật nhất ở bạn là sự ${joinTraitsGrammatically(areaObj.personality ?? [])}. Khi năng lượng rực rỡ nhất, nó trao cho bạn những "vũ khí" sắc bén: ${joinTraitsGrammatically(areaObj.strengths ?? [])}.`);
                        effectTextList.push(`Tuy nhiên, ở những góc khuất, hãy cẩn trọng với "bóng tối" của chính mình — đó là xu hướng ${(areaObj.weaknesses ?? []).map((w: string) => w.toLowerCase()).join(' hoặc ')}. Thấu hiểu cả hai khía cạnh này là bước đầu tiên để tiến tới sự cân bằng.`);
                        tipText = `**💡 Lời khuyên:** ${areaObj.advice || 'Tự nhận thức là bước đầu tiên. Hãy quan sát cách bạn phản ứng trong những thời khắc áp lực nhất.'}`;
                    } else if (area === 'career') {
                        hookText = `Tại cung ${palaceName}, năng lượng của ${displayName}${elementalImpact} (${coreAttrStr}) đóng vai trò quyết định trong việc lựa chọn và phát triển con đường công danh.`;
                        effectTextList.push(`Lộ trình sự nghiệp lý tưởng của bạn thường vẫy gọi ở các lĩnh vực như ${joinTraitsGrammatically(areaObj.suitableCareers ?? [])}. Đặc trưng làm việc của bạn là ${joinTraitsGrammatically(areaObj.workStyle ?? [])}.`);
                        effectTextList.push(`Dù vậy, lá số cũng chỉ ra những trở ngại tiềm ẩn. Bạn sẽ phải học cách đối diện và vượt qua các thử thách như: ${joinTraitsGrammatically(areaObj.challenges ?? [])}.`);
                        tipText = `**💡 Lời khuyên:** ${areaObj.advice || 'Đừng cố gắng bơi ngược dòng. Đầu tư vào vùng thiên phú của bạn mang lại lãi suất cao hơn nhiều.'}`;
                    } else if (area === 'health') {
                        hookText = `Tình trạng thể chất và năng lượng sinh học tại cung ${palaceName} chịu chi phối trực tiếp bởi ${displayName}${elementalImpact}.`;
                        effectTextList.push(`Những hệ thống cơ quan cần bạn lưu tâm chăm sóc nhiều nhất bao gồm ${joinTraitsGrammatically(areaObj.vulnerableSystems ?? [])}.`);
                        effectTextList.push(`Đáng chú ý, cơ thể bạn thường phản ứng với căng thẳng tâm lý bằng biểu hiện: ${(areaObj.stressResponse ?? '').toLowerCase()}`);
                        tipText = `**💡 Lời khuyên:** ${areaObj.advice || 'Lắng nghe cơ thể trước khi nó cất tiếng kêu cứu. Nghỉ ngơi hợp lý là cách đầu tư thông minh nhất.'}`;
                    } else if (area === 'love') {
                        hookText = `Trong lĩnh vực tình cảm, ${displayName}${elementalImpact} tại cung ${palaceName} phản ánh kiểu mẫu gắn kết và vòng đan xen cảm xúc của bạn.`;
                        effectTextList.push(`Mô hình gắn kết bẩm sinh của bạn: ${areaObj.attractionPattern}`);
                        effectTextList.push(`Bạn đặc biệt bị thu hút bởi những người mang các đặc điểm như ${joinTraitsGrammatically(areaObj.partnerTraits ?? [])}. Cần lưu ý rằng "ngòi nổ" làm sứt mẻ tình cảm thường xuất phát từ ${(areaObj.conflictTrigger ?? '').toLowerCase()}`);
                        tipText = `**💡 Lời khuyên:** ${areaObj.advice || 'Tình yêu cần sự thấu hiểu hơn là hoàn hảo. Biết rõ ranh giới cảm xúc của bản thân sẽ bảo vệ cả bạn và người ấy.'}`;
                    }

                    paragraphs.push({
                        hook: hookText,
                        effectParagraphs: effectTextList,
                        nuance: `Tất nhiên, sự hiện diện của ${displayName} với trạng thái ${brightnessLabel} đồng nghĩa với việc năng lượng này biểu hiện theo hướng ${brightness === 'mieuVuong' ? 'mạnh mẽ, rõ ràng và thuần khiết' : 'thăng trầm, đòi hỏi nhiều nỗ lực tu chỉnh'}.`,
                        cause: `Đây là hệ quả từ sự tương tác giữa bản chất nguyên tố ${starDictEntry.element} của sao ${displayName} với cấu trúc lá số riêng biệt của bạn.`,
                        tip: tipText
                    });
                } else {
                    const fallback = lookupNarrative(currentStar.name, area, brightness, allStarNames, palaceName);
                    if (!paragraphs.some(p => p.hook === fallback.hook)) {
                        paragraphs.push(fallback);
                    }
                }
            } else {
                // Fallback to old knowledge base
                const fallback = lookupNarrative(currentStar.name, area, brightness, allStarNames, palaceName);
                if (!paragraphs.some(p => p.hook === fallback.hook)) {
                    paragraphs.push(fallback);
                }
            }
        }
    };

    // Primary palace narrative
    for (const palaceName of primaryPalaces) {
        const palace = chart.palaces.find(p => p.name.includes(palaceName));
        if (!palace || palace.majorStars.length === 0) continue;
        processPalace(palaceName, palace, true);
        break; // Only process first found primary palace
    }

    // Secondary palace narratives
    for (const palaceName of secondaryPalaces) {
        const palace = chart.palaces.find(p => p.name.includes(palaceName));
        if (!palace || palace.majorStars.length === 0) continue;
        processPalace(palaceName, palace, false);
        break; // Only 1 secondary
    }

    // ── Check Constellation Syndromes (Cách cục) ───────────────────
    if (area === 'personality' || area === 'career' || area === 'love' || area === 'health') {
        const allPalaceStarsNormalized = chart.palaces.map(p => p.majorStars.map(s => s.name.replace(/_/g, ' '))).flat();
        for (const syndrome of Object.values(tuviSyndromesDictionary)) {
            const hasAllStars = syndrome.starsInvolved.every(star => allPalaceStarsNormalized.includes(star.replace(/_/g, ' ')));
            if (hasAllStars) {
                // Determine area-specific text
                let specificImpactText = '';
                if (area === 'career' && syndrome.careerImpact) specificImpactText = syndrome.careerImpact;
                else if (area === 'love' && syndrome.relationshipImpact) specificImpactText = syndrome.relationshipImpact;
                else if (area === 'health' && syndrome.healthImpact) specificImpactText = syndrome.healthImpact;
                
                // For personality, we print the generic description. For others, we only print if specific impact exists.
                if (area === 'personality') {
                    paragraphs.push({
                        hook: `BẢN ĐỒ SAO ĐẶC BIỆT: Lá số của bạn hội tụ thành cách cục "${syndrome.name}" — tổ hợp ${syndrome.starsInvolved.join(', ')}.`,
                        effectParagraphs: [
                            syndrome.description,
                        ],
                        nuance: `Cách cục thuộc loại ${syndrome.type}, đòi hỏi sự thấu hiểu sâu sắc năng lượng của chính mình để làm chủ nó.`,
                        cause: `Sự hội tụ của các sao ${syndrome.starsInvolved.join(', ')} trên các cung trọng yếu.`,
                        tip: syndrome.advice
                    });
                } else if (specificImpactText) {
                    paragraphs.push({
                        hook: `Bộc Lộ Qua ${area === 'career' ? 'Sự Nghiệp' : area === 'love' ? 'Tình Cảm' : 'Sức Khỏe'}: Ảnh hưởng của cách cục "${syndrome.name}".`,
                        effectParagraphs: [ specificImpactText ],
                        nuance: `Khác với những người chỉ chịu ảnh hưởng của một sao đơn lẻ, sự tương tác nguyên khối của ${syndrome.name} tạo nên dòng chảy năng lượng đặc thù.`,
                        cause: `Ảnh hưởng gián tiếp từ tổ hợp phụ trợ trên bản đồ sao cá nhân.`,
                        tip: syndrome.advice
                    });
                }
                break; // Only add one primary syndrome per area
            }
        }
    }

    // ── Engine-Aware Enrichment Paragraphs ─────────────────────────

    // Find the primary palace object for enrichment
    const primaryPalace = primaryPalaces.reduce<typeof chart.palaces[0] | undefined>(
        (found, pn) => found || chart.palaces.find(p => p.name.includes(pn)),
        undefined,
    );

    // (1) Đối Cung Analysis — the palace directly opposite influences interpretation
    if (primaryPalace?.earthlyBranch) {
        const BRANCH_ORDER = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
        const idx = BRANCH_ORDER.indexOf(primaryPalace.earthlyBranch);
        if (idx >= 0) {
            const oppositeIdx = (idx + 6) % 12;
            const oppositeBranch = BRANCH_ORDER[oppositeIdx];
            const doiCung = chart.palaces.find(p => p.earthlyBranch === oppositeBranch);
            if (doiCung && doiCung.majorStars.length > 0) {
                const doiStars = doiCung.majorStars.map(s => s.name).join(', ');
                paragraphs.push({
                    hook: `Theo nguyên lý "Đối Cung Tương Chiếu" (對宮相照) trong Tử Vi Đẩu Số Toàn Thư, cung ${doiCung.name} (đối cung) chiếu thẳng vào cung ${primaryPalace.name} — tạo thành trục năng lượng ảnh hưởng trực tiếp.`,
                    effectParagraphs: [
                        `Đối cung ${doiCung.name} có ${doiStars} chiếu vào — tạo "lực kéo" bổ sung cho năng lượng chính. Sách "Thái Vi Phú" ghi: "Đối cung vô cát tinh, tối phạ hung tinh chiếu" (đối cung không có sao tốt mà gặp sao xấu chiếu thì đáng lo). Trong trường hợp của bạn, sự tương tác giữa ${primaryPalace.name} và ${doiCung.name} tạo nên bức tranh phức tạp hơn nhiều so với chỉ đọc một cung đơn lẻ.`,
                        `Biểu hiện tích cực của trục ${primaryPalace.name}-${doiCung.name}: khi cả hai cung đều thuận lợi, năng lượng cộng hưởng tạo sức mạnh nhân đôi. Biểu hiện tiêu cực: khi đối cung có sát tinh chiếu vào, cung chính dù tốt cũng bị giảm lực — giống như "gió ngược" làm chậm tiến trình.`,
                    ],
                    nuance: `Nghệ thuật giải đoán nằm ở khả năng đọc TƯƠNG TÁC giữa cung chính và đối cung — không phải chỉ đọc từng cung riêng lẻ.`,
                    cause: `Nguyên lý đối cung tương chiếu — sách cổ ghi: "Tinh đồ vô đối bất thành cách" (星圖無對不成格 — Bản đồ sao không có đối cung thì không thành cách cục).`,
                    tip: `Hãy quan sát cả hai mặt: cung ${primaryPalace.name} cho thấy bạn ĐANG LÀ gì, đối cung ${doiCung.name} cho thấy năng lượng CHIẾU VÀO bạn từ bên ngoài. Cân bằng hai nguồn năng lượng này là chìa khóa phát triển.`,
                });
            }
        }
    }

    // (2) Trường Sinh 12-Phase — life cycle stage commentary
    if (primaryPalace?.changsheng12) {
        const phase = primaryPalace.changsheng12;
        const TRUONG_SINH_MEANINGS: Record<string, { positive: string; negative: string; advice: string }> = {
            'Trường Sinh': { positive: 'năng lượng sinh sôi, khởi đầu thuận lợi, tiềm năng phát triển mạnh', negative: 'thiếu kinh nghiệm, dễ hấp tấp, chưa đủ chiều sâu', advice: 'Đây là giai đoạn GIEO HẠT — hãy mạnh dạn bắt đầu nhưng đừng kỳ vọng kết quả ngay' },
            'Mộc Dục': { positive: 'sáng tạo, đổi mới, năng lượng tái sinh', negative: 'dễ bị cám dỗ, mất phương hướng, thiếu ổn định', advice: 'Giai đoạn "tắm rửa" — cần thanh lọc và chọn lọc, không nên theo đuổi mọi cơ hội' },
            'Quan Đới': { positive: 'trưởng thành, tự tin, bắt đầu có thành tựu', negative: 'kiêu ngạo, vội vàng, đánh giá quá cao bản thân', advice: 'Giai đoạn "đội mũ" — bạn đã sẵn sàng nhưng cần thêm kinh nghiệm trước khi nhận trách nhiệm lớn' },
            'Lâm Quan': { positive: 'sự nghiệp hanh thông, được tin tưởng, quyền lực tăng', negative: 'áp lực trách nhiệm, dễ bị đố kỵ, phải gánh vác nhiều', advice: 'Giai đoạn "ra làm quan" — thời điểm tối ưu để nhận vai trò lãnh đạo và mở rộng ảnh hưởng' },
            'Đế Vượng': { positive: 'đỉnh cao năng lượng, mạnh mẽ nhất, thành tựu lớn', negative: 'cực thịnh tất suy, dễ quá đà, phải biết giữ mình', advice: 'Đỉnh cao của chu kỳ — tận hưởng nhưng đồng thời chuẩn bị cho giai đoạn tiếp theo' },
            'Suy': { positive: 'kinh nghiệm sâu, trí tuệ, biết chọn lọc', negative: 'năng lượng giảm, dễ bi quan, cần bảo tồn sức lực', advice: 'Giai đoạn "thu hoạch kinh nghiệm" — chất lượng thay thế số lượng, chiều sâu thay thế chiều rộng' },
            'Bệnh': { positive: 'nhạy cảm, thấu hiểu, phát triển trực giác', negative: 'dễ tổn thương, sức khỏe cần chú ý, dễ bi quan', advice: 'Giai đoạn cần nghỉ ngơi và phục hồi — không nên ép buộc bản thân quá mức' },
            'Tử': { positive: 'chuyển hóa sâu sắc, buông bỏ cái cũ, tái sinh', negative: 'kết thúc, mất mát, phải đối mặt với sự thay đổi', advice: 'Giai đoạn "chết đi để sống lại" — đây không phải kết thúc mà là chuẩn bị cho bước nhảy mới' },
            'Mộ': { positive: 'tích lũy, bảo tồn, tiềm ẩn sức mạnh chờ thời', negative: 'bế tắc, trì trệ, năng lượng bị "chôn vùi"', advice: 'Giai đoạn "ẩn mình" — kiên nhẫn tích lũy, thời cơ sẽ đến khi bạn đủ chín muồi' },
            'Tuyệt': { positive: 'hoàn toàn đổi mới, không bị ràng buộc bởi quá khứ', negative: 'cô đơn, mất gốc, cần xây dựng lại từ đầu', advice: 'Điểm "zero" — nơi mọi thứ kết thúc cũng là nơi mọi thứ có thể bắt đầu lại' },
            'Thai': { positive: 'ý tưởng mới, manh nha, tiềm năng chưa khai thác', negative: 'mong manh, chưa rõ ràng, cần được nuôi dưỡng', advice: 'Giai đoạn "thai nghén" — ý tưởng cần thời gian ấp ủ, đừng vội vàng phô bày' },
            'Dưỡng': { positive: 'được bảo bọc, phát triển an toàn, nền tảng vững', negative: 'phụ thuộc, chưa tự lập, cần người dẫn dắt', advice: 'Giai đoạn "nuôi dưỡng" — tìm mentor, học hỏi, xây nền tảng trước khi tự bay' },
        };
        const meaning = TRUONG_SINH_MEANINGS[phase];
        if (meaning) {
            paragraphs.push({
                hook: `Theo phép "Vòng Trường Sinh" (長生十二宮) — hệ thống 12 giai đoạn sinh mệnh mà Tử Vi Đẩu Số kế thừa từ Ngũ Hành luận — cung ${primaryPalace.name} của bạn đang ở giai đoạn "${phase}".`,
                effectParagraphs: [
                    `Giai đoạn "${phase}" trong vòng Trường Sinh mang ý nghĩa: ${meaning.positive}. Đây là năng lượng CƠ BẢN chạy ngầm bên dưới mọi biểu hiện khác — giống như "mùa" trong tự nhiên ảnh hưởng đến mọi hoạt động sống. Sách "Tử Vi Đẩu Số Toàn Thư" ghi: "Trường Sinh vu cung, chủ nhân phúc thọ song toàn" (Trường Sinh tại cung thì người có phúc thọ đầy đủ) — mỗi giai đoạn đều có "phúc" riêng cần nhận ra.`,
                    `Biểu hiện tiêu cực cần lưu ý: ${meaning.negative}. Theo nguyên lý "Âm Dương tiêu trưởng" (陰陽消長), không giai đoạn nào hoàn toàn tốt hay xấu — "Đế Vượng" tuy mạnh nhất nhưng cũng dễ "quá đà," trong khi "Tử" tuy nghe đáng sợ nhưng lại là tiền đề của tái sinh. Hiểu vị trí mình đang đứng trong vòng tuần hoàn giúp bạn điều chỉnh kỳ vọng và chiến lược phù hợp.`,
                ],
                nuance: `Vòng Trường Sinh không phải "số phận cứng nhắc" — nó cho thấy GIAI ĐOẠN NĂNG LƯỢNG, giống như biết mình đang ở mùa nào trong năm để chọn hoạt động phù hợp.`,
                cause: `Nguyên lý Trường Sinh 12 cung — hệ thống tuần hoàn năng lượng Ngũ Hành: Trường Sinh → Mộc Dục → Quan Đới → Lâm Quan → Đế Vượng → Suy → Bệnh → Tử → Mộ → Tuyệt → Thai → Dưỡng.`,
                tip: meaning.advice,
            });
        }
    }

    // (3) Tứ Hóa Transformation Analysis — Lộc/Quyền/Khoa/Kỵ in this palace
    if (primaryPalace?.mutagenStars && primaryPalace.mutagenStars.length > 0) {
        const TU_HOA_MEANINGS: Record<string, { label: string; positive: string; negative: string }> = {
            '禄': { label: 'Hóa Lộc (化祿)', positive: 'tài lộc, thuận lợi, có quý nhân, cơ hội đến tự nhiên', negative: 'dễ phung phí, tham lam, hoặc được quá dễ dàng nên không trân trọng' },
            'Lộc': { label: 'Hóa Lộc (化祿)', positive: 'tài lộc, thuận lợi, có quý nhân, cơ hội đến tự nhiên', negative: 'dễ phung phí, tham lam, hoặc được quá dễ dàng nên không trân trọng' },
            '权': { label: 'Hóa Quyền (化權)', positive: 'quyền lực, uy tín, khả năng kiểm soát, lãnh đạo tự nhiên', negative: 'độc đoán, áp đặt, xung đột quyền lực, kiểm soát quá mức' },
            'Quyền': { label: 'Hóa Quyền (化權)', positive: 'quyền lực, uy tín, khả năng kiểm soát, lãnh đạo tự nhiên', negative: 'độc đoán, áp đặt, xung đột quyền lực, kiểm soát quá mức' },
            '科': { label: 'Hóa Khoa (化科)', positive: 'danh tiếng, học vấn, thanh cao, được tôn trọng', negative: 'hư danh, quá chú trọng bề ngoài, thiếu thực chất' },
            'Khoa': { label: 'Hóa Khoa (化科)', positive: 'danh tiếng, học vấn, thanh cao, được tôn trọng', negative: 'hư danh, quá chú trọng bề ngoài, thiếu thực chất' },
            '忌': { label: 'Hóa Kỵ (化忌)', positive: 'động lực phấn đấu, kiên trì, không ngừng cải thiện', negative: 'trở ngại, bế tắc, lo âu quá mức, ám ảnh về thiếu sót' },
            'Kỵ': { label: 'Hóa Kỵ (化忌)', positive: 'động lực phấn đấu, kiên trì, không ngừng cải thiện', negative: 'trở ngại, bế tắc, lo âu quá mức, ám ảnh về thiếu sót' },
        };
        const mutagenDetails = primaryPalace.mutagenStars.map(ms => {
            const m = TU_HOA_MEANINGS[ms.mutagen];
            return m ? `${ms.name} mang ${m.label}` : `${ms.name} có Hóa ${ms.mutagen}`;
        }).join('; ');
        const firstMutagen = primaryPalace.mutagenStars[0];
        const firstMeaning = TU_HOA_MEANINGS[firstMutagen.mutagen];

        paragraphs.push({
            hook: `Theo hệ thống "Tứ Hóa" (四化 — Bốn Biến Hóa) — bí truyền cốt lõi của trường phái Phi Tinh Tử Vi — tại cung ${primaryPalace.name}: ${mutagenDetails}.`,
            effectParagraphs: [
                `Tứ Hóa được xem là "linh hồn" của lá số Tử Vi. Sách "Phi Tinh Phú" ghi: "Tứ Hóa phi tinh, chủ quản nhất sinh vinh nhục" (四化飛星, 主管一生榮辱 — Tứ Hóa bay sao, chủ quản vinh nhục cả đời). ${firstMeaning ? `Sao ${firstMutagen.name} mang ${firstMeaning.label} tại cung này tạo biểu hiện tích cực: ${firstMeaning.positive}. Mặt cần lưu ý: ${firstMeaning.negative}.` : ''}`,
                `Tứ Hóa không hoạt động đơn lẻ — chúng tạo thành "dòng chảy năng lượng" xuyên suốt lá số. Khi Hóa Lộc và Hóa Kỵ cùng xuất hiện, chúng tạo "trục xung đột" — vừa có cơ hội vừa có thử thách. Khi Hóa Quyền kết hợp Hóa Khoa, bạn có "cặp đôi quyền lực" — vừa mạnh mẽ vừa được tôn trọng. Hiểu "ngôn ngữ" Tứ Hóa giúp bạn nắm bắt THỜI CƠ chính xác hơn.`,
            ],
            nuance: `Tứ Hóa thay đổi theo từng năm (Lưu Niên) — nên những xu hướng này không cố định. Năm nào Hóa Lộc bay vào cung thuận lợi, năm đó đặc biệt may mắn.`,
            cause: `Hệ thống Tứ Hóa: Hóa Lộc (tài lộc), Hóa Quyền (quyền lực), Hóa Khoa (danh tiếng), Hóa Kỵ (thử thách) — bốn chiều năng lượng chi phối mọi biến động.`,
            tip: `Mẹo thực hành: khi biết sao nào mang Hóa gì tại cung nào, bạn biết nên đầu tư năng lượng vào đâu (Lộc), giữ vững gì (Quyền), phô bày gì (Khoa), và cẩn trọng gì (Kỵ).`,
        });
    }

    // (4) Minor Star Modifiers — key secondary star influences
    if (primaryPalace?.minorStars && primaryPalace.minorStars.length > 0) {
        const KEY_MINOR_STARS: Record<string, { positive: string; negative: string }> = {
            'Văn Xương': { positive: 'tư duy sắc bén, học vấn cao, biểu đạt tốt', negative: 'quá lý thuyết, thiếu thực hành, kiêu ngạo trí thức' },
            'Văn Khúc': { positive: 'tài năng nghệ thuật, sáng tạo, giao tiếp hay', negative: 'hay mơ mộng, cảm xúc bất ổn, dễ bị lừa bởi lời hay ý đẹp' },
            'Tả Phụ': { positive: 'có quý nhân phò trợ, được giúp đỡ, hợp tác tốt', negative: 'phụ thuộc người khác, thiếu tự lập, dễ bị chi phối' },
            'Hữu Bật': { positive: 'được hỗ trợ âm thầm, may mắn từ nhiều phía', negative: 'dễ bị lợi dụng, giúp đỡ không đúng chỗ' },
            'Địa Không': { positive: 'tư duy đột phá, sáng tạo phi thường, thoát khỏi lối mòn', negative: 'mất mát vật chất, kế hoạch bị phá vỡ, trống rỗng' },
            'Địa Kiếp': { positive: 'sức mạnh tái sinh, vượt qua nghịch cảnh, biến hóa', negative: 'biến động bất ngờ, tổn thất, thay đổi đột ngột' },
            'Kình Dương': { positive: 'quyết đoán, mạnh mẽ, dám hành động, phá vỡ rào cản', negative: 'nóng nảy, hung hăng, dễ gây xung đột, tai nạn' },
            'Đà La': { positive: 'kiên trì, bền bỉ, khả năng chịu đựng, chiến lược lâu dài', negative: 'chậm chạp, trì hoãn, rào cản ngầm, khó tiến' },
            'Hỏa Tinh': { positive: 'năng lượng mạnh, đam mê, bùng nổ tích cực', negative: 'nóng vội, bốc đồng, dễ kiệt sức' },
            'Linh Tinh': { positive: 'tốc độ, nhạy bén, phản ứng nhanh', negative: 'lo lắng, bất an, hấp tấp' },
            'Thiên Khôi': { positive: 'có quý nhân bề trên giúp đỡ, được đề bạt', negative: 'tự mãn khi có người che chở, thiếu nỗ lực bản thân' },
            'Thiên Việt': { positive: 'có quý nhân bạn bè giúp đỡ, quan hệ xã hội tốt', negative: 'phụ thuộc vào mạng lưới, thiếu tự lực' },
        };
        const relevantMinors = primaryPalace.minorStars.filter(s => KEY_MINOR_STARS[s]);
        if (relevantMinors.length > 0) {
            const minorDetails = relevantMinors.map(s => {
                const data = KEY_MINOR_STARS[s];
                return `${s}: tích cực — ${data.positive}; tiêu cực — ${data.negative}`;
            });
            paragraphs.push({
                hook: `Bên cạnh các chính tinh, cung ${primaryPalace.name} còn có sự hiện diện của các phụ tinh quan trọng: ${relevantMinors.join(', ')}. Sách "Tử Vi Đẩu Số Toàn Thư" ghi: "Phụ tinh tuy nhỏ, ảnh hưởng chẳng nhỏ" — các sao phụ tạo "gia vị" cho bức tranh tổng thể.`,
                effectParagraphs: [
                    `Phân tích chi tiết các phụ tinh: ${minorDetails.join('. ')}. Theo nguyên lý "chúng tinh hội tụ" (眾星會聚), sức mạnh thực sự nằm ở sự TƯƠNG TÁC giữa các sao — không phải ở từng sao riêng lẻ. Khi phụ tinh CÁT (tốt) kết hợp chính tinh sáng, năng lượng được khuếch đại. Khi phụ tinh HUNG kết hợp chính tinh hãm, cần đặc biệt cảnh giác.`,
                ],
                nuance: `Trong thực hành giải đoán, phụ tinh đóng vai trò "bổ sung chi tiết" — chính tinh vẽ bức tranh lớn, phụ tinh thêm sắc thái và chiều sâu.`,
                cause: `Nguyên lý "Chư tinh giao hội, phương luận cát hung" (các sao giao hội mới luận được tốt xấu) — sách cổ nhấn mạnh phải đọc TOÀN BỘ sao trong cung, không chỉ chính tinh.`,
                tip: `Hãy chú ý đến các phụ tinh như "tín hiệu phụ" — chúng cho biết CÁCH năng lượng chính tinh biểu hiện: nhanh hay chậm, mạnh hay nhẹ, thuận hay nghịch.`,
            });
        }
    }

    // (5) Tuần Không / Triệt Không markers — void/disrupt warnings
    if (primaryPalace?.hasTuanKhong || primaryPalace?.hasTrietKhong) {
        const marker = primaryPalace.hasTuanKhong ? 'Tuần Không' : 'Triệt Không';
        const isTriet = primaryPalace.hasTrietKhong;
        paragraphs.push({
            hook: `Theo phép "${marker}" trong Tử Vi Đẩu Số — cung ${primaryPalace.name} của bạn nằm trong vùng ${marker}. Đây là một yếu tố đặc biệt cần phân tích kỹ.`,
            effectParagraphs: [
                isTriet
                    ? `Triệt Không (截空) — "cắt đứt hư không" — có ảnh hưởng mạnh tại cung ${primaryPalace.name}. Sách cổ ghi: "Triệt Không nhập cung, chư tinh giảm lực" (Triệt Không vào cung thì các sao giảm sức mạnh). Biểu hiện tích cực: năng lượng "nhẹ" giúp bạn thoát khỏi ràng buộc thông thường, tư duy tự do, không bị chi phối bởi khuôn mẫu. Biểu hiện tiêu cực: các sao tốt bị giảm lực, kế hoạch dễ bị gián đoạn, hoặc thành tựu đến muộn hơn dự kiến.`
                    : `Tuần Không (旬空) — "chu kỳ trống" — tạo vùng "thiếu vắng" tại cung ${primaryPalace.name}. Sách cổ ghi: "Tuần Không phùng cát, cát bất toàn; phùng hung, hung bất thật" (Tuần Không gặp sao tốt thì tốt không trọn; gặp sao xấu thì xấu không thật). Biểu hiện tích cực: nếu cung có sát tinh (sao xấu), Tuần Không giúp "hóa giải" — biến xấu thành nhẹ. Biểu hiện tiêu cực: nếu cung có cát tinh (sao tốt), Tuần Không làm "giảm phúc" — kết quả tốt đến chậm hoặc không trọn vẹn.`,
            ],
            nuance: `Trong thực hành, ${marker} là "con dao hai lưỡi" — nó giảm CẢ tốt LẪN xấu. Nghệ thuật nằm ở khả năng tận dụng mặt tích cực.`,
            cause: `Phép ${marker} trong Tử Vi — hệ thống xác định vùng "hư không" trong lá số, ảnh hưởng đến cách năng lượng biểu hiện.`,
            tip: `Nếu cung ${primaryPalace.name} có ${marker}: đừng lo lắng quá — hãy hiểu rằng kết quả có thể đến chậm hơn hoặc theo cách khác so với kỳ vọng. Kiên nhẫn và linh hoạt là chìa khóa.`,
        });
    }

    // Ensure at least 2 paragraphs via fallback
    if (paragraphs.length === 0) {
        const palaceLabel = primaryPalaces.join(', ') || 'cung chính';
        paragraphs.push(AREA_FALLBACK_NARRATIVES[area]('các phụ tinh', palaceLabel));
    }
    if (paragraphs.length < 2) {
        const secondaryLabel = secondaryPalaces.join(', ') || 'cung phụ';
        const fallback = AREA_FALLBACK_NARRATIVES[area]('các sao phụ trợ', secondaryLabel);
        
        // Only push if the fallback doesn't semantically duplicate an existing paragraph
        // We check 'cause' or the second effect paragraph, as these are often static across fallbacks
        const isDuplicate = paragraphs.some(p => 
            p.cause === fallback.cause || 
            (p.effectParagraphs[1] && fallback.effectParagraphs[1] && p.effectParagraphs[1] === fallback.effectParagraphs[1])
        );

        if (!isDuplicate) {
            paragraphs.push(fallback);
        }
    }

    return paragraphs;
}

/** Planet-to-KB mapping for Chiêm Tinh life areas */
const CHIEMTINH_AREA_KB: Record<LifeAreaType, {
    planet: string;
    kb: Record<string, Record<string, ETCNarrative>>;
}> = {
    personality: { planet: 'Sun', kb: CHIEMTINH_PERSONALITY_NARRATIVES },
    love: { planet: 'Venus', kb: CHIEMTINH_LOVE_NARRATIVES },
    career: { planet: 'Mars', kb: CHIEMTINH_CAREER_NARRATIVES },
    health: { planet: 'Moon', kb: CHIEMTINH_HEALTH_NARRATIVES },
    growth: { planet: 'Jupiter', kb: CHIEMTINH_GROWTH_NARRATIVES },
    wealth: { planet: 'Venus', kb: CHIEMTINH_WEALTH_NARRATIVES },
    parents: { planet: 'Saturn', kb: CHIEMTINH_PARENTS_NARRATIVES },
    karma: { planet: 'Jupiter', kb: CHIEMTINH_KARMA_NARRATIVES },
    property: { planet: 'Moon', kb: CHIEMTINH_PROPERTY_NARRATIVES },
    travel: { planet: 'Jupiter', kb: CHIEMTINH_TRAVEL_NARRATIVES },
    servants: { planet: 'Mars', kb: CHIEMTINH_SERVANTS_NARRATIVES },
    children: { planet: 'Sun', kb: CHIEMTINH_CHILDREN_NARRATIVES },
    siblings: { planet: 'Mercury', kb: CHIEMTINH_SIBLINGS_NARRATIVES },
};

/**
 * Generate multi-paragraph ETC narratives for a Chiêm Tinh life area.
 * Uses planet-in-sign KB data when available, falls back to generic.
 */
function generateChiemTinhNarratives(
    area: LifeAreaType,
    chart: ChiemTinhChartSummary,
    influences: KeyInfluence[],
): ETCNarrative[] {
    const paragraphs: ETCNarrative[] = [];
    const areaKB = CHIEMTINH_AREA_KB[area];

    // Primary: dedicated planet-in-sign narrative
    if (areaKB) {
        const placement = chart.placements.find(p => p.planet === areaKB.planet);
        if (placement) {
            const planetData = areaKB.kb[areaKB.planet];
            const narrative = planetData?.[placement.sign];
            if (narrative) {
                paragraphs.push(narrative);
            }
        }
    }

    // Secondary: try Sun-in-sign for personality context if different from primary
    if (area !== 'personality') {
        const sunPlacement = chart.placements.find(p => p.planet === 'Sun');
        if (sunPlacement) {
            const sunData = CHIEMTINH_PERSONALITY_NARRATIVES['Sun'];
            const sunNarrative = sunData?.[sunPlacement.sign];
            if (sunNarrative) {
                // Adapt the personality narrative as a supporting perspective
                paragraphs.push({
                    hook: `Với nền tảng tính cách ${sunPlacement.sign}, ${LIFE_AREA_META[area].title.toLowerCase()} của bạn mang đặc trưng riêng.`,
                    effectParagraphs: sunNarrative.effectParagraphs.map(p =>
                        p.replace(/tính cách|bản thân|bạn là/gi, (m) => {
                            return m; // Keep original — the context shift comes from the hook
                        })
                    ),
                    nuance: sunNarrative.nuance,
                    cause: `Nền tảng Mặt Trời tại ${sunPlacement.sign} tạo bối cảnh cho mọi khía cạnh cuộc sống, bao gồm ${LIFE_AREA_META[area].title.toLowerCase()}.`,
                    tip: sunNarrative.tip,
                });
            }
        }
    }

    // ── Engine-Aware Chiêm Tinh Enrichment ─────────────────────────

    // (1) Element Balance Analysis — Fire/Earth/Air/Water distribution
    if (chart.dominantElement) {
        const ELEMENT_MEANINGS: Record<string, { trait: string; positive: string; negative: string; advice: string }> = {
            Fire: { trait: 'Hỏa — năng lượng, đam mê, hành động', positive: 'nhiều Hỏa — bạn có năng lượng dồi dào, đam mê mãnh liệt, khả năng truyền cảm hứng và lãnh đạo tự nhiên', negative: 'quá nhiều Hỏa dễ dẫn đến nóng nảy, thiếu kiên nhẫn, bốc đồng, và kiệt sức vì ôm quá nhiều', advice: 'Tìm hoạt động nước (thể thao dưới nước, thiền, nghỉ ngơi) để cân bằng' },
            Earth: { trait: 'Thổ — ổn định, thực tế, kiên trì', positive: 'nhiều Thổ — bạn có nền tảng vững chắc, thực tế, đáng tin cậy, xây dựng kết quả bền vững', negative: 'quá nhiều Thổ dễ dẫn đến cứng nhắc, kháng cự thay đổi, quá vật chất, thiếu sáng tạo', advice: 'Thử nghiệm điều mới, du lịch, kết nối với người thuộc nguyên tố khác' },
            Air: { trait: 'Khí — trí tuệ, giao tiếp, linh hoạt', positive: 'nhiều Khí — bạn có tư duy sắc bén, khả năng giao tiếp xuất sắc, tò mò trí tuệ', negative: 'quá nhiều Khí dễ thiếu tiếp đất, nói nhiều hơn làm, phân tán năng lượng', advice: 'Thực hành grounding — đi bộ, làm vườn, yoga, hoặc bất cứ gì kết nối với cơ thể' },
            Water: { trait: 'Thủy — cảm xúc, trực giác, chiều sâu', positive: 'nhiều Thủy — bạn có trực giác mạnh, cảm xúc sâu sắc, khả năng thấu hiểu người khác', negative: 'quá nhiều Thủy dễ quá nhạy cảm, thiếu ranh giới, hoặc chìm trong cảm xúc', advice: 'Xây dựng ranh giới cảm xúc lành mạnh, tập thể dục đều đặn' },
        };
        const elMeaning = ELEMENT_MEANINGS[chart.dominantElement];
        if (elMeaning) {
            paragraphs.push({
                hook: `Theo "Astrology, Psychology and the Four Elements" của Stephen Arroyo, nguyên tố ${chart.dominantElement} (${elMeaning.trait}) chiếm ưu thế trong bản đồ sao sinh — đây là "sân chơi năng lượng" chính.`,
                effectParagraphs: [
                    `Biểu hiện tích cực: ${elMeaning.positive}. Arroyo gọi đây là "primary energy mode" — chế độ năng lượng chính ảnh hưởng đến CÁCH bạn tiếp cận mọi tình huống.`,
                    `Biểu hiện tiêu cực cần lưu ý: ${elMeaning.negative}. Nguyên tố ưu thế không phải "vấn đề" — nó trở thành vấn đề khi BẤT CÂN BẰNG. ${elMeaning.advice}.`,
                ],
                nuance: `Phân bố nguyên tố cho thấy WHERE năng lượng tập trung — không phải WHAT bạn là. Ý thức là chìa khóa cân bằng.`,
                cause: `Phân tích Elemental Balance — Empedocles (Hy Lạp cổ đại) + Arroyo (hiện đại): Hỏa (trực giác), Thổ (cảm giác), Khí (tư duy), Thủy (cảm xúc).`,
                tip: `${elMeaning.advice}. Mục tiêu: phát triển nguyên tố yếu để tạo sự toàn diện.`,
            });
        }
    }

    // (2) Modality Analysis — Cardinal/Fixed/Mutable
    if (chart.dominantModality) {
        const MOD_MEANINGS: Record<string, { trait: string; positive: string; negative: string }> = {
            Cardinal: { trait: 'Khởi xướng (Cardinal)', positive: 'bạn là người KHỞI ĐẦU — thích bắt đầu dự án, tạo thay đổi, dẫn đầu', negative: 'dễ bắt đầu nhưng khó hoàn thành, bỏ dở, luôn tìm "cái mới"' },
            Fixed: { trait: 'Kiên định (Fixed)', positive: 'bạn là người HOÀN THÀNH — bền bỉ, đáng tin cậy, kiên trì đến cùng', negative: 'cứng nhắc, kháng cự thay đổi, cố chấp, bám víu' },
            Mutable: { trait: 'Linh hoạt (Mutable)', positive: 'bạn là người THÍCH ỨNG — linh hoạt, đa năng, dễ chuyển đổi', negative: 'thiếu kiên định, dễ bị ảnh hưởng, mất phương hướng' },
        };
        const modM = MOD_MEANINGS[chart.dominantModality];
        if (modM) {
            paragraphs.push({
                hook: `Theo phân tích "Quality" trong chiêm tinh — bản đồ sao ưu thế dạng ${modM.trait}. Steven Forrest gọi đây là "energetic rhythm" — nhịp điệu năng lượng bẩm sinh.`,
                effectParagraphs: [
                    `Biểu hiện tích cực: ${modM.positive}. Modality cho thấy CÁCH bạn hành động — không phải WHAT bạn làm. Nó ảnh hưởng đến phong cách giải quyết vấn đề, phản ứng dưới áp lực, và nhịp điệu tự nhiên trong cuộc sống.`,
                    `Mặt cần lưu ý: ${modM.negative}. Ptolemy ghi nhận: modality cho thấy "default operating mode." Khi ý thức, bạn có thể chủ động kích hoạt các chế độ khác khi cần.`,
                ],
                nuance: `Ba modality tạo chu kỳ: Khởi đầu → Duy trì → Chuyển đổi. Hiểu modality ưu thế giúp bạn biết bước nào giỏi nhất.`,
                cause: `Triplicities: Cardinal (Bạch Dương/Cự Giải/Thiên Bình/Ma Kết), Fixed (Kim Ngưu/Sư Tử/Bọ Cạp/Bảo Bình), Mutable (Song Tử/Xử Nữ/Nhân Mã/Song Ngư).`,
                tip: `Biết modality ưu thế giúp chọn đúng VAI TRÒ: Cardinal → khởi xướng; Fixed → vận hành; Mutable → xử lý thay đổi.`,
            });
        }
    }

    // Ensure at least 2 paragraphs
    if (paragraphs.length === 0) {
        const influenceNames = influences.map(i => i.name).join(', ') || 'các yếu tố chính';
        paragraphs.push(AREA_FALLBACK_NARRATIVES[area](influenceNames, 'bản đồ sao'));
    }
    if (paragraphs.length < 2) {
        const influenceNames = influences.map(i => i.name).join(', ') || 'các tương tác hành tinh';
        paragraphs.push(AREA_FALLBACK_NARRATIVES[area](influenceNames, 'các góc chiếu'));
    }

    return paragraphs;
}

// ═══════════════════════════════════════════════════════════════════
// Life Area Narrative Builder
// ═══════════════════════════════════════════════════════════════════

function buildLifeAreaNarrative(
    system: AstrologySystem,
    area: LifeAreaType,
    chartData: TuViChartSummary | ChiemTinhChartSummary,
): LifeAreaNarrative {
    const meta = LIFE_AREA_META[area];
    const sources = getLifeAreaSources(system, area);

    let influences: KeyInfluence[];
    let paragraphs: ETCNarrative[];

    if (system === 'tuvi') {
        const tuViChart = chartData as TuViChartSummary;
        influences = extractTuViInfluences(tuViChart, sources.primaryPalaces ?? []);
        paragraphs = generateTuViNarratives(
            area,
            tuViChart,
            sources.primaryPalaces ?? [],
            sources.secondaryPalaces ?? [],
        );
    } else {
        const chiemTinhChart = chartData as ChiemTinhChartSummary;
        influences = extractChiemTinhInfluences(chiemTinhChart, sources.primaryPlacements ?? []);
        paragraphs = generateChiemTinhNarratives(area, chiemTinhChart, influences);
    }

    // Append Area Summary
    const SUMMARY_CLOSING_SENTENCES: Record<LifeAreaType, string> = {
        personality: 'Nhận thức rõ những điểm sáng và góc khuất trong tính cách sẽ giúp bạn làm chủ vận mệnh của chính mình.',
        career: 'Sự nghiệp là cuộc đua đường dài, hiểu rõ sở trường và chắp cánh cho đam mê chính là lộ trình tối ưu nhất.',
        health: 'Cơ thể là đền thờ của tâm hồn. Lắng nghe những cảnh báo từ các vì sao để giữ gìn tài sản quý giá nhất này.',
        love: 'Tình cảm là tấm gương phản chiếu chính mình. Thấu hiểu những khuôn mẫu gắn kết sẽ mở đường cho những mối quan hệ bền vững.',
        growth: 'Hành trình phát triển tâm linh không bao giờ kết thúc. Mỗi thử thách đều ẩn chứa một bài học để tâm hồn bạn ngày càng thăng hoa.',
        wealth: 'Quản lý tài chính thông minh kết hợp với hiểu rõ thời vận sẽ biến cơ hội thành sự thịnh vượng bền vững.',
        parents: 'Thấu hiểu nền tảng gia đình là chìa khóa để giải phóng bản sắc cá nhân và biết ơn cội nguồn.',
        karma: 'Gieo nhân thiện gặt quả lành. Phúc đức hôm nay là điểm tựa vững chắc cho ngày mai bão dông.',
        property: 'Không gian sống hài hòa không chỉ mang lại tài lộc mà còn nuôi dưỡng sự bình yên cho tâm trí.',
        travel: 'Mỗi chuyến đi, mỗi sự dịch chuyển là một cơ hội để làm mới bản thân và mở rộng chân trời phía trước.',
        servants: 'Một mạng lưới hỗ trợ tốt giá trị hơn trăm vạn tài sản, đó là đòn bẩy để bay xa.',
        children: 'Cách bạn gieo trồng và nuôi dạy thế hệ sau (hoặc một dự án mới) chính là sự tiếp nối di sản của cuộc đời mình.',
        siblings: 'Gắn kết, hỗ trợ đúng cách cùng anh chị em và bạn đồng lứa giúp bạn xây dựng nền móng xã hội đầu tiên.'
    };

    const influenceNames = influences.map(i => `**${i.name.replace(/_/g, ' ')}**`).join(', ');
    paragraphs.push({
        hook: '',
        effectParagraphs: [
            `**Tiểu Kết Cung ${meta.title}:** Cục diện ${meta.title.toLowerCase()} của bạn chịu ảnh hưởng lèo lái mạnh nhất từ ${influenceNames || 'các yếu tố cốt lõi'}. ${SUMMARY_CLOSING_SENTENCES[area] || ''}`
        ],
        nuance: '',
        cause: '',
        tip: ''
    });

    return {
        area,
        icon: meta.icon,
        title: meta.title,
        subtitle: meta.subtitle,
        paragraphs,
        keyInfluences: influences,
    };
}

// ═══════════════════════════════════════════════════════════════════
// Introduction Generator
// ═══════════════════════════════════════════════════════════════════

function generateIntroduction(
    system: AstrologySystem,
    chartData: TuViChartSummary | ChiemTinhChartSummary,
    archetypeName: string,
    element: string,
): IntroductionBlock {
    const systemLabel = system === 'tuvi' ? 'Tử Vi Đẩu Số' : 'Chiêm Tinh Phương Tây';
    const systemMeta = system === 'tuvi' ? 'Đông Phương' : 'Tây Phương';

    const paragraphs: string[] = [
        `Chào mừng bạn đến với bản phân tích chi tiết theo hệ thống ${systemLabel} — một trong những bộ môn huyền học cổ kính và có chiều sâu nhất của truyền thống ${systemMeta}. Bản báo cáo này được tạo ra dành riêng cho bạn, dựa trên dữ liệu thiên văn chính xác tại thời điểm bạn sinh ra.`,

        `Mỗi con người khi cất tiếng khóc chào đời đều mang theo một "bản thiết kế vũ trụ" — một tấm bản đồ năng lượng phản ánh tiềm năng, thử thách, và con đường phát triển riêng biệt. Bản đồ sao của bạn cho thấy bạn mang năng lượng nguyên mẫu "${archetypeName}" với nguyên tố chủ đạo ${element}. Đây không phải định mệnh cứng nhắc — mà là la bàn giúp bạn hiểu rõ hơn về bản thân.`,

        `Trong bản phân tích này, bạn sẽ khám phá 5 lĩnh vực quan trọng nhất của cuộc sống: Tính cách & Bản ngã, Tình yêu & Các mối quan hệ, Sự nghiệp & Tài chính, Sức khỏe & Năng lượng, và Phát triển & Tâm linh. Mỗi phần đều được phân tích từ nhiều góc độ, kết hợp giữa lý thuyết học thuật và ứng dụng thực tiễn — để bạn không chỉ "biết" mà còn có thể "hành động" dựa trên hiểu biết này.`,

        `Hãy đọc bản phân tích này với tâm thế thoải mái và cởi mở. Một số điều sẽ resonant ngay lập tức — "đúng là mình!". Một số khác có thể cần thời gian để chiêm nghiệm. Tất cả đều có giá trị, vì chúng phản ánh những tầng năng lượng khác nhau trong bản đồ sao của bạn.`,
    ];

    // Add system-specific context
    if (system === 'tuvi') {
        const tuViChart = chartData as TuViChartSummary;
        const menhPalace = tuViChart.palaces.find(p => p.name.includes('Mệnh'));
        if (menhPalace && menhPalace.majorStars.length > 0) {
            const starNames = menhPalace.majorStars.map(s => s.name).join(' — ');
            paragraphs.push(
                `Lá số Tử Vi của bạn có ${starNames} tọa thủ tại cung Mệnh — tạo nên nền tảng tính cách và vận mệnh. Cấu trúc 12 cung trong bản đồ sao tương tác với nhau như một hệ sinh thái phức tạp, và bản phân tích dưới đây sẽ giúp bạn giải mã từng lớp ý nghĩa của hệ sinh thái đó.`
            );
        }
    } else {
        const chiemTinhChart = chartData as ChiemTinhChartSummary;
        const sun = chiemTinhChart.placements.find(p => p.planet === 'Sun');
        const moon = chiemTinhChart.placements.find(p => p.planet === 'Moon');
        if (sun && moon) {
            paragraphs.push(
                `Bản đồ sao của bạn với Mặt Trời tại ${sun.sign} và Mặt Trăng tại ${moon.sign} tạo nên sự kết hợp năng lượng độc đáo. Mặt Trời đại diện cho "bạn-ở-bề-mặt" — cái tôi bạn thể hiện ra bên ngoài. Mặt Trăng đại diện cho "bạn-ở-bên-trong" — thế giới cảm xúc thầm kín mà đôi khi chỉ bạn mới biết. Sự tương tác giữa hai lực lượng này định hình mọi khía cạnh cuộc sống của bạn.`
            );
        }
    }

    return {
        title: `Khám Phá Bản Đồ Sao Của Bạn — Phân Tích ${systemLabel}`,
        paragraphs,
    };
}

// ═══════════════════════════════════════════════════════════════════
// Executive Summary Generator
// ═══════════════════════════════════════════════════════════════════

function generateExecutiveSummary(
    archetypeName: string,
    traits: readonly string[],
    element: string
): ExecutiveSummaryBlock {
    const topTraits = traits.slice(0, 3).join(', ').toLowerCase();
    
    return {
        title: 'Tóm Lược Tinh Hoa Bản Mệnh',
        coreArchetype: archetypeName,
        dominantTraits: traits,
        careerDirection: 'Tập trung phát huy vùng thiên phú tự nhiên', // Can be expanded later based on Quan Loc
        coreAdvice: `Hãy tận dụng lợi thế ${topTraits} làm la bàn định hướng.`,
        summaryParagraph: `Bức tranh tổng thể cho thấy bạn mang nguyên mẫu ${archetypeName} với nguyên tố chủ đạo ${element}. Sức mạnh cốt lõi của bạn nằm ở ${topTraits}. Đây là nền tảng để bạn xây dựng cuộc đời, thay vì cố gắng thay đổi bản chất để vừa vặn với kỳ vọng của người khác.`
    };
}

// ═══════════════════════════════════════════════════════════════════
// Yearly Outlook Generator
// ═══════════════════════════════════════════════════════════════════

function generateYearlyOutlook(
    system: AstrologySystem,
    archetypeName: string,
    element: string,
): YearlyOutlookBlock {
    const currentYear = new Date().getFullYear();

    // Generate generic but compelling yearly energy themes
    const themes: string[] = [
        'Chuyển hóa và đổi mới bản thân',
        'Xây dựng nền tảng vững chắc',
        'Mở rộng mạng lưới quan hệ',
        'Đầu tư cho sức khỏe tinh thần',
    ];

    return {
        year: currentYear,
        title: `Năng Lượng Năm ${currentYear} — Tổng Quan`,
        summary: `Năm ${currentYear} mang đến năng lượng chuyển đổi mạnh mẽ cho bản mệnh "${archetypeName}". Với nguyên tố ${element} làm nền tảng, đây là giai đoạn thuận lợi để bạn nhìn lại những gì đã xây dựng, loại bỏ những gì không còn phục vụ mục tiêu, và đặt viên gạch mới cho chu kỳ phát triển tiếp theo. Năng lượng vũ trụ ủng hộ sự trung thực với bản thân — càng authentically bạn sống, càng nhiều cơ hội đến. Đặc biệt, nửa cuối năm hứa hẹn những bước đột phá trong lĩnh vực bạn đã đầu tư công sức lâu nhất.`,
        keyThemes: themes,
        advice: `Lời khuyên cho ${currentYear}: Tập trung vào CHẤT hơn LƯỢNG. Thay vì cố gắng làm mọi thứ, hãy chọn 2-3 mục tiêu thực sự quan trọng và đi sâu. Năng lượng năm này thưởng cho sự kiên nhẫn và chiến lược — không phải tốc độ. Hãy tin vào "divine timing" — mọi thứ sẽ đến đúng lúc nếu bạn đang đi đúng hướng.`,
    };
}

// ═══════════════════════════════════════════════════════════════════
// Closing Meditation Generator
// ═══════════════════════════════════════════════════════════════════

function generateClosingMeditation(archetypeName: string, traits: readonly string[]): string {
    const topTraits = traits.slice(0, 3).join(', ').toLowerCase();
    return (
        `Hãy dành một phút tĩnh lặng.\n\n` +
        `Hít thở sâu — cảm nhận hơi thở đi vào cơ thể, mang theo năng lượng mới. Thở ra — thả đi những gì không còn phục vụ bạn.\n\n` +
        `Bạn là "${archetypeName}" — mang trong mình ${topTraits}. Đây không phải nhãn dán — đây là la bàn. Mỗi ngày, bạn có quyền chọn cách sử dụng năng lượng này: để xây dựng, để chữa lành, để tỏa sáng.\n\n` +
        `Bản đồ sao là bản phác thảo. Bạn là nghệ sĩ. Bức tranh cuộc đời bạn vẽ nên sẽ đẹp theo cách mà không một thuật toán nào có thể dự đoán — vì nó được tô bằng những lựa chọn mà chỉ BẠN mới có thể thực hiện.\n\n` +
        `Hãy sống ĐÚNG với mình. Không phải vì sao nói vậy — mà vì đó là cách đẹp nhất bạn có thể sống.\n\n` +
        `— Lịch Việt, với sự tin tưởng vào hành trình của bạn ✨`
    );
}

// ═══════════════════════════════════════════════════════════════════
// Main API
// ═══════════════════════════════════════════════════════════════════

/**
 * Generate the complete narrative result for a chart.
 *
 * This is the top-level API that produces the full NarrativeResult
 * consumed by the NarrativePane UI component and PDF generator.
 *
 * Now generates multi-chapter content with introduction, multi-paragraph
 * life areas, yearly outlook, and closing meditation.
 */
export function generateFullNarrative(
    system: AstrologySystem,
    chartData: TuViChartSummary | ChiemTinhChartSummary,
): NarrativeResult {
    // 1. Detect archetype
    const archetypeResult = detectArchetype(system, chartData);
    const arch = archetypeResult.primary.archetype;

    // 2. Extract strengths/challenges
    const traits = extractStrengths(system, chartData);

    // 3. Generate introduction
    const introduction = generateIntroduction(system, chartData, arch.name, arch.element);

    // 4. Build life area narratives (multi-paragraph)
    const lifeAreas = LIFE_AREA_ORDER.map(area =>
        buildLifeAreaNarrative(system, area, chartData)
    );

    // 5. Generate executive summary
    const executiveSummary = generateExecutiveSummary(arch.name, arch.definingTraits, arch.element);

    // 6. Generate yearly outlook
    const yearlyOutlook = generateYearlyOutlook(system, arch.name, arch.element);

    // 7. Generate closing meditation
    const closingMeditation = generateClosingMeditation(arch.name, arch.definingTraits);

    // 8. Generate closing advice
    const closingAdvice = `Hãy nhớ rằng bản đồ sao chỉ là bản phác thảo — bạn là người vẽ nên bức tranh cuộc đời mình. Với tính cách ${arch.name}, hãy tận dụng ${arch.definingTraits.slice(0, 2).join(' và ').toLowerCase()} như những công cụ mạnh mẽ nhất của bạn.`;

    // 9. Estimate reading time
    const readingTime = estimateReadingTime({
        introduction,
        executiveSummary,
        lifeAreas,
        yearlyOutlook,
        closingMeditation,
        closingAdvice,
    });

    // 10. Assemble result
    return {
        archetype: {
            id: arch.id,
            name: arch.name,
            nameEn: arch.nameEn,
            description: arch.shortDescription,
            element: arch.element,
            emoji: arch.emoji,
        },
        definingTraits: [...arch.definingTraits],
        readingTimeMinutes: readingTime,
        introduction,
        executiveSummary,
        lifeAreas,
        strengths: traits.strengths,
        challenges: traits.challenges,
        yearlyOutlook,
        closingAdvice,
        closingMeditation,
    };
}

/**
 * Generate narrative for a single life area.
 * Useful for lazy-loading individual sections.
 */
export function generateLifeAreaNarrative(
    system: AstrologySystem,
    area: LifeAreaType,
    chartData: TuViChartSummary | ChiemTinhChartSummary,
): LifeAreaNarrative {
    return buildLifeAreaNarrative(system, area, chartData);
}
