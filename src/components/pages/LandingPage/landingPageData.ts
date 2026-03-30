/**
 * Landing Page Data & Utilities
 *
 * Feature data, tier comparison, hooks, and helper functions
 * extracted from LandingPage.tsx to reduce file size.
 */

import { useEffect, useState, useRef } from 'react';

// ══════════════════════════════════════════════════════════
// Feature Data
// ══════════════════════════════════════════════════════════

export const FEATURES = [
  {
    id: 'am-lich',
    icon: 'calendar_month',
    title: 'Âm Lịch',
    desc: 'Tra cứu ngày âm lịch chính xác, giờ hoàng đạo, hướng xuất hành, tiết khí và can chi.',
    highlight: '24 tiết khí',
    glowColor: 'from-blue-400/20 to-blue-600/10',
    iconBg: 'bg-blue-500/12 dark:bg-blue-400/10',
    iconColor: 'text-blue-600 dark:text-blue-400',
    tier: 'Cơ bản',
  },
  {
    id: 'lich-dung-su',
    icon: 'event_available',
    title: 'Lịch Dụng Sự',
    desc: 'Chọn ngày tốt cho cưới hỏi, khai trương, xây dựng và các sự kiện quan trọng khác.',
    highlight: '64+ hoạt động',
    glowColor: 'from-emerald-400/20 to-emerald-600/10',
    iconBg: 'bg-emerald-500/12 dark:bg-emerald-400/10',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    tier: 'Cơ bản',
  },
  {
    id: 'gieo-que',
    icon: 'casino',
    title: 'Gieo Quẻ',
    desc: 'Mai Hoa Dịch Số — giải quẻ toàn diện với Thể Dụng, Hỗ Quái và Nạp Giáp.',
    highlight: '64 quẻ dịch',
    glowColor: 'from-purple-400/20 to-purple-600/10',
    iconBg: 'bg-purple-500/12 dark:bg-purple-400/10',
    iconColor: 'text-purple-600 dark:text-purple-400',
    tier: 'Cơ bản',
  },
  {
    id: 'tu-vi',
    icon: 'auto_awesome',
    title: 'Tử Vi',
    desc: 'Lá số 12 cung với 115 sao, phân tích Đại Hạn, Lưu Niên và cách cục chi tiết.',
    highlight: '115 sao',
    glowColor: 'from-amber-400/20 to-amber-600/10',
    iconBg: 'bg-amber-500/12 dark:bg-amber-400/10',
    iconColor: 'text-amber-600 dark:text-amber-400',
    tier: 'Premium',
  },
  {
    id: 'chiem-tinh',
    icon: 'public',
    title: 'Chiêm Tinh',
    desc: 'Bản đồ sao phương Tây — nhà, cung, aspect và luận giải tính cách chuyên sâu.',
    highlight: '10 hành tinh',
    glowColor: 'from-rose-400/20 to-rose-600/10',
    iconBg: 'bg-rose-500/12 dark:bg-rose-400/10',
    iconColor: 'text-rose-600 dark:text-rose-400',
    tier: 'Premium',
  },
  {
    id: 'than-so-hoc',
    icon: 'tag',
    title: 'Thần Số Học',
    desc: 'Phân tích số chủ đạo, biểu đồ ngày sinh và con đường cuộc đời theo Pythagorean & Chaldean.',
    highlight: '20+ chỉ số',
    glowColor: 'from-teal-400/20 to-teal-600/10',
    iconBg: 'bg-teal-500/12 dark:bg-teal-400/10',
    iconColor: 'text-teal-600 dark:text-teal-400',
    tier: 'Premium',
  },
];


/** Tier comparison data for the landing page */
export const TIER_COMPARISON = [
  { feature: 'Âm Lịch & Giờ tốt/xấu', free: true, trial: true, premium: true },
  { feature: 'Lịch Dụng Sự (64+ việc)', free: true, trial: true, premium: true },
  { feature: 'Gieo Quẻ Mai Hoa', free: true, trial: true, premium: true },
  { feature: 'Lập lá số Tử Vi', free: true, trial: true, premium: true },
  { feature: 'Lập bản đồ Chiêm Tinh', free: true, trial: true, premium: true },
  { feature: 'Phân tích Thần Số Học', free: true, trial: true, premium: true },
  { feature: 'Luận giải tính cách (1 tab)', free: true, trial: true, premium: true },
  { feature: 'Luận giải chuyên sâu (tất cả)', free: false, trial: true, premium: true },
  { feature: 'Đại Hạn & Lưu Niên', free: false, trial: true, premium: true },
  { feature: 'Tải PDF báo cáo', free: false, trial: '~30 trang', premium: '60-70 trang' },
];

// ══════════════════════════════════════════════════════════
// Hooks
// ══════════════════════════════════════════════════════════

export function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let frame: number;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start]);
  return count;
}

export function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ══════════════════════════════════════════════════════════
// Moon phase name helper
// ══════════════════════════════════════════════════════════

export function getMoonPhaseName(lunarDay: number): string {
  if (lunarDay <= 2 || lunarDay >= 29) return 'Trăng non';
  if (lunarDay <= 7) return 'Trăng lưỡi liềm đầu';
  if (lunarDay <= 9) return 'Bán nguyệt đầu';
  if (lunarDay <= 13) return 'Trăng khuyết đầu';
  if (lunarDay <= 16) return 'Trăng tròn';
  if (lunarDay <= 21) return 'Trăng khuyết sau';
  if (lunarDay <= 23) return 'Bán nguyệt cuối';
  return 'Trăng lưỡi liềm cuối';
}
