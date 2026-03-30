import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import GuidedTour from '../../src/components/shared/GuidedTour';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock getBoundingClientRect
Element.prototype.getBoundingClientRect = vi.fn(() => ({
  width: 100,
  height: 50,
  top: 100,
  left: 100,
  bottom: 150,
  right: 200,
  x: 100,
  y: 100,
  toJSON: () => {},
}));

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

describe('GuidedTour Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  it('should not be visible initially if already completed', () => {
    localStorage.setItem('lich-viet-guided-tour-complete', 'true');
    render(<GuidedTour />);
    
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.queryByText(/Chào mừng bạn đến với Lịch Việt/)).not.toBeInTheDocument();
  });

  it('should appear after a delay if not completed', () => {
    render(<GuidedTour />);
    
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText(/Chào mừng bạn đến với Lịch Việt/)).toBeInTheDocument();
  });

  it('should navigate through steps', () => {
    // Add mock elements to DOM
    document.body.innerHTML += '<div id="tour-logo"></div><div id="tour-tabs"></div>';
    
    render(<GuidedTour />);
    
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText(/Chào mừng bạn đến với Lịch Việt/)).toBeInTheDocument();
    
    const nextBtn = screen.getByText('Tiếp theo');
    fireEvent.click(nextBtn);

    expect(screen.getByText('Menu chức năng')).toBeInTheDocument();
    
    const backBtn = screen.getByText('Quay lại');
    fireEvent.click(backBtn);
    
    expect(screen.getByText(/Chào mừng bạn đến với Lịch Việt/)).toBeInTheDocument();
  });

  it('should complete the tour when Skip is clicked', () => {
    render(<GuidedTour />);
    
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const skipBtn = screen.getByText('Bỏ qua');
    fireEvent.click(skipBtn);

    expect(screen.queryByText(/Chào mừng bạn đến với Lịch Việt/)).not.toBeInTheDocument();
    expect(localStorage.getItem('lich-viet-guided-tour-complete')).toBe('true');
  });

  it('should complete the tour on the last step', () => {
    document.body.innerHTML += '<div id="tour-logo"></div><div id="tour-tabs"></div><div id="tour-calendar"></div><div id="tour-day-summary"></div><div id="tour-theme-toggle"></div><div id="tour-user-menu"></div>';

    render(<GuidedTour />);
    
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Advance to last step (6 steps total)
    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getByText('Tiếp theo'));
    }

    expect(screen.getByText('Tài khoản & Cài đặt')).toBeInTheDocument();
    
    const startBtn = screen.getByText('Bắt đầu');
    fireEvent.click(startBtn);

    expect(screen.queryByText('Tài khoản & Cài đặt')).not.toBeInTheDocument();
    expect(localStorage.getItem('lich-viet-guided-tour-complete')).toBe('true');
  });
});
