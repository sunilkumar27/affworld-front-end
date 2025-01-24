// src/components/auth/Register.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';
import { useAsync } from '../../hooks/useAsync';
import { FormInput, Button, AlertMessage, Divider } from '../../components/shared';
import { GoogleButton } from './GoogleButton';

/**
 * @typedef {Object} RegisterFormData
 * @property {string} name - User's full name
 * @property {string} email - User email
 * @property {string} password - User password
 * @property {string} confirmPassword - Password confirmation
 */

/**
 * Register component for user account creation
 * Supports both email/password and Google OAuth registration
 */
const Register = () => {
  // Initialize form state with empty fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const { register } = useAuth();
  const { loading, error, execute: handleRegister } = useAsync(register);

  /**
   * Handles form submission with password validation
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate password match before submission
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    const result = await handleRegister(formData);
    if (result.success) {
      toast.success('Registration successful');
    }
  };

  return (
    <>
      {/* OAuth registration option */}
      <div className="mb-6">
        <GoogleButton />
      </div>

      <Divider text="or sign up with email" />

      {/* Error display */}
      {error && <AlertMessage type="error" message={error} />}

      {/* Registration form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          type="text"
          label="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

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

        <FormInput
          type="password"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
        />

        <Button
          type="submit"
          loading={loading}
          className="w-full"
        >
          Create Account
        </Button>

        {/* Login link */}
        <div className="text-center mt-4">
          <Link to="/login" className="text-primary hover:text-primary/80">
            Already have an account? Sign in
          </Link>
        </div>
      </form>
    </>
  );
};

export default Register;