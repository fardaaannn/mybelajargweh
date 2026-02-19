/**
 * Analytics Wrapper Component
 * @module components/AnalyticsWrapper
 * 
 * Wraps children and tracks page views on route changes.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
    // Simple console logging for development
    // Replace with actual analytics service like Google Analytics
    console.log('[Analytics] Page view:', location.pathname);
  }, [location]);

  return <>{children}</>;
};

/**
 * Track custom events
 * @param eventName - Name of the event
 * @param properties - Event properties
 */
export const trackEvent = (eventName: string, properties?: Record<string, any>): void => {
  console.log('[Analytics] Event:', eventName, properties);
};
