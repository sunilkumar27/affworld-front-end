// src/components/tasks/components/ColumnHeader.jsx
import React from 'react';

/**
 * Column header component with optional add task button
 * @param {string} title - Column title
 * @param {boolean} showAddButton - Whether to show add button
 * @param {Function} onAddClick - Add button click handler
 * @returns {JSX.Element} Header with title and optional add button
 */
export const ColumnHeader = ({ title, showAddButton, onAddClick }) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold text-white">{title}</h2>
    {showAddButton && (
      <button
        onClick={onAddClick}
        className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        aria-label="Add task"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="mr-2"
        >
          <path d="M12 5v14M5 12h14"/>
        </svg>
        Add Task
      </button>
    )}
  </div>
);