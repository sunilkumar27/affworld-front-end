// src/components/shared/FormActions.jsx
import React from 'react';
import { Button } from '../index';

/**
 * Form actions component with cancel and submit buttons
 * @param {function} onCancel - Cancel handler function
 * @param {boolean} loading - Loading state
 * @param {string} submitText - Submit button text
 * @returns {JSX.Element} Action buttons group
 */
export const FormActions = ({ onCancel, loading, submitText }) => (
  <div className="flex justify-end space-x-2">
    <button
      type="button"
      onClick={onCancel}
      className="px-4 py-2 text-white/70 hover:text-white transition-colors"
    >
      Cancel
    </button>
    <Button
      type="submit"
      loading={loading}
      className="inline-flex items-center"
    >
      {submitText}
    </Button>
  </div>
);