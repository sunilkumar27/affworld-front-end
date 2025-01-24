// src/components/shared/form/FormInput.jsx
import React from 'react';

/**
 * Reusable form input component with custom styling and label
 * @param {string} type - Input type (text, email, password, etc.)
 * @param {string} label - Input label text
 * @param {string} value - Current input value
 * @param {function} onChange - Change handler function
 * @param {boolean} [required=false] - Whether the input is required
 * @param {string} [placeholder] - Input placeholder text
 * @param {string} [className=''] - Additional CSS classes
 * @returns {JSX.Element} Styled input with label
 */
export const FormInput = ({ 
  type, 
  label, 
  value, 
  onChange, 
  required = false,
  placeholder,
  className = ''
}) => (
  <div className={className}>
    <label className="block text-white/80 mb-2">{label}</label>
    <input
      type={type}
      required={required}
      className="w-full bg-white/5 border border-[#7c3bed33] rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#7c3bed]"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);