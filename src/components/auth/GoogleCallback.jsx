// src/components/auth/GoogleCallback.jsx
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Component Mount Path:', window.location.pathname);
    console.log('Query Params:', window.location.search);
    
    /**
     * Process OAuth callback data and update authentication state
     */
    const handleCallback = async () => {
      const token = searchParams.get('token');
      const userData = searchParams.get('user');

      if (!token || !userData) {
        toast.error('Invalid authentication response');
        navigate('/login');
        return;
      }

      try {
        const user = JSON.parse(userData);
        // Store authentication data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        navigate('/tasks', { 
          replace: true,
          state: { from: '/auth/google/callback' }
        });
        console.log('Navigation attempted');

        // Close popup and redirect main window
        //window.close();
        //window.opener?.location.replace('/tasks');
        toast.success('Successfully logged in with Google');
      } catch (error) {
        console.log(JSON.stringify(error));
        toast.error('Failed to process Google login');
        navigate('/login');
      }
    };

    handleCallback();
  }, [searchParams, setUser, navigate]);

  return <LoadingSpinner />;
};

export default GoogleCallback;