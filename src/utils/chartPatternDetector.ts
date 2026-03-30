import type {
    ChartPatternType, ChartOverview, PlanetPosition, Element, Quality,
    ElementBalance, QualityBalance, PlanetId, ZodiacSignId,
    ChartAngles
} from '../types/westernAstro';
import { ZODIAC_SIGNS } from '../data/westernAstro/zodiacSigns';
import { dignityScore } from './dignityCalculator';

// =============================================================================
// Chart Pattern Detector — Step 1 of the 8-step analysis pipeline
// Detects chart shape, element/modality/polarity balance, and dominant planet/sign
// =============================================================================

/**
 * Analyze the chart overview from planet positions and angles.
 */
export function analyzeChartOverview(planets: PlanetPosition[], angles?: ChartAngles): ChartOverview {
    const { elementBalance, qualityBalance, polarityBalance } = calculateWeightedBalances(planets, angles);
    const pattern = detectChartPattern(planets);
    const dominantPlanet = findDominantPlanet(planets);
    const dominantSign = findDominantSign(planets, angles);
    const dominantElement = findDominantElement(elementBalance);
    const dominantQuality = findDominantQuality(qualityBalance);

    return {
        pattern: pattern.type,
        patternDescription: pattern.description,
        elementBalance,
        qualityBalance,
        polarityBalance,
        dominantPlanet,
        dominantSign,
        dominantElement,
        dominantQuality,
    };
}

// ─── Element / Modality / Polarity Weighted Counting ────────────────────────

function calculateWeightedBalances(planets: PlanetPosition[], angles?: ChartAngles) {
    const elWeight: ElementBalance = { fire: 0, earth: 0, air: 0, water: 0 };
    const qualWeight: QualityBalance = { cardinal: 0, fixed: 0, mutable: 0 };
    let yang = 0, yin = 0;
    let totalScore = 0;

    const addScore = (signId: ZodiacSignId, score: number) => {
        const sign = ZODIAC_SIGNS[signId];
        if (!sign) return;
        elWeight[sign.element] += score;
        qualWeight[sign.quality] += score;
        if (sign.polarity === 'yang') yang += score; else yin += score;
        totalScore += score;
    };

    for (const p of planets) {
        let score = 1; // Outer planets
        if (p.id === 'sun' || p.id === 'moon') score = 4; // Luminaries
        else if (p.id === 'mercury' || p.id === 'venus' || p.id === 'mars') score = 2; // Personal planets
        
        addScore(p.sign, score);
    }

    if (angles) {
        addScore(angles.ascendant.sign, 3);
        addScore(angles.midheaven.sign, 2);
    }

    const toPercent = (val: number) => totalScore > 0 ? (val / totalScore) * 100 : 0;
    
    return {
        elementBalance: {
            fire: toPercent(elWeight.fire),
            earth: toPercent(elWeight.earth),
            air: toPercent(elWeight.air),
            water: toPercent(elWeight.water)
        },
        qualityBalance: {
            cardinal: toPercent(qualWeight.cardinal),
            fixed: toPercent(qualWeight.fixed),
            mutable: toPercent(qualWeight.mutable)
        },
        polarityBalance: {
            yang: toPercent(yang),
            yin: toPercent(yin)
        }
    };
}

// ─── Chart Pattern Detection ────────────────────────────────────────────────

function detectChartPattern(planets: PlanetPosition[]): { type: ChartPatternType | null; description: string } {
    if (planets.length < 7) return { type: null, description: '' };

    const degrees = planets.map(p => p.degree).sort((a, b) => a - b);
    const gaps = computeGaps(degrees);
    const maxGap = Math.max(...gaps);
    const occupied = 360 - maxGap;

    // Bundle: all planets within ~120°
    if (occupied <= 130) {
        return { type: 'bundle', description: 'Tất cả hành tinh tập trung trong khoảng 120° — sự tập trung cực mạnh.' };
    }

    // Bowl: planets within ~180°
    if (occupied <= 190 && maxGap >= 170) {
        // Check for Bucket: one planet isolated on opposite side
        const isolated = findIsolatedPlanet(degrees, maxGap);
        if (isolated) {
            return { type: 'bucket', description: 'Mẫu hình Xô — một hành tinh "quai xô" tạo điểm định hướng cho cuộc sống.' };
        }
        return { type: 'bowl', description: 'Mẫu hình Bát — tập trung vào một nửa cuộc sống, tự túc và chuyên sâu.' };
    }

    // Locomotive: ~240° occupied (gap ~120°)
    if (maxGap >= 100 && maxGap <= 140) {
        return { type: 'locomotive', description: 'Mẫu hình Đầu Máy — động lực mạnh mẽ, liên tục tìm kiếm sự hoàn thiện.' };
    }

    // Seesaw: two groups separated by gaps >60°
    const bigGaps = gaps.filter(g => g > 60);
    if (bigGaps.length >= 2) {
        return { type: 'seesaw', description: 'Mẫu hình Bập Bênh — phải cân bằng giữa hai cực đối lập trong cuộc sống.' };
    }

    // Splash: fairly even distribution (max gap < 90°)
    if (maxGap < 90) {
        return { type: 'splash', description: 'Mẫu hình Tản Mát — đa tài, quan tâm nhiều lĩnh vực.' };
    }

    // Splay: irregular distribution
    return { type: 'splay', description: 'Mẫu hình Xòe — cá tính độc đáo, nhiều mối quan tâm mạnh mẽ.' };
}

function computeGaps(sortedDegrees: number[]): number[] {
    const gaps: number[] = [];
    for (let i = 0; i < sortedDegrees.length - 1; i++) {
        gaps.push(sortedDegrees[i + 1] - sortedDegrees[i]);
    }
    // Wrap-around gap
    gaps.push(360 - sortedDegrees[sortedDegrees.length - 1] + sortedDegrees[0]);
    return gaps;
}

function findIsolatedPlanet(sortedDegrees: number[], _maxGap: number): boolean {
    // If there's one planet separated by large gaps on both sides
    for (let i = 0; i < sortedDegrees.length; i++) {
        const prev = i === 0 ? sortedDegrees[sortedDegrees.length - 1] : sortedDegrees[i - 1];
        const next = i === sortedDegrees.length - 1 ? sortedDegrees[0] : sortedDegrees[i + 1];
        const gapBefore = ((sortedDegrees[i] - prev) + 360) % 360;
        const gapAfter = ((next - sortedDegrees[i]) + 360) % 360;
        if (gapBefore > 100 && gapAfter > 100) return true;
    }
    return false;
}

// ─── Dominant Planet / Sign ─────────────────────────────────────────────────

function findDominantPlanet(planets: PlanetPosition[]): PlanetId | null {
    let best: PlanetId | null = null;
    let bestScore = -Infinity;
    for (const p of planets) {
        const score = dignityScore(p.dignity) + (p.isRetrograde ? -1 : 0);
        if (score > bestScore) { bestScore = score; best = p.id; }
    }
    return best;
}

function findDominantSign(planets: PlanetPosition[], angles?: ChartAngles): ZodiacSignId | null {
    const counts: Partial<Record<ZodiacSignId, number>> = {};
    const addCount = (signId: ZodiacSignId, weight: number) => {
        counts[signId] = (counts[signId] || 0) + weight;
    };
    for (const p of planets) {
        let weight = 1;
        if (p.id === 'sun' || p.id === 'moon') weight = 4;
        else if (p.id === 'mercury' || p.id === 'venus' || p.id === 'mars') weight = 2;
        addCount(p.sign, weight);
    }
    if (angles) {
        addCount(angles.ascendant.sign, 3);
        addCount(angles.midheaven.sign, 2);
    }

    let best: ZodiacSignId | null = null;
    let bestCount = 0;
    for (const [sign, count] of Object.entries(counts) as [ZodiacSignId, number][]) {
        if (count > bestCount) { bestCount = count; best = sign; }
    }
    return best;
}

function findDominantElement(balance: ElementBalance): Element {
    const entries = Object.entries(balance) as [Element, number][];
    return entries.reduce((a, b) => a[1] >= b[1] ? a : b)[0];
}

function findDominantQuality(balance: QualityBalance): Quality {
    const entries = Object.entries(balance) as [Quality, number][];
    return entries.reduce((a, b) => a[1] >= b[1] ? a : b)[0];
}
