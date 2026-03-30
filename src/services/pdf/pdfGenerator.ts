/**
 * Premium PDF Generator — 2-Tier (Medium / Full) Text-dense Academic Output
 *
 * Uses window.print() with @page CSS to produce a
 * professionally structured multi-chapter PDF report
 * following journal/book typography conventions.
 *
 * Tiers:
 *   - 'medium' (~30 pages): Archetype + Scores, 5 life areas condensed,
 *     patterns list, star grid, current Đại Vận, advice. "Powered by" footer.
 *   - 'full' (~60-70 pages): Everything above expanded + full 12-palace
 *     academic analysis, all Đại Vận periods, Lưu Niên, expanded advice.
 *
 * Architecture: Thin orchestrator that delegates to:
 * - pdfStyles.ts — Print CSS and helpers
 * - pdfSections.ts — Chapter HTML generators
 * - pdfProseHelpers.ts — Extended prose content generators
 */

import type { NarrativeResult } from '../interpretation/types';
import { getPdfCSS } from './pdfStyles';
import {
    generateCoverPage,
    generateTableOfContents,
    generateIntroductionChapter,
    generateArchetypeChapter,
    generateTraitsChapter,
    generateLifeAreaChapter,
    generateYearlyOutlookChapter,
    generateClosingChapter,
    generateAppendix,
} from './pdfSections';

export type PdfTier = 'medium' | 'full';

// ── Main PDF Generation ──────────────────────────────────────

/**
 * Generate the complete printable HTML for a multi-chapter PDF report.
 *
 * @param pdfTier - 'medium' generates ~30-page condensed version,
 *                  'full' generates ~60-70 page expanded version.
 */
export function generatePrintableHtml(
    result: NarrativeResult,
    chartType: string,
    pdfTier: PdfTier = 'full',
): string {
    if (pdfTier === 'medium') {
        return generateMediumPdf(result, chartType);
    }
    return generateFullPdf(result, chartType);
}

/**
 * Full PDF (~60-70 pages): All chapters, expanded prose, full appendix.
 * Targeted at Paid users.
 */
function generateFullPdf(result: NarrativeResult, chartType: string): string {
    const lifeAreaChapters = result.lifeAreas
        .map((_, i) => generateLifeAreaChapter(result, i, chartType))
        .join('');

    return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Bản Phân Tích ${chartType === 'tuvi' ? 'Tử Vi' : 'Chiêm Tinh'} — ${result.archetype.name}</title>
    <style>${getPdfCSS()}</style>
</head>
<body>
    ${generateCoverPage(result, chartType)}
    ${generateTableOfContents(result)}
    ${generateIntroductionChapter(result, chartType)}
    ${generateArchetypeChapter(result)}
    ${generateTraitsChapter(result)}
    ${lifeAreaChapters}
    ${generateYearlyOutlookChapter(result)}
    ${generateClosingChapter(result)}
    ${generateAppendix(result, chartType)}
</body>
</html>`;
}

/**
 * Medium PDF (~30 pages): Condensed overview.
 * - Cover + condensed ToC
 * - Archetype summary (no expanded prose)
 * - Traits (condensed)
 * - Life areas: first 2 paragraphs per area only (no expanded sections)
 * - Yearly outlook (condensed)
 * - No closing meditation / appendix / methodology
 * - "Powered by Lịch Việt" footer on every page
 *
 * Targeted at Partial-Premium users.
 */
function generateMediumPdf(result: NarrativeResult, chartType: string): string {
    const systemLabel = chartType === 'tuvi' ? 'Tử Vi Đẩu Số' : 'Chiêm Tinh Phương Tây';
    const tradition = chartType === 'tuvi' ? 'Đông Phương' : 'Tây Phương';
    const date = new Date().toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' });

    // ── Condensed Cover ──
    const cover = `
<div class="pdf-cover">
    <div class="pdf-cover-emoji">${result.archetype.emoji}</div>
    <div class="pdf-cover-title">Bản Tổng Quan</div>
    <div class="pdf-cover-subtitle">${systemLabel}</div>
    <div class="pdf-cover-archetype">"${escHtml(result.archetype.name)}"</div>
    <div class="pdf-cover-element">Nguyên tố ${escHtml(result.archetype.element)} · ${escHtml(result.archetype.nameEn)}</div>
    <div class="pdf-cover-meta">
        Thời gian đọc: ~${Math.ceil(result.readingTimeMinutes / 2)} phút · Tạo ngày ${date}
    </div>
    <div class="pdf-cover-brand">Bản Tổng Quan — Powered by Lịch Việt · lichviet.app</div>
</div>`;

    // ── Introduction ──
    const introParas = result.introduction.paragraphs
        .map(p => `<p class="pdf-paragraph">${escHtml(p)}</p>`)
        .join('');

    const introduction = `
<div class="pdf-chapter">
    <div class="pdf-chapter-header">
        <span class="pdf-chapter-number">Chương I</span>
        <h2 class="pdf-chapter-title">Giới Thiệu</h2>
        <p class="pdf-chapter-subtitle">${escHtml(result.introduction.title)}</p>
    </div>
    ${introParas}
    <div class="pdf-section">
        <h3 class="pdf-section-title">Tổng Quan Về ${systemLabel}</h3>
        <p class="pdf-paragraph">${systemLabel} là một trong những hệ thống phân tích vận mệnh lâu đời và tinh vi nhất của truyền thống ${tradition}. Qua hàng ngàn năm phát triển và kiểm chứng thực tiễn, hệ thống này trở thành bộ công cụ phân tích có chiều sâu vượt xa những phương pháp bói toán thông thường. Nó được xây dựng trên nền tảng toán học thiên văn chính xác, kết hợp với hệ thống biểu tượng phong phú, tạo nên khung phân tích có khả năng phản ánh những tầng năng lượng phức tạp nhất của con người.</p>
        <p class="pdf-paragraph">Bản phân tích này không phải lời tiên tri cố định. Nó là một tấm bản đồ năng lượng — cho thấy địa hình thuận lợi, những thách thức tiềm ẩn, và những con đường phát triển phù hợp nhất. Giống như người thuyền trưởng đọc hải đồ, bạn — với ý chí tự do và nỗ lực — luôn là người quyết định hướng đi. Nghiên cứu tâm lý học hiện đại đã chỉ ra rằng sự tự-nhận-thức (self-awareness) là yếu tố dự báo mạnh nhất cho thành công cuộc sống, và bản phân tích này là công cụ hỗ trợ hành trình tự-nhận-thức đó.</p>
    </div>
    <div class="pdf-section">
        <h3 class="pdf-section-title">Cách Đọc Hiệu Quả Nhất</h3>
        <p class="pdf-paragraph">Bản phân tích sử dụng phương pháp ETC (Effects Then Causes) — trình bày biểu hiện và tác động thực tế trước, giải thích nguyên nhân chiêm tinh sau. Phương pháp này dựa trên nghiên cứu tâm lý nhận thức về "hiệu ứng tự nhận dạng" (self-recognition effect), giúp bạn ngay lập tức nhận ra "đúng là mình!" trước khi tìm hiểu cơ sở khoa học. Hãy đọc với tâm thế cởi mở — không đánh giá "đúng hay sai", mà quan sát xem điều gì resonant với trải nghiệm thực tế.</p>
    </div>
</div>`;

    // ── Archetype ──
    const traits = (result.definingTraits as string[]).map(t => escHtml(t)).join(', ');
    const archetype = `
<div class="pdf-chapter">
    <div class="pdf-chapter-header">
        <span class="pdf-chapter-number">Chương II</span>
        <h2 class="pdf-chapter-title">Hồ Sơ Nguyên Mẫu</h2>
        <p class="pdf-chapter-subtitle">${escHtml(result.archetype.name)} — ${escHtml(result.archetype.nameEn)}</p>
    </div>
    <div class="pdf-section">
        <h3 class="pdf-section-title">Bạn Là Ai?</h3>
        <p class="pdf-paragraph">${escHtml(result.archetype.description)}</p>
        <p class="pdf-paragraph">Với nguyên tố ${escHtml(result.archetype.element)}, bạn mang năng lượng "${escHtml(result.archetype.name)}" — không phải nhãn dán đơn giản mà là bản đồ năng lượng phức tạp phản ánh cốt lõi bản chất con người bạn. Theo lý thuyết nguyên mẫu của Carl Jung, mỗi nguyên mẫu đại diện cho một mô hình năng lượng phổ quát tồn tại trong vô thức tập thể. Nguyên mẫu "${escHtml(result.archetype.name)}" cho thấy bạn có xu hướng tự nhiên tiếp cận cuộc sống từ góc độ đặc trưng — cách bạn đưa ra quyết định, xử lý xung đột, xây dựng mối quan hệ, và phản ứng dưới áp lực đều chịu ảnh hưởng sâu sắc từ cấu trúc năng lượng bẩm sinh này.</p>
        <p class="pdf-paragraph">Trong tâm lý học phát triển, Abraham Maslow gọi quá trình sống đúng với bản chất bẩm sinh là "tự hiện thực hóa" (self-actualization) — trạng thái mà con người phát huy tối đa tiềm năng và cảm thấy sống có ý nghĩa nhất. Hiểu rõ nguyên mẫu của mình là bước đầu tiên trên con đường tự hiện thực hóa: nó cho bạn ngôn ngữ để diễn đạt những gì trước đây chỉ là cảm giác mơ hồ, và khung tham chiếu để đưa ra những lựa chọn phù hợp hơn với bản chất thật.</p>
    </div>
    <div class="pdf-section">
        <h3 class="pdf-section-title">Đặc Điểm Nổi Bật</h3>
        <p class="pdf-paragraph">Các đặc điểm nổi bật nhất: ${traits}. Mỗi đặc điểm tương tác và bổ sung cho nhau, tạo nên bức tranh tính cách đa chiều. Trong lý thuyết Ngũ Nhân Tố (Big Five) của tâm lý học hiện đại, những đặc điểm này có thể được ánh xạ sang các trục tính cách đã được kiểm chứng khoa học — giúp kết nối tri thức cổ đại với nghiên cứu hiện đại. Có những đặc điểm dễ nhận ra từ bên ngoài, nhưng cũng có những đặc điểm chỉ biểu hiện trong hoàn cảnh cụ thể hoặc trong các mối quan hệ thân mật.</p>
        <p class="pdf-paragraph">Điều đặc biệt quan trọng mà nghiên cứu tâm lý nhấn mạnh: những đặc điểm tính cách không phải số phận cố định — chúng là xu hướng. Neuroplasticity (tính dẻo thần kinh) cho thấy bộ não con người có khả năng thay đổi suốt đời. Tuy nhiên, sự thay đổi hiệu quả nhất không đến từ việc cố gắng trở thành người khác, mà từ việc hiểu rõ bản thân và phát triển từ chính nền tảng đó. Chính vì vậy, bản phân tích này không nhằm gán nhãn mà nhằm cung cấp tấm gương phản chiếu — để bạn nhìn rõ mình hơn.</p>
    </div>
</div>`;

    // ── Traits: inline prose, no grid ──
    const strengthProse = (result.strengths as { label: string; description: string }[])
        .map(s => `<div class="pdf-trait-item"><div class="pdf-trait-label">✦ ${escHtml(s.label)}.</div><div class="pdf-trait-desc">${escHtml(s.description)}</div></div>`)
        .join('');

    const challengeProse = (result.challenges as { label: string; description: string }[])
        .map(c => `<div class="pdf-trait-item"><div class="pdf-trait-label">⚡ ${escHtml(c.label)}.</div><div class="pdf-trait-desc">${escHtml(c.description)}</div></div>`)
        .join('');

    const traitsChapter = `
<div class="pdf-chapter">
    <div class="pdf-chapter-header">
        <span class="pdf-chapter-number">Chương III</span>
        <h2 class="pdf-chapter-title">Điểm Mạnh & Thử Thách</h2>
        <p class="pdf-chapter-subtitle">Hiểu bản thân sâu hơn để phát triển tốt hơn</p>
    </div>
    <p class="pdf-paragraph">Mỗi con người sở hữu tổ hợp độc đáo gồm "siêu năng lực" bẩm sinh và "vùng phát triển" cần chú ý. Nghiên cứu tâm lý học tích cực (Positive Psychology) của Martin Seligman chỉ ra rằng hạnh phúc bền vững đến từ việc phát huy "character strengths" — những thế mạnh tính cách bẩm sinh — thay vì tập trung sửa chữa điểm yếu. Tuy nhiên, điều quan trọng nhất không phải là có bao nhiêu điểm mạnh, mà là mức độ nhận thức (self-awareness) về chúng. Những người có nhận thức cao thường đưa ra quyết định tốt hơn, xây dựng mối quan hệ chất lượng hơn, và đạt sự thỏa mãn cuộc sống cao hơn — bất kể cấu trúc năng lượng bẩm sinh.</p>
    <div class="pdf-traits-grid">
        <div class="pdf-traits-column pdf-traits-column--positive">
            <div class="pdf-traits-column-title">Điểm Mạnh Nổi Bật</div>
            ${strengthProse}
        </div>
        <div class="pdf-traits-column pdf-traits-column--challenge">
            <div class="pdf-traits-column-title">Thử Thách Cần Lưu Ý</div>
            ${challengeProse}
        </div>
    </div>
    <div class="pdf-section">
        <h3 class="pdf-section-title">Chiến Lược Phát Huy & Quản Lý</h3>
        <p class="pdf-paragraph">Chiến lược tối ưu không phải loại bỏ điểm yếu mà là quản lý chúng. Trong tâm lý học, người ta gọi đây là "strength-based approach": nhận biết điểm yếu nhưng đầu tư năng lượng chính vào phát huy điểm mạnh. Ví dụ, sự cầu toàn quá mức có thể chuyển hóa thành sự tỉ mỉ có mục đích; sự nhạy cảm thành trực giác mạnh mẽ; sự cứng đầu thành sự kiên định. Hãy chủ động tìm kiếm những môi trường và tình huống cho phép phát huy năng lượng tốt nhất — khi sống đúng thế mạnh, bạn không chỉ thành công hơn mà còn hạnh phúc hơn.</p>
    </div>
</div>`;

    // ── Life Areas: ALL paragraphs (not just 2) ──
    const lifeAreas = result.lifeAreas.map((la, i) => {
        const medBridges = [
            'Những xu hướng này đan xen với nhau — như các nốt nhạc tạo nên giai điệu cuộc đời bạn.',
            'Năng lượng này ảnh hưởng đến nhiều lĩnh vực liên quan, tạo thành mô hình lặp lại đáng chú ý.',
            'Đây là khuynh hướng bẩm sinh — không phải định mệnh bất khả kháng. Nhận thức là bước đầu tiên.',
            'Bản đồ sao cho thấy vùng đất — bạn là người CHỌN cách canh tác trên vùng đất ấy.',
            'Tâm lý học gọi đây là "năng lượng gốc" — nền tảng mà mọi trải nghiệm cuộc sống được xây dựng trên đó.',
        ];
        const allEtc = la.paragraphs.map((para, pi) => {
            const allEffects = para.effectParagraphs.map(ep => escHtml(ep)).join(' ');
            const bridge = medBridges[pi % medBridges.length];
            return `
<div class="pdf-section">
    <p class="pdf-paragraph">${escHtml(para.hook)} ${allEffects} ${bridge}</p>
    <p class="pdf-paragraph">${escHtml(para.tip)}</p>
</div>`;
        }).join('');

        const influences = la.keyInfluences.length > 0
            ? `<p class="pdf-paragraph pdf-paragraph--no-indent">Các yếu tố ảnh hưởng chính: <span class="pdf-influences">${la.keyInfluences.map(inf => `<span class="pdf-influence-tag">${escHtml(inf.name)}</span>`).join('')}</span>. Sự tương tác giữa các yếu tố này tạo nên bức tranh phức tạp và đa chiều.</p>`
            : '';

        return `
<div class="pdf-chapter">
    <div class="pdf-chapter-header">
        <span class="pdf-chapter-number">Chương ${i + 4}</span>
        <h2 class="pdf-chapter-title">${escHtml(la.title)}</h2>
        <p class="pdf-chapter-subtitle">${escHtml(la.subtitle)}</p>
    </div>
    <p class="pdf-paragraph">Trong lĩnh vực ${escHtml(la.title.toLowerCase())}, bản đồ sao cho thấy những xu hướng năng lượng đặc trưng ảnh hưởng sâu sắc đến trải nghiệm và kết quả. Theo lý thuyết hệ thống sinh thái (ecological systems theory) của Urie Bronfenbrenner, mỗi lĩnh vực cuộc sống không tồn tại độc lập mà tương tác với các lĩnh vực khác — sự nghiệp ảnh hưởng đến sức khỏe, tình yêu ảnh hưởng đến tinh thần, và ngược lại. Hãy đọc với sự liên kết, đối chiếu các chương với nhau để thấy bức tranh toàn cảnh.</p>
    ${allEtc}
    ${influences}
</div>`;
    }).join('');

    // ── Yearly Outlook ──
    const ol = result.yearlyOutlook;
    const themes = ol.keyThemes
        .map(t => `<span class="pdf-outlook-theme">${escHtml(t)}</span>`)
        .join('');

    const yearlyOutlook = `
<div class="pdf-chapter pdf-outlook">
    <div class="pdf-chapter-header">
        <span class="pdf-chapter-number">Chương ${result.lifeAreas.length + 4}</span>
        <h2 class="pdf-chapter-title">${escHtml(ol.title)}</h2>
        <p class="pdf-chapter-subtitle">Tổng quan năng lượng năm ${ol.year}</p>
    </div>
    <div class="pdf-section">
        <h3 class="pdf-section-title">Xu Hướng Tổng Quan</h3>
        <p class="pdf-paragraph">${escHtml(ol.summary)}</p>
        <p class="pdf-paragraph">Năm ${ol.year} đặt ra những câu hỏi quan trọng: Bạn muốn trở thành ai? Bạn sẵn sàng bỏ lại điều gì? Bạn muốn xây dựng điều gì mới? Trong tâm lý học phát triển, Erik Erikson mô tả cuộc đời như chuỗi "khủng hoảng tích cực" — những giai đoạn đối mặt với câu hỏi then chốt, và cách chúng ta trả lời định hình con người ta trở thành. Năng lượng năm này tạo ra không gian và động lực để bạn tìm kiếm câu trả lời chân thành nhất.</p>
    </div>
    <div class="pdf-section">
        <h3 class="pdf-section-title">Chủ Đề Chính</h3>
        <p class="pdf-paragraph pdf-paragraph--no-indent">Các chủ đề năng lượng chính: <span class="pdf-outlook-themes">${themes}</span>. Đây không phải sự kiện cụ thể mà là "dòng năng lượng" chi phối bầu không khí tổng thể — bạn sẽ cảm nhận chúng qua những tình huống, cơ hội, và thách thức lặp đi lặp lại theo mô hình tương tự.</p>
    </div>
    <div class="pdf-section">
        <h3 class="pdf-section-title">Phân Tích Theo Quý</h3>
        <p class="pdf-paragraph"><strong>Quý I (tháng 1-3):</strong> Giai đoạn khởi động — năng lượng ủng hộ suy ngẫm, hoạch định và gieo "hạt giống". Tránh hành động vội vàng; dành thời gian quan sát, nghiên cứu. Với nguyên mẫu "${escHtml(result.archetype.name)}", đây là lúc đặt nền tảng cho cả năm.</p>
        <p class="pdf-paragraph"><strong>Quý II (tháng 4-6):</strong> Năng lượng tăng tốc — kế hoạch bắt đầu triển khai. Thuận lợi cho mở rộng quan hệ, khởi động dự án, đầu tư phát triển bản thân. Cân bằng giữa tham vọng và thực tế.</p>
        <p class="pdf-paragraph"><strong>Quý III (tháng 7-9):</strong> Cao trào — nỗ lực cho kết quả, nhưng cũng xuất hiện thách thức đòi hỏi linh hoạt. Đừng bám vào kế hoạch cứng nhắc; sẵn sàng điều chỉnh khi hoàn cảnh thay đổi.</p>
        <p class="pdf-paragraph"><strong>Quý IV (tháng 10-12):</strong> Thu hoạch và chuẩn bị chu kỳ mới — tổng kết, tri ân, giải phóng, và làm mới bản thân. Năng lượng ủng hộ letting go hơn là nắm giữ.</p>
    </div>
    <div class="pdf-section">
        <h3 class="pdf-section-title">Lời Khuyên Tổng Quát</h3>
        <p class="pdf-paragraph">${escHtml(ol.advice)}</p>
    </div>
</div>`;

    // ── "Get Full Version" CTA ──
    const fullVersionCta = `
<div class="pdf-chapter" style="text-align:center; page-break-before: always;">
    <p class="pdf-paragraph" style="text-align:center; font-size:13pt; font-weight:bold; margin-top: 2em;">
        Đây là Bản Tổng Quan
    </p>
    <p class="pdf-paragraph" style="text-align:center; color:#666;">
        Nâng cấp Premium để nhận Bản Phân Tích Đầy Đủ (~60-70 trang) bao gồm:
    </p>
    <ul style="list-style-type: none; text-align: center; padding: 0; line-height: 2;">
        <li>📖 Phân tích chi tiết 12 cung vị với luận giải học thuật chuyên sâu</li>
        <li>🔮 Toàn bộ 12 giai đoạn Đại Vận (mỗi giai đoạn 10 năm)</li>
        <li>📅 Phân tích Lưu Niên cho năm hiện tại</li>
        <li>🧭 Lời khuyên cải vận mở rộng dựa trên tâm lý học ứng dụng</li>
        <li>📚 Phụ lục thuật ngữ, phương pháp luận & tài liệu tham khảo</li>
    </ul>
    <p class="pdf-paragraph" style="text-align:center; margin-top: 1.5em;">
        <strong>lichviet.app/nang-cap</strong>
    </p>
    <p class="pdf-paragraph" style="text-align:center; font-style:italic; color:#888; margin-top:2em;">
        Powered by Lịch Việt — lichviet.app
    </p>
</div>`;

    // ── Medium CSS override: add footer branding ──
    const mediumCssOverride = `
<style>
@page {
    @bottom-center {
        content: "Powered by Lịch Việt — lichviet.app";
        font-size: 8pt;
        color: #aaa;
    }
}
</style>`;

    return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Bản Tổng Quan ${chartType === 'tuvi' ? 'Tử Vi' : 'Chiêm Tinh'} — ${result.archetype.name}</title>
    <style>${getPdfCSS()}</style>
    ${mediumCssOverride}
</head>
<body>
    ${cover}
    ${introduction}
    ${archetype}
    ${traitsChapter}
    ${lifeAreas}
    ${yearlyOutlook}
    ${fullVersionCta}
</body>
</html>`;
}

/** Simple HTML escaping */
function escHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// ── Public Download Function ─────────────────────────────────

/**
 * Open a new window with the printable HTML and trigger print dialog.
 *
 * @param pdfTier - 'medium' for condensed, 'full' for expanded.
 */
export async function downloadPdf(
    result: NarrativeResult,
    chartType: string,
    pdfTier: PdfTier = 'full',
): Promise<void> {
    const html = generatePrintableHtml(result, chartType, pdfTier);
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        alert('Không thể mở cửa sổ in. Vui lòng cho phép popup.');
        return;
    }
    printWindow.document.write(html);
    printWindow.document.close();

    // Wait for fonts and styles to load
    await new Promise(resolve => {
        printWindow.onload = resolve;
        setTimeout(resolve, 3000); // Fallback timeout
    });

    printWindow.focus();
    printWindow.print();
}
