import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../../src/stores/appStore';

describe('appStore', () => {
  beforeEach(() => {
    // Reset the store between tests
    localStorage.clear();
    const initialDate = new Date(2024, 0, 1);
    useAppStore.setState({
      selectedDate: initialDate,
      isDark: false,
      fontSize: 'normal',
    });
    // Trigger dayData update manually if needed (Zustand doesn't automatically trigger actions on setState)
    useAppStore.getState().setSelectedDate(initialDate);
  });

  describe('selectedDate and dayData', () => {
    it('should set selected date and update dayData', () => {
      const newDate = new Date(2025, 5, 15);
      useAppStore.getState().setSelectedDate(newDate);
      expect(useAppStore.getState().selectedDate).toEqual(newDate);
      expect(useAppStore.getState().dayData).toBeDefined();
      expect(useAppStore.getState().dayData.solarDate).toBe('2025-06-15');
    });

    it('should clamp year below 1900 to 1900', () => {
      const oldDate = new Date(1850, 0, 1);
      useAppStore.getState().setSelectedDate(oldDate);
      expect(useAppStore.getState().selectedDate.getFullYear()).toBe(1900);
      expect(useAppStore.getState().dayData.solarDate.startsWith('1900-')).toBe(true);
    });

    it('should clamp year above 2199 to 2199', () => {
      const futureDate = new Date(2500, 0, 1);
      useAppStore.getState().setSelectedDate(futureDate);
      expect(useAppStore.getState().selectedDate.getFullYear()).toBe(2199);
      expect(useAppStore.getState().dayData.solarDate.startsWith('2199-')).toBe(true);
    });
  });

  describe('dark mode', () => {
    it('should toggle dark mode on', () => {
      useAppStore.getState().toggleDarkMode();
      expect(useAppStore.getState().isDark).toBe(true);
    });

    it('should toggle dark mode off', () => {
      useAppStore.setState({ isDark: true });
      useAppStore.getState().toggleDarkMode();
      expect(useAppStore.getState().isDark).toBe(false);
    });

    it('should persist dark mode to localStorage', () => {
      useAppStore.getState().toggleDarkMode();
      expect(localStorage.theme).toBe('dark');

      useAppStore.getState().toggleDarkMode();
      expect(localStorage.theme).toBe('light');
    });
  });

  describe('font size', () => {
    it('should cycle font size: normal → large', () => {
      useAppStore.getState().cycleFontSize();
      expect(useAppStore.getState().fontSize).toBe('large');
    });

    it('should cycle font size: large → small', () => {
      useAppStore.setState({ fontSize: 'large' });
      useAppStore.getState().cycleFontSize();
      expect(useAppStore.getState().fontSize).toBe('small');
    });

    it('should cycle font size: small → normal', () => {
      useAppStore.setState({ fontSize: 'small' });
      useAppStore.getState().cycleFontSize();
      expect(useAppStore.getState().fontSize).toBe('normal');
    });

    it('should set font size to a specific level', () => {
      useAppStore.getState().setFontSizeLevel('large');
      expect(useAppStore.getState().fontSize).toBe('large');
    });

    it('should persist font size to localStorage', () => {
      useAppStore.getState().setFontSizeLevel('small');
      expect(localStorage.getItem('fontSize')).toBe('small');
    });
  });
});
