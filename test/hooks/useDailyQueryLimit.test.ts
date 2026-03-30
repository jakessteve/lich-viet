import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useDailyQueryLimit, MAX_DAILY_QUERIES } from '../../src/hooks/useDailyQueryLimit';

describe('useDailyQueryLimit', () => {
    beforeEach(() => {
        useDailyQueryLimit.setState({
            queriesUsedToday: 0,
            lastResetDate: '2026-03-28',
            isLimitReached: false,
            queriesRemaining: MAX_DAILY_QUERIES
        });
        localStorage.clear();
        vi.useFakeTimers();
        // Sets time to 12:00 UTC, which is 19:00 locally, to cleanly avoid any timezone rollover weirdness 
        vi.setSystemTime(new Date(2026, 2, 28, 12, 0, 0));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('initializes correctly', () => {
        const state = useDailyQueryLimit.getState();
        expect(state.queriesRemaining).toBe(MAX_DAILY_QUERIES);
        expect(state.queriesUsedToday).toBe(0);
    });

    it('records query correctly', () => {
        const success = useDailyQueryLimit.getState().recordQuery();
        expect(success).toBe(true);
        expect(useDailyQueryLimit.getState().queriesUsedToday).toBe(1);
        expect(useDailyQueryLimit.getState().queriesRemaining).toBe(MAX_DAILY_QUERIES - 1);
        expect(useDailyQueryLimit.getState().isLimitReached).toBe(false);
    });

    it('hits limit when MAX is reached', () => {
        useDailyQueryLimit.setState({ queriesUsedToday: MAX_DAILY_QUERIES - 1, queriesRemaining: 1, isLimitReached: false });
        
        const success = useDailyQueryLimit.getState().recordQuery();
        expect(success).toBe(true);
        expect(useDailyQueryLimit.getState().queriesRemaining).toBe(0);
        expect(useDailyQueryLimit.getState().isLimitReached).toBe(true);
        
        const fail = useDailyQueryLimit.getState().recordQuery();
        expect(fail).toBe(false);
    });

    it('auto-resets on next day', () => {
        // yesterday's limits were maxed out
        useDailyQueryLimit.setState({ 
            lastResetDate: '2026-03-27', 
            queriesUsedToday: MAX_DAILY_QUERIES,
            queriesRemaining: 0,
            isLimitReached: true
        });

        const success = useDailyQueryLimit.getState().recordQuery();
        expect(success).toBe(true);
        
        const state = useDailyQueryLimit.getState();
        expect(state.queriesUsedToday).toBe(1);
        expect(state.queriesRemaining).toBe(MAX_DAILY_QUERIES - 1);
        
        const todayStr = new Date().toISOString().split('T')[0];
        
        expect(state.lastResetDate).toBe(todayStr); // should match whatever `today()` inside the hook evaluates to 
        expect(state.isLimitReached).toBe(false);
    });
});
