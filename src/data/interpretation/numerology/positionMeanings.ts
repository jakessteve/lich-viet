/**
 * Numerology Position Meanings
 *
 * Context-specific interpretations for each number in each position.
 * Same number means different things as Life Path vs. Expression vs. Soul Urge etc.
 */

import type { NumerologyPosition, PositionMeaning } from './types';

type PositionMeaningMap = Record<number, Record<NumerologyPosition, PositionMeaning>>;

export const POSITION_MEANINGS: PositionMeaningMap = {
  1: {
    lifePath: { interpretation: 'Con đường đời của bạn là trở thành người tiên phong — khai mở lối đi mới thay vì theo dấu chân người khác. Cuộc sống sẽ liên tục đặt bạn vào tình huống phải dẫn dắt, ra quyết định độc lập, và tin vào bản năng. Thành công đến khi bạn ngừng chờ đợi sự cho phép và bắt đầu tự tạo ra con đường.' },
    expression: { interpretation: 'Tài năng của bạn thể hiện qua khả năng lãnh đạo và sáng kiến. Bạn giao tiếp bằng hành động — nói ít, làm nhiều, để kết quả chứng minh. Trong công việc, bạn tự nhiên đảm nhận vai trò tiên phong — người đề xuất ý tưởng mới và dám thử nghiệm.' },
    soulUrge: { interpretation: 'Sâu trong tâm hồn, bạn khao khát sự độc lập và tự do — được là chính mình mà không cần ai chấp thuận. Động lực thầm kín là nhu cầu chứng minh rằng bạn có thể tự đứng trên đôi chân mình. Bạn cảm thấy sống nhất khi đang tạo ra điều gì đó hoàn toàn mới.' },
    personality: { interpretation: 'Người khác nhìn bạn như một người tự tin, quyết đoán và mạnh mẽ. Ấn tượng đầu tiên bạn để lại là "người này biết mình muốn gì". Phong thái nổi bật, đôi khi bị hiểu lầm là kiêu ngạo nhưng thực chất là sự chắc chắn vào bản thân.' },
    birthday: { interpretation: 'Năng khiếu bẩm sinh của bạn là khả năng bắt đầu — bạn khởi động dự án, ý tưởng, và phong trào một cách tự nhiên. Ngày sinh cho bạn sự dũng cảm ban đầu — viên gạch đầu tiên mà mọi công trình cần.' },
    maturity: { interpretation: 'Từ giữa đời trở đi, bạn sẽ ngày càng tự tin dẫn dắt cuộc sống theo cách riêng. Giai đoạn trưởng thành mang đến sự bình tĩnh trong lãnh đạo — không còn cần chứng minh, chỉ cần sống đúng tầm nhìn.' },
  },
  2: {
    lifePath: { interpretation: 'Con đường đời của bạn là trở thành người kết nối — tạo cầu nối giữa con người, ý tưởng, và cảm xúc. Cuộc sống dạy bạn bài học về sự kiên nhẫn, hợp tác, và nghệ thuật lắng nghe. Thành công đến qua các mối quan hệ chất lượng, không phải thành tích cá nhân.' },
    expression: { interpretation: 'Tài năng của bạn biểu hiện qua sự ngoại giao tinh tế và khả năng hòa giải. Bạn đọc được "không khí" trong phòng và biết cách điều chỉnh. Trong team, bạn là chất keo kết dính — không phải star nhưng không ai có thể thiếu.' },
    soulUrge: { interpretation: 'Tâm hồn bạn khao khát hòa bình, sự kết nối sâu sắc, và cảm giác thuộc về. Nhu cầu thầm kín là được yêu thương và công nhận — không phải vì thành tích mà vì con người bạn. Bạn hạnh phúc nhất khi mọi người xung quanh hạnh phúc.' },
    personality: { interpretation: 'Bạn để lại ấn tượng dịu dàng, dễ gần và đáng tin cậy. Người ta cảm thấy thoải mái chia sẻ với bạn vì bạn toát ra sự an toàn. Tuy nhiên, bạn có thể bị đánh giá thấp vì phong thái khiêm nhường.' },
    birthday: { interpretation: 'Năng khiếu bẩm sinh là sự nhạy cảm tinh tế — bạn cảm nhận được tâm trạng người khác trước khi họ nói ra. Đây là nền tảng cho mọi vai trò đòi hỏi empathy: tư vấn, HR, chăm sóc.' },
    maturity: { interpretation: 'Giai đoạn trưởng thành mang đến sự bình yên — bạn ngừng cố gắng làm hài lòng tất cả và tìm thấy sức mạnh trong sự dịu dàng. Quan hệ sâu sắc hơn, ít nhưng chất lượng.' },
  },
  3: {
    lifePath: { interpretation: 'Con đường đời là trở thành người truyền cảm hứng qua sáng tạo và biểu đạt. Cuộc sống liên tục mời gọi bạn thể hiện — viết, nói, hát, vẽ, hoặc đơn giản là truyền năng lượng tích cực. Bài học lớn: sáng tạo không phải xa xỉ, đó là sứ mệnh.' },
    expression: { interpretation: 'Tài năng biểu hiện rõ nhất qua giao tiếp — bạn có khả năng biến ý tưởng phức tạp thành câu chuyện cuốn hút. Viết, nói, marketing, giảng dạy — bất cứ đâu cần "kể chuyện" đều là sân chơi.' },
    soulUrge: { interpretation: 'Tâm hồn khao khát sự tự do biểu đạt và niềm vui sáng tạo. Bạn cảm thấy ngạt thở trong môi trường ức chế cá tính. Nhu cầu sâu xa: được nhìn thấy, được khen ngợi, và được vui vẻ.' },
    personality: { interpretation: 'Bạn tỏa ra năng lượng vui vẻ, hài hước và cuốn hút. Là tâm điểm của mọi cuộc hội thoại. Người ta nhớ bạn vì nụ cười, câu đùa, và cách bạn khiến mọi thứ trở nên nhẹ nhàng.' },
    birthday: { interpretation: 'Năng khiếu bẩm sinh: khả năng giao tiếp và sáng tạo. Bạn biết cách "sell" ý tưởng, tạo cảm xúc, và kết nối qua ngôn từ. Tài năng tự nhiên cho mọi vai trò sáng tạo.' },
    maturity: { interpretation: 'Trưởng thành mang lại sự sáng tạo có chiều sâu — không chỉ vui vẻ bề mặt mà là biểu đạt từ trải nghiệm thật. Giọng nói unique của bạn trở nên rõ ràng và ảnh hưởng hơn.' },
  },
  4: {
    lifePath: { interpretation: 'Con đường đời là xây dựng — tạo ra nền tảng vững chắc cho bản thân và người khác. Cuộc sống dạy bạn giá trị của kỷ luật, phương pháp và sự kiên nhẫn. Thành công đến chậm nhưng bền — mỗi viên gạch bạn đặt đều có ý nghĩa.' },
    expression: { interpretation: 'Tài năng biểu hiện qua khả năng tổ chức, lập kế hoạch và hiện thực hóa. Bạn biến mọi thứ hỗn loạn thành có trật tự. Trong team, bạn là project manager bẩm sinh — người đảm bảo mọi thứ đi đúng hướng.' },
    soulUrge: { interpretation: 'Tâm hồn khao khát sự ổn định, an toàn và trật tự. Bạn cần biết "kế hoạch là gì" trước khi cảm thấy yên tâm. Nhu cầu sâu xa: tạo ra thứ gì đó tồn tại lâu dài.' },
    personality: { interpretation: 'Người khác nhìn bạn như trụ cột — đáng tin cậy, nghiêm túc, có trách nhiệm. Đôi khi bị coi là "khô khan" nhưng thực chất bạn chỉ ưu tiên thực chất hơn hình thức.' },
    birthday: { interpretation: 'Năng khiếu bẩm sinh: kỷ luật và sự chi tiết. Bạn hoàn thành công việc mà người khác bỏ dở. Khả năng tự nhiên cho mọi vai trò đòi hỏi độ chính xác cao.' },
    maturity: { interpretation: 'Trưởng thành mang đến sự vững vàng — bạn trở thành nền tảng cho gia đình và cộng đồng. Di sản bạn để lại là hệ thống và giá trị bền vững.' },
  },
  5: {
    lifePath: { interpretation: 'Con đường đời là trải nghiệm và tự do. Cuộc sống sẽ liên tục đưa bạn vào thay đổi — chuyển nhà, chuyển nghề, gặp người mới — và bài học là đón nhận thay vì kháng cự. Thành công đến khi bạn biến đa dạng thành trí tuệ.' },
    expression: { interpretation: 'Tài năng biểu hiện qua sự linh hoạt và khả năng thích ứng. Bạn multi-task giỏi, giao tiếp đa ngôn ngữ (nghĩa đen và nghĩa bóng). Trong team, bạn là người kết nối và mở rộng.' },
    soulUrge: { interpretation: 'Tâm hồn khao khát tự do — không chỉ vật lý mà cả tinh thần. Bạn ghét sự giam cầm dưới mọi hình thức. Nhu cầu sâu xa: trải nghiệm mọi khía cạnh của cuộc sống trước khi "đi".' },
    personality: { interpretation: 'Bạn tỏa ra năng lượng phiêu lưu, cởi mở và quyến rũ. Người ta thấy bạn thú vị vì bạn luôn có câu chuyện mới kể. Ấn tượng: "Người này đã đi nhiều, thấy nhiều."' },
    birthday: { interpretation: 'Năng khiếu bẩm sinh: thích ứng và giao tiếp đa văn hóa. Bạn hòa nhập mọi nơi, nói chuyện mọi người. Tài năng tự nhiên cho sales, du lịch, ngoại giao.' },
    maturity: { interpretation: 'Trưởng thành mang đến sự tự do có ý thức — không phải chạy trốn cam kết mà là chọn lọc trải nghiệm có giá trị. Bạn trở thành "mentor trải nghiệm" cho thế hệ sau.' },
  },
  6: {
    lifePath: { interpretation: 'Con đường đời xoay quanh tình yêu, gia đình và trách nhiệm. Cuộc sống sẽ luôn kéo bạn về với vai trò chăm sóc — dù muốn hay không. Bài học: yêu thương người khác mà không đánh mất bản thân. Thành công đo bằng mái ấm bạn xây.' },
    expression: { interpretation: 'Tài năng biểu hiện qua sự chăm sóc, thẩm mỹ và khả năng hòa giải. Bạn tạo ra vẻ đẹp và sự hài hòa ở bất kỳ đâu. Trong team, bạn là người giữ văn hóa, mentor, và "bà mẹ" của mọi người.' },
    soulUrge: { interpretation: 'Tâm hồn khao khát tổ ấm, gia đình, sự hài hòa. Bạn cần cảm giác "nhà" — nơi bạn thuộc về và được yêu thương vô điều kiện. Nhu cầu sâu xa: được cần đến.' },
    personality: { interpretation: 'Bạn tỏa ra sự ấm áp, đáng tin cậy và thẩm mỹ. Người ta tự nhiên muốn tâm sự với bạn. Ấn tượng đầu tiên: "Người này biết chăm sóc."' },
    birthday: { interpretation: 'Năng khiếu bẩm sinh: trách nhiệm và thẩm mỹ. Bạn tự nhiên đảm nhận vai trò chăm sóc. Tài năng cho y tế, giáo dục, nghệ thuật, thiết kế.' },
    maturity: { interpretation: 'Trưởng thành mang đến sự cân bằng giữa cho và nhận. Bạn trở thành trụ cột gia đình — không phải kiểm soát mà hỗ trợ. Tình yêu vô điều kiện trở nên tự nhiên hơn.' },
  },
  7: {
    lifePath: { interpretation: 'Con đường đời là tìm kiếm sự thật và chiều sâu. Cuộc sống đặt bạn vào những câu hỏi lớn: "Tôi là ai?", "Ý nghĩa là gì?" Bài học: kết nối trí tuệ với trái tim. Thành công đến khi bạn chia sẻ sự hiểu biết sâu sắc.' },
    expression: { interpretation: 'Tài năng biểu hiện qua phân tích, nghiên cứu và trực giác. Bạn nhìn xuyên bề mặt để tìm bản chất. Trong team, bạn là "người giải mã" — phát hiện pattern mà ai cũng bỏ sót.' },
    soulUrge: { interpretation: 'Tâm hồn khao khát sự hiểu biết và bình yên nội tâm. Bạn cần thời gian một mình để suy nghĩ, đọc, và kết nối với chiều sâu. Nhu cầu sâu xa: tìm được ý nghĩa đích thực.' },
    personality: { interpretation: 'Bạn tỏa ra sự bí ẩn, trí tuệ và chiều sâu. Người ta kính trọng bạn nhưng cũng thấy khó tiếp cận. Ấn tượng: "Người này biết nhiều hơn họ nói."' },
    birthday: { interpretation: 'Năng khiếu bẩm sinh: trực giác và phân tích sâu. Bạn tự nhiên đặt câu hỏi mà người khác chấp nhận. Tài năng cho nghiên cứu, khoa học, tâm linh, triết học.' },
    maturity: { interpretation: 'Trưởng thành mang đến sự bình yên nội tâm — bạn ngừng tìm kiếm câu trả lời bên ngoài và nhận ra trí tuệ đã ở bên trong. Giai đoạn "hiền triết " — chia sẻ không cần lời nói nhiều.' },
  },
  8: {
    lifePath: { interpretation: 'Con đường đời gắn với quyền lực, thành tựu và ảnh hưởng. Cuộc sống đào tạo bạn qua thử thách — mất rồi được, lên rồi xuống — để bạn hiểu quy luật karma của vật chất. Thành công lớn nhưng đi kèm trách nhiệm lớn.' },
    expression: { interpretation: 'Tài năng thể hiện qua quản lý, chiến lược và thực thi. Bạn biến vision thành reality ở quy mô lớn. Trong tổ chức, bạn là người quyết định mọi thứ — từ chiến lược đến ngân sách.' },
    soulUrge: { interpretation: 'Tâm hồn khao khát thành tựu, sự công nhận và ảnh hưởng. Bạn muốn để lại dấu ấn — không phải vì ego mà vì cảm giác đóng góp có ý nghĩa. Nhu cầu sâu xa: chứng minh mình xứng đáng.' },
    personality: { interpretation: 'Bạn tỏa ra quyền lực, tự tin và thành công. Ấn tượng: "Người này biết cách kiếm tiền và quản lý." Phong thái executive — dù mặc gì cũng trông "có vị trí".' },
    birthday: { interpretation: 'Năng khiếu bẩm sinh: quản lý tài chính và tổ chức. Bạn tự nhiên hiểu giá trị, biết cái gì đáng đầu tư. Tài năng cho kinh doanh, tài chính, bất động sản.' },
    maturity: { interpretation: 'Trưởng thành mang đến giai đoạn "thu hoạch" — mọi nỗ lực bắt đầu sinh trái. Quyền lực thật sự ở giai đoạn này là ảnh hưởng, không phải kiểm soát. Philanthropy trở thành ưu tiên.' },
  },
  9: {
    lifePath: { interpretation: 'Con đường đời là phụng sự và hoàn thiện. Cuộc sống yêu cầu bạn buông bỏ — không phải mất mát mà là trưởng thành. Bạn đến để đóng lại chu kỳ cũ và mở ra khả năng mới cho tập thể. Thành công: tạo ảnh hưởng tích cực ở quy mô lớn.' },
    expression: { interpretation: 'Tài năng biểu hiện qua sự sáng tạo, lòng nhân đạo và tầm nhìn rộng. Bạn truyền cảm hứng cho đám đông. Trong tổ chức, bạn là "linh hồn sứ mệnh" — người nhắc mọi người tại sao họ làm việc này.' },
    soulUrge: { interpretation: 'Tâm hồn khao khát phụng sự và ý nghĩa. Bạn không thể sống chỉ vì bản thân. Nhu cầu sâu xa: cống hiến cho điều gì lớn hơn mình — gọi đó là nhân loại, nghệ thuật, hay chân lý.' },
    personality: { interpretation: 'Bạn tỏa ra sự hào phóng, charisma và chiều sâu. Người ta cảm thấy "nâng tầm" khi ở bên bạn. Ấn tượng: "Người này sống vì điều gì đó lớn lao."' },
    birthday: { interpretation: 'Năng khiếu bẩm sinh: lòng từ bi và sáng tạo. Bạn tự nhiên kết nối với mọi người ở mức sâu. Tài năng cho nghệ thuật, hoạt động xã hội, giáo dục, chữa lành.' },
    maturity: { interpretation: 'Trưởng thành mang đến sự buông bỏ có ý thức — bạn ngừng bám víu và bắt đầu cho đi tự do. Giai đoạn "hiền nhân" — sự hiện diện của bạn đủ để truyền cảm hứng.' },
  },
  11: {
    lifePath: { interpretation: 'Con đường đời là trở thành kênh truyền cho tâm linh và trực giác. Cuộc sống đặt bạn vào vai trò cầu nối — giữa hữu hình và vô hình. Bài học: tin vào trực giác dù thế giới nói bạn "không thực tế". Thành công đến khi bạn sống đúng tần số Master.' },
    expression: { interpretation: 'Tài năng biểu hiện qua truyền cảm hứng và trực giác sáng tạo. Bạn truyền đạt ý tưởng vượt qua logic thông thường — và người ta nghe. Trong tổ chức, bạn là visionary — nhìn thấy 10 năm sau.' },
    soulUrge: { interpretation: 'Tâm hồn khao khát khai sáng — cho bản thân và cho thế giới. Bạn không thể sống đời bình thường vì bên trong luôn "gọi" bạn đến sứ mệnh lớn hơn. Nhu cầu sâu xa: kết nối với nguồn tâm linh.' },
    personality: { interpretation: 'Bạn tỏa ra sự huyền bí, sáng suốt và khác biệt. Người ta cảm nhận bạn "không phải người thường" dù không giải thích được tại sao. Ánh mắt sâu, phong thái điềm tĩnh.' },
    birthday: { interpretation: 'Năng khiếu bẩm sinh: trực giác siêu việt và nhạy cảm tâm linh. Bạn "biết" trước khi lý trí kịp xử lý. Tài năng cho tư vấn, trị liệu, nghệ thuật tâm linh.' },
    maturity: { interpretation: 'Trưởng thành mang đến sự an nhiên trong vai trò Master Teacher. Bạn không cần chứng minh — sự hiện diện đủ để truyền dạy. Giai đoạn "thầy" — hướng dẫn mà không cần lời nói.' },
  },
  22: {
    lifePath: { interpretation: 'Con đường đời là xây dựng ở quy mô vĩ đại — hệ thống, tổ chức, phong trào thay đổi thế giới. Bạn không chỉ mơ — bạn hiện thực hóa giấc mơ ở mức mà ít người đạt được. Bài học: kiên nhẫn với quá trình xây dựng, không nản khi chưa thấy kết quả.' },
    expression: { interpretation: 'Tài năng biểu hiện qua thiết kế hệ thống và thực thi chiến lược ở quy mô lớn. Bạn biến vision thành blueprint thành reality. Trong tổ chức, bạn là architect — thiết kế cả tòa nhà, không chỉ sơn tường.' },
    soulUrge: { interpretation: 'Tâm hồn khao khát để lại di sản — thứ gì đó tồn tại qua nhiều thế hệ. Bạn không hài lòng với thành công ngắn hạn. Nhu cầu sâu xa: biết rằng cuộc đời mình có ý nghĩa vĩ đại.' },
    personality: { interpretation: 'Bạn tỏa ra quyền lực thầm lặng — không ồn ào nhưng ai cũng cảm nhận được. Phong thái "người xây dựng" — thực tế, có tầm, và đáng tin cậy ở mức cao nhất.' },
    birthday: { interpretation: 'Năng khiếu bẩm sinh: tầm nhìn + thực thi. Bạn là hiếm hoi — vừa mơ lớn vừa biết cách biến giấc mơ thành sự thật. Tài năng cho kiến trúc, kỹ thuật, quản trị cấp cao.' },
    maturity: { interpretation: 'Trưởng thành mang đến giai đoạn xây dựng di sản — bạn tập trung vào những gì tồn tại lâu hơn cuộc đời mình. Quyền lực trở thành phụng sự, thành tựu trở thành cống hiến.' },
  },
  33: {
    lifePath: { interpretation: 'Con đường đời là tình yêu vô điều kiện — chữa lành thế giới bằng lòng từ bi. Bạn đến với sứ mệnh cao nhất trong thần số học — không phải "làm" mà "là". Bài học: chăm sóc bản thân để có thể chăm sóc nhân loại.' },
    expression: { interpretation: 'Tài năng biểu hiện qua chữa lành, giảng dạy và yêu thương vô điều kiện. Bạn không cần nói — sự hiện diện đủ để thay đổi người khác. Trong cộng đồng, bạn là nguồn sáng mà mọi người hướng về.' },
    soulUrge: { interpretation: 'Tâm hồn khao khát chữa lành nỗi đau của thế giới. Bạn cảm nhận đau khổ của cả nhân loại — đó vừa là món quà vừa là gánh nặng. Nhu cầu sâu xa: yêu và được yêu ở mức không giới hạn.' },
    personality: { interpretation: 'Bạn tỏa ra ánh sáng ấm áp — người ta cảm thấy an toàn, được yêu thương chỉ bằng cách ở gần bạn. Phong thái "thầy tình yêu" — điềm tĩnh, từ bi, và vô cùng bao dung.' },
    birthday: { interpretation: 'Năng khiếu bẩm sinh: chữa lành và yêu thương vô điều kiện. Sự hiện diện của bạn có tác động trị liệu. Tài năng tự nhiên cho chăm sóc, giảng dạy, nghệ thuật chữa lành.' },
    maturity: { interpretation: 'Trưởng thành là lúc bạn sống trọn vẹn năng lượng 33 — tình yêu vô điều kiện trở nên tự nhiên như thở. Bạn không cần CỐ yêu thương — bạn CHÍNH LÀ tình yêu.' },
  },
};
