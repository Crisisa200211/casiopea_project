"use client";

import { useState } from 'react';
import { 
  validatePasswordLength, 
  validatePasswordUppercase, 
  validatePasswordLowercase, 
  validatePasswordNumber, 
  validatePasswordSpecial,
  validateAllPasswordRules,
  validateEmail,
  validateCode,
  VALID_CREDENTIALS,
  VALID_EMAILS
} from '../utils/validation';

export const useAuth = () => {
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
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
    setIsLoading(false); // Limpiar loading
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
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
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
    console.log('Confirmando verificación de email para:', email || username);
    setError('');
    setShowVerification(false);
    setShowEmailVerified(true);
  };

  // Manejo de inicio de sesión después de verificación
  const handleStartSession = () => {
    console.log('Iniciando sesión...');
    setIsAuthenticated(true);
    clearAllStates();
  };

  // Manejo de solicitud de contraseña olvidada
  const handleForgotPassword = () => {
    setError(''); // Limpiar error al ir a recuperación
    setShowForgotPassword(true);
  };

  // Manejo de envío de email de recuperación
  const handleSendRecoveryEmail = (email) => {
    if (!email) {
      setError('El correo electrónico es obligatorio');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Por favor ingresa un correo electrónico válido');
      return;
    }
    
    // Validar que el email esté registrado
    if (!VALID_EMAILS.includes(email)) {
      setError('Este correo electrónico no está registrado en el sistema');
      return;
    }
    
    // Guardar el email para usarlo después
    setForgotPasswordEmail(email);
    console.log('Enviando código de recuperación a:', email);
    setError('');
    setShowForgotPassword(false);
    setShowRecoveryCodeSent(true);
  };

  // Manejo de verificación de código de recuperación
  const handleVerifyRecoveryCode = (code) => {
    if (!code) {
      setError('El código es obligatorio');
      return;
    }
    
    if (!validateCode(code)) {
      setError('El código debe tener 5 dígitos');
      return;
    }
    
    // Simular validación del código
    if (code !== '12345') {
      setError('Código incorrecto');
      return;
    }
    
    console.log('Código verificado exitosamente');
    setError('');
    setShowRecoveryCodeSent(false);
    setShowNewPassword(true);
  };

  // Manejo de cambio de contraseña
  const handleChangePassword = ({ newPassword: newPwd, confirmNewPassword: confirmNewPwd }) => {
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
    
    console.log('Contraseña actualizada exitosamente para:', forgotPasswordEmail);
    setError('');
    setShowNewPassword(false);
    setShowPasswordUpdated(true);
  };

  // Manejo de envío de formulario principal (login/registro)
  const handleSubmit = (formData) => {
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
      
      console.log('Registro exitoso', {
        firstName,
        lastName,
        maternalLastName,
        phoneNumber,
        position: 'Administrador',
        username,
        password
      });
      
      setError('');
      setShowVerification(true);
    } else {
      // Validación para login
      const { username, password } = formData;
      
      if (!username || !password) {
        setError('Todos los campos son obligatorios');
        return;
      }
      
      console.log('Login attempt', { username, password });
      
      // Simular validación de credenciales
      if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
        setError('');
        setIsLoading(true);
        console.log('Login exitoso - Mostrando loading...');
        
        // Simular tiempo de carga (puedes ajustar este tiempo)
        setTimeout(() => {
          setIsLoading(false);
          setIsAuthenticated(true);
          console.log('Redirigiendo al dashboard...');
        }, 2000);
      } else {
        setError('Usuario y/o contraseña incorrectos');
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
    isAuthenticated,
    firstName,
    lastName,
    maternalLastName,
    phoneNumber,
    position,
    confirmPassword,
    forgotPasswordEmail,
    recoveryCode,
    newPassword,
    confirmNewPassword,
    
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
  };
};
