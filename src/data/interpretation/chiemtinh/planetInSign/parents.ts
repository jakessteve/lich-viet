/**
 * Chiêm Tinh Narrative Data — Parents (Planet-in-Sign)
 *
 * ETC-format narratives for Saturn (Phụ Mẫu / Parents / Authority figures) in zodiac signs.
 */

import type { ETCNarrative } from '../../../../services/interpretation/types';

export type PlanetSignParentsMap = Record<string, Record<string, ETCNarrative>>;

export const CHIEMTINH_PARENTS_NARRATIVES: PlanetSignParentsMap = {
    Saturn: {
        Aries: {
            hook: 'Bạn học được tính tự lập thông qua những va chạm và thách thức với thế hệ trước.',
            effectParagraphs: ['Di sản lớn nhất mà cha mẹ hoặc những người đi trước để lại cho bạn không phải là một con đường trải hoa hồng, mà là sự rèn luyện ý chí sinh tồn. Saturn ở Bạch Dương cho thấy mô hình giáo dục đôi khi nóng nảy, độc đoán nhưng lại đào tạo ra một "chiến binh" là bạn.'],
            nuance: 'Sự kháng cự quá mức chống lại quyền uy có thể khiến bạn mất đi những lời khuyên chân thành.',
            cause: 'Saturn (Kỷ luật, Gia trưởng) tại Bạch Dương (Hành động, Cái tôi) là vị trí fall (suy yếu), thiếu sự mềm mại cần thiết.',
            tip: 'Ngừng tranh cãi để khẳng định bản thân. Sự trưởng thành của bạn chứng minh tất cả.',
        },
        Taurus: {
            hook: 'Giá trị vật chất và sự kiên định là nền tảng mà gia đình truyền lại cho bạn.',
            effectParagraphs: ['Một tuổi thơ có phần bảo thủ nhưng an toàn về vật chất. Bạn học được bài học về quản lý tài sản, giá trị của lao động bền bỉ từ những người dưỡng dục. Khung giáo dục của bạn xoay quanh "có làm mới có ăn."'],
            nuance: 'Tư duy "vật chất thay thế tình cảm" có thể tạo khoảng cách thế hệ nếu bạn không biết biểu đạt yêu thương.',
            cause: 'Saturn (Kỷ luật) kết hợp Kim Ngưu (Vật chất) tạo nên bộ khung nguyên tắc thực tế, bền vững.',
            tip: 'Đừng ngại từ chối các mô hình kinh doanh cũ của gia đình để tự xây dựng giá trị riêng của bạn.',
        },
        Gemini: {
            hook: 'Giao tiếp và trí thức là cầu nối — và cũng là bài kiểm tra — giữa bạn và cha mẹ.',
            effectParagraphs: ['Saturn tại Song Tử đòi hỏi khắt khe về việc học thuật và sự nhạy bén trí tuệ. Gia đình kỳ vọng bạn phải nói giỏi, học giỏi, phân tích giỏi. Mối quan hệ thường mang tính "tranh luận logic" hơn là "chia sẻ cảm xúc".'],
            nuance: 'Dễ bị chỉ trích về lời ăn tiếng nói, đôi khi bạn tự tạo áp lực phải biết tuốt mọi thứ để được công nhận.',
            cause: 'Saturn (Giới hạn, Trách nhiệm) tại Song Tử (Giao tiếp) đặt ra bài thi khó về cách bạn tương tác thông tin.',
            tip: 'Ghi nhật ký thay vì tranh luận đúng sai; thấu cảm tốt hơn là lúc nào cũng phải thắng trong một cuộc cãi vã.',
        },
        Cancer: {
            hook: 'Những bài học lớn nhất của bạn nằm ở việc xây dựng ranh giới cảm xúc với gia đình.',
            effectParagraphs: ['Saturn ở Cự Giải (vị trí detriment) cho thấy đôi khi nhà không phải là nơi thoải mái nhất. Bạn có thể từng cảm thấy thiếu thốn sự vỗ về, hoặc ngược lại, bị ngộp thở bởi sự bao bọc quá mức theo kiểu trách nhiệm. Bạn gánh vác cảm xúc của người lớn từ khi còn rất nhỏ.'],
            nuance: 'Những vết thương tâm lý tuổi thơ chính là động lực để bạn tự tạo ra một mái ấm lành mạnh hơn cho thế hệ sau.',
            cause: 'Saturn (Lạnh lẽo, Cố định) đè nặng lên Cự Giải (Nuôi dưỡng, Nước) hạn chế sự tuôn chảy tự nhiên của tình thân.',
            tip: 'Bạn không có trách nhiệm phải chữa lành tâm lý cho cha mẹ mình. Hãy học cách yêu thương với một "khoảng cách an toàn".',
        },
        Leo: {
            hook: 'Sự công nhận là phần thưởng đắt giá mà bạn phải nỗ lực rất nhiều để nhận được từ người lớn.',
            effectParagraphs: ['Bạn lớn lên dưới cái bóng của sự kỳ vọng cao (và có thể là cái tôi lớn của cha/mẹ). Họ muốn bạn phải xuất sắc, phải đứng đầu, phải là niềm tự hào. Bạn học được khả năng lãnh đạo thông qua áp lực phải chứng tỏ bản thân không ngừng nghỉ.'],
            nuance: 'Tự ái tổn thương khi bị phê bình có thể xây dựng nên một tâm thế "tình địch" ngầm với chính người sinh thành.',
            cause: 'Saturn tại Sư Tử (vị trí detriment) tạo sức ép lên cái tôi, làm thui chột phần nào sự hồn nhiên của đứa trẻ bên trong.',
            tip: 'Bạn rực rỡ theo cách của riêng bạn, dù có ai vỗ tay hay không.',
        },
        Virgo: {
            hook: 'Nguyên tắc, sự hoàn hảo và tinh thần trách nhiệm là di sản được di truyền.',
            effectParagraphs: ['Dưới vòm trời của Xử Nữ, giáo dục gia đình mang đậm tính phân tích và đôi chút chi li. Cha mẹ dạy bạn cách sắp xếp cuộc sống ngăn nắp, làm việc chuyên cần và có đạo đức nghề nghiệp tuyệt vời. Bạn trân trọng lao động và kỷ luật.'],
            nuance: 'Quá khứ hay bị bới móc khuyết điểm có thể khiến bạn trở thành một kẻ thù nguy hiểm của chính mình (self-criticism).',
            cause: 'Saturn (Trách nhiệm) gặp gỡ Xử Nữ (Chi tiết, Phục vụ) đồng thuận tạo nên một cỗ máy vận hành công việc siêu việt.',
            tip: 'Cho phép bản thân (và cả cha mẹ) được quyền có lúc lộn xộn, sai lầm, và nghỉ ngơi vô điều kiện.',
        },
        Libra: {
            hook: 'Sự cân bằng trong gia đình là một điệu nhảy mà bạn phải vất vả học cách bắt nhịp.',
            effectParagraphs: ['Saturn ở Thiên Bình (exaltation - thăng hoa mạnh mẽ) cho thấy gia đình đặt nặng vấn đề thể diện, ngoại giao, và việc giữ gìn hòa khí. Bạn được dạy cách hành xử lịch thiệp, đàm phán sắc bén, và luôn cố gắng không làm phật lòng người khác.'],
            nuance: 'Bên dưới lớp vỏ giao tiếp ôn hòa, có thể ẩn chứa những mâu thuẫn ngầm chưa từng được giải quyết triệt để.',
            cause: 'Saturn (Luật lệ) tại Thiên Bình (Công bằng) khiến các mối quan hệ được quản trị chặt chẽ như một bản hợp đồng đạo đức.',
            tip: 'Hãy dám là "kẻ xấu" trong mắt người khác một lần để bảo vệ ranh giới cá nhân của bạn.',
        },
        Scorpio: {
            hook: 'Gia đình truyền lại cho bạn trực giác sinh tồn và khả năng nhìn thấu những bí mật ngầm.',
            effectParagraphs: ['Saturn tại Bọ Cạp cho thấy hành trình trưởng thành đi qua những cường độ cảm xúc, có thể là sự biến chuyển lớn trong cấu trúc gia đình, hoặc những bí mật sâu kín. Bạn học được rằng quyền lực và sự tự kiểm soát là chìa khóa bảo vệ bản thân.'],
            nuance: 'Sự nghi ngờ và tâm lý phòng thủ cao độ được hun đúc từ nhỏ khiến bạn luôn đề phòng ngay cả với người thân.',
            cause: 'Saturn (Khởi nguyên) tại Bọ Cạp (Biến đổi, Đáy sâu) gieo áp lực để tạo ra kim cương từ đống tro tàn.',
            tip: 'Buông bỏ hận thù cũ trong thế hệ gia đình là món quà lớn nhất bạn có thể tự tặng mình và con cái.',
        },
        Sagittarius: {
            hook: 'Triết lý sống, tôn giáo hoặc học thức cao là tài sản quý giá nhất gia đình để lại.',
            effectParagraphs: ['Saturn ở Nhân Mã đặt trọng tâm giáo dục vào bức tranh lớn: niềm tin, đạo đức, và tầm nhìn. Cha mẹ có thể là những người mang tư tưởng giáo lý, đòi hỏi bạn tuân thủ một hệ tư tưởng hoặc con đường học vấn cụ thể.'],
            nuance: 'Sợ hãi bước khỏi vùng an toàn tâm linh/đạo đức gia đình, bạn có lúc phải đấu tranh gay gắt để sống đúng với chân lý riêng.',
            cause: 'Saturn (Cấu trúc) kìm hãm phần nào sự bay bổng của Nhân Mã (Tự do), ép mộng tưởng vào khuôn phép tín ngưỡng.',
            tip: 'Tôn trọng truyền thống không có nghĩa là lặp lại nó. Hãy dũng cảm viết nên quyển sách triết lý của riêng bạn.',
        },
        Capricorn: {
            hook: 'Cha mẹ là hiện thân của quyền uy, tổ chức, và những bậc thang danh vọng.',
            effectParagraphs: ['Nhà trị vì Saturn bơi trong biển riêng của Ma Kết (domicile), xây dựng một môi trường gia đình cực kỳ khuôn phép. Hình mẫu phụ huynh thường thành đạt nhưng xa cách. Bài học lớn nhất: địa vị, nỗ lực và sự kiên nhẫn quyết định thành tựu.',],
            nuance: 'Gánh nặng phải kế tục hoặc bù đắp cho những tham vọng dang dở của cha mẹ đôi khi tước đoạt sự nhẹ nhõm của tuổi thơ.',
            cause: 'Saturn tại Ma Kết hoạt động mạnh nhất — củng cố hệ thống cấp bậc gia tộc và kỳ vọng xã hội khắc nghiệt.',
            tip: 'Thành tựu của bạn không phải là công cụ trả nợ cho thế hệ trước. Đỉnh núi bạn leo phải là ngọn núi của chính mình.',
        },
        Aquarius: {
            hook: 'Khoảng cách là chất keo kết nối bạn với những người dưỡng dục.',
            effectParagraphs: ['Tại Bảo Bình (domicile truyền thống), Saturn mang đến cách giáo dục độc đáo, có phần lập dị hoặc lý trí. Gia đình có thể cho bạn rất nhiều tự do, nhưng lại e dè trong việc bộc lộ tình cảm gắn bó. Bạn học được tinh thần nhân đạo và tư duy độc lập mãnh liệt.'],
            nuance: 'Sự rời rạc trong mối liên kết gia đình khiến bạn thường cảm thấy mình giống một "người ngoài hành tinh" rơi xuống nhầm tổ.',
            cause: 'Saturn (Nguyên lý) gặp Bảo Bình (Tách biệt) duy trì trật tự thông qua luật lệ khách quan thay vì hơi ấm tình thâm.',
            tip: 'Gia đình không nhất thiết phải chung huyết thống. Hãy tự hào về "Gia đình do bạn tự chọn" (chosen family).',
        },
        Pisces: {
            hook: 'Bạn tiếp thu được lòng trắc ẩn qua những sự hy sinh và nỗi đau vô hình từ cha mẹ.',
            effectParagraphs: ['Saturn tại Song Ngư trải một bức màn mờ sương lên cấu trúc gia đình. Cha mẹ có thể là những người nghệ sĩ, người hướng nội, hoặc từng đi qua nhiều mất mát. Bài học của bạn là sự đồng cảm, trực giác, và cách xoa dịu vết thương cho người yếu thế.'],
            nuance: 'Thiếu vắng một hình mẫu kỷ luật thép, bạn dễ bị lạc lối hoặc mang tâm lý trở thành "vị cứu tinh" (savior complex) cho những rắc rối của gia đình.',
            cause: 'Saturn (Thực tế) chìm trong biển nước Song Ngư (Ảo mộng) làm tan chảy các ranh giới giáo dục truyền thống.',
            tip: 'Học cách nói KHÔNG. Ranh giới khắt khe là điều kiện tiên quyết để lòng tốt không bị bào mòn.',
        },
    },
};
