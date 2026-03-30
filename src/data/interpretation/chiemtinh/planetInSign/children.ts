/**
 * Chiêm Tinh Narrative Data — Children / Creativity (Planet-in-Sign)
 *
 * ETC-format narratives for Sun (Tử Tức / Children / Creative Expression) in zodiac signs.
 */

import type { ETCNarrative } from '../../../../services/interpretation/types';

export type PlanetSignChildrenMap = Record<string, Record<string, ETCNarrative>>;

export const CHIEMTINH_CHILDREN_NARRATIVES: PlanetSignChildrenMap = {
    Sun: {
        Aries: {
            hook: 'Bạn nhìn nhận con cái và các tác phẩm sáng tạo của mình như những phiên bản chiến binh thu nhỏ.',
            effectParagraphs: ['Mặt Trời tại Bạch Dương mang đến năng lượng bộc phát mãnh liệt trong chuyện con cái và sự nhiệt huyết mạo hiểm. Bạn khuyến khích sự độc lập, táo bạo ở những "đứa trẻ" của mình (dù là sinh học hay dự án). Những sản phẩm sáng tạo của bạn thường mang tính đột phá, đi đầu, và được thực hiện với tốc độ chớp nhoáng.'],
            nuance: 'Bạn thiếu kiên nhẫn khi phải lặp đi lặp lại việc dạy bảo hoặc chăm sóc những bước phát triển nhàm chán.',
            cause: 'Mặt Trời (Sự tỏa sáng) ngự ở Bạch Dương (exaltation), cung cấp cho đứa trẻ (hay tác phẩm) toàn bộ nguồn nhiệt tinh khiết nhưng hay đốt cháy giai đoạn.',
            tip: 'Đứa trẻ nào cũng cần được bạn dắt tay qua từng bậc thang nhỏ thay vì đòi hỏi chúng phải nhảy vọt như một vận động viên.',
        },
        Taurus: {
            hook: 'Con cái hay nghệ thuật của bạn sinh ra để trở thành những viên gạch vĩnh cửu.',
            effectParagraphs: ['Ở vị trí Kim Ngưu, Mặt Trời chiếu ánh sáng ổn định và nuôi dưỡng. Bạn là một phụ huynh (hoặc người sáng tạo) cực kỳ kiên nhẫn, thích vun đắp những giá trị vật chất và sự an toàn chậm rãi cho thế hệ sau. Mỗi dự án nghệ thuật của bạn đều đòi hỏi chất lượng thủ công, vẻ đẹp hiện thực và tính ứng dụng cao.'],
            nuance: 'Sự bao bọc quá mức bằng vật chất và thói quen sở hữu sinh ra những "đứa trẻ" thụ động, hoặc những tác phẩm thiếu sức sống.',
            cause: 'Mặt Trời (Bản thế) kết dính trong cấu trúc Kim Ngưu (Sự hữu hình) từ chối rủi ro để bảo toàn tính toàn vẹn.',
            tip: 'Để cho "đứa trẻ" của bạn phạm sai lầm. Đất đá quá cứng không thể nở hoa nếu thiếu những cơn bão thời tiết.',
        },
        Gemini: {
            hook: 'Người đứng tên là bạn, nhưng những gì bạn tạo ra lại mang một ngàn tiếng nói khác nhau.',
            effectParagraphs: ['Mặt Trời tại Song Tử biến sự sáng tạo và quan hệ con cái thành một cuộc đối thoại không hồi kết. Bạn là một phụ huynh/người dẫn dắt xuất sắc ở khía cạnh truyền đạt kiến thức, biến môi trường giải trí thành lớp học. Bạn tạo ra những tác phẩm đa chiều, viết lách linh hoạt và luôn biết cách "bắt trend".'],
            nuance: 'Bạn có thể quá lý trí, mải mê phân tích đúng sai mà quên mất việc ấp ôm bằng cảm xúc nguyên sơ.',
            cause: 'Mặt Trời (Ánh sáng) bị khúc xạ qua lăng kính Song Tử (Khí đa chiều), khiến năng lượng tỏa ra nhanh nhưng nông.',
            tip: 'Đọc truyện cho con nghe (hoặc chỉnh sửa văn bản của mình) không quan trọng bằng việc thực sự lắng nghe chúng đang cảm thấy gì.',
        },
        Cancer: {
            hook: 'Bản năng bảo bọc trỗi dậy mãnh liệt nhất khi bạn đối điện với những gì bạn sinh ra.',
            effectParagraphs: ['Tại Cự Giải, Mặt Trời tỏa sáng từ bên trong sự ấp ủ tối đa. Khía cạnh làm cha mẹ (hoặc người kiến tạo) của bạn thấm đẫm sự hy sinh, nhạy cảm và che chở. Bạn mong muốn những sáng tạo hoặc con cái của mình mãi mãi giữ được sự ngây thơ, kết nối khăng khít với cội nguồn và gia tộc.'],
            nuance: 'Nhu cầu được "cần đến" quá mạnh mẽ khiến bạn bóp nghẹt sự trưởng thành của những đứa trẻ, hay những dự án vốn đã đến lúc phải thả rông.',
            cause: 'Mặt Trời (Năng lượng) đắm mình vào Cự Giải (Cảm xúc sâu, Nước) làm cho việc sáng tạo mang tính bản năng đúc kết thành cái kén an toàn.',
            tip: 'Cắt đứt "cuống rốn" tâm lý đúng thời điểm là hành động yêu thương vĩ đại nhất bạn có thể làm.',
        },
        Leo: {
            hook: 'Nhà vua nhìn xuống thần dân: Những đứa trẻ sinh ra để kế thừa ngai vàng rực rỡ.',
            effectParagraphs: ['Mặt Trời ngự tại nhà ruột Sư Tử (domicile) biến khu vực tử tức và sáng tạo thành một sân khấu không có đối thủ. Bạn vô cùng tự hào, hào phóng, và thể hiện tình yêu nồng nhiệt. Con cái của bạn thường được đối xử như "những vị vua con", và các tác phẩm nghệ thuật của bạn luôn chứa đựng sự kịch tính, hoàng gia, mang đậm dấu ấn cá nhân.'],
            nuance: 'Đặt kỳ vọng quá cao và xem con cái/tác phẩm như công cụ để "đánh bóng" vầng hào quang của mình làm triệt tiêu sự khiêm tốn của chúng.',
            cause: 'Ánh sáng Mặt Trời (Nguyên bản) bùng cháy ở Sư Tử (Cái tôi, Lửa), không cho phép bất cứ bóng râm nào len lỏi.',
            tip: 'Thành tựu của đứa trẻ không phải là bản kiểm điểm thành tích làm cha/làm mẹ của bạn. Hãy để chúng bình thường học cách sinh tồn.',
        },
        Virgo: {
            hook: 'Sự sáng tạo lớn nhất là rèn dũa những mầm non trở thành những công cụ tinh xảo nhất.',
            effectParagraphs: ['Mặt Trời tại Xử Nữ đúc kết sự quan tâm con cái và sản phẩm sáng tạo bằng tinh thần kỷ luật. Bạn không phải mẫu người ôm hôn thắm thiết; bạn là người gọt dũa, chữa lỗi và cung cấp nền tảng giáo dục cực kỳ hoàn chỉnh. Những đứa trẻ (hoặc dự án) được hưởng một sự bảo dưỡng, chăm sóc kĩ thuật chi li đến mức khó tin.'],
            nuance: 'Sự phê chuẩn khắc nghiệt dập tắt đi niềm cảm hứng tự nhiên và khả năng rủi ro đáng yêu của việc thử nghiệm.',
            cause: 'Mặt Trời (Tự do) bị chẻ nhỏ vào khuôn khổ Xử Nữ (Sự đo lường, Đất tẻ nhạt) đòi hỏi nghệ thuật phải có ích lợi hiện sinh.',
            tip: 'Hãy khen ngợi quá trình nỗ lực, bất chấp kết quả cuối cùng có đầy lỗi mạt rệp (bugs) hay sự ngốc nghếch đến đâu.',
        },
        Libra: {
            hook: 'Sự hiện diện của cái đẹp là lời khẳng định tình yêu mà bạn dành tặng những đứa con tinh thần.',
            effectParagraphs: ['Mặt Trời tại Thiên Bình (fall - thu hẹp) tìm kiếm sự khẳng định nghệ thuật thông qua sự cân xứng và hài hòa. Mối quan hệ giữa bạn và con cái mang tính ngoại giao, lịch thiệp và đề cao sự công bằng. Các dự án sáng tạo của bạn thường có gu thẩm mỹ đỉnh cao, liên quan đến đối tác và cực kỳ "thuận mắt" đám đông.'],
            nuance: 'Nhu cầu được "yêu mến" bởi chính những đứa trẻ (hoặc thị hiếu công chúng) làm bạn mất đi sự răn đe quyền uy của một phụ huynh giáo dưỡng.',
            cause: 'Mặt Trời (Lãnh đạo) ở vùng Thiên Bình (Hòa ước) khiến cái tôi mờ nhạt, sợ chịu trách nhiệm đơn độc.',
            tip: 'Một quyết định kỷ luật (hoặc một bước đi nghệ thuật mạo hiểm) bị ghét bỏ còn tốt hơn một sự nhượng bộ nhu nhược đánh mất tương lai.',
        },
        Scorpio: {
            hook: 'Bạn là người kiến tạo của những cõi sâu kín. Sáng tạo là một quá trình phá hủy rồi tái sinh.',
            effectParagraphs: ['Tại Bọ Cạp, Mặt Trời đi sâu vào những bí mật, tạo nên một sự gắn bó mẫu tử/phụ tử vô cùng mật thiết và mang tính thống trị tâm lý. Bạn hiến dâng những sự bảo vệ gắt gao. Về nghệ thuật, bạn thích những mảng tối, gai góc, lột tả bản chất nguyên thủy trần trụi của con người.'],
            nuance: 'Sự kìm kẹp, kiểm soát chặt chẽ như nọc độc bóp nghẹt sự tự do tâm hồn, biến sự bảo vệ thành bức tường giam cầm.',
            cause: 'Mặt Trời (Sự sống phơi bày) lao xuống cõi Bọ Cạp (Chiến trường tĩnh lặng, Nước sâu) ép năng lượng thành áp lực nén khó phát lộ bình thường.',
            tip: 'Gợi mở sự minh bạch, ngừng nghi kỵ và tạo những khoảng không tâm lý vô hại cho những đứa trẻ tinh thần lớn lên.',
        },
        Sagittarius: {
            hook: 'Mỗi đứa trẻ hay mỗi tác phẩm là một mũi tên bắn vào cõi vô định hoành tráng.',
            effectParagraphs: ['Mặt Trời tại Nhân Mã là một lễ hội rộn rã trong khu vực con cái và cái đẹp. Mối quan hệ với thế hệ sau mang tính triết học, cởi mở, vui tươi và tràn đầy những chuyến viễn du. Bạn khuyến khích một tư duy độc lập tuyệt đối. Tính sáng tạo của bạn rộng mở, lạc quan, hướng đến những nền văn hóa ngoại lai.'],
            nuance: 'Thiếu trách nhiệm hiện thực (như bỏ bê lịch uống sữa, học hành nền nếp) vì mải mê đi tìm những phương trời xa lạ.',
            cause: 'Mặt Trời (Chủ thể) cưỡi trên ngọn gió Nhân Mã (Tự do, Lửa) muốn tránh né những gánh nặng nuôi dạy tẻ nhạt thường ngày.',
            tip: 'Bạn không thể dạy triết lý nếu chưa tự tay nhặt rác dọn nhà. Tình yêu chân chính cần được xây xát vào những nền nếp kỉ luật cơ bản nhất.',
        },
        Capricorn: {
            hook: 'Con cái là danh dự tông đường, là khoản đầu tư cho triều đại trường tồn.',
            effectParagraphs: ['Tại Ma Kết, Mặt Trời lạnh lùng gieo mầm năng lượng kỷ luật, hoài bão lên khu vực Tử Tức. Hình mẫu phụ huynh của bạn nghiêng về sự khô khan, xa cách nhưng cực kỳ trách nhiệm và vững chãi. Về sáng tạo, những tác phẩm của bạn được tạo ra để gặt hái danh vọng thực tế, chống chọi lại bài kiểm tra khắc nghiệt của thời gian.'],
            nuance: 'Tuổi thơ của những đứa trẻ bị rút ngắn vì phải đối mặt với áp lực "thành công, hữu dụng" từ cái khuôn bạn ép xuống quá độ.',
            cause: 'Mặt Trời (Sự tỏa sáng) rơi vào cỗ máy Saturn (Thời gian, Đất, Cấu trúc) tước đi sự phù phiếm rỗng tuếch nhưng cũng làm bay hơi nụ cười hồn nhiên.',
            tip: 'Làm trẻ con nghĩa là ồn ào và tốn kém vô ích. Hãy thử thả lỏng và cho chúng khoảng không gian thừa thãi vô nghĩa để tự do vẽ bậy.',
        },
        Aquarius: {
            hook: 'Cái kén của sự khác biệt là lăng kính để bạn nhìn vào thế hệ tiếp nối và nghệ thuật tương lai.',
            effectParagraphs: ['Mặt Trời ở Bảo Bình (detriment) thể hiện một bản sắc "khoa học viễn tưởng" trong lĩnh vực Tự Tức. Bạn coi con cái là những người bạn bình đẳng, có ý tưởng tự chủ. Sự giáo dục mang đậm tính độc lập, cấp tiến. Nghệ thuật của bạn phá vỡ mọi lằn ranh truyền thống, đôi khi lập dị dị biệt nhưng đi trước 50 năm lịch sử.'],
            nuance: 'Sự lạnh nhạt, "khách quan hóa" các vấn đề tình cảm làm cho những đứa trẻ/ tác phẩm của bạn cảm thấy thiếu sự ưu tiên gắn kết sinh học.',
            cause: 'Mặt Trời (Cái ngã trung tâm) tản mát vào cộng đồng Bảo Bình (Mạng lưới Khí) đánh rơi đặc quyền ưu ái nhiệt huyết.',
            tip: 'Luôn phải có những cái ôm thắm thiết, dù trí não bạn cho rằng tình cảm sến súa là "lỗi thời". Sự tiếp xúc xúc giác luôn luôn cần thiết.',
        },
        Pisces: {
            hook: 'Trái tim của một giọt nước không có ranh giới: Con cái tự nhiên và nghệ thuật hòa tan vào làm một.',
            effectParagraphs: ['Mặt Trời tại Song Ngư đổ tràn nguồn cảm hứng dạt dào, thương cảm và sự hy sinh vô bờ bến lên khu vực Tử Tức. Bạn là một phụ huynh vô cùng dịu dàng, trực giác, đồng cảm sâu sắc với đau khổ của những mầm non. Khả năng sáng tạo nghệ thuật của bạn dường như đến từ thế giới của các vị thần, thi ca, nhạc điệu mộng mị.'],
            nuance: 'Lòng tha thứ quá dễ dãi và thiếu khả năng nói "Không", làm bạn trở thành nạn nhân của những đòi hỏi vô kỷ luật từ thế hệ trẻ nhỏ.',
            cause: 'Mặt Trời (Hình bóng) lặn xuống biển khơi Song Ngư (Ảo tượng vô biên, Nước) xóa bỏ mọi hình thái trừng phạt hữu hình.',
            tip: 'Mọi đại dương đều cần có bờ đê. Nếu bạn không dạy chúng cách bơi trong kỷ luật, bạn sẽ chết chìm cùng chúng.',
        },
    },
};
