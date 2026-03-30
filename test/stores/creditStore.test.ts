import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useCreditStore, MONTHLY_ELITE_CREDITS } from '../../src/stores/creditStore';

describe('useCreditStore', () => {
    beforeEach(() => {
        // Reset state before each test
        useCreditStore.setState({ creditsRemaining: MONTHLY_ELITE_CREDITS, lastResetMonth: '2026-03' });
        localStorage.clear();
        vi.useFakeTimers();
        // mock system time to a known "now"
        vi.setSystemTime(new Date(2026, 2, 15)); // March 15, 2026
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('initializes with full credits', () => {
        const state = useCreditStore.getState();
        expect(state.creditsRemaining).toBe(MONTHLY_ELITE_CREDITS);
        expect(state.lastResetMonth).toBe('2026-03');
    });

    it('consumes credits successfully', () => {
        const success = useCreditStore.getState().consumeCredit();
        expect(success).toBe(true);
        expect(useCreditStore.getState().creditsRemaining).toBe(MONTHLY_ELITE_CREDITS - 1);
    });

    it('fails to consume when out of credits', () => {
        useCreditStore.setState({ creditsRemaining: 0, lastResetMonth: '2026-03' });
        const success = useCreditStore.getState().consumeCredit();
        expect(success).toBe(false);
        expect(useCreditStore.getState().creditsRemaining).toBe(0);
    });

    it('auto-resets at rollover to new month', () => {
        useCreditStore.setState({ creditsRemaining: 0, lastResetMonth: '2026-02' });
        
        // system time is March 2026, which is > Feb 2026
        const success = useCreditStore.getState().consumeCredit();
        
        // it should reset to initial, then consume 1
        expect(success).toBe(true);
        expect(useCreditStore.getState().creditsRemaining).toBe(MONTHLY_ELITE_CREDITS - 1);
        expect(useCreditStore.getState().lastResetMonth).toBe('2026-03');
    });

    it('can be manually reset', () => {
        useCreditStore.setState({ creditsRemaining: 5 });
        useCreditStore.getState().resetCredits();
        expect(useCreditStore.getState().creditsRemaining).toBe(MONTHLY_ELITE_CREDITS);
        expect(useCreditStore.getState().lastResetMonth).toBe('2026-03');
    });
});
