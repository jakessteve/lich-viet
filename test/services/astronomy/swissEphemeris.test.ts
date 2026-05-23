import { describe, expect, it } from 'vitest';
import { Planet } from '@swisseph/core';
import {
  findSwissNewMoon,
  findSwissSolarTermBoundary,
  getSwissSolarTerm,
  getSwissSunLongitude,
  type SwissEphemerisInstance,
} from '@/services/astronomy/swissEphemeris';

const fakeSwe: SwissEphemerisInstance = {
  calculatePosition(jd, body) {
    if (body === Planet.Sun) {
      return {
        longitude: jd,
        latitude: 0,
        distance: 0,
        longitudeSpeed: 1,
        latitudeSpeed: 0,
        distanceSpeed: 0,
      };
    }
    return {
      longitude: 13 * jd,
      latitude: 0,
      distance: 0,
      longitudeSpeed: 13,
      latitudeSpeed: 0,
      distanceSpeed: 0,
    };
  },
  dateToJulianDay(date) {
    return date.getTime() / 86400000;
  },
  julianDay(year, month, day, hour = 0) {
    return Date.UTC(year, month - 1, day, Math.floor(hour)) / 86400000;
  },
  version() {
    return 'fake';
  },
  close() {},
};

describe('swissEphemeris sidecar', () => {
  it('normalizes Swiss sun longitude results', () => {
    expect(getSwissSunLongitude(fakeSwe, 361)).toBe(1);
    expect(getSwissSunLongitude(fakeSwe, -1)).toBe(359);
  });

  it('maps solar longitude to the existing Tiết Khí order', () => {
    expect(getSwissSolarTerm(fakeSwe, 315)).toBe('Lập Xuân');
    expect(getSwissSolarTerm(fakeSwe, 0)).toBe('Xuân Phân');
  });

  it('solves solar term boundaries from longitude and speed', () => {
    const boundary = findSwissSolarTermBoundary(fakeSwe, 316, 315);
    expect(boundary).toBeCloseTo(315, 6);
  });

  it('solves new moon conjunctions from sun/moon longitude delta', () => {
    const newMoon = findSwissNewMoon(fakeSwe, 1);
    expect(newMoon).toBeCloseTo(0, 6);
  });
});
