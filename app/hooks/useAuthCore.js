// Hook refactorizado para autenticación core
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createApiRequest, API_ENDPOINTS } from '../lib/api';
import { AUTH_STORAGE_KEYS, AUTH_STATES } from '../lib/constants/auth';

export const useAuthCore = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState(AUTH_STATES.INITIAL);
  const router = useRouter();

  // Inicialización de autenticación
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUser = localStorage.getItem(AUTH_STORAGE_KEYS.USER);
        const storedToken = localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);
        
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setAuthState(AUTH_STATES.AUTHENTICATED);
        } else {
          setAuthState(AUTH_STATES.UNAUTHENTICATED);
        }
      } catch (error) {
        console.error('Error al inicializar autenticación:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login
  const login = async (credentials) => {
    try {
      setLoading(true);
      setAuthState(AUTH_STATES.AUTHENTICATING);

      const response = await createApiRequest(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el login');
      }

      const data = await response.json();
      
      // Guardar datos en localStorage
      localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(data.user));
      localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, data.token);
      
      setUser(data.user);
      setAuthState(AUTH_STATES.AUTHENTICATED);
      
      return { success: true, data };
    } catch (error) {
      setAuthState(AUTH_STATES.UNAUTHENTICATED);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Registro
  const register = async (userData) => {
    try {
      setLoading(true);
      
      const response = await createApiRequest(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el registro');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async (showModal = false) => {
    try {
      // Intentar logout en el servidor
      const token = localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);
      if (token) {
        await createApiRequest(API_ENDPOINTS.LOGOUT, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Error al hacer logout en el servidor:', error);
    } finally {
      // Limpiar datos locales siempre
      localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
      localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
      
      setUser(null);
      setAuthState(AUTH_STATES.UNAUTHENTICATED);
      
      if (!showModal) {
        router.push('/');
      }
    }
  };

  // Verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return authState === AUTH_STATES.AUTHENTICATED && user !== null;
  };

  // Obtener token
  const getToken = () => {
    return localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);
  };

  return {
    // Estado
    user,
    loading,
    authState,
    
    // Métodos
    login,
    register,
    logout,
    isAuthenticated,
    getToken,
  };
};
