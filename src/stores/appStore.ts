import { create } from 'zustand';
import { type LocaleCode, detectLocale, setLocalePreference } from '@/i18n';
import { analytics } from '@/services/analyticsService';
import { getDetailedDayData } from '@/utils/calendarEngine';
import type { DayDetailsData } from '@/types/calendar';

// ══════════════════════════════════════════════════════════
// Type Definitions
// ══════════════════════════════════════════════════════════

export type FontSizeLevel = 'small' | 'normal' | 'large';

const FONT_SIZE_MAP: Record<FontSizeLevel, number> = {
  small: 16,
  normal: 18,
  large: 20,
};

const FONT_SIZE_CYCLE: Record<FontSizeLevel, FontSizeLevel> = {
  small: 'normal',
  normal: 'large',
  large: 'small',
};

export type UserGoal = 'calendar' | 'self_discovery' | 'feng_shui' | null;

// ══════════════════════════════════════════════════════════
// Store Interface
// ══════════════════════════════════════════════════════════

interface AppState {
  /** The currently selected calendar date (clamped to 1900-2200) */
  selectedDate: Date;
  /** Detailed astrological data for the selected date */
  dayData: DayDetailsData;
  /** Whether dark mode is active */
  isDark: boolean;
  /** Current font size level */
  fontSize: FontSizeLevel;
  /** Current locale */
  locale: LocaleCode;
  /** Primary goal selected during onboarding */
  userGoal: UserGoal;
  /** Premium user status */
  isPremium: boolean;
}

interface AppActions {
  /** Update the selected date (with 1900-2200 clamping) */
  setSelectedDate: (date: Date) => void;
  /** Toggle dark mode */
  toggleDarkMode: () => void;
  /** Cycle font size: small → normal → large → small */
  cycleFontSize: () => void;
  /** Set font size to a specific level */
  setFontSizeLevel: (level: FontSizeLevel) => void;
  /** Set locale and persist preference */
  setLocale: (locale: LocaleCode) => void;
  /** Set user goal and persist */
  setUserGoal: (goal: UserGoal) => void;
  /** Toggle premium status for demo purposes */
  toggleIsPremium: () => void;
}

type AppStore = AppState & AppActions;

// ══════════════════════════════════════════════════════════
// Helpers
// ══════════════════════════════════════════════════════════

/** Clamp year to safe range (1900-2199) to prevent engine errors */
function clampDate(date: Date): Date {
  const year = date.getFullYear();
  if (year < 1900 || year > 2199) {
    const clamped = new Date(date);
    clamped.setFullYear(Math.max(1900, Math.min(2199, year)));
    return clamped;
  }
  return date;
}

// ══════════════════════════════════════════════════════════
// Side Effects — kept outside Zustand for purity
// ══════════════════════════════════════════════════════════

function applyDarkMode(isDark: boolean): void {
  if (isDark) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }
}

function applyFontSize(fontSize: FontSizeLevel): void {
  document.documentElement.style.fontSize = `${FONT_SIZE_MAP[fontSize]}px`;
}

// ══════════════════════════════════════════════════════════
// Initialize from DOM/localStorage (runs once at import)
// ══════════════════════════════════════════════════════════

function getInitialDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  if (localStorage.theme === 'dark') {
    document.documentElement.classList.add('dark');
    return true;
  }
  document.documentElement.classList.remove('dark');
  return false;
}

function getInitialFontSize(): FontSizeLevel {
  if (typeof window === 'undefined') return 'normal';
  const saved = localStorage.getItem('fontSize');
  const level = saved === 'small' || saved === 'normal' || saved === 'large' ? saved : 'normal';
  applyFontSize(level);
  return level;
}

function getInitialUserGoal(): UserGoal {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem('userGoal') as UserGoal;
  return saved || null;
}

function getInitialPremiumStatus(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('isPremium') === 'true';
}

// ══════════════════════════════════════════════════════════
// Zustand Store
// ══════════════════════════════════════════════════════════

const initialDate = clampDate(new Date());

export const useAppStore = create<AppStore>()((set) => ({
  // State
  selectedDate: initialDate,
  dayData: getDetailedDayData(initialDate),
  isDark: getInitialDarkMode(),
  fontSize: getInitialFontSize(),
  locale: detectLocale(),
  userGoal: getInitialUserGoal(),
  isPremium: getInitialPremiumStatus(),

  // Actions
  setSelectedDate: (date: Date) => {
    const clamped = clampDate(date);
    analytics.trackEvent({
      name: 'lunar_date_change',
      properties: { date: clamped.toISOString() },
    });
    set({
      selectedDate: clamped,
      dayData: getDetailedDayData(clamped)
    });
  },

  toggleDarkMode: () =>
    set((state) => {
      const newDark = !state.isDark;
      applyDarkMode(newDark);
      analytics.trackEvent({
        name: 'theme_toggle',
        properties: { is_dark: newDark },
      });
      return { isDark: newDark };
    }),

  cycleFontSize: () =>
    set((state) => {
      const next = FONT_SIZE_CYCLE[state.fontSize];
      applyFontSize(next);
      localStorage.setItem('fontSize', next);
      analytics.trackEvent({
        name: 'font_size_change',
        properties: { font_size: next },
      });
      return { fontSize: next };
    }),

  setFontSizeLevel: (level: FontSizeLevel) => {
    applyFontSize(level);
    localStorage.setItem('fontSize', level);
    analytics.trackEvent({
      name: 'font_size_change',
      properties: { font_size: level },
    });
    set({ fontSize: level });
  },

  setLocale: (locale: LocaleCode) => {
    setLocalePreference(locale);
    analytics.trackEvent({
      name: 'locale_change',
      properties: { locale },
    });
    set({ locale });
  },

  setUserGoal: (goal: UserGoal) => {
    if (goal) {
      localStorage.setItem('userGoal', goal);
    } else {
      localStorage.removeItem('userGoal');
    }
    analytics.trackEvent({
      name: 'onboarding_quiz_completed',
      properties: { goal },
    });
    set({ userGoal: goal });
  },

  toggleIsPremium: () => {
    set((state) => {
      const newStatus = !state.isPremium;
      localStorage.setItem('isPremium', String(newStatus));
      return { isPremium: newStatus };
    });
  },
}));
