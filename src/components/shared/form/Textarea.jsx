// src/components/shared/form/Textarea.jsx
import React from 'react';

/**
 * Textarea component with custom styling
 * @param {Object} props
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {string} [props.label] - Input label
 * @param {string} [props.placeholder] - Placeholder text
 * @param {boolean} [props.required=false] - Required field flag
 * @param {number} [props.rows=3] - Number of rows
 * @param {string} [props.className=''] - Additional CSS classes
 */
export const Textarea = ({
  value,
  onChange,
  label,
  placeholder,
  required = false,
  rows = 3,
  className = ''
}) => (
  <div className={className}>
    {label && <label className="block text-white/80 mb-2">{label}</label>}
    <textarea
      value={value}
      onChange={onChange}
      className="w-full bg-white/5 border border-[#7c3bed33] rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#7c3bed]"
      rows={rows}
      placeholder={placeholder}
      required={required}
    />
  </div>
);