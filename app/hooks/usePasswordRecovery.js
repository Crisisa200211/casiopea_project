// Hook para recuperación de contraseñas
import { useState } from 'react';
import { createApiRequest, API_ENDPOINTS } from '../lib/api';
import { validateEmail, validateCode } from '../lib/validation';

export const usePasswordRecovery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState('email'); // 'email', 'code', 'newPassword'
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  // Solicitar código de recuperación
  const requestRecoveryCode = async (email) => {
    if (!validateEmail(email)) {
      return { success: false, error: 'Email inválido' };
    }

    setIsLoading(true);
    try {
      const response = await createApiRequest(API_ENDPOINTS.REQUEST_PASSWORD_RESET, {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al enviar código');
      }

      setEmail(email);
      setCurrentStep('code');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar código de recuperación
  const verifyRecoveryCode = async (code) => {
    if (!validateCode(code)) {
      return { success: false, error: 'Código inválido' };
    }

    setIsLoading(true);
    try {
      const response = await createApiRequest(API_ENDPOINTS.VERIFY_RESET_CODE, {
        method: 'POST',
        body: JSON.stringify({ email, code }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Código incorrecto');
      }

      setVerificationCode(code);
      setCurrentStep('newPassword');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Establecer nueva contraseña
  const resetPassword = async (newPassword) => {
    setIsLoading(true);
    try {
      const response = await createApiRequest(API_ENDPOINTS.RESET_PASSWORD, {
        method: 'POST',
        body: JSON.stringify({
          email,
          code: verificationCode,
          newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al cambiar contraseña');
      }

      // Resetear el estado
      setCurrentStep('email');
      setEmail('');
      setVerificationCode('');

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Reiniciar el proceso
  const resetProcess = () => {
    setCurrentStep('email');
    setEmail('');
    setVerificationCode('');
    setIsLoading(false);
  };

  return {
    // Estado
    isLoading,
    currentStep,
    email,

    // Métodos
    requestRecoveryCode,
    verifyRecoveryCode,
    resetPassword,
    resetProcess,
  };
};
