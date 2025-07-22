"use client";

import { useAuthContext } from './contexts/AuthContext';
import LoginRegister from './components/auth/LoginRegister';
import EmailVerification from './components/auth/EmailVerification';
import EmailVerified from './components/auth/EmailVerified';
import ForgotPassword from './components/auth/ForgotPassword';
import RecoveryCode from './components/auth/RecoveryCode';
import NewPassword from './components/auth/NewPassword';
import PasswordUpdated from './components/auth/PasswordUpdated';
import LoadingScreen from './components/auth/LoadingScreen';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
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
    isAuthenticated,
    
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
    handleLogout,
  } = useAuthContext();

  // Redirigir al perfil cuando se autentica (solo si no hay otros flujos activos)
  useEffect(() => {
    console.log('🔄 useEffect ejecutándose. isAuthenticated:', isAuthenticated);
    console.log('📋 Estados de flujo:', {
      showVerification,
      showEmailVerified,
      showForgotPassword,
      showRecoveryCodeSent,
      showNewPassword,
      showPasswordUpdated
    });
    
    if (isAuthenticated) {
      // Si no hay ningún flujo de autenticación especial activo, redirigir
      const hasActiveFlow = showVerification || showEmailVerified || showForgotPassword || 
                           showRecoveryCodeSent || showNewPassword || showPasswordUpdated;
      
      console.log('🔀 hasActiveFlow:', hasActiveFlow);
      
      if (!hasActiveFlow) {
        console.log('🚀 ¡REDIRIGIENDO A PERFIL!');
        router.push('/mi-perfil');
      } else {
        console.log('⏸️ No redirigiendo porque hay flujos activos');
      }
    } else {
      console.log('❌ No autenticado, no redirigiendo');
    }
  }, [isAuthenticated, showVerification, showEmailVerified, showForgotPassword, showRecoveryCodeSent, showNewPassword, showPasswordUpdated, router]);

  // Pantalla de loading
  if (isLoading) {
    console.log('Mostrando LoadingScreen - isLoading es true');
    return <LoadingScreen />;
  }

  // Si está autenticado y no hay flujos adicionales, redirigir
  const hasActiveFlow = showVerification || showEmailVerified || showForgotPassword || 
                        showRecoveryCodeSent || showNewPassword || showPasswordUpdated;
  
  if (isAuthenticated && !hasActiveFlow) {
    console.log('Usuario autenticado sin flujos activos - Mostrando LoadingScreen mientras redirecciona');
    return <LoadingScreen />; // Mostrar loading mientras redirecciona
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

