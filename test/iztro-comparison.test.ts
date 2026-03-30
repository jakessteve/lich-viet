/**
 * iztro vs Native Engine — Head-to-Head Accuracy Comparison
 * Test case: 13-Nov-1983, 18:30, Male (HCMC)
 * Lunar: 9th day, 10th month, Quý Hợi year, Dậu hour
 */
import { describe, it, expect } from 'vitest';
import { astro } from 'iztro';
import { generateChart } from '../src/services/tuvi/tuviEngine';
import { computeBirthContext } from '../src/services/shared/birthContext';
import * as fs from 'fs';

const PALACE_NAME_MAP: Record<string, string> = {
    '命宫': 'Mệnh', '父母': 'Phụ Mẫu', '福德': 'Phúc Đức', '田宅': 'Điền Trạch',
    '官禄': 'Quan Lộc', '仆役': 'Nô Bộc', '迁移': 'Thiên Di', '疾厄': 'Tật Ách',
    '财帛': 'Tài Bạch', '子女': 'Tử Tức', '夫妻': 'Phu Thê', '兄弟': 'Huynh Đệ',
    // vi-VN locale
    'Mệnh': 'Mệnh', 'Phụ mẫu': 'Phụ Mẫu', 'Phúc đức': 'Phúc Đức', 'Điền trạch': 'Điền Trạch',
    'Quan lộc': 'Quan Lộc', 'Nô bộc': 'Nô Bộc', 'Thiên di': 'Thiên Di', 'Tật ách': 'Tật Ách',
    'Tài bạch': 'Tài Bạch', 'Tử tức': 'Tử Tức', 'Phu thê': 'Phu Thê', 'Huynh đệ': 'Huynh Đệ',
};

const STAR_MAP: Record<string, string> = {
    '紫微': 'Tử Vi', '天机': 'Thiên Cơ', '太阳': 'Thái Dương', '武曲': 'Vũ Khúc',
    '天同': 'Thiên Đồng', '廉贞': 'Liêm Trinh', '天府': 'Thiên Phủ', '太阴': 'Thái Âm',
    '贪狼': 'Tham Lang', '巨门': 'Cự Môn', '天相': 'Thiên Tướng', '天梁': 'Thiên Lương',
    '七杀': 'Thất Sát', '破军': 'Phá Quân',
    '左辅': 'Tả Phù', '右弼': 'Hữu Bật', '文昌': 'Văn Xương', '文曲': 'Văn Khúc',
    '禄存': 'Lộc Tồn', '天马': 'Thiên Mã', '擎羊': 'Kình Dương', '陀罗': 'Đà La',
    '火星': 'Hỏa Tinh', '铃星': 'Linh Tinh', '天魁': 'Thiên Khôi', '天钺': 'Thiên Việt',
    '地空': 'Địa Không', '地劫': 'Địa Kiếp',
};

const BRIGHTNESS_MAP: Record<string, string> = {
    '庙': 'M', '旺': 'V', '得': 'Đ', '利': 'H', '平': 'B', '不': '', '陷': 'h', '': ''
};

const BRANCH_MAP: Record<string, string> = {
    '子': 'Tý', '丑': 'Sửu', '寅': 'Dần', '卯': 'Mão', '辰': 'Thìn', '巳': 'Tỵ',
    '午': 'Ngọ', '未': 'Mùi', '申': 'Thân', '酉': 'Dậu', '戌': 'Tuất', '亥': 'Hợi'
};

describe('iztro vs Native Engine Accuracy', () => {
    it('compares both engines for 13-Nov-1983 18:30 Male', () => {
        // ── iztro chart ───────────────────────────────────────────
        const iztroChart = astro.bySolar('1983-11-13', 9, 'male', false, 'zh-CN');

        // ── Native chart ──────────────────────────────────────────
        const birthDate = new Date(1983, 10, 13, 18, 30, 0);
        const location   = { latitude: 10.762622, longitude: 106.660172, timezone: 7 };
        const birthContext = computeBirthContext(birthDate, location, -1);
        const nativeChart  = generateChart({
            dateType: 'solar',
            solarDate: '1983-11-13',
            timeIndex: 9,
            gender: 'male',
            name: 'test',
            birthContext,
            school: 'cn'
        });

        // ── Build lookup maps ─────────────────────────────────────
        // Native: keyed by earthlyBranch
        const nativeByBranch: Record<string, typeof nativeChart.palaces[0]> = {};
        nativeChart.palaces.forEach(p => { nativeByBranch[p.earthlyBranch] = p; });

        // iztro: keyed by branch Vietnamese name
        const iztroByBranch: Record<string, any> = {};
        iztroChart.palaces.forEach((p: any) => {
            const branchKey = BRANCH_MAP[p.earthlyBranch] || p.earthlyBranch;
            iztroByBranch[branchKey] = p;
        });

        const BRANCHES = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];

        let out = '=================================================\n';
        out += '  iztro vs Native Engine — Accuracy Comparison\n';
        out += '  Birth: 13-Nov-1983, 18:30, HCMC, Male\n';
        out += '=================================================\n\n';

        // Meta
        const iztroDecimalType = iztroChart.fiveElementsClass;
        out += `iztro  — Mệnh Cục: ${iztroDecimalType}\n`;
        out += `Native — Mệnh Cục: ${nativeChart.fiveElementsClass}\n`;
        out += `iztro  — Year: ${iztroChart.rawDates.chineseDate}\n`;
        out += `Native — Year: ${nativeChart.yearStemBranch}\n\n`;

        // Palace-by-palace comparison
        let matchCount = 0, totalChecks = 0;
        const mismatches: string[] = [];

        out += '── PALACE-LEVEL COMPARISON ────────────────────────\n';
        out += `${'Branch'.padEnd(6)} ${'iztro Palace'.padEnd(13)} ${'Native Palace'.padEnd(13)} ${'Match?'.padEnd(6)}\n`;
        out += '─'.repeat(50) + '\n';

        BRANCHES.forEach(branch => {
            const iP  = iztroByBranch[branch];
            const nP  = nativeByBranch[branch];
            if (!iP || !nP) return;

            const iPName = PALACE_NAME_MAP[iP.name] || iP.name;
            const nPName = nP.name;
            const palaceMatch = iPName === nPName;
            totalChecks++; if (palaceMatch) matchCount++;
            const palaceFlag = palaceMatch ? '✓' : '✗';
            out += `${branch.padEnd(6)} ${iPName.padEnd(13)} ${nPName.padEnd(13)} ${palaceFlag}\n`;
            if (!palaceMatch) mismatches.push(`Palace ${branch}: iztro="${iPName}" native="${nPName}"`);
        });

        out += '\n── MAJOR STAR PLACEMENT ───────────────────────────\n';
        out += `${'Branch'.padEnd(6)} ${'iztro Stars'.padEnd(35)} ${'Native Stars'.padEnd(35)} ${'Match?'.padEnd(6)}\n`;
        out += '─'.repeat(80) + '\n';

        BRANCHES.forEach(branch => {
            const iP = iztroByBranch[branch];
            const nP = nativeByBranch[branch];
            if (!iP || !nP) return;

            const iztroMajor = (iP.majorStars || [])
                .map((s: any) => {
                    const vn = STAR_MAP[s.name] || s.name;
                    const br = BRIGHTNESS_MAP[s.brightness] || s.brightness || '';
                    return `${vn}${br ? '('+br+')' : ''}`;
                }).sort().join(', ');

            const nativeMajor = nP.majorStars
                .map(s => `${s.name}${s.brightness ? '('+s.brightness+')' : ''}`).sort().join(', ');

            const nameOnly_i = (iP.majorStars || []).map((s: any) => STAR_MAP[s.name] || s.name).sort().join(',');
            const nameOnly_n = nP.majorStars.map(s => s.name).sort().join(',');
            const starMatch = nameOnly_i === nameOnly_n;
            totalChecks++; if (starMatch) matchCount++;
            out += `${branch.padEnd(6)} ${iztroMajor.padEnd(35)} ${nativeMajor.padEnd(35)} ${starMatch ? '✓' : '✗'}\n`;
            if (!starMatch) mismatches.push(`Stars at ${branch}: iztro="${nameOnly_i}" native="${nameOnly_n}"`);
        });

        out += '\n── DECADAL RANGE COMPARISON ───────────────────────\n';
        out += `${'Branch'.padEnd(6)} ${'iztro Range'.padEnd(15)} ${'Native Range'.padEnd(15)} ${'Match?'.padEnd(6)}\n`;
        out += '─'.repeat(45) + '\n';

        BRANCHES.forEach(branch => {
            const iP = iztroByBranch[branch];
            const nP = nativeByBranch[branch];
            if (!iP || !nP) return;
            const iRange = iP.decadal?.range ? `${iP.decadal.range[0]}-${iP.decadal.range[1]}` : '--';
            const nRange = nP.stage?.range ? `${nP.stage.range[0]}-${nP.stage.range[1]}` : '--';
            const rangeMatch = iRange === nRange;
            totalChecks++; if (rangeMatch) matchCount++;
            out += `${branch.padEnd(6)} ${iRange.padEnd(15)} ${nRange.padEnd(15)} ${rangeMatch ? '✓' : '✗'}\n`;
            if (!rangeMatch) mismatches.push(`Decadal ${branch}: iztro="${iRange}" native="${nRange}"`);
        });

        // Summary
        const pct = ((matchCount / totalChecks) * 100).toFixed(1);
        out += '\n═════════════════════════════════════════\n';
        out += `ACCURACY SCORE: ${matchCount}/${totalChecks} checks = ${pct}%\n`;
        out += '═════════════════════════════════════════\n';
        if (mismatches.length > 0) {
            out += '\n── MISMATCHES ─────────────────────────────────────\n';
            mismatches.forEach(m => { out += `  ✗ ${m}\n`; });
        } else {
            out += '\n✓ ALL CHECKS PASS — 100% Match with iztro!\n';
        }

        fs.writeFileSync('./test-iztro-comparison.txt', out);
        console.log(out);
        expect(1).toBe(1); // always passes — this is an informational test
    });
});
