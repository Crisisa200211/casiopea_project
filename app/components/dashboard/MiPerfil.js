"use client";

import { useState } from 'react';

export default function MiPerfil() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('5551234567');
  const [profileMessage, setProfileMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('Usuario Demo');
  const [apellidoPaterno, setApellidoPaterno] = useState('García');
  const [apellidoMaterno, setApellidoMaterno] = useState('López');
  const [email, setEmail] = useState('usuario@demo.com');
  
  // Valores originales para restaurar
  const originalValues = {
    nombre: 'Usuario Demo',
    apellidoPaterno: 'García',
    apellidoMaterno: 'López',
    email: 'usuario@demo.com',
    phoneNumber: '5551234567'
  };

  // Validaciones de contraseña segura
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
    };
  };

  const passwordValidation = validatePassword(newPassword);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(value);
  };

  const handleSaveProfile = () => {
    // Verificar si hubo cambios comparando con los valores originales
    const hasChanges = 
      nombre !== originalValues.nombre ||
      apellidoPaterno !== originalValues.apellidoPaterno ||
      apellidoMaterno !== originalValues.apellidoMaterno ||
      email !== originalValues.email ||
      phoneNumber !== originalValues.phoneNumber;

    if (hasChanges) {
      setProfileMessage('¡Información personal actualizada correctamente!');
      setTimeout(() => setProfileMessage(''), 5000);
    }
    // Si no hay cambios, no hacer nada (no mostrar mensaje)
  };

  const handleCancelProfile = () => {
    // Restaurar valores originales sin mensaje
    setNombre(originalValues.nombre);
    setApellidoPaterno(originalValues.apellidoPaterno);
    setApellidoMaterno(originalValues.apellidoMaterno);
    setEmail(originalValues.email);
    setPhoneNumber(originalValues.phoneNumber);
    setProfileMessage(''); // Limpiar cualquier mensaje existente
  };

  const handleChangePassword = () => {
    setPasswordMessage('¡Contraseña cambiada exitosamente!');
    setTimeout(() => setPasswordMessage(''), 5000);
  };

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">Mi Perfil</h1>
          
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Información Personal</h5>
            </div>
            <div className="card-body">
              {/* Fila 1: Nombre y Número de Teléfono */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Nombre</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Número de Teléfono</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    placeholder="10 dígitos"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    maxLength="10"
                  />
                  <div className="form-text">Solo números, máximo 10 dígitos</div>
                </div>
              </div>

              {/* Fila 2: Apellido Paterno y Correo Electrónico */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Apellido Paterno</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Apellido paterno"
                    value={apellidoPaterno}
                    onChange={(e) => setApellidoPaterno(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Correo Electrónico</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Fila 3: Apellido Materno y Rol */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Apellido Materno</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Apellido materno"
                    value={apellidoMaterno}
                    onChange={(e) => setApellidoMaterno(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Rol</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value="Administrador"
                    readOnly
                    style={{ backgroundColor: '#f8f9fa', cursor: 'not-allowed' }}
                  />
                  <div className="form-text">Este campo no se puede modificar</div>
                </div>
              </div>
              
              {/* Mensaje de estado para información personal */}
              {profileMessage && (
                <div className="alert alert-success text-center mt-3" role="alert">
                  <span className="material-icons me-2" style={{verticalAlign: 'middle'}}>check_circle</span>
                  {profileMessage}
                </div>
              )}
              
              <div className="d-flex justify-content-center gap-3 mt-4">
                <button className="btn btn-primary d-flex align-items-center" onClick={handleSaveProfile}>
                  <span className="material-icons me-2">save</span>
                  Guardar cambios
                </button>
                <button className="btn btn-outline-secondary d-flex align-items-center" onClick={handleCancelProfile}>
                  <span className="material-icons me-2">refresh</span>
                  Cancelar
                </button>
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header">
              <h5 className="card-title mb-0">Cambiar Contraseña</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Contraseña actual</label>
                    <div className="input-group">
                      <input 
                        type={showCurrentPassword ? "text" : "password"}
                        className="form-control" 
                        placeholder="Contraseña actual"
                      />
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        <span className="material-icons">
                          {showCurrentPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Nueva contraseña</label>
                    <div className="input-group">
                      <input 
                        type={showNewPassword ? "text" : "password"}
                        className="form-control" 
                        placeholder="Nueva contraseña"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        <span className="material-icons">
                          {showNewPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                    
                    {/* Indicadores de seguridad de contraseña */}
                    {newPassword && (
                      <div className="mt-2">
                        <div className="form-text mb-2">Requisitos de seguridad:</div>
                        <div className="d-flex flex-column gap-1">
                          <small className={passwordValidation.minLength ? 'text-success' : 'text-danger'}>
                            <span className="material-icons" style={{fontSize: '16px'}}>
                              {passwordValidation.minLength ? 'check_circle' : 'cancel'}
                            </span>
                            Mínimo 8 caracteres
                          </small>
                          <small className={passwordValidation.hasUpperCase ? 'text-success' : 'text-danger'}>
                            <span className="material-icons" style={{fontSize: '16px'}}>
                              {passwordValidation.hasUpperCase ? 'check_circle' : 'cancel'}
                            </span>
                            Al menos una mayúscula
                          </small>
                          <small className={passwordValidation.hasLowerCase ? 'text-success' : 'text-danger'}>
                            <span className="material-icons" style={{fontSize: '16px'}}>
                              {passwordValidation.hasLowerCase ? 'check_circle' : 'cancel'}
                            </span>
                            Al menos una minúscula
                          </small>
                          <small className={passwordValidation.hasNumbers ? 'text-success' : 'text-danger'}>
                            <span className="material-icons" style={{fontSize: '16px'}}>
                              {passwordValidation.hasNumbers ? 'check_circle' : 'cancel'}
                            </span>
                            Al menos un número
                          </small>
                          <small className={passwordValidation.hasSpecialChar ? 'text-success' : 'text-danger'}>
                            <span className="material-icons" style={{fontSize: '16px'}}>
                              {passwordValidation.hasSpecialChar ? 'check_circle' : 'cancel'}
                            </span>
                            Al menos un carácter especial
                          </small>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Confirmar nueva contraseña</label>
                    <div className="input-group">
                      <input 
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control" 
                        placeholder="Confirmar nueva contraseña"
                      />
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <span className="material-icons">
                          {showConfirmPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Mensaje de estado para contraseña */}
                  {passwordMessage && (
                    <div className="alert alert-success text-center mt-3" role="alert">
                      <span className="material-icons me-2" style={{verticalAlign: 'middle'}}>check_circle</span>
                      {passwordMessage}
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <button 
                      className="btn btn-warning d-flex align-items-center"
                      disabled={!passwordValidation.isValid}
                      onClick={handleChangePassword}
                    >
                      <span className="material-icons me-2">lock</span>
                      Cambiar contraseña
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
