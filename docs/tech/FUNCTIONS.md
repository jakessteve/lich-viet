# Function & Engine Reference - Lich Viet v3

> **Version:** 3.0.0 | **Updated:** May 2026
> Current function-level reference for the active v3 codebase.

---

## 1. Active Surface

Lich Viet v3 is a client-side React SPA with four primary user surfaces:

| Surface           | Route           | Primary Component                        |
| ----------------- | --------------- | ---------------------------------------- |
| Landing           | `/`             | `src/components/pages/LandingPage.tsx`   |
| Am Lich + Dung Su | `/app/am-lich`  | `src/components/pages/AmLichPage.tsx`    |
| Gieo Que          | `/app/gieo-que` | `src/components/GieoQue/GieoQueView.tsx` |
| Tu Vi             | `/app/tu-vi`    | `src/components/TuVi/TuViPage.tsx`       |

Support routes for settings, auth, and upgrade stay inside the same SPA shell. Legacy module routes redirect into the active v3 pages instead of loading removed modules.

---

## 2. Engine Layer

All active engines are pure TypeScript and live under `src/utils/`.

| Engine           | File                                      | Main Responsibility                                     |
| ---------------- | ----------------------------------------- | ------------------------------------------------------- |
| Calendar         | `calendarEngine.ts`                       | Solar/lunar conversion, Can Chi, day detail aggregation |
| Activity Scoring | `activityScorer.ts`                       | Dung Su score breakdowns for activities                 |
| Dung Su          | `dungSuEngine.ts`, `dungSuSuggester.ts`   | Activity/date recommendations                           |
| Mai Hoa          | `maiHoaEngine.ts`, `maiHoaInterpreter.ts` | Hexagram generation and interpretation                  |
| Tam Thuc         | `tamThucSynthesis.ts`                     | Synthesis of QMDJ, Luc Nham, and Thai At                |
| QMDJ             | `qmdjEngine.ts`, `qmdjScorer.ts`          | Nine-palace chart and activity scoring                  |
| Luc Nham         | `lucNhamEngine.ts`                        | Heaven/Earth board and verdicts                         |
| Thai At          | `thaiAtEngine.ts`                         | Year/month overlays and cosmic forecast                 |
| Flying Star      | `flyingStarEngine.ts`                     | Xuan Kong Flying Star chart                             |
| Tu Vi            | `services/tuvi/` (starPlacement, etc.)    | Tử Vi Đẩu Số birth chart with Thiên Lương school        |

---

## 3. Package Exports

The active public package facades are in `packages/core/src/`.

| Package Path               | Exports                                                            |
| -------------------------- | ------------------------------------------------------------------ |
| `@lich-viet/core`          | Barrel exports for shared calendar and constant helpers            |
| `@lich-viet/core/calendar` | Calendar, Can Chi, solar-term, and hour helpers                    |
| `@lich-viet/core/dungsu`   | Activity scoring, catalog, Dung Su generation, date suggestions    |
| `@lich-viet/core/maihoa`   | Mai Hoa generation, interpretation, and related types              |
| `@lich-viet/core/fengshui` | Flying Star chart helpers                                          |
| `@lich-viet/core/qmdj`     | QMDJ chart and scoring helpers                                     |
| `@lich-viet/core/thaiAt`   | Thai At chart and forecast helpers                                 |
| `@lich-viet/core/lucNham`  | Luc Nham chart and interpretation helpers                          |
| `@lich-viet/core/tamThuc`  | Tam Thuc synthesis helpers                                         |
| `@lich-viet/core/tuvi`     | Tu Vi chart, star placement, and interpretation helpers            |
| `@lich-viet/types`         | Active shared calendar, Mai Hoa, QMDJ, Thai At, Luc Nham, Tu Vi types |

Removed v2 modules such as Bazi, Western Astrology, Numerology, PDF, premium gating, onboarding, admin, and widget exports are intentionally absent.

---

## 4. Shared Services

| Service         | File                               | Purpose                                                            |
| --------------- | ---------------------------------- | ------------------------------------------------------------------ |
| Analytics       | `src/services/analyticsService.ts` | Local/dev event tracking plus optional `gtag` forwarding           |
| Auth Store      | `src/stores/authStore.ts`          | Demo-only localStorage auth, seeded admin, and profile persistence |
| Personalization | `src/services/personalization/`    | Personal day, activity, and hour scoring helpers                   |
| Holiday Geo     | `src/hooks/useHolidays.ts`         | Geo-IP lookup and holiday caching for the calendar view            |
| TuVi Store      | `src/stores/tuviStore.ts`          | Zustand store for Tử Vi chart state, birth data, and palace selection |

Security note: auth remains client-side demo auth. It seeds a local admin account for testing and should not be treated as production authentication.

---

## 5. Workers

| Worker         | File                                 | Purpose                                                 |
| -------------- | ------------------------------------ | ------------------------------------------------------- |
| Worker client  | `src/workers/engineWorker.ts`        | Sends named engine tasks to the worker                  |
| Worker runtime | `src/workers/engineWorker.worker.ts` | Executes supported engine functions off the main thread |

The worker surface is limited to active engines. Removed-domain task names should not be reintroduced without restoring the matching engine and tests.

---

## 6. Current Validation Baseline

As of the May 2026 audit:

| Check            | Status                                                                                |
| ---------------- | ------------------------------------------------------------------------------------- |
| TypeScript       | `npm run typecheck` passes                                                            |
| ESLint           | `npm run lint` passes                                                                 |
| Unit tests       | `npm test` passes with 151 tests                                                      |
| Production build | `npm run build` passes with the current source tree                                   |
| Dependency audit | `npm audit --audit-level=moderate` reports 11 advisories requiring dependency updates |

Known build warnings:

| Warning                                    | Notes                                                                                               |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `module.register()` deprecation            | Emitted by the current test/build toolchain                                                         |
| CSS file/function and file/line warnings   | Previously emitted during CSS minification; remove source-like debug tokens from docs before rechecking |
