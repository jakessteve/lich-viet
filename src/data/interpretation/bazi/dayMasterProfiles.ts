/**
 * Day Master Personality Profiles — 10 unique archetypes
 * Each Heavenly Stem (Thiên Can) has a distinctive personality.
 */

import type { Can } from '../../../types/calendar';

export interface DayMasterProfile {
  can: Can;
  image: string;
  imageEmoji: string;
  archetype: string;
  element: string;
  yinYang: 'Dương' | 'Âm';
  personality: string;
  strengths: string[];
  weaknesses: string[];
  career: string;
  relationship: string;
}

export const DAY_MASTER_PROFILES: Record<Can, DayMasterProfile> = {
  'Giáp': {
    can: 'Giáp', image: 'Đại Thụ', imageEmoji: '🌳', archetype: 'Cây đại thụ vươn thẳng trời xanh',
    element: 'Mộc Dương', yinYang: 'Dương',
    personality: 'Giáp Mộc như cây cổ thụ sừng sững — ngay thẳng, cứng cỏi, có chí hướng lớn. Bạn là người có lý tưởng, thích dẫn đầu và không dễ khuất phục. Tính cách mạnh mẽ, bảo vệ người thân như tán cây che nắng. Tuy nhiên, đôi khi quá cứng nhắc, khó uốn theo hoàn cảnh.',
    strengths: ['Lãnh đạo bẩm sinh, có tầm nhìn xa', 'Chính trực, trung thành, đáng tin cậy', 'Kiên định trước nghịch cảnh', 'Bao dung, hay giúp đỡ người khác'],
    weaknesses: ['Cứng nhắc, khó thay đổi quan điểm', 'Hay áp đặt ý kiến lên người khác', 'Đôi khi quá lý tưởng, xa rời thực tế', 'Khó thỏa hiệp trong mâu thuẫn'],
    career: 'Phù hợp với vai trò lãnh đạo, quản lý, giáo dục, luật pháp, kiến trúc, nông lâm nghiệp. Người Giáp Mộc thường thành công khi xây dựng sự nghiệp lâu dài, bền vững.',
    relationship: 'Trong tình cảm, Giáp Mộc là người chung thủy và bảo vệ gia đình. Tuy nhiên cần học cách lắng nghe và linh hoạt hơn để tránh xung đột không đáng có.',
  },
  'Ất': {
    can: 'Ất', image: 'Hoa Cỏ', imageEmoji: '🌿', archetype: 'Dây leo mềm mại uốn quanh cổ thụ',
    element: 'Mộc Âm', yinYang: 'Âm',
    personality: 'Ất Mộc như cỏ cây hoa lá — mềm mại, uyển chuyển, khéo léo thích nghi. Bạn có trực giác nhạy bén, hiểu lòng người và biết cách len lỏi trong mọi hoàn cảnh. Sức sống dẻo dai, bị đè nén vẫn vươn lên. Ngoài yếu mềm nhưng bên trong rất kiên cường.',
    strengths: ['Khéo léo, linh hoạt, thích nghi tốt', 'Trực giác nhạy bén, hiểu tâm lý người khác', 'Nghệ thuật, sáng tạo, tinh tế', 'Kiên nhẫn, nhẫn nại vượt khó'],
    weaknesses: ['Hay do dự, thiếu quyết đoán', 'Dễ bị ảnh hưởng bởi người khác', 'Đôi khi quá phụ thuộc vào người xung quanh', 'Có xu hướng tránh đối đầu'],
    career: 'Phù hợp nghệ thuật, thiết kế, ngoại giao, tư vấn, y học cổ truyền, thảo dược, thời trang. Ất Mộc thành công nhờ kết nối và mạng lưới quan hệ.',
    relationship: 'Ất Mộc dịu dàng, lãng mạn trong tình cảm. Khéo léo chăm sóc nhưng cần tránh quá phụ thuộc cảm xúc vào đối phương.',
  },
  'Bính': {
    can: 'Bính', image: 'Thái Dương', imageEmoji: '☀️', archetype: 'Mặt trời rực rỡ soi sáng muôn nơi',
    element: 'Hỏa Dương', yinYang: 'Dương',
    personality: 'Bính Hỏa như mặt trời — rạng rỡ, nhiệt huyết, tỏa sáng thu hút mọi người xung quanh. Bạn có sức hút tự nhiên, lạc quan, hào phóng và thích lan tỏa năng lượng tích cực. Tính cách nồng nhiệt, thẳng thắn, không giấu diếm. Khi tỏa sáng quá mức, có thể gây nóng nảy hoặc thiêu đốt chính mình.',
    strengths: ['Lạc quan, truyền cảm hứng cho người khác', 'Hào phóng, rộng lượng, sẵn sàng cho đi', 'Sáng tạo, nhiệt huyết, tràn đầy năng lượng', 'Thẳng thắn, chân thành, đáng tin'],
    weaknesses: ['Nóng nảy, bốc đồng khi bị kích động', 'Hay phung phí, thiếu tính toán', 'Đôi khi quá tự tin, chủ quan', 'Thiếu kiên nhẫn với chi tiết vụn vặt'],
    career: 'Phù hợp truyền thông, giải trí, chính trị, giảng dạy, marketing, sự kiện, nghệ thuật biểu diễn. Bính Hỏa tỏa sáng khi được đứng trước đám đông.',
    relationship: 'Bính Hỏa nồng nhiệt, lãng mạn, cho đi hết mình trong tình cảm. Cần học cách kiểm soát sự nóng nảy và cho đối phương không gian riêng.',
  },
  'Đinh': {
    can: 'Đinh', image: 'Đèn Nến', imageEmoji: '🕯️', archetype: 'Ngọn nến lung linh soi sáng trong đêm',
    element: 'Hỏa Âm', yinYang: 'Âm',
    personality: 'Đinh Hỏa như ngọn nến — nhẹ nhàng, ấm áp, soi sáng tinh tế. Bạn có trí tuệ sắc bén, quan sát tinh tường, nhìn thấu bản chất sự việc. Ánh sáng tuy nhỏ nhưng kiên định, không dễ bị dập tắt. Là người đa cảm, sâu sắc, thích tìm hiểu chiều sâu của cuộc sống.',
    strengths: ['Trí tuệ sắc bén, phân tích tinh tế', 'Chú ý chi tiết, tỉ mỉ cẩn thận', 'Sâu sắc, đồng cảm, hiểu lòng người', 'Kiên nhẫn, bền bỉ theo đuổi mục tiêu'],
    weaknesses: ['Hay lo lắng, suy nghĩ quá nhiều', 'Dễ nhạy cảm, đôi khi bi quan', 'Khó tin tưởng người lạ ban đầu', 'Có xu hướng trầm tính, khép kín'],
    career: 'Phù hợp nghiên cứu, văn học, tâm lý học, y khoa, chiêm tinh, phong thủy, công nghệ. Đinh Hỏa xuất sắc trong các lĩnh vực đòi hỏi tư duy sâu.',
    relationship: 'Đinh Hỏa chung thủy, sâu đậm trong tình cảm nhưng khó mở lòng. Khi đã yêu thì rất tận tụy và ấm áp.',
  },
  'Mậu': {
    can: 'Mậu', image: 'Núi Đất', imageEmoji: '⛰️', archetype: 'Ngọn núi vững chãi giữa đất trời',
    element: 'Thổ Dương', yinYang: 'Dương',
    personality: 'Mậu Thổ như ngọn núi — vững vàng, đáng tin cậy, bao la. Bạn là người trầm tĩnh, kiên định, như trụ cột cho gia đình và cộng đồng. Tính cách rộng lượng, bao dung, chấp nhận mọi thứ như đất mẹ. Tuy nhiên đôi khi cố chấp, chậm thay đổi.',
    strengths: ['Đáng tin cậy, ổn định như đá tảng', 'Bao dung, rộng lượng, ít phàn nàn', 'Trung thành, chịu đựng, kiên nhẫn', 'Thực tế, chắc chắn trong hành động'],
    weaknesses: ['Cố chấp, bảo thủ, chậm thay đổi', 'Thiếu linh hoạt trong suy nghĩ', 'Đôi khi quá thụ động, chịu đựng', 'Chậm phản ứng trước cơ hội mới'],
    career: 'Phù hợp bất động sản, nông nghiệp, xây dựng, ngân hàng, bảo hiểm, quản lý kho bãi. Mậu Thổ thành công nhờ sự ổn định và uy tín lâu dài.',
    relationship: 'Mậu Thổ trung thành, đáng tin, là người bạn đời vững chắc. Cần học cách bày tỏ cảm xúc nhiều hơn.',
  },
  'Kỷ': {
    can: 'Kỷ', image: 'Ruộng Đất', imageEmoji: '🌾', archetype: 'Mảnh đất phì nhiêu nuôi dưỡng vạn vật',
    element: 'Thổ Âm', yinYang: 'Âm',
    personality: 'Kỷ Thổ như ruộng đồng phì nhiêu — dung dưỡng, nuôi nấng, âm thầm đóng góp. Bạn là người chu đáo, tỉ mỉ, giàu lòng trắc ẩn. Như đất ẩm, bên ngoài khiêm nhường nhưng bên trong chứa đựng nguồn lực dồi dào. Thích chăm sóc và phục vụ người khác.',
    strengths: ['Chu đáo, tận tâm, hay nghĩ cho người khác', 'Tỉ mỉ, có tổ chức, ngăn nắp', 'Khiêm nhường, không khoe khoang', 'Giàu lòng trắc ẩn, dễ đồng cảm'],
    weaknesses: ['Hay lo lắng quá mức, tự gánh chịu', 'Thiếu tự tin, đánh giá thấp bản thân', 'Dễ bị lợi dụng vì quá tốt', 'Đôi khi cầu toàn, khó hài lòng'],
    career: 'Phù hợp giáo dục, y tế, xã hội, nông nghiệp, ẩm thực, nhân sự, kế toán. Kỷ Thổ thành công khi phục vụ và chăm sóc người khác.',
    relationship: 'Kỷ Thổ là người bạn đời chu đáo, hy sinh. Cần học cách yêu thương bản thân và đặt ranh giới lành mạnh.',
  },
  'Canh': {
    can: 'Canh', image: 'Kiếm Sắt', imageEmoji: '⚔️', archetype: 'Thanh kiếm sắc bén cắt đứt mọi chướng ngại',
    element: 'Kim Dương', yinYang: 'Dương',
    personality: 'Canh Kim như thanh kiếm — cứng rắn, quyết đoán, công bằng. Bạn có ý chí mạnh mẽ, dám nghĩ dám làm, không sợ đối đầu thử thách. Tính cách thẳng thắn đến mức gay gắt, coi trọng nghĩa khí và sự công bằng. Dũng cảm bảo vệ lẽ phải.',
    strengths: ['Quyết đoán, dám hành động nhanh', 'Trung thực, nghĩa khí, coi trọng công bằng', 'Dũng cảm, không sợ thử thách', 'Kỷ luật cao, tự giác, có trách nhiệm'],
    weaknesses: ['Quá cứng rắn, thiếu mềm mỏng', 'Hay phán xét, chỉ trích người khác', 'Bướng bỉnh, khó nhượng bộ', 'Đôi khi cô đơn vì quá thẳng thắn'],
    career: 'Phù hợp quân đội, cảnh sát, luật sư, phẫu thuật, cơ khí, luyện kim, thể thao. Canh Kim thành công trong môi trường cạnh tranh và đòi hỏi kỷ luật.',
    relationship: 'Canh Kim trung thành, bảo vệ người yêu nhưng ít lãng mạn. Cần học cách thể hiện tình cảm nhẹ nhàng hơn.',
  },
  'Tân': {
    can: 'Tân', image: 'Kim Cương', imageEmoji: '💎', archetype: 'Viên ngọc quý lấp lánh sau quá trình mài giũa',
    element: 'Kim Âm', yinYang: 'Âm',
    personality: 'Tân Kim như viên ngọc — tinh tế, thanh lịch, có gu thẩm mỹ cao. Bạn theo đuổi sự hoàn hảo, có phong cách riêng biệt, coi trọng vẻ bề ngoài và phẩm chất. Nhạy cảm với cái đẹp và sự tinh xảo. Kiêu hãnh nhưng cũng dễ tổn thương.',
    strengths: ['Thẩm mỹ cao, tinh tế, có gu', 'Thông minh, lanh lợi, nhanh nhạy', 'Có phong cách riêng, nổi bật', 'Cầu toàn, chất lượng cao trong công việc'],
    weaknesses: ['Quá cầu toàn, khó hài lòng', 'Nhạy cảm, dễ tổn thương', 'Hay so sánh, đố kỵ khi không đạt được', 'Đôi khi kiêu ngạo, xa cách'],
    career: 'Phù hợp trang sức, thời trang, mỹ thuật, tài chính, luật sư, bác sĩ da liễu, tech. Tân Kim thành công trong các lĩnh vực đòi hỏi sự tinh xảo.',
    relationship: 'Tân Kim lãng mạn, coi trọng phẩm chất đối phương. Cần tránh quá kỳ vọng và học cách chấp nhận sự không hoàn hảo.',
  },
  'Nhâm': {
    can: 'Nhâm', image: 'Đại Hải', imageEmoji: '🌊', archetype: 'Dòng nước lớn chảy mãi không ngừng',
    element: 'Thủy Dương', yinYang: 'Dương',
    personality: 'Nhâm Thủy như đại dương — bao la, sâu thẳm, năng động không ngừng. Bạn có trí tuệ phóng khoáng, tư duy rộng mở, thích khám phá và trải nghiệm. Như dòng nước, biến hóa linh hoạt, tìm đường dù gặp bao chướng ngại. Tuy nhiên đôi khi bất ổn, khó dừng lại.',
    strengths: ['Trí tuệ rộng, tầm nhìn bao quát', 'Linh hoạt, sáng tạo, không ngại thay đổi', 'Giao tiếp tốt, kết nối rộng', 'Bản lĩnh, dám mạo hiểm khám phá'],
    weaknesses: ['Bất ổn, hay thay đổi ý kiến', 'Thiếu kiên nhẫn với việc lặp đi lặp lại', 'Đôi khi quá phóng đãng, thiếu kỷ luật', 'Khó tập trung vào một hướng duy nhất'],
    career: 'Phù hợp thương mại, du lịch, vận tải, truyền thông, ngành nước/đồ uống, ngoại giao, kinh doanh quốc tế. Nhâm Thủy thành công khi được tự do và không bị gò bó.',
    relationship: 'Nhâm Thủy hấp dẫn, hào phóng nhưng khó ràng buộc. Cần ổn định cảm xúc và cam kết lâu dài.',
  },
  'Quý': {
    can: 'Quý', image: 'Mưa Sương', imageEmoji: '💧', archetype: 'Giọt sương mai tinh khiết dưỡng nuôi vạn vật',
    element: 'Thủy Âm', yinYang: 'Âm',
    personality: 'Quý Thủy như giọt sương, cơn mưa — nhẹ nhàng thẩm thấu, có sức ảnh hưởng ngầm mạnh mẽ. Bạn có trực giác phi thường, khả năng ngoại cảm, đồng cảm sâu sắc. Như nước ngầm, bên ngoài tĩnh lặng nhưng bên trong chứa đựng nguồn năng lượng lớn. Dễ bị ảnh hưởng bởi môi trường.',
    strengths: ['Trực giác mạnh, nhạy cảm phi thường', 'Đồng cảm cao, hiểu lòng người sâu sắc', 'Sáng tạo, giàu trí tưởng tượng', 'Kiên nhẫn, thấm nhuần từ từ'],
    weaknesses: ['Quá nhạy cảm, dễ bị tổn thương', 'Hay mộng mơ, thoát ly thực tế', 'Dễ bị môi trường tiêu cực ảnh hưởng', 'Đôi khi thiếu quyết đoán, do dự'],
    career: 'Phù hợp tâm lý, tâm linh, nghệ thuật, âm nhạc, y học, chiêm tinh, nghiên cứu. Quý Thủy tỏa sáng ở những lĩnh vực đòi hỏi trực giác và cảm nhận.',
    relationship: 'Quý Thủy lãng mạn, sâu đậm, đa cảm. Cần đối phương thấu hiểu và tôn trọng không gian nội tâm.',
  },
};
