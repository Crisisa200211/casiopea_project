"use client";

import { useAuth } from './hooks/useAuth';
import LoginRegister from './components/auth/LoginRegister';
import EmailVerification from './components/auth/EmailVerification';
import EmailVerified from './components/auth/EmailVerified';
import ForgotPassword from './components/auth/ForgotPassword';
import RecoveryCode from './components/auth/RecoveryCode';
import NewPassword from './components/auth/NewPassword';
import PasswordUpdated from './components/auth/PasswordUpdated';
import LoadingScreen from './components/auth/LoadingScreen';

export default function Home() {
  const {
    // Estados de flujo
    showVerification,
    showEmailVerified,
    showForgotPassword,
    showRecoveryCodeSent,
    showNewPassword,
    showPasswordUpdated,
    isRegister,
    error,
    forgotPasswordEmail,
    username,
    isLoading,
    
    // Funciones de manejo
    handleEmailSubmit,
    handleBackToLogin,
    handleStartSession,
    handleSendRecoveryEmail,
    handleVerifyRecoveryCode,
    handleChangePassword,
    handleSubmit,
    toggleForm,
    handleForgotPassword,
    handleCancelForgotPassword,
  } = useAuth();

  // Pantalla de loading
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Pantalla de verificación de correo electrónico
  if (showVerification) {
    return (
      <EmailVerification
        email={username}
        onConfirm={handleEmailSubmit}
        onCancel={handleBackToLogin}
      />
    );
  }

  // Pantalla de correo electrónico verificado
  if (showEmailVerified) {
    return (
      <EmailVerified
        onStartSession={handleStartSession}
        onCancel={handleBackToLogin}
      />
    );
  }

  // Pantalla de recuperar contraseña
  if (showForgotPassword) {
    return (
      <ForgotPassword
        onSubmit={handleSendRecoveryEmail}
        onCancel={handleCancelForgotPassword}
        error={error}
      />
    );
  }

  // Pantalla de código de recuperación
  if (showRecoveryCodeSent) {
    return (
      <RecoveryCode
        email={forgotPasswordEmail}
        onSubmit={handleVerifyRecoveryCode}
        onCancel={handleCancelForgotPassword}
        error={error}
      />
    );
  }

  // Pantalla de nueva contraseña
  if (showNewPassword) {
    return (
      <NewPassword
        onSubmit={handleChangePassword}
        onCancel={handleCancelForgotPassword}
        error={error}
      />
    );
  }

  // Pantalla de contraseña actualizada
  if (showPasswordUpdated) {
    return (
      <PasswordUpdated
        onStartSession={handleCancelForgotPassword}
        onCancel={handleCancelForgotPassword}
      />
    );
  }

  // Pantalla principal de Login/Registro
  return (
    <LoginRegister
      isRegister={isRegister}
      onToggleForm={toggleForm}
      onForgotPassword={handleForgotPassword}
      onSubmit={handleSubmit}
      error={error}
    />
  );
}

