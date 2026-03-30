import type { AspectType } from '../types/westernAstro';

/**
 * Provides basic automated interpretations for Transits, Progressions, and Solar Arc aspects.
 * Focuses on Outer Planet transits to Inner Planets.
 */

const PLANET_KEYWORDS: Record<string, string> = {
    sun: 'Bản ngã, danh dự, mục đích sống',
    moon: 'Cảm xúc, thói quen, gia đình, vô thức',
    mercury: 'Suy nghĩ, giao tiếp, kế hoạch',
    venus: 'Tình cảm, các mối quan hệ, tài chính, giá trị',
    mars: 'Năng lượng, hành động, sự quyết đoán',
    jupiter: 'Mở rộng, may mắn, niềm tin, cơ hội',
    saturn: 'Thử thách, trách nhiệm, kỷ luật, giới hạn',
    uranus: 'Đột phá, bất ngờ, thay đổi, tự do',
    neptune: 'Ảo tưởng, tâm linh, mơ mộng, mờ mịt',
    pluto: 'Biến đổi sâu sắc, quyền lực, phá hủy để tái tạo',
    northNode: 'Mục tiêu phát triển, nghiệp quả tương lai',
    southNode: 'Thói quen tiền kiếp, vùng an toàn',
    chiron: 'Nỗi đau sâu kín, vết thương cần chữa lành',
    lilith: 'Góc khuất khao khát, sự nổi loạn ngầm',
    partOfFortune: 'Điểm may mắn, tài lộc',
    vertex: 'Cuộc gặp gỡ định mệnh, bước ngoặt',
    ceres: 'Sự chăm sóc, nuôi dưỡng',
    pallas: 'Trí tuệ sắc bén, chiến lược',
    juno: 'Sự cam kết, hôn nhân',
    vesta: 'Sự tận tâm, ngọn lửa đam mê',
    ascendant: 'Cách tiếp cận thế giới, vỏ bọc bên ngoài',
    descendant: 'Mối quan hệ đối tác, hình mẫu thu hút',
    midheaven: 'Sự nghiệp, danh tiếng xã hội',
    imumCoeli: 'Cội nguồn, gia đình, nền tảng nội tâm'
};

const ASPECT_KEYWORDS: Record<AspectType, { type: 'hard' | 'soft' | 'neutral', action: string }> = {
    conjunction: { type: 'neutral', action: 'Hòa quyện và kích hoạt mạnh mẽ' },
    sextile: { type: 'soft', action: 'Mở ra cơ hội và hỗ trợ' },
    square: { type: 'hard', action: 'Gây ra căng thẳng, buộc phải hành động hoặc thay đổi' },
    trine: { type: 'soft', action: 'Mang lại sự chảy trôi thuận lợi, dễ dàng' },
    opposition: { type: 'hard', action: 'Tạo ra sự giằng xé, đối đầu, cần tìm điểm cân bằng' },
    quincunx: { type: 'hard', action: 'Yêu cầu sự tinh chỉnh, điều chỉnh liên tục do bất đồng' },
    semiSextile: { type: 'soft', action: 'Gợi ý những thay đổi nhỏ' },
    semiSquare: { type: 'hard', action: 'Xung đột ngầm' },
    sesquiquadrate: { type: 'hard', action: 'Bực dọc, khó chịu' },
    quintile: { type: 'soft', action: 'Thúc đẩy sự sáng tạo' }
};

export function getPredictiveInterpretation(
    predictivePlanet: string, 
    aspect: AspectType, 
    natalPlanet: string,
    predictiveType: 'transit' | 'progression' | 'solar_arc'
): string {
    const pKey = PLANET_KEYWORDS[predictivePlanet] || 'Năng lượng';
    const nKey = PLANET_KEYWORDS[natalPlanet] || 'Lĩnh vực';
    const aInfo = ASPECT_KEYWORDS[aspect] || ASPECT_KEYWORDS.conjunction;

    let triggerPrefix = 'Năng lượng của';

    if (predictiveType === 'progression') {
        triggerPrefix = 'Sự trưởng thành nội tâm của';
    } else if (predictiveType === 'solar_arc') {
        triggerPrefix = 'Cột mốc phát triển ở độ tuổi này kích hoạt sự';
    }

    let interpretation = `**${triggerPrefix} ${predictivePlanet.toUpperCase()}** ${aInfo.action.toLowerCase()} **${natalPlanet.toUpperCase()}** của bạn. `;
    
    // Add specific context
    if (aInfo.type === 'hard') {
        interpretation += `Bạn có thể sẽ đối mặt với áp lực liên quan đến (${nKey}). Năng lượng mang tính chất (${pKey}) sẽ yêu cầu bạn phải đưa ra quyết định hoặc vượt qua vùng an toàn.`;
    } else if (aInfo.type === 'soft') {
        interpretation += `Đây là giai đoạn thuận lợi để phát triển (${nKey}). Sự hỗ trợ từ (${pKey}) mang đến những nguồn lực hoặc góc nhìn mới giúp bạn dễ dàng đạt được mong muốn.`;
    } else {
        interpretation += `Sự kết hợp này đánh dấu một khởi đầu mới cường độ cao. Cả trải nghiệm về (${pKey}) và (${nKey}) sẽ đan xen mạnh mẽ, định hình giai đoạn này.`;
    }

    // Specific Outer => Inner explicit logic (Mock example for depth)
    if (predictivePlanet === 'saturn' && natalPlanet === 'moon') {
        interpretation = `**Saturn ${aInfo.type === 'hard' ? 'Square/Oppose' : 'Aspects'} Moon:** Giai đoạn này bạn có thể cảm thấy nặng nề về mặt cảm xúc hoặc gánh vác thêm trách nhiệm gia đình. Cần chú ý chăm sóc sức khỏe tinh thần.`;
    }
    else if (predictivePlanet === 'jupiter' && natalPlanet === 'sun') {
        interpretation = `**Jupiter ${aInfo.type === 'hard' ? 'Square/Oppose' : 'Aspects'} Sun:** Mở ra cơ hội để bạn tỏa sáng và khẳng định bản thân. Tư duy lạc quan và may mắn sẽ đồng hành cùng mục tiêu của bạn.`;
    }

    return interpretation;
}
