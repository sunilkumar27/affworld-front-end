// src/components/auth/GoogleButton.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../../context/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { APP_CONFIG } from '../../constants/config';
import { useEffect } from 'react';

/**
 * Google icon SVG component
 * @param {Object} props Component props
 * @param {string} props.className CSS classes for styling the SVG
 */
const GoogleIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className={className}
  >
    {/* Google's official brand color paths */}
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
  </svg>
);

/**
 * Google OAuth button component
 * Opens a centered popup window for Google authentication
 * Integrates with the backend OAuth endpoint
 * 
 * @component
 */
/*export const GoogleButton = () => {
  /**
   * Opens a centered popup window for Google OAuth
   * Window dimensions and position are calculated based on screen size
   
  const handleGoogleLogin = () => {
    // Get configured popup dimensions or use defaults
    const { width = 500, height = 600 } = APP_CONFIG.auth.googleAuth || {};
    
    // Calculate center position for popup
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);

    // Open OAuth popup window with centered positioning
    const authWindow = window.open(
      `${APP_CONFIG.api.baseURL}/auth/google`,
      'Google OAuth',
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`
    );

    if (authWindow) {
      authWindow.focus();
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center space-x-2 bg-white text-gray-800 p-2 rounded-md hover:bg-gray-100 transition-colors border border-[#7c3bed33]"
    >
      <GoogleIcon className="w-6 h-6" />
      <span>Continue with Google</span>
    </button>
  );
};*/

export const GoogleButton = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== import.meta.env.VITE_API_URL) return;

      const { type, token, user, error } = event.data;

      if (type === 'GOOGLE_AUTH_SUCCESS') {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        navigate('/tasks');
        toast.success('Successfully logged in with Google');
      }

      if (type === 'GOOGLE_AUTH_ERROR') {
        toast.error(error || 'Authentication failed');
        navigate('/login');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [setUser, navigate]);

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    window.open(
      `${import.meta.env.VITE_API_URL}/auth/google`,
      'Google Login',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  return (
    <button onClick={handleGoogleLogin}>
      Continue with Google
    </button>
  );
};