# Task: Debug Track 2 - Code, Runtime & Tests (@dev & @qc)
## Goal: Isolate and diagnose logic bugs causing 7 test failures (e.g. `getStarCategory`), 193 ESLint problems, and review Web Worker implementations for race conditions. 
## Persona: @dev
## Files: `test/`, `src/workers/`, `src/engines/tuvi/`, `src/engines/bazi/`

You must investigate the codebase for:
1. Root causes of test failures (specifically look for `test/phase_3/tuviEngine.test.ts` failure where getStarCategory expected 'neutral', got 'malefic').
2. Web Worker race conditions or silent failures causing UI freezing.
3. ESLint type errors related to `any` usage in the newly added calculation engines.

**Progress Reporting:** After completing each major step, output a progress marker:
`[PROGRESS] Step X/Y: <what you just completed>`
When finished, output: `[PROGRESS] Status: DONE`

## Constraints
DO NOT modify any files. Use `run_command` with `grep_search`, `npm run test` or `npm run typecheck` to verify findings.

## Expected Output Format
You MUST structure your final output strictly as JSON. 
Each finding must include:
- `bug`: Description
- `file`: Path and line number
- `severity`: P0-P3 classification
- `reproduction`: Steps to reproduce (or test command that fails)
- `root_cause`: Hypothesis
- `fix_approach`: Suggested fix

OUTPUT ENVELOPE (STRICT JSON):
```json
{
  "findings": [
    {
      "bug": "...",
      "file": "...",
      "severity": "P0",
      "reproduction": "...",
      "root_cause": "...",
      "fix_approach": "..."
    }
  ],
  "critique": "A critique of the current code/test coverage state.",
  "confidence": 95
}
```
