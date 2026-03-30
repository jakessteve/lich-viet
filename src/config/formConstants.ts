/**
 * formConstants.ts — Shared form input class strings.
 *
 * Single source of truth for input/select styling across all engine pages.
 * Replaces per-file INPUT_CLASS/SELECT_CLASS local constants in:
 *   - BaziView.tsx (inline class strings)
 *   - NumerologyView.tsx (local INPUT_CLASS const)
 *   - baziConstants.ts (SELECT_CLASS const)
 *
 * Usage:
 *   import { INPUT_CLASS, SELECT_CLASS, INPUT_CENTER } from '@/config/formConstants';
 */

export const INPUT_CLASS =
  'w-full px-3 py-2.5 rounded-lg border border-border-light dark:border-border-dark ' +
  'bg-white dark:bg-gray-800 text-sm text-text-primary-light dark:text-text-primary-dark ' +
  'focus:ring-2 focus:ring-gold/30 dark:focus:ring-gold-dark/30 ' +
  'focus:border-gold dark:focus:border-gold-dark outline-none transition-all';

export const SELECT_CLASS = INPUT_CLASS;

export const INPUT_CENTER = INPUT_CLASS + ' text-center';

/** Section label style (gold numbered groups, as in BaziView) */
export const SECTION_LABEL_CLASS =
  'flex items-center gap-2 text-sm font-semibold tracking-wide text-gold dark:text-gold-dark';

/** Circle step number badge (as in BaziView numbered sections) */
export const SECTION_STEP_CLASS =
  'w-5 h-5 rounded-full bg-gold/10 dark:bg-gold-dark/10 ' +
  'flex items-center justify-center text-xs font-bold';

/** Standard form field label */
export const LABEL_CLASS =
  'block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1.5';
