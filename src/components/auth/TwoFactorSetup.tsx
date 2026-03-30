import React, { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';

// ══════════════════════════════════════════════════════════
// TwoFactorSetup — Enable/disable 2FA in Settings
// ══════════════════════════════════════════════════════════

export default function TwoFactorSetup() {
  const user = useAuthStore((s) => s.user);
  const toggle2FA = useAuthStore((s) => s.toggle2FA);
  const [showSetup, setShowSetup] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [setupError, setSetupError] = useState('');
  const [showConfirmDisable, setShowConfirmDisable] = useState(false);

  // Generate a random placeholder secret at runtime (NOT a real TOTP secret).
  // In production, this must be fetched from the backend via a secure API call.
  const [setupSecret] = useState(() => {
    const bytes = crypto.getRandomValues(new Uint8Array(10));
    const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    return Array.from(bytes)
      .map(b => base32Chars[b % 32])
      .join('')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  });

  if (!user) return null;

  const is2FAEnabled = user.twoFactorEnabled;

  const handleEnable = () => {
    if (verifyCode.length !== 6 || !/^\d{6}$/.test(verifyCode)) {
      setSetupError('Vui lòng nhập mã 6 chữ số hợp lệ.');
      return;
    }
    toggle2FA();
    setShowSetup(false);
    setVerifyCode('');
    setSetupError('');
  };

  const handleDisable = () => {
    toggle2FA();
    setShowConfirmDisable(false);
  };

  // ── Toggle button (not yet set up) ────────────────────
  if (!is2FAEnabled && !showSetup) {
    return (
      <button
        onClick={() => setShowSetup(true)}
        className="text-xs font-medium px-3 py-1.5 rounded-lg bg-mystery-purple/8 dark:bg-mystery-purple/10 text-mystery-purple dark:text-mystery-purple-light hover:bg-mystery-purple/15 dark:hover:bg-mystery-purple/18 transition-colors"
      >
        Bật 2FA
      </button>
    );
  }

  // ── Currently enabled — show disable option ─────────────
  if (is2FAEnabled && !showConfirmDisable) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-good dark:text-good-dark flex items-center gap-1">
          <span className="material-icons-round text-sm">check_circle</span>
          Đã bật
        </span>
        <button
          onClick={() => setShowConfirmDisable(true)}
          className="text-xs font-medium px-2.5 py-1 rounded-lg text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/15 transition-colors"
        >
          Tắt
        </button>
      </div>
    );
  }

  // ── Confirm disable ─────────────────────────────────────
  if (showConfirmDisable) {
    return (
      <div className="mt-3 p-4 rounded-xl bg-red-50/50 dark:bg-red-900/10 border border-red-200/50 dark:border-red-800/30 animate-scale-in">
        <p className="text-xs font-medium text-red-700 dark:text-red-400 mb-3">
          Tắt xác thực 2 bước sẽ giảm bảo mật tài khoản. Bạn chắc chắn?
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleDisable}
            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Xác nhận tắt
          </button>
          <button
            onClick={() => setShowConfirmDisable(false)}
            className="text-xs font-medium px-3 py-1.5 rounded-lg border border-border-light/50 dark:border-border-dark/30 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
          >
            Hủy
          </button>
        </div>
      </div>
    );
  }

  // ── Setup flow ──────────────────────────────────────────
  return (
    <div className="mt-3 space-y-4 animate-fade-in-up">
      <div className="p-4 rounded-xl bg-surface-subtle-light dark:bg-surface-subtle-dark border border-border-light/30 dark:border-border-dark/30">
        {/* Step 1 — QR placeholder */}
        <div className="text-center mb-4">
          <div className="w-28 h-28 mx-auto rounded-xl bg-white dark:bg-gray-800 border-2 border-dashed border-border-light dark:border-border-dark flex items-center justify-center mb-2">
            <span className="material-icons-round text-4xl text-text-secondary-light/30 dark:text-text-secondary-dark/20">
              qr_code_2
            </span>
          </div>
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
            Quét mã QR bằng ứng dụng xác thực
          </p>
        </div>

        {/* Step 2 — Manual key */}
        <div className="p-3 rounded-lg bg-white dark:bg-mystery-deep/50 border border-border-light/20 dark:border-border-dark/20 mb-4">
          <p className="text-[10px] uppercase tracking-wider font-bold text-text-secondary-light dark:text-text-secondary-dark mb-1">
            Mã bí mật
          </p>
          <p className="text-sm font-mono font-bold tracking-widest text-mystery-purple dark:text-mystery-purple-light select-all">
            {setupSecret}
          </p>
        </div>

        {/* Step 3 — Verify code */}
        <div>
          <label className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark block mb-1.5">
            Nhập mã xác thực để bật 2FA
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={verifyCode}
              onChange={(e) => {
                setVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                setSetupError('');
              }}
              placeholder="000000"
              maxLength={6}
              inputMode="numeric"
              className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-mystery-deep/50 border border-border-light/40 dark:border-border-dark/30 text-sm font-mono tracking-widest text-center focus:ring-2 focus:ring-mystery-purple/30 dark:focus:ring-mystery-purple-light/30 outline-none transition-all placeholder:text-text-secondary-light/30 dark:placeholder:text-text-secondary-dark/20"
            />
            <button
              onClick={handleEnable}
              disabled={verifyCode.length !== 6}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-mystery-purple to-mystery-blue text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg transition-all btn-interact"
            >
              Bật
            </button>
          </div>
          {setupError && (
            <p className="text-xs text-red-500 dark:text-red-400 mt-1.5">{setupError}</p>
          )}
        </div>
      </div>

      <button
        onClick={() => { setShowSetup(false); setVerifyCode(''); setSetupError(''); }}
        className="text-xs text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-white transition-colors"
      >
        ← Hủy
      </button>
    </div>
  );
}
