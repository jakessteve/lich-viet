import type { InterpretationEntry, AspectType } from '../../types/westernAstro';

// =============================================================================
// Aspect Interpretation Texts — Vietnamese
// Major planet pairs × 5 major aspect types
// Key format: "planet1-aspectType-planet2"
// =============================================================================

function e(key: string, title: string, body: string, keywords: string[]): [string, InterpretationEntry] {
    return [key, { key, title, body, keywords }];
}

/** Aspect Vietnamese names for titles */
export const AT: Record<string, string> = {
    conjunction: 'Hợp', sextile: 'Lục hợp', square: 'Vuông',
    trine: 'Tam hợp', opposition: 'Đối',
};

export const ASPECT_MEANINGS = new Map<string, InterpretationEntry>([
    // ── Sun-Moon ──
    e('sun-conjunction-moon', '☉ Mặt Trời Hợp ☽ Mặt Trăng', 'Bản ngã và cảm xúc hợp nhất. Cá tính mạnh, đơn giản, tập trung. Tuy nhiên có thể thiếu khách quan vì không phân biệt được giữa muốn và cần.', ['hợp nhất', 'tập trung', 'mạnh mẽ']),
    e('sun-sextile-moon', '☉ Mặt Trời Lục hợp ☽ Mặt Trăng', 'Hài hòa giữa ý chí và cảm xúc. Bạn cân bằng tốt giữa lý trí và trái tim, dễ hợp tác với cả nam và nữ.', ['hài hòa', 'cân bằng', 'hợp tác']),
    e('sun-square-moon', '☉ Mặt Trời Vuông ☽ Mặt Trăng', 'Xung đột nội tâm giữa ý chí và cảm xúc. Bạn hay bị giằng xé giữa điều mình muốn và điều mình cần. Đây là động lực phát triển mạnh.', ['xung đột', 'giằng xé', 'phát triển']),
    e('sun-trine-moon', '☉ Mặt Trời Tam hợp ☽ Mặt Trăng', 'Sự thuận lợi tự nhiên: ý chí và cảm xúc cùng chiều. Bạn tự tin, dễ chịu, được mọi người yêu mến.', ['thuận lợi', 'tự tin', 'yêu mến']),
    e('sun-opposition-moon', '☉ Mặt Trời Đối ☽ Mặt Trăng', 'Sinh vào Trăng tròn — xung đột giữa bản ngã và nhu cầu cảm xúc. Bạn cần cân bằng giữa cho và nhận, giữa bản thân và người khác.', ['xung đột', 'cân bằng', 'trăng tròn']),

    // ── Sun-Mercury ──
    e('sun-conjunction-mercury', '☉ Mặt Trời Hợp ☿ Thủy Tinh', 'Trí tuệ gắn liền với bản ngã. Bạn thể hiện bản thân qua tư duy và lời nói. Tuy nhiên có thể quá chủ quan trong suy nghĩ.', ['trí tuệ', 'bản ngã', 'chủ quan']),

    // ── Sun-Venus ──
    e('sun-conjunction-venus', '☉ Mặt Trời Hợp ♀ Kim Tinh', 'Duyên dáng, yêu cái đẹp, có sức hút tự nhiên. Bạn trân trọng hòa bình và nghệ thuật, dễ được yêu mến.', ['duyên dáng', 'nghệ thuật', 'yêu mến']),
    e('sun-sextile-venus', '☉ Mặt Trời Lục hợp ♀ Kim Tinh', 'Khả năng nghệ thuật tốt, mối quan hệ hài hòa. Bạn có gu thẩm mỹ và dễ tìm kiếm tình yêu.', ['thẩm mỹ', 'hài hòa', 'tình yêu']),

    // ── Sun-Mars ──
    e('sun-conjunction-mars', '☉ Mặt Trời Hợp ♂ Hỏa Tinh', 'Năng lượng mạnh mẽ, quyết đoán, dũng cảm. Bạn hành động nhanh và có sức cạnh tranh cao, nhưng cần kiểm soát nóng nảy.', ['năng lượng', 'dũng cảm', 'nóng nảy']),
    e('sun-sextile-mars', '☉ Mặt Trời Lục hợp ♂ Hỏa Tinh', 'Ý chí và hành động phối hợp tốt. Bạn có năng lượng xây dựng, biết cách sử dụng sức mạnh hiệu quả.', ['phối hợp', 'xây dựng', 'hiệu quả']),
    e('sun-square-mars', '☉ Mặt Trời Vuông ♂ Hỏa Tinh', 'Xung đột giữa ý muốn và hành động. Bạn có thể bốc đồng, gây va chạm, nhưng đây là nguồn năng lượng động viên mạnh.', ['xung đột', 'bốc đồng', 'năng lượng']),
    e('sun-trine-mars', '☉ Mặt Trời Tam hợp ♂ Hỏa Tinh', 'Sức sống tràn đầy, lãnh đạo tự nhiên. Bạn biến ý tưởng thành hành động dễ dàng, tự tin trong mọi tình huống.', ['sức sống', 'lãnh đạo', 'hành động']),
    e('sun-opposition-mars', '☉ Mặt Trời Đối ♂ Hỏa Tinh', 'Xung đột với người khác, cạnh tranh cao. Bạn thường gặp đối thủ mạnh, nhưng qua đó phát triển sức mạnh cá nhân.', ['cạnh tranh', 'đối thủ', 'sức mạnh']),

    // ── Sun-Jupiter ──
    e('sun-conjunction-jupiter', '☉ Mặt Trời Hợp ♃ Mộc Tinh', 'Lạc quan bẩm sinh, may mắn, rộng lượng. Bạn có tầm nhìn lớn và sự tự tin dồi dào, nhưng cần tránh phô trương.', ['lạc quan', 'may mắn', 'rộng lượng']),
    e('sun-sextile-jupiter', '☉ Mặt Trời Lục hợp ♃ Mộc Tinh', 'Cơ hội tốt đến từ sự lạc quan và thiện chí. Bạn thu hút may mắn nhờ thái độ tích cực.', ['cơ hội', 'lạc quan', 'thiện chí']),
    e('sun-square-jupiter', '☉ Mặt Trời Vuông ♃ Mộc Tinh', 'Tham vọng quá lớn, có thể phóng đại. Bạn hứa quá nhiều và lan man, cần học cách tập trung.', ['phóng đại', 'tham vọng', 'tập trung']),
    e('sun-trine-jupiter', '☉ Mặt Trời Tam hợp ♃ Mộc Tinh', 'Góc chiếu may mắn nhất. Bạn được ưu ái trong cuộc sống, có tầm nhìn rộng và lòng nhân ái.', ['may mắn', 'tầm nhìn', 'nhân ái']),
    e('sun-opposition-jupiter', '☉ Mặt Trời Đối ♃ Mộc Tinh', 'Kỳ vọng quá cao từ bản thân hoặc người khác. Bạn cần cân bằng giữa tham vọng và thực tế.', ['kỳ vọng', 'cân bằng', 'thực tế']),

    // ── Sun-Saturn ──
    e('sun-conjunction-saturn', '☉ Mặt Trời Hợp ♄ Thổ Tinh', 'Nghiêm túc, kỷ luật, trưởng thành sớm. Bạn gánh vác trách nhiệm lớn nhưng xây dựng thành công bền vững.', ['kỷ luật', 'trách nhiệm', 'bền vững']),
    e('sun-sextile-saturn', '☉ Mặt Trời Lục hợp ♄ Thổ Tinh', 'Cân bằng giữa tự tin và kỷ luật. Bạn biết cách xây dựng từng bước và đạt mục tiêu qua nỗ lực bền bỉ.', ['cân bằng', 'bền bỉ', 'từng bước']),
    e('sun-square-saturn', '☉ Mặt Trời Vuông ♄ Thổ Tinh', 'Thử thách từ bản thân hoặc nhân vật uy quyền. Bạn có thể thiếu tự tin lúc đầu nhưng trở nên rất mạnh mẽ qua thời gian.', ['thử thách', 'kiên trì', 'mạnh mẽ']),
    e('sun-trine-saturn', '☉ Mặt Trời Tam hợp ♄ Thổ Tinh', 'Sự ổn định và trưởng thành tự nhiên. Bạn được tôn trọng nhờ sự đáng tin cậy và bản lĩnh.', ['ổn định', 'tôn trọng', 'bản lĩnh']),
    e('sun-opposition-saturn', '☉ Mặt Trời Đối ♄ Thổ Tinh', 'Áp lực từ xã hội hoặc cha mẹ. Bạn cảm thấy bị hạn chế nhưng qua đó xây dựng sức mạnh nội tâm phi thường.', ['áp lực', 'hạn chế', 'nội tâm']),

    // ── Moon-Venus ──
    e('moon-conjunction-venus', '☽ Mặt Trăng Hợp ♀ Kim Tinh', 'Cảm xúc dịu dàng, yêu cái đẹp. Bạn có khả năng tạo không gian ấm cúng, hài hòa trong mối quan hệ.', ['dịu dàng', 'hài hòa', 'ấm cúng']),
    e('moon-square-venus', '☽ Mặt Trăng Vuông ♀ Kim Tinh', 'Xung đột giữa nhu cầu cảm xúc và ham muốn. Bạn có thể khó cân bằng giữa cho và nhận trong tình yêu.', ['xung đột', 'ham muốn', 'cân bằng']),
    e('moon-trine-venus', '☽ Mặt Trăng Tam hợp ♀ Kim Tinh', 'Cảm xúc và tình yêu hài hòa. Bạn có tài năng nghệ thuật bẩm sinh và thu hút mối quan hệ tốt đẹp.', ['hài hòa', 'nghệ thuật', 'tốt đẹp']),
    e('moon-opposition-venus', '☽ Mặt Trăng Đối ♀ Kim Tinh', 'Giằng xé giữa an toàn cảm xúc và sự thỏa mãn. Bạn cần học cách yêu thương bản thân trước khi cho đi.', ['giằng xé', 'an toàn', 'tự yêu']),

    // ── Moon-Mars ──
    e('moon-conjunction-mars', '☽ Mặt Trăng Hợp ♂ Hỏa Tinh', 'Cảm xúc mãnh liệt, phản ứng nhanh. Bạn có bản năng bảo vệ mạnh nhưng cần kiểm soát cơn giận bất chợt.', ['mãnh liệt', 'bản năng', 'giận dữ']),
    e('moon-square-mars', '☽ Mặt Trăng Vuông ♂ Hỏa Tinh', 'Cảm xúc dễ bùng nổ. Bạn phản ứng theo cảm xúc trước khi suy nghĩ, nhưng đây cũng là nguồn năng lượng sáng tạo.', ['bùng nổ', 'phản ứng', 'năng lượng']),
    e('moon-trine-mars', '☽ Mặt Trăng Tam hợp ♂ Hỏa Tinh', 'Cảm xúc và hành động cùng nhịp. Bạn biết khi nào cần hành động dựa trên trực giác, tự tin trong quyết định.', ['trực giác', 'tự tin', 'hành động']),

    // ── Moon-Saturn ──
    e('moon-conjunction-saturn', '☽ Mặt Trăng Hợp ♄ Thổ Tinh', 'Cảm xúc bị kìm nén, nghiêm túc từ nhỏ. Bạn có thể gặp khó khăn biểu lộ cảm xúc nhưng có sự ổn định nội tâm.', ['kìm nén', 'nghiêm túc', 'ổn định']),
    e('moon-square-saturn', '☽ Mặt Trăng Vuông ♄ Thổ Tinh', 'Cảm xúc bị hạn chế bởi trách nhiệm. Bạn khó xin sự giúp đỡ và mang gánh nặng cảm xúc một mình.', ['hạn chế', 'trách nhiệm', 'gánh nặng']),
    e('moon-opposition-saturn', '☽ Mặt Trăng Đối ♄ Thổ Tinh', 'Xung đột giữa nhu cầu cảm xúc và nghĩa vụ. Bạn cần thời gian để học cách chấp nhận và biểu lộ cảm xúc.', ['xung đột', 'nghĩa vụ', 'chấp nhận']),

    // ── Mercury-Venus ──
    e('mercury-conjunction-venus', '☿ Thủy Tinh Hợp ♀ Kim Tinh', 'Ngôn từ ngọt ngào, tư duy thẩm mỹ. Bạn giao tiếp duyên dáng, yêu thích viết văn đẹp và nghệ thuật.', ['ngọt ngào', 'thẩm mỹ', 'duyên dáng']),
    e('mercury-sextile-venus', '☿ Thủy Tinh Lục hợp ♀ Kim Tinh', 'Giao tiếp hài hòa, ngoại giao giỏi. Bạn biết cách nói để ai cũng hài lòng.', ['ngoại giao', 'hài hòa', 'lịch sự']),

    // ── Venus-Mars ──
    e('venus-conjunction-mars', '♀ Kim Tinh Hợp ♂ Hỏa Tinh', 'Đam mê và lãng mạn hợp nhất. Bạn có sức hút giới tính mạnh, yêu mãnh liệt, và có năng lượng sáng tạo cao.', ['đam mê', 'sức hút', 'sáng tạo']),
    e('venus-sextile-mars', '♀ Kim Tinh Lục hợp ♂ Hỏa Tinh', 'Cân bằng giữa dịu dàng và mạnh mẽ. Bạn biết cách theo đuổi tình yêu hiệu quả và quyến rũ.', ['cân bằng', 'quyến rũ', 'hiệu quả']),
    e('venus-square-mars', '♀ Kim Tinh Vuông ♂ Hỏa Tinh', 'Xung đột giữa yêu thương và dục vọng. Mối quan hệ đầy đam mê nhưng cũng đầy va chạm.', ['xung đột', 'đam mê', 'va chạm']),
    e('venus-trine-mars', '♀ Kim Tinh Tam hợp ♂ Hỏa Tinh', 'Sức hút tự nhiên, tình yêu hài hòa. Bạn cân bằng tốt giữa cho và nhận, giữa nhu cầu và hành động.', ['sức hút', 'hài hòa', 'cân bằng']),
    e('venus-opposition-mars', '♀ Kim Tinh Đối ♂ Hỏa Tinh', 'Căng thẳng giữa tình yêu và dục vọng. Thu hút mãnh liệt nhưng mối quan hệ cần nhiều điều chỉnh.', ['căng thẳng', 'mãnh liệt', 'điều chỉnh']),

    // ── Venus-Saturn ──
    e('venus-conjunction-saturn', '♀ Kim Tinh Hợp ♄ Thổ Tinh', 'Tình yêu nghiêm túc, cam kết. Bạn có thể gặp khó khăn trong tình yêu ban đầu nhưng mối quan hệ lâu dài rất bền.', ['nghiêm túc', 'cam kết', 'bền lâu']),
    e('venus-square-saturn', '♀ Kim Tinh Vuông ♄ Thổ Tinh', 'Thử thách trong tình yêu và tài chính. Bạn có thể cảm thấy không xứng đáng được yêu, cần học cách tự trân trọng.', ['thử thách', 'tự trọng', 'học hỏi']),
    e('venus-trine-saturn', '♀ Kim Tinh Tam hợp ♄ Thổ Tinh', 'Tình yêu bền vững, tài chính ổn định. Bạn trân trọng mối quan hệ lâu dài và xây dựng cuộc sống vững chắc.', ['bền vững', 'ổn định', 'lâu dài']),

    // ── Mars-Jupiter ──
    e('mars-conjunction-jupiter', '♂ Hỏa Tinh Hợp ♃ Mộc Tinh', 'Hành động lớn, tham vọng lớn. Bạn có năng lượng dồi dào, lạc quan trong hành động, và thường gặp may mắn.', ['tham vọng', 'năng lượng', 'may mắn']),
    e('mars-square-jupiter', '♂ Hỏa Tinh Vuông ♃ Mộc Tinh', 'Hành động quá mức, rải rác. Bạn có thể liều lĩnh, phóng đại, hoặc bắt đầu quá nhiều dự án cùng lúc.', ['liều lĩnh', 'rải rác', 'phóng đại']),
    e('mars-trine-jupiter', '♂ Hỏa Tinh Tam hợp ♃ Mộc Tinh', 'Hành động may mắn, thành công thuận lợi. Bạn biết nắm bắt cơ hội và hành động đúng thời điểm.', ['may mắn', 'cơ hội', 'thành công']),

    // ── Mars-Saturn ──
    e('mars-conjunction-saturn', '♂ Hỏa Tinh Hợp ♄ Thổ Tinh', 'Hành động có kỷ luật, bền bỉ. Bạn có sức chịu đựng lớn, nhưng có thể bị kìm hãm hoặc thất vọng khi không được hành động.', ['kỷ luật', 'bền bỉ', 'kiểm soát']),
    e('mars-square-saturn', '♂ Hỏa Tinh Vuông ♄ Thổ Tinh', 'Xung đột giữa muốn hành động và bị chặn. Sự thất vọng lớn, nhưng khi vượt qua sẽ đạt thành công bền vững.', ['thất vọng', 'vượt qua', 'bền vững']),
    e('mars-opposition-saturn', '♂ Hỏa Tinh Đối ♄ Thổ Tinh', 'Áp lực bên ngoài cản trở hành động. Bạn cần học cách kiên nhẫn và tìm thời điểm thích hợp để hành động.', ['áp lực', 'kiên nhẫn', 'thời điểm']),

    // ── Jupiter-Saturn ──
    e('jupiter-conjunction-saturn', '♃ Mộc Tinh Hợp ♄ Thổ Tinh', 'Cân bằng giữa mở rộng và giới hạn. Bạn có khả năng xây dựng tầm nhìn lớn trên nền tảng vững chắc.', ['cân bằng', 'tầm nhìn', 'nền tảng']),
    e('jupiter-sextile-saturn', '♃ Mộc Tinh Lục hợp ♄ Thổ Tinh', 'Kết hợp tốt giữa tầm nhìn và kỷ luật. Bạn biết cách mở rộng từng bước, xây dựng thành công bền vững nhờ sự cẩn trọng.', ['bền vững', 'kỷ luật', 'tầm nhìn']),
    e('jupiter-square-saturn', '♃ Mộc Tinh Vuông ♄ Thổ Tinh', 'Xung đột giữa lạc quan và thận trọng. Bạn hay dao động giữa liều lĩnh và bảo thủ, cần tìm điểm cân bằng.', ['dao động', 'xung đột', 'cân bằng']),
    e('jupiter-trine-saturn', '♃ Mộc Tinh Tam hợp ♄ Thổ Tinh', 'Sự thuận lợi giữa mở rộng và kỷ luật. Bạn có khả năng biến ý tưởng lớn thành hiện thực nhờ tính kiên nhẫn và hệ thống.', ['thuận lợi', 'hiện thực', 'kiên nhẫn']),
    e('jupiter-opposition-saturn', '♃ Mộc Tinh Đối ♄ Thổ Tinh', 'Căng thẳng giữa tự do và trách nhiệm. Cuộc đời xoay giữa mở rộng và thu hẹp, có lúc được có lúc mất.', ['căng thẳng', 'tự do', 'trách nhiệm']),

    // ── Moon-Venus (bổ sung) ──
    e('moon-sextile-venus', '☽ Mặt Trăng Lục hợp ♀ Kim Tinh', 'Cảm xúc hài hòa với tình yêu và thẩm mỹ. Bạn dễ tạo không gian ấm áp và dễ chịu, được nhiều người yêu mến.', ['hài hòa', 'ấm áp', 'yêu mến']),

    // ── Moon-Mars (bổ sung) ──
    e('moon-sextile-mars', '☽ Mặt Trăng Lục hợp ♂ Hỏa Tinh', 'Cảm xúc và hành động phối hợp tốt. Bạn biết khi nào cần quyết đoán, bản năng bảo vệ mạnh nhưng cân bằng.', ['phối hợp', 'quyết đoán', 'bảo vệ']),
    e('moon-opposition-mars', '☽ Mặt Trăng Đối ♂ Hỏa Tinh', 'Xung đột giữa nhu cầu cảm xúc và hành động. Bạn có thể phản ứng thái quá khi bị tổn thương, cần học cách kiểm soát phản ứng.', ['xung đột', 'phản ứng', 'kiểm soát']),

    // ── Moon-Saturn (bổ sung) ──
    e('moon-sextile-saturn', '☽ Mặt Trăng Lục hợp ♄ Thổ Tinh', 'Cảm xúc ổn định nhờ kỷ luật. Bạn biết cách quản lý cảm xúc hiệu quả, đáng tin cậy trong mối quan hệ.', ['ổn định', 'kỷ luật', 'đáng tin']),
    e('moon-trine-saturn', '☽ Mặt Trăng Tam hợp ♄ Thổ Tinh', 'Cảm xúc trưởng thành, ổn định. Bạn có khả năng chịu đựng tốt, xây dựng nền tảng cảm xúc vững chắc qua thời gian.', ['trưởng thành', 'chịu đựng', 'vững chắc']),

    // ── Mars-Jupiter (bổ sung) ──
    e('mars-sextile-jupiter', '♂ Hỏa Tinh Lục hợp ♃ Mộc Tinh', 'Hành động hiệu quả, may mắn vừa phải. Bạn biết cách tận dụng cơ hội mà không liều lĩnh quá mức.', ['hiệu quả', 'cơ hội', 'khôn ngoan']),
    e('mars-opposition-jupiter', '♂ Hỏa Tinh Đối ♃ Mộc Tinh', 'Hành động quá đà, tham vọng vượt khả năng. Bạn cần hết sức cẩn thận với các dự án quá lớn và lời hứa quá nhiều.', ['quá đà', 'tham vọng', 'cẩn thận']),

    // ── Mars-Saturn (bổ sung) ──
    e('mars-sextile-saturn', '♂ Hỏa Tinh Lục hợp ♄ Thổ Tinh', 'Hành động có kế hoạch, kiên nhẫn. Bạn biết cách phối hợp sức mạnh với kỷ luật để đạt mục tiêu bền vững.', ['kế hoạch', 'kiên nhẫn', 'bền vững']),
    e('mars-trine-saturn', '♂ Hỏa Tinh Tam hợp ♄ Thổ Tinh', 'Năng lượng và kỷ luật cùng chiều. Bạn có sức chịu đựng phi thường, hành động hiệu quả và có phương pháp.', ['sức chịu đựng', 'hiệu quả', 'phương pháp']),

    // ── Venus-Saturn (bổ sung) ──
    e('venus-sextile-saturn', '♀ Kim Tinh Lục hợp ♄ Thổ Tinh', 'Tình yêu trưởng thành, trách nhiệm. Bạn biết trân trọng mối quan hệ lâu dài và xây dựng tình yêu bền vững.', ['trưởng thành', 'trân trọng', 'bền vững']),
    e('venus-opposition-saturn', '♀ Kim Tinh Đối ♄ Thổ Tinh', 'Cảm giác bị hạn chế trong tình yêu. Bạn có thể gặp trì hoãn về tình cảm, nhưng khi tìm được tình yêu thì rất bền lâu.', ['hạn chế', 'trì hoãn', 'bền lâu']),

    // ── Sun-Uranus ──
    e('sun-conjunction-uranus', '☉ Mặt Trời Hợp ♅ Thiên Vương', 'Cá tính cực kỳ độc đáo, không thể dự đoán. Bạn là người tiên phong về tư tưởng, yêu tự do tuyệt đối và thay đổi liên tục.', ['độc đáo', 'tiên phong', 'tự do']),
    e('sun-sextile-uranus', '☉ Mặt Trời Lục hợp ♅ Thiên Vương', 'Sáng tạo đổi mới, tiếp thu cái mới nhanh. Bạn kết hợp tốt giữa cá tính riêng và hòa nhập xã hội.', ['sáng tạo', 'đổi mới', 'hòa nhập']),
    e('sun-square-uranus', '☉ Mặt Trời Vuông ♅ Thiên Vương', 'Nổi loạn, khó tuân theo quy tắc. Bạn thường xuyên gặp biến động bất ngờ, nhưng đây là động lực để đổi mới bản thân.', ['nổi loạn', 'biến động', 'đổi mới']),
    e('sun-trine-uranus', '☉ Mặt Trời Tam hợp ♅ Thiên Vương', 'Trực giác sáng tạo, cá tính hấp dẫn. Bạn tự nhiên thu hút sự chú ý nhờ tư duy khác biệt và phong cách riêng.', ['trực giác', 'hấp dẫn', 'khác biệt']),
    e('sun-opposition-uranus', '☉ Mặt Trời Đối ♅ Thiên Vương', 'Căng thẳng giữa ổn định và tự do. Bạn bị kéo giữa mong muốn thuộc về và nhu cầu độc lập, cuộc đời nhiều bất ngờ.', ['bất ngờ', 'căng thẳng', 'độc lập']),

    // ── Sun-Neptune ──
    e('sun-conjunction-neptune', '☉ Mặt Trời Hợp ♆ Hải Vương', 'Nhạy cảm tâm linh, nghệ sĩ bẩm sinh. Bạn có trực giác mạnh và lòng từ bi lớn, nhưng ranh giới bản thân mờ nhạt.', ['tâm linh', 'nghệ sĩ', 'từ bi']),
    e('sun-sextile-neptune', '☉ Mặt Trời Lục hợp ♆ Hải Vương', 'Trí tưởng tượng phong phú, cảm nhận tinh tế. Bạn có thể biến cảm hứng thành hiện thực một cách hài hòa.', ['tưởng tượng', 'tinh tế', 'cảm hứng']),
    e('sun-square-neptune', '☉ Mặt Trời Vuông ♆ Hải Vương', 'Khó phân biệt thực tế và ảo tưởng. Bạn có thể bị lừa dối hoặc tự lừa mình, cần phát triển tính thực tế.', ['ảo tưởng', 'mơ hồ', 'thực tế']),
    e('sun-trine-neptune', '☉ Mặt Trời Tam hợp ♆ Hải Vương', 'Tâm linh và sáng tạo hài hòa. Bạn tự nhiên kết nối với chiều sâu vô thức, có tài năng nghệ thuật đặc biệt.', ['tâm linh', 'sáng tạo', 'vô thức']),
    e('sun-opposition-neptune', '☉ Mặt Trời Đối ♆ Hải Vương', 'Bản ngã bị che mờ bởi người khác hoặc ảo tưởng. Bạn dễ bị ảnh hưởng, cần tìm lại bản ngã thật sự.', ['mờ nhạt', 'ảnh hưởng', 'bản ngã']),

    // ── Sun-Pluto ──
    e('sun-conjunction-pluto', '☉ Mặt Trời Hợp ♇ Diêm Vương', 'Ý chí cực mạnh, sức mạnh chuyển hóa. Bạn có aura quyền lực, khả năng tái sinh sau mọi khủng hoảng.', ['quyền lực', 'chuyển hóa', 'tái sinh']),
    e('sun-sextile-pluto', '☉ Mặt Trời Lục hợp ♇ Diêm Vương', 'Khả năng tập trung và biến đổi tích cực. Bạn dễ dàng loại bỏ những gì không cần thiết để phát triển.', ['tập trung', 'biến đổi', 'phát triển']),
    e('sun-square-pluto', '☉ Mặt Trời Vuông ♇ Diêm Vương', 'Xung đột quyền lực, đấu tranh kiểm soát. Bạn gặp thử thách lớn với những người quyền lực nhưng qua đó trưởng thành mạnh mẽ.', ['xung đột', 'quyền lực', 'trưởng thành']),
    e('sun-trine-pluto', '☉ Mặt Trời Tam hợp ♇ Diêm Vương', 'Sức mạnh nội tâm phi thường. Bạn có khả năng lãnh đạo tự nhiên, trực giác sâu sắc và sức ảnh hưởng lớn.', ['nội tâm', 'lãnh đạo', 'ảnh hưởng']),
    e('sun-opposition-pluto', '☉ Mặt Trời Đối ♇ Diêm Vương', 'Đối mặt với bóng tối và quyền lực bên ngoài. Bạn thường bị ép vào tình huống phải chuyển hóa toàn diện.', ['bóng tối', 'áp lực', 'chuyển hóa']),

    // ── Moon-Mercury ──
    e('moon-conjunction-mercury', '☽ Mặt Trăng Hợp ☿ Thủy Tinh', 'Cảm xúc và tư duy gắn liền. Bạn diễn đạt cảm xúc qua lời nói, có trí nhớ tốt về ký ức cảm xúc.', ['diễn đạt', 'trí nhớ', 'cảm xúc']),
    e('moon-sextile-mercury', '☽ Mặt Trăng Lục hợp ☿ Thủy Tinh', 'Giao tiếp cảm xúc hài hòa. Bạn biết dùng lời nói để an ủi, truyền đạt tình cảm một cách tinh tế.', ['giao tiếp', 'an ủi', 'tinh tế']),
    e('moon-square-mercury', '☽ Mặt Trăng Vuông ☿ Thủy Tinh', 'Xung đột giữa lý trí và cảm xúc. Bạn có thể nói điều mình không cảm thấy, hoặc cảm nhưng không nói được.', ['xung đột', 'giằng xé', 'diễn đạt']),
    e('moon-trine-mercury', '☽ Mặt Trăng Tam hợp ☿ Thủy Tinh', 'Trực giác và lý trí cùng nhịp. Bạn có tài kể chuyện, viết văn cảm xúc, giao tiếp chân thực và dễ gần.', ['trực giác', 'kể chuyện', 'chân thực']),
    e('moon-opposition-mercury', '☽ Mặt Trăng Đối ☿ Thủy Tinh', 'Giằng xé giữa đầu và tim. Bạn phân tích cảm xúc quá nhiều, hoặc để cảm xúc chi phối suy nghĩ khách quan.', ['giằng xé', 'phân tích', 'chi phối']),

    // ── Moon-Jupiter ──
    e('moon-conjunction-jupiter', '☽ Mặt Trăng Hợp ♃ Mộc Tinh', 'Cảm xúc phong phú, rộng lượng. Bạn có lòng từ bi lớn, lạc quan tự nhiên và khả năng nuôi dưỡng dồi dào.', ['rộng lượng', 'từ bi', 'lạc quan']),
    e('moon-sextile-jupiter', '☽ Mặt Trăng Lục hợp ♃ Mộc Tinh', 'Cảm xúc hài hòa và tích cực. Bạn dễ tìm niềm vui trong cuộc sống, có thái độ biết ơn và thiện chí.', ['hài hòa', 'biết ơn', 'thiện chí']),
    e('moon-square-jupiter', '☽ Mặt Trăng Vuông ♃ Mộc Tinh', 'Cảm xúc phóng đại, kỳ vọng quá cao. Bạn có thể quá hào phóng hoặc nuông chiều bản thân, cần kiềm chế.', ['phóng đại', 'kỳ vọng', 'nuông chiều']),
    e('moon-trine-jupiter', '☽ Mặt Trăng Tam hợp ♃ Mộc Tinh', 'May mắn tự nhiên trong cảm xúc. Bạn có khả năng thu hút sự giúp đỡ, được che chở và luôn giữ niềm tin tích cực.', ['may mắn', 'che chở', 'niềm tin']),
    e('moon-opposition-jupiter', '☽ Mặt Trăng Đối ♃ Mộc Tinh', 'Cảm xúc quá bao la, thiếu tập trung. Bạn dễ hứa quá nhiều hoặc đồng cảm tới mức kiệt sức.', ['bao la', 'kiệt sức', 'hứa hẹn']),

    // ── Moon-Uranus ──
    e('moon-conjunction-uranus', '☽ Mặt Trăng Hợp ♅ Thiên Vương', 'Cảm xúc bất thường, thay đổi nhanh. Bạn cần tự do cảm xúc, ghét sự đơn điệu và thường có phản ứng bất ngờ.', ['bất thường', 'tự do', 'bất ngờ']),
    e('moon-sextile-uranus', '☽ Mặt Trăng Lục hợp ♅ Thiên Vương', 'Trực giác sáng tạo, mở lòng với cái mới. Bạn dễ thích nghi với thay đổi và tìm thấy sự kích thích trong những gì khác biệt.', ['trực giác', 'thích nghi', 'khác biệt']),
    e('moon-square-uranus', '☽ Mặt Trăng Vuông ♅ Thiên Vương', 'Cảm xúc bất ổn, khao khát tự do. Bạn dễ bùng nổ bất ngờ, các mối quan hệ có thể bắt đầu và kết thúc đột ngột.', ['bất ổn', 'bùng nổ', 'đột ngột']),
    e('moon-trine-uranus', '☽ Mặt Trăng Tam hợp ♅ Thiên Vương', 'Nhạy bén với cái mới, trực giác tốt. Bạn thoải mái với sự thay đổi, có khả năng cảm nhận xu hướng trước người khác.', ['nhạy bén', 'xu hướng', 'thoải mái']),
    e('moon-opposition-uranus', '☽ Mặt Trăng Đối ♅ Thiên Vương', 'Giằng xé giữa an toàn và tự do. Bạn vừa muốn gắn bó vừa muốn thoát ra, tạo nên cảm xúc sóng gió.', ['giằng xé', 'sóng gió', 'tự do']),

    // ── Moon-Neptune ──
    e('moon-conjunction-neptune', '☽ Mặt Trăng Hợp ♆ Hải Vương', 'Cảm xúc vô bờ, nhạy cảm tâm linh. Bạn dễ hấp thụ cảm xúc người khác, có trực giác siêu phàm nhưng ranh giới mờ.', ['tâm linh', 'nhạy cảm', 'vô bờ']),
    e('moon-sextile-neptune', '☽ Mặt Trăng Lục hợp ♆ Hải Vương', 'Trực giác nghệ thuật, đồng cảm sâu. Bạn có tài sáng tạo từ nguồn cảm hứng tiềm thức, dễ kết nối tâm linh.', ['trực giác', 'nghệ thuật', 'đồng cảm']),
    e('moon-square-neptune', '☽ Mặt Trăng Vuông ♆ Hải Vương', 'Cảm xúc mơ hồ, dễ ảo tưởng. Bạn có thể tự lừa mình trong tình cảm, cần phân biệt giữa mong ước và thực tế.', ['mơ hồ', 'ảo tưởng', 'tự lừa']),
    e('moon-trine-neptune', '☽ Mặt Trăng Tam hợp ♆ Hải Vương', 'Đồng cảm sâu sắc, nghệ sĩ bẩm sinh. Bạn kết nối dễ dàng với vô thức tập thể, có khả năng chữa lành cảm xúc.', ['đồng cảm', 'nghệ sĩ', 'chữa lành']),
    e('moon-opposition-neptune', '☽ Mặt Trăng Đối ♆ Hải Vương', 'Dễ bị lợi dụng qua cảm xúc. Bạn quá nhạy cảm với nhu cầu người khác đến mức quên mất nhu cầu của mình.', ['lợi dụng', 'nhạy cảm', 'hy sinh']),

    // ── Moon-Pluto ──
    e('moon-conjunction-pluto', '☽ Mặt Trăng Hợp ♇ Diêm Vương', 'Cảm xúc cực kỳ mãnh liệt và sâu thẳm. Bạn trải qua các biến đổi cảm xúc lớn, có sức mạnh chữa lành phi thường.', ['mãnh liệt', 'biến đổi', 'chữa lành']),
    e('moon-sextile-pluto', '☽ Mặt Trăng Lục hợp ♇ Diêm Vương', 'Khả năng chuyển hóa cảm xúc tốt. Bạn dễ dàng buông bỏ những gì không còn phù hợp, bản năng mạnh mẽ.', ['chuyển hóa', 'buông bỏ', 'bản năng']),
    e('moon-square-pluto', '☽ Mặt Trăng Vuông ♇ Diêm Vương', 'Xung đột cảm xúc sâu, kiểm soát. Bạn có thể bị ám ảnh bởi cảm xúc hoặc cố kiểm soát người khác qua tình cảm.', ['ám ảnh', 'kiểm soát', 'xung đột']),
    e('moon-trine-pluto', '☽ Mặt Trăng Tam hợp ♇ Diêm Vương', 'Trực giác sâu sắc, sức mạnh cảm xúc. Bạn có khả năng nhìn thấu bản chất con người, đồng cảm mạnh mẽ.', ['trực giác', 'nhìn thấu', 'sức mạnh']),
    e('moon-opposition-pluto', '☽ Mặt Trăng Đối ♇ Diêm Vương', 'Đấu tranh quyền lực trong quan hệ tình cảm. Bạn trải qua các mối quan hệ mãnh liệt biến đổi cuộc đời.', ['quyền lực', 'mãnh liệt', 'biến đổi']),

    // ── Mercury-Mars ──
    e('mercury-conjunction-mars', '☿ Thủy Tinh Hợp ♂ Hỏa Tinh', 'Tư duy nhanh, lời nói sắc bén. Bạn tranh luận giỏi, quyết đoán trong giao tiếp, nhưng có thể quá gay gắt.', ['sắc bén', 'tranh luận', 'quyết đoán']),
    e('mercury-sextile-mars', '☿ Thủy Tinh Lục hợp ♂ Hỏa Tinh', 'Tư duy hành động, giao tiếp hiệu quả. Bạn biến ý tưởng thành hiện thực nhanh chóng, thuyết phục giỏi.', ['hành động', 'thuyết phục', 'hiệu quả']),
    e('mercury-square-mars', '☿ Thủy Tinh Vuông ♂ Hỏa Tinh', 'Xung đột giữa suy nghĩ và hành động. Bạn có thể nói trước nghĩ sau, gây va chạm bằng lời nói.', ['xung đột', 'nói trước', 'va chạm']),
    e('mercury-trine-mars', '☿ Thủy Tinh Tam hợp ♂ Hỏa Tinh', 'Trí tuệ sắc sảo, hành động quyết đoán. Bạn có tài hùng biện, biết thuyết phục và lãnh đạo qua lời nói.', ['sắc sảo', 'hùng biện', 'lãnh đạo']),
    e('mercury-opposition-mars', '☿ Thủy Tinh Đối ♂ Hỏa Tinh', 'Tranh luận gay gắt, đối đầu trí tuệ. Bạn khó chấp nhận ý kiến trái chiều nhưng phát triển mạnh qua tranh biện.', ['gay gắt', 'đối đầu', 'tranh biện']),

    // ── Mercury-Jupiter ──
    e('mercury-conjunction-jupiter', '☿ Thủy Tinh Hợp ♃ Mộc Tinh', 'Tư duy mở rộng, lạc quan trí thức. Bạn có tầm nhìn xa, yêu thích triết lý và giáo dục, nhưng có thể lan man.', ['mở rộng', 'triết lý', 'lạc quan']),
    e('mercury-sextile-jupiter', '☿ Thủy Tinh Lục hợp ♃ Mộc Tinh', 'Học hỏi nhanh, giao tiếp tích cực. Bạn có khả năng tổng hợp kiến thức và truyền đạt ý tưởng lớn hiệu quả.', ['học nhanh', 'tổng hợp', 'truyền đạt']),
    e('mercury-square-jupiter', '☿ Thủy Tinh Vuông ♃ Mộc Tinh', 'Phóng đại suy nghĩ, hứa quá nhiều. Bạn có thể nghĩ quá lớn mà thiếu chi tiết, cần kỷ luật tư duy.', ['phóng đại', 'hứa suông', 'kỷ luật']),
    e('mercury-trine-jupiter', '☿ Thủy Tinh Tam hợp ♃ Mộc Tinh', 'Trí tuệ rộng, giao tiếp thuyết phục. Bạn là giáo viên, nhà văn hoặc diễn giả bẩm sinh, thu hút bằng kiến thức.', ['trí tuệ rộng', 'thuyết phục', 'giáo viên']),
    e('mercury-opposition-jupiter', '☿ Thủy Tinh Đối ♃ Mộc Tinh', 'Tham vọng trí tuệ quá lớn. Bạn có thể quá tự tin vào ý kiến của mình, cần lắng nghe quan điểm khác.', ['tham vọng', 'tự tin', 'lắng nghe']),

    // ── Mercury-Saturn ──
    e('mercury-conjunction-saturn', '☿ Thủy Tinh Hợp ♄ Thổ Tinh', 'Tư duy nghiêm túc, logic chặt chẽ. Bạn suy nghĩ cẩn thận, nói có trọng lượng, nhưng có thể bi quan hoặc lo lắng.', ['nghiêm túc', 'logic', 'cẩn thận']),
    e('mercury-sextile-saturn', '☿ Thủy Tinh Lục hợp ♄ Thổ Tinh', 'Tư duy có hệ thống, tổ chức tốt. Bạn biết cách cấu trúc ý tưởng và truyền đạt rõ ràng, đáng tin cậy.', ['hệ thống', 'tổ chức', 'rõ ràng']),
    e('mercury-square-saturn', '☿ Thủy Tinh Vuông ♄ Thổ Tinh', 'Tư duy bị hạn chế, thiếu tự tin trí tuệ. Bạn có thể chậm học lúc đầu nhưng đạt chiều sâu phi thường theo thời gian.', ['hạn chế', 'chiều sâu', 'kiên nhẫn']),
    e('mercury-trine-saturn', '☿ Thủy Tinh Tam hợp ♄ Thổ Tinh', 'Tư duy trưởng thành, lời nói có giá trị. Bạn nói ít nhưng mỗi lời đều sâu sắc, có khả năng nghiên cứu lâu dài.', ['trưởng thành', 'sâu sắc', 'nghiên cứu']),
    e('mercury-opposition-saturn', '☿ Thủy Tinh Đối ♄ Thổ Tinh', 'Xung đột giữa linh hoạt và cứng nhắc. Bạn có thể bị phê bình nhiều lúc nhỏ nhưng phát triển trí tuệ vượt bậc khi trưởng thành.', ['phê bình', 'cứng nhắc', 'vượt bậc']),

    // ── Mercury-Uranus ──
    e('mercury-conjunction-uranus', '☿ Thủy Tinh Hợp ♅ Thiên Vương', 'Tư duy đột phá, thiên tài bất thường. Bạn có ý tưởng đi trước thời đại nhưng có thể khó diễn đạt cho người khác hiểu.', ['đột phá', 'thiên tài', 'đi trước']),
    e('mercury-sextile-uranus', '☿ Thủy Tinh Lục hợp ♅ Thiên Vương', 'Sáng tạo trí tuệ, tiếp thu công nghệ nhanh. Bạn kết hợp tốt logic và trực giác, có ý tưởng mới lạ.', ['sáng tạo', 'công nghệ', 'mới lạ']),
    e('mercury-square-uranus', '☿ Thủy Tinh Vuông ♅ Thiên Vương', 'Tư duy bất ổn, ý kiến cực đoan. Bạn có thể thay đổi ý kiến liên tục hoặc cố tình khác biệt để gây chú ý.', ['bất ổn', 'cực đoan', 'khác biệt']),
    e('mercury-trine-uranus', '☿ Thủy Tinh Tam hợp ♅ Thiên Vương', 'Trực giác trí tuệ sáng chói. Bạn nắm bắt ý tưởng mới nhanh, thích công nghệ và có tầm nhìn tiến bộ.', ['trực giác', 'nhanh nhạy', 'tiến bộ']),
    e('mercury-opposition-uranus', '☿ Thủy Tinh Đối ♅ Thiên Vương', 'Xung đột giữa logic và trực giác. Bạn hay bị xao lãng bởi ý tưởng mới, khó tập trung hoàn thành dự án.', ['xao lãng', 'xung đột', 'ý tưởng']),

    // ── Mercury-Neptune ──
    e('mercury-conjunction-neptune', '☿ Thủy Tinh Hợp ♆ Hải Vương', 'Tư duy trực giác, giàu tưởng tượng. Bạn nghĩ bằng hình ảnh, có tài viết thơ và sáng tạo, nhưng đôi khi mơ hồ.', ['trực giác', 'tưởng tượng', 'thơ ca']),
    e('mercury-sextile-neptune', '☿ Thủy Tinh Lục hợp ♆ Hải Vương', 'Cảm nhận tinh tế, giao tiếp nghệ thuật. Bạn diễn đạt ý tưởng bằng ngôn ngữ đẹp, có trực giác trong học hỏi.', ['tinh tế', 'nghệ thuật', 'trực giác']),
    e('mercury-square-neptune', '☿ Thủy Tinh Vuông ♆ Hải Vương', 'Khó tập trung, suy nghĩ mơ hồ. Bạn có thể hiểu lầm hoặc bị hiểu lầm, cần kiểm tra thông tin cẩn thận.', ['mơ hồ', 'hiểu lầm', 'tập trung']),
    e('mercury-trine-neptune', '☿ Thủy Tinh Tam hợp ♆ Hải Vương', 'Trực giác mạnh trong giao tiếp. Bạn cảm nhận được điều người khác không nói ra, có tài viết sáng tạo.', ['trực giác', 'cảm nhận', 'sáng tạo']),
    e('mercury-opposition-neptune', '☿ Thủy Tinh Đối ♆ Hải Vương', 'Ranh giới giữa thực và ảo rất mỏng. Bạn dễ bị lừa qua lời nói hoặc tự thuyết phục mình điều không có thật.', ['ảo tưởng', 'lừa dối', 'mỏng manh']),

    // ── Mercury-Pluto ──
    e('mercury-conjunction-pluto', '☿ Thủy Tinh Hợp ♇ Diêm Vương', 'Tư duy sâu sắc, khả năng điều tra. Bạn nhìn thấu bản chất sự việc, có sức thuyết phục mạnh mẽ gần như thôi miên.', ['sâu sắc', 'điều tra', 'thôi miên']),
    e('mercury-sextile-pluto', '☿ Thủy Tinh Lục hợp ♇ Diêm Vương', 'Phân tích sâu, giao tiếp có chiều sâu. Bạn có khả năng nghiên cứu và khám phá bí mật, tư duy chiến lược tốt.', ['chiều sâu', 'nghiên cứu', 'chiến lược']),
    e('mercury-square-pluto', '☿ Thủy Tinh Vuông ♇ Diêm Vương', 'Ám ảnh trong suy nghĩ, lời nói có sức mạnh phá hủy. Bạn có thể bị chi phối bởi ý tưởng cố định hoặc sợ hãi tiềm ẩn.', ['ám ảnh', 'phá hủy', 'sợ hãi']),
    e('mercury-trine-pluto', '☿ Thủy Tinh Tam hợp ♇ Diêm Vương', 'Khả năng thuyết phục và biến đổi qua lời nói. Bạn là nhà tâm lý, nhà điều tra hoặc nhà nghiên cứu bẩm sinh.', ['thuyết phục', 'tâm lý', 'nghiên cứu']),
    e('mercury-opposition-pluto', '☿ Thủy Tinh Đối ♇ Diêm Vương', 'Xung đột trí tuệ, đấu tranh quyền lực qua lời nói. Bạn có thể bị thao túng hoặc thao túng người khác qua ngôn từ.', ['xung đột', 'thao túng', 'quyền lực']),

    // ── Venus-Jupiter ──
    e('venus-conjunction-jupiter', '♀ Kim Tinh Hợp ♃ Mộc Tinh', 'May mắn trong tình yêu và tài chính. Bạn hào phóng, duyên dáng, yêu đời, thu hút sự giàu có và tình cảm.', ['may mắn', 'hào phóng', 'tình yêu']),
    e('venus-sextile-jupiter', '♀ Kim Tinh Lục hợp ♃ Mộc Tinh', 'Hài hòa giữa tình yêu và tầm nhìn. Bạn có gu thẩm mỹ cao, thu hút mối quan hệ tốt đẹp và cơ hội tài chính.', ['hài hòa', 'thẩm mỹ', 'cơ hội']),
    e('venus-square-jupiter', '♀ Kim Tinh Vuông ♃ Mộc Tinh', 'Xu hướng xa hoa, nuông chiều quá mức. Bạn có thể phung phí tiền bạc hoặc tình cảm, cần học tính tiết chế.', ['xa hoa', 'nuông chiều', 'tiết chế']),
    e('venus-trine-jupiter', '♀ Kim Tinh Tam hợp ♃ Mộc Tinh', 'Góc chiếu may mắn nhất cho tình yêu và tiền bạc. Bạn được yêu thương, có đời sống xã hội phong phú và nhiều niềm vui.', ['may mắn', 'yêu thương', 'phong phú']),
    e('venus-opposition-jupiter', '♀ Kim Tinh Đối ♃ Mộc Tinh', 'Kỳ vọng quá cao trong tình yêu. Bạn có thể lý tưởng hóa đối tác hoặc chi tiêu vượt khả năng để trông sang trọng.', ['kỳ vọng', 'lý tưởng', 'chi tiêu']),

    // ── Venus-Uranus ──
    e('venus-conjunction-uranus', '♀ Kim Tinh Hợp ♅ Thiên Vương', 'Tình yêu bất ngờ, cuốn hút tức thì. Bạn thu hút mối quan hệ khác thường, cần tự do trong tình yêu.', ['bất ngờ', 'tức thì', 'tự do']),
    e('venus-sextile-uranus', '♀ Kim Tinh Lục hợp ♅ Thiên Vương', 'Gu thẩm mỹ khác biệt, tình yêu mới lạ. Bạn có khả năng sáng tạo trong nghệ thuật và tìm vẻ đẹp ở nơi bất ngờ.', ['khác biệt', 'mới lạ', 'sáng tạo']),
    e('venus-square-uranus', '♀ Kim Tinh Vuông ♅ Thiên Vương', 'Tình yêu bất ổn, mối quan hệ đứt đoạn. Bạn bị kéo giữa cam kết và tự do, các mối quan hệ bắt đầu nhanh và kết thúc đột ngột.', ['bất ổn', 'đứt đoạn', 'đột ngột']),
    e('venus-trine-uranus', '♀ Kim Tinh Tam hợp ♅ Thiên Vương', 'Tình yêu tự do nhưng hài hòa. Bạn tự nhiên thu hút mối quan hệ độc đáo, có tài sáng tạo nghệ thuật đặc biệt.', ['tự do', 'độc đáo', 'sáng tạo']),
    e('venus-opposition-uranus', '♀ Kim Tinh Đối ♅ Thiên Vương', 'Căng thẳng giữa cam kết và tự do. Bạn thu hút rồi đẩy đi, mối quan hệ đầy kịch tính và bất ngờ.', ['căng thẳng', 'kịch tính', 'bất ngờ']),

    // ── Venus-Neptune ──
    e('venus-conjunction-neptune', '♀ Kim Tinh Hợp ♆ Hải Vương', 'Tình yêu lý tưởng, nghệ thuật tâm linh. Bạn có khả năng sáng tạo phi thường nhưng dễ huyễn hoặc trong tình cảm.', ['lý tưởng', 'nghệ thuật', 'huyễn hoặc']),
    e('venus-sextile-neptune', '♀ Kim Tinh Lục hợp ♆ Hải Vương', 'Cảm nhận thẩm mỹ tinh tế, lãng mạn. Bạn có tài nghệ thuật bẩm sinh, yêu cái đẹp có chiều sâu tâm linh.', ['tinh tế', 'lãng mạn', 'tâm linh']),
    e('venus-square-neptune', '♀ Kim Tinh Vuông ♆ Hải Vương', 'Ảo tưởng trong tình yêu, dễ bị lừa. Bạn thấy đối tác qua lăng kính màu hồng, cần thanh tỉnh hơn.', ['ảo tưởng', 'lừa dối', 'màu hồng']),
    e('venus-trine-neptune', '♀ Kim Tinh Tam hợp ♆ Hải Vương', 'Tình yêu đẹp, nghệ thuật thăng hoa. Bạn có trực giác tốt về cái đẹp, lòng từ bi sâu sắc trong tình cảm.', ['tình yêu đẹp', 'thăng hoa', 'từ bi']),
    e('venus-opposition-neptune', '♀ Kim Tinh Đối ♆ Hải Vương', 'Giằng xé giữa mong ước và thực tế trong tình yêu. Bạn dễ hy sinh bản thân vì tình cảm, cần đặt ranh giới.', ['giằng xé', 'hy sinh', 'ranh giới']),

    // ── Venus-Pluto ──
    e('venus-conjunction-pluto', '♀ Kim Tinh Hợp ♇ Diêm Vương', 'Tình yêu mãnh liệt, quyến rũ tột độ. Bạn yêu sâu sắc và chiếm hữu, mối quan hệ biến đổi cuộc đời.', ['mãnh liệt', 'quyến rũ', 'biến đổi']),
    e('venus-sextile-pluto', '♀ Kim Tinh Lục hợp ♇ Diêm Vương', 'Tình yêu sâu sắc, khả năng chữa lành. Bạn thu hút mối quan hệ biến đổi tích cực, có sức cuốn hút tự nhiên.', ['sâu sắc', 'chữa lành', 'cuốn hút']),
    e('venus-square-pluto', '♀ Kim Tinh Vuông ♇ Diêm Vương', 'Xung đột quyền lực trong tình yêu. Bạn có thể ghen tuông hoặc bị kiểm soát, cần học cách yêu mà không chiếm hữu.', ['ghen tuông', 'kiểm soát', 'chiếm hữu']),
    e('venus-trine-pluto', '♀ Kim Tinh Tam hợp ♇ Diêm Vương', 'Sức hút từ tính, tình yêu chuyển hóa. Bạn có khả năng yêu sâu sắc, mỗi mối quan hệ đều mang ý nghĩa biến đổi.', ['sức hút', 'chuyển hóa', 'ý nghĩa']),
    e('venus-opposition-pluto', '♀ Kim Tinh Đối ♇ Diêm Vương', 'Đam mê cực độ, quyền lực trong tình yêu. Bạn thu hút mối quan hệ đầy kịch tính, cần học cách buông bỏ kiểm soát.', ['cực độ', 'kịch tính', 'buông bỏ']),

    // ── Mars-Uranus ──
    e('mars-conjunction-uranus', '♂ Hỏa Tinh Hợp ♅ Thiên Vương', 'Hành động bất ngờ, năng lượng bùng nổ. Bạn có phản xạ nhanh, yêu mạo hiểm, nhưng cần cẩn thận vì dễ gặp tai nạn.', ['bất ngờ', 'bùng nổ', 'mạo hiểm']),
    e('mars-sextile-uranus', '♂ Hỏa Tinh Lục hợp ♅ Thiên Vương', 'Hành động sáng tạo, đổi mới hiệu quả. Bạn biết cách phá vỡ khuôn mẫu một cách xây dựng, có năng lượng đổi mới.', ['sáng tạo', 'đổi mới', 'phá khuôn']),
    e('mars-square-uranus', '♂ Hỏa Tinh Vuông ♅ Thiên Vương', 'Bốc đồng, liều lĩnh, thay đổi đột ngột. Bạn có thể gặp tai nạn do hành động thiếu kiên nhẫn, cần kiểm soát.', ['bốc đồng', 'liều lĩnh', 'tai nạn']),
    e('mars-trine-uranus', '♂ Hỏa Tinh Tam hợp ♅ Thiên Vương', 'Năng lượng đổi mới, can đảm phi thường. Bạn hành động nhanh và chính xác, cách mạng hay trong thể thao và công nghệ.', ['đổi mới', 'can đảm', 'chính xác']),
    e('mars-opposition-uranus', '♂ Hỏa Tinh Đối ♅ Thiên Vương', 'Xung đột giữa kỷ luật và nổi loạn. Bạn gặp phản kháng từ bên ngoài khi hành động, cần linh hoạt hơn.', ['nổi loạn', 'phản kháng', 'linh hoạt']),

    // ── Mars-Neptune ──
    e('mars-conjunction-neptune', '♂ Hỏa Tinh Hợp ♆ Hải Vương', 'Hành động theo trực giác, sáng tạo. Bạn có năng lượng hướng về nghệ thuật hoặc tâm linh, nhưng đôi khi thiếu quyết đoán.', ['trực giác', 'sáng tạo', 'tâm linh']),
    e('mars-sextile-neptune', '♂ Hỏa Tinh Lục hợp ♆ Hải Vương', 'Hành động lý tưởng, năng lượng chữa lành. Bạn biết dùng sức mạnh để phục vụ mục đích cao cả.', ['lý tưởng', 'chữa lành', 'phục vụ']),
    e('mars-square-neptune', '♂ Hỏa Tinh Vuông ♆ Hải Vương', 'Hành động mơ hồ, thiếu phương hướng. Bạn có thể bị lừa hoặc tự lừa khi hành động, cần mục tiêu rõ ràng.', ['mơ hồ', 'thiếu hướng', 'mục tiêu']),
    e('mars-trine-neptune', '♂ Hỏa Tinh Tam hợp ♆ Hải Vương', 'Hành động từ bi, năng lượng nghệ thuật. Bạn chiến đấu vì lý tưởng, có sức mạnh truyền cảm hứng lớn.', ['từ bi', 'lý tưởng', 'cảm hứng']),
    e('mars-opposition-neptune', '♂ Hỏa Tinh Đối ♆ Hải Vương', 'Thiếu năng lượng, hoặc dùng năng lượng sai hướng. Bạn cần tránh bị lợi dụng sức lực và tìm mục đích ý nghĩa.', ['kiệt sức', 'sai hướng', 'lợi dụng']),

    // ── Mars-Pluto ──
    e('mars-conjunction-pluto', '♂ Hỏa Tinh Hợp ♇ Diêm Vương', 'Sức mạnh cực đại, ý chí không thể phá vỡ. Bạn có năng lượng biến đổi phi thường nhưng cần kiểm soát xu hướng bạo lực.', ['cực đại', 'ý chí', 'biến đổi']),
    e('mars-sextile-pluto', '♂ Hỏa Tinh Lục hợp ♇ Diêm Vương', 'Hành động biến đổi tích cực. Bạn có sức chịu đựng phi thường, biết tập trung năng lượng để đạt mục tiêu.', ['biến đổi', 'sức chịu đựng', 'tập trung']),
    e('mars-square-pluto', '♂ Hỏa Tinh Vuông ♇ Diêm Vương', 'Xung đột quyền lực, cường độ cao. Bạn gặp đối thủ mạnh và tình huống khủng hoảng, nhưng qua đó rèn luyện sức mạnh.', ['quyền lực', 'khủng hoảng', 'rèn luyện']),
    e('mars-trine-pluto', '♂ Hỏa Tinh Tam hợp ♇ Diêm Vương', 'Sức mạnh hành động phi thường. Bạn có khả năng vượt qua mọi trở ngại, tái sinh qua hành động quyết đoán.', ['phi thường', 'vượt qua', 'tái sinh']),
    e('mars-opposition-pluto', '♂ Hỏa Tinh Đối ♇ Diêm Vương', 'Đấu tranh quyền lực mãnh liệt. Bạn gặp sự chống đối từ bên ngoài, cần học cách sử dụng sức mạnh một cách khôn ngoan.', ['đấu tranh', 'chống đối', 'khôn ngoan']),

    // ── Jupiter-Uranus ──
    e('jupiter-conjunction-uranus', '♃ Mộc Tinh Hợp ♅ Thiên Vương', 'May mắn bất ngờ, cơ hội đột phá. Bạn gặp bước ngoặt may mắn, có tầm nhìn cách mạng và lạc quan về tương lai.', ['đột phá', 'may mắn', 'cách mạng']),
    e('jupiter-square-uranus', '♃ Mộc Tinh Vuông ♅ Thiên Vương', 'Liều lĩnh, nổi loạn, thay đổi bất ngờ. Bạn có thể mạo hiểm quá mức vì tự tin thái quá, cần cân nhắc kỹ.', ['liều lĩnh', 'nổi loạn', 'mạo hiểm']),
    e('jupiter-trine-uranus', '♃ Mộc Tinh Tam hợp ♅ Thiên Vương', 'Trực giác may mắn, tầm nhìn tiến bộ. Bạn nắm bắt xu hướng tương lai tốt, gặp cơ hội từ lĩnh vực mới.', ['trực giác', 'tiến bộ', 'xu hướng']),
    e('jupiter-opposition-uranus', '♃ Mộc Tinh Đối ♅ Thiên Vương', 'Căng thẳng giữa truyền thống và đổi mới. Bạn dao động giữa an toàn và cách mạng, cuộc đời nhiều bất ngờ.', ['căng thẳng', 'dao động', 'bất ngờ']),

    // ── Jupiter-Neptune ──
    e('jupiter-conjunction-neptune', '♃ Mộc Tinh Hợp ♆ Hải Vương', 'Tâm linh mở rộng, lý tưởng lớn. Bạn có tầm nhìn nhân đạo, lòng từ bi không giới hạn, nhưng dễ bị ảo tưởng.', ['tâm linh', 'lý tưởng', 'từ bi']),
    e('jupiter-square-neptune', '♃ Mộc Tinh Vuông ♆ Hải Vương', 'Phóng đại ảo tưởng, quá lý tưởng. Bạn dễ bị lừa hoặc tự lừa bởi những ý tưởng quá lớn, cần thực tế.', ['ảo tưởng', 'phóng đại', 'thực tế']),
    e('jupiter-trine-neptune', '♃ Mộc Tinh Tam hợp ♆ Hải Vương', 'Trực giác tâm linh, may mắn ngầm. Bạn được bảo vệ bởi sức mạnh tinh thần, có khả năng truyền cảm hứng lớn.', ['tâm linh', 'may mắn', 'cảm hứng']),
    e('jupiter-opposition-neptune', '♃ Mộc Tinh Đối ♆ Hải Vương', 'Xung đột giữa niềm tin và nghi ngờ. Bạn dao động giữa lạc quan mù quáng và hoài nghi sâu sắc.', ['niềm tin', 'nghi ngờ', 'dao động']),

    // ── Jupiter-Pluto ──
    e('jupiter-conjunction-pluto', '♃ Mộc Tinh Hợp ♇ Diêm Vương', 'Quyền lực mạnh, tham vọng cực lớn. Bạn có khả năng tạo ra sự biến đổi lớn trong xã hội, thu hút tài nguyên dồi dào.', ['quyền lực', 'tham vọng', 'biến đổi']),
    e('jupiter-square-pluto', '♃ Mộc Tinh Vuông ♇ Diêm Vương', 'Xung đột quyền lực xã hội. Bạn có thể bị cuốn vào các tranh chấp lớn hoặc bị cám dỗ bởi quyền lực và tiền bạc.', ['xung đột', 'cám dỗ', 'quyền lực']),
    e('jupiter-trine-pluto', '♃ Mộc Tinh Tam hợp ♇ Diêm Vương', 'Ảnh hưởng lớn, biến đổi tích cực. Bạn có khả năng lãnh đạo biến đổi, tạo ra sự thay đổi nhiều ý nghĩa.', ['ảnh hưởng', 'lãnh đạo', 'ý nghĩa']),
    e('jupiter-opposition-pluto', '♃ Mộc Tinh Đối ♇ Diêm Vương', 'Đấu tranh với quyền lực và hệ thống. Bạn gặp thử thách từ các thế lực lớn hơn, cần cân bằng tham vọng.', ['đấu tranh', 'hệ thống', 'cân bằng']),

    // ── Saturn-Uranus ──
    e('saturn-conjunction-uranus', '♄ Thổ Tinh Hợp ♅ Thiên Vương', 'Kỷ luật gặp đổi mới. Bạn có khả năng xây dựng hệ thống mới trên nền tảng cũ, cách mạng có kế hoạch.', ['kỷ luật', 'đổi mới', 'hệ thống']),
    e('saturn-square-uranus', '♄ Thổ Tinh Vuông ♅ Thiên Vương', 'Xung đột giữa truyền thống và cách mạng. Bạn cảm thấy bị ràng buộc bởi hệ thống cũ, cần tìm cách đổi mới trong khuôn khổ.', ['xung đột', 'ràng buộc', 'đổi mới']),
    e('saturn-trine-uranus', '♄ Thổ Tinh Tam hợp ♅ Thiên Vương', 'Kết hợp hài hòa giữa ổn định và đổi mới. Bạn biết cách hiện đại hóa mà không phá vỡ nền tảng.', ['hài hòa', 'hiện đại', 'ổn định']),
    e('saturn-opposition-uranus', '♄ Thổ Tinh Đối ♅ Thiên Vương', 'Căng thẳng giữa an toàn và tự do. Bạn bị kéo giữa trách nhiệm và mong muốn phá vỡ mọi giới hạn.', ['căng thẳng', 'an toàn', 'phá vỡ']),

    // ── Saturn-Neptune ──
    e('saturn-conjunction-neptune', '♄ Thổ Tinh Hợp ♆ Hải Vương', 'Hiện thực hóa giấc mơ. Bạn có khả năng biến lý tưởng thành hiện thực, nhưng có thể mất đi sự lãng mạn.', ['hiện thực', 'giấc mơ', 'lý tưởng']),
    e('saturn-square-neptune', '♄ Thổ Tinh Vuông ♆ Hải Vương', 'Xung đột giữa thực tế và mơ mộng. Bạn gặp khó khăn khi cố gắng biến ước mơ thành hiện thực, dễ thất vọng.', ['xung đột', 'thất vọng', 'ước mơ']),
    e('saturn-trine-neptune', '♄ Thổ Tinh Tam hợp ♆ Hải Vương', 'Kỷ luật tâm linh, sáng tạo có cấu trúc. Bạn biến trực giác thành phương pháp, nghệ thuật thành sự nghiệp.', ['kỷ luật', 'tâm linh', 'phương pháp']),
    e('saturn-opposition-neptune', '♄ Thổ Tinh Đối ♆ Hải Vương', 'Căng thẳng giữa nghĩa vụ và hy sinh. Bạn dao động giữa khắc kỷ và buông bỏ, cần tìm con đường giữa.', ['nghĩa vụ', 'hy sinh', 'dao động']),

    // ── Saturn-Pluto ──
    e('saturn-conjunction-pluto', '♄ Thổ Tinh Hợp ♇ Diêm Vương', 'Sức mạnh xây dựng hoặc phá hủy cực đại. Bạn trải qua các biến đổi lớn về cấu trúc cuộc đời, kỷ luật sắt đá.', ['xây dựng', 'phá hủy', 'kỷ luật']),
    e('saturn-square-pluto', '♄ Thổ Tinh Vuông ♇ Diêm Vương', 'Áp lực khổng lồ, thử thách quyền lực. Bạn gặp các giới hạn nghiêm ngặt nhưng qua đó rèn luyện sức mạnh nội tâm phi thường.', ['áp lực', 'giới hạn', 'nội tâm']),
    e('saturn-trine-pluto', '♄ Thổ Tinh Tam hợp ♇ Diêm Vương', 'Sức bền phi thường, xây dựng bền vững. Bạn có khả năng vượt qua mọi khó khăn bằng sự kiên nhẫn và chiến lược.', ['sức bền', 'bền vững', 'chiến lược']),
    e('saturn-opposition-pluto', '♄ Thổ Tinh Đối ♇ Diêm Vương', 'Đối đầu với quyền lực hệ thống. Bạn trải qua các giai đoạn bị ép thay đổi hoàn toàn cấu trúc cuộc sống.', ['đối đầu', 'hệ thống', 'thay đổi']),

    // ── Uranus-Neptune ──
    e('uranus-conjunction-neptune', '♅ Thiên Vương Hợp ♆ Hải Vương', 'Thế hệ kết hợp đột phá và tâm linh. Bạn thuộc nhóm người mang lại sự đổi mới về ý thức và nhận thức tâm linh.', ['đột phá', 'tâm linh', 'thế hệ']),
    e('uranus-square-neptune', '♅ Thiên Vương Vuông ♆ Hải Vương', 'Xung đột giữa lý tưởng và thực tế đổi mới. Thế hệ bạn chứng kiến sự va chạm giữa công nghệ và đạo đức.', ['lý tưởng', 'công nghệ', 'đạo đức']),
    e('uranus-opposition-neptune', '♅ Thiên Vương Đối ♆ Hải Vương', 'Căng thẳng giữa khoa học và tâm linh ở cấp thế hệ. Thế hệ bạn tìm cách hòa giải lý trí với trực giác.', ['khoa học', 'tâm linh', 'hòa giải']),

    // ── Uranus-Pluto ──
    e('uranus-conjunction-pluto', '♅ Thiên Vương Hợp ♇ Diêm Vương', 'Cách mạng biến đổi xã hội. Thế hệ bạn mang lại những thay đổi quyền lực triệt để, phá vỡ hệ thống cũ.', ['cách mạng', 'biến đổi', 'phá vỡ']),
    e('uranus-square-pluto', '♅ Thiên Vương Vuông ♇ Diêm Vương', 'Xung đột giữa tự do và quyền lực. Thế hệ bạn đấu tranh với các hệ thống quyền lực, đòi hỏi cải cách triệt để.', ['xung đột', 'cải cách', 'đấu tranh']),
    e('uranus-opposition-pluto', '♅ Thiên Vương Đối ♇ Diêm Vương', 'Đối đầu giữa đổi mới và quyền lực cũ. Thế hệ bạn chứng kiến sự sụp đổ và tái thiết của các cấu trúc xã hội.', ['đối đầu', 'sụp đổ', 'tái thiết']),

    // ── Neptune-Pluto ──
    e('neptune-conjunction-pluto', '♆ Hải Vương Hợp ♇ Diêm Vương', 'Chu kỳ dài nhất: biến đổi tâm linh ở cấp nền văn minh. Ảnh hưởng tới nhiều thế hệ, thay đổi nhận thức tập thể.', ['nền văn minh', 'tâm linh', 'tập thể']),
    e('neptune-sextile-pluto', '♆ Hải Vương Lục hợp ♇ Diêm Vương', 'Hỗ trợ tâm linh và biến đổi. Thế hệ bạn được hưởng lợi từ sự liên kết giữa trực giác tập thể và sức mạnh chuyển hóa.', ['hỗ trợ', 'trực giác', 'chuyển hóa']),
]);

/**
 * Lookup aspect interpretation by planet pair and aspect type.
 * Tries both orderings (planet1-type-planet2 and planet2-type-planet1).
 */
export function getAspectInterpretation(planet1: string, planet2: string, aspectType: AspectType): InterpretationEntry | undefined {
    return ASPECT_MEANINGS.get(`${planet1}-${aspectType}-${planet2}`)
        ?? ASPECT_MEANINGS.get(`${planet2}-${aspectType}-${planet1}`);
}
