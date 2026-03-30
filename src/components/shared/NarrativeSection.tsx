import React from 'react';
import type { LifeAreaNarrative } from '../../services/interpretation/types';
import ETCParagraph from './ETCParagraph';

interface NarrativeSectionProps {
    narrative: LifeAreaNarrative;
    id?: string;
}

/** Renders a complete life-area narrative section with header, ETC paragraphs, and key influences. */
const NarrativeSection: React.FC<NarrativeSectionProps> = ({ narrative, id }) => {
    return (
        <section className="narrative-section" id={id}>
            <div className="narrative-section-header">
                <div className="narrative-section-icon">
                    <span className="material-icons-round">{narrative.icon}</span>
                </div>
                <div className="narrative-section-titles">
                    <h3 className="narrative-section-title">{narrative.title}</h3>
                    <p className="narrative-section-subtitle">{narrative.subtitle}</p>
                </div>
            </div>

            {narrative.paragraphs.map((para, i) => (
                <ETCParagraph key={i} narrative={para} />
            ))}

            {narrative.keyInfluences.length > 0 && (
                <div className="narrative-key-influences">
                    {narrative.keyInfluences.map((inf, i) => (
                        <span key={i} className="narrative-key-influence" title={inf.description}>
                            {inf.name}
                        </span>
                    ))}
                </div>
            )}
        </section>
    );
};

export default NarrativeSection;
