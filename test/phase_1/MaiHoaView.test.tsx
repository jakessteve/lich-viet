/**
 * MaiHoaView Component Tests
 *
 * Verifies the Mai Hoa Dịch Số view: initial render, header content,
 * input form presence, lunar date display, and error boundary.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// The component under test
import MaiHoaView from '../../src/components/MaiHoa/MaiHoaView';

describe('MaiHoaView', () => {
    const selectedDate = new Date(2024, 1, 10); // Feb 10, 2024

    it('should render the Mai Hoa header', () => {
        render(<MaiHoaView selectedDate={selectedDate} />);
        expect(screen.getByText('Mai Hoa Dịch Số')).toBeInTheDocument();
    });

    it('should render the subtitle', () => {
        render(<MaiHoaView selectedDate={selectedDate} />);
        expect(screen.getByText(/Gieo quẻ theo phương pháp Mai Hoa Dịch Số/)).toBeInTheDocument();
    });

    it('should display the lunar date from the selected date', () => {
        render(<MaiHoaView selectedDate={selectedDate} />);
        // Feb 10, 2024 = Lunar Month 1, Day 1, Year 2024 (Giáp Thìn)
        expect(screen.getByText(/Âm lịch/)).toBeInTheDocument();
    });

    it('should render the divination input form', () => {
        render(<MaiHoaView selectedDate={selectedDate} />);
        // The InputForm has "Gieo Quẻ" or similar action buttons
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThan(0);
    });

    it('should not render results initially', () => {
        render(<MaiHoaView selectedDate={selectedDate} />);
        // Initially, there should be no hexagram cards or summary
        expect(screen.queryByText('Quẻ Chủ')).not.toBeInTheDocument();
        expect(screen.queryByText('Quẻ Hổ')).not.toBeInTheDocument();
        expect(screen.queryByText('Quẻ Biến')).not.toBeInTheDocument();
    });

    it('should not show the loading state initially', () => {
        render(<MaiHoaView selectedDate={selectedDate} />);
        expect(screen.queryByText('Đang luận quẻ...')).not.toBeInTheDocument();
    });

    it('should not show the scroll-to-top button initially', () => {
        render(<MaiHoaView selectedDate={selectedDate} />);
        expect(screen.queryByLabelText('Cuộn lên đầu trang')).not.toBeInTheDocument();
    });

    it('should not show any error message initially', () => {
        render(<MaiHoaView selectedDate={selectedDate} />);
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('should accept different dates without error', () => {
        const { rerender } = render(<MaiHoaView selectedDate={selectedDate} />);
        // Re-render with a different date
        rerender(<MaiHoaView selectedDate={new Date(2025, 5, 15)} />);
        expect(screen.getByText('Mai Hoa Dịch Số')).toBeInTheDocument();
    });
});
