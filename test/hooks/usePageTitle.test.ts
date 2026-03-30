import { describe, it, expect, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePageTitle } from '../../src/hooks/usePageTitle';

describe('usePageTitle', () => {
  const originalTitle = document.title;

  afterEach(() => {
    document.title = originalTitle;
  });

  it('should set document title with default suffix', () => {
    renderHook(() => usePageTitle('Tử Vi'));
    expect(document.title).toBe('Tử Vi — Lịch Việt');
  });

  it('should set document title with custom suffix', () => {
    renderHook(() => usePageTitle('Test', 'My App'));
    expect(document.title).toBe('Test — My App');
  });

  it('should use only suffix when title is empty', () => {
    renderHook(() => usePageTitle(''));
    expect(document.title).toBe('Lịch Việt');
  });

  it('should restore previous title on unmount', () => {
    document.title = 'Original';
    const { unmount } = renderHook(() => usePageTitle('New Title'));
    expect(document.title).toBe('New Title — Lịch Việt');
    unmount();
    expect(document.title).toBe('Original');
  });

  it('should update title when props change', () => {
    const { rerender } = renderHook(
      ({ title }) => usePageTitle(title),
      { initialProps: { title: 'First' } }
    );
    expect(document.title).toBe('First — Lịch Việt');

    rerender({ title: 'Second' });
    expect(document.title).toBe('Second — Lịch Việt');
  });
});
