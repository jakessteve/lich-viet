/**
 * PalaceCell — Individual Palace Cell in the 4×4 Tử Vi Grid
 * 
 * Traditional layout matching classical Tử Vi charts (iztro-inspired):
 *   Header:  [Can.Chi prefix]  [Palace Name (bold)]  [Đại Hạn number]
 *   Body:    Tier 1 — Major stars (bold, red, 15px) with brightness + mutagen
 *            Tier 2 — Minor stars (auspicious green, malefic blue, 12px)
 *            Tier 3 — Adjective stars (neutral gray, 10px, comma-separated)
 *   Footer:  [Earthly Branch]  [Trường Sinh]  [Bác Sĩ]  [Đại Hạn range]
 */

import React from 'react';
import type { TuViPalace, TuViStar } from '../../services/tuvi/tuviTypes';
import {
    BRIGHTNESS_ABBREV,
    MUTAGEN_CONFIG
} from '../../services/tuvi/tuviTypes';
import { getStarCategory, getStarColorCategory } from '../../services/tuvi/tuviEngine';

interface PalaceCellProps {
    readonly palace: TuViPalace;
    readonly gridArea?: string;
    readonly isMenhPalace?: boolean;
    readonly isSelected?: boolean;
    readonly isTrine?: boolean;      // In Tam Hợp (Trine)
    readonly isOpposite?: boolean;   // In Xung Chiếu (Opposite)
    readonly isDimmed?: boolean;     // Not focused, not trine, not opposite
    readonly onClick?: () => void;
}



/** Render a single star with inline abbreviated brightness and inline Tứ Hóa */
function StarDisplay({ star, showBrightness = true }: { readonly star: TuViStar; readonly showBrightness?: boolean }) {
    const category = getStarCategory(star);
    const brightnessAbbrev = showBrightness ? (BRIGHTNESS_ABBREV[star.brightness] || '') : '';
    const hasMutagen = star.mutagen && star.mutagen.length > 0;

    const categoryClasses: Record<string, string> = {
        major: 'tuvi-star-major',
        auspicious: 'tuvi-star-auspicious',
        malefic: 'tuvi-star-malefic',
        neutral: 'tuvi-star-neutral',
        dynamic: 'tuvi-star-dynamic',
    };

    // Use the specific color category mapping to allow major stars to inherit Cát/Sát colors
    const colorCategory = getStarColorCategory(star);
    const specificColorClass = category === 'major' ? `tuvi-color-${colorCategory}` : '';

    return (
        <span className={`tuvi-star-item ${categoryClasses[category]} ${specificColorClass} ${hasMutagen ? 'tuvi-star-has-mutagen' : ''}`}>
            <span className="tuvi-star-text-wrapper">
                <span>{star.name}</span>
                {brightnessAbbrev && (
                    <span className="tuvi-brightness-inline">
                        ({brightnessAbbrev})
                    </span>
                )}
            </span>
            {hasMutagen && (
                <span className="tuvi-mutagen-group">
                    {star.mutagen!.map((m) => {
                        const config = MUTAGEN_CONFIG[m];
                        if (!config) return null;
                        return (
                            <span key={m} className={`tuvi-mutagen-inline ${config.cssClass}`}>
                                {config.label}
                            </span>
                        );
                    })}
                </span>
            )}
        </span>
    );
}

/** Map Earthly Branch to lunar month number (Dần=T1...Sửu=T12) */
const BRANCH_TO_MONTH: Record<string, number> = {
    'Dần': 1, 'Mão': 2, 'Thìn': 3, 'Tỵ': 4, 'Ngọ': 5, 'Mùi': 6,
    'Thân': 7, 'Dậu': 8, 'Tuất': 9, 'Hợi': 10, 'Tý': 11, 'Sửu': 12,
};

function PalaceCellInner({ palace, gridArea, isMenhPalace, isSelected, isTrine, isOpposite, isDimmed, onClick }: PalaceCellProps) {
    // Full Can.Chi prefix: e.g. "Ất Tỵ" from heavenlyStem + earthlyBranch
    const fullPrefix = palace.heavenlyStem
        ? `${palace.heavenlyStem} ${palace.earthlyBranch}`
        : palace.earthlyBranch;
    const stageRange = palace.stage.range;
    const hasStage = stageRange[0] > 0 || stageRange[1] > 0;
    const stageNumber = hasStage ? stageRange[1] : '';
    const changshengLabel = palace.changsheng12 || '';
    const monthNumber = BRANCH_TO_MONTH[palace.earthlyBranch];
    const monthLabel = monthNumber ? `T${monthNumber}` : '';

    const borderClass = isMenhPalace
        ? 'tuvi-palace-menh'
        : palace.isBodyPalace
            ? 'tuvi-palace-than'
            : '';

    // Calculate states for the Tam Hợp + Xung Chiếu highlights
    let interactionClass = '';
    if (isSelected) {
        interactionClass = 'tuvi-palace-selected ring-2 ring-gold shadow-md transform scale-[1.02] z-10 relative bg-gold/5 dark:bg-gold/10';
    } else if (isTrine) {
        interactionClass = 'tuvi-palace-trine ring-1 ring-gold/40 bg-gold/5 dark:bg-gold/10';
    } else if (isOpposite) {
        interactionClass = 'tuvi-palace-opposite ring-1 ring-red-500/40 bg-red-50 dark:bg-red-900/10';
    } else if (isDimmed) {
        interactionClass = 'tuvi-palace-dimmed';
    }

    return (
        <div
            className={`tuvi-palace cursor-pointer transition-all duration-300 ${borderClass} ${interactionClass}`}
            style={gridArea ? { gridArea } : undefined}
            data-branch={palace.earthlyBranch}
            aria-label={`Cung ${palace.name}`}
            onClick={onClick}
            onKeyDown={(e) => {
                if (onClick && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onClick();
                }
            }}
            role="button"
            tabIndex={0}
        >
            {/* ═══ Header: Can.Chi + Palace Name + Stage Number ═══ */}
            <div className="tuvi-palace-header">
                <span className="tuvi-prefix">{fullPrefix}</span>
                <span className={`tuvi-palace-name-header ${isMenhPalace ? 'text-gold dark:text-gold-dark' : ''}`}>
                    {palace.name}
                    {isMenhPalace && <span className="tuvi-menh-indicator" title="Cung Mệnh">★</span>}
                    {palace.isBodyPalace && <span className="tuvi-than-indicator" title="Cung Thân">&lt;THÂN&gt;</span>}
                </span>
                <span className="tuvi-stage-number">{stageNumber}</span>
            </div>


            {/* ═══ Stars Zone — Layout Rules ═══ */}
            {(() => {
                const majors = palace.majorStars as TuViStar[];
                const minors = palace.minorStars ? (palace.minorStars as TuViStar[]) : [];
                const adjectives = palace.adjectiveStars ? (palace.adjectiveStars as TuViStar[]) : [];
                const hasMajor = majors.length > 0;

                // ── Classify ALL minors + adjectives by category ──
                const allAux = [...minors, ...adjectives];
                const auspicious = allAux.filter(s => getStarCategory(s) === 'auspicious');
                const malefic = allAux.filter(s => getStarCategory(s) === 'malefic');
                const neutralAux = allAux.filter(s => {
                    const cat = getStarCategory(s);
                    return cat !== 'auspicious' && cat !== 'malefic' && cat !== 'major' && cat !== 'dynamic';
                });
                const hasCatSat = auspicious.length > 0 || malefic.length > 0;

                // Split layout only when both Chính Tinh AND Cát/Sát Tinh are present
                const isSplitLayout = hasMajor && hasCatSat;

                return (
                    <div className="tuvi-stars-zone">
                        {/* ── Tier 1: Chính Tinh (Centered) ── */}
                        {hasMajor && (() => {
                            const majorMutagens: { starName: string; mutagen: string; config: { label: string; cssClass: string } }[] = [];
                            majors.forEach(star => {
                                if (star.mutagen && star.mutagen.length > 0) {
                                    star.mutagen.forEach(m => {
                                        const cfg = MUTAGEN_CONFIG[m];
                                        if (cfg) majorMutagens.push({ starName: star.name, mutagen: m, config: cfg });
                                    });
                                }
                            });

                            return (
                                <div className="tuvi-tier-major">
                                    {majors.map((star, idx) => {
                                        const starWithoutMutagen = { ...star, mutagen: undefined };
                                        return (
                                            <StarDisplay key={`major-${star.name}-${idx}`} star={starWithoutMutagen} />
                                        );
                                    })}
                                    {majorMutagens.map((entry, idx) => (
                                        <span key={`mutagen-${entry.mutagen}-${idx}`} className={`tuvi-mutagen-inline ${entry.config.cssClass}`} style={{ fontWeight: 700 }}>
                                            {entry.config.label}
                                        </span>
                                    ))}
                                </div>
                            );
                        })()}

                        {/* ── Tier 2: Split layout — Cát Tinh (Left) vs Sát Tinh (Right) ── */}
                        {hasCatSat && (
                            <div className="tuvi-tier-split">
                                <div className="tuvi-split-col-left">
                                    {auspicious.map((star, idx) => (
                                        <StarDisplay key={`cat-${star.name}-${idx}`} star={star} />
                                    ))}
                                </div>
                                <div className="tuvi-split-col-right">
                                    {malefic.map((star, idx) => (
                                        <StarDisplay key={`sat-${star.name}-${idx}`} star={star} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── Tier 3: Neutral auxiliary stars — 2 Columns ── */}
                        {neutralAux.length > 0 && (
                            <div className="tuvi-tier-minor-grid">
                                {neutralAux.map((star, idx) => (
                                    <StarDisplay key={`neutral-${star.name}-${idx}`} star={star} showBrightness={false} />
                                ))}
                            </div>
                        )}

                        {/* Temporal Overlays: Đại Hạn & Lưu Niên */}
                        {palace.decadalStars && palace.decadalStars.length > 0 && (
                            <div className="tuvi-temporal-section tuvi-temporal-decadal">
                                <div className="tuvi-temporal-label">Đại Hạn ({palace.decadalName})</div>
                                <div className="tuvi-star-group">
                                    {(palace.decadalStars as TuViStar[]).slice(0, 4).map((star, idx) => (
                                        <StarDisplay key={`dec-${star.name}-${idx}`} star={star} />
                                    ))}
                                </div>
                            </div>
                        )}
                        {palace.yearlyStars && palace.yearlyStars.length > 0 && (
                            <div className="tuvi-temporal-section tuvi-temporal-yearly">
                                <div className="tuvi-temporal-label">Lưu Niên ({palace.yearlyName})</div>
                                <div className="tuvi-star-group">
                                    {(palace.yearlyStars as TuViStar[]).slice(0, 4).map((star, idx) => (
                                        <StarDisplay key={`yr-${star.name}-${idx}`} star={star} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })()}

            {/* ═══ Footer: 2-Row Layout ═══ */}
            <div className="tuvi-palace-footer-v2">
                {/* Row 1: Branch + Trường Sinh */}
                <div className="tuvi-footer-row">
                    <span className="tuvi-branch-label">{palace.earthlyBranch}</span>
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        {changshengLabel && <span className="tuvi-changsheng">{changshengLabel}</span>}
                    </div>
                </div>
                {/* Row 2: Tuần/Triệt + Đại Hạn Range + Month */}
                {(palace.hasTuanKhong || palace.hasTrietKhong || monthLabel || hasStage) && (
                    <div className="tuvi-footer-row">
                        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                            {palace.hasTuanKhong && (
                                <span className="tuvi-tuan-marker" title="Tuần Không">Tuần</span>
                            )}
                            {palace.hasTrietKhong && (
                                <span className="tuvi-triet-marker" title="Triệt Không">Triệt</span>
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            {hasStage && (
                                <span className="tuvi-stage-range" title="Đại Hạn">{stageRange[0]}–{stageRange[1]}</span>
                            )}
                            {monthLabel && <span className="tuvi-month-label">{monthLabel}</span>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const PalaceCell = React.memo(PalaceCellInner);
export default PalaceCell;
