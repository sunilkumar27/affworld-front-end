// src/layouts/auth-layout/components/AuthFooter.jsx
import React from 'react';
import { APP_CONFIG } from '../../../constants/config';

/**
 * Footer for authentication pages
 */
const AuthFooter = () => (
  <div className="text-center mt-8">
    <p className="text-sm text-white/60">
      © {new Date().getFullYear()} {APP_CONFIG.name}. All rights reserved.
    </p>
  </div>
);

export default AuthFooter;