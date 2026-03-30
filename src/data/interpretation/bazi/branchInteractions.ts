/**
 * Branch Interaction Analysis (Hình, Xung, Phá, Hại, Hợp)
 * Comprehensive interpretation data for earthly branch interactions in a Bát Tự chart.
 */

export interface BranchInteraction {
  type: 'Lục Hợp' | 'Tam Hợp' | 'Lục Xung' | 'Lục Hại' | 'Hình';
  branches: string[];
  element?: string;
  nature: 'cat' | 'hung' | 'trung';
  keyword: string;
  meaning: string;
  pillarContext: string;
  advice: string;
}

// Lục Hợp (Six Harmonies)
export const LUC_HOP: BranchInteraction[] = [
  { type: 'Lục Hợp', branches: ['Tý', 'Sửu'], element: 'Thổ', nature: 'cat', keyword: 'Hợp Thổ — Nền tảng vững chắc', meaning: 'Sự kết hợp giữa Thủy (Tý) và Thổ (Sửu) tạo nên nền tảng ổn định. Tượng trưng cho sự kiên nhẫn, tích lũy, và phát triển từ gốc rễ.', pillarContext: 'Nếu nằm ở trụ Năm-Tháng: gia đình gốc ổn định. Trụ Ngày-Giờ: hôn nhân bền vững, con cái hiếu thảo.', advice: 'Đầu tư vào bất động sản, giáo dục, mối quan hệ lâu dài.' },
  { type: 'Lục Hợp', branches: ['Dần', 'Hợi'], element: 'Mộc', nature: 'cat', keyword: 'Hợp Mộc — Sinh trưởng mạnh mẽ', meaning: 'Mộc (Dần) gặp Thủy (Hợi) — Thủy sinh Mộc, tạo nên sức sống bùng nổ. Tượng trưng cho sự phát triển nhanh, cơ hội mới, và năng lượng tràn đầy.', pillarContext: 'Trụ Năm-Tháng: sự nghiệp phát triển từ sớm. Trụ Ngày-Giờ: hôn nhân đầy sinh lực.', advice: 'Khởi nghiệp, mở rộng, đầu tư vào bản thân.' },
  { type: 'Lục Hợp', branches: ['Mão', 'Tuất'], element: 'Hỏa', nature: 'cat', keyword: 'Hợp Hỏa — Đam mê sáng tạo', meaning: 'Mộc (Mão) + Thổ (Tuất) hóa Hỏa — đam mê và sáng tạo bùng cháy. Tượng trưng cho nghệ thuật, biểu diễn, và danh tiếng.', pillarContext: 'Trụ Năm-Tháng: gia đình có truyền thống nghệ thuật. Trụ Ngày-Giờ: đời sống tình cảm nồng nhiệt.', advice: 'Phát triển năng khiếu sáng tạo, nghệ thuật, truyền thông.' },
  { type: 'Lục Hợp', branches: ['Thìn', 'Dậu'], element: 'Kim', nature: 'cat', keyword: 'Hợp Kim — Quyết đoán hiệu quả', meaning: 'Thổ (Thìn) + Kim (Dậu) — Thổ sinh Kim, tạo nên sự sắc bén và quyết đoán. Tượng trưng cho lãnh đạo, tài chính, và hiệu suất cao.', pillarContext: 'Trụ Năm-Tháng: gia đình có truyền thống kinh doanh. Trụ Ngày-Giờ: bạn đời giỏi quản lý tài chính.', advice: 'Quản lý tài chính, đầu tư Kim loại quý, phát triển kỹ năng phân tích.' },
  { type: 'Lục Hợp', branches: ['Tỵ', 'Thân'], element: 'Thủy', nature: 'trung', keyword: 'Hợp Thủy — Linh hoạt thích nghi', meaning: 'Hỏa (Tỵ) + Kim (Thân) hóa Thủy — nước chảy linh hoạt. Nhưng Hỏa-Kim vốn xung khắc, nên hợp này có vẻ ngoài hòa bình nhưng bên trong bất an.', pillarContext: 'Trụ Năm-Tháng: gia đình bề ngoài hòa thuận nhưng nội bộ có mâu thuẫn ngầm. Trụ Ngày-Giờ: hôn nhân cần nỗ lực duy trì.', advice: 'Sử dụng trí tuệ cảm xúc, giao tiếp mở, giải quyết mâu thuẫn sớm.' },
  { type: 'Lục Hợp', branches: ['Ngọ', 'Mùi'], element: 'Hỏa/Thổ', nature: 'cat', keyword: 'Hợp Thổ — Ấm áp chân thành', meaning: 'Hỏa (Ngọ) + Thổ (Mùi) — sự kết hợp ấm áp, chân thành. Năng lượng nuôi dưỡng mạnh mẽ, tốt cho gia đình và mối quan hệ.', pillarContext: 'Trụ Năm-Tháng: tuổi thơ hạnh phúc, gia đình yêu thương. Trụ Ngày-Giờ: hôn nhân hạnh phúc, con cái ngoan.', advice: 'Xây dựng gia đình, nuôi dạy con cái, chăm sóc sức khỏe gia đình.' },
];

// Lục Xung (Six Clashes) 
export const LUC_XUNG: BranchInteraction[] = [
  { type: 'Lục Xung', branches: ['Tý', 'Ngọ'], element: 'Thủy-Hỏa', nature: 'hung', keyword: 'Xung Tý-Ngọ — Nước lửa xung đột', meaning: 'Thủy (Tý) xung Hỏa (Ngọ) — đối lập hoàn toàn, năng lượng va chạm mạnh. Cảm xúc và lý trí xung đột, tình hình thay đổi đột ngột, di chuyển liên tục.', pillarContext: 'Giữa trụ Năm và Tháng: xung đột gia đình gốc. Trụ Ngày và Giờ: mâu thuẫn vợ chồng hoặc cha mẹ-con cái.', advice: 'Cân bằng cảm xúc, tránh quyết định khi nóng giận. Tìm hoạt động xả stress.' },
  { type: 'Lục Xung', branches: ['Sửu', 'Mùi'], element: 'Thổ-Thổ', nature: 'trung', keyword: 'Xung Sửu-Mùi — Đất chống đất', meaning: 'Cùng Thổ nhưng đối xung — mâu thuẫn giữa hai lập trường cứng đầu. Không bạo liệt như Tý-Ngọ nhưng dai dẳng, khó giải quyết. Liên quan đến bất động sản, gia đình.', pillarContext: 'Trụ Năm-Tháng: xung đột gia đình vì đất đai, tài sản. Trụ Ngày-Giờ: vợ chồng cùng cứng, không ai nhượng bộ.', advice: 'Học cách nhượng bộ, tìm trung gian hòa giải. Cẩn thận với giao dịch bất động sản.' },
  { type: 'Lục Xung', branches: ['Dần', 'Thân'], element: 'Mộc-Kim', nature: 'hung', keyword: 'Xung Dần-Thân — Đấu tranh quyền lực', meaning: 'Mộc (Dần) xung Kim (Thân) — hai thế lực mạnh đối đầu, như hai vị tướng chiến đấu. Xung đột nghiêm trọng, cạnh tranh khốc liệt, thay đổi lớn.', pillarContext: 'Trụ Năm-Tháng: di chuyển nhiều thời thơ ấu, gia đình bất ổn. Trụ Ngày-Giờ: hôn nhân nhiều sóng gió.', advice: 'Chuyển xung đột thành động lực cạnh tranh lành mạnh. Nghề nghiệp cần thử thách: kinh doanh, thể thao.' },
  { type: 'Lục Xung', branches: ['Mão', 'Dậu'], element: 'Mộc-Kim', nature: 'hung', keyword: 'Xung Mão-Dậu — Gãy đổ và tái tạo', meaning: 'Mộc (Mão) bị Kim (Dậu) chặt — sự gãy đổ đau đớn nhưng cần thiết. Quan hệ tan vỡ, kết thúc để bắt đầu lại. Liên quan đến phẫu thuật, cắt bỏ.', pillarContext: 'Trụ Năm-Tháng: thay đổi lớn thời thơ ấu. Trụ Ngày-Giờ: phẫu thuật, ly hôn, hoặc biến cố tình cảm.', advice: 'Chấp nhận kết thúc cần thiết, nhìn về phía trước. Tốt cho ngành phẫu thuật, tái cấu trúc.' },
  { type: 'Lục Xung', branches: ['Thìn', 'Tuất'], element: 'Thổ-Thổ', nature: 'trung', keyword: 'Xung Thìn-Tuất — Mở kho tàng', meaning: 'Hai "kho" (Thổ Khố) va vào nhau, nội dung bên trong bung ra. Bí mật bị lộ, tài sản ẩn giấu xuất hiện. Có thể cát nếu mở kho tốt, hung nếu mở kho xấu.', pillarContext: 'Trụ Năm-Tháng: gia đình có bí mật, tài sản ẩn. Trụ Ngày-Giờ: bạn đời có bí mật riêng.', advice: 'Chuẩn bị cho sự bất ngờ. Có thể tìm được cơ hội ẩn hoặc vấn đề bị giấu lâu nay.' },
  { type: 'Lục Xung', branches: ['Tỵ', 'Hợi'], element: 'Hỏa-Thủy', nature: 'hung', keyword: 'Xung Tỵ-Hợi — Trí tuệ vs. Bản năng', meaning: 'Hỏa (Tỵ) xung Thủy (Hợi) — xung đột giữa lý trí và bản năng, giữa tham vọng và thực tế. Di chuyển nhiều, thay đổi liên tục, khó ổn định.', pillarContext: 'Trụ Năm-Tháng: thiếu ổn định tuổi thơ, hay di chuyển. Trụ Ngày-Giờ: hôn nhân biến động, vợ chồng thường xa nhau.', advice: 'Tìm cách cân bằng giữa lý trí và cảm xúc. Nghề nghiệp di chuyển nhiều sẽ phù hợp.' },
];

// Tam Hợp (Three Harmonies)
export const TAM_HOP: BranchInteraction[] = [
  { type: 'Tam Hợp', branches: ['Thân', 'Tý', 'Thìn'], element: 'Thủy', nature: 'cat', keyword: 'Tam Hợp Thủy — Trí tuệ linh hoạt', meaning: 'Ba chi hóa thành Thủy cục — trí tuệ, linh hoạt, và khả năng thích ứng tuyệt vời. Người có Tam Hợp Thủy trong tứ trụ thông minh, nhanh nhẹn, giỏi giao tiếp và đàm phán.', pillarContext: 'Nếu đầy đủ 3 chi trong tứ trụ: tài năng xuất chúng về trí tuệ, giỏi kinh doanh, ngoại giao.', advice: 'Phát huy trí tuệ, theo đuổi ngành yêu cầu suy nghĩ nhanh: thương mại, ngoại giao, công nghệ.' },
  { type: 'Tam Hợp', branches: ['Hợi', 'Mão', 'Mùi'], element: 'Mộc', nature: 'cat', keyword: 'Tam Hợp Mộc — Nhân hậu phát triển', meaning: 'Ba chi hóa thành Mộc cục — lòng nhân ái, sự phát triển, và sức sống mãnh liệt. Người có Tam Hợp Mộc tràn đầy sinh lực, nhân hậu, yêu thiên nhiên, giỏi nuôi dưỡng.', pillarContext: 'Nếu đầy đủ 3 chi: phát triển bền vững, nhiều quý nhân, gia đình đông đúc.', advice: 'Theo đuổi ngành giáo dục, y tế, nông nghiệp, môi trường. Đầu tư vào sức khỏe và gia đình.' },
  { type: 'Tam Hợp', branches: ['Dần', 'Ngọ', 'Tuất'], element: 'Hỏa', nature: 'cat', keyword: 'Tam Hợp Hỏa — Nhiệt huyết lãnh đạo', meaning: 'Ba chi hóa thành Hỏa cục — nhiệt huyết, lãnh đạo, và danh tiếng. Người có Tam Hợp Hỏa mạnh mẽ, quyết đoán, có sức ảnh hưởng lớn, dễ nổi tiếng.', pillarContext: 'Nếu đầy đủ 3 chi: sự nghiệp rực rỡ, danh tiếng vang xa, lãnh đạo bẩm sinh.', advice: 'Theo đuổi vị trí lãnh đạo, truyền thông, nghệ thuật biểu diễn. Cẩn thận tính nóng nảy.' },
  { type: 'Tam Hợp', branches: ['Tỵ', 'Dậu', 'Sửu'], element: 'Kim', nature: 'cat', keyword: 'Tam Hợp Kim — Chính xác hiệu quả', meaning: 'Ba chi hóa thành Kim cục — sự chính xác, kỷ luật, và hiệu quả. Người có Tam Hợp Kim nguyên tắc, có tổ chức, giỏi quản lý và tối ưu hóa.', pillarContext: 'Nếu đầy đủ 3 chi: sự nghiệp quản lý, tài chính, pháp luật thành công.', advice: 'Theo đuổi ngành tài chính, luật, kỹ thuật, quản trị. Cẩn thận tính cứng nhắc quá mức.' },
];
