import type { AspectPatternType } from '../../types/westernAstro';

// =============================================================================
// Aspect Pattern Meanings — Vietnamese descriptions for special chart patterns
// Grand Trine, T-Square, Grand Cross, Stellium, Yod, Kite, Mystic Rectangle
// =============================================================================


export interface AspectPatternMeaning {
    id: AspectPatternType;
    name: string;
    symbol: string;
    description: string;
    keywords: string[];
}

export const ASPECT_PATTERN_MEANINGS: Record<AspectPatternType, AspectPatternMeaning> = {
    grandTrine: {
        id: 'grandTrine',
        name: 'Đại Tam Hợp (Grand Trine)',
        symbol: '△',
        description: 'Ba hành tinh cách nhau 120°, tạo thành tam giác đều trong bản đồ sao. Đây là hình thái thuận lợi nhất, mang lại tài năng tự nhiên và sự dễ dàng trong lĩnh vực nguyên tố chung (Lửa/Đất/Khí/Nước). Tuy nhiên, sự dễ dàng quá lớn có thể tạo ra sự lười biếng hoặc không phát huy hết tiềm năng.',
        keywords: ['tài năng', 'thuận lợi', 'dễ dàng', 'tiềm năng'],
    },
    tSquare: {
        id: 'tSquare',
        name: 'Chữ T (T-Square)',
        symbol: '⊤',
        description: 'Hai hành tinh đối nhau (180°), cả hai cùng vuông góc (90°) một hành tinh thứ ba (đỉnh). Hành tinh ở đỉnh chịu áp lực lớn nhất — đó là nơi bạn phải giải quyết xung đột. Mặc dù đây là hình thái thử thách, nhưng nó tạo ra động lực mạnh mẽ nhất để phát triển.',
        keywords: ['thử thách', 'áp lực', 'động lực', 'phát triển'],
    },
    grandCross: {
        id: 'grandCross',
        name: 'Đại Thập (Grand Cross)',
        symbol: '✚',
        description: 'Bốn hành tinh tạo thành hình vuông: hai cặp đối nhau (180°) và bốn cặp vuông góc (90°). Đây là hình thái áp lực cực độ — bạn bị kéo về bốn hướng cùng lúc. Tuy nhiên, nếu vượt qua, bạn đạt được sự cân bằng phi thường và sức mạnh lớn.',
        keywords: ['áp lực cực độ', 'cân bằng', 'sức mạnh', 'thử thách lớn'],
    },
    stellium: {
        id: 'stellium',
        name: 'Tụ Tinh (Stellium)',
        symbol: '✦',
        description: 'Ba hoặc nhiều hành tinh tập trung trong cùng một cung hoàng đạo hoặc nhà. Đây là điểm tập trung năng lượng cực mạnh — bạn có tài năng đặc biệt trong lĩnh vực này nhưng có thể bỏ qua các khía cạnh khác của cuộc sống.',
        keywords: ['tập trung', 'chuyên sâu', 'tài năng', 'mất cân bằng'],
    },
    yod: {
        id: 'yod',
        name: 'Ngón Tay Chúa (Yod)',
        symbol: '⚞',
        description: 'Hai hành tinh lục hợp nhau (60°), cả hai cùng tạo góc quincunx (150°) với hành tinh thứ ba (đỉnh). Yod được gọi là "Ngón Tay Chúa" vì ám chỉ sứ mệnh đặc biệt. Hành tinh ở đỉnh là điểm chuyển hóa mạnh — bạn cảm thấy bị "ép" phải phát triển theo hướng cụ thể.',
        keywords: ['sứ mệnh', 'chuyển hóa', 'định mệnh', 'đặc biệt'],
    },
    kite: {
        id: 'kite',
        name: 'Diều (Kite)',
        symbol: '◇',
        description: 'Grand Trine cộng thêm hành tinh thứ tư đối diện với một đỉnh tam giác và tạo sextile với hai đỉnh còn lại. Hình thái này biến tài năng thụ động của Grand Trine thành sức mạnh chủ động — hành tinh thứ tư là "đuôi diều" giúp bạn hướng tài năng vào mục đích cụ thể.',
        keywords: ['tài năng chủ động', 'định hướng', 'thuận lợi', 'mục đích'],
    },
    mysticRectangle: {
        id: 'mysticRectangle',
        name: 'Hình Chữ Nhật Thần Bí (Mystic Rectangle)',
        symbol: '▭',
        description: 'Bốn hành tinh tạo hình chữ nhật: hai cặp đối nhau (180°), hai cặp tam hợp (120°), và hai cặp lục hợp (60°). Đây là hình thái hiếm, kết hợp cả căng thẳng (đối) và hài hòa (tam hợp + lục hợp). Bạn có khả năng biến thử thách thành cơ hội một cách tự nhiên.',
        keywords: ['cân bằng', 'hài hòa', 'hiếm', 'chuyển hóa'],
    },
};

/** Get pattern meaning by type */
export function getPatternMeaning(type: AspectPatternType): AspectPatternMeaning | undefined {
    return ASPECT_PATTERN_MEANINGS[type];
}
