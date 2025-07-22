"use client";

import { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const authData = useAuth();
  
  console.log('🔐 AuthProvider - isAuthenticated:', authData.isAuthenticated);
  
  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
