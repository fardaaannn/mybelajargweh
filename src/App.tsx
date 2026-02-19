/**
 * Main App Component
 * @module App
 * 
 * Root component with all providers and routes.
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { PageLoader } from '@/components/ui-custom/LoadingSpinner';
import { ProgressProvider } from '@/context/ProgressContext';
import { AnalyticsWrapper } from '@/components/AnalyticsWrapper';
import { ThemeProvider } from '@/context/ThemeContext';
import './App.css';

// Lazy load pages
const Dashboard = lazy(() => import('@/pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Workspace = lazy(() => import('@/pages/Workspace').then(m => ({ default: m.Workspace })));
const NotFound = lazy(() => import('@/pages/NotFound').then(m => ({ default: m.NotFound })));

/**
 * App Component
 */
function App(): React.ReactElement {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ProgressProvider>
          <BrowserRouter>
            <AnalyticsWrapper>
              <Suspense fallback={<PageLoader message="Memuat aplikasi..." />}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/workspace/:moduleId" element={<Workspace />} />
                  <Route path="/workspace/:moduleId/:exerciseId" element={<Workspace />} />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </Suspense>
            </AnalyticsWrapper>
          </BrowserRouter>
        </ProgressProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
