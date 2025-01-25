// src/components/feed/components/FeedHeader.jsx
import React from 'react';

/**
 * Header component for the feed section with add feed button
 * @param {Object} props
 * @param {Function} props.onCreateClick - Handler for add feed button click
 */
export const FeedHeader = ({ onCreateClick }) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold text-white">Feed</h2>
    {/* Create post button with plus icon */}
    <button
      onClick={onCreateClick}
      className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
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
      Add Feed
    </button>
  </div>
);