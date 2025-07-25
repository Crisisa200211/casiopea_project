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
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
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
    
    // Estados de loading específicos
    sendingCode,
    verifyingCode,
    changingPassword,
    
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
  } = useAuth();

  // Redirigir al perfil cuando se autentica (solo si no hay otros flujos activos)
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      // Si ya está en una ruta del dashboard, no redirigir
      if (pathname.startsWith('/dashboard')) {
        return;
      }
      
      // Si no hay ningún flujo de autenticación especial activo, redirigir
      const hasActiveFlow = showVerification || showEmailVerified || showForgotPassword || 
                           showRecoveryCodeSent || showNewPassword || showPasswordUpdated;
      
      if (!hasActiveFlow) {
        // Usar replace y agregar pequeño delay para evitar conflictos
        setTimeout(() => {
          router.replace('/dashboard/mi-perfil');
        }, 100);
        return;
      }
    }
  }, [isAuthenticated, isLoading, pathname, showVerification, showEmailVerified, showForgotPassword, showRecoveryCodeSent, showNewPassword, showPasswordUpdated, router]);

  // Pantalla de loading solo durante login/registro o procesos específicos
  if (isLoading && (sendingCode || verifyingCode || changingPassword)) {
    return <LoadingScreen />;
  }

  // Si está autenticado y no hay flujos adicionales, mostrar loading mientras redirecciona
  // PERO solo si no está ya en el dashboard
  const hasActiveFlow = showVerification || showEmailVerified || showForgotPassword || 
                        showRecoveryCodeSent || showNewPassword || showPasswordUpdated;
  
  if (isAuthenticated && !hasActiveFlow && !pathname.startsWith('/dashboard')) {
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
        onBackToLogin={handleBackToLogin}
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
        loading={sendingCode}
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
        loading={verifyingCode}
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
        loading={changingPassword}
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

