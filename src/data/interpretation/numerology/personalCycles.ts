/**
 * Numerology — Enriched Personal Cycle Interpretations
 *
 * Rich Personal Year (9 × multi-paragraph) and Personal Month (9 × detailed) data.
 * Replaces the 1-sentence originals in numerologyEngine.ts.
 */

import type { PersonalYearMeaning, PersonalMonthMeaning } from './types';

export const PERSONAL_YEAR_MEANINGS: Record<number, PersonalYearMeaning> = {
  1: {
    theme: 'Năm Khởi Đầu Mới — Đặt Nền Móng. Đây là năm đầu tiên của chu kỳ 9 năm — mọi thứ bạn bắt đầu trong năm nay sẽ định hình 8 năm tiếp theo. Năng lượng của "trang trắng" mạnh mẽ: ý tưởng mới, dự án mới, mối quan hệ mới. Vũ trụ mở cửa cho sự khởi đầu — nhưng BẠN phải bước qua.',
    focus: 'Hãy tập trung vào: ra quyết định quan trọng (chuyển việc, khởi nghiệp, bắt đầu mối quan hệ mới), đặt mục tiêu dài hạn, và hành động dũng cảm. Đây là năm "gieo hạt" — chất lượng hạt giống quyết định vụ mùa.',
    avoid: 'Tránh: do dự kéo dài, dựa dẫm vào người khác, và sống theo quán tính cũ. Đây KHÔNG phải năm để "chờ xem" — mỗi tháng chần chừ là một cơ hội bỏ lỡ.',
    opportunities: 'Cơ hội đặc biệt: khởi nghiệp, thăng tiến, bắt đầu học một kỹ năng mới, bước vào mối quan hệ có ý nghĩa. Tháng 1, 5, 9 là những tháng mạnh nhất cho khởi đầu.',
    relationships: 'Trong tình cảm, đây là năm tốt để bắt đầu mối quan hệ mới hoặc "reset" mối quan hệ hiện tại. Nếu đang trong quan hệ, hãy cùng nhau đặt mục tiêu chung cho giai đoạn mới.',
  },
  2: {
    theme: 'Năm Hợp Tác & Kiên Nhẫn — Thu Thập Đồng Minh. Sau năng lượng xông pha của Năm 1, bây giờ là lúc chậm lại, lắng nghe, và xây dựng quan hệ. Đây không phải năm "ép" mọi thứ — mà năm để mọi thứ tự nhiên phát triển. Kiên nhẫn là siêu năng lực của bạn trong năm nay.',
    focus: 'Tập trung vào: mối quan hệ (tình yêu, bạn bè, đối tác kinh doanh), chi tiết nhỏ mà năm 1 bỏ sót, và phát triển trực giác. Lắng nghe nhiều hơn nói.',
    avoid: 'Tránh: ép buộc kết quả, tranh giành vị trí, và mất kiên nhẫn với quá trình chậm. Năm 2 giống như mùa xuân — hạt giống đang nảy mầm dưới đất, chưa thấy kết quả không có nghĩa là thất bại.',
    opportunities: 'Cơ hội: hợp tác kinh doanh, deepening relationships, phát triển kỹ năng soft skills. Mối quan hệ tốt đẹp bạn xây trong năm nay sẽ hỗ trợ bạn suốt chu kỳ.',
    relationships: 'Năm vàng cho tình yêu — mối quan hệ hiện tại có cơ hội sâu đậm hơn. Nếu Single, hãy mở lòng — bạn đời tiềm năng có thể đến theo cách bất ngờ, nhẹ nhàng.',
  },
  3: {
    theme: 'Năm Sáng Tạo & Biểu Đạt — Tỏa Sáng. Năng lượng như khu vườn nở rộ! Đây là năm vui nhất trong chu kỳ — sáng tạo, giao tiếp, và thể hiện bản thân là "nhiên liệu" chính. Bạn cảm thấy nhẹ nhàng, lạc quan, và đầy cảm hứng.',
    focus: 'Tập trung vào: sáng tạo (viết, vẽ, nhạc, thiết kế), networking, marketing bản thân, và tận hưởng cuộc sống. Show the world who you are!',
    avoid: 'Tránh: phân tán quá nhiều dự án, chi tiêu quá mức cho niềm vui, và trốn tránh trách nhiệm bằng lý do "đang sáng tạo".',
    opportunities: 'Cơ hội: ra mắt sản phẩm, public speaking, content creation, mở rộng mạng lưới xã hội. Năng lượng thu hút cao — hãy tận dụng!',
    relationships: 'Năm vui vẻ cho tình yêu — nhiều hoạt động xã hội, gặp gỡ, và romance. Nhưng cẩn thận "hời hợt" — đừng chỉ vui bề mặt mà quên chiều sâu.',
  },
  4: {
    theme: 'Năm Xây Dựng & Kỷ Luật — Đặt Nền Móng. Sau năm 3 vui vẻ, bây giờ phải "xuống đất" và làm việc thật sự. Đây là năm khó nhất nhưng quan trọng nhất — nền tảng bạn xây ngay đây sẽ giữ vững bạn cho 5 năm tiếp theo.',
    focus: 'Tập trung vào: kỷ luật, routine, sức khỏe, tài chính, và hoàn thành những việc đang dang dở. Xây hệ thống thay vì chạy theo cảm hứng.',
    avoid: 'Tránh: lười biếng, cut corners, và bỏ qua sức khỏe. Năm 4 không forgiving — thứ gì yếu sẽ bị lộ.',
    opportunities: 'Cơ hội: mua nhà/đầu tư dài hạn, xây dựng business system, phát triển chuyên môn. Nỗ lực năm nay sẽ trả cổ tức trong nhiều năm.',
    relationships: 'Tình yêu cần "làm việc" — không phải romance mà là commitment thật sự. Nếu relationship vượt qua năm 4, nó sẽ rất bền. Nếu không — nó đáng kết thúc.',
  },
  5: {
    theme: 'Năm Thay Đổi & Tự Do — Phá Rào. Nửa chặng đường chu kỳ 9 năm — và vũ trụ lay bạn dậy! Cuộc sống trở nên năng động, bất ngờ, đôi khi hỗn loạn. Thay đổi KHÔNG tránh được — câu hỏi là bạn sẽ là nạn nhân hay captain.',
    focus: 'Tập trung vào: đón nhận thay đổi, thử nghiệm mới, du lịch, học hỏi, và bước ra comfort zone. Flexibility là siêu năng lực.',
    avoid: 'Tránh: bám víu vào cũ, kháng cự thay đổi, và quyết định bốc đồng (tự do ≠ bất cẩn). Excesses nguy hiểm nhất trong năm này.',
    opportunities: 'Cơ hội: chuyển nghề/chuyển nhà, du lịch mở mang tầm nhìn, khám phá lĩnh vực hoàn toàn mới. Nắm bắt unexpected opportunities!',
    relationships: 'Năm "rung lắc" cho tình yêu — mối quan hệ yếu có thể kết thúc, mới có thể bắt đầu. Nếu đang ổn, thêm "mới mẻ" (du lịch cùng nhau, thử hobby mới) để giữ lửa.',
  },
  6: {
    theme: 'Năm Gia Đình & Trách Nhiệm — Về Nhà. Sau cơn lốc của Năm 5, bây giờ là lúc về nhà — cả nghĩa đen lẫn nghĩa bóng. Năm 6 xoay quanh gia đình, tình yêu, trách nhiệm cộng đồng. Đây là năm "nuôi dưỡng" — chăm sóc người thân và cho phép mình được chăm sóc.',
    focus: 'Tập trung vào: gia đình, sửa sang nhà cửa, mối quan hệ tình cảm, sức khỏe gia đình, và đóng góp cộng đồng.',
    avoid: 'Tránh: hy sinh quá mức, kiểm soát người thân dưới danh nghĩa "lo lắng", và bỏ bê bản thân vì lo cho mọi người.',
    opportunities: 'Cơ hội: kết hôn, có con, mua nhà, hàn gắn gia đình, volunteer. Năm tốt cho mọi quyết định liên quan đến "tổ ấm".',
    relationships: 'Năm mạnh nhất cho tình yêu — commitment, kết hôn, hoặc deepening. Nếu single, khả năng gặp "người phù hợp" cao — qua gia đình/bạn chung.',
  },
  7: {
    theme: 'Năm Nội Tâm & Tâm Linh — Nghỉ Ngơi Sâu. Năm 7 là "sabbatical" của vũ trụ — thời gian suy ngẫm, nghiên cứu, và kết nối nội tâm. Năng lượng hướng nội mạnh — bạn cần thời gian một mình, im lặng, và chiều sâu. Đây không phải năm "ra ngoài" — mà năm "đi vào trong".',
    focus: 'Tập trung vào: phát triển bản thân, đọc sách, thiền, nghiên cứu, học những gì thật sự hấp dẫn. Quality over quantity ở mọi lĩnh vực.',
    avoid: 'Tránh: social events quá nhiều, quyết định tài chính lớn (không phải năm tốt cho đầu tư mạo hiểm), và ép bản thân "vui vẻ" khi cần im lặng.',
    opportunities: 'Cơ hội: học bằng cấp, viết sách, nghiên cứu sâu, phát triển tâm linh, self-mastery. Insight đến trong năm này sẽ hướng dẫn 2-3 năm tiếp.',
    relationships: 'Tình yêu cần không gian — đối phương cần hiểu bạn cần thời gian riêng. Nếu single, không ép — người đúng sẽ đến khi bạn sẵn sàng ở mức sâu.',
  },
  8: {
    theme: 'Năm Thu Hoạch & Quyền Lực — Hái Quả. Đây là năm quyền lực của chu kỳ! Mọi nỗ lực 7 năm trước bắt đầu trả cổ tức. Tiền bạc, sự nghiệp, vị trí — tất cả có tiềm năng bùng nổ. Nhưng karma cũng clear — nếu 7 năm trước bạn "gieo gió", năm 8 sẽ "gặt bão".',
    focus: 'Tập trung vào: chiến lược tài chính, thăng tiến, đầu tư, mở rộng business, và thương lượng. Đây là năm "đòi" những gì bạn xứng đáng.',
    avoid: 'Tránh: tham lam, lạm dụng quyền lực, bỏ bê sức khỏe vì chạy theo thành tích, và quên mối quan hệ vì "busy".',
    opportunities: 'Cơ hội: thăng tiến lớn, tăng thu nhập đáng kể, đầu tư sinh lời, ra mắt sản phẩm/dịch vụ, vị trí lãnh đạo. Nắm bắt — năm 8 không đến thường xuyên!',
    relationships: 'Tình yêu = power couple vibes. Nếu đã ổn, đây là năm cùng nhau đạt thành tựu. Cẩn thận: đừng để sự nghiệp "nuốt" thời gian cho nhau.',
  },
  9: {
    theme: 'Năm Kết Thúc & Buông Bỏ — Hoàn Thành. Năm cuối cùng của chu kỳ — thời gian dọn dẹp, buông bỏ, và chuẩn bị cho khởi đầu mới. Những gì không còn phục vụ bạn sẽ tự nhiên rời đi — mối quan hệ, công việc, thói quen. Đừng bám víu — hãy tha thứ, cho đi, và mở không gian cho cái mới.',
    focus: 'Tập trung vào: hoàn thành dự án dang dở, dọn dẹp (nhà, tủ đồ, mối quan hệ), tha thứ, từ thiện, và reflection. Viết "trang cuối" đẹp cho chương này.',
    avoid: 'Tránh: bắt đầu dự án mới lớn (chờ Năm 1), bám víu vào quá khứ, và chống lại sự kết thúc tự nhiên. "Mặt trời lặn để mai mọc lại."',
    opportunities: 'Cơ hội: đóng góp cộng đồng, sáng tạo nghệ thuật, du lịch farewell, xuất bản/ra mắt tác phẩm hoàn thành. Năm tốt cho philanthropy.',
    relationships: 'Tha thứ là chủ đề — cho người khác và cho chính mình. Mối quan hệ đã hết duyên sẽ kết thúc tự nhiên. Đừng buồn — nó tạo không gian cho tình yêu mới ở Năm 1.',
  },
};

export const PERSONAL_MONTH_MEANINGS: Record<number, PersonalMonthMeaning> = {
  1: { theme: 'Tháng Khởi Đầu', advice: 'Bắt đầu dự án mới, ra quyết định quan trọng, đặt mục tiêu cho những tháng tiếp theo. Hành động dũng cảm — đừng chần chừ. Năng lượng tiên phong mạnh mẽ.' },
  2: { theme: 'Tháng Hợp Tác', advice: 'Kiên nhẫn và lắng nghe. Xây dựng quan hệ, tìm đồng minh, và chú ý chi tiết. Đừng ép kết quả — mọi thứ đang phát triển theo tốc độ riêng.' },
  3: { theme: 'Tháng Sáng Tạo', advice: 'Biểu đạt, giao tiếp, networking. Tận hưởng cuộc sống và thể hiện bản thân. Viết, nói, sáng tạo — năng lượng nghệ thuật dồi dào.' },
  4: { theme: 'Tháng Xây Dựng', advice: 'Tập trung công việc, kỷ luật, hoàn thành deadline. Sửa chữa, tổ chức, và đặt nền tảng. Tháng "làm việc thật" — không glamorous nhưng quan trọng.' },
  5: { theme: 'Tháng Thay Đổi', advice: 'Linh hoạt và đón nhận bất ngờ. Du lịch, trải nghiệm mới, gặp người mới. Sự thay đổi có thể bất ngờ — surf the wave thay vì chống lại.' },
  6: { theme: 'Tháng Gia Đình', advice: 'Chăm sóc gia đình, home improvement, mối quan hệ tình cảm. Trách nhiệm tăng nhưng cũng vậy là tình yêu. Đừng quên chăm sóc bản thân.' },
  7: { theme: 'Tháng Nội Tâm', advice: 'Nghỉ ngơi, suy ngẫm, đọc sách, thiền. Ít social events, nhiều alone time. Trực giác mạnh — lắng nghe tiếng nói bên trong. Đây là tháng "nạp năng lượng".' },
  8: { theme: 'Tháng Tài Chính', advice: 'Ra quyết định tài chính, thương lượng, đòi tăng lương. Năng lượng quyền lực mạnh — dùng nó cho mục đích tốt. Tháng tốt cho đầu tư và business move.' },
  9: { theme: 'Tháng Hoàn Thành', advice: 'Kết thúc dự án, dọn dẹp, cho đi. Tha thứ và buông bỏ. Đừng bắt đầu mới — hoàn thành cũ. Chuẩn bị tinh thần và không gian cho tháng 1 tiếp theo.' },
};
