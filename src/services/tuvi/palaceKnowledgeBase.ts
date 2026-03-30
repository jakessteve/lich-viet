/**
 * Palace Knowledge Base — Static data for enriched Tử Vi palace interpretation.
 *
 * Extracted from palaceInterpretation.ts to keep logic vs data separate.
 * Contains: Tràng Sinh meanings, element relationships, star categorizations,
 * trine groups, flanking palace mappings, and palace-specific functional contexts.
 */

// ═══════════════════════════════════════════════════════════════════
// Tràng Sinh (12 Life Cycle Stages) — from iztro changsheng12
// ═══════════════════════════════════════════════════════════════════
export const TRANG_SINH_MEANINGS: Record<string, { label: string; quality: 'strong' | 'neutral' | 'weak'; meaning: string }> = {
    'Trường Sinh': { label: 'Trường Sinh', quality: 'strong', meaning: 'Giai đoạn khởi đầu, sinh sôi — cung này nhận được năng lượng sinh khởi mạnh mẽ. Chủ nhân có nền tảng tốt, dễ phát triển thuận lợi ở lĩnh vực này.' },
    'Mục Dục': { label: 'Mục Dục', quality: 'weak', meaning: 'Giai đoạn tắm gội, thanh lọc — năng lượng bất ổn, dễ dao động. Cung gặp Mục Dục thường hay thay đổi, tình cảm phức tạp, có yếu tố Đào Hoa.' },
    'Quan Đới': { label: 'Quan Đới', quality: 'neutral', meaning: 'Giai đoạn trưởng thành, đội mũ — bắt đầu có hình thể, đang phát triển. Cung này cho thấy tiềm năng đang được xây dựng, chưa đạt đỉnh.' },
    'Lâm Quan': { label: 'Lâm Quan', quality: 'strong', meaning: 'Giai đoạn ra làm quan — sức mạnh đang lên, sự nghiệp phát triển. Cung gặp Lâm Quan rất tốt cho công danh, thăng tiến.' },
    'Đế Vượng': { label: 'Đế Vượng', quality: 'strong', meaning: 'Giai đoạn cực thịnh, đỉnh cao quyền lực — năng lượng mạnh nhất. Cung này phát huy tối đa sức mạnh các sao tọa thủ. Tuy nhiên, thịnh cực tất suy.' },
    'Suy': { label: 'Suy', quality: 'weak', meaning: 'Giai đoạn bắt đầu suy giảm — năng lượng đi xuống. Cung gặp Suy thì các sao mất bớt sức mạnh, cần phụ tinh cát hỗ trợ.' },
    'Bệnh': { label: 'Bệnh', quality: 'weak', meaning: 'Giai đoạn bệnh tật — năng lượng yếu, dễ gặp trở ngại. Đặc biệt xấu cho cung Tật Ách (sức khỏe) và cung Mệnh.' },
    'Tử': { label: 'Tử', quality: 'weak', meaning: 'Giai đoạn tử diệt — năng lượng rất yếu. Tuy nhiên, trong Tử Vi, "Tử" không hẳn xấu nếu có cát tinh hội tụ — có thể hiểu là "chết đi sống lại", tái sinh.' },
    'Mộ': { label: 'Mộ', quality: 'neutral', meaning: 'Giai đoạn nhập mộ, cất giữ — năng lượng ẩn tàng bên trong. Cung gặp Mộ thường có tài sản ẩn, phúc đức tiềm ẩn, hoặc tính cách nội tâm sâu sắc.' },
    'Tuyệt': { label: 'Tuyệt', quality: 'weak', meaning: 'Giai đoạn tuyệt diệt — năng lượng cạn kiệt. Cung gặp Tuyệt rất cần cát tinh cứu giải. Tuy nhiên, Tuyệt Xứ Phùng Sinh (tuyệt mà gặp cát) lại là cách cục đặc biệt.' },
    'Thai': { label: 'Thai', quality: 'neutral', meaning: 'Giai đoạn thai nghén — năng lượng mới đang hình thành. Cung này cho thấy khởi đầu mới, kế hoạch đang ấp ủ, tiềm năng chưa bộc lộ.' },
    'Dưỡng': { label: 'Dưỡng', quality: 'neutral', meaning: 'Giai đoạn nuôi dưỡng — năng lượng đang được bồi đắp. Cung gặp Dưỡng thể hiện sự chăm sóc, tích lũy, chuẩn bị cho giai đoạn phát triển tiếp theo.' },
};

// Vietnamese label lookup for changsheng12 (now identity mapping since keys are Vietnamese)
export const TRANG_SINH_VN_LABELS: Record<string, string> = {
    'Trường Sinh': 'Trường Sinh', 'Mục Dục': 'Mục Dục', 'Quan Đới': 'Quan Đới',
    'Lâm Quan': 'Lâm Quan', 'Đế Vượng': 'Đế Vượng', 'Suy': 'Suy',
    'Bệnh': 'Bệnh', 'Tử': 'Tử', 'Mộ': 'Mộ',
    'Tuyệt': 'Tuyệt', 'Thai': 'Thai', 'Dưỡng': 'Dưỡng',
};

// ═══════════════════════════════════════════════════════════════════
// Ngũ Hành Element Relationship Descriptions
// ═══════════════════════════════════════════════════════════════════

/** Ngũ Hành sinh cycle: A sinh B */
export const NGU_HANH_SINH: Record<string, string> = {
    'Kim': 'Thủy', 'Thủy': 'Mộc', 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim',
};

/** Ngũ Hành khắc cycle: A khắc B */
export const NGU_HANH_KHAC: Record<string, string> = {
    'Kim': 'Mộc', 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim',
};

/** Get element relationship description */
export function getElementRelation(elA: string, elB: string): string {
    if (!elA || !elB) return '';
    // Normalize: strip Âm/Dương prefix
    const a = elA.replace(/^(Âm|Dương)\s*/, '');
    const b = elB.replace(/^(Âm|Dương)\s*/, '');
    if (a === b) return `${a} đồng hành — hài hòa, ổn định`;
    if (NGU_HANH_SINH[a] === b) return `${a} sinh ${b} — ${a} bổ trợ, nuôi dưỡng ${b}`;
    if (NGU_HANH_SINH[b] === a) return `${b} sinh ${a} — ${b} bổ trợ, nuôi dưỡng ${a}`;
    if (NGU_HANH_KHAC[a] === b) return `${a} khắc ${b} — ${a} kìm hãm ${b}, cần cát tinh hóa giải`;
    if (NGU_HANH_KHAC[b] === a) return `${b} khắc ${a} — ${b} kìm hãm ${a}, cần cát tinh hóa giải`;
    return '';
}

// ═══════════════════════════════════════════════════════════════════
// Star Categorization (Cát Tinh / Hung Sát Tinh / Đặc Biệt)
// ═══════════════════════════════════════════════════════════════════

/** Lục Cát Tinh + key auspicious stars */
export const CAT_TINH_NAMES = new Set([
    'Văn Xương', 'Văn Khúc', 'Tả Phụ', 'Hữu Bật',
    'Thiên Khôi', 'Thiên Việt', 'Lộc Tồn',
    'Long Trì', 'Phượng Các', 'Ân Quang', 'Thiên Quý',
    'Tam Thai', 'Bát Tọa', 'Thiên Đức', 'Nguyệt Đức',
    'Hồng Loan', 'Thiên Hỷ', 'Thiên Quan', 'Thiên Phúc',
    'Thai Phụ', 'Phong Cáo', 'Thiên Y',
]);

/** Lục Sát Tinh + key malefic stars */
export const HUNG_SAT_NAMES = new Set([
    'Kình Dương', 'Đà La', 'Hỏa Tinh', 'Linh Tinh',
    'Địa Không', 'Địa Kiếp', 'Kiếp Sát',
    'Cô Thần', 'Quả Tú', 'Thiên Hình', 'Thiên Riêu',
    'Tang Môn', 'Bạch Hổ', 'Phá Toái',
    'Đại Hao', 'Tiểu Hao', 'Thiên Khốc', 'Thiên Hư',
    'Lưu Hà', 'Thiên Thương', 'Thiên Sứ',
]);

/** Special / Neutral notable stars */
export const DAC_BIET_NAMES = new Set([
    'Đào Hoa', 'Thiên Mã', 'Hoa Cái', 'Thái Tuế',
    'Tuần Không', 'Triệt Không',
]);

// ═══════════════════════════════════════════════════════════════════
// Tam Hợp Groups (Trine Groups by Earthly Branch)
// ═══════════════════════════════════════════════════════════════════
export const TAM_HOP_GROUPS: Record<string, string[]> = {
    'Dần': ['Dần', 'Ngọ', 'Tuất'],   // Hỏa cục
    'Ngọ': ['Dần', 'Ngọ', 'Tuất'],
    'Tuất': ['Dần', 'Ngọ', 'Tuất'],
    'Thân': ['Thân', 'Tý', 'Thìn'],  // Thủy cục
    'Tý': ['Thân', 'Tý', 'Thìn'],
    'Thìn': ['Thân', 'Tý', 'Thìn'],
    'Hợi': ['Hợi', 'Mão', 'Mùi'],   // Mộc cục
    'Mão': ['Hợi', 'Mão', 'Mùi'],
    'Mùi': ['Hợi', 'Mão', 'Mùi'],
    'Tỵ': ['Tỵ', 'Dậu', 'Sửu'],    // Kim cục
    'Dậu': ['Tỵ', 'Dậu', 'Sửu'],
    'Sửu': ['Tỵ', 'Dậu', 'Sửu'],
};

/** Tam Hợp element name per group */
export const TAM_HOP_ELEMENT: Record<string, string> = {
    'Dần': 'Hỏa', 'Ngọ': 'Hỏa', 'Tuất': 'Hỏa',
    'Thân': 'Thủy', 'Tý': 'Thủy', 'Thìn': 'Thủy',
    'Hợi': 'Mộc', 'Mão': 'Mộc', 'Mùi': 'Mộc',
    'Tỵ': 'Kim', 'Dậu': 'Kim', 'Sửu': 'Kim',
};

// ═══════════════════════════════════════════════════════════════════
// Giáp Cung (Adjacent/Flanking Palaces) — by earthly branch order
// ═══════════════════════════════════════════════════════════════════
const BRANCH_ORDER = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

export function getGiapCungBranches(branch: string): [string, string] {
    const idx = BRANCH_ORDER.indexOf(branch);
    if (idx < 0) return ['', ''];
    const prev = BRANCH_ORDER[(idx + 11) % 12];
    const next = BRANCH_ORDER[(idx + 1) % 12];
    return [prev, next];
}

// ═══════════════════════════════════════════════════════════════════
// Yin/Yang Palace Classification
// ═══════════════════════════════════════════════════════════════════
export const DUONG_BRANCHES = new Set(['Tý', 'Dần', 'Thìn', 'Ngọ', 'Thân', 'Tuất']);


// ═══════════════════════════════════════════════════════════════════
// Nhị Hợp (Lục Hợp / Six Harmonies) — complementary branch pairs
// Each pair forms a combined element when in harmony.
// ═══════════════════════════════════════════════════════════════════
export const NHI_HOP_PAIRS: Record<string, { partner: string; element: string; description: string }> = {
    'Tý': { partner: 'Sửu', element: 'Thổ', description: 'Tý-Sửu hợp Thổ — quan hệ bổ trợ, ổn định, tương trợ lẫn nhau về nền tảng vật chất.' },
    'Sửu': { partner: 'Tý', element: 'Thổ', description: 'Sửu-Tý hợp Thổ — quan hệ bền vững, hỗ trợ tích lũy và ổn định gia sản.' },
    'Dần': { partner: 'Hợi', element: 'Mộc', description: 'Dần-Hợi hợp Mộc — quan hệ sinh trưởng, phát triển trí tuệ và sáng tạo.' },
    'Hợi': { partner: 'Dần', element: 'Mộc', description: 'Hợi-Dần hợp Mộc — tương trợ phát triển, tốt cho học vấn và kế hoạch dài hạn.' },
    'Mão': { partner: 'Tuất', element: 'Hỏa', description: 'Mão-Tuất hợp Hỏa — quan hệ nhiệt huyết, tốt cho sự nghiệp và danh tiếng.' },
    'Tuất': { partner: 'Mão', element: 'Hỏa', description: 'Tuất-Mão hợp Hỏa — tương trợ về danh vọng, nhiệt tình và quyền lực.' },
    'Thìn': { partner: 'Dậu', element: 'Kim', description: 'Thìn-Dậu hợp Kim — quan hệ quyết đoán, tốt cho tài chính và sự nghiệp vững chắc.' },
    'Dậu': { partner: 'Thìn', element: 'Kim', description: 'Dậu-Thìn hợp Kim — tương trợ về quyết đoán, sắc bén, quản lý và tài sản.' },
    'Tỵ': { partner: 'Thân', element: 'Thủy', description: 'Tỵ-Thân hợp Thủy — quan hệ linh hoạt, tốt cho giao tiếp và trí tuệ.' },
    'Thân': { partner: 'Tỵ', element: 'Thủy', description: 'Thân-Tỵ hợp Thủy — tương trợ linh hoạt, biến hóa, giỏi ứng biến.' },
    'Ngọ': { partner: 'Mùi', element: 'Thổ', description: 'Ngọ-Mùi hợp Thổ — quan hệ hài hòa âm dương, tốt cho gia đạo và phúc đức.' },
    'Mùi': { partner: 'Ngọ', element: 'Thổ', description: 'Mùi-Ngọ hợp Thổ — tương trợ hài hòa, ấm áp, bền vững trong quan hệ.' },
};

// ═══════════════════════════════════════════════════════════════════
// Lục Hại (Six Harms) — conflicting branch pairs
// These pairs create hidden tension and obstacles.
// ═══════════════════════════════════════════════════════════════════
export const LUC_HAI_PAIRS: Record<string, { partner: string; description: string }> = {
    'Tý': { partner: 'Mùi', description: 'Tý-Mùi hại nhau — mâu thuẫn ngầm giữa lý trí và cảm xúc. Quan hệ bề ngoài hòa thuận nhưng bên trong hay bất đồng.' },
    'Mùi': { partner: 'Tý', description: 'Mùi-Tý hại nhau — xung đột ẩn giấu, khó hòa hợp thực sự. Dễ gây hiểu lầm và tổn thương ngầm.' },
    'Sửu': { partner: 'Ngọ', description: 'Sửu-Ngọ hại nhau — thổ kìm hỏa, mâu thuẫn giữa sự ổn định và nhiệt huyết. Hay gặp trở ngại trong thăng tiến.' },
    'Ngọ': { partner: 'Sửu', description: 'Ngọ-Sửu hại nhau — nhiệt huyết bị kìm nén, tham vọng gặp cản trở. Dễ nóng vội mà thất bại.' },
    'Dần': { partner: 'Tỵ', description: 'Dần-Tỵ hại nhau — mộc sinh hỏa nhưng ân trung hữu hại. Quan hệ kiểu "ban đầu tốt, sau xung đột".' },
    'Tỵ': { partner: 'Dần', description: 'Tỵ-Dần hại nhau — hỏa thiêu mộc, ân thành oán. Cộng sự ban đầu hỗ trợ rồi sau quay lưng.' },
    'Mão': { partner: 'Thìn', description: 'Mão-Thìn hại nhau — mộc khắc thổ ngầm, xung đột nhỏ tích tụ. Quan hệ dần dà xa cách.' },
    'Thìn': { partner: 'Mão', description: 'Thìn-Mão hại nhau — thổ bị mộc xâm phạm, nền tảng bị đe dọa. Hay bị người tin cậy phản bội.' },
    'Thân': { partner: 'Hợi', description: 'Thân-Hợi hại nhau — kim sinh thủy nhưng hay lạm dụng. Cho đi nhiều mà nhận lại ít.' },
    'Hợi': { partner: 'Thân', description: 'Hợi-Thân hại nhau — thủy tiết kim khí, bị hao tổn tài lực. Bị lợi dụng lòng tốt.' },
    'Dậu': { partner: 'Tuất', description: 'Dậu-Tuất hại nhau — kim bị hỏa luyện, xung đột nội tại. Quan hệ gần gũi nhưng nhiều mâu thuẫn.' },
    'Tuất': { partner: 'Dậu', description: 'Tuất-Dậu hại nhau — hỏa luyện kim, cải tạo nhưng đau đớn. Thay đổi tốt nhưng qua nhiều thử thách.' },
};

// ═══════════════════════════════════════════════════════════════════
// Gender-Aware Palace Priority Weighting (Section IX)
// ═══════════════════════════════════════════════════════════════════
/** Male: Phúc Đức → Mệnh → Thân (cung an) → Quan Lộc → Tài Bạch */
export const MALE_PRIORITY_PALACES = ['Phúc Đức', 'Mệnh', 'Quan Lộc', 'Tài Bạch'];
/** Female: Phúc Đức → Mệnh → Thân (cung an) → Phu Thê → Tài Bạch → Tử Tức */
export const FEMALE_PRIORITY_PALACES = ['Phúc Đức', 'Mệnh', 'Phu Thê', 'Tài Bạch', 'Tử Tức'];

// ═══════════════════════════════════════════════════════════════════
// Palace-Specific Functional Context
// Maps each of the 12 palaces to its domain-specific analysis focus
// ═══════════════════════════════════════════════════════════════════
export const PALACE_FUNCTIONAL_CONTEXT: Record<string, {
    healthFocus: string;
    personalityFocus: string;
    careerFocus: string;
    keyAdvice: string;
}> = {
    'Mệnh': {
        healthFocus: 'Tổng thể sức khỏe, thể chất, tướng mạo, ngoại hình. Chính tinh Miếu Vượng thì khỏe mạnh, cao ráo; Hãm địa thì thể chất yếu.',
        personalityFocus: 'Bản tính, tính cách bẩm sinh, chí hướng, tư duy. Đây là cung quan trọng nhất để đánh giá con người tổng thể.',
        careerFocus: 'Tiềm năng sự nghiệp tổng quát, khả năng lãnh đạo, xu hướng nghề nghiệp bẩm sinh.',
        keyAdvice: 'Mệnh là gốc rễ của lá số, nhưng phải kết hợp Phúc Đức (phúc từ tổ tiên) và Thân (hậu vận) để luận chính xác.',
    },
    'Huynh Đệ': {
        healthFocus: 'Liên quan sức khỏe các chi (tay chân), quan hệ phẫu thuật, phục hồi.',
        personalityFocus: 'Khả năng giao tiếp, quan hệ bạn bè đồng trang lứa, tính đoàn kết hay cô đơn.',
        careerFocus: 'Hợp tác kinh doanh, quan hệ đối tác, năng lực làm việc nhóm.',
        keyAdvice: 'Cung Huynh Đệ cũng cho biết về chi tiêu ngầm, tiền bạc mất do người thân bạn bè.',
    },
    'Phu Thê': {
        healthFocus: 'Sức khỏe sinh sản, hệ tiết niệu-sinh dục.',
        personalityFocus: 'Quan điểm về tình yêu, cách ứng xử trong hôn nhân, mẫu hình bạn đời lý tưởng.',
        careerFocus: 'Ảnh hưởng của hôn nhân đến sự nghiệp, kinh doanh gia đình.',
        keyAdvice: 'Cung Phu Thê Miếu Vượng không bảo đảm hôn nhân tốt — phải xem đối cung (Quan Lộc) và Tứ Hóa phi tinh.',
    },
    'Tử Tức': {
        healthFocus: 'Khả năng sinh sản, sức khỏe cơ quan sinh dục, thai sản.',
        personalityFocus: 'Quan hệ cha mẹ-con cái, cách giáo dục, kỳ vọng với con.',
        careerFocus: 'Khả năng sáng tạo, đầu tư, mạo hiểm kinh doanh.',
        keyAdvice: 'Cung Tử Tức còn phản ánh năng lực sáng tạo và đầu tư — Lộc nhập tốt cho đầu tư, Kỵ nhập cẩn thận thua lỗ.',
    },
    'Tài Bạch': {
        healthFocus: 'Sức khỏe ảnh hưởng bởi stress tài chính, hệ tiêu hóa (lo lắng tiền bạc).',
        personalityFocus: 'Quan điểm về tiền bạc, hào phóng hay ki bo, cách quản lý tài chính.',
        careerFocus: 'Khả năng kiếm tiền, nguồn thu nhập chính, mức thu nhập tiềm năng.',
        keyAdvice: 'Tài Bạch phải xem cùng tam hợp (Mệnh + Quan Lộc) mới luận chính xác. Lộc Tồn, Hóa Lộc tại đây rất quý.',
    },
    'Tật Ách': {
        healthFocus: 'Cung QUAN TRỌNG NHẤT về sức khỏe — bệnh tật bẩm sinh, cơ quan dễ mắc bệnh, thể chất mạnh/yếu, thọ/yểu.',
        personalityFocus: 'Đời sống nội tâm, tâm lý tiềm thức, stress, lo âu.',
        careerFocus: 'Sức chịu đựng áp lực công việc, nguy cơ kiệt sức (burnout).',
        keyAdvice: 'Sát tinh tại Tật Ách không nhất thiết xấu — có thể chỉ ra tính cách mạnh mẽ. Nhưng Hóa Kỵ + sát tinh thì cần cẩn thận.',
    },
    'Thiên Di': {
        healthFocus: 'Sức khỏe khi ra ngoài, tai nạn giao thông, phản ứng với môi trường mới.',
        personalityFocus: 'Hình ảnh xã hội, cách người khác nhìn nhận bạn, khả năng thích nghi.',
        careerFocus: 'Phát triển sự nghiệp bên ngoài, xuất ngoại, kinh doanh quốc tế, quan hệ xã hội.',
        keyAdvice: 'Thiên Di là đối cung Mệnh — nếu Mệnh yếu mà Thiên Di mạnh thì phát triển ở ngoài, xa nhà.',
    },
    'Nô Bộc': {
        healthFocus: 'Sức khỏe bị ảnh hưởng bởi môi trường xã hội, stress quan hệ.',
        personalityFocus: 'Khả năng quản lý, lãnh đạo đội nhóm, cách đối xử với cấp dưới.',
        careerFocus: 'Chất lượng nhân viên, cộng sự, mạng lưới hỗ trợ nghề nghiệp.',
        keyAdvice: 'Nô Bộc phản ánh "quý nhân" — cát tinh nhiều thì được giúp đỡ, hung tinh nhiều thì bị phản bội.',
    },
    'Quan Lộc': {
        healthFocus: 'Sức khỏe ảnh hưởng bởi áp lực công việc, stress mãn tính.',
        personalityFocus: 'Tham vọng sự nghiệp, phong cách làm việc, đạo đức nghề nghiệp.',
        careerFocus: 'CỰC KỲ QUAN TRỌNG — loại hình sự nghiệp, vị trí xã hội, thăng tiến, công danh. Tam hợp với Mệnh và Tài Bạch.',
        keyAdvice: 'Quan Lộc là cung sự nghiệp chính — Tử Vi/Thiên Phủ tọa thì quan lộ hanh thông, Phá Quân thì hay đổi nghề.',
    },
    'Điền Trạch': {
        healthFocus: 'Sức khỏe gia đình, môi trường sống ảnh hưởng thể chất.',
        personalityFocus: 'Gắn bó với gia đình, quan niệm về nơi ở, tính ổn định.',
        careerFocus: 'Bất động sản, thừa kế, tài sản cố định, tích lũy lâu dài.',
        keyAdvice: 'Điền Trạch còn phản ánh phong thủy nơi ở — cát tinh nhiều thì nhà cửa yên lành, hung tinh thì bất ổn.',
    },
    'Phúc Đức': {
        healthFocus: 'Tuổi thọ, sức khỏe tinh thần, khả năng phục hồi, di truyền từ tổ tiên.',
        personalityFocus: 'Đời sống tinh thần, triết lý sống, tâm linh, phúc báo từ tổ tiên.',
        careerFocus: 'Phúc đức gia tộc ảnh hưởng sự nghiệp, di sản văn hóa, nền tảng giáo dục.',
        keyAdvice: 'Phúc Đức là GỐC RỄ của Mệnh — Phúc Đức tốt mà Mệnh xấu thì vẫn có cơ hội; Mệnh tốt mà Phúc Đức xấu thì nền tảng không vững.',
    },
    'Phụ Mẫu': {
        healthFocus: 'Di truyền từ cha mẹ, sức khỏe bẩm sinh, ADN, gen.',
        personalityFocus: 'Quan hệ với cha mẹ, kính trọng truyền thống, nền giáo dục thời thơ ấu.',
        careerFocus: 'Giấy tờ, hợp đồng, bằng cấp, chứng chỉ, pháp lý, nhà nước.',
        keyAdvice: 'Phụ Mẫu còn liên quan đến "ấn tín" — giấy tờ, hợp đồng, pháp luật. Hóa Kỵ nhập thì cẩn thận giấy tờ sai sót.',
    },
};

// ═══════════════════════════════════════════════════════════════════
// Star-In-Palace Context — 14 Major Stars × 12 Palaces
// Contextual, practical interpretation of each star in each palace.
// ═══════════════════════════════════════════════════════════════════
export const STAR_IN_PALACE_CONTEXT: Record<string, Record<string, string>> = {
    'Tử Vi': {
        'Mệnh': 'Người có khí chất lãnh đạo, tự tôn, thích được tôn trọng. Tướng mạo uy nghi. Đắc địa → thủ lĩnh tự nhiên, quyền uy; Hãm → tự mãn, cô đơn trên đỉnh.',
        'Huynh Đệ': 'Anh chị em có vị trí xã hội cao, quan hệ anh em kiểu "cung kính" hơn thân mật. Ít anh em nhưng chất lượng.',
        'Phu Thê': 'Bạn đời có quyền lực hoặc địa vị cao. Hôn nhân mang tính "chính trị", cả hai đều muốn nắm quyền nên dễ xung đột.',
        'Tử Tức': 'Con cái có tài lãnh đạo, độc lập từ nhỏ. Có thể ít con. Đắc → con hiếu thảo, thành đạt; Hãm → xa cách con.',
        'Tài Bạch': 'Thu nhập từ quyền lực, quản lý, vị trí lãnh đạo. Tài chính ổn định nhờ uy tín cá nhân. Hãm → tiêu xài hoang phí do tự tôn.',
        'Tật Ách': 'Sức khỏe liên quan tim mạch, huyết áp. Thể chất tốt khi đắc địa, dễ stress do gánh nặng trách nhiệm.',
        'Thiên Di': 'Ra ngoài được tôn trọng, quý nhân phù trợ. Hình ảnh xã hội "sang trọng". Hãm → bên ngoài hào nhoáng nhưng bên trong rỗng.',
        'Nô Bộc': 'Cấp dưới trung thành, đội nhóm có kỷ luật. Thu hút nhân tài. Hãm → bị cấp dưới phản, mất quyền kiểm soát.',
        'Quan Lộc': 'Sự nghiệp quan lộ hanh thông, thích hợp quản lý cấp cao, chính trị, hành chính. Đắc → thăng tiến nhanh; Hãm → hay bị ghen ghét.',
        'Điền Trạch': 'Nhà cửa khang trang, bất động sản quý. Thừa kế từ gia đình có uy tín. Hãm → nhà đẹp nhưng nợ nhiều.',
        'Phúc Đức': 'Phúc đức tổ tiên dày, gia tộc có truyền thống quyền quý. Đời sống tinh thần phong phú. Hãm → phúc đức bị tiêu hao.',
        'Phụ Mẫu': 'Cha mẹ có địa vị xã hội, nền giáo dục tốt. Được cha mẹ bảo bọc nhưng kèm áp lực kỳ vọng cao.',
    },
    'Thiên Cơ': {
        'Mệnh': 'Thông minh, nhanh trí, linh hoạt nhưng hay do dự. Giỏi phân tích, lập kế hoạch. Đắc → quân sư tài ba; Hãm → mưu toan, khó quyết đoán.',
        'Huynh Đệ': 'Anh chị em thông minh, hay tính toán. Quan hệ anh em phức tạp, nhiều bàn bạc nhưng khó thống nhất.',
        'Phu Thê': 'Bạn đời thông minh, linh hoạt nhưng hay thay đổi ý kiến. Tình cảm nhiều suy nghĩ, lý trí. Hãm → bạn đời phức tạp.',
        'Tử Tức': 'Con cái thông minh lanh lợi. Có khiếu phân tích, khoa học. Hãm → con thiếu kiên nhẫn, hay đổi ý.',
        'Tài Bạch': 'Kiếm tiền bằng trí tuệ, phân tích, lập kế hoạch. Thích hợp tài chính, kế toán, tư vấn. Hãm → tính quá nhiều bỏ lỡ cơ hội.',
        'Tật Ách': 'Dễ stress do suy nghĩ quá nhiều. Liên quan hệ thần kinh, giấc ngủ, lo âu. Đắc → phục hồi nhanh; Hãm → mất ngủ mãn tính.',
        'Thiên Di': 'Hay di chuyển, thay đổi môi trường. Thích nghi nhanh. Đắc → phát triển ở nước ngoài; Hãm → bôn ba không ổn định.',
        'Nô Bộc': 'Cộng sự thông minh, giỏi tham mưu. Nhưng cấp dưới cũng hay tính toán, cần quản lý chặt.',
        'Quan Lộc': 'Sự nghiệp thiên về tham mưu, kế hoạch, công nghệ, nghiên cứu. Hay đổi công việc. Đắc → chuyên gia giỏi; Hãm → bấp bênh.',
        'Điền Trạch': 'Hay chuyển nhà, thay đổi nơi ở. Thiên Cơ tại đây = bất ổn về nhà cửa. Đắc → đổi nhà tốt hơn; Hãm → mất nhà.',
        'Phúc Đức': 'Đời sống tinh thần phong phú, ham học hỏi. Tổ tiên có trí tuệ. Hãm → hay lo lắng, suy nghĩ tiêu cực.',
        'Phụ Mẫu': 'Cha mẹ thông minh, thiên về học thuật. Giáo dục thiên về lý trí hơn tình cảm. Hãm → quan hệ xa cách.',
    },
    'Thái Dương': {
        'Mệnh': 'Ngoại hình sáng sủa, tràn đầy năng lượng, thích giúp đỡ. Đắc → danh tiếng, lãnh đạo xuất sắc; Hãm → hao tổn vì người, lao lực.',
        'Huynh Đệ': 'Anh em (đặc biệt anh trai) nổi bật, có địa vị. Quan hệ anh em hào phóng nhưng hay tranh cãi.',
        'Phu Thê': 'Với nữ: chồng giỏi giang, nổi bật. Với nam: vợ có cá tính mạnh. Đắc → hôn nhân sáng sủa; Hãm → ly hôn.',
        'Tử Tức': 'Con trai nổi bật, có tài lãnh đạo. Quan hệ cha-con mật thiết. Hãm → con trai gây phiền, xa cách.',
        'Tài Bạch': 'Thu nhập từ danh tiếng, nghề liên quan đến công chúng, truyền thông. Đắc → tiền dồi dào nhờ uy tín; Hãm → tiền đến rồi đi nhanh.',
        'Tật Ách': 'Liên quan mắt, tim, huyết áp cao. Đắc → mắt sáng, thể lực tốt; Hãm → bệnh mắt, tim mạch, nhức đầu.',
        'Thiên Di': 'Nổi tiếng ở ngoài, được xã hội công nhận. Đắc → quý nhân phương xa; Hãm → hao tổn do đi xa, mất tiền bên ngoài.',
        'Nô Bộc': 'Cộng sự nhiệt tình, hào phóng. Nam giới trong đội nhóm nổi bật. Hãm → bị lợi dụng lòng tốt.',
        'Quan Lộc': 'Sự nghiệp công khai, nghề liên quan đến ánh sáng, truyền thông, chính trị, giáo dục. Đắc → danh vọng hiển hách; Hãm → hữu danh vô thực.',
        'Điền Trạch': 'Nhà cửa sáng sủa, hướng đông tốt. Đắc → nhà đẹp thoáng đãng; Hãm → hay phải sửa nhà, tốn kém.',
        'Phúc Đức': 'Tổ tiên có danh vọng. Đời sống tinh thần tích cực, lạc quan. Hãm → phúc mỏng, hy sinh nhiều cho người.',
        'Phụ Mẫu': 'Cha có địa vị hoặc tài năng (nhất là với nữ mệnh). Được cha dạy dỗ tốt. Hãm → cha vắng mặt hoặc xa cách.',
    },
    'Vũ Khúc': {
        'Mệnh': 'Tính cách cương quyết, thẳng thắn, giỏi tài chính. Ít nói nhưng làm nhiều. Đắc → doanh nhân thành đạt; Hãm → cô đơn, khắc người thân.',
        'Huynh Đệ': 'Anh em ít, quan hệ "công việc" hơn tình cảm. Mỗi người một hướng. Hãm → tranh chấp tài sản.',
        'Phu Thê': 'Bạn đời có khả năng tài chính, thực tế. Hôn nhân "đối tác" hơn lãng mạn. Hãm → ly hôn vì tiền bạc.',
        'Tử Tức': 'Con cái ít nhưng bản lĩnh, giỏi kinh doanh. Quan hệ cha con thiếu tình cảm. Hãm → xa con.',
        'Tài Bạch': 'Tài tinh số 1 của Tử Vi! Giỏi kiếm tiền, quản lý tài chính. Đắc → phú gia; Hãm → tiền vào nhưng hay mất do cờ bạc.',
        'Tật Ách': 'Liên quan phổi, hô hấp, xương khớp (Kim hành). Đắc → thể chất cứng cáp; Hãm → bệnh phổi, gãy xương.',
        'Thiên Di': 'Ra ngoài kiếm tiền giỏi, người thực tế ở đâu cũng sống được. Hãm → bôn ba vì tiền, vất vả.',
        'Nô Bộc': 'Cộng sự giỏi tài chính, thực tế. Nhưng ít tình cảm, chỉ vì lợi ích. Hãm → bị nhân viên gia thế tài chính.',
        'Quan Lộc': 'Sự nghiệp tài chính, ngân hàng, kế toán, kinh doanh. Rất tốt cho doanh nhân. Đắc → sự nghiệp vững vàng; Hãm → thất bại do liều lĩnh.',
        'Điền Trạch': 'Tích lũy bất động sản tốt. Giỏi đầu tư nhà đất. Đắc → nhiều bất động sản; Hãm → mất nhà do nợ.',
        'Phúc Đức': 'Tổ tiên giỏi kinh doanh, phúc đức từ tiền bạc. Đời sống vật chất tốt. Hãm → phúc thiên về vật chất, thiếu tinh thần.',
        'Phụ Mẫu': 'Cha mẹ giỏi kinh doanh, thực tế. Nền giáo dục thiên về tài chính. Hãm → cha mẹ khắc nghiệt, ít tình cảm.',
    },
    'Thiên Đồng': {
        'Mệnh': 'Hiền lành, phúc hậu, lạc quan, thích hưởng thụ. Dáng tròn trịa, khuôn mặt hiền. Đắc → được yêu mến, sống an nhàn; Hãm → lười biếng, thiếu ý chí.',
        'Huynh Đệ': 'Anh em hòa thuận, hay giúp đỡ nhau. Tình cảm anh em ấm áp. Hãm → anh em ỷ lại lẫn nhau.',
        'Phu Thê': 'Bạn đời hiền lành, dễ chịu. Hôn nhân êm ấm nhưng thiếu đam mê. Hãm → bạn đời lười nhác, thiếu trách nhiệm.',
        'Tử Tức': 'Con cái ngoan hiền, dễ nuôi, phúc hậu. Hãm → con lười học, thiếu động lực. Đắc → con hiếu thảo, biết lo.',
        'Tài Bạch': 'Tiền đến dễ dàng, không cần tranh giành. Thu nhập ổn định nhưng không đột phá. Hãm → thiếu tiền do lười kiếm.',
        'Tật Ách': 'Thể chất phúc hậu, tròn trịa. Dễ béo phì, tiểu đường, cholesterol. Đắc → ít bệnh; Hãm → bệnh do ăn uống.',
        'Thiên Di': 'Ra ngoài được yêu mến, đi đâu cũng gặp quý nhân. Môi trường thuận lợi. Hãm → thụ động, không biết nắm cơ hội.',
        'Nô Bộc': 'Cộng sự hiền lành, hòa thuận. Đội nhóm hài hòa nhưng thiếu tính cạnh tranh. Hãm → nhân viên lười.',
        'Quan Lộc': 'Sự nghiệp an nhàn — công chức, giáo viên, nghề ổn định. Không thích áp lực. Đắc → thăng tiến dần dần; Hãm → đình trệ.',
        'Điền Trạch': 'Nhà cửa ấm cúng, thoải mái. Thích sống yên tĩnh. Đắc → nhà đẹp hưởng phúc; Hãm → nhà cũ, lười sửa chữa.',
        'Phúc Đức': 'Phúc đức rất dày! Thiên Đồng = phúc tinh tại Phúc Đức. Đời sống tinh thần an lạc, thọ cao. Hãm → phúc bị hao do ẩu.',
        'Phụ Mẫu': 'Cha mẹ hiền từ, gia đình hạnh phúc. Được yêu thương, nuôi dưỡng tốt. Hãm → cha mẹ quá nuông chiều.',
    },
    'Liêm Trinh': {
        'Mệnh': 'Tính cách phức tạp, đa năng, hay ghen tuông. Ngoại hình ưa nhìn. Đắc → quản lý giỏi, chính trực; Hãm → tù tội, tai nạn, lá bài nguy hiểm.',
        'Huynh Đệ': 'Anh em có tính cách mạnh, dễ xung đột. Quan hệ kiểu "yêu ghét rõ ràng". Hãm → tranh chấp quyết liệt.',
        'Phu Thê': 'Tình cảm nồng cháy nhưng nhiều sóng gió. Bạn đời cá tính mạnh. Hãm → tam giác tình cảm, ngoại tình.',
        'Tử Tức': 'Con cái cá tính mạnh, thiên về nghệ thuật hoặc quân sự. Hãm → con ngỗ nghịch, khó dạy.',
        'Tài Bạch': 'Kiếm tiền từ nghề liên quan đến pháp luật, chính trị, quân đội. Hãm → tham nhũng, tiền bất chính.',
        'Tật Ách': 'Liên quan tim, mắt, hệ thần kinh trung ương. Đắc → mạnh mẽ; Hãm → bệnh tim, tai nạn, bỏng.',
        'Thiên Di': 'Ra ngoài xã giao giỏi, quan hệ phức tạp. Đắc → quyền lực bên ngoài; Hãm → bị hại do giao du.',
        'Nô Bộc': 'Cộng sự mạnh nhưng khó kiểm soát. Quan hệ phức tạp với cấp dưới. Hãm → bị cấp dưới phản bội.',
        'Quan Lộc': 'Sự nghiệp quân đội, pháp luật, chính trị, nghệ thuật. Tham vọng lớn. Đắc → quyền lực; Hãm → ngã ngựa.',
        'Điền Trạch': 'Nhà cửa liên quan đến cơ quan nhà nước. Hãm → bị kiện tụng về nhà đất. Đắc → nhà ở khu vực tốt.',
        'Phúc Đức': 'Tổ tiên có tính cách mạnh, gia tộc phức tạp. Đời sống nội tâm nhiều trăn trở. Hãm → nghiệp từ đời trước.',
        'Phụ Mẫu': 'Cha mẹ nghiêm khắc, có thể liên quan chính quyền. Nền giáo dục kỷ luật. Hãm → cha mẹ xa cách, khắc phụ mẫu.',
    },
    'Thiên Phủ': {
        'Mệnh': 'Phúc hậu, ổn định, giỏi quản lý tài sản. Tướng mạo đầy đặn. Đắc → giàu có, an nhàn; Hãm → bề ngoài phong lưu nhưng túi rỗng.',
        'Huynh Đệ': 'Anh em khá giả, giúp đỡ được. Quan hệ anh em ổn định, bền vững. Hãm → anh em ỷ tiền.',
        'Phu Thê': 'Bạn đời giàu có, biết quản lý gia đình. Hôn nhân ổn định. Đắc → vợ/chồng giàu; Hãm → bạn đời phung phí.',
        'Tử Tức': 'Con cái phúc hậu, ít bệnh, dễ nuôi. Có thể nhiều con. Đắc → con thành đạt, hiếu thảo.',
        'Tài Bạch': 'Tài chính ổn định, giỏi tích lũy, quản lý tài sản. Thiên Phủ = kho lẫm. Đắc → giàu bền; Hãm → "kho rỗng", nợ ngầm.',
        'Tật Ách': 'Thể chất đầy đặn, tròn trịa. Liên quan dạ dày, tiêu hóa (Thổ hành). Đắc → ít bệnh; Hãm → béo phì, đái tháo đường.',
        'Thiên Di': 'Ra ngoài gặp may, được giúp đỡ. Môi trường bên ngoài thuận lợi. Đắc → quý nhân nhiều; Hãm → hào nhoáng giả tạo.',
        'Nô Bộc': 'Cộng sự trung thành, đáng tin cậy. Đội nhóm ổn định. Đắc → nhân viên tốt; Hãm → nhân viên lợi dụng.',
        'Quan Lộc': 'Sự nghiệp quản lý, tài chính, bất động sản, kho bãi. Ổn định hơn đột phá. Đắc → sự nghiệp vững chắc.',
        'Điền Trạch': 'Nhà cửa đẹp, rộng rãi. Tích lũy bất động sản giỏi. Thiên Phủ tại Điền Trạch = rất quý. Đắc → nhà đất dư dả.',
        'Phúc Đức': 'Phúc đức dày, tổ tiên giàu có. An hưởng phúc lộc. Hãm → phúc bề ngoài, bên trong thiếu hụt.',
        'Phụ Mẫu': 'Cha mẹ giàu có, gia đình khá giả. Được nuôi dưỡng đầy đủ. Hãm → cha mẹ phô trương.',
    },
    'Thái Âm': {
        'Mệnh': 'Dịu dàng, thanh lịch, giàu cảm xúc, có duyên. Ngoại hình trắng trẻo. Đắc → tài năng nghệ thuật; Hãm → đa sầu, trầm cảm.',
        'Huynh Đệ': 'Chị em (đặc biệt chị gái) nổi bật. Quan hệ anh em tình cảm, tinh tế. Hãm → hay ghen tỵ ngầm.',
        'Phu Thê': 'Với nam: vợ đẹp, dịu dàng. Với nữ: chồng lãng mạn nhưng hay mơ mộng. Đắc → hôn nhân hài hòa; Hãm → bạn đời phức tạp tình cảm.',
        'Tử Tức': 'Con gái nổi bật (nhất là trưởng nữ). Con cái có thiên hướng nghệ thuật. Hãm → con nhạy cảm quá mức.',
        'Tài Bạch': 'Thu nhập từ bất động sản, nghề đêm, nghệ thuật, làm đẹp. Tiền đến âm thầm. Đắc → giàu nhờ tích lũy; Hãm → hao tài âm thầm.',
        'Tật Ách': 'Liên quan thận, hệ tiết niệu, mắt, da (Thủy hành). Đắc → da đẹp, sức khỏe tốt; Hãm → bệnh thận, mắt, phụ khoa.',
        'Thiên Di': 'Ra ngoài được phụ nữ giúp đỡ. Phát triển về đêm, ở nước ngoài. Đắc → nổi tiếng bên ngoài; Hãm → bấp bênh.',
        'Nô Bộc': 'Cộng sự nữ nhiều, tỉ mỉ, đáng tin. Đội nhóm hài hòa. Hãm → bị nhân viên nữ phản bội.',
        'Quan Lộc': 'Sự nghiệp nghệ thuật, bất động sản, thời trang, làm đẹp, đêm. Đắc → nổi tiếng; Hãm → bấp bênh, phải làm đêm.',
        'Điền Trạch': 'Nhà cửa đẹp, tinh tế. Thích trang trí. Thái Âm tại Điền Trạch = tốt cho bất động sản. Đắc → nhà đẹp; Hãm → hao tổn.',
        'Phúc Đức': 'Phúc đức từ mẹ/bà ngoại. Đời sống tinh thần phong phú, yêu nghệ thuật. Hãm → hay buồn, trầm cảm nhẹ.',
        'Phụ Mẫu': 'Mẹ nổi bật (nhất với nam mệnh). Được mẹ yêu thương, dạy dỗ về cảm xúc. Hãm → mẹ xa cách hoặc ốm yếu.',
    },
    'Tham Lang': {
        'Mệnh': 'Đa tài, ham muốn, tham vọng lớn. Duyên lớn, giỏi giao tiếp, mến khách. Đắc → thành công trong giao tiếp; Hãm → đam mê sa ngã, rượu chè.',
        'Huynh Đệ': 'Anh em đông, quan hệ vui vẻ nhưng "bề nổi". Hay tụ tập nhưng ít giúp thực chất. Hãm → tranh giành.',
        'Phu Thê': 'Hôn nhân đam mê, lãng mạn nhưng nhiều cám dỗ. Bạn đời đa tài, đẹp. Hãm → ngoại tình, đào hoa.',
        'Tử Tức': 'Con cái thông minh, đa năng, ham chơi. Có khiếu nghệ thuật, giải trí. Hãm → con ham chơi hơn học.',
        'Tài Bạch': 'Kiếm tiền từ giao tiếp, bán hàng, giải trí, ẩm thực. Tiền vào nhanh ra nhanh. Đắc → giàu từ kinh doanh; Hãm → tiêu hoang.',
        'Tật Ách': 'Liên quan gan, thận, sinh dục (Mộc/Thủy). Dễ nghiện rượu bia. Đắc → sức khỏe tốt; Hãm → bệnh gan, nghiện.',
        'Thiên Di': 'Ra ngoài thu hút, xã giao giỏi, nhiều mối quan hệ. Tham Lang = Đào Hoa. Đắc → ngoại giao; Hãm → sa đọa bên ngoài.',
        'Nô Bộc': 'Cộng sự vui vẻ, giỏi giao tiếp. Nhưng lợi ích cá nhân cao. Hãm → bị cộng sự lợi dụng.',
        'Quan Lộc': 'Sự nghiệp giao tiếp, bán hàng, giải trí, ngoại giao, ẩm thực. Đắc → doanh nhân giỏi; Hãm → bê bối nghề nghiệp.',
        'Điền Trạch': 'Nhà cửa có vườn, cây cối (Mộc hành). Hay trang trí, cải tạo nhà. Hãm → nhà cửa bừa bộn.',
        'Phúc Đức': 'Tổ tiên hoạt bát, ham vui. Đời sống tinh thần phong phú nhưng ham muốn nhiều. Hãm → tổ tiên để lại nghiệp ham chơi.',
        'Phụ Mẫu': 'Cha mẹ vui tính, biết xã giao. Gia đình có truyền thống giao tiếp, kinh doanh. Hãm → cha mẹ ham chơi.',
    },
    'Cự Môn': {
        'Mệnh': 'Giỏi ăn nói, tranh biện, khả năng thuyết phục cao. Nhưng hay thị phi, khẩu khiểu. Đắc → luật sư, diễn giả; Hãm → thị phi, kiện tụng.',
        'Huynh Đệ': 'Anh em hay cãi nhau, bất hòa, thị phi. Quan hệ nhiều lời qua tiếng lại. Hãm → anh em kiện tụng.',
        'Phu Thê': 'Hay tranh cãi trong hôn nhân nhưng cũng hay giao tiếp. Bạn đời giỏi nói. Hãm → ly hôn vì cãi nhau.',
        'Tử Tức': 'Con cái giỏi ăn nói, biện luận. Có khiếu ngôn ngữ. Hãm → con ngỗ nghịch, hay cãi lại.',
        'Tài Bạch': 'Kiếm tiền từ miệng lưỡi — bán hàng, truyền thông, luật, dạy học. Đắc → giàu nhờ ăn nói; Hãm → mất tiền vì thị phi.',
        'Tật Ách': 'Liên quan miệng, răng, cổ họng, dạ dày (do ăn uống thất thường). Đắc → ít bệnh; Hãm → bệnh miệng, dạ dày.',
        'Thiên Di': 'Ra ngoài hay gặp thị phi, nhưng cũng giỏi giao tiêp. Đắc → nổi tiếng nhờ khẩu tài; Hãm → bị nói xấu.',
        'Nô Bộc': 'Cộng sự hay tranh cãi, ý kiến nhiều. Đội nhóm năng động nhưng ồn ào. Hãm → cấp dưới phản bội bằng lời.',
        'Quan Lộc': 'Sự nghiệp cần khẩu tài — luật sư, giáo viên, MC, bán hàng, tư vấn. Đắc → thành công lớn; Hãm → mất việc do thị phi.',
        'Điền Trạch': 'Nhà cửa hay có tranh chấp, kiện tụng. Hãm → mất nhà do kiện cáo. Đắc → mua bán nhà tốt nhờ thương lượng.',
        'Phúc Đức': 'Tổ tiên có khẩu tài, nghề truyền miệng. Đời sống nội tâm nhiều suy tư. Hãm → nghiệp thị phi từ đời trước.',
        'Phụ Mẫu': 'Cha mẹ hay nói, kỷ luật bằng lời. Giáo dục thiên về tranh luận. Hãm → cãi nhau với cha mẹ nhiều.',
    },
    'Thiên Lương': {
        'Mệnh': 'Chính trực, nhân từ, hay giúp đỡ, tuổi thọ cao. Có duyên với tôn giáo, triết học. Đắc → quý nhân, thầy thuốc giỏi; Hãm → cô đơn, khó gần.',
        'Huynh Đệ': 'Anh em đáng tin cậy, hay giúp đỡ. Quan hệ anh em bền vững. Hãm → anh em hay mượn tiền không trả.',
        'Phu Thê': 'Bạn đời chính trực, đáng tin. Hôn nhân ổn định, thiếu lãng mạn. Đắc → hôn nhân bền; Hãm → bạn đời bảo thủ quá mức.',
        'Tử Tức': 'Con cái ngoan ngoãn, hiếu thảo, thích học. Đắc → con thành người tốt; Hãm → con quá bảo thủ.',
        'Tài Bạch': 'Kiếm tiền từ uy tín, y tế, giáo dục, tôn giáo. Tiền đến sạch sẽ. Đắc → giàu nhờ uy tín; Hãm → bị lợi dụng lòng tốt.',
        'Tật Ách': 'Thiên Lương = thọ tinh. Sức khỏe tốt, hồi phục nhanh. Đắc → ít bệnh, thọ; Hãm → bệnh mãn tính nhưng không nguy hiểm.',
        'Thiên Di': 'Ra ngoài được kính trọng. Hay gặp quý nhân lớn tuổi. Đắc → được bảo hộ; Hãm → cô đơn bên ngoài.',
        'Nô Bộc': 'Cộng sự trung thực, đáng tin cậy. Được cấp dưới kính trọng. Hãm → nhân viên lợi dụng lòng tốt.',
        'Quan Lộc': 'Sự nghiệp y tế, giáo dục, tôn giáo, từ thiện, pháp luật. Đắc → thầy thuốc/thầy giáo giỏi; Hãm → nghề lương thấp.',
        'Điền Trạch': 'Nhà cửa bền vững, lâu đời. Bất động sản ổn định. Đắc → nhà cửa yên lành; Hãm → nhà cũ khó bán.',
        'Phúc Đức': 'Phúc đức rất dày, Thiên Lương = "thọ tinh" nên Phúc Đức tốt nhất. Tổ tiên chính trực, gia tộc có uy tín. Thọ cao.',
        'Phụ Mẫu': 'Cha mẹ chính trực, đáng kính. Được dạy dỗ đạo đức tốt. Đắc → cha mẹ sống thọ; Hãm → cha mẹ bảo thủ.',
    },
    'Thất Sát': {
        'Mệnh': 'Tính cách dũng mãnh, quyết đoán, dám làm. Tướng mạo cứng rắn. Đắc → tướng quân, CEO; Hãm → đơn độc, bạo lực.',
        'Huynh Đệ': 'Anh em ít, tính cách mạnh, hay xung đột. Mỗi người tự lập. Hãm → tranh chấp gay gắt.',
        'Phu Thê': 'Bạn đời mạnh mẽ, cá tính. Hôn nhân nhiều sóng gió, "yêu nhau lắm cắn nhau đau". Hãm → ly hôn, bạo lực gia đình.',
        'Tử Tức': 'Con cái ít, tính cách mạnh, độc lập sớm. Quan hệ cha con kiểu quân đội. Hãm → xa con, khắc tử.',
        'Tài Bạch': 'Kiếm tiền nhanh, mạnh nhưng cũng mất nhanh. Dám đầu tư liều. Đắc → kiếm tiền giỏi; Hãm → phá sản do liều.',
        'Tật Ách': 'Hay chấn thương, phẫu thuật, tai nạn (Kim hành). Thể chất mạnh nhưng dễ bị thương. Đắc → hồi phục nhanh.',
        'Thiên Di': 'Ra ngoài dũng cảm, dám đối đầu. Nhưng cũng hay gây sự. Đắc → thắng lợi bên ngoài; Hãm → rủi ro tai nạn.',
        'Nô Bộc': 'Cộng sự mạnh, dám làm. Nhưng khó kiểm soát, hay phản kháng. Hãm → bị nhân viên lật đổ.',
        'Quan Lộc': 'Sự nghiệp quân đội, cảnh sát, thể thao, phẫu thuật. Thăng tiến bằng thực lực. Đắc → quyền lực lớn; Hãm → bị loại bỏ.',
        'Điền Trạch': 'Nhà cửa hay sửa chữa, thay đổi nhiều. Hãm → mất nhà hoặc cháy nhà. Đắc → nhà kiên cố.',
        'Phúc Đức': 'Tổ tiên dũng mãnh, gia tộc quân nhân/chiến đấu. Đời sống tinh thần căng thẳng. Hãm → nghiệp chiến đấu.',
        'Phụ Mẫu': 'Cha mẹ nghiêm khắc, kỷ luật sắt. Giáo dục kiểu quân đội. Hãm → cha mẹ bạo lực, xa cách.',
    },
    'Phá Quân': {
        'Mệnh': 'Phá cách, sáng tạo, dám thay đổi. Không chấp nhận khuôn khổ. Đắc → doanh nhân đột phá; Hãm → phá hoại, bất ổn.',
        'Huynh Đệ': 'Anh em ít, tính hay thay đổi, khó đoán. Mỗi người một số phận. Hãm → anh em gây rối.',
        'Phu Thê': 'Hôn nhân biến động, bạn đời cá tính mạnh. Nhiều thay đổi trong tình cảm. Hãm → đa hôn, ly dị nhiều lần.',
        'Tử Tức': 'Con cái cá tính, nổi loạn, sáng tạo. Hay làm ngược kỳ vọng. Hãm → con khó dạy, phá phách.',
        'Tài Bạch': 'Tài chính biến động lớn — giàu nhanh, nghèo nhanh. Thích đầu tư mạo hiểm. Đắc → phá cũ xây mới; Hãm → phá sản.',
        'Tật Ách': 'Hay phải phẫu thuật, tai nạn ảnh hưởng ngoại hình. Sức đề kháng mạnh. Hãm → thương tích, sẹo.',
        'Thiên Di': 'Hay thay đổi nơi ở, môi trường. Đắc → phát triển nhờ thay đổi; Hãm → bấp bênh, vô gia cư.',
        'Nô Bộc': 'Cộng sự hay thay đổi, đến rồi đi. Đội nhóm bất ổn. Hãm → nhân viên phản bội, đổi phe.',
        'Quan Lộc': 'Sự nghiệp hay thay đổi, đổi nghề nhiều. Thích hợp sáng tạo, startup. Đắc → đột phá; Hãm → không nghề nào vững.',
        'Điền Trạch': 'Nhà cửa hay thay đổi, sửa chữa, mua bán liên tục. Hãm → không có nhà ổn định.',
        'Phúc Đức': 'Gia tộc trải qua nhiều biến cố, thăng trầm. Đời sống tinh thần hay "xáo trộn". Hãm → nghiệp phá hoại.',
        'Phụ Mẫu': 'Cha mẹ hay thay đổi, di chuyển nhiều. Giáo dục không nhất quán. Hãm → cha mẹ ly dị.',
    },
    'Thiên Tướng': {
        'Mệnh': 'Trung thực, chính trực, "ấn tín" tinh. Hay được tín nhiệm. Đắc → quản lý, công chức; Hãm → nhu nhược, bị lợi dụng.',
        'Huynh Đệ': 'Anh em đáng tin, hay giúp đỡ. Quan hệ anh em bền vững. Hãm → anh em lợi dụng lòng tốt.',
        'Phu Thê': 'Bạn đời đáng tin cậy, trung thực. Hôn nhân ổn định, thiếu sáng tạo. Đắc → hôn nhân bền; Hãm → bạn đời nhàm chán.',
        'Tử Tức': 'Con cái ngoan, biết lễ phép. Hãm → con thiếu bản lĩnh. Đắc → con cái thành đạt nhờ đức tính tốt.',
        'Tài Bạch': 'Tài chính ổn định, kiếm tiền bằng uy tín. Thiên Tướng = ấn tín, tốt cho nghề văn phòng, hành chính. Đắc → tài chính vững.',
        'Tật Ách': 'Liên quan lá lách, dạ dày, hệ miễn dịch. Sức khỏe khá ổn định. Đắc → ít bệnh; Hãm → bệnh mãn tính nhẹ.',
        'Thiên Di': 'Được tin tưởng ở bên ngoài. Hình ảnh xã hội tốt. Đắc → quý nhân phù trợ; Hãm → bị lợi dụng.',
        'Nô Bộc': 'Cộng sự trung thành, đáng tin cậy. Đội nhóm ổn định. Đắc → nhân viên tốt; Hãm → nhân viên kém năng lực.',
        'Quan Lộc': 'Sự nghiệp hành chính, công chức, quản lý, văn phòng. Ổn định, thăng tiến từ từ. Đắc → thành công bền vững.',
        'Điền Trạch': 'Nhà cửa ổn định, bền vững. Bất động sản tốt. Đắc → nhà đẹp; Hãm → nhà cũ, khó nâng cấp.',
        'Phúc Đức': 'Tổ tiên trung thực, gia tộc chính trực. Đời sống tinh thần thanh thản. Hãm → phúc trung bình.',
        'Phụ Mẫu': 'Cha mẹ đáng tin, giáo dục tốt về đạo đức. Giấy tờ, bằng cấp thuận lợi. Đắc → được cha mẹ lo lắng.',
    },
};
