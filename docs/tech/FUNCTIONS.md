# Function & Engine Reference — Lịch Việt v2

> **Version:** 2.3.0 | **Updated:** April 2026
> Complete function-level reference for all calculation engines, services, hooks, and workers.

---

## 1. Engine Layer (`src/utils/`)

All engines are **pure TypeScript** — zero React dependencies. They follow: `input → pure computation → structured output`.

---

### 1.1 Calendar Engine (`calendarEngine.ts`)

The primary orchestrator for all calendar data. **Canonical source** for all Eastern domain engines.

```typescript
// Primary function — computes full day data
getDetailedDayData(date: Date): DayDetailsData

// Core conversions
getLunarDate(date: Date): LunarDate
getCanChi(date: Date): CanChiInfo       // Year/Month/Day Can-Chi
getSolarTermForDate(date: Date): string  // Tiết Khí name
getAuspiciousHours(date: Date): HourInfo[]

// Dependencies: foundationalLayer, modifyingLayer, hourEngine, canchiHelper, @dqcai/vn-lunar
```

**Output type `DayDetailsData`** includes:
- Lunar date (day, month, year, isLeapMonth)
- Can Chi for year/month/day
- Solar term (Tiết Khí)
- Trực (12 Officers) and Tú (28 Mansions)
- Auspicious/Inauspicious stars (Cát Thần, Hung Thần)
- Auspicious hours (Giờ Hoàng Đạo)
- Travel direction (Hướng Xuất Hành)

---

### 1.2 Activity Scorer (`activityScorer.ts`)

Multi-layered auspicious activity scoring system with 8 evaluation factors.

```typescript
scoreActivity(date: Date, activityId: string): ActivityScore

interface ActivityScore {
  totalScore: number         // 0-100 weighted percentage
  factors: ScoringFactor[]   // Individual factor breakdown
  label: string              // "Đại Cát ✨" | "Tốt" | "Trung Bình" | "Không Tốt" | "Đại Kỵ ⚠️"
  suitableActivities: string[]
  avoidActivities: string[]
}
```

**8 Scoring Factors:**
1. Ngọc Hạp Thông Thư (star alignment)
2. Hiệp Kỷ Biện Phương Thư (day quality)
3. Ngũ Hành (elemental compatibility)
4. Trực (12 Officers)
5. Tú (28 Mansions)
6. Sát (conflict stars)
7. Can Chi interactions
8. Seasonal modifiers

---

### 1.3 Bát Tự Engine (`baziEngine.ts`)

Four Pillars of Destiny chart generator.

```typescript
generateBaziChart(birthDate: Date, birthHour: number, gender: 'male' | 'female'): BaziChart

interface BaziChart {
  pillars: FourPillars        // Year, Month, Day, Hour pillars
  tenGods: TenGodRelation[]   // Thập Thần relationships
  hiddenStems: HiddenStem[]   // Tàng Can in each branch
  dayMaster: Element          // Nhật Chủ element
  branchInteractions: Interaction[]  // Hợp, Xung, Hình, Hại, Phá
  changShengCycle: ChangShengStage[] // Trường Sinh 12 stages
  specialStars: Star[]        // Thần Sát
  luckPillars: LuckPillar[]   // Đại Vận 10-year cycles
}

// Dependencies: calendarEngine, foundationalLayer, hourEngine, baziStars, baziConstants
```

---

### 1.4 Mai Hoa Engine (`maiHoaEngine.ts`)

Plum Blossom Numerology (Mai Hoa Dịch Số) hexagram generator.

```typescript
generateMaiHoaReading(input: MaiHoaInput): MaiHoaReading

interface MaiHoaInput {
  mode: 'time' | 'numbers'
  date?: Date
  numbers?: number[]
}

interface MaiHoaReading {
  mainHexagram: Hexagram      // Bản Quẻ
  innerHexagram: Hexagram     // Hổ Quẻ
  changedHexagram: Hexagram   // Biến Quẻ
  movingLine: number          // Hào Động
  bodyTrigram: Trigram         // Thể
  useTrigram: Trigram          // Dụng
  elementAnalysis: ElementAnalysis  // Ngũ Hành interpretation
  napGiap: NapGiapInfo        // Nạp Giáp derivation
  lucThan: LucThanInfo        // Lục Thân relationships
}
```

---

### 1.5 Tam Thức Synthesis (`tamThucSynthesis.ts`)

Orchestrator for the "Three Arts" of high-level divination.

```typescript
generateTamThucReading(date: Date, hour: number): TamThucResult

interface TamThucResult {
  thaiAt: ThaiAtBoard         // Thái Ất 16-palace cycle
  qmdj: QMDJBoard             // Kỳ Môn Độn Giáp multi-layer board
  lucNham: LucNhamBoard       // Lục Nhâm Heaven/Earth rotation
}
```

**Sub-engines:**

| Engine | File | Key Function |
|---|---|---|
| **Thái Ất** | `thaiAtEngine.ts` | `generateThaiAtBoard(date, hour)` |
| **QMDJ** | `qmdjEngine.ts` | `generateQMDJBoard(date, hour)` |
| **Lục Nhâm** | `lucNhamEngine.ts` | `generateLucNhamBoard(date, hour)` |

---

### 1.6 Flying Star Feng Shui (`flyingStarEngine.ts`)

Xuan Kong Flying Star (Huyền Không Phi Tinh) grid calculator.

```typescript
generateFlyingStarChart(period: number, facingDirection: string): FlyingStarChart

interface FlyingStarChart {
  grid: Palace[9]             // 9-palace Luo Shu grid
  periodStar: number          // Vận Tinh
  mountainStar: number[]      // Sơn Tinh
  waterStar: number[]         // Hướng Tinh
  annualStar: number[]        // Lưu Niên stars
  monthlyStar: number[]       // Lưu Nguyệt stars
  interpretation: StarComboMeaning[]
}
```

---

### 1.7 Natal Chart Calculator (`natalChartCalculator.ts`)

Western astrology natal chart wrapper around `circular-natal-horoscope-js`.

```typescript
calculateNatalChart(birthDate: Date, latitude: number, longitude: number): NatalChart

interface NatalChart {
  planets: PlanetPosition[]   // Sun, Moon, Mercury, etc.
  houses: House[]             // 12 houses with cusps
  aspects: Aspect[]           // Conjunctions, trines, squares, etc.
  patterns: AspectPattern[]   // Grand Trine, T-Square, etc.
}
```

**Related utilities:**
- `aspectPatternDetector.ts` — Detects Grand Trines, T-Squares, Yods, etc.
- `chartPatternDetector.ts` — Bowl, Bucket, Locomotive patterns
- `dignityCalculator.ts` — Essential/accidental dignities
- `skyProjection.ts` — Celestial sphere projection math
- `transitCalculator.ts` — Current transit positions
- `transitInterpreter.ts` — Transit meaning interpretation
- `houseRulerCalculator.ts` — House ruler chain analysis

---

### 1.8 Numerology Engine (`numerologyEngine.ts`)

Pythagorean and Chaldean numerology calculator.

```typescript
generateNumerologyProfile(fullName: string, birthDate: Date): NumerologyProfile

interface NumerologyProfile {
  lifePath: number            // Số Đường Đời
  expression: number          // Số Biểu Đạt
  soulUrge: number            // Số Linh Hồn
  personality: number         // Số Nhân Cách
  birthday: number            // Số Sinh Nhật
  maturity: number            // Số Trưởng Thành
  hiddenPassion: number       // Số Đam Mê Ẩn
  subconscious: number        // Số Tiềm Thức
  personalYear: number        // Năm Cá Nhân
  personalMonth: number       // Tháng Cá Nhân
  pinnacles: Pinnacle[]       // Đỉnh Cao
  challenges: Challenge[]     // Thử Thách
  letterChart: LetterValue[]  // Name letter breakdown
}
```

---

### 1.9 Dụng Sự Engine (`dungSuEngine.ts` + `dungSuSuggester.ts`)

Activity-based day quality engine with 64+ traditional activities.

```typescript
getDungSuResults(date: Date, selectedActivities: string[]): DungSuResult[]
suggestBestDates(activityId: string, month: number, year: number): SuggestedDate[]
```

---

## 2. Foundation Layers (`src/utils/`)

| File | Purpose | Key Functions |
|---|---|---|
| `foundationalLayer.ts` | JDN, solar terms (Tiết Khí), HKBPT scoring | `jdn(y,m,d)`, `getSolarTerm(jd)`, `getHKBPTScore(date)` |
| `modifyingLayer.ts` | Ngọc Hạp overlay; Trực, Tú, star calculations | `getTruc(date)`, `getTu(date)`, `getStars(date)` |
| `hourEngine.ts` | 12-hour Chinese hour system, auspicious hours | `getChineseHour(date)`, `getHoangDaoHours(date)` |
| `canchiHelper.ts` | Can-Chi conversions and branch interactions | `canChiOfYear(y)`, `canChiOfMonth(y,m)`, `canChiOfDay(jd)` |
| `constants.ts` | Static lookup tables (20KB) | Element tables, Can/Chi arrays, star catalogs |
| `baziConstants.ts` | Bazi-specific tables | Ten Gods, Hidden Stems, Trường Sinh tables |
| `baziStars.ts` | Thần Sát star calculation (30KB) | `calculateSpecialStars(chart)` |

---

## 3. Service Layer (`src/services/`)

| Service | File | Purpose |
|---|---|---|
| **Shared Core** | `sharedCore.ts` | Bridge between calendar engine and Tử Vi; ensures lunar date consistency |
| **Tử Vi** | `tuvi/` (directory) | iztro wrapper with Vietnamese interpretations, temporal overlays |
| **Bazi Interpretation** | `bazi/` | Rich Bazi narrative generation |
| **Numerology Interpretation** | `numerology/` | Numerology narrative and archetype generation |
| **Cross Validation** | `crossValidation/` | Engine-to-engine comparison testing |
| **PDF** | `pdf/` | Multi-engine PDF report generation (30-70 pages) |
| **Synastry** | `synastry/` | Compatibility analysis across engines |
| **Personalization** | `personalization/` | Daily personalized readings based on birth data |
| **Shared** | `shared/` | Common interpretation utilities |
| **Analytics** | `analyticsService.ts` | Event tracking (page views, feature usage) |
| **Geocoding** | `nominatimService.ts` | OpenStreetMap Nominatim for birth location lookup |
| **Wedding Finder** | `weddingDateFinder.ts` | Auspicious wedding date calculator |

---

## 4. Custom Hooks (`src/hooks/`)

| Hook | Purpose |
|---|---|
| `useIsMobile()` | Viewport detection (< 768px breakpoint) |
| `usePageTitle(title)` | Dynamic document title management |
| `useHolidays(year)` | Vietnamese/international holiday lookup |
| `useLunarEvents(month, year)` | Lunar calendar event detection |
| `useLocationSearch(query)` | Debounced geocoding search |
| `useNotificationPermission()` | Browser notification permission management |
| `useAnalysisDepth()` | Tier-based analysis depth control |
| `useDailyQueryLimit()` | Free-tier daily query counter |
| `useRateLimit(key, maxPerMinute)` | Client-side rate limiting |
| `useUserTier()` | Current user tier detection (Guest/Free/Trial/Premium) |

---

## 5. Web Workers (`src/workers/`)

```typescript
// engineWorker.ts — Main thread interface
postEngineTask(taskType: string, payload: unknown): Promise<unknown>

// engineWorker.worker.ts — Worker thread
// Handles: 'bazi' | 'calendar' | 'numerology' | 'maihoa' | 'tamthuc'
// Receives MessageEvent → runs engine → posts result back
```

**Usage pattern:**
```typescript
const result = await postEngineTask('bazi', { birthDate, birthHour, gender });
```

---

## 6. Static Data (`src/data/`)

| Directory/File | Content |
|---|---|
| `baziInterpretation.json` | Bazi Ten Gods, element interactions narrative |
| `numerologyInterpretation.json` | Number meanings, archetype descriptions |
| `tuvi_patterns.json` | Star combination patterns for Tử Vi |
| `interpretation/` | Shared interpretation templates |
| `lucNham/` | Lục Nhâm reference tables |
| `qmdj/` | QMDJ stars, doors, deities data |
| `thaiAt/` | Thái Ất palace data |
| `westernAstro/` | Planet meanings, aspect interpretations |
| `phase_1/` / `phase_2/` | Development phase datasets |

---

## 7. Type Definitions (`src/types/`)

| File | Contains |
|---|---|
| `calendar.ts` | `LunarDate`, `CanChiInfo`, `DayDetailsData`, `HourInfo` |
| `bazi.ts` | `BaziChart`, `FourPillars`, `TenGodRelation`, `LuckPillar` |
| `maiHoa.ts` | `Hexagram`, `Trigram`, `MaiHoaReading`, `ElementAnalysis` |
| `westernAstro.ts` | `NatalChart`, `PlanetPosition`, `Aspect`, `House` |
| `lucNham.ts` | `LucNhamBoard`, `TamTruyen`, `ThienDiaBan` |
| `qmdj.ts` | `QMDJBoard`, `QMDJCell`, `Door`, `Deity`, `Star` |
| `thaiAt.ts` | `ThaiAtBoard`, `ThaiAtPalace` |
| `synastry.ts` | `SynastryResult`, `CompatibilityScore` |
| `crossValidation.ts` | `ValidationResult`, `EngineComparison` |
| `auth.ts` | `User`, `Session`, `UserTier` |

---

> **Note:** Function signatures shown above are simplified for readability. See the actual source files for full type definitions and optional parameters.
