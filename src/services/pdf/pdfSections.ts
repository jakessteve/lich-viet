/**
 * PDF Sections — Text-dense academic chapter generators
 *
 * Each function generates one chapter of the multi-chapter PDF report.
 * Produces 60-70 A4 pages of flowing prose following journal/academic style.
 */

import type { NarrativeResult } from '../interpretation/types';
import { esc, CHAPTER_EMOJI } from './pdfStyles';
import {
    BRIDGE_CONTEXT_VARIANTS,
    BRIDGE_DUALITY_VARIANTS,
    BRIDGE_ACTION_VARIANTS,
    STRENGTH_TAIL_VARIANTS,
    CHALLENGE_TAIL_VARIANTS,
    fillPlaceholders,
} from './pdfContentBank';
import {
    generateExpandedIntroSections,
    generateExpandedArchetypeSections,
    generateTraitsProseExpansion,
    generateLifeAreaSummary,
    generateExpandedYearlyOutlook,
    generateExpandedClosing,
    generateExpandedAppendixTerms,
    generateMethodologySection,
} from './pdfProseHelpers';

// ── Cover Page ────────────────────────────────────────────────

// ── Cover Page ────────────────────────────────────────────────
export function generateCoverPage(result: NarrativeResult, chartType: string): string {
    const systemLabel = chartType === 'tuvi' ? 'Tử Vi Đẩu Số' : chartType === 'numerology' ? 'Thần Số Học' : 'Chiêm Tinh Phương Tây';
    const date = new Date().toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' });

    return `
<div class="pdf-cover">
    <div class="pdf-cover-emoji">${result.archetype.emoji}</div>
    <div class="pdf-cover-title">Bản Phân Tích Chi Tiết</div>
    <div class="pdf-cover-subtitle">${systemLabel}</div>
    <div class="pdf-cover-archetype">"${esc(result.archetype.name)}"</div>
    <div class="pdf-cover-element">Nguyên tố ${esc(result.archetype.element)} · ${esc(result.archetype.nameEn)}</div>
    <div class="pdf-cover-meta">
        Thời gian đọc: ~${result.readingTimeMinutes} phút · Tạo ngày ${date}
    </div>
    <div class="pdf-cover-brand">Được tạo bởi Lịch Việt — lichviet.app</div>
</div>`;
}


// ── Table of Contents ─────────────────────────────────────────

export function generateTableOfContents(result: NarrativeResult): string {
    const chapters = [
        { num: 'I', title: 'Giới Thiệu' },
        { num: 'II', title: `Hồ Sơ Nguyên Mẫu — ${result.archetype.name}` },
        { num: 'III', title: 'Điểm Mạnh & Thử Thách' },
    ];

    result.lifeAreas.forEach((la, i) => {
        chapters.push({ num: `${i + 4}`, title: la.title });
    });

    chapters.push(
        { num: `${result.lifeAreas.length + 4}`, title: `Năng Lượng Năm ${result.yearlyOutlook.year}` },
        { num: `${result.lifeAreas.length + 5}`, title: 'Thiền Định & Suy Ngẫm' },
        { num: `${result.lifeAreas.length + 6}`, title: 'Phụ Lục — Thuật Ngữ & Phương Pháp Luận' },
    );

    const items = chapters.map(ch => `
<li class="pdf-toc-item">
    <span class="pdf-toc-item-number">${ch.num}</span>
    <span class="pdf-toc-item-title">${esc(ch.title)}</span>
    <span class="pdf-toc-item-dots"></span>
</li>`).join('');

    return `
<div class="pdf-toc">
    <div class="pdf-toc-title">Mục Lục</div>
    <ul class="pdf-toc-list">${items}</ul>
</div>`;
}

// ── Introduction Chapter ──────────────────────────────────────

// ── Introduction Chapter ──────────────────────────────────────
export function generateIntroductionChapter(result: NarrativeResult, chartType: string): string {
    const paragraphs = result.introduction.paragraphs
        .map(p => `<p class="pdf-paragraph">${esc(p)}</p>`)
        .join('');

    const systemIntro = chartType === 'tuvi'
        ? '<p class="pdf-paragraph">Tử Vi Đẩu Số là hệ thống phân tích vận mệnh có lịch sử hơn một nghìn năm, được khai sáng bởi Trần Đoàn thời Bắc Tống. Hệ thống sử dụng 14 Chính Tinh và hàng trăm Phụ Tinh an bố trên 12 cung vị — mỗi ngôi sao mang một câu chuyện, mỗi cung vị giấu một bài học.</p><p class="pdf-paragraph">Người xưa dạy: <em>"Biết mình biết ta, trăm trận trăm thắng."</em> Bản phân tích dưới đây không phải lời tiên tri cứng nhắc — mà là tấm bản đồ năng lượng, giúp bạn hiểu rõ hơn về chính mình: điểm mạnh, thách thức, và con đường phù hợp nhất.</p>'
        : chartType === 'numerology'
            ? '<p class="pdf-paragraph">Thần Số Học là hệ thống giải mã vận mệnh qua con số, bắt nguồn từ triết gia Pythagoras thời Hy Lạp cổ đại. Mỗi con số từ 1 đến 9 mang một rung động năng lượng riêng biệt, ảnh hưởng đến tính cách và con đường phát triển của mỗi người.</p><p class="pdf-paragraph">Chỉ từ tên và ngày sinh, Thần Số Học giải mã "bản đồ số" cá nhân — cho thấy tiềm năng bẩm sinh, bài học cần trải qua, và thời cơ thuận lợi. Bản phân tích dưới đây sẽ giải mã từng con số quan trọng nhất trong cuộc đời bạn.</p>'
            : '<p class="pdf-paragraph">Chiêm Tinh Phương Tây là hệ thống phân tích vận mệnh dựa trên vị trí các hành tinh tại thời điểm sinh, có truyền thống hơn 2.000 năm. Bản đồ sao tại thời điểm bạn chào đời là "dấu vân tay vũ trụ" — phản ánh tiềm năng, thách thức, và sứ mệnh cuộc đời.</p><p class="pdf-paragraph">Chiêm tinh không phải "bói toán" — mà là ngôn ngữ biểu tượng giúp bạn hiểu bản thân ở chiều sâu, nhận ra những xu hướng vô thức đang chi phối quyết định hàng ngày. Bản phân tích này sẽ giải mã bản đồ sao cá nhân của bạn.</p>';

    return `
<div class="pdf-chapter">
    <div class="pdf-chapter-header">
        <span class="pdf-chapter-number">Chương I</span>
        <h2 class="pdf-chapter-title">Giới Thiệu</h2>
        <p class="pdf-chapter-subtitle">${esc(result.introduction.title)}</p>
    </div>
    ${paragraphs}
    ${systemIntro}
    ${generateExpandedIntroSections(result, chartType)}
</div>`;
}


// ── Archetype Chapter ─────────────────────────────────────────

// ── Archetype Chapter ─────────────────────────────────────────
export function generateArchetypeChapter(result: NarrativeResult): string {
    const traits = result.definingTraits
        .map(t => esc(t))
        .join(', ');

    return `
<div class="pdf-chapter">
    <div class="pdf-chapter-header">
        <span class="pdf-chapter-number">Chương II</span>
        <h2 class="pdf-chapter-title">Hồ Sơ Nguyên Mẫu</h2>
        <p class="pdf-chapter-subtitle">${esc(result.archetype.name)} — ${esc(result.archetype.nameEn)}</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Bạn Là Ai?</h3>
        <p class="pdf-paragraph">${esc(result.archetype.description)}</p>
        <p class="pdf-paragraph">Nguyên mẫu <strong>"${esc(result.archetype.name)}"</strong> (${esc(result.archetype.nameEn)}) của bạn không phải một nhãn dán đơn giản — mà là bản thiết kế năng lượng phản ánh cốt lõi con người bạn. Nó được xác định từ cấu trúc tổng thể bản đồ sao: vị trí các thiên thể, trạng thái sáng tối, và sự tương tác giữa các vị trí quan trọng nhất.</p>
        <p class="pdf-paragraph">Khi đọc mô tả nguyên mẫu, nhiều người thốt lên: <em>"Sao đúng quá vậy?"</em> — đó là vì nguyên mẫu phản ánh tầng sâu nhất của bản thể, nơi bạn không thể tự lừa dối chính mình.</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Đặc Điểm Nổi Bật</h3>
        <p class="pdf-paragraph">Các đặc điểm nổi bật trong năng lượng bẩm sinh của bạn: <strong>${traits}</strong>.</p>
        <p class="pdf-paragraph">Mỗi đặc điểm đều có hai mặt — mặt sáng là thế mạnh bẩm sinh, mặt tối là thách thức cần quản lý. Người xưa dạy: <em>"Quá cương tắc chiết"</em> — cứng quá thì gãy. Sự kiên định quá mức trở thành cố chấp; sự nhạy cảm tinh tế trở thành dễ tổn thương; sự quyết đoán mãnh liệt trở thành áp đặt.</p>
        <p class="pdf-paragraph">Những đặc điểm này ảnh hưởng đến mọi khía cạnh cuộc sống: cách bạn yêu, cách bạn làm việc, cách bạn xử lý xung đột. Trong các chương tiếp theo, bạn sẽ thấy rõ từng đặc điểm biểu hiện cụ thể ra sao — kèm theo lời khuyên thực tiễn.</p>
    </div>

    ${generateExpandedArchetypeSections(result)}
</div>`;
}


// ── Traits Chapter ────────────────────────────────────────────

// ── Traits Chapter ────────────────────────────────────────────
export function generateTraitsChapter(result: NarrativeResult): string {
    const archName = result.archetype.name;
    const archElement = result.archetype.element;

    const strengthItems = (result.strengths as { label: string; description: string }[])
        .map((s, i) => {
            const tail = fillPlaceholders(STRENGTH_TAIL_VARIANTS[i % STRENGTH_TAIL_VARIANTS.length], archName, archElement);
            return `
<div class="pdf-trait-item">
    <div class="pdf-trait-label">✦ ${esc(s.label)}.</div>
    <div class="pdf-trait-desc">${esc(s.description)} ${tail}</div>
</div>`;
        }).join('');

    const challengeItems = (result.challenges as { label: string; description: string }[])
        .map((c, i) => {
            const tail = fillPlaceholders(CHALLENGE_TAIL_VARIANTS[i % CHALLENGE_TAIL_VARIANTS.length], archName, archElement);
            return `
<div class="pdf-trait-item">
    <div class="pdf-trait-label">⚡ ${esc(c.label)}.</div>
    <div class="pdf-trait-desc">${esc(c.description)} ${tail}</div>
</div>`;
        }).join('');

    return `
<div class="pdf-chapter">
    <div class="pdf-chapter-header">
        <span class="pdf-chapter-number">Chương III</span>
        <h2 class="pdf-chapter-title">Điểm Mạnh & Thử Thách</h2>
        <p class="pdf-chapter-subtitle">Nhận diện "siêu năng lực" và "vùng phát triển" của bạn</p>
    </div>

    <p class="pdf-paragraph">Mỗi người đều sở hữu một tổ hợp độc đáo gồm những thế mạnh bẩm sinh và những vùng cần phát triển. Điều quyết định thành bại trong cuộc đời không phải là có bao nhiêu điểm mạnh — mà là bạn có <strong>nhận ra</strong> chúng hay không. Người xưa dạy: <em>"Tri nhân giả trí, tự tri giả minh"</em> — biết người là khôn, biết mình mới là sáng suốt.</p>

    <p class="pdf-paragraph">Có một nghịch lý thú vị: người có "lá số đẹp" chưa chắc hạnh phúc hơn người có "lá số khó." Người thuận lợi dễ ỷ lại; người đối mặt thách thức sớm lại rèn được bản lĩnh và sức bền tinh thần vượt trội. Như kim cương chỉ sáng sau khi trải qua áp lực, con người cũng trưởng thành nhất sau nghịch cảnh.</p>

    <p class="pdf-paragraph">Hãy đọc phần dưới đây không phải để sung sướng hay lo lắng — mà để <strong>hiểu</strong> và <strong>chuẩn bị</strong>.</p>

    <div class="pdf-traits-grid">
        <div class="pdf-traits-column pdf-traits-column--positive">
            <div class="pdf-traits-column-title">Điểm Mạnh Nổi Bật</div>
            ${strengthItems}
        </div>
        <div class="pdf-traits-column pdf-traits-column--challenge">
            <div class="pdf-traits-column-title">Thử Thách Cần Lưu Ý</div>
            ${challengeItems}
        </div>
    </div>

    ${generateTraitsProseExpansion()}

    <div class="pdf-pullquote">"Biết mình là khởi đầu. Chấp nhận mình là sức mạnh. Phát triển mình là hành trình suốt đời — và hành trình đó bắt đầu ngay lúc này."</div>
</div>`;
}


// ── Life Area Chapter ─────────────────────────────────────────

// ── Life Area Chapter ─────────────────────────────────────────
export function generateLifeAreaChapter(result: NarrativeResult, areaIndex: number, chartType: string = 'tuvi'): string {
    const la = result.lifeAreas[areaIndex];
    const chapterNum = areaIndex + 4;
    const emoji = CHAPTER_EMOJI[la.area] || '📖';

    // ── System-specific classical reference pools ──
    const SYSTEM_REFS: Record<string, { sources: string[]; traditions: string[]; positiveNeg: string[] }> = {
        tuvi: {
            sources: [
                'Theo sách "Tử Vi Đẩu Số Toàn Thư" (紫微斗數全書) — bộ kinh điển nền tảng của môn Tử Vi Đẩu Số',
                'Theo "Thái Vi Phú" (太微賦) — bí truyền của các bậc thầy Tử Vi cổ đại',
                'Theo sách "Hình Tính Phú" (形性賦) và truyền thống luận đoán Tử Vi chính tông',
                'Theo "Tử Vi Đẩu Số Tiên Cơ" (紫微斗數先機) của Trần Đoàn lão tổ',
                'Theo phương pháp "Tử Vi Phi Tinh" kết hợp trường phái Tam Hợp và Tứ Hóa',
                'Theo "Tử Vi Kinh Nghiệm Đàm" (紫微經驗談) — kinh nghiệm thực chứng qua nhiều thế hệ',
            ],
            traditions: [
                'Truyền thống Tử Vi Đẩu Số dạy rằng mỗi cung vị đều có CẢ mặt CÁT (tốt) LẪN mặt HUNG (xấu), tùy thuộc vào độ sáng của sao, cung vị tọa thủ, và các sao kết hợp.',
                'Trong Tử Vi cổ truyền, nguyên lý "cát hung tương hỗ" (吉凶相互) chi phối mọi giải đoán — không có sao nào hoàn toàn tốt, không có cung nào hoàn toàn xấu.',
                'Sách cổ ghi: "Đẩu Số chi đạo, tại hồ biến thông" (斗數之道在乎變通 — Đạo của Đẩu Số nằm ở sự linh hoạt) — mỗi lá số cần được đọc trong bối cảnh tổng thể.',
            ],
            positiveNeg: [
                'Biểu hiện tích cực (cát): khi năng lượng này được phát huy đúng cách, bạn sẽ thấy %POSITIVE%. Biểu hiện tiêu cực (hung): nếu mất cân bằng hoặc bị giao hội sát tinh, xu hướng %NEGATIVE% có thể xuất hiện — đây là lúc cần cảnh giác và điều chỉnh.',
                'Khi năng lượng này ở trạng thái THUẬN (cát), biểu hiện tích cực bao gồm: %POSITIVE%. Khi ở trạng thái NGHỊCH (hung), cần lưu ý biểu hiện tiêu cực: %NEGATIVE%. Sách "Thái Vi Phú" ghi: "Cát đa bất như cát ý, hung đa bất như hung chân" — nhiều cát không bằng cát có ý nghĩa, nhiều hung không bằng hung thật sự.',
            ],
        },
        chiemtinh: {
            sources: [
                'Theo "Tetrabiblos" (Τετράβιβλος) của Claudius Ptolemy — tác phẩm nền tảng 2000 năm tuổi của chiêm tinh phương Tây',
                'Theo "The Inner Sky" của Steven Forrest và trường phái chiêm tinh tiến hóa (Evolutionary Astrology)',
                'Theo phương pháp của Dane Rudhyar trong "The Astrology of Personality" — cầu nối giữa chiêm tinh và tâm lý học phân tích',
                'Theo sách "Astrology, Psychology and the Four Elements" của Stephen Arroyo — hệ thống năng lượng nguyên tố',
                'Theo truyền thống chiêm tinh Hellenistic kết hợp với tâm lý chiều sâu (depth psychology) của Jung',
                'Theo "The Twelve Houses" của Howard Sasportas — bậc thầy giải đoán cung nhà hiện đại',
            ],
            traditions: [
                'Trong chiêm tinh phương Tây, nguyên lý "essential dignities" (phẩm giá bản chất) quyết định: hành tinh ở cung nào sẽ biểu hiện TÍCH CỰC (domicile, exaltation) hay gặp THỬ THÁCH (detriment, fall).',
                'Ptolemy dạy trong Tetrabiblos: "Các vì sao tạo KHUYNH HƯỚNG, không tạo KẾT QUẢ" (Astra inclinant, non necessitant) — đây là kim chỉ nam cho mọi giải đoán.',
                'Trường phái chiêm tinh tiến hóa nhấn mạnh: mỗi vị trí hành tinh đều là BÀI HỌC, không phải BẢN ÁN. Bạn sinh ra với cấu trúc này để PHÁT TRIỂN, không phải để bị giới hạn.',
            ],
            positiveNeg: [
                'Biểu hiện tích cực (khi năng lượng hành tinh được phát huy tốt): %POSITIVE%. Biểu hiện thử thách (shadow side — mặt bóng tối theo Jung): %NEGATIVE% — đây không phải "xấu" mà là vùng cần phát triển ý thức.',
                'Mặt sáng (light expression): %POSITIVE%. Mặt tối (shadow expression): %NEGATIVE%. Steven Forrest gọi đây là "evolutionary intention" — mục đích tiến hóa: bạn sinh ra với cấu trúc này để học cách chuyển hóa mặt tối thành mặt sáng.',
            ],
        },
        numerology: {
            sources: [
                'Theo truyền thống Pythagoras — nhà toán học-triết gia Hy Lạp cổ đại, người sáng lập hệ thống Thần Số Học',
                'Theo sách "The Life You Were Born to Live" của Dan Millman — hệ thống Thần Số Học ứng dụng hiện đại',
                'Theo "Numerology and the Divine Triangle" của Faith Javane và Dusty Bunker — tác phẩm kinh điển về ý nghĩa các con số',
                'Theo phương pháp Chaldean kết hợp với hệ Pythagorean — hai trường phái lâu đời nhất của Thần Số Học',
                'Theo "The Secret Science of Numerology" của Shirley Blackwell Lawrence — hệ thống ý nghĩa rung động (vibration meaning)',
                'Theo nghiên cứu của Hans Decoz trong "Numerology: Key To Your Inner Self" — hệ thống giải đoán chi tiết nhất',
            ],
            traditions: [
                'Pythagoras dạy: "Vạn vật đều là số" (πάντα ἀριθμός ἐστίν). Mỗi con số mang một RUNG ĐỘNG (vibration) riêng ảnh hưởng đến tính cách, sự nghiệp, tình yêu, và sức khỏe.',
                'Trong Thần Số Học, không có con số "tốt" hay "xấu" — chỉ có con số được HIỂU ĐÚNG hoặc HIỂU SAI. Mỗi rung động số đều chứa CẢ tiềm năng tích cực LẪN thách thức cần vượt qua.',
                'Truyền thống Kabbalah (Do Thái huyền bí) và Pythagoras đều đồng ý: con số sinh ra cùng bạn là "bản mã vũ trụ" — chứa đựng kế hoạch phát triển linh hồn trong kiếp sống này.',
            ],
            positiveNeg: [
                'Biểu hiện tích cực của rung động số này: %POSITIVE%. Biểu hiện thử thách (khi rung động bị mất cân bằng): %NEGATIVE% — Dan Millman gọi đây là "life purpose challenge" (thử thách mục đích cuộc đời).',
                'Khi rung động số này ở trạng thái CÂN BẰNG, biểu hiện tích cực: %POSITIVE%. Khi ở trạng thái MẤT CÂN BẰNG: %NEGATIVE%. Pythagoras dạy: "Hài hòa là mục đích tối cao" — biết mình đang mất cân bằng ở đâu là bước đầu tiên để tìm lại hài hòa.',
            ],
        },
    };

    const _sysRef = SYSTEM_REFS[chartType] || SYSTEM_REFS['tuvi'];

    // ── System-specific chapter intros — unique per life area × system ──
    const AREA_INTROS: Record<string, Record<string, string>> = {
        tuvi: {
            personality: `Cung Mệnh và cung Thân quyết định bản chất con người bạn — "bạn thật sự" bên trong và hình ảnh bạn thể hiện ra ngoài. Khi chính tinh sáng sủa, tính cách mạnh mẽ, tự tin. Khi gặp sao hãm hoặc sát tinh, dễ dao động và cố chấp. Người xưa dạy: <em>"Mệnh chi sở tại, thị vi nhất thân chi chủ"</em> — cung Mệnh là chủ nhân toàn bộ bản thân.`,
            career: `Cung Quan Lộc chi phối con đường sự nghiệp, phong cách làm việc và khả năng thăng tiến. Khi cung thuận lợi: hanh thông, được quý nhân phò trợ. Khi bất lợi: trắc trở, xung đột hoặc chọn sai hướng. <em>"Chọn đúng nghề phù hợp bản mệnh, một giờ nỗ lực bằng mười giờ chèo ngược dòng."</em>`,
            love: `Cung Phu Thê phản ánh mô hình tình cảm bẩm sinh — cách bạn bị thu hút, cách yêu, và cách xử lý xung đột. Thuận lợi: tình cảm êm đẹp, gặp đúng người. Bất lợi: duyên phận trắc trở, kỳ vọng không thực tế. <em>"Thuận vợ thuận chồng, tát biển Đông cũng cạn."</em>`,
            health: `Cung Tật Ách phản ánh thể chất và bệnh tật tiềm ẩn. Mỗi hành (Kim, Mộc, Thủy, Hỏa, Thổ) tương ứng với hệ cơ quan cụ thể. Thuận lợi: sức khỏe bền bỉ, phục hồi nhanh. Bất lợi: dễ mắc bệnh liên quan đến hành bất lợi, stress ảnh hưởng thể chất.`,
            growth: `Cung Phúc Đức phản ánh đời sống tinh thần và phúc đức tổ tiên. Thuận lợi: tinh thần phong phú, trực giác mạnh, phúc đức truyền đời. Bất lợi: bất an tinh thần, khó tìm ý nghĩa cuộc sống. <em>"Tu nhân tích đức"</em> — phúc đức không tự đến, cần vun đắp mỗi ngày.`,
        },
        chiemtinh: {
            personality: `Vị trí Mặt Trời và Cung Mệnh (Ascendant) quyết định hai tầng tính cách: "bạn bên ngoài" và "bạn bên trong." Mặt sáng: tự tin, sáng tạo, bản lĩnh. Mặt tối: cố chấp, kiêu ngạo, hoặc mất kết nối với bản thân. Mỗi vị trí hành tinh đều là bài học, không phải bản án.`,
            career: `Đỉnh Thiên Đỉnh (MC) và vị trí Sao Hỏa, Sao Thổ chi phối con đường sự nghiệp. Thuận lợi: tìm đúng thiên chức, thành tựu tự nhiên. Bất lợi: chọn nghề theo kỳ vọng gia đình thay vì bản thân, kiệt sức vì đi sai hướng. <em>"Có chí thì nên."</em>`,
            love: `Sao Kim (Venus) phản ánh cách bạn yêu, Sao Hỏa (Mars) phản ánh cách bạn khao khát. Thuận lợi: tình yêu trưởng thành, gắn kết sâu sắc. Bất lợi: đòi hỏi đối phương mang lại những gì chính mình thiếu, thay vì tự phát triển.`,
            health: `Mỗi cung hoàng đạo cai quản một vùng cơ thể: Bạch Dương → đầu, Kim Ngưu → cổ, Song Tử → phổi, Cự Giải → dạ dày, Sư Tử → tim, Xử Nữ → ruột, Thiên Bình → thận, Bọ Cạp → sinh dục, Nhân Mã → đùi, Ma Kết → xương, Bảo Bình → tuần hoàn, Song Ngư → bạch huyết. Sống thuận năng lượng thì khỏe, ngược lại dễ phát bệnh.`,
            growth: `Nhà 12 trong bản đồ sao phản ánh hành trình phát triển tâm linh. Thuận lợi: kết nối sâu với trực giác, bình an nội tâm. Bất lợi: trốn chạy thực tại, mơ mộng thiếu hành động. <em>"Tâm an vạn sự an."</em>`,
        },
        numerology: {
            personality: `Số Đường Đời là "bản thiết kế chính" cho cuộc đời bạn — mỗi số mang năng lượng riêng ảnh hưởng đến tính cách và hành vi. Cân bằng: tự tin, sáng tạo, hiện thực hóa tiềm năng. Mất cân bằng: bám víu mô hình cũ, kháng cự thay đổi.`,
            career: `Số Đường Đời kết hợp Số Biểu Đạt cho thấy con đường sự nghiệp phù hợp nhất. Thuận lợi: công việc mang lại niềm vui, thành công tự nhiên. Bất lợi: chọn nghề theo tiền thay vì đam mê, trống rỗng dù thành đạt. <em>"Nhất nghệ tinh, nhất thân vinh."</em>`,
            love: `Số Linh Hồn phản ánh khao khát sâu xa nhất trong tình yêu — đôi khi chính bạn cũng chưa nhận ra. Thuận lợi: gặp đúng người cộng hưởng, tình yêu trưởng thành. Bất lợi: theo đuổi mô hình tình yêu sai lầm, lặp lại quan hệ không lành mạnh.`,
            health: `Sức khỏe phản ánh qua sự cân bằng năng lượng số trong bản đồ. Các số thiếu tương ứng với vùng năng lượng yếu — cần chú ý bảo vệ. Sống đúng với rung động bẩm sinh thì năng lượng dồi dào, ngược lại dễ kiệt sức.`,
            growth: `Số Trưởng Thành phản ánh hành trình phát triển tâm linh — thường rõ nét sau tuổi 40. Thuận lợi: bình an nội tâm, kết nối sâu với mục đích cuộc đời. Bất lợi: khủng hoảng ý nghĩa, mất phương hướng. <em>"Biết đủ thì đủ, đợi đủ bao giờ đủ."</em>`,
        },
    };

    const sysIntros = AREA_INTROS[chartType] || AREA_INTROS['tuvi'];

    // ── Varied bridge texts — short, warm, Vietnamese-native ──
    const bridges1 = BRIDGE_CONTEXT_VARIANTS;
    const bridges2 = BRIDGE_DUALITY_VARIANTS;
    const tipBridges = BRIDGE_ACTION_VARIANTS;

    // Pick intro based on life area using system-specific intros
    const intro = sysIntros[la.area]
        || `Chương này khám phá một trong những khía cạnh quan trọng nhất trong bản đồ năng lượng của bạn. Mỗi phân tích bao gồm: biểu hiện thực tế, giải nghĩa, mặt sáng và mặt tối, cùng lời khuyên cụ thể. Hãy giữ trong tâm trí bức tranh tổng thể khi đọc.`;

    const etc = la.paragraphs.map((para, i) => {
        const allEffects = para.effectParagraphs.map(ep => esc(ep)).join(' ');
        const b1 = bridges1[i % bridges1.length];
        const b2 = bridges2[i % bridges2.length];
        const tb = tipBridges[i % tipBridges.length];

        // Add insight box every 2nd paragraph for visual variety
        const insightBox = (i % 2 === 1 && para.tip)
            ? `<div class="pdf-insight-box"><span class="pdf-insight-icon">🔑</span><span class="pdf-insight-text">${esc(para.tip)}</span></div>`
            : '';

        return `
<div class="pdf-section">
    <p class="pdf-paragraph">${esc(para.hook)} ${allEffects} ${b1}</p>
    <p class="pdf-paragraph">${esc(para.nuance)} ${b2} ${esc(para.cause)}</p>
    <p class="pdf-paragraph">${esc(para.tip)} ${tb}</p>
    ${insightBox}
</div>
${i < la.paragraphs.length - 1 ? '<div class="pdf-divider">· · ·</div>' : ''}`;
    }).join('');

    const influences = la.keyInfluences.length > 0
        ? `<div class="pdf-section">
            <h3 class="pdf-section-title">Yếu Tố Ảnh Hưởng — Giải Mã Nguồn Gốc</h3>
            <p class="pdf-paragraph">Các yếu tố chính ảnh hưởng đến lĩnh vực này: <span class="pdf-influences">${la.keyInfluences.map(inf => `<span class="pdf-influence-tag" title="${esc(inf.description)}">${esc(inf.name)}</span>`).join('')}</span>. Mỗi yếu tố mang một tầng ý nghĩa riêng, và sự tương tác giữa chúng tạo nên bức tranh phức tạp. Đừng xem riêng từng yếu tố — hãy nhìn bức tranh tổng thể.</p>
          </div>`
        : '';

    // Map life areas to accent color CSS classes
    const areaColorMap: Record<string, string> = {
        'Tính cách': 'pdf-area-personality',
        'Nhân cách': 'pdf-area-personality',
        'Tình cảm': 'pdf-area-love',
        'Gia đình': 'pdf-area-love',
        'Sự nghiệp': 'pdf-area-career',
        'Tài lộc': 'pdf-area-career',
        'Sức khỏe': 'pdf-area-health',
        'Phát triển': 'pdf-area-growth',
        'Học vấn': 'pdf-area-growth',
    };
    const areaClass = areaColorMap[la.area] || areaColorMap[la.title] || '';

    return `
<div class="pdf-chapter ${areaClass}">
    <div class="pdf-chapter-header pdf-chapter-header--full">
        <span class="pdf-chapter-emoji">${emoji}</span>
        <span class="pdf-chapter-number">Chương ${chapterNum}</span>
        <h2 class="pdf-chapter-title">${esc(la.title)}</h2>
        <p class="pdf-chapter-subtitle">${esc(la.subtitle)}</p>
    </div>

    <p class="pdf-paragraph">${intro}</p>

    ${etc}
    ${influences}
    ${generateLifeAreaSummary(la.title)}
</div>`;
}



// ── Yearly Outlook Chapter ────────────────────────────────────

// ── Yearly Outlook Chapter ────────────────────────────────────
export function generateYearlyOutlookChapter(result: NarrativeResult): string {
    const chapterNum = result.lifeAreas.length + 4;
    const ol = result.yearlyOutlook;
    const themes = ol.keyThemes
        .map(t => `<span class="pdf-outlook-theme">${esc(t)}</span>`)
        .join('');

    return `
<div class="pdf-chapter pdf-outlook">
    <div class="pdf-chapter-header">
        <span class="pdf-chapter-number">Chương ${chapterNum}</span>
        <h2 class="pdf-chapter-title">${esc(ol.title)}</h2>
        <p class="pdf-chapter-subtitle">Bức tranh năng lượng và chiến lược cho năm ${ol.year}</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Xu Hướng Tổng Quan</h3>
        <p class="pdf-paragraph">${esc(ol.summary)}</p>
        <p class="pdf-paragraph">Năm ${ol.year} đặt ra những câu hỏi quan trọng: Bạn muốn trở thành ai? Bạn sẵn sàng buông bỏ điều gì? Bạn muốn xây dựng điều gì mới? Người xưa dạy: <em>"Thiên thời, địa lợi, nhân hòa"</em> — biết nhận ra thời cơ và tận dụng đúng lúc sẽ đạt kết quả vượt mong đợi.</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Chủ Đề Năng Lượng Chính</h3>
        <p class="pdf-paragraph pdf-paragraph--no-indent">Các chủ đề chính chi phối năm ${ol.year}: <span class="pdf-outlook-themes">${themes}</span>. Những chủ đề này không phải sự kiện cụ thể — mà là "dòng sông ngầm" chi phối bầu không khí tổng thể. Bạn sẽ cảm nhận chúng qua các tình huống và cơ hội lặp lại theo mô hình tương tự.</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Lời Khuyên Chiến Lược</h3>
        <p class="pdf-paragraph">${esc(ol.advice)}</p>
    </div>

    ${generateExpandedYearlyOutlook(result)}

    <div class="pdf-pullquote">"Mỗi năm là một chương mới — và bạn là tác giả. Viết nó xứng đáng với tiềm năng mà bản đồ sao đã trao cho bạn."</div>
</div>`;
}


// ── Closing Chapter ───────────────────────────────────────────

// ── Closing Chapter ───────────────────────────────────────────
export function generateClosingChapter(result: NarrativeResult): string {
    const chapterNum = result.lifeAreas.length + 5;
    const meditationParas = result.closingMeditation
        .split('\n\n')
        .map(p => `<p>${esc(p)}</p>`)
        .join('');

    return `
<div class="pdf-chapter pdf-meditation">
    <div class="pdf-chapter-header">
        <span class="pdf-chapter-number">Chương ${chapterNum}</span>
        <h2 class="pdf-chapter-title">Thiền Định & Suy Ngẫm</h2>
        <p class="pdf-chapter-subtitle">Một khoảnh khắc tĩnh lặng dành riêng cho bạn</p>
    </div>

    <p class="pdf-paragraph">Trước khi kết thúc, hãy dừng lại một chút. Đặt xuống mọi suy nghĩ phân tích, mọi đánh giá đúng-sai, và hiện diện với chính mình trong giây phút này. Bạn đã dành thời gian tìm hiểu về bản thân — giờ hãy dành thêm vài phút để <strong>cảm nhận</strong>, không phải bằng trí tuệ, mà bằng trái tim.</p>

    <div class="pdf-meditation-body">
        ${meditationParas}
    </div>

    <div class="pdf-divider">✦ ✦ ✦</div>

    ${generateExpandedClosing(result)}
</div>`;
}


// ── Appendix ──────────────────────────────────────────────────

export function generateAppendix(result: NarrativeResult, chartType: string): string {
    const _chapterNum = result.lifeAreas.length + 6;

    return `
<div class="pdf-chapter pdf-appendix">
    <div class="pdf-chapter-header">
        <span class="pdf-chapter-number">Phụ Lục</span>
        <h2 class="pdf-chapter-title">Thuật Ngữ & Phương Pháp Luận</h2>
        <p class="pdf-chapter-subtitle">Giải thích các thuật ngữ chuyên môn và phương pháp phân tích</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Bảng Thuật Ngữ</h3>
        <p class="pdf-paragraph pdf-paragraph--no-indent">Dưới đây là giải thích chi tiết các thuật ngữ chuyên môn được sử dụng xuyên suốt bản phân tích này. Hiểu rõ các thuật ngữ giúp bạn nắm bắt ý nghĩa sâu sắc hơn của mỗi phân tích, và cũng là nền tảng nếu bạn muốn tìm hiểu thêm về hệ thống ${chartType === 'tuvi' ? 'Tử Vi Đẩu Số' : 'Chiêm Tinh Phương Tây'} trong tương lai.</p>
    </div>
    ${generateExpandedAppendixTerms(chartType)}

    ${generateMethodologySection(chartType)}

    <div class="pdf-divider">✦ ✦ ✦</div>
    <p class="pdf-paragraph" style="text-align:center;font-style:italic;color:#888">
        Báo cáo được tạo tự động bởi Lịch Việt — lichviet.app
    </p>
</div>`;
}
