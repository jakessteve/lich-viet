import type { NatalChart, AspectType, ElementBalance } from '../types/westernAstro';

export interface SynastryAspect {
    personAPlanetId: string;
    personBPlanetId: string;
    type: AspectType;
    orb: number;
    angle: number;
    score: number; // Compatibility score addition
}

export interface SynastryResult {
    personAChart: NatalChart;
    personBChart: NatalChart;
    aspects: SynastryAspect[];
    compatibilityScore: number;
    elementalCompatibility: string;
}

export function calculateSynastry(
    personA: NatalChart,
    personB: NatalChart
): SynastryResult {
    const interAspects: SynastryAspect[] = [];
    let compatibilityScore = 0;
    
    // Merge planets and points
    const aBodies = [...personA.planets, ...personA.points];
    const bBodies = [...personB.planets, ...personB.points];

    for (const aPlanet of aBodies) {
        for (const bPlanet of bBodies) {
            // Find major aspects
            const diff = Math.abs(aPlanet.degree - bPlanet.degree);
            const shortestDiff = Math.min(diff, 360 - diff);
            
            const aspectType = detectClosestAspect(shortestDiff);
            if (aspectType) {
                const exactAngle = getAspectExactAngle(aspectType);
                const orb = Math.abs(shortestDiff - exactAngle);
                
                // P2 Fix: dynamic orbs based on planetary bodies instead of hardcoded 8
                const maxOrb = getDynamicOrb(aPlanet.id, bPlanet.id, aspectType);
                if (orb <= maxOrb) {
                    const score = scoreSynastryAspect(aPlanet.id, bPlanet.id, aspectType, orb);
                    compatibilityScore += score;

                    interAspects.push({
                        personAPlanetId: aPlanet.id,
                        personBPlanetId: bPlanet.id,
                        type: aspectType,
                        orb,
                        angle: shortestDiff,
                        score
                    });
                }
            }
        }
    }

    // Baseline element compatibility
    const elScore = scoreElementalCompatibility(personA.overview.elementBalance, personB.overview.elementBalance);
    compatibilityScore += elScore;

    const elementalCompatibility = elScore > 5 ? "Rất hòa hợp (Tương sinh/Đồng hành)" : "Cần nỗ lực thấu hiểu (Tương khắc nhỏ)";

    return {
        personAChart: personA,
        personBChart: personB,
        aspects: interAspects,
        compatibilityScore: Math.max(0, Math.min(100, 50 + compatibilityScore)), // Normalize around 50-100
        elementalCompatibility
    };
}

function getAspectExactAngle(type: AspectType): number {
    switch (type) {
        case 'conjunction': return 0;
        case 'sextile': return 60;
        case 'square': return 90;
        case 'trine': return 120;
        case 'opposition': return 180;
        default: return 0;
    }
}

function detectClosestAspect(diff: number): AspectType | null {
    const aspects = [
        { type: 'conjunction', angle: 0 },
        { type: 'sextile', angle: 60 },
        { type: 'square', angle: 90 },
        { type: 'trine', angle: 120 },
        { type: 'opposition', angle: 180 }
    ];
    
    let closest: AspectType | null = null;
    let minOrb = 15; // Max possible orb cap to even consider checking
    
    for (const asp of aspects) {
        const orb = Math.abs(diff - asp.angle);
        if (orb < minOrb) {
            minOrb = orb;
            closest = asp.type as AspectType;
        }
    }
    return closest;
}

function getDynamicOrb(bodyA: string, bodyB: string, type: AspectType): number {
    // Luminaries (Sun, Moon) get widest orbs
    const hasLuminary = ['sun', 'moon'].includes(bodyA) || ['sun', 'moon'].includes(bodyB);
    const hasPersonal = ['mercury', 'venus', 'mars'].includes(bodyA) || ['mercury', 'venus', 'mars'].includes(bodyB);
    
    let baseOrb = hasLuminary ? 10 : (hasPersonal ? 7 : 5);
    
    // Minor or tight aspects get restricted orbs regardless of body
    if (type === 'sextile') baseOrb -= 3;
    if (['quincunx', 'semiSextile', 'semiSquare', 'sesquiquadrate', 'quintile'].includes(type)) {
        return 2; // Strict 2 degree orb for minor aspects
    }
    
    return Math.max(2, baseOrb);
}

function scoreSynastryAspect(bodyA: string, bodyB: string, type: AspectType, orb: number): number {
    let baseScore = 0;
    
    // Core harmony (Trine, Sextile, Conjunction) vs Tension (Square, Opposition)
    if (type === 'trine' || type === 'sextile') baseScore = 5;
    if (type === 'conjunction') baseScore = 3; // Neutral/Intense
    if (type === 'square') baseScore = -3;
    if (type === 'opposition') baseScore = -1; // Tension but attraction

    // Amplify if involving Sun, Moon, Venus, or Mars
    const isPersonal = ['sun', 'moon', 'venus', 'mars'].includes(bodyA) && ['sun', 'moon', 'venus', 'mars'].includes(bodyB);
    if (isPersonal) baseScore *= 2;

    // Diminish score as orb increases
    return baseScore * (1 - (orb / 10));
}

function scoreElementalCompatibility(aEls: ElementBalance, bEls: ElementBalance): number {
    let score = 0;
    // Simple heuristic: Fire + Air = good, Earth + Water = good
    score += (aEls.fire * bEls.air) * 0.5;
    score += (aEls.earth * bEls.water) * 0.5;
    score += (aEls.air * bEls.fire) * 0.5;
    score += (aEls.water * bEls.earth) * 0.5;
    
    return Math.min(10, score);
}
