import { findUserByUsername, verifyPassword, getUserById } from '../api/mock/users';

// In a real application, this would use JWT for secure authentication
// For this demo, we'll use a simplified approach

/**
 * Authenticate a user with username and password
 * @param {string} username - The username to authenticate
 * @param {string} password - The password to authenticate
 * @returns {Promise<Object>} - Object containing user data and token if successful
 * @throws {Error} - If authentication fails
 */
export const authenticateUser = async (username, password) => {
  try {
    // Find the user by username
    const user = findUserByUsername(username);
    if (!user) {
      throw new Error('Invalid username or password');
    }

    // For demo purposes, accept 'password123' for all users
    // In a real app, you would use bcrypt.compare
    if (password !== 'password123') {
      throw new Error('Invalid username or password');
    }

    // Generate a simple token (in a real app, this would be a JWT)
    const token = `demo-token-${user.id}-${Date.now()}`;

    // Return user data (excluding password) and token
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Generate a token for a user
 * @param {number} userId - The user ID to include in the token
 * @returns {string} - The generated token
 */
export const generateToken = (userId) => {
  return `demo-token-${userId}-${Date.now()}`;
};

/**
 * Verify a token
 * @param {string} token - The token to verify
 * @returns {Object|null} - The decoded token payload or null if invalid
 */
export const verifyToken = (token) => {
  try {
    // In a real app, this would verify a JWT
    // For demo purposes, we'll just check if it starts with 'demo-token'
    if (token && token.startsWith('demo-token-')) {
      const parts = token.split('-');
      if (parts.length >= 3) {
        return { userId: parseInt(parts[2]) };
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Get the current user from a token
 * @param {string} token - The token to extract user from
 * @returns {Object|null} - The user object or null if token is invalid
 */
export const getUserFromToken = (token) => {
  const decoded = verifyToken(token);
  if (!decoded) return null;

  return getUserById(decoded.userId);
};

/**
 * Check if a user has a specific role
 * @param {Object} user - The user object to check
 * @param {string} role - The role to check for
 * @returns {boolean} - Whether the user has the role
 */
export const hasRole = (user, role) => {
  if (!user) return false;
  return user.role === role;
};

/**
 * Check if a user is an admin
 * @param {Object} user - The user object to check
 * @returns {boolean} - Whether the user is an admin
 */
export const isAdmin = (user) => {
  return hasRole(user, 'admin');
};

// Note: In a real application, you would:
// 1. Store JWT_SECRET in environment variables
// 2. Implement token refresh mechanism
// 3. Add more sophisticated role-based access control
// 4. Implement password hashing and salting
// 5. Add rate limiting for login attempts 