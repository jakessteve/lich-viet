/**
 * DepositorTable — Table C
 * Shows for each planet/point: ruler of the sign it's in (traditional + modern) + which house
 */
import React from 'react';
import Icon from '../shared/Icon';
import type { NatalChart } from '../../types/westernAstro';
import { PLANETS } from '../../data/westernAstro/planetData';

interface Props { chart: NatalChart; }

export default function DepositorTable({ chart }: Props) {
    return (
        <div className="p-4">
            <h3 className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark flex items-center gap-2 mb-3">
                <Icon name="account_tree" className="w-4 h-4 text-teal-500" /> Chủ tinh của các Hành tinh (Depositor)
            </h3>

            <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                    <thead>
                        <tr className="border-b border-black/10 dark:border-white/10 text-text-secondary-light dark:text-text-secondary-dark">
                            <th className="text-left py-2 px-2 font-semibold">Chủ tinh của</th>
                            <th className="text-left py-2 px-2 font-semibold">Truyền thống</th>
                            <th className="text-center py-2 px-2 font-semibold">Nhà</th>
                            <th className="text-left py-2 px-2 font-semibold">Hiện đại</th>
                            <th className="text-center py-2 px-2 font-semibold">Nhà</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chart.depositors.map(dep => {
                            const tradRuler = PLANETS[dep.traditionalRuler];
                            const modRuler = PLANETS[dep.modernRuler];
                            const isDiff = dep.traditionalRuler !== dep.modernRuler;

                            return (
                                <tr key={dep.bodyId} className="border-b border-black/5 dark:border-white/5 hover:bg-black/3 dark:hover:bg-white/3 transition-colors">
                                    <td className="py-1.5 px-2 font-medium text-text-primary-light dark:text-text-primary-dark">
                                        {dep.bodyName}
                                    </td>
                                    <td className="py-1.5 px-2">
                                        <span className="text-text-primary-light dark:text-text-primary-dark">
                                            {tradRuler?.symbol} {tradRuler?.name ?? dep.traditionalRuler}
                                        </span>
                                    </td>
                                    <td className="py-1.5 px-2 text-center font-medium">
                                        {dep.traditionalRulerHouse || '—'}
                                    </td>
                                    <td className="py-1.5 px-2">
                                        <span className={`text-text-primary-light dark:text-text-primary-dark ${isDiff ? 'font-medium' : ''}`}>
                                            {modRuler?.symbol} {modRuler?.name ?? dep.modernRuler}
                                        </span>
                                    </td>
                                    <td className="py-1.5 px-2 text-center font-medium">
                                        {dep.modernRulerHouse || '—'}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
