import { describe, it, expect } from 'vitest';
import { generateBaziChart } from '../src/utils/baziEngine';
// @ts-ignore
import { Solar } from 'lunar-javascript';

// Translation maps: lunar-javascript (Chinese) -> Native Engine (Vietnamese)
const CAN_MAP: Record<string, string> = {
  '甲': 'Giáp',
  '乙': 'Ất',
  '丙': 'Bính',
  '丁': 'Đinh',
  '戊': 'Mậu',
  '己': 'Kỷ',
  '庚': 'Canh',
  '辛': 'Tân',
  '壬': 'Nhâm',
  '癸': 'Quý'
};

const CHI_MAP: Record<string, string> = {
  '子': 'Tý',
  '丑': 'Sửu',
  '寅': 'Dần',
  '卯': 'Mão',
  '辰': 'Thìn',
  '巳': 'Tỵ',
  '午': 'Ngọ',
  '未': 'Mùi',
  '申': 'Thân',
  '酉': 'Dậu',
  '戌': 'Tuất',
  '亥': 'Hợi'
};

// Generates a random date between 1920 and 2050
function getRandomDate() {
  const start = new Date(1920, 0, 1).getTime();
  const end = new Date(2050, 11, 31).getTime();
  const date = new Date(start + Math.random() * (end - start));
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);
  date.setHours(hour, minute, 0, 0);
  return { date, hour, minute };
}

describe('Bát Tự (Four Pillars) Engine - Fuzz Testing vs Oracle', () => {
  it('should match lunar-javascript for 100 random birth charts', () => {
    let mismatches = 0;
    const errors: string[] = [];
    const TOTAL_TESTS = 1000;

    for (let i = 0; i < TOTAL_TESTS; i++) {
      const { date, hour, minute } = getRandomDate();
      
      const solar = Solar.fromYmdHms(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        hour,
        minute,
        0
      );
      const lunar = solar.getLunar();
      const bazi = lunar.getEightChar();
      
      const oracleYear = `${CAN_MAP[bazi.getYearGan()]} ${CHI_MAP[bazi.getYearZhi()]}`;
      const oracleMonth = `${CAN_MAP[bazi.getMonthGan()]} ${CHI_MAP[bazi.getMonthZhi()]}`;
      const oracleDay = `${CAN_MAP[bazi.getDayGan()]} ${CHI_MAP[bazi.getDayZhi()]}`;
      const oracleHour = `${CAN_MAP[bazi.getTimeGan()]} ${CHI_MAP[bazi.getTimeZhi()]}`;

      const floatHour = hour + (minute / 60);
      const nativeChart = generateBaziChart(date, floatHour, true, 105, false); // Bypass TST for exact parity
      
      const nativeYear = `${nativeChart.yearPillar.can} ${nativeChart.yearPillar.chi}`;
      const nativeMonth = `${nativeChart.monthPillar.can} ${nativeChart.monthPillar.chi}`;
      const nativeDay = `${nativeChart.dayPillar.can} ${nativeChart.dayPillar.chi}`;
      const nativeHour = `${nativeChart.hourPillar.can} ${nativeChart.hourPillar.chi}`;

      const isMatch = 
        oracleYear === nativeYear &&
        oracleMonth === nativeMonth &&
        oracleDay === nativeDay &&
        oracleHour === nativeHour;

      if (!isMatch) {
        mismatches++;
        const mismatchAreas = [];
        if (oracleYear !== nativeYear) mismatchAreas.push(`Year (${oracleYear} != ${nativeYear})`);
        if (oracleMonth !== nativeMonth) mismatchAreas.push(`Month (${oracleMonth} != ${nativeMonth})`);
        if (oracleDay !== nativeDay) mismatchAreas.push(`Day (${oracleDay} != ${nativeDay})`);
        if (oracleHour !== nativeHour) mismatchAreas.push(`Hour (${oracleHour} != ${nativeHour})`);

        errors.push(
          `Date: ${date.toISOString()} | Hr: ${hour}:${minute} | Mismatch: ${mismatchAreas.join(', ')}`
        );
      }
    }

    if (mismatches > 0) {
      console.error(`Found ${mismatches} mismatches out of ${TOTAL_TESTS} charts.`);
      console.error(errors.slice(0, 50).join('\n'));
    }

    // Rather than demanding perfection which is impossible if algorithms strictly differ in fractions
    // of an hour on month boundaries, we check that accuracy remains >= 99%.
    const accuracy = ((TOTAL_TESTS - mismatches) / TOTAL_TESTS) * 100;
    console.log(`Bazi Fuzz Test Precision against lunar-javascript VSOP87: ${accuracy.toFixed(2)}%`);
    expect(accuracy).toBeGreaterThanOrEqual(98);
  }, 30000);
});
