// ══════════════════════════════════════════════════════════
// useRateLimit — Client-side daily usage throttling
// ══════════════════════════════════════════════════════════
// Enforces per-feature daily usage limits for Free tier users.
// Data persisted in localStorage with calendar-day TTL.
// NOTE: This is a client-side UX guard, not a security measure.
// Server-side rate limiting must be the authoritative enforcement.

import { useState, useCallback, useMemo } from 'react';
import { useUserTier } from './useUserTier';

interface RateLimitConfig {
    /** Unique feature key (e.g., 'gieo-que') */
    featureKey: string;
    /** Max uses per calendar day for free users (default: 3) */
    dailyLimit?: number;
}

interface RateLimitInfo {
    /** Number of remaining uses today */
    remaining: number;
    /** Total daily limit */
    limit: number;
    /** How many times used today */
    used: number;
    /** Whether the user can perform the action */
    canUse: boolean;
    /** Record a usage (returns false if limit reached) */
    recordUsage: () => boolean;
    /** Reset the counter (for testing/admin) */
    resetCounter: () => void;
}

/** Storage key format: rl_<feature>_<YYYY-MM-DD> */
function getStorageKey(featureKey: string): string {
    const today = new Date().toISOString().slice(0, 10);
    return `rl_${featureKey}_${today}`;
}

/** Clean up old rate limit entries from localStorage */
function cleanupOldEntries(featureKey: string): void {
    const today = new Date().toISOString().slice(0, 10);
    const prefix = `rl_${featureKey}_`;
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(prefix) && !key.endsWith(today)) {
            keysToRemove.push(key);
        }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
}

function getUsageCount(featureKey: string): number {
    const key = getStorageKey(featureKey);
    const val = localStorage.getItem(key);
    return val ? parseInt(val, 10) || 0 : 0;
}

/**
 * Client-side rate limiter for Free tier features.
 *
 * Premium and Elite users are unlimited.
 * Free users are limited to `dailyLimit` uses per calendar day.
 */
export function useRateLimit({ featureKey, dailyLimit = 3 }: RateLimitConfig): RateLimitInfo {
    const { hasAccess } = useUserTier();
    const isPremiumOrAbove = hasAccess('premium');

    const [used, setUsed] = useState(() => {
        cleanupOldEntries(featureKey);
        return getUsageCount(featureKey);
    });

    const limit = isPremiumOrAbove ? Infinity : dailyLimit;
    const remaining = Math.max(0, limit - used);
    const canUse = isPremiumOrAbove || used < dailyLimit;

    const recordUsage = useCallback((): boolean => {
        if (isPremiumOrAbove) return true; // No limit for premium+

        const currentUsed = getUsageCount(featureKey);
        if (currentUsed >= dailyLimit) return false;

        const newCount = currentUsed + 1;
        localStorage.setItem(getStorageKey(featureKey), String(newCount));
        setUsed(newCount);
        return true;
    }, [featureKey, dailyLimit, isPremiumOrAbove]);

    const resetCounter = useCallback(() => {
        localStorage.removeItem(getStorageKey(featureKey));
        setUsed(0);
    }, [featureKey]);

    return useMemo(
        () => ({ remaining, limit, used, canUse, recordUsage, resetCounter }),
        [remaining, limit, used, canUse, recordUsage, resetCounter],
    );
}
