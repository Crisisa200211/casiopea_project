"use client";

import { useState, useEffect } from 'react';
import { 
  validatePasswordLength, 
  validatePasswordUppercase, 
  validatePasswordLowercase, 
  validatePasswordNumber, 
  validatePasswordSpecial,
  validateAllPasswordRules,
  validateEmail,
  validateCode
} from '../lib/validation';
import {
  VALID_CREDENTIALS,
  DEV_CREDENTIALS,
  VALID_EMAILS
} from '../lib/constants/auth';
import { useAuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  // Hook de Jotai para autenticación real
  const authJotai = useAuthContext();

  // Estados principales
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPasswordField, setShowNewPasswordField] = useState(false);
  const [showConfirmNewPasswordField, setShowConfirmNewPasswordField] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  
  // Estados de flujo
  const [showVerification, setShowVerification] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [showNewPasswordRules, setShowNewPasswordRules] = useState(false);
  const [showEmailVerified, setShowEmailVerified] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRecoveryCodeSent, setShowRecoveryCodeSent] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPasswordUpdated, setShowPasswordUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Usar directamente el estado de autenticación de Jotai
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Campos adicionales para registro
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [maternalLastName, setMaternalLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [position, setPosition] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Estados de loading específicos para recuperación de contraseña
  const [sendingCode, setSendingCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  // Inicializar estado desde Jotai
  useEffect(() => {
    // Ya no necesita sincronización local
    // El estado viene directamente de authJotai.isAuthenticated
  }, [authJotai.isAuthenticated]);

  // Guardar estado cuando cambia la autenticación (mantener compatibilidad)
  useEffect(() => {
    if (authJotai.isAuthenticated) {
      const userData = authJotai.user || {
        email: username,
        name: 'Usuario Demo',
        role: 'Administrador'
      };
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  }, [authJotai.isAuthenticated, username, authJotai.user]);

  // Funciones de toggle
  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const toggleNewPassword = () => setShowNewPasswordField(!showNewPasswordField);
  const toggleConfirmNewPassword = () => setShowConfirmNewPasswordField(!showConfirmNewPasswordField);

  // Funciones de manejo de estado
  const handlePasswordFocus = () => {
    if (isRegister) {
      setShowPasswordRules(true);
    }
  };

  const handlePasswordBlur = () => {
    setShowPasswordRules(false);
  };

  const handleNewPasswordFocus = () => {
    setShowNewPasswordRules(true);
  };

  const handleNewPasswordBlur = () => {
    setShowNewPasswordRules(false);
  };

  const clearAllStates = () => {
    setShowVerification(false);
    setIsRegister(false);
    setError('');
    setShowPasswordRules(false);
    setShowEmailVerified(false);
    setShowForgotPassword(false);
    setShowRecoveryCodeSent(false);
    setShowNewPassword(false);
    setShowPasswordUpdated(false);
    setIsLoading(false);
    setForgotPasswordEmail('');
    setRecoveryCode('');
    setNewPassword('');
    setConfirmNewPassword('');
    setUsername('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setMaternalLastName('');
    setPhoneNumber('');
    setConfirmPassword('');
    
    // Limpiar localStorage adicional
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  };

  const handleLogout = () => {
    // Usar el logout de Jotai para limpiar estado global
    authJotai.logout();
    // No necesita setIsAuthenticated local
    clearAllStates();
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
    // Limpiar todos los estados y errores al cambiar entre login/registro
    setError('');
    setShowPasswordRules(false);
    setShowEmailVerified(false);
    setShowForgotPassword(false);
    setShowRecoveryCodeSent(false);
    setShowNewPassword(false);
    setShowPasswordUpdated(false);
    setForgotPasswordEmail('');
    setRecoveryCode('');
    setNewPassword('');
    setConfirmNewPassword('');
    // Limpiar también los campos del formulario principal
    setUsername('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setMaternalLastName('');
    setPhoneNumber('');
    setConfirmPassword('');
  };

  const handleBackToLogin = () => {
    clearAllStates();
  };

  const handleCancelForgotPassword = () => {
    // Limpiar todos los estados relacionados con recuperación de contraseña
    setShowForgotPassword(false);
    setShowRecoveryCodeSent(false);
    setShowNewPassword(false);
    setShowPasswordUpdated(false);
    setForgotPasswordEmail('');
    setRecoveryCode('');
    setNewPassword('');
    setConfirmNewPassword('');
    setError(''); // Limpiar errores al cancelar
    // También limpiar loading si estaba activo
    setIsLoading(false);
  };

  // Manejo de envío de verificación por email
  const handleEmailSubmit = (email) => {
    setError('');
    setShowVerification(false);
    setShowEmailVerified(true);
  };

  // Manejo de regreso al login después de verificación
  const handleStartSession = () => {
    // En lugar de autenticar automáticamente, regresamos al formulario de login
    clearAllStates();
  };

  // Manejo de solicitud de contraseña olvidada
  const handleForgotPassword = () => {
    setError(''); // Limpiar error al ir a recuperación
    setShowForgotPassword(true);
  };

  // Manejo de envío de email de recuperación
  const handleSendRecoveryEmail = async (email) => {
    if (!email) {
      setError('El correo electrónico es obligatorio');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Por favor ingresa un correo electrónico válido');
      return;
    }
    
    // Usar la API real para enviar código
    setSendingCode(true);
    setError('');

    try {
      const result = await authJotai.sendCode(email);

      if (result.success) {
        // Guardar el email para usarlo después
        setForgotPasswordEmail(email);
        setError('');
        setShowForgotPassword(false);
        setShowRecoveryCodeSent(true);
      } else {
        setError(result.error || 'Error enviando código');
      }
    } catch (error) {
      console.error('Error en handleSendRecoveryEmail:', error);
      setError('Error inesperado enviando código');
    } finally {
      setSendingCode(false);
    }
  };

  // Manejo de verificación de código de recuperación
  const handleVerifyRecoveryCode = async (code) => {
    if (!code) {
      setError('El código es obligatorio');
      return;
    }
    
    if (!validateCode(code)) {
      setError('El código debe tener 6 dígitos');
      return;
    }
    
    // Usar la API real para verificar código
    setVerifyingCode(true);
    setError('');

    try {
      const result = await authJotai.verifyCode(forgotPasswordEmail, code);

      if (result.success) {
        setError('');
        setShowRecoveryCodeSent(false);
        setShowNewPassword(true);
      } else {
        setError(result.error || 'Código incorrecto');
      }
    } catch (error) {
      console.error('Error en handleVerifyRecoveryCode:', error);
      setError('Error inesperado verificando código');
    } finally {
      setVerifyingCode(false);
    }
  };

  // Manejo de cambio de contraseña
  const handleChangePassword = async ({ newPassword: newPwd, confirmNewPassword: confirmNewPwd }) => {
    if (!newPwd || !confirmNewPwd) {
      setError('Todos los campos son obligatorios');
      return;
    }
    
    if (newPwd !== confirmNewPwd) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    const passwordValidation = validateAllPasswordRules(newPwd);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.message);
      return;
    }
    
    // Usar la API real para resetear contraseña
    setChangingPassword(true);
    setError('');

    try {
      const result = await authJotai.changePassword(forgotPasswordEmail, newPwd);

      if (result.success) {
        setError('');
        setShowNewPassword(false);
        setShowPasswordUpdated(true);
      } else {
        setError(result.error || 'Error cambiando contraseña');
      }
    } catch (error) {
      console.error('Error en handleChangePassword:', error);
      setError('Error inesperado cambiando contraseña');
    } finally {
      setChangingPassword(false);
    }
  };

  // Manejo de envío de formulario principal (login/registro)
  const handleSubmit = async (formData) => {
    if (isRegister) {
      // Validación para registro
      const { firstName, lastName, maternalLastName, phoneNumber, username, password, confirmPassword } = formData;
      
      if (!firstName || !lastName || !maternalLastName || !phoneNumber || !username || !password || !confirmPassword) {
        setError('Todos los campos son obligatorios');
        return;
      }
      
      if (!validateEmail(username)) {
        setError('Por favor ingresa un correo electrónico válido');
        return;
      }
      
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
      }
      
      const passwordValidation = validateAllPasswordRules(password);
      if (!passwordValidation.isValid) {
        setError(passwordValidation.message);
        return;
      }
      
      // Usar la API real para registro
      setIsLoading(true);
      setError('');

      try {
        const registerResult = await authJotai.register({
          email: username,
          firstName: firstName,
          lastName: `${lastName} ${maternalLastName}`.trim(), // Combinar apellido paterno y materno
          phoneNumber: phoneNumber,
          password: password
        });

        if (registerResult.success) {
          setError('');
          setShowVerification(true);
        } else {
          setError(registerResult.error || 'Error en el registro');
        }
      } catch (error) {
        console.error('Error en handleSubmit registro:', error);
        setError('Error inesperado durante el registro');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Validación para login
      const { username, password } = formData;
      
      if (!username || !password) {
        setError('Todos los campos son obligatorios');
        return;
      }

      // Usar la API real para login
      setIsLoading(true);
      setError('');

      try {
        const loginResult = await authJotai.login({
          email: username, // El hook espera email
          password: password
        });

        if (loginResult.success) {
          // El authJotai ya maneja el estado de autenticación
          setError('');
        } else {
          setError(loginResult.error || 'Error en el login');
        }
      } catch (error) {
        console.error('Error en handleSubmit:', error);
        setError('Error inesperado durante el login');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    // Estados
    showPassword,
    showConfirmPassword,
    showNewPasswordField,
    showConfirmNewPasswordField,
    username,
    password,
    error,
    isRegister,
    showVerification,
    showPasswordRules,
    showNewPasswordRules,
    showEmailVerified,
    showForgotPassword,
    showRecoveryCodeSent,
    showNewPassword,
    showPasswordUpdated,
    isLoading,
    isAuthenticated: authJotai.isAuthenticated, // Usar directamente de Jotai
    firstName,
    lastName,
    maternalLastName,
    phoneNumber,
    position,
    confirmPassword,
    
    // Estados de loading específicos
    sendingCode,
    verifyingCode,
    changingPassword,
    forgotPasswordEmail,
    recoveryCode,
    newPassword,
    confirmNewPassword,
    
    // Estados de Jotai
    user: authJotai.user,
    token: authJotai.token,
    authState: authJotai.authState,
    authError: authJotai.authError,
    authLoading: authJotai.loading,
    setUser: authJotai.setUser,
    
    // Setters
    setShowPassword,
    setShowConfirmPassword,
    setShowNewPasswordField,
    setShowConfirmNewPasswordField,
    setUsername,
    setPassword,
    setError,
    setIsRegister,
    setShowVerification,
    setShowPasswordRules,
    setShowNewPasswordRules,
    setShowEmailVerified,
    setShowForgotPassword,
    setShowRecoveryCodeSent,
    setShowNewPassword,
    setShowPasswordUpdated,
    setFirstName,
    setLastName,
    setMaternalLastName,
    setPhoneNumber,
    setPosition,
    setConfirmPassword,
    setForgotPasswordEmail,
    setRecoveryCode,
    setNewPassword,
    setConfirmNewPassword,
    
    // Funciones de utilidad
    togglePassword,
    toggleConfirmPassword,
    toggleNewPassword,
    toggleConfirmNewPassword,
    handlePasswordFocus,
    handlePasswordBlur,
    handleNewPasswordFocus,
    handleNewPasswordBlur,
    toggleForm,
    handleBackToLogin,
    handleCancelForgotPassword,
    clearAllStates,
    handleLogout,
    
    // Funciones de manejo de formularios
    handleEmailSubmit,
    handleStartSession,
    handleForgotPassword,
    handleSendRecoveryEmail,
    handleVerifyRecoveryCode,
    handleChangePassword,
    handleSubmit,
    
    // Funciones de Jotai
    clearAuthError: authJotai.clearError,
    getToken: authJotai.getToken,
    isTokenValid: authJotai.isTokenValid,
    register: authJotai.register,
    
    // Funciones de recuperación de contraseña
    sendCode: authJotai.sendCode,
    verifyCode: authJotai.verifyCode,
    changePasswordAPI: authJotai.changePassword,
    
    // Función para obtener datos del usuario
    fetchUserData: authJotai.fetchUserData,
    
    // Función para actualizar datos del usuario
    updateUserProfile: authJotai.updateUserProfile,
    
    // Función para cambiar contraseña desde el perfil
    changeUserPassword: authJotai.changeUserPasswordProfile,
  };
};
