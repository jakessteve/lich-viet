import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Outlet } from 'react-router-dom';
import LoadingState from './components/shared/LoadingState';
import AppNav from './components/layout/AppNav';
import MobileDrawer from './components/layout/MobileDrawer';
import AppFooter from './components/layout/AppFooter';
import AppSidebar from './components/layout/AppSidebar';
import { ROUTE_TO_TAB, type ActiveTab } from './router/constants';
import { LandingRoute, WidgetRoute, renderModuleRoutes, renderLegacyRedirects } from './router/routes';
import { analytics } from './services/analyticsService';

const OnboardingTour = React.lazy(() => import('./components/shared/OnboardingTour'));
const GuidedTour = React.lazy(() => import('./components/shared/GuidedTour'));
const OnboardingQuiz = React.lazy(() => import('./components/shared/OnboardingQuiz'));

// ══════════════════════════════════════════════════════════
// App Layout — wraps the main app modules with nav/sidebar
// ══════════════════════════════════════════════════════════

// ... [skipping lines here would break replacement, I must provide full replacement content for StartLine to EndLine]
// App Layout — wraps the main app modules with nav/sidebar
// ══════════════════════════════════════════════════════════

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Track page view on route change
  useEffect(() => {
    analytics.trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  const activeTab: ActiveTab = ROUTE_TO_TAB[location.pathname] || 'am-lich';
  const isFullPage = location.pathname === '/app/cai-dat' || location.pathname === '/app/quan-tri' || location.pathname === '/app/dang-nhap' || location.pathname === '/app/dang-ky';

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-display text-text-primary-light dark:text-text-primary-dark transition-colors duration-300 antialiased relative">
      {/* Ambient mystery orbs — dark mode only */}
      <div className="hidden dark:block fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="mystery-orb mystery-orb-purple w-[500px] h-[500px] -top-40 -left-40 opacity-60" style={{ animationDelay: '0s' }} />
        <div className="mystery-orb mystery-orb-blue w-[400px] h-[400px] top-1/3 -right-32 opacity-50" style={{ animationDelay: '5s' }} />
        <div className="mystery-orb mystery-orb-gold w-[350px] h-[350px] bottom-20 left-1/4 opacity-40" style={{ animationDelay: '10s' }} />
      </div>
      {/* Skip-to-content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-gold"
      >
        Chuyển đến nội dung chính
      </a>

      {/* Navigation */}
      <AppNav />

      {/* Mobile slide-out drawer */}
      <MobileDrawer />

      <main id="main-content" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full relative z-10 scroll-mt-20" aria-label="Nội dung chính">
        {isFullPage ? (
          /* Full-page routes: Settings, Admin — with back-navigation */
          <div>
            {location.pathname !== '/app/cai-dat' && (
            <button
              onClick={() => navigate('/app/am-lich')}
              className="inline-flex items-center gap-1.5 mb-4 px-3 py-1.5 rounded-xl text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
            >
              <span className="material-icons-round text-lg">arrow_back</span>
              Quay lại ứng dụng
            </button>
            )}
            <Suspense fallback={<LoadingState />}>
              <Outlet />
            </Suspense>
          </div>
        ) : (
          /* Module tab routes: with sidebar */
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Sidebar — now autonomous, handles its own state */}
            <AppSidebar activeTab={activeTab} />

            {/* Main Content Area — Route-based rendering */}
            <div className="flex-1 w-full min-w-0">
              <Outlet />
            </div>
          </div>
        )}
      </main>

      <AppFooter />
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// Root App Component — Top-Level Routing
// ══════════════════════════════════════════════════════════

function App() {
  return (
    <Routes>
      {/* Landing page — standalone, no app chrome */}
      <Route path="/" element={<LandingRoute />} />

      {/* PWA Widget page — standalone, no app chrome */}
      <Route path="/widget" element={<WidgetRoute />} />

      {/* Main app — with nav, sidebar, footer */}
      <Route path="/app" element={<AppLayout />}>
        {renderModuleRoutes()}
      </Route>

      {/* Legacy redirects */}
      {renderLegacyRedirects()}
    </Routes>
  );
}

function AppWithOnboarding() {
  return (
    <>
      <App />
      <Suspense fallback={null}>
        <OnboardingQuiz />
        <OnboardingTour />
        <GuidedTour />
      </Suspense>
    </>
  );
}

export default AppWithOnboarding;
