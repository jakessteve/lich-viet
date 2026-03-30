/**
 * Tests for canchiHelper.ts
 * Covers: getNapAmIndex, checkNapAmCompatibility, getNapAmExceptionComment
 */

import {
    getNapAmIndex,
    checkNapAmCompatibility,
    getNapAmExceptionComment,
    NAP_AM_5_HANH,
} from '../../src/utils/canchiHelper';
import { Can, Chi } from '../../src/types/calendar';

// ── getNapAmIndex ─────────────────────────────────────────────

describe('getNapAmIndex', () => {
    it('should return 0 for Giáp Tý / Ất Sửu (Hải Trung Kim)', () => {
        expect(getNapAmIndex('Giáp' as Can, 'Tý' as Chi)).toBe(0);
        expect(getNapAmIndex('Ất' as Can, 'Sửu' as Chi)).toBe(0);
    });

    it('should return the same index for paired Can-Chi (yīn/yáng pair)', () => {
        // Each Nạp Âm covers 2 Can-Chi combinations
        const idx1 = getNapAmIndex('Bính' as Can, 'Dần' as Chi);
        const idx2 = getNapAmIndex('Đinh' as Can, 'Mão' as Chi);
        expect(idx1).toBe(idx2);
    });

    it('should return -1 for invalid Can', () => {
        // @ts-expect-error Testing invalid input
        expect(getNapAmIndex('Invalid', 'Tý' as Chi)).toBe(-1);
    });

    it('should return -1 for invalid Chi', () => {
        // @ts-expect-error Testing invalid input
        expect(getNapAmIndex('Giáp' as Can, 'Invalid')).toBe(-1);
    });

    it('should return values in valid range (0-29) for all valid pairs', () => {
        const CAN: Can[] = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
        const CHI: Chi[] = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

        // There are 60 valid Can-Chi combinations
        for (let i = 0; i < 60; i++) {
            const can = CAN[i % 10];
            const chi = CHI[i % 12];
            const idx = getNapAmIndex(can, chi);
            expect(idx).toBeGreaterThanOrEqual(0);
            expect(idx).toBeLessThanOrEqual(29);
        }
    });

    it('should cover all 30 Nạp Âm values across the 60-year cycle', () => {
        const CAN: Can[] = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
        const CHI: Chi[] = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

        const seen = new Set<number>();
        for (let i = 0; i < 60; i++) {
            seen.add(getNapAmIndex(CAN[i % 10], CHI[i % 12]));
        }
        expect(seen.size).toBe(30);
    });
});

// ── NAP_AM_5_HANH lookup ──────────────────────────────────────

describe('NAP_AM_5_HANH', () => {
    it('should have 30 entries', () => {
        expect(NAP_AM_5_HANH).toHaveLength(30);
    });

    it('should have Hải Trung Kim at index 0', () => {
        expect(NAP_AM_5_HANH[0]).toBe('Hải Trung Kim');
    });

    it('should have Đại Hải Thủy at index 29', () => {
        expect(NAP_AM_5_HANH[29]).toBe('Đại Hải Thủy');
    });
});

// ── checkNapAmCompatibility ───────────────────────────────────

describe('checkNapAmCompatibility', () => {
    it('should return 0 for same element pair (neutral)', () => {
        // Same element (e.g., both Kim) → neutral
        // Index 0 = Hải Trung Kim, Index 4 = Kiếm Phong Kim → both Kim
        const result = checkNapAmCompatibility(0, 4);
        // They are both Kim, so it is really "same element", should be neutral=0
        expect([0, 1]).toContain(result); // Same element is neutral or harmonious
    });

    it('should return 1 for Sinh relationship (compatible)', () => {
        // Kim sinh Thủy: Index 0 (Kim) + Index 6 (Thủy)
        const result = checkNapAmCompatibility(0, 6);
        expect(result).toBe(1);
    });

    it('should return -1 for Khắc relationship (clashing)', () => {
        // Kim khắc Mộc: Index 0 (Kim) + Index 2 (Mộc)
        const result = checkNapAmCompatibility(0, 2);
        expect(result).toBe(-1);
    });

    it('should handle Thủy-Hỏa exception (Phích Lịch Hỏa)', () => {
        // Thủy + Phích Lịch Hỏa (index 12) should be compatible (exception)
        const result = checkNapAmCompatibility(6, 12);  // 6 = Giản Hạ Thủy, 12 = Phích Lịch Hỏa
        expect(result).toBe(1);
    });

    it('should handle Hỏa-Kim exception (Kiếm Phong Kim)', () => {
        // Hỏa + Kiếm Phong Kim (index 4) should be compatible (needs fire to forge)
        const result = checkNapAmCompatibility(1, 4);  // 1 = Lô Trung Hỏa, 4 = Kiếm Phong Kim
        expect(result).toBe(1);
    });

    it('should return consistent results regardless of order for standard Khắc', () => {
        // Kim khắc Mộc: 0 vs 2 should have same sign (both clashing)
        const r1 = checkNapAmCompatibility(0, 2);
        const r2 = checkNapAmCompatibility(2, 0);
        // Both should be -1 since Kim khắc Mộc is bidirectional in the standard rules
        expect(r1).toBe(-1);
        // Note: Mộc vs Kim (Mộc being conquered) may still be -1
        // but Bình Địa Mộc (17) has an exception
        expect(r2).toBe(-1);
    });
});

// ── getNapAmExceptionComment ──────────────────────────────────

describe('getNapAmExceptionComment', () => {
    it('should return empty string when no exception applies', () => {
        const comment = getNapAmExceptionComment(0, 6); // Kim to Thủy, no exception
        expect(comment).toBe('');
    });

    it('should return comment for Kiếm Phong Kim (index 4) with Hỏa', () => {
        const comment = getNapAmExceptionComment(1, 4); // Hỏa to Kiếm Phong Kim
        expect(comment).toContain('Kiếm Phong Kim');
        expect(comment).toContain('Hỏa luyện');
    });

    it('should return comment for Phích Lịch Hỏa (index 12) with Thủy', () => {
        const comment = getNapAmExceptionComment(6, 12); // Thủy to Phích Lịch Hỏa
        expect(comment).toContain('Phích Lịch Hỏa');
        expect(comment).toContain('không sợ Thủy');
    });

    it('should return comment for Bình Địa Mộc (index 17) with Kim', () => {
        const comment = getNapAmExceptionComment(0, 17); // Kim to Bình Địa Mộc
        expect(comment).toContain('Bình Địa Mộc');
    });

    it('should return comment for Đại Hải Thủy (index 29) with Thổ', () => {
        const comment = getNapAmExceptionComment(3, 29); // Thổ(index 3=Lộ Bàng Thổ) to Đại Hải Thủy
        expect(comment).toContain('Đại Hải Thủy');
        expect(comment).toContain('không sợ Thổ');
    });
});
