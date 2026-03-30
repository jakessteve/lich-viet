import { ExtendedProfile, BasicProfile } from '../../types/auth';
import { Chi } from '../../types/calendar';
import { calculatePersonalDayScore } from './personalDayScore';

export interface ScoredActivity {
  name: string;
  score: number;
  isBoosted: boolean;
  isWarned: boolean;
  reason?: string;
}

export interface PersonalDungSuResult {
  voidDayWarning?: string;
  recommended: ScoredActivity[];
  warned: ScoredActivity[];
  regular: ScoredActivity[];
}

/**
 * Calculates personalized Auspicious Activities (Dụng Sự) based on the user's profile.
 * Applies Tuần Không (Void) penalty and daily clash/harmony modifiers.
 */
export function getPersonalDungSu(
  basicProfile: BasicProfile | undefined | null,
  extendedProfile: ExtendedProfile | undefined | null,
  dayChi: Chi,
  suitableActivities: string[]
): PersonalDungSuResult {
  const result: PersonalDungSuResult = {
    recommended: [],
    warned: [],
    regular: []
  };

  if (!suitableActivities || suitableActivities.length === 0) {
    return result;
  }

  // Base score map
  const scoredActivities: ScoredActivity[] = suitableActivities.map(name => ({
    name,
    score: 10, // Base positive score for being in the "suitable" list
    isBoosted: false,
    isWarned: false
  }));

  // 1. Tuần Không (Void Day) Check (from Extended Profile)
  if (extendedProfile?.tuanKhong && extendedProfile.tuanKhong.includes(dayChi)) {
    result.voidDayWarning = 'Ngày Không Vong — Nên Tránh Việc Lớn';
    scoredActivities.forEach(act => {
      act.score -= 20;
      act.isWarned = true;
      act.reason = 'Phạm Tuần Không';
    });
  }

  // 2. Personal Day Score Overlay (from Basic Profile)
  const dayScore = calculatePersonalDayScore(basicProfile, dayChi);
  if (dayScore) {
    scoredActivities.forEach(act => {
      if (dayScore.actionScore >= 3) {
        act.score += 10;
        act.isBoosted = true;
        if (!act.reason) act.reason = 'Ngày Đại Cát với tuổi';
      } else if (dayScore.actionScore <= -3) {
        act.score -= 15;
        act.isWarned = true;
        if (!act.reason) act.reason = 'Ngày Xung khắc mệnh';
      }
    });
  }

  // 3. Sort and Categorize
  scoredActivities.sort((a, b) => b.score - a.score);

  scoredActivities.forEach(act => {
    if (act.score >= 15) {
      result.recommended.push(act);
    } else if (act.score < 5) {
      result.warned.push(act);
    } else {
      result.regular.push(act);
    }
  });

  return result;
}
