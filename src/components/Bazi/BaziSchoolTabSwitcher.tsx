import React, { useMemo } from 'react';
import { generateBaziChart, type BaziInput } from '@lich-viet/core/bazi';
import BaziMatrix from './BaziMatrix';

interface Props {
  input: BaziInput;
}

export default function BaziSchoolTabSwitcher({ input }: Props) {
  // Generate charts for all schools
  const viChart = useMemo(() => generateBaziChart(input.dateObj, input.exactTstHour, input.isMale, input.longitude, true, 'vi'), [input]);
  const cnChart = useMemo(() => generateBaziChart(input.dateObj, input.exactTstHour, input.isMale, input.longitude, true, 'cn'), [input]);
  const twChart = useMemo(() => generateBaziChart(input.dateObj, input.exactTstHour, input.isMale, input.longitude, true, 'tw'), [input]);

  const charts = [
    { school: 'vi', title: 'Việt Nam (Lý Số)', chart: viChart, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { school: 'cn', title: 'Trung Châu Phái (CN)', chart: cnChart, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/20' },
    { school: 'tw', title: 'Bắc Phái (Đài Loan)', chart: twChart, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="bg-surface-subtle-light dark:bg-surface-subtle-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex items-start gap-3">
        <span className="material-icons-round text-gold text-2xl">compare</span>
        <div>
          <h3 className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark mb-1">So Sánh Trường Phái Bát Tự</h3>
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
            Sự khác biệt giữa các trường phái chủ yếu đến từ cách phân chia <b>Giờ Tý</b> (Tảo Tý / Dạ Tý) và cách tính tuổi <b>Khởi Đại Vận</b> (làm tròn năm vs. tính theo tháng/ngày). Bảng so sánh dưới đây giúp bạn quan sát trực quan sự khác biệt này.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {charts.map(({ school, title, chart, color, bg }) => {
          const isSelected = input.school === school;
          return (
            <div key={school} className={`rounded-2xl border-2 transition-all overflow-hidden ${isSelected ? 'border-gold shadow-lg shadow-gold/10' : 'border-border-light dark:border-border-dark'}`}>
              <div className={`p-3 border-b border-border-light dark:border-border-dark ${bg} flex justify-between items-center`}>
                <h4 className={`text-sm font-bold flex items-center gap-1.5 ${color}`}>
                  <span className="material-icons-round text-base">temple_buddhist</span>
                  {title}
                  {isSelected && <span className="text-[10px] font-black uppercase tracking-wider bg-gold text-white px-2 py-0.5 rounded-full ml-2">Đang chọn</span>}
                </h4>
              </div>
              <div className="p-4 space-y-6">
                 {/* Bazi Matrix Scale down to fit column */}
                 <div className="transform origin-top scale-90 sm:scale-100 xl:scale-95 w-[111%] xl:w-[105%] -ml-[5.5%] xl:-ml-[2.5%]">
                    <BaziMatrix chart={chart} />
                 </div>

                 {/* Khởi Đại Vận Summary */}
                 <div className="flex items-center gap-3 p-3 bg-surface-base-light dark:bg-surface-base-dark border border-border-light dark:border-border-dark rounded-xl">
                    <div className="p-2 rounded-lg bg-surface-subtle-light dark:bg-surface-subtle-dark">
                        <span className="material-icons-round text-xl text-gold">timer</span>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark">Khởi Đại Vận</p>
                        <p className="text-sm font-black text-text-primary-light dark:text-text-primary-dark">
                            Năm {chart.daiVanStartAge} tuổi
                        </p>
                    </div>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
