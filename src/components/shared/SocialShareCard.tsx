/**
 * SocialShareCard — Glassmorphism Shareable Image Card
 *
 * Wraps insight text (takeaways, scores, verdicts) into a beautiful
 * glassmorphic card with Lịch Việt watermark branding.
 * Users can share to social media or save as PNG.
 *
 * Features:
 * - Gradient glassmorphism background
 * - Dynamic insight content with emoji
 * - Branded watermark footer
 * - One-tap share via Web Share API
 * - PNG download fallback
 */

import React, { useRef, useState, useCallback } from 'react';
import * as htmlToImage from 'html-to-image';

interface SocialShareCardProps {
  /** The main heading/category (e.g., "Tử Vi Hôm Nay", "Hợp Lá") */
  title: string;
  /** Emoji or icon to accompany the title */
  titleEmoji?: string;
  /** The main insight text to display */
  insight: string;
  /** Optional secondary line (e.g., score, date, verdict) */
  subtitle?: string;
  /** Gradient theme — matches engine context */
  theme?: 'gold' | 'purple' | 'emerald' | 'rose' | 'blue';
  /** Optional score to display (0-100) */
  score?: number;
  /** Optional filename for export */
  fileName?: string;
  /** Whether to show the card in preview mode (inline in page) */
  previewMode?: boolean;
}

// ── Theme config ──────────────────────────────────────────

const THEMES: Record<string, { gradient: string; accent: string; glow: string }> = {
  gold: {
    gradient: 'from-amber-500 via-yellow-500 to-orange-500',
    accent: 'bg-amber-200/20',
    glow: 'shadow-amber-500/30',
  },
  purple: {
    gradient: 'from-purple-600 via-violet-500 to-indigo-500',
    accent: 'bg-violet-200/20',
    glow: 'shadow-purple-500/30',
  },
  emerald: {
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    accent: 'bg-emerald-200/20',
    glow: 'shadow-emerald-500/30',
  },
  rose: {
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
    accent: 'bg-pink-200/20',
    glow: 'shadow-rose-500/30',
  },
  blue: {
    gradient: 'from-blue-500 via-indigo-500 to-violet-500',
    accent: 'bg-blue-200/20',
    glow: 'shadow-blue-500/30',
  },
};

// ── Component ──────────────────────────────────────────────

export default function SocialShareCard({
  title,
  titleEmoji = '✨',
  insight,
  subtitle,
  theme = 'gold',
  score,
  fileName = 'lich-viet-share',
  previewMode = false,
}: SocialShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const captureCard = useCallback(async (): Promise<string | null> => {
    if (!cardRef.current) return null;
    return htmlToImage.toPng(cardRef.current, {
      quality: 1,
      pixelRatio: 3,
      style: { transform: 'scale(1)', transformOrigin: 'top left' },
    });
  }, []);

  const handleShare = useCallback(async () => {
    setIsExporting(true);
    try {
      const dataUrl = await captureCard();
      if (!dataUrl) return;

      if (navigator.share) {
        try {
          const res = await fetch(dataUrl);
          const blob = await res.blob();
          const file = new File([blob], `${fileName}.png`, { type: 'image/png' });
          await navigator.share({
            title: `${title} — Lịch Việt`,
            text: insight.slice(0, 100),
            files: [file],
          });
          return;
        } catch {
          // User cancelled or unsupported — fall through to download
        }
      }
      triggerDownload(dataUrl, fileName);
    } catch (error) {
      console.error('Error exporting share card:', error);
    } finally {
      setIsExporting(false);
    }
  }, [captureCard, title, insight, fileName]);

  const handleDownload = useCallback(async () => {
    setIsExporting(true);
    try {
      const dataUrl = await captureCard();
      if (dataUrl) triggerDownload(dataUrl, fileName);
    } catch (error) {
      console.error('Error downloading share card:', error);
    } finally {
      setIsExporting(false);
    }
  }, [captureCard, fileName]);

  const t = THEMES[theme] || THEMES.gold;

  return (
    <div className="space-y-3">
      {/* The Card — this is what gets exported as PNG */}
      <div
        ref={cardRef}
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${t.gradient} p-8 text-white shadow-xl ${t.glow}`}
        style={{ minWidth: 320, maxWidth: 440 }}
      >
        {/* Glassmorphism orbs */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/8 rounded-full blur-xl" />

        <div className="relative z-10">
          {/* Category badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-bold mb-5 border border-white/10">
            <span>{titleEmoji}</span>
            <span className="tracking-wide uppercase">{title}</span>
          </div>

          {/* Score ring (optional) */}
          {score !== undefined && (
            <div className="flex items-center gap-4 mb-5">
              <div className="relative w-20 h-20 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray="264" strokeDashoffset={`${264 - (score / 100) * 264}`}
                    style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-black">{score}</span>
                </div>
              </div>
              {subtitle && (
                <div>
                  <p className="text-lg font-bold leading-tight">{subtitle}</p>
                </div>
              )}
            </div>
          )}

          {/* Main insight text */}
          <p className="text-lg font-semibold leading-relaxed mb-6 text-balance">
            "{insight}"
          </p>

          {/* Subtitle (if no score) */}
          {!score && subtitle && (
            <p className="text-white/60 text-sm mb-5">{subtitle}</p>
          )}

          {/* Branded footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/15">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black">
                LV
              </div>
              <span className="text-xs font-semibold tracking-wider opacity-70">LỊCH VIỆT v2</span>
            </div>
            <span className="text-[10px] opacity-40">lichviet.app</span>
          </div>
        </div>
      </div>

      {/* Action buttons — hidden during export */}
      {!previewMode && (
        <div className="flex gap-2" data-html2canvas-ignore>
          <button
            onClick={handleShare}
            disabled={isExporting}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                Đang xử lý...
              </>
            ) : (
              <>
                <span className="material-icons-round text-lg">share</span>
                Chia Sẻ Story
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-white/10 dark:bg-white/5 text-text-primary-light dark:text-text-primary-dark border border-border-light/50 dark:border-border-dark/50 hover:bg-white/20 transition-all"
          >
            <span className="material-icons-round text-lg">download</span>
            Lưu Ảnh
          </button>
        </div>
      )}
    </div>
  );
}

function triggerDownload(dataUrl: string, fileName: string) {
  const link = document.createElement('a');
  link.download = `${fileName}-${Date.now()}.png`;
  link.href = dataUrl;
  link.click();
}
