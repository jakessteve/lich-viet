# Lịch Việt v2 — Upgrade Plan Review & Best Solution

> **@pm** Critical review of the [previous upgrade plan](file:///C:/Users/HeoCop/.gemini/antigravity/brain/a47bbf44-9393-43b8-89ef-a0e5fa8a1469/implementation_plan.md) and its [risk analysis](file:///C:/Users/HeoCop/.gemini/antigravity/brain/a47bbf44-9393-43b8-89ef-a0e5fa8a1469/risk_analysis.md), with a revised best-solution recommendation.

---

## 1. Previous Plan Recap

The prior conversation produced a **4-phase, 20-week plan** (No Rust/Tauri):

| Phase | Sprints | Content |
|-------|---------|---------|
| 1: Testing Debt | 1-2 | Coverage baseline, gold-standard tests, CI gates |
| 2: Backend + Security | 3-5 | Supabase auth, Edge Functions, RLS, CSP hardening |
| 3: Aggregation + Monetization | 6-8 | Insight Aggregator, Paywall overlay, Stripe |
| 4: Performance + PWA | 9-10 | Web Workers, IndexedDB cache, PWA, bundle audit |

**Status:** None of the phases were started. All Phase 1 tasks remain unchecked.

---

## 2. What the Previous Plan Got Right

| Decision | Verdict | Reasoning |
|----------|---------|-----------|
| No Rust/Tauri | **Correct** | Would be a greenfield Rust project inside a frontend app. Estimated to double the timeline. Not worth it for a web-first product. |
| Supabase as BaaS | **Correct** | OSS, generous free tier, Edge Functions for server-side computation, built-in auth + RLS. Best fit for indie/solo dev. |
| Server-side premium engines | **Correct** | The ONLY real anti-bypass strategy. Premium engine code never ships to the browser — nothing to reverse-engineer. |
| Testing-first approach | **Correct** | Must establish a quality baseline before touching architecture. |
| PWA strategy | **Correct** | Perfect for a Vietnamese Lunar Calendar app — installable, offline-capable, no app store needed. |

---

## 3. What's Wrong with the Previous Plan

### 3.1 Timeline Is Unrealistic (20 weeks)

For a solo/small-team project, 20 weeks before any visible user value is too long. The plan front-loads 10 weeks of infrastructure (testing + backend) before users see any change.

### 3.2 Phase 2 Is Over-Engineered

The plan includes enterprise-grade security features that are premature for the current stage:
- HMAC request signing (premature — no known attack surface justifies this)
- Anti-debugging / integrity checks (annoying to legitimate devs, easy to bypass)
- Trusted Types CSP (complex to implement, browser support still evolving)
- 60/min rate limiting (solve when you have the traffic to justify it)

### 3.3 Insight Aggregation Is Underdefined R&D

Risk #3 from the original analysis remains unresolved: there's no specification for how to weight/merge 11+ engines into a single score. This is a **research problem**, not an engineering task. Attempting it during this upgrade risks open-ended stalling.

### 3.4 Missing Critical Elements

| Gap | Impact |
|-----|--------|
| **No deployment strategy** | Where does the SPA live? No Vercel/Netlify/Cloudflare config. |
| **No analytics** | How will you know which features are used? No data = blind decisions. |
| **No SEO/landing page plan** | The app needs discoverability for Vietnamese users. |
| **No mobile-first focus** | Vietnamese users are 70%+ mobile. PWA alone isn't enough — UX must be touch-optimized. |

---

## 4. Best Solution: Compressed 3-Phase Plan

> [!IMPORTANT]
> **Core Principle:** Ship to users fast. Every phase must deliver visible, deployable value. Infrastructure serves the user, not the other way around.

### Phase A: Foundation & Deploy _(3 weeks)_

**Goal:** Get the app live, measurable, and installable.

| Task | Details |
|------|---------|
| **Run coverage baseline** | `vitest --coverage` → know exact gaps per engine |
| **Snapshot tests** | Lock all 11 engine outputs with fixed inputs |
| **Deploy to Vercel** | Free tier, automatic HTTPS, preview deployments for PRs |
| **PWA manifest + Service Worker** | `vite-plugin-pwa`, offline shell, installable on mobile |
| **Analytics** | Minimal: Plausible or Umami (privacy-first, GDPR-compliant) |

**Exit condition:** App is live at `lichviet.app` (or similar), installable as PWA, with analytics tracking page views and feature usage.

---

### Phase B: Auth + Premium Backend _(4 weeks)_

**Goal:** Secure authentication and move premium engines server-side.

| Task | Details |
|------|---------|
| **Supabase project** | Auth (Google OAuth + anonymous guest mode), user profiles table |
| **Edge Functions for premium engines** | Start with **3 highest-value engines**: Bát Tự full reading, Tử Vi temporal overlays, QMDJ |
| **Paywall overlay** | Glassmorphism blur + teaser preview (2 lines visible, rest blurred) |
| **Feature flags** | Zustand store flags for progressive rollout |
| **RLS on all tables** | Users read own data only; subscriptions are server-write-only |

> [!TIP]
> **Skip for now:** HMAC signing, anti-debugging, Trusted Types CSP, rate limiting. Add these when traffic justifies the complexity.

**Exit condition:** Users can sign in, see free content, hit paywall on premium engines. Premium engines run on Supabase Edge Functions only.

---

### Phase C: Monetization + Polish _(3 weeks)_

**Goal:** Revenue + user retention.

| Task | Details |
|------|---------|
| **Stripe integration** | Checkout via Edge Function (secret key never on client) |
| **Subscription management** | Webhook → DB update, customer portal link |
| **Web Worker optimization** | Move free engines off main thread |
| **IndexedDB cache** | Cache deterministic results (calendar: 24h TTL, natal charts: 30d) |
| **SEO landing page** | Vietnamese keywords, meta tags, structured data for Google |

**Exit condition:** Users can pay, subscription unlocks premium engines immediately, free engines are fast and cached.

---

## 5. What Gets Deferred (and Why)

| Item | Why Defer |
|------|-----------|
| **Insight Aggregation (daily score)** | Under-specified R&D. Ship the individual engines first; aggregate later when you have user data on which engines matter. |
| **HMAC request signing** | Premature. No known attack requires this yet. |
| **Anti-debugging / integrity checks** | Low ROI. Server-side computation is the real defense. |
| **Rust/Tauri backend** | Greenfield effort with 6-8 sprint cost. Web Worker performance is sufficient. |
| **Trusted Types CSP** | Complex, limited browser support. Standard CSP is enough for now. |
| **CI coverage gates** | Nice-to-have after baseline is established. Manual review works at small scale. |
| **Rate limiting** | Solve when you have the traffic to need it. |

---

## 6. Comparison: Old Plan vs. Recommended Plan

| Dimension | Previous Plan | Recommended Plan |
|-----------|--------------|-----------------|
| **Total time** | 20 weeks (10 sprints) | **10 weeks** (5 sprints) |
| **Time to first deploy** | Week 10+ | **Week 3** |
| **Time to revenue** | Week 16+ | **Week 10** |
| **Backend choice** | Supabase | Supabase (same) |
| **Security model** | Over-engineered (7 layers) | **Right-sized** (3 layers: server-side engines + auth + RLS) |
| **Risk of stalling** | High (Insight Aggregation is R&D) | **Low** (all tasks are well-defined) |
| **User value per phase** | Low early, high late | **High every phase** |

---

## 7. Decisions Needed From You

1. **Deployment platform:** Vercel (recommended) vs. Netlify vs. Cloudflare Pages?
2. **Domain:** Do you have `lichviet.app` or similar? Or deploy to a subdomain first?
3. **BaaS:** Supabase (recommended) vs. Firebase?
4. **Paywall model:** Subscription (monthly/yearly) vs. one-time unlock?
5. **Which 3 engines to put behind paywall first?** Recommendation: Bát Tự full, Tử Vi overlays, QMDJ.
6. **Analytics:** Plausible (paid, privacy-first) vs. Umami (self-hosted, free) vs. Google Analytics?

---

## 8. Summary

> [!IMPORTANT]
> **The best solution is the previous plan, but compressed to half the time by stripping over-engineering and deferring R&D.** The core strategy (Supabase + server-side premium engines + PWA) is correct. The execution order should be: **Deploy first → Auth + Paywall → Monetize.** Testing baseline happens in Phase A but doesn't block shipping.
