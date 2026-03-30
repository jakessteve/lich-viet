/**
 * Centralized API & External Resource Configuration
 *
 * All API endpoints, CDN URLs, and external service URLs are defined here
 * as a single source of truth. Supports environment variable overrides
 * for different deployment environments.
 *
 * Usage: import { API_CONFIG } from '@/config/api';
 */

// ── Nominatim Geocoding API ───────────────────────────────────
export const NOMINATIM_CONFIG = {
    baseUrl: import.meta.env.VITE_NOMINATIM_URL || 'https://nominatim.openstreetmap.org',
    /** Rate limit interval in ms (Nominatim policy: 1 req/sec) */
    rateLimitMs: 1000,
    /** Max search results */
    searchLimit: 8,
    /** Accept-Language header for results */
    acceptLanguage: 'vi,en',
} as const;

// ── Holidays & Geo IP APIs ────────────────────────────────────
export const HOLIDAYS_CONFIG = {
    nagerApiBase: import.meta.env.VITE_NAGER_URL || 'https://date.nager.at/api/v3',
    geoIpUrl: import.meta.env.VITE_GEOIP_URL || 'https://ipapi.co/json/',
    /** Geo cache TTL in ms (24 hours) */
    geoCacheTtlMs: 24 * 60 * 60 * 1000,
    /** Geo IP request timeout in ms */
    geoTimeoutMs: 5000,
} as const;

// ── Map Tiles & Marker Icons ──────────────────────────────────
export const MAP_CONFIG = {
    tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    tileAttribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18,
    defaultZoom: 10,
    markerIcons: {
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    },
} as const;

// ── App Identity ──────────────────────────────────────────────
export const APP_CONFIG = {
    name: 'LichViet',
    version: '2.2.0',
    get userAgent() {
        return `${this.name}/${this.version}`;
    },
    githubUrl: 'https://github.com/minhcopilot/Lich-Viet',
} as const;
