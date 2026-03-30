// ══════════════════════════════════════════════════════════
// useUserTier — Derives effective user tier from auth state
//
// 3-Tier Good-Better-Best model:
//   guest (0)  → free (1) → premium (2) → elite (3)
// ══════════════════════════════════════════════════════════

import { useMemo } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useAppStore } from '../stores/appStore';
import type { UserTier } from '../types/auth';

/** Tier hierarchy for comparison (higher number = more access) */
const TIER_LEVELS: Record<UserTier, number> = {
    guest: 0,
    free: 1,
    premium: 2,
    elite: 3,
};

export type ContentDepth = 'summary' | 'standard' | 'full';

export interface UserTierInfo {
    /** Current effective tier */
    tier: UserTier;
    /** Numeric level for easy comparison */
    level: number;
    /** Days remaining for promo-granted premium (undefined if not applicable) */
    daysRemaining?: number;
    /** Whether user has at least the given tier */
    hasAccess: (requiredTier: UserTier) => boolean;
    /** Whether the current tier is exactly the given tier */
    isTier: (t: UserTier) => boolean;
    /**
     * Returns the content depth for a given section.
     * - guest / free    → 'summary'   (score only, no interpretation)
     * - premium         → 'standard'  (interpretation without personalized data)
     * - elite           → 'full'      (full personalized interpretation + credit-gated extras)
     */
    getContentDepth: () => ContentDepth;
}

/**
 * Computes the user's effective access tier from auth state + promo redemptions.
 *
 * Tier resolution:
 * - Not authenticated → 'guest'
 * - Admin or demo isPremium flag → 'elite' (full access for dev/testing)
 * - Has unexpired free_premium promo → 'premium' (Takeaway-level access)
 * - Authenticated, no promo/flag → 'free'
 */
export function useUserTier(): UserTierInfo {
    const user = useAuthStore((s) => s.user);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const isPremium = useAppStore((s) => s.isPremium);

    return useMemo(() => {
        // Helper to build return object
        const build = (tier: UserTier, daysRemaining?: number): UserTierInfo => ({
            tier,
            level: TIER_LEVELS[tier],
            daysRemaining,
            hasAccess: (req: UserTier) => TIER_LEVELS[tier] >= TIER_LEVELS[req],
            isTier: (t: UserTier) => t === tier,
            getContentDepth: (): ContentDepth => {
                if (TIER_LEVELS[tier] >= TIER_LEVELS['elite']) return 'full';
                if (TIER_LEVELS[tier] >= TIER_LEVELS['premium']) return 'standard';
                return 'summary';
            },
        });

        // Guest: not logged in
        if (!isAuthenticated || !user) {
            return build('guest');
        }

        // Admin or Demo Premium toggle → full elite access
        if (user.id === 'admin-001' || isPremium) {
            return build('elite');
        }

        // Check for active free_premium promo → premium tier
        const now = new Date();
        const activePromo = user.promoRedemptions?.find((r) => {
            if (r.type !== 'free_premium') return false;
            if (!r.expiresAt) return false;
            return new Date(r.expiresAt) > now;
        });

        if (activePromo?.expiresAt) {
            const expiry = new Date(activePromo.expiresAt);
            const daysRemaining = Math.max(0, Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
            return build('premium', daysRemaining);
        }

        // Default: authenticated but no premium access
        return build('free');
    }, [user, isAuthenticated, isPremium]);
}

export { TIER_LEVELS };
