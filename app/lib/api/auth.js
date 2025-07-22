import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://3.83.225.247';
console.log('🌐 API_BASE_URL:', API_BASE_URL);
// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 segundos
});

// Interceptor para requests - agregar token si existe
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses - manejar errores globales
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Solo redirigir si NO es un intento de login
      const isLoginRequest = error.config?.url?.includes('/auth/login');
      const isRegisterRequest = error.config?.url?.includes('/auth/register');
      
      if (!isLoginRequest && !isRegisterRequest) {
        // Token expirado o inválido en otras operaciones - limpiar auth y redirigir
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
          localStorage.removeItem('user');
          window.location.href = '/';
        }
      }
      // Si es login/register, dejar que el componente maneje el error
    }
    return Promise.reject(error);
  }
);

// Función para hacer login
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', {
      email: credentials.email || credentials.username,
      password: credentials.password,
    });

    // La API retorna el token directamente en data
    if (response.data && response.data.statusCode === 201) {
      const token = response.data.data;
      
      return {
        success: true,
        token,
        data: response.data,
      };
    } else {
      return {
        success: false,
        error: 'Respuesta inesperada del servidor',
      };
    }
  } catch (error) {
    console.error('Error en login:', error);
    
    let errorMessage = 'Error de conexión con el servidor';
    
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      
      switch (status) {
        case 401:
          errorMessage = 'Credenciales incorrectas';
          break;
        case 400:
          errorMessage = data?.message || 'Datos inválidos';
          break;
        case 500:
          errorMessage = 'Error interno del servidor';
          break;
        default:
          errorMessage = data?.message || `Error ${status}`;
      }
    } else if (error.request) {
      errorMessage = 'No se pudo conectar con el servidor';
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
};

// Función para registro
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', {
      email: userData.email || userData.username,
      name: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
      password: userData.password,
    });

    // La API retorna según el statusCode
    if (response.data && (response.data.statusCode === 201 || response.data.statusCode === 200)) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        error: 'Respuesta inesperada del servidor',
      };
    }
  } catch (error) {
    console.error('Error en registro:', error);
    
    let errorMessage = 'Error de conexión con el servidor';
    
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      
      switch (status) {
        case 400:
          errorMessage = data?.message || 'Datos inválidos o usuario ya existe';
          break;
        case 409:
          errorMessage = 'El email ya está registrado';
          break;
        case 500:
          errorMessage = 'Error interno del servidor';
          break;
        default:
          errorMessage = data?.message || `Error ${status}`;
      }
    } else if (error.request) {
      errorMessage = 'No se pudo conectar con el servidor';
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
};

// Función para enviar código de recuperación
export const sendRecoveryCode = async (email) => {
  try {
    const response = await apiClient.post('/users/send-code', {
      email: email,
    });

    if (response.data && (response.data.statusCode === 201 || response.data.statusCode === 200)) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        error: 'Respuesta inesperada del servidor',
      };
    }
  } catch (error) {
    console.error('Error enviando código:', error);
    
    let errorMessage = 'Error de conexión con el servidor';
    
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      
      switch (status) {
        case 400:
          errorMessage = data?.message || 'Email inválido';
          break;
        case 404:
          errorMessage = 'Email no registrado en el sistema';
          break;
        case 500:
          errorMessage = 'Error interno del servidor';
          break;
        default:
          errorMessage = data?.message || `Error ${status}`;
      }
    } else if (error.request) {
      errorMessage = 'No se pudo conectar con el servidor';
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
};

// Función para verificar código de recuperación
export const verifyRecoveryCode = async (email, code) => {
  try {
    const response = await apiClient.post('/users/verify-code', {
      email: email,
      code: code,
    });

    if (response.data && (response.data.statusCode === 201 || response.data.statusCode === 200)) {
      // Verificar si el código es válido según la respuesta del API
      if (response.data.data && response.data.data.valid === true) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        // El código no es válido
        const message = response.data.data?.message || 'Código incorrecto o expirado';
        return {
          success: false,
          error: message,
        };
      }
    } else {
      return {
        success: false,
        error: 'Respuesta inesperada del servidor',
      };
    }
  } catch (error) {
    console.error('Error verificando código:', error);
    
    let errorMessage = 'Error de conexión con el servidor';
    
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      
      switch (status) {
        case 400:
          errorMessage = data?.message || 'Código inválido';
          break;
        case 401:
          errorMessage = 'Código incorrecto o expirado';
          break;
        case 500:
          errorMessage = 'Error interno del servidor';
          break;
        default:
          errorMessage = data?.message || `Error ${status}`;
      }
    } else if (error.request) {
      errorMessage = 'No se pudo conectar con el servidor';
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
};

// Función para resetear contraseña
export const resetPassword = async (email, newPassword) => {
  try {
    const response = await apiClient.post('/users/reset-password-global', {
      email: email,
      newPassword: newPassword,
    });

    if (response.data && (response.data.statusCode === 201 || response.data.statusCode === 200)) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        error: 'Respuesta inesperada del servidor',
      };
    }
  } catch (error) {
    console.error('Error reseteando contraseña:', error);
    
    let errorMessage = 'Error de conexión con el servidor';
    
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      
      switch (status) {
        case 400:
          errorMessage = data?.message || 'Datos inválidos';
          break;
        case 401:
          errorMessage = 'Sesión expirada, solicita un nuevo código';
          break;
        case 500:
          errorMessage = 'Error interno del servidor';
          break;
        default:
          errorMessage = data?.message || `Error ${status}`;
      }
    } else if (error.request) {
      errorMessage = 'No se pudo conectar con el servidor';
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export default apiClient;
