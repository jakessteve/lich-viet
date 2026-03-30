import { describe, it, expect } from 'vitest';
import { generateFlyingStarChart } from '../src/utils/flyingStarEngine';

// Mapping from our Palace positions to Mountain-Water pairs
// Grid:
// SE S SW -> [0] [1] [2]
// E  C W  -> [3] [4] [5]
// NE N NW -> [6] [7] [8]
const PD8_SW1 = { // Vận 8, Hướng Mùi (SW1), Tọa Sửu (NE1)
  palaces: [
    { pos: 'SE', m: 9, w: 7 }, // Đông Nam
    { pos: 'S',  m: 4, w: 3 }, // Nam
    { pos: 'SW', m: 2, w: 5 }, // Tây Nam (Hướng: M=5 => 2, W=2 => 5. Wait, 8 at Center. 
                               // SW has 5 natively. W=5. 5 takes SW1 polarity -> Reverse)
    { pos: 'E',  m: 1, w: 8 }, // Đông
    { pos: 'Center', m: 8, w: 8 }, // Trung Cung: M=8, W=8
    { pos: 'W',  m: 6, w: 1 }, // Tây
    { pos: 'NE', m: 5, w: 2 }, // Đông Bắc (Tọa: M=2, W=5. Native 2 -> SW. NE1 = Earth. SW Earth is Mùi (Yin) -> Reverse. W=5. NE1 Earth is Sửu (Yin) -> Reverse)
    // Wait, let's use standard charts from documentation:
    // Period 8, SW1 (Mùi): Center has 8. 
    // Hướng Mùi (SW), Tọa Sửu (NE).
    // Let's just hardcode the 9 palaces (Mountain-Water)
  ]
};

// Instead of rewriting an entire Xuan Kong engine, I will hard-verify the Center palace stars 
// and the Facing/Sitting palaces for a few known configurations.

describe('Huyền Không Phi Tinh - Academic Parity Matrices', () => {

  it('Period 8: Tọa Sửu Hướng Mùi (NE1 to SW1) - Vượng Sơn Vượng Hướng', () => {
    // Vận 8.
    // Tọa Sửu (Sửu is in NE palace, Địa Nguyên Long). Hướng Mùi (Mùi is in SW palace, Địa Nguyên Long).
    // periodGrid: Center 8. NE=2. SW=5.
    // Sơn tinh nhập trung: 2. Hướng tinh nhập trung: 5.
    // Center palace has M=2, W=5.
    const chart = generateFlyingStarChart(2004, 'Tây Nam', 8, 'Mùi');
    const center = chart.palaces.find(p => p.position === 'Center');
    
    expect(center?.periodStar).toBe(8);
    expect(center?.mountainStar).toBe(2);
    expect(center?.waterStar).toBe(5);

    // Vượng Sơn Vượng Hướng means:
    // Sitting = 8 Mountain star.
    // Facing = 8 Water star.
    const sitting = chart.palaces.find(p => p.position === 'NE');
    expect(sitting?.mountainStar).toBe(8);

    const facing = chart.palaces.find(p => p.position === 'SW');
    expect(facing?.waterStar).toBe(8);
  });

  it('Period 9: Tọa Nhâm Hướng Bính (N1 to S1)', () => {
    // Vận 9.
    // Tọa Nhâm (Bắc N1, Địa Nguyên Long). Hướng Bính (Nam S1, Địa Nguyên Long).
    // Center 9. Nam = 4. Bắc = 5.
    // Sơn tinh nhập trung = 5. Hướng tinh nhập trung = 4.
    const chart = generateFlyingStarChart(2024, 'Nam', 9, 'Bính');
    const center = chart.palaces.find(p => p.position === 'Center');
    
    expect(center?.periodStar).toBe(9);
    expect(center?.mountainStar).toBe(5); // Bắc in period 9 is 5
    expect(center?.waterStar).toBe(4);    // Nam in period 9 is 4
  });

});
