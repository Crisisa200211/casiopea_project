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
import { loginUser, registerUser, sendRecoveryCode, verifyRecoveryCode, resetPassword, getUserData, updateUserData, changeUserPassword } from '../lib/api/auth';

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
        
        // Decodificar JWT para obtener el ID del usuario
        const tokenData = decodeJWT(result.token);
        
        if (tokenData && tokenData.sub) {
          // Obtener datos completos del usuario usando el ID del token
          const userDataResult = await getUserData(tokenData.sub);
          
          if (userDataResult.success) {
            setUser(userDataResult.data);
            setAuthError(null);
            return { success: true, user: userDataResult.data, token: result.token };
          } else {
            // Si no se pueden obtener los datos del usuario, usar datos básicos del token
            setUser(tokenData);
            setAuthError(null);
            return { success: true, user: tokenData, token: result.token };
          }
        } else {
          setUser(tokenData);
          setAuthError(null);
          return { success: true, user: tokenData, token: result.token };
        }
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

  // Función para obtener datos del usuario
  const fetchUserData = async (userId) => {
    setLoading(true);
    setAuthError(null);

    try {
      const result = await getUserData(userId);

      if (result.success) {
        // Actualizar los datos del usuario en el estado global
        setUser(result.data);
        setAuthError(null);
        return { success: true, data: result.data };
      } else {
        setAuthError(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = 'Error obteniendo datos del usuario';
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar datos del usuario
  const updateUserProfile = async (userId, userData) => {
    setLoading(true);
    setAuthError(null);

    try {
      const result = await updateUserData(userId, userData);

      if (result.success) {
        // Actualizar los datos del usuario en el estado global
        setUser(result.data);
        setAuthError(null);
        return { success: true, data: result.data };
      } else {
        setAuthError(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = 'Error actualizando datos del usuario';
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Función para cambiar contraseña del usuario desde su perfil
  const changeUserPasswordProfile = async (userId, newPassword) => {
    setLoading(true);
    setAuthError(null);

    try {
      const result = await changeUserPassword(userId, newPassword);

      if (result.success) {
        setAuthError(null);
        return { success: true, message: 'Contraseña actualizada correctamente' };
      } else {
        setAuthError(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = 'Error cambiando la contraseña';
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
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

    // Función para obtener datos del usuario
    fetchUserData,
    
    // Función para actualizar datos del usuario
    updateUserProfile,

    // Función para cambiar contraseña desde el perfil
    changeUserPasswordProfile,

    // Setters directos (para casos especiales)
    setToken,
    setUser,
    setLoading,
    setAuthError,
  };
};
