/**
 * useLunarEvents — Lunar event reminders stored in localStorage
 *
 * Manages birthday, death anniversary, and custom lunar-date-based events.
 * Events are matched against the current lunar calendar date to trigger reminders.
 */

import { useState, useCallback, useMemo } from 'react';

// ── Types ──────────────────────────────────────────────────────

export interface LunarEvent {
  id: string;
  title: string;
  lunarDay: number;
  lunarMonth: number;
  /** If set, only matches in this specific year; otherwise recurs annually */
  lunarYear?: number;
  category: 'birthday' | 'anniversary' | 'custom';
  note?: string;
  createdAt: string;
}

const STORAGE_KEY = 'lich-viet-lunar-events';

// ── Helpers ────────────────────────────────────────────────────

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function loadEvents(): LunarEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEvents(events: LunarEvent[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

// ── Hook ───────────────────────────────────────────────────────

export function useLunarEvents() {
  const [events, setEvents] = useState<LunarEvent[]>(loadEvents);

  const addEvent = useCallback((event: Omit<LunarEvent, 'id' | 'createdAt'>) => {
    setEvents(prev => {
      const newEvent: LunarEvent = {
        ...event,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      const updated = [...prev, newEvent];
      saveEvents(updated);
      return updated;
    });
  }, []);

  const updateEvent = useCallback((id: string, updates: Partial<Omit<LunarEvent, 'id' | 'createdAt'>>) => {
    setEvents(prev => {
      const updated = prev.map(e => e.id === id ? { ...e, ...updates } : e);
      saveEvents(updated);
      return updated;
    });
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents(prev => {
      const updated = prev.filter(e => e.id !== id);
      saveEvents(updated);
      return updated;
    });
  }, []);

  const getEventsForDate = useCallback((lunarDay: number, lunarMonth: number, lunarYear?: number) => {
    return events.filter(e => {
      if (e.lunarDay !== lunarDay || e.lunarMonth !== lunarMonth) return false;
      if (e.lunarYear && lunarYear && e.lunarYear !== lunarYear) return false;
      return true;
    });
  }, [events]);

  const upcomingEvents = useMemo(() => {
    // Sort by month/day for display
    return [...events].sort((a, b) => {
      if (a.lunarMonth !== b.lunarMonth) return a.lunarMonth - b.lunarMonth;
      return a.lunarDay - b.lunarDay;
    });
  }, [events]);

  return {
    events,
    upcomingEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate,
  };
}
