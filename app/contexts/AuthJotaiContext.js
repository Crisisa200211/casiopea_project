"use client";

import { createContext, useContext } from 'react';
import { useAuthJotai } from '../hooks/useAuthJotai';

const AuthJotaiContext = createContext();

export function AuthJotaiProvider({ children }) {
  const authData = useAuthJotai();
  
  return (
    <AuthJotaiContext.Provider value={authData}>
      {children}
    </AuthJotaiContext.Provider>
  );
}

export function useAuthJotaiContext() {
  const context = useContext(AuthJotaiContext);
  if (!context) {
    throw new Error('useAuthJotaiContext must be used within an AuthJotaiProvider');
  }
  return context;
}
