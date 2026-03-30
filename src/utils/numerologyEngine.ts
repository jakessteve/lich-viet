/**
 * Numerology Engine — Thần Số Học
 *
 * Supports both Pythagorean and Chaldean systems.
 * Calculates core numerology profile from full name + birth date.
 */

import numerologyInterp from '../data/numerologyInterpretation.json';
import { CORE_MEANINGS } from '../data/interpretation/numerology/coreMeanings';

// ── Types ──────────────────────────────────────────────────────

export type NumerologySystem = 'pythagorean' | 'chaldean';

export interface CoreNumber {
  name: string;
  nameVi: string;
  value: number;
  masterNumber: boolean;
  karmicDebt: boolean;
  description: string;
  detailedMeaning: string;
}

export interface PersonalCycle {
  personalYear: number;
  personalMonth: number;
  personalDay: number;
  yearMeaning: string;
  monthMeaning: string;
}

export interface PinnacleCycleResult {
  number: number;
  startAge: number;
  endAge: number | null;
  /** Interpretation of this pinnacle period */
  theme?: string;
  meaning?: string;
  advice?: string;
}

export interface ChallengeCycleResult {
  number: number;
  startAge: number;
  endAge: number | null;
  /** Interpretation of this challenge period */
  theme?: string;
  meaning?: string;
  advice?: string;
}

export interface NumberInteraction {
  pair: string;
  nature: 'synergy' | 'tension' | 'complementary';
  description: string;
}

export interface LifePeriodResult {
  name: string;
  nameVi: string;
  number: number;
  startAge: number;
  endAge: number | null;
}

export interface BirthdayGrid {
  /** 3×3 grid: grid[row][col] = count of that number */
  grid: number[][];
  /** Which numbers are present */
  present: number[];
  /** Which numbers are missing (arrows of weakness) */
  missing: number[];
  /** Notable arrows (rows/cols/diags that are fully present) */
  arrows: string[];
}

export interface NumerologyProfile {
  system: NumerologySystem;
  fullName: string;
  birthDate: Date;
  /** Core numbers */
  lifePath: CoreNumber;
  expression: CoreNumber;
  soulUrge: CoreNumber;
  personality: CoreNumber;
  birthday: CoreNumber;
  maturity: CoreNumber;
  /** Cycles */
  personalCycle: PersonalCycle;
  /** Birthday grid (Pythagorean only) */
  birthdayGrid: BirthdayGrid;
  /** All karmic debt numbers found */
  karmicDebts: number[];
  /** All master numbers found */
  masterNumbers: number[];
  /** Pinnacle cycles (4 life peaks) */
  pinnacles: PinnacleCycleResult[];
  /** Challenge cycles (4 life challenges) */
  challenges: ChallengeCycleResult[];
  /** Life periods (3 grand stages) */
  lifePeriods: LifePeriodResult[];
  /** P3.6: Hidden Passion — most frequent number in name */
  hiddenPassion?: CoreNumber;
  /** P3.6: Subconscious Self — 9 minus count of missing numbers */
  subconsciousSelf?: CoreNumber;
  /** Number interaction analysis between core numbers */
  numberInteractions?: NumberInteraction[];
}

// ── Letter-to-Number Mappings ──────────────────────────────────

/** Pythagorean: A=1, B=2, ... I=9, J=1, K=2, ... */
const PYTHAGOREAN_MAP: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
};

/** Chaldean: different mapping, no 9 assigned to letters */
const CHALDEAN_MAP: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 8, g: 3, h: 5, i: 1,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 7, p: 8, q: 1, r: 2,
  s: 3, t: 4, u: 6, v: 6, w: 6, x: 5, y: 1, z: 7,
};

/** Vietnamese diacritics → base letter for numerology mapping */
const VIETNAMESE_NORMALIZE: Record<string, string> = {
  'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
  'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
  'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
  'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
  'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
  'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
  'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
  'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
  'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
  'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
  'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
  'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
  'đ': 'd',
};

const BASE_VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

/**
 * P2.6: Context-aware Y vowel/consonant classification.
 * Y is a vowel when it's the only vowel sound in a syllable.
 * Y is a consonant when adjacent to another vowel or at word start before a vowel.
 */
function isYVowel(chars: string[], index: number): boolean {
  if (chars[index] !== 'y') return false;
  if (index === 0 && index + 1 < chars.length && BASE_VOWELS.has(chars[index + 1])) return false;
  const prevIsVowel = index > 0 && BASE_VOWELS.has(chars[index - 1]);
  const nextIsVowel = index + 1 < chars.length && BASE_VOWELS.has(chars[index + 1]);
  return !prevIsVowel && !nextIsVowel;
}

function isVowelChar(chars: string[], index: number): boolean {
  if (BASE_VOWELS.has(chars[index])) return true;
  return chars[index] === 'y' && isYVowel(chars, index);
}

const KARMIC_DEBT_NUMBERS = [13, 14, 16, 19];
const MASTER_NUMBERS = [11, 22, 33];

// ── Reduction Helpers ──────────────────────────────────────────

/** Reduce a number to a single digit, preserving master numbers */
export function reduceToDigit(n: number, preserveMaster = true): number {
  while (n > 9) {
    if (preserveMaster && MASTER_NUMBERS.includes(n)) return n;
    n = String(n).split('').reduce((sum, d) => sum + parseInt(d), 0);
  }
  return n;
}

/** Check if sum passes through a karmic debt number before final reduction */
function checkKarmicDebt(rawSum: number): boolean {
  return KARMIC_DEBT_NUMBERS.includes(rawSum);
}

/** Normalize Vietnamese text to ASCII base letters */
function normalizeVietnamese(text: string): string {
  return text.toLowerCase().split('').map(c => VIETNAMESE_NORMALIZE[c] || c).join('');
}

/** Get letter values for a name string */
function getLetterValues(name: string, system: NumerologySystem): number[] {
  const map = system === 'pythagorean' ? PYTHAGOREAN_MAP : CHALDEAN_MAP;
  const normalized = normalizeVietnamese(name);
  return normalized.split('').filter(c => map[c] !== undefined).map(c => map[c]);
}

/** Get vowel values only (P2.6: context-aware Y) */
function getVowelValues(name: string, system: NumerologySystem): number[] {
  const map = system === 'pythagorean' ? PYTHAGOREAN_MAP : CHALDEAN_MAP;
  const normalized = normalizeVietnamese(name);
  const chars = normalized.split('').filter(c => map[c] !== undefined);
  return chars.filter((_, i) => isVowelChar(chars, i)).map(c => map[c]);
}

/** Get consonant values only (P2.6: context-aware Y) */
function getConsonantValues(name: string, system: NumerologySystem): number[] {
  const map = system === 'pythagorean' ? PYTHAGOREAN_MAP : CHALDEAN_MAP;
  const normalized = normalizeVietnamese(name);
  const chars = normalized.split('').filter(c => map[c] !== undefined);
  return chars.filter((_, i) => !isVowelChar(chars, i)).map(c => map[c]);
}

// ── Number Meanings ────────────────────────────────────────────

const NUMBER_KEYWORDS: Record<number, string> = {
  1: 'Lãnh đạo, độc lập, sáng tạo',
  2: 'Hợp tác, cân bằng, ngoại giao',
  3: 'Sáng tạo, biểu đạt, vui vẻ',
  4: 'Ổn định, kỷ luật, nền tảng',
  5: 'Tự do, phiêu lưu, đa dạng',
  6: 'Trách nhiệm, gia đình, chăm sóc',
  7: 'Tâm linh, phân tích, tri thức',
  8: 'Quyền lực, thành công, vật chất',
  9: 'Nhân đạo, từ bi, hoàn thành',
  11: 'Thầy giáo tâm linh — Trực giác & Khai sáng',
  22: 'Nhà xây dựng bậc thầy — Tầm nhìn & Thực hiện',
  33: 'Bậc thầy giáo dễ thương — Tình yêu & Phụng sự',
};

const PERSONAL_YEAR_MEANINGS: Record<number, string> = {
  1: 'Năm khởi đầu mới, đặt nền móng cho chu kỳ 9 năm. Hãy mạnh dạn hành động.',
  2: 'Năm hợp tác và kiên nhẫn. Chú trọng vào các mối quan hệ và sự cân bằng.',
  3: 'Năm sáng tạo và giao tiếp. Thể hiện bản thân và tận hưởng cuộc sống.',
  4: 'Năm xây dựng nền tảng. Làm việc chăm chỉ và có kỷ luật.',
  5: 'Năm thay đổi và tự do. Đón nhận cơ hội mới với tinh thần phiêu lưu.',
  6: 'Năm trách nhiệm gia đình. Chăm sóc người thân và cộng đồng.',
  7: 'Năm nội tâm và tâm linh. Dành thời gian cho sự phát triển bản thân.',
  8: 'Năm thu hoạch thành quả. Cơ hội về tài chính và sự nghiệp.',
  9: 'Năm kết thúc và buông bỏ. Chuẩn bị cho chu kỳ mới.',
};

const PERSONAL_MONTH_MEANINGS: Record<number, string> = {
  1: 'Tháng bắt đầu dự án mới.',
  2: 'Tháng kiên nhẫn và hợp tác.',
  3: 'Tháng sáng tạo và giao tiếp.',
  4: 'Tháng tập trung công việc.',
  5: 'Tháng thay đổi và linh hoạt.',
  6: 'Tháng gia đình và trách nhiệm.',
  7: 'Tháng nghỉ ngơi và suy ngẫm.',
  8: 'Tháng tài chính và quyết định.',
  9: 'Tháng hoàn thành và cho đi.',
};

const ARROW_NAMES: Record<string, string> = {
  'row-0': 'Mũi tên Trí tuệ (1-2-3)',
  'row-1': 'Mũi tên Cảm xúc (4-5-6)',
  'row-2': 'Mũi tên Hành động (7-8-9)',
  'col-0': 'Mũi tên Ý chí (1-4-7)',
  'col-1': 'Mũi tên Cân bằng (2-5-8)',
  'col-2': 'Mũi tên Hoạt động (3-6-9)',
  'diag-0': 'Mũi tên Quyết tâm (1-5-9)',
  'diag-1': 'Mũi tên Tâm linh (3-5-7)',
};

// ── Core Calculations ──────────────────────────────────────────

function calcLifePath(date: Date): { value: number; rawSum: number } {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  // Reduce each component separately, then sum
  const dayReduced = reduceToDigit(d, false);
  const monthReduced = reduceToDigit(m, false);
  const yearReduced = reduceToDigit(
    String(y).split('').reduce((s, c) => s + parseInt(c), 0),
    false
  );

  const rawSum = dayReduced + monthReduced + yearReduced;
  const value = reduceToDigit(rawSum);
  return { value, rawSum };
}

function calcExpression(name: string, system: NumerologySystem): { value: number; rawSum: number } {
  const values = getLetterValues(name, system);
  const rawSum = values.reduce((s, v) => s + v, 0);
  const value = reduceToDigit(rawSum);
  return { value, rawSum };
}

function calcSoulUrge(name: string, system: NumerologySystem): { value: number; rawSum: number } {
  const values = getVowelValues(name, system);
  const rawSum = values.reduce((s, v) => s + v, 0);
  const value = reduceToDigit(rawSum);
  return { value, rawSum };
}

function calcPersonality(name: string, system: NumerologySystem): { value: number; rawSum: number } {
  const values = getConsonantValues(name, system);
  const rawSum = values.reduce((s, v) => s + v, 0);
  const value = reduceToDigit(rawSum);
  return { value, rawSum };
}

function calcBirthday(date: Date): { value: number } {
  const day = date.getDate();
  return { value: reduceToDigit(day) };
}

function calcPersonalCycle(date: Date): PersonalCycle {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();
  const birthMonth = date.getMonth() + 1;
  const birthDay = date.getDate();

  // Personal Year = birth month + birth day + current year
  const pyRaw = reduceToDigit(birthMonth, false) + reduceToDigit(birthDay, false) +
    reduceToDigit(String(currentYear).split('').reduce((s, c) => s + parseInt(c), 0), false);
  const personalYear = reduceToDigit(pyRaw, false);

  // Personal Month = personal year + current calendar month
  const pmRaw = personalYear + currentMonth;
  const personalMonth = reduceToDigit(pmRaw, false);

  // Personal Day = personal month + current day
  const pdRaw = personalMonth + currentDay;
  const personalDay = reduceToDigit(pdRaw, false);

  return {
    personalYear,
    personalMonth,
    personalDay,
    yearMeaning: PERSONAL_YEAR_MEANINGS[personalYear] || 'Năm chuyển tiếp.',
    monthMeaning: PERSONAL_MONTH_MEANINGS[personalMonth] || 'Tháng chuyển tiếp.',
  };
}

function calcBirthdayGrid(date: Date): BirthdayGrid {
  // Extract all digits from the birth date (dd/mm/yyyy)
  const dateStr = `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`;
  const digits = dateStr.split('').map(Number).filter(d => d >= 1 && d <= 9);

  // Count occurrences in a 3×3 grid:
  // Row 0: 1, 2, 3
  // Row 1: 4, 5, 6
  // Row 2: 7, 8, 9
  const counts = new Map<number, number>();
  for (const d of digits) {
    counts.set(d, (counts.get(d) || 0) + 1);
  }

  const grid: number[][] = [
    [counts.get(1) || 0, counts.get(2) || 0, counts.get(3) || 0],
    [counts.get(4) || 0, counts.get(5) || 0, counts.get(6) || 0],
    [counts.get(7) || 0, counts.get(8) || 0, counts.get(9) || 0],
  ];

  const present = Array.from({ length: 9 }, (_, i) => i + 1).filter(n => (counts.get(n) || 0) > 0);
  const missing = Array.from({ length: 9 }, (_, i) => i + 1).filter(n => (counts.get(n) || 0) === 0);

  // Detect arrows (fully present rows, cols, diagonals)
  const arrows: string[] = [];
  for (let r = 0; r < 3; r++) {
    if (grid[r][0] > 0 && grid[r][1] > 0 && grid[r][2] > 0) {
      arrows.push(ARROW_NAMES[`row-${r}`]);
    }
  }
  for (let c = 0; c < 3; c++) {
    if (grid[0][c] > 0 && grid[1][c] > 0 && grid[2][c] > 0) {
      arrows.push(ARROW_NAMES[`col-${c}`]);
    }
  }
  if (grid[0][0] > 0 && grid[1][1] > 0 && grid[2][2] > 0) {
    arrows.push(ARROW_NAMES['diag-0']);
  }
  if (grid[0][2] > 0 && grid[1][1] > 0 && grid[2][0] > 0) {
    arrows.push(ARROW_NAMES['diag-1']);
  }

  return { grid, present, missing, arrows };
}

// ── Pinnacle & Challenge Calculations ──────────────────────────

function calcPinnacles(date: Date): PinnacleCycleResult[] {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  const dayReduced = reduceToDigit(d);
  const monthReduced = reduceToDigit(m);
  const yearReduced = reduceToDigit(
    String(y).split('').reduce((s, c) => s + parseInt(c), 0)
  );

  // Life Path for calculating first pinnacle age range
  const lpRaw = reduceToDigit(d, false) + reduceToDigit(m, false) +
    reduceToDigit(String(y).split('').reduce((s, c) => s + parseInt(c), 0), false);
  const lifePath = reduceToDigit(lpRaw);
  const firstEnd = 36 - lifePath;

  const p1 = reduceToDigit(monthReduced + dayReduced);
  const p2 = reduceToDigit(dayReduced + yearReduced);
  const p3 = reduceToDigit(p1 + p2);
  const p4 = reduceToDigit(monthReduced + yearReduced);

  const pinnacleData = numerologyInterp.pinnacleInterpretation as Record<string, { theme: string; meaning: string; advice: string }>;

  return [
    { number: p1, startAge: 0, endAge: firstEnd, ...pinnacleData[String(p1)] },
    { number: p2, startAge: firstEnd + 1, endAge: firstEnd + 9, ...pinnacleData[String(p2)] },
    { number: p3, startAge: firstEnd + 10, endAge: firstEnd + 18, ...pinnacleData[String(p3)] },
    { number: p4, startAge: firstEnd + 19, endAge: null, ...pinnacleData[String(p4)] },
  ];
}

function calcChallenges(date: Date): ChallengeCycleResult[] {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  const dayReduced = reduceToDigit(d, false);
  const monthReduced = reduceToDigit(m, false);
  const yearReduced = reduceToDigit(
    String(y).split('').reduce((s, c) => s + parseInt(c), 0), false
  );

  const lpRaw = dayReduced + monthReduced +
    reduceToDigit(String(y).split('').reduce((s, c) => s + parseInt(c), 0), false);
  const lifePath = reduceToDigit(lpRaw, false);
  const firstEnd = 36 - lifePath;

  const c1 = Math.abs(monthReduced - dayReduced);
  const c2 = Math.abs(dayReduced - yearReduced);
  const c3 = Math.abs(c1 - c2);
  const c4 = Math.abs(monthReduced - yearReduced);

  const challengeData = numerologyInterp.challengeInterpretation as Record<string, { theme: string; meaning: string; advice: string }>;

  return [
    { number: c1, startAge: 0, endAge: firstEnd, ...challengeData[String(c1)] },
    { number: c2, startAge: firstEnd + 1, endAge: firstEnd + 9, ...challengeData[String(c2)] },
    { number: c3, startAge: firstEnd + 10, endAge: firstEnd + 18, ...challengeData[String(c3)] },
    { number: c4, startAge: firstEnd + 19, endAge: null, ...challengeData[String(c4)] },
  ];
}

function calcLifePeriods(date: Date): LifePeriodResult[] {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const y = date.getFullYear();

  const formativeNum = reduceToDigit(m);
  const productiveNum = reduceToDigit(d);
  const harvestNum = reduceToDigit(
    String(y).split('').reduce((s, c) => s + parseInt(c), 0)
  );

  return [
    { name: 'Formative', nameVi: 'Giai Đoạn Hình Thành', number: formativeNum, startAge: 0, endAge: 27 },
    { name: 'Productive', nameVi: 'Giai Đoạn Phát Triển', number: productiveNum, startAge: 28, endAge: 55 },
    { name: 'Harvest', nameVi: 'Giai Đoạn Thu Hoạch', number: harvestNum, startAge: 56, endAge: null },
  ];
}

// ── Main Public API ────────────────────────────────────────────

function getMeaning(value: number): { desc: string; detailed: string } {
  const normVal = NUMBER_KEYWORDS[value] ? value : reduceToDigit(value, false);
  return {
    desc: NUMBER_KEYWORDS[normVal] || 'Số đặc biệt',
    detailed: CORE_MEANINGS[normVal]?.overview || 'Số này mang năng lượng độc đáo, kết hợp các tính chất của các số thành phần.',
  };
}

function buildCoreNumber(
  name: string,
  nameVi: string,
  value: number,
  rawSum: number,
): CoreNumber {
  const meaning = getMeaning(value);
  return {
    name,
    nameVi,
    value,
    masterNumber: MASTER_NUMBERS.includes(value),
    karmicDebt: checkKarmicDebt(rawSum),
    description: meaning.desc,
    detailedMeaning: meaning.detailed,
  };
}

const _profileCache = new Map<string, NumerologyProfile>();

/**
 * Generate a complete numerology profile.
 *
 * @param fullName Full name (supports Vietnamese diacritics)
 * @param birthDate Birth date
 * @param system Numerology system (default: pythagorean)
 */
export function generateNumerologyProfile(
  fullName: string,
  birthDate: Date,
  system: NumerologySystem = 'pythagorean',
): NumerologyProfile {
  // LRU / Memoization Cache Key
  const cacheKey = `${fullName.trim().toLowerCase()}_${birthDate.getTime()}_${system}`;
  if (_profileCache.has(cacheKey)) {
    return _profileCache.get(cacheKey)!;
  }

  const lifePath = calcLifePath(birthDate);
  const expression = calcExpression(fullName, system);
  const soulUrge = calcSoulUrge(fullName, system);
  const personality = calcPersonality(fullName, system);
  const birthday = calcBirthday(birthDate);
  const maturityRaw = lifePath.value + expression.value;
  const maturityValue = reduceToDigit(maturityRaw);
  const personalCycle = calcPersonalCycle(birthDate);
  const birthdayGrid = calcBirthdayGrid(birthDate);
  const pinnacles = calcPinnacles(birthDate);
  const challenges = calcChallenges(birthDate);
  const lifePeriods = calcLifePeriods(birthDate);

  // Number interaction analysis between core numbers
  const interactionsData = numerologyInterp.numberInteractions as Record<string, { nature: string; description: string }>;
  const coreValues = [
    { label: 'Đường Đời', val: lifePath.value },
    { label: 'Biểu Đạt', val: expression.value },
    { label: 'Linh Hồn', val: soulUrge.value },
    { label: 'Nhân Cách', val: personality.value },
  ];
  const numberInteractions: NumberInteraction[] = [];
  for (let i = 0; i < coreValues.length; i++) {
    for (let j = i + 1; j < coreValues.length; j++) {
      const a = Math.min(coreValues[i].val, coreValues[j].val);
      const b = Math.max(coreValues[i].val, coreValues[j].val);
      if (a === b) continue; // same number, no interaction
      const key = `${a}-${b}`;
      const data = interactionsData[key];
      if (data) {
        numberInteractions.push({
          pair: `${coreValues[i].label} (${coreValues[i].val}) × ${coreValues[j].label} (${coreValues[j].val})`,
          nature: data.nature as NumberInteraction['nature'],
          description: data.description,
        });
      }
    }
  }

  // Collect all karmic debts and master numbers across core numbers
  const allRawSums = [lifePath.rawSum, expression.rawSum, soulUrge.rawSum, personality.rawSum];
  const karmicDebts = [...new Set(allRawSums.filter(s => KARMIC_DEBT_NUMBERS.includes(s)))];
  const allValues = [lifePath.value, expression.value, soulUrge.value, personality.value, birthday.value, maturityValue];
  const masterNumbersFound = [...new Set(allValues.filter(v => MASTER_NUMBERS.includes(v)))];

  // P3.6: Hidden Passion + Subconscious Self
  const hiddenPassion = calcHiddenPassion(fullName, system);
  const subconsciousSelf = calcSubconsciousSelf(birthdayGrid);

  const profile: NumerologyProfile = {
    system,
    fullName,
    birthDate,
    lifePath: buildCoreNumber('Life Path', 'Số Đường Đời', lifePath.value, lifePath.rawSum),
    expression: buildCoreNumber('Expression', 'Số Biểu Đạt', expression.value, expression.rawSum),
    soulUrge: buildCoreNumber('Soul Urge', 'Số Linh Hồn', soulUrge.value, soulUrge.rawSum),
    personality: buildCoreNumber('Personality', 'Số Nhân Cách', personality.value, personality.rawSum),
    birthday: buildCoreNumber('Birthday', 'Số Ngày Sinh', birthday.value, birthday.value),
    maturity: buildCoreNumber('Maturity', 'Số Trưởng Thành', maturityValue, maturityRaw),
    personalCycle,
    birthdayGrid,
    karmicDebts,
    masterNumbers: masterNumbersFound,
    pinnacles,
    challenges,
    lifePeriods,
    hiddenPassion,
    subconsciousSelf,
    numberInteractions,
  };

  // Manage cache size (max 50)
  if (_profileCache.size > 50) {
    const oldestKey = _profileCache.keys().next().value;
    if (oldestKey) _profileCache.delete(oldestKey);
  }
  _profileCache.set(cacheKey, profile);

  return profile;
}

// ── P3.6: Hidden Passion + Subconscious Self ─────────────────

/**
 * P3.6: Hidden Passion — the number that appears MOST frequently in the name.
 * Reveals a deep inner talent or drive.
 */
function calcHiddenPassion(fullName: string, system: NumerologySystem): CoreNumber {
  const values = getLetterValues(fullName, system);
  const frequency: Record<number, number> = {};
  for (const v of values) {
    const reduced = reduceToDigit(v, false);
    frequency[reduced] = (frequency[reduced] || 0) + 1;
  }
  let maxCount = 0;
  let passionNumber = 1;
  for (const [num, count] of Object.entries(frequency)) {
    if (count > maxCount) {
      maxCount = count;
      passionNumber = parseInt(num);
    }
  }
  return buildCoreNumber('Hidden Passion', 'Đam Mê Ẩn', passionNumber, passionNumber);
}

/**
 * P3.6: Subconscious Self — 9 minus the count of missing numbers in birthday grid.
 * Represents your built-in response to emergency situations.
 */
function calcSubconsciousSelf(grid: BirthdayGrid): CoreNumber {
  const value = 9 - grid.missing.length;
  return buildCoreNumber('Subconscious Self', 'Tiềm Thức', value, value);
}
