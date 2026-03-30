import type { TuViPalace, TuViChartData } from '../tuviTypes';
import { STAR_IN_PALACE_CONTEXT } from '../palaceKnowledgeBase';
import { getBrightnessCategory, getBrightnessLabel, OPPOSITE_BRANCHES } from './palaceHelpers';

// ═══════════════════════════════════════════════════════════════════
// Palace Summary Generator
// ═══════════════════════════════════════════════════════════════════
export function generatePalaceSummary(palace: TuViPalace, palaceBaseName: string, chart: TuViChartData): string {
    const parts: string[] = [];

    if (palace.majorStars.length === 0) {
        parts.push(`Cung ${palaceBaseName} ở trạng thái **vô chính diệu** — không có chính tinh tọa thủ.`);
        const oppBranch = OPPOSITE_BRANCHES[palace.earthlyBranch];
        const oppPalace = oppBranch ? chart.palaces.find(p => p.earthlyBranch === oppBranch) : undefined;
        if (oppPalace && oppPalace.majorStars.length > 0) {
            const oppNames = oppPalace.majorStars.map(s => s.name).join(', ');
            parts.push(`Cần mượn chính tinh ${oppNames} từ đối cung ${oppPalace.name} để luận.`);
        }
        parts.push('Phụ tinh, sát tinh và hoàn cảnh bên ngoài ảnh hưởng rất lớn đến cung này.');
    } else {
        // Star names and brightness
        const starDescs = palace.majorStars.map(s => {
            const bl = getBrightnessLabel(s.brightness);
            return bl ? `${s.name} ${bl}` : s.name;
        });
        parts.push(`Cung ${palaceBaseName} có **${starDescs.join(', ')}** tọa thủ.`);

        // ── Star-in-palace context for each major star ──
        for (const star of palace.majorStars) {
            const ctx = STAR_IN_PALACE_CONTEXT[star.name]?.[palaceBaseName];
            if (ctx) parts.push(ctx);
        }

        // Overall brightness assessment
        const strongCount = palace.majorStars.filter(s => getBrightnessCategory(s.brightness) === 'strong').length;
        const weakCount = palace.majorStars.filter(s => getBrightnessCategory(s.brightness) === 'weak').length;
        if (strongCount > 0 && weakCount === 0) {
            parts.push('Chính tinh đắc địa (Miếu/Vượng) — cách cục tốt, phát huy được hết sức mạnh.');
        } else if (weakCount > 0 && strongCount === 0) {
            parts.push('Chính tinh lạc hãm — cách cục kém, cần phụ tinh cát hỗ trợ để hóa giải.');
        } else if (strongCount > 0 && weakCount > 0) {
            parts.push('Cách cục vừa sáng vừa tối — tùy thuộc vào phụ tinh hội hợp mà luận cát hung.');
        }
    }

    // Soul/Body
    if (palace.isSoulPalace) parts.push('Đây là **cung Mệnh** — trung tâm của toàn lá số.');
    if (palace.isBodyPalace) parts.push('Đây là **cung an Thân** — phản ánh cuộc đời từ trung niên trở đi.');

    return parts.join(' ');
}
