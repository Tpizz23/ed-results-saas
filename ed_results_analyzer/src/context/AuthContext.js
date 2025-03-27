import React, { createContext, useState, useEffect } from 'react';
import { authenticateUser, getUserFromToken, isAdmin } from '../services/authService';

// Create the authentication context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const user = getUserFromToken(token);
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const { user, token } = await authenticateUser(username, password);
      
      // Save token to localStorage
      localStorage.setItem('authToken', token);
      
      // Set the current user
      setCurrentUser(user);
      
      return user;
    } catch (error) {
      setError(error.message || 'An error occurred during login');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    setCurrentUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!currentUser;
  };

  // Check if user is an admin
  const userIsAdmin = () => {
    return isAdmin(currentUser);
  };

  // Context value
  const value = {
    currentUser,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
    isAdmin: userIsAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Higher-order component to protect routes
export const withAuth = (Component) => {
  return (props) => {
    const { isAuthenticated, loading } = useAuth();
    
    // If still loading, show loading indicator
    if (loading) {
      return <div>Loading...</div>;
    }
    
    // If not authenticated, redirect to login
    if (!isAuthenticated()) {
      // In a real application, you would use React Router's Redirect
      // For simplicity, we'll just render a message
      return <div>Please log in to access this page</div>;
    }
    
    // If authenticated, render the component
    return <Component {...props} />;
  };
};

// Higher-order component to protect admin routes
export const withAdmin = (Component) => {
  return (props) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();
    
    // If still loading, show loading indicator
    if (loading) {
      return <div>Loading...</div>;
    }
    
    // If not authenticated, redirect to login
    if (!isAuthenticated()) {
      return <div>Please log in to access this page</div>;
    }
    
    // If not admin, show unauthorized message
    if (!isAdmin()) {
      return <div>You do not have permission to access this page</div>;
    }
    
    // If authenticated and admin, render the component
    return <Component {...props} />;
  };
}; 