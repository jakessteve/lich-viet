import type { BaziChart } from '../../types/bazi';
import { DAY_MASTER_PROFILES } from '../../data/interpretation/bazi/dayMasterProfiles';
import { ELEMENT_LIFE_ADVICE } from '../../data/interpretation/bazi/lifeDomainAdvice';

export interface ETCNarrative {
  hook: string;
  effectParagraphs?: string[];
  nuance?: string;
  cause?: string;
  tip?: string;
}

export interface ExecutiveSummaryBlock {
  title: string;
  coreArchetype: string;
  careerDirection: string;
  summaryParagraph: string;
  coreAdvice: string;
}

export interface CategoryReading {
  area: string;
  paragraphs: ETCNarrative[];
}

export function generateBaziExecutiveSummary(chart: BaziChart): ExecutiveSummaryBlock {
  const profile = DAY_MASTER_PROFILES[chart.dayMaster.dayMaster];
  const favEls = chart.dayMaster.favorableElements;
  const _primaryAdvice = ELEMENT_LIFE_ADVICE[favEls[0]] || ELEMENT_LIFE_ADVICE['Thổ'];
  const careerD = favEls.map(e => ELEMENT_LIFE_ADVICE[e]?.careers?.slice(0, 2).join(', ')).filter(Boolean).join('; ');

  return {
    title: 'Tóm Lược Tinh Hoa Bản Mệnh',
    coreArchetype: profile.archetype,
    careerDirection: careerD || 'Phát triển đa ngành nghề',
    summaryParagraph: `Bức tranh tổng thể cho thấy bạn mang nguyên mẫu ${profile.archetype} với ngũ hành chủ đạo là ${profile.element}. Sức mạnh cốt lõi của bạn nằm ở sự ${chart.dayMaster.strength === 'vượng' ? 'tự lập, tự cường và bản lĩnh vững vàng' : chart.dayMaster.strength === 'suy' ? 'khéo léo, khả năng kết nối và mượn lực từ người khác' : 'cân bằng, linh hoạt thích ứng với mọi hoàn cảnh'}. Đây là nền tảng để bạn xây dựng cuộc đời, thay vì cố gắng thay đổi bản chất để vừa vặn với kỳ vọng của người khác.`,
    coreAdvice: `Hãy ưu tiên sử dụng năng lượng thuộc hành ${favEls.join(' và ')} làm la bàn định hướng cho mọi quyết định lớn.`
  };
}

export function analyze12LifeDomains(chart: BaziChart): CategoryReading[] {
  const profile = DAY_MASTER_PROFILES[chart.dayMaster.dayMaster];
  const strength = chart.dayMaster.strength;
  const favEls = chart.dayMaster.favorableElements;
  const thapThan = chart.thapThan;
  const hasGod = (godStr: string) => thapThan.some(t => t.god === godStr && t.position === 'can');
  
  const readings: CategoryReading[] = [];

  // 1. PERSONALITY (Nhật Chủ)
  readings.push({
    area: 'personality',
    paragraphs: [{
      hook: `Bạn mang trong mình năng lượng của ${profile.image} — ${profile.archetype}.`,
      effectParagraphs: [
        profile.personality,
        strength === 'vượng' ? 'Nhật Chủ vượng cho thấy bạn có cái tôi lớn, khả năng tự quyết cao và ý chí kiên định. Bạn thích tự mình làm mọi việc thay vì trông chờ vào sự phán xét của người khác.' :
        strength === 'suy' ? 'Nhật Chủ suy cho thấy bạn tinh tế, dễ đồng cảm và giỏi trong việc hợp tác. Sức mạnh của bạn nằm ở đội nhóm và sự kết nối chứ không phải hành động đơn độc.' :
        'Nhật Chủ cân bằng mang lại cho bạn khả năng thích ứng tuyệt vời, biết nhu biết cương đúng lúc.'
      ],
      nuance: `Tuy nhiên, điểm mạnh ${profile.strengths[0].toLowerCase()} đôi khi lại dẫn tới ${profile.weaknesses[0].toLowerCase()} nếu không biết tiết chế.`,
      cause: `Thiên Can ngày sinh ${chart.dayMaster.dayMaster} thiết lập tần số rung động cốt lõi của bạn.`,
      tip: `Hãy phát huy sở trường ${profile.strengths[1].toLowerCase()} và khắc phục điểm yếu ${profile.weaknesses[1].toLowerCase()}.`
    }]
  });

  // 2. PARENTS
  const hasChinhAn = hasGod('Chính Ấn');
  readings.push({
    area: 'parents',
    paragraphs: [{
      hook: hasChinhAn ? 'Gia đình là bến đỗ bình yên và là nguồn sức mạnh tinh thần lớn lao của bạn.' : 'Mối quan hệ với cha mẹ và nền tảng gia đình của bạn mang nhiều sắc thái độc lập.',
      effectParagraphs: [
        hasChinhAn ? 'Với Chính Ấn nổi bật, bạn nhận được sự bao bọc, giáo dục tốt và tình yêu thương vô điều kiện từ đấng sinh thành. Sự hậu thuẫn này tạo ra một nền tảng tâm lý vững chắc.' : 'Lá số cho thấy bạn sớm phải tự lập hoặc có những khoảng cách nhất định với gia đình. Sự tự lập sớm giúp bạn trưởng thành, nhưng cũng đòi hỏi nhiều nỗ lực hơn để tìm kiếm cảm giác thuộc về.',
        `Trụ Tháng hiện diện ${chart.monthPillar.can} ${chart.monthPillar.chi} ảnh hưởng trực tiếp tới cung phụ mẫu.`
      ],
      nuance: 'Sự bao bọc đôi khi làm giảm đi ý chí chiến đấu, hoặc ngược lại, sự độc lập quá sớm có thể che giấu nỗi cô đơn.',
      cause: 'Trụ Tháng và sự hiện diện (hay vắng mặt) của Ấn Tinh định hình cách bạn tiếp nhận tình thương từ gia đình.',
      tip: 'Dù xuất phát điểm thế nào, lòng biết ơn cội nguồn chính là chìa khóa mở ra cánh cửa bình an trong tâm hồn.'
    }]
  });

  // 3. KARMA
  readings.push({
    area: 'karma',
    paragraphs: [{
      hook: 'Phúc đức và di sản tinh thần cấu thành nên nền móng sâu xa nhất của cuộc đời bạn.',
      effectParagraphs: [
        `Trụ Năm ${chart.yearPillar.can} ${chart.yearPillar.chi} với Nạp Âm ${chart.yearPillar.napAm} cho thấy sự kết nối mãnh liệt với gốc gác và tổ tiên. Phúc đức bạn hưởng thụ không chỉ từ sự cố gắng ở hiện tại mà còn từ hồng ân lớp người đi trước.`,
        chart.thanSat.some(ts => ts.nature === 'cat') ? 'Lá số của bạn hội tụ các tinh tú may mắn, là bằng chứng cho thấy bạn mang một sứ mệnh thiện lành và luôn có quý nhân âm thầm phù trợ.' : 'Lá số đòi hỏi bạn phải tự mình gieo trồng phước báu. Đừng đợi chờ may mắn rơi từ trên trời xuống, chính bạn là người tạc nên bức tượng phúc lành cho riêng mình.'
      ],
      nuance: 'Phúc lớn dễ khiến con người sinh ra chủ quan, lơ là tu dưỡng.',
      cause: 'Toàn cục Tứ Trụ, đặc biệt là Trụ Năm (cung Tổ Đức) quyết định nền tảng phúc lộc tiên thiên.',
      tip: 'Gieo nhân thiện gặt quả lành. Phúc đức hôm nay là điểm tựa vững chắc cho ngày mai bão dông.'
    }]
  });

  // 4. PROPERTY
  readings.push({
    area: 'property',
    paragraphs: [{
      hook: 'Điền trạch và tài sản cố định trong lá số của bạn phản ánh nhu cầu về sự an toàn và ổn định.',
      effectParagraphs: [
        chart.tangCan.some(tc => tc.hiddenStems.some(s => s.element === 'Thổ')) ? 'Với sự hiện diện mạnh mẽ của hành Thổ trong tàng can, bạn có duyên lớn với đất đai, nhà cửa. Mua bán bất động sản hoặc tích lũy tài sản cố định sẽ là kênh giữ tiền an toàn và sinh lời tốt nhất cho bạn.' : 'Năng lượng lá số của bạn ưu tiên sự thanh khoản và dòng tiền linh hoạt hơn là chôn vốn vào bất động sản. Tuy nhiên, sở hữu một chốn đi về yên tĩnh vẫn là nhu cầu thiết yếu.',
      ],
      nuance: 'Tích lũy tài sản là tốt, nhưng đừng để việc theo đuổi vật chất làm mất đi sự tự do của thể xác và tinh thần.',
      cause: 'Thổ là kho tàng của ngũ hành. Sự phân bổ của hành Thổ và các Tài Tinh quyết định lộc điền trạch.',
      tip: 'Không gian sống hài hòa không chỉ mang lại tài lộc mà còn nuôi dưỡng sự bình yên cho tâm trí.'
    }]
  });

  // 5. CAREER
  const hasQuan = hasGod('Chính Quan');
  const hasSat = hasGod('Thất Sát');
  readings.push({
    area: 'career',
    paragraphs: [{
      hook: hasQuan ? 'Sự nghiệp của bạn xây dựng trên nền tảng của nguyên tắc, danh dự và sự thăng tiến bài bản.' : hasSat ? 'Con đường công danh của bạn đầy tính đột phá, cạnh tranh khốc liệt và những cú lội ngược dòng ngoạn mục.' : 'Sự nghiệp của bạn không đi theo lối mòn truyền thống mà phụ thuộc nhiều vào đam mê và kỹ năng cá nhân.',
      effectParagraphs: [
        hasQuan ? 'Chính Quan mang lại uy tín, sự tín nhiệm từ cấp trên và một lộ trình nghề nghiệp ổn định. Bạn phù hợp với các cơ quan nhà nước, tập đoàn lớn hoặc những nơi coi trọng kỷ luật.' : hasSat ? 'Thất Sát mang lại bản lĩnh thép, áp lực lớn tạo ra viên kim cương. Bạn phù hợp với thương trường, khởi nghiệp, quân đội hoặc những vị trí đòi hỏi giải quyết khủng hoảng.' : 'Sự vắng bóng của Quan Sát cho thấy bạn yêu thích sự tự do, không muốn bị gò bó trong các quy củ hành chính. Freelance hoặc tự kinh doanh là lựa chọn tuyệt vời.',
        `Hành hỷ dụng gợi ý bạn nên gắn bó với môi trường thuộc hành ${favEls.join(', ')}.`
      ],
      nuance: 'Chính Quan quá vượng dễ sinh ra bảo thủ; Thất Sát quá vượng dễ sinh ra độc đoán.',
      cause: 'Quan Sát đại diện cho sự nghiệp, danh vọng và khả năng tuân thủ hệ thống.',
      tip: 'Sự nghiệp là cuộc đua đường dài, hiểu rõ sở trường và chắp cánh cho đam mê chính là lộ trình tối ưu.'
    }]
  });

  // 6. SERVANTS
  readings.push({
    area: 'servants',
    paragraphs: [{
      hook: 'Những người dưới quyền và đồng nghiệp xung quanh đóng vai trò quan trọng trong sự thành bại của bạn.',
      effectParagraphs: [
        hasGod('Kiếp Tài') ? 'Do có Kiếp Tài, bạn cần cực kỳ cẩn trọng trong việc hợp tác làm ăn và quản lý nhân sự. Nguy cơ bị phản bội, lợi dụng hoặc tranh chấp lợi ích là luôn hiện hữu.' : hasGod('Tỉ Kiên') ? 'Bạn có khả năng quy tụ huynh đệ, lập thành những đội nhóm thiện chiến. Sức mạnh của bạn nhân lên nhiều lần khi có đồng minh kề vai sát cánh.' : 'Bạn thường có xu hướng làm việc độc lập hoặc giữ một khoảng cách chuyên nghiệp với cấp dưới.',
      ],
      nuance: 'Trọng dụng người tài đòi hỏi sự tin tưởng, nhưng tin tưởng mù quáng mà không có cơ chế kiểm soát sẽ dẫn đến hậu quả khôn lường.',
      cause: 'Tỉ Kiên và Kiếp Tài đại diện cho đồng trang lứa, đồng nghiệp và thuộc cấp.',
      tip: 'Một mạng lưới hỗ trợ tốt giá trị hơn trăm vạn tài sản, hãy quản trị nhân sự bằng cả ân và uy.'
    }]
  });

  // 7. TRAVEL
  const hasDichMa = chart.thanSat.some(ts => ts.nameVi === 'Dịch Mã');
  readings.push({
    area: 'travel',
    paragraphs: [{
      hook: hasDichMa ? 'Dịch Mã xuất hiện trong mệnh, cuộc đời bạn là chuỗi những bến bờ mới lạ và những chuyến đi không ngừng nghỉ.' : 'Bạn có xu hướng tìm kiếm sự phất lên ở môi trường quen thuộc và gắn bó sâu sắc với quê hương bản quán.',
      effectParagraphs: [
        hasDichMa ? 'Di chuyển mang lại cho bạn sự nghiệp và tài lộc. Cơ hội lớn nhất thường nằm ngoài biên giới hoặc xa nơi chôn nhau cắt rốn. Bạn thuộc tuýp "động thì vượng, tĩnh thì suy".' : 'Sự ổn định giúp bạn rễ sâu lá tốt. Những chuyến đi xa mang tính chất trải nghiệm và thư giãn nhiều hơn là tìm kiếm lẽ sống.',
      ],
      nuance: 'Đi quá nhiều khiến tâm khảm khó tìm thấy chốn an vị; ở quá lâu một chỗ khiến tầm nhìn bị bó hẹp.',
      cause: 'Sự hiện diện của sao Dịch Mã và năng lượng tương tác giữa các trụ quyết định tần suất xê dịch.',
      tip: 'Mỗi chuyến đi, mỗi sự dịch chuyển là một cơ hội để làm mới bản thân và mở rộng chân trời phía trước.'
    }]
  });

  // 8. HEALTH
  readings.push({
    area: 'health',
    paragraphs: [{
      hook: 'Trạng thái cân bằng ngũ hành của cơ thể là ưu tiên hàng đầu để duy trì tinh lực lâu dài.',
      effectParagraphs: [
        `${ELEMENT_LIFE_ADVICE[chart.dayMaster.dayMasterElement]?.healthFocus || 'Cần chú ý sức khỏe tổng quát.'}`,
        strength === 'suy' ? 'Nhật Chủ suy, dễ hao tổn thể lực, cần nghỉ ngơi đầy đủ và bổ sung dinh dưỡng. Đừng vắt kiệt sức lực cho tham vọng công việc.' : strength === 'vượng' ? 'Nhật Chủ vượng, thể lực tốt nhưng dễ sinh ra nóng nảy, stress nội tạng. Cần vận động đều đặn để xả bớt năng lượng dư thừa.' : 'Sức khỏe và thể lực của bạn duy trì ở mức độ tốt, dẻo dai và có khả năng phục hồi nhanh.'
      ],
      nuance: 'Căn nguyên của bệnh lôi đa phần từ tâm trí bất an và thói quen sinh hoạt mất cân bằng.',
      cause: 'Nhật Chủ và sự thịnh suy của các hành trong lá số chỉ báo các hệ cơ quan cần được quan tâm bảo dưỡng.',
      tip: 'Cơ thể là đền thờ của tâm hồn. Lắng nghe những cảnh báo từ vũ trụ để giữ gìn tài sản quý giá nhất này.'
    }]
  });

  // 9. WEALTH
  const hasChinhTai = hasGod('Chính Tài');
  const hasThienTai = hasGod('Thiên Tài');
  readings.push({
    area: 'wealth',
    paragraphs: [{
      hook: hasThienTai ? 'Tiền bạc với bạn dồi dào, đến từ nhiều nguồn rủi ro cao nhưng lợi nhuận khổng lồ.' : hasChinhTai ? 'Bạn có giác quan nhạy bén về tiền bạc và luôn hướng tới sự tích lũy an toàn, vững chãi.' : 'Tài lộc của bạn không nằm phơi bày ngoài sáng mà ẩn giấu qua sự cần mẫn tích tiểu thành đại.',
      effectParagraphs: [
        hasThienTai ? 'Thiên Tài mang đến duyên với thương mại, đầu tư, chứng khoán hoặc các khoản thu bất ngờ. Tiền vào nhanh nhưng cũng ra nhanh, đòi hỏi kỹ năng quản lý rủi ro xuất sắc.' : hasChinhTai ? 'Chính Tài cho thấy nguồn thu nhập chính và ổn định. Bạn quản lý tài chính chặt chẽ, giỏi tiết kiệm và hiếm khi để mình rơi vào hoàn cảnh túng quẫn.' : 'Thiếu Tài Tinh lộ diện ở Thiên Can, bạn cần một chiến lược tài chính dài hạn thay vì mong mỏi giàu sổi. Sự nhẫn nại chính là kho báu lớn nhất.',
        `Việc kết hợp với hành hỷ dụng (${favEls.join(', ')}) sẽ giúp kích hoạt tối đa dòng chảy kim tiền.`
      ],
      nuance: 'Quá chú trọng đồng tiền dễ đánh mất cái đạo làm người. Tiền là công cụ, không phải ông chủ.',
      cause: 'Tài Tinh (Chính Tài, Thiên Tài) đại diện cho khả năng kiểm soát vật chất và dòng tiền.',
      tip: 'Quản lý tài chính thông minh kết hợp với thao lược sinh tồn sẽ biến cơ hội thành sự thịnh vượng bền vững.'
    }]
  });

  // 10. CHILDREN
  const hasThuc = hasGod('Thực Thần');
  const hasThuong = hasGod('Thương Quan');
  readings.push({
    area: 'children',
    paragraphs: [{
      hook: hasThuc ? 'Quan hệ giữa bạn và thế hệ sau ngập tràn sự thấu hiểu, dịu dàng và nuôi dưỡng sự sáng tạo.' : hasThuong ? 'Sự tự do, cá tính và tính cách bộc trực sẽ định hình thế hệ kế cận của bạn.' : 'Thế hệ sau hoặc các ý tưởng sáng tạo của bạn cần thời gian ươm mầm để nở hoa.',
      effectParagraphs: [
        hasThuc ? 'Thực Thần mang lại lộc ăn uống, sự bình an và con cái hiển đạt, ngoan ngoãn. Sáng tạo đến với bạn một cách tự nhiên như hơi thở.' : hasThuong ? 'Thương Quan biểu thị sự thông minh sắc sảo, sự nổi loạn và phản kháng. Con cái của bạn có cá tính mạnh, đòi hỏi sự chỉ dẫn kiên nhẫn thay vì áp đặt.' : 'Con cái và những dự án cá nhân đôi khi không đến ngay lập tức. Cần tích lũy nghiệp nội lực để gặt hái sau này.',
      ],
      nuance: 'Sự kỳ vọng quá lớn vào con cái hoặc vào tác phẩm do mình tạo ra thường mang lại thất vọng cho cả đôi bên.',
      cause: 'Thực Thương đại diện cho sự sinh xuất, bao gồm con cái (với nữ giới), sự sáng tạo và năng lượng nói ra.',
      tip: 'Cách bạn gieo trồng và nuôi dạy thế hệ sau (hoặc một dự án mới) chính là sự tiếp nối di sản của cuộc đời mình.'
    }]
  });

  // 11. LOVE
  readings.push({
    area: 'love',
    paragraphs: [{
      hook: 'Góc nhìn về tình yêu và hôn nhân của bạn được dệt nên từ những kỳ vọng sâu kín ở trụ ngày.',
      effectParagraphs: [
        `${profile.relationship}`,
        chart.thanSat.some(t => t.nameVi === 'Đào Hoa' || t.nameVi === 'Hồng Diễm') ? 'Với sự xuất hiện của các sao tình ái như Đào Hoa/Hồng Diễm, sức hút của bạn vô cùng mãnh liệt. Bạn luôn nhận được sự chú ý đặc biệt từ người khác phái.' : 'Tình yêu đối với bạn ưu tiên sự chân thành và thực tế hơn là những lãng mạn thoáng qua.'
      ],
      nuance: 'Hào quang tình ái rực rỡ mang đến nhiều sự lựa chọn nhưng cũng đi kèm với rủi ro thị phi và vướng mắc cảm xúc.',
      cause: 'Nhật Chi (Địa Chi trụ ngày) và sự tương tác với Tài/Quan Tinh định hình toàn bộ đời sống tình cảm.',
      tip: 'Tình cảm là tấm gương phản chiếu chính mình. Thấu hiểu những khuôn mẫu gắn kết sẽ mở đường cho quan hệ bền vững.'
    }]
  });

  // 12. SIBLINGS
  readings.push({
    area: 'siblings',
    paragraphs: [{
      hook: 'Tình anh em, đồng đội là một phần mảnh ghép quan trọng xây đắp nên tính cách của bạn.',
      effectParagraphs: [
        chart.thapThan.filter(t => t.god === 'Tỉ Kiên' || t.god === 'Kiếp Tài').length > 2 ? 'Lá số có nhiều Tỉ Kiên, Kiếp Tài, anh chị em và bạn bè đóng vai trò trung tâm trong cuộc đời bạn. Bạn có tinh thần trượng nghĩa, nhiệt thành chia sẻ đắng cay ngọt bùi.' : 'Anh chị em trong nhà thường có cuộc sống độc lập, ít tương tác hoặc bạn lớn lên với cảm giác tĩnh lặng tự vươn lên.',
      ],
      nuance: 'Sự gần gũi quá mức hoặc lòng tin tuyệt đối đôi khi có thể bị lợi dụng, sinh ra những món nợ ân tình khó trả.',
      cause: 'Tỉ Kiên đại diện cho sự sẻ chia tài nguyên, anh em ruột thịt và bạn bè đồng lứa.',
      tip: 'Gắn kết, hỗ trợ đúng cách cùng anh chị em và bạn bè giúp bạn xây dựng nền móng xã hội đầu tiên.'
    }]
  });

  return readings;
}
