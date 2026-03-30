import { describe, it, expect, vi, beforeEach } from 'vitest';
import { reportError, reportMessage } from '../../src/utils/errorReporter';

describe('errorReporter', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('reportError', () => {
    it('should log Error objects with default severity', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const error = new Error('test error');

      reportError(error);

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy.mock.calls[0][0]).toContain('[ERROR]');
      expect(consoleSpy.mock.calls[0][1]).toBe('test error');
    });

    it('should convert string errors to Error objects', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      reportError('string error');

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy.mock.calls[0][1]).toBe('string error');
    });

    it('should include component and action context', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      reportError(new Error('ctx error'), {
        component: 'TuVi',
        action: 'generateChart',
      });

      const output = consoleSpy.mock.calls[0][0];
      expect(output).toContain('[TuVi:generateChart]');
    });

    it('should include only component when action is missing', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      reportError(new Error('partial ctx'), { component: 'Calendar' });

      expect(consoleSpy.mock.calls[0][0]).toContain('[Calendar]');
    });

    it('should use specified severity level', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      reportError(new Error('fatal'), {}, 'fatal');

      expect(consoleSpy.mock.calls[0][0]).toContain('[FATAL]');
    });

    it('should pass extra metadata', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      reportError(new Error('extra'), {
        component: 'Test',
        extra: { userId: 123 },
      });

      expect(consoleSpy.mock.calls[0][2]).toEqual({ userId: 123 });
    });
  });

  describe('reportMessage', () => {
    it('should log info messages with console.debug', () => {
      const logSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      reportMessage('test info');

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy.mock.calls[0][0]).toContain('[INFO]');
    });

    it('should log warning messages with console.warn', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      reportMessage('test warning', {}, 'warning');

      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('[WARNING]');
    });

    it('should log error severity with console.warn', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      reportMessage('critical message', { component: 'System' }, 'error');

      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('[ERROR]');
      expect(warnSpy.mock.calls[0][0]).toContain('[System]');
    });
  });
});
