// src/components/feed/components/ImageUploadField.jsx
import React from 'react';

/**
 * Image upload component with preview functionality
 * @param {Object} props
 * @param {string} props.preview - URL for image preview
 * @param {Function} props.onChange - Handler for file input change
 * @param {Function} props.onClear - Handler for clearing selected image
 */
export const ImageUploadField = ({ preview, onChange, onClear }) => (
  <div>
    <label className="block text-white/80 mb-2 text-sm">Image</label>
    {/* File input with custom styling */}
    <input
      type="file"
      accept="image/*"
      onChange={onChange}
      className="w-full text-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
      required
    />
    {/* Image preview with remove button */}
    {preview && (
      <div className="mt-2 relative">
        <img
          src={preview}
          alt="Preview"
          className="max-h-48 rounded-md object-cover"
        />
        <button
          type="button"
          onClick={onClear}
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
          aria-label="Remove image"
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
          >
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
    )}
  </div>
);