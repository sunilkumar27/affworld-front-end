// src/components/shared/feedback/AlertMessage.jsx
import React from 'react';

/**
 * @typedef {Object} AlertMessageProps
 * @property {'success' | 'error'} type - Alert type
 * @property {string} message - Alert message
 */

/**
 * Reusable alert message component
 * @param {AlertMessageProps} props
 */
export const AlertMessage = ({ type, message }) => {
  const styles = {
    success: 'bg-green-500/10 border border-green-500/20 text-green-400',
    error: 'bg-red-500/10 border border-red-500/20 text-red-400'
  };
 
  return (
    <div className={`${styles[type]} p-3 rounded mb-6`}>
      {message?.message || message} {/* Handle both Error objects and strings */}
    </div>
  );
 };