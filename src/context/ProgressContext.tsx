/**
 * Progress Context
 * @module context/ProgressContext
 * 
 * Manages user learning progress with localStorage persistence.
 * Tracks completed exercises, module progress, and overall stats.
 */

import React, { createContext, useContext, useReducer, useEffect, useCallback, useState } from 'react';
import type { LessonModule } from '@/types';
import { lessonModules } from '@/data/modules';

/** Progress state interface */
interface ProgressState {
  /** Completed exercise IDs */
  completedExercises: string[];
  /** Current exercise ID for each module */
  currentExercises: Record<string, string>;
  /** Last accessed timestamp */
  lastAccessed: string;
  /** Learning streak */
  streak: number;
  /** Last streak update date */
  streakLastDate: string;
}

/** Initial progress state */
const initialState: ProgressState = {
  completedExercises: [],
  currentExercises: {},
  lastAccessed: new Date().toISOString(),
  streak: 1,
  streakLastDate: new Date().toDateString(),
};

/** Progress action types */
type ProgressAction =
  | { type: 'COMPLETE_EXERCISE'; payload: string }
  | { type: 'SET_CURRENT_EXERCISE'; payload: { moduleId: string; exerciseId: string } }
  | { type: 'UPDATE_STREAK' }
  | { type: 'LOAD_PROGRESS'; payload: ProgressState }
  | { type: 'RESET_PROGRESS' };

/** Progress reducer */
function progressReducer(state: ProgressState, action: ProgressAction): ProgressState {
  switch (action.type) {
    case 'COMPLETE_EXERCISE':
      if (state.completedExercises.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        completedExercises: [...state.completedExercises, action.payload],
        lastAccessed: new Date().toISOString(),
      };

    case 'SET_CURRENT_EXERCISE':
      return {
        ...state,
        currentExercises: {
          ...state.currentExercises,
          [action.payload.moduleId]: action.payload.exerciseId,
        },
        lastAccessed: new Date().toISOString(),
      };

    case 'UPDATE_STREAK':
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      
      if (state.streakLastDate === today) {
        return state;
      }
      
      if (state.streakLastDate === yesterday) {
        return {
          ...state,
          streak: state.streak + 1,
          streakLastDate: today,
        };
      }
      
      return {
        ...state,
        streak: 1,
        streakLastDate: today,
      };

    case 'LOAD_PROGRESS':
      return action.payload;

    case 'RESET_PROGRESS':
      return initialState;

    default:
      return state;
  }
}

/** Progress context interface */
interface ProgressContextType {
  /** Current progress state */
  progress: ProgressState;
  /** Mark an exercise as completed */
  completeExercise: (exerciseId: string) => void;
  /** Set current exercise for a module */
  setCurrentExercise: (moduleId: string, exerciseId: string) => void;
  /** Check if exercise is completed */
  isExerciseCompleted: (exerciseId: string) => boolean;
  /** Get module progress percentage */
  getModuleProgress: (module: LessonModule) => number;
  /** Get overall progress percentage */
  getOverallProgress: () => number;
  /** Get completed exercises count for a module */
  getModuleCompletedCount: (moduleId: string) => number;
  /** Reset all progress */
  resetProgress: () => void;
  /** Update streak */
  updateStreak: () => void;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

/** Hook to use progress context */
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};

/** Props for ProgressProvider */
interface ProgressProviderProps {
  children: React.ReactNode;
}

/**
 * Progress Provider Component
 * 
 * Provides progress state management with localStorage persistence.
 */
export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const [progress, dispatch] = useReducer(progressReducer, initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('codelearn-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_PROGRESS', payload: { ...initialState, ...parsed } });
      } catch (e) {
        console.warn('Failed to load progress:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save progress to localStorage on changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('codelearn-progress', JSON.stringify(progress));
    }
  }, [progress, isLoaded]);

  /** Mark exercise as completed */
  const completeExercise = useCallback((exerciseId: string) => {
    dispatch({ type: 'COMPLETE_EXERCISE', payload: exerciseId });
  }, []);

  /** Set current exercise for a module */
  const setCurrentExercise = useCallback((moduleId: string, exerciseId: string) => {
    dispatch({ type: 'SET_CURRENT_EXERCISE', payload: { moduleId, exerciseId } });
  }, []);

  /** Check if exercise is completed */
  const isExerciseCompleted = useCallback((exerciseId: string) => {
    return progress.completedExercises.includes(exerciseId);
  }, [progress.completedExercises]);

  /** Get module progress percentage */
  const getModuleProgress = useCallback((module: LessonModule) => {
    const completed = progress.completedExercises.filter(id => 
      id.startsWith(module.id)
    ).length;
    return Math.round((completed / module.totalExercises) * 100);
  }, [progress.completedExercises]);

  /** Get overall progress percentage */
  const getOverallProgress = useCallback(() => {
    const totalExercises = lessonModules.reduce((sum, m) => sum + m.totalExercises, 0);
    return Math.round((progress.completedExercises.length / totalExercises) * 100);
  }, [progress.completedExercises]);

  /** Get completed exercises count for a module */
  const getModuleCompletedCount = useCallback((moduleId: string) => {
    return progress.completedExercises.filter(id => id.startsWith(moduleId)).length;
  }, [progress.completedExercises]);

  /** Reset all progress */
  const resetProgress = useCallback(() => {
    if (confirm('Apakah Anda yakin ingin menghapus semua progress? Tindakan ini tidak dapat dibatalkan.')) {
      dispatch({ type: 'RESET_PROGRESS' });
    }
  }, []);

  /** Update streak */
  const updateStreak = useCallback(() => {
    dispatch({ type: 'UPDATE_STREAK' });
  }, []);

  const value: ProgressContextType = {
    progress,
    completeExercise,
    setCurrentExercise,
    isExerciseCompleted,
    getModuleProgress,
    getOverallProgress,
    getModuleCompletedCount,
    resetProgress,
    updateStreak,
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

