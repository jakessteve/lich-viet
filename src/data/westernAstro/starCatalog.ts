/**
 * Star Catalog — Brightest Stars for Sky Map Visualization
 * ~100 brightest stars (down to ~mag 3.0) with RA/Dec, magnitude, and Vietnamese names.
 *
 * Coordinates are J2000.0 epoch:
 *  - ra: Right Ascension in degrees (0-360)
 *  - dec: Declination in degrees (-90 to +90)
 *  - mag: Visual (apparent) magnitude (lower = brighter)
 */

export interface StarEntry {
    id: string;           // Unique identifier (Bayer designation lowercase)
    name: string;         // Common name
    nameVi: string;       // Vietnamese name
    constellation: string; // IAU constellation abbreviation
    ra: number;           // Right Ascension in degrees
    dec: number;          // Declination in degrees
    mag: number;          // Apparent visual magnitude
    spectral: 'O' | 'B' | 'A' | 'F' | 'G' | 'K' | 'M'; // Spectral class (for color)
}

/**
 * Spectral class → render color mapping
 * O/B = blue-white, A = white, F = yellow-white, G = yellow, K = orange, M = red
 */
export const SPECTRAL_COLORS: Record<string, string> = {
    O: '#9bb0ff',   // Blue
    B: '#aabfff',   // Blue-white
    A: '#cad7ff',   // White
    F: '#f8f7ff',   // Yellow-white
    G: '#fff4ea',   // Yellow
    K: '#ffd2a1',   // Orange
    M: '#ffcc6f',   // Red-orange
};

export const STAR_CATALOG: StarEntry[] = [
    // ─── Top 30 Brightest ──────────────────────────────────────────────
    { id: 'alp_CMa', name: 'Sirius', nameVi: 'Thiên Lang', constellation: 'CMa', ra: 101.287, dec: -16.716, mag: -1.46, spectral: 'A' },
    { id: 'alp_Car', name: 'Canopus', nameVi: 'Lão Nhân', constellation: 'Car', ra: 95.988, dec: -52.696, mag: -0.74, spectral: 'F' },
    { id: 'alp_Boo', name: 'Arcturus', nameVi: 'Đại Giác', constellation: 'Boo', ra: 213.915, dec: 19.182, mag: -0.05, spectral: 'K' },
    { id: 'alp_Cen', name: 'Alpha Centauri', nameVi: 'Nam Môn Nhị', constellation: 'Cen', ra: 219.902, dec: -60.834, mag: -0.01, spectral: 'G' },
    { id: 'alp_Lyr', name: 'Vega', nameVi: 'Chức Nữ', constellation: 'Lyr', ra: 279.234, dec: 38.784, mag: 0.03, spectral: 'A' },
    { id: 'alp_Aur', name: 'Capella', nameVi: 'Ngũ Xa', constellation: 'Aur', ra: 79.172, dec: 45.998, mag: 0.08, spectral: 'G' },
    { id: 'bet_Ori', name: 'Rigel', nameVi: 'Tham Tú Thất', constellation: 'Ori', ra: 78.634, dec: -8.202, mag: 0.13, spectral: 'B' },
    { id: 'alp_CMi', name: 'Procyon', nameVi: 'Nam Hà', constellation: 'CMi', ra: 114.826, dec: 5.225, mag: 0.34, spectral: 'F' },
    { id: 'alp_Ori', name: 'Betelgeuse', nameVi: 'Tham Tú Tứ', constellation: 'Ori', ra: 88.793, dec: 7.407, mag: 0.42, spectral: 'M' },
    { id: 'alp_Eri', name: 'Achernar', nameVi: 'Thủy Ủy Nhất', constellation: 'Eri', ra: 24.429, dec: -57.237, mag: 0.46, spectral: 'B' },
    { id: 'bet_Cen', name: 'Hadar', nameVi: 'Mã Phúc Nhất', constellation: 'Cen', ra: 210.956, dec: -60.373, mag: 0.61, spectral: 'B' },
    { id: 'alp_Aql', name: 'Altair', nameVi: 'Ngưu Lang', constellation: 'Aql', ra: 297.696, dec: 8.868, mag: 0.77, spectral: 'A' },
    { id: 'alp_Tau', name: 'Aldebaran', nameVi: 'Tất Tú Ngũ', constellation: 'Tau', ra: 68.980, dec: 16.509, mag: 0.85, spectral: 'K' },
    { id: 'alp_Vir', name: 'Spica', nameVi: 'Giác Tú Nhất', constellation: 'Vir', ra: 201.298, dec: -11.161, mag: 0.97, spectral: 'B' },
    { id: 'bet_Gem', name: 'Pollux', nameVi: 'Bắc Hà Nhị', constellation: 'Gem', ra: 116.329, dec: 28.026, mag: 1.14, spectral: 'K' },
    { id: 'alp_Sco', name: 'Antares', nameVi: 'Tâm Tú Nhị', constellation: 'Sco', ra: 247.352, dec: -26.432, mag: 1.09, spectral: 'M' },
    { id: 'alp_PsA', name: 'Fomalhaut', nameVi: 'Bắc Lạc Sư Môn Nhất', constellation: 'PsA', ra: 344.413, dec: -29.622, mag: 1.16, spectral: 'A' },
    { id: 'bet_Cru', name: 'Mimosa', nameVi: 'Thập Tự Giá Nhị', constellation: 'Cru', ra: 191.930, dec: -59.689, mag: 1.25, spectral: 'B' },
    { id: 'alp_Cyg', name: 'Deneb', nameVi: 'Thiên Tân', constellation: 'Cyg', ra: 310.358, dec: 45.280, mag: 1.25, spectral: 'A' },
    { id: 'alp_Leo', name: 'Regulus', nameVi: 'Hiên Viên Thập Tứ', constellation: 'Leo', ra: 152.093, dec: 11.967, mag: 1.35, spectral: 'B' },
    { id: 'alp_Cru', name: 'Acrux', nameVi: 'Thập Tự Giá Nhất', constellation: 'Cru', ra: 186.650, dec: -63.099, mag: 1.33, spectral: 'B' },
    { id: 'eps_CMa', name: 'Adhara', nameVi: 'Phất Nhất', constellation: 'CMa', ra: 104.656, dec: -28.972, mag: 1.50, spectral: 'B' },
    { id: 'lam_Sco', name: 'Shaula', nameVi: 'Vĩ Tú Bát', constellation: 'Sco', ra: 263.402, dec: -37.104, mag: 1.63, spectral: 'B' },
    { id: 'gam_Cru', name: 'Gacrux', nameVi: 'Thập Tự Giá Tam', constellation: 'Cru', ra: 187.791, dec: -57.113, mag: 1.64, spectral: 'M' },
    { id: 'alp_Gem', name: 'Castor', nameVi: 'Bắc Hà Nhất', constellation: 'Gem', ra: 113.650, dec: 31.888, mag: 1.58, spectral: 'A' },
    { id: 'gam_Ori', name: 'Bellatrix', nameVi: 'Tham Tú Ngũ', constellation: 'Ori', ra: 81.283, dec: 6.350, mag: 1.64, spectral: 'B' },
    { id: 'bet_Tau', name: 'Elnath', nameVi: 'Ngũ Xa Ngũ', constellation: 'Tau', ra: 81.573, dec: 28.608, mag: 1.65, spectral: 'B' },
    { id: 'bet_Car', name: 'Miaplacidus', nameVi: 'Hải Thạch Nhị', constellation: 'Car', ra: 138.300, dec: -69.717, mag: 1.68, spectral: 'A' },
    { id: 'eps_Ori', name: 'Alnilam', nameVi: 'Tham Tú Nhị', constellation: 'Ori', ra: 84.053, dec: -1.202, mag: 1.70, spectral: 'B' },
    { id: 'alp_Gru', name: 'Alnair', nameVi: 'Hạc Nhất', constellation: 'Gru', ra: 332.058, dec: -46.961, mag: 1.74, spectral: 'B' },

    // ─── 2nd tier (~mag 1.8 - 2.5) ─────────────────────────────────────
    { id: 'eps_Sgr', name: 'Kaus Australis', nameVi: 'Cơ Tú Tam', constellation: 'Sgr', ra: 276.043, dec: -34.384, mag: 1.85, spectral: 'B' },
    { id: 'bet_Leo', name: 'Denebola', nameVi: 'Ngũ Đế Tọa Nhất', constellation: 'Leo', ra: 177.265, dec: 14.572, mag: 2.14, spectral: 'A' },
    { id: 'gam_Leo', name: 'Algieba', nameVi: 'Hiên Viên Thập Nhị', constellation: 'Leo', ra: 154.993, dec: 19.842, mag: 2.08, spectral: 'K' },
    { id: 'zet_Ori', name: 'Alnitak', nameVi: 'Tham Tú Nhất', constellation: 'Ori', ra: 85.190, dec: -1.943, mag: 1.77, spectral: 'O' },
    { id: 'del_Ori', name: 'Mintaka', nameVi: 'Tham Tú Tam', constellation: 'Ori', ra: 83.002, dec: -0.299, mag: 2.23, spectral: 'O' },
    { id: 'kap_Ori', name: 'Saiph', nameVi: 'Tham Tú Lục', constellation: 'Ori', ra: 86.939, dec: -9.670, mag: 2.09, spectral: 'B' },
    { id: 'alp_UMa', name: 'Dubhe', nameVi: 'Thiên Xu', constellation: 'UMa', ra: 165.932, dec: 61.751, mag: 1.79, spectral: 'K' },
    { id: 'bet_UMa', name: 'Merak', nameVi: 'Thiên Toàn', constellation: 'UMa', ra: 165.460, dec: 56.382, mag: 2.37, spectral: 'A' },
    { id: 'gam_UMa', name: 'Phecda', nameVi: 'Thiên Cơ', constellation: 'UMa', ra: 178.458, dec: 53.695, mag: 2.44, spectral: 'A' },
    { id: 'del_UMa', name: 'Megrez', nameVi: 'Thiên Quyền', constellation: 'UMa', ra: 183.857, dec: 57.033, mag: 3.31, spectral: 'A' },
    { id: 'eps_UMa', name: 'Alioth', nameVi: 'Ngọc Hành', constellation: 'UMa', ra: 193.507, dec: 55.960, mag: 1.77, spectral: 'A' },
    { id: 'zet_UMa', name: 'Mizar', nameVi: 'Khai Dương', constellation: 'UMa', ra: 200.981, dec: 54.925, mag: 2.27, spectral: 'A' },
    { id: 'eta_UMa', name: 'Alkaid', nameVi: 'Dao Quang', constellation: 'UMa', ra: 206.885, dec: 49.313, mag: 1.86, spectral: 'B' },
    { id: 'alp_UMi', name: 'Polaris', nameVi: 'Bắc Cực', constellation: 'UMi', ra: 37.954, dec: 89.264, mag: 2.02, spectral: 'F' },
    { id: 'bet_UMi', name: 'Kochab', nameVi: 'Đế Nhất', constellation: 'UMi', ra: 222.676, dec: 74.156, mag: 2.08, spectral: 'K' },
    { id: 'alp_And', name: 'Alpheratz', nameVi: 'Bích Tú Nhị', constellation: 'And', ra: 2.097, dec: 29.091, mag: 2.06, spectral: 'B' },
    { id: 'bet_And', name: 'Mirach', nameVi: 'Kỳ Tú Nhất', constellation: 'And', ra: 17.433, dec: 35.621, mag: 2.05, spectral: 'M' },
    { id: 'gam_And', name: 'Almach', nameVi: 'Thiên Đại Tướng Quân', constellation: 'And', ra: 30.975, dec: 42.330, mag: 2.17, spectral: 'K' },
    { id: 'alp_Cas', name: 'Schedar', nameVi: 'Vương Lương Nhất', constellation: 'Cas', ra: 10.127, dec: 56.537, mag: 2.23, spectral: 'K' },
    { id: 'bet_Cas', name: 'Caph', nameVi: 'Vương Lương Tam', constellation: 'Cas', ra: 2.295, dec: 59.150, mag: 2.27, spectral: 'F' },
    { id: 'gam_Cas', name: 'Gamma Cas', nameVi: 'Sách Trương', constellation: 'Cas', ra: 14.177, dec: 60.717, mag: 2.47, spectral: 'B' },
    { id: 'del_Cas', name: 'Ruchbah', nameVi: 'Các Đạo Nhất', constellation: 'Cas', ra: 21.454, dec: 60.235, mag: 2.68, spectral: 'A' },
    { id: 'eps_Cas', name: 'Segin', nameVi: 'Các Đạo Nhị', constellation: 'Cas', ra: 28.599, dec: 63.670, mag: 3.37, spectral: 'B' },
    { id: 'alp_Per', name: 'Mirfak', nameVi: 'Thiên Thuyền Tam', constellation: 'Per', ra: 51.081, dec: 49.861, mag: 1.80, spectral: 'F' },
    { id: 'bet_Per', name: 'Algol', nameVi: 'Đại Lăng Ngũ', constellation: 'Per', ra: 47.042, dec: 40.957, mag: 2.12, spectral: 'B' },

    // ─── Zodiacal & ecliptic stars ───────────────────────────────────────
    { id: 'alp_Ari', name: 'Hamal', nameVi: 'Lâu Tú Tam', constellation: 'Ari', ra: 31.793, dec: 23.462, mag: 2.00, spectral: 'K' },
    { id: 'bet_Ari', name: 'Sheratan', nameVi: 'Lâu Tú Nhất', constellation: 'Ari', ra: 28.660, dec: 20.808, mag: 2.64, spectral: 'A' },
    { id: 'alp_Lib', name: 'Zubenelgenubi', nameVi: 'Để Tú Nhất', constellation: 'Lib', ra: 222.720, dec: -16.042, mag: 2.75, spectral: 'A' },
    { id: 'bet_Lib', name: 'Zubeneschamali', nameVi: 'Phòng Tú Tứ', constellation: 'Lib', ra: 229.252, dec: -9.383, mag: 2.61, spectral: 'B' },
    { id: 'sig_Sgr', name: 'Nunki', nameVi: 'Đẩu Tú Tam', constellation: 'Sgr', ra: 283.816, dec: -26.297, mag: 2.05, spectral: 'B' },
    { id: 'del_Sco', name: 'Dschubba', nameVi: 'Phòng Tú Nhất', constellation: 'Sco', ra: 240.083, dec: -22.622, mag: 2.32, spectral: 'B' },
    { id: 'eps_Sco', name: 'Larawag', nameVi: 'Vĩ Tú Nhất', constellation: 'Sco', ra: 252.541, dec: -34.293, mag: 2.29, spectral: 'K' },
    { id: 'bet_Sco', name: 'Acrab', nameVi: 'Phòng Tú Tam', constellation: 'Sco', ra: 241.359, dec: -19.806, mag: 2.62, spectral: 'B' },
    { id: 'alp_CrB', name: 'Alphecca', nameVi: 'Quán Sách Nhất', constellation: 'CrB', ra: 233.672, dec: 26.715, mag: 2.23, spectral: 'A' },
    { id: 'alp_Oph', name: 'Rasalhague', nameVi: 'Hầu Nhất', constellation: 'Oph', ra: 263.734, dec: 12.560, mag: 2.07, spectral: 'A' },

    // ─── Southern sky notable stars ──────────────────────────────────────
    { id: 'alp_Pav', name: 'Peacock', nameVi: 'Khổng Tước Thập Nhất', constellation: 'Pav', ra: 306.412, dec: -56.735, mag: 1.94, spectral: 'B' },
    { id: 'alp_TrA', name: 'Atria', nameVi: 'Tam Giác Nhất', constellation: 'TrA', ra: 252.166, dec: -69.028, mag: 1.92, spectral: 'K' },
    { id: 'bet_Gru', name: 'Tiaki', nameVi: 'Hạc Nhị', constellation: 'Gru', ra: 340.667, dec: -46.885, mag: 2.15, spectral: 'M' },
    { id: 'del_Cru', name: 'Imai', nameVi: 'Thập Tự Giá Tứ', constellation: 'Cru', ra: 183.786, dec: -58.749, mag: 2.80, spectral: 'B' },

    // ─── Summer Triangle & nearby ────────────────────────────────────────
    { id: 'bet_Cyg', name: 'Albireo', nameVi: 'Thiên Tân Nhất', constellation: 'Cyg', ra: 292.680, dec: 27.960, mag: 3.08, spectral: 'K' },
    { id: 'gam_Cyg', name: 'Sadr', nameVi: 'Thiên Tân Nhị', constellation: 'Cyg', ra: 305.557, dec: 40.257, mag: 2.23, spectral: 'F' },
    { id: 'del_Cyg', name: 'Fawaris', nameVi: 'Thiên Tân Tam', constellation: 'Cyg', ra: 296.244, dec: 45.131, mag: 2.87, spectral: 'B' },
    { id: 'eps_Cyg', name: 'Gienah', nameVi: 'Thiên Tân Cửu', constellation: 'Cyg', ra: 311.520, dec: 33.970, mag: 2.46, spectral: 'K' },

    // ─── Aquila neighbors ────────────────────────────────────────────────
    { id: 'bet_Aql', name: 'Alshain', nameVi: 'Hà Cổ Nhị', constellation: 'Aql', ra: 298.828, dec: 6.407, mag: 3.71, spectral: 'G' },
    { id: 'gam_Aql', name: 'Tarazed', nameVi: 'Hà Cổ Nhất', constellation: 'Aql', ra: 296.565, dec: 10.613, mag: 2.72, spectral: 'K' },

    // ─── Hydra, Corvus ───────────────────────────────────────────────────
    { id: 'alp_Hya', name: 'Alphard', nameVi: 'Tinh Tú Nhất', constellation: 'Hya', ra: 141.897, dec: -8.659, mag: 1.98, spectral: 'K' },
    { id: 'gam_Crv', name: 'Gienah Corvi', nameVi: 'Chẩn Tú Nhất', constellation: 'Crv', ra: 183.952, dec: -17.542, mag: 2.59, spectral: 'B' },

    // ─── Pegasus square ──────────────────────────────────────────────────
    { id: 'alp_Peg', name: 'Markab', nameVi: 'Thất Tú Nhất', constellation: 'Peg', ra: 346.190, dec: 15.205, mag: 2.49, spectral: 'B' },
    { id: 'bet_Peg', name: 'Scheat', nameVi: 'Thất Tú Nhị', constellation: 'Peg', ra: 345.944, dec: 28.083, mag: 2.42, spectral: 'M' },
    { id: 'gam_Peg', name: 'Algenib', nameVi: 'Bích Tú Nhất', constellation: 'Peg', ra: 3.309, dec: 15.184, mag: 2.83, spectral: 'B' },
    { id: 'eps_Peg', name: 'Enif', nameVi: 'Nguy Tú Tam', constellation: 'Peg', ra: 326.046, dec: 9.875, mag: 2.39, spectral: 'K' },

    // ─── Canis Major extras ──────────────────────────────────────────────
    { id: 'bet_CMa', name: 'Mirzam', nameVi: 'Quân Thị Nhất', constellation: 'CMa', ra: 95.675, dec: -17.956, mag: 1.98, spectral: 'B' },
    { id: 'del_CMa', name: 'Wezen', nameVi: 'Hồ Thỉ Nhất', constellation: 'CMa', ra: 107.098, dec: -26.393, mag: 1.84, spectral: 'F' },

    // ─── Lyra, Aquarius extras ───────────────────────────────────────────
    { id: 'bet_Lyr', name: 'Sheliak', nameVi: 'Tiệm Đài Nhất', constellation: 'Lyr', ra: 282.520, dec: 33.363, mag: 3.45, spectral: 'B' },
    { id: 'gam_Lyr', name: 'Sulafat', nameVi: 'Tiệm Đài Nhị', constellation: 'Lyr', ra: 284.736, dec: 32.690, mag: 3.24, spectral: 'B' },

    // ─── Cap, Aqr ────────────────────────────────────────────────────────
    { id: 'alp_Cap', name: 'Algedi', nameVi: 'Ngưu Tú Nhị', constellation: 'Cap', ra: 304.514, dec: -12.545, mag: 3.57, spectral: 'G' },
    { id: 'bet_Cap', name: 'Dabih', nameVi: 'Ngưu Tú Lục', constellation: 'Cap', ra: 305.253, dec: -14.781, mag: 3.08, spectral: 'K' },
    { id: 'alp_Aqr', name: 'Sadalmelik', nameVi: 'Nguy Tú Nhất', constellation: 'Aqr', ra: 331.446, dec: -0.320, mag: 2.94, spectral: 'G' },
    { id: 'bet_Aqr', name: 'Sadalsuud', nameVi: 'Hư Tú Nhất', constellation: 'Aqr', ra: 322.890, dec: -5.571, mag: 2.87, spectral: 'G' },

    // ─── Pisces / Cetus ──────────────────────────────────────────────────
    { id: 'alp_Psc', name: 'Alrescha', nameVi: 'Ngoại Bình Nhất', constellation: 'Psc', ra: 30.512, dec: 2.764, mag: 3.79, spectral: 'A' },
    { id: 'bet_Cet', name: 'Diphda', nameVi: 'Thổ Tư Không Nhất', constellation: 'Cet', ra: 10.897, dec: -17.987, mag: 2.04, spectral: 'K' },
    { id: 'alp_Cet', name: 'Menkar', nameVi: 'Thiên Nang Ngũ', constellation: 'Cet', ra: 45.570, dec: 4.090, mag: 2.53, spectral: 'M' },

    // ─── Cancer, Virgo extras ────────────────────────────────────────────
    { id: 'bet_Cnc', name: 'Tarf', nameVi: 'Quỷ Tú Tứ', constellation: 'Cnc', ra: 124.129, dec: 9.186, mag: 3.52, spectral: 'K' },
    { id: 'gam_Vir', name: 'Porrima', nameVi: 'Thái Vi Nhất', constellation: 'Vir', ra: 190.415, dec: -1.449, mag: 2.74, spectral: 'F' },
    { id: 'eps_Vir', name: 'Vindemiatrix', nameVi: 'Thái Vi Nhị', constellation: 'Vir', ra: 195.544, dec: 10.959, mag: 2.83, spectral: 'G' },

    // ─── Draco ───────────────────────────────────────────────────────────
    { id: 'gam_Dra', name: 'Eltanin', nameVi: 'Thiên Bàng Nhất', constellation: 'Dra', ra: 269.152, dec: 51.489, mag: 2.23, spectral: 'K' },
    { id: 'eta_Dra', name: 'Aldhibah', nameVi: 'Tả Xu Ngũ', constellation: 'Dra', ra: 245.998, dec: 61.514, mag: 2.74, spectral: 'G' },
    { id: 'bet_Dra', name: 'Rastaban', nameVi: 'Thiên Bàng Nhị', constellation: 'Dra', ra: 262.608, dec: 52.301, mag: 2.79, spectral: 'G' },
];
