import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useUserTier } from '@/hooks/useUserTier';
import PromotionCodeInput from '../auth/PromotionCodeInput';
import { analytics } from '../../services/analyticsService';
import { MONTHLY_ELITE_CREDITS } from '../../stores/creditStore';
import { CreditRefreshBanner } from '../shared/CreditRefreshBanner';

// ================================================================
// UpgradePage - Pricing tier comparison and promo code entry
// ================================================================

const TIERS = [
    {
        name: 'Mi\u1ec5n ph\u00ed',
        icon: '\uD83C\uDF19',
        color: 'emerald',
        badge: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/20',
        price: '0\u20ab',
        priceSuffix: 'm\u00e3i m\u00e3i',
        desc: 'Truy c\u1eadp ngay, kh\u00f4ng c\u1ea7n \u0111\u0103ng k\u00fd \u00b7 5 tra c\u1ee9u/ng\u00e0y',
        features: [
            { text: '\u00c2m L\u1ecbch & Gi\u1edd t\u1ed1t/x\u1ea5u', included: true },
            { text: 'L\u1ecbch D\u1ee5ng S\u1ef1 (64+ vi\u1ec7c)', included: true },
            { text: 'Gieo Qu\u1ebb Mai Hoa D\u1ecbch S\u1ed1', included: true },
            { text: 'L\u1eadp l\u00e1 s\u1ed1 T\u1eed Vi (xem c\u01a1 b\u1ea3n)', included: true },
            { text: 'L\u1eadp b\u1ea3n \u0111\u1ed3 Chi\u00eam Tinh (xem c\u01a1 b\u1ea3n)', included: true },
            { text: 'Ph\u00e2n t\u00edch Th\u1ea7n S\u1ed1 H\u1ecdc (c\u01a1 b\u1ea3n)', included: true },
            { text: 'Lu\u1eadn gi\u1ea3i chuy\u00ean s\u00e2u t\u1ea5t c\u1ea3 tab', included: false },
            { text: '\u0110\u1ea1i H\u1ea1n & L\u01b0u Ni\u00ean chi ti\u1ebft', included: false },
            { text: 'T\u1ea3i PDF b\u00e1o c\u00e1o \u0111\u1ea7y \u0111\u1ee7', included: false },
        ],
    },
    {
        name: 'D\u00f9ng th\u1eed',
        icon: '\u2726',
        color: 'blue',
        badge: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20',
        price: '49.000\u20ab',
        priceSuffix: '/th\u00e1ng',
        desc: 'D\u00f9ng m\u00e3 khuy\u1ebfn m\u00e3i \u2014 tr\u1ea3i nghi\u1ec7m 14 ng\u00e0y',
        features: [
            { text: 'T\u1ea5t c\u1ea3 t\u00ednh n\u0103ng Mi\u1ec5n ph\u00ed', included: true },
            { text: 'Lu\u1eadn gi\u1ea3i chuy\u00ean s\u00e2u t\u1ea5t c\u1ea3 tab', included: true },
            { text: '\u0110\u1ea1i H\u1ea1n & L\u01b0u Ni\u00ean chi ti\u1ebft', included: true },
            { text: 'T\u1ea3i PDF b\u00e1o c\u00e1o (~30 trang)', included: true },
            { text: 'Th\u1eddi h\u1ea1n 14 ng\u00e0y', included: 'note' as const },
        ],
    },
    {
        name: '\u0110\u1ea7y \u0111\u1ee7',
        icon: '\u2605',
        color: 'gold',
        badge: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/20',
        price: '99.000\u20ab',
        priceSuffix: 'tr\u1ecdn \u0111\u1eddi',
        desc: `Ti\u1ebft ki\u1ec7m nh\u1ea5t \u2014 m\u1edf kh\u00f3a v\u0129nh vi\u1ec5n \u00b7 ${MONTHLY_ELITE_CREDITS} credit c\u00e1 nh\u00e2n h\u00f3a/th\u00e1ng`,
        features: [
            { text: 'T\u1ea5t c\u1ea3 t\u00ednh n\u0103ng Mi\u1ec5n ph\u00ed + D\u00f9ng th\u1eed', included: true },
            { text: 'Lu\u1eadn gi\u1ea3i chuy\u00ean s\u00e2u kh\u00f4ng gi\u1edbi h\u1ea1n', included: true },
            { text: `${MONTHLY_ELITE_CREDITS} credit c\u00e1 nh\u00e2n h\u00f3a m\u1ed7i th\u00e1ng`, included: true },
            { text: 'PDF b\u00e1o c\u00e1o \u0111\u1ea7y \u0111\u1ee7 (60-70 trang)', included: true },
            { text: 'M\u1ecdi t\u00ednh n\u0103ng trong t\u01b0\u01a1ng lai', included: true },
            { text: 'Truy c\u1eadp v\u0129nh vi\u1ec5n', included: true },
        ],
    },
];

const FAQ_ITEMS = [
    { q: 'T\u00f4i c\u00f3 th\u1ec3 d\u00f9ng th\u1eed mi\u1ec5n ph\u00ed kh\u00f4ng?', a: 'C\u00f3! Nh\u1eadp m\u00e3 khuy\u1ebfn m\u00e3i \u0111\u1ec3 tr\u1ea3i nghi\u1ec7m to\u00e0n b\u1ed9 t\u00ednh n\u0103ng trong 14 ng\u00e0y ho\u00e0n to\u00e0n mi\u1ec5n ph\u00ed.' },
    { q: 'Ph\u01b0\u01a1ng th\u1ee9c thanh to\u00e1n n\u00e0o \u0111\u01b0\u1ee3c h\u1ed7 tr\u1ee3?', a: 'Ch\u00fang t\u00f4i h\u1ed7 tr\u1ee3 chuy\u1ec3n kho\u1ea3n ng\u00e2n h\u00e0ng, Momo, ZaloPay v\u00e0 th\u1ebb Visa/Mastercard.' },
    { q: 'G\u00f3i "\u0110\u1ea7y \u0111\u1ee7" bao g\u1ed3m nh\u1eefng g\u00ec?', a: `Truy c\u1eadp v\u0129nh vi\u1ec5n t\u1ea5t c\u1ea3 t\u00ednh n\u0103ng hi\u1ec7n t\u1ea1i v\u00e0 t\u01b0\u01a1ng lai, bao g\u1ed3m lu\u1eadn gi\u1ea3i chuy\u00ean s\u00e2u, \u0110\u1ea1i H\u1ea1n & L\u01b0u Ni\u00ean, PDF b\u00e1o c\u00e1o 60-70 trang, v\u00e0 ${MONTHLY_ELITE_CREDITS} credit c\u00e1 nh\u00e2n h\u00f3a m\u1ed7i th\u00e1ng.` },
    { q: 'Credit c\u00e1 nh\u00e2n h\u00f3a l\u00e0 g\u00ec?', a: `G\u00f3i \u0110\u1ea7y \u0111\u1ee7 \u0111\u01b0\u1ee3c c\u1ea5p ${MONTHLY_ELITE_CREDITS} credit m\u1ed7i th\u00e1ng \u0111\u1ec3 m\u1edf kh\u00f3a lu\u1eadn gi\u1ea3i c\u00e1 nh\u00e2n h\u00f3a chuy\u00ean s\u00e2u \u2014 ph\u00e2n t\u00edch ri\u00eang d\u1ef1a tr\u00ean l\u00e1 s\u1ed1 c\u1ee7a b\u1ea1n. Credit l\u00e0m m\u1edbi v\u00e0o ng\u00e0y 1 m\u1ed7i th\u00e1ng.` },
    { q: 'T\u00f4i c\u00f3 th\u1ec3 ho\u00e0n ti\u1ec1n kh\u00f4ng?', a: 'C\u00f3, ch\u00fang t\u00f4i cam k\u1ebft ho\u00e0n ti\u1ec1n 100% trong 7 ng\u00e0y \u0111\u1ea7u n\u1ebfu b\u1ea1n kh\u00f4ng h\u00e0i l\u00f2ng.' },
    { q: 'D\u1eef li\u1ec7u c\u1ee7a t\u00f4i c\u00f3 an to\u00e0n kh\u00f4ng?', a: 'M\u1ecdi t\u00ednh to\u00e1n ch\u1ea1y tr\u00ean tr\u00ecnh duy\u1ec7t c\u1ee7a b\u1ea1n. Ch\u00fang t\u00f4i kh\u00f4ng thu th\u1eadp hay l\u01b0u tr\u1eef d\u1eef li\u1ec7u c\u00e1 nh\u00e2n tr\u00ean m\u00e1y ch\u1ee7.' },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="glass-card overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-white/3 transition-colors"
            >
                <span className="text-sm font-medium pr-4">{question}</span>
                <span className={`material-icons-round text-base text-text-secondary-light/50 dark:text-text-secondary-dark/40 transition-transform duration-200 shrink-0 ${open ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            {open && (
                <div className="px-4 pb-3 text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed animate-fade-in-up">
                    {answer}
                </div>
            )}
        </div>
    );
}

export default function UpgradePage() {
    usePageTitle('N\u00e2ng c\u1ea5p Premium');
    const navigate = useNavigate();
    const { tier: currentTier } = useUserTier();

    const handleTierInteract = (tierName: string) => {
        analytics.trackEvent({
            name: 'button_click',
            properties: { action: `explored_tier_${tierName}`, category: 'engagement' }
        });
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 animate-fade-in-up">
            {/* Header */}
            <div className="text-center mb-10">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gold/15 to-amber-600/10 dark:from-gold-dark/12 dark:to-amber-500/8 flex items-center justify-center">
                    <span className="material-icons-round text-3xl text-gold dark:text-gold-dark">workspace_premium</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Ch\u1ecdn g\u00f3i ph\u00f9 h\u1ee3p v\u1edbi b\u1ea1n</h1>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark max-w-md mx-auto">
                    Nhi\u1ec1u t\u00ednh n\u0103ng ho\u00e0n to\u00e0n mi\u1ec5n ph\u00ed. N\u00e2ng c\u1ea5p khi b\u1ea1n c\u1ea7n ph\u00e2n t\u00edch chuy\u00ean s\u00e2u.
                </p>
                {currentTier !== 'guest' && (
                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/8 dark:bg-gold-dark/6 border border-gold/15 dark:border-gold-dark/12">
                        <span className="text-xs font-medium text-gold dark:text-gold-dark">
                            Goi hi\u1ec7n t\u1ea1i: {currentTier === 'elite' ? '\u2605 \u0110\u1ea7y \u0111\u1ee7' : currentTier === 'premium' ? '\u2726 D\u00f9ng th\u1eed' : 'Mi\u1ec5n ph\u00ed'}
                        </span>
                    </div>
                )}
            </div>

            {/* Tier Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                {TIERS.map((tier) => (
                    <div
                        key={tier.name}
                        onClick={() => handleTierInteract(tier.name)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && handleTierInteract(tier.name)}
                        className={`glass-card glass-noise p-6 flex flex-col cursor-pointer transition-transform duration-200 hover:-translate-y-1 ${tier.color === 'gold' ? 'ring-2 ring-gold/30 dark:ring-gold-dark/20' : ''
                            }`}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xl">{tier.icon}</span>
                            <h3 className="text-lg font-bold">{tier.name}</h3>
                            {tier.color === 'gold' && (
                                <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 leading-none">
                                    Ti\u1ebft ki\u1ec7m nh\u1ea5t
                                </span>
                            )}
                        </div>
                        {/* Pricing */}
                        <div className="mb-3">
                            <span className="text-2xl font-black tracking-tight">{tier.price}</span>
                            <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark ml-1">{tier.priceSuffix}</span>
                        </div>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-4">{tier.desc}</p>

                        <ul className="flex-1 space-y-2 mb-5">
                            {tier.features.map((f) => (
                                <li key={f.text} className="flex items-start gap-2 text-xs">
                                    {f.included === true ? (
                                        <span className="text-emerald-500 dark:text-emerald-400 font-bold mt-0.5 shrink-0">{'\u2713'}</span>
                                    ) : f.included === false ? (
                                        <span className="text-gray-300 dark:text-gray-600 mt-0.5 shrink-0">{'\u2717'}</span>
                                    ) : (
                                        <span className="text-amber-500 dark:text-amber-400 mt-0.5 shrink-0">{'\u2139'}</span>
                                    )}
                                    <span className={f.included === false ? 'text-text-secondary-light/50 dark:text-text-secondary-dark/40 line-through' : ''}>
                                        {f.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Promo Code Section */}
            <div className="glass-card-strong glass-noise p-6 sm:p-8 max-w-md mx-auto">
                <div className="text-center mb-5">
                    <span className="material-icons-round text-2xl text-gold dark:text-gold-dark mb-2 block">confirmation_number</span>
                    <h3 className="text-lg font-bold mb-1">C\u00f3 m\u00e3 khuy\u1ebfn m\u00e3i?</h3>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                        Nh\u1eadp m\u00e3 \u0111\u1ec3 m\u1edf kh\u00f3a \u0110\u1ea7y \u0111\u1ee7 ho\u1eb7c D\u00f9ng th\u1eed mi\u1ec5n ph\u00ed.
                    </p>
                </div>
                <PromotionCodeInput />
            </div>

            {/* Credit Refresh Banner - shown for active elite users */}
            <CreditRefreshBanner className="max-w-md mx-auto mt-8" />

            {/* Trust Badge */}
            <div className="flex items-center justify-center gap-2 mt-8 mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/15 border border-emerald-200/60 dark:border-emerald-700/30">
                    <span className="material-icons-round text-sm text-emerald-500 dark:text-emerald-400">verified</span>
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">\u0110\u1ea3m b\u1ea3o ho\u00e0n ti\u1ec1n 100% trong 7 ng\u00e0y</span>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-2xl mx-auto mt-10">
                <div className="text-center mb-5">
                    <span className="material-icons-round text-2xl text-gold dark:text-gold-dark mb-2 block">help_outline</span>
                    <h3 className="text-lg font-bold mb-1">C\u00e2u h\u1ecfi th\u01b0\u1eddng g\u1eb7p</h3>
                </div>
                <div className="space-y-2">
                    {FAQ_ITEMS.map((item, i) => (
                        <FaqItem key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </div>

            {/* Back link */}
            <div className="text-center mt-6">
                <button
                    onClick={() => navigate(-1)}
                    className="text-xs text-text-secondary-light/60 dark:text-text-secondary-dark/40 hover:text-text-primary-light dark:hover:text-white transition-colors inline-flex items-center gap-1"
                >
                    <span className="material-icons-round text-sm">arrow_back</span>
                    Quay l\u1ea1i
                </button>
            </div>
        </div>
    );
}
