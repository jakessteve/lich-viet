/**
 * Error Reporter — Centralized error reporting abstraction.
 *
 * Provides a consistent interface for capturing and reporting errors.
 * Currently logs to console; drop-in ready for Sentry, LogRocket, etc.
 *
 * @example
 * ```ts
 * import { reportError, reportMessage } from '@/utils/errorReporter';
 *
 * try {
 *   riskyOperation();
 * } catch (error) {
 *   reportError(error, { component: 'TuViModule', action: 'generateChart' });
 * }
 * ```
 */

export type ErrorSeverity = 'fatal' | 'error' | 'warning' | 'info';

export interface ErrorContext {
  /** Component or module name where the error occurred */
  component?: string;
  /** Action being performed when the error occurred */
  action?: string;
  /** Additional metadata for debugging */
  extra?: Record<string, unknown>;
}

/**
 * Report an error to the monitoring service.
 * Currently logs to console; replace the implementation body
 * with Sentry.captureException() or similar when ready.
 */
export function reportError(
  error: unknown,
  context?: ErrorContext,
  severity: ErrorSeverity = 'error'
): void {
  const errorObj = error instanceof Error ? error : new Error(String(error));

  // ── Console logging (development) ──
  const prefix = `[${severity.toUpperCase()}]`;
  const contextStr = context
    ? ` [${context.component ?? '?'}${context.action ? `:${context.action}` : ''}]`
    : '';

  console.error(`${prefix}${contextStr}`, errorObj.message, context?.extra ?? '');

  // ── Production integration placeholder ──
  // To enable Sentry:
  //   import * as Sentry from '@sentry/react';
  //   Sentry.captureException(errorObj, {
  //     tags: { component: context?.component, action: context?.action },
  //     level: severity,
  //     extra: context?.extra,
  //   });
}

/**
 * Report a non-error message to the monitoring service.
 * Useful for tracking important events or warnings.
 */
export function reportMessage(
  message: string,
  context?: ErrorContext,
  severity: ErrorSeverity = 'info'
): void {
  const prefix = `[${severity.toUpperCase()}]`;
  const contextStr = context
    ? ` [${context.component ?? '?'}${context.action ? `:${context.action}` : ''}]`
    : '';

  if (severity === 'warning' || severity === 'error') {
    console.warn(`${prefix}${contextStr}`, message, context?.extra ?? '');
  } else {
    console.debug(`${prefix}${contextStr}`, message, context?.extra ?? '');
  }

  // ── Production integration placeholder ──
  // Sentry.captureMessage(message, { level: severity, tags: { ... } });
}
