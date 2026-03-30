// ══════════════════════════════════════════════════════════
// Auth Type Definitions
// ══════════════════════════════════════════════════════════

/** Supported authentication providers */
export type AuthProvider = 'email' | 'google' | 'facebook';

/** Promotion code types */
export type PromoType = 'free_premium' | 'discount';

/**
 * User access tiers — Good-Better-Best (Compromise Effect) monetization model.
 * - guest:   Not logged in. No personalization.
 * - free:    Logged in, basic access. Sees ads. Calendar + limited daily fortune.
 * - premium: Unlocks Takeaway interpretations, Morning Briefing, Bonds, no ads.
 * - elite:   Unlocks Pro Mode (raw data grids, SVG charts), unlimited profiles, PDF export.
 */
export type UserTier = 'guest' | 'free' | 'premium' | 'elite';

/** Promotion code definition (server-side lookup) */
export interface PromotionCode {
  code: string;
  type: PromoType;
  /** Duration in months (1, 3, 6) for free_premium */
  durationMonths?: 1 | 3 | 6;
  /** Discount percentage (15, 30) for discount type */
  discountPercent?: 15 | 30;
  /** Human-readable label */
  label: string;
}

/** Redeemed promotion record */
export interface PromoRedemption {
  code: string;
  type: PromoType;
  redeemedAt: string;
  expiresAt?: string;
  durationMonths?: number;
  discountPercent?: number;
  label: string;
}

/** Astrological basic profile for personalization */
export interface BasicProfile {
  birthYear?: number;
  birthMonth?: number;
  birthDay?: number;
  birthHour?: number;
  birthMinute?: number;
  gender?: 'male' | 'female';
  lifepathNumber?: number; // Numerology
}

/** Extended profile for advanced astrology requiring birth time/location */
export interface ExtendedProfile {
  birthTime?: string; // HH:MM
  birthLocation?: { lat: number; lng: number; city: string };
  baziDayMaster?: { stem: string; element: string };
  truongSinhPhase?: string;
  thanSat?: string[];
  tuanKhong?: string[]; // Void branches
  natalChartCached?: Record<string, unknown>;
}

/** Profile for the second person in synastry feature */
export interface SecondPersonProfile extends BasicProfile {
  name: string;
  relationship: 'partner' | 'friend' | 'colleague' | 'family';
  computationTier: 'basic' | 'extended';
}

/** User profile */
export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  /** ISO date string YYYY-MM-DD — used to pre-fill astrology/numerology inputs */
  birthday?: string;
  /** Personalization profile containing astrological details */
  profile?: BasicProfile;
  extendedProfile?: ExtendedProfile;
  secondProfile?: SecondPersonProfile;
  provider: AuthProvider;
  twoFactorEnabled: boolean;
  promoRedemptions?: PromoRedemption[];
  createdAt: string;
}

/** Login credentials */
export interface LoginCredentials {
  email: string;
  password: string;
}

/** Registration data */
export interface RegisterData {
  displayName: string;
  email: string;
  password: string;
}

/** Auth state for the store */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  pending2FA: boolean;
}
