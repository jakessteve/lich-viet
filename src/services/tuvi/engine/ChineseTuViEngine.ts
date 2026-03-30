import { BaseTuViEngine, VI_CHI } from './BaseTuViEngine';
import { getKuiYueIndex, fixIndex } from './starLocation';
import { getLunarDate } from '../../sharedCore';
import { getTuHoaTable } from '../tuHoaTables';
import { TuViPalace } from '../tuviTypes';
import { calculateSihuaFlows } from '../sihuaEngine';

export class ChineseTuViEngine extends BaseTuViEngine {
    
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
            
            // Chinese standard rule for Leap Month: often taking it entirely as the leap month, 
            // or shifting it entirely to next month. Here we just use the raw month value.
            this.vlunarMonth = phase1Lunar.month;
            this.visLeapMonth = phase1Lunar.isLeap;
        }
    }

    protected calcKhoiViet(): void {
        // Standard Chinese rule (often relies on different poems, we use iztro's port: getKuiYueIndex)
        // Canh -> Sửu, Mùi or Tân -> Ngọ, Dần (actually standard Chinese has subtle differences)
        // Iztro port is exactly getKuiYueIndex
        const { kuiIndex, yueIndex } = getKuiYueIndex(this.yearStemIndex);
        this.addStar(kuiIndex, 'tiankuiMin', 'soft');
        this.addStar(yueIndex, 'tianyueMin', 'soft');
    }

    protected calcRings(): void {
        // Chinese "Thái Tuế" ring actually uses 'SuiJian12' names, 
        // e.g., Tướng Tinh, Hoa Cái, Hàm Trì.
        // Iztro handles these natively, but we will mock the generic Chinese names here if needed.
        const SUIJIAN_12_LABELS = [
            'Thái Tuế', 'Hối Khí', 'Tang Môn', 'Quán Sách', 'Quan Phù', 'Tiểu Hao',
            'Tuế Phá', 'Long Đức', 'Bạch Hổ', 'Thiên Đức', 'Điếu Khách', 'Bệnh Phù'
        ];
        
        const thaiTueIndex = this.yearBranchIndex;
        for (let i = 0; i < 12; i++) {
            const palaceIdx = fixIndex(thaiTueIndex + i);
            const label = SUIJIAN_12_LABELS[i];
            this.palaces[palaceIdx].adjectiveStars.push({
                name: label,
                type: 'adjective',
                scope: 'origin',
                brightness: ''
            });
        }
        
        // Bác Sĩ 12 
        const BOSHI_12_LABELS = [
            'Bác Sỹ', 'Lực Sỹ', 'Thanh Long', 'Tiểu Hao', 'Tướng Quân', 'Tấu Thư',
            'Phi Liêm', 'Hỷ Thần', 'Bệnh Phù', 'Đại Hao', 'Phục Binh', 'Quan Phủ'
        ];
        for (let i = 0; i < 12; i++) {
            const palaceIdx = fixIndex(this.luIndex + (this.yinYangDir * i));
            const label = BOSHI_12_LABELS[i];
            // Set boshi12 as quick footer label
            this.palaces[palaceIdx].boshi12 = label;
            // Push into adjectiveStars so they render in the stars zone
            this.palaces[palaceIdx].adjectiveStars.push({
                name: label,
                type: 'adjective',
                scope: 'origin',
                brightness: ''
            });
        }
    }

    protected applyTuHoa(): void {
        const tuHoaTable = getTuHoaTable('trungChau');
        const yearMapping = tuHoaTable[this.yearCanChi.can];
        
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
        (data as any).sihuaFlows = calculateSihuaFlows(this.palaces as unknown as TuViPalace[], 'trungChau');
        return data;
    }
}
