/**
 * Numerology Core Meanings — Numbers 1-9, 11, 22, 33
 *
 * Multi-dimensional interpretations with 8 life-domain sections per number.
 * Vietnamese content optimized for depth and engagement.
 */

import type { NumberMeaning } from './types';

export const CORE_MEANINGS: Record<number, NumberMeaning> = {
  1: {
    overview: 'Số 1 là năng lượng của sự khởi đầu, tiên phong và lãnh đạo. Bạn sinh ra với bản năng dẫn dắt — không phải vì muốn quyền lực, mà vì bạn tự nhiên thấy con đường khi người khác còn đang lạc. Tinh thần độc lập của bạn không phải ích kỷ — đó là sự tự tin rằng bạn có thể tạo ra điều gì đó từ hư không. Bạn là người đặt viên gạch đầu tiên, người mở cánh cửa mà không ai dám đẩy. Năng lượng số 1 mạnh mẽ nhất khi bạn trung thành với tầm nhìn của chính mình thay vì chạy theo đám đông.',
    strengths: [
      'Quyết đoán — bạn ra quyết định nhanh và dứt khoát, không lưỡng lự kéo dài.',
      'Sáng tạo — ý tưởng mới luôn xuất hiện trong đầu bạn, đặc biệt khi đối mặt thử thách.',
      'Tự lập — bạn không cần ai thúc đẩy, động lực đến từ bên trong.',
      'Can đảm — bạn dám làm điều người khác chỉ dám nghĩ.',
      'Tập trung — khi đã có mục tiêu, bạn theo đuổi đến cùng với sự kiên định.',
      'Tầm nhìn — bạn nhìn thấy tiềm năng ở nơi người khác thấy rủi ro.',
    ],
    challenges: [
      'Cố chấp — sự quyết đoán đôi khi thành cứng đầu, khó lắng nghe ý kiến khác.',
      'Cô đơn — tinh thần độc lập có thể khiến bạn khó xây dựng quan hệ sâu.',
      'Kiêu ngạo — tự tin quá mức dễ trở thành xem thường người khác.',
      'Thiếu kiên nhẫn — bạn muốn mọi thứ xảy ra ngay, khó chờ đợi quá trình.',
      'Khó ủy quyền — tin rằng "mình làm tốt hơn" khiến bạn ôm đồm mọi việc.',
    ],
    career: 'Bạn tỏa sáng ở vị trí lãnh đạo: CEO, quản lý dự án, khởi nghiệp, sáng lập. Bạn không phù hợp với công việc lặp đi lặp lại hoặc phụ thuộc vào quy trình cứng nhắc. Phong cách làm việc của bạn là tự chủ, đặt mục tiêu cao và tìm cách đạt được bằng con đường riêng. Trong team, bạn tự nhiên trở thành người ra quyết định cuối cùng.',
    love: 'Trong tình yêu, bạn cần đối phương tôn trọng sự độc lập của mình. Bạn yêu mãnh liệt nhưng không thích bị kiểm soát. Kiểu yêu của bạn là "cùng nhau phát triển" — hai cá nhân mạnh mẽ bước song hành. Thử thách lớn nhất là học cách nhượng bộ mà không cảm thấy mất mình. Đối phương lý tưởng là người đủ tự tin để không bị "bóng" của bạn che khuất.',
    health: 'Stress của bạn thường tích tụ ở đầu và tim — đau đầu, huyết áp cao khi căng thẳng kéo dài. Bạn có xu hướng "cắn răng chịu đựng" thay vì nghỉ ngơi, dẫn đến kiệt sức đột ngột. Tập thể dục cường độ cao (chạy bộ, boxing) giúp giải tỏa năng lượng dư thừa. Cần chú ý giấc ngủ — bạn hay thức khuya vì đầu óc hoạt động không ngừng.',
    money: 'Bạn kiếm tiền giỏi nhất khi tự làm chủ hoặc ở vị trí quyết định tài chính. Xu hướng đầu tư mạo hiểm nhưng có tính toán — bạn tin vào bản năng hơn phân tích dài dòng. Chi tiêu phóng khoáng cho những gì bạn coi trọng, tiết kiệm ở những gì không quan trọng. Lời khuyên: xây dựng quỹ khẩn cấp trước khi mạo hiểm lớn.',
    spiritual: 'Bài học tâm linh của số 1 là học cách lãnh đạo bằng tình thương thay vì quyền lực. Bạn đến cuộc đời này để khai phá con đường mới — không chỉ cho mình mà cho cả những người đi sau. Thiền định giúp bạn kết nối với trực giác sâu thay vì chỉ dựa vào lý trí. Con đường phát triển cao nhất là biến sự tự lập thành sự phục vụ.',
  },

  2: {
    overview: 'Số 2 là năng lượng của sự hài hòa, hợp tác và trực giác. Bạn không cần đứng trước spotlight — sức mạnh của bạn nằm ở khả năng kết nối, lắng nghe và cảm nhận những gì người khác không nói ra. Bạn là người dệt nên mối liên kết giữa con người, ý tưởng và cảm xúc. Sự nhạy cảm của bạn không phải điểm yếu — đó là siêu năng lực giúp bạn đọc được năng lượng của căn phòng, hiểu được nhu cầu thầm kín, và tạo ra không gian an toàn cho mọi người.',
    strengths: [
      'Đồng cảm — bạn cảm nhận được cảm xúc người khác một cách tự nhiên và sâu sắc.',
      'Ngoại giao — bạn xử lý xung đột mà không ai bị tổn thương.',
      'Kiên nhẫn — bạn hiểu rằng mọi thứ tốt đẹp cần thời gian.',
      'Trực giác mạnh — bạn "biết" điều gì đó trước khi có bằng chứng.',
      'Hợp tác — bạn làm việc nhóm xuất sắc, nâng tầm cả team.',
      'Chu đáo — bạn nhớ những chi tiết nhỏ mà người khác bỏ qua.',
    ],
    challenges: [
      'Do dự — quá nhạy cảm với mọi góc nhìn khiến bạn khó ra quyết định.',
      'Phụ thuộc — bạn có thể đánh mất mình khi cố gắng làm vui lòng tất cả.',
      'Quá nhạy cảm — lời nói vô ý của người khác có thể ám ảnh bạn rất lâu.',
      'Tránh xung đột — giữ hòa bình bằng mọi giá đôi khi nghĩa là nuốt giận.',
      'Tự ti — bạn dễ đánh giá thấp giá trị của bản thân.',
    ],
    career: 'Bạn tỏa sáng trong vai trò hỗ trợ, tư vấn, nhân sự, trị liệu, ngoại giao, hoặc bất kỳ nghề nào đòi hỏi sự lắng nghe và kết nối. Bạn không cần là CEO — bạn là người mà CEO không thể thiếu. Phong cách làm việc: cẩn thận, chu đáo, chú ý chi tiết. Trong team, bạn là "chất keo" giữ mọi người lại với nhau.',
    love: 'Tình yêu là trung tâm cuộc sống của bạn. Bạn yêu sâu, trung thành và luôn đặt nhu cầu đối phương lên trước. Ngôn ngữ yêu thương của bạn là sự quan tâm — những hành động nhỏ mỗi ngày. Thử thách: học cách yêu chính mình trước khi yêu người khác. Đối phương lý tưởng là người nhận ra và trân trọng sự cho đi âm thầm của bạn.',
    health: 'Hệ thần kinh nhạy cảm khiến bạn dễ bị stress ảnh hưởng đến dạ dày và tiêu hóa. Bạn "hấp thụ" năng lượng tiêu cực từ môi trường, cần thời gian một mình để "xả". Yoga, thiền định và thời gian ở thiên nhiên rất quan trọng. Cần chú ý: đừng bỏ bữa khi stress — cơ thể bạn cần sự ổn định.',
    money: 'Bạn không phải kiểu "đánh nhanh thắng nhanh" — tài chính ổn định đến từ sự kiên nhẫn và hợp tác. Bạn kiếm tiền tốt khi làm việc cùng partner hoặc trong tổ chức. Chi tiêu cân bằng, ít mạo hiểm. Lời khuyên: học nói "không" với những lời vay mượn tình cảm — lòng tốt không nên làm trống ví.',
    spiritual: 'Bài học tâm linh của số 2 là cân bằng giữa cho và nhận. Bạn đến cuộc đời để học rằng hòa bình thật sự bắt đầu từ bên trong. Trực giác mạnh mẽ là món quà — hãy tin tưởng nó nhiều hơn. Con đường phát triển cao nhất là trở thành người chữa lành — không phải sửa chữa người khác, mà tạo không gian để họ tự chữa lành.',
  },

  3: {
    overview: 'Số 3 là năng lượng của sự sáng tạo, biểu đạt và niềm vui sống. Bạn là nghệ sĩ của cuộc đời — không nhất thiết phải vẽ hay hát, mà bạn biến mọi thứ mình chạm vào thành nghệ thuật. Giao tiếp là sức mạnh cốt lõi: bạn có thể khiến người khác cười, khóc, hoặc thay đổi suy nghĩ chỉ bằng lời nói. Năng lượng tích cực của bạn lan tỏa như ánh nắng — bạn bước vào phòng và không khí trở nên nhẹ nhàng hơn. Sáng tạo không phải hobby — đó là cách bạn thở.',
    strengths: [
      'Giao tiếp — bạn diễn đạt ý tưởng theo cách cuốn hút và dễ hiểu.',
      'Lạc quan — bạn tìm thấy mặt tích cực ngay cả trong tình huống khó khăn.',
      'Sáng tạo — ý tưởng tuôn chảy tự nhiên, từ nghệ thuật đến giải pháp công việc.',
      'Duyên dáng — bạn thu hút người khác bằng sự hài hước và năng lượng vui vẻ.',
      'Truyền cảm hứng — bạn khiến người khác tin vào khả năng của họ.',
    ],
    challenges: [
      'Phân tán — quá nhiều ý tưởng khiến bạn khó tập trung hoàn thành một thứ.',
      'Hời hợt — niềm vui bề mặt đôi khi che giấu những cảm xúc sâu cần xử lý.',
      'Tự phê phán — talent nghệ thuật đi kèm tiêu chuẩn cao, dễ tự chê bản thân.',
      'Trốn tránh — dùng humor để tránh đối mặt với vấn đề thật sự.',
      'Thiếu kỷ luật — tự do sáng tạo cần đi kèm với cấu trúc để thành công.',
    ],
    career: 'Bạn tỏa sáng trong truyền thông, marketing, viết lách, giảng dạy, nghệ thuật, thiết kế, hoặc bất kỳ lĩnh vực nào cho phép biểu đạt. Content creator, speaker, MC, nhà văn — đây là sân chơi của bạn. Trong team, bạn là người brainstorm xuất sắc và giữ tinh thần đội nhóm luôn tích cực.',
    love: 'Bạn yêu đầy passion và lãng mạn — surprise, quà tặng, lời nói ngọt ngào là ngôn ngữ tình yêu. Bạn cần đối phương biết thưởng thức cuộc sống và có khiếu hài hước. Thử thách: học cách ở lại khi tình yêu hết mới mẻ — sự sâu sắc đến sau giai đoạn hưng phấn ban đầu.',
    health: 'Cổ họng và hệ hô hấp là vùng cần chú ý — giọng nói là công cụ quan trọng của bạn. Stress thường biểu hiện qua rối loạn ăn uống hoặc mất ngủ vì suy nghĩ quá nhiều. Hoạt động sáng tạo (vẽ, viết, nhảy) là liệu pháp tốt nhất. Cần: lịch ngủ cố định — sáng tạo cần năng lượng ổn định.',
    money: 'Tiền đến với bạn qua sáng tạo và giao tiếp — freelance, kinh doanh sáng tạo, hoặc monetize talent. Chi tiêu hào phóng cho trải nghiệm và thẩm mỹ. Lời khuyên: tự động hóa tiết kiệm — để tiền tự chuyển trước khi bạn kịp tiêu cho những thứ "đẹp mà không cần".',
    spiritual: 'Bài học tâm linh là sử dụng năng khiếu biểu đạt để nâng cao ý thức cộng đồng. Sáng tạo đích thực đến từ sự im lặng nội tâm — học thiền để kết nối với nguồn cảm hứng sâu hơn. Con đường phát triển: biến niềm vui cá nhân thành niềm vui chung.',
  },

  4: {
    overview: 'Số 4 là năng lượng của trật tự, nền tảng và sự xây dựng bền vững. Bạn là kiến trúc sư của cuộc đời — mọi thứ bạn tạo ra đều được xây trên nền móng vững chắc. Trong khi người khác theo đuổi thứ hào nhoáng, bạn hiểu rằng thành công thật sự đến từ kỷ luật, phương pháp và sự kiên nhẫn. Bạn không chạy theo trend — bạn tạo ra những thứ tồn tại khi trend qua đi. Sự đáng tin cậy của bạn là tài sản quý giá nhất.',
    strengths: [
      'Kỷ luật — bạn làm việc có hệ thống và hoàn thành đúng hẹn.',
      'Đáng tin cậy — khi bạn hứa, mọi người biết chắc sẽ xong.',
      'Thực tế — bạn nhìn nhận tình huống rõ ràng, không ảo tưởng.',
      'Kiên nhẫn — bạn hiểu giá trị của thời gian và quá trình.',
      'Chi tiết — bạn phát hiện lỗi mà người khác bỏ sót.',
      'Trung thành — trong công việc và tình cảm, bạn ở lại đến cùng.',
    ],
    challenges: [
      'Cứng nhắc — khó thích ứng khi kế hoạch thay đổi đột ngột.',
      'Bảo thủ — kháng cự cái mới vì sợ phá vỡ sự ổn định.',
      'Workaholic — đặt công việc lên trên sức khỏe và các mối quan hệ.',
      'Hay lo lắng — nhu cầu kiểm soát mọi thứ gây ra stress không cần thiết.',
      'Thiếu linh hoạt — đôi khi "cách tốt nhất" không phải "cách duy nhất".',
    ],
    career: 'Kỹ sư, kế toán, quản lý vận hành, kiến trúc, luật, ngân hàng, hoặc bất kỳ nghề nào đòi hỏi sự chính xác và hệ thống. Bạn là backbone của mọi tổ chức — người biến ý tưởng thành thực tế. Phong cách: cẩn thận, có phương pháp, deadline là thánh.',
    love: 'Bạn yêu kiểu "slow burn" — tình yêu được xây dựng qua hành động nhất quán, không phải lời nói hoa mỹ. Ngôn ngữ tình yêu: hành động phục vụ. Bạn thể hiện tình yêu bằng cách sửa nhà, nấu ăn, lo liệu tài chính. Thử thách: học cách nói "Anh/em yêu" nhiều hơn — đối phương cần nghe, không chỉ thấy.',
    health: 'Xương khớp, lưng và đầu gối là vùng cần chú ý — do tính chất làm việc bền bỉ. Stress tích lũy từ từ vì bạn ít khi "xả". Cần: nghỉ phép đúng lịch (không hủy!), stretching hàng ngày, và thời gian thư giãn không mục đích.',
    money: 'Tài chính ổn định là ưu tiên số 1. Bạn tiết kiệm giỏi, đầu tư an toàn (bất động sản, trái phiếu). Chi tiêu có kế hoạch — spreadsheet ngân sách là bạn thân. Lời khuyên: cho phép mình chi tiêu "vui" 10% thu nhập — không phải mọi đồng đều phải "có ích".',
    spiritual: 'Bài học tâm linh là tìm thấy tự do trong kỷ luật. Bạn đến để xây dựng nền tảng không chỉ cho mình mà cho cả cộng đồng. Thiền đi bộ (walking meditation) phù hợp hơn ngồi thiền. Con đường phát triển: chấp nhận rằng bất toàn cũng là một dạng hoàn hảo.',
  },

  5: {
    overview: 'Số 5 là năng lượng của tự do, phiêu lưu và trải nghiệm đa dạng. Bạn đến cuộc đời để nếm mọi hương vị — du lịch, con người, ý tưởng, cảm xúc. Bạn là linh hồn tự do không thể bị giam giữ trong bất kỳ khuôn khổ nào. Sự thay đổi không khiến bạn sợ — nó khiến bạn hào hứng. Bạn học nhanh nhất qua trải nghiệm thực tế, không phải sách vở. Cuộc sống của bạn là một bộ phim phiêu lưu, và bạn là nhân vật chính luôn sẵn sàng cho chương tiếp theo.',
    strengths: [
      'Thích ứng — bạn xoay sở được trong mọi tình huống bất ngờ.',
      'Đa tài — bạn giỏi nhiều thứ nhờ trải nghiệm đa dạng.',
      'Quyến rũ — năng lượng sống động thu hút mọi người.',
      'Dũng cảm — bạn nói "có" với cơ hội khi người khác do dự.',
      'Tư duy cầu tiến — bạn luôn hướng về phía trước, không mắc kẹt trong quá khứ.',
    ],
    challenges: [
      'Thiếu cam kết — tự do quá mức dẫn đến khó gắn bó lâu dài.',
      'Bốc đồng — quyết định theo cảm xúc nhất thời không phải lúc nào cũng khôn ngoan.',
      'Nghiện kích thích — cần cảm giác mới liên tục, dễ chán với bình thường.',
      'Vô trách nhiệm — khi tự do trở thành lý do để trốn tránh cam kết.',
      'Phân tán — biết nhiều nhưng không sâu ở bất kỳ lĩnh vực nào.',
    ],
    career: 'Du lịch, truyền thông, sales, marketing, event, kinh doanh quốc tế — bất kỳ nghề nào cho phép di chuyển và đổi mới. Bạn tuyệt vời ở vị trí kết nối, đàm phán, và mở rộng thị trường. Freelance hoặc remote work phù hợp hơn 9-to-5.',
    love: 'Bạn cần không gian và sự phiêu lưu trong tình yêu. Đối phương phải hiểu rằng "tự do" không phải "không yêu". Tình yêu lý tưởng: cùng nhau khám phá thế giới. Thử thách: học ở lại khi mọi thứ trở nên bình thường — tình yêu sâu sắc cần thời gian.',
    health: 'Hệ thần kinh hoạt động quá mức — cần cân bằng giữa kích thích và nghỉ ngơi. Dễ gặp vấn đề về cột sống, vai và tay do di chuyển nhiều. Thể thao mạo hiểm giúp giải tỏa, nhưng cần giữ an toàn. Lời khuyên: thiết lập routine tối thiểu — ngay cả linh hồn tự do cũng cần nền tảng.',
    money: 'Tiền đến và đi nhanh — thu nhập không đều nhưng thường có "big wins". Giỏi nắm bắt cơ hội tài chính ngắn hạn. Chi tiêu cho trải nghiệm hơn vật chất. Lời khuyên: tiết kiệm tự động 15-20% — để lý trí quản lý trước khi cảm xúc tiêu hết.',
    spiritual: 'Bài học tâm linh là tìm tự do thật sự bên trong, không phải bên ngoài. Bạn đến để trải nghiệm mọi khía cạnh của cuộc sống và chia sẻ bài học với người khác. Du lịch tâm linh (yoga retreat, thiền vipassana) rất phù hợp. Con đường phát triển: biến trải nghiệm thành trí tuệ.',
  },

  6: {
    overview: 'Số 6 mang năng lượng tình yêu, trách nhiệm và sự nuôi dưỡng. Bạn là trái tim của mọi cộng đồng — gia đình, bạn bè, đồng nghiệp đều quay quanh sự ấm áp bạn tỏa ra. Tình yêu không phải cảm xúc đối với bạn — đó là hành động: nấu ăn, chăm sóc, lắng nghe, hy sinh. Bạn có thẩm mỹ tinh tế và mong muốn mọi thứ xung quanh đều hài hòa, đẹp đẽ. Sứ mệnh của bạn là tạo ra "tổ ấm" bất kỳ đâu bạn đến.',
    strengths: [
      'Chăm sóc — bạn biết chính xác người khác cần gì khi họ chưa kịp nói.',
      'Có trách nhiệm — bạn giữ lời hứa và hoàn thành nghĩa vụ.',
      'Thẩm mỹ — bạn có con mắt tinh tế cho cái đẹp trong mọi thứ.',
      'Hòa giải — bạn là người mà mọi người tìm đến khi cần sự an ủi.',
      'Trung thành — tình cảm của bạn sâu và bền vững qua thời gian.',
      'Bao dung — bạn tha thứ và cho đi mà không đòi hỏi đáp lại.',
    ],
    challenges: [
      'Hay hy sinh — cho đi quá nhiều đến mức quên chăm sóc bản thân.',
      'Kiểm soát — tình yêu đôi khi biến thành muốn điều khiển cuộc sống người khác.',
      'Cầu toàn — tiêu chuẩn cao cho mọi thứ gây áp lực cho chính mình và người xung quanh.',
      'Phụ thuộc cảm xúc — cần được cần đến để cảm thấy có giá trị.',
      'Khó nói "không" — sợ làm người khác thất vọng nên ôm việc quá tải.',
    ],
    career: 'Y tế, giáo dục, tư vấn tâm lý, thiết kế nội thất, ẩm thực, nhân sự — nghề nào cho phép chăm sóc và tạo ra vẻ đẹp đều phù hợp. Bạn tuyệt vời ở vai trò mentor, team builder, hoặc người tạo văn hóa tổ chức.',
    love: 'Gia đình là trung tâm vũ trụ của bạn. Bạn yêu sâu, bao dung và sẵn sàng hy sinh. Ngôn ngữ tình yêu: hành động phục vụ + quality time. Thử thách lớn nhất: yêu mà không kiểm soát, chăm sóc mà không mất bản thân.',
    health: 'Lưng và vai gánh nặng — cả nghĩa đen lẫn nghĩa bóng. Tim và hệ tiêu hóa cần chú ý khi stress về gia đình. Lời khuyên: đặt ranh giới chăm sóc — bạn không thể rót từ ly rỗng. Self-care không phải ích kỷ.',
    money: 'Tài chính gắn liền với gia đình — bạn kiếm tiền và chi tiêu vì người thân. Giỏi quản lý tài chính gia đình. Lời khuyên: tách riêng quỹ cá nhân — bạn cũng xứng đáng chi tiêu cho mình.',
    spiritual: 'Bài học tâm linh là tình yêu vô điều kiện — yêu mà không đòi hỏi kết quả. Bạn đến để học rằng chăm sóc bản thân là bước đầu tiên để chăm sóc thế giới. Con đường phát triển: biến tổ ấm gia đình thành nền tảng cho cộng đồng rộng lớn hơn.',
  },

  7: {
    overview: 'Số 7 là năng lượng của trí tuệ, tâm linh và chiều sâu nội tâm. Bạn không hài lòng với bề mặt — từ mối quan hệ đến công việc, bạn luôn tìm kiếm ý nghĩa sâu xa. Tâm trí bạn hoạt động ở tầng mà ít người chạm đến: phân tích, triết học, trực giác, và những câu hỏi lớn về sự tồn tại. Bạn là nhà hiền triết hiện đại — người mà người khác tìm đến khi cần sự sáng suốt thật sự.',
    strengths: [
      'Phân tích — bạn nhìn xuyên qua bề mặt để tìm bản chất vấn đề.',
      'Trực giác — bạn "biết" những điều mà dữ liệu chưa chứng minh.',
      'Chiều sâu — bạn không chấp nhận câu trả lời hời hợt.',
      'Độc lập tư duy — bạn không dễ bị ảnh hưởng bởi đám đông.',
      'Kiến thức rộng — bạn đọc nhiều, nghiên cứu kỹ, và nhớ lâu.',
    ],
    challenges: [
      'Cô lập — thiên hướng nội tâm khiến bạn tách rời xã hội.',
      'Hoài nghi — phân tích quá mức biến thành nghi ngờ mọi thứ.',
      'Lạnh lùng — khó biểu đạt cảm xúc, người khác thấy bạn xa cách.',
      'Cầu toàn tri thức — luôn nghĩ mình chưa biết đủ để hành động.',
      'Khinh người — vô tình xem thường người không có chiều sâu.',
    ],
    career: 'Nghiên cứu, khoa học, công nghệ, phân tích dữ liệu, tâm lý học, triết học, viết sách — bất kỳ nghề nào cho phép đi sâu vào một lĩnh vực. Bạn cần không gian và thời gian suy nghĩ — open office không phù hợp.',
    love: 'Bạn yêu sâu nhưng bày tỏ chậm. Cần thời gian để mở lòng và tin tưởng. Đối phương lý tưởng: thông minh, có chiều sâu, tôn trọng không gian riêng. Thử thách: học cách chia sẻ cảm xúc — im lặng không phải lúc nào cũng là vàng.',
    health: 'Hệ thần kinh và tiêu hóa nhạy cảm. Hay đau đầu, mất ngủ do suy nghĩ quá nhiều. Cần: thiên nhiên (rừng, biển), giảm screen time, thiền định đều đặn. Massage và aromatherapy giúp "ground" lại.',
    money: 'Tài chính ổn định qua chuyên môn sâu — bạn to expert thì tiền sẽ đến. Không quan tâm nhiều đến vật chất, chi tiêu cho sách và trải nghiệm tri thức. Lời khuyên: đừng quá khinh tiền — tài chính ổn định cho phép bạn tự do nghiên cứu.',
    spiritual: 'Bài học tâm linh là kết nối trí tuệ với trái tim. Bạn sinh ra đã gần với "giác ngộ" hơn hầu hết — nhưng đừng biến tâm linh thành trí tuệ thuần túy. Con đường phát triển: chia sẻ trí tuệ — kiến thức chỉ có giá trị khi được truyền đi.',
  },

  8: {
    overview: 'Số 8 là năng lượng của quyền lực, thành tựu và sự thịnh vượng. Bạn đến cuộc đời với sứ mệnh tạo ra ảnh hưởng lớn — không phải kiểu nhỏ lẻ, mà là kiểu thay đổi cuộc chơi. Bạn hiểu quy luật của tiền, quyền lực và hệ thống. Karma của số 8 rõ ràng: cho nhiều thì nhận nhiều, lạm dụng thì mất tất cả. Bạn là CEO bẩm sinh — không phải vì title, mà vì tầm nhìn và bản lĩnh.',
    strengths: [
      'Tầm nhìn kinh doanh — bạn nhìn thấy giá trị thị trường trước người khác.',
      'Bản lĩnh — bạn đứng vững dưới áp lực mà người khác gục ngã.',
      'Quản lý tài chính — bạn hiểu tiền và biết cách nhân tiền.',
      'Lãnh đạo — bạn ra quyết định lớn với sự tự tin đáng ngưỡng mộ.',
      'Thực thi — ý tưởng trong tay bạn trở thành kết quả cụ thể.',
    ],
    challenges: [
      'Tham vọng quá mức — đuổi theo thành công mà quên sống.',
      'Kiểm soát — muốn nắm quyền trong mọi tình huống.',
      'Vật chất hóa — đánh giá mọi thứ qua giá trị tiền bạc.',
      'Workaholic — làm việc 16 giờ/ngày và gọi đó là "đam mê".',
      'Karma nặng — thành công bất chính sẽ bị "lấy lại" nhanh chóng.',
    ],
    career: 'CEO, CFO, đầu tư, bất động sản, ngân hàng, luật, chính trị — bất kỳ lĩnh vực nào liên quan đến tiền và quyền lực. Bạn xây dựng hệ thống, tạo ra tổ chức, và để lại di sản. Phong cách: quyết đoán, strategic, result-oriented.',
    love: 'Bạn cần đối phương hiểu và ủng hộ tham vọng. Tình yêu kiểu "power couple" — cùng nhau chinh phục. Thử thách: dành thời gian cho tình cảm khi lịch trình dày đặc. Đối phương lý tưởng: độc lập, tự tin, không cần bạn "nuôi".',
    health: 'Tim mạch và huyết áp — do stress công việc. Lưng dưới và khớp gối (ngồi nhiều, đi lại nhiều). Cần: check-up định kỳ, tập thể dục đều đặn (golf, bơi, gym). Lời khuyên: buông bỏ vào cuối ngày — điện thoại không lên giường.',
    money: 'Tài chính là sở trường — bạn kiếm nhiều VÀ biết cách giữ tiền. Đầu tư đa dạng, tầm nhìn dài hạn. Nhưng: đừng để tiền định nghĩa bạn. Lời khuyên: philanthropy không phải mất tiền — đó là đầu tư karma có ROI cao nhất.',
    spiritual: 'Bài học tâm linh: quyền lực thật sự là phụng sự. Số 8 nằm ngang là ∞ — vô hạn. Bạn đến để học rằng cho đi nhiều không nghĩa là có ít hơn. Con đường phát triển: dùng ảnh hưởng để nâng đỡ người khác lên.',
  },

  9: {
    overview: 'Số 9 mang năng lượng của sự hoàn thiện, lòng nhân đạo và trí tuệ. Bạn là linh hồn già — mang theo kinh nghiệm từ nhiều kiếp sống. Tầm nhìn của bạn vượt qua bản thân, gia đình, quốc gia — bạn nghĩ cho nhân loại. Lòng từ bi của bạn không phải thương hại — đó là sự hiểu biết sâu sắc về nỗi đau và niềm vui của con người. Bạn là người hoàn thành chu kỳ, kết nối quá khứ và tương lai.',
    strengths: [
      'Từ bi — bạn hiểu nỗi đau của người khác ở mức sâu nhất.',
      'Tầm nhìn rộng — bạn nhìn thấy bức tranh lớn mà người khác bỏ lỡ.',
      'Sáng tạo — trí tưởng tượng phong phú, nghệ thuật là ngôn ngữ tự nhiên.',
      'Trí tuệ — bạn hiểu cuộc sống ở mức triết học sâu sắc.',
      'Cho đi — bạn hào phóng với thời gian, tiền bạc và tình cảm.',
      'Charisma — sức hút tự nhiên của người mang sứ mệnh lớn.',
    ],
    challenges: [
      'Buông bỏ — bám víu vào quá khứ, khó tiến về phía trước.',
      'Hy sinh quá mức — quên bản thân vì lo cho thế giới.',
      'Mộng mơ — tầm nhìn lớn nhưng đôi khi thiếu thực tế.',
      'Thất vọng — kỳ vọng cao vào nhân loại dẫn đến thất vọng.',
      'Cảm giác "khác biệt" — khó tìm ai hiểu mình hoàn toàn.',
    ],
    career: 'Nghệ thuật, giáo dục, tình nguyện, tư vấn, y tế cộng đồng, NGO, viết lách, đạo diễn — nghề nào có tác động xã hội đều phù hợp. Bạn truyền cảm hứng cho đám đông và tạo ra phong trào.',
    love: 'Bạn yêu lý tưởng — tìm kiếm "soulmate" chứ không chỉ bạn đời. Tình yêu vô điều kiện là mục tiêu nhưng cũng là thử thách. Thử thách: không phải mọi mối quan hệ đều phải "cứu thế giới". Đôi khi tình yêu đơn giản cũng đủ đẹp.',
    health: 'Hệ miễn dịch và hệ thần kinh — dễ "hấp thụ" năng lượng tiêu cực từ môi trường. Cần: detox thường xuyên (cả thể chất lẫn tinh thần), thời gian ở biển/rừng, nghệ thuật trị liệu.',
    money: 'Tiền đến bất ngờ và đi bất ngờ — bạn không gắn bó với vật chất. Cho đi hào phóng, đôi khi quá mức. Lời khuyên: có plan tài chính — lòng hào phóng cần đi kèm sự khôn ngoan.',
    spiritual: 'Bài học tâm linh: hoàn thành là buông bỏ, không phải bám giữ. Bạn đến để đóng lại các chương cũ và mở ra những khả năng mới cho nhân loại. Con đường phát triển cao nhất: phụng sự vô điều kiện — cho đi mà không đếm.',
  },

  11: {
    overview: 'Số 11 — Số Bậc Thầy đầu tiên — mang năng lượng tâm linh siêu việt và trực giác đặc biệt. Bạn là cầu nối giữa thế giới hữu hình và vô hình. Trực giác của bạn không phải "linh cảm mơ hồ" — đó là kênh thông tin rõ ràng từ tầng ý thức cao hơn. Bạn nhìn thấy tiềm năng ở nơi người khác thấy hỗn loạn, và cảm nhận được sự thật mà logic không giải thích được. Nhưng sống ở tần số 11 không dễ — nó đòi hỏi sự dũng cảm để khác biệt và sức mạnh để chịu đựng sự nhạy cảm cao.',
    strengths: [
      'Trực giác siêu việt — bạn "biết" trước khi lý trí kịp xử lý.',
      'Truyền cảm hứng — bạn nâng tâm mọi người xung quanh.',
      'Nhạy cảm tâm linh — bạn cảm nhận năng lượng, không khí, và ý định.',
      'Sáng tạo — ý tưởng đến từ "nơi khác", vượt qua tư duy thông thường.',
      'Khai sáng — bạn giúp người khác tìm thấy con đường của họ.',
    ],
    challenges: [
      'Áp lực tâm linh — kỳ vọng cao từ bên trong khó chịu đựng.',
      'Anxiety — năng lượng 11 cực kỳ nhạy cảm, dễ overload.',
      'Mâu thuẫn nội tâm — dao động giữa 11 (tâm linh) và 2 (phụ thuộc).',
      'Tự nghi ngờ — trực giác mạnh nhưng lý trí liên tục đặt câu hỏi.',
      'Cô đơn tâm linh — ít người hiểu tần số bạn đang sống.',
    ],
    career: 'Tư vấn tâm linh, trị liệu, nghệ thuật, giảng dạy, viết sách, coaching, lãnh đạo tinh thần. Bạn cần công việc có ý nghĩa sâu — không thể sống bằng việc "chỉ kiếm tiền". Trong tổ chức, bạn là visionary — người nhìn thấy hướng đi khi mọi người đang mù.',
    love: 'Tình yêu kiểu "kết nối linh hồn" — bạn cần đối phương hiểu chiều sâu của bạn. Mối quan hệ bề mặt khiến bạn kiệt sức. Thử thách: không phải ai cũng sẵn sàng cho mức độ thân mật tâm linh mà bạn tìm kiếm.',
    health: 'Hệ thần kinh cực kỳ nhạy cảm — anxiety, panic attack, insomnia là nguy cơ. Cần: thiền định hàng ngày (không tùy chọn), giảm caffeine, tránh tin tức tiêu cực. Grounding exercises: đi chân trần trên cỏ, tập thở đất.',
    money: 'Tiền đến khi bạn theo đuổi sứ mệnh, không phải khi bạn đuổi theo tiền. Tài chính có thể bất ổn nếu chưa tìm được con đường đúng. Lời khuyên: tìm cách monetize tài năng tâm linh — thế giới cần bạn VÀ bạn cần ăn.',
    spiritual: 'Bạn CHÍNH LÀ bài học tâm linh. Con đường là tin tưởng trực giác dù thế giới nói bạn "mơ mộng". Số 11 là Master Teacher — khi bạn sống đúng tần số, bạn tự động truyền dạy chỉ bằng sự hiện diện.',
  },

  22: {
    overview: 'Số 22 — Master Builder — là Số Bậc Thầy mạnh nhất trong thần số học. Bạn có tầm nhìn của 11 CỘNG khả năng thực thi vượt trội. Nơi 11 nhìn thấy khả năng, 22 HIỆN THỰC HÓA nó. Bạn sinh ra để xây dựng những thứ tồn tại qua nhiều thế hệ — tổ chức, hệ thống, phong trào. Không phải xây nhà — bạn xây thành phố. Năng lượng này cực kỳ hiếm và cực kỳ mạnh — nhưng cũng đòi hỏi trách nhiệm lớn nhất.',
    strengths: [
      'Tầm nhìn + Thực thi — bạn vừa mơ lớn vừa biến giấc mơ thành hiện thực.',
      'Kỷ luật bậc thầy — bạn duy trì focus trong dự án dài hạn.',
      'Lãnh đạo hệ thống — bạn xây tổ chức, không chỉ quản lý nhóm.',
      'Ảnh hưởng rộng — bạn tạo ra thay đổi ở quy mô lớn.',
      'Thực tế tâm linh — bạn kết nối mục đích cao cả với hành động cụ thể.',
    ],
    challenges: [
      'Áp lực tự đặt — tiêu chuẩn cực cao cho bản thân là gánh nặng.',
      'Nervous breakdown — năng lượng 22 quá mạnh nếu không có outlet.',
      'Cầu toàn cực đoan — chấp nhận "đủ tốt" gần như bất khả thi.',
      'Xa cách — tập trung vào "big picture" mà quên các mối quan hệ.',
      'Fall to 4 — khi không chịu nổi áp lực, rơi xuống năng lượng số 4 (ổn nhưng không phi thường).',
    ],
    career: 'Kiến trúc sư (nghĩa đen và nghĩa bóng), CEO, nhà sáng lập, chính trị gia, nhà từ thiện lớn, kỹ sư hệ thống. Bạn không làm "việc" — bạn xây "di sản". Phù hợp nhất: vị trí cho phép bạn thiết kế và triển khai hệ thống phức tạp.',
    love: 'Cần đối phương hiểu sứ mệnh lớn. Tình yêu với 22 có thể cảm giác "chia sẻ bạn với cả thế giới". Thử thách: nhớ rằng gia đình cũng là "dự án" quan trọng nhất. Power couple hoặc partner rất supportive đều phù hợp.',
    health: 'Lưng, hệ tiêu hóa, và hệ thần kinh — vì gánh nặng trách nhiệm. Burnout là nguy cơ số 1. Cần: nghỉ phép thật sự (không kiểm tra email), thể thao đều đặn, và một người tin tưởng để chia sẻ áp lực.',
    money: 'Khả năng tạo wealth ở quy mô lớn — empire builder. Nhưng tiền là công cụ, không phải mục tiêu. Lời khuyên: xây legacy fund — tiền không phải để tiêu mà để tạo ảnh hưởng qua nhiều thế hệ.',
    spiritual: 'Bài học: biến tầm nhìn tâm linh thành thực tế vật chất. Bạn là nhà xây dựng thiêng liêng — mỗi dự án là một biểu hiện của mục đích cao hơn. Con đường phát triển: chấp nhận rằng bạn không cần hoàn thành tất cả trong một đời.',
  },

  33: {
    overview: 'Số 33 — Master Teacher of Love — là Số Bậc Thầy hiếm nhất, đại diện cho tình yêu vô điều kiện ở mức cao nhất. Bạn không chỉ yêu — bạn CHÍNH LÀ tình yêu. Năng lượng 33 kết hợp trực giác của 11 và sức mạnh xây dựng của 22, thêm tình thương vô biên của 6 nhân đôi. Bạn đến để chữa lành — không phải bằng thuốc men mà bằng sự hiện diện. Khi bạn ở trong phòng, mọi người tự nhiên cảm thấy an toàn.',
    strengths: [
      'Chữa lành — sự hiện diện của bạn có tác động trị liệu.',
      'Tình yêu vô điều kiện — bạn yêu thương mà không đòi hỏi.',
      'Truyền dạy — bạn truyền đạt bằng ví dụ sống, không phải lời nói.',
      'Hy sinh có ý thức — bạn cho đi vì muốn, không vì bị ép.',
      'Compassion siêu việt — hiểu nỗi đau nhân loại ở mức sâu nhất.',
    ],
    challenges: [
      'Gánh nặng cảm xúc — cảm nhận nỗi đau của cả thế giới là quá tải.',
      'Tự hy sinh — ranh giới giữa phụng sự và tự hủy rất mỏng.',
      'Kỳ vọng — mức độ trách nhiệm mà 33 gánh vác là phi thường.',
      'Fall to 6 — khi quá tải, rơi về năng lượng 6 (chăm sóc nhưng mất cân bằng).',
      'Hiếm gặp người đồng tần số — cô đơn sâu ở mức tâm linh.',
    ],
    career: 'Chữa lành (healer), giáo viên tâm linh, nhà hoạt động xã hội, tư vấn, nghệ thuật trị liệu, lãnh đạo tôn giáo/tâm linh. Bạn không "chọn" nghề — sứ mệnh chọn bạn.',
    love: 'Tình yêu với 33 là trải nghiệm tâm linh. Bạn yêu sâu đến mức có thể biến đổi đối phương. Thử thách: tìm được ai đủ mạnh để nhận năng lượng yêu thương khổng lồ mà không sợ hãi.',
    health: 'Tim (cả thể chất lẫn cảm xúc) là vùng cần bảo vệ. Hệ miễn dịch dễ suy yếu do cho đi quá nhiều năng lượng. Cần: retreat tâm linh định kỳ, silence, và cho phép người khác chăm sóc BẠN.',
    money: 'Tiền hầu như luôn phục vụ mục đích lớn hơn. Bạn có thể sống giản dị mà vẫn thu hút nguồn lực cho sứ mệnh. Lời khuyên: đừng từ chối sự dồi dào — bạn xứng đáng được support.',
    spiritual: 'Bạn là hiện thân của bài học tâm linh cao nhất: tình yêu vô điều kiện. Con đường duy nhất là sống đúng tần số — khi đó, bạn trở thành ngọn hải đăng cho tất cả những ai đang tìm đường.',
  },
};
