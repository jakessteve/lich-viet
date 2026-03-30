/**
 * cachCucPatterns.ts — Tử Vi / Bát Tự Cách Cục Pattern Configuration
 *
 * JSON-style pattern definitions for detecting special chart configurations
 * (Cách Cục) in Tử Vi and Bát Tự charts. Each pattern has:
 * - id: unique identifier
 * - name: Vietnamese name
 * - school: which analysis school (tuvi / bazi / both)
 * - tier: minimum tier required to see this insight (premium / elite)
 * - conditions: array of conditions to match
 * - verdict: cát (auspicious) / hung (inauspicious) / trung tính (neutral)
 * - insight: Vietnamese takeaway text
 * - advice: actionable advice
 *
 * Phase 4.1 — Interpretation Layer foundation
 */

export type CachCucSchool = 'tuvi' | 'bazi' | 'both';
export type CachCucVerdict = 'đại cát' | 'cát' | 'trung tính' | 'hung' | 'đại hung';
export type TierRequirement = 'premium' | 'elite';

export interface CachCucCondition {
  /** Type of condition check */
  type: 'star_in_palace' | 'star_pair' | 'element_match' | 'ten_god_dominant' | 'branch_clash' | 'branch_harmony' | 'day_master_strength';
  /** Parameters for the condition */
  params: Record<string, string | string[] | number | boolean>;
}

export interface CachCucPattern {
  id: string;
  name: string;
  school: CachCucSchool;
  tier: TierRequirement;
  verdict: CachCucVerdict;
  conditions: CachCucCondition[];
  insight: string;
  advice: string;
  /** Rarity rating 1-5 (5 = extremely rare) */
  rarity: number;
}

// ══════════════════════════════════════════════════════════
// TỬ VI CÁCH CỤC — Special Star Configurations
// ══════════════════════════════════════════════════════════

export const TUVI_CACH_CUC: CachCucPattern[] = [
  {
    id: 'tuvi-co-phu-menh',
    name: 'Tử Phủ Đồng Cung',
    school: 'tuvi',
    tier: 'premium',
    verdict: 'đại cát',
    rarity: 3,
    conditions: [
      { type: 'star_pair', params: { stars: ['Tử Vi', 'Thiên Phủ'], palace: 'Mệnh' } }
    ],
    insight: 'Cách cục Đế Vương: Tử Vi và Thiên Phủ đồng cung Mệnh, chủ nhân phú quý song toàn, có quyền lực tự nhiên và tài chính ổn định.',
    advice: 'Tận dụng vị thế lãnh đạo thiên bẩm. Hãy dẫn dắt nhóm và tổ chức — đây là sứ mệnh của bạn.',
  },
  {
    id: 'tuvi-co-sat-pha-liem-tham',
    name: 'Sát Phá Liêm Tham',
    school: 'tuvi',
    tier: 'premium',
    verdict: 'cát',
    rarity: 3,
    conditions: [
      { type: 'star_in_palace', params: { star: 'Thất Sát', palace: 'Mệnh' } },
      { type: 'star_in_palace', params: { star: 'Phá Quân', palace: 'Thiên Di' } },
    ],
    insight: 'Cách cục Tướng Quân: Sát Phá Liêm Tham đồng tuyến, chủ nhân có tính cách mạnh mẽ, quyết đoán, thích mạo hiểm. Tiền vận vất vả nhưng hậu vận thành đạt.',
    advice: 'Giai đoạn trước 35 tuổi là thời kỳ rèn luyện. Đừng nản chí — vận tốt nhất bắt đầu từ trung niên.',
  },
  {
    id: 'tuvi-co-nhat-nguyet-dong-minh',
    name: 'Nhật Nguyệt Đồng Minh',
    school: 'tuvi',
    tier: 'premium',
    verdict: 'đại cát',
    rarity: 4,
    conditions: [
      { type: 'star_in_palace', params: { star: 'Thái Dương', palace: 'Mệnh' } },
      { type: 'star_in_palace', params: { star: 'Thái Âm', palace: 'Quan Lộc' } },
    ],
    insight: 'Cách cục Nhật Nguyệt Đồng Minh: Thái Dương sáng tại Mệnh, Thái Âm sáng tại Quan Lộc. Chủ nhân danh tiếng vang dội, sự nghiệp thuận lợi cả trong lẫn ngoài.',
    advice: 'Bạn có thiên mệnh xuất đầu lộ diện. Hãy tận dụng truyền thông, mạng xã hội và các mối quan hệ công khai.',
  },
  {
    id: 'tuvi-co-menh-vo-chinh-dieu',
    name: 'Mệnh Vô Chính Diệu',
    school: 'tuvi',
    tier: 'elite',
    verdict: 'trung tính',
    rarity: 2,
    conditions: [
      { type: 'star_in_palace', params: { star: '__NONE_MAJOR__', palace: 'Mệnh' } },
    ],
    insight: 'Cung Mệnh không có chính tinh: Đặc điểm này tạo ra tính cách linh hoạt, dễ thích nghi nhưng thiếu chủ kiến. Lá số phụ thuộc nhiều vào sao phụ và Vận Hạn.',
    advice: 'Khi Mệnh vô chính diệu, hãy xem kỹ cung chiếu (Thiên Di, Quan Lộc, Tài Bạch) để hiểu vận mệnh thực sự.',
  },
  {
    id: 'tuvi-co-hoa-ky-nhap-menh',
    name: 'Hóa Kỵ Nhập Mệnh',
    school: 'tuvi',
    tier: 'premium',
    verdict: 'hung',
    rarity: 2,
    conditions: [
      { type: 'star_in_palace', params: { star: 'Hóa Kỵ', palace: 'Mệnh' } },
    ],
    insight: 'Hóa Kỵ tọa Mệnh cung: Chỉ ra tâm trí nhiều lo lắng, ám ảnh. Dễ gặp trở ngại ban đầu, nhưng nếu biết biến Kỵ thành động lực thì lại rất giỏi chuyên môn.',
    advice: 'Hóa Kỵ = ám ảnh = chuyên gia. Đừng trốn chạy áp lực, hãy biến nó thành sự tập trung sâu vào một lĩnh vực.',
  },
  {
    id: 'tuvi-co-tu-hoa-phi-tinh',
    name: 'Phi Tinh Tứ Hóa Liên Hoàn',
    school: 'tuvi',
    tier: 'elite',
    verdict: 'đại cát',
    rarity: 5,
    conditions: [
      { type: 'star_pair', params: { stars: ['Hóa Lộc', 'Hóa Quyền'], palace: 'Mệnh' } },
      { type: 'star_in_palace', params: { star: 'Hóa Khoa', palace: 'Quan Lộc' } },
    ],
    insight: 'Phi Tinh liên hoàn: Lộc + Quyền nhập Mệnh, Khoa chiếu Quan Lộc. Đây là cách cục cực hiếm, chủ nhân phú quý vượt bậc, nổi tiếng và có quyền lực thực sự.',
    advice: 'Bạn sở hữu cách cục cấp Thượng đẳng. Tập trung vào sự nghiệp lớn, đừng phung phí ở những việc nhỏ.',
  },
];

// ══════════════════════════════════════════════════════════
// BÁT TỰ CÁCH CỤC — Manh Phái / Tử Bình Configurations
// ══════════════════════════════════════════════════════════

export const BAZI_CACH_CUC: CachCucPattern[] = [
  {
    id: 'bazi-co-thuc-than-sanh-tai',
    name: 'Thực Thần Sinh Tài',
    school: 'bazi',
    tier: 'premium',
    verdict: 'đại cát',
    rarity: 3,
    conditions: [
      { type: 'ten_god_dominant', params: { tenGod: 'Thực Thần', position: 'month' } },
      { type: 'ten_god_dominant', params: { tenGod: 'Thiên Tài', position: 'any' } },
    ],
    insight: 'Thực Thần Sinh Tài: Cách cục "ung dung hưởng phúc" — tài năng sáng tạo tự nhiên sinh ra tài lộc. Chủ nhân thường giàu có nhẹ nhàng, không cần tranh đoạt.',
    advice: 'Đầu tư vào kỹ năng sáng tạo (nghệ thuật, kinh doanh, sáng chế). Tiền tìm đến bạn qua tài năng, không phải qua sức mạnh.',
  },
  {
    id: 'bazi-co-thien-khoi-quy-nhan',
    name: 'Thiên Khôi Quý Nhân',
    school: 'bazi',
    tier: 'premium',
    verdict: 'cát',
    rarity: 3,
    conditions: [
      { type: 'star_in_palace', params: { star: 'Thiên Ất Quý Nhân', palace: 'year' } },
    ],
    insight: 'Thiên Ất Quý Nhân xuất hiện: Chủ nhân luôn có "quý nhân phù trợ", gặp nạn hóa lành. Cuộc đời có nhiều cơ hội bất ngờ từ những người quyền lực.',
    advice: 'Duy trì mạng lưới quan hệ. Quý nhân của bạn thường xuất hiện qua giới thiệu, không phải tự tìm.',
  },
  {
    id: 'bazi-co-kiep-tai-pham-chinh-tai',
    name: 'Kiếp Tài Phạm Chính Tài',
    school: 'bazi',
    tier: 'premium',
    verdict: 'hung',
    rarity: 2,
    conditions: [
      { type: 'ten_god_dominant', params: { tenGod: 'Kiếp Tài', position: 'month' } },
      { type: 'ten_god_dominant', params: { tenGod: 'Chính Tài', position: 'day' } },
    ],
    insight: 'Kiếp Tài phạm Chính Tài: Cách cục xung khắc tài chính. Chủ nhân dễ bị mất tiền qua bạn bè, đầu tư rủi ro, hoặc tranh chấp tài sản.',
    advice: 'TUYỆT ĐỐI không bảo lãnh tài chính cho người khác. Quản lý tiền bạc chặt chẽ, tránh đầu tư chung.',
  },
  {
    id: 'bazi-co-nhat-chu-cuong-旺',
    name: 'Nhật Chủ Cực Vượng',
    school: 'bazi',
    tier: 'elite',
    verdict: 'trung tính',
    rarity: 2,
    conditions: [
      { type: 'day_master_strength', params: { strength: 'extreme_strong' } },
    ],
    insight: 'Nhật Chủ cực vượng: Bản mệnh quá mạnh, ý chí cứng rắn nhưng khó thỏa hiệp. Cần Quan Sát chế ngự để cân bằng. Nếu thiếu Quan Sát, dễ trở nên bướng bỉnh và cô lập.',
    advice: 'Tìm người bạn đời hoặc đối tác có tính cách mạnh mẽ tương đương. Bạn cần "đối trọng" chứ không cần "đồng thuận".',
  },
  {
    id: 'bazi-co-manh-phai-ton-tuong',
    name: 'Tòng Tượng Cách (Manh Phái)',
    school: 'bazi',
    tier: 'elite',
    verdict: 'đại cát',
    rarity: 5,
    conditions: [
      { type: 'day_master_strength', params: { strength: 'extreme_weak' } },
      { type: 'ten_god_dominant', params: { tenGod: 'Chính Quan', position: 'month' } },
    ],
    insight: 'Tòng Tượng Cách (Manh Phái): Nhật Chủ cực nhược tòng theo Quan. Đây là cách cục đặc biệt — bỏ qua Vượng Suy, chủ nhân thành đạt nhờ phục vụ hệ thống lớn (công chức, tập đoàn, chính trị).',
    advice: 'Đừng tự kinh doanh. Tòng Quan = thành đạt trong tổ chức lớn. Hãy leo cao trong hệ thống thay vì tự lập.',
  },
];

/** All patterns combined */
export const ALL_CACH_CUC: CachCucPattern[] = [...TUVI_CACH_CUC, ...BAZI_CACH_CUC];
