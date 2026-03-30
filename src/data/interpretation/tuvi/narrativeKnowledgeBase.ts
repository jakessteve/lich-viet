/**
 * Tử Vi Narrative Knowledge Base
 *
 * Provides chart-specific ETC (Effects Then Causes) narratives for
 * each life area, keyed by major star and brightness level.
 *
 * Psychology techniques applied:
 * - Barnum/Forer Effect: Hooks feel uniquely personal
 * - Narrative Transportation: Story-like phrasing
 * - Curiosity Gap: Partial reveal → premium upsell
 * - Loss Aversion: Frame premium as "don't miss" insights
 */

import type { ETCNarrative, LifeAreaType, BrightnessLevel } from '../../../services/interpretation/types';

// ═══════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════

type BrightnessNarrativeMap = Partial<Record<BrightnessLevel, ETCNarrative>>;
type LifeAreaNarrativeMap = Partial<Record<LifeAreaType, BrightnessNarrativeMap>>;
type StarNarrativeKB = Record<string, LifeAreaNarrativeMap>;

// ═══════════════════════════════════════════════════════════════════
// Per-Area Fallback Defaults (unique per area, NOT one shared template)
// Used when no star-specific entry exists
// ═══════════════════════════════════════════════════════════════════
// Simple hash for deterministic variety from star/palace names
// ═══════════════════════════════════════════════════════════════════
function pickByName(arr: string[], name: string): string {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = ((h << 5) - h + name.charCodeAt(i)) | 0;
    return arr[Math.abs(h) % arr.length];
}

// ═══════════════════════════════════════════════════════════════════
// Per-Area Fallback Defaults — VARIED per palace via dynamic hooks
// Used when no star-specific entry exists
// ═══════════════════════════════════════════════════════════════════

export const AREA_FALLBACK_NARRATIVES: Record<LifeAreaType, (starNames: string, palaceName: string) => ETCNarrative> = {
    personality: (starNames, palaceName) => {
        const hooks = [
            `✦ Cung ${palaceName} trong bản đồ sao của bạn mang một năng lượng rất riêng — thứ định hình cách bạn nhìn nhận bản thân và thế giới xung quanh từ thuở nhỏ.`,
            `✦ Với ${starNames} tọa thủ tại ${palaceName}, bạn sở hữu một "mã nhận dạng tính cách" không ai có thể sao chép — đó là dấu ấn bẩm sinh từ khoảnh khắc bạn bước vào thế giới này.`,
            `✦ Năng lượng ${palaceName} trong lá số phản ánh một chiều kích sâu xa của bản ngã — thứ mà chỉ những người thân thiết nhất mới có thể nhận ra ở bạn.`,
            `✦ Qua ${palaceName}, lá số cho thấy bạn có một nội lực đặc trưng ảnh hưởng đến mọi quyết định — từ cách bạn phản ứng dưới áp lực đến cách bạn thể hiện tình cảm.`,
            `✦ Sự kết hợp của ${starNames} tại cung ${palaceName} tạo nên một "chữ ký năng lượng" hiếm gặp — nó giải thích tại sao bạn xử lý tình huống khác biệt so với đa số người xung quanh.`,
            `✦ Cung ${palaceName} là tấm gương phản chiếu bản thể sâu xa nhất — và ${starNames} đang kể cho bạn nghe câu chuyện về con người THẬT bên trong, đằng sau mọi mặt nạ xã hội.`,
        ];
        const effects1 = [
            `Với ${starNames} tọa thủ tại ${palaceName}, tính cách bạn mang dấu ấn riêng không thể nhầm lẫn. Cách bạn tiếp cận vấn đề, cách bạn đưa ra quyết định, và cách bạn đối mặt trở ngại đều phản ánh năng lượng đặc trưng này — đó chính là "chữ ký" mà vũ trụ khắc lên tâm hồn bạn.`,
            `Năng lượng ${starNames} tại cung ${palaceName} định hình một phong cách tư duy và hành động rất riêng biệt trong bạn. Bạn có xu hướng tự nhiên tiếp cận cuộc sống theo cách mà ít ai có thể bắt chước — và chính sự khác biệt này là thế mạnh lớn nhất khi bạn biết phát huy đúng cách.`,
            `Cấu trúc ${starNames} tại ${palaceName} cho thấy bạn xử lý thông tin và phản ứng với thế giới bằng một "bộ lọc" năng lượng đặc biệt. Mọi trải nghiệm — dù vui hay buồn — đều được bạn "tiêu hóa" theo cách riêng, tạo ra chiều sâu nội tâm mà người khác ít khi nhìn thấy.`,
        ];
        const effects2 = [
            `Điều đặc biệt là năng lượng này không chỉ ảnh hưởng đến cách bạn suy nghĩ, mà còn định hình cách người khác nhìn nhận và phản ứng với bạn trong mọi tình huống — từ cuộc gặp đầu tiên đến những mối quan hệ lâu năm.`,
            `Năng lượng này tỏa ra một "từ trường" vô hình — đó là lý do tại sao bạn tự nhiên thu hút một nhóm người nhất định và đẩy xa một nhóm khác. Hiểu "từ trường" này giúp bạn chủ động hơn trong việc xây dựng mạng lưới quan hệ phù hợp.`,
            `Cung ${palaceName} với ${starNames} cũng ảnh hưởng đến "nhịp sinh học tâm lý" — có giai đoạn bạn tràn đầy năng lượng sáng tạo, có giai đoạn bạn cần rút về nội tâm để nạp lại sức mạnh. Nhận biết nhịp này giúp bạn sống thuận theo tự nhiên.`,
        ];
        const nuances = [
            `Mỗi đặc điểm tính cách đều có hai mặt — đó là quy luật bất biến mà 50 năm hành nghề đã dạy tôi. Phẩm chất giúp bạn tỏa sáng ở hoàn cảnh này có thể trở thành thử thách ở hoàn cảnh khác, và ranh giới giữa hai mặt ấy đôi khi mong manh đến đáng sợ.`,
            `Không có đặc điểm nào là "tốt" hay "xấu" tuyệt đối — chỉ có đặc điểm ĐÚNG CHỖ hoặc SAI CHỖ. Sự quyết đoán tỏa sáng trong phòng họp nhưng có thể gây xung đột trong phòng ngủ. Sự nhạy cảm là món quà trong nghệ thuật nhưng là gánh nặng trong thương trường.`,
            `Theo nguyên lý "Âm Dương chuyển hóa" — mặt mạnh và mặt yếu của bạn không cố định. Trong giai đoạn thuận lợi, điểm mạnh tỏa sáng và điểm yếu ẩn đi. Trong giai đoạn thử thách, chính điểm yếu lại "kích hoạt" và đòi hỏi sự chú ý.`,
        ];
        const tips = [
            `💡 Viết nhật ký tự-quan-sát 5 phút mỗi tối — ghi nhận khi nào bạn ở "mặt sáng" và khi nào trượt sang "mặt tối" trong ngày.`,
            `💡 Hãy quan sát phản ứng tự động của bạn trong 3 tình huống: áp lực công việc, xung đột với người thân, và quyết định tài chính — đó là nơi bản ngã thật lộ diện rõ nhất.`,
            `💡 Tìm một người bạn đáng tin cậy có thể cho bạn phản hồi thẳng thắn — "điểm mù" tính cách chỉ có thể được nhìn thấy qua mắt người khác.`,
            `💡 Thử nghiệm: trong 21 ngày tới, mỗi khi đưa ra quyết định quan trọng, hãy dừng lại 3 giây và tự hỏi "đây là phản ứng bẩm sinh hay lựa chọn có ý thức?"`,
        ];
        return {
            hook: pickByName(hooks, palaceName),
            effectParagraphs: [pickByName(effects1, starNames), pickByName(effects2, palaceName + starNames)],
            nuance: pickByName(nuances, palaceName),
            cause: `Đây là ảnh hưởng trực tiếp từ cách ${starNames} tương tác với năng lượng cung ${palaceName} trong bản đồ sao — mỗi sao mang một "tần số" riêng, và sự kết hợp tại cung này tạo ra "hợp âm" năng lượng độc nhất.`,
            tip: pickByName(tips, starNames + palaceName),
        };
    },
    love: (starNames, palaceName) => {
        const hooks = [
            `✦ Qua cung ${palaceName}, bản đồ sao cho thấy cách bạn yêu thương mang đậm dấu ấn của ${starNames} — một mô hình tình cảm rất khác biệt so với đa số người xung quanh.`,
            `✦ Năng lượng ${starNames} tại ${palaceName} vẽ nên bức chân dung tình cảm rất riêng — từ cách bạn bị thu hút, cách bạn thể hiện tình yêu, đến cách bạn xử lý xung đột đều mang "chữ ký" đặc trưng.`,
            `✦ Trong tình yêu, bạn không giống đa số — và ${starNames} tại cung ${palaceName} giải thích TẠI SAO cách yêu của bạn đôi khi khiến cả bạn lẫn đối phương bất ngờ.`,
            `✦ Cung ${palaceName} tiết lộ "mã tình cảm" bẩm sinh — thứ chi phối cách bạn chọn bạn đời, cách bạn biểu đạt yêu thương, và cách bạn phản ứng khi bị tổn thương.`,
            `✦ ${starNames} tại ${palaceName} cho thấy mô hình gắn kết tình cảm sâu xa nhất của bạn — loại tình yêu bạn thực sự khao khát đôi khi rất khác với loại tình yêu bạn nghĩ mình muốn.`,
        ];
        return {
            hook: pickByName(hooks, palaceName + starNames),
            effectParagraphs: [
                `Năng lượng ${starNames} tại cung ${palaceName} định hình phong cách yêu đương và mô hình quan hệ lý tưởng. Bạn có xu hướng tìm kiếm một dạng kết nối rất cụ thể — và khi tìm đúng người, mối quan hệ ấy sẽ trở thành nguồn sức mạnh phi thường trong cuộc đời.`,
                `Mô hình tình cảm này ảnh hưởng đến CẢ cách bạn yêu LẪN cách bạn cần được yêu. Nhiều xung đột trong tình yêu xuất phát từ sự khác biệt giữa "ngôn ngữ yêu thương" bẩm sinh của hai người — không phải thiếu tình cảm.`,
            ],
            nuance: 'Phẩm chất thu hút đối phương đến với bạn cũng chính là thứ có thể gây ma sát nếu không được hiểu đúng. Trong 50 năm giải đoán, tôi nhận ra: "cãi nhau" thực chất là hai "mã tình cảm" khác nhau đang cố giao tiếp mà thiếu "phần mềm dịch."',
            cause: `Năng lượng ${starNames} tại ${palaceName} cho thấy bạn phù hợp với những người có đặc tính bổ sung — tạo nên sự cân bằng tự nhiên mà hai người "giống nhau" không thể có.`,
            tip: pickByName([
                '💡 Hỏi đối phương: "Khi nào em/anh cảm thấy được yêu NHẤT?" — câu trả lời sẽ tiết lộ "mã tình cảm" của họ.',
                '💡 Học cách phân biệt giữa "yêu" và "cần" — tình yêu lành mạnh không phải lấp đầy khoảng trống mà là chia sẻ sự trọn vẹn.',
                '💡 Thay vì cố thay đổi đối phương, hãy thử "dịch" — diễn đạt nhu cầu của mình bằng ngôn ngữ NGƯỜI ẤY hiểu.',
                '💡 Dành 15 phút mỗi ngày cho "quality time" không điện thoại — đó là khi năng lượng tình cảm bẩm sinh được kết nối sâu nhất.',
            ], starNames),
        };
    },
    career: (starNames, palaceName) => {
        const hooks = [
            `✦ Cung ${palaceName} với ${starNames} cho thấy bạn có một "vùng thiên phú" sự nghiệp rất cụ thể — lĩnh vực mà bạn có thể tỏa sáng tự nhiên mà không cần quá nỗ lực.`,
            `✦ ${starNames} tại ${palaceName} vẽ nên "bản đồ sự nghiệp" của riêng bạn — với những ngã rẽ, xa lộ, và lối tắt mà người khác không có.`,
            `✦ Qua cung ${palaceName}, lá số cho thấy con đường công danh của bạn mang đậm dấu ấn ${starNames} — từ lĩnh vực phù hợp đến phong cách làm việc tối ưu đều rất đặc trưng.`,
            `✦ Năng lượng ${starNames} tại cung ${palaceName} tiết lộ "bí mật" mà nhiều người mất cả đời mới phát hiện: những gì bạn làm GIỎi NHẤT thường không phải những gì bạn nghĩ.`,
            `✦ Trong sự nghiệp, ${starNames} tại ${palaceName} cho thấy bạn có một lợi thế cạnh tranh bẩm sinh — thứ không thể học được từ trường lớp, chỉ có thể phát hiện qua sự tự-nhận-thức.`,
        ];
        return {
            hook: pickByName(hooks, palaceName + starNames),
            effectParagraphs: [
                `${starNames} tại ${palaceName} cho thấy bạn có năng lực tự nhiên trong một số hướng đi cụ thể. Khi hoạt động đúng "vùng thiên phú" này, công việc không chỉ mang lại thu nhập mà còn cảm giác thỏa mãn sâu sắc — như thể bạn sinh ra để làm điều ấy.`,
                `Điều quan trọng là nhận ra sự khác biệt giữa "giỏi vì cố gắng" và "giỏi vì đó là bản năng." Lá số chỉ ra rõ ràng: khi bạn làm việc THUẬN với năng lượng bẩm sinh, mỗi giờ nỗ lực cho kết quả gấp ba so với khi chèo ngược dòng.`,
            ],
            nuance: 'Thiên phú không đồng nghĩa với dễ dàng. Ngay cả trong lĩnh vực mạnh nhất, bạn vẫn cần kỷ luật, chiến lược đúng, và thời điểm phù hợp. Tài năng không khai thác sẽ héo mòn — như viên kim cương chưa mài.',
            cause: `Cách ${starNames} tọa thủ và tương tác tại cung ${palaceName} tạo ra một "bề mặt năng lượng" nghề nghiệp rất cụ thể trong bản đồ sao — nơi một số con đường bằng phẳng thuận lợi và một số đầy chướng ngại.`,
            tip: pickByName([
                '💡 Liệt kê 5 việc bạn làm tốt nhất MÀ KHÔNG CẢM THẤY MỆT — đó chính là manh mối của "vùng thiên phú."',
                '💡 Hỏi 3 người thân: "Bạn thấy tôi giỏi nhất khi làm gì?" — góc nhìn bên ngoài thường chính xác hơn tự đánh giá.',
                '💡 Thử "audit năng lượng" 1 tuần: ghi nhận công việc nào TIẾP THÊM sức mạnh và công việc nào HÚT KIỆT năng lượng.',
                '💡 Con đường ngắn nhất đến thành công: tìm giao điểm giữa "điều bạn giỏi," "điều thế giới cần," và "điều bạn yêu thích."',
            ], starNames),
        };
    },
    health: (starNames, palaceName) => {
        const hooks = [
            `✦ Cung ${palaceName} với ${starNames} cho thấy cơ thể bạn có những "tín hiệu" riêng — hiểu được chúng là cách bảo vệ sức khỏe hiệu quả nhất mà không cần đợi đến khi có triệu chứng.`,
            `✦ ${starNames} tại ${palaceName} phản ánh "bản đồ sức khỏe" bẩm sinh — chỉ ra chính xác hệ cơ quan nào là thế mạnh, hệ nào cần bảo vệ, và giai đoạn nào cần đặc biệt cẩn thận.`,
            `✦ Năng lượng cung ${palaceName} cho thấy mối quan hệ giữa thể chất và tinh thần ở bạn sâu sắc hơn hầu hết mọi người — sức khỏe cảm xúc ảnh hưởng TRỰC TIẾP đến sức khỏe thể chất.`,
            `✦ Qua ${starNames} tại ${palaceName}, lá số cho thấy hệ thống năng lượng cơ thể bạn có nhịp sinh học đặc trưng — có giai đoạn tràn đầy sinh lực, có giai đoạn cần được nghỉ ngơi sâu.`,
        ];
        return {
            hook: pickByName(hooks, palaceName + starNames),
            effectParagraphs: [
                `${starNames} tại ${palaceName} cho thấy hệ thống năng lượng cơ thể có những đặc điểm đáng chú ý. Có những giai đoạn bạn tràn đầy sức sống vượt trội, và có những thời điểm cơ thể gửi đi tín hiệu cảnh báo — việc lắng nghe tín hiệu ấy chính là "y học dự phòng" mà cổ nhân đã biết từ hàng nghìn năm trước.`,
                `Đặc biệt, lá số chỉ ra rằng sức khỏe tinh thần và sức khỏe thể chất ở bạn liên kết chặt chẽ — stress kéo dài hoặc cảm xúc bị kìm nén sẽ biểu hiện qua cơ thể nhanh hơn người bình thường. Đây vừa là "cảnh báo sớm" quý giá, vừa là lời nhắc phải chăm sóc cả hai mặt.`,
            ],
            nuance: 'Sức khỏe không chỉ là thể chất. Trạng thái tinh thần, chất lượng giấc ngủ, và mức độ stress đều được phản ánh qua năng lượng lá số — và đôi khi chính những yếu tố "vô hình" này mới là nguồn gốc của vấn đề "hữu hình."',
            cause: `Năng lượng ${starNames} tại cung ${palaceName} ảnh hưởng đến cách cơ thể phản ứng với stress, chế độ sinh hoạt, và các tác nhân bên ngoài — tạo ra một "kiểu thể chất" riêng cần chiến lược chăm sóc phù hợp.`,
            tip: pickByName([
                '💡 Ghi nhật ký sức khỏe 2 phút mỗi sáng: ghi mức năng lượng (1-10), chất lượng giấc ngủ, và cảm xúc chủ đạo — sau 30 ngày bạn sẽ thấy MÔ HÌNH rõ ràng.',
                '💡 Bổ sung phương pháp "chăm sóc phòng ngừa" phù hợp năng lượng bẩm sinh — đừng đợi đến khi cơ thể "kêu cứu" mới hành động.',
                '💡 Dành ít nhất 20 phút mỗi ngày cho hoạt động thể chất nhẹ nhàng — đi bộ, yoga, hoặc khí công đều phù hợp với cấu trúc năng lượng lá số.',
            ], starNames),
        };
    },
    growth: (starNames, palaceName) => {
        const hooks = [
            `✦ Cung ${palaceName} với ${starNames} cho thấy hành trình phát triển tâm linh của bạn rất riêng biệt — với những bài học mà không phải ai cũng được "tuyển chọn" để trải qua.`,
            `✦ ${starNames} tại ${palaceName} vẽ nên "bản đồ tâm linh" độc đáo — hành trình trưởng thành của bạn không phải đường thẳng, mà là hình xoắn ốc đi lên, mỗi vòng quay đều mang bài học sâu hơn.`,
            `✦ Qua cung ${palaceName}, lá số cho thấy phúc đức và trí tuệ tâm linh của bạn được xây dựng qua từng giai đoạn — và tiềm năng "chuyển hóa" trải nghiệm tiêu cực thành bài học là đặc biệt mạnh.`,
            `✦ Năng lượng ${starNames} tại ${palaceName} cho thấy con đường phát triển bên trong của bạn đầy ý nghĩa — mỗi thử thách đều là lời mời gọi để bạn khám phá tầng sâu hơn của chính mình.`,
            `✦ Cung ${palaceName} tiết lộ "sứ mệnh tâm linh" bẩm sinh — thứ mà khi bạn sống đúng với nó, mọi thứ trong cuộc đời tự nhiên rơi vào đúng vị trí.`,
        ];
        return {
            hook: pickByName(hooks, palaceName + starNames),
            effectParagraphs: [
                `${starNames} tại ${palaceName} vẽ nên hành trình trưởng thành độc đáo. Con đường phát triển của bạn có những khúc quanh bất ngờ, nhưng theo triết lý mà tôi đúc kết: "Không có ngã rẽ nào là sai — chỉ có ngã rẽ dạy bài học khác." Mỗi trải nghiệm đều là viên gạch xây dựng trí tuệ tâm linh.`,
                `Phúc đức và trí tuệ bên trong được xây dựng qua từng giai đoạn, và cung ${palaceName} cho thấy bạn có tiềm năng đặc biệt trong việc "giả kim" — biến trải nghiệm đau thương thành vàng ròng trí tuệ. Đây là năng lực mà nhiều bậc thầy tâm linh gọi là "sức mạnh chuyển hóa."`,
            ],
            nuance: 'Con đường phát triển đôi khi đòi hỏi buông bỏ những thứ tưởng chừng quan trọng. Đừng nhầm lẫn giữa "mất mát" và "tinh giản" — khi cánh cửa cũ đóng lại, không gian mới mẻ mở ra cho những gì thuộc về bạn thực sự.',
            cause: `Cung ${palaceName} với ${starNames} cho thấy phúc đức tổ tiên và hành trình tâm linh liên kết mật thiết — mỗi quyết định bạn đưa ra đều cộng hưởng với dòng chảy năng lượng xuyên thế hệ.`,
            tip: pickByName([
                '💡 Dành thời gian tĩnh lặng mỗi ngày — thiền, đi bộ trong im lặng, hoặc đơn giản là ngồi yên 10 phút. Đó là khi trực giác bẩm sinh được kết nối.',
                '💡 Viết "thư cảm ơn" cho 3 thử thách lớn nhất trong đời — mỗi thử thách đã dạy bạn điều gì? Bài tập này kích hoạt năng lực "chuyển hóa" bẩm sinh.',
                '💡 Tìm một hệ thống thực hành tâm linh phù hợp bản mệnh — không phải con đường nào cũng dẫn đến cùng đích đến, nhưng CON ĐƯỜNG ĐÚNG cho bạn sẽ cảm thấy tự nhiên.',
                '💡 Mỗi tối trước khi ngủ, hãy tự hỏi: "Hôm nay mình đã trưởng thành hơn hôm qua ở điểm nào?" — câu hỏi nhỏ tạo ra chuyển hóa lớn.',
            ], starNames),
        };
    },
    wealth: (starNames, palaceName) => {
        const hooks = [
            `✦ Cung ${palaceName} trong bản đồ sao chỉ ra "huyệt tài lộc" của bạn — và ${starNames} chính là người giữ cửa.`,
            `✦ Tiền bạc đối với bạn không chỉ là con số, mà là thước đo năng lượng. ${starNames} tại ${palaceName} quy định dòng chảy này.`,
        ];
        return {
            hook: pickByName(hooks, palaceName + starNames),
            effectParagraphs: [
                `Quản trị dòng tài chính không chỉ đòi hỏi kỹ năng mà còn phụ thuộc vào thời vận. ${starNames} tại ${palaceName} cho thấy bạn thích hợp với những nguồn thu nhất định, và cách tiền vào túi cũng mang nét độc đáo riêng.`,
                `Bạn có xu hướng phát triển những dòng thu nhập tốt hơn khi gắn với năng lượng bẩm sinh của bản đồ sao. Nếu chỉ chạy theo xu thế đám đông, tài lộc sẽ thăng trầm. Đi đúng con đường của mình, tiền bạc sẽ như dòng nước thuận theo tự nhiên mà chảy đến.`,
            ],
            nuance: 'Tài chính vững mạnh không đến từ việc bạn kiếm được bao nhiêu, mà từ việc bạn có thể giữ và làm cho nó sinh sôi như thế nào khi gặp cơ hội.',
            cause: `Năng lượng của ${starNames} chiếu vào ${palaceName} sẽ quy định "thiên hướng tài lộc" — thích hợp kinh doanh, làm thuê chuyên gia, hay đầu tư dài hạn.`,
            tip: pickByName([
                '💡 Định kỳ rà soát "những khoản chi không nhớ tên" mỗi cuối tháng.',
                '💡 Tập trung vào xây dựng các luồng thu nhập thụ động — "đừng để tiền ngủ yên".',
            ], starNames),
        };
    },
    parents: (starNames, palaceName) => {
        const hooks = [
            `✦ Cái neo đầu tiên của cuộc đời — cung ${palaceName} — mang dấu ấn của ${starNames}, cho thấy những bài học ban sơ từ đấng sinh thành.`,
            `✦ Gia đình vừa là điểm tựa vừa là ngọn núi bạn cần vượt qua. Sự kết hợp ${starNames} ở ${palaceName} kể câu chuyện về sự ảnh hưởng này.`,
        ];
        return {
            hook: pickByName(hooks, palaceName + starNames),
            effectParagraphs: [
                `Năng lượng ${starNames} tại cung ${palaceName} chỉ ra môi trường giáo dục đầu đời và mối quan hệ với các bậc bề trên. Những di sản tinh thần — cả mặt tích cực lẫn những kỳ vọng gây áp lực — đều đóng vai trò quan trọng định hình tính cách của bạn.`,
                `Cách bạn giao tiếp và xử lý xung đột với cha mẹ, hoặc những người hướng dẫn trưởng thành, sẽ phản ánh đúng tính chất và mức độ hòa hợp của các sao. Nhìn nhận rõ điều này giúp gỡ rối nhiều nút thắt tâm lý sâu kín.`,
            ],
            nuance: 'Để thực sự trưởng thành, đôi khi bạn cần học cách "hiểu trọn vẹn" những gì được dạy, và dũng cảm "chối bỏ" những gì không còn đúng.',
            cause: `Mối quan hệ này chịu tác động của ${starNames} tại ${palaceName}, báo hiệu mức độ hòa hợp, sự trợ lực, hoặc những thử thách định mệnh mà hoàn cảnh gia đình mang lại.`,
            tip: pickByName([
                '💡 Hãy hỏi cha/mẹ về một khó khăn tuổi trẻ của họ — sự thấu hiểu bắt đầu từ việc lắng nghe.',
                '💡 Học cách tha thứ cho những điều chưa hoàn hảo trong gia đình — vì họ cũng chỉ là những người lần đầu làm cha mẹ.',
            ], starNames),
        };
    },
    karma: (starNames, palaceName) => {
        const hooks = [
            `✦ Tại ${palaceName}, ${starNames} nắm giữ chìa khóa của những mối duyên tiền kiếp và nền tảng phước đức mà bạn thừa hưởng.`,
            `✦ Phúc lực của tổ tiên và tâm tính nội sâu — ${starNames} ở cung ${palaceName} là một chỉ báo quan trọng về hậu vận.`,
        ];
        return {
            hook: pickByName(hooks, palaceName + starNames),
            effectParagraphs: [
                `Cung ${palaceName} với ${starNames} là kho chứa "phúc phận" — những phước báu được tích lũy từ trước. Khi đứng trước những ngưỡng cửa nguy nan, chính nguồn lực vô hình này sẽ là thứ che chở và dẫn đường rẽ lối cho bạn.`,
                `Mặt khác, đây cũng là cung vị quản lý nội tâm, sức khỏe tinh thần và tuổi thọ. Sự an tĩnh trong hồn hay những sóng gió bất chợt đều có thể được dự báo ở đây. Tu dưỡng tâm thức, cân bằng cảm xúc là điều kiện tiên quyết.`,
            ],
            nuance: 'Phước báu không phải là ngân hàng vô tận — nếu chỉ dùng mà không tích lũy, sự "mắn may" rồi cũng có lúc cạn.',
            cause: `Sức mạnh của ${starNames} chiếu rọi vào ${palaceName} trực tiếp định đoạt căn cơ tĩnh lặng, thọ yểu và chiều sâu phước đức trong lá số.`,
            tip: pickByName([
                '💡 Một hành động tốt không cầu báo đáp mỗi tuần sẽ nuôi dưỡng "kho báu vô hình".',
                '💡 Học cách buông xả những tổn thương không đáng có — giữ lòng rỗng rang sẽ thu hút năng lượng tốt.',
            ], starNames),
        };
    },
    property: (starNames, palaceName) => {
        const hooks = [
            `✦ Chốn lui về của bạn — cung ${palaceName} — mang hơi thở của ${starNames}, chỉ ra mối duyên với đất đai, nhà cửa.`,
            `✦ Tài sản cố định và không gian sống của bạn không phải ngẫu nhiên mà có — ${starNames} tại ${palaceName} vẽ lên bức tranh này.`,
        ];
        return {
            hook: pickByName(hooks, palaceName + starNames),
            effectParagraphs: [
                `Tình hình điền sản, nhà cửa và cơ duyên làm chủ đất đai của bạn được đánh dấu rõ rệt bởi ${starNames} tại cung ${palaceName}. Đây có thể là dấu hiệu của sự tích lũy chậm mà chắc, hoặc những biến động gắn liền với sự nghiệp và thị trường.`,
                `Hơn thế nữa, ${palaceName} cũng đại diện cho "phong thủy" nội tâm của gia đình. Một không gian sống hòa hợp, gọn gàng, phù hợp với năng lượng sao sẽ giúp vượng khí sinh sôi và bảo vệ tài sản khởi phát từ đó.`,
            ],
            nuance: 'Nhà không chỉ là bất động sản — ngôi nhà thực sự là một "cơ thể sống" cộng hưởng trực tiếp với dòng năng lượng của chủ nhân.',
            cause: `Mức độ vượng suy của ${starNames} ở ${palaceName} chỉ báo tài sản này đến từ kinh doanh, do hưởng thừa kế, hay quá trình tích lũy cá nhân chậm rãi.`,
            tip: pickByName([
                '💡 Thanh lọc đồ đạc không dùng tới định kỳ — không gian thoáng khí thì tài vận mới lưu thông.',
                '💡 Đừng nóng vội trong các quyết định bất động sản lớn — hãy khảo sát kỹ và tin vào trực giác khi bước vào ngôi nhà mường tượng.',
            ], starNames),
        };
    },
    travel: (starNames, palaceName) => {
        const hooks = [
            `✦ Bước chân ra thế giới bên ngoài, không gian thể hiện cái tôi xã hội — ${starNames} tại ${palaceName} chính là la bàn của bạn.`,
            `✦ Giao tế, những cuộc dịch chuyển, xu hướng ly hương hay lập nghiệp xa — cung ${palaceName} bị chi phối bởi ${starNames} chứa mọi đáp án.`,
        ];
        return {
            hook: pickByName(hooks, palaceName + starNames),
            effectParagraphs: [
                `Khi bước ra ngoài xã hội, khí chất và vận hội của bạn thay đổi so với khi ở nhà. ${starNames} tại ${palaceName} biểu thị mức độ thuận lợi trong các chuyến đi, sự tương tác với môi trường bên ngoài, và cách người khác nhìn nhận bạn.`,
                `Đôi khi, năng lượng của sao này lại thúc đẩy sự nghiệp tiến xa hơn qua những lần thay đổi chỗ ở, du học, hay di chuyển công tác. Ra ngoài tìm kiếm cơ hội lớn, ngoại giao càng năng động thì sự phát triển cá nhân càng được mở rộng.`,
            ],
            nuance: 'Kết nối mạng lưới (networking) tốt đôi khi giá trị hơn mọi tấm bằng xuất sắc. Nhưng di chuyển mù quáng thì chỉ đem lại mệt mỏi hư hao.',
            cause: `Tương tác giữa ${starNames} và cung ${palaceName} quyết định "vận số xuất hành", khả năng thích nghi và sự hanh thông khi làm việc, định cư hoặc ngoại giao xa nhà.`,
            tip: pickByName([
                '💡 Xây dựng hình ảnh cá nhân (personal branding) mạnh mẽ ở những môi trường mới.',
                '💡 Luôn có sự chuẩn bị kỹ trong các chuyến hành trình lớn để tránh bị động khi có sự thay đổi kế hoạch rẽ ngang.',
            ], starNames),
        };
    },
    servants: (starNames, palaceName) => {
        const hooks = [
            `✦ Mạng lưới xã hội, cấp dưới, đồng nghiệp — ${starNames} tại ${palaceName} quyết định chất lượng của những người hỗ trợ bạn.`,
            `✦ Không ai thành công một mình. Cung ${palaceName} chiếu rọi với ${starNames} chỉ ra cách "thu phục nhân tâm" đắc lực nhất.`,
        ];
        return {
            hook: pickByName(hooks, palaceName + starNames),
            effectParagraphs: [
                `Kỹ năng lãnh đạo, sức ảnh hưởng, và mối duyên với bạn bè, đồng sự được mô tả chi tiết tại cung ${palaceName} có ${starNames}. Bạn có duyên gặp gỡ nhiều người, nhưng chất lượng mới quan trọng hơn số lượng, có được người tâm phúc hỗ trợ hết mình mới là đỉnh cao.`,
                `Đây cũng là cung vị cho thấy cách vượt qua sự cản trở từ yếu tố con người. Hiểu rõ năng lượng này, bạn sẽ nhận ra ai thực sự là người nâng bước, và ai cần giữ một khoảng cách nhất định để bảo toàn đại cục.`,
            ],
            nuance: 'Sức mạnh lớn nhất của một người trưởng thành không nằm ở việc sai bảo người khác thế nào, mà nằm ở việc biết đặt đúng người vào đúng chỗ.',
            cause: `Đây là hệ quả từ sự "ban phát năng lượng" của ${starNames} lên cung ${palaceName}, xác lập uy thế, mức độ tin cậy và khả năng cộng tác nhóm trong tổ chức.`,
            tip: pickByName([
                '💡 Lắng nghe nhiều hơn nói khi tiếp xúc cấp dưới — thấu hiểu sâu sắc là nền tảng quản trị.',
                '💡 Đánh giá một mối quan hệ qua hành động khi hoạn nạn, không qua lời hứa lúc vui vẻ.',
            ], starNames),
        };
    },
    children: (starNames, palaceName) => {
        const hooks = [
            `✦ Sản phẩm của tình yêu, cũng là nguồn sống của tương lai — cung ${palaceName} dưới ánh sáng ${starNames} vẽ nên câu chuyện về hậu duệ.`,
            `✦ Sự tiếp nối sinh mệnh và những sáng tạo cá nhân (con cái) chịu sự dẫn lối từ năng lượng của ${starNames} tại ${palaceName}.`,
        ];
        return {
            hook: pickByName(hooks, palaceName + starNames),
            effectParagraphs: [
                `Cung ${palaceName} với ${starNames} thể hiện các khía cạnh liên quan tới việc sinh con, sự gắn kết phụ tử/mẫu tử, cũng như cách giáo dục con cái sao cho thuận tình hợp lý. Nó báo trước sự thuận lợi trong sinh nở, cũng như dấu ấn tính cách đặc trưng của các con.`,
                `Rộng hơn nữa, cung này còn là sự đại diện cho "trái ngọt" trong lao động — học trò, những dự án tâm huyết, hay các sản phẩm sáng tạo do chính bạn ấp ủ nuôi dưỡng sinh thành. Một dự án tốt cũng mang lại niềm tự hào như một đứa con ngoan.`,
            ],
            nuance: 'Con cái (hay tác phẩm) là một bản thể độc lập, đừng ép chúng trở thành phiên bản thứ hai của bạn. Hãy là ngọn đèn chỉ đường, không phải là bức tường chắn gió.',
            cause: `Bản chất của ${starNames} nằm tại ${palaceName} sẽ cấu trúc mức độ quan tâm, sự xung khắc hoặc hòa hợp giữa hai thế hệ, định hình phương pháp nuôi dạy đặc hữu.`,
            tip: pickByName([
                '💡 Dành "thời gian vô tri" với những người nhỏ tuổi — một lối giáo dục gắn kết tự nhiên nhưng hiệu quả.',
                '💡 Ghi nhận một dự án cá nhân tâm huyết và coi nó như "đứa con" để tập trung bồi lấp năng lượng hằng ngày.',
            ], starNames),
        };
    },
    siblings: (starNames, palaceName) => {
        const hooks = [
            `✦ Những người cùng chung dòng máu và những người "kề vai sát cánh" — cung ${palaceName} cộng hưởng với ${starNames}.`,
            `✦ Anh em trong nhà, những trợ thủ đồng cấp, hay cộng sự làm ăn — mối quan hệ này gắn kết qua lăng kính của ${starNames} tại ${palaceName}.`,
        ];
        return {
            hook: pickByName(hooks, palaceName + starNames),
            effectParagraphs: [
                `Mối tương quan với anh chị em ruột, mức độ đùm bọc, giúp đỡ hay những xích mích có thể nảy sinh được định vị bởi ${starNames} ở cung ${palaceName}. Nó chỉ báo xem bạn có thể nhờ cậy hay phải là người gánh vác, hy sinh cho sự nghiệp chung của họ.`,
                `Mở rộng ra ngoài, cung vị này cũng đại diện cho bạn bè đồng lứa, đối tác chung vốn, hay cổ đông ngang hàng. Mức độ hợp tác, chia sẻ lợi ích minh bạch quyết định trực tiếp đến sự hưng suy trong sự nghiệp và tài lộc sau này.`,
            ],
            nuance: 'Trong tình cảm anh em, hãy dùng lý trí để bảo quản mối quan hệ bền chặt. Khởi dựng dự án kinh doanh cùng người nhà cần quy tắc sòng phẳng như người dưng.',
            cause: `Tính chất hung cát của ${starNames} tại ${palaceName} thiết lập mức độ tương hỗ hoặc tranh đoạt nguồn năng lượng giữa những bản thể có chung bệ đỡ nền tảng.`,
            tip: pickByName([
                '💡 Duy trì ranh giới rõ ràng trong hợp tác làm ăn với bạn thân/anh em — tiền bạc rõ ràng thì tình nghĩa mới lâu dài.',
                '💡 Hãy là người chủ động thu ráp, chủ trì những buổi sum họp bình thường để nối kết sức mạnh đồng lứa.',
            ], starNames),
        };
    },
};


// ═══════════════════════════════════════════════════════════════════
// Star-Specific Narratives (14 Major Stars × 5 Areas × 3 Brightness)
// Only the most impactful combinations are hand-crafted;
// the rest fall through to AREA_FALLBACK_NARRATIVES
// ═══════════════════════════════════════════════════════════════════

export const STAR_NARRATIVE_KB: StarNarrativeKB = {
    'Tử Vi': {
        personality: {
            mieuVuong: {
                hook: '✦ Bạn mang trong mình khí chất của người đứng đầu — không phải vì bạn muốn, mà vì đó là bản năng tự nhiên.',
                effectParagraphs: [
                    'Tử Vi Miếu Vượng tại cung Mệnh ban cho bạn sự tự tin thâm trầm và uy nghi tự nhiên. Không cần nói nhiều, sự hiện diện của bạn đã đủ khiến người khác chú ý. Bạn có tầm nhìn xa và khả năng quyết đoán mà nhiều người phải mất cả đời mới học được.',
                    'Đặc biệt, bạn có "từ trường lãnh đạo" — quý nhân tự tìm đến phò trợ mà không cần mời gọi. Đây là đặc quyền rất hiếm trong tử vi.',
                ],
                nuance: 'Đỉnh cao bao giờ cũng đi kèm cô đơn. Bạn có thể cảm thấy khó tìm người thực sự thấu hiểu tầm nhìn của mình. Sự kiêu hãnh bẩm sinh đôi khi khiến bạn khó lắng nghe ý kiến khác.',
                cause: 'Tử Vi — sao Đế Vương — khi ở trạng thái Miếu Vượng tỏa hết năng lượng quyền uy. Đây là cách cục "quý nhân tự đến" trong tướng mệnh học.',
                tip: '💡 Hãy nuôi dưỡng sự khiêm tốn bên cạnh uy quyền tự nhiên — lãnh đạo vĩ đại nhất là người biết lắng nghe.',
            },
            dacBinh: {
                hook: '✦ Bạn có chí hướng lớn và tầm nhìn xa — nhưng con đường hiện thực hóa đòi hỏi sự kiên nhẫn đặc biệt.',
                effectParagraphs: [
                    'Tử Vi Đắc Bình cho bạn hoài bão và phong thái vượt trội so với người cùng trang lứa. Tuy nhiên, khác với người Tử Vi toàn sáng, bạn phải tự mình xây dựng nền tảng quyền lực — quý nhân có nhưng không phải lúc nào cũng sẵn sàng.',
                ],
                nuance: 'Thử thách lớn nhất là không nản lòng khi kết quả đến chậm hơn mong đợi. Sự kiên trì chính là phẩm chất sẽ phân biệt bạn với đám đông.',
                cause: 'Tử Vi Đắc Bình — đế tinh sáng vừa đủ. Tiềm năng lãnh đạo hiện hữu nhưng cần nỗ lực và thời gian để khai phá.',
                tip: '💡 Tập trung xây dựng mạng lưới quý nhân chủ động — đó là "vũ khí bí mật" cho cách cục này.',
            },
            ham: {
                hook: '✦ Bên trong bạn có một ngọn lửa tham vọng không ngừng cháy — nhưng nó cần hướng đi đúng để tỏa sáng.',
                effectParagraphs: [
                    'Tử Vi Hãm cho bạn chí hướng rất lớn — điều này không sai. Nhưng khoảng cách giữa tham vọng và thực lực đôi khi tạo ra cảm giác bất lực. Bạn có thể cảm thấy mình xứng đáng với nhiều hơn nhưng hoàn cảnh chưa cho phép.',
                ],
                nuance: 'Đây không phải "xấu" — đây là bài học về sự kiên nhẫn và tự lực. Nhiều vĩ nhân trong lịch sử có Tử Vi Hãm nhưng vẫn thành công nhờ nỗ lực phi thường.',
                cause: 'Tử Vi Hãm địa — đế tinh bị lu mờ. Năng lượng lãnh đạo vẫn tiềm ẩn nhưng cần được đánh thức qua trải nghiệm thực tế.',
                tip: '💡 Xây dựng thực lực từ những bước nhỏ — mỗi thành tựu nhỏ là viên gạch cho tòa thành lớn.',
            },
        },
        career: {
            mieuVuong: {
                hook: '✦ Sự nghiệp của bạn được định sẵn ở những vị trí cao — câu hỏi không phải "có đạt được không" mà là "khi nào".',
                effectParagraphs: [
                    'Với Tử Vi Miếu Vượng ảnh hưởng đến sự nghiệp, bạn có cách cục công danh rất đẹp. Bạn phù hợp với vai trò lãnh đạo, quản lý, hoặc những vị trí đòi hỏi tầm nhìn chiến lược. Năng lực ra quyết định và khí chất uy nghi giúp bạn tự nhiên được đề bạt.',
                ],
                nuance: 'Quyền lực đi kèm trách nhiệm. Bạn cần cẩn trọng với những quyết định ảnh hưởng đến nhiều người — áp lực ở vị trí cao không phải ai cũng chịu nổi.',
                cause: 'Đế tinh Miếu Vượng chiếu vào cung sự nghiệp — cách cục "vương giả chi lộ" (con đường của vua) trong tử vi cổ.',
                tip: '💡 Khám phá thời điểm vàng để thăng tiến và lĩnh vực phù hợp nhất trong bản phân tích Premium.',
            },
        },
        love: {
            mieuVuong: {
                hook: '✦ Bạn yêu như một vị vua — hào phóng, trung thành, nhưng cũng đầy kỳ vọng về sự tôn trọng.',
                effectParagraphs: [
                    'Tử Vi Miếu Vượng ảnh hưởng đến tình cảm cho thấy bạn có phong thái cao quý trong tình yêu. Bạn tìm kiếm người bạn đời xứng đáng — không chỉ về ngoại hình mà còn về phẩm chất và tầm nhìn. Khi yêu, bạn rất chung thủy và hào phóng.',
                ],
                nuance: 'Sự kiêu hãnh bẩm sinh đôi khi khiến bạn khó mở lòng trước. Bạn cần học cách cho phép mình "yếu đuối" trước người yêu — đó không phải điểm yếu, mà là sức mạnh khác.',
                cause: 'Đế tinh ảnh hưởng đến cách bạn nhìn nhận và xây dựng mối quan hệ — luôn với tiêu chuẩn cao và sự trang trọng.',
                tip: '💡 Tải bản đầy đủ để xem phân tích chi tiết về mô hình người bạn đời lý tưởng theo lá số Tử Vi.',
            },
        },
    },

    'Thái Dương': {
        personality: {
            mieuVuong: {
                hook: '✦ Bạn tỏa năng lượng như mặt trời — thu hút và truyền cảm hứng cho mọi người xung quanh mà không cần cố gắng.',
                effectParagraphs: [
                    'Thái Dương Miếu Vượng ban cho bạn sức hút tự nhiên, sự quang minh chính đại và danh tiếng dễ đạt. Bạn sống ngay thẳng, ghét sự lắt léo, và luôn muốn soi sáng cho người khác. Trong bất kỳ nhóm nào, bạn thường là trung tâm — dù có muốn hay không.',
                    'Đặc biệt, bạn có "hào quang bảo vệ" — sát tinh gặp Thái Dương sáng cũng phải giảm bớt hung khí. Đây là phúc lớn của bản mệnh.',
                ],
                nuance: 'Mặt trời cho đi ánh sáng nhưng đôi khi quên tự chăm sóc mình. Bạn có xu hướng hy sinh bản thân vì người khác — hay lo chuyện thiên hạ mà quên chuyện nhà.',
                cause: 'Thái Dương — sao chủ quyền lực và danh tiếng — khi Miếu Vượng thì quang minh rực rỡ, soi sáng mọi cung chiếu đến.',
                tip: '💡 Học cách nói "không" với những việc không thuộc về mình — giữ năng lượng cho những điều thực sự quan trọng.',
            },
            ham: {
                hook: '✦ Bạn có trái tim muốn tỏa sáng — nhưng đôi khi cảm thấy thế giới chưa sẵn sàng cho ánh sáng của bạn.',
                effectParagraphs: [
                    'Thái Dương Hãm cho thấy bạn có hoài bão lớn về danh tiếng và sự công nhận, nhưng con đường thực hiện không trải thảm đỏ. Bạn có thể gặp những tình huống bị hiểu lầm hoặc không được đánh giá đúng năng lực.',
                ],
                nuance: 'Đây là cách cục "muộn nở" — không phải không tỏa sáng, mà là cần thời gian và đúng hoàn cảnh. Nhiều người Thái Dương Hãm thành công lớn từ trung niên trở đi.',
                cause: 'Thái Dương Hãm — nhật thực. Năng lượng rực rỡ bị che khuất tạm thời, cần nỗ lực và kiên nhẫn để vượt qua.',
                tip: '💡 Đừng so sánh tiến trình của mình với người khác — thời điểm tỏa sáng của mỗi người là khác nhau.',
            },
        },
        career: {
            mieuVuong: {
                hook: '✦ Bạn sinh ra để làm những công việc có tầm ảnh hưởng — nơi bạn có thể soi sáng và dẫn dắt.',
                effectParagraphs: [
                    'Thái Dương Miếu Vượng ở cung sự nghiệp là cách cục "danh vọng hiển hách". Bạn phù hợp với các lĩnh vực công khai: chính trị, truyền thông, giáo dục, hoặc bất kỳ ngành nào đòi hỏi sự minh bạch và uy tín. Thăng tiến đến tự nhiên nhờ uy tín cá nhân.',
                ],
                nuance: 'Danh tiếng là con dao hai lưỡi. Thành công càng lớn, bạn càng bị soi xét — cần giữ vững đạo đức nghề nghiệp.',
                cause: 'Thái Dương sáng chiếu cung Quan Lộc — cách cục "quang minh quan lộ" của tử vi cổ truyền.',
                tip: '💡 Tải bản Premium để xem phân tích 5 lĩnh vực sự nghiệp phù hợp nhất và thời điểm vàng thăng tiến.',
            },
        },
    },

    'Vũ Khúc': {
        personality: {
            mieuVuong: {
                hook: '✦ Bạn có bản năng tài chính mà người khác phải học cả đời — tiền bạc đến với bạn như thể có nam châm.',
                effectParagraphs: [
                    'Vũ Khúc Miếu Vượng cho bạn tâm trí quyết đoán, sắc bén trong mọi vấn đề tài chính và vật chất. Bạn phân tích rủi ro nhanh, ra quyết định dứt khoát, và không để cảm xúc chi phối chuyện tiền bạc — đây là phẩm chất của những doanh nhân thành đạt.',
                ],
                nuance: 'Sự quyết đoán cứng rắn đôi khi khiến bạn khó mềm mỏng trong các mối quan hệ. "Cô độc trên đỉnh phú quý" là rủi ro cần ý thức.',
                cause: 'Vũ Khúc — tài tinh chính — khi Miếu Vượng là cách cục "kim ngân mãn đường" (vàng bạc đầy nhà).',
                tip: '💡 Cân bằng giữa IQ tài chính và EQ quan hệ — thành công bền vững cần cả hai.',
            },
        },
        career: {
            mieuVuong: {
                hook: '✦ "Vùng thiên phú" của bạn nằm ở tài chính — bạn có bản năng kiếm tiền mà nhiều người cả đời không có.',
                effectParagraphs: [
                    'Vũ Khúc Miếu Vượng ở cung sự nghiệp cho thấy bạn cực kỳ phù hợp với các lĩnh vực tài chính, đầu tư, ngân hàng, bất động sản. Bạn có "mũi" đánh hơi cơ hội kinh doanh và khả năng tính toán lợi nhuận chính xác.',
                ],
                nuance: 'Tham vọng tài chính lớn đi kèm rủi ro lớn. Cần biết dừng đúng lúc và đa dạng hóa — đừng "bỏ tất cả trứng vào một giỏ".',
                cause: 'Tài tinh Miếu Vượng tọa cung Quan Lộc — cách "phú quý do nghề" trong tử vi cổ.',
                tip: '💡 Tải bản phân tích chi tiết để xem 3 lĩnh vực đầu tư phù hợp nhất theo năng lượng lá số.',
            },
        },
    },

    'Thiên Cơ': {
        personality: {
            mieuVuong: {
                hook: '✦ Tâm trí bạn hoạt động như một siêu máy tính — phân tích, lập kế hoạch, tìm giải pháp nhanh hơn hầu hết mọi người.',
                effectParagraphs: [
                    'Thiên Cơ Miếu Vượng ban cho bạn trí tuệ sắc sảo và khả năng tư duy chiến lược xuất chúng. Bạn nhìn ra những mô hình và quy luật mà người khác bỏ qua, đặc biệt giỏi trong việc lập kế hoạch dài hạn và dự đoán xu hướng.',
                ],
                nuance: 'Suy nghĩ quá nhiều là con dao hai lưỡi. Đôi khi bạn phân tích đến mức "tê liệt" — trì hoãn hành động vì muốn mọi thứ hoàn hảo.',
                cause: 'Thiên Cơ — mưu tinh — khi Miếu Vượng là "quân sư bách chiến" trong tướng mệnh.',
                tip: '💡 Đặt deadline cho việc ra quyết định — tránh rơi vào "vòng xoáy phân tích" vô tận.',
            },
        },
    },

    'Thái Âm': {
        personality: {
            mieuVuong: {
                hook: '✦ Bạn sở hữu chiều sâu cảm xúc mà không phải ai cũng có — trực giác của bạn là "la bàn" đáng tin cậy nhất.',
                effectParagraphs: [
                    'Thái Âm Miếu Vượng cho bạn tâm hồn tinh tế, nhạy cảm với vẻ đẹp và cảm xúc của cuộc sống. Bạn có khả năng "đọc" con người và tình huống qua trực giác — thứ mà lý trí đôi khi không giải thích được nhưng hiếm khi sai.',
                    'Ngoài ra, đây là cách cục rất tốt cho tài lộc êm đềm và bất động sản — của cải đến một cách nhẹ nhàng, tự nhiên.',
                ],
                nuance: 'Nhạy cảm quá mức có thể khiến bạn dễ bị tổn thương. Bạn hấp thụ năng lượng tiêu cực từ môi trường xung quanh — cần xây dựng "lá chắn cảm xúc" cho riêng mình.',
                cause: 'Thái Âm — nguyệt tinh — khi Miếu Vượng như trăng rằm sáng tỏ. Tài lộc, điền trạch, và trực giác đều đạt đỉnh.',
                tip: '💡 Dành thời gian ở những không gian yên tĩnh, gần thiên nhiên — đó là cách "sạc pin" tốt nhất cho năng lượng Thái Âm.',
            },
        },
        love: {
            mieuVuong: {
                hook: '✦ Tình yêu với bạn không phải cuộc phiêu lưu — mà là bến bình yên, nơi tâm hồn thực sự được an ủi.',
                effectParagraphs: [
                    'Thái Âm Miếu Vượng ở cung tình cảm cho thấy bạn yêu sâu sắc, lặng lẽ, và cực kỳ trung thành. Bạn tìm kiếm sự kết nối tâm hồn hơn là đam mê bạo liệt. Khi tìm đúng người, mối quan hệ trở nên êm đềm như dòng nước.',
                ],
                nuance: 'Bạn có xu hướng hy sinh quá nhiều cho người yêu mà quên chăm sóc bản thân. Tình yêu cần cân bằng — cho đi và nhận lại.',
                cause: 'Nguyệt tinh Miếu Vượng — cách cục "êm đềm hạnh phúc" trong tình duyên.',
                tip: '💡 Tải bản đầy đủ để khám phá mô hình bạn đời lý tưởng và các pha tình cảm theo vận hạn.',
            },
        },
    },

    'Tham Lang': {
        personality: {
            mieuVuong: {
                hook: '✦ Bạn là người đa tài — giỏi giao tiếp, sáng tạo, và có sức quyến rũ tự nhiên mà ít ai sánh được.',
                effectParagraphs: [
                    'Tham Lang Miếu Vượng cho bạn năng lượng đào hoa tích cực — không chỉ về ngoại hình mà còn về phong thái và cách giao tiếp. Bạn dễ dàng thu hút mọi người, giỏi networking, và có tài năng nghệ thuật thiên bẩm.',
                ],
                nuance: '"Đa tài nhưng đa tình" là rủi ro lớn nhất. Bạn cần tập trung năng lượng vào một vài lĩnh vực chính thay vì phân tán quá rộng.',
                cause: 'Tham Lang Miếu Vượng — đào hoa tinh ở trạng thái tốt nhất, sáng tạo và quyến rũ mà vẫn giữ được bản lĩnh.',
                tip: '💡 Chọn 2-3 lĩnh vực tập trung thay vì cùng lúc 10 — chiều sâu luôn đánh bại chiều rộng.',
            },
        },
    },

    'Thất Sát': {
        personality: {
            mieuVuong: {
                hook: '✦ Bạn có ý chí sắt đá và bản lĩnh vượt qua mọi thử thách — cuộc đời bạn được rèn luyện qua lửa.',
                effectParagraphs: [
                    'Thất Sát Miếu Vượng ban cho bạn khí chất mạnh mẽ, quyết đoán, và không bao giờ lùi bước. Bạn gặp nhiều thử thách hơn người bình thường — nhưng mỗi lần vượt qua, bạn trở nên mạnh mẽ hơn bội phần. Đây là cách cục "gặp dữ hóa lành".',
                ],
                nuance: 'Sức mạnh quá lớn cần được kiểm soát. Nếu không cẩn thận, sự quyết đoán có thể biến thành bạo lực hoặc áp đặt — đặc biệt trong các mối quan hệ gần gũi.',
                cause: 'Thất Sát — tướng tinh — khi Miếu Vượng là "hổ tướng oai phong", gặp hung cũng hóa cát.',
                tip: '💡 Tìm một "kênh thoát" cho năng lượng mạnh mẽ này — thể thao, võ thuật, hoặc kinh doanh mạo hiểm.',
            },
        },
    },

    'Thiên Phủ': {
        personality: {
            mieuVuong: {
                hook: '✦ Bạn là "kho báu sống" — ổn định, đáng tin cậy, và luôn biết cách xây dựng nền tảng vững chắc cho mọi thứ.',
                effectParagraphs: [
                    'Thiên Phủ Miếu Vượng cho bạn phong thái điềm đạm, khả năng quản lý tài chính xuất sắc, và sự ổn định mà nhiều người mơ ước. Bạn không chạy theo xu hướng — bạn xây dựng giá trị bền vững.',
                ],
                nuance: 'Ổn định quá mức có thể trở thành bảo thủ. Đôi khi bạn cần dám chấp nhận rủi ro để đạt được bước nhảy vọt.',
                cause: 'Thiên Phủ — kho tàng tinh — Miếu Vượng là "kho đầy đủ", nền tảng vật chất và tinh thần vững vàng.',
                tip: '💡 Đừng sợ thay đổi — sự ổn định thực sự đến từ khả năng thích ứng, không phải đứng yên.',
            },
        },
    },

    'Thiên Đồng': {
        personality: {
            mieuVuong: {
                hook: '✦ Cuộc đời bạn được phúc đức che chở — ngay cả trong gian nan, bạn vẫn tìm thấy ánh sáng cuối đường hầm.',
                effectParagraphs: [
                    'Thiên Đồng Miếu Vượng là phúc tinh tỏa sáng — bạn có đời sống tinh thần phong phú, tính tình ôn hòa, và khả năng thụ hưởng vượt trội. Người có cách cục này thường có tuổi già an nhàn, phúc lộc dồi dào.',
                ],
                nuance: 'Phúc quá dày có thể tạo ra sự lười biếng hoặc thiếu ý chí phấn đấu. Cần chủ động tạo thử thách cho bản thân để không rơi vào "vùng an toàn" quá lâu.',
                cause: 'Thiên Đồng — phúc tinh — Miếu Vượng là "phúc dày đức hậu", được che chở bởi năng lượng tích cực.',
                tip: '💡 Đặt ra mục tiêu vượt ranh giới thoải mái mỗi quý — phúc đức cần được kết hợp với nỗ lực.',
            },
        },
    },

    'Thiên Lương': {
        personality: {
            mieuVuong: {
                hook: '✦ Bạn có phẩm chất của một bậc hiền giả — đạo đức, trí tuệ, và sự bình thản hiếm có trước mọi biến cố.',
                effectParagraphs: [
                    'Thiên Lương Miếu Vượng cho bạn tâm tính chính trực, khả năng giải nạn giải ách, và phúc thọ song toàn. Người xung quanh tìm đến bạn để xin lời khuyên — vì bạn có sự khách quan và chiều sâu mà ít ai có.',
                ],
                nuance: 'Quá nguyên tắc có thể khiến bạn cứng nhắc và khó thích ứng với thay đổi. Đôi khi "đúng" không quan trọng bằng "hiệu quả".',
                cause: 'Thiên Lương — ấm tinh, thọ tinh — Miếu Vượng là "phúc thọ song toàn", cách cục của bậc hiền giả.',
                tip: '💡 Kết hợp nguyên tắc với sự linh hoạt — trí tuệ thực sự nằm ở khả năng thích ứng.',
            },
        },
    },

    'Liêm Trinh': {
        personality: {
            mieuVuong: {
                hook: '✦ Bạn mang trong mình cả sự liêm khiết lẫn sự nồng cháy — một tổ hợp năng lượng rất mãnh liệt.',
                effectParagraphs: [
                    'Liêm Trinh Miếu Vượng cho bạn tài hoa xuất chúng, sự liêm khiết trong công việc, và sức hút đào hoa vừa đủ để tạo ấn tượng mà không gây rắc rối. Bạn làm gì cũng có tiêu chuẩn cao và không chấp nhận sự tầm thường.',
                ],
                nuance: 'Năng lượng đào hoa mạnh cần được kiểm soát — ranh giới giữa "duyên dáng" và "phức tạp" đôi khi rất mong manh.',
                cause: 'Liêm Trinh — quyền tinh kiêm đào hoa tinh — Miếu Vượng kết hợp hoàn hảo giữa quyền uy và sức hút.',
                tip: '💡 Đầu tư vào một lĩnh vực nghệ thuật hoặc sáng tạo — đó là cách kênh năng lượng đào hoa thành sản phẩm.',
            },
        },
    },

    'Cự Môn': {
        personality: {
            mieuVuong: {
                hook: '✦ Bạn có "siêu năng lực" về ngôn ngữ — khả năng thuyết phục và tranh biện vượt trội.',
                effectParagraphs: [
                    'Cự Môn Miếu Vượng biến tài ăn nói thành vũ khí mạnh nhất của bạn. Bạn phân tích vấn đề sắc sảo, trình bày logic, và có khả năng thay đổi suy nghĩ người khác chỉ bằng lời nói. Phù hợp tuyệt vời với lĩnh vực luật, tư vấn, hoặc truyền thông.',
                ],
                nuance: '"Lời nói sắc bén" cũng có thể gây tổn thương nếu không cẩn thận. Cần học cách chọn thời điểm và đối tượng để "ra đòn" ngôn ngữ.',
                cause: 'Cự Môn — ám tinh — khi Miếu Vượng thì ám muội hóa thành sáng suốt, ngôn ngữ trở thành quyền lực.',
                tip: '💡 Kết hợp tài ăn nói với sự lắng nghe — thuyết phục cao nhất đến từ việc hiểu người khác trước.',
            },
        },
    },

    'Thiên Tướng': {
        personality: {
            mieuVuong: {
                hook: '✦ Bạn là người mà mọi người tin tưởng giao phó — sự chính trực và đáng tin cậy là "thương hiệu" của bạn.',
                effectParagraphs: [
                    'Thiên Tướng Miếu Vượng cho bạn tính cách ngay thẳng, mang "ấn tín" — tức là được giao phó trọng trách và tin tưởng tuyệt đối. Bạn là mẫu người "phò tá" lý tưởng, luôn đứng về lẽ phải.',
                ],
                nuance: 'Quá ngay thẳng đôi khi khiến bạn bị kẹt giữa các phe phái. Cần linh hoạt — không phải mọi tình huống đều phải phân rõ đúng sai.',
                cause: 'Thiên Tướng — ấn tinh — Miếu Vượng là "ấn sáng, quyền đủ", được tín nhiệm và giao phó.',
                tip: '💡 Chọn "chiến tuyến" cẩn thận — không phải trận chiến nào cũng cần bạn tham gia.',
            },
        },
    },

    'Phá Quân': {
        personality: {
            mieuVuong: {
                hook: '✦ Bạn là kẻ tiên phong — phá bỏ cái cũ, khai sáng cái mới, và không bao giờ chấp nhận hiện trạng.',
                effectParagraphs: [
                    'Phá Quân Miếu Vượng cho bạn sức mạnh biến đổi phi thường. Bạn là kiểu người "đập đi xây lại" — và khi Miếu Vượng, quá trình phá hủy sáng tạo này luôn dẫn đến kết quả tốt hơn trạng thái ban đầu.',
                ],
                nuance: 'Thay đổi liên tục có thể gây bất ổn cho bản thân và người xung quanh. Cần phân biệt giữa "cải cách có mục đích" và "phá phách vô định".',
                cause: 'Phá Quân — hao tinh, tiên phong tinh — Miếu Vượng là "phá cũ lập mới thành công", cách cục khai sáng.',
                tip: '💡 Trước khi phá bỏ, hãy chắc chắn bạn đã có bản thiết kế cho thứ sẽ thay thế.',
            },
        },
    },
};

// ═══════════════════════════════════════════════════════════════════
// Lookup API
// ═══════════════════════════════════════════════════════════════════

/**
 * Look up a chart-specific ETC narrative for given star, area, and brightness.
 * Falls back to AREA_FALLBACK_NARRATIVES if no specific entry exists.
 */
export function lookupNarrative(
    starName: string,
    area: LifeAreaType,
    brightness: BrightnessLevel,
    allStarNames: string,
    palaceName: string,
): ETCNarrative {
    // Try exact match: star → area → brightness
    const starEntry = STAR_NARRATIVE_KB[starName];
    if (starEntry) {
        const areaEntry = starEntry[area];
        if (areaEntry) {
            const narrative = areaEntry[brightness];
            if (narrative) return narrative;
            // Try brightest available fallback within the star+area
            if (areaEntry.mieuVuong) return areaEntry.mieuVuong;
            if (areaEntry.dacBinh) return areaEntry.dacBinh;
            if (areaEntry.ham) return areaEntry.ham;
        }
    }

    // Fall back to area-specific default (still unique per area!)
    return AREA_FALLBACK_NARRATIVES[area](allStarNames, palaceName);
}
