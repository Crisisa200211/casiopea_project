"use client";

export default function EmailVerified({ onBackToLogin, onStartSession }) {
  return (
    <div className="login-container login-background">
      <div className="verification-container">
        <div className="verification-wrapper">
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
              <h2 className="email-verified-title">
                Correo electrónico verificado
              </h2>
              
              {/* Subtítulo */}
              <h3 className="email-verified-subtitle">
                ¡Bienvenido!
              </h3>
              
              {/* Mensaje */}
              <p className="email-verified-message">
                Tu correo ha sido verificado exitosamente.
              </p>
              <p className="email-verified-submessage">
                Ahora puedes iniciar sesión con tus credenciales.
              </p>

              {/* Botones */}
              <div className="verification-buttons">
                <button
                  type="button"
                  className="verification-button-secondary"
                  onClick={onBackToLogin}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="verification-button-primary"
                  onClick={onStartSession}
                >
                  Ir al Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
