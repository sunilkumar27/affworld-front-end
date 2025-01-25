// src/routes/index.jsx
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { ROUTES } from './paths';

// Layouts
import MainLayout from '../layouts/main-layout/main-layout';
import AuthLayout from '../layouts/auth-layout/auth-layout';

// Lazy-loaded components for performance optimization
const Login = lazy(() => import('../components/auth/Login'));
const Register = lazy(() => import('../components/auth/Register'));
const ForgotPassword = lazy(() => import('../components/auth/ForgotPassword'));
const GoogleCallback = lazy(() => import('../components/auth/GoogleCallback'));
const TaskBoard = lazy(() => import('../components/tasks/TaskBoard'));
const FeedList = lazy(() => import('../components/feed/FeedList'));

// Helper to wrap auth-related routes with AuthLayout
const createAuthLayoutRoute = (Component, title) => (
  <PublicRoute>
    <AuthLayout title={title}>
      <Component />
    </AuthLayout>
  </PublicRoute>
);

// Helper to wrap protected routes with MainLayout
const createProtectedRoute = (Component) => (
  <ProtectedRoute>
    <MainLayout>
      <Component />
    </MainLayout>
  </ProtectedRoute>
);

// Application route configuration
export const routes = [
  // Redirect root to login page
  {
    path: ROUTES.HOME,
    element: <PublicRoute><Navigate to={ROUTES.LOGIN} replace /></PublicRoute>
  },
  // Authentication routes
  {
    path: ROUTES.LOGIN,
    element: createAuthLayoutRoute(Login, "Sign in to your account")
  },
  {
    path: ROUTES.REGISTER,
    element: createAuthLayoutRoute(Register, "Create your account")
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: createAuthLayoutRoute(ForgotPassword, "Reset your password")
  },
  // Google OAuth callback
  {
    path: ROUTES.GOOGLE_CALLBACK,
    element: <PublicRoute><GoogleCallback /></PublicRoute>
  },
  // Protected application routes
  {
    path: ROUTES.TASKS,
    element: createProtectedRoute(TaskBoard)
  },
  {
    path: ROUTES.FEED,
    element: createProtectedRoute(FeedList)
  },
  // Catch-all route to redirect to home
  {
    path: '*',
    element: <Navigate to={ROUTES.HOME} replace />
  }
];