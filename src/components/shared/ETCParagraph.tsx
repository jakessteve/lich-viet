import React from 'react';
import type { ETCNarrative } from '../../services/interpretation/types';

interface ETCParagraphProps {
    narrative: ETCNarrative;
}

/** Renders a single ETC (Effects Then Causes) paragraph with styled sections. */
const ETCParagraph: React.FC<ETCParagraphProps> = ({ narrative }) => {
    return (
        <div className="bg-surface-light dark:bg-surface-dark border border-border-light/40 dark:border-border-dark/40 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* 1. Hook (Title) */}
            {narrative.hook && (
                <div className="flex items-start gap-3 mb-4">
                    <span className="material-icons-round text-accent-start mt-0.5" aria-hidden="true">auto_awesome</span>
                    <h4 className="text-[1.05rem] font-bold text-text-primary-light dark:text-text-primary-dark leading-snug">
                        {narrative.hook}
                    </h4>
                </div>
            )}

            {/* 2. Effect (Body) */}
            <div className="space-y-3 mb-5 pl-1 sm:pl-2">
                {narrative.effectParagraphs.map((para, i) => (
                    <p key={i} className="text-[0.95rem] leading-[1.8] text-text-secondary-light dark:text-text-secondary-dark">
                        {para}
                    </p>
                ))}
            </div>

            {/* 3. Footer Grid (Nuance, Tip, Cause) */}
            {/* Only render border top if there are footer items */}
            {(narrative.tip || narrative.nuance || narrative.cause) && (
                <div className="flex flex-col gap-3 pt-4 border-t border-border-light/30 dark:border-border-dark/30">
                    
                    {/* Lời Khuyên (Tip) */}
                    {narrative.tip && (
                        <div className="flex gap-2.5 p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/10 border border-emerald-200/50 dark:border-emerald-800/30">
                            <span className="material-icons-round text-emerald-500 text-lg shrink-0 mt-0.5" aria-hidden="true">lightbulb</span>
                            <div>
                                <span className="block text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1 uppercase tracking-wider">Lời Khuyên</span>
                                <span className="text-[0.875rem] leading-relaxed text-emerald-900 dark:text-emerald-100/90">{narrative.tip}</span>
                            </div>
                        </div>
                    )}

                    {/* Lưu Ý (Nuance) */}
                    {narrative.nuance && (
                        <div className="flex gap-2.5 p-3 rounded-xl bg-amber-50/60 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-800/30">
                            <span className="material-icons-round text-amber-500 text-lg shrink-0 mt-0.5" aria-hidden="true">info</span>
                            <div>
                                <span className="block text-xs font-bold text-amber-700 dark:text-amber-400 mb-1 uppercase tracking-wider">Lưu Ý</span>
                                <span className="text-[0.875rem] leading-relaxed text-amber-900 dark:text-amber-100/90">{narrative.nuance}</span>
                            </div>
                        </div>
                    )}

                    {/* Nguyên Nhân (Cause) */}
                    {narrative.cause && (
                        <div className="flex items-start gap-2 mt-1.5 px-1 pb-1">
                            <span className="material-icons-round text-text-muted-light dark:text-text-muted-dark text-[1.1rem] shrink-0 mt-0.5" aria-hidden="true">history_edu</span>
                            <span className="text-[0.85rem] italic text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                                <span className="font-semibold not-italic mr-1">Nguồn cơn:</span> 
                                {narrative.cause}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ETCParagraph;
