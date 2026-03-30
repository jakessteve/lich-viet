/**
 * Shared Verdict Display Helpers
 * Extracted from ACSPanel + SynastryPanel for DRY.
 */

/** Returns Tailwind text classes for score-based verdict coloring. */
export function getVerdictColor(score: number): string {
  if (score >= 80) return 'text-emerald-600 dark:text-emerald-400';
  if (score >= 60) return 'text-emerald-500 dark:text-emerald-500';
  if (score >= 40) return 'text-blue-500 dark:text-blue-400';
  if (score >= 20) return 'text-orange-500 dark:text-orange-400';
  return 'text-red-600 dark:text-red-400';
}

/** Returns Tailwind gradient classes for score-based verdict bars. */
export function getVerdictGradient(score: number): string {
  if (score >= 80) return 'from-emerald-400 to-teal-500';
  if (score >= 60) return 'from-emerald-300 to-emerald-500';
  if (score >= 40) return 'from-blue-400 to-indigo-500';
  if (score >= 20) return 'from-orange-400 to-amber-500';
  return 'from-red-500 to-rose-600';
}

/** Returns a Tailwind bg class for score-based verdict badge. */
export function getVerdictBg(score: number): string {
  if (score >= 80) return 'bg-emerald-100 dark:bg-emerald-900/30';
  if (score >= 60) return 'bg-emerald-50 dark:bg-emerald-900/20';
  if (score >= 40) return 'bg-blue-50 dark:bg-blue-900/20';
  if (score >= 20) return 'bg-orange-50 dark:bg-orange-900/20';
  return 'bg-red-50 dark:bg-red-900/20';
}
