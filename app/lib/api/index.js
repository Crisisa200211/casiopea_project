// API URLs y configuración
export const API_BASE_URL = 'http://localhost:8084';

export const API_ENDPOINTS = {
  // Autenticación
  LOGIN: '/cioapi/auth/login',
  REGISTER: '/cioapi/auth/register',
  LOGOUT: '/cioapi/auth/logout',
  
  // Recuperación de contraseña
  REQUEST_PASSWORD_RESET: '/cioapi/auth/request-password-reset',
  VERIFY_RESET_CODE: '/cioapi/auth/verify-reset-code',
  RESET_PASSWORD: '/cioapi/auth/reset-password',
  
  // Perfil de usuario
  PROFILE: '/cioapi/user/profile',
  UPDATE_PROFILE: '/cioapi/user/update',
  
  // Usuarios (admin)
  USERS: '/cioapi/admin/users',
  UPDATE_USER: '/cioapi/admin/users/update',
  DELETE_USER: '/cioapi/admin/users/delete',
};

// Configuración de request
export const REQUEST_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
};

// Funciones de utilidad para API
export const buildApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

export const getAuthHeaders = (token) => ({
  ...REQUEST_CONFIG.headers,
  'Authorization': `Bearer ${token}`,
});

export const createApiRequest = (endpoint, options = {}) => {
  return fetch(buildApiUrl(endpoint), {
    ...REQUEST_CONFIG,
    ...options,
    headers: {
      ...REQUEST_CONFIG.headers,
      ...options.headers,
    },
  });
};
