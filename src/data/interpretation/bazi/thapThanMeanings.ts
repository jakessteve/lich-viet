/**
 * Thập Thần (Ten Gods) Meaning Descriptions
 * Maps the 10 relationship types between Day Master and other stems.
 */

export type ThapThanName = 'Tỉ Kiên' | 'Kiếp Tài' | 'Thực Thần' | 'Thương Quan' | 'Thiên Tài' | 'Chính Tài' | 'Thất Sát' | 'Chính Quan' | 'Thiên Ấn' | 'Chính Ấn';

export interface ThapThanInfo {
  name: ThapThanName;
  nameHan: string;
  nature: 'cat' | 'hung' | 'trung';
  keyword: string;
  meaning: string;
  positive: string;
  negative: string;
  lifeAspect: string;
}

export const THAP_THAN_MEANINGS: Record<ThapThanName, ThapThanInfo> = {
  'Tỉ Kiên': {
    name: 'Tỉ Kiên', nameHan: '比肩', nature: 'trung', keyword: 'Bạn bè · Đồng nghiệp',
    meaning: 'Cùng hành, cùng tính (Dương gặp Dương, Âm gặp Âm) với Nhật Chủ. Tượng trưng cho anh em, bạn bè, đồng nghiệp cùng chí hướng.',
    positive: 'Tự lập, có chủ kiến, giao thiệp rộng, được bạn bè hỗ trợ. Thích hợp kinh doanh hợp tác, làm việc nhóm.',
    negative: 'Cố chấp, hay tranh giành, khó nhượng bộ. Dễ bị bạn bè cạnh tranh hoặc lợi dụng tài chính.',
    lifeAspect: 'Quan hệ xã hội, tình bạn, đối tác kinh doanh',
  },
  'Kiếp Tài': {
    name: 'Kiếp Tài', nameHan: '劫財', nature: 'hung', keyword: 'Cạnh tranh · Tranh đoạt',
    meaning: 'Cùng hành nhưng khác tính (Dương gặp Âm) với Nhật Chủ. Tượng trưng cho kẻ cạnh tranh, người tranh giành quyền lợi.',
    positive: 'Năng động, dám mạo hiểm, quyết đoán trong hành động. Có sức hút, dám đầu tư lớn.',
    negative: 'Phung phí, bốc đồng, hay gặp tổn thất tiền bạc. Dễ bị tranh giành tài sản hoặc tình cảm.',
    lifeAspect: 'Tài chính, cạnh tranh, mạo hiểm',
  },
  'Thực Thần': {
    name: 'Thực Thần', nameHan: '食神', nature: 'cat', keyword: 'Tài năng · Hưởng thụ',
    meaning: 'Hành do Nhật Chủ sinh ra, cùng tính. Tượng trưng cho tài năng bẩm sinh, sáng tạo, khả năng biểu đạt.',
    positive: 'Tài hoa, hưởng thụ, phúc lộc, ăn uống ngon. Sáng tạo không giới hạn, có khiếu nghệ thuật, biểu diễn.',
    negative: 'Lười biếng, đam mê hưởng thụ quá mức. Thiếu ý chí phấn đấu, dễ tự mãn.',
    lifeAspect: 'Tài năng, sáng tạo, ẩm thực, con cái (nữ mệnh)',
  },
  'Thương Quan': {
    name: 'Thương Quan', nameHan: '傷官', nature: 'hung', keyword: 'Phản kháng · Sáng tạo',
    meaning: 'Hành do Nhật Chủ sinh ra, khác tính. Tượng trưng cho sự phản kháng, thông minh vượt trội, tài năng phi thường.',
    positive: 'Cực kỳ thông minh, sáng tạo đột phá, tư duy khác biệt. Có tài hùng biện, biểu đạt xuất sắc.',
    negative: 'Ngạo mạn, hay phê phán, khó hòa hợp với cấp trên. Dễ phạm lỗi đắc tội người trên, gây mâu thuẫn.',
    lifeAspect: 'Sự nghiệp, tài năng, mối quan hệ với cấp trên',
  },
  'Thiên Tài': {
    name: 'Thiên Tài', nameHan: '偏財', nature: 'cat', keyword: 'Tiền ngoài · Đầu tư',
    meaning: 'Hành bị Nhật Chủ khắc, khác tính. Tượng trưng cho tài lộc bất ngờ, đầu tư, kinh doanh.',
    positive: 'Hào phóng, giỏi kiếm tiền ngoài, có duyên với tài lộc bất ngờ. Tốt cho kinh doanh, đầu tư, buôn bán.',
    negative: 'Phung phí, bất ổn tài chính, hay đánh bạc. Dễ bị cám dỗ bởi lợi nhuận nhanh.',
    lifeAspect: 'Tài lộc bất ngờ, đầu tư, cha (nam mệnh)',
  },
  'Chính Tài': {
    name: 'Chính Tài', nameHan: '正財', nature: 'cat', keyword: 'Lương bổng · Ổn định',
    meaning: 'Hành bị Nhật Chủ khắc, cùng tính. Tượng trưng cho thu nhập ổn định, lương bổng, tài sản tích lũy.',
    positive: 'Cần cù, tiết kiệm, thu nhập ổn định. Giỏi quản lý tài chính, tích lũy lâu dài.',
    negative: 'Keo kiệt, quá tính toán, thiếu mạo hiểm. Đôi khi quá thận trọng bỏ lỡ cơ hội.',
    lifeAspect: 'Thu nhập ổn định, tiết kiệm, vợ (nam mệnh)',
  },
  'Thất Sát': {
    name: 'Thất Sát', nameHan: '七殺', nature: 'hung', keyword: 'Áp lực · Quyền lực',
    meaning: 'Hành khắc Nhật Chủ, khác tính. Tượng trưng cho áp lực, quyền uy, thử thách nghiêm khắc.',
    positive: 'Có quyền lực, uy tín, dám đối đầu thử thách. Thích hợp lãnh đạo, quân sự, cạnh tranh khốc liệt.',
    negative: 'Áp lực lớn, dễ gặp tai họa, bị kẻ tiểu nhân hãm hại. Đối mặt nhiều trở ngại và nguy hiểm.',
    lifeAspect: 'Sự nghiệp, quyền lực, con cái (nữ mệnh)',
  },
  'Chính Quan': {
    name: 'Chính Quan', nameHan: '正官', nature: 'cat', keyword: 'Danh tiếng · Kỷ luật',
    meaning: 'Hành khắc Nhật Chủ, cùng tính. Tượng trưng cho danh tiếng, địa vị, kỷ luật, trật tự.',
    positive: 'Có danh vọng, được tôn trọng, thăng tiến trong công việc. Tự giác, kỷ luật, tuân thủ quy tắc.',
    negative: 'Quá tuân thủ quy tắc, thiếu sáng tạo. Áp lực từ trách nhiệm xã hội, kỳ vọng từ người khác.',
    lifeAspect: 'Danh tiếng, sự nghiệp công, chồng (nữ mệnh)',
  },
  'Thiên Ấn': {
    name: 'Thiên Ấn', nameHan: '偏印', nature: 'trung', keyword: 'Tâm linh · Nghiên cứu',
    meaning: 'Hành sinh Nhật Chủ, khác tính. Tượng trưng cho trí tuệ phi truyền thống, tâm linh, bí ẩn.',
    positive: 'Trí tuệ sâu, nghiên cứu giỏi, có năng khiếu tâm linh. Tư duy độc lập, không theo lối mòn.',
    negative: 'Cô đơn, cô độc, suy nghĩ quá phức tạp. Khó hòa nhập, dễ bị hiểu lầm.',
    lifeAspect: 'Học vấn phi chính thống, tâm linh, mẹ kế',
  },
  'Chính Ấn': {
    name: 'Chính Ấn', nameHan: '正印', nature: 'cat', keyword: 'Học vấn · Che chở',
    meaning: 'Hành sinh Nhật Chủ, cùng tính. Tượng trưng cho mẹ, thầy, học vấn, sự bảo trợ.',
    positive: 'Học giỏi, có quý nhân phù trợ, được che chở. Hiền lành, nhân từ, có phúc đức.',
    negative: 'Phụ thuộc, thiếu tự lập, hay dựa dẫm. Đôi khi thụ động, thiếu động lực phấn đấu.',
    lifeAspect: 'Học vấn, mẹ, quý nhân, bảo trợ',
  },
};
