import React from 'react';
import type { TuViChart as TuViChartType } from '../../types/tuvi';
import { TuViPalaceCell } from './TuViPalaceCell';
import { TuViCenterPanel } from './TuViCenterPanel';
import { GRID_MAP } from './tuviChartLayout';

interface TuViChartProps {
  chart: TuViChartType;
  selectedPalaceIndex: number | null;
  onSelectPalace: (index: number | null) => void;
}

/**
 * Grid cell mapping: [row, col] → Chi index.
 *
 * Traditional Tử Vi 4×4 layout (counter-clockwise from Dần at bottom-left):
 * Row 0: Tỵ(5), Ngọ(6), Mùi(7), Thân(8)
 * Row 1: Thìn(4), CENTER,  CENTER, Dậu(9)
 * Row 2: Mão(3),  CENTER,  CENTER, Tuất(10)
 * Row 3: Dần(2), Sửu(1), Tý(0),    Hợi(11)
 */
const TAM_HOP_GROUPS: number[][] = [
  [2, 6, 10],
  [8, 0, 4],
  [5, 9, 1],
  [11, 3, 7],
];

const OPPOSITE_CHI: Record<number, number> = {
  0: 6,
  1: 7,
  2: 8,
  3: 9,
  4: 10,
  5: 11,
  6: 0,
  7: 1,
  8: 2,
  9: 3,
  10: 4,
  11: 5,
};

function getTamHopGroup(chiIndex: number): number[] {
  return [...(TAM_HOP_GROUPS.find((group) => group.includes(chiIndex)) ?? [])];
}

function getCellCenter(chiIndex: number): { x: number; y: number } | null {
  const grid = GRID_MAP.find((cell) => cell.chiIndex === chiIndex);
  if (!grid) return null;
  return {
    x: ((grid.col + 0.5) / 4) * 100,
    y: ((grid.row + 0.5) / 4) * 100,
  };
}

function getTriangleLines(activeChiIndex: number): Array<{ x1: number; y1: number; x2: number; y2: number }> {
  const group = getTamHopGroup(activeChiIndex);
  const centers = group.map(getCellCenter);
  if (centers.some((center) => center === null)) return [];
  const [a, b, c] = centers as Array<{ x: number; y: number }>;
  return [
    { x1: a.x, y1: a.y, x2: b.x, y2: b.y },
    { x1: b.x, y1: b.y, x2: c.x, y2: c.y },
    { x1: c.x, y1: c.y, x2: a.x, y2: a.y },
  ];
}

export const TuViChart: React.FC<TuViChartProps> = ({
  chart,
  selectedPalaceIndex,
  onSelectPalace,
}) => {
  // Build a map from Chi index → palace for quick lookup
  const palaceByChi = new Map<number, typeof chart.palaces[number]>();
  for (const palace of chart.palaces) {
    palaceByChi.set(palace.id, palace);
  }
  const defaultPalace = chart.palaces.find((palace) => palace.isMenh);
  const activePalaceIndex =
    selectedPalaceIndex ?? chart.hanContext?.daiHanPalaceIndex ?? defaultPalace?.id ?? null;
  const activeTamHop = activePalaceIndex === null ? [] : getTamHopGroup(activePalaceIndex);
  const activeOpposite = activePalaceIndex === null ? null : OPPOSITE_CHI[activePalaceIndex];
  const triangleLines = activePalaceIndex === null ? [] : getTriangleLines(activePalaceIndex);

  return (
    <div className="tuvi-chart-shell">
      <div className="tuvi-chart" data-tuvi-chart-export role="grid" aria-label="Lá số Tử Vi">
        {triangleLines.length > 0 && (
          <svg className="tuvi-connection-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {triangleLines.map((line, index) => (
              <line
                key={`${line.x1}-${line.y1}-${index}`}
                className="tuvi-connection-line"
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
            />
          ))}
        </svg>
        )}
        {GRID_MAP.map(({ row, col, chiIndex }) => {
          const palace = palaceByChi.get(chiIndex);
          if (!palace) return null;

          const gridStyle: React.CSSProperties = {
            gridColumn: col + 1,
            gridRow: row + 1,
          };
          const isSelected = activePalaceIndex === palace.id;
          const isTrine = activeTamHop.includes(palace.id) && !isSelected;
          const isOpposite = activeOpposite === palace.id;

          return (
            <div key={chiIndex} style={gridStyle}>
          <TuViPalaceCell
                palace={palace}
                hanContext={chart.hanContext}
                isSelected={isSelected}
                isTrine={isTrine}
                isOpposite={isOpposite}
                onSelect={() =>
                  onSelectPalace(
                    selectedPalaceIndex === palace.id ? null : palace.id,
                  )
                }
              />
            </div>
          );
        })}

        <div
          className="tuvi-center-cell"
          style={{
            gridColumn: '2 / 4',
            gridRow: '2 / 4',
          }}
        >
          <TuViCenterPanel
            centerInfo={chart.centerInfo}
            huyenKhi={chart.huyenKhi}
            hanContext={chart.hanContext}
          />
        </div>
      </div>
      <div className="tuvi-chart-legend" aria-label="Chú giải lá số">
        <span>Chính tinh: chữ lớn</span>
        <span>Phụ tinh: cột trái</span>
        <span>Sát tinh: cột phải</span>
        <span>Màu sao theo Ngũ Hành</span>
      </div>
      <div className="tuvi-brightness-legend" aria-label="Chú giải độ sáng">
        <span>Độ sáng:</span>
        <span>(M) Miếu</span>
        <span>(V) Vượng</span>
        <span>(Đ) Đắc</span>
        <span>(H) Hãm</span>
      </div>
    </div>
  );
};
