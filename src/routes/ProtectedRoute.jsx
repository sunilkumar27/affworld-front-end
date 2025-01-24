// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth/AuthContext';
import { LoadingSpinner } from '../components/shared';
import { ROUTES } from './paths';

/**
 * Protects routes requiring authentication
 * Redirects unauthenticated users to login page
 * Handles loading state during initial authentication check
 */
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Show loading spinner during initial auth verification
  if (loading) {
    return <LoadingSpinner />;
  }

  // Redirect to login if no user is authenticated
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // Render children for authenticated users
  return children;
};