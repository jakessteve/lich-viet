# Security Model — Lịch Việt v2

## Architecture

Lịch Việt is a **client-side-only SPA** (React + Vite). There is **no backend server**. All computation, data storage, and authentication run entirely in the browser.

## Authentication

> ⚠️ **DEMO ONLY** — Authentication is implemented in `localStorage` for demonstration purposes. It is **NOT suitable for production use** with real user data.

**Limitations:**
- User "database" (emails + password hashes) is stored in `localStorage`, accessible via browser DevTools
- SHA-256 hashing is used without salt (not suitable for real password storage)
- 2FA accepts any 6-digit code (simulated)
- Admin authentication uses a client-side hash comparison

**For production migration**, implement server-side auth via Firebase Auth, Supabase Auth, or a custom backend with:
- bcrypt/argon2 password hashing with per-user salts
- Server-stored session tokens (HttpOnly cookies)
- Real TOTP 2FA (RFC 6238)

## Content Security Policy

CSP is configured via `<meta>` tags in `index.html`:
- `script-src 'self'` — only same-origin scripts
- `style-src-elem 'self'` — only same-origin stylesheets (no inline `<style>` tags)
- `style-src-attr 'unsafe-inline'` — allowed for dynamic React styles (`style` attributes)
- `frame-src 'none'` + `frame-ancestors 'none'` — anti-clickjacking
- `object-src 'none'` — blocks plugins
- `base-uri 'self'` — prevents base tag hijacking

**Note:** `style-src-attr` includes `'unsafe-inline'` due to framework requirements (dynamic progress bars, etc.), but all static `<style>` tags have been moved to external files.

## External API Calls

| Service | Purpose | Data Sent |
|---|---|---|
| Nominatim (OpenStreetMap) | Geocoding | Location search queries |
| ipapi.co | Geo-IP detection | User's IP (via browser) |
| date.nager.at | Public holidays | Country code |

No authentication tokens or user data are sent to external services.

## Reporting Vulnerabilities

If you discover a security issue, please open a private issue on the GitHub repository.
