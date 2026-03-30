/**
 * Numerology — Number Synergy Analysis
 *
 * Analyzes how pairs of core numbers interact.
 * Uses number-family grouping: same family = harmonic, opposing = challenging,
 * complementary = growth-oriented.
 */

import type { SynergyCategory, SynergyAnalysis, SynergyPairKey } from './types';

// ── Number Families ────────────────────────────────────────────

/** Number families for determining synergy category */
const MIND_NUMBERS = new Set([1, 7, 8]);      // Independent, analytical, power
const HEART_NUMBERS = new Set([2, 6, 9]);      // Relational, empathic, service
const CREATIVE_NUMBERS = new Set([3, 5]);       // Expressive, free, artistic
const STRUCTURE_NUMBER = new Set([4]);          // Grounded, disciplined

/**
 * Determine the synergy category between two numbers.
 */
function getFamily(n: number): string {
  const base = n > 9 ? (n === 11 ? 2 : n === 22 ? 4 : 6) : n;
  if (MIND_NUMBERS.has(base)) return 'mind';
  if (HEART_NUMBERS.has(base)) return 'heart';
  if (CREATIVE_NUMBERS.has(base)) return 'creative';
  if (STRUCTURE_NUMBER.has(base)) return 'structure';
  return 'mind';
}

function determineSynergy(a: number, b: number): SynergyCategory {
  const fa = getFamily(a);
  const fb = getFamily(b);
  if (fa === fb) return 'harmonic';
  if (
    (fa === 'mind' && fb === 'heart') || (fa === 'heart' && fb === 'mind') ||
    (fa === 'structure' && fb === 'creative') || (fa === 'creative' && fb === 'structure')
  ) return 'challenging';
  return 'growth';
}

// ── Pair-specific Synergy Data ─────────────────────────────────

interface PairMeta {
  nameVi: string;
  description: string;
}

const PAIR_META: Record<SynergyPairKey, PairMeta> = {
  lifePath_expression: {
    nameVi: 'Đường Đời + Biểu Đạt',
    description: 'Mục đích sống vs. cách tài năng thể hiện',
  },
  soulUrge_personality: {
    nameVi: 'Linh Hồn + Nhân Cách',
    description: 'Thế giới nội tâm vs. bộ mặt bên ngoài',
  },
  lifePath_maturity: {
    nameVi: 'Đường Đời + Trưởng Thành',
    description: 'Đầu đời vs. nửa sau cuộc đời',
  },
  expression_birthday: {
    nameVi: 'Biểu Đạt + Ngày Sinh',
    description: 'Năng lực phát triển vs. năng khiếu bẩm sinh',
  },
  lifePath_soulUrge: {
    nameVi: 'Đường Đời + Linh Hồn',
    description: 'Con đường định mệnh vs. khao khát thầm kín',
  },
  expression_personality: {
    nameVi: 'Biểu Đạt + Nhân Cách',
    description: 'Con người thật vs. hình ảnh người khác thấy',
  },
};

// ── Synergy interpretation templates by category ───────────────

const SYNERGY_TEMPLATES: Record<SynergyCategory, {
  label: string;
  labelVi: string;
  emoji: string;
  template: (pair: PairMeta, a: number, b: number) => string;
}> = {
  harmonic: {
    label: 'Harmonic',
    labelVi: 'Hài Hòa',
    emoji: '🟢',
    template: (pair, a, b) =>
      `${pair.nameVi} (${a} và ${b}) thuộc cùng nhóm năng lượng — tạo sự liên kết tự nhiên. ${pair.description} đồng điệu: bạn cảm thấy nhất quán giữa những gì mình muốn và cách thể hiện. Đây là lợi thế — bạn không bị "xé" giữa các xung đột nội tâm. Tuy nhiên, cùng nhóm cũng có nghĩa ít có "đối trọng" — bạn có thể đi quá sâu vào một hướng mà không ai kéo lại. Lời khuyên: tìm bạn bè/đối tác có năng lượng bổ trợ để cân bằng.`,
  },
  challenging: {
    label: 'Challenging',
    labelVi: 'Thử Thách',
    emoji: '🔴',
    template: (pair, a, b) =>
      `${pair.nameVi} (${a} và ${b}) tạo ra xung đột năng lượng — hai lực kéo ngược chiều. ${pair.description} mâu thuẫn: bạn thường cảm thấy "bị xé" giữa hai hướng. Một phần bạn muốn điều này, phần khác kéo điều kia. Đây KHÔNG phải điểm yếu — đây là động lực phát triển. Những người có tension nội tâm thường đạt được nhiều hơn vì họ phải liên tục giải quyết mâu thuẫn, và quá trình đó tạo ra sự trưởng thành. Lời khuyên: thay vì chọn một bên, học cách "nhảy" giữa hai năng lượng — mỗi bên có giá trị riêng.`,
  },
  growth: {
    label: 'Growth',
    labelVi: 'Phát Triển',
    emoji: '🟡',
    template: (pair, a, b) =>
      `${pair.nameVi} (${a} và ${b}) bổ trợ cho nhau — khác biệt nhưng không xung đột. ${pair.description} cân bằng: mỗi bên bù đắp thiếu sót của bên kia. Đây là tổ hợp tốt cho sự phát triển toàn diện — bạn vừa có chiều sâu vừa có chiều rộng. Thử thách: đôi khi bạn không chắc mình "thật sự là ai" vì hai năng lượng khác nhau cùng tồn tại. Lời khuyên: đó chính là điểm mạnh — bạn đa chiều, và thế giới cần người đa chiều.`,
  },
};

/**
 * Generate synergy analysis for a specific pair of core numbers.
 */
export function analyzeSynergy(
  pairKey: SynergyPairKey,
  numberA: number,
  numberB: number,
): SynergyAnalysis & { pairNameVi: string; pairDescription: string; categoryVi: string; emoji: string } {
  const category = determineSynergy(numberA, numberB);
  const pair = PAIR_META[pairKey];
  const tmpl = SYNERGY_TEMPLATES[category];

  return {
    category,
    categoryVi: tmpl.labelVi,
    emoji: tmpl.emoji,
    pairNameVi: pair.nameVi,
    pairDescription: pair.description,
    analysis: tmpl.template(pair, numberA, numberB),
  };
}

/**
 * Generate all 6 synergy analyses for a profile.
 */
export function analyzeAllSynergies(profile: {
  lifePath: number;
  expression: number;
  soulUrge: number;
  personality: number;
  birthday: number;
  maturity: number;
}) {
  return {
    lifePath_expression: analyzeSynergy('lifePath_expression', profile.lifePath, profile.expression),
    soulUrge_personality: analyzeSynergy('soulUrge_personality', profile.soulUrge, profile.personality),
    lifePath_maturity: analyzeSynergy('lifePath_maturity', profile.lifePath, profile.maturity),
    expression_birthday: analyzeSynergy('expression_birthday', profile.expression, profile.birthday),
    lifePath_soulUrge: analyzeSynergy('lifePath_soulUrge', profile.lifePath, profile.soulUrge),
    expression_personality: analyzeSynergy('expression_personality', profile.expression, profile.personality),
  };
}
