/**
 * Bazi PDF Sections — Analysis Chapters (II through VIII)
 */

import type { BaziChart, NguHanh, ThanSat, BranchInteraction } from '../../../types/bazi';
import type { PersonalityNarrative } from '../../bazi/baziInterpretation';
import type { ExecutiveSummaryBlock, CategoryReading } from '../../bazi/bazi12Domains';
import { THAP_THAN_MEANINGS } from '../../../data/interpretation/bazi/thapThanMeanings';
import { esc, EL_EMOJI, EL_COLOR } from './shared';


// ── Ch II: Pillars & Day Master ───────────────────────────────
export function generatePillarsChapter(chart: BaziChart, personality: PersonalityNarrative): string {
  const pillars = [
    { label: 'Trụ Năm', p: chart.yearPillar, cls: '' },
    { label: 'Trụ Tháng', p: chart.monthPillar, cls: '' },
    { label: 'Trụ Ngày', p: chart.dayPillar, cls: 'bazi-dm' },
    { label: 'Trụ Giờ', p: chart.hourPillar, cls: '' },
  ];
  const pillarRows = pillars
    .map(
      ({ label, p, cls }) => `
<tr>
    <td class="${cls}" style="font-weight:600">${esc(label)}</td>
    <td class="${cls}" style="color:${EL_COLOR[p.canElement]};font-size:14pt;font-weight:700">${esc(p.can)}</td>
    <td class="${cls}">${EL_EMOJI[p.canElement]} ${esc(p.canElement)}</td>
    <td class="${cls}" style="color:${EL_COLOR[p.chiElement]};font-size:14pt;font-weight:700">${esc(p.chi)}</td>
    <td class="${cls}">${EL_EMOJI[p.chiElement]} ${esc(p.chiElement)}</td>
    <td class="${cls}" style="font-size:9pt;color:#666">${esc(p.napAm)}</td>
</tr>`,
    )
    .join('');

  const napAmHtml = personality.napAmMeaning
    ? `
    <div class="pdf-section">
        <h3 class="pdf-section-title">Nạp Âm Trụ Ngày — ${personality.napAmMeaning.image} ${esc(personality.napAmMeaning.name)}</h3>
        <p class="pdf-paragraph">${esc(personality.napAmMeaning.meaning)}</p>
    </div>`
    : '';

  const yearNapAmHtml = personality.yearNapAmMeaning
    ? `
    <div class="pdf-section">
        <h3 class="pdf-section-title">Nạp Âm Trụ Năm — ${personality.yearNapAmMeaning.image} ${esc(personality.yearNapAmMeaning.name)}</h3>
        <p class="pdf-paragraph">${esc(personality.yearNapAmMeaning.meaning)}</p>
    </div>`
    : '';

  return `
<div class="pdf-chapter">
    <div class="pdf-chapter-header">
        <span class="pdf-chapter-emoji">${personality.profile.imageEmoji}</span>
        <span class="pdf-chapter-number">Chương II</span>
        <h2 class="pdf-chapter-title">Tứ Trụ & Nhật Chủ</h2>
        <p class="pdf-chapter-subtitle">Bốn cột trụ định hình bản đồ năng lượng cuộc đời bạn</p>
    </div>

    <table class="bazi-pillar-table">
        <thead><tr><th>Trụ</th><th>Thiên Can</th><th>Hành</th><th>Địa Chi</th><th>Hành</th><th>Nạp Âm</th></tr></thead>
        <tbody>${pillarRows}</tbody>
    </table>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Nhật Chủ — ${esc(chart.dayMaster.dayMaster)} (${EL_EMOJI[chart.dayMaster.dayMasterElement]} ${esc(chart.dayMaster.dayMasterElement)})</h3>
        <p class="pdf-paragraph"><strong>${esc(chart.dayMaster.strengthLabel)}</strong> — ${esc(chart.dayMaster.strengthExplanation)}</p>
        <p class="pdf-paragraph">Nhật Chủ là "linh hồn" của lá số — đại diện cho bản thân bạn. Tất cả các yếu tố khác (Thập Thần, Thần Sát, Đại Vận) đều được phân tích dựa trên mối quan hệ với Nhật Chủ. Hành hỷ dụng (thuận lợi): <strong>${chart.dayMaster.favorableElements.map((e) => `${EL_EMOJI[e]} ${e}`).join(', ')}</strong>. Hành kỵ: <strong>${chart.dayMaster.unfavorableElements.map((e) => `${EL_EMOJI[e]} ${e}`).join(', ')}</strong>.</p>
    </div>

    ${napAmHtml}
    ${yearNapAmHtml}

    <div class="pdf-pullquote">"${esc(personality.profile.archetype)} — bạn mang trong mình năng lượng ${esc(personality.profile.element)}, ${chart.dayMaster.strength === 'vượng' ? 'tỏa sáng mạnh mẽ như bản chất vốn có' : chart.dayMaster.strength === 'suy' ? 'cần được nuôi dưỡng để bừng nở trọn vẹn' : 'cân bằng và hài hòa tự nhiên'}."</div>
</div>`;
}

// ── Ch III: Elements & Cách Cục ──────────────────────────────
export function generateElementsChapter(chart: BaziChart): string {
  const maxCount = Math.max(...Object.values(chart.elementCount), 1);
  const elBars = (Object.entries(chart.elementCount) as [NguHanh, number][])
    .map(
      ([el, count]) => `
<div class="bazi-el-row">
    <span style="min-width:36pt">${EL_EMOJI[el]} ${esc(el)}</span>
    <span class="bazi-el-bar" style="width:${Math.max((count / maxCount) * 200, 8)}pt;background:${EL_COLOR[el]}"></span>
    <span style="font-weight:600">${count}</span>
</div>`,
    )
    .join('');

  return `
<div class="pdf-chapter">
    <div class="pdf-chapter-header">
        <span class="pdf-chapter-emoji">⚖️</span>
        <span class="pdf-chapter-number">Chương III</span>
        <h2 class="pdf-chapter-title">Ngũ Hành & Cách Cục</h2>
        <p class="pdf-chapter-subtitle">Cán cân năng lượng và mô hình vận mệnh</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Phân Bổ Ngũ Hành</h3>
        <p class="pdf-paragraph">Ngũ Hành trong lá số cho thấy "bản đồ năng lượng" bẩm sinh. Hành nào nhiều thì năng lượng đó mạnh — không nhất thiết là tốt hay xấu, mà quan trọng là sự cân bằng tổng thể.</p>
        ${elBars}
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Cách Cục — ${esc(chart.cachCuc.name)}</h3>
        <p class="pdf-paragraph">${esc(chart.cachCuc.description)}</p>
        <p class="pdf-paragraph">Cách Cục là "khuôn mẫu" tổng hợp của lá số — cho thấy xu hướng vận mệnh và con đường phát triển phù hợp nhất. Hiểu rõ cách cục giúp bạn đi đúng quỹ đạo thay vì chống lại bản tính.</p>
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Điều Hậu — Cân Bằng Mùa Sinh</h3>
        <p class="pdf-paragraph"><strong>Mùa ${esc(chart.dieuHau.season)}</strong> — ${esc(chart.dieuHau.climate)}. ${esc(chart.dieuHau.assessment)}</p>
        <p class="pdf-paragraph">Hành cần bổ sung: <strong>${EL_EMOJI[chart.dieuHau.neededElement]} ${esc(chart.dieuHau.neededElement)}</strong>. Điều Hậu xem xét mùa sinh để đánh giá "nhiệt độ" của lá số. Ví dụ, người sinh mùa đông (Thủy vượng) thường cần thêm Hỏa để sưởi ấm, giúp năng lượng lưu thông.</p>
    </div>
</div>`;
}

// ── Ch IV: Thập Thần ──────────────────────────────────────────
export function generateThapThanChapter(chart: BaziChart): string {
  const seenGods = new Set<string>();
  const uniqueGods: typeof chart.thapThan = [];
  for (const t of chart.thapThan) {
    if (!seenGods.has(t.god)) { seenGods.add(t.god); uniqueGods.push(t); }
  }
  const godCounts: Record<string, number> = {};
  for (const t of chart.thapThan) { godCounts[t.god] = (godCounts[t.god] || 0) + 1; }

  const pillarMeaning: Record<string, string> = {
    'Trụ Năm': 'cung Tổ Đức — nơi lưu giữ phúc đức ông bà, nền tảng gia tộc, và ảnh hưởng xã hội rộng lớn mà bạn thừa hưởng từ thế hệ trước',
    'Trụ Tháng': 'cung Phụ Mẫu kiêm cung Sự Nghiệp — trụ then chốt nhất trong việc luận đoán đường công danh, mối quan hệ với cấp trên, và vị thế nghề nghiệp',
    'Trụ Ngày': 'cung Bản Mệnh kiêm cung Phu Thê — Thiên Can trụ ngày chính là Nhật Chủ (bạn), còn Địa Chi trụ ngày là cung hôn nhân, đại diện cho người bạn đời và chất lượng đời sống vợ chồng',
    'Trụ Giờ': 'cung Tử Tức kiêm cung Hậu Vận — phản ánh mối quan hệ với con cái, đệ tử, và vận mệnh từ trung niên đến cuối đời',
  };

  const godEntries = uniqueGods
    .map((t) => {
      const info = THAP_THAN_MEANINGS[t.god as keyof typeof THAP_THAN_MEANINGS];
      if (!info) return '';
      const nature = t.godNature === 'cat' ? '✅ Cát Thần' : t.godNature === 'hung' ? '⚠️ Hung Thần' : '☯️ Trung Tính';
      const count = godCounts[t.god] || 1;
      const countNote = count > 1 ? ` (xuất hiện ${count} lần)` : '';
      const posLabel = t.position === 'can' ? 'Thiên Can' : 'Tàng Can';
      const pillarNote = pillarMeaning[t.pillar] || '';

      return `
<div class="bazi-star-card bazi-star-card--${t.godNature}">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4pt">
        <strong style="font-size:11pt;color:#1a1a2e">${esc(t.god)} (${esc(info.nameHan)})${countNote}</strong>
        <span style="font-size:8pt">${nature} · ${esc(t.pillar)} · ${posLabel}</span>
    </div>
    <p style="font-size:9pt;color:#555;margin:0"><strong>${esc(info.keyword)}</strong> — ${esc(info.meaning)}</p>
    <p style="font-size:8.5pt;color:#888;margin:4pt 0 0 0;font-style:italic">Can: ${esc(t.stem)} (${EL_EMOJI[t.stemElement]} ${esc(t.stemElement)})</p>
</div>

<p class="pdf-paragraph">Theo sách "Tam Mệnh Thông Hội" (三命通會) của Vạn Dân Anh thời Minh và "Trích Thiên Tủy" (滴天髓) — hai bộ kinh điển nền tảng của thuật Tử Bình — thì ${esc(t.god)} (${esc(info.nameHan)}) trong mệnh lý học là mối quan hệ giữa ${esc(t.stem)} (${esc(t.stemElement)}) với Nhật Chủ ${esc(chart.dayMaster.dayMaster)} (${esc(chart.dayMaster.dayMasterElement)}), thuộc dạng "${esc(info.keyword)}". ${esc(info.meaning)}. Khi vị thần này hiện diện trong lá số, nó không đơn thuần là một ký hiệu trên giấy — mà là một dòng năng lượng sống đang vận hành trong từng quyết định, từng mối quan hệ, và từng bước ngoặt cuộc đời bạn. Người xưa nói "mệnh do thiên định, vận do nhân tạo" — việc nhận biết ${esc(t.god)} trong lá số chính là bước đầu tiên để bạn hiểu "thiên mệnh" đang gửi gắm điều gì, từ đó chủ động "tạo vận" theo hướng có lợi nhất.</p>

<p class="pdf-paragraph">Biểu hiện tích cực: ${esc(info.positive)}. Bạn có thể đã nhận thấy những phẩm chất này trong bản thân. Tuy nhiên, mỗi ánh sáng đều kèm bóng tối — mặt tiêu cực cần cảnh giác: ${esc(info.negative)}. Người biết nhận diện cả hai mặt này sớm thường tránh được nhiều sai lầm không đáng có.</p>

<p class="pdf-paragraph">Về khía cạnh cuộc sống, ${esc(t.god)} chi phối trực tiếp: ${esc(info.lifeAspect)}. Trong lá số của bạn, ${esc(t.god)} tọa tại <strong>${esc(t.pillar)}</strong> — tức ${pillarNote} — ở vị trí <strong>${posLabel}</strong>. ${t.position === 'can' ? 'Khi một Thập Thần lộ ra ở Thiên Can, sách "Uyên Hải Tử Bình" (淵海子平) ghi rõ: đó là năng lượng "hiển lộ" — người ngoài nhìn vào bạn sẽ cảm nhận được ảnh hưởng của nó trong tính cách, cách giao tiếp, và phong thái bên ngoài. Bạn có thể đã từng được người khác nhận xét về những đặc điểm tương ứng mà không hiểu tại sao — câu trả lời nằm ngay đây.' : 'Khi một Thập Thần ẩn trong Tàng Can (tức nằm sâu bên trong Địa Chi), theo "Tử Bình Chân Thuyên" (子平真詮) của Thẩm Hiểu Chiêm, đây là năng lượng "tiềm tàng" — nó không lộ ra bề mặt nhưng âm thầm chi phối những quyết định quan trọng nhất. Bạn có thể không nhận ra tại sao mình bị hút về một hướng nào đó trong cuộc sống — nhưng chính Tàng Can này đang dẫn dắt bạn.'}${count > 1 ? ` Đặc biệt, ${esc(t.god)} xuất hiện <strong>${count} lần</strong> — điều mà các bậc thầy cổ đại gọi là "thần khí trùng phùng". Khi năng lượng một vị thần được nhân lên, nó trở thành chủ đề chính trong cuộc đời: mọi thành công và thách thức đều xoay quanh bản chất của vị thần này. Bạn không thể phớt lờ nó — bạn chỉ có thể học cách thuần phục và tận dụng nó.` : ''}</p>
`;
    })
    .filter(Boolean)
    .join('\n<div class="pdf-divider">✦</div>\n');

  const catGods = chart.thapThan.filter(t => t.godNature === 'cat');
  const hungGods = chart.thapThan.filter(t => t.godNature === 'hung');

  const groupAnalysis = `
    <div class="pdf-section">
        <h3 class="pdf-section-title">Tổng Luận Thập Thần — Bức Tranh Vận Mệnh</h3>
        <p class="pdf-paragraph">Theo phương pháp "Tổng Luận Bát Tự" trong sách "Mệnh Lý Ước Ngôn" (命理約言), khi nhìn tổng thể lá số, bạn có <strong>${chart.thapThan.length} vị trí Thập Thần</strong> gồm <strong>${catGods.length} cát thần</strong>, <strong>${hungGods.length} hung thần</strong>, và <strong>${chart.thapThan.length - catGods.length - hungGods.length} trung tính</strong>. ${catGods.length > hungGods.length ? 'Tổng thể lá số của bạn nghiêng về phía cát — năng lượng thuận lợi chiếm ưu thế, cho thấy một cuộc đời có nhiều quý nhân phù trợ và cơ hội đến tự nhiên. Tuy nhiên, người nhiều cát mà không biết trân trọng thường phung phí phúc lộc, trong khi người biết cảm ơn từng cơ hội nhỏ lại tích lũy được phúc đức dày.' : hungGods.length > catGods.length ? 'Lá số có nhiều hung thần hơn cát thần — nhưng đừng vội hoang mang. Kinh nghiệm cho thấy những lá số "khó" nhất lại sản sinh ra những con người mạnh mẽ nhất. Sách "Cùng Thông Bảo Giám" (窮通寶鑑) ghi: "hung thần chế hóa đắc nghi, phản thành đại quý" — hung thần nếu được chế hóa đúng cách, ngược lại trở thành quý cách.' : 'Cát hung cân bằng — đây là dạng lá số mà cổ nhân gọi là "trung hòa chi mệnh", cuộc đời không quá sóng gió nhưng cũng không quá bằng phẳng, tạo điều kiện cho sự phát triển bền vững.'}</p>
        <p class="pdf-paragraph">Điều then chốt mà "Trích Thiên Tủy" nhấn mạnh: Thập Thần không hoạt động riêng lẻ — chúng tương tác, kiềm chế, bổ trợ lẫn nhau như một hệ sinh thái. Thực Thần (sáng tạo) cần Chính Tài (thu nhập ổn) để biến tài năng thành giá trị; Chính Quan (kỷ luật) cần Chính Ấn (học vấn) để kỷ luật không trở thành cứng nhắc; Thất Sát (áp lực) cần Thực Thần (sáng tạo) để chế ngự — tạo nên cách cục "Thực Thần Chế Sát" nổi tiếng. Khi bạn hiểu được mạng lưới tương tác này trong lá số của mình, bạn sẽ thấy rõ TẠI SAO cuộc đời bạn diễn biến theo cách mà nó đã và đang diễn ra — và quan trọng hơn, bạn sẽ biết cách CHỌN phản ứng nào có lợi nhất trong từng hoàn cảnh.</p>
    </div>`;

  return `
<div class="pdf-chapter">
    <div class="pdf-chapter-header">
        <span class="pdf-chapter-emoji">⭐</span>
        <span class="pdf-chapter-number">Chương IV</span>
        <h2 class="pdf-chapter-title">Thập Thần — Mười Vị Thần</h2>
        <p class="pdf-chapter-subtitle">Mạng lưới quan hệ năng lượng xung quanh Nhật Chủ</p>
    </div>

    <p class="pdf-paragraph">Theo kinh điển "Uyên Hải Tử Bình" (淵海子平) của Từ Tử Bình thời Tống — ông tổ khai sáng trường phái Tử Bình mà ngày nay toàn bộ giới mệnh lý học đều kế thừa — Thập Thần (十神) là hệ thống phân loại mười mối quan hệ năng lượng giữa các Thiên Can trong lá số với Nhật Chủ, dựa trên nguyên lý Ngũ Hành sinh khắc và biến hóa Âm Dương. Mỗi vị thần không chỉ là một ký hiệu kỹ thuật — mà là một "nhân vật" sống động trong vở kịch cuộc đời bạn, đại diện cho tài lộc, quyền lực, sáng tạo, tri thức, hay tình bạn. Hiểu Thập Thần chính là hiểu "đội quân" năng lượng đang khiến bạn hành xử, quyết định, yêu thương, và phấn đấu theo cách riêng biệt không ai giống ai.</p>

    <p class="pdf-paragraph">Nguyên lý cốt lõi: Can cùng hành với Nhật Chủ là Tỉ Kiên/Kiếp Tài (anh em, bạn bè, đối thủ cạnh tranh ngang hàng); Can được Nhật Chủ sinh là Thực Thần/Thương Quan (con cái, tác phẩm sáng tạo, tiếng nói cá nhân); Can bị Nhật Chủ khắc là Chính Tài/Thiên Tài (nguồn tài lộc, vợ/chồng đối với nam giới); Can khắc Nhật Chủ là Chính Quan/Thất Sát (áp lực xã hội, cấp trên, chồng đối với nữ giới); Can sinh Nhật Chủ là Chính Ấn/Thiên Ấn (mẹ, thầy cô, kiến thức, sự bảo bọc). "Cùng Thông Bảo Giám" nhấn mạnh: "Thập Thần chi dụng, tại hồ phối hợp" — công dụng của Thập Thần nằm ở sự phối hợp, không phải ở từng vị đơn lẻ.</p>

    ${godEntries}

    ${groupAnalysis}
</div>`;
}


// ── Ch V: Tàng Can & Branch Interactions ──────────────────────
export function generateTangCanChapter(chart: BaziChart): string {
  const pNames = ['Trụ Năm', 'Trụ Tháng', 'Trụ Ngày', 'Trụ Giờ'];
  const pDomains = [
    'cung Tổ Đức — phản ánh phúc đức ông bà, nguồn gốc gia tộc, và nền tảng tinh thần bạn thừa hưởng từ dòng họ. Những tài năng ẩn giấu ở đây thường là "gen trội" được truyền qua nhiều thế hệ',
    'cung Phụ Mẫu kiêm Sự Nghiệp — đây là trụ quan trọng nhất khi luận đoán đường công danh. Tàng Can ở đây tiết lộ những kỹ năng ngầm có thể đưa bạn lên đỉnh cao nếu được khai phá đúng thời điểm',
    'cung Phu Thê — Địa Chi trụ ngày chính là "ngôi nhà" của hôn nhân. Tàng Can bên trong cho thấy những gì bạn thực sự tìm kiếm ở một người bạn đời — đôi khi khác hoàn toàn với những gì bạn nghĩ mình muốn',
    'cung Tử Tức — phản ánh con cái và hậu vận. Tàng Can ở đây cho thấy mối quan hệ sâu xa với thế hệ sau và chất lượng cuộc sống nửa cuối đời',
  ];

  const tangCanHtml = chart.tangCan
    .map((tc, i) => {
      const stems = tc.hiddenStems
        .map(
          (hs) =>
            `<span style="display:inline-block;padding:3pt 8pt;margin:2pt;border-radius:4pt;font-size:9pt;background:${EL_COLOR[hs.element]}15;color:${EL_COLOR[hs.element]};border:1px solid ${EL_COLOR[hs.element]}30">${EL_EMOJI[hs.element]} ${esc(hs.can)} (${esc(hs.strength === 'chính_khí' ? 'Chính Khí' : hs.strength === 'trung_khí' ? 'Trung Khí' : 'Dư Khí')})</span>`,
        )
        .join(' ');
      const pName = pNames[i] || '';
      const pDomain = pDomains[i] || '';
      const chinhKhi = tc.hiddenStems.find(h => h.strength === 'chính_khí');
      const subStems = tc.hiddenStems.filter(h => h.strength !== 'chính_khí');
      return `
<div style="margin-bottom:10pt;page-break-inside:avoid">
    <strong style="font-size:10pt">${esc(tc.chi)} (${pName})</strong>: ${stems}

    <p class="pdf-paragraph">Theo sách "Uyên Hải Tử Bình" và "Tam Mệnh Thông Hội", Địa Chi <strong>${esc(tc.chi)}</strong> tại ${pName} thuộc phạm vi ${pDomain}. Chi này chứa ${tc.hiddenStems.length} tầng Tàng Can — như một căn phòng bí mật có ${tc.hiddenStems.length} tầng, mỗi tầng giấu một nguồn năng lượng khác nhau. ${chinhKhi ? `Tầng chủ đạo là <strong>Chính Khí ${esc(chinhKhi.can)}</strong> (${EL_EMOJI[chinhKhi.element]} ${esc(chinhKhi.element)}), chiếm khoảng 60% sức ảnh hưởng — đây là "chủ nhân thực sự" của chi này, quyết định hương vị năng lượng chính.` : ''} ${subStems.length > 0 ? `Bên dưới còn ẩn ${subStems.map(s => `${esc(s.can)} (${s.strength === 'trung_khí' ? 'Trung Khí — ~30% ảnh hưởng, như phụ tá đắc lực' : 'Dư Khí — ~10% ảnh hưởng, như gia vị tinh tế'})`).join(' và ')}. Sự kết hợp các tầng năng lượng này tạo nên một bức chân dung phức tạp — và chính sự phức tạp đó mới phản ánh đúng con người thật của bạn, với nhiều góc khuất mà ngay cả bạn cũng chưa hoàn toàn khám phá.` : 'Chi này chỉ chứa một tàng can duy nhất — năng lượng thuần khiết, tập trung, và mạnh mẽ. Người có nhiều chi đơn nhất như vậy thường có tính cách rõ ràng, quyết đoán, và ít mâu thuẫn nội tâm.'}</p>
</div>`;
    })
    .join('');

  const interactionHtml =
    chart.branchInteractions.length > 0
      ? chart.branchInteractions
        .map(
          (bi: BranchInteraction) => `
<div class="bazi-star-card bazi-star-card--${bi.nature}">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4pt">
        <strong style="font-size:10pt">${esc(bi.typeLabel)}</strong>
        <span style="font-size:8pt">${bi.nature === 'cat' ? '✅ Cát' : bi.nature === 'hung' ? '⚠️ Hung' : '☯️ Trung'} · ${bi.pillars.map((p) => esc(p)).join(' ↔ ')}</span>
    </div>
    <p style="font-size:9.5pt;color:#555;line-height:1.7;margin:0">${esc(bi.branches.join(' — '))} — ${esc(bi.description)}</p>
</div>
<p class="pdf-paragraph">Theo sách "Duyên Bình Lý Số" và phép luận "Địa Chi Tương Tác" trong "Tam Mệnh Thông Hội", tương tác <strong>${esc(bi.typeLabel)}</strong> giữa ${bi.branches.map(b => '<strong>' + esc(b) + '</strong>').join(' và ')} (xuất hiện tại ${bi.pillars.map(p => esc(p)).join(' và ')}) là một hiện tượng có ý nghĩa sâu sắc trong lá số. ${bi.nature === 'cat' ? 'Đây là mối tương tác cát — hai chi hòa hợp, bổ trợ, và tăng cường sức mạnh cho nhau như đôi cánh của con chim. Trong cuộc sống thực, điều này biểu hiện qua những mối quan hệ thuận lợi, cơ hội đến một cách tự nhiên, và cảm giác "mọi thứ đang vào đúng chỗ." Khi một vị thầy có kinh nghiệm nhìn thấy tương hợp này trong lá số, điều đầu tiên họ nói là: "Bạn có phúc." Nhưng phúc chỉ trọn vẹn khi bạn biết trân trọng và hành động xứng đáng — đừng để dòng nước thuận lợi chảy qua mà không tận dụng. Hãy tìm đúng thời điểm Đại Vận thuận lợi tiếp theo và chuẩn bị sẵn kế hoạch, vì khi "hợp" gặp vận tốt, đó là lúc đại cát đại lợi.' : bi.nature === 'hung' ? 'Đây là mối tương xung/hình — hai chi va chạm, tạo ra ma sát và biến động. Trong cuộc sống, bạn có thể nhận ra mô hình này qua những giai đoạn cảm thấy "bị kéo hai hướng ngược nhau," xung đột nội tâm, hoặc những biến cố bất ngờ buộc bạn phải thay đổi. Tuy nhiên, sách "Cùng Thông Bảo Giám" ghi rõ: "Xung giả, động dã; động giả, biến dã" — xung là động, động là biến, và biến đổi chính là cơ hội lột xác. Nhiều bước ngoặt lớn nhất trong cuộc đời — thăng chức, thay đổi ngành nghề, gặp người tri kỷ — đều xảy ra vào lúc xung động mạnh nhất. Chìa khóa: đừng kháng cự thay đổi, hãy cưỡi lên nó.' : 'Đây là mối tương tác trung tính — có thể nghiêng cát hoặc hung tùy thuộc bối cảnh tổng thể lá số và giai đoạn Đại Vận hiện tại. Cần xem xét kỹ hơn trong mối liên hệ với toàn bộ tứ trụ để đưa ra kết luận chính xác.'}</p>`,
        )
        .join('')
      : '<p class="pdf-paragraph">Theo quan sát, lá số của bạn không có tương tác đặc biệt giữa các Địa Chi — trong "Trích Thiên Tủy" gọi đây là "tĩnh cuộc" (静局). Bố cục năng lượng ổn định, ít biến động từ bên ngoài. Cuộc đời bạn ít gặp những biến cố đột ngột, nhưng cũng ít có bước đột phá từ "ngoại lực." Thành tựu chủ yếu đến từ nỗ lực cá nhân và sự kiên trì — bạn là kiến trúc sư chính của cuộc đời mình, không phụ thuộc vào may rủi.</p>';

  const kvHtml = chart.khongVong
    ? `
    <div class="pdf-section">
        <h3 class="pdf-section-title">Không Vong (空亡) — Vùng Năng Lượng Huyền Vi</h3>
        <p class="pdf-paragraph">Theo "Mệnh Lý Tầm Nguyên" và "Tam Mệnh Thông Hội", hai chi Không Vong trong lá số của bạn là <strong>${esc(chart.khongVong.branch1)}</strong> và <strong>${esc(chart.khongVong.branch2)}</strong>. ${esc(chart.khongVong.explanation)}. Không Vong (空亡) — nghĩa đen là "trống rỗng, mất hút" — là khái niệm huyền vi nhất trong Bát Tự. Mỗi Tuần (10 ngày trong lục thập Giáp Tý) dùng hết 10 Can nhưng chỉ dùng 10 trong 12 Chi, để lại 2 Chi "thừa ra" — đó chính là Không Vong. Khi chi Không Vong rơi vào trụ nào, khía cạnh cuộc sống tương ứng có thể "trống" — không phải mất hẳn, mà là cần nỗ lực gấp đôi để lấp đầy, như gieo hạt trên đất cằn hơn.</p>
        <p class="pdf-paragraph">Tuy nhiên, trong kinh nghiệm thực tế, Không Vong đôi khi lại là phúc lớn ẩn giấu. Sách "Lý Hư Trung Mệnh Thư" ghi: "Không Vong phùng hung, phản thành cát" — Không Vong gặp hung thần, ngược lại thành tốt. Nghĩa là nếu một sao hung chiếu vào chi Không Vong, sức mạnh sao hung bị "nuốt chửng" bởi khoảng trống, giống như ném đá xuống giếng không đáy. Đây là cơ chế "hóa giải" tự nhiên mà tạo hóa ban cho lá số — một sự cân bằng tinh tế mà chỉ khi phân tích sâu mới nhận ra.</p>
    </div>`
    : '';

  return `
<div class="pdf-chapter">
    <div class="pdf-chapter-header">
        <span class="pdf-chapter-emoji">🔮</span>
        <span class="pdf-chapter-number">Chương V</span>
        <h2 class="pdf-chapter-title">Tàng Can & Tương Tác Địa Chi</h2>
        <p class="pdf-chapter-subtitle">Năng lượng ẩn và mối liên kết giữa các trụ</p>
    </div>

    <p class="pdf-paragraph">Theo sách "Tử Bình Chân Thuyên" (子平真詮) của Thẩm Hiểu Chiêm — một trong những tác phẩm được giới mệnh lý học tôn sùng nhất — nếu Thiên Can là "bề nổi" của lá số, là những gì thế giới nhìn thấy ở bạn, thì Tàng Can (藏干) chính là "bề chìm" — là con người thật ẩn sâu bên trong, nơi giấu kín những tài năng, khao khát, và cả những nỗi sợ mà bạn hiếm khi thừa nhận. Mỗi Địa Chi chứa từ 1 đến 3 Thiên Can ẩn bên trong, như một hòm kho báu với nhiều ngăn bí mật. Hệ thống phân cấp gồm ba tầng: Chính Khí (năng lượng chủ đạo, chiếm ~60% ảnh hưởng), Trung Khí (~30%), và Dư Khí (~10%) — tương tự như ý thức, tiềm thức, và vô thức trong tâm lý học phương Tây của Carl Jung.</p>

    <p class="pdf-paragraph">Trong suốt 50 năm hành nghề, tôi nhận thấy một quy luật: người ta thường NGHĨ mình là Thiên Can (vẻ ngoài, hình ảnh công chúng), nhưng thực sự SỐNG như Tàng Can (động lực sâu xa, quyết định quan trọng). Một doanh nhân có Thiên Can Mộc (hiền lành, mềm mỏng) nhưng Tàng Can toàn Kim (cứng rắn, sắc bén) — bề ngoài dễ chịu nhưng trong phòng họp thì quyết đoán đến mức người khác ngạc nhiên. Việc phân tích Tàng Can sẽ cho bạn câu trả lời cho một trong những câu hỏi khó nhất: "Tại sao đôi khi tôi hành xử khác hoàn toàn với hình ảnh mà tôi tự xây dựng?"</p>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Tàng Can — Giải Mã Từng Trụ</h3>
        ${tangCanHtml}
    </div>

    <div class="pdf-section">
        <h3 class="pdf-section-title">Tương Tác Địa Chi — Hợp, Xung, Hình, Hại</h3>
        <p class="pdf-paragraph">Theo chương "Địa Chi Hội Hợp" trong "Tam Mệnh Thông Hội", các Địa Chi trong lá số không bao giờ tồn tại cô lập — chúng liên tục tương tác qua bốn dạng: Hợp (kết hôi, hòa nhập, hóa hành mới), Xung (đối đầu trực diện), Hình (tổn thương âm ỉ từ bên trong), và Hại (cản trở ngấm ngầm khó nhận ra). Tương tác Địa Chi là "yếu tố động" quan trọng nhất — nó quyết định lá số của bạn "sống" hay "chết", "động" hay "tĩnh." Một lá số có nhiều Hợp thường an lành nhưng ít đột phá; nhiều Xung thường biến động nhưng đầy cơ hội thay đổi; nhiều Hình thường có nội tâm phức tạp; nhiều Hại thường gặp "tiểu nhân" cản trở. Đặc biệt, vị trí tương tác (giữa hai trụ nào) cho biết khía cạnh cuộc sống nào bị ảnh hưởng trực tiếp nhất.</p>
        ${interactionHtml}
    </div>

    ${kvHtml}
</div>`;
}



// ── Ch VI: Thần Sát ───────────────────────────────────────────
export function generateThanSatChapter(chart: BaziChart): string {
  const THAN_SAT_ORIGIN: Record<string, string> = {
    'Đào Hoa': 'Theo "Tam Mệnh Thông Hội" quyển 36 — chương "Luận Hàm Trì (Đào Hoa)" — thì Đào Hoa là ngôi sao của sắc đẹp, sức quyến rũ, và tài hoa nghệ thuật. Người có Đào Hoa trong mệnh thường mang vẻ duyên dáng tự nhiên, nói năng lưu loát, và có khả năng thu hút người khác như nam châm hút sắt. Biểu hiện tích cực: tài năng nghệ thuật, giao tiếp xuất sắc, sức hút tự nhiên trong kinh doanh và xã giao. Biểu hiện tiêu cực: dễ sa vào cám dỗ tình cảm, nhiều mối quan hệ phức tạp, hoặc quá phụ thuộc vào ngoại hình. Trong cuộc sống thực, bạn có thể đã nhận ra rằng mình "dễ gây thiện cảm" với người mới gặp — đó chính là Đào Hoa đang hoạt động. Chìa khóa: hãy dùng sức hút này cho sự nghiệp và mối quan hệ ý nghĩa, đừng để nó trở thành nguyên nhân của rắc rối tình cảm.',
    'Dịch Mã': 'Theo "Uyên Hải Tử Bình" chương "Luận Thần Sát", Dịch Mã (驛馬) là ngôi sao di chuyển, bắt nguồn từ hệ thống trạm dịch cổ đại. Người có Dịch Mã trong lá số hiếm khi ngồi yên một chỗ — cuộc đời họ là chuỗi hành trình, thay đổi, và khám phá. Biểu hiện tích cực: cơ hội từ phương xa, sự nghiệp quốc tế, khả năng thích nghi tuyệt vời, và thành công nhờ di chuyển. Biểu hiện tiêu cực: bất ổn, khó gắn bó lâu dài với một nơi hoặc một người, tinh thần "cỏ bên kia luôn xanh hơn." Trong cuộc sống của bạn, Dịch Mã ảnh hưởng đến thôi thúc muốn thay đổi môi trường, du lịch, hoặc tìm kiếm cái mới — hãy nhận ra đó không phải "bất ổn" mà là bản chất vận mệnh.',
    'Thiên Ất Quý Nhân': 'Theo "Tam Mệnh Thông Hội" chương "Luận Thiên Ất Quý Nhân" — đây được xem là ngôi sao may mắn bậc nhất trong toàn bộ hệ thống Thần Sát: "Thiên Ất giả, thiên thượng chi thần, tại tử vi viên trung, dĩ khiêm thu vạn loại" — Thiên Ất là vị thần trên trời, ngự trong cung Tử Vi, khiêm nhường mà thu phục vạn vật. Biểu hiện tích cực: được quý nhân giúp đỡ vào những lúc khó khăn nhất, gặp may bất ngờ, hóa hung thành cát. Biểu hiện tiêu cực: gần như không có — đây là ngôi sao thuần cát hiếm hoi. Trong cuộc đời bạn, hãy hồi tưởng lại những khoảnh khắc "suýt gặp nạn nhưng thoát nạn," "gần bỏ cuộc nhưng có người xuất hiện giúp đỡ" — đó là Thiên Ất đang hoạt động.',
    'Hồng Diễm': 'Theo "Mệnh Lý Tầm Nguyên", Hồng Diễm là sao của sắc đẹp nồng nàn và sức hấp dẫn mãnh liệt. Khác với Đào Hoa (duyên dáng, nghệ thuật), Hồng Diễm nghiêng về "ma lực" — một sức hút không giải thích được bằng lý trí. Biểu hiện tích cực: sự quyến rũ tự nhiên, thành công trong ngành giải trí, nghệ thuật, và quan hệ công chúng. Biểu hiện tiêu cực: dễ gặp phức tạp tình cảm, đặc biệt trong hôn nhân. Nếu bạn từng cảm thấy các mối quan hệ tình cảm của mình "không bao giờ đơn giản", Hồng Diễm có thể là lời giải thích.',
    'Kim Dư': 'Theo "Tam Mệnh Thông Hội", Kim Dư (金輿) là ngôi sao của xe vàng — tượng trưng cho sự bảo vệ và an toàn. Người có Kim Dư trong lá số thường được che chở khỏi tai nạn giao thông, nguy hiểm thể xác, và những rủi ro bất ngờ. Biểu hiện tích cực: an toàn trong di chuyển, sức khỏe tốt, ít gặp tai nạn. Đây là sao bảo hộ âm thầm mà bạn hiếm khi nhận ra — cho đến khi nhìn lại và thấy mình đã vượt qua nhiều tình huống nguy hiểm một cách may mắn.',
    'Kiếp Sát': 'Theo "Uyên Hải Tử Bình" chương "Luận Kiếp Sát", đây là ngôi sao thách thức — mang năng lượng quyết liệt và đôi khi tàn nhẫn. Biểu hiện tích cực: ý chí sắt đá, khả năng vượt qua nghịch cảnh phi thường, bản lĩnh quân sự và lãnh đạo. Biểu hiện tiêu cực: tính khí nóng nảy, dễ gặp tai nạn hoặc xung đột. Kiếp Sát không xấu hoàn toàn — trong suốt 50 năm luận mệnh, tôi thấy nhiều người thành đạt lớn có Kiếp Sát vì chính sức mạnh khốc liệt này tạo ra bản lĩnh phi thường.',
  };

  const starCards = chart.thanSat
    .map(
      (ts: ThanSat) => {
        const origin = THAN_SAT_ORIGIN[ts.nameVi] || '';
        return `
<div class="bazi-star-card bazi-star-card--${ts.nature}">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4pt">
        <strong style="font-size:11pt;color:#1a1a2e">${esc(ts.nameVi)}</strong>
        <span style="font-size:8pt">${ts.nature === 'cat' ? '✅ Cát Tinh' : ts.nature === 'hung' ? '⚠️ Hung Tinh' : '☯️ Trung Tính'} · ${esc(ts.pillar)}</span>
    </div>
    <p style="font-size:9.5pt;color:#555;line-height:1.7;margin:0">${esc(ts.description)}</p>
</div>
${origin ? `<p class="pdf-paragraph">${origin}</p>` : `<p class="pdf-paragraph">Theo các sách mệnh lý cổ điển, ${esc(ts.nameVi)} trong lá số Bát Tự là ngôi sao ${ts.nature === 'cat' ? 'cát — mang đến sự bảo hộ, may mắn, và hỗ trợ tinh thần. Bạn có thể đã từng trải nghiệm ảnh hưởng tích cực của nó mà không nhận ra — những lúc "may mắn đến bất ngờ" hoặc "gặp đúng người đúng thời điểm." Hãy trân trọng phúc lành này và biến nó thành động lực để giúp đỡ người khác, vì theo triết lý nhân quả phương Đông, phúc đức chia sẻ là phúc đức nhân đôi.' : ts.nature === 'hung' ? 'hung — mang đến thách thức và bài học đắt giá. Tuy nhiên, sách "Cùng Thông Bảo Giám" dạy: "Hung thần đắc chế, phản thành đại quý" — hung thần nếu được chế ngự đúng cách, ngược lại trở thành nguồn sức mạnh lớn. Trong kinh nghiệm 50 năm hành nghề, tôi nhận thấy nhiều nhà lãnh đạo lỗi lạc, doanh nhân thành đạt, và nghệ sĩ tài hoa đều mang hung tinh trong lá số — chính áp lực từ hung tinh đã rèn giũa nên bản lĩnh phi thường.' : 'trung tính — ảnh hưởng phụ thuộc vào bối cảnh tổng thể lá số và giai đoạn Đại Vận hiện tại. Cần xem xét mối liên hệ với các sao khác để đánh giá chính xác.'}`}`;
      },
    )
    .join('\n<div class="pdf-divider">✦</div>\n');

  const _catStars = chart.thanSat.filter(ts => ts.nature === 'cat');
  const _hungStars = chart.thanSat.filter(ts => ts.nature === 'hung');

  return `
<div class="pdf-chapter">
    <div class="pdf-chapter-header">
        <span class="pdf-chapter-emoji">🌟</span>
        <span class="pdf-chapter-number">Chương VI</span>
        <h2 class="pdf-chapter-title">Thần Sát — Sao Chiếu Mệnh</h2>
        <p class="pdf-chapter-subtitle">Những ngôi sao đặc biệt trong lá số của bạn</p>
    </div>

    <p class="pdf-paragraph">Theo sách "Tam Mệnh Thông Hội" (三命通會) của Vạn Dân Anh thời Minh — bộ bách khoa toàn thư lớn nhất về mệnh lý học Trung Hoa — Thần Sát (神煞) là hệ thống "sao chiếu mệnh" được tính từ các công thức cổ xưa, phản ánh những "lực lượng vũ trụ" đang tác động lên một cá nhân. Khác với Thập Thần (dựa trên logic Ngũ Hành sinh khắc), Thần Sát bắt nguồn từ quan sát thiên văn và kinh nghiệm thực tế tích lũy qua hàng nghìn năm. Mỗi Thần Sát mang một "câu chuyện" riêng — có sao bảo hộ như lá chắn vô hình, có sao thách thức như ngọn lửa thử vàng, và có sao trung tính như gương phản chiếu. Trong lá số của bạn có <strong>${chart.thanSat.length}</strong> Thần Sát — mỗi ngôi sao là một chương trong cuốn tiểu thuyết vận mệnh của bạn.</p>

    <p class="pdf-paragraph">Lưu ý quan trọng mà tôi luôn nhấn mạnh với mọi khách hàng: Thần Sát có phần "cổ điển" và cần được diễn giải linh hoạt trong bối cảnh hiện đại. Sách "Trích Thiên Tủy" — tác phẩm được Lưu Bá Ôn thời Minh tôn vinh — dạy: "Cát hung thần sát, hà dĩ luận? Tùy kỳ mệnh cục nhi quyền hành" — Cát hung Thần Sát, lấy gì mà luận? Phải tùy theo mệnh cục mà linh hoạt. Nghĩa là đừng thấy hung tinh mà hoảng, đừng thấy cát tinh mà ỷ lại — hãy đọc từng phân tích dưới đây và tự soi chiếu vào cuộc sống thực tế của bạn để tìm ra sự cộng hưởng.</p>

    ${starCards}
</div>`;
}



// ── Ch VII: Executive Summary ──────────────────────────────────
export function generateBaziExecutiveSummaryChapter(summary: ExecutiveSummaryBlock): string {
  return `
<div class="pdf-chapter">
    <div class="pdf-chapter-header">
        <span class="pdf-chapter-emoji">✨</span>
        <span class="pdf-chapter-number">Chương VII</span>
        <h2 class="pdf-chapter-title">${esc(summary.title)}</h2>
        <p class="pdf-chapter-subtitle">Bức tranh toàn cảnh về năng lượng gốc</p>
    </div>

    <div class="pdf-section" style="background:#fdfcf0; border-left:4px solid #b69255; padding:15pt; margin-bottom:20pt; border-radius:4pt;">
        <h3 style="color:#1a1a2e; margin-top:0; margin-bottom:10pt; font-size:12pt;">
            BẢN MỆNH CỐT LÕI: <span style="color:#b69255">${esc(summary.coreArchetype)}</span>
        </h3>
        <p class="pdf-paragraph" style="margin-bottom:0"><strong>Định Hướng Sự Nghiệp:</strong> ${esc(summary.careerDirection)}</p>
    </div>

    <p class="pdf-paragraph" style="font-size:11.5pt; line-height:1.8; color:#333;">
        ${esc(summary.summaryParagraph)}
    </p>

    <div class="pdf-pullquote">
        "LỜI KHUYÊN CỐT LÕI: ${esc(summary.coreAdvice)}"
    </div>
</div>`;
}

// ── Ch VIII: 12 Life Domains (ETC Format) ────────────────────
export function generateBazi12DomainsChapter(domains: CategoryReading[]): string {
  const domainHtml = domains.map(d => {
    // Translate domain keys
    const titleMap: Record<string, string> = {
      personality: 'BẢN MỆNH & TÍNH CÁCH',
      parents: 'PHỤ MẪU & GIA ĐẠO',
      karma: 'PHÚC ĐỨC & CỘI NGUỒN',
      property: 'ĐIỀN TRẠCH & TÀI SẢN',
      career: 'QUAN LỘC & SỰ NGHIỆP',
      servants: 'NÔ BỘC & ĐỒNG NGHIỆP',
      travel: 'THIÊN DI & XÃ HỘI',
      health: 'TẬT ÁCH & SỨC KHỎE',
      wealth: 'TÀI BẠCH & DÒNG TIỀN',
      children: 'TỬ TỨC & SÁNG TẠO',
      love: 'PHU THÊ & TÌNH TRƯỜNG',
      siblings: 'HUYNH ĐỆ & BẠN BÈ'
    };
    
    const emojiMap: Record<string, string> = {
      personality: '👤', parents: '🌳', karma: '☸️', property: '🏠',
      career: '💼', servants: '👥', travel: '✈️', health: '🌿',
      wealth: '💎', children: '🌱', love: '💕', siblings: '🤝'
    };

    const title = titleMap[d.area] || d.area.toUpperCase();
    const emoji = emojiMap[d.area] || '✨';

    const phtml = d.paragraphs.map(p => {
      let html = `<p class="pdf-paragraph" style="margin-bottom:6pt;">`;
      if (p.hook) html += `<strong style="color:#1a1a2e;">${esc(p.hook)}</strong> `;
      if (p.effectParagraphs) html += esc(p.effectParagraphs.join(' '));
      html += `</p>`;
      
      let extra = ``;
      if (p.nuance || p.cause) {
        extra += `<div style="background:#f7f7f9; padding:8pt 12pt; border-left:3px solid #666; font-size:9.5pt; color:#555; margin-bottom:8pt;">`;
        if (p.nuance) extra += `<p style="margin:0 0 4pt 0;"><em>Mặt trái/Lưu ý:</em> ${esc(p.nuance)}</p>`;
        if (p.cause) extra += `<p style="margin:0;"><em>Nền tảng lá số:</em> ${esc(p.cause)}</p>`;
        extra += `</div>`;
      }
      if (p.tip) {
        extra += `<p class="pdf-paragraph" style="font-weight:600; color:#b69255; font-size:10pt;">💡 Lài khuyên: ${esc(p.tip)}</p>`;
      }
      
      return html + extra;
    }).join('\n');

    return `
    <div class="pdf-section" style="page-break-inside:avoid; margin-bottom:25pt;">
        <h3 class="pdf-section-title" style="border-bottom:1px solid #eee; padding-bottom:5pt;">
            ${emoji} ${esc(title)}
        </h3>
        ${phtml}
    </div>`;
  }).join('');

  return `
<div class="pdf-chapter">
    <div class="pdf-chapter-header">
        <span class="pdf-chapter-emoji">🌐</span>
        <span class="pdf-chapter-number">Chương VIII</span>
        <h2 class="pdf-chapter-title">Phân Tích 12 Lĩnh Vực Cuộc Sống</h2>
        <p class="pdf-chapter-subtitle">Giải mã chi tiết dòng chảy vận mệnh</p>
    </div>
    
    <p class="pdf-paragraph">Mỗi khía cạnh trong cuộc sống của bạn đều chịu sự chi phối của một trường năng lượng nhất định từ Tứ Trụ. Dưới đây là bức tranh toàn cảnh về 12 lĩnh vực trọng thiết nhất, giúp bạn chủ động kiến tạo vận mệnh của mình.</p>

    ${domainHtml}
</div>`;
}
