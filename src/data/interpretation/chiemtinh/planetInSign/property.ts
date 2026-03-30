/**
 * Chiêm Tinh Narrative Data — Property (Planet-in-Sign)
 *
 * ETC-format narratives for Moon (Điền Trạch / Property / Home) in zodiac signs.
 */

import type { ETCNarrative } from '../../../../services/interpretation/types';

export type PlanetSignPropertyMap = Record<string, Record<string, ETCNarrative>>;

export const CHIEMTINH_PROPERTY_NARRATIVES: PlanetSignPropertyMap = {
    Moon: {
        Aries: {
            hook: 'Ngôi nhà của bạn là một sân tập luyện nơi mọi thứ phải diễn ra nhanh gọn và tràn đầy sức sống.',
            effectParagraphs: ['Mặt Trăng ở Bạch Dương không thích một không gian tĩnh lặng đến nhàm chán. Nhà bạn thường là nơi diễn ra các hoạt động năng nổ, thiết kế độc lập và tiện lợi. Bạn coi trọng việc có một không gian riêng tư tuyệt đối để là chính mình mà không cần thỏa hiệp.'],
            nuance: 'Tâm lý nóng vội trong việc mua bán nhà cửa có thể dẫn đến những quyết định sai lầm đáng tiếc.',
            cause: 'Mặt Trăng (Khu tĩnh) gặp ngọn lửa Bạch Dương (Cái tôi) làm cho năng lượng ở khu vực gia đình luôn bốc cháy.',
            tip: 'Luôn hỏi thêm ý kiến chuyên gia bất động sản trước khi chốt một giao dịch mua bán lớn.',
        },
        Taurus: {
            hook: 'Bạn là bậc thầy của vương quốc an yên. Tổ ấm là lâu đài bất khả xâm phạm.',
            effectParagraphs: ['Tại Kim Ngưu (exaltation - thăng hoa), Mặt Trăng sở hữu năng lượng đất lành chim đậu tuyệt đối. Bạn không bao giờ thỏa hiệp với "tạm bợ" — nhà phải đẹp, ghế phải êm, đồ ăn phải ngon. Tài sản điền trạch vững chắc là điều tối quan trọng đối với sự bình yên tâm hồn.'],
            nuance: 'Sự dính mắc quá nặng vào một căn nhà quen thuộc khiến bạn bỏ lỡ cơ hội di cư đến những chân trời tốt đẹp hơn.',
            cause: 'Mặt Trăng (Cảm xúc gốc) bắt rễ sâu vào Kim Ngưu (Vật chất, Đất) tạo dựng một sự an toàn bất diệt.',
            tip: 'Đừng ngại đầu tư dài hạn vào điền trạch. Đất đai là tài sản bảo chứng cho cảm giác an toàn của bạn.',
        },
        Gemini: {
            hook: 'Không gian sống của bạn phải là một cỗ máy xử lý thông tin và đầy ắp những thay đổi.',
            effectParagraphs: ['Mặt Trăng ở Song Tử biến căn nhà thành một trung tâm giao tiếp. Bạn thích những căn hộ thông minh (smart home), thiết kế hiện đại, hoặc luôn có thói quen thay đổi vị trí đồ đạc. Bạn có thể sở hữu nhiều hơn một nơi ở, hoặc thường xuyên chuyển nhà như một sở thích.'],
            nuance: 'Cảm giác bồn chồn khó tạo ra định lực lâu dài để "bắt rễ" sâu vào một bất động sản cố định.',
            cause: 'Mặt Trăng (Bản năng) nằm trong Song Tử (Sự xê dịch, Khí) không ngừng tìm kiếm thông tin mới.',
            tip: 'Khởi đầu bằng một nơi làm việc tại nhà (home office) thực sự chất lượng. Nó sẽ níu giữ tâm trí lãng du của bạn.',
        },
        Cancer: {
            hook: 'Nhà không chỉ là nơi bạn ở. Nhà là nơi cất giấu toàn bộ linh hồn bạn.',
            effectParagraphs: ['Mặt Trăng tại Cự Giải (domicile - vương tọa) cung cấp một linh cảm tuyệt vời về các giới hạn an toàn. Bạn biến mọi nơi bạn đến thành "nhà" bằng sự ấm áp. Bạn coi trọng việc mua nhà sớm, tích lũy đất đai như một sự đảm bảo cho gia tộc chứ không chỉ riêng mình.'],
            nuance: 'Vô thức bám víu vào quá khứ hoặc những căn nhà cũ của cha mẹ có thể cản trở sự phát triển cá nhân.',
            cause: 'Mặt Trăng (Tổ ấm) trị vì Cự Giải (Nước, Khởi xướng) khuếch đại tình mẫu tử và bản năng phòng vệ biên giới tối đa.',
            tip: 'Thanh lý những món đồ cũ không còn ý nghĩa là sự thanh tẩy năng lượng điền trạch tốt nhất.',
        },
        Leo: {
            hook: 'Tổ ấm của bạn là một sân khấu lộng lẫy nơi bạn đóng vai trò là một minh tinh hoàn hảo.',
            effectParagraphs: ['Với Mặt Trăng ở Sư Tử, nhà rỗng rếch là lúc bạn tỏa sáng rực rỡ nhất. Bạn chuộng những căn nhà có phòng khách siêu lớn, thiết kế màu sắc ấm nóng, hoặc ít nhất là nơi bạn tự hào để mời khách khứa tới dự tiệc. Bất động sản đối với bạn là một tuyên ngôn vị thế.'],
            nuance: 'Chạy theo hào nhoáng bên ngoài (mua nhà vượt ngân sách) để giữ thể diện dễ đốt cháy sự yên bình vốn có.',
            cause: 'Mặt Trăng (Riêng tư) trong Sư Tử (Tỏa sáng, Lửa) đòi hỏi sự công nhận ngay cả khi đã đóng cửa sau lưng.',
            tip: 'Mời bạn bè thân thiết về nhà ăn một bữa cơm giản dị thay vì những bữa tiệc xa hoa mệt mỏi.',
        },
        Virgo: {
            hook: 'Một căn nhà không có trật tự là một tâm trí chìm trong sự hoảng loạn.',
            effectParagraphs: ['Mặt Trăng tại Xử Nữ không quan tâm đến sự khoa trương; nó quan tâm đến sự "vận hành". Nhà của bạn thường gọn gàng, tinh tươm, mỗi đồ vật đều có công năng riêng. Việc đầu tư bất động sản sẽ được bạn xem xét tỉ mỉ từng chi tiết hợp đồng, pháp lý, và sơ đồ điện nước.'],
            nuance: 'Bạn luôn tìm ra lỗi của căn nhà, điều này khiến bạn khó bao giờ thực sự thư giãn trong chính tổ ấm của mình.',
            cause: 'Mặt Trăng (Cảm xúc nội tâm) kết hợp Xử Nữ (Sự phân tích, Đất) đặt trạng thái nghỉ ngơi dưới sự giám sát của não bộ.',
            tip: 'Hãy để ra một căn phòng (hoặc một góc) lộn xộn "có chủ đích". Đó là nơi thả rông tâm trí quá mệt mỏi của bạn.',
        },
        Libra: {
            hook: 'Nhà là một viện bảo tàng nghệ thuật của sự bình đẳng và những cuộc đối thoại đẹp đẽ.',
            effectParagraphs: ['Mặt Trăng tại Thiên Bình luôn theo đuổi sự hoàn mỹ trong không gian sống. Bạn bị thu hút bởi các thiết kế tinh tế, ánh sáng tự nhiên, và màu sắc hài hòa. Về bất động sản, bạn thích mua bán nhà đất với sự hợp tác của người khác (hôn phối hoặc đối tác tin cậy) hơn là làm một mình.'],
            nuance: 'Dễ nảy sinh tâm lý so sánh nhà mình với nhà hàng xóm, hoặc ngần ngại tranh chấp pháp lý đến mức chịu thiệt thòi.',
            cause: 'Mặt Trăng (Trái tim) gặp Thiên Bình (Thẩm mỹ, Khí) khao khát duy trì một vẻ bề ngoài êm ả bằng mọi giá.',
            tip: 'Tính quyết đoán là thứ bạn thiếu khi chốt deal mua nhà. Đừng để sợ hãi làm bạn mất đi lựa chọn ưu việt nhất.',
        },
        Scorpio: {
            hook: 'Ngôi nhà của bạn là một hầm trú ẩn: sâu thẳm, kín cổng cao tường, và chỉ dành cho người được chọn.',
            effectParagraphs: ['Mặt Trăng ở Bọ Cạp (fall - suy yếu) mang một nguồn năng lượng phòng thủ mãnh liệt. Nhà bạn không phải nơi đón tiếp ai cũng được. Bạn thích những góc khuất, màu tối, và sự riêng tư cực đoan. Đầu tư điền trạch của bạn thường là những thương vụ bí mật hoặc có xu hướng muốn kiểm soát toàn bộ tài sản.'],
            nuance: 'Sự nghi kỵ và nhu cầu kiểm soát quá đáng khiến các thành viên trong gia đình cảm thấy ngột ngạt và căng thẳng.',
            cause: 'Mặt Trăng (Dung dưỡng) bị đẩy vào môi trường Bọ Cạp (Chiến tranh cảm xúc, Nước sâu) biến sự an toàn thành nỗi ám ảnh.',
            tip: 'Mở cửa sổ, đón ánh sáng vật lý và dọn dẹp các góc "chết" trong nhà để xua tan bầu không khí nghi kỵ u ám.',
        },
        Sagittarius: {
            hook: 'Bạn không muốn sở hữu một căn nhà; bạn muốn tấm hộ chiếu đi khắp thế giới thì đúng hơn.',
            effectParagraphs: ['Mặt Trăng tại Nhân Mã là những người cư ngụ du mục. "Nhà" với bạn là một trạng thái tinh thần, không bắt buộc phải là bức tường cố định. Bạn thích sống ở những không gian mở rộng, gần thiên nhiên hoặc dễ dàng xê dịch. Khả năng đầu tư vào bất động sản nước ngoài hoặc ngoại ô là rất lớn.'],
            nuance: 'Chán ghét trách nhiệm bảo trì, dọn dẹp nhà cửa khiến bạn có xu hướng thờ ơ với sự ổn định lâu dài.',
            cause: 'Mặt Trăng (Khu vực ổn định) ở cạnh Nhân Mã (Khoảnh khắc tương lai, Lửa) luôn chờ đợi một chuyến đi xa.',
            tip: 'Thuê nhà dài hạn trước khi quyết định mua hẳn một cơ ngơi khổng lồ. Sự linh hoạt cứu vãn túi tiền của bạn.',
        },
        Capricorn: {
            hook: 'Một đế chế vững chãi không thể bắt đầu bằng một cái lều xiêu vẹo. Bạn tin vào sự kiên cố vĩnh cửu.',
            effectParagraphs: ['Mặt Trăng ở Ma Kết (detriment) không xem nhà là nơi chứa chấp sự yếu đuối. Gia sản, với bạn, là quyền uy, là sự kế thừa truyền thống gia tộc, và là trách nhiệm. Bạn đầu tư bất động sản với tư duy của một nhà quy hoạch đô thị: chậm, chắc, và có tiềm năng lên giá trong mười năm tới.'],
            nuance: 'Xem tài sản điền trạch như thước đo danh dự gia đình khiến bạn khó buông bỏ ngay cả khi ôm nợ ngập đầu.',
            cause: 'Mặt Trăng (Tâm hồn mỏng manh) nấp dưới lớp giáp thép Ma Kết (Khuôn phép, Đất) ép buộc trái tim phải nhường chỗ cho luật lệ.',
            tip: 'Ngôi nhà trước hết phải phục vụ sự thoải mái của bạn, chứ không phải đóng vai trò là cột mốc danh vọng.',
        },
        Aquarius: {
            hook: 'Không gian sống của bạn giống như căn cứ phòng thí nghiệm của thế kỷ sau.',
            effectParagraphs: ['Mặt Trăng tại Bảo Bình tách bạch cảm xúc ra khỏi không gian vật lý. Bạn thích sống độc lập, yêu thích những căn nhà có thiết kế phi truyền thống, công nghệ cao hoặc ở những khu đô thị mới lạ. Trong điền trạch, bạn dễ dính vào những dự án nhà ở xã hội hoặc cộng đồng chung cư mang tính nhân đạo.'],
            nuance: 'Bạn luôn duy trì một sự "lạnh nhạt" nhất định kể cả với người chung sống, điều này làm phai nhạt đi tính ấm áp của chữ "nhà".',
            cause: 'Mặt Trăng (Gắn kết) trong cõi Bảo Bình (Khách quan, Khí) gỡ bỏ những sợi dây ràng buộc bằng tình cảm.',
            tip: 'Trang trí thêm cây xanh hoặc một con vật nuôi nhỏ. Chúng kết nối bạn lại với nhịp đập của tự nhiên ngay trong phòng.',
        },
        Pisces: {
            hook: 'Nhà là một giấc mơ điêu khắc thành hình, nơi mà thế giới trần tục bị bỏ lại bên ngoài cửa.',
            effectParagraphs: ['Mặt Trăng ở Song Ngư hấp thụ mọi năng lượng xung quanh. Nhà bạn là một chốn tĩnh tâm, nơi pha trộn nghệ thuật, thiền định, và lòng mến khách vô tận. Bạn bị thu hút bởi những bất động sản gần nước (hồ, biển) hoặc những nơi có lịch sử huyền bí.'],
            nuance: 'Sự cả nể hoặc mù mờ pháp lý khiến bạn dễ dính dáng đến những hợp đồng mua bán rắc rối không lối thoát.',
            cause: 'Mặt Trăng (Nhu cầu thầm kín) lơ lửng trong đại dương Song Ngư (Niết bàn, Nước) xóa bỏ mọi nhận thức về giới hạn vật lý.',
            tip: 'Mọi thủ tục giấy tờ mua bán điền trạch buộc phải thuê luật sư thẩm định. Trực giác không đủ thay thế luật pháp.',
        },
    },
};
