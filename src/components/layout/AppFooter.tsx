import React from 'react';
import { useNavigate } from 'react-router-dom';

const CURRENT_YEAR = new Date().getFullYear();

function AppFooter() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-border-light dark:border-mystery-purple/10 mt-8 relative z-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="material-icons-round text-sm text-gold/60 dark:text-gold-dark/60" aria-hidden="true">menu</span>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
              © {CURRENT_YEAR} Lịch Việt — Tra cứu âm lịch &amp; phong thủy.
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <button onClick={() => navigate('/app/nang-cap')} className="relative cursor-pointer text-gold dark:text-gold-dark font-semibold hover:text-amber-700 dark:hover:text-amber-300 transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold dark:after:bg-gold-dark after:transition-all after:duration-200 hover:after:w-full">Nâng cấp</button>
            <button onClick={() => navigate('/')} className="relative cursor-pointer text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-white transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold dark:after:bg-gold-dark after:transition-all after:duration-200 hover:after:w-full">Giới thiệu</button>
            <button onClick={() => navigate('/app/cai-dat')} className="relative cursor-pointer text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-white transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold dark:after:bg-gold-dark after:transition-all after:duration-200 hover:after:w-full">Cài đặt</button>
            <a href="https://github.com/minhcopilot/Lich-Viet" target="_blank" rel="noopener noreferrer" className="relative cursor-pointer text-text-secondary-light dark:text-text-secondary-dark/80 hover:text-text-primary-light dark:hover:text-white transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold dark:after:bg-gold-dark after:transition-all after:duration-200 hover:after:w-full">GitHub</a>
            <span className="text-text-secondary-light/70 dark:text-text-secondary-dark/70 text-xs font-medium">v3.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(AppFooter);
