import type { PlanetInfo, PlanetId } from '../../types/westernAstro';

// =============================================================================
// Planet Data — Vietnamese names, symbols, domains & Essential Dignity tables
// =============================================================================

export const PLANETS: Record<PlanetId, PlanetInfo> = {
    sun: {
        id: 'sun', name: 'Mặt Trời', symbol: '☉',
        domain: 'Bản ngã cốt lõi, mục đích sống, năng lượng sống, ego',
        domicile: ['leo'], exaltation: ['aries'], detriment: ['aquarius'], fall: ['libra'],
        isPersonal: true, isSocial: false, isOuter: false,
    },
    moon: {
        id: 'moon', name: 'Mặt Trăng', symbol: '☽',
        domain: 'Cảm xúc nội tâm, bản năng, nhu cầu an toàn, mẹ, thói quen',
        domicile: ['cancer'], exaltation: ['taurus'], detriment: ['capricorn'], fall: ['scorpio'],
        isPersonal: true, isSocial: false, isOuter: false,
    },
    mercury: {
        id: 'mercury', name: 'Thủy Tinh', symbol: '☿',
        domain: 'Tư duy, giao tiếp, học hỏi, phân tích',
        domicile: ['gemini', 'virgo'], exaltation: ['virgo'], detriment: ['sagittarius', 'pisces'], fall: ['pisces'],
        isPersonal: true, isSocial: false, isOuter: false,
    },
    venus: {
        id: 'venus', name: 'Kim Tinh', symbol: '♀',
        domain: 'Tình yêu, giá trị, thẩm mỹ, tiền bạc, sự hài hòa',
        domicile: ['taurus', 'libra'], exaltation: ['pisces'], detriment: ['scorpio', 'aries'], fall: ['virgo'],
        isPersonal: true, isSocial: false, isOuter: false,
    },
    mars: {
        id: 'mars', name: 'Hỏa Tinh', symbol: '♂',
        domain: 'Hành động, dục vọng, xung đột, năng lượng, can đảm',
        domicile: ['aries', 'scorpio'], exaltation: ['capricorn'], detriment: ['libra', 'taurus'], fall: ['cancer'],
        isPersonal: true, isSocial: false, isOuter: false,
    },
    jupiter: {
        id: 'jupiter', name: 'Mộc Tinh', symbol: '♃',
        domain: 'May mắn, mở rộng, triết lý, giáo dục, tín ngưỡng',
        domicile: ['sagittarius', 'pisces'], exaltation: ['cancer'], detriment: ['gemini', 'virgo'], fall: ['capricorn'],
        isPersonal: false, isSocial: true, isOuter: false,
    },
    saturn: {
        id: 'saturn', name: 'Thổ Tinh', symbol: '♄',
        domain: 'Giới hạn, bài học karmic, trách nhiệm, kỷ luật, thời gian',
        domicile: ['capricorn', 'aquarius'], exaltation: ['libra'], detriment: ['cancer', 'leo'], fall: ['aries'],
        isPersonal: false, isSocial: true, isOuter: false,
    },
    uranus: {
        id: 'uranus', name: 'Thiên Vương', symbol: '♅',
        domain: 'Đột biến, cách mạng, tự do, công nghệ, cái mới',
        domicile: ['aquarius'], exaltation: ['scorpio'], detriment: ['leo'], fall: ['taurus'],
        isPersonal: false, isSocial: false, isOuter: true,
    },
    neptune: {
        id: 'neptune', name: 'Hải Vương', symbol: '♆',
        domain: 'Ảo mộng, linh cảm, hy sinh, nghệ thuật, tâm linh',
        domicile: ['pisces'], exaltation: ['cancer'], detriment: ['virgo'], fall: ['capricorn'],
        isPersonal: false, isSocial: false, isOuter: true,
    },
    pluto: {
        id: 'pluto', name: 'Diêm Vương', symbol: '♇',
        domain: 'Biến đổi sâu sắc, quyền lực, cái chết & tái sinh, ám ảnh',
        domicile: ['scorpio'], exaltation: ['aries'], detriment: ['taurus'], fall: ['libra'],
        isPersonal: false, isSocial: false, isOuter: true,
    },
};

/** Ordered planet list for display (personal → social → outer) */
export const PLANET_ORDER: PlanetId[] = [
    'sun', 'moon', 'mercury', 'venus', 'mars',
    'jupiter', 'saturn',
    'uranus', 'neptune', 'pluto',
];

/** Vietnamese names for dignity states */
export const DIGNITY_NAMES: Record<string, string> = {
    domicile: 'Vượng (Domicile)',
    exaltation: 'Miếu (Exaltation)',
    detriment: 'Hãm (Detriment)',
    fall: 'Bại (Fall)',
    peregrine: 'Bình thường (Peregrine)',
};

/** Vietnamese names for aspect types */
export const ASPECT_NAMES: Record<string, { name: string; symbol: string; angle: number; nature: 'harmonious' | 'challenging' | 'neutral' }> = {
    conjunction: { name: 'Hợp (Conjunction)', symbol: '☌', angle: 0, nature: 'neutral' },
    sextile: { name: 'Lục hợp (Sextile)', symbol: '⚹', angle: 60, nature: 'harmonious' },
    square: { name: 'Vuông (Square)', symbol: '□', angle: 90, nature: 'challenging' },
    trine: { name: 'Tam hợp (Trine)', symbol: '△', angle: 120, nature: 'harmonious' },
    opposition: { name: 'Đối (Opposition)', symbol: '☍', angle: 180, nature: 'challenging' },
    quincunx: { name: 'Bán lục hợp (Quincunx)', symbol: '⚻', angle: 150, nature: 'challenging' },
    semiSextile: { name: 'Bán hợp (Semi-sextile)', symbol: '⚺', angle: 30, nature: 'neutral' },
    semiSquare: { name: 'Nửa vuông (Semi-square)', symbol: '∠', angle: 45, nature: 'challenging' },
    sesquiquadrate: { name: 'Một rưỡi vuông (Sesquiquadrate)', symbol: '⊼', angle: 135, nature: 'challenging' },
    quintile: { name: 'Ngũ hợp (Quintile)', symbol: 'Q', angle: 72, nature: 'harmonious' },
};

/** Shared planet colors for chart/sky visualization — consistent across all components */
export const PLANET_COLORS: Record<PlanetId, string> = {
    sun: '#E6800A',    // Orange — vitality
    moon: '#8B8B8B',   // Silver-gray — lunar
    mercury: '#DAA520', // Goldenrod — quicksilver/intellect
    venus: '#228B22',   // Green — love/nature
    mars: '#CC0000',    // Red — passion/action
    jupiter: '#0000CC', // Blue — wisdom/expansion
    saturn: '#444444',  // Charcoal — discipline/limits
    uranus: '#00CED1',  // Dark turquoise — electricity/innovation
    neptune: '#4169E1',  // Royal blue — ocean/dreams
    pluto: '#800080',   // Purple — transformation/underworld
};

/** Shared aspect line colors for chart visualization */
export const ASPECT_LINE_COLORS: Record<string, string> = {
    conjunction: '#228B22',
    sextile: '#0000CC',
    trine: '#0000CC',
    square: '#CC0000',
    opposition: '#CC0000',
    quincunx: '#228B22',
    semiSextile: '#888888',
    semiSquare: '#CC0000',
    sesquiquadrate: '#CC0000',
    quintile: '#0000CC',
};
