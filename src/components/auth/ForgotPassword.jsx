// src/components/auth/ForgotPassword.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { services } from '../../services/api';
import { FormInput, Button, AlertMessage } from '../../components/shared';

/**
 * ForgotPassword component handles password reset request functionality
 * Allows users to request password reset instructions via email
 * 
 * @component
 * @example
 * return (
 *   <ForgotPassword />
 * )
 */
const ForgotPassword = () => {
  // State to manage email input value
  const [email, setEmail] = useState('');

  // Handle async password reset request with loading/error states
  const { loading, error, success, execute: handlePasswordReset } = useAsync(
    () => services.auth.forgotPassword(email)
  );

  /**
   * Handles form submission for password reset request
   * Prevents default form behavior, triggers API call, and clears form on success
   * 
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handlePasswordReset();
    if (success) {
      setEmail(''); // Clear form after successful submission
      toast.success('If an account exists with this email, you will receive password reset instructions.');
    }
  };

  return (
    <>
      {/* Success message shown after successful submission */}
      {success && (
        <AlertMessage 
          type="success" 
          message="If an account exists with this email, you will receive password reset instructions." 
        />
      )}
      
      {/* Error message shown if request fails */}
      {error && <AlertMessage type="error" message={error} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email input field */}
        <FormInput
          type="email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
        />

        {/* Submit button with loading state */}
        <Button
          type="submit"
          loading={loading}
          className="w-full"
        >
          {loading ? 'Sending Instructions...' : 'Send Reset Instructions'}
        </Button>

        {/* Navigation link back to login page */}
        <div className="text-center mt-4">
          <Link to="/login" className="text-primary hover:text-primary/80">
            Back to login
          </Link>
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;