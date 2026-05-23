/**
 * featureFlags.ts — Persistent feature flag utility
 *
 * Flags are stored in localStorage so local feature toggles survive page reloads.
 * Engines and components can call `isFeatureEnabled()` to gate behaviour.
 */

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  module: string;
  enabled: boolean;
  premium: boolean;
}

const STORAGE_KEY = 'feature_flags';
const LEGACY_STORAGE_KEY = 'admin_feature_flags';

/** Default flag definitions — source of truth for first-run */
export const DEFAULT_FEATURE_FLAGS: FeatureFlag[] = [
  { id: 'am-lich',    name: 'Âm Lịch',              description: 'Tra cứu ngày âm lịch, can chi, tiết khí',             module: 'Core',           enabled: true,  premium: false },
  { id: 'dung-su',   name: 'Lịch Dụng Sự',          description: 'Tìm ngày tốt cho các việc quan trọng',               module: 'Core',           enabled: true,  premium: false },
  { id: 'gieo-que',  name: 'Gieo Quẻ',               description: 'Mai Hoa Dịch Số & Tam Thức',                        module: 'Divination',     enabled: true,  premium: false },
  { id: 'tu-vi',     name: 'Tử Vi',                  description: 'Lập lá số Tử Vi Đẩu Số theo phái Thiên Lương',       module: 'Divination',     enabled: true,  premium: false },
];

// ─────────────────────────────────────────────────
// Read / Write
// ─────────────────────────────────────────────────

/**
 * Load all flags from localStorage, falling back to defaults for any
 * flag that is not yet stored (handles adding new flags after release).
 */
export function getFeatureFlags(): FeatureFlag[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return [...DEFAULT_FEATURE_FLAGS];

    const stored: FeatureFlag[] = JSON.parse(raw);
    // Merge: keep any stored flag, add any new defaults not yet stored
    const storedIds = new Set(stored.map((f) => f.id));
    const merged = [
      ...stored,
      ...DEFAULT_FEATURE_FLAGS.filter((f) => !storedIds.has(f.id)),
    ];
    return merged;
  } catch {
    return [...DEFAULT_FEATURE_FLAGS];
  }
}

/** Persist the full flag list to localStorage */
export function saveFeatureFlags(flags: FeatureFlag[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
  localStorage.removeItem(LEGACY_STORAGE_KEY);
}

/**
 * Toggle the `enabled` field of a single flag by id.
 * Returns the full updated flag list.
 */
export function toggleFeatureFlagEnabled(id: string): FeatureFlag[] {
  const flags = getFeatureFlags().map((f) =>
    f.id === id ? { ...f, enabled: !f.enabled } : f
  );
  saveFeatureFlags(flags);
  return flags;
}

/**
 * Toggle the `premium` field of a single flag by id.
 * Returns the full updated flag list.
 */
export function toggleFeatureFlagPremium(id: string): FeatureFlag[] {
  const flags = getFeatureFlags().map((f) =>
    f.id === id ? { ...f, premium: !f.premium } : f
  );
  saveFeatureFlags(flags);
  return flags;
}

// ─────────────────────────────────────────────────
// Convenience helpers for engines / components
// ─────────────────────────────────────────────────

/**
 * Returns `true` if the given feature flag is enabled.
 * Defaults to `true` when the flag is not found (fail-open).
 */
export function isFeatureEnabled(id: string): boolean {
  const flags = getFeatureFlags();
  const flag = flags.find((f) => f.id === id);
  return flag?.enabled ?? true;
}

/**
 * Returns `true` if the given feature is marked as premium-only.
 * Defaults to `false` when the flag is not found.
 */
export function isFeaturePremium(id: string): boolean {
  const flags = getFeatureFlags();
  const flag = flags.find((f) => f.id === id);
  return flag?.premium ?? false;
}
