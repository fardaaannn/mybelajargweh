/**
 * Header Component
 * @module components/ui-custom/Header
 * 
 * Application header with navigation, logo, and theme toggle.
 * Features iPhone-inspired design with blur effect.
 */

import React from 'react';
import { Code2, Moon, Sun, ChevronLeft, BookOpen } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';

/** Props for Header component */
interface HeaderProps {
  /** Current page title */
  title?: string;
  /** Show back button */
  showBack?: boolean;
  /** Back button click handler */
  onBack?: () => void;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Header Component
 * 
 * Renders the application header with:
 * - Logo and brand name
 * - Page title (optional)
 * - Back button (optional)
 * - Dark mode toggle
 * 
 * @example
 * ```tsx
 * <Header title="Dashboard" />
 * <Header title="Workspace" showBack onBack={() => navigate('/')} />
 * ```
 */
export const Header: React.FC<HeaderProps> = ({ 
  title,
  showBack = false,
  onBack,
  className = '' 
}) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header 
      className={`
        sticky top-0 z-50 w-full
        bg-background/80 backdrop-blur-xl
        border-b border-border/50
        safe-area-inset-top
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Back Button + Logo/Title */}
          <div className="flex items-center gap-3">
            {showBack && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="rounded-full -ml-2"
                aria-label="Go back"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            )}
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(var(--ios-blue))] to-[hsl(var(--ios-purple))] flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              {!title && (
                <span className="font-bold text-lg hidden sm:block">
                  CodeLearn
                </span>
              )}
            </div>

            {/* Page Title */}
            {title && (
              <>
                <span className="text-muted-foreground hidden sm:block">/</span>
                <h1 className="font-semibold text-lg truncate max-w-[200px] sm:max-w-md">
                  {title}
                </h1>
              </>
            )}
          </div>

          {/* Right Section: Actions */}
          <div className="flex items-center gap-2">
            {/* Study Icon (decorative) */}
            <div className="hidden sm:flex items-center gap-2 text-muted-foreground mr-2">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Belajar Coding</span>
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
