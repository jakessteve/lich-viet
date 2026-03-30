/**
 * Vitest Test Setup — Global setup for all test files.
 *
 * Provides JSDOM polyfills, React 19 compatibility, and global mocks
 * so tests can run in a Node/JSDOM environment without browser APIs.
 */

// ══════════════════════════════════════════════════════════
// React 19 Compatibility — MUST be set before any React import
// ══════════════════════════════════════════════════════════

// React 19 requires this flag for act() warnings to work correctly
// @ts-expect-error — React internal flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// TextEncoder/TextDecoder — required by React DOM in JSDOM
if (typeof globalThis.TextEncoder === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { TextEncoder, TextDecoder } = require('util');
  globalThis.TextEncoder = TextEncoder;
  globalThis.TextDecoder = TextDecoder;
}

import '@testing-library/jest-dom';

// ══════════════════════════════════════════════════════════
// JSDOM Polyfills — APIs not provided by jsdom
// ══════════════════════════════════════════════════════════

// matchMedia — used by responsive hooks (useIsMobile, etc.)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// IntersectionObserver — used by lazy loading, infinite scroll
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});

// ResizeObserver — used by chart/grid sizing
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: MockResizeObserver,
});

// scrollTo — used by navigation, modal open
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: () => {},
});

// localStorage mock — more reliable than jsdom's built-in
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = String(value); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
    get length() { return Object.keys(store).length; },
    key: (index: number) => Object.keys(store)[index] ?? null,
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// HTMLCanvasElement — used by html2canvas and chart rendering
HTMLCanvasElement.prototype.getContext = (() => null) as typeof HTMLCanvasElement.prototype.getContext;
