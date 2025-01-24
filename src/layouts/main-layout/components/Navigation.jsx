// src/layouts/main-layout/components/Navigation.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

/**
 * Renders a styled navigation link with active state highlighting
 * @param {Object} props - Component properties
 * @param {string} props.to - Destination path
 * @param {boolean} props.isActive - Whether the link is currently active
 * @param {React.ReactNode} props.children - Link content
 */
const NavItem = ({ to, isActive, children }) => (
  <Link
    to={to}
    className={`${
      isActive
        ? 'text-white border-b-2 border-white'
        : 'text-gray-300 hover:text-white'
    } px-3 py-2 text-base font-medium`}
  >
    {children}
  </Link>
);

/**
 * Responsive main navigation menu for desktop
 * Displays navigation links with active state tracking
 */
const Navigation = () => {
  const location = useLocation();
  
  const navLinks = [
    { path: '/tasks', label: 'Tasks' },
    { path: '/feed', label: 'Feed' }
  ];

  return (
    <div className="hidden md:ml-6 md:flex space-x-4">
      {navLinks.map((link) => (
        <NavItem
          key={link.path}
          to={link.path}
          isActive={location.pathname === link.path}
        >
          {link.label}
        </NavItem>
      ))}
    </div>
  );
};

export default Navigation;