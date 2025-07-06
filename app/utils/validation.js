// Funciones para validar reglas de contraseña
export const validatePasswordLength = (pwd) => pwd.length >= 8;
export const validatePasswordUppercase = (pwd) => /[A-Z]/.test(pwd);
export const validatePasswordLowercase = (pwd) => /[a-z]/.test(pwd);
export const validatePasswordNumber = (pwd) => /\d/.test(pwd);
export const validatePasswordSpecial = (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

// Validación completa de contraseña
export const validatePassword = (password) => {
  return {
    length: validatePasswordLength(password),
    uppercase: validatePasswordUppercase(password),
    lowercase: validatePasswordLowercase(password),
    number: validatePasswordNumber(password),
    special: validatePasswordSpecial(password),
  };
};

// Verificar si la contraseña es completamente válida
export const isPasswordValid = (password) => {
  const validation = validatePassword(password);
  return Object.values(validation).every(Boolean);
};

// Validación de todas las reglas de contraseña con mensaje
export const validateAllPasswordRules = (password) => {
  if (!validatePasswordLength(password)) {
    return { isValid: false, message: 'La contraseña debe tener al menos 8 caracteres' };
  }
  
  if (!validatePasswordUppercase(password)) {
    return { isValid: false, message: 'La contraseña debe tener al menos una letra mayúscula' };
  }
  
  if (!validatePasswordLowercase(password)) {
    return { isValid: false, message: 'La contraseña debe tener al menos una letra minúscula' };
  }
  
  if (!validatePasswordNumber(password)) {
    return { isValid: false, message: 'La contraseña debe tener al menos un número' };
  }
  
  if (!validatePasswordSpecial(password)) {
    return { isValid: false, message: 'La contraseña debe tener al menos un carácter especial' };
  }
  
  return { isValid: true, message: '' };
};

// Validación de email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validación de código de recuperación
export const validateCode = (code) => {
  return code && code.length === 5 && /^\d{5}$/.test(code);
};

// Lista de emails válidos para recuperación (simulado)
export const VALID_EMAILS = [
  'crispis111102@gmail.com', 
  'admin@test.com', 
  'usuario@ejemplo.com'
];

// Código de recuperación válido (simulado)
export const VALID_RECOVERY_CODE = '12345';

// Credenciales de login válidas (simulado)
export const VALID_CREDENTIALS = {
  username: 'crispis111102@gmail.com',
  password: '1'
};
