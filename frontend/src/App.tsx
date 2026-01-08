/**
 * Application root component with lazy-loaded routes.
 */
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { BaseLayout } from '@/components/layout/BaseLayout';
import { ROUTES } from '@/constants/routes';

// Lazy load pages for code splitting
const LandingPage = lazy(() => import('@/pages/LandingPage').then(m => ({ default: m.LandingPage })));
const AnalysePage = lazy(() => import('@/pages/AnalysePage').then(m => ({ default: m.AnalysePage })));
const StatsPage = lazy(() => import('@/pages/StatsPage').then(m => ({ default: m.StatsPage })));
const AboutPage = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-neutral-500 text-sm">Loading...</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BaseLayout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path={ROUTES.HOME} element={<LandingPage />} />
          <Route path={ROUTES.ANALYSE} element={<AnalysePage />} />
          <Route path={ROUTES.STATS} element={<StatsPage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        </Routes>
      </Suspense>
    </BaseLayout>
  );
}