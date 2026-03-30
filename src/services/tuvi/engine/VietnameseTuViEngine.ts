import { BaseTuViEngine, VI_CHI } from './BaseTuViEngine';
import { getKuiYueIndex, fixIndex } from './starLocation';
import { getLunarDate } from '../../sharedCore';
import { getTuHoaTable } from '../tuHoaTables';

export class VietnameseTuViEngine extends BaseTuViEngine {
    
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
            
            // Vietnamese 15-day split rule for Leap Month
            if (phase1Lunar.isLeap) {
                if (phase1Lunar.day <= 15) {
                    this.vlunarMonth = phase1Lunar.month; // belongs to previous month numerically
                } else {
                    this.vlunarMonth = phase1Lunar.month + 1; // belongs to next month
                }
                this.visLeapMonth = true;
            } else {
                this.vlunarMonth = phase1Lunar.month;
                this.visLeapMonth = false;
            }
        }
    }

    protected calcKhoiViet(): void {
        // Vietnamese rule: "Giáp Mậu phân Ngưu Dương" (Giáp/Mậu -> Sửu/Mùi)
        // "Canh Tân phùng mã hổ" (Canh/Tân -> Ngọ/Dần)
        
        let kuiIndex = -1;
        let yueIndex = -1;
        switch (this.yearCanChi.can) {
            case 'Giáp': case 'Mậu':
                kuiIndex = VI_CHI.indexOf('Sửu');
                yueIndex = VI_CHI.indexOf('Mùi');
                break;
            case 'Ất': case 'Kỷ':
                kuiIndex = VI_CHI.indexOf('Tý');
                yueIndex = VI_CHI.indexOf('Thân');
                break;
            case 'Bính': case 'Đinh':
                kuiIndex = VI_CHI.indexOf('Hợi');
                yueIndex = VI_CHI.indexOf('Dậu');
                break;
            case 'Canh': case 'Tân':
                kuiIndex = VI_CHI.indexOf('Ngọ');
                yueIndex = VI_CHI.indexOf('Dần');
                break;
            case 'Nhâm': case 'Quý':
                kuiIndex = VI_CHI.indexOf('Mão');
                yueIndex = VI_CHI.indexOf('Tỵ');
                break;
        }
        
        if (kuiIndex !== -1 && yueIndex !== -1) {
            this.addStar(kuiIndex, 'tiankuiMin', 'soft');
            this.addStar(yueIndex, 'tianyueMin', 'soft');
        } else {
            // fallback
            const { kuiIndex: fbKui, yueIndex: fbYue } = getKuiYueIndex(this.yearStemIndex);
            this.addStar(fbKui, 'tiankuiMin', 'soft');
            this.addStar(fbYue, 'tianyueMin', 'soft');
        }
    }

    protected calcQuangQuy(enguangDefault: number, tianguiDefault: number): void {
        // Vietnamese rule: Quang Quy exact offset from Xuong Khuc
        // Ân Quang: Văn Xương + Day - 2
        // Thiên Quý: Văn Khúc - Day + 2 (which is equivalent to backstep Day - 2)
        const anQuangIndex = fixIndex(this.changIndex + this.vlunarDay - 2);
        const thienQuyIndex = fixIndex(this.quIndex - (this.vlunarDay - 2));

        this.addStar(anQuangIndex, 'engguang', 'adjective');
        this.addStar(thienQuyIndex, 'tiangui', 'adjective');
    }

    protected calcRings(): void {
        // Vietnamese Thái Tuế 12-star ring
        const THAI_TUE_LABELS = [
            'Thái Tuế', 'Thiếu Dương', 'Tang Môn', 'Thiếu Âm', 'Quan Phù', 'Tử Phù',
            'Tuế Phá', 'Long Đức', 'Bạch Hổ', 'Phúc Đức', 'Điếu Khách', 'Trực Phù'
        ];

        // Thái Tuế always sits at Year Branch
        const thaiTueIndex = this.yearBranchIndex;

        for (let i = 0; i < 12; i++) {
            const palaceIdx = fixIndex(thaiTueIndex + i);
            const label = THAI_TUE_LABELS[i];
            
            // Push as adjective to explicitly name them properly in Viet style
            // Note: Iztro native names like 'boshi12' or 'suijian12' normally handles this,
            // but for full explicit control, we inject them into adjectiveStars directly.
            // But we can also set boshi12/suijian12 on the palace for styling backwards compatibility
            this.palaces[palaceIdx].adjectiveStars.push({
                name: label,
                type: 'adjective',
                scope: 'origin',
                brightness: ''
            });
        }
        
        // Bác Sĩ 12 (12-star cycle starting from Lộc Tồn)
        const BOSHI_12_LABELS = [
            'Bác Sỹ', 'Lực Sỹ', 'Thanh Long', 'Tiểu Hao', 'Tướng Quân', 'Tấu Thư',
            'Phi Liêm', 'Hỷ Thần', 'Bệnh Phù', 'Đại Hao', 'Phục Binh', 'Quan Phủ'
        ];
        // Forward (Dương) or Backward (Âm) from Lộc Tồn
        for (let i = 0; i < 12; i++) {
            const palaceIdx = fixIndex(this.luIndex + (this.yinYangDir * i));
            const label = BOSHI_12_LABELS[i];
            // Also push into adjectiveStars so they render in the stars zone
            this.palaces[palaceIdx].adjectiveStars.push({
                name: label,
                type: 'adjective',
                scope: 'origin',
                brightness: ''
            });
        }
    }

    protected applyTuHoa(): void {
        const tuHoaTable = getTuHoaTable('toanThu');
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

    protected calcKinhDaIndices(): { qingyangIndex: number; tuoluoIndex: number } {
        // Thiên Lương school specific rule: direction depends on Yin Yang direction of the Destiny (yinYangDir)
        // Nam Dương / Nữ Âm -> Thuận (1) -> Kình = Lộc + 1, Đà = Lộc - 1
        // Nam Âm / Nữ Dương -> Nghịch (-1) -> Kình = Lộc - 1, Đà = Lộc + 1
        return {
            qingyangIndex: fixIndex(this.luIndex + this.yinYangDir),
            tuoluoIndex: fixIndex(this.luIndex - this.yinYangDir)
        };
    }
}
