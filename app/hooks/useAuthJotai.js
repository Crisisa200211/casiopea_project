"use client";

import { useAtom } from 'jotai';
import {
  tokenAtom,
  userAtom,
  loadingAtom,
  authErrorAtom,
  isAuthenticatedAtom,
  authStateAtom,
  clearAuthAtom,
} from '../lib/atoms/auth';
import { loginUser, registerUser, sendRecoveryCode, verifyRecoveryCode, resetPassword } from '../lib/api/auth';

export const useAuthJotai = () => {
  const [token, setToken] = useAtom(tokenAtom);
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [authError, setAuthError] = useAtom(authErrorAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [authState] = useAtom(authStateAtom);
  const [, clearAuth] = useAtom(clearAuthAtom);

  // Función de login
  const login = async (credentials) => {
    setLoading(true);
    setAuthError(null);

    try {
      const result = await loginUser(credentials);

      if (result.success) {
        setToken(result.token);
        
        // Decodificar JWT para obtener datos del usuario
        const userData = decodeJWT(result.token);
        setUser(userData);
        
        setAuthError(null);
        return { success: true, user: userData };
      } else {
        setAuthError(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = 'Error inesperado durante el login';
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Función de registro
  const register = async (userData) => {
    setLoading(true);
    setAuthError(null);

    try {
      const result = await registerUser(userData);

      if (result.success) {
        setAuthError(null);
        return { success: true, data: result.data };
      } else {
        setAuthError(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = 'Error inesperado durante el registro';
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Función para enviar código de recuperación
  const sendCode = async (email) => {
    setLoading(true);
    setAuthError(null);

    try {
      const result = await sendRecoveryCode(email);

      if (result.success) {
        setAuthError(null);
        return { success: true, data: result.data };
      } else {
        setAuthError(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = 'Error inesperado enviando código';
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Función para verificar código
  const verifyCode = async (email, code) => {
    setLoading(true);
    setAuthError(null);

    try {
      const result = await verifyRecoveryCode(email, code);

      if (result.success) {
        setAuthError(null);
        return { success: true, data: result.data };
      } else {
        setAuthError(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = 'Error inesperado verificando código';
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Función para resetear contraseña
  const changePassword = async (email, newPassword) => {
    setLoading(true);
    setAuthError(null);

    try {
      const result = await resetPassword(email, newPassword);

      if (result.success) {
        setAuthError(null);
        return { success: true, data: result.data };
      } else {
        setAuthError(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = 'Error inesperado cambiando contraseña';
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Función auxiliar para decodificar JWT
  const decodeJWT = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decodificando JWT:', error);
      return null;
    }
  };

  // Función de logout
  const logout = () => {
    // Limpiar átomos de Jotai
    clearAuth();
    
    // Limpiar localStorage directamente para estar seguros
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  };

  // Función para limpiar errores
  const clearError = () => {
    setAuthError(null);
  };

  // Función para obtener el token actual
  const getToken = () => {
    return token;
  };

  // Función para verificar si el token es válido
  const isTokenValid = () => {
    if (!token) return false;
    
    try {
      // Decodificar JWT para verificar expiración
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const decoded = JSON.parse(jsonPayload);
      const currentTime = Date.now() / 1000;
      
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  return {
    // Estado
    token,
    user,
    loading,
    authError,
    isAuthenticated,
    authState,

    // Acciones
    login,
    register,
    logout,
    clearError,
    getToken,
    isTokenValid,

    // Funciones de recuperación de contraseña
    sendCode,
    verifyCode,
    changePassword,

    // Setters directos (para casos especiales)
    setToken,
    setUser,
    setLoading,
    setAuthError,
  };
};
