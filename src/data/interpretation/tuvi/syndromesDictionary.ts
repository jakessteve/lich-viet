export interface SyndromeDictionaryEntry {
  id: string;
  name: string;
  type: 'Tốt' | 'Xấu' | 'Trung Tính';
  starsInvolved: string[];
  description: string;
  careerImpact: string;
  relationshipImpact: string;
  healthImpact: string;
  advice: string;
}

export const tuviSyndromesDictionary: Record<string, SyndromeDictionaryEntry> = {
  TuPhuVuTuong: {
    id: 'TuPhuVuTuong',
    name: 'Tử Phủ Vũ Tướng',
    type: 'Tốt',
    starsInvolved: ['Tử Vi', 'Thiên Phủ', 'Vũ Khúc', 'Thiên Tướng'],
    description: 'Cách cục của những nhà lãnh đạo bẩm sinh, mang năng lượng ổn định, quyền lực và tài lộc vững chắc.',
    careerImpact: 'Dễ dàng nắm giữ các vị trí quản lý cấp cao, điều hành doanh nghiệp lớn hoặc làm việc trong cơ quan nhà nước.',
    relationshipImpact: 'Tìm kiếm sự môn đăng hộ đối, bạn đời thường là người có địa vị hoặc xuất thân tốt.',
    healthImpact: 'Sức khỏe nhìn chung ổn định, nhưng cần chú ý các bệnh liên quan đến hệ tiêu hóa do tiệc tùng ngoại giao.',
    advice: 'Phát huy tối đa năng lực lãnh đạo, nhưng cần bồi dưỡng sự thấu cảm để tránh trở nên độc đoán.'
  },
  SatPhaTham: {
    id: 'SatPhaTham',
    name: 'Sát Phá Tham',
    type: 'Trung Tính',
    starsInvolved: ['Thất Sát', 'Phá Quân', 'Tham Lang'],
    description: 'Bản chất của sự đột phá, tiên phong, sẵn sàng phá hủy cái cũ để xây dựng cái mới. Cuộc đời nhiều biến động.',
    careerImpact: 'Thích hợp với kinh doanh mạo hiểm, quân đội, thể thao hoặc các ngành công nghiệp sáng tạo đột phá.',
    relationshipImpact: 'Tình cảm nồng nhiệt nhưng nhiều sóng gió, dễ yêu nhanh chia tay vội nếu thiếu sự nhẫn nhịn.',
    healthImpact: 'Dễ gặp tai nạn ngoại thương hoặc các bệnh do lao lực, sinh hoạt thất thường.',
    advice: 'Cần học cách "nhu thắng cương" (lấy mềm thắng cứng). Kỷ luật bản thân là chìa khóa để giữ vững thành quả.'
  },
  CoNguyetDongLuong: {
    id: 'CoNguyetDongLuong',
    name: 'Cơ Nguyệt Đồng Lương',
    type: 'Tốt',
    starsInvolved: ['Thiên Cơ', 'Thái Âm', 'Thiên Đồng', 'Thiên Lương'],
    description: 'Cách cục của giới trí thức, công chức, mang năng lượng nhẹ nhàng, thanh tao, thiên về suy nghĩ hơn hành động.',
    careerImpact: 'Tỏa sáng rực rỡ trong lĩnh vực nghiên cứu, giáo dục, y tế, nghệ thuật hoặc các công việc hành chính văn phòng.',
    relationshipImpact: 'Tình cảm lãng mạn, êm đềm, luôn hướng tới sự hòa thuận và gia đình.',
    healthImpact: 'Nhạy cảm thần kinh, dễ mắc các bệnh lý liên quan đến căng thẳng, mất ngủ, suy nhược.',
    advice: 'Không nên tham gia vào các lĩnh vực đầu tư mạo hiểm hay tranh đoạt khốc liệt. Bình an là trên hết.'
  },
  CuNhat: {
    id: 'CuNhat',
    name: 'Cự Nhật',
    type: 'Tốt',
    starsInvolved: ['Cự Môn', 'Thái Dương'],
    description: 'Năng lượng của mặt trời xua tan bóng tối (Cự Môn). Cách cục của những người ngoại giao xuất chúng, nhà truyền giáo hoặc luật sư tài danh.',
    careerImpact: 'Sử dụng ngôn ngữ như một thứ "vũ khí". Rất thành công khi làm luật sư, cố vấn, diễn giả, truyền thông.',
    relationshipImpact: 'Dễ xảy ra bất đồng trong giao tiếp do cái tôi cao, cần hạ bớt cái tôi để giữ gìn hạnh phúc.',
    healthImpact: 'Lưu ý các bệnh liên quan đến mắt, đầu, và đường tiêu hóa.',
    advice: 'Tránh tranh cãi vô thưởng vô phạt. Dùng lời nói để truyền cảm hứng thay vì đả kích người khác.'
  },
  KhongKiep: {
    id: 'KhongKiep',
    name: 'Địa Không - Địa Kiếp',
    type: 'Xấu',
    starsInvolved: ['Địa Không', 'Địa Kiếp'],
    description: 'Sức mạnh phá hủy cực lớn, bạo phát bạo tàn. Đại diện cho sự trắc trở, tay trắng làm nên nhưng được mất bất thường.',
    careerImpact: 'Lên đỉnh cao rất nhanh nhưng nếu tham lam có thể mất trắng trong chớp mắt. Phù hợp đầu tư công nghệ, tiền ảo (nhưng rủi ro cực lớn).',
    relationshipImpact: 'Nghiệp duyên sâu nặng. Dễ bị phản bội, lợi dụng hoặc chia ly đột ngột.',
    healthImpact: 'Cảnh giác cao độ với bệnh hiểm nghèo hoặc tai nạn bất ngờ.',
    advice: 'Biết đủ là đủ. Khi đạt đỉnh cao phải biết tu tâm tích đức, từ thiện và rút lui đúng lúc để tránh họa hao tài tốn của.'
  }
};
