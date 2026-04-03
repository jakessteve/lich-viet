# Task: Debug Track 1 - Architecture & Design (@sa)
## Goal: Audit structural integrity, coupling issues, and API contract violations in the new 4-Tab "Applet" architecture and multi-engine structures.
## Persona: @sa
## Files: `src/engines/`, `src/components/`, `src/types/` (Focus on Bazi, Chiem Tinh, Tu Vi integrations)

You must investigate the codebase for:
1. Structural anti-patterns
2. Coupling issues across UI and calculation engines
3. Dependency cycles
4. API contract violations between calculating models and React rendering components.

**Progress Reporting:** After completing each major step, output a progress marker:
`[PROGRESS] Step X/Y: <what you just completed>`
When finished, output: `[PROGRESS] Status: DONE`

## Constraints
DO NOT modify any files. Use `grep_search` and `view_file` to review architecture. 

## Expected Output Format
You MUST structure your final output strictly as JSON. 
Each finding must include:
- `bug`: Description
- `file`: Path and line number
- `severity`: P0-P3 classification
- `reproduction`: Steps to reproduce the architectural leak or issue
- `root_cause`: Hypothesis
- `fix_approach`: Suggested fix

OUTPUT ENVELOPE (STRICT JSON):
```json
{
  "findings": [
    {
      "bug": "...",
      "file": "...",
      "severity": "P1",
      "reproduction": "...",
      "root_cause": "...",
      "fix_approach": "..."
    }
  ],
  "critique": "A critique of the current architectural state and initial assumptions.",
  "confidence": 85
}
```
