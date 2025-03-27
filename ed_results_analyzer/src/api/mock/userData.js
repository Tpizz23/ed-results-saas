// Mock user data for development purposes
// In a real application, user data would be stored securely in a database

const users = [
  {
    id: 1,
    username: 'admin',
    password: 'password123', // In a real app, this would be hashed
    firstName: 'Admin',
    lastName: 'User',
    name: 'Admin User',
    email: 'admin@hospital.org',
    phone: '(555) 111-0000',
    department: 'Administration',
    role: 'admin',
    isActive: true,
    lastLogin: '2023-06-18T08:30:00',
    notificationPreferences: {
      email: true,
      sms: false,
      inApp: true
    }
  },
  {
    id: 2,
    username: 'doctor',
    password: 'password123', // In a real app, this would be hashed
    firstName: 'John',
    lastName: 'Smith',
    name: 'Dr. John Smith',
    email: 'john.smith@hospital.org',
    phone: '(555) 111-1111',
    department: 'Emergency Medicine',
    role: 'physician',
    isActive: true,
    lastLogin: '2023-06-17T15:45:00',
    notificationPreferences: {
      email: true,
      sms: true,
      inApp: true
    }
  },
  {
    id: 3,
    username: 'nurse',
    password: 'password123', // In a real app, this would be hashed
    firstName: 'Sarah',
    lastName: 'Johnson',
    name: 'Sarah Johnson, RN',
    email: 'sarah.johnson@hospital.org',
    phone: '(555) 111-2222',
    department: 'Emergency Medicine',
    role: 'nurse',
    isActive: true,
    lastLogin: '2023-06-18T07:15:00',
    notificationPreferences: {
      email: true,
      sms: false,
      inApp: true
    }
  },
  {
    id: 'U004',
    username: 'tech',
    password: 'password123', // In a real app, this would be hashed
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@hospital.org',
    phone: '(555) 111-3333',
    department: 'Emergency Medicine',
    role: 'technician',
    isActive: true,
    lastLogin: '2023-06-16T22:10:00',
    notificationPreferences: {
      email: false,
      sms: false,
      inApp: true
    }
  },
  {
    id: 'U005',
    username: 'clerk',
    password: 'password123', // In a real app, this would be hashed
    firstName: 'Jessica',
    lastName: 'Williams',
    email: 'jessica.williams@hospital.org',
    phone: '(555) 111-4444',
    department: 'Emergency Medicine',
    role: 'clerk',
    isActive: true,
    lastLogin: '2023-06-17T08:30:00',
    notificationPreferences: {
      email: true,
      sms: false,
      inApp: true
    }
  },
  {
    id: 'U006',
    username: 'inactive',
    password: 'password123', // In a real app, this would be hashed
    firstName: 'Robert',
    lastName: 'Brown',
    email: 'robert.brown@hospital.org',
    phone: '(555) 111-5555',
    department: 'Emergency Medicine',
    role: 'physician',
    isActive: false,
    lastLogin: '2023-01-15T10:20:00',
    notificationPreferences: {
      email: true,
      sms: true,
      inApp: true
    }
  }
];

// Helper function to find a user by username
export const findUserByUsername = (username) => {
  return users.find(user => user.username === username);
};

// Helper function to authenticate a user
export const authenticateUser = (username, password) => {
  const user = findUserByUsername(username);
  if (!user) return null;
  if (user.password !== password) return null;
  if (!user.isActive) return null;
  
  // In a real app, you would update the lastLogin timestamp here
  
  // Return user data without the password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Helper function to get a user by ID
export const getUserById = (id) => {
  const user = users.find(user => user.id === id);
  if (!user) return null;
  
  // Return user data without the password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export default users; 