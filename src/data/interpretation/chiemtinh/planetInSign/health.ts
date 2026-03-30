/**
 * Chiêm Tinh Narrative Data — Health (Planet-in-Sign)
 *
 * ETC-format narratives for Moon in signs — primary emotional/health indicator.
 * Moon governs emotional wellbeing, stress patterns, and body-mind connection.
 *
 * Psychology: Loss Aversion (health risks) + Curiosity Gap (actionable prevention)
 */

import type { ETCNarrative } from '@/services/interpretation/types';

export type PlanetSignHealthMap = Record<string, Record<string, ETCNarrative>>;

export const CHIEMTINH_HEALTH_NARRATIVES: PlanetSignHealthMap = {
    Moon: {
        Aries: {
            hook: 'Cơ thể bạn phản ứng cực nhanh với stress — và cách bạn xử lý nó quyết định mọi thứ.',
            effectParagraphs: [
                'Moon Bạch Dương cho bạn hệ thống thần kinh luôn ở trạng thái "sẵn sàng chiến đấu". Adrenaline chạy cao, phản ứng nhanh, nhưng cũng dễ bùng nổ. Bạn cần hoạt động thể chất HÀNG NGÀY — không phải luxury, mà là medicine.',
                'Đặc biệt, đầu và hệ thần kinh là vùng nhạy cảm. Đau đầu, mất ngủ vì nghĩ quá nhiều, hoặc căng cơ vùng cổ vai — đây là tín hiệu cơ thể cần được lắng nghe.',
                'Mặt tích cực: năng lượng phục hồi nhanh. Bạn ốm nhanh nhưng khỏe cũng nhanh — miễn là cho cơ thể nghỉ ngơi đúng cách.',
            ],
            nuance: 'Adrenaline junkie lifestyle có giá: burnout. Học cách "cool down" sau mỗi giai đoạn cao áp.',
            cause: 'Moon tại Bạch Dương — cảm xúc bốc lửa, cần kênh giải phóng năng lượng.',
            tip: 'HIIT 20 phút mỗi sáng — đốt cháy cortisol trước khi nó đốt cháy bạn.',
        },
        Taurus: {
            hook: 'Cơ thể bạn là ngôi đền — nuôi dưỡng nó đúng cách và nó sẽ bền bỉ cả đời.',
            effectParagraphs: [
                'Moon Kim Ngưu cho bạn thể chất bền bỉ và sức đề kháng tốt. Bạn hiếm khi ốm vặt — nhưng khi ốm thì khá nặng vì cơ thể "chịu" quá lâu trước khi phát tín hiệu.',
                'Cổ họng, tuyến giáp, và hệ tiêu hóa là vùng cần chú ý. Đặc biệt, stress ở bạn hay biểu hiện qua ăn uống (ăn quá nhiều hoặc chán ăn).',
                'Mặt tích cực: bạn có mối liên hệ tự nhiên với đồ ăn — biết cơ thể cần gì. Hãy tin trực giác ẩm thực.',
            ],
            nuance: 'Comfort eating là cơ chế đối phó — nhưng không phải giải pháp. Tìm cách xử lý stress không qua đồ ăn.',
            cause: 'Moon tại Kim Ngưu — exaltation, cơ thể và cảm xúc kết nối chặt qua giác quan.',
            tip: 'Meal prep hàng tuần — khi stress tấn công, đồ ăn lành mạnh sẵn sàng giúp bạn không "cheat".',
        },
        Gemini: {
            hook: 'Não bạn không bao giờ ngưng — và đôi khi đó là vấn đề sức khỏe lớn nhất.',
            effectParagraphs: [
                'Moon Song Tử cho bạn tâm trí cực kỳ hoạt động — overthinking, insomnia, anxiety. Hệ thần kinh dễ bị quá tải bởi quá nhiều thông tin. Phổi, tay, và hệ hô hấp là vùng cần chú ý.',
                'Đặc biệt, stress ở bạn biểu hiện qua tay run, khó thở, hoặc nói nhanh hơn bình thường.',
            ],
            nuance: 'Mental health quan trọng ngang physical health. Tâm trí không được nghỉ = cơ thể không phục hồi.',
            cause: 'Moon tại Song Tử — cảm xúc biến đổi nhanh, cần kênh giải phóng trí tuệ.',
            tip: 'Journaling 10 phút trước ngủ — đổ hết thoughts ra giấy để não được "shutdown".',
        },
        Cancer: {
            hook: 'Cảm xúc và sức khỏe ở bạn liên kết MẬT THIẾT — vui khỏe, buồn ốm.',
            effectParagraphs: [
                'Moon Cự Giải — domicile, kết nối cảm xúc-cơ thể mạnh nhất. Dạ dày, ngực, và hệ tiêu hóa là vùng nhạy. Khi buồn, bạn đau bụng. Khi lo, bạn mất ngủ. Khi hạnh phúc, bạn khỏe re.',
                'Water retention, hormone, và hệ bạch huyết cần được theo dõi — đặc biệt theo chu kỳ tháng.',
                'Mặt tích cực: trực giác sức khỏe rất mạnh. Bạn "biết" khi cơ thể sắp ốm trước khi symptoms xuất hiện.',
            ],
            nuance: 'Đừng ignore emotional pain — nó SẼ biến thành physical pain nếu không được xử lý.',
            cause: 'Moon domicile tại Cự Giải — cảm xúc là chìa khóa sức khỏe.',
            tip: 'Xây dựng "emotional first aid kit": bạn thân, nhạc yêu thích, nơi yên tĩnh — sẵn sàng khi cần.',
        },
        Leo: {
            hook: 'Tim bạn — cả nghĩa đen lẫn nghĩa bóng — là trung tâm sức khỏe.',
            effectParagraphs: [
                'Moon Sư Tử liên kết trực tiếp với tim, tuần hoàn, và lưng. Bạn cần vận động tim mạch đều đặn — cardio không chỉ là exercise, mà là medication.',
                'Stress ở bạn biểu hiện qua drama hóa cảm xúc: bùng nổ → kiệt sức → recovery. Chu kỳ này cần được quản lý.',
            ],
            nuance: 'Pride đôi khi ngăn bạn thừa nhận "tôi không ổn". Seeking help IS strength.',
            cause: 'Moon tại Sư Tử — tim, tuần hoàn, và pride ảnh hưởng đến sức khỏe.',
            tip: 'Cardio 30 phút × 4 lần/tuần — đây là "bảo hiểm tim mạch" tốt nhất.',
        },
        Virgo: {
            hook: 'Bạn quan tâm sức khỏe hơn đa số — nhưng đôi khi quan tâm quá mức lại là vấn đề.',
            effectParagraphs: [
                'Moon Xử Nữ cho bạn body awareness cực cao — bạn nhận ra dấu hiệu nhỏ nhất. Hệ tiêu hóa, ruột, và hệ thần kinh là vùng nhạy. Gut health = mental health ở bạn.',
                'Health anxiety là rủi ro: Google symptoms → worry spiral → real physical symptoms.',
            ],
            nuance: 'Có kế hoạch sức khỏe tốt — nhưng đừng biến nó thành obsession. Relaxation cũng là healthcare.',
            cause: 'Moon tại Xử Nữ — phân tích cơ thể, lo lắng sức khỏe, ruột-não connection.',
            tip: 'Probiotics + fiber + meditation — bộ ba thần thánh cho Virgo Moon.',
        },
        Libra: {
            hook: 'Sức khỏe bạn gắn liền với harmony — mất cân bằng cuộc sống = mất cân bằng cơ thể.',
            effectParagraphs: [
                'Moon Thiên Bình liên kết với thận, da, và hệ nội tiết. Khi cuộc sống mất cân bằng (overwork, xung đột), cơ thể phản ứng qua da (mụn, eczema) hoặc thận.',
                'Đặc biệt, bạn cần quan hệ xã hội lành mạnh — isolation gây stress lớn hơn bạn nghĩ.',
            ],
            nuance: 'Balance không có nghĩa là perfect — nó có nghĩa là linh hoạt điều chỉnh.',
            cause: 'Moon tại Thiên Bình — cân bằng cơ thể và cảm xúc, da và thận nhạy cảm.',
            tip: 'Skincare routine = self-care ritual. Chăm sóc da ngoài = chăm sóc da trong.',
        },
        Scorpio: {
            hook: 'Cơ thể bạn có sức mạnh tái sinh — nhưng đừng push nó quá giới hạn.',
            effectParagraphs: [
                'Moon Bọ Cạp — fall, cảm xúc dữ dội ảnh hưởng trực tiếp đến sức khỏe. Hệ sinh dục, hệ bài tiết, và hormone là vùng cần chú ý. Detox — cả thể chất lẫn tâm lý — là keyword sức khỏe.',
                'Bạn có khả năng phục hồi đáng kinh ngạc — nhưng chỉ khi cho phép bản thân "thả ra" thay vì ôm giữ mọi thứ.',
                'Suppressed emotions = physical disease ở bạn. Nói ra, viết ra, hoặc tìm therapist.',
            ],
            nuance: 'Cường độ cảm xúc cao cần kênh giải phóng lành mạnh — nếu không, cơ thể sẽ "nói thay".',
            cause: 'Moon tại Bọ Cạp — fall, cảm xúc ngầm, detox và tái sinh.',
            tip: 'Monthly "emotional detox": viết ra mọi thứ đang giữ → đốt/xé → symbolic release.',
        },
        Sagittarius: {
            hook: 'Bạn cần FREEDOM để khỏe — bị giam trong routine khiến cả tâm lẫn thân suy nhược.',
            effectParagraphs: [
                'Moon Nhân Mã liên kết với gan, đùi, và hệ cơ bắp lớn. Bạn cần VẬN ĐỘNG MẠNH — hiking, chạy bộ, bơi lội. Ngồi im là kẻ thù sức khỏe.',
                'Đặc biệt, travel therapy có hiệu quả kỳ lạ: thay đổi môi trường = reset cơ thể và tâm trí.',
            ],
            nuance: 'Phiêu lưu quá mức cũng có giá — injury từ sports, jet lag, overconsumption khi du lịch.',
            cause: 'Moon tại Nhân Mã — cần tự do, vận động, và exploration để cân bằng.',
            tip: 'Mỗi tháng, có ít nhất 1 "adventure day" — brain reset tự nhiên.',
        },
        Capricorn: {
            hook: 'Bạn "chịu đựng" giỏi — nhưng cơ thể không phải máy. Nó cũng cần nghỉ.',
            effectParagraphs: [
                'Moon Ma Kết — detriment, xu hướng suppress cảm xúc → stress mãn tính. Xương, khớp, da, và răng là vùng cần chú ý. Bạn già trước tuổi nếu không chăm sóc sớm.',
                'Đặc biệt, vitamin D và calcium quan trọng hơn average — bone health là investment dài hạn.',
                'Mặt tích cực: bạn tuân thủ routine y tế tốt khi đã commit — vấn đề là commit bước đầu.',
            ],
            nuance: 'Toughness không có nghĩa là không cần chăm sóc. "I\'m fine" đôi khi là câu nguy hiểm nhất.',
            cause: 'Moon tại Ma Kết — detriment, suppress cảm xúc, stress mãn tính, xương khớp.',
            tip: 'Massage bi-weekly + calcium supplement — đây là non-negotiable cho Cap Moon.',
        },
        Aquarius: {
            hook: 'Hệ thần kinh bạn hoạt động ở tần số khác — và cần được "maintain" theo cách riêng.',
            effectParagraphs: [
                'Moon Bảo Bình — detriment, mắt cá chân, tuần hoàn, và hệ thần kinh là vùng nhạy. Bạn dễ bị anxiety unusual: không phải lo lắng thường → mà là existential dread hoặc detachment.',
                'Bạn cần communal wellness — group meditation, workout class, hoặc volunteer work giúp regulate hơn solo activities.',
            ],
            nuance: 'Intellectual detachment from emotions KHÔNG phải xử lý emotions. Feel it to heal it.',
            cause: 'Moon tại Bảo Bình — detriment, hệ thần kinh đặc biệt, cần kết nối cộng đồng.',
            tip: 'Group meditation hoặc yoga class — social + spiritual healing combo.',
        },
        Pisces: {
            hook: 'Bạn hấp thụ năng lượng xung quanh như bọt biển — và điều đó ảnh hưởng sức khỏe rất lớn.',
            effectParagraphs: [
                'Moon Song Ngư — cực kỳ nhạy cảm với môi trường. Chân, hệ bạch huyết, và hệ miễn dịch là vùng cần chú ý. Bạn DỄ bị ốm khi ở gần người tiêu cực — energy vampires là kẻ thù số 1.',
                'Đặc biệt, giấc ngủ là medicine quan trọng nhất. Bạn cần ngủ NHIỀU hơn average — 8-9 giờ là minimum.',
                'Mặt tích cực: meditation, yoga, và water therapy (bơi, tắm nước nóng) có hiệu quả chữa lành đặc biệt ở bạn.',
            ],
            nuance: 'Escape mechanisms (alcohol, substances, excessive sleep) là rủi ro — tìm healthy escapes thay thế.',
            cause: 'Moon tại Song Ngư — hấp thụ năng lượng, cần protective boundaries.',
            tip: 'Seawater/pool swim weekly — nước literally "rửa" năng lượng tiêu cực cho Pisces Moon.',
        },
    },
};
