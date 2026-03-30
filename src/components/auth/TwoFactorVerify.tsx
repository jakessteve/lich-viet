import React, { useState, useRef, useEffect } from 'react';

// ══════════════════════════════════════════════════════════
// TwoFactorVerify — 6-digit code entry during login
// ══════════════════════════════════════════════════════════

interface TwoFactorVerifyProps {
  onVerify: (code: string) => void;
  onCancel: () => void;
  error?: string;
  isLoading?: boolean;
}

export default function TwoFactorVerify({ onVerify, onCancel, error, isLoading }: TwoFactorVerifyProps) {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus first input
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    // Only accept digits
    const digit = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);

    // Auto-advance to next
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all filled
    if (digit && index === 5) {
      const code = newDigits.join('');
      if (code.length === 6) {
        onVerify(code);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(''));
      inputRefs.current[5]?.focus();
      onVerify(pasted);
    }
  };

  const resetTimer = () => setTimeLeft(30);

  const progressPercent = (timeLeft / 30) * 100;

  return (
    <div className="text-center space-y-6">
      {/* Icon */}
      <div className="w-16 h-16 mx-auto rounded-2xl bg-mystery-purple/10 dark:bg-mystery-purple/15 flex items-center justify-center animate-scale-in">
        <span className="material-icons-round text-3xl text-mystery-purple dark:text-mystery-purple-light">
          verified_user
        </span>
      </div>

      {/* Title */}
      <div>
        <h2 className="text-lg font-bold tracking-tight">Xác thực 2 bước</h2>
        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1.5 max-w-[260px] mx-auto leading-relaxed">
          Nhập mã 6 chữ số từ ứng dụng xác thực của bạn
        </p>
      </div>

      {/* 6-digit inputs */}
      <div className="flex items-center justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
        {digits.map((digit, i) => (
          <React.Fragment key={i}>
            {i === 3 && (
              <span className="text-text-secondary-light/40 dark:text-text-secondary-dark/30 text-lg font-light mx-0.5">–</span>
            )}
            <input
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl border-2 transition-all duration-200 outline-none
                bg-surface-subtle-light dark:bg-surface-subtle-dark
                ${digit
                  ? 'border-mystery-purple/40 dark:border-mystery-purple-light/40 text-text-primary-light dark:text-text-primary-dark'
                  : 'border-border-light/40 dark:border-border-dark/40 text-text-secondary-light dark:text-text-secondary-dark'
                }
                focus:border-mystery-purple dark:focus:border-mystery-purple-light focus:ring-2 focus:ring-mystery-purple/20 dark:focus:ring-mystery-purple-light/20
              `}
              disabled={isLoading}
              aria-label={`Chữ số ${i + 1}`}
            />
          </React.Fragment>
        ))}
      </div>

      {/* Timer */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-32 h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-linear ${
              timeLeft > 10 ? 'bg-mystery-purple dark:bg-mystery-purple-light' : 'bg-red-500 dark:bg-red-400'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
          {timeLeft > 0 ? (
            <>Mã hết hạn sau <span className="font-semibold">{timeLeft}s</span></>
          ) : (
            <button onClick={resetTimer} className="text-mystery-purple dark:text-mystery-purple-light font-semibold hover:underline">
              Gửi lại mã mới
            </button>
          )}
        </p>
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-red-500 dark:text-red-400 font-medium animate-fade-in-up">
          {error}
        </p>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-2.5 pt-2">
        <button
          onClick={() => {
            const code = digits.join('');
            if (code.length === 6) onVerify(code);
          }}
          disabled={isLoading || digits.some((d) => !d)}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-mystery-purple to-mystery-blue text-white font-semibold text-sm shadow-lg shadow-mystery-purple/15 dark:shadow-mystery-purple/25 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-interact"
        >
          {isLoading ? 'Đang xác thực...' : 'Xác nhận'}
        </button>
        <button
          onClick={onCancel}
          className="text-xs text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-white transition-colors"
        >
          Quay lại đăng nhập
        </button>
      </div>
    </div>
  );
}
