// src/components/shared/Modal.jsx
import React from 'react';

/**
 * Modal component with backdrop and content container
 * @param {boolean} open - Modal visibility state
 * @param {function} onClose - Close handler function 
 * @param {React.ReactNode} children - Modal content
 * @returns {JSX.Element | null} Modal or null when closed
 */
export const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-card-bg border border-card-border rounded-lg shadow-lg p-6 max-w-md w-full">
        {children}
      </div>
    </div>
  );
};