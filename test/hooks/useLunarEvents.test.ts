import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLunarEvents } from '../../src/hooks/useLunarEvents';

describe('useLunarEvents', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should start with empty events', () => {
    const { result } = renderHook(() => useLunarEvents());
    expect(result.current.events).toEqual([]);
  });

  it('should add an event', () => {
    const { result } = renderHook(() => useLunarEvents());

    act(() => {
      result.current.addEvent({
        title: 'Test Birthday',
        lunarDay: 15,
        lunarMonth: 1,
        category: 'birthday',
      });
    });

    expect(result.current.events).toHaveLength(1);
    expect(result.current.events[0].title).toBe('Test Birthday');
    expect(result.current.events[0].lunarDay).toBe(15);
    expect(result.current.events[0].lunarMonth).toBe(1);
    expect(result.current.events[0].id).toBeTruthy();
    expect(result.current.events[0].createdAt).toBeTruthy();
  });

  it('should persist events to localStorage', () => {
    const { result } = renderHook(() => useLunarEvents());

    act(() => {
      result.current.addEvent({
        title: 'Persisted Event',
        lunarDay: 10,
        lunarMonth: 5,
        category: 'custom',
      });
    });

    const stored = JSON.parse(localStorage.getItem('lich-viet-lunar-events') || '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].title).toBe('Persisted Event');
  });

  it('should update an event', () => {
    const { result } = renderHook(() => useLunarEvents());

    act(() => {
      result.current.addEvent({
        title: 'Original',
        lunarDay: 1,
        lunarMonth: 1,
        category: 'anniversary',
      });
    });

    const id = result.current.events[0].id;

    act(() => {
      result.current.updateEvent(id, { title: 'Updated' });
    });

    expect(result.current.events[0].title).toBe('Updated');
  });

  it('should delete an event', () => {
    const { result } = renderHook(() => useLunarEvents());

    act(() => {
      result.current.addEvent({
        title: 'To Delete',
        lunarDay: 1,
        lunarMonth: 1,
        category: 'custom',
      });
    });

    const id = result.current.events[0].id;

    act(() => {
      result.current.deleteEvent(id);
    });

    expect(result.current.events).toHaveLength(0);
  });

  it('should get events for a specific date', () => {
    const { result } = renderHook(() => useLunarEvents());

    act(() => {
      result.current.addEvent({
        title: 'Match',
        lunarDay: 15,
        lunarMonth: 8,
        category: 'custom',
      });
      result.current.addEvent({
        title: 'No Match',
        lunarDay: 20,
        lunarMonth: 8,
        category: 'custom',
      });
    });

    const matching = result.current.getEventsForDate(15, 8);
    expect(matching).toHaveLength(1);
    expect(matching[0].title).toBe('Match');
  });

  it('should return upcoming events sorted by month/day', () => {
    const { result } = renderHook(() => useLunarEvents());

    act(() => {
      result.current.addEvent({
        title: 'Dec Event',
        lunarDay: 1,
        lunarMonth: 12,
        category: 'custom',
      });
      result.current.addEvent({
        title: 'Jan Event',
        lunarDay: 1,
        lunarMonth: 1,
        category: 'custom',
      });
    });

    expect(result.current.upcomingEvents[0].title).toBe('Jan Event');
    expect(result.current.upcomingEvents[1].title).toBe('Dec Event');
  });

  it('should load events from localStorage on init', () => {
    const stored = [{
      id: 'test-1',
      title: 'Pre-existing',
      lunarDay: 5,
      lunarMonth: 3,
      category: 'birthday',
      createdAt: '2024-01-01T00:00:00.000Z',
    }];
    localStorage.setItem('lich-viet-lunar-events', JSON.stringify(stored));

    const { result } = renderHook(() => useLunarEvents());
    expect(result.current.events).toHaveLength(1);
    expect(result.current.events[0].title).toBe('Pre-existing');
  });
});
