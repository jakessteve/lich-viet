import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import '../../styles/onboarding.css';

const STORAGE_KEY = 'lich-viet-guided-tour-complete';

interface TourStep {
  elementId: string;
  title: string;
  description: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

const TOUR_STEPS: TourStep[] = [
  {
    elementId: 'tour-logo',
    title: 'Chào mừng bạn đến với Lịch Việt!',
    description: 'Nơi hội tụ các kiến thức về Âm dương, Ngũ hành, Tử Vi và nhiều bộ môn huyền học khác.',
    position: 'bottom',
  },
  {
    elementId: 'tour-tabs',
    title: 'Menu chức năng',
    description: 'Dễ dàng chuyển đổi giữa các công cụ: Lịch Âm, Tử Vi, Bát Tự, Chiêm Tinh, Thần Số Học...',
    position: 'bottom',
  },
  {
    elementId: 'tour-calendar',
    title: 'Lịch tháng trực quan',
    description: 'Theo dõi nhanh các ngày tốt (đỏ), ngày xấu (đen) và các sự kiện âm lịch trong tháng.',
    position: 'right',
  },
  {
    elementId: 'tour-day-summary',
    title: 'Tóm tắt ngày',
    description: 'Cung cấp cái nhìn nhanh về những việc Nghi (nên làm) và Kỵ (nên tránh) trong ngày hôm nay.',
    position: 'bottom',
  },
  {
    elementId: 'tour-theme-toggle',
    title: 'Chế độ Sáng/Tối',
    description: 'Chuyển đổi giao diện để phù hợp với sở thích và bảo vệ đôi mắt của bạn.',
    position: 'bottom',
  },
  {
    elementId: 'tour-user-menu',
    title: 'Tài khoản & Cài đặt',
    description: 'Đăng nhập để mở khóa các tính năng Premium, quản lý hồ sơ và tùy chỉnh trải nghiệm.',
    position: 'bottom',
  },
];

export default function GuidedTour() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const updateHighlight = useCallback(() => {
    const step = TOUR_STEPS[currentStep];
    const element = document.getElementById(step.elementId);

    if (element) {
      const rect = element.getBoundingClientRect();
      setCoords({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
      });

      // Scroll into view if needed
      if (rect.top < 0 || rect.bottom > window.innerHeight) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      // If element not found (e.g. mobile hidden), fallback to center
      setCoords(null);
    }
  }, [currentStep]);

  useEffect(() => {
    const completed = localStorage.getItem(STORAGE_KEY);
    if (!completed) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      updateHighlight();
      window.addEventListener('resize', updateHighlight);
      window.addEventListener('scroll', updateHighlight);
      return () => {
        window.removeEventListener('resize', updateHighlight);
        window.removeEventListener('scroll', updateHighlight);
      };
    }
  }, [isVisible, updateHighlight]);

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

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsVisible(false);
  };

  // Calculate tooltip position
  const getTooltipStyle = (): React.CSSProperties => {
    if (!coords) {
      return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }

    const padding = 12;
    let top = coords.top + coords.height + padding;
    let left = coords.left + coords.width / 2;
    let transform = 'translateX(-50%)';

    if (step.position === 'top') {
      top = coords.top - padding;
      transform = 'translate(-50%, -100%)';
    } else if (step.position === 'right') {
      top = coords.top + coords.height / 2;
      left = coords.left + coords.width + padding;
      transform = 'translateY(-50%)';
    } else if (step.position === 'left') {
      top = coords.top + coords.height / 2;
      left = coords.left - padding;
      transform = 'translate(-100%, -50%)';
    }

    // Boundary checks (very basic)
    if (left < 160) {
        left = 160;
    } else if (left > window.innerWidth - 160) {
        left = window.innerWidth - 160;
    }

    return { top, left, transform, position: 'absolute' };
  };

  return createPortal(
    <div className="tour-overlay">
      {/* Spotlight with SVG Mask */}
      <svg className="tour-spotlight-svg">
        <defs>
          <mask id="spotlight-mask">
            <rect width="100%" height="100%" fill="white" />
            {coords && (
              <rect
                x={coords.left - 4}
                y={coords.top - 4 - window.scrollY}
                width={coords.width + 8}
                height={coords.height + 8}
                rx="12"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          width="100%" height="100%"
          fill="rgba(0,0,0,0.7)"
          mask="url(#spotlight-mask)"
        />
      </svg>

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="tour-tooltip animate-scale-in"
        style={getTooltipStyle()}
      >
        <div className="tour-tooltip-content">
          <div className="flex justify-between items-start mb-2">
            <h3 className="tour-tooltip-title">{step.title}</h3>
            <span className="tour-tooltip-counter">{currentStep + 1}/{TOUR_STEPS.length}</span>
          </div>
          <p className="tour-tooltip-desc">{step.description}</p>
          
          <div className="tour-tooltip-actions">
            <button className="tour-btn-skip" onClick={handleComplete}>Bỏ qua</button>
            <div className="flex gap-2">
              {currentStep > 0 && (
                <button className="tour-btn-back" onClick={handleBack}>Quay lại</button>
              )}
              <button className="tour-btn-next" onClick={handleNext}>
                {isLast ? 'Bắt đầu' : 'Tiếp theo'}
              </button>
            </div>
          </div>
        </div>
        {/* Arrow placeholder if needed */}
      </div>
    </div>,
    document.body
  );
}
