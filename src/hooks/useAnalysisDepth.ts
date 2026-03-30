/**
 * useAnalysisDepth — Reads the user's analysis depth preference from localStorage.
 *
 * Depth levels:
 *  - 'summary'  → compact, key takeaways only; advanced sections collapsed
 *  - 'detailed' → default; balanced depth with optional expandable sections
 *  - 'academic' → all sections expanded, maximum detail shown
 *
 * Preference is set in SettingsPage and stored under the 'analysisDepth' key.
 */

import { useMemo } from 'react';

export type AnalysisDepth = 'summary' | 'detailed' | 'academic';

const DEPTH_KEY = 'analysisDepth';
const DEFAULT_DEPTH: AnalysisDepth = 'detailed';

/** Returns the current depth and derived helper flags */
export function useAnalysisDepth() {
  return useMemo(() => {
    const raw = localStorage.getItem(DEPTH_KEY) as AnalysisDepth | null;
    const depth: AnalysisDepth =
      raw === 'summary' || raw === 'detailed' || raw === 'academic' ? raw : DEFAULT_DEPTH;

    return {
      depth,
      /** Whether all sections should be collapsed by default (summary mode) */
      compact: depth === 'summary',
      /** Whether all advanced sections should be expanded by default (academic mode) */
      expanded: depth === 'academic',
      /**
       * Returns the appropriate `defaultOpen` value for a CollapsibleCard
       * based on its priority level.
       *   - 'high'   → open in all modes
       *   - 'normal' → open in 'detailed' and 'academic' modes
       *   - 'low'    → open only in 'academic' mode
       */
      defaultOpen: (priority: 'high' | 'normal' | 'low' = 'normal'): boolean => {
        if (depth === 'summary') return priority === 'high';
        if (depth === 'detailed') return priority !== 'low';
        return true; // academic: all open
      },
    };
  }, []);
}
