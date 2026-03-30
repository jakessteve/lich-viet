import React from 'react';

interface DecorativeDividerProps {
    icon?: string;
}

/** Decorative line divider between narrative sections. */
const DecorativeDivider: React.FC<DecorativeDividerProps> = ({ icon = '✦' }) => {
    return (
        <div className="decorative-divider" role="separator">
            <div className="decorative-divider-line" />
            <span className="decorative-divider-icon">{icon}</span>
            <div className="decorative-divider-line" />
        </div>
    );
};

export default DecorativeDivider;
