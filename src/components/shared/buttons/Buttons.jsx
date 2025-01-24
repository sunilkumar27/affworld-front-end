// src/components/shared/buttons/button.jsx
import React from 'react';

/**
 * @typedef {Object} ButtonProps
 * @property {React.ReactNode} children - Button content
 * @property {'primary' | 'secondary' | 'danger'} [variant] - Button variant
 * @property {boolean} [loading] - Loading state
 * @property {string} [className] - Additional CSS classes
 * @property {React.ButtonHTMLAttributes} rest - Other button props
 */

/**
 * Reusable button component
 * @param {ButtonProps} props
 */
export const Button = ({
  children,
  variant = 'primary',
  loading = false,
  className = '',
  ...rest
}) => {
  const variants = {
    primary: 'bg-primary hover:bg-primary/90',
    secondary: 'bg-card-border hover:bg-card-border/80',
    danger: 'bg-red-500 hover:bg-red-600'
  };

  return (
    <button
      className={`
        px-4 py-2 text-white rounded-md transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      disabled={loading}
      {...rest}
    >
      {loading ? (
        <div className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </div>
      ) : children}
    </button>
  );
};