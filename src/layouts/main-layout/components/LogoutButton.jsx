// src/layouts/main-layout/components/LogoutButton.jsx
import React from 'react';

/**
 * Logout button with sign-out functionality
 * @param {Object} props - Component properties
 * @param {Function} props.onLogout - Callback function to handle logout process
 */
const LogoutButton = ({ onLogout }) => (
  <button
    onClick={onLogout}
    className="text-gray-300 hover:text-white transition-colors px-3 py-2 text-sm font-medium flex items-center space-x-2"
  >
    <span>Sign Out</span>
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-5 w-5" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
      />
    </svg>
  </button>
);

export default LogoutButton;