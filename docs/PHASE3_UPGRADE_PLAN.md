# Phase 3: Architecture & Monetization Upgrade Plan

> **Status:** APPROVED (2026-03-14)  
> **Scope:** 10 sprints (~20 weeks)  
> **Stack Change:** Pure SPA → SPA + Supabase (Auth, Edge Functions, DB)

---

## Executive Summary

Transform Lịch Việt v2 from an over-engineered academic encyclopedia into an actionable daily advisor with a hardened freemium monetization model. No Rust/Tauri — leverage Web Workers, Supabase Edge Functions, and PWA instead.

### Core Strategy
- **Premium engine code runs ONLY on Supabase Edge Functions** — never shipped to the browser.
- Free tier: Calendar + Dụng Sự + basic Numerology + basic Bát Tự (day pillar).
- Premium tier: Full Bát Tự, QMDJ, Thái Ất, Lục Nhâm, Western Natal detail, Tử Vi overlays.

---

## Phase 1: Testing Debt Freeze _(Sprint 1-2)_

- [ ] Add `@vitest/coverage-v8` and `test:coverage` script
- [ ] Configure per-engine 90% branch coverage thresholds
- [ ] Write parameterized gold-standard tests (20+ Bazi births, 24 Flying Star facings, etc.)
- [ ] Add snapshot regression tests for all 11 engines
- [ ] CI gate: PR fails if coverage drops below threshold

## Phase 2: Backend Infrastructure + Security _(Sprint 3-5)_

- [ ] Scaffold Supabase project (config, migrations, auth)
- [ ] Implement Supabase Auth (email + Google OAuth + anonymous guest)
- [ ] Create `authStore.ts` (Zustand) and `LoginModal.tsx`
- [ ] Build `premium-engine` Edge Function (JWT validation → tier check → compute → return)
- [ ] Move 6 premium engines to `supabase/functions/_shared/engines/`
- [ ] Row Level Security (RLS) on all tables
- [ ] Tighten CSP: remove `unsafe-inline`, add Trusted Types
- [ ] Strip premium engine code from client Vite build
- [ ] Hidden source maps for production
- [ ] API middleware: rate limiting (60/min), CORS lock, HMAC signing, Zod validation

## Phase 3: Insight Aggregation + Monetization UI _(Sprint 6-8)_

- [ ] Build `insightAggregator.ts` (weighted: 50% Dụng Sự + 30% Bát Tự + 20% Numerology)
- [ ] Create i18n-ready Vietnamese summary templates
- [ ] Redesign daily view: default = clean score card, expandable details
- [ ] Add `AdvancedModeToggle.tsx` (simple ↔ academic view)
- [ ] Build `PaywallOverlay.tsx` (glassmorphism blur + lock + teaser)
- [ ] Build `PremiumEngineWrapper.tsx` (HOC: free → overlay, pro → Edge Function call)
- [ ] Stripe integration via Edge Function (webhook → DB subscription update)
- [ ] `paymentService.ts` (client → Stripe Checkout redirect)

## Phase 4: Performance + PWA _(Sprint 9-10)_

- [ ] Migrate 3 free engines into Web Workers
- [ ] Create `useWorkerEngine.ts` hook
- [ ] Implement IndexedDB computation cache (TTL: 24h calendar, 30d charts)
- [ ] PWA: `manifest.json`, service worker (precache + stale-while-revalidate)
- [ ] Add `vite-plugin-pwa`
- [ ] Bundle audit: target < 100KB main chunk

---

## Security Hardening Matrix

| Layer | Mechanism | Prevents |
|-------|-----------|----------|
| Engine Code | Server-side only (Edge Functions) | Code extraction |
| Auth | JWT 15-min expiry + refresh | Session hijacking |
| Database | RLS on all tables | IDOR |
| API | Rate limit + HMAC signing | Brute force, replay |
| Input | Shared Zod schemas | Injection |
| Transport | HTTPS + strict CORS | MITM |
| CSP | No unsafe-inline + Trusted Types | XSS |
| Payment | Stripe webhook → server mutation | Subscription forgery |
| Build | Hidden sourcemaps, code stripping | Source exposure |

---

## Verification Checklist

- [ ] `npm run test:coverage` → 90%+ per engine
- [ ] Premium Edge Function rejects unauthenticated requests (401)
- [ ] Client-side tier forgery has no effect on server responses
- [ ] `dist/` contains zero premium engine code
- [ ] Lighthouse: Performance 90+, CSP headers pass
- [ ] PWA offline fallback renders cached data
- [ ] Stripe checkout → immediate premium unlock
