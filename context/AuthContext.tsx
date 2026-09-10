'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile } from '@/types/database';

interface AuthContextType {
  user: Profile | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string) => Promise<boolean>;
  register: (name: string, email: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<Profile>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'revibe_auth_user_v1';

const DEFAULT_USER: Profile = {
  id: 'demo-user-1',
  name: 'Eco Pioneer',
  email: 'eco@revibe.org',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  location: 'Green City, CA',
  bio: 'Passionate about turning everyday waste into functional art and eco-products.',
  role: 'user',
  created_at: new Date().toISOString(),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Default logged-in state for instant preview & seamless testing
        setUser(DEFAULT_USER);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(DEFAULT_USER));
      }
    } catch (e) {
      setUser(DEFAULT_USER);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string): Promise<boolean> => {
    setLoading(true);
    let targetUser = DEFAULT_USER;
    if (email.toLowerCase().includes('admin')) {
      targetUser = {
        ...DEFAULT_USER,
        id: 'admin-user-1',
        name: 'ReVIBE Admin',
        email: email,
        role: 'admin',
      };
    } else {
      targetUser = {
        ...DEFAULT_USER,
        email: email,
        name: email.split('@')[0] || 'ReVIBE Innovator',
      };
    }
    setUser(targetUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(targetUser));
    setLoading(false);
    return true;
  };

  const register = async (name: string, email: string): Promise<boolean> => {
    setLoading(true);
    const newUser: Profile = {
      id: 'usr-' + Date.now(),
      name,
      email,
      avatar_url: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80`,
      location: 'Earth Citizen',
      bio: 'New member of ReVIBE Waste-to-Wealth movement!',
      role: 'user',
      created_at: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateProfile = async (data: Partial<Profile>): Promise<boolean> => {
    if (!user) return false;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile: user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        loading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
