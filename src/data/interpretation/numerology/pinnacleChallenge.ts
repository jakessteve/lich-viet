/**
 * Numerology — Pinnacle & Challenge + Life Period Interpretations
 *
 * Meaning data for pinnacle numbers, challenge numbers, and life period cycles.
 */

/** Pinnacle number meanings (what energy peaks in this life stage) */
export const PINNACLE_MEANINGS: Record<number, string> = {
  1: 'Đỉnh cao của sự độc lập và lãnh đạo. Giai đoạn này yêu cầu bạn đứng trên đôi chân mình, ra quyết định dũng cảm, và tiên phong. Thành công đến khi bạn ngừng chờ sự cho phép và bắt đầu tự tạo con đường.',
  2: 'Đỉnh cao của hợp tác và ngoại giao. Giai đoạn này phát triển qua các mối quan hệ — partnership, hôn nhân, hoặc đồng minh kinh doanh. Kiên nhẫn và lắng nghe là chìa khóa.',
  3: 'Đỉnh cao của sáng tạo và biểu đạt. Giai đoạn tỏa sáng qua nghệ thuật, giao tiếp, hoặc bất kỳ hình thức biểu đạt nào. Niềm vui và inspiration dẫn đường.',
  4: 'Đỉnh cao của xây dựng nền tảng. Giai đoạn làm việc chăm chỉ, kỷ luật, và tạo ra thứ bền vững. Có thể cảm thấy nặng nề nhưng kết quả sẽ tồn tại rất lâu.',
  5: 'Đỉnh cao của tự do và thay đổi. Giai đoạn đầy biến động — du lịch, thay đổi nghề, gặp gỡ mới. Thích ứng nhanh và tận hưởng đa dạng.',
  6: 'Đỉnh cao của gia đình và trách nhiệm. Giai đoạn xoay quanh tổ ấm, con cái, chăm sóc cộng đồng. Tình yêu và trách nhiệm dẫn đường.',
  7: 'Đỉnh cao của trí tuệ và tâm linh. Giai đoạn hướng nội — nghiên cứu, chiêm nghiệm, phát triển tâm linh. Tri thức sâu và trực giác mạnh.',
  8: 'Đỉnh cao của quyền lực và thành tựu vật chất. Giai đoạn thăng tiến sự nghiệp, tài chính bùng nổ. Karma rõ ràng — cho đi sẽ nhận lại gấp bội.',
  9: 'Đỉnh cao của phụng sự và hoàn thiện. Giai đoạn cống hiến cho cộng đồng, sáng tạo có ý nghĩa, buông bỏ cá nhân. Tầm nhìn rộng, lòng từ bi sâu.',
  11: 'Đỉnh cao Master — trực giác siêu việt và truyền cảm hứng tâm linh. Giai đoạn phi thường nhưng đòi hỏi sự dũng cảm để sống khác biệt.',
  22: 'Đỉnh cao Master — xây dựng ở quy mô vĩ đại. Giai đoạn hiện thực hóa tầm nhìn lớn — tổ chức, hệ thống, di sản. Tiềm năng to lớn nhưng áp lực cũng tương xứng.',
  33: 'Đỉnh cao Master — tình yêu vô điều kiện và chữa lành. Giai đoạn hiếm hoi sống trọn năng lượng Master Teacher of Love.',
};

/** Challenge number meanings (what bài học phải vượt qua) */
export const CHALLENGE_MEANINGS: Record<number, string> = {
  0: 'Thử thách số 0 — "Challenge of Choice". Bạn có TẤT CẢ các thử thách tiềm ẩn — hoặc không có thử thách cụ thể nào. Tự do hoàn toàn nhưng cũng có nghĩa là thiếu hướng dẫn rõ ràng. Bài học: tự tìm ra thử thách và đối mặt thay vì trốn tránh.',
  1: 'Thử thách về sự tự tin và độc lập. Bạn cần học cách đứng lên cho bản thân, ra quyết định mà không phụ thuộc, và tin vào năng lực riêng. Sợ bị cô đơn hoặc bị phản đối có thể cản trở.',
  2: 'Thử thách về nhạy cảm và hợp tác. Bạn cần học cách lắng nghe, bớt phản ứng, và làm việc nhóm hiệu quả. Quá nhạy cảm hoặc quá phụ thuộc vào ý kiến người khác là bẫy.',
  3: 'Thử thách về biểu đạt bản thân. Bạn cần học cách thể hiện cảm xúc, ý tưởng, và tài năng mà không sợ bị đánh giá. Tự phê phán quá mức hoặc phân tán là nguy cơ.',
  4: 'Thử thách về kỷ luật và nền tảng. Bạn cần học cách kiên trì, tổ chức, và hoàn thành công việc. Lười biếng, thiếu kiên nhẫn, hoặc cứng nhắc là những bẫy cần tránh.',
  5: 'Thử thách về tự do và thay đổi. Bạn cần học cách đón nhận thay đổi mà không sợ, đồng thời không lạm dụng tự do. Nghiện kích thích hoặc trốn cam kết là nguy cơ.',
  6: 'Thử thách về trách nhiệm và tình yêu. Bạn cần học cách chăm sóc mà không kiểm soát, yêu thương mà không hy sinh quá mức. Cầu toàn trong quan hệ là bẫy.',
  7: 'Thử thách về niềm tin và chiều sâu. Bạn cần học cách tin tưởng — tin người, tin bản thân, tin quá trình. Hoài nghi quá mức hoặc cô lập trí tuệ là nguy cơ.',
  8: 'Thử thách về quyền lực và vật chất. Bạn cần học cách quản lý tài chính, sử dụng quyền lực đúng đắn. Tham lam hoặc sợ tiền đều là bẫy — cần cân bằng.',
};

/** Life period meanings (3 grand cycles from birth date) */
export const LIFE_PERIOD_MEANINGS: Record<number, Record<'formative' | 'productive' | 'harvest', string>> = {
  1: {
    formative: 'Tuổi thơ và thanh niên dưới năng lượng 1: sớm phát triển tính tự lập, có thể phải tự lo liệu sớm. Môi trường đòi hỏi sự mạnh mẽ — bạn học cách đứng lên cho mình từ nhỏ.',
    productive: 'Giai đoạn trưởng thành với năng lượng 1: sự nghiệp dẫn dắt bởi tinh thần tiên phong. Bạn thăng tiến qua khả năng lãnh đạo và sáng kiến cá nhân.',
    harvest: 'Giai đoạn thu hoạch với năng lượng 1: cuộc đời sau 56 vẫn năng động, độc lập. Bạn có thể khởi nghiệp muộn hoặc dẫn dắt cộng đồng.',
  },
  2: {
    formative: 'Tuổi thơ dưới năng lượng 2: nhạy cảm, cần sự an toàn và tình yêu thương. Quan hệ gia đình ảnh hưởng sâu — hòa thuận hay xung đột đều để lại dấu ấn lâu dài.',
    productive: 'Giai đoạn trưởng thành với năng lượng 2: thành công qua hợp tác và quan hệ. Partnership (kinh doanh hoặc tình cảm) đóng vai trò trung tâm.',
    harvest: 'Giai đoạn thu hoạch với năng lượng 2: cuộc đời bình yên, tập trung vào mối quan hệ chất lượng và sự hài hòa nội tâm.',
  },
  3: {
    formative: 'Tuổi thơ dưới năng lượng 3: sáng tạo, hài hước, có thể là "ngôi sao" trong gia đình/trường. Cần được khuyến khích biểu đạt bản thân.',
    productive: 'Giai đoạn trưởng thành với năng lượng 3: sự nghiệp gắn với sáng tạo, giao tiếp. Networking và personal brand đóng vai trò lớn.',
    harvest: 'Giai đoạn thu hoạch với năng lượng 3: cuộc đời vui vẻ, hoạt động nghệ thuật, có thể viết sách hoặc giảng dạy chia sẻ kinh nghiệm.',
  },
  4: {
    formative: 'Tuổi thơ dưới năng lượng 4: có thể trải qua hoàn cảnh khó khăn đòi hỏi trách nhiệm sớm. Học giá trị của kỷ luật và sự chăm chỉ từ nhỏ.',
    productive: 'Giai đoạn trưởng thành với năng lượng 4: sự nghiệp xây dựng bền vững — tiến chậm nhưng chắc chắn. Chuyên gia hoặc quản lý vận hành.',
    harvest: 'Giai đoạn thu hoạch với năng lượng 4: cuộc đời ổn định, có hệ thống. Để lại nền tảng vững chắc cho thế hệ sau.',
  },
  5: {
    formative: 'Tuổi thơ dưới năng lượng 5: có thể chuyển nhà nhiều, gia đình thay đổi. Sớm phát triển tính linh hoạt và thích ứng.',
    productive: 'Giai đoạn trưởng thành với năng lượng 5: sự nghiệp đa dạng, có thể đổi nghề nhiều lần. Thành công đến qua trải nghiệm rộng.',
    harvest: 'Giai đoạn thu hoạch với năng lượng 5: cuộc đời phiêu lưu — du lịch, trải nghiệm mới, không bao giờ "nghỉ hưu" thật sự.',
  },
  6: {
    formative: 'Tuổi thơ dưới năng lượng 6: gia đình là trung tâm. Có thể phải đảm nhận vai trò chăm sóc từ sớm. Tình yêu thương và trách nhiệm định hình tính cách.',
    productive: 'Giai đoạn trưởng thành với năng lượng 6: sự nghiệp gắn với phục vụ, chăm sóc. Gia đình là ưu tiên số 1 bên cạnh sự nghiệp.',
    harvest: 'Giai đoạn thu hoạch với năng lượng 6: trở thành trụ cột gia đình mở rộng — ông bà, mentor cho thế hệ trẻ.',
  },
  7: {
    formative: 'Tuổi thơ dưới năng lượng 7: có xu hướng nội tâm, thích đọc sách hơn chơi đùa. Có thể cảm thấy "khác biệt" so với bạn cùng lứa.',
    productive: 'Giai đoạn trưởng thành với năng lượng 7: sự nghiệp gắn với chuyên môn sâu — nghiên cứu, phân tích, tâm linh. Cần riêng tư để làm việc tốt nhất.',
    harvest: 'Giai đoạn thu hoạch với năng lượng 7: hiền triết — chia sẻ trí tuệ tích lũy. Cuộc đời bình yên, nội tâm phong phú.',
  },
  8: {
    formative: 'Tuổi thơ dưới năng lượng 8: có thể lớn lên trong gia đình có ý thức về tiền bạc (giàu hoặc thiếu). Sớm hiểu giá trị vật chất.',
    productive: 'Giai đoạn trưởng thành với năng lượng 8: sự nghiệp đỉnh cao — quyền lực, tài chính, thành tựu lớn. Karma tiền rõ ràng.',
    harvest: 'Giai đoạn thu hoạch với năng lượng 8: Legacy builder — dùng tài sản và ảnh hưởng để tạo impact cho thế hệ sau.',
  },
  9: {
    formative: 'Tuổi thơ dưới năng lượng 9: nhạy cảm với thế giới, sớm quan tâm đến công bằng xã hội. Có thể trải qua mất mát sớm — dạy bài học buông bỏ.',
    productive: 'Giai đoạn trưởng thành với năng lượng 9: sự nghiệp gắn với phụng sự — nghệ thuật, giáo dục, hoạt động xã hội. Tầm nhìn rộng, lòng từ bi sâu.',
    harvest: 'Giai đoạn thu hoạch với năng lượng 9: hiền nhân — buông bỏ, cho đi, và để lại ảnh hưởng tích cực. "Cuộc đời là hành trình, không phải đích đến."',
  },
};
