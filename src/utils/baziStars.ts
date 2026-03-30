/**
 * Bazi Stars & Analysis — Thần Sát, Thập Thần, Tàng Can, Branch Interactions, Trường Sinh
 *
 * Extracted from baziEngine.ts for modular architecture.
 * Contains all star derivation functions and their internal lookup tables.
 */

import type { Can, Chi } from '../types/calendar';
import type {
  NguHanh, Pillar, DayMasterAnalysis, ThanSat,
  ThapThanEntry, TangCanEntry, BranchInteraction, TruongSinhEntry,
} from '../types/bazi';
import {
  CAN_LIST, CHI_LIST, CAN_ELEMENT, GENERATES, DESTROYS,
  findGeneratingElement, findControllingElement,
} from './baziConstants';

// ── Tàng Can (Hidden Stems) Table ─────────────────────────────

export const TANG_CAN_TABLE: Record<Chi, { can: Can; element: NguHanh; strength: 'chính_khí' | 'trung_khí' | 'dư_khí' }[]> = {
  'Tý':   [{ can: 'Quý', element: 'Thủy', strength: 'chính_khí' }],
  'Sửu':  [{ can: 'Kỷ', element: 'Thổ', strength: 'chính_khí' }, { can: 'Quý', element: 'Thủy', strength: 'trung_khí' }, { can: 'Tân', element: 'Kim', strength: 'dư_khí' }],
  'Dần':  [{ can: 'Giáp', element: 'Mộc', strength: 'chính_khí' }, { can: 'Bính', element: 'Hỏa', strength: 'trung_khí' }, { can: 'Mậu', element: 'Thổ', strength: 'dư_khí' }],
  'Mão':  [{ can: 'Ất', element: 'Mộc', strength: 'chính_khí' }],
  'Thìn': [{ can: 'Mậu', element: 'Thổ', strength: 'chính_khí' }, { can: 'Ất', element: 'Mộc', strength: 'trung_khí' }, { can: 'Quý', element: 'Thủy', strength: 'dư_khí' }],
  'Tỵ':   [{ can: 'Bính', element: 'Hỏa', strength: 'chính_khí' }, { can: 'Mậu', element: 'Thổ', strength: 'trung_khí' }, { can: 'Canh', element: 'Kim', strength: 'dư_khí' }],
  'Ngọ':  [{ can: 'Đinh', element: 'Hỏa', strength: 'chính_khí' }, { can: 'Kỷ', element: 'Thổ', strength: 'trung_khí' }],
  'Mùi':  [{ can: 'Kỷ', element: 'Thổ', strength: 'chính_khí' }, { can: 'Đinh', element: 'Hỏa', strength: 'trung_khí' }, { can: 'Ất', element: 'Mộc', strength: 'dư_khí' }],
  'Thân': [{ can: 'Canh', element: 'Kim', strength: 'chính_khí' }, { can: 'Nhâm', element: 'Thủy', strength: 'trung_khí' }, { can: 'Mậu', element: 'Thổ', strength: 'dư_khí' }],
  'Dậu':  [{ can: 'Tân', element: 'Kim', strength: 'chính_khí' }],
  'Tuất': [{ can: 'Mậu', element: 'Thổ', strength: 'chính_khí' }, { can: 'Tân', element: 'Kim', strength: 'trung_khí' }, { can: 'Đinh', element: 'Hỏa', strength: 'dư_khí' }],
  'Hợi':  [{ can: 'Nhâm', element: 'Thủy', strength: 'chính_khí' }, { can: 'Giáp', element: 'Mộc', strength: 'trung_khí' }],
};

// ── Thập Thần (Ten Gods) ──────────────────────────────────────

const THAP_THAN_NATURE: Record<string, 'cat' | 'hung' | 'trung'> = {
  'Tỉ Kiên': 'trung', 'Kiếp Tài': 'hung', 'Thực Thần': 'cat', 'Thương Quan': 'hung',
  'Thiên Tài': 'cat', 'Chính Tài': 'cat', 'Thất Sát': 'hung', 'Chính Quan': 'cat',
  'Thiên Ấn': 'trung', 'Chính Ấn': 'cat',
};

export function deriveThapThan(dmCan: Can, targetCan: Can): string {
  const dmIdx = CAN_LIST.indexOf(dmCan);
  const tIdx = CAN_LIST.indexOf(targetCan);
  const dmEl = CAN_ELEMENT[dmCan];
  const tEl = CAN_ELEMENT[targetCan];
  const samePolarity = (dmIdx % 2) === (tIdx % 2);

  if (tEl === dmEl) return samePolarity ? 'Tỉ Kiên' : 'Kiếp Tài';
  if (GENERATES[dmEl] === tEl) return samePolarity ? 'Thực Thần' : 'Thương Quan';
  if (DESTROYS[dmEl] === tEl) return samePolarity ? 'Thiên Tài' : 'Chính Tài';
  if (DESTROYS[tEl] === dmEl) return samePolarity ? 'Thất Sát' : 'Chính Quan';
  // tEl generates dmEl
  return samePolarity ? 'Thiên Ấn' : 'Chính Ấn';
}

export function buildThapThan(dayMasterCan: Can, pillars: Pillar[]): ThapThanEntry[] {
  const results: ThapThanEntry[] = [];
  for (const p of pillars) {
    if (p.label !== 'Day') {
      const god = deriveThapThan(dayMasterCan, p.can);
      results.push({ pillar: p.labelVi, position: 'can', stem: p.can, stemElement: p.canElement, god, godNature: THAP_THAN_NATURE[god] || 'trung' });
    }
    // Also derive for hidden stems (Tàng Can) in chi
    const hidden = TANG_CAN_TABLE[p.chi];
    if (hidden) {
      for (const h of hidden) {
        const hGod = deriveThapThan(dayMasterCan, h.can);
        results.push({ pillar: p.labelVi, position: 'chi_tang', stem: h.can, stemElement: h.element, god: hGod, godNature: THAP_THAN_NATURE[hGod] || 'trung' });
      }
    }
  }
  return results;
}

export function buildTangCan(pillars: Pillar[]): TangCanEntry[] {
  return pillars.map(p => ({ chi: p.chi, hiddenStems: TANG_CAN_TABLE[p.chi] || [] }));
}

// ── Branch Interactions ───────────────────────────────────────

const LUC_HOP_PAIRS: [Chi, Chi, NguHanh][] = [
  ['Tý', 'Sửu', 'Thổ'], ['Dần', 'Hợi', 'Mộc'], ['Mão', 'Tuất', 'Hỏa'],
  ['Thìn', 'Dậu', 'Kim'], ['Tỵ', 'Thân', 'Thủy'], ['Ngọ', 'Mùi', 'Thổ'],
];
const TAM_HOP_TRIOS: [Chi, Chi, Chi, NguHanh][] = [
  ['Thân', 'Tý', 'Thìn', 'Thủy'], ['Dần', 'Ngọ', 'Tuất', 'Hỏa'],
  ['Tỵ', 'Dậu', 'Sửu', 'Kim'], ['Hợi', 'Mão', 'Mùi', 'Mộc'],
];
const LUC_XUNG_PAIRS: [Chi, Chi][] = [
  ['Tý', 'Ngọ'], ['Sửu', 'Mùi'], ['Dần', 'Thân'], ['Mão', 'Dậu'], ['Thìn', 'Tuất'], ['Tỵ', 'Hợi'],
];
const TUONG_HINH_SETS: [Chi[], string][] = [
  [['Dần', 'Tỵ', 'Thân'], 'Hình vô ân (bất hợp tác, phản bội)'],
  [['Sửu', 'Tuất', 'Mùi'], 'Hình vô lễ (xung đột, mất lễ nghĩa)'],
  [['Tý', 'Mão'], 'Hình vô lễ (bất kính, mâu thuẫn ngầm)'],
];
const TUONG_HAI_PAIRS: [Chi, Chi][] = [
  ['Tý', 'Mùi'], ['Sửu', 'Ngọ'], ['Dần', 'Tỵ'], ['Mão', 'Thìn'], ['Thân', 'Hợi'], ['Dậu', 'Tuất'],
];

export function detectBranchInteractions(pillars: Pillar[]): BranchInteraction[] {
  const results: BranchInteraction[] = [];
  const branches = pillars.map(p => ({ chi: p.chi, label: p.labelVi }));

  // Lục Hợp
  for (const [a, b, el] of LUC_HOP_PAIRS) {
    const pa = branches.find(x => x.chi === a);
    const pb = branches.find(x => x.chi === b);
    if (pa && pb) {
      results.push({ type: 'luc_hop', typeLabel: 'Lục Hợp', branches: [a, b], pillars: [pa.label, pb.label], nature: 'cat',
        description: `${a}-${b} lục hợp hóa ${el} — hài hòa, thuận lợi, tương sinh giữa ${pa.label} và ${pb.label}.` });
    }
  }
  // Tam Hợp (need at least 2 of 3)
  for (const [a, b, c, el] of TAM_HOP_TRIOS) {
    const found = branches.filter(x => x.chi === a || x.chi === b || x.chi === c);
    if (found.length >= 2) {
      results.push({ type: 'tam_hop', typeLabel: 'Tam Hợp', branches: found.map(f => f.chi), pillars: found.map(f => f.label), nature: 'cat',
        description: `${found.map(f => f.chi).join('-')} tam hợp ${el} cục — sức mạnh cộng hưởng, phát huy tốt hành ${el}.` });
    }
  }
  // Lục Xung
  for (const [a, b] of LUC_XUNG_PAIRS) {
    const pa = branches.find(x => x.chi === a);
    const pb = branches.find(x => x.chi === b);
    if (pa && pb) {
      results.push({ type: 'luc_xung', typeLabel: 'Lục Xung', branches: [a, b], pillars: [pa.label, pb.label], nature: 'hung',
        description: `${a}-${b} xung khắc — mâu thuẫn, biến động giữa ${pa.label} và ${pb.label}. Cần cẩn trọng trong lĩnh vực liên quan.` });
    }
  }
  // Tương Hình
  for (const [set, desc] of TUONG_HINH_SETS) {
    const found = branches.filter(x => set.includes(x.chi));
    if (found.length >= 2) {
      results.push({ type: 'tuong_hinh', typeLabel: 'Tương Hình', branches: found.map(f => f.chi), pillars: found.map(f => f.label), nature: 'hung',
        description: `${found.map(f => f.chi).join('-')} tương hình — ${desc}` });
    }
  }
  // Tương Hại
  for (const [a, b] of TUONG_HAI_PAIRS) {
    const pa = branches.find(x => x.chi === a);
    const pb = branches.find(x => x.chi === b);
    if (pa && pb) {
      results.push({ type: 'tuong_hai', typeLabel: 'Tương Hại', branches: [a, b], pillars: [pa.label, pb.label], nature: 'hung',
        description: `${a}-${b} tương hại — tổn hại ngầm, bất lợi quan hệ giữa ${pa.label} và ${pb.label}.` });
    }
  }
  return results;
}

// ── Thần Sát (Star Gods) ──────────────────────────────────────

export function deriveThanSat(yearChi: Chi, dayChi: Chi, dayCan: Can): ThanSat[] {
  const results: ThanSat[] = [];

  // Tướng Tinh (Command Star) — based on year branch
  const tuongTinh: Record<string, Chi[]> = {
    'Dần': ['Dần', 'Ngọ', 'Tuất'], 'Thân': ['Thân', 'Tý', 'Thìn'],
    'Tỵ': ['Tỵ', 'Dậu', 'Sửu'], 'Hợi': ['Hợi', 'Mão', 'Mùi'],
  };
  for (const [star, branches] of Object.entries(tuongTinh)) {
    if (branches.includes(yearChi)) {
      results.push({
        name: 'Tướng Tinh', nameVi: 'Tướng Tinh', nature: 'cat',
        pillar: 'Năm', description: `Có quý nhân phù trợ, phúc lộc bền lâu (nhóm ${star}).`,
      });
      break;
    }
  }

  // Đào Hoa (Peach Blossom) — romance star
  const daoHoa: Record<Chi, Chi> = {
    'Tý': 'Dậu', 'Sửu': 'Ngọ', 'Dần': 'Mão', 'Mão': 'Tý',
    'Thìn': 'Dậu', 'Tỵ': 'Ngọ', 'Ngọ': 'Mão', 'Mùi': 'Tý',
    'Thân': 'Dậu', 'Dậu': 'Ngọ', 'Tuất': 'Mão', 'Hợi': 'Tý',
  };
  if (daoHoa[yearChi] === dayChi) {
    results.push({
      name: 'Đào Hoa', nameVi: 'Đào Hoa', nature: 'trung',
      pillar: 'Ngày', description: 'Duyên dáng, hấp dẫn. Cẩn thận tình cảm phức tạp.',
    });
  }

  // Dịch Mã (Travel Star)
  const dichMa: Record<Chi, Chi> = {
    'Dần': 'Thân', 'Ngọ': 'Thân', 'Tuất': 'Thân',
    'Thân': 'Dần', 'Tý': 'Dần', 'Thìn': 'Dần',
    'Tỵ': 'Hợi', 'Dậu': 'Hợi', 'Sửu': 'Hợi',
    'Hợi': 'Tỵ', 'Mão': 'Tỵ', 'Mùi': 'Tỵ',
  };
  if (dichMa[yearChi] === dayChi) {
    results.push({
      name: 'Dịch Mã', nameVi: 'Dịch Mã', nature: 'cat',
      pillar: 'Ngày', description: 'Hay di chuyển, thay đổi. Thuận lợi công việc liên quan đến du lịch, ngoại thương.',
    });
  }

  // Hoa Cái (Canopy Star) — independence
  const hoaCai: Record<Chi, Chi> = {
    'Tý': 'Tuất', 'Sửu': 'Mùi', 'Dần': 'Thìn', 'Mão': 'Sửu',
    'Thìn': 'Tuất', 'Tỵ': 'Mùi', 'Ngọ': 'Thìn', 'Mùi': 'Sửu',
    'Thân': 'Tuất', 'Dậu': 'Mùi', 'Tuất': 'Thìn', 'Hợi': 'Sửu',
  };
  if (hoaCai[yearChi] === dayChi) {
    results.push({
      name: 'Hoa Cái', nameVi: 'Hoa Cái', nature: 'trung',
      pillar: 'Ngày', description: 'Thông minh, tài hoa nhưng có xu hướng cô đơn, độc lập. Thu hút người khác bằng trí tuệ hơn là tình cảm.',
    });
  }

  // Thiên Ất Quý Nhân (Heavenly Noble) — based on day stem
  const quyNhan: Record<Can, Chi[]> = {
    'Giáp': ['Sửu', 'Mùi'], 'Ất': ['Tý', 'Thân'], 'Bính': ['Hợi', 'Dậu'],
    'Đinh': ['Hợi', 'Dậu'], 'Mậu': ['Sửu', 'Mùi'], 'Kỷ': ['Tý', 'Thân'],
    'Canh': ['Sửu', 'Mùi'], 'Tân': ['Dần', 'Ngọ'], 'Nhâm': ['Mão', 'Tỵ'],
    'Quý': ['Mão', 'Tỵ'],
  };
  const dmCan = dayCan;
  if (quyNhan[dmCan]) {
    for (const chi of [yearChi, dayChi]) {
      if (quyNhan[dmCan].includes(chi)) {
        results.push({
          name: 'Thiên Ất Quý Nhân', nameVi: 'Thiên Ất Quý Nhân', nature: 'cat',
          pillar: chi === yearChi ? 'Năm' : 'Ngày',
          description: 'Quý nhân bậc nhất trong tất cả thần sát. Được trời phù hộ, gặp nạn hóa lành, luôn có người giúp đỡ.',
        });
        break;
      }
    }
  }

  // Văn Xương (Literary Star)
  const vanXuong: Record<Can, Chi> = {
    'Giáp': 'Tỵ', 'Ất': 'Ngọ', 'Bính': 'Thân', 'Đinh': 'Dậu',
    'Mậu': 'Thân', 'Kỷ': 'Dậu', 'Canh': 'Hợi', 'Tân': 'Tý',
    'Nhâm': 'Dần', 'Quý': 'Mão',
  };
  if (vanXuong[dmCan] === yearChi || vanXuong[dmCan] === dayChi) {
    results.push({
      name: 'Văn Xương', nameVi: 'Văn Xương', nature: 'cat',
      pillar: vanXuong[dmCan] === yearChi ? 'Năm' : 'Ngày',
      description: 'Học giỏi, thi cử thuận lợi, có duyên với chữ nghĩa và tri thức. Phù hợp nghề viết lách, giảng dạy, nghiên cứu.',
    });
  }

  // Kim Dư (Golden Coach) — wealth protector
  const kimDu: Record<Can, Chi> = {
    'Giáp': 'Thìn', 'Ất': 'Tỵ', 'Bính': 'Mùi', 'Đinh': 'Thân',
    'Mậu': 'Tuất', 'Kỷ': 'Hợi', 'Canh': 'Sửu', 'Tân': 'Dần',
    'Nhâm': 'Thìn', 'Quý': 'Tỵ',
  };
  if (kimDu[dmCan] === yearChi || kimDu[dmCan] === dayChi) {
    results.push({
      name: 'Kim Dư', nameVi: 'Kim Dư', nature: 'cat',
      pillar: kimDu[dmCan] === yearChi ? 'Năm' : 'Ngày',
      description: 'Xe vàng — có phươc giàu sang, tài lộc vững bền. Thường được hưởng phúc vật chất mà không cần bôn ba.',
    });
  }

  // Kiếp Sát (Robbery Sha)
  const kiepSat: Record<Chi, Chi> = {
    'Tý': 'Tỵ', 'Sửu': 'Dần', 'Dần': 'Hợi', 'Mão': 'Thân',
    'Thìn': 'Tỵ', 'Tỵ': 'Dần', 'Ngọ': 'Hợi', 'Mùi': 'Thân',
    'Thân': 'Tỵ', 'Dậu': 'Dần', 'Tuất': 'Hợi', 'Hợi': 'Thân',
  };
  if (kiepSat[yearChi] === dayChi) {
    results.push({
      name: 'Kiếp Sát', nameVi: 'Kiếp Sát', nature: 'hung',
      pillar: 'Ngày', description: 'Cẩn thận tai nạn bất ngờ, mất mát tài sản. Nên thận trọng trong đầu tư, tránh mạo hiểm.',
    });
  }

  // Hồng Diễm (Red Flame — attractiveness)
  const hongDiem: Record<Chi, Chi> = {
    'Tý': 'Mão', 'Sửu': 'Dần', 'Dần': 'Sửu', 'Mão': 'Tý',
    'Thìn': 'Hợi', 'Tỵ': 'Tuất', 'Ngọ': 'Dậu', 'Mùi': 'Thân',
    'Thân': 'Mùi', 'Dậu': 'Ngọ', 'Tuất': 'Tỵ', 'Hợi': 'Thìn',
  };
  if (hongDiem[yearChi] === dayChi) {
    results.push({
      name: 'Hồng Diễm', nameVi: 'Hồng Diễm', nature: 'trung',
      pillar: 'Ngày', description: 'Sức hấp dẫn bẩm sinh mạnh mẽ, thu hút đối phương. Nhiều mối quan hệ tình cảm, cần cân bằng.',
    });
  }

  // Thiên Đức Quý Nhân — academic derivation based on month branch.
  const THIEN_DUC_BY_BRANCH: Record<Chi, Can> = {
    'Dần': 'Đinh', 'Mão': 'Canh', 'Thìn': 'Nhâm', 'Tỵ': 'Tân',
    'Ngọ': 'Giáp', 'Mùi': 'Quý', 'Thân': 'Mậu', 'Dậu': 'Ất',
    'Tuất': 'Bính', 'Hợi': 'Kỷ', 'Tý': 'Nhâm', 'Sửu': 'Canh',
  };
  const thienDucStem = THIEN_DUC_BY_BRANCH[yearChi];
  if (thienDucStem && dayCan === thienDucStem) {
    results.push({
      name: 'Thiên Đức', nameVi: 'Thiên Đức Quý Nhân', nature: 'cat',
      pillar: 'Ngày', description: 'Nhân đức cao, tính tình hiền lành, hay làm phúc. Được trời ban phước lộc tự nhiên. Gặp hung hóa cát.',
    });
  }

  if (results.length === 0) {
    results.push({
      name: 'Bình An', nameVi: 'Bình An', nature: 'cat',
      pillar: 'Tổng', description: 'Không có thần sát đặc biệt, cuộc sống ổn định.',
    });
  }

  return results;
}

// ── Day Master Analysis (Tử Bình School) ──────────────────────

/**
 * Scoring weight distribution for Day Master strength analysis.
 * Based on classical Tử Bình (子平) methodology:
 * - Lệnh Tháng is primary (seasonal qi determines 40% of strength)
 * - Tàng Can roots provide supporting evidence (30%)
 * - Surface element count is secondary confirmation (30%)
 */
const DM_WEIGHTS = {
  LENH_THANG: 0.4,
  TANG_CAN_ROOT: 0.3,
  SURFACE_COUNT: 0.3,
} as const;

/**
 * Strength classification thresholds (totalScore is a weighted average on 0-10 scale).
 * - STRONG (≥ 6.5): Day Master receives abundant support — needs draining/controlling elements.
 * - MODERATE (≥ 4.0): Balanced — no urgent correction needed.
 * - WEAK (< 4.0): Day Master lacks support — needs generating/supporting elements.
 *
 * Reference: 《子平真詮》 strength gradation system.
 */
const DM_THRESHOLDS = {
  STRONG: 6.5,
  MODERATE: 4.0,
} as const;

/**
 * Weighted Day Master strength analysis based on academic Tử Bình method.
 * @see DM_WEIGHTS for scoring weight distribution
 * @see DM_THRESHOLDS for strength classification boundaries
 */
export function analyzeDayMaster(
  dayPillar: Pillar,
  elementCount: Record<NguHanh, number>,
  monthSeason: string,
  pillars?: Pillar[],
): DayMasterAnalysis {
  const dayMaster = dayPillar.can;
  const dayElement = CAN_ELEMENT[dayMaster];
  const generatingElement = findGeneratingElement(dayElement);
  const drainElement = GENERATES[dayElement];
  const overcomeElement = DESTROYS[dayElement];
  const controlledByElement = findControllingElement(dayElement);

  // ── 1. Lệnh Tháng (Seasonal Influence) — 40% weight ──
  const SEASON_STRONG: Record<string, NguHanh> = {
    'Xuân': 'Mộc', 'Hạ': 'Hỏa', 'Thu': 'Kim', 'Đông': 'Thủy',
  };
  const seasonElement = SEASON_STRONG[monthSeason];
  let lenhThangScore: number;
  if (seasonElement === dayElement) {
    lenhThangScore = 10;
  } else if (generatingElement && seasonElement === generatingElement) {
    lenhThangScore = 7;
  } else if (GENERATES[seasonElement] === dayElement) {
    lenhThangScore = 8;
  } else if (dayElement === drainElement && seasonElement === drainElement) {
    lenhThangScore = 3;
  } else if (DESTROYS[seasonElement] === dayElement) {
    lenhThangScore = 1;
  } else if (DESTROYS[dayElement] === seasonElement) {
    lenhThangScore = 2;
  } else {
    lenhThangScore = 5;
  }

  // ── 2. Tàng Can Root Strength — 30% weight ──
  let tangCanRootScore = 0;
  if (pillars) {
    for (const p of pillars) {
      const hidden = TANG_CAN_TABLE[p.chi];
      if (hidden) {
        for (const h of hidden) {
          if (h.element === dayElement || (generatingElement && h.element === generatingElement)) {
            const rootWeight = h.strength === 'chính_khí' ? 3 : h.strength === 'trung_khí' ? 2 : 1;
            tangCanRootScore += rootWeight;
          }
        }
      }
    }
  } else {
    tangCanRootScore = elementCount[dayElement] + (generatingElement ? elementCount[generatingElement] * 0.5 : 0);
  }
  tangCanRootScore = Math.min(10, tangCanRootScore * 1.5);

  // ── 3. Surface Element Count — 30% weight ──
  let surfaceScore = 0;
  surfaceScore += elementCount[dayElement] * 2;
  if (generatingElement) surfaceScore += elementCount[generatingElement] * 1;
  surfaceScore -= elementCount[overcomeElement] * 1;
  if (controlledByElement) surfaceScore -= elementCount[controlledByElement as NguHanh] * 0.5;
  surfaceScore = Math.max(0, Math.min(10, surfaceScore + 3));

  // ── Weighted total (out of 10) ──
  const totalScore = lenhThangScore * DM_WEIGHTS.LENH_THANG
    + tangCanRootScore * DM_WEIGHTS.TANG_CAN_ROOT
    + surfaceScore * DM_WEIGHTS.SURFACE_COUNT;

  let strength: DayMasterAnalysis['strength'];
  let strengthLabel: string;
  let strengthExplanation: string;

  if (totalScore >= DM_THRESHOLDS.STRONG) {
    strength = 'vượng';
    strengthLabel = 'Nhật Chủ Vượng';
    strengthExplanation = `${dayMaster} (${dayElement}) được nhiều hành hỗ trợ qua Lệnh Tháng (mùa ${monthSeason}) và Tàng Can. Có sức mạnh dồi dào, cần hành tiết chế để cân bằng.`;
  } else if (totalScore >= DM_THRESHOLDS.MODERATE) {
    strength = 'trung_bình';
    strengthLabel = 'Nhật Chủ Trung Bình';
    strengthExplanation = `${dayMaster} (${dayElement}) ở trạng thái cân bằng. Mùa ${monthSeason} không quá thiên lệch, hành hỗ trợ và khắc chế tương đối đều.`;
  } else {
    strength = 'suy';
    strengthLabel = 'Nhật Chủ Suy';
    strengthExplanation = `${dayMaster} (${dayElement}) thiếu hỗ trợ, mùa ${monthSeason} không thuận lợi. Cần bổ sung bằng hành tương sinh (${generatingElement || dayElement}).`;
  }

  // Favorable/unfavorable elements
  const favorableElements: NguHanh[] = [];
  const unfavorableElements: NguHanh[] = [];

  if (strength === 'suy') {
    favorableElements.push(dayElement);
    if (generatingElement) favorableElements.push(generatingElement);
    unfavorableElements.push(overcomeElement);
    if (drainElement) unfavorableElements.push(drainElement);
  } else if (strength === 'vượng') {
    unfavorableElements.push(dayElement);
    if (generatingElement) unfavorableElements.push(generatingElement);
    favorableElements.push(overcomeElement);
    if (drainElement) favorableElements.push(drainElement);
  } else {
    favorableElements.push(dayElement);
    if (drainElement) favorableElements.push(drainElement);
    unfavorableElements.push(overcomeElement);
  }

  return {
    dayMaster,
    dayMasterElement: dayElement,
    strength,
    strengthLabel,
    strengthExplanation,
    favorableElements: [...new Set(favorableElements)],
    unfavorableElements: [...new Set(unfavorableElements)],
  };
}

// ── Cách Cục (Pattern Classification) ─────────────────────────

export function classifyCachCuc(dayMaster: DayMasterAnalysis, elementCount: Record<NguHanh, number>): { name: string; description: string } {
  const dm = dayMaster.dayMasterElement;
  const generatingElement = findGeneratingElement(dm);
  const drainElement = GENERATES[dm];
  const overcomeElement = DESTROYS[dm];
  const controlledByElement = findControllingElement(dm);

  const sorted = Object.entries(elementCount).sort(([, a], [, b]) => b - a);
  const maxElement = sorted[0][0] as NguHanh;
  const maxCount = sorted[0][1];

  if (maxCount >= 5 && maxElement === dm) {
    return { name: 'Chuyên Vượng Cục', description: `Hành ${dm} chi phối toàn bộ tứ trụ. Nên thuận theo thế vượng, dùng Thực Thương tiết khí.` };
  }
  if (maxCount >= 5 && maxElement !== dm) {
    return { name: `Tòng ${maxElement} Cục`, description: `Nhật Chủ ${dm} quá yếu, thuận theo hành ${maxElement} áp đảo.` };
  }
  if (controlledByElement && elementCount[controlledByElement] >= 3 && dayMaster.strength === 'suy') {
    return { name: 'Thất Sát Công Thân Cục', description: `Hành ${controlledByElement} (Thất Sát) khắc chế Nhật Chủ ${dm} mạnh mẽ. Cần Ấn Tinh (${generatingElement}) hóa Sát sinh Thân.` };
  }
  if (controlledByElement && elementCount[controlledByElement] >= 2 && dayMaster.strength !== 'suy') {
    return { name: 'Chính Quan Cục', description: `Quan Tinh (${controlledByElement}) chế hóa Nhật Chủ ${dm} vừa đủ. Cách cục quý hiển, thuận lợi sự nghiệp.` };
  }
  if (dayMaster.strength === 'vượng' && drainElement && elementCount[drainElement] >= 2) {
    return { name: 'Thực Thần Chế Sát Cục', description: `Nhật Chủ ${dm} vượng, Thực Thần ${drainElement} tiết bớt khí và chế ngự Sát tinh.` };
  }
  if (dayMaster.strength === 'vượng' && drainElement && overcomeElement && elementCount[drainElement] + elementCount[overcomeElement] >= 3) {
    return { name: 'Thương Quan Cục', description: `Nhật Chủ ${dm} vượng, Thương Quan (${drainElement}) tiết khí mạnh. Người có tài hoa, sáng tạo.` };
  }
  if (dayMaster.strength === 'suy' && generatingElement && elementCount[generatingElement] >= 2) {
    return { name: 'Ấn Tinh Phù Thân Cục', description: `Nhật Chủ ${dm} suy, nhờ Ấn Tinh (${generatingElement}) sinh trợ. Được quý nhân giúp đỡ.` };
  }
  if (elementCount[dm] >= 3 && overcomeElement && elementCount[overcomeElement] >= 1) {
    return { name: 'Kiếp Tài Cục', description: `Nhiều Tỷ Kiếp (hành ${dm}) cạnh tranh Tài (${overcomeElement}). Cẩn thận tài chính.` };
  }
  if (overcomeElement && elementCount[overcomeElement] >= 2 && dayMaster.strength !== 'suy') {
    return { name: 'Chính Tài Cục', description: `Tài Tinh (${overcomeElement}) phong phú, Nhật Chủ ${dm} đủ sức quản lý. Thuận lợi tài vận.` };
  }
  if (generatingElement && elementCount[generatingElement] >= 3 && dayMaster.strength === 'vượng') {
    return { name: 'Ấn Kiêu Đoạt Thực Cục', description: `Ấn Tinh (${generatingElement}) quá nhiều, tiết chế Thực Thần. Cần Tài Tinh phá Ấn.` };
  }
  return { name: 'Trung Hòa Cục', description: 'Các hành phân bổ tương đối đều, tứ trụ cân bằng. Cách cục ổn định, linh hoạt.' };
}

// ── Điều Hậu (Seasonal Climate Adjustment) ────────────────────

export function assessDieuHau(dayMasterElement: NguHanh, lunarMonth: number): { season: string; climate: string; neededElement: NguHanh; assessment: string } {
  const MONTH_SEASON: Record<number, string> = {
    1: 'Xuân', 2: 'Xuân', 3: 'Xuân',
    4: 'Hạ', 5: 'Hạ', 6: 'Hạ',
    7: 'Thu', 8: 'Thu', 9: 'Thu',
    10: 'Đông', 11: 'Đông', 12: 'Đông',
  };
  const season = MONTH_SEASON[lunarMonth] || 'Xuân';

  let neededElement: NguHanh;
  let climate: string;
  let assessment: string;

  if (season === 'Đông') {
    climate = 'Lạnh, cần ấm';
    neededElement = 'Hỏa';
    assessment = dayMasterElement === 'Hỏa' || dayMasterElement === 'Mộc'
      ? 'Nhật Chủ tự mang hơi ấm, thuận lợi mùa Đông.'
      : `Sinh mùa Đông lạnh, cần hành Hỏa sưởi ấm. ${dayMasterElement === 'Thủy' ? 'Thủy gặp Đông càng thêm lạnh, rất cần Hỏa.' : ''}`;
  } else if (season === 'Hạ') {
    climate = 'Nóng, cần mát';
    neededElement = 'Thủy';
    assessment = dayMasterElement === 'Thủy' || dayMasterElement === 'Kim'
      ? 'Nhật Chủ tự mang hơi mát, thuận lợi mùa Hè.'
      : `Sinh mùa Hè nóng, cần hành Thủy giải nhiệt. ${dayMasterElement === 'Hỏa' ? 'Hỏa gặp Hạ càng nóng, rất cần Thủy.' : ''}`;
  } else if (season === 'Xuân') {
    climate = 'Ấm, vạn vật sinh trưởng';
    neededElement = dayMasterElement === 'Mộc' ? 'Kim' : 'Mộc';
    assessment = 'Xuân ấm áp, Mộc khí vượng. ' + (dayMasterElement === 'Mộc' ? 'Cần Kim tiết chế.' : 'Khí tiết hài hòa.');
  } else {
    climate = 'Mát, thu hoạch';
    neededElement = dayMasterElement === 'Kim' ? 'Hỏa' : 'Kim';
    assessment = 'Thu mát mẻ, Kim khí vượng. ' + (dayMasterElement === 'Kim' ? 'Cần Hỏa tiết luyện.' : 'Khí tiết thuận lợi.');
  }

  return { season, climate, neededElement, assessment };
}

// ── Trường Sinh 12-Phase Life Cycle ───────────────────────────

const TRUONG_SINH_PHASES = [
  { name: 'Trường Sinh', quality: 'strong', meaning: 'Khởi đầu, sinh sôi — năng lượng khởi phát mạnh mẽ' },
  { name: 'Mộc Dục', quality: 'neutral', meaning: 'Tắm gội — giai đoạn thanh lọc, dễ bị dao động' },
  { name: 'Quan Đới', quality: 'growing', meaning: 'Đội mũ — bắt đầu được công nhận, trưởng thành' },
  { name: 'Lâm Quan', quality: 'strong', meaning: 'Đến chức — sức mạnh đang lên, sự nghiệp phát triển' },
  { name: 'Đế Vượng', quality: 'peak', meaning: 'Cực thịnh — đỉnh cao năng lượng, quyền lực tối đa' },
  { name: 'Suy', quality: 'declining', meaning: 'Suy giảm — bắt đầu đi xuống, cần giữ thận trọng' },
  { name: 'Bệnh', quality: 'weak', meaning: 'Bệnh — sức yếu, dễ gặp trở ngại sức khỏe hoặc tinh thần' },
  { name: 'Tử', quality: 'weak', meaning: 'Tử — năng lượng cạn kiệt, cần nghỉ ngơi tái tạo' },
  { name: 'Mộ', quality: 'stored', meaning: 'Mộ (Khố) — năng lượng được tích trữ, tiềm ẩn tài sản' },
  { name: 'Tuyệt', quality: 'empty', meaning: 'Tuyệt — hoàn toàn trống rỗng, khởi đầu mới sắp đến' },
  { name: 'Thai', quality: 'forming', meaning: 'Thai — hình thành trong bào thai, ý tưởng manh nha' },
  { name: 'Dưỡng', quality: 'nurturing', meaning: 'Dưỡng — nuôi dưỡng, chuẩn bị cho chu kỳ mới' },
];

const TRUONG_SINH_START: Record<NguHanh, { yang: number; yin: number }> = {
  'Mộc':  { yang: 10, yin: 5 },
  'Hỏa':  { yang: 2,  yin: 9 },
  'Thổ':  { yang: 2,  yin: 9 },
  'Kim':  { yang: 5,  yin: 0 },
  'Thủy': { yang: 7,  yin: 2 },
};

export function calculateTruongSinh(pillars: Pillar[], dayMasterElement: NguHanh, dayCanIdx: number): TruongSinhEntry[] {
  const isYang = dayCanIdx % 2 === 0;
  const startConfig = TRUONG_SINH_START[dayMasterElement];
  const startIdx = isYang ? startConfig.yang : startConfig.yin;
  const direction = isYang ? 1 : -1;

  return pillars.map(pillar => {
    const branchIdx = CHI_LIST.indexOf(pillar.chi);
    const offset = ((branchIdx - startIdx) * direction + 12) % 12;
    const phase = TRUONG_SINH_PHASES[offset];

    return {
      pillarName: pillar.labelVi || pillar.label,
      branch: pillar.chi,
      phase: phase.name,
      quality: phase.quality,
      meaning: phase.meaning,
    };
  });
}
