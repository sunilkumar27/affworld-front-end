//src/context/auth/authReducer.js

// Authentication state management reducer
export const authReducer = (state, action) => {
  switch (action.type) {
    // Initiate authentication process
    case 'AUTH_START':
      return {
        ...state,
        loading: true,
        error: null
      };

    // Authentication successful - update user and clear loading/error states
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null
      };

    // Authentication failed - update error state
    case 'AUTH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    // Manually set loading state (used for initial app load)
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };

    // Reset state on logout
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        loading: false,
        error: null
      };

    // Return current state for unhandled actions
    default:
      return state;
  }
};