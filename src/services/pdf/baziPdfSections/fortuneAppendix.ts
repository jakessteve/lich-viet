/**
 * Bazi PDF Sections — Fortune & Appendix (Luck Cycles, Advice, Truong Sinh, Glossary)
 */

import type { BaziChart } from '../../../types/bazi';
import type { PracticalAdvice, EnrichedLuckCycle } from '../../bazi/baziInterpretation';
import { esc, EL_EMOJI, EL_COLOR } from './shared';


// ── Ch IX: Luck Cycles ────────────────────────────────────────
export function generateLuckCyclesChapter(chart: BaziChart, enriched: EnrichedLuckCycle[]): string {
  const cycleCards = chart.luckCycles
    .map((cycle, i) => {
      const ec = enriched.find((e) => e.index === i);
      const badge = cycle.rating === 'cat' ? 'cat' : cycle.rating === 'hung' ? 'hung' : 'trung';
      const badgeLabel = cycle.rating === 'cat' ? '✅ Cát' : cycle.rating === 'hung' ? '⚠️ Hung' : '☯️ Trung';
      const interp = cycle.interpretation;
      const interpHtml = interp ? `
        <div style="margin-top:6pt;padding-top:6pt;border-top:1px solid #e5e5ea">
          <p style="font-size:9pt;color:#444;line-height:1.7;margin:4pt 0"><strong>Sự nghiệp:</strong> ${esc(interp.career)}</p>
          <p style="font-size:9pt;color:#444;line-height:1.7;margin:4pt 0"><strong>Tài chính:</strong> ${esc(interp.finance)}</p>
          <p style="font-size:9pt;color:#444;line-height:1.7;margin:4pt 0"><strong>Quan hệ:</strong> ${esc(interp.relationship)}</p>
        </div>` : '';
      const thapThanNote = cycle.thapThan ? `<p style="font-size:9pt;color:#666;margin:4pt 0"><strong>Thập Thần chủ đạo:</strong> ${esc(cycle.thapThan)} — theo "Tử Bình Chân Thuyên", khi vị thần này "cầm quyền" suốt 10 năm, nó định nghĩa chủ đề của cả giai đoạn.</p>` : '';
      return `
<div class="bazi-cycle-card">
    <div class="bazi-cycle-header">
        <div>
            <strong style="font-size:12pt;color:${EL_COLOR[cycle.element]}">${esc(cycle.can)} ${esc(cycle.chi)}</strong>
            <span style="font-size:9pt;color:#888;margin-left:6pt">${cycle.startAge}–${cycle.endAge} tuổi · ${esc(cycle.napAm)}</span>
        </div>
        <span class="bazi-cycle-badge bazi-cycle-badge--${badge}">${badgeLabel}</span>
    </div>
    <p style="font-size:9.5pt;color:#444;line-height:1.8;margin:0">${ec ? esc(ec.narrative) : esc(cycle.description)}</p>
    ${thapThanNote}
    ${interpHtml}
    <p class="pdf-paragraph">${cycle.rating === 'cat' ? 'Theo kinh nghiệm 50 năm luận mệnh, giai đoạn Đại Vận cát như cánh buồm gặp gió thuận — mọi nỗ lực đều nhân đôi kết quả. Đây là thời điểm vàng để khởi nghiệp, đầu tư, mở rộng quan hệ, và theo đuổi giấc mơ lớn. Tuy nhiên, sách "Trích Thiên Tủy" cảnh báo: "Cát vận bất khả kiêu, kiêu tắc hoạ sinh" — vận tốt mà kiêu ngạo thì họa sẽ sinh. Hãy tận dụng mà vẫn giữ khiêm tốn, cho đi khi được nhiều, và chuẩn bị "kho lương" cho những giai đoạn khó khăn phía trước — vì như chu kỳ mặt trời và mặt trăng, không có vận nào kéo dài mãi.' : cycle.rating === 'hung' ? 'Theo "Cùng Thông Bảo Giám" và "Tam Mệnh Thông Hội", giai đoạn Đại Vận hung không phải "án tử" — mà là "trường huấn luyện" của tạo hóa. Sách ghi: "Hung vận luyện tâm, luyện chí, luyện thần" — vận hung rèn luyện tâm, ý chí, và tinh thần. Trong giai đoạn này, hãy thận trọng với tài chính, tránh mạo hiểm lớn, tập trung vào sức khỏe và quan hệ gia đình. Đây cũng là thời gian lý tưởng để học hỏi, nâng cấp kỹ năng, và chuẩn bị cho "bước nhảy lớn" khi vận cát trở lại. Tôi đã chứng kiến nhiều người vượt qua hung vận và trở nên mạnh mẽ hơn bao giờ hết — vì "kim cương chỉ hình thành dưới áp lực khổng lồ."' : 'Giai đoạn trung tính — theo "Mệnh Lý Ước Ngôn", đây là thời gian "tĩnh lặng giữa hai cơn sóng." Năng lượng ổn định, không quá thuận cũng không quá nghịch — phù hợp để duy trì, cải thiện dần, và chuẩn bị chiến lược cho giai đoạn tiếp theo. Đừng cố làm điều quá lớn, nhưng cũng đừng ngồi im — hãy như người nông dân cần mẫn chăm sóc vườn cây trong mùa trung gian.'}</p>
</div>`;
    })
    .join('');

  const startAgeHtml =
    chart.daiVanStartAge !== undefined
      ? `<p class="pdf-paragraph">Theo phép "Luận Khởi Đại Vận" trong "Tam Mệnh Thông Hội", Đại Vận của bạn bắt đầu từ <strong>${chart.daiVanStartAge} tuổi</strong>. Trước độ tuổi này, vận mệnh chịu chi phối chính từ Trụ Tháng (Nguyệt Lệnh) — giai đoạn "tiền vận" định hình nền tảng ban đầu. Tuổi khởi Đại Vận được tính bằng phương pháp "đếm ngày" từ ngày sinh đến ranh giới Tiết Khí gần nhất, theo công thức cổ điện: 3 ngày = 1 năm vận. Sự chính xác của con số này quyết định độ chính xác của toàn bộ phân tích Đại Vận — đó là lý do chúng tôi sử dụng thuật toán thiên văn hiện đại để tính ranh giới Tiết Khí chính xác đến từng phút.</p>`
      : '';

  return `
<div class="pdf-chapter">
    <div class="pdf-chapter-header">
        <span class="pdf-chapter-emoji">🌊</span>
        <span class="pdf-chapter-number">Chương IX</span>
        <h2 class="pdf-chapter-title">Đại Vận — Dòng Chảy Vận Mệnh</h2>
        <p class="pdf-chapter-subtitle">Mỗi 10 năm, một chương mới mở ra</p>
    </div>

    <p class="pdf-paragraph">Theo sách "Uyên Hải Tử Bình" của Từ Tử Bình — ông tổ trường phái — và "Tam Mệnh Thông Hội" chương "Luận Đại Vận", Đại Vận (大運) là hệ thống chu kỳ 10 năm quyết định "mùa" của cuộc đời: mùa xuân để gieo hạt, mùa hè để phát triển, mùa thu để gặt hái, mùa đông để nghỉ ngơi. Nếu tứ trụ là "bản đồ địa hình" bất biến — cho biết bạn được sinh ra trên vùng đất như thế nào — thì Đại Vận là "thời tiết" luân chuyển — cùng một vùng đất nhưng mùa xuân khác hẳn mùa đông. Mỗi giai đoạn mang một cặp Can Chi mới, tạo ra tương tác (hợp, xung, hình, hại) với tứ trụ gốc, dẫn đến những biến đổi rõ rệt về sự nghiệp, tài lộc, sức khỏe, và mối quan hệ.</p>

    <p class="pdf-paragraph">Nguyên lý cổ điển mà "Trích Thiên Tủy" dạy: "Vận giả, mệnh chi phụ dực dã" — Vận là đôi cánh của Mệnh. Mệnh tốt mà Vận xấu như chim đại bàng bị cắt cánh — có tiềm năng nhưng chưa thể bay. Mệnh trung bình mà Vận tốt như chim bình thường gặp gió thuận — bay xa hơn mong đợi. Hiểu Đại Vận giúp bạn biết KHI NÀO nên tiến (mùa cát), KHI NÀO nên thủ (mùa hung), KHI NÀO nên thay đổi (mùa xung), và KHI NÀO nên kiên nhẫn (mùa tĩnh). Đây là "lịch chiến lược" quan trọng nhất mà Bát Tự mang lại cho cuộc đời bạn.</p>

    ${startAgeHtml}
    ${cycleCards}

    <div class="pdf-pullquote">"Đại Vận không định nghĩa bạn — nó vẽ ra sân chơi. Cách bạn chơi mới là quyết định cuối cùng."</div>
</div>`;
}



// ── Ch X: Practical Advice ────────────────────────────────────
export function generatePracticalAdviceChapter(chart: BaziChart, advice: PracticalAdvice): string {
  const p = advice.primary;
  const s = advice.secondary;
  return `
<div class="pdf-chapter">
    <div class="pdf-chapter-header">
        <span class="pdf-chapter-emoji">💡</span>
        <span class="pdf-chapter-number">Chương X</span>
        <h2 class="pdf-chapter-title">Lời Khuyên Thực Hành</h2>
        <p class="pdf-chapter-subtitle">Ứng dụng Ngũ Hành vào cuộc sống hàng ngày</p>
    </div>

    <p class="pdf-paragraph">Khi đã xác định được Hỷ Dụng Thần (hành năng lượng cần bổ sung), bước tiếp theo là biến kiến thức thành hành động hàng ngày. ${esc(advice.summary)}. Đây không phải mê tín — mà là ứng dụng thực tiễn nguyên lý Ngũ Hành, tương tự cách y học cổ truyền dùng Ngũ Hành để cân bằng cơ thể. Những thay đổi nhỏ nhất — một màu sắc khác, một hướng ngồi khác — đôi khi tạo ra sự khác biệt lớn đến bất ngờ.</p>

    <div class="bazi-advice-grid">
        <div class="bazi-advice-box">
            <h4>🎨 Màu Sắc Hỷ Dụng</h4>
            <p>${p.colors.join(', ')}${s ? '. Bổ sung: ' + s.colors.slice(0, 2).join(', ') : ''}</p>
        </div>
        <div class="bazi-advice-box">
            <h4>🧭 Hướng Tốt</h4>
            <p>${p.directions.join(', ')}${s ? '. Bổ sung: ' + s.directions.join(', ') : ''}</p>
        </div>
        <div class="bazi-advice-box">
            <h4>🔢 Số May Mắn</h4>
            <p>${p.numbers.join(', ')}${s ? ', ' + s.numbers.join(', ') : ''}</p>
        </div>
        <div class="bazi-advice-box">
            <h4>📅 Mùa Thuận</h4>
            <p>${esc(p.seasons)}${s ? '. Bổ sung: ' + esc(s.seasons) : ''}</p>
        </div>
    </div>

    <p class="pdf-paragraph">Theo "Hoàng Đế Nội Kinh" và lý thuyết "Ngũ Sắc Ngũ Khí" trong y học Đông y, mỗi hành tương ứng với nhóm màu: Kim → trắng, bạc, vàng kim (kim loại quý); Mộc → xanh lá, xanh ngọc (cây cối); Thủy → đen, xanh dương đậm (đại dương); Hỏa → đỏ, cam, hồng (lửa); Thổ → vàng đất, nâu, be (đất nông). Mặc màu hỷ dụng không phải "phép thuật" — mà là cách "đồng bộ hóa" tần số năng lượng cá nhân với môi trường. Khi bạn mặc đúng màu, bạn cảm thấy tự tin hơn, thoải mái hơn — và cảm giác đó tạo ra kết quả tốt hơn trong giao tiếp, đàm phán, và quyết định. Tâm lý học gọi đó là "enclothed cognition" — trang phục ảnh hưởng đến nhận thức và hành vi.</p>

    <div class="pdf-section">
        <h3 class="pdf-section-title">💼 Nghề Nghiệp Phù Hợp</h3>
        <p class="pdf-paragraph">Theo phép "Luận Nghệ Nghiệp" trong "Tam Mệnh Thông Hội", nghề nghiệp phù hợp nhất: <strong>${p.careers.join(' · ')}${s ? ' · ' + s.careers.slice(0, 3).join(' · ') : ''}</strong>. Chọn nghề nghiệp phù hợp với hành hỷ dụng không phải là "bị giới hạn" — mà là tìm "dòng chảy" (flow state) mà nhà tâm lý học Mihaly Csikszentmihalyi mô tả: trạng thái bạn làm việc quên thời gian, đầy hào hứng, và kết quả đến tự nhiên. Khi năng lượng nghề nghiệp đồng bộ với năng lượng bản mệnh, bạn không cần "cố gắng" mà vẫn tiến — như cá bơi xuôi dòng.</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">🍽️ Chế Độ Ăn Uống Theo Ngũ Hành</h3>
        <p class="pdf-paragraph">Theo "Hoàng Đế Nội Kinh" chương "Tứ Khí Điều Thần Đại Luận" và phép "Ngũ Vị Điều Hòa" trong Đông y, thực phẩm được phân loại theo Ngũ Hành dựa trên vị: chua → Mộc (bổ gan); đắng → Hỏa (bổ tim); ngọt → Thổ (bổ tỳ vị); cay → Kim (bổ phổi); mặn → Thủy (bổ thận). ${esc(p.dietaryAdvice)}. Bổ sung thực phẩm có vị và màu tương ứng hành hỷ dụng giúp "nạp năng lượng" cho cơ quan cần tăng cường. Tôi thường nói: ăn đúng theo mệnh không phải kiêng khem khổ sở — mà là THÊM VÀO những thực phẩm "đồng tần" với bạn, và bạn sẽ cảm nhận được sự khác biệt trong vài tuần.</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">🏃 Thói Quen & Nhịp Sinh Học</h3>
        <p class="pdf-paragraph">Theo "Hoàng Đế Nội Kinh" chương "Tý Ngọ Lưu Chú" — hệ thống thời gian sinh học cổ đại — mỗi giờ trong ngày thuộc về một hành: giờ Dần-Mão (3-7h) thuộc Mộc (gan-phổi thải độc), giờ Tỵ-Ngọ (9-13h) thuộc Hỏa (tim-tiểu tràng hoạt động mạnh), giờ Thân-Dậu (15-19h) thuộc Kim (phổi-thận nạp năng lượng), giờ Hợi-Tý (21-1h) thuộc Thủy (thận tái tạo). ${esc(p.dailyHabits)}. Thực hiện hoạt động quan trọng nhất vào giờ tương ứng hành hỷ dụng sẽ thuận lợi gấp bội. Ví dụ, nếu hỷ dụng là Hỏa, hãy họp quan trọng, phỏng vấn, hoặc đàm phán vào buổi trưa (giờ Ngọ, 11-13h) — và bạn sẽ nhận thấy sự khác biệt rõ ràng.</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">💰 Chiến Lược Tài Chính Theo Vận</h3>
        <p class="pdf-paragraph">Theo "Mệnh Lý Ước Ngôn" chương "Luận Tài Vận Thông Biến", chiến lược tài chính cần "đồng bộ" với nhịp Đại Vận hiện tại. ${esc(p.wealthStrategy)}. Trong giai đoạn Đại Vận cát (thuận lợi), sách dạy: "Đắc thời thừa thế, bất khả thất cơ" — gặp thời thuận lợi, phải nắm lấy cơ hội, đừng để trôi qua. Ngược lại, giai đoạn Đại Vận hung: "Thu liễm tích trữ, dĩ đãi thời cơ" — thu gọn tích lũy, chờ đợi thời cơ. Ngành đầu tư phù hợp nên liên quan hành hỷ dụng — đầu tư "thuận hành" như cá bơi xuôi dòng, đầu tư "trái hành" như leo dốc ngược gió.</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">🌤️ Sống Theo Mùa — Thuận Thiên Ứng Thời</h3>
        <p class="pdf-paragraph">Theo "Hoàng Đế Nội Kinh" và triết lý "Thiên Nhân Hợp Nhất" — con người và thiên nhiên là một thể thống nhất — mỗi mùa mang năng lượng khác nhau: Xuân → Mộc (sinh sôi), Hạ → Hỏa (bùng phát), Trường Hạ → Thổ (chuyển giao), Thu → Kim (thu hoạch), Đông → Thủy (tích trữ). ${esc(p.seasonalLiving)}. Khi mùa hỷ dụng đến, bạn sẽ cảm thấy năng lượng tự nhiên dâng trào — đây là "cửa sổ vàng" cho quyết định quan trọng. Khi mùa kỵ đến, hãy đặc biệt chú ý sức khỏe và tránh mạo hiểm lớn. Nguyên tắc đơn giản: "Mùa thuận thì tiến, mùa nghịch thì tĩnh."</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">💕 Lời Khuyên Tình Cảm</h3>
        <p class="pdf-paragraph">Theo phép "Luận Cung Phu Thê" trong "Uyên Hải Tử Bình" và kinh nghiệm tư vấn hàng nghìn cặp đôi, ${esc(p.relationshipAdvice)}. Trong mối quan hệ, hiểu "bản đồ năng lượng" của bạn và đối phương giúp tránh 80% xung đột không cần thiết — vì phần lớn mâu thuẫn đến từ sự khác biệt BẢN CHẤT chứ không phải THIỆN Ý. Khi biết đối phương thuộc hành nào, bạn sẽ hiểu tại sao họ hành xử khác bạn, và thay vì phán xét, bạn sẽ THẤU HIỂU.</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">🩺 Chăm Sóc Sức Khỏe Chuyên Sâu</h3>
        <p class="pdf-paragraph">Theo "Hoàng Đế Nội Kinh" và nguyên tắc "Trị Vị Bệnh" (治未病 — chữa bệnh trước khi phát), cơ quan cần chú ý đặc biệt: <strong>${esc(p.healthOrgans)}</strong>. ${esc(p.healthFocus)}. Phòng bệnh quan trọng hơn chữa bệnh gấp trăm lần — duy trì cân bằng Ngũ Hành trong cơ thể qua ăn uống, vận động, và thói quen sinh hoạt là phương pháp mà y học Đông phương đã áp dụng thành công hơn 4,000 năm. Điều tuyệt vời nhất: bạn không cần thuốc hay bác sĩ cho phần lớn những lời khuyên này — chỉ cần ý thức và kỷ luật bản thân.</p>
    </div>
</div>`;
}



// ── Ch XI: Trường Sinh ────────────────────────────────────────
export function generateTruongSinhChapter(chart: BaziChart): string {
  if (!chart.truongSinh || chart.truongSinh.length === 0) return '';

  const PHASE_DEEP: Record<string, string> = {
    'Trường Sinh': 'Theo sách "Tam Mệnh Thông Hội" chương "Luận Trường Sinh Thập Nhị Cung", giai đoạn Trường Sinh tượng trưng cho sự khởi đầu tràn đầy sinh khí — như mầm cây vừa phá vỏ hạt, đầy sức sống và khao khát vươn lên ánh sáng. Trong cuộc đời, Trường Sinh ở trụ nào thì khía cạnh đó thường phát triển thuận lợi từ nền tảng tốt. Người có nhiều Trường Sinh trong lá số thường lạc quan, sáng tạo, và có khả năng phục hồi tuyệt vời sau mỗi thất bại — như cây xuân đâm chồi sau mùa đông khắc nghiệt. Bạn có thể đã nhận ra rằng mình luôn tìm thấy hy vọng ngay trong những tình huống tưởng chừng tuyệt vọng — đó là năng lượng Trường Sinh đang hoạt động.',
    'Mộc Dục': 'Theo "Uyên Hải Tử Bình" chương "Luận Mộc Dục", giai đoạn Mộc Dục (Tắm gội) tượng trưng cho sự thanh tẩy và nhạy cảm — như đứa trẻ vừa sinh cần được tắm rửa và bảo vệ. Năng lượng đang ở trạng thái "mềm, dễ tổn thương" — bạn tiếp thu nhanh nhưng cũng dễ bị ảnh hưởng bởi môi trường xung quanh. Trong cuộc sống, người có Mộc Dục ở trụ quan trọng thường có cá tính nghệ sĩ: nhạy cảm, đa tình, yêu cái đẹp, nhưng cũng dễ bất ổn cảm xúc. Cổ nhân nói "Mộc Dục chi địa, kỵ phùng đào hoa" — Mộc Dục gặp Đào Hoa thì chuyện tình cảm phức tạp. Nếu bạn nhận ra mình "có lúc rất mạnh mẽ, có lúc rất mong manh" — đó chính là biểu hiện của Mộc Dục.',
    'Quan Đới': 'Theo "Tam Mệnh Thông Hội", giai đoạn Quan Đới (Đội mũ) tượng trưng cho sự trưởng thành bước đầu — như thanh niên mới vào đời, đầy hoài bão và quyết tâm chứng minh bản thân. Năng lượng đang tích lũy mạnh, chưa đạt đỉnh nhưng đà phát triển rõ ràng. Trong cuộc sống, Quan Đới ở trụ nào thì khía cạnh đó đang trên đà đi lên — công việc, tiền bạc, hoặc quan hệ đều có triển vọng tốt nếu bạn kiên trì. Đây là giai đoạn "học việc" — chưa phải ngôi sao, nhưng đang trên đường trở thành ngôi sao.',
    'Lâm Quan': 'Theo "Trích Thiên Tủy" và "Tử Bình Chân Thuyên", giai đoạn Lâm Quan (Đến cổng quan) tượng trưng cho sự thăng tiến mạnh mẽ — như viên quan bước vào triều đình, được vua tin dùng. Năng lượng gần đạt đỉnh, đủ mạnh để tạo ảnh hưởng lớn. Trong cuộc sống, Lâm Quan ở trụ nào thì khía cạnh đó thường đạt thành tựu đáng kể — công danh hơn người, tài sản tích lũy nhanh, hoặc uy tín xã hội cao. Sách ghi: "Lâm Quan chi địa, vạn sự khả thành" — ở đất Lâm Quan, mọi việc đều có thể thành. Hãy tận dụng tối đa nguồn năng lượng mạnh mẽ này.',
    'Đế Vượng': 'Theo "Tam Mệnh Thông Hội", Đế Vượng (帝旺) là đỉnh cao nhất của chu kỳ — như vua ngự trên ngai, quyền uy tuyệt đối. Năng lượng ở mức cực thịnh, sức mạnh tối đa. Tuy nhiên, cổ nhân cảnh báo: "Vật cực tắc phản, thịnh cực tắc suy" — vật đến cực điểm thì quay ngược, thịnh đến tận cùng thì bắt đầu suy. Đây là lời nhắc quan trọng: ở đỉnh cao, hãy khiêm tốn và chuẩn bị cho sự chuyển giao. Trong cuộc sống, Đế Vượng ở trụ nào thì khía cạnh đó cực kỳ mạnh — nhưng cũng cần tiết chế để không "vượt quá điểm cân bằng."',
    'Suy': 'Theo "Cùng Thông Bảo Giám", giai đoạn Suy tượng trưng cho sự bắt đầu giảm — nhưng đừng hiểu lầm, Suy không phải "hết." Sách ví Suy như mùa Thu: lá đã chuyển vàng nhưng quả đã chín — đây là mùa thu hoạch thành quả từ những nỗ lực trước đó. Người ở giai đoạn Suy thường chín chắn, giàu kinh nghiệm, và có "mắt nhìn" sắc bén hơn. Trong cuộc sống, Suy ở trụ nào thì khía cạnh đó cần được quản lý cẩn thận — không phải vì yếu, mà vì nguồn lực có hạn cần được phân bổ khôn ngoan.',
    'Bệnh': 'Theo "Mệnh Lý Tầm Nguyên", giai đoạn Bệnh tượng trưng cho sự suy yếu — năng lượng cần được nghỉ ngơi và phục hồi. Lưu ý: Bệnh trong Trường Sinh KHÔNG có nghĩa bạn sẽ bệnh tật thể xác — mà  là trạng thái năng lượng cần "sạc lại." Giống như điện thoại pin yếu — cần cắm sạc, không phải vứt bỏ. Trong cuộc sống, Bệnh ở trụ nào thì hãy đặc biệt chú ý sức khỏe và tinh thần ở khía cạnh tương ứng. Sách dạy: "Bệnh phùng y dược, tắc khả hồi xuân" — Bệnh gặp thuốc hay, thì lại hồi xuân.',
    'Tử': 'Theo "Tam Mệnh Thông Hội", giai đoạn Tử tượng trưng cho sự kết thúc một chu kỳ — KHÔNG PHẢI "chết" theo nghĩa đen. Cổ nhân hiểu Tử như mùa Đông: vạn vật dường như "chết" nhưng thực ra đang ngủ đông, tích lũy năng lượng cho mùa Xuân mới. Trong cuộc sống, Tử ở trụ nào cho thấy khía cạnh đó đang trải qua sự "chuyển đổi lớn" — kết thúc để bắt đầu. Nhiều người trải nghiệm Tử như việc đổi nghề, kết thúc mối quan hệ cũ, hoặc buông bỏ niềm tin lỗi thời — và sau đó tái sinh mạnh mẽ hơn.',
    'Mộ': 'Theo "Trích Thiên Tủy", Mộ (Kho) tượng trưng cho sự cất giữ — năng lượng không biến mất mà được "cất vào kho." Đây là giai đoạn tích lũy ngầm, như hạt giống nằm trong đất chờ mùa mưa. Trong lá số, Mộ ở trụ nào thì khía cạnh đó có "kho báu ẩn giấu" — tài năng chưa khai phá, mối quan hệ chưa tận dụng, hoặc cơ hội chưa nhận ra. Sách ghi: "Mộ khố phùng khóa, phú quý tự nhiên" — kho gặp chìa khóa (Đại Vận thuận), giàu sang tự đến.',
    'Tuyệt': 'Theo "Cùng Thông Bảo Giám", giai đoạn Tuyệt tượng trưng cho sự trống rỗng hoàn toàn — như khoảng lặng giữa hai hơi thở, bóng tối trước bình minh. Đây là giai đoạn khó khăn nhất nhưng cũng là "điểm 0" — nơi mọi thứ có thể bắt đầu lại từ đầu. Triết học Phật giáo gọi đây là "Không" (空) — không phải hư vô mà là vô hạn tiềm năng. Trong cuộc sống, Tuyệt ở trụ nào thì khía cạnh đó cần kiên nhẫn phi thường — nhưng phần thưởng sẽ xứng đáng khi "Trường Sinh" quay trở lại.',
    'Thai': 'Theo "Tam Mệnh Thông Hội", giai đoạn Thai tượng trưng cho sự thụ thai — mầm sống mới đang hình thành trong bụng mẹ, chưa ai nhìn thấy nhưng nó đang lớn dần. Đây là giai đoạn của ý tưởng, kế hoạch, và giấc mơ — chúng chưa thành hiện thực nhưng đang "được ấp ủ." Trong cuộc sống, Thai ở trụ nào thì hãy tin rằng điều tốt đẹp ĐANG hình thành — dù bạn chưa nhìn thấy bằng mắt. Kiên nhẫn và nuôi dưỡng ý tưởng, đừng vội vàng "sinh non."',
    'Dưỡng': 'Theo "Uyên Hải Tử Bình", giai đoạn Dưỡng tượng trưng cho sự nuôi dưỡng — thai nhi đang lớn trong bụng mẹ, chuẩn bị cho lần "chào đời" sắp tới. Năng lượng mới đang được bổ sung và củng cố — mọi thứ đang đúng hướng, chỉ cần thêm thời gian. Trong cuộc sống, Dưỡng ở trụ nào thì hãy kiên nhẫn chăm sóc và nuôi dưỡng khía cạnh đó — đừng vội vàng, đừng gấp gáp. Sách dạy: "Dưỡng chi thì dĩ đãi, bất khả cưỡng cầu" — lúc Dưỡng phải chờ đợi, không thể ép buộc.',
  };

  const phases = chart.truongSinh
    .map(
      (ts) => `
<span class="bazi-ts-phase" style="background:${ts.quality === 'Vượng' ? '#f0fdf4' : ts.quality === 'Suy' ? '#fef2f2' : '#fefce8'}">
    <strong>${esc(ts.pillarName)}</strong> · ${esc(ts.branch)} → ${esc(ts.phase)} (${esc(ts.quality)})
</span>`,
    )
    .join('');

  const meanings = chart.truongSinh
    .map(
      (ts) => {
        const deepMeaning = PHASE_DEEP[ts.phase] || '';
        return `
<div style="margin-bottom:12pt;page-break-inside:avoid">
    <strong style="font-size:10pt">${esc(ts.pillarName)} — ${esc(ts.phase)} (${esc(ts.quality)})</strong>
    <p style="font-size:9pt;color:#555;margin:2pt 0 0 0">${esc(ts.meaning)}</p>
    ${deepMeaning ? `<p class="pdf-paragraph">${deepMeaning}</p>` : ''}
</div>`;
      },
    )
    .join('');

  const vCount = chart.truongSinh.filter(ts => ts.quality === 'Vượng').length;
  const sCount = chart.truongSinh.filter(ts => ts.quality === 'Suy').length;

  return `
<div class="pdf-chapter">
    <div class="pdf-chapter-header">
        <span class="pdf-chapter-emoji">🔄</span>
        <span class="pdf-chapter-number">Chương XI</span>
        <h2 class="pdf-chapter-title">Trường Sinh — 12 Giai Đoạn Sinh Mệnh</h2>
        <p class="pdf-chapter-subtitle">Chu kỳ sinh, vượng, suy, tử và tái sinh</p>
    </div>

    <p class="pdf-paragraph">Theo sách "Tam Mệnh Thông Hội" chương "Luận Trường Sinh Thập Nhị Cung" và "Trích Thiên Tủy" — Trường Sinh (長生) là hệ thống 12 giai đoạn mô tả chu kỳ sinh mệnh hoàn chỉnh: Thai → Dưỡng → Trường Sinh → Mộc Dục → Quan Đới → Lâm Quan → Đế Vượng → Suy → Bệnh → Tử → Mộ → Tuyệt, rồi quay lại Thai — một vòng tròn bất tận, phản ánh quy luật vũ trụ mà triết học phương Đông gọi là "chu nhi phục thủy" (周而復始) — vòng rồi lại bắt đầu. Mỗi trụ trong lá số tương ứng với một giai đoạn, cho thấy "chất lượng năng lượng" của từng khía cạnh cuộc đời.</p>

    <p class="pdf-paragraph">Nguyên lý tính Trường Sinh: Nhật Chủ ${esc(chart.dayMaster.dayMaster)} (${EL_EMOJI[chart.dayMaster.dayMasterElement]} ${esc(chart.dayMaster.dayMasterElement)}) được "chiếu" lên từng Địa Chi trong tứ trụ. Can Dương (Giáp, Bính, Mậu, Canh, Nhâm) đi thuận chiều — từ Trường Sinh đến Mộ Tuyệt theo thứ tự 12 Chi; Can Âm (Ất, Đinh, Kỷ, Tân, Quý) đi nghịch chiều. Sự khác biệt Dương-Âm này phản ánh hai phong cách sống: Dương tiến thẳng, mạnh mẽ, trực diện; Âm tiến gián tiếp, linh hoạt, uyển chuyển. Hiểu vị trí Trường Sinh trong lá số giúp bạn biết mình đang ở "chương nào" trong quyển sách cuộc đời — và chương tiếp theo sẽ là gì.</p>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Tổng Quan Năng Lượng Bốn Trụ</h3>
        <div style="display:flex;flex-wrap:wrap;gap:4pt">${phases}</div>
        <p class="pdf-paragraph">Trong lá số của bạn, <strong>${vCount}/4 trụ ở giai đoạn Vượng</strong> và <strong>${sCount}/4 trụ ở giai đoạn Suy</strong>. ${vCount >= 3 ? 'Năng lượng tổng thể rất mạnh — sách "Trích Thiên Tủy" ghi: "Khí thịnh chi nhân, đương dĩ tài quan tiết chi" — người khí thịnh, cần Tài Quan (áp lực và thử thách) để "tiết" bớt năng lượng thừa. Bạn có sức sống dồi dào, bản lĩnh cao, và khả năng phục hồi phi thường. Tuy nhiên, năng lượng mạnh cần được "kênh hóa" đúng hướng — giống như dòng sông lớn cần đập thủy điện để biến sức nước thành điện năng, thay vì để nó phá hủy.' : sCount >= 3 ? 'Năng lượng tổng thể nghiêng về suy — nhưng "Cùng Thông Bảo Giám" dạy: "Nhược nhi đắc phù, kỳ lực phản đại" — yếu mà được phù trợ đúng, sức mạnh phản hồi lại lớn. Nhiều danh nhân trong lịch sử có lá số Suy nhưng thành đạt lớn nhờ biết tìm đúng quý nhân, đúng thời cơ, đúng chiến lược. Chìa khóa: không chống lại bản chất, mà tận dụng nó.' : 'Năng lượng cân bằng — trạng thái lý tưởng mà cổ nhân gọi là "trung hòa chi mệnh." Mỗi trụ mang một giai đoạn khác nhau, tạo nên sự đa dạng và phong phú trong trải nghiệm cuộc sống.'}</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Chi Tiết Từng Trụ — Vị Trí Của Bạn Trong Chu Kỳ</h3>
        ${meanings}
    </div>

    <div class="pdf-pullquote">"Vạn vật đều tuân theo chu kỳ — sinh, trưởng, thu, tàng. Hiểu chu kỳ, thuận chu kỳ — đó là trí tuệ cao nhất."</div>
</div>`;
}



// ── Appendix ──────────────────────────────────────────────────
export function generateBaziAppendix(): string {
  const terms = [
    {
      term: 'Bát Tự / Tứ Trụ',
      def: 'Hệ thống phân tích vận mệnh dựa trên 8 chữ Can Chi từ 4 trụ thời gian: Năm, Tháng, Ngày, Giờ sinh.',
    },
    {
      term: 'Nhật Chủ',
      def: 'Thiên Can của Trụ Ngày — đại diện cho bản thân, là trung tâm để phân tích toàn bộ lá số.',
    },
    {
      term: 'Thiên Can',
      def: '10 ký tự trời: Giáp, Ất, Bính, Đinh, Mậu, Kỷ, Canh, Tân, Nhâm, Quý — mỗi can thuộc một hành.',
    },
    {
      term: 'Địa Chi',
      def: '12 con giáp: Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi — mỗi chi chứa tàng can.',
    },
    {
      term: 'Ngũ Hành',
      def: 'Năm nguyên tố: Kim (Metal), Mộc (Wood), Thủy (Water), Hỏa (Fire), Thổ (Earth) — nền tảng của mọi phân tích.',
    },
    {
      term: 'Thập Thần',
      def: 'Mười mối quan hệ giữa các Can với Nhật Chủ: Tỉ Kiên, Kiếp Tài, Thực Thần, Thương Quan, Chính Tài, Thiên Tài, Chính Quan, Thất Sát, Chính Ấn, Thiên Ấn.',
    },
    { term: 'Tàng Can', def: 'Thiên Can ẩn bên trong mỗi Địa Chi — nguồn lực ngầm ảnh hưởng tính cách và vận mệnh.' },
    {
      term: 'Thần Sát',
      def: 'Các "sao" đặc biệt tính từ mối quan hệ Can Chi, mang ý nghĩa cát (tốt), hung (thách thức), hoặc trung tính.',
    },
    {
      term: 'Đại Vận',
      def: 'Chu kỳ vận mệnh 10 năm — mỗi giai đoạn mang năng lượng Can Chi riêng, ảnh hưởng sâu sắc đến cuộc sống.',
    },
    {
      term: 'Cách Cục',
      def: 'Mô hình phân loại lá số dựa trên cấu trúc tổng thể — cho thấy xu hướng vận mệnh và con đường phù hợp.',
    },
    { term: 'Điều Hậu', def: 'Phân tích cân bằng mùa sinh — xem xét "nhiệt độ" lá số để xác định hành cần bổ sung.' },
    {
      term: 'Nạp Âm',
      def: 'Hệ thống 60 Giáp Tử — mỗi cặp Can Chi được gán một tên gọi hành kim loại, mang ý nghĩa biểu tượng.',
    },
    {
      term: 'Trường Sinh',
      def: '12 giai đoạn sinh mệnh: Thai → Dưỡng → Trường Sinh → Mộc Dục → … → Tuyệt — chu kỳ năng lượng.',
    },
    {
      term: 'Không Vong',
      def: 'Hai Địa Chi "trống" trong Tuần — đại diện cho những vùng năng lượng yếu hoặc bất khả.',
    },
    { term: 'Hỷ Dụng', def: 'Hành có lợi cho lá số — nên tăng cường qua màu sắc, hướng, nghề nghiệp, và lối sống.' },
  ];
  const termHtml = terms
    .map(
      (t) => `
<dl class="pdf-appendix-term">
    <dt>${esc(t.term)}</dt>
    <dd>${esc(t.def)}</dd>
</dl>`,
    )
    .join('');

  return `
<div class="pdf-chapter pdf-appendix">
    <div class="pdf-chapter-header">
        <span class="pdf-chapter-emoji">📚</span>
        <span class="pdf-chapter-number">Phụ Lục</span>
        <h2 class="pdf-chapter-title">Thuật Ngữ Bát Tự</h2>
        <p class="pdf-chapter-subtitle">Giải thích các thuật ngữ chuyên môn sử dụng trong báo cáo</p>
    </div>
    ${termHtml}
    <div class="pdf-divider">✦ ✦ ✦</div>
    <p class="pdf-paragraph" style="text-align:center;font-style:italic;color:#888">
        Báo cáo được tạo tự động bởi Lịch Việt — lichviet.app<br>
        Thuật toán đa trường phái: Tử Bình · Cách Cục · Điều Hậu · Thần Sát
    </p>
</div>`;
}
