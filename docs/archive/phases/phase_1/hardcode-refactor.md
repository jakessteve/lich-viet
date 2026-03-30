# Hardcode Refactor — Task List

## Phase 1: Centralise constants
- [x] 1. Add `SCORING`, `DAY_OF_WEEK_NAMES`, `HOUR_RANGES`, `CALENDAR_GRID_CELLS`, `BUDDHIST_YEAR_OFFSET`, `VESAK_MONTH/DAY`, `CAN_KHAC_MAP`, `TAM_SAT_YEARLY`, `SEASONS`/`getSeasonIndex`, `NGU_HOANG_*` to `src/utils/constants.ts`

## Phase 2: Fix engine files
- [x] 2. `src/utils/yearlyEngine.ts` — remove duplicate `CHI_XUNG`; use named TAM_SAT_YEARLY; use NGU_HOANG constants
- [x] 3. `src/utils/calendarEngine.ts` — use `SCORING`, `BUDDHIST_YEAR_OFFSET`, `VESAK_*`, `CAN_KHAC_MAP`, `DAY_OF_WEEK_NAMES`, `CALENDAR_GRID_CELLS`
- [x] 4. `src/utils/foundationalLayer.ts` — use `SCORING.DEITY_*` instead of magic `[0,1,4,5,7,10]` and `10/-10`
- [x] 5. `src/utils/hourEngine.ts` — use `SCORING` constants; use `HOUR_RANGES` from constants; fix star classification to use type field
- [x] 6. `src/utils/extraStars.ts` — hoist `xkPatterns` to module-level const; name `sonNganDays`; use `getSeasonIndex`
- [x] 7. `src/utils/modifyingLayer.ts` — replace string-based season with `getSeasonIndex`
- [x] 8. `src/utils/dungSuEngine.ts` — extract star names and activity lists to named constants

# Holiday Feature Tasks
- [ ] 1. Create `src/data/vietnameseHolidays.json` with defined solar and lunar rules.
- [ ] 2. Create `src/hooks/useHolidays.ts` for geolocation and API fetching.
- [ ] 3. Create `src/components/Calendar/HolidaysCard.tsx` to match the UI style.
- [ ] 4. Modify `src/App.tsx` to insert `HolidaysCard` below the solar date details card.
