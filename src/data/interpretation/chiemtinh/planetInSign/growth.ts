/**
 * Chiêm Tinh Narrative Data — Growth & Spirituality (Planet-in-Sign)
 *
 * ETC-format narratives for Jupiter in signs — primary growth/wisdom indicator.
 * Jupiter represents expansion, meaning, philosophy, and spiritual development.
 *
 * Psychology: Zeigarnik Effect (open loops for growth), Narrative Transportation
 */

import type { ETCNarrative } from '@/services/interpretation/types';

export type PlanetSignGrowthMap = Record<string, Record<string, ETCNarrative>>;

export const CHIEMTINH_GROWTH_NARRATIVES: PlanetSignGrowthMap = {
    Jupiter: {
        Aries: {
            hook: 'Hành trình phát triển của bạn đòi hỏi DÁM — dám bắt đầu, dám sai, dám bắt đầu lại.',
            effectParagraphs: [
                'Jupiter Bạch Dương mở rộng tâm linh qua HÀNH ĐỘNG. Bạn không học từ sách — bạn học từ LÀM. Mỗi lần nhảy vào một thử thách mới, tâm hồn bạn mở rộng thêm một chút.',
                'Độc lập tâm linh là keyword: bạn tìm ra "sự thật" cho riêng mình, không theo đám đông.',
                'Bài học lớn nhất: dũng cảm BẮT ĐẦU quan trọng hơn chờ "sẵn sàng".',
            ],
            nuance: 'Hành động thiếu chiêm nghiệm = chạy nhanh nhưng lạc đường. Dừng lại, reflect, rồi chạy tiếp.',
            cause: 'Jupiter tại Bạch Dương — mở rộng qua sáng kiến cá nhân và hành động dũng cảm.',
            tip: 'Sau mỗi thử thách lớn, viết "What did I learn?" — biến kinh nghiệm thành trí tuệ.',
        },
        Taurus: {
            hook: 'Tâm linh bạn gắn liền với thế giới vật chất — vẻ đẹp, thiên nhiên, và giác quan.',
            effectParagraphs: [
                'Jupiter Kim Ngưu tìm thấy Thượng Đế trong bông hoa, bữa ăn ngon, và hoàng hôn. Bạn không cần thiền định phức tạp — chỉ cần ĐI BỘ trong rừng, tay chạm vào vỏ cây, và hít sâu.',
                'Gratitude là con đường tâm linh lớn nhất cho bạn — biết ơn những gì đang có là cách nhanh nhất để nhận thêm.',
            ],
            nuance: 'Materialism ≠ spirituality. Đẹp và thoải mái không sai — nhưng đừng để nó thay thế chiều sâu.',
            cause: 'Jupiter tại Kim Ngưu — mở rộng qua giác quan, thiên nhiên, và gratitude.',
            tip: 'Gratitude journal mỗi tối — 3 điều biết ơn. Simple nhưng life-changing.',
        },
        Gemini: {
            hook: 'Bạn phát triển qua KIẾN THỨC — mỗi cuốn sách, mỗi cuộc trò chuyện đều là một bài học.',
            effectParagraphs: [
                'Jupiter Song Tử — detriment, nhưng có lợi thế đặc biệt: trí tuệ đa chiều. Bạn tổng hợp kiến thức từ nhiều nguồn, nhiều văn hóa, nhiều lĩnh vực — và tạo ra insight độc đáo.',
                'Teaching others = learning deeper. Chia sẻ kiến thức là cách bạn "fix" nó trong tâm trí.',
            ],
            nuance: 'Biết nhiều thứ bề mặt ≠ hiểu sâu. Lúc nào đó, bạn cần chọn MỘT con đường và đi sâu.',
            cause: 'Jupiter tại Song Tử — detriment, mở rộng qua giao tiếp và học nhiều nguồn.',
            tip: 'Teach what you learn — viết blog, làm podcast, hoặc mentor. Dạy = học gấp đôi.',
        },
        Cancer: {
            hook: 'Gia đình và gốc rễ là nền tảng tâm linh — chữa lành quá khứ là bước tiến lớn nhất.',
            effectParagraphs: [
                'Jupiter Cự Giải — exaltation, vị trí mạnh nhất cho tâm linh. Bạn chữa lành bản thân bằng cách chữa lành mối quan hệ với gia đình và quá khứ. Inner child work cực kỳ powerful.',
                'Truyền thống, tổ tiên, và di sản văn hóa là nguồn sức mạnh tâm linh — đừng bỏ qua roots.',
                'Đặc biệt, bạn có khả năng "chữa lành" người khác qua sự đồng cảm — healing is your gift.',
            ],
            nuance: 'Chữa lành quá khứ ≠ sống trong quá khứ. Acknowledge, grieve, release, move forward.',
            cause: 'Jupiter exaltation tại Cự Giải — mở rộng qua gia đình, truyền thống, và chữa lành.',
            tip: 'Thử Inner Child meditation — YouTube có nhiều guided meditations tuyệt vời.',
        },
        Leo: {
            hook: 'Hành trình tâm linh bạn là SÁNG TẠO — bạn thể hiện linh hồn qua nghệ thuật.',
            effectParagraphs: [
                'Jupiter Sư Tử mở rộng qua sáng tạo, tự biểu đạt, và generosity. Bạn tìm thấy meaning khi TẠO RA thứ gì đó đẹp đẽ — tranh vẽ, bài hát, câu chuyện, hoặc khoảnh khắc.',
                'Truyền cảm hứng cho người khác cũng là practicing spirituality — bạn "light up rooms".',
            ],
            nuance: 'Creative expression ≠ ego gratification. Sáng tạo vì joy, không phải vì applause.',
            cause: 'Jupiter tại Sư Tử — mở rộng qua sáng tạo, tự biểu đạt, và hào phóng.',
            tip: 'Mỗi tuần dành 2 giờ cho "creative play" — không mục đích, chỉ vui. Đây là meditation tốt nhất.',
        },
        Virgo: {
            hook: 'Bạn phát triển tâm linh qua PHỤC VỤ — giúp đỡ người khác là cách bạn tìm mình.',
            effectParagraphs: [
                'Jupiter Xử Nữ — detriment, nhưng tìm thấy ý nghĩa qua service. Bạn không cần retreat xa xỉ — helping ONE person, solving ONE problem có thể illumination hơn cả khóa thiền 10 ngày.',
                'Details matter: bạn thấy Thượng Đế trong hạt bụi — đó là microspirituaity.',
            ],
            nuance: 'Service burnout là real. Help others WITHOUT depleting yourself — self-care first.',
            cause: 'Jupiter tại Xử Nữ — detriment, mở rộng qua phục vụ và chú ý chi tiết.',
            tip: 'Volunteer cho một cause bạn quan tâm — 2 giờ/tháng đủ thay đổi worldview.',
        },
        Libra: {
            hook: 'Hành trình phát triển gắn liền với QUAN HỆ — bạn tìm mình qua người khác.',
            effectParagraphs: [
                'Jupiter Thiên Bình mở rộng qua partnership, dialogue, và art. Mỗi mối quan hệ sâu sắc là một giáo viên — even (especially) painful ones.',
                'Aesthetic spirituality: đẹp = thiêng. Bạn kết nối với divine qua art, music, architecture.',
            ],
            nuance: 'Co-dependency ≠ growth. Đôi khi bạn cần đứng một mình để biết mình thực sự muốn gì.',
            cause: 'Jupiter tại Thiên Bình — mở rộng qua quan hệ, thẩm mỹ, và cân bằng.',
            tip: 'Museum visits, art galleries, concerts — aesthetic experiences nuôi dưỡng tâm hồn bạn.',
        },
        Scorpio: {
            hook: 'Bạn phát triển qua BIẾN ĐỔI — mỗi lần "chết đi sống lại" là một level-up tâm linh.',
            effectParagraphs: [
                'Jupiter Bọ Cạp mở rộng qua shadow work, transformation, và depth psychology. Bạn không sợ bóng tối — bạn đào xuống đó tìm vàng. Healing trauma = spiritual advancement.',
                'Occult, mysticism, và psychology — bạn bị thu hút vào những gì ẩn giấu dưới bề mặt.',
                'Khả năng counseling others through crisis là gift — bạn đã đi qua lửa nên biết đường.',
            ],
            nuance: 'Depth nên có giới hạn. Đừng biến shadow work thành addiction — sometimes the light IS the lesson.',
            cause: 'Jupiter tại Bọ Cạp — mở rộng qua biến đổi, depth psychology, và tái sinh.',
            tip: 'Shadow journaling: viết về "parts of me I don\'t show anyone" — acceptance heals.',
        },
        Sagittarius: {
            hook: 'Bạn SINH RA để phát triển — cả cuộc đời là một cuộc tìm kiếm ý nghĩa.',
            effectParagraphs: [
                'Jupiter tại Nhân Mã — domicile, vị trí mạnh nhất. Philosophy, travel, higher education — đây là oxygen cho linh hồn bạn. Bạn tin vào something bigger, và niềm tin đó CHỮA LÀNH.',
                'Multicultural exposure mở rộng tâm trí: mỗi nền văn hóa mới là 1 piece of the cosmic puzzle.',
                'Optimism không phải naïve — nó là spiritual practice. Bạn CHOOSE to see the best.',
            ],
            nuance: 'Searching ≠ finding. Đôi khi ý nghĩa nằm ngay ĐANG Ở — không phải đâu xa.',
            cause: 'Jupiter domicile tại Nhân Mã — mở rộng tối đa qua triết học, travel, và faith.',
            tip: 'Mỗi năm đi 1 nơi hoàn toàn mới — không phải tourist, mà immerse. Đó là spiritual reset.',
        },
        Capricorn: {
            hook: 'Tâm linh bạn xây dựng chậm rãi — nhưng khi xây xong, nó KHÔNG BAO GIỜ sập.',
            effectParagraphs: [
                'Jupiter Ma Kết — fall, nhưng có structured spirituality. Bạn không tin vì "cảm thấy" — bạn tin vì BẢN THÂN đã kiểm chứng. Faith built on experience.',
                'Legacy và mentoring là spiritual practice: giúp thế hệ sau tránh sai lầm bạn đã trải qua.',
            ],
            nuance: 'Quá rigid về spirituality = miss the magic. Đôi khi faith cần leap, not ladder.',
            cause: 'Jupiter tại Ma Kết — fall, spiritual growth qua kỷ luật, kinh nghiệm, và trách nhiệm.',
            tip: 'Stoic philosophy phù hợp: đọc Marcus Aurelius "Meditations" — practical + profound.',
        },
        Aquarius: {
            hook: 'Bạn tìm thấy tâm linh trong CỘNG ĐỒNG — khi giúp collective, bạn tìm thấy mình.',
            effectParagraphs: [
                'Jupiter Bảo Bình mở rộng qua humanitarian work, community, và innovation. Bạn tìm meaning ở FUTURE, không phải past. Technology + spirituality = your frontier.',
                'Group consciousness, collective meditation, eco-spirituality — spirituality of the collective.',
            ],
            nuance: 'Helping humanity ≠ ignoring individuals. Global mission bắt đầu từ kindness to ONE person.',
            cause: 'Jupiter tại Bảo Bình — mở rộng qua cộng đồng, nhân đạo, và tầm nhìn tương lai.',
            tip: 'Join a community of "seekers" — shared spiritual journey multiplies growth.',
        },
        Pisces: {
            hook: 'Bạn là MYSTIC bẩm sinh — kết nối với chiều không gian vô hình một cách tự nhiên.',
            effectParagraphs: [
                'Jupiter tại Song Ngư — traditional domicile, vị trí mạnh nhất cho tâm linh. Bạn không cần AI dạy bạn thiền — bạn đã thiền mà không biết. Giấc mơ, trực giác, synchronicities — tất cả là real ở bạn.',
                'Compassion vô bờ, connection with the divine, và creative channeling — bạn là kênh giữa visible và invisible worlds.',
                'Art, music, water, và silence — đây là portals cho spiritual experiences.',
            ],
            nuance: 'Tâm linh quá mức có thể disconnect khỏi reality. Ground yourself: pay bills, eat well, show up.',
            cause: 'Jupiter tại Song Ngư — traditional rulership, tâm linh tự nhiên, mysticism, compassion.',
            tip: 'Water meditation: ngồi cạnh hồ/sông/biển, nhắm mắt, chỉ nghe nước — trải nghiệm sẽ beyond words.',
        },
    },
};
