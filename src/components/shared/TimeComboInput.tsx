/**
 * TimeComboInput — reusable text input + clickable dropdown button
 *
 * Extracted from TuViInputForm for reuse across components.
 * Supports numeric text entry with min/max validation and a dropdown picker.
 */

import React, { useState, useRef, useEffect } from 'react';

export interface TimeComboInputProps {
    id: string;
    value: number;
    onChange: (v: number) => void;
    options: number[];
    min: number;
    max: number;
    label: string;
    placeholder: string;
    required?: boolean;
    inputClass: string;
}

export function TimeComboInput({ id, value, onChange, options, min, max, label, placeholder, required, inputClass }: TimeComboInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        if (!isOpen) return;
        function handleClick(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [isOpen]);

    return (
        <div ref={containerRef} className="relative flex-1">
            <div className="flex">
                <input
                    id={id}
                    type="text"
                    inputMode="numeric"
                    value={String(value).padStart(2, '0')}
                    onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, '').slice(0, 2);
                        const v = parseInt(raw, 10);
                        if (!isNaN(v) && v >= min && v <= max) onChange(v);
                        else if (raw === '') onChange(min);
                    }}
                    onFocus={(e) => e.target.select()}
                    required={required}
                    className={`${inputClass} text-center font-semibold tabular-nums tracking-wider !rounded-r-none !border-r-0 !pr-1`}
                    aria-label={label}
                    placeholder={placeholder}
                    maxLength={2}
                />
                <button
                    type="button"
                    onClick={() => setIsOpen(prev => !prev)}
                    className="flex items-center justify-center w-8 rounded-r-xl border border-l-0 border-border-light dark:border-border-dark bg-surface-subtle-light dark:bg-surface-subtle-dark hover:bg-gold/10 dark:hover:bg-gold-dark/10 transition-colors cursor-pointer shrink-0"
                    aria-label={`Chọn ${label}`}
                    tabIndex={-1}
                >
                    <span className={`material-icons-round text-sm text-text-secondary-light dark:text-text-secondary-dark transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                        expand_more
                    </span>
                </button>
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-50 top-full mt-1 left-0 right-0 max-h-48 overflow-y-auto rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-lg ring-1 ring-black/5 dark:ring-white/5">
                    {options.map((opt) => (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => { onChange(opt); setIsOpen(false); }}
                            className={`w-full px-3 py-2 text-sm text-center tabular-nums font-medium transition-colors cursor-pointer
                                ${opt === value
                                    ? 'bg-gold/15 dark:bg-gold-dark/15 text-gold dark:text-gold-dark font-bold'
                                    : 'text-text-primary-light dark:text-text-primary-dark hover:bg-surface-subtle-light dark:hover:bg-surface-subtle-dark'
                                }`}
                        >
                            {String(opt).padStart(2, '0')}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
