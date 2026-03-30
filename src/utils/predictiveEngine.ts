import type { BirthData, NatalChart } from '../types/westernAstro';
import { calculateNatalChart } from './natalChartCalculator';
import { calculateInterAspects, TransitAspect, TransitChartResult } from './transitCalculator';

/**
 * Calculates Secondary Progressions (Lá số Tiến trình).
 * Rule: 1 day after birth = 1 year of life.
 */
export function calculateSecondaryProgression(
    natalChart: NatalChart,
    targetDate: Date = new Date()
): TransitChartResult {
    const { birthData } = natalChart;
    
    // Create UTC Date carefully from local inputs to avoid timezone shifts jumping days
    const utcDate = Date.UTC(
        birthData.year,
        birthData.month - 1,
        birthData.day,
        birthData.hour - birthData.timezone, // Convert to UTC
        birthData.minute
    );
    
    const targetMs = targetDate.getTime();
    
    // Guard against invalid date inputs from the UI
    if (isNaN(targetMs)) {
        return {
            targetDate,
            transitChart: natalChart, // Fallback to avoid crash
            currentSignChanges: [],
            interAspects: []
        };
    }
    
    // Calculate difference conceptually in years
    const msPerYear = 1000 * 60 * 60 * 24 * 365.2422; // Tropical year in ms
    const diffMs = targetMs - utcDate;
    const ageInYears = diffMs / msPerYear;
    
    // 1 year of life = 1 day of progression (86400000 ms)
    const progressionMs = ageInYears * (1000 * 60 * 60 * 24);
    
    const progressedTimeUtc = new Date(utcDate + progressionMs);

    // Prepare new birth data for SWISSEPH/Ephemeris calculation
    // We treat the progressed time as if it was a real birth time at the original location
    const progressedData: BirthData = {
        year: progressedTimeUtc.getUTCFullYear(),
        month: progressedTimeUtc.getUTCMonth() + 1,
        day: progressedTimeUtc.getUTCDate(),
        hour: progressedTimeUtc.getUTCHours(),
        minute: progressedTimeUtc.getUTCMinutes(),
        latitude: birthData.latitude,
        longitude: birthData.longitude,
        timezone: 0, // We are already passing UTC equivalents
    };

    const progressedChart = calculateNatalChart(progressedData, { houseSystem: natalChart.houseSystem });

    // Orbs are tighter for progressions (typically < 1 degree)
    const interAspects = calculateInterAspects(progressedChart, natalChart, 1.5);

    return {
        targetDate,
        transitChart: progressedChart, // We reuse `transitChart` struct for dual-wheel viewing easily
        currentSignChanges: [],
        interAspects
    };
}

/**
 * Calculates Solar Arc Directions (Hướng tâm Thái dương).
 * Rule: Find how far the Sun has progressed, and move EVERY planet by that exact distance.
 */
export function calculateSolarArc(
    natalChart: NatalChart,
    targetDate: Date = new Date()
): TransitChartResult {
    // 1. Calculate the Secondary Progressed Sun first.
    const secondaryChart = calculateSecondaryProgression(natalChart, targetDate).transitChart;
    
    // 2. Find Natal Sun and Progressed Sun
    const nSun = natalChart.planets.find(p => p.id === 'sun');
    const pSun = secondaryChart.planets.find(p => p.id === 'sun');
    
    if (!nSun || !pSun) {
         return {
            targetDate,
            transitChart: natalChart, // Fallback
            currentSignChanges: [],
            interAspects: []
         };
    }

    // 3. Calculate Arc (the exact distance the Sun moved)
    let solarArc = pSun.degree - nSun.degree;
    if (solarArc < 0) solarArc += 360;

    // 4. Create the Solar Arc Directed Chart
    // Deep copy natal chart and add Solar Arc to every placement
    const directedChart: NatalChart = JSON.parse(JSON.stringify(natalChart));
    
    // Move Planets
    directedChart.planets.forEach(p => {
        p.degree = (p.degree + solarArc) % 360;
        // Update sign and signDegree
        p.signDegree = p.degree % 30;
        p.signMinute = Math.floor((p.signDegree % 1) * 60);
        
        const signNames = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
        p.sign = signNames[Math.floor(p.degree / 30)] as any;
    });

    // Move Points (Nodes)
    directedChart.points.forEach(p => {
        p.degree = (p.degree + solarArc) % 360;
        p.signDegree = p.degree % 30;
        p.signMinute = Math.floor((p.signDegree % 1) * 60);
        const signNames = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
        p.sign = signNames[Math.floor(p.degree / 30)] as any;
    });

    // Move Angles (ASC/MC) -> Typically angles are directed too
    ['ascendant', 'midheaven', 'descendant', 'imumCoeli'].forEach(key => {
        const a = (directedChart.angles as any)[key];
        a.degree = (a.degree + solarArc) % 360;
        a.signDegree = a.degree % 30;
        const signNames = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
        a.sign = signNames[Math.floor(a.degree / 30)] as any;
    });

    // Move Houses
    directedChart.houses.forEach(h => {
        h.degree = (h.degree + solarArc) % 360;
        h.signDegree = h.degree % 30;
        const signNames = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
        h.sign = signNames[Math.floor(h.degree / 30)] as any;
    });

    // Solar Arc orbs are very tight (< 1 degree)
    const interAspects = calculateInterAspects(directedChart, natalChart, 1);

    return {
        targetDate,
        transitChart: directedChart,
        currentSignChanges: [],
        interAspects
    };
}

/**
 * Calculates a Composite Chart (Lá số kết hợp / Trung điểm)
 * Rule: Find midpoint of pair's planets. If opposition (180 deg apart), standard practice
 * uses shorter arc or predefined rule, but midpoint is (A+B)/2 or (A+B)/2 + 180.
 */
export function calculateCompositeChart(chart1: NatalChart, chart2: NatalChart): NatalChart {
    const composite: NatalChart = JSON.parse(JSON.stringify(chart1)); // Base mold
    
    // Utility to get midpoint of two angles
    const getMidpoint = (d1: number, d2: number) => {
        let diff = Math.abs(d1 - d2);
        let mid = (d1 + d2) / 2;
        if (diff > 180) {
            mid = (mid + 180) % 360;
        }
        return mid;
    };

    composite.planets.forEach(cp => {
        const p1 = chart1.planets.find(p => p.id === cp.id);
        const p2 = chart2.planets.find(p => p.id === cp.id);
        if (p1 && p2) {
            cp.degree = getMidpoint(p1.degree, p2.degree);
            cp.signDegree = cp.degree % 30;
            cp.signMinute = Math.floor((cp.signDegree % 1) * 60);
            const signNames = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
            cp.sign = signNames[Math.floor(cp.degree / 30)] as any;
        }
    });

    // Repeat for points, aspects (recalculate), angles, houses...
    // Note: Composite charts usually recalculate aspects from scratch.
    // For simplicity, we just mid-point angles
    ['ascendant', 'midheaven', 'descendant', 'imumCoeli'].forEach(key => {
        const a1 = (chart1.angles as any)[key].degree;
        const a2 = (chart2.angles as any)[key].degree;
        const cpA = (composite.angles as any)[key];
        
        cpA.degree = getMidpoint(a1, a2);
        cpA.signDegree = cpA.degree % 30;
        const signNames = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
        cpA.sign = signNames[Math.floor(cpA.degree / 30)] as any;
    });

    // Houses midpoints
    composite.houses.forEach(ch => {
        const h1 = chart1.houses.find(h => h.number === ch.number);
        const h2 = chart2.houses.find(h => h.number === ch.number);
        if (h1 && h2) {
            ch.degree = getMidpoint(h1.degree, h2.degree);
            ch.signDegree = ch.degree % 30;
            const signNames = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
            ch.sign = signNames[Math.floor(ch.degree / 30)] as any;
        }
    });

    // In a real robust system, we would clear aspects and recalculate based on new orb degrees, 
    // but we leave them bare or re-run `calculateInterAspects`.
    composite.aspects = []; 
    // (A real implementatiton would call a `detectAspects(composite.planets)` here)

    return composite;
}
