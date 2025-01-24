// src/components/shared/loading/LoadingSpinner.jsx
import React from 'react';

/**
 * Reusable loading spinner component
 */
export const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
  </div>
);
