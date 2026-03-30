// ══════════════════════════════════════════════════════════
// creditStore — Zustand store for monthly personalized view credits
//
// Business model: Elite tier gets N personalized-analysis credits/month.
// Each "credit-gated" section costs 1 credit to reveal.
// Credits reset at the start of each calendar month.
//
// Storage: localStorage (persisted between sessions).
// ══════════════════════════════════════════════════════════

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/** Number of personalized credits granted to elite users per month */
export const MONTHLY_ELITE_CREDITS = 15;

interface CreditState {
    /** Remaining personalized credits for the current month */
    creditsRemaining: number;
    /** ISO month string when credits were last reset (e.g. "2026-03") */
    lastResetMonth: string;
    /** Consume 1 credit. Returns false if no credits remaining. */
    consumeCredit: () => boolean;
    /** Manually reset credits (e.g. after upgrade or for testing) */
    resetCredits: () => void;
}

function currentMonth(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

export const useCreditStore = create<CreditState>()(
    persist(
        (set, get) => ({
            creditsRemaining: MONTHLY_ELITE_CREDITS,
            lastResetMonth: currentMonth(),

            consumeCredit: () => {
                const state = get();
                const thisMonth = currentMonth();

                // Auto-reset if new month
                if (state.lastResetMonth !== thisMonth) {
                    set({ creditsRemaining: MONTHLY_ELITE_CREDITS, lastResetMonth: thisMonth });
                    // Consume 1 from fresh allowance
                    set((s) => ({ creditsRemaining: s.creditsRemaining - 1 }));
                    return true;
                }

                if (state.creditsRemaining <= 0) return false;

                set((s) => ({ creditsRemaining: s.creditsRemaining - 1 }));
                return true;
            },

            resetCredits: () => {
                set({ creditsRemaining: MONTHLY_ELITE_CREDITS, lastResetMonth: currentMonth() });
            },
        }),
        {
            name: 'lv-credit-store',
            // Hydrate-check on mount: reset if month has rolled over
            onRehydrateStorage: () => (state) => {
                if (state && state.lastResetMonth !== currentMonth()) {
                    state.creditsRemaining = MONTHLY_ELITE_CREDITS;
                    state.lastResetMonth = currentMonth();
                }
            },
        },
    ),
);
