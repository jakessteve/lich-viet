/**
 * DungSuView — Wizard-based page orchestrator for Lịch Dụng Sự
 * UX Redesign: 3-step wizard → Intent → Activity → Results Dashboard
 * All 13 scoring engines preserved. Progressive disclosure with tabs.
 */

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { ContentGate } from '../shared/ContentGate';
import { DayDetailsData } from '../../types/calendar';
import type { Chi } from '../../types/calendar';
import { scoreActivity, ActivityScoreResult } from '@lich-viet/core/dungsu';
import { getActivityById, mapDungSuToActivityIds } from '@lich-viet/core/dungsu';
import CollapsibleCard from '../CollapsibleCard';
import ActivityPicker from './ActivityPicker';

import GroupedBreakdown from './GroupedBreakdown';
import BestTimesPanel from './BestTimesPanel';
import QmdjChartWidget from './QmdjChartWidget';
import FAQIntentCards, { type FAQIntent, FAQ_CARDS } from './FAQIntentCards';
import PersonInput, { type PersonData } from '../shared/PersonInput';

import { generateBaziChart } from '../../utils/baziEngine';
import { computeBaziSynastry, type BaziSynastryResult } from '../../services/synastry/baziSynastry';
import { computeTuViSynastry, type TuViSynastryResult } from '../../services/synastry/tuviSynastry';
import { computeNumerologySynastry, type NumerologySynastryResult } from '../../services/synastry/numerologySynastry';
import { computeWesternSynastry, type WesternSynastryResult } from '../../services/synastry/westernSynastry';
import TrungTangPanel from './TrungTangPanel';
import SynergyRadar, { type RadarData } from '../shared/SynergyRadar';
import WeddingCalendarView from './WeddingCalendarView';
import GraveDirectionPanel from './GraveDirectionPanel';

// New UX components
import VerdictBanner from './VerdictBanner';
import ResultTabs from './ResultTabs';
import HourPickerGrid from './HourPickerGrid';

interface DungSuViewProps {
  selectedDate: Date;
  data: DayDetailsData;
  onSelectDate: (date: Date) => void;
}

const CHI_LIST: Chi[] = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'] as Chi[];

function hourToChi(hour: number): Chi {
  const chiIndex = Math.floor(((hour + 1) % 24) / 2);
  return CHI_LIST[chiIndex];
}

function yearToChi(year: number): Chi {
  const idx = (((year - 4) % 12) + 12) % 12;
  return CHI_LIST[idx];
}

const EMPTY_PERSON: PersonData = {
  name: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  birthHour: '',
  gender: 'male',
};

const DungSuView: React.FC<DungSuViewProps> = ({ selectedDate, data, onSelectDate }) => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<Chi | null>(null);
  const [birthYear, setBirthYear] = useState<string>('');
  const [selectedIntent, setSelectedIntent] = useState<FAQIntent | null>(null);

  // Active tab state
  const [activeResultTab, setActiveResultTab] = useState('overview');

  // Person A & B for synastry
  const [personA, setPersonA] = useState<PersonData>({ ...EMPTY_PERSON, gender: 'male' });
  const [personB, setPersonB] = useState<PersonData>({ ...EMPTY_PERSON, gender: 'female' });

  // Date/time input fields — synced with selectedDate
  const [inputDay, setInputDay] = useState(selectedDate.getDate().toString());
  const [inputMonth, setInputMonth] = useState((selectedDate.getMonth() + 1).toString());
  const [inputYear, setInputYear] = useState(selectedDate.getFullYear().toString());
  const [inputHour, setInputHour] = useState('');

  // Ref for auto-scroll to results
  const resultRef = useRef<HTMLDivElement>(null);

  // Sync input fields when sidebar calendar changes the selectedDate
  useEffect(() => {
    setInputDay(selectedDate.getDate().toString());
    setInputMonth((selectedDate.getMonth() + 1).toString());
    setInputYear(selectedDate.getFullYear().toString());
  }, [selectedDate]);

  // Does the selected intent need a second person?
  const needsSecondPerson = useMemo(() => {
    if (!selectedIntent) return false;
    return FAQ_CARDS.find(c => c.id === selectedIntent)?.needsSecondPerson ?? false;
  }, [selectedIntent]);

  // Compute birth year Chi for Kị Tuổi scoring
  const birthYearChi = useMemo(() => {
    const y = parseInt(birthYear, 10);
    if (!y || y < 1900 || y > 2100) return undefined;
    return yearToChi(y);
  }, [birthYear]);

  // Sync birthYear from personA when FAQ intent is selected
  useEffect(() => {
    if (selectedIntent && personA.birthYear) {
      setBirthYear(personA.birthYear);
    }
  }, [selectedIntent, personA.birthYear]);

  // Apply date/time input — runs whenever fields change
  const applyDateInput = useCallback(() => {
    const d = parseInt(inputDay, 10);
    const m = parseInt(inputMonth, 10);
    const y = parseInt(inputYear, 10);
    if (!d || !m || !y || d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > 2100) return;

    const newDate = new Date(y, m - 1, d);
    if (newDate.getDate() !== d || newDate.getMonth() !== m - 1) return;

    if (newDate.getTime() !== selectedDate.getTime()) {
      onSelectDate(newDate);
    }

    const h = parseInt(inputHour, 10);
    if (!isNaN(h) && h >= 0 && h <= 23) {
      setSelectedHour(hourToChi(h));
    }
  }, [inputDay, inputMonth, inputYear, inputHour, selectedDate, onSelectDate]);

  useEffect(() => {
    const timer = setTimeout(applyDateInput, 300);
    return () => clearTimeout(timer);
  }, [applyDateInput]);

  const activityData = useMemo(() => {
    if (!selectedActivity) return null;
    return getActivityById(selectedActivity);
  }, [selectedActivity]);

  // Map raw Nghi/Kỵ strings to catalog activity IDs
  const { suitableIds, unsuitableIds } = useMemo(
    () => mapDungSuToActivityIds(data.dungSu.suitable, data.dungSu.unsuitable),
    [data.dungSu.suitable, data.dungSu.unsuitable],
  );

  // === SYNASTRY COMPUTATIONS (unchanged) ===
  const synastryResult: BaziSynastryResult | undefined = useMemo(() => {
    if (!needsSecondPerson) return undefined;
    const yA = parseInt(personA.birthYear, 10);
    const mA = parseInt(personA.birthMonth, 10);
    const dA = parseInt(personA.birthDay, 10);
    const hA = parseInt(personA.birthHour, 10) || 12;
    const yB = parseInt(personB.birthYear, 10);
    const mB = parseInt(personB.birthMonth, 10);
    const dB = parseInt(personB.birthDay, 10);
    const hB = parseInt(personB.birthHour, 10) || 12;
    if (!yA || !mA || !dA || !yB || !mB || !dB) return undefined;
    if (yA < 1900 || yA > 2100 || yB < 1900 || yB > 2100) return undefined;
    try {
      const chartA = generateBaziChart(new Date(yA, mA - 1, dA), hA, personA.gender === 'male');
      const chartB = generateBaziChart(new Date(yB, mB - 1, dB), hB, personB.gender === 'male');
      return computeBaziSynastry(chartA, chartB, personA.gender, personB.gender);
    } catch { return undefined; }
  }, [needsSecondPerson, personA, personB]);

  const tuviSynastryResult: TuViSynastryResult | undefined = useMemo(() => {
    if (!needsSecondPerson) return undefined;
    const yA = parseInt(personA.birthYear, 10);
    const mA = parseInt(personA.birthMonth, 10);
    const dA = parseInt(personA.birthDay, 10);
    const hA = parseInt(personA.birthHour, 10);
    const yB = parseInt(personB.birthYear, 10);
    const mB = parseInt(personB.birthMonth, 10);
    const dB = parseInt(personB.birthDay, 10);
    const hB = parseInt(personB.birthHour, 10);
    if (!yA || !mA || !dA || !yB || !mB || !dB) return undefined;
    if (yA < 1900 || yA > 2100 || yB < 1900 || yB > 2100) return undefined;
    try {
      const hourIdxA = !isNaN(hA) ? Math.floor(((hA + 1) % 24) / 2) : 6;
      const hourIdxB = !isNaN(hB) ? Math.floor(((hB + 1) % 24) / 2) : 6;
      return computeTuViSynastry(
        new Date(yA, mA - 1, dA), hourIdxA, personA.gender as 'male' | 'female',
        new Date(yB, mB - 1, dB), hourIdxB, personB.gender as 'male' | 'female',
      );
    } catch { return undefined; }
  }, [needsSecondPerson, personA, personB]);

  const numerologySynastryResult: NumerologySynastryResult | undefined = useMemo(() => {
    if (!needsSecondPerson) return undefined;
    const yA = parseInt(personA.birthYear, 10);
    const mA = parseInt(personA.birthMonth, 10);
    const dA = parseInt(personA.birthDay, 10);
    const yB = parseInt(personB.birthYear, 10);
    const mB = parseInt(personB.birthMonth, 10);
    const dB = parseInt(personB.birthDay, 10);
    if (!yA || !mA || !dA || !yB || !mB || !dB) return undefined;
    if (yA < 1900 || yA > 2100 || yB < 1900 || yB > 2100) return undefined;
    try {
      return computeNumerologySynastry(new Date(yA, mA - 1, dA), new Date(yB, mB - 1, dB));
    } catch { return undefined; }
  }, [needsSecondPerson, personA, personB]);

  const westernSynastryResult: WesternSynastryResult | undefined = useMemo(() => {
    if (!needsSecondPerson) return undefined;
    const yA = parseInt(personA.birthYear, 10);
    const mA = parseInt(personA.birthMonth, 10);
    const dA = parseInt(personA.birthDay, 10);
    const yB = parseInt(personB.birthYear, 10);
    const mB = parseInt(personB.birthMonth, 10);
    const dB = parseInt(personB.birthDay, 10);
    if (!yA || !mA || !dA || !yB || !mB || !dB) return undefined;
    if (yA < 1900 || yA > 2100 || yB < 1900 || yB > 2100) return undefined;
    try {
      return computeWesternSynastry(new Date(yA, mA - 1, dA), new Date(yB, mB - 1, dB));
    } catch { return undefined; }
  }, [needsSecondPerson, personA, personB]);

  // === SCORING ===
  const result: ActivityScoreResult | null = useMemo(() => {
    if (!selectedActivity) return null;
    return scoreActivity(selectedActivity, data, selectedHour || undefined, birthYearChi, synastryResult, tuviSynastryResult, numerologySynastryResult, westernSynastryResult);
  }, [selectedActivity, data, selectedHour, birthYearChi, synastryResult, tuviSynastryResult, numerologySynastryResult, westernSynastryResult]);

  // Compute radar data from breakdown
  const radarData: RadarData | null = useMemo(() => {
    if (!result) return null;
    const bd = result.breakdown;
    const sum = (factors: string[]) => {
      const items = bd.filter(b => factors.includes(b.factor));
      if (items.length === 0) return 50;
      const total = items.reduce((s, i) => s + i.value, 0);
      const max = items.reduce((s, i) => s + Math.abs(i.maxValue), 0);
      return max > 0 ? Math.round(((total + max) / (2 * max)) * 100) : 50;
    };
    return {
      day: sum(['truc', 'stars', 'dayGrade', 'hour']),
      compat: sum(['kiTuoi', 'napAm', 'baziSynastry', 'tuviSynastry', 'numerologySynastry', 'westernSynastry']),
      cosmic: sum(['qmdj', 'thaiAt']),
      safety: 75,
      synergy: result.percentage,
    };
  }, [result]);

  // Compute all-hours scores for HourPickerGrid
  const allHourScores = useMemo(() => {
    if (!selectedActivity) return undefined;
    return data.allHours.map(h => {
      const hResult = scoreActivity(selectedActivity, data, h.canChi.chi as Chi, birthYearChi, synastryResult, tuviSynastryResult, numerologySynastryResult, westernSynastryResult);
      return { hourInfo: h, activityScore: hResult.percentage };
    });
  }, [selectedActivity, data, birthYearChi, synastryResult, tuviSynastryResult, numerologySynastryResult, westernSynastryResult]);

  // === HANDLERS ===
  const handleSelectActivity = useCallback((activityId: string) => {
    setSelectedActivity(activityId || null);
    if (activityId) {
      setActiveResultTab('overview');
      // Scroll to results after render
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

  const handleSelectIntent = useCallback((intent: FAQIntent) => {
    setSelectedIntent(prev => prev === intent ? null : intent);
    // Auto-select a relevant activity for certain intents
    if (intent === 'chon-ngay-cuoi') setSelectedActivity('cuoi-hoi');
    else if (intent === 'tang-le') setSelectedActivity('chon-cat');
    else if (intent === 'xem-ngay') setSelectedActivity(null);
  }, []);

  const handleHourSelect = useCallback((chi: Chi | null) => {
    setSelectedHour(chi);
    if (chi) {
      const idx = CHI_LIST.indexOf(chi);
      setInputHour((idx * 2 + 23) % 24 + ''); // approximate start hour
    } else {
      setInputHour('');
    }
  }, []);

  // Determine Hoàng/Hắc Đạo
  const dayType = useMemo(() => {
    // Check from hour data — if more auspicious hours than not, it's likely Hoàng Đạo
    const auspicious = data.allHours.filter(h => h.isAuspicious).length;
    return auspicious >= 6 ? 'Hoàng Đạo' : 'Hắc Đạo';
  }, [data.allHours]);

  const lunarDateStr = `${data.lunarDate.day}/${data.lunarDate.month}/${data.lunarDate.year} — ${data.canChi.day.can} ${data.canChi.day.chi}`;

  // Best hour info for verdict
  const bestHourInfo = useMemo(() => {
    if (!result?.bestHours?.length) return undefined;
    return {
      chi: result.bestHours[0].hourInfo.canChi.chi,
      score: result.bestHours[0].activityScore,
    };
  }, [result]);

  const solarDateStr = selectedDate.toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const inputFieldClass =
    'w-full px-2.5 py-2 text-center rounded-lg bg-surface-subtle-light dark:bg-white/10 border border-border-light dark:border-border-dark text-sm font-medium text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-gold/50 dark:focus:ring-gold-dark/50 tabular-nums transition-all';

  // === RENDER ===
  return (
    <div className="w-full space-y-4 animate-in fade-in duration-500" data-testid="dung-su-view">
      {/* ══════════ Unified Input Section ══════════ */}
      <div className="space-y-4 transition-all duration-300">
        
        {/* ══════════ Combined Intent & Activity Selector ══════════ */}
        <div className="rounded-xl border border-border-light dark:border-border-dark overflow-hidden shadow-sm bg-white dark:bg-black/20 transition-all duration-500">
          
          {/* Top Half: FAQ Intent Cards */}
          <div className={`p-4 sm:p-5 ${selectedIntent === 'xem-ngay' ? 'border-b border-border-light/30 dark:border-border-dark/30' : ''} bg-surface-subtle-light/30 dark:bg-white/5 transition-all duration-300`}>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-icons-round text-base text-gold dark:text-gold-dark">explore</span>
              <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider">
                Bạn muốn tra cứu gì?
              </p>
            </div>
            <FAQIntentCards selectedIntent={selectedIntent} onSelectIntent={handleSelectIntent} />
          </div>

          {/* Bottom Half: Activity Picker (Contextually Hidden) */}
          {selectedIntent === 'xem-ngay' && (
            <div className="p-4 sm:p-5 animate-in slide-in-from-top-2 fade-in duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="material-icons-round text-base text-gold dark:text-gold-dark">checklist</span>
                  <span className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark">Chọn việc cần làm cụ thể</span>
                </div>
                {activityData && (
                  <span className="text-xs font-medium text-gold dark:text-gold-dark bg-gold/10 dark:bg-gold-dark/10 px-2 py-0.5 rounded-full">
                    ✓ {activityData.nameVi}
                  </span>
                )}
              </div>
              <ActivityPicker
                selectedActivity={selectedActivity}
                onSelectActivity={handleSelectActivity}
                suitableActivities={suitableIds}
                unsuitableActivities={unsuitableIds}
                filterByIntent={selectedIntent}
              />
            </div>
          )}
        </div>

        {/* Person Input — shown for synastry intents */}
          {needsSecondPerson && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <PersonInput
                label="Người A (bạn)"
                icon="👤"
                person={personA}
                onChange={setPersonA}
                showName
                compact
              />
              <PersonInput
                label="Người B (đối phương)"
                icon="💑"
                person={personB}
                onChange={setPersonB}
                showName
                compact
              />
            </div>
          )}

          {/* Synastry Quick Result */}
          {synastryResult && (
            <div className={`flex items-center gap-3 p-3 rounded-xl border animate-in fade-in duration-300 ${
              synastryResult.compatibility === 'excellent' || synastryResult.compatibility === 'good'
                ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800'
                : synastryResult.compatibility === 'poor' || synastryResult.compatibility === 'caution'
                  ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
                  : 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800'
            }`}>
              <span className="text-2xl">
                {synastryResult.compatibility === 'excellent' ? '✨' :
                 synastryResult.compatibility === 'good' ? '✅' :
                 synastryResult.compatibility === 'neutral' ? '➖' :
                 synastryResult.compatibility === 'caution' ? '⚠️' : '❌'}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark">
                  {synastryResult.detail}
                </p>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
                  {synastryResult.layers.map(l => `${l.label}: ${l.score > 0 ? '+' : ''}${l.score}`).join(' · ')}
                </p>
              </div>
            </div>
          )}

          {/* Tang Le panels: Trùng Tang + Grave Direction */}
          {selectedIntent === 'tang-le' && (
            <TrungTangPanel
                deceasedBirthYear={personA.birthYear}
                deceasedGender={personA.gender as 'male' | 'female'}
                funeralDayChi={data.canChi?.day?.chi || ''}
              />
          )}

          {/* Date & Time Input — compact inline */}
          <div className="rounded-xl border border-border-light dark:border-border-dark overflow-hidden">
            <div className="px-4 py-2.5 border-b border-border-light/30 dark:border-border-dark/30 flex items-center gap-2">
              <span className="material-icons-round text-base text-gold dark:text-gold-dark">event</span>
              <span className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark">Chọn ngày giờ dự kiến</span>
            </div>
            <div className="p-3 space-y-3">
              <div className="grid grid-cols-5 gap-2 items-end">
                {/* Day */}
                <div>
                  <label className="block text-[10px] font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-1">Ngày</label>
                  <input type="number" min={1} max={31} value={inputDay} onChange={e => setInputDay(e.target.value)} className={inputFieldClass} />
                </div>
                {/* Month */}
                <div>
                  <label className="block text-[10px] font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-1">Tháng</label>
                  <input type="number" min={1} max={12} value={inputMonth} onChange={e => setInputMonth(e.target.value)} className={inputFieldClass} />
                </div>
                {/* Year */}
                <div>
                  <label className="block text-[10px] font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-1">Năm</label>
                  <input type="number" min={1900} max={2100} value={inputYear} onChange={e => setInputYear(e.target.value)} className={inputFieldClass} />
                </div>
                {/* Hour */}
                <div>
                  <label className="block text-[10px] font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-1">Giờ</label>
                  <input type="number" min={0} max={23} placeholder="--" value={inputHour} onChange={e => setInputHour(e.target.value)} className={inputFieldClass} />
                </div>
                {/* Birth Year */}
                {!needsSecondPerson && (
                  <div>
                    <label className="block text-[10px] font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-1">Năm sinh</label>
                    <input type="number" min={1900} max={2100} placeholder="--" value={birthYear} onChange={e => setBirthYear(e.target.value)} className={inputFieldClass} />
                  </div>
                )}
              </div>

              {/* Lunar date summary — compact */}
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-surface-subtle-light dark:bg-white/5 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                <span className="material-icons-round text-sm text-gold dark:text-gold-dark">today</span>
                <span className="capitalize">{solarDateStr}</span>
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <span>Âm: {data.lunarDate.day}/{data.lunarDate.month} — {data.canChi.day.can} {data.canChi.day.chi}</span>
                {selectedHour && <><span className="text-gray-300 dark:text-gray-600">|</span><span>Giờ {selectedHour}</span></>}
                {birthYearChi && <><span className="text-gray-300 dark:text-gray-600">|</span><span>Tuổi {birthYearChi}</span></>}
              </div>
            </div>
          </div>

          {/* (Activity Picker moved to Top section) */}
      </div>

      {/* ══════════ Results Dashboard ══════════ */}
      {result && activityData && (
        <div ref={resultRef} className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-400">
          {/* Verdict Banner — Hero result */}
          <VerdictBanner
            percentage={result.percentage}
            label={result.label}
            activityName={activityData.nameVi}
            date={selectedDate}
            hourChi={selectedHour || undefined}
            dayType={dayType}
            lunarDateStr={lunarDateStr}
            bestHourChi={bestHourInfo?.chi}
            bestHourScore={bestHourInfo?.score}
            isBachSuHung={result.isBachSuHung}
          />

          {/* Result Tabs */}
          <ResultTabs
            activeTab={activeResultTab}
            onTabChange={setActiveResultTab}
            intent={selectedIntent}
            hasResult={true}
          />

          {/* Tab Content */}
          <div className="min-h-[200px]">

            {/* === TAB: Tổng quan === */}
            {activeResultTab === 'overview' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* Unified Overview Card */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-surface-subtle-light dark:bg-black/20 border border-border-light/60 dark:border-white/5 relative overflow-hidden shadow-sm">
                  
                  {/* Background ambient decoration */}
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-gold/5 dark:bg-gold-dark/5 rounded-full blur-3xl pointer-events-none" />

                  {/* Left Column: Quick Stats */}
                  <div className="flex flex-row sm:flex-col justify-around sm:justify-center w-full sm:w-1/3 gap-3 z-10">
                    {/* Best hour mini-card */}
                    {result.bestHours[0] && (
                      <div className="flex flex-col items-center justify-center p-3 sm:py-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-sm w-full transition-transform hover:scale-[1.02]">
                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                          {result.bestHours[0].hourInfo.canChi.chi}
                        </p>
                        <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider font-bold mt-1">Giờ tốt nhất</p>
                        <p className="text-xs font-medium text-emerald-600/70 dark:text-emerald-400/70 mt-0.5">{result.bestHours[0].activityScore}%</p>
                      </div>
                    )}
                    
                    {/* Day type mini-card */}
                    <div className="flex flex-col items-center justify-center p-3 sm:py-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-sm w-full transition-transform hover:scale-[1.02]">
                      <p className="text-2xl font-bold">{dayType === 'Hoàng Đạo' ? '🌟' : '🌑'}</p>
                      <p className="text-[10px] uppercase tracking-wider font-bold mt-1 text-text-secondary-light dark:text-text-secondary-dark">{dayType}</p>
                    </div>
                  </div>

                  {/* Right Column: Synergy Radar */}
                  {radarData && (
                    <div className="flex-1 flex justify-center items-center p-2 z-10 w-full">
                      <SynergyRadar data={radarData} size={220} />
                    </div>
                  )}
                </div>

                {/* Condensed Best Hours */}
                <BestTimesPanel bestHours={result.bestHours} activityName={activityData.nameVi} />
              </div>
            )}

            {/* === TAB: Chi tiết === */}
            {activeResultTab === 'details' && (
              <div className="animate-in fade-in duration-200">
                <ContentGate requiredTier="premium" sectionTitle="Phân Tích Chi Tiết Từng Yếu Tố" showBlurPreview>
                  <GroupedBreakdown breakdown={result.breakdown} />
                </ContentGate>
              </div>
            )}

            {/* === TAB: Giờ tốt === */}
            {activeResultTab === 'hours' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <HourPickerGrid
                  allHours={data.allHours}
                  selectedHour={selectedHour}
                  onSelectHour={handleHourSelect}
                  hourScores={allHourScores}
                  activityName={activityData.nameVi}
                />
                <BestTimesPanel bestHours={result.bestHours} activityName={activityData.nameVi} />
              </div>
            )}

            {/* === TAB: Phân tích === */}
            {activeResultTab === 'analysis' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {radarData && (
                  <div className="flex justify-center p-4 rounded-xl border border-border-light dark:border-border-dark">
                    <SynergyRadar data={radarData} size={240} />
                  </div>
                )}
                <ContentGate requiredTier="premium" sectionTitle="Kỳ Môn Độn Giáp" showBlurPreview>
                  <CollapsibleCard title="Kỳ Môn Độn Giáp" defaultOpen={false}>
                    <div className="p-4">
                      <QmdjChartWidget date={selectedDate} hourChi={selectedHour || 'Tý'} />
                    </div>
                  </CollapsibleCard>
                </ContentGate>
              </div>
            )}

            {/* === TAB: Lịch cưới (wedding intent) === */}
            {activeResultTab === 'wedding' && (
              <div className="animate-in fade-in duration-200">
                <WeddingCalendarView
                  initialYear={selectedDate.getFullYear()}
                  initialMonth={selectedDate.getMonth()}
                  activityId={selectedActivity || 'cuoi-hoi'}
                  birthYearChi={birthYearChi as string | undefined}
                  synastryResult={synastryResult}
                  tuviSynastryResult={tuviSynastryResult}
                  numerologySynastryResult={numerologySynastryResult}
                  onSelectDate={onSelectDate}
                />
              </div>
            )}

            {/* === TAB: Hướng mộ (funeral intent) === */}
            {activeResultTab === 'funeral' && (
              <div className="animate-in fade-in duration-200">
                <GraveDirectionPanel
                  deceasedBirthYear={personA.birthYear}
                  currentYear={selectedDate.getFullYear()}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!result && (
        <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in duration-500">
          <span className="material-icons-round text-4xl text-gray-300 dark:text-gray-600 mb-2">auto_awesome</span>
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark max-w-xs">
            Chọn mục đích hoặc một việc cần làm cụ thể để xem đánh giá tốt/xấu
          </p>
        </div>
      )}
    </div>
  );
};

export default DungSuView;
