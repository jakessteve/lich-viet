import { BasicProfile } from '../../types/auth';
import { Chi, Can, CanChi } from '../../types/calendar';
import { getCanChiYear, getCanChiDay, parseCanChi } from '../../utils/calendarEngine';
import { generateQmdjChart, interpretQmdjChart } from '../../utils/qmdjEngine';

export interface PersonalHourModifier {
  totalModifier: number;
  flags: string[];
  breakdowns: string[];
}

const CAN_LIST: Can[] = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI_LIST: Chi[] = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

// --- Helper interaction logic ---
const isLucXung = (c1: Chi, c2: Chi) => {
  const groups = [['Tý', 'Ngọ'], ['Sửu', 'Mùi'], ['Dần', 'Thân'], ['Mão', 'Dậu'], ['Thìn', 'Tuất'], ['Tỵ', 'Hợi']];
  return groups.some(g => g.includes(c1) && g.includes(c2));
};

const isTuongXungCan = (can1: Can, can2: Can) => {
  const groups = [['Giáp', 'Canh'], ['Ất', 'Tân'], ['Nhâm', 'Bính'], ['Quý', 'Đinh']];
  return groups.some(g => g.includes(can1) && g.includes(can2));
};

const isLucHop = (c1: Chi, c2: Chi) => {
  const groups = [['Tý', 'Sửu'], ['Dần', 'Hợi'], ['Mão', 'Tuất'], ['Thìn', 'Dậu'], ['Tỵ', 'Thân'], ['Ngọ', 'Mùi']];
  return groups.some(g => g.includes(c1) && g.includes(c2));
};

const isTamHop = (c1: Chi, c2: Chi) => {
  const groups = [
    ['Dần', 'Ngọ', 'Tuất'], ['Hợi', 'Mão', 'Mùi'],
    ['Thân', 'Tý', 'Thìn'], ['Tỵ', 'Dậu', 'Sửu']
  ];
  return groups.some(g => g.includes(c1) && g.includes(c2));
};

// --- Trạch Cát (Personal Stars) ---
const getQuyNhan = (can: Can): Chi[] => {
  const qn: Record<Can, Chi[]> = {
    'Giáp': ['Sửu', 'Mùi'], 'Ất': ['Tý', 'Thân'], 'Bính': ['Hợi', 'Dậu'],
    'Đinh': ['Hợi', 'Dậu'], 'Mậu': ['Sửu', 'Mùi'], 'Kỷ': ['Tý', 'Thân'],
    'Canh': ['Sửu', 'Mùi'], 'Tân': ['Dần', 'Ngọ'], 'Nhâm': ['Mão', 'Tỵ'],
    'Quý': ['Mão', 'Tỵ'],
  };
  return qn[can] || [];
};

const getLocThan = (can: Can): Chi | null => {
  const loc: Record<Can, Chi> = {
    'Giáp': 'Dần', 'Ất': 'Mão', 'Bính': 'Tỵ', 'Đinh': 'Ngọ', 'Mậu': 'Tỵ',
    'Kỷ': 'Ngọ', 'Canh': 'Thân', 'Tân': 'Dậu', 'Nhâm': 'Hợi', 'Quý': 'Tý'
  };
  return loc[can] || null;
};

const getDichMa = (chi: Chi): Chi | null => {
  const ma: Record<Chi, Chi> = {
    'Dần': 'Thân', 'Ngọ': 'Thân', 'Tuất': 'Thân',
    'Thân': 'Dần', 'Tý': 'Dần', 'Thìn': 'Dần',
    'Tỵ': 'Hợi', 'Dậu': 'Hợi', 'Sửu': 'Hợi',
    'Hợi': 'Tỵ', 'Mão': 'Tỵ', 'Mùi': 'Tỵ',
  };
  return ma[chi] || null;
};

/**
 * Main engine combining 3 schools:
 * 1. Bát Tự (Nhật Chủ & Thái Tuế interactions)
 * 2. Trạch Cát (Quý Nhân, Lộc, Mã)
 * 3. QMDJ (Mệnh Cung in current Board)
 */
export function calculatePersonalHourModifier(
  profile: BasicProfile | undefined | null,
  hourCanChi: CanChi,
  dayCanChi: CanChi,
  date: Date
): PersonalHourModifier | null {
  if (!profile || !profile.birthYear) return null;

  let totalModifier = 0;
  const flags: string[] = [];
  const breakdowns: string[] = [];

  // --- 1. Base User Bát Tự Derivation (Fallback to Basic Profile) ---
  // Default to 12:00 PM if time not available
  const birthDate = new Date(profile.birthYear, (profile.birthMonth || 1) - 1, profile.birthDay || 1, 12, 0);
  const userYearCanChi = parseCanChi(getCanChiYear(profile.birthYear));
  const userDayCanChi = profile.birthDay && profile.birthMonth ? parseCanChi(getCanChiDay(birthDate)) : undefined;

  const userYearCan = userYearCanChi.can;
  const userYearChi = userYearCanChi.chi;
  const userDayCan = userDayCanChi?.can;
  const userDayChi = userDayCanChi?.chi;

  // --- 2. Bát Tự (Tử Bình) Interactions ---
  // A. Nhật Chủ (Day Pillar)
  if (userDayCan && userDayChi) {
    if (isLucXung(userDayChi, hourCanChi.chi)) {
      if (isTuongXungCan(userDayCan, hourCanChi.can)) {
        totalModifier -= 40;
        flags.push('thien_khac_dia_xung');
        breakdowns.push(`Thiên Khắc Địa Xung với Nhật Chủ (-40%)`);
      } else {
        totalModifier -= 20;
        flags.push('xung_nhat_chu');
        breakdowns.push(`Lục Xung với Nhật Chủ (-20%)`);
      }
    } else if (isLucHop(userDayChi, hourCanChi.chi) || isTamHop(userDayChi, hourCanChi.chi)) {
      totalModifier += 15;
      flags.push('hop_nhat_chu');
      breakdowns.push(`Tương hợp với Nhật Chủ (+15%)`);
    } else if (userDayChi === hourCanChi.chi) {
      totalModifier -= 5;
      breakdowns.push(`Trị Nhật Chủ (-5%)`);
    }
  }

  // B. Thái Tuế (Year Pillar)
  if (isLucXung(userYearChi, hourCanChi.chi)) {
    totalModifier -= 10;
    flags.push('xung_thai_tue');
    breakdowns.push(`Xung Thái Tuế (-10%)`);
  } else if (isLucHop(userYearChi, hourCanChi.chi) || isTamHop(userYearChi, hourCanChi.chi)) {
    totalModifier += 10;
    flags.push('hop_thai_tue');
    breakdowns.push(`Tương hợp với Thái Tuế (+10%)`);
  }

  // --- 3. Trạch Cát (Thần Sát) ---
  // Using Year Can/Chi primarily for general luck, Day for specific luck.
  const targetCan = userDayCan || userYearCan;
  const targetChi = userDayChi || userYearChi;

  if (getQuyNhan(targetCan).includes(hourCanChi.chi)) {
    totalModifier += 20;
    flags.push('quy_nhan');
    breakdowns.push(`Giờ Thiên Ất Quý Nhân (+20%)`);
  }
  
  if (getLocThan(targetCan) === hourCanChi.chi) {
    totalModifier += 15;
    flags.push('loc_than');
    breakdowns.push(`Giờ Lộc Thần (+15%)`);
  }

  if (getDichMa(targetChi) === hourCanChi.chi) {
    totalModifier += 10;
    flags.push('dich_ma');
    breakdowns.push(`Giờ Dịch Mã (+10%)`);
  }

  // --- 4. Kỳ Môn Độn Giáp (Tạm Khuyết API Tối Ưu) ---
  try {
    const qmdjChart = generateQmdjChart(date, hourCanChi.chi);
    const interpretations = interpretQmdjChart(qmdjChart);
    
    // Find the palace hosting User's Year Can on the Heaven Plate
    const menhCung = qmdjChart.palaces.find(p => p.heavenlyStem === userYearCan);
    
    if (menhCung && menhCung.number !== 5) { // Palace 5 doesn't have a door directly
      const qmdjInterp = interpretations.find(i => i.palaceNumber === menhCung.number);
      if (qmdjInterp && qmdjInterp.doorStarCombo) {
        if (qmdjInterp.overallAuspiciousness === 'cat') {
          totalModifier += 15;
          flags.push('qmdj_cat');
          breakdowns.push(`Kỳ Môn Cát Cung (Cửa ${menhCung.door?.nameVi}, Sao ${menhCung.star?.nameVi}) (+15%)`);
        } else if (qmdjInterp.overallAuspiciousness === 'hung') {
          totalModifier -= 15;
          flags.push('qmdj_hung');
          breakdowns.push(`Kỳ Môn Hung Cung (Cửa ${menhCung.door?.nameVi}, Sao ${menhCung.star?.nameVi}) (-15%)`);
        }
      }
    }
  } catch (err) {
    // Graceful fallback if QMDJ fails (e.g., table boundaries)
    console.warn('QMDJ Engine failed for hour', hourCanChi.chi, err);
  }

  return {
    totalModifier,
    flags,
    breakdowns
  };
}
