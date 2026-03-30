import React from 'react';
import type { TraitItem } from '../../services/interpretation/types';

interface StrengthsCardProps {
    strengths: readonly TraitItem[];
    challenges: readonly TraitItem[];
}

/** Two-column card displaying strengths (green) and challenges (orange). */
const StrengthsCard: React.FC<StrengthsCardProps> = ({ strengths, challenges }) => {
    return (
        <div className="strengths-card">
            <div className="strengths-column strengths-column--positive">
                <div className="strengths-column-title">
                    <span className="material-icons-round" style={{ fontSize: '1rem' }}>trending_up</span>
                    Điểm Mạnh
                </div>
                {strengths.map((item, i) => (
                    <div key={i} className="strength-item">
                        <div className="strength-item-label">{item.label}</div>
                        <div className="strength-item-desc">{item.description}</div>
                    </div>
                ))}
            </div>
            <div className="strengths-column strengths-column--challenge">
                <div className="strengths-column-title">
                    <span className="material-icons-round" style={{ fontSize: '1rem' }}>psychology_alt</span>
                    Thách Thức
                </div>
                {challenges.map((item, i) => (
                    <div key={i} className="strength-item">
                        <div className="strength-item-label">{item.label}</div>
                        <div className="strength-item-desc">{item.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StrengthsCard;
