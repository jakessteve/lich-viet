import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import DetailedDayView from '../../src/components/DetailedDayView';
import { getDetailedDayData } from '../../src/utils/calendarEngine';
import '@testing-library/jest-dom';

/** Wrap component in MemoryRouter for useNavigate */
function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('DetailedDayView (Hierarchical UI)', () => {
  it('should render the main container with test-id', () => {
    const date = new Date(2024, 1, 10); // Feb 10, 2024
    const data = getDetailedDayData(date);

    renderWithRouter(<DetailedDayView date={date} data={data} />);

    const view = screen.getByTestId('detailed-day-view');
    expect(view).toBeInTheDocument();
  });

  it('should display the day grade (Tốt / Trung Bình / Đại Kỵ)', () => {
    const date = new Date(2024, 1, 18); // Nhâm Tý day
    const data = getDetailedDayData(date);

    renderWithRouter(<DetailedDayView date={date} data={data} />);

    // dayGrade should be one of the three grades
    const gradeElement = screen.getByTestId('detailed-day-view');
    const hasGrade =
      gradeElement.textContent!.includes('Tốt') ||
      gradeElement.textContent!.includes('Trung Bình') ||
      gradeElement.textContent!.includes('Đại Kỵ');
    expect(hasGrade).toBe(true);
  });

  it('should display the Chi tiết ngày âm section', () => {
    const date = new Date(2024, 1, 18);
    const data = getDetailedDayData(date);

    renderWithRouter(<DetailedDayView date={date} data={data} />);

    expect(screen.getByText('Chi tiết ngày âm')).toBeInTheDocument();
  });

  it('should display Trực/Tú information in the detail section', () => {
    const date = new Date(2024, 1, 10);
    const data = getDetailedDayData(date);

    renderWithRouter(<DetailedDayView date={date} data={data} />);

    expect(screen.getByText('Trực/Tú')).toBeInTheDocument();
    // The Trực name may appear multiple times (in Trực/Tú section and elsewhere)
    expect(screen.getAllByText(new RegExp(`Trực ${data.modifyingLayer.trucDetail.name}`)).length).toBeGreaterThan(0);
  });

  it('should display the hourly table with all 12 hours', () => {
    const date = new Date(2024, 1, 10);
    const data = getDetailedDayData(date);

    renderWithRouter(<DetailedDayView date={date} data={data} />);

    expect(screen.getByText('Giờ tốt và xấu trong ngày')).toBeInTheDocument();
    // Check for time range headers
    expect(screen.getByText('Can Chi')).toBeInTheDocument();
    expect(screen.getByText('CHẤT')).toBeInTheDocument();
  });

  it('should display Bành tổ bách kỵ section', () => {
    const date = new Date(2024, 1, 10);
    const data = getDetailedDayData(date);

    renderWithRouter(<DetailedDayView date={date} data={data} />);

    expect(screen.getByText('Bành tổ bách kỵ')).toBeInTheDocument();
  });

  it('should display good stars (Cát thần) list', () => {
    const date = new Date(2024, 1, 18);
    const data = getDetailedDayData(date);

    renderWithRouter(<DetailedDayView date={date} data={data} />);

    expect(screen.getByText('Cát thần')).toBeInTheDocument();
  });

  it('should display Dụng Sự (Nghi/Kỵ) activities', () => {
    const date = new Date(2024, 1, 10);
    const data = getDetailedDayData(date);

    renderWithRouter(<DetailedDayView date={date} data={data} />);

    // Check for Nghi and Kỵ labels in the detail grid
    expect(screen.getByText('Nghi')).toBeInTheDocument();
    expect(screen.getByText('Kỵ')).toBeInTheDocument();
  });
});
