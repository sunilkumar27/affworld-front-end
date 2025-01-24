// src/services/api/interceptors.js
/**
 * Add authentication token to request headers
 * @param {Object} config - Request configuration
 * @returns {Object} Updated configuration
 */
export const authInterceptor = (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }   
    return config;
  };
  
  /**
   * Handle API errors
   * @param {Error} error - Error object
   * @throws {Error} Processed error
   */
  export const errorInterceptor = (error) => {
    // Network errors
    if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }
  
    // Unauthorized errors - clear auth and redirect
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      throw new Error('Session expired. Please login again.');
    }
  
    // Other API errors
    const message = error.response?.data?.message || 'An unexpected error occurred';
    throw new Error(message);
  };