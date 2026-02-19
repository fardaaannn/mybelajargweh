/**
 * Custom Hook for LocalStorage State Persistence
 * @module hooks/useLocalStorage
 * 
 * Provides a useState-like interface that automatically persists
 * state to localStorage.
 */

import { useState, useEffect, useCallback } from 'react';

interface UseLocalStorageOptions<T> {
  /** Key for localStorage */
  key: string;
  /** Default value if nothing in localStorage */
  defaultValue: T;
  /** Optional serializer function */
  serialize?: (value: T) => string;
  /** Optional deserializer function */
  deserialize?: (value: string) => T;
}

interface UseLocalStorageReturn<T> {
  /** Current value */
  value: T;
  /** Set value directly */
  setValue: (value: T | ((prev: T) => T)) => void;
  /** Remove from localStorage and reset to default */
  remove: () => void;
}

/**
 * Custom hook for persisting state to localStorage
 * @param options - Configuration options
 * @returns Value and control functions
 */
export function useLocalStorage<T>({
  key,
  defaultValue,
  serialize = JSON.stringify,
  deserialize = JSON.parse,
}: UseLocalStorageOptions<T>): UseLocalStorageReturn<T> {
  // Initialize state from localStorage or default
  const [value, setValueState] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? deserialize(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  // Sync to localStorage when value changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      window.localStorage.setItem(key, serialize(value));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value, serialize]);

  /**
   * Set value with support for function updater
   * @param newValue - New value or updater function
   */
  const setValue = useCallback((newValue: T | ((prev: T) => T)) => {
    setValueState(prev => {
      const resolved = typeof newValue === 'function' 
        ? (newValue as (prev: T) => T)(prev) 
        : newValue;
      return resolved;
    });
  }, []);

  /** Remove item from localStorage and reset to default */
  const remove = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    try {
      window.localStorage.removeItem(key);
      setValueState(defaultValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, defaultValue]);

  return { value, setValue, remove };
}
