/**
 * Interpretation Upgrade — Shared Type Definitions
 *
 * Foundation types for the narrative-first interpretation system.
 * Used by both Tử Vi and Chiêm Tinh modules for ETC (Effects Then Causes)
 * narrative generation, archetype detection, and life-area synthesis.
 */

// ═══════════════════════════════════════════════════════════════════
// Life Area Types
// ═══════════════════════════════════════════════════════════════════

/** The 12 life areas that narratives are organized around */
export type LifeAreaType = 'personality' | 'love' | 'career' | 'health' | 'growth' | 'wealth' | 'parents' | 'karma' | 'property' | 'travel' | 'servants' | 'children' | 'siblings';

/** All life area types in display order */
export const LIFE_AREA_ORDER: readonly LifeAreaType[] = [
    'personality', 'parents', 'karma', 'property', 'career', 'servants', 'travel', 'health', 'wealth', 'children', 'love', 'siblings', 'growth'
] as const;

/** Display metadata for each life area */
export const LIFE_AREA_META: Record<LifeAreaType, {
    icon: string;
    title: string;
    subtitle: string;
    emoji: string;
}> = {
    personality: {
        icon: 'psychology',
        title: 'Tính Cách & Bản Ngã',
        subtitle: 'Khám phá con người thật (Cung Mệnh)',
        emoji: '🪞',
    },
    parents: {
        icon: 'family_restroom',
        title: 'Gia Đình & Cha Mẹ',
        subtitle: 'Nền tảng giáo dục (Cung Phụ Mẫu)',
        emoji: '👨‍👩‍👦',
    },
    karma: {
        icon: 'spa',
        title: 'Tâm Thức & Phước Báu',
        subtitle: 'Dòng chảy nghiệp lực (Cung Phúc Đức)',
        emoji: '🙏',
    },
    property: {
        icon: 'home',
        title: 'Điền Sản & Nơi Chốn',
        subtitle: 'Tài sản cố định (Cung Điền Trạch)',
        emoji: '🏠',
    },
    career: {
        icon: 'work',
        title: 'Sự Nghiệp & Danh Vọng',
        subtitle: 'Con đường công danh (Cung Quan Lộc)',
        emoji: '💼',
    },
    servants: {
        icon: 'groups',
        title: 'Đồng Nghiệp & Cấp Dưới',
        subtitle: 'Mạng lưới quan hệ (Cung Nô Bộc)',
        emoji: '🤝',
    },
    travel: {
        icon: 'flight_takeoff',
        title: 'Di Chuyển & Xã Hội',
        subtitle: 'Hoạt động bên ngoài (Cung Thiên Di)',
        emoji: '✈️',
    },
    health: {
        icon: 'self_improvement',
        title: 'Sức Khỏe & Thể Chất',
        subtitle: 'Tình trạng sinh học (Cung Tật Ách)',
        emoji: '🧘',
    },
    wealth: {
        icon: 'payments',
        title: 'Tài Chính & Dòng Tiền',
        subtitle: 'Khả năng kiếm tiền (Cung Tài Bạch)',
        emoji: '💰',
    },
    children: {
        icon: 'child_care',
        title: 'Con Cái & Thế Hệ Sau',
        subtitle: 'Hậu duệ và sáng tạo (Cung Tử Tức)',
        emoji: '👶',
    },
    love: {
        icon: 'favorite',
        title: 'Tình Yêu & Bạn Đời',
        subtitle: 'Hôn nhân và gắn kết (Cung Phu Thê)',
        emoji: '❤️',
    },
    siblings: {
        icon: 'people',
        title: 'Anh Chị Em & Bạn Thân',
        subtitle: 'Mối quan hệ ngang hàng (Cung Huynh Đệ)',
        emoji: '👥',
    },
    growth: {
        icon: 'eco',
        title: 'Phát Triển & Tâm Linh',
        subtitle: 'Hành trình tiến hóa tâm hồn',
        emoji: '🌱',
    },
};

// ═══════════════════════════════════════════════════════════════════
// ETC Narrative Types
// ═══════════════════════════════════════════════════════════════════

/**
 * A complete ETC (Effects Then Causes) paragraph.
 *
 * This is the atomic unit of narrative content:
 * - hook: Personal "wow that's me" opening (15-40 words)
 * - effectParagraphs: Life impact paragraphs (80-200 words total)
 * - nuance: Growth edge / duality (40-100 words)
 * - cause: Brief astrological explanation (30-80 words)
 * - tip: Actionable advice (20-50 words)
 */
export interface ETCNarrative {
    readonly hook: string;
    readonly effectParagraphs: readonly string[];
    readonly nuance: string;
    readonly cause: string;
    readonly tip: string;
}

/** Tử Vi brightness levels for narrative content */
export type BrightnessLevel = 'mieuVuong' | 'dacBinh' | 'ham';

/** ETC narratives keyed by brightness level (Tử Vi) */
export interface BrightnessNarratives {
    readonly mieuVuong: ETCNarrative;
    readonly dacBinh: ETCNarrative;
    readonly ham: ETCNarrative;
}

/** Star narrative data per life area (Tử Vi) */
export interface StarLifeAreaData {
    readonly personality: BrightnessNarratives;
    readonly love: BrightnessNarratives;
    readonly career: BrightnessNarratives;
    readonly health: BrightnessNarratives;
    readonly growth: BrightnessNarratives;
    readonly wealth: BrightnessNarratives;
    readonly parents: BrightnessNarratives;
    readonly karma: BrightnessNarratives;
    readonly property: BrightnessNarratives;
    readonly travel: BrightnessNarratives;
    readonly servants: BrightnessNarratives;
    readonly children: BrightnessNarratives;
    readonly siblings: BrightnessNarratives;
}

/**
 * Top-level Tử Vi narrative knowledge base.
 * Star name → general narratives + optional palace-specific overrides.
 */
export type TuViNarrativeKB = Record<string, {
    general: StarLifeAreaData;
    palaceOverrides?: Record<string, Partial<StarLifeAreaData>>;
}>;

/** Planet-in-Sign narrative with life-area context (Chiêm Tinh) */
export interface PlanetSignNarrative {
    readonly personality: ETCNarrative;
    readonly love: ETCNarrative;
    readonly career: ETCNarrative;
    readonly health: ETCNarrative;
    readonly growth: ETCNarrative;
    readonly wealth: ETCNarrative;
    readonly parents: ETCNarrative;
    readonly karma: ETCNarrative;
    readonly property: ETCNarrative;
    readonly travel: ETCNarrative;
    readonly servants: ETCNarrative;
    readonly children: ETCNarrative;
    readonly siblings: ETCNarrative;
}

/** Aspect narrative with context-aware variations (Chiêm Tinh) */
export interface AspectNarrative {
    readonly general: ETCNarrative;
    readonly inLove?: ETCNarrative;
    readonly inCareer?: ETCNarrative;
    readonly inHealth?: ETCNarrative;
}

/** Planet-in-Sign knowledge base: planet → sign → life-area narratives */
export type PlanetInSignKB = Record<string, Record<string, PlanetSignNarrative>>;

/** Aspect knowledge base: aspect type → planet1 → planet2 → narratives */
export type AspectKB = Record<string, Record<string, Record<string, AspectNarrative>>>;

// ═══════════════════════════════════════════════════════════════════
// Life Area Narrative Result
// ═══════════════════════════════════════════════════════════════════

/** Narrative result for one life area */
export interface LifeAreaNarrative {
    readonly area: LifeAreaType;
    readonly icon: string;
    readonly title: string;
    readonly subtitle: string;
    readonly paragraphs: readonly ETCNarrative[];
    readonly keyInfluences: readonly KeyInfluence[];
}

/** A contributing astrological factor to a narrative */
export interface KeyInfluence {
    readonly name: string;
    readonly description: string;
}

// ═══════════════════════════════════════════════════════════════════
// Archetype Types
// ═══════════════════════════════════════════════════════════════════

/** Archetype category for organization */
export type ArchetypeCategory =
    | 'leadership'
    | 'creative'
    | 'analytical'
    | 'relational'
    | 'adventurer';

/** Matching criteria for Tử Vi chart data */
export interface TuViMatchCriteria {
    readonly requiredStars?: readonly { star: string; minBrightness?: BrightnessLevel; palace?: string }[];
    readonly requiredPatterns?: readonly string[];
    readonly requiredElements?: readonly string[];
    readonly bonusConditions?: readonly string[];
}

/** Matching criteria for Chiêm Tinh chart data */
export interface ChiemTinhMatchCriteria {
    readonly requiredPlacements?: readonly { planet: string; sign?: string; house?: number }[];
    readonly requiredPatterns?: readonly string[];
    readonly dominantElement?: string;
    readonly dominantModality?: string;
}

/** Full personality archetype definition */
export interface Archetype {
    readonly id: string;
    readonly name: string;                 // "Nhà Chiến Lược Trực Giác"
    readonly nameEn: string;               // "The Intuitive Strategist"
    readonly emoji: string;                // "🎯"
    readonly category: ArchetypeCategory;
    readonly element: string;              // "Nước & Lửa"
    readonly shortDescription: string;     // ~50 words
    readonly fullDescription: string;      // ~200 words
    readonly definingTraits: readonly string[];   // ["Quyết đoán", "Trực giác mạnh"]
    readonly shadowTraits: readonly string[];     // ["Cố chấp", "Khó ủy quyền"]
    readonly tuViCriteria?: TuViMatchCriteria;
    readonly chiemTinhCriteria?: ChiemTinhMatchCriteria;
}

// ═══════════════════════════════════════════════════════════════════
// Strength / Challenge Types
// ═══════════════════════════════════════════════════════════════════

/** A single strength or challenge item */
export interface TraitItem {
    readonly label: string;
    readonly description: string;
    readonly icon?: string;
}

// ═══════════════════════════════════════════════════════════════════
// Overall Narrative Result
// ═══════════════════════════════════════════════════════════════════

/** Narrative introduction / prologue block */
export interface IntroductionBlock {
    readonly title: string;
    readonly paragraphs: readonly string[];
}

/** Executive Summary block */
export interface ExecutiveSummaryBlock {
    readonly title: string;
    readonly coreArchetype: string;
    readonly dominantTraits: readonly string[];
    readonly careerDirection: string;
    readonly coreAdvice: string;
    readonly summaryParagraph: string;
}

/** Yearly outlook energy brief */
export interface YearlyOutlookBlock {
    readonly year: number;
    readonly title: string;
    readonly summary: string;
    readonly keyThemes: readonly string[];
    readonly advice: string;
}

/** The complete narrative result for a chart interpretation */
export interface NarrativeResult {
    readonly archetype: {
        readonly id: string;
        readonly name: string;
        readonly nameEn: string;
        readonly description: string;
        readonly element: string;
        readonly emoji: string;
    };
    readonly definingTraits: readonly string[];
    readonly readingTimeMinutes: number;
    readonly introduction: IntroductionBlock;
    readonly executiveSummary: ExecutiveSummaryBlock;
    readonly lifeAreas: readonly LifeAreaNarrative[];
    readonly strengths: readonly TraitItem[];
    readonly challenges: readonly TraitItem[];
    readonly yearlyOutlook: YearlyOutlookBlock;
    readonly closingAdvice: string;
    readonly closingMeditation: string;
}

// ═══════════════════════════════════════════════════════════════════
// Synthesis Engine Types
// ═══════════════════════════════════════════════════════════════════

/** Astrology system discriminator */
export type AstrologySystem = 'tuvi' | 'chiemtinh';

/** Combination weight strategy for life area synthesis */
export type CombinationWeight =
    | 'primary_dominant'
    | 'sun_dominant'
    | 'venus_dominant'
    | 'mc_dominant'
    | 'asc_dominant'
    | 'node_dominant'
    | 'moon_dominant'
    | 'jupiter_dominant'
    | 'saturn_dominant'
    | 'mercury_dominant'
    | 'equal';

/** Data source mapping for a single life area within one astrology system */
export interface LifeAreaSourceConfig {
    readonly primaryPalaces?: readonly string[];
    readonly secondaryPalaces?: readonly string[];
    readonly primaryPlacements?: readonly string[];
    readonly secondaryPlacements?: readonly string[];
    readonly supportingData?: readonly string[];
    readonly combinationWeight: CombinationWeight;
}

/** Complete life area source map for one astrology system */
export type LifeAreaSourceMap = Record<LifeAreaType, LifeAreaSourceConfig>;
