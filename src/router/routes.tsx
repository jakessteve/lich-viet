/**
 * Application Route Configuration
 *
 * Extracted from App.tsx for cleaner separation of routing from layout.
 * All route definitions and lazy-loaded page imports are centralized here.
 */

import React, { Suspense } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from '../components/ErrorBoundary';
import LoadingState from '../components/shared/LoadingState';

// Lazy-load pages
const LandingPage = React.lazy(() => import('../components/pages/LandingPage'));
const SettingsPage = React.lazy(() => import('../components/pages/SettingsPage'));
const AdminPage = React.lazy(() => import('../components/pages/AdminPage'));
const AdminAuthGuard = React.lazy(() => import('../components/auth/AdminAuthGuard'));
const LoginPage = React.lazy(() => import('../components/pages/LoginPage'));
const RegisterPage = React.lazy(() => import('../components/pages/RegisterPage'));
const UpgradePage = React.lazy(() => import('../components/pages/UpgradePage'));
const WidgetPage = React.lazy(() => import('../components/pages/WidgetPage'));

// Lazy-load feature modules
const GieoQueView = React.lazy(() => import('../components/GieoQue/GieoQueView'));
const ChiemTinhView = React.lazy(() => import('../components/ChiemTinh/ChiemTinhView'));
const NumerologyView = React.lazy(() => import('../components/Numerology/NumerologyView'));
const PersonalizedDailyHero = React.lazy(() => import('../components/pages/PersonalizedDailyHero'));

const AmLichPage = React.lazy(() => import('../components/pages/AmLichPage'));
const TuViPage = React.lazy(() => import('../components/pages/TuViPage'));
const HopLaPage = React.lazy(() => import('../components/pages/HopLaPage'));

// ══════════════════════════════════════════════════════════
// Landing Route (standalone, no app chrome)
// ══════════════════════════════════════════════════════════

export function LandingRoute() {
  return (
    <Suspense fallback={<LoadingState />}>
      <LandingPage />
    </Suspense>
  );
}

export function WidgetRoute() {
  return (
    <Suspense fallback={<LoadingState />}>
      <WidgetPage />
    </Suspense>
  );
}

// ══════════════════════════════════════════════════════════
// App Module Routes (rendered inside AppLayout's <Outlet />)
// ══════════════════════════════════════════════════════════

export function renderModuleRoutes() {
  return (
    <>
      {/* Default redirect */}
      <Route index element={<Navigate to="/app/hang-ngay" replace />} />

      {/* Module tabs */}
      <Route path="hang-ngay" element={
        <ErrorBoundary viewName="Hôm Nay">
          <Suspense fallback={<LoadingState />}>
            <div className="animate-fade-scale">
              <PersonalizedDailyHero />
            </div>
          </Suspense>
        </ErrorBoundary>
      } />
      <Route path="am-lich" element={
        <ErrorBoundary viewName="Âm Lịch">
          <Suspense fallback={<LoadingState />}>
            <div className="animate-fade-scale">
              <AmLichPage />
            </div>
          </Suspense>
        </ErrorBoundary>
      } />
      <Route path="lich-dung-su" element={<Navigate to="/app/am-lich" replace />} />
      <Route path="phong-thuy" element={<Navigate to="/app/am-lich" replace />} />
      <Route path="acs" element={<Navigate to="/app/am-lich" replace />} />
      <Route path="hop-la" element={
        <ErrorBoundary viewName="Hợp Lá Synastry">
          <Suspense fallback={<LoadingState />}>
            <div className="animate-fade-scale">
              <HopLaPage />
            </div>
          </Suspense>
        </ErrorBoundary>
      } />
      <Route path="gieo-que" element={
        <ErrorBoundary viewName="Gieo Quẻ — Mai Hoa & Tam Thức">
          <div className="animate-fade-scale">
            <Suspense fallback={<LoadingState />}>
              <GieoQueView />
            </Suspense>
          </div>
        </ErrorBoundary>
      } />
      <Route path="luc-nham" element={
        <Navigate to="/app/gieo-que?method=tam-thuc" replace />
      } />
      <Route path="tu-vi" element={
        <ErrorBoundary viewName="Tử Vi">
          <Suspense fallback={<LoadingState />}>
            <div className="animate-fade-scale">
              <TuViPage />
            </div>
          </Suspense>
        </ErrorBoundary>
      } />
      <Route path="bat-tu" element={<Navigate to="/app/tu-vi" replace />} />
      <Route path="chiem-tinh" element={
        <ErrorBoundary viewName="Chiêm Tinh — Bản Đồ Sao">
          <Suspense fallback={<LoadingState />}>
            <div className="animate-fade-scale">
              <ChiemTinhView />
            </div>
          </Suspense>
        </ErrorBoundary>
      } />
      <Route path="than-so-hoc" element={
        <ErrorBoundary viewName="Thần Số Học — Numerology">
          <Suspense fallback={<LoadingState />}>
            <div className="animate-fade-scale">
              <NumerologyView />
            </div>
          </Suspense>
        </ErrorBoundary>
      } />


      {/* Settings page */}
      <Route path="cai-dat" element={
        <Suspense fallback={<LoadingState />}>
          <SettingsPage />
        </Suspense>
      } />

      {/* Upgrade / Pricing page */}
      <Route path="nang-cap" element={
        <Suspense fallback={<LoadingState />}>
          <UpgradePage />
        </Suspense>
      } />

      {/* Auth pages */}
      <Route path="dang-nhap" element={
        <Suspense fallback={<LoadingState />}>
          <LoginPage />
        </Suspense>
      } />
      <Route path="dang-ky" element={
        <Suspense fallback={<LoadingState />}>
          <RegisterPage />
        </Suspense>
      } />

      {/* Admin page — auth-protected */}
      <Route path="quan-tri" element={
        <Suspense fallback={<LoadingState />}>
          <AdminAuthGuard>
            <AdminPage />
          </AdminAuthGuard>
        </Suspense>
      } />

      {/* Catch-all for invalid /app/* routes */}
      <Route path="*" element={<Navigate to="/app/am-lich" replace />} />
    </>
  );
}

// ══════════════════════════════════════════════════════════
// Legacy Redirects (old routes → new /app/* paths)
// ══════════════════════════════════════════════════════════

export function renderLegacyRedirects() {
  return (
    <>
      <Route path="/am-lich" element={<Navigate to="/app/am-lich" replace />} />
      <Route path="/lich-dung-su" element={<Navigate to="/app/am-lich" replace />} />
      <Route path="/phong-thuy" element={<Navigate to="/app/am-lich" replace />} />
      <Route path="/gieo-que" element={<Navigate to="/app/gieo-que" replace />} />
      <Route path="/tu-vi" element={<Navigate to="/app/tu-vi" replace />} />
      <Route path="/bat-tu" element={<Navigate to="/app/tu-vi" replace />} />
      <Route path="/chiem-tinh" element={<Navigate to="/app/chiem-tinh" replace />} />
      <Route path="/luc-nham" element={<Navigate to="/app/gieo-que?method=tam-thuc" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  );
}
