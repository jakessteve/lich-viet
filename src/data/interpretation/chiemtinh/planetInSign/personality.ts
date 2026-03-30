/**
 * Chiêm Tinh Narrative Data — Personality (Planet-in-Sign)
 *
 * ETC-format narratives for Sun, Moon, and Ascendant in signs.
 * Golden seed: Sun in each of the 12 zodiac signs.
 */

import type { ETCNarrative } from '@/services/interpretation/types';

export type PlanetSignPersonalityMap = Record<string, Record<string, ETCNarrative>>;

export const CHIEMTINH_PERSONALITY_NARRATIVES: PlanetSignPersonalityMap = {
    Sun: {
        Aries: {
            hook: 'Bạn không chờ đợi cơ hội — bạn phá cửa mà vào.',
            effectParagraphs: ['Năng lượng Bạch Dương chảy trong bạn như dung nham nóng chảy. Bạn hành động trước, suy nghĩ sau, và kỳ lạ thay — phần lớn thời gian cách này hiệu quả. Bạn là người tiên phong: đi đầu, dám thử, và truyền cảm hứng cho người khác bằng sự dũng cảm.'],
            nuance: 'Nhanh là tốt, nhưng đôi khi dừng lại 5 giây có thể cứu bạn khỏi 5 năm hối hận.',
            cause: 'Mặt Trời tại Bạch Dương — vị trí "exaltation", năng lượng Mars thuần khiết nhất.',
            tip: 'Trước mỗi quyết định lớn, viết ra 3 hệ quả có thể xảy ra. Không cần phân tích sâu — chỉ cần 3 bullet points.',
        },
        Taurus: {
            hook: 'Bạn xây cuộc đời mình như xây một ngôi nhà — chậm rãi, vững chắc, và rất đẹp.',
            effectParagraphs: ['Kim Ngưu cho bạn sự kiên nhẫn phi thường. Khi người khác đã bỏ cuộc, bạn vẫn kiên trì. Bạn hiểu giá trị của thời gian, tiền bạc, và chất lượng. Không ai bắt bạn vội vàng — và chính sự "chậm" này mang lại cho bạn những thành tựu bền vững nhất.'],
            nuance: 'Kiên nhẫn khác với bảo thủ. Khi thế giới thay đổi, kiên trì giữ nguyên không phải lúc nào cũng khôn ngoan.',
            cause: 'Mặt Trời tại Kim Ngưu — Venus cai quản, yêu cái đẹp, ổn định, và giá trị vật chất.',
            tip: 'Mỗi quý, thử MỘT điều mới hoàn toàn — chống lại xu hướng quá quen thuộc.',
        },
        Gemini: {
            hook: 'Bộ não bạn là browser với 47 tabs mở cùng lúc — và bạn vẫn quản lý được!',
            effectParagraphs: ['Song Tử cho bạn trí tuệ đa dạng, khả năng giao tiếp siêu phàm, và sự tò mò vô tận. Bạn học nhanh, nói hay, và "switch context" giỏi hơn bất kỳ ai. Mỗi cuộc trò chuyện với bạn đều là một cuộc phiêu lưu trí tuệ.'],
            nuance: 'Biết nhiều thứ ở bề mặt khác với hiểu sâu một thứ. Đôi khi bạn cần close vài tabs.',
            cause: 'Mặt Trời tại Song Tử — Mercury cai quản, giao tiếp và trí tuệ là siêu năng lực.',
            tip: 'Chọn MỘT chủ đề mỗi tháng để deep-dive — viết 1 bài blog về nó. Sâu hơn = giàu hơn.',
        },
        Cancer: {
            hook: 'Bạn là người tạo ra "nhà" — không phải bốn bức tường, mà là cảm giác thuộc về.',
            effectParagraphs: ['Cự Giải cho bạn trái tim rộng lớn và bản năng bảo vệ mãnh liệt. Gia đình, bạn bè, và những người bạn yêu thương — bạn sẽ làm mọi thứ để giữ họ an toàn. Trực giác của bạn gần như siêu nhiên.'],
            nuance: 'Bảo vệ quá mức có thể trở thành kiểm soát. Yêu thương không có nghĩa là giữ chặt.',
            cause: 'Mặt Trời tại Cự Giải — Moon cai quản, cảm xúc sâu, bản năng nuôi dưỡng.',
            tip: 'Thiết lập ranh giới cảm xúc rõ ràng — yêu thương có giới hạn mới bền vững.',
        },
        Leo: {
            hook: 'Bạn bước vào phòng — và phòng sáng lên.',
            effectParagraphs: ['Sư Tử là vua của hoàng đạo, và bạn mang vương khí đó trong mỗi cử chỉ. Bạn tự tin, sáng tạo, hào phóng, và có sức hút tự nhiên khiến mọi người muốn đi theo. Cuộc sống với bạn không bao giờ nhàm chán — vì bạn biến mọi khoảnh khắc thành đặc biệt.'],
            nuance: 'Tỏa sáng là tốt — nhưng hãy chừa chỗ cho người khác cũng được sáng.',
            cause: 'Mặt Trời tại Sư Tử — domicile, vị trí mạnh nhất. Sáng tạo, tự tin, lãnh đạo.',
            tip: 'Khen ngợi người khác thật lòng mỗi ngày — vua giỏi nhất là người nâng đỡ thần dân.',
        },
        Virgo: {
            hook: 'Bạn nhìn thấy chi tiết mà 99% mọi người bỏ qua — và chi tiết ấy thường cứu cả dự án.',
            effectParagraphs: ['Xử Nữ cho bạn khả năng phân tích cực kỳ tinh tế, tinh thần trách nhiệm cao, và đôi tay vàng trong bất kỳ công việc nào đòi hỏi sự chính xác. Bạn không để sai sót — vì đó là bản năng, không phải cố gắng.'],
            nuance: 'Cầu toàn là vũ khí hai lưỡi. Nó giúp bạn giỏi nhưng cũng khiến bạn không bao giờ hài lòng.',
            cause: 'Mặt Trời tại Xử Nữ — Mercury cai quản, phân tích, chính xác, phục vụ.',
            tip: 'Chấp nhận "good enough" cho những việc không quan trọng. Dành sự hoàn hảo cho điều thực sự đáng.',
        },
        Libra: {
            hook: 'Bạn có khả năng nhìn thấy cả hai phía — và biến xung đột thành hòa bình.',
            effectParagraphs: ['Thiên Bình ban cho bạn thẩm mỹ tinh tế, kỹ năng ngoại giao bẩm sinh, và nhu cầu mãnh liệt về sự công bằng. Bạn là người mà cả hai bên đều tin tưởng trong một cuộc tranh chấp — vì họ biết bạn thực sự muốn tốt cho tất cả.'],
            nuance: 'Muốn công bằng cho tất cả đôi khi dẫn đến bất công cho chính mình.',
            cause: 'Mặt Trời tại Thiên Bình — Venus cai quản, cân bằng, hài hòa, thẩm mỹ.',
            tip: 'Tập nói "tôi muốn" thay vì luôn hỏi "mọi người muốn gì?". Ý kiến bạn cũng quan trọng.',
        },
        Scorpio: {
            hook: 'Bạn nhìn xuyên qua mọi lớp vỏ — và không phải ai cũng sẵn sàng bị nhìn thấu.',
            effectParagraphs: ['Bọ Cạp cho bạn chiều sâu tâm hồn mà ít người sánh kịp. Bạn không làm gì nửa vời — yêu hết mình, ghét hết mình, chiến đấu hết mình. Sức mạnh biến đổi của bạn là siêu năng lực: bạn phượng hoàng tái sinh sau mỗi cơn bão.'],
            nuance: 'Cường độ quá cao đốt cháy cả bạn lẫn người xung quanh. Biết cách "ha lửa" là nghệ thuật.',
            cause: 'Mặt Trời tại Bọ Cạp — Pluto cai quản, biến đổi, đam mê, sức mạnh ẩn giấu.',
            tip: 'Tìm kênh giải phóng năng lượng: viết lách, võ thuật, nghệ thuật mãnh liệt.',
        },
        Sagittarius: {
            hook: 'Bạn có bản đồ thế giới trong đầu — và danh sách "phải đến" dài hơn cả đời người.',
            effectParagraphs: ['Nhân Mã cho bạn tinh thần phiêu lưu, trí tuệ triết học, và lạc quan bất diệt. Bạn tin vào khả năng vô tận của cuộc sống và truyền niềm tin đó cho mọi người xung quanh. Bạn không sống để tồn tại — bạn sống để khám phá.'],
            nuance: 'Tự do quá mức có thể trở thành vô trách nhiệm. Cam kết cũng là một hình thức tự do cao hơn.',
            cause: 'Mặt Trời tại Nhân Mã — Jupiter cai quản, mở rộng, triết học, phiêu lưu.',
            tip: 'Cam kết vào MỘT mục tiêu lớn 5 năm — cho phiêu lưu có đích đến.',
        },
        Capricorn: {
            hook: 'Bạn đi chậm nhưng bạn luôn đi xa nhất.',
            effectParagraphs: ['Ma Kết cho bạn sự kỷ luật của một chiến binh và tầm nhìn của một kiến trúc sư. Bạn không tin vào may mắn — bạn tin vào effort. Mỗi bước đi đều được tính toán, mỗi quyết định đều hướng đến mục tiêu dài hạn.'],
            nuance: 'Quá nghiêm túc khiến bạn quên cách vui. Đôi khi, "không có mục tiêu" mới là mục tiêu.',
            cause: 'Mặt Trời tại Ma Kết — Saturn cai quản, kỷ luật, tham vọng, trách nhiệm.',
            tip: 'Lập lịch "fun time" — vâng, ngay cả việc vui chơi đôi khi cần được lên kế hoạch!',
        },
        Aquarius: {
            hook: 'Bạn sống ở tương lai — trong khi mọi người vẫn đang tranh cãi về hiện tại.',
            effectParagraphs: ['Bảo Bình cho bạn tư duy đi trước thời đại, tinh thần nhân đạo, và sự độc lập triệt để. Bạn thấy patterns mà người khác mất 10 năm nữa mới nhận ra. Bạn không weird — bạn chỉ đang ở một timeline khác.'],
            nuance: 'Thông minh khác với kết nối. Đừng để trí tuệ ngăn bạn cảm nhận cảm xúc.',
            cause: 'Mặt Trời tại Bảo Bình — Uranus cai quản, đổi mới, nhân đạo, cách mạng.',
            tip: 'Tìm cộng đồng những người "weird" như bạn — bạn sẽ thấy mình không cô đơn.',
        },
        Pisces: {
            hook: 'Bạn cảm nhận thế giới bằng những tần số mà hầu hết mọi người không biết tồn tại.',
            effectParagraphs: ['Song Ngư cho bạn tâm hồn nghệ sĩ, trực giác siêu nhiên, và lòng trắc ẩn vô bờ. Bạn cảm nhận nỗi đau của người khác như chính nỗi đau của mình. Sáng tạo, mơ mộng, và đầy cảm hứng — bạn thấy cái đẹp ở những nơi tối tăm nhất.'],
            nuance: 'Nhạy cảm quá mức khiến bạn dễ bị tổn thương. Xây dựng "vỏ bọc cảm xúc" là kỹ năng sinh tồn.',
            cause: 'Mặt Trời tại Song Ngư — Neptune cai quản, tâm linh, sáng tạo, đồng cảm.',
            tip: 'Ghi lại giấc mơ mỗi sáng — phần lớn insight tốt nhất của bạn đến từ tiềm thức.',
        },
    },
};
