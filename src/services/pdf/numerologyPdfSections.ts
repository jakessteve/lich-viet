/**
 * Numerology PDF Sections — Chapter generators for ~25-page report
 *
 * Each function generates one chapter of the Thần Số Học PDF.
 * Follows the Bát Tự PDF architecture with engine-aware data.
 */

import type { NumerologyProfile, PinnacleCycleResult, ChallengeCycleResult } from '@lich-viet/core/numerology';
import { POSITION_MEANINGS } from '../../data/interpretation/numerology/positionMeanings';
import { KARMIC_DEBT_PROFILES } from '../../data/interpretation/numerology/karmicDebt';
import { MASTER_NUMBER_PROFILES } from '../../data/interpretation/numerology/masterNumbers';
import { ARROW_INTERPRETATIONS, MISSING_NUMBER_MEANINGS } from '../../data/interpretation/numerology/arrowInterpretations';
import { PINNACLE_MEANINGS, CHALLENGE_MEANINGS, LIFE_PERIOD_MEANINGS } from '../../data/interpretation/numerology/pinnacleChallenge';
import { PERSONAL_YEAR_MEANINGS, PERSONAL_MONTH_MEANINGS } from '../../data/interpretation/numerology/personalCycles';
import type { NumerologyPosition } from '../../data/interpretation/numerology/types';
import { POSITION_META } from '../../data/interpretation/numerology/types';
import type { FullNarrativeProfile, EnrichedCoreNumber } from '../numerology/numerologyNarrativeProvider';
import { esc } from './pdfStyles';
import { generateNumerologyExecutiveSummary, analyzeNumerologyLifeAreas } from '../numerology/numerologyLifeAreas';

const POS_ICON: Record<NumerologyPosition, string> = {
    lifePath: '🛤️', expression: '🎭', soulUrge: '💖',
    personality: '🪞', birthday: '🎂', maturity: '🌳',
};

// ── Extra CSS for Numerology-specific elements ───────────────
export function getNumerologyExtraCSS(): string {
    return `
.num-core-card { padding: 12pt 16pt; border-radius: 8pt; margin-bottom: 14pt; page-break-inside: avoid; border-left: 4px solid; background: #fafafa; }
.num-core-card--master { border-color: #8b5cf6; background: #f5f3ff; }
.num-core-card--karmic { border-color: #ef4444; background: #fef2f2; }
.num-core-card--normal { border-color: #3b82f6; background: #eff6ff; }
.num-grid-table { border-collapse: collapse; margin: 16pt auto; }
.num-grid-table td { width: 50pt; height: 50pt; border: 2px solid #e5e5ea; text-align: center; font-size: 14pt; font-weight: 700; }
.num-grid-table td.num-present { background: #dbeafe; color: #1d4ed8; }
.num-grid-table td.num-missing { background: #fef2f2; color: #dc2626; opacity: 0.4; }
.num-arrow-badge { display: inline-block; padding: 4pt 12pt; border-radius: 16pt; margin: 3pt; font-size: 9pt; font-weight: 600; background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
.num-missing-badge { display: inline-block; padding: 4pt 12pt; border-radius: 16pt; margin: 3pt; font-size: 9pt; font-weight: 600; background: #fef2f2; color: #ef4444; border: 1px solid #fecaca; }
.num-cycle-card { padding: 10pt 14pt; border-radius: 6pt; margin-bottom: 8pt; page-break-inside: avoid; border: 1px solid #e5e5ea; }
.num-cycle-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6pt; }
.num-period-badge { font-size: 9pt; font-weight: 600; padding: 2pt 10pt; border-radius: 12pt; background: #dbeafe; color: #1d4ed8; }
.num-interaction-card { padding: 8pt 12pt; border-radius: 6pt; margin-bottom: 8pt; border: 1px solid #e5e5ea; page-break-inside: avoid; }
.num-interaction-card--synergy { border-left: 3px solid #22c55e; background: #f0fdf4; }
.num-interaction-card--tension { border-left: 3px solid #ef4444; background: #fef2f2; }
.num-interaction-card--complementary { border-left: 3px solid #f59e0b; background: #fffbeb; }
`;
}

// ── Ch 0: Cover ───────────────────────────────────────────────
export function generateNumerologyCover(profile: NumerologyProfile, userName: string): string {
    const dateStr = profile.birthDate.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return `
<div class="pdf-cover">
    <div class="pdf-cover-logo">🔮</div>
    <h1 class="pdf-cover-title">Bản Phân Tích Thần Số Học</h1>
    <p class="pdf-cover-subtitle">Hệ thống ${profile.system === 'pythagorean' ? 'Pythagoras' : 'Chaldean'}</p>
    <div class="pdf-cover-divider"></div>
    <p class="pdf-cover-name">${esc(userName || profile.fullName)}</p>
    <p class="pdf-cover-date">Ngày sinh: ${dateStr}</p>
    <p class="pdf-cover-meta">Số Chủ Đạo: ${profile.lifePath.value} · Số Biểu Đạt: ${profile.expression.value} · Số Linh Hồn: ${profile.soulUrge.value}</p>
</div>`;
}

// ── Ch 1: Executive Summary ───────────────────────────────────────────────
export function generateNumerologyExecutiveSummaryChapter(profile: NumerologyProfile): string {
    const summary = generateNumerologyExecutiveSummary(profile);
    
    return `
<div class="pdf-chapter-break"></div>
<h2 class="pdf-chapter-title">Chương 1</h2>
<h3 class="pdf-chapter-subtitle">Tóm Tắt Tổng Quan (Executive Summary)</h3>
<p class="pdf-chapter-tagline">Bức tranh toàn cảnh về nhân cách và sứ mệnh của bạn</p>

<div class="pdf-highlight-box" style="margin-bottom: 24pt;">
    <h4 style="font-size: 14pt; color: var(--color-primary); margin-bottom: 12pt;">Hồ Sơ Năng Lượng Rung Động</h4>
    <ul style="list-style-type: none; padding-left: 0; margin-bottom: 12pt;">
        <li style="margin-bottom: 8pt;"><strong>Định hình:</strong> ${esc(summary.coreArchetype)}</li>
        <li style="margin-bottom: 8pt;"><strong>Hướng đi chính:</strong> ${esc(summary.lifePathFocus)}</li>
        <li style="margin-bottom: 8pt;"><strong>Phong cách:</strong> ${esc(summary.expressionStyle)}</li>
        <li style="margin-bottom: 8pt;"><strong>Động lực ẩn sâu:</strong> ${esc(summary.soulMotivation)}</li>
    </ul>
    <p style="font-size: 11pt; color: #4b5563; font-weight: 500; font-style: italic; background: #f3f4f6; padding: 12pt; border-left: 4px solid var(--color-primary);">${esc(summary.summaryParagraph)}</p>
</div>

<h4 class="pdf-h4">Lời Khuyên Cốt Lõi</h4>
<p class="pdf-paragraph">${esc(summary.coreAdvice)}</p>
`;
}

// ── Ch 0.5: TOC ───────────────────────────────────────────────
export function generateNumerologyToc(): string {
    return `
<div class="pdf-toc">
    <h2 class="pdf-toc-title">Mục Lục</h2>
    <ol class="pdf-toc-list">
        <li>Tóm Tắt Tổng Quan</li>
        <li>Giới Thiệu Phương Pháp</li>
        <li>Các Con Số Cốt Lõi</li>
        <li>Bảng Ngày Sinh & Mũi Tên</li>
        <li>Các Con Số Thiếu & Bài Học</li>
        <li>Đỉnh Cao & Thử Thách Cuộc Đời</li>
        <li>Chu Kỳ Cá Nhân</li>
        <li>Tương Tác Giữa Các Con Số</li>
        <li>Phân Tích Đời Sống (Life Areas)</li>
        <li>Nghiệp Lực & Số Bậc Thầy</li>
        <li>Lời Kết & Hướng Dẫn Thực Hành</li>
    </ol>
</div>`;
}

// ── Ch I: Introduction ────────────────────────────────────────
export function generateNumerologyIntro(): string {
    return `
<div class="pdf-chapter-break"></div>
<h2 class="pdf-chapter-title">Chương 1</h2>
<h3 class="pdf-chapter-subtitle">Giới Thiệu Phương Pháp</h3>
<p class="pdf-chapter-tagline">Khoa học về con số và năng lượng vũ trụ</p>

<p class="pdf-paragraph">Mỗi con số từ 1 đến 9 mang trong mình một tần số rung động đặc biệt, tương tự như sóng âm thanh hay sóng ánh sáng. Mỗi người sinh ra đều mang theo một "mã số" độc đáo được ấn định bởi tên gọi và ngày sinh. Bản phân tích này giải mã "bản đồ số" cá nhân của bạn — từ số Đường Đời đến Bảng Ngày Sinh — mỗi yếu tố là một mảnh ghép trong bức tranh tổng thể về tiềm năng, thách thức, và sứ mệnh cuộc đời bạn.</p>

<p class="pdf-paragraph">Con số không "quyết định" số phận — chúng "phản ánh" năng lượng bẩm sinh mà bạn mang theo khi sinh ra. Giống như bản đồ địa lý cho thấy địa hình nhưng không quyết định bạn đi đường nào, bản đồ số cho thấy tiềm năng nhưng cách bạn sử dụng nó mới quyết định kết quả. <em>"Biết mình biết ta, trăm trận trăm thắng"</em> — chương tiếp theo sẽ phân tích chi tiết từng con số trong bản đồ cá nhân của bạn.</p>`;
}

// ── Ch II: Core Numbers ───────────────────────────────────────
export function generateCoreNumbersChapter(profile: FullNarrativeProfile): string {
    const positions: { key: NumerologyPosition; number: EnrichedCoreNumber }[] = [
        { key: 'lifePath', number: profile.lifePath },
        { key: 'expression', number: profile.expression },
        { key: 'soulUrge', number: profile.soulUrge },
        { key: 'personality', number: profile.personality },
        { key: 'birthday', number: profile.birthday },
        { key: 'maturity', number: profile.maturity },
    ];

    // Extra numbers rendered separately (not in NumerologyPosition type)
    const extras: { label: string; number: EnrichedCoreNumber }[] = [];
    if (profile.hiddenPassion) extras.push({ label: 'Đam Mê Ẩn', number: profile.hiddenPassion as EnrichedCoreNumber });
    if (profile.subconsciousSelf) extras.push({ label: 'Tiềm Thức', number: profile.subconsciousSelf as EnrichedCoreNumber });

    const cards = positions.map(({ key, number }) => {
        const meta = POSITION_META[key];
        const icon = POS_ICON[key] || '🔢';
        const posMeaning = POSITION_MEANINGS[number.value]?.[key];
        const cardClass = number.masterNumber ? 'num-core-card--master' : number.karmicDebt ? 'num-core-card--karmic' : 'num-core-card--normal';
        const badge = number.masterNumber ? '✨ Số Bậc Thầy' : number.karmicDebt ? '⚠️ Nghiệp Lực' : '';
        const nar = number.narrative;

        return `
<div class="num-core-card ${cardClass}">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6pt">
        <strong style="font-size:13pt;color:#1a1a2e">${icon} ${esc(number.nameVi)} — Số ${number.value}</strong>
        ${badge ? `<span style="font-size:8pt;font-weight:600;color:#8b5cf6">${badge}</span>` : ''}
    </div>
    <p style="font-size:9pt;color:#666;margin:0 0 6pt 0;font-style:italic">${esc(meta.nameVi)}: ${esc(number.description)}</p>
</div>

<p class="pdf-paragraph">Theo "The Life You Were Born to Live" của Dan Millman, ${esc(number.nameVi)} (${esc(number.name)}) số ${number.value} mang tần số rung động đặc trưng: "${esc(number.description)}." ${esc(number.detailedMeaning)} Trong bản đồ số của bạn, con số này tọa tại vị trí ${esc(meta.nameVi)} — ${esc(meta.description)} — cho thấy đây không chỉ là một khuynh hướng thoảng qua mà là năng lượng CƠ BẢN chi phối khía cạnh ${esc(meta.nameVi)} trong cuộc đời bạn.</p>

${nar ? `
<div style="margin-top: 12pt; margin-bottom: 12pt; padding: 12pt; background: #fffcf5; border-left: 3px solid #f59e0b; border-radius: 4pt;">
    <h4 style="font-size: 11pt; color: #b45309; margin: 0 0 8pt 0;">Tài Năng & Thách Thức</h3>
    <div style="display: flex; gap: 16pt;">
        <div style="flex: 1;">
            <strong style="font-size: 10pt; color: #15803d; display: block; margin-bottom: 4pt;">✓ Điểm Mạnh:</strong>
            <ul style="margin: 0; padding-left: 14pt; font-size: 9.5pt; color: #4b5563; line-height: 1.5;">
                ${nar.strengths ? nar.strengths.slice(0, 3).map(s => `<li>${esc(s)}</li>`).join('') : ''}
            </ul>
        </div>
        <div style="flex: 1;">
            <strong style="font-size: 10pt; color: #b91c1c; display: block; margin-bottom: 4pt;">✓ Thách Thức:</strong>
            <ul style="margin: 0; padding-left: 14pt; font-size: 9.5pt; color: #4b5563; line-height: 1.5;">
                ${nar.challenges ? nar.challenges.slice(0, 3).map(c => `<li>${esc(c)}</li>`).join('') : ''}
            </ul>
        </div>
    </div>
</div>
<div style="margin-bottom: 16pt; padding: 12pt; background: #f8fafc; border-left: 3px solid #3b82f6; border-radius: 4pt;">
    <p style="font-size: 9.5pt; color: #334155; margin: 0 0 6pt 0;"><strong>💼 Nghề Nghiệp:</strong> ${esc(nar.career || '')}</p>
    <p style="font-size: 9.5pt; color: #334155; margin: 0 0 6pt 0;"><strong>❤️ Tình Cảm:</strong> ${esc(nar.love || '')}</p>
</div>
` : ''}

${posMeaning ? `<p class="pdf-paragraph">${esc(posMeaning.interpretation)} Theo Phillips, mỗi con số đều có "vùng bóng tối" — không phải để sợ hãi mà để ý THỨC. Khi bạn nhận ra cả mặt sáng lẫn mặt tối, bạn đã nắm 50% chìa khóa để chuyển hóa.</p>` : `<p class="pdf-paragraph">Biểu hiện tích cực và tiêu cực của con số này tùy thuộc vào cách bạn sử dụng năng lượng — ý thức về nó là bước đầu tiên để làm chủ.</p>`}
<div style="margin-bottom: 24pt;"></div>
`;
    }).join('\n');

    const extraCards = extras.map(({ label, number }) => {
        const cardClass = number.masterNumber ? 'num-core-card--master' : 'num-core-card--normal';
        return `
<div class="num-core-card ${cardClass}" style="margin-top: 16pt;">
    <strong style="font-size:13pt;color:#1a1a2e">🔢 ${esc(label)} — Số ${number.value}</strong>
    <p style="font-size:9pt;color:#666;margin:4pt 0 0 0;font-style:italic">${esc(number.description)}</p>
</div>
<p class="pdf-paragraph">${esc(number.detailedMeaning)}</p>
<div style="margin-bottom: 24pt;"></div>
`;
    }).join('\n');

    return `
<div class="pdf-chapter-break"></div>
<h2 class="pdf-chapter-title">Chương 2</h2>
<h3 class="pdf-chapter-subtitle">Các Con Số Cốt Lõi</h3>
<p class="pdf-chapter-tagline">Giải mã bản đồ năng lượng cá nhân</p>

<p class="pdf-paragraph">Sách "Numerology: Key to Your Inner Self" của Hans Decoz ghi: "Core numbers là xương sống của bản đồ số — chúng define WHO YOU ARE ở cấp độ sâu nhất." Trong bản đồ của bạn, ${positions.length + extras.length} con số cốt lõi sau đây tạo thành một hệ thống tương tác phức tạp — mỗi số ảnh hưởng và bổ sung cho các số khác, tạo nên bức tranh tổng thể độc đáo chỉ thuộc về bạn.</p>

${cards}
${extraCards}`;
}

// ── Ch III: Birthday Grid & Arrows ────────────────────────────
export function generateBirthdayGridChapter(profile: NumerologyProfile): string {
    const g = profile.birthdayGrid;
    const GRID_NUMBERS = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

    const gridHtml = `
<table class="num-grid-table">
    ${GRID_NUMBERS.map((row, ri) => `<tr>${row.map((num, ci) => {
        const count = g.grid[ri][ci];
        const cls = count > 0 ? 'num-present' : 'num-missing';
        return `<td class="${cls}">${count > 0 ? String(num).repeat(count) : num}</td>`;
    }).join('')}</tr>`).join('\n    ')}
</table>`;

    const arrowsHtml = g.arrows.length > 0
        ? `<p style="margin:10pt 0"><strong>Mũi tên hiện hữu:</strong></p>
       <div>${g.arrows.map(a => `<span class="num-arrow-badge">✓ ${esc(a)}</span>`).join(' ')}</div>
       ${g.arrows.map(a => {
            const interp = ARROW_INTERPRETATIONS[a];
            return interp ? `<p class="pdf-paragraph">Theo "Numerology and the Divine Triangle" của Javane & Bunker, ${esc(a)} cho thấy: ${esc(interp.present)}. Đây là một trong những mũi tên MẠNH trong bản đồ — cho thấy bạn có sẵn nền tảng vững chắc trong khía cạnh này. Biểu hiện tích cực: năng lượng tự nhiên và dễ dàng. Biểu hiện tiêu cực: có thể xem nhẹ vì "quá quen thuộc."</p>` : '';
        }).join('\n')}`
        : '<p class="pdf-paragraph">Bản đồ số của bạn không có mũi tên hoàn chỉnh — điều này không phải là "thiếu sót" mà cho thấy năng lượng phân bố đều, không tập trung quá mức vào một khía cạnh. Theo Phillips, bảng không có mũi tên cho phép sự linh hoạt và đa dạng trong phát triển.</p>';

    return `
<div class="pdf-chapter-break"></div>
<h2 class="pdf-chapter-title">Chương 3</h2>
<h3 class="pdf-chapter-subtitle">Bảng Ngày Sinh & Mũi Tên</h3>
<p class="pdf-chapter-tagline">Bản đồ Pythagoras — tấm gương phản chiếu năng lượng bẩm sinh</p>

<p class="pdf-paragraph">Theo David A. Phillips trong "The Complete Book of Numerology," Bảng Ngày Sinh (Birthday Grid) là công cụ quan trọng nhất trong Thần Số Học Pythagoras — nó cho thấy CONCENTRATION (tập trung) năng lượng ở đâu, ABSENCE (vắng mặt) ở đâu, và ARROWS (mũi tên) nào đang hoạt động. Hãy tưởng tượng bảng 3×3 như "tấm gương năng lượng" — nơi mỗi ô phản chiếu một khía cạnh cơ bản: trí tuệ (hàng 1-2-3), cảm xúc (hàng 4-5-6), và hành động (hàng 7-8-9).</p>

${gridHtml}

<p class="pdf-paragraph">Trong bảng trên, các ô có số (highlight xanh) cho thấy năng lượng HIỆN HỮU — số xuất hiện càng nhiều lần, năng lượng càng mạnh. Các ô trống (highlight đỏ nhạt) cho thấy năng lượng CẦN PHÁT TRIỂN. Phillips nhấn mạnh: "Missing numbers" không phải "weaknesses" — chúng là "lessons" — bài học mà linh hồn bạn chọn trải nghiệm trong kiếp này.</p>

${arrowsHtml}`;
}

// ── Ch IV: Missing Numbers ────────────────────────────────────
export function generateMissingNumbersChapter(profile: NumerologyProfile): string {
    const missing = profile.birthdayGrid.missing;
    if (missing.length === 0) {
        return `
<div class="pdf-chapter-break"></div>
<h2 class="pdf-chapter-title">Chương 4</h2>
<h3 class="pdf-chapter-subtitle">Các Con Số Thiếu & Bài Học</h3>
<p class="pdf-chapter-tagline">Không có con số thiếu — bảng số hoàn chỉnh!</p>
<p class="pdf-paragraph">Bản đồ số của bạn có TẤT CẢ 9 con số hiện diện — đây là trường hợp hiếm và đặc biệt. Theo Phillips, người có bảng số đầy đủ có nền tảng toàn diện — không có "lỗ hổng" năng lượng nào cần lấp. Tuy nhiên, điều này cũng có nghĩa là bạn có thể cảm thấy "kéo nhiều hướng" — vì mọi năng lượng đều đang hoạt động cùng lúc. Bài học của bạn nằm ở khả năng TINH GIẢN — chọn tập trung thay vì ôm đồm.</p>`;
    }

    const missingCards = missing.map(n => {
        const meaning = MISSING_NUMBER_MEANINGS[n];
        return `
<div style="margin-bottom:8pt">
    <span class="num-missing-badge">Thiếu số ${n}</span>
</div>
<p class="pdf-paragraph">Theo sách "Numerology and the Divine Triangle" của Javane & Bunker, thiếu số ${n} trong bảng ngày sinh cho thấy: ${meaning ? esc(meaning.meaning) : `một bài học phát triển liên quan đến năng lượng số ${n}`}. Đây không phải "điểm yếu cố hữu" — mà là lĩnh vực mà linh hồn bạn chọn TRẢI NGHIỆM và PHÁT TRIỂN trong kiếp này. Theo Phillips: "Missing numbers are karmic lessons — they represent qualities you are here to develop." ${meaning ? `Lời khuyên phát triển: ${esc(meaning.advice)}.` : ''} Biểu hiện tích cực: khi ý thức phát triển số thiếu, bạn thường đạt được chiều sâu VƯỢT TRỘI. Biểu hiện tiêu cực: nếu không ý thức, số thiếu có thể biểu hiện như "điểm mù."</p>`;
    }).join('\n');

    return `
<div class="pdf-chapter-break"></div>
<h2 class="pdf-chapter-title">Chương 4</h2>
<h3 class="pdf-chapter-subtitle">Các Con Số Thiếu & Bài Học</h3>
<p class="pdf-chapter-tagline">Những bài học mà linh hồn bạn chọn trải nghiệm</p>

<p class="pdf-paragraph">Bạn có ${missing.length} con số thiếu trong bảng ngày sinh: ${missing.join(', ')}. Mỗi con số thiếu là một lời mời từ vũ trụ — mời bạn phát triển phẩm chất đó qua trải nghiệm thực tế. Con số thiếu không phải "lỗ hổng" — chúng là "cửa sổ cơ hội" cho sự phát triển vượt bậc.</p>

${missingCards}`;
}

// ── Ch V: Pinnacles & Challenges ──────────────────────────────
export function generatePinnaclesChapter(profile: NumerologyProfile): string {
    const pinnacleCards = profile.pinnacles.map((p: PinnacleCycleResult, i: number) => {
        const pinnMeaning = PINNACLE_MEANINGS[p.number];
        return `
<div class="num-cycle-card">
    <div class="num-cycle-header">
        <div>
            <strong style="font-size:11pt;color:#1d4ed8">Đỉnh Cao ${i + 1}: Số ${p.number}</strong>
            <span style="font-size:9pt;color:#888;margin-left:6pt">${p.startAge}–${p.endAge ?? '∞'} tuổi</span>
        </div>
        <span class="num-period-badge">Đỉnh Cao</span>
    </div>
    ${p.theme ? `<p style="font-size:10pt;font-weight:600;color:#444;margin:4pt 0">${esc(p.theme)}</p>` : ''}
    ${p.meaning ? `<p style="font-size:9pt;color:#555;line-height:1.7;margin:0">${esc(p.meaning)}</p>` : ''}
</div>
<p class="pdf-paragraph">Theo "Numerology: Key to Your Inner Self" của Hans Decoz, Đỉnh Cao ${i + 1} (Pinnacle) — số ${p.number} — hoạt động từ ${p.startAge} đến ${p.endAge ?? '∞'} tuổi. ${pinnMeaning ? esc(pinnMeaning) : `Đây là giai đoạn mang năng lượng số ${p.number}`}. ${p.advice ? `Lời khuyên: ${esc(p.advice)}.` : ''} Mỗi Pinnacle là một "chương" trong cuốn sách cuộc đời — hiểu chủ đề từng chương giúp bạn sống chủ động thay vì bị động.</p>`;
    }).join('\n');

    const challengeCards = profile.challenges.map((c: ChallengeCycleResult, i: number) => {
        const challMeaning = CHALLENGE_MEANINGS[c.number];
        return `
<div class="num-cycle-card" style="border-left:3px solid #ef4444">
    <div class="num-cycle-header">
        <div>
            <strong style="font-size:11pt;color:#dc2626">Thử Thách ${i + 1}: Số ${c.number}</strong>
            <span style="font-size:9pt;color:#888;margin-left:6pt">${c.startAge}–${c.endAge ?? '∞'} tuổi</span>
        </div>
        <span style="padding:2pt 10pt;border-radius:12pt;font-size:9pt;font-weight:600;background:#fef2f2;color:#dc2626">Thử Thách</span>
    </div>
    ${c.theme ? `<p style="font-size:10pt;font-weight:600;color:#444;margin:4pt 0">${esc(c.theme)}</p>` : ''}
    ${c.meaning ? `<p style="font-size:9pt;color:#555;line-height:1.7;margin:0">${esc(c.meaning)}</p>` : ''}
</div>
<p class="pdf-paragraph">Theo Decoz, Thử Thách ${i + 1} (Challenge) — số ${c.number} — là "bài kiểm tra" mà cuộc đời đặt ra trong giai đoạn ${c.startAge}–${c.endAge ?? '∞'} tuổi. ${challMeaning ? esc(challMeaning) : ''} ${c.advice ? `Lời khuyên vượt qua: ${esc(c.advice)}.` : ''} Thử Thách không phải "hình phạt" — nó là "trường huấn luyện" để bạn phát triển phẩm chất mà con số đó đại diện.</p>`;
    }).join('\n');

    return `
<div class="pdf-chapter-break"></div>
<h2 class="pdf-chapter-title">Chương 5</h2>
<h3 class="pdf-chapter-subtitle">Đỉnh Cao & Thử Thách Cuộc Đời</h3>
<p class="pdf-chapter-tagline">Bốn mùa của cuộc đời — từ gieo trồng đến thu hoạch</p>

<p class="pdf-paragraph">Theo Dan Millman trong "The Life You Were Born to Live," cuộc đời mỗi người được chia thành 4 giai đoạn lớn — mỗi giai đoạn mang một "Đỉnh Cao" (Pinnacle) và một "Thử Thách" (Challenge). Đỉnh Cao cho thấy CƠ HỘI và NĂNG LƯỢNG chủ đạo. Thử Thách cho thấy BÀI HỌC và RÀO CẢN cần vượt qua. Hiểu cả hai giúp bạn biết đang ở "mùa" nào và cần làm gì.</p>

<h3 style="font-size:12pt;color:#1d4ed8;margin:16pt 0 8pt">Bốn Đỉnh Cao</h3>
${pinnacleCards}

<h3 style="font-size:12pt;color:#dc2626;margin:16pt 0 8pt">Bốn Thử Thách</h3>
${challengeCards}`;
}

// ── Ch VI: Personal Cycles ────────────────────────────────────
export function generatePersonalCyclesChapter(profile: NumerologyProfile): string {
    const pc = profile.personalCycle;
    const yearMeaning = PERSONAL_YEAR_MEANINGS[pc.personalYear];
    const monthMeaning = PERSONAL_MONTH_MEANINGS[pc.personalMonth];

    const periodsHtml = profile.lifePeriods.map((lp, i) => {
        const periodMeanings = LIFE_PERIOD_MEANINGS[lp.number];
        const periodKey = i === 0 ? 'formative' : i === 1 ? 'productive' : 'harvest' as const;
        const meaning = periodMeanings?.[periodKey];
        return `
<div class="num-cycle-card">
    <div class="num-cycle-header">
        <div>
            <strong style="font-size:11pt;color:#1a1a2e">${esc(lp.nameVi)}: Số ${lp.number}</strong>
            <span style="font-size:9pt;color:#888;margin-left:6pt">${lp.startAge}–${lp.endAge ?? '∞'} tuổi</span>
        </div>
        <span class="num-period-badge">Giai Đoạn ${i + 1}/3</span>
    </div>
    <p style="font-size:9pt;color:#555;line-height:1.7;margin:0">${meaning ? esc(meaning) : `Giai đoạn mang năng lượng số ${lp.number}`}</p>
</div>`;
    }).join('\n');

    return `
<div class="pdf-chapter-break"></div>
<h2 class="pdf-chapter-title">Chương 6</h2>
<h3 class="pdf-chapter-subtitle">Chu Kỳ Cá Nhân</h3>
<p class="pdf-chapter-tagline">Nhịp điệu thời gian trong cuộc đời bạn</p>

<p class="pdf-paragraph">Theo "Numerology: The Complete Guide" của Matthew Oliver Goodwin, mỗi người sống trong một nhịp 9 năm tuần hoàn — và biết mình đang ở năm thứ mấy trong chu kỳ giúp đưa ra quyết định đúng thời điểm. "Timing is everything" — và Thần Số Học cho bạn công cụ để hiểu timing cá nhân.</p>

<div class="num-core-card num-core-card--normal">
    <strong style="font-size:12pt">📅 Năm Cá Nhân: Số ${pc.personalYear}</strong>
    <p style="font-size:10pt;color:#555;margin:6pt 0">${yearMeaning ? esc(yearMeaning.theme + ' — ' + yearMeaning.focus) : esc(pc.yearMeaning)}</p>
</div>

<p class="pdf-paragraph">Theo sách "The Secret Science of Numerology" của Shirley Blackwell Lawrence, Năm Cá Nhân ${pc.personalYear} là năm "${pc.yearMeaning}" Trong vòng quay 9 năm, mỗi năm đóng một vai trò riêng: năm 1 là gieo hạt, năm 4-5 là phát triển, năm 8 là thu hoạch, năm 9 là buông bỏ chuẩn bị cho chu kỳ mới. Biết mình đang ở năm nào giúp bạn biết nên ĐẨY MẠNH hay NÉN LẠI — nên HÀNH ĐỘNG hay KIÊN NHẪN.</p>

<div class="num-core-card num-core-card--normal">
    <strong style="font-size:12pt">📆 Tháng Cá Nhân: Số ${pc.personalMonth}</strong>
    <p style="font-size:10pt;color:#555;margin:6pt 0">${monthMeaning ? esc(monthMeaning.theme + ' — ' + monthMeaning.advice) : esc(pc.monthMeaning)}</p>
</div>

<h3 style="font-size:12pt;color:#1a1a2e;margin:16pt 0 8pt">Ba Giai Đoạn Lớn Của Cuộc Đời</h3>
<p class="pdf-paragraph">Cuộc đời được chia thành 3 giai đoạn lớn (Life Periods): Hình Thành (0-27 tuổi), Phát Triển (28-55 tuổi), và Thu Hoạch (56+ tuổi). Mỗi giai đoạn mang một con số chi phối khác nhau — giống như ba "chương sách" với ba chủ đề riêng biệt.</p>
${periodsHtml}`;
}

// ── Ch VII: Number Interactions ────────────────────────────────
export function generateInteractionsChapter(profile: NumerologyProfile): string {
    const interactions = profile.numberInteractions || [];
    if (interactions.length === 0) {
        return `
<div class="pdf-chapter-break"></div>
<h2 class="pdf-chapter-title">Chương 7</h2>
<h3 class="pdf-chapter-subtitle">Tương Tác Giữa Các Con Số</h3>
<p class="pdf-paragraph">Các con số cốt lõi trong bản đồ của bạn hoạt động tương đối độc lập — không có tương tác đặc biệt nổi bật nào. Điều này cho thấy mỗi khía cạnh cuộc sống hoạt động theo logic riêng, không tạo xung đột hay cộng hưởng đáng kể.</p>`;
    }

    const interactionCards = interactions.map(inter => {
        const badgeClass = `num-interaction-card--${inter.nature}`;
        const natureLabel = inter.nature === 'synergy' ? '✅ Cộng Hưởng' : inter.nature === 'tension' ? '⚡ Căng Thẳng' : '🔄 Bổ Sung';
        return `
<div class="num-interaction-card ${badgeClass}">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4pt">
        <strong style="font-size:10pt;color:#1a1a2e">${esc(inter.pair)}</strong>
        <span style="font-size:8pt;font-weight:600">${natureLabel}</span>
    </div>
    <p style="font-size:9pt;color:#555;line-height:1.7;margin:0">${esc(inter.description)}</p>
</div>`;
    }).join('\n');

    return `
<div class="pdf-chapter-break"></div>
<h2 class="pdf-chapter-title">Chương 7</h2>
<h3 class="pdf-chapter-subtitle">Tương Tác Giữa Các Con Số</h3>
<p class="pdf-chapter-tagline">Hòa âm và bất hòa trong bản đồ số</p>

<p class="pdf-paragraph">Theo "Numerology for Healing" của Michael Brill, các con số trong bản đồ không hoạt động đơn lẻ — chúng tương tác liên tục, tạo ra "hòa âm" (harmony) hoặc "bất hòa" (disharmony). Phân tích tương tác cho thấy TRONG NỘI TÂM bạn, có những năng lượng nào cộng hưởng (synergy), những năng lượng nào xung đột (tension), và những năng lượng nào bổ sung nhau (complementary). Hiểu điều này giúp bạn không tự mâu thuẫn với chính mình.</p>

${interactionCards}

<p class="pdf-paragraph">Brill nhấn mạnh: "Sự căng thẳng giữa các con số không phải vấn đề — nó là ĐỘNG LỰC cho phát triển. Giống như cơ bắp cần kháng lực để mạnh hơn, tính cách cần xung đột nội tại để trưởng thành." Nếu bạn nhận thấy mình thường "kéo hai hướng" — ví dụ, vừa muốn tự do (5) vừa muốn ổn định (4) — đó chính là biểu hiện của tương tác số. Giải pháp không phải chọn một bỏ một, mà là tìm ĐIỂM CÂN BẰNG mới giữa cả hai.</p>`;
}

// ── Ch VIII.5: Life Areas Analysis (ETC Format) ──────────────────────────────
export function generateNumerologyLifeAreasChapter(profile: NumerologyProfile): string {
    const areas = analyzeNumerologyLifeAreas(profile);
    
    const areasHtml = areas.map(area => `
<div class="pdf-life-area-card" style="margin-bottom: 24pt;">
    <h4 style="font-size: 14pt; color: var(--color-primary); margin-bottom: 12pt; display: flex; align-items: center; gap: 8pt;">
        <span style="font-size: 18pt;">${area.icon}</span> ${esc(area.areaName)}
    </h4>
    
    <div style="padding-left: 12pt; border-left: 3px solid #e5e7eb;">
        <!-- H: Hook -->
        <p style="font-size: 11pt; font-weight: 600; color: #1f2937; margin-bottom: 8pt;">
            ${esc(area.narrative.hook)}
        </p>
        
        <!-- E: Effect & N: Nuance -->
        <p style="font-size: 10.5pt; color: #4b5563; line-height: 1.7; margin-bottom: 8pt; text-align: justify;">
            <strong>Biểu hiện thực tế:</strong> ${esc(area.narrative.effect)}
            <br>
            <strong>Điểm tinh tế:</strong> <em>${esc(area.narrative.nuance)}</em>
        </p>
        
        <!-- C: Cause -->
        <p style="font-size: 10pt; color: #6b7280; line-height: 1.6; margin-bottom: 10pt; text-align: justify; font-style: italic;">
            <strong>Góc nhìn Thần Số Học:</strong> ${esc(area.narrative.cause)}
        </p>
        
        <!-- T: Tip -->
        <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 10pt 12pt; border-radius: 4pt;">
            <p style="margin: 0; font-size: 10pt; color: #166534; font-weight: 500;">
                💡 <strong>Lời khuyên:</strong> ${esc(area.narrative.tip)}
            </p>
        </div>
    </div>
</div>
`).join('\\n');

    return `
<div class="pdf-chapter-break"></div>
<h2 class="pdf-chapter-title">Chương 9</h2>
<h3 class="pdf-chapter-subtitle">Phân Tích Đời Sống Thông Qua Các Con Số</h3>
<p class="pdf-chapter-tagline">Sự nghiệp, Tình cảm và Phát triển Bản thân</p>

<p class="pdf-paragraph">Mỗi khía cạnh trong cuộc sống của bạn như một bức tranh ghép hình, nơi các con số cốt lõi và chu kỳ ngày sinh cùng tương tác. Không có yếu tố nào hoàn toàn đứng độc lập; chúng tác động lẫn nhau tạo nên những biểu hiện thực tế (Effect), những sắc thái tinh tế (Nuance) và đòi hỏi những cách tiếp cận riêng biệt.</p>

${areasHtml}
`;
}

// ── Ch VIII: Karmic & Master Numbers ──────────────────────────
export function generateKarmicMasterChapter(profile: NumerologyProfile): string {
    const karmicHtml = profile.karmicDebts.length > 0
        ? profile.karmicDebts.map(n => {
            const kp = KARMIC_DEBT_PROFILES[n];
            return `
<div class="num-core-card num-core-card--karmic">
    <strong style="font-size:11pt">⚠️ Nghiệp Lực Số ${n}</strong>
</div>
<p class="pdf-paragraph">Theo "Numerology: Key to Your Inner Self" của Decoz, Nghiệp Lực (Karmic Debt) số ${n} cho thấy: ${kp ? `${esc(kp.origin)} ${esc(kp.manifestation)} ${esc(kp.redemption)}` : `bài học nghiệp từ quá khứ liên quan đến năng lượng số ${n}`}. Nghiệp Lực không phải "hình phạt" — theo quan điểm của Thần Số Học, đó là "bài tập" mà linh hồn bạn TỰ CHỌN để phát triển. Khi bạn nhận ra pattern lặp đi lặp lại — đó có thể là Nghiệp Lực ${n} đang vận hành. Cách "giải nghiệp": ý thức, chấp nhận, và chủ động học bài học.</p>`;
        }).join('\n')
        : '<p class="pdf-paragraph">Bản đồ số của bạn không chứa Karmic Debt (Nghiệp Lực) — điều này cho thấy bạn không mang nghiệp lực nặng từ quá khứ. Tuy nhiên, Phillips lưu ý: "No karmic debt doesn\'t mean no lessons — it means different lessons." Bạn vẫn có bài học riêng qua các con số thiếu và thử thách.</p>';

    const masterHtml = profile.masterNumbers.length > 0
        ? profile.masterNumbers.map(n => {
            const mp = MASTER_NUMBER_PROFILES[n];
            return `
<div class="num-core-card num-core-card--master">
    <strong style="font-size:11pt">✨ Số Bậc Thầy ${n}</strong>
</div>
<p class="pdf-paragraph">Theo Dan Millman, Số Bậc Thầy (Master Number) ${n} mang tần số rung động CAO HƠN bình thường: ${mp ? `${esc(mp.dualNature)} ${esc(mp.activation)} ${esc(mp.guidance)}` : `năng lượng đặc biệt của số ${n}`}. Master Number giống như "tần số WiFi mạnh" — bạn có khả năng kết nối với tầng năng lượng cao hơn, nhưng cũng dễ bị "quá tải" nếu không biết quản lý. ${mp ? `Mặt bóng tối cần lưu ý: ${esc(mp.shadow)}.` : ''} Lời khuyên: hãy chấp nhận rằng bạn MANG TIỀM NĂNG ĐẶC BIỆT — và cho phép bản thân thời gian để phát triển nó.</p>`;
        }).join('\n')
        : '<p class="pdf-paragraph">Bản đồ số của bạn không chứa Master Number (11, 22, 33) — điều này hoàn toàn bình thường và không ảnh hưởng đến giá trị bản đồ. Theo Decoz: "Master numbers are not \'better\' — they are \'different\'." Mỗi con số đều có giá trị và sứ mệnh riêng."</p>';

    return `
<div class="pdf-chapter-break"></div>
<h2 class="pdf-chapter-title">Chương 8</h2>
<h3 class="pdf-chapter-subtitle">Nghiệp Lực & Số Bậc Thầy</h3>
<p class="pdf-chapter-tagline">Những bài học sâu xa và tiềm năng vượt trội</p>

<p class="pdf-paragraph">Theo truyền thống Thần Số Học Pythagoras, có hai loại số đặc biệt: Karmic Debt (Nghiệp Lực — 13, 14, 16, 19) và Master Numbers (Số Bậc Thầy — 11, 22, 33). Karmic Debt cho thấy bài học mà linh hồn cần hoàn thành. Master Numbers cho thấy tiềm năng vượt trội cần được kích hoạt. Cả hai đều là "thông điệp đặc biệt" từ bản đồ số.</p>

<h3 style="font-size:12pt;color:#dc2626;margin:16pt 0 8pt">Nghiệp Lực (Karmic Debt)</h3>
${karmicHtml}

<h3 style="font-size:12pt;color:#8b5cf6;margin:16pt 0 8pt">Số Bậc Thầy (Master Numbers)</h3>
${masterHtml}`;
}

// ── Ch IX: Closing ────────────────────────────────────────────
export function generateNumerologyClosing(profile: NumerologyProfile): string {
    return `
<div class="pdf-chapter-break"></div>
<h2 class="pdf-chapter-title">Chương 9</h2>
<h3 class="pdf-chapter-subtitle">Lời Kết & Hướng Dẫn Thực Hành</h3>
<p class="pdf-chapter-tagline">Từ hiểu biết đến hành động</p>

<p class="pdf-paragraph">Bản phân tích Thần Số Học này đã giải mã các con số cốt lõi (Đường Đời ${profile.lifePath.value}, Biểu Đạt ${profile.expression.value}, Linh Hồn ${profile.soulUrge.value}, Nhân Cách ${profile.personality.value}), bảng ngày sinh với ${profile.birthdayGrid.arrows.length} mũi tên và ${profile.birthdayGrid.missing.length} con số thiếu, 4 Đỉnh Cao và 4 Thử Thách, cùng chu kỳ cá nhân hiện tại. Mỗi yếu tố là một mảnh ghép — và bức tranh tổng thể cho thấy bạn là một sinh mệnh ĐỘC NHẤT VÔ NHỊ với một bản đồ năng lượng không ai giống ai.</p>

<p class="pdf-paragraph">Con số không quyết định số phận — chúng soi sáng con đường. Hãy sử dụng bản phân tích này như một "bản đồ nội tâm": (1) Tiềm năng bẩm sinh qua các con số cốt lõi; (2) Bài học cần phát triển qua con số thiếu; (3) Thời cơ thuận lợi qua Đỉnh Cao và Chu kỳ; (4) Thách thức cần chuẩn bị qua Thử Thách. Nhớ rằng: BẠN là người lái xe, con số chỉ là bản đồ.</p>

<div style="text-align:center;margin-top:24pt;padding:16pt;border-top:2px solid #e5e5ea">
    <p style="font-size:10pt;color:#888;font-style:italic">"Biết mình biết ta, trăm trận trăm thắng."</p>
    <p style="font-size:9pt;color:#aaa;margin-top:8pt">Bản phân tích được tạo bởi Lịch Việt v2 — Thần Số Học Engine</p>
</div>`;
}
