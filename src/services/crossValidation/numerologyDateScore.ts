import { BasicProfile } from '../../types/auth';
import { SystemScore } from '../../types/crossValidation';

const reduce = (num: number): number => {
  let sum = num;
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return sum;
};

/**
 * Calculates a numerology-based Auspicious Score for a date.
 * Relies on Pythagorean methods: Personal Year, Month, and Day calculation.
 */
export function evaluateNumerologyDay(profile: BasicProfile | null | undefined, targetDate: Date): SystemScore {
  if (!profile || !profile.birthDay || !profile.birthMonth) {
    return { score: 50, weight: 0.15, flags: ['Thiếu ngày/tháng sinh'], isAvailable: false };
  }

  const currentYear = targetDate.getFullYear();
  const currentMonth = targetDate.getMonth() + 1;
  const currentDay = targetDate.getDate();

  const bMonth = reduce(profile.birthMonth);
  const bDay = reduce(profile.birthDay);

  // Personal Year = Birth Month + Birth Day + Current Year
  const personalYear = reduce(bMonth + bDay + reduce(currentYear));
  
  // Personal Month = Personal Year + Current Month
  const personalMonth = reduce(personalYear + reduce(currentMonth));
  
  // Personal Day = Personal Month + Current Day
  const personalDay = reduce(personalMonth + reduce(currentDay));

  let score: number;
  const flags: string[] = [];

  // Very beneficial days
  if (personalDay === 1) {
    score = 85;
    flags.push('Bắt đầu chu kỳ mới (Ngày 1)');
  } else if (personalDay === 8) {
    score = 90;
    flags.push('Ngày quyền lực/thành tựu (Ngày 8)');
  } else if (personalDay === 9) {
    score = 75;
    flags.push('Ngày hoàn thiện/kết thúc (Ngày 9)');
  } else if (personalDay === 11 || personalDay === 22) {
    score = 95;
    flags.push(`Ngày số Master ${personalDay}`);
  } else if (personalDay === 4 || personalDay === 7) {
    score = 40;
    flags.push(`Ngày hướng nội/thử thách (Ngày ${personalDay})`);
  } else {
    score = 65; // Normal favorable flow for 2, 3, 5, 6
    flags.push(`Ngày số ${personalDay}`);
  }

  // Resonance with Lifepath
  if (profile.lifepathNumber) {
    if (personalDay === profile.lifepathNumber || personalDay === reduce(profile.lifepathNumber)) {
      score = Math.min(100, score + 15);
      flags.push('Ngày đồng điệu với đường đời');
    }
  }

  return {
    score,
    weight: 0.15,
    flags,
    isAvailable: true
  };
}
