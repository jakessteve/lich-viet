# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.0] - 2026-03-14

### Added
- **Feature:** Currency conversion with automatic rate refresh and configurable intervals
- **Feature:** Tử Vi temporal overlays — enriched Đại Hạn and Lưu Niên analysis with 12-palace deep interpretation
- **Feature:** Chiêm Tinh sky map improvements — refined SVG celestial projections and star catalog
- **Feature:** Tam Thức engine refinements — improved Thái Ất, QMDJ, Lục Nhâm board construction
- **Feature:** Thần Số Học enrichment — number interactions, pinnacle timeline, personal cycles
- **Testing:** E2E test suite with Playwright
- **Docs:** Comprehensive PRD v2.3.0 with user stories for all 9 engines (`docs/PRD.md`)
- **Docs:** Engine Dependency Graph with Mermaid visualization (`docs/ENGINE_DEPENDENCY_GRAPH.md`)

### Changed
- **UI/UX:** Responsive navigation polish, sticky sub-tabs, font size controls
- **UI/UX:** Currency layout symmetry and mobile alignment improvements
- **Build:** Version bump from 2.2.0 to 2.3.0

### Removed
- **Cleanup:** Deleted stale root-level docs (`PRD.md`, `PRODUCT_BRIEF.md`, `API_CONTRACTS.md`, `ARCHITECTURE.md`) — canonical versions in `docs/`
- **Cleanup:** Removed empty `.hc/` subdirectories, worker output logs, and build artifacts
- **Cleanup:** Removed junk files (`auth`, `login`, `eslint-output.txt`)

## [2.2.1] - 2026-03-09

### Added
- **SEO:** Open Graph, Twitter Card meta tags, canonical URL, `robots.txt`, `sitemap.xml`
- **SEO:** Dynamic page titles via `usePageTitle` hook (7 page components)
- **DevOps:** Dependabot configuration for automated dependency updates
- **DevOps:** Centralized error reporter (`errorReporter.ts`) — Sentry-ready
- **DevOps:** Web Vitals monitoring (`webVitals.ts`) — CWV tracking
- **CI:** Re-added `validate-data` job to CI pipeline
- **Docs:** `CONTRIBUTING.md` with setup guide and code standards
- **Docs:** `CHANGELOG.md` (this file)

### Changed
- **Build:** Added `sideEffects: false` for better tree-shaking

### Removed
- **Cleanup:** Deleted `pnpm-workspace.yaml` (project uses npm, not pnpm)

### Fixed
- **CI:** Fixed CI pipeline dependency chain to include data validation step

## [2.2.0] - 2026-03-08

### Added
- **Feature:** Thần Số Học (Numerology) — enriched content with deep analysis, number interactions, pinnacle timeline, and personal cycles
- **Feature:** Tứ Trụ (Four Pillars) — enriched interpretation with Thập Thần, Tàng Can, and Thần Sát analysis
- **Feature:** Chiêm Tinh — Star Map (Natal Chart Wheel) with interactive SVG celestial map
- **Feature:** Tam Thức — Thái Ất, QMDJ, Lục Nhâm divination engines
- **Feature:** Cosmic Weather Widget on landing page
- **UI/UX:** Sticky sub-navigation tabs on Âm Lịch, Tử Vi, and Gieo Quẻ pages
- **UI/UX:** Brand color consistency overhaul
- **UI/UX:** Dark mode navigation improvements
- **Security:** Content Security Policy (CSP) headers
- **Security:** Environment variable management with `SECURITY.md`

### Changed
- **Architecture:** Migrated from Jest to Vitest
- **Architecture:** Upgraded ESLint rules (`no-explicit-any` → error)
- **Performance:** Extensive lazy loading (25+ `React.lazy` calls)
- **Performance:** Code splitting with granular vendor chunks

## [2.0.0] - 2026-03-01

### Added
- Complete application rewrite with React 19, Vite 7, TypeScript
- Vietnamese Lunar Calendar engine with multi-layered calculation system
- Tử Vi (Purple Star Astrology) with 115+ stars
- Bát Tự (Four Pillars of Destiny)
- Mai Hoa Dịch Số (Plum Blossom Numerology)
- Dụng Sự (Auspicious Activity) scoring engine
- Phong Thủy (Feng Shui) Flying Star analysis
- Dark mode support
- Mobile-first responsive design
- Zustand state management
- Tailwind CSS v4 design system
