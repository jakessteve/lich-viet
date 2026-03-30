/**
 * Nạp Âm (Sound Element) Poetic Interpretations
 * 30 unique Nạp Âm with imagery and life meaning.
 */

export interface NapAmMeaning {
  name: string;
  element: string;
  image: string;
  meaning: string;
}

export const NAP_AM_MEANINGS: Record<string, NapAmMeaning> = {
  'Hải Trung Kim': { name: 'Hải Trung Kim', element: 'Kim', image: '🌊💰', meaning: 'Vàng chìm dưới đáy biển — tài năng tiềm ẩn, cần thời gian để phát lộ. Nửa đầu đời gian nan, nửa sau được hưởng phúc lộc bền vững.' },
  'Lô Trung Hỏa': { name: 'Lô Trung Hỏa', element: 'Hỏa', image: '🔥🏠', meaning: 'Lửa trong lò — sức mạnh được kiểm soát, ấm áp bảo vệ gia đình. Cuộc sống ổn định khi có nền tảng vững chắc.' },
  'Đại Lâm Mộc': { name: 'Đại Lâm Mộc', element: 'Mộc', image: '🌲🌲', meaning: 'Cây trong rừng lớn — sức sống mãnh liệt, phát triển mạnh trong cộng đồng. Không nên đơn độc, cần tập thể để phát huy.' },
  'Lộ Bàng Thổ': { name: 'Lộ Bàng Thổ', element: 'Thổ', image: '🛤️🌿', meaning: 'Đất ven đường — kết nối mọi người, mở rộng giao lưu. Cuộc đời nhiều di chuyển, thay đổi nhưng giàu trải nghiệm.' },
  'Kiếm Phong Kim': { name: 'Kiếm Phong Kim', element: 'Kim', image: '⚔️✨', meaning: 'Vàng mũi kiếm — sắc bén, quyết đoán, có tài năng xuất chúng. Sự nghiệp rực rỡ nhưng cần tránh quá sắc sảo gây tổn thương.' },
  'Sơn Đầu Hỏa': { name: 'Sơn Đầu Hỏa', element: 'Hỏa', image: '🏔️🔥', meaning: 'Lửa trên đỉnh núi — tham vọng cao, ánh sáng tỏa xa. Có tầm nhìn rộng nhưng cô đơn ở vị trí cao.' },
  'Giản Hạ Thủy': { name: 'Giản Hạ Thủy', element: 'Thủy', image: '🏞️💧', meaning: 'Nước dưới khe núi — trong lành, thanh khiết, âm thầm chảy. Cuộc sống bình dị, thanh đạm nhưng có chiều sâu nội tâm.' },
  'Thành Đầu Thổ': { name: 'Thành Đầu Thổ', element: 'Thổ', image: '🏰🧱', meaning: 'Đất thành lũy — kiên cố, bảo vệ, có vị trí vững chắc. Sự nghiệp ổn định, được nhiều người tin tưởng và nương tựa.' },
  'Bạch Lạp Kim': { name: 'Bạch Lạp Kim', element: 'Kim', image: '🕯️🪙', meaning: 'Vàng trong nến trắng — vẻ ngoài giản dị nhưng bên trong quý giá. Tài năng cần được khám phá và mài giũa.' },
  'Dương Liễu Mộc': { name: 'Dương Liễu Mộc', element: 'Mộc', image: '🌳🍃', meaning: 'Cây dương liễu — uyển chuyển, mềm mại nhưng bền bỉ. Nhẫn nại vượt qua gió bão, thích nghi mọi hoàn cảnh.' },
  'Tuyền Trung Thủy': { name: 'Tuyền Trung Thủy', element: 'Thủy', image: '⛲💎', meaning: 'Nước trong suối — tinh khiết, ngọt ngào, dưỡng nuôi vạn vật. Bản tính hiền lành, hay giúp đỡ, được lòng mọi người.' },
  'Ốc Thượng Thổ': { name: 'Ốc Thượng Thổ', element: 'Thổ', image: '🏠🧱', meaning: 'Đất trên mái nhà — che chở, bảo vệ, ấm áp. Coi trọng gia đình, cuộc sống hướng nội, xây dựng tổ ấm.' },
  'Tích Lịch Hỏa': { name: 'Tích Lịch Hỏa', element: 'Hỏa', image: '⚡🔥', meaning: 'Lửa sấm sét — mạnh mẽ, bùng nổ, có sức ảnh hưởng lớn. Tính cách nóng nảy nhưng tài năng vượt trội, tạo ấn tượng mạnh.' },
  'Tùng Bách Mộc': { name: 'Tùng Bách Mộc', element: 'Mộc', image: '🌲❄️', meaning: 'Cây tùng bách — kiên cường, bất khuất, xanh tốt quanh năm. Bản lĩnh vượt qua mọi thử thách, trường thọ, phúc lộc.' },
  'Trường Lưu Thủy': { name: 'Trường Lưu Thủy', element: 'Thủy', image: '🏞️🌊', meaning: 'Nước chảy dài — kiên nhẫn, bền bỉ, tích lũy qua thời gian. Cuộc đời thuận lợi khi biết theo dòng, không cưỡng cầu.' },
  'Sa Trung Kim': { name: 'Sa Trung Kim', element: 'Kim', image: '🏜️💰', meaning: 'Vàng trong cát — giá trị ẩn giấu, cần kiên nhẫn tìm kiếm. Tài năng được phát hiện muộn nhưng bền lâu.' },
  'Sơn Hạ Hỏa': { name: 'Sơn Hạ Hỏa', element: 'Hỏa', image: '🌄🔥', meaning: 'Lửa dưới chân núi — ấm áp, ổn định, chiếu sáng quanh mình. Cuộc sống an nhàn, không bon chen nhưng đủ đầy.' },
  'Bình Địa Mộc': { name: 'Bình Địa Mộc', element: 'Mộc', image: '🌾🌿', meaning: 'Cây trên đồng bằng — lan rộng, dễ phát triển, gần gũi mọi người. Tính cách hòa đồng, dễ thành công nhờ mối quan hệ.' },
  'Bích Thượng Thổ': { name: 'Bích Thượng Thổ', element: 'Thổ', image: '🧱🎨', meaning: 'Đất trên vách — cần nền móng vững, phụ thuộc vào cấu trúc bên dưới. Cần quý nhân hỗ trợ mới phát huy hết khả năng.' },
  'Kim Bạc Kim': { name: 'Kim Bạc Kim', element: 'Kim', image: '✨🪙', meaning: 'Vàng lá mỏng — tinh xảo, đẹp đẽ nhưng mong manh. Có tài hoa, gu thẩm mỹ cao nhưng cần bảo vệ cẩn thận.' },
  'Phú Đăng Hỏa': { name: 'Phú Đăng Hỏa', element: 'Hỏa', image: '🏮🔥', meaning: 'Lửa đèn lồng — ấm áp, lãng mạn, soi sáng trong đêm. Duyên dáng, thu hút, có tài giao tiếp và kết nối.' },
  'Thiên Hà Thủy': { name: 'Thiên Hà Thủy', element: 'Thủy', image: '🌌💧', meaning: 'Nước sông Ngân — cao quý, thanh khiết, mang tầm vũ trụ. Trí tuệ phi phàm, có tầm nhìn vượt thời đại.' },
  'Đại Trạch Thổ': { name: 'Đại Trạch Thổ', element: 'Thổ', image: '🏗️🏠', meaning: 'Đất nền nhà lớn — vững chãi, rộng lớn, xây dựng nền tảng. Phù hợp lãnh đạo, xây dựng cơ nghiệp bền vững.' },
  'Thoa Xuyến Kim': { name: 'Thoa Xuyến Kim', element: 'Kim', image: '💍✨', meaning: 'Vàng trang sức — đẹp đẽ, tinh tế, có giá trị thẩm mỹ cao. Đời sống phong lưu, thích hưởng thụ cái đẹp.' },
  'Tang Đố Mộc': { name: 'Tang Đố Mộc', element: 'Mộc', image: '🌿🪵', meaning: 'Cây dâu tằm — hữu ích, cống hiến, âm thầm tạo giá trị. Cuộc đời lao động nhưng giàu ý nghĩa, để lại di sản.' },
  'Đại Khê Thủy': { name: 'Đại Khê Thủy', element: 'Thủy', image: '🏞️🌊', meaning: 'Nước khe lớn — mạnh mẽ, cuồn cuộn, khó ngăn cản. Ý chí mạnh, quyết tâm cao, có sức ảnh hưởng lớn.' },
  'Sa Trung Thổ': { name: 'Sa Trung Thổ', element: 'Thổ', image: '🏜️🧱', meaning: 'Đất trong cát — tiềm năng ẩn giấu, cần nước tưới để phì nhiêu. Cần quý nhân và cơ hội phù hợp để tỏa sáng.' },
  'Thiên Thượng Hỏa': { name: 'Thiên Thượng Hỏa', element: 'Hỏa', image: '☀️🌤️', meaning: 'Lửa trên trời — ánh sáng chiếu khắp muôn nơi, tầm ảnh hưởng rộng lớn. Cuộc đời rạng rỡ, có danh tiếng.' },
  'Thạch Lựu Mộc': { name: 'Thạch Lựu Mộc', element: 'Mộc', image: '🍎🌳', meaning: 'Cây thạch lựu — hoa đẹp trái ngọt, kết quả xứng đáng sau vun trồng. Thành quả đến chậm nhưng bền vững.' },
  'Đại Hải Thủy': { name: 'Đại Hải Thủy', element: 'Thủy', image: '🌊🐋', meaning: 'Nước đại dương — bao la, sâu thẳm, chứa đựng vạn vật. Tầm nhìn rộng, trí tuệ sâu, có phong thái bậc đại nhân.' },
};
