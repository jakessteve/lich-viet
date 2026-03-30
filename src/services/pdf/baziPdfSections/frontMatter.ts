/**
 * Bazi PDF Sections — Front Matter (Cover, TOC, Introduction)
 */

import type { BaziChart } from '../../../types/bazi';
import type { PersonalityNarrative } from '../../bazi/baziInterpretation';
import { esc } from './shared';

// ── Cover Page ────────────────────────────────────────────────
export function generateBaziCover(chart: BaziChart, personality: PersonalityNarrative, userName: string): string {
  const date = new Date().toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' });
  const birthStr = chart.birthDate.toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' });
  return `
<div class="pdf-cover">
    <div class="pdf-cover-emoji">${personality.profile.imageEmoji}</div>
    <div class="pdf-cover-title">Bản Phân Tích Bát Tự</div>
    <div class="pdf-cover-subtitle">Tứ Trụ · Tử Bình · Cách Cục · Điều Hậu</div>
    <div class="pdf-cover-archetype">"${esc(personality.profile.archetype)}"</div>
    <div class="pdf-cover-element">Nhật Chủ ${esc(chart.dayMaster.dayMaster)} · ${esc(personality.profile.element)} · ${esc(chart.dayMaster.strengthLabel)}</div>
    <div class="pdf-cover-meta">
        ${userName ? `Phân tích cho: ${esc(userName)} · ` : ''}Sinh ngày ${birthStr}<br>
        Thời gian đọc: ~30 phút · Tạo ngày ${date}
    </div>
    <div class="pdf-cover-brand">Được tạo bởi Lịch Việt — lichviet.app</div>
</div>`;
}

// ── Table of Contents ─────────────────────────────────────────
export function generateBaziToc(chart: BaziChart): string {
  const chapters = [
    { num: 'I', title: 'Giới Thiệu Bát Tự' },
    { num: 'II', title: 'Tứ Trụ & Nhật Chủ' },
    { num: 'III', title: 'Ngũ Hành & Cách Cục' },
    { num: 'IV', title: 'Thập Thần — Mười Vị Thần' },
    { num: 'V', title: 'Tàng Can & Tương Tác Địa Chi' },
    { num: 'VI', title: 'Thần Sát — Sao Chiếu Mệnh' },
    { num: 'VII', title: 'Tính Cách & Mối Quan Hệ' },
    { num: 'VIII', title: 'Sự Nghiệp & Tài Lộc & Sức Khỏe' },
    { num: 'IX', title: 'Đại Vận — Dòng Chảy Vận Mệnh' },
    { num: 'X', title: 'Lời Khuyên Thực Hành' },
  ];
  if (chart.truongSinh && chart.truongSinh.length > 0) {
    chapters.push({ num: 'XI', title: 'Trường Sinh — 12 Giai Đoạn Sinh Mệnh' });
    chapters.push({ num: 'XII', title: 'Phụ Lục — Thuật Ngữ' });
  } else {
    chapters.push({ num: 'XI', title: 'Phụ Lục — Thuật Ngữ' });
  }
  const items = chapters
    .map(
      (ch) => `
<li class="pdf-toc-item">
    <span class="pdf-toc-item-number">${ch.num}</span>
    <span class="pdf-toc-item-title">${esc(ch.title)}</span>
    <span class="pdf-toc-item-dots"></span>
</li>`,
    )
    .join('');
  return `
<div class="pdf-toc">
    <div class="pdf-toc-title">Mục Lục</div>
    <ul class="pdf-toc-list">${items}</ul>
</div>`;
}

// ── Ch I: Introduction ────────────────────────────────────────
export function generateBaziIntroChapter(): string {
  return `
<div class="pdf-chapter">
    <div class="pdf-chapter-header">
        <span class="pdf-chapter-number">Chương I</span>
        <h2 class="pdf-chapter-title">Giới Thiệu Bát Tự</h2>
        <p class="pdf-chapter-subtitle">Bốn Trụ Định Mệnh — khoa học cổ đại về thời gian và năng lượng</p>
    </div>

    <p class="pdf-paragraph">Bát Tự (八字), hay còn gọi là Tứ Trụ, là một trong những hệ thống phân tích vận mệnh lâu đời nhất của phương Đông, có lịch sử phát triển trải dài hơn một nghìn năm. Tên gọi "Bát Tự" nghĩa đen là "tám chữ" — tám ký tự Can Chi đại diện cho bốn trụ thời gian: Năm, Tháng, Ngày, Giờ sinh. Mỗi trụ gồm một Thiên Can (trời) và một Địa Chi (đất), tạo thành bản đồ năng lượng vũ trụ tại khoảnh khắc bạn chào đời. Hệ thống này được cho là bắt nguồn từ thời nhà Đường (618-907), với sự đóng góp quan trọng của Lý Hư Trung, và sau đó được hoàn thiện bởi Từ Tử Bình vào thời nhà Tống (960-1279) — trường phái Tử Bình mà ngày nay là phương pháp phân tích chủ đạo.</p>

    <p class="pdf-paragraph">Khác với chiêm tinh phương Tây dựa trên vị trí hành tinh, Bát Tự dựa trên nguyên lý Ngũ Hành (Kim, Mộc, Thủy, Hỏa, Thổ) và sự tương sinh tương khắc giữa chúng. Ngũ Hành không phải là năm nguyên tố vật chất — mà là năm dạng năng lượng cơ bản, năm mô hình vận động của vũ trụ. Kim đại diện cho sự thu gọn, kết tinh; Mộc cho sự mở rộng, phát triển; Thủy cho sự linh hoạt, thích nghi; Hỏa cho sự biến đổi, tỏa sáng; và Thổ cho sự ổn định, nuôi dưỡng. Mọi hiện tượng trong cuộc sống đều có thể được phân loại và phân tích thông qua hệ thống Ngũ Hành này.</p>

    <p class="pdf-paragraph">Trường phái Tử Bình — phương pháp hiện đại nhất — phân tích bát tự thông qua ba trụ cột chính: Nhật Chủ — đại diện cho bản thân, là trung tâm để đánh giá mọi yếu tố khác; Thập Thần (Mười Vị Thần) — mười mối quan hệ năng lượng giữa các Can, cho thấy tài lộc, quyền lực, tri thức, sáng tạo và các mối quan hệ; và Đại Vận (Chu kỳ vận mệnh 10 năm) — dòng chảy năng lượng thay đổi theo thời gian, cho thấy khi nào thuận lợi, khi nào thách thức. Sự kết hợp của ba trụ cột này tạo nên bức tranh toàn cảnh về tính cách, tài năng, sự nghiệp, và dòng chảy cuộc đời.</p>

    <p class="pdf-paragraph">Ngoài ra, bản phân tích này còn tích hợp hệ thống Cách Cục — phân loại tổng thể cấu trúc lá số thành các "khuôn mẫu" vận mệnh, và Điều Hậu — phân tích sự cân bằng năng lượng dựa trên mùa sinh. Sự kết hợp đa trường phái này cho phép nhìn nhận lá số từ nhiều góc độ khác nhau, tạo nên bản phân tích toàn diện và chính xác hơn so với việc chỉ sử dụng một phương pháp duy nhất.</p>

    <div class="pdf-pullquote">"Biết mệnh không phải để cam chịu, mà để chủ động dẫn dắt cuộc đời đi đúng quỹ đạo năng lượng của mình."</div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Cách Đọc Báo Cáo Này</h3>
        <p class="pdf-paragraph">Báo cáo này được tạo tự động dựa trên thuật toán đa trường phái: Tử Bình (Nhật Chủ, Thập Thần), Cách Cục (phân loại mệnh cách), và Điều Hậu (cân bằng mùa sinh). Mỗi chương phân tích một khía cạnh khác nhau của lá số, từ tổng quan đến chi tiết, từ tính cách bẩm sinh đến dòng chảy vận mệnh qua các thập niên. Bạn có thể đọc tuần tự để có cái nhìn toàn diện, hoặc nhảy trực tiếp đến chương quan tâm. Tuy nhiên, chúng tôi khuyến khích đọc Chương II (Tứ Trụ & Nhật Chủ) trước, vì đây là nền tảng để hiểu tất cả các phần phân tích sau.</p>
        <p class="pdf-paragraph">Các biểu tượng hướng dẫn: ✅ Cát (thuận lợi) — chỉ ra những khía cạnh năng lượng tích cực, hỗ trợ; ⚠️ Hung (thử thách) — chỉ ra những vùng năng lượng cần được quản lý khéo léo; ☯️ Trung (trung tính) — năng lượng ổn định, có thể nghiêng về cát hoặc hung tùy hoàn cảnh. Hãy nhớ rằng "hung" không có nghĩa là xấu một cách tuyệt đối — nó chỉ ra những vùng năng lượng cần được nhận thức và quản lý. Nhiều người thành công lớn nhất lại là những người có nhiều yếu tố "hung" trong lá số — vì chính thách thức mới tạo ra động lực phát triển mạnh mẽ nhất.</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Triết Lý Phân Tích</h3>
        <p class="pdf-paragraph">Bản phân tích này được xây dựng trên triết lý rằng bản chất con người là phức tạp, đa chiều, và luôn trong quá trình phát triển. Lá số Bát Tự không phải là bản án — mà là bản đồ. Nó cho thấy "địa hình năng lượng" mà bạn đang sở hữu: những đỉnh cao (điểm mạnh), những thung lũng (thách thức), những dòng sông (dòng chảy vận mệnh), và những con đường (hướng phát triển phù hợp). Giống như một bản đồ địa lý không quyết định bạn đi đâu — nhưng giúp bạn đi đúng hướng và tránh được những nguy hiểm không cần thiết — lá số Bát Tự cung cấp thông tin để bạn đưa ra lựa chọn sáng suốt hơn.</p>
        <p class="pdf-paragraph">Một nguyên tắc quan trọng trong triết học Bát Tự: "Nhất mệnh, nhì vận, tam phong thủy, tứ âm đức, ngũ độc thư" — mệnh và vận chỉ là hai trong năm yếu tố ảnh hưởng đến cuộc đời, bên cạnh phong thủy (môi trường), âm đức (phúc đức gia đình), và độc thư (sự học hỏi). Điều này nhắc nhở rằng dù lá số cho thấy gì, bạn vẫn có khả năng tác động và thay đổi thông qua nỗ lực cá nhân, sự tu dưỡng, và sự học hỏi không ngừng.</p>
    </div>
</div>`;
}
