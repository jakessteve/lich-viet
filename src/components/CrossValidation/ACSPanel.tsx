import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { computeACS } from '../../services/crossValidation/acsEngine';
import { ACSResult } from '../../types/crossValidation';
import { getVerdictColor, getVerdictGradient } from '@/utils/verdictHelpers';

export default function ACSPanel() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [result, setResult] = useState<ACSResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchACS = async () => {
      setLoading(true);
      try {
        const res = await computeACS(user?.profile, user?.extendedProfile, selectedDate);
        if (mounted) setResult(res);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchACS();
    return () => { mounted = false; };
  }, [user, selectedDate]);

  if (!user?.profile?.birthYear) {
    return (
      <div className="p-6 text-center max-w-sm mx-auto mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <span className="material-icons-round text-4xl text-gray-400 mb-3">account_circle</span>
        <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">Vui lòng cập nhật hồ sơ</h3>
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
          Hệ thống cần ít nhất năm sinh của bạn để tính toán độ tương hợp các ngày.
        </p>
        <button onClick={() => navigate('/app/cai-dat')} className="px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
          Nhập năm sinh
        </button>
      </div>
    );
  }

  // Verdict helpers now imported from utils/verdictHelpers.ts

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary-light dark:text-text-primary-dark flex items-center gap-2">
            <span className="material-icons-round text-primary-light dark:text-primary-dark">verified_user</span>
            ACS Cross-Validation
          </h2>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">Đánh giá cát hung đa nền tảng (Tử Vi, Bát Tự, Chiêm Tinh, Thần Số)</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm flex">
            <input 
              type="date"
              className="px-4 py-2 bg-transparent text-sm font-medium focus:outline-none dark:text-gray-200"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => {
                const parts = e.target.value.split('-');
                if (parts.length === 3) {
                  const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
                  setSelectedDate(d);
                }
              }}
            />
        </div>
      </div>

      {loading || !result ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-light dark:border-primary-dark" />
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Main Verdict Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${getVerdictGradient(result.score)}`} />
            
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100 dark:text-gray-700" />
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={2 * Math.PI * 56} strokeDashoffset={2 * Math.PI * 56 * (1 - result.score / 100)} className={getVerdictColor(result.score)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-4xl font-bold ${getVerdictColor(result.score)}`}>{result.score}</span>
                </div>
              </div>
              
              <div>
                <h3 className={`text-2xl font-bold uppercase tracking-wider ${getVerdictColor(result.score)}`}>{result.verdict}</h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2 bg-gray-100 dark:bg-gray-900 inline-block px-3 py-1 rounded-full">Độ tin cậy: {result.tier} Hệ thống</p>
              </div>
            </div>
          </div>

          {result.tier === '2/4' && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex gap-3 text-sm animate-in fade-in">
              <span className="material-icons-round text-blue-500 shrink-0">info</span>
              <div>
                <strong className="block text-blue-800 dark:text-blue-300 mb-1">Cải thiện độ chính xác (Lên 4/4 hệ thống)</strong>
                <p className="text-blue-700 dark:text-blue-400 mb-2">Bạn đang xem ở chế độ cơ bản (2/4). Hãy cung cấp giờ sinh để Mở Khóa Tử Vi & Chiêm Tinh.</p>
                <button onClick={() => navigate('/app/cai-dat')} className="font-semibold text-blue-600 dark:text-blue-300 hover:underline">Hoàn thiện hồ sơ &rarr;</button>
              </div>
            </div>
          )}

          {/* Trust-Bar / 4-System Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(result.breakdown).map(([sys, sysScore]) => (
              <div key={sys} className={`p-5 rounded-2xl border ${sysScore.isAvailable ? 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm' : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-70'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-icons-round text-lg text-gray-400">
                      {sys === 'bazi' ? 'account_balance' : sys === 'tuvi' ? 'yin_yang' : sys === 'transit' ? 'auto_awesome' : 'pin'}
                    </span>
                    <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                      {sys === 'bazi' ? 'Bát Tự' : sys === 'tuvi' ? 'Tử Vi' : sys === 'transit' ? 'Chiêm Tinh' : 'Thần Số'}
                    </h4>
                  </div>
                  {sysScore.isAvailable && (
                    <span className={`text-lg font-bold ${getVerdictColor(sysScore.score)}`}>{sysScore.score}</span>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 flex justify-between">
                    <span>Cát / Hung</span>
                    <span>Tỷ trọng: {Math.round(sysScore.weight * 100)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${getVerdictGradient(sysScore.score)}`} style={{ width: `${sysScore.isAvailable ? sysScore.score : 0}%` }} />
                  </div>
                  
                  {sysScore.flags.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {sysScore.flags.map((flag: string, idx: number) => (
                        <span key={idx} className={`px-2 py-0.5 text-xs rounded font-medium ${sysScore.isAvailable ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' : 'bg-gray-200 text-gray-500 dark:bg-gray-600 dark:text-gray-400'}`}>
                          {flag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}
