/**
 * GieoQueView — Method Selector for Gieo Quẻ Tab
 *
 * Wraps Mai Hoa and Tam Thức views with a segmented control
 * for switching between divination methods.
 *
 * Reads ?method=tam-thuc URL param for deep-linking.
 */

import React, { Suspense, useEffect, useRef } from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useSearchParams } from 'react-router-dom';
import { useAppStore } from '@/stores/appStore';
import LoadingState from '../shared/LoadingState';
import { useRateLimit } from '../../hooks/useRateLimit';


// Lazy-load the sub-views
const MaiHoaView = React.lazy(() => import('../MaiHoa/MaiHoaView'));
const TamThucView = React.lazy(() => import('../TamThuc/TamThucView'));

type DivinationMethod = 'mai-hoa' | 'tam-thuc';

const METHODS: { id: DivinationMethod; label: string; icon: string; desc: string }[] = [
  { id: 'mai-hoa', label: 'Mai Hoa Dịch Số', icon: 'local_florist', desc: 'Gieo quẻ theo Thiệu Ung' },
  { id: 'tam-thuc', label: 'Tam Thức', icon: 'brightness_3', desc: 'Tam Đại Quái Thuật' },
];

export default function GieoQueView() {
  usePageTitle('Gieo Quẻ');
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDate = useAppStore((s) => s.selectedDate);
  const { remaining, limit, canUse, recordUsage } = useRateLimit({ featureKey: 'gieo-que', dailyLimit: 3 });

  // URL is the single source of truth — no local state, no sync loops
  const activeMethod: DivinationMethod =
    searchParams.get('method') === 'tam-thuc' ? 'tam-thuc' : 'mai-hoa';

  // Record one usage each time the component mounts (page-level navigation)
  const hasRecordedRef = useRef(false);
  useEffect(() => {
    if (canUse && !hasRecordedRef.current) {
      recordUsage();
      hasRecordedRef.current = true;
    }
  }, [canUse, recordUsage]);

  const handleMethodChange = (method: DivinationMethod) => {
    if (method === 'tam-thuc') {
      setSearchParams({ method: 'tam-thuc' }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  return (
    <div className="space-y-5">
      {/* Method Selector — Segmented Control */}
      <div className="glass-card p-1.5 flex gap-1">
        {METHODS.map((method) => (
          <button
            key={method.id}
            onClick={() => handleMethodChange(method.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${activeMethod === method.id
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20'
              : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
          >
            <span className="material-icons-round text-base">{method.icon}</span>
            <span className="hidden sm:inline">
              {method.label}
            </span>
            <span className="sm:hidden text-xs">{method.id === 'mai-hoa' ? 'Mai Hoa' : 'Tam Thức'}</span>
          </button>
        ))}
      </div>

      {/* Rate limit indicator for Free users */}
      {limit !== Infinity && (
        <div className={`flex items-center justify-between px-4 py-2 rounded-xl text-xs font-medium ${
          canUse
            ? 'bg-blue-50 dark:bg-blue-900/15 text-blue-600 dark:text-blue-400 border border-blue-200/40 dark:border-blue-700/25'
            : 'bg-red-50 dark:bg-red-900/15 text-red-600 dark:text-red-400 border border-red-200/40 dark:border-red-700/25'
        }`}>
          <span className="flex items-center gap-1.5">
            <span className="material-icons-round text-sm" aria-hidden="true">{canUse ? 'hourglass_empty' : 'block'}</span>
            {canUse
              ? `Còn ${remaining}/${limit} lượt gieo quẻ hôm nay`
              : 'Đã hết lượt gieo quẻ hôm nay'
            }
          </span>
          {!canUse && (
            <a href="/app/nang-cap" className="font-semibold hover:underline flex items-center gap-1">
              Nâng cấp Premium <span className="material-icons-round text-sm" aria-hidden="true">arrow_forward</span>
            </a>
          )}
        </div>
      )}

      {/* Active Method View */}
      {canUse ? (
        <Suspense fallback={<LoadingState />}>
          {activeMethod === 'mai-hoa' ? (
            <MaiHoaView selectedDate={selectedDate} />
          ) : (
            <TamThucView selectedDate={selectedDate} />
          )}
        </Suspense>
      ) : (
        <div className="card-surface p-8 text-center space-y-4">
          <span className="material-icons-round text-5xl text-gray-300 dark:text-gray-600" aria-hidden="true">lock_clock</span>
          <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">Hết lượt gieo quẻ hôm nay</h3>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark max-w-sm mx-auto">
            Gói Miễn phí giới hạn {limit} lượt gieo quẻ mỗi ngày. Nâng cấp Premium để sử dụng không giới hạn.
          </p>
          <a
            href="/app/nang-cap"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-semibold shadow-md shadow-amber-500/25 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="material-icons-round text-[18px]" aria-hidden="true">star</span>
            Nâng cấp ngay
          </a>
        </div>
      )}
    </div>
  );
}
