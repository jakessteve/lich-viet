/**
 * TuViModule — Main Page Container for the Tử Vi Module
 * 
 * Orchestrates: Input Form → Chart Generation → Grid Display
 * Manages chart state and loading/error states.
 * 
 * Performance: TuViWorkspace + engine code are lazy-loaded — they are only
 * downloaded when the user generates a chart, keeping the initial tab load fast.
 */

import React, { useState, useCallback, useRef, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/tuvi.css';
import TuViInputForm from './TuViInputForm';
import type { TuViChartData, ChartInput, SchoolStrategy } from '../../services/tuvi/tuviTypes';

import PremiumLoader from '../shared/PremiumLoader';
import ErrorState from '../shared/ErrorState';
import ProModeToggle from '../shared/ProModeToggle';

// Lazy-load the heavy workspace (grid + interpretation panels + engine)
const TuViWorkspace = React.lazy(() => import('./TuViWorkspace'));

export default function TuViModule() {
    const [chart, setChart] = useState<TuViChartData | null>(null);
    const [input, setInput] = useState<ChartInput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [isProMode, setIsProMode] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleGenerate = useCallback(async (newInput: ChartInput) => {
        setIsLoading(true);
        setError('');

        try {
            // Dynamic import — engine code (~290KB) only loaded on first chart generation
            const { generateChart } = await import('../../services/tuvi/tuviEngine');
            const result = generateChart(newInput);
            setChart(result);
            setInput(newInput);
            setError('');
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tạo lá số.';
            setError(message);
            setChart(null);
            setInput(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleReset = useCallback(() => {
        setChart(null);
        setInput(null);
        setError('');
    }, []);

    return (
        <div className="space-y-6">
            {/* Show input form when no chart is generated */}
            {!chart && !isLoading && (
                <TuViInputForm onGenerate={handleGenerate} isLoading={isLoading} />
            )}

            {/* Show Value-Builder PremiumLoader when generating chart */}
            {!chart && isLoading && (
                <div className="card-surface min-h-[400px] flex flex-col items-center justify-center">
                    <PremiumLoader />
                </div>
            )}

            {/* Error display */}
            {error && (
                <ErrorState
                    title="Lỗi tạo lá số"
                    message={error}
                    onRetry={handleReset}
                    retryLabel="← Quay lại nhập thông tin"
                />
            )}

            {/* Chart display */}
            {chart && input && (
                <div className="space-y-4 animate-fade-in-up">
                    {/* Action toolbar */}
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                        {/* Left: Palace legends */}
                        <div className="flex items-center gap-2 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                            <span className="inline-flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-gold" />
                                Cung Mệnh
                            </span>
                            <span className="inline-flex items-center gap-1 ml-2">
                                <span className="w-2 h-2 rounded-full bg-gray-400" />
                                Cung Thân
                            </span>
                        </div>
                        {/* Right: Actions */}
                        <div className="flex items-center gap-2">
                            <select
                                value={input.school || 'vi'}
                                onChange={(e) => {
                                    const newSchool = e.target.value as SchoolStrategy;
                                    handleGenerate({ ...input, school: newSchool });
                                }}
                                className="px-3 py-1.5 rounded-full text-xs font-semibold border border-border-light dark:border-border-dark bg-surface-subtle-light dark:bg-surface-subtle-dark text-text-primary-light dark:text-text-primary-dark appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all relative custom-select-arrow"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                    backgroundPosition: `right 0.25rem center`,
                                    backgroundRepeat: `no-repeat`,
                                    backgroundSize: `1.5em 1.5em`
                                }}
                            >
                                <option value="vi">Việt Nam</option>
                                <option value="cn">Trung Châu Phái</option>
                                <option value="tw">Bắc Phái</option>
                            </select>

                            <ProModeToggle isProMode={isProMode} onToggle={setIsProMode} />
                            <button
                                onClick={() => navigate('/app/hop-la')}
                                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-pink-500/10 dark:bg-pink-400/10 text-pink-600 dark:text-pink-400 hover:bg-pink-500/20 dark:hover:bg-pink-400/20 border border-pink-500/25 dark:border-pink-400/25 transition-all duration-200"
                            >
                                <span className="material-icons-round text-sm" aria-hidden="true">diversity_1</span>
                                Hợp Lá (Synastry)
                            </button>
                            <button
                                onClick={handleReset}
                                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gold/10 dark:bg-gold-dark/10 text-gold dark:text-gold-dark hover:bg-gold/20 dark:hover:bg-gold-dark/20 border border-gold/25 dark:border-gold-dark/25 transition-all duration-200"
                            >
                                <span className="material-icons-round text-sm" aria-hidden="true">add_circle</span>
                                Lập lá số mới
                            </button>
                        </div>
                    </div>
                    {/* The Main Workspace (Grid + Interpretation) — lazy-loaded */}
                    <Suspense fallback={<PremiumLoader />}>
                        <TuViWorkspace chart={chart} input={input} chartRef={chartRef} onUpdateInput={handleGenerate} isProMode={isProMode} />
                    </Suspense>
                </div>
            )}

        </div>
    );
}
