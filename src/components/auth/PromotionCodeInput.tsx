import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import type { PromoRedemption } from '../../types/auth';

// ══════════════════════════════════════════════════════════
// PromotionCodeInput — Reusable promo code redemption UI
// ══════════════════════════════════════════════════════════

interface PromotionCodeInputProps {
  /** Compact mode for inline use (e.g. inside register form) */
  compact?: boolean;
}

export default function PromotionCodeInput({ compact = false }: PromotionCodeInputProps) {
  const { redeemPromoCode, getRedemptions } = useAuthStore();

  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [redemptions, setRedemptions] = useState<PromoRedemption[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setRedemptions(getRedemptions());
  }, [getRedemptions]);

  const handleRedeem = async () => {
    if (!code.trim()) {
      setError('Vui lòng nhập mã khuyến mãi.');
      return;
    }
    setError('');
    setSuccess('');
    setIsLoading(true);

    const result = await redeemPromoCode(code);
    setIsLoading(false);

    if (result.success && result.redemption) {
      setSuccess(result.redemption.label);
      setCode('');
      setRedemptions(getRedemptions());
    } else if (result.error) {
      setError(result.error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRedeem();
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // ── Compact: collapsible toggle inside forms ──────────
  if (compact) {
    return (
      <div className="animate-fade-in-up">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 text-xs font-medium text-mystery-purple dark:text-mystery-purple-light hover:text-mystery-purple/80 dark:hover:text-mystery-purple-light/80 transition-colors"
        >
          <span className="material-icons-round text-sm">
            {isExpanded ? 'expand_less' : 'card_giftcard'}
          </span>
          Có mã khuyến mãi?
        </button>

        {isExpanded && (
          <div className="mt-2.5 animate-scale-in">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="material-icons-round text-lg text-text-secondary-light/40 dark:text-text-secondary-dark/30 absolute left-3 top-1/2 -translate-y-1/2">
                  confirmation_number
                </span>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(''); setSuccess(''); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập mã khuyến mãi"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-surface-subtle-light dark:bg-surface-subtle-dark border border-border-light/30 dark:border-border-dark/30 text-sm focus:ring-2 focus:ring-mystery-purple/30 dark:focus:ring-mystery-purple-light/30 outline-none transition-all placeholder:text-text-secondary-light/35 dark:placeholder:text-text-secondary-dark/25 uppercase tracking-wide font-mono"
                />
              </div>
              <button
                type="button"
                onClick={handleRedeem}
                disabled={isLoading || !code.trim()}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-mystery-purple/90 to-mystery-blue/90 text-white text-xs font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-interact shrink-0"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                ) : (
                  'Áp dụng'
                )}
              </button>
            </div>

            {/* Feedback */}
            {error && (
              <div className="flex items-center gap-1.5 mt-2 animate-scale-in">
                <span className="material-icons-round text-xs text-red-500 dark:text-red-400">error</span>
                <p className="text-xs text-red-600 dark:text-red-400 font-medium">{error}</p>
              </div>
            )}
            {success && (
              <div className="flex items-center gap-1.5 mt-2 animate-scale-in">
                <span className="material-icons-round text-xs text-good dark:text-good-dark">check_circle</span>
                <p className="text-xs text-good dark:text-good-dark font-medium">Đã áp dụng: {success}</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // ── Full mode: for settings page ──────────────────────
  return (
    <div className="space-y-4">
      {/* Input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="material-icons-round text-lg text-text-secondary-light/40 dark:text-text-secondary-dark/30 absolute left-3 top-1/2 -translate-y-1/2">
            confirmation_number
          </span>
          <input
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(''); setSuccess(''); }}
            onKeyDown={handleKeyDown}
            placeholder="Nhập mã khuyến mãi"
            className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-surface-subtle-light dark:bg-surface-subtle-dark border border-border-light/30 dark:border-border-dark/30 text-sm focus:ring-2 focus:ring-mystery-purple/30 dark:focus:ring-mystery-purple-light/30 outline-none transition-all placeholder:text-text-secondary-light/35 dark:placeholder:text-text-secondary-dark/25 uppercase tracking-wide font-mono"
          />
        </div>
        <button
          type="button"
          onClick={handleRedeem}
          disabled={isLoading || !code.trim()}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-mystery-purple to-mystery-blue text-white text-sm font-semibold shadow-sm hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-interact shrink-0"
        >
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
          ) : (
            'Áp dụng'
          )}
        </button>
      </div>

      {/* Feedback */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/15 border border-red-200/50 dark:border-red-800/30 animate-scale-in">
          <span className="material-icons-round text-sm text-red-500 dark:text-red-400">error</span>
          <p className="text-xs text-red-600 dark:text-red-400 font-medium">{error}</p>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/15 border border-emerald-200/50 dark:border-emerald-800/30 animate-scale-in">
          <span className="material-icons-round text-sm text-good dark:text-good-dark">check_circle</span>
          <p className="text-xs text-good dark:text-good-dark font-medium">Đã áp dụng: {success}</p>
        </div>
      )}

      {/* Active Redemptions */}
      {redemptions.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark">
            Mã đã sử dụng
          </p>
          {redemptions.map((r) => (
            <div
              key={r.code}
              className="flex items-center justify-between gap-3 p-3 rounded-xl bg-surface-subtle-light dark:bg-surface-subtle-dark border border-border-light/20 dark:border-border-dark/15"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`material-icons-round text-base ${
                  r.type === 'free_premium'
                    ? 'text-mystery-purple dark:text-mystery-purple-light'
                    : 'text-gold dark:text-gold-dark'
                }`}>
                  {r.type === 'free_premium' ? 'workspace_premium' : 'sell'}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate">{r.label}</p>
                  <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark">
                    Mã: <span className="font-mono">{r.code}</span>
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  r.type === 'free_premium'
                    ? 'bg-mystery-purple/8 dark:bg-mystery-purple/12 text-mystery-purple dark:text-mystery-purple-light'
                    : 'bg-gold/8 dark:bg-gold-dark/8 text-gold dark:text-gold-dark'
                }`}>
                  {r.type === 'free_premium' ? `${r.durationMonths}T Premium` : `−${r.discountPercent}%`}
                </span>
                {r.expiresAt && (
                  <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
                    HSD: {formatDate(r.expiresAt)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
