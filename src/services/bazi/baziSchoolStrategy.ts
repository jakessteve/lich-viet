import type { BaziSchool } from '../../types/bazi';

/**
 * Strategy pattern mapping Bát Tự (Bazi) computation logic across regions.
 */
export interface BaziSchoolConfig {
    id: BaziSchool;
    label: string;
    shortLabel: string;
    icon: string;
    description: string;
    /**
     * How to handle the hours 23:00 - 00:00 (Tý hour)
     * split: Dạ Tý (Late Rat) belongs to the SAME day, but uses Tomorrow's hour stem.
     * next_day: The Rat hour marks the strict beginning of tomorrow. No Dạ Tý.
     */
    ratHourRule: 'split' | 'next_day';
    /**
     * Methodology to calculate the precise Dai Van Start age factor
     * flat: Standard 1 day = 4 months (most common in VN / Mainland)
     * fractional: Exact minutes on the solar arc (more precise, used in TW / Zi Ping)
     */
    daiVanMethod: 'flat' | 'fractional';
    /**
     * The timezone to enforce for Tiết Khí (Solar term) boundaries when TST isn't precise.
     */
    defaultTimezone: number;
}

export const BAZI_SCHOOLS: Record<BaziSchool, BaziSchoolConfig> = {
    vi: {
        id: 'vi',
        label: 'Tứ Trụ Việt Nam',
        shortLabel: 'Việt Nam',
        icon: '🇻🇳',
        description: 'Phái Việt Nam (Cổ Học / Lý Số), sử dụng Dạ Tý (chia đôi giờ Tý) và tính toán qua UTC+7.',
        ratHourRule: 'split',
        daiVanMethod: 'flat',
        defaultTimezone: 7,
    },
    cn: {
        id: 'cn',
        label: 'Bát Tự Truyền Thống',
        shortLabel: 'Trung Châu',
        icon: '🇨🇳',
        description: 'Truyền thống Đại Lục, không chia Dạ Tý (ngày mới bắt đầu ngay từ 23g00) và tính toán qua UTC+8.',
        ratHourRule: 'next_day',
        daiVanMethod: 'flat',
        defaultTimezone: 8,
    },
    tw: {
        id: 'tw',
        label: 'Tử Bình Bắc Phái',
        shortLabel: 'Bắc Phái',
        icon: '🇹🇼',
        description: 'Phái Tử Bình Đài Loan, sử dụng Dạ Tý và tính toán mốc Đại Vận chi tiết chính xác theo quỹ đạo mặt trời.',
        ratHourRule: 'split',
        daiVanMethod: 'fractional',
        defaultTimezone: 8,
    }
};

export const BAZI_SCHOOL_CONFIGS = [BAZI_SCHOOLS.vi, BAZI_SCHOOLS.cn, BAZI_SCHOOLS.tw];

/**
 * Get school configuration by id
 */
export function getBaziSchoolStrategy(school: BaziSchool): BaziSchoolConfig {
    return BAZI_SCHOOLS[school] || BAZI_SCHOOLS.vi;
}
