/**
 * Chiêm Tinh Narrative Data — Servants / Co-workers / Daily Routine (Planet-in-Sign)
 *
 * ETC-format narratives for Mars (Nô Bộc / Subordinates / Daily Grind) in zodiac signs.
 */

import type { ETCNarrative } from '../../../../services/interpretation/types';

export type PlanetSignServantsMap = Record<string, Record<string, ETCNarrative>>;

export const CHIEMTINH_SERVANTS_NARRATIVES: PlanetSignServantsMap = {
    Mars: {
        Aries: {
            hook: 'Tại nơi làm việc, bạn không cần một đội nhóm — bạn chỉ cần họ tránh đường để bạn tiến lên.',
            effectParagraphs: ['Mars (Hành động) nằm tại nhà của nó (Aries - Khởi xướng) khiến phong cách làm việc hàng ngày của bạn rực lửa năng lượng. Với cấp dưới hoặc đồng nghiệp, bạn giống một vị tướng cầm quân ra trận: ra lệnh dứt khoát, đi thẳng vào vấn đề. Nếu công việc đòi hỏi cường độ cao và sự độc lập tuyệt đối, bạn là cỗ máy hoàn hảo.'],
            nuance: 'Sự thiếu kiên nhẫn và nóng nảy bẩm sinh khiến bạn dễ trở thành một vị sếp hoặc cộng sự "độc tài", làm người khác kiệt sức vì chạy theo tốc độ của bạn.',
            cause: 'Hỏa tinh (Động lực) rực cháy trong Bạch Dương (Cái tôi), tạo ra sức bứt phá nhưng thiếu bền bỉ và sự hòa giải nội bộ.',
            tip: 'Khen ngợi nhân viên/đồng nghiệp công khai và chỉ trích họ kín đáo. Đừng mong đợi ai cũng có cùng thang tốc độ như bạn.',
        },
        Taurus: {
            hook: 'Mỗi ngày làm việc của bạn là một viên gạch, được đặt xuống chậm rãi nhưng vô cùng rắn chắc.',
            effectParagraphs: ['Mars ở Kim Ngưu (detriment - suy yếu) di chuyển rất chậm, nhưng một khi đã bắt đà thì không ai cản nổi. Phong cách quản lý cấp dưới của bạn cực kỳ thực tế, chú trọng kết quả vật chất. Bạn hiếm khi nổi nóng ngay lập tức nơi công sở, mà chọn cách giải quyết vấn đề một cách vững chãi, kiên gan.'],
            nuance: 'Tốc độ khởi động rề rà và sự ngoan cố bảo vệ những thói quen làm việc lỗi thời khiến bạn dễ nổi đóa nếu ai đó bắt bạn thay đổi lộ trình đang đi dở.',
            cause: 'Động cơ Hỏa tinh (Nóng) bị khóa nén dưới khối lượng khổng lồ của Kim Ngưu (Đất ngự trị) tạo ra một sức ỳ khủng khiếp lúc xuất phát.',
            tip: 'Đừng ngại chia sẻ một vài phần việc vụn vặt cho cấp dưới thay vì ôm đồm để đảm bảo "mọi thứ đúng ý mình từ A tới Z".',
        },
        Gemini: {
            hook: 'Công sở với bạn là một mạng lưới thông tin, và bạn quản lý công việc bằng miệng thay vì bàn tay.',
            effectParagraphs: ['Mars tại Song Tử biến năng lượng thể chất thành sự sắc bén trí tuệ. Trong các mối quan hệ đồng nghiệp/nhân viên, bạn là một người giao tiếp đại tài, thích tranh biện, brainstorm ý tưởng liên tục. Bạn giải quyết công việc bộn bề nằng cách làm nhiều việc cùng lúc (multitasking).'],
            nuance: 'Ý tưởng thì hằng hà sa số nhưng việc thực thi lại "đầu voi đuôi chuột". Bạn cũng dễ vướng vào tin đồn (drama) chốn văn phòng rắc rối.',
            cause: 'Sự hiếu chiến (Hỏa tinh) hòa vào Khí (Song Tử) thổi tung mọi định kiến nhưng lại quá loãng để duy trì một dự án dài hơi.',
            tip: 'Hãy có một cộng sự mang năng lượng Đất (Xử Nữ, Ma Kết) để họ biến các bài thuyết trình bay bổng của bạn thành các dòng code hoặc bảng Excel thực tế.',
        },
        Cancer: {
            hook: 'Bạn bảo vệ đồng nghiệp như người thân, và cũng giận dỗi họ như người nhà.',
            effectParagraphs: ['Mars ở Cự Giải (fall - rơi rụng, kiềm chế) bọc sự hiếu chiến sắc nhọn bằng một lớp vỏ cua phòng vệ. Trong công việc hàng ngày, bạn điều hành nhóm bằng tình cảm, sự chăm sóc và trực giác nhạy bén. Khi đồng nghiệp gặp khó, bạn luôn dang tay chứa chấp họ như một đấng bảo hộ.'],
            nuance: 'Tuy nhiên, sự thù dai nơi công sở hoặc tâm lý "thụ động - ghen tuông" (passive-aggressive) khiến cho cấp dưới nhiều phen hoảng sợ khi bạn giữ im lặng.',
            cause: 'Mars (Gươm đao) cắm xuống Nước (Cự Giải) khiến vũ khí rỉ sét; thay vì tấn công trực diện, bạn dùng chiến thuật rào dậu.',
            tip: 'Đừng lấy công việc làm nơi thỏa mãn nhu cầu tình cảm cảm xúc. Góp ý sòng phẳng, mạch lạc thay vì tỏ thái độ giận dỗi ngầm.',
        },
        Leo: {
            hook: 'Bạn không làm việc nhóm, bạn đang cai trị một vương quốc nơi bản thân là mặt trời.',
            effectParagraphs: ['Tại Sư Tử, Mars tỏa ra năng lượng của một nhà quản lý bẩm sinh. Bạn thích giao việc, chỉ đạo và luôn biết cách truyền lửa cho cấp dưới. Thái độ làm việc của bạn chuyên nghiệp, dứt khoát và sặc sỡ kịch tính. Bạn yêu cầu sự trung thành tuyệt đối từ những người cộng sự.'],
            nuance: 'Sự kiêu ngạo quá mức và tính thích chỉ đạo khiến bạn quên đi những đóng góp thầm lặng của đồng nghiệp. Lòng tự ái mù quáng có thể thiêu rụi một dự án đang tốt.',
            cause: 'Hỏa Tinh (Chiến binh) đội vương miện Sư Tử (Lửa, Kiên định) biến các quyết định trở thành sắc lệnh không thể chối từ.',
            tip: 'Nếu muốn nhân viên dốc sức vì mình, bạn phải học cách hạ bớt cái tôi và tự tay lùi vào hậu trường một vài lần.',
        },
        Virgo: {
            hook: 'Ngày làm việc của bạn là vương quốc của những Checklists, nơi không một lối thoát cho sự cẩu thả.',
            effectParagraphs: ['Mars tại Xử Nữ đúc kết toàn bộ năng lượng vào những chi tiết rắc rối nhất. Bạn là một người cày cuốc thầm lặng xuất sắc. Đối với nhân viên/đồng nghiệp, bạn sẽ hướng dẫn họ vô cùng tỉ mỉ, đòi hỏi tính kỹ thuật khắt khe. Năng lực "bới lông tìm vết" của bạn cứu sống rất nhiều đống lộn xộn của người khác.'],
            nuance: 'Sự hoàn hảo độc hại biến bạn thành nỗi ám ảnh (micromanagement) đối với cấp dưới, khiến họ mất đi sự tự tin tự thân.',
            cause: 'Mars (Hoạt động) giao thoa cùng Xử Nữ (Sự chính xác, Đất) bắt buộc nỗ lực vật lý phải được quy chuẩn đến từng micromet.',
            tip: 'Ủy quyền (Delegate) là bài học sống còn. Bạn không thể tự mình đẽo gọt mọi thứ, phải chấp nhận sai số từ 5-10% trong mọi công việc điều hành.',
        },
        Libra: {
            hook: 'Bạn chiến đấu ở văn phòng qua những cái bắt tay thay vì nắm đấm.',
            effectParagraphs: ['Mars ở Thiên Bình (detriment) cực ghét sự thô lỗ hay bạo lực chốn công sở. Năng lượng hành động của bạn luôn song hành cùng khát khao giữ gìn hòa khí. Bạn làm việc tốt nhất khi có đối tác tương xứng, giỏi thương lượng nhượng bộ và dàn xếp mâu thuẫn khéo léo giữa các nhân sự.'],
            nuance: 'Tính nể nang hay sự chần chừ (sợ mất lòng đồng nghiệp) khi cần đưa ra kỷ luật cứng rắn làm suy giảm uy tín lãnh đạo của bạn.',
            cause: 'Mars (Cái tôi tiến lên) đâm sầm vào Cán cân (Lẽ phải hai đầu) làm mọi dự định đều phải đợi qua 3 khâu xin ý kiến.',
            tip: 'Đôi khi một phán quyết "Có" hoặc "Không" rạch ròi sẽ bảo vệ tổ chức tốt hơn là một cuộc xoa dịu đôi bên.',
        },
        Scorpio: {
            hook: 'Bạn lãnh đạo từ bóng tối, âm thầm, chết người và cực kỳ hiệu quả.',
            effectParagraphs: ['Dưới tư cách một vị sếp truyền thống thứ hai của Bọ Cạp (domicile), Mars ở vị trí này có sự bền bỉ chiến lược đến rùng mình. Làm việc với bạn đòi hỏi cường độ tinh thần khốc liệt; bạn chú ý từng sơ hở và điểm yếu của đối thủ lẫn nhân viên. Một khi đã tập trung, công suất bùng nổ của bạn xóa sổ toàn bộ các đối thủ cạnh tranh.'],
            nuance: 'Sự nghi kỵ độc đoán, áp lực kiểm soát gắt gao làm cho thuộc cấp và bộ sậu xung quanh luôn trong tình trạng căng thẳng lo âu.',
            cause: 'Hỏa Tinh (Khát khao) chìm vào mặt nước lặng lẽ Bọ Cạp (Đáy vực sâu) đè nén sự biểu lộ cho đến khi ra đòn kết liễu cuối cùng.',
            tip: 'Chữ tín không nhất thiết phải đánh thức bằng sự đe dọa. Hãy từ bỏ mong muốn tra khảo tâm lý những người dưới quyền.',
        },
        Sagittarius: {
            hook: 'Lịch trình làm việc của bạn giống hệt một cuộc phiêu lưu đầy ngẫu hứng.',
            effectParagraphs: ['Mars ở Nhân Mã không thích những lối mòn hành chính lặp đi lặp lại. Phong cách tương tác với cộng sự của bạn cực kỳ cởi mở, triết lý và vui vẻ. Bạn truyền ngọn lửa khát vọng đến từng nhân viên, vẽ ra viễn cảnh lớn và khuyến khích họ đóng góp sáng tạo thay vì gò ép vào kỉ luật.'],
            nuance: 'Việc thích phóng đại khả năng, hoặc mau chán sau giai đoạn khởi động khiến bạn thường để lại một đống "chiến trường" ngổn ngang cho người sau dọn dẹp.',
            cause: 'Sức mạnh Hỏa Tinh bay vút qua cung Lửa Nhân Mã (Tự do vĩ mô), thiêu rụi các mốc ranh giới của trách nhiệm thường ngày.',
            tip: 'Mọi tầm nhìn xuất chúng đều sẽ tắt ngúm nếu không có khung pháp lý và timeline hoàn thiện rõ ràng.',
        },
        Capricorn: {
            hook: 'Bạn là một vị tướng của tính kỷ luật. Công lực của bạn mạnh nhất khi chiến đấu cho mục tiêu dài hạn.',
            effectParagraphs: ['Tại Ma Kết (exaltation), Mars tìm thấy vị trí thăng hoa nhất trong hoàng đạo để vận hành bộ máy sự nghiệp. Bạn coi sức lao động là thứ vốn quý giá không thể phung phí. Cách quản trị nhân sự của bạn rất "quân phiệt": thưởng phạt cấu trúc, hiệu suất rành rọt. Sự kiên trì và tài năng tính toán đem đến cho bạn quyền lực vững vàng.'],
            nuance: 'Bạn dễ trở nên tàn nhẫn, áp bức và xem nhẹ yếu tố con người, coi nhân viên như bánh răng trong cỗ máy tham vọng.',
            cause: 'Mars (Sức tiến lùi) được điều phối hoàn hảo bởi cấu trúc Saturn (Ma Kết, Lãnh đạm) tạo thành mũi giáo đâm thẳng vào đích đến danh vọng vô tình.',
            tip: 'Nhân sự rời lịch vì họ kiệt sức chứ không phải vì kém cỏi. Hãy thêm lòng nhân ái vào các quyết sách điều hành.',
        },
        Aquarius: {
            hook: 'Đồng nghiệp của bạn không chỉ là cấp dưới; họ là "những người anh em cùng chí hướng hệ sinh thái".',
            effectParagraphs: ['Mars ở Bảo Bình phá vỡ cấu trúc tháp lãnh đạo để chọn cách điều hành phẳng (flat-organization). Năng lượng làm việc của bạn mang tính cách mạng, bạn trao quyền tự quyết tối đa cho cấp dưới miễn sao chung lý tưởng. Những ý tưởng nhóm của bạn mang tính đột phá, hiện đại, và không sợ định kiến.'],
            nuance: 'Sự cứng nhắc (kiểu kỳ quái) trong các hệ tư tưởng mới khiến bạn trở nên ngoan cố, tranh luận phớt lờ cảm xúc của cả đội nhóm.',
            cause: 'Năng lượng Hỏa tinh va vào tính Khí cố định của Bảo Bình sản sinh ra khao khát cái mới đầy cực đoan vô hiệu hóa lối đi cũ.',
            tip: 'Dù là "tập thể dân chủ", một tổ chức vẫn cần người cầm trịch. Đừng bỏ mặc đội nhóm khi sự cố vận hành xảy ra.',
        },
        Pisces: {
            hook: 'Bạn giải quyết công việc trong khi ngủ, hay lãnh đạo bằng lòng nhân hậu không bờ bến.',
            effectParagraphs: ['Tại Song Ngư, lực đẩy vật lý của Mars bị chuyển hóa thành sức mạnh trực giác và sự mông lung. Phong cách thao tác hàng ngày của bạn chảy như nước: tùy hứng, phi tuyến tính và rất khó nắm bắt. Bạn không bao giờ muốn trừng phạt cấp dưới, bạn bao dung, sẵn sàng hỗ trợ họ trong các khó khăn cá nhân.'],
            nuance: 'Năng lượng bị rò rỉ (burn-out) vì thiếu kế hoạch rõ ràng. Bạn dễ lẩn tránh xung đột công sở và để cho các mâu thuẫn âm ỉ thối rữa.',
            cause: 'Mũi giáo Hỏa Tinh (Thực chiến) chìm nghỉm trong Màn sương Song Ngư (Tâm linh) tạo ra một cuộc chiến mộng du của cảm giác thay vì nắm đấm.',
            tip: 'Hãy thiết lập ranh giới cực kỳ rành mạch trong công việc. Trì hoãn sự trừng phạt là tàn nhẫn với tổ chức.',
        },
    },
};
