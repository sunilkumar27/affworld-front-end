// src/components/auth/Login.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';
import { useAsync } from '../../hooks/useAsync';
import { FormInput, Button, AlertMessage, Divider } from '../../components/shared';
import { GoogleButton } from './GoogleButton'; 

/**
 * @typedef {Object} LoginFormData
 * @property {string} email - User email
 * @property {string} password - User password
 */

/**
 * Login component that handles both email/password and Google authentication
 * @component
 */
const Login = () => {
  // Manage form state for email/password login
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  
  // Handle async login with loading and error states
  const { loading, error, execute: handleLogin } = useAsync(login);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'GOOGLE_LOGIN_SUCCESS') {
        window.location.href = '/tasks';
      }
    };
  
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  /**
   * Handle form submission for email/password login
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleLogin(formData);
    if (result.success) {
      toast.success('Successfully logged in');
    }
  };

  return (
    <>
      {/* OAuth login option */}
      <div className="mb-6">
        <GoogleButton />
      </div>

      <Divider text="or continue with" />

      {/* Error display */}
      {error && <AlertMessage type="error" message={error} />}

      {/* Email/password login form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          type="email"
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <FormInput
          type="password"
          label="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        {/* Password recovery link */}
        <div className="flex items-center justify-between">
          <Link to="/forgot-password" className="text-primary hover:text-primary/80">
            Forgot password?
          </Link>
        </div>

        {/* Submit button with loading state */}
        <Button
          type="submit"
          loading={loading}
          className="w-full"
        >
          Sign in
        </Button>

        {/* Registration link */}
        <div className="text-center mt-4">
          <Link to="/register" className="text-primary hover:text-primary/80">
            Don't have an account? Sign up
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;