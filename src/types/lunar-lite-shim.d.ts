/**
 * Type shim for lunar-lite — provides the types that iztro's .d.ts files reference.
 * These are inlined from lunar-lite@0.2.8 to avoid needing the npm package.
 */

declare module 'lunar-lite/lib/types' {
  export const HEAVENLY_STEMS: readonly ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  export const EARTHLY_BRANCHES: readonly ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

  export type HeavenlyStem = (typeof HEAVENLY_STEMS)[number];
  export type EarthlyBranch = (typeof EARTHLY_BRANCHES)[number];
  export type HeavenlyStemAndEarthlyBranch = [HeavenlyStem, EarthlyBranch];

  export type LunarDate = {
    lunarYear: number;
    lunarMonth: number;
    lunarDay: number;
    isLeap: boolean;
    toString: (toCnStr?: boolean) => string;
  };

  export type HeavenlyStemAndEarthlyBranchDate = {
    yearly: HeavenlyStemAndEarthlyBranch;
    monthly: HeavenlyStemAndEarthlyBranch;
    daily: HeavenlyStemAndEarthlyBranch;
    hourly: HeavenlyStemAndEarthlyBranch;
    toString: () => string;
  };
}
