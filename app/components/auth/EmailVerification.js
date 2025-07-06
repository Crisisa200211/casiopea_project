"use client";

export default function EmailVerification({ email, onConfirm, onCancel }) {
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
              <h2 className="verification-title">
                Verifica tu dirección de correo electrónico
              </h2>
              
              {/* Mensaje */}
              <p className="verification-message">
                Enviamos un link de verificación a la dirección de correo electrónico{" "}
                <span className="verification-email">{email}</span>.
              </p>
              
              <p className="verification-submessage">
                Debes verificar tu cuenta para entrar a las funcionalidades del sistema.
              </p>

              {/* Botones */}
              <div className="verification-buttons">
                <button
                  type="button"
                  className="verification-button-secondary"
                  onClick={onCancel}
                >
                  Reenviar
                </button>
                <button
                  type="button"
                  className="verification-button-primary"
                  onClick={() => onConfirm(email)}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
