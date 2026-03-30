import type { HouseInfo } from '../../types/westernAstro';

// =============================================================================
// 12 Houses — Vietnamese names, life domains, and Tử Vi equivalents
// =============================================================================

export const HOUSES: HouseInfo[] = [
    {
        number: 1, name: 'Nhà 1',
        lifeDomain: 'Bản thân, ngoại hình, sức khỏe thể chất, cách thể hiện ra ngoài',
        tuViEquivalent: 'Mệnh',
        keywords: ['bản ngã', 'ngoại hình', 'ấn tượng đầu tiên', 'sức khỏe'],
    },
    {
        number: 2, name: 'Nhà 2',
        lifeDomain: 'Tài sản, giá trị cá nhân, thu nhập, tài nguyên vật chất',
        tuViEquivalent: 'Tài Bạch',
        keywords: ['tiền bạc', 'giá trị', 'tài sản', 'an ninh tài chính'],
    },
    {
        number: 3, name: 'Nhà 3',
        lifeDomain: 'Giao tiếp, anh em, học tập ngắn hạn, di chuyển gần',
        tuViEquivalent: 'Huynh Đệ',
        keywords: ['giao tiếp', 'anh em', 'hàng xóm', 'học hỏi'],
    },
    {
        number: 4, name: 'Nhà 4',
        lifeDomain: 'Gia đình, nhà cửa, gốc rễ, cha/mẹ, tuổi thơ',
        tuViEquivalent: 'Điền Trạch',
        keywords: ['gia đình', 'nhà cửa', 'gốc rễ', 'cha mẹ'],
    },
    {
        number: 5, name: 'Nhà 5',
        lifeDomain: 'Con cái, sáng tạo, tình yêu lãng mạn, giải trí, đầu cơ',
        tuViEquivalent: 'Tử Nữ',
        keywords: ['con cái', 'sáng tạo', 'tình yêu', 'vui chơi'],
    },
    {
        number: 6, name: 'Nhà 6',
        lifeDomain: 'Sức khỏe, công việc hàng ngày, phục vụ, thói quen',
        tuViEquivalent: 'Tật Ách',
        keywords: ['sức khỏe', 'công việc', 'thói quen', 'chăm sóc'],
    },
    {
        number: 7, name: 'Nhà 7',
        lifeDomain: 'Hôn nhân, đối tác, hợp tác, kẻ thù công khai',
        tuViEquivalent: 'Phu Thê',
        keywords: ['hôn nhân', 'đối tác', 'hợp tác', 'mối quan hệ'],
    },
    {
        number: 8, name: 'Nhà 8',
        lifeDomain: 'Biến đổi, tài chính chung, cái chết, tái sinh, bí mật',
        tuViEquivalent: '—',
        keywords: ['biến đổi', 'bí mật', 'tài chính chung', 'tâm linh'],
    },
    {
        number: 9, name: 'Nhà 9',
        lifeDomain: 'Triết lý, tôn giáo, du lịch xa, giáo dục đại học, pháp luật',
        tuViEquivalent: 'Thiên Di',
        keywords: ['triết lý', 'du lịch', 'giáo dục', 'tín ngưỡng'],
    },
    {
        number: 10, name: 'Nhà 10',
        lifeDomain: 'Sự nghiệp, danh tiếng, vị trí xã hội, mục tiêu công khai',
        tuViEquivalent: 'Quan Lộc',
        keywords: ['sự nghiệp', 'danh tiếng', 'mục tiêu', 'thành tựu'],
    },
    {
        number: 11, name: 'Nhà 11',
        lifeDomain: 'Bạn bè, cộng đồng, ước mơ, tổ chức, mạng lưới xã hội',
        tuViEquivalent: 'Nô Bộc',
        keywords: ['bạn bè', 'cộng đồng', 'ước mơ', 'mạng lưới'],
    },
    {
        number: 12, name: 'Nhà 12',
        lifeDomain: 'Tiềm thức, cô đơn, tâm linh, hy sinh, kẻ thù ẩn giấu',
        tuViEquivalent: 'Phúc Đức',
        keywords: ['tiềm thức', 'tâm linh', 'cô đơn', 'hy sinh'],
    },
];

/** Analysis priority order (most important houses first) */
export const HOUSE_PRIORITY_ORDER = [1, 10, 7, 4, 2, 8, 5, 6, 9, 11, 12, 3];

/** Get house info by number */
export function getHouse(number: number): HouseInfo {
    return HOUSES[number - 1];
}
