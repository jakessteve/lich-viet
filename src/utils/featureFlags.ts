/**
 * featureFlags.ts — Persistent feature flag utility
 *
 * Flags are stored in localStorage so admin toggles survive page reloads.
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

const STORAGE_KEY = 'admin_feature_flags';

/** Default flag definitions — source of truth for first-run */
export const DEFAULT_FEATURE_FLAGS: FeatureFlag[] = [
  { id: 'am-lich',    name: 'Âm Lịch',              description: 'Tra cứu ngày âm lịch, can chi, tiết khí',             module: 'Core',           enabled: true,  premium: false },
  { id: 'dung-su',   name: 'Lịch Dụng Sự',          description: 'Tìm ngày tốt cho các việc quan trọng',               module: 'Core',           enabled: true,  premium: false },
  { id: 'gieo-que',  name: 'Gieo Quẻ Mai Hoa',       description: 'Bói Dịch Mai Hoa Dịch Số',                           module: 'Divination',     enabled: true,  premium: false },
  { id: 'tu-vi',     name: 'Tử Vi',                  description: 'Lập và luận giải lá số Tử Vi',                       module: 'Astrology',      enabled: true,  premium: false },
  { id: 'chiem-tinh',name: 'Chiêm Tinh',             description: 'Bản đồ sao phương Tây',                              module: 'Astrology',      enabled: true,  premium: false },
  { id: 'dai-han',   name: 'Đại Hạn 10 năm',         description: 'Phân tích vận hạn theo chu kỳ 10 năm',               module: 'Astrology',      enabled: true,  premium: false },
  { id: 'luu-nien',  name: 'Lưu Niên',               description: 'Phân tích vận hạn hàng năm',                         module: 'Astrology',      enabled: true,  premium: false },
  { id: 'pdf-export',name: 'Xuất PDF',               description: 'Xuất báo cáo chi tiết dạng PDF',                     module: 'Export',         enabled: true,  premium: false },
  { id: 'narrative', name: 'Luận giải tường thuật',  description: 'Narrative-first interpretation (ETC format)',        module: 'Interpretation', enabled: true,  premium: false },
  { id: 'archetype', name: 'Nguyên mẫu tính cách',   description: 'Phát hiện archetype từ lá số',                       module: 'Interpretation', enabled: true,  premium: false },
  { id: 'than-so',   name: 'Thần Số Học',            description: 'Numerology theo hệ Pythagoras & Chaldean',            module: 'Divination',     enabled: true,  premium: false },
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
    const raw = localStorage.getItem(STORAGE_KEY);
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
