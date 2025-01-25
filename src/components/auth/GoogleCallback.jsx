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
  const [searchParams] = useSearchParams();
  const { setUser } = useAuth();

  useEffect(() => {

    /**
     * Process OAuth callback data and update authentication state
     */
    const handleCallback = async () => {
      const token = searchParams.get('token');
      const userData = searchParams.get('user');

      if (!token || !userData) {
        toast.error('Invalid authentication response');
        return;
      }

      try {
        const user = JSON.parse(userData);

        // Store authentication data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);

        toast.success('Successfully logged in with Google');
      } catch (error) {
        console.log('Failed to process Google login');        
      }
      window.location.href = '/login';
    };

    handleCallback();
  }, [searchParams, setUser]);

  return <LoadingSpinner />;
};

export default GoogleCallback;