import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from './LoginPage';
import { AuthContext } from '../../context/AuthContext';

// Mock the auth context
const mockLogin = jest.fn();
const mockAuthContext = {
  login: mockLogin,
  loading: false,
  error: null,
};

// Mock the react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('LoginPage', () => {
  beforeEach(() => {
    mockLogin.mockClear();
  });

  test('renders login form', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <LoginPage />
      </AuthContext.Provider>
    );

    expect(screen.getByText(/ED Results Analyzer/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  test('shows validation error when form is submitted without username', async () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <LoginPage />
      </AuthContext.Provider>
    );

    // Submit the form without entering username
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    // Check that validation error is shown
    expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
    
    // Check that login function was not called
    expect(mockLogin).not.toHaveBeenCalled();
  });

  test('shows validation error when form is submitted without password', async () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <LoginPage />
      </AuthContext.Provider>
    );

    // Submit the form without entering password
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'admin' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    // Check that validation error is shown
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    
    // Check that login function was not called
    expect(mockLogin).not.toHaveBeenCalled();
  });

  test('calls login function when form is submitted with valid data', async () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <LoginPage />
      </AuthContext.Provider>
    );

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    // Check that login function was called with correct arguments
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('admin', 'password123');
    });
  });

  test('shows error message when login fails', async () => {
    const errorMessage = 'Invalid username or password';
    const mockAuthContextWithError = {
      ...mockAuthContext,
      error: errorMessage,
    };

    render(
      <AuthContext.Provider value={mockAuthContextWithError}>
        <LoginPage />
      </AuthContext.Provider>
    );

    // Check that error message is shown
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});

// Note: In a real application, you would:
// 1. Add more comprehensive tests for all components
// 2. Test the authentication flow end-to-end
// 3. Add integration tests for the API calls
// 4. Test the protected routes
// 5. Test the role-based access control 