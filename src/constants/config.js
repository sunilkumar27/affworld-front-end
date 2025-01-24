// src/constants/config.js
/**
 * Centralized application configuration
 * Manages environment-specific settings and default configurations
 */
export const APP_CONFIG = {
  // Application name and branding
  name: 'Affworld Task Manager',

  // API connection settings
  api: {
    // Base URL with fallback to localhost, using environment variable
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    // Request timeout in milliseconds
    timeout: 10000,
    // Default request headers
    headers: {
      'Content-Type': 'application/json',
    }
  },

  // Authentication configuration
  auth: {
    // Google OAuth popup window dimensions
    googleAuth: {
      width: 500,
      height: 600
    },
    // Local storage keys for authentication tokens
    tokenKey: 'token',
    userKey: 'user'
  },

  // Toast notification default settings
  toast: {
    // Duration notifications are displayed (in milliseconds)
    duration: 3000,
    // Default position for toast notifications
    position: 'top-right'
  }
};