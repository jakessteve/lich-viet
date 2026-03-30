# TASKS/LESSONS.md

## Post-Mortem Refinement

- **Date:** 2026-03-01T14:55:00Z
- **Failure:** Initial grid layout caused staggered descriptions due to variable text content height.
- **Root Cause:** Structural Breach — The star item container used a simple `flex-col` without accounting for variable height of "direction detail" elements above the absolute baseline.
- **Fix Applied:** Refactored star items to use `flex-col h-full` with a `flex-grow` wrapper on the upper content to push descriptions to the bottom of the grid row.
- **Prevention Rule:** When building grid-based dashboards with multiline headers and single-line footers, use `flex-grow` on header content within a `h-full` container to ensure baseline alignment across columns.

## Lessons Learned

## UI Alignment in Grid
- **Date:** 2026-03-01T07:42:00Z
- **Failure:** Descriptions inside the "Khai Sơn Lập Hướng" grid misaligned vertically when content lengths varied.
- **Root Cause:** Structural Breach. The grid elements defaulted to `stretch` but the inner content text blocks lacked `flex-grow` configuration, causing them to hug the content instead of pushing to the bottom aligning exactly across columns.
- **Fix Applied:** Enforced outer wrapper with `flex flex-col h-full` and intermediate descriptive area with `flex-grow` structure in `DetailedDayView.tsx`.
- **Prevention Rule:** When placing variable-length structured text in a horizontal row grid, always ensure inner text-holding containers use intrinsic `flex-grow` layouts.

## Day Grade Sensitivity & CSS Outline
- **Date:** 2026-03-01T15:05:00Z
- **Failure:** An objectively inauspicious user-facing date ("đại hung") showed no indicator dot, and dates on grid edges had clipped selection borders.
- **Root Cause:** Logic Breach / Execution Breach. The `getDayQuality` logic assumed extreme day Grades only rather than observing negative DayScores or native textual warnings. Secondly, `ring-2` with `overflow-hidden` containers clips geometrically.
- **Fix Applied:** Refactored `calendarEngine.ts/getDayQuality` to evaluate standard `< 0` arithmetic scores and specific keywords for Day Grade derivation. Swapped `ring` styling out for `outline` css utilities in `DayCell.tsx` to stop geometrical trimming completely. 
- **Prevention Rule:** Use numeric subscores `dayScore` for generalized `dayQuality` rather than top-level specific string evaluation. Use CSS `outline` rather than `ring`/`border` for temporary visual highlight indicators inside edge-bounded container grids.

## Monolith Decomposition via Dependency Injection
- **Date:** 2026-03-01T17:09:00Z
- **Failure:** 1025-line calendarEngine.ts monolith made changes risky and untestable.
- **Root Cause:** Structural Breach. All computation layers (foundational, modifying, dụng sự, hourly) were co-located in a single file with tight coupling via internal function calls.
- **Fix Applied:** Decomposed into 4 sub-modules (foundationalLayer.ts, modifyingLayer.ts, dungSuEngine.ts, hourEngine.ts) using dependency injection for cross-module calls (e.g., hourEngine receives `parseCanChi`/`getCanChiDay` as parameters). calendarEngine.ts became a thin orchestrator with re-exports preserving the public API.
- **Prevention Rule:** When a utility file exceeds 300 lines, identify natural layer boundaries and extract sub-modules. Use dependency injection (function parameters) instead of direct imports to avoid circular dependencies. The orchestrator pattern (thin file with re-exports) preserves backward compatibility.

