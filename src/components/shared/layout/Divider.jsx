// src/components/shared/layout/Divider.jsx
import React from 'react';

/**
 * Divider component with centered text
 * @param {string} text - Text to display in divider
 * @returns {JSX.Element} Horizontal divider with text
 */
export const Divider = ({ text }) => (
  <div className="relative mb-6">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-[#7c3bed33]"></div>
    </div>
    <div className="relative flex justify-center text-sm">
      <span className="px-2 text-white/60 bg-column">{text}</span>
    </div>
  </div>
);