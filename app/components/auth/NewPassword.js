"use client";

import { useState, useEffect } from 'react';
import { 
  validatePasswordLength, 
  validatePasswordUppercase, 
  validatePasswordLowercase, 
  validatePasswordNumber, 
  validatePasswordSpecial 
} from '../../lib/validation';

export default function NewPassword({ onSubmit, onCancel, error, loading }) {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Limpiar campos cuando se monta el componente
  useEffect(() => {
    setNewPassword('');
    setConfirmNewPassword('');
    setShowNewPassword(false);
    setShowConfirmNewPassword(false);
    setShowPasswordRules(false);
  }, []);

  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const handlePasswordFocus = () => {
    setShowPasswordRules(true);
  };

  const handlePasswordBlur = () => {
    setShowPasswordRules(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ newPassword, confirmNewPassword });
  };

  return (
    <div className="login-container login-background">
      <div className="verification-container">
        <div className="forgot-password-wrapper">
          <div className="verification-card">
            <div className="verification-card-body">
              {/* Logo */}
              <div className="verification-logo-container">
                <div className="verification-logo-wrapper">
                  <img
                    src="/logo.jpg"
                    alt="Logo"
                    className="verification-logo"
                  />
                </div>
              </div>

              {/* Título */}
              <h2 className="new-password-title">
                Nueva contraseña
              </h2>
              
              {/* Mensaje */}
              <p className="new-password-message">
                Ingresa tu nueva contraseña para continuar
              </p>

              {/* Formulario */}
              <form onSubmit={handleSubmit}>
                <div className="new-password-form-group">
                  <div className="new-password-input-group">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      className="new-password-input"
                      id="newPassword"
                      placeholder="Nueva contraseña"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      onFocus={handlePasswordFocus}
                      onBlur={handlePasswordBlur}
                      required
                    />
                    <div 
                      className="new-password-input-icon" 
                      onClick={toggleNewPassword}
                    >
                      {showNewPassword ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="#6c757d"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="#6c757d"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  {/* Reglas de contraseña */}
                  {showPasswordRules && (
                    <div className="new-password-rules">
                      <div className={`new-password-rule ${validatePasswordLength(newPassword) ? 'valid' : ''}`}>
                        <span className="new-password-rule-icon">
                          {validatePasswordLength(newPassword) ? '✓' : '○'}
                        </span>
                        Al menos 8 caracteres
                      </div>
                      <div className={`new-password-rule ${validatePasswordUppercase(newPassword) ? 'valid' : ''}`}>
                        <span className="new-password-rule-icon">
                          {validatePasswordUppercase(newPassword) ? '✓' : '○'}
                        </span>
                        Al menos una letra mayúscula
                      </div>
                      <div className={`new-password-rule ${validatePasswordLowercase(newPassword) ? 'valid' : ''}`}>
                        <span className="new-password-rule-icon">
                          {validatePasswordLowercase(newPassword) ? '✓' : '○'}
                        </span>
                        Al menos una letra minúscula
                      </div>
                      <div className={`new-password-rule ${validatePasswordNumber(newPassword) ? 'valid' : ''}`}>
                        <span className="new-password-rule-icon">
                          {validatePasswordNumber(newPassword) ? '✓' : '○'}
                        </span>
                        Al menos un número
                      </div>
                      <div className={`new-password-rule ${validatePasswordSpecial(newPassword) ? 'valid' : ''}`}>
                        <span className="new-password-rule-icon">
                          {validatePasswordSpecial(newPassword) ? '✓' : '○'}
                        </span>
                        Al menos un carácter especial
                      </div>
                    </div>
                  )}
                </div>

                <div className="new-password-form-group">
                  <div className="new-password-input-group">
                    <input
                      type={showConfirmNewPassword ? "text" : "password"}
                      className="new-password-input"
                      id="confirmNewPassword"
                      placeholder="Confirmar nueva contraseña"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      required
                    />
                    <div 
                      className="new-password-input-icon" 
                      onClick={toggleConfirmNewPassword}
                    >
                      {showConfirmNewPassword ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="#6c757d"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="#6c757d"/>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mensaje de error */}
                {error && (
                  <div className="new-password-error-message">
                    {error}
                  </div>
                )}

                {/* Botones */}
                <div className="new-password-buttons">
                  <button
                    type="submit"
                    className="new-password-button-primary"
                    disabled={loading}
                  >
                    {loading ? 'Actualizando...' : 'Aceptar'}
                  </button>
                </div>

                {/* Enlace de cancelar */}
                <div className="new-password-cancel-container">
                  <button 
                    type="button"
                    className="new-password-cancel-link"
                    onClick={onCancel}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
