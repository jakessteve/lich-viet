import {
    getKuiYueIndex,
    getChangQuIndexByHeavenlyStem,
    getLuYangTuoMaIndex,
    getLuanXiIndex,
    getNianjieIndex,
    fixIndex,
    fixEarthlyBranchIndex
} from './starLocation';
import type { TuViChartData, TuViStar, TuViPalace, StarScope, StageInfo } from '../tuviTypes';

const STAR_NAMES: Record<string, string> = {
    tiankui: 'Thiên Khôi',
    tianyue: 'Thiên Việt',
    wenchang: 'Văn Xương',
    wenqu: 'Văn Khúc',
    lucun: 'Lộc Tồn',
    qingyang: 'Kình Dương',
    tuoluo: 'Đà La',
    tianma: 'Thiên Mã',
    hongluan: 'Hồng Loan',
    tianxi: 'Thiên Hỷ',
    nianjie: 'Niên Giải'
};

const STEMS = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const BRANCHES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

/**
 * Get target year's Heavenly Stem and Earthly Branch indices based purely on the math.
 * Target year e.g. 2024 -> Giáp Thìn -> Stem 0, Branch 4
 */
export const getTargetYearCanChiIndices = (targetYear: number) => {
    let stemIndex = (targetYear + 6) % 10;
    if (stemIndex < 0) stemIndex += 10;

    let branchIndex = (targetYear - 4) % 12;
    if (branchIndex < 0) branchIndex += 12;

    return { stemIndex, branchIndex };
};

/**
 * Returns the exact palace index for yearly prefix stars.
 */
export const getJiangqian12StartIndex = (earthlyBranchIndex: number): number => {
    // 寅午戍年将星午(6), 申子辰年子将星(0), 巳酉丑将酉上驻(9), 亥卯未将卯上停(3)
    if (earthlyBranchIndex === 2 || earthlyBranchIndex === 6 || earthlyBranchIndex === 10) return 6; // Dần, Ngọ, Tuất
    if (earthlyBranchIndex === 8 || earthlyBranchIndex === 0 || earthlyBranchIndex === 4) return 0; // Thân, Tý, Thìn
    if (earthlyBranchIndex === 5 || earthlyBranchIndex === 9 || earthlyBranchIndex === 1) return 9; // Tỵ, Dậu, Sửu
    if (earthlyBranchIndex === 11 || earthlyBranchIndex === 3 || earthlyBranchIndex === 7) return 3; // Hợi, Mão, Mùi
    return 0;
};

/**
 * Helper to construct decadal/yearly stars from a stem and branch
 */
const constructStarsByStemBranch = (stemIdx: number, branchIdx: number, scope: StarScope) => {
    const prefix = scope === 'decadal' ? 'Đại Hạn ' : 'Lưu ';
    const stars: TuViStar[][] = Array.from({ length: 12 }, () => []);
    
    const { kuiIndex, yueIndex } = getKuiYueIndex(stemIdx);
    const { changIndex, quIndex } = getChangQuIndexByHeavenlyStem(stemIdx);
    const { luIndex, yangIndex, tuoIndex, maIndex } = getLuYangTuoMaIndex(stemIdx, branchIdx);
    const { hongluanIndex, tianxiIndex } = getLuanXiIndex(branchIdx);
    
    const addStar = (palaceIndex: number, starId: string, type: TuViStar['type']) => {
        let name = prefix + (STAR_NAMES[starId] || starId);
        if (starId === 'nianjie') name = STAR_NAMES[starId]; // Nianjie name stands alone
        
        stars[palaceIndex].push({ name, type, scope, brightness: '' });
    };

    addStar(kuiIndex, 'tiankui', 'soft');
    addStar(yueIndex, 'tianyue', 'soft');
    addStar(changIndex, 'wenchang', 'soft');
    addStar(quIndex, 'wenqu', 'soft');
    addStar(luIndex, 'lucun', 'lucun');
    addStar(yangIndex, 'qingyang', 'tough');
    addStar(tuoIndex, 'tuoluo', 'tough');
    addStar(maIndex, 'tianma', 'tianma');
    addStar(hongluanIndex, 'hongluan', 'adjective');
    addStar(tianxiIndex, 'tianxi', 'adjective');

    if (scope === 'yearly') {
        const njIndex = getNianjieIndex(branchIdx);
        addStar(njIndex, 'nianjie', 'helper');

        const ts12shen = ['Thái Tuế', 'Hối Khí', 'Tang Môn', 'Quán Sách', 'Quan Phù', 'Tiểu Hao', 'Đại Hao', 'Long Đức', 'Bạch Hổ', 'Thiên Đức', 'Điếu Khách', 'Bệnh Phù'];
        const jq12shen = ['Tướng Tinh', 'Phán Yên', 'Tuế Dịch', 'Tức Thần', 'Hoa Cái', 'Kiếp Sát', 'Tai Sát', 'Thiên Sát', 'Chỉ Bối', 'Hàm Trì', 'Nguyệt Sát', 'Vong Thần'];
        
        for (let i = 0; i < ts12shen.length; i++) {
            const idx = fixIndex(branchIdx + i);
            stars[idx].push({ name: ts12shen[i], type: 'helper', scope: 'yearly', brightness: '' });
        }

        const jiangqian12StartIndex = getJiangqian12StartIndex(branchIdx);
        for (let i = 0; i < jq12shen.length; i++) {
            const idx = fixIndex(jiangqian12StartIndex + i);
            stars[idx].push({ name: jq12shen[i], type: 'helper', scope: 'yearly', brightness: '' });
        }
    }

    return stars;
};

/**
 * Apply both Decadal Group and Yearly Group Overlays directly to the Chart Data Output
 */
export function applyTemporalOverlays(chart: TuViChartData, targetYear: number): TuViChartData {
    const birthLunarYear = chart.lunarYear;
    if (!birthLunarYear) {
        return chart; // Fallback if missing
    }

    const { stemIndex: targetStem, branchIndex: targetBranch } = getTargetYearCanChiIndices(targetYear);
    const nominalAge = targetYear - birthLunarYear + 1;

    let decadalIndex = -1;
    chart.palaces.forEach((p, idx) => {
        if (p.stage && nominalAge >= p.stage.range[0] && nominalAge <= p.stage.range[1]) {
            decadalIndex = idx;
        }
    });

    let isChildhood = false;
    if (decadalIndex === -1) {
        isChildhood = true;
        const soulIndex = chart.palaces.findIndex(p => p.isSoulPalace);
        // iztro fallback logic for childhood limit (1-6)
        // Mệnh(1)->Tài(2)->Tật(3)->Phu(4)->Phúc(5)->Quan(6)
        // In TuVi layout relative index from SoulPalace: 
        // Tài=+4, Tật=+7, Phu=+2, Phúc=+10, Quan=+8 (Going backwards from Mệnh is 0, -1=Huynh, -2=Phu, etc)
        // We use fixIndex. Actually, +2=Phúc, -2=Phu in standard ordering depends on the loop.
        const stepMap = [0, 4, 7, 2, 10, 8]; 
        if (nominalAge >= 1 && nominalAge <= 6) {
            decadalIndex = fixIndex(soulIndex + stepMap[nominalAge - 1]);
        } else {
            decadalIndex = soulIndex; 
        }
    }

    const decadalPalace = chart.palaces[decadalIndex];
    let decadalStem = STEMS.findIndex(s => s === decadalPalace.heavenlyStem);
    let decadalBranch = BRANCHES.findIndex(s => s === decadalPalace.earthlyBranch);
    if (decadalStem === -1) decadalStem = 0;
    if (decadalBranch === -1) decadalBranch = 0;

    const yearlyStarsLists = constructStarsByStemBranch(targetStem, targetBranch, 'yearly');
    const decadalStarsLists = constructStarsByStemBranch(decadalStem, decadalBranch, 'decadal');

    const newPalaces = chart.palaces.map((p, i) => {
        const pCopy: any = { ...p };
        
        if (i === decadalIndex) pCopy.decadalName = isChildhood ? 'Đại Hạn (Đồng)' : 'Đại Hạn';
        if (i === targetBranch) pCopy.yearlyName = 'Lưu Niên';
        
        pCopy.decadalStars = decadalStarsLists[i];
        pCopy.yearlyStars = yearlyStarsLists[i];
        
        return pCopy as TuViPalace;
    });

    return {
        ...chart,
        palaces: newPalaces,
        targetYearStemBranch: `${STEMS[targetStem]} ${BRANCHES[targetBranch]}`
    };
}
