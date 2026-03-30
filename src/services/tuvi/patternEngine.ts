import type { TuViChartData, TuViPalace, DetectedPattern } from './tuviTypes';
import patternsData from '../../data/tuvi_patterns.json';

const RAW_PATTERNS = patternsData.patterns;

const MALEFIC_STARS = new Set([
    'Kình Dương', 'Đà La', 'Hỏa Tinh', 'Linh Tinh',
    'Địa Không', 'Địa Kiếp',
]);

// Shared branch order constant (used by flanking/giáp pattern checks)
const BRANCH_ORDER: Branch[] = [
    'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ',
    'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi',
];



type Branch = string;

// Opposite branches (Xung Chiếu)
const OPPOSITES: Record<Branch, Branch> = {
    'Tý': 'Ngọ', 'Ngọ': 'Tý',
    'Sửu': 'Mùi', 'Mùi': 'Sửu',
    'Dần': 'Thân', 'Thân': 'Dần',
    'Mão': 'Dậu', 'Dậu': 'Mão',
    'Thìn': 'Tuất', 'Tuất': 'Thìn',
    'Tỵ': 'Hợi', 'Hợi': 'Tỵ'
};

// Trines (Tam Hợp)
const TRINES: Array<Branch[]> = [
    ['Thân', 'Tý', 'Thìn'],
    ['Tỵ', 'Dậu', 'Sửu'],
    ['Dần', 'Ngọ', 'Tuất'],
    ['Hợi', 'Mão', 'Mùi']
];

function getTamHop(branch: Branch): Branch[] {
    const trine = TRINES.find(t => t.includes(branch));
    if (!trine) return [];
    return trine.filter(b => b !== branch);
}

function getSanFangSiZheng(branch: Branch): Branch[] {
    const tamHop = getTamHop(branch);
    const xungChieu = OPPOSITES[branch];
    return [...tamHop, xungChieu].filter(Boolean);
}

function hasStar(palace: TuViPalace | undefined, starName: string): boolean {
    if (!palace) return false;
    const inMajor = palace.majorStars.some(s => s.name === starName);
    const inMinor = palace.minorStars?.some(s => s.name === starName) ?? false;
    const inAdjective = palace.adjectiveStars?.some(s => s.name === starName) ?? false;
    return inMajor || inMinor || inAdjective;
}

/** Fast hasStar using pre-built star name Sets. */
function hasStarFast(palace: TuViPalace | undefined, starName: string, starSets: Map<string, Set<string>>): boolean {
    if (!palace) return false;
    const set = starSets.get(palace.earthlyBranch);
    return set ? set.has(starName) : hasStar(palace, starName);
}

/** Check if a star has a specific mutagen (supports BOTH Chinese and Vietnamese keys). */
function starHasMutagen(star: { mutagen?: string[] }, key: '禄' | '权' | '科' | '忌'): boolean {
    if (!star.mutagen) return false;
    const VI_MAP: Record<string, string> = { '禄': 'Lộc', '权': 'Quyền', '科': 'Khoa', '忌': 'Kỵ' };
    return star.mutagen.includes(key) || star.mutagen.includes(VI_MAP[key]);
}

/** Collect all stars from a palace into a single array. */
function allStarsOf(palace: TuViPalace): Array<{ name: string; mutagen?: string[] }> {
    return [...palace.majorStars, ...(palace.minorStars ?? []), ...(palace.adjectiveStars ?? [])];
}

/** Check if any star in a palace carries a given mutagen. */
function palaceHasMutagen(palace: TuViPalace | undefined, key: '禄' | '权' | '科' | '忌'): boolean {
    if (!palace) return false;
    return allStarsOf(palace).some(s => starHasMutagen(s, key));
}

export function hasAnyMalefic(palace: TuViPalace | undefined): boolean {
    if (!palace) return false;
    const hasNamedMalefic = [...MALEFIC_STARS].some(ms => hasStar(palace, ms));
    const hasHoaKy = palaceHasMutagen(palace, '忌');
    return hasNamedMalefic || hasHoaKy;
}

/** Fast hasAnyMalefic using pre-built star Sets. */
function hasAnyMaleficFast(palace: TuViPalace | undefined, starSets: Map<string, Set<string>>): boolean {
    if (!palace) return false;
    const set = starSets.get(palace.earthlyBranch);
    const hasNamedMalefic = set
        ? [...MALEFIC_STARS].some(ms => set.has(ms))
        : [...MALEFIC_STARS].some(ms => hasStar(palace, ms));
    const hasHoaKy = palaceHasMutagen(palace, '忌');
    return hasNamedMalefic || hasHoaKy;
}

function hasMaleficFast(palaces: (TuViPalace | undefined)[], starSets: Map<string, Set<string>>): boolean {
    return palaces.some(p => hasAnyMaleficFast(p, starSets));
}



function getPalaceByNamePrefix(chart: TuViChartData, prefix: string): TuViPalace | undefined {
    return chart.palaces.find(p => p.name.includes(prefix));
}

export function detectPatterns(chart: TuViChartData): DetectedPattern[] {
    const detected: DetectedPattern[] = [];

    // ── Pre-build O(1) lookup structures ──────────────────────
    // Branch → Palace map (replaces ~50 linear .find() calls)
    const branchMap = new Map<string, TuViPalace>();
    // Branch → Set of all star names in that palace (replaces ~200 hasStar linear scans)
    const starSets = new Map<string, Set<string>>();
    for (const p of chart.palaces) {
        branchMap.set(p.earthlyBranch, p);
        const names = new Set<string>();
        for (const s of p.majorStars) names.add(s.name);
        if (p.minorStars) for (const s of p.minorStars) names.add(s.name);
        if (p.adjectiveStars) for (const s of p.adjectiveStars) names.add(s.name);
        starSets.set(p.earthlyBranch, names);
    }
    const bp = (branch: string) => branchMap.get(branch);
    const hs = (palace: TuViPalace | undefined, star: string) => hasStarFast(palace, star, starSets);

    const menhPalace = getPalaceByNamePrefix(chart, 'Mệnh');

    if (!menhPalace) return detected;

    const menhBranch = menhPalace.earthlyBranch;
    const sanFangBranches = getSanFangSiZheng(menhBranch);
    const sanFangPalaces = sanFangBranches.map(b => bp(b));
    const allRelevantPalaces = [menhPalace, ...sanFangPalaces];

    // Helper to construct response
    const addPattern = (id: string, isPure: boolean, relatedBranches: Branch[]) => {
        const raw = RAW_PATTERNS.find(p => p.id === id);
        if (!raw) return;
        const relatedPalaces = relatedBranches
            .map(b => bp(b)?.name || b)
            .filter((v, i, a) => a.indexOf(v) === i); // dedupe

        detected.push({
            id: raw.id,
            category: raw.category,
            name: raw.name,
            description: raw.description,
            isPure,
            relatedPalaces
        });
    };

    // 1. SÁT PHÁ LANG
    const hasSatPhaLangInMenh = ['Thất Sát', 'Phá Quân', 'Tham Lang'].some(s => hs(menhPalace, s));
    if (hasSatPhaLangInMenh) {
        const isPure = !hasMaleficFast(allRelevantPalaces, starSets);
        addPattern('SAT_PHA_LANG', isPure, [menhBranch, ...getTamHop(menhBranch)]);
    }

    // 2. CƠ NGUYỆT ĐỒNG LƯƠNG
    const coNguyetStars = ['Thiên Cơ', 'Thái Âm', 'Thiên Đồng', 'Thiên Lương'];
    let hasAllCoNguyet = true;
    for (const s of coNguyetStars) {
        if (!allRelevantPalaces.some(p => hs(p, s))) {
            hasAllCoNguyet = false;
            break;
        }
    }
    const menhHasCoNguyet = coNguyetStars.some(s => hs(menhPalace, s));
    if (hasAllCoNguyet && menhHasCoNguyet) {
        const isPure = !hasMaleficFast(allRelevantPalaces, starSets);
        addPattern('CO_NGUYET_DONG_LUONG', isPure, [menhBranch, ...sanFangBranches]);
    }

    // 3. CỰ NHẬT ĐỒNG CUNG
    if (hs(menhPalace, 'Cự Môn') && hs(menhPalace, 'Thái Dương')) {
        if (menhBranch === 'Dần' || menhBranch === 'Thân') {
            const isPure = !hasAnyMaleficFast(menhPalace, starSets);
            addPattern('CU_NHAT_DONG_CUNG', isPure, [menhBranch]);
        }
    }

    // 4. TỬ PHỦ ĐỒNG CUNG
    if (hs(menhPalace, 'Tử Vi') && hs(menhPalace, 'Thiên Phủ')) {
        if (menhBranch === 'Dần' || menhBranch === 'Thân') {
            const isPure = !hasAnyMaleficFast(menhPalace, starSets);
            addPattern('TU_PHU_DONG_CUNG', isPure, [menhBranch]);
        }
    }

    // 5. TỬ PHỦ TRIỀU VIÊN
    if (!hs(menhPalace, 'Tử Vi') && !hs(menhPalace, 'Thiên Phủ')) {
        const tuViInSanFang = sanFangPalaces.some(p => hs(p, 'Tử Vi'));
        const thienPhuInSanFang = sanFangPalaces.some(p => hs(p, 'Thiên Phủ'));
        if (tuViInSanFang && thienPhuInSanFang) {
            const isPure = !hasMaleficFast(allRelevantPalaces, starSets);
            addPattern('TU_PHU_TRIEU_VIEN', isPure, [menhBranch, ...sanFangBranches]);
        }
    }

    // 6. QUÂN THẦN KHÁNH HỘI
    if (hs(menhPalace, 'Tử Vi')) {
        const quanThan = ['Tả Phụ', 'Hữu Bật', 'Văn Xương', 'Văn Khúc'];
        const hasAll = quanThan.every(s => allRelevantPalaces.some(p => hs(p, s)));
        if (hasAll) {
            const isPure = !hasMaleficFast(allRelevantPalaces, starSets);
            addPattern('QUAN_THAN_KHANH_HOI', isPure, [menhBranch, ...sanFangBranches]);
        }
    }

    // 7. PHỦ TƯỚNG TRIỀU VIÊN
    if (!hs(menhPalace, 'Thiên Phủ') && !hs(menhPalace, 'Thiên Tướng')) {
        const phuInSanFang = sanFangPalaces.some(p => hs(p, 'Thiên Phủ'));
        const tuongInSanFang = sanFangPalaces.some(p => hs(p, 'Thiên Tướng'));
        if (phuInSanFang && tuongInSanFang) {
            const isPure = !hasMaleficFast(allRelevantPalaces, starSets);
            addPattern('PHU_TUONG_TRIEU_VIEN', isPure, [menhBranch, ...sanFangBranches]);
        }
    }

    // 8. THẠCH TRUNG ẨN NGỌC
    if (hs(menhPalace, 'Cự Môn') && (menhBranch === 'Tý' || menhBranch === 'Ngọ')) {
        const isPure = !hasAnyMaleficFast(menhPalace, starSets);
        addPattern('THACH_TRUNG_AN_NGOC', isPure, [menhBranch]);
    }

    // 9. LỘC MÃ GIAO TRÌ (Fixed: check ALL palaces, not just Mệnh)
    for (const palace of chart.palaces) {
        const pBranch = palace.earthlyBranch;
        const pHasMa = hs(palace, 'Thiên Mã');
        const pHasLocTon = hs(palace, 'Lộc Tồn');
        const pHasHoaLoc = palaceHasMutagen(palace, '禄');
        if (pHasMa && (pHasLocTon || pHasHoaLoc)) {
            const isPure = !hasAnyMaleficFast(palace, starSets);
            addPattern('LOC_MA_GIAO_TRI', isPure, [pBranch]);
            break;
        }
    }

    // 10. THAM VŨ ĐỒNG HÀNH
    if (hs(menhPalace, 'Tham Lang') && hs(menhPalace, 'Vũ Khúc')) {
        if (['Thìn', 'Tuất', 'Sửu', 'Mùi'].includes(menhBranch)) {
            const isPure = !hasAnyMaleficFast(menhPalace, starSets);
            addPattern('THAM_VU_DONG_HANH', isPure, [menhBranch]);
        }
    }

    // ═══════════════════════════════════════════════════════════
    // 11–23: New Cát Cách Patterns
    // ═══════════════════════════════════════════════════════════

    // 11. CỰC HƯỚNG LY MINH — Tử Vi in Ngọ
    if (hs(menhPalace, 'Tử Vi') && menhBranch === 'Ngọ') {
        const isPure = !hasAnyMaleficFast(menhPalace, starSets);
        addPattern('CUC_HUONG_LY_MINH', isPure, [menhBranch]);
    }

    // 12. SONG LỘC TRIỀU VIÊN — Lộc Tồn + Hóa Lộc in Mệnh or San Fang
    {
        const hasLocTon = allRelevantPalaces.some(p => hs(p, 'Lộc Tồn'));
        const hasHoaLoc = allRelevantPalaces.some(p => palaceHasMutagen(p, '禄'));
        if (hasLocTon && hasHoaLoc) {
            const isPure = !hasMaleficFast(allRelevantPalaces, starSets);
            addPattern('SONG_LOC_TRIEU_VIEN', isPure, [menhBranch, ...sanFangBranches]);
        }
    }

    // 13. QUYỀN LỘC TUẦN PHÙNG — Hóa Quyền + Hóa Lộc in Mệnh San Fang
    {
        const hasHoaQuyen = allRelevantPalaces.some(p => palaceHasMutagen(p, '权'));
        const hasHoaLoc = allRelevantPalaces.some(p => palaceHasMutagen(p, '禄'));
        if (hasHoaQuyen && hasHoaLoc) {
            const isPure = !hasMaleficFast(allRelevantPalaces, starSets);
            addPattern('QUYEN_LOC_TUAN_PHUNG', isPure, [menhBranch, ...sanFangBranches]);
        }
    }

    // 14. TAM KỲ GIA HỘI — Hóa Khoa + Hóa Quyền + Hóa Lộc in San Fang
    {
        const hasM = (key: '禄' | '权' | '科' | '忌') => allRelevantPalaces.some(p => palaceHasMutagen(p, key));
        if (hasM('禄') && hasM('权') && hasM('科')) {
            const isPure = !hasMaleficFast(allRelevantPalaces, starSets);
            addPattern('TAM_KY_GIA_HOI', isPure, [menhBranch, ...sanFangBranches]);
        }
    }

    // 15. NHẬT CHIẾU LÔI MÔN — Thái Dương in Mão
    if (hs(menhPalace, 'Thái Dương') && menhBranch === 'Mão') {
        const isPure = !hasAnyMaleficFast(menhPalace, starSets);
        addPattern('NHAT_CHIEU_LOI_MON', isPure, [menhBranch]);
    }

    // 16. NGUYỆT LÃNG THIÊN MÔN — Thái Âm in Hợi
    if (hs(menhPalace, 'Thái Âm') && menhBranch === 'Hợi') {
        const isPure = !hasAnyMaleficFast(menhPalace, starSets);
        addPattern('NGUYET_LANG_THIEN_MON', isPure, [menhBranch]);
    }

    // 17. MINH CHÂU XUẤT HẢI — Mệnh in Sửu or Mùi (empty major), Sun+Moon at bright positions
    //   Mùi case: Thái Dương at Mão, Thái Âm at Hợi
    //   Sửu case: Thái Dương at Tỵ, Thái Âm at Dậu
    if (menhPalace.majorStars.length === 0) {
        if (menhBranch === 'Mùi') {
            const mao = bp('Mão');
            const hoi = bp('Hợi');
            if (hs(mao, 'Thái Dương') && hs(hoi, 'Thái Âm')) {
                const isPure = !hasMaleficFast([menhPalace, mao, hoi], starSets);
                addPattern('MINH_CHAU_XUAT_HAI', isPure, ['Mùi', 'Mão', 'Hợi']);
            }
        } else if (menhBranch === 'Sửu') {
            const ty = bp('Tỵ');
            const dau = bp('Dậu');
            if (hs(ty, 'Thái Dương') && hs(dau, 'Thái Âm')) {
                const isPure = !hasMaleficFast([menhPalace, ty, dau], starSets);
                addPattern('MINH_CHAU_XUAT_HAI', isPure, ['Sửu', 'Tỵ', 'Dậu']);
            }
        }
    }

    // 18. DƯƠNG LƯƠNG XƯƠNG LỘC — Thái Dương, Thiên Lương, Văn Xương, Lộc Tồn in San Fang
    {
        const dlxlStars = ['Thái Dương', 'Thiên Lương', 'Văn Xương', 'Lộc Tồn'];
        const hasAllDLXL = dlxlStars.every(s => allRelevantPalaces.some(p => hs(p, s)));
        if (hasAllDLXL) {
            const isPure = !hasMaleficFast(allRelevantPalaces, starSets);
            addPattern('DUONG_LUONG_XUONG_LOC', isPure, [menhBranch, ...sanFangBranches]);
        }
    }

    // 19. VĂN QUẾ VĂN HOA — Văn Xương + Văn Khúc in Sửu/Mùi
    {
        const suuPalace = bp('Sửu');
        const muiPalace = bp('Mùi');
        const inSuu = hs(suuPalace, 'Văn Xương') && hs(suuPalace, 'Văn Khúc');
        const inMui = hs(muiPalace, 'Văn Xương') && hs(muiPalace, 'Văn Khúc');
        if (inSuu || inMui) {
            const targetBranch = inSuu ? 'Sửu' : 'Mùi';
            const targetPalace = inSuu ? suuPalace : muiPalace;
            const isPure = !hasAnyMaleficFast(targetPalace, starSets);
            addPattern('VAN_QUE_VAN_HOA', isPure, [targetBranch]);
        }
    }

    // 20. THAM HỎA TƯƠNG PHÙNG — Tham Lang + Hỏa Tinh or Linh Tinh
    {
        const hasInAny = (starA: string, starB: string) =>
            allRelevantPalaces.some(p => hs(p, starA) && hs(p, starB));
        if (hasInAny('Tham Lang', 'Hỏa Tinh') || hasInAny('Tham Lang', 'Linh Tinh')) {
            const isPure = !hasMaleficFast(allRelevantPalaces, starSets);
            addPattern('THAM_HOA_TUONG_PHUNG', isPure, [menhBranch, ...sanFangBranches]);
        }
    }

    // 21. THẤT SÁT TRIỀU ĐẨU — Thất Sát in Tý/Ngọ/Dần/Thân at Mệnh
    if (hs(menhPalace, 'Thất Sát') && ['Tý', 'Ngọ', 'Dần', 'Thân'].includes(menhBranch)) {
        const isPure = !hasAnyMaleficFast(menhPalace, starSets);
        addPattern('THAT_SAT_TRIEU_DAU', isPure, [menhBranch]);
    }

    // 22. MÃ ĐẦU ĐỚI TIỄN — Kình Dương at Ngọ
    {
        const ngoPalace = bp('Ngọ');
        if (hs(ngoPalace, 'Kình Dương')) {
            const hasThamOrDong = hs(ngoPalace, 'Tham Lang')
                || (hs(ngoPalace, 'Thiên Đồng') && hs(ngoPalace, 'Thái Âm'));
            if (hasThamOrDong) {
                addPattern('MA_DAU_DOI_TIEN', true, ['Ngọ']);
            }
        }
    }

    // 23. QUYỀN SÁT HÓA LỘC — Sát stars + Thất Sát + Hóa Lộc + Hóa Quyền
    if (hs(menhPalace, 'Thất Sát')) {
        const satNames = ['Kình Dương', 'Đà La', 'Hỏa Tinh', 'Linh Tinh'];
        const hasSatStar = satNames.some(s => allRelevantPalaces.some(p => hs(p, s)));
        const hasHoaLocRP = allRelevantPalaces.some(p => palaceHasMutagen(p, '禄'));
        const hasHoaQuyenRP = allRelevantPalaces.some(p => palaceHasMutagen(p, '权'));
        if (hasSatStar && hasHoaLocRP && hasHoaQuyenRP) {
            addPattern('QUYEN_SAT_HOA_LOC', false, [menhBranch, ...sanFangBranches]);
        }
    }

    // ═══════════════════════════════════════════════════════════
    // 24–28: Hung Cách (Inauspicious) Patterns
    // ═══════════════════════════════════════════════════════════

    // 24. LỤC SÁT XÂM CUNG — 3+ malefic pairs in Mệnh zone
    {
        const maleficPairs = [
            ['Kình Dương', 'Đà La'],
            ['Hỏa Tinh', 'Linh Tinh'],
            ['Địa Không', 'Địa Kiếp'],
        ];
        let pairCount = 0;
        for (const [a, b] of maleficPairs) {
            const hasA = allRelevantPalaces.some(p => hs(p, a));
            const hasB = allRelevantPalaces.some(p => hs(p, b));
            if (hasA || hasB) pairCount++;
        }
        if (pairCount >= 3) {
            addPattern('LUC_SAT_XAM_CUNG', false, [menhBranch, ...sanFangBranches]);
        }
    }

    // 25. HÌNH KỴ GIÁP MỆNH — Thiên Hình and Hóa Kỵ flanking Mệnh
    {
        const idx = BRANCH_ORDER.indexOf(menhBranch);
        if (idx !== -1) {
            const prevBranch = BRANCH_ORDER[(idx - 1 + 12) % 12];
            const nextBranch = BRANCH_ORDER[(idx + 1) % 12];
            const prevPalace = bp(prevBranch);
            const nextPalace = bp(nextBranch);

            const hinhInPrev = hs(prevPalace, 'Thiên Hình');
            const hinhInNext = hs(nextPalace, 'Thiên Hình');
            const kyInPrev = palaceHasMutagen(prevPalace, '忌');
            const kyInNext = palaceHasMutagen(nextPalace, '忌');

            if ((hinhInPrev && kyInNext) || (hinhInNext && kyInPrev)) {
                addPattern('HINH_KY_GIAP_MENH', false, [prevBranch, menhBranch, nextBranch]);
            }
        }
    }

    // 26. LỘC PHÙNG XUNG PHÁ — Lộc Tồn/Hóa Lộc opposed by malefic stars
    {
        const hasLocInMenh = hs(menhPalace, 'Lộc Tồn')
            || palaceHasMutagen(menhPalace, '禄');
        if (hasLocInMenh) {
            const xungBranch = OPPOSITES[menhBranch];
            const xungPalace = bp(xungBranch);
            if (hasAnyMaleficFast(xungPalace, starSets)) {
                addPattern('LOC_PHUNG_XUNG_PHA', false, [menhBranch, xungBranch]);
            }
        }
    }

    // 27. MỆNH VÔ CHÍNH DIỆU HÃM — Empty Mệnh with only malefic stars
    if (menhPalace.majorStars.length === 0 && hasAnyMaleficFast(menhPalace, starSets)) {
        addPattern('MENH_VO_CHINH_DIEU_HAM', false, [menhBranch]);
    }

    // 28. NHẬT NGUYỆT PHẢN BỐI — Thái Dương in Hãm or Thái Âm in Hãm palaces
    {
        const sunHamBranches = ['Tuất', 'Hợi', 'Tý']; // Thái Dương in these = Hãm
        const moonHamBranches = ['Mão', 'Thìn', 'Tỵ', 'Ngọ']; // Thái Âm in these = Hãm
        let found = false;
        for (const p of chart.palaces) {
            if (hs(p, 'Thái Dương') && sunHamBranches.includes(p.earthlyBranch)) {
                if (p.earthlyBranch === menhBranch || sanFangBranches.includes(p.earthlyBranch)) {
                    found = true; break;
                }
            }
            if (hs(p, 'Thái Âm') && moonHamBranches.includes(p.earthlyBranch)) {
                if (p.earthlyBranch === menhBranch || sanFangBranches.includes(p.earthlyBranch)) {
                    found = true; break;
                }
            }
        }
        if (found) {
            addPattern('NHAT_NGUYET_PHAN_BOI', false, [menhBranch, ...sanFangBranches]);
        }
    }

    // 29. TỬ THAM ĐỒNG CUNG
    if (hs(menhPalace, 'Tử Vi') && hs(menhPalace, 'Tham Lang')) {
        if (menhBranch === 'Mão' || menhBranch === 'Dậu') {
            const isPure = !hasAnyMaleficFast(menhPalace, starSets);
            addPattern('TU_THAM_DONG_CUNG', isPure, [menhBranch]);
        }
    }

    // 30. CƠ CỰ ĐỒNG LÂM
    if (hs(menhPalace, 'Thiên Cơ') && hs(menhPalace, 'Cự Môn')) {
        if (menhBranch === 'Mão' || menhBranch === 'Dậu') {
            const isPure = !hasAnyMaleficFast(menhPalace, starSets);
            addPattern('CO_CU_DONG_LAM', isPure, [menhBranch]);
        }
    }

    // 31. LINH XƯƠNG ĐÀ VŨ
    {
        const h1 = allRelevantPalaces.some(p => hs(p, 'Linh Tinh'));
        const h2 = allRelevantPalaces.some(p => hs(p, 'Văn Xương'));
        const h3 = allRelevantPalaces.some(p => hs(p, 'Đà La'));
        const h4 = allRelevantPalaces.some(p => hs(p, 'Vũ Khúc'));
        if (h1 && h2 && h3 && h4) {
            addPattern('LINH_XUONG_DA_VU', false, [menhBranch, ...sanFangBranches]);
        }
    }

    // 32. NHẬT NGUYỆT TỊNH MINH
    {
        const sun = allRelevantPalaces.find(p => p && hs(p, 'Thái Dương'));
        const moon = allRelevantPalaces.find(p => p && hs(p, 'Thái Âm'));
        if (sun && moon) {
            const isSunBright = ['Thìn', 'Tỵ', 'Ngọ'].includes(sun.earthlyBranch);
            const isMoonBright = ['Dậu', 'Tuất', 'Hợi', 'Tý'].includes(moon.earthlyBranch);
            if (isSunBright && isMoonBright) {
                if (!(menhBranch === 'Mùi' && sun.earthlyBranch === 'Mão' && moon.earthlyBranch === 'Hợi')) {
                    const isPure = !hasMaleficFast(allRelevantPalaces, starSets);
                    addPattern('NHAT_NGUYET_TINH_MINH', isPure, [menhBranch, sun.earthlyBranch, moon.earthlyBranch]);
                }
            }
        }
    }
    // ═══════════════════════════════════════════════════════════
    // 33–42: New Patterns from Phase 3 Expansion
    // ═══════════════════════════════════════════════════════════

    // 33. TỌA QUÝ HƯỚNG QUÝ — Thiên Khôi + Thiên Việt flanking Mệnh
    {
        const idx = BRANCH_ORDER.indexOf(menhBranch);
        if (idx !== -1) {
            const prevBranch = BRANCH_ORDER[(idx - 1 + 12) % 12];
            const nextBranch = BRANCH_ORDER[(idx + 1) % 12];
            const prevPalace = bp(prevBranch);
            const nextPalace = bp(nextBranch);
            const khoiPrev = hs(prevPalace, 'Thiên Khôi');
            const khoiNext = hs(nextPalace, 'Thiên Khôi');
            const vietPrev = hs(prevPalace, 'Thiên Việt');
            const vietNext = hs(nextPalace, 'Thiên Việt');
            if ((khoiPrev && vietNext) || (khoiNext && vietPrev)) {
                const isPure = !hasAnyMaleficFast(menhPalace, starSets);
                addPattern('TOA_QUY_HUONG_QUY', isPure, [prevBranch, menhBranch, nextBranch]);
            }
        }
    }

    // 34. TẢ HỮU GIÁP MỆNH — Tả Phụ + Hữu Bật flanking Mệnh
    {
        const idx = BRANCH_ORDER.indexOf(menhBranch);
        if (idx !== -1) {
            const prevBranch = BRANCH_ORDER[(idx - 1 + 12) % 12];
            const nextBranch = BRANCH_ORDER[(idx + 1) % 12];
            const prevPalace = bp(prevBranch);
            const nextPalace = bp(nextBranch);
            const taPrev = hs(prevPalace, 'Tả Phụ');
            const taNext = hs(nextPalace, 'Tả Phụ');
            const huuPrev = hs(prevPalace, 'Hữu Bật');
            const huuNext = hs(nextPalace, 'Hữu Bật');
            if ((taPrev && huuNext) || (taNext && huuPrev)) {
                const isPure = !hasAnyMaleficFast(menhPalace, starSets);
                addPattern('TA_HUU_GIAP_MENH', isPure, [prevBranch, menhBranch, nextBranch]);
            }
        }
    }

    // 35. HÙNG TÚ TRIỀU VIÊN — Liêm Trinh + Tham Lang at Tỵ/Hợi
    if (hs(menhPalace, 'Liêm Trinh') && hs(menhPalace, 'Tham Lang')) {
        if (menhBranch === 'Tỵ' || menhBranch === 'Hợi') {
            const isPure = !hasAnyMaleficFast(menhPalace, starSets);
            addPattern('HUNG_TU_TRIEU_VIEN', isPure, [menhBranch]);
        }
    }

    // 36. NHẬT NGUYỆT ĐỒNG CUNG — Thái Dương + Thái Âm at Sửu/Mùi in Mệnh
    if (hs(menhPalace, 'Thái Dương') && hs(menhPalace, 'Thái Âm')) {
        if (menhBranch === 'Sửu' || menhBranch === 'Mùi') {
            const isPure = !hasAnyMaleficFast(menhPalace, starSets);
            addPattern('NHAT_NGUYET_DONG_CUNG', isPure, [menhBranch]);
        }
    }

    // 37. KÌNH DƯƠNG NHẬP MIẾU — Kình Dương at Thìn/Tuất/Sửu/Mùi (Miếu/Vượng positions)
    {
        const mieuBranches = ['Thìn', 'Tuất', 'Sửu', 'Mùi'];
        for (const palace of chart.palaces) {
            if (hs(palace, 'Kình Dương') && mieuBranches.includes(palace.earthlyBranch)) {
                if (palace.earthlyBranch === menhBranch || sanFangBranches.includes(palace.earthlyBranch)) {
                    addPattern('KINH_DUONG_NHAP_MIEU', true, [palace.earthlyBranch]);
                    break;
                }
            }
        }
    }

    // 38. PHIẾM THỦY ĐÀO HOA — Tham Lang at Tý + Văn Khúc
    {
        const tyPalace = bp('Tý');
        if (hs(tyPalace, 'Tham Lang') && hs(tyPalace, 'Văn Khúc')) {
            addPattern('PHIEM_THUY_DAO_HOA', false, ['Tý']);
        }
    }

    // 39. CỰ PHÙNG TỨ SÁT — Cự Môn in Mệnh + 2+ Sát Tinh in San Fang
    if (hs(menhPalace, 'Cự Môn')) {
        const satNames = ['Kình Dương', 'Đà La', 'Hỏa Tinh', 'Linh Tinh'];
        const satCount = satNames.filter(s => allRelevantPalaces.some(p => hs(p, s))).length;
        if (satCount >= 2) {
            addPattern('CU_PHUNG_TU_SAT', false, [menhBranch, ...sanFangBranches]);
        }
    }

    // 40. DƯƠNG ĐÀ GIÁP KỴ — Kình Dương + Đà La flanking a palace with Hóa Kỵ
    {
        for (const palace of chart.palaces) {
            // Check if this palace has Hóa Kỵ
            const hasKy = palaceHasMutagen(palace, '忌');
            if (!hasKy) continue;

            const pidx = BRANCH_ORDER.indexOf(palace.earthlyBranch);
            if (pidx === -1) continue;
            const prevB = BRANCH_ORDER[(pidx - 1 + 12) % 12];
            const nextB = BRANCH_ORDER[(pidx + 1) % 12];
            const prevP = bp(prevB);
            const nextP = bp(nextB);
            const kinhPrev = hs(prevP, 'Kình Dương');
            const kinhNext = hs(nextP, 'Kình Dương');
            const daPrev = hs(prevP, 'Đà La');
            const daNext = hs(nextP, 'Đà La');
            if ((kinhPrev && daNext) || (kinhNext && daPrev)) {
                addPattern('DUONG_DA_GIAP_KY', false, [prevB, palace.earthlyBranch, nextB]);
                break;
            }
        }
    }

    // 41. PHONG LƯU THÁI TRƯỢNG — Tham Lang + Đào Hoa or Hồng Loan
    {
        for (const palace of chart.palaces) {
            if (hs(palace, 'Tham Lang') && (hs(palace, 'Đào Hoa') || hs(palace, 'Hồng Loan'))) {
                if (palace.earthlyBranch === menhBranch || sanFangBranches.includes(palace.earthlyBranch)) {
                    addPattern('PHONG_LUU_THAI_TRUONG', false, [palace.earthlyBranch]);
                    break;
                }
            }
        }
    }

    // ═══════════════════════════════════════════════════════════
    // 42–46: New Classical Hung Cách Patterns
    // ═══════════════════════════════════════════════════════════

    // 42. THIÊN LA ĐỊA VÕNG — Mệnh at Thìn or Tuất with sát tinh
    if (menhBranch === 'Thìn' || menhBranch === 'Tuất') {
        if (hasAnyMaleficFast(menhPalace, starSets)) {
            addPattern('THIEN_LA_DIA_VONG', false, [menhBranch]);
        }
    }

    // 43. TỨ SÁT TỤ HỘI — All 4 major sát stars in Mệnh's san fang
    {
        const tuSat = ['Kình Dương', 'Đà La', 'Hỏa Tinh', 'Linh Tinh'];
        const satCount = tuSat.filter(s => allRelevantPalaces.some(p => hs(p, s))).length;
        if (satCount === 4) {
            addPattern('TU_SAT_TU_HOI', false, [menhBranch, ...sanFangBranches]);
        }
    }

    // 44. MỆNH LÝ PHÙNG KHÔNG — Mệnh directly contains Địa Không or Địa Kiếp
    if (hs(menhPalace, 'Địa Không') || hs(menhPalace, 'Địa Kiếp')) {
        addPattern('MENH_LY_PHUNG_KHONG', false, [menhBranch]);
    }

    // 45. HỎA LINH GIÁP MỆNH — Hỏa Tinh + Linh Tinh flanking Mệnh
    {
        const idx = BRANCH_ORDER.indexOf(menhBranch);
        if (idx !== -1) {
            const prevBranch = BRANCH_ORDER[(idx - 1 + 12) % 12];
            const nextBranch = BRANCH_ORDER[(idx + 1) % 12];
            const prevPalace = bp(prevBranch);
            const nextPalace = bp(nextBranch);
            const hoaPrev = hs(prevPalace, 'Hỏa Tinh');
            const hoaNext = hs(nextPalace, 'Hỏa Tinh');
            const linhPrev = hs(prevPalace, 'Linh Tinh');
            const linhNext = hs(nextPalace, 'Linh Tinh');
            if ((hoaPrev && linhNext) || (hoaNext && linhPrev)) {
                addPattern('HOA_LINH_GIAP_MENH', false, [prevBranch, menhBranch, nextBranch]);
            }
        }
    }

    // 46. LỘC SUY MÃ KHỐN — Lộc Tồn + Thiên Mã both in Hãm positions within san fang
    {
        let locHam = false;
        let maHam = false;
        for (const p of allRelevantPalaces) {
            if (!p) continue;
            if (hs(p, 'Lộc Tồn')) {
                const locStar = allStarsOf(p).find(s => s.name === 'Lộc Tồn');
                if (locStar && 'brightness' in locStar) {
                    const brightness = (locStar as { brightness?: string }).brightness;
                    if (brightness === '陷' || brightness === '不') {
                        locHam = true;
                    }
                }
            }
            if (hs(p, 'Thiên Mã')) {
                const maStar = allStarsOf(p).find(s => s.name === 'Thiên Mã');
                if (maStar && 'brightness' in maStar) {
                    const brightness = (maStar as { brightness?: string }).brightness;
                    if (brightness === '陷' || brightness === '不') {
                        maHam = true;
                    }
                }
            }
        }
        if (locHam && maHam) {
            addPattern('LOC_SUY_MA_KHON', false, [menhBranch, ...sanFangBranches]);
        }
    }

    return detected;
}

