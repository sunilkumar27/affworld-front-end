// src/services/api/config.js
/**
 * API configuration constants
 */
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
};
