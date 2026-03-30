/**
 * CosmicWeatherWidget — "Cosmic Weather Today" for the Landing Page
 * One-line Thái Ất forecast with compact visual.
 */

import React, { useMemo } from 'react';
import { getCosmicForecast } from '@lich-viet/core/thaiAt';
import { getLunarDate } from '@lich-viet/core/calendar';

const CosmicWeatherWidget: React.FC = () => {
  const forecast = useMemo(() => {
    try {
      const now = new Date();
      const lunar = getLunarDate(now);
      return getCosmicForecast(lunar.year);
    } catch {
      return null;
    }
  }, []);

  if (!forecast) return null;

  const toneColor = forecast.tone === 'optimistic'
    ? 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/15 dark:border-emerald-400/10'
    : forecast.tone === 'cautious'
      ? 'from-blue-500/20 to-blue-600/5 border-blue-500/15 dark:border-blue-400/10'
      : 'from-amber-500/20 to-amber-600/5 border-amber-500/15 dark:border-amber-400/10';

  const toneText = forecast.tone === 'optimistic'
    ? 'text-emerald-600 dark:text-emerald-400'
    : forecast.tone === 'cautious'
      ? 'text-blue-600 dark:text-blue-400'
      : 'text-amber-600 dark:text-amber-400';

  return (
    <div className={`w-full rounded-xl bg-gradient-to-r ${toneColor} border px-4 py-2.5 flex items-center gap-3 backdrop-blur-sm animate-fade-in-up`}>
      <span className="material-icons-round text-base text-purple-500/80 dark:text-purple-400/80 shrink-0">
        public
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary-light/60 dark:text-text-secondary-dark/50">
          Vận Khí Vũ Trụ
        </p>
        <p className="text-xs text-text-primary-light dark:text-text-primary-dark leading-snug truncate">
          <span className={`font-semibold ${toneText}`}>{forecast.canChiYear}</span>
          <span className="mx-1 text-text-secondary-light/30 dark:text-text-secondary-dark/30">·</span>
          <span>{forecast.palaceName}</span>
          <span className="mx-1 text-text-secondary-light/30 dark:text-text-secondary-dark/30">·</span>
          <span className="text-text-secondary-light dark:text-text-secondary-dark">{forecast.hostGuestLabel}</span>
        </p>
      </div>
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${toneText} bg-white/50 dark:bg-white/5 shrink-0`}>
        {forecast.element}
      </span>
    </div>
  );
};

export default CosmicWeatherWidget;
