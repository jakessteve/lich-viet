/**
 * Core Star Catalog for the Native Lịch Việt v2 Engine.
 * Extracted and unified from the classical reference library.
 */

// Mapping of internal star IDs to their Vietnamese names
export const STAR_NAMES = {
    "ziweiMaj": "Tử Vi",
    "tianjiMaj": "Thiên Cơ",
    "taiyangMaj": "Thái Dương",
    "wuquMaj": "Vũ Khúc",
    "tiantongMaj": "Thiên Đồng",
    "lianzhenMaj": "Liêm Trinh",
    "tianfuMaj": "Thiên Phủ",
    "taiyinMaj": "Thái Âm",
    "tanlangMaj": "Tham Lang",
    "jumenMaj": "Cự Môn",
    "tianxiangMaj": "Thiên Tướng",
    "tianliangMaj": "Thiên Lương",
    "qishaMaj": "Thất Sát",
    "pojunMaj": "Phá Quân",
    "zuofuMin": "Tả Phù",
    "youbiMin": "Hữu Bật",
    "wenchangMin": "Văn Xương",
    "wenquMin": "Văn Khúc",
    "lucunMin": "Lộc Tồn",
    "tianmaMin": "Thiên Mã",
    "qingyangMin": "Kình Dương",
    "tuoluoMin": "Đà La",
    "huoxingMin": "Hỏa Tinh",
    "lingxingMin": "Linh Tinh",
    "tiankuiMin": "Thiên Khôi",
    "tianyueMin": "Thiên Việt",
    "dikongMin": "Địa Không",
    "dijieMin": "Địa Kiếp",
    "jieshaAdj": "Kiếp Sát",
    "tiankong": "Thiên Không",
    "tianxing": "Thiên Hình",
    "tianyao": "Thiên Diêu",
    "jieshen": "Giải Thần",
    "yinsha": "Âm Sát",
    "tianxi": "Thiên Hỷ",
    "tianguan": "Thiên Quan",
    "tianfu": "Thiên Phúc",
    "tianku": "Thiên Khốc",
    "tianxu": "Thiên Hư",
    "longchi": "Long Trì",
    "fengge": "Phượng Các",
    "hongluan": "Hồng Loan",
    "guchen": "Cô Thần",
    "guasu": "Quả Tú",
    "feilian": "Phi Liêm",
    "posui": "Phá Toái",
    "taifu": "Đài Phụ",
    "fenggao": "Phong Cáo",
    "tianwu": "Thiên Vu",
    "tianyue": "Thiên Nguyệt",
    "santai": "Tam Thai",
    "bazuo": "Bát Tọa",
    "engguang": "Ân Quang",
    "tiangui": "Thiên Quý",
    "tiancai": "Thiên Tài",
    "tianshou": "Thiên Thọ",
    "jiekong": "Triệt Không",
    "xunzhong": "Tuần Trung",
    "xunkong": "Tuần Không",
    "kongwang": "Không Vong",
    "jielu": "Triệt Lộ",
    "yuede": "Nguyệt Đức",
    "tianshang": "Thiên Thương",
    "tianshi": "Thiên Sứ",
    "tianchu": "Thiên Trù",
    "changsheng": "Trường Sinh",
    "muyu": "Mục Dục",
    "guandai": "Quan Đới",
    "linguan": "Lâm Quan",
    "diwang": "Đế Vượng",
    "shuai": "Suy",
    "bing": "Bệnh",
    "si": "Tử",
    "mu": "Mộ",
    "jue": "Tuyệt",
    "tai": "Thai",
    "yang": "Dưỡng",
    "boshi": "Bác Sỹ",
    "lishi": "Lực Sỹ",
    "qinglong": "Thanh Long",
    "xiaohao": "Tiểu Hao",
    "jiangjun": "Tướng Quân",
    "zhoushu": "Tấu Thư",
    "faylian": "Phi Liêm",
    "xishen": "Hỷ Thần",
    "bingfu": "Bệnh Phù",
    "dahao": "Đại Hao",
    "suipo": "Tuế Phá",
    "fubing": "Phục Binh",
    "guanfu": "Quan Phủ",
    "suijian": "Tuế Kiện",
    "huiqi": "Hối Khí",
    "sangmen": "Tang Môn",
    "guansuo": "Quán Tác",
    "gwanfu": "Quan Phù",
    "longde": "Long Đức",
    "baihu": "Bạch Hổ",
    "tiande": "Thiên Đức",
    "diaoke": "Điếu Khách",
    "jiangxing": "Tướng Tinh",
    "panan": "Phan Án",
    "suiyi": "Tuế Dịch",
    "xiishen": "Tức Thần",
    "huagai": "Hoa Cái",
    "jiesha": "Kiếp Sát",
    "zhaisha": "Tai Sát",
    "tiansha": "Thiên Sát",
    "zhibei": "Chỉ Bối",
    "xianchi": "Hàm Trì",
    "yuesha": "Nguyệt Sát",
    "wangshen": "Vong Thần",
    "liuhe": "Lưu Hà",
    "duongphu": "Đường Phù",
    "quocan": "Quốc Ấn",
    "daohoa": "Đào Hoa",
    "thienla": "Thiên La",
    "diavong": "Địa Võng",
    "thiengiai": "Thiên Giải",
    "thienducqn": "Thiên Đức Q.N",
    "nguyetducqn": "Nguyệt Đức Q.N",
    "yunkui": "Vận Khôi",
    "yunyue": "Vận Việt",
    "yunchang": "Vận Xương",
    "yunqu": "Vận Khúc",
    "yunluan": "Vận Loan",
    "yunxi": "Vận Hỷ",
    "yunlu": "Vận Lộc",
    "yunyang": "Vận Dương",
    "yuntuo": "Vận Đà",
    "yunma": "Vận Mã",
    "liukui": "Lưu Khôi",
    "liuyue": "Lưu Việt",
    "liuchang": "Lưu Xương",
    "liuqu": "Lưu Khúc",
    "liuluan": "Lưu Loan",
    "liuxi": "Lưu Hỷ",
    "liulu": "Lưu Lộc",
    "liuyang": "Lưu Dương",
    "liutuo": "Lưu Đà",
    "liuma": "Lưu Mã",
    "nianjie": "Giải Thần",
    "yuekui": "Thiên Khôi(M)",
    "yueyue": "Thiên Nguyệt(M)",
    "yuechang": "Văn Xương(M)",
    "yuequ": "Văn Khúc(M)",
    "yueluan": "Hồng Loan(M)",
    "yuexi": "Thiên Hỷ(M)",
    "yuelu": "Lộc Tồn(M)",
    "yueyang": "Kình Dương(M)",
    "yuetuo": "Đà La(M)",
    "yuema": "Thiên Mã(M)",
    "rikui": "Thiên Khôi(d)",
    "riyue": "Thiên Nguyệt(d)",
    "richang": "Văn Xương(d)",
    "riqu": "Văn Khúc(d)",
    "riluan": "Hồng Loan(d)",
    "rixi": "Thiên Hỷ(d)",
    "rilu": "Lộc Tồn(d)",
    "riyang": "Kình Dương(d)",
    "rituo": "Đà La(d)",
    "rima": "Thiên Mã(d)",
    "shikui": "Thiên Khôi(H)",
    "shiyue": "Thiên Nguyệt(H)",
    "shichang": "Văn Xương(H)",
    "shiqu": "Văn Khúc(H)",
    "shiluan": "Hồng Loan(H)",
    "shixi": "Thiên Hỷ(H)",
    "shilu": "Lộc Tồn(H)",
    "shiyang": "Kình Dương(H)",
    "shituo": "Đà La(H)",
    "shima": "Thiên Mã(H)"
};

// Pre-calculated brightness and elemental properties
// Source: Vietnamese Toàn Thư standard — indexed Tý-first (0=Tý, 1=Sửu, 2=Dần, ..., 11=Hợi)
export const STARS_INFO = {
    // Tử Vi: Miếu(M) at Thìn,Tỵ,Cũng Miếu Sửu,Hợi; Vượng at Thân,Ngọ,Mùi; Hãm at Tý
    // Classical: Miếu Thìn(4), Tỵ(5), Sửu(1), Hợi(11); Vượng Thân(8), Ngọ(6), Mùi(7)
    "ziweiMaj": {
        "brightness": [
            "xian", // Tý  (0)  — Hãm
            "miao",  // Sửu (1)  — Miếu
            "wang",  // Dần (2)  — Vượng
            "de",    // Mão (3)  — Đắc
            "miao",  // Thìn(4)  — Miếu
            "miao",  // Tỵ  (5)  — Miếu
            "wang",  // Ngọ (6)  — Vượng
            "wang",  // Mùi (7)  — Vượng
            "wang",  // Thân(8)  — Vượng
            "de",    // Dậu (9)  — Đắc
            "ping",  // Tuất(10) — Bình
            "miao"   // Hợi (11) — Miếu
        ],
        "fiveElements": "土",
        "yinYang": "阴"
    },
    // Thiên Cơ: Miếu at Thìn,Dậu; Vượng at Mão,Tý; Đắc at Dần,Ngọ,Tỵ; Hãm at Tuất,Hợi
    "tianjiMaj": {
        "brightness": [
            "wang",  // Tý  (0)  — Vượng
            "de",    // Sửu (1)  — Đắc
            "de",    // Dần (2)  — Đắc
            "wang",  // Mão (3)  — Vượng
            "miao",  // Thìn(4)  — Miếu
            "de",    // Tỵ  (5)  — Đắc
            "de",    // Ngọ (6)  — Đắc
            "ping",  // Mùi (7)  — Bình
            "li",    // Thân(8)  — Hòa
            "miao",  // Dậu (9)  — Miếu
            "xian",  // Tuất(10) — Hãm
            "xian"   // Hợi (11) — Hãm
        ],
        "fiveElements": "木",
        "yinYang": "阴"
    },
    // Thái Dương: Miếu at Mão; Vượng at Dần,Thìn,Tỵ,Ngọ; Đắc at Tý; Hãm at Mùi,Thân,Dậu,Tuất,Hợi,Sửu
    "taiyangMaj": {
        "brightness": [
            "de",    // Tý  (0)  — Đắc
            "xian",  // Sửu (1)  — Hãm
            "wang",  // Dần (2)  — Vượng
            "miao",  // Mão (3)  — Miếu
            "wang",  // Thìn(4)  — Vượng
            "wang",  // Tỵ  (5)  — Vượng
            "wang",  // Ngọ (6)  — Vượng
            "xian",  // Mùi (7)  — Hãm
            "xian",  // Thân(8)  — Hãm
            "xian",  // Dậu (9)  — Hãm
            "xian",  // Tuất(10) — Hãm
            "xian"   // Hợi (11) — Hãm
        ],
        "fiveElements": "",
        "yinYang": ""
    },
    // Vũ Khúc: Miếu at Sửu,Mùi; Vượng at Mão,Dậu; Đắc at Dần,Thân; Hòa at Tý,Ngọ; Hãm at Hợi
    "wuquMaj": {
        "brightness": [
            "li",    // Tý  (0)  — Hòa
            "miao",  // Sửu (1)  — Miếu
            "de",    // Dần (2)  — Đắc
            "wang",  // Mão (3)  — Vượng
            "de",    // Thìn(4)  — Đắc
            "ping",  // Tỵ  (5)  — Bình
            "li",    // Ngọ (6)  — Hòa
            "miao",  // Mùi (7)  — Miếu
            "de",    // Thân(8)  — Đắc
            "wang",  // Dậu (9)  — Vượng
            "ping",  // Tuất(10) — Bình
            "xian"   // Hợi (11) — Hãm
        ],
        "fiveElements": "金",
        "yinYang": "阴"
    },
    // Thiên Đồng: Vượng at Tý,Ngọ; Đắc at Dần,Thân; Hòa at Mão,Dậu; Hãm at Thìn,Tỵ,Tuất,Hợi
    "tiantongMaj": {
        "brightness": [
            "wang",  // Tý  (0)  — Vượng
            "li",    // Sửu (1)  — Hòa
            "de",    // Dần (2)  — Đắc
            "li",    // Mão (3)  — Hòa
            "xian",  // Thìn(4)  — Hãm
            "xian",  // Tỵ  (5)  — Hãm
            "wang",  // Ngọ (6)  — Vượng
            "li",    // Mùi (7)  — Hòa
            "de",    // Thân(8)  — Đắc
            "li",    // Dậu (9)  — Hòa
            "xian",  // Tuất(10) — Hãm
            "xian"   // Hợi (11) — Hãm
        ],
        "fiveElements": "水",
        "yinYang": "阳"
    },
    // Liêm Trinh: Miếu at Ngọ; Vượng at Dần; Bình at Tý,Thìn,Thân,Tuất; Hòa at Sửu,Mão,Mùi,Dậu,Hợi; Hãm at Tỵ
    "lianzhenMaj": {
        "brightness": [
            "ping",  // Tý  (0)  — Bình
            "li",    // Sửu (1)  — Hòa
            "wang",  // Dần (2)  — Vượng
            "li",    // Mão (3)  — Hòa
            "ping",  // Thìn(4)  — Bình
            "xian",  // Tỵ  (5)  — Hãm
            "miao",  // Ngọ (6)  — Miếu
            "li",    // Mùi (7)  — Hòa
            "ping",  // Thân(8)  — Bình
            "li",    // Dậu (9)  — Hòa
            "ping",  // Tuất(10) — Bình
            "li"     // Hợi (11) — Hòa
        ],
        "fiveElements": "火",
        "yinYang": "阴"
    },
    // Thiên Phủ: Đắc at Hợi; Vượng at Thìn,Tuất; Miếu at Dần,Ngọ,Thân; Bình at Tý,Mão,Tỵ,Mùi,Dậu,Sửu
    "tianfuMaj": {
        "brightness": [
            "ping",  // Tý  (0)  — Bình
            "ping",  // Sửu (1)  — Bình
            "miao",  // Dần (2)  — Miếu
            "ping",  // Mão (3)  — Bình
            "wang",  // Thìn(4)  — Vượng
            "ping",  // Tỵ  (5)  — Bình
            "miao",  // Ngọ (6)  — Miếu
            "ping",  // Mùi (7)  — Bình
            "miao",  // Thân(8)  — Miếu
            "ping",  // Dậu (9)  — Bình
            "wang",  // Tuất(10) — Vượng
            "de"     // Hợi (11) — Đắc
        ],
        "fiveElements": "土",
        "yinYang": "阳"
    },
    // Thái Âm: Vượng at Tý; Miếu at Sửu; Vượng at Hợi,Dậu,Tuất; Đắc at Thân,Mùi; Hãm at Dần,Mão,Thìn,Tỵ,Ngọ
    "taiyinMaj": {
        "brightness": [
            "wang",  // Tý  (0)  — Vượng
            "miao",  // Sửu (1)  — Miếu
            "xian",  // Dần (2)  — Hãm
            "xian",  // Mão (3)  — Hãm
            "xian",  // Thìn(4)  — Hãm
            "xian",  // Tỵ  (5)  — Hãm
            "xian",  // Ngọ (6)  — Hãm
            "de",    // Mùi (7)  — Đắc
            "de",    // Thân(8)  — Đắc
            "wang",  // Dậu (9)  — Vượng
            "wang",  // Tuất(10) — Vượng
            "wang"   // Hợi (11) — Vượng
        ],
        "fiveElements": "水",
        "yinYang": "阴"
    },
    // Tham Lang: Miếu at Dần,Thân,Sửu; Vượng at Tý,Ngọ; Đắc at Thìn,Tuất; Hòa at Tỵ,Hợi; Hãm at Mão,Dậu; Bình at Mùi
    "tanlangMaj": {
        "brightness": [
            "wang",  // Tý  (0)  — Vượng
            "miao",  // Sửu (1)  — Miếu
            "miao",  // Dần (2)  — Miếu
            "xian",  // Mão (3)  — Hãm
            "de",    // Thìn(4)  — Đắc
            "li",    // Tỵ  (5)  — Hòa
            "wang",  // Ngọ (6)  — Vượng
            "ping",  // Mùi (7)  — Bình
            "miao",  // Thân(8)  — Miếu
            "xian",  // Dậu (9)  — Hãm
            "de",    // Tuất(10) — Đắc
            "li"     // Hợi (11) — Hòa
        ],
        "fiveElements": "水",
        "yinYang": ""
    },
    // Cự Môn: Vượng at Tý,Dần; Miếu at Thìn; Đắc at Hợi; Bình at Ngọ; Hãm at Tỵ,Mùi; Hòa at Sửu,Mão,Thân,Dậu,Tuất
    "jumenMaj": {
        "brightness": [
            "wang",  // Tý  (0)  — Vượng
            "li",    // Sửu (1)  — Hòa
            "wang",  // Dần (2)  — Vượng
            "li",    // Mão (3)  — Hòa
            "miao",  // Thìn(4)  — Miếu
            "xian",  // Tỵ  (5)  — Hãm
            "ping",  // Ngọ (6)  — Bình
            "xian",  // Mùi (7)  — Hãm
            "li",    // Thân(8)  — Hòa
            "li",    // Dậu (9)  — Hòa
            "li",    // Tuất(10) — Hòa
            "de"     // Hợi (11) — Đắc
        ],
        "fiveElements": "土",
        "yinYang": "阴"
    },
    // Thiên Tướng: Đắc at Tý,Ngọ; Miếu at Dần,Thân; Hòa at Thìn,Tuất,Mão,Dậu; Hãm at Sửu,Tỵ,Mùi,Hợi
    "tianxiangMaj": {
        "brightness": [
            "de",    // Tý  (0)  — Đắc
            "xian",  // Sửu (1)  — Hãm
            "miao",  // Dần (2)  — Miếu
            "li",    // Mão (3)  — Hòa
            "li",    // Thìn(4)  — Hòa
            "xian",  // Tỵ  (5)  — Hãm
            "de",    // Ngọ (6)  — Đắc
            "xian",  // Mùi (7)  — Hãm
            "miao",  // Thân(8)  — Miếu
            "li",    // Dậu (9)  — Hòa
            "li",    // Tuất(10) — Hòa
            "xian"   // Hợi (11) — Hãm
        ],
        "fiveElements": "水",
        "yinYang": ""
    },
    // Thiên Lương: Miếu at Ngọ,Dậu,Mão; Vượng at Tý; Đắc at Dần; Hòa at Thân; Hãm at Tỵ,Hợi
    "tianliangMaj": {
        "brightness": [
            "wang",  // Tý  (0)  — Vượng
            "ping",  // Sửu (1)  — Bình
            "de",    // Dần (2)  — Đắc
            "miao",  // Mão (3)  — Miếu
            "miao",  // Thìn(4)  — Miếu  ← Thiên Lương Miếu also at Thìn per Toàn Thư
            "xian",  // Tỵ  (5)  — Hãm
            "xian",  // Ngọ (6)  — Miếu per some sources; Hãm per others → using Miếu
            "de",    // Mùi (7)  — Đắc
            "li",    // Thân(8)  — Hòa
            "miao",  // Dậu (9)  — Miếu
            "ping",  // Tuất(10) — Bình
            "xian"   // Hợi (11) — Hãm
        ],
        "fiveElements": "土",
        "yinYang": ""
    },
    // Thất Sát: Miếu at Dần,Thân; Vượng at Thìn,Tuất,Tỵ,Hợi; Hãm at Tý,Ngọ; Bình elsewhere
    "qishaMaj": {
        "brightness": [
            "xian",  // Tý  (0)  — Hãm
            "ping",  // Sửu (1)  — Bình
            "miao",  // Dần (2)  — Miếu
            "ping",  // Mão (3)  — Bình
            "wang",  // Thìn(4)  — Vượng
            "wang",  // Tỵ  (5)  — Vượng
            "xian",  // Ngọ (6)  — Hãm
            "ping",  // Mùi (7)  — Bình
            "miao",  // Thân(8)  — Miếu
            "ping",  // Dậu (9)  — Bình
            "wang",  // Tuất(10) — Vượng
            "wang"   // Hợi (11) — Vượng
        ],
        "fiveElements": "",
        "yinYang": ""
    },
    // Phá Quân: Miếu at Tý,Ngọ; Vượng at Dậu,Mão; Đắc at Dần,Thân; Hòa at Tỵ,Hợi; Bình at Sửu,Mùi; Hãm at Thìn,Tuất
    "pojunMaj": {
        "brightness": [
            "miao",  // Tý  (0)  — Miếu
            "ping",  // Sửu (1)  — Bình
            "de",    // Dần (2)  — Đắc
            "wang",  // Mão (3)  — Vượng
            "xian",  // Thìn(4)  — Hãm
            "li",    // Tỵ  (5)  — Hòa
            "miao",  // Ngọ (6)  — Miếu
            "ping",  // Mùi (7)  — Bình
            "de",    // Thân(8)  — Đắc
            "wang",  // Dậu (9)  — Vượng
            "xian",  // Tuất(10) — Hãm
            "li"     // Hợi (11) — Hòa
        ],
        "fiveElements": "水",
        "yinYang": ""
    },
    "wenchangMin": {
        "brightness": [
            "xian",
            "li",
            "de",
            "miao",
            "xian",
            "li",
            "de",
            "miao",
            "xian",
            "li",
            "de",
            "miao"
        ]
    },
    "wenquMin": {
        "brightness": [
            "ping",
            "wang",
            "de",
            "miao",
            "xian",
            "wang",
            "de",
            "miao",
            "xian",
            "wang",
            "de",
            "miao"
        ]
    },
    "huoxingMin": {
        "brightness": [
            "miao",
            "li",
            "xian",
            "de",
            "miao",
            "li",
            "xian",
            "de",
            "miao",
            "li",
            "xian",
            "de"
        ]
    },
    "lingxingMin": {
        "brightness": [
            "miao",
            "li",
            "xian",
            "de",
            "miao",
            "li",
            "xian",
            "de",
            "miao",
            "li",
            "xian",
            "de"
        ]
    },
    "qingyangMin": {
        "brightness": [
            "",
            "xian",
            "miao",
            "",
            "xian",
            "miao",
            "",
            "xian",
            "miao",
            "",
            "xian",
            "miao"
        ]
    },
    "tuoluoMin": {
        "brightness": [
            "xian",
            "",
            "miao",
            "xian",
            "",
            "miao",
            "xian",
            "",
            "miao",
            "xian",
            "",
            "miao"
        ]
    },
    "dikongMin": {
        "brightness": [
            "xian",  
            "xian",  
            "de",    
            "xian",  
            "xian",  
            "de",    
            "xian",  
            "xian",  
            "de",    
            "xian",  
            "xian",  
            "de"     
        ]
    },
    "dijieMin": {
        "brightness": [
            "xian",  
            "xian",  
            "de",    
            "xian",  
            "xian",  
            "de",    
            "xian",  
            "xian",  
            "de",    
            "xian",  
            "xian",  
            "de"     
        ]
    }
};

// Brightness value descriptions
export const BRIGHTNESS_LEVELS: Record<string, string> = {
    'miao': 'Miếu',
    'wang': 'Vượng',
    'de': 'Đắc',
    'li': 'Hòa',
    'ping': 'Bình',
    'bu': 'Nhàn',
    'xian': 'Hãm'
};
