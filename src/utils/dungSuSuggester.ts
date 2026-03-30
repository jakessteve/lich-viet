import { getDetailedDayData } from './calendarEngine';
import { scoreActivity, ActivityScoreResult } from './activityScorer';
import { getMaxSearchDaysForActivity } from './activityCatalog';

export interface NextBestDateItem {
  date: Date;
  scoreResult: ActivityScoreResult;
}

/**
 * Quét tìm các ngày tốt tiếp theo cho một hoạt động từ ngày cấu hình.
 */
export function findNextBestDates(
  activityId: string,
  fromDate: Date,
  limit: number = 3
): NextBestDateItem[] {
  const maxSearchDays = getMaxSearchDaysForActivity(activityId);
  const bestDates: NextBestDateItem[] = [];
  
  // Start from tomorrow relative to the user's selected date (fromDate)
  const current = new Date(fromDate);
  current.setDate(current.getDate() + 1);

  let searchCount = 0;
  while (searchCount < maxSearchDays) {
    // Generate data for the current day
    const dayData = getDetailedDayData(current);
    
    // We only pass the activity. We do NOT pass user synastry or hour since we are 
    // evaluating the overall day grade first.
    const scoreResult = scoreActivity(activityId, dayData, undefined);

    // We consider "Rất Tốt" (percentage > 75) or "Khá" (percentage > 50 and no major violations)
    // Avoid strictly bad days where score < 50 or isBachSuHung is true
    if (scoreResult.percentage >= 60 && !scoreResult.isBachSuHung) {
      bestDates.push({
        date: new Date(current),
        scoreResult,
      });

      if (bestDates.length >= limit) {
        break; // found enough dates
      }
    }

    current.setDate(current.getDate() + 1);
    searchCount++;
  }

  // Sort dates by score descending
  bestDates.sort((a, b) => b.scoreResult.percentage - a.scoreResult.percentage);

  // If we couldn't find limit dates reaching score 60, just return what we have
  return bestDates.slice(0, limit);
}
