// src/layouts/auth-layout/components/AuthHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../../../constants/config';

/**
 * Header for authentication pages with dynamic title
 * @param {AuthHeaderProps} props
 * @param {string} title - Title of the page
 * @returns {JSX.Element} Authetication Header
 */
const AuthHeader = ({ title }) => (
  <div className="text-center mb-8">
    <Link to="/" className="inline-block">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-primary/80 to-secondary bg-clip-text text-transparent">
        {APP_CONFIG.name}
      </h1>
    </Link>
    <h2 className="text-2xl font-bold text-white mt-8">{title}</h2>
  </div>
);

export default AuthHeader;