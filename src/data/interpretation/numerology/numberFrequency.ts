/**
 * Numerology — Number Frequency Interpretations
 *
 * When a number appears multiple times in the birthday grid,
 * the energy is amplified. ×1 is standard, ×2 is amplified,
 * ×3 is overwhelming, ×4+ is extreme.
 */

import type { FrequencyMeaning } from './types';

export const NUMBER_FREQUENCY: Record<number, FrequencyMeaning> = {
  1: {
    x1: 'Sự tự tin và khả năng lãnh đạo ở mức chuẩn — bạn có thể tự lập và ra quyết định khi cần, nhưng không bị ám ảnh bởi quyền lực.',
    x2: 'Tự tin được khuếch đại — bạn có sức hút lãnh đạo mạnh hơn bình thường. Quyết đoán, dứt khoát, đôi khi cứng đầu. Học cách lắng nghe là bài học quan trọng.',
    x3: 'Năng lượng lãnh đạo áp đảo — bạn có thể trở nên quá chi phối, khó chấp nhận ý kiến khác. Ego quá mạnh có thể phá hủy mối quan hệ. Cần sự khiêm tốn có ý thức.',
    x4plus: 'Năng lượng số 1 cực đoan — tiềm năng lãnh đạo phi thường nhưng đi kèm nguy cơ otoriter. Sự tự tin mạnh đến mức bạn có thể vô tình cô lập mọi người xung quanh. Thiền định và empathy training là bắt buộc.',
  },
  2: {
    x1: 'Nhạy cảm và hợp tác ở mức chuẩn — bạn đọc được không khí và làm việc nhóm tốt.',
    x2: 'Trực giác và nhạy cảm tăng cường — bạn cảm nhận cảm xúc người khác rõ ràng, có thể excellent trong tư vấn. Nhưng cũng dễ bị overwhelm bởi cảm xúc.',
    x3: 'Nhạy cảm quá mức — bạn "hấp thụ" cảm xúc xung quanh như miếng bọt biển. Dễ bị thao túng cảm xúc. Cần boundaries và self-care mạnh.',
    x4plus: 'Cực kỳ nhạy cảm — gần như psychic trong việc đọc người khác, nhưng đồng thời rất dễ tổn thương. Cần bảo vệ năng lượng nghiêm ngặt.',
  },
  3: {
    x1: 'Sáng tạo và giao tiếp ở mức chuẩn — bạn biểu đạt rõ ràng và có xu hướng nghệ thuật.',
    x2: 'Sáng tạo dồi dào — ý tưởng tuôn chảy, giao tiếp cuốn hút, duyên dáng tự nhiên. Nhưng có thể nói quá nhiều mà chưa làm đủ.',
    x3: 'Sáng tạo tràn ngập — năng lượng nghệ thuật mãnh liệt nhưng dễ phân tán. Khó tập trung hoàn thành vì liên tục bị ý tưởng mới cuốn đi. Kỷ luật sáng tạo là chìa khóa.',
    x4plus: 'Năng lượng sáng tạo cực đoan — thiên tài nghệ thuật nhưng có thể mất kết nối với thực tế. Cần được "ground" bằng routine và những người thực tế xung quanh.',
  },
  4: {
    x1: 'Kỷ luật và tổ chức ở mức chuẩn — bạn đáng tin cậy và hoàn thành công việc.',
    x2: 'Kỷ luật vượt trội — bạn là cỗ máy hoàn thành, đáng tin cậy gấp đôi. Nhưng có thể quá cứng nhắc và thiếu spontaneity.',
    x3: 'Kỷ luật áp đảo — workaholic tiềm ẩn, khó "buông" công việc. Có thể áp đặt tiêu chuẩn cứng nhắc lên người khác. Cần học cách thư giãn.',
    x4plus: 'Cực kỳ kỷ luật — nhưng ranh giới với OCD/kiểm soát rất mỏng. Cuộc sống có thể trở nên quá "hộp" và mất đi niềm vui. Work-life balance là ưu tiên.',
  },
  5: {
    x1: 'Linh hoạt và tự do ở mức chuẩn — bạn thích ứng tốt với thay đổi.',
    x2: 'Năng lượng tự do tăng cường — bạn cần nhiều kích thích và đa dạng hơn bình thường. Du lịch, trải nghiệm, đổi mới — là fuel. Nhưng cam kết dài hạn là thử thách.',
    x3: 'Tự do quá mức — khó ở yên, khó cam kết, luôn tìm kiếm "bước tiếp theo". Có nguy cơ nghiện adrenaline hoặc kích thích. Cần học giá trị của sự ổn định.',
    x4plus: 'Năng lượng tự do cực đoan — cuộc sống luôn biến động, mối quan hệ khó bền. Nhưng nếu được channelize đúng cách (du lịch, sales, event), có thể trở thành siêu năng lực.',
  },
  6: {
    x1: 'Trách nhiệm và tình yêu ở mức chuẩn — bạn yêu gia đình và biết chăm sóc.',
    x2: 'Bản năng chăm sóc tăng cường — bạn là "mẹ/bố" của cả nhóm. Tình yêu sâu, trung thành, nhưng có thể trở nên kiểm soát vì quá lo lắng.',
    x3: 'Chăm sóc quá mức — "helicopter parent" tiềm ẩn, can thiệp vào cuộc sống người khác vì "tốt cho họ". Cần nhận ra rằng yêu thương cũng cần ranh giới.',
    x4plus: 'Năng lượng chăm sóc cực đoan — hy sinh bản thân đến mức kiệt sức. Nguy hiểm: đánh mất identity vì mải lo cho người khác. Tự chăm sóc là ưu tiên số 1.',
  },
  7: {
    x1: 'Chiều sâu trí tuệ và tâm linh ở mức chuẩn — bạn có xu hướng phân tích và nội tâm.',
    x2: 'Trí tuệ và trực giác tăng cường — bạn nhìn sâu hơn mọi người, phân tích xuất sắc. Nhưng có thể overthink và xa cách cảm xúc.',
    x3: 'Trí tuệ tách biệt — sống trong đầu nhiều hơn trong tim. Rất khó kết nối cảm xúc với người khác. Cô lập có thể trở thành thói quen nguy hiểm.',
    x4plus: 'Nội tâm cực đoan — gần như "ẩn sĩ". Trí tuệ siêu việt nhưng nguy cơ depression do cô đơn. Cần có ít nhất 1-2 người hiểu sâu để giữ kết nối.',
  },
  8: {
    x1: 'Tham vọng và tài chính ở mức chuẩn — bạn hiểu giá trị tiền và biết cách kiếm.',
    x2: 'Tham vọng vật chất tăng cường — bạn có bản năng kinh doanh mạnh và khả năng kiếm tiền vượt trội. Nhưng đừng để "thành công" trở thành thước đo duy nhất.',
    x3: 'Tham vọng áp đảo — money-obsessed tiềm ẩn, đánh giá mọi thứ qua giá trị tài chính. Quan hệ có thể bị tổn thương. Cần nhớ: "Tiền mua được giường nhưng không mua được giấc ngủ."',
    x4plus: 'Năng lượng quyền lực cực đoan — khả năng tạo empire cực lớn nhưng karma tiền cũng cực nặng. Philanthropy không phải tùy chọn — đó là quy luật sống còn.',
  },
  9: {
    x1: 'Lòng nhân đạo và tầm nhìn ở mức chuẩn — bạn quan tâm cộng đồng và có thiên hướng phụng sự.',
    x2: 'Năng lượng nhân đạo tăng cường — bạn cảm nhận nỗi đau của thế giới sâu hơn, có xu hướng hoạt động xã hội mạnh. Nhưng có thể "ôm" quá nhiều đau khổ.',
    x3: 'Nhân đạo quá mức — "cứu thế giới" trở thành gánh nặng. Đau khổ của người khác trở thành đau khổ của bạn. Burnout từ bi là nguy cơ thật.',
    x4plus: 'Năng lượng nhân đạo cực đoan — "linh hồn già" cảm nhận karma tập thể. Sứ mệnh lớn nhưng cần bảo vệ sức khỏe tinh thần nghiêm ngặt.',
  },
};
