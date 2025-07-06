"use client";

export default function PasswordUpdated({ onStartSession, onCancel }) {
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

              {/* Icono de éxito */}
              <div className="password-updated-icon-container">
                <div className="password-updated-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#47BC0F"/>
                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Título */}
              <h2 className="password-updated-title">
                Contraseña actualizada
              </h2>
              
              {/* Mensaje */}
              <p className="password-updated-message">
                La contraseña fue actualizada con éxito, puedes iniciar sesión con ella.
              </p>

              {/* Botones */}
              <div className="password-updated-buttons">
                <button
                  type="button"
                  className="password-updated-button-primary"
                  onClick={onStartSession}
                >
                  Iniciar sesión
                </button>
              </div>

              {/* Enlace de cancelar */}
              <div className="password-updated-cancel-container">
                <button 
                  type="button"
                  className="password-updated-cancel-link"
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
