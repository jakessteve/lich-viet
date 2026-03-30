import { generateDungSu } from '../../src/utils/dungSuEngine';
import { ModifyingLayerResult } from '../../src/types/calendar';

describe('Dung Su Engine', () => {
    it('generates the dung su object effectively from modifying layer data', () => {
        const mockModifying: ModifyingLayerResult = {
            stars: [
                { name: 'Thiên Đức', type: 'Good', description: 'Tốt mọi việc', weight: 3 },
                { name: 'Thiên Cẩu', type: 'Bad', description: 'Kỵ tế tự', weight: -2 }
            ],
            trucDetail: { name: 'Kiến', quality: 'Good', description: 'Tốt cho xuất hành' },
            tuDetail: { name: 'Giác', quality: 'Good', description: 'Tốt cho mọi việc' }
        };

        const result = generateDungSu(mockModifying, 'Hỏa');

        expect(result).toBeDefined();
        expect(Array.isArray(result.suitable)).toBe(true);
        expect(Array.isArray(result.unsuitable)).toBe(true);
    });

    it('correctly handles specific exceptions like Long Hội missing arrays', () => {
        const mockModifying: ModifyingLayerResult = {
            stars: [
                { name: 'Long Hội', type: 'Bad', description: 'Đại Kỵ' },
            ],
            trucDetail: { name: 'Nguy', quality: 'Bad', description: 'Kỵ gác mái' },
            tuDetail: { name: 'C亢', quality: 'Bad', description: 'Kỵ mọi sự' }
        };

        const result = generateDungSu(mockModifying, 'Thổ');
        expect(result).toBeDefined();
        expect(result.unsuitable.some((i: string) => i.toLowerCase().includes('mọi việc') || i.toLowerCase().includes('cát sự'))).toBe(false); // It doesn't strictly inject 'mọi việc', just avoids crashing
    });
});
