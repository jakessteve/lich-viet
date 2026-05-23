/**
 * Tử Vi Star Combination Detection
 *
 * Pure TypeScript module for detecting named star combinations (Cách Cục)
 * in a Tử Vi chart. No React dependencies.
 */

import type { TuViPalace, TuViCombination, CombinationPurity } from '../../types/tuvi';
import combinationsData from '../../data/tuvi/combinations.json';
import { TAM_HOP_GROUPS, DOI_CUNG_MAP } from './constants';

// ── Type Definitions ──────────────────────────────────────────

interface CombinationDefinition {
  id: string;
  name: string;
  nameHanViet: string;
  category: 'cat' | 'hung' | 'trung';
  stars: string[];
  palaceConstraint: 'sameCung' | 'tamHop' | 'sameCungOrTamHop' | 'giap';
  description: string;
  note: string;
  requiresTuHoa?: boolean;
  requiresGiap?: boolean;
}

const COMBINATIONS: CombinationDefinition[] = combinationsData.combinations as CombinationDefinition[];

/** Major Sát Tinh that break a combination (phá). */
const MAJOR_SAT_TINH = new Set([
  'Kình Dương',
  'Đà La',
  'Hỏa Tinh',
  'Linh Tinh',
]);

/** Minor Sát Tinh that dilute a combination (bán). */
const MINOR_SAT_TINH = new Set([
  'Địa Không',
  'Địa Kiếp',
  'Hóa Kỵ',
]);

/** All Sát Tinh names for purity checks. */
const ALL_SAT_TINH = new Set([...MAJOR_SAT_TINH, ...MINOR_SAT_TINH]);

/** Brightness score weights for strength calculation. */
const BRIGHTNESS_SCORES: Record<string, number> = {
  'Miếu': 2,
  'Vượng': 1.5,
  'Đắc': 1,
  'Địa': 1,
  'Lợi': 0.5,
  'Bình': 0,
  'Bất': -0.5,
  'Hãm': -1,
};

// ── Geometry Helpers ──────────────────────────────────────────

/**
 * Returns the indices of the two Tam Hợp palaces for a given palace.
 * Each palace belongs to exactly one Tam Hợp group of 3 palaces.
 */
export function detectTamHopPalaces(palaceIndex: number): number[] {
  for (const group of TAM_HOP_GROUPS) {
    if (group.includes(palaceIndex)) {
      return group.filter((idx) => idx !== palaceIndex);
    }
  }
  return [];
}

/**
 * Returns the index of the Đối Cung (opposition palace).
 */
export function detectDoiCung(palaceIndex: number): number {
  return DOI_CUNG_MAP[palaceIndex];
}

// ── Star Extraction ───────────────────────────────────────────

/**
 * Returns all star names in a palace (Chính Tinh + Phụ Tinh + Sát Tinh).
 */
export function getStarsInPalace(palace: TuViPalace): string[] {
  return [
    ...palace.chinhTinh.map((s) => s.name),
    ...palace.phuTinh.map((s) => s.name),
    ...palace.satTinh.map((s) => s.name),
  ];
}

/**
 * Returns all star names in the Tam Phương Tứ Chính
 * (palace + 2 Tam Hợp + Đối Cung).
 */
export function getStarsInTamHop(palaces: TuViPalace[], palaceIndex: number): string[] {
  const tamHop = detectTamHopPalaces(palaceIndex);
  const doiCung = detectDoiCung(palaceIndex);
  const indices = [palaceIndex, ...tamHop, doiCung];
  const uniqueIndices = Array.from(new Set(indices));

  const stars: string[] = [];
  for (const idx of uniqueIndices) {
    stars.push(...getStarsInPalace(palaces[idx]));
  }
  return stars;
}

// ── Purity Check ──────────────────────────────────────────────

/**
 * Checks if a combination is pure (thuần), mixed (bán), or broken (phá).
 *
 * - thuần: no Sát Tinh present
 * - bán:  minor Sát Tinh present (Địa Không, Địa Kiếp, Hóa Kỵ)
 * - phá:  major Sát Tinh present (Kình Dương, Đà La, Hỏa Tinh, Linh Tinh)
 */
export function checkCombinationPurity(
  involvedPalaces: TuViPalace[],
  satTinhNames: string[] = Array.from(ALL_SAT_TINH)
): CombinationPurity {
  const majorSet = new Set([...MAJOR_SAT_TINH].filter((n) => satTinhNames.includes(n)));
  const minorSet = new Set([...MINOR_SAT_TINH].filter((n) => satTinhNames.includes(n)));

  let hasMajor = false;
  let hasMinor = false;

  for (const palace of involvedPalaces) {
    for (const star of palace.satTinh) {
      if (majorSet.has(star.name)) {
        hasMajor = true;
      }
      if (minorSet.has(star.name)) {
        hasMinor = true;
      }
    }
    // Also check tuHoa for Hóa Kỵ
    for (const tuHoa of palace.tuHoa) {
      if (tuHoa.type === 'Kỵ') {
        hasMinor = true;
      }
    }
  }

  if (hasMajor) return 'phá';
  if (hasMinor) return 'bán';
  return 'thuần';
}

// ── Strength Calculation ──────────────────────────────────────

/**
 * Calculates a strength score (1–10) for a detected combination.
 *
 * Factors:
 * - Star brightness (Miếu/Vượng = higher)
 * - Purity (thuần > bán > phá)
 * - Whether any involved palace is the Mệnh palace
 */
export function calculateCombinationStrength(
  combination: TuViCombination,
  palaces: TuViPalace[]
): number {
  let score = 5; // base

  // Brightness bonus for involved stars in involved palaces
  const involvedPalaceSet = new Set(combination.involvedCung);
  for (const palace of palaces) {
    if (!involvedPalaceSet.has(palace.name)) continue;

    for (const starName of combination.involvedStars) {
      const brightness = palace.brightness[starName];
      if (brightness) {
        score += BRIGHTNESS_SCORES[brightness] ?? 0;
      }
    }
  }

  // Purity modifier
  switch (combination.purity) {
    case 'thuần':
      score += 2;
      break;
    case 'bán':
      score += 0;
      break;
    case 'phá':
      score -= 2;
      break;
  }

  // Mệnh palace bonus
  const menhPalace = palaces.find((p) => p.isMenh);
  if (menhPalace && combination.involvedCung.includes(menhPalace.name)) {
    score += 1;
  }

  // Clamp to 1–10
  return Math.max(1, Math.min(10, Math.round(score)));
}

// ── Combination Detection ─────────────────────────────────────

/**
 * Scans all 12 palaces for named star combinations.
 *
 * Uses the combinations.json data for pattern definitions.
 * For each combination, checks if the required stars are present
 * in the specified palace constraint.
 */
export function detectCombinations(palaces: TuViPalace[]): TuViCombination[] {
  const results: TuViCombination[] = [];
  const seenKeys = new Set<string>();

  for (const def of COMBINATIONS) {
    switch (def.palaceConstraint) {
      case 'sameCung':
        detectSameCung(palaces, def, results, seenKeys);
        break;
      case 'tamHop':
        detectTamHop(palaces, def, results, seenKeys);
        break;
      case 'sameCungOrTamHop':
        detectSameCungOrTamHop(palaces, def, results, seenKeys);
        break;
      case 'giap':
        detectGiap(palaces, def, results, seenKeys);
        break;
    }
  }

  return results;
}

// ── Internal Detectors ────────────────────────────────────────

function makeKey(name: string, cungNames: string[]): string {
  return `${name}::${cungNames.slice().sort().join(',')}`;
}

function detectSameCung(
  palaces: TuViPalace[],
  def: CombinationDefinition,
  results: TuViCombination[],
  seenKeys: Set<string>
): void {
  for (const palace of palaces) {
    const stars = getStarsInPalace(palace);
    if (def.requiresTuHoa) {
      // handled separately via detectTamHop for requiresTuHoa
      continue;
    }
    if (hasAllStars(stars, def.stars)) {
      const key = makeKey(def.name, [palace.name]);
      if (seenKeys.has(key)) continue;
      seenKeys.add(key);

      const purity = checkCombinationPurity([palace]);
      const combo: TuViCombination = {
        name: def.name,
        nameHanViet: def.nameHanViet,
        involvedStars: def.stars,
        involvedCung: [palace.name],
        detectionReason: `${def.stars.join(', ')} cùng cung ${palace.name}`,
        purity,
        strength: 0, // filled later
        note: def.note,
        category: def.category,
      };
      combo.strength = calculateCombinationStrength(combo, palaces);
      results.push(combo);
    }
  }
}

function detectTamHop(
  palaces: TuViPalace[],
  def: CombinationDefinition,
  results: TuViCombination[],
  seenKeys: Set<string>
): void {
  // For requiresTuHoa (Tam Kỳ): check Hóa Lộc, Hóa Quyền, Hóa Khoa in Tam Phương Tứ Chính
  if (def.requiresTuHoa) {
    detectTuHoaCombinations(palaces, def, results, seenKeys);
    return;
  }

  for (const palace of palaces) {
    const tamHopIndices = detectTamHopPalaces(palace.id);
    const groupPalaces = [palace, ...tamHopIndices.map((idx) => palaces[idx])];
    const groupStars = groupPalaces.flatMap((p) => getStarsInPalace(p));

    if (hasAllStars(groupStars, def.stars)) {
      // Determine which specific palaces actually contain the stars
      const involvedCung = new Set<string>();
      for (const starName of def.stars) {
        for (const p of groupPalaces) {
          if (getStarsInPalace(p).includes(starName)) {
            involvedCung.add(p.name);
          }
        }
      }
      const cungNames = Array.from(involvedCung);
      const key = makeKey(def.name, cungNames);
      if (seenKeys.has(key)) continue;
      seenKeys.add(key);

      const purity = checkCombinationPurity(groupPalaces);
      const combo: TuViCombination = {
        name: def.name,
        nameHanViet: def.nameHanViet,
        involvedStars: def.stars,
        involvedCung: cungNames,
        detectionReason: `${def.stars.join(', ')} tam hợp tại ${cungNames.join(', ')}`,
        purity,
        strength: 0,
        note: def.note,
        category: def.category,
      };
      combo.strength = calculateCombinationStrength(combo, palaces);
      results.push(combo);
    }
  }
}

function detectSameCungOrTamHop(
  palaces: TuViPalace[],
  def: CombinationDefinition,
  results: TuViCombination[],
  seenKeys: Set<string>
): void {
  for (const palace of palaces) {
    const stars = getStarsInPalace(palace);

    // Same Cung check
    if (hasAllStars(stars, def.stars)) {
      const key = makeKey(def.name, [palace.name]);
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        const purity = checkCombinationPurity([palace]);
        const combo: TuViCombination = {
          name: def.name,
          nameHanViet: def.nameHanViet,
          involvedStars: def.stars,
          involvedCung: [palace.name],
          detectionReason: `${def.stars.join(', ')} cùng cung ${palace.name}`,
          purity,
          strength: 0,
          note: def.note,
          category: def.category,
        };
        combo.strength = calculateCombinationStrength(combo, palaces);
        results.push(combo);
      }
      continue; // if sameCung satisfied, no need to check tamHop for this palace
    }

    // Tam Hop check
    const tamHopIndices = detectTamHopPalaces(palace.id);
    const groupPalaces = [palace, ...tamHopIndices.map((idx) => palaces[idx])];
    const groupStars = groupPalaces.flatMap((p) => getStarsInPalace(p));

    if (hasAllStars(groupStars, def.stars)) {
      const involvedCung = new Set<string>();
      for (const starName of def.stars) {
        for (const p of groupPalaces) {
          if (getStarsInPalace(p).includes(starName)) {
            involvedCung.add(p.name);
          }
        }
      }
      const cungNames = Array.from(involvedCung);
      const key = makeKey(def.name, cungNames);
      if (seenKeys.has(key)) continue;
      seenKeys.add(key);

      const purity = checkCombinationPurity(groupPalaces);
      const combo: TuViCombination = {
        name: def.name,
        nameHanViet: def.nameHanViet,
        involvedStars: def.stars,
        involvedCung: cungNames,
        detectionReason: `${def.stars.join(', ')} tam hợp tại ${cungNames.join(', ')}`,
        purity,
        strength: 0,
        note: def.note,
        category: def.category,
      };
      combo.strength = calculateCombinationStrength(combo, palaces);
      results.push(combo);
    }
  }
}

function detectGiap(
  palaces: TuViPalace[],
  def: CombinationDefinition,
  results: TuViCombination[],
  seenKeys: Set<string>
): void {
  for (const palace of palaces) {
    const leftIdx = (palace.id - 1 + 12) % 12;
    const rightIdx = (palace.id + 1) % 12;
    const leftPalace = palaces[leftIdx];
    const rightPalace = palaces[rightIdx];

    const leftHasSat = leftPalace.satTinh.length > 0;
    const rightHasSat = rightPalace.satTinh.length > 0;

    if (leftHasSat && rightHasSat) {
      const key = makeKey(def.name, [palace.name]);
      if (seenKeys.has(key)) continue;
      seenKeys.add(key);

      const involvedPalaces = [palace, leftPalace, rightPalace];
      const purity = checkCombinationPurity(involvedPalaces);

      const satStarNames = [
        ...leftPalace.satTinh.map((s) => s.name),
        ...rightPalace.satTinh.map((s) => s.name),
      ];

      const combo: TuViCombination = {
        name: def.name,
        nameHanViet: def.nameHanViet,
        involvedStars: Array.from(new Set(satStarNames)),
        involvedCung: [palace.name, leftPalace.name, rightPalace.name],
        detectionReason: `${palace.name} bị giáp sát bởi ${leftPalace.name} và ${rightPalace.name}`,
        purity,
        strength: 0,
        note: def.note,
        category: def.category,
      };
      combo.strength = calculateCombinationStrength(combo, palaces);
      results.push(combo);
    }
  }
}

function detectTuHoaCombinations(
  palaces: TuViPalace[],
  def: CombinationDefinition,
  results: TuViCombination[],
  seenKeys: Set<string>
): void {
  const requiredTypes = new Set(['Lộc', 'Quyền', 'Khoa']);

  for (const palace of palaces) {
    const tamHopIndices = detectTamHopPalaces(palace.id);
    const doiCung = detectDoiCung(palace.id);
    const groupIndices = Array.from(new Set([palace.id, ...tamHopIndices, doiCung]));
    const groupPalaces = groupIndices.map((idx) => palaces[idx]);

    const foundTypes = new Set<string>();
    const involvedCung = new Set<string>();

    for (const p of groupPalaces) {
      for (const tuHoa of p.tuHoa) {
        if (requiredTypes.has(tuHoa.type)) {
          foundTypes.add(tuHoa.type);
          involvedCung.add(p.name);
        }
      }
    }

    if (foundTypes.size === requiredTypes.size) {
      const cungNames = Array.from(involvedCung);
      const key = makeKey(def.name, cungNames);
      if (seenKeys.has(key)) continue;
      seenKeys.add(key);

      const purity = checkCombinationPurity(groupPalaces);
      const combo: TuViCombination = {
        name: def.name,
        nameHanViet: def.nameHanViet,
        involvedStars: ['Hóa Lộc', 'Hóa Quyền', 'Hóa Khoa'],
        involvedCung: cungNames,
        detectionReason: `Hóa Lộc, Hóa Quyền, Hóa Khoa đồng cung/tam hợp tại ${cungNames.join(', ')}`,
        purity,
        strength: 0,
        note: def.note,
        category: def.category,
      };
      combo.strength = calculateCombinationStrength(combo, palaces);
      results.push(combo);
    }
  }
}

// ── Utility ───────────────────────────────────────────────────

function hasAllStars(haystack: string[], needles: string[]): boolean {
  if (needles.length === 0) return false;
  const set = new Set(haystack);
  return needles.every((n) => set.has(n));
}
