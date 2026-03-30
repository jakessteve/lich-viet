/**
 * Bazi PDF Sections — Shared constants and CSS
 */

import type { NguHanh } from '../../../types/bazi';
import { esc } from '../pdfStyles';

export { esc };

// ── Element visuals ───────────────────────────────────────────
export const EL_EMOJI: Record<NguHanh, string> = { Kim: '🪙', Mộc: '🌿', Thủy: '💧', Hỏa: '🔥', Thổ: '🏔️' };
export const EL_COLOR: Record<NguHanh, string> = {
  Kim: '#d4a017',
  Mộc: '#16a34a',
  Thủy: '#2563eb',
  Hỏa: '#dc2626',
  Thổ: '#d97706',
};

// ── Extra CSS for Bazi-specific elements ──────────────────────
export function getBaziExtraCSS(): string {
  return `
.bazi-pillar-table { width: 100%; border-collapse: collapse; margin: 16pt 0; }
.bazi-pillar-table th, .bazi-pillar-table td { border: 1px solid #e5e5ea; padding: 8pt 12pt; text-align: center; font-size: 10pt; }
.bazi-pillar-table th { background: #f8f7ff; font-weight: 600; color: #1a1a2e; font-size: 9pt; text-transform: uppercase; letter-spacing: 1pt; }
.bazi-pillar-table .bazi-dm { background: #f5f3ff; border: 2px solid #8b5cf6; }
.bazi-el-bar { display: inline-block; height: 12pt; border-radius: 3pt; margin-right: 6pt; vertical-align: middle; }
.bazi-el-row { display: flex; align-items: center; gap: 6pt; margin: 6pt 0; font-size: 10pt; }
.bazi-star-card { padding: 10pt 14pt; border-radius: 6pt; margin-bottom: 8pt; page-break-inside: avoid; border-left: 3px solid; }
.bazi-star-card--cat { background: #f0fdf4; border-color: #22c55e; }
.bazi-star-card--hung { background: #fef2f2; border-color: #ef4444; }
.bazi-star-card--trung { background: #fffbeb; border-color: #f59e0b; }
.bazi-cycle-card { padding: 12pt 14pt; border-radius: 6pt; margin-bottom: 10pt; page-break-inside: avoid; border: 1px solid #e5e5ea; }
.bazi-cycle-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6pt; }
.bazi-cycle-badge { font-size: 8pt; font-weight: 700; padding: 2pt 8pt; border-radius: 10pt; text-transform: uppercase; }
.bazi-cycle-badge--cat { background: #dcfce7; color: #16a34a; }
.bazi-cycle-badge--hung { background: #fef2f2; color: #dc2626; }
.bazi-cycle-badge--trung { background: #fef9c3; color: #a16207; }
.bazi-advice-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12pt; margin: 14pt 0; }
.bazi-advice-box { padding: 10pt; border-radius: 6pt; border: 1px solid #e5e5ea; page-break-inside: avoid; }
.bazi-advice-box h4 { font-size: 10pt; font-weight: 600; color: #1a1a2e; margin-bottom: 6pt; }
.bazi-advice-box p, .bazi-advice-box li { font-size: 9pt; color: #555; line-height: 1.7; }
.bazi-advice-box ul { padding-left: 14pt; margin: 0; }
.bazi-ts-phase { display: inline-block; padding: 4pt 10pt; border-radius: 4pt; margin: 3pt; font-size: 9pt; border: 1px solid #e5e5ea; }
`;
}
