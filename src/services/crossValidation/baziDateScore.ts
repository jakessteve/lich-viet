import { BasicProfile, ExtendedProfile } from '../../types/auth';
import { SystemScore } from '../../types/crossValidation';
import { calculatePersonalDayScore } from '../personalization/personalDayScore';
import { getDayCanChi } from '../../packages/vn-lunar/core';
import { getJDN } from '@lich-viet/core/calendar';
import { Chi } from '../../types/calendar';

/**
 * Calculates a Bát Tự (Four Pillars) based Auspicious Score for a date.
 * If extendedProfile is present, uses Day Master and full pillars (P2).
 * If only basic profile is present, falls back to Year Pillar interactions (P1).
 */
export function evaluateBaziDayClash(
  basicProfile: BasicProfile | null | undefined,
  extendedProfile: ExtendedProfile | null | undefined,
  targetDate: Date
): SystemScore {
  if (!basicProfile || !basicProfile.birthYear) {
    return { score: 50, weight: 0.30, flags: ['Thiếu năm sinh'], isAvailable: false };
  }

  // Get the Target Date's Earthly Branch (Chi)
  const jdn = getJDN(targetDate.getDate(), targetDate.getMonth() + 1, targetDate.getFullYear());
  const dayCanChiStr = getDayCanChi(jdn);
  const dayChi = dayCanChiStr.split(' ')[1] as Chi; // Cast to Chi

  let score = 50;
  const flags: string[] = [];

  // 1. Base Score from Year Pillar (Thái Tuế / Tam Hợp / Lục Xung)
  const personalDayScore = calculatePersonalDayScore(basicProfile, dayChi);
  
  if (personalDayScore) {
    // actionScore ranges from -45 to +15 typically
    // Translate to 0-100 scale. Base 50. 
    // +3 -> 85 (Đại Cát)
    // 0 -> 50 (Bình Hòa)
    // -3 -> 20 (Đại Hung)
    score += personalDayScore.actionScore * 10;
    score = Math.max(0, Math.min(100, score)); // Clamp 0-100

    if (personalDayScore.isThaiTue) flags.push('Năm Thái Tuế');
    if (personalDayScore.isTamHop) flags.push('Tam Hợp Tuổi');
    if (personalDayScore.isLucHop) flags.push('Lục Hợp Tuổi');
    if (personalDayScore.isTuongXung) flags.push('Ngày Xung Tuổi');
    if (personalDayScore.isTuongHai) flags.push('Ngày Hại Tuổi');
    if (personalDayScore.isTuongHinh) flags.push('Ngày Hình Tuổi');
  }

  // 2. Full 4-Pillar Checks (if Extended Profile exists)
  if (extendedProfile && extendedProfile.tuanKhong && extendedProfile.tuanKhong.includes(dayChi)) {
    score -= 30; // Huge penalty for Tuần Không (Void Day)
    score = Math.max(0, score);
    flags.push('Ngày Không Vong (Bát Tự)');
  }

  return {
    score,
    weight: 0.30,
    flags,
    isAvailable: true
  };
}
