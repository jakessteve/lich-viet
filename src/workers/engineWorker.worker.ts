/**
 * engineWorker.worker.ts — Web Worker entry point for heavy engine calculations.
 *
 * Receives { id, engine, args } messages and returns { id, result } or { id, error }.
 * Dynamically imports engine modules to keep the worker bundle lean.
 */

type EngineTask = {
  id: string;
  engine: string;
  args: unknown[];
};

// Engine registry — lazy-loaded for minimal initial bundle
const ENGINE_REGISTRY: Record<string, () => Promise<Record<string, (...args: unknown[]) => unknown>>> = {
  generateBaziChart: () => import('../utils/baziEngine').then(m => m as unknown as Record<string, (...args: unknown[]) => unknown>),
  generateQmdjChart: () => import('../utils/qmdjEngine').then(m => m as unknown as Record<string, (...args: unknown[]) => unknown>),
  getThaiAtYearChart: () => import('../utils/thaiAtEngine').then(m => m as unknown as Record<string, (...args: unknown[]) => unknown>),
  generateLucNhamChart: () => import('../utils/lucNhamEngine').then(m => m as unknown as Record<string, (...args: unknown[]) => unknown>),
  // P0-2: Additional engines moved to worker
  calculateMaiHoa: () => import('../utils/maiHoaEngine').then(m => m as unknown as Record<string, (...args: unknown[]) => unknown>),
  calculateFlyingStars: () => import('../utils/flyingStarEngine').then(m => m as unknown as Record<string, (...args: unknown[]) => unknown>),
  calculateNumerology: () => import('../utils/numerologyEngine').then(m => m as unknown as Record<string, (...args: unknown[]) => unknown>),
  calculateNatalChart: () => import('../utils/natalChartCalculator').then(m => m as unknown as Record<string, (...args: unknown[]) => unknown>),
};

self.onmessage = async (event: MessageEvent<EngineTask>) => {
  const { id, engine, args } = event.data;

  try {
    const loader = ENGINE_REGISTRY[engine];
    if (!loader) {
      throw new Error(`Unknown engine: ${engine}`);
    }

    const mod = await loader();
    const fn = mod[engine];
    if (typeof fn !== 'function') {
      throw new Error(`Engine function '${engine}' not found in module`);
    }

    const result = fn(...args);
    self.postMessage({ id, result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    self.postMessage({ id, error: message });
  }
};
