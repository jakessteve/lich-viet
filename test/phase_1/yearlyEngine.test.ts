/**
 * Tests for yearlyEngine.ts
 * Covers: getNguHoangPalace (via getYearlyStars), getYearlyStars
 */

import { getYearlyStars } from '../../src/utils/yearlyEngine';

// ── getYearlyStars ────────────────────────────────────────────

describe('getYearlyStars', () => {
    it('should return an array of YearlyStar objects', () => {
        const stars = getYearlyStars('Thìn', 2024);
        expect(Array.isArray(stars)).toBe(true);
        expect(stars.length).toBeGreaterThan(0);
        stars.forEach(star => {
            expect(star).toHaveProperty('name');
            expect(star).toHaveProperty('direction');
            expect(star).toHaveProperty('description');
            expect(star).toHaveProperty('type');
        });
    });

    it('should always include Tam Sát, Thái Tuế, Tuế Phá, and Ngũ Hoàng', () => {
        const stars = getYearlyStars('Thìn', 2024);
        const names = stars.map(s => s.name);
        expect(names).toContain('Tam Sát');
        expect(names).toContain('Thái Tuế');
        expect(names).toContain('Tuế Phá');
        expect(names).toContain('Ngũ Hoàng');
    });

    it('should return exactly 4 stars', () => {
        const stars = getYearlyStars('Thìn', 2024);
        expect(stars).toHaveLength(4);
    });

    it('should mark all stars as Bad type', () => {
        const stars = getYearlyStars('Thìn', 2024);
        stars.forEach(star => {
            expect(star.type).toBe('Bad');
        });
    });
});

// ── Tam Sát Direction ─────────────────────────────────────────

describe('Tam Sát directions', () => {
    it('should point North for Dần-Ngọ-Tuất years', () => {
        ['Dần', 'Ngọ', 'Tuất'].forEach(chi => {
            const stars = getYearlyStars(chi);
            const tamSat = stars.find(s => s.name === 'Tam Sát')!;
            expect(tamSat.direction).toBe('Chính Bắc');
        });
    });

    it('should point South for Thân-Tý-Thìn years', () => {
        ['Thân', 'Tý', 'Thìn'].forEach(chi => {
            const stars = getYearlyStars(chi);
            const tamSat = stars.find(s => s.name === 'Tam Sát')!;
            expect(tamSat.direction).toBe('Chính Nam');
        });
    });

    it('should point West for Hợi-Mão-Mùi years', () => {
        ['Hợi', 'Mão', 'Mùi'].forEach(chi => {
            const stars = getYearlyStars(chi);
            const tamSat = stars.find(s => s.name === 'Tam Sát')!;
            expect(tamSat.direction).toBe('Chính Tây');
        });
    });

    it('should point East for Tỵ-Dậu-Sửu years', () => {
        ['Tỵ', 'Dậu', 'Sửu'].forEach(chi => {
            const stars = getYearlyStars(chi);
            const tamSat = stars.find(s => s.name === 'Tam Sát')!;
            expect(tamSat.direction).toBe('Chính Đông');
        });
    });
});

// ── Thái Tuế and Tuế Phá ─────────────────────────────────────

describe('Thái Tuế and Tuế Phá', () => {
    it('should set Thái Tuế direction to the year Chi', () => {
        const stars = getYearlyStars('Thìn', 2024);
        const thaiTue = stars.find(s => s.name === 'Thái Tuế')!;
        expect(thaiTue.direction).toBe('Phương Thìn');
    });

    it('should set Tuế Phá opposite to Thái Tuế (Xung)', () => {
        const stars = getYearlyStars('Thìn', 2024);
        const tuePha = stars.find(s => s.name === 'Tuế Phá')!;
        // Thìn xung Tuất
        expect(tuePha.direction).toBe('Phương Tuất');
    });

    it('should correctly pair Tý with Ngọ (xung)', () => {
        const stars = getYearlyStars('Tý', 2024);
        const tuePha = stars.find(s => s.name === 'Tuế Phá')!;
        expect(tuePha.direction).toBe('Phương Ngọ');
    });
});

// ── Ngũ Hoàng Palace ──────────────────────────────────────────

describe('Ngũ Hoàng palace rotation', () => {
    it('should return palace 7 (Chính Tây) for 2024', () => {
        const stars = getYearlyStars('Thìn', 2024);
        const nguHoang = stars.find(s => s.name === 'Ngũ Hoàng')!;
        expect(nguHoang.direction).toBe('Chính Tây');
    });

    it('should return palace 8 (Đông Bắc) for 2025', () => {
        const stars = getYearlyStars('Tỵ', 2025);
        const nguHoang = stars.find(s => s.name === 'Ngũ Hoàng')!;
        expect(nguHoang.direction).toBe('Đông Bắc');
    });

    it('should cycle to palace 1 after palace 9', () => {
        // Rotation: 2024→7, 2025→8, 2026→9, 2027→1
        const stars2026 = getYearlyStars('Ngọ', 2026);
        const nh2026 = stars2026.find(s => s.name === 'Ngũ Hoàng')!;
        expect(nh2026.direction).toBe('Chính Nam'); // Palace 9 = Nam

        const stars2027 = getYearlyStars('Mùi', 2027);
        const nh2027 = stars2027.find(s => s.name === 'Ngũ Hoàng')!;
        expect(nh2027.direction).toBe('Chính Bắc'); // Palace 1 = Bắc (wraps back to 1)
    });

    it('should return a valid direction for all 9 palaces in a 9-year span', () => {
        const validDirections = [
            'Chính Bắc', 'Tây Nam', 'Chính Đông', 'Đông Nam',
            'Trung Cung', 'Tây Bắc', 'Chính Tây', 'Đông Bắc', 'Chính Nam'
        ];
        const chis = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân'];
        for (let y = 2024; y <= 2032; y++) {
            const stars = getYearlyStars(chis[(y - 2024) % 12], y);
            const nguHoang = stars.find(s => s.name === 'Ngũ Hoàng')!;
            expect(validDirections).toContain(nguHoang.direction);
        }
    });
});
