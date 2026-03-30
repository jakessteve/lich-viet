// ══════════════════════════════════════════════════════════
// CreditGate — Elite-tier credit-gated content wrapper
//
// Wraps any piece of content that costs 1 monthly credit to reveal.
// Shows a "Use 1 Credit" CTA if user hasn't yet consumed their credit
// for this section. Persists the reveal decision per session.
// ══════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { useCreditStore, MONTHLY_ELITE_CREDITS } from '../../stores/creditStore';
import { useUserTier } from '../../hooks/useUserTier';

interface CreditGateProps {
    /** Unique key to persist the "already revealed" state */
    gateId: string;
    /** Content to render once credit is consumed */
    children: React.ReactNode;
    /** Label for this gated section */
    sectionLabel?: string;
    /** Preview content to show behind blur (defaults to children) */
    previewContent?: React.ReactNode;
}

export function CreditGate({ gateId, children, sectionLabel, previewContent }: CreditGateProps) {
    const { hasAccess } = useUserTier();
    const { creditsRemaining, consumeCredit } = useCreditStore();
    // Per-session reveal state (resets on page refresh — intentional to limit "free peeks")
    const [revealed, setRevealed] = useState(false);

    // If not elite tier, don't render at all — ContentGate should handle tier gating first
    if (!hasAccess('elite')) return null;

    // Already revealed this session
    if (revealed) {
        return <>{children}</>;
    }

    const handleReveal = () => {
        const success = consumeCredit();
        if (success) setRevealed(true);
    };

    const hasCredits = creditsRemaining > 0;

    return (
        <div className="relative overflow-hidden rounded-2xl">
            {/* Blurred preview */}
            <div
                className="blur-[5px] select-none pointer-events-none max-h-[300px] overflow-hidden opacity-40"
                style={{
                    maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
                }}
                aria-hidden="true"
            >
                {previewContent ?? children}
            </div>

            {/* Credit CTA overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white/10 via-white/65 to-white/98 dark:from-gray-900/10 dark:via-gray-900/70 dark:to-gray-900/98 backdrop-blur-[2px] p-6">
                <div className="mx-auto max-w-xs rounded-2xl border border-violet-200/40 dark:border-violet-500/20 bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg p-5 text-center space-y-3">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-violet-200/60 dark:from-violet-800/30 dark:to-violet-700/20 ring-4 ring-violet-100/50 dark:ring-violet-800/20">
                        <span className="material-icons-round text-xl text-violet-600 dark:text-violet-400" aria-hidden="true">toll</span>
                    </div>

                    <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                            {sectionLabel ? `Luận giải cá nhân hóa — ${sectionLabel}` : 'Luận giải cá nhân hóa'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {hasCredits
                                ? `Còn ${creditsRemaining}/${MONTHLY_ELITE_CREDITS} credit tháng này`
                                : 'Đã dùng hết credit tháng này'}
                        </p>
                    </div>

                    {hasCredits ? (
                        <button
                            onClick={handleReveal}
                            id={`credit-gate-reveal-${gateId}`}
                            className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-500 to-violet-600 text-white text-sm font-semibold shadow-md shadow-violet-500/25 hover:shadow-lg hover:shadow-violet-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                        >
                            <span className="material-icons-round text-[18px]" aria-hidden="true">lock_open</span>
                            Dùng 1 credit để xem
                        </button>
                    ) : (
                        <a
                            href="/app/nang-cap"
                            className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                        >
                            <span className="material-icons-round text-[18px]" aria-hidden="true">add_circle</span>
                            Mua thêm credit
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
