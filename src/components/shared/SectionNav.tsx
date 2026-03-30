import React from 'react';
import type { LifeAreaType } from '../../services/interpretation/types';
import { LIFE_AREA_META } from '../../services/interpretation/types';

interface SectionNavProps {
    areas: readonly LifeAreaType[];
    activeArea: LifeAreaType;
    onAreaClick: (area: LifeAreaType) => void;
    /** Optional list of areas that should appear locked */
    lockedAreas?: readonly LifeAreaType[];
}

/** Sticky pill navigation for jumping between life area sections. */
const SectionNav: React.FC<SectionNavProps> = ({ areas, activeArea, onAreaClick, lockedAreas = [] }) => {
    return (
        <nav className="section-nav" role="tablist">
            {areas.map(area => {
                const meta = LIFE_AREA_META[area];
                const isActive = area === activeArea;
                const isLocked = lockedAreas.includes(area);
                return (
                    <button
                        key={area}
                        role="tab"
                        aria-selected={isActive}
                        aria-disabled={isLocked}
                        className={`section-nav-pill ${isActive ? 'section-nav-pill--active' : ''} ${isLocked ? 'section-nav__tab--locked' : ''}`}
                        onClick={() => !isLocked && onAreaClick(area)}
                        title={isLocked ? 'Nâng cấp để mở khóa' : undefined}
                    >
                        <span>{meta.emoji}</span>
                        <span>{meta.title.split(' & ')[0]}</span>
                    </button>
                );
            })}
        </nav>
    );
};

export default SectionNav;
