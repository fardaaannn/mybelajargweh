/**
 * Type definitions for CodeLearn Platform
 * @module types
 */

/** Represents a single lesson module in the curriculum */
export interface LessonModule {
  /** Unique identifier for the module */
  id: string;
  /** Title of the lesson */
  title: string;
  /** Brief description of the lesson content */
  description: string;
  /** Difficulty level: beginner, intermediate, advanced */
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  /** Progress percentage (0-100) */
  progress: number;
  /** Total number of exercises in this module */
  totalExercises: number;
  /** Number of completed exercises */
  completedExercises: number;
  /** Icon name for the module (Lucide icon) */
  icon: string;
  /** Color theme for the module card */
  color: string;
}

/** Represents a single exercise/task within a lesson */
export interface Exercise {
  /** Unique identifier for the exercise */
  id: string;
  /** Exercise title */
  title: string;
  /** Detailed instructions for the exercise */
  instructions: string;
  /** Theory content explaining the concepts */
  theory: string;
  /** Hints to help the student */
  hints: string[];
  /** Expected output or solution criteria */
  expectedOutput: string;
  /** Starting HTML code template */
  starterHTML: string;
  /** Starting CSS code template */
  starterCSS: string;
  /** Starting JavaScript code template */
  starterJS: string;
  /** Module ID this exercise belongs to */
  moduleId: string;
  /** Exercise order within the module */
  order: number;
}

/** Code state for the editor */
export interface CodeState {
  /** Current HTML code */
  html: string;
  /** Current CSS code */
  css: string;
  /** Current JavaScript code */
  js: string;
}

/** Editor tab types */
export type EditorTab = 'html' | 'css' | 'js';

/** Theme mode type */
export type ThemeMode = 'light' | 'dark';

/** User progress data */
export interface UserProgress {
  /** Module ID */
  moduleId: string;
  /** Completed exercise IDs */
  completedExercises: string[];
  /** Last accessed timestamp */
  lastAccessed: Date;
}
