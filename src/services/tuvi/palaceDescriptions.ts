/**
 * Palace Descriptions — Academic Tử Vi Context for 12 Palaces
 *
 * Static data providing domain descriptions and classical academic context
 * for each of the 12 Tử Vi palaces, sourced from traditional Tử Vi Đẩu Số resources.
 */

export interface PalaceDescription {
    readonly icon: string;
    readonly domain: string;
    readonly academicContext: string;
}

/**
 * Academic priority order for the 12 palaces.
 * Follows the analysis framework: core (Mệnh, Phúc Đức) → career/wealth
 * (Tài Bạch, Quan Lộc, Thiên Di) → relationships → auxiliary.
 */
export const PALACE_ORDER: readonly string[] = [
    'Mệnh', 'Phúc Đức', 'Tài Bạch', 'Quan Lộc',
    'Thiên Di', 'Phu Thê', 'Tử Tức', 'Phụ Mẫu',
    'Huynh Đệ', 'Nô Bộc', 'Điền Trạch', 'Tật Ách',
] as const;

/**
 * Academic descriptions for each of the 12 Tử Vi palaces.
 *
 * Each entry includes:
 * - `icon` — Visual identifier for the palace
 * - `domain` — What aspect of life this palace governs
 * - `academicContext` — Classical Tử Vi academic explanation
 *
 * Sources: Tử Vi Đẩu Số Toàn Thư (紫微斗数全书), Tử Vi Tân Luận, Tử Vi Chính Nghĩa.
 */
export const PALACE_DESCRIPTIONS: Record<string, PalaceDescription> = {
    'Mệnh': {
        icon: '👤',
        domain: 'Bản thân, tính cách, ngoại hình, tố chất bẩm sinh',
        academicContext:
            'Cung Mệnh là cung quan trọng nhất trong lá số Tử Vi, phản ánh bản chất con người, tính cách, ' +
            'ngoại hình và tố chất bẩm sinh. Đây là trung tâm của toàn bộ lá số, mọi cung khác đều được ' +
            'luận giải trong mối quan hệ với Cung Mệnh. Chính tinh tọa thủ và miếu vượng địa quyết định ' +
            'cách cục cao thấp của đời người.',
    },
    'Huynh Đệ': {
        icon: '👥',
        domain: 'Anh chị em, bạn bè thân thiết, đồng nghiệp ngang hàng',
        academicContext:
            'Cung Huynh Đệ luận về mối quan hệ với anh chị em ruột, bạn bè thân thiết và đồng nghiệp cùng cấp. ' +
            'Cung này cho biết sự hòa thuận hay xung đột trong gia đình, khả năng hợp tác và nhận được sự ' +
            'giúp đỡ từ người ngang vai. Trong xã hội hiện đại, cung này còn phản ánh mối quan hệ đối tác kinh doanh.',
    },
    'Phu Thê': {
        icon: '💑',
        domain: 'Hôn nhân, tình cảm, mối quan hệ vợ chồng',
        academicContext:
            'Cung Phu Thê chủ về chuyện hôn nhân, tình duyên và mối quan hệ vợ chồng. ' +
            'Cung này cho biết người bạn đời như thế nào, thời điểm kết hôn thuận lợi, ' +
            'chất lượng hôn nhân và sự hài hòa trong gia đình. Chính tinh Miếu Vượng tại đây ' +
            'báo hiệu hôn nhân tốt đẹp; Hãm hoặc gặp sát tinh thì tình duyên trắc trở.',
    },
    'Tử Tức': {
        icon: '👶',
        domain: 'Con cái, sáng tạo, đầu tư, hậu duệ',
        academicContext:
            'Cung Tử Tức luận về con cái — số lượng, tính cách, mối quan hệ cha mẹ-con cái, và phúc đức từ con. ' +
            'Theo nghĩa rộng, cung này còn đại diện cho khả năng sáng tạo, các dự án đầu tư, ' +
            'và sự kế thừa. Cát tinh tọa thủ chỉ con cái hiếu thuận; sát tinh cho thấy khó khăn trong sinh nở hoặc giáo dục con.',
    },
    'Tài Bạch': {
        icon: '💰',
        domain: 'Tài chính, thu nhập, khả năng kiếm tiền',
        academicContext:
            'Cung Tài Bạch chủ về tài chính, nguồn thu nhập, khả năng kiếm tiền và cách quản lý tài sản. ' +
            'Cung này phân biệt rõ giữa "chính tài" (thu nhập ổn định) và "thiên tài" (tài lộc bất ngờ). ' +
            'Cần luận kết hợp với Cung Quan Lộc (tam hợp) và Cung Mệnh để đánh giá toàn diện vận tài.',
    },
    'Tật Ách': {
        icon: '🏥',
        domain: 'Sức khỏe, bệnh tật, tai nạn, tâm lý',
        academicContext:
            'Cung Tật Ách luận về sức khỏe thể chất và tinh thần, các bệnh tật bẩm sinh hoặc mắc phải, ' +
            'nguy cơ tai nạn và thương tổn. Mỗi chính tinh tương ứng với những nhóm bệnh khác nhau theo Ngũ Hành. ' +
            'Sát tinh (Kình, Đà, Hỏa, Linh) tại đây cần đặc biệt lưu ý về an toàn và sức khỏe.',
    },
    'Thiên Di': {
        icon: '✈️',
        domain: 'Di chuyển, quan hệ xã hội bên ngoài, xuất ngoại',
        academicContext:
            'Cung Thiên Di (còn gọi là Thiên Dịch) chủ về hoạt động bên ngoài, các mối quan hệ xã hội, ' +
            'khả năng phát triển nơi xa, và vận may khi đi xa nhà. Cung này đối xung với Cung Mệnh, ' +
            'bổ trợ cho nhau — người có Mệnh yếu nhưng Thiên Di mạnh thường phát triển tốt khi rời quê hương.',
    },
    'Nô Bộc': {
        icon: '🤝',
        domain: 'Cấp dưới, nhân viên, bạn bè, mối giao tế',
        academicContext:
            'Cung Nô Bộc (còn gọi là Giao Hữu) luận về mối quan hệ với cấp dưới, nhân viên, thuộc hạ, ' +
            'cũng như bạn bè và đối tác trong các mối giao tế. Cung này cho biết khả năng quản lý người khác, ' +
            'sự trung thành hay phản bội từ người dưới quyền. Trong kinh doanh, cung này phản ánh chất lượng đội ngũ.',
    },
    'Quan Lộc': {
        icon: '🏢',
        domain: 'Sự nghiệp, công danh, học vấn, thăng tiến',
        academicContext:
            'Cung Quan Lộc chủ về sự nghiệp, công danh, địa vị xã hội và con đường thăng tiến. ' +
            'Cung này cùng với Cung Mệnh và Cung Tài Bạch tạo thành tam hợp "Mệnh — Tài — Quan", ' +
            'là bộ ba quan trọng nhất khi đánh giá thành tựu sự nghiệp và vật chất của một người.',
    },
    'Điền Trạch': {
        icon: '🏠',
        domain: 'Nhà cửa, bất động sản, gia đình, thừa kế',
        academicContext:
            'Cung Điền Trạch luận về nhà cửa, bất động sản, gia sản thừa kế và môi trường sống. ' +
            'Cung này cho biết khả năng sở hữu tài sản cố định, chất lượng nơi ở và sự ổn định gia đình. ' +
            'Cát tinh tọa thủ chỉ sự giàu có về bất động sản; sát tinh thì hay thay đổi chỗ ở hoặc gia sản hao tán.',
    },
    'Phúc Đức': {
        icon: '🙏',
        domain: 'Phúc đức tổ tiên, đời sống tinh thần, tuổi thọ',
        academicContext:
            'Cung Phúc Đức phản ánh phúc phần tích lũy từ tổ tiên, đời sống tinh thần, ' +
            'khả năng hưởng phúc và tuổi thọ. Đây là cung rất quan trọng trong thuật Tử Vi vì nó cho biết ' +
            '"gốc rễ" phúc đức mà người đó được thừa hưởng. Cung Phúc Đức tốt có thể hóa giải nhiều hung tinh ở các cung khác.',
    },
    'Phụ Mẫu': {
        icon: '👨‍👩‍👧',
        domain: 'Cha mẹ, bề trên, giáo dục, giấy tờ pháp lý',
        academicContext:
            'Cung Phụ Mẫu luận về mối quan hệ với cha mẹ, các bậc bề trên, thầy cô giáo, ' +
            'và các vấn đề liên quan đến giấy tờ, pháp luật, hợp đồng. Cung này cho biết ' +
            'sự che chở từ cha mẹ, môi trường giáo dục thời niên thiếu và ảnh hưởng của di truyền gia đình.',
    },
};
