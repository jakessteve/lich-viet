/**
 * Activity Scoring Configuration
 *
 * All tunable scoring thresholds and weights for the Activity Scorer engine.
 * Extracted from activityScorer.ts to keep business logic separate from data.
 *
 * ⚠️ SENSITIVE: These values define the scoring algorithm's behavior.
 *    They should be encrypted or moved server-side for production apps.
 *
 * Total max theoretical score:  30 + 25 + 15 + 15 + 10 + 5 = 100
 * Total min theoretical score: -20 + -25 + -15 + -15 + -10 + -5 = -90
 */

// ── Factor 1: Trực Match (max 30 pts) ─────────────────────────

export const TRUC_SCORING = {
    max: 30,
    /** Activity listed as Nghi (recommended) */
    nghi: 30,
    /** Activity listed as Kỵ (forbidden) */
    ky: -20,
    /** Activity listed as both Nghi and Kỵ */
    both: 5,
    /** Activity not mentioned */
    neutral: 10,
} as const;

// ── Factor 2: Star Alignment (max 25 pts) ─────────────────────

export const STAR_SCORING = {
    max: 25,
    /** Points per favorable star */
    favorableWeight: 8,
    /** Points per opposing star */
    opposingWeight: -10,
} as const;

// ── Factor 3: Day Grade (max 15 pts) ──────────────────────────

export const DAY_GRADE_SCORING = {
    max: 15,
    /** Hoàng Đạo bonus */
    hoangDaoBonus: 8,
    /** Chuyên/Nghĩa nhật bonus */
    chuyenNghiaNhatBonus: 7,
    /** Bảo nhật bonus */
    baoNhatBonus: 4,
    /** Phạt nhật penalty */
    phatNhatPenalty: -8,
} as const;

// ── Factor 4: Hour Quality (max 15 pts) ───────────────────────

export const HOUR_SCORING = {
    max: 15,
    /** Normalization base (subtract from hour score 0-100) */
    normBase: 50,
    /** Normalization scale divisor */
    normScale: 50,
} as const;

// ── Factor 5: Kị Tuổi (max 10 pts) ───────────────────────────

export const KI_TUOI_SCORING = {
    max: 10,
    /** Lục Hợp — very good */
    lucHop: 10,
    /** Tam Hợp — good */
    tamHop: 7,
    /** Xung — very bad */
    xung: -10,
    /** Lục Hại — bad */
    hai: -6,
    /** Hình — not good */
    hinh: -4,
    /** Phá — not good */
    pha: -3,
    /** Neutral (no interaction) */
    neutral: 3,
} as const;

// ── Factor 6: Nạp Âm Compatibility (max 5 pts) ───────────────

export const NAP_AM_SCORING = {
    max: 5,
    /** Nạp Âm compatible */
    hop: 5,
    /** Nạp Âm clashing */
    khac: -5,
    /** Neutral */
    neutral: 2,
} as const;

// ── Factor 7: QMDJ (max 10 pts) ──────────────────────────────

export const QMDJ_SCORING = {
    max: 10,
    /** Weight when QMDJ data is available (0.0-1.0) */
    weight: 1.0,
} as const;

// ── Factor 9: Bát Tự Synastry (max 20 pts) ───────────────────
// Academic sources: 三命通會, 子平真詮, 窮通寶鑑

export const BAZI_SYNASTRY_SCORING = {
    max: 20,
    /** 五行 tương sinh (Day Masters generate each other) */
    dayMasterHarmony: 15,
    /** Same element Day Masters */
    dayMasterSame: 5,
    /** 五行 tương khắc (Day Masters clash) */
    dayMasterClash: -15,
    /** Healthy spouse star (正財 for male, 正官 for female) */
    spouseStarBonus: 10,
    /** Weak or missing spouse star */
    spouseStarPenalty: -8,
    /** Nạp Âm pair compatible */
    napAmMatch: 5,
    /** Nạp Âm pair clash */
    napAmClash: -5,
    /** 用神 mutual benefit bonus */
    yongShenBonus: 8,
    /** 調候 seasonal balance bonus */
    dieuHauBonus: 5,
} as const;

// ── Factor 10: Tử Vi Synastry (max 15 pts) ───────────────────
// Academic source: 紫微斗數全書 (Tử Vi Đẩu Số Toàn Thư)

export const TUVI_SYNASTRY_SCORING = {
    max: 15,
} as const;

// ── Factor 11: Thần Số Synastry (max 10 pts) ─────────────────
// Academic source: Pythagorean Numerology

export const NUMEROLOGY_SYNASTRY_SCORING = {
    max: 10,
} as const;

// ── Factor 13: Western Synastry (max 12 pts) ─────────────────
// Academic source: Modern Western Astrology synastry conventions

export const WESTERN_SYNASTRY_SCORING = {
    max: 12,
} as const;

// ── Normalization ─────────────────────────────────────────────

export const NORMALIZATION = {
    /** Minimum theoretical raw score (F1-F8: -100, F9: -20, F10: -15, F11: -10, F13: -12) */
    minTheoretical: -157,
    /** Score range (maxTheoretical - minTheoretical = 167 - (-157)) */
    range: 324,
    /** Percentage scale */
    percentScale: 100,
    /** Min percentage output */
    percentMin: 0,
    /** Max percentage output */
    percentMax: 100,
} as const;

// ── Special Overrides ─────────────────────────────────────────

export const OVERRIDES = {
    /** Max percentage when Bách Sự Hung is active */
    bachSuHungCap: 15,
} as const;

// ── Best Hours Hourly Bonus/Penalty ───────────────────────────

export const BEST_HOURS_SCORING = {
    /** Bonus when hour nghi list mentions activity */
    nghiBonus: 10,
    /** Penalty when hour ky list mentions activity */
    kyPenalty: -15,
    /** Number of best hours to return */
    topCount: 3,
} as const;

// ── Default / Fallback Score ──────────────────────────────────

export const FALLBACK_SCORE = {
    percentage: 50,
    label: 'Trung Bình',
} as const;
