import React from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useTuViStore } from '../../stores/tuviStore';
import { TuViInputForm } from './TuViInputForm';
import { TuViChart } from './TuViChart';
import { TuViMarkdownExport } from './TuViMarkdownExport';
import type { TuViSchool } from '../../types/tuvi';
import './tuviChart.css';

const MONTH_LABELS = Array.from({ length: 12 }, (_, index) => index + 1);
const SCHOOL_OPTIONS: Array<{ id: TuViSchool; label: string; icon: string }> = [
  { id: 'nam-phai', label: 'Nam phái', icon: 'south' },
  { id: 'thien-luong', label: 'Thiên Lương', icon: 'auto_awesome' },
  { id: 'bac-phai', label: 'Bắc phái', icon: 'north' },
];

export const TuViPage: React.FC = () => {
  usePageTitle('Tử Vi');
  const {
    chart,
    selectedPalaceIndex,
    selectPalace,
    viewYear,
    viewMonth,
    setHanView,
    error,
    clearError,
    input,
    setSchool,
  } = useTuViStore();
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark flex items-center justify-center gap-2">
          <span className="material-icons-round text-xl text-amber-500 dark:text-amber-400">auto_awesome</span>
          Tử Vi Đẩu Số
        </h2>
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
          Luận giải lá số theo trường phái Thiên Lương (天梁)
        </p>
      </div>

      {/* Input Form */}
      <div className="glass-card">
        <div className="card-header">
          <h3 className="section-title text-sm flex items-center gap-2">
            <span className="material-icons-round text-gold-light dark:text-gold-dark text-base">person</span>
            Thông Tin Lá Số
          </h3>
        </div>
        <div className="p-4 sm:p-5">
          <TuViInputForm />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-bad dark:text-bad-dark flex items-start gap-2"
          role="alert"
        >
          <span className="material-icons-round text-base mt-0.5">error</span>
          <span className="flex-1">{error}</span>
          <button
            onClick={clearError}
            className="p-0.5 rounded hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
            aria-label="Đóng lỗi"
          >
            <span className="material-icons-round text-sm">close</span>
          </button>
        </div>
      )}

      {/* Chart */}
      {chart && (
        <div className="flex flex-wrap items-end justify-between gap-3 rounded-xl border border-border-light/40 dark:border-border-dark/40 bg-surface-subtle-light/70 dark:bg-surface-subtle-dark/70 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="material-icons-round text-base text-gold-light dark:text-gold-dark">history</span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary-light dark:text-text-secondary-dark">
                Xem hạn
              </p>
              <p className="text-sm text-text-primary-light dark:text-text-primary-dark">Năm và tháng đang xem</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setHanView(viewYear - 1, viewMonth)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-light/40 dark:border-border-dark/40 bg-white/80 dark:bg-surface-elevated-dark/60 text-text-secondary-light dark:text-text-secondary-dark transition-colors hover:bg-gold/10 hover:text-gold-light dark:hover:text-gold-dark"
              aria-label="Lùi một năm"
            >
              <span className="material-icons-round text-base">chevron_left</span>
            </button>
            <label className="flex items-center gap-2 rounded-lg border border-border-light/40 dark:border-border-dark/40 bg-white/80 dark:bg-surface-elevated-dark/60 px-3 py-2 text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
              <span className="material-icons-round text-base text-gold-light dark:text-gold-dark">calendar_month</span>
              <input
                type="number"
                min={1}
                step={1}
                value={viewYear}
                onChange={(event) => {
                  const raw = event.target.value.trim();
                  if (!raw) return;
                  setHanView(Number(raw), viewMonth);
                }}
                className="w-24 bg-transparent text-sm font-semibold outline-none"
                aria-label="Năm xem hạn"
              />
            </label>
            <button
              type="button"
              onClick={() => setHanView(viewYear + 1, viewMonth)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-light/40 dark:border-border-dark/40 bg-white/80 dark:bg-surface-elevated-dark/60 text-text-secondary-light dark:text-text-secondary-dark transition-colors hover:bg-gold/10 hover:text-gold-light dark:hover:text-gold-dark"
              aria-label="Tăng một năm"
            >
              <span className="material-icons-round text-base">chevron_right</span>
            </button>

            <select
              value={viewMonth}
              onChange={(event) => setHanView(viewYear, Number(event.target.value))}
              className="h-9 rounded-lg border border-border-light/40 dark:border-border-dark/40 bg-white/80 dark:bg-surface-elevated-dark/60 px-3 text-sm font-medium text-text-primary-light dark:text-text-primary-dark outline-none"
              aria-label="Tháng xem hạn"
            >
              {MONTH_LABELS.map((month) => (
                <option key={month} value={month}>
                  Tháng {month}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setHanView(currentYear, currentMonth)}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border-light/40 dark:border-border-dark/40 bg-white/80 dark:bg-surface-elevated-dark/60 px-3 text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark transition-colors hover:bg-gold/10 hover:text-gold-light dark:hover:text-gold-dark"
            >
              <span className="material-icons-round text-base">today</span>
              Hôm nay
            </button>
          </div>
        </div>
      )}

      {chart && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-light/40 dark:border-border-dark/40 bg-white/70 px-4 py-3 dark:bg-surface-elevated-dark/40">
          <div className="flex items-center gap-2">
            <span className="material-icons-round text-base text-gold-light dark:text-gold-dark">account_tree</span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary-light dark:text-text-secondary-dark">
                Trường phái
              </p>
              <p className="text-sm text-text-primary-light dark:text-text-primary-dark">
                {chart.centerInfo.schoolLabel}
              </p>
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-1 rounded-lg bg-surface-subtle-light p-1 dark:bg-white/5 sm:w-auto sm:grid-cols-3">
            {SCHOOL_OPTIONS.map((school) => {
              const active = (input.school ?? 'thien-luong') === school.id;
              return (
                <button
                  key={school.id}
                  type="button"
                  onClick={() => setSchool(school.id)}
                  className={`inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-md px-3 text-xs font-semibold transition-colors sm:w-auto ${
                    active
                      ? 'bg-white text-gold-light shadow-sm dark:bg-white/15 dark:text-gold-dark'
                      : 'text-text-secondary-light hover:bg-white/70 dark:text-text-secondary-dark dark:hover:bg-white/10'
                  }`}
                  aria-pressed={active}
                >
                  <span className="material-icons-round text-sm">{school.icon}</span>
                  {school.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {chart && (
        <div className="animate-fade-scale">
          <TuViChart chart={chart} selectedPalaceIndex={selectedPalaceIndex} onSelectPalace={selectPalace} />
        </div>
      )}

      {/* Markdown Export */}
      {chart && <TuViMarkdownExport />}
    </div>
  );
};
