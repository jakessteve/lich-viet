/**
 * PersonalitySummary — Top-level personality insights card
 * B1: Shows 3–5 key personality traits derived from interpretation data
 */
import React from 'react';
import Icon from '../shared/Icon';
import type { NatalChart, InterpretationResult, Element as AstroElement } from '../../types/westernAstro';
import { ZODIAC_SIGNS, ELEMENT_NAMES, ELEMENT_COLORS } from '../../data/westernAstro/zodiacSigns';

interface Props {
    chart: NatalChart;
    interpretation: InterpretationResult;
}

interface Insight {
    icon: string;
    label: string;
    value: string;
    color: string;
}

export default function PersonalitySummary({ chart, interpretation }: Props) {
    const insights = buildInsights(chart, interpretation);
    if (insights.length === 0) return null;

    return (
        <div className="card-surface overflow-hidden">
            <div className="px-4 py-3 border-b border-border-light dark:border-border-dark flex items-center gap-2">
                <Icon name="auto_awesome" className="w-4 h-4 text-gold dark:text-gold-dark" />
                <h3 className="text-base font-semibold text-text-primary-light dark:text-text-primary-dark">
                    Tóm Tắt Tính Cách
                </h3>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {insights.map((insight, i) => (
                    <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/50 dark:bg-white/3 border border-border-light/30 dark:border-border-dark/30"
                    >
                        <span
                            className="text-lg shrink-0 w-8 h-8 flex items-center justify-center rounded-lg"
                            style={{ backgroundColor: insight.color + '20', color: insight.color }}
                        >
                            {insight.icon}
                        </span>
                        <div className="min-w-0">
                            <div className="text-[10px] uppercase tracking-wider font-semibold text-text-secondary-light dark:text-text-secondary-dark opacity-60 mb-0.5">
                                {insight.label}
                            </div>
                            <div className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark leading-snug">
                                {insight.value}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function buildInsights(chart: NatalChart, interp: InterpretationResult): Insight[] {
    const insights: Insight[] = [];
    const sunSign = ZODIAC_SIGNS[chart.sun.sign];
    const moonSign = ZODIAC_SIGNS[chart.moon.sign];
    const ascSign = ZODIAC_SIGNS[chart.ascendantSign];

    // 1. Core identity from Sun sign
    const sunInterp = interp.planetInterpretations.find(e => e.key.startsWith('sun-'));
    insights.push({
        icon: '☉',
        label: 'Bản ngã cốt lõi',
        value: sunInterp
            ? truncate(sunInterp.body, 80)
            : `${sunSign.name} — ${sunSign.element === 'fire' ? 'Nhiệt huyết' : sunSign.element === 'earth' ? 'Thực tế' : sunSign.element === 'air' ? 'Tri thức' : 'Trực giác'} & ${sunSign.quality === 'cardinal' ? 'Khởi xướng' : sunSign.quality === 'fixed' ? 'Kiên định' : 'Linh hoạt'}`,
        color: ELEMENT_COLORS[sunSign.element],
    });

    // 2. Emotional world from Moon sign
    const moonInterp = interp.planetInterpretations.find(e => e.key.startsWith('moon-'));
    insights.push({
        icon: '☽',
        label: 'Thế giới cảm xúc',
        value: moonInterp
            ? truncate(moonInterp.body, 80)
            : `${moonSign.name} mang lại chiều sâu cảm xúc ${moonSign.element === 'water' ? 'mãnh liệt' : moonSign.element === 'earth' ? 'ổn định' : moonSign.element === 'fire' ? 'bùng cháy' : 'lý trí'}`,
        color: ELEMENT_COLORS[moonSign.element],
    });

    // 3. First impression from Ascendant
    insights.push({
        icon: '↑',
        label: 'Ấn tượng đầu tiên',
        value: `Cung Mọc ${ascSign.name} — người khác thường thấy bạn ${ascSign.element === 'fire' ? 'tự tin, năng động' : ascSign.element === 'earth' ? 'đáng tin, điềm đạm' : ascSign.element === 'air' ? 'thân thiện, hoạt bát' : 'bí ẩn, sâu sắc'}`,
        color: ELEMENT_COLORS[ascSign.element],
    });

    // 4. Dominant element
    const o = chart.overview;
    const elements = (Object.entries(o.elementBalance) as [AstroElement, number][]);
    elements.sort((a, b) => b[1] - a[1]);
    const [domEl, domCount] = elements[0];
    const total = chart.planets.length;
    if (total > 0) {
        const pct = Math.round((domCount / total) * 100);
        insights.push({
            icon: domEl === 'fire' ? '🔥' : domEl === 'earth' ? '⛰️' : domEl === 'air' ? '💨' : '🌊',
            label: 'Nguyên tố chủ đạo',
            value: `${ELEMENT_NAMES[domEl]} chiếm ${pct}% (${domCount}/${total} hành tinh)`,
            color: ELEMENT_COLORS[domEl],
        });
    }

    // 5. Chart pattern if available
    if (o.pattern && o.patternDescription) {
        insights.push({
            icon: '◇',
            label: 'Hình thái bản đồ',
            value: o.patternDescription,
            color: '#6366f1', // Indigo
        });
    }

    return insights;
}

function truncate(text: string, maxLen: number): string {
    if (text.length <= maxLen) return text;
    // Find last sentence boundary within limit
    const trimmed = text.substring(0, maxLen);
    const lastDot = trimmed.lastIndexOf('.');
    if (lastDot > maxLen * 0.5) return trimmed.substring(0, lastDot + 1);
    return trimmed.replace(/\s+\S*$/, '') + '…';
}
