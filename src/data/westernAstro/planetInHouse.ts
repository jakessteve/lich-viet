import type { InterpretationEntry, PlanetId } from '../../types/westernAstro';

// =============================================================================
// Planet-in-House Interpretation Texts — Vietnamese
// 10 planets × 12 houses = 120 entries
// =============================================================================

type PlanetHouseKey = `${PlanetId}-in-house-${number}`;

function e(planet: PlanetId, house: number, title: string, body: string, keywords: string[]): [PlanetHouseKey, InterpretationEntry] {
    const key: PlanetHouseKey = `${planet}-in-house-${house}`;
    return [key, { key, title, body, keywords }];
}

export const PLANET_IN_HOUSE = new Map<PlanetHouseKey, InterpretationEntry>([
    // ── Sun (Mặt Trời) ──
    e('sun', 1, '☉ Mặt Trời ở Nhà 1', 'Bản ngã mạnh mẽ, tự tin. Bạn có nhu cầu thể hiện bản thân và tỏa sáng trong mọi hoàn cảnh. Sức sống dồi dào, thường gây ấn tượng đầu tiên rất tốt.', ['tự tin', 'cá tính mạnh', 'sức sống']),
    e('sun', 2, '☉ Mặt Trời ở Nhà 2', 'Giá trị bản thân gắn liền với tài chính và vật chất. Bạn có khả năng kiếm tiền tốt nhưng cần học cách tách biệt giá trị nội tại khỏi tài sản.', ['tài chính', 'giá trị bản thân', 'vật chất']),
    e('sun', 3, '☉ Mặt Trời ở Nhà 3', 'Trí tuệ sáng sủa, giao tiếp lưu loát. Bạn tỏa sáng qua ngôn từ, viết lách hoặc dạy học. Mối quan hệ với anh chị em quan trọng trong cuộc đời.', ['giao tiếp', 'trí tuệ', 'anh em']),
    e('sun', 4, '☉ Mặt Trời ở Nhà 4', 'Gia đình và nguồn cội là trung tâm cuộc sống. Bạn cần một mái ấm vững chắc để phát triển, và thường tỏa sáng muộn trong đời.', ['gia đình', 'gốc rễ', 'mái ấm']),
    e('sun', 5, '☉ Mặt Trời ở Nhà 5', 'Sáng tạo và niềm vui sống là nguồn năng lượng chính. Bạn có tài năng nghệ thuật, yêu thích giải trí, và dành nhiều tình cảm cho con cái.', ['sáng tạo', 'niềm vui', 'nghệ thuật']),
    e('sun', 6, '☉ Mặt Trời ở Nhà 6', 'Tìm thấy ý nghĩa qua công việc và phục vụ. Bạn cần một thói quen hàng ngày có ý nghĩa, chú ý sức khỏe, và thường là người đáng tin cậy trong công việc.', ['công việc', 'sức khỏe', 'phục vụ']),
    e('sun', 7, '☉ Mặt Trời ở Nhà 7', 'Các mối quan hệ đối tác định hình bản ngã. Bạn phát triển tốt nhất khi có partner, nhưng cần tránh đánh mất mình trong mối quan hệ.', ['hôn nhân', 'đối tác', 'quan hệ']),
    e('sun', 8, '☉ Mặt Trời ở Nhà 8', 'Sức mạnh biến đổi sâu sắc. Bạn bị thu hút bởi những gì ẩn giấu, bí mật, và trải qua nhiều lần "tái sinh" trong cuộc đời. Có khả năng quản lý tài chính chung tốt.', ['biến đổi', 'bí mật', 'tái sinh']),
    e('sun', 9, '☉ Mặt Trời ở Nhà 9', 'Tầm nhìn rộng lớn, khát khao tri thức và chân lý. Bạn tỏa sáng qua triết lý, du lịch, giáo dục bậc cao, hoặc truyền bá tư tưởng.', ['triết lý', 'du lịch', 'học vấn']),
    e('sun', 10, '☉ Mặt Trời ở Nhà 10', 'Sự nghiệp và danh tiếng là lĩnh vực tỏa sáng chính. Bạn có tham vọng lớn, khao khát thành công xã hội, và thường đạt được vị trí lãnh đạo.', ['sự nghiệp', 'danh tiếng', 'lãnh đạo']),
    e('sun', 11, '☉ Mặt Trời ở Nhà 11', 'Tỏa sáng trong cộng đồng và nhóm bạn. Bạn có tầm nhìn lý tưởng, thu hút nhiều người cùng chí hướng, và theo đuổi các mục tiêu nhân đạo.', ['cộng đồng', 'lý tưởng', 'bạn bè']),
    e('sun', 12, '☉ Mặt Trời ở Nhà 12', 'Bản ngã hoạt động ở tầng tiềm thức. Bạn có trực giác mạnh, cần thời gian riêng tư để nạp năng lượng, và có khả năng tâm linh đặc biệt.', ['tiềm thức', 'tâm linh', 'ẩn dật']),

    // ── Moon (Mặt Trăng) ──
    e('moon', 1, '☽ Mặt Trăng ở Nhà 1', 'Cảm xúc hiện rõ trên gương mặt, nhạy cảm và dễ bị ảnh hưởng bởi môi trường. Ngoại hình có thể thay đổi theo tâm trạng. Bản năng mẫu tử mạnh.', ['nhạy cảm', 'cảm xúc', 'trực giác']),
    e('moon', 2, '☽ Mặt Trăng ở Nhà 2', 'An toàn cảm xúc gắn với tài chính. Tâm trạng ảnh hưởng đến thói quen chi tiêu. Bạn cần sự ổn định vật chất để cảm thấy yên tâm.', ['an ninh tài chính', 'cảm xúc', 'ổn định']),
    e('moon', 3, '☽ Mặt Trăng ở Nhà 3', 'Tư duy theo cảm xúc, giao tiếp bằng trái tim. Bạn học qua cảm nhận hơn là lý trí, và có mối liên hệ cảm xúc sâu sắc với anh chị em.', ['giao tiếp cảm xúc', 'học hỏi', 'anh em']),
    e('moon', 4, '☽ Mặt Trăng ở Nhà 4', 'Cảm xúc gắn bó sâu sắc với gia đình và quê hương. Mái ấm là nơi an toàn nhất. Ký ức tuổi thơ ảnh hưởng mạnh đến đời sống cảm xúc trưởng thành.', ['gia đình', 'quê hương', 'tuổi thơ']),
    e('moon', 5, '☽ Mặt Trăng ở Nhà 5', 'Cảm xúc phong phú trong tình yêu và sáng tạo. Bạn cần được thể hiện cảm xúc qua nghệ thuật, và có tình yêu thương con cái rất sâu đậm.', ['tình yêu', 'sáng tạo', 'con cái']),
    e('moon', 6, '☽ Mặt Trăng ở Nhà 6', 'Sức khỏe thể chất bị ảnh hưởng bởi cảm xúc. Bạn cần một thói quen hàng ngày ổn định để cân bằng tâm lý, và thường chăm sóc người khác.', ['sức khỏe', 'thói quen', 'chăm sóc']),
    e('moon', 7, '☽ Mặt Trăng ở Nhà 7', 'Nhu cầu cảm xúc mạnh trong hôn nhân và đối tác. Bạn tìm kiếm sự an toàn qua mối quan hệ, và rất nhạy cảm với cảm xúc của người bạn đời.', ['hôn nhân', 'cảm xúc', 'đối tác']),
    e('moon', 8, '☽ Mặt Trăng ở Nhà 8', 'Cảm xúc sâu thẳm, bí ẩn. Bạn có trực giác mạnh mẽ, có thể cảm nhận được những gì người khác giấu kín. Trải qua nhiều biến đổi cảm xúc lớn.', ['trực giác', 'bí ẩn', 'biến đổi']),
    e('moon', 9, '☽ Mặt Trăng ở Nhà 9', 'Cảm xúc được mở rộng qua du lịch, triết lý và học hỏi. Bạn có thể cảm thấy quê hương ở nơi xa, và tìm kiếm ý nghĩa cuộc sống qua tín ngưỡng.', ['du lịch', 'triết lý', 'tín ngưỡng']),
    e('moon', 10, '☽ Mặt Trăng ở Nhà 10', 'Cảm xúc gắn với sự nghiệp và hình ảnh công chúng. Bạn cần được công nhận, và cảm thấy thỏa mãn khi đạt được vị trí xã hội. Mẹ ảnh hưởng lớn đến sự nghiệp.', ['sự nghiệp', 'công nhận', 'mẹ']),
    e('moon', 11, '☽ Mặt Trăng ở Nhà 11', 'Nhu cầu cảm xúc được thỏa mãn qua bạn bè và cộng đồng. Bạn dễ kết bạn, quan tâm đến các vấn đề nhân đạo, và tìm kiếm sự thuộc về trong nhóm.', ['bạn bè', 'cộng đồng', 'thuộc về']),
    e('moon', 12, '☽ Mặt Trăng ở Nhà 12', 'Cảm xúc sâu kín, khó diễn đạt. Bạn có trực giác tâm linh mạnh, cần thời gian ở một mình, và có thể mang trong mình những nỗi đau ẩn giấu cần được chữa lành.', ['tâm linh', 'ẩn giấu', 'chữa lành']),

    // ── Mercury (Thủy Tinh) ──
    e('mercury', 1, '☿ Thủy Tinh ở Nhà 1', 'Trí tuệ nhanh nhẹn, giao tiếp xuất sắc. Bạn thể hiện bản thân qua lời nói và ý tưởng, luôn tò mò và ham học hỏi.', ['trí tuệ', 'giao tiếp', 'tò mò']),
    e('mercury', 2, '☿ Thủy Tinh ở Nhà 2', 'Tư duy hướng về việc kiếm tiền và quản lý tài chính. Bạn có thể kiếm thu nhập từ giao tiếp, viết lách hoặc buôn bán.', ['tài chính', 'buôn bán', 'viết lách']),
    e('mercury', 3, '☿ Thủy Tinh ở Nhà 3', 'Vị trí tự nhiên nhất của Thủy Tinh. Giao tiếp, viết lách, học hỏi đều xuất sắc. Mối quan hệ anh em đầy trao đổi trí tuệ.', ['giao tiếp', 'học hỏi', 'viết']),
    e('mercury', 4, '☿ Thủy Tinh ở Nhà 4', 'Tư duy gắn với gia đình và truyền thống. Bạn có thể làm việc tại nhà, nghiên cứu lịch sử gia đình, hoặc quan tâm đến bất động sản.', ['gia đình', 'truyền thống', 'nghiên cứu']),
    e('mercury', 5, '☿ Thủy Tinh ở Nhà 5', 'Sáng tạo qua ngôn từ và ý tưởng. Bạn có tài kể chuyện, viết văn sáng tạo, và giao tiếp tốt với trẻ em.', ['sáng tạo', 'viết văn', 'trẻ em']),
    e('mercury', 6, '☿ Thủy Tinh ở Nhà 6', 'Tư duy phân tích, chú trọng chi tiết trong công việc. Bạn giỏi tổ chức, lập kế hoạch, và quan tâm đến sức khỏe qua kiến thức.', ['phân tích', 'tổ chức', 'chi tiết']),
    e('mercury', 7, '☿ Thủy Tinh ở Nhà 7', 'Giao tiếp là chìa khóa trong mối quan hệ. Bạn cần đối tác có thể trò chuyện trí tuệ, và có khả năng đàm phán, hòa giải tốt.', ['đàm phán', 'giao tiếp', 'đối tác']),
    e('mercury', 8, '☿ Thủy Tinh ở Nhà 8', 'Tư duy sâu sắc, thích tìm hiểu bí mật. Bạn có khả năng nghiên cứu, điều tra, và hiểu biết sâu về tâm lý con người.', ['nghiên cứu', 'bí mật', 'tâm lý']),
    e('mercury', 9, '☿ Thủy Tinh ở Nhà 9', 'Trí tuệ hướng về triết lý, giáo dục bậc cao. Bạn yêu thích học ngoại ngữ, du lịch và tìm hiểu các nền văn hóa khác.', ['triết lý', 'ngoại ngữ', 'du lịch']),
    e('mercury', 10, '☿ Thủy Tinh ở Nhà 10', 'Sự nghiệp gắn với giao tiếp, viết lách, truyền thông. Bạn có thể thành công trong báo chí, marketing, giáo dục, hoặc công nghệ.', ['sự nghiệp', 'truyền thông', 'giáo dục']),
    e('mercury', 11, '☿ Thủy Tinh ở Nhà 11', 'Tư duy tiến bộ, kết nối qua cộng đồng. Bạn có nhiều bạn bè đa dạng, yêu thích công nghệ, và quan tâm đến các vấn đề xã hội.', ['cộng đồng', 'công nghệ', 'tiến bộ']),
    e('mercury', 12, '☿ Thủy Tinh ở Nhà 12', 'Tư duy trực giác, tiềm thức. Bạn có thể khó diễn đạt suy nghĩ bằng lời nhưng có khả năng viết sáng tạo và chiêm nghiệm sâu sắc.', ['trực giác', 'tiềm thức', 'chiêm nghiệm']),

    // ── Venus (Kim Tinh) ──
    e('venus', 1, '♀ Kim Tinh ở Nhà 1', 'Ngoại hình cuốn hút, duyên dáng tự nhiên. Bạn có khiếu thẩm mỹ, yêu cái đẹp, và tạo ấn tượng hài hòa với mọi người xung quanh.', ['duyên dáng', 'thẩm mỹ', 'hài hòa']),
    e('venus', 2, '♀ Kim Tinh ở Nhà 2', 'Vị trí tự nhiên. Bạn yêu thích xa hoa, có gu thẩm mỹ tốt, và có khả năng kiếm tiền từ nghệ thuật hoặc lĩnh vực làm đẹp.', ['xa hoa', 'nghệ thuật', 'tiền bạc']),
    e('venus', 3, '♀ Kim Tinh ở Nhà 3', 'Giao tiếp ngọt ngào, lịch thiệp. Bạn có khả năng viết đẹp, ngoại giao giỏi, và mối quan hệ anh em gắn bó.', ['giao tiếp', 'lịch thiệp', 'ngôn từ đẹp']),
    e('venus', 4, '♀ Kim Tinh ở Nhà 4', 'Yêu thích trang trí nhà cửa, tạo không gian sống đẹp. Gia đình là nguồn hạnh phúc lớn. Cuộc sống về già thường an nhàn, thoải mái.', ['nhà cửa', 'gia đình', 'trang trí']),
    e('venus', 5, '♀ Kim Tinh ở Nhà 5', 'Tình yêu lãng mạn, nghệ thuật phong phú. Bạn có tài năng sáng tạo, yêu giải trí và thường được con cái yêu mến.', ['tình yêu', 'nghệ thuật', 'lãng mạn']),
    e('venus', 6, '♀ Kim Tinh ở Nhà 6', 'Tìm vẻ đẹp trong công việc hàng ngày. Bạn có mối quan hệ tốt với đồng nghiệp, chú trọng thẩm mỹ trong sức khỏe và dinh dưỡng.', ['công việc', 'đồng nghiệp', 'sức khỏe']),
    e('venus', 7, '♀ Kim Tinh ở Nhà 7', 'Vị trí thuận lợi nhất cho hôn nhân. Bạn thu hút đối tác đẹp, hài hòa, và trân trọng sự công bằng trong mối quan hệ.', ['hôn nhân', 'hài hòa', 'đối tác']),
    e('venus', 8, '♀ Kim Tinh ở Nhà 8', 'Tình yêu mãnh liệt, đam mê sâu sắc. Bạn có thể hưởng lợi tài chính từ đối tác, và bị thu hút bởi những mối quan hệ biến đổi.', ['đam mê', 'biến đổi', 'tài chính chung']),
    e('venus', 9, '♀ Kim Tinh ở Nhà 9', 'Yêu du lịch, văn hóa, triết lý. Bạn có thể yêu người nước ngoài hoặc tìm thấy tình yêu khi đi xa. Thẩm mỹ bị ảnh hưởng bởi các nền văn hóa khác.', ['du lịch', 'văn hóa', 'tình yêu xa']),
    e('venus', 10, '♀ Kim Tinh ở Nhà 10', 'Sự nghiệp trong lĩnh vực nghệ thuật, thời trang, ngoại giao. Bạn được công chúng yêu mến, và thường thành công nhờ sự duyên dáng.', ['sự nghiệp', 'nghệ thuật', 'ngoại giao']),
    e('venus', 11, '♀ Kim Tinh ở Nhà 11', 'Bạn bè đông đúc, mối quan hệ xã hội rộng. Bạn yêu thích hoạt động nhóm, có thể tìm thấy tình yêu qua bạn bè hoặc cộng đồng.', ['bạn bè', 'hoạt động nhóm', 'xã hội']),
    e('venus', 12, '♀ Kim Tinh ở Nhà 12', 'Tình yêu bí mật, hy sinh. Bạn có lòng từ bi lớn, yêu thích nghệ thuật có chiều sâu tâm linh, và có thể có những mối tình ẩn giấu.', ['bí mật', 'hy sinh', 'tâm linh']),

    // ── Mars (Hỏa Tinh) ──
    e('mars', 1, '♂ Hỏa Tinh ở Nhà 1', 'Năng lượng mạnh mẽ, hành động nhanh, dũng cảm. Bạn có bản năng cạnh tranh, thể lực tốt, nhưng cần kiểm soát sự nóng nảy.', ['năng lượng', 'dũng cảm', 'cạnh tranh']),
    e('mars', 2, '♂ Hỏa Tinh ở Nhà 2', 'Hành động mạnh mẽ để kiếm tiền. Bạn có thể kiếm tiền nhanh nhưng cũng tiêu nhanh. Bảo vệ tài sản một cách quyết liệt.', ['kiếm tiền', 'chi tiêu', 'bảo vệ']),
    e('mars', 3, '♂ Hỏa Tinh ở Nhà 3', 'Giao tiếp thẳng thắn, đôi khi gay gắt. Bạn có tư duy nhanh, tranh luận giỏi, nhưng cần tránh xung đột với anh em hoặc hàng xóm.', ['tranh luận', 'thẳng thắn', 'xung đột']),
    e('mars', 4, '♂ Hỏa Tinh ở Nhà 4', 'Năng lượng mạnh trong gia đình. Bạn có thể là người "xây dựng" trong nhà, nhưng cần tránh xung đột gia đình và kiểm soát cơn giận.', ['gia đình', 'xây dựng', 'xung đột']),
    e('mars', 5, '♂ Hỏa Tinh ở Nhà 5', 'Sáng tạo mãnh liệt, đam mê tình yêu. Bạn thích thể thao, cạnh tranh, và có khả năng lãnh đạo trong hoạt động giải trí.', ['đam mê', 'thể thao', 'sáng tạo']),
    e('mars', 6, '♂ Hỏa Tinh ở Nhà 6', 'Làm việc chăm chỉ, năng suất cao. Bạn có thể bị căng thẳng do làm việc quá sức. Sức khỏe tốt nếu tập thể dục đều đặn.', ['chăm chỉ', 'năng suất', 'thể dục']),
    e('mars', 7, '♂ Hỏa Tinh ở Nhà 7', 'Mối quan hệ đầy đam mê nhưng cũng nhiều xung đột. Bạn thu hút đối tác mạnh mẽ, và cần học cách thỏa hiệp trong hôn nhân.', ['đam mê', 'xung đột', 'thỏa hiệp']),
    e('mars', 8, '♂ Hỏa Tinh ở Nhà 8', 'Sức mạnh biến đổi, dục vọng mãnh liệt. Bạn có khả năng đối mặt với khủng hoảng, tái sinh sau thất bại, và quản lý tài chính chung hiệu quả.', ['biến đổi', 'dục vọng', 'tái sinh']),
    e('mars', 9, '♂ Hỏa Tinh ở Nhà 9', 'Hành động vì lý tưởng và niềm tin. Bạn yêu thích phiêu lưu, du lịch mạo hiểm, và bảo vệ quan điểm triết lý của mình mãnh liệt.', ['phiêu lưu', 'lý tưởng', 'niềm tin']),
    e('mars', 10, '♂ Hỏa Tinh ở Nhà 10', 'Tham vọng lớn trong sự nghiệp. Bạn hành động quyết đoán để đạt mục tiêu, có khả năng lãnh đạo, nhưng có thể tạo kẻ thù trong công việc.', ['tham vọng', 'lãnh đạo', 'quyết đoán']),
    e('mars', 11, '♂ Hỏa Tinh ở Nhà 11', 'Hành động vì cộng đồng và lý tưởng xã hội. Bạn là người lãnh đạo nhóm mạnh mẽ, nhưng cần tránh xung đột với bạn bè.', ['cộng đồng', 'lãnh đạo nhóm', 'lý tưởng']),
    e('mars', 12, '♂ Hỏa Tinh ở Nhà 12', 'Năng lượng hướng nội, hành động ẩn giấu. Bạn có thể làm việc sau hậu trường, có bản năng tâm linh mạnh, nhưng cần giải phóng cơn giận bị kìm nén.', ['ẩn giấu', 'hậu trường', 'tâm linh']),

    // ── Jupiter (Mộc Tinh) ──
    e('jupiter', 1, '♃ Mộc Tinh ở Nhà 1', 'Lạc quan, rộng lượng, may mắn tự nhiên. Bạn có tính cách phóng khoáng, thu hút cơ hội, và có sự tự tin dồi dào.', ['lạc quan', 'may mắn', 'phóng khoáng']),
    e('jupiter', 2, '♃ Mộc Tinh ở Nhà 2', 'May mắn về tài chính, khả năng tích lũy tốt. Bạn có xu hướng hào phóng với tiền bạc và trân trọng những giá trị tinh thần.', ['tài chính', 'hào phóng', 'tích lũy']),
    e('jupiter', 3, '♃ Mộc Tinh ở Nhà 3', 'Tư duy mở rộng, giao tiếp phong phú. Bạn yêu thích học hỏi liên tục, có mối quan hệ tốt với anh em, và giỏi truyền đạt.', ['học hỏi', 'giao tiếp', 'anh em']),
    e('jupiter', 4, '♃ Mộc Tinh ở Nhà 4', 'Gia đình rộng lớn, nhà cửa thoải mái. Bạn được hưởng phúc từ gia đình, cuộc sống về già an nhàn, sung túc.', ['gia đình', 'nhà cửa', 'phúc đức']),
    e('jupiter', 5, '♃ Mộc Tinh ở Nhà 5', 'Sáng tạo phong phú, tình yêu may mắn. Bạn yêu thích giải trí, có thể có nhiều con, và tận hưởng cuộc sống trọn vẹn.', ['sáng tạo', 'tình yêu', 'may mắn']),
    e('jupiter', 6, '♃ Mộc Tinh ở Nhà 6', 'Sức khỏe tốt, công việc thuận lợi. Bạn tìm thấy ý nghĩa trong việc phục vụ, và gặp may mắn với đồng nghiệp và cấp dưới.', ['sức khỏe', 'công việc', 'phục vụ']),
    e('jupiter', 7, '♃ Mộc Tinh ở Nhà 7', 'Hôn nhân may mắn, đối tác hào phóng. Bạn thu hút bạn đời rộng lượng, và phát triển nhờ các mối quan hệ hợp tác.', ['hôn nhân', 'may mắn', 'hợp tác']),
    e('jupiter', 8, '♃ Mộc Tinh ở Nhà 8', 'Được hưởng lợi từ tài chính chung, thừa kế. Bạn có khả năng vượt qua khủng hoảng và biến đổi tích cực nhờ niềm tin.', ['thừa kế', 'biến đổi', 'niềm tin']),
    e('jupiter', 9, '♃ Mộc Tinh ở Nhà 9', 'Vị trí tự nhiên nhất. Tầm nhìn rộng lớn, may mắn khi du lịch, giáo dục bậc cao. Bạn có thể trở thành giáo viên, triết gia, hoặc nhà truyền giáo.', ['triết lý', 'du lịch', 'giáo dục']),
    e('jupiter', 10, '♃ Mộc Tinh ở Nhà 10', 'Sự nghiệp thăng tiến, danh tiếng tốt. Bạn được xã hội tôn trọng, có cơ hội thăng tiến lớn, và thường đạt vị trí cao.', ['sự nghiệp', 'thăng tiến', 'danh tiếng']),
    e('jupiter', 11, '♃ Mộc Tinh ở Nhà 11', 'Mạng lưới bạn bè rộng, nhiều người giúp đỡ. Bạn có ước mơ lớn, và thường thực hiện được nhờ sự hỗ trợ của cộng đồng.', ['bạn bè', 'ước mơ', 'hỗ trợ']),
    e('jupiter', 12, '♃ Mộc Tinh ở Nhà 12', 'May mắn ẩn giấu, được phù hộ ngầm. Bạn có lòng từ bi lớn, liên kết tâm linh mạnh, và thường được bảo vệ trong lúc khó khăn.', ['tâm linh', 'từ bi', 'bảo vệ']),

    // ── Saturn (Thổ Tinh) ──
    e('saturn', 1, '♄ Thổ Tinh ở Nhà 1', 'Nghiêm túc, kỷ luật, trưởng thành sớm. Bạn gánh chịu trách nhiệm từ nhỏ, nhưng theo thời gian trở nên mạnh mẽ và đáng tin cậy.', ['kỷ luật', 'trách nhiệm', 'trưởng thành']),
    e('saturn', 2, '♄ Thổ Tinh ở Nhà 2', 'Bài học về tài chính và giá trị. Bạn có thể gặp khó khăn tài chính lúc đầu nhưng xây dựng sự giàu có bền vững qua kỷ luật.', ['tài chính', 'kỷ luật', 'bền vững']),
    e('saturn', 3, '♄ Thổ Tinh ở Nhà 3', 'Tư duy cẩn thận, giao tiếp có trọng lượng. Bạn nói ít nhưng mỗi lời đều có giá trị. Có thể gặp thử thách với anh em.', ['cẩn trọng', 'trọng lượng', 'anh em']),
    e('saturn', 4, '♄ Thổ Tinh ở Nhà 4', 'Thử thách từ gia đình và tuổi thơ. Bạn có thể có tuổi thơ khó khăn nhưng xây dựng nền tảng gia đình vững chắc khi trưởng thành.', ['gia đình', 'thử thách', 'nền tảng']),
    e('saturn', 5, '♄ Thổ Tinh ở Nhà 5', 'Sáng tạo có kỷ luật, tình yêu nghiêm túc. Bạn có thể gặp khó khăn trong việc thể hiện cảm xúc và vui chơi, nhưng tài năng bền vững.', ['kỷ luật', 'sáng tạo', 'nghiêm túc']),
    e('saturn', 6, '♄ Thổ Tinh ở Nhà 6', 'Làm việc cực kỳ chăm chỉ, có hệ thống. Bạn là người đáng tin cậy nhất trong công việc, nhưng cần chú ý sức khỏe xương khớp.', ['chăm chỉ', 'hệ thống', 'đáng tin']),
    e('saturn', 7, '♄ Thổ Tinh ở Nhà 7', 'Kết hôn muộn hoặc với người lớn tuổi hơn. Mối quan hệ đòi hỏi cam kết nghiêm túc, nhưng hôn nhân bền vững nếu vượt qua thử thách.', ['kết hôn muộn', 'cam kết', 'bền vững']),
    e('saturn', 8, '♄ Thổ Tinh ở Nhà 8', 'Bài học sâu sắc về sự mất mát và biến đổi. Bạn có thể sợ hãi sự thay đổi nhưng khi đối mặt sẽ trở nên mạnh mẽ phi thường.', ['mất mát', 'biến đổi', 'sức mạnh']),
    e('saturn', 9, '♄ Thổ Tinh ở Nhà 9', 'Triết lý sống thực tế, giáo dục theo hướng truyền thống. Bạn xây dựng hệ thống niềm tin vững chắc qua kinh nghiệm thực tế.', ['triết lý', 'truyền thống', 'thực tế']),
    e('saturn', 10, '♄ Thổ Tinh ở Nhà 10', 'Vị trí tự nhiên. Tham vọng lớn, thăng tiến bền bỉ. Bạn đạt đỉnh cao sự nghiệp qua nỗ lực lâu dài và kỷ luật nghiêm ngặt.', ['sự nghiệp', 'tham vọng', 'kỷ luật']),
    e('saturn', 11, '♄ Thổ Tinh ở Nhà 11', 'Ít bạn bè nhưng chất lượng. Bạn có thể gặp khó khăn hòa nhập nhóm, nhưng những mối quan hệ bạn xây dựng rất bền lâu.', ['bạn bè ít', 'chất lượng', 'bền lâu']),
    e('saturn', 12, '♄ Thổ Tinh ở Nhà 12', 'Nỗi sợ tiềm thức, cần đối mặt bóng tối nội tâm. Bạn có bài học karmic sâu sắc, nhưng khi vượt qua sẽ đạt được sự giác ngộ.', ['tiềm thức', 'karma', 'giác ngộ']),

    // ── Uranus (Thiên Vương) ──
    e('uranus', 1, '♅ Thiên Vương ở Nhà 1', 'Cá tính độc đáo, không theo khuôn mẫu. Bạn là người tiên phong, yêu tự do cá nhân, và thường gây bất ngờ cho mọi người.', ['độc đáo', 'tự do', 'tiên phong']),
    e('uranus', 2, '♅ Thiên Vương ở Nhà 2', 'Tài chính bất thường, thu nhập từ lĩnh vực mới lạ. Bạn có quan điểm khác biệt về giá trị, và tài chính biến động bất ngờ.', ['tài chính bất thường', 'độc lập', 'đổi mới']),
    e('uranus', 3, '♅ Thiên Vương ở Nhà 3', 'Tư duy đột phá, giao tiếp khác biệt. Bạn có ý tưởng đi trước thời đại và thích thử nghiệm cách giao tiếp mới lạ.', ['đột phá', 'sáng tạo', 'khác biệt']),
    e('uranus', 4, '♅ Thiên Vương ở Nhà 4', 'Gia đình không theo truyền thống. Bạn có thể có tuổi thơ bất ổn hoặc chọn lối sống gia đình khác biệt so với chuẩn mực.', ['gia đình khác biệt', 'bất ổn', 'tự do']),
    e('uranus', 5, '♅ Thiên Vương ở Nhà 5', 'Sáng tạo đột phá, tình yêu tự do. Bạn có phong cách nghệ thuật độc đáo, yêu sự bất ngờ trong tình yêu.', ['sáng tạo', 'tự do', 'đột phá']),
    e('uranus', 6, '♅ Thiên Vương ở Nhà 6', 'Phương pháp làm việc khác thường, quan tâm sức khỏe thay thế. Bạn cần tự do trong công việc và không thích thói quen cứng nhắc.', ['tự do', 'sáng tạo', 'thay thế']),
    e('uranus', 7, '♅ Thiên Vương ở Nhà 7', 'Mối quan hệ không truyền thống. Bạn cần tự do trong hôn nhân, thu hút đối tác khác biệt, và có thể có quan hệ đột phá khuôn mẫu.', ['tự do', 'khác biệt', 'đột phá']),
    e('uranus', 8, '♅ Thiên Vương ở Nhà 8', 'Biến đổi đột ngột, thức tỉnh tâm linh. Bạn trải qua những thay đổi bất ngờ về tài chính chung và nhận thức sâu sắc về sự sống chết.', ['biến đổi', 'thức tỉnh', 'bất ngờ']),
    e('uranus', 9, '♅ Thiên Vương ở Nhà 9', 'Tư tưởng cách mạng, triết lý phi truyền thống. Bạn có quan điểm tiến bộ về tôn giáo, giáo dục và du lịch đến nơi bất ngờ.', ['cách mạng', 'tiến bộ', 'phi truyền thống']),
    e('uranus', 10, '♅ Thiên Vương ở Nhà 10', 'Sự nghiệp trong lĩnh vực công nghệ, đổi mới. Bạn có thể thay đổi nghề liên tục hoặc tạo ra những đột phá trong sự nghiệp.', ['công nghệ', 'đổi mới', 'thay đổi nghề']),
    e('uranus', 11, '♅ Thiên Vương ở Nhà 11', 'Vị trí tự nhiên. Bạn bè độc đáo, cộng đồng tiến bộ. Bạn là nhà cách mạng xã hội, quan tâm đến nhân loại và tương lai.', ['cách mạng', 'cộng đồng', 'tương lai']),
    e('uranus', 12, '♅ Thiên Vương ở Nhà 12', 'Trực giác đột phá, thức tỉnh tiềm thức. Bạn có khả năng tâm linh bất thường và trải qua những giác ngộ bất ngờ.', ['trực giác', 'thức tỉnh', 'tâm linh']),

    // ── Neptune (Hải Vương) ──
    e('neptune', 1, '♆ Hải Vương ở Nhà 1', 'Mơ mộng, nhạy cảm, nghệ sĩ. Bạn có aura bí ẩn, dễ bị ảnh hưởng bởi người khác, và có khả năng nghệ thuật bẩm sinh.', ['mơ mộng', 'nhạy cảm', 'bí ẩn']),
    e('neptune', 2, '♆ Hải Vương ở Nhà 2', 'Tài chính mơ hồ, không rõ ràng. Bạn có thể kiếm tiền từ nghệ thuật hoặc tâm linh, nhưng cần cẩn thận với lừa đảo tài chính.', ['mơ hồ', 'nghệ thuật', 'cẩn thận']),
    e('neptune', 3, '♆ Hải Vương ở Nhà 3', 'Giao tiếp đầy thi vị, tưởng tượng phong phú. Bạn viết sáng tạo xuất sắc nhưng có thể gặp khó khăn với giao tiếp rõ ràng.', ['thi vị', 'tưởng tượng', 'sáng tạo']),
    e('neptune', 4, '♆ Hải Vương ở Nhà 4', 'Gia đình mang tính lý tưởng hóa. Bạn có thể có ký ức tuổi thơ mơ hồ, và tìm kiếm một mái ấm hoàn hảo trong tưởng tượng.', ['gia đình', 'lý tưởng', 'mơ hồ']),
    e('neptune', 5, '♆ Hải Vương ở Nhà 5', 'Sáng tạo tâm linh, tình yêu lý tưởng hóa. Bạn có tài năng nghệ thuật đặc biệt nhưng cần tránh ảo tưởng trong tình yêu.', ['nghệ thuật', 'lý tưởng', 'ảo tưởng']),
    e('neptune', 6, '♆ Hải Vương ở Nhà 6', 'Nhạy cảm với sức khỏe, quan tâm y học thay thế. Bạn phục vụ với lòng từ bi, nhưng cần tránh tiếp nhận năng lượng tiêu cực của người khác.', ['sức khỏe', 'từ bi', 'y học thay thế']),
    e('neptune', 7, '♆ Hải Vương ở Nhà 7', 'Hôn nhân được lý tưởng hóa. Bạn tìm kiếm đối tác hoàn hảo, nhưng cần thực tế hơn và tránh tự lừa dối trong mối quan hệ.', ['lý tưởng hóa', 'hôn nhân', 'ảo tưởng']),
    e('neptune', 8, '♆ Hải Vương ở Nhà 8', 'Trực giác tâm linh cực mạnh. Bạn có khả năng cảm nhận những chiều không gian khác, và trải qua những biến đổi mang tính tâm linh.', ['tâm linh', 'trực giác', 'biến đổi']),
    e('neptune', 9, '♆ Hải Vương ở Nhà 9', 'Tìm kiếm chân lý qua tâm linh và trực giác. Bạn bị thu hút bởi các tôn giáo, triết lý phương Đông, và du lịch đến nơi thiêng liêng.', ['chân lý', 'tôn giáo', 'tâm linh']),
    e('neptune', 10, '♆ Hải Vương ở Nhà 10', 'Sự nghiệp trong lĩnh vực nghệ thuật, tâm linh, chữa lành. Hình ảnh công chúng có thể bị hiểu lầm hoặc lý tưởng hóa quá mức.', ['nghệ thuật', 'tâm linh', 'hình ảnh']),
    e('neptune', 11, '♆ Hải Vương ở Nhà 11', 'Lý tưởng nhân đạo, bạn bè từ nhiều nguồn. Bạn mơ ước một thế giới tốt đẹp hơn, nhưng cần phân biệt bạn thật và bạn giả.', ['nhân đạo', 'lý tưởng', 'mơ ước']),
    e('neptune', 12, '♆ Hải Vương ở Nhà 12', 'Vị trí tự nhiên. Tâm linh sâu sắc, trực giác mạnh nhất. Bạn có khả năng kết nối với vô thức tập thể và chiều không gian cao hơn.', ['tâm linh', 'trực giác', 'vô thức']),

    // ── Pluto (Diêm Vương) ──
    e('pluto', 1, '♇ Diêm Vương ở Nhà 1', 'Sức mạnh cá nhân cực kỳ lớn. Bạn có ánh mắt xuyên thấu, aura quyền lực, và khả năng tái tạo bản thân liên tục.', ['quyền lực', 'biến đổi', 'xuyên thấu']),
    e('pluto', 2, '♇ Diêm Vương ở Nhà 2', 'Tài chính trải qua biến đổi lớn — từ giàu sang nghèo hoặc ngược lại. Bạn có quan hệ sâu sắc với quyền lực tài chính.', ['tài chính', 'biến đổi', 'quyền lực']),
    e('pluto', 3, '♇ Diêm Vương ở Nhà 3', 'Ngôn từ có sức mạnh biến đổi. Bạn có khả năng thuyết phục, điều tra, và nói ra những sự thật mà người khác giấu kín.', ['thuyết phục', 'điều tra', 'sự thật']),
    e('pluto', 4, '♇ Diêm Vương ở Nhà 4', 'Biến đổi sâu sắc qua gia đình. Bạn có thể có tuổi thơ đầy biến cố, nhưng qua đó xây dựng nền tảng tâm lý mạnh mẽ phi thường.', ['gia đình', 'biến cố', 'nền tảng']),
    e('pluto', 5, '♇ Diêm Vương ở Nhà 5', 'Sáng tạo mãnh liệt, tình yêu đam mê tột độ. Bạn thể hiện bản thân một cách cực đoan, và mối quan hệ tình yêu luôn đầy kịch tính.', ['đam mê', 'cực đoan', 'sáng tạo']),
    e('pluto', 6, '♇ Diêm Vương ở Nhà 6', 'Biến đổi thói quen và sức khỏe. Bạn có thể trải qua khủng hoảng sức khỏe dẫn đến thay đổi lối sống hoàn toàn. Công việc đòi hỏi chiều sâu.', ['sức khỏe', 'biến đổi', 'chiều sâu']),
    e('pluto', 7, '♇ Diêm Vương ở Nhà 7', 'Mối quan hệ mãnh liệt, đầy quyền lực. Bạn thu hút đối tác có sức ảnh hưởng lớn, và hôn nhân luôn là trải nghiệm biến đổi sâu sắc.', ['quyền lực', 'mãnh liệt', 'biến đổi']),
    e('pluto', 8, '♇ Diêm Vương ở Nhà 8', 'Vị trí tự nhiên. Sức mạnh biến đổi cực đại. Bạn có khả năng tái sinh sau mọi thất bại, trực giác sâu sắc về sự sống và cái chết.', ['tái sinh', 'quyền lực', 'sự sống chết']),
    e('pluto', 9, '♇ Diêm Vương ở Nhà 9', 'Niềm tin bị thử thách và biến đổi. Bạn tìm kiếm sự thật tuyệt đối, có thể trải qua khủng hoảng niềm tin dẫn đến thức tỉnh.', ['niềm tin', 'thức tỉnh', 'sự thật']),
    e('pluto', 10, '♇ Diêm Vương ở Nhà 10', 'Quyền lực trong sự nghiệp. Bạn có ảnh hưởng lớn trong xã hội, có thể trải qua sự sụp đổ và tái thiết sự nghiệp một cách ngoạn mục.', ['quyền lực', 'sự nghiệp', 'tái thiết']),
    e('pluto', 11, '♇ Diêm Vương ở Nhà 11', 'Biến đổi qua cộng đồng. Bạn có ảnh hưởng sâu sắc đến nhóm bạn, và có thể tham gia các phong trào mang tính cách mạng xã hội.', ['cộng đồng', 'cách mạng', 'ảnh hưởng']),
    e('pluto', 12, '♇ Diêm Vương ở Nhà 12', 'Biến đổi sâu nhất ở tầng tiềm thức. Bạn đối mặt với bóng tối nội tâm, và qua quá trình chữa lành trở thành người có sức mạnh tâm linh phi thường.', ['tiềm thức', 'chữa lành', 'tâm linh']),
]);

/** Lookup interpretation by planet and house number */
export function getPlanetInHouseInterpretation(planet: PlanetId, house: number): InterpretationEntry | undefined {
    return PLANET_IN_HOUSE.get(`${planet}-in-house-${house}`);
}
