/**
 * DayCell Component Tests
 *
 * Verifies rendering variants: current month, non-current month, today,
 * selected state, day quality indicators, and click handling.
 */
import React from 'react';
import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DayCell from '../../src/components/DayCell';
import type { DayCellData } from '../../src/types/calendar';

describe('DayCell', () => {
    const mockOnClick = vi.fn();

    const makeData = (overrides: Partial<DayCellData> = {}): DayCellData => ({
        solarDate: 15,
        lunarDate: 6,
        dayQuality: 'Neutral',
        fullDate: new Date(2024, 1, 15), // Thursday
        isCurrentMonth: true,
        isToday: false,
        ...overrides,
    });

    beforeEach(() => {
        mockOnClick.mockClear();
    });

    it('should render the solar and lunar date', () => {
        render(<DayCell data={makeData()} isSelected={false} onClick={mockOnClick} />);
        expect(screen.getByText('15')).toBeInTheDocument();
        expect(screen.getByText('6')).toBeInTheDocument();
    });

    it('should call onClick with the full date when clicked', () => {
        const data = makeData();
        render(<DayCell data={data} isSelected={false} onClick={mockOnClick} />);
        const cell = screen.getByText('15').closest('.cursor-pointer');
        expect(cell).not.toBeNull();
        if (cell) {
            fireEvent.click(cell);
            expect(mockOnClick).toHaveBeenCalledWith(data.fullDate);
        }
    });

    it('should render as non-interactive when not current month', () => {
        const data = makeData({ isCurrentMonth: false });
        render(<DayCell data={data} isSelected={false} onClick={mockOnClick} />);
        const cell = screen.getByText('15').closest('div');
        expect(cell?.className).toContain('pointer-events-none');
    });

    it('should apply today styling when isToday is true', () => {
        const data = makeData({ isToday: true });
        const { container } = render(<DayCell data={data} isSelected={false} onClick={mockOnClick} />);
        const cell = container.firstChild as HTMLElement;
        expect(cell.className).toContain('day-cell-today');
    });

    it('should apply selected styling when isSelected is true (and not today)', () => {
        const data = makeData({ isToday: false });
        const { container } = render(<DayCell data={data} isSelected={true} onClick={mockOnClick} />);
        const cell = container.firstChild as HTMLElement;
        expect(cell.className).toContain('day-cell-selected');
    });

    it('should show a green dot for Good day quality', () => {
        const data = makeData({ dayQuality: 'Good' });
        const { container } = render(<DayCell data={data} isSelected={false} onClick={mockOnClick} />);
        const dot = container.querySelector('.bg-emerald-500');
        expect(dot).not.toBeNull();
    });

    it('should show a red dot for Bad day quality', () => {
        const data = makeData({ dayQuality: 'Bad' });
        const { container } = render(<DayCell data={data} isSelected={false} onClick={mockOnClick} />);
        const dot = container.querySelector('.bg-red-500');
        expect(dot).not.toBeNull();
    });

    it('should show a transparent placeholder for Neutral day quality', () => {
        const data = makeData({ dayQuality: 'Neutral' });
        const { container } = render(<DayCell data={data} isSelected={false} onClick={mockOnClick} />);
        const dot = container.querySelector('.bg-transparent');
        expect(dot).not.toBeNull();
    });

    it('should apply weekend text color for Saturday', () => {
        const data = makeData({ fullDate: new Date(2024, 1, 10) }); // Saturday Feb 10
        render(<DayCell data={data} isSelected={false} onClick={mockOnClick} />);
        const solarDateEl = screen.getByText(String(data.solarDate));
        expect(solarDateEl.className).toContain('text-calendar-weekend');
    });

    it('should apply weekend text color for Sunday', () => {
        const data = makeData({ fullDate: new Date(2024, 1, 11), solarDate: 11 }); // Sunday Feb 11
        render(<DayCell data={data} isSelected={false} onClick={mockOnClick} />);
        const solarDateEl = screen.getByText('11');
        expect(solarDateEl.className).toContain('text-calendar-weekend');
    });

    it('should accept and apply roundedClass prop', () => {
        const { container } = render(
            <DayCell data={makeData()} isSelected={false} onClick={mockOnClick} roundedClass="rounded-tl-lg" />
        );
        const cell = container.firstChild as HTMLElement;
        expect(cell.className).toContain('rounded-tl-lg');
    });
});
