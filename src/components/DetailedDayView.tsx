import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DayDetailsData } from '../types/calendar';
import { renderWithItalics, formatNapAm, formatXungHop, getStatusLabel, renderStatusParts } from '../utils/formatHelpers';
import CollapsibleCard from './CollapsibleCard';
import { useAuthStore } from '../stores/authStore';
import { calculatePersonalDayScore } from '../services/personalization/personalDayScore';
import { getPersonalDungSu } from '../services/personalization/personalDungSu';
import { useUserTier } from '../hooks/useUserTier';
import { calculatePersonalHourModifier } from '../services/personalization/personalHourScore';

interface DetailedDayViewProps {
  date: Date;
  data: DayDetailsData;
}

const DetailedDayView: React.FC<DetailedDayViewProps> = ({ date, data }) => {
  const [sortByScore, setSortByScore] = useState(false);
  const [showPersonalized, setShowPersonalized] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore(s => s.user);
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const { hasAccess, getContentDepth } = useUserTier();
  const isPremium = hasAccess('premium');
  const isElite = hasAccess('elite');
  const contentDepth = getContentDepth(); // 'summary' | 'standard' | 'full'

  const computedProfile = useMemo(() => {
    if (user?.profile?.birthYear) return user.profile;
    if (user?.birthday) {
      const [year, month, day] = user.birthday.split('-').map(Number);
      if (!isNaN(year)) {
        return { ...user?.profile, birthYear: year, birthMonth: month, birthDay: day };
      }
    }
    return undefined;
  }, [user]);

  const personalizedHours = useMemo(() => {
    return data.allHours.map(h => {
      if (!isElite || !computedProfile) return { ...h, finalScore: h.score, isPersonalized: false, personalData: null };
      
      const modifier = calculatePersonalHourModifier(computedProfile, h.canChi, data.canChi.day, date);
      if (!modifier) return { ...h, finalScore: h.score, isPersonalized: false, personalData: null };

      // Make sure the total score stays within [0, 100] framework
      const finalScore = Math.max(0, Math.min(100, h.score + modifier.totalModifier));
      return { 
        ...h, 
        finalScore, 
        isPersonalized: true, 
        personalData: modifier 
      };
    });
  }, [data.allHours, data.canChi.day, isPremium, computedProfile, date]);

  const personalScore = useMemo(() => {
    if (!computedProfile?.birthYear) return null;
    return calculatePersonalDayScore(computedProfile, data.canChi.day.chi);
  }, [computedProfile, data.canChi.day.chi]);

  const personalDungSu = useMemo(() => {
    if (!user || !computedProfile) return null;
    return getPersonalDungSu(computedProfile, user.extendedProfile, data.canChi.day.chi, data.dungSu.suitable);
  }, [user, computedProfile, data.canChi.day.chi, data.dungSu.suitable]);

  const sortedHours = useMemo(() => {
    if (!sortByScore) return personalizedHours;
    return [...personalizedHours].sort((a, b) => b.finalScore - a.finalScore);
  }, [personalizedHours, sortByScore]);

  // Identify top 3 best hours for visual highlighting
  const topHourIndices = useMemo(() => {
    const sorted = [...personalizedHours].map((h, i) => ({ score: h.finalScore, idx: i })).sort((a, b) => b.score - a.score);
    return new Set(sorted.slice(0, 3).map(h => h.idx));
  }, [personalizedHours]);

  const solarDateStr = date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric' });
  const _lunarDateStr = `${data.lunarDate.day}/${data.lunarDate.month}/${data.lunarDate.year}`;
  const dayOfWeekAbbr = data.dayOfWeek === 'Chủ Nhật' ? 'CN' : `T${date.getDay() + 1}`;

  // Helper to deduplicate and clean bracket descriptions 
  const formatDungSu = (items: string[], focusWord: string) => {
    if (!items || items.length === 0) return { focus: false, rest: [] };
    const cleanedItems = items.map(item => item.split(' (')[0].trim());
    const uniqueItems = Array.from(new Set(cleanedItems));
    const hasFocus = uniqueItems.includes(focusWord);
    const rest = uniqueItems.filter(item => item !== focusWord);
    return { focus: hasFocus, rest };
  };

  const formattedNghi = useMemo(() => formatDungSu(data.dungSu.suitable, 'Tốt mọi việc'), [data.dungSu.suitable]);
  const formattedKy = useMemo(() => formatDungSu(data.dungSu.unsuitable, 'Xấu mọi việc'), [data.dungSu.unsuitable]);

  return (
    <div className="w-full space-y-4 animate-in fade-in duration-500" data-testid="detailed-day-view">

      {/* At-a-glance summary (A5) */}
      <div id="tour-day-summary" className="rounded-2xl bg-gradient-to-r from-gold/5 via-amber-50/50 to-gold/5 dark:from-gold-dark/5 dark:via-amber-900/10 dark:to-gold-dark/5 border border-gold/15 dark:border-gold-dark/15 px-5 py-4">
        <div className="flex items-start gap-3">
          <span className="material-icons-round text-gold dark:text-gold-dark text-xl mt-0.5">auto_awesome</span>
          <div className="text-sm leading-relaxed text-text-primary-light dark:text-text-primary-dark">
            <span className="font-bold">{dayOfWeekAbbr}, {solarDateStr}</span>
            <span className="text-text-secondary-light dark:text-text-secondary-dark"> — </span>
            {formattedNghi.focus
              ? <span className="text-good dark:text-good-dark font-semibold">Ngày tốt mọi việc. </span>
              : formattedNghi.rest.length > 0
                ? <span>Tốt cho <span className="font-medium">{formattedNghi.rest.slice(0, 3).join(', ')}</span>. </span>
                : <span>Không có việc nghi đặc biệt. </span>
            }
            {formattedKy.focus
              ? <span className="text-bad dark:text-bad-dark font-semibold">Kỵ làm mọi việc.</span>
              : formattedKy.rest.length > 0
                ? <span>Kỵ <span className="font-medium">{formattedKy.rest.slice(0, 2).join(', ')}</span>.</span>
                : <span>Không có việc kỵ đặc biệt.</span>
            }
          </div>
        </div>
      </div>

      {/* Personal Action Score (Ngày theo tuổi bạn) */}
      {personalScore && (
        <CollapsibleCard title={`Cát/Hung theo tuổi ${computedProfile?.birthYear || ''}`} defaultOpen={true}>
          <div className="p-4 sm:p-6 space-y-4">
            <div className={`p-4 rounded-xl border ${personalScore.actionScore >= 3 ? 'bg-indigo-50/50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800' : personalScore.actionScore < 0 ? 'bg-orange-50/50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800' : 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800'}`}>
              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl text-lg font-bold shadow-sm shrink-0 ${personalScore.actionScore >= 3 ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' : personalScore.actionScore < 0 ? 'bg-gradient-to-br from-orange-400 to-red-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}>
                  {personalScore.actionScore > 0 ? `+${personalScore.actionScore}` : personalScore.actionScore}
                </div>
                <div className="min-w-0">
                  <h3 className={`text-base font-semibold ${personalScore.actionScore >= 3 ? 'text-indigo-700 dark:text-indigo-400' : personalScore.actionScore < 0 ? 'text-red-600 dark:text-red-400' : 'text-text-primary-light dark:text-text-primary-dark'}`}>
                    {personalScore.label}
                  </h3>
                  <p className="text-sm mt-0.5 text-text-secondary-light dark:text-text-secondary-dark">{personalScore.description}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider font-semibold shrink-0">Mức độ tương tác</span>
                {personalScore.isThaiTue && <span className="inline-block px-2 py-0.5 bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300 rounded text-xs font-medium">Thái Tuế</span>}
                {personalScore.isTamHop && <span className="inline-block px-2 py-0.5 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 rounded text-xs font-medium">Tam Hợp</span>}
                {personalScore.isTuongXung && <span className="inline-block px-2 py-0.5 bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 rounded text-xs font-medium">Lục Xung</span>}
                {personalScore.isTuongHai && <span className="inline-block px-2 py-0.5 bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 rounded text-xs font-medium">Lục Hại</span>}
                {personalScore.isLucHop && <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 rounded text-xs font-medium">Lục Hợp</span>}
                {personalScore.isTuongHinh && <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 rounded text-xs font-medium">Tương Hình</span>}
                {personalScore.isTuongPha && <span className="inline-block px-2 py-0.5 bg-slate-200 text-slate-800 dark:bg-slate-800/40 dark:text-slate-300 rounded text-xs font-medium">Tương Phá</span>}
                {!personalScore.isThaiTue && !personalScore.isTamHop && !personalScore.isTuongXung && !personalScore.isTuongHai && !personalScore.isLucHop && !personalScore.isTuongHinh && !personalScore.isTuongPha && <span className="inline-block px-2 py-0.5 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded text-xs font-medium shadow-sm">Bình Hòa</span>}
              </div>
            </div>

              {personalDungSu && (personalDungSu.recommended.length > 0 || personalDungSu.warned.length > 0) && (
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                  <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider font-semibold mb-2">Dụng sự theo tuổi</div>
                  {personalDungSu.voidDayWarning && (
                    <div className="mb-2 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">
                      {personalDungSu.voidDayWarning}
                    </div>
                  )}
                  <div className="space-y-2">
                    {personalDungSu.recommended.length > 0 && (
                      <div>
                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Rất Hợp: </span>
                        {personalDungSu.recommended.map((act, i) => (
                          <span key={i} className="inline-block px-2 py-0.5 text-xs font-medium rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 mr-1 mb-1">{act.name}</span>
                        ))}
                      </div>
                    )}
                    {personalDungSu.warned.length > 0 && (
                      <div>
                        <span className="text-xs font-medium text-orange-600 dark:text-orange-400">Cần Tránh: </span>
                        {personalDungSu.warned.map((act, i) => (
                          <span key={i} className="inline-block px-2 py-0.5 text-xs font-medium rounded bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 mr-1 mb-1" title={act.reason}>{act.name}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
          </div>
        </CollapsibleCard>
      )}

      {/* Chi tiết ngày âm — Collapsible */}
      <CollapsibleCard title="Chi tiết ngày âm" defaultOpen={true} collapseOnMobile={true}>
        <div className="divide-y divide-border-light dark:divide-border-dark text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="text-text-secondary-light dark:text-text-secondary-dark font-medium sm:col-span-1 tracking-wide">Ngũ hành</div>
            <div className="sm:col-span-3 text-text-primary-light dark:text-text-primary-dark mt-1 sm:mt-0 leading-relaxed">{data.nguHanhInteraction || 'N/A'}</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="text-text-secondary-light dark:text-text-secondary-dark font-medium sm:col-span-1 tracking-wide">Nạp âm</div>
            <div className="sm:col-span-3 text-text-primary-light dark:text-text-primary-dark mt-1 sm:mt-0 leading-relaxed">
              {formatNapAm(data.napAmInteraction || '')}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="text-text-secondary-light dark:text-text-secondary-dark font-medium sm:col-span-1 tracking-wide">Xung hợp</div>
            <div className="sm:col-span-3 text-text-primary-light dark:text-text-primary-dark mt-1 sm:mt-0 leading-relaxed">
              {formatXungHop(data.canChiXungHop || '')}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="text-text-secondary-light dark:text-text-secondary-dark font-medium sm:col-span-1 tracking-wide">Trực/Tú</div>
            <div className="sm:col-span-3 text-text-primary-light dark:text-text-primary-dark mt-1 sm:mt-0 leading-relaxed space-y-1.5">
              <p>Trực {data.modifyingLayer.trucDetail.name}: {data.modifyingLayer.trucDetail.description}</p>
              <p>Sao {data.modifyingLayer.tuDetail.name}: {data.modifyingLayer.tuDetail.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="text-text-secondary-light dark:text-text-secondary-dark font-medium sm:col-span-1 tracking-wide">Cát thần</div>
            <div className="sm:col-span-3 text-text-primary-light dark:text-text-primary-dark mt-1 sm:mt-0 leading-relaxed">{data.goodStars.join(', ') || 'Không có'}</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="text-text-secondary-light dark:text-text-secondary-dark font-medium sm:col-span-1 tracking-wide">Nghi</div>
            <div className="sm:col-span-3 mt-1 sm:mt-0 leading-relaxed">
              {(formattedNghi.focus || formattedNghi.rest.length > 0) ? (
                <div className="flex flex-wrap gap-1.5">
                  {formattedNghi.focus && <span className="inline-block px-2 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">Tốt mọi việc</span>}
                  {formattedNghi.rest.map((item, i) => (
                    <span key={i} className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">{item}</span>
                  ))}
                </div>
              ) : <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Không có</span>}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="text-text-secondary-light dark:text-text-secondary-dark font-medium sm:col-span-1 tracking-wide">Hung thần</div>
            <div className="sm:col-span-3 text-text-primary-light dark:text-text-primary-dark mt-1 sm:mt-0 leading-relaxed">{data.badStars.join(', ') || 'Không có'}</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="text-text-secondary-light dark:text-text-secondary-dark font-medium sm:col-span-1 tracking-wide">Kỵ</div>
            <div className="sm:col-span-3 mt-1 sm:mt-0 leading-relaxed">
              {(formattedKy.focus || formattedKy.rest.length > 0) ? (
                <div className="flex flex-wrap gap-1.5">
                  {formattedKy.focus && <span className="inline-block px-2 py-0.5 text-xs font-bold rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400">Xấu mọi việc</span>}
                  {formattedKy.rest.map((item, i) => (
                    <span key={i} className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400">{item}</span>
                  ))}
                </div>
              ) : <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Không có</span>}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="text-text-secondary-light dark:text-text-secondary-dark font-medium sm:col-span-1 tracking-wide">Bành tổ bách kỵ</div>
            <div className="sm:col-span-3 text-text-primary-light dark:text-text-primary-dark mt-1 sm:mt-0 leading-relaxed space-y-1.5">
              {renderWithItalics(data.banhTo.can)}
              {renderWithItalics(data.banhTo.chi)}
            </div>
          </div>
        </div>
      </CollapsibleCard>

      {/* Giờ tốt và xấu trong ngày — Collapsible */}
      <CollapsibleCard
        title="Giờ tốt và xấu trong ngày"

        defaultOpen={true}
        collapseOnMobile={true}
        headerRight={
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                if (!isAuthenticated) {
                  navigate('/app/dang-ky');
                  return;
                }
                if (!isPremium) {
                  alert('Tính năng Cá nhân hoá giờ theo Bát Tự cần tài khoản Premium.');
                  navigate('/app/nang-cap');
                  return;
                }
                if (!computedProfile) {
                  alert('Vui lòng vào Cài đặt để cập nhật Lá số (Giờ/Ngày sinh).');
                  navigate('/app/cai-dat');
                  return;
                }
                setShowPersonalized(!showPersonalized);
              }}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full transition-all border whitespace-nowrap ${showPersonalized ? 'bg-gold text-white border-gold dark:bg-gold-dark dark:text-gray-900 dark:border-gold-dark shadow-sm' : 'bg-transparent text-gold border-gold/40 hover:bg-gold/10 dark:text-gold-dark dark:border-gold-dark/40 dark:hover:bg-gold-dark/10'}`}
            >
              <span className="material-icons-round text-sm">auto_awesome</span>
              Cá nhân hoá
            </button>
            <button
              onClick={() => setSortByScore(prev => !prev)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 dark:bg-white/10 text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-200 dark:hover:bg-white/15 transition-colors"
            >
              <span className="material-icons-round text-sm">{sortByScore ? 'schedule' : 'trending_up'}</span>
              {sortByScore ? 'Theo giờ' : 'Giờ tốt trước'}
            </button>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs sm:text-xs font-semibold text-text-secondary-light/80 dark:text-text-secondary-dark/80 uppercase bg-surface-subtle-light dark:bg-surface-subtle-dark tracking-wider">
              <tr>
                <th className="hidden sm:table-cell px-6 py-3 w-20" scope="col">Giờ</th>
                <th className="px-2 sm:px-6 py-3 w-[70px] sm:w-28 text-center" scope="col">Can Chi</th>
                <th className="px-3 sm:px-6 py-3" scope="col">Chi tiết</th>
                <th className="px-2 sm:px-6 py-3 text-right w-[60px] sm:w-24 align-middle" scope="col">
                  {contentDepth === 'summary' ? 'CHẤT' : 'ĐIỂM'}{isPremium && <span className="text-[10px] sm:text-xs font-normal text-text-secondary-light/80 dark:text-text-secondary-dark/80 lowercase">*</span>}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light dark:divide-border-dark">
              {sortedHours.map((h, idx) => {
                const advanced = h.advancedInfo || [];
                const statusIndex = advanced.findIndex(s => s.startsWith('Trạng thái:'));
                let statusInfo = '';
                if (statusIndex !== -1) {
                  statusInfo = advanced[statusIndex].replace('Trạng thái:', '').trim();
                }

                const statusLabel = getStatusLabel(statusInfo);
                const statusColorClass = statusLabel === 'HOÀNG ĐẠO'
                  ? 'text-good dark:text-good-dark'
                  : 'text-text-primary-light dark:text-text-primary-dark';

                // We need to find the original index in `data.allHours`
                const originalIndex = data.allHours.findIndex(orig => orig.timeRange === h.timeRange);
                const isTop3 = topHourIndices.has(originalIndex);
                
                const currentScore = showPersonalized ? h.finalScore : h.score;
                const isWeak = currentScore < 40;
                const isAuspiciousCurrent = currentScore >= 60;

                return (
                  <tr key={idx} className={`transition-colors ${
                    isTop3
                      ? 'bg-gold/5 dark:bg-gold-dark/5 border-l-2 border-l-gold dark:border-l-gold-dark hover:bg-gold/10 dark:hover:bg-gold-dark/10'
                      : isWeak
                        ? 'opacity-60 hover:opacity-100 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                        : isAuspiciousCurrent
                          ? 'bg-blue-50/20 dark:bg-blue-900/10 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}>
                    <td className="hidden sm:table-cell px-6 py-4 font-medium whitespace-nowrap align-top">
                      {h.timeRange.replace(/:00/g, '').replace(' - ', '–')}
                    </td>
                    <td className="px-2 sm:px-6 py-3 sm:py-4 text-center align-top">
                      <div className="sm:hidden">
                        <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">
                          {h.timeRange.replace(/:00/g, '').replace(' - ', '–')}
                        </div>
                        <div className={`font-bold text-sm mt-0.5 ${h.isAuspicious ? 'text-good dark:text-good-dark' : 'text-text-primary-light dark:text-text-primary-dark'}`}>
                          {h.canChi.can} {h.canChi.chi}
                        </div>
                        <div className={`text-xs mt-0.5 tracking-tight leading-tight font-semibold ${statusColorClass}`}>
                          {statusLabel}
                        </div>
                      </div>
                      <div className="hidden sm:block">
                        <div className={`font-bold text-base ${h.isAuspicious ? 'text-good dark:text-good-dark' : 'text-text-primary-light dark:text-text-primary-dark'}`}>
                          {h.canChi.can} {h.canChi.chi}
                        </div>
                        <div className="text-xs mt-1 tracking-tight leading-tight">
                          {renderStatusParts(statusInfo)}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-text-primary-light dark:text-text-primary-dark space-y-1.5 align-top">
                      <div className="leading-relaxed">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 mr-1">Nghi:</span>
                        <span>{h.nghi && h.nghi.length > 0 ? h.nghi.join(', ') : 'không có việc gì tốt'}</span>
                      </div>
                      <div className="leading-relaxed">
                        <span className="font-bold text-crimson-600 dark:text-crimson-400 mr-1">Kỵ:</span>
                        <span>{h.ky && h.ky.length > 0 ? h.ky.join(', ') : 'không có việc gì kỵ đặc biệt'}</span>
                      </div>
                      {showPersonalized && h.isPersonalized && h.personalData && h.personalData.flags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1 animate-in fade-in zoom-in-95 duration-200">
                          {h.personalData.flags.includes('quy_nhan') && <span className="inline-block px-1.5 py-0.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 rounded text-[10px] font-medium" title="Giờ Thiên Ất Quý Nhân">Quý Nhân</span>}
                          {h.personalData.flags.includes('loc_than') && <span className="inline-block px-1.5 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 rounded text-[10px] font-medium" title="Giờ Lộc Thần">Lộc Thần</span>}
                          {h.personalData.flags.includes('dich_ma') && <span className="inline-block px-1.5 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 rounded text-[10px] font-medium" title="Giờ Dịch Mã">Dịch Mã</span>}
                          {h.personalData.flags.includes('hop_nhat_chu') && <span className="inline-block px-1.5 py-0.5 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 rounded text-[10px] font-medium">Hợp Nhật Chủ</span>}
                          {h.personalData.flags.includes('hop_thai_tue') && <span className="inline-block px-1.5 py-0.5 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 rounded text-[10px] font-medium">Hợp Thái Tuế</span>}
                          {h.personalData.flags.includes('qmdj_cat') && <span className="inline-block px-1.5 py-0.5 bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 rounded text-[10px] font-medium">QMDJ Tốt</span>}
                          
                          {(h.personalData.flags.includes('xung_nhat_chu') || h.personalData.flags.includes('thien_khac_dia_xung')) && <span className="inline-block px-1.5 py-0.5 bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 rounded text-[10px] font-medium">Xung Bản Mệnh</span>}
                          {h.personalData.flags.includes('xung_thai_tue') && <span className="inline-block px-1.5 py-0.5 bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300 rounded text-[10px] font-medium">Xung Thái Tuế</span>}
                          {h.personalData.flags.includes('qmdj_hung') && <span className="inline-block px-1.5 py-0.5 bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 rounded text-[10px] font-medium">QMDJ Xấu</span>}
                        </div>
                      )}
                    </td>
                    <td className={`px-2 sm:px-6 py-3 sm:py-4 text-right font-bold text-sm align-top flex flex-col items-end space-y-0.5 ${isAuspiciousCurrent ? 'text-good dark:text-good-dark' : 'text-text-primary-light dark:text-text-primary-dark'}`}>
                      {contentDepth === 'summary' ? (
                        // Free/guest: only show Tốt / Xấu label
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${currentScore >= 60 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : currentScore < 40 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-400'}`}>
                          {currentScore >= 60 ? 'Tốt ✅' : currentScore < 40 ? 'Xấu ❌' : 'Bình ➖'}
                        </span>
                      ) : (
                        // Premium/Elite: show numeric score
                        <>
                          <div>{currentScore}%</div>
                          {isElite && showPersonalized && h.isPersonalized && h.personalData && h.personalData.totalModifier !== 0 && (
                            <div className={`flex items-center text-[10px] font-medium px-1 rounded-sm animate-in fade-in zoom-in-95 duration-200 ${h.personalData.totalModifier > 0 ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`} title={h.personalData.breakdowns.join('\n')}>
                              {h.personalData.totalModifier > 0 ? '+' : ''}{h.personalData.totalModifier}
                            </div>
                          )}
                        </>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CollapsibleCard>
    </div>
  );
};

export default React.memo(DetailedDayView);
