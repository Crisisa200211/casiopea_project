"use client";

import { useState, useEffect } from 'react';
import { VALID_EMAILS } from '../../utils/validation';

export default function ForgotPassword({ onSubmit, onCancel, error }) {
  const [email, setEmail] = useState('');

  // Limpiar el campo de email cuando se monta el componente
  useEffect(() => {
    setEmail('');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
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
              <h2 className="forgot-password-title">
                Recuperar contraseña
              </h2>
              
              {/* Mensaje */}
              <p className="forgot-password-message">
                Ingresa el correo electrónico con el que te registraste y te enviaremos un código para recuperar tu contraseña
              </p>

              {/* Formulario */}
              <form onSubmit={handleSubmit}>
                <div className="forgot-password-form-group">
                  <div className="forgot-password-input-group">
                    <input
                      type="email"                        className="forgot-password-input"
                        id="forgotEmail"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  {/* Mensaje de error directamente debajo del input */}
                  {error && (
                    <div className="forgot-password-error-message">
                      {error}
                    </div>
                  )}
                </div>

                {/* Botones */}
                <div className="forgot-password-buttons">
                  <button
                    type="submit"
                    className="forgot-password-button-primary"
                  >
                    Enviar
                  </button>
                </div>
              </form>

              {/* Enlace de cancelar */}
              <div className="forgot-password-cancel-container">
                <button 
                  type="button"
                  className="forgot-password-cancel-link"
                  onClick={onCancel}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
