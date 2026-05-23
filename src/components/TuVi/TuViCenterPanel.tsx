import React from 'react';
import type { TuViCenterInfo, TuViHanContext, TuViHuyenKhi } from '../../types/tuvi';

interface TuViCenterPanelProps {
  centerInfo: TuViCenterInfo;
  huyenKhi: TuViHuyenKhi;
  hanContext?: TuViHanContext;
}

const FieldRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="tuvi-center-row">
    <span className="tuvi-center-label">{label}</span>
    <span className="tuvi-center-values">
      <strong className="tuvi-center-value-primary" title={value}>
        {value}
      </strong>
    </span>
  </div>
);

export const TuViCenterPanel: React.FC<TuViCenterPanelProps> = ({
  centerInfo,
  huyenKhi,
  hanContext,
}) => {
  const hanLabel =
    hanContext?.daiHanPalaceName && hanContext.daiHanAgeRange
      ? `${hanContext.daiHanPalaceName} · ${hanContext.daiHanAgeRange}`
      : '—';

  const centerRows = [
    { label: 'Âm dương', value: centerInfo.amDuongLabel },
    { label: 'Mệnh', value: centerInfo.menhNapAm },
    { label: 'Cục', value: centerInfo.cuc },
    { label: 'Chủ cục', value: centerInfo.saoChuCuc || '—' },
    { label: 'Mệnh chủ', value: centerInfo.menhChu },
    { label: 'Thân chủ', value: centerInfo.thanChu },
    { label: 'Lai nhân', value: centerInfo.laiNhanCung || '—' },
    { label: 'Nguyên thần', value: centerInfo.nguyenThan || '—' },
    { label: 'Mệnh cung', value: centerInfo.menhCung },
    { label: 'Thân cung', value: centerInfo.thanCungLabel },
    { label: 'Đại hạn', value: hanLabel },
  ];

  return (
    <div className="tuvi-center">
      <div className="tuvi-center-title">
        <h3>{centerInfo.hoTen || 'Lá số Tử Vi'}</h3>
        <p>{centerInfo.amDuongLabel}</p>
        <div className="tuvi-center-score" title="Điểm Huyền Khí tổng hợp">
          <span>Huyền Khí</span>
          <strong>{huyenKhi.totalScore}</strong>
          <em>{huyenKhi.grade}</em>
        </div>
      </div>

      <div className="tuvi-center-body">
        <div className="tuvi-center-column">
          {centerRows.map((field) => (
            <FieldRow key={field.label} label={field.label} value={field.value} />
          ))}
        </div>
      </div>
    </div>
  );
};
