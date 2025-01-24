// src/services/api/auth.service.js

/**
 * Authentication service for user management
 * Handles login, registration, and token operations
 */
export class AuthService {
  constructor(client) {
    this.client = client;
    this.baseUrl = '/auth';
  }

  /**
   * Authenticate user with credentials
   * @param {Object} credentials - User login details
   * @returns {Promise<Object>} Authentication response
   */
  login(credentials) {
    return this.client.post(`${this.baseUrl}/login`, credentials);
  }

  /**
   * Create new user account
   * @param {Object} userData - User registration details
   * @returns {Promise<Object>} Registration response
   */
  register(userData) {
    return this.client.post(`${this.baseUrl}/register`, userData);
  }

  /**
   * Initiate password reset process
   * @param {string} email - User email
   * @returns {Promise<Object>} Password reset response
   */
  forgotPassword(email) {
    return this.client.post(`${this.baseUrl}/forgot-password`, { email });
  }

  /**
   * Complete password reset with token
   * @param {string} token - Password reset token
   * @param {string} password - New password
   * @returns {Promise<Object>} Password reset confirmation
   */
  resetPassword(token, password) {
    return this.client.post(`${this.baseUrl}/reset-password/${token}`, { password });
  }

  /**
   * Validate authentication token
   * @returns {Promise<Object>} Token verification response
   */
  verifyToken() {
    return this.client.get(`${this.baseUrl}/verify-token`);
  }

  /**
   * Initiate Google OAuth login
   */
  googleLogin() {
    window.location.href = `${API_CONFIG.baseURL}/auth/google`;
  }
}