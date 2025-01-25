// src/components/auth/GoogleCallback.jsx
import { useEffect, useContext } from 'react';
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
        return;
      }

      try {
        const user = JSON.parse(userData);
        console.log("User : " + JSON.stringify(user));
        // Store authentication data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        console.log("Local storage updated");
        setUser(user);
        console.log("User is updated to state");
        window.location.href = '/tasks';
        console.log('Navigation attempted');

        // Close popup and redirect main window
        //window.close();
        //window.opener?.location.replace('/tasks');
        toast.success('Successfully logged in with Google');
      } catch (error) {
        console.log(JSON.stringify(error));
        toast.error('Failed to process Google login');
        window.location.href = '/login';
      }
    };

    handleCallback();
  }, [searchParams, setUser, navigate]);

  return <LoadingSpinner />;
};

export default GoogleCallback;