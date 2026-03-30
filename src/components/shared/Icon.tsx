/**
 * Icon — Unified Material Icons wrapper for consistent sizing.
 * Replaces Lucide React to eliminate the extra dependency and
 * unify the icon library across all modules.
 *
 * Uses the `material-icons-round` font already loaded in index.html.
 */
import React from 'react';

interface IconProps {
    /** Material Icons name, e.g. 'public', 'star', 'warning' */
    name: string;
    /** Tailwind classes for sizing and color, e.g. 'w-4 h-4 text-indigo-500' */
    className?: string;
}

/**
 * Inline Material Icon with class-based sizing.
 * Maps w-3/h-3 → 12px, w-3.5/h-3.5 → 14px, w-4/h-4 → 16px, w-5/h-5 → 20px, w-6/h-6 → 24px.
 */
export default function Icon({ name, className = '' }: IconProps) {
    // Extract size from className (default to text-base/16px)
    let fontSize: string | undefined;
    if (className.includes('w-3 ') || className.includes('h-3 ') || className.includes('w-3 ') || className.endsWith('h-3')) {
        fontSize = '12px';
    } else if (className.includes('w-3.5') || className.includes('h-3.5')) {
        fontSize = '14px';
    } else if (className.includes('w-4') || className.includes('h-4')) {
        fontSize = '16px';
    } else if (className.includes('w-5') || className.includes('h-5')) {
        fontSize = '20px';
    } else if (className.includes('w-6') || className.includes('h-6')) {
        fontSize = '24px';
    }

    // Strip w-*/h-* classes since we use font-size for Material Icons
    const filteredClasses = className
        .split(' ')
        .filter(c => !c.startsWith('w-') && !c.startsWith('h-'))
        .join(' ');

    return (
        <span
            className={`material-icons-round ${filteredClasses}`.trim()}
            style={fontSize ? { fontSize } : undefined}
            aria-hidden="true"
        >
            {name}
        </span>
    );
}
