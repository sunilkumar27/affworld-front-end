// src/layouts/main-layout/main-layout.jsx
import React from 'react';
import { Header, Navigation, UserMenu } from './components';
import { BackgroundGrid } from '../../components/shared';

/**
 * Application-wide layout with background, header, and main content area
 * Includes navigation, user menu, and dynamic page content
 * 
 * @param {MainLayoutProps} props
 */
const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-secondary dark:from-background dark:to-secondary flex flex-col">
      <BackgroundGrid />
      
      <div className="relative z-10 flex-1">
        <Header>
          <Navigation />
          <UserMenu />
        </Header>

        <main className="flex-1 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;