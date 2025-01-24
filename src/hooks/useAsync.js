// src/hooks/useAsync.js
import { useState, useCallback } from 'react';

/**
 * Manages async operations with comprehensive state tracking
 * Handles loading, success, error, and data states for async functions
 * @param {Function} asyncFn - Async function to execute
 * @param {Object} [options] - Hook configuration options
 * @returns {Object} Async operation state and control methods
 */
export const useAsync = (asyncFn, options = {}) => {
  const [state, setState] = useState({
    loading: false,
    success: false,
    error: null,
    data: null
  });

  /**
   * Execute the async function with error handling
   * @param {...*} args - Arguments for the async function
   * @returns {Promise<{success: boolean, data?: any, error?: Error}>} Execution result
   */
  const execute = useCallback(async (...args) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const data = await asyncFn(...args);
      
      setState({ loading: false, success: true, error: null, data });
      options.onSuccess?.(data);
      
      return { success: true, data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      const processedError = new Error(errorMessage);

      setState({ loading: false, success: false, error: processedError, data: null });
      options.onError?.(processedError);
      
      return { success: false, error: processedError };
    }
  }, [asyncFn, options]);

  /**
   * Reset the hook to its initial state
   */
  const reset = useCallback(() => {
    setState({
      loading: false,
      success: false,
      error: null,
      data: null
    });
  }, []);

  return {
    ...state,
    execute,
    reset
  };
};