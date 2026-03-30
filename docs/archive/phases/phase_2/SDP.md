---
version: 1.0.0
---

# System Design Plan (SDP) - Phase 2: Mai Hoa Dịch Số

## 1. Architecture Overview
The Mai Hoa engine will follow the same pattern established in Phase 1: a pure utility layer isolated from the UI, ensuring that all business rules (divination calculations, hexagram mapping) are completely testable and deterministic. Data will be fed into a distinct React View component.

## 2. Component Design

### 2.1 Utility/Engine Layer (`src/utils/maihoaEngine.ts`)
- `generateTrigram(id: number): Trigram`
- `calculateMainHexagramByTime(yearChi: number, lunarMonth: number, lunarDay: number, hourChi: number): DivinationResult`
- `calculateMainHexagramByNumbers(num1: number, num2: number, num3: number): DivinationResult`
- `getMutualHexagram(main: Hexagram): Hexagram`
- `getChangedHexagram(main: Hexagram, movingLine: number): Hexagram`
- `evaluateTheDung(the: Trigram, dung: Trigram): Assessment`

### 2.2 Data Layer (`src/data/hexagrams.json`)
A static JSON map of the 64 hexagrams, containing:
- ID (1-64)
- Name (Hán Việt and standard Vietnamese interpretation)
- Upper Trigram ID
- Lower Trigram ID
- Meaning brief

### 2.3 UI Layer (`src/components/MaiHoaView.tsx`)
A new top-level component (or a distinct tab/route) responsible for:
- A form to select "Current Time" or "Manual Numbers".
- A visual display of the 3 Hexagrams (Chủ - Hổ - Biến) side-by-side on desktop, or stacked on mobile.
- A summary card explaining the Thể-Dụng relationship and the final outcome.

## 3. Data Flow
1. User requests a reading in `MaiHoaView`.
2. `MaiHoaView` gathers current Lunar time from `calendarEngine.ts` (Phase 1) OR manual inputs.
3. Inputs are passed to `maihoaEngine.ts`.
4. `maihoaEngine.ts` computes the 3 Hexagrams and the assessment.
5. The result object `DivinationResult` is returned to `MaiHoaView` and mapped to the UI.

## 4. UI/UX Design
- **Theme:** Consistent with Phase 1 "Apple Minimalism". High use of white-space, rounded corners (`rounded-2xl`, `rounded-3xl`), and subtle borders.
- **Hexagram Visuals:** Instead of images, hexagrams should be drawn using native HTML/CSS `div`s. A full line is a solid `div`, a broken line is two smaller `div`s with a gap in the middle. The moving line should be highlighted via color or a subtle animation/icon to indicate it changes between Chủ and Biến.
