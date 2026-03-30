import type { TuViPalace, TuViStar } from '../tuviTypes';
import { MUTAGEN_CONFIG } from '../tuviTypes';

// ═══════════════════════════════════════════════════════════════════
// Tứ Hóa Palace-Specific Impact (4 Hóa × 12 Palaces)
// ═══════════════════════════════════════════════════════════════════
export const TU_HOA_PALACE_IMPACT: Record<string, Record<string, string>> = {
    'Hóa Lộc': {
        'Mệnh': 'Hóa Lộc nhập Mệnh: phúc dày, được thượng thiên ban lộc. Bản thân có khí chất quý phái, tài lộc theo thân, dễ được quý nhân giúp đỡ.',
        'Huynh Đệ': 'Hóa Lộc nhập Huynh: anh em hòa thuận, có quý nhân trong bạn bè. Đối tác kinh doanh mang đến lợi nhuận.',
        'Phu Thê': 'Hóa Lộc nhập Phu Thê: hôn nhân tốt đẹp, người bạn đời mang đến tài lộc. Tình cảm vợ chồng hài hòa, ấm áp.',
        'Tử Tức': 'Hóa Lộc nhập Tử Tức: con cái hiếu thuận, mang đến phúc lộc cho cha mẹ. Đầu tư thuận lợi, sáng tạo sinh lợi.',
        'Tài Bạch': 'Hóa Lộc nhập Tài Bạch: vận tài chính rất tốt, tiền tài dồi dào. Kiếm tiền dễ dàng, nguồn thu nhập đa dạng.',
        'Tật Ách': 'Hóa Lộc nhập Tật Ách: sức khỏe tốt, thể lực dồi dào. Giảm bớt ảnh hưởng xấu của sát tinh, ít bệnh tật.',
        'Thiên Di': 'Hóa Lộc nhập Thiên Di: ra ngoài gặp may mắn, quý nhân xứ xa. Phát triển tốt khi đi xa, xuất ngoại thuận lợi.',
        'Nô Bộc': 'Hóa Lộc nhập Nô Bộc: cấp dưới trung thành, nhân viên giỏi. Mối quan hệ xã hội rộng, giao tế vui vẻ.',
        'Quan Lộc': 'Hóa Lộc nhập Quan Lộc: sự nghiệp phát đạt, công danh thuận lợi. Dễ được cấp trên đề bạt, thăng quan tiến chức.',
        'Điền Trạch': 'Hóa Lộc nhập Điền Trạch: nhà cửa khang trang, bất động sản tăng giá. Gia đạo yên ấm, thừa kế gia sản.',
        'Phúc Đức': 'Hóa Lộc nhập Phúc Đức: phúc đức tổ tiên dày, đời sống tinh thần phong phú. Tuổi già an nhàn, thanh thản.',
        'Phụ Mẫu': 'Hóa Lộc nhập Phụ Mẫu: cha mẹ giàu có, được thừa hưởng phúc ấm. Giấy tờ, hợp đồng thuận lợi.',
    },
    'Hóa Quyền': {
        'Mệnh': 'Hóa Quyền nhập Mệnh: tính cách mạnh mẽ, có uy quyền tự nhiên. Ý chí kiên cường, thích làm chủ, không chịu dưới quyền ai.',
        'Huynh Đệ': 'Hóa Quyền nhập Huynh: anh em có vị thế, bạn bè quyền lực. Có thể xung đột quyền lợi nếu không khéo léo.',
        'Phu Thê': 'Hóa Quyền nhập Phu Thê: người bạn đời có cá tính mạnh, hay tranh luận nhưng đều có lý. Hôn nhân cần sự nhường nhịn.',
        'Tử Tức': 'Hóa Quyền nhập Tử Tức: con cái bướng bỉnh nhưng có chí khí. Đầu tư quyết đoán, nắm quyền kiểm soát.',
        'Tài Bạch': 'Hóa Quyền nhập Tài Bạch: chủ động trong tài chính, có quyền quyết định tiền bạc. Kiếm tiền bằng năng lực và uy quyền.',
        'Tật Ách': 'Hóa Quyền nhập Tật Ách: sức đề kháng mạnh, ý chí vượt qua bệnh tật. Tuy nhiên hay làm việc quá sức.',
        'Thiên Di': 'Hóa Quyền nhập Thiên Di: có uy thế khi ra ngoài, được người khác nể phục. Thích hợp phát triển sự nghiệp ở xa.',
        'Nô Bộc': 'Hóa Quyền nhập Nô Bộc: quản lý cấp dưới giỏi, có uy với nhân viên. Tuy nhiên cần tránh quá áp đặt.',
        'Quan Lộc': 'Hóa Quyền nhập Quan Lộc: nắm quyền lực trong sự nghiệp, dễ thăng tiến. Phù hợp làm quản lý, lãnh đạo.',
        'Điền Trạch': 'Hóa Quyền nhập Điền Trạch: nắm quyền kiểm soát bất động sản, gia sản. Quyết định mọi việc trong gia đình.',
        'Phúc Đức': 'Hóa Quyền nhập Phúc Đức: tinh thần mạnh mẽ, ý chí kiên cường. Tổ tiên để lại uy danh, phúc phần vững.',
        'Phụ Mẫu': 'Hóa Quyền nhập Phụ Mẫu: cha mẹ nghiêm khắc nhưng có uy. Giáo dục kỷ luật, hợp đồng có sức nặng pháp lý.',
    },
    'Hóa Khoa': {
        'Mệnh': 'Hóa Khoa nhập Mệnh: thanh danh tốt, có học thức, được người đời kính trọng. Phong thái lịch lãm, quý phái.',
        'Huynh Đệ': 'Hóa Khoa nhập Huynh: anh em có học, bạn bè trí thức. Mối quan hệ dựa trên sự tôn trọng lẫn nhau.',
        'Phu Thê': 'Hóa Khoa nhập Phu Thê: người bạn đời có học vấn, lịch sự. Hôn nhân văn minh, tôn trọng lẫn nhau.',
        'Tử Tức': 'Hóa Khoa nhập Tử Tức: con cái học giỏi, có bằng cấp. Sáng tạo trong học thuật và nghiên cứu.',
        'Tài Bạch': 'Hóa Khoa nhập Tài Bạch: kiếm tiền bằng tri thức, chuyên môn. Thu nhập ổn định từ nghề nghiệp chuyên nghiệp.',
        'Tật Ách': 'Hóa Khoa nhập Tật Ách: gặp bệnh có thầy giỏi chữa, bệnh tật hóa giải được. Hiểu biết về sức khỏe.',
        'Thiên Di': 'Hóa Khoa nhập Thiên Di: được tiếng tốt ở ngoài xã hội, đi đâu cũng được tôn trọng. Du học thuận lợi.',
        'Nô Bộc': 'Hóa Khoa nhập Nô Bộc: thuộc hạ có trình độ, nhân viên chuyên nghiệp. Quan hệ xã hội uy tín.',
        'Quan Lộc': 'Hóa Khoa nhập Quan Lộc: sự nghiệp gắn liền với danh tiếng, học thuật. Thăng tiến nhờ trình độ chuyên môn.',
        'Điền Trạch': 'Hóa Khoa nhập Điền Trạch: nhà cửa thanh nhã, có giá trị văn hóa. Gia đình nề nếp, có giáo dục.',
        'Phúc Đức': 'Hóa Khoa nhập Phúc Đức: gia tộc có truyền thống học vấn, phúc trí tuệ. Đời sống tinh thần cao.',
        'Phụ Mẫu': 'Hóa Khoa nhập Phụ Mẫu: cha mẹ có học, giáo dục tốt. Giấy tờ, bằng cấp thuận lợi.',
    },
    'Hóa Kỵ': {
        'Mệnh': 'Hóa Kỵ nhập Mệnh: bản thân hay lo lắng, chấp nhất. Cuộc đời nhiều sóng gió nhưng cũng là động lực phấn đấu. Cần học cách buông bỏ.',
        'Huynh Đệ': 'Hóa Kỵ nhập Huynh: anh em bất hòa, bạn bè phản bội. Cẩn thận trong hợp tác kinh doanh, dễ mất tiền vì người thân.',
        'Phu Thê': 'Hóa Kỵ nhập Phu Thê: hôn nhân trắc trở, vợ chồng hay cãi vã. Duyên phận phức tạp, cần kiên nhẫn và bao dung.',
        'Tử Tức': 'Hóa Kỵ nhập Tử Tức: con cái khó nuôi hoặc hay lo lắng cho con. Đầu tư dễ thua lỗ, cần thận trọng.',
        'Tài Bạch': 'Hóa Kỵ nhập Tài Bạch: tài chính bất ổn, hay mất tiền bất ngờ. Tiền tài đến khó giữ, dễ bị lừa gạt.',
        'Tật Ách': 'Hóa Kỵ nhập Tật Ách: sức khỏe yếu, hay bệnh vặt. Lo sợ về bệnh tật, tâm lý bất an ảnh hưởng thể chất.',
        'Thiên Di': 'Hóa Kỵ nhập Thiên Di: ra ngoài hay gặp trở ngại, bị hiểu lầm. Đi xa không thuận, quan hệ xã hội phức tạp.',
        'Nô Bộc': 'Hóa Kỵ nhập Nô Bộc: thuộc hạ phản phúc, bạn bè bất tín. Cẩn thận bị người dưới quyền hại ngầm.',
        'Quan Lộc': 'Hóa Kỵ nhập Quan Lộc: sự nghiệp nhiều chông gai, dễ gặp tiểu nhân. Công việc áp lực, hay thay đổi nghề.',
        'Điền Trạch': 'Hóa Kỵ nhập Điền Trạch: nhà cửa bất ổn, tranh chấp bất động sản. Gia đình hay xảy ra mâu thuẫn.',
        'Phúc Đức': 'Hóa Kỵ nhập Phúc Đức: phúc mỏng, tổ tiên để lại nghiệp chướng. Đời sống tinh thần hay bất an, lo âu.',
        'Phụ Mẫu': 'Hóa Kỵ nhập Phụ Mẫu: quan hệ với cha mẹ trắc trở, giấy tờ hay gặp sai sót. Dễ gặp rắc rối pháp lý.',
    },
};

// ═══════════════════════════════════════════════════════════════════
// Deep Tứ Hóa Palace Impact Helper
// ═══════════════════════════════════════════════════════════════════
export function analyzeTuHoaDeep(palace: TuViPalace, palaceBaseName: string): string[] {
    const allStars: TuViStar[] = [
        ...palace.majorStars,
        ...(palace.minorStars ?? []),
        ...(palace.adjectiveStars ?? []),
    ];

    const results: string[] = [];
    for (const star of allStars) {
        if (!star.mutagen || star.mutagen.length === 0) continue;
        for (const m of star.mutagen) {
            const config = MUTAGEN_CONFIG[m];
            if (!config) continue;
            const mutagenLabel = config.label;
            const palaceImpact = TU_HOA_PALACE_IMPACT[mutagenLabel]?.[palaceBaseName];
            if (palaceImpact) {
                results.push(`- **${star.name} ${mutagenLabel}**: ${palaceImpact}`);
            }
        }
    }
    return results;
}

// ═══════════════════════════════════════════════════════════════════
// Tứ Hóa Combination Detection
// ═══════════════════════════════════════════════════════════════════
export function analyzeTuHoaCombinations(palace: TuViPalace): string[] {
    const allStars: TuViStar[] = [
        ...palace.majorStars,
        ...(palace.minorStars ?? []),
        ...(palace.adjectiveStars ?? []),
    ];
    const results: string[] = [];

    const mutagenSet = new Set<string>();
    for (const s of allStars) {
        if (s.mutagen) {
            for (const m of s.mutagen) {
                const config = MUTAGEN_CONFIG[m];
                if (config) mutagenSet.add(config.label);
            }
        }
    }

    // Tam Kỳ Gia Hội: Lộc + Quyền + Khoa together
    if (mutagenSet.has('Hóa Lộc') && mutagenSet.has('Hóa Quyền') && mutagenSet.has('Hóa Khoa')) {
        results.push('🌟 **Tam Kỳ Gia Hội** — Lộc, Quyền, Khoa hội tụ đồng cung! Đây là cách cục rất quý, chủ phú quý song toàn, danh vọng hiển hách.');
    }
    // Lộc + Quyền
    if (mutagenSet.has('Hóa Lộc') && mutagenSet.has('Hóa Quyền') && !mutagenSet.has('Hóa Khoa')) {
        results.push('**Lộc Quyền đồng cung** — vừa có tài lộc vừa có quyền lực, cách cục rất tốt cho sự nghiệp và tài chính.');
    }
    // Lộc + Khoa
    if (mutagenSet.has('Hóa Lộc') && mutagenSet.has('Hóa Khoa') && !mutagenSet.has('Hóa Quyền')) {
        results.push('**Lộc Khoa đồng cung** — tài lộc kèm danh vọng, thăng tiến nhờ cả năng lực lẫn uy tín.');
    }
    // Kỵ alone or Kỵ + Lộc
    if (mutagenSet.has('Hóa Kỵ')) {
        if (mutagenSet.has('Hóa Lộc')) {
            results.push('**Lộc Kỵ giao tranh** — có lộc nhưng kèm trở ngại, cần nỗ lực để giữ vững thành quả. Tiền tài đến nhưng đi cũng nhanh.');
        } else if (mutagenSet.size === 1) {
            results.push('**Hóa Kỵ cô độc** tại cung — năng lượng trắc trở không được cát tinh hóa giải, cần đặc biệt chú ý lĩnh vực này.');
        }
    }

    return results;
}
