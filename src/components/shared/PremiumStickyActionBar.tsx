import React from 'react';

interface PremiumStickyActionBarProps {
  /** Buttons or actions to display in the bar, e.g., Share/PDF */
  children: React.ReactNode;
}

/**
 * A shared elegant, sticky action bar used across astrology modules (Tử Vi, Bát Tự, Chiêm Tinh, Thần Số Học).
 * Provides a consistent hook for triggering exports, PDF downloads, and sharing.
 */
export default function PremiumStickyActionBar({
  children,
}: PremiumStickyActionBarProps) {
  return (
    <div className="sticky top-16 lg:top-0 z-20 flex flex-row flex-nowrap overflow-x-auto scrollbar-none items-stretch lg:items-center justify-start gap-3 p-3 mt-4 mb-4 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md rounded-2xl border-2 border-gold/40 shadow-sm transition-all w-full">
      {children}
    </div>
  );
}
