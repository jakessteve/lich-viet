# Technical Architecture — Lịch Việt v2

> **Version:** 2.3.0 | **Updated:** April 2026
> **Source of Truth** for all agents and LLMs working on this project.

---

## 1. Overview

Lịch Việt v2 is a **client-side Single Page Application (SPA)** — there is no backend server. All computation runs entirely in the browser. The application is structured in three layers: **UI → State → Engine**.

The app provides solar–lunar date conversion, auspicious day analysis, and **nine Eastern/Western divination engines** — all running entirely client-side as a React SPA with Web Worker offloading for heavy computations.

---

## 2. Technology Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | React + TypeScript | 19.x + 5.9 |
| **Build Tool** | Vite | 7.3.x |
| **Styling** | Tailwind CSS v4 + Vanilla CSS | 4.2.x |
| **State Management** | Zustand | 5.0.x |
| **Routing** | React Router DOM | 7.13.x |
| **Validation** | Zod | 4.3.x |
| **Testing** | Vitest + JSDOM + Playwright | 4.0.x |
| **Linting** | ESLint 10 (flat config) + Prettier 3 | 10.x |
| **PWA** | vite-plugin-pwa + Service Worker | 1.2.x |
| **CI** | GitHub Actions | — |

### Key External Libraries

| Library | Purpose |
|---|---|
| `iztro` | Tử Vi (Purple Star) astrology engine |
| `@dqcai/vn-lunar` | Vietnamese Lunar Calendar calculations |
| `circular-natal-horoscope-js` | Western natal chart calculations |
| `leaflet` | Interactive map rendering |
| `html-to-image` | Image/PDF export |
| `lunar-javascript` | Additional lunar calendar utilities |

---

## 3. High-Level Architecture

```mermaid
graph TB
    subgraph Browser["Browser (SPA — No Backend)"]
        direction TB
        UI["🖥️ React 19 Components"]
        Router["🔀 React Router v7"]
        Store["📦 Zustand Stores"]
        Workers["⚙️ Web Workers"]
    end

    subgraph Pages["📱 Route Pages"]
        P0["📅 Hàng Ngày<br/>(Personalized Daily)"]
        P1["📅 Âm Lịch<br/>(Lunar Calendar)"]
        P2["🔮 Gieo Quẻ<br/>(Mai Hoa + Tam Thức)"]
        P3["⭐ Tử Vi<br/>(Eastern Astrology)"]
        P4["🌟 Chiêm Tinh<br/>(Western Astrology)"]
        P5["🔢 Thần Số Học<br/>(Numerology)"]
        P6["💕 Hợp Lá<br/>(Synastry)"]
    end

    subgraph Engines["🧮 Calculation Engines (Pure TS, Zero React)"]
        E1["calendarEngine"]
        E2["maiHoaEngine + tamThucSynthesis"]
        E3["tuViEngine (iztro wrapper)"]
        E4["natalChartCalculator"]
        E5["numerologyEngine"]
        E6["baziEngine"]
        E7["flyingStarEngine"]
        E8["qmdjEngine + thaiAtEngine + lucNhamEngine"]
    end

    subgraph Layers["📐 Foundation Layers"]
        L1["foundationalLayer<br/>(JDN, Solar Terms, HKBPT)"]
        L2["modifyingLayer<br/>(Ngọc Hạp Thông Thư)"]
        L3["hourEngine<br/>(Auspicious Hours)"]
        L4["canchiHelper<br/>(Can Chi Conversions)"]
        L5["constants.ts<br/>(Static Lookup Tables)"]
    end

    subgraph Data["📚 Static Data"]
        D1["Star Catalogs (JSON)"]
        D2["Interpretation Data (JSON)"]
        D3["Palace Meanings"]
        D4["Numerology Tables"]
    end

    subgraph External["🌐 External Libraries"]
        X1["@dqcai/vn-lunar"]
        X2["iztro"]
        X3["circular-natal-horoscope-js"]
    end

    UI --> Router --> Pages
    UI --> Store
    Pages --> Engines
    Engines --> Layers
    Layers --> Data
    Pages -.-> Workers

    E1 --> L1 & L2 & L3 & X1
    E6 --> E1 & L1 & L3
    E2 --> E1
    E8 --> L1 & L3
    E3 --> X2
    E4 --> X3
    E5 --> L5
    E7 --> L5

    style Browser fill:#1a1a2e,stroke:#16213e,color:#e94560
    style Engines fill:#0f3460,stroke:#16213e,color:#e9e9e9
    style Layers fill:#533483,stroke:#16213e,color:#e9e9e9
    style Data fill:#2d2d44,stroke:#16213e,color:#e9e9e9
```

---

## 4. Source Directory Layout

```
Lịch Việt v2/
├── src/                        # Application source
│   ├── App.tsx                 # Root component (routing + layout)
│   ├── main.tsx                # React DOM entry point
│   ├── index.css               # Design system tokens (800 lines)
│   ├── components/             # React UI components (by feature)
│   │   ├── layout/             # AppNav, AppSidebar, MobileDrawer, AppFooter
│   │   ├── shared/             # 39 reusable components
│   │   ├── pages/              # Route page components
│   │   ├── Calendar/           # Month/Day calendar views
│   │   ├── Bazi/               # Bát Tự chart display
│   │   ├── TuVi/               # Tử Vi palace grid
│   │   ├── ChiemTinh/          # Western natal chart
│   │   ├── Numerology/         # Numerology analysis view
│   │   ├── MaiHoa/             # Plum Blossom hexagram
│   │   ├── TamThuc/            # QMDJ + Thái Ất + Lục Nhâm
│   │   ├── FengShui/           # Flying Star grid
│   │   ├── GieoQue/            # Divination container
│   │   ├── LichDungSu/         # Activity calendar
│   │   ├── CrossValidation/    # Cross-engine comparison
│   │   └── auth/               # Login/Register guards
│   ├── config/                 # App-wide configuration
│   │   ├── api.ts              # API endpoint config
│   │   ├── formConstants.ts    # Form field constants
│   │   ├── scoring.ts          # Activity scoring config
│   │   └── theme.ts            # Score label/color mapping
│   ├── data/                   # Static JSON datasets (7 subdirs)
│   ├── hooks/                  # 11 custom React hooks
│   ├── i18n/                   # Vietnamese translations
│   ├── router/                 # Route definitions + lazy imports
│   ├── services/               # Business logic services (9 subdirs)
│   ├── stores/                 # Zustand state (app, auth, credit)
│   ├── styles/                 # Feature-specific CSS (7 files)
│   ├── types/                  # Shared TypeScript definitions (12 files)
│   ├── utils/                  # Core calculation engines (42 files)
│   ├── workers/                # Web Workers (engineWorker)
│   └── packages/               # Vendored library shims
│       ├── iztro/              # iztro type shims
│       ├── vn-lunar/           # vn-lunar shims
│       └── circular-natal-horoscope/ # CNH shims
├── packages/                   # Monorepo packages
│   ├── core/                   # @lich-viet/core (engine re-exports)
│   └── types/                  # @lich-viet/types (shared types)
├── test/                       # Centralized test suite
│   ├── phase_1/ → phase_4/    # Tests by development phase
│   ├── integration/            # Cross-module integration tests
│   ├── performance/            # Performance benchmarks
│   ├── snapshot/               # Snapshot regression tests
│   ├── hooks/                  # Hook tests
│   ├── services/               # Service tests
│   ├── stores/                 # Store tests
│   ├── utils/                  # Utility tests
│   └── *-battle-test.test.ts   # Edge-case battle tests (8 files)
├── scripts/                    # Build/validation scripts
├── docs/                       # Documentation
│   ├── tech/                   # Technical architecture docs
│   ├── biz/                    # Business docs
│   ├── log/                    # Sprint/incident logs
│   └── archive/                # Historical phase documents
└── public/                     # Static assets (icons, fonts, SW)
```

---

## 5. Module Aliasing

Vite is configured with path aliases for clean imports:

| Alias | Target |
|---|---|
| `@/` | `src/` |
| `@lich-viet/core` | `packages/core/src/index.ts` |
| `@lich-viet/types` | `packages/types/src/index.ts` |

---

## 6. Engine Catalog

The engine layer contains pure TypeScript functions with **zero React dependencies**, making them testable and portable. Each engine follows: `input data → pure computation → structured output`.

| # | Engine | File | Input | Output |
|---|---|---|---|---|
| 1 | **Calendar** | `calendarEngine.ts` | Solar date | Lunar date, Can Chi, stars, auspicious hours |
| 2 | **Activity Scorer** | `activityScorer.ts` | Date + activity | Weighted score from 8 evaluation layers |
| 3 | **Bát Tự (Bazi)** | `baziEngine.ts` | Birth date/time | Four Pillars, Thập Thần, luck cycles |
| 4 | **Tử Vi** | `services/tuvi/` | Birth date/time/gender | 12-palace chart with 115+ stars |
| 5 | **Chiêm Tinh** | `natalChartCalculator.ts` | Birth date/time/location | Western natal chart with aspects |
| 6 | **Thần Số Học** | `numerologyEngine.ts` | Full name + birth date | Life Path, Expression, Soul Urge, cycles |
| 7 | **Mai Hoa** | `maiHoaEngine.ts` | Time or numbers | Hexagram triplet + Thể/Dụng analysis |
| 8 | **Tam Thức** | `tamThucSynthesis.ts` | Date/time | Thái Ất + QMDJ + Lục Nhâm boards |
| 9 | **Phi Tinh** | `flyingStarEngine.ts` | Period + direction | Flying Star 9-palace Luo Shu grid |

---

## 7. Engine Dependency Graph

```mermaid
graph TD
    subgraph Packages["@lich-viet/core"]
        Core["@lich-viet/core<br/>(re-exports)"]
    end

    subgraph Utils["src/utils — Engine Implementations"]
        CalEngine["calendarEngine"]
        BaziEng["baziEngine"]
        MaiHoaEng["maiHoaEngine"]
        LucNhamEng["lucNhamEngine"]
        QMDJEng["qmdjEngine"]
        ThaiAtEng["thaiAtEngine"]
        DungSuEng["dungSuEngine"]
        NatalCalc["natalChartCalculator"]
        FlyingStarEng["flyingStarEngine"]

        FoundLayer["foundationalLayer"]
        ModLayer["modifyingLayer"]
        HourEng["hourEngine"]
        CanChi["canchiHelper"]
        BaziStars["baziStars"]
        BaziConst["baziConstants"]
        Constants["constants"]
    end

    subgraph Services["src/services — Integration"]
        TuViSvc["tuvi/tuviEngine"]
        SharedCore["sharedCore"]
    end

    subgraph External["External Libraries"]
        VnLunar["@dqcai/vn-lunar"]
        Iztro["iztro"]
        CircNatal["circular-natal-horoscope-js"]
    end

    Core --> CalEngine & BaziEng & MaiHoaEng & LucNhamEng & QMDJEng & ThaiAtEng & DungSuEng

    CalEngine --> FoundLayer & ModLayer & HourEng & CanChi & VnLunar & Constants
    BaziEng --> CalEngine & HourEng & FoundLayer & BaziStars & BaziConst
    MaiHoaEng --> CalEngine & Constants
    LucNhamEng --> CalEngine & FoundLayer
    QMDJEng --> FoundLayer & HourEng
    ThaiAtEng --> CalEngine
    DungSuEng --> Constants
    NatalCalc --> CircNatal
    FlyingStarEng --> Constants

    ModLayer --> FoundLayer & Constants
    FoundLayer --> Constants

    TuViSvc --> Iztro & SharedCore
    SharedCore --> CalEngine & FoundLayer & HourEng & CanChi

    style Packages fill:#1a365d,stroke:#2b6cb0,color:#e2e8f0
    style Utils fill:#2d3748,stroke:#4a5568,color:#e2e8f0
    style Services fill:#553c9a,stroke:#6b46c1,color:#e2e8f0
    style External fill:#234e52,stroke:#2c7a7b,color:#e2e8f0
```

### Data Flow Principles

1. **Unidirectional Flow** — Low-level utilities (`constants`, `foundationalLayer`) never depend on high-level engines.
2. **Calendar as Truth** — All Eastern engines MUST use `calendarEngine.ts` or `foundationalLayer.ts` for date/time conversion to ensure academic consistency.
3. **Pure Logic** — Engines in `src/utils` are designed to be "pure" business logic with zero React or DOM dependencies.

---

## 8. State Management

Zustand stores manage application state with minimal boilerplate:

```mermaid
graph LR
    subgraph Stores["Zustand Stores"]
        AS["appStore<br/>──────────<br/>selectedDate<br/>dayData<br/>isDark<br/>fontSize<br/>locale<br/>userGoal<br/>isPremium"]
        AUTH["authStore<br/>──────────<br/>user<br/>session<br/>tier<br/>isAuthenticated"]
        CS["creditStore<br/>──────────<br/>credits<br/>usage<br/>lastRefresh"]
    end

    AS -->|"setSelectedDate()"| ENG["Engine Layer"]
    AS -->|"toggleDarkMode()"| DOM["DOM Side-Effects"]
    AUTH -->|"tier check"| GATE["ContentGate / CreditGate"]
    CS -->|"deduct/refresh"| GATE

    style Stores fill:#2d3748,stroke:#4a5568,color:#e2e8f0
```

| Store | Responsibility | Persistence |
|---|---|---|
| `appStore` | Calendar date, dark mode, font size, locale, user goal, premium flag | `localStorage` |
| `authStore` | User session, authentication state, tier level | `localStorage` + Supabase (planned) |
| `creditStore` | Free-tier query credits, usage tracking, refresh cycle | `localStorage` |

---

## 9. Performance Strategies

| Strategy | Implementation |
|---|---|
| **Code Splitting** | 25+ `React.lazy()` calls for route-level and feature-level splitting |
| **Vendor Chunking** | Heavy libraries (`iztro`, `leaflet`, `circular-natal-horoscope-js`) isolated into separate chunks via Vite `manualChunks` |
| **Web Workers** | Heavy calculations offloaded from main thread via `engineWorker.worker.ts` |
| **Memoization** | `useMemo` and `useCallback` for expensive computations |
| **Tree Shaking** | `sideEffects: false` in `package.json` |
| **Compression** | `vite-plugin-compression2` for Brotli/Gzip pre-compression |
| **PWA** | Service Worker with precache + stale-while-revalidate via `vite-plugin-pwa` |

---

## 10. Build & Deployment

```bash
npm run dev          # Vite dev server (HMR)
npm run build        # TypeScript check + Vite production build
npm run preview      # Preview production build locally
```

Output is a static bundle in `dist/` — deployable to any static hosting.

| Platform | Status | Config File |
|---|---|---|
| **Vercel** | Configured | `vercel.json` (SPA rewrites) |
| **Netlify** | Configured | `netlify.toml` (SPA redirects) |

### CI Pipeline (GitHub Actions)

```
lint → typecheck → test → build
```

---

## 11. Testing Infrastructure

| Framework | Purpose | Config |
|---|---|---|
| **Vitest** | Unit + Integration tests | `vitest.config.ts` |
| **@testing-library/react** | Component rendering tests | — |
| **JSDOM** | DOM environment for unit tests | — |
| **Playwright** | E2E browser tests | `playwright.config.ts` |
| **@vitest/coverage-v8** | Code coverage | — |

### Test Organization

| Directory | Content |
|---|---|
| `test/phase_1/` → `phase_4/` | Tests organized by development phase |
| `test/integration/` | Cross-module integration tests |
| `test/performance/` | Performance benchmarks |
| `test/snapshot/` | Snapshot regression tests |
| `test/*-battle-test.test.ts` | Edge-case stress tests (8 engines) |

### Commands

```bash
npm run test           # Run all tests
npm run test:watch     # Watch mode
npm run test:coverage  # With coverage report
npm run test:e2e       # Playwright E2E tests
```

---

## 12. Security Model

| Layer | Current Implementation |
|---|---|
| **CSP** | Content Security Policy via `<meta>` tags in `index.html` |
| **Input Validation** | Zod schemas on all engine inputs |
| **XSS** | React's built-in JSX escaping + CSP |
| **Env Management** | `.env.example` template, no secrets in client bundle |
| **HTTPS** | Enforced by hosting providers (Vercel/Netlify) |

---

## 13. Monetization Architecture (Current / Planned)

```mermaid
graph TB
    subgraph Current["Current — Client-Side Tier Gating"]
        USER["User"] --> GATE{"ContentGate<br/>Component"}
        GATE -->|"Free"| BASIC["Basic charts<br/>+ limited interpretation"]
        GATE -->|"Trial (14-day)"| FULL["Full interpretation<br/>+ 30-page PDF"]
        GATE -->|"Premium"| PRO["All engines<br/>+ 70-page PDF<br/>+ Advanced analysis"]
    end

    subgraph Planned["Planned — Server-Side Enforcement"]
        EDGE["Supabase Edge Functions"]
        AUTH2["Supabase Auth"]
        DB["PostgreSQL + RLS"]
        STRIPE["Stripe Payments"]
    end

    Current -.->|"Phase 3 Upgrade"| Planned

    style Current fill:#1a365d,stroke:#2b6cb0,color:#e2e8f0
    style Planned fill:#2d3748,stroke:#4a5568,color:#e2e8f0
```

### Tier Matrix

| Feature | Free | Trial (14-day) | Premium |
|---|---|---|---|
| Core Calendar + Dụng Sự | ✅ | ✅ | ✅ |
| Mai Hoa / Gieo Quẻ | ✅ | ✅ | ✅ |
| Bát Tự / Tử Vi / Chiêm Tinh | Basic chart | Full interpretation | Full + Advanced |
| Numerology | 20+ indicators | Full analysis | Full analysis |
| Luck Cycles (Đại Hạn / Lưu Niên) | ❌ | ✅ | ✅ |
| PDF Report | ❌ | ~30 pages | 60-70 pages |

---

> **Note:** Update this document whenever the architecture changes. All agents reference this as the Source of Truth for project structure and technical decisions.
