import type { BirthContext } from '../shared/birthContext';

/**
 * Phase 3: Tử Vi Module — TypeScript Type Definitions
 * 
 * These types represent the domain model for Tử Vi Đẩu Số charts,
 * adapted from iztro's output structure with Vietnamese-specific naming.
 */

/** Gender for chart generation */
export type Gender = 'male' | 'female';

/** Star brightness levels */
export type StarBrightness = '庙' | '旺' | '得' | '利' | '平' | '不' | '陷' | '';

/** Map brightness to Vietnamese display names (supports both Chinese and vi-VN keys) */
export const BRIGHTNESS_LABELS: Record<string, string> = {
    '庙': 'Miếu',
    '旺': 'Vượng',
    '得': 'Đắc',
    '利': 'Lợi',
    '平': 'Bình',
    '不': 'Bất Đắc',
    '陷': 'Hãm',
    '': '',
    // vi-VN locale keys (iztro returns these when locale is vi-VN)
    'Miếu': 'Miếu',
    'Vượng': 'Vượng',
    'Đắc': 'Đắc',
    'Lợi': 'Lợi',
    'Bình': 'Bình',
    'Bất': 'Bất Đắc',
    'Hãm': 'Hãm',
};

/** Abbreviated brightness for inline display in palace cells (supports both Chinese and vi-VN keys) */
export const BRIGHTNESS_ABBREV: Record<string, string> = {
    // Chinese character keys (iztro compat)
    '庙': 'M',
    '旺': 'V',
    '得': 'Đ',
    '利': 'B',
    '平': 'B',
    '不': '',
    '陷': 'H',
    '': '',
    // vi-VN full name keys (native engine stores these)
    'Miếu': 'M',      // Miếu Địa
    'Vượng': 'V',     // Vượng Địa
    'Đắc': 'Đ',      // Đắc Địa
    'Hòa': 'B',      // Bình Hòa
    'Lợi': 'B',      // Lợi (variant — same tier as Bình Hòa)
    'Bình': 'B',      // Bình Hòa
    'Bất': '',        // Bất Đắc (rare — leave blank)
    'Hãm': 'H',      // Hãm Địa
};

/** Tứ Hóa transformation types */
export type MutagenType = '禄' | '权' | '科' | '忌';

/** Map Tứ Hóa to Vietnamese labels and CSS classes (supports both Chinese and vi-VN keys) */
export const MUTAGEN_CONFIG: Record<string, { label: string; cssClass: string }> = {
    '禄': { label: 'Hóa Lộc', cssClass: 'tuvi-hua-loc' },
    '权': { label: 'Hóa Quyền', cssClass: 'tuvi-hua-quyen' },
    '科': { label: 'Hóa Khoa', cssClass: 'tuvi-hua-khoa' },
    '忌': { label: 'Hóa Kỵ', cssClass: 'tuvi-hua-ky' },
    // vi-VN locale keys (iztro returns these when locale is vi-VN)
    'Lộc': { label: 'Hóa Lộc', cssClass: 'tuvi-hua-loc' },
    'Quyền': { label: 'Hóa Quyền', cssClass: 'tuvi-hua-quyen' },
    'Khoa': { label: 'Hóa Khoa', cssClass: 'tuvi-hua-khoa' },
    'Kỵ': { label: 'Hóa Kỵ', cssClass: 'tuvi-hua-ky' },
};

/** Star type classification for styling */
export type StarType = 'major' | 'soft' | 'tough' | 'adjective' | 'tianma' | 'lucun' | 'helper';

/** Star scope (native or dynamic period) */
export type StarScope = 'origin' | 'decadal' | 'yearly' | 'monthly' | 'daily' | 'hourly';

/** Individual star representation */
export interface TuViStar {
    readonly name: string;
    readonly type: StarType;
    readonly scope: StarScope;
    readonly brightness: string;
    readonly mutagen?: string[];
    readonly element?: string; // Ngũ Hành of star (e.g., 'Âm Thổ', 'Dương Hỏa')
    readonly alternateName?: string; // Regional variant name
    readonly schoolSource?: string;  // Which school uses this name
}

/** 
 * Represents a "Flying Star" (Phi Tinh) Si Hua flow link between palaces.
 */
export interface SihuaFlow {
    readonly targetPalace: string;    // Name of the destination palace (Earthly Branch)
    readonly sourcePalace: string;    // Name of the source palace (Earthly Branch)
    readonly targetStar: string;      // Star that receives the mutagen
    readonly mutagen: MutagenType;    // 禄, 权, 科, 忌
    readonly isSelfHua: boolean;      // True if it triggers a star in its own palace
}

/** Stage (Đại Hạn) range for a palace */
export interface StageInfo {
    readonly range: [number, number]; // [startAge, endAge]
    readonly heavenlyStem: string;    // Can of the stage
}

/** 
 * Represents an interpreted pattern (Cách Cục) found in a chart
 */
export interface DetectedPattern {
    readonly id: string;
    readonly category: string;
    readonly name: string;
    readonly description: string;
    readonly isPure: boolean; // True if no malefic stars break the pattern (Thượng Cách)
    readonly relatedPalaces: string[]; // Names of the palaces forming this pattern
}
/** Palace data structure */
export interface TuViPalace {
    readonly name: string;
    readonly earthlyBranch: string;
    readonly heavenlyStem: string;
    readonly isSoulPalace?: boolean;
    readonly isBodyPalace?: boolean;

    // Core Stars
    readonly majorStars: readonly TuViStar[];
    readonly minorStars?: readonly TuViStar[];
    readonly adjectiveStars?: readonly TuViStar[];

    // Auxiliary
    readonly stage: StageInfo;
    readonly ages?: readonly number[];
    readonly changsheng12?: string;
    readonly boshi12?: string;

    // Epic 3: Temporal Overlays
    readonly decadalName?: string;
    readonly yearlyName?: string;
    readonly decadalStars?: readonly TuViStar[];
    readonly yearlyStars?: readonly TuViStar[];

    // Tuần Không / Triệt Không palace-level markers
    readonly hasTuanKhong?: boolean;
    readonly hasTrietKhong?: boolean;
    readonly sihuaFlows?: SihuaFlow[];
}

/** Fixed palace position on the 4x4 grid, mapped by Earthly Branch */
export interface GridPosition {
    readonly row: number;
    readonly col: number;
}

/** Birth hour (Thời) options — the 13 time slots (0=Tý sớm through 12=Tý muộn) */
export interface BirthHourOption {
    readonly index: number;
    readonly label: string;
    readonly timeRange: string;
}

export const BIRTH_HOURS: readonly BirthHourOption[] = [
    { index: 0, label: 'Tý (sớm)', timeRange: '23:00 - 01:00' },
    { index: 1, label: 'Sửu', timeRange: '01:00 - 03:00' },
    { index: 2, label: 'Dần', timeRange: '03:00 - 05:00' },
    { index: 3, label: 'Mão', timeRange: '05:00 - 07:00' },
    { index: 4, label: 'Thìn', timeRange: '07:00 - 09:00' },
    { index: 5, label: 'Tỵ', timeRange: '09:00 - 11:00' },
    { index: 6, label: 'Ngọ', timeRange: '11:00 - 13:00' },
    { index: 7, label: 'Mùi', timeRange: '13:00 - 15:00' },
    { index: 8, label: 'Thân', timeRange: '15:00 - 17:00' },
    { index: 9, label: 'Dậu', timeRange: '17:00 - 19:00' },
    { index: 10, label: 'Tuất', timeRange: '19:00 - 21:00' },
    { index: 11, label: 'Hợi', timeRange: '21:00 - 23:00' },
    { index: 12, label: 'Tý (muộn)', timeRange: '23:00 - 01:00' },
] as const;

/** Complete chart data for rendering */
export interface TuViChartData {
    readonly solarDate: string;
    readonly lunarDate: string;
    readonly chineseDate: string;
    readonly time: string;
    readonly timeRange: string;
    readonly sign: string;
    readonly zodiac: string;
    readonly earthlyBranchOfSoulPalace: string;
    readonly earthlyBranchOfBodyPalace: string;
    readonly soul: string;
    readonly body: string;
    readonly fiveElementsClass: string;
    readonly palaces: TuViPalace[];

    // Extended fields for center panel (reference image)
    readonly yearStemBranch?: string;   // e.g. "Ất Sửu"
    readonly monthStemBranch?: string;  // e.g. "Kỷ Sửu"
    readonly dayStemBranch?: string;    // e.g. "Giáp Tuất"
    readonly hourStemBranch?: string;   // e.g. "Ất Sửu"
    readonly bodyPalaceName?: string;   // Name of palace where Thân resides

    // Phase 1 ↔ Phase 3 Integration (sharedCore bridge)
    readonly napAmYear?: string;              // Nạp Âm of birth year e.g. "Hải Trung Kim"
    readonly solarTerm?: string;              // Solar Term at birth date e.g. "Đông Chí"
    readonly birthHourQuality?: string;       // "Giờ Hoàng Đạo" or "Giờ Hắc Đạo"
    readonly lunarDateCrossValidation?: string | null; // null = consistent, string = warning

    // Extended center-panel fields (reference image)
    readonly lunarDay?: number;               // Lunar day number e.g. 21
    readonly lunarMonth?: number;             // Lunar month number e.g. 12
    readonly lunarYear?: number;              // Lunar year number
    readonly yinYangLabel?: string;           // "Âm Nam" / "Dương Nữ" etc.
    readonly targetYearStemBranch?: string;   // Can-Chi of the target/current year e.g. "Bính Ngọ"

    // Advanced Tử Vi analysis fields
    readonly cucElement?: string;             // Element of Cục: "Kim", "Mộc", "Thủy", "Hỏa", "Thổ"
    readonly cucNumber?: string;              // Cục number text: "Nhị", "Tam", "Tứ", "Ngũ", "Lục"
    readonly saoChucCuc?: string;             // Ruler star of the Cục
    readonly amDuongLy?: string;              // "Thuận lý" or "Nghịch lý"
    readonly cucMenhRelation?: string;        // "Cục sinh Mệnh", "Mệnh sinh Cục", "Cục khắc Mệnh", etc.
    readonly laiNhanCung?: string;            // Lai nhân cung (previous life palace)
    readonly nguyenThan?: string;             // Nguyên thần (original spirit)
    readonly huyenKhi?: string;              // Huyền khí (mystical energy)
    readonly daoHoaBranch?: string;           // Đào Hoa branch derived from birth year branch
    readonly sihuaFlows?: SihuaFlow[];
}

/** Astrological school for regional rule sets */
export type SchoolStrategy = 'vi' | 'cn' | 'tw';

/** User input for chart generation */
export interface ChartInput {
    readonly dateType: 'solar' | 'lunar';
    readonly solarDate: string;           // Used when dateType='solar' (YYYY-M-D)
    readonly lunarDay?: number;           // Used when dateType='lunar'
    readonly lunarMonth?: number;         // Used when dateType='lunar'
    readonly lunarYear?: number;          // Used when dateType='lunar'
    readonly timeIndex: number;
    readonly gender: Gender;
    readonly name: string;
    readonly isLeapMonth?: boolean;
    readonly timeZone?: number;           // UTC offset in hours, default 7 (GMT+7)
    readonly targetYear?: number;         // Added for Epic 3: Temporal Overlays
    readonly school?: SchoolStrategy;
    /** Optional: BirthContext with TST-corrected time data. When provided, timeIndex is overridden. */
    readonly birthContext?: BirthContext;
}
