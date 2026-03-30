/**
 * nominatimService — OpenStreetMap Nominatim geocoding API wrapper
 * Free, no API key required. Rate limit: 1 request/sec.
 * https://nominatim.org/release-docs/latest/api/Search/
 */

import { NOMINATIM_CONFIG, APP_CONFIG } from '../config/api';

const BASE_URL = NOMINATIM_CONFIG.baseUrl;
const USER_AGENT = APP_CONFIG.userAgent;

import { z } from 'zod';

// Zod schema for Nominatim API response validation (HIGH-04)
const RawNominatimSchema = z.object({
    place_id: z.number(),
    display_name: z.string(),
    lat: z.string(),
    lon: z.string(),
    address: z.object({
        city: z.string().optional(),
        town: z.string().optional(),
        village: z.string().optional(),
        hamlet: z.string().optional(),
        state: z.string().optional(),
        province: z.string().optional(),
        region: z.string().optional(),
        country: z.string().optional(),
        country_code: z.string().optional(),
    }).optional(),
});

const RawNominatimArraySchema = z.array(RawNominatimSchema);

export interface NominatimResult {
    placeId: number;
    displayName: string;
    lat: number;
    lng: number;
    country: string;
    state: string;
    city: string;
    /** ISO 3166-1 alpha-2 country code */
    countryCode: string;
}

interface RawNominatimResult {
    place_id: number;
    display_name: string;
    lat: string;
    lon: string;
    address?: {
        city?: string;
        town?: string;
        village?: string;
        hamlet?: string;
        state?: string;
        province?: string;
        region?: string;
        country?: string;
        country_code?: string;
    };
}

/**
 * Extract the most specific city-level name from Nominatim address breakdown.
 */
function extractCity(address?: RawNominatimResult['address']): string {
    if (!address) return '';
    return address.city || address.town || address.village || address.hamlet || '';
}

function extractState(address?: RawNominatimResult['address']): string {
    if (!address) return '';
    return address.state || address.province || address.region || '';
}

function mapResult(raw: RawNominatimResult): NominatimResult {
    return {
        placeId: raw.place_id,
        displayName: raw.display_name,
        lat: parseFloat(raw.lat),
        lng: parseFloat(raw.lon),
        country: raw.address?.country || '',
        state: extractState(raw.address),
        city: extractCity(raw.address),
        countryCode: raw.address?.country_code?.toUpperCase() || '',
    };
}

// ─── Rate Limiter (1 req/sec) ───────────────────────────────────────────────

let lastRequestTime = 0;

async function rateLimitedFetch(url: string): Promise<Response> {
    const now = Date.now();
    const elapsed = now - lastRequestTime;
    if (elapsed < 1000) {
        await new Promise(r => setTimeout(r, 1000 - elapsed));
    }
    lastRequestTime = Date.now();
    return fetch(url, {
        headers: { 'User-Agent': USER_AGENT },
    });
}

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * Search for locations by free-text query.
 * Returns up to 8 results with address breakdown.
 */
export async function searchLocations(query: string): Promise<NominatimResult[]> {
    if (!query || query.trim().length < 2) return [];

    const params = new URLSearchParams({
        q: query.trim(),
        format: 'jsonv2',
        addressdetails: '1',
        limit: '8',
        'accept-language': 'vi,en',
    });

    try {
        const res = await rateLimitedFetch(`${BASE_URL}/search?${params}`);
        if (!res.ok) throw new Error(`Nominatim ${res.status}`);
        const json = await res.json();
        const validated = RawNominatimArraySchema.safeParse(json);
        if (!validated.success) return [];
        return validated.data.map(mapResult);
    } catch (err) {
        if (import.meta.env.DEV) console.error('[nominatimService] searchLocations error:', err);
        return [];
    }
}

/**
 * Reverse geocode (lat, lng) to location info.
 */
export async function reverseGeocode(lat: number, lng: number): Promise<NominatimResult | null> {
    const params = new URLSearchParams({
        lat: lat.toFixed(6),
        lon: lng.toFixed(6),
        format: 'jsonv2',
        addressdetails: '1',
        'accept-language': 'vi,en',
    });

    try {
        const res = await rateLimitedFetch(`${BASE_URL}/reverse?${params}`);
        if (!res.ok) throw new Error(`Nominatim ${res.status}`);
        const json = await res.json();
        const validated = RawNominatimSchema.safeParse(json);
        if (!validated.success) return null;
        return mapResult(validated.data);
    } catch (err) {
        if (import.meta.env.DEV) console.error('[nominatimService] reverseGeocode error:', err);
        return null;
    }
}
