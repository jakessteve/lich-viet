/**
 * Numerology — Arrow & Missing Number Interpretations
 *
 * Meanings for the 8 Pythagorean birthday grid arrows (present/absent)
 * plus interpretations for missing numbers (1-9).
 */

import type { ArrowInterpretation, MissingNumberMeaning } from './types';

/** Arrow interpretations keyed by arrow ID */
export const ARROW_INTERPRETATIONS: Record<string, ArrowInterpretation> = {
  'row-0': {
    present: 'Mũi tên Trí tuệ (1-2-3): Bạn có tư duy sắc bén, khả năng phân tích logic, và trí nhớ tốt. Bạn học nhanh, xử lý thông tin hiệu quả, và có thiên hướng học thuật. Đây là mũi tên của những nhà nghiên cứu, giáo viên, và nhà tư tưởng — trí tuệ là tài sản lớn nhất của bạn.',
    absent: 'Thiếu mũi tên Trí tuệ (1-2-3): Đây không phải bạn "kém thông minh" — mà là trí tuệ của bạn thiên về kinh nghiệm hơn lý thuyết. Bạn học tốt hơn qua thực hành thay vì sách vở. Lời khuyên: phát triển thói quen đọc sách, ghi chép, và phân tích — bù đắp bằng kỷ luật.',
  },
  'row-1': {
    present: 'Mũi tên Cảm xúc (4-5-6): Bạn có chiều sâu cảm xúc phong phú, khả năng đồng cảm cao, và trực giác mạnh. Bạn hiểu con người ở mức sâu — không chỉ nghe lời nói mà cảm nhận cảm xúc đằng sau. Đây là mũi tên của nghệ sĩ, nhà tư vấn, và nhà chữa lành.',
    absent: 'Thiếu mũi tên Cảm xúc (4-5-6): Bạn có thể gặp khó khăn trong việc biểu đạt cảm xúc hoặc hiểu cảm xúc người khác. Không phải bạn lạnh lùng — bạn chỉ xử lý cảm xúc theo cách khác. Lời khuyên: tập viết nhật ký cảm xúc, học active listening.',
  },
  'row-2': {
    present: 'Mũi tên Hành động (7-8-9): Bạn có năng lượng thực thi mạnh mẽ — ý tưởng trong đầu bạn nhanh chóng biến thành hành động. Bạn không ngồi chờ — bạn làm. Đây là mũi tên của doanh nhân, vận động viên, và người hành động. Kết quả là thước đo duy nhất bạn thừa nhận.',
    absent: 'Thiếu mũi tên Hành động (7-8-9): Bạn có thể gặp khó khăn khi "bắt đầu" — ý tưởng hay nhưng chậm khởi động. Không phải thiếu năng lực — mà thiếu "cú đạp đầu tiên". Lời khuyên: áp dụng quy tắc 5 giây — đếm 5-4-3-2-1 rồi hành động ngay.',
  },
  'col-0': {
    present: 'Mũi tên Ý chí (1-4-7): Bạn có ý chí kiên cường, quyết tâm sắt đá, và khả năng vượt qua mọi trở ngại. Khi đã quyết định, không gì cản nổi bạn. Đây là mũi tên của chiến binh — bạn không bỏ cuộc dù hoàn cảnh khắc nghiệt đến đâu.',
    absent: 'Thiếu mũi tên Ý chí (1-4-7): Bạn có thể thiếu sự kiên trì khi gặp khó khăn — dễ nản và chuyển hướng. Lời khuyên: đặt mục tiêu nhỏ, tạo thành tựu liên tục để xây dựng momentum. Tìm accountability partner.',
  },
  'col-1': {
    present: 'Mũi tên Cân bằng (2-5-8): Bạn có khả năng cân bằng cuộc sống — giữa lý trí và cảm xúc, vật chất và tinh thần, công việc và gia đình. Đây là mũi tên quý giá cho sức khỏe tinh thần. Bạn ít bị "cực đoan" — biết khi nào dừng, khi nào tiến.',
    absent: 'Thiếu mũi tên Cân bằng (2-5-8): Cuộc sống bạn có xu hướng "lắc" giữa các cực đoan — quá nhiều hoặc quá ít. Lời khuyên: tạo routine cố định, tập thiền chánh niệm, và thường xuyên "check in" với bản thân.',
  },
  'col-2': {
    present: 'Mũi tên Hoạt động (3-6-9): Bạn năng động, xã hội hóa tốt, và luôn bận rộn với nhiều hoạt động. Đây là mũi tên của người "luôn di chuyển" — networking, sự kiện, dự án — bạn tham gia tất cả. Năng lượng dồi dào và khả năng maintain nhiều mối quan hệ.',
    absent: 'Thiếu mũi tên Hoạt động (3-6-9): Bạn có thể thiên về nội tâm — ít hoạt động xã hội, thích ở nhà hơn ra ngoài. Không phải vấn đề — nhưng cần đảm bảo không trở thành cô lập. Lời khuyên: đặt "social date" cố định mỗi tuần.',
  },
  'diag-0': {
    present: 'Mũi tên Quyết tâm (1-5-9): Bạn có sự quyết tâm theo đuổi mục tiêu lớn — không chỉ công việc mà cả lý tưởng sống. Đây là mũi tên mạnh nhất — kết hợp ý chí (1), cân bằng (5), và tầm nhìn (9). Bạn biết mình muốn gì và có đủ bản lĩnh để đạt được.',
    absent: 'Thiếu mũi tên Quyết tâm (1-5-9): Bạn có thể thiếu định hướng rõ ràng — biết mình CÓ THỂ nhưng không chắc mình MUỐN gì. Lời khuyên: dùng vision board, viết mục tiêu 5 năm, và review hàng quý.',
  },
  'diag-1': {
    present: 'Mũi tên Tâm linh (3-5-7): Bạn có kết nối tâm linh tự nhiên — trực giác mạnh, nhạy cảm với năng lượng, và thiên hướng triết học. Đây là mũi tên của người "nhìn xa hơn mắt thường" — bạn cảm nhận thế giới ở mức mà logic không chạm tới.',
    absent: 'Thiếu mũi tên Tâm linh (3-5-7): Bạn thiên về thực tế, logic — việc kết nối với khía cạnh tâm linh cần nỗ lực có ý thức. Không phải bạn "không có tâm linh" — chỉ là kênh này cần được mở. Lời khuyên: thử thiền, yoga, hoặc đơn giản — dành thời gian trong thiên nhiên im lặng.',
  },
};

/** Missing number interpretations */
export const MISSING_NUMBER_MEANINGS: Record<number, MissingNumberMeaning> = {
  1: {
    meaning: 'Thiếu số 1 cho thấy bạn có thể thiếu tự tin, khó đứng lên cho bản thân, và hay phụ thuộc vào ý kiến người khác. Bạn có xu hướng tránh vị trí lãnh đạo và ngại ra quyết định một mình.',
    advice: 'Tập nói "Tôi muốn..." mỗi ngày. Bắt đầu với quyết định nhỏ — chọn nhà hàng, chọn phim — để xây dựng "cơ bắp quyết đoán" dần dần.',
  },
  2: {
    meaning: 'Thiếu số 2 cho thấy bạn có thể thiếu nhạy cảm với cảm xúc người khác, gặp khó khăn trong hợp tác, và không đọc được "không khí" trong phòng. Kiên nhẫn không phải thế mạnh.',
    advice: 'Thực hành lắng nghe chủ động — đừng nghĩ câu trả lời khi người khác đang nói. Hỏi "Bạn cảm thấy thế nào?" thường xuyên hơn.',
  },
  3: {
    meaning: 'Thiếu số 3 cho thấy bạn có thể gặp khó khăn trong biểu đạt — viết, nói, hoặc thể hiện sáng tạo. Cảm xúc bị "đóng gói" bên trong, khó tìm cách bày tỏ phù hợp.',
    advice: 'Viết nhật ký tự do (free writing) — 10 phút không dừng, không sửa, chỉ viết. Thử một hình thức nghệ thuật mới mỗi tháng.',
  },
  4: {
    meaning: 'Thiếu số 4 cho thấy bạn có thể thiếu kỷ luật, khó duy trì routine, và dễ bỏ dở. Tổ chức và sắp xếp không phải bản năng, công việc có thể bị trì hoãn thường xuyên.',
    advice: 'Bắt đầu với 1 thói quen nhỏ duy nhất — và giữ nó 30 ngày. Dùng app quản lý công việc. "Done is better than perfect."',
  },
  5: {
    meaning: 'Thiếu số 5 cho thấy bạn có thể sợ thay đổi, thiếu linh hoạt, và hay bám víu vào vùng an toàn. Cuộc sống có thể cảm thấy "đơn điệu" nhưng bạn ngại bước ra.',
    advice: 'Mỗi tuần, thử MỘT điều mới — quán mới, đường đi mới, sở thích mới. Nhỏ thôi, nhưng đều đặn "cơ bắp thay đổi" sẽ mạnh dần.',
  },
  6: {
    meaning: 'Thiếu số 6 cho thấy bạn có thể gặp khó khăn trong cam kết gia đình, trách nhiệm với cộng đồng, hoặc khó thể hiện tình yêu thương qua hành động. Thiếu ý thức về nghĩa vụ.',
    advice: 'Tình nguyện giúp đỡ 1 người mỗi tuần. Gọi điện cho gia đình — đừng đợi dịp đặc biệt. Tạo "rituals" gia đình nhỏ.',
  },
  7: {
    meaning: 'Thiếu số 7 cho thấy bạn có thể thiếu kiên nhẫn với suy nghĩ sâu, ngại nghi vấn bản thân, và chấp nhận mọi thứ at face value mà không phân tích. Thiếu kết nối tâm linh.',
    advice: 'Đọc 1 cuốn sách triết học/tâm linh mỗi tháng. Dành 15 phút mỗi ngày trong im lặng — không phone, không nhạc, chỉ suy nghĩ.',
  },
  8: {
    meaning: 'Thiếu số 8 cho thấy bạn có thể gặp khó khăn với tài chính, thiếu tham vọng vật chất, hoặc ngại quyền lực. Quản lý tiền không phải thế mạnh, dễ tránh né topic tài chính.',
    advice: 'Học financial literacy — đọc 1 cuốn về quản lý tài chính cá nhân. Thiết lập ngân sách tháng. "Tiền không phải mục tiêu, nhưng là công cụ cần thiết."',
  },
  9: {
    meaning: 'Thiếu số 9 cho thấy bạn có thể thiếu lòng nhân đạo rộng lớn, khó buông bỏ, và tập trung vào bản thân nhiều hơn cộng đồng. Thiếu tầm nhìn "big picture" cho nhân loại.',
    advice: 'Tình nguyện cho tổ chức từ thiện. Dọn tủ đồ và quyên góp thường xuyên. "Cho đi là cách nhận lại tốt nhất."',
  },
};
