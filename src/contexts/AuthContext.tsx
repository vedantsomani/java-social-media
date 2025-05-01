import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  college: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          // Simulate successful login
          if (password.length >= 6) {
            const mockUser: User = {
              id: '123',
              username: email.split('@')[0],
              email,
              fullName: 'College Student',
              avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
              college: 'Demo University',
            };
            
            localStorage.setItem('user', JSON.stringify(mockUser));
            setUser(mockUser);
            resolve();
          } else {
            // Simulate login failure
            reject(new Error('Invalid credentials'));
          }
        } catch (error) {
          reject(error);
        } finally {
          setLoading(false);
        }
      }, 1000);
    });
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }) => {
    setLoading(true);
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          // Simulate successful registration
          if (userData.password.length >= 6) {
            const mockUser: User = {
              id: '123',
              username: userData.username,
              email: userData.email,
              fullName: userData.fullName,
              avatar: userData.avatar,
              college: userData.college,
            };
            
            localStorage.setItem('user', JSON.stringify(mockUser));
            setUser(mockUser);
            resolve();
          } else {
            // Simulate registration failure
            reject(new Error('Password must be at least 6 characters long'));
          }
        } catch (error) {
          reject(error);
        } finally {
          setLoading(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
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