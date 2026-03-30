import React, { useState } from 'react';
import type { AspectType } from '../../types/westernAstro';
import { getPredictiveInterpretation } from '../../utils/transitInterpreter';
import Icon from '../shared/Icon';

const ASPECT_INFO: Record<AspectType, { color: string, name: string, icon: string, desc: string }> = {
    conjunction: { color: 'text-amber-500', name: 'Trùng Tụ (Conjunction)', icon: '☌', desc: 'Sự hòa quyện năng lượng mạnh mẽ, tập trung.' },
    sextile: { color: 'text-sky-500', name: 'Lục Hợp (Sextile)', icon: '⚹', desc: 'Có cơ hội tốt, hỗ trợ hài hòa nếu nắm bắt.' },
    square: { color: 'text-rose-500', name: 'Vuông Góc (Square)', icon: '□', desc: 'Xung đột, căng thẳng, cần nỗ lực vượt qua.' },
    trine: { color: 'text-emerald-500', name: 'Tam Hợp (Trine)', icon: '△', desc: 'May mắn tự nhiên, dòng chảy thuận lợi, tài năng sẵn có.' },
    opposition: { color: 'text-orange-500', name: 'Đối Góc (Opposition)', icon: '☍', desc: 'Sự đối lập, thu hút lẫn nhau nhưng mâu thuẫn.' },
    quincunx: { color: 'text-gray-400', name: 'Bất Đồng Góc (Quincunx)', icon: '⚻', desc: 'Khó hiểu, cần điều chỉnh liên tục.' },
    semiSextile: { color: 'text-gray-400', name: 'Bán Lục Hợp', icon: '⚺', desc: 'Va chạm nhỏ.' },
    semiSquare: { color: 'text-rose-400', name: 'Bán Vuông Góc', icon: '∠', desc: 'Căng thẳng ngầm.' },
    sesquiquadrate: { color: 'text-rose-400', name: 'Vuông Rưỡi', icon: '⚼', desc: 'Khó chịu, bực bội.' },
    quintile: { color: 'text-purple-400', name: 'Ngũ Hợp', icon: 'Q', desc: 'Sáng tạo.' }
};

interface Props {
    aspect: {
        type: AspectType;
        orb: number;
        transitPlanetId?: string; // Transit 
        natalPlanetId?: string;   // Transit 
        personAPlanetId?: string; // Synastry
        personBPlanetId?: string; // Synastry
        score?: number;           // Synastry
    };
    index: number;
    isSynastry?: boolean;
    predictiveType?: 'transit' | 'progression' | 'solar_arc';
}

export default function TransitAspectInfoRow({ aspect, index, isSynastry = false, predictiveType = 'transit' }: Props) {
    const info = ASPECT_INFO[aspect.type] || ASPECT_INFO.conjunction;
    const [isOpen, setIsOpen] = useState(false);
    
    // Parse bodies
    const body1 = isSynastry ? aspect.personAPlanetId : aspect.transitPlanetId;
    const body2 = isSynastry ? aspect.personBPlanetId : aspect.natalPlanetId;

    const interpretation = (!isSynastry && body1 && body2) 
        ? getPredictiveInterpretation(body1, aspect.type, body2, predictiveType) 
        : info.desc;

    return (
        <div className={`flex flex-col border ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'} border-border-light dark:border-border-dark rounded-lg overflow-hidden transition-all`}>
            {/* Top Row (Always visible) */}
            <div 
                className="p-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    {/* Body 1 */}
                    <div className="flex flex-col items-center min-w-[60px]">
                        <span className="text-xl">🪐</span>
                        <span className="text-[10px] uppercase font-bold text-text-secondary-light dark:text-text-secondary-dark">{body1}</span>
                    </div>

                    {/* Aspect Symbol */}
                    <div className="flex flex-col justify-center items-center px-2">
                        <span className={`text-xl font-bold ${info.color}`}>{info.icon}</span>
                        <span className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark whitespace-nowrap">{info.name.split(' ')[0]} {info.name.split(' ')[1] || ''}</span>
                    </div>

                    {/* Body 2 */}
                    <div className="flex flex-col items-center min-w-[60px]">
                        <span className="text-xl">✨</span>
                        <span className="text-[10px] uppercase font-bold text-text-secondary-light dark:text-text-secondary-dark">{body2}</span>
                    </div>
                </div>

                <div className="flex-1 flex flex-col sm:items-end w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-none border-border-light dark:border-border-dark">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                            Orb: {aspect.orb.toFixed(2)}°
                        </span>
                        <Icon name={isOpen ? 'expand_less' : 'expand_more'} className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" />
                    </div>
                    {isSynastry && aspect.score !== undefined && (
                        <span className={`text-xs font-bold ${aspect.score > 0 ? 'text-green-500' : aspect.score < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                            Điểm: {aspect.score > 0 ? '+' : ''}{aspect.score.toFixed(1)}
                        </span>
                    )}
                </div>
            </div>

            {/* Interpretation Expand (Hidden if not isOpen) */}
            {isOpen && (
                <div className="p-3 pt-0 border-t border-border-light dark:border-border-dark bg-indigo-50/30 dark:bg-indigo-900/10 mt-2">
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed animate-fade-in">
                        {/* We use dangerouslySetInnerHTML slightly safely here if we parse markdown or just a regex */}
                        {interpretation.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="text-text-primary-light dark:text-text-primary-dark">{part}</strong> : part)}
                    </p>
                </div>
            )}
        </div>
    );
}
