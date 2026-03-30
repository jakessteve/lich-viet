/**
 * EnergyWidget — Personalized Daily Energy Widget
 *
 * Compact, PWA-optimized widget showing the user's personalized
 * daily energy score with Ngũ Hành indicators. Designed to be:
 * 1. Embedded inline in the main app (as a card)
 * 2. Rendered standalone at /widget for PWA home screen shortcut
 *
 * Features:
 * - Animated SVG energy ring
 * - Five Elements indicator (today's dominant element)
 * - Personalized score based on Day Master vs Day Element
 * - Quick auspicious/inauspicious activity summary
 * - One-tap to open full app
 * - Auto-refresh on date change
 */

import React, { useMemo } from 'react';
import { useAppStore } from '../../stores/appStore';
import { useAuthStore } from '../../stores/authStore';

// ── Element Mapping ──────────────────────────────────────

const ELEMENT_CONFIG: Record<string, { emoji: string; vi: string; gradient: string; glow: string }> = {
  Kim: { emoji: '🥇', vi: 'Kim', gradient: 'from-gray-400 via-gray-300 to-slate-400', glow: 'shadow-gray-400/30' },
  Mộc: { emoji: '🌿', vi: 'Mộc', gradient: 'from-emerald-500 via-green-500 to-teal-500', glow: 'shadow-emerald-500/30' },
  Thủy: { emoji: '💧', vi: 'Thủy', gradient: 'from-blue-500 via-indigo-500 to-cyan-500', glow: 'shadow-blue-500/30' },
  Hỏa: { emoji: '🔥', vi: 'Hỏa', gradient: 'from-red-500 via-orange-500 to-amber-500', glow: 'shadow-red-500/30' },
  Thổ: { emoji: '🏔️', vi: 'Thổ', gradient: 'from-amber-600 via-yellow-600 to-orange-600', glow: 'shadow-amber-600/30' },
};

const CAN_TO_ELEMENT: Record<string, string> = {
  Giáp: 'Mộc', Ất: 'Mộc', Bính: 'Hỏa', Đinh: 'Hỏa',
  Mậu: 'Thổ', Kỷ: 'Thổ', Canh: 'Kim', Tân: 'Kim',
  Nhâm: 'Thủy', Quý: 'Thủy',
};

// Sinh/Khắc interaction score
function getInteractionScore(userEl: string, dayEl: string): { score: number; label: string } {
  const SINH_MAP: Record<string, string> = { Kim: 'Thủy', Thủy: 'Mộc', Mộc: 'Hỏa', Hỏa: 'Thổ', Thổ: 'Kim' };
  const KHAC_MAP: Record<string, string> = { Kim: 'Mộc', Mộc: 'Thổ', Thổ: 'Thủy', Thủy: 'Hỏa', Hỏa: 'Kim' };

  if (userEl === dayEl) return { score: 75, label: 'Bình Hòa' };
  if (SINH_MAP[userEl] === dayEl) return { score: 90, label: 'Tương Sinh' };
  if (SINH_MAP[dayEl] === userEl) return { score: 80, label: 'Được Sinh' };
  if (KHAC_MAP[userEl] === dayEl) return { score: 55, label: 'Tương Khắc' };
  if (KHAC_MAP[dayEl] === userEl) return { score: 40, label: 'Bị Khắc' };
  return { score: 65, label: 'Trung Tính' };
}

// ── Props ──────────────────────────────────────────────────

interface EnergyWidgetProps {
  /** Compact mode for embedding inline */
  compact?: boolean;
  /** Show "Open App" CTA link */
  showCTA?: boolean;
  /** Custom CSS class */
  className?: string;
}

// ── Component ──────────────────────────────────────────────

export default function EnergyWidget({ compact = false, showCTA = false, className = '' }: EnergyWidgetProps) {
  const dayData = useAppStore((s) => s.dayData);
  const selectedDate = useAppStore((s) => s.selectedDate);
  const user = useAuthStore((s) => s.user);

  const dayElement = useMemo(() => {
    return CAN_TO_ELEMENT[dayData.canChi.day.can] || 'Thổ';
  }, [dayData.canChi.day.can]);

  const elConfig = ELEMENT_CONFIG[dayElement] || ELEMENT_CONFIG['Thổ'];

  // Personalized score
  const energyResult = useMemo(() => {
    const userEl = user?.extendedProfile?.baziDayMaster?.element;
    if (!userEl) {
      // Generic score based on day grade
      const baseScore = dayData.dayGrade.includes('Đại Cát') ? 90
        : dayData.dayGrade.includes('Cát') ? 75
        : dayData.dayGrade.includes('Hung') ? 35
        : 60;
      return { score: baseScore, label: dayData.dayGrade, personalized: false };
    }
    const interaction = getInteractionScore(userEl, dayElement);
    return { score: interaction.score, label: interaction.label, personalized: true };
  }, [user, dayElement, dayData.dayGrade]);

  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat('vi-VN', {
      weekday: compact ? 'short' : 'long',
      day: '2-digit',
      month: '2-digit',
    }).format(selectedDate);
  }, [selectedDate, compact]);

  // Ring progress
  const circumference = 2 * Math.PI * 38; // r=38
  const strokeDashoffset = circumference - (energyResult.score / 100) * circumference;

  // Score color
  const scoreColor = energyResult.score >= 75 ? 'text-emerald-500' : energyResult.score >= 50 ? 'text-amber-500' : 'text-red-500';

  if (compact) {
    // ── Compact Mode (inline card) ──
    return (
      <div className={`card-surface p-4 flex items-center gap-4 ${className}`}>
        {/* Mini Score Ring */}
        <div className="relative shrink-0">
          <svg viewBox="0 0 80 80" className="w-14 h-14 -rotate-90">
            <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="5"
              className="text-gray-200/50 dark:text-gray-700/30" />
            <circle cx="40" cy="40" r="34" fill="none" strokeWidth="5" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 34}`}
              strokeDashoffset={`${2 * Math.PI * 34 - (energyResult.score / 100) * 2 * Math.PI * 34}`}
              className={scoreColor}
              style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-base font-black ${scoreColor}`}>{energyResult.score}</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">{elConfig.emoji}</span>
            <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark truncate">
              Năng Lượng {elConfig.vi}
            </p>
          </div>
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
            {formattedDate} · {energyResult.label}
            {energyResult.personalized && <span className="text-amber-500 ml-1">★</span>}
          </p>
        </div>

        {/* Quick actions */}
        <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark text-right shrink-0">
          <p className="font-medium text-emerald-500">{dayData.dungSu.suitable.length} tốt</p>
          <p className="font-medium text-rose-400">{dayData.dungSu.unsuitable.length} kỵ</p>
        </div>
      </div>
    );
  }

  // ── Full Mode (standalone widget) ──
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${elConfig.gradient} p-6 sm:p-8 text-white shadow-xl ${elConfig.glow} ${className}`}>
      {/* Glassmorphism orbs */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-white/5 rounded-full blur-2xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/60 text-xs font-medium uppercase tracking-wider">{formattedDate}</p>
            <h2 className="text-xl font-black mt-0.5">
              {user?.displayName ? `${user.displayName.split(' ').pop()}, ` : ''}Năng Lượng Hôm Nay
            </h2>
          </div>
          <span className="text-3xl">{elConfig.emoji}</span>
        </div>

        {/* Score Ring */}
        <div className="flex items-center gap-6 mb-6">
          <div className="relative shrink-0">
            <svg viewBox="0 0 80 80" className="w-24 h-24 -rotate-90">
              <circle cx="40" cy="40" r="38" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="6" />
              <circle cx="40" cy="40" r="38" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={`${circumference}`} strokeDashoffset={`${strokeDashoffset}`}
                style={{ transition: 'stroke-dashoffset 1.2s ease-in-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black">{energyResult.score}</span>
              <span className="text-[10px] font-semibold opacity-50 uppercase">/100</span>
            </div>
          </div>

          <div>
            <p className="text-lg font-bold">{energyResult.label}</p>
            {energyResult.personalized ? (
              <p className="text-white/60 text-xs mt-1">
                ★ Cá nhân hóa theo Mệnh {user?.extendedProfile?.baziDayMaster?.element || ''}
              </p>
            ) : (
              <p className="text-white/60 text-xs mt-1">Điểm chung theo Ngũ Hành hàng ngày</p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs bg-white/15 px-2 py-0.5 rounded-full backdrop-blur-sm">
                {dayData.canChi.day.can} {dayData.canChi.day.chi}
              </span>
              <span className="text-xs bg-white/15 px-2 py-0.5 rounded-full backdrop-blur-sm">
                Âm: {dayData.lunarDate.day}/{dayData.lunarDate.month}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Activities */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <p className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1.5">Nên Làm</p>
            {dayData.dungSu.suitable.slice(0, 3).map((item: string, i: number) => (
              <p key={i} className="text-xs leading-relaxed truncate">✅ {item}</p>
            ))}
            {dayData.dungSu.suitable.length === 0 && <p className="text-xs opacity-50">Không có</p>}
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <p className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1.5">Cần Kiêng</p>
            {dayData.dungSu.unsuitable.slice(0, 3).map((item: string, i: number) => (
              <p key={i} className="text-xs leading-relaxed truncate">❌ {item}</p>
            ))}
            {dayData.dungSu.unsuitable.length === 0 && <p className="text-xs opacity-50">Không có</p>}
          </div>
        </div>

        {/* Lucky Hours */}
        <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
          <span className="material-icons-round text-sm">schedule</span>
          <span>Giờ tốt: {dayData.auspiciousHours.slice(0, 4).map(h => h.name).join(', ') || 'N/A'}</span>
        </div>

        {/* CTA */}
        {showCTA && (
          <a
            href="/app/hang-ngay"
            className="mt-5 block w-full text-center py-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl text-sm font-bold transition-colors border border-white/10"
          >
            Xem Chi Tiết →
          </a>
        )}

        {/* Branding */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[8px] font-black">LV</div>
            <span className="text-[10px] font-semibold tracking-wider opacity-50">LỊCH VIỆT v2</span>
          </div>
          {energyResult.personalized && (
            <span className="text-[10px] opacity-40">Cá nhân hóa</span>
          )}
        </div>
      </div>
    </div>
  );
}
