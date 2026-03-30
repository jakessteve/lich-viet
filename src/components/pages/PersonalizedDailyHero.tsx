/**
 * PersonalizedDailyHero — Premium "Morning Briefing" Card
 *
 * Shows the user their personalized daily energy insight:
 * - Greets by name
 * - Shows Five Elements (Ngũ Hành) energy balance for the day
 * - Generates a personal insight slogan based on dayMaster vs day element
 * - Day grade, suitable/unsuitable activities, auspicious hours
 * - Tier-gated: personalization requires Premium+, generic for Free
 */

import React, { useMemo, Suspense } from 'react';
import { useAppStore } from '../../stores/appStore';
import { useAuthStore } from '../../stores/authStore';
import { useUserTier } from '../../hooks/useUserTier';
import { ContentGate } from '../shared/ContentGate';

const SocialShareCard = React.lazy(() => import('../shared/SocialShareCard'));

// ── Five Element Energy Logic ──────────────────────────────

const ELEMENT_MAP: Record<string, { emoji: string; vi: string; color: string }> = {
  'Kim': { emoji: '🪙', vi: 'Kim', color: 'text-gray-400' },
  'Mộc': { emoji: '🌿', vi: 'Mộc', color: 'text-emerald-500' },
  'Thủy': { emoji: '💧', vi: 'Thủy', color: 'text-blue-500' },
  'Hỏa': { emoji: '🔥', vi: 'Hoả', color: 'text-red-500' },
  'Thổ': { emoji: '🏔️', vi: 'Thổ', color: 'text-amber-600' },
};

// Five Element interaction rules
const ELEMENT_RELATIONS: Record<string, { sinh: string; khac: string; biSinh: string; biKhac: string }> = {
  'Kim': { sinh: 'Thủy', khac: 'Mộc', biSinh: 'Thổ', biKhac: 'Hỏa' },
  'Mộc': { sinh: 'Hỏa', khac: 'Thổ', biSinh: 'Thủy', biKhac: 'Kim' },
  'Thủy': { sinh: 'Mộc', khac: 'Hỏa', biSinh: 'Kim', biKhac: 'Thổ' },
  'Hỏa': { sinh: 'Thổ', khac: 'Kim', biSinh: 'Mộc', biKhac: 'Thủy' },
  'Thổ': { sinh: 'Kim', khac: 'Thủy', biSinh: 'Hỏa', biKhac: 'Mộc' },
};

/** Map Can to its Ngũ Hành element */
function canToElement(can: string): string {
  const map: Record<string, string> = {
    'Giáp': 'Mộc', 'Ất': 'Mộc',
    'Bính': 'Hỏa', 'Đinh': 'Hỏa',
    'Mậu': 'Thổ', 'Kỷ': 'Thổ',
    'Canh': 'Kim', 'Tân': 'Kim',
    'Nhâm': 'Thủy', 'Quý': 'Thủy',
  };
  return map[can] || 'Thổ';
}

interface PersonalInsight {
  slogan: string;
  energyType: 'sinh' | 'khac' | 'biSinh' | 'biKhac' | 'dong';
  advice: string;
}

function getPersonalInsight(dayMasterElement: string, dayElement: string, userName: string): PersonalInsight {
  const name = userName.split(' ').pop() || userName;

  if (dayMasterElement === dayElement) {
    return {
      slogan: `Ngũ Hành cộng hưởng! Hôm nay là ngày của bạn, ${name}. Tự tin hành động.`,
      energyType: 'dong',
      advice: 'Năng lượng hòa hợp — phù hợp mọi hoạt động quan trọng.',
    };
  }

  const relations = ELEMENT_RELATIONS[dayMasterElement];
  if (!relations) return { slogan: `Chào ${name}, hãy sống trọn ngày hôm nay.`, energyType: 'dong', advice: '' };

  if (dayElement === relations.sinh) {
    return {
      slogan: `Năng lượng ${ELEMENT_MAP[dayMasterElement]?.vi} sinh ${ELEMENT_MAP[dayElement]?.vi} — ${name}, bạn đang trao đi và tạo giá trị lớn hôm nay.`,
      energyType: 'sinh',
      advice: 'Ngày tốt để giúp đỡ, đầu tư, khởi tạo. Bạn là nguồn cung năng lượng.',
    };
  }
  if (dayElement === relations.biSinh) {
    return {
      slogan: `${ELEMENT_MAP[dayElement]?.vi} đang nuôi dưỡng bạn, ${name}. Hãy tiếp nhận và sinh trưởng.`,
      energyType: 'biSinh',
      advice: 'Ngày tốt để học hỏi, nghỉ ngơi, hấp thu kiến thức mới.',
    };
  }
  if (dayElement === relations.khac) {
    return {
      slogan: `Ngũ Hành khuyết ${ELEMENT_MAP[dayElement]?.vi}, ${name} hãy giữ cái đầu lạnh hôm nay.`,
      energyType: 'khac',
      advice: 'Tránh quyết định nóng vội. Kiên nhẫn, cân nhắc kỹ trước khi hành động.',
    };
  }
  if (dayElement === relations.biKhac) {
    return {
      slogan: `Hôm nay ${ELEMENT_MAP[dayElement]?.vi} đang thử thách bạn, ${name}. Biến áp lực thành sức mạnh.`,
      energyType: 'biKhac',
      advice: 'Ngày có áp lực — nhưng vượt qua sẽ trưởng thành. Tập trung và bình tĩnh.',
    };
  }

  return { slogan: `Chào ${name}, hãy sống trọn ngày hôm nay.`, energyType: 'dong', advice: '' };
}

// ── Score colors ──────────────────────────────────────────

function getScoreText(dayGrade: string): string {
  switch (dayGrade) {
    case 'Đại Cát': return 'Tuyệt Vời';
    case 'Thứ Cát': return 'Khá Tốt';
    case 'Tiểu Cát': return 'Tạm Ổn';
    case 'Bình Hòa': return 'Bình Thường';
    case 'Tiểu Hung': return 'Kém';
    case 'Đại Hung': return 'Rất Xấu';
    default: return 'Bình Thường';
  }
}

function getScoreGradient(dayGrade: string): string {
  if (dayGrade.includes('Cát')) return 'from-emerald-500 to-teal-600';
  if (dayGrade.includes('Hung')) return 'from-rose-500 to-red-600';
  return 'from-blue-500 to-indigo-600';
}

// ── Component ──────────────────────────────────────────────

export default function PersonalizedDailyHero() {
  const dayData = useAppStore((s) => s.dayData);
  const selectedDate = useAppStore((s) => s.selectedDate);
  const user = useAuthStore((s) => s.user);
  const { hasAccess } = useUserTier();
  const isPremium = hasAccess('premium');

  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat('vi-VN', {
      weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit',
    }).format(selectedDate);
  }, [selectedDate]);

  // Derive personalized insight from user's Day Master element vs today's element
  const personalInsight = useMemo(() => {
    if (!user?.extendedProfile?.baziDayMaster?.element) return null;

    const dayMasterEl = user.extendedProfile.baziDayMaster.element;
    const dayElement = canToElement(dayData.canChi.day.can);
    const displayName = user.displayName || 'bạn';

    return getPersonalInsight(dayMasterEl, dayElement, displayName);
  }, [user, dayData.canChi.day.can]);

  const luckyHours = useMemo(() => {
    return dayData.auspiciousHours.map(h => h.name).join(', ');
  }, [dayData.auspiciousHours]);

  const scoreText = getScoreText(dayData.dayGrade);
  const scoreGradient = getScoreGradient(dayData.dayGrade);

  return (
    <div className="space-y-5 pb-24 lg:pb-8">

      {/* Hero Banner — Personalized Greeting */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${scoreGradient} p-6 sm:p-8 text-white shadow-lg`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative z-10">
          {/* Greeting line */}
          <p className="text-white/70 text-sm font-medium capitalize mb-1">{formattedDate}</p>
          <h1 className="text-2xl sm:text-3xl font-black mb-2">
            {user?.displayName ? `Chào ${user.displayName.split(' ').pop()}` : 'Tổng Quan Hôm Nay'}
          </h1>

          {/* Score badge */}
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-block px-3 py-1 bg-white/20 rounded-xl text-sm font-semibold backdrop-blur-sm">
              {scoreText} · {dayData.dayGrade}
            </div>
          </div>

          {/* Personalized insight slogan — Premium+ only */}
          {isPremium && personalInsight ? (
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 mt-3 border border-white/10">
              <p className="text-base font-semibold leading-relaxed">
                {personalInsight.slogan}
              </p>
              {personalInsight.advice && (
                <p className="text-white/70 text-sm mt-2 leading-relaxed">
                  💡 {personalInsight.advice}
                </p>
              )}
            </div>
          ) : isPremium && !personalInsight ? (
            <p className="text-white/60 text-sm mt-2">
              Nhập ngày giờ sinh trong Hồ Sơ để nhận Bản Tin Cá Nhân hóa mỗi sáng.
            </p>
          ) : null}

          {/* Lunar date + Year */}
          <div className="flex items-center gap-6 mt-5 pt-4 border-t border-white/15 text-sm">
            <div>
              <p className="text-white/50 text-xs">Âm lịch</p>
              <p className="font-semibold">{dayData.lunarDate.day}/{dayData.lunarDate.month}</p>
            </div>
            <div>
              <p className="text-white/50 text-xs">Can Chi ngày</p>
              <p className="font-semibold">{dayData.canChi.day.can} {dayData.canChi.day.chi}</p>
            </div>
            <div>
              <p className="text-white/50 text-xs">Năm</p>
              <p className="font-semibold">{dayData.canChi.year.can} {dayData.canChi.year.chi}</p>
            </div>
            {dayData.fiveElements?.nguHanh && (
              <div className="hidden sm:block">
                <p className="text-white/50 text-xs">Ngũ Hành</p>
                <p className="font-semibold">{dayData.fiveElements.nguHanh}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card-surface p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center">
              <span className="material-icons-round text-lg">check_circle</span>
            </div>
            <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark">Việc Nên Làm</h3>
          </div>
          <ul className="text-sm text-text-secondary-light dark:text-text-secondary-dark space-y-1.5">
            {dayData.dungSu.suitable.slice(0, 4).map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5 shrink-0">•</span> {item}
              </li>
            ))}
            {dayData.dungSu.suitable.length === 0 && <li className="text-text-secondary-light/50 dark:text-text-secondary-dark/50">Không có việc đại cát.</li>}
          </ul>
        </div>

        <div className="card-surface p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center">
              <span className="material-icons-round text-lg">cancel</span>
            </div>
            <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark">Việc Cần Kiêng</h3>
          </div>
          <ul className="text-sm text-text-secondary-light dark:text-text-secondary-dark space-y-1.5">
            {dayData.dungSu.unsuitable.slice(0, 4).map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-rose-500 mt-0.5 shrink-0">•</span> {item}
              </li>
            ))}
            {dayData.dungSu.unsuitable.length === 0 && <li className="text-text-secondary-light/50 dark:text-text-secondary-dark/50">Không có việc đại hung.</li>}
          </ul>
        </div>
      </div>

      {/* Auspicious Hours */}
      <div className="card-surface p-5 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark mb-1">Giờ Hoàng Đạo</h3>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            {luckyHours || 'Không có giờ tốt'}
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center shrink-0">
          <span className="material-icons-round text-2xl">schedule</span>
        </div>
      </div>

      {/* Share Insight Card — Premium with personal insight */}
      {isPremium && personalInsight && (
        <ContentGate requiredTier="premium" sectionTitle="Chia Sẻ Bản Tin" showBlurPreview>
          <Suspense fallback={null}>
            <SocialShareCard
              title="Ngũ Hành Hôm Nay"
              titleEmoji="🔥"
              insight={personalInsight.slogan}
              subtitle={`${dayData.canChi.day.can} ${dayData.canChi.day.chi} · ${dayData.dayGrade}`}
              theme={dayData.dayGrade.includes('Cát') ? 'gold' : dayData.dayGrade.includes('Hung') ? 'rose' : 'blue'}
              fileName={`ngu-hanh-${selectedDate.toISOString().slice(0, 10)}`}
            />
          </Suspense>
        </ContentGate>
      )}

      {/* Five Elements Energy Bar — Premium gated */}
      <ContentGate requiredTier="premium" sectionTitle="Năng Lượng Ngũ Hành Chi Tiết" showBlurPreview>
        <div className="card-surface p-5">
          <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark mb-4 flex items-center gap-2">
            <span className="material-icons-round text-amber-500">auto_awesome</span>
            Ngũ Hành Hôm Nay
          </h3>
          <div className="grid grid-cols-5 gap-2 text-center">
            {(() => {
              const currentDayEl = canToElement(dayData.canChi.day.can);
              const userEl = user?.extendedProfile?.baziDayMaster?.element;
              return Object.entries(ELEMENT_MAP).map(([key, { emoji, vi, color }]) => {
                const isActive = key === currentDayEl;
                const isUserEl = key === userEl;
                return (
                  <div
                    key={key}
                    className={`p-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-gold/10 dark:bg-gold-dark/10 ring-2 ring-gold/30 dark:ring-gold-dark/30'
                        : 'bg-gray-50 dark:bg-gray-800/50'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{emoji}</span>
                    <span className={`text-xs font-bold ${isActive ? 'text-gold dark:text-gold-dark' : color}`}>
                      {vi}
                    </span>
                    {isActive && <span className="block text-[10px] text-gold/60 dark:text-gold-dark/60 mt-0.5">Hôm nay</span>}
                    {isUserEl && <span className="block text-[10px] text-amber-500 mt-0.5">Mệnh bạn</span>}
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </ContentGate>

      {/* CTA for personalization — only for non-Premium users */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800/50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-blue-900 dark:text-blue-100 flex items-center gap-2">
              <span className="material-icons-round text-blue-500">insights</span>
              Bản Tin Cá Nhân Hóa Mỗi Sáng
            </h3>
            <p className="text-sm text-blue-700/80 dark:text-blue-200/80 mt-1 max-w-xl">
              Nâng cấp Premium để nhận phân tích Ngũ Hành riêng, lời khuyên dựa trên Mệnh Chủ Bát Tự, và các nhận định cá nhân.
            </p>
          </div>
          <a
            href="/app/nang-cap"
            className="whitespace-nowrap px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm shadow-blue-600/20"
          >
            Nâng Cấp Ngay
          </a>
        </div>
      )}
    </div>
  );
}
