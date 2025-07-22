// Funciones de validación de contraseñas
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
  return code && code.length === 6 && /^\d{6}$/.test(code);
};

// Validar formulario de login
export const validateLoginForm = (data) => {
  const errors = {};

  if (!data.username) {
    errors.username = 'El email es requerido';
  } else if (!validateEmail(data.username)) {
    errors.username = 'Ingresa un email válido';
  }

  if (!data.password) {
    errors.password = 'La contraseña es requerida';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validar formulario de registro
export const validateRegisterForm = (data) => {
  const errors = {};

  if (!data.firstName) errors.firstName = 'El nombre es requerido';
  if (!data.lastName) errors.lastName = 'El apellido paterno es requerido';
  if (!data.maternalLastName) errors.maternalLastName = 'El apellido materno es requerido';
  if (!data.phoneNumber) errors.phoneNumber = 'El teléfono es requerido';
  
  if (!data.username) {
    errors.username = 'El email es requerido';
  } else if (!validateEmail(data.username)) {
    errors.username = 'Ingresa un email válido';
  }

  if (!data.password) {
    errors.password = 'La contraseña es requerida';
  } else {
    const passwordValidation = validateAllPasswordRules(data.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.message;
    }
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'Confirma tu contraseña';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
