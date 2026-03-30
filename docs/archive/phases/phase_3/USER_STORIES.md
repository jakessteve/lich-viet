---
version: 1.0.0
---

# Phase 3: Tử Vi Module — Epics & User Stories

## Epic 1: Tử Vi Chart Generation (Lập Lá Số)

**Story 1.1: As a user, I want to input my birth data to generate a Tử Vi chart.**
- **Given** I am on the Tử Vi module page
- **When** I enter a valid Solar or Lunar date, time of birth (hour), and gender, and click "Lập Lá Số"
- **Then** the system should validate the input and calculate the astrological positions.

**Story 1.2: As a user, I want to see the 12 palaces in the standard 4x4 grid layout.**
- **Given** my chart is generated
- **When** the results are displayed
- **Then** I see the 12 palaces arranged by fixed Earthly Branches (Dần, Mão, Thìn, etc.) forming a square ring around a central pane.

**Story 1.3: As a user, I want to see detailed star layouts inside each palace.**
- **Given** my chart is generated
- **When** I view a specific palace cell
- **Then** I see the Major Stars (bolded), Auxiliary Stars, Tứ Hóa marks, brightness levels, and Đại Hạn bounds.

## Epic 2: Interpretation Engine (Luận Giải)

**Story 2.1: As a user, I want to read summaries for specific palaces.**
- **Given** the generated chart
- **When** I click on a specific Palace (e.g., Cung Phu Thê)
- **Then** the interface opens an interpretation pane showing Vietnamese text explaining the core themes, based on standard logic.

**Story 2.2: As a user, I want the system to identify an extensive catalog of astrological patterns (Cách Cục) and their purities.**
- **Given** my chart matches one of the 40+ major structural patterns
- **When** the chart is calculated
- **Then** the system highlights this "Cách Cục", explains its significance, and indicates whether it is pure (Thượng Cách) or broken by Sát stars (Phá Cách).

## Epic 3: Temporal Overlays (Lưu Niên / Đại Hạn)

**Story 3.1: As a user, I want to view my fate for a specific 10-year period (Đại Hạn).**
- **Given** I am viewing my chart
- **When** I select a specific Đại Hạn from a dropdown or click a palace's Đại Hạn range
- **Then** the chart updates to highlight that 10-year period's palace, applying the Đại Hạn's specific Tứ Hóa and Lưu Diệu stars.

**Story 3.2: As a user, I want to view my annual forecast (Lưu Niên).**
- **Given** I am viewing my chart
- **When** I select a specific Lunar year (e.g., 2025 Ất Tỵ)
- **Then** the chart highlights the Lưu Niên palace and places the annual dynamic stars (Lưu Tuế, Lưu Lộc, etc.).

## Epic 4: Chart Export (Xuất Lá Số)

**Story 4.1: As a user, I want to download my chart as a PNG image.**
- **Given** my chart is fully rendered
- **When** I click the "Tải lá số (PNG)" button
- **Then** the browser generates a high-resolution PNG of the 4x4 grid and central panel, devoid of buttons, and downloads it to my device.
