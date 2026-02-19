/**
 * Loading Spinner Component
 * @module components/ui-custom/LoadingSpinner
 * 
 * Reusable loading indicator with various sizes and styles.
 */

import React from 'react';
import { Code2 } from 'lucide-react';

interface LoadingSpinnerProps {
  /** Size of the spinner */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Optional loading message */
  message?: string;
  /** Full screen overlay mode */
  fullScreen?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * LoadingSpinner Component
 * 
 * Renders an animated loading indicator.
 * 
 * @example
 * ```tsx
 * <LoadingSpinner size="lg" message="Memuat..." />
 * <LoadingSpinner fullScreen message="Menyimpan progress..." />
 * ```
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  message,
  fullScreen = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const spinnerContent = (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* Animated Spinner */}
      <div className="relative">
        {/* Outer ring */}
        <div 
          className={`${sizeClasses[size]} rounded-full border-4 border-muted`}
        />
        {/* Spinning arc */}
        <div 
          className={`
            absolute inset-0 rounded-full border-4 border-transparent
            border-t-[hsl(var(--ios-blue))] border-r-[hsl(var(--ios-purple))]
            animate-spin
            ${sizeClasses[size]}
          `}
          style={{ animationDuration: '1s' }}
        />
        {/* Center icon (for larger sizes) */}
        {(size === 'lg' || size === 'xl') && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Code2 className="w-1/3 h-1/3 text-[hsl(var(--ios-blue))]" />
          </div>
        )}
      </div>

      {/* Loading Message */}
      {message && (
        <p className="text-muted-foreground text-sm animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

/**
 * PageLoader Component
 * 
 * Full-page loading state for route transitions.
 */
export const PageLoader: React.FC<{ message?: string }> = ({ 
  message = 'Memuat...' 
}) => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <LoadingSpinner size="lg" message={message} />
  </div>
);

/**
 * SkeletonCard Component
 * 
 * Loading placeholder for card components.
 */
export const SkeletonCard: React.FC = () => (
  <div className="ios-card p-5 animate-pulse">
    <div className="flex items-start justify-between mb-3">
      <div className="w-12 h-12 rounded-xl bg-muted" />
      <div className="w-5 h-5 rounded-full bg-muted" />
    </div>
    <div className="h-6 bg-muted rounded mb-2 w-3/4" />
    <div className="h-4 bg-muted rounded mb-1 w-full" />
    <div className="h-4 bg-muted rounded mb-4 w-2/3" />
    <div className="flex gap-2 mb-4">
      <div className="h-5 bg-muted rounded-full w-16" />
      <div className="h-5 bg-muted rounded-full w-20" />
    </div>
    <div className="h-2 bg-muted rounded-full" />
  </div>
);

/**
 * SkeletonStats Component
 * 
 * Loading placeholder for stats section.
 */
export const SkeletonStats: React.FC = () => (
  <div className="ios-card p-4 flex items-center gap-4 animate-pulse">
    <div className="w-14 h-14 rounded-full bg-muted" />
    <div className="flex-1">
      <div className="h-4 bg-muted rounded mb-2 w-24" />
      <div className="h-6 bg-muted rounded w-16" />
    </div>
  </div>
);
