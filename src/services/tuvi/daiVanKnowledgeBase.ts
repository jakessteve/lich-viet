/**
 * Đại Vận Knowledge Base — Static interpretation data for 10-year period analysis.
 *
 * Contains:
 * 1. Tứ Hóa destination meanings in Đại Vận context (4 × 12 = 48 entries)
 * 2. Multi-domain life analysis templates
 * 3. Period quality scoring weights
 * 4. Palace context for Đại Vận
 */

// ═══════════════════════════════════════════════════════════════════
// 1. Heavenly Stem → Tứ Hóa Mapping (Classical System)
//    Moved from chartAnalysis.ts for centralization
// ═══════════════════════════════════════════════════════════════════
export const STEM_TU_HOA: Record<string, { loc: string; quyen: string; khoa: string; ky: string }> = {
    'Giáp': { loc: 'Liêm Trinh', quyen: 'Phá Quân', khoa: 'Vũ Khúc', ky: 'Thái Dương' },
    'Ất': { loc: 'Thiên Cơ', quyen: 'Thiên Lương', khoa: 'Tử Vi', ky: 'Thái Âm' },
    'Bính': { loc: 'Thiên Đồng', quyen: 'Thiên Cơ', khoa: 'Văn Xương', ky: 'Liêm Trinh' },
    'Đinh': { loc: 'Thái Âm', quyen: 'Thiên Đồng', khoa: 'Thiên Cơ', ky: 'Cự Môn' },
    'Mậu': { loc: 'Tham Lang', quyen: 'Thái Âm', khoa: 'Hữu Bật', ky: 'Thiên Cơ' },
    'Kỷ': { loc: 'Vũ Khúc', quyen: 'Tham Lang', khoa: 'Thiên Lương', ky: 'Văn Khúc' },
    'Canh': { loc: 'Thái Dương', quyen: 'Vũ Khúc', khoa: 'Thái Âm', ky: 'Thiên Đồng' },
    'Tân': { loc: 'Cự Môn', quyen: 'Thái Dương', khoa: 'Văn Khúc', ky: 'Văn Xương' },
    'Nhâm': { loc: 'Thiên Lương', quyen: 'Tử Vi', khoa: 'Tả Phụ', ky: 'Vũ Khúc' },
    'Quý': { loc: 'Phá Quân', quyen: 'Cự Môn', khoa: 'Thái Âm', ky: 'Tham Lang' },
};

// ═══════════════════════════════════════════════════════════════════
// 2. Tứ Hóa Destination Meanings in Đại Vận Context
//    What each Hóa means when landing in each of the 12 palaces
//    during a 10-year period (4 × 12 = 48 entries)
// ═══════════════════════════════════════════════════════════════════
export const DAI_VAN_TU_HOA_DESTINATION: Record<string, Record<string, string>> = {
    'Hóa Lộc': {
        'Mệnh': '10 năm bản thân hưởng phúc lộc, nhiều cơ hội đến tự nhiên, tài lộc theo thân.',
        'Huynh Đệ': '10 năm anh em hòa thuận, bạn bè mang đến cơ hội, hợp tác sinh lợi.',
        'Phu Thê': '10 năm tình cảm thuận lợi, hôn nhân hạnh phúc, đối tác giúp phát tài.',
        'Tử Tức': '10 năm con cái mang phúc, đầu tư thuận lợi, sáng tạo sinh lợi.',
        'Tài Bạch': '10 năm tài chính rất tốt, thu nhập ổn định và tăng trưởng, dễ tích lũy.',
        'Tật Ách': '10 năm sức khỏe tốt, ít bệnh tật, năng lượng dồi dào.',
        'Thiên Di': '10 năm ra ngoài gặp may mắn, quý nhân phương xa, xuất ngoại thuận lợi.',
        'Nô Bộc': '10 năm nhân sự tốt, cấp dưới trung thành đắc lực, mạng lưới xã hội rộng.',
        'Quan Lộc': '10 năm sự nghiệp phát triển, thăng tiến thuận lợi, công danh hanh thông.',
        'Điền Trạch': '10 năm nhà cửa ổn định, bất động sản tăng giá, gia đạo yên ấm.',
        'Phúc Đức': '10 năm phúc đức dày, đời sống tinh thần phong phú, tâm an lạc.',
        'Phụ Mẫu': '10 năm quan hệ cha mẹ tốt đẹp, giấy tờ pháp lý thuận lợi.',
    },
    'Hóa Quyền': {
        'Mệnh': '10 năm bản thân có uy quyền, ý chí mạnh mẽ, nắm quyền chủ đạo.',
        'Huynh Đệ': '10 năm anh em có vị thế, bạn bè quyền lực, cần khéo léo tránh xung đột.',
        'Phu Thê': '10 năm bạn đời cá tính mạnh, hôn nhân cần sự nhường nhịn để bền vững.',
        'Tử Tức': '10 năm con cái có chí khí, đầu tư quyết đoán, nắm quyền kiểm soát.',
        'Tài Bạch': '10 năm chủ động tài chính, kiếm tiền bằng năng lực và uy quyền.',
        'Tật Ách': '10 năm sức đề kháng mạnh, vượt qua bệnh tật bằng ý chí, nhưng hay quá tải.',
        'Thiên Di': '10 năm có uy thế khi ra ngoài, được nể phục, phát triển sự nghiệp ở xa.',
        'Nô Bộc': '10 năm quản lý nhân sự giỏi, có uy với cấp dưới.',
        'Quan Lộc': '10 năm nắm quyền lực trong sự nghiệp, dễ thăng tiến, phù hợp lãnh đạo.',
        'Điền Trạch': '10 năm nắm quyền kiểm soát bất động sản, quyết định gia sản.',
        'Phúc Đức': '10 năm tinh thần mạnh mẽ, ý chí kiên cường, tổ tiên để lại uy danh.',
        'Phụ Mẫu': '10 năm cha mẹ có uy, giáo dục nghiêm nhưng hiệu quả.',
    },
    'Hóa Khoa': {
        'Mệnh': '10 năm thanh danh tốt, được kính trọng, phong thái lịch lãm.',
        'Huynh Đệ': '10 năm anh em có học, bạn bè trí thức, quan hệ tôn trọng.',
        'Phu Thê': '10 năm bạn đời có học vấn, hôn nhân văn minh.',
        'Tử Tức': '10 năm con cái học giỏi, sáng tạo trong học thuật.',
        'Tài Bạch': '10 năm kiếm tiền bằng tri thức, chuyên môn, thu nhập ổn định.',
        'Tật Ách': '10 năm gặp bệnh có thầy giỏi chữa, hiểu biết về sức khỏe.',
        'Thiên Di': '10 năm được tiếng tốt ở ngoài xã hội, du học thuận lợi.',
        'Nô Bộc': '10 năm thuộc hạ có trình độ, quan hệ xã hội uy tín.',
        'Quan Lộc': '10 năm sự nghiệp gắn liền danh tiếng, thăng tiến nhờ chuyên môn.',
        'Điền Trạch': '10 năm nhà cửa thanh nhã, gia đình nề nếp.',
        'Phúc Đức': '10 năm gia tộc có truyền thống học vấn, phúc trí tuệ.',
        'Phụ Mẫu': '10 năm cha mẹ có học, giấy tờ bằng cấp thuận lợi.',
    },
    'Hóa Kỵ': {
        'Mệnh': '10 năm bản thân hay lo lắng, chấp nhất, nhiều sóng gió nhưng cũng là động lực.',
        'Huynh Đệ': '10 năm anh em bất hòa, dễ mất tiền vì người thân, cẩn thận hợp tác.',
        'Phu Thê': '10 năm hôn nhân trắc trở, vợ chồng hay cãi vã, cần kiên nhẫn.',
        'Tử Tức': '10 năm lo lắng về con cái, đầu tư dễ thua lỗ, nên thận trọng.',
        'Tài Bạch': '10 năm tài chính bất ổn, hay mất tiền bất ngờ, tiền tài khó giữ.',
        'Tật Ách': '10 năm sức khỏe yếu, hay bệnh vặt, tâm lý bất an ảnh hưởng thể chất.',
        'Thiên Di': '10 năm ra ngoài hay gặp trở ngại, bị hiểu lầm, đi xa không thuận.',
        'Nô Bộc': '10 năm thuộc hạ phản phúc, bạn bè bất tín, cẩn thận bị hại ngầm.',
        'Quan Lộc': '10 năm sự nghiệp nhiều chông gai, dễ gặp tiểu nhân, công việc áp lực.',
        'Điền Trạch': '10 năm nhà cửa bất ổn, tranh chấp bất động sản, gia đình mâu thuẫn.',
        'Phúc Đức': '10 năm phúc mỏng, đời sống tinh thần hay bất an, lo âu.',
        'Phụ Mẫu': '10 năm quan hệ cha mẹ trắc trở, giấy tờ hay gặp sai sót.',
    },
};

// ═══════════════════════════════════════════════════════════════════
// 3. Palace-Specific Context for Đại Vận Interpretation
//    Moved from chartAnalysis.ts for centralization
// ═══════════════════════════════════════════════════════════════════
export const DAI_VAN_PALACE_CONTEXT: Record<string, string> = {
    'Mệnh': 'Giai đoạn này ảnh hưởng trực tiếp đến bản thân, tính cách và phương hướng chủ đạo của cuộc đời.',
    'Phụ Mẫu': 'Giai đoạn này liên quan mạnh đến mối quan hệ với cha mẹ, bề trên, giấy tờ pháp luật.',
    'Phúc Đức': 'Giai đoạn này phản ánh phúc đức, may mắn tổng thể và sự bình an nội tâm.',
    'Điền Trạch': 'Giai đoạn này liên quan đến bất động sản, nhà cửa, đất đai và tài sản cố định.',
    'Quan Lộc': 'Giai đoạn này ảnh hưởng mạnh đến sự nghiệp, công danh, và khả năng thăng tiến.',
    'Nô Bộc': 'Giai đoạn này liên quan đến quan hệ nhân sự, cộng sự, người đồng hành.',
    'Thiên Di': 'Giai đoạn này ảnh hưởng đến quan hệ xã hội, di chuyển, và cơ hội bên ngoài.',
    'Tật Ách': 'Giai đoạn này cần chú ý sức khỏe, bệnh tật, và áp lực tinh thần.',
    'Tài Bạch': 'Giai đoạn này ảnh hưởng trực tiếp đến tài chính, thu nhập, và cơ hội tài lộc.',
    'Tử Tức': 'Giai đoạn này liên quan đến con cái, hậu duệ, và khả năng sáng tạo.',
    'Phu Thê': 'Giai đoạn này ảnh hưởng đến đời sống tình cảm, hôn nhân, và đối tác.',
    'Huynh Đệ': 'Giai đoạn này liên quan đến anh em, bằng hữu, và sự cộng tác.',
};

// ═══════════════════════════════════════════════════════════════════
// 4. Multi-Domain Life Analysis Templates
//    For each life domain, defines which palaces to scan and how
//    to synthesize the interpretation
// ═══════════════════════════════════════════════════════════════════
export interface DomainAnalysisConfig {
    readonly label: string;
    readonly icon: string;
    readonly keyPalaces: string[];
    readonly positiveIndicators: string[];
    readonly negativeIndicators: string[];
    readonly fallbackText: string;
}

export const DOMAIN_CONFIGS: Record<string, DomainAnalysisConfig> = {
    'career': {
        label: 'Sự Nghiệp',
        icon: '💼',
        keyPalaces: ['Quan Lộc', 'Tài Bạch', 'Thiên Di'],
        positiveIndicators: ['Tử Vi', 'Thiên Phủ', 'Vũ Khúc', 'Thái Dương', 'Thiên Lương', 'Tả Phụ', 'Hữu Bật', 'Thiên Khôi', 'Thiên Việt'],
        negativeIndicators: ['Địa Không', 'Địa Kiếp', 'Hỏa Tinh', 'Linh Tinh'],
        fallbackText: 'Sự nghiệp giai đoạn này ở mức bình thường, không có biến động lớn.',
    },
    'marriage': {
        label: 'Hôn Nhân',
        icon: '💕',
        keyPalaces: ['Phu Thê'],
        positiveIndicators: ['Hồng Loan', 'Thiên Hỷ', 'Đào Hoa', 'Thiên Tướng', 'Thái Âm', 'Thiên Đồng'],
        negativeIndicators: ['Cô Thần', 'Quả Tú', 'Thiên Hình', 'Kình Dương', 'Đà La'],
        fallbackText: 'Tình cảm giai đoạn này ổn định, không có sóng gió lớn.',
    },
    'health': {
        label: 'Sức Khỏe',
        icon: '🏥',
        keyPalaces: ['Tật Ách'],
        positiveIndicators: ['Thiên Lương', 'Thiên Đồng', 'Thiên Y', 'Thiên Phúc', 'Thiên Đức'],
        negativeIndicators: ['Kình Dương', 'Đà La', 'Hỏa Tinh', 'Linh Tinh', 'Thiên Hình', 'Tang Môn', 'Bạch Hổ'],
        fallbackText: 'Sức khỏe giai đoạn này bình thường, nên duy trì lối sống lành mạnh.',
    },
    'children': {
        label: 'Con Cái',
        icon: '👶',
        keyPalaces: ['Tử Tức'],
        positiveIndicators: ['Thiên Đồng', 'Thái Âm', 'Thiên Phủ', 'Thai', 'Thiên Hỷ'],
        negativeIndicators: ['Địa Không', 'Địa Kiếp', 'Cô Thần', 'Quả Tú'],
        fallbackText: 'Con cái giai đoạn này bình ổn, quan hệ cha mẹ-con cái không có biến động lớn.',
    },
    'movement': {
        label: 'Di Chuyển',
        icon: '✈️',
        keyPalaces: ['Thiên Di'],
        positiveIndicators: ['Thiên Mã', 'Lộc Tồn', 'Tả Phụ', 'Hữu Bật', 'Thiên Khôi'],
        negativeIndicators: ['Địa Không', 'Địa Kiếp', 'Kình Dương', 'Đà La'],
        fallbackText: 'Di chuyển giai đoạn này ổn định, không có nhu cầu thay đổi lớn.',
    },
};

// ═══════════════════════════════════════════════════════════════════
// 5. Period Quality Scoring Weights
// ═══════════════════════════════════════════════════════════════════
export const SCORING_WEIGHTS = {
    /** Major star brightness: strong +15, neutral +5, weak -10, empty -15 */
    majorStarBright: 15,
    majorStarNeutral: 5,
    majorStarWeak: -10,
    emptyPalace: -15,
    /** Auspicious star: +8 each */
    catTinh: 8,
    /** Malefic star: -8 each */
    hungSat: -8,
    /** Lộc Tồn present: +10 */
    locTon: 10,
    /** Tứ Hóa: Lộc +12, Quyền +8, Khoa +6, Kỵ -15 */
    hoaLoc: 12,
    hoaQuyen: 8,
    hoaKhoa: 6,
    hoaKy: -15,
    /** Tràng Sinh stage quality: strong +10, neutral +3, weak -10 */
    trangSinhStrong: 10,
    trangSinhNeutral: 3,
    trangSinhWeak: -10,
    /** Tuần Không: -5, Triệt Không: -8 */
    tuanKhong: -5,
    trietKhong: -8,
    /** Tam Hợp bonus: stars Miếu/Vượng from trine +5 each, Hãm -3 each */
    trineStarBright: 5,
    trineStarWeak: -3,
    /** Đối Cung strong stars: +5, weak: -3 */
    oppStarBright: 5,
    oppStarWeak: -3,
    /** Base score (midpoint) */
    baseScore: 50,
} as const;

// ═══════════════════════════════════════════════════════════════════
// 6. Earthly Branch → Ngũ Hành Element Mapping
// ═══════════════════════════════════════════════════════════════════
export const BRANCH_ELEMENT: Record<string, string> = {
    'Tý': 'Thủy', 'Sửu': 'Thổ', 'Dần': 'Mộc', 'Mão': 'Mộc',
    'Thìn': 'Thổ', 'Tỵ': 'Hỏa', 'Ngọ': 'Hỏa', 'Mùi': 'Thổ',
    'Thân': 'Kim', 'Dậu': 'Kim', 'Tuất': 'Thổ', 'Hợi': 'Thủy',
};

// ═══════════════════════════════════════════════════════════════════
// 7. Opposite Palace Branches (for Đối Cung analysis)
// ═══════════════════════════════════════════════════════════════════
export const OPPOSITE_BRANCHES: Record<string, string> = {
    'Tý': 'Ngọ', 'Ngọ': 'Tý',
    'Sửu': 'Mùi', 'Mùi': 'Sửu',
    'Dần': 'Thân', 'Thân': 'Dần',
    'Mão': 'Dậu', 'Dậu': 'Mão',
    'Thìn': 'Tuất', 'Tuất': 'Thìn',
    'Tỵ': 'Hợi', 'Hợi': 'Tỵ',
};
