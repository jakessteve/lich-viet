/**
 * Bazi Interpretation Service — Synthesized analysis layer
 *
 * Pure functions that combine engine output + knowledge base data
 * to generate rich narrative interpretations.
 */

import type { BaziChart, NguHanh } from '@lich-viet/core/bazi';
import { DAY_MASTER_PROFILES, type DayMasterProfile } from '../../data/interpretation/bazi/dayMasterProfiles';
import { THAP_THAN_MEANINGS, type ThapThanInfo } from '../../data/interpretation/bazi/thapThanMeanings';
import { NAP_AM_MEANINGS, type NapAmMeaning } from '../../data/interpretation/bazi/napAmMeanings';
import { ELEMENT_LIFE_ADVICE, type LifeDomainAdvice } from '../../data/interpretation/bazi/lifeDomainAdvice';
import type { Can } from '../../types/calendar';

// ── Public Types ───────────────────────────────────────────────

export interface PersonalityNarrative {
  profile: DayMasterProfile;
  napAmMeaning: NapAmMeaning | null;
  yearNapAmMeaning: NapAmMeaning | null;
  dominantGods: { name: string; count: number; info: ThapThanInfo }[];
  summary: string;
}

export interface LifeDomainAnalysis {
  career: string;
  wealth: string;
  health: string;
  relationship: string;
}

export interface PracticalAdvice {
  primary: LifeDomainAdvice;
  secondary: LifeDomainAdvice | null;
  favorableElements: NguHanh[];
  summary: string;
}

export interface EnrichedLuckCycle {
  index: number;
  narrative: string;
  thapThanGod: string;
}

// ── Personality Narrative ──────────────────────────────────────

export function generatePersonalityNarrative(chart: BaziChart): PersonalityNarrative {
  const profile = DAY_MASTER_PROFILES[chart.dayMaster.dayMaster];
  const napAmMeaning = NAP_AM_MEANINGS[chart.dayPillar.napAm] || null;
  const yearNapAmMeaning = NAP_AM_MEANINGS[chart.yearPillar.napAm] || null;

  // Count dominant Thập Thần gods
  const godCounts: Record<string, number> = {};
  for (const t of chart.thapThan) {
    if (t.position === 'can') {
      godCounts[t.god] = (godCounts[t.god] || 0) + 1;
    }
  }
  const dominantGods = Object.entries(godCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([name, count]) => ({
      name,
      count,
      info: THAP_THAN_MEANINGS[name as keyof typeof THAP_THAN_MEANINGS],
    }))
    .filter((d) => d.info);

  // Generate summary
  const strengthText =
    chart.dayMaster.strength === 'vượng'
      ? 'mạnh mẽ, tự tin'
      : chart.dayMaster.strength === 'suy'
        ? 'cần được hỗ trợ, nuôi dưỡng'
        : 'cân bằng, linh hoạt';
  const godText =
    dominantGods.length > 0
      ? ` Thập Thần nổi bật là ${dominantGods.map((g) => g.name).join(', ')}, cho thấy ${dominantGods[0]?.info?.keyword || 'tính cách đa dạng'}.`
      : '';
  const napAmText = napAmMeaning
    ? ` Nạp Âm trụ ngày "${napAmMeaning.name}": ${napAmMeaning.meaning.split('.')[0]}.`
    : '';

  const summary = `${profile.archetype}. Nhật Chủ ${chart.dayMaster.dayMaster} (${profile.element}) ${strengthText}. ${profile.personality.split('.')[0]}.${godText}${napAmText}`;

  return { profile, napAmMeaning, yearNapAmMeaning, dominantGods, summary };
}

// ── Life Domain Analysis ───────────────────────────────────────

export function analyzeLifeDomains(chart: BaziChart): LifeDomainAnalysis {
  const profile = DAY_MASTER_PROFILES[chart.dayMaster.dayMaster];
  const strength = chart.dayMaster.strength;
  const favorable = chart.dayMaster.favorableElements;

  // Career
  const careerAdvice = favorable
    .map((el) => ELEMENT_LIFE_ADVICE[el]?.careers?.slice(0, 2).join(', '))
    .filter(Boolean)
    .join('; ');
  const career =
    `${profile.career} Hành hỷ dụng gợi ý thêm: ${careerAdvice || 'đa ngành nghề'}.` +
    (strength === 'vượng'
      ? ' Nhật Chủ vượng nên chọn ngành cạnh tranh, cần nhiều năng lượng.'
      : strength === 'suy'
        ? ' Nhật Chủ suy nên chọn ngành ổn định, có đội nhóm hỗ trợ.'
        : ' Nhật Chủ trung bình, linh hoạt chọn ngành phù hợp sở thích.');

  // Wealth
  const hasChinhTai = chart.thapThan.some((t) => t.god === 'Chính Tài' && t.position === 'can');
  const hasThienTai = chart.thapThan.some((t) => t.god === 'Thiên Tài' && t.position === 'can');
  const wealth = hasChinhTai
    ? 'Có Chính Tài lộ thiên can — thu nhập ổn định, giỏi quản lý tài chính. Phù hợp tích lũy dài hạn, đầu tư an toàn.'
    : hasThienTai
      ? 'Có Thiên Tài lộ thiên can — tài lộc bất ngờ, duyên với đầu tư và kinh doanh. Tiền đến nhanh nhưng cũng dễ đi, cần kỷ luật chi tiêu.'
      : 'Tài tinh ẩn trong tàng can — tài lộc đến từ sự nhẫn nại và tích lũy. Không giàu nhanh nhưng bền vững nếu kiên trì.';

  // Health
  const health =
    `${ELEMENT_LIFE_ADVICE[chart.dayMaster.dayMasterElement]?.healthFocus || 'Cần chú ý sức khỏe tổng quát.'} ` +
    (chart.dayMaster.strength === 'suy'
      ? 'Nhật Chủ suy, dễ hao tổn thể lực, cần nghỉ ngơi đầy đủ và bổ sung dinh dưỡng.'
      : chart.dayMaster.strength === 'vượng'
        ? 'Nhật Chủ vượng, thể lực tốt nhưng dễ nóng nảy, stress. Cần vận động đều đặn.'
        : 'Sức khỏe cân bằng, duy trì lối sống lành mạnh.');

  // Relationships
  const relationship =
    profile.relationship +
    (chart.thanSat.some((t) => t.name === 'Đào Hoa')
      ? ' Có sao Đào Hoa — duyên dáng, hấp dẫn nhưng cần cẩn thận tình cảm phức tạp.'
      : '') +
    (chart.thanSat.some((t) => t.name === 'Hồng Diễm')
      ? ' Có sao Hồng Diễm — sức thu hút mạnh, nhiều mối quan hệ.'
      : '');

  return { career, wealth, health, relationship };
}

// ── Practical Advice ───────────────────────────────────────────

export function generatePracticalAdvice(chart: BaziChart): PracticalAdvice {
  const favorable = chart.dayMaster.favorableElements;
  const primary = ELEMENT_LIFE_ADVICE[favorable[0]] || ELEMENT_LIFE_ADVICE['Thổ'];
  const secondary = favorable.length > 1 ? ELEMENT_LIFE_ADVICE[favorable[1]] : null;

  const summary =
    `Hành hỷ dụng chính là ${favorable[0]}${favorable.length > 1 ? ` và ${favorable[1]}` : ''}. ` +
    `Nên ưu tiên màu ${primary.colors.slice(0, 2).join(', ')}; hướng ${primary.directions.join(', ')}; ` +
    `số may mắn ${primary.numbers.join(', ')}.` +
    (secondary ? ` Bổ sung: màu ${secondary.colors[0]}, hướng ${secondary.directions[0]}.` : '');

  return { primary, secondary, favorableElements: favorable, summary };
}

// ── Enriched Luck Cycle Narratives ─────────────────────────────

const CYCLE_OPENERS: Record<string, string> = {
  'Tỉ Kiên': 'Bạn bước vào giai đoạn tự lập — thành bại phụ thuộc vào bản lĩnh của chính bạn.',
  'Kiếp Tài': 'Bạn bước vào giai đoạn biến động — mất rồi lại có, sóng gió rồi lại bình yên.',
  'Thực Thần': 'Bạn bước vào giai đoạn sáng tạo tự nhiên — mọi ý tưởng tuôn chảy như suối nguồn.',
  'Thương Quan': 'Bạn bước vào giai đoạn đột phá ngoạn mục — khuôn khổ cũ không còn giữ nổi bạn.',
  'Chính Tài': 'Bạn bước vào giai đoạn ổn định và thu hoạch — công sức được đền đáp xứng đáng.',
  'Thiên Tài': 'Bạn bước vào giai đoạn cơ hội bất ngờ — cánh cửa mở từ nơi bạn ít ngờ nhất.',
  'Chính Quan': 'Bạn bước vào giai đoạn kỷ cương và danh dự — sống đoan chính sẽ gặt hái lớn.',
  'Thất Sát': 'Bạn bước vào giai đoạn thử thách cam go — áp lực lớn nhưng cũng là cơ hội phi thường.',
  'Chính Ấn': 'Bạn bước vào giai đoạn trí tuệ tỏa sáng — quý nhân và tri thức đến cùng lúc.',
  'Thiên Ấn': 'Bạn bước vào giai đoạn giác ngộ — cô liêu nhưng trực giác phi thường.',
};

const CYCLE_CAT_BRIDGES: Record<string, string> = {
  'Tỉ Kiên': 'Sức mạnh nội tại giúp bạn tự đứng vững và mở rộng qua nỗ lực cá nhân.',
  'Kiếp Tài': 'Dù có sóng gió, bạn sẽ học được cách bất bại — mỗi lần ngã là mỗi lần mạnh hơn.',
  'Thực Thần': 'Tài năng tự nhiên của bạn được giải phóng — hãy để đam mê dẫn lối.',
  'Thương Quan': 'Sáng tạo đột phá mang lại kết quả bất ngờ — đây là lúc bạn tỏa sáng khác biệt.',
  'Chính Tài': 'Dòng tiền ổn định và sự nghiệp thăng tiến vững chắc — nền tảng tuyệt vời để tích lũy.',
  'Thiên Tài': 'Cơ hội tài chính bất ngờ xuất hiện — biết nắm bắt đúng lúc sẽ thay đổi cuộc chơi.',
  'Chính Quan': 'Uy tín và phẩm chất giúp bạn thăng tiến rõ ràng — được bề trên tín nhiệm.',
  'Thất Sát': 'Ai vượt qua được áp lực này sẽ đứng ở tầm cao mà ít người chạm tới.',
  'Chính Ấn': 'Học hỏi và quý nhân phù trợ giúp bạn phát triển sâu sắc cả tâm trí lẫn sự nghiệp.',
  'Thiên Ấn': 'Con đường riêng biệt của bạn mang đến giá trị mà thế giới sẽ nhận ra theo thời gian.',
};

const CYCLE_HUNG_BRIDGES: Record<string, string> = {
  'Tỉ Kiên': 'Cạnh tranh và xung đột có thể gia tăng — bạn cần phân biệt rõ đồng minh và đối thủ.',
  'Kiếp Tài': 'Tài sản dễ hao tổn — hãy bảo vệ những gì bạn đang có và tránh mạo hiểm.',
  'Thực Thần': 'Sáng tạo quá đà có thể khiến bạn lạc hướng — hãy giữ kỷ luật bên cạnh tự do.',
  'Thương Quan': 'Lời nói bốc đồng và sự nổi loạn có thể gây tổn thương — kiểm soát lửa bên trong.',
  'Chính Tài': 'Áp lực tài chính hoặc sự đơn điệu có thể khiến bạn mệt mỏi — cần duy trì động lực.',
  'Thiên Tài': 'Cơ hội đến kèm rủi ro — lòng tham lúc này là kẻ thù nguy hiểm nhất.',
  'Chính Quan': 'Kỷ luật quá mức hoặc áp lực từ cấp trên có thể khiến bạn cảm thấy gò bó.',
  'Thất Sát': 'Áp lực có thể áp đảo nếu bạn không giữ vững tinh thần — đừng chiến đấu một mình.',
  'Chính Ấn': 'Quá phụ thuộc vào người khác hoặc lý thuyết suông có thể làm bạn mất đi sự chủ động.',
  'Thiên Ấn': 'Cô đơn kéo dài có thể ảnh hưởng tâm trạng — đừng quên kết nối với thế giới bên ngoài.',
};

export function enrichLuckCycleNarratives(chart: BaziChart): EnrichedLuckCycle[] {
  const CAN_LIST: Can[] = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  const CAN_ELEMENT: Record<Can, NguHanh> = {
    Giáp: 'Mộc',
    Ất: 'Mộc',
    Bính: 'Hỏa',
    Đinh: 'Hỏa',
    Mậu: 'Thổ',
    Kỷ: 'Thổ',
    Canh: 'Kim',
    Tân: 'Kim',
    Nhâm: 'Thủy',
    Quý: 'Thủy',
  };

  return chart.luckCycles.map((cycle, i) => {
    // Derive Thập Thần for the luck pillar
    const dmEl = chart.dayMaster.dayMasterElement;
    const cycleEl = CAN_ELEMENT[cycle.can];
    const GENERATES: Record<NguHanh, NguHanh> = { Kim: 'Thủy', Thủy: 'Mộc', Mộc: 'Hỏa', Hỏa: 'Thổ', Thổ: 'Kim' };
    const DESTROYS: Record<NguHanh, NguHanh> = { Kim: 'Mộc', Mộc: 'Thổ', Thổ: 'Thủy', Thủy: 'Hỏa', Hỏa: 'Kim' };

    const dmIdx = CAN_LIST.indexOf(chart.dayMaster.dayMaster);
    const cIdx = CAN_LIST.indexOf(cycle.can);
    const sameP = dmIdx % 2 === cIdx % 2;

    let god: string;
    if (cycleEl === dmEl) god = sameP ? 'Tỉ Kiên' : 'Kiếp Tài';
    else if (GENERATES[dmEl] === cycleEl) god = sameP ? 'Thực Thần' : 'Thương Quan';
    else if (DESTROYS[dmEl] === cycleEl) god = sameP ? 'Thiên Tài' : 'Chính Tài';
    else if (DESTROYS[cycleEl] === dmEl) god = sameP ? 'Thất Sát' : 'Chính Quan';
    else god = sameP ? 'Thiên Ấn' : 'Chính Ấn';

    const godInfo = THAP_THAN_MEANINGS[god as keyof typeof THAP_THAN_MEANINGS];
    const napAmInfo = NAP_AM_MEANINGS[cycle.napAm];

    // Build flowing narrative with personal voice
    const parts: string[] = [];

    // 1. Personal header with age context
    const ageContext =
      cycle.startAge <= 15
        ? 'thời niên thiếu'
        : cycle.startAge <= 30
          ? 'giai đoạn thanh xuân'
          : cycle.startAge <= 50
            ? 'giai đoạn sung mãn'
            : 'giai đoạn trưởng thành';
    parts.push(
      `Đại vận ${cycle.can} ${cycle.chi} (${cycle.startAge}–${cycle.endAge} tuổi) — ${ageContext} của bạn được dẫn dắt bởi ${god} (${godInfo?.keyword || ''}).`,
    );

    // 2. Engaging opener
    const opener = CYCLE_OPENERS[god];
    if (opener) parts.push(opener);

    // 3. Rating-specific bridge with personal context
    if (cycle.rating === 'cat') {
      const bridge = CYCLE_CAT_BRIDGES[god];
      if (bridge) parts.push(bridge);
    } else if (cycle.rating === 'hung') {
      const bridge = CYCLE_HUNG_BRIDGES[god];
      if (bridge) parts.push(bridge);
    } else {
      parts.push(
        'Đây là giai đoạn bình ổn — không có sóng lớn, nhưng cũng là lúc bạn xây dựng nền tảng vững chắc cho chương tiếp theo.',
      );
    }

    // 4. Nạp Âm enrichment with metaphor
    if (napAmInfo) {
      const napAmShort = napAmInfo.meaning.split('—')[1]?.trim().split('.')[0] || napAmInfo.meaning.split('.')[0];
      parts.push(`Nạp Âm "${napAmInfo.name}" tô thêm sắc thái: ${napAmShort}.`);
    }

    return { index: i, narrative: parts.join(' '), thapThanGod: god };
  });
}
