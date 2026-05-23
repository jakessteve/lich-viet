import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DayDetailsData } from '../types/calendar';
import {
  renderWithItalics,
  formatNapAm,
  formatXungHop,
  getStatusLabel,
  renderStatusParts,
} from '../utils/formatHelpers';
import { useAuthStore } from '../stores/authStore';
import {
  calculatePersonalDayScore,
  calculatePersonalHourModifier,
  getPersonalDungSu,
} from '../services/personalization';
import CollapsibleCard from './CollapsibleCard';

interface DetailedDayViewProps {
  date: Date;
  data: DayDetailsData;
}

const DetailedDayView: React.FC<DetailedDayViewProps> = ({ date, data }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [sortByScore, setSortByScore] = useState(false);
  const [showPersonalized, setShowPersonalized] = useState(false);

  // Derive birth details from user profile or birthday string
  const computedProfile = useMemo(() => {
    if (!user) return null;
    if (user.profile?.birthYear) {
      return {
        birthYear: user.profile.birthYear,
        birthMonth: user.profile.birthMonth,
        birthDay: user.profile.birthDay,
      };
    }
    if (user.birthday) {
      const parts = user.birthday.split('-').map(Number);
      if (parts.length === 3) {
        return { birthYear: parts[0], birthMonth: parts[1], birthDay: parts[2] };
      }
    }
    return null;
  }, [user]);

  const hasBirthday = !!computedProfile?.birthYear;

  // Personal day score
  const personalScore = useMemo(() => {
    if (!computedProfile?.birthYear || !data.canChi?.day?.chi) return null;
    return calculatePersonalDayScore(computedProfile.birthYear, data.canChi.day.chi);
  }, [computedProfile, data.canChi.day.chi]);

  // Personalized hours with modifier overlay
  const personalizedHours = useMemo(() => {
    if (!showPersonalized || !computedProfile?.birthYear) return data.allHours;
    return data.allHours.map((h) => {
      const hour = { ...h, advancedInfo: [...(h.advancedInfo || [])] };
      const modifier = calculatePersonalHourModifier(
        computedProfile.birthYear,
        computedProfile.birthMonth,
        computedProfile.birthDay,
        h.canChi,
        data.canChi.day,
        date,
      );
      if (modifier) {
        hour.score = Math.min(100, Math.max(0, hour.score + modifier.totalModifier));
        modifier.breakdowns.forEach((b) => {
          if (!hour.advancedInfo!.some((info) => info.includes(b))) {
            hour.advancedInfo!.push(`Cá nhân: ${b}`);
          }
        });
      }
      return hour;
    });
  }, [data.allHours, data.canChi.day, date, showPersonalized, computedProfile]);

  // Personalized Dụng Sự
  const personalDungSu = useMemo(() => {
    if (!computedProfile?.birthYear || !data.canChi?.day?.chi || !data.dungSu?.suitable) return null;
    return getPersonalDungSu(computedProfile.birthYear, data.canChi.day.chi, data.dungSu.suitable);
  }, [computedProfile, data.canChi.day.chi, data.dungSu.suitable]);

  const sortedHours = useMemo(() => {
    if (!sortByScore) return personalizedHours;
    return [...personalizedHours].sort((a, b) => b.score - a.score);
  }, [personalizedHours, sortByScore]);

  // Identify top 3 best hours for visual highlighting
  const topHourIndices = useMemo(() => {
    const sorted = [...personalizedHours].map((h, i) => ({ score: h.score, idx: i })).sort((a, b) => b.score - a.score);
    return new Set(sorted.slice(0, 3).map((h) => h.idx));
  }, [personalizedHours]);

  const solarDateStr = date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric' });
  const _lunarDateStr = `${data.lunarDate.day}/${data.lunarDate.month}/${data.lunarDate.year}`;
  const dayOfWeekAbbr = data.dayOfWeek === 'Chủ Nhật' ? 'CN' : `T${date.getDay() + 1}`;

  // Helper to deduplicate and clean bracket descriptions
  const formatDungSu = (items: string[], focusWord: string) => {
    if (!items || items.length === 0) return { focus: false, rest: [] };
    const cleanedItems = items.map((item) => item.split(' (')[0].trim());
    const uniqueItems = Array.from(new Set(cleanedItems));
    const hasFocus = uniqueItems.includes(focusWord);
    const rest = uniqueItems.filter((item) => item !== focusWord);
    return { focus: hasFocus, rest };
  };

  const formattedNghi = useMemo(() => formatDungSu(data.dungSu.suitable, 'Tốt mọi việc'), [data.dungSu.suitable]);
  const formattedKy = useMemo(() => formatDungSu(data.dungSu.unsuitable, 'Xấu mọi việc'), [data.dungSu.unsuitable]);

  const handlePersonalizeClick = () => {
    if (!isAuthenticated) {
      navigate('/app/dang-ky');
      return;
    }
    if (!hasBirthday) {
      navigate('/app/cai-dat');
      return;
    }
    setShowPersonalized((prev) => !prev);
  };

  return (
    <div className="w-full space-y-4 animate-fade-scale" data-testid="detailed-day-view">
      {/* At-a-glance summary (A5) */}
      <div
        id="tour-day-summary"
        className="rounded-2xl bg-gradient-to-r from-gold/5 via-amber-50/50 to-gold/5 dark:from-gold-dark/5 dark:via-amber-900/10 dark:to-gold-dark/5 border border-gold/15 dark:border-gold-dark/15 px-5 py-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
          <span className="material-icons-round text-gold dark:text-gold-dark text-xl mt-0.5">auto_awesome</span>
          <div className="text-sm leading-relaxed text-text-primary-light dark:text-text-primary-dark flex-1">
            <span className="font-bold">
              {dayOfWeekAbbr}, {solarDateStr}
            </span>
            <span className="text-text-secondary-light dark:text-text-secondary-dark"> — </span>
            {formattedNghi.focus ? (
              <span className="text-good dark:text-good-dark font-semibold">Ngày tốt mọi việc. </span>
            ) : formattedNghi.rest.length > 0 ? (
              <span>
                Tốt cho <span className="font-medium">{formattedNghi.rest.slice(0, 3).join(', ')}</span>.{' '}
              </span>
            ) : (
              <span>Không có việc nghi đặc biệt. </span>
            )}
            {formattedKy.focus ? (
              <span className="text-bad dark:text-bad-dark font-semibold">Kỵ làm mọi việc.</span>
            ) : formattedKy.rest.length > 0 ? (
              <span>
                Kỵ <span className="font-medium">{formattedKy.rest.slice(0, 2).join(', ')}</span>.
              </span>
            ) : (
              <span>Không có việc kỵ đặc biệt.</span>
            )}
          </div>
          <button
            onClick={handlePersonalizeClick}
            className={`flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full transition-colors shrink-0 w-full sm:w-auto ${
              showPersonalized
                ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300'
                : 'bg-gray-100 dark:bg-white/10 text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-200 dark:hover:bg-white/15'
            }`}
            title={
              !isAuthenticated
                ? 'Đăng nhập để cá nhân hoá'
                : !hasBirthday
                  ? 'Cập nhật ngày sinh để cá nhân hoá'
                  : showPersonalized
                    ? 'Tắt cá nhân hoá'
                    : 'Cá nhân hoá theo tuổi'
            }
          >
            <span className="material-icons-round text-sm">{showPersonalized ? 'person_off' : 'person'}</span>
            {showPersonalized ? 'Tắt CNH' : 'Cá nhân hoá'}
          </button>
        </div>
      </div>

      {/* Personal Score Card */}
      {showPersonalized && personalScore && (
        <div
          className={`rounded-2xl border px-5 py-4 ${
            personalScore.actionScore >= 3
              ? 'bg-purple-50/50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-800'
              : personalScore.actionScore < 0
                ? 'bg-orange-50/50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800'
                : 'bg-gray-50/50 dark:bg-gray-800/20 border-gray-200 dark:border-gray-700'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
            <span
              className={`material-icons-round text-xl mt-0.5 ${
                personalScore.actionScore >= 3
                  ? 'text-purple-600 dark:text-purple-400'
                  : personalScore.actionScore < 0
                    ? 'text-orange-600 dark:text-orange-400'
                    : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {personalScore.actionScore >= 3
                ? 'sentiment_very_satisfied'
                : personalScore.actionScore < 0
                  ? 'sentiment_very_dissatisfied'
                  : 'sentiment_neutral'}
            </span>
            <div className="text-sm leading-relaxed">
              <div className="font-bold text-text-primary-light dark:text-text-primary-dark">
                Điểm cá nhân hoá:{' '}
                <span
                  className={
                    personalScore.actionScore >= 3
                      ? 'text-purple-700 dark:text-purple-300'
                      : personalScore.actionScore < 0
                        ? 'text-orange-700 dark:text-orange-300'
                        : 'text-text-primary-light dark:text-text-primary-dark'
                  }
                >
                  {personalScore.label}
                </span>
              </div>
              <div className="text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
                {personalScore.description}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {personalScore.isTamHop && (
                  <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                    Tam Hợp
                  </span>
                )}
                {personalScore.isLucHop && (
                  <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                    Lục Hợp
                  </span>
                )}
                {personalScore.isThaiTue && (
                  <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                    Trị Thái Tuế
                  </span>
                )}
                {personalScore.isTuongXung && (
                  <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
                    Lục Xung
                  </span>
                )}
                {personalScore.isTuongHai && (
                  <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
                    Lục Hại
                  </span>
                )}
                {personalScore.isTuongHinh && (
                  <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">
                    Tương Hình
                  </span>
                )}
                {personalScore.isTuongPha && (
                  <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">
                    Tương Phá
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Personalized Dụng Sự */}
      {showPersonalized && personalDungSu && (
        <CollapsibleCard title="Dụng sự theo tuổi" defaultOpen={true} collapseOnMobile={true}>
          <div className="divide-y divide-border-light dark:divide-border-dark text-sm px-4 sm:px-6 py-3">
            {personalDungSu.recommended.length > 0 && (
              <div className="py-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1.5">
                  Nên làm
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {personalDungSu.recommended.map((act, i) => (
                    <span
                      key={i}
                      className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
                      title={act.reason}
                    >
                      {act.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {personalDungSu.regular.length > 0 && (
              <div className="py-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark mb-1.5">
                  Bình thường
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {personalDungSu.regular.map((act, i) => (
                    <span
                      key={i}
                      className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {act.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {personalDungSu.warned.length > 0 && (
              <div className="py-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-1.5">
                  Cẩn thận
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {personalDungSu.warned.map((act, i) => (
                    <span
                      key={i}
                      className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300"
                      title={act.reason}
                    >
                      {act.name}
                    </span>
                  ))}
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
            <div className="text-text-secondary-light dark:text-text-secondary-dark font-medium sm:col-span-1 tracking-wide">
              Ngũ hành
            </div>
            <div className="sm:col-span-3 text-text-primary-light dark:text-text-primary-dark mt-1 sm:mt-0 leading-relaxed">
              {data.nguHanhInteraction || 'N/A'}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="text-text-secondary-light dark:text-text-secondary-dark font-medium sm:col-span-1 tracking-wide">
              Nạp âm
            </div>
            <div className="sm:col-span-3 text-text-primary-light dark:text-text-primary-dark mt-1 sm:mt-0 leading-relaxed">
              {formatNapAm(data.napAmInteraction || '')}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="text-text-secondary-light dark:text-text-secondary-dark font-medium sm:col-span-1 tracking-wide">
              Xung hợp
            </div>
            <div className="sm:col-span-3 text-text-primary-light dark:text-text-primary-dark mt-1 sm:mt-0 leading-relaxed">
              {formatXungHop(data.canChiXungHop || '')}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="text-text-secondary-light dark:text-text-secondary-dark font-medium sm:col-span-1 tracking-wide">
              Trực/Tú
            </div>
            <div className="sm:col-span-3 text-text-primary-light dark:text-text-primary-dark mt-1 sm:mt-0 leading-relaxed space-y-1.5">
              <p>
                Trực {data.modifyingLayer.trucDetail.name}: {data.modifyingLayer.trucDetail.description}
              </p>
              <p>
                Sao {data.modifyingLayer.tuDetail.name}: {data.modifyingLayer.tuDetail.description}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="text-text-secondary-light dark:text-text-secondary-dark font-medium sm:col-span-1 tracking-wide">
              Cát thần
            </div>
            <div className="sm:col-span-3 text-text-primary-light dark:text-text-primary-dark mt-1 sm:mt-0 leading-relaxed">
              {data.goodStars.join(', ') || 'Không có'}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="text-text-secondary-light dark:text-text-secondary-dark font-medium sm:col-span-1 tracking-wide">
              Nghi
            </div>
            <div className="sm:col-span-3 mt-1 sm:mt-0 leading-relaxed">
              {formattedNghi.focus || formattedNghi.rest.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {formattedNghi.focus && (
                    <span className="inline-block px-2 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                      Tốt mọi việc
                    </span>
                  )}
                  {formattedNghi.rest.map((item, i) => (
                    <span
                      key={i}
                      className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Không có</span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="text-text-secondary-light dark:text-text-secondary-dark font-medium sm:col-span-1 tracking-wide">
              Hung thần
            </div>
            <div className="sm:col-span-3 text-text-primary-light dark:text-text-primary-dark mt-1 sm:mt-0 leading-relaxed">
              {data.badStars.join(', ') || 'Không có'}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="text-text-secondary-light dark:text-text-secondary-dark font-medium sm:col-span-1 tracking-wide">
              Kỵ
            </div>
            <div className="sm:col-span-3 mt-1 sm:mt-0 leading-relaxed">
              {formattedKy.focus || formattedKy.rest.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {formattedKy.focus && (
                    <span className="inline-block px-2 py-0.5 text-xs font-bold rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400">
                      Xấu mọi việc
                    </span>
                  )}
                  {formattedKy.rest.map((item, i) => (
                    <span
                      key={i}
                      className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Không có</span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="text-text-secondary-light dark:text-text-secondary-dark font-medium sm:col-span-1 tracking-wide">
              Bành tổ bách kỵ
            </div>
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
          <button
            onClick={() => setSortByScore((prev) => !prev)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 dark:bg-white/10 text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-200 dark:hover:bg-white/15 transition-colors"
          >
            <span className="material-icons-round text-sm">{sortByScore ? 'schedule' : 'trending_up'}</span>
            {sortByScore ? 'Theo giờ' : 'Giờ tốt trước'}
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs sm:text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase bg-surface-subtle-light dark:bg-surface-subtle-dark tracking-wider">
              <tr>
                <th className="hidden sm:table-cell px-6 py-3 w-20" scope="col">
                  Giờ
                </th>
                <th className="px-2 sm:px-6 py-3 w-[70px] sm:w-28 text-center" scope="col">
                  Can Chi
                </th>
                <th className="px-3 sm:px-6 py-3" scope="col">
                  Chi tiết
                </th>
                <th className="px-2 sm:px-6 py-3 text-right w-[60px] sm:w-24 align-middle" scope="col">
                  ĐIỂM
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light dark:divide-border-dark">
              {sortedHours.map((h, idx) => {
                const advanced = h.advancedInfo || [];
                const statusIndex = advanced.findIndex((s) => s.startsWith('Trạng thái:'));
                let statusInfo = '';
                if (statusIndex !== -1) {
                  statusInfo = advanced[statusIndex].replace('Trạng thái:', '').trim();
                }

                // Find personalized breakdowns
                const personalBreakdowns = advanced.filter((s) => s.startsWith('Cá nhân:'));

                const statusLabel = getStatusLabel(statusInfo);
                const statusColorClass =
                  statusLabel === 'HOÀNG ĐẠO'
                    ? 'text-good dark:text-good-dark'
                    : 'text-text-primary-light dark:text-text-primary-dark';

                // We need to find the original index in `personalizedHours`
                const originalIndex = personalizedHours.findIndex((orig) => orig.timeRange === h.timeRange);
                const isTop3 = topHourIndices.has(originalIndex);

                const currentScore = h.score;
                const isWeak = currentScore < 40;
                const isAuspiciousCurrent = currentScore >= 60;

                return (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isTop3
                        ? 'bg-gold/5 dark:bg-gold-dark/5 border-l-2 border-l-gold dark:border-l-gold-dark hover:bg-gold/10 dark:hover:bg-gold-dark/10'
                        : isWeak
                          ? 'opacity-60 hover:opacity-100 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                          : isAuspiciousCurrent
                            ? 'bg-blue-50/20 dark:bg-blue-900/10 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <td className="hidden sm:table-cell px-6 py-4 font-medium whitespace-nowrap align-top">
                      {h.timeRange.replace(/:00/g, '').replace(' - ', '–')}
                    </td>
                    <td className="px-2 sm:px-6 py-3 sm:py-4 text-center align-top">
                      <div className="sm:hidden">
                        <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">
                          {h.timeRange.replace(/:00/g, '').replace(' - ', '–')}
                        </div>
                        <div
                          className={`font-bold text-sm mt-0.5 ${h.isAuspicious ? 'text-good dark:text-good-dark' : 'text-text-primary-light dark:text-text-primary-dark'}`}
                        >
                          {h.canChi.can} {h.canChi.chi}
                        </div>
                        <div
                          className={`text-xs mt-0.5 tracking-tight leading-tight font-semibold ${statusColorClass}`}
                        >
                          {statusLabel}
                        </div>
                      </div>
                      <div className="hidden sm:block">
                        <div
                          className={`font-bold text-base ${h.isAuspicious ? 'text-good dark:text-good-dark' : 'text-text-primary-light dark:text-text-primary-dark'}`}
                        >
                          {h.canChi.can} {h.canChi.chi}
                        </div>
                        <div className="text-xs mt-1 tracking-tight leading-tight">{renderStatusParts(statusInfo)}</div>
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
                      {showPersonalized && personalBreakdowns.length > 0 && (
                        <div className="space-y-0.5 mt-1">
                          {personalBreakdowns.map((b, i) => (
                            <div key={i} className="text-xs text-purple-600 dark:text-purple-400">
                              {b.replace('Cá nhân:', '').trim()}
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                    <td
                      className={`px-2 sm:px-6 py-3 sm:py-4 text-right font-bold text-sm align-top flex flex-col items-end space-y-0.5 ${isAuspiciousCurrent ? 'text-good dark:text-good-dark' : 'text-text-primary-light dark:text-text-primary-dark'}`}
                    >
                      <div>{currentScore}%</div>
                      {showPersonalized && personalBreakdowns.length > 0 && (
                        <div className="text-xs font-normal text-purple-600 dark:text-purple-400">
                          {personalBreakdowns[0].replace('Cá nhân:', '').trim()}
                        </div>
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
