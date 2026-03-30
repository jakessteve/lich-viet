/**
 * PDF Styles — Print CSS for text-dense academic A4 reports
 *
 * Journal/book typography optimised for 60-70 page text-heavy output.
 * Follows Vietnamese astrology competitor standards (tracuutuvi.com,
 * lasotuvi.com, Astro Assured, BirthChart.net):
 *   - Tight margins for maximum text area
 *   - Dense paragraph layout with justified text
 *   - Minimal whitespace between sections
 *   - No decorative breaks — only structural page breaks
 *
 * Writing theory references:
 *   - APA 7th edition paragraph & heading spacing
 *   - Journal typography: 10-11pt body, 1.5-1.6x line height
 *   - Psychology of reading: optimal line length 60-75 chars
 */

// ── HTML Escaping ─────────────────────────────────────────────

export function esc(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// ── Chapter Emoji Map ─────────────────────────────────────────

export const CHAPTER_EMOJI: Record<string, string> = {
    personality: '🪞',
    love: '💕',
    career: '🏛️',
    health: '🌿',
    growth: '✨',
};

// ── Professional Print Stylesheet ────────────────────────────

export function getPdfCSS(): string {
    return `
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap');

/* ── Page Setup: tight margins for maximum text density ── */
@page {
    size: A4;
    margin: 18mm 16mm 18mm 16mm;
}
@page :first {
    margin: 0;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Noto Serif', 'Times New Roman', Georgia, serif;
    font-size: 10.5pt;
    line-height: 1.6;
    color: #1a1a1a;
    background: white;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
}

/* ── Cover Page ── */
.pdf-cover {
    width: 210mm;
    height: 297mm;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #1a1a2e;
    color: white;
    text-align: center;
    page-break-after: always;
    position: relative;
}
.pdf-cover-emoji {
    font-size: 48pt;
    margin-bottom: 16pt;
}
.pdf-cover-title {
    font-family: 'Noto Serif', serif;
    font-size: 24pt;
    font-weight: 700;
    color: white;
    margin-bottom: 4pt;
}
.pdf-cover-subtitle {
    font-size: 12pt;
    font-weight: 400;
    color: rgba(255,255,255,0.65);
    margin-bottom: 22pt;
}
.pdf-cover-archetype {
    font-family: 'Noto Serif', serif;
    font-size: 15pt;
    font-weight: 600;
    font-style: italic;
    color: #c4b5fd;
    margin-bottom: 4pt;
}
.pdf-cover-element {
    font-size: 10pt;
    color: rgba(255,255,255,0.45);
    margin-bottom: 32pt;
}
.pdf-cover-meta {
    font-size: 9pt;
    color: rgba(255,255,255,0.35);
}
.pdf-cover-brand {
    position: absolute;
    bottom: 22mm;
    font-size: 9pt;
    color: rgba(255,255,255,0.25);
}

/* ── Table of Contents ── */
.pdf-toc {
    page-break-after: always;
    padding-top: 4mm;
}
.pdf-toc-title {
    font-family: 'Noto Serif', serif;
    font-size: 16pt;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 12pt;
    text-align: center;
}
.pdf-toc-list {
    list-style: none;
    padding: 0;
}
.pdf-toc-item {
    display: flex;
    align-items: baseline;
    gap: 6pt;
    padding: 4pt 0;
    border-bottom: 1px solid #e8e8e8;
    font-size: 10.5pt;
}
.pdf-toc-item-number {
    font-weight: 600;
    color: #444;
    min-width: 20pt;
}
.pdf-toc-item-title {
    flex: 1;
    color: #1a1a1a;
}
.pdf-toc-item-dots {
    flex: 1;
    border-bottom: 1px dotted #bbb;
    margin: 0 4pt;
    min-width: 16pt;
}

/* ── Chapter Headings: only first chapter avoids break ── */
.pdf-chapter {
    page-break-before: always;
}
.pdf-chapter:first-of-type {
    page-break-before: auto;
}
.pdf-chapter-header {
    text-align: left;
    margin-bottom: 10pt;
    padding-bottom: 6pt;
    border-bottom: 1.5px solid #333;
}
.pdf-chapter-emoji {
    font-size: 16pt;
    display: inline;
    margin-right: 4pt;
    vertical-align: middle;
}
.pdf-chapter-number {
    font-family: 'Inter', sans-serif;
    font-size: 8pt;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5pt;
    color: #666;
    display: block;
    margin-bottom: 2pt;
}
.pdf-chapter-title {
    font-family: 'Noto Serif', serif;
    font-size: 16pt;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0;
}
.pdf-chapter-subtitle {
    font-size: 9.5pt;
    color: #666;
    font-style: italic;
    margin-top: 2pt;
}

/* ── Section & Content Blocks: minimal spacing ── */
.pdf-section {
    margin-bottom: 6pt;
}
.pdf-section-title {
    font-family: 'Noto Serif', serif;
    font-size: 12pt;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 4pt;
    margin-top: 10pt;
    padding-bottom: 2pt;
    border-bottom: 1px solid #ddd;
}

/* ── Prose Paragraphs: dense justified text ── */
.pdf-paragraph {
    font-size: 10.5pt;
    line-height: 1.6;
    color: #222;
    margin-bottom: 4pt;
    text-align: justify;
    hyphens: auto;
    text-indent: 1.5em;
}
.pdf-paragraph:first-child {
    text-indent: 0;
}
.pdf-paragraph--no-indent {
    text-indent: 0;
}

/* ── ETC Narrative Block: flowing prose, tight ── */
.pdf-etc {
    margin-bottom: 6pt;
    page-break-inside: avoid;
}
.pdf-etc-hook {
    font-size: 10.5pt;
    font-weight: 600;
    font-style: italic;
    color: #1a1a1a;
    margin-bottom: 3pt;
    line-height: 1.55;
    text-indent: 0;
}
.pdf-etc-effect {
    font-size: 10.5pt;
    line-height: 1.6;
    color: #222;
    margin-bottom: 3pt;
    text-align: justify;
    text-indent: 1.5em;
}
.pdf-etc-nuance {
    font-size: 10pt;
    line-height: 1.55;
    color: #333;
    margin: 4pt 0;
    text-align: justify;
    text-indent: 1.5em;
    font-style: italic;
}
.pdf-etc-nuance::before {
    content: 'Lưu ý: ';
    font-weight: 600;
    font-style: normal;
}
.pdf-etc-cause {
    font-size: 10pt;
    line-height: 1.55;
    color: #444;
    margin: 4pt 0;
    text-align: justify;
    text-indent: 1.5em;
}
.pdf-etc-cause::before {
    content: 'Nguyên nhân: ';
    font-weight: 600;
}
.pdf-etc-tip {
    font-size: 10pt;
    line-height: 1.55;
    color: #222;
    margin: 4pt 0;
    text-align: justify;
    text-indent: 1.5em;
}
.pdf-etc-tip::before {
    content: 'Lời khuyên: ';
    font-weight: 600;
}

/* ── Block Quotes: compact ── */
.pdf-pullquote {
    font-family: 'Noto Serif', serif;
    font-size: 10.5pt;
    font-style: italic;
    color: #444;
    padding: 4pt 0 4pt 12pt;
    margin: 6pt 0;
    border-left: 2px solid #888;
    page-break-inside: avoid;
}

/* ── Strengths/Challenges: inline prose, no cards ── */
.pdf-traits-grid {
    margin: 6pt 0;
}
.pdf-traits-column {
    margin-bottom: 6pt;
}
.pdf-traits-column--positive {}
.pdf-traits-column--challenge {}
.pdf-traits-column-title {
    font-size: 11pt;
    font-weight: 700;
    margin-bottom: 4pt;
    color: #1a1a1a;
}
.pdf-traits-column--positive .pdf-traits-column-title { color: #1a6b3a; }
.pdf-traits-column--challenge .pdf-traits-column-title { color: #a3420c; }
.pdf-trait-item {
    margin-bottom: 4pt;
    font-size: 10.5pt;
    line-height: 1.55;
}
.pdf-trait-item:last-child { margin-bottom: 0; }
.pdf-trait-label {
    font-weight: 600;
    color: #1a1a1a;
    display: inline;
}
.pdf-trait-desc {
    color: #333;
    font-size: 10.5pt;
    display: inline;
    margin-left: 3pt;
}

/* ── Key Influences: inline ── */
.pdf-influences {
    font-size: 10.5pt;
    line-height: 1.55;
    color: #333;
    margin: 4pt 0;
}
.pdf-influence-tag {
    font-weight: 500;
    color: #1a1a1a;
}
.pdf-influence-tag::after {
    content: ' \\00B7  ';
    color: #999;
    font-weight: 400;
}
.pdf-influence-tag:last-child::after {
    content: '';
}

/* ── Yearly Outlook ── */
.pdf-outlook {
    page-break-before: always;
}
.pdf-outlook-themes {
    font-size: 10.5pt;
    line-height: 1.55;
    margin: 4pt 0;
}
.pdf-outlook-theme {
    font-weight: 500;
    color: #1a1a1a;
}
.pdf-outlook-theme::after {
    content: ' \\00B7  ';
    color: #999;
    font-weight: 400;
}
.pdf-outlook-theme:last-child::after {
    content: '';
}

/* ── Closing Meditation: compact ── */
.pdf-meditation {
    page-break-before: always;
}
.pdf-meditation-body p {
    font-family: 'Noto Serif', serif;
    font-size: 10.5pt;
    font-style: italic;
    line-height: 1.65;
    color: #333;
    margin-bottom: 6pt;
    text-align: justify;
}
.pdf-meditation-body p:last-child {
    font-weight: 600;
    color: #1a1a1a;
}

/* ── Appendix ── */
.pdf-appendix {
    page-break-before: always;
}
.pdf-appendix-term {
    margin-bottom: 4pt;
}
.pdf-appendix-term dt {
    font-weight: 700;
    font-size: 10.5pt;
    color: #1a1a1a;
    display: inline;
}
.pdf-appendix-term dt::after {
    content: ': ';
}
.pdf-appendix-term dd {
    font-size: 10.5pt;
    color: #333;
    margin-left: 0;
    line-height: 1.55;
    display: inline;
}

/* ── Divider: minimal ── */
.pdf-divider {
    text-align: center;
    margin: 6pt 0;
    color: #ccc;
    font-size: 8pt;
    letter-spacing: 3pt;
}

/* ── Sub-heading within chapter ── */
.pdf-subheading {
    font-family: 'Noto Serif', serif;
    font-size: 11pt;
    font-weight: 700;
    color: #1a1a1a;
    margin-top: 8pt;
    margin-bottom: 3pt;
}

/* ── Footer / Page Number ── */
@media print {
    @page {
        @bottom-center {
            content: counter(page);
            font-size: 8pt;
            color: #999;
        }
    }
}
/* ── Life Area Accent Colors ── */
:root {
    --pdf-accent-personality: #6366f1;
    --pdf-accent-love: #ec4899;
    --pdf-accent-career: #0ea5e9;
    --pdf-accent-health: #22c55e;
    --pdf-accent-growth: #f59e0b;
    --pdf-accent-default: #6366f1;
}

/* ── Per-area accent overrides ── */
.pdf-area-personality { --pdf-accent-default: var(--pdf-accent-personality); }
.pdf-area-love { --pdf-accent-default: var(--pdf-accent-love); }
.pdf-area-career { --pdf-accent-default: var(--pdf-accent-career); }
.pdf-area-health { --pdf-accent-default: var(--pdf-accent-health); }
.pdf-area-growth { --pdf-accent-default: var(--pdf-accent-growth); }

/* ── Key Insight Box ── */
.pdf-insight-box {
    border-left: 4pt solid var(--pdf-accent-default);
    background: rgba(99, 102, 241, 0.04);
    padding: 10pt 14pt;
    margin: 12pt 0;
    page-break-inside: avoid;
    border-radius: 0 4pt 4pt 0;
}
.pdf-insight-box .pdf-insight-icon {
    display: inline-block;
    font-size: 14pt;
    margin-right: 6pt;
    vertical-align: middle;
}
.pdf-insight-box .pdf-insight-text {
    font-size: 9.5pt;
    line-height: 1.5;
    color: #2d2d3f;
    font-style: italic;
}

/* ── Medium Cover (simpler, monochrome) ── */
.pdf-cover--medium {
    background: #2d2d3f !important;
}
.pdf-cover--medium .pdf-cover-title {
    color: rgba(255,255,255,0.9);
}
.pdf-cover--medium .pdf-cover-label {
    position: absolute;
    bottom: 32pt;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Inter', sans-serif;
    font-size: 8pt;
    letter-spacing: 3pt;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
}

/* ── Full Cover (rich, prestigious) ── */
.pdf-cover--full {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%) !important;
}
.pdf-cover--full .pdf-cover-ornament-top,
.pdf-cover--full .pdf-cover-ornament-bottom {
    position: absolute;
    left: 10%;
    right: 10%;
    height: 1pt;
    background: linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent);
}
.pdf-cover--full .pdf-cover-ornament-top { top: 24pt; }
.pdf-cover--full .pdf-cover-ornament-bottom { bottom: 24pt; }
.pdf-cover--full .pdf-cover-title {
    text-shadow: 0 0 20pt rgba(212,175,55,0.3);
}

/* ── Chapter Header Tiers ── */
.pdf-chapter-header--full {
    border-left: 5pt solid var(--pdf-accent-default);
    padding-left: 12pt;
    background: rgba(99, 102, 241, 0.02);
}
.pdf-chapter-header--medium {
    border-left: 2pt solid #999;
    padding-left: 8pt;
}

/* ── CTA Upsell Page (medium PDF only) ── */
.pdf-cta-page {
    page-break-before: always;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
    padding: 40pt 30pt;
}
.pdf-cta-headline {
    font-family: 'Noto Serif', serif;
    font-size: 20pt;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 8pt;
}
.pdf-cta-subtitle {
    font-size: 11pt;
    color: #555;
    margin-bottom: 24pt;
    max-width: 400pt;
    line-height: 1.6;
}
.pdf-cta-benefits {
    list-style: none;
    text-align: left;
    margin: 0 auto 20pt;
    max-width: 380pt;
}
.pdf-cta-benefits li {
    font-size: 9.5pt;
    line-height: 1.6;
    margin-bottom: 6pt;
    padding-left: 4pt;
}
.pdf-cta-comparison {
    width: 100%;
    max-width: 420pt;
    border-collapse: collapse;
    margin: 16pt auto;
    font-size: 9pt;
}
.pdf-cta-comparison th {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    padding: 6pt 8pt;
    border-bottom: 2pt solid #1a1a2e;
    text-align: left;
}
.pdf-cta-comparison td {
    padding: 5pt 8pt;
    border-bottom: 0.5pt solid #e5e7eb;
}
.pdf-cta-comparison .cta-check { color: #22c55e; font-weight: 600; }
.pdf-cta-comparison .cta-dash { color: #ccc; }
.pdf-cta-button {
    display: inline-block;
    padding: 12pt 28pt;
    border-radius: 8pt;
    background: linear-gradient(135deg, #7c3aed, #a78bfa);
    color: white;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 12pt;
    text-decoration: none;
    margin-top: 20pt;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
}
.pdf-cta-social-proof {
    font-size: 8.5pt;
    color: #888;
    margin-top: 12pt;
    font-style: italic;
}

/* ── Executive Summary Card ── */
.pdf-summary-card {
    page-break-before: always;
    padding: 20pt;
}
.pdf-summary-card-title {
    font-family: 'Noto Serif', serif;
    font-size: 18pt;
    font-weight: 700;
    text-align: center;
    color: #1a1a2e;
    margin-bottom: 6pt;
}
.pdf-summary-card-subtitle {
    font-size: 10pt;
    text-align: center;
    color: #666;
    margin-bottom: 20pt;
}
.pdf-summary-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16pt;
    margin-top: 16pt;
}
.pdf-summary-section {
    border: 1pt solid #e5e7eb;
    border-radius: 6pt;
    padding: 14pt;
    page-break-inside: avoid;
}
.pdf-summary-section-title {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 11pt;
    margin-bottom: 8pt;
    color: #1a1a2e;
}
.pdf-summary-section-content {
    font-size: 9.5pt;
    line-height: 1.5;
    color: #333;
}
.pdf-summary-section-list {
    list-style: none;
    padding: 0;
    margin: 0;
}
.pdf-summary-section-list li {
    font-size: 9.5pt;
    line-height: 1.5;
    padding: 2pt 0;
}

/* ── Luck Cycle Timeline ── */
.pdf-timeline {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin: 16pt 0;
    padding: 8pt 0;
    position: relative;
}
.pdf-timeline::before {
    content: '';
    position: absolute;
    top: 6pt;
    left: 0;
    right: 0;
    height: 2pt;
    background: #e5e7eb;
    z-index: 0;
}
.pdf-timeline-node {
    position: relative;
    z-index: 1;
    text-align: center;
    flex: 1;
}
.pdf-timeline-dot {
    width: 12pt;
    height: 12pt;
    border-radius: 50%;
    background: #6366f1;
    margin: 0 auto 4pt;
    border: 2pt solid white;
    box-shadow: 0 0 0 1pt #6366f1;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
}
.pdf-timeline-dot--active {
    background: #f59e0b;
    box-shadow: 0 0 0 2pt #f59e0b;
    width: 16pt;
    height: 16pt;
}
.pdf-timeline-label {
    font-family: 'Inter', sans-serif;
    font-size: 7pt;
    color: #666;
    margin-top: 2pt;
}
.pdf-timeline-label--active {
    font-weight: 700;
    color: #1a1a2e;
}

/* ── Sharing Card ── */
.pdf-share-card {
    page-break-before: always;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    text-align: center;
    padding: 40pt;
}
.pdf-share-headline {
    font-family: 'Noto Serif', serif;
    font-size: 16pt;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 6pt;
}
.pdf-share-subtitle {
    font-size: 10pt;
    color: #555;
    margin-bottom: 16pt;
}
.pdf-share-tagline {
    font-family: 'Inter', sans-serif;
    font-size: 8pt;
    color: #999;
    letter-spacing: 1pt;
}
`;
}
