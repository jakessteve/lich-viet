/**
 * megaInsightEngine.ts — Multi-Engine Cross-Reference Synthesis
 *
 * Phase 4.3: Combines keywords and scores from Tử Vi + Bát Tự +
 * Thần Số + Chiêm Tinh into a single "Mega Insight" — the crown
 * jewel of the Premium tier.
 *
 * This module:
 * 1. Collects individual engine signals (element, strength, timing)
 * 2. Finds cross-engine correlations (e.g., BaziĐại Hạn Xấu + Thần Số Năm 9)
 * 3. Produces a prioritized list of MegaInsight alerts
 * 4. Assigns a "Confidence" score based on how many engines agree
 *
 * Design: Stateless — takes pre-computed engine results, returns insights.
 */

// ── Types ──────────────────────────────────────────────────

export type InsightSeverity = 'critical' | 'warning' | 'positive' | 'neutral';
export type InsightCategory = 'tài_chính' | 'sự_nghiệp' | 'tình_cảm' | 'sức_khỏe' | 'tổng_quát';

export interface EngineSignal {
  source: 'tuvi' | 'bazi' | 'numerology' | 'western' | 'calendar';
  /** The key finding from this engine */
  keyword: string;
  /** How strong this signal is (0-100) */
  strength: number;
  /** What category this signal belongs to */
  category: InsightCategory;
  /** Additional data for cross-referencing */
  meta?: Record<string, string | number>;
}

export interface MegaInsight {
  /** Unique identifier for this insight */
  id: string;
  /** The main insight text in Vietnamese */
  title: string;
  /** Detailed explanation */
  detail: string;
  /** How severe/important this insight is */
  severity: InsightSeverity;
  /** Which life area this affects */
  category: InsightCategory;
  /** How many engines contributed to this insight (1-4) */
  engineCount: number;
  /** Which engines agree on this */
  sources: string[];
  /** Confidence percentage (0-100) — higher when more engines agree */
  confidence: number;
  /** Actionable advice */
  advice: string;
}

export interface MegaInsightResult {
  /** Top insights, sorted by confidence descending */
  insights: MegaInsight[];
  /** Overall synthesis score (0-100) */
  overallScore: number;
  /** Short one-line summary */
  summary: string;
}

// ── Cross-Reference Rules ─────────────────────────────────

interface CrossRule {
  id: string;
  title: string;
  detail: string;
  severity: InsightSeverity;
  category: InsightCategory;
  advice: string;
  /** Conditions: all must match for rule to fire */
  conditions: Array<{
    source: EngineSignal['source'];
    keywordMatch: string; // substring match against signal.keyword
    minStrength?: number;
  }>;
}

const CROSS_RULES: CrossRule[] = [
  {
    id: 'cr-dai-han-xau-nam-9',
    title: '⚠️ Cảnh Báo Đỏ: Đại Hạn + Năm Cá Nhân 9',
    detail: 'Tử Vi Đại Hạn xấu trùng khớp với Thần Số Năm Cá Nhân 9 — năm kết thúc chu kỳ. Đây là thời điểm chuyển giao lớn, dễ mất mát nếu cố giữ.',
    severity: 'critical',
    category: 'tổng_quát',
    advice: 'Năm nay hãy buông bỏ những gì không còn phục vụ bạn. Đừng bắt đầu dự án lớn mới — hãy hoàn thành những gì dang dở.',
    conditions: [
      { source: 'tuvi', keywordMatch: 'Đại Hạn xấu', minStrength: 60 },
      { source: 'numerology', keywordMatch: 'Năm 9', minStrength: 70 },
    ],
  },
  {
    id: 'cr-tai-loc-dong-thuan',
    title: '💰 Tài Lộc Đồng Thuận Đa Hệ',
    detail: 'Nhiều hệ thống đồng thời chỉ ra năng lượng tài chính tích cực: Bát Tự có Tài Tinh vượng, Tử Vi cung Tài Bạch tốt, hoặc Thần Số đang ở chu kỳ thịnh vượng.',
    severity: 'positive',
    category: 'tài_chính',
    advice: 'Đây là thời điểm vàng để đầu tư, mở rộng kinh doanh hoặc đàm phán tăng lương. Nhiều "dòng nước" đang chảy cùng hướng.',
    conditions: [
      { source: 'bazi', keywordMatch: 'Tài', minStrength: 65 },
      { source: 'numerology', keywordMatch: 'thịnh vượng', minStrength: 60 },
    ],
  },
  {
    id: 'cr-tinh-cam-xung-khac',
    title: '💔 Tình Cảm Dao Động — Đa Hệ Cảnh Báo',
    detail: 'Tử Vi cung Phu Thê có sao hung, đồng thời Chiêm Tinh cho thấy Venus bị aspect khó khăn. Tình cảm dễ biến động.',
    severity: 'warning',
    category: 'tình_cảm',
    advice: 'Tránh đưa ra quyết định lớn về tình cảm trong giai đoạn này. Tập trung vào giao tiếp rõ ràng và lắng nghe đối phương.',
    conditions: [
      { source: 'tuvi', keywordMatch: 'Phu Thê hung', minStrength: 55 },
      { source: 'western', keywordMatch: 'Venus khó', minStrength: 50 },
    ],
  },
  {
    id: 'cr-su-nghiep-vang',
    title: '🌟 Sự Nghiệp Hoàng Kim — Thiên Thời Địa Lợi',
    detail: 'Quan Tinh (Bát Tự) mạnh kết hợp với cung Quan Lộc (Tử Vi) tốt và Năm Cá Nhân thuận lợi. Ba hệ thống đều chỉ ra bước tiến sự nghiệp.',
    severity: 'positive',
    category: 'sự_nghiệp',
    advice: 'Nắm bắt mọi cơ hội thăng tiến. Đây là thời điểm hiếm hoi mà cả Đông và Tây đều ủng hộ bước nhảy của bạn.',
    conditions: [
      { source: 'bazi', keywordMatch: 'Quan', minStrength: 65 },
      { source: 'tuvi', keywordMatch: 'Quan Lộc tốt', minStrength: 60 },
    ],
  },
  {
    id: 'cr-suc-khoe-yeu',
    title: '🏥 Sức Khỏe Cần Chú Ý — Cảnh Báo Sớm',
    detail: 'Ngũ Hành khuyết hoặc xung khắc nghiêm trọng kết hợp với Transit hành tinh khó khăn. Cơ thể cần được chú ý đặc biệt.',
    severity: 'warning',
    category: 'sức_khỏe',
    advice: 'Kiểm tra sức khỏe định kỳ. Tập trung vào dinh dưỡng và nghỉ ngơi. Tránh hoạt động mạo hiểm trong giai đoạn này.',
    conditions: [
      { source: 'bazi', keywordMatch: 'khuyết', minStrength: 60 },
      { source: 'western', keywordMatch: 'Mars khó', minStrength: 50 },
    ],
  },
];

// ── Engine ──────────────────────────────────────────────────

/**
 * Synthesizes cross-engine signals into prioritized MegaInsights.
 *
 * @param signals - Pre-collected signals from each engine
 * @returns MegaInsightResult with sorted insights and overall score
 */
export function synthesizeMegaInsight(signals: EngineSignal[]): MegaInsightResult {
  const insights: MegaInsight[] = [];

  // ── Phase 1: Fire cross-reference rules ──
  for (const rule of CROSS_RULES) {
    let matchCount = 0;
    const matchedSources: string[] = [];

    for (const cond of rule.conditions) {
      const matching = signals.find(
        (s) =>
          s.source === cond.source &&
          s.keyword.includes(cond.keywordMatch) &&
          s.strength >= (cond.minStrength ?? 0)
      );
      if (matching) {
        matchCount++;
        matchedSources.push(cond.source);
      }
    }

    // Rule fires if ALL conditions are met
    if (matchCount === rule.conditions.length) {
      insights.push({
        id: rule.id,
        title: rule.title,
        detail: rule.detail,
        severity: rule.severity,
        category: rule.category,
        engineCount: matchedSources.length,
        sources: matchedSources,
        confidence: Math.min(100, matchedSources.length * 35 + 30),
        advice: rule.advice,
      });
    }
  }

  // ── Phase 2: Single-engine strong signals (confidence < cross-engine) ──
  for (const signal of signals) {
    if (signal.strength >= 80) {
      const sourceLabels: Record<string, string> = {
        tuvi: 'Tử Vi', bazi: 'Bát Tự', numerology: 'Thần Số Học',
        western: 'Chiêm Tinh', calendar: 'Lịch Âm',
      };

      // Avoid duplicating signals already captured by cross-rules
      const alreadyCaptured = insights.some((ins) =>
        ins.sources.includes(signal.source) && ins.category === signal.category
      );
      if (alreadyCaptured) continue;

      insights.push({
        id: `single-${signal.source}-${signal.category}`,
        title: `${sourceLabels[signal.source]}: ${signal.keyword}`,
        detail: `${sourceLabels[signal.source]} phát hiện tín hiệu mạnh (${signal.strength}/100) về ${signal.category}.`,
        severity: signal.strength >= 85 ? 'positive' : 'neutral',
        category: signal.category,
        engineCount: 1,
        sources: [signal.source],
        confidence: Math.min(60, signal.strength * 0.6),
        advice: `Xem chi tiết trong phần ${sourceLabels[signal.source]} để hiểu rõ hơn.`,
      });
    }
  }

  // ── Sort by confidence (cross-engine first), then severity ──
  const severityOrder: Record<InsightSeverity, number> = {
    critical: 0, warning: 1, positive: 2, neutral: 3,
  };
  insights.sort((a, b) => {
    if (a.confidence !== b.confidence) return b.confidence - a.confidence;
    return severityOrder[a.severity] - severityOrder[b.severity];
  });

  // ── Overall score ──
  const avgSignalStrength = signals.length > 0
    ? signals.reduce((sum, s) => sum + s.strength, 0) / signals.length
    : 50;
  const hasPositive = insights.some((i) => i.severity === 'positive');
  const hasCritical = insights.some((i) => i.severity === 'critical');
  let overallScore = Math.round(avgSignalStrength);
  if (hasPositive) overallScore = Math.min(100, overallScore + 10);
  if (hasCritical) overallScore = Math.max(0, overallScore - 15);

  // ── Summary generation ──
  let summary: string;
  if (overallScore >= 80) {
    summary = 'Đa số các hệ thống đồng thuận: Giai đoạn thuận lợi, nên chủ động nắm bắt cơ hội.';
  } else if (overallScore >= 60) {
    summary = 'Tín hiệu hỗn hợp từ các hệ thống. Có cơ hội nhưng cần cẩn trọng trong một số lĩnh vực.';
  } else if (overallScore >= 40) {
    summary = 'Nhiều hệ thống phát hiện thách thức. Nên giữ thái độ bảo thủ và tập trung ổn định.';
  } else {
    summary = 'Cảnh báo đồng thuận đa hệ: Giai đoạn cần đặc biệt thận trọng. Tránh mạo hiểm.';
  }

  return {
    insights: insights.slice(0, 5), // Cap at top 5 insights
    overallScore,
    summary,
  };
}
