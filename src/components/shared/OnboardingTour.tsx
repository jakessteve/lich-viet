/**
 * OnboardingTour — First-time user walkthrough
 *
 * A 4-step tour highlighting the app's key features.
 * Persists completion to localStorage to avoid showing again.
 */

import { useState, useEffect } from 'react';
import '../../styles/onboarding.css';

const STORAGE_KEY = 'lich-viet-onboarding-complete';

interface TourStep {
  title: string;
  description: string;
  icon: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: 'Lịch Âm — Xem ngày tốt xấu',
    description: 'Tra cứu âm lịch, xem sao tốt xấu, Dụng Sự và giờ hoàng đạo cho mỗi ngày.',
    icon: 'calendar_today',
  },
  {
    title: 'Tử Vi & Bát Tự — Giải mã lá số',
    description: 'Lập lá số Tử Vi và Tứ Trụ Bát Tự để phân tích vận mệnh chi tiết.',
    icon: 'auto_awesome',
  },
  {
    title: 'Gieo Quẻ — Mai Hoa & Tam Thức',
    description: 'Gieo quẻ Mai Hoa Dịch Số, Thái Ất, Kỳ Môn Độn Giáp và Lục Nhâm.',
    icon: 'psychology',
  },
  {
    title: 'Miễn phí & Premium',
    description: 'Lịch âm, gieo quẻ hoàn toàn miễn phí. Đăng ký miễn phí để mở khóa phân tích chuyên sâu, Đại Hạn và PDF báo cáo.',
    icon: 'workspace_premium',
  },
  {
    title: 'Khám phá thêm',
    description: 'Chiêm Tinh phương Tây, Thần Số Học, Phong Thủy Phi Tinh và nhiều hơn nữa!',
    icon: 'explore',
  },
];

export default function OnboardingTour() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const completed = localStorage.getItem(STORAGE_KEY);
    if (!completed) {
      // Small delay to let the app render first
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  const step = TOUR_STEPS[currentStep];
  const isLast = currentStep === TOUR_STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      handleComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsVisible(false);
  };

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-modal">
        {/* Progress dots */}
        <div className="onboarding-dots">
          {TOUR_STEPS.map((_, i) => (
            <span
              key={i}
              className={`onboarding-dot${i === currentStep ? ' active' : ''}${i < currentStep ? ' done' : ''}`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="onboarding-icon-wrap">
          <span className="material-icons-round onboarding-icon">{step.icon}</span>
        </div>
        <h2 className="onboarding-title">{step.title}</h2>
        <p className="onboarding-desc">{step.description}</p>

        {/* Actions */}
        <div className="onboarding-actions">
          <button className="onboarding-skip" onClick={handleComplete}>
            Bỏ qua
          </button>
          <button className="onboarding-next" onClick={handleNext}>
            {isLast ? 'Bắt đầu' : 'Tiếp theo'}
            {!isLast && <span style={{ fontSize: 18, marginLeft: 2 }}>→</span>}
          </button>
        </div>

        {/* Step counter */}
        <span className="onboarding-counter">
          {currentStep + 1} / {TOUR_STEPS.length}
        </span>
      </div>
    </div>
  );
}
