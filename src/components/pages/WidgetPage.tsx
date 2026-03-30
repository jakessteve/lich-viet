/**
 * WidgetPage — Standalone chromeless page for PWA home screen widget
 *
 * Renders EnergyWidget in full mode without app navigation chrome.
 * Intended to be added to the home screen as a PWA shortcut.
 *
 * Route: /widget
 */

import React from 'react';
import EnergyWidget from '../shared/EnergyWidget';

export default function WidgetPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <EnergyWidget showCTA compact={false} />
      </div>
    </div>
  );
}
