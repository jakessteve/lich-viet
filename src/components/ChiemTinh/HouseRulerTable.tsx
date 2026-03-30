/**
 * HouseRulerTable — Table B
 * Shows each house's sign, traditional ruler (+ house), modern ruler (+ house)
 */
import React from 'react';
import Icon from '../shared/Icon';
import type { NatalChart } from '../../types/westernAstro';
import { ZODIAC_SIGNS } from '../../data/westernAstro/zodiacSigns';
import { PLANETS } from '../../data/westernAstro/planetData';

interface Props { chart: NatalChart; }

export default function HouseRulerTable({ chart }: Props) {
    return (
        <div className="p-4">
            <h3 className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark flex items-center gap-2 mb-3">
                <Icon name="workspace_premium" className="w-4 h-4 text-amber-500" /> Cung Nhà và Chủ tinh
            </h3>

            <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                    <thead>
                        <tr className="border-b border-black/10 dark:border-white/10 text-text-secondary-light dark:text-text-secondary-dark">
                            <th className="text-left py-2 px-2 font-semibold">Cung Nhà</th>
                            <th className="text-left py-2 px-2 font-semibold">Cung Hoàng Đạo</th>
                            <th className="text-left py-2 px-2 font-semibold">Chủ tinh (truyền thống)</th>
                            <th className="text-center py-2 px-2 font-semibold">Nhà</th>
                            <th className="text-left py-2 px-2 font-semibold">Chủ tinh (hiện đại)</th>
                            <th className="text-center py-2 px-2 font-semibold">Nhà</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chart.houseRulers.map(hr => {
                            const sign = ZODIAC_SIGNS[hr.sign];
                            const tradRuler = PLANETS[hr.traditionalRuler];
                            const modRuler = PLANETS[hr.modernRuler];
                            const isDiff = hr.traditionalRuler !== hr.modernRuler;

                            return (
                                <tr key={hr.houseNumber} className="border-b border-black/5 dark:border-white/5 hover:bg-black/3 dark:hover:bg-white/3 transition-colors">
                                    <td className="py-1.5 px-2 font-medium text-text-primary-light dark:text-text-primary-dark">
                                        Nhà {hr.houseNumber}
                                    </td>
                                    <td className="py-1.5 px-2">
                                        <span className="text-text-primary-light dark:text-text-primary-dark">
                                            {sign.symbol} {sign.name}
                                        </span>
                                    </td>
                                    <td className="py-1.5 px-2">
                                        <span className="text-text-primary-light dark:text-text-primary-dark">
                                            {tradRuler.symbol} {tradRuler.name}
                                        </span>
                                    </td>
                                    <td className="py-1.5 px-2 text-center font-medium">
                                        {hr.traditionalRulerHouse || '—'}
                                    </td>
                                    <td className="py-1.5 px-2">
                                        <span className={`text-text-primary-light dark:text-text-primary-dark ${isDiff ? 'font-medium' : ''}`}>
                                            {modRuler.symbol} {modRuler.name}
                                        </span>
                                        {isDiff && <span className="ml-1 text-[10px] text-amber-500">★</span>}
                                    </td>
                                    <td className="py-1.5 px-2 text-center font-medium">
                                        {hr.modernRulerHouse || '—'}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <p className="mt-2 text-[10px] text-text-secondary-light dark:text-text-secondary-dark opacity-50">
                ★ = Chủ tinh hiện đại khác truyền thống (Bọ Cạp, Bảo Bình, Song Ngư)
            </p>
        </div>
    );
}
