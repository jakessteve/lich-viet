import React, { useState, useCallback } from 'react';
import type { NatalChart, BirthData } from '../../types/westernAstro';
import { calculateNatalChart } from '@lich-viet/core/chiemtinh';
import { calculateSynastry, type SynastryResult } from '@lich-viet/core/chiemtinh';
import BirthDataForm from './BirthDataForm';
import Icon from '../shared/Icon';
import TransitAspectInfoRow from './TransitAspectInfoRow';

export default function SynastryTab({ personAChart }: { personAChart: NatalChart }) {
    const [personBChart, setPersonBChart] = useState<NatalChart | null>(null);
    const [synastryResult, setSynastryResult] = useState<SynastryResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGeneratePartner = useCallback((birthData: BirthData) => {
        setIsLoading(true);
        setTimeout(() => { // simulate macro-task to allow UI rendering
            try {
                // Ensure same house system is used for comparison
                const chartB = calculateNatalChart(birthData, { houseSystem: personAChart.houseSystem });
                setPersonBChart(chartB);
                setSynastryResult(calculateSynastry(personAChart, chartB));
            } catch (e) {
                console.error("Synastry error:", e);
            } finally {
                setIsLoading(false);
            }
        }, 50);
    }, [personAChart]);

    const resetPartner = () => {
        setPersonBChart(null);
        setSynastryResult(null);
    };

    return (
        <div className="space-y-4 animate-fade-in-up">
            <div className="card-surface p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h3 className="font-semibold text-lg text-text-primary-light dark:text-text-primary-dark flex items-center gap-2">
                        <Icon name="favorite" className="w-5 h-5 text-rose-500" /> Độ Hợp Nhau (Synastry)
                    </h3>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        Kiểm tra mức độ tương hợp giữa bạn và một người khác dựa trên góc chiếu và nguyên tố.
                    </p>
                </div>
            </div>

            {!personBChart ? (
                <div className="border border-border-light dark:border-border-dark rounded-xl p-4 bg-gray-50 dark:bg-gray-800/30">
                    <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-4 text-center">
                        Nhập thông tin người thứ 2
                    </h4>
                    <BirthDataForm onGenerate={handleGeneratePartner} isLoading={isLoading} houseSystem={personAChart.houseSystem} />
                </div>
            ) : synastryResult ? (
                <div className="space-y-4">
                    <div className="flex justify-between items-center card-surface p-3">
                        <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                            Đang so sánh với: <span className="font-bold text-text-primary-light dark:text-text-primary-dark">{personBChart.birthData.name || 'Người thứ 2'}</span>
                        </div>
                        <button onClick={resetPartner} className="text-sm font-medium text-rose-500 hover:text-rose-600">
                            Thử người khác
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Score Card */}
                        <div className="col-span-1 card-surface p-5 flex flex-col items-center justify-center text-center bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20 border-rose-100 dark:border-rose-900/50">
                            <div className="text-4xl font-black text-rose-600 dark:text-rose-400 mb-2">
                                {synastryResult.compatibilityScore.toFixed(0)} <span className="text-xl text-text-secondary-light dark:text-text-secondary-dark">/ 100</span>
                            </div>
                            <h4 className="font-bold text-text-primary-light dark:text-text-primary-dark">
                                Điểm Tương Hợp
                            </h4>
                            <p className="text-sm font-medium text-rose-600 dark:text-rose-400 mt-2 p-2 bg-white/50 dark:bg-black/20 rounded-lg">
                                {synastryResult.elementalCompatibility}
                            </p>
                        </div>

                        {/* Aspects List */}
                        <div className="col-span-1 md:col-span-2 card-surface p-4">
                            <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark border-b border-border-light dark:border-border-dark pb-2 mb-3">
                                Khía Cạnh Chính (Hành Tinh Bạn ➔ Hành Tinh Đối Tác)
                            </h4>
                            {synastryResult.aspects.length === 0 ? (
                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark italic text-center py-4">
                                    Không có góc chiếu mạnh trực tiếp.
                                </p>
                            ) : (
                                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                                    {/* Sort aspects by score descending to show most impactful first */}
                                    {synastryResult.aspects.sort((a,b) => b.score - a.score).map((aspect, idx) => (
                                        <TransitAspectInfoRow key={idx} aspect={aspect} index={idx} isSynastry={true} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
