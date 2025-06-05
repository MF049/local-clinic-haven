
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Pre-created admin user
const defaultAdmin: User = {
  id: 'admin-1',
  name: 'مدير النظام',
  email: 'admin@alshifa-clinic.com',
  phone: '+966501234567',
  role: 'admin',
  createdAt: new Date('2024-01-01'),
};

// Pre-created doctor user
const defaultDoctor: User = {
  id: 'doctor-1',
  name: 'د. أحمد محمد',
  email: 'doctor@alshifa-clinic.com',
  phone: '+966501234568',
  role: 'doctor',
  createdAt: new Date('2024-01-01'),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Initialize default users if not exists
    const existingUsers = localStorage.getItem('users');
    if (!existingUsers) {
      const defaultUsers = [defaultAdmin, defaultDoctor];
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    } else {
      // Check if admin user exists, if not add it
      const users = JSON.parse(existingUsers);
      const adminExists = users.find((u: User) => u.email === defaultAdmin.email);
      const doctorExists = users.find((u: User) => u.email === defaultDoctor.email);
      
      if (!adminExists || !doctorExists) {
        if (!adminExists) users.push(defaultAdmin);
        if (!doctorExists) users.push(defaultDoctor);
        localStorage.setItem('users', JSON.stringify(users));
      }
    }

    // Check for saved user session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: User) => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
