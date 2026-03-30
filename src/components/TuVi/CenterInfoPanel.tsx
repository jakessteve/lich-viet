import React from 'react';
import type { TuViChartData, ChartInput } from '../../services/tuvi/tuviTypes';

interface CenterInfoPanelProps {
    readonly chart: TuViChartData;
    readonly input: ChartInput;
}

/** A single info row with label, primary value, and optional secondary value */
function InfoRow({ label, value, extra, valueColor, extraColor }: {
    readonly label: string;
    readonly value: string;
    readonly extra?: string;
    readonly valueColor?: string;
    readonly extraColor?: string;
}) {
    return (
        <div className="tuvi-center-row">
            <span className="tuvi-center-label">
                {label}:
            </span>
            <span className="tuvi-center-values">
                <span className={valueColor || 'tuvi-center-value-primary'}>
                    {value}
                </span>
                {extra && (
                    <span className={extraColor || 'tuvi-center-value-green'}>
                        {extra}
                    </span>
                )}
            </span>
        </div>
    );
}

export default function CenterInfoPanel({ chart, input }: CenterInfoPanelProps) {
    // ── Extract birth date parts from solarDate (format: YYYY-M-D) ──
    const dateParts = input.solarDate.split('-');
    const birthYear = dateParts[0] || '';
    const birthMonth = dateParts[1] || '';
    const birthDay = dateParts[2] || '';

    // ── Calculate age (Vietnamese counting: birth year = 1 tuổi) ──
    const currentYear = new Date().getFullYear();
    const age = birthYear ? currentYear - parseInt(birthYear, 10) + 1 : 0;

    // ── Âm/Dương Label ──
    const yinYangLabel = chart.yinYangLabel || (input.gender === 'male' ? 'Nam' : 'Nữ');

    // ── Target year for Năm hạn ──
    const targetYear = input.targetYear || currentYear;

    // ── Cục display: combine element + number e.g. "Hỏa Lục Cục" ──
    const cucDisplay = chart.fiveElementsClass || '';

    return (
        <div className="tuvi-center-panel" aria-label="Thông tin lá số">
            {/* ═══ Title ═══ */}
            <div className="tuvi-center-title-section">
                <div className="tuvi-center-title">LÁ SỐ TỬ VI</div>
            </div>

            {/* ═══ User Name ═══ */}
            {input.name && (
                <div className="tuvi-center-section">
                    <InfoRow
                        label="Họ tên"
                        value={input.name}
                        valueColor="tuvi-center-value-green"
                    />
                </div>
            )}

            <div className="tuvi-center-divider" />

            {/* ═══ Birth Data Section — Full Lunar Can Chi Names ═══ */}
            <div className="tuvi-center-section">
                <InfoRow
                    label="Năm sinh"
                    value={chart.yearStemBranch || birthYear}
                    extra={birthYear !== (chart.yearStemBranch || '') ? `(DL ${birthYear})` : ''}
                    valueColor="tuvi-center-value-green"
                />
                <InfoRow
                    label="Tháng sinh"
                    value={chart.monthStemBranch || birthMonth}
                    extra={chart.lunarMonth !== undefined ? `(T${chart.lunarMonth})` : `(DL ${birthMonth})`}
                    valueColor="tuvi-center-value-green"
                />
                <InfoRow
                    label="Ngày sinh"
                    value={chart.dayStemBranch || birthDay}
                    extra={chart.lunarDay !== undefined ? `(${chart.lunarDay})` : `(DL ${birthDay})`}
                    valueColor="tuvi-center-value-green"
                />
                <InfoRow
                    label="Giờ sinh"
                    value={chart.hourStemBranch || chart.time || ''}
                    extra={chart.time ? `(${chart.time})` : ''}
                    valueColor="tuvi-center-value-green"
                />
            </div>

            <div className="tuvi-center-divider" />

            {/* ═══ Year / Gender / Âm Dương Section ═══ */}
            <div className="tuvi-center-section">
                <InfoRow
                    label="Năm hạn"
                    value={`${targetYear}`}
                    extra={chart.targetYearStemBranch || ''}
                    valueColor="tuvi-center-value-primary"
                    extraColor="tuvi-center-value-green"
                />
                <InfoRow
                    label="Âm dương"
                    value={yinYangLabel}
                    extra={`${age} tuổi`}
                    valueColor="tuvi-center-value-primary"
                    extraColor="tuvi-center-value-secondary"
                />
                {chart.amDuongLy && (
                    <InfoRow
                        label="Lý số"
                        value={chart.amDuongLy}
                        valueColor={chart.amDuongLy === 'Thuận lý' ? 'tuvi-center-value-green' : 'tuvi-center-value-red'}
                    />
                )}
            </div>

            <div className="tuvi-center-divider" />

            {/* ═══ Mệnh + Cục Section ═══ */}
            <div className="tuvi-center-section">
                {/* Mệnh (Nạp Âm) — prominent chip */}
                {chart.napAmYear && (
                    <div className="tuvi-center-row">
                        <span className="tuvi-center-label">Mệnh:</span>
                        <span className="tuvi-center-values">
                            <span style={{
                                fontWeight: 800,
                                fontSize: '14px',
                                color: '#B91C1C',
                                background: 'linear-gradient(135deg, rgba(185, 28, 28, 0.10), rgba(185, 28, 28, 0.04))',
                                padding: '2px 10px',
                                borderRadius: '6px',
                                letterSpacing: '0.06em',
                                border: '1px solid rgba(185, 28, 28, 0.15)',
                            }}>
                                {chart.napAmYear.toUpperCase()}
                            </span>
                        </span>
                    </div>
                )}
                {/* Cục — separate line */}
                <InfoRow
                    label="Cục"
                    value={cucDisplay || `${chart.cucElement || ''} ${chart.cucNumber || ''} Cục`.trim()}
                    valueColor="tuvi-center-value-red"
                />
                {/* Cục-Mệnh relationship */}
                {chart.cucMenhRelation && (
                    <InfoRow
                        label="Quan hệ"
                        value={chart.cucMenhRelation}
                        valueColor={chart.cucMenhRelation.includes('khắc') ? 'tuvi-center-value-red' : 'tuvi-center-value-green'}
                    />
                )}
            </div>

            <div className="tuvi-center-divider" />

            {/* ═══ Rulers Section: Sao chủ cục, Mệnh chủ, Thân chủ ═══ */}
            <div className="tuvi-center-section">
                {chart.saoChucCuc && (
                    <InfoRow
                        label="Chủ cục"
                        value={chart.saoChucCuc}
                        valueColor="tuvi-center-value-green"
                    />
                )}
                <InfoRow
                    label="Mệnh chủ"
                    value={chart.soul}
                    valueColor="tuvi-center-value-green"
                />
                <InfoRow
                    label="Thân chủ"
                    value={chart.body}
                    valueColor="tuvi-center-value-green"
                />
            </div>

            <div className="tuvi-center-divider" />

            {/* ═══ Advanced: Lai nhân, Nguyên thần, Huyền khí, Thân cư ═══ */}
            <div className="tuvi-center-section">
                {chart.laiNhanCung && (
                    <InfoRow
                        label="Lai nhân"
                        value={chart.laiNhanCung}
                        valueColor="tuvi-center-value-primary"
                    />
                )}
                {chart.nguyenThan && (
                    <InfoRow
                        label="Nguyên thần"
                        value={chart.nguyenThan}
                        valueColor="tuvi-center-value-primary"
                    />
                )}
                {chart.huyenKhi && (
                    <InfoRow
                        label="Huyền khí"
                        value={chart.huyenKhi}
                        valueColor="tuvi-center-value-primary"
                    />
                )}
                {chart.bodyPalaceName && (
                    <InfoRow
                        label="Thân cư"
                        value={chart.bodyPalaceName}
                        valueColor="tuvi-center-value-green"
                    />
                )}
            </div>

            {/* ═══ Cross-validation warning (dev only) ═══ */}
            {chart.lunarDateCrossValidation && (
                <div className="tuvi-center-section" style={{ opacity: 0.6 }}>
                    <div className="tuvi-center-row" style={{ fontSize: '0.65rem', color: 'var(--color-warning, #e67e22)' }}>
                        ⚠ {chart.lunarDateCrossValidation}
                    </div>
                </div>
            )}
        </div>
    );
}
