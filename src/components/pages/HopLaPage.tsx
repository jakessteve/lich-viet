import React, { useState, useMemo, useRef, useEffect, Suspense } from 'react';
import { useAuthStore } from '../../stores/authStore';
import PersonInput, { type PersonData } from '../shared/PersonInput';
import SynergyRadar from '../shared/SynergyRadar';
import BondsScoreCard from '../shared/BondsScoreCard';
import { ContentGate } from '../shared/ContentGate';
import EngineTabNav, { type EngineTab } from '../shared/EngineTabNav';

const SocialShareCard = React.lazy(() => import('../shared/SocialShareCard'));

export default function HopLaPage() {
  const { user } = useAuthStore();
  const [personA, setPersonA] = useState<PersonData>({
    name: user?.displayName || 'Người A',
    birthYear: '', birthMonth: '', birthDay: '', birthHour: '', gender: 'male'
  });
  const [personB, setPersonB] = useState<PersonData>({
    name: 'Người B',
    birthYear: '', birthMonth: '', birthDay: '', birthHour: '', gender: 'female'
  });

  const [isEvaluating, setIsEvaluating] = useState(false);
  const [results, setResults] = useState<{
    tuvi: any;
    bazi: any;
    num: any;
    western: any;
    radarData: Record<string, number>;
  } | null>(null);

  const [synastryType, setSynastryType] = useState<string>('all');
  const [isFormCollapsed, setIsFormCollapsed] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (results) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [results]);

  const getVerdictBadge = (score: number) => {
    if (score >= 85) return <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg text-xs font-bold border border-emerald-500/20 shadow-sm">Tuyệt Vời</span>;
    if (score >= 70) return <span className="text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg text-xs font-bold border border-blue-500/20 shadow-sm">Hòa Hợp</span>;
    if (score >= 55) return <span className="text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg text-xs font-bold border border-amber-500/20 shadow-sm">Bình Hòa</span>;
    return <span className="text-red-600 dark:text-red-400 bg-red-500/10 px-2.5 py-1 rounded-lg text-xs font-bold border border-red-500/20 shadow-sm">Thử Thách</span>;
  };

  const SYNASTRY_AXES = [
    { key: 'tuvi', label: '🔯 Tử Vi' },
    { key: 'bazi', label: '🔥 Bát Tự' },
    { key: 'num', label: '🔢 Thần Số' },
    { key: 'western', label: '🌍 Chiêm Tinh' },
    { key: 'balance', label: '☯️ Ngũ Hành' },
  ];

  const TYPE_OPTIONS = [
    { id: 'all', label: 'Toàn Diện', icon: 'auto_awesome' },
    { id: 'tuvi', label: 'Tử Vi', icon: 'auto_awesome_mosaic' },
    { id: 'bazi', label: 'Bát Tự', icon: 'local_fire_department' },
    { id: 'num', label: 'Thần Số', icon: 'calculate' },
    { id: 'western', label: 'Chiêm Tinh', icon: 'public' }
  ];

  const handleEvaluate = async () => {
    // Basic validation
    if (!personA.birthYear || !personA.birthMonth || !personA.birthDay || !personA.birthHour) return alert('Vui lòng nhập đầy đủ thông tin Người A');
    if (!personB.birthYear || !personB.birthMonth || !personB.birthDay || !personB.birthHour) return alert('Vui lòng nhập đầy đủ thông tin Người B');

    setIsEvaluating(true);
    try {
      // Dynamic imports for heavy engines
      const [
        { computeTuViSynastry },
        { computeBaziSynastry },
        { computeNumerologySynastry },
        { computeWesternSynastry },
        { generateBaziChart }
      ] = await Promise.all([
        import('../../services/synastry/tuviSynastry'),
        import('../../services/synastry/baziSynastry'),
        import('../../services/synastry/numerologySynastry'),
        import('../../services/synastry/westernSynastry'),
        import('../../utils/baziEngine')
      ]);

      const dobA = new Date(parseInt(personA.birthYear), parseInt(personA.birthMonth) - 1, parseInt(personA.birthDay));
      const dobB = new Date(parseInt(personB.birthYear), parseInt(personB.birthMonth) - 1, parseInt(personB.birthDay));
      const hA = parseInt(personA.birthHour);
      const hB = parseInt(personB.birthHour);

      // Convert hour (0-23) to chi index (0-11) approx: Tý is 23-1, Sửu 1-3...
      const getHourIndex = (h: number) => Math.floor(((h + 1) % 24) / 2);
      const hIndexA = getHourIndex(hA);
      const hIndexB = getHourIndex(hB);

      // 1. Tử Vi
      let tuvi = null;
      if (synastryType === 'all' || synastryType === 'tuvi') {
        tuvi = computeTuViSynastry(dobA, hIndexA, personA.gender, dobB, hIndexB, personB.gender);
      }

      // 2. Bát Tự
      let bazi = null;
      if (synastryType === 'all' || synastryType === 'bazi') {
        const chartA = generateBaziChart(dobA, hA, personA.gender === 'male');
        const chartB = generateBaziChart(dobB, hB, personB.gender === 'male');
        bazi = computeBaziSynastry(chartA, chartB, personA.gender, personB.gender);
      }

      // 3. Thần Số Học
      let num = null;
      if (synastryType === 'all' || synastryType === 'num') {
        num = computeNumerologySynastry(dobA, dobB);
      }

      // 4. Chiêm Tinh
      let western = null;
      if (synastryType === 'all' || synastryType === 'western') {
        western = computeWesternSynastry(dobA, dobB, hA, hB);
      }

      // Normalize scores for radar
      const normalize = (score: number, max: number) => Math.round(Math.max(0, Math.min(100, 50 + (score / max) * 50)));
      
      const radarData: Record<string, number> = {};
      if (synastryType === 'all') {
        radarData.tuvi = normalize(tuvi!.totalScore, 15);
        radarData.bazi = normalize(bazi!.totalScore, bazi!.maxScore || 100);
        radarData.num = normalize(num!.totalScore, 10);
        radarData.western = normalize(western!.score, 15);
        radarData.balance = normalize(tuvi!.totalScore * 0.5 + bazi!.totalScore * 0.5, 20);
      }

      setResults({ tuvi, bazi, num, western, radarData });
      setIsFormCollapsed(true);
    } catch (e) {
      console.error(e);
      alert('Đã có lỗi xảy ra khi tính toán.');
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="mystery-bg max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in relative grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-4rem)] auto-rows-min pb-24 lg:pb-8">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div className="mystery-orb mystery-orb-purple w-[800px] h-[800px] top-0 right-0 -translate-y-1/3 translate-x-1/4" />
        <div className="mystery-orb mystery-orb-gold w-[600px] h-[600px] bottom-0 left-0 translate-y-1/4 -translate-x-1/4" />
      </div>

      <div className="col-span-1 lg:col-span-12">
        <div className="flex flex-col items-center justify-center text-center w-full space-y-1 mb-8">
          <h2 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark flex items-center justify-center gap-2">
            <span className="material-icons-round text-xl text-primary-light dark:text-primary-dark">favorite</span>
            Tương Hợp & Kết Nối
          </h2>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            Khám phá mức độ đồng điệu giữa hai người trên nhiều khía cạnh: Tử Vi, Bát Tự, Chiêm Tinh và Thần Số Học.
          </p>
        </div>

        {/* Input Cards */}
        {isFormCollapsed && (
          <div className="flex justify-center mb-8">
            <button 
              onClick={() => setIsFormCollapsed(false)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full glass-card hover-lift text-sm font-semibold text-text-primary-light dark:text-text-primary-dark shadow-sm bg-white/50 dark:bg-black/20 border border-primary-light/10 dark:border-primary-dark/10"
            >
              <span className="material-icons-round text-lg text-purple-500">edit</span>
              Đang xem: {personA.name || 'Người A'} & {personB.name || 'Người B'} - <span className="underline opacity-70">Sửa</span>
            </button>
          </div>
        )}
        <div className={`grid grid-cols-1 gap-6 max-w-3xl mx-auto transition-all duration-500 origin-top overflow-hidden ${isFormCollapsed ? 'max-h-0 opacity-0 mb-0 scale-y-95' : 'max-h-[1200px] opacity-100 mb-8 scale-y-100'}`}>
          <div className="glass-card-strong hover-lift p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-light/10 dark:bg-primary-dark/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary-light/20 dark:group-hover:bg-primary-dark/20 transition-colors duration-500" />
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6 text-text-primary-light dark:text-text-primary-dark mystery-text-glow">
              <span className="w-8 h-8 rounded-full bg-primary-light/15 dark:bg-primary-dark/20 text-primary-light dark:text-primary-dark flex items-center justify-center text-sm font-bold ring-1 ring-primary-light/30 dark:ring-primary-dark/30 shadow-sm">A</span>
              Người thứ nhất
            </h2>
            <div className="relative z-10">
              <PersonInput
                label=""
                icon=""
                showName
                person={personA}
                onChange={setPersonA}
              />
            </div>
          </div>

          <div className="glass-card-strong hover-lift p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/20 dark:group-hover:bg-purple-500/30 transition-colors duration-500" />
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6 text-text-primary-light dark:text-text-primary-dark mystery-text-glow">
              <span className="w-8 h-8 rounded-full bg-purple-500/15 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center text-sm font-bold ring-1 ring-purple-500/30 shadow-sm">B</span>
              Người thứ hai
            </h2>
            <div className="relative z-10">
              <PersonInput
                label=""
                icon=""
                showName
                person={personB}
                onChange={setPersonB}
              />
            </div>
          </div>
        </div>

        {/* Evaluate Button */}
        {!isFormCollapsed && (
          <div className="flex justify-center mb-12 relative group z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-purple-600 dark:from-primary-dark dark:to-purple-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse-glow" />
            <button
              onClick={handleEvaluate}
              disabled={isEvaluating}
              className="btn-interact hover-lift relative flex items-center justify-center px-10 py-4 font-bold text-white transition-all bg-gradient-to-r from-primary-light to-purple-600 dark:from-primary-dark dark:to-purple-500 rounded-2xl shadow-apple disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden ring-1 ring-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute inset-0 glass-shimmer pointer-events-none z-0" />
              <span className={`material-icons-round mr-2 relative z-10 ${isEvaluating ? 'animate-spin' : ''}`}>
                {isEvaluating ? 'sync' : 'auto_awesome'}
              </span>
              <span className="relative z-10 text-base tracking-wide mystery-text-glow">
                {isEvaluating ? 'Đang phân tích...' : 'Xem Mức Độ Hợp Nhau'}
              </span>
            </button>
          </div>
        )}

        {/* Results Section */}
        {results ? (
          <div ref={resultsRef} className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8 scroll-mt-24">
            
            {/* Gamified Score Hero Card — only for comprehensive analysis */}
            {synastryType === 'all' && Object.keys(results.radarData).length > 0 && (
              <BondsScoreCard
                radarData={results.radarData}
                nameA={personA.name || 'Người A'}
                nameB={personB.name || 'Người B'}
                tuvi={results.tuvi}
                bazi={results.bazi}
                num={results.num}
                western={results.western}
              />
            )}

            {/* Shareable Bonds Card — share your compatibility score */}
            {synastryType === 'all' && Object.keys(results.radarData).length > 0 && (() => {
              const avgScore = Math.round(Object.values(results.radarData).reduce((a: number, b: number) => a + b, 0) / Object.keys(results.radarData).length);
              return (
              <ContentGate requiredTier="premium" sectionTitle="Chia Sẻ Kết Quả" showBlurPreview>
                <Suspense fallback={null}>
                  <SocialShareCard
                    title="Tương Hợp"
                    titleEmoji="💕"
                    insight={`${personA.name || 'Người A'} & ${personB.name || 'Người B'} — Mức độ đồng điệu toàn diện`}
                    score={avgScore}
                    subtitle={avgScore >= 70 ? 'Rất Hòa Hợp' : 'Bình Hòa'}
                    theme="purple"
                    fileName={`hop-la-${personA.name}-${personB.name}`}
                  />
                </Suspense>
              </ContentGate>
              );
            })()}

            {/* Synastry Type Selector — unified EngineTabNav */}
            {(() => {
              const HOP_LA_TABS: EngineTab[] = TYPE_OPTIONS.map((opt) => ({
                id: opt.id,
                label: opt.label,
                icon: opt.icon,
              }));
              return (
                <EngineTabNav
                  tabs={HOP_LA_TABS}
                  activeTab={synastryType}
                  onTabChange={setSynastryType}
                  className="mb-4"
                />
              );
            })()}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Left Column: Radar (Only if ALL is selected) */}
              {synastryType === 'all' && (
                <div className="lg:col-span-1 glass-card p-6 sticky top-24 shadow-apple mystery-glow-border hover-depth">
                  <h3 className="text-xl font-bold mb-6 text-center text-text-primary-light dark:text-text-primary-dark mystery-text-glow">
                    Mức độ tương hợp chung
                  </h3>
                  <div className="h-[350px] w-full">
                    <SynergyRadar data={results.radarData} axes={SYNASTRY_AXES} />
                  </div>
                  
                  {/* Aggregate overall score */}
                  <div className="mt-6 text-center p-4 rounded-2xl bg-gradient-to-br from-primary-light/10 to-transparent border border-primary-light/20">
                    <b className="block text-3xl text-primary-light dark:text-primary-dark font-display mb-1">
                      {Math.round(Object.values(results.radarData).reduce((acc: number, val: number) => acc + val, 0) / 5)}%
                    </b>
                    <span className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Đồng điệu toàn diện</span>
                  </div>
                </div>
              )}

              {/* Right Column: Detailed Engine Cards — PREMIUM GATED */}
              <ContentGate requiredTier="premium" sectionTitle="Phân Tích Chi Tiết Từng Bảng" showBlurPreview>
              <div className={`space-y-6 ${synastryType === 'all' ? 'lg:col-span-2' : 'lg:col-span-3 max-w-4xl mx-auto w-full'}`}>
                {/* Tử Vi Card */}
                {results.tuvi && (
                  <div className="glass-card mystery-glow-border hover-depth p-6 relative group border-t border-t-blue-500/10">
                    <div className="flex items-start justify-between mb-5 relative z-10 gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center ring-1 ring-blue-500/20 shrink-0">
                          <span className="material-icons-round text-blue-500">auto_awesome</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">Tử Vi Đẩu Số</h3>
                          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Cung Phu Thê</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-display font-medium text-text-primary-light dark:text-text-primary-dark leading-none">{results.radarData['tuvi'] || '-'}</span>
                          <span className="text-xs text-text-secondary-light">/100</span>
                        </div>
                        {getVerdictBadge(results.radarData['tuvi'] || 0)}
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl card-subtle mb-4">
                      <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark leading-relaxed">{results.tuvi.detail}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                      <div className="flex flex-col gap-1">
                        <span className="opacity-70 text-[10px] uppercase font-bold tracking-wider text-text-secondary-light">Lá Số A</span>
                        <div className="text-sm bg-white/40 dark:bg-black/20 p-3 rounded-lg border border-border-light/40 dark:border-border-dark/40">{results.tuvi.phuTheSummaryA}</div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="opacity-70 text-[10px] uppercase font-bold tracking-wider text-text-secondary-light">Lá Số B</span>
                        <div className="text-sm bg-white/40 dark:bg-black/20 p-3 rounded-lg border border-border-light/40 dark:border-border-dark/40">{results.tuvi.phuTheSummaryB}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bát Tự Card */}
                {results.bazi && (
                  <div className="glass-card mystery-glow-border hover-depth p-6 relative group border-t border-t-red-500/10">
                    <div className="flex items-start justify-between mb-5 relative z-10 gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center ring-1 ring-red-500/20 shrink-0">
                          <span className="material-icons-round text-red-500">local_fire_department</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">Bát Tự Hợp Hôn</h3>
                          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Thiên Can Địa Chi</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-display font-medium text-text-primary-light dark:text-text-primary-dark leading-none">{results.radarData['bazi'] || '-'}</span>
                          <span className="text-xs text-text-secondary-light">/100</span>
                        </div>
                        {getVerdictBadge(results.radarData['bazi'] || 0)}
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl card-subtle mb-4">
                      <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark leading-relaxed">{results.bazi.detail}</p>
                    </div>

                    <div className="space-y-2.5">
                      {results.bazi.layers.slice(0, 4).map((layer: any, idx: number) => (
                        <div key={idx} className="flex gap-3 text-sm items-start bg-white/40 dark:bg-black/20 p-2.5 rounded-lg border border-border-light/40 dark:border-border-dark/40">
                          <span className="material-icons-round text-[18px] text-red-500/80 mt-0.5 shrink-0">check_circle</span>
                          <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">{layer.detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Thần Số Học Card */}
                {results.num && (
                  <div className="glass-card mystery-glow-border hover-depth p-6 relative group border-t border-t-emerald-500/10">
                    <div className="flex items-start justify-between mb-5 relative z-10 gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center ring-1 ring-emerald-500/20 shrink-0">
                          <span className="material-icons-round text-emerald-500">calculate</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">Thần Số Học</h3>
                          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Pythagoras</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-display font-medium text-text-primary-light dark:text-text-primary-dark leading-none">{results.radarData['num'] || '-'}</span>
                          <span className="text-xs text-text-secondary-light">/100</span>
                        </div>
                        {getVerdictBadge(results.radarData['num'] || 0)}
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl card-subtle mb-2">
                      <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark leading-relaxed">{results.num.detail}</p>
                    </div>
                  </div>
                )}

                {/* Chiêm Tinh Card */}
                {results.western && (
                  <div className="glass-card mystery-glow-border hover-depth p-6 relative group border-t border-t-indigo-500/10">
                    <div className="flex items-start justify-between mb-5 relative z-10 gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center ring-1 ring-indigo-500/20 shrink-0">
                          <span className="material-icons-round text-indigo-500">public</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">Chiêm Tinh Học</h3>
                          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Western Synastry</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-display font-medium text-text-primary-light dark:text-text-primary-dark leading-none">{results.radarData['western'] || '-'}</span>
                          <span className="text-xs text-text-secondary-light">/100</span>
                        </div>
                        {getVerdictBadge(results.radarData['western'] || 0)}
                      </div>
                    </div>
                    
                    <div className="space-y-2.5 mb-2">
                      {results.western.aspects.sort((a: any, b: any) => Math.abs(b.score) - Math.abs(a.score)).slice(0, 4).map((asp: any, idx: number) => (
                        <div key={idx} className="flex gap-3 text-sm items-start bg-white/40 dark:bg-black/20 p-2.5 rounded-lg border border-border-light/40 dark:border-border-dark/40">
                          <span className="material-icons-round text-[18px] text-indigo-500/80 mt-0.5 shrink-0">flare</span>
                          <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
                            {asp.description} <span className="opacity-60">(Sai số: {asp.orb}°)</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
              </ContentGate>
            </div>
          </div>
        ) : (
          !isEvaluating && (
            <div className="flex flex-col items-center justify-center py-24 opacity-70 animate-fade-in-up">
              <div className="w-40 h-40 rounded-full border border-primary-light/10 dark:border-primary-dark/10 flex items-center justify-center mb-6 relative">
                 <div className="absolute inset-4 rounded-full border border-dashed border-primary-light/20 dark:border-primary-dark/20 animate-[spin_8s_linear_infinite]"></div>
                 <div className="absolute inset-8 rounded-full border border-dashed border-purple-500/20 animate-[spin_5s_linear_infinite_reverse]"></div>
                 <span className="material-icons-round text-5xl text-primary-light/40 dark:text-primary-dark/40 animate-pulse">auto_awesome</span>
              </div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark font-medium px-4 text-center max-w-sm text-balance">
                Điền thông tin của bạn và đối phương để khám phá độ đồng điệu qua hệ thống thuật số phương Đông và phương Tây.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
