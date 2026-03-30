import React, { useEffect, useState, useMemo } from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useNavigate } from 'react-router-dom';
import { getLunarDate, getCanChiDay, getCanChiYear, getCanChiMonth, getDayQuality, getSolarTerm, getAuspiciousHours, parseCanChi } from '@lich-viet/core/calendar';
import { getJDN } from '@lich-viet/core/calendar';
import { NAP_AM_MAPPING } from '@lich-viet/core';
import CosmicWeatherCard from './LandingPage/CosmicWeatherCard';
import HeroBirthdayInput from './LandingPage/HeroBirthdayInput';
import TestimonialSection from './LandingPage/TestimonialSection';
import { FEATURES, TIER_COMPARISON, useCountUp, useInView, getMoonPhaseName } from './LandingPage/landingPageData';
import MoonPhaseSVG from './LandingPage/MoonPhaseSVG';
import HeroAuspiciousArt from './LandingPage/HeroAuspiciousArt';
import MysticBackgroundPattern from './LandingPage/MysticBackgroundPattern';

// ══════════════════════════════════════════════════════════
// Landing Page — Revamped with interactive hero, social proof,
// story cards, emotional trust, pricing cards, and SEO footer
// ══════════════════════════════════════════════════════════

export default function LandingPage() {
  usePageTitle('Tra cứu Âm Lịch & Phong Thủy');
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  const statsSection = useInView(0.3);
  const usersCount = useCountUp(12480, 1800, statsSection.inView);
  const looksupCount = useCountUp(85000, 2000, statsSection.inView);
  const starsCount = useCountUp(115, 1200, statsSection.inView);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDark = () => {
    const isNowDark = document.documentElement.classList.toggle('dark');
    localStorage.theme = isNowDark ? 'dark' : 'light';
    setIsDark(isNowDark);
  };

  // ── Live "Today" data from calendarEngine ──
  const today = useMemo(() => {
    const now = new Date();
    const lunar = getLunarDate(now);
    const canChiDay = getCanChiDay(now);
    const canChiYear = getCanChiYear(lunar.year);
    const canChiMonth = getCanChiMonth(lunar.month, lunar.year);
    const quality = getDayQuality(now);
    const jd = getJDN(now.getDate(), now.getMonth() + 1, now.getFullYear());
    const solarTerm = getSolarTerm(jd);

    const dayOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'][now.getDay()];

    const canChiDayParsed = parseCanChi(canChiDay);
    const napAm = canChiDayParsed ? (NAP_AM_MAPPING[`${canChiDayParsed.can} ${canChiDayParsed.chi}`] || '') : '';
    const auspiciousHoursCount = getAuspiciousHours(now).length;

    return {
      lunar,
      canChiDay,
      canChiYear,
      canChiMonth,
      quality,
      solarTerm,
      dayOfWeek,
      solarDate: `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
      moonPhase: getMoonPhaseName(lunar.day),
      auspiciousHoursCount,
      napAm,
    };
  }, []);

  const isGoodDay = today.quality === 'Good';
  const qualityLabel = isGoodDay ? 'Ngày Hoàng Đạo' : today.quality === 'Bad' ? 'Ngày Hắc Đạo' : 'Ngày Bình Thường';
  const qualityIcon = isGoodDay ? 'verified' : today.quality === 'Bad' ? 'dangerous' : 'info';
  const qualityColor = isGoodDay
    ? 'text-emerald-500 dark:text-emerald-400 bg-emerald-500/8 dark:bg-emerald-400/8 border-emerald-500/15 dark:border-emerald-400/15'
    : today.quality === 'Bad'
      ? 'text-red-500 dark:text-red-400 bg-red-500/8 dark:bg-red-400/8 border-red-500/15 dark:border-red-400/15'
      : 'text-amber-500 dark:text-amber-400 bg-amber-500/8 dark:bg-amber-400/8 border-amber-500/15 dark:border-amber-400/15';

  return (
    <div className="min-h-screen transition-colors duration-300 overflow-x-hidden relative">

      {/* ──── Ambient Mystery Background ──── */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-b from-mystery-deep via-[#0f0a24] to-mystery-deep" />
        <div className="hidden dark:block">
          <div className="mystery-orb mystery-orb-purple w-[600px] h-[600px] top-[-10%] left-[-10%] opacity-50" style={{ animationDelay: '0s' }} />
          <div className="mystery-orb mystery-orb-blue w-[500px] h-[500px] top-[20%] right-[-15%] opacity-40" style={{ animationDelay: '5s' }} />
          <div className="mystery-orb mystery-orb-gold w-[450px] h-[450px] top-[50%] left-[10%] opacity-35" style={{ animationDelay: '8s' }} />
          <div className="mystery-orb mystery-orb-purple w-[300px] h-[300px] bottom-[10%] right-[20%] opacity-30" style={{ animationDelay: '12s' }} />
        </div>
        {/* Starfield */}
        <div className="hidden dark:block absolute inset-0" style={{
          backgroundImage: `radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.15), transparent),
                           radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,0.1), transparent),
                           radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.12), transparent),
                           radial-gradient(1px 1px at 80% 50%, rgba(255,255,255,0.08), transparent),
                           radial-gradient(1.5px 1.5px at 10% 60%, rgba(212,168,67,0.2), transparent),
                           radial-gradient(1.5px 1.5px at 90% 40%, rgba(124,58,237,0.2), transparent),
                           radial-gradient(1px 1px at 30% 80%, rgba(255,255,255,0.1), transparent),
                           radial-gradient(1px 1px at 70% 10%, rgba(255,255,255,0.12), transparent),
                           radial-gradient(1px 1px at 50% 50%, rgba(255,255,255,0.08), transparent),
                           radial-gradient(1px 1px at 15% 45%, rgba(255,255,255,0.1), transparent)`,
          backgroundSize: '250px 250px, 300px 300px, 200px 200px, 350px 350px, 400px 400px, 450px 450px, 280px 280px, 320px 320px, 380px 380px, 260px 260px',
        }} />
        {/* Subtle sacred-geometry dot pattern — both modes */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle, currentColor 0.5px, transparent 0.5px),
            radial-gradient(circle, currentColor 0.3px, transparent 0.3px)`,
          backgroundSize: '32px 32px, 16px 16px',
          backgroundPosition: '0 0, 8px 8px',
          opacity: 0.04,
        }} />
        {/* Faint concentric rings — mystic / astrolabe feel */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[1200px] h-[1200px] rounded-full border border-gold/[0.03] dark:border-gold-dark/[0.04]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[900px] h-[900px] rounded-full border border-gold/[0.04] dark:border-gold-dark/[0.05]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[600px] h-[600px] rounded-full border border-gold/[0.05] dark:border-gold-dark/[0.06]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[300px] h-[300px] rounded-full border border-gold/[0.06] dark:border-gold-dark/[0.07]" />
        </div>
      </div>

      {/* ──── Floating Nav ──── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold via-gold-light to-amber-600 dark:from-gold-dark dark:via-amber-400 dark:to-yellow-300 tracking-tight">
            LỊCH VIỆT
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDark}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/8 text-gray-400 dark:text-gray-500 transition-colors"
              aria-label="Chuyển chế độ sáng/tối"
            >
              <span className="material-icons-round text-lg">{isDark ? 'light_mode' : 'dark_mode'}</span>
            </button>
            <button
              onClick={() => navigate('/app/am-lich')}
              className="hidden sm:flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-mystery-deep to-indigo-950 text-gold-light dark:from-gold dark:to-amber-500 dark:text-indigo-950 font-semibold text-sm hover:shadow-xl hover:shadow-mystery-deep/20 dark:hover:shadow-gold-dark/20 transition-all duration-300 hover:-translate-y-0.5 ring-1 ring-gold/20 dark:ring-0"
            >
              Mở ứng dụng
              <span className="material-icons-round text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════
           §1 HERO — Centered headline + symmetric 3-card grid
         ════════════════════════════════════════════════════════ */}
      <section className="relative px-5 pt-28 pb-8 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-gradient-radial from-gold/5 dark:from-gold/3 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-amber-500/4 dark:bg-mystery-purple/6 rounded-full blur-3xl" />
        </div>

        {/* Auspicious Art Background (Scaled to 90% of original massive size) */}
        <div className="absolute top-0 right-[-20%] md:right-[-10%] lg:right-[0%] w-[720px] lg:w-[900px] h-[720px] lg:h-[900px] opacity-[0.6] lg:opacity-[0.8] dark:opacity-[0.7] pointer-events-none z-[1]">
          <HeroAuspiciousArt />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">

          {/* ── Asymmetric headline block ── */}
          <div className="text-left max-w-3xl mb-16 relative z-10">
            {/* Authority badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container-low dark:bg-gold-dark/6 mb-5 animate-fade-in-up backdrop-blur-sm">
              <span className="material-icons-round text-xs text-gold dark:text-gold-dark">science</span>
              <span className="text-[10px] sm:text-xs font-medium text-gold dark:text-gold-dark tracking-wide">Tính toán thiên văn chính xác</span>
            </div>

            {/* Hook headline — benefit-driven, more breathing room */}
            <h2 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-serif font-bold leading-[1.1] tracking-tight mb-6 animate-fade-in-up animate-delay-1">
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-text-primary-light to-text-secondary-light dark:from-white dark:to-gray-400">
                Khám phá
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold via-gold-light to-amber-600 dark:from-gold-dark dark:via-amber-400 dark:to-yellow-300 mystery-text-glow">
                vận mệnh của bạn
              </span>
            </h2>

            <p className="text-base sm:text-lg text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-8 animate-fade-in-up animate-delay-2 max-w-xl">
              11 công cụ phong thủy & chiêm tinh trong một ứng dụng.
              <br className="hidden sm:block" />
              Lịch âm, Tử Vi, Bát Tự, Chiêm Tinh —{' '}
              <span className="font-semibold text-text-primary-light dark:text-text-primary-dark">chính xác theo chuẩn học thuật.</span>
            </p>

            {/* Benefit pills */}
            <div className="flex items-center justify-start gap-2.5 mb-8 animate-fade-in-up animate-delay-2 flex-wrap">
              {[
                { icon: 'devices', text: 'Không cần cài đặt' },
                { icon: 'wifi_off', text: 'Hoạt động offline' },
                { icon: 'shield', text: 'Bảo mật ưu tiên' },
              ].map((t) => (
                <span key={t.text} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-low dark:bg-white/5 text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark backdrop-blur-sm">
                  <span className="material-icons-round text-xs text-gold dark:text-gold-dark">{t.icon}</span>
                  {t.text}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex items-center justify-start gap-4 animate-fade-in-up animate-delay-3">
              <button
                onClick={() => navigate('/app/am-lich')}
                className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-mystery-deep to-indigo-950 text-gold-light dark:from-gold dark:to-amber-500 dark:text-indigo-950 font-bold transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-mystery-deep/20 dark:hover:shadow-gold-dark/30 ring-1 ring-gold/20 dark:ring-0"
              >
                Trải nghiệm ngay
                <span className="material-icons-round text-lg group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </button>
              <button
                onClick={() => navigate('/app/nang-cap')}
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-2xl text-text-secondary-light/60 dark:text-text-secondary-dark/50 text-sm font-medium hover:text-text-primary-light dark:hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span className="material-icons-round text-sm">workspace_premium</span>
                Xem các gói
              </button>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════
               Symmetric 3-card grid: Today | Birthday | Cosmic
             ══════════════════════════════════════════════════════ */}
          <div id="cosmic-section" className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up animate-delay-5">

            {/* ── Card 1: Today's Details ── */}
            <button
              onClick={() => navigate('/app/am-lich')}
              className="group glass-card glass-noise p-5 text-left hover-lift cursor-pointer flex flex-col"
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-secondary-light/60 dark:text-text-secondary-dark/50">Hôm nay</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${qualityColor}`}>
                    <span className="material-icons-round text-[10px]">{qualityIcon}</span>
                    {qualityLabel}
                  </span>
                </div>
                <span className="material-icons-round text-sm text-text-secondary-light/15 dark:text-text-secondary-dark/10 group-hover:text-gold dark:group-hover:text-gold-dark transition-colors">
                  arrow_forward
                </span>
              </div>

              {/* Moon + date */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="shrink-0 animate-float rounded-full moon-glow">
                  <MoonPhaseSVG lunarDay={today.lunar.day} />
                </div>
                <div>
                  <p className="text-sm font-bold leading-snug">{today.dayOfWeek}, {today.solarDate}</p>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    Âm lịch {today.lunar.day}/{today.lunar.month} · {today.moonPhase}
                  </p>
                </div>
              </div>

              {/* Details grid */}
              <div className="mt-auto space-y-2 pt-3 border-t border-border-light/15 dark:border-white/[0.04]">
                <div className="flex items-center gap-2 text-xs">
                  <span className="material-icons-round text-xs text-gold/50 dark:text-gold-dark/40">calendar_today</span>
                  <span className="text-text-secondary-light dark:text-text-secondary-dark">
                    {today.canChiDay}
                    {today.napAm && <span className="text-text-secondary-light/50 dark:text-text-secondary-dark/40 ml-1">({today.napAm})</span>}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="material-icons-round text-xs text-gold/50 dark:text-gold-dark/40">schedule</span>
                  <span className="text-text-secondary-light dark:text-text-secondary-dark">{today.auspiciousHoursCount} giờ hoàng đạo</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="material-icons-round text-xs text-gold/50 dark:text-gold-dark/40">wb_sunny</span>
                  <span className="text-text-secondary-light dark:text-text-secondary-dark">{today.solarTerm || 'Tiết khí đang cập nhật'}</span>
                </div>
              </div>
            </button>

            {/* ── Card 2: Vận Khí Vũ Trụ (Cosmic Weather) — center ── */}
            <CosmicWeatherCard navigate={navigate} today={today} />

            {/* ── Card 3: Khám Phá Nhanh (Birthday Input) — right ── */}
            <div className="flex flex-col">
              <HeroBirthdayInput onNavigate={navigate} />
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-12 animate-fade-in-up animate-delay-4">
            <button
              onClick={() => document.getElementById('stats-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex flex-col items-center gap-1 text-text-secondary-light/40 dark:text-text-secondary-dark/30 hover:text-gold dark:hover:text-gold-dark transition-colors"
              aria-label="Cuộn xuống để xem thêm"
            >
              <span className="text-[10px] font-medium tracking-wider uppercase">Khám phá thêm</span>
              <span className="material-icons-round text-lg animate-bounce">expand_more</span>
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           §3 STATS — Trust counters
         ════════════════════════════════════════════════════════ */}
      <section id="stats-section" ref={statsSection.ref} className="py-10 px-5 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { value: usersCount.toLocaleString(), suffix: '+', label: 'Lượt tra cứu', icon: 'search', iconTint: 'text-blue-500/60 dark:text-blue-400/50', accentColor: 'text-blue-500 dark:text-blue-400' },
              { value: looksupCount.toLocaleString(), suffix: '+', label: 'Dữ liệu thiên văn', icon: 'database', iconTint: 'text-teal-500/60 dark:text-teal-400/50', accentColor: 'text-teal-500 dark:text-teal-400' },
              { value: starsCount.toLocaleString(), suffix: ' sao', label: 'Sao Tử Vi', icon: 'auto_awesome', iconTint: 'text-purple-500/60 dark:text-purple-400/50', accentColor: 'text-purple-500 dark:text-purple-400' },
            ].map((s) => (
              <div key={s.label} className="text-center py-6 px-4 glass-card">
                <span className={`material-icons-round text-lg ${s.iconTint} mb-1.5 block`}>{s.icon}</span>
                <p className="text-2xl sm:text-3xl font-bold tabular-nums">
                  {s.value}<span className={s.accentColor}>{s.suffix}</span>
                </p>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           §4 FEATURES — Story cards (benefit-first with tiers)
         ════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 px-5 relative z-10 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-10 right-[-20%] md:right-[-5%] w-[600px] h-[600px] opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0">
          <MysticBackgroundPattern variant="bagua" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold dark:text-gold-dark mb-2">Tính năng</p>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 mystery-text-glow">
              11 công cụ trong một ứng dụng
            </h3>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark max-w-lg mx-auto">
              Kết hợp Đông phương và Tây phương — từ lịch âm cổ truyền đến chiêm tinh hiện đại.
            </p>
          </div>

          {/* Basic tier features */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-400/8 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Cơ bản
              </span>
              <div className="flex-1 h-px bg-border-light/20 dark:bg-border-dark/20" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.filter(f => f.tier === 'Cơ bản').map((f, i) => (
                <button
                  key={f.id}
                  onClick={() => navigate(`/app/${f.id}`)}
                  className="group relative text-left p-6 rounded-2xl bg-surface-container-lowest dark:bg-surface-dark hover:bg-surface-bright transition-colors duration-500 animate-fade-in-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${f.glowColor} dark:opacity-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none`} />
                  <div className="relative flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl ${f.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <span className={`material-icons-round text-lg ${f.iconColor}`}>{f.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-bold">{f.title}</h4>
                        <span className="px-1.5 py-0.5 rounded bg-gold/8 dark:bg-gold-dark/6 text-[10px] font-bold text-gold dark:text-gold-dark uppercase tracking-wider">
                          {f.highlight}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                  <span className="absolute top-4 right-3 material-icons-round text-sm text-text-secondary-light/20 dark:text-text-secondary-dark/15 group-hover:text-gold dark:group-hover:text-gold-dark group-hover:translate-x-0.5 transition-all">
                    arrow_forward
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Premium tier features */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-0.5 rounded-full bg-gold/10 dark:bg-gold-dark/8 text-[10px] font-bold text-gold dark:text-gold-dark uppercase tracking-wider">
                Nâng cấp để mở khóa
              </span>
              <div className="flex-1 h-px bg-border-light/20 dark:bg-border-dark/20" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.filter(f => f.tier !== 'Cơ bản').map((f, i) => (
                <button
                  key={f.id}
                  onClick={() => navigate(`/app/${f.id}`)}
                  className="group relative text-left p-6 rounded-2xl bg-surface-container-lowest dark:bg-surface-dark hover:bg-surface-bright transition-colors duration-500 animate-fade-in-up"
                  style={{ animationDelay: `${i * 80 + 300}ms` }}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${f.glowColor} dark:opacity-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none`} />
                  <div className="relative flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl ${f.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <span className={`material-icons-round text-lg ${f.iconColor}`}>{f.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-bold">{f.title}</h4>
                        <span className="px-1.5 py-0.5 rounded bg-gold/8 dark:bg-gold-dark/6 text-[10px] font-bold text-gold dark:text-gold-dark uppercase tracking-wider">
                          {f.highlight}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-1">
                        {f.desc}
                      </p>
                      <span className="text-[10px] font-medium text-gold dark:text-gold-dark bg-gold/5 dark:bg-gold-dark/5 px-2 py-0.5 rounded-full">
                        {f.tier}
                      </span>
                    </div>
                  </div>
                  <span className="absolute top-4 right-3 material-icons-round text-sm text-text-secondary-light/20 dark:text-text-secondary-dark/15 group-hover:text-gold dark:group-hover:text-gold-dark group-hover:translate-x-0.5 transition-all">
                    arrow_forward
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           §5 TESTIMONIALS — Social proof
         ════════════════════════════════════════════════════════ */}
      <TestimonialSection />

      {/* ════════════════════════════════════════════════════════
           §6 WHY LỊCH VIỆT — Emotional trust section
         ════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-16 px-5 relative z-10 bg-surface-subtle-light dark:bg-[#0c0b20] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-1/2 left-[-30%] md:left-[-10%] -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0">
          <MysticBackgroundPattern variant="constellation" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold dark:text-gold-dark mb-2">Tại sao chọn Lịch Việt</p>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 mystery-text-glow">
              Được xây dựng vì người dùng
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: 'verified',
                title: 'Chuẩn học thuật',
                desc: 'Thuật toán được đối chiếu với các tài liệu cổ học uy tín — đảm bảo chính xác từng con số.',
                accent: 'from-blue-400/25 to-blue-600/10',
                iconColor: 'text-blue-500 dark:text-blue-400',
              },
              {
                icon: 'block',
                title: 'Tôn trọng trải nghiệm',
                desc: 'Không popup, không banner, không theo dõi. Trải nghiệm sạch sẽ như ứng dụng bạn xứng đáng.',
                accent: 'from-emerald-400/25 to-emerald-600/10',
                iconColor: 'text-emerald-500 dark:text-emerald-400',
              },
              {
                icon: 'lock',
                title: 'Dữ liệu không rời thiết bị',
                desc: 'Ngày sinh, lá số, kết quả — tất cả chỉ nằm trên trình duyệt. Không gửi đến máy chủ nào.',
                accent: 'from-purple-400/25 to-purple-600/10',
                iconColor: 'text-purple-500 dark:text-purple-400',
              },
            ].map((v, i) => (
              <div key={v.title} className="group p-6 rounded-2xl bg-surface-container-lowest dark:bg-surface-dark hover:bg-surface-bright transition-colors duration-500 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${v.accent} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                  <span className={`material-icons-round text-xl ${v.iconColor}`}>{v.icon}</span>
                </div>
                <h4 className="text-sm font-bold mb-1.5">{v.title}</h4>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           §7 PRICING — Visual cards (replaces table)
         ════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 px-5 relative z-10 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-[0.02] dark:opacity-[0.04] pointer-events-none z-0">
          <MysticBackgroundPattern variant="compass" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold dark:text-gold-dark mb-2">So sánh gói</p>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 mystery-text-glow">
              Chọn gói phù hợp với bạn
            </h3>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark max-w-lg mx-auto">
              Khám phá các công cụ cơ bản ngay. Nâng cấp khi bạn cần phân tích chuyên sâu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
            {/* Basic Tier */}
            <div className="p-8 rounded-2xl bg-surface-container-lowest dark:bg-surface-dark border-l-2 border-l-emerald-500/30 dark:border-l-emerald-400/20">
              <div className="text-center mb-6">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/8 mb-3">
                  <span className="material-icons-round text-lg text-emerald-600 dark:text-emerald-400">explore</span>
                </span>
                <h4 className="text-base font-bold text-emerald-600 dark:text-emerald-400">Khám phá</h4>
                <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark">Bắt đầu ngay</p>
              </div>
              <ul className="space-y-2">
                {TIER_COMPARISON.map((row) => (
                  <li key={row.feature} className="flex items-center gap-2 text-xs">
                    {row.free === true ? (
                      <span className="text-emerald-500 dark:text-emerald-400 font-bold shrink-0">✓</span>
                    ) : (
                      <span className="text-gray-300 dark:text-gray-600 shrink-0">—</span>
                    )}
                    <span className={row.free === true ? 'text-text-primary-light dark:text-text-primary-dark' : 'text-text-secondary-light/50 dark:text-text-secondary-dark/40'}>
                      {row.feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/app/am-lich')}
                className="w-full mt-6 px-4 py-2 rounded-xl border border-border-light/50 dark:border-border-dark/50 text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark hover:border-gold dark:hover:border-gold-dark hover:text-gold dark:hover:text-gold-dark transition-all"
              >
                Bắt đầu khám phá
              </button>
            </div>

            {/* Trial Tier */}
            <div className="p-8 rounded-2xl bg-surface-container-lowest dark:bg-surface-dark border-l-2 border-l-blue-500/30 dark:border-l-blue-400/20">
              <div className="text-center mb-6">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-400/8 mb-3">
                  <span className="material-icons-round text-lg text-blue-600 dark:text-blue-400">star_half</span>
                </span>
                <h4 className="text-base font-bold text-blue-600 dark:text-blue-400">Dùng thử</h4>
                <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark">Mã khuyến mãi</p>
              </div>
              <ul className="space-y-2">
                {TIER_COMPARISON.map((row) => (
                  <li key={row.feature} className="flex items-center gap-2 text-xs">
                    {row.trial === true ? (
                      <span className="text-emerald-500 dark:text-emerald-400 font-bold shrink-0">✓</span>
                    ) : typeof row.trial === 'string' ? (
                      <span className="text-blue-500 dark:text-blue-400 font-medium shrink-0">✓</span>
                    ) : (
                      <span className="text-gray-300 dark:text-gray-600 shrink-0">—</span>
                    )}
                    <span className="text-text-primary-light dark:text-text-primary-dark">
                      {row.feature}
                      {typeof row.trial === 'string' && (
                        <span className="text-blue-500 dark:text-blue-400 ml-1 text-[10px]">({row.trial})</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/app/nang-cap')}
                className="w-full mt-6 px-4 py-2 rounded-xl border border-blue-500/30 dark:border-blue-400/20 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-500/5 dark:hover:bg-blue-400/5 transition-all"
              >
                Nhập mã thử
              </button>
            </div>

            {/* Premium Tier — elevated & highlighted */}
            <div className="relative -mt-2 sm:-mt-4 p-8 rounded-2xl bg-surface-container-lowest dark:bg-surface-dark shadow-[0px_20px_40px_rgba(119,90,19,0.10)] dark:shadow-[0px_20px_50px_rgba(255,222,161,0.06)] ring-1 ring-gold/25 dark:ring-gold-dark/20">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 rounded-full bg-gold dark:bg-gold-dark text-white dark:text-mystery-deep text-[10px] font-bold uppercase tracking-wider shadow-md">
                  Phổ biến nhất
                </span>
              </div>
              <div className="text-center mb-6 pt-2">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gold/10 dark:bg-gold-dark/8 mb-3">
                  <span className="material-icons-round text-lg text-gold dark:text-gold-dark">workspace_premium</span>
                </span>
                <h4 className="text-base font-bold text-gold dark:text-gold-dark">Đầy đủ</h4>
                <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark">Trọn đời</p>
              </div>
              <ul className="space-y-2">
                {TIER_COMPARISON.map((row) => (
                  <li key={row.feature} className="flex items-center gap-2 text-xs">
                    {row.premium === true ? (
                      <span className="text-gold dark:text-gold-dark font-bold shrink-0">✓</span>
                    ) : (
                      <span className="text-gold dark:text-gold-dark font-medium shrink-0">✓</span>
                    )}
                    <span className="text-text-primary-light dark:text-text-primary-dark font-medium">
                      {row.feature}
                      {typeof row.premium === 'string' && (
                        <span className="text-gold dark:text-gold-dark ml-1 text-[10px]">({row.premium})</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/app/nang-cap')}
                className="w-full mt-6 px-4 py-3 rounded-2xl bg-gradient-to-r from-mystery-deep to-indigo-950 text-gold-light dark:from-gold dark:to-amber-500 dark:text-indigo-950 font-bold transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-mystery-deep/20 dark:hover:shadow-gold-dark/30 ring-1 ring-gold/20 dark:ring-0"
              >
                Nâng cấp ngay
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
           §8 CLOSING CTA — Urgency-based with moon phase
         ════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 px-5 relative z-10">
        <div className="max-w-xl mx-auto text-center">
          <div className="bg-surface-container-lowest dark:bg-surface-dark rounded-3xl p-10 sm:p-12 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-radial from-mystery-purple/8 dark:from-mystery-purple/12 to-transparent rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-radial from-gold/6 dark:from-gold/10 to-transparent rounded-full blur-2xl pointer-events-none" />
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gold/10 dark:bg-gold-dark/8 flex items-center justify-center mx-auto mb-4">
                <span className="material-icons-round text-2xl text-gold dark:text-gold-dark">explore</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2 mystery-text-glow">
                Sẵn sàng khám phá vận mệnh?
              </h3>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-1">
                Trải nghiệm lịch âm, gieo quẻ và nhiều công cụ ngay. Nâng cấp để mở khóa toàn bộ.
              </p>
              {isGoodDay && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-4 animate-pulse-glow inline-flex items-center gap-1">
                  <span className="material-icons-round text-xs">verified</span>
                  Hôm nay là ngày Hoàng Đạo — thời điểm tốt để bắt đầu!
                </p>
              )}
              {!isGoodDay && (
                <p className="text-[10px] text-text-secondary-light/50 dark:text-text-secondary-dark/40 mb-6">
                  Hoạt động trên mọi thiết bị — desktop, tablet và điện thoại.
                </p>
              )}
              <button
                onClick={() => navigate('/app/am-lich')}
                className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-mystery-deep to-indigo-950 text-gold-light dark:from-gold dark:to-amber-500 dark:text-indigo-950 font-bold transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-mystery-deep/20 dark:hover:shadow-gold-dark/30 ring-1 ring-gold/20 dark:ring-0"
              >
                Mở Lịch Việt
                <span className="material-icons-round text-lg group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ──── §9 FOOTER — Multi-column SEO-rich ──── */}
      <footer className="border-t border-border-light/40 dark:border-mystery-purple/10 relative z-10 bg-surface-subtle-light dark:bg-[#080818]">
        <div className="max-w-5xl mx-auto px-5 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-1">
              <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold to-amber-600 dark:from-gold-dark dark:to-amber-400">LỊCH VIỆT</span>
              <p className="text-xs text-text-secondary-light/60 dark:text-text-secondary-dark/40 mt-1.5 leading-relaxed">
                Ứng dụng tra cứu âm lịch, phong thủy và chiêm tinh toàn diện nhất.
              </p>
            </div>

            {/* Features */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary-light dark:text-text-secondary-dark mb-3">Tính năng</p>
              <ul className="space-y-1.5">
                {['Âm Lịch', 'Lịch Dụng Sự', 'Gieo Quẻ', 'Tử Vi', 'Chiêm Tinh'].map((f) => (
                  <li key={f}>
                    <button
                      onClick={() => navigate(`/app/${f === 'Âm Lịch' ? 'am-lich' : f === 'Lịch Dụng Sự' ? 'lich-dung-su' : f === 'Gieo Quẻ' ? 'gieo-que' : f === 'Tử Vi' ? 'tu-vi' : 'chiem-tinh'}`)}
                      className="text-xs text-text-secondary-light/70 dark:text-text-secondary-dark/50 hover:text-gold dark:hover:text-gold-dark transition-colors"
                    >
                      {f}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* More */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary-light dark:text-text-secondary-dark mb-3">Thêm</p>
              <ul className="space-y-1.5">
                {[
                  { label: 'Thần Số Học', path: '/app/than-so-hoc' },
                  { label: 'Nâng cấp', path: '/app/nang-cap' },
                  { label: 'Cài đặt', path: '/app/cai-dat' },
                ].map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => navigate(item.path)}
                      className="text-xs text-text-secondary-light/70 dark:text-text-secondary-dark/50 hover:text-gold dark:hover:text-gold-dark transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary-light dark:text-text-secondary-dark mb-3">Hỗ trợ</p>
              <ul className="space-y-1.5">
                <li>
                  <button
                    onClick={() => navigate('/app/nang-cap')}
                    className="text-xs text-text-secondary-light/70 dark:text-text-secondary-dark/50 hover:text-gold dark:hover:text-gold-dark transition-colors"
                  >
                    Nâng cấp tài khoản
                  </button>
                </li>
                <li>
                  <span className="text-xs text-text-secondary-light/50 dark:text-text-secondary-dark/30">
                    Liên hệ: support@lichviet.app
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 border-t border-border-light/20 dark:border-border-dark/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[10px] text-text-secondary-light/50 dark:text-text-secondary-dark/40">
              © {new Date().getFullYear()} Lịch Việt. Tất cả tính toán chạy trên trình duyệt — dữ liệu riêng tư của bạn.
            </span>
            <span className="text-text-secondary-light/50 dark:text-text-secondary-dark/40 text-[10px] font-medium">v3.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
