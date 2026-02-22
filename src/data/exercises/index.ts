/**
 * Exercises Barrel Export
 * @module data/exercises/index
 *
 * Re-exports all module exercise arrays and provides helper functions
 * for querying exercises by module, ID, or navigation.
 */
import type { ExerciseWithValidation } from './types';
export type { ExerciseWithValidation, ValidationRule } from './types';

// ── Beginner Modules ──
import { htmlIntroExercises } from './html-intro';
import { htmlContentExercises } from './html-content';
import { htmlLinksMediaExercises } from './html-links-media';
import { htmlStructureExercises } from './html-structure';
import { cssIntroExercises } from './css-intro';
import { cssBoxModelExercises } from './css-box-model';
import { cssTextFontExercises } from './css-text-font';
import { jsIntroExercises } from './js-intro';

// ── Intermediate Modules ──
import { cssLayoutExercises } from './css-layout';
import { cssFlexboxExercises } from './css-flexbox';
import { cssGridExercises } from './css-grid';
import { cssResponsiveExercises } from './css-responsive';
import { jsOperatorsExercises } from './js-operators';
import { jsLoopsExercises } from './js-loops';
import { jsFunctionsExercises } from './js-functions';
import { jsStringsNumbersExercises } from './js-strings-numbers';
import { jsArraysExercises } from './js-arrays';

// ── Advanced Modules ──
import { jsObjectsExercises } from './js-objects';
import { jsDomExercises } from './js-dom';
import { jsEventsExercises } from './js-events';
import { cssAdvancedExercises } from './css-advanced';
import { cssAnimationExercises } from './css-animation';

// ── Expert Modules ──
import { jsAsyncExercises } from './js-async';
import { jsModernExercises } from './js-modern';
import { htmlFormsExercises } from './html-forms';

/** Maps module IDs to their exercise arrays */
const exercisesByModuleId: Record<string, ExerciseWithValidation[]> = {
  // Beginner
  'html-intro': htmlIntroExercises,
  'html-content': htmlContentExercises,
  'html-links-media': htmlLinksMediaExercises,
  'html-structure': htmlStructureExercises,
  'css-intro': cssIntroExercises,
  'css-box-model': cssBoxModelExercises,
  'css-text-font': cssTextFontExercises,
  'js-intro': jsIntroExercises,
  // Intermediate
  'css-layout': cssLayoutExercises,
  'css-flexbox': cssFlexboxExercises,
  'css-grid': cssGridExercises,
  'css-responsive': cssResponsiveExercises,
  'js-operators': jsOperatorsExercises,
  'js-loops': jsLoopsExercises,
  'js-functions': jsFunctionsExercises,
  'js-strings-numbers': jsStringsNumbersExercises,
  'js-arrays': jsArraysExercises,
  // Advanced
  'js-objects': jsObjectsExercises,
  'js-dom': jsDomExercises,
  'js-events': jsEventsExercises,
  'css-advanced': cssAdvancedExercises,
  'css-animation': cssAnimationExercises,
  // Expert
  'js-async': jsAsyncExercises,
  'js-modern': jsModernExercises,
  'html-forms': htmlFormsExercises,
};

/** Get exercises by module ID */
export const getExercisesByModule = (moduleId: string): ExerciseWithValidation[] => {
  return exercisesByModuleId[moduleId] || [];
};

/** Get a flat list of ALL exercises across all modules */
const getAllExercises = (): ExerciseWithValidation[] => {
  return Object.values(exercisesByModuleId).flat();
};

/** Get exercise by ID */
export const getExerciseById = (exerciseId: string): ExerciseWithValidation | undefined => {
  return getAllExercises().find(e => e.id === exerciseId);
};

/** Get next exercise within the same module */
export const getNextExercise = (currentId: string, moduleId: string): ExerciseWithValidation | null => {
  const exercises = getExercisesByModule(moduleId);
  const currentIndex = exercises.findIndex(e => e.id === currentId);
  return exercises[currentIndex + 1] || null;
};

/** Get previous exercise within the same module */
export const getPreviousExercise = (currentId: string, moduleId: string): ExerciseWithValidation | null => {
  const exercises = getExercisesByModule(moduleId);
  const currentIndex = exercises.findIndex(e => e.id === currentId);
  return exercises[currentIndex - 1] || null;
};
