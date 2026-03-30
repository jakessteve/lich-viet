---
version: 1.0.0
---

# Phase 3: Tử Vi (紫微斗數) — Comprehensive Research Report

## 1. Executive Summary

Phase 3 introduces **Tử Vi Đẩu Số** (Purple Star Astrology) — the most complex and prestigious branch of Vietnamese/Chinese astrology. This research document covers the algorithmic foundations, open-source reference implementations, interpretation engine design, Phi Tinh (Flying Star) mechanics, cross-palace interaction rules, and academic references necessary to build a production-grade Tử Vi module.

---

## 2. Core Concepts Overview

### 2.1 What is Tử Vi Đẩu Số?

Tử Vi Đẩu Số is an ancient Chinese-Vietnamese astrological system that maps a person's destiny through the placement of **over 100 stars** across **12 palaces** (cung), based on their exact birth time (year, month, day, hour) and gender.

### 2.2 The 12 Palaces (Thập Nhị Cung)

| # | Cung (Hán Việt)   | Meaning                              |
|---|-------------------|--------------------------------------|
| 1 | Mệnh 命宮         | Core self, personality, destiny       |
| 2 | Huynh Đệ 兄弟宮   | Siblings, peers, partnerships         |
| 3 | Phu Thê 夫妻宮    | Marriage, spouse                      |
| 4 | Tử Tức 子女宮     | Children, creativity                  |
| 5 | Tài Bạch 財帛宮   | Wealth, finances                      |
| 6 | Tật Ách 疾厄宮    | Health, illness                       |
| 7 | Thiên Di 遷移宮   | Travel, external relationships        |
| 8 | Nô Bộc 奴僕宮    | Friends, subordinates, social network |
| 9 | Quan Lộc 官祿宮   | Career, achievements                  |
|10 | Điền Trạch 田宅宮 | Property, real estate                 |
|11 | Phúc Đức 福德宮   | Blessings, spiritual well-being       |
|12 | Phụ Mẫu 父母宮   | Parents, authority figures             |

### 2.3 The 14 Major Stars (Chính Tinh)

| Hán Việt     | Chinese | Element   | Category      | Primary Domain         |
|-------------|---------|-----------|---------------|------------------------|
| Tử Vi       | 紫微    | Âm Thổ    | Bắc Đẩu Chủ  | Leadership, authority  |
| Thiên Cơ    | 天機    | Âm Mộc    | Bắc Đẩu      | Intelligence, strategy |
| Thái Dương  | 太陽    | Dương Hỏa | Trung Thiên   | Fame, nobility         |
| Vũ Khúc     | 武曲    | Âm Kim    | Bắc Đẩu      | Finance, determination |
| Thiên Đồng  | 天同    | Dương Thủy| Bắc Đẩu      | Blessings, ease        |
| Liêm Trinh  | 廉貞    | Âm Hỏa    | Bắc Đẩu      | Passion, politics      |
| Thiên Phủ   | 天府    | Dương Thổ | Nam Đẩu Chủ  | Treasury, stability    |
| Thái Âm     | 太陰    | Âm Thủy   | Trung Thiên   | Wealth, property       |
| Tham Lang   | 貪狼    | Dương Mộc  | Bắc Đẩu      | Desire, talent         |
| Cự Môn      | 巨門    | Âm Thổ    | Bắc Đẩu      | Speech, disputes       |
| Thiên Tướng | 天相    | Dương Thủy| Nam Đẩu      | Service, appearance    |
| Thiên Lương | 天梁    | Dương Thổ | Nam Đẩu      | Longevity, protection  |
| Thất Sát    | 七殺    | Dương Kim  | Nam Đẩu      | Courage, military      |
| Phá Quân    | 破軍    | Âm Thủy   | Bắc Đẩu      | Destruction, reform    |

### 2.4 Star Brightness Levels (Miếu Vượng Đắc Hãm)

Each star has different "brightness" depending on which palace it sits in:

| Level  | Vietnamese | Effect                                        |
|--------|-----------|-----------------------------------------------|
| Miếu   | 廟       | Full power, best expression                    |
| Vượng  | 旺       | Strong, near-full power                        |
| Đắc    | 得       | Adequate, moderate expression                  |
| Lợi    | 利       | Somewhat favorable                             |
| Bình   | 平       | Neutral                                        |
| Bất Đắc| 不得     | Weak, poor expression                          |
| Hãm    | 陷       | Fallen, worst expression, negative tendencies  |

### 2.5 Auxiliary Stars (Phụ Tinh)

Beyond the 14 major stars, there are **100+ auxiliary stars** including:

- **Lục Cát Tinh** (6 Auspicious): Văn Xương, Văn Khúc, Tả Phụ, Hữu Bật, Thiên Khôi, Thiên Việt
- **Lục Sát Tinh** (6 Malefic): Kình Dương, Đà La, Hỏa Tinh, Linh Tinh, Địa Không, Địa Kiếp
- **Tứ Hóa** (4 Transformations): Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ
- **Miscellaneous**: Thiên Mã, Lộc Tồn, Đào Hoa, Hồng Loan, Thiên Hỉ, etc.

---

## 3. Calculation Algorithm (An Sao Thuật Toán)

### 3.1 Step-by-Step Chart Generation

The algorithm to generate a Tử Vi chart follows these sequential steps:

```
Step 1: Input Processing
├── Convert Solar → Lunar date (reuse Phase 1 engine)
├── Determine Can Chi of Year, Month, Day, Hour (Bát Tự)
├── Determine Gender (Âm/Dương based on gender + year stem)
└── Determine forward/reverse rotation (Thuận/Nghịch Hành)

Step 2: Determine Ngũ Hành Cục (Five Element Bureau)
├── Locate Cung Mệnh position based on birth month + hour
├── Determine Cung Thân position
├── Cross-reference Year Stem + Cung Mệnh → Ngũ Hành Cục
└── Ngũ Hành Cục determines Tử Vi star starting position

Step 3: Place Tử Vi Group Stars (An Tử Vi Hệ)
├── Tử Vi position = f(Lunar Day, Ngũ Hành Cục)
├── From Tử Vi: derive Thiên Cơ, Thái Dương, Vũ Khúc, Thiên Đồng, Liêm Trinh
└── Fixed offset pattern from Tử Vi position

Step 4: Place Thiên Phủ Group Stars (An Thiên Phủ Hệ)
├── Thiên Phủ position = mirror of Tử Vi across Dần-Thân axis
├── From Thiên Phủ: derive Thái Âm, Tham Lang, Cự Môn, Thiên Tướng, Thiên Lương, Thất Sát, Phá Quân
└── Strictly sequential placement from Thiên Phủ

Step 5: Place Auxiliary Stars
├── Văn Xương, Văn Khúc → based on Hour Stem
├── Tả Phụ, Hữu Bật → based on Birth Month
├── Thiên Khôi, Thiên Việt → based on Year Stem
├── Lộc Tồn → based on Year Stem
├── Kình Dương, Đà La → adjacent to Lộc Tồn
├── Hỏa Tinh, Linh Tinh → based on Year Branch + Hour Branch
├── Địa Không, Địa Kiếp → based on Hour Branch
└── Thiên Mã, Đào Hoa, Hồng Loan → based on Year Branch

Step 6: Apply Tứ Hóa (Four Transformations)
├── Based on Year Stem → each stem maps to 4 specific stars
├── Hóa Lộc (化祿) → wealth amplifier
├── Hóa Quyền (化權) → power amplifier
├── Hóa Khoa (化科) → fame amplifier
└── Hóa Kỵ (化忌) → conflict/obstacle

Step 7: Calculate Đại Hạn (10-Year Major Periods)
├── Starting age depends on Ngũ Hành Cục (2/3/4/5/6)
├── Direction: Thuận (male+dương year / female+âm year) or Nghịch
└── Each Đại Hạn maps to a specific palace with its own Thiên Can

Step 8: Calculate Tiểu Hạn (Annual Periods)
├── Based on Year Branch of current year
├── Starting position depends on birth year branch + gender
└── Annual palace shift follows clockwise/counter-clockwise pattern
```

### 3.2 Critical Formulas

**Cung Mệnh Determination:**
```
Cung Mệnh = (Birth Month Index + Birth Hour Index) mod 12
→ Starting from Dần (寅), count forward by birth month, then backward by birth hour
```

**Ngũ Hành Cục Lookup Table:**
Based on Thiên Can of Cung Mệnh × Địa Chi of Cung Mệnh:

| Thiên Can Group | Tý-Sửu | Dần-Mão | Thìn-Tỵ | Ngọ-Mùi | Thân-Dậu | Tuất-Hợi |
|----------------|---------|---------|---------|---------|---------|---------|
| Giáp-Kỷ       | 2 Thủy  | 6 Hỏa  | 3 Mộc   | 6 Hỏa  | 4 Kim   | 5 Thổ   |
| Ất-Canh        | 6 Hỏa  | 5 Thổ  | 4 Kim   | 3 Mộc  | 2 Thủy  | 6 Hỏa  |
| Bính-Tân       | 5 Thổ  | 3 Mộc  | 2 Thủy  | 5 Thổ  | 6 Hỏa  | 4 Kim   |
| Đinh-Nhâm      | 4 Kim  | 2 Thủy | 6 Hỏa  | 4 Kim  | 5 Thổ  | 3 Mộc   |
| Mậu-Quý        | 3 Mộc  | 4 Kim  | 5 Thổ  | 2 Thủy | 3 Mộc  | 2 Thủy  |

**Tử Vi Star Position:**
```
Position = f(Ngũ Hành Cục, Lunar Day of Birth)
→ Complex lookup table with 5 cục × 30 days
→ The number in Cục (2/3/4/5/6) represents the dividing factor
```

---

## 4. Open-Source Reference Implementations

### 4.1 `iztro` (⭐ RECOMMENDED PRIMARY REFERENCE)

| Property     | Value                                           |
|-------------|------------------------------------------------|
| Repository  | https://github.com/SylarLong/iztro             |
| Stars       | 1,400+                                          |
| License     | MIT                                             |
| Language    | TypeScript/JavaScript                           |
| NPM Package| `iztro`                                         |
| Documentation| https://docs.iztro.com                         |
| Live Demo   | https://ziwei.pub                               |

**Key Features:**
- Complete 12-palace star chart generation
- Multi-language I/O: **Vietnamese (vi-VN)**, zh-CN, zh-TW, en-US, ja-JP, ko-KR
- Chain API for star/palace queries
- Đại Hạn, Tiểu Hạn, Lưu Niên, Lưu Nguyệt, Lưu Nhật, Lưu Thời
- Dynamic stars (Lưu Diệu) for Đại Hạn and Lưu Niên
- Tứ Hóa analysis with palace-specific queries
- **Flying Star (Phi Tinh) detection** — check if a palace produces Phi Tinh to a target palace
- Tam Phương Tứ Chính (Three Harmonies + Opposition) queries
- Star brightness determination
- Configurable schools/sects (四化 and brightness can be customized)
- Plugin system for extending functionality

**API Example:**
```typescript
import { astro } from 'iztro';

// Generate chart from solar date
const chart = astro.bySolar('1990-5-15', 2, '男', true, 'vi-VN');

// Get horoscope periods
const horoscope = chart.horoscope(new Date());
// → { decadal, yearly, monthly, daily, hourly }

// Chain query: Does Tử Vi's Three Harmonies have Hóa Kỵ?
chart.star('紫微').surroundedPalaces().haveMutagen('忌');

// Check flying star between palaces
chart.palace('命宫').fliesTo('财帛', '禄');
```

### 4.2 `fortel-ziweidoushu`

| Property     | Value                                         |
|-------------|-----------------------------------------------|
| Repository  | https://github.com/airicyu/fortel-ziweidoushu |
| School      | Zhongzhou School (中州派)                       |
| License     | MIT                                           |
| Language    | JavaScript                                    |

**Features:**
- Destiny board creation (排盤)
- Board criteria checking (宮位是否存在/會見各星)
- Supports both Lunar and Solar date input
- Human-readable text input ("1990年5月15日午時男")
- JSON output format

### 4.3 Other References

| Project | URL | Notes |
|---------|-----|-------|
| `cubshuang/ZiweiDouShu` | GitHub | Simple HTML/JS/CSS chart tool |
| `ziwei-mcp` | GitHub | MCP toolkit with chart generation + visualization |
| `skirby359/tzuwei` | GitHub | Emphasizes local timezone calculation (not Beijing-only) |
| `DeepSeek-Oracle` | GitHub | LLM-powered interpretation using Tử Vi data |

---

## 5. Cross-Palace Interaction Rules (Tương Tác Giữa Các Cung)

### 5.1 Tam Hợp (Three Harmonies / Triangle Formation)

Three palaces that form an equilateral triangle on the chart interact strongly:

```
Mệnh ←→ Tài Bạch ←→ Quan Lộc    (The "Golden Triangle" of Career)
Huynh Đệ ←→ Tật Ách ←→ Điền Trạch
Phu Thê ←→ Thiên Di ←→ Quan Lộc
Tử Tức ←→ Nô Bộc ←→ Phúc Đức
```

Stars in Tam Hợp palaces mutually influence each other. For interpretation, always read the stars in the home palace TOGETHER with the stars in its two Tam Hợp palaces.

### 5.2 Đối Cung / Xung Chiếu (Opposition)

Palaces directly across the chart oppose each other:

```
Mệnh ↔ Thiên Di
Huynh Đệ ↔ Nô Bộc
Phu Thê ↔ Quan Lộc
Tử Tức ↔ Điền Trạch
Tài Bạch ↔ Phúc Đức
Tật Ách ↔ Phụ Mẫu
```

Stars in the opposing palace (Đối Cung) **must** be read when interpreting any palace.

### 5.3 Tam Phương Tứ Chính (Three Harmonies + Opposition)

The complete influence zone for any palace is:
```
Target Palace + Its 2 Tam Hợp Palaces + Its Đối Cung = 4 palaces total
```

This is the standard reading frame for Tử Vi interpretation. `iztro` provides `surroundedPalaces()` API for this.

### 5.4 Nhị Hợp (Paired Palaces)

Additional pairing based on Địa Chi harmony:
```
Tý-Sửu, Dần-Hợi, Mão-Tuất, Thìn-Dậu, Tỵ-Thân, Ngọ-Mùi
```

### 5.5 Interpretation Rules for Cross-Interactions

1. **Primary stars** in the home palace defines the palace's nature
2. **Auxiliary stars** in the home palace modify (strengthen/weaken) the primary stars
3. **Tứ Hóa** in any Tam Phương Tứ Chính palace significantly affects interpretation
4. **Đối Cung stars** act as external influences on the palace
5. **Tam Hợp stars** support or undermine the palace's themes
6. **Star combinations** (Cách Cục / 格局) create named patterns with specific meanings
   - Example: Tử Vi + Thiên Phủ = "Phủ Tướng Triều Viên" (extreme wealth + authority)
   - Example: Kình Dương + Hỏa Tinh + Linh Tinh = extreme volatility
7. **Star brightness** in the home palace vs. other palaces creates nuanced readings

---

## 6. Phi Tinh (Flying Stars) & Lưu Niên Impact

### 6.1 Phi Tinh Concept in Tử Vi

Phi Tinh (飛星) in Tử Vi context refers to the mechanism where a palace's Thiên Can (Heavenly Stem) "flies" its Tứ Hóa to other palaces. This creates dynamic connections between palaces that are NOT based on fixed geometric relationships (unlike Tam Hợp/Xung Chiếu).

**How Phi Tinh Works:**
1. Each palace on the chart has a Thiên Can (derived from the chart's setup)
2. Each Thiên Can maps to 4 specific stars that receive Hóa Lộc/Quyền/Khoa/Kỵ
3. These stars may reside in different palaces → the Thiên Can of palace A "flies" its transformations to the palaces containing those stars

**Example:**
```
If Cung Mệnh has Thiên Can = Giáp (甲)
→ Giáp maps to: Liêm Trinh (Hóa Lộc), Phá Quân (Hóa Quyền), Vũ Khúc (Hóa Khoa), Thái Dương (Hóa Kỵ)
→ If Liêm Trinh is in Cung Tài Bạch → Mệnh "flies Lộc" to Tài Bạch
→ Interpretation: native's destiny strongly supports wealth acquisition
```

### 6.2 Tứ Hóa Phi Tinh Lookup Table

| Thiên Can | Hóa Lộc  | Hóa Quyền | Hóa Khoa  | Hóa Kỵ   |
|-----------|----------|-----------|----------|----------|
| Giáp 甲  | Liêm Trinh | Phá Quân  | Vũ Khúc   | Thái Dương |
| Ất 乙    | Thiên Cơ  | Thiên Lương| Tử Vi    | Thái Âm   |
| Bính 丙  | Thiên Đồng | Thiên Cơ  | Văn Xương | Liêm Trinh |
| Đinh 丁  | Thái Âm  | Thiên Đồng | Thiên Cơ  | Cự Môn    |
| Mậu 戊   | Tham Lang | Thái Âm  | Hữu Bật  | Thiên Cơ  |
| Kỷ 己    | Vũ Khúc  | Tham Lang  | Thiên Lương| Văn Khúc  |
| Canh 庚  | Thái Dương| Vũ Khúc   | Thái Âm  | Thiên Đồng |
| Tân 辛   | Cự Môn   | Thái Dương | Văn Khúc | Văn Xương |
| Nhâm 壬  | Thiên Lương| Tử Vi    | Tả Phụ   | Vũ Khúc   |
| Quý 癸   | Phá Quân | Cự Môn    | Thái Âm  | Tham Lang  |

> [!NOTE]
> The above table follows the most common school (流派). Different schools may have variations, particularly for Tân and Quý stems. The `iztro` library supports configurable Tứ Hóa tables.

### 6.3 Lưu Niên (Annual Period) Impact

Each year, the chart gets overlaid with additional dynamic elements:

1. **Lưu Niên Cung Mệnh**: The palace that the current year's Địa Chi points to becomes the temporary "Annual Mệnh" palace
2. **Lưu Niên Tứ Hóa**: Based on the current year's Thiên Can, 4 stars receive annual Tứ Hóa transformations
3. **Lưu Niên Sao Động** (Dynamic Annual Stars): Including Lưu Xương, Lưu Khúc, Lưu Hỏa, Lưu Linh, Lưu Kình, Lưu Đà, Lưu Lộc Tồn, Lưu Khôi, Lưu Việt, etc.
4. **Double/Triple Layer Reading**: Native chart + Đại Hạn overlay + Lưu Niên overlay

### 6.4 Đại Hạn (Decadal Period) Impact

Every 10 years, the chart shifts:
1. **Đại Hạn Cung**: Determined by age range and Thuận/Nghịch direction
2. **Đại Hạn Tứ Hóa**: Based on the Thiên Can of the Đại Hạn palace
3. **Đại Hạn Sao Động**: Dynamic stars specific to the 10-year period
4. The Đại Hạn creates a **macro-level context** for interpreting annual events

---

## 7. Interpretation Engine Design

### 7.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                   Interpretation Engine                   │
├─────────────────────────────────────────────────────────┤
│  Layer 1: Palace-Level Analysis                          │
│  ├── Primary stars → base character of palace            │
│  ├── Star brightness → strength modifier                 │
│  ├── Auxiliary stars → secondary influences               │
│  └── Tứ Hóa in palace → transformation effects           │
├─────────────────────────────────────────────────────────┤
│  Layer 2: Cross-Palace Analysis                          │
│  ├── Tam Phương Tứ Chính → influence network             │
│  ├── Phi Tinh connections → dynamic links between palaces │
│  ├── Named patterns (Cách Cục) → compound meanings        │
│  └── Empty palace analysis (Không Cung)                   │
├─────────────────────────────────────────────────────────┤
│  Layer 3: Temporal Analysis                              │
│  ├── Native chart → lifetime baseline                     │
│  ├── Đại Hạn overlay → 10-year cycle                     │
│  ├── Lưu Niên overlay → annual forecast                  │
│  └── Compound interactions (native × Đại Hạn × Lưu Niên) │
├─────────────────────────────────────────────────────────┤
│  Layer 4: Output Generation                              │
│  ├── Modern Vietnamese language description               │
│  ├── Hán Việt terminology preservation                    │
│  └── Cross-reference citations to academic sources        │
└─────────────────────────────────────────────────────────┘
```

### 7.2 Data-Driven Interpretation Rules

The interpretation engine should use **JSON-based rule definitions**, not hardcoded logic:

```typescript
// Example interpretation rule structure
interface InterpretationRule {
  id: string;
  stars: string[];              // Stars required to trigger
  palace?: string;              // Optional palace constraint
  brightness?: string[];        // Optional brightness constraint
  auxiliaryStars?: string[];    // Optional auxiliary star modifiers
  tuHoa?: string[];            // Optional Tứ Hóa constraint
  interpretation: {
    vi: string;                 // Vietnamese explanation
    aspect: string;             // Life aspect affected
    valence: 'positive' | 'negative' | 'neutral';
    intensity: number;          // 1-10 scale
  };
  source: string;              // Academic reference
}
```

### 7.3 Named Patterns (Cách Cục / 格局)

In Tử Vi Đẩu Số, "Cách Cục" refers to specific combinations of stars within a palace or across its Tam Phương Tứ Chính (Three Harmonies and Opposition). These patterns are profoundly important for accurate interpretation and are documented in classical texts like *Thái Vi Phú* (太微赋) and *Cốt Tủy Phú* (骨髓赋) within the *Tử Vi Đẩu Số Toàn Thư*. There are hundreds of named patterns, classified into Auspicious (Cát cách) and Inauspicious (Hung/Ác cách).

#### 7.3.1 Major Star Combinations (Các Cách Cục Chính)

1. **Sát Phá Lang (杀破狼 / Sát Phá Tham):**
   - **Composition:** Thất Sát (七杀), Phá Quân (破军), Tham Lang (贪狼).
   - **Structure:** These three stars always assemble in the Tam Hợp (Three Harmonies) configuration. When one is in the Mệnh palace, the other two will reside in the Tài Bạch (Wealth) and Quan Lộc (Career) palaces.
   - **Characteristics:** Highly dynamic, represents action, pioneering spirit, and major life changes. Individuals with this chart are often assertive, risk-taking, and suited for unchartered territories or physical/military/business environments. This chart often indicates a life of fluctuations, requiring strong guiding stars (Cát tinh) or Tứ Hóa to channel the energy positively.

2. **Cơ Nguyệt Đồng Lương (机月同梁):**
   - **Composition:** Thiên Cơ (天机), Thái Âm (太阴), Thiên Đồng (天同), Thiên Lương (天梁).
   - **Structure:** Gathered in the Mệnh, Tài Bạch, Quan Lộc, or Thiên Di palaces.
   - **Characteristics:** The opposite of Sát Phá Lang. Represents stability, intellect, planning, and civil administration. Individuals are methodical, intelligent, and suited for structured environments like government, education, or corporate management. Classical texts note this combination as highly favorable for steady careers.

3. **Cự Nhật Đồng Cung (巨日同宫):**
   - **Composition:** Cự Môn (巨门) and Thái Dương (太阳).
   - **Structure:** Both stars residing in the exact same palace (Đồng Cung), best placed in the Dần (寅 - Tiger) or Thân (申 - Monkey) palaces.
   - **Characteristics:** Thái Dương (Sun) provides light, dispelling the "darkness" and controversy associated with Cự Môn. This creates a highly articulate, persuasive personality with leadership potential. Ideal for lawyers, educators, and diplomats. The placement in Dần is superior because the Sun is rising, offering more vitality.

#### 7.3.2 Comprehensive Catalog of Notable Patterns (Các Cách Cục Quan Trọng)

Based on *Tử Vi Đẩu Số Toàn Thư* and cross-referenced with modern interpretations, the following patterns are critical for the interpretation engine:

**Category 1: Wealth, Nobility, and Leadership (Phú Quý & Quyền Lực)**
- **Tử Phủ Đồng Cung (紫府同宫):** Tử Vi and Thiên Phủ in Dần/Thân. Ultimate authority, wealth, and longevity, though sometimes lonely at the top.
- **Tử Phủ Triều Viên (紫府朝垣):** Tử Vi and Thiên Phủ in the San Fang Si Zheng (Three Harmonies) shining on the Life palace. High status and steady wealth.
- **Quân Thần Khánh Hội (君臣庆会):** Tử Vi in Mệnh, aided by Tả Phụ, Hữu Bật, Văn Xương, Văn Khúc. "Emperor with his ministers" - signifies great leadership and widespread support.
- **Phủ Tướng Triều Viên (府相朝垣):** Thiên Phủ and Thiên Tướng harmonizing with the Life palace. Superior managerial ability, steady wealth, "eating the royal salary."
- **Cự Nhật Đồng Cung (巨日同宫) / Quan Phong Tam Đại:** Cự Môn + Thái Dương in Dần. Eloquence, fame before wealth, multi-generational government service.
- **Cực Hướng Ly Minh (极向离明格):** Tử Vi in Ngọ (South/Fire). The Emperor at the zenith. Supreme noble destiny.
- **Lộc Mã Giao Trì (禄马交驰):** Lộc Tồn (or Hóa Lộc) matching with Thiên Mã. Wealth accumulated through travel, business, and dynamic movement.
- **Song Lộc Triều Viên / Lộc Hợp Uyên Ương (双禄朝垣 / 禄合鸳鸯):** Lộc Tồn and Hóa Lộc gathering in the Mệnh or its harmonies. Immense lifelong wealth and financial fortune.
- **Quyền Lộc Tuần Phùng (权禄巡逢格):** Mệnh encounters both Hóa Quyền and Hóa Lộc. Power and wealth surging in parallel.
- **Tam Kỳ Gia Hội (三奇加会格):** Hóa Khoa, Hóa Quyền, Hóa Lộc all present in the Three Harmonies. The ultimate protagonist aura—fame, power, and wealth combined.

**Category 2: Academic, Intelligence, and Fame (Học Thuật & Danh Tiếng)**
- **Nhật Chiếu Lôi Môn / Nhật Xuất Phù Tang (日照雷门 / 日出扶桑):** Thái Dương in Mão. "The Sun rising from the East." Glorious youth, early success, vitality, and noble presence.
- **Nguyệt Lãng Thiên Môn (月朗天门 / 月生沧海):** Thái Âm in Hợi. "Full moon at the gateway of heaven." High intelligence, grace, massive wealth, perfect for night-born individuals.
- **Minh Châu Xuất Hải (明珠出海格):** Mệnh in Mùi (empty), Thái Dương in Mão, Thái Âm in Hợi. "Bright pearl emerging from the sea." Literary talent, fame, and rapid ascension.
- **Dương Lương Xương Lộc (阳梁昌禄格):** Thái Dương, Thiên Lương, Văn Xương, Lộc Tồn. The absolute best pattern for academic examinations, civil service, and national competitions.
- **Thạch Trung Ẩn Ngọc (石中隐玉):** Cự Môn in Tý/Ngọ. "Jade hidden in stone." Late bloomer, requires hard work and polishing, but achieves profound depth and wealth in middle age.
- **Văn Quế Văn Hoa (文桂文华格):** Văn Xương and Văn Khúc in Sửu/Mùi. Extraordinary artistic, literary, and academic talent.

**Category 3: Dynamic, Martial, and Special Forces (Võ Nghiệp & Đột Phá)**
- **Tham Vũ Đồng Hành (贪武同行):** Tham Lang and Vũ Khúc in the 4 Tombs (Thìn, Tuất, Sửu, Mùi). Late prospering (after 30). Immense wealth through business or military command. Must avoid early complacency.
- **Tham Hỏa Tương Phùng / Tham Linh Triều Viên (火贪/铃贪格):** Tham Lang meeting Hỏa Tinh or Linh Tinh. "Sudden explosive wealth" (Hoạch phát). Military hero or sudden windfall in business, but volatile.
- **Thất Sát Triều Đẩu / Ngưỡng Đẩu (七杀朝斗 / 仰斗):** Thất Sát in Tý/Ngọ/Dần/Thân. "Facing the Big Dipper." High command, great military or entrepreneurial power, solitary but supremely capable.
- **Mã Đầu Đới Tiễn (马头带箭):** Kình Dương at Ngọ (with Tham Lang or Thiên Đồng/Thái Âm). "Arrow on the horse's head." Danger turning into incredible victory; commanding at the border, immense wealth through high-risk environments.
- **Quyền Sát Hóa Lộc:** Sát stars (Kình, Đà, Hỏa, Linh) meeting Thất Sát, Hóa Lộc, Hóa Quyền. "Out of the jaws of death into immense glory." Highly dangerous but yields peerless command if survived.

*Note: For the Interpretation Engine, every pattern requires a validation of "No Sát Tinh" (Kình, Đà, Không, Kiếp, Hỏa, Linh, Kỵ) to be considered pure ("Thượng Cách"). If Sát stars intrude, it becomes a "Phá Cách" (Broken Pattern), creating obstacles or reducing the grade.*

---

## 8. Academic & Authoritative References

### 8.1 Classical Texts

| Title | Chinese | Author/Era | Relevance |
|-------|---------|------------|-----------|
| Tử Vi Đẩu Số Toàn Thư | 紫微斗數全書 | Compiled by Lưu Cơ (明代) | **Primary reference** for star placement algorithms. The "gold standard" of Tử Vi. |
| Đẩu Số Toàn Thư (annotated) | 斗數全書 (校注) | Various modern annotators | Modern interpretation of classical rules |
| Tử Vi Đẩu Số Tân Biên | — | Vương Đình Chi (王亭之) | Zhongzhou school interpretation techniques |
| Thái Vi Phú | 太微賦 | Classical | Rules for star combination readings |
| Hình Tính Phú | 形性賦 | Classical | Star character descriptions |
| Cốt Tủy Phú | 骨髓賦 | Classical | Advanced interpretation rules |

### 8.2 Modern Reference Books

| Title | Author | Notes |
|-------|--------|-------|
| Tử Vi Đẩu Số Tinh Giải | (Various Vietnamese authors) | Modern Vietnamese interpretation guides |
| Understanding the Purple Star | Various | English-language introductions |
| 紫微斗数讲义 (Lecture Notes)| Various Chinese academics | Systematic algorithm documentation |
| Tử Vi Áp Dụng | Nguyễn Phát Lộc | Vietnamese practical application |
| Tử Vi Đẩu Số Tường Giải | — | Detailed Vietnamese explanatory texts |

### 8.3 Online Academic Resources

- **iztro Documentation (docs.iztro.com)**: Comprehensive algorithm documentation, star knowledge base, and 紫微斗数全书 digitized excerpts
- **amlich.vn**: Vietnamese lunisolar calendar and Tử Vi reference
- **huyenhocvietnam.vn**: Vietnamese metaphysics academic portal
- **tuvisohoc.blog**: Systematic Tử Vi study blog with algorithm documentation
- **CSDN Blog Posts**: Chinese-language algorithm implementation guides (紫微斗数排盘算法)

---

## 9. Feature List (Tổng Hợp Tính Năng)

### 9.1 Input Section (Phần Nhập Liệu)

- [ ] Solar date picker (Ngày Dương Lịch) — primary
- [ ] Lunar date picker (Ngày Âm Lịch) — secondary option
- [ ] Birth hour selector (12 Thời Thần: Tý → Hợi)
- [ ] Gender selector (Nam/Nữ)
- [ ] Birth location input (for future timezone/local solar time calculation)
- [ ] Auto-fill current date/time for quick testing
- [ ] Validation with clear error messages in Vietnamese

### 9.2 Chart Output — Standard Tử Vi Table Layout (Lá Số Tử Vi)

> [!IMPORTANT]
> The chart **must** follow the universally recognized Tử Vi table format used by all major online platforms (ziwei.pub, tuvi.vn, xem-tuvi.com, lyso.vn). This is a **4×4 outer grid** with the **center 2×2 cells merged** into a single information panel.

#### 9.2.1 Grid Layout Structure (Standard Format)

The chart is arranged as a 4×4 CSS Grid. The 12 outer cells represent the 12 palaces, and the inner 2×2 block is merged into a central info panel. Palace positions are **fixed** on the grid (they follow the Địa Chi / Earthly Branch positions):

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│              │              │              │              │
│   Cung Tỵ    │   Cung Ngọ   │   Cung Mùi   │   Cung Thân  │
│   (col1,r1)  │   (col2,r1)  │   (col3,r1)  │   (col4,r1)  │
│              │              │              │              │
├──────────────┼──────────────┴──────────────┼──────────────┤
│              │                             │              │
│   Cung Thìn  │      ★ THÔNG TIN CHÍNH ★    │   Cung Dậu   │
│   (col1,r2)  │     (center, spans 2×2)     │   (col4,r2)  │
│              │                             │              │
├──────────────┤   Họ tên, giới tính, Cục    ├──────────────┤
│              │   Ngày sinh, giờ sinh       │              │
│   Cung Mão   │   Tứ Trụ (Bát Tự)          │   Cung Tuất  │
│   (col1,r3)  │   Mệnh chủ, Thân chủ       │   (col4,r3)  │
│              │   Lưu niên / Đại hạn info   │              │
├──────────────┼──────────────┬──────────────┼──────────────┤
│              │              │              │              │
│   Cung Dần   │   Cung Sửu   │   Cung Tý    │   Cung Hợi   │
│   (col1,r4)  │   (col2,r4)  │   (col3,r4)  │   (col4,r4)  │
│              │              │              │              │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

#### 9.2.2 Palace Cell Content (Anatomy of Each Cell)

Each of the 12 palace cells displays the following information, organized from top to bottom:

```
┌─────────────────────────────────────┐
│ ★ Chính Tinh (bold, large)    [Miếu]│  ← Primary star(s) + brightness
│ Phụ Tinh 1  Phụ Tinh 2        [Hóa]│  ← Auxiliary stars + Tứ Hóa tags
│ Phụ Tinh 3  Phụ Tinh 4             │  ← More auxiliary stars
│                                     │
│ Lưu Diệu (smaller, different color)│  ← Dynamic period stars
│                                     │
│ ─────────────────────────────────── │  ← Separator line
│ [Cát/Hung]  Đại Hạn: 22-31    [Can] │  ← Metadata row
│ 宮名 PALACE NAME          Địa Chi  │  ← Palace name (Hán Việt) + Địa Chi
└─────────────────────────────────────┘
```

**Detailed cell content breakdown:**

| Zone | Content | Example |
|------|---------|---------|
| Top area | Chính Tinh names, bold, primary color | **Tử Vi** ㊟ **Tham Lang** |
| Top-right | Brightness badge (Miếu/Vượng/Đắc/Hãm) | `Miếu` `Vượng` |
| Middle area | Phụ Tinh names, smaller font | Tả Phụ, Văn Xương, Thiên Mã |
| Tứ Hóa tags | Inline colored badges next to star name | <span style="color:green">Lộc</span> <span style="color:purple">Quyền</span> <span style="color:blue">Khoa</span> <span style="color:red">Kỵ</span> |
| Dynamic stars | Lưu Niên/Đại Hạn dynamic stars, muted color | _Lưu Lộc_, _Lưu Kình_ |
| Bottom bar | Đại Hạn age range, Can-Chi of palace | `22 - 31` `Giáp Dần` |
| Footer | Palace name in Hán Việt (bold) | **Cung Mệnh** / **命宮** |

#### 9.2.3 Color Scheme for Stars

| Star Category | Color | CSS Variable |
|--------------|-------|-------------|
| Chính Tinh (Major) | Deep purple / dark blue | `--star-major` |
| Cát Tinh (Auspicious) | Green / teal | `--star-auspicious` |
| Sát Tinh (Malefic) | Red / crimson | `--star-malefic` |
| Hóa Lộc | Green | `--hua-lu` |
| Hóa Quyền | Purple | `--hua-quyen` |
| Hóa Khoa | Blue | `--hua-khoa` |
| Hóa Kỵ | Red | `--hua-ky` |
| Lưu Diệu (Dynamic) | Muted / gray-blue | `--star-dynamic` |
| Cung Mệnh highlight | Gold border / background | `--palace-menh` |
| Cung Thân highlight | Silver border | `--palace-than` |

#### 9.2.4 Center Info Panel Content

The center 2×2 merged area displays:

| Info | Example |
|------|---------|
| Họ tên (Name) | Nguyễn Văn A |
| Giới tính (Gender) | Nam |
| Ngũ Hành Cục | Thủy Nhị Cục |
| Tuổi (Age) | 36 tuổi |
| Tứ Trụ (Four Pillars) | Canh Ngọ - Mậu Dần - Bính Tý - Giáp Ngọ |
| Ngày ÂL (Lunar) | Năm Canh Ngọ, tháng Giêng, ngày Mùng 5 |
| Ngày DL (Solar) | 1990-01-01 |
| Giờ sinh (Birth hour) | Giờ Tý (00:00-01:00) |
| Mệnh chủ | Liêm Trinh |
| Thân chủ | Thiên Cơ |
| Mệnh cung | Sửu |
| Thân cung | Mùi |
| Phi Tinh lines | Visual lines connecting flying star palaces |
| Đại Hạn / Lưu Niên selector | Interactive controls for temporal overlays |

#### 9.2.5 CSS Grid Implementation

```css
/* Standard Tử Vi chart grid */
.tuvi-chart {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 1px;
  aspect-ratio: 1 / 1;  /* Square chart */
  max-width: 960px;
  margin: 0 auto;
}

/* Center info panel spans 2×2 */
.tuvi-center {
  grid-column: 2 / 4;
  grid-row: 2 / 4;
}

/* Each palace cell */
.tuvi-palace {
  border: 1px solid var(--border-color);
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.75rem;
  min-height: 120px;
}
```

#### 9.2.6 Reference Screenshots

> [!TIP]
> The ziwei.pub implementation (powered by iztro) is the gold standard reference for layout. Key observations from the live demo:
> - Stars are color-coded by type (purple for major, green for auspicious, red for malefic)
> - Tứ Hóa shown as inline colored badges (Lộc/Quyền/Khoa/Kỵ)
> - Đại Hạn age ranges shown at bottom-left of each cell
> - Palace Can-Chi shown at bottom-right
> - Palace name in large bold text at very bottom
> - Center panel includes basic info + temporal overlay controls
> - Phi Tinh connections shown as diagonal lines across the center panel
> - Supports keyboard shortcuts: Shift+D for download, Shift+S for save

#### 9.2.7 Feature Checklist

- [ ] 4×4 CSS Grid layout with center 2×2 merged info panel
- [ ] 12 palace cells positioned by Địa Chi (Dần at bottom-left, counter-clockwise)
- [ ] All 14 chính tinh placement with brightness indicators (Miếu/Vượng/Đắc/Hãm)
- [ ] 100+ phụ tinh placement with smaller font
- [ ] Tứ Hóa inline colored badges (Lộc/Quyền/Khoa/Kỵ) on affected stars
- [ ] Cung Mệnh highlighted with gold border/background
- [ ] Cung Thân highlighted with silver border
- [ ] Ngũ Hành Cục displayed in center panel
- [ ] Đại Hạn age ranges on each palace bottom-left
- [ ] Can-Chi and Ngũ Hành for each palace bottom-right
- [ ] Star color-coding: Chính Tinh / Cát Tinh / Sát Tinh / Tứ Hóa
- [ ] Center info panel: Name, gender, birth info, Cục, Mệnh/Thân position
- [ ] Responsive design: scales down for tablet/mobile (scroll horizontal if needed)
- [ ] Dark mode support matching Phase 1/2 aesthetics
- [ ] Square aspect ratio (1:1) for professional chart appearance

### 9.3 Detailed Explanation Engine (Luận Giải Chi Tiết)

- [ ] Per-palace interpretation with modern Vietnamese
- [ ] Cross-palace interaction analysis (Tam Phương Tứ Chính)
- [ ] Named pattern (Cách Cục) detection and explanation
- [ ] Star combination effect descriptions
- [ ] Star brightness impact on interpretation
- [ ] Empty palace (Không Cung) analysis
- [ ] Cung Mệnh primary reading
- [ ] Cung Thân supplementary reading
- [ ] All 12 palaces individual summaries

### 9.4 Phi Tinh & Temporal Analysis

- [ ] Phi Tinh connections visualization
- [ ] Đại Hạn period selector (view any 10-year period)
- [ ] Lưu Niên year selector (view any specific year)
- [ ] Dynamic stars overlay on chart for selected period
- [ ] Lưu Niên Tứ Hóa impact analysis
- [ ] Combined reading: Native + Đại Hạn + Lưu Niên
- [ ] Annual forecast summary in modern Vietnamese

### 9.5 Chart Export & Download (Xuất Lá Số)

> [!IMPORTANT]
> The chart **must** support export/download as a PNG image. This is a core feature requested by users who want to save, print, or share their Tử Vi chart.

#### 9.5.1 Export Requirements

- [ ] **Download as PNG** — single-click button to download the full chart as a high-resolution PNG image
- [ ] **Download button** — visible button labeled "Tải lá số (PNG)" with download icon, placed near the chart
- [ ] **Keyboard shortcut** — Shift+D to trigger download (matching ziwei.pub convention)
- [ ] **Full chart capture** — the exported image includes the entire 4×4 grid + center info panel
- [ ] **High resolution** — export at 2x pixel ratio for crisp rendering on retina displays
- [ ] **Clean export** — exclude UI controls (buttons, selectors) from the exported image; only the chart itself
- [ ] **Filename convention** — auto-name file as `tuvi_{name}_{birthdate}.png` (e.g., `tuvi_NguyenVanA_1990-01-01.png`)
- [ ] **Watermark** — subtle "Lunar Calendar V2" watermark at bottom-right corner of exported image

#### 9.5.2 Technical Approach — `html2canvas`

The recommended library for React component → PNG export is **`html2canvas`** (or the lighter **`dom-to-image-more`**):

```typescript
import html2canvas from 'html2canvas';

async function exportChartAsPng(chartRef: HTMLElement, filename: string) {
  const canvas = await html2canvas(chartRef, {
    scale: 2,                    // 2x for retina
    backgroundColor: '#ffffff',  // Ensure white background
    useCORS: true,               // Handle cross-origin images
    logging: false,
  });
  
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
```

**Alternative: `dom-to-image-more`** (fork of dom-to-image with better support):
```typescript
import domtoimage from 'dom-to-image-more';

async function exportChartAsPng(chartRef: HTMLElement, filename: string) {
  const blob = await domtoimage.toBlob(chartRef, {
    width: chartRef.offsetWidth * 2,
    height: chartRef.offsetHeight * 2,
    style: { transform: 'scale(2)', transformOrigin: 'top left' },
  });
  
  const link = document.createElement('a');
  link.download = filename;
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}
```

| Library | Size | Pros | Cons |
|---------|------|------|------|
| `html2canvas` | ~40KB | Most popular, well-tested, handles complex CSS | Larger bundle, doesn't support all CSS (e.g., `filter`) |
| `dom-to-image-more` | ~15KB | Smaller, SVG-based, better CSS support | Less battle-tested |
| `modern-screenshot` | ~10KB | Newest, ESM-native, good CSS support | Least mature |

#### 9.5.3 Export UI Design

```
┌─────────────────────────────────────────────┐
│  [📥 Tải lá số (PNG)]  [📋 Sao chép]  [🔗 Chia sẻ] │
└─────────────────────────────────────────────┘
                    ↕
┌─────────────────────────────────────────────┐
│              TỬ VI CHART HERE               │
│           (ref={chartRef} for export)        │
└─────────────────────────────────────────────┘
```

### 9.6 Additional Features (Discovered During Research)

- [ ] Tử Vi compatibility analysis (compare two charts)
- [ ] Personalized day view integration (Phase 4 preparation)
- [ ] Bookmark/save multiple charts (localStorage)
- [ ] Share chart via URL parameters (encode birth data in URL hash)
- [ ] Print-optimized CSS (@media print) for direct browser printing
- [ ] Copy chart to clipboard (for pasting into chat/docs)

---

## 10. Technical Integration Strategy

### 10.1 Recommended Approach

| Component | Strategy | Rationale |
|-----------|----------|-----------|
| **Calculation Engine** | Use `iztro` npm package as foundation | MIT license, 1.4k+ stars, active maintenance, Vietnamese support built-in, comprehensive API |
| **Star Data** | Leverage `iztro` built-in data + supplement with custom Vietnamese interpretations | iztro provides all star placement; we add Vietnamese interpretation text |
| **Interpretation Engine** | Custom-built using JSON rule database | No existing library provides Vietnamese interpretation text |
| **Chart Rendering** | Custom React component with CSS Grid | Standard 4×4 grid (center 2×2 merged) with responsive design matching Phase 1/2 aesthetics |
| **Chart Export** | `html2canvas` or `dom-to-image-more` | Proven libraries for DOM-to-PNG conversion; `html2canvas` is most battle-tested |
| **Phi Tinh Analysis** | Extend `iztro`'s flying star API | iztro already supports `fliesTo()` and `palace().flyStar()` |
| **Temporal Overlays** | Use `iztro`'s `horoscope()` API | Built-in support for Đại Hạn through Lưu Thời |

### 10.2 Integration with Existing Codebase

The Phase 1 calendar engine already provides:
- Solar ↔ Lunar conversion
- Can-Chi calculation for Year/Month/Day/Hour
- Ngũ Hành system
- Tiết Khí computation

These will be reused for input processing. The `iztro` library handles the complex star placement algorithms independently, taking solar/lunar dates as input.

### 10.3 Localization Strategy

| Layer | Language | Example |
|-------|----------|---------|
| Star names | Hán Việt | Tử Vi, Thiên Cơ, Thái Dương |
| Palace names | Hán Việt | Cung Mệnh, Cung Tài Bạch |
| Technical terms | Hán Việt | Đại Hạn, Tiểu Hạn, Lưu Niên |
| Interpretations | Modern Vietnamese | "Người có Tử Vi tọa thủ Cung Mệnh ở thế Miếu Vượng thường mang khí chất lãnh đạo..." |
| UI labels | Vietnamese | "Nhập ngày sinh", "Chọn giờ sinh" |

---

## 11. Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| `iztro` calculation differs from Vietnamese tradition | High | Cross-verify with 紫微斗数全书 rules; iztro is configurable |
| Different schools (流派) have different Tứ Hóa tables | Medium | Use iztro's configuration system; default to most common school |
| Interpretation text quality / accuracy | High | Source from established texts; use JSON rules for reviewability |
| Chart rendering complexity (4×3 grid with many data points) | Medium | Phased approach: layout first, then populate data |
| Performance with 100+ star calculations | Low | iztro is optimized; runs in < 50ms |
| Local solar time calculation for birth location | Low | Defer to Phase 4; use standard timezone initially |

---

## 12. Next Steps

1. **Create SOT.md** — Source of Truth for Phase 3 logic rules
2. **Create SDP.md** — Software Design Proposal with component architecture
3. **Create USER_STORIES.md** — User stories with Gherkin BDD scenarios
4. **Create TRACEABILITY.md** — Requirement → Story → Test mapping
5. **Begin Implementation** — Following the Epic structure from Phase 2
