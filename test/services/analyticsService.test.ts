import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analytics } from '../../src/services/analyticsService';

describe('AnalyticsService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset global window.gtag if it was set
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).gtag;
    }
  });

  it('should be a singleton', async () => {
    const { analytics: analytics2 } = await import('../../src/services/analyticsService');
    expect(analytics).toBe(analytics2);
  });

  it('should initialize without error', () => {
    expect(() => analytics.init()).not.toThrow();
  });

  it('should log to console.debug in development mode when tracking event', () => {
    const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
    
    analytics.trackEvent({
      name: 'button_click',
      properties: { button_id: 'test-btn' },
    });

    expect(debugSpy).toHaveBeenCalled();
    expect(debugSpy.mock.calls[0][0]).toContain('[Analytics] Event: button_click');
    debugSpy.mockRestore();
  });

  it('should call window.gtag if it exists', () => {
    const gtagMock = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag = gtagMock;

    analytics.trackEvent({
      name: 'form_submit',
      properties: { form_id: 'contact' },
    });

    expect(gtagMock).toHaveBeenCalledWith('event', 'form_submit', { form_id: 'contact' });
  });

  it('should track page views', () => {
    const gtagMock = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag = gtagMock;

    analytics.trackPageView('/test-path', 'Test Title');

    // Should call trackEvent (which calls gtag) and specific gtag config
    expect(gtagMock).toHaveBeenCalledWith('event', 'page_view', {
      path: '/test-path',
      title: 'Test Title',
    });
    expect(gtagMock).toHaveBeenCalledWith('config', undefined, {
      page_path: '/test-path',
      page_title: 'Test Title',
    });
  });

  it('should track errors', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const gtagMock = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag = gtagMock;

    analytics.trackError({
      message: 'Test error',
      fatal: true,
    });

    expect(errorSpy).toHaveBeenCalled();
    expect(gtagMock).toHaveBeenCalledWith('event', 'exception', {
      description: 'Test error',
      fatal: true,
    });
    errorSpy.mockRestore();
  });
});
