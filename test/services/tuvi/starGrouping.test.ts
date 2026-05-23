import { describe, it, expect } from 'vitest';
import { formatPalaceStars, getStarBrightnessMarker } from '@/services/tuvi/starGrouping';
import type { TuViPalace } from '@/types/tuvi';

function makePalace(overrides: Partial<TuViPalace> = {}): TuViPalace {
  return {
    id: 0,
    chi: 'Tý',
    name: 'Mệnh',
    nameHanViet: '命宮',
    can: 'Giáp',
    canChi: 'Giáp Tý',
    chinhTinh: [],
    phuTinh: [],
    satTinh: [],
    tuHoa: [],
    brightness: {},
    daiHanAgeRange: '1–10',
    isMenh: true,
    isThan: false,
    hasTuan: false,
    hasTriet: false,
    ...overrides,
  };
}

describe('starGrouping brightness markers', () => {
  it('omits Bình markers', () => {
    expect(getStarBrightnessMarker({ brightness: 'Bình' } as never)).toBe('');
    expect(getStarBrightnessMarker({ brightness: 'Bất' } as never)).toBe('');
  });

  it('supports traditional intermediate brightness markers', () => {
    expect(getStarBrightnessMarker({ brightness: 'Địa' } as never)).toBe('(Đ)');
    expect(getStarBrightnessMarker({ brightness: 'Lợi' } as never)).toBe('(L)');
  });

  it('formats stars without the Bình suffix', () => {
    const palace = makePalace({
      chinhTinh: [
        {
          name: 'Tử Vi',
          type: 'chinhTinh',
          nguHanh: 'Âm Thổ',
          brightness: 'Bình',
        },
      ],
    });

    expect(formatPalaceStars(palace).chinhTinhLines).toEqual(['Tử Vi']);
  });
});
