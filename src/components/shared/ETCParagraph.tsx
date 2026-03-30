import React from 'react';
import type { ETCNarrative } from '../../services/interpretation/types';

interface ETCParagraphProps {
    narrative: ETCNarrative;
}

/** Renders a single ETC (Effects Then Causes) paragraph with styled sections. */
const ETCParagraph: React.FC<ETCParagraphProps> = ({ narrative }) => {
    return (
        <div className="etc-paragraph">
            <div className="etc-hook">{narrative.hook}</div>

            {narrative.effectParagraphs.map((para, i) => (
                <p key={i} className="etc-effect">{para}</p>
            ))}

            <div className="etc-nuance">{narrative.nuance}</div>
            <div className="etc-cause">{narrative.cause}</div>
            <div className="etc-tip">{narrative.tip}</div>
        </div>
    );
};

export default ETCParagraph;
