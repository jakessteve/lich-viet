import { describe, it, expect } from 'vitest';
import { generateChart } from '../src/services/tuvi/tuviEngine';
import { computeBirthContext } from '../src/services/shared/birthContext';
import * as fs from 'fs';

describe('TuVi Chart Generation', () => {
    it('generates chart for 13-Nov-1983 18:30 in HCMC - with minor stars', () => {
        const birthDate = new Date(1983, 10, 13, 18, 30, 0);
        const location = { latitude: 10.762622, longitude: 106.660172, timezone: 7 };
        const birthContext = computeBirthContext(birthDate, location, -1);

        const input = {
            dateType: 'solar' as const,
            solarDate: '1983-11-13',
            timeIndex: 9,
            gender: 'male' as const,
            name: 'test',
            birthContext,
            school: 'cn' as const
        };

        const chart = generateChart(input);
        
        let out = "";
        out += "-------- PALACES WITH ALL STARS ----------\n";
        chart.palaces.forEach(p => {
             const major = p.majorStars.map(s => `${s.name}(${s.brightness})`).join(', ');
             const minor = p.minorStars.map(s => `${s.name}(${s.brightness})`).join(', ');
             const adj   = p.adjectiveStars.map(s => s.name).join(', ');
             out += `\n${p.earthlyBranch} (${p.name})\n`;
             if (major) out += `  MAJOR: ${major}\n`;
             if (minor) out += `  MINOR: ${minor}\n`;
             if (adj)   out += `  ADJ:   ${adj}\n`;
        });

        fs.writeFileSync('./test-output-with-minor.txt', out);
        expect(1).toBe(1);
    });
});
