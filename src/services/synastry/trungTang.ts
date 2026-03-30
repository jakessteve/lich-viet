/**
 * Trùng Tang Algorithm — Bấm Cung Tay Tradition
 * 
 * Deterministic funeral safety check based on the 12-Cung cycle.
 * Reference: Bấm Cung Tay (Vietnamese folk tradition)
 *
 * Algorithm:
 *   Starting position = Deceased's birth Earthly Branch (Chi)
 *   Count forward through the 12-Cung cycle by the proposed funeral day's Chi index
 *   Landing position determines safety outcome.
 */

const CHI_LIST = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'] as const;

/**
 * The 12 Cung Tay positions in the traditional cycle.
 * Positions 0-11 map to the finger-counting stations.
 */
const CUNG_TAY = [
  'Thiên Cương',   // 0 — Heaven's Pinnacle
  'Thiên Phúc',    // 1 — Heavenly Fortune ✅
  'Thiên Quý',     // 2 — Heavenly Noble   ✅
  'Thiên Hình',    // 3 — Heavenly Punishment ❌
  'Thiên Lộc',     // 4 — Heavenly Prosperity ✅
  'Thiên Đức',     // 5 — Heavenly Virtue    ✅
  'Thiên Hỏa',    // 6 — Heavenly Fire      ❌
  'Thiên Tài',     // 7 — Heavenly Wealth    ✅
  'Thiên Mã',      // 8 — Heavenly Horse     ⚠️ (Thiên Di)
  'Trùng Tang',    // 9 — Double Mourning    ❌❌
  'Thiên Ấn',      // 10 — Heavenly Seal     ✅
  'Thiên Di',      // 11 — Heavenly Migration ⚠️
] as const;

/** Safety classification per Cung landing */
type CungSafety = 'safe' | 'trung-tang' | 'thien-di' | 'danger';

const CUNG_SAFETY: Record<string, CungSafety> = {
  'Thiên Cương': 'danger',     // Cứng, khắc — xấu
  'Thiên Phúc': 'safe',
  'Thiên Quý': 'safe',
  'Thiên Hình': 'danger',      // Hình phạt — xấu
  'Thiên Lộc': 'safe',
  'Thiên Đức': 'safe',
  'Thiên Hỏa': 'danger',       // Hỏa tai — xấu
  'Thiên Tài': 'safe',
  'Thiên Mã': 'thien-di',      // Di chuyển — cẩn trọng
  'Trùng Tang': 'trung-tang',  // ❌ Critical — double mourning
  'Thiên Ấn': 'safe',
  'Thiên Di': 'thien-di',      // Di chuyển — cẩn trọng
};

export interface TrungTangResult {
  /** Is it safe to proceed with burial on this day? */
  safe: boolean;
  /** Specific safety classification */
  classification: CungSafety;
  /** The Cung position the counting landed on */
  cungLanding: string;
  /** Position index in the 12-Cung cycle */
  cungIndex: number;
  /** Human-readable summary */
  summary: string;
  /** Warning text if not safe */
  warning?: string;
  /** Advice text */
  advice: string;
}

/**
 * Check Trùng Tang safety for a proposed funeral date.
 * 
 * @param deceasedBirthChi - Earthly Branch (Chi) of the deceased's birth year
 * @param funeralDayChi - Earthly Branch (Chi) of the proposed funeral day
 * @param deceasedGender - Gender of the deceased ('male' | 'female')
 * @returns TrungTangResult with safety classification
 */
export function checkTrungTang(
  deceasedBirthChi: string,
  funeralDayChi: string,
  deceasedGender: 'male' | 'female' = 'male',
): TrungTangResult {
  const birthIdx = CHI_LIST.indexOf(deceasedBirthChi as typeof CHI_LIST[number]);
  const funeralIdx = CHI_LIST.indexOf(funeralDayChi as typeof CHI_LIST[number]);

  if (birthIdx === -1 || funeralIdx === -1) {
    return {
      safe: false,
      classification: 'danger',
      cungLanding: 'Không xác định',
      cungIndex: -1,
      summary: 'Không xác định được Chi — vui lòng kiểm tra lại.',
      advice: 'Kiểm tra lại năm sinh và ngày tang lễ.',
    };
  }

  // Gender offset: Male starts from Thiên Cương (0), Female from position 6 (Thiên Hỏa)
  const genderOffset = deceasedGender === 'female' ? 6 : 0;

  // Count: from birth Chi position, advance by funeral Chi index steps
  const steps = ((funeralIdx - birthIdx + 12) % 12);
  const cungIdx = (steps + genderOffset) % 12;
  const cungName = CUNG_TAY[cungIdx];
  const safety = CUNG_SAFETY[cungName];

  const isSafe = safety === 'safe';

  let summary: string;
  let warning: string | undefined;
  let advice: string;

  switch (safety) {
    case 'safe':
      summary = `✅ An toàn — ${cungName}`;
      advice = `Ngày ${funeralDayChi} an toàn cho tang lễ. Cung ${cungName} là cung lành, có thể tiến hành.`;
      break;
    case 'trung-tang':
      summary = `❌ Trùng Tang — Cảnh báo nghiêm trọng`;
      warning = 'Ngày này rơi vào cung Trùng Tang — theo truyền thống, nếu chôn cất vào ngày này, gia đình có nguy cơ gặp thêm tang sự trong vòng 100 ngày.';
      advice = 'NÊN chọn ngày khác. Nếu bắt buộc, cần làm lễ giải trừ theo phong tục địa phương.';
      break;
    case 'thien-di':
      summary = `⚠️ Thiên Di — Cần cẩn trọng`;
      warning = `Cung ${cungName} thuộc hướng di chuyển — có thể ảnh hưởng đến vận khí gia đình.`;
      advice = 'Có thể tiến hành nhưng nên kết hợp với xem ngày Hoàng Đạo để chắc chắn. Tham khảo thêm ý kiến thầy phong thủy.';
      break;
    case 'danger':
      summary = `🔴 ${cungName} — Không thuận lợi`;
      warning = `Cung ${cungName} mang tính chất bất lợi cho tang lễ.`;
      advice = 'Nên cân nhắc chọn ngày khác nếu có thể. Nếu bắt buộc, làm lễ cầu an.';
      break;
  }

  return {
    safe: isSafe,
    classification: safety,
    cungLanding: cungName,
    cungIndex: cungIdx,
    summary,
    warning,
    advice,
  };
}

/**
 * Utility: get Chi from a year number.
 */
export function yearToChiString(year: number): string {
  const idx = (((year - 4) % 12) + 12) % 12;
  return CHI_LIST[idx];
}

/**
 * Utility: get Chi from a lunar or solar day's Can Chi.
 * Expects the day Chi from DayDetailsData.canChi.day.chi
 */
export function getDayChiFromData(dayChi: string): string {
  return dayChi;
}
