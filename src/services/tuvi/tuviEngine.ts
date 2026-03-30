import type { TuViChartData, ChartInput, TuViStar } from './tuviTypes';
import { VietnameseTuViEngine } from './engine/VietnameseTuViEngine';
import { ChineseTuViEngine } from './engine/ChineseTuViEngine';
import { TaiwaneseTuViEngine } from './engine/TaiwaneseTuViEngine';

/** Feature Flag: Set to true to bypass iztro and use our custom high-performance AST engine */
export const USE_NATIVE_ENGINE = true;

/**
 * Generate a Tử Vi chart from user birth data using the natively built TS engine.
 * 
 * Delegates to the appropriate regional school engine via Strategy pattern.
 * 
 * @param input - User's birth data (date, time index, gender, name, school)
 * @returns Fully typed chart data ready for rendering
 */
export function generateChart(input: ChartInput): TuViChartData {
    const school = input.school || 'vi';
    switch (school) {
        case 'cn':
            return new ChineseTuViEngine(input).generate();
        case 'tw':
            return new TaiwaneseTuViEngine(input).generate();
        case 'vi':
        default:
            return new VietnameseTuViEngine(input).generate();
    }
}

/**
 * ── Phụ Tinh Classification ─────────────────────────────────────
 * Traditional Tử Vi classifies ALL auxiliary stars as either:
 * - Cát Tinh (吉星): Auspicious / benefic → rendered green
 * - Sát Tinh (煞星): Malefic / inauspicious → rendered red
 * - Trung Tính (中性): Truly neutral (very few) → rendered gray
 *
 * Source: Vietnamese Tử Vi Toàn Thư, cohoc.net reference charts.
 */
const CAT_TINH_NAMES = new Set([
    // ── Quý Nhân group ──
    'Thiên Quan',    // 天官 — Noble help
    'Thiên Phúc',    // 天福 — Heavenly blessings
    'Thiên Đức',     // 天德 — Heavenly virtue
    'Nguyệt Đức',   // 月德 — Monthly virtue
    // ── Văn Tinh group ──
    'Long Trì',      // 龍池 — Dragon pond (artistic talent)
    'Phượng Các',    // 鳳閣 — Phoenix pavilion (literary fame)
    'Ân Quang',      // 恩光 — Grace
    'Thiên Quý',     // 天貴 — Heavenly nobility
    // ── Thai Phụ group ──
    'Tam Thai',      // 三台 — Three terraces (rank/promotion)
    'Bát Tọa',       // 八座 — Eight thrones (authority)
    'Đài Phụ',       // 台輔 — Platform support
    'Phong Cáo',     // 封誥 — Imperial decree (noble rank, auspicious)
    // ── Đào Hoa group (positive romance) ──
    'Hồng Loan',     // 紅鸞 — Red phoenix (marriage luck)
    'Thiên Hỷ',      // 天喜 — Heavenly joy
    // ── Resolution / Protection ──
    'Giải Thần',     // 解神 — Resolution spirit
    'Thiên Trù',     // 天廚 — Heavenly kitchen (food/sustenance)
    // ── Fortune / Talent ──
    'Thiên Tài',     // 天才 — Heavenly talent
    'Thiên Thọ',     // 天壽 — Heavenly longevity
    // ── Bác Sĩ 12 benefics ──
    'Thanh Long',    // 青龍 — Green Dragon
    'Phục Binh',     // 伏兵 — Ambush (actually benefic in Bác Sĩ context)
    'Hỷ Thần',       // 喜神 — Joy spirit
    'Tấu Thư',       // 奏書 — Memorial document
    'Bác Sỹ',        // 博士 — Scholar/Doctor
    'Lực Sỹ',        // 力士 — Strong official (benefic auxiliary)
    // ── Thái Tuế 12-ring benefics ──
    'Thái Tuế',      // 太歲 — Grand Year (authority, status)
    'Long Đức',      // 龍德 — Dragon Virtue (noble luck)
    'Phúc Đức',      // 福德 — Blessing Virtue (fortune)
    'Thiếu Dương',   // 少陽 — Minor Yang (growth)
    'Thiếu Âm',      // 少陰 — Minor Yin (nurture)
    'Trực Phù',      // 直符 — Upright talisman (protective)
    // ── Lộc Tồn ring benefics ──
    'Đường Phù',     // 唐符 — Tang talisman (property, elegance)
    'Quốc Ấn',       // 國印 — National seal (authority, prestige)
    // ── Resolution / Noble Protection ──
    'Thiên Giải',    // 天解 — Heavenly resolution (resolves calamity)
    'Thiên Đức Q.N', // 天德貴人 — Heavenly Virtue Noble (monthly noble protection)
    'Nguyệt Đức Q.N', // 月德貴人 — Monthly Virtue Noble (monthly noble)
    // ── 14 Chính Tinh (Major Stars) Cát ──
    'Tử Vi', 'Thiên Cơ', 'Thái Dương', 'Vũ Khúc', 'Thiên Đồng',
    'Thiên Phủ', 'Thái Âm', 'Thiên Tướng', 'Thiên Lương',
]);

const SAT_TINH_NAMES = new Set([
    // ── Hình / Sát group ──
    'Thiên Hình',    // 天刑 — Heavenly punishment
    'Thiên Diêu',    // 天姚 — Heavenly temptation (peach blossom sát)
    'Âm Sát',        // 陰煞 — Yin malefic
    // ── Sầu / Khốc group ──
    'Thiên Khốc',    // 天哭 — Heavenly weeping
    'Thiên Hư',      // 天虛 — Heavenly void
    // ── Cô / Quả group ──
    'Cô Thần',       // 孤辰 — Solitude
    'Quả Tú',        // 寡宿 — Widowhood
    // ── Phá / Hao group ──
    'Phi Liêm',      // 飛廉 — Flying blade
    'Phá Toái',      // 破碎 — Shattered
    'Thiên Không',   // 天空 — Heavenly emptiness
    'Kiếp Sát',      // 劫煞 — Robbery malefic
    'Đại Hao',       // 大耗 — Great wastage
    'Hoa Cái',       // 華蓋 — Flowery canopy (isolation, religious, hardship)
    'Thiên Vu',      // 天巫 — Heavenly shaman (witchcraft, legal trouble)
    'Tuế Phá',       // 歲破 — Year breaker (major loss, obstruction)
    // ── Thương / Sứ ──
    'Thiên Thương',  // 天傷 — Heavenly injury
    'Thiên Sứ',      // 天使 — Heavenly envoy (death-related)
    // ── Bệnh group ──
    'Thiên Nguyệt',  // 天月 — Heavenly moon (disease star)
    // ── Không Vong group ──
    'Triệt Không',   // 截空 — Truncation void
    'Tuần Không',    // 旬空 — Decade void
    'Không Vong',    // 空亡 — Void/death
    'Triệt Lộ',     // 截路 — Truncated path
    // ── Đào Hoa / Sắc Dục ──
    'Hàm Trì',       // 咸池 — Salty pool (lustful peach blossom)
    'Lưu Hà',        // 流霞 — Flowing glow (blood injury, scandal, misfortune)
    // ── Bác Sĩ 12 malefics ──
    'Tiểu Hao',      // 小耗 — Small wastage
    'Tướng Quân',    // 將軍 — General (military disputes, authority conflicts)
    'Bệnh Phù',      // 病符 — Illness talisman
    'Quan Phủ',       // 官符 — Government trouble
    'Quan Phù',       // 官符 — (alternate spelling)
    // ── Thái Tuế 12-ring malefics ──
    'Tang Môn',      // 喪門 — Mourning gate (death/grief)
    'Bạch Hổ',       // 白虎 — White Tiger (calamity)
    'Điếu Khách',    // 吊客 — Mourning visitor (funerals/loss)
    'Tử Phù',        // 死符 — Death talisman
    'Hối Khí',       // 晦气 — Bad luck, obstruction (Chinese ring)
    'Quán Sách',     // 貫索 — Entanglement, imprisonment (Chinese ring)
    // ── La Võng group (fixed positions) ──
    'Thiên La',      // 天羅 — Heaven's net (affliction at Thìn)
    'Địa Võng',      // 地網 — Earth's snare (affliction at Tuất)
    // ── Đào Hoa (dual-nature, classified sát in Vietnamese school) ──
    'Đào Hoa',       // 桃花 — Peach blossom (romance/scandal when afflicted)
    // ── 14 Chính Tinh (Major Stars) Sát/Ám/Tù ──
    'Thất Sát', 'Phá Quân', 'Tham Lang', 'Cự Môn', 'Liêm Trinh',
]);

/**
 * Categorizes a star into an explicit color category ignoring layout tier.
 */
export function getStarColorCategory(star: TuViStar): 'auspicious' | 'malefic' | 'neutral' {
    if (star.type === 'soft' || star.type === 'lucun' || star.type === 'tianma') return 'auspicious';
    if (star.type === 'tough') return 'malefic';
    if (CAT_TINH_NAMES.has(star.name)) return 'auspicious';
    if (SAT_TINH_NAMES.has(star.name)) return 'malefic';
    return 'neutral';
}

/**
 * Categorizes a star into UI rendering categories:
 * - major:     14 Chính Tinh (bold, centered)
 * - auspicious: Cát Tinh (green, left column in split layout)
 * - malefic:   Sát Tinh (red, right column in split layout)
 * - neutral:   Trung Tính (gray)
 * - dynamic:   Temporal overlay stars (Đại Hạn / Lưu Niên)
 */
export function getStarCategory(star: TuViStar): 'major' | 'auspicious' | 'malefic' | 'neutral' | 'dynamic' {
    // Temporal overlay stars (decadal/yearly) are always dynamic regardless of type
    if (star.scope && star.scope !== 'origin') return 'dynamic';
    if (star.type === 'major') return 'major';
    if (star.type === 'soft') return 'auspicious';
    if (star.type === 'tough') return 'malefic';
    if (star.type === 'lucun') return 'auspicious';
    if (star.type === 'tianma') return 'auspicious';

    // ── Name-based classification for adjective/helper stars ──
    if (CAT_TINH_NAMES.has(star.name)) return 'auspicious';
    if (SAT_TINH_NAMES.has(star.name)) return 'malefic';

    return 'neutral';
}
