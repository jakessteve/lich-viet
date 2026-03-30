/**
 * 10 Heavenly Stems (Thiên Can)
 */
export const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

/**
 * 12 Earthly Branches (Địa Chi)
 * Note: Index 0 is Tý (子), 1 is Sửu (丑), 2 is Dần (寅), etc.
 */
export const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

/**
 * 12 Palaces (Cung) corresponding to the Branches
 */
export const PALACES = [
    'ziPalace', 'chouPalace', 'yinPalace', 'maoPalace', 'chenPalace', 'siPalace', 
    'wuPalace', 'weiPalace', 'shenPalace', 'youPalace', 'xuPalace', 'haiPalace'
];

/**
 * Five Elements (Ngũ Hành) Bureau Values (Cục)
 */
export const FiveElementsClass: Record<string, number> = {
    'thủy': 2, 'mộc': 3, 'kim': 4, 'thổ': 5, 'hỏa': 6
};

/**
 * Utility to fix array bounds (0-11) for the 12 Palaces (Tý to Hợi)
 */
export const fixIndex = (index: number, max: number = 12): number => {
    let result = index % max;
    if (result < 0) result += max;
    return result;
};

/**
 * Fix earthly branch names to 0-11 index 
 * Note: Index 0 is Tý, 1 is Sửu, 2 is Dần, etc.
 */
export const fixEarthlyBranchIndex = (branchKey: string): number => {
    // Expected keys: zi, chou, yin, mao, chen, si, wu, wei, shen, you, xu, hai
    const indexStr = branchKey.replace('Earthly', '');
    const map: Record<string, number> = {
        'zi': 0, 'chou': 1, 'yin': 2, 'mao': 3, 'chen': 4, 'si': 5,
        'woo': 6, 'wu': 6, 'wei': 7, 'shen': 8, 'you': 9, 'xu': 10, 'hai': 11
    };
    return map[indexStr] ?? 0;
};

/**
 * Ported Zi Wei and Tian Fu star location algorithm.
 * Formula:
 * - Determine the FiveElements value (2, 3, 4, 5, 6)
 * - Calculate (Lunar Day + X) / FiveElementsValue = Quotient (no remainder)
 * - ZiWei Index derived from Quotient and X orientation.
 */
export const getZiweiTianfuIndex = (
    timeIndex: number, 
    lunarDay: number,
    fiveElementsValue: number // 2 for Water, 3 for Wood, 4 for Metal, 5 for Earth, 6 for Fire
): { ziweiIndex: number; tianfuIndex: number } => {
    
    let remainder = -1;
    let quotient = 0;
    let offset = -1;
    
    // Copy the original iztro loop logic exactly:
    do {
        offset++;
        const divisor = lunarDay + offset;
        quotient = Math.floor(divisor / fiveElementsValue);
        remainder = divisor % fiveElementsValue;
    } while (remainder !== 0);

    quotient %= 12;

    // Start from Yin (Dần) which is index 2.
    // Wait, the original iztro code says: quotient - 1 as index.
    // If quotient is 1 (starts at Dần = index 2).
    // Let's use iztro's exact relative math but we map to absolute 0-11 indices later in getMajorStars
    let ziweiIndex = quotient - 1; 

    if (offset % 2 === 0) {
        ziweiIndex += offset; // Even offset goes clockwise
    } else {
        ziweiIndex -= offset; // Odd offset goes counter-clockwise
    }

    // Ziwei index needs to be offset by Yin (Dần - index 2), so we do the absolute mapping later, 
    // or iztro's logic assumes the array starts at Yin?
    // Iztro's PALACES array: yin, mao, chen, si, wu, wei, shen, you, xu, hai, zi, chou.
    // Our PALACES start at Tý (0). 
    // If iztro's array starts at Yin, then quotient - 1 represents steps from Yin.
    // We must shift by +2 to map to our array starting at Tý.
    ziweiIndex = fixIndex(ziweiIndex + 2);

    // Tianfu creates a mirrored axis with Ziwei across the Dần-Thân axis (Dần=2, Thân=8)
    // Formula for Tý(0)-based array: ziweiIndex + tianfuIndex = 4 (or 16).
    // => tianfuIndex = (16 - ziweiIndex) % 12
    const tianfuIndex = fixIndex(16 - ziweiIndex);

    return { ziweiIndex, tianfuIndex };
};

/**
 * Extrapolating the 14 Major Stars from Zi Wei and Tian Fu
 */
export const getMajorStarsLocation = (ziweiIndex: number, tianfuIndex: number) => {
    return {
        // Zi Wei Chain
        ziwei: ziweiIndex,
        tianji: fixIndex(ziweiIndex - 1),
        taiyang: fixIndex(ziweiIndex - 3),
        wuqu: fixIndex(ziweiIndex - 4),
        tiantong: fixIndex(ziweiIndex - 5),
        lianzhen: fixIndex(ziweiIndex - 8),
        
        // Tian Fu Chain
        tianfu: tianfuIndex,
        taiyin: fixIndex(tianfuIndex + 1),
        tanlang: fixIndex(tianfuIndex + 2),
        jumen: fixIndex(tianfuIndex + 3),
        tianxiang: fixIndex(tianfuIndex + 4),
        tianliang: fixIndex(tianfuIndex + 5),
        qisha: fixIndex(tianfuIndex + 6),
        pojun: fixIndex(tianfuIndex + 10)
    };
};

/**
 * Lộc Tồn, Kình Dương, Đà La, Thiên Mã (Dependent on Year Stem and Branch)
 */
export const getLuYangTuoMaIndex = (heavenlyStemIndex: number, earthlyBranchIndex: number) => {
    let luIndex = -1;
    let maIndex = 0;

    // Thiên Mã (only appears in the 4 corners: Dần, Thân, Tỵ, Hợi)
    // Tý(0), Sửu(1), Dần(2), Mão(3), Thìn(4), Tỵ(5), Ngọ(6), Mùi(7), Thân(8), Dậu(9), Tuất(10), Hợi(11)
    switch (earthlyBranchIndex) {
        case 2: // Dần
        case 6: // Ngọ
        case 10: // Tuất
            maIndex = 8; // Thân
            break;
        case 8: // Thân
        case 0: // Tý
        case 4: // Thìn
            maIndex = 2; // Dần
            break;
        case 5: // Tỵ
        case 9: // Dậu
        case 1: // Sửu
            maIndex = 11; // Hợi
            break;
        case 11: // Hợi
        case 3: // Mão
        case 7: // Mùi
            maIndex = 5; // Tỵ
            break;
    }

    // Lộc Tồn based on Year Stem (Giáp=0, Ất=1, Bính=2...)
    const luMap = [
        2, // Giáp -> Dần
        3, // Ất -> Mão
        5, // Bính -> Tỵ
        6, // Đinh -> Ngọ
        5, // Mậu -> Tỵ
        6, // Kỷ -> Ngọ
        8, // Canh -> Thân
        9, // Tân -> Dậu
        11,// Nhâm -> Hợi
        0  // Quý -> Tý
    ];
    luIndex = luMap[heavenlyStemIndex % 10];

    return {
        luIndex,
        maIndex,
        yangIndex: fixIndex(luIndex + 1), // Kình Dương is always +1 from Lộc Tồn
        tuoIndex: fixIndex(luIndex - 1),  // Đà La is always -1 from Lộc Tồn
    };
};

/**
 * Thiên Khôi, Thiên Việt (Dependent on Year Stem)
 */
export const getKuiYueIndex = (heavenlyStemIndex: number) => {
    const kuiMap =  [1, 0, 11, 11, 1, 0, 1, 6, 3, 3]; // Sửu, Tý, Hợi, Hợi, Sửu, Tý, Sửu, Ngọ, Mão, Mão
    const yueMap = [7, 8, 9,  9,  7, 8, 7, 2, 5, 5]; // Mùi, Thân, Dậu, Dậu, Mùi, Thân, Mùi, Dần, Tỵ, Tỵ
    
    return {
        kuiIndex: kuiMap[heavenlyStemIndex % 10],
        yueIndex: yueMap[heavenlyStemIndex % 10]
    };
};

/**
 * Tả Phù, Hữu Bật (Dependent on Lunar Month)
 * Lunar Month is 1-indexed (January = 1)
 */
export const getZuoYouIndex = (lunarMonth: number) => {
    // Tả Phù starts at Thìn (4) and goes forward
    const zuoIndex = fixIndex(4 + (lunarMonth - 1));
    // Hữu Bật starts at Tuất (10) and goes backward
    const youIndex = fixIndex(10 - (lunarMonth - 1));
    return { zuoIndex, youIndex };
};

/**
 * Văn Xương, Văn Khúc (Dependent on Hour / Time Index)
 * Time Index: 0=Tý, 1=Sửu, 2=Dần...
 */
export const getChangQuIndex = (timeIndex: number) => {
    // Văn Xương starts at Tuất (10) and goes backward
    const changIndex = fixIndex(10 - timeIndex);
    // Văn Khúc starts at Thìn (4) and goes forward
    const quIndex = fixIndex(4 + timeIndex);
    return { changIndex, quIndex };
}

/**
 * Tam Thai, Bat Toa, An Quang, Thien Quy (Dependent on Lunar Day and Zuo/You/Chang/Qu)
 * Note: Lunar Day is 1-indexed.
 */
export const getDailyStarIndex = (lunarDay: number, zuoIndex: number, youIndex: number, changIndex: number, quIndex: number) => {
    // iztro uses lunarDay directly without -1 offset because "từ cung Tả Phù kể là mùng 1"
    // Wait, if it counts FROM the palace as day 1, then the offset should be `lunarDay - 1`!
    // Let's check iztro logic: `santaiIndex = (zuoIndex + dayIndex) % 12` where `dayIndex = fixLunarDayIndex(lunarDay, timeIndex)`
    // Note: iztro passed `dayIndex` which might already be `lunarDay - 1`. Let's assume dayIndex is `lunarDay` minus something.
    // Actually, traditionally: "Từ cung bản vị tính là mùng 1, đếm thuận đến ngày sinh". So offset is `lunarDay - 1`.
    // Wait... `dayIndex` in iztro normally subtracts 1. Wait, if iztro calculates dayIndex by timeIndex? No, it's just `lunarDay` or `lunarDay - 1`.
    // I will use `(lunarDay - 1)` because "đếm thuận đến ngày sinh" means if you are born on mùng 1, you stay in the same palace (offset +0).
    const offset = lunarDay - 1;

    return {
        santaiIndex: fixIndex(zuoIndex + offset),
        bazuoIndex: fixIndex(youIndex - offset),
        enguangIndex: fixIndex(changIndex + offset - 1), // Ân Quang = Xương đếm thuận, lùi 1
        tianguiIndex: fixIndex(quIndex - offset + 1),    // Thiên Quý = Khúc đếm nghịch, lùi 1 (+1 vì đang đi nghịch)
    };
};

/**
 * Thai Phu, Phong Cao (Dependent on Hour / Time Index)
 */
export const getTimelyStarIndex = (timeIndex: number) => {
    return {
        taifuIndex: fixIndex(6 /* Ngọ */ + timeIndex),
        fenggaoIndex: fixIndex(2 /* Dần */ + timeIndex)
    };
};

/**
 * Dia Khong, Dia Kiep (Dependent on Hour / Time Index)
 */
export const getKongJieIndex = (timeIndex: number) => {
    return {
        kongIndex: fixIndex(11 /* Hợi */ - timeIndex),
        jieIndex: fixIndex(11 /* Hợi */ + timeIndex)
    };
};

/**
 * Hoa Tinh, Linh Tinh (Dependent on Year Branch and Hour / Time Index)
 */
export const getHuoLingIndex = (earthlyBranchIndex: number, timeIndex: number) => {
    let huoStartIndex = -1;
    let lingStartIndex = -1;

    switch (earthlyBranchIndex) {
        case 2: case 6: case 10: // Dần Ngọ Tuất
            huoStartIndex = 1; // Sửu
            lingStartIndex = 3; // Mão
            break;
        case 8: case 0: case 4: // Thân Tý Thìn
            huoStartIndex = 2; // Dần
            lingStartIndex = 10; // Tuất
            break;
        case 5: case 9: case 1: // Tỵ Dậu Sửu
            huoStartIndex = 3; // Mão
            lingStartIndex = 10; // Tuất
            break;
        case 11: case 3: case 7: // Hợi Mão Mùi
            huoStartIndex = 9; // Dậu
            lingStartIndex = 10; // Tuất
            break;
    }

    return {
        huoIndex: fixIndex(huoStartIndex + timeIndex),
        lingIndex: fixIndex(lingStartIndex + timeIndex)
    };
};

/**
 * Hong Loan, Thien Hy (Dependent on Year Branch)
 */
export const getLuanXiIndex = (earthlyBranchIndex: number) => {
    const hongluanIndex = fixIndex(3 /* Mão */ - earthlyBranchIndex);
    return {
        hongluanIndex,
        tianxiIndex: fixIndex(hongluanIndex + 6) // Thiên Hỷ is always opposite to Hồng Loan
    };
};

/**
 * Hoa Cai, Ham Tri/Dao Hoa (Dependent on Year Branch)
 */
export const getHuagaiXianchiIndex = (earthlyBranchIndex: number) => {
    let huagaiIndex = -1;
    let xianchiIndex = -1;

    switch (earthlyBranchIndex) {
        case 2: case 6: case 10: // Dần Ngọ Tuất
            huagaiIndex = 10; // Tuất
            xianchiIndex = 3; // Mão
            break;
        case 8: case 0: case 4: // Thân Tý Thìn
            huagaiIndex = 4; // Thìn
            xianchiIndex = 9; // Dậu
            break;
        case 5: case 9: case 1: // Tỵ Dậu Sửu
            huagaiIndex = 1; // Sửu
            xianchiIndex = 6; // Ngọ
            break;
        case 11: case 3: case 7: // Hợi Mão Mùi
            huagaiIndex = 7; // Mùi
            xianchiIndex = 0; // Tý
            break;
    }

    return { huagaiIndex, xianchiIndex };
};

/**
 * Co Than, Qua Tu (Dependent on Year Branch)
 */
export const getGuGuaIndex = (earthlyBranchIndex: number) => {
    let guchenIndex = -1;
    let guasuIndex = -1;

    switch (earthlyBranchIndex) {
        case 2: case 3: case 4: // Dần Mão Thìn
            guchenIndex = 5; // Tỵ
            guasuIndex = 1; // Sửu
            break;
        case 5: case 6: case 7: // Tỵ Ngọ Mùi
            guchenIndex = 8; // Thân
            guasuIndex = 4; // Thìn
            break;
        case 8: case 9: case 10: // Thân Dậu Tuất
            guchenIndex = 11; // Hợi
            guasuIndex = 7; // Mùi
            break;
        case 11: case 0: case 1: // Hợi Tý Sửu
            guchenIndex = 2; // Dần
            guasuIndex = 10; // Tuất
            break;
    }

    return { guchenIndex, guasuIndex };
};

/**
 * Kiếp Sát (Dependent on Year Branch)
 */
export const getJieshaAdjIndex = (earthlyBranchIndex: number) => {
    // Tý(0)->5, Sửu(1)->2, Dần(2)->11, Mão(3)->8, Thìn(4)->5, Tỵ(5)->2, Ngọ(6)->11, Mùi(7)->8, Thân(8)->5, Dậu(9)->2, Tuất(10)->11, Hợi(11)->8
    const map = [5, 2, 11, 8, 5, 2, 11, 8, 5, 2, 11, 8];
    return map[earthlyBranchIndex];
};

/**
 * Đại Hao - Năm (Dependent on Year Branch)
 */
export const getDahaoIndex = (earthlyBranchIndex: number) => {
    const map = [7, 6, 9, 8, 11, 10, 1, 0, 3, 2, 5, 4];
    return map[earthlyBranchIndex];
};

/**
 * Thiên Sứ, Thiên Thương (Dependent on Destiny/Mệnh Palace)
 */
export const getTianshiTianshangIndex = (destinyIndex: number) => {
    // Thiên Thương is always at Nô Bộc (5 places ahead of Mệnh clockwise => Mệnh - 7 mod 12)
    // Thiên Sứ is always at Tật Ách (7 places ahead of Mệnh clockwise => Mệnh - 5 mod 12)
    return {
        tianshangIndex: fixIndex(destinyIndex + 5),
        tianshiIndex: fixIndex(destinyIndex + 7)
    };
};

/**
 * Giải Thần - Năm (Dependent on Year Branch)
 */
export const getNianjieIndex = (earthlyBranchIndex: number) => {
    const map = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 11];
    return map[earthlyBranchIndex];
};

/**
 * Vòng Tướng Tinh (Jiangxing Ring) - Dependent on Year Branch
 */
export const getJiangxingRingIndex = (earthlyBranchIndex: number) => {
    let jiangxingIndex = -1;
    switch (earthlyBranchIndex) {
        case 2: case 6: case 10: // Dần Ngọ Tuất
            jiangxingIndex = 6; // Ngọ
            break;
        case 8: case 0: case 4: // Thân Tý Thìn
            jiangxingIndex = 0; // Tý
            break;
        case 5: case 9: case 1: // Tỵ Dậu Sửu
            jiangxingIndex = 9; // Dậu
            break;
        case 11: case 3: case 7: // Hợi Mão Mùi
            jiangxingIndex = 3; // Mão
            break;
    }

    return {
        jiangxingIndex,                                      // Tướng Tinh (+0)
        pananIndex: fixIndex(jiangxingIndex + 1),            // Phan Án (+1)
        suiyiIndex: fixIndex(jiangxingIndex + 2),            // Tuế Dịch (+2)
        xiishenIndex: fixIndex(jiangxingIndex + 3),          // Tức Thần (+3)
        // huagaiIndex is +4, jieshaAdjIndex is +5, handled elsewhere
        zhaishaIndex: fixIndex(jiangxingIndex + 6),          // Tai Sát (+6)
        tianshaIndex: fixIndex(jiangxingIndex + 7),          // Thiên Sát (+7)
        zhibeiIndex: fixIndex(jiangxingIndex + 8),           // Chỉ Bối (+8)
        // xianchiIndex is +9, handled elsewhere
        yueshaIndex: fixIndex(jiangxingIndex + 10),          // Nguyệt Sát (+10)
        wangshenIndex: fixIndex(jiangxingIndex + 11),        // Vong Thần (+11)
    };
};

/**
 * Yearly Stars (Thiên Tài, Thiên Thọ, Thiên Không, Tuần, Triệt, v.v...)
 */
export const getYearlyStarIndex = (heavenlyStemIndex: number, earthlyBranchIndex: number, destinyIndex: number, bodyIndex: number) => {
    const { huagaiIndex, xianchiIndex } = getHuagaiXianchiIndex(earthlyBranchIndex);
    const { guchenIndex, guasuIndex } = getGuGuaIndex(earthlyBranchIndex);
    const jiangxingRing = getJiangxingRingIndex(earthlyBranchIndex);
    
    const tiancaiIndex = fixIndex(destinyIndex + earthlyBranchIndex); // Thiên Tài
    const tianshouIndex = fixIndex(bodyIndex + earthlyBranchIndex);   // Thiên Thọ
    const tianchuIndex = [5, 6, 0, 5, 6, 8, 2, 6, 9, 11][heavenlyStemIndex % 10]; // Thiên Trù
    const posuiIndex = [5, 1, 9][earthlyBranchIndex % 3]; // Phá Toái
    const feilianIndex = [8, 9, 10, 5, 6, 7, 2, 3, 4, 11, 0, 1][earthlyBranchIndex]; // Phi Liêm
    
    const longchiIndex = fixIndex(4 + earthlyBranchIndex); // Long Trì
    const fenggeIndex = fixIndex(10 - earthlyBranchIndex); // Phượng Các
    const tiankuIndex = fixIndex(6 - earthlyBranchIndex);  // Thiên Khốc
    const tianxuIndex = fixIndex(6 + earthlyBranchIndex);  // Thiên Hư
    
    const tianguanIndex = [7, 4, 5, 2, 3, 9, 11, 9, 10, 6][heavenlyStemIndex % 10]; // Thiên Quan
    const tianfuIndex = [9, 8, 0, 11, 3, 2, 6, 5, 6, 5][heavenlyStemIndex % 10];   // Thiên Phúc (Thiên Phúc Quý Nhân)
    const tiandeIndex = fixIndex(9 + earthlyBranchIndex); // Thiên Đức
    const yuedeIndex = fixIndex(5 + earthlyBranchIndex);  // Nguyệt Đức
    const tiankongIndex = fixIndex(earthlyBranchIndex + 1); // Thiên Không
    
    // Triệt Không (Triệt Lộ Không Vong)
    const jieluIndex = [8, 6, 4, 2, 0][heavenlyStemIndex % 5];
    const kongwangIndex = [9, 7, 5, 3, 1][heavenlyStemIndex % 5];
    const yinyang = earthlyBranchIndex % 2;
    const jiekongIndex = yinyang === 0 ? jieluIndex : kongwangIndex; // Triệt Không Sao
    
    // Tuần Không
    // Formula: earthlyBranch + 9 (Quý) - heavenlyStem + 1
    let xunkongIndex = fixIndex(earthlyBranchIndex + 9 - heavenlyStemIndex + 1);
    if (yinyang !== xunkongIndex % 2) {
        xunkongIndex = fixIndex(xunkongIndex + 1);
    }
    
    const jieshaAdjIndex = getJieshaAdjIndex(earthlyBranchIndex);
    const nianjieIndex = getNianjieIndex(earthlyBranchIndex);
    const dahaoAdjIndex = getDahaoIndex(earthlyBranchIndex);
    const { tianshiIndex, tianshangIndex } = getTianshiTianshangIndex(destinyIndex);

    return {
        xianchiIndex, huagaiIndex, guchenIndex, guasuIndex,
        tiancaiIndex, tianshouIndex, tianchuIndex, posuiIndex, feilianIndex,
        longchiIndex, fenggeIndex, tiankuIndex, tianxuIndex,
        tianguanIndex, tianfuIndex, tiandeIndex, yuedeIndex, tiankongIndex,
        jieluIndex, kongwangIndex, jiekongIndex, xunkongIndex,
        tianshiIndex, tianshangIndex, jieshaAdjIndex, nianjieIndex, dahaoAdjIndex,
        ...jiangxingRing
    };
};

/**
 * Monthly Stars (Giải Thần - Tháng, Thiên Diêu, Thiên Hình, Âm Sát, Thiên Nguyệt, Thiên Vu)
 * Lunar Month is 1-indexed (January = 1)
 */
export const getMonthlyStarIndex = (lunarMonth: number) => {
    // For 0-indexed lookups
    const m = lunarMonth - 1;
    
    const yuejieIndex = [8, 8, 10, 10, 0, 0, 2, 2, 4, 4, 6, 6][m]; // Giải Thần (Tháng)
    const tianyaoIndex = fixIndex(1 /* Sửu */ + m); // Thiên Diêu
    const tianxingIndex = fixIndex(9 /* Dậu */ + m); // Thiên Hình
    const yinshaIndex = [2, 0, 10, 8, 6, 4][m % 6]; // Âm Sát
    const tianyueIndex = [10, 5, 4, 2, 7, 3, 11, 7, 2, 6, 10, 2][m]; // Thiên Nguyệt
    const tianwuIndex = [5, 8, 2, 11][m % 4]; // Thiên Vu

    return {
        yuejieIndex, tianyaoIndex, tianxingIndex,
        yinshaIndex, tianyueIndex, tianwuIndex
    };
};

/**
 * Lưu Xương, Lưu Khúc (Dependent on Heavenly Stem of Decade/Year)
 */
export const getChangQuIndexByHeavenlyStem = (heavenlyStemIndex: number) => {
    const changMap = [5, 6, 8, 9, 8, 9, 11, 0, 2, 3];
    const quMap = [9, 8, 6, 5, 6, 5, 3, 2, 0, 11];
    
    return {
        changIndex: changMap[heavenlyStemIndex % 10],
        quIndex: quMap[heavenlyStemIndex % 10]
    };
};

/**
 * Cục (Five Elements Class)
 * Dependent on the Heavenly Stem and Earthly Branch of the Destiny (Mệnh) Palace
 */
export const getFiveElementsClass = (soulStemIndex: number, soulBranchIndex: number): number => {
    // 2=Thủy, 3=Mộc, 4=Kim, 5=Thổ, 6=Hỏa
    // Formula: 
    // Stem Number: GiápẤt=1, BínhĐinh=2, MậuKỷ=3, CanhTân=4, NhâmQuý=5
    // Branch Number: TýSửu NgọMùi=1, DầnMão ThânDậu=2, ThìnTỵ TuấtHợi=3
    
    const stemNumber = Math.floor(soulStemIndex / 2) + 1;
    const branchNumber = Math.floor(fixIndex(soulBranchIndex, 6) / 2) + 1;
    
    let index = stemNumber + branchNumber;
    while (index > 5) {
        index -= 5;
    }
    
    // Mapping 1->Mộc(3), 2->Kim(4), 3->Thủy(2), 4->Hỏa(6), 5->Thổ(5)
    const classMap = [3, 4, 2, 6, 5];
    return classMap[index - 1];
};

/**
 * Tràng Sinh 12th Cycle Starting Index
 */
export const getChangsheng12StartIndex = (fiveElementsClass: number): number => {
    switch (fiveElementsClass) {
        case 2: return 8; // Thủy Nhị Cục -> Thân
        case 3: return 11; // Mộc Tam Cục -> Hợi
        case 4: return 5; // Kim Tứ Cục -> Tỵ
        case 5: return 8; // Thổ Ngũ Cục -> Thân
        case 6: return 2; // Hỏa Lục Cục -> Dần
        default: return 8;
    }
};

/**
 * Âm Dương Thuận Nghịch (Yin/Yang Direction)
 * Returns 1 for Forward (Thuận), -1 for Backward (Nghịch)
 */
export const getYinYangDirection = (gender: 'male' | 'female', yearBranchIndex: number): number => {
    // Âm Nam, Dương Nữ, etc.
    // Tý(0), Dần(2)... are Yang (Chẵn/Even in 0-based array) => Wait!
    // In our 0-based array: Tý=0, Sửu=1, Dần=2. 
    // Usually Yang branches are Tý, Dần, Thìn, Ngọ, Thân, Tuất.
    // So if (branchIndex % 2 === 0), it is Yang (+).
    // If (branchIndex % 2 !== 0), it is Yin (-).
    const isYangYear = yearBranchIndex % 2 === 0;
    const isMale = gender === 'male';
    
    // Nam Dương (true, true) -> Thuận (+1)
    // Nam Âm (true, false) -> Nghịch (-1)
    // Nữ Dương (false, true) -> Nghịch (-1)
    // Nữ Âm (false, false) -> Thuận (+1)
    return isYangYear === isMale ? 1 : -1;
};
/**
 * Lưu Hà (流霞) — Dependent on Year Stem
 * A malefic star related to blood injury, public shame, and misfortune.
 * Vietnamese Toàn Thư standard placement:
 * Giáp→Dậu(9), Ất→Tuất(10), Bính→Hợi(11), Đinh→Tý(0),
 * Mậu→Sửu(1), Kỷ→Dần(2), Canh→Mão(3), Tân→Thìn(4), Nhâm→Tỵ(5), Quý→Ngọ(6)
 */
export const getLiuHeIndex = (heavenlyStemIndex: number): number => {
    const liuHeMap = [9, 10, 11, 0, 1, 2, 3, 4, 5, 6];
    return liuHeMap[heavenlyStemIndex % 10];
};

/**
 * Đường Phù (唐符) — Dependent on Lộc Tồn position
 * A cát tinh (auspicious) related to property, real-estate, elegance, career advancement.
 * Rule: From Lộc Tồn, count forward 8 positions (i.e., Lộc Tồn + 7)
 */
export const getDuongPhuIndex = (luIndex: number): number => {
    return fixIndex(luIndex + 7);
};

/**
 * Quốc Ấn (國印) — Dependent on Lộc Tồn position  
 * A cát tinh (auspicious) related to authority, official seals, career prestige.
 * Rule: From Lộc Tồn, count forward 9 positions (i.e., Lộc Tồn + 8)
 */
export const getQuocAnIndex = (luIndex: number): number => {
    return fixIndex(luIndex + 8);
};

/**
 * Đào Hoa (桃花 / Peach Blossom) — Dependent on Year Branch
 * A dual-nature star: auspicious for charm/romance, malefic if afflicted.
 * Rule (Tam Hợp groups):
 *   Dần(2), Ngọ(6), Tuất(10)  → Mão(3)
 *   Thân(8), Tý(0), Thìn(4)  → Dậu(9)
 *   Tỵ(5), Dậu(9), Sửu(1)   → Ngọ(6)
 *   Hợi(11), Mão(3), Mùi(7)  → Tý(0)
 */
export const getDaoHoaIndex = (earthlyBranchIndex: number): number => {
    //                Tý  Sửu  Dần  Mão  Thìn  Tỵ  Ngọ  Mùi  Thân  Dậu  Tuất  Hợi
    const daoHoaMap = [9,   6,   3,   0,   9,    6,   3,   0,   9,    6,   3,    0];
    return daoHoaMap[earthlyBranchIndex];
};

/**
 * Thiên La (天羅) and Địa Võng (地網) — Fixed positions
 * Thiên La always at Thìn (index 4)
 * Địa Võng always at Tuất (index 10)
 * These represent "heaven's net" and "earth's snare" — affliction zones.
 */
export const THIEN_LA_INDEX = 4;   // Thìn
export const DIA_VONG_INDEX = 10;  // Tuất

/**
 * Thiên Giải (天解) — Dependent on Lunar Month
 * A cát tinh; resolves calamity and hardship.
 * Rule: Month 1 → Thân(8), count forward by month.
 *   T1=Thân, T2=Dậu, T3=Tuất, T4=Hợi, T5=Tý, T6=Sửu,
 *   T7=Dần, T8=Mão, T9=Thìn, T10=Tỵ, T11=Ngọ, T12=Mùi
 */
export const getThienGiaiIndex = (lunarMonth: number): number => {
    return fixIndex(8 + (lunarMonth - 1)); // Thân(8) + offset
};

/**
 * Thiên Đức Quý Nhân (天德貴人) — Dependent on Lunar Month
 * Not to be confused with Thiên Đức (yearly). This is the monthly noble star.
 * Rule: T1=Đinh(Mùi7), T2=Thân(Thân8)... standard monthly mapping.
 */
export const getThienDucQuyNhanIndex = (lunarMonth: number): number => {
    //                 T1  T2  T3  T4  T5  T6  T7  T8  T9  T10 T11 T12
    const tdqnMap = [  7,  8,  9, 11,  0,  1,  3,  4,  5,  7,  8,  9];
    return tdqnMap[(lunarMonth - 1) % 12];
};

/**
 * Nguyệt Đức Quý Nhân (月德貴人) — Dependent on Lunar Month
 * A cát tinh that resolves calamity monthly.
 * Rule: T1=Bính(Tỵ5), T2=Giáp(Dần2)... standard monthly mapping.
 */
export const getNguyetDucQuyNhanIndex = (lunarMonth: number): number => {
    //                  T1  T2  T3  T4  T5  T6  T7  T8  T9  T10 T11 T12
    const ndqnMap = [   5,  2,  11, 8,  5,  2,  11, 8,  5,  2,  11, 8];
    return ndqnMap[(lunarMonth - 1) % 12];
};
