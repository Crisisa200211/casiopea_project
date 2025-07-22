// Credenciales válidas para el sistema
export const VALID_CREDENTIALS = {
  username: 'crispis111102@gmail.com',
  password: 'Admin123!'
};

// Credenciales de desarrollo (más simples para testing)
export const DEV_CREDENTIALS = {
  username: 'admin@test.com',
  password: '123'
};

// Lista de emails válidos para recuperación
export const VALID_EMAILS = [
  'crispis111102@gmail.com', 
  'admin@test.com', 
  'usuario@ejemplo.com'
];

// Código de recuperación válido
export const VALID_RECOVERY_CODE = '12345';

// Estados de autenticación
export const AUTH_STATES = {
  INITIAL: 'initial',
  AUTHENTICATING: 'authenticating',
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
  ERROR: 'error'
};

// Claves de almacenamiento local
export const AUTH_STORAGE_KEYS = {
  USER: 'user',
  TOKEN: 'token',
  REMEMBER_ME: 'rememberMe'
};

// Configuración de autenticación
export const AUTH_CONFIG = {
  sessionTimeout: 30 * 60 * 1000, // 30 minutos
  rememberMeTimeout: 7 * 24 * 60 * 60 * 1000, // 7 días
  maxLoginAttempts: 5,
  lockoutDuration: 15 * 60 * 1000 // 15 minutos
};
