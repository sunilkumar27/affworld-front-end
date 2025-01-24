// src/layouts/auth-layout/auth-layout.jsx
import React from 'react';
import { AuthHeader, AuthFooter } from './components';
import { BackgroundGrid } from '../../components/shared';
/**
 * Centralized layout for authentication pages
 * @param {AuthLayoutProps} props
 */
const AuthLayout = ({ children, title }) => (
  <div className="relative min-h-screen bg-gradient-to-b from-background to-secondary dark:from-background dark:to-secondary flex items-center justify-center flex-1">
    <BackgroundGrid />
    
    <div className="relative z-10 w-full max-w-md mx-auto p-4">
      <div className="bg-section rounded-xl border border-[#7c3bed33] p-8">
        <AuthHeader title={title} />
        {children}
        <AuthFooter />
      </div>
    </div>
  </div>
);

export default AuthLayout;