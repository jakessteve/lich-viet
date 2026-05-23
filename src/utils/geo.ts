import type { SwissGeoLocation } from '@/services/astronomy/swissEphemeris';

const MIN_TIMEZONE_OFFSET = -12;
const MAX_TIMEZONE_OFFSET = 14;

export function estimateTimezoneOffsetHours(longitude: number): number {
  return Math.max(MIN_TIMEZONE_OFFSET, Math.min(MAX_TIMEZONE_OFFSET, Math.round(longitude / 15)));
}

export function buildSwissGeoLocation(longitude: number): SwissGeoLocation {
  return {
    longitude,
    timezoneOffsetHours: estimateTimezoneOffsetHours(longitude),
  };
}

export function getDatePartsInOffset(date: Date, offsetHours: number) {
  const shifted = new Date(date.getTime() + offsetHours * 60 * 60 * 1000);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
    hour: shifted.getUTCHours(),
    minute: shifted.getUTCMinutes(),
    second: shifted.getUTCSeconds(),
    millisecond: shifted.getUTCMilliseconds(),
  };
}

export function getCivilDateForOffset(date: Date, offsetHours: number): Date {
  const parts = getDatePartsInOffset(date, offsetHours);
  return new Date(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
    parts.millisecond,
  );
}
