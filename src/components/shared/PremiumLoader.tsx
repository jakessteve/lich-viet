import React, { useState, useEffect } from 'react';

const LOADING_MESSAGES = [
  'Đang kết nối trung tâm dữ liệu...',
  'Đang tính toán thiên bàn địa bàn...',
  'Đang an 114 vì sao...',
  'Đang đồng bộ tuế vận...',
  'Đang tổng hợp luận giải...'
];

export default function PremiumLoader({ 
  messages = LOADING_MESSAGES,
  interval = 1500 
}: { 
  messages?: string[],
  interval?: number 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, interval);
    return () => clearInterval(timer);
  }, [messages.length, interval]);

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      <div className="relative">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 rounded-full border border-gold/30 animate-[spin_3s_linear_infinite]" />
        
        {/* Inner pulsing circle */}
        <div className="w-16 h-16 rounded-full border-t-2 border-r-2 border-gold animate-spin flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
          <div className="w-8 h-8 rounded-full bg-gold/20 animate-pulse" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium text-gold/90 transition-opacity duration-300">
          {messages[currentIndex]}
        </h3>
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark animate-pulse">
          Vui lòng đợi giây lát
        </p>
      </div>
    </div>
  );
}
