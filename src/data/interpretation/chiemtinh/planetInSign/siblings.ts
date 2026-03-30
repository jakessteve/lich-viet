/**
 * Chiêm Tinh Narrative Data — Siblings / Local Environment (Planet-in-Sign)
 *
 * ETC-format narratives for Mercury (Huynh Đệ / Siblings / Communication) in zodiac signs.
 */

import type { ETCNarrative } from '../../../../services/interpretation/types';

export type PlanetSignSiblingsMap = Record<string, Record<string, ETCNarrative>>;

export const CHIEMTINH_SIBLINGS_NARRATIVES: PlanetSignSiblingsMap = {
    Mercury: {
        Aries: {
            hook: 'Bạn giao tiếp bằng tốc độ viên đạn và coi tranh luận với anh em như một môn thể thao.',
            effectParagraphs: ['Tại cung Bạch Dương, Mercury tạo nên phong cách suy nghĩ và diễn đạt sắc bén, nhanh nhẹn, và đôi khi thẳng thừng quá mức. Với anh chị em ruột hoặc hàng xóm, bạn thường là người khởi biên các "trận chiến võ mồm" không ác ý. Tinh thần của bạn là "nghĩ gì nói nấy" không màng hậu quả.'],
            nuance: 'Sự thiếu nhẫn nại khi người khác suy nghĩ chậm dễ khiến bạn vội vàng ngắt lời và cắt ngang sự gắn kết tự nhiên.',
            cause: 'Mercury (Giao tiếp) đặt vào Bạch Dương (Nóng vội, Khởi xướng) đốt cháy mọi lớp rào cản xã giao để nhảy thẳng vào kết luận.',
            tip: 'Đếm từ 1 đến 3 trước khi bấm "Gửi" tin nhắn chửi lộn với anh em. Hãy cho họ khoảng trống để trình bày xong ý tưởng.',
        },
        Taurus: {
            hook: 'Lời hứa của bạn có giá trị bằng vàng khối, và cách bạn trò chuyện cũng chậm rãi hệt như kim loại đông đặc.',
            effectParagraphs: ['Mercury trong Kim Ngưu biến lời nói thành một công cụ xây dựng vững chắc. Mối quan hệ với anh em và họ hàng gần của bạn dựa trên lòng trung thành và các cống hiến vật chất thiết thực. Bạn không nói những những câu sáo rỗng; bạn xuất hiện khi họ cần tiền bạc, hiện vật hay thời gian.'],
            nuance: 'Sự cứng đầu (stubbornness) trong tư duy làm bế tắc những cuộc đối thoại cần sự linh hoạt mổ xẻ đa chiều.',
            cause: 'Sao Thủy (Gió, Ý tưởng) sa lầy vào Kim Ngưu (Cố thủ, Đất) làm cho dòng chảy thông tin chậm đi nhưng đáng tin cậy.',
            tip: 'Lắng nghe những quan điểm khác biệt mà không tự động phản bác lại. Thế giới không sụp đổ vì bạn đổi ý đâu.',
        },
        Gemini: {
            hook: 'Anh em là mạng lưới thông tin, và tâm trí bạn là một đài phát thanh hoạt động 24/7.',
            effectParagraphs: ['Tại Song Tử (domicile - vương quyền), Mercury sở hữu khả năng hùng biện và sự hiếu kỳ đỉnh cao. Gia đình anh chị em hoặc hàng xóm chính là "sân chơi" đầu đời để bạn tập rượt trí não. Giao tiếp cực kỳ nhanh nhẹn, đa luồng, bạn kết nối với tốc độ ánh sáng qua hàng ngàn mẫu chuyện nhỏ.'],
            nuance: 'Tán gẫu và buôn chuyện quá trớn dễ làm tiết lộ bí mật, làm mất đi sự tôn trọng sâu sắc giữa tình ruột thịt.',
            cause: 'Mercury (Viễn thông) chìm vào Song Tử (Linh hoạt, Đa nhân cách) vỡ òa thành một trận bão dữ kiện không điểm dừng.',
            tip: 'Không phải mọi thông tin bạn nghe được đều cần "chia sẻ lại". Hãy rèn thói quen giữ bí mật tuyệt đối cho anh em ruột.',
        },
        Cancer: {
            hook: 'Bạn không lắng nghe bằng tai, bạn lắng nghe bằng dạ dày và trái tim thổn thức của Cự Giải.',
            effectParagraphs: ['Mercury ở Cự Giải lưu trữ kí ức không theo logic mà bằng cảm xúc hình ảnh. Giao tiếp với anh chị em của bạn ngập tràn sự hoài niệm. Những thông tin bạn tiếp nhận luôn bị bộ lọc tổn thương hoặc bảo bọc bóp méo. Thế nhưng, tiếng nói của bạn có khả năng xoa dịu tuyệt đỉnh.'],
            nuance: 'Lạm dụng cảm xúc, khóc lóc hoặc thu mình lại khi tranh cãi khiến đối phương không biết đường nào để xử lý lý lẽ với bạn.',
            cause: 'São Thủy (Dữ kiện khô khốc) bơi trong Cự Giải (Nước, Chu kỳ Trăng) làm thông điệp trở nên ẩm ướt, mẫn cảm và nặng tình.',
            tip: 'Hãy tin vào các số liệu khoa học và sự kiện y nguyên như nó vốn dĩ, thay vì quy chụp cảm xúc chủ quan lên mặt ai đó.',
        },
        Leo: {
            hook: 'Bạn không đang chuyện trò, bạn đang ban bố một bài diễn văn trước công chúng (ngay cả khi chỉ có mặt ông anh).',
            effectParagraphs: ['Ở Sư Tử, Mercury biến bất kỳ cuộc hội thoại nào rực rỡ, cường điệu và đầy tính kịch thuật. Với anh chị em, tiếng nói của bạn phải là trung tâm vũ trụ, truyền cảm hứng và quyền lực. Bạn sử dụng ngữ điệu rất tốt, có khả năng kể chuyện (story-telling) thiên bẩm lôi cuốn tuyệt đối.'],
            nuance: 'Bạn luôn muốn làm người thầy/ chủ tọa trong khi thứ anh chị em bạn cần lúc đó đơn giản chỉ là một kẻ lắng nghe tĩnh lặng.',
            cause: 'Sao Thủy (Tư duy) soi chiếu trên Sư Tử (Cái tôi, Lửa chói lóa) đòi hỏi mọi ý niệm phải được khuếch đại cho cả thế giới thấu thị.',
            tip: 'Cúp míc, khoanh tay lại, và nhường cho người đối diện phần nói chính. Kẻ im lặng cuối cùng đôi khi lại quyền lực nhất.',
        },
        Virgo: {
            hook: 'Bạn giao tiếp bằng bản phân tích Excel, và tình yêu với anh em được dịch ra thành lời chỉ trích hoàn hảo.',
            effectParagraphs: ['Mercury ngự ở Xử Nữ (domicile & exaltation - vương tọa kép) trao cho bạn trí óc sắc như dao mổ. Trí tuệ hoạt động tốt nhất dưới áp lực phân loại chi tiết. Mối quan hệ họ hàng của bạn mang màu sắc "phục vụ bằng cách bới lông tìm vết". Bạn sửa lỗi ngữ pháp, dọn góc làm việc và vạch ra quy trình giúp họ.',],
            nuance: 'Sự chê bai miên man, nhỏ nhặt và hội chứng "sửa lưng" triệt tiêu hoàn toàn tính hứng khởi yêu thương hồn nhiên của tình thân.',
            cause: 'Sao Thủy (Linh hoạt thần kinh) hóa thành chiếc kính lúp trong Xử Nữ (Đất, Thường nhật) đào bới từng vi mạch lỗi kỹ thuật.',
            tip: 'Lần tới, hãy im lặng khi ông anh/bà chị bạn viết sai chính tả. Sự không hoàn hảo cũng là một nụ cười đáng yêu của nhân sinh học.',
        },
        Libra: {
            hook: 'Lời nói của bạn là hiệp ước hòa bình, và bạn sợ nhất là nghe tiếng vỡ của những chén đĩa trong cơn cãi vã.',
            effectParagraphs: ['Tại Thiên Bình, Mercury khoác lên mình bộ cánh của một nhà ngoại giao xuất chúng. Lời nói với anh chị em ruột, bạn bè luôn được gọt giũa êm ấm, tinh tế. Trí tuệ của bạn sáng bật lên trong việc thỏa hiệp, tìm kiếm sự công bằng và luôn cân nhắc quan điểm vạn vật ở 2 chiều đối nghịch.'],
            nuance: 'Sự dĩ hòa vi quý, chần chừ nhượng bộ biến bạn thành trung dung hèn mọn, không dám đứng về phía sự thật mất lòng.',
            cause: 'Sao Thủy (Tiếng vọng) phản xạ qua Thiên Bình (Khí do dự) triệt tiêu các góc tối cực đoan nhưng đánh mất đi mũi nhọn kết liễu.',
            tip: 'Khẩu chiến trong phạm vi an toàn với anh em ruột thịt vô cùng tốt cho sức khỏe tinh thần. Đừng nín nhịn sự thật độc địa.',
        },
        Scorpio: {
            hook: 'Lời bạn thốt ra mang theo kịch độc chết người, nhưng sự im lặng tĩnh mịch mới là vũ khí phòng thủ tối cao.',
            effectParagraphs: ['Mercury ở cung Bọ Cạp đào sâu xuống vực thẳm của mọi thông tin giả dối. Bạn đọc thấu tâm can, tâm nguyện, và cả tâm ma của anh chị em cận kề. Các tương tác thường có khuynh hướng dò xét, điều tra kín kẽ, chứa nhiều bí mật gia tộc và tuyệt đối từ chối các cuộc trò chuyện hời hợt xã giao.'],
            nuance: 'Tâm lý muốn giấu giếm, kiểm soát bí mật trở thành nỗi ám ảnh (paranoia). Những uẩn khúc không nói ra làm mục nát mối quan hệ ruột thịt.',
            cause: 'Sao Thủy (Đường truyền tín hiệu) rơi vào Bọ Cạp (Chiến trường bóng đêm) sử dụng thông tin như tiền tệ và vũ khí trừng phạt.',
            tip: 'Không phải ông anh/bà chị nào cũng ôm ấp thuyết âm mưu đằng sau lời khen tặng đâu. Hãy cởi bỏ đai an toàn và sống thơ ngây lên nhé.',
        },
        Sagittarius: {
            hook: 'Tâm trí bạn không thể tập trung vào những chuyện họ hàng bé mọn khi vũ trụ vĩ đại đang réo gọi đích danh.',
            effectParagraphs: ['Tại Nhân Mã (detriment - suy yếu), Mercury chới với vì bỏ lỡ các chi tiết để chạy theo bức tranh tổng quát của tôn giáo triết lý. Mối tương quan anh em ruột chứa đầy năng lượng bùng nổ của những chuyến đi xa. Bạn thường vắng mặt trong nhà vì mải mê đi "khai sáng" hệ tư tưởng khổng lồ ngoài biên giới.'],
            nuance: 'Tỏ vẻ cao đạo, chê bai các vấn đề rắc rối hàng xóm láng giềng tẻ nhạt làm bạn xa lánh đời thực và vấp ngã bởi chính cái hố vô tâm chướng mắt.',
            cause: 'Sao Thủy (Kính hiểm vi chi tiết) kết hợp Nhân Mã (Kính viễn vọng) tạo ra góc nhìn mờ ảo trước mắt, phóng to tận tít chân trời xa.',
            tip: 'Sự khai sáng đôi khi nằm trong một buổi chiều ngồi nhặt rau phụ ông bà hoặc uống trà tâm tình cùng chị gái mộc mạc nhất.',
        },
        Capricorn: {
            hook: 'Với mỗi bài học từ anh em, bạn ghi chép lại làm nền tảng bê tông cho quyền lực ngôn từ.',
            effectParagraphs: ['Mercury trong Ma Kết thiết lập giới thông tin bảo thủ, thực dụng và lạnh lùng sắt đá. Lời bạn nói mang sức nặng của các quyết định kinh doanh. Giữa anh chị em, bạn đóng vai trưởng lão: ít nói, ra lệnh rõ ràng, thực kết quả mới chịu hé môi. Cuộc trò chuyện phải tạo ra thành tựu.',],
            nuance: 'Tranh cãi dưới góc nhìn kẻ bề trên kiêu hãnh dễ làm tụt giảm niềm vui kết nối hồn nhiên. Người dạn dày đôi khi khô hạn và nhàm chán.',
            cause: 'Sao Thủy (Thư tín lanh lẹ) chịu đóng băng dưới Ma Kết (Khuôn đúc, Đất) ép ngôn từ chịu giới nghiêm của kỷ luật khắc kỉ.',
            tip: 'Bạn không phải luật sư bào chữa cho danh giá dòng họ, hãy nói linh tinh, bông phèng và bớt nghiêm túc quá đáng một chút thử xem.',
        },
        Aquarius: {
            hook: 'Bản thân bạn ở Trái Đất, nhưng ý tưởng và cách nói chuyện của bạn ở một dải Tinh Vân tiên tiến nào đó.',
            effectParagraphs: ['Tại Bảo Bình (exaltation chéo - mạnh mẽ dị biệt), Mercury được tự do khỏi cái tôi. Bạn tương tác với gia đình, anh em như một "đồng chí của một hội nhóm cải cách vũ trụ". Trí tuệ bạn phá vỡ mọi lề thói; cực kỳ khách quan, am hiểu công nghệ, và phát ngôn táo bạo không đoái hoài cảm xúc thế hệ cũ.'],
            nuance: 'Thái độ phân tích lạnh như một cỗ máy (robotic) làm tổn thương dữ dội những liên kết ruột thịt khao khát hơi ấm tình người phàm tục.',
            cause: 'Sao Thủy (Suy nghĩ) bay vào Bảo Bình (Công nghệ Khí) dỡ bỏ hoàn toàn định kiến cảm thọ, tiếp thu dòng mã ASCII vô cùng thông thái.',
            tip: 'Hãy xuống mặt đất và học tiếng nói của nhân loại. Một vòng ôm vô lý còn tốt hơn vạn phương án giải quyết bằng công thức logic.',
        },
        Pisces: {
            hook: 'Bạn giao tiếp bằng ngôn ngữ của thần thoại, bằng ý niệm của nước mắt và bằng trực giác chiêm bao.',
            effectParagraphs: ['Lời nói tại Song Ngư (fall/detriment kép) mờ nhạt và trôi tuột khỏi các khái niệm phân tích số liệu. Với họ hàng anh em, bạn là người bao dung bằng trực giác, lắng nghe không phán xét, hoặc dùng thơ ca âm nhạc biểu thị tâm thế. Trí tưởng tượng của bạn đạt cấp độ vĩ nhân kì ảo chưa từng có.'],
            nuance: 'Lao dốc vào những diễn đạt lập lờ, dối trá (white-lies) hay mập mờ mơ mộng khiến những người cần giúp đỡ thực tế của bạn nổi điên.',
            cause: 'Trạm thông tin Sao Thủy (Báo số liệu) bị dìm nghỉm xuống Thái Bình Dương (Song Ngư, Nước bao la), trôi dạt vào cõi siêu thực chiêm bao tít tắp.',
            tip: 'Mua một cuốn sổ và dùng bút bi xanh gạch đầu dòng các công việc ngày hôm nay cần phải giải quyết bằng con số rạch ròi. Tỉnh dậy đi bạn.',
        },
    },
};
