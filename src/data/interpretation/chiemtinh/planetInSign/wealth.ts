/**
 * Chiêm Tinh Narrative Data — Wealth (Planet-in-Sign)
 *
 * ETC-format narratives for Venus (Tài Bạch / Wealth) in zodiac signs.
 */

import type { ETCNarrative } from '../../../../services/interpretation/types';

export type PlanetSignWealthMap = Record<string, Record<string, ETCNarrative>>;

export const CHIEMTINH_WEALTH_NARRATIVES: PlanetSignWealthMap = {
    Venus: {
        Aries: {
            hook: 'Tiền bạc với bạn là một công cụ để chiến thắng, không phải để tích trữ.',
            effectParagraphs: ['Venus tại Bạch Dương mang đến phong cách tài chính bốc đồng và quyết đoán. Bạn thích kiếm tiền nhanh và tiêu tiền cũng nhanh không kém. Bạn không ngại rủi ro tài chính, xem mỗi khoản đầu tư như một "trận chiến" cần chinh phục.'],
            nuance: 'Sự can đảm giúp bạn nắm bắt cơ hội mà người khác bỏ lỡ, nhưng thiếu kiên nhẫn có thể làm bốc hơi thành quả.',
            cause: 'Venus (Tiền bạc) nằm tại Bạch Dương (Hành động, Lửa) tạo ra xung lực mạnh nhưng thiếu sự ổn định (detriment).',
            tip: 'Cài đặt tự động trích 10% thu nhập vào tài khoản tiết kiệm khóa kín trước khi bạn kịp tiêu nó.',
        },
        Taurus: {
            hook: 'Bạn là thỏi nam châm thu hút sự thịnh vượng thông qua sự kiên định và chất lượng.',
            effectParagraphs: ['Venus tại Kim Ngưu là vị trí đắc địa nhất cho tài lộc. Bạn có bản năng xuất sắc trong việc đánh giá giá trị vật chất. Bạn không vội vàng làm giàu nhanh, mà thích xây dựng tài sản một cách chậm rãi, an toàn và cực kỳ vững chắc.'],
            nuance: 'Tính sở hữu quá cao có thể khiến bạn bỏ lỡ các cơ hội đầu tư sinh lời vì sợ rủi ro.',
            cause: 'Venus (Tiền bạc) nằm tại Kim Ngưu (Đất, domicile), tạo ra sự hòa hợp hoàn hảo cho sự thịnh vượng vật chất.',
            tip: 'Đa dạng hóa danh mục đầu tư. Đừng chỉ giữ tiền mặt hoặc vàng, hãy thử tìm hiểu các tài sản có tính thanh khoản cao hơn.',
        },
        Gemini: {
            hook: 'Dòng tiền của bạn lưu thông nhanh như chính cách bạn tư duy.',
            effectParagraphs: ['Tại Song Tử, Venus mang đến cho bạn đa dạng các nguồn thu nhập. Bạn giỏi kiếm tiền qua giao tiếp, bán hàng, viết lách hoặc môi giới. Tiền bạc với bạn là sự trao đổi thông tin và trải nghiệm hơn là sự tích lũy vật chất.'],
            nuance: 'Dễ bị phân tán, bạn có thể tham gia quá nhiều dự án cùng lúc dẫn đến không cái nào sinh lời tối đa.',
            cause: 'Venus tại Song Tử (Khí, Linh hoạt) khiến tiền bạc mang tính chất biến động và đa dạng.',
            tip: 'Tập trung tối đa vào 2 nguồn thu nhập chính thay vì chạy theo 10 ý tưởng khác nhau cùng lúc.',
        },
        Cancer: {
            hook: 'Tài chính vững vàng là bức tường bảo vệ gia đình và tổ ấm của bạn.',
            effectParagraphs: ['Venus tại Cự Giải gắn liền tiền bạc với cảm giác an toàn. Bạn có xu hướng bảo thủ trong chi tiêu, giỏi tiết kiệm và thường tích lũy tài sản dưới dạng bất động sản hoặc những thứ có giá trị nền tảng cho gia đình.'],
            nuance: 'Lo lắng quá mức về an toàn tài chính có thể khiến bạn keo kiệt trải nghiệm cuộc sống ở hiện tại.',
            cause: 'Venus tại Cự Giải (Nước, Khởi xướng) liên kết giá trị vật chất với sự nuôi dưỡng và an toàn cảm xúc.',
            tip: 'Hãy cho phép bản thân một "quỹ tận hưởng" hàng tháng mà bạn bắt buộc phải tiêu hết cho bản thân.',
        },
        Leo: {
            hook: 'Tiền bạc tồn tại là để phục vụ cho sự huy hoàng và lối sống hoàng gia của bạn.',
            effectParagraphs: ['Venus tại Sư Tử không thích sự tầm thường. Bạn kiếm tiền giỏi và tiêu tiền vô cùng hào phóng, đặc biệt là cho đồ hiệu, giải trí và quà tặng cho người thân. Bạn xem tài chính là thước đo cho sự kiêu hãnh và giá trị bản thân.'],
            nuance: 'Sự vung tay quá trán để giữ thể diện có thể đưa bạn vào những khoản nợ không đáng có.',
            cause: 'Venus tại Sư Tử (Lửa, Kiên định) khiến giá trị vật chất bị chi phối bởi cái tôi và sự kịch tính.',
            tip: 'Chi tiêu cho trải nghiệm thực chất thay vì những thứ chỉ để "trưng bày".',
        },
        Virgo: {
            hook: 'Bạn kiểm soát dòng tiền bằng sự chính xác của một kế toán viên bẩm sinh.',
            effectParagraphs: ['Venus ở Xử Nữ mang lại phong cách quản lý tài chính cực kỳ chặt chẽ, chi tiết, và thực tế. Bạn luôn có bảng tính budgeting, không bao giờ tiêu xài bốc đồng. Của cải đến từ sự phục vụ, lao động chăm chỉ và kỹ năng chuyên môn cao.'],
            nuance: 'Bạn có thể trở nên quá "chi li" và lo lắng hão huyền về sự nghèo đói dù ngân sách vẫn đang dương.',
            cause: 'Venus tại Xử Nữ (Đất, Linh hoạt) ở vị trí suy yếu (fall), khiến tình yêu và tiền bạc bị phân tích quá mức.',
            tip: 'Ngừng xem xét từng đồng bạc cắc. Hãy nhìn vào bức tranh tài chính tổng thể hàng năm.',
        },
        Libra: {
            hook: 'Bạn kiếm tiền thông qua các mối quan hệ đối tác, và dùng tiền để mua cái đẹp.',
            effectParagraphs: ['Venus tại Thiên Bình rất thuận lợi (domicile). Bạn giỏi đàm phán, dễ kiếm tiền từ nghệ thuật, làm đẹp, tư vấn hoặc luật pháp. Bạn chi tiêu nhiều cho quần áo, thiết kế, và những trải nghiệm thanh lịch.'],
            nuance: 'Bạn có thể cân nhắc quá lâu trước một quyết định tài chính dẫn đến lỡ mất thời cơ vàng.',
            cause: 'Venus trị vì Thiên Bình (Khí, Khởi xướng), hòa hợp mạnh mẽ với thẩm mỹ và sự cân bằng đối tác.',
            tip: 'Hợp tác là chìa khóa tài lộc của bạn. Đừng cố gắng khởi nghiệp hoặc đầu tư một mình.',
        },
        Scorpio: {
            hook: 'Tài chính của bạn là vũ khí bí mật — càng giấu kín càng sinh sôi mãnh liệt.',
            effectParagraphs: ['Venus tại Bọ Cạp quản lý "tiền của người khác": đầu tư, thừa kế, quỹ chung, thuế hoặc chứng khoán. Bạn có trực giác nhạy bén vô song trong tài chính, có thể "đánh hơi" thấy cơ hội trong khủng hoảng mà người khác e sợ.'],
            nuance: 'Bị đặt ở vị trí thất lợi (detriment), bạn có xu hướng cực đoan: hoặc nắm quyền kiểm soát toàn bộ tiền bạc, hoặc phá hủy tất cả.',
            cause: 'Venus tại Bọ Cạp (Nước, Kiên định) khiến giá trị bị nhấn chìm vào cường độ cảm xúc và sự ám ảnh.',
            tip: 'Tuyệt đối minh bạch tài chính với người bạn đời hoặc đối tác kinh doanh để tránh khủng hoảng niềm tin.',
        },
        Sagittarius: {
            hook: 'Tiền giống như một tấm vé thông hành: cứ đi rồi tiền sẽ tới.',
            effectParagraphs: ['Venus tại Nhân Mã mang lại sự lạc quan khổng lồ về tiền bạc. Bạn không sợ thiếu tiền, vì bạn tin vũ trụ sẽ cung cấp. Bạn sẵn sàng chi những khoản lớn cho du lịch, giáo dục cao cấp, và trải nghiệm mở rộng tầm nhìn.'],
            nuance: 'Sự lạc quan thái quá dễ dẫn đến tình trạng vung tay bừa bãi và coi thường việc lập kế hoạch dài hạn.',
            cause: 'Venus tại Nhân Mã (Lửa, Linh hoạt) gặp năng lượng của Jupiter (mở rộng), khiến việc chi tiêu trở nên tự do, thiếu ranh giới.',
            tip: 'Hãy thuê một cố vấn tài chính hoặc sử dụng app quản lý tự động. Lý trí của bạn không dành cho các bảng tính.',
        },
        Capricorn: {
            hook: 'Bạn coi sự giàu có là một ngọn núi cần phải leo — từng bước vững chắc một.',
            effectParagraphs: ['Venus tại Ma Kết mang đến sự nghiêm túc tuyệt đối về cấu trúc vật chất. Bạn không bao giờ tin vào "tài lộc từ trên trời rơi xuống". Tham vọng vươn lên tầng lớp tinh hoa giúp bạn không mệt mỏi tiết kiệm và đầu tư dài hạn (như bất động sản).'],
            nuance: 'Bạn dễ đánh đồng "giá trị tài sản" với "giá trị bản thân", dẫn đến cảm giác không bao giờ là đủ.',
            cause: 'Venus tại Ma Kết (Đất, Khởi xướng) chịu sự quản lý của Saturn (kỷ luật, thời gian), khiến tiền bạc trở thành thước đo của thành tựu.',
            tip: 'Hãy nhớ rằng tiền là công cụ để sống, chứ không phải huy chương để đeo. Hãy thưởng cho mình sau mỗi KPI đạt được.',
        },
        Aquarius: {
            hook: 'Cách bạn kiếm và tiêu tiền luôn đi trước số đông một bước (hoặc một thập kỷ).',
            effectParagraphs: ['Venus tại Bảo Bình không có hứng thú với những mô hình làm giàu kiểu cũ. Bạn kiếm tiền từ công nghệ, startup, crypto, hoặc mạng lưới cộng đồng. Bạn thích độc lập tài chính và sẵn sàng quyên góp cho những nền tảng nhân đạo.'],
            nuance: 'Thích mạo hiểm vào các trào lưu tài chính phi truyền thống, đôi khi bạn gặp rủi ro khó lường.',
            cause: 'Venus tại Bảo Bình (Khí, Kiên định) kết nối giá trị vật chất với sự đổi mới, công nghệ và tính độc bản.',
            tip: 'Luôn giữ một khoản "tiền truyền thống" an toàn làm bệ phóng trước khi ném vốn vào các dự án "tương lai".',
        },
        Pisces: {
            hook: 'Tiền bạc đến với bạn như thủy triều — trôi nổi theo bản năng và niềm tin sâu thẳm.',
            effectParagraphs: ['Venus tại Song Ngư (vị trí thăng hoa - exaltation) mang lại sự may mắn kỳ lạ về tài chính khi bạn đi theo dòng chảy trực giác vô tư. Bạn kiếm tiền tốt nhất thông qua nghệ thuật, chữa lành, hoặc công việc tâm linh. Tính hào phóng của bạn là không giới hạn.'],
            nuance: 'Không biết cách định giá bản thân, bạn dễ bị bóc lột sức lao động hoặc bị lừa gạt tài chính vì sự thương người.',
            cause: 'Venus tại Song Ngư (Nước, Linh hoạt) hòa tan mọi cấu trúc vật chất vào thế giới của mộng tưởng và lòng trắc ẩn.',
            tip: 'Hãy tìm một kế toán hoặc một đối tác mang hệ Đất (Kim Ngưu, Xử Nữ, Ma Kết) để "giữ cửa" tài khoản cho bạn.',
        },
    },
};
