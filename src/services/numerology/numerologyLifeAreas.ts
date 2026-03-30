import type { NumerologyProfile } from '@lich-viet/core/numerology';

export interface ETCNarrative {
    hook: string;    // Câu mở đầu ấn tượng
    effect: string;  // Biểu hiện thực tế
    nuance: string;  // Điểm tinh tế/Chuyển biến
    cause: string;   // Nguyên nhân gốc rễ (giải thích từ con số)
    tip: string;     // Lời khuyên hành động
}

export interface NumerologyExecutiveSummary {
    coreArchetype: string;
    lifePathFocus: string;
    expressionStyle: string;
    soulMotivation: string;
    summaryParagraph: string;
    coreAdvice: string;
}

export interface NumerologyLifeArea {
    areaId: string;
    areaName: string;
    icon: string;
    narrative: ETCNarrative;
}

const ARCHETYPES: Record<number, string> = {
    1: "Người Tiên Phong",
    2: "Người Hòa Giải",
    3: "Người Truyền Cảm Hứng",
    4: "Người Xây Dựng",
    5: "Người Khám Phá",
    6: "Người Nuôi Dưỡng",
    7: "Người Tìm Kiếm Chân Lý",
    8: "Người Điều Hành",
    9: "Người Phụng Sự",
    11: "Người Nâng Tầm Nhận Thức",
    22: "Kiến Trúc Sư Vĩ Đại",
    33: "Bậc Thầy Chữa Lành",
};

export function generateNumerologyExecutiveSummary(profile: NumerologyProfile): NumerologyExecutiveSummary {
    const lp = profile.lifePath.value;
    const exp = profile.expression.value;
    const soul = profile.soulUrge.value;

    const coreArchetype = ARCHETYPES[lp] || "Hành Giả Tâm Linh";

    return {
        coreArchetype,
        lifePathFocus: `Đường Đời ${lp}: ${profile.lifePath.description}`,
        expressionStyle: `Biểu Đạt ${exp}: ${profile.expression.description}`,
        soulMotivation: `Linh Hồn ${soul}: ${profile.soulUrge.description}`,
        summaryParagraph: `Bức tranh tổng thể của bạn được dẫn dắt bởi năng lượng ${lp} của ${coreArchetype}, thể hiện ra bên ngoài thông qua phong cách ${exp} và được thôi thúc sâu xa bởi khao khát ${soul}. Sự kết hợp này tạo nên một hành trình độc đáo: bạn học cách sống đúng với cốt lõi của mình trong khi cân bằng giữa động lực bên trong và cách thức thể hiện ra thế giới.`,
        coreAdvice: `Hãy tập trung vào thế mạnh tự nhiên của Số Đường Đời ${lp}, đồng thời thỏa mãn khát vọng của Số Linh Hồn ${soul}. Đừng quên sử dụng Số Biểu Đạt ${exp} như một "công cụ" đắc lực để giao tiếp và đạt được mục tiêu trong cuộc sống.`,
    };
}

export function analyzeNumerologyLifeAreas(profile: NumerologyProfile): NumerologyLifeArea[] {
    const lp = profile.lifePath.value;
    const exp = profile.expression.value;
    const soul = profile.soulUrge.value;
    const pers = profile.personality.value;

    const areas: NumerologyLifeArea[] = [];

    // 1. Sự nghiệp & Tài chính (Career & Wealth) - Driven mainly by Life Path and Expression
    let careerHook = 'Hành trình sự nghiệp của bạn là một hành trình tự khẳng định.';
    if (lp === 1 || lp === 8 || exp === 8) careerHook = 'Bạn khao khát vị trí dẫn đầu và xây dựng được những thành tựu vật chất vững chắc.';
    else if (lp === 2 || lp === 6 || exp === 6) careerHook = 'Sự nghiệp của bạn thăng hoa nhất khi được gắn kết với việc hỗ trợ và chăm sóc người khác.';
    else if (lp === 3 || lp === 5) careerHook = 'Bạn tỏa sáng mảng truyền thông, sáng tạo và những môi trường linh hoạt, đa dạng.';
    else if (lp === 4 || lp === 7 || exp === 4) careerHook = 'Sự nghiệp của bạn được xây dựng trên nền tảng của sự chuyên sâu, kỷ luật và phân tích tỉ mỉ.';
    else if (lp === 9 || lp === 11 || lp === 22 || lp === 33) careerHook = 'Sự nghiệp của bạn thường mang tính cống hiến hoặc hướng tới những lý tưởng lớn lao hơn bản thân mình.';

    areas.push({
        areaId: 'career_wealth',
        areaName: 'Sự nghiệp & Tài chính',
        icon: '💼',
        narrative: {
            hook: careerHook,
            effect: `Trên thực tế, bạn thường có xu hướng tiếp cận công việc một cách đặc trưng theo biểu đạt số ${exp}, giúp bạn giải quyết các tình huống và giao tiếp trong môi trường chuyên nghiệp.`,
            nuance: `Tuy nhiên, đôi khi động lực sâu kín bên trong bạn (Linh Hồn ${soul}) lại thúc đẩy bạn tìm kiếm những giá trị khác biệt, đôi khi trái ngược với con đường sự nghiệp bề ngoài, tạo ra những ngã rẽ hoặc sự thay đổi trong định hướng.`,
            cause: `Điều này bắt nguồn từ sự kết hợp giữa Đường Đời ${lp} định hình bức tranh lớn và Số Linh Hồn ${soul} chi phối cảm giác thỏa mãn thực sự của bạn. Nếu hai số này không đồng điệu, bạn sẽ cảm thấy thiếu trọn vẹn dù đã đạt được thành tựu nhất định.`,
            tip: `Để tối ưu hóa sự nghiệp, hãy chọn một công việc đáp ứng được phương hướng của Đường Đời ${lp} và đồng thời nuôi dưỡng khát khao của Linh Hồn ${soul}. Hãy sử dụng cách tiếp cận của Biểu Đạt ${exp} để làm "vũ khí" ghi dấu ấn cá nhân.`,
        }
    });

    // 2. Tình duyên & Các mối quan hệ (Love & Relationships) - Driven mainly by Soul Urge, Personality, and Life Path
    let loveHook = 'Trong các mối quan hệ, bạn mang một dấu ấn năng lượng rất riêng biệt.';
    if (soul === 2 || soul === 6 || lp === 6 || pers === 2) loveHook = 'Bạn là người trọn vẹn trong tình cảm, luôn tìm kiếm sự gắn kết sâu sắc, hài hòa và sẵn sàng chăm sóc người mình yêu thương.';
    else if (soul === 1 || soul === 5 || lp === 5 || pers === 1) loveHook = 'Bạn đánh giá cao sự tự do, không gian riêng và sự kích thích trong tình yêu, đôi khi có phần độc lập quá mức.';
    else if (soul === 4 || soul === 8 || lp === 4 || pers === 8) loveHook = 'Bạn tiếp cận tình yêu với sự thực tế, tìm kiếm một đối tác đáng tin cậy để cùng xây dựng nền tảng vững chắc và lâu dài.';
    else if (soul === 3 || soul === 9 || lp === 3) loveHook = 'Bạn thu hút người khác bởi sự cởi mở, vui vẻ, thích giao lưu, và đôi khi yêu bằng một lý tưởng lãng mạn cao cả.';
    else if (soul === 7 || soul === 11 || lp === 7 || pers === 7) loveHook = 'Bạn khó tính trong việc chọn bạn đời, cần một sự kết nối tâm giao sâu sắc vượt trên những điều trần tục.';

    areas.push({
        areaId: 'love_relationships',
        areaName: 'Tình duyên & Các mối quan hệ',
        icon: '❤️',
        narrative: {
            hook: loveHook,
            effect: `Cách bạn thể hiện ra bên ngoài và ấn tượng đầu tiên bạn tạo ra (Nhân Cách ${pers}) thường là điểm thu hút ban đầu, định hình cách mọi người tiếp cận bạn.`,
            nuance: `Nhưng khi mối quan hệ tiến sâu hơn, khao khát thực sự của bạn (Linh Hồn ${soul}) mới bộc lộ. Điều này đôi lúc làm đối tác bất ngờ nếu Số Nhân Cách và Số Linh Hồn của bạn có sự khác biệt lớn.`,
            cause: `Bởi vì Nhân Cách ${pers} chỉ là "lớp áo khoác" bên ngoài để bảo vệ, trong khi Linh Hồn ${soul} là cốt lõi nhạy cảm bên trong cần được nuôi dưỡng và thấu hiểu. Đường Đời ${lp} sẽ định hình bài học lớn nhất của bạn thông qua các đối tác.`,
            tip: `Hãy trung thực với khao khát của Số Linh Hồn ${soul} từ sớm trong các mối quan hệ quan trọng. Đừng để "lớp áo" Nhân Cách che khuất đi nhu cầu tình cảm thực sự của bạn. Cởi mở và rõ ràng là chìa khóa.`,
        }
    });

    // 3. Phát triển Bản thân & Tâm linh (Personal Growth & Spirituality) - Driven by Maturity, Challenges, Missing Numbers
    const maturity = profile.maturity.value;
    const missing = profile.birthdayGrid.missing.length > 0 ? profile.birthdayGrid.missing.join(', ') : 'không có';
    
    areas.push({
        areaId: 'personal_growth',
        areaName: 'Phát triển Bản thân & Tâm linh',
        icon: '🌱',
        narrative: {
            hook: `Bản đồ số của bạn là một hải trình tu tập và phát triển độ chín chắn, hướng đến sự cân bằng của tuổi trưởng thành (Maturity ${maturity}).`,
            effect: `Trong nửa sau của cuộc đời, năng lượng của số ${maturity} sẽ càng lúc càng rõ rệt, mang đến cảm giác thôi thúc bạn phải thực hiện một sứ mệnh hay học một bài học đặc thù, bất kể bạn có muốn hay không.`,
            nuance: `Bên cạnh đó, với các con số thiếu (${missing}), bạn sẽ thường xuyên gặp phải những tình huống "thử lửa" trong những lĩnh vực này, buộc bạn phải bước ra khỏi vùng an toàn để trực tiếp trải nghiệm và rèn luyện.`,
            cause: `Các con số thiếu không phải là sự trừng phạt mà là những bài học nghiệp quả (Karmic lessons) bạn đã chọn trước khi sinh ra. Trong khi đó, Số Trưởng Thành ${maturity} là kết tinh từ Đường Đời và Biểu Đạt, là món quà nếu bạn làm tốt các phần trước.`,
            tip: `Thay vì né tránh những bài học từ các con số thiếu, hãy chủ động trau dồi thông qua các thói quen hàng ngày. Đồng thời, hãy bắt đầu tích hợp dần năng lượng của Số Trưởng Thành ${maturity} vào cuộc sống trước khi độ tuổi trung niên kéo đến.`,
        }
    });

    return areas;
}
