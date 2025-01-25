// src/components/auth/GoogleCallback.jsx
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';
import { LoadingSpinner } from '../../components/shared';
import { toast } from 'react-toastify';

/**
 * Handles OAuth callback response from Google authentication
 * Processes token and user data from URL parameters
 * Updates local storage and auth context before closing popup
 */
const GoogleCallback = () => {
  console.log("GoogleCallback mounted - URL:", window.location.href);

  const [searchParams] = useSearchParams();
  const { setUser } = useAuth();

  useEffect(() => {
    console.log("Params received:", {
      token: searchParams.get('token'),
      user: searchParams.get('user')
    });

    /**
     * Process OAuth callback data and update authentication state
     */
    const handleCallback = async () => {
      console.log('Current URL:', window.location.href);
      const token = searchParams.get('token');
      const userData = searchParams.get('user');
      console.log('Received data:', { token, userData });

      if (!token || !userData) {
        handleAuthError('Invalid authentication response');
        return;
      }

      try {
        const user = JSON.parse(userData);
        console.log('Parsed user:', user);

        // Store authentication data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);

        if (window.opener) {
          const message = { type: 'GOOGLE_LOGIN_SUCCESS' };
          window.opener.postMessage(message, window.location.origin);
          window.close();
        }
      } catch (error) {
        console.error('Parse error:', error);
        handleAuthError('Failed to process Google login');
      }
    };

    /**
     * Handle authentication errors and redirect
     * @param {string} message - Error message to display
     */
    const handleAuthError = (message) => {
      console.error('Google Auth Error:', message);
      window.close();
      window.opener?.location.replace('/login');
      toast.error(message);
    };

    handleCallback();
  }, [searchParams, setUser]);

  return <LoadingSpinner />;
};

export default GoogleCallback;