/**
 * Module Card Component
 * @module components/ui-custom/ModuleCard
 * 
 * Displays a lesson module with progress bar, difficulty badge,
 * and completion status. Uses iPhone-inspired card design.
 */

import React from 'react';
import { 
  FileCode, 
  Palette, 
  Code2, 
  MousePointer, 
  Smartphone, 
  Zap,
  ChevronRight,
  CheckCircle2,
  Circle,
  Type,
  Link,
  LayoutGrid,
  Square,
  ALargeSmall,
  PanelLeft,
  Columns3,
  Grid3x3,
  Calculator,
  Repeat,
  Braces,
  Hash,
  List,
  Box,
  Sparkles,
  Play,
  Timer,
  Rocket,
  ClipboardList,
} from 'lucide-react';
import type { LessonModule } from '@/types';

/** Props for ModuleCard component */
interface ModuleCardProps {
  /** Module data to display */
  module: LessonModule;
  /** Click handler for the card */
  onClick?: (module: LessonModule) => void;
  /** Optional additional CSS classes */
  className?: string;
}

/** Icon mapping for different module types */
const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  FileCode,
  Palette,
  Code2,
  MousePointer,
  Smartphone,
  Zap,
  Type,
  Link,
  LayoutGrid,
  Square,
  ALargeSmall,
  PanelLeft,
  Columns3,
  Grid3x3,
  Calculator,
  Repeat,
  Braces,
  Hash,
  List,
  Box,
  Sparkles,
  Play,
  Timer,
  Rocket,
  ClipboardList,
};

/**
 * ModuleCard Component
 * 
 * Renders a card displaying lesson module information with:
 * - Icon and title
 * - Difficulty badge (beginner/intermediate/advanced)
 * - Progress bar with percentage
 * - Completion status indicator
 * 
 * @example
 * ```tsx
 * <ModuleCard 
 *   module={lessonModules[0]} 
 *   onClick={(m) => navigate(`/workspace/${m.id}`)} 
 * />
 * ```
 */
export const ModuleCard: React.FC<ModuleCardProps> = ({ 
  module, 
  onClick,
  className = '' 
}) => {
  // Get the appropriate icon component
  const IconComponent = iconMap[module.icon] || FileCode;
  
  // Determine badge class based on difficulty
  const badgeClass = {
    beginner: 'ios-badge-beginner',
    intermediate: 'ios-badge-intermediate',
    advanced: 'ios-badge-advanced',
    expert: 'ios-badge-expert',
  }[module.difficulty];

  // Calculate if module is completed
  const isCompleted = module.progress === 100;
  const hasStarted = module.progress > 0;

  return (
    <div
      onClick={() => onClick?.(module)}
      className={`
        ios-card p-5 cursor-pointer transition-all duration-300
        hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]
        ${className}
      `}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.(module);
        }
      }}
    >
      {/* Header: Icon and Status */}
      <div className="flex items-start justify-between mb-3">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${module.color}15` }}
        >
          <IconComponent 
            className="w-6 h-6" 
            style={{ color: module.color }} 
          />
        </div>
        
        {/* Status Icon */}
        {isCompleted ? (
          <CheckCircle2 className="w-5 h-5 text-[hsl(var(--ios-green))]" />
        ) : hasStarted ? (
          <Circle className="w-5 h-5 text-[hsl(var(--ios-blue))]" />
        ) : (
          <Circle className="w-5 h-5 text-muted-foreground/30" />
        )}
      </div>

      {/* Title and Description */}
      <h3 className="font-semibold text-lg mb-1 line-clamp-1">
        {module.title}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {module.description}
      </p>

      {/* Difficulty Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className={badgeClass}>
          {module.difficulty === 'beginner' && '🟢 Pemula'}
          {module.difficulty === 'intermediate' && '🟡 Menengah'}
          {module.difficulty === 'advanced' && '🔴 Lanjutan'}
          {module.difficulty === 'expert' && '👑 Sepuh'}
        </span>
        <span className="text-xs text-muted-foreground">
          {module.completedExercises}/{module.totalExercises} latihan
        </span>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-3">
        <div className="ios-progress flex-1">
          <div 
            className="ios-progress-bar"
            style={{ width: `${module.progress}%` }}
          />
        </div>
        <span className="text-sm font-medium text-muted-foreground min-w-[40px] text-right">
          {module.progress}%
        </span>
      </div>

      {/* Action Hint */}
      <div className="flex items-center justify-end mt-4 pt-3 border-t border-border/50">
        <span className="text-sm text-[hsl(var(--ios-blue))] font-medium flex items-center gap-1">
          {isCompleted ? 'Ulangi' : hasStarted ? 'Lanjutkan' : 'Mulai'}
          <ChevronRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
};
