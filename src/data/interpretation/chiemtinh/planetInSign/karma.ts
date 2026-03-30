/**
 * Chiêm Tinh Narrative Data — Karma/Grace (Planet-in-Sign)
 *
 * ETC-format narratives for Jupiter (Phúc Đức / Karma / Grace / Luck) in zodiac signs.
 */

import type { ETCNarrative } from '../../../../services/interpretation/types';

export type PlanetSignKarmaMap = Record<string, Record<string, ETCNarrative>>;

export const CHIEMTINH_KARMA_NARRATIVES: PlanetSignKarmaMap = {
    Jupiter: {
        Aries: {
            hook: 'Phúc đức của bạn nằm ở lòng dũng cảm. May mắn đến khi bạn dám làm người đầu tiên nhảy xuống nước.',
            effectParagraphs: ['Jupiter ở Bạch Dương trao cho bạn đặc ân của những khởi đầu. Mỗi khi bạn dám đứng lên bảo vệ người khác, dẫn dắt một phong trào, hay đơn giản là khởi tạo một ý tưởng mới bất chấp rủi ro — vũ trụ sẽ mở đường cho bạn. Lòng tốt của bạn mang tính hành động, trực tiếp và không toan tính.'],
            nuance: 'Sự tự tin thái quá đôi lúc làm bạn bỏ qua những lời khuyên hữu ích, khiến "phúc" biến thành "họa" vì cẩu thả.',
            cause: 'Jupiter (Mở rộng, May mắn) tại Bạch Dương (Lửa, Khởi xướng) kích hoạt phúc khí thông qua sự dấn thân cá nhân.',
            tip: 'Đừng ngại thử sai. Thất bại của bạn luôn chứa đựng những hạt giống may mắn mà người khác không có được.',
        },
        Taurus: {
            hook: 'Phúc khí của bạn hữu hình như đất mẹ: chậm rãi, kiên cường, và trĩu quả.',
            effectParagraphs: ['Tại Kim Ngưu, Jupiter mang đến phước lành qua sự kiên nhẫn. Sự thiện tâm của bạn thể hiện qua việc cung cấp nền tảng vật chất, sự thoải mái và an toàn cho người khác. Đôi khi may mắn đến với bạn dưới dạng những tài sản bất ngờ hay khả năng thưởng thức nghệ thuật sâu sắc.'],
            nuance: 'Bạn dễ sinh thói quen ỷ lại vào phúc lộc vật chất mà lười thay đổi khi thực sự cần thiết.',
            cause: 'Jupiter (Niềm tin) được gieo vào Kim Ngưu (Đất, Kiên định) biến phước lành thành hiện thực no đủ (wealth generation).',
            tip: 'Cho đi những gì có giá trị thiết thực sẽ nhân đôi sự thịnh vượng của bạn thay vì chỉ cho đi lời nói.',
        },
        Gemini: {
            hook: 'Vũ trụ đền đáp bạn bằng thông tin. Lòng tốt của bạn lan tỏa qua sự kết nối tâm trí.',
            effectParagraphs: ['Người sở hữu Jupiter ở Song Tử (đang ở vị trí detriment nhưng rất thú vị) tạo nghiệp lành qua việc giảng dạy, chia sẻ thông tin, và kết nối mọi người. Phúc đức đến với bạn qua những mối quan hệ rộng lớn, những quyển sách, và khả năng thấu hiểu nhiều góc nhìn cùng một lúc.'],
            nuance: 'Nói nhiều hơn làm có thể khiến phúc khí của bạn bị phân tán mỏng, thiếu đi chiều sâu và sự cam kết cuối cùng.',
            cause: 'Jupiter (Triết học, Tổng thể) trong Song Tử (Chi tiết, Tư duy nhanh) bẻ nhỏ phúc phần thành mạng lưới tri thức.',
            tip: 'Trở thành cầu nối thông tin cho những người cần nhau. Bạn sẽ luôn nhận được giải pháp khi giới thiệu cơ hội cho người khác.',
        },
        Cancer: {
            hook: 'Tình thương vô điều kiện là mảnh đất thiêng liêng nơi phúc đức của bạn nảy mầm.',
            effectParagraphs: ['Jupiter tại Cự Giải (exaltation - thăng hoa mạnh mẽ) ban cho bạn trực giác phi thường và sự bảo bọc ấm áp của vũ trụ. Bạn kiếm tạo phúc lộc bằng cách chăm sóc, nấu ăn, hoặc đơn giản là lắng nghe người khác. May mắn của bạn liên quan mật thiết đến tổ ấm, gia đình, hoặc bất động sản.'],
            nuance: 'Sự nhạy cảm đôi khi làm bạn mệt mỏi vì hấp thụ quá nhiều năng lượng tiêu cực từ những người bạn cứu giúp.',
            cause: 'Jupiter (Ân điển) gặp gỡ Cự Giải (Nước, Khởi xướng) tuôn trào lòng trắc ẩn và sự dung dưỡng cảm xúc mạnh nhất hoàng đạo.',
            tip: 'Nhà của bạn là nơi trú ẩn linh thiêng. Thường xuyên dọn dẹp và đón khách thiện lành để kích hoạt vượng khí.',
        },
        Leo: {
            hook: 'Sự vĩ đại của bạn nằm ở lòng bao dung. Phúc phần nở hoa khi bạn dám để thế giới thấy sự rực rỡ của mình.',
            effectParagraphs: ['Tại Sư Tử, Jupiter mở ra phước lành của sự sáng tạo, sự tự tôn, và những trò chơi cuộc đời. Bạn hào phóng với thế giới không chỉ bằng vật chất mà bằng cả niềm vui, nghệ thuật, và năng lượng tích cực. Quý nhân của bạn thường là những người có địa vị hoặc tầm ảnh hưởng lớn.'],
            nuance: 'Tự phụ có lằn ranh mỏng manh với sự kiêu hãnh. Bỏ qua những người "thấp bé" hơn sẽ chặn đứng dòng may mắn.',
            cause: 'Jupiter (Vĩ mô) trong Sư Tử (Cái tôi, Lửa) tạo nên một kịch bản cuộc đời hào sảng, không chấp nhặt tiểu tiết.',
            tip: 'Khích lệ người khác tỏa sáng. Càng tán dương thành tựu của kẻ khác, phúc phần của bạn càng lớn.',
        },
        Virgo: {
            hook: 'Với bạn, lòng tốt không phải là phép màu, mà là sự dọn dẹp hàng ngày những chi tiết nhỏ nhất.',
            effectParagraphs: ['Jupiter ở Xử Nữ (detriment) không chờ đợi may mắn trên trời rơi xuống. Phước lành của bạn sinh ra từ tinh thần phục vụ, thói quen làm việc chăm chỉ, và tính kỷ luật. Lòng tốt của bạn biểu hiện qua việc giúp đỡ người khác bằng những hành động thực tế khẩn cấp, sửa chữa những thứ hư hỏng, và bảo vệ sức khỏe.'],
            nuance: 'Chủ nghĩa hoàn hảo có thể giết chết niềm vui của sự cho đi. Quá săm soi sẽ làm vơi đi phúc báu.',
            cause: 'Jupiter (Niềm tin) bị thu hẹp trong Xử Nữ (Phân tích, Đất) bắt buộc phép mầu phải được chứng minh bằng lao động.',
            tip: 'Hãy tình nguyện làm những công việc không ai chú ý. Phần thưởng của bạn thường đến từ sự hoàn thành thầm lặng.',
        },
        Libra: {
            hook: 'Bạn là vị thần công lý mang theo cán cân. Sự hài hòa mang lại phước lành to lớn.',
            effectParagraphs: ['Tại Thiên Bình, Jupiter ban tặng bạn "phúc đức ngoại giao". Lòng tốt của bạn nằm ở việc đem lại sự công bằng, kiến tạo hòa bình, và trân trọng cái đẹp. May mắn của bạn luôn luôn gõ cửa thông qua đối tác kinh doanh, người bạn đời, hoặc trong lúc bạn đứng ra hòa giải một cuộc chiến.'],
            nuance: 'Sợ hãi đối đầu có thể khiến bạn trở thành kẻ ba phải, làm suy giảm uy tín và sự tôn trọng từ những người xung quanh.',
            cause: 'Jupiter (Quan điểm) trong Thiên Bình (Đối tác, Khí) đánh thức chân lý rằng: Chúng ta chỉ trọn vẹn khi có nhau.',
            tip: 'Hợp tác thay vì độc hành. Khi bạn chia sẻ chiến thắng với đối tác, phần của bạn không giảm đi mà được nhân lên hai.',
        },
        Scorpio: {
            hook: 'Nghiệp lực của bạn là sự chuyển hóa: Đi qua cái chết để tái sinh mạnh mẽ hơn.',
            effectParagraphs: ['Jupiter ở Bọ Cạp trao cho bạn đặc quyền chạm vào những mảng khuất của cuộc sống. Phúc đức của bạn nằm ở khả năng chịu đựng nghịch cảnh, chữ tín im lặng, và năng lực chữa lành những vết thương tâm lý sâu thẳm cho người khác. Bạn thường sở hữu một loại "may mắn trong gang tấc" (sống sót kỳ diệu).'],
            nuance: 'Nếu lợi dụng khả năng thao túng tâm lý để tư lợi, nghiệp báo thường ập đến nhanh và dữ dội hơn các dấu hiệu khác.',
            cause: 'Jupiter (Sự sống) đi vào Bọ Cạp (Biến đổi, Nước sâu) tạo nên sức mạnh huyền bí từ sự phá hủy và tái thiết.',
            tip: 'Giữ bí mật cho người khác là cách bạn tích lũy phúc đức mạnh mẽ nhất.',
        },
        Sagittarius: {
            hook: 'Vũ trụ là sân chơi của bạn. Phúc lộc lớn nhất là một tâm trí mãi mãi tò mò và tự do.',
            effectParagraphs: ['Jupiter tại Nhân Mã (domicile) là vị trí mạnh nhất của phúc khí. Đạo đức, sự thật, triết học và du lịch xa là những nơi bạn tìm thấy mỏ vàng may mắn. Lòng tốt của bạn là sự dung nạp sự khác biệt văn hóa, chia sẻ tầm nhìn vĩ mô và không bao giờ đánh mất niềm hy vọng kể cả trong đêm tối vô vọng nhất.'],
            nuance: 'Đôi khi bạn lạc lối trong giáo điều hoặc dễ dãi quá mức với bản thân, bỏ quên thực tại.',
            cause: 'Jupiter (Trí tuệ bậc cao) cai quản Nhân Mã (Tự do, Lửa) khuyếch đại niềm tin tâm linh lên mức tối đa.',
            tip: 'Đừng giữ khư khư niềm tin của mình. Mỗi một chuyến đi hay một cuốn sách mở ra một vùng trời phước lành mới.',
        },
        Capricorn: {
            hook: 'May mắn với bạn chỉ rẽ qua khi nó thấy sự chuẩn bị đáng giá hàng thập kỷ.',
            effectParagraphs: ['Tại Ma Kết, Jupiter ở vị trí fall (suy yếu), có nghĩa là phúc lộc không đến dễ dàng. Bài học nghiệp quả của bạn nằm ở kỷ luật, trách nhiệm, và khả năng lãnh đạo. Lòng tốt của bạn biểu hiện qua việc tạo ra luật lệ bảo vệ tập thể, và hướng dẫn những người trẻ tuổi cách để sinh tồn và phát triển bền vững.'],
            nuance: 'Ham muốn quyền lực hoặc danh vọng quá đáng có thể biến bạn thành người bảo thủ, chặn đứng mọi dòng chảy sáng tạo.',
            cause: 'Jupiter (Hy vọng, Vượt ranh giới) gặp gỡ năng lượng Saturn tại Ma Kết (Trách nhiệm, Đất) tạo ra một niềm tin thực dụng sắt đá.',
            tip: 'Gieo hạt hôm nay và đừng nhìn lại. Quả ngọt của bạn thuộc về độ tuổi trưởng thành và ổn định (nửa sau cuộc đời).',
        },
        Aquarius: {
            hook: 'Phúc phần của bạn đến từ đám đông, khi bạn dám đứng lên bảo vệ những điều dị biệt.',
            effectParagraphs: ['Jupiter tại Bảo Bình gieo phúc lộc lên mạng lưới xã hội và lý tưởng nhân đạo. Bạn có lòng tốt lạ kỳ: bạn có thể không giỏi an ủi một cá nhân vấp ngã, nhưng bạn sẵn sàng hiến dâng đời mình để đòi bình đẳng cho một nhóm người yếu thế. Cơ hội lớn đến từ internet, công nghệ, hoặc cộng đồng.'],
            nuance: 'Bạn dễ trở thành những nhà lý thuyết viển vông, yêu nhân loại trên giấy nhưng lại lạnh lùng với người thân trong nhà.',
            cause: 'Jupiter (Tổng thể) trong Bảo Bình (Tách bạch, Khí) phóng tầm nhìn về tương lai, phá hủy các hệ thống hủ lậu.',
            tip: 'Mở rộng network của bạn. Nhóm bạn lý tưởng sẽ không kéo bạn xuống, mà đẩy bạn bay xa hơn sự mong đợi.',
        },
        Pisces: {
            hook: 'Thiện nguyện không giới hạn là cánh cửa phép thuật biến bạn thành đứa con cưng của vũ trụ.',
            effectParagraphs: ['Jupiter ở Song Ngư (domicile truyền thống) mang đến phúc lộc của biển cả: vô tận, trực giác, và bao la đùm bọc. Ân điển lớn nhất của bạn là lòng từ bi. Khi bạn bao dung cho những lỗi lầm, khi bạn thiền định hay cầu nguyện, đó là lúc bạn nạp lại năng lượng "quý nhân phù trợ" hùng hậu nhất.'],
            nuance: 'Thiếu ranh giới bản ngã có thể biến bạn thành "tấm thảm chùi chân" cho những kẻ lợi dụng lòng tốt.',
            cause: 'Jupiter (Triết học) hòa nhập hoàn hảo vào Song Ngư (Tâm linh, Nước) xóa nhòa mọi biên giới vật chất.',
            tip: 'Học cách rút lui và ở một mình định kỳ để gột rửa tâm trí. Lòng tốt cần được thanh lọc để giữ gìn sự thuần khiết.',
        },
    },
};
