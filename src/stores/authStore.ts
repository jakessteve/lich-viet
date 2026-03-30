import { create } from 'zustand';
import type { User, AuthProvider, AuthState, LoginCredentials, RegisterData, PromotionCode, PromoRedemption } from '../types/auth';

// ══════════════════════════════════════════════════════════
// Constants
// ══════════════════════════════════════════════════════════

const AUTH_STORAGE_KEY = 'auth_user';
const USERS_STORAGE_KEY = 'auth_users_db';

// ══════════════════════════════════════════════════════════
// Helper — SHA-256 password hashing (same as AdminAuthGuard)
// ══════════════════════════════════════════════════════════

function generateSalt(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function hashPassword(password: string, salt: string = ''): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// ══════════════════════════════════════════════════════════
// "Database" — localStorage user registry
// ⚠️ SECURITY: Client-side only — all data is accessible
// via browser DevTools. Migrate to server-side auth for
// production use. See SECURITY.md for details.
// ══════════════════════════════════════════════════════════

interface StoredUser {
  user: User;
  passwordHash: string;
  salt?: string; // Added for rainbow table protection
}

function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/** Seed the admin user into localStorage on first load */
async function seedAdminUser(): Promise<void> {
  const users = getStoredUsers();
  const adminExists = users.some((u) => u.user.displayName === 'user' || u.user.email === 'admin@lichviet.app');
  if (adminExists) return;

  const salt = generateSalt();
  const hash = await hashPassword('LV_Admin_2026!sEcUrE', salt);
  const adminUser: StoredUser = {
    user: {
      id: 'admin-001',
      email: 'admin@lichviet.app',
      displayName: 'user',
      provider: 'email',
      twoFactorEnabled: false,
      createdAt: '2026-01-01T00:00:00.000Z',
    },
    passwordHash: hash,
    salt,
  };
  users.push(adminUser);
  saveStoredUsers(users);
}

// Seed admin on module load
seedAdminUser();

// ══════════════════════════════════════════════════════════
// Promotion Codes — DEMO ONLY (client-side)
// ⚠️ SECURITY: Codes are visible in JS bundle. Migrate to
// server-side validation for production use.
// ══════════════════════════════════════════════════════════

const PROMO_CODES: PromotionCode[] = [
  { code: 'PREMIUM1M', type: 'free_premium', durationMonths: 1, label: 'Premium miễn phí 1 tháng' },
  { code: 'PREMIUM3M', type: 'free_premium', durationMonths: 3, label: 'Premium miễn phí 3 tháng' },
  { code: 'PREMIUM6M', type: 'free_premium', durationMonths: 6, label: 'Premium miễn phí 6 tháng' },
  { code: 'DISCOUNT15', type: 'discount', discountPercent: 15, label: 'Giảm giá 15%' },
  { code: 'DISCOUNT30', type: 'discount', discountPercent: 30, label: 'Giảm giá 30%' },
];

const PROMO_STORAGE_KEY = 'promo_redemptions';

function getStoredRedemptions(): PromoRedemption[] {
  try {
    const raw = localStorage.getItem(PROMO_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredRedemptions(redemptions: PromoRedemption[]): void {
  localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(redemptions));
}

// ══════════════════════════════════════════════════════════
// Store Interface
// ══════════════════════════════════════════════════════════

interface AuthActions {
  /** Email + password login */
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string; needs2FA?: boolean }>;
  /** Verify 2FA code during login */
  verify2FA: (code: string) => { success: boolean; error?: string };
  /** Register with email + password */
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  /** Social login (simulated) */
  socialLogin: (provider: AuthProvider) => Promise<{ success: boolean; error?: string }>;
  /** Logout */
  logout: () => void;
  /** Toggle 2FA on/off */
  toggle2FA: () => void;
  /** Clear pending 2FA state (e.g. when navigating away) */
  clearPending2FA: () => void;
  /** Redeem a promotion code */
  redeemPromoCode: (code: string) => Promise<{ success: boolean; error?: string; redemption?: PromoRedemption }>;
  /** Get all redeemed promos (from localStorage or user) */
  getRedemptions: () => PromoRedemption[];
  /** Update user profile fields (displayName, avatarUrl, birthday, birthHour, birthMinute, birthLocation) */
  updateProfile: (updates: { displayName?: string; avatarUrl?: string; birthday?: string; birthHour?: number | null; birthMinute?: number | null; birthLocation?: { lat: number; lng: number; city: string } | null; }) => Promise<{ success: boolean; error?: string }>;
  /** Change password (requires current password verification) */
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  /** Delete a user account by ID (admin action — cannot delete self or other admins) */
  deleteUser: (userId: string) => { success: boolean; error?: string };
}

type AuthStore = AuthState & AuthActions;

// ══════════════════════════════════════════════════════════
// Initialize from localStorage
// ══════════════════════════════════════════════════════════

function getInitialAuthState(): Pick<AuthState, 'user' | 'isAuthenticated'> {
  if (typeof window === 'undefined') return { user: null, isAuthenticated: false };
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (raw) {
      const user: User = JSON.parse(raw);
      return { user, isAuthenticated: true };
    }
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
  return { user: null, isAuthenticated: false };
}

// ══════════════════════════════════════════════════════════
// Zustand Store
// ══════════════════════════════════════════════════════════

const initialAuth = getInitialAuthState();

export const useAuthStore = create<AuthStore>()((set, get) => ({
  // State
  user: initialAuth.user,
  isAuthenticated: initialAuth.isAuthenticated,
  isLoading: false,
  pending2FA: false,

  // ── Login ───────────────────────────────────────────────
  login: async (credentials) => {
    set({ isLoading: true });

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 600));

    const users = getStoredUsers();
    const identifier = credentials.email.toLowerCase();
    // Find user first, then hash with their salt
    const candidates = users.filter(
      (u) => u.user.email.toLowerCase() === identifier || u.user.displayName?.toLowerCase() === identifier
    );
    let found: StoredUser | undefined;
    for (const c of candidates) {
      const hash = await hashPassword(credentials.password, c.salt || '');
      if (c.passwordHash === hash) { found = c; break; }
    }

    if (!found) {
      set({ isLoading: false });
      return { success: false, error: 'Email hoặc mật khẩu không đúng.' };
    }

    // Check if 2FA is enabled
    if (found.user.twoFactorEnabled) {
      // Store user temporarily, don't fully authenticate yet
      set({ user: found.user, isLoading: false, pending2FA: true });
      return { success: true, needs2FA: true };
    }

    // Full login
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(found.user));
    set({ user: found.user, isAuthenticated: true, isLoading: false, pending2FA: false });
    return { success: true };
  },

  // ── Verify 2FA ──────────────────────────────────────────
  verify2FA: (code) => {
    const { user } = get();
    if (!user) return { success: false, error: 'Phiên đăng nhập hết hạn.' };

    // ⚠️ DEMO ONLY: accepts any 6-digit code. Replace with
    // real TOTP (RFC 6238) for production. See SECURITY.md.
    if (code.length === 6 && /^\d{6}$/.test(code)) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      set({ isAuthenticated: true, pending2FA: false });
      return { success: true };
    }

    return { success: false, error: 'Mã xác thực không hợp lệ.' };
  },

  // ── Register ────────────────────────────────────────────
  register: async (data) => {
    set({ isLoading: true });

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    const users = getStoredUsers();

    // Check duplicate email
    if (users.some((u) => u.user.email.toLowerCase() === data.email.toLowerCase())) {
      set({ isLoading: false });
      return { success: false, error: 'Email này đã được sử dụng.' };
    }

    const salt = generateSalt();
    const hash = await hashPassword(data.password, salt);
    const newUser: User = {
      id: generateId(),
      email: data.email,
      displayName: data.displayName,
      provider: 'email',
      twoFactorEnabled: false,
      createdAt: new Date().toISOString(),
    };

    users.push({ user: newUser, passwordHash: hash, salt });
    saveStoredUsers(users);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    set({ user: newUser, isAuthenticated: true, isLoading: false });
    return { success: true };
  },

  // ── Social Login (simulated) ────────────────────────────
  socialLogin: async (provider) => {
    set({ isLoading: true });

    // Simulate OAuth redirect + response
    await new Promise((r) => setTimeout(r, 1000));

    const providerNames: Record<AuthProvider, string> = {
      google: 'Google',
      facebook: 'Facebook',
      email: 'Email',
    };

    const mockUser: User = {
      id: generateId(),
      email: `user@${provider}.com`,
      displayName: `Người dùng ${providerNames[provider]}`,
      avatarUrl: undefined,
      provider,
      twoFactorEnabled: false,
      createdAt: new Date().toISOString(),
    };

    // Check if social user already exists
    const users = getStoredUsers();
    const existing = users.find(
      (u) => u.user.provider === provider && u.user.email === mockUser.email
    );

    if (existing) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(existing.user));
      set({ user: existing.user, isAuthenticated: true, isLoading: false });
    } else {
      users.push({ user: mockUser, passwordHash: '' });
      saveStoredUsers(users);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser));
      set({ user: mockUser, isAuthenticated: true, isLoading: false });
    }

    return { success: true };
  },

  // ── Logout ──────────────────────────────────────────────
  logout: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    set({ user: null, isAuthenticated: false, pending2FA: false });
  },

  // ── Toggle 2FA ──────────────────────────────────────────
  toggle2FA: () => {
    const { user } = get();
    if (!user) return;

    const updated: User = { ...user, twoFactorEnabled: !user.twoFactorEnabled };

    // Update in "database"
    const users = getStoredUsers();
    const idx = users.findIndex((u) => u.user.id === user.id);
    if (idx !== -1) {
      users[idx].user = updated;
      saveStoredUsers(users);
    }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
    set({ user: updated });
  },

  // ── Clear pending 2FA ───────────────────────────────────
  clearPending2FA: () => {
    set({ pending2FA: false, user: null });
  },

  // ── Redeem Promotion Code ──────────────────────────────
  redeemPromoCode: async (code) => {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 600));

    const normalised = code.trim().toUpperCase();
    const promo = PROMO_CODES.find((p) => p.code === normalised);

    if (!promo) {
      return { success: false, error: 'Mã khuyến mãi không hợp lệ.' };
    }

    // Check if already redeemed
    const existing = getStoredRedemptions();
    if (existing.some((r) => r.code === normalised)) {
      return { success: false, error: 'Mã khuyến mãi này đã được sử dụng.' };
    }

    const now = new Date();
    let expiresAt: string | undefined;
    if (promo.type === 'free_premium' && promo.durationMonths) {
      const exp = new Date(now);
      exp.setMonth(exp.getMonth() + promo.durationMonths);
      expiresAt = exp.toISOString();
    }

    const redemption: PromoRedemption = {
      code: normalised,
      type: promo.type,
      redeemedAt: now.toISOString(),
      expiresAt,
      durationMonths: promo.durationMonths,
      discountPercent: promo.discountPercent,
      label: promo.label,
    };

    // Persist
    existing.push(redemption);
    saveStoredRedemptions(existing);

    // Update user if authenticated
    const { user } = get();
    if (user) {
      const updated: User = {
        ...user,
        promoRedemptions: [...(user.promoRedemptions || []), redemption],
      };
      const users = getStoredUsers();
      const idx = users.findIndex((u) => u.user.id === user.id);
      if (idx !== -1) {
        users[idx].user = updated;
        saveStoredUsers(users);
      }
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
      set({ user: updated });
    }

    return { success: true, redemption };
  },

  // ── Get Redemptions ────────────────────────────────────
  getRedemptions: () => {
    return getStoredRedemptions();
  },

  // ── Update Profile ────────────────────────────────────────────
  updateProfile: async ({ displayName, avatarUrl, birthday, birthHour, birthMinute, birthLocation }) => {
    const { user } = get();
    if (!user) return { success: false, error: 'Chưa đăng nhập.' };

    if (displayName !== undefined && displayName.trim().length < 2) {
      return { success: false, error: 'Tên hiển thị phải có ít nhất 2 ký tự.' };
    }

    const updated: User = {
      ...user,
      ...((displayName !== undefined) && { displayName: displayName.trim() }),
      ...((avatarUrl !== undefined) && { avatarUrl }),
      ...((birthday !== undefined) && { birthday }),
    };

    if (birthHour !== undefined || birthMinute !== undefined || birthday !== undefined) {
      updated.profile = {
        ...(updated.profile || {}),
        ...(birthHour !== undefined && { birthHour: birthHour === null ? undefined : birthHour }),
        ...(birthMinute !== undefined && { birthMinute: birthMinute === null ? undefined : birthMinute }),
      };
      
      // Auto-extract year/month/day if birthday string was updated
      if (birthday) {
        const [y, m, d] = birthday.split('-').map(Number);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
          updated.profile.birthYear = y;
          updated.profile.birthMonth = m;
          updated.profile.birthDay = d;
        }
      }
    }

    if (birthLocation !== undefined) {
      updated.extendedProfile = {
        ...(updated.extendedProfile || {}),
      };
      if (birthLocation === null) {
        delete updated.extendedProfile.birthLocation;
      } else {
        updated.extendedProfile.birthLocation = birthLocation;
      }
    }


    const users = getStoredUsers();
    const idx = users.findIndex((u) => u.user.id === user.id);
    if (idx !== -1) {
      users[idx].user = updated;
      saveStoredUsers(users);
    }
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
    set({ user: updated });
    return { success: true };
  },

  // ── Change Password ───────────────────────────────────────────
  changePassword: async (currentPassword, newPassword) => {
    const { user } = get();
    if (!user) return { success: false, error: 'Chưa đăng nhập.' };
    if (user.provider !== 'email') return { success: false, error: 'Tài khoản xã hội không hỗ trợ đổi mật khẩu.' };
    if (newPassword.length < 8) return { success: false, error: 'Mật khẩu mới phải ít nhất 8 ký tự.' };

    const currentHash = await hashPassword(currentPassword);
    const users = getStoredUsers();
    const idx = users.findIndex((u) => u.user.id === user.id);

    if (idx === -1 || users[idx].passwordHash !== currentHash) {
      return { success: false, error: 'Mật khẩu hiện tại không đúng.' };
    }

    users[idx].passwordHash = await hashPassword(newPassword);
    saveStoredUsers(users);
    return { success: true };
  },

  // ── Delete User ────────────────────────────────────────────
  deleteUser: (userId: string) => {
    const { user } = get();
    if (user?.id === userId) return { success: false, error: 'Không thể xóa tài khoản đang đăng nhập.' };

    const users = getStoredUsers();
    const target = users.find((u) => u.user.id === userId);
    if (!target) return { success: false, error: 'Không tìm thấy người dùng.' };

    // Remove from user DB
    saveStoredUsers(users.filter((u) => u.user.id !== userId));

    // Clean up admin overrides for this user
    try {
      const roleMap = JSON.parse(localStorage.getItem('admin_user_roles') || '{}');
      const statusMap = JSON.parse(localStorage.getItem('admin_user_statuses') || '{}');
      delete roleMap[userId];
      delete statusMap[userId];
      localStorage.setItem('admin_user_roles', JSON.stringify(roleMap));
      localStorage.setItem('admin_user_statuses', JSON.stringify(statusMap));
    } catch { /* ignore */ }

    return { success: true };
  },
}));
