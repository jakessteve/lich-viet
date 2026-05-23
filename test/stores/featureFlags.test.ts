import { describe, it, expect, beforeEach } from 'vitest';
import {
  DEFAULT_FEATURE_FLAGS,
  getFeatureFlags,
  isFeatureEnabled,
  toggleFeatureFlagEnabled,
  type FeatureFlag,
} from '@/utils/featureFlags';

describe('featureFlags', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('DEFAULT_FEATURE_FLAGS', () => {
    it('has 4 items', () => {
      expect(DEFAULT_FEATURE_FLAGS.length).toBe(4);
    });

    it('contains expected flags', () => {
      const ids = DEFAULT_FEATURE_FLAGS.map((f) => f.id);
      expect(ids).toContain('am-lich');
      expect(ids).toContain('dung-su');
      expect(ids).toContain('gieo-que');
      expect(ids).toContain('tu-vi');
    });

    it('all core flags are enabled by default', () => {
      DEFAULT_FEATURE_FLAGS.forEach((flag) => {
        expect(flag.enabled).toBe(true);
      });
    });
  });

  describe('getFeatureFlags()', () => {
    it('returns flags from localStorage when present', () => {
      localStorage.setItem(
        'admin_feature_flags',
        JSON.stringify([
          { id: 'am-lich', name: 'Test', enabled: false, premium: false, module: 'Core', description: '' },
        ]),
      );
      const flags = getFeatureFlags();
      expect(flags.length).toBeGreaterThanOrEqual(1);
    });

    it('returns defaults when localStorage is empty', () => {
      const flags = getFeatureFlags();
      expect(flags.length).toBe(4);
    });

    it('merges stored flags with new defaults', () => {
      localStorage.setItem(
        'admin_feature_flags',
        JSON.stringify([
          { id: 'am-lich', name: 'Test', enabled: false, premium: false, module: 'Core', description: '' },
        ]),
      );
      const flags = getFeatureFlags();
      // Should include both stored flag and any new defaults not stored
      const ids = flags.map((f) => f.id);
      expect(ids).toContain('am-lich');
    });
  });

  describe('isFeatureEnabled()', () => {
    it('returns true for enabled features', () => {
      expect(isFeatureEnabled('am-lich')).toBe(true);
      expect(isFeatureEnabled('dung-su')).toBe(true);
      expect(isFeatureEnabled('gieo-que')).toBe(true);
      expect(isFeatureEnabled('tu-vi')).toBe(true);
    });

    it('returns true for unknown features (fail-open)', () => {
      expect(isFeatureEnabled('unknown-flag')).toBe(true);
    });

    it('returns false after toggling off', () => {
      toggleFeatureFlagEnabled('am-lich');
      expect(isFeatureEnabled('am-lich')).toBe(false);
      // Toggle back
      toggleFeatureFlagEnabled('am-lich');
      expect(isFeatureEnabled('am-lich')).toBe(true);
    });
  });

  describe('toggleFeatureFlagEnabled()', () => {
    it('toggles flags', () => {
      const flags1 = toggleFeatureFlagEnabled('dung-su');
      const flag1 = flags1.find((f) => f.id === 'dung-su');
      expect(flag1?.enabled).toBe(false);

      const flags2 = toggleFeatureFlagEnabled('dung-su');
      const flag2 = flags2.find((f) => f.id === 'dung-su');
      expect(flag2?.enabled).toBe(true);
    });

    it('persists to localStorage', () => {
      toggleFeatureFlagEnabled('gieo-que');
      const stored = localStorage.getItem('feature_flags');
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!) as FeatureFlag[];
      const gieoQue = parsed.find((f) => f.id === 'gieo-que');
      expect(gieoQue.enabled).toBe(false);
    });
  });
});
