import { describe, it, expect, vi } from 'vitest';
import { initWebVitals } from '../../src/utils/webVitals';

describe('webVitals', () => {
  it('should export initWebVitals as an async function', () => {
    expect(typeof initWebVitals).toBe('function');
  });

  it('should handle missing web-vitals library gracefully', async () => {
    const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

    // In test environment, web-vitals is not installed, so it should catch the error
    await initWebVitals();

    expect(debugSpy).toHaveBeenCalledTimes(1);
    expect(debugSpy.mock.calls[0][0]).toContain('Web Vitals');
    debugSpy.mockRestore();
  });
});
