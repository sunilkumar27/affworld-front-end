// src/layouts/main-layout/components/UserMenu.jsx
import React from 'react';
import { useAuth } from '../../../context/auth/AuthContext';
import LogoutButton from './LogoutButton';

/**
 * Displays user email and logout button
 * Uses authentication context to access user info and logout functionality
 */
const UserMenu = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center ml-auto">
      <span className="text-gray-300">{user.email}</span>
      <LogoutButton onLogout={logout} />
    </div>
  );
};

export default UserMenu;