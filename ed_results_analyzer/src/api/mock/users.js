// Mock user database
// In a real application, this would be stored in a secure database
// and passwords would be properly hashed

import bcrypt from 'bcryptjs';

// Pre-hashed passwords for security (in a real app, you'd hash these when creating users)
// These are hashed versions of 'password123' for demonstration
const hashedPassword = '$2a$10$XFNKqNXXAWQVBpa.OYZJVeS3wlXRPX1rYUGzztoKXWYfTW9jRAKEq';

const users = [
  {
    id: 1,
    username: 'admin',
    password: hashedPassword,
    name: 'Admin User',
    email: 'admin@hospital.org',
    role: 'admin',
    department: 'Emergency Department',
    position: 'ED Director'
  },
  {
    id: 2,
    username: 'doctor',
    password: hashedPassword,
    name: 'Dr. Sarah Johnson',
    email: 'sjohnson@hospital.org',
    role: 'staff',
    department: 'Emergency Department',
    position: 'ED Physician'
  },
  {
    id: 3,
    username: 'nurse',
    password: hashedPassword,
    name: 'Michael Chen, RN',
    email: 'mchen@hospital.org',
    role: 'staff',
    department: 'Emergency Department',
    position: 'ED Nurse'
  }
];

/**
 * Find a user by username
 * @param {string} username - The username to search for
 * @returns {Object|null} - The user object or null if not found
 */
export const findUserByUsername = (username) => {
  return users.find(user => user.username === username) || null;
};

/**
 * Verify a user's password
 * @param {string} plainPassword - The plain text password to verify
 * @param {string} hashedPassword - The hashed password to compare against
 * @returns {Promise<boolean>} - Whether the password is valid
 */
export const verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

/**
 * Get a user by ID (excluding the password)
 * @param {number} id - The user ID to search for
 * @returns {Object|null} - The user object without the password or null if not found
 */
export const getUserById = (id) => {
  const user = users.find(user => user.id === id);
  if (!user) return null;
  
  // Return user without password
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export default users;

// Note: In a real application, you would:
// 1. Use a proper database (MongoDB, PostgreSQL, etc.)
// 2. Implement proper password hashing with salt
// 3. Add user registration functionality with email verification
// 4. Implement password reset functionality
// 5. Add rate limiting to prevent brute force attacks 