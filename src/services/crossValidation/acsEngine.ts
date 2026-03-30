import { BasicProfile, ExtendedProfile } from '../../types/auth';
import { ACSResult, ACSVerdict, DEGRADED_WEIGHTS, FULL_WEIGHTS, SystemScore } from '../../types/crossValidation';
import { evaluateBaziDayClash } from './baziDateScore';
import { evaluateNumerologyDay } from './numerologyDateScore';

const getVerdict = (score: number): ACSVerdict => {
  if (score >= 80) return 'Rất Tốt';
  if (score >= 60) return 'Tốt';
  if (score >= 40) return 'Bình Thường';
  if (score >= 20) return 'Cẩn Thận';
  return 'Tránh';
};

/**
 * Computes the Auspiciousness Consensus Score (ACS) across 4 systems.
 * Runs in parallel. Gracefully degrades to 2/4 mode if extended profile is missing.
 */
export async function computeACS(
  basicProfile: BasicProfile | null | undefined,
  extendedProfile: ExtendedProfile | null | undefined,
  targetDate: Date
): Promise<ACSResult> {
  const isExtended = !!extendedProfile && !!extendedProfile.birthTime;

  // Run independent systems in parallel
  const [bazi, numerology] = await Promise.all([
    Promise.resolve(evaluateBaziDayClash(basicProfile, extendedProfile, targetDate)),
    Promise.resolve(evaluateNumerologyDay(basicProfile, targetDate))
  ]);

  // P1 placeholders for TuVi and Transit (Western Astrology)
  const tuvi: SystemScore = { score: 50, weight: 0.30, flags: isExtended ? ['Đang tính toán...'] : ['Cần giờ sinh để xem Tử Vi'], isAvailable: false };
  const transit: SystemScore = { score: 50, weight: 0.25, flags: isExtended ? ['Đang tính toán...'] : ['Cần giờ sinh để xem Chiêm Tinh'], isAvailable: false };

  // Determine active weights
  const weights = isExtended ? FULL_WEIGHTS : DEGRADED_WEIGHTS;

  let finalScore: number;
  
  // Degraded 2/4 Mode
  if (!isExtended) {
    if (bazi.isAvailable && numerology.isAvailable) {
      finalScore = (bazi.score * weights.bazi) + (numerology.score * weights.numerology);
    } else {
      // Missing profile completely
      finalScore = 50;
    }
  } else {
    // 4/4 Mode
    finalScore = 
      (bazi.score * weights.bazi) + 
      (tuvi.score * weights.tuvi) + 
      (transit.score * weights.transit) + 
      (numerology.score * weights.numerology);
  }

  // Ensure 0-100 bounds
  finalScore = Math.max(0, Math.min(100, Math.round(finalScore)));

  return {
    score: finalScore,
    verdict: getVerdict(finalScore),
    tier: isExtended ? '4/4' : '2/4',
    breakdown: {
      bazi,
      tuvi,
      transit,
      numerology
    }
  };
}
