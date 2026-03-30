/**
 * Life Domain Advice — Element-based practical guidance
 * Maps favorable elements to actionable life advice across all life domains.
 */

import type { NguHanh } from '../../../utils/baziEngine';

export interface LifeDomainAdvice {
  colors: string[];
  directions: string[];
  numbers: number[];
  careers: string[];
  healthFocus: string;
  healthOrgans: string;
  seasons: string;
  relationshipAdvice: string;
  dailyHabits: string;
  dietaryAdvice: string;
  wealthStrategy: string;
  seasonalLiving: string;
}

export const ELEMENT_LIFE_ADVICE: Record<NguHanh, LifeDomainAdvice> = {
  'Kim': {
    colors: ['Trắng', 'Bạc', 'Vàng kim loại', 'Xám nhạt'],
    directions: ['Tây', 'Tây Bắc'],
    numbers: [4, 9],
    careers: ['Tài chính, ngân hàng', 'Cơ khí, luyện kim', 'Trang sức, thời trang', 'Luật sư, thẩm phán', 'Công nghệ, IT', 'Phẫu thuật, nha khoa'],
    healthFocus: 'Phổi và hệ hô hấp cần được chú ý bảo vệ. Nên tập thở sâu (pranayama, thiền thở), tránh khói bụi và không khí ô nhiễm. Mùa thu là thời điểm phổi dễ tổn thương nhất — giữ ấm vùng cổ ngực.',
    healthOrgans: 'Phổi, đại tràng, da, xương, mũi, hệ hô hấp',
    seasons: 'Thu (tháng 7-9 âm lịch)',
    relationshipAdvice: 'Người Kim cần bạn đời kiên nhẫn, biết lắng nghe vì tính cách quyết đoán đôi khi trở thành cứng nhắc. Kết hợp với người Thổ (nền tảng vững) hoặc Thủy (mềm mại cân bằng) sẽ hạnh phúc. Tránh va chạm với người Hỏa mạnh.',
    dailyHabits: 'Thức dậy sớm lúc 5-7h (giờ Kim vượng). Tập thở sâu 10 phút mỗi sáng. Mặc trang phục gọn gàng, lịch sự — Kim cần sự ngăn nắp. Nghe nhạc nhẹ nhàng buổi tối. Ngủ trước 23h để bảo vệ phổi.',
    dietaryAdvice: 'Ăn nhiều thực phẩm màu trắng: củ sen, hạt sen, lê, bạch quả, đậu phụ, cháo gạo trắng. Tránh đồ cay nóng quá mức vì Hỏa khắc Kim. Uống trà cúc hoa hoặc bạc hà thanh nhiệt phổi. Bổ sung vitamin C bảo vệ da.',
    wealthStrategy: 'Kim chủ về tích lũy và bảo toàn. Nên đầu tư vào vàng, kim loại quý, trái phiếu, chứng chỉ quỹ ổn định. Tránh đầu cơ nóng vội. Nghề tài chính, luật sư, bất động sản sang trọng phù hợp nhất. Tiết kiệm đều đặn theo tháng.',
    seasonalLiving: 'Mùa thu (tháng 7-9 ÂL): Kim vượng nhất — thời điểm vàng cho quyết định lớn, ký kết. Mùa hạ: cẩn thận sức khỏe, Hỏa khắc Kim. Mùa đông: Kim sinh Thủy, năng lượng suy, nên nghỉ ngơi tích lũy.',
  },
  'Mộc': {
    colors: ['Xanh lá', 'Xanh ngọc', 'Nâu gỗ', 'Lục nhạt'],
    directions: ['Đông', 'Đông Nam'],
    numbers: [3, 8],
    careers: ['Giáo dục, đào tạo', 'Nông lâm nghiệp', 'Thiết kế, kiến trúc', 'Xuất bản, truyền thông', 'Thảo dược, y học cổ truyền', 'Thời trang, dệt may'],
    healthFocus: 'Gan và hệ tiêu hóa cần được chăm sóc đặc biệt. Tránh rượu bia (hại gan trực tiếp). Tập yoga hoặc thái cực quyền để duy trì sự linh hoạt của gân cốt. Mùa xuân là thời điểm gan hoạt động mạnh nhất — cần giải độc.',
    healthOrgans: 'Gan, mật, gân cốt, mắt, hệ thần kinh',
    seasons: 'Xuân (tháng 1-3 âm lịch)',
    relationshipAdvice: 'Người Mộc nhân hậu, yêu thương nhưng đôi khi quá mềm mại. Cần bạn đời có tính cách quyết đoán (Kim vừa phải hoặc Hỏa) để cân bằng. Kết hợp với Thủy (được sinh) sẽ phát triển mạnh. Tránh bạn đời quá độc đoán.',
    dailyHabits: 'Thức dậy sớm lúc 5-7h, tận dụng năng lượng buổi sáng. Đi bộ trong công viên hoặc thiên nhiên 20 phút mỗi ngày — Mộc cần kết nối với cây cỏ. Đọc sách trước khi ngủ. Trồng cây trong nhà và văn phòng.',
    dietaryAdvice: 'Ăn nhiều rau xanh lá (cải bó xôi, rau muống, bông cải xanh), trái cây có vị chua nhẹ (cam, chanh, bưởi). Tránh rượu và đồ chiên rán nhiều dầu mỡ. Uống trà xanh mỗi ngày. Bổ sung thực phẩm giàu vitamin A, E cho mắt.',
    wealthStrategy: 'Mộc chủ về sinh trưởng — đầu tư vào giáo dục, đào tạo, startup tăng trưởng. Ngành xanh (nông nghiệp hữu cơ, năng lượng tái tạo) rất phù hợp. Tránh kinh doanh phá hoại (khai thác, phá rừng). Thu nhập tốt từ sáng tạo nội dung, xuất bản.',
    seasonalLiving: 'Mùa xuân (tháng 1-3 ÂL): Mộc vượng nhất — khởi đầu mọi dự án mới. Mùa thu: cẩn thận Kim khắc Mộc, tránh phẫu thuật nếu không cần thiết. Mùa hạ: Mộc sinh Hỏa, năng lượng tiêu hao nhanh, cần bổ sung.',
  },
  'Thủy': {
    colors: ['Đen', 'Xanh dương đậm', 'Tím than', 'Xám đậm'],
    directions: ['Bắc'],
    numbers: [1, 6],
    careers: ['Thương mại, xuất nhập khẩu', 'Du lịch, vận tải', 'Ngành nước, đồ uống', 'Truyền thông, báo chí', 'Bảo hiểm, tài chính', 'Nghiên cứu, trinh thám'],
    healthFocus: 'Thận và hệ tiết niệu cần được bảo vệ hàng đầu. Uống đủ 2-2.5L nước mỗi ngày. Tuyệt đối tránh thức khuya sau 23h vì giờ Tý là giờ thận nghỉ ngơi. Bơi lội là bộ môn tốt nhất cho người Thủy.',
    healthOrgans: 'Thận, bàng quang, tai, xương, hệ sinh dục',
    seasons: 'Đông (tháng 10-12 âm lịch)',
    relationshipAdvice: 'Người Thủy thông minh, linh hoạt nhưng đôi khi quá co biến, khó nắm bắt. Cần bạn đời ổn định (Thổ vừa phải) hoặc hỗ trợ (Kim sinh Thủy). Kết hợp với Mộc tốt vì Thủy sinh Mộc — cho đi nhưng được đáp lại bằng sự phát triển.',
    dailyHabits: 'Ngủ đủ giấc và giấc ngủ chất lượng là quan trọng nhất. Uống nước ấm ngay khi thức dậy. Thiền định 10 phút mỗi tối. Tránh caffeine sau 14h. Bơi lội hoặc tắm nước ấm giúp cân bằng năng lượng Thủy.',
    dietaryAdvice: 'Ăn nhiều thực phẩm màu đen: đậu đen, mè đen, nấm hương, rong biển, cá biển. Uống nhiều nước, súp, và canh. Tránh đồ quá mặn (quá nhiều muối hại thận). Bổ sung omega-3 cho não và thận.',
    wealthStrategy: 'Thủy chủ về lưu thông — kinh doanh xuất nhập khẩu, thương mại điện tử, logistics. Thu nhập từ nhiều nguồn (đa dạng hóa). Tránh để tiền "đông cứng" — nên đầu tư linh hoạt, xoay vòng vốn nhanh. Ngành du lịch, F&B, truyền thông phù hợp.',
    seasonalLiving: 'Mùa đông (tháng 10-12 ÂL): Thủy vượng — nghiên cứu, lập kế hoạch, học hành. Mùa hạ: Hỏa khắc Thủy, cẩn thận sức hỏe tim mạch. Mùa xuân: năng lượng hao tán (sinh Mộc), cần bổ sung.',
  },
  'Hỏa': {
    colors: ['Đỏ', 'Cam', 'Hồng', 'Tím'],
    directions: ['Nam'],
    numbers: [2, 7],
    careers: ['Giải trí, biểu diễn', 'Năng lượng, điện lực', 'Ẩm thực, nhà hàng', 'Marketing, quảng cáo', 'Mỹ phẩm, làm đẹp', 'Quân đội, cảnh sát'],
    healthFocus: 'Tim mạch và hệ tuần hoàn là trọng tâm. Tập cardio đều đặn (chạy bộ, đạp xe) nhưng không quá sức. Kiểm soát huyết áp và cholesterol. Mùa hè Hỏa vượng — tránh phơi nắng quá lâu và kiểm soát nóng giận.',
    healthOrgans: 'Tim, tiểu tràng, mắt, lưỡi, hệ tuần hoàn',
    seasons: 'Hạ (tháng 4-6 âm lịch)',
    relationshipAdvice: 'Người Hỏa nhiệt tình, đam mê nhưng dễ nóng nảy. Cần bạn đời bình tĩnh (Thủy vừa phải hoặc Thổ) để cân bằng. Kết hợp Mộc-Hỏa rất tốt (được sinh). Tránh hai người Hỏa mạnh cùng nhau — dễ "cháy" mối quan hệ.',
    dailyHabits: 'Tập thể dục buổi sáng nhưng tránh vận động quá mạnh buổi tối. Đi ngủ sớm, tránh kích thích trước giờ ngủ. Viết nhật ký mỗi tối để giải tỏa cảm xúc. Giữ môi trường sống thoáng mát, đủ ánh sáng tự nhiên.',
    dietaryAdvice: 'Ăn nhiều thực phẩm đỏ nhẹ nhàng: cà chua, dưa hấu, đậu đỏ, gấc, lựu. Tránh đồ quá cay và đồ ăn quá nóng — Hỏa vượng không cần thêm Hỏa. Uống trà tim sen (thanh tâm). Giảm thịt đỏ, tăng rau củ.',
    wealthStrategy: 'Hỏa chủ về danh tiếng — xây dựng thương hiệu cá nhân, content creator, influencer. Kinh doanh liên quan đến "ánh sáng": giải trí, sự kiện, marketing digital. Thu nhập bùng nổ nhưng cũng dễ "tắt" nhanh — cần tích lũy khi đang thịnh.',
    seasonalLiving: 'Mùa hạ (tháng 4-6 ÂL): Hỏa vượng — đỉnh cao sự nghiệp, quyết đoán hành động. Mùa đông: Thủy khắc Hỏa, cẩn thận sức khỏe, giảm cường độ. Mùa thu: năng lượng giảm dần, tích lũy.',
  },
  'Thổ': {
    colors: ['Vàng đất', 'Nâu', 'Be', 'Cam đất'],
    directions: ['Trung tâm', 'Đông Bắc', 'Tây Nam'],
    numbers: [5, 10],
    careers: ['Bất động sản, xây dựng', 'Nông nghiệp, chăn nuôi', 'Khai khoáng, địa chất', 'Bảo hiểm, ngân hàng', 'Quản lý kho bãi', 'Gốm sứ, vật liệu xây dựng'],
    healthFocus: 'Dạ dày và hệ tiêu hóa là trọng tâm hàng đầu. Ăn đúng giờ, nhai kỹ, không ăn quá no hoặc quá đói. Tránh đồ lạnh/sống khi dạ dày yếu. Massage vùng bụng nhẹ nhàng theo chiều kim đồng hồ giúp tiêu hóa.',
    healthOrgans: 'Tỳ, vị (dạ dày), cơ bắp, miệng, hệ miễn dịch',
    seasons: 'Cuối mỗi mùa (tháng Thổ vượng — tháng 3, 6, 9, 12 ÂL)',
    relationshipAdvice: 'Người Thổ trung thành, đáng tin cậy nhưng đôi khi quá bảo thủ. Cần bạn đời năng động (Mộc hoặc Hỏa) để kích thích. Kết hợp Hỏa-Thổ rất tốt (được sinh). Tránh người Thủy quá mạnh — Thổ khắc Thủy nhưng mệt mỏi.',
    dailyHabits: 'Ăn sáng đúng giờ (7-9h là giờ Tỳ Vị hoạt động mạnh nhất). Đi bộ sau bữa ăn 15 phút. Dọn dẹp, sắp xếp nhà cửa mỗi tuần — Thổ cần sự gọn gàng. Làm vườn hoặc tiếp xúc đất là hoạt động tuyệt vời.',
    dietaryAdvice: 'Ăn nhiều thực phẩm vàng: khoai lang, bí đỏ, ngô, nghệ, gừng, mật ong. Tránh đồ sống lạnh (sashimi, kem, nước đá). Ăn cơm nóng, uống nước ấm. Bổ sung probiotic cho hệ tiêu hóa. Nhai kỹ, ăn chậm.',
    wealthStrategy: 'Thổ chủ về tích lũy bền vững — bất động sản là kênh đầu tư lý tưởng nhất. Kinh doanh liên quan đến "đất": xây dựng, nông nghiệp, kho bãi, vật liệu. Thu nhập chậm nhưng chắc chắn. Tránh đầu cơ nhanh, ưu tiên giá trị dài hạn.',
    seasonalLiving: 'Cuối mỗi mùa (tháng chuyển tiết): Thổ vượng — thời điểm tốt cho giao dịch bất động sản. Mùa xuân: Mộc khắc Thổ, cẩn thận vấn đề tiêu hóa. Mùa hạ: được Hỏa sinh, năng lượng dồi dào nhất.',
  },
};
