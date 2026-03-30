import React, { useState, useRef, ReactNode, useId } from 'react';

interface AcademicToggleProps {
    children: ReactNode;
    label?: string;
    defaultOpen?: boolean;
}

/** Collapsible wrapper for academic interpretation content, collapsed by default. */
const AcademicToggle: React.FC<AcademicToggleProps> = ({
    children,
    label = 'Chi Tiết Học Thuật',
    defaultOpen = false,
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const contentRef = useRef<HTMLDivElement>(null);
    const contentId = useId();

    return (
        <div className="academic-toggle">
            <button
                className="academic-toggle-btn"
                onClick={() => setIsOpen(prev => !prev)}
                aria-expanded={isOpen}
                aria-controls={contentId}
            >
                <span className="material-icons-round" style={{ fontSize: '1.1rem' }}>
                    school
                </span>
                <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>
                <span
                    className={`material-icons-round academic-toggle-icon ${isOpen ? 'academic-toggle-icon--open' : ''}`}
                    style={{ fontSize: '1.1rem' }}
                >
                    expand_more
                </span>
            </button>
            <div
                id={contentId}
                ref={contentRef}
                className={`academic-toggle-content ${isOpen ? 'academic-toggle-content--expanded' : 'academic-toggle-content--collapsed'}`}
            >
                {children}
            </div>
        </div>
    );
};

export default AcademicToggle;
