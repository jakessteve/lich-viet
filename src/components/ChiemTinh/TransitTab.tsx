import React, { useState, useMemo } from 'react';
import type { NatalChart } from '../../types/westernAstro';
import { calculateTransits } from '../../utils/transitCalculator';
import { calculateSecondaryProgression, calculateSolarArc } from '../../utils/predictiveEngine';
import Icon from '../shared/Icon';
import TransitAspectInfoRow from './TransitAspectInfoRow';

import ProModeToggle from '../shared/ProModeToggle';
import { useUserTier } from '../../hooks/useUserTier';
import { ErrorBoundary } from '../ErrorBoundary';

const NatalChartWheel = React.lazy(() => import('./NatalChartWheel'));

type PredictiveType = 'transit' | 'progression' | 'solar_arc';

export default function TransitTab({ natalChart }: { natalChart: NatalChart }) {
    const [targetDateStr, setTargetDateStr] = useState<string>(
        new Date().toISOString().split('T')[0]
    );
    const [predictiveType, setPredictiveType] = useState<PredictiveType>('transit');
    const [isProMode, setIsProMode] = useState(true);
    const { hasAccess } = useUserTier();

    const targetDate = useMemo(() => new Date(targetDateStr), [targetDateStr]);

    const transitResult = useMemo(() => {
        if (predictiveType === 'progression') return calculateSecondaryProgression(natalChart, targetDate);
        if (predictiveType === 'solar_arc') return calculateSolarArc(natalChart, targetDate);
        return calculateTransits(natalChart, targetDate);
    }, [natalChart, targetDate, predictiveType]);

    return (
        <div className="space-y-4 animate-fade-in-up">
            <div className="card-surface p-4 flex flex-col items-start gap-4">
                <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="font-semibold text-lg text-text-primary-light dark:text-text-primary-dark flex items-center gap-2">
                            <Icon name="cyclone" className="w-5 h-5 text-indigo-500" /> Vận Hạn Hiện Tại (Transits)
                        </h3>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
                            Biểu đồ kép: Vòng trong là bản đồ gốc (Natal), vòng ngoài là bầu trời hiện hành.
                        </p>
                    </div>
                </div>

                {/* Control Panel */}
                <div className="w-full flex flex-wrap items-center gap-4 py-3 border-t border-border-light dark:border-border-dark mt-2">
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                        <button
                            onClick={() => setPredictiveType('transit')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${predictiveType === 'transit' ? 'bg-white dark:bg-gray-700 shadow flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400' : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark'}`}
                        >
                            Transits (Bầu Trời)
                        </button>
                        <button
                            onClick={() => setPredictiveType('progression')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${predictiveType === 'progression' ? 'bg-white dark:bg-gray-700 shadow flex items-center gap-1.5 text-purple-600 dark:text-purple-400' : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark'}`}
                        >
                            <Icon name="social_distance" className="w-4 h-4" />
                            Tiến Trình (Secondary)
                        </button>
                        <button
                            onClick={() => setPredictiveType('solar_arc')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${predictiveType === 'solar_arc' ? 'bg-white dark:bg-gray-700 shadow flex items-center gap-1.5 text-orange-600 dark:text-orange-400' : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark'}`}
                        >
                            <Icon name="wb_sunny" className="w-4 h-4" />
                            Solar Arc (Hướng Tâm)
                        </button>
                    </div>

                    <div className="flex-1 flex justify-end items-center gap-4">
                        <ProModeToggle isProMode={isProMode} onToggle={setIsProMode} label="Bản Đồ SVG" />
                        <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-2">
                                <label className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark hidden sm:block">Ngày xem:</label>
                                <input 
                                    type="date"
                                    value={targetDateStr}
                                    onChange={(e) => setTargetDateStr(e.target.value)}
                                    className="px-2 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5">
                                <button
                                    onClick={() => {
                                        const d = new Date(targetDateStr);
                                        d.setMonth(d.getMonth() - 1);
                                        setTargetDateStr(d.toISOString().split('T')[0]);
                                    }}
                                    className="p-1 rounded text-text-secondary-light dark:text-text-secondary-dark hover:bg-white dark:hover:bg-gray-700 hover:text-indigo-600 transition-colors"
                                    title="-1 Tháng"
                                >
                                    <Icon name="keyboard_double_arrow_left" className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => {
                                        const d = new Date(targetDateStr);
                                        d.setDate(d.getDate() - 1);
                                        setTargetDateStr(d.toISOString().split('T')[0]);
                                    }}
                                    className="p-1 rounded text-text-secondary-light dark:text-text-secondary-dark hover:bg-white dark:hover:bg-gray-700 hover:text-indigo-600 transition-colors"
                                    title="-1 Ngày"
                                >
                                    <Icon name="chevron_left" className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => {
                                        setTargetDateStr(new Date().toISOString().split('T')[0]);
                                    }}
                                    className="px-2 py-0.5 text-[10px] font-bold uppercase rounded text-indigo-600 dark:text-indigo-400 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                                    title="Hôm nay"
                                >
                                    Today
                                </button>
                                <button
                                    onClick={() => {
                                        const d = new Date(targetDateStr);
                                        d.setDate(d.getDate() + 1);
                                        setTargetDateStr(d.toISOString().split('T')[0]);
                                    }}
                                    className="p-1 rounded text-text-secondary-light dark:text-text-secondary-dark hover:bg-white dark:hover:bg-gray-700 hover:text-indigo-600 transition-colors"
                                    title="+1 Ngày"
                                >
                                    <Icon name="chevron_right" className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => {
                                        const d = new Date(targetDateStr);
                                        d.setMonth(d.getMonth() + 1);
                                        setTargetDateStr(d.toISOString().split('T')[0]);
                                    }}
                                    className="p-1 rounded text-text-secondary-light dark:text-text-secondary-dark hover:bg-white dark:hover:bg-gray-700 hover:text-indigo-600 transition-colors"
                                    title="+1 Tháng"
                                >
                                    <Icon name="keyboard_double_arrow_right" className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dual Wheel Chart */}
            {isProMode && hasAccess('elite') ? (
                <ErrorBoundary viewName="Bản đồ kép (Dual-wheel)">
                    <React.Suspense fallback={<div className="h-80 card-surface animate-shimmer" />}>
                        <NatalChartWheel 
                            chart={natalChart} 
                            outerPlanets={transitResult.transitChart.planets} 
                            outerLabel="Transits" 
                        />
                    </React.Suspense>
                </ErrorBoundary>
            ) : (
                <div className="card-surface p-4 text-center text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    <span className="material-icons-round text-3xl text-gold/30 dark:text-gold-dark/30 mb-2 block" aria-hidden="true">lock</span>
                    Bật Bản Đồ Kép (Cần gói Elite) để xem trực quan vị trí Transits trên lá số gốc của bạn.
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card-surface p-4">
                    <h4 className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark border-b border-border-light dark:border-border-dark pb-2 mb-3">
                        Góc chiếu tạo bởi Hành Tinh Hiện Tại (Transit) ➔ Hành Tinh Gốc (Natal)
                    </h4>
                    {transitResult.interAspects.length === 0 ? (
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark italic text-center py-4">
                            Không có góc chiếu đáng kể nào trong ngày này.
                        </p>
                    ) : (
                        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
                            {transitResult.interAspects.map((aspect, idx) => (
                                <TransitAspectInfoRow 
                                    key={idx} 
                                    aspect={aspect} 
                                    index={idx} 
                                    isSynastry={false} 
                                    predictiveType={predictiveType} 
                                />
                            ))}
                        </div>
                    )}
                </div>
                
                <div className="card-surface p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-100 dark:border-indigo-900/50">
                    <h4 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-2">
                        Phân tích Biến động
                    </h4>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        Bấm vào từng góc chiếu ở danh sách bên cạnh để đọc giải nghĩa chi tiết. Đặc biệt chú ý đến các hành tinh vòng ngoài (Jupiter, Saturn, Uranus, Neptune, Pluto) tạo góc chiếu với năng lượng lõi (Sun, Moon, Ascendant) của bạn!
                    </p>
                    {transitResult.interAspects.filter(a => ['jupiter', 'saturn', 'uranus', 'neptune', 'pluto'].includes(a.transitPlanetId)).length > 0 && (
                        <div className="mt-4 p-3 bg-white/60 dark:bg-black/20 rounded-lg">
                            <span className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400">Các Tác Nhân Chính Cần Chú Ý:</span>
                            <ul className="list-disc list-inside text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
                                {transitResult.interAspects.filter(a => ['jupiter', 'saturn', 'uranus', 'neptune', 'pluto'].includes(a.transitPlanetId)).slice(0, 3).map((a, i) => (
                                    <li key={i}>
                                        <b className="capitalize">{a.transitPlanetId}</b> đang tác động mạnh lên <b>{a.natalPlanetId}</b> gốc.
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
