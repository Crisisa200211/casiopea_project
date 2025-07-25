"use client";

import { createContext, useContext } from 'react';
import { useAuthJotai } from '../hooks/useAuthJotai';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Usar directamente useAuthJotai que maneja la persistencia real
  const authData = useAuthJotai();
  
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
