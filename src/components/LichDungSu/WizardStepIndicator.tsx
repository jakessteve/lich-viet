/**
 * WizardStepIndicator — 3-step progress bar for Dụng Sự wizard flow
 * Steps: Mục đích → Hoạt động → Kết quả
 */

import React from 'react';

interface WizardStepIndicatorProps {
  currentStep: number;  // 1, 2, or 3
  onStepClick: (step: number) => void;
  completedSteps: Set<number>;
}

const STEPS = [
  { step: 1, label: 'Mục đích', icon: 'target' },
  { step: 2, label: 'Hoạt động', icon: 'checklist' },
  { step: 3, label: 'Kết quả', icon: 'assessment' },
];

const WizardStepIndicator: React.FC<WizardStepIndicatorProps> = ({
  currentStep,
  onStepClick,
  completedSteps,
}) => {
  return (
    <div className="flex items-center justify-center gap-1 py-3 px-2">
      {STEPS.map((s, i) => {
        const isActive = currentStep === s.step;
        const isCompleted = completedSteps.has(s.step);
        const canClick = s.step < currentStep || isCompleted;

        return (
          <React.Fragment key={s.step}>
            {/* Connector line */}
            {i > 0 && (
              <div
                className={`flex-1 h-0.5 max-w-12 rounded-full transition-all duration-300 ${
                  s.step <= currentStep || isCompleted
                    ? 'bg-gold/60 dark:bg-gold-dark/60'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            )}

            {/* Step circle + label */}
            <button
              onClick={() => canClick && onStepClick(s.step)}
              disabled={!canClick}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-gold/15 dark:bg-gold-dark/15 ring-1 ring-gold/40 dark:ring-gold-dark/40 shadow-sm'
                  : canClick
                    ? 'hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer'
                    : 'opacity-50 cursor-default'
              }`}
            >
              {/* Step number / check */}
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-gold dark:bg-gold-dark text-white'
                    : isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}
              >
                {isCompleted && !isActive ? (
                  <span className="material-icons-round" style={{ fontSize: '14px' }}>check</span>
                ) : (
                  s.step
                )}
              </span>

              {/* Label — show on active and completed */}
              <span
                className={`text-xs font-semibold hidden sm:inline transition-colors duration-200 ${
                  isActive
                    ? 'text-gold dark:text-gold-dark'
                    : isCompleted
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                {s.label}
              </span>
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default WizardStepIndicator;
