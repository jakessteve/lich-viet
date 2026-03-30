export interface StarDictionaryEntry {
  id: string;
  name: string;
  element: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';
  type: 'Chính Tinh' | 'Phụ Tinh Lục Sát' | 'Phụ Tinh Lục Cát' | 'Khác';
  coreAttributes: string[];
  menh: {
    personality: string[];
    strengths: string[];
    weaknesses: string[];
  };
  quanLoc: {
    suitableCareers: string[];
    workStyle: string[];
    challenges: string[];
  };
  tatAch: {
    vulnerableSystems: string[];
    stressResponse: string;
    advice: string;
  };
  phuThe: {
    attractionPattern: string;
    partnerTraits: string[];
    conflictTrigger: string;
  };
  taiBach: {
    moneyMindset: string;
    incomeSources: string[];
    financialFlaw: string;
  };
  phuMau: {
    parentalInfluence: string;
    childhoodEnvironment: string;
    healingPath: string;
  };
  phucDuc: {
    karmicLesson: string;
    innerPeace: string;
    ancestralBlessing: string;
  };
  dienTrach: {
    livingEnvironment: string;
    realEstateLuck: string;
    homeVibe: string;
  };
  thienDi: {
    socialPersona: string;
    travelLuck: string;
    dangerZone: string;
  };
  noBoc: {
    leadershipStyle: string;
    friendshipQuality: string;
    betrayalRisk: string;
  };
  tuTuc: {
    parentingStyle: string;
    childTraits: string[];
    geneticLegacy: string;
  };
  huynhDe: {
    siblingDynamics: string;
    collaborationStyle: string;
    supportNetwork: string;
  };
}

export const tuviPdfDictionary: Record<string, StarDictionaryEntry> = {
  LiemTrinh: {
    id: 'LiemTrinh',
    name: 'Liêm Trinh',
    element: 'Hỏa',
    type: 'Chính Tinh',
    coreAttributes: ['Đào hoa', 'Nguyên tắc', 'Nóng nảy', 'Sáng tạo'],
    menh: {
      personality: ['Chính trực', 'Bảo thủ', 'Sáng tạo xuất chúng'],
      strengths: ['Khả năng chịu áp lực cao', 'Năng lực lãnh đạo bẩm sinh', 'Quyến rũ'],
      weaknesses: ['Nóng nảy', 'Khó thỏa hiệp', 'Cực đoan trong cảm xúc']
    },
    quanLoc: {
      suitableCareers: ['Chính trị', 'Quân đội', 'Nghệ thuật', 'Công nghệ cao', 'Khởi nghiệp'],
      workStyle: ['Quyết liệt', 'Đòi hỏi sự hoàn hảo', 'Không ngại va chạm'],
      challenges: ['Dễ mâu thuẫn với cấp trên', 'Tham việc quá mức']
    },
    tatAch: {
      vulnerableSystems: ['Hệ thần kinh', 'Tim mạch', 'Huyết áp', 'Mắt'],
      stressResponse: 'Cáu gắt, mất ngủ, bùng nổ cảm xúc đột ngột.',
      advice: 'Cần các bài tập giải tỏa căng thẳng như chạy bộ cường độ cao hoặc thiền động để xả năng lượng Hỏa dư thừa.'
    },
    phuThe: {
      attractionPattern: 'Bị thu hút bởi người có cá tính mạnh, tài năng nổi bật.',
      partnerTraits: ['Quyến rũ', 'Ghen tuông', 'Độc lập'],
      conflictTrigger: 'Sự kiểm soát quá mức hoặc cảm giác bị lừa dối.'
    },
    taiBach: {
      moneyMindset: 'Kiếm tiền dựa vào tài năng chuyên môn và các mối quan hệ xã hội. Rất nhạy bén với cơ hội.',
      incomeSources: ['Kinh doanh tự do', 'Nghệ thuật, thiết kế', 'Môi giới, trung gian'],
      financialFlaw: 'Dễ vung tay quá trán vì sĩ diện hoặc đầu tư mạo hiểm theo cảm xúc.'
    },
    phuMau: {
      parentalInfluence: 'Cha mẹ là người nghiêm khắc nhưng rất thương con. Có thể khắc khẩu nhưng sâu thẳm rất gắn kết.',
      childhoodEnvironment: 'Được rèn giũa tính tự lập từ sớm.',
      healingPath: 'Học cách bao dung và bày tỏ tình cảm trực tiếp thay vì hành động gián tiếp.'
    },
    phucDuc: {
      karmicLesson: 'Học cách buông bỏ sự chấp niệm và kiểm soát cơn giận.',
      innerPeace: 'Tìm thấy bình yên khi được tự do sáng tạo và cống hiến cho đam mê.',
      ancestralBlessing: 'Được hưởng phúc về mặt trí tuệ và sự dũng cảm từ tổ tiên.'
    },
    dienTrach: {
      livingEnvironment: 'Thích không gian bài trí nghệ thuật, có gu thẩm mỹ riêng.',
      realEstateLuck: 'Có duyên buôn bán bất động sản nhưng cần cẩn trọng pháp lý.',
      homeVibe: 'Nhà cửa gọn tự do, có chỗ làm việc riêng biệt để thỏa mãn tính độc lập.'
    },
    thienDi: {
      socialPersona: 'Xã giao xuất chúng, ra ngoài được nhiều người nể trọng, quý mến.',
      travelLuck: 'Rất có duyên đi xa lập nghiệp hoặc làm việc với đối tác ngoại quốc.',
      dangerZone: 'Cẩn thận vướng vào rắc rối thị phi, tranh chấp kiện tụng khi đi xa.'
    },
    noBoc: {
      leadershipStyle: 'Lãnh đạo bằng sự gương mẫu và quyền uy, đôi khi áp đặt.',
      friendshipQuality: 'Chơi với bạn hết mình nhưng yêu cầu sự trung thành tuyệt đối.',
      betrayalRisk: 'Dễ bị phản bội bởi những người từng chịu ơn mình.'
    },
    tuTuc: {
      parentingStyle: 'Khắt khe, chú trọng rèn luyện kỷ luật và đạo đức cho con.',
      childTraits: ['Cá tính mạnh', 'Thông minh', 'Có thiên hướng nghệ thuật'],
      geneticLegacy: 'Truyền lại cho con sự kiên cường và lòng tự trọng cao.'
    },
    huynhDe: {
      siblingDynamics: 'Anh chị em ít ở gần nhau hoặc dễ khắc khẩu khi chung đụng.',
      collaborationStyle: 'Thích hợp tác sòng phẳng, phân minh, không thích mập mờ.',
      supportNetwork: 'Tự lực cánh sinh là chính, ít nhờ vả được anh em họ hàng.'
    }
  },
  PhaQuan: {
    id: 'PhaQuan',
    name: 'Phá Quân',
    element: 'Thủy',
    type: 'Chính Tinh',
    coreAttributes: ['Phá hoại', 'Đột phá', 'Hao tán', 'Dũng mãnh'],
    menh: {
      personality: ['Thích tự do', 'Ghét sự ràng buộc', 'Sẵn sàng phá vỡ quy tắc'],
      strengths: ['Dũng cảm', 'Khả năng tái tạo sau thất bại', 'Tiên phong'],
      weaknesses: ['Cả thèm chóng chán', 'Thiếu kiên nhẫn', 'Mạo hiểm thái quá']
    },
    quanLoc: {
      suitableCareers: ['Xây dựng', 'Kiến trúc', 'Vận tải', 'Cứu hỏa', 'Đầu tư rủi ro'],
      workStyle: ['Làm việc theo cảm hứng', 'Thích nhận dự án khó hoặc đang khủng hoảng'],
      challenges: ['Không chịu được công việc lặp đi lặp lại', 'Dễ bỏ dở giữa chừng']
    },
    tatAch: {
      vulnerableSystems: ['Hệ bài tiết', 'Thận', 'Cơ quan sinh sản', 'Tai nạn ngoại thương'],
      stressResponse: 'Trở nên khép kín hoặc thực hiện các hành vi tự hoại (ăn uống vô độ, tiêu tiền).',
      advice: 'Học cách tiết chế, duy trì giấc ngủ đều đặn. Cẩn trọng khi tham gia giao thông hoặc các môn thể thao mạo hiểm.'
    },
    phuThe: {
      attractionPattern: 'Thích mối quan hệ cuồng nhiệt, không lối mòn.',
      partnerTraits: ['Thú vị', 'Thất thường', 'Thích chinh phục'],
      conflictTrigger: 'Sự nhàm chán và cái tôi quá cao từ cả hai phía.'
    },
    taiBach: {
      moneyMindset: 'Kiếm tiền nhờ sự đột phá, dám chấp nhận rủi ro lớn để thu bạo lợi.',
      incomeSources: ['Đầu tư mạo hiểm', 'Mua bán đồ cũ, tái chế', 'Dự án khởi nghiệp'],
      financialFlaw: 'Bạo phát bạo tàn, dễ mất trắng nếu vung tay quá trán.'
    },
    phuMau: {
      parentalInfluence: 'Cha mẹ có thể trải qua nhiều thăng trầm, biến cố trong sự nghiệp hoặc hôn nhân.',
      childhoodEnvironment: 'Ít sự an định, thường phải tự thích nghi với những thay đổi lớn.',
      healingPath: 'Chấp nhận sự không hoàn hảo của đấng sinh thành và xây dựng nội lực.'
    },
    phucDuc: {
      karmicLesson: 'Học cách xây dựng lại từ đống tro tàn mà không oán trách vạn vật.',
      innerPeace: 'Chỉ thực sự bình yên sau khi dồn hết sức phá vỡ một ranh giới cũ kỹ.',
      ancestralBlessing: 'Sức sống mãnh liệt, ngã ở đâu đứng lên ở đó.'
    },
    dienTrach: {
      livingEnvironment: 'Thích thay đổi không gian sống, hay sửa chữa hoặc đập đi xây lại.',
      realEstateLuck: 'Có khả năng mua được nhà cũ giá rẻ rồi cải tạo bán giá cao.',
      homeVibe: 'Có thể hơi lộn xộn hoặc ngổn ngang do đang trong quá trình chuyển đổi.'
    },
    thienDi: {
      socialPersona: 'Người khai phá, mang năng lượng mạnh mẽ và đầy tính hành động ra bên ngoài.',
      travelLuck: 'Đi xa thường kèm theo sự kiện lớn hoặc những bước ngoặt bất ngờ.',
      dangerZone: 'Sự cuồng nhiệt quá mức dễ dẫn đến xích mích hoặc thương tích nơi đất khách.'
    },
    noBoc: {
      leadershipStyle: 'Lãnh đạo kiểu thủ lĩnh tiên phong, nhân viên nể sợ và sẵn sàng xông pha theo.',
      friendshipQuality: 'Chơi bạn bè sòng phẳng, nhiệt tình nhưng dễ chia tay đứt gánh vì xích mích cá nhân.',
      betrayalRisk: 'Dễ bị cấp dưới lợi dụng lúc suy yếu rồi lật đổ.'
    },
    tuTuc: {
      parentingStyle: 'Khuyến khích con tự do trải nghiệm, thậm chí là những trải nghiệm mạo hiểm.',
      childTraits: ['Ngang bướng', 'Độc lập', 'Nhiều năng lượng'],
      geneticLegacy: 'Tinh thần không bỏ cuộc dù trong bất kỳ hoàn cảnh nào.'
    },
    huynhDe: {
      siblingDynamics: 'Anh em mỗi người một ngả, ít khi sống chung vì cá tính đều mạnh.',
      collaborationStyle: 'Hợp tác dễ xảy ra gãy đổ nếu không chung lý tưởng từ đầu chí cuối.',
      supportNetwork: 'Tự gồng gánh khó khăn hơn là mở lời nhờ vả anh em họ hàng.'
    }
  },
  CuMon: {
    id: 'CuMon',
    name: 'Cự Môn',
    element: 'Thủy',
    type: 'Chính Tinh',
    coreAttributes: ['Ám tinh', 'Ngôn ngữ', 'Nghi ngờ', 'Nghiên cứu'],
    menh: {
      personality: ['Sắc sảo', 'Tư duy phản biện', 'Đa nghi'],
      strengths: ['Khả năng hùng biện', 'Phân tích logic', 'Thấy được lỗ hổng của vấn đề'],
      weaknesses: ['Thích bắt bẻ', 'Khó tin tưởng người khác', 'Dễ rước thị phi từ lời nói']
    },
    quanLoc: {
      suitableCareers: ['Luật sư', 'Giảng viên', 'Ngoại giao', 'Nghiên cứu khoa học', 'Cố vấn chiến lược'],
      workStyle: ['Lập luận chặt chẽ', 'Độc lập', 'Chú trọng chi tiết'],
      challenges: ['Bất đồng quan điểm gay gắt', 'Bị cô lập do quá thẳng thắn']
    },
    tatAch: {
      vulnerableSystems: ['Hệ tiêu hóa', 'Dạ dày', 'Cuống họng', 'Bệnh đường miệng'],
      stressResponse: 'Lo âu, đau dạ dày do rối loạn thần kinh thực vật.',
      advice: 'Cần chú ý chế độ ăn uống khi căng thẳng. Học cách tiết chế lời nói khi tức giận để bảo vệ năng lượng bản thân.'
    },
    phuThe: {
      attractionPattern: 'Cần một người có thể giao tiếp sâu sắc và đối thoại trí tuệ.',
      partnerTraits: ['Thông minh', 'Hay tranh luận', 'Khó tính'],
      conflictTrigger: 'Sự im lặng, thiếu giao tiếp hoặc bị lừa dối.'
    },
    taiBach: {
      moneyMindset: 'Kiếm tiền từ trí tuệ và lời nói, ưu tiên những việc sử dụng tri thức.',
      incomeSources: ['Luật sư', 'Giáo viên', 'Người phát ngôn', 'Nhà nghiên cứu'],
      financialFlaw: 'Dễ vướng vào rắc rối vì lời nói không khéo dẫn đến thiệt hại về kinh tế.'
    },
    phuMau: {
      parentalInfluence: 'Cha mẹ có thể là người hay soi xét, tranh biện, yêu thương qua chỉ trích.',
      childhoodEnvironment: 'Cảm thấy luôn bị phán xét hoặc thiếu một không gian yên bình.',
      healingPath: 'Học cách giao tiếp hòa bình, ngừng dùng ngôn từ làm vũ khí sát thương.'
    },
    phucDuc: {
      karmicLesson: 'Học cách bớt nghi kỵ, tin tưởng vào những điều tốt đẹp.',
      innerPeace: 'Tìm thấy bình yên khi được lắng nghe thực lòng và hiểu đúng ý.',
      ancestralBlessing: 'Sự sâu sắc về mặt trí tuệ từ nhiều thế hệ đi trước.'
    },
    dienTrach: {
      livingEnvironment: 'Thích nơi yên tĩnh, riêng tư để suy nghĩ học hành.',
      realEstateLuck: 'Có khả năng mua được bất động sản bằng lời nói thương lượng.',
      homeVibe: 'Nhà có thể hay xảy ra tranh cãi nhỏ nhặt vì sự khắt khe của chủ nhân.'
    },
    thienDi: {
      socialPersona: 'Tự tin phản biện, luôn muốn phân thắng bại trong các cuộc đàm phán.',
      travelLuck: 'Đi xa dễ gặp người bất đồng quan điểm nhưng lại giúp rèn luyện bản thân.',
      dangerZone: 'Nguy cơ bị đàm tiếu tước đi cơ hội và sự tín nhiệm ở những vùng đất mới.'
    },
    noBoc: {
      leadershipStyle: 'Yêu cầu sự rõ ràng tuyệt đối, thường chất vấn cấp dưới để tìm sự thật.',
      friendshipQuality: 'Rất kén chọn bạn bè, thường chơi với người có chung tần số tư duy.',
      betrayalRisk: 'Dễ nảy sinh hiểu lầm vì những lời nói thẳng quá mức cần thiết.'
    },
    tuTuc: {
      parentingStyle: 'Khắt khe, chú trọng truyền đạt từ ngữ và giáo dục tư duy phản biện.',
      childTraits: ['Nhanh miệng', 'Thích hỏi cung', 'Hoài nghi'],
      geneticLegacy: 'Khả năng hùng biện sắc sảo và năng lực tự bảo vệ bằng lý lẽ.'
    },
    huynhDe: {
      siblingDynamics: 'Anh em trong nhà hòa thuận theo kiểu "khẩu xà tâm phật", hay tranh cãi.',
      collaborationStyle: 'Cần hợp đồng minh bạch, mọi thứ phải được giấy trắng mực đen.',
      supportNetwork: 'Sẵn sàng tranh luận bảo vệ anh em nhưng ít khi dành lời nói ngọt ngào.'
    }
  },
  ThaiDuong: {
    id: 'ThaiDuong',
    name: 'Thái Dương',
    element: 'Hỏa',
    type: 'Chính Tinh',
    coreAttributes: ['Quyền lực', 'Phát tán', 'Bác ái', 'Danh tiếng'],
    menh: {
      personality: ['Quan minh chính đại', 'Thích giúp đỡ', 'Nóng nảy nhưng mau quên'],
      strengths: ['Tỏa sáng rực rỡ', 'Năng lực truyền cảm hứng', 'Luôn vươn lên'],
      weaknesses: ['Thích sĩ diện', 'Bao đồng', 'Khoe khoang']
    },
    quanLoc: {
      suitableCareers: ['Giám đốc', 'Chính khách', 'Truyền thông đại chúng', 'Tổ chức sự kiện'],
      workStyle: ['Bao quát vĩ mô', 'Lãnh đạo đội nhóm', 'Hướng tới mục tiêu lớn'],
      challenges: ['Quản lý vi mô kém', 'Kiệt sức do ôm đồm']
    },
    tatAch: {
      vulnerableSystems: ['Mắt', 'Tim', 'Hệ thần kinh', 'Đau đầu'],
      stressResponse: 'Căng thẳng vùng đầu, nhức mắt, huyết áp tăng cao.',
      advice: 'Học cách ủy quyền và nói "không". Không nên mang công việc về nhà.'
    },
    phuThe: {
      attractionPattern: 'Tìm kiếm người bạn đời có thể tự hào, mang lại thể diện.',
      partnerTraits: ['Danh giá', 'Quang minh', 'Có địa vị'],
      conflictTrigger: 'Sự thiếu tôn trọng hoặc để mất sĩ diện trước đám đông.'
    },
    taiBach: {
      moneyMindset: 'Rộng rãi, xởi lởi, kiếm được tiền và sẵn sàng chi trả để mua lấy danh dự.',
      incomeSources: ['Kinh doanh chính ngạch', 'Các công việc xã hội quy mô lớn', 'Hành chính sự nghiệp'],
      financialFlaw: 'Bốc đồng trong chi tiêu vì cái tôi và sĩ diện hão.'
    },
    phuMau: {
      parentalInfluence: 'Cha mẹ có thể rất nổi tiếng, đóng vai trò hình mẫu vĩ đại nhưng áp lực.',
      childhoodEnvironment: 'Luôn phải duy trì hình ảnh đứa con ngoan, hoàn hảo.',
      healingPath: 'Sống thành thật với những điểm chưa hoàn hảo của mình thay vì che đậy.'
    },
    phucDuc: {
      karmicLesson: 'Bài học về vinh quang và việc làm việc không cần sự hồi đáp (ban phát ánh sáng).',
      innerPeace: 'Bình yên tuyệt đối khi tỏa sáng và mang lại lợi ích cho cộng đồng.',
      ancestralBlessing: 'Được bảo hộ bởi dòng dõi danh gia, nhiều đời làm việc thiện.'
    },
    dienTrach: {
      livingEnvironment: 'Thích nhà to, thoáng, nhiều ánh sáng tự nhiên và gần mặt đường lớn.',
      realEstateLuck: 'Dễ có danh tiếng gắn liền với một cơ ngơi sầm uất.',
      homeVibe: 'Giao lưu nhiệt tình, thường tổ chức các buổi gặp gỡ sang trọng tại nhà.'
    },
    thienDi: {
      socialPersona: 'Thu hút sự chú ý đi tới đâu cũng nổi bật như ánh sáng ban ngày.',
      travelLuck: 'Đi xa càng có danh tiếng, được người xung quanh kỳ vọng và tôn vinh.',
      dangerZone: 'Trở nên hống hách, kiêu ngạo vì luôn cho mình là trung tâm.'
    },
    noBoc: {
      leadershipStyle: 'Chỉ đạo đường lối rõ ràng, quang minh chính đại, hào phóng với cấp dưới.',
      friendshipQuality: 'Tỏa hào quang và thích bảo bọc người yếu thế. Bạn bè thường nể phục.',
      betrayalRisk: 'Dễ bị lừa phỉnh bằng những lời tâng bốc.'
    },
    tuTuc: {
      parentingStyle: 'Khuyến khích sự tự hào gia tộc, thúc đẩy con tham gia vào ánh sáng xã hội.',
      childTraits: ['Nổi bật', 'Hào sảng', 'Sôi nổi'],
      geneticLegacy: 'Lòng can đảm và tư thế ngẩng cao đầu đối diện với xã hội.'
    },
    huynhDe: {
      siblingDynamics: 'Anh em có người xuất chúng, uy quyền, thường hỗ trợ và tự hào vì nhau.',
      collaborationStyle: 'Hợp tác trên nền tảng đôi bên cùng tỏa sáng, minh bạch công khai.',
      supportNetwork: 'Tự tin đứng ra bao bọc các anh em yếu kém.'
    }
  },
  ThaiAm: {
    id: 'ThaiAm',
    name: 'Thái Âm',
    element: 'Thủy',
    type: 'Chính Tinh',
    coreAttributes: ['Tài tinh', 'Nữ tính', 'Điền trạch', 'Cảm xúc'],
    menh: {
      personality: ['Ôn hòa', 'Nhạy cảm', 'Lãng mạn', 'Thích sạch sẽ'],
      strengths: ['Tư duy nghệ thuật', 'Khả năng quản lý tài chính', 'Thấu cảm cao'],
      weaknesses: ['Ủy mị', 'Dễ dao động', 'Sống thiên về quá khứ']
    },
    quanLoc: {
      suitableCareers: ['Bất động sản', 'Tài chính', 'Nghệ thuật', 'Lĩnh vực làm đẹp', 'Giáo dục'],
      workStyle: ['Lên kế hoạch cẩn thận', 'Tránh rủi ro', 'Đề cao sự ổn định'],
      challenges: ['Thiếu quyết đoán trong thời khắc quyết định', 'Bị cảm xúc chi phối']
    },
    tatAch: {
      vulnerableSystems: ['Thận', 'Nội tiết tố', 'Hệ thống sinh sản', 'Mắt'],
      stressResponse: 'Trầm cảm, thu mình, rối loạn giấc ngủ và nội tiết.',
      advice: 'Cần môi trường sống yên tĩnh, gần gũi thiên nhiên. Tránh thức khuya và làm việc quá sức.'
    },
    phuThe: {
      attractionPattern: 'Cần sự an toàn, chở che và lãng mạn.',
      partnerTraits: ['Chu đáo', 'Nhẹ nhàng', 'Có nền tảng tài chính'],
      conflictTrigger: 'Sự lạnh nhạt, vô tâm, hoặc cảm giác không được bảo vệ.'
    },
    taiBach: {
      moneyMindset: 'Rất biết cách tích lũy và lên kế hoạch chi tiêu. Ghét sự bấp bênh tài chính.',
      incomeSources: ['Kinh doanh bất động sản', 'Tài chính, kế toán', 'Nghệ thuật'],
      financialFlaw: 'Sự đa cảm khiến đôi lúc bỏ lỡ các cơ hội đầu tư táo bạo, sinh lời lớn.'
    },
    phuMau: {
      parentalInfluence: 'Ảnh hưởng từ người mẹ rất lớn. Tình thương nhẹ nhàng nhưng mang tính bảo bọc.',
      childhoodEnvironment: 'Lớn lên trong môi trường được nuôi dưỡng êm đềm, an toàn.',
      healingPath: 'Giải phóng tâm hồn khỏi bóng ma quá khứ và sự bao bọc quá mức.'
    },
    phucDuc: {
      karmicLesson: 'Học cách biến sự đa sầu đa cảm thành thấu cảm thay vì trói buộc chính mình.',
      innerPeace: 'Chỉ thật sự an yên trong sự tĩnh lặng của bóng đêm và được bao quanh bởi người thân.',
      ancestralBlessing: 'Phước lành về điền sản và khả năng cảm thụ nghệ thuật tinh tế.'
    },
    dienTrach: {
      livingEnvironment: 'Mua nhà ở những nơi có phong thủy đẹp, tĩnh lặng, ưu tiên sự sạch sẽ.',
      realEstateLuck: 'Có tay lộc rất lớn về kinh doanh đất đai nhà cửa, để dành tài sản mượt mà.',
      homeVibe: 'Biến ngôi nhà thành tổ ấm thực thụ, tinh tế và ngập tràn tình yêu thương.'
    },
    thienDi: {
      socialPersona: 'Dịu dàng, từ tốn, khiêm nhường nhưng âm thầm quản lý mọi thứ.',
      travelLuck: 'Đi đến những vùng xa lạ thường đem lại cơ hội lớn về điền sản.',
      dangerZone: 'Trở nên quá nhạy cảm với lời phê bình bên ngoài, sợ hãi đám đông.'
    },
    noBoc: {
      leadershipStyle: 'Lãnh đạo bằng tình cảm, thấu hiểu nhân viên như thành viên gia đình.',
      friendshipQuality: 'Chơi với bạn chân thành, kín đáo, thường lắng nghe bạn bè sẻ chia tâm sự.',
      betrayalRisk: 'Dễ bị tổn thương tâm lý sâu sắc nếu bị bạn thân lừa dối.'
    },
    tuTuc: {
      parentingStyle: 'Nuôi dưỡng bao bọc, lo lắng từng miếng ăn giấc ngủ cho con cái.',
      childTraits: ['Đa cảm', 'Giống mẹ', 'Khéo léo'],
      geneticLegacy: 'Tài năng nghệ thuật tinh tế và lối sống ân cần chu đáo.'
    },
    huynhDe: {
      siblingDynamics: 'Anh em thường là nữ nhiều hơn nam, chăm lo và hỗ trợ nhau từ phía sau.',
      collaborationStyle: 'Thích sự hợp tác an toàn, cam kết dài hạn và không xô bồ.',
      supportNetwork: 'Điểm tựa tinh thần vững chãi nhất đến từ những người ruột thịt.'
    }
  },
  ThienDong: {
    id: 'ThienDong',
    name: 'Thiên Đồng',
    element: 'Thủy',
    type: 'Chính Tinh',
    coreAttributes: ['Phúc tinh', 'Trẻ trung', 'Thay đổi', 'Hưởng thụ'],
    menh: {
      personality: ['Lạc quan', 'Trẻ trung', 'Hay thay đổi', 'Hòa đồng'],
      strengths: ['Khả năng thích nghi tuyệt vời', 'Nhiều may mắn bẩm sinh', 'Không để bụng'],
      weaknesses: ['Thiếu kiên nhẫn', 'Sợ áp lực', 'Ham vui']
    },
    quanLoc: {
      suitableCareers: ['Du lịch', 'Thời trang', 'Giải trí', 'F&B (Ẩm thực)', 'Tự do'],
      workStyle: ['Làm việc theo nhóm', 'Không thích gò bó', 'Yêu cầu sự đổi mới'],
      challenges: ['Nhảy việc liên tục', 'Khó thăng tiến lên các vị trí quản lý khắc nghiệt']
    },
    tatAch: {
      vulnerableSystems: ['Hệ tiêu hóa', 'Ruột', 'Bàng quang', 'Các bệnh do ăn uống'],
      stressResponse: 'Ăn uống vô độ, né tránh vấn đề.',
      advice: 'Vận động thường xuyên để tiêu hao năng lượng. Quản lý chế độ ăn uống nghiêm ngặt.'
    },
    phuThe: {
      attractionPattern: 'Thích tình yêu nhẹ nhàng, lãng mạn như phim.',
      partnerTraits: ['Hài hước', 'Tâm lý', 'Trẻ trung'],
      conflictTrigger: 'Sự trưởng thành ép buộc và sự khô khan trong đời sống.'
    },
    taiBach: {
      moneyMindset: 'Kiếm tiền chủ yếu thông qua các ngành dịch vụ, giải trí hoặc tay trái nghệ thuật.',
      incomeSources: ['Du lịch', 'Thời trang', 'Giải trí', 'F&B (Ẩm thực)', 'Làm sáng tạo'],
      financialFlaw: 'Hay thay đổi định hướng nghề nghiệp, dễ hao tài vì sở thích hưởng thụ.'
    },
    phuMau: {
      parentalInfluence: 'Cha mẹ thường là người vui vẻ, thoải mái, có đôi phần trẻ trung.',
      childhoodEnvironment: 'Lớn lên trong môi trường tự do trải nghiệm, ít áp lực.',
      healingPath: 'Tự chịu trách nhiệm cho các quyết định thay vì chờ đợi gia đình bao bọc.'
    },
    phucDuc: {
      karmicLesson: 'Học cách nhẫn nại thay vì bỏ cuộc giữa chừng khi gặp khó khăn.',
      innerPeace: 'Tìm thấy tự do và hạnh phúc trong những trải nghiệm và niềm vui giản dị.',
      ancestralBlessing: 'Nhận được sự thanh thản và thoát hiểm nhờ năng lượng tươi vui mang gen di truyền.'
    },
    dienTrach: {
      livingEnvironment: 'Thích nơi ở dễ thay đổi công năng, có phong cách decor vui nhộn, màu sắc.',
      realEstateLuck: 'Có tài thao lược mua bán đồ đạc, cải tạo nhà cửa, lộc buôn bán bất động sản linh hoạt.',
      homeVibe: 'Nhà có bầu không khí mở, thoải mái sinh hoạt, thường thay đổi bố cục.'
    },
    thienDi: {
      socialPersona: 'Người mang lại tiếng cười, luôn tỏ ra vô âu vô lo trước người khác.',
      travelLuck: 'Rất hay xuất ngoại hoặc di chuyển thường xuyên, mỗi chuyến đi là một trải nghiệm.',
      dangerZone: 'Sự bồng bột, mải vui dễ lạc lõng hoặc quên phòng bị.'
    },
    noBoc: {
      leadershipStyle: 'Thoải mái với nhân viên, không áp đặt quy chế khắt khe, xây dựng môi trường như gia đình.',
      friendshipQuality: 'Chơi với bạn hết mình, nhiều mối quan hệ vì tính cách hóm hỉnh.',
      betrayalRisk: 'Dễ tin người, không phân biệt rõ ràng cấp trên cấp dưới.'
    },
    tuTuc: {
      parentingStyle: 'Nuôi dạy con như hai người bạn, không áp đặt mong muốn.',
      childTraits: ['Vui vẻ', 'Khoan dung', 'Trẻ trung'],
      geneticLegacy: 'Lạc quan và sự tươi tắn từ sâu bên trong.'
    },
    huynhDe: {
      siblingDynamics: 'Anh em vui vẻ, dễ hòa đồng nhưng thường ở xa nhau hoặc không ai quản ai.',
      collaborationStyle: 'Hợp tác trên nền tảng sự tươi trẻ và không khí thoải mái.',
      supportNetwork: 'Luôn tìm thấy anh em bên cạnh để nhậu nhẹt, xõa stress.'
    }
  },
  ThienCo: {
    id: 'ThienCo',
    name: 'Thiên Cơ',
    element: 'Mộc',
    type: 'Chính Tinh',
    coreAttributes: ['Trí tuệ', 'Biến động', 'Từ thiện', 'Mưu trí'],
    menh: {
      personality: ['Nhân từ', 'Thông min', 'Sáng tạo', 'Hay lo nghĩ'],
      strengths: ['Hiểu biết rộng', 'Lên kế hoạch giỏi', 'Khéo léo'],
      weaknesses: ['Suy nghĩ quá nhiều', 'Nhạy cảm thần kinh', 'Thiếu quyết đoán']
    },
    quanLoc: {
      suitableCareers: ['Cố vấn', 'Thiết kế hệ thống', 'Phân tích dữ liệu', 'Tôn giáo', 'Giáo dục'],
      workStyle: ['Dùng trí tuệ thay vì sức lực', 'Thích làm quân sư hơn làm vua'],
      challenges: ['Căng thẳng trí óc', 'Ngại đối mặt trực diện với xung đột']
    },
    tatAch: {
      vulnerableSystems: ['Gan', 'Mật', 'Suy nhược thần kinh', 'Xương khớp'],
      stressResponse: 'Rối loạn lo âu, đau đầu, cơ thể nhức mỏi do căng cứng cơ.',
      advice: 'Cần thời gian ngắt kết nối với công việc để thiền định hoặc hòa mình vào thiên nhiên.'
    },
    phuThe: {
      attractionPattern: 'Cần sự đồng điệu về mặt trí tuệ và đạo đức.',
      partnerTraits: ['Hiền lành', 'Thông minh', 'Trí thức', 'Lớn tuổi hơn'],
      conflictTrigger: 'Sự khác biệt về giá trị sống và đạo đức.'
    },
    taiBach: {
      moneyMindset: 'Tiền đẻ ra tiền, tập trung đầu tư mưu trí thay vì làm tay chân.',
      incomeSources: ['Cổ phiếu', 'Tư vấn', 'Kỹ thuật số', 'Nghiên cứu'],
      financialFlaw: 'Trường hợp suy tính quá cẩn thận dẫn đến bỏ lỡ cơ hội lớn.'
    },
    phuMau: {
      parentalInfluence: 'Cha mẹ có thể là người giáo dục nghiêm khắc hoặc định hướng đường học hành.',
      childhoodEnvironment: 'Cảm nhận áp lực nhưng có được tư duy nhạy bén.',
      healingPath: 'Rèn luyện khả năng ngừng suy nghĩ, cân bằng đời sống tinh thần.'
    },
    phucDuc: {
      karmicLesson: 'Học cách biến kiến thức thành trực giác thay vì tính toán logic tuyệt đối.',
      innerPeace: 'Chỉ an tĩnh khi hệ thống suy nghĩ tự động được tắt đi trong giây lát.',
      ancestralBlessing: 'Sự khôn ngoan và tài năng suy luận logic thừa hưởng từ gia tộc.'
    },
    dienTrach: {
      livingEnvironment: 'Nhà có nhiều thiết bị hiện đại, thông minh hoặc ngăn nắp khoa học.',
      realEstateLuck: 'Có khả năng đánh giá giá trị bất động sản qua số liệu phân tích.',
      homeVibe: 'Nơi có nhiều sách, tài liệu hoặc góc học tập tĩnh.',
    },
    thienDi: {
      socialPersona: 'Uyên bác, luôn biết cách đưa ra lời khuyên hoặc mẹo vặt khi người khác cần.',
      travelLuck: 'Đi xa để học tập, tu nghiệp và quan sát thế giới qua lăng kính tư duy.',
      dangerZone: 'Trầm cảm do tư duy rối bời ở môi trường quá bất ổn.'
    },
    noBoc: {
      leadershipStyle: 'Điều hành bằng quy trình làm việc được thiết lập bài bản, rõ ràng.',
      friendshipQuality: 'Kết giao có chọn lọc, kết bạn dựa trên giá trị trao đổi.',
      betrayalRisk: 'Dễ nảy sinh lục đục vì tính toán lợi ích quá chi li với bạn bè.'
    },
    tuTuc: {
      parentingStyle: 'Tập trung phát triển kỹ năng quan sát, tư duy chiến lược cho con.',
      childTraits: ['Gọn gàng', 'Thích hỏi "Tại sao"', 'Lập luận tốt'],
      geneticLegacy: 'Khả năng tư duy chiến thuật đỉnh cao.'
    },
    huynhDe: {
      siblingDynamics: 'Anh em thường đều có trí lớn, thường hay thi thố ngầm về thành quả học tập, công việc.',
      collaborationStyle: 'Làm việc cần có ranh giới rõ ràng về kế hoạch thực hiện.',
      supportNetwork: 'Nhờ vả chủ yếu về mặt tham vấn thông tin hơn là hỗ trợ trực tiếp.'
    }
  },
  ThienLuong: {
    id: 'ThienLuong',
    name: 'Thiên Lương',
    element: 'Thổ',
    type: 'Chính Tinh',
    coreAttributes: ['Ấm tinh', 'Sư trưởng', 'Thọ tinh', 'Nguyên tắc'],
    menh: {
      personality: ['Chín chắn', 'Bao dung', 'Thích dạy bảo người khác', 'Bảo thủ'],
      strengths: ['Đáng tin cậy', 'Có nguyên tắc', 'Sẵn sàng che chở'],
      weaknesses: ['Cứng nhắc', 'Thích bề trên', 'Dễ bị lừa vì quá tốt']
    },
    quanLoc: {
      suitableCareers: ['Giáo dục', 'Y tế', 'Chăm sóc xã hội', 'Thanh tra', 'Thẩm phán'],
      workStyle: ['Làm việc theo quy trình', 'Trách nhiệm cao', 'Khắt khe'],
      challenges: ['Khó chấp nhận cái mới', 'Dễ mâu thuẫn nếu thấy sai trái']
    },
    tatAch: {
      vulnerableSystems: ['Tỳ vị', 'Dạ dày', 'Da liễu', 'Bệnh người già'],
      stressResponse: 'Đau dạ dày, mệt mỏi, chán ăn.',
      advice: 'Học cách linh hoạt hơn, không nên gánh vác quá nhiều cho người khác để tránh suy kiệt.'
    },
    phuThe: {
      attractionPattern: 'Tìm kiếm sự ổn định, an toàn và trách nhiệm.',
      partnerTraits: ['Chững chạc', 'Có trách nhiệm', 'Gia giáo'],
      conflictTrigger: 'Sự tùy tiện, thiếu trách nhiệm, phá vỡ quy tắc.'
    },
    taiBach: {
      moneyMindset: 'Kiếm được đồng tiền sạch sẽ, coi thường đồng tiền phi pháp.',
      incomeSources: ['Nghề y', 'Giáo sư', 'Bảo hiểm', 'Công tác xã hội'],
      financialFlaw: 'Có thể đánh mất cơ hội kiếm tiền vì quá giữ nguyên tắc bảo thủ.'
    },
    phuMau: {
      parentalInfluence: 'Cha mẹ cực kỳ nguyên tắc và đòi hỏi kỷ luật cao.',
      childhoodEnvironment: 'Lớn lên với những hình mẫu khuôn thước hoặc giáo lý tín ngưỡng.',
      healingPath: 'Tha thứ cho sự không hoàn hảo ở những người có vị trí bậc trên.'
    },
    phucDuc: {
      karmicLesson: 'Học cách làm việc đúng đắn mà không mưu cầu đền đáp.',
      innerPeace: 'Cảm thầy bình an khi được là cánh chim che chở cho cộng đồng nhỏ.',
      ancestralBlessing: 'Sự che đỡ thoát hiểm trong tấc gang nhờ tu dưỡng nghiệp thiện.'
    },
    dienTrach: {
      livingEnvironment: 'Mua nhà ở những nơi an toàn, có lề thói truyền thống gia phong.',
      realEstateLuck: 'Hơi khó khăn trong việc kinh doanh vì không khéo miệng.',
      homeVibe: 'Nơi tràn đầy sự uy nghiêm của tình thân, hơi hướng gia giáo.'
    },
    thienDi: {
      socialPersona: 'Luôn xuất hiện như một bô lão hoặc chuyên gia có chuyên môn sâu.',
      travelLuck: 'Đi xa ra nước ngoài dễ làm thiện nguyện hoặc giảng bài.',
      dangerZone: 'Trở nên cứng nhắc cổ hủ khiến người ở xa khó tiếp xúc.'
    },
    noBoc: {
      leadershipStyle: 'Gánh vác trách nhiệm bảo bọc, coi cấp dưới như đàn em cần uốn nắn.',
      friendshipQuality: 'Sẵn sàng đứng ra thu xếp rắc rối cho bạn. Bạn bè rất tin cậy.',
      betrayalRisk: 'Dễ bị người được mình giúp đỡ lợi dụng sự cả nể, tận tụy.'
    },
    tuTuc: {
      parentingStyle: 'Kỷ luật, chú trọng uốn nắn đạo đức, hướng con đến những điều tử tế.',
      childTraits: ['Ngoan ngoãn', 'Chững chạc', 'Quy củ hơi thái quá'],
      geneticLegacy: 'Lối sống lương thiện, lấy lễ độ làm kim chỉ nam.'
    },
    huynhDe: {
      siblingDynamics: 'Tính trách nhiệm khiến có khuynh hướng làm rường cột cho anh em.',
      collaborationStyle: 'Làm việc theo khuôn phép cũ, an toàn tuyệt đối.',
      supportNetwork: 'Anh em chia sẻ một phần gánh nặng nhưng ít khi đủ sâu sát.'
    }
  },
  KinhDuong: {
    id: 'KinhDuong',
    name: 'Kình Dương',
    element: 'Kim',
    type: 'Phụ Tinh Lục Sát',
    coreAttributes: ['Sát phạt', 'Độc lập', 'Tai nạn', 'Đột phá'],
    menh: {
      personality: ['Tính khí nóng nảy', 'Kiên quyết', 'Dám nghĩ dám làm'],
      strengths: ['Ý chí sắt đá', 'Năng lực vượt khó', 'Khả năng đột phá'],
      weaknesses: ['Hiếu chiến', 'Thu hút mâu thuẫn', 'Cô độc']
    },
    quanLoc: {
      suitableCareers: ['Quân đội', 'Y học (Ngoại khoa)', 'Kỹ thuật cơ khí', 'Võ thuật'],
      workStyle: ['Hành động nhanh', 'Tiên phong', 'Giải quyết vấn đề bằng vũ lực/áp lực'],
      challenges: ['Tranh chấp thương trường', 'Dễ bị kiện cáo, xích mích']
    },
    tatAch: {
      vulnerableSystems: ['Ngoại thương', 'Phẫu thuật', 'Phổi', 'Khí quản'],
      stressResponse: 'Phản ứng thái quá, dễ gây hấn hoặc tự làm tổn thương bản thân.',
      advice: 'Cần hết sức cẩn trọng với vật sắc nhọn, tai nạn xe cộ. Học cách kiềm chế sự tức giận.'
    },
    phuThe: {
      attractionPattern: 'Tình yêu sét đánh hoặc những mối quan hệ đầy sóng gió.',
      partnerTraits: ['Cá tính mạnh', 'Nóng nảy', 'Hay ghen'],
      conflictTrigger: 'Đấu khẩu, va chạm vật lý, không nhường nhịn nhau.'
    },
    taiBach: {
      moneyMindset: 'Tham vọng bá đạo, kiếm tiền bằng sự đột phá và cạnh tranh tàn bạo.',
      incomeSources: ['Quốc phòng', 'Thị trường tự do', 'Sát phạt (chứng khoán)', 'Săn bắn cơ hội'],
      financialFlaw: 'Bạo phát bạo tàn, dễ mất sạch trong chớp mắt vì máu me ăn thua.'
    },
    phuMau: {
      parentalInfluence: 'Thể chất hay trí tuệ thường chịu sự kiểm soát nghiêm ngặt của gia đình.',
      childhoodEnvironment: 'Cạnh tranh cao hệt như thao trường, một mất một còn.',
      healingPath: 'Kiểm soát những cơn giận bắt nguồn từ sự kìm kẹp nội tâm.'
    },
    phucDuc: {
      karmicLesson: 'Học cách sử dụng sức mạnh để bảo vệ, không để phá hoại tổn thương.',
      innerPeace: 'Chỉ an tĩnh sau một tràng phân định cao thấp rõ ràng.',
      ancestralBlessing: 'Sức đề kháng mãnh liệt hoặc năng lực sát nghiệp che chở.'
    },
    dienTrach: {
      livingEnvironment: 'Thiết kế gọn gàng, góc cạnh, sắc bén như phong cách kỹ thuật.',
      realEstateLuck: 'Buôn bất động sản có lộc nhưng cũng rất dễ sinh chuyện thưa kiện.',
      homeVibe: 'Nhà có thể giống công ty, có yếu tố bảo vệ rất cao (hàng rào thép, vũ khí dự trữ).'
    },
    thienDi: {
      socialPersona: 'Là người thích chinh phục, đi đến đâu luôn mang không khí đấu tranh.',
      travelLuck: 'Đi đến nơi xa phải va chạm liên tục để tranh giành ảnh hưởng.',
      dangerZone: 'Tranh chấp đụng độ trực tiếp dễ chuốc lấy thương tích hoặc kiện tụng nguy hiểm.'
    },
    noBoc: {
      leadershipStyle: 'Thể hiện quyền lực cứng rắn, thưởng phạt siêu minh bạch.',
      friendshipQuality: 'Chơi với bạn cũng dễ phát sinh mâu thuẫn đối kháng.',
      betrayalRisk: 'Dễ dính vào những đòn sát phạt ngầm của những người làm việc ác.'
    },
    tuTuc: {
      parentingStyle: 'Khuyến khích con tham gia rèn luyện tính chiến đấu qua thể thao mạnh.',
      childTraits: ['Can trường', 'Cương quyết', 'Dám vượt khó'],
      geneticLegacy: 'Lưu lại sự không khoang nhượng và quả quyết.'
    },
    huynhDe: {
      siblingDynamics: 'Khó thân được lâu dài, tranh chấp có thể xảy ra trong di sản.',
      collaborationStyle: 'Hợp tác cũng giống như kết minh: chia tiền và minh bạch trên giấy.',
      supportNetwork: 'Thường độc lập chiến đấu và hiếm khi chia ngọt sẻ bùi với anh em.'
    }
  },
  TuVi: {
    id: 'TuVi',
    name: 'Tử Vi',
    element: 'Thổ',
    type: 'Chính Tinh',
    coreAttributes: ['Đế Tòa', 'Quyền lực', 'Lãnh đạo', 'Tôn quý'],
    menh: {
      personality: ['Đĩnh đạc', 'Gia trưởng', 'Tham vọng cao', 'Có uy uyển'],
      strengths: ['Khả năng tổ chức', 'Uy tín', 'Khả năng quy tụ người tài'],
      weaknesses: ['Độc đoán', 'Thích nịnh bợ', 'Cái tôi quá lớn']
    },
    quanLoc: {
      suitableCareers: ['Lãnh đạo cấp cao', 'Chính trị', 'Quản lý nhà nước', 'Kinh doanh tự thân'],
      workStyle: ['Đứng đầu', 'Chỉ đạo', 'Không chấp nhận vị thế phụ thuộc'],
      challenges: ['Khó làm việc dưới quyền người khác kém cỏi hơn mình']
    },
    tatAch: {
      vulnerableSystems: ['Hệ tiêu hóa', 'Dạ dày', 'Tỳ vị', 'Tâm bệnh do áp lực'],
      stressResponse: 'Gắng gượng, che giấu cảm xúc để giữ thể diện.',
      advice: 'Học cách buông bỏ bớt quyền kiểm soát. Thư giãn dạ dày bằng cách ăn uống chậm rãi.'
    },
    phuThe: {
      attractionPattern: 'Tìm kiếm người bạn đời xuất chúng, có thể làm trợ thủ đắc lực.',
      partnerTraits: ['Danh giá', 'Sang trọng', 'Biết phục tùng'],
      conflictTrigger: 'Sự thiếu tôn trọng hoặc việc đối phương vượt quyền.'
    },
    taiBach: {
      moneyMindset: 'Rất coi trọng thể diện, xem tiền bạc là thước đo quyền lực và sự tôn nghiêm.',
      incomeSources: ['Quản trị viên cấp cao', 'Chính trị', 'Giao dịch quy mô lớn'],
      financialFlaw: 'Có thể bị ảnh hưởng bởi sĩ diện hão dẫn đến thua lỗ vì vung tay quá trán.'
    },
    phuMau: {
      parentalInfluence: 'Gia trưởng và quản lý sát sao, áp đặt mục tiêu thành công.',
      childhoodEnvironment: 'Cảm giác gánh nặng trên vai, phải đạt kết quả vượt bậc để gia đình hãnh diện.',
      healingPath: 'Gạt bỏ uy quyền giả dối trước mặt người thân.'
    },
    phucDuc: {
      karmicLesson: 'Bài học về quyền lực và trách nhiệm đi kèm, không phải quyền lực vị kỷ.',
      innerPeace: 'Chỉ an tĩnh khi hệ thống xung quanh mình vào khuôn vào nếp.',
      ancestralBlessing: 'Sự oai nghiêm, lẫm liệt, và luôn có quý nhân trợ lực sinh tồn.'
    },
    dienTrach: {
      livingEnvironment: 'Mua nhà ở những nơi an toàn, sang trọng, thể hiện đẳng cấp.',
      realEstateLuck: 'Có khả năng mua và đầu tư bất động sản to, đẹp, vuông vắn.',
      homeVibe: 'Ngôi nhà mang tính uy nghi, không gian thoáng giúp làm mới tư duy độc lập.'
    },
    thienDi: {
      socialPersona: 'Uy nghi đĩnh đạc ra ngoài xã hội, ở đâu cũng thu hút được người làm tùy tùng.',
      travelLuck: 'Đi xa đến đâu cũng dễ làm trung tâm sự chú ý hoặc kết nối được người quyền lực.',
      dangerZone: 'Cao ngạo tột độ dễ gây mâu thuẫn trong môi trường cạnh tranh khốc liệt.'
    },
    noBoc: {
      leadershipStyle: 'Ân uy tịnh thi, quản lý bầy tôi theo triết lý tập trung sự quy phục.',
      friendshipQuality: 'Chơi trên vị thế bề trên. Bạn bè thường phải có sự nể sợ nhất định.',
      betrayalRisk: 'Nhân viên dưới quyền dễ lật lọng khi người đứng đầu có dấu hiệu suy tàn.'
    },
    tuTuc: {
      parentingStyle: 'Định hình sẵn tương lai trở thành người đứng đầu cho con.',
      childTraits: ['Gia trưởng từ bé', 'Thông minh đĩnh đạc', 'Dám nghĩ dám làm'],
      geneticLegacy: 'Lòng can đảm và tư thế làm chủ.'
    },
    huynhDe: {
      siblingDynamics: 'Có khoảng cách ngầm mặc dù lo toan chu đáo ở vai đàn anh đàn chị.',
      collaborationStyle: 'Hợp tác trên nền phân minh rõ chức quyền, địa vị.',
      supportNetwork: 'Thường sẵn sàng hỗ trợ bề tôi hoặc anh em xa cơ.'
    }
  },
  ThienPhu: {
    id: 'ThienPhu',
    name: 'Thiên Phủ',
    element: 'Thổ',
    type: 'Chính Tinh',
    coreAttributes: ['Ngân khố', 'Tích lũy', 'Ổn định', 'Bảo thủ'],
    menh: {
      personality: ['Cẩn trọng', 'Thực tế', 'Thích sự chắc chắn', 'Hưởng thụ'],
      strengths: ['Quản lý tài chính xuất sắc', 'Khả năng duy trì và bảo vệ thành quả'],
      weaknesses: ['Thiếu tính đột phá', 'Tính toán quá mức', 'Ngại mạo hiểm']
    },
    quanLoc: {
      suitableCareers: ['Tài chính', 'Ngân hàng', 'Kế toán', 'Bất động sản', 'Quản trị viên'],
      workStyle: ['Làm việc có hệ thống', 'Kiểm soát rủi ro', 'Đề cao sự an toàn'],
      challenges: ['Bỏ lỡ cơ hội lớn vì quá sợ rủi ro']
    },
    tatAch: {
      vulnerableSystems: ['Hệ tiêu hóa', 'Dạ dày', 'Tỳ vị', 'Các bệnh do ăn uống quá độ'],
      stressResponse: 'Tìm đến đồ ăn để giải tỏa căng thẳng.',
      advice: 'Tránh ăn no về đêm. Cần một chế độ tập luyện để tiêu hao năng lượng tích tụ.'
    },
    phuThe: {
      attractionPattern: 'Cần sự an toàn về mặt vật chất và gia đình.',
      partnerTraits: ['Vững chãi', 'Có tài sản', 'Sống thực tế'],
      conflictTrigger: 'Sự hoang phí hoặc những quyết định tài chính rủi ro của đối phương.'
    },
    taiBach: {
      moneyMindset: 'Rất cẩn trọng trong đầu tư, tiền đẻ ra tiền một cách an toàn.',
      incomeSources: ['Quản lý quỹ', 'Quy hoạch', 'Tín dụng', 'Kho bạc'],
      financialFlaw: 'Bỏ qua những cơ hội lớn do quá cẩn thận và ngại rủi ro.'
    },
    phuMau: {
      parentalInfluence: 'Cha mẹ có tài sản tích lũy, định hướng con cái theo hướng vững chắc.',
      childhoodEnvironment: 'No đủ nhưng có phần thực dụng và khuôn thước tính toán.',
      healingPath: 'Sống phóng khoáng hơn để cảm nhận hạnh phúc không đong đếm được bằng tiền.'
    },
    phucDuc: {
      karmicLesson: 'Bài học về sự cho đi và sự giàu có về tâm hồn, thay vì chỉ chăm chăm tích lũy vật chất.',
      innerPeace: 'Chỉ an tĩnh khi biết chắc khoản tiết kiệm dự phòng luôn đầy.',
      ancestralBlessing: 'Lộc lá đất đai dồi dào và gia sản lớn từ đời trước.'
    },
    dienTrach: {
      livingEnvironment: 'Thiết kế bền vững, thực dụng, tích trữ nhiều đồ trong kho.',
      realEstateLuck: 'Cực kỳ có tay lộc mua bán và giữ gìn điền sản không bị hao mòn.',
      homeVibe: 'Đầy đủ tiện nghi, an toàn vững chắc hệt như một kho báu riêng.'
    },
    thienDi: {
      socialPersona: 'Điềm đạm, chắc chắn, ra ngoài hay được giao giữ tiền móng.',
      travelLuck: 'Ít đi xa, thiên về mở rộng rễ bám tại địa phương hơn.',
      dangerZone: 'Trở nên tụt hậu do không chịu di chuyển và học hỏi cái mới.'
    },
    noBoc: {
      leadershipStyle: 'Theo dõi tiến độ chi tiết, cấp dưới cảm thấy an tâm vì sự vững chãi.',
      friendshipQuality: 'Chơi bền vững với số lượng bạn ít nhưng chất lượng. Chọn bạn sòng phẳng.',
      betrayalRisk: 'Dễ nảy sinh ganh ghét nếu đối xử thiên lệch quá nhiều về lợi ích.'
    },
    tuTuc: {
      parentingStyle: 'Đảm bảo nền tảng giáo dục vững chãi, lập tài khoản tiết kiệm từ sớm.',
      childTraits: ['Bảo thủ', 'Ngăn nắp', 'Thực dụng'],
      geneticLegacy: 'Bản năng bảo tồn tài sản gia đình tuyệt vời.'
    },
    huynhDe: {
      siblingDynamics: 'Gia đình đông anh em nhưng mạnh ai nấy tích lũy tài sản.',
      collaborationStyle: 'Góp vốn rõ ràng từng đồng nhưng có thể cam kết làm ăn lâu năm.',
      supportNetwork: 'Hỗ trợ nhau khi được chứng minh tính khả thi về mặt tài chính.'
    }
  },
  VuKhuc: {
    id: 'VuKhuc',
    name: 'Vũ Khúc',
    element: 'Kim',
    type: 'Chính Tinh',
    coreAttributes: ['Tài tinh', 'Hành động', 'Cô độc', 'Quyết liệt'],
    menh: {
      personality: ['Lạnh lùng', 'Quả quyết', 'Nghiêm túc', 'Trực tiếp'],
      strengths: ['Năng lực thực thi mạnh mẽ', 'Kiếm tiền giỏi', 'Chịu đựng áp lực cao'],
      weaknesses: ['Cô độc', 'Giao tiếp cứng nhắc', 'Thiếu sự mềm mỏng']
    },
    quanLoc: {
      suitableCareers: ['Tài chính', 'Kinh doanh', 'Quân đội', 'Công nghiệp nặng'],
      workStyle: ['Làm việc độc lập', 'Định hướng kết quả thực tế', 'Ít cảm xúc'],
      challenges: ['Thiếu kỹ năng mềm gây cản trở việc thăng tiến ở vị trí cần ngoại giao']
    },
    tatAch: {
      vulnerableSystems: ['Hệ hô hấp', 'Phổi', 'Xương khớp', 'Thanh quản'],
      stressResponse: 'Vùi đầu vào công việc, cắt đứt giao tiếp xã hội.',
      advice: 'Cần dành thời gian cho các mối quan hệ tình cảm để cân bằng lại sự khô khan của Kim.'
    },
    phuThe: {
      attractionPattern: 'Tình cảm không phải ưu tiên số một, thường kết hôn muộn kết hôn thực tế.',
      partnerTraits: ['Lạnh lùng tương tự', 'Có năng lực', 'Độc lập'],
      conflictTrigger: 'Sự dựa dẫm quá mức hoặc đòi hỏi quá nhiều cảm xúc sướt mướt.'
    },
    taiBach: {
      moneyMindset: 'Kiếm tiền bằng hành động cụ thể, quyết liệt, không nói suông.',
      incomeSources: ['Kinh doanh kim khí', 'Tài chính thực thi', 'Quân khu'],
      financialFlaw: 'Bị cô lập trong đầu tư, tự mình xoay xở nên dễ đứt gánh khi cạn sức.'
    },
    phuMau: {
      parentalInfluence: 'Gia đình thường giáo dục theo kiểu quân phiệt, lạnh nhạt tình cảm nhưng lo đủ vật chất.',
      childhoodEnvironment: 'Ít có sự vỗ về trìu mến, hình thành tính tự lập từ rất sớm.',
      healingPath: 'Tự học cách thể hiện tình thương với người kém may mắn hơn.'
    },
    phucDuc: {
      karmicLesson: 'Học cách làm việc cùng người khác và mở lòng, thay vì tự cô lập bản thân.',
      innerPeace: 'Chỉ an tĩnh sau khi tự mình hoàn thiện xong một dự án khó nhằn.',
      ancestralBlessing: 'Sự kiên cường và phúc lộc từ việc độc lập tạo dựng cơ đồ.'
    },
    dienTrach: {
      livingEnvironment: 'Thiết kế góc cạnh, kim loại, tối giản và mang tính ứng dụng cao.',
      realEstateLuck: 'Rất có duyên với các bất động sản liên quan đến công xưởng, khu công nghiệp.',
      homeVibe: 'Nhà có phần tĩnh lặng, ít người tới lui, thiếu hơi ấm gia đình nhưng cực kỳ an toàn.'
    },
    thienDi: {
      socialPersona: 'Người đàn ông/đàn bà thép, ra ngoài xã hội không ai dám nhờn mặt.',
      travelLuck: 'Phù hợp đi công tác xa để mở rộng thị trường, nhưng thường hay phải tác chiến độc lập.',
      dangerZone: 'Trở nên quá cực đoan hoặc thô lỗ khiến đối tác e ngại.'
    },
    noBoc: {
      leadershipStyle: 'Giao việc thẳng thắn, không nể nang, ai làm được thì theo, không thì nghỉ.',
      friendshipQuality: 'Rất ít bạn bè thân thiết, chủ yếu là đồng nghiệp chung chí hướng.',
      betrayalRisk: 'Dễ bị cấp dưới oán hận vì sự vô tình khô khan.'
    },
    tuTuc: {
      parentingStyle: 'Nuôi dạy con rất thực tế, định hướng nghề nghiệp kiếm tiền sớm.',
      childTraits: ['Ít nói', 'Tự lập', 'Nghiêm túc'],
      geneticLegacy: 'Năng lực sinh tồn và bản lĩnh độc lập.'
    },
    huynhDe: {
      siblingDynamics: 'Anh em thường mỗi người một phương, hình khắc và ít tâm sự.',
      collaborationStyle: 'Hợp tác trên nguyên tắc tiền trao cháo múc, không vì nể nang.',
      supportNetwork: 'Thường tự lực cánh sinh, khó nhận được dòng tiền hỗ trợ từ gia đình.'
    }
  },
  ThienTuong: {
    id: 'ThienTuong',
    name: 'Thiên Tướng',
    element: 'Thủy',
    type: 'Chính Tinh',
    coreAttributes: ['Ấn tinh', 'Trợ giúp', 'Khéo léo', 'Giao thiệp'],
    menh: {
      personality: ['Hòa nhã', 'Thích mỹ phục', 'Bao đồng', 'Ngoại giao giỏi'],
      strengths: ['Tạo dựng mối quan hệ cực tốt', 'Khả năng phò tá xuất sắc', 'Thấu tình đạt lý'],
      weaknesses: ['Dễ bị tác động bởi môi trường', 'Thiếu lập trường vững chắc', 'Cả nể']
    },
    quanLoc: {
      suitableCareers: ['Thư ký', 'Cố vấn', 'Nhân sự', 'Ngoại giao', 'Tiếp thị'],
      workStyle: ['Làm việc nhóm xuất sắc', 'Đứng phó giúp trưởng', 'Mềm mỏng'],
      challenges: ['Khó đưa ra quyết định tàn nhẫn khi cần thiết']
    },
    tatAch: {
      vulnerableSystems: ['Hệ bài tiết', 'Thận', 'Da liễu', 'Bàng quang'],
      stressResponse: 'Ăn uống tùy tiện, dị ứng da khi căng thẳng quá mức.',
      advice: 'Chú ý chất lượng nước uống. Tập cách từ chối để không bị kiệt sức vì chuyện của người khác.'
    },
    phuThe: {
      attractionPattern: 'Tìm kiếm người bạn đời có thể làm "minh chúa" để mình phò tá, hoặc ngược lại.',
      partnerTraits: ['Đẹp hình thức', 'Biết cách ứng xử', 'Lắng nghe'],
      conflictTrigger: 'Sự phản bội hoặc mất mặt trong giao tiếp xã hội.'
    },
    taiBach: {
      moneyMindset: 'Kiếm tiền nhờ kỹ năng mềm và khả năng phục vụ người khác.',
      incomeSources: ['Luật', 'Nhân sự', 'Hành chính công', 'Mô giới trung gian'],
      financialFlaw: 'Dễ vì quá tốt mà bảo lãnh nhầm người, sinh họa tiền bạc.'
    },
    phuMau: {
      parentalInfluence: 'Cha mẹ ngoại giao tốt, dạy con cách ăn nói ứng xử khôn khéo.',
      childhoodEnvironment: 'Hòa nhã, thường phải giữ mặt mũi cho gia đình.',
      healingPath: 'Sống thành thật với chính nhu cầu cá nhân thay vì luôn làm hài lòng bề trên.'
    },
    phucDuc: {
      karmicLesson: 'Học cách đưa ra quyết định độc lập, không dựa dẫm vào đám đông.',
      innerPeace: 'Cảm thấy bình an khi xử lý êm xuôi rắc rối cho tổ chức.',
      ancestralBlessing: 'Sự hòa nhã, tài năng ứng xử mang tính di truyền giúp thoát hiểm.'
    },
    dienTrach: {
      livingEnvironment: 'Nhà cửa đẹp đẽ, decor tinh tế, gần sông nước hoặc phong thủy tốt.',
      realEstateLuck: 'Được lộc trung gian môi giới giấy tờ pháp lý liên quan nhà đất.',
      homeVibe: 'Nơi có nhiều sự ghé thăm của khách khứa, tiếp đãi chu đáo.'
    },
    thienDi: {
      socialPersona: 'Người đại diện hoặc phó tướng khôn khéo, luôn cư xử dĩ hòa vi quý ngoài xã hội.',
      travelLuck: 'Đi xa đến đâu cũng thu xếp được mọi việc nhờ tài ngoại giao.',
      dangerZone: 'Ba phải hoặc thiếu nguyên tắc dễ bị các phe phái lợi dụng.'
    },
    noBoc: {
      leadershipStyle: 'Quản lý bằng sự chân thành, lôi kéo nhân tâm thay vì dùng hình phạt.',
      friendshipQuality: 'Chơi với bạn rất trượng phu, hay lo chuyện bao đồng giúp bạn bè.',
      betrayalRisk: 'Hay xót thương nhầm người, rước họa vào thân.'
    },
    tuTuc: {
      parentingStyle: 'Khuyến khích con cái mở rộng quan hệ xã hội, ăn vận tươm tất.',
      childTraits: ['Ngoan', 'Biết cư xử', 'Sành điệu'],
      geneticLegacy: 'Nhiều phẩm chất về ngoại hình và kỹ năng xã hội.'
    },
    huynhDe: {
      siblingDynamics: 'Khéo léo dung hòa các mối quan hệ gia đình, đóng vai trò liên lạc viên.',
      collaborationStyle: 'Hợp tác hòa nhã, sẵn sàng chịu phần thiệt hơn để duy trì hòa khí.',
      supportNetwork: 'Luôn tìm cách hỗ trợ hết lòng khi gia đình cần đến.'
    }
  },
  ThatSat: {
    id: 'ThatSat',
    name: 'Thất Sát',
    element: 'Kim',
    type: 'Chính Tinh',
    coreAttributes: ['Sát tinh', 'Quyền bính', 'Dũng mãnh', 'Cô độc'],
    menh: {
      personality: ['Nóng nảy', 'Kiên cường', 'Ít bộc lộ cảm xúc', 'Thích mạo hiểm'],
      strengths: ['Sức chiến đấu cao', 'Không chùn bước trước nghịch cảnh', 'Quyết đoán'],
      weaknesses: ['Bạo phát bạo tàn', 'Hành xử đoản hậu', 'Dễ mang thương tích']
    },
    quanLoc: {
      suitableCareers: ['Quân đội', 'Công an', 'Kỹ thuật viên', 'Doanh nhân mạo hiểm', 'Thể thao'],
      workStyle: ['Đánh nhanh thắng nhanh', 'Tiên phong mở đường', 'Chịu gian khổ'],
      challenges: ['Thành bại thất thường', 'Môi trường càng cạnh tranh càng phát huy']
    },
    tatAch: {
      vulnerableSystems: ['Phổi', 'Hệ hô hấp', 'Tai nạn nghề nghiệp', 'Huyết quang (máu me)'],
      stressResponse: 'Hành động liều lĩnh, dễ có xu hướng hủy hoại bản thân hoặc người khác.',
      advice: 'Tu dưỡng tâm tính, rèn luyện sự kiên nhẫn. Làm việc thiện để giải sát nghiệp.'
    },
    phuThe: {
      attractionPattern: 'Tình yêu như một cuộc chiến, thu hút những người có cá tính góc cạnh.',
      partnerTraits: ['Mạnh mẽ', 'Khắc khẩu', 'Nhanh nhẹn'],
      conflictTrigger: 'Sự khiêu khích hoặc thách thức quyền lực.'
    },
    taiBach: {
      moneyMindset: 'Kiếm tiền ở những nơi nguy hiểm nhất, không ngại đánh đổi sinh mệnh.',
      incomeSources: ['Cảnh sát', 'Phẫu thuật', 'Thể thao đối kháng', 'Công nghiệp'],
      financialFlaw: 'Rủi ro tán tài dở dang vì hành động nông nổi, bất cần.'
    },
    phuMau: {
      parentalInfluence: 'Gia đình thường xuyên có lục đục hoặc dạy dỗ bằng đòn roi.',
      childhoodEnvironment: 'Mang nhiều thương tích cả tâm lý lẫn thể trạng do sự khắc nghiệt.',
      healingPath: 'Buông bỏ oán hận và bớt kỳ vọng vào những điều hoàn hảo.'
    },
    phucDuc: {
      karmicLesson: 'Học cách dừng lại đúng lúc, tha thứ và mềm mỏng hơn để hóa giải sát khí.',
      innerPeace: 'Chỉ an tĩnh sau những lần vượt ải sinh tử, bình yên trong sự tĩnh mịch.',
      ancestralBlessing: 'Sức mạnh kiên nghị phi thường và nghị lực sống cao từ gia tộc.'
    },
    dienTrach: {
      livingEnvironment: 'Mua nhà ở những nơi từng có vấn đề hoặc khu vực ồn ào phức tạp.',
      realEstateLuck: 'Rất quyết liệt trong mua sắm và giữ nhà đất nhưng dễ gặp phải kiện tụng xây dựng.',
      homeVibe: 'Nhà có thể giống như một căn cứ, nơi tĩnh tâm tuyệt đối giữa thế giới hỗn loạn.'
    },
    thienDi: {
      socialPersona: 'Hình ảnh chiến binh đơn độc ở ngoài xã hội, không ai dám chê trách ra mặt.',
      travelLuck: 'Đi xa để tìm kiếm cơ hội lớn trong bão táp nguy nan.',
      dangerZone: 'Hiếu chiến nơi xứ người dễ mang họa sát thương.'
    },
    noBoc: {
      leadershipStyle: 'Cai trị bằng nỗi sợ hoặc sự nể phục tuyệt đối.',
      friendshipQuality: 'Chơi bạo liệt, hết tâm can nhưng số số bạn bè tin cẩn cực kỳ ít.',
      betrayalRisk: 'Dễ tạo phản nếu nhận ra chủ nhân hay bạn bè không mạnh mẽ hơn mình.'
    },
    tuTuc: {
      parentingStyle: 'Đẩy con vào môi trường khắc nghiệt từ sớm để rèn luyện ý chí.',
      childTraits: ['Gang thép', 'Khép kín', 'Quyết tâm'],
      geneticLegacy: 'Tinh thần không bỏ cuộc dù trong bất kỳ hoàn cảnh nào.'
    },
    huynhDe: {
      siblingDynamics: 'Anh em ly tán, khó sống chung, người nam dễ gặp tai ương thương tích.',
      collaborationStyle: 'Hợp tác dễ đổ vỡ do cái tôi sát phạt lớn.',
      supportNetwork: 'Tự gánh vác mọi rắc rối một mình, không muốn nhờ tới gia đình.'
    }
  },
  ThamLang: {
    id: 'ThamLang',
    name: 'Tham Lang',
    element: 'Mộc',
    type: 'Chính Tinh',
    coreAttributes: ['Dục vọng', 'Đào hoa', 'Vật chất', 'Nghệ thuật'],
    menh: {
      personality: ['Giao thiệp rộng', 'Ham học hỏi', 'Nhiều dục vọng', 'Thích nghệ thuật'],
      strengths: ['Sự uyển chuyển', 'Khả năng thấu hiểu tâm lý', 'Nhiều tài năng lẻ'],
      weaknesses: ['Dễ sa đà tửu sắc', 'Nhiều toan tính', 'Đứng núi này trông núi nọ']
    },
    quanLoc: {
      suitableCareers: ['Nghệ thuật', 'Giải trí', 'Nhà hàng', 'Khách sạn', 'Thẩm mỹ', 'Kinh doanh tự do'],
      workStyle: ['Dùng quan hệ để tiến thân', 'Đa năng', 'Thường xuyên thay đổi hướng đi'],
      challenges: ['Thiếu sự tập trung chuyên sâu', 'Dễ dính thị phi tình ái chốn công sở']
    },
    tatAch: {
      vulnerableSystems: ['Gan', 'Mật', 'Bệnh lây truyền qua đường tình dục', 'Thận âm'],
      stressResponse: 'Phóng túng, tìm đến các thú vui thể xác hoặc tiệc tùng để quên đi thực tại.',
      advice: 'Hạn chế các thú vui hao tổn nguyên khí. Tìm đến Tôn giáo hoặc triết học để tĩnh tâm.'
    },
    phuThe: {
      attractionPattern: 'Đào hoa, dễ cuốn hút nhiều người và cũng dễ bị cuốn hút.',
      partnerTraits: ['Lãng mạn', 'Kỹ năng phòng the tốt', 'Đa tình'],
      conflictTrigger: 'Sự ghen tuông, ngoại tình hoặc thiếu đáp ứng nhu cầu vật chất/tình cảm.'
    },
    taiBach: {
      moneyMindset: 'Kiếm tiền từ các hoạt động liên quan đến hưởng thụ, tiệc tùng, nghệ thuật.',
      incomeSources: ['Kinh doanh đa ngành', 'Tụ điểm giải trí', 'Giao dịch chợ đen'],
      financialFlaw: 'Tiền vào như nước nhưng ra cũng nhanh vì các thú vui phù phiếm xa hoa.'
    },
    phuMau: {
      parentalInfluence: 'Cha mẹ có thể là người khéo léo, nghệ thuật hoặc đa truân.',
      childhoodEnvironment: 'Phức tạp, có thể nhiều xáo trộn gia đạo.',
      healingPath: 'Học cách rèn luyện đạo đức để khắc chế những tính hư tật xấu từ gen di truyền.'
    },
    phucDuc: {
      karmicLesson: 'Học cách tiết chế nhục dục và nhận ra giá trị tâm linh đằng sau vật chất.',
      innerPeace: 'Cảm thấy bình an khi thỏa mãn được những đam mê khám phá mới mẻ, hoặc tu tập tôn giáo.',
      ancestralBlessing: 'Sự nhạy bén trong việc đánh hơi cơ hội xoay chuyển nhân sinh.'
    },
    dienTrach: {
      livingEnvironment: 'Thiết kế lãng mạn, đôi khi lòe loẹt, có nhiều yếu tố giải trí tận hưởng.',
      realEstateLuck: 'Rất linh hoạt mua đi bán lại, có lúc sở hữu nhiều điền sản ở những nơi sầm uất.',
      homeVibe: 'Nhà có thể là nơi tụ tập bạn bè bù khú, dễ nảy sinh nhiều drama tình ái.'
    },
    thienDi: {
      socialPersona: 'Giao thiệp rộng rãi, có mặt ở mọi tụ điểm, ai cũng quen biết.',
      travelLuck: 'Ngựa hoang đi không biết mỏi, rất hay xuất ngoại học hỏi những thứ mới lạ.',
      dangerZone: 'Trụy lạc, sa ngã mất hết danh tiếng nơi xứ người bởi tủ sắc.'
    },
    noBoc: {
      leadershipStyle: 'Sử dụng kỹ xảo giao tiếp và mua chuộc lợi ích để kiểm soát nhân viên.',
      friendshipQuality: 'Chơi bạn bè đa dạng đủ mọi tầng lớp, xã hội đen trắng đều quen.',
      betrayalRisk: 'Dễ nảy sinh mâu thuẫn tranh đoạt tình tiền với cả bạn thân.'
    },
    tuTuc: {
      parentingStyle: 'Khuyến khích con tham gia nghệ thuật hoặc sinh tồn bằng nghệ năng.',
      childTraits: ['Đào hoa', 'Ranh mãnh', 'Khéo tay'],
      geneticLegacy: 'Sức hấp dẫn giới tính và sự quyền biến.'
    },
    huynhDe: {
      siblingDynamics: 'Quan hệ anh em phức tạp, dễ nảy sinh đố kỵ tranh quyền.',
      collaborationStyle: 'Hợp tác đầy biến số, mưu mẹo, không bền chặt.',
      supportNetwork: 'Chủ yếu chỉ lợi dụng lẫn nhau chứ ít khi thật lòng bao bọc giúp đỡ.'
    }
  }
};
