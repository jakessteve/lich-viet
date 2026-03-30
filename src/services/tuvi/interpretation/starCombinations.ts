// ═══════════════════════════════════════════════════════════════════
// Classical Star Combinations (Tổ Hợp Sao)
// Key: sorted star names joined by "|"
// ═══════════════════════════════════════════════════════════════════
export const STAR_COMBINATIONS: Record<string, string> = {
    'Thiên Phủ|Tử Vi': 'Tử Phủ Đồng Cung — Đế tinh hội kho tàng, cách cục đại phú đại quý. Chủ nhân có khí chất lãnh đạo thiên bẩm, sự nghiệp hanh thông, tài chính vững vàng. Đây là một trong những tổ hợp quý nhất trong Tử Vi.',
    'Tham Lang|Tử Vi': 'Tử Tham — Đế tinh gặp Đào Hoa tinh, vừa có uy quyền vừa đa tài, giỏi giao tiếp. Nếu Miếu Vượng thì phong lưu nhưng thành đạt; Hãm thì dễ sa vào sắc dục.',
    'Thất Sát|Tử Vi': 'Tử Sát — Đế tinh gặp Tướng tinh, quyền uy tuyệt đối nhưng cô độc ở đỉnh cao. Hành sự quyết đoán, mạnh mẽ, gặp nhiều thử thách nhưng cuối cùng thành công.',
    'Phá Quân|Tử Vi': 'Tử Phá — Đế tinh gặp Hao tinh, dám nghĩ dám làm, phá cách táo bạo. Cuộc đời nhiều biến động lớn nhưng nếu Miếu Vượng thì phá rồi lập lại thành công.',
    'Thiên Tướng|Tử Vi': 'Tử Tướng — Đế tinh gặp Ấn tinh, có quyền có ấn, danh chính ngôn thuận. Tính cách ngay thẳng, được mọi người tin tưởng, thăng tiến trong quan lộ.',
    'Cự Môn|Thiên Cơ': 'Cơ Cự — Trí tuệ kết hợp ngôn ngữ, giỏi phân tích và biện luận. Thích hợp ngành tư vấn, luật, giáo dục. Miếu Vượng thì tài hoa; Hãm thì hay thị phi.',
    'Thiên Cơ|Thiên Lương': 'Cơ Lương — Trí tuệ kết hợp đạo đức, cách cục của người thiện lương có học. Giỏi trong lĩnh vực giáo dục, tôn giáo, nghiên cứu.',
    'Cự Môn|Thái Dương': 'Nhật Cự — Thái Dương soi sáng Cự Môn, hóa giải tính ám muội. Miếu Vượng thì ăn nói thuyết phục, danh tiếng vang xa; Hãm thì thị phi nặng hơn bình thường.',
    'Thái Âm|Thái Dương': 'Nhật Nguyệt Đồng Cung — Âm dương giao hội, cách cục đặc biệt. Cần xét cung vị (ban ngày/ban đêm) để định cát hung. Nếu đắc địa thì tài lộc song toàn.',
    'Tham Lang|Vũ Khúc': 'Vũ Tham — Tài tinh gặp Đào Hoa tinh, có tài kinh doanh nhưng ham lợi. Miếu Vượng thì đại phú do buôn bán; Hãm thì tham lam, bất chính.',
    'Thiên Tướng|Vũ Khúc': 'Vũ Tướng — Tài tinh gặp Ấn tinh, quản lý tài chính có nguyên tắc. Thích hợp làm ngân hàng, kế toán, quản lý tài sản.',
    'Phá Quân|Vũ Khúc': 'Vũ Phá — Tài tinh gặp Hao tinh, tài chính biến động lớn. Có thể bạo phát bạo tàn, bỏ vốn lớn đầu tư mạo hiểm.',
    'Thất Sát|Vũ Khúc': 'Vũ Sát — Tài tinh gặp Tướng tinh, quyết đoán trong tài chính, dám mạo hiểm. Nếu Miếu Vượng có thể đại phú; Hãm thì phá sản.',
    'Cự Môn|Thiên Đồng': 'Đồng Cự — Phúc tinh gặp Ám tinh, đời sống cảm xúc phức tạp. Hay lo nghĩ, nhạy cảm, giỏi thấu hiểu lòng người nhưng chính mình lại hay phiền muộn.',
    'Thiên Đồng|Thiên Lương': 'Đồng Lương — Hai phúc tinh hội nhau, phúc dày đức hậu. Đời sống thanh nhàn, an lạc, tuổi già hưởng phúc. Thích hợp ngành chăm sóc sức khỏe, từ thiện.',
    'Tham Lang|Liêm Trinh': 'Liêm Tham — Quyền tinh gặp Đào Hoa tinh, đào hoa rất mạnh. Tài hoa, quyến rũ, giao tiếp giỏi nhưng tình cảm phức tạp. Miếu Vượng thì đa tài; Hãm thì đa dâm.',
    'Thiên Phủ|Liêm Trinh': 'Liêm Phủ — Quyền tinh gặp Kho tinh, liêm khiết mà có tài. Quản lý tốt, có nguyên tắc trong sử dụng quyền lực và tài sản.',
    'Thiên Tướng|Liêm Trinh': 'Liêm Tướng — Quyền tinh gặp Ấn tinh, nắm quyền có ấn. Phù hợp với ngành công quyền, pháp luật. Tính cách cương trực, quyết đoán.',
    'Thất Sát|Liêm Trinh': 'Liêm Sát — Quyền tinh gặp Tướng tinh, cách cục mạnh mẽ nhưng nguy hiểm. Miếu Vượng thì uy phong lẫm liệt; Hãm địa thì hình tụng, tai nạn.',
    'Liêm Trinh|Phá Quân': 'Liêm Phá — Quyền tinh gặp Hao tinh, dám phá bỏ để đổi mới. Cuộc đời nhiều biến cố, nếu nắm bắt được thời cơ thì lập nghiệp lớn.',
    'Phá Quân|Tham Lang|Thất Sát': 'Sát Phá Tham — Bộ ba quyền lực mạnh mẽ nhất trong Tử Vi. Khi hội đủ tam phương tứ chính, chủ nhân có khí chất khai phá, dám làm dám chịu. Miếu Vượng thì anh hùng cái thế; Hãm thì đời sống bất ổn.',
};

// ═══════════════════════════════════════════════════════════════════
// Star Combination Detection Helper
// ═══════════════════════════════════════════════════════════════════
export function detectStarCombinations(majorStarNames: string[]): string[] {
    if (majorStarNames.length < 2) return [];
    const results: string[] = [];
    // Check pairs
    for (let i = 0; i < majorStarNames.length; i++) {
        for (let j = i + 1; j < majorStarNames.length; j++) {
            const key = [majorStarNames[i], majorStarNames[j]].sort().join('|');
            if (STAR_COMBINATIONS[key]) {
                results.push(STAR_COMBINATIONS[key]);
            }
        }
    }
    // Check triple (Sát Phá Tham)
    if (majorStarNames.length >= 3) {
        const key = [...majorStarNames].sort().join('|');
        if (STAR_COMBINATIONS[key]) {
            results.push(STAR_COMBINATIONS[key]);
        }
    }
    return results;
}
