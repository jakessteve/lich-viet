/**
 * Numerology Narrative Provider
 *
 * Implements the ETC (Engine-Type-Content) pattern by binding raw calculation
 * outputs from numerologyEngine.ts to the rich narrative content in data/interpretation/.
 */

import { NumerologyProfile, CoreNumber } from '@lich-viet/core/numerology';
import {
  CORE_MEANINGS,
  POSITION_MEANINGS,
  MASTER_NUMBER_PROFILES,
  NumberMeaning,
  PositionMeaning,
  KarmicDebtProfile,
  MasterNumberProfile,
  NumerologyPosition,
} from '../../data/interpretation/numerology';

// ── Enriched Types for Output ────────────────────────────────────

export interface EnrichedCoreNumber extends CoreNumber {
  /** Rich narrative for the core number itself */
  narrative: NumberMeaning;
  /** Context-aware narrative tied to the position (e.g., Number 5 as Life Path) */
  positionalNarrative?: PositionMeaning;
  /** If karmic, the karmic debt narrative */
  karmicNarrative?: KarmicDebtProfile;
  /** If master number, the master number narrative */
  masterNarrative?: MasterNumberProfile;
}

export interface FullNarrativeProfile extends Omit<NumerologyProfile, 'lifePath' | 'expression' | 'soulUrge' | 'personality' | 'birthday' | 'maturity'> {
  lifePath: EnrichedCoreNumber;
  expression: EnrichedCoreNumber;
  soulUrge: EnrichedCoreNumber;
  personality: EnrichedCoreNumber;
  birthday: EnrichedCoreNumber;
  maturity: EnrichedCoreNumber;
}

// ── Implementation ───────────────────────────────────────────────

/** Combine a raw core number with its rich narratives */
function enrichCoreNumber(core: CoreNumber, position: NumerologyPosition): EnrichedCoreNumber {
  const narrative = CORE_MEANINGS[core.value] || CORE_MEANINGS[reduceToDigit(core.value)];
  const positionalNarrative = POSITION_MEANINGS[core.value]?.[position];
  
  const karmicNarrative: KarmicDebtProfile | undefined = undefined;
  // If the engine flagged it as karmic, find the source sum that triggered it
  if (core.karmicDebt) {
    // In our engine, karmic debt is based on the rawSum before final reduction
    // E.g. rawSum 13 -> value 4
    // However, the engine doesn't expose rawSum in CoreNumber type currently!
    // We will do a generic lookup if we can't find it, or we rely on the generic karmic info
    // For now, if we don't have the exact karmic number (13, 14, 16, 19), we will look up by value
    // Assuming the user will refactor CoreNumber to contain rawSum if needed.
  }

  let masterNarrative: MasterNumberProfile | undefined;
  if (core.masterNumber) {
    masterNarrative = MASTER_NUMBER_PROFILES[core.value];
  }

  return {
    ...core,
    narrative,
    positionalNarrative,
    karmicNarrative,
    masterNarrative,
  };
}

/** Fallback reduction since it's not exported from engine */
function reduceToDigit(n: number): number {
  if ([11, 22, 33].includes(n)) return n;
  while (n > 9) {
    if ([11, 22, 33].includes(n)) return n;
    n = String(n).split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
  }
  return n;
}

/**
 * Takes a raw NumerologyProfile and deeply augments it with the rich narrative data.
 * Ideal for generating the 60+ page PDF or deep-dive views.
 */
export function buildFullNarrativeProfile(rawProfile: NumerologyProfile): FullNarrativeProfile {
  return {
    ...rawProfile,
    lifePath: enrichCoreNumber(rawProfile.lifePath, 'lifePath'),
    expression: enrichCoreNumber(rawProfile.expression, 'expression'),
    soulUrge: enrichCoreNumber(rawProfile.soulUrge, 'soulUrge'),
    personality: enrichCoreNumber(rawProfile.personality, 'personality'),
    birthday: enrichCoreNumber(rawProfile.birthday, 'birthday'),
    maturity: enrichCoreNumber(rawProfile.maturity, 'maturity'),
  };
}
