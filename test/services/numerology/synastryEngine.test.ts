import { describe, it, expect } from 'vitest';
import { generateSynastryReport } from '../../../src/services/numerology/synastryEngine';
import type { NumerologyProfile, CoreNumber } from '../../../src/utils/numerologyEngine';

function createMockProfile(name: string, lp: number, su: number, exp: number): NumerologyProfile {
    return {
        fullName: name,
        lifePath: { value: lp } as CoreNumber,
        soulUrge: { value: su } as CoreNumber,
        expression: { value: exp } as CoreNumber,
    } as NumerologyProfile;
}

describe('Synastry Engine (Khớp Đôi Thần Số Học)', () => {
    it('returns 100% aspect score for natural matches (1 and 5)', () => {
        const a = createMockProfile('Person A', 1, 1, 1);
        const b = createMockProfile('Person B', 5, 5, 5);
        const report = generateSynastryReport(a, b);
        expect(report.overallLevel).toBe('excellent');
        expect(report.aspects[0].score).toBe(100);
    });

    it('returns challenging score for conflicting numbers (1 and 8)', () => {
        const a = createMockProfile('Person A', 1, 1, 1);
        const b = createMockProfile('Person B', 8, 8, 8);
        const report = generateSynastryReport(a, b);
        expect(report.overallLevel).toBe('challenging');
        expect(report.aspects[0].score).toBe(40);
    });

    it('correctly reduces Master Numbers to base numbers for compatibility checks (11 -> 2)', () => {
        const a = createMockProfile('Master Elev', 11, 11, 11);
        const b = createMockProfile('Four', 4, 4, 4);
        const report = generateSynastryReport(a, b);
        expect(report.aspects[0].score).toBe(100);
    });

    it('generates a dynamic summary synthesizing all 3 core aspects', () => {
        const a = createMockProfile('Mix A', 1, 2, 3);
        const b = createMockProfile('Mix B', 5, 7, 6);
        
        const report = generateSynastryReport(a, b);
        expect(report.summary).toContain('đồng điệu và dễ dàng hỗ trợ nhau');
        expect(report.summary).toContain('khá trái ngược');
        expect(report.summary).toContain('rất ăn ý');
    });
});
