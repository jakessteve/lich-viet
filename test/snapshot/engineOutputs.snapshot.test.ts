/**
 * Engine Output Snapshot Tests
 *
 * These tests lock the output of every calculation engine with fixed,
 * canonical inputs. Any accidental change to engine logic will break
 * a snapshot, ensuring regressions are caught before they ship.
 *
 * To update snapshots after an INTENTIONAL change:
 *   npx vitest run test/snapshot/ --update
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { ensureHexagramsLoaded } from '../../src/utils/maiHoaEngine';

beforeAll(async () => {
  await ensureHexagramsLoaded();
});

// ── Calendar Engine ──────────────────────────────────────────────
import { getDetailedDayData } from '../../src/utils/calendarEngine';

describe('Calendar Engine — Snapshot', () => {
  it('produces a stable output for 2026-01-15', () => {
    const date = new Date(2026, 0, 15); // Jan 15, 2026
    const result = getDetailedDayData(date);
    expect(result).toMatchSnapshot();
  });

  it('produces a stable output for Tet 2026 (2026-02-17)', () => {
    const date = new Date(2026, 1, 17); // Feb 17, 2026 — Tet
    const result = getDetailedDayData(date);
    expect(result).toMatchSnapshot();
  });
});

// ── Bazi Engine ──────────────────────────────────────────────────
import { generateBaziChart } from '../../src/utils/baziEngine';

describe('Bazi Engine — Snapshot', () => {
  it('produces a stable chart for male, 1990-08-15, hour 10, Hanoi', () => {
    const birthDate = new Date(1990, 7, 15); // Aug 15, 1990
    const result = generateBaziChart(birthDate, 10, true, 105.85);
    expect(result).toMatchSnapshot();
  });

  it('produces a stable chart for female, 2000-03-01, hour 6', () => {
    const birthDate = new Date(2000, 2, 1); // Mar 1, 2000
    const result = generateBaziChart(birthDate, 6, false, 105.85);
    expect(result).toMatchSnapshot();
  });
});

// ── Natal Chart Engine (Western Astrology) ───────────────────────
import { calculateNatalChart } from '../../src/utils/natalChartCalculator';

describe('Natal Chart Engine — Snapshot', () => {
  it('produces a stable chart for Hanoi birth, 1990-08-15 10:30', () => {
    const result = calculateNatalChart({
      year: 1990,
      month: 8,
      day: 15,
      hour: 10,
      minute: 30,
      latitude: 21.0285,
      longitude: 105.8542,
      timezone: 7,
    });
    expect(result).toMatchSnapshot();
  });
});

// ── Numerology Engine ────────────────────────────────────────────
import { generateNumerologyProfile } from '../../src/utils/numerologyEngine';

describe('Numerology Engine — Snapshot', () => {
  it('produces a stable Pythagorean profile for "Nguyen Van A", 1990-08-15', () => {
    const birthDate = new Date(1990, 7, 15);
    const result = generateNumerologyProfile('Nguyen Van A', birthDate, 'pythagorean');
    // personalCycle depends on current date — exclude from snapshot
    const { personalCycle: _pc, ...stable } = result;
    expect(stable).toMatchSnapshot();
  });

  it('produces a stable Chaldean profile for "Tran Thi B", 2000-03-01', () => {
    const birthDate = new Date(2000, 2, 1);
    const result = generateNumerologyProfile('Tran Thi B', birthDate, 'chaldean');
    const { personalCycle: _pc, ...stable } = result;
    expect(stable).toMatchSnapshot();
  });
});

// ── Mai Hoa Engine (Plum Blossom) ────────────────────────────────
import { performTimeBasedDivination, performNumberBasedDivination } from '../../src/utils/maiHoaEngine';

describe('Mai Hoa Engine — Snapshot', () => {
  it('produces a stable time-based divination', () => {
    // Lunar year 2026, month 1, day 15, hour Tý (index 1)
    const result = performTimeBasedDivination({
      yearChiIndex: 3, // Dần year
      lunarMonth: 1,
      lunarDay: 15,
      hourChiIndex: 1, // Tý
    });
    expect(result).toMatchSnapshot();
  });

  it('produces a stable number-based divination', () => {
    const result = performNumberBasedDivination({ num1: 5, num2: 3 });
    expect(result).toMatchSnapshot();
  });
});

// ── QMDJ Engine ──────────────────────────────────────────────────
import { generateQmdjChart } from '../../src/utils/qmdjEngine';

describe('QMDJ Engine — Snapshot', () => {
  it('produces a stable chart for 2026-01-15, Tý hour', () => {
    const date = new Date(2026, 0, 15);
    const result = generateQmdjChart(date, 'Tý');
    expect(result).toMatchSnapshot();
  });
});

// ── Thai At Engine ───────────────────────────────────────────────
import { getThaiAtYearChart } from '../../src/utils/thaiAtEngine';

describe('Thai At Engine — Snapshot', () => {
  it('produces a stable year chart for lunar year 2026', () => {
    const result = getThaiAtYearChart(2026);
    expect(result).toMatchSnapshot();
  });
});

// ── Luc Nham Engine ──────────────────────────────────────────────
import { generateLucNhamChart } from '../../src/utils/lucNhamEngine';

describe('Luc Nham Engine — Snapshot', () => {
  it('produces a stable chart for 2026-01-15, hour branch 0', () => {
    const date = new Date(2026, 0, 15);
    const result = generateLucNhamChart(date, 0);
    expect(result).toMatchSnapshot();
  });
});

// ── Tam Thuc Synthesis ───────────────────────────────────────────
import { synthesizeTamThuc } from '../../src/utils/tamThucSynthesis';

describe('Tam Thuc Synthesis — Snapshot', () => {
  it('produces a stable synthesis for 2026-01-15, hour index 0', () => {
    const date = new Date(2026, 0, 15);
    const result = synthesizeTamThuc(date, 0);
    expect(result).toMatchSnapshot();
  });
});

// ── Flying Star Engine ───────────────────────────────────────────
import { generateFlyingStarChart } from '../../src/utils/flyingStarEngine';

describe('Flying Star Engine — Snapshot', () => {
  it('produces a stable chart for 2024 construction, facing Nam', () => {
    const result = generateFlyingStarChart(2024, 'Nam');
    expect(result).toMatchSnapshot();
  });

  it('produces a stable chart for 2005 construction, facing Đông Bắc', () => {
    const result = generateFlyingStarChart(2005, 'Đông Bắc');
    expect(result).toMatchSnapshot();
  });
});

// ── Activity Scorer (uses Calendar + QMDJ + Thai At internally) ──
import { scoreActivity } from '../../src/utils/activityScorer';

describe('Activity Scorer — Snapshot', () => {
  it('produces a stable score for "cuoi-hoi" on 2026-01-15', () => {
    const date = new Date(2026, 0, 15);
    const dayData = getDetailedDayData(date);
    const result = scoreActivity('cuoi-hoi', dayData);
    // bestHours contain HourInfo objects that may reference Date internals
    // snapshot the percentage + breakdown for stability
    const { bestHours: _bh, ...stable } = result;
    expect(stable).toMatchSnapshot();
  });
});
