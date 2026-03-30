import React, { useState } from 'react';

/**
 * AdminAuthGuard — Simple password-based route guard for the admin page.
 * 
 * Uses SHA-256 hash comparison. Auth state persists in sessionStorage
 * (clears when tab/browser is closed).
 * 
 * Security note: This is a client-side stopgap. For true security,
 * implement server-side authentication when a backend is added.
 */

const AUTH_SESSION_KEY = 'admin_auth_verified';
// SHA-256 hash — password managed offline, NEVER commit plaintext here
const EXPECTED_HASH = '6051fc84a7a0d74c225fb18a496b09952da5642e60723ecae543298edd7d82d6';

async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

interface AdminAuthGuardProps {
    children: React.ReactNode;
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
    });
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isChecking, setIsChecking] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsChecking(true);
        setError('');

        const hash = await hashPassword(password);
        if (hash === EXPECTED_HASH) {
            sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
            setIsAuthenticated(true);
        } else {
            setError('Mật khẩu không đúng.');
            setPassword('');
        }
        setIsChecking(false);
    };

    if (isAuthenticated) {
        return children as React.JSX.Element;
    }

    return (
        <div className="max-w-md mx-auto mt-20 animate-fade-in-up">
            <div className="glass-card p-8">
                <div className="text-center mb-6">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gold/10 dark:bg-gold-dark/8 flex items-center justify-center">
                        <span className="material-icons-round text-2xl text-gold dark:text-gold-dark">admin_panel_settings</span>
                    </div>
                    <h2 className="text-lg font-bold tracking-tight">Xác thực Quản trị</h2>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                        Vui lòng nhập mật khẩu quản trị để truy cập.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mật khẩu quản trị..."
                            autoFocus
                            className="w-full px-4 py-2.5 rounded-xl bg-surface-subtle-light dark:bg-surface-subtle-dark border border-border-light/30 dark:border-border-dark/30 text-sm focus:ring-2 focus:ring-gold/30 dark:focus:ring-gold-dark/30 outline-none transition-all placeholder:text-text-secondary-light/40 dark:placeholder:text-text-secondary-dark/40"
                        />
                    </div>

                    {error && (
                        <p className="text-xs text-red-500 dark:text-red-400 text-center font-medium">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isChecking || !password}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-gold to-amber-600 dark:from-gold-dark dark:to-amber-500 text-white font-semibold text-sm shadow-lg shadow-gold/15 dark:shadow-gold-dark/20 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isChecking ? 'Đang kiểm tra...' : 'Đăng nhập'}
                    </button>
                </form>
            </div>
        </div>
    );
}
