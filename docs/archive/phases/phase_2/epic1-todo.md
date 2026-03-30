# Epic 1: Data Foundation & Trigram Constants — Task List

## Stories
- [x] **US_MH_D01** — Trigram Data Definition (`src/data/trigrams.json`)
- [x] **US_MH_D02** — Hexagram Data Definition (`src/data/hexagrams.json`)
- [x] **US_MH_D03** — Ngũ Hành Interaction Map (`src/data/nguHanhInteraction.json`)
- [x] **US_MH_D04** — TypeScript Interfaces (`src/types/maiHoa.ts`)

## Atomic Tasks
- [x] 1. Create `src/types/maiHoa.ts` — Define Trigram, Hexagram, DivinationResult, Assessment interfaces (US_MH_D04)
- [x] 2. Create `src/data/trigrams.json` — 8 Trigrams with id, name, element, lines, nature (US_MH_D01)
- [x] 3. Create `src/data/hexagrams.json` — 64 Hexagrams with id, name, upper, lower, meaning, image (US_MH_D02)
- [x] 4. Create `src/data/nguHanhInteraction.json` — 5×5 interaction matrix + 5×4 seasonal strength (US_MH_D03)
- [x] 5. Create `src/__tests__/maiHoaData.test.ts` — Unit tests verifying data integrity (counts, references, completeness)
- [x] 6. Update `docs/TRACEABILITY.md` — Add Epic 1 story IDs and test IDs
- [x] 7. Update `docs/PROJECT_STATE.md` — Mark Epic 1 tasks

## Exit Criteria — ALL MET ✅
- All 4 data/type files created ✅
- All interfaces compile with strict TypeScript ✅
- Unit tests confirm: 8 trigrams, 64 hexagrams, 5×5 interaction matrix, no orphan references ✅
- 38/38 tests passing ✅
