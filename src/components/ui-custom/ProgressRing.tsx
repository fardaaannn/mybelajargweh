/**
 * Progress Ring Component
 * @module components/ui-custom/ProgressRing
 * 
 * Circular progress indicator with percentage display.
 * Used for visualizing completion status.
 */

import React from 'react';

/** Props for ProgressRing component */
interface ProgressRingProps {
  /** Progress percentage (0-100) */
  progress: number;
  /** Size of the ring in pixels */
  size?: number;
  /** Stroke width of the ring */
  strokeWidth?: number;
  /** Color of the progress arc */
  color?: string;
  /** Background color of the ring track */
  trackColor?: string;
  /** Optional additional CSS classes */
  className?: string;
  /** Show percentage text in center */
  showText?: boolean;
}

/**
 * ProgressRing Component
 * 
 * Renders a circular progress indicator with:
 * - Animated progress arc
 * - Center text showing percentage
 * - Customizable size and colors
 * 
 * @example
 * ```tsx
 * <ProgressRing progress={75} size={80} showText />
 * <ProgressRing progress={100} color="hsl(var(--ios-green))" />
 * ```
 */
export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 60,
  strokeWidth = 4,
  color = 'hsl(var(--ios-blue))',
  trackColor = 'hsl(var(--muted))',
  className = '',
  showText = true,
}) => {
  // Calculate SVG parameters
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(progress, 100) / 100) * circumference;
  const center = size / 2;

  return (
    <div 
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      
      {/* Center text */}
      {showText && (
        <span 
          className="absolute text-sm font-semibold"
          style={{ color }}
        >
          {Math.round(progress)}%
        </span>
      )}
    </div>
  );
};
