/**
 * GieoQueView — Method Selector for Gieo Quẻ Tab
 *
 * Wraps Mai Hoa and Tam Thức views with a segmented control
 * for switching between divination methods.
 *
 * Reads ?method=tam-thuc URL param for deep-linking.
 */

import React, { Suspense } from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useSearchParams } from 'react-router-dom';
import { useAppStore } from '@/stores/appStore';
import LoadingState from '../shared/LoadingState';

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

  // URL is the single source of truth — no local state, no sync loops
  const activeMethod: DivinationMethod = searchParams.get('method') === 'tam-thuc' ? 'tam-thuc' : 'mai-hoa';

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
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeMethod === method.id
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20'
                : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
          >
            <span className="material-icons-round text-base">{method.icon}</span>
            <span className="hidden sm:inline">{method.label}</span>
            <span className="sm:hidden text-xs">{method.id === 'mai-hoa' ? 'Mai Hoa' : 'Tam Thức'}</span>
          </button>
        ))}
      </div>

      {/* Active Method View */}
      <Suspense fallback={<LoadingState />}>
        {activeMethod === 'mai-hoa' ? (
          <MaiHoaView selectedDate={selectedDate} />
        ) : (
          <TamThucView selectedDate={selectedDate} />
        )}
      </Suspense>
    </div>
  );
}
