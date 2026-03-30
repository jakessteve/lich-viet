import { describe, it, expect } from 'vitest';
import { generateFullNarrative } from '../../src/services/interpretation/synthesisEngine';
import type { TuViChartSummary, ChiemTinhChartSummary } from '../../src/services/interpretation/archetypeDetector';

describe('Synthesis Engine Integration', () => {
    it('should correctly generate full narrative from TuVi summary', () => {
        const tuviSummary: TuViChartSummary = {
            palaces: [
                {
                    name: 'Mệnh',
                    majorStars: [{ name: 'Tử Vi', brightness: 'Miếu' }],
                    minorStars: ['Văn Xương'],
                    changsheng12: 'Đế Vượng',
                    earthlyBranch: 'Ngọ'
                }
            ],
            detectedPatterns: ['Tử Phủ Vũ Tướng']
        };

        const result = generateFullNarrative('tuvi', tuviSummary);

        expect(result.introduction).toBeDefined();
        expect(result.lifeAreas.length).toBeGreaterThan(0);
        expect(result.archetype).toBeDefined();
        
        // Check for TuVi specific content in result
        const content = JSON.stringify(result);
        expect(content).toContain('Tử Vi');
    });

    it('should correctly generate full narrative from ChiemTinh summary', () => {
        const chiemtinhSummary: ChiemTinhChartSummary = {
            placements: [
                { planet: 'Sun', sign: 'Leo', house: 10 }
            ],
            dominantElement: 'Fire'
        };

        const result = generateFullNarrative('chiemtinh', chiemtinhSummary);

        expect(result.introduction).toBeDefined();
        expect(result.lifeAreas.length).toBeGreaterThan(0);
        
        // Check for ChiemTinh specific content in result
        const content = JSON.stringify(result);
        expect(content).toContain('Leo');
    });
});
