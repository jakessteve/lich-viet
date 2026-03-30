import type { ZodiacSign, ZodiacSignId, Element, Quality } from '../../types/westernAstro';

// =============================================================================
// 12 Zodiac Signs — Vietnamese Reference Data
// =============================================================================

export const ZODIAC_SIGNS: Record<ZodiacSignId, ZodiacSign> = {
    aries: {
        id: 'aries', name: 'Bạch Dương', symbol: '♈',
        element: 'fire', quality: 'cardinal', polarity: 'yang',
        traditionalRuler: 'mars', modernRuler: 'mars',
        degreeStart: 0, degreeEnd: 30,
        keywords: ['tiên phong', 'dũng cảm', 'năng động', 'nóng nảy'],
    },
    taurus: {
        id: 'taurus', name: 'Kim Ngưu', symbol: '♉',
        element: 'earth', quality: 'fixed', polarity: 'yin',
        traditionalRuler: 'venus', modernRuler: 'venus',
        degreeStart: 30, degreeEnd: 60,
        keywords: ['kiên định', 'thực tế', 'thẩm mỹ', 'bảo thủ'],
    },
    gemini: {
        id: 'gemini', name: 'Song Tử', symbol: '♊',
        element: 'air', quality: 'mutable', polarity: 'yang',
        traditionalRuler: 'mercury', modernRuler: 'mercury',
        degreeStart: 60, degreeEnd: 90,
        keywords: ['linh hoạt', 'giao tiếp', 'trí tuệ', 'đa dạng'],
    },
    cancer: {
        id: 'cancer', name: 'Cự Giải', symbol: '♋',
        element: 'water', quality: 'cardinal', polarity: 'yin',
        traditionalRuler: 'moon', modernRuler: 'moon',
        degreeStart: 90, degreeEnd: 120,
        keywords: ['tình cảm', 'gia đình', 'bảo vệ', 'trực giác'],
    },
    leo: {
        id: 'leo', name: 'Sư Tử', symbol: '♌',
        element: 'fire', quality: 'fixed', polarity: 'yang',
        traditionalRuler: 'sun', modernRuler: 'sun',
        degreeStart: 120, degreeEnd: 150,
        keywords: ['lãnh đạo', 'sáng tạo', 'tự tin', 'hào phóng'],
    },
    virgo: {
        id: 'virgo', name: 'Xử Nữ', symbol: '♍',
        element: 'earth', quality: 'mutable', polarity: 'yin',
        traditionalRuler: 'mercury', modernRuler: 'mercury',
        degreeStart: 150, degreeEnd: 180,
        keywords: ['cẩn thận', 'phân tích', 'phục vụ', 'hoàn hảo'],
    },
    libra: {
        id: 'libra', name: 'Thiên Bình', symbol: '♎',
        element: 'air', quality: 'cardinal', polarity: 'yang',
        traditionalRuler: 'venus', modernRuler: 'venus',
        degreeStart: 180, degreeEnd: 210,
        keywords: ['cân bằng', 'hài hòa', 'công bằng', 'hợp tác'],
    },
    scorpio: {
        id: 'scorpio', name: 'Bọ Cạp', symbol: '♏',
        element: 'water', quality: 'fixed', polarity: 'yin',
        traditionalRuler: 'mars', modernRuler: 'pluto',
        degreeStart: 210, degreeEnd: 240,
        keywords: ['mãnh liệt', 'bí ẩn', 'biến đổi', 'sâu sắc'],
    },
    sagittarius: {
        id: 'sagittarius', name: 'Nhân Mã', symbol: '♐',
        element: 'fire', quality: 'mutable', polarity: 'yang',
        traditionalRuler: 'jupiter', modernRuler: 'jupiter',
        degreeStart: 240, degreeEnd: 270,
        keywords: ['phiêu lưu', 'triết lý', 'tự do', 'lạc quan'],
    },
    capricorn: {
        id: 'capricorn', name: 'Ma Kết', symbol: '♑',
        element: 'earth', quality: 'cardinal', polarity: 'yin',
        traditionalRuler: 'saturn', modernRuler: 'saturn',
        degreeStart: 270, degreeEnd: 300,
        keywords: ['tham vọng', 'kỷ luật', 'trách nhiệm', 'thực tế'],
    },
    aquarius: {
        id: 'aquarius', name: 'Bảo Bình', symbol: '♒',
        element: 'air', quality: 'fixed', polarity: 'yin',
        traditionalRuler: 'saturn', modernRuler: 'uranus',
        degreeStart: 300, degreeEnd: 330,
        keywords: ['cách mạng', 'nhân đạo', 'độc lập', 'sáng tạo'],
    },
    pisces: {
        id: 'pisces', name: 'Song Ngư', symbol: '♓',
        element: 'water', quality: 'mutable', polarity: 'yin',
        traditionalRuler: 'jupiter', modernRuler: 'neptune',
        degreeStart: 330, degreeEnd: 360,
        keywords: ['trực giác', 'đồng cảm', 'nghệ thuật', 'tâm linh'],
    },
};

/** Ordered array for iteration */
export const ZODIAC_ORDER: ZodiacSignId[] = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
];

/** Map absolute degree → zodiac sign */
export function getSignFromDegree(degree: number): ZodiacSignId {
    const normalized = ((degree % 360) + 360) % 360;
    const index = Math.floor(normalized / 30);
    return ZODIAC_ORDER[index];
}

/** Map absolute degree → degree within sign (0-29) */
export function getSignDegree(degree: number): number {
    return ((degree % 360) + 360) % 360 % 30;
}

// ─── Element / Quality / Polarity lookup maps ───────────────────────────────

export const ELEMENT_NAMES: Record<Element, string> = {
    fire: 'Lửa', earth: 'Đất', air: 'Khí', water: 'Nước',
};

export const ELEMENT_COLORS: Record<Element, string> = {
    fire: '#ff6b35', earth: '#4caf50', air: '#42a5f5', water: '#7e57c2',
};

export const QUALITY_NAMES: Record<Quality, string> = {
    cardinal: 'Khởi xướng', fixed: 'Bền vững', mutable: 'Thích nghi',
};

export const ELEMENT_SIGNS: Record<Element, ZodiacSignId[]> = {
    fire: ['aries', 'leo', 'sagittarius'],
    earth: ['taurus', 'virgo', 'capricorn'],
    air: ['gemini', 'libra', 'aquarius'],
    water: ['cancer', 'scorpio', 'pisces'],
};

export const QUALITY_SIGNS: Record<Quality, ZodiacSignId[]> = {
    cardinal: ['aries', 'cancer', 'libra', 'capricorn'],
    fixed: ['taurus', 'leo', 'scorpio', 'aquarius'],
    mutable: ['gemini', 'virgo', 'sagittarius', 'pisces'],
};
