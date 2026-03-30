import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { computeSynastryP1 } from '../../services/crossValidation/synastryEngine';
import { SynastryResult } from '../../types/synastry';
import { SecondPersonProfile } from '../../types/auth';

export default function SynastryPanel() {
  const { user } = useAuthStore();
  
  // Local state for the second person (to avoid forcing global state save immediately)
  const [partner, setPartner] = useState<SecondPersonProfile>({
    name: 'Người ấy',
    relationship: 'partner',
    gender: 'female',
    birthYear: undefined,
    birthMonth: undefined,
    birthDay: undefined,
    lifepathNumber: undefined,
    computationTier: 'basic'
  });
  
  const [result, setResult] = useState<SynastryResult | null>(null);

  // Trigger calculation when inputs change
  useEffect(() => {
    const isValidYear = (y: number | undefined | null) => y !== undefined && y !== null && !isNaN(y) && y >= 1800 && y <= 2200;

    if (user?.profile && isValidYear(user.profile.birthYear) && isValidYear(partner.birthYear)) {
      try {
        const res = computeSynastryP1(user.profile, partner);
        setResult(res);
      } catch (e) {
        console.error("Synastry error:", e);
        setResult(null);
      }
    } else {
      setResult(null);
    }
  }, [user, partner]);

  const handlePartnerChange = <K extends keyof SecondPersonProfile>(field: K, value: SecondPersonProfile[K]) => {
    setPartner(prev => ({ ...prev, [field]: value }));
  };

  const getVerdictScale = (score: number) => {
    if (score >= 80) return 'text-emerald-600 dark:text-emerald-400 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
    if (score >= 60) return 'text-emerald-500 dark:text-emerald-500 border-emerald-400 bg-emerald-50 dark:bg-emerald-900/10';
    if (score >= 40) return 'text-blue-500 dark:text-blue-400 border-blue-400 bg-blue-50 dark:bg-blue-900/10';
    if (score >= 20) return 'text-orange-500 dark:text-orange-400 border-orange-400 bg-orange-50 dark:bg-orange-900/10';
    return 'text-red-500 dark:text-red-400 border-red-500 bg-red-50 dark:bg-red-900/20';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-emerald-400';
    if (score >= 40) return 'bg-blue-400';
    if (score >= 20) return 'bg-orange-400';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-text-primary-light dark:text-text-primary-dark flex items-center justify-center gap-3">
          <span className="material-icons-round text-primary-light dark:text-primary-dark text-3xl">favorite</span>
          Xem Hợp Lá (Synastry)
        </h2>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2 max-w-lg mx-auto">
          Đánh giá độ tương hợp giữa bạn và đối tác, người yêu, hoặc đồng nghiệp dựa trên sự kết hợp đa nền tảng (Bát Tự, Thần Số Học).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Person 1 (You) */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <span className="material-icons-round text-6xl">person</span>
          </div>
          <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-4 flex items-center gap-2">
            Bạn
            {!user?.profile?.birthYear && <span className="text-xs text-red-500 font-medium">(Chưa có hồ sơ)</span>}
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Năm sinh</label>
              <div className="font-medium text-text-primary-light dark:text-text-primary-dark bg-gray-50 dark:bg-gray-900/50 px-3 py-2 rounded-lg border border-gray-100 dark:border-gray-700">
                {user?.profile?.birthYear || '---'}
              </div>
            </div>
            {user?.profile?.lifepathNumber && (
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Số đường đời (Numerology)</label>
                <div className="font-medium text-text-primary-light dark:text-text-primary-dark bg-gray-50 dark:bg-gray-900/50 px-3 py-2 rounded-lg border border-gray-100 dark:border-gray-700">
                  {user.profile.lifepathNumber}
                </div>
              </div>
            )}
            {!user?.profile?.birthYear && (
               <button className="text-sm font-medium text-primary-light hover:underline w-full text-left mt-2">
                 Cập nhật hồ sơ &rarr;
               </button>
            )}
          </div>
        </div>

        {/* Person 2 (Partner) */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-600 shadow-md relative overflow-hidden z-10 ring-1 ring-primary-light/20">
          <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-4 flex items-center gap-2">
            Hồ sơ người thứ hai
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Họ tên / Danh xưng</label>
              <input 
                type="text" 
                className="w-full bg-white dark:bg-gray-900 text-text-primary-light dark:text-text-primary-dark px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-light focus:outline-none"
                value={partner.name}
                onChange={e => handlePartnerChange('name', e.target.value)}
                placeholder="VD: Người ấy, Bạn đời..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Năm sinh (DL) *</label>
                <input 
                  type="number" 
                  min="1900" max="2100"
                  className="w-full bg-white dark:bg-gray-900 text-text-primary-light dark:text-text-primary-dark px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-light focus:outline-none"
                  value={partner.birthYear || ''}
                  onChange={e => handlePartnerChange('birthYear', parseInt(e.target.value) || undefined)}
                  placeholder="VD: 1995"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Số đường đời</label>
                <input 
                  type="number" min="1" max="33"
                  className="w-full bg-white dark:bg-gray-900 text-text-primary-light dark:text-text-primary-dark px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-light focus:outline-none"
                  value={partner.lifepathNumber || ''}
                  onChange={e => handlePartnerChange('lifepathNumber', parseInt(e.target.value) || undefined)}
                  placeholder="Tùy chọn"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Container */}
      {result ? (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Main Verdict Header */}
          <div className={`p-6 rounded-2xl border-2 flex flex-col md:flex-row items-center gap-6 justify-between ${getVerdictScale(result.overallScore)}`}>
            <div className="text-center md:text-left">
              <span className="text-sm font-bold uppercase tracking-widest opacity-80 block mb-1">Độ tương hợp Bát Tự & Thần Số</span>
              <h2 className="text-4xl font-extrabold uppercase">{result.verdict}</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-white/50 dark:bg-black/20 backdrop-blur shadow-inner">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" className="opacity-20" />
                  <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={2 * Math.PI * 42} strokeDashoffset={2 * Math.PI * 42 * (1 - result.overallScore / 100)} className="text-current" strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1.5s ease-out' }} />
                </svg>
                <span className="text-3xl font-bold">{result.overallScore}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-8">
            {result.systems.filter(s => s.isAvailable).map((sys) => (
              <div key={sys.system} className="border-b border-gray-100 dark:border-gray-700 pb-8 last:pb-0 last:border-0">
                <div className="flex justify-between items-end mb-4">
                  <h4 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
                    {sys.system === 'bazi' ? 'Tương hợp Bát Tự (Thiên Can / Địa Chi)' : 'Tương hợp Thần Số Học'}
                  </h4>
                  <span className={`font-bold ${sys.score >= 50 ? 'text-emerald-500' : 'text-red-500'}`}>
                    Điểm: {sys.score}/100
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
                  <div className={`h-full ${getProgressColor(sys.score)}`} style={{ width: `${Math.max(5, sys.score)}%` }} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sys.factors.map((factor, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border ${factor.isFavorable ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800' : 'bg-red-50/50 dark:bg-red-900/10 border-red-100 dark:border-red-800'}`}>
                      <div className="flex items-start gap-3">
                        <span className={`material-icons-round shrink-0 ${factor.isFavorable ? 'text-emerald-500' : 'text-red-500'}`}>
                          {factor.isFavorable ? 'check_circle' : 'warning'}
                        </span>
                        <div>
                          <strong className="block text-sm font-semibold text-text-primary-light dark:text-text-primary-dark mb-1">{factor.name}</strong>
                          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{factor.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-64 flex flex-col items-center justify-center text-center opacity-50">
          <span className="material-icons-round text-6xl text-gray-300 dark:text-gray-600 mb-4">diversity_1</span>
          <p className="font-medium text-gray-500 text-lg">Đang chờ thông tin...</p>
          <p className="text-sm text-gray-400 mt-1 max-w-sm">Nhập đầy đủ năm sinh của bạn và người ấy để phân tích mức độ hòa hợp.</p>
        </div>
      )}
    </div>
  );
}
