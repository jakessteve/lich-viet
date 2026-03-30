import { BasicProfile } from '../../types/auth';
import { Chi, PersonalDayScore } from '../../types/calendar';
import { getYearCanChi } from '../../packages/vn-lunar/core';

export const CHI_LIST: Chi[] = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

/** Get the Earthly Branch (Chi) of a given solar year. */
export function getYearChi(year: number): Chi {
  const canChi = getYearCanChi(year);
  return canChi.split(' ')[1] as Chi;
}

/** Check Tam Hợp */
export const isTamHop = (chi1: Chi, chi2: Chi) => {
  const tamHopGroups = [
    ['Dần', 'Ngọ', 'Tuất'],
    ['Hợi', 'Mão', 'Mùi'],
    ['Thân', 'Tý', 'Thìn'],
    ['Tỵ', 'Dậu', 'Sửu']
  ];
  return tamHopGroups.some(group => group.includes(chi1) && group.includes(chi2));
};

/** Check Lục Hợp */
const isLucHop = (chi1: Chi, chi2: Chi) => {
  const hopGroups = [
    ['Tý', 'Sửu'],
    ['Dần', 'Hợi'],
    ['Mão', 'Tuất'],
    ['Thìn', 'Dậu'],
    ['Tỵ', 'Thân'],
    ['Ngọ', 'Mùi']
  ];
  return hopGroups.some(group => group.includes(chi1) && group.includes(chi2));
};

/** Check Lục Xung */
const isTuongXung = (chi1: Chi, chi2: Chi) => {
  const xungGroups = [
    ['Tý', 'Ngọ'],
    ['Sửu', 'Mùi'],
    ['Dần', 'Thân'],
    ['Mão', 'Dậu'],
    ['Thìn', 'Tuất'],
    ['Tỵ', 'Hợi']
  ];
  return xungGroups.some(group => group.includes(chi1) && group.includes(chi2));
};

/** Check Lục Hại */
const isTuongHai = (chi1: Chi, chi2: Chi) => {
  const haiGroups = [
    ['Tý', 'Mùi'],
    ['Sửu', 'Ngọ'],
    ['Dần', 'Tỵ'],
    ['Mão', 'Thìn'],
    ['Thân', 'Hợi'],
    ['Dậu', 'Tuất']
  ];
  return haiGroups.some(group => group.includes(chi1) && group.includes(chi2));
};

/** Check Tương Hình (simplified) */
const isTuongHinh = (chi1: Chi, chi2: Chi) => {
  const hinhGroups = [
    ['Dần', 'Tỵ', 'Thân'], // Vô ân chi hình
    ['Sửu', 'Tuất', 'Mùi'], // Thị thế chi hình
    ['Tý', 'Mão'],          // Vô lễ chi hình
    ['Thìn', 'Thìn'],       // Tự hình
    ['Ngọ', 'Ngọ'],
    ['Dậu', 'Dậu'],
    ['Hợi', 'Hợi']
  ];
  return hinhGroups.some(group => group.includes(chi1) && group.includes(chi2));
};

/** Check Tương Phá */
const isTuongPha = (chi1: Chi, chi2: Chi) => {
  const phaGroups = [
    ['Tý', 'Dậu'],
    ['Sửu', 'Thìn'],
    ['Dần', 'Hợi'],
    ['Mão', 'Ngọ'],
    ['Tỵ', 'Thân'],
    ['Mùi', 'Tuất']
  ];
  return phaGroups.some(group => group.includes(chi1) && group.includes(chi2));
};

export function getYearThaiTueType(birthYear: number, targetYear: number): string | null {
  const userChi = getYearChi(birthYear);
  const targetChi = getYearChi(targetYear);
  if (userChi === targetChi) return 'Trị Thái Tuế (Năm bản mệnh)';
  if (isTuongXung(userChi, targetChi)) return 'Xung Thái Tuế';
  if (isTuongHinh(userChi, targetChi)) return 'Hình Thái Tuế';
  if (isTuongHai(userChi, targetChi)) return 'Hại Thái Tuế';
  if (isTuongPha(userChi, targetChi)) return 'Phá Thái Tuế';
  return null;
}

/** Calculate the Personal Day Score */
export function calculatePersonalDayScore(profile: BasicProfile | undefined | null, dayChi: Chi): PersonalDayScore | undefined {
  if (!profile || !profile.birthYear) return undefined;

  const userChi = getYearChi(profile.birthYear);

  const scoreData: PersonalDayScore = {
    actionScore: 0,
    label: 'Bình thường',
    description: '',
    isThaiTue: userChi === dayChi,
    isTamHop: isTamHop(userChi, dayChi),
    isLucHop: isLucHop(userChi, dayChi),
    isTuongXung: isTuongXung(userChi, dayChi),
    isTuongHai: isTuongHai(userChi, dayChi),
    isTuongHinh: isTuongHinh(userChi, dayChi),
    isTuongPha: isTuongPha(userChi, dayChi),
  };

  let score = 0;
  
  if (scoreData.isTamHop) score += 3;
  if (scoreData.isLucHop) score += 2;
  
  if (scoreData.isThaiTue) score -= 1; // Trị Thái Tuế / Trực Thái Tuế
  if (scoreData.isTuongXung) score -= 3;
  if (scoreData.isTuongHai) score -= 2;
  if (scoreData.isTuongHinh) score -= 2;
  if (scoreData.isTuongPha) score -= 1;

  scoreData.actionScore = score;

  if (score >= 3) {
    scoreData.label = 'Đại Cát';
    scoreData.description = 'Ngày cực kỳ thuận lợi, sinh khí thịnh vượng, hợp làm việc lớn.';
  } else if (score > 0) {
    scoreData.label = 'Tiểu Cát';
    scoreData.description = 'Ngày có nhiều thuận lợi, phù hợp triển khai các công việc đã chuẩn bị.';
  } else if (score === 0) {
    scoreData.label = 'Bình Hòa';
    scoreData.description = 'Trạng thái cân bằng, không tốt không xấu. Cẩn trọng khi quyết định.';
  } else if (score > -3) {
    scoreData.label = 'Tiểu Hung';
    scoreData.description = 'Ngày có một số trở ngại, tránh thực hiện các giao dịch quan trọng.';
  } else {
    scoreData.label = 'Đại Hung';
    scoreData.description = 'Xung khắc mạnh với bản mệnh. Tuyệt đối tránh mưu sự, đi xa, cưới hỏi.';
  }

  return scoreData;
}
