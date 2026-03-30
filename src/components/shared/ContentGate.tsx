// ══════════════════════════════════════════════════════════
// ContentGate — Tier-aware content wrapper with blur preview
// ══════════════════════════════════════════════════════════
// Renders children if user meets the required tier, otherwise
// shows blurred preview of content + CTA banner with feature list.

import React from 'react';
import { useUserTier } from '../../hooks/useUserTier';
import type { UserTier } from '../../types/auth';

export type { ContentDepth } from '../../hooks/useUserTier';

interface ContentGateProps {
    /** Minimum tier required to see the content */
    requiredTier: UserTier;
    /** Content to render when user has access */
    children: React.ReactNode;
    /** Custom fallback instead of default CTA */
    fallback?: React.ReactNode;
    /** Section title for the default CTA message */
    sectionTitle?: string;
    /** Show a blurred preview of the actual content behind the gate */
    showBlurPreview?: boolean;
    /** Content to show as the blurred preview (defaults to children) */
    previewContent?: React.ReactNode;
    /** If true, shows CreditCTA (for elite users who've exhausted monthly credits) */
    creditGate?: boolean;
    /** Remaining credits for credit-gated sections */
    creditsRemaining?: number;
    /** If true, shows DailyQueryLimitCTA (free tier daily query limit reached) */
    dailyLimitGate?: boolean;
}

/** Tier labels in Vietnamese */
const TIER_LABELS: Record<UserTier, string> = {
    guest: 'Khách',
    free: 'Miễn phí',
    premium: 'Premium',
    elite: 'Elite',
};

/** Features for register CTA */
const REGISTER_FEATURES = [
    'Phân tích tính cách chi tiết',
    'Lá số Tử Vi 12 cung',
    'Bản đồ sao Chiêm Tinh',
    'Luận giải cơ bản miễn phí',
];

/** Features for upgrade CTA */
const UPGRADE_FEATURES = [
    'Đại Hạn 10 năm chi tiết',
    'Lưu Niên hàng năm',
    'PDF báo cáo 60-70 trang',
    'Mọi tính năng không giới hạn',
];

/** Default CTA for guests (need to register) */
function RegisterCTA({ sectionTitle }: { sectionTitle?: string }) {
    return (
        <div className="mx-auto max-w-sm rounded-2xl border border-amber-200/40 dark:border-amber-500/15 bg-gradient-to-br from-amber-50/90 via-white/80 to-amber-50/70 dark:from-amber-950/20 dark:via-gray-900/60 dark:to-amber-950/15 backdrop-blur-xl shadow-lg shadow-amber-500/5 dark:shadow-black/20 p-6 text-center">
            {/* Icon Badge */}
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-200/60 dark:from-amber-800/30 dark:to-amber-700/20 ring-4 ring-amber-100/50 dark:ring-amber-800/20">
                <span className="material-icons-round text-2xl text-amber-600 dark:text-amber-400" aria-hidden="true">lock</span>
            </div>

            {/* Heading */}
            <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug mb-1">
                {sectionTitle ? `Đăng ký để xem ${sectionTitle}` : 'Đăng ký miễn phí để xem nội dung'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Tạo tài khoản để mở khóa luận giải chi tiết</p>

            {/* Gold Divider */}
            <div className="mx-auto mb-4 h-px w-12 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent dark:via-amber-500/30" />

            {/* Feature list */}
            <ul className="mb-5 space-y-2 text-left max-w-[240px] mx-auto">
                {REGISTER_FEATURES.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                        <span className="material-icons-round text-[18px] text-amber-500 dark:text-amber-400 flex-shrink-0" aria-hidden="true">check_circle</span>
                        <span>{f}</span>
                    </li>
                ))}
            </ul>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <a
                    href="/app/dang-ky"
                    className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-semibold shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                >
                    <span className="material-icons-round text-[18px]" aria-hidden="true">person_add</span>
                    Đăng Ký Ngay
                </a>
                <a
                    href="/app/dang-nhap"
                    className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-5 py-2.5 rounded-full border border-amber-300/40 dark:border-amber-600/25 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-white/5 hover:bg-amber-50 dark:hover:bg-amber-900/15 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                >
                    <span className="material-icons-round text-[18px]" aria-hidden="true">login</span>
                    Đăng Nhập
                </a>
            </div>
        </div>
    );
}

/** Default CTA for free users (need to upgrade) */
function UpgradeCTA({ sectionTitle }: { sectionTitle?: string }) {
    return (
        <div className="mx-auto max-w-sm rounded-2xl border border-amber-200/40 dark:border-amber-500/15 bg-gradient-to-br from-amber-50/90 via-white/80 to-amber-50/70 dark:from-amber-950/20 dark:via-gray-900/60 dark:to-amber-950/15 backdrop-blur-xl shadow-lg shadow-amber-500/5 dark:shadow-black/20 p-6 text-center">
            {/* Icon Badge */}
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-yellow-300/60 dark:from-amber-700/30 dark:to-yellow-600/20 ring-4 ring-amber-200/50 dark:ring-amber-700/20">
                <span className="material-icons-round text-2xl text-amber-700 dark:text-amber-300" aria-hidden="true">workspace_premium</span>
            </div>

            {/* Heading */}
            <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug mb-1">
                Nâng cấp Premium{sectionTitle ? ` để xem ${sectionTitle}` : ''}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Mở khóa toàn bộ luận giải chi tiết và tải PDF</p>

            {/* Gold Divider */}
            <div className="mx-auto mb-4 h-px w-12 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent dark:via-amber-500/30" />

            {/* Feature list */}
            <ul className="mb-5 space-y-2 text-left max-w-[240px] mx-auto">
                {UPGRADE_FEATURES.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                        <span className="material-icons-round text-[18px] text-amber-500 dark:text-amber-400 flex-shrink-0" aria-hidden="true">check_circle</span>
                        <span>{f}</span>
                    </li>
                ))}
            </ul>

            {/* Action button */}
            <div className="flex items-center justify-center">
                <a
                    href="/app/nang-cap"
                    className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-semibold shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                >
                    <span className="material-icons-round text-[18px]" aria-hidden="true">star</span>
                    Xem gói Premium
                </a>
            </div>
        </div>
    );
}

/** CTA for elite users who have exhausted monthly personalized credits */
function CreditCTA({ creditsRemaining = 0 }: { creditsRemaining?: number }) {
    return (
        <div className="mx-auto max-w-sm rounded-2xl border border-violet-200/40 dark:border-violet-500/15 bg-gradient-to-br from-violet-50/90 via-white/80 to-violet-50/70 dark:from-violet-950/20 dark:via-gray-900/60 dark:to-violet-950/15 backdrop-blur-xl shadow-lg p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-violet-200/60 dark:from-violet-800/30 dark:to-violet-700/20 ring-4 ring-violet-100/50 dark:ring-violet-800/20">
                <span className="material-icons-round text-2xl text-violet-600 dark:text-violet-400" aria-hidden="true">toll</span>
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug mb-1">
                {creditsRemaining > 0 ? `Còn ${creditsRemaining} lần xem cá nhân hóa` : 'Đã dùng hết credit tháng này'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {creditsRemaining > 0
                    ? 'Nhấn để sử dụng 1 credit xem luận giải cá nhân hóa'
                    : 'Credit xem cá nhân hóa sẽ được nạp lại vào đầu tháng sau'}
            </p>
            {creditsRemaining === 0 && (
                <a
                    href="/app/nang-cap"
                    className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-500 to-violet-600 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                    <span className="material-icons-round text-[18px]" aria-hidden="true">add_circle</span>
                    Mua thêm credit
                </a>
            )}
        </div>
    );
}

/** CTA for free users who've hit the daily query limit */
function DailyQueryLimitCTA() {
    return (
        <div className="mx-auto max-w-sm rounded-2xl border border-blue-200/40 dark:border-blue-500/15 bg-gradient-to-br from-blue-50/90 via-white/80 to-blue-50/70 dark:from-blue-950/20 dark:via-gray-900/60 dark:to-blue-950/15 backdrop-blur-xl shadow-lg p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200/60 dark:from-blue-800/30 dark:to-blue-700/20 ring-4 ring-blue-100/50 dark:ring-blue-800/20">
                <span className="material-icons-round text-2xl text-blue-600 dark:text-blue-400" aria-hidden="true">hourglass_empty</span>
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug mb-1">Đã đạt giới hạn hôm nay</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Tài khoản miễn phí giới hạn 5 lượt xem/ngày. Nâng cấp để xem không giới hạn.</p>
            <a
                href="/app/nang-cap"
                className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
                <span className="material-icons-round text-[18px]" aria-hidden="true">star</span>
                Nâng cấp Premium
            </a>
        </div>
    );
}

export function ContentGate({
    requiredTier,
    children,
    fallback,
    sectionTitle,
    showBlurPreview = false,
    previewContent,
    creditGate = false,
    creditsRemaining = 0,
    dailyLimitGate = false,
}: ContentGateProps) {
    const { hasAccess, isTier } = useUserTier();

    // Credit gate: elite user who's exhausted monthly personalized views
    if (creditGate) {
        return <CreditCTA creditsRemaining={creditsRemaining} /> as React.JSX.Element;
    }

    // Daily limit gate: free user who's hit today's query cap
    if (dailyLimitGate) {
        return <DailyQueryLimitCTA /> as React.JSX.Element;
    }

    // User has required access — render children normally
    if (hasAccess(requiredTier)) {
        return children as React.JSX.Element;
    }

    // No access — show CTA (with optional blur preview)
    const ctaContent = fallback ?? (
        isTier('guest') ? <RegisterCTA sectionTitle={sectionTitle} /> : <UpgradeCTA sectionTitle={sectionTitle} />
    );

    if (showBlurPreview) {
        return (
            <div className="relative overflow-hidden rounded-xl min-h-[420px]">
                {/* Blurred content preview */}
                <div
                    className="blur-[6px] select-none pointer-events-none max-h-[400px] overflow-hidden opacity-50"
                    style={{ maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)' }}
                    aria-hidden="true"
                >
                    {previewContent ?? children}
                </div>
                {/* Overlay with CTA */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white/10 via-white/60 to-white/95 dark:from-gray-900/10 dark:via-gray-900/65 dark:to-gray-900/95 backdrop-blur-[2px] p-6">
                    {ctaContent}
                </div>
            </div>
        );
    }

    return ctaContent as React.JSX.Element;
}

export { RegisterCTA, UpgradeCTA, TIER_LABELS };
