/**
 * Shared Types for Exercises
 * @module data/exercises/types
 */

import type { Exercise } from '@/types';

/** Validation rule for exercises */
export interface ValidationRule {
  /** Type of validation */
  type: 'contains' | 'not-contains' | 'regex' | 'function';
  /** Value to check against */
  value?: string | RegExp;
  /** Custom validation function */
  validator?: (code: { html: string; css: string; js: string }) => boolean;
  /** Error message if validation fails */
  message: string;
}

/** Extended exercise with validation */
export interface ExerciseWithValidation extends Exercise {
  /** Validation rules for checking answer */
  validationRules: ValidationRule[];
  /** Success message when answer is correct */
  successMessage: string;
}
