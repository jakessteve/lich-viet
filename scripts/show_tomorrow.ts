
import { getDetailedDayData } from '../src/utils/calendarEngine';
import * as fs from 'fs';

const date = new Date(2026, 2, 1);
const data = getDetailedDayData(date);

function formatList(list: string[]) {
    return list.length > 0 ? list.join(', ') : 'Không có';
}

let out = `\n===========================================\n`;
out += `   LỊCH VẠN NIÊN - ${data.solarDate.split('-').reverse().join('/')}\n`;
out += `   (${data.dayGrade})\n`;
out += `===========================================\n`;
out += `Dương lịch: ${data.dayOfWeek}, ${data.solarDate.split('-').reverse().join('/')}\n`;
out += `Âm lịch: Ngày ${data.lunarDate.day} tháng ${data.lunarDate.month} năm ${data.canChi.year.can} ${data.canChi.year.chi}\n`;
out += `Ngày: ${data.canChi.day.can} ${data.canChi.day.chi} (${data.fiveElements.napAm})\n`;
out += `Tháng: ${data.canChi.month.can} ${data.canChi.month.chi} (${data.fiveElements.napAmMonth})\n`;
out += `Năm: ${data.year || ''}\n`;
out += `Tiết khí: ${data.solarTerm}\n`;
out += `Trực: ${data.truc} | Tú: ${data.tu}\n`;
out += `-------------------------------------------\n`;
out += `CÁT THẦN (Sao tốt):\n`;
data.goodStars.forEach(s => out += `   - ${s}\n`);
out += `HUNG THẦN (Sao xấu):\n`;
data.badStars.forEach(s => out += `   - ${s}\n`);

out += `-------------------------------------------\n`;
out += `NGHI (Nên làm):\n`;
data.dungSu.suitable.forEach(act => out += `   + ${act}\n`);
out += `KỴ (Tránh làm):\n`;
data.dungSu.unsuitable.forEach(act => out += `   - ${act}\n`);
out += `-------------------------------------------\n`;
out += `CHI TIẾT 12 GIỜ:\n`;
data.allHours.forEach(h => {
    const statusLabel = h.advancedInfo?.find(info => info.startsWith('Trạng thái:'))?.replace('Trạng thái:', '').trim() || (h.isAuspicious ? 'HOÀNG ĐẠO' : 'HẮC ĐẠO');
    let qualities = `[Điểm: ${h.score}%] - (${statusLabel})`;
    out += `   * Giờ ${h.name} (${h.timeRange}): ${h.canChi.can} ${h.canChi.chi} ${qualities}\n`;

    const lanh = h.nghi.length > 0 ? Array.from(new Set(h.nghi)).join('; ') : '';
    const du = h.ky.length > 0 ? Array.from(new Set(h.ky)).join('; ') : '';

    if (lanh) out += `     + Nghi: ${lanh}\n`;
    if (du) out += `     - Kỵ: ${du}\n`;
});
out += `-------------------------------------------\n`;
out += `BÀNH TỔ BÁCH KỴ:\n`;
out += `   * ${data.banhTo.can}\n`;
out += `   * ${data.banhTo.chi}\n`;
out += `-------------------------------------------\n`;
out += `KHAI SƠN LẬP HƯỚNG (Năm ${data.canChi.year.can} ${data.canChi.year.chi}):\n`;
data.yearlyStars?.forEach(s => {
    out += `   - ${s.name}: ${s.direction} (${s.description})\n`;
});
out += `===========================================\n`;

fs.writeFileSync('tomorrow_full.txt', out, 'utf8');
console.log("Updated tomorrow_full.txt");
