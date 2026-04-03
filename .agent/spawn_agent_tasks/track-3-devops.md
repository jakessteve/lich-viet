# Task: Debug Track 3 - Infrastructure & Security (@devops & @whitehat-hacker)
## Goal: Audit dependencies, build configurations, memory leaks, and input sanitization on newly added components.
## Persona: @whitehat-hacker
## Files: `package.json`, `vite.config.ts`, `src/components/`

You must investigate the codebase for:
1. Dependency conflicts or vulnerabilities (CVEs) in package.json.
2. Build gaps or resource leaks inside the `vite.config.ts` configuration.
3. Input validation bypass or injection vectors specifically on any new forms or dynamic visual renderings added in the past sprint. 
4. CSP (Content Security Policy) coverage.

**Progress Reporting:** After completing each major step, output a progress marker:
`[PROGRESS] Step X/Y: <what you just completed>`
When finished, output: `[PROGRESS] Status: DONE`

## Constraints
DO NOT modify any files. Review files using standard CLI tools.

## Expected Output Format
You MUST structure your final output strictly as JSON. 
Each finding must include:
- `bug`: Description
- `file`: Path and line number
- `severity`: P0-P3 classification
- `reproduction`: Steps to reproduce the exploit or build failure
- `root_cause`: Hypothesis
- `fix_approach`: Suggested fix

OUTPUT ENVELOPE (STRICT JSON):
```json
{
  "findings": [
    {
      "bug": "...",
      "file": "...",
      "severity": "P2",
      "reproduction": "...",
      "root_cause": "...",
      "fix_approach": "..."
    }
  ],
  "critique": "A critique of the infrastructural and security robustness.",
  "confidence": 90
}
```
