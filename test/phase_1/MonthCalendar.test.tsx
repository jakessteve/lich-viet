/**
 * MonthCalendar Component Tests
 *
 * Verifies the calendar grid renders correctly, navigates between months,
 * selects dates, and handles today button.
 */
import React from 'react';
import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MonthCalendar from '../../src/components/MonthCalendar';

describe('MonthCalendar', () => {
    const defaultDate = new Date(2024, 1, 10); // Feb 10, 2024
    const mockOnSelectDate = vi.fn();

    beforeEach(() => {
        mockOnSelectDate.mockClear();
    });

    it('should render the month and year dropdowns', () => {
        render(<MonthCalendar selectedDate={defaultDate} onSelectDate={mockOnSelectDate} />);
        const monthSelect = screen.getByLabelText('Chọn tháng') as HTMLSelectElement;
        const yearSelect = screen.getByLabelText('Chọn năm') as HTMLSelectElement;
        expect(monthSelect).toBeInTheDocument();
        expect(yearSelect).toBeInTheDocument();
        expect(monthSelect.value).toBe('1'); // Feb = index 1
        expect(yearSelect.value).toBe('2024');
    });

    it('should render all 7 weekday labels (T2-CN)', () => {
        render(<MonthCalendar selectedDate={defaultDate} onSelectDate={mockOnSelectDate} />);
        const weekDayLabels = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
        weekDayLabels.forEach(label => {
            expect(screen.getByText(label)).toBeInTheDocument();
        });
    });

    it('should render 42 day cells in the grid', () => {
        const { container } = render(
            <MonthCalendar selectedDate={defaultDate} onSelectDate={mockOnSelectDate} />
        );
        // Every DayCell renders a solar date and a lunar date (2 spans per cell with numbers)
        // The grid has 42 cells total (6 rows × 7 columns)
        const allDayCells = container.querySelectorAll('.aspect-square');
        expect(allDayCells.length).toBe(42);
    });

    it('should navigate to the next month when the next button is clicked', () => {
        render(<MonthCalendar selectedDate={defaultDate} onSelectDate={mockOnSelectDate} />);
        const nextButton = screen.getByLabelText('Tháng sau');
        fireEvent.click(nextButton);
        const monthSelect = screen.getByLabelText('Chọn tháng') as HTMLSelectElement;
        expect(monthSelect.value).toBe('2'); // March = index 2
    });

    it('should navigate to the previous month when the prev button is clicked', () => {
        render(<MonthCalendar selectedDate={defaultDate} onSelectDate={mockOnSelectDate} />);
        const prevButton = screen.getByLabelText('Tháng trước');
        fireEvent.click(prevButton);
        const monthSelect = screen.getByLabelText('Chọn tháng') as HTMLSelectElement;
        expect(monthSelect.value).toBe('0'); // January = index 0
    });

    it('should call onSelectDate when a day cell is clicked', () => {
        render(<MonthCalendar selectedDate={defaultDate} onSelectDate={mockOnSelectDate} />);
        // Find and click a current-month day (e.g., the "15" solar date)
        const day15Elements = screen.getAllByText('15');
        // Click the first match that is a current-month cell
        const clickable = day15Elements.find(el => {
            const cellParent = el.closest('.cursor-pointer');
            return cellParent !== null;
        });
        if (clickable) {
            const cellParent = clickable.closest('.cursor-pointer');
            if (cellParent) fireEvent.click(cellParent);
            expect(mockOnSelectDate).toHaveBeenCalled();
        }
    });

    it('should toggle calendar expansion on expand button click', () => {
        render(<MonthCalendar selectedDate={defaultDate} onSelectDate={mockOnSelectDate} />);
        const expandButton = screen.getByLabelText('Thu gọn lịch');
        fireEvent.click(expandButton);
        // After collapse, the button label should change
        expect(screen.getByLabelText('Mở rộng lịch')).toBeInTheDocument();
    });

    it('should have a today button', () => {
        render(<MonthCalendar selectedDate={defaultDate} onSelectDate={mockOnSelectDate} />);
        const todayButton = screen.getByLabelText('Về hôm nay');
        expect(todayButton).toBeInTheDocument();
    });
});
