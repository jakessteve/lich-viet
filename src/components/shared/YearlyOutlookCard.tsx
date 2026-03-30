import React from 'react';
import type { YearlyOutlookBlock as YearlyOutlookType } from '../../services/interpretation/types';

interface YearlyOutlookCardProps {
    outlook: YearlyOutlookType;
}

/** Renders the yearly energy outlook summary card. */
const YearlyOutlookCard: React.FC<YearlyOutlookCardProps> = ({ outlook }) => {
    return (
        <section className="yearly-outlook-card">
            <h3 className="yearly-outlook-title">
                <span className="material-icons-round yearly-outlook-icon">calendar_today</span>
                {outlook.title}
            </h3>
            <p className="yearly-outlook-summary">{outlook.summary}</p>
            <div className="yearly-outlook-themes">
                <span className="yearly-outlook-themes-label">Chủ đề chính:</span>
                {outlook.keyThemes.map((theme, i) => (
                    <span key={i} className="yearly-outlook-theme-pill">{theme}</span>
                ))}
            </div>
            <div className="yearly-outlook-advice">
                <span className="material-icons-round">lightbulb</span>
                <p>{outlook.advice}</p>
            </div>
        </section>
    );
};

export default YearlyOutlookCard;
