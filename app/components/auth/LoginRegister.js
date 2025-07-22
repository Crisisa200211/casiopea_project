"use client";

import { useState, useEffect } from 'react';
import { 
  validatePasswordLength, 
  validatePasswordUppercase, 
  validatePasswordLowercase, 
  validatePasswordNumber, 
  validatePasswordSpecial,
  validateAllPasswordRules
} from '../../lib/validation';

export default function LoginRegister({ 
  isRegister, 
  onToggleForm, 
  onForgotPassword, 
  onSubmit, 
  error 
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  
  // Campos del formulario
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    maternalLastName: '',
    phoneNumber: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  // Limpiar formulario cuando se cambia entre login/registro
  useEffect(() => {
    setFormData({
      firstName: '',
      lastName: '',
      maternalLastName: '',
      phoneNumber: '',
      username: '',
      password: '',
      confirmPassword: ''
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowPasswordRules(false);
  }, [isRegister]); // Se ejecuta cada vez que cambia isRegister

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordFocus = () => {
    if (isRegister) {
      setShowPasswordRules(true);
    }
  };

  const handlePasswordBlur = () => {
    setShowPasswordRules(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();



    onSubmit(formData);
  };

  return (
    <div className="login-container login-background">
      {/* Imagen de fondo del auto - Lado izquierdo */}
      <div className={`login-car-container d-none d-lg-block ${isRegister ? 'col-lg-4 col-xl-5' : 'col-lg-6 col-xl-7'}`}>
        <div className="login-car-wrapper">
          <div className="login-car-background" />
        </div>
      </div>

      {/* Contenedor del formulario - Lado derecho */}
      <div className={`login-form-container ${isRegister ? 'col-12 col-lg-8 col-xl-7' : 'col-12 col-lg-6 col-xl-5'}`}>
        <div className="login-form-wrapper">
          <div className="login-row">
            <div className={`login-col ${isRegister ? 'col-12 col-sm-11 col-md-10 col-lg-12 col-xl-10 col-xxl-9' : 'col-12 col-sm-10 col-md-8 col-lg-11 col-xl-8 col-xxl-7'}`}>
              <div className="login-card">
                <div className="login-card-body">
                  {/* Logo */}
                  <div className="login-logo-container">
                    <div className="login-logo-wrapper">
                      <img
                        src="/logo.jpg"
                        alt="Logo"
                        className="login-logo"
                      />
                    </div>
                  </div>

                  {/* Título */}
                  <h2 className="login-title">
                    {isRegister ? 'Crear tu cuenta' : 'Bienvenido'}
                  </h2>
                  <p className="login-subtitle">
                    {isRegister ? 'Para registrarte introduce tus datos.' : 'Inicia sesión para ingresar al sistema'}
                  </p>

                  {/* Formulario de Login/Registro */}
                  <form onSubmit={handleSubmit}>
                    {/* Campos adicionales para registro */}
                    {isRegister && (
                      <>
                        <div className="login-form-row">
                          <div className="login-form-group login-form-col-6">
                            <label htmlFor="firstName" className="login-label">
                              Nombre (s)
                            </label>
                            <div className="login-input-group">
                              <input
                                type="text"
                                className="login-input"
                                id="firstName"
                                placeholder=""
                                value={formData.firstName}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                required
                              />
                            </div>
                          </div>

                          <div className="login-form-group login-form-col-6">
                            <label htmlFor="lastName" className="login-label">
                              Apellido paterno
                            </label>
                            <div className="login-input-group">
                              <input
                                type="text"
                                className="login-input"
                                id="lastName"
                                placeholder=""
                                value={formData.lastName}
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="login-form-row">
                          <div className="login-form-group login-form-col-6">
                            <label htmlFor="maternalLastName" className="login-label">
                              Apellido materno
                            </label>
                            <div className="login-input-group">
                              <input
                                type="text"
                                className="login-input"
                                id="maternalLastName"
                                placeholder=""
                                value={formData.maternalLastName}
                                onChange={(e) => handleInputChange('maternalLastName', e.target.value)}
                                required
                              />
                            </div>
                          </div>

                          <div className="login-form-group login-form-col-6">
                            <label htmlFor="phoneNumber" className="login-label">
                              Número de teléfono
                            </label>
                            <div className="login-input-group">
                              <input
                                type="tel"
                                className="login-input"
                                id="phoneNumber"
                                placeholder=""
                                value={formData.phoneNumber}
                                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <div className={isRegister ? "login-form-row" : ""}>
                      <div className={`login-form-group ${isRegister ? 'login-form-col-6' : ''}`}>
                        <label htmlFor="username" className="login-label">
                          {isRegister ? 'Correo electrónico' : 'Usuario'}
                        </label>
                        <div className="login-input-group">
                          <input
                            type="email"
                            className="login-input"
                            id="username"
                            placeholder={isRegister ? '' : 'Ingresa tu usuario'}
                            value={formData.username}
                            onChange={(e) => handleInputChange('username', e.target.value)}
                            required
                          />
                          {!isRegister && (
                            <span className="login-input-icon">
                              <span className="material-icons material-icon">
                                person
                              </span>
                            </span>
                          )}
                        </div>
                      </div>

                      {isRegister && (
                        <div className="login-form-group login-form-col-6">
                          <label htmlFor="position" className="login-label">
                            Rol
                          </label>
                          <div className="login-input-group">
                            <input
                              type="text"
                              className="login-input"
                              id="position"
                              value="Administrador"
                              readOnly
                              style={{ backgroundColor: '#f8f9fa', cursor: 'not-allowed' }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className={isRegister ? "login-form-row" : ""}>
                      <div className={`login-form-group-password ${isRegister ? 'login-form-col-6' : ''}`}>
                        <label htmlFor="password" className="login-label">
                          Contraseña
                        </label>
                        <div className="login-input-group">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="login-input"
                            id="password"
                            placeholder={isRegister ? '' : 'Ingresa tu contraseña'}
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            onFocus={handlePasswordFocus}
                            onBlur={handlePasswordBlur}
                            required
                          />
                          <span className="login-input-icon">
                            <button
                              type="button"
                              className="login-password-toggle"
                              onClick={togglePassword}
                            >
                              <span className="material-icons material-icon">
                                {showPassword ? "visibility_off" : "visibility"}
                              </span>
                            </button>
                          </span>
                        </div>
                        
                        {/* Reglas de contraseña para registro */}
                        {isRegister && showPasswordRules && (
                          <div className="password-rules">
                            <p className="password-rules-title">La contraseña debe contener:</p>
                            <ul className="password-rules-list">
                              <li className={validatePasswordLength(formData.password) ? 'password-rule-valid' : 'password-rule-invalid'}>
                                <span className="password-rule-icon">
                                  {validatePasswordLength(formData.password) ? '✓' : '✗'}
                                </span>
                                Al menos 8 caracteres
                              </li>
                              <li className={validatePasswordUppercase(formData.password) ? 'password-rule-valid' : 'password-rule-invalid'}>
                                <span className="password-rule-icon">
                                  {validatePasswordUppercase(formData.password) ? '✓' : '✗'}
                                </span>
                                Una letra mayúscula (A-Z)
                              </li>
                              <li className={validatePasswordLowercase(formData.password) ? 'password-rule-valid' : 'password-rule-invalid'}>
                                <span className="password-rule-icon">
                                  {validatePasswordLowercase(formData.password) ? '✓' : '✗'}
                                </span>
                                Una letra minúscula (a-z)
                              </li>
                              <li className={validatePasswordNumber(formData.password) ? 'password-rule-valid' : 'password-rule-invalid'}>
                                <span className="password-rule-icon">
                                  {validatePasswordNumber(formData.password) ? '✓' : '✗'}
                                </span>
                                Un número (0-9)
                              </li>
                              <li className={validatePasswordSpecial(formData.password) ? 'password-rule-valid' : 'password-rule-invalid'}>
                                <span className="password-rule-icon">
                                  {validatePasswordSpecial(formData.password) ? '✓' : '✗'}
                                </span>
                                Un carácter especial (!@#$%^&*)
                              </li>
                            </ul>
                          </div>
                        )}
                        
                        {/* Mensaje de error debajo del input de contraseña para login */}
                        {error && !isRegister && (
                          <div className="login-error-text">
                            {error}
                          </div>
                        )}
                      </div>

                      {isRegister && (
                        <div className="login-form-group-password login-form-col-6">
                          <label htmlFor="confirmPassword" className="login-label">
                            Confirmar contraseña
                          </label>
                          <div className="login-input-group">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              className="login-input"
                              id="confirmPassword"
                              placeholder=""
                              value={formData.confirmPassword}
                              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                              required
                            />
                            <span className="login-input-icon">
                              <button
                                type="button"
                                className="login-password-toggle"
                                onClick={toggleConfirmPassword}
                              >
                                <span className="material-icons material-icon">
                                  {showConfirmPassword ? "visibility_off" : "visibility"}
                                </span>
                              </button>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Mensaje de error para registro */}
                    {error && isRegister && (
                      <div className="login-error-text login-error-register">
                        {error}
                      </div>
                    )}

                    {/* Botones */}
                    {isRegister ? (
                      <div className="login-register-buttons">
                        <button
                          type="button"
                          className="login-button-secondary"
                          onClick={onToggleForm}
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="login-button-primary"
                        >
                          Registrarse
                        </button>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="login-button"
                      >
                        INICIAR SESIÓN
                      </button>
                    )}

                    {/* Enlaces inferiores */}
                    {!isRegister && (
                      <>
                        {/* Olvidé mi contraseña */}
                        <div className="login-link-container">
                          <button 
                            type="button"
                            className="login-link"
                            onClick={onForgotPassword}
                          >
                            ¿Olvidaste tu contraseña?
                          </button>
                        </div>

                        {/* Enlace de registro */}
                        <div className="login-register-container">
                          <span className="login-register-text">
                            Regístrate{" "}
                            <button 
                              type="button"
                              className="login-register-link"
                              onClick={onToggleForm}
                            >
                              aquí
                            </button>
                          </span>
                        </div>
                      </>
                    )}

                    {/* Enlace de login desde registro */}
                    {isRegister && (
                      <div className="login-register-container">
                        <span className="login-register-text">
                          Inicia sesión{" "}
                          <button 
                            type="button"
                            className="login-register-link"
                            onClick={onToggleForm}
                          >
                            aquí
                          </button>
                        </span>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
