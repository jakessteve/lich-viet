import type { ChartPatternType } from '../../types/westernAstro';

// =============================================================================
// Chart Patterns — Vietnamese descriptions for chart shape analysis (Step 1)
// =============================================================================

export interface ChartPatternInfo {
    id: ChartPatternType;
    name: string;
    description: string;
    keywords: string[];
}

export const CHART_PATTERNS: Record<ChartPatternType, ChartPatternInfo> = {
    bowl: {
        id: 'bowl',
        name: 'Bát (Bowl)',
        description: 'Tất cả hành tinh tập trung trong một nửa bản đồ sao (180°). Người có mẫu hình này thường tự túc, tập trung vào một lĩnh vực cụ thể trong cuộc sống, và có xu hướng chuyên sâu hơn là đa dạng.',
        keywords: ['tập trung', 'tự túc', 'chuyên sâu'],
    },
    bucket: {
        id: 'bucket',
        name: 'Xô (Bucket)',
        description: 'Tương tự mẫu Bát, nhưng có một hành tinh đối đầu ở phía bên kia. Hành tinh "quai xô" này đóng vai trò cầu nối, tạo nên điểm nhấn đặc biệt và hướng đi trong cuộc sống.',
        keywords: ['cầu nối', 'điểm nhấn', 'định hướng'],
    },
    locomotive: {
        id: 'locomotive',
        name: 'Đầu máy (Locomotive)',
        description: 'Các hành tinh trải đều trong khoảng 240° (2/3 bản đồ), để lại một khoảng trống 120°. Mẫu hình này cho thấy người có động lực mạnh mẽ, liên tục vận động và tìm kiếm sự hoàn thiện.',
        keywords: ['động lực', 'vận động', 'hoàn thiện'],
    },
    splash: {
        id: 'splash',
        name: 'Tản mát (Splash)',
        description: 'Các hành tinh phân bố đều khắp bản đồ sao. Người có mẫu hình này thường đa tài, quan tâm nhiều lĩnh vực, nhưng có thể thiếu tập trung.',
        keywords: ['đa tài', 'đa diện', 'phân tán'],
    },
    bundle: {
        id: 'bundle',
        name: 'Bó (Bundle)',
        description: 'Tất cả hành tinh nằm trong khoảng 120° (1/3 bản đồ). Mẫu hình hiếm, cho thấy sự tập trung cực kỳ mạnh vào một lĩnh vực, nhưng có thể thiếu nhận thức về các khía cạnh khác của cuộc sống.',
        keywords: ['cực kỳ tập trung', 'chuyên sâu', 'giới hạn'],
    },
    seesaw: {
        id: 'seesaw',
        name: 'Bập bênh (Seesaw)',
        description: 'Các hành tinh chia thành hai nhóm đối diện nhau. Người có mẫu hình này thường phải cân bằng giữa hai cực đối lập trong cuộc sống, tạo nên sự linh hoạt nhưng cũng đầy thử thách.',
        keywords: ['cân bằng', 'đối lập', 'linh hoạt'],
    },
    splay: {
        id: 'splay',
        name: 'Xòe (Splay)',
        description: 'Các hành tinh phân bố không đều, tập trung thành các cụm rải rác. Mẫu hình này cho thấy cá tính độc đáo, nhiều mối quan tâm mạnh mẽ, và xu hướng phát triển theo con đường riêng.',
        keywords: ['cá tính', 'độc đáo', 'độc lập'],
    },
};

// ─── Element / Modality deficit interpretations ────────────────────────────

export const ELEMENT_DEFICIT_TEXTS: Record<string, string> = {
    fire: 'Thiếu nguyên tố Lửa: Có thể thiếu tự tin, năng lượng, và động lực. Cần phát triển khả năng hành động và lấy cảm hứng.',
    earth: 'Thiếu nguyên tố Đất: Có thể thiếu thực tế, kỷ luật và khả năng hiện thực hóa ý tưởng. Cần xây dựng nền tảng vững chắc.',
    air: 'Thiếu nguyên tố Khí: Có thể gặp khó khăn trong giao tiếp, lý luận và kết nối xã hội. Cần phát triển tư duy khách quan.',
    water: 'Thiếu nguyên tố Nước: Có thể thiếu sự đồng cảm, trực giác và kết nối cảm xúc. Cần học cách lắng nghe cảm xúc nội tâm.',
};

export const ELEMENT_DOMINANT_TEXTS: Record<string, string> = {
    fire: 'Ưu thế nguyên tố Lửa: Tràn đầy năng lượng, tự tin, nhiệt huyết. Có thể bốc đồng và nóng nảy.',
    earth: 'Ưu thế nguyên tố Đất: Thực tế, kiên nhẫn, đáng tin cậy. Có thể bảo thủ và cứng nhắc.',
    air: 'Ưu thế nguyên tố Khí: Thông minh, giao tiếp giỏi, khách quan. Có thể xa cách và thiếu cảm xúc.',
    water: 'Ưu thế nguyên tố Nước: Nhạy cảm, trực giác, đồng cảm sâu sắc. Có thể quá cảm xúc và hay lo lắng.',
};

export const QUALITY_DEFICIT_TEXTS: Record<string, string> = {
    cardinal: 'Thiếu tính khởi xướng: Có thể khó bắt đầu công việc mới hoặc chủ động dẫn dắt.',
    fixed: 'Thiếu tính bền vững: Có thể thiếu kiên trì, khó duy trì nỗ lực lâu dài.',
    mutable: 'Thiếu tính thích nghi: Có thể cứng nhắc trước thay đổi, khó điều chỉnh phương hướng.',
};

export const QUALITY_DOMINANT_TEXTS: Record<string, string> = {
    cardinal: 'Ưu thế tính khởi xướng: Năng động, chủ động, thích bắt đầu việc mới. Có thể thiếu kiên nhẫn hoàn thành.',
    fixed: 'Ưu thế tính bền vững: Kiên trì, ổn định, đáng tin cậy. Có thể cứng nhắc, chống lại thay đổi.',
    mutable: 'Ưu thế tính thích nghi: Linh hoạt, dễ thích nghi, đa dạng. Có thể thiếu quyết đoán, dễ dao động.',
};
