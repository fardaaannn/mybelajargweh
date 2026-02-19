/**
 * Theme Context for Dark Mode Management
 * @module context/ThemeContext
 * 
 * Provides global theme state and toggle functionality for the application.
 * Uses React Context API for state management.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ThemeMode } from '@/types';

/** Interface for theme context value */
interface ThemeContextType {
  /** Current theme mode */
  theme: ThemeMode;
  /** Toggle between light and dark mode */
  toggleTheme: () => void;
  /** Set theme to specific mode */
  setTheme: (mode: ThemeMode) => void;
  /** Check if current theme is dark */
  isDark: boolean;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
  isDark: false,
});

/** Custom hook to access theme context */
export const useTheme = () => useContext(ThemeContext);

/** Props for ThemeProvider component */
interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Theme Provider Component
 * Wraps the application to provide theme state globally
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize theme from localStorage or system preference
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    // Check localStorage first
    const saved = localStorage.getItem('codelearn-theme') as ThemeMode;
    if (saved && (saved === 'light' || saved === 'dark')) {
      return saved;
    }
    // Fall back to system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // Computed property for dark mode check
  const isDark = theme === 'dark';

  // Update localStorage and document class when theme changes
  useEffect(() => {
    localStorage.setItem('codelearn-theme', theme);
    
    // Add/remove dark class on document element for Tailwind dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  /** Toggle between light and dark mode */
  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  /** Set theme to specific mode */
  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
