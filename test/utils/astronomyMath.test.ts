import { describe, it, expect } from 'vitest';
import { getEquationOfTime, getHighPrecisionSunLongitude, getExactJDN, getTrueSolarTime } from '../../src/utils/astronomyMath';

describe('astronomyMath', () => {
    it('calculates exact JDN properly', () => {
        // J2000.0 is exactly 2451545.0
        const j2000 = new Date(Date.UTC(2000, 0, 1, 12, 0, 0));
        expect(getExactJDN(j2000)).toBeCloseTo(2451545.0, 4);
    });

    it('calculates Equation of Time correctly for known date', () => {
        // February 11 is usually around -14 minutes EoT
        const date = new Date(Date.UTC(2024, 1, 11, 12, 0, 0));
        const jd = getExactJDN(date);
        const eot = getEquationOfTime(jd);
        // Should be around -14.2 minutes
        expect(eot).toBeLessThan(-13.5);
        expect(eot).toBeGreaterThan(-14.5);
        
        // Nov 3 is usually around +16.4 minutes
        const date2 = new Date(Date.UTC(2024, 10, 3, 12, 0, 0));
        const eot2 = getEquationOfTime(getExactJDN(date2));
        expect(eot2).toBeLessThan(16.5);
        expect(eot2).toBeGreaterThan(16.0);
    });

    it('calculates Sun Longitude correctly at Vernal Equinox', () => {
        // Vernal Equinox 2024 is around March 20, 03:06 UTC
        const date = new Date(Date.UTC(2024, 2, 20, 3, 6, 0));
        const jd = getExactJDN(date);
        const longitude = getHighPrecisionSunLongitude(jd);
        
        // With precision, it should be within 0.1 degree of 0 (or 360)
        if (longitude > 180) {
            expect(longitude).toBeGreaterThan(359.9);
        } else {
            expect(longitude).toBeLessThan(0.1);
        }
    });

    it('adjusts True Solar Time based on longitude and timezone offset', () => {
        const date = new Date(Date.UTC(2024, 1, 11, 5, 0, 0)); // 12:00 PM UTC+7
        // At 105E (Vietnam standard meridian), EoT is ~-14 mins.
        // we explicitly pass timezoneOffset = -420 (UTC+7)
        const trueTime = getTrueSolarTime(date, 105, -420);
        
        // Difference should be just EoT (~-14 mins)
        const diffMinutes = (trueTime.getTime() - date.getTime()) / 60000;
        expect(diffMinutes).toBeLessThan(-13.5);
        expect(diffMinutes).toBeGreaterThan(-14.5);

        // At 106E, longitude correction adds exactly 4 minutes!
        const trueTime106 = getTrueSolarTime(date, 106, -420);
        const diff106 = (trueTime106.getTime() - date.getTime()) / 60000;
        expect(diff106).toBeCloseTo(diffMinutes + 4, 2);
    });
});
