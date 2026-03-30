/**
 * Bazi PDF Generator — Magazine-quality ~35 A4 page report
 *
 * Mirrors the Tử Vi PDF architecture (pdfGenerator.ts).
 * Uses window.print() with @page CSS for professional output.
 */

import type { BaziChart } from '../../types/bazi';
import {
  generatePersonalityNarrative,
  generatePracticalAdvice,
  enrichLuckCycleNarratives,
} from '../bazi/baziInterpretation';
import {
  generateBaziExecutiveSummary,
  analyze12LifeDomains,
} from '../bazi/bazi12Domains';
import { getPdfCSS } from './pdfStyles';
import { getBaziExtraCSS } from './baziPdfSections/index';
import {
  generateBaziCover,
  generateBaziToc,
  generateBaziIntroChapter,
  generatePillarsChapter,
  generateElementsChapter,
  generateThapThanChapter,
  generateTangCanChapter,
  generateThanSatChapter,
  generateBaziExecutiveSummaryChapter,
  generateBazi12DomainsChapter,
  generateLuckCyclesChapter,
  generatePracticalAdviceChapter,
  generateTruongSinhChapter,
  generateBaziAppendix,
} from './baziPdfSections/index';

// ── Main PDF Generation ──────────────────────────────────────

export function generateBaziPrintableHtml(chart: BaziChart, userName: string): string {
  const personality = generatePersonalityNarrative(chart);
  const execSummary = generateBaziExecutiveSummary(chart);
  const lifeDomains = analyze12LifeDomains(chart);
  const advice = generatePracticalAdvice(chart);
  const enrichedCycles = enrichLuckCycleNarratives(chart);

  return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Bản Phân Tích Bát Tự — ${personality.profile.archetype}</title>
    <style>${getPdfCSS()}${getBaziExtraCSS()}</style>
</head>
<body>
    ${generateBaziCover(chart, personality, userName)}
    ${generateBaziToc(chart)}
    ${generateBaziIntroChapter()}
    ${generatePillarsChapter(chart, personality)}
    ${generateElementsChapter(chart)}
    ${generateThapThanChapter(chart)}
    ${generateTangCanChapter(chart)}
    ${generateThanSatChapter(chart)}
    ${generateBaziExecutiveSummaryChapter(execSummary)}
    ${generateBazi12DomainsChapter(lifeDomains)}
    ${generateLuckCyclesChapter(chart, enrichedCycles)}
    ${generatePracticalAdviceChapter(chart, advice)}
    ${generateTruongSinhChapter(chart)}
    ${generateBaziAppendix()}
</body>
</html>`;
}

/**
 * Open a new window with printable HTML and trigger print dialog.
 */
export async function downloadBaziPdf(chart: BaziChart, userName: string): Promise<void> {
  const html = generateBaziPrintableHtml(chart, userName);
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Không thể mở cửa sổ in. Vui lòng cho phép popup.');
    return;
  }
  printWindow.document.write(html);
  printWindow.document.close();

  await new Promise((resolve) => {
    printWindow.onload = resolve;
    setTimeout(resolve, 3000);
  });

  printWindow.focus();
  printWindow.print();
}
