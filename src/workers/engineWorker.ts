/**
 * engineWorker — offloads heavy computation to a Web Worker.
 *
 * Usage:
 * ```ts
 * const result = await runInWorker('generateBaziChart', birthDate);
 * ```
 *
 * Engines moved to workers:
 * - Bazi chart generation (200+ star calculations)
 * - QMDJ board construction
 * - Thái Ất chart generation
 * - Lục Nhâm chart generation
 * - Mai Hoa divination engine
 * - Flying Star feng shui engine
 * - Numerology analysis engine
 * - Natal chart calculator (Western astrology)
 */

type EngineTask = {
  id: string;
  engine: string;
  args: unknown[];
};

type EngineResult = {
  id: string;
  result?: unknown;
  error?: string;
};

let worker: Worker | null = null;
let taskId = 0;
const pendingTasks = new Map<string, {
  resolve: (value: unknown) => void;
  reject: (reason: Error) => void;
}>();

function getWorker(): Worker {
  if (!worker) {
    worker = new Worker(new URL('./engineWorker.worker.ts', import.meta.url), {
      type: 'module',
    });

    worker.onmessage = (event: MessageEvent<EngineResult>) => {
      const { id, result, error } = event.data;
      const pending = pendingTasks.get(id);
      if (!pending) return;

      pendingTasks.delete(id);
      if (error) {
        pending.reject(new Error(error));
      } else {
        pending.resolve(result);
      }
    };

    worker.onerror = (event) => {
      console.error('[Worker] Unhandled error:', event.message);
    };
  }
  return worker;
}

/**
 * Run a named engine function in a Web Worker.
 * Falls back to main-thread execution if Workers are unavailable.
 */
export function runInWorker<T = unknown>(
  engine: string,
  ...args: unknown[]
): Promise<T> {
  // Fallback for environments without Worker support
  if (typeof Worker === 'undefined') {
    return Promise.reject(new Error('Web Workers not available'));
  }

  return new Promise<T>((resolve, reject) => {
    const id = `task-${++taskId}`;
    pendingTasks.set(id, {
      resolve: resolve as (value: unknown) => void,
      reject,
    });

    const task: EngineTask = { id, engine, args };
    getWorker().postMessage(task);
  });
}

/**
 * Terminate the worker (call on app unmount or when no longer needed).
 */
export function terminateWorker(): void {
  if (worker) {
    worker.terminate();
    worker = null;
    pendingTasks.clear();
  }
}
