/**
 * Constellation Data — Line connections and Vietnamese names
 * for sky map visualization.
 *
 * Each constellation has:
 *  - id: IAU abbreviation
 *  - name: Latin name
 *  - nameVi: Vietnamese name
 *  - lines: pairs of star IDs that form the stick figure
 *  - isZodiacal: true if this is a zodiacal constellation
 */

export interface ConstellationDef {
    id: string;
    name: string;
    nameVi: string;
    lines: [string, string][];   // Pairs of starCatalog IDs to connect
    isZodiacal?: boolean;
}

export const CONSTELLATIONS: ConstellationDef[] = [
    // ─── Zodiacal Constellations ──────────────────────────────────────────
    {
        id: 'Ari', name: 'Aries', nameVi: 'Bạch Dương', isZodiacal: true,
        lines: [['alp_Ari', 'bet_Ari']],
    },
    {
        id: 'Tau', name: 'Taurus', nameVi: 'Kim Ngưu', isZodiacal: true,
        lines: [['alp_Tau', 'bet_Tau']],
    },
    {
        id: 'Gem', name: 'Gemini', nameVi: 'Song Tử', isZodiacal: true,
        lines: [['alp_Gem', 'bet_Gem']],
    },
    {
        id: 'Cnc', name: 'Cancer', nameVi: 'Cự Giải', isZodiacal: true,
        lines: [], // single star — no stick-figure lines
    },
    {
        id: 'Leo', name: 'Leo', nameVi: 'Sư Tử', isZodiacal: true,
        lines: [
            ['alp_Leo', 'gam_Leo'],
            ['alp_Leo', 'bet_Leo'],
        ],
    },
    {
        id: 'Vir', name: 'Virgo', nameVi: 'Xử Nữ', isZodiacal: true,
        lines: [
            ['alp_Vir', 'gam_Vir'],
            ['gam_Vir', 'eps_Vir'],
        ],
    },
    {
        id: 'Lib', name: 'Libra', nameVi: 'Thiên Bình', isZodiacal: true,
        lines: [['alp_Lib', 'bet_Lib']],
    },
    {
        id: 'Sco', name: 'Scorpius', nameVi: 'Bọ Cạp', isZodiacal: true,
        lines: [
            ['del_Sco', 'bet_Sco'],
            ['del_Sco', 'alp_Sco'],
            ['alp_Sco', 'eps_Sco'],
            ['eps_Sco', 'lam_Sco'],
        ],
    },
    {
        id: 'Sgr', name: 'Sagittarius', nameVi: 'Nhân Mã', isZodiacal: true,
        lines: [
            ['eps_Sgr', 'sig_Sgr'],
        ],
    },
    {
        id: 'Cap', name: 'Capricornus', nameVi: 'Ma Kết', isZodiacal: true,
        lines: [['alp_Cap', 'bet_Cap']],
    },
    {
        id: 'Aqr', name: 'Aquarius', nameVi: 'Bảo Bình', isZodiacal: true,
        lines: [['alp_Aqr', 'bet_Aqr']],
    },
    {
        id: 'Psc', name: 'Pisces', nameVi: 'Song Ngư', isZodiacal: true,
        lines: [], // single star — no stick-figure lines
    },

    // ─── Major Non-Zodiacal Constellations ─────────────────────────────────
    {
        id: 'Ori', name: 'Orion', nameVi: 'Lạp Hộ',
        lines: [
            ['alp_Ori', 'gam_Ori'],       // Betelgeuse - Bellatrix (shoulders)
            ['bet_Ori', 'kap_Ori'],        // Rigel - Saiph (legs)
            ['zet_Ori', 'eps_Ori'],        // Belt: Alnitak - Alnilam
            ['eps_Ori', 'del_Ori'],        // Belt: Alnilam - Mintaka
            ['alp_Ori', 'zet_Ori'],        // Shoulder to belt
            ['gam_Ori', 'del_Ori'],        // Shoulder to belt
            ['zet_Ori', 'kap_Ori'],        // Belt to foot
            ['del_Ori', 'bet_Ori'],        // Belt to foot
        ],
    },
    {
        id: 'UMa', name: 'Ursa Major', nameVi: 'Đại Hùng / Bắc Đẩu',
        lines: [
            ['alp_UMa', 'bet_UMa'],       // Bowl
            ['bet_UMa', 'gam_UMa'],
            ['gam_UMa', 'del_UMa'],
            ['del_UMa', 'alp_UMa'],       // Close bowl
            ['del_UMa', 'eps_UMa'],       // Handle
            ['eps_UMa', 'zet_UMa'],
            ['zet_UMa', 'eta_UMa'],
        ],
    },
    {
        id: 'UMi', name: 'Ursa Minor', nameVi: 'Tiểu Hùng',
        lines: [['alp_UMi', 'bet_UMi']],
    },
    {
        id: 'CMa', name: 'Canis Major', nameVi: 'Đại Khuyển',
        lines: [
            ['alp_CMa', 'bet_CMa'],
            ['alp_CMa', 'del_CMa'],
            ['alp_CMa', 'eps_CMa'],
        ],
    },
    {
        id: 'CMi', name: 'Canis Minor', nameVi: 'Tiểu Khuyển',
        lines: [], // Only Procyon is bright enough in our catalog
    },
    {
        id: 'Cyg', name: 'Cygnus', nameVi: 'Thiên Nga',
        lines: [
            ['alp_Cyg', 'gam_Cyg'],       // Body
            ['gam_Cyg', 'bet_Cyg'],        // Tail to beak
            ['gam_Cyg', 'del_Cyg'],        // Wings
            ['gam_Cyg', 'eps_Cyg'],
        ],
    },
    {
        id: 'Lyr', name: 'Lyra', nameVi: 'Thiên Cầm',
        lines: [
            ['alp_Lyr', 'bet_Lyr'],
            ['bet_Lyr', 'gam_Lyr'],
        ],
    },
    {
        id: 'Aql', name: 'Aquila', nameVi: 'Thiên Ưng',
        lines: [
            ['alp_Aql', 'bet_Aql'],
            ['alp_Aql', 'gam_Aql'],
        ],
    },
    {
        id: 'Cas', name: 'Cassiopeia', nameVi: 'Tiên Hậu',
        lines: [
            ['bet_Cas', 'alp_Cas'],
            ['alp_Cas', 'gam_Cas'],
            ['gam_Cas', 'del_Cas'],
            ['del_Cas', 'eps_Cas'],
        ],
    },
    {
        id: 'And', name: 'Andromeda', nameVi: 'Tiên Nữ',
        lines: [
            ['alp_And', 'bet_And'],
            ['bet_And', 'gam_And'],
        ],
    },
    {
        id: 'Per', name: 'Perseus', nameVi: 'Anh Tiên',
        lines: [['alp_Per', 'bet_Per']],
    },
    {
        id: 'Peg', name: 'Pegasus', nameVi: 'Thiên Mã',
        lines: [
            ['alp_Peg', 'bet_Peg'],       // Great Square
            ['alp_Peg', 'gam_Peg'],
            ['bet_Peg', 'alp_And'],        // Shared corner with Andromeda
            ['alp_Peg', 'eps_Peg'],       // Head
        ],
    },
    {
        id: 'Boo', name: 'Boötes', nameVi: 'Mục Phu',
        lines: [['alp_Boo', 'alp_CrB']],  // Connect to Alphecca direction
    },
    {
        id: 'CrB', name: 'Corona Borealis', nameVi: 'Bắc Miện',
        lines: [], // Alphecca only
    },
    {
        id: 'Cru', name: 'Crux', nameVi: 'Thập Tự Nam',
        lines: [
            ['alp_Cru', 'gam_Cru'],       // Vertical
            ['bet_Cru', 'del_Cru'],        // Horizontal
        ],
    },
    {
        id: 'Cen', name: 'Centaurus', nameVi: 'Bán Nhân Mã',
        lines: [['alp_Cen', 'bet_Cen']],
    },
    {
        id: 'Car', name: 'Carina', nameVi: 'Thuyền Để',
        lines: [['alp_Car', 'bet_Car']],
    },
    {
        id: 'Hya', name: 'Hydra', nameVi: 'Trường Xà',
        lines: [], // Alphard only
    },
    {
        id: 'Dra', name: 'Draco', nameVi: 'Thiên Long',
        lines: [
            ['gam_Dra', 'bet_Dra'],       // Head
            ['bet_Dra', 'eta_Dra'],        // Body toward tail
        ],
    },
];
