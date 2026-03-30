// ═══════════════════════════════════════════════════════════════════
// 14 Major Star Meanings (Chính Tinh)
// ═══════════════════════════════════════════════════════════════════
export const STAR_MEANINGS: Record<string, string> = {
    'Tử Vi': 'Tượng trưng cho sự tôn quý, lãnh đạo, quyền uy. Mang tính chất giải tai, cứu nạn.',
    'Thiên Cơ': 'Chủ về trí tuệ, mưu lược, sự linh hoạt, hiếu động, và suy tính.',
    'Thái Dương': 'Đại diện cho quyền lực, sự quang minh chính đại, danh tiếng, nam giới (cha, chồng).',
    'Vũ Khúc': 'Chủ về tài lộc, sự mạnh mẽ, quyết đoán, đôi khi mang tính cô độc.',
    'Thiên Đồng': 'Phúc tinh, chủ về sự thụ hưởng, ôn hòa, hiền lành, đôi khi thiếu quyết đoán.',
    'Liêm Trinh': 'Quyền tinh, đào hoa tinh. Chủ về sự nghiêm minh, nóng nảy, nhưng cũng rất tài hoa.',
    'Thiên Phủ': 'Kho tàng, tài lộc. Thể hiện sự ổn định, điềm đạm, khả năng quản lý tài chính tốt.',
    'Thái Âm': 'Đại diện cho điền trạch, tài lộc êm đềm, nữ giới (mẹ, vợ). Tính tình nhẹ nhàng, lãng mạn.',
    'Tham Lang': 'Đào hoa tinh, chủ về sự dục vọng, giao tiếp bề ngoài, tài năng nghệ thuật và sự biến động.',
    'Cự Môn': 'Chủ về ngôn ngữ, thị phi, ám muội. Có tài ăn nói nhưng hay gặp rắc rối từ lời nói.',
    'Thiên Tướng': 'Ấn tinh, sự phò tá. Tính cách ngay thẳng, chuộng sự bằng phẳng, lo chuyện bất bình.',
    'Thiên Lương': 'Ấm tinh, thọ tinh. Mang tính chất giáo dục, che chở, giải ách, sống nguyên tắc.',
    'Thất Sát': 'Tướng tinh, uy quyền. Tính cách mạnh mẽ, độc lập, hay gặp thử thách gian nan sương gió.',
    'Phá Quân': 'Hao tinh, sự tiên phong, phá cũ lập mới. Tính cách ngang tàng, khai sáng, nhiều thăng trầm.'
};

// ═══════════════════════════════════════════════════════════════════
// Brightness-Modulated Descriptions (P2.2)
// Key: "StarName|BrightnessCategory" → description
// BrightnessCategory: "strong" (庙/旺), "neutral" (得/利/平), "weak" (不/陷)
// ═══════════════════════════════════════════════════════════════════
export const BRIGHTNESS_MODIFIER: Record<string, Record<string, string>> = {
    'Tử Vi': {
        strong: 'Tử Vi Miếu Vượng: khí chất đế vương, tự tin, uy nghi, quyền lực tự nhiên, quý nhân phò tá.',
        neutral: 'Tử Vi Đắc Bình: có chí hướng lớn nhưng cần nỗ lực bản thân, ít quý nhân tự đến.',
        weak: 'Tử Vi Hãm: tuy vẫn có chí hướng lớn nhưng thiếu thực lực, cô độc, thiếu người phò trợ.',
    },
    'Thiên Cơ': {
        strong: 'Thiên Cơ Miếu Vượng: trí tuệ sáng suốt, phản ứng nhanh, mưu lược xuất chúng.',
        neutral: 'Thiên Cơ Đắc Bình: thông minh nhưng hay do dự, chi tiết vụn vặt.',
        weak: 'Thiên Cơ Hãm: suy nghĩ lệch lạc, mưu tính nhưng không thành, dễ bị lừa.',
    },
    'Thái Dương': {
        strong: 'Thái Dương Miếu Vượng: quang minh chính đại, danh tiếng lẫy lừng, phát huy được hết năng lực.',
        neutral: 'Thái Dương Đắc Bình: có danh nhưng chưa thực sự rực rỡ, cần thêm nỗ lực.',
        weak: 'Thái Dương Hãm: danh hư, bị lu mờ, dễ gặp thị phi, sức khỏe mắt yếu.',
    },
    'Vũ Khúc': {
        strong: 'Vũ Khúc Miếu Vượng: tài chính vững vàng, quyết đoán mạnh mẽ, đại phú.',
        neutral: 'Vũ Khúc Đắc Bình: tài chính ổn nhưng không bạo phát, cần chăm chỉ.',
        weak: 'Vũ Khúc Hãm: cô độc, tài chính bấp bênh, dễ tranh đoạt, bất hòa.',
    },
    'Thiên Đồng': {
        strong: 'Thiên Đồng Miếu Vượng: phúc hậu, đời sống tinh thần phong phú, tuổi già an nhàn.',
        neutral: 'Thiên Đồng Đắc Bình: có phúc nhưng hay lười biếng, thiếu ý chí phấn đấu.',
        weak: 'Thiên Đồng Hãm: phúc mỏng, hay gặp phiền não, thiếu chí tiến thủ.',
    },
    'Liêm Trinh': {
        strong: 'Liêm Trinh Miếu Vượng: tài hoa xuất chúng, liêm khiết, quyền uy trong công việc.',
        neutral: 'Liêm Trinh Đắc Bình: nóng nảy nhưng biết kiềm chế, đào hoa vừa phải.',
        weak: 'Liêm Trinh Hãm: thị phi, hình tụng, đào hoa sai lầm, dễ mắc vào pháp luật.',
    },
    'Thiên Phủ': {
        strong: 'Thiên Phủ Miếu Vượng: kho tàng đầy đủ, tài chính ổn định, có phong thái lãnh đạo.',
        neutral: 'Thiên Phủ Đắc Bình: ổn định nhưng không giàu có nổi bật, bảo thủ.',
        weak: 'Thiên Phủ Hãm: kho rỗng, tài chính thiếu hụt, xu nịnh để tồn tại.',
    },
    'Thái Âm': {
        strong: 'Thái Âm Miếu Vượng: tài lộc dồi dào, điền trạch phong phú, tâm hồn nhẹ nhàng thanh nhã.',
        neutral: 'Thái Âm Đắc Bình: tài lộc trung bình, đời sống cảm xúc phong phú nhưng hay lo lắng.',
        weak: 'Thái Âm Hãm: tài lộc tiêu hao, hay mất ngủ, tâm trạng bất ổn, đa sầu đa cảm.',
    },
    'Tham Lang': {
        strong: 'Tham Lang Miếu Vượng: tài nghệ đa dạng, giao tiếp rộng, đào hoa tốt, sáng tạo.',
        neutral: 'Tham Lang Đắc Bình: đa tài nhưng không chuyên, dục vọng nhiều nhưng biết kiềm chế.',
        weak: 'Tham Lang Hãm: ham mê tửu sắc, tham lam quá đáng, rượu chè cờ bạc.',
    },
    'Cự Môn': {
        strong: 'Cự Môn Miếu Vượng: ăn nói thuyết phục, tranh biện giỏi, có uy quyền trong ngôn ngữ.',
        neutral: 'Cự Môn Đắc Bình: giỏi ăn nói nhưng hay thị phi nhỏ, cần cẩn thận lời nói.',
        weak: 'Cự Môn Hãm: thị phi triền miên, bị hiểu lầm, ám muội, dễ kiện tụng.',
    },
    'Thiên Tướng': {
        strong: 'Thiên Tướng Miếu Vượng: phò tá đắc lực, chính trực, mang ấn lệnh, quý nhân giúp đỡ.',
        neutral: 'Thiên Tướng Đắc Bình: ngay thẳng nhưng hay bị kẹt giữa hai bên, dễ bị lợi dụng.',
        weak: 'Thiên Tướng Hãm: mất ấn, bị lợi dụng, hay gặp người xấu lừa gạt.',
    },
    'Thiên Lương': {
        strong: 'Thiên Lương Miếu Vượng: phúc thọ song toàn, giải nạn tốt, sống lâu, kính trọng.',
        neutral: 'Thiên Lương Đắc Bình: phúc trung bình, hay lo lắng nhưng về già an ổn.',
        weak: 'Thiên Lương Hãm: phúc mỏng, hay bệnh vặt, cô đơn, thiếu người giúp đỡ.',
    },
    'Thất Sát': {
        strong: 'Thất Sát Miếu Vượng: uy quyền hiển hách, tướng tinh oai phong, gặp dữ hóa lành.',
        neutral: 'Thất Sát Đắc Bình: mạnh mẽ nhưng cần kỷ luật, gặp thử thách nhưng vượt qua được.',
        weak: 'Thất Sát Hãm: hung bạo, gặp tai nạn, bệnh tật, đời sống bất ổn.',
    },
    'Phá Quân': {
        strong: 'Phá Quân Miếu Vượng: phá cũ lập mới thành công, tiên phong khai sáng, biến đổi tích cực.',
        neutral: 'Phá Quân Đắc Bình: nhiều thay đổi nhưng không ổn định, cần kiên nhẫn.',
        weak: 'Phá Quân Hãm: phá hoại, hao tán tài sản, đời sống trắc trở, thay đổi liên tục.',
    },
    // ── Lục Cát Tinh (6 Auspicious Stars with Brightness) ──
    'Văn Xương': {
        strong: 'Văn Xương Miếu Vượng: văn chương lỗi lạc, thi cử đỗ đạt, thanh danh vang xa.',
        neutral: 'Văn Xương Đắc Bình: học vấn trung bình, có bằng cấp nhưng không xuất sắc.',
        weak: 'Văn Xương Hãm: học hành dang dở, giấy tờ sai sót, danh hư hơn thực.',
    },
    'Văn Khúc': {
        strong: 'Văn Khúc Miếu Vượng: tài nghệ xuất chúng, âm nhạc nghệ thuật tinh túy.',
        neutral: 'Văn Khúc Đắc Bình: tài hoa trung bình, đa nghệ nhưng chưa tinh.',
        weak: 'Văn Khúc Hãm: tài nghệ không dùng được, dễ bị lừa gạt bởi giấy tờ.',
    },
    'Tả Phụ': {
        strong: 'Tả Phụ Miếu Vượng: quý nhân đắc lực, được trọng dụng, phò tá hiệu quả.',
        neutral: 'Tả Phụ Đắc Bình: có người giúp nhưng mức độ hạn chế.',
        weak: 'Tả Phụ Hãm: quý nhân xa cách, cộng sự bất tín, khó nhờ cậy.',
    },
    'Hữu Bật': {
        strong: 'Hữu Bật Miếu Vượng: phụ tá đắc lực, dạy dỗ người khác tốt, nhân duyên rộng.',
        neutral: 'Hữu Bật Đắc Bình: có người hỗ trợ nhưng không mạnh mẽ.',
        weak: 'Hữu Bật Hãm: thiếu người giúp, bị cô lập, quan hệ xã hội kém.',
    },
    'Thiên Khôi': {
        strong: 'Thiên Khôi Miếu Vượng: quý nhân bề trên, được đề bạt, danh vọng cao.',
        neutral: 'Thiên Khôi Đắc Bình: có quý nhân nhưng không hiển lộ rõ.',
        weak: 'Thiên Khôi Hãm: quý nhân không đến, tự lực cánh sinh.',
    },
    'Thiên Việt': {
        strong: 'Thiên Việt Miếu Vượng: quý nhân ám trợ, gặp nạn có người giải cứu.',
        neutral: 'Thiên Việt Đắc Bình: có sự may mắn nhỏ, ám trợ không mạnh.',
        weak: 'Thiên Việt Hãm: thiếu may mắn, ít được giúp đỡ ngầm.',
    },
    // ── Lục Sát Tinh (6 Malefic Stars with Brightness) ──
    'Kình Dương': {
        strong: 'Kình Dương Miếu Vượng: dũng mãnh, quả quyết, sát tinh đắc dụng, lập đại công.',
        neutral: 'Kình Dương Đắc Bình: cứng rắn, bướng bỉnh, gây va chạm nhưng có ích.',
        weak: 'Kình Dương Hãm: bạo lực, tai nạn, đổ máu, hành động liều lĩnh.',
    },
    'Đà La': {
        strong: 'Đà La Miếu Vượng: bền bỉ, kiên nhẫn, biến chậm thành sức mạnh.',
        neutral: 'Đà La Đắc Bình: chậm chạp, hay trì hoãn, đường đời quanh co.',
        weak: 'Đà La Hãm: trì trệ, bị kéo lùi, gặp trở ngại liên tục, bệnh mạn tính.',
    },
    'Hỏa Tinh': {
        strong: 'Hỏa Tinh Miếu Vượng: bùng nổ tích cực, hành động nhanh, đột phá bất ngờ.',
        neutral: 'Hỏa Tinh Đắc Bình: nóng nảy, hay gây gổ nhưng quyết đoán.',
        weak: 'Hỏa Tinh Hãm: tai họa bất ngờ, hỏa hoạn, bỏng, nổi giận mất kiểm soát.',
    },
    'Linh Tinh': {
        strong: 'Linh Tinh Miếu Vượng: cháy âm ỉ, bền bỉ, kiên trì đạt mục tiêu.',
        neutral: 'Linh Tinh Đắc Bình: lo lắng ngấm ngầm, áp lực nhưng chịu đựng được.',
        weak: 'Linh Tinh Hãm: hoảng loạn, sợ hãi, bệnh do stress, mất ngủ kéo dài.',
    },
    'Địa Không': {
        strong: 'Địa Không Miếu Vượng: thoát tục, tư duy triết học, sáng tạo đột phá.',
        neutral: 'Địa Không Đắc Bình: mơ hồ, thiếu thực tế, hay ảo tưởng.',
        weak: 'Địa Không Hãm: trống rỗng, mất tất cả, tài sản tiêu tán, bế tắc.',
    },
    'Địa Kiếp': {
        strong: 'Địa Kiếp Miếu Vượng: biến tai họa thành cơ hội, phá cũ xây mới.',
        neutral: 'Địa Kiếp Đắc Bình: bấp bênh, có lúc may lúc rủi.',
        weak: 'Địa Kiếp Hãm: cướp đoạt, mất mát đột ngột, trộm cắp, phá sản.',
    },
};

// ═══════════════════════════════════════════════════════════════════
// 20+ Auxiliary Star Meanings (P2.3: Lục Cát + Lục Sát + Special)
// ═══════════════════════════════════════════════════════════════════
export const AUXILIARY_STAR_MEANINGS: Record<string, string> = {
    // Lục Cát Tinh (6 Auspicious)
    'Văn Xương': 'Văn tinh, chủ về học vấn, thi cử, bằng cấp, sự thanh cao trong ngôn ngữ và văn chương.',
    'Văn Khúc': 'Văn tinh, chủ về tài nghệ, âm nhạc, nghệ thuật. Kết hợp Văn Xương tạo nên học vấn toàn diện.',
    'Tả Phụ': 'Quý tinh phò tá, chủ về sự giúp đỡ từ quý nhân, đồng nghiệp, cộng sự đắc lực.',
    'Hữu Bật': 'Quý tinh phò tá, chủ về sự hỗ trợ âm thầm, nhân duyên tốt, được lòng người.',
    'Thiên Khôi': 'Quý nhân tinh (dương quý), chủ về sự giúp đỡ từ người có quyền lực, cấp trên.',
    'Thiên Việt': 'Quý nhân tinh (âm quý), chủ về sự nâng đỡ từ bề dưới, phụ nữ, hoặc cơ hội ẩn.',

    // Lục Sát Tinh (6 Malefic)
    'Kình Dương': 'Sát tinh cương, mang tính dũng mãnh, nóng nảy, gai góc. Có thể hóa cát khi ở Miếu Vượng.',
    'Đà La': 'Sát tinh nhu, mang tính trì trệ, vướng mắc, kéo dài. Tạo sự chần chừ và trở ngại ngầm.',
    'Hỏa Tinh': 'Sát tinh mãnh liệt, mang tính bạo phát bạo tàn. Gặp Tham Lang tạo cách "Tham Hỏa" quý.',
    'Linh Tinh': 'Sát tinh ngầm, mang tính bất ngờ, hay gặp tai nạn bất ngờ. Hợp Tham Lang cũng tạo cách quý.',
    'Địa Không': 'Không tinh, tượng trưng cho sự trống rỗng, mất mát, nhưng cũng là tư duy đột phá, tôn giáo.',
    'Địa Kiếp': 'Kiếp tinh, tượng trưng cho sự cướp đoạt, tổn thất, nhưng cũng cho sự quyết liệt phi thường.',

    // Special Stars
    'Lộc Tồn': 'Tài lộc tinh, chủ về tiền tài cố định, tích lũy. Đi kèm Kình Dương và Đà La hai bên.',
    'Thiên Mã': 'Dịch mã tinh, chủ về di chuyển, bôn ba, thay đổi. Hợp Lộc Tồn/Hóa Lộc tạo "Lộc Mã Giao Trì".',
    'Đào Hoa': 'Đào hoa tinh, chủ về sắc đẹp, tình duyên, quyến rũ. Ở Miếu là sắc đẹp quý phái.',
    'Hồng Loan': 'Hôn nhân tinh, chủ về vui mừng, tình duyên, lễ cưới. Thường hội ở năm có duyên kết hôn.',
    'Thiên Hỷ': 'Hỷ tinh, chủ về tin vui, có con, sự kiện vui mừng. Thường liên quan đến con cái.',
    'Thai': 'Thai tinh, chủ về sự thai nghén, sinh nở, sáng tạo. Có liên quan đến con cái.',
    'Thiên Hình': 'Hình tinh, chủ về hình phạt, kỷ luật, pháp luật. Kết hợp sát tinh dễ gặp kiện tụng.',
    'Thiên Riêu': 'Đào hoa sát, mang tính nhục dục, tình cảm phức tạp, scandal.',

    // Extended Auxiliary Stars
    'Long Trì': 'Tượng trưng cho rồng, sự quý phái, thanh lịch, trang nhã. Mang lại hỷ sự.',
    'Phượng Các': 'Tượng trưng cho phượng, đài các, cao sang. Kết hợp Long Trì là cách mĩ mãn.',
    'Tam Thai': 'Mang ý nghĩa bệ vệ, có địa vị, phong thái ung dung, nhàn nhã.',
    'Bát Tọa': 'Ghế ngồi quyền quý, tĩnh tại, bình yên, hỗ trợ tăng thêm phong thái đĩnh đạc.',
    'Ân Quang': 'Được Phật độ, ban ơn, gặp may mắn trong những hoàn cảnh khó khăn.',
    'Thiên Quý': 'Quý nhân phò trợ, được ân xá, giải nguy, tính tình trọng hậu.',
    'Cô Thần': 'Sự cô độc, lẻ loi, khắc người thân. Thường biểu hiện người ít chia sẻ, khép kín.',
    'Quả Tú': 'Sự hiu quạnh, góa bú (nghĩa bóng hoặc nghĩa đen). Kỹ tính, độc lập quá mức.',
    'Thiên Khốc': 'Chủ về sự muộn phiền, nước mắt, gào thét. Đắc địa thì lại vang danh.',
    'Thiên Hư': 'Chủ về sự hư hao, không thực chất, mệt mỏi, dở dang.',
    'Đại Hao': 'Chủ về sự hao tán tiền của nhanh chóng. Nếu đắc địa, là người hào sảng, kiếm tiền lớn tiêu tiền lớn.',
    'Tiểu Hao': 'Hao tổn nhỏ lẻ, tiền tài hay bị xài vặt. Đắc địa mang tính tích tiểu thành đại lưu thông tiền bạc.',
    'Đẩu Quân': 'Sao của sự đoan chính, nguyên tắc, đôi khi bảo thủ, khó gần.',
    'Phá Toái': 'Ngang bướng, phá phách, cản trở, gây gián đoạn công việc.',
    'Kiếp Sát': 'Nguy cơ tai nạn bất ngờ, mổ xẻ, thương tích. Cần chú ý cẩn thận.',
    'Quốc Ấn': 'Quyền hành, ấn tín, sự thăng tiến trong chức vụ, công danh.',
    'Đường Phù': 'Sự bệ vệ, phong thái đường bệ, oai phong, thường có lộc về đất đai.',

    // Extended Auxiliary Stars (P1 addition)
    'Thiên Y': 'Y tinh, chủ về chữa bệnh, sức khỏe, dược phẩm. Có khả năng tự chữa lành hoặc giúp người khác chữa bệnh tốt.',
    'Thiên Đức': 'Đức tinh, giảm bớt ảnh hưởng tiêu cực của sát tinh, mang lại lòng nhân từ, đạo đức và sự bảo vệ.',
    'Thiên Phúc': 'Phúc tinh, chủ về may mắn, phúc báo, hỷ sự. Đem lại những cơ hội bất ngờ và sự che chở.',
    'Thiên Tài': 'Tài tinh, chủ về tài năng bẩm sinh, kỹ năng đặc biệt. Thường chỉ người có năng khiếu tự nhiên.',
    'Thiên Thọ': 'Thọ tinh, chủ về tuổi thọ, sức khỏe bền bỉ, trường thọ. Giúp hóa giải tai họa về sức khỏe.',
    'Thiên Không': 'Không tinh (khác Địa Không), mang tính thoát tục, tu hành, tham thiền. Tốt cho tôn giáo, triết học, xấu cho vật chất.',
    'Lưu Hà': 'Sát tinh nhẹ, chủ về vấn đề liên quan đến máu huyết, rượu bia, tai nạn do nước. Cần cẩn thận khi gặp Hỏa/Linh.',

    // Additional stars from traditional guideline
    'Tang Môn': 'Tang tinh, chủ về tang tóc, buồn bã, mất mát. Đắc địa thì biểu hiện sự trưởng thành qua mất mát, biến đau thương thành sức mạnh.',
    'Bạch Hổ': 'Hung tinh mạnh, chủ về đổ máu, phẫu thuật, kiện tụng, tai nạn. Đắc địa có thể hóa cát, mang tính quyết đoán, uy quyền.',
    'Nguyệt Đức': 'Cát tinh, mang tính giải trừ tai họa, giảm hung. Kết hợp Thiên Đức tạo bộ "Thiên Nguyệt Đức" rất quý, gặp dữ hóa lành.',
    'Hoa Cái': 'Chủ về sự cô đơn thanh cao, tài nghệ, nghệ thuật. Có duyên với tôn giáo, tâm linh. Đắc địa thì tài hoa; Hãm thì cô quạnh.',
    'Thái Tuế': 'Quan tinh, chủ về oai quyền, pháp luật, kiện tụng. Đắc địa thì có uy quyền chính đáng; Hãm thì bị kiện cáo, thị phi.',
};
