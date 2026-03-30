/**
 * Chiêm Tinh Narrative Data — Travel / Higher Education (Planet-in-Sign)
 *
 * ETC-format narratives for Jupiter (Thiên Di / Travel / Open Horizons) in zodiac signs.
 */

import type { ETCNarrative } from '../../../../services/interpretation/types';

export type PlanetSignTravelMap = Record<string, Record<string, ETCNarrative>>;

export const CHIEMTINH_TRAVEL_NARRATIVES: PlanetSignTravelMap = {
    Jupiter: {
        Aries: {
            hook: 'Hành trình của bạn bắt đầu bằng chữ "Dám" chứ không phải những tấm bản đồ vạch sẵn.',
            effectParagraphs: ['Jupiter ở Bạch Dương mở rộng chân trời của bạn thông qua sự tiên phong thể chất. Di chuyển với bạn không phải sự hưởng thụ thụ động, mà là hành động bứt phá giới hạn. Ở những vùng đất mới, bạn thường là người đầu tiên leo lên đỉnh núi, khám phá vách đá hoặc tự mở ra một đường đi hoang dã. Triết lý sống của bạn luôn liên kết với hành động tức thời.'],
            nuance: 'Quyết định xê dịch vội vã đôi lúc khiến bạn gặp rắc rối vì quên chuẩn bị những điều cơ bản nhất (như đặt phòng khách sạn, kiểm tra hành lý).',
            cause: 'Jupiter (Vươn xa) bùng cháy mãnh liệt tại Bạch Dương (Cái tôi hành động) đập tan sự trì trệ của các hệ thống niềm tin lề thói.',
            tip: 'Du lịch bụi hoặc đi phượt một mình (solo travel) chính là cánh cổng giác ngộ tuyệt vời nhất dành cho tâm hồn bạn.',
        },
        Taurus: {
            hook: 'Bạn thu thập những chân trời mới thông qua vị giác, xúc giác, và sự hưởng thụ chậm rãi.',
            effectParagraphs: ['Tại Kim Ngưu, Jupiter biến những chuyến đi xa thành các kỳ nghỉ dưỡng (retreat). Tầm nhìn của bạn mở rộng khi cơ thể bạn được an trú trong một môi trường chất lượng cao (resort thiên nhiên, ẩm thực địa phương tinh tế). Triết học của bạn là hiện thực: một bài thuyết pháp vô nghĩa không bằng một cánh đồng lúa mì vàng rực trước mắt.'],
            nuance: 'Thích sự ổn định xa hoa làm cản trở bạn bước ra khỏi phòng khách sạn để thực sự chạm vào một nền văn hóa xa lạ.',
            cause: 'Jupiter (Trí tuệ bậc cao) trong cõi Kim Ngưu (Đất ngự trị) bắt buộc sự mở rộng phải có giá trị vật chất quy đổi.',
            tip: 'Thử một lần đi du lịch homestay cùng nông dân địa phương thay vì ở resort 5 sao. Sự thấu cảm sẽ bùng nổ.',
        },
        Gemini: {
            hook: 'Đồng hành cùng bạn là những trang sách, những ngôn ngữ lạ, và hàng ngàn câu hỏi không hồi kết.',
            effectParagraphs: ['Jupiter ở Song Tử (detriment - suy yếu một chút, nhưng cực kỳ nhanh nhạy) mở bung những chân trời thông qua sự tò mò. Bạn "du lịch" trong thư viện hay "đi xa" qua việc học một ngoại ngữ mới. Mỗi chuyến đi là một khóa học tốc hành, nơi bạn khao khát kết giao, trò chuyện với dân bản địa và gom nhặt những mảnh ghép thông tin khổng lồ.'],
            nuance: 'Thu thập quá nhiều thông tin rác trên đường đi làm bạn kiệt sức trước khi đến được chân lý cốt lõi.',
            cause: 'Jupiter (Cái nhìn bao quát) bị vỡ vụn tại Song Tử (Hàng tỷ chi tiết) khiến đường đi luôn rẽ nhánh, mông lung nhưng không bao giờ nhàm chán.',
            tip: 'Mở rộng ranh giới qua những khóa học ngắn hạn hoặc kỹ năng ngoại ngữ. Đừng học quá sâu, hãy học đủ dùng để kể chuyện.',
        },
        Cancer: {
            hook: 'Dù ở phương trời nào, bạn vẫn luôn mang theo một mảnh trăng của quê nhà trong ngực áo.',
            effectParagraphs: ['Jupiter tại Cự Giải (exaltation - thăng hoa rực rỡ) mang năng lượng di chuyển tuyệt vời để... tìm thấy gia đình. Khi ra nước ngoài hay học lên cao, điểm neo đậu lớn nhất của bạn không phải những tòa nhà cao tầng, mà là bản sắc lịch sử, cội nguồn văn hóa, và cảm giác tìm được "tổ ấm tâm linh".'],
            nuance: 'Hội chứng "homemesick" (nhớ nhà) đôi khi quá mạnh làm phá hỏng niềm vui thích chiêm ngưỡng những phong cảnh chưa từng thấy.',
            cause: 'Năng lượng mở rộng của Jupiter chìm đắm hoàn toàn trong cảm xúc và hoài niệm (Nước) của Cự Giải tạo nên những cuộc di cư mang tính lịch sử.',
            tip: 'Khám phá cây gia phả, hoặc du lịch về những vùng đất quê hương của tổ tiên. Phước lành của bạn giấu ở những tấm ảnh ố màu.',
        },
        Leo: {
            hook: 'Hành trình mở rộng tầm mắt của bạn giống như một vòng lưu diễn huy hoàng của một ngôi sao.',
            effectParagraphs: ['Ở Sư Tử, Jupiter mở tung cánh cửa cơ hội học vấn và du lịch thông qua sự sáng tạo và đam mê. Những chuyến xuất ngoại thường biến bạn thành tâm điểm của sự chú ý. Bạn thích du lịch đến những nơi tráng lệ, ấm áp, nơi bạn có thể phô diễn tài năng hoặc vui chơi xa hoa như một bậc vương giả chính hiệu.'],
            nuance: 'Kỳ vọng chuyến đi phải luôn lộng lẫy và hoàn hảo khiến bạn dễ sụp đổ khi thực tế gặp chút rắc rối (chuyến bay trễ, phòng không đẹp).',
            cause: 'Jupiter (Niềm kiêu hãnh) thắp sáng ngọn lửa cường điệu Sư Tử (Cái tôi bốc cháy) đúc kết thành chuỗi các sự kiện đáng nhớ.',
            tip: 'Biến những bức ảnh du lịch hoặc triết lý học thuật của bạn thành một tác phẩm nghệ thuật/ vlog. Bạn cần ánh nhìn của khán giả.',
        },
        Virgo: {
            hook: 'Bạn đi xa để giải phẫu thế giới, để học hỏi, và để lại một phiên bản tốt đẹp hơn phía sau.',
            effectParagraphs: ['Jupiter ở Xử Nữ (detriment) không tìm kiếm chân lý nơi đại ngàn, nó tìm chân lý trong một cỗ máy tinh vi. Bạn du lịch thường gắn với mục đích cực kỳ thiết thực: đi công tác, học nghề chuyên môn cao, hoặc làm thiện nguyện y tế. Tầm nhìn của bạn mở rộng khi bạn thấy mọi chi tiết được sắp xếp trơn tru.'],
            nuance: 'Tính câu nệ, lo xa về sức khỏe hay lịch trình (lên timeline từng phút) tước đoạt toàn bộ yếu tố bất ngờ quý giá của một chuyến chu du.',
            cause: 'Jupiter (Niềm tin rộng lớn) bị ép vào khu rừng chật chội mang tên Xử Nữ (Yếu tố nhỏ nhặt) đòi hỏi thực tế để tin tưởng.',
            tip: 'Hãy để trống 1 ngày hoàn toàn vô kỷ luật trong mỗi chuyến viễn du. Lạc đường một chút là gia vị tạo nên phép màu.',
        },
        Libra: {
            hook: 'Chân trời không ở cuối đất liền; chân trời nằm ở người mà bạn đồng hành.',
            effectParagraphs: ['Tại Thiên Bình, Jupiter kết nối những chân trời bằng sợi tơ của đối tác và mỹ học. Bạn hiếm khi lên đường một mình. Viễn du, học lên cao trào, hay khám phá triết lý đều cần có bộ đôi. Những thành phố giàu tính nghệ thuật, thơ ca, các phòng trưng bày là điểm đến giúp giác ngộ tâm hồn bạn nhất.'],
            nuance: 'Quyết định điểm đến chỉ để chiều ý người bạn đồng hành làm bạn lỡ mất chuyến đi thực sự thuộc về khao khát của chính mình.',
            cause: 'Jupiter (Đạo đức vũ trụ) hội ngộ Thiên Bình (Lẽ công bằng xã hội) kéo giãn những bức tường định kiến thông qua tranh biện lịch thiệp.',
            tip: 'Bạn có duyên gặp gỡ những quý nhân (hoặc thậm chí bạn đời) ngoại quốc hoặc trong môi trường đại học. Cởi mở với những văn hóa khác biệt.',
        },
        Scorpio: {
            hook: 'Một chuyến đi xa không thể gọi là đích đáng nếu nó không làm tổ kén của bạn nứt toác.',
            effectParagraphs: ['Jupiter ở Bọ Cạp biến đổi mọi khái niệm di chuyển thành một chuyến "tu tập tâm linh" ép xác. Chân trời của bạn mở ra khi bạn đối mặt với những cấm kỵ, nghệ thuật huyền bí, lịch sử tối tăm, hoặc khảo cổ học. Những chuyến đi của bạn dẫu hiểm nguy, bí mật, lại là lò luyện kim tạo ra viên đá triết gia cá nhân.'],
            nuance: 'Bạn luôn đi tìm "thuyết âm mưu" ở bất cứ vùng đất mới nào, làm tăng sự hồ nghi thay vì tận hưởng cảnh sắc tĩnh lặng.',
            cause: 'Jupiter (Cuốn sách sự thật) lật mở trang giấy dưới lớp bùn lầy nọc độc Bọ Cạp (Bóng tối vô thức). Ánh sáng không dành cho kẻ yếu bóng vía.',
            tip: 'Khoa học tâm lý, pháp y, hoặc nghiên cứu các nền văn minh bị vùi lấp phù hợp với tư duy khảo sát siêu việt của bạn.',
        },
        Sagittarius: {
            hook: 'Bạn là gã du mục vĩnh cửu của hoàng đạo. Bản đồ là tôn giáo, và biên giới là thứ đáng bị phá bỏ.',
            effectParagraphs: ['Ở vị trí quyền lực nhất (domicile), Jupiter tại Nhân Mã hô biến toàn bộ cuộc sống của bạn thành vô tận. Du học, xuất ngoại, khám phá đa văn hóa không phải khát vọng, mà là không khí để thở. Bạn sinh ra để truyền đạt chân lý rộng lớn, và thế giới này quả thực quá nhỏ bé cho dấu chân lãng tử của bạn.'],
            nuance: 'Chứng ảo tưởng sức mạnh, quá sùng bái chủ nghĩa tự do khiến bạn sống như kẻ không rễ, cưỡi ngựa xem hoa.',
            cause: 'Đây là nhà trọ linh thiêng nhất của Jupiter. Sự khao khát ý nghĩa (Lửa) tìm thấy người lái đò (Mũi tên) trên đại dương vô hạn.',
            tip: 'Gom những bài học từ trăm ngàn ngôi làng, vạn nẻo sân bay lại thành một cuốn từ điển của riêng mình. Bạn phải là người gieo rắc sự minh triết.',
        },
        Capricorn: {
            hook: 'Những khoảng cách địa lý sinh ra để bị đè bẹp dưới dấu chân của những nấc thang danh vọng.',
            effectParagraphs: ['Jupiter tại Ma Kết (fall - rơi rụng, kiềm chế) mang lại một cái nhìn thực tế tàn khốc về khái niệm "mở rộng". Bạn ra nước ngoài không phải để ngắm cảnh, mà để ký kết đối tác, để học lấy một tấm bằng đắt đỏ giúp thăng tiến vị thế vương giả. Bạn tôn nghiêm trước các cấu trúc kiến trúc vĩ đại của con người hơn là thiên nhiên.'],
            nuance: 'Bạn khó có thể cười đùa ngây ngô dưới ánh tuyết rơi nếu như đầu bạn vẫn đang tính toán tỷ lệ lạm phát quy đổi ngoại tệ.',
            cause: 'Jupiter (Giới hạn mở rộng) va vào bức tường Saturn (Thời gian và Địa vị), buộc hy vọng rực rỡ phải khoác lên chiếc áo giáp sắt.',
            tip: 'Lịch sử, chính trị học hoặc các lâu đài cổ kính sẽ làm dịu đi tham vọng chói gắt, giúp bạn tĩnh tâm trước dòng chảy hưng phế.',
        },
        Aquarius: {
            hook: 'Cuộc du hành đáng giá nhất là cuộc viễn du trên đỉnh sóng của công nghệ và vì tinh tú.',
            effectParagraphs: ['Jupiter ở Bảo Bình đập nát những phương thế học tập truyền thống và mọi hình thức du lịch cũ rích. Bạn mở bờ cõi bằng sự điên rồ: ngắm Bắc Cực Quang, tham gia một cộng đồng sống xanh kiểu mới ở một hòn đảo ít người, hoặc săn tìm cơ hội qua không gian mạng toàn cầu. Hệ thống niềm tin mâu thuẫn nhưng rực sáng tinh thần nhân loại.'],
            nuance: 'Cái vẻ hiểu biết kiêu ngạo của bạn về các lý thuyết đổi mới dễ chọc giận các bô lão và những người trân trọng di sản hoài cổ.',
            cause: 'Jupiter (Hệ tư tưởng) đồng thanh cất lên bài hát tự do hòa vào dòng mạng điện toán toàn cầu của Bảo Bình (Khí, Nhóm cộng đồng).',
            tip: 'Du hành vũ trụ vẫn còn đắt đỏ, nên tạm thời, tham gia các mạng lưới liên kết kỹ thuật số từ xa (Remote work/ Digital Nomad) là lãnh địa của bạn.',
        },
        Pisces: {
            hook: 'Có một dải ngân hà đằng sau nếp nhăn của đôi mắt, và bạn đi du lịch bằng cách nhắm nghiền chúng lại.',
            effectParagraphs: ['Jupiter ở Song Ngư (domicile truyền thống) mở khóa trực giác vô cùng hạn. Với bạn, một chuyến "nhập thiền", một khóa tu im lặng (vipassana), hay hành hương đến vùng đất thánh giá trị hơn bất kỳ chuyến chu du vật lý nào. Bạn bơi lội trong triết học tâm linh, nghệ thuật vô thức và lòng từ bi phổ quát, nơi không quốc gia nào bị gạch bỏ.'],
            nuance: 'Bạn rất dễ lạc lối, theo cả nghĩa đen (mù hướng bẩm sinh) lẫn nghĩa bóng (sùng kính các vị giáo chủ rởm mạc).',
            cause: 'Jupiter (Vị thầy tối cao) được bao phủ bởi đại dương bao la Song Ngư (Nước), làm mờ đi đường ranh để hợp thành Đại ngã.',
            tip: 'Xin hãy học cách xem bản đồ và quản lý passport. Đừng hy vọng Bồ Tát hay Chúa trời làm thủ tục hải quan giúp bạn khi bạn đang ngất ngưởng trong cõi mơ.',
        },
    },
};
