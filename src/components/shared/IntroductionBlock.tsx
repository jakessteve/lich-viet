import React from 'react';
import type { IntroductionBlock as IntroBlockType } from '../../services/interpretation/types';

interface IntroductionBlockProps {
    introduction: IntroBlockType;
}

/** Renders the narrative prologue / introduction with decorative elements. */
const IntroductionBlock: React.FC<IntroductionBlockProps> = ({ introduction }) => {
    return (
        <section className="introduction-block">
            <h2 className="introduction-block-title">{introduction.title}</h2>
            <div className="introduction-block-body">
                {introduction.paragraphs.map((para, i) => (
                    <p key={i} className="introduction-block-paragraph">{para}</p>
                ))}
            </div>
        </section>
    );
};

export default IntroductionBlock;
