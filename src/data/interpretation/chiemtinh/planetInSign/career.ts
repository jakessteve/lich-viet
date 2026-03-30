/**
 * Chiêm Tinh Narrative Data — Career (Planet-in-Sign)
 *
 * ETC-format narratives for Mars in signs — the primary career/drive indicator.
 * Mars represents ambition, work style, and how one pursues professional goals.
 *
 * Psychology: Narrative Transportation + Barnum Effect for career identity resonance
 */

import type { ETCNarrative } from '@/services/interpretation/types';

export type PlanetSignCareerMap = Record<string, Record<string, ETCNarrative>>;

export const CHIEMTINH_CAREER_NARRATIVES: PlanetSignCareerMap = {
    Mars: {
        Aries: {
            hook: 'Bạn làm việc như chiến binh xung trận — nhanh, quyết đoán, và luôn muốn dẫn đầu.',
            effectParagraphs: [
                'Mars tại Bạch Dương — domicile, vị trí mạnh nhất. Bạn có bản năng khởi nghiệp, khả năng ra quyết định trong tích tắc, và năng lượng làm việc dường như vô tận. Bạn không chờ ai giao việc — bạn tự tìm việc, tự giải quyết, và tự chịu trách nhiệm.',
                'Trong môi trường cạnh tranh, bạn tỏa sáng nhất. Áp lực không khiến bạn sợ — nó khiến bạn hưng phấn. Bạn phù hợp với vai trò tiên phong: founder, sales leader, hoặc bất kỳ vị trí nào đòi hỏi tốc độ và gan dạ.',
                'Điều đặc biệt là bạn có khả năng "đốt cháy giai đoạn" — thăng tiến nhanh hơn quy trình thông thường nhờ bản lĩnh và thành tích thực tế.',
            ],
            nuance: 'Nhanh là tốt, nhưng đốt cháy giai đoạn đôi khi bỏ sót nền tảng. Đảm bảo rằng tốc độ thăng tiến đi kèm với chiều sâu năng lực.',
            cause: 'Mars domicile tại Bạch Dương — sao chiến đấu ở nhà, năng lượng thuần khiết nhất cho hành động và khởi xướng.',
            tip: 'Tìm một mentor có kinh nghiệm — họ sẽ giúp bạn "đốt cháy giai đoạn" mà không bị bỏng.',
        },
        Taurus: {
            hook: 'Bạn xây sự nghiệp như xây tháp — chậm rãi nhưng mỗi viên gạch đều chắc chắn.',
            effectParagraphs: [
                'Mars tại Kim Ngưu cho bạn sự kiên trì hiếm có trong công việc. Trong khi người khác nhảy việc liên tục, bạn đi sâu và xây dựng chuyên môn vững chắc. Kết quả? Bạn trở thành người không thể thay thế trong lĩnh vực của mình.',
                'Bạn đặc biệt giỏi trong các công việc đòi hỏi sự ổn định và tạo ra giá trị hữu hình: bất động sản, tài chính, sản xuất, hoặc ẩm thực.',
                'Sự nghiệp với bạn gắn liền với an toàn tài chính — bạn không mạo hiểm vô lối, mà đầu tư có tính toán.',
            ],
            nuance: 'Ổn định quá mức có thể trở thành trì trệ. Thế giới thay đổi nhanh — đôi khi cần học kỹ năng mới ngay cả khi "chưa cần".',
            cause: 'Mars tại Kim Ngưu — detriment, năng lượng hành động bị chậm lại nhưng bền bỉ và có mục đích.',
            tip: 'Mỗi năm, đầu tư vào 1 kỹ năng mới ngoài vùng an toàn — đây là bảo hiểm sự nghiệp.',
        },
        Gemini: {
            hook: 'Bạn thành công nhờ multi-tasking — trong khi người khác chật vật với 1 dự án, bạn juggle 5.',
            effectParagraphs: [
                'Mars Song Tử cho bạn khả năng thích ứng siêu nhanh. Bạn chuyển đổi giữa các task, dự án, và vai trò một cách linh hoạt. Giao tiếp là vũ khí sự nghiệp: thuyết trình, đàm phán, viết lách — tất cả đều mạnh.',
                'Bạn phù hợp với ngành truyền thông, marketing, giáo dục, tư vấn — bất kỳ vai trò nào đòi hỏi sự nhanh nhạy về thông tin.',
                'Networking tự nhiên như thở — bạn biết đúng người, đúng lúc, và biết cách kết nối họ với nhau.',
            ],
            nuance: 'Multi-tasking giỏi không có nghĩa là phải multi-task mãi mãi. Đôi khi deep work trên 1 dự án mang lại giá trị gấp 10 lần.',
            cause: 'Mars tại Song Tử — hành động nhanh, linh hoạt, qua giao tiếp và trí tuệ.',
            tip: 'Áp dụng quy tắc 80/20: 80% thời gian cho 1-2 dự án chính, 20% cho khám phá.',
        },
        Cancer: {
            hook: 'Bạn làm việc với trái tim — và chính cảm xúc đó tạo nên sự khác biệt trong sự nghiệp.',
            effectParagraphs: [
                'Mars Cự Giải cho bạn bản năng bảo vệ trong công việc: bảo vệ team, bảo vệ dự án, bảo vệ chất lượng. Bạn làm việc không chỉ vì tiền — mà vì cảm giác thuộc về và đóng góp có ý nghĩa.',
                'Bạn phù hợp với các ngành chăm sóc: y tế, giáo dục, HR, food & beverage, hoặc bất kỳ lĩnh vực nào "nuôi dưỡng" người khác.',
            ],
            nuance: 'Cảm xúc trong công việc là thế mạnh, nhưng đừng để nó biến thành phản ứng impulse. Hít thở trước khi reply email.',
            cause: 'Mars tại Cự Giải — fall, năng lượng hành động được lọc qua cảm xúc và trực giác.',
            tip: 'Xây dựng môi trường làm việc an toàn tâm lý — bạn productive nhất khi cảm thấy được tin tưởng.',
        },
        Leo: {
            hook: 'Sự nghiệp bạn là sân khấu — và bạn sinh ra để đứng dưới spotlight.',
            effectParagraphs: [
                'Mars Sư Tử cho bạn ambition lớn + charisma tự nhiên. Bạn không hài lòng với vị trí tầm trung — bạn muốn đứng đầu, dẫn dắt, và được công nhận. Điều tuyệt vời là bạn có năng lực thực sự để back up tham vọng đó.',
                'Sáng tạo, truyền cảm hứng, lãnh đạo — đây là 3 keyword sự nghiệp. Bạn phù hợp với entertainment, fashion, management, hoặc entrepreneurship.',
                'Bạn dẫn dắt không bằng command, mà bằng inspiration — người ta đi theo bạn vì muốn, không phải vì phải.',
            ],
            nuance: 'Ego quá lớn có thể blind-spot bạn trước feedback quan trọng. Lãnh đạo vĩ đại biết lắng nghe.',
            cause: 'Mars tại Sư Tử — lửa gặp lửa, tham vọng rực cháy, sáng tạo mãnh liệt.',
            tip: 'Build một inner circle gồm người dám nói "sếp ơi, ý này chưa ok" — đó là vàng.',
        },
        Virgo: {
            hook: 'Bạn leo career ladder bằng sự chính xác — mỗi chi tiết đều được tính toán hoàn hảo.',
            effectParagraphs: [
                'Mars Xử Nữ biến bạn thành "máy hoàn thiện". Bạn không chỉ hoàn thành công việc — bạn hoàn thiện nó đến từng chi tiết nhỏ nhất. Quality là danh thiếp của bạn.',
                'Phân tích, tối ưu hóa, troubleshooting — bạn giải quyết vấn đề mà người khác không nhìn thấy. Phù hợp: engineering, healthcare, data analysis, quality assurance.',
            ],
            nuance: 'Perfection là kẻ thù của hoàn thành. Đôi khi "done is better than perfect" — ship trước, improve sau.',
            cause: 'Mars tại Xử Nữ — hành động cẩn thận, phương pháp, và có hệ thống.',
            tip: 'Set "good enough" threshold cho mỗi task — giải phóng thời gian cho điều quan trọng hơn.',
        },
        Libra: {
            hook: 'Bạn thăng tiến nhờ quan hệ — mạng lưới chuyên nghiệp là tài sản lớn nhất.',
            effectParagraphs: [
                'Mars tại Thiên Bình — detriment, nhưng có lợi thế đặc biệt: ngoại giao. Bạn xử lý xung đột trong workplace mà không ai bị tổn thương. Partnership, hợp tác, co-creation là mô hình bạn tỏa sáng nhất.',
                'Phù hợp: law, diplomacy, PR, design, consulting — nơi cần cân bằng nhiều bên.',
            ],
            nuance: 'Tránh conflict có thể dẫn đến tránh ra quyết định khó. Leadership đôi khi cần gây "sóng".',
            cause: 'Mars tại Thiên Bình — detriment, hành động qua hợp tác và cân bằng.',
            tip: 'Thực hành "productive disagreement" — phản đối một cách xây dựng là kỹ năng cần học.',
        },
        Scorpio: {
            hook: 'Bạn làm việc với cường độ mà ít ai theo kịp — khi bạn muốn điều gì, không gì cản nổi.',
            effectParagraphs: [
                'Mars tại Bọ Cạp — traditional domicile, sức mạnh ngầm. Bạn không show off — bạn build power âm thầm rồi ra tay decisive. Strategic, persistent, and absolutely unstoppable khi đã set mục tiêu.',
                'Khủng hoảng? Bạn thrive. Chính những giai đoạn khó khăn nhất làm bạn mạnh nhất. Phù hợp: finance, investigation, psychology, surgery, crisis management.',
                'Bạn đọc "power dynamics" trong workplace cực giỏi — biết ai nắm quyền thực sự, ai đang bluff.',
            ],
            nuance: 'Sức mạnh lớn cần đi kèm đạo đức. Cám dỗ "manipulation" luôn có — hãy chọn con đường sáng.',
            cause: 'Mars tại Bọ Cạp — traditional rulership, quyền lực ngầm, biến đổi qua khủng hoảng.',
            tip: 'Channel competitive energy vào mục tiêu lớn thay vì chính trị nội bộ — tầm nhìn xa hơn.',
        },
        Sagittarius: {
            hook: 'Sự nghiệp bạn là cuộc phiêu lưu — công việc lý tưởng khiến bạn vừa kiếm tiền vừa khám phá.',
            effectParagraphs: [
                'Mars Nhân Mã cho bạn tầm nhìn toàn cầu trong sự nghiệp. Bạn không bó hẹp trong biên giới — bạn nghĩ big, act bold, và luôn tìm kiếm ý nghĩa lớn hơn trong công việc.',
                'Phù hợp: international business, education, publishing, travel industry, philosophy, coaching.',
            ],
            nuance: 'Big picture tuyệt vời nhưng detail cũng quan trọng. Đôi khi "the devil is in the detail".',
            cause: 'Mars tại Nhân Mã — mở rộng, triết học, hành động với mục đích lớn lao.',
            tip: 'Partner with một Virgo/Capricorn friend cho execution — bạn lo strategy, họ lo chi tiết.',
        },
        Capricorn: {
            hook: 'Bạn leo đến đỉnh — không phải vì may mắn, mà vì bạn kiên trì hơn tất cả.',
            effectParagraphs: [
                'Mars tại Ma Kết — exaltation, vị trí mạnh nhất cho ambition. Bạn có kỷ luật thép, tầm nhìn dài hạn, và sự kiên nhẫn chiến lược. Bạn chấp nhận "slow and steady" vì biết rằng đỉnh cao không từ trên trời rơi xuống.',
                'CEO, đầu tư dài hạn, xây dựng hệ thống, chính sách — bạn phù hợp với những vị trí đòi hỏi sự bền bỉ và uy tín.',
                'Đặc biệt, bạn càng già càng thành công — năng lượng Ma Kết "ripen with age".',
            ],
            nuance: 'All work no play makes Jack a dull boy. Cân bằng cuộc sống cũng là kỹ năng sự nghiệp.',
            cause: 'Mars exaltation tại Ma Kết — hành động kỷ luật, tham vọng dài hạn, quyền lực bền vững.',
            tip: 'Block lịch "not-working" — nghỉ ngơi đúng cách giúp bạn làm việc hiệu quả gấp đôi.',
        },
        Aquarius: {
            hook: 'Bạn không đi theo career path — bạn phát minh ra career path mới.',
            effectParagraphs: [
                'Mars Bảo Bình cho bạn tư duy cách mạng trong công việc. Bạn nhìn ra cơ hội ở nơi người khác thấy rủi ro. Innovation, technology, social enterprise — bạn build things that didn\'t exist before.',
                'Bạn làm việc tốt nhất trong team đa dạng, với mission rõ ràng, và đủ tự do để thử nghiệm.',
            ],
            nuance: 'Quá khác biệt có thể dẫn đến cô lập. Cách mạng cần allies — build coalition.',
            cause: 'Mars tại Bảo Bình — hành động vì tập thể, đổi mới, phá vỡ quy tắc cũ.',
            tip: 'Tìm "early adopters" cho ý tưởng — 5 người tin trước dẫn đến 5000 người theo sau.',
        },
        Pisces: {
            hook: 'Sự nghiệp bạn được dẫn dắt bởi trực giác — và trực giác đó hiếm khi sai.',
            effectParagraphs: [
                'Mars Song Ngư cho bạn khả năng sáng tạo vô hạn và trực giác kinh doanh đặc biệt. Bạn "cảm" được trend trước khi data xác nhận. Nghệ thuật, healing, content creation, non-profit — nơi sáng tạo gặp mục đích.',
                'Bạn không cần competitive environment — bạn cần meaningful environment.',
            ],
            nuance: 'Trực giác cần được kiểm chứng bằng data. "I feel" + "Data shows" = unbeatable combo.',
            cause: 'Mars tại Song Ngư — hành động qua trực giác, sáng tạo, và lòng trắc ẩn.',
            tip: 'Keep a "intuition journal" — ghi lại linh cảm và xem bao nhiêu % chính xác. Bạn sẽ ngạc nhiên.',
        },
    },
};
