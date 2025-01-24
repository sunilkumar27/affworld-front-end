// src/context/auth/AuthContext.jsx
import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { authReducer } from './authReducer';
import { services } from '../../services/api';

// Create a context for managing authentication state
const AuthContext = createContext(null);

/**
 * Custom hook for accessing authentication context
 * Provides a convenient way to use auth state and methods in components
 * @returns {Object} Authentication context containing user, loading, and auth methods
 * @throws {Error} If used outside of AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Authentication Provider Component
 * Manages authentication state, login, logout, and registration processes
 * Handles token validation, local storage, and state management
 */
export const AuthProvider = ({ children }) => {
  // Initialize reducer for managing authentication state
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: true,
    error: null
  });

  const navigate = useNavigate();

  /**
   * Clear authentication-related data from local storage and reset state
   */
  const clearAuthData = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  }, []);

  /**
   * Validate JWT token 
   * @param {string} token - JWT token to validate
   * @returns {boolean} Whether the token is valid and not expired
   */
  const isTokenValid = useCallback((token) => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      return decoded.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }, []);

  // Check and restore authentication state on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData && isTokenValid(token)) {
      // Restore user session if token is valid
      dispatch({ 
        type: 'AUTH_SUCCESS', 
        payload: JSON.parse(userData) 
      });
    } else {
      // Clear invalid or expired session
      clearAuthData();
    }
    // Mark initial loading as complete
    dispatch({ type: 'SET_LOADING', payload: false });
  }, [clearAuthData, isTokenValid]);

  /**
   * Authenticate user with provided credentials
   * @param {Object} credentials - User login credentials
   * @returns {Promise<{success: boolean, error?: string}>} Login result
   */
  const login = async (credentials) => {
    try {
      dispatch({ type: 'AUTH_START' });
      const { data } = await services.auth.login(credentials);
      
      if (isTokenValid(data.token)) {
        // Store authentication data and update state
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch({ type: 'AUTH_SUCCESS', payload: data.user });
        
        // Navigate to tasks page and show success message
        navigate('/tasks');
        toast.success('Login successful');
        return { success: true };
      }
      
      throw new Error('Invalid token received');
    } catch (error) {
      // Handle login errors
      const message = error.response?.data?.message || 'Login failed';
      dispatch({ type: 'AUTH_ERROR', payload: message });
      toast.error(message);
      return { success: false, error: message };
    }
  };

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<{success: boolean, error?: string}>} Registration result
   */
  const register = async (userData) => {
    try {
      dispatch({ type: 'AUTH_START' });
      const { data } = await services.auth.register(userData);
      
      if (isTokenValid(data.token)) {
        // Store authentication data and update state
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch({ type: 'AUTH_SUCCESS', payload: data.user });
        
        // Navigate to tasks page and show success message
        navigate('/tasks');
        toast.success('Registration successful');
        return { success: true };
      }
      
      throw new Error('Invalid token received');
    } catch (error) {
      // Handle registration errors
      const message = error.response?.data?.message || 'Registration failed';
      dispatch({ type: 'AUTH_ERROR', payload: message });
      toast.error(message);
      return { success: false, error: message };
    }
  };

  /**
   * Log out the current user
   * Clears authentication data and navigates to login page
   */
  const logout = useCallback(() => {
    clearAuthData();
    navigate('/login');
    toast.success('Logged out successfully');
  }, [clearAuthData, navigate]);

  // Prepare context value with auth state and methods
  const value = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};