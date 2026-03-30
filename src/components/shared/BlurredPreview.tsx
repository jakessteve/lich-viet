// ══════════════════════════════════════════════════════════
// BlurredPreview — Shows content with gradient blur + CTA overlay
// ══════════════════════════════════════════════════════════

import React from 'react';

interface BlurredPreviewProps {
    /** Content to render blurred */
    children: React.ReactNode;
    /** CTA overlay shown on top of blurred content */
    ctaOverlay?: React.ReactNode;
    /** Max preview height in px (default: 120) */
    maxHeight?: number;
}

export function BlurredPreview({
    children,
    ctaOverlay,
    maxHeight = 120,
}: BlurredPreviewProps) {
    return (
        <div className="blurred-preview" style={{ maxHeight: maxHeight + 60 }}>
            <div
                className="blurred-preview__content"
                style={{ maxHeight }}
                aria-hidden="true"
            >
                {children}
            </div>
            <div className="blurred-preview__fade" />
            {ctaOverlay && (
                <div className="blurred-preview__overlay">
                    {ctaOverlay}
                </div>
            )}
        </div>
    );
}
