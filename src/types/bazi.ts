/**
 * Bazi Types — Bát Tự / Tứ Trụ (Four Pillars of Destiny) Type Definitions
 *
 * Extracted from baziEngine.ts for modular architecture.
 */

import type { Can, Chi } from './calendar';

// ── Core Types ──────────────────────────────────────────────────

export type BaziSchool = 'vi' | 'cn' | 'tw';

export interface BaziInput {
  dateObj: Date;
  exactTstHour: number;
  isMale: boolean;
  longitude: number;
  school: BaziSchool;
}

export type NguHanh = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';
export type DayMasterStrength = 'vượng' | 'trung_bình' | 'suy';
export type CachCuc = string;

export interface Pillar {
  label: string;
  labelVi: string;
  can: Can;
  chi: Chi;
  canElement: NguHanh;
  chiElement: NguHanh;
  napAm: string;
  napAmElement: NguHanh;
}

export interface DayMasterAnalysis {
  dayMaster: Can;
  dayMasterElement: NguHanh;
  strength: DayMasterStrength;
  strengthLabel: string;
  strengthExplanation: string;
  favorableElements: NguHanh[];
  unfavorableElements: NguHanh[];
}

export interface ThanSat {
  name: string;
  nameVi: string;
  nature: 'cat' | 'hung' | 'trung';
  pillar: string;
  description: string;
}

export interface LuckCycle {
  startAge: number;
  endAge: number;
  can: Can;
  chi: Chi;
  element: NguHanh;
  napAm: string;
  rating: 'cat' | 'hung' | 'trung';
  description: string;
  /** Ten God relationship of this cycle's Can to the Day Master */
  thapThan?: string;
  /** Rich interpretation by domain */
  interpretation?: {
    overall: string;
    career: string;
    finance: string;
    relationship: string;
  };
}

export interface DieuHau {
  season: string;
  climate: string;
  neededElement: NguHanh;
  assessment: string;
}

export interface ThapThanEntry {
  pillar: string;
  position: 'can' | 'chi_tang';
  stem: Can;
  stemElement: NguHanh;
  god: string;
  godNature: 'cat' | 'hung' | 'trung';
}

export interface TangCanEntry {
  chi: Chi;
  hiddenStems: { can: Can; element: NguHanh; strength: 'chính_khí' | 'trung_khí' | 'dư_khí' }[];
}

export type BranchInteractionType = 'luc_hop' | 'tam_hop' | 'luc_xung' | 'tuong_hinh' | 'tuong_hai';

export interface BranchInteraction {
  type: BranchInteractionType;
  typeLabel: string;
  branches: Chi[];
  pillars: string[];
  nature: 'cat' | 'hung' | 'trung';
  description: string;
}

export interface TruongSinhEntry {
  pillarName: string;
  branch: Chi;
  phase: string;
  quality: string;
  meaning: string;
}

export interface BaziChart {
  birthDate: Date;
  birthHour: number;
  school: BaziSchool;
  /** Four Pillars */
  yearPillar: Pillar;
  monthPillar: Pillar;
  dayPillar: Pillar;
  hourPillar: Pillar;
  /** Day Master Analysis (Tử Bình) */
  dayMaster: DayMasterAnalysis;
  /** Pattern Classification (Cách Cục) */
  cachCuc: { name: string; description: string };
  /** Seasonal Adjustment (Điều Hậu) */
  dieuHau: DieuHau;
  /** Element distribution */
  elementCount: Record<NguHanh, number>;
  /** Thần Sát (Spirit Killers / Star Gods) */
  thanSat: ThanSat[];
  /** Đại Vận (10-year Luck Cycles) */
  luckCycles: LuckCycle[];
  /** Thập Thần (Ten Gods) */
  thapThan: ThapThanEntry[];
  /** Tàng Can (Hidden Stems) */
  tangCan: TangCanEntry[];
  /** Branch Interactions (Hợp/Xung/Hình/Hại) */
  branchInteractions: BranchInteraction[];
  /** P2.2: Không Vong (Empty Branches) */
  khongVong?: { branch1: Chi; branch2: Chi; explanation: string };
  /** P2.3: Precise Đại Vận start age */
  daiVanStartAge?: number;
  /** P3.1: Trường Sinh 12-Phase Life Cycle */
  truongSinh?: TruongSinhEntry[];
}
