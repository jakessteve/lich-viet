import { describe, it, expect } from 'vitest';
import { calculateSihuaFlows } from '../../src/services/tuvi/sihuaEngine';
import { TuViPalace } from '../../src/services/tuvi/tuviTypes';

const createMockPalace = (
    earthlyBranch: string,
    heavenlyStem: string,
    starNames: string[]
): TuViPalace => ({
    name: 'Mệnh',
    earthlyBranch,
    heavenlyStem,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    majorStars: starNames.map(name => ({ name, type: 'major', brightness: 'V', schoolSource: 'vi' } as any)),
    minorStars: [],
    adjectiveStars: [],
    isBodyPalace: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stage: 'Trường Sinh' as any,
});

describe('sihuaEngine', () => {
    it('should correctly calculate Sihua flows for Giáp stem', () => {
        // Giáp: Liêm Trinh (Lộc), Phá Quân (Quyền), Vũ Khúc (Khoa), Thái Dương (Kỵ)
        const palaces: TuViPalace[] = [
            createMockPalace('Tý', 'Giáp', []), // Source palace
            createMockPalace('Sửu', 'Ất', ['Liêm Trinh']), // Target 1
            createMockPalace('Dần', 'Bính', ['Phá Quân']), // Target 2
            createMockPalace('Mão', 'Đinh', ['Vũ Khúc']), // Target 3
            createMockPalace('Thìn', 'Mậu', ['Thái Dương']), // Target 4
        ];
        
        const flows = calculateSihuaFlows(palaces);
        const giapFlows = flows.filter(f => f.sourcePalace === 'Tý');
        expect(giapFlows).toHaveLength(4);
        expect(giapFlows).toContainEqual({
            sourcePalace: 'Tý',
            targetPalace: 'Sửu',
            targetStar: 'Liêm Trinh',
            mutagen: '禄',
            isSelfHua: false
        });
        expect(flows).toContainEqual({
            sourcePalace: 'Tý',
            targetPalace: 'Mão',
            targetStar: 'Vũ Khúc',
            mutagen: '科',
            isSelfHua: false
        });
    });

    it('should identify self-Hua (isSelfHua = true)', () => {
        // Ất: Thiên Cơ (Lộc), Thiên Lương (Quyền), Tử Vi (Khoa), Thái Âm (Kỵ)
        const palaces: TuViPalace[] = [
            createMockPalace('Tý', 'Ất', ['Thiên Cơ', 'Thiên Lương', 'Tử Vi', 'Thái Âm']), 
        ];

        const flows = calculateSihuaFlows(palaces);
        expect(flows).toHaveLength(4);
        
        const locFlow = flows.find(f => f.mutagen === '禄');
        expect(locFlow?.isSelfHua).toBe(true);
        expect(locFlow?.sourcePalace).toBe('Tý');
        expect(locFlow?.targetPalace).toBe('Tý');
    });

    it('should ignore unrecognized stems', () => {
        const palaces: TuViPalace[] = [
            createMockPalace('Tý', 'UnknownStem', ['Thiên Cơ']),
        ];

        const flows = calculateSihuaFlows(palaces);
        expect(flows).toHaveLength(0);
    });
});
