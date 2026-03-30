/**
 * PDF Prose Helpers — Extended text generators for text-dense academic PDF
 *
 * Provides rich paragraph content for each chapter, turning the existing
 * NarrativeResult data into 60-70 pages of flowing prose.
 */

import type { NarrativeResult } from '../interpretation/types';
import { esc } from './pdfStyles';

// ── Introduction Expansion ────────────────────────────────────

// ── Introduction Expansion ────────────────────────────────────
export function generateExpandedIntroSections(result: NarrativeResult, chartType: string): string {
    const systemLabel = chartType === 'tuvi' ? 'Tử Vi Đẩu Số' : chartType === 'numerology' ? 'Thần Số Học' : 'Chiêm Tinh Phương Tây';
    const tradition = chartType === 'tuvi' ? 'Đông Phương' : chartType === 'numerology' ? 'Phương Tây & Cổ Đại' : 'Tây Phương';

    const systemDetail = chartType === 'tuvi'
        ? '<p class="pdf-paragraph">Tử Vi sử dụng 14 Chính Tinh và hàng trăm Phụ Tinh, phân bổ trên 12 cung vị. Sự tương tác giữa các sao — đồng cung, tam hợp, lục xung, Tứ Hóa — tạo nên bức tranh toàn cảnh chi tiết. Mỗi lá số đều hoàn toàn độc nhất — ngay cả hai người sinh cùng giờ cùng ngày nhưng khác giới tính cũng có lá số khác biệt.</p>'
        : chartType === 'numerology'
            ? '<p class="pdf-paragraph">Mỗi con số từ 1 đến 9 (và các số chủ 11, 22, 33) mang rung động năng lượng riêng, ảnh hưởng đến tính cách và vận mệnh. Số Đường Đời cho thấy sứ mệnh, Số Biểu Đạt cho thấy tài năng bẩm sinh, Số Linh Hồn phản ánh khao khát sâu xa nhất. Thần Số Học là cách nhanh nhất để nhận ra "mã nguồn" cuộc đời, chỉ từ tên và ngày sinh.</p>'
            : '<p class="pdf-paragraph">Bản đồ sao sử dụng vị trí chính xác của Mặt Trời, Mặt Trăng, và các hành tinh: Sao Thủy (trí tuệ), Sao Kim (tình yêu), Sao Hỏa (hành động), Sao Mộc (mở rộng), Sao Thổ (kỷ luật), Thiên Vương (cách mạng), Hải Vương (tâm linh), Dinh Vương (chuyển hóa). Chiêm tinh đặc biệt mạnh trong phân tích tâm lý — giải thích cách bạn yêu, điều bạn sợ, và điều bạn khao khát.</p>';

    return `
    <div class="pdf-section">
        <h3 class="pdf-section-title">Tổng Quan Về Hệ Thống ${systemLabel}</h3>
        <p class="pdf-paragraph">${systemLabel} là một trong những hệ thống phân tích vận mệnh lâu đời nhất của truyền thống ${tradition}. Qua hàng ngàn năm phát triển, hệ thống này đã được hoàn thiện không ngừng, xây dựng trên nền tảng toán học thiên văn chính xác kết hợp hệ thống biểu tượng phong phú.</p>
        ${systemDetail}
        <p class="pdf-paragraph">Bản phân tích này không phải lời tiên tri về tương lai. Nó là <strong>tấm bản đồ</strong> cho thấy địa hình năng lượng bạn sở hữu — vùng thuận lợi, thách thức cần vượt, và con đường phát triển phù hợp. Bạn luôn là người quyết định cách sử dụng tấm bản đồ này.</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Cách Đọc Bản Phân Tích</h3>
        <p class="pdf-paragraph">Theo phương pháp ETC (Effects Then Causes) — phương pháp trình bày hiệu quả nhất dựa trên nghiên cứu tâm lý học nhận thức — bản phân tích này trình bày biểu hiện và tác động TRƯỚC, giải thích nguyên nhân chiêm tinh SAU. Phương pháp này tạo ra hiệu ứng "tự nhận dạng" (self-recognition): bạn đọc mô tả và ngay lập tức cảm thấy "đúng là mình!" TRƯỚC KHI biết tại sao bản đồ sao lại phản ánh điều đó. Theo kinh nghiệm, cách tiếp cận này giúp người đọc tiếp nhận thông tin sâu hơn và ghi nhớ lâu hơn gấp bội so với phương pháp trình bày truyền thống.</p>
        <p class="pdf-paragraph">Bản phân tích chia thành nhiều chương, mỗi chương tập trung vào một khía cạnh cụ thể. Tôi khuyến khích bạn đọc ít nhất Chương I (Giới thiệu) và Chương II (Hồ sơ nguyên mẫu) trước khi đi sâu — vì hai chương này là NỀN TẢNG để hiểu mọi phân tích tiếp theo. Trong quá trình đọc, bạn sẽ gặp các mức phân tích: "Biểu hiện" → "Sắc thái" → "Nguyên nhân" → "Lời khuyên." Hãy dành thời gian suy ngẫm với từng phần — nhiều hiểu biết sâu sắc nhất KHÔNG ĐẾN khi đọc lần đầu, mà khi bạn gấp sách lại và chiêm nghiệm trong im lặng.</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Triết Lý — "Biết Mình Để Sống Đúng"</h3>
        <p class="pdf-paragraph">Bản phân tích được xây dựng trên triết lý <em>"Biết mình để sống đúng"</em> — kết hợp trí tuệ Đông phương ("Tri mệnh giả bất oán thiên" — người hiểu mệnh không oán trời) với triết lý tâm lý học hiện đại. Mỗi đặc điểm đều có hai mặt: kiên định ↔ cố chấp, nhạy cảm ↔ dễ tổn thương, tham vọng ↔ ám ảnh. Bài học quý giá nhất: nhận biết khi nào bạn ở mặt sáng và khi nào trượt sang mặt tối của cùng một phẩm chất.</p>
        <p class="pdf-paragraph">Tôi cũng tin rằng không có lá số nào — hay biểu đồ số nào — là "tốt" hay "xấu" TUYỆT ĐỐI. Mỗi cấu trúc năng lượng đều mang theo "món quà" riêng và "bài học" riêng. Người có lá số thuận lợi chưa chắc đã hạnh phúc hơn người có lá số thách thức — vì chính những thử thách mới là LÒ LUYỆN tạo ra sự trưởng thành sâu sắc nhất. Điều quyết định thành bại cuối cùng là MỨC ĐỘ NHẬN THỨC — và đó chính là mục đích tối thượng mà bản phân tích này hướng tới.</p>
    </div>`;
}


// ── Archetype Expansion ───────────────────────────────────────

// ── Archetype Expansion ───────────────────────────────────────
export function generateExpandedArchetypeSections(result: NarrativeResult): string {
    const arch = result.archetype;
    const traits = result.definingTraits;

    return `
    <div class="pdf-section">
        <h3 class="pdf-section-title">Hồ Sơ Tính Cách Chi Tiết — Dưới Góc Nhìn Chuyên Gia</h3>
        <p class="pdf-paragraph">${esc(arch.description)}</p>
        <p class="pdf-paragraph">Nguyên mẫu "${esc(arch.name)}" không chỉ mô tả bạn đang là ai, mà còn cho thấy bạn có thể trở thành ai khi sống đúng với năng lượng bẩm sinh. Người mang nguyên mẫu này thường hướng tới mục tiêu lớn, không hài lòng với sự tầm thường. Đây vừa là món quà (tạo động lực nội tại) vừa là thách thức (dễ bất mãn khi thực tế không đáp ứng kỳ vọng).</p>
        <p class="pdf-paragraph">Trong các mối quan hệ, người mang nguyên mẫu "${esc(arch.name)}" thường được nhìn nhận như một người có chiều sâu, đáng tin cậy nhưng đôi khi khó hiểu. Bạn có khả năng tạo kết nối sâu sắc, nhưng cũng cần không gian riêng để "nạp lại năng lượng." Sách "The Inner Sky" của Steven Forrest — một trong những tác phẩm chiêm tinh hiện đại ý nghĩa nhất — dạy: "Bản đồ sao tốt nhất không phải bản dễ, mà là bản khiến bạn SỐNG." Ng uyên mẫu của bạn khiến bạn sống MÃNH LIỆT — và đó là món quà lớn nhất.</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Nguyên Tố Chủ Đạo — ${esc(arch.element)}</h3>
        <p class="pdf-paragraph">Theo cả hai truyền thống Đông và Tây — Ngũ Hành (Kim Mộc Thủy Hỏa Thổ) của phương Đông và Tứ Đại (Đất Nước Lửa Gió) của phương Tây — nguyên tố ${esc(arch.element)} là năng lượng nền tảng trong bản đồ của bạn, ảnh hưởng đến cách bạn tư duy, cảm nhận, hành động, và tương tác với thế giới. Mỗi nguyên tố mang theo một "nhịp điệu" riêng: có nguyên tố nhanh và nóng bỏng, có nguyên tố chậm và kiên nhẫn, có nguyên tố linh hoạt như nước và có nguyên tố vững chãi như đá. Hiểu nguyên tố chủ đạo giúp bạn nhận ra tại sao bạn phản ứng KHÁC với người khác trong cùng hoàn cảnh — và quan trọng hơn, giúp bạn LÀM CHỦ phản ứng đó thay vì bị nó chi phối.</p>
        <p class="pdf-paragraph">Với nguyên tố ${esc(arch.element)}, bạn có xu hướng tự nhiên tiếp cận cuộc sống từ góc độ ${traits.slice(0, 2).join(' và ').toLowerCase()}. Đây không phải điều bạn cần "cố gắng" — nó là bản chất tự nhiên, giống như nước tự nhiên chảy xuống thấp hay lửa tự nhiên bốc lên cao. Nhiệm vụ của bạn không phải thay đổi bản chất — mà là HIỂU nó, CHẤP NHẬN nó, và MÀI DŨA nó thành siêu năng lực. Tôi thường nói: "Đừng cố biến lửa thành nước — hãy tìm lò đúc phù hợp để lửa cháy rực rỡ nhất."</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Mô Hình Hành Vi Đặc Trưng — Nhận Diện "Kịch Bản Tự Động"</h3>
        <p class="pdf-paragraph">Theo nghiên cứu tâm lý học hành vi và kinh nghiệm giải đoán, dựa trên cấu trúc năng lượng của bạn, có thể nhận diện các mô hình hành vi đặc trưng${traits.length > 0 ? `: ${traits.map(t => esc(t)).join(', ')}` : ''}. Những mô hình này không phải lúc nào cũng biểu hiện rõ ràng — một số chỉ "kích hoạt" dưới áp lực, trong các mối quan hệ thân mật, hay khi đối mặt quyết định quan trọng. Nhà tâm lý Daniel Kahneman gọi đây là "thinking fast" (tư duy nhanh, tự động) ↔ "thinking slow" (tư duy chậm, có ý thức). Bản đồ sao cho thấy "thinking fast" mặc định của bạn — những phản ứng bạn thực hiện TRƯỚC KHI kịp suy nghĩ. Hiểu rõ "kịch bản tự động" này là bước đầu tiên để CHỌN phản ứng thay vì bị phản ứng chi phối.</p>
        <p class="pdf-paragraph">Trong môi trường làm việc, những đặc điểm này thể hiện qua phong cách lãnh đạo, cách xử lý xung đột, và cách tiếp cận vấn đề. Trong mối quan hệ cá nhân, chúng ảnh hưởng đến cách thể hiện tình cảm, cách giải quyết bất đồng, và cách xây dựng niềm tin. Theo triết lý mà cổ nhân dạy: "Tri kỷ tri bỉ, bách chiến bách thắng" (biết mình biết người, trăm trận trăm thắng) — hiểu rõ mô hình hành vi của mình là "biết mình", và hiểu mô hình của người khác (qua lá số của họ) là "biết người."</p>
    </div>`;
}


// ── Traits Expansion ──────────────────────────────────────────

// ── Traits Expansion ──────────────────────────────────────────
export function generateTraitsProseExpansion(): string {
    return `
    <div class="pdf-section">
        <h3 class="pdf-section-title">Phát Huy Điểm Mạnh — Chiến Lược Từ Người Thầy</h3>
        <p class="pdf-paragraph">Điểm mạnh bẩm sinh là "vũ khí" mạnh nhất bạn sở hữu, nhưng cần được mài dũa và sử dụng đúng. Một người có khả năng phân tích tốt nhưng không bao giờ được thử sức sẽ không bao giờ biết mình có năng lực phi thường — giống như đại bàng sinh ra trong chuồng gà, tưởng mình chỉ biết bới đất.</p>
        <p class="pdf-paragraph">Hãy chủ động tìm kiếm môi trường cho phép phát huy điểm mạnh bẩm sinh. Đây không phải ích kỷ — mà là chiến lược khôn ngoan nhất. Những người tập trung phát huy thế mạnh mỗi ngày có xu hướng gắn kết với công việc và hạnh phúc hơn nhiều so với những người cố sửa điểm yếu.</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Vượt Qua Thử Thách — Biến Đá Thành Vàng</h3>
        <p class="pdf-paragraph">Quá trình chuyển hóa nội tâm — biến điểm yếu thành điểm mạnh, biến đau thương thành trí tuệ, biến sợ hãi thành dũng cảm — là hiện tượng con người trở nên mạnh mẽ hơn, khôn ngoan hơn sau khi vượt qua thử thách. <em>"Ngọc bất trác, bất thành khí"</em> — ngọc không mài không thành đồ quý. Chính những thách thức mới tạo ra sự trưởng thành sâu sắc nhất.</p>
        <p class="pdf-paragraph">Chiến lược mà tôi khuyên: không phải cố LOẠI BỎ điểm yếu — mà là CHUYỂN HÓA nó. Sự cầu toàn quá mức → sự tỉ mỉ CÓ MỤC ĐÍCH; sự nhạy cảm → trực giác MẠNH MẼ; sự cứng đầu → sự kiên định KHÔNG LAY CHUYỂN; sự nóng nảy → sự quyết đoán NHANH NHƯ CHỚP. Chìa khóa nằm ở NHẬN THỨC — khi bạn biết mình đang "kích hoạt mặt tối" của một phẩm chất, bạn có thể CHỌN chuyển sang "mặt sáng" trước khi nó gây hậu quả.</p>
    </div>`;
}


// ── Life Area Expansion ───────────────────────────────────────

// ── Life Area Expansion ───────────────────────────────────────
export function generateLifeAreaSummary(title: string): string {
    return `
    <div class="pdf-section">
        <h3 class="pdf-section-title">Tổng Kết — ${esc(title)}</h3>
        <p class="pdf-paragraph">Lĩnh vực ${esc(title.toLowerCase())} cho thấy bức tranh đa chiều với cả thuận lợi và thách thức. Điều quan trọng nhất không phải "tốt hay xấu" — mà là mức độ nhận thức. Hiểu rõ bản đồ năng lượng giúp bạn quyết định sáng suốt hơn, tránh sai lầm có thể phòng ngừa, và tận dụng cơ hội phù hợp.</p>
        <p class="pdf-paragraph">Bản đồ chỉ cho thấy xu hướng — không phải kết quả. Bạn luôn có quyền lựa chọn cách phản ứng và xây dựng cuộc sống theo tầm nhìn riêng. Phân tích này là la bàn — bạn là thuyền trưởng.</p>
    </div>`;
}


// ── Yearly Outlook Expansion ──────────────────────────────────

// ── Yearly Outlook Expansion ──────────────────────────────────
export function generateExpandedYearlyOutlook(result: NarrativeResult): string {
    const year = result.yearlyOutlook.year;
    return `
    <div class="pdf-section">
        <h3 class="pdf-section-title">Phân Tích Theo Quý — Lịch Chiến Lược</h3>
        <p class="pdf-paragraph"><strong>Quý I (tháng 1-3) — "Gieo hạt":</strong> Theo nguyên lý "Xuân sinh" (mùa Xuân = khởi sinh) trong Ngũ Hành và "cardinal energy" (năng lượng khởi đầu) trong chiêm tinh phương Tây, đây là giai đoạn dành cho việc đặt mục tiêu, lập kế hoạch, và gieo những "hạt giống ý tưởng." Với nguyên mẫu "${esc(result.archetype.name)}", tôi khuyên bạn: tránh hành động vội vàng — thay vào đó, dành thời gian quan sát, nghiên cứu, và chuẩn bị kỹ lưỡng. Năng lượng đầu năm ủng hộ sự suy ngẫm và hoạch định HƠN là hành động mạnh mẽ.</p>
        <p class="pdf-paragraph"><strong>Quý II (tháng 4-6) — "Phát triển":</strong> Năng lượng bắt đầu tăng tốc. Theo kinh nghiệm, đây là giai đoạn "golden window" (cửa sổ vàng) — khi kế hoạch đã ươm mầm trong quý I giờ có thể triển khai mạnh mẽ. Thời điểm thuận lợi nhất cho việc mở rộng mạng lưới, khởi động dự án mới, và đầu tư vào phát triển bản thân. Với nguyên tố ${esc(result.archetype.element)}, lời khuyên: đừng để tham vọng vượt quá thực tế — tiến từng bước chắc chắn.</p>

        <p class="pdf-paragraph"><strong>Quý III (tháng 7-9) — "Thu hoạch sớm":</strong> Theo nguyên lý "Hạ trưởng" (mùa Hè = phát triển cực đại), đây thường là giai đoạn cao trào — khi nỗ lực trước đó cho kết quả. Tuy nhiên, cũng là lúc thách thức bất ngờ có thể xuất hiện, đòi hỏi sự linh hoạt và thích nghi. Sách "Đạo Đức Kinh" của Lão Tử dạy: "Khúc tắc toàn" — biết uốn cong thì mới bảo toàn được. Đừng bám vào kế hoạch quá cứng nhắc.</p>
        <p class="pdf-paragraph"><strong>Quý IV (tháng 10-12) — "Tổng kết & chuẩn bị":</strong> Theo nguyên lý "Thu liễm, Đông tàng" (mùa Thu = thu hoạch, mùa Đông = tích trữ), đây là thời điểm lý tưởng để tổng kết, cảm ơn bài học đã nhận, và bắt đầu suy nghĩ về hướng đi cho năm sau. Năng lượng cuối năm ủng hộ sự TRI ÂN và GIẢI PHÓNG — buông bỏ những gì không còn phục vụ bạn để tạo không gian cho cái mới.</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Chiến Lược Tổng Thể Năm ${year}</h3>
        <p class="pdf-paragraph">Đây là chiến lược tối ưu cho năm ${year}: <strong>Thứ nhất</strong>, đầu tư vào sức khỏe tinh thần — thiền định, viết nhật ký, hoặc bất kỳ hình thức tự phản ánh nào phù hợp. <em>"Ai nhìn vào trong thì tỉnh thức"</em>. <strong>Thứ hai</strong>, xây dựng mối quan hệ chất lượng — không phải nhiều, mà là sâu. <strong>Thứ ba</strong>, mạo hiểm có tính toán trong sự nghiệp và tài chính. <strong>Cuối cùng</strong>, dành thời gian cho phát triển cá nhân — đầu tư vào bản thân luôn mang lại lợi ích lớn.</p>
    </div>`;
}


// ── Closing Expansion ─────────────────────────────────────────

// ── Closing Expansion ─────────────────────────────────────────
export function generateExpandedClosing(result: NarrativeResult): string {
    return `
    <div class="pdf-section">
        <h3 class="pdf-section-title">Tóm Tắt</h3>
        <p class="pdf-paragraph">Qua toàn bộ bản phân tích: bạn mang nguyên mẫu "${esc(result.archetype.name)}" với nguyên tố ${esc(result.archetype.element)}, sở hữu những đặc điểm nổi bật: ${result.definingTraits.slice(0, 3).map(t => esc(t)).join(', ')}. Không ai trên đời có cùng tổ hợp năng lượng như bạn — đó vừa là trách nhiệm (sống xứng đáng với tiềm năng), vừa là tự do (không ai có quyền phán xét con đường của bạn). Hãy dùng bản phân tích này làm tấm gương soi — để tự hiểu và tự yêu thương sâu sắc hơn.</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Lời Khuyên Cuối Cùng</h3>
        <p class="pdf-paragraph">${esc(result.closingAdvice)}</p>
        <p class="pdf-paragraph">Tôi có một thói quen mà tôi khuyên tất cả khách hàng: hãy quay lại đọc bản phân tích này sau 3-6 tháng, khi bạn đã có thêm trải nghiệm và góc nhìn mới. Bạn sẽ ngạc nhiên khi phát hiện rằng những phần trước đây bạn gạt bỏ — "phần này không đúng!" — giờ lại trở nên rõ ràng đến đáng sợ. Bản đồ sao không thay đổi, nhưng SỰ HIỂU BIẾT của bạn về nó sẽ sâu sắc hơn theo thời gian — như rượu vang, càng để lâu càng ngấm. Đây là hành trình suốt đời — và mỗi lần quay lại đọc, bạn sẽ khám phá thêm một tầng ý nghĩa mới mà trước đây bạn chưa sẵn sàng tiếp nhận.</p>
    </div>`;
}


// ── Expanded Appendix ─────────────────────────────────────────

export function generateExpandedAppendixTerms(chartType: string): string {
    const baseTerms = chartType === 'tuvi'
        ? [
            { term: 'Tử Vi Đẩu Số', def: 'Hệ thống chiêm tinh Đông Phương sử dụng 14 chính tinh và hàng trăm phụ tinh để phân tích vận mệnh. Được cho là bắt nguồn từ thời Tống, phát triển mạnh tại Trung Quốc và Việt Nam qua nhiều trường phái khác nhau.' },
            { term: 'Cung Mệnh', def: 'Cung quan trọng nhất trong lá số, đại diện cho bản thân đương số — tính cách cốt lõi, tiềm năng bẩm sinh, và xu hướng vận mệnh tổng thể. Mọi phân tích đều bắt đầu từ cung Mệnh.' },
            { term: 'Miếu/Vượng', def: 'Trạng thái sáng nhất của một sao, cho thấy sao đang ở vị trí thuận lợi nhất, phát huy tối đa năng lượng tích cực. Sao ở trạng thái Miếu/Vượng mang lại những ảnh hưởng mạnh mẽ và tích cực.' },
            { term: 'Đắc/Bình', def: 'Trạng thái trung bình của sao — năng lượng ổn định, không quá mạnh không quá yếu. Sao ở trạng thái này cần sự hỗ trợ từ các sao khác để phát huy hết tiềm năng.' },
            { term: 'Hãm', def: 'Trạng thái tối của sao — năng lượng bị hạn chế hoặc biểu hiện theo chiều tiêu cực. Tuy nhiên, "hãm" không có nghĩa là xấu tuyệt đối — nó chỉ ra vùng năng lượng cần được quản lý khéo léo.' },
            { term: 'Tứ Hóa', def: 'Bốn biến hóa quan trọng nhất trong Tử Vi: Hóa Lộc (tài lộc, thuận lợi), Hóa Quyền (quyền lực, chủ động), Hóa Khoa (danh tiếng, học vấn), và Hóa Kỵ (trở ngại, bài học). Tứ Hóa là yếu tố động lực mạnh nhất trong phân tích.' },
            { term: 'Cách cục', def: 'Mô hình tổng hợp từ sự kết hợp các sao trong bản đồ — cho thấy xu hướng vận mệnh tổng thể và con đường phát triển phù hợp nhất. Mỗi cách cục mang ý nghĩa và đặc điểm riêng.' },
            { term: 'Tam Hợp', def: 'Ba cung cách nhau 120 độ trong bản đồ, tạo thành một tam giác năng lượng. Các cung tam hợp ảnh hưởng và hỗ trợ lẫn nhau, là yếu tố quan trọng trong phân tích tổng thể.' },
            { term: 'Đại Hạn', def: 'Chu kỳ vận hạn 10 năm, mỗi giai đoạn mang năng lượng của một cung khác nhau. Đại Hạn cho thấy xu hướng tổng thể của mỗi thập niên trong cuộc đời.' },
            { term: 'Lưu Niên', def: 'Vận hạn từng năm, được tính từ sự tương tác giữa lá số và năng lượng của năm hiện tại. Lưu Niên cho thông tin chi tiết về xu hướng của một năm cụ thể.' },
            { term: 'ETC', def: 'Effects Then Causes — phương pháp trình bày khoa học: mô tả tác động và biểu hiện trước, giải thích nguyên nhân chiêm tinh sau. Phương pháp này dựa trên nghiên cứu tâm lý học về hiệu quả tiếp nhận thông tin.' },
            { term: 'Nguyên Mẫu', def: 'Mô hình tính cách tổng hợp được xác định từ cấu trúc tổng thể của bản đồ sao. Dựa trên lý thuyết nguyên mẫu của Carl Jung, mỗi nguyên mẫu đại diện cho một mô hình năng lượng phổ quát.' },
            { term: 'Ngũ Hành', def: 'Năm nguyên tố cơ bản: Kim (Metal), Mộc (Wood), Thủy (Water), Hỏa (Fire), Thổ (Earth). Hệ thống tương sinh tương khắc giữa các hành là nền tảng của mọi phân tích phương Đông.' },
            { term: 'Thiên Can / Địa Chi', def: 'Hệ thống 10 Thiên Can và 12 Địa Chi tạo thành 60 tổ hợp Can Chi, gọi là Lục Thập Hoa Giáp. Đây là hệ thống đếm thời gian nền tảng của chiêm tinh Đông Phương.' },
            { term: 'Chính Tinh', def: '14 sao chính trong Tử Vi Đẩu Số, bao gồm Tử Vi, Thiên Cơ, Thái Dương, Vũ Khúc, Thiên Đồng, Liêm Trinh, Thiên Phủ, Thái Âm, Tham Lang, Cự Môn, Thiên Tướng, Thiên Lương, Thất Sát, Phá Quân.' },
            { term: 'Phụ Tinh', def: 'Hàng trăm sao phụ trợ trong Tử Vi, bao gồm các nhóm: Lục sát (Kình, Đà, Không, Kiếp, Hỏa, Linh), Lục cát (Tả, Hữu, Xương, Khúc, Khôi, Việt), và nhiều sao khác. Phụ tinh bổ sung thêm chi tiết và sắc thái cho phân tích.' },
        ]
        : [
            { term: 'Chiêm Tinh Phương Tây', def: 'Hệ thống chiêm tinh dựa trên hoàng đạo nhiệt đới, 12 cung hoàng đạo, và vị trí các hành tinh tại thời điểm sinh. Có lịch sử hàng ngàn năm, bắt nguồn từ Mesopotamia cổ đại và phát triển qua Hy Lạp, La Mã, và thời Phục Hưng.' },
            { term: 'Mặt Trời (Sun)', def: 'Đại diện cho bản ngã cốt lõi, ý chí, và mục đích sống. Cung hoàng đạo của Mặt Trời là dấu hiệu chiêm tinh phổ biến nhất, nhưng chỉ là một phần nhỏ trong bức tranh toàn cảnh.' },
            { term: 'Mặt Trăng (Moon)', def: 'Đại diện cho cảm xúc, bản năng, thế giới nội tâm, và nhu cầu an toàn. Mặt Trăng cho thấy "bạn ở bên trong" — phần sâu kín mà đôi khi chỉ bạn và những người thân thiết nhất biết.' },
            { term: 'Sao Kim (Venus)', def: 'Đại diện cho tình yêu, thẩm mỹ, giá trị cá nhân, và cách bạn yêu thương. Venus cho thấy bạn bị thu hút bởi điều gì, cách bạn thể hiện tình cảm, và tiêu chuẩn của bạn trong các mối quan hệ.' },
            { term: 'Sao Hỏa (Mars)', def: 'Đại diện cho hành động, đam mê, cách bạn theo đuổi mục tiêu và xử lý xung đột. Mars cho thấy năng lượng "chiến đấu" của bạn — không nhất thiết là bạo lực, mà là sự quyết tâm và động lực nội tại.' },
            { term: 'Sao Mộc (Jupiter)', def: 'Đại diện cho mở rộng, may mắn, triết học, và con đường phát triển. Jupiter cho thấy lĩnh vực mà bạn có xu hướng may mắn tự nhiên và tiềm năng phát triển lớn nhất.' },
            { term: 'Sao Thổ (Saturn)', def: 'Đại diện cho kỷ luật, trách nhiệm, giới hạn, và bài học cuộc sống. Saturn cho thấy những thách thức quan trọng nhất nhưng cũng là nguồn sức mạnh lớn nhất khi được vượt qua.' },
            { term: 'Ascendant (Mệnh Cung)', def: 'Cung hoàng đạo đang mọc ở chân trời phía Đông tại thời điểm sinh. Ascendant đại diện cho "bộ mặt" bạn thể hiện với thế giới, ấn tượng đầu tiên bạn tạo ra, và cách bạn tiếp cận cuộc sống.' },
            { term: 'Nhà Chiêm Tinh', def: '12 nhà chiêm tinh đại diện cho 12 lĩnh vực cuộc sống, từ bản thân (nhà 1) đến tiềm thức (nhà 12). Mỗi nhà cho thấy một "sân khấu" nơi năng lượng các hành tinh biểu hiện.' },
            { term: 'Aspects (Góc Chiếu)', def: 'Các góc hình thành giữa hai hành tinh trong bản đồ sao. Hợp (0°), vuông (90°), tam giác (120°), đối (180°), sextile (60°). Aspects cho thấy cách các năng lượng tương tác và ảnh hưởng lẫn nhau.' },
            { term: 'Domicile', def: 'Vị trí "nhà" của hành tinh — cung hoàng đạo mà hành tinh cai quản. Khi hành tinh ở Domicile, nó phát huy toàn bộ năng lượng tích cực một cách tự nhiên và mạnh mẽ nhất.' },
            { term: 'ETC', def: 'Effects Then Causes — phương pháp trình bày: kết quả trước, nguyên nhân sau. Phương pháp này tạo sự tò mò và giúp người đọc tiếp nhận thông tin hiệu quả hơn.' },
        ];

    return baseTerms
        .map(t => `
<dl class="pdf-appendix-term">
    <dt>${esc(t.term)}</dt>
    <dd>${esc(t.def)}</dd>
</dl>`)
        .join('');
}

// ── Methodology ───────────────────────────────────────────────
export function generateMethodologySection(chartType: string): string {
    const systemName = chartType === 'tuvi' ? 'Tử Vi Đẩu Số' : chartType === 'numerology' ? 'Thần Số Học' : 'Chiêm Tinh Phương Tây';
    return `
    <div class="pdf-section">
        <h3 class="pdf-section-title">Phương Pháp Luận</h3>
        <p class="pdf-paragraph">Bản phân tích được tạo bởi hệ thống Lịch Việt, sử dụng thuật toán đa tầng dựa trên các nguyên lý cổ điển của ${systemName}. Quy trình: (1) Tính toán chính xác vị trí thiên thể/số học; (2) Xác định cấu trúc năng lượng; (3) Phát hiện nguyên mẫu; (4) Phân tích từng lĩnh vực; (5) Tổng hợp và trình bày.</p>
        <p class="pdf-paragraph">Bản phân tích tự động không thể thay thế hoàn toàn sự phân tích của chuyên gia — vì chuyên gia có khả năng nắm bắt sắc thái tinh tế và xem xét bối cảnh cá nhân. Hãy sử dụng bản này như điểm khởi đầu cho hành trình tự khám phá.</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Lưu Ý Quan Trọng</h3>
        <p class="pdf-paragraph">Bản phân tích mang tính chất tham khảo và soi chiếu bản thân. Mọi quyết định quan trọng nên dựa trên phân tích lý trí, tham khảo chuyên gia, và cân nhắc hoàn cảnh cụ thể. ${systemName} là hệ thống biểu tượng phong phú, giá trị cốt lõi là giúp bạn tự khám phá — không phải tiên đoán tương lai.</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Tài Liệu Tham Khảo Gợi Ý</h3>
        <p class="pdf-paragraph">Để tìm hiểu sâu hơn về ${systemName}, tôi khuyến khích bạn tham khảo: ${chartType === 'tuvi'
            ? '(1) "Tử Vi Đẩu Số Toàn Thư" — kinh điển gốc, nền tảng không thể thiếu; (2) "Tử Vi Chính Biện" — phân tích chuyên sâu đa trường phái; (3) "Tử Vi Tổng Hợp" của Nguyễn Phát Lộc — tổng hợp tinh hoa; (4) "Vân Trung Tử Tử Vi Đẩu Số" — phổ biến tại Việt Nam; (5) Các bài giảng của Liêm Trinh Cư Sĩ — chiều sâu thực hành.'
            : chartType === 'numerology'
                ? '(1) "The Complete Book of Numerology" của David Phillips; (2) "The Secret Science of Numerology" của Shirley Lawrence; (3) "Numerology and the Divine Triangle" của Faith Javane & Dusty Bunker; (4) "Glynis Has Your Number" của Glynis McCants — ứng dụng thực tiễn; (5) "The Life You Were Born to Live" của Dan Millman — Số Đường Đời chuyên sâu.'
                : '(1) "The Only Astrology Book You\'ll Ever Need" — nhập môn toàn diện; (2) "Chart Interpretation Handbook" của Stephen Arroyo — phân tích bản đồ sao; (3) "The Inner Sky" của Steven Forrest — chiêm tinh tiến hóa; (4) "Astrology, Psychology & the Four Elements" của Stephen Arroyo — kết nối với tâm lý học; (5) "Cosmos and Psyche" của Richard Tarnas — chiêm tinh và lịch sử văn hóa.'
        }</p>
    </div>`;
}

