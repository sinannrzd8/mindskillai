import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, mockDatabase } from '@/lib/database';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (userData: { email: string; password: string; fullName: string; role?: User['role'] }) => Promise<{ success: boolean; error?: string }>;
  hasRole: (role: User['role']) => boolean;
  isStudent: boolean;
  isTeacher: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('mindskill_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('mindskill_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);

      // Validate input
      if (!email.trim() || !password.trim()) {
        return { success: false, error: 'Please fill in all fields' };
      }

      // Authenticate user
      const authenticatedUser = await mockDatabase.authenticateUser(email, password);

      if (!authenticatedUser) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Set user and store in localStorage
      setUser(authenticatedUser);
      localStorage.setItem('mindskill_user', JSON.stringify(authenticatedUser));

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: { email: string; password: string; fullName: string; role?: User['role'] }): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);

      const { email, password, fullName, role = 'student' } = userData;

      // Validate input
      if (!email.trim() || !password.trim() || !fullName.trim()) {
        return { success: false, error: 'Please fill in all fields' };
      }

      if (!authUtils.isValidEmail(email)) {
        return { success: false, error: 'Please enter a valid email address' };
      }

      if (!authUtils.isValidPassword(password)) {
        return { success: false, error: 'Password must be at least 6 characters long' };
      }

      // Create user
      const newUser = await mockDatabase.createUser({
        email,
        password, // In production, hash this
        fullName,
        role
      });

      // Auto-login after registration
      setUser(newUser);
      localStorage.setItem('mindskill_user', JSON.stringify(newUser));

      return { success: true };
    } catch (error: any) {
      console.error('Registration error:', error);
      return { success: false, error: error.message || 'An error occurred during registration' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mindskill_user');
  };

  const hasRole = (role: User['role']): boolean => {
    return user?.role === role;
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    hasRole,
    isStudent: hasRole('student'),
    isTeacher: hasRole('teacher'),
    isAdmin: hasRole('admin')
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Import authUtils here to avoid circular imports
import { authUtils } from '@/lib/database';