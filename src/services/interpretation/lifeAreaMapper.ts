/**
 * Life Area Mapper — Routes chart data to life-area narrative data sources.
 *
 * Defines which palaces (Tử Vi) or placements (Chiêm Tinh) contribute to
 * each of the 5 life areas (personality, love, career, health, growth).
 * This is the bridge between raw chart data and the synthesis engine.
 */

import type {
    LifeAreaType,
    LifeAreaSourceMap,
    LifeAreaSourceConfig,
    AstrologySystem,
} from './types';

// ═══════════════════════════════════════════════════════════════════
// Tử Vi Life Area Source Map
// ═══════════════════════════════════════════════════════════════════

/**
 * Maps Tử Vi palace data → life area narrative sources.
 * 
 * Each life area pulls from primary palaces (dominant influence),
 * secondary palaces (supporting context), and supporting data features.
 */
export const TUVI_LIFE_AREA_MAP: LifeAreaSourceMap = {
    personality: {
        primaryPalaces: ['Mệnh'],
        secondaryPalaces: ['Thân'],
        supportingData: ['cach_cuc', 'menh_than_relationship', 'element_balance'],
        combinationWeight: 'primary_dominant',
    },
    love: {
        primaryPalaces: ['Phu Thê'],
        secondaryPalaces: ['Phúc Đức', 'Tử Tức'],
        supportingData: ['dao_hoa_hong_loan', 'tu_hoa_in_love_palaces'],
        combinationWeight: 'primary_dominant',
    },
    career: {
        primaryPalaces: ['Quan Lộc'],
        secondaryPalaces: ['Tài Bạch'],
        supportingData: ['cach_cuc_career_patterns', 'loc_ton_position'],
        combinationWeight: 'primary_dominant',
    },
    health: {
        primaryPalaces: ['Tật Ách'],
        secondaryPalaces: ['Mệnh'],
        supportingData: ['hoa_linh_position', 'element_imbalance'],
        combinationWeight: 'primary_dominant',
    },
    growth: {
        primaryPalaces: ['Phúc Đức'],
        secondaryPalaces: ['Mệnh'],
        supportingData: ['tuan_triet_positions', 'trang_sinh_stage'],
        combinationWeight: 'primary_dominant',
    },
    wealth: {
        primaryPalaces: ['Tài Bạch'],
        secondaryPalaces: ['Phúc Đức', 'Điền Trạch'],
        supportingData: ['hoa_loc_position', 'khoi_viet_position'],
        combinationWeight: 'primary_dominant',
    },
    parents: {
        primaryPalaces: ['Phụ Mẫu'],
        secondaryPalaces: ['Mệnh', 'Huynh Đệ'],
        supportingData: ['thai_duong_brightness', 'thai_am_brightness'],
        combinationWeight: 'primary_dominant',
    },
    karma: {
        primaryPalaces: ['Phúc Đức'],
        secondaryPalaces: ['Mệnh', 'Thiên Di'],
        supportingData: ['khong_kiep_position', 'kham_thien_tinh'],
        combinationWeight: 'primary_dominant',
    },
    property: {
        primaryPalaces: ['Điền Trạch'],
        secondaryPalaces: ['Tài Bạch', 'Huynh Đệ'],
        supportingData: ['loc_ton_position', 'dia_khong_dia_kiep'],
        combinationWeight: 'primary_dominant',
    },
    travel: {
        primaryPalaces: ['Thiên Di'],
        secondaryPalaces: ['Mệnh', 'Tài Bạch'],
        supportingData: ['thien_ma_position', 'tuan_triet_at_thien_di'],
        combinationWeight: 'primary_dominant',
    },
    servants: {
        primaryPalaces: ['Nô Bộc'],
        secondaryPalaces: ['Phụ Mẫu', 'Huynh Đệ'],
        supportingData: ['ta_huu_position', 'sat_pha_tham'],
        combinationWeight: 'primary_dominant',
    },
    children: {
        primaryPalaces: ['Tử Tức'],
        secondaryPalaces: ['Phu Thê', 'Huynh Đệ'],
        supportingData: ['diem_tin_children_stars'],
        combinationWeight: 'primary_dominant',
    },
    siblings: {
        primaryPalaces: ['Huynh Đệ'],
        secondaryPalaces: ['Điền Trạch', 'Nô Bộc'],
        supportingData: ['tuan_triet_positions'],
        combinationWeight: 'primary_dominant',
    },
};

// ═══════════════════════════════════════════════════════════════════
// Chiêm Tinh Life Area Source Map
// ═══════════════════════════════════════════════════════════════════

/**
 * Maps Chiêm Tinh planet/house data → life area narrative sources.
 * 
 * Uses placement identifiers like "Sun_sign", "Venus_house" that the
 * synthesis engine will resolve against the natal chart data.
 */
export const CHIEMTINH_LIFE_AREA_MAP: LifeAreaSourceMap = {
    personality: {
        primaryPlacements: ['Sun_sign', 'Moon_sign', 'ASC_sign'],
        secondaryPlacements: ['Mercury_sign', 'chart_pattern'],
        supportingData: ['element_balance', 'modality_balance'],
        combinationWeight: 'sun_dominant',
    },
    love: {
        primaryPlacements: ['Venus_sign', 'Venus_house', 'Mars_sign'],
        secondaryPlacements: ['7th_house_ruler', 'Moon_aspects'],
        supportingData: ['venus_aspects', 'mars_aspects'],
        combinationWeight: 'venus_dominant',
    },
    career: {
        primaryPlacements: ['MC_sign', 'Saturn_sign', '10th_house_ruler'],
        secondaryPlacements: ['Mars_house', 'Jupiter_aspects'],
        supportingData: ['saturn_aspects', 'career_houses'],
        combinationWeight: 'mc_dominant',
    },
    health: {
        primaryPlacements: ['ASC_ruler_sign', '6th_house_ruler'],
        secondaryPlacements: ['Mars_aspects', 'Sun_sign'],
        supportingData: ['health_aspects', 'element_balance'],
        combinationWeight: 'asc_dominant',
    },
    growth: {
        primaryPlacements: ['North_Node_sign', 'North_Node_house'],
        secondaryPlacements: ['12th_house_ruler', 'Chiron_sign', 'Jupiter_sign'],
        supportingData: ['node_aspects', 'outer_planet_aspects'],
        combinationWeight: 'node_dominant',
    },
    wealth: {
        primaryPlacements: ['Venus_sign', '2nd_house_ruler'],
        secondaryPlacements: ['Jupiter_sign', '8th_house_ruler'],
        supportingData: ['venus_aspects', 'jupiter_aspects'],
        combinationWeight: 'venus_dominant',
    },
    parents: {
        primaryPlacements: ['4th_house_ruler', '10th_house_ruler'],
        secondaryPlacements: ['Moon_sign', 'Saturn_sign'],
        supportingData: ['sun_aspects', 'moon_aspects'],
        combinationWeight: 'moon_dominant',
    },
    karma: {
        primaryPlacements: ['12th_house_ruler', 'South_Node_sign'],
        secondaryPlacements: ['Saturn_sign', 'Pluto_sign'],
        supportingData: ['node_aspects', 'saturn_aspects'],
        combinationWeight: 'saturn_dominant',
    },
    property: {
        primaryPlacements: ['4th_house_ruler', 'Taurus_house'],
        secondaryPlacements: ['Venus_sign', 'Moon_sign'],
        supportingData: ['venus_aspects', 'jupiter_aspects'],
        combinationWeight: 'venus_dominant',
    },
    travel: {
        primaryPlacements: ['9th_house_ruler', 'Jupiter_sign'],
        secondaryPlacements: ['3rd_house_ruler', 'Mercury_sign'],
        supportingData: ['sagittarius_house', 'gemini_house'],
        combinationWeight: 'jupiter_dominant',
    },
    servants: {
        primaryPlacements: ['6th_house_ruler', 'Virgo_house'],
        secondaryPlacements: ['Saturn_sign', 'Mercury_sign'],
        supportingData: ['saturn_aspects', 'mercury_aspects'],
        combinationWeight: 'mercury_dominant',
    },
    children: {
        primaryPlacements: ['5th_house_ruler', 'Leo_house'],
        secondaryPlacements: ['Sun_sign', 'Moon_sign'],
        supportingData: ['sun_aspects', 'jupiter_aspects'],
        combinationWeight: 'sun_dominant',
    },
    siblings: {
        primaryPlacements: ['3rd_house_ruler', 'Gemini_house'],
        secondaryPlacements: ['Mercury_sign', 'Mars_sign'],
        supportingData: ['mercury_aspects'],
        combinationWeight: 'mercury_dominant',
    },
};

// ═══════════════════════════════════════════════════════════════════
// Mapper Functions
// ═══════════════════════════════════════════════════════════════════

/**
 * Get the source configuration for a specific life area and astrology system.
 */
export function getLifeAreaSources(
    system: AstrologySystem,
    area: LifeAreaType,
): LifeAreaSourceConfig {
    const map = system === 'tuvi' ? TUVI_LIFE_AREA_MAP : CHIEMTINH_LIFE_AREA_MAP;
    return map[area];
}

/**
 * Get the complete source map for an astrology system.
 */
export function getSystemSourceMap(system: AstrologySystem): LifeAreaSourceMap {
    return system === 'tuvi' ? TUVI_LIFE_AREA_MAP : CHIEMTINH_LIFE_AREA_MAP;
}

/**
 * Get the primary palace names for a life area (Tử Vi only).
 * Returns empty array for Chiêm Tinh since it uses placements, not palaces.
 */
export function getPrimaryPalaces(
    system: AstrologySystem,
    area: LifeAreaType,
): readonly string[] {
    if (system !== 'tuvi') return [];
    return TUVI_LIFE_AREA_MAP[area].primaryPalaces ?? [];
}

/**
 * Get all palace names that contribute to a life area (Tử Vi).
 * Combines primary and secondary palaces.
 */
export function getAllContributingPalaces(
    area: LifeAreaType,
): readonly string[] {
    const config = TUVI_LIFE_AREA_MAP[area];
    return [
        ...(config.primaryPalaces ?? []),
        ...(config.secondaryPalaces ?? []),
    ];
}

/**
 * Given a palace name, find which life areas it contributes to (Tử Vi).
 * Returns both primary and secondary contributions.
 */
export function getLifeAreasForPalace(
    palaceName: string,
): { primary: LifeAreaType[]; secondary: LifeAreaType[] } {
    const primary: LifeAreaType[] = [];
    const secondary: LifeAreaType[] = [];

    for (const [area, config] of Object.entries(TUVI_LIFE_AREA_MAP)) {
        if (config.primaryPalaces?.includes(palaceName)) {
            primary.push(area as LifeAreaType);
        }
        if (config.secondaryPalaces?.includes(palaceName)) {
            secondary.push(area as LifeAreaType);
        }
    }

    return { primary, secondary };
}

/**
 * Given a placement identifier, find which life areas it contributes to (Chiêm Tinh).
 */
export function getLifeAreasForPlacement(
    placementId: string,
): { primary: LifeAreaType[]; secondary: LifeAreaType[] } {
    const primary: LifeAreaType[] = [];
    const secondary: LifeAreaType[] = [];

    for (const [area, config] of Object.entries(CHIEMTINH_LIFE_AREA_MAP)) {
        if (config.primaryPlacements?.includes(placementId)) {
            primary.push(area as LifeAreaType);
        }
        if (config.secondaryPlacements?.includes(placementId)) {
            secondary.push(area as LifeAreaType);
        }
    }

    return { primary, secondary };
}
