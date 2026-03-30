import type { InterpretationEntry, ZodiacSignId } from '../../types/westernAstro';
import { ZODIAC_SIGNS } from './zodiacSigns';

// =============================================================================
// Sign-on-House-Cusp Interpretation Texts — Vietnamese
// 12 signs × 12 houses = 144 entries
// Key format: "sign-on-house-N"
// =============================================================================

type SignHouseKey = `${ZodiacSignId}-on-house-${number}`;

function e(sign: ZodiacSignId, house: number, body: string, keywords: string[]): [SignHouseKey, InterpretationEntry] {
    const s = ZODIAC_SIGNS[sign];
    const key: SignHouseKey = `${sign}-on-house-${house}`;
    return [key, {
        key,
        title: `${s.symbol} ${s.name} trên đầu Nhà ${house}`,
        body,
        keywords,
    }];
}

export const SIGN_ON_HOUSE = new Map<SignHouseKey, InterpretationEntry>([
    // ── Aries (Bạch Dương) ──
    e('aries', 1, 'Cung Mọc Bạch Dương: Năng động, quyết đoán, dũng cảm. Bạn tiếp cận cuộc sống với tinh thần tiên phong, luôn sẵn sàng hành động trước tiên.', ['năng động', 'tiên phong', 'dũng cảm']),
    e('aries', 2, 'Kiếm tiền bằng sự chủ động và sáng kiến. Bạn thích tự tạo thu nhập riêng, chi tiêu nhanh và quyết đoán.', ['chủ động', 'sáng kiến', 'nhanh']),
    e('aries', 3, 'Giao tiếp thẳng thắn, nhanh gọn. Bạn nói trước nghĩ sau, thích tranh luận và học những gì kích thích trí tò mò.', ['thẳng thắn', 'nhanh', 'tranh luận']),
    e('aries', 4, 'Gia đình cần sự năng động, bạn có thể dẫn dắt trong nhà. Môi trường sống cần không gian hoạt động.', ['năng động', 'dẫn dắt', 'hoạt động']),
    e('aries', 5, 'Sáng tạo bốc đồng, tình yêu đam mê. Bạn yêu thích thể thao, cạnh tranh, và theo đuổi niềm vui một cách nhiệt huyết.', ['đam mê', 'thể thao', 'nhiệt huyết']),
    e('aries', 6, 'Làm việc với tốc độ cao, không thích chờ đợi. Bạn cần môi trường làm việc kích thích và thử thách liên tục.', ['tốc độ', 'thử thách', 'hành động']),
    e('aries', 7, 'Thu hút đối tác mạnh mẽ, có cá tính. Mối quan hệ có thể bắt đầu nhanh nhưng cần kiểm soát xung đột.', ['mạnh mẽ', 'nhanh', 'xung đột']),
    e('aries', 8, 'Đối mặt biến đổi một cách dũng cảm. Bạn không sợ khủng hoảng và thường hành động nhanh khi gặp bất trắc.', ['dũng cảm', 'quyết đoán', 'hành động']),
    e('aries', 9, 'Phiêu lưu trong triết lý và du lịch. Bạn tìm kiếm chân lý bằng hành động, yêu thích du lịch mạo hiểm.', ['phiêu lưu', 'mạo hiểm', 'hành động']),
    e('aries', 10, 'Sự nghiệp đòi hỏi vai trò lãnh đạo, tiên phong. Bạn muốn là người đầu tiên, không thích ở vị trí phụ thuộc.', ['lãnh đạo', 'tiên phong', 'độc lập']),
    e('aries', 11, 'Bạn bè năng động, cộng đồng cần sự dẫn dắt của bạn. Ước mơ lớn và hành động nhanh.', ['dẫn dắt', 'năng động', 'ước mơ']),
    e('aries', 12, 'Nỗi sợ ẩn giấu về sự yếu đuối. Bạn cần học cách nghỉ ngơi và chấp nhận tính dễ tổn thương.', ['ẩn giấu', 'yếu đuối', 'nghỉ ngơi']),

    // ── Taurus (Kim Ngưu) ──
    e('taurus', 1, 'Cung Mọc Kim Ngưu: Kiên định, thực tế, đáng tin cậy. Bạn tiếp cận cuộc sống từ tốn, ổn định, và trân trọng vẻ đẹp.', ['kiên định', 'thực tế', 'ổn định']),
    e('taurus', 2, 'Tài chính ổn định, tích lũy bền vững. Bạn yêu thích xa hoa nhưng biết cách quản lý tiền tốt.', ['ổn định', 'tích lũy', 'xa hoa']),
    e('taurus', 3, 'Giao tiếp chậm rãi, sâu sắc. Bạn suy nghĩ kỹ trước khi nói, giọng nói dễ chịu.', ['chậm rãi', 'sâu sắc', 'kỹ lưỡng']),
    e('taurus', 4, 'Nhà cửa ấm áp, thoải mái. Bạn đầu tư nhiều vào không gian sống, yêu thích vườn tược.', ['ấm áp', 'thoải mái', 'thiên nhiên']),
    e('taurus', 5, 'Sáng tạo mang tính giác quan — nghệ thuật, ẩm thực, âm nhạc. Tình yêu trung thành và bền vững.', ['giác quan', 'trung thành', 'nghệ thuật']),
    e('taurus', 6, 'Làm việc bền bỉ, nhất quán. Bạn thích thói quen ổn định và có sức chịu đựng trong công việc.', ['bền bỉ', 'ổn định', 'chịu đựng']),
    e('taurus', 7, 'Tìm kiếm đối tác đáng tin cậy, trung thành. Hôn nhân bền vững nếu có nền tảng vật chất ổn định.', ['trung thành', 'ổn định', 'bền vững']),
    e('taurus', 8, 'Biến đổi chậm nhưng sâu sắc. Bạn bám víu vào sự ổn định nhưng khi buông tay, sự thay đổi rất triệt để.', ['chậm', 'sâu sắc', 'triệt để']),
    e('taurus', 9, 'Triết lý thực tế, giáo dục thiên về ứng dụng. Bạn du lịch để tận hưởng, không phải để mạo hiểm.', ['thực tế', 'tận hưởng', 'ứng dụng']),
    e('taurus', 10, 'Sự nghiệp đòi hỏi sự ổn định, có thể trong tài chính, nghệ thuật, ẩm thực. Thăng tiến chậm nhưng chắc.', ['ổn định', 'bền vững', 'tài chính']),
    e('taurus', 11, 'Bạn bè đáng tin, mối quan hệ lâu dài. Ước mơ gắn với an ninh vật chất và cuộc sống tốt đẹp.', ['đáng tin', 'lâu dài', 'an ninh']),
    e('taurus', 12, 'Nhu cầu ẩn giấu về sự an toàn. Bạn tìm bình yên trong thiên nhiên và sự yên tĩnh.', ['an toàn', 'thiên nhiên', 'yên tĩnh']),

    // ── Gemini (Song Tử) ──
    e('gemini', 1, 'Cung Mọc Song Tử: Linh hoạt, tò mò, giao tiếp giỏi. Bạn tiếp cận cuộc sống với sự ham học hỏi và khả năng thích nghi.', ['linh hoạt', 'tò mò', 'giao tiếp']),
    e('gemini', 2, 'Nhiều nguồn thu nhập, tài chính biến động. Bạn kiếm tiền từ giao tiếp, buôn bán hoặc viết lách.', ['đa dạng', 'giao tiếp', 'biến động']),
    e('gemini', 3, 'Giao tiếp xuất sắc, học nhanh. Bạn thích trao đổi ý tưởng và có mạng lưới liên lạc rộng.', ['giao tiếp', 'nhanh nhẹn', 'ý tưởng']),
    e('gemini', 4, 'Gia đình đầy trao đổi, có thể chuyển nhà nhiều lần. Bạn cần sự kích thích trí tuệ tại nhà.', ['trao đổi', 'di chuyển', 'trí tuệ']),
    e('gemini', 5, 'Sáng tạo đa dạng, tình yêu cần giao tiếp. Bạn có thể yêu nhiều thứ cùng lúc.', ['đa dạng', 'giao tiếp', 'đa tài']),
    e('gemini', 6, 'Môi trường làm việc cần đa dạng, giao tiếp. Bạn có thể làm nhiều công việc cùng lúc.', ['đa dạng', 'linh hoạt', 'đa nhiệm']),
    e('gemini', 7, 'Đối tác cần thông minh, trò chuyện được. Mối quan hệ dựa trên giao tiếp và trí tuệ.', ['thông minh', 'giao tiếp', 'trí tuệ']),
    e('gemini', 8, 'Tìm hiểu bí mật qua giao tiếp và nghiên cứu. Biến đổi qua việc thay đổi tư duy.', ['nghiên cứu', 'tìm hiểu', 'tư duy']),
    e('gemini', 9, 'Yêu thích ngoại ngữ, du lịch nhiều nơi. Triết lý linh hoạt, không giáo điều.', ['ngoại ngữ', 'du lịch', 'linh hoạt']),
    e('gemini', 10, 'Sự nghiệp trong truyền thông, giáo dục, viết lách. Có thể có hai sự nghiệp.', ['truyền thông', 'giáo dục', 'hai nghề']),
    e('gemini', 11, 'Mạng lưới bạn bè rộng, đa dạng. Ước mơ gắn với kết nối và chia sẻ kiến thức.', ['mạng lưới', 'đa dạng', 'kiến thức']),
    e('gemini', 12, 'Tâm trí hoạt động liên tục, khó yên tĩnh. Cần thiền định để tĩnh lặng tiềm thức.', ['tâm trí', 'yên tĩnh', 'thiền']),

    // ── Cancer (Cự Giải) ──
    e('cancer', 1, 'Cung Mọc Cự Giải: Nhạy cảm, bảo vệ, trực giác mạnh. Bạn tiếp cận cuộc sống bằng cảm xúc và bản năng mẹ.', ['nhạy cảm', 'bảo vệ', 'trực giác']),
    e('cancer', 2, 'Tài chính gắn với cảm xúc an toàn. Bạn tiết kiệm để bảo vệ gia đình và dự phòng tương lai.', ['an toàn', 'tiết kiệm', 'bảo vệ']),
    e('cancer', 3, 'Giao tiếp cảm xúc, nhạy bén. Bạn nhớ ký ức và câu chuyện, có tài kể chuyện.', ['cảm xúc', 'ký ức', 'kể chuyện']),
    e('cancer', 4, 'Vị trí tự nhiên. Gia đình là tất cả. Bạn tạo ra mái ấm ấm áp, bảo vệ gia đình hết mình.', ['gia đình', 'mái ấm', 'bảo vệ']),
    e('cancer', 5, 'Sáng tạo từ cảm xúc, tình yêu bảo vệ. Yêu thương con cái rất sâu đậm.', ['cảm xúc', 'bảo vệ', 'con cái']),
    e('cancer', 6, 'Chăm sóc đồng nghiệp, môi trường làm việc gia đình. Sức khỏe bị ảnh hưởng bởi cảm xúc.', ['chăm sóc', 'gia đình', 'cảm xúc']),
    e('cancer', 7, 'Tìm kiếm đối tác chăm sóc, ấm áp. Hôn nhân mang tính bảo vệ và nuôi dưỡng.', ['chăm sóc', 'ấm áp', 'nuôi dưỡng']),
    e('cancer', 8, 'Cảm xúc sâu thẳm khi đối mặt biến đổi. Bạn bám víu vào quá khứ nhưng cần buông tay để phát triển.', ['cảm xúc', 'bám víu', 'buông tay']),
    e('cancer', 9, 'Triết lý sống gắn với truyền thống gia đình. Du lịch để tìm "nhà" ở mọi nơi.', ['truyền thống', 'gia đình', 'thuộc về']),
    e('cancer', 10, 'Sự nghiệp chăm sóc: y tế, giáo dục, ẩm thực. Hình ảnh công chúng dịu dàng.', ['chăm sóc', 'giáo dục', 'dịu dàng']),
    e('cancer', 11, 'Bạn bè như gia đình, cộng đồng thân mật. Ước mơ về một thế giới an toàn.', ['gia đình', 'thân mật', 'an toàn']),
    e('cancer', 12, 'Cảm xúc ẩn giấu sâu, nhu cầu được bảo vệ. Cần không gian riêng để xử lý cảm xúc.', ['ẩn giấu', 'bảo vệ', 'riêng tư']),

    // ── Leo (Sư Tử) ──
    e('leo', 1, 'Cung Mọc Sư Tử: Tự tin, rạng rỡ, lãnh đạo bẩm sinh. Bạn là trung tâm chú ý, toát ra năng lượng ấm áp.', ['tự tin', 'lãnh đạo', 'rạng rỡ']),
    e('leo', 2, 'Tài chính hào phóng, yêu xa hoa. Bạn kiếm tiền để sống sang trọng và thể hiện đẳng cấp.', ['hào phóng', 'xa hoa', 'đẳng cấp']),
    e('leo', 3, 'Giao tiếp ấn tượng, kịch tính. Bạn kể chuyện hấp dẫn, viết giàu cảm xúc, nói có sức cuốn hút.', ['ấn tượng', 'kịch tính', 'cuốn hút']),
    e('leo', 4, 'Nhà là lâu đài, tự hào về gia đình. Bạn muốn tạo ra mái ấm lộng lẫy và truyền thống gia đình vẻ vang.', ['lộng lẫy', 'tự hào', 'truyền thống']),
    e('leo', 5, 'Vị trí tự nhiên. Sáng tạo rực rỡ, tình yêu lãng mạn kịch tính. Bạn sống trọn vẹn cho niềm vui.', ['sáng tạo', 'lãng mạn', 'niềm vui']),
    e('leo', 6, 'Làm việc cần được công nhận. Bạn là người lãnh đạo tự nhiên trong nhóm, cần sân khấu để tỏa sáng.', ['công nhận', 'lãnh đạo', 'tỏa sáng']),
    e('leo', 7, 'Thu hút đối tác ấn tượng, nổi bật. Mối quan hệ cần sự tôn trọng và ngưỡng mộ lẫn nhau.', ['ấn tượng', 'tôn trọng', 'ngưỡng mộ']),
    e('leo', 8, 'Đối mặt biến đổi với phẩm giá và sức mạnh. Bạn không bao giờ thể hiện sự yếu đuối khi gặp khủng hoảng.', ['phẩm giá', 'sức mạnh', 'kiêu hãnh']),
    e('leo', 9, 'Triết lý sống rộng lớn, giáo dục mang tính truyền cảm hứng. Du lịch như vua chúa.', ['truyền cảm hứng', 'rộng lớn', 'vương giả']),
    e('leo', 10, 'Sự nghiệp cần sân khấu — giải trí, lãnh đạo, nghệ thuật. Danh tiếng rực rỡ.', ['sân khấu', 'lãnh đạo', 'danh tiếng']),
    e('leo', 11, 'Bạn bè ngưỡng mộ bạn, cộng đồng cần bạn dẫn dắt. Ước mơ lớn lao, đầy nhiệt huyết.', ['ngưỡng mộ', 'dẫn dắt', 'nhiệt huyết']),
    e('leo', 12, 'Nỗi sợ ẩn giấu về việc không được yêu. Bạn cần học cách tỏa sáng từ bên trong, không cần khán giả.', ['ẩn giấu', 'tự yêu', 'nội tâm']),

    // ── Virgo (Xử Nữ) ──
    e('virgo', 1, 'Cung Mọc Xử Nữ: Cẩn thận, phân tích, khiêm tốn. Bạn tiếp cận cuộc sống với tinh thần phục vụ và hoàn thiện.', ['cẩn thận', 'phân tích', 'khiêm tốn']),
    e('virgo', 2, 'Quản lý tài chính tốt, tiết kiệm thông minh. Bạn có mắt nhìn giá trị thực tế.', ['tiết kiệm', 'quản lý', 'thực tế']),
    e('virgo', 3, 'Giao tiếp chính xác, tỉ mỉ. Bạn viết rõ ràng, phân tích logic mạnh.', ['chính xác', 'tỉ mỉ', 'logic']),
    e('virgo', 4, 'Nhà cửa ngăn nắp, sạch sẽ. Bạn quan tâm đến sức khỏe gia đình và chế độ dinh dưỡng.', ['ngăn nắp', 'sạch sẽ', 'sức khỏe']),
    e('virgo', 5, 'Sáng tạo tỉ mỉ, chú trọng chi tiết. Tình yêu thực tế, ít lãng mạn viển vông.', ['tỉ mỉ', 'chi tiết', 'thực tế']),
    e('virgo', 6, 'Vị trí tự nhiên. Làm việc cẩn thận, có hệ thống. Bạn là người xử lý chi tiết tốt nhất trong nhóm.', ['hệ thống', 'chi tiết', 'hoàn hảo']),
    e('virgo', 7, 'Đối tác cần thực tế, đáng tin cậy. Mối quan hệ dựa trên sự giúp đỡ và cải thiện lẫn nhau.', ['thực tế', 'đáng tin', 'cải thiện']),
    e('virgo', 8, 'Phân tích sâu sắc khi đối mặt biến đổi. Bạn tìm giải pháp logic cho mọi khủng hoảng.', ['phân tích', 'logic', 'giải pháp']),
    e('virgo', 9, 'Triết lý thực hành, giáo dục chuyên sâu. Bạn tìm chân lý qua nghiên cứu tỉ mỉ.', ['nghiên cứu', 'thực hành', 'chuyên sâu']),
    e('virgo', 10, 'Sự nghiệp cần sự chính xác — y tế, kế toán, nghiên cứu. Được đánh giá qua chất lượng công việc.', ['chính xác', 'chất lượng', 'nghiên cứu']),
    e('virgo', 11, 'Bạn bè thực tế, cộng đồng hướng phục vụ. Ước mơ cải thiện thế giới bằng hành động cụ thể.', ['phục vụ', 'cải thiện', 'cụ thể']),
    e('virgo', 12, 'Tiềm thức phê phán bản thân. Cần học cách tha thứ cho sự không hoàn hảo và buông bỏ kiểm soát.', ['phê phán', 'tha thứ', 'buông bỏ']),

    // ── Libra (Thiên Bình) ──
    e('libra', 1, 'Cung Mọc Thiên Bình: Duyên dáng, hài hòa, ngoại giao. Bạn tiếp cận cuộc sống với tinh thần công bằng và thẩm mỹ.', ['duyên dáng', 'hài hòa', 'công bằng']),
    e('libra', 2, 'Tài chính gắn với mối quan hệ. Bạn có thể kiếm tiền từ nghệ thuật, ngoại giao, hoặc ngành làm đẹp.', ['nghệ thuật', 'ngoại giao', 'làm đẹp']),
    e('libra', 3, 'Giao tiếp lịch sự, ngoại giao. Bạn biết cách nói để ai cũng hài lòng.', ['lịch sự', 'ngoại giao', 'hài hòa']),
    e('libra', 4, 'Nhà cửa đẹp, hài hòa. Bạn cần không gian sống thẩm mỹ, yên bình.', ['đẹp', 'hài hòa', 'thẩm mỹ']),
    e('libra', 5, 'Sáng tạo hài hòa, tình yêu lãng mạn. Bạn yêu cái đẹp trong mọi hình thức.', ['lãng mạn', 'hài hòa', 'cái đẹp']),
    e('libra', 6, 'Môi trường làm việc cần hài hòa. Bạn là người hòa giải tốt giữa các đồng nghiệp.', ['hài hòa', 'hòa giải', 'hợp tác']),
    e('libra', 7, 'Vị trí tự nhiên. Hôn nhân rất quan trọng. Bạn tìm kiếm người bạn đời hoàn hảo để cân bằng.', ['hôn nhân', 'cân bằng', 'hoàn hảo']),
    e('libra', 8, 'Biến đổi mang lại cân bằng mới. Bạn tìm sự công bằng ngay cả trong khủng hoảng nhất.', ['cân bằng', 'công bằng', 'hài hòa']),
    e('libra', 9, 'Triết lý công bằng, giáo dục nhân văn. Bạn yêu nghệ thuật và văn hóa của mọi quốc gia.', ['công bằng', 'nhân văn', 'văn hóa']),
    e('libra', 10, 'Sự nghiệp ngoại giao, luật, nghệ thuật. Hình ảnh công chúng duyên dáng, thanh lịch.', ['ngoại giao', 'luật', 'thanh lịch']),
    e('libra', 11, 'Bạn bè giúp tạo cân bằng. Ước mơ về một thế giới công bằng hơn.', ['cân bằng', 'công bằng', 'hòa bình']),
    e('libra', 12, 'Nỗi sợ ẩn giấu về sự cô đơn. Cần học cách tự cân bằng mà không phụ thuộc người khác.', ['cô đơn', 'tự cân bằng', 'độc lập']),

    // ── Scorpio (Bọ Cạp) ──
    e('scorpio', 1, 'Cung Mọc Bọ Cạp: Mãnh liệt, bí ẩn, quyền lực. Bạn tiếp cận cuộc sống với chiều sâu và sự kiên quyết.', ['mãnh liệt', 'bí ẩn', 'quyền lực']),
    e('scorpio', 2, 'Tài chính bí mật, đầu tư chiến lược. Bạn có thể hưởng thừa kế hoặc kiếm tiền từ lĩnh vực ẩn giấu.', ['bí mật', 'chiến lược', 'đầu tư']),
    e('scorpio', 3, 'Ngôn từ có sức mạnh, giao tiếp sâu sắc. Bạn biết cách thăm dò người khác bằng câu hỏi.', ['sâu sắc', 'sức mạnh', 'thăm dò']),
    e('scorpio', 4, 'Gia đình có bí mật, tình cảm sâu đậm. Bạn bảo vệ gia đình với bản năng mãnh liệt.', ['bí mật', 'sâu đậm', 'bảo vệ']),
    e('scorpio', 5, 'Sáng tạo mãnh liệt, tình yêu đam mê. Bạn yêu tột độ hoặc không yêu gì cả.', ['mãnh liệt', 'đam mê', 'tột độ']),
    e('scorpio', 6, 'Làm việc với cường độ cao, có khả năng chữa lành. Sức khỏe gắn với đời sống cảm xúc.', ['cường độ', 'chữa lành', 'cảm xúc']),
    e('scorpio', 7, 'Mối quan hệ biến đổi sâu sắc. Thu hút đối tác quyền lực, đam mê mãnh liệt.', ['biến đổi', 'đam mê', 'quyền lực']),
    e('scorpio', 8, 'Vị trí tự nhiên. Sức mạnh biến đổi cực đại. Bạn không sợ bất kỳ thử thách nào.', ['biến đổi', 'sức mạnh', 'tái sinh']),
    e('scorpio', 9, 'Triết lý sống sâu sắc, tìm kiếm sự thật tuyệt đối. Du lịch để khám phá bí mật.', ['sâu sắc', 'sự thật', 'bí mật']),
    e('scorpio', 10, 'Sự nghiệp quyền lực — tài chính, y khoa, tâm lý, điều tra. Ảnh hưởng lớn.', ['quyền lực', 'điều tra', 'ảnh hưởng']),
    e('scorpio', 11, 'Bạn bè ít nhưng gắn bó sâu sắc. Ước mơ cải cách, thay đổi hệ thống.', ['sâu sắc', 'cải cách', 'trung thành']),
    e('scorpio', 12, 'Tiềm thức cực kỳ mạnh. Cần đối mặt bóng tối nội tâm để tìm sức mạnh thật sự.', ['tiềm thức', 'bóng tối', 'sức mạnh']),

    // ── Sagittarius (Nhân Mã) ──
    e('sagittarius', 1, 'Cung Mọc Nhân Mã: Lạc quan, phiêu lưu, tự do. Bạn tiếp cận cuộc sống với tinh thần khám phá.', ['lạc quan', 'phiêu lưu', 'tự do']),
    e('sagittarius', 2, 'Tài chính may mắn, hào phóng. Bạn tin rằng tiền sẽ đến khi cần và chi tiêu rộng rãi.', ['may mắn', 'hào phóng', 'lạc quan']),
    e('sagittarius', 3, 'Giao tiếp rộng mở, truyền cảm hứng. Bạn yêu thích học hỏi liên tục và chia sẻ kiến thức.', ['truyền cảm hứng', 'học hỏi', 'rộng mở']),
    e('sagittarius', 4, 'Gia đình đa văn hóa hoặc có gốc rễ nước ngoài. Nhà là nơi tự do và mở rộng.', ['đa văn hóa', 'tự do', 'mở rộng']),
    e('sagittarius', 5, 'Sáng tạo phiêu lưu, tình yêu tự do. Bạn yêu du lịch, thể thao, và trải nghiệm mới.', ['phiêu lưu', 'tự do', 'trải nghiệm']),
    e('sagittarius', 6, 'Công việc cần tự do và ý nghĩa. Bạn không chịu được sự nhàm chán, cần thử thách liên tục.', ['tự do', 'ý nghĩa', 'thử thách']),
    e('sagittarius', 7, 'Đối tác phiêu lưu, yêu tự do. Hôn nhân cần không gian riêng cho cả hai.', ['phiêu lưu', 'tự do', 'không gian']),
    e('sagittarius', 8, 'Biến đổi mang lại sự mở rộng ý thức. Bạn nhìn khủng hoảng như cơ hội phát triển.', ['mở rộng', 'cơ hội', 'ý thức']),
    e('sagittarius', 9, 'Vị trí tự nhiên. Triết gia, giáo viên, nhà thám hiểm. Du lịch và giáo dục là sứ mệnh.', ['triết lý', 'giáo dục', 'thám hiểm']),
    e('sagittarius', 10, 'Sự nghiệp quốc tế — giáo dục, luật, du lịch, xuất bản. Tầm nhìn lớn lao.', ['quốc tế', 'giáo dục', 'tầm nhìn']),
    e('sagittarius', 11, 'Bạn bè quốc tế, cộng đồng rộng lớn. Ước mơ mở rộng ra thế giới.', ['quốc tế', 'mở rộng', 'lý tưởng']),
    e('sagittarius', 12, 'Nỗi sợ ẩn giấu về giới hạn. Cần học cách tìm tự do nội tâm, không chỉ bên ngoài.', ['giới hạn', 'tự do nội tâm', 'ẩn giấu']),

    // ── Capricorn (Ma Kết) ──
    e('capricorn', 1, 'Cung Mọc Ma Kết: Nghiêm túc, tham vọng, kỷ luật. Bạn tiếp cận cuộc sống với sự kiên nhẫn và trách nhiệm.', ['nghiêm túc', 'tham vọng', 'kỷ luật']),
    e('capricorn', 2, 'Tài chính xây dựng bền vững. Bạn tích lũy từ từ và quản lý tài chính rất giỏi.', ['bền vững', 'tích lũy', 'quản lý']),
    e('capricorn', 3, 'Giao tiếp có trọng lượng, nghiêm túc. Bạn nói ít nhưng mỗi lời đều có giá trị.', ['nghiêm túc', 'trọng lượng', 'giá trị']),
    e('capricorn', 4, 'Gia đình theo truyền thống, kỷ luật. Bạn xây dựng nền tảng gia đình vững chắc cho tương lai.', ['truyền thống', 'kỷ luật', 'vững chắc']),
    e('capricorn', 5, 'Sáng tạo có kỷ luật, tình yêu nghiêm túc. Bạn có thể gặp khó khăn trong việc vui chơi thoải mái.', ['kỷ luật', 'nghiêm túc', 'trưởng thành']),
    e('capricorn', 6, 'Làm việc cực kỳ có hệ thống. Bạn là nhân viên kiểu mẫu, đáng tin cậy nhất.', ['hệ thống', 'kiểu mẫu', 'đáng tin']),
    e('capricorn', 7, 'Đối tác nghiêm túc, có trách nhiệm. Hôn nhân dựa trên cam kết lâu dài.', ['nghiêm túc', 'cam kết', 'lâu dài']),
    e('capricorn', 8, 'Biến đổi qua kỷ luật và cấu trúc. Bạn đối mặt khủng hoảng với sự điềm tĩnh.', ['kỷ luật', 'cấu trúc', 'điềm tĩnh']),
    e('capricorn', 9, 'Triết lý thực tế, giáo dục truyền thống. Bạn xây dựng hệ thống niềm tin có cấu trúc.', ['thực tế', 'truyền thống', 'cấu trúc']),
    e('capricorn', 10, 'Vị trí tự nhiên. Đỉnh cao sự nghiệp, tham vọng lớn nhất. Bạn sinh ra để lãnh đạo.', ['đỉnh cao', 'tham vọng', 'lãnh đạo']),
    e('capricorn', 11, 'Bạn bè ít nhưng chất lượng. Ước mơ xây dựng di sản lâu dài cho thế hệ sau.', ['chất lượng', 'di sản', 'lâu dài']),
    e('capricorn', 12, 'Nỗi sợ ẩn giấu về sự thất bại. Cần học cách buông bỏ kiểm soát và tin vào dòng chảy cuộc đời.', ['thất bại', 'buông bỏ', 'dòng chảy']),

    // ── Aquarius (Bảo Bình) ──
    e('aquarius', 1, 'Cung Mọc Bảo Bình: Độc đáo, tiến bộ, nhân đạo. Bạn tiếp cận cuộc sống khác biệt so với số đông.', ['độc đáo', 'tiến bộ', 'nhân đạo']),
    e('aquarius', 2, 'Tài chính từ công nghệ hoặc lĩnh vực mới. Bạn có quan điểm khác biệt về giá trị vật chất.', ['công nghệ', 'khác biệt', 'đổi mới']),
    e('aquarius', 3, 'Tư duy tiên phong, giao tiếp khác biệt. Bạn có ý tưởng đi trước thời đại.', ['tiên phong', 'khác biệt', 'đổi mới']),
    e('aquarius', 4, 'Gia đình không theo khuôn mẫu. Bạn xây dựng kiểu nhà riêng, có thể sống khác biệt.', ['khác biệt', 'tự do', 'không truyền thống']),
    e('aquarius', 5, 'Sáng tạo đột phá, tình yêu tự do. Bạn yêu sự bất ngờ và không chấp nhận khuôn mẫu.', ['đột phá', 'tự do', 'bất ngờ']),
    e('aquarius', 6, 'Phương pháp làm việc khác biệt. Bạn dùng công nghệ để cải thiện hiệu quả.', ['công nghệ', 'khác biệt', 'hiệu quả']),
    e('aquarius', 7, 'Đối tác khác biệt, mối quan hệ tiến bộ. Hôn nhân cần tự do cá nhân.', ['tiến bộ', 'tự do', 'khác biệt']),
    e('aquarius', 8, 'Biến đổi qua giác ngộ trí tuệ. Bạn nhìn khủng hoảng từ góc độ khách quan.', ['giác ngộ', 'trí tuệ', 'khách quan']),
    e('aquarius', 9, 'Triết lý tiến bộ, giáo dục đổi mới. Bạn tìm kiếm chân lý qua khoa học và nhân đạo.', ['tiến bộ', 'đổi mới', 'nhân đạo']),
    e('aquarius', 10, 'Sự nghiệp trong công nghệ, khoa học, nhân đạo. Bạn muốn tạo ra sự thay đổi xã hội.', ['công nghệ', 'khoa học', 'thay đổi']),
    e('aquarius', 11, 'Vị trí tự nhiên. Cộng đồng và nhóm là sức mạnh. Ước mơ cách mạng xã hội.', ['cộng đồng', 'cách mạng', 'tương lai']),
    e('aquarius', 12, 'Nỗi sợ ẩn giấu về sự khác biệt. Cần học cách chấp nhận bản thân và kết nối cảm xúc.', ['khác biệt', 'chấp nhận', 'kết nối']),

    // ── Pisces (Song Ngư) ──
    e('pisces', 1, 'Cung Mọc Song Ngư: Mơ mộng, nhạy cảm, từ bi. Bạn tiếp cận cuộc sống bằng trực giác và lòng trắc ẩn.', ['mơ mộng', 'nhạy cảm', 'từ bi']),
    e('pisces', 2, 'Tài chính mơ hồ, khó quản lý. Bạn có thể kiếm tiền từ nghệ thuật hoặc tâm linh.', ['mơ hồ', 'nghệ thuật', 'tâm linh']),
    e('pisces', 3, 'Giao tiếp thi vị, giàu tưởng tượng. Bạn viết sáng tạo tuyệt vời nhưng có thể mơ hồ.', ['thi vị', 'tưởng tượng', 'sáng tạo']),
    e('pisces', 4, 'Nhà là nơi trú ẩn tâm linh. Bạn cần không gian sống yên tĩnh, gần nước.', ['tâm linh', 'yên tĩnh', 'trú ẩn']),
    e('pisces', 5, 'Sáng tạo thiên tài, tình yêu lý tưởng. Bạn có khả năng nghệ thuật đặc biệt.', ['thiên tài', 'lý tưởng', 'nghệ thuật']),
    e('pisces', 6, 'Phục vụ với lòng từ bi. Bạn quan tâm đến y học thay thế, chữa lành bằng năng lượng.', ['từ bi', 'chữa lành', 'phục vụ']),
    e('pisces', 7, 'Đối tác mơ mộng, tâm linh. Cần thực tế hơn trong chọn bạn đời, tránh ảo tưởng.', ['mơ mộng', 'tâm linh', 'ảo tưởng']),
    e('pisces', 8, 'Biến đổi qua tâm linh. Bạn có trực giác siêu phàm về sự sống chết và chiều không gian khác.', ['tâm linh', 'trực giác', 'siêu phàm']),
    e('pisces', 9, 'Triết lý tâm linh, tìm kiếm giác ngộ. Du lịch đến nơi thiêng liêng để tìm ý nghĩa.', ['tâm linh', 'giác ngộ', 'thiêng liêng']),
    e('pisces', 10, 'Sự nghiệp nghệ thuật, y tế, tâm linh. Hình ảnh công chúng đầy bí ẩn và nhân ái.', ['nghệ thuật', 'tâm linh', 'nhân ái']),
    e('pisces', 11, 'Bạn bè từ mọi tầng lớp, cộng đồng từ thiện. Ước mơ chữa lành thế giới.', ['từ thiện', 'chữa lành', 'bao dung']),
    e('pisces', 12, 'Vị trí tự nhiên. Tâm linh sâu sắc nhất. Bạn kết nối với vô thức tập thể và chiều cao hơn.', ['tâm linh', 'vô thức', 'giác ngộ']),
]);

/** Lookup interpretation by sign and house number */
export function getSignOnHouseInterpretation(sign: ZodiacSignId, house: number): InterpretationEntry | undefined {
    return SIGN_ON_HOUSE.get(`${sign}-on-house-${house}`);
}
