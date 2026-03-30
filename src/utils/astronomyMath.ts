/**
 * High-Precision Astronomical Math Utilities
 * Based on Jean Meeus' "Astronomical Algorithms"
 * Improves lunar calendar precision by accounting for True Solar Time 
 * (Equation of Time) and Precession (Apparent Solar Longitude).
 */

/**
 * Get exact Julian Day with fractional day time using standard Gregorian/Julian calculation.
 */
export function getExactJDN(date: Date): number {
    const y = date.getUTCFullYear();
    const m = date.getUTCMonth() + 1;
    const d = date.getUTCDate();
    const h = date.getUTCHours();
    const min = date.getUTCMinutes();
    const s = date.getUTCSeconds();
    const ms = date.getUTCMilliseconds();
    
    const dayFraction = d + (h + min / 60 + (s + ms / 1000) / 3600) / 24;

    let year = y;
    let month = m;
    if (m <= 2) {
        year -= 1;
        month += 12;
    }
    
    const A = Math.floor(year / 100);
    let B = 2 - A + Math.floor(A / 4);
    
    // Julian calendar before Oct 15, 1582
    if (y < 1582 || (y === 1582 && m < 10) || (y === 1582 && m === 10 && d < 15)) {
        B = 0;
    }

    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + dayFraction + B - 1524.5;
}

export function getJulianCentury(jd: number): number {
    return (jd - 2451545.0) / 36525.0;
}

/**
 * Equation of Time (EoT) calculation, returns variance in minutes.
 */
export function getEquationOfTime(jd: number): number {
    const T = getJulianCentury(jd);
    let L0 = 280.46646 + T * (36000.76983 + 0.0003032 * T);
    L0 = L0 % 360;
    const L0_rad = L0 * Math.PI / 180;

    let M = 357.52911 + T * (35999.05029 - 0.0001537 * T);
    M = M % 360;
    const M_rad = M * Math.PI / 180;

    // Eccentricity of Earth's orbit
    const e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T);

    const omega = 125.04 - 1934.136 * T;
    const omega_rad = omega * Math.PI / 180;

    // Mean obliquity of the ecliptic
    const epsilon0 = 23 + (26 + (21.448 - T * (46.8150 + T * (0.00059 - T * 0.001813))) / 60) / 60;
    // Corrected obliquity for nutation
    const epsilon = epsilon0 + 0.00256 * Math.cos(omega_rad);
    const epsilon_rad = epsilon * Math.PI / 180;

    const y = Math.pow(Math.tan(epsilon_rad / 2), 2);

    // EoT formula (in radians, then converted to minutes)
    let Etime = y * Math.sin(2 * L0_rad)
              - 2 * e * Math.sin(M_rad)
              + 4 * e * y * Math.sin(M_rad) * Math.cos(2 * L0_rad)
              - 0.5 * y * y * Math.sin(4 * L0_rad)
              - 1.25 * e * e * Math.sin(2 * M_rad);

    // Convert from radians to degrees, then to minutes of time (1 degree = 4 minutes)
    Etime = Etime * (180 / Math.PI) * 4;
    return Etime;
}

/**
 * Apparent Longitude of the Sun (Lambda)
 * Accounting for precession, nutation, and aberration relative to true equinox of date.
 * Necessary for high-precision Solar Terms (Tiết Khí).
 */
export function getHighPrecisionSunLongitude(jd: number): number {
    const T = getJulianCentury(jd);
    // Geometric Mean Longitude of the Sun (L0)
    let L0 = 280.46646 + T * (36000.76983 + T * 0.0003032);
    L0 = L0 % 360;
    if (L0 < 0) L0 += 360;

    // Mean Anomaly of the Sun (M)
    let M = 357.52911 + T * (35999.05029 - 0.0001537 * T);
    M = M % 360;
    if (M < 0) M += 360;

    const M_rad = M * Math.PI / 180;

    // Sun's Equation of Center (C)
    const C = Math.sin(M_rad) * (1.914602 - T * (0.004817 + 0.000014 * T)) +
              Math.sin(2 * M_rad) * (0.019993 - 0.000101 * T) +
              Math.sin(3 * M_rad) * 0.000289;

    // Sun True Longitude (O)
    const sunTrueLong = L0 + C;

    // Apparent Longitude (Lambda) - correcting for nutation and aberration
    const omega = 125.04 - 1934.136 * T;
    const omega_rad = omega * Math.PI / 180;
    
    let lambda = sunTrueLong - 0.00569 - 0.00478 * Math.sin(omega_rad);
    lambda = lambda % 360;
    if (lambda < 0) lambda += 360;

    return lambda;
}

/**
 * Calculates the True Solar Time for a given standard date.
 * Required for precise Bazi interpretation at hour boundaries.
 * 
 * @param date The standard date (LMT / Civil Time)
 * @param longitude local longitude in degrees (e.g., 105.8 for Hanoi)
 * @param timezoneOffset local timezone offset in minutes (e.g. -420 for UTC+7). If undefined, uses browser/system local offset.
 * @returns True Solar Time representation as a JS Date object.
 */
export function getTrueSolarTime(date: Date, longitude: number = 105, timezoneOffset?: number): Date {
    const jd = getExactJDN(date);
    const eot = getEquationOfTime(jd); // Equation of Time in minutes
    
    const tzOffsetMs = typeof timezoneOffset === 'number' ? timezoneOffset : date.getTimezoneOffset(); // -420 for UTC+7
    const standardMeridianDeg = Math.abs(tzOffsetMs / 60) * 15; // 7 * 15 = 105 degrees for UTC+7
    
    // Time shift: Every 1 degree difference is 4 minutes of time (since Earth rotates 360 deg in 1440 mins)
    const longitudeCorrectionStr = (longitude - standardMeridianDeg) * 4; 
    
    // True Solar Time = Mean Solar Time + Equation of Time + Longitude Correction
    const totalCorrectionMinutes = eot + longitudeCorrectionStr;
    
    return new Date(date.getTime() + totalCorrectionMinutes * 60000);
}
