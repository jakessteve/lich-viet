/**
 * Performance Regression Tests — P2-10
 *
 * Benchmarks core engine calculation times to catch performance regressions.
 * Run with: npx vitest run test/performance/engine-benchmarks.test.ts
 */
import { describe, it, expect } from 'vitest';

// Dynamic imports to match how engines load in production
const BENCHMARK_BUDGET_MS = 500; // Maximum allowed time for any single engine call

describe('Engine Performance Benchmarks', () => {
  it('getDetailedDayData completes within budget', async () => {
    const { getDetailedDayData } = await import('../../src/utils/calendarEngine');
    const _testDate = new Date(2026, 2, 15); // 2026-03-15

    const start = performance.now();
    for (let i = 0; i < 100; i++) {
      getDetailedDayData(new Date(2026, 2, i + 1));
    }
    const elapsed = performance.now() - start;
    const avgMs = elapsed / 100;

    console.debug(`getDetailedDayData avg: ${avgMs.toFixed(2)}ms (budget: ${BENCHMARK_BUDGET_MS}ms)`);
    expect(avgMs).toBeLessThan(BENCHMARK_BUDGET_MS);
  }, 30000);

  it('Dụng Sự scoring completes within budget', async () => {
    const { scoreActivity } = await import('../../src/utils/activityScorer');
    const { getDetailedDayData } = await import('../../src/utils/calendarEngine');
    const data = getDetailedDayData(new Date(2026, 2, 15));

    const start = performance.now();
    for (let i = 0; i < 100; i++) {
      scoreActivity('cuoi-ga', data);
    }
    const elapsed = performance.now() - start;
    const avgMs = elapsed / 100;

    console.debug(`scoreActivity avg: ${avgMs.toFixed(2)}ms (budget: ${BENCHMARK_BUDGET_MS}ms)`);
    expect(avgMs).toBeLessThan(BENCHMARK_BUDGET_MS);
  }, 30000);

  it('Mai Hoa engine completes within budget', async () => {
    const { performTimeBasedDivination, ensureHexagramsLoaded } = await import('../../src/utils/maiHoaEngine');
    await ensureHexagramsLoaded();

    const start = performance.now();
    for (let i = 0; i < 50; i++) {
      performTimeBasedDivination({ yearChiIndex: 3, lunarMonth: 2, lunarDay: 15, hourChiIndex: 6 });
    }
    const elapsed = performance.now() - start;
    const avgMs = elapsed / 50;

    console.debug(`performTimeBasedDivination avg: ${avgMs.toFixed(2)}ms (budget: ${BENCHMARK_BUDGET_MS}ms)`);
    expect(avgMs).toBeLessThan(BENCHMARK_BUDGET_MS);
  }, 30000);

  it('Numerology engine completes within budget', async () => {
    const { generateNumerologyProfile } = await import('../../src/utils/numerologyEngine');

    const start = performance.now();
    for (let i = 0; i < 50; i++) {
      generateNumerologyProfile(
        'Nguyễn Văn An',
        new Date(1990, 5, 15),
        'pythagorean',
      );
    }
    const elapsed = performance.now() - start;
    const avgMs = elapsed / 50;

    console.debug(`generateNumerologyProfile avg: ${avgMs.toFixed(2)}ms (budget: ${BENCHMARK_BUDGET_MS}ms)`);
    expect(avgMs).toBeLessThan(BENCHMARK_BUDGET_MS);
  }, 30000);
});
