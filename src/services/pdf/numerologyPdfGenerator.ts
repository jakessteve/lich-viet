/**
 * Numerology PDF Generator — Magazine-quality ~25 A4 page report
 *
 * Mirrors the Bát Tự PDF architecture (baziPdfGenerator.ts).
 * Uses window.print() with @page CSS for professional output.
 */

import type { NumerologyProfile } from '@lich-viet/core/numerology';
import { getPdfCSS } from './pdfStyles';
import {
    getNumerologyExtraCSS,
    generateNumerologyCover,
    generateNumerologyToc,
    generateNumerologyIntro,
    generateCoreNumbersChapter,
    generateBirthdayGridChapter,
    generateMissingNumbersChapter,
    generatePinnaclesChapter,
    generatePersonalCyclesChapter,
    generateInteractionsChapter,
    generateNumerologyLifeAreasChapter,
    generateKarmicMasterChapter,
    generateNumerologyClosing,
    generateNumerologyExecutiveSummaryChapter,
} from './numerologyPdfSections';
import { buildFullNarrativeProfile } from '../numerology/numerologyNarrativeProvider';

// ── Main PDF Generation ──────────────────────────────────────

export function generateNumerologyPrintableHtml(rawProfile: NumerologyProfile, userName: string): string {
    const profile = buildFullNarrativeProfile(rawProfile);
    return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Bản Phân Tích Thần Số Học — ${userName || profile.fullName}</title>
    <style>${getPdfCSS()}${getNumerologyExtraCSS()}</style>
</head>
<body>
    ${generateNumerologyCover(profile, userName)}
    ${generateNumerologyToc()}
    ${generateNumerologyExecutiveSummaryChapter(profile)}
    ${generateNumerologyIntro()}
    ${generateCoreNumbersChapter(profile)}
    ${generateBirthdayGridChapter(profile)}
    ${generateMissingNumbersChapter(profile)}
    ${generatePinnaclesChapter(profile)}
    ${generatePersonalCyclesChapter(profile)}
    ${generateInteractionsChapter(profile)}
    ${generateNumerologyLifeAreasChapter(profile)}
    ${generateKarmicMasterChapter(profile)}
    ${generateNumerologyClosing(profile)}
</body>
</html>`;
}

/**
 * Open a new window with printable HTML and trigger print dialog.
 */
export async function downloadNumerologyPdf(profile: NumerologyProfile, userName: string): Promise<void> {
    const html = generateNumerologyPrintableHtml(profile, userName);
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
