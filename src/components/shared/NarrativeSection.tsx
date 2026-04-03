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
        <section className="animate-fade-scale mb-10" id={id}>
            {/* Header Area */}
            <div className="flex flex-col gap-4 mb-6 pb-5 border-b border-border-light/50 dark:border-border-dark/50">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/10 to-blue-500/10 dark:from-indigo-400/20 dark:to-blue-400/10 border border-indigo-500/20 shadow-inner">
                        <span className="material-icons-round text-2xl text-accent-start">{narrative.icon}</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">{narrative.title}</h3>
                        <p className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mt-0.5">{narrative.subtitle}</p>
                    </div>
                </div>

                {/* Key Influences moved to top */}
                {narrative.keyInfluences.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-xs font-semibold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider mr-1">Tác nhân:</span>
                        {narrative.keyInfluences.map((inf, i) => (
                            <span 
                                key={i} 
                                className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent-start/10 text-accent-start border border-accent-start/20 shadow-sm"
                                title={inf.description}
                            >
                                {inf.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Insight Cards (ETC blocks) */}
            <div className="space-y-6">
                {narrative.paragraphs.map((para, i) => (
                    <ETCParagraph key={i} narrative={para} />
                ))}
            </div>
        </section>
    );
};

export default NarrativeSection;
