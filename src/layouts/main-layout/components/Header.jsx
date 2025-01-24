// src/layouts/main-layout/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../../../constants/config';

/**
 * Main header component
 * @param {HeaderProps} props
 */
const Header = ({ children }) => {
  return (
    <nav className="bg-background/30 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl leading-[60px] font-bold text-white">
            {APP_CONFIG.name}
          </Link>
          {children}
        </div>
      </div>
    </nav>
  );
};

export default Header;
