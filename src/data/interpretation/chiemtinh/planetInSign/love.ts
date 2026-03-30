/**
 * Chiêm Tinh Narrative Data — Love (Planet-in-Sign)
 *
 * ETC-format narratives for Venus in signs — the primary love indicator.
 * Golden seed: Venus in 12 zodiac signs with love/relationship focus.
 */

import type { ETCNarrative } from '@/services/interpretation/types';

export type PlanetSignLoveMap = Record<string, Record<string, ETCNarrative>>;

export const CHIEMTINH_LOVE_NARRATIVES: PlanetSignLoveMap = {
    Venus: {
        Aries: {
            hook: 'Bạn yêu như chiến binh — nhanh, mãnh liệt, và không bao giờ nhàm chán.',
            effectParagraphs: ['Venus Bạch Dương khiến bạn theo đuổi tình yêu chủ động. Bạn thích thử thách, thích "chinh phục", và sợ nhất là SỰ BUỒN TẺ. Mối quan hệ với bạn phải luôn có một cuộc phiêu lưu mới.'],
            nuance: 'Đam mê ban đầu rồi sẽ nguội — nhưng tình yêu thực sự bắt đầu SAU khi lửa bớt cháy.',
            cause: 'Venus tại Bạch Dương — detriment, yêu bốc đồng, đam mê nhưng thiếu kiên nhẫn.',
            tip: 'Tìm partner cũng thích phiêu lưu — nhưng thêm cam kết làm neo giữ.',
        },
        Taurus: {
            hook: 'Bạn yêu chậm và sâu — loại tình yêu mà 50 năm sau vẫn thấy ấm.',
            effectParagraphs: ['Venus tại Kim Ngưu — vị trí domicile, mạnh nhất. Bạn yêu bằng hành động, không bằng lời nói. Nấu ăn cho người yêu, massage khi họ mệt, nhớ từng món ăn họ thích. Tình yêu với bạn là CẢM GIÁC — touch, taste, comfort.'],
            nuance: 'Possessive là rủi ro lớn nhất. Yêu không có nghĩa là SỞ HỮU.',
            cause: 'Venus tại Kim Ngưu — domicile, ngôn ngữ tình yêu vật chất, trung thành tuyệt đối.',
            tip: 'Nói "anh/em yêu em/anh" BẰNG LỜI — vì không phải ai cũng đọc được hành động.',
        },
        Gemini: {
            hook: 'Bạn cần tình yêu vừa lãng mạn vừa trí tuệ — flirt bằng đầu óc mới thu hút bạn.',
            effectParagraphs: ['Với bạn, cuộc trò chuyện hay HƠN bông hồng đẹp. Bạn cần partner nói chuyện thú vị, biết đùa, biết tranh luận. Tình yêu với bạn phải "light" — không drama, không nặng nề. Bạn yêu bằng texts dài, surprises nhỏ, và sense of humor.'],
            nuance: 'Nhẹ nhàng đôi khi bị hiểu lầm là không nghiêm túc. Hãy cho đối phương biết bạn xem trọng họ.',
            cause: 'Venus tại Song Tử — tình yêu qua giao tiếp, đa dạng, linh hoạt.',
            tip: 'Viết tình thư (dù là text) — đây là cách tự nhiên nhất bạn thể hiện tình cảm.',
        },
        Cancer: {
            hook: 'Bạn yêu như mẹ chăm con — toàn tâm, toàn ý, và luôn lo lắng liệu họ có ổn không.',
            effectParagraphs: ['Venus Cự Giải cho bạn tình yêu sâu sắc nhất — loại nuôi dưỡng, bảo vệ, và chữa lành. Bạn nhớ ngày kỷ niệm, nấu cháo khi người yêu ốm, và luôn có "safe space" cho họ trở về.'],
            nuance: 'Chăm sóc quá mức có thể khiến đối phương cảm thấy bị kiểm soát. Yêu thương ≠ lo lắng.',
            cause: 'Venus tại Cự Giải — tình yêu nuôi dưỡng, gia đình-centered.',
            tip: 'Phân biệt "lo cho người yêu" và "lo lắng quá mức". Tin tưởng họ tự chăm sóc bản thân được.',
        },
        Leo: {
            hook: 'Bạn yêu như một vở nhạc kịch — rực rỡ, hào nhoáng, và xứng đáng được đứng giữa sân khấu.',
            effectParagraphs: ['Với Venus Sư Tử, tình yêu phải ĐẶC BIỆT. Bạn surprise bằng quà khủng, romantic dinner, và những declaration of love làm đối phương ngỡ ngàng. Bạn hào phóng trong tình cảm — cho đi tất cả.'],
            nuance: 'Đôi khi tình yêu đơn giản mới bền. Không cần mỗi ngày là Valentine.',
            cause: 'Venus tại Sư Tử — dramatic, hào phóng, proud love.',
            tip: 'Chấp nhận rằng đối phương thể hiện tình yêu KHÁC bạn — và cách của họ cũng valid.',
        },
        Virgo: {
            hook: 'Bạn yêu bằng hành động cụ thể — sửa laptop, giặt đồ, nhớ lịch khám bệnh.',
            effectParagraphs: ['Venus Xử Nữ — kiểu tình yêu "practical". Bạn chăm sóc bằng việc nhỏ nhưng rất tinh tế. Bạn nhớ partner thích cafe loại gì, dị ứng gì, hay quen ngủ bên nào.'],
            nuance: 'Service love tuyệt vời — nhưng đôi khi partner chỉ cần một câu "anh/em yêu em/anh".',
            cause: 'Venus tại Xử Nữ — fall/detriment, yêu bằng hành động, đôi khi quá critical.',
            tip: 'Mỗi ngày nói MỘT lời yêu thương rõ ràng — không mặc định họ "biết rồi".',
        },
        Libra: {
            hook: 'Bạn sinh ra để yêu — và yêu bạn là được sống trong bức tranh đẹp nhất.',
            effectParagraphs: ['Venus tại Thiên Bình — domicile, vị trí mạnh nhất cho tình yêu. Bạn tạo ra harmony trong mối quan hệ: cân bằng, fair, và luôn xem xét từ góc nhìn đối phương. Romantic, tinh tế, và biết cách làm người yêu cảm thấy đặc biệt.'],
            nuance: 'Quá muốn harmony có thể dẫn đến avoid conflict — nhưng xung đột lành mạnh giúp mối quan hệ mạnh hơn.',
            cause: 'Venus tại Thiên Bình — domicile, hài hòa, lãng mạn, partnership-oriented.',
            tip: 'Dám nói "em/anh không đồng ý" — tình yêu thực sự chịu được sự thật.',
        },
        Scorpio: {
            hook: 'Bạn yêu với cường độ 1000% — loại tình yêu mà Shakespeare viết về.',
            effectParagraphs: ['Venus Bọ Cạp — all or nothing. Bạn không biết yêu nửa vời. Khi đã yêu, bạn cho đi tâm hồn, và đòi hỏi đối phương cũng vậy. Intimate, passionate, possessive — tình yêu với bạn là cuộc phiêu lưu vào vùng nước sâu nhất.'],
            nuance: 'Ghen tuông mãnh liệt có thể phá hủy chính thứ bạn yêu nhất. Tin tưởng là hành động dũng cảm.',
            cause: 'Venus tại Bọ Cạp — detriment, intense, transformative love.',
            tip: 'Khi ghen, viết ra giấy thay vì nói ngay. Đọc lại sau 24 giờ — thường sẽ tự giải quyết.',
        },
        Sagittarius: {
            hook: 'Bạn cần tình yêu có bầu trời rộng — ngột ngạt là điều bạn không chịu được.',
            effectParagraphs: ['Venus Nhân Mã yêu tự do và phiêu lưu. Bạn cần partner hiểu rằng "đi chơi riêng" không có nghĩa là "không yêu". Tình yêu với bạn là cùng nhau khám phá, cùng nhau phát triển, CÙNG NHAU tự do.'],
            nuance: 'Tự do không có nghĩa là vô trách nhiệm. Cam kết thực sự GIẢI PHÓNG thay vì trói buộc.',
            cause: 'Venus tại Nhân Mã — tình yêu phiêu lưu, triết học, cần không gian.',
            tip: 'Nói rõ boundaries: "Em/Anh cần space NHƯNG em/anh luôn quay về".',
        },
        Capricorn: {
            hook: 'Bạn yêu nghiêm túc, cam kết lâu dài, và không bao giờ nói "yêu" khi không thật.',
            effectParagraphs: ['Venus Ma Kết — tình yêu là investment dài hạn. Bạn chọn người kỹ, yêu chậm, nhưng khi đã yêu thì trung thành tuyệt đối. Bạn có thể building a life cùng nhau — mua nhà, xây sự nghiệp, nuôi con — với sự quyết tâm và kỷ luật.'],
            nuance: 'Đừng để tình yêu trở thành "project management". Đôi khi chỉ cần ôm mà không cần agenda.',
            cause: 'Venus tại Ma Kết — serious love, long-term commitment, practical romance.',
            tip: 'Surprise partner bằng thứ gì đó spontaneous — phá vỡ routine đôi khi là cách yêu tốt nhất.',
        },
        Aquarius: {
            hook: 'Bạn cần tình yêu không bình thường — vì bạn không phải người bình thường.',
            effectParagraphs: ['Venus Bảo Bình — tình yêu phải kết hợp friendship và romance. Bạn cần partner là BFF đồng thời là lover. Bạn yêu chất lượng conversation hơn quà vật chất, giá trị chung hơn ngoại hình. Unconventional love is your love.'],
            nuance: 'Quá "intellectual" trong tình yêu có thể khiến partner cảm thấy bạn lạnh. Hãy cho phép cảm xúc chảy tự do.',
            cause: 'Venus tại Bảo Bình — detriment, tình yêu trí tuệ, khác biệt, nhân đạo.',
            tip: 'Physical affection cũng quan trọng — ôm, nắm tay, vuốt tóc. Love không chỉ ở trong đầu.',
        },
        Pisces: {
            hook: 'Bạn yêu như thở — tự nhiên, vô điều kiện, và bao la đến mức đối phương đôi khi hoảng.',
            effectParagraphs: ['Venus Song Ngư — exaltation, vị trí yêu mạnh nhất trong hoàng đạo. Bạn yêu vô điều kiện, tha thứ dễ dàng, và nhìn thấy phiên bản TỐT NHẤT của đối phương. Tình yêu với bạn mang tính tâm linh — vượt qua physical, chạm đến soul.'],
            nuance: 'Yêu vô điều kiện đôi khi = bị lợi dụng. Hãy yêu mở lòng NHƯNG mở mắt.',
            cause: 'Venus tại Song Ngư — exaltation, tình yêu thiêng liêng, hy sinh, đồng cảm.',
            tip: 'Trước khi tha thứ, hỏi: "Họ có thực sự hối hận hay chỉ đang nói điều tôi muốn nghe?".',
        },
    },
};
