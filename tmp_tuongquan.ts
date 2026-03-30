import { generateChart } from './src/services/tuvi/tuviEngine';
import type { ChartInput } from './src/services/tuvi/tuviTypes';

const input: ChartInput = {
    dateType: 'solar',
    solarDate: '1983-11-13',
    timeIndex: 9, 
    gender: 'male', 
    name: 'Test',
    school: 'vi'
};

const chart = generateChart(input);

chart.palaces.forEach((p, i) => {
    const allNames = [
        ...p.majorStars.map(s => s.name),
        ...(p.minorStars as any[]).map(s => s.name),
        ...(p.adjectiveStars as any[]).map(s => s.name)
    ];
    if (allNames.includes('Tướng Quân')) {
        console.log(`Tướng Quân found in Palace ${i} (${p.earthlyBranch})`);
    }
});
