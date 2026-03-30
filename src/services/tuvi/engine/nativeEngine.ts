import {
    getLunarDate,
    crossValidateLunarDate,
    getNapAmForStemBranch,
    getSolarTermForDate,
    classifyBirthHour,
    getCanChiYear,
    getCanChiDay,
    parseCanChi,
    getHourCanChi,
    getJDN
} from '../../sharedCore';
import type { ChartInput, TuViChartData, TuViPalace, TuViStar, StageInfo } from '../tuviTypes';
import { calculateSihuaFlows } from '../sihuaEngine';
import { getTuHoaTable } from '../tuHoaTables';
import { applyTemporalOverlays } from './temporalEngine';

import {
    HEAVENLY_STEMS,
    EARTHLY_BRANCHES,
    PALACES,
    fixIndex,
    fixEarthlyBranchIndex,
    getZiweiTianfuIndex,
    getMajorStarsLocation,
    getLuYangTuoMaIndex,
    getKuiYueIndex,
    getZuoYouIndex,
    getChangQuIndex,
    getDailyStarIndex,
    getTimelyStarIndex,
    getKongJieIndex,
    getHuoLingIndex,
    getLuanXiIndex,
    getHuagaiXianchiIndex,
    getGuGuaIndex,
    getJieshaAdjIndex,
    getDahaoIndex,
    getTianshiTianshangIndex,
    getNianjieIndex,
    getYearlyStarIndex,
    getMonthlyStarIndex,
    getFiveElementsClass,
    getChangsheng12StartIndex,
    getYinYangDirection
} from './starLocation';

import { STAR_NAMES, STARS_INFO, BRIGHTNESS_LEVELS } from './starCatalog';

const VI_CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const VI_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

// ── Trường Sinh 12 (Changsheng 12 Life Stages) ────────────────
const CHANGSHENG_12_LABELS = [
    'Trường Sinh', 'Mục Dục', 'Quan Đới', 'Lâm Quan', 'Đế Vượng', 'Suy',
    'Bệnh', 'Tử', 'Mộ', 'Tuyệt', 'Thai', 'Dưỡng'
];

// ── Bác Sĩ 12 (12-star cycle starting from Lộc Tồn) ──────────
const BOSHI_12_LABELS = [
    'Bác Sỹ', 'Lực Sỹ', 'Thanh Long', 'Tiểu Hao', 'Tướng Quân', 'Tấu Thư',
    'Phi Liêm', 'Hỷ Thần', 'Bệnh Phù', 'Đại Hao', 'Phục Binh', 'Quan Phủ'
];

// ── Mệnh Chủ (Soul Lord) — determined by Mệnh earthly branch ─
const MENH_CHU_MAP: Record<string, string> = {
    'Tý': 'Tham Lang', 'Sửu': 'Cự Môn', 'Dần': 'Lộc Tồn', 'Mão': 'Văn Khúc',
    'Thìn': 'Liêm Trinh', 'Tỵ': 'Vũ Khúc', 'Ngọ': 'Phá Quân', 'Mùi': 'Vũ Khúc',
    'Thân': 'Liêm Trinh', 'Dậu': 'Văn Khúc', 'Tuất': 'Lộc Tồn', 'Hợi': 'Cự Môn'
};

// ── Thân Chủ (Body Lord) — determined by birth year earthly branch ─
const THAN_CHU_MAP: Record<string, string> = {
    'Tý': 'Hỏa Tinh', 'Sửu': 'Thiên Tướng', 'Dần': 'Thiên Lương', 'Mão': 'Thiên Đồng',
    'Thìn': 'Văn Xương', 'Tỵ': 'Thiên Cơ', 'Ngọ': 'Hỏa Tinh', 'Mùi': 'Thiên Tướng',
    'Thân': 'Thiên Lương', 'Dậu': 'Thiên Đồng', 'Tuất': 'Văn Xương', 'Hợi': 'Thiên Cơ'
};

export function generateNativeChart(input: ChartInput): TuViChartData {
    const parts = input.solarDate.split('-').map(Number);
    const solarDateObj = new Date(parts[0], parts[1] - 1, parts[2]);

    let vlunarDay, vlunarMonth, vlunarYear, visLeapMonth;
    if (input.dateType === 'lunar' && input.lunarDay && input.lunarMonth && input.lunarYear) {
        vlunarDay = input.lunarDay;
        vlunarMonth = input.lunarMonth;
        vlunarYear = input.lunarYear;
        visLeapMonth = input.isLeapMonth ?? false;
    } else {
        const phase1Lunar = getLunarDate(solarDateObj);
        vlunarDay = phase1Lunar.day;
        vlunarMonth = phase1Lunar.month;
        vlunarYear = phase1Lunar.year;
        visLeapMonth = phase1Lunar.isLeap;
    }

    const timeIndex = input.birthContext ? input.birthContext.timeIndex : input.timeIndex;
    const hourChiName = VI_CHI[timeIndex];

    const yearCanChiStr = getCanChiYear(vlunarYear);
    const yearCanChi = parseCanChi(yearCanChiStr);
    const yearStemIndex = VI_CAN.indexOf(yearCanChi.can);
    const yearBranchIndex = VI_CHI.indexOf(yearCanChi.chi);

    // Dần(2) is Month 1. So Month Index = (Month - 1) + 2 = Month + 1
    const lunarMonthOffset = fixIndex(vlunarMonth + 1); 
    const soulIndex = fixIndex(lunarMonthOffset - timeIndex);
    const bodyIndex = fixIndex(lunarMonthOffset + timeIndex);

    // Calculate Can/Chi of each palace (Ngũ Hổ Độn)
    const tigerStemStartRule = [2, 4, 6, 8, 0]; // Giáp/Kỷ->Bính(2), Ất/Canh->Mậu(4)...
    const tigerStemIndex = tigerStemStartRule[yearStemIndex % 5];
    
    type MutablePalace = Omit<TuViPalace, 'majorStars' | 'minorStars' | 'adjectiveStars' | 'name' | 'stage'> & {
        name: string;
        stage: StageInfo;
        majorStars: TuViStar[];
        minorStars: TuViStar[];
        adjectiveStars: TuViStar[];
        hasTuanKhong?: boolean;
        hasTrietKhong?: boolean;
        changsheng12?: string;
        boshi12?: string;
    };
    
    const palaces: MutablePalace[] = [];
    for (let i = 0; i < 12; i++) {
        const stemIndex = fixIndex(tigerStemIndex + (i - 2), 10);
        palaces.push({
            name: '',
            earthlyBranch: VI_CHI[i],
            heavenlyStem: VI_CAN[stemIndex],
            isSoulPalace: i === soulIndex,
            isBodyPalace: i === bodyIndex,
            majorStars: [],
            minorStars: [],
            adjectiveStars: [],
            stage: { range: [0, 0], heavenlyStem: VI_CAN[stemIndex] }
        });
    }

    // Now proper Cục calculation
    const cucVal = getFiveElementsClass(
        VI_CAN.indexOf(palaces[soulIndex].heavenlyStem),
        soulIndex
    );
    const cucStr = ['Nhị', 'Tam', 'Tứ', 'Ngũ', 'Lục'][cucVal - 2];
    const cucElement = ['Thủy', 'Mộc', 'Kim', 'Thổ', 'Hỏa'][cucVal - 2];

    const yinYangDir = getYinYangDirection(input.gender, yearBranchIndex);

    // Palace Names assignment and Đại Hạn
    const palaceNames = ["Mệnh", "Phụ Mẫu", "Phúc Đức", "Điền Trạch", "Quan Lộc", "Nô Bộc", "Thiên Di", "Tật Ách", "Tài Bạch", "Tử Tức", "Phu Thê", "Huynh Đệ"];
    for(let i = 0; i < 12; i++) {
        const distFromSoul = fixIndex(i - soulIndex);
        palaces[i].name = palaceNames[distFromSoul];

        // Decadal Calculation (Đại Hạn)
        let decadalStart = cucVal + i * 10;
        let decadalIndex = 0;
        if (yinYangDir === 1) {
            decadalIndex = fixIndex(soulIndex + i);
        } else {
            decadalIndex = fixIndex(soulIndex - i);
        }
        
        palaces[decadalIndex].stage = {
            range: [decadalStart, decadalStart + 9],
            heavenlyStem: palaces[decadalIndex].heavenlyStem
        };
    }

    // ── Trường Sinh 12 ─────────────────────────────────────────
    const changshengStart = getChangsheng12StartIndex(cucVal);
    for (let i = 0; i < 12; i++) {
        const palaceIdx = fixIndex(changshengStart + (yinYangDir * i));
        palaces[palaceIdx].changsheng12 = CHANGSHENG_12_LABELS[i];
    }

    // ── Stars ──────────────────────────────────────────────────
    const { ziweiIndex, tianfuIndex } = getZiweiTianfuIndex(timeIndex, vlunarDay, cucVal);
    const majorLocs = getMajorStarsLocation(ziweiIndex, tianfuIndex);

    const addStar = (palaceIndex: number, starId: keyof typeof STAR_NAMES, type: TuViStar['type'], scope: TuViStar['scope'] = 'origin') => {
        const name = STAR_NAMES[starId] || starId;
        const info = (STARS_INFO as any)[starId];
        
        const viBrightnessMap: Record<string, string> = {
            'miao': 'M',  // Miếu — strongest
            'wang': 'V',  // Vượng
            'de':   'Đ',  // Đắc
            'li':   'H',  // Hòa (formerly incorrectly mapped to 'B')
            'ping': 'B',  // Bình
            'bu':   '',   // Nhàn — reference charts typically omit this
            'xian': 'h'   // Hãm — weakest
        };
        let brightness = '';
        if (info && info.brightness) {
            // Brightness arrays in STARS_INFO use Vietnamese Toàn Thư standard,
            // indexed Tý-first (0=Tý, 1=Sửu, 2=Dần, ..., 11=Hợi) — same as palaceIndex.
            const b = info.brightness[palaceIndex];
            if (b) brightness = viBrightnessMap[b] || '';
        }

        const star: TuViStar = { name, type, scope, brightness };

        if (type === 'major') {
            palaces[palaceIndex].majorStars.push(star);
        } else if (type === 'soft' || type === 'tough' || type === 'lucun' || type === 'tianma' || starId.endsWith('Min')) {
            palaces[palaceIndex].minorStars.push(star);
        } else {
            palaces[palaceIndex].adjectiveStars.push(star);
        }
    };

    // Major Stars
    addStar(majorLocs.ziwei, 'ziweiMaj', 'major');
    addStar(majorLocs.tianji, 'tianjiMaj', 'major');
    addStar(majorLocs.taiyang, 'taiyangMaj', 'major');
    addStar(majorLocs.wuqu, 'wuquMaj', 'major');
    addStar(majorLocs.tiantong, 'tiantongMaj', 'major');
    addStar(majorLocs.lianzhen, 'lianzhenMaj', 'major');
    
    addStar(majorLocs.tianfu, 'tianfuMaj', 'major');
    addStar(majorLocs.taiyin, 'taiyinMaj', 'major');
    addStar(majorLocs.tanlang, 'tanlangMaj', 'major');
    addStar(majorLocs.jumen, 'jumenMaj', 'major');
    addStar(majorLocs.tianxiang, 'tianxiangMaj', 'major');
    addStar(majorLocs.tianliang, 'tianliangMaj', 'major');
    addStar(majorLocs.qisha, 'qishaMaj', 'major');
    addStar(majorLocs.pojun, 'pojunMaj', 'major');

    // Minor Stars
    const { luIndex, maIndex, yangIndex, tuoIndex } = getLuYangTuoMaIndex(yearStemIndex, yearBranchIndex);
    addStar(luIndex, 'lucunMin', 'lucun');
    addStar(maIndex, 'tianmaMin', 'tianma');
    addStar(yangIndex, 'qingyangMin', 'tough');
    addStar(tuoIndex, 'tuoluoMin', 'tough');

    const { kuiIndex, yueIndex } = getKuiYueIndex(yearStemIndex);
    addStar(kuiIndex, 'tiankuiMin', 'soft');
    addStar(yueIndex, 'tianyueMin', 'soft');

    const { zuoIndex, youIndex } = getZuoYouIndex(vlunarMonth);
    addStar(zuoIndex, 'zuofuMin', 'soft');
    addStar(youIndex, 'youbiMin', 'soft');

    const { changIndex, quIndex } = getChangQuIndex(timeIndex);
    addStar(changIndex, 'wenchangMin', 'soft');
    addStar(quIndex, 'wenquMin', 'soft');

    const { huoIndex, lingIndex } = getHuoLingIndex(yearBranchIndex, timeIndex);
    addStar(huoIndex, 'huoxingMin', 'tough');
    addStar(lingIndex, 'lingxingMin', 'tough');

    const { kongIndex, jieIndex } = getKongJieIndex(timeIndex);
    addStar(kongIndex, 'dikongMin', 'tough');
    addStar(jieIndex, 'dijieMin', 'tough');

    // Adjective Stars
    const ds = getDailyStarIndex(vlunarDay, zuoIndex, youIndex, changIndex, quIndex);
    addStar(ds.santaiIndex, 'santai', 'adjective');
    addStar(ds.bazuoIndex, 'bazuo', 'adjective');
    addStar(ds.enguangIndex, 'engguang', 'adjective');
    addStar(ds.tianguiIndex, 'tiangui', 'adjective');

    const ts = getTimelyStarIndex(timeIndex);
    addStar(ts.taifuIndex, 'taifu', 'adjective');
    addStar(ts.fenggaoIndex, 'fenggao', 'adjective');

    const lx = getLuanXiIndex(yearBranchIndex);
    addStar(lx.hongluanIndex, 'hongluan', 'adjective');
    addStar(lx.tianxiIndex, 'tianxi', 'adjective');

    const ys = getYearlyStarIndex(yearStemIndex, yearBranchIndex, soulIndex, bodyIndex);
    addStar(ys.xianchiIndex, 'xianchi', 'adjective');
    addStar(ys.huagaiIndex, 'huagai', 'adjective');
    addStar(ys.guchenIndex, 'guchen', 'adjective');
    addStar(ys.guasuIndex, 'guasu', 'adjective');
    addStar(ys.tiancaiIndex, 'tiancai', 'adjective');
    addStar(ys.tianshouIndex, 'tianshou', 'adjective');
    addStar(ys.tianchuIndex, 'tianchu', 'adjective');
    addStar(ys.posuiIndex, 'posui', 'adjective');
    addStar(ys.feilianIndex, 'feilian', 'adjective');
    addStar(ys.longchiIndex, 'longchi', 'adjective');
    addStar(ys.fenggeIndex, 'fengge', 'adjective');
    addStar(ys.tiankuIndex, 'tianku', 'adjective');
    addStar(ys.tianxuIndex, 'tianxu', 'adjective');
    addStar(ys.tianguanIndex, 'tianguan', 'adjective');
    addStar(ys.tianfuIndex, 'tianfu', 'adjective');
    addStar(ys.tiandeIndex, 'tiande', 'adjective');
    addStar(ys.yuedeIndex, 'yuede', 'adjective');
    addStar(ys.tiankongIndex, 'tiankong', 'adjective');
    addStar(ys.jieluIndex, 'jielu', 'adjective');
    addStar(ys.kongwangIndex, 'kongwang', 'adjective');
    addStar(ys.xunkongIndex, 'xunkong', 'adjective');
    addStar(ys.tianshiIndex, 'tianshi', 'adjective');
    addStar(ys.tianshangIndex, 'tianshang', 'adjective');
    addStar(ys.jieshaAdjIndex, 'jieshaAdj', 'adjective');

    const nianjieIdx = getNianjieIndex(yearBranchIndex);
    addStar(nianjieIdx, 'nianjie', 'helper');

    const ms = getMonthlyStarIndex(vlunarMonth);
    addStar(ms.yuejieIndex, 'jieshen', 'helper');
    addStar(ms.tianyaoIndex, 'tianyao', 'adjective');
    addStar(ms.tianxingIndex, 'tianxing', 'adjective');
    addStar(ms.yinshaIndex, 'yinsha', 'adjective');
    addStar(ms.tianyueIndex, 'tianyue', 'adjective');
    addStar(ms.tianwuIndex, 'tianwu', 'adjective');

    // ── Bác Sĩ 12 ──────────────────────────────────────────────
    // Starts at Lộc Tồn position, goes Forward (Dương) or Backward (Âm)
    for (let i = 0; i < 12; i++) {
        const palaceIdx = fixIndex(luIndex + (yinYangDir * i));
        palaces[palaceIdx].boshi12 = BOSHI_12_LABELS[i];
    }

    // ── Tuần Không / Triệt Không ───────────────────────────────
    // Tuần: uses xunkongIndex from getYearlyStarIndex
    palaces[ys.xunkongIndex].hasTuanKhong = true;
    // Triệt: uses jiekongIndex from getYearlyStarIndex
    if (typeof ys.jiekongIndex === 'number') {
        palaces[ys.jiekongIndex].hasTrietKhong = true;
    }

    // ── Tứ Hóa Mutagens ────────────────────────────────────────
    // Attach mutagen arrays to stars based on yearlyStem Tứ Hóa table
    const school = input.school ?? 'vi';
    const schoolMap: Record<string, 'toanThu' | 'trungChau' | 'phiTinh'> = {
        'vi': 'toanThu', 'cn': 'trungChau', 'tw': 'phiTinh'
    };
    const tuHoaTable = getTuHoaTable(schoolMap[school] || 'toanThu');
    const yearStemStr = yearCanChi.can;
    const yearMapping = tuHoaTable[yearStemStr];
    
    if (yearMapping) {
        const mutagenPairs: { starName: string; label: string }[] = [
            { starName: yearMapping.loc, label: 'Lộc' },
            { starName: yearMapping.quyen, label: 'Quyền' },
            { starName: yearMapping.khoa, label: 'Khoa' },
            { starName: yearMapping.ky, label: 'Kỵ' },
        ];

        for (const { starName, label } of mutagenPairs) {
            // Find the star in the palaces and attach the mutagen
            for (const palace of palaces) {
                const allStars = [...palace.majorStars, ...palace.minorStars, ...palace.adjectiveStars];
                const found = allStars.find(s => s.name === starName);
                if (found) {
                    // TuViStar's mutagen is readonly string[], create mutable reference
                    (found as any).mutagen = [...(found.mutagen || []), label];
                    break;
                }
            }
        }
    }

    // ── Metadata ────────────────────────────────────────────────
    const jd = getJDN(solarDateObj.getDate(), solarDateObj.getMonth() + 1, solarDateObj.getFullYear());
    const dayCanChiStr = getCanChiDay(solarDateObj);
    const dayCan = dayCanChiStr.split(' ')[0] as any;
    const dayChi = dayCanChiStr.split(' ')[1] as any;

    const hourCanChiObj = getHourCanChi(dayCan, VI_CHI[timeIndex] as any);
    const hourCanChiStr = `${hourCanChiObj.can} ${hourCanChiObj.chi}`;
    
    const napAmYear = getNapAmForStemBranch(yearCanChiStr);
    const solarTerm = getSolarTermForDate(input.solarDate);
    const birthHourQuality = classifyBirthHour(dayChi, hourCanChiObj.chi);

    const isDuongYear = ['Giáp', 'Bính', 'Mậu', 'Canh', 'Nhâm'].includes(yearCanChi.can);
    const isMale = input.gender === 'male';
    const yinYangLabel = isDuongYear
        ? (isMale ? 'Dương Nam' : 'Dương Nữ')
        : (isMale ? 'Âm Nam' : 'Âm Nữ');

    // ── Month Stem-Branch (Nguyệt Kiến) ────────────────────────
    // Uses Ngũ Hổ Độn for year stem → month 1 (Dần) stem
    const monthStemStart = tigerStemStartRule[yearStemIndex % 5];
    const monthStemIdx = fixIndex(monthStemStart + (vlunarMonth - 1), 10);
    const monthBranchIdx = fixIndex(vlunarMonth + 1); // Tháng 1 = Dần(2)
    const monthStemBranch = `${VI_CAN[monthStemIdx]} ${VI_CHI[monthBranchIdx]}`;

    // ── Mệnh Chủ / Thân Chủ ────────────────────────────────────
    const soulBranch = VI_CHI[soulIndex];
    const yearBranchStr = yearCanChi.chi;
    const soul = MENH_CHU_MAP[soulBranch] || '';
    const body = THAN_CHU_MAP[yearBranchStr] || '';
    
    // Body palace name
    const bodyPalace = palaces.find(p => p.isBodyPalace);
    const bodyPalaceName = bodyPalace?.name ?? '';

    // ── Sihua Flows ─────────────────────────────────────────────
    const sihuaFlows = calculateSihuaFlows(palaces as unknown as TuViPalace[], schoolMap[school] || 'toanThu');

    // ── Sao Chủ Cục (Ruling Star of the Cục) ────────────────────
    const SAO_CHU_CUC_MAP: Record<string, string> = {
        'Thủy': 'Thiên Đồng', 'Mộc': 'Tham Lang', 'Kim': 'Vũ Khúc',
        'Thổ': 'Thiên Cơ', 'Hỏa': 'Liêm Trinh'
    };
    const saoChucCuc = SAO_CHU_CUC_MAP[cucElement] || '';

    // ── Âm Dương Lý (Thuận/Nghịch) ──────────────────────────────
    // Male+Yang or Female+Yin = Thuận lý; else = Nghịch lý
    const isYangYear = isDuongYear;
    const amDuongLy = (isMale === isYangYear) ? 'Thuận lý' : 'Nghịch lý';

    // ── Cục-Mệnh Relationship (Five Element interaction) ────────
    const NGU_HANH_ORDER = ['Kim', 'Thủy', 'Mộc', 'Hỏa', 'Thổ'];
    const napAmElement = napAmYear ? napAmYear.split(' ').pop() || '' : '';
    function getElementRelation(cucEl: string, menhEl: string): string {
        const ci = NGU_HANH_ORDER.indexOf(cucEl);
        const mi = NGU_HANH_ORDER.indexOf(menhEl);
        if (ci < 0 || mi < 0) return '';
        if (ci === mi) return 'Cục hòa Mệnh (Tỉ hòa)';
        // Generation cycle: Kim→Thủy→Mộc→Hỏa→Thổ→Kim
        if (NGU_HANH_ORDER[(ci + 1) % 5] === menhEl) return 'Cục sinh Mệnh';
        if (NGU_HANH_ORDER[(mi + 1) % 5] === cucEl) return 'Mệnh sinh Cục';
        // Destruction cycle: Kim→Mộc→Thổ→Thủy→Hỏa→Kim
        const KHAC_ORDER = ['Kim', 'Mộc', 'Thổ', 'Thủy', 'Hỏa'];
        const ck = KHAC_ORDER.indexOf(cucEl);
        const mk = KHAC_ORDER.indexOf(menhEl);
        if (ck >= 0 && mk >= 0 && KHAC_ORDER[(ck + 1) % 5] === menhEl) return 'Cục khắc Mệnh';
        if (ck >= 0 && mk >= 0 && KHAC_ORDER[(mk + 1) % 5] === cucEl) return 'Mệnh khắc Cục';
        return '';
    }
    const cucMenhRelation = getElementRelation(cucElement, napAmElement);

    // ── Target Year Stem-Branch ──────────────────────────────────
    const currentYear = new Date().getFullYear();
    const targetYear = input.targetYear || currentYear;
    const targetYearStemBranch = getCanChiYear(targetYear);

    // ── Time Range ───────────────────────────────────────────────
    const TIME_RANGES = [
        '23:00-01:00', '01:00-03:00', '03:00-05:00', '05:00-07:00',
        '07:00-09:00', '09:00-11:00', '11:00-13:00', '13:00-15:00',
        '15:00-17:00', '17:00-19:00', '19:00-21:00', '21:00-23:00'
    ];
    const timeRangeStr = TIME_RANGES[timeIndex] || '';

    const chartData: TuViChartData = {
        solarDate: input.solarDate,
        lunarDate: `${vlunarDay} tháng ${vlunarMonth} (Nhuận: ${visLeapMonth ? 'Có' : 'Không'})`,
        chineseDate: `${yearCanChiStr}, ${hourCanChiStr}`,
        time: hourChiName,
        timeRange: timeRangeStr,
        sign: 'N/A',
        zodiac: yearCanChi.chi,
        earthlyBranchOfSoulPalace: VI_CHI[soulIndex],
        earthlyBranchOfBodyPalace: VI_CHI[bodyIndex],
        soul,
        body,
        fiveElementsClass: `${cucElement} ${cucStr} Cục`,
        palaces: palaces as unknown as TuViPalace[],
        lunarDay: vlunarDay,
        lunarMonth: vlunarMonth,
        lunarYear: vlunarYear,
        cucElement,
        cucNumber: cucStr,
        
        // Crossover Metadata
        yearStemBranch: yearCanChiStr,
        monthStemBranch,
        dayStemBranch: dayCanChiStr,
        hourStemBranch: hourCanChiStr,
        bodyPalaceName,
        napAmYear,
        solarTerm,
        birthHourQuality,
        yinYangLabel,
        sihuaFlows,

        // Advanced center panel metadata
        saoChucCuc,
        amDuongLy,
        cucMenhRelation,
        targetYearStemBranch,
    };

    if (input.targetYear) {
        return applyTemporalOverlays(chartData, input.targetYear);
    }

    return chartData;
}
