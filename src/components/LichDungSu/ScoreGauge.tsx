/**
 * ScoreGauge — Animated circular percentage gauge
 * Displays the activity auspiciousness score as a colorful arc.
 */

import React, { useEffect, useRef, useState } from 'react';

interface ScoreGaugeProps {
    percentage: number;
    label: string;
    colorClass: string;
    isBachSuHung?: boolean;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ percentage, label, colorClass, isBachSuHung }) => {
    const [animatedPct, setAnimatedPct] = useState(0);
    const prevPctRef = useRef(0);

    useEffect(() => {
        const start = prevPctRef.current;
        const delta = percentage - start;
        if (delta === 0) return;
        const duration = 600;
        const startTime = performance.now();
        let frame: number;
        const tick = (now: number) => {
            const t = Math.min(1, (now - startTime) / duration);
            // Ease-out curve
            const eased = 1 - Math.pow(1 - t, 3);
            const current = Math.round(start + delta * eased);
            setAnimatedPct(current);
            if (t < 1) {
                frame = requestAnimationFrame(tick);
            } else {
                prevPctRef.current = percentage;
            }
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [percentage]);

    // SVG arc calculations
    const size = 180;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const arcLength = (animatedPct / 100) * circumference;
    const dashOffset = circumference - arcLength;

    // Color based on percentage
    const getStrokeColor = (pct: number): string => {
        if (pct >= 80) return '#10b981'; // emerald
        if (pct >= 60) return '#22c55e'; // green
        if (pct >= 40) return '#f59e0b'; // amber
        if (pct >= 20) return '#f97316'; // orange
        return '#ef4444'; // red
    };

    const strokeColor = getStrokeColor(percentage);

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative" style={{ width: size, height: size }}>
                {/* Background circle */}
                <svg width={size} height={size} className="transform -rotate-90">
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        className="text-gray-200 dark:text-gray-700"
                    />
                    {/* Animated arc */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        className="transition-all duration-1000 ease-out"
                        style={{ filter: `drop-shadow(0 0 6px ${strokeColor}40)` }}
                    />
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-4xl font-black tabular-nums ${colorClass}`}>
                        {animatedPct}%
                    </span>
                </div>
            </div>

            {/* Label */}
            <div className="text-center">
                <span className={`text-lg font-bold ${colorClass}`}>{label}</span>
                {isBachSuHung && (
                    <p className="text-xs text-red-500 dark:text-red-400 mt-1 font-medium">
                        ⚠️ Ngày Bách Sự Hung — điểm bị giới hạn
                    </p>
                )}
            </div>
        </div>
    );
};

export default ScoreGauge;
