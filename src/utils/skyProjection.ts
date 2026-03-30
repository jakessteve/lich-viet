/**
 * Sky Projection Utilities — Astronomical coordinate transforms
 * for rendering an interactive sky map from birth data.
 *
 * Pipeline:
 *   Calendar Date → Julian Date → Sidereal Time
 *   Ecliptic (λ,β) → Equatorial (RA,Dec) → Horizontal (Alt,Az)
 *   Horizontal → Stereographic screen (x,y)
 */

// ─── Constants ──────────────────────────────────────────────────────────────

const DEG = Math.PI / 180;
const RAD = 180 / Math.PI;
const OBLIQUITY_J2000 = 23.4393; // Mean obliquity of the ecliptic at J2000.0

// ─── Julian Date ────────────────────────────────────────────────────────────

/**
 * Convert calendar date+time to Julian Date.
 * Uses the standard algorithm for dates after 1582-10-15 (Gregorian).
 */
export function toJulianDate(
    year: number, month: number, day: number,
    hour: number = 0, minute: number = 0, timezone: number = 0,
): number {
    // Convert to UTC
    const utcHour = hour - timezone + minute / 60;
    let y = year;
    let m = month;
    if (m <= 2) { y -= 1; m += 12; }
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (y + 4716)) +
        Math.floor(30.6001 * (m + 1)) +
        day + utcHour / 24 + B - 1524.5;
}

// ─── Sidereal Time ──────────────────────────────────────────────────────────

/**
 * Greenwich Mean Sidereal Time in degrees (0-360).
 */
export function greenwichSiderealTime(jd: number): number {
    const T = (jd - 2451545.0) / 36525.0; // Julian centuries from J2000.0
    const gmst = 280.46061837 +
        360.98564736629 * (jd - 2451545.0) +
        0.000387933 * T * T -
        T * T * T / 38710000;
    return ((gmst % 360) + 360) % 360;
}

/**
 * Local Sidereal Time in degrees for a given longitude.
 */
export function localSiderealTime(jd: number, longitudeDeg: number): number {
    const gst = greenwichSiderealTime(jd);
    return ((gst + longitudeDeg) % 360 + 360) % 360;
}

// ─── Coordinate Transforms ─────────────────────────────────────────────────

/**
 * Convert ecliptic coordinates (longitude λ, latitude β in degrees)
 * to equatorial coordinates (RA, Dec in degrees).
 */
export function eclipticToEquatorial(
    eclLon: number, eclLat: number,
): { ra: number; dec: number } {
    const eps = OBLIQUITY_J2000 * DEG;
    const lam = eclLon * DEG;
    const bet = eclLat * DEG;

    const sinDec = Math.sin(bet) * Math.cos(eps) +
        Math.cos(bet) * Math.sin(eps) * Math.sin(lam);
    const dec = Math.asin(sinDec) * RAD;

    const y = Math.sin(lam) * Math.cos(eps) - Math.tan(bet) * Math.sin(eps);
    const x = Math.cos(lam);
    let ra = Math.atan2(y, x) * RAD;
    ra = ((ra % 360) + 360) % 360;

    return { ra, dec };
}

/**
 * Convert equatorial coordinates (RA, Dec in degrees)
 * to horizontal coordinates (altitude, azimuth in degrees).
 *
 * @param ra  Right Ascension in degrees
 * @param dec Declination in degrees
 * @param lst Local Sidereal Time in degrees
 * @param lat Observer latitude in degrees
 * @returns { alt, az } in degrees. Az is measured from North, increasing eastward.
 */
export function equatorialToHorizontal(
    ra: number, dec: number,
    lst: number, lat: number,
): { alt: number; az: number } {
    const ha = (lst - ra) * DEG;  // Hour angle
    const decR = dec * DEG;
    const latR = lat * DEG;

    const sinAlt = Math.sin(decR) * Math.sin(latR) +
        Math.cos(decR) * Math.cos(latR) * Math.cos(ha);
    const alt = Math.asin(sinAlt) * RAD;

    const cosA = (Math.sin(decR) - Math.sin(alt * DEG) * Math.sin(latR)) /
        (Math.cos(alt * DEG) * Math.cos(latR));
    let az = Math.acos(Math.max(-1, Math.min(1, cosA))) * RAD;

    // Azimuth direction: if sin(ha) > 0, az = 360 - az
    if (Math.sin(ha) > 0) az = 360 - az;

    return { alt, az };
}

// ─── Stereographic Projection ───────────────────────────────────────────────

export interface ScreenCoord {
    x: number;  // -1 to +1 (normalized)
    y: number;  // -1 to +1 (normalized)
    visible: boolean;  // true if above the horizon (alt >= 0)
}

/**
 * Stereographic projection from altitude/azimuth to normalized screen coords.
 * Center of projection is the zenith.
 * Objects at the horizon map to the unit circle edge.
 *
 * @param alt Altitude in degrees (-90 to +90)
 * @param az  Azimuth in degrees (0=N, 90=E, 180=S, 270=W)
 * @param rotation Extra rotation in degrees (default 0). Allows user to spin the sky map.
 */
export function stereographicProject(
    alt: number, az: number,
    rotation: number = 0,
): ScreenCoord {
    // Zenith-centered: zenith at center, horizon at edge
    // r = cos(alt) / (1 + sin(alt))  — stereographic from pole
    const altR = alt * DEG;
    const azR = (az + rotation) * DEG;

    // For objects below horizon, we still compute but mark as not visible
    const r = Math.cos(altR) / (1 + Math.sin(altR));

    // Map azimuth: North at top, East at left (sky-mirrored view)
    const x = -r * Math.sin(azR);  // Mirror: East appears on left
    const y = -r * Math.cos(azR);  // North at top

    return { x, y, visible: alt >= -5 }; // Show stars a bit below horizon
}

// ─── Sun Position (approximate) ─────────────────────────────────────────────

/**
 * Approximate sun ecliptic longitude for a given Julian Date.
 * Accuracy: ~1° (sufficient for sky gradient/day-night).
 */
export function sunEclipticLongitude(jd: number): number {
    const n = jd - 2451545.0; // Days since J2000.0
    const L = (280.460 + 0.9856474 * n) % 360;
    const g = ((357.528 + 0.9856003 * n) % 360 + 360) % 360;

    const lambda = L + 1.915 * Math.sin(g * DEG) + 0.020 * Math.sin(2 * g * DEG);
    return ((lambda % 360) + 360) % 360;
}

/**
 * Calculate the sun's altitude at a given moment for day/night determination.
 */
export function sunAltitude(
    jd: number, latitude: number, longitude: number,
): number {
    const sunLon = sunEclipticLongitude(jd);
    const { ra, dec } = eclipticToEquatorial(sunLon, 0);
    const lst = localSiderealTime(jd, longitude);
    const { alt } = equatorialToHorizontal(ra, dec, lst, latitude);
    return alt;
}

// ─── Planet projection helper ───────────────────────────────────────────────

/**
 * Project a planet from its ecliptic longitude (degree 0-360) to screen coords.
 * Assumes planet ecliptic latitude ≈ 0 (good approximation for most planets).
 */
export function projectPlanetToScreen(
    eclipticLongitude: number,
    jd: number,
    latitude: number,
    longitude: number,
    rotation: number = 0,
): ScreenCoord & { alt: number; az: number } {
    const { ra, dec } = eclipticToEquatorial(eclipticLongitude, 0);
    const lst = localSiderealTime(jd, longitude);
    const { alt, az } = equatorialToHorizontal(ra, dec, lst, latitude);
    const screen = stereographicProject(alt, az, rotation);
    return { ...screen, alt, az };
}

/**
 * Project a star from its RA/Dec to screen coordinates.
 */
export function projectStarToScreen(
    ra: number, dec: number,
    jd: number,
    latitude: number,
    longitude: number,
    rotation: number = 0,
): ScreenCoord & { alt: number; az: number } {
    const lst = localSiderealTime(jd, longitude);
    const { alt, az } = equatorialToHorizontal(ra, dec, lst, latitude);
    const screen = stereographicProject(alt, az, rotation);
    return { ...screen, alt, az };
}

// ─── Magnitude → visual size ────────────────────────────────────────────────

/**
 * Convert apparent magnitude to a pixel radius for rendering.
 * Brighter stars (lower mag) → larger radius.
 */
export function magnitudeToRadius(mag: number): number {
    // Sirius (mag -1.46) → ~4px, mag 3.5 → ~0.8px
    const base = 4.5;
    const scale = 0.7;
    return Math.max(0.5, base - scale * mag);
}
