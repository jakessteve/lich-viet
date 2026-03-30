import React from 'react';
import { useAppStore } from '../../stores/appStore';

interface PremiumPaywallModalProps {
  featureName: string;
  onClose?: () => void;
  onPreview?: () => void;
}

export default function PremiumPaywallModal({ featureName, onClose, onPreview }: PremiumPaywallModalProps) {
  const toggleIsPremium = useAppStore(state => state.toggleIsPremium);

  const handleUnlock = () => {
    // In a real app, this goes to Stripe or IAP
    toggleIsPremium();
    if (onClose) onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred background overlay */}
      <div className="absolute inset-0 bg-background-light/60 dark:bg-background-dark/80 backdrop-blur-md rounded-2xl" />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-md bg-white dark:bg-card-dark rounded-3xl shadow-2xl border border-gold/30 p-8 text-center animate-fade-scale overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-amber-200 to-amber-400 text-amber-900 shadow-inner mb-6 relative">
          <span className="material-icons-round text-3xl">workspace_premium</span>
          <div className="absolute -inset-2 rounded-full border border-amber-300/50 animate-ping opacity-20" />
        </div>
        
        <h2 className="text-2xl font-black text-text-primary-light dark:text-text-primary-dark mb-2">
          Mở Khóa Premium
        </h2>
        
        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
          Nội dung <strong className="text-text-primary-light dark:text-white">"{featureName}"</strong> chỉ dành cho tài khoản Lịch Việt v2 Premium. Nâng cấp để đọc các phân tích chuyên sâu bởi chuyên gia.
        </p>

        <ul className="text-left space-y-3 mb-8 text-sm text-text-secondary-light dark:text-text-secondary-dark bg-gray-50/50 dark:bg-gray-800/30 p-4 rounded-xl">
          <li className="flex items-start gap-2">
            <span className="material-icons-round text-gold text-base">check_circle</span>
            <span>Giải mã toàn bộ Mệnh, Thân và 12 Cung Tử Vi</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="material-icons-round text-gold text-base">check_circle</span>
            <span>Phân tích Tứ Trụ Bát Tự & Dụng Thần chuyên sâu</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="material-icons-round text-gold text-base">check_circle</span>
            <span>Tải file PDF báo cáo VIP</span>
          </li>
        </ul>

        <div className="space-y-3">
          <button
            onClick={handleUnlock}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
          >
            Nâng Cấp Ngay (Demo Mở Khóa)
          </button>
          
          <button
            onClick={onPreview || onClose}
            className="w-full py-2.5 px-6 rounded-xl font-medium text-text-secondary-light dark:text-text-secondary-dark bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          >
            {onPreview ? 'Xem Bản Xem Trước' : 'Đóng'}
          </button>
        </div>
      </div>
    </div>
  );
}
