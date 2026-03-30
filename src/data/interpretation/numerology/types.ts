/**
 * Numerology Interpretation Types
 *
 * Type definitions for the rich numerology knowledge base.
 * Mirrors the ETC narrative pattern used by Tử Vi and Chiêm Tinh.
 */

// ── Core Number Meaning ────────────────────────────────────────

/** Multi-dimensional interpretation for a single number */
export interface NumberMeaning {
  /** Tổng quan — rich personality portrait (~150 words) */
  readonly overview: string;
  /** Điểm mạnh — 5-7 strengths with examples */
  readonly strengths: readonly string[];
  /** Điểm yếu — 5-7 shadow aspects with growth advice */
  readonly challenges: readonly string[];
  /** Sự nghiệp — ideal roles, work style, leadership */
  readonly career: string;
  /** Tình cảm — relationship patterns, compatibility, love language */
  readonly love: string;
  /** Sức khỏe — stress patterns, body areas, wellness */
  readonly health: string;
  /** Tài chính — earning style, spending, investment */
  readonly money: string;
  /** Tâm linh — soul lessons, karmic themes, growth path */
  readonly spiritual: string;
}

// ── Position-Specific Meaning ──────────────────────────────────

/** Positions where a core number can appear */
export type NumerologyPosition =
  | 'lifePath'
  | 'expression'
  | 'soulUrge'
  | 'personality'
  | 'birthday'
  | 'maturity';

/** Position display metadata */
export const POSITION_META: Record<NumerologyPosition, {
  readonly name: string;
  readonly nameVi: string;
  readonly description: string;
}> = {
  lifePath: { name: 'Life Path', nameVi: 'Đường Đời', description: 'Mục đích sống và con đường định mệnh' },
  expression: { name: 'Expression', nameVi: 'Biểu Đạt', description: 'Cách tài năng thể hiện ra thế giới' },
  soulUrge: { name: 'Soul Urge', nameVi: 'Linh Hồn', description: 'Khao khát và động lực nội tâm' },
  personality: { name: 'Personality', nameVi: 'Nhân Cách', description: 'Cách người khác nhìn nhận bạn' },
  birthday: { name: 'Birthday', nameVi: 'Ngày Sinh', description: 'Tài năng và năng khiếu tự nhiên' },
  maturity: { name: 'Maturity', nameVi: 'Trưởng Thành', description: 'Sự tiến hóa từ giữa đời (~35 tuổi)' },
};

/** Context-specific interpretation for a number in a specific position */
export interface PositionMeaning {
  readonly interpretation: string;
}

// ── Karmic Debt ────────────────────────────────────────────────

/** Deep karmic debt profile */
export interface KarmicDebtProfile {
  /** Origin — what the debt represents */
  readonly origin: string;
  /** How it manifests in daily life */
  readonly manifestation: string;
  /** Tests and challenges faced */
  readonly challenges: string;
  /** Path to redemption and growth */
  readonly redemption: string;
  /** Specific advice per position */
  readonly positionAdvice: Partial<Record<NumerologyPosition, string>>;
}

// ── Master Number ──────────────────────────────────────────────

/** Deep master number profile */
export interface MasterNumberProfile {
  /** The dual nature (master vs. reduced form) */
  readonly dualNature: string;
  /** When master energy activates vs falls to base */
  readonly activation: string;
  /** Historical/celebrity examples */
  readonly examples: string;
  /** Shadow of living at the master vibration */
  readonly shadow: string;
  /** Practical guidance for harnessing the energy */
  readonly guidance: string;
}

// ── Arrow & Grid ───────────────────────────────────────────────

/** Arrow interpretation (present or missing) */
export interface ArrowInterpretation {
  /** What this arrow indicates when present */
  readonly present: string;
  /** What it suggests when absent + compensating advice */
  readonly absent: string;
}

/** Missing number interpretation */
export interface MissingNumberMeaning {
  /** What having zero of this number means */
  readonly meaning: string;
  /** Development advice */
  readonly advice: string;
}

/** Number frequency interpretation */
export interface FrequencyMeaning {
  /** ×1: standard presence */
  readonly x1: string;
  /** ×2: amplified energy */
  readonly x2: string;
  /** ×3: overwhelming concentration */
  readonly x3: string;
  /** ×4+: extreme intensity */
  readonly x4plus: string;
}

// ── Number Synergy ─────────────────────────────────────────────

/** Synergy pair type */
export type SynergyCategory = 'harmonic' | 'challenging' | 'growth';

/** Synergy analysis between two core numbers */
export interface SynergyAnalysis {
  readonly category: SynergyCategory;
  readonly analysis: string;
}

/** Synergy pair keys */
export type SynergyPairKey =
  | 'lifePath_expression'
  | 'soulUrge_personality'
  | 'lifePath_maturity'
  | 'expression_birthday'
  | 'lifePath_soulUrge'
  | 'expression_personality';

// ── Pinnacle & Challenge ───────────────────────────────────────

/** Pinnacle or Challenge cycle */
export interface PinnacleCycle {
  readonly number: number;
  readonly startAge: number;
  readonly endAge: number | null; // null = onward
  readonly meaning: string;
}

export interface ChallengeCycle {
  readonly number: number;
  readonly startAge: number;
  readonly endAge: number | null;
  readonly meaning: string;
}

/** Life Period */
export interface LifePeriod {
  readonly name: string;
  readonly nameVi: string;
  readonly number: number;
  readonly startAge: number;
  readonly endAge: number | null;
  readonly meaning: string;
}

// ── Personal Cycle (Enriched) ──────────────────────────────────

/** Enriched personal year interpretation */
export interface PersonalYearMeaning {
  readonly theme: string;
  readonly focus: string;
  readonly avoid: string;
  readonly opportunities: string;
  readonly relationships: string;
}

/** Enriched personal month interpretation */
export interface PersonalMonthMeaning {
  readonly theme: string;
  readonly advice: string;
}
