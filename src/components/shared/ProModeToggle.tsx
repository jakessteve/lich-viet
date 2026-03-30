// ══════════════════════════════════════════════════════════
// ProModeToggle — Elite-only toggle for raw data grids
// ══════════════════════════════════════════════════════════
// Shows a toggle switch that lets Elite users flip between
// "Takeaway" (interpreted summaries) and "Pro Mode" (raw data).
// For non-Elite users, tapping the toggle shows an upgrade CTA.

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useUserTier } from '../../hooks/useUserTier';

interface ProModeToggleProps {
    /** Controlled state: whether Pro Mode is currently active */
    isProMode: boolean;
    /** Callback when Pro Mode changes (only fires for Elite users) */
    onToggle: (proMode: boolean) => void;
    /** Optional label override */
    label?: string;
    /** Optional classname for outer container */
    className?: string;
}

/**
 * A premium toggle that gates raw data grid visibility behind Elite tier.
 * - Elite users: toggle freely between Takeaway and Pro Mode.
 * - Non-Elite users: see a locked state with upgrade nudge tooltip.
 */
function ProModeToggle({
    isProMode,
    onToggle,
    label = 'Pro Mode',
    className = '',
}: ProModeToggleProps) {
    const { hasAccess } = useUserTier();
    const isElite = hasAccess('elite');
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    // Clean up tooltip timer on unmount
    useEffect(() => () => {
        if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
    }, []);

    const handleClick = useCallback(() => {
        if (isElite) {
            onToggle(!isProMode);
        } else {
            setShowTooltip(true);
            if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
            tooltipTimerRef.current = setTimeout(() => setShowTooltip(false), 3000);
        }
    }, [isElite, isProMode, onToggle]);

    return (
        <div className={`relative inline-flex items-center ${className}`}>
            <button
                type="button"
                onClick={handleClick}
                className={`
                    flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold
                    border transition-all duration-200
                    ${isProMode && isElite
                        ? 'bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 border-amber-500/25 dark:border-amber-400/25 hover:bg-amber-500/20 dark:hover:bg-amber-400/20'
                        : 'bg-gray-500/10 dark:bg-gray-400/10 text-text-secondary-light dark:text-text-secondary-dark border-gray-500/25 dark:border-gray-400/25 hover:bg-gray-500/20 dark:hover:bg-gray-400/20'}
                    ${!isElite ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
                `}
            >
                {isElite ? (
                    <span className="material-icons-round text-sm" aria-hidden="true">
                        {isProMode ? 'data_object' : 'auto_awesome'}
                    </span>
                ) : (
                    <span className="material-icons-round text-sm opacity-70" aria-hidden="true">lock</span>
                )}
                <span>
                    {label}
                    {!isElite && (
                        <span className="ml-1 text-[10px] font-normal opacity-60">
                            (Elite)
                        </span>
                    )}
                </span>
            </button>

            {/* Upgrade tooltip for non-Elite */}
            {showTooltip && !isElite && (
                <div className="absolute left-0 top-full mt-2 z-50 w-56 rounded-xl border border-amber-200/50 dark:border-amber-700/30 bg-white dark:bg-gray-800 shadow-xl shadow-amber-500/10 p-3 animate-fade-scale">
                    <div className="flex items-start gap-2">
                        <span className="material-icons-round text-amber-500 text-base mt-0.5 shrink-0" aria-hidden="true">workspace_premium</span>
                        <div>
                            <p className="text-xs font-semibold text-gray-900 dark:text-white">Nâng cấp Elite</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                Mở khóa Lưới dữ liệu gốc, Bản đồ SVG và Xuất PDF chuyên gia.
                            </p>
                            <a
                                href="/app/nang-cap"
                                className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                            >
                                Xem gói Elite
                                <span className="material-icons-round text-sm" aria-hidden="true">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default React.memo(ProModeToggle);
