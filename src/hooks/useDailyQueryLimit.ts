// ══════════════════════════════════════════════════════════
// useDailyQueryLimit — Tracks free-tier daily query cap
//
// Free-tier users can make up to MAX_DAILY_QUERIES per day.
// Counter resets at midnight local time.
//
// Storage: localStorage (persisted between sessions).
// ══════════════════════════════════════════════════════════

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/** Max queries per day for free/guest users */
export const MAX_DAILY_QUERIES = 5;

interface DailyQueryState {
    /** Number of queries consumed today */
    queriesUsedToday: number;
    /** ISO date string of the last reset (e.g. "2026-03-28") */
    lastResetDate: string;
    /** Whether the daily limit has been reached */
    isLimitReached: boolean;
    /** Queries remaining for today */
    queriesRemaining: number;
    /** Record a new query. Returns false if limit already reached. */
    recordQuery: () => boolean;
}

function today(): string {
    return new Date().toISOString().split('T')[0];
}

export const useDailyQueryLimit = create<DailyQueryState>()(
    persist(
        (set, get) => ({
            queriesUsedToday: 0,
            lastResetDate: today(),
            isLimitReached: false,
            queriesRemaining: MAX_DAILY_QUERIES,

            recordQuery: () => {
                const state = get();
                const todayStr = today();

                // Reset on new day
                if (state.lastResetDate !== todayStr) {
                    set({
                        queriesUsedToday: 1,
                        lastResetDate: todayStr,
                        isLimitReached: false,
                        queriesRemaining: MAX_DAILY_QUERIES - 1,
                    });
                    return true;
                }

                if (state.queriesUsedToday >= MAX_DAILY_QUERIES) return false;

                const next = state.queriesUsedToday + 1;
                set({
                    queriesUsedToday: next,
                    isLimitReached: next >= MAX_DAILY_QUERIES,
                    queriesRemaining: Math.max(0, MAX_DAILY_QUERIES - next),
                });
                return true;
            },
        }),
        {
            name: 'lv-daily-query-limit',
            onRehydrateStorage: () => (state) => {
                if (state && state.lastResetDate !== today()) {
                    state.queriesUsedToday = 0;
                    state.lastResetDate = today();
                    state.isLimitReached = false;
                    state.queriesRemaining = MAX_DAILY_QUERIES;
                }
            },
        },
    ),
);
