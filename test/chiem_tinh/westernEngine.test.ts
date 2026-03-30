import { describe, it, expect } from 'vitest';
import { calculateNatalChart } from '../../src/utils/natalChartCalculator';
import { calculateTransits } from '../../src/utils/transitCalculator';
import { calculateSynastry } from '../../src/utils/synastryCalculator';
import { computeSynastryP1 } from '../../src/services/crossValidation/synastryEngine';
import type { BirthData } from '../../src/types/westernAstro';

describe('Western Astrology Engine (Chiêm Tinh)', () => {
    
    const mockBirthData: BirthData = {
        year: 1990,
        month: 5,
        day: 15,
        hour: 12,
        minute: 30,
        latitude: 21.0285, // Hanoi
        longitude: 105.8542,
        timezone: 7
    };

    const mockPartnerBirthData: BirthData = {
        year: 1992,
        month: 11,
        day: 20,
        hour: 8,
        minute: 15,
        latitude: 10.7626, // HCMC
        longitude: 106.6602,
        timezone: 7
    };

    it('should calculate a basic Natal Chart (Whole Sign default)', () => {
        const chart = calculateNatalChart(mockBirthData, { houseSystem: 'wholeSigns' });
        
        expect(chart).toBeDefined();
        expect(chart.planets.length).toBeGreaterThan(0);
        expect(chart.houses.length).toBe(12);
        expect(chart.houseSystem).toBe('wholeSigns');
        
        // Assert some specific expected qualities about the chart's structure
        const sun = chart.planets.find(p => p.id === 'sun');
        expect(sun).toBeDefined();
        
        // Given May 15, Sun should be in Taurus
        expect(sun?.sign).toBe('taurus');
    });

    it('should apply Hellenistic Sect rules properly depending on Sun placement', () => {
        // May 15, 12:30 PM: Sun should be above the horizon (House 7-12)
        const dayChart = calculateNatalChart(mockBirthData, { houseSystem: 'wholeSigns' });
        const sunHouseDay = dayChart.planets.find(p => p.id === 'sun')?.house || 0;
        
        // In Whole Sign, depending on Ascendant, 12:30 PM is highly likely above horizon (houses 7, 8, 9, 10, 11)
        expect(sunHouseDay).toBeGreaterThanOrEqual(7);
        expect(sunHouseDay).toBeLessThanOrEqual(12);
        
        // Create a Night chart: 00:30 AM
        const nightData = { ...mockBirthData, hour: 0, minute: 30 };
        const nightChart = calculateNatalChart(nightData, { houseSystem: 'wholeSigns' });
        const sunHouseNight = nightChart.planets.find(p => p.id === 'sun')?.house || 0;
        
        // At 00:30 AM, Sun is below horizon (Houses 1-6)
        expect(sunHouseNight).toBeGreaterThanOrEqual(1);
        expect(sunHouseNight).toBeLessThanOrEqual(6);
    });

    it('should calculate Transits against a Natal Chart without throwing', () => {
        const natalChart = calculateNatalChart(mockBirthData, { houseSystem: 'wholeSigns' });
        const targetDate = new Date('2023-01-01T12:00:00Z');
        
        const transitResult = calculateTransits(natalChart, targetDate);
        
        expect(transitResult).toBeDefined();
        expect(transitResult.transitChart).toBeDefined();
        expect(Array.isArray(transitResult.interAspects)).toBe(true);
        expect(transitResult.targetDate).toEqual(targetDate);
    });

    it('should calculate Synastry between two charts', () => {
        const personA = calculateNatalChart(mockBirthData, { houseSystem: 'wholeSigns' });
        const personB = calculateNatalChart(mockPartnerBirthData, { houseSystem: 'wholeSigns' });
        
        const synastryResult = calculateSynastry(personA, personB);
        
        expect(synastryResult).toBeDefined();
        expect(synastryResult.personAChart).toEqual(personA);
        expect(synastryResult.personBChart).toEqual(personB);
        expect(typeof synastryResult.compatibilityScore).toBe('number');
        expect(synastryResult.compatibilityScore).toBeGreaterThanOrEqual(0);
        expect(synastryResult.compatibilityScore).toBeLessThanOrEqual(100);
        expect(Array.isArray(synastryResult.aspects)).toBe(true);
    });
    it('should integrate with the high-level computeSynastryP1 service without throwing', () => {
        // Mock profiles for the high-level wrapper
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const profileA: any = { name: 'A', birthYear: 1990, birthMonth: 5, birthDay: 15, gender: 'male' as const };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const profileB: any = { name: 'B', birthYear: 1992, birthMonth: 11, birthDay: 20, gender: 'female' as const, relationship: 'partner' as const };
        
        const result = computeSynastryP1(profileA, profileB);
        expect(result).toBeDefined();
        expect(result!.overallScore).toBeGreaterThanOrEqual(0);
        expect(result!.overallScore).toBeLessThanOrEqual(100);
        expect(result!.systems.length).toBeGreaterThan(0);
    });
});
