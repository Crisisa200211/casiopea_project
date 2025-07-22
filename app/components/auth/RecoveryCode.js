"use client";

import { useState, useEffect } from 'react';
import { VALID_RECOVERY_CODE } from '../../lib/constants/auth';

export default function RecoveryCode({ email, onSubmit, onCancel, error, loading }) {
  const [code, setCode] = useState('');

  // Limpiar el código cuando se monta el componente
  useEffect(() => {
    setCode('');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(code);
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
              <h2 className="recovery-code-title">
                Código de recuperación
              </h2>
              
              {/* Mensaje */}                <p className="recovery-code-message">
                  Ingresa código de recuperación que enviamos al correo{" "}
                  <span className="recovery-code-email">{email}</span>
                </p>

              {/* Formulario */}
              <form onSubmit={handleSubmit}>
                <div className="recovery-code-form-group">
                  <div className="recovery-code-inputs">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        type="text"
                        className="recovery-code-box"
                        maxLength="1"                          value={code[index] || ''}
                          onChange={(e) => {
                            const newCode = code.split('');
                            newCode[index] = e.target.value;
                            setCode(newCode.join(''));
                          
                          // Auto-focus al siguiente input (0-5, así que < 5)
                          if (e.target.value && index < 5) {
                            const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
                            if (nextInput) nextInput.focus();
                          }
                        }}
                        onKeyDown={(e) => {
                          // Permitir backspace para ir al input anterior
                          if (e.key === 'Backspace' && !e.target.value && index > 0) {
                            const prevInput = document.querySelector(`input[data-index="${index - 1}"]`);
                            if (prevInput) prevInput.focus();
                          }
                        }}
                        data-index={index}
                      />
                    ))}
                  </div>
                  
                  {/* Mensaje de error */}
                  {error && (
                    <div className="recovery-code-error-message">
                      {error}
                    </div>
                  )}
                </div>

                {/* Botones */}
                <div className="recovery-code-buttons">
                  <button
                    type="submit"
                    className="recovery-code-button-primary"
                    disabled={loading}
                  >
                    {loading ? 'Verificando...' : 'Verificar'}
                  </button>
                </div>
              </form>

              {/* Enlace de cancelar */}
              <div className="recovery-code-cancel-container">
                <button 
                  type="button"
                  className="recovery-code-cancel-link"
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
