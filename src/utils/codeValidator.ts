/**
 * Code Validator Utility
 * @module utils/codeValidator
 * 
 * Validates user code against exercise requirements.
 */

import type { ValidationRule } from '@/data/exercises';

/** Validation result */
export interface ValidationResult {
  /** Whether all validations passed */
  isValid: boolean;
  /** Array of error messages */
  errors: string[];
  /** Array of passed validations */
  passed: string[];
}

/**
 * Validate code against rules
 * @param code - Code state to validate
 * @param rules - Validation rules
 * @returns Validation result
 */
export const validateCode = (
  code: { html: string; css: string; js: string },
  rules: ValidationRule[]
): ValidationResult => {
  const errors: string[] = [];
  const passed: string[] = [];

  for (const rule of rules) {
    let isValid = false;

    switch (rule.type) {
      case 'contains':
        isValid = code.html.includes(rule.value as string) ||
                  code.css.includes(rule.value as string) ||
                  code.js.includes(rule.value as string);
        break;

      case 'not-contains':
        isValid = !code.html.includes(rule.value as string) &&
                  !code.css.includes(rule.value as string) &&
                  !code.js.includes(rule.value as string);
        break;

      case 'regex':
        const regex = rule.value as RegExp;
        isValid = regex.test(code.html) ||
                  regex.test(code.css) ||
                  regex.test(code.js);
        break;

      case 'function':
        if (rule.validator) {
          isValid = rule.validator(code);
        }
        break;
    }

    if (isValid) {
      passed.push(rule.message);
    } else {
      errors.push(rule.message);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    passed,
  };
};

/**
 * Format validation errors for display
 * @param errors - Array of error messages
 * @returns Formatted string
 */
export const formatValidationErrors = (errors: string[]): string => {
  if (errors.length === 0) return '';
  if (errors.length === 1) return errors[0];
  return `Ada ${errors.length} masalah yang perlu diperbaiki:\n• ${errors.join('\n• ')}`;
};

/**
 * Get validation progress
 * @param passed - Number of passed rules
 * @param total - Total number of rules
 * @returns Progress percentage
 */
export const getValidationProgress = (passed: number, total: number): number => {
  return Math.round((passed / total) * 100);
};
