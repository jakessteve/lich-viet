/**
 * Trùng Tang Algorithm — Authentic Bấm Cung Tay Tradition
 *
 * Deterministic funeral safety check based on the 12-Cung cycle 
 * using the age, month, day, and hour of death.
 * 
 * Algorithm:
 * 1. Male starts Dần forward, Female starts Thân backward.
 * 2. Count tens digit (1 per Chi), then unit digit (1 per Chi) -> Age Landing
 * 3. From Age Landing, next Chi is Month 1. Count to Death Month -> Month Landing
 * 4. From Month Landing, next Chi is Day 1. Count to Death Day -> Day Landing
 * 5. From Day Landing, next Chi is Hour Tý. Count to Death Hour -> Hour Landing
 */

export const CHI_LIST = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'] as const;

export type TrungTangClassification = 'trung-tang' | 'thien-di' | 'nhap-mo';

export interface TrungTangLanding {
  chi: string;
  classification: TrungTangClassification;
}

export interface TrungTangResult {
  safe: boolean;
  ageLanding: TrungTangLanding;
  monthLanding: TrungTangLanding;
  dayLanding: TrungTangLanding;
  hourLanding: TrungTangLanding;
  summary: string;
  warning?: string;
  advice: string;
}

function getClassification(chiIndex: number): TrungTangClassification {
  const chi = CHI_LIST[chiIndex];
  if (['Thìn', 'Tuất', 'Sửu', 'Mùi'].includes(chi)) return 'nhap-mo';
  if (['Tý', 'Ngọ', 'Mão', 'Dậu'].includes(chi)) return 'thien-di';
  return 'trung-tang'; // Dần, Thân, Tỵ, Hợi
}

/**
 * Utility: get Chi from a year number.
 */
export function yearToChiString(year: number): string {
  const idx = (((year - 4) % 12) + 12) % 12;
  return CHI_LIST[idx];
}

/**
 * Check Trùng Tang safety using the authentic Folk counting method.
 */
export function checkTrungTang(
  deceasedLunarAge: number,
  deathLunarMonth: number,
  deathLunarDay: number,
  deathHourChi: string,
  deceasedGender: 'male' | 'female' = 'male',
): TrungTangResult | null {
  if (!deceasedLunarAge || !deathLunarMonth || !deathLunarDay || !deathHourChi) return null;
  
  const hourIdx = CHI_LIST.indexOf(deathHourChi as typeof CHI_LIST[number]);
  if (hourIdx === -1) return null;

  // Starting index: Male = Dần (2), Female = Thân (8)
  const startIdx = deceasedGender === 'male' ? 2 : 8;
  const direction = deceasedGender === 'male' ? 1 : -1;

  // 1. Age Landing
  const tens = Math.floor(deceasedLunarAge / 10);
  const units = deceasedLunarAge % 10;
  
  // Example for Tens=7, Units=3: Tens moves (7-1)=6 steps. Units moves 3 steps. Total = 9.
  // Example for Tens=0, Units=5: Tens 0 steps. Units moves 4 steps. Total = 4.
  const ageSteps = tens > 0 ? (tens - 1 + units) : (units > 0 ? units - 1 : 0);
  const ageIdx = (startIdx + ageSteps * direction + 120) % 12;

  // 2. Month Landing
  const monthSteps = deathLunarMonth - 1;
  const monthIdx = (ageIdx + direction + monthSteps * direction + 120) % 12;

  // 3. Day Landing
  const daySteps = deathLunarDay - 1;
  const dayIdx = (monthIdx + direction + daySteps * direction + 120) % 12;

  // 4. Hour Landing
  // Hour Tý = 0 steps from next branch.
  const hourSteps = hourIdx;
  const hourIdxLanding = (dayIdx + direction + hourSteps * direction + 120) % 12;

  const ageLanding: TrungTangLanding = { chi: CHI_LIST[ageIdx], classification: getClassification(ageIdx) };
  const monthLanding: TrungTangLanding = { chi: CHI_LIST[monthIdx], classification: getClassification(monthIdx) };
  const dayLanding: TrungTangLanding = { chi: CHI_LIST[dayIdx], classification: getClassification(dayIdx) };
  const hourLanding: TrungTangLanding = { chi: CHI_LIST[hourIdxLanding], classification: getClassification(hourIdxLanding) };

  const landings = [ageLanding, monthLanding, dayLanding, hourLanding];
  const hasNhapMo = landings.some(l => l.classification === 'nhap-mo');
  const hasTrungTang = landings.some(l => l.classification === 'trung-tang');
  // Technically, if Day is Trung Tang, it's called Trùng Tang Liên Táng (worst kind)
  const dayIsTrungTang = dayLanding.classification === 'trung-tang';

  let safe = false;
  let summary = '';
  let warning: string | undefined;
  let advice = '';

  if (hasNhapMo) {
    safe = true;
    summary = '✅ An Toàn — Có Nhập Mộ (Nhất Mộ siêu bách sát)';
    advice = 'Kết quả xuất hiện cung Nhập Mộ nên sự hung hiểm đã được hóa giải. Sự quy tiên này là sự an bài hợp lý, gia quyến có thể an tâm.';
  } else if (hasTrungTang) {
    safe = false;
    summary = dayIsTrungTang ? '❌ Trùng Tang Liên Táng (Cực Hung)' : '❌ Phạm Trùng Tang';
    warning = dayIsTrungTang 
      ? 'Ngày mất rơi vào cung Trùng Tang (Trùng Tang Liên Táng), mức độ ảnh hưởng rất xấu đến người thân trong vòng 100 ngày.'
      : 'Rơi vào cung Trùng Tang nhưng không phạm vào Ngày. Tuy vậy vẫn có tính hung sát cao, cần hết sức lưu ý.';
    advice = 'Bắt buộc phải thiết lập đàn tràng làm lễ giải Trùng Tang, nhờ sư thầy/chuyên gia cao tay ấn định thời gian khâm liệm và nhập mộ.';
  } else {
    // only thien di
    safe = true;
    summary = '⚠️ Thiên Di — Chậm Siêu Thoát';
    warning = 'Toàn bộ rơi vào cung Thiên Di (Lạc đường). Vong linh khó tìm đường siêu thoát, nhưng gia đạo không bị ảnh hưởng mạnh.';
    advice = 'Có thể tiến hành thêm các lễ Tụng Kinh, Cầu Siêu để vong linh nhanh chóng rũ bỏ chấp niệm tìm được đàng về với Phật/Tổ Tiên.';
  }

  return {
    safe,
    ageLanding,
    monthLanding,
    dayLanding,
    hourLanding,
    summary,
    warning,
    advice
  };
}
