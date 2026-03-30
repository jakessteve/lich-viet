/**
 * NumerologyView — Thần Số Học Main View (Enriched)
 *
 * Input: Full name + birth date → generates complete numerology profile
 * with deep analysis, number interactions, pinnacle timeline, and enriched cycles.
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useAnalysisDepth } from '../../hooks/useAnalysisDepth';
import { usePageTitle } from '@/hooks/usePageTitle';
import { generateNumerologyProfile, type NumerologyProfile, type NumerologySystem } from '@lich-viet/core/numerology';
import CollapsibleCard from '../CollapsibleCard';
import { ContentGate } from '../shared/ContentGate';
import { CORE_MEANINGS } from '../../data/interpretation/numerology/coreMeanings';

import PdfDownloadButton from '../shared/PdfDownloadButton';
import ShareButton from '../shared/ShareButton';
import PremiumStickyActionBar from '../shared/PremiumStickyActionBar';
import CoreNumberCard from './CoreNumberCard';
import PremiumLoader from '../shared/PremiumLoader';
import ProModeToggle from '../shared/ProModeToggle';
import EngineTabNav, { type EngineTab } from '../shared/EngineTabNav';
import { useUserTier } from '../../hooks/useUserTier';

// Section components (decomposed from this file)
import DeepAnalysisSection from './sections/DeepAnalysisSection';
import NumberInteractionsSection from './sections/NumberInteractionsSection';
import EnhancedBirthdayGridView from './sections/EnhancedBirthdayGridView';
import PinnacleTimelineSection from './sections/PinnacleTimelineSection';
import EnrichedPersonalCycleView from './sections/EnrichedPersonalCycleView';
import EnhancedKarmicMasterSection from './sections/EnhancedKarmicMasterSection';
import LifeDomainSection from './sections/LifeDomainSection';

// ── Main View ──────────────────────────────────────────────────

export default function NumerologyView() {
  usePageTitle('Thần Số Học');
  const { defaultOpen } = useAnalysisDepth();
  const user = useAuthStore((s) => s.user);
  const [fullName, setFullName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [system, setSystem] = useState<NumerologySystem>('pythagorean');
  const [profile, setProfile] = useState<NumerologyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [profilePrefilled, setProfilePrefilled] = useState(false);
  const [isProMode, setIsProMode] = useState(false);
  const [activeSection, setActiveSection] = useState<'core' | 'analysis' | 'cycles'>('core');
  const { hasAccess } = useUserTier();

  // Pre-fill from user profile on mount
  const hasPrefilledRef = useRef(false);
  useEffect(() => {
    if (!user || hasPrefilledRef.current) return;
    let filled = false;
    if (!fullName && user.displayName) { setFullName(user.displayName); filled = true; }
    if (user.birthday) {
      const parts = user.birthday.split('-');
      if (parts.length === 3) {
        if (!day) { setDay(String(parseInt(parts[2], 10))); filled = true; }
        if (!month) { setMonth(String(parseInt(parts[1], 10))); filled = true; }
        if (!year) { setYear(parts[0]); filled = true; }
      }
    }
    if (filled) setProfilePrefilled(true);
    hasPrefilledRef.current = true;
  }, [user, fullName, day, month, year]);

  const INPUT_CLASS = 'w-full px-3 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-gold/30 dark:focus:ring-gold-dark/30 focus:border-gold dark:focus:border-gold-dark outline-none transition-all';

  const handleGenerate = useCallback(() => {
    setError('');
    if (!fullName.trim()) { setError('Vui lòng nhập họ tên đầy đủ.'); return; }
    const d = parseInt(day), m = parseInt(month), y = parseInt(year);
    if (isNaN(d) || d < 1 || d > 31) { setError('Ngày phải từ 1 đến 31.'); return; }
    if (isNaN(m) || m < 1 || m > 12) { setError('Tháng phải từ 1 đến 12.'); return; }
    if (isNaN(y) || y < 1900 || y > 2100) { setError('Năm phải từ 1900 đến 2100.'); return; }
    const testDate = new Date(y, m - 1, d);
    if (testDate.getFullYear() !== y || testDate.getMonth() !== m - 1 || testDate.getDate() !== d) { setError(`Ngày ${d}/${m}/${y} không hợp lệ.`); return; }

    setIsLoading(true);
    setTimeout(() => {
      try { setProfile(generateNumerologyProfile(fullName, testDate, system)); }
      catch (e) { setError(e instanceof Error ? e.message : 'Có lỗi xảy ra khi tính toán.'); }
      setIsLoading(false);
    }, 800);
  }, [fullName, day, month, year, system]);

  const isValid = fullName.trim() && day && month && year;
  const coreMeaning = profile ? CORE_MEANINGS[profile.lifePath.value] : null;

  return (
    <div className="space-y-6">

      {/* Input Form */}
      <form className="card-surface" onSubmit={(e) => { e.preventDefault(); handleGenerate(); }}>
        <div className="card-header">
          <div className="text-center w-full space-y-1">
            <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark flex items-center justify-center gap-2">
              <span className="material-icons-round text-2xl text-gold dark:text-gold-dark">tag</span>
              Thần Số Học
            </h2>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
              Khám phá bản đồ cuộc đời qua các con số — Pythagorean & Chaldean
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <div>
              <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1 flex items-center gap-2">
                <span>Họ và tên đầy đủ <span className="text-red-500">*</span></span>
                {profilePrefilled && (
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                    🎂 Đã điền từ hồ sơ
                  </span>
                )}
              </label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Nguyễn Văn An" className={INPUT_CLASS} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">Giới tính</label>
              <div className="flex rounded-lg border border-border-light dark:border-border-dark overflow-hidden h-[42px]">
                <button type="button" onClick={() => setGender('male')}
                  className={`px-4 text-sm font-medium transition-colors ${gender === 'male' ? 'bg-gold/15 dark:bg-gold-dark/15 text-gold dark:text-gold-dark' : 'bg-white dark:bg-gray-800 text-text-secondary-light dark:text-text-secondary-dark'}`}>
                  Nam
                </button>
                <button type="button" onClick={() => setGender('female')}
                  className={`px-4 text-sm font-medium transition-colors border-l border-border-light dark:border-border-dark ${gender === 'female' ? 'bg-gold/15 dark:bg-gold-dark/15 text-gold dark:text-gold-dark' : 'bg-white dark:bg-gray-800 text-text-secondary-light dark:text-text-secondary-dark'}`}>
                  Nữ
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
              Ngày sinh <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input type="number" value={day} onChange={e => setDay(e.target.value)} placeholder="Ngày" min="1" max="31" required className={`${INPUT_CLASS} text-center`} />
              <input type="number" value={month} onChange={e => setMonth(e.target.value)} placeholder="Tháng" min="1" max="12" required className={`${INPUT_CLASS} text-center`} />
              <input type="number" value={year} onChange={e => setYear(e.target.value)} placeholder="Năm" min="1900" max="2100" required className={`${INPUT_CLASS} text-center`} />
            </div>
            <p className="text-base text-text-secondary-light dark:text-text-secondary-dark mt-1 opacity-70">Ngày / Tháng / Năm</p>
          </div>

          <div className="flex gap-2">
            {([
              { id: 'pythagorean' as const, label: 'Pythagorean', desc: 'Phương Tây' },
              { id: 'chaldean' as const, label: 'Chaldean', desc: 'Cổ đại' },
            ]).map((s) => (
              <button key={s.id} type="button" onClick={() => setSystem(s.id)}
                className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium transition-all ${system === s.id
                  ? 'bg-gradient-to-r from-gold to-amber-600 dark:from-gold-dark dark:to-amber-500 text-white shadow-md shadow-gold/20'
                  : 'bg-gray-100 dark:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-200 dark:hover:bg-white/10'
                  }`}>
                <div className="font-bold">{s.label}</div>
                <div className="text-[10px] opacity-70">{s.desc}</div>
              </button>
            ))}
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400 flex items-start gap-2">
              <span className="material-icons-round text-base mt-0.5">error</span>{error}
            </div>
          )}

          <button type="submit" disabled={!isValid || isLoading}
            className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-gold to-amber-600 dark:from-gold-dark dark:to-amber-500 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2">
            {isLoading ? (
              <><span className="material-icons-round text-sm animate-spin" style={{ animationDuration: '2s' }}>auto_awesome</span> Đang phân tích...</>
            ) : (
              <><span className="material-icons-round text-sm">calculate</span> Phân Tích Thần Số Học</>
            )}
          </button>
        </div>
      </form>

      {/* Loading */}
      {isLoading && (
        <div className="card-surface min-h-[400px] flex flex-col items-center justify-center animate-fade-in-up">
          <PremiumLoader 
            messages={[
              'Đang nạp trường sinh năng lượng...',
              'Đang tính toán các chỉ số cốt lõi...',
              'Đang phân tích các giai đoạn đỉnh cao...',
              'Đang lập biểu đồ ngày sinh...',
              'Đang tổng hợp luận giải...'
            ]} 
          />
        </div>
      )}

      {/* Results */}
      {profile && !isLoading && (
        <div className="space-y-5 animate-fade-in-up" id="numerology-export-area">

          {/* TIER 1: Life Path & Destiny (Expression) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <CoreNumberCard number={profile.lifePath} index={0} variant="hero" />
            <CoreNumberCard number={profile.expression} index={1} variant="hero" />
          </div>

          {/* At-a-Glance Profile Summary */}
          <div className="glass-card p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary-light/50 dark:text-text-secondary-dark/40 mb-3 text-center">Tổng quan nhanh</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[
                { label: 'Đường Đời', labelEn: 'Life Path', num: profile.lifePath },
                { label: 'Biểu Đạt', labelEn: 'Expression', num: profile.expression },
                { label: 'Linh Hồn', labelEn: 'Soul Urge', num: profile.soulUrge },
                { label: 'Nhân Cách', labelEn: 'Personality', num: profile.personality },
                { label: 'Ngày Sinh', labelEn: 'Birthday', num: profile.birthday },
                { label: 'Trưởng Thành', labelEn: 'Maturity', num: profile.maturity },
              ].map((item) => (
                <div key={item.labelEn} className="text-center space-y-1">
                  <div className={`mx-auto w-10 h-10 rounded-xl flex items-center justify-center text-base font-black text-white ${item.num.masterNumber
                    ? 'bg-gradient-to-br from-amber-400 to-orange-500'
                    : item.num.karmicDebt
                      ? 'bg-gradient-to-br from-red-400 to-rose-500'
                      : 'bg-gradient-to-br from-gold/80 to-amber-600/80'
                    }`}>
                    {item.num.value}
                  </div>
                  <p className="text-[10px] font-semibold text-text-primary-light dark:text-text-primary-dark leading-tight">{item.label}</p>
                  <p className="text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/40">{item.labelEn}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TIER 2: Soul Urge & Personality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CoreNumberCard number={profile.soulUrge} index={2} variant="normal" />
            <CoreNumberCard number={profile.personality} index={3} variant="normal" />
          </div>

          {/* TIER 3: Supporting Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <CoreNumberCard number={profile.birthday} index={4} variant="compact" />
            <CoreNumberCard number={profile.maturity} index={5} variant="compact" />
          </div>

          {/* PDF Download Button & Share — Premium Action Bar */}
          <PremiumStickyActionBar>
            <PdfDownloadButton
              label="Tải Báo Cáo Thần Số Học (PDF)"
              onDownload={async (_pdfTier) => {
                const { downloadNumerologyPdf } = await import('../../services/pdf/numerologyPdfGenerator');
                await downloadNumerologyPdf(profile, profile.fullName);
              }}
            />
            <ShareButton targetId="numerology-export-area" fileName={`than-so-hoc-${profile.fullName || 'lich-viet'}`} className="flex-1 min-w-[140px]" />
          </PremiumStickyActionBar>

          {/* Section tabs — EngineTabNav with ProModeToggle in headerRight */}
          {(() => {
            const NUM_TABS: EngineTab[] = [
              { id: 'core', label: 'Số Cốt Lõi', icon: 'tag' },
              { id: 'analysis', label: 'Phân Tích', icon: 'insights' },
              { id: 'cycles', label: 'Chu Kỳ', icon: 'loop' },
            ];
            return (
              <EngineTabNav
                tabs={NUM_TABS}
                activeTab={activeSection}
                onTabChange={(id) => setActiveSection(id as 'core' | 'analysis' | 'cycles')}
                headerRight={<ProModeToggle isProMode={isProMode} onToggle={setIsProMode} label="Lưới số" />}
                className="mb-2"
              />
            );
          })()}

          {/* All Advanced Analysis — GATED: Partial Premium+ */}
          <ContentGate requiredTier="premium" sectionTitle="Phân Tích Nâng Cao" showBlurPreview>
            {/* Deep Analysis */}
            <CollapsibleCard title="Phân Tích Sâu" defaultOpen={defaultOpen('normal')}>
              <div className="p-4">
                <DeepAnalysisSection profile={profile} />
              </div>
            </CollapsibleCard>

            {/* Life Domains */}
            <CollapsibleCard title="Các Lĩnh Vực Cuộc Sống" defaultOpen={defaultOpen('normal')}>
              <div className="p-4">
                <LifeDomainSection profile={profile} />
              </div>
            </CollapsibleCard>


            {/* Number Interactions */}
            <CollapsibleCard title="Tương Tác Số" defaultOpen={defaultOpen('low')}>
              <div className="p-4">
                <NumberInteractionsSection profile={profile} />
              </div>
            </CollapsibleCard>

            {/* Birthday Grid — ELITE PRO MODE */}
            <div className="flex items-center justify-between mb-2 mt-4">
              <h3 className="text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark">Biểu Đồ Ngày Sinh</h3>
              <ProModeToggle isProMode={isProMode} onToggle={setIsProMode} label="Lưới số" />
            </div>
            {isProMode && hasAccess('elite') ? (
              <CollapsibleCard title="Biểu Đồ Ngày Sinh" defaultOpen={true}>
                <div className="p-4">
                  <EnhancedBirthdayGridView profile={profile} />
                </div>
              </CollapsibleCard>
            ) : (
              <div className="card-surface p-4 text-center text-sm text-text-secondary-light dark:text-text-secondary-dark">
                <span className="material-icons-round text-3xl text-gold/30 dark:text-gold-dark/30 mb-2 block" aria-hidden="true">grid_on</span>
                Bật Pro Mode để xem Biểu đồ ngày sinh Pythagoras
              </div>
            )}

            {/* Pinnacle & Challenge Timeline */}
            <CollapsibleCard title="Chu Kỳ Đỉnh Cao & Thử Thách" defaultOpen={defaultOpen('low')}>
              <div className="p-4">
                <PinnacleTimelineSection profile={profile} />
              </div>
            </CollapsibleCard>

            {/* Personal Cycle */}
            <CollapsibleCard title="Chu Kỳ Cá Nhân" defaultOpen={defaultOpen('low')}>
              <div className="p-4">
                <EnrichedPersonalCycleView profile={profile} />
              </div>
            </CollapsibleCard>

            {/* Karmic Debts & Master Numbers */}
            {(profile.karmicDebts.length > 0 || profile.masterNumbers.length > 0) && (
              <CollapsibleCard title="Nợ Nghiệp & Số Bậc Thầy" defaultOpen={defaultOpen('low')}>
                <div className="p-4">
                  <EnhancedKarmicMasterSection profile={profile} />
                </div>
              </CollapsibleCard>
            )}

          </ContentGate>

          {/* Footer */}
          <div className="text-center text-[10px] text-text-secondary-light/50 dark:text-text-secondary-dark/30 space-y-0.5">
            <p>{profile.fullName} · {profile.birthDate.toLocaleDateString('vi-VN')}</p>
            <p>Hệ thống: {profile.system === 'pythagorean' ? 'Pythagorean (Phương Tây)' : 'Chaldean (Cổ đại)'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
