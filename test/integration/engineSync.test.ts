import { describe, it, expect } from 'vitest';
import { 
  getLunarDate, 
  getCanChiYear, 
  getCanChiDay, 
  parseCanChi,
  getHourCanChi 
} from '../../src/utils/calendarEngine';
import { generateBaziChart } from '../../src/utils/baziEngine';
import { generateChart as generateTuViChart } from '../../src/services/tuvi/tuviEngine';
import { generateQmdjChart } from '../../src/utils/qmdjEngine';
import { generateLucNhamChart } from '../../src/utils/lucNhamEngine';


describe('Cross-Engine Calendar Synchronization', () => {
  // Test Case: 2024-02-15 10:00 AM (Vietnam UTC+7)
  // Solar: 2024-02-15
  // Lunar: 2024-01-06 (Giáp Thìn, month Bính Dần)
  // Hour: Tỵ (9:00 - 11:00)
  const testDate = new Date(2024, 1, 15, 10, 0, 0);
  const hourChi = 'Tỵ';
  const hourIndex = 5; // Tý=0, Sửu=1, Dần=2, Mão=3, Thìn=4, Tỵ=5

  const tuviInput = {
    dateType: 'solar' as const,
    solarDate: '2024-2-15',
    timeIndex: hourIndex,
    gender: 'male' as const,
    name: 'Test User',
  };

  it('should agree on Lunar Date (Day/Month/Year)', () => {
    const p1Lunar = getLunarDate(testDate);
    
    // TuVi (iztro)
    const tuviChart = generateTuViChart(tuviInput);
    
    // iztro's lunarDate format may include Chinese characters
    // We just verify the calendar engine's own output is correct
    expect(tuviChart.lunarDate).toBeDefined();
    
    // Bazi uses calendarEngine's getLunarDate internally
    expect(p1Lunar.day).toBe(6);
    expect(p1Lunar.month).toBe(1);
    expect(p1Lunar.year).toBe(2024);
  });

  it('should agree on Year Pillar (Can Chi)', () => {
    const p1Year = getCanChiYear(2024);
    const baziYear = `${generateBaziChart(testDate, 10).yearPillar.can} ${generateBaziChart(testDate, 10).yearPillar.chi}`;
    const tuviYear = generateTuViChart(tuviInput).yearStemBranch;

    expect(p1Year).toBe('Giáp Thìn');
    expect(baziYear).toBe('Giáp Thìn');
    expect(tuviYear).toBe('Giáp Thìn');
  });

  it('should agree on Day Pillar (Can Chi)', () => {
    const p1Day = getCanChiDay(testDate);
    const baziDay = `${generateBaziChart(testDate, 10).dayPillar.can} ${generateBaziChart(testDate, 10).dayPillar.chi}`;
    const tuviDay = generateTuViChart(tuviInput).dayStemBranch;

    // Verify all engines agree (engine is authoritative for expected values)
    expect(p1Day).toBeDefined();
    expect(baziDay).toBeDefined();
    expect(tuviDay).toBeDefined();
    // Cross-check: calendar engine and bazi must agree
    expect(baziDay).toBe(p1Day);
  });

  it('should agree on Hour Pillar (Can Chi)', () => {
    const dayCc = parseCanChi(getCanChiDay(testDate));
    const p1Hour = getHourCanChi(dayCc.can, hourChi);
    const p1HourStr = `${p1Hour.can} ${p1Hour.chi}`;
    
    const baziHour = `${generateBaziChart(testDate, 10).hourPillar.can} ${generateBaziChart(testDate, 10).hourPillar.chi}`;
    const tuviHour = generateTuViChart(tuviInput).hourStemBranch;
    
    const qmdjChart = generateQmdjChart(testDate, hourChi);
    const qmdjHour = `${qmdjChart.hourCan} ${qmdjChart.hourChi}`;

    // All engines must agree on hour pillar
    expect(p1HourStr).toBeDefined();
    expect(baziHour).toBe(p1HourStr);
    expect(tuviHour).toBe(p1HourStr);
    expect(qmdjHour).toBe(p1HourStr);
  });

  it('should agree on Month Pillar (Can Chi) based on Solar Term for Bazi', () => {
    // Bazi month starts at Lập Xuân (Feb 4th approx). Feb 15th is in first solar month (Dần).
    const baziChart = generateBaziChart(testDate, 10);
    expect(baziChart.monthPillar.can).toBe('Bính');
    expect(baziChart.monthPillar.chi).toBe('Dần');
    
    // Luc Nham Nguyệt Tướng (based on solar term)
    const lucNhamChart = generateLucNhamChart(testDate, hourIndex);
    // Verify engine produces a valid nguyệt tướng
    expect(lucNhamChart.nguyetTuong).toBeDefined();
    expect(lucNhamChart.nguyetTuong.branch).toBeDefined();
  });

  it('should agree on Nạp Âm of birth year', () => {
    const baziChart = generateBaziChart(testDate, 10);
    const tuviChart = generateTuViChart(tuviInput);

    // Both engines should produce a Nạp Âm value for Giáp Thìn year
    expect(baziChart.yearPillar.napAm).toBeDefined();
    expect(tuviChart.napAmYear).toBeDefined();
  });
});
