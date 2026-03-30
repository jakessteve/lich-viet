import {
    getLunarDate,
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
    fixIndex,
    getZiweiTianfuIndex,
    getMajorStarsLocation,
    getLuYangTuoMaIndex,
    getZuoYouIndex,
    getChangQuIndex,
    getDailyStarIndex,
    getTimelyStarIndex,
    getKongJieIndex,
    getHuoLingIndex,
    getLuanXiIndex,
    getYearlyStarIndex,
    getMonthlyStarIndex,
    getFiveElementsClass,
    getChangsheng12StartIndex,
    getYinYangDirection,
    getNianjieIndex,
    getLiuHeIndex,
    getDuongPhuIndex,
    getQuocAnIndex,
    getDaoHoaIndex,
    THIEN_LA_INDEX,
    DIA_VONG_INDEX,
    getThienGiaiIndex,
    getThienDucQuyNhanIndex,
    getNguyetDucQuyNhanIndex
} from './starLocation';

import { STAR_NAMES, STARS_INFO } from './starCatalog';

export const VI_CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
export const VI_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

export const CHANGSHENG_12_LABELS = [
    'Trường Sinh', 'Mục Dục', 'Quan Đới', 'Lâm Quan', 'Đế Vượng', 'Suy',
    'Bệnh', 'Tử', 'Mộ', 'Tuyệt', 'Thai', 'Dưỡng'
];

export const MENH_CHU_MAP: Record<string, string> = {
    'Tý': 'Tham Lang', 'Sửu': 'Cự Môn', 'Dần': 'Lộc Tồn', 'Mão': 'Văn Khúc',
    'Thìn': 'Liêm Trinh', 'Tỵ': 'Vũ Khúc', 'Ngọ': 'Phá Quân', 'Mùi': 'Vũ Khúc',
    'Thân': 'Liêm Trinh', 'Dậu': 'Văn Khúc', 'Tuất': 'Lộc Tồn', 'Hợi': 'Cự Môn'
};

export const THAN_CHU_MAP: Record<string, string> = {
    'Tý': 'Hỏa Tinh', 'Sửu': 'Thiên Tướng', 'Dần': 'Thiên Lương', 'Mão': 'Thiên Đồng',
    'Thìn': 'Văn Xương', 'Tỵ': 'Thiên Cơ', 'Ngọ': 'Hỏa Tinh', 'Mùi': 'Thiên Tướng',
    'Thân': 'Thiên Lương', 'Dậu': 'Thiên Đồng', 'Tuất': 'Văn Xương', 'Hợi': 'Thiên Cơ'
};

export type MutablePalace = Omit<TuViPalace, 'majorStars' | 'minorStars' | 'adjectiveStars' | 'name' | 'stage'> & {
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

export abstract class BaseTuViEngine {
    protected input: ChartInput;
    protected solarDateObj!: Date;
    protected vlunarDay!: number;
    protected vlunarMonth!: number;
    protected vlunarYear!: number;
    protected visLeapMonth!: boolean;
    protected timeIndex!: number;
    protected hourChiName!: string;

    protected yearCanChiStr!: string;
    protected yearCanChi!: { can: string, chi: string };
    protected yearStemIndex!: number;
    protected yearBranchIndex!: number;

    protected lunarMonthOffset!: number;
    protected soulIndex!: number;
    protected bodyIndex!: number;
    protected tigerStemIndex!: number;

    protected palaces: MutablePalace[] = [];

    protected cucVal!: number;
    protected cucStr!: string;
    protected cucElement!: string;
    protected yinYangDir!: number;
    
    // Common calculated indices
    protected zuoIndex!: number;
    protected youIndex!: number;
    protected changIndex!: number;
    protected quIndex!: number;
    protected luIndex!: number;
    protected maIndex!: number;
    protected yangIndex!: number;
    protected tuoIndex!: number;
    protected ys!: any; // yearly star indices

    constructor(input: ChartInput) {
        this.input = input;
    }

    public generate(): TuViChartData {
        this.initTime();
        this.resolveLeapMonth();
        this.initCanChiAndPalaces();
        this.calcCucAndMenhThich();
        this.calcMajorStars();
        this.calcMinorStars();
        this.applyTuHoa();
        return this.buildOutput();
    }

    protected initTime() {
        const parts = this.input.solarDate.split('-').map(Number);
        this.solarDateObj = new Date(parts[0], parts[1] - 1, parts[2]);

        this.timeIndex = this.input.birthContext ? this.input.birthContext.timeIndex : this.input.timeIndex;
        this.hourChiName = VI_CHI[this.timeIndex];
    }

    // Abstract method so schools can define leap month handling
    protected abstract resolveLeapMonth(): void;
    protected initCanChiAndPalaces() {
        this.yearCanChiStr = getCanChiYear(this.vlunarYear);
        this.yearCanChi = parseCanChi(this.yearCanChiStr);
        this.yearStemIndex = VI_CAN.indexOf(this.yearCanChi.can);
        this.yearBranchIndex = VI_CHI.indexOf(this.yearCanChi.chi);

        this.lunarMonthOffset = fixIndex(this.vlunarMonth + 1); 
        this.soulIndex = fixIndex(this.lunarMonthOffset - this.timeIndex);
        this.bodyIndex = fixIndex(this.lunarMonthOffset + this.timeIndex);

        const tigerStemStartRule = [2, 4, 6, 8, 0];
        this.tigerStemIndex = tigerStemStartRule[this.yearStemIndex % 5];

        for (let i = 0; i < 12; i++) {
            const stemIndex = fixIndex(this.tigerStemIndex + (i - 2), 10);
            this.palaces.push({
                name: '',
                earthlyBranch: VI_CHI[i],
                heavenlyStem: VI_CAN[stemIndex],
                isSoulPalace: i === this.soulIndex,
                isBodyPalace: i === this.bodyIndex,
                majorStars: [],
                minorStars: [],
                adjectiveStars: [],
                stage: { range: [0, 0], heavenlyStem: VI_CAN[stemIndex] }
            });
        }
    }

    protected calcCucAndMenhThich() {
        this.cucVal = getFiveElementsClass(
            VI_CAN.indexOf(this.palaces[this.soulIndex].heavenlyStem),
            this.soulIndex
        );
        this.cucStr = ['Nhị', 'Tam', 'Tứ', 'Ngũ', 'Lục'][this.cucVal - 2];
        this.cucElement = ['Thủy', 'Mộc', 'Kim', 'Thổ', 'Hỏa'][this.cucVal - 2];

        this.yinYangDir = getYinYangDirection(this.input.gender, this.yearBranchIndex);

        const palaceNames = ["Mệnh", "Phụ Mẫu", "Phúc Đức", "Điền Trạch", "Quan Lộc", "Nô Bộc", "Thiên Di", "Tật Ách", "Tài Bạch", "Tử Tức", "Phu Thê", "Huynh Đệ"];
        for (let i = 0; i < 12; i++) {
            const distFromSoul = fixIndex(i - this.soulIndex);
            this.palaces[i].name = palaceNames[distFromSoul];

            let decadalStart = this.cucVal + i * 10;
            let decadalIndex = this.yinYangDir === 1 ? fixIndex(this.soulIndex + i) : fixIndex(this.soulIndex - i);
            
            this.palaces[decadalIndex].stage = {
                range: [decadalStart, decadalStart + 9],
                heavenlyStem: this.palaces[decadalIndex].heavenlyStem
            };
        }

        const changshengStart = getChangsheng12StartIndex(this.cucVal);
        for (let i = 0; i < 12; i++) {
            const palaceIdx = fixIndex(changshengStart + (this.yinYangDir * i));
            this.palaces[palaceIdx].changsheng12 = CHANGSHENG_12_LABELS[i];
        }
    }

    protected addStar(palaceIndex: number, starId: keyof typeof STAR_NAMES, type: TuViStar['type'], scope: TuViStar['scope'] = 'origin', forceName?: string) {
        const name = forceName || STAR_NAMES[starId] || starId;
        const info = (STARS_INFO as any)[starId];
        
        const viBrightnessMap: Record<string, string> = {
            'miao': 'Miếu', 'wang': 'Vượng', 'de': 'Đắc',
            'li': 'Hòa', 'ping': 'Bình', 'bu': '', 'xian': 'Hãm'
        };
        let brightness = '';
        if (info && info.brightness) {
            const b = info.brightness[palaceIndex];
            if (b) brightness = viBrightnessMap[b] || '';
        }

        const star: TuViStar = { name, type, scope, brightness };

        if (type === 'major') {
            this.palaces[palaceIndex].majorStars.push(star);
        } else if (type === 'soft' || type === 'tough' || type === 'lucun' || type === 'tianma' || starId.endsWith('Min')) {
            this.palaces[palaceIndex].minorStars.push(star);
        } else {
            this.palaces[palaceIndex].adjectiveStars.push(star);
        }
    }

    protected calcMajorStars() {
        const { ziweiIndex, tianfuIndex } = getZiweiTianfuIndex(this.timeIndex, this.vlunarDay, this.cucVal);
        const majorLocs = getMajorStarsLocation(ziweiIndex, tianfuIndex);

        this.addStar(majorLocs.ziwei, 'ziweiMaj', 'major');
        this.addStar(majorLocs.tianji, 'tianjiMaj', 'major');
        this.addStar(majorLocs.taiyang, 'taiyangMaj', 'major');
        this.addStar(majorLocs.wuqu, 'wuquMaj', 'major');
        this.addStar(majorLocs.tiantong, 'tiantongMaj', 'major');
        this.addStar(majorLocs.lianzhen, 'lianzhenMaj', 'major');
        this.addStar(majorLocs.tianfu, 'tianfuMaj', 'major');
        this.addStar(majorLocs.taiyin, 'taiyinMaj', 'major');
        this.addStar(majorLocs.tanlang, 'tanlangMaj', 'major');
        this.addStar(majorLocs.jumen, 'jumenMaj', 'major');
        this.addStar(majorLocs.tianxiang, 'tianxiangMaj', 'major');
        this.addStar(majorLocs.tianliang, 'tianliangMaj', 'major');
        this.addStar(majorLocs.qisha, 'qishaMaj', 'major');
        this.addStar(majorLocs.pojun, 'pojunMaj', 'major');
    }

    protected calcKinhDaIndices(): { qingyangIndex: number; tuoluoIndex: number } {
        // Default standard (Iztro / classical Chinese school / generalized Tu Vi)
        // Tiền Kình Hậu Đà always uses +1 and -1 regardless of Yin/Yang gender.
        return {
            qingyangIndex: fixIndex(this.luIndex + 1),
            tuoluoIndex: fixIndex(this.luIndex - 1)
        };
    }

    protected calcMinorStars() {
        const { luIndex, maIndex } = getLuYangTuoMaIndex(this.yearStemIndex, this.yearBranchIndex);
        this.luIndex = luIndex;
        this.maIndex = maIndex;
        
        const { qingyangIndex, tuoluoIndex } = this.calcKinhDaIndices();
        this.yangIndex = qingyangIndex;
        this.tuoIndex = tuoluoIndex;

        this.addStar(luIndex, 'lucunMin', 'lucun');
        this.addStar(maIndex, 'tianmaMin', 'tianma');
        this.addStar(qingyangIndex, 'qingyangMin', 'tough');
        this.addStar(tuoluoIndex, 'tuoluoMin', 'tough');

        const { zuoIndex, youIndex } = getZuoYouIndex(this.vlunarMonth);
        this.zuoIndex = zuoIndex;
        this.youIndex = youIndex;
        this.addStar(zuoIndex, 'zuofuMin', 'soft');
        this.addStar(youIndex, 'youbiMin', 'soft');

        const { changIndex, quIndex } = getChangQuIndex(this.timeIndex);
        this.changIndex = changIndex;
        this.quIndex = quIndex;
        this.addStar(changIndex, 'wenchangMin', 'soft');
        this.addStar(quIndex, 'wenquMin', 'soft');

        const { huoIndex, lingIndex } = getHuoLingIndex(this.yearBranchIndex, this.timeIndex);
        this.addStar(huoIndex, 'huoxingMin', 'tough');
        this.addStar(lingIndex, 'lingxingMin', 'tough');

        const { kongIndex, jieIndex } = getKongJieIndex(this.timeIndex);
        this.addStar(kongIndex, 'dikongMin', 'tough');
        this.addStar(jieIndex, 'dijieMin', 'tough');

        this.calcKhoiViet(); // School specific Hook
        this.calcAdjectiveStars(); // Might be customized
        this.calcRings(); // School specific Hook
    }

    protected abstract calcKhoiViet(): void;
    protected abstract calcRings(): void;

    // Common adjective stars
    protected calcAdjectiveStars() {
        const ds = getDailyStarIndex(this.vlunarDay, this.zuoIndex, this.youIndex, this.changIndex, this.quIndex);
        this.addStar(ds.santaiIndex, 'santai', 'adjective');
        this.addStar(ds.bazuoIndex, 'bazuo', 'adjective');
        
        // Let schools override An Quang/Thien Quy if needed, otherwise default
        this.calcQuangQuy(ds.enguangIndex, ds.tianguiIndex);

        const ts = getTimelyStarIndex(this.timeIndex);
        this.addStar(ts.taifuIndex, 'taifu', 'adjective');
        this.addStar(ts.fenggaoIndex, 'fenggao', 'adjective');

        const lx = getLuanXiIndex(this.yearBranchIndex);
        this.addStar(lx.hongluanIndex, 'hongluan', 'adjective');
        this.addStar(lx.tianxiIndex, 'tianxi', 'adjective');

        this.ys = getYearlyStarIndex(this.yearStemIndex, this.yearBranchIndex, this.soulIndex, this.bodyIndex);
        this.addStar(this.ys.tiancaiIndex, 'tiancai', 'adjective');
        this.addStar(this.ys.tianshouIndex, 'tianshou', 'adjective');
        this.addStar(this.ys.tianchuIndex, 'tianchu', 'adjective');
        this.addStar(this.ys.posuiIndex, 'posui', 'adjective');
        this.addStar(this.ys.feilianIndex, 'feilian', 'adjective');
        this.addStar(this.ys.longchiIndex, 'longchi', 'adjective');
        this.addStar(this.ys.fenggeIndex, 'fengge', 'adjective');
        this.addStar(this.ys.tiankuIndex, 'tianku', 'adjective');
        this.addStar(this.ys.tianxuIndex, 'tianxu', 'adjective');
        this.addStar(this.ys.tianguanIndex, 'tianguan', 'adjective');
        this.addStar(this.ys.tianfuIndex, 'tianfu', 'adjective');
        this.addStar(this.ys.tiandeIndex, 'tiande', 'adjective');
        this.addStar(this.ys.yuedeIndex, 'yuede', 'adjective');
        this.addStar(this.ys.tiankongIndex, 'tiankong', 'adjective');
        this.addStar(this.ys.tianshiIndex, 'tianshi', 'adjective');
        this.addStar(this.ys.tianshangIndex, 'tianshang', 'adjective');
        this.addStar(this.ys.jieshaAdjIndex, 'jiesha', 'adjective');
        // ── Stars lost during Strategy refactor (were in nativeEngine.ts) ──
        this.addStar(this.ys.guchenIndex, 'guchen', 'adjective');   // Cô Thần
        this.addStar(this.ys.guasuIndex, 'guasu', 'adjective');     // Quả Tú
        this.addStar(this.ys.xianchiIndex, 'xianchi', 'adjective'); // Hàm Trì
        this.addStar(this.ys.huagaiIndex, 'huagai', 'adjective');   // Hoa Cái
        
        // ── Standard Jiangxing Ring components (often used independently as Tạp Diệu) ──
        this.addStar(this.ys.jiangxingIndex, 'jiangxing', 'adjective'); // Tướng Tinh
        this.addStar(this.ys.pananIndex, 'panan', 'adjective');         // Phan Án
        this.addStar(this.ys.suiyiIndex, 'suiyi', 'adjective');         // Tuế Dịch
        this.addStar(this.ys.xiishenIndex, 'xiishen', 'adjective');     // Tức Thần
        this.addStar(this.ys.zhaishaIndex, 'zhaisha', 'adjective');     // Tai Sát
        this.addStar(this.ys.tianshaIndex, 'tiansha', 'adjective');     // Thiên Sát
        this.addStar(this.ys.zhibeiIndex, 'zhibei', 'adjective');       // Chỉ Bối
        this.addStar(this.ys.yueshaIndex, 'yuesha', 'adjective');       // Nguyệt Sát
        this.addStar(this.ys.wangshenIndex, 'wangshen', 'adjective');   // Vong Thần

        // Note: Đại Hao is placed by the Bác Sĩ 12 ring in calcRings() — not added here to avoid duplication

        const nianjieIdx = getNianjieIndex(this.yearBranchIndex);
        this.addStar(nianjieIdx, 'nianjie', 'helper');

        // Lưu Hà (by year stem) — maléfique: blood injury, shame, misfortune
        const liuheIdx = getLiuHeIndex(this.yearStemIndex);
        this.addStar(liuheIdx, 'liuhe', 'adjective');

        const ms = getMonthlyStarIndex(this.vlunarMonth);
        this.addStar(ms.yuejieIndex, 'jieshen', 'helper');
        this.addStar(ms.tianyaoIndex, 'tianyao', 'adjective');
        this.addStar(ms.tianxingIndex, 'tianxing', 'adjective');
        this.addStar(ms.yinshaIndex, 'yinsha', 'adjective');
        this.addStar(ms.tianyueIndex, 'tianyue', 'adjective');
        this.addStar(ms.tianwuIndex, 'tianwu', 'adjective');

        this.palaces[this.ys.xunkongIndex].hasTuanKhong = true;
        if (typeof this.ys.jiekongIndex === 'number') {
            this.palaces[this.ys.jiekongIndex].hasTrietKhong = true;
        }

        // ── Stars added post-audit: missing from classical Vietnamese charts ──
        // Đường Phù (from Lộc Tồn + 7) — cát tinh: property, elegance
        this.addStar(getDuongPhuIndex(this.luIndex), 'duongphu', 'adjective');
        // Quốc Ấn (from Lộc Tồn + 8) — cát tinh: authority, official seal
        this.addStar(getQuocAnIndex(this.luIndex), 'quocan', 'adjective');
        // Đào Hoa (year branch Tam Hợp) — dual nature: charm/romance
        this.addStar(getDaoHoaIndex(this.yearBranchIndex), 'daohoa', 'adjective');
        // Thiên La — fixed at Thìn (sát tinh: heaven's net)
        this.addStar(THIEN_LA_INDEX, 'thienla', 'adjective');
        // Địa Võng — fixed at Tuất (sát tinh: earth's snare)
        this.addStar(DIA_VONG_INDEX, 'diavong', 'adjective');
        // Thiên Giải (month-based) — cát tinh: resolves calamity
        this.addStar(getThienGiaiIndex(this.vlunarMonth), 'thiengiai', 'adjective');
        // Thiên Đức Quý Nhân (month-based) — cát tinh: noble protection
        this.addStar(getThienDucQuyNhanIndex(this.vlunarMonth), 'thienducqn', 'adjective');
        // Nguyệt Đức Quý Nhân (month-based) — cát tinh: monthly noble
        this.addStar(getNguyetDucQuyNhanIndex(this.vlunarMonth), 'nguyetducqn', 'adjective');
    }

    protected calcQuangQuy(enguangDefault: number, tianguiDefault: number) {
        this.addStar(enguangDefault, 'engguang', 'adjective');
        this.addStar(tianguiDefault, 'tiangui', 'adjective');
    }

    protected abstract applyTuHoa(): void;

    protected buildOutput(): TuViChartData {
        const currentYear = new Date().getFullYear();
        const targetYear = this.input.targetYear || currentYear;

        const dayCanChiStr = getCanChiDay(this.solarDateObj);
        const dayCan = dayCanChiStr.split(' ')[0] as any;
        const dayChi = dayCanChiStr.split(' ')[1] as any;
        const hourCanChiObj = getHourCanChi(dayCan, VI_CHI[this.timeIndex] as any);
        const hourCanChiStr = `${hourCanChiObj.can} ${hourCanChiObj.chi}`;
        
        const tigerStemStartRule = [2, 4, 6, 8, 0];
        const monthStemStart = tigerStemStartRule[this.yearStemIndex % 5];
        const monthStemIdx = fixIndex(monthStemStart + (this.vlunarMonth - 1), 10);
        const monthBranchIdx = fixIndex(this.vlunarMonth + 1);
        const monthStemBranch = `${VI_CAN[monthStemIdx]} ${VI_CHI[monthBranchIdx]}`;
        
        const soulBranch = VI_CHI[this.soulIndex];
        const soul = MENH_CHU_MAP[soulBranch] || '';
        const body = THAN_CHU_MAP[this.yearCanChi.chi] || '';
        const bodyPalace = this.palaces.find(p => p.isBodyPalace);
        const bodyPalaceName = bodyPalace?.name ?? '';

        const SAO_CHU_CUC_MAP: Record<string, string> = {
            'Thủy': 'Thiên Đồng', 'Mộc': 'Tham Lang', 'Kim': 'Vũ Khúc',
            'Thổ': 'Thiên Cơ', 'Hỏa': 'Liêm Trinh'
        };

        const isDuongYear = ['Giáp', 'Bính', 'Mậu', 'Canh', 'Nhâm'].includes(this.yearCanChi.can);
        const isMale = this.input.gender === 'male';
        const amDuongLy = (isMale === isDuongYear) ? 'Thuận lý' : 'Nghịch lý';

        const chartData: TuViChartData = {
            solarDate: this.input.solarDate,
            lunarDate: `${this.vlunarDay} tháng ${this.vlunarMonth} (Nhuận: ${this.visLeapMonth ? 'Có' : 'Không'})`,
            chineseDate: `${this.yearCanChiStr}, ${hourCanChiStr}`,
            time: this.hourChiName,
            timeRange: '', // Optional
            sign: 'N/A',
            zodiac: this.yearCanChi.chi,
            earthlyBranchOfSoulPalace: VI_CHI[this.soulIndex],
            earthlyBranchOfBodyPalace: VI_CHI[this.bodyIndex],
            soul,
            body,
            fiveElementsClass: `${this.cucElement} ${this.cucStr} Cục`,
            palaces: this.palaces as unknown as TuViPalace[],
            lunarDay: this.vlunarDay,
            lunarMonth: this.vlunarMonth,
            lunarYear: this.vlunarYear,
            cucElement: this.cucElement,
            cucNumber: this.cucStr,
            yearStemBranch: this.yearCanChiStr,
            monthStemBranch,
            dayStemBranch: dayCanChiStr,
            hourStemBranch: hourCanChiStr,
            bodyPalaceName,
            napAmYear: getNapAmForStemBranch(this.yearCanChiStr),
            solarTerm: getSolarTermForDate(this.input.solarDate),
            birthHourQuality: classifyBirthHour(dayChi, hourCanChiObj.chi),
            yinYangLabel: isDuongYear ? (isMale ? 'Dương Nam' : 'Dương Nữ') : (isMale ? 'Âm Nam' : 'Âm Nữ'),
            sihuaFlows: calculateSihuaFlows(this.palaces as unknown as TuViPalace[], 'toanThu'), // hook this later
            saoChucCuc: SAO_CHU_CUC_MAP[this.cucElement] || '',
            amDuongLy,
            cucMenhRelation: '', // Let's just mock or skip complex relation string for now, or copy paste it
            targetYearStemBranch: getCanChiYear(targetYear),
        };

        if (this.input.targetYear) {
            return applyTemporalOverlays(chartData, this.input.targetYear);
        }

        return chartData;
    }
}
