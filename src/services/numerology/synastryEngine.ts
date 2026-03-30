import type { NumerologyProfile } from '@lich-viet/core/numerology';
import { reduceToDigit } from '@lich-viet/core/numerology';

export type CompatibilityLevel = 'excellent' | 'good' | 'challenging';

export interface SynastryAspect {
    aspectName: string; // e.g., "Đường Đời", "Linh Hồn"
    numberA: number;
    numberB: number;
    score: number; // 0-100
    level: CompatibilityLevel;
    description: string;
}

export interface SynastryReport {
    personA: string;
    personB: string;
    overallScore: number;
    overallLevel: CompatibilityLevel;
    aspects: SynastryAspect[];
    summary: string;
}

// ── Compatibility Matrix ────────────────────────────────────────

const COMPATIBILITY_MATRIX: Record<number, { natural: number[]; match: number[]; challenge: number[] }> = {
    1: { natural: [1, 5, 7], match: [2, 3, 9], challenge: [4, 6, 8] },
    2: { natural: [2, 4, 8], match: [1, 3, 6, 9], challenge: [5, 7] },
    3: { natural: [3, 6, 9], match: [1, 2, 5], challenge: [4, 7, 8] },
    4: { natural: [2, 4, 8], match: [6, 7], challenge: [1, 3, 5, 9] },
    5: { natural: [1, 5, 7], match: [3, 8, 9], challenge: [2, 4, 6] },
    6: { natural: [3, 6, 9], match: [2, 4, 8], challenge: [1, 5, 7] },
    7: { natural: [1, 5, 7], match: [4], challenge: [2, 3, 6, 8, 9] },
    8: { natural: [2, 4, 8], match: [5, 6], challenge: [1, 3, 7, 9] },
    9: { natural: [3, 6, 9], match: [1, 2, 5], challenge: [4, 7, 8] },
};

function getBaseNumber(num: number): number {
    return reduceToDigit(num, false);
}

function calculatePairScore(numA: number, numB: number): { score: number, level: CompatibilityLevel } {
    const a = getBaseNumber(numA);
    const b = getBaseNumber(numB);

    if (a === b) return { score: 90, level: 'excellent' }; // Same numbers usually get along well but can amplify flaws

    const matrix = COMPATIBILITY_MATRIX[a];
    if (!matrix) return { score: 75, level: 'good' }; // fallback

    if (matrix.natural.includes(b)) return { score: 100, level: 'excellent' };
    if (matrix.match.includes(b)) return { score: 75, level: 'good' };
    
    return { score: 40, level: 'challenging' };
}

function getAspectDescription(aspect: 'Life Path' | 'Soul Urge' | 'Expression', level: CompatibilityLevel, _a: number, _b: number): string {
    const levels = {
        'excellent': 'Sự kết nối tự nhiên và đồng điệu sâu sắc. Hai bạn dễ dàng thấu hiểu và hỗ trợ lẫn nhau.',
        'good': 'Mối quan hệ hài hòa, có thể bù trừ những điểm thiếu sót cho nhau. Cần một chút giao tiếp để hoàn hảo hơn.',
        'challenging': 'Cần nhiều nỗ lực và sự thấu hiểu từ cả hai phía. Hai người có cách tiếp cận cuộc sống khá khác biệt.'
    };
    
    if (aspect === 'Life Path') {
        return `Đường đời định hướng chung của hai bạn: ${levels[level]}`;
    }
    if (aspect === 'Soul Urge') {
        return `Sự đồng điệu về linh hồn và khao khát nội tâm: ${levels[level]}`;
    }
    return `Cách thức biểu đạt và giao tiếp với thế giới: ${levels[level]}`;
}

// ── Main Engine ──────────────────────────────────────────────────

export function generateSynastryReport(profileA: NumerologyProfile, profileB: NumerologyProfile): SynastryReport {
    
    const lpScore = calculatePairScore(profileA.lifePath.value, profileB.lifePath.value);
    const suScore = calculatePairScore(profileA.soulUrge.value, profileB.soulUrge.value);
    const expScore = calculatePairScore(profileA.expression.value, profileB.expression.value);

    const aspects: SynastryAspect[] = [
        {
            aspectName: 'Đường Đời (Life Path)',
            numberA: profileA.lifePath.value,
            numberB: profileB.lifePath.value,
            score: lpScore.score,
            level: lpScore.level,
            description: getAspectDescription('Life Path', lpScore.level, profileA.lifePath.value, profileB.lifePath.value),
        },
        {
            aspectName: 'Linh Hồn (Soul Urge)',
            numberA: profileA.soulUrge.value,
            numberB: profileB.soulUrge.value,
            score: suScore.score,
            level: suScore.level,
            description: getAspectDescription('Soul Urge', suScore.level, profileA.soulUrge.value, profileB.soulUrge.value),
        },
        {
            aspectName: 'Biểu Đạt (Expression)',
            numberA: profileA.expression.value,
            numberB: profileB.expression.value,
            score: expScore.score,
            level: expScore.level,
            description: getAspectDescription('Expression', expScore.level, profileA.expression.value, profileB.expression.value),
        }
    ];

    // Weights: Life Path 40%, Soul Urge 35%, Expression 25%
    const totalScore = Math.round((lpScore.score * 0.4) + (suScore.score * 0.35) + (expScore.score * 0.25));
    
    let overallLevel: CompatibilityLevel = 'challenging';
    if (totalScore >= 80) overallLevel = 'excellent';
    else if (totalScore >= 65) overallLevel = 'good';

    let dynamicSummary = '';
    
    // Evaluate Life Path
    if (lpScore.level === 'excellent' || lpScore.level === 'good') {
        dynamicSummary += 'Về hướng đi cuộc đời, hai bạn rất đồng điệu và dễ dàng hỗ trợ nhau. ';
    } else {
        dynamicSummary += 'Đường đời hai bạn có định hướng khá khác biệt, đòi hỏi sự kiên nhẫn lớn để đi chung một con đường. ';
    }

    // Evaluate Soul Urge
    if (suScore.level === 'excellent' || suScore.level === 'good') {
        dynamicSummary += 'Bên cạnh đó, nhu cầu nội tâm của hai người cũng rất tương đồng, mang lại cảm giác an toàn và thấu hiểu. ';
    } else {
        dynamicSummary += 'Tuy nhiên, thấu hiểu nhu cầu sâu thẳm của đối phương sẽ là một thử thách vì khao khát nội tâm khá trái ngược. ';
    }

    // Evaluate Expression
    if (expScore.level === 'excellent' || expScore.level === 'good') {
        dynamicSummary += 'Cách các bạn giao tiếp và tương tác hàng ngày cũng rất ăn ý, hiếm khi xảy ra hiểu lầm.';
    } else {
        dynamicSummary += 'Trong sinh hoạt, cẩn thận cách giao tiếp vì hai bạn dễ biến những khác biệt nhỏ thành sự không thấu hiểu.';
    }

    return {
        personA: profileA.fullName,
        personB: profileB.fullName,
        overallScore: totalScore,
        overallLevel,
        aspects,
        summary: dynamicSummary,
    };
}
