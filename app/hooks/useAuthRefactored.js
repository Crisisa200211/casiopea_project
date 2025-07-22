// Hook refactorizado que combina todos los hooks especializados
"use client";

import { useAuthCore } from './useAuthCore';
import { useFormState } from './useFormState';
import { usePasswordVisibility } from './usePasswordVisibility';
import { usePasswordRecovery } from './usePasswordRecovery';
import { validateLoginForm, validateRegisterForm } from '../lib/validation';

export const useAuth = () => {
  // Hooks especializados
  const authCore = useAuthCore();
  const passwordVisibility = usePasswordVisibility();
  const passwordRecovery = usePasswordRecovery();

  // Estados de formulario
  const loginForm = useFormState({
    username: '',
    password: '',
  }, validateLoginForm);

  const registerForm = useFormState({
    firstName: '',
    lastName: '',
    maternalLastName: '',
    phoneNumber: '',
    username: '',
    password: '',
    confirmPassword: '',
  }, validateRegisterForm);

  // Función de login combinada
  const handleLogin = async () => {
    const validation = loginForm.validate();
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    const result = await authCore.login(loginForm.values);
    if (!result.success) {
      loginForm.setErrors({ general: result.error });
    }

    return result;
  };

  // Función de registro combinada
  const handleRegister = async () => {
    const validation = registerForm.validate();
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    const result = await authCore.register(registerForm.values);
    if (!result.success) {
      registerForm.setErrors({ general: result.error });
    }

    return result;
  };

  // Limpiar formularios
  const clearForms = () => {
    loginForm.reset();
    registerForm.reset();
  };

  return {
    // Estado de autenticación
    user: authCore.user,
    loading: authCore.loading,
    authState: authCore.authState,
    isAuthenticated: authCore.isAuthenticated,

    // Formularios
    loginForm: {
      ...loginForm,
      handleSubmit: handleLogin,
    },
    registerForm: {
      ...registerForm,
      handleSubmit: handleRegister,
    },

    // Visibilidad de contraseñas
    passwordVisibility,

    // Recuperación de contraseñas
    passwordRecovery,

    // Métodos de autenticación
    login: authCore.login,
    register: authCore.register,
    logout: authCore.logout,
    getToken: authCore.getToken,

    // Utilidades
    clearForms,
  };
};
