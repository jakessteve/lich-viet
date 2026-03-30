/**
 * SkyMapControls — Toggle panel for sky map visualization layers.
 * Pill-style buttons inline with the sky map.
 */
import React from 'react';

export interface SkyMapOptions {
    showConstellationLines: boolean;
    showStarLabels: boolean;
    showPlanetLabels: boolean;
    showDayNight: boolean;
}

interface Props {
    options: SkyMapOptions;
    onChange: (opts: SkyMapOptions) => void;
}

interface ToggleButtonProps {
    label: string;
    icon: string;
    active: boolean;
    onClick: () => void;
}

function ToggleButton({ label, icon, active, onClick }: ToggleButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all duration-200 border ${active
                    ? 'bg-gold/15 dark:bg-gold-dark/15 text-gold dark:text-gold-dark border-gold/30 dark:border-gold-dark/30'
                    : 'bg-transparent text-text-secondary-light dark:text-text-secondary-dark border-white/10 dark:border-white/10 opacity-50 hover:opacity-80'
                }`}
            aria-pressed={active}
        >
            <span aria-hidden="true">{icon}</span>
            {label}
        </button>
    );
}

export default function SkyMapControls({ options, onChange }: Props) {
    const toggle = (key: keyof SkyMapOptions) => {
        onChange({ ...options, [key]: !options[key] });
    };

    return (
        <div className="flex flex-wrap gap-1.5 justify-center">
            <ToggleButton
                label="Chòm sao"
                icon="✦"
                active={options.showConstellationLines}
                onClick={() => toggle('showConstellationLines')}
            />
            <ToggleButton
                label="Tên sao"
                icon="𝐴"
                active={options.showStarLabels}
                onClick={() => toggle('showStarLabels')}
            />
            <ToggleButton
                label="Hành tinh"
                icon="☿"
                active={options.showPlanetLabels}
                onClick={() => toggle('showPlanetLabels')}
            />
            <ToggleButton
                label="Ngày/Đêm"
                icon="◑"
                active={options.showDayNight}
                onClick={() => toggle('showDayNight')}
            />
        </div>
    );
}
