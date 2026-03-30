/**
 * Thần Sát (Divine Stars) Detailed Descriptions
 * Maps Thần Sát names to rich interpretations.
 */

export interface ThanSatInfo {
  name: string;
  nameHan: string;
  nature: 'cat' | 'hung' | 'trung';
  keyword: string;
  detailedMeaning: string;
  lifeInfluence: string;
  advice: string;
}

export const THAN_SAT_MEANINGS: Record<string, ThanSatInfo> = {
  'Đào Hoa': {
    name: 'Đào Hoa',
    nameHan: '桃花',
    nature: 'trung',
    keyword: 'Sức hút · Duyên dáng · Nghệ thuật',
    detailedMeaning: 'Đào Hoa (Hàm Trì) là ngôi sao của sự quyến rũ, duyên dáng, và sức thu hút cá nhân. Người có Đào Hoa thường ngoại hình hấp dẫn, có khiếu giao tiếp, được nhiều người yêu mến. Đào Hoa ở trụ Năm mang tính xã giao rộng; ở trụ Ngày mang tính tình cảm sâu.',
    lifeInfluence: 'Tình cảm phong phú, nhiều người theo đuổi. Giỏi trong lĩnh vực nghệ thuật, giải trí, biểu diễn, marketing. Tuy nhiên, nếu Đào Hoa quá mạnh hoặc gặp hung tinh, dễ gây ra phức tạp tình cảm, ngoại tình, nghiện ngập.',
    advice: 'Tận dụng sức hút để phát triển sự nghiệp (MC, diễn viên, sales, PR). Trong tình cảm, cần tỉnh táo và chung thủy. Kênh hóa năng lượng Đào Hoa vào nghệ thuật sẽ rất thành công.',
  },
  'Hồng Diễm': {
    name: 'Hồng Diễm',
    nameHan: '红艳',
    nature: 'trung',
    keyword: 'Đam mê · Thu hút · Lãng mạn',
    detailedMeaning: 'Hồng Diễm là phiên bản mạnh hơn của Đào Hoa, mang sức thu hút nóng bỏng, đam mê và quyến rũ. Thường liên quan đến ngoại hình nổi bật, phong cách cuốn hút, và từ trường cá nhân mạnh mẽ. Khác với Đào Hoa (duyên dáng), Hồng Diễm mang tính "nguy hiểm" hơn.',
    lifeInfluence: 'Nhiều mối quan hệ phức tạp, dễ bị cuốn vào tam giác tình cảm. Rất thành công trong ngành giải trí, mỹ phẩm, thời trang. Cần kiểm soát cảm xúc và sự thèm muốn.',
    advice: 'Chuyển năng lượng đam mê vào sáng tạo and nghệ thuật. Trong tình cảm, đặt giới hạn rõ ràng. Tránh môi trường nhiều cám dỗ khi ý chí yếu.',
  },
  'Dịch Mã': {
    name: 'Dịch Mã',
    nameHan: '驿马',
    nature: 'cat',
    keyword: 'Di chuyển · Thay đổi · Cơ hội xa',
    detailedMeaning: 'Dịch Mã là ngôi sao di chuyển, tượng trưng cho sự thay đổi môi trường, du lịch, di cư, và cơ hội đến từ xa. Người có Dịch Mã mạnh thường không ở yên một chỗ, luôn muốn khám phá và trải nghiệm mới.',
    lifeInfluence: 'Nghề nghiệp liên quan đến di chuyển: phi công, hướng dẫn viên du lịch, phóng viên, trader quốc tế. Cuộc sống năng động, nhiều chuyển biến. Nếu Dịch Mã bị xung, cẩn thận tai nạn giao thông.',
    advice: 'Tận dụng Dịch Mã cho sự nghiệp quốc tế, xuất khẩu, du lịch. Đầu tư vào học ngoại ngữ. Cẩn thận an toàn khi di chuyển.',
  },
  'Thiên Ất Quý Nhân': {
    name: 'Thiên Ất Quý Nhân',
    nameHan: '天乙贵人',
    nature: 'cat',
    keyword: 'May mắn · Quý nhân · Hóa giải',
    detailedMeaning: 'Thiên Ất Quý Nhân là ngôi sao may mắn nhất trong hệ thống Thần Sát. Người có Thiên Ất luôn gặp quý nhân phù trợ trong những lúc khó khăn nhất, tai qua nạn khỏi, hung hóa cát. Đây là dấu hiệu của phúc đức, bảo hộ.',
    lifeInfluence: 'Cuộc đời nhiều may mắn, khi ngã lại có người đỡ. Dễ được cấp trên đề bạt, bạn bè giúp đỡ. Khả năng hóa giải hung tinh cực mạnh — có thể giảm nhẹ mọi sao xấu trong tứ trụ.',
    advice: 'Trân trọng quý nhân trong đời, đừng phụ lòng người giúp. Tích đức, làm thiện sẽ tăng cường phúc Thiên Ất.',
  },
  'Văn Xương': {
    name: 'Văn Xương',
    nameHan: '文昌',
    nature: 'cat',
    keyword: 'Học vấn · Trí tuệ · Thi cử',
    detailedMeaning: 'Văn Xương là ngôi sao học vấn, chủ về trí tuệ, thi cử, và sáng tạo văn chương. Người có Văn Xương mạnh thường thông minh, học giỏi, có năng khiếu viết và diễn thuyết. Đặc biệt tốt cho ngành giáo dục, nghiên cứu, và truyền thông.',
    lifeInfluence: 'Học hành thuận lợi, thi cử đỗ đạt. Sáng tạo, viết lách giỏi. Thích hợp làm giáo viên, nhà nghiên cứu, nhà văn, luật sư. Nếu Văn Xương bị phá, dễ học hành dang dở hoặc bằng cấp vô dụng.',
    advice: 'Đầu tư vào giáo dục và phát triển trí tuệ. Viết sách, blog, content sẽ thành công. Kích hoạt góc Văn Xương trong nhà bằng bút, sách, và đèn sáng.',
  },
  'Kim Dư': {
    name: 'Kim Dư',
    nameHan: '金舆',
    nature: 'cat',
    keyword: 'Xe vàng · Sang trọng · Hôn nhân tốt',
    detailedMeaning: 'Kim Dư — chiếc xe vàng, tượng trưng cho cuộc sống sang trọng, phú quý, và hôn nhân mỹ mãn. Người có Kim Dư thường có duyên với cuộc sống thượng lưu, phương tiện sang trọng, và bạn đời giàu có.',
    lifeInfluence: 'Hôn nhân tốt đẹp, bạn đời có điều kiện. Cuộc sống vật chất đầy đủ, duyên với xe hơi, bất động sản đẹp. Được nâng đỡ trong xã hội, dễ tiếp cận giới thượng lưu.',
    advice: 'Tận dụng mối quan hệ cao cấp cho sự nghiệp. Đầu tư vào hình ảnh cá nhân và phong cách sống.',
  },
  'Kiếp Sát': {
    name: 'Kiếp Sát',
    nameHan: '劫煞',
    nature: 'hung',
    keyword: 'Cướp đoạt · Tai họa · Mất mát bất ngờ',
    detailedMeaning: 'Kiếp Sát là ngôi sao tai họa đột ngột, tượng trưng cho sự mất mát bất ngờ, bị cướp, bị trộm, hoặc tai nạn ngoài tầm kiểm soát. Kiếp Sát không giống hung tinh từ từ — nó đến nhanh, mạnh, không báo trước.',
    lifeInfluence: 'Cẩn thận với mất mát tài sản đột ngột, tai nạn giao thông, trộm cướp. Nếu Kiếp Sát bị kích hoạt (gặp xung hoặc hành vận xấu), cần đặc biệt phòng bị.',
    advice: 'Bảo hiểm tài sản, bảo hiểm nhân thọ. Cẩn thận khi di chuyển. Không mang tiền mặt lớn. Kiểm tra an ninh nhà cửa.',
  },
  'Hoa Cái': {
    name: 'Hoa Cái',
    nameHan: '华盖',
    nature: 'trung',
    keyword: 'Cô đơn · Tâm linh · Nghệ thuật · Triết học',
    detailedMeaning: 'Hoa Cái tượng trưng cho chiếc lọng hoa che đầu vua — đẹp nhưng cô đơn trên đỉnh. Người có Hoa Cái thường thông minh, có chiều sâu tư tưởng, khiếu triết học và tâm linh. Tuy nhiên cũng dễ cô đơn, khó hòa nhập với đám đông.',
    lifeInfluence: 'Phù hợp nghề nghiên cứu, triết học, tâm linh, nghệ thuật cao cấp. Đời sống tinh thần phong phú nhưng đời sống xã hội có thể hạn chế. Nếu quá nhiều Hoa Cái, dễ biến thành cô độc.',
    advice: 'Chấp nhận sự khác biệt của mình, tìm cộng đồng cùng tần số. Phát triển năng khiếu nghệ thuật hoặc tâm linh. Cân bằng giữa suy tư và giao tiếp xã hội.',
  },
  'Tướng Tinh': {
    name: 'Tướng Tinh',
    nameHan: '将星',
    nature: 'cat',
    keyword: 'Lãnh đạo · Uy tín · Quân sự',
    detailedMeaning: 'Tướng Tinh là ngôi sao tướng lĩnh, mang khí chất lãnh đạo bẩm sinh. Người có Tướng Tinh thường có uy tín tự nhiên, khả năng ra quyết định dứt khoát, và tố chất tổ chức. Phù hợp cho vai trò lãnh đạo, quản lý, quân nhân cao cấp.',
    lifeInfluence: 'Dễ được tín nhiệm, đề bạt vào vị trí lãnh đạo. Có tầm ảnh hưởng rộng, được mọi người kính trọng. Nếu không ở vị trí lãnh đạo, dễ bất mãn và mâu thuẫn với cấp trên.',
    advice: 'Phát huy năng lực lãnh đạo, không nên chỉ là nhân viên bình thường. Đào tạo kỹ năng quản lý. Cẩn thận tính độc đoán.',
  },
  'Quả Tú': {
    name: 'Quả Tú',
    nameHan: '孤辰',
    nature: 'hung',
    keyword: 'Cô đơn · Ly cách · Khó hôn',
    detailedMeaning: 'Quả Tú tượng trưng cho sự cô đơn trong tình cảm, khó tìm được bạn đời phù hợp, hoặc hôn nhân muộn. Không nhất thiết là xấu — đôi khi chỉ là biểu hiện của sự độc lập cao và khó tính trong chọn bạn đời.',
    lifeInfluence: 'Kết hôn muộn hoặc hôn nhân gặp trở ngại. Có xu hướng sống một mình, tự lập. Nếu gặp Hoa Cái, xu hướng tu hành hoặc sống ẩn dật.',
    advice: 'Mở lòng hơn, chấp nhận sự không hoàn hảo. Tham gia hoạt động xã hội, mở rộng giao tiếp. Không nên quá kén chọn bạn đời.',
  },
};
