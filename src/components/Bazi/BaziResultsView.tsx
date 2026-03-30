/**
 * BaziResultsView — Displays the Bát Tự analysis results
 *
 * Three-tab layout (EngineTabNav unified pattern):
 *  - Tứ Trụ   : Pillars grid, Day Master banner, Ngũ Hành chart
 *  - Phân Tích : Cách Cục, Personality, ContentGated deep analysis
 *  - Vận Hạn   : Thần Sát, Đại Vận enriched cycles
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { BaziChart, NguHanh, BaziInput } from '@lich-viet/core/bazi';
import CollapsibleCard from '../CollapsibleCard';
import { ContentGate } from '../shared/ContentGate';
import PdfDownloadButton from '../shared/PdfDownloadButton';
import ShareButton from '../shared/ShareButton';
import EngineTabNav, { type EngineTab } from '../shared/EngineTabNav';
import BaziSchoolTabSwitcher from './BaziSchoolTabSwitcher';
import {
  generatePersonalityNarrative,
  analyzeLifeDomains,
  generatePracticalAdvice,
  enrichLuckCycleNarratives,
} from '../../services/bazi/baziInterpretation';
import { THAP_THAN_MEANINGS } from '../../data/interpretation/bazi/thapThanMeanings';
import { ELEMENT_COLORS, ELEMENT_EMOJI } from './baziConstants';
import BaziMatrix from './BaziMatrix';

const BAZI_TABS: EngineTab[] = [
  { id: 'pillars', label: 'Tứ Trụ', icon: 'grid_4x4' },
  { id: 'compare', label: 'So Sánh Phái', icon: 'compare' },
  { id: 'analysis', label: 'Phân Tích', icon: 'psychology' },
  { id: 'cycles', label: 'Vận Hạn', icon: 'autorenew' },
];

interface BaziResultsViewProps {
  chart: BaziChart;
  input: BaziInput;
  name: string;
  onReset: () => void;
}

export default function BaziResultsView({ chart, input, name, onReset }: BaziResultsViewProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'pillars' | 'compare' | 'analysis' | 'cycles'>('pillars');

  return (
    <div className="space-y-5 animate-fade-in-up" id="bazi-chart-export">

      {/* Unified tab navigation */}
      <EngineTabNav
        tabs={BAZI_TABS}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id as 'pillars' | 'compare' | 'analysis' | 'cycles')}
      />

      {/* ── SO SÁNH PHÁI TAB ── */}
      {activeTab === 'compare' && (
        <BaziSchoolTabSwitcher input={input} />
      )}

      {/* ── TỨ TRỤ TAB ── */}
      {activeTab === 'pillars' && (
        <div className="space-y-5">
          <BaziMatrix chart={chart} />

          {/* Day Master Banner */}
          <div
            className={`rounded-2xl border-2 p-5 text-center space-y-2 ${chart.dayMaster.strength === 'vượng'
              ? 'bg-emerald-50/80 dark:bg-emerald-900/15 border-emerald-200/60 dark:border-emerald-700/30'
              : chart.dayMaster.strength === 'suy'
                ? 'bg-red-50/80 dark:bg-red-900/15 border-red-200/60 dark:border-red-700/30'
                : 'bg-amber-50/80 dark:bg-amber-900/15 border-amber-200/60 dark:border-amber-700/30'
              }`}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-text-secondary-light/50 dark:text-text-secondary-dark/40">
              Nhật Chủ · Day Master
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl">{ELEMENT_EMOJI[chart.dayMaster.dayMasterElement]}</span>
              <div>
                <p className="text-2xl font-black text-text-primary-light dark:text-text-primary-dark">
                  {chart.dayMaster.dayMaster}
                </p>
                <p className={`text-sm font-bold ${ELEMENT_COLORS[chart.dayMaster.dayMasterElement].text}`}>
                  {chart.dayMaster.dayMasterElement} · {chart.dayMaster.strengthLabel}
                </p>
              </div>
            </div>
            <p className="text-base text-text-secondary-light dark:text-text-secondary-dark max-w-md mx-auto">
              {chart.dayMaster.strengthExplanation}
            </p>
            <div className="flex justify-center gap-3 mt-2">
              <div>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase">Hỷ dụng</p>
                <div className="flex gap-1 mt-0.5">
                  {chart.dayMaster.favorableElements.map((e) => (
                    <span key={e} className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400">
                      {ELEMENT_EMOJI[e]} {e}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-red-600 dark:text-red-400 uppercase">Kỵ</p>
                <div className="flex gap-1 mt-0.5">
                  {chart.dayMaster.unfavorableElements.map((e) => (
                    <span key={e} className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400">
                      {ELEMENT_EMOJI[e]} {e}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Ngũ Hành Distribution */}
          <CollapsibleCard title="Phân Bổ Ngũ Hành" icon="bar_chart" defaultOpen={true}>
            <div className="p-4">
              <div className="flex items-end gap-2 justify-center h-24">
                {(Object.entries(chart.elementCount) as [NguHanh, number][]).map(([element, count]) => {
                  const maxCount = Math.max(...Object.values(chart.elementCount));
                  const height = maxCount > 0 ? (count / maxCount) * 100 : 0;
                  const colors = ELEMENT_COLORS[element];
                  return (
                    <div key={element} className="flex flex-col items-center gap-1 flex-1">
                      <span className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">{count}</span>
                      <div className={`w-full rounded-t-lg bg-gradient-to-t ${colors.gradient}`} style={{ height: `${Math.max(height, 8)}%` }} />
                      <span className="text-lg font-medium text-text-secondary-light dark:text-text-secondary-dark">{ELEMENT_EMOJI[element]}</span>
                      <span className="text-sm text-text-secondary-light/60 dark:text-text-secondary-dark/40">{element}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CollapsibleCard>

          {/* PDF & Share */}
          <div className="flex justify-center gap-3" data-html2canvas-ignore>
            <PdfDownloadButton
              label="Tải Báo Cáo Bát Tự (PDF)"
              onDownload={async (_pdfTier) => {
                const { downloadBaziPdf } = await import('../../services/pdf/baziPdfGenerator');
                await downloadBaziPdf(chart, name);
              }}
            />
            <ShareButton targetId="bazi-chart-export" fileName={`bat-tu-${name || 'lich-viet'}`} className="flex-1 min-w-[140px] max-w-[200px]" />
          </div>
        </div>
      )}

      {/* ── PHÂN TÍCH TAB ── */}
      {activeTab === 'analysis' && (
        <div className="space-y-5">
          {/* Cách Cục + Điều Hậu */}
          <CollapsibleCard title="Cách Cục & Điều Hậu" icon="auto_awesome" defaultOpen={true}>
            <div className="p-4 space-y-3">
              <div className="glass-card p-3">
                <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">{chart.cachCuc.name}</p>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1 leading-relaxed">{chart.cachCuc.description}</p>
              </div>
              <div className="glass-card p-3">
                <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">
                  Điều Hậu: Mùa {chart.dieuHau.season} — {chart.dieuHau.climate}
                </p>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1 leading-relaxed">{chart.dieuHau.assessment}</p>
                <p className="text-sm mt-1">
                  Hành cần bổ sung:{' '}
                  <span className={`font-bold ${ELEMENT_COLORS[chart.dieuHau.neededElement].text}`}>
                    {ELEMENT_EMOJI[chart.dieuHau.neededElement]} {chart.dieuHau.neededElement}
                  </span>
                </p>
              </div>
            </div>
          </CollapsibleCard>

          {/* §1 Personality Profile */}
          {(() => {
            const personality = generatePersonalityNarrative(chart);
            return (
              <CollapsibleCard title={`Tính Cách — ${personality.profile.image}`} icon="person" defaultOpen={true}>
                <div className="p-4 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{personality.profile.imageEmoji}</div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">
                        {chart.dayMaster.dayMaster} — {personality.profile.archetype}
                      </p>
                      <p className="text-sm font-medium text-text-secondary-light/60 dark:text-text-secondary-dark/40 mt-0.5">
                        {personality.profile.element} · {personality.profile.yinYang}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">{personality.profile.personality}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase">Điểm mạnh</p>
                      {personality.profile.strengths.map((s, i) => (
                        <p key={i} className="text-sm text-text-secondary-light dark:text-text-secondary-dark flex items-start gap-1 leading-relaxed">
                          <span className="text-emerald-500 mt-0.5">●</span> {s}
                        </p>
                      ))}
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-sm font-bold text-red-600 dark:text-red-400 uppercase">Điểm yếu</p>
                      {personality.profile.weaknesses.map((w, i) => (
                        <p key={i} className="text-sm text-text-secondary-light dark:text-text-secondary-dark flex items-start gap-1 leading-relaxed">
                          <span className="text-red-500 mt-0.5">●</span> {w}
                        </p>
                      ))}
                    </div>
                  </div>
                  {personality.napAmMeaning && (
                    <div className="glass-card p-3">
                      <p className="text-sm font-bold text-text-secondary-light/60 dark:text-text-secondary-dark/40 uppercase mb-1">Nạp Âm Trụ Ngày</p>
                      <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">{personality.napAmMeaning.image} {personality.napAmMeaning.name}</p>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1 leading-relaxed">{personality.napAmMeaning.meaning}</p>
                    </div>
                  )}
                  {personality.dominantGods.length > 0 && (
                    <div className="glass-card p-3">
                      <p className="text-sm font-bold text-text-secondary-light/60 dark:text-text-secondary-dark/40 uppercase mb-1">Thập Thần Nổi Bật</p>
                      <div className="space-y-1.5">
                        {personality.dominantGods.map((g) => (
                          <div key={g.name} className="flex items-start gap-2">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${g.info.nature === 'cat' ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : g.info.nature === 'hung' ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' : 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'}`}>{g.name}</span>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark flex-1 leading-relaxed">{g.info.keyword} — {g.info.meaning.split('.')[0]}.</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CollapsibleCard>
            );
          })()}

          {/* §2–5 Deep Analysis — GATED: Premium+ */}
          <ContentGate requiredTier="premium" sectionTitle="Phân Tích Chi Tiết Bát Tự" showBlurPreview>
            {/* §2 Thập Thần */}
            <CollapsibleCard title="Thập Thần (Thần Quan Hệ)" icon="account_tree" defaultOpen={false}>
              <div className="p-4 space-y-3">
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                  Mối quan hệ ngũ hành giữa Nhật Chủ ({chart.dayMaster.dayMaster}) và các Can khác trong tứ trụ:
                </p>
                <div className="space-y-2">
                  {chart.thapThan
                    .filter((t) => t.position === 'can')
                    .map((t, i) => {
                      const info = THAP_THAN_MEANINGS[t.god as keyof typeof THAP_THAN_MEANINGS];
                      return (
                        <div key={i} className={`p-3 rounded-xl border ${t.godNature === 'cat' ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200/40 dark:border-emerald-700/20' : t.godNature === 'hung' ? 'bg-red-50/50 dark:bg-red-900/10 border-red-200/40 dark:border-red-700/20' : 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-200/40 dark:border-amber-700/20'}`}>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">{t.pillar}</span>
                            <span className={`font-bold text-sm ${ELEMENT_COLORS[t.stemElement].text}`}>{t.stem} ({t.stemElement})</span>
                            <span className="text-xs">→</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${t.godNature === 'cat' ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : t.godNature === 'hung' ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' : 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'}`}>{t.god}</span>
                          </div>
                          {info && <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1 leading-relaxed">{info.keyword} — {info.positive.split('.')[0]}.</p>}
                        </div>
                      );
                    })}
                </div>
              </div>
            </CollapsibleCard>

            {/* §3 Tàng Can */}
            <CollapsibleCard title="Tàng Can & Địa Chi Quan Hệ" icon="layers" defaultOpen={false}>
              <div className="p-4 space-y-4">
                <div>
                  <p className="text-sm font-bold text-text-secondary-light/60 dark:text-text-secondary-dark/40 uppercase mb-2">Tàng Can (Nguyên Thần Ẩn)</p>
                  <div className="grid grid-cols-4 gap-2">
                    {chart.tangCan.map((tc, i) => (
                      <div key={i} className="glass-card p-2 text-center">
                        <p className="text-sm font-bold text-text-secondary-light/50 dark:text-text-secondary-dark/40">{['Trụ Giờ', 'Trụ Ngày', 'Trụ Tháng', 'Trụ Năm'][i]}</p>
                        <p className="text-sm font-black text-text-primary-light dark:text-text-primary-dark">{tc.chi}</p>
                        <div className="mt-1 space-y-0.5">
                          {tc.hiddenStems.map((h, j) => (
                            <p key={j} className={`text-xs ${ELEMENT_COLORS[h.element].text}`}>
                              {h.can}{' '}
                              <span className="opacity-60">({h.strength === 'chính_khí' ? 'Chính' : h.strength === 'trung_khí' ? 'Trung' : 'Dư'})</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {chart.branchInteractions.length > 0 && (
                  <div>
                    <p className="text-sm font-bold text-text-secondary-light/60 dark:text-text-secondary-dark/40 uppercase mb-2">Địa Chi Tương Tác</p>
                    <div className="space-y-2">
                      {chart.branchInteractions.map((bi, i) => (
                        <div key={i} className={`p-3 rounded-xl border ${bi.nature === 'cat' ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200/40 dark:border-emerald-700/20' : 'bg-red-50/50 dark:bg-red-900/10 border-red-200/40 dark:border-red-700/20'}`}>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${bi.nature === 'cat' ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'}`}>{bi.nature === 'cat' ? '✅' : '⚠️'} {bi.typeLabel}</span>
                            <span className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">{bi.branches.join(' — ')}</span>
                          </div>
                          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1 leading-relaxed">{bi.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CollapsibleCard>

            {/* §4 Life Domains */}
            {(() => {
              const domains = analyzeLifeDomains(chart);
              return (
                <CollapsibleCard title="Phân Tích Lĩnh Vực Đời Sống" icon="diversity_3" defaultOpen={false}>
                  <div className="p-4 space-y-3">
                    {[
                      { icon: '💼', title: 'Sự Nghiệp', content: domains.career },
                      { icon: '💰', title: 'Tài Lộc', content: domains.wealth },
                      { icon: '❤️', title: 'Tình Cảm', content: domains.relationship },
                      { icon: '🏥', title: 'Sức Khỏe', content: domains.health },
                    ].map((d, i) => (
                      <div key={i} className="glass-card p-3">
                        <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark flex items-center gap-1.5"><span>{d.icon}</span> {d.title}</p>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1 leading-relaxed">{d.content}</p>
                      </div>
                    ))}
                  </div>
                </CollapsibleCard>
              );
            })()}

            {/* §5 Practical Advice */}
            {(() => {
              const advice = generatePracticalAdvice(chart);
              return (
                <CollapsibleCard title="Lời Khuyên Thực Hành" icon="tips_and_updates" defaultOpen={false}>
                  <div className="p-4 space-y-3">
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">{advice.summary}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="glass-card p-3">
                        <p className="text-sm font-bold text-text-secondary-light/60 dark:text-text-secondary-dark/40 uppercase mb-1">🎨 Màu Sắc</p>
                        <div className="flex flex-wrap gap-1">
                          {[...advice.primary.colors, ...(advice.secondary?.colors?.slice(0, 1) || [])].map((c, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-full text-xs font-medium bg-gold/10 dark:bg-gold-dark/10 text-gold dark:text-gold-dark">{c}</span>
                          ))}
                        </div>
                      </div>
                      <div className="glass-card p-3">
                        <p className="text-sm font-bold text-text-secondary-light/60 dark:text-text-secondary-dark/40 uppercase mb-1">🧭 Hướng</p>
                        <div className="flex flex-wrap gap-1">
                          {[...advice.primary.directions, ...(advice.secondary?.directions?.slice(0, 1) || [])].map((d, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-full text-xs font-medium bg-gold/10 dark:bg-gold-dark/10 text-gold dark:text-gold-dark">{d}</span>
                          ))}
                        </div>
                      </div>
                      <div className="glass-card p-3">
                        <p className="text-sm font-bold text-text-secondary-light/60 dark:text-text-secondary-dark/40 uppercase mb-1">🔢 Số May</p>
                        <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">{[...advice.primary.numbers, ...(advice.secondary?.numbers || [])].join(', ')}</p>
                      </div>
                      <div className="glass-card p-3">
                        <p className="text-sm font-bold text-text-secondary-light/60 dark:text-text-secondary-dark/40 uppercase mb-1">💼 Ngành Nghề</p>
                        <div className="space-y-0.5 mt-1">
                          {advice.primary.careers.slice(0, 4).map((c, i) => (
                            <p key={i} className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">• {c}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="glass-card p-3">
                      <p className="text-xs font-bold text-text-secondary-light/60 dark:text-text-secondary-dark/40 uppercase mb-1">🏥 Sức Khỏe</p>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">{advice.primary.healthFocus}</p>
                      <p className="text-xs text-text-secondary-light/60 dark:text-text-secondary-dark/40 mt-1">Cơ quan: {advice.primary.healthOrgans}</p>
                    </div>
                  </div>
                </CollapsibleCard>
              );
            })()}
          </ContentGate>
        </div>
      )}

      {/* ── VẬN HẠN TAB ── */}
      {activeTab === 'cycles' && (
        <div className="space-y-5">
          {/* Thần Sát */}
          <CollapsibleCard title="Thần Sát" icon="auto_fix_high" defaultOpen={true}>
            <div className="p-4 space-y-2">
              {chart.thanSat.map((ts, i) => (
                <div key={i} className={`p-3 rounded-xl border ${ts.nature === 'cat' ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200/40 dark:border-emerald-700/20' : ts.nature === 'hung' ? 'bg-red-50/50 dark:bg-red-900/10 border-red-200/40 dark:border-red-700/20' : 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-200/40 dark:border-amber-700/20'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">{ts.nameVi}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${ts.nature === 'cat' ? 'text-emerald-600 dark:text-emerald-400' : ts.nature === 'hung' ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`}>
                      {ts.nature === 'cat' ? '✅ Cát' : ts.nature === 'hung' ? '❌ Hung' : '☯️ Trung'}
                    </span>
                    <span className="text-xs text-text-secondary-light/50 dark:text-text-secondary-dark/40">Trụ {ts.pillar}</span>
                  </div>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1 leading-relaxed">{ts.description}</p>
                </div>
              ))}
            </div>
          </CollapsibleCard>

          {/* Đại Vận */}
          <CollapsibleCard title="Đại Vận" icon="autorenew" defaultOpen={true}>
            <div className="p-4 space-y-3">
              <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
                {chart.luckCycles.map((cycle, i) => (
                  <div key={i} className={`min-w-[100px] p-3 rounded-xl border text-center snap-center ${cycle.rating === 'cat' ? 'bg-emerald-50/60 dark:bg-emerald-900/10 border-emerald-200/40 dark:border-emerald-700/20' : cycle.rating === 'hung' ? 'bg-red-50/60 dark:bg-red-900/10 border-red-200/40 dark:border-red-700/20' : 'bg-gray-50/60 dark:bg-white/3 border-gray-200/40 dark:border-white/5'}`}>
                    <p className="text-sm font-bold text-text-secondary-light/50 dark:text-text-secondary-dark/40">{cycle.startAge}–{cycle.endAge} tuổi</p>
                    <p className={`text-lg font-black ${ELEMENT_COLORS[cycle.element].text}`}>{cycle.can} {cycle.chi}</p>
                    <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark">{cycle.napAm}</p>
                    <span className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${cycle.rating === 'cat' ? 'text-emerald-600 dark:text-emerald-400' : cycle.rating === 'hung' ? 'text-red-600 dark:text-red-400' : 'text-gray-500'}`}>
                      {cycle.rating === 'cat' ? '✅' : cycle.rating === 'hung' ? '⚠️' : '☯️'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 mt-3">
                {enrichLuckCycleNarratives(chart).map((ec) => (
                  <div key={ec.index} className="text-sm text-text-secondary-light dark:text-text-secondary-dark p-2 rounded-lg bg-surface-subtle-light/50 dark:bg-surface-subtle-dark/30 leading-relaxed">
                    <span className="font-bold text-text-primary-light dark:text-text-primary-dark">{chart.luckCycles[ec.index].can} {chart.luckCycles[ec.index].chi}</span>
                    {' · '}
                    <span className={`font-semibold ${ELEMENT_COLORS[chart.luckCycles[ec.index].element].text}`}>{ec.thapThanGod}</span>
                    {' — '}
                    {ec.narrative.split(': ').slice(1).join(': ')}
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleCard>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-xs text-text-secondary-light/50 dark:text-text-secondary-dark/30 space-y-0.5">
        <p>Ngày sinh: {chart.birthDate.toLocaleDateString('vi-VN')} · Giờ: {chart.birthHour}h</p>
        <p>Phân tích đa trường phái: Tử Bình · Cách Cục · Điều Hậu · Thập Thần · Nạp Âm</p>
      </div>
    </div>
  );
}
