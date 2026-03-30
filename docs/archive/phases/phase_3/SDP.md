---
version: 1.0.0
---

# Phase 3: Tử Vi Module — Software Design Proposal (SDP)

## 1. Architectural Overview

The Phase 3 Tử Vi Module is implemented entirely on the frontend using React (Vite environment). It follows a stateless component driven approach. It interfaces with the `iztro` JavaScript library for the heavy astrological calculations, minimizing custom algorithm creation and focusing heavily on presentation and text-based interpretation rules.

### 1.1 Dependency Strategy
- **Calculation Engine:** `iztro` (installed via npm). It provides an extensive API.
- **State Management:** React Context API or Zustand (leveraging the same state library pattern used in Phase 2, if applicable) specifically for the "Currently Viewed Chart" (`TuViContext`).
- **Export Utility:** `html2canvas` (or `dom-to-image-more`) for rendering the DOM chart into a downloadable PNG.

## 2. Component Structure

### 2.1 UI Component Tree
```
TuViModule/                  // Main Page container
├── TuViInputForm/           // Form for birth details
│   ├── SolarDateInput
│   ├── LunarDateInput       // (Optional toggle)
│   ├── BirthHourSelect
│   ├── GenderSelect
│   └── GenerateButton
│
├── TuViWorkspace/           // Rendered ONLY upon chart generation
│   ├── ActionToolbar/       // Export, Print, Share buttons
│   ├── ChartSpace/          // The visual chart representation
│   │   ├── TuViGrid/        // 4x4 CSS Grid container
│   │   │   ├── CenterInfoPanel/ // Spans 2x2. User metrics + periods
│   │   │   └── PalaceCell[]     // 12 instances of Palace components
│   │   │       ├── MajorStars
│   │   │       ├── MinorStars
│   │   │       ├── TuHoaBadges
│   │   │       └── PalaceFooter
│   │   └── PhiTinhOverlay/  // Logic/SVG lines to show flying stars
│   │
│   └── InterpretationSpace/ // Text-based interpretations
│       ├── GeneralSummary
│       ├── PatternBadges    // E.g., 'Sát Phá Lang' tag
│       └── PalaceDetailsAccordion // Expandable sections per palace
```

### 2.2 Core Logic Modules (Services)

`src/services/tuvi/`
- `tuviEngine.ts`: Wrapper around `iztro`. Handles the initialization and config for the astrological library and exposes typed interfaces optimized for the React components.
- `tuviInterpretationEngine.ts`: Ingests a generated `iztro` chart payload and matches it against `tuvi_rules.json` to produce the localized Vietnamese explanation text.
- `tuviExportService.ts`: Specialized service to handle the `html2canvas` conversion process, managing CSS overrides necessary to produce clean standalone image files.

### 2.3 Data Structures (Models)

**Interpretation Rule Schema (`tuvi_rules.json`)**
```typescript
interface InterpretationRule {
  id: string;                      // E.g., "kach_cuc_sat_pha_lang"
  type: 'PATTERN' | 'PALACE' | 'STAR';
  condition: {
    // Evaluation rules matched against the iztro chart object
    requiredStars?: string[];
    requiredPalaces?: string[];
  };
  translation: {
    vi_title: string;              // "Sát Phá Lang"
    vi_description: string;        // "Là cách cục thay đổi mạnh mẽ..."
  };
}
```

## 3. Technology Integration Specifics

### 3.1 CSS Grid for the Chart
The standard 4x4 with center 2x2 merged layout is best handled with precise `grid-template-areas`.

```css
.tuvi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas:
    "ty     ngo    mui    than"
    "thin   center center dzu"
    "mao    center center tuat"
    "dan    suu    ty_     hoi";
}
```
Palace components are mapped to these areas using a dynamic mapping utility.

### 3.2 html2canvas Implementation Notes
Because the chart contains complex flex/grid layouts and potentially external fonts, the export function must ensure:
- Font loading is complete before capturing.
- `useCORS: true` is enabled.
- Capturing executes on the actual rendered DOM ref of the `TuViGrid`.

## 4. Risks & Mitigations
- **Responsive Design Failure:** A 4x4 table on a very narrow mobile screen will become unreadable text soup.
  - *Mitigation:* Implement purely vertical stacked lists of palaces when viewport is under ~600px width, abandoning the 4x4 visual model for pure reading parity, but *retain* a hidden "export-only" 4x4 container that gets screenshotted for the PNG export.
- **Interpretation Hallucination:**
  - *Mitigation:* All textual interpretations MUST come directly from static `tuvi_rules.json` data, vetted from references. No dynamic generative AI interpretation during runtime unless specifically integrated as a secondary "AI Copilot" phase.
