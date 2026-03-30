import { generateChart } from './src/services/tuvi/tuviEngine';
import type { ChartInput } from './src/services/tuvi/tuviTypes';

const input: ChartInput = {
    dateType: 'solar',
    solarDate: '1983-11-13',
    timeIndex: 9, // 18:30 -> Giờ Dậu. Using 0=Tý, 1=Sửu, ..., 9=Dậu. 
    gender: 'male', // assuming male
    name: 'Test',
    school: 'vi'
};

const chart = generateChart(input);

console.log('Can Chi Year:', chart.config.canChiYear);
console.log('Can Chi Month:', chart.config.canChiMonth);
console.log('Can Chi Day:', chart.config.canChiDay);
console.log('Can Chi Hour:', chart.config.canChiHour);
console.log('Layout:');

chart.palaces.forEach((p, i) => {
    // Log palaces where LocTon, Qingyang, Tuoluo are
    const locTon = p.minorStars.find(s => s.name === 'Lộc Tồn');
    const qingYang = p.minorStars.find(s => s.name === 'Kình Dương');
    const tuoLuo = p.minorStars.find(s => s.name === 'Đà La');
    const huynDeLabel = p.decadalLabels.includes('Huynh Đệ') ? ' [Huynh Đệ]' : '';
    const menhLabel = p.decadalLabels.includes('Mệnh') ? ' [Mệnh]' : '';
    const nameLabel = `[${p.name}]`;
    
    let suffix = '';
    if (locTon) suffix += ' -> LỘC TỒN';
    if (qingYang) suffix += ' -> KÌNH DƯƠNG';
    if (tuoLuo) suffix += ' -> ĐÀ LA';

    console.log(`Palace ${i}: ${p.earthlyBranch} ${nameLabel} ${suffix}`);
});
