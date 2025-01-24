// src/components/shared/form/FormHeader.jsx
import React from 'react';

/**
 * Form header component with title and close button
 * @param {string} title - Header title
 * @param {function} onClose - Close handler function
 * @returns {JSX.Element} Header with title and close button
 */
export const FormHeader = ({ title, onClose }) => (
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    <button
      onClick={onClose}
      className="text-gray-400 hover:text-white transition-colors"
      aria-label="Close"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </button>
  </div>
);