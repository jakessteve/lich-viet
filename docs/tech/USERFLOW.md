# User Flows & Navigation — Lịch Việt v2

> **Version:** 2.3.0 | **Updated:** April 2026
> Complete user journey documentation for all app modules, navigation, and feature gating.

---

## 1. Route Map

```mermaid
graph TD
    ROOT["/"] -->|"Landing Page"| LANDING["LandingPage<br/>(standalone, no app chrome)"]
    WIDGET["/widget"] --> WIDGETPAGE["WidgetPage<br/>(PWA widget, standalone)"]
    
    APP["/app"] -->|"AppLayout wrapper"| MODULES

    subgraph MODULES["App Module Routes"]
        DAILY["/app/hang-ngay<br/>📅 Personalized Daily Hero"]
        AMLICH["/app/am-lich<br/>📅 Âm Lịch"]
        GIEO["/app/gieo-que<br/>🔮 Gieo Quẻ"]
        TUVI["/app/tu-vi<br/>⭐ Tử Vi + Bát Tự"]
        CHIEMTINH["/app/chiem-tinh<br/>🌟 Chiêm Tinh"]
        THANSO["/app/than-so-hoc<br/>🔢 Thần Số Học"]
        HOPLA["/app/hop-la<br/>💕 Hợp Lá Synastry"]
    end

    subgraph UTILITY["Utility Routes"]
        SETTINGS["/app/cai-dat<br/>⚙️ Settings"]
        UPGRADE["/app/nang-cap<br/>💎 Premium Upgrade"]
        LOGIN["/app/dang-nhap<br/>🔐 Login"]
        REGISTER["/app/dang-ky<br/>📝 Register"]
        ADMIN["/app/quan-tri<br/>🛡️ Admin<br/>(auth-guarded)"]
    end

    APP --> MODULES
    APP --> UTILITY

    subgraph LEGACY["Legacy Redirects (301)"]
        L1["/am-lich → /app/am-lich"]
        L2["/gieo-que → /app/gieo-que"]
        L3["/tu-vi → /app/tu-vi"]
        L4["/chiem-tinh → /app/chiem-tinh"]
        L5["/bat-tu → /app/tu-vi"]
        L6["/luc-nham → /app/gieo-que?method=tam-thuc"]
        L7["/* → /"]
    end

    style MODULES fill:#1a365d,stroke:#2b6cb0,color:#e2e8f0
    style UTILITY fill:#553c9a,stroke:#6b46c1,color:#e2e8f0
    style LEGACY fill:#2d3748,stroke:#4a5568,color:#e2e8f0
```

### Route → Tab Mapping

| Route | Sidebar Tab | Notes |
|---|---|---|
| `/app/hang-ngay` | `am-lich` | Default redirect from `/app` |
| `/app/am-lich` | `am-lich` | Main calendar view |
| `/app/lich-dung-su` | `am-lich` | Redirects to am-lich |
| `/app/phong-thuy` | `am-lich` | Redirects to am-lich |
| `/app/gieo-que` | `gieo-que` | Mai Hoa + Tam Thức |
| `/app/tu-vi` | `tu-vi` | Tử Vi + Bát Tự |
| `/app/chiem-tinh` | `chiem-tinh` | Western astrology |
| `/app/than-so-hoc` | `than-so-hoc` | Numerology |
| `/app/hop-la` | `hop-la` | Synastry / compatibility |

---

## 2. Navigation Architecture

```mermaid
graph TB
    subgraph Layout["AppLayout (wrapper for /app/*)"]
        NAV["AppNav<br/>──────────<br/>• Logo + app name<br/>• Dark mode toggle<br/>• Font size control<br/>• Settings icon<br/>• Mobile hamburger"]
        
        DRAWER["MobileDrawer<br/>(slide-out on mobile)<br/>──────────<br/>• 6 module links<br/>• Settings/Upgrade<br/>• Login/Register"]
        
        SIDEBAR["AppSidebar<br/>(left column on desktop)<br/>──────────<br/>• 6 module tabs<br/>• Active tab indicator<br/>• Module descriptions"]
        
        CONTENT["Main Content Area<br/>(Outlet for module routes)"]
        
        FOOTER["AppFooter<br/>──────────<br/>• Copyright<br/>• Version info<br/>• Links"]
    end

    NAV --> DRAWER
    SIDEBAR --> CONTENT

    style Layout fill:#1a365d,stroke:#2b6cb0,color:#e2e8f0
```

### Responsive Behavior

| Viewport | Navigation | Sidebar |
|---|---|---|
| **Desktop** (≥ 1024px) | Top nav bar | Left sidebar with tab labels |
| **Tablet** (768-1023px) | Top nav bar | Collapsed icon-only sidebar |
| **Mobile** (< 768px) | Top nav + hamburger | Slide-out drawer (MobileDrawer) |

---

## 3. Core User Journeys

### 3.1 First-Time User Flow

```mermaid
graph LR
    A["🌐 Visit Landing Page<br/>(SEO-optimized)"] --> B["📲 Click 'Vào Ứng Dụng'<br/>(Enter App)"]
    B --> C["🎯 Onboarding Quiz<br/>(3 questions)"]
    C --> D["🎓 Guided Tour<br/>(feature highlights)"]
    D --> E["📅 Daily Hero View<br/>(/app/hang-ngay)"]
    E --> F["🔄 Explore modules<br/>via sidebar/drawer"]

    style A fill:#553c9a,stroke:#6b46c1,color:#e2e8f0
    style E fill:#1a365d,stroke:#2b6cb0,color:#e2e8f0
```

**Onboarding Quiz** (`OnboardingQuiz.tsx`):
1. "What brought you here?" → Sets `userGoal` in appStore
2. Goal options: `calendar` | `self_discovery` | `feng_shui`
3. Persisted to `localStorage`; affects Daily Hero personalization

**Guided Tour** (`GuidedTour.tsx` + `OnboardingTour.tsx`):
- Step-by-step highlights of key features
- Skip-able, shown only on first visit

---

### 3.2 Lunar Calendar Journey

```mermaid
graph TB
    A["📅 Select date<br/>(MonthCalendar grid)"] --> B["📋 View Day Details<br/>(DetailedDayView)"]
    B --> C{"What interests you?"}
    C -->|"Activities"| D["🎯 Dụng Sự Tab<br/>Score 64+ activities"]
    C -->|"Hours"| E["🕐 Giờ Tốt/Xấu<br/>12 Chinese hours"]
    C -->|"Stars"| F["⭐ Cát/Hung Thần<br/>Auspicious stars"]
    C -->|"Direction"| G["🧭 Hướng Xuất Hành<br/>Travel direction"]
    D --> H["📊 Activity Score<br/>(8-factor weighted)"]

    style A fill:#1a365d,stroke:#2b6cb0,color:#e2e8f0
```

---

### 3.3 Divination Engine Journey (Generic)

All divination engines follow the same UX pattern:

```mermaid
graph LR
    A["📝 Input Data<br/>(PersonInput form)"] --> B["⚙️ Engine Calculates<br/>(Pure TS / Worker)"]
    B --> C["📊 Chart Display<br/>(Visual component)"]
    C --> D{"Tier Check<br/>(ContentGate)"}
    D -->|"Free"| E["🔓 Basic view<br/>(limited tabs)"]
    D -->|"Premium"| F["🔓 Full analysis<br/>(all tabs + narrative)"]
    F --> G["📥 Download PDF<br/>(PdfDownloadButton)"]
    F --> H["📤 Share<br/>(ShareButton / SocialShareCard)"]

    style D fill:#553c9a,stroke:#6b46c1,color:#e2e8f0
```

**Input Pattern** (`PersonInput.tsx`):
- Full name (Vietnamese-normalized)
- Birth date (solar calendar)
- Birth time (hour selection or exact time)
- Gender (male/female)
- Birth location (geocoding search — Chiêm Tinh only)

---

### 3.4 Tử Vi Journey (Detailed)

```mermaid
graph TB
    A["📝 Enter birth data<br/>(date, time, gender)"] --> B["🧮 iztro generates<br/>12-palace chart"]
    B --> C["📊 Palace Grid View<br/>(12 palaces + 115+ stars)"]
    C --> D["🔍 Click palace<br/>for detailed analysis"]
    D --> E{"Premium?"}
    E -->|"Yes"| F["📖 Academic interpretation<br/>(Tam Hợp + Tứ Hóa schools)"]
    E -->|"No"| G["🔒 Blurred preview<br/>(BlurredPreview + PaywallModal)"]
    F --> H["📅 Temporal Overlays"]
    H --> I["10-year Đại Hạn<br/>(Decadal luck)"]
    H --> J["Annual Lưu Niên<br/>(Yearly luck)"]
    F --> K["📥 PDF Export<br/>(60-70 page report)"]

    style E fill:#553c9a,stroke:#6b46c1,color:#e2e8f0
```

---

### 3.5 Hợp Lá (Synastry) Journey

```mermaid
graph LR
    A["📝 Enter Person A data"] --> B["📝 Enter Person B data"]
    B --> C["🧮 Multi-engine analysis<br/>(Bazi + TuVi + Numerology<br/>+ Western Astrology)"]
    C --> D["💕 Compatibility Score<br/>(SynergyRadar + BondsScoreCard)"]
    D --> E["📊 Detailed breakdown<br/>per life area"]

    style C fill:#1a365d,stroke:#2b6cb0,color:#e2e8f0
```

---

## 4. Feature Gating System

```mermaid
graph TB
    subgraph GatingFlow["Feature Gating Pipeline"]
        USER["User Action"] --> TIER{"useUserTier()<br/>Guest | Free | Trial | Premium"}
        TIER -->|"Guest"| LIMIT["useDailyQueryLimit()<br/>(3 queries/day)"]
        TIER -->|"Free"| BASIC["ContentGate<br/>shows basic tabs only"]
        TIER -->|"Trial"| FULL["Full access<br/>(14-day countdown)"]
        TIER -->|"Premium"| PRO["Full access<br/>(permanent)"]
        
        LIMIT -->|"Exceeded"| WALL["CreditGate<br/>+ PremiumPaywallModal"]
        BASIC -->|"Locked tab"| WALL
        WALL --> UPGRADE["UpgradePage<br/>(/app/nang-cap)"]
    end

    style GatingFlow fill:#2d3748,stroke:#4a5568,color:#e2e8f0
```

### Gating Components

| Component | Purpose |
|---|---|
| `ContentGate.tsx` | Wraps premium content sections; shows/hides based on tier |
| `CreditGate.tsx` | Free-tier credit check before engine calculation |
| `BlurredPreview.tsx` | Glassmorphism blur over locked premium content |
| `PremiumPaywallModal.tsx` | Upgrade prompt with feature comparison |
| `UpgradeBanner.tsx` | Inline banner promoting premium upgrade |
| `TierBadge.tsx` | Visual badge showing current user tier |
| `DailyQueryCounter.tsx` | Shows remaining free queries for the day |
| `CreditRefreshBanner.tsx` | Banner showing when free credits refresh |

---

## 5. Auth Flow

```mermaid
graph TD
    A["Unauthenticated<br/>(Guest user)"] -->|"Click 'Đăng nhập'"| B["LoginPage<br/>(/app/dang-nhap)"]
    A -->|"Click 'Đăng ký'"| C["RegisterPage<br/>(/app/dang-ky)"]
    B -->|"Success"| D["Authenticated<br/>→ redirect to /app/am-lich"]
    C -->|"Success"| D
    D -->|"Admin role"| E["AdminAuthGuard<br/>→ AdminPage (/app/quan-tri)"]

    style D fill:#059669,stroke:#047857,color:#e2e8f0
```

---

## 6. Page Module Summary

### Main Modules (with sidebar tab)

| Module | Route | Engine(s) Used | Key Components |
|---|---|---|---|
| **Hàng Ngày** | `/app/hang-ngay` | Calendar, Activity Scorer | `PersonalizedDailyHero` |
| **Âm Lịch** | `/app/am-lich` | Calendar, Dụng Sự, Flying Star, Feng Shui | `MonthCalendar`, `DetailedDayView`, `DayCell` |
| **Gieo Quẻ** | `/app/gieo-que` | Mai Hoa, QMDJ, Thái Ất, Lục Nhâm | `GieoQueView` (tabbed: Mai Hoa / Tam Thức) |
| **Tử Vi** | `/app/tu-vi` | Tử Vi (iztro), Bát Tự | `TuViPage` (tabbed sub-views) |
| **Chiêm Tinh** | `/app/chiem-tinh` | Natal Chart, Transits, Sky Projection | `ChiemTinhView` (chart + star map) |
| **Thần Số Học** | `/app/than-so-hoc` | Numerology | `NumerologyView` |
| **Hợp Lá** | `/app/hop-la` | Multi-engine synastry | `HopLaPage` |

### Utility Pages (no sidebar tab)

| Page | Route | Purpose |
|---|---|---|
| **Settings** | `/app/cai-dat` | Theme, font, locale, profile management |
| **Upgrade** | `/app/nang-cap` | Premium tier comparison and purchase |
| **Login** | `/app/dang-nhap` | User authentication |
| **Register** | `/app/dang-ky` | New account creation |
| **Admin** | `/app/quan-tri` | Admin panel (auth-guarded) |

---

## 7. Data Entry Patterns

### Standard Birth Data Form

Used across Tử Vi, Bát Tự, Chiêm Tinh, Thần Số Học, and Hợp Lá:

```
┌──────────────────────────────────┐
│  PersonInput Component           │
│  ┌────────────┐ ┌──────────────┐ │
│  │ Full Name  │ │ Birth Date   │ │
│  │ (text)     │ │ (date picker)│ │
│  └────────────┘ └──────────────┘ │
│  ┌────────────┐ ┌──────────────┐ │
│  │ Birth Time │ │ Gender       │ │
│  │ (combo)    │ │ (select)     │ │
│  └────────────┘ └──────────────┘ │
│  ┌────────────────────────────┐  │
│  │ Birth Location (optional)  │  │
│  │ (geocoding search)         │  │
│  └────────────────────────────┘  │
│         [ Xem Kết Quả ]         │
└──────────────────────────────────┘
```

### Analysis Result Pattern

```
┌──────────────────────────────────┐
│  [Tab Nav: EngineTabNav]         │
│  Overview | Details | Advanced   │
├──────────────────────────────────┤
│  [Data Summary Bar]             │
│  Key metrics at a glance        │
├──────────────────────────────────┤
│  [Analysis Cards]               │
│  ┌──────────┐ ┌──────────┐     │
│  │ Card 1   │ │ Card 2   │     │
│  │(collaps.)│ │(collaps.)│     │
│  └──────────┘ └──────────┘     │
├──────────────────────────────────┤
│  [Actions: PDF | Share | Save]  │
└──────────────────────────────────┘
```

---

## 8. PDF Export Flow

```mermaid
graph LR
    A["User views<br/>analysis result"] --> B["Click 📥 Download PDF"]
    B --> C["PdfDownloadButton<br/>triggers generation"]
    C --> D["PDF Service<br/>(pdf/ directory)"]
    D --> E["html-to-image<br/>renders charts"]
    E --> F["Multi-page PDF<br/>(30-70 pages)"]
    F --> G["Browser download<br/>dialog"]

    style D fill:#553c9a,stroke:#6b46c1,color:#e2e8f0
```

### PDF Report Variants

| Variant | Vietnamese Name | Focus | Pages |
|---|---|---|---|
| **Identity** | Bản Sắc Cá Nhân | Core personality, archetypes | ~30 |
| **Career** | Chiến Lược Sự Nghiệp | Wealth, professional path | ~30 |
| **Love** | Gắn Kết & Tình Duyên | Relationship patterns | ~30 |
| **Yearly** | Vận Trình Năm [Year] | Quarterly outlook | ~30 |
| **Master** | Hồ Sơ Vận Mệnh | All above + technical appendix | ~70 |

---

> **Note:** All user flows are subject to the Feature Gating System (§4). Guest users have the most restricted access; Premium users have full access to all features and export capabilities.
