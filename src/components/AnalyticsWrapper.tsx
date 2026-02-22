/**
 * Analytics Wrapper Component
 * @module components/AnalyticsWrapper
 * 
 * Wraps children and tracks page views on route changes.
 */

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from './Analytics';

interface AnalyticsWrapperProps {
  children: React.ReactNode;
}

/**
 * Track page views
 * This is a simple implementation - replace with your analytics service
 */
export const AnalyticsWrapper: React.FC<AnalyticsWrapperProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    trackEvent('Page View', { path: location.pathname });
  }, [location]);

  return <>{children}</>;
};

// Re-export trackEvent for backward compatibility
export { trackEvent } from './Analytics';
