---
version: 1.0.0
---

# Phase 3: Tử Vi Module — Source of Truth (SOT)

## 1. Domain Entities & Business Logic

### 1.1 Core Astrological Entities
- **Chart ( Lá Số):** Calculated based on Solar/Lunar birth date, birth hour, gender, and optionally timezone/location.
- **Palace ( Cung):** 12 fixed positions corresponding to the 12 Earthly Branches (Địa Chi). Each palace governs a specific life aspect (Mệnh, Huynh Đệ, Phu Thê, Tử Tức, Tài Bạch, Tật Ách, Thiên Di, Nô Bộc, Quan Lộc, Điền Trạch, Phúc Đức, Phụ Mẫu).
- **Major Stars ( Chính Tinh):** 14 primary stars that define the core nature of a palace.
- **Auxiliary Stars ( Phụ Tinh):** 100+ secondary stars that modify the influence of major stars.
- **Transformations ( Tứ Hóa):** Hóa Lộc (Wealth), Hóa Quyền (Power), Hóa Khoa (Fame), Hóa Kỵ (Obstacle). Can be native (Bản mệnh) or dynamic (Lưu niên/Đại hạn).

### 1.2 Algorithmic Rules (Calculations)
- **Engine:** The application MUST strictly use the `iztro` library for all core astrological calculations (star placement, palace assignment, ngũ hành cục determination).
- **Tứ Hóa Rules:** By default, use the standard Central school (Trung Châu Phái or similar) Tứ Hóa table. The definition of Tứ Hóa for each Heavenly Stem (Thiên Can) must be consistent across the application.
- **Leap Months (Tháng Nhuận):** Must be handled correctly according to traditional rules (usually split by the 15th day, relying on `iztro`'s built-in handling).

### 1.3 Structural Relationships
- **Tam Phương Tứ Chính:** The absolute basis for interpreting any palace. It consists of the Target Palace + 2 Tam Hợp Palaces (Triangle) + 1 Xung Chiếu Palace (Opposition).
- **Nhị Hợp:** Paired palaces providing subtle, hidden support or drain.
- **Cách Cục (Patterns):** Specific combinations of stars in specific structural orientations (e.g., Sát Phá Lang, Tử Phủ Triều Viên) trigger specialized interpretations.

## 2. Functional Requirements

### 2.1 Input Data
- User MUST provide:
  - Date of Birth (Solar or Lunar)
  - Time of Birth (Hour exact or 2-hour traditional CANh)
  - Gender (Nam / Nữ)
- Name is OPTIONAL but recommended for chart labeling.

### 2.2 Output Display
- The chart MUST render as a standard 4x4 outer grid with a merged 2x2 central information panel.
- Each of the 12 palace cells MUST display:
  - Palace Name (Hán Việt)
  - Bát Tự Can Chi (Stem and Branch)
  - Đại Hạn (10-year period age range)
  - Major Stars with Brightness indicator (Miếu/Vượng/Đắc/Hãm/Bình)
  - Select Auxiliary Stars
  - Transformational markers (Tứ Hóa)

### 2.3 Interpretation Engine
- Interpretations MUST NOT be hardcoded inside UI components. They MUST be drawn from a structured, extendable database (JSON/Markdown).
- The language of interpretation MUST be Modern Vietnamese, easily understandable by layman users, while keeping the classical star names in Hán Việt.
- The Engine MUST detect and explain over 40 major "Cách Cục" patterns (e.g., Tử Phủ Đồng Cung, Minh Châu Xuất Hải, Tham Vũ Đồng Hành, Tam Kỳ Gia Hội). It must differentiate between pure patterns (Thượng Cách) and broken patterns (Phá Cách) caused by Sát Tinh.

### 2.4 Temporal Forecast (Lưu Niên / Đại Hạn)
- The system MUST allow shifting the chart's reference frame to a specific 10-year period (Đại Hạn) or specific year (Lưu Niên).
- Doing so MUST display the "Dynamic Stars" (Lưu Diệu) associated with that period across the chart.

### 2.5 Export
- The user MUST be able to capture the complete, high-resolution chart and export it as a PNG file.
- The export MUST strip interactive UI buttons and add a subtle watermark.

## 3. Strict Quality Gates
- **No placeholder logic:** Use `iztro` for real data; no mock generation routines.
- **Format Integrity:** The 4x4 Grid layout cannot break on standard desktop/tablet sizes. On very small mobile screens, the grid should be wrapped in a horizontally scrollable container or restacked vertically, prioritizing readability over grid form.
