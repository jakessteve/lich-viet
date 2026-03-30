/**
 * Archetype Library — 50 personality archetype definitions.
 * 
 * Organized into 5 categories × 10 archetypes each.
 * Phase 0: Full structure with concise descriptions.
 * Phase 2-3: fullDescription will be expanded with rich Vietnamese narrative.
 */

import type { Archetype } from '../../services/interpretation/types';

// ═══════════════════════════════════════════════════════════════════
// Category 1: Leadership (Lãnh Đạo)
// ═══════════════════════════════════════════════════════════════════
const LEADERSHIP_ARCHETYPES: Archetype[] = [
    {
        id: 'emperor', name: 'Hoàng Đế', nameEn: 'The Emperor', emoji: '👑',
        category: 'leadership', element: 'Thổ',
        shortDescription: 'Người cầm quyền bẩm sinh, ổn định và quyết đoán.',
        fullDescription: 'Bạn mang trong mình khí chất của một vị hoàng đế — người sinh ra đã có bản năng nắm quyền, tổ chức, và dẫn dắt.',
        definingTraits: ['Quyết đoán', 'Ổn định', 'Uy nghiêm'],
        shadowTraits: ['Độc đoán', 'Cố chấp', 'Khó ủy quyền'],
        tuViCriteria: { requiredStars: [{ star: 'Tử Vi', minBrightness: 'mieuVuong' }] },
        chiemTinhCriteria: { dominantElement: 'Earth', requiredPlacements: [{ planet: 'Sun', sign: 'Capricorn' }] },
    },
    {
        id: 'strategist', name: 'Nhà Chiến Lược', nameEn: 'The Strategist', emoji: '🎯',
        category: 'leadership', element: 'Thủy',
        shortDescription: 'Tư duy sắc bén, nhìn xa trông rộng, luôn đi trước một bước.',
        fullDescription: 'Bạn là kiểu người luôn có kế hoạch B, C và D. Tâm trí bạn hoạt động như một bàn cờ vĩ mô.',
        definingTraits: ['Mưu lược', 'Kiên nhẫn', 'Tầm nhìn'],
        shadowTraits: ['Lạnh lùng', 'Tính toán', 'Thiếu tự phát'],
        tuViCriteria: { requiredStars: [{ star: 'Thiên Cơ', minBrightness: 'mieuVuong' }] },
        chiemTinhCriteria: { dominantElement: 'Water', requiredPlacements: [{ planet: 'Sun', sign: 'Scorpio' }] },
    },
    {
        id: 'general', name: 'Tướng Quân', nameEn: 'The General', emoji: '⚔️',
        category: 'leadership', element: 'Kim',
        shortDescription: 'Dũng mãnh, quyết đoán, không bao giờ lùi bước.',
        fullDescription: 'Bạn sinh ra với bản năng chiến đấu và tinh thần không khuất phục trước khó khăn.',
        definingTraits: ['Dũng cảm', 'Hành động', 'Bất khuất'],
        shadowTraits: ['Nóng nảy', 'Đơn độc', 'Áp đặt'],
        tuViCriteria: { requiredStars: [{ star: 'Thất Sát', minBrightness: 'mieuVuong' }] },
        chiemTinhCriteria: { dominantElement: 'Fire', requiredPlacements: [{ planet: 'Mars', sign: 'Aries' }] },
    },
    {
        id: 'sun-king', name: 'Vua Mặt Trời', nameEn: 'The Sun King', emoji: '☀️',
        category: 'leadership', element: 'Hỏa',
        shortDescription: 'Tỏa sáng, hào phóng, thu hút mọi ánh nhìn.',
        fullDescription: 'Bạn là trung tâm năng lượng của bất kỳ nhóm nào bạn tham gia.',
        definingTraits: ['Quang minh', 'Hào phóng', 'Lôi cuốn'],
        shadowTraits: ['Tự phụ', 'Hao tổn', 'Thích phô trương'],
        tuViCriteria: { requiredStars: [{ star: 'Thái Dương', minBrightness: 'mieuVuong' }] },
        chiemTinhCriteria: { dominantElement: 'Fire', requiredPlacements: [{ planet: 'Sun', sign: 'Leo' }] },
    },
    {
        id: 'treasurer', name: 'Tài Phú Gia', nameEn: 'The Treasurer', emoji: '💰',
        category: 'leadership', element: 'Kim',
        shortDescription: 'Bản năng quản lý tài chính, ổn định và tích lũy.',
        fullDescription: 'Bạn có khả năng biến mọi nguồn lực thành tài sản bền vững.',
        definingTraits: ['Thực tế', 'Quản lý giỏi', 'Kiên định'],
        shadowTraits: ['Bảo thủ', 'Keo kiệt', 'Thiếu linh hoạt'],
        tuViCriteria: { requiredStars: [{ star: 'Vũ Khúc', minBrightness: 'mieuVuong' }] },
        chiemTinhCriteria: { dominantElement: 'Earth', requiredPlacements: [{ planet: 'Saturn', sign: 'Capricorn' }] },
    },
    {
        id: 'guardian', name: 'Người Bảo Hộ', nameEn: 'The Guardian', emoji: '🛡️',
        category: 'leadership', element: 'Thổ',
        shortDescription: 'Che chở, bảo vệ, là điểm tựa tinh thần.',
        fullDescription: 'Bạn có bản năng bảo vệ những người xung quanh.',
        definingTraits: ['Chính trực', 'Đáng tin', 'Ổn định'],
        shadowTraits: ['Nhu nhược', 'Dễ bị lợi dụng', 'Thiếu chủ kiến'],
        tuViCriteria: { requiredStars: [{ star: 'Thiên Tướng', minBrightness: 'mieuVuong' }] },
        chiemTinhCriteria: { dominantElement: 'Earth', requiredPlacements: [{ planet: 'Moon', sign: 'Cancer' }] },
    },
    {
        id: 'sage-mentor', name: 'Hiền Triết', nameEn: 'The Sage Mentor', emoji: '📿',
        category: 'leadership', element: 'Mộc',
        shortDescription: 'Trí tuệ sâu sắc, dẫn đường bằng đạo đức.',
        fullDescription: 'Bạn lãnh đạo không bằng quyền lực mà bằng uy tín và sự kính trọng.',
        definingTraits: ['Nhân từ', 'Sâu sắc', 'Đạo đức'],
        shadowTraits: ['Khó gần', 'Quá lý tưởng', 'Cô đơn'],
        tuViCriteria: { requiredStars: [{ star: 'Thiên Lương', minBrightness: 'mieuVuong' }] },
        chiemTinhCriteria: { dominantElement: 'Water', requiredPlacements: [{ planet: 'Jupiter', sign: 'Sagittarius' }] },
    },
    {
        id: 'stabilizer', name: 'Trụ Cột', nameEn: 'The Stabilizer', emoji: '🏛️',
        category: 'leadership', element: 'Thổ',
        shortDescription: 'Bền vững, đáng tin, là nền tảng cho mọi tổ chức.',
        fullDescription: 'Bạn là kiểu người mà mọi tổ chức đều cần — ổn định và kiên cố.',
        definingTraits: ['Bền bỉ', 'Phúc hậu', 'Quản lý tài sản'],
        shadowTraits: ['Bảo thủ', 'Chậm thay đổi', 'Ít sáng tạo'],
        tuViCriteria: { requiredStars: [{ star: 'Thiên Phủ', minBrightness: 'mieuVuong' }] },
        chiemTinhCriteria: { dominantElement: 'Earth', requiredPlacements: [{ planet: 'Sun', sign: 'Taurus' }] },
    },
    {
        id: 'reformer', name: 'Nhà Cách Mạng', nameEn: 'The Reformer', emoji: '🔥',
        category: 'leadership', element: 'Hỏa',
        shortDescription: 'Phá bỏ cũ kỹ, xây dựng mới từ đống tro tàn.',
        fullDescription: 'Bạn không sợ phá vỡ hiện trạng vì bạn nhìn thấy tiềm năng phía sau.',
        definingTraits: ['Tiên phong', 'Dũng cảm', 'Sáng tạo phá cách'],
        shadowTraits: ['Bất ổn', 'Thiếu kiên nhẫn', 'Gây tranh cãi'],
        tuViCriteria: { requiredStars: [{ star: 'Phá Quân', minBrightness: 'mieuVuong' }] },
        chiemTinhCriteria: { dominantElement: 'Fire', requiredPlacements: [{ planet: 'Uranus', house: 1 }] },
    },
    {
        id: 'diplomat', name: 'Nhà Ngoại Giao', nameEn: 'The Diplomat', emoji: '🤝',
        category: 'leadership', element: 'Thủy',
        shortDescription: 'Khéo léo, giỏi đàm phán, kết nối mọi người.',
        fullDescription: 'Bạn có khả năng phi thường trong việc cân bằng lợi ích và tạo đồng thuận.',
        definingTraits: ['Khéo léo', 'Giao tiếp giỏi', 'Hòa nhã'],
        shadowTraits: ['Thiếu lập trường', 'Hay nhượng bộ', 'Khó nói thẳng'],
        tuViCriteria: { requiredStars: [{ star: 'Thiên Đồng', minBrightness: 'mieuVuong' }] },
        chiemTinhCriteria: { dominantElement: 'Air', requiredPlacements: [{ planet: 'Venus', sign: 'Libra' }] },
    },
];

// ═══════════════════════════════════════════════════════════════════
// Category 2: Creative (Sáng Tạo)
// ═══════════════════════════════════════════════════════════════════
const CREATIVE_ARCHETYPES: Archetype[] = [
    {
        id: 'artist', name: 'Nghệ Sĩ', nameEn: 'The Artist', emoji: '🎨',
        category: 'creative', element: 'Thủy',
        shortDescription: 'Tâm hồn nhạy cảm, biến cảm xúc thành nghệ thuật.',
        fullDescription: 'Bạn nhìn thế giới qua lăng kính của cái đẹp và cảm xúc.',
        definingTraits: ['Nhạy cảm', 'Sáng tạo', 'Trực giác'],
        shadowTraits: ['Đa sầu', 'Thiếu kỷ luật', 'Xa rời thực tế'],
        tuViCriteria: { requiredStars: [{ star: 'Thái Âm', minBrightness: 'mieuVuong' }] },
        chiemTinhCriteria: { dominantElement: 'Water', requiredPlacements: [{ planet: 'Neptune', house: 1 }] },
    },
    {
        id: 'performer', name: 'Ngôi Sao Sân Khấu', nameEn: 'The Performer', emoji: '🎭',
        category: 'creative', element: 'Hỏa',
        shortDescription: 'Đa tài, quyến rũ, thu hút mọi ánh nhìn.',
        fullDescription: 'Bạn có năng lượng biểu diễn bẩm sinh và khả năng kết nối với đám đông.',
        definingTraits: ['Đa tài', 'Quyến rũ', 'Biểu cảm'],
        shadowTraits: ['Ham muốn', 'Phô trương', 'Tham lam'],
        tuViCriteria: { requiredStars: [{ star: 'Tham Lang', minBrightness: 'mieuVuong' }] },
        chiemTinhCriteria: { dominantElement: 'Fire', requiredPlacements: [{ planet: 'Venus', sign: 'Leo' }] },
    },
    {
        id: 'poet', name: 'Thi Nhân', nameEn: 'The Poet', emoji: '📝',
        category: 'creative', element: 'Mộc',
        shortDescription: 'Văn chương lỗi lạc, ngôn từ chạm đến lòng người.',
        fullDescription: 'Bạn có khả năng diễn đạt những cảm xúc phức tạp nhất bằng ngôn từ.',
        definingTraits: ['Thanh cao', 'Văn chương', 'Tinh tế'],
        shadowTraits: ['Mơ mộng', 'Thiếu thực tế', 'Khó hòa nhập'],
        tuViCriteria: { requiredStars: [{ star: 'Tử Vi' }, { star: 'Thái Âm' }] },
        chiemTinhCriteria: { dominantElement: 'Water', requiredPlacements: [{ planet: 'Mercury', sign: 'Pisces' }] },
    },
    {
        id: 'visionary', name: 'Người Nhìn Thấy Trước', nameEn: 'The Visionary', emoji: '🔮',
        category: 'creative', element: 'Hỏa',
        shortDescription: 'Tầm nhìn vượt thời đại, ý tưởng đột phá.',
        fullDescription: 'Bạn nhìn thấy những khả năng mà người khác chưa tưởng tượng được.',
        definingTraits: ['Tầm nhìn', 'Đột phá', 'Trực giác'],
        shadowTraits: ['Xa vời', 'Khó thực hiện', 'Bất ổn'],
        tuViCriteria: { requiredStars: [{ star: 'Phá Quân' }], requiredPatterns: ['Sát Phá Tham'] },
        chiemTinhCriteria: { requiredPlacements: [{ planet: 'Uranus', house: 1 }] },
    },
    {
        id: 'healer', name: 'Người Chữa Lành', nameEn: 'The Healer', emoji: '💚',
        category: 'creative', element: 'Mộc',
        shortDescription: 'Năng lượng chữa lành, thấu hiểu nỗi đau.',
        fullDescription: 'Bạn có khả năng đặc biệt trong việc xoa dịu và chữa lành tổn thương.',
        definingTraits: ['Nhân từ', 'Thấu cảm', 'Kiên nhẫn'],
        shadowTraits: ['Hy sinh quá mức', 'Mệt mỏi cảm xúc', 'Quên bản thân'],
        tuViCriteria: { requiredStars: [{ star: 'Thiên Lương' }, { star: 'Thiên Đồng' }] },
        chiemTinhCriteria: { requiredPlacements: [{ planet: 'Moon', sign: 'Pisces' }] },
    },
    {
        id: 'inventor', name: 'Nhà Phát Minh', nameEn: 'The Inventor', emoji: '⚡',
        category: 'creative', element: 'Kim',
        shortDescription: 'Trí tuệ sắc bén, biến ý tưởng thành hiện thực.',
        fullDescription: 'Bạn kết hợp tư duy logic và sáng tạo để tạo ra giải pháp mới.',
        definingTraits: ['Sáng tạo', 'Thực tiễn', 'Kiên trì'],
        shadowTraits: ['Cô lập', 'Bướng bỉnh', 'Quá tập trung'],
        tuViCriteria: { requiredStars: [{ star: 'Thiên Cơ' }, { star: 'Vũ Khúc' }] },
        chiemTinhCriteria: { dominantElement: 'Air', requiredPlacements: [{ planet: 'Mercury', sign: 'Aquarius' }] },
    },
    {
        id: 'muse', name: 'Nàng Thơ', nameEn: 'The Muse', emoji: '✨',
        category: 'creative', element: 'Thủy',
        shortDescription: 'Truyền cảm hứng, lôi cuốn, và đầy huyền bí.',
        fullDescription: 'Bạn có sức hút tự nhiên khiến người khác muốn sáng tạo khi ở bên bạn.',
        definingTraits: ['Quyến rũ', 'Truyền cảm hứng', 'Bí ẩn'],
        shadowTraits: ['Hay thay đổi', 'Khó nắm bắt', 'Phụ thuộc cảm xúc'],
        tuViCriteria: { requiredStars: [{ star: 'Thái Âm', minBrightness: 'mieuVuong' }] },
        chiemTinhCriteria: { requiredPlacements: [{ planet: 'Venus', sign: 'Pisces' }] },
    },
    {
        id: 'storyteller', name: 'Người Kể Chuyện', nameEn: 'The Storyteller', emoji: '📖',
        category: 'creative', element: 'Mộc',
        shortDescription: 'Ngôn từ là sức mạnh, câu chuyện là vũ khí.',
        fullDescription: 'Bạn có khả năng biến bất kỳ trải nghiệm nào thành câu chuyện hấp dẫn.',
        definingTraits: ['Ăn nói giỏi', 'Thuyết phục', 'Sáng tạo ngôn từ'],
        shadowTraits: ['Thị phi', 'Phóng đại', 'Hay tranh cãi'],
        tuViCriteria: { requiredStars: [{ star: 'Cự Môn', minBrightness: 'mieuVuong' }] },
        chiemTinhCriteria: { requiredPlacements: [{ planet: 'Mercury', sign: 'Gemini' }] },
    },
    {
        id: 'alchemist', name: 'Nhà Giả Kim', nameEn: 'The Alchemist', emoji: '🧪',
        category: 'creative', element: 'Hỏa',
        shortDescription: 'Biến đổi, chuyển hóa, từ bình thường thành phi thường.',
        fullDescription: 'Bạn có khả năng biến khó khăn thành cơ hội và biến đổi cuộc sống.',
        definingTraits: ['Chuyển hóa', 'Sâu sắc', 'Tái sinh'],
        shadowTraits: ['Cực đoan', 'Bí ẩn quá mức', 'Khó tin tưởng'],
        tuViCriteria: { requiredStars: [{ star: 'Liêm Trinh', minBrightness: 'mieuVuong' }] },
        chiemTinhCriteria: { requiredPlacements: [{ planet: 'Pluto', house: 1 }] },
    },
    {
        id: 'wandering-artist', name: 'Nghệ Sĩ Lang Thang', nameEn: 'The Wandering Artist', emoji: '🎸',
        category: 'creative', element: 'Mộc',
        shortDescription: 'Tự do, phóng khoáng, sáng tạo không giới hạn.',
        fullDescription: 'Bạn sống để trải nghiệm và biến mọi trải nghiệm thành nghệ thuật.',
        definingTraits: ['Tự do', 'Phiêu lưu', 'Đa tài'],
        shadowTraits: ['Bất ổn', 'Thiếu cam kết', 'Lãng mạn quá mức'],
        tuViCriteria: { requiredStars: [{ star: 'Tham Lang' }] },
        chiemTinhCriteria: { requiredPlacements: [{ planet: 'Jupiter', sign: 'Sagittarius' }] },
    },
];

// ═══════════════════════════════════════════════════════════════════
// Category 3: Analytical (Phân Tích)
// ═══════════════════════════════════════════════════════════════════
const ANALYTICAL_ARCHETYPES: Archetype[] = [
    { id: 'scholar', name: 'Học Giả', nameEn: 'The Scholar', emoji: '📚', category: 'analytical', element: 'Mộc', shortDescription: 'Tri thức là sức mạnh, học hỏi không ngừng.', fullDescription: 'Bạn có khát khao tri thức vô tận.', definingTraits: ['Học vấn', 'Phân tích', 'Chính xác'], shadowTraits: ['Xa rời thực tế', 'Khô khan', 'Cầu toàn'], tuViCriteria: { requiredStars: [{ star: 'Thiên Cơ' }, { star: 'Thiên Lương' }] }, chiemTinhCriteria: { dominantElement: 'Air', requiredPlacements: [{ planet: 'Mercury', sign: 'Virgo' }] } },
    { id: 'detective', name: 'Thám Tử', nameEn: 'The Detective', emoji: '🔍', category: 'analytical', element: 'Thủy', shortDescription: 'Phát hiện sự thật ẩn giấu, không gì qua mắt được.', fullDescription: 'Trực giác và logic kết hợp cho bạn khả năng đọc vị mọi thứ.', definingTraits: ['Quan sát', 'Trực giác', 'Kiên trì'], shadowTraits: ['Đa nghi', 'Ám ảnh', 'Cô lập'], tuViCriteria: { requiredStars: [{ star: 'Cự Môn' }, { star: 'Thiên Cơ' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Pluto', sign: 'Scorpio' }] } },
    { id: 'architect', name: 'Kiến Trúc Sư', nameEn: 'The Architect', emoji: '🏗️', category: 'analytical', element: 'Thổ', shortDescription: 'Xây dựng hệ thống, thiết kế tương lai.', fullDescription: 'Bạn nhìn thấy cấu trúc phía sau sự hỗn loạn.', definingTraits: ['Hệ thống', 'Tầm nhìn', 'Kỷ luật'], shadowTraits: ['Cứng nhắc', 'Thiếu linh hoạt', 'Cô độc'], tuViCriteria: { requiredStars: [{ star: 'Tử Vi' }, { star: 'Thiên Phủ' }] }, chiemTinhCriteria: { dominantElement: 'Earth', requiredPlacements: [{ planet: 'Saturn', sign: 'Aquarius' }] } },
    { id: 'analyst', name: 'Nhà Phân Tích', nameEn: 'The Analyst', emoji: '📊', category: 'analytical', element: 'Kim', shortDescription: 'Dữ liệu là ngôn ngữ, logic là kim chỉ nam.', fullDescription: 'Bạn tư duy bằng mô hình và dữ liệu.', definingTraits: ['Logic', 'Chính xác', 'Khách quan'], shadowTraits: ['Lạnh lùng', 'Thiếu cảm xúc', 'Quá phê phán'], tuViCriteria: { requiredStars: [{ star: 'Vũ Khúc' }, { star: 'Thiên Cơ' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Mercury', sign: 'Capricorn' }] } },
    { id: 'philosopher', name: 'Triết Gia', nameEn: 'The Philosopher', emoji: '🤔', category: 'analytical', element: 'Thủy', shortDescription: 'Suy tư về ý nghĩa cuộc sống, tìm kiếm chân lý.', fullDescription: 'Bạn không thỏa mãn với câu trả lời bề mặt.', definingTraits: ['Sâu sắc', 'Triết lý', 'Tư duy phản biện'], shadowTraits: ['Xa rời', 'Loay hoay', 'Khó hiểu'], tuViCriteria: { requiredStars: [{ star: 'Thiên Lương', minBrightness: 'mieuVuong' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Jupiter', sign: 'Pisces' }] } },
    { id: 'judge', name: 'Quan Tòa', nameEn: 'The Judge', emoji: '⚖️', category: 'analytical', element: 'Kim', shortDescription: 'Công bằng, chính trực, phân xử minh bạch.', fullDescription: 'Bạn có bản năng cân nhắc mọi góc nhìn.', definingTraits: ['Công bằng', 'Chính trực', 'Sáng suốt'], shadowTraits: ['Phán xét', 'Cứng nhắc', 'Thiếu cảm thông'], tuViCriteria: { requiredStars: [{ star: 'Thiên Tướng' }, { star: 'Thiên Lương' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Sun', sign: 'Libra' }] } },
    { id: 'scientist', name: 'Nhà Khoa Học', nameEn: 'The Scientist', emoji: '🔬', category: 'analytical', element: 'Thủy', shortDescription: 'Thí nghiệm, kiểm chứng, tìm kiếm quy luật.', fullDescription: 'Bạn tiếp cận cuộc sống như một phòng thí nghiệm.', definingTraits: ['Tò mò', 'Phương pháp', 'Kiên nhẫn'], shadowTraits: ['Lạnh lùng', 'Xa cách', 'Quá cẩn thận'], tuViCriteria: { requiredStars: [{ star: 'Thiên Cơ', minBrightness: 'mieuVuong' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Mercury', sign: 'Aquarius' }] } },
    { id: 'historian', name: 'Sử Gia', nameEn: 'The Historian', emoji: '🏛️', category: 'analytical', element: 'Thổ', shortDescription: 'Giữ gìn truyền thống, học từ quá khứ.', fullDescription: 'Bạn hiểu giá trị của kinh nghiệm lịch sử.', definingTraits: ['Truyền thống', 'Bảo tồn', 'Kiến thức rộng'], shadowTraits: ['Bảo thủ', 'Hoài cổ', 'Khó đổi mới'], tuViCriteria: { requiredStars: [{ star: 'Thiên Phủ' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Saturn', sign: 'Cancer' }] } },
    { id: 'critic', name: 'Nhà Phê Bình', nameEn: 'The Critic', emoji: '🎯', category: 'analytical', element: 'Kim', shortDescription: 'Tinh tường, không bỏ qua chi tiết, nâng cao chuẩn mực.', fullDescription: 'Bạn giúp mọi thứ trở nên tốt hơn bằng cái nhìn sắc sảo.', definingTraits: ['Tinh tường', 'Chuẩn mực cao', 'Trung thực'], shadowTraits: ['Khắt khe', 'Tiêu cực', 'Khó hài lòng'], tuViCriteria: { requiredStars: [{ star: 'Cự Môn', minBrightness: 'mieuVuong' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Mercury', sign: 'Virgo' }] } },
    { id: 'engineer', name: 'Kỹ Sư Hệ Thống', nameEn: 'The Systems Engineer', emoji: '⚙️', category: 'analytical', element: 'Kim', shortDescription: 'Tối ưu hóa, hiệu quả, mọi thứ phải vận hành trơn tru.', fullDescription: 'Bạn thấy cơ hội cải tiến ở mọi nơi.', definingTraits: ['Tối ưu', 'Hiệu quả', 'Thực tiễn'], shadowTraits: ['Máy móc', 'Thiếu sáng tạo', 'Đơn điệu'], tuViCriteria: { requiredStars: [{ star: 'Vũ Khúc', minBrightness: 'mieuVuong' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Mars', sign: 'Virgo' }] } },
];

// ═══════════════════════════════════════════════════════════════════
// Category 4: Relational (Quan Hệ)
// ═══════════════════════════════════════════════════════════════════
const RELATIONAL_ARCHETYPES: Archetype[] = [
    { id: 'nurturer', name: 'Người Nuôi Dưỡng', nameEn: 'The Nurturer', emoji: '🌺', category: 'relational', element: 'Thủy', shortDescription: 'Chăm sóc, yêu thương, nuôi dưỡng mọi mối quan hệ.', fullDescription: 'Tim bạn rộng lớn và luôn dành chỗ cho người khác.', definingTraits: ['Yêu thương', 'Chăm sóc', 'Nhẫn nại'], shadowTraits: ['Hy sinh', 'Kiểm soát', 'Quên bản thân'], tuViCriteria: { requiredStars: [{ star: 'Thái Âm' }, { star: 'Thiên Đồng' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Moon', sign: 'Cancer' }] } },
    { id: 'connector', name: 'Người Kết Nối', nameEn: 'The Connector', emoji: '🔗', category: 'relational', element: 'Mộc', shortDescription: 'Xây dựng cầu nối giữa mọi người.', fullDescription: 'Bạn có khả năng nhìn thấy mối liên hệ giữa mọi người.', definingTraits: ['Giao tiếp', 'Linh hoạt', 'Cởi mở'], shadowTraits: ['Hời hợt', 'Thiếu chiều sâu', 'Hay thay đổi'], tuViCriteria: { requiredStars: [{ star: 'Tham Lang' }, { star: 'Thiên Đồng' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Venus', sign: 'Gemini' }] } },
    { id: 'mediator', name: 'Người Hòa Giải', nameEn: 'The Mediator', emoji: '☮️', category: 'relational', element: 'Thổ', shortDescription: 'Tìm kiếm hòa bình, cân bằng mọi xung đột.', fullDescription: 'Bạn có năng khiếu đặc biệt trong việc hòa giải mâu thuẫn.', definingTraits: ['Hòa bình', 'Cân bằng', 'Đồng cảm'], shadowTraits: ['Tránh xung đột', 'Thiếu ranh giới', 'Ôm đồm'], tuViCriteria: { requiredStars: [{ star: 'Thiên Đồng', minBrightness: 'mieuVuong' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Venus', sign: 'Libra' }] } },
    { id: 'empath', name: 'Người Thấu Cảm', nameEn: 'The Empath', emoji: '💗', category: 'relational', element: 'Thủy', shortDescription: 'Cảm nhận cảm xúc người khác như chính mình.', fullDescription: 'Bạn có khả năng đọc cảm xúc phi thường.', definingTraits: ['Thấu cảm', 'Nhạy bén', 'Trực giác'], shadowTraits: ['Quá nhạy cảm', 'Hấp thụ tiêu cực', 'Kiệt sức'], tuViCriteria: { requiredStars: [{ star: 'Thái Âm', minBrightness: 'mieuVuong' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Moon', sign: 'Pisces' }] } },
    { id: 'confidant', name: 'Người Tri Kỷ', nameEn: 'The Confidant', emoji: '🫂', category: 'relational', element: 'Mộc', shortDescription: 'Đáng tin cậy, giữ bí mật, bạn tốt nhất ai cũng muốn có.', fullDescription: 'Bạn là nơi an toàn mà mọi người tìm đến.', definingTraits: ['Đáng tin', 'Lắng nghe', 'Trung thành'], shadowTraits: ['Giữ khép kín', 'Ít bộc lộ', 'Hy sinh cảm xúc'], tuViCriteria: { requiredStars: [{ star: 'Thiên Tướng', minBrightness: 'mieuVuong' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Saturn', sign: 'Cancer' }] } },
    { id: 'romantic', name: 'Người Lãng Mạn', nameEn: 'The Romantic', emoji: '🌹', category: 'relational', element: 'Hỏa', shortDescription: 'Yêu đương mãnh liệt, sống bằng cảm xúc.', fullDescription: 'Tình yêu là nguồn năng lượng chính của bạn.', definingTraits: ['Đam mê', 'Lãng mạn', 'Trung thành'], shadowTraits: ['Ghen tuông', 'Sở hữu', 'Quá lý tưởng hóa'], tuViCriteria: { requiredStars: [{ star: 'Liêm Trinh' }, { star: 'Tham Lang' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Venus', sign: 'Scorpio' }] } },
    { id: 'teacher', name: 'Người Thầy', nameEn: 'The Teacher', emoji: '🎓', category: 'relational', element: 'Mộc', shortDescription: 'Truyền đạt tri thức, dẫn dắt thế hệ sau.', fullDescription: 'Bạn có năng khiếu dạy dỗ và truyền cảm hứng.', definingTraits: ['Kiên nhẫn', 'Trí tuệ', 'Nhân từ'], shadowTraits: ['Hay thuyết giáo', 'Khó chấp nhận sai', 'Quyền uy'], tuViCriteria: { requiredStars: [{ star: 'Thiên Lương' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Jupiter', sign: 'Sagittarius' }] } },
    { id: 'caregiver', name: 'Người Chăm Sóc', nameEn: 'The Caregiver', emoji: '🩺', category: 'relational', element: 'Thủy', shortDescription: 'Dành đời mình cho việc chăm sóc người khác.', fullDescription: 'Bạn có bản năng chữa lành và an ủi mạnh mẽ.', definingTraits: ['Hy sinh', 'Nhẫn nại', 'Trách nhiệm'], shadowTraits: ['Kiệt sức', 'Tự bỏ quên', 'Chịu đựng quá mức'], tuViCriteria: { requiredStars: [{ star: 'Thiên Đồng' }, { star: 'Thiên Lương' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Moon', sign: 'Virgo' }] } },
    { id: 'host', name: 'Chủ Nhà', nameEn: 'The Host', emoji: '🏡', category: 'relational', element: 'Thổ', shortDescription: 'Ấm áp, hiếu khách, biến mọi nơi thành nhà.', fullDescription: 'Bạn tạo ra không gian an toàn cho mọi người.', definingTraits: ['Hiếu khách', 'Ấm áp', 'Ổn định'], shadowTraits: ['Hay lo', 'Kiểm soát', 'Khó rời nhà'], tuViCriteria: { requiredStars: [{ star: 'Thiên Phủ', minBrightness: 'mieuVuong' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Moon', sign: 'Taurus' }] } },
    { id: 'matchmaker', name: 'Bà Mối', nameEn: 'The Matchmaker', emoji: '💕', category: 'relational', element: 'Hỏa', shortDescription: 'Nhìn thấy khả năng kết nối giữa mọi người.', fullDescription: 'Bạn có "đôi mắt Đào Hoa" nhìn thấy ai hợp với ai.', definingTraits: ['Giao tiếp', 'Trực giác xã hội', 'Nhiệt tình'], shadowTraits: ['Can thiệp', 'Tọc mạch', 'Áp đặt'], tuViCriteria: { requiredStars: [{ star: 'Tham Lang', minBrightness: 'mieuVuong' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Venus', sign: 'Libra' }] } },
];

// ═══════════════════════════════════════════════════════════════════
// Category 5: Adventurer (Phiêu Lưu)
// ═══════════════════════════════════════════════════════════════════
const ADVENTURER_ARCHETYPES: Archetype[] = [
    { id: 'explorer', name: 'Nhà Thám Hiểm', nameEn: 'The Explorer', emoji: '🧭', category: 'adventurer', element: 'Hỏa', shortDescription: 'Không bao giờ ngồi yên, luôn tìm kiếm chân trời mới.', fullDescription: 'Thế giới là sân chơi và bạn muốn khám phá hết.', definingTraits: ['Tự do', 'Dũng cảm', 'Tò mò'], shadowTraits: ['Bất ổn', 'Thiếu cam kết', 'Bồng bột'], tuViCriteria: { requiredStars: [{ star: 'Thất Sát' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Mars', sign: 'Sagittarius' }] } },
    { id: 'rebel', name: 'Kẻ Nổi Loạn', nameEn: 'The Rebel', emoji: '🏴', category: 'adventurer', element: 'Hỏa', shortDescription: 'Phá vỡ quy tắc, thách thức quyền lực.', fullDescription: 'Bạn sinh ra để thay đổi hệ thống.', definingTraits: ['Độc lập', 'Dũng cảm', 'Chân thật'], shadowTraits: ['Chống đối', 'Cô lập', 'Thiếu kỷ luật'], tuViCriteria: { requiredStars: [{ star: 'Phá Quân', minBrightness: 'mieuVuong' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Uranus', house: 1 }] } },
    { id: 'nomad', name: 'Du Mục', nameEn: 'The Nomad', emoji: '🐎', category: 'adventurer', element: 'Mộc', shortDescription: 'Không bị ràng buộc, tự do di chuyển.', fullDescription: 'Nhà là nơi trái tim bạn ở, không phải bốn bức tường.', definingTraits: ['Linh hoạt', 'Thích nghi', 'Tự do'], shadowTraits: ['Lãng mạn quá', 'Thiếu gốc rễ', 'Bất ổn'], tuViCriteria: { requiredStars: [{ star: 'Thiên Cơ' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Mars', sign: 'Sagittarius' }] } },
    { id: 'daredevil', name: 'Người Liều', nameEn: 'The Daredevil', emoji: '🎪', category: 'adventurer', element: 'Kim', shortDescription: 'Mạo hiểm, dám liều, sống trên ranh giới.', fullDescription: 'Bạn tìm thấy sự sống trong nguy hiểm.', definingTraits: ['Dũng cảm', 'Quyết đoán', 'Bạo phát'], shadowTraits: ['Liều lĩnh', 'Thiếu cẩn thận', 'Bạo tàn'], tuViCriteria: { requiredStars: [{ star: 'Thất Sát', minBrightness: 'mieuVuong' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Mars', sign: 'Aries' }] } },
    { id: 'phoenix', name: 'Phượng Hoàng', nameEn: 'The Phoenix', emoji: '🔥', category: 'adventurer', element: 'Hỏa', shortDescription: 'Tái sinh từ tro tàn, mạnh hơn sau mỗi thất bại.', fullDescription: 'Bạn có khả năng phục hồi phi thường.', definingTraits: ['Kiên cường', 'Tái sinh', 'Biến hóa'], shadowTraits: ['Cực đoan', 'Tự hủy để tái sinh', 'Khó buông bỏ'], tuViCriteria: { requiredStars: [{ star: 'Liêm Trinh' }, { star: 'Thất Sát' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Pluto', sign: 'Scorpio' }] } },
    { id: 'merchant', name: 'Thương Nhân', nameEn: 'The Merchant', emoji: '🪙', category: 'adventurer', element: 'Kim', shortDescription: 'Nhìn thấy cơ hội kinh doanh ở mọi nơi.', fullDescription: 'Bạn biến mọi giao dịch thành lợi nhuận.', definingTraits: ['Nhanh nhạy', 'Thực tế', 'Linh hoạt'], shadowTraits: ['Tham lợi', 'Thiếu trung thành', 'Tính toán'], tuViCriteria: { requiredStars: [{ star: 'Vũ Khúc' }, { star: 'Tham Lang' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Mercury', sign: 'Gemini' }] } },
    { id: 'pioneer', name: 'Người Mở Đường', nameEn: 'The Pioneer', emoji: '🚀', category: 'adventurer', element: 'Hỏa', shortDescription: 'Đi đầu, khai phá, không bao giờ đi theo lối mòn.', fullDescription: 'Bạn mở đường cho người khác theo.', definingTraits: ['Tiên phong', 'Sáng tạo', 'Dũng cảm'], shadowTraits: ['Cô đơn', 'Thiếu đồng minh', 'Quá nhanh'], tuViCriteria: { requiredStars: [{ star: 'Phá Quân' }, { star: 'Tham Lang' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Mars', sign: 'Aries' }] } },
    { id: 'survivor', name: 'Người Sống Sót', nameEn: 'The Survivor', emoji: '🏔️', category: 'adventurer', element: 'Thổ', shortDescription: 'Chịu đựng, sống sót, và mạnh hơn mỗi ngày.', fullDescription: 'Không khó khăn nào có thể đánh bại bạn.', definingTraits: ['Kiên cường', 'Bền bỉ', 'Thực tế'], shadowTraits: ['Chai sạn', 'Khó tin tưởng', 'Mệt mỏi'], tuViCriteria: { requiredStars: [{ star: 'Thất Sát' }, { star: 'Phá Quân' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Saturn', sign: 'Scorpio' }] } },
    { id: 'gambler', name: 'Tay Chơi', nameEn: 'The Gambler', emoji: '🎲', category: 'adventurer', element: 'Hỏa', shortDescription: 'Đặt cược lớn, sống mãnh liệt.', fullDescription: 'Bạn tin vào vận may và sẵn sàng đặt cược tất cả.', definingTraits: ['Tự tin', 'Trực giác', 'Dũng cảm'], shadowTraits: ['Liều lĩnh', 'Nghiện cảm giác', 'Thiếu kế hoạch'], tuViCriteria: { requiredStars: [{ star: 'Tham Lang', minBrightness: 'ham' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Jupiter', sign: 'Leo' }] } },
    { id: 'mystic', name: 'Nhà Huyền Học', nameEn: 'The Mystic', emoji: '🌌', category: 'adventurer', element: 'Thủy', shortDescription: 'Kết nối với thế giới vô hình.', fullDescription: 'Bạn có trực giác siêu nhiên và sự nhạy cảm tâm linh.', definingTraits: ['Trực giác', 'Tâm linh', 'Sâu sắc'], shadowTraits: ['Xa rời thực tế', 'Bí ẩn quá', 'Khó giao tiếp'], tuViCriteria: { requiredStars: [{ star: 'Thái Âm' }] }, chiemTinhCriteria: { requiredPlacements: [{ planet: 'Neptune', house: 12 }] } },
];

// ═══════════════════════════════════════════════════════════════════
// Exported Library
// ═══════════════════════════════════════════════════════════════════

/** Complete archetype library — all 50 archetypes */
export const ARCHETYPE_LIBRARY: readonly Archetype[] = [
    ...LEADERSHIP_ARCHETYPES,
    ...CREATIVE_ARCHETYPES,
    ...ANALYTICAL_ARCHETYPES,
    ...RELATIONAL_ARCHETYPES,
    ...ADVENTURER_ARCHETYPES,
] as const;

/** Default fallback archetype when no strong match is found */
export const FALLBACK_ARCHETYPE: Archetype = {
    id: 'balanced-soul', name: 'Tâm Hồn Cân Bằng', nameEn: 'The Balanced Soul', emoji: '☯️',
    category: 'relational', element: 'Hỗn Hợp',
    shortDescription: 'Một tâm hồn đa diện, không bị giới hạn bởi một khuôn mẫu nào.',
    fullDescription: 'Bạn là sự kết hợp độc đáo của nhiều năng lượng khác nhau. Thay vì nổi bật một chiều, bạn mang trong mình sự cân bằng hiếm có.',
    definingTraits: ['Linh hoạt', 'Đa dạng', 'Thích nghi'],
    shadowTraits: ['Thiếu trọng tâm', 'Hay phân vân', 'Khó định vị'],
};
