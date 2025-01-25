// src/routes/PublicRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth/AuthContext';
import { LoadingSpinner } from '../components/shared';
import { ROUTES } from './paths';

/**
 * Manages access to public routes
 * Prevents authenticated users from accessing login/signup pages
 * Handles loading state during authentication check
 */
export const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Show loading spinner during initial auth verification
  if (loading) {
    return <LoadingSpinner />;
  }

  // Redirect authenticated users to tasks page
  if (user) {
    return <Navigate to={ROUTES.TASKS} replace />;
  }

  // Render children for unauthenticated users
  return children;
};