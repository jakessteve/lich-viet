import { getLunarDate } from '../src/utils/calendarEngine';
import { generateBaziChart } from '../src/utils/baziEngine';
import { synthesizeTamThuc } from '../src/utils/tamThucSynthesis';
import { generateFullNarrative } from '../src/services/interpretation/synthesisEngine';
import { performance } from 'perf_hooks';

const iterations = 100;

function benchmark(name: string, fn: () => void) {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        fn();
    }
    const end = performance.now();
    const avg = (end - start) / iterations;
    console.log(`${name}: Avg ${avg.toFixed(4)}ms over ${iterations} iterations`);
}

console.log('--- Performance Benchmarks ---');

// 1. Lunar Calendar Engine
benchmark('Lunar Calendar (getLunarDate)', () => {
    getLunarDate(new Date(2025, 0, 29));
});

// 2. Bazi Engine
benchmark('Bazi Engine (generateBaziChart)', () => {
    generateBaziChart(new Date(1990, 4, 15), 8, true, 105);
});

// 3. Tam Thuc Engine
benchmark('Tam Thuc Engine (synthesizeTamThuc)', () => {
    synthesizeTamThuc(new Date(2026, 0, 15), 3);
});

// 4. Chiem Tinh Engine (Synthesis)
const sampleChart = {
    dominantElement: 'Fire',
    dominantModality: 'Cardinal',
    detectedPatterns: ['Grand Trine'],
    placements: [
        { planet: 'Sun', sign: 'Aries', house: 1 },
        { planet: 'Moon', sign: 'Leo', house: 5 },
        { planet: 'Mercury', sign: 'Taurus', house: 2 },
        { planet: 'Venus', sign: 'Taurus', house: 2 },
        { planet: 'Mars', sign: 'Scorpio', house: 8 },
        { planet: 'Jupiter', sign: 'Sagittarius', house: 9 },
        { planet: 'Saturn', sign: 'Capricorn', house: 10 }
    ]
};
benchmark('Chiem Tinh Engine (generateFullNarrative)', () => {
    generateFullNarrative('chiemtinh', sampleChart as any);
});
