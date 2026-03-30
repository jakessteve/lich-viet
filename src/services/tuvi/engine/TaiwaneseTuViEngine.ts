import { BaseTuViEngine, VI_CHI } from './BaseTuViEngine';
import { getKuiYueIndex, fixIndex } from './starLocation';
import { getLunarDate } from '../../sharedCore';
import { getTuHoaTable } from '../tuHoaTables';
import { TuViPalace } from '../tuviTypes';
import { calculateSihuaFlows } from '../sihuaEngine';

export class TaiwaneseTuViEngine extends BaseTuViEngine {
    
    protected resolveLeapMonth(): void {
        const parts = this.input.solarDate.split('-').map(Number);
        const solarDateObj = new Date(parts[0], parts[1] - 1, parts[2]);

        if (this.input.dateType === 'lunar' && this.input.lunarDay && this.input.lunarMonth && this.input.lunarYear) {
            this.vlunarDay = this.input.lunarDay;
            this.vlunarMonth = this.input.lunarMonth;
            this.vlunarYear = this.input.lunarYear;
            this.visLeapMonth = this.input.isLeapMonth ?? false;
        } else {
            const phase1Lunar = getLunarDate(solarDateObj);
            this.vlunarDay = phase1Lunar.day;
            this.vlunarYear = phase1Lunar.year;
            this.vlunarMonth = phase1Lunar.month;
            this.visLeapMonth = phase1Lunar.isLeap;
        }
    }

    protected calcKhoiViet(): void {
        const { kuiIndex, yueIndex } = getKuiYueIndex(this.yearStemIndex);
        this.addStar(kuiIndex, 'tiankuiMin', 'soft');
        this.addStar(yueIndex, 'tianyueMin', 'soft');
    }

    protected calcRings(): void {
        const THAI_TUE_LABELS = [
            'Thái Tuế', 'Thiếu Dương', 'Tang Môn', 'Thiếu Âm', 'Quan Phù', 'Tử Phù',
            'Tuế Phá', 'Long Đức', 'Bạch Hổ', 'Phúc Đức', 'Điếu Khách', 'Trực Phù'
        ];

        const thaiTueIndex = this.yearBranchIndex;

        for (let i = 0; i < 12; i++) {
            const palaceIdx = fixIndex(thaiTueIndex + i);
            const label = THAI_TUE_LABELS[i];
            
            this.palaces[palaceIdx].adjectiveStars.push({
                name: label,
                type: 'adjective',
                scope: 'origin',
                brightness: ''
            });
        }
        
        const BOSHI_12_LABELS = [
            'Bác Sỹ', 'Lực Sỹ', 'Thanh Long', 'Tiểu Hao', 'Tướng Quân', 'Tấu Thư',
            'Phi Liêm', 'Hỷ Thần', 'Bệnh Phù', 'Đại Hao', 'Phục Binh', 'Quan Phủ'
        ];
        for (let i = 0; i < 12; i++) {
            const palaceIdx = fixIndex(this.luIndex + (this.yinYangDir * i));
            const label = BOSHI_12_LABELS[i];
            this.palaces[palaceIdx].adjectiveStars.push({
                name: label,
                type: 'adjective',
                scope: 'origin',
                brightness: ''
            });
        }
    }

    protected applyTuHoa(): void {
        const tuHoaTable = getTuHoaTable('phiTinh'); // 'phiTinh' table must be defined in tuHoaTables
        const yearMapping = tuHoaTable[this.yearCanChi.can] || getTuHoaTable('trungChau')[this.yearCanChi.can]; // fallback
        
        if (yearMapping) {
            const mutagenPairs = [
                { starName: yearMapping.loc, label: 'Lộc' },
                { starName: yearMapping.quyen, label: 'Quyền' },
                { starName: yearMapping.khoa, label: 'Khoa' },
                { starName: yearMapping.ky, label: 'Kỵ' },
            ];

            for (const { starName, label } of mutagenPairs) {
                for (const palace of this.palaces) {
                    const allStars = [...palace.majorStars, ...palace.minorStars, ...palace.adjectiveStars];
                    const found = allStars.find(s => s.name === starName);
                    if (found) {
                        (found as any).mutagen = [...(found.mutagen || []), label];
                        break;
                    }
                }
            }
        }
    }

    protected override buildOutput() {
        const data = super.buildOutput();
        (data as any).sihuaFlows = calculateSihuaFlows(this.palaces as unknown as TuViPalace[], 'phiTinh');
        return data;
    }
}
