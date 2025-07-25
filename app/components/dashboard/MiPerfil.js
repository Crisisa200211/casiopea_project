"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { updateUserData } from '../../lib/api/auth';

export default function MiPerfil() {
  const { user, setUser, changeUserPassword } = useAuth();
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [profileMessageType, setProfileMessageType] = useState('success'); // 'success' o 'error'
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false); // Loading específico para actualizar perfil
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  
  // Valores originales para restaurar
  const [originalValues, setOriginalValues] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    phoneNumber: ''
  });

  // Efecto para cargar datos del usuario
  useEffect(() => {
    if (user) {
      // Función para quitar el lada del número de teléfono
      const formatPhoneNumber = (phone) => {
        if (!phone) return '';
        // Quitar caracteres no numéricos
        const numbersOnly = phone.replace(/\D/g, '');
        // Si empieza con +52, quitar esos dígitos
        if (numbersOnly.startsWith('52') && numbersOnly.length > 10) {
          return numbersOnly.substring(2);
        }
        // Si empieza con +521, quitar esos dígitos  
        if (numbersOnly.startsWith('521') && numbersOnly.length > 10) {
          return numbersOnly.substring(3);
        }
        return numbersOnly;
      };
      
      const userData = {
        nombre: user.name || '',
        apellidos: user.lastName || '',
        email: user.email || '',
        phoneNumber: formatPhoneNumber(user.phoneNumber)
      };
      
      setNombre(userData.nombre);
      setApellidos(userData.apellidos);
      setEmail(userData.email);
      setPhoneNumber(userData.phoneNumber);
      setOriginalValues(userData);
    }
  }, [user]);

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

  const handleSaveProfile = async () => {
    // Verificar si hubo cambios comparando con los valores originales
    const hasChanges = 
      nombre !== originalValues.nombre ||
      apellidos !== originalValues.apellidos ||
      email !== originalValues.email ||
      phoneNumber !== originalValues.phoneNumber;

    if (hasChanges) {
      setIsUpdatingProfile(true); // Activar loading específico
      try {
        // Preparar los datos para enviar a la API
        const updateData = {
          email: email,
          name: nombre,
          lastName: apellidos,
          phoneNumber: phoneNumber.startsWith('+52') ? phoneNumber : `+52${phoneNumber}`
        };

        // Llamar a la API para actualizar los datos directamente (sin loading global)
        const result = await updateUserData(user.id, updateData);

        if (result.success) {
          // Actualizar el usuario en el contexto manualmente
          if (setUser) {
            setUser(result.data);
          }
          
          // Actualizar los valores originales para reflejar los nuevos datos
          setOriginalValues({
            nombre: nombre,
            apellidos: apellidos,
            email: email,
            phoneNumber: phoneNumber
          });
          
          setProfileMessage('¡Información personal actualizada correctamente!');
          setProfileMessageType('success');
          setTimeout(() => setProfileMessage(''), 5000);
        } else {
          setProfileMessage(`Error: ${result.error}`);
          setProfileMessageType('error');
          setTimeout(() => setProfileMessage(''), 5000);
        }
      } catch (error) {
        console.error('Error actualizando perfil:', error);
        setProfileMessage('Error al actualizar la información. Por favor, intenta de nuevo.');
        setProfileMessageType('error');
        setTimeout(() => setProfileMessage(''), 5000);
      } finally {
        setIsUpdatingProfile(false); // Desactivar loading específico
      }
    }
    // Si no hay cambios, no hacer nada (no mostrar mensaje)
  };

  const handleCancelProfile = () => {
    // Restaurar valores originales sin mensaje
    setNombre(originalValues.nombre);
    setApellidos(originalValues.apellidos);
    setEmail(originalValues.email);
    setPhoneNumber(originalValues.phoneNumber);
    setProfileMessage(''); // Limpiar cualquier mensaje existente
    setProfileMessageType('success'); // Reset al tipo por defecto
  };

  const handleChangePassword = async () => {
    // Limpiar mensajes previos
    setPasswordMessage('');
    
    // Validaciones
    if (!newPassword || !confirmPassword) {
      setPasswordMessage('Todos los campos son obligatorios');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordMessage('Las contraseñas no coinciden');
      return;
    }
    
    // Validar formato de contraseña
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      setPasswordMessage('La contraseña no cumple con los requisitos de seguridad');
      return;
    }
    
    setIsChangingPassword(true);
    
    try {
      const result = await changeUserPassword(user.id, newPassword);
      
      if (result.success) {
        setPasswordMessage('¡Contraseña cambiada exitosamente!');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setPasswordMessage(''), 5000);
      } else {
        setPasswordMessage(result.error || 'Error al cambiar la contraseña');
      }
    } catch (error) {
      console.error('Error cambiando contraseña:', error);
      setPasswordMessage('Error inesperado al cambiar la contraseña');
    } finally {
      setIsChangingPassword(false);
    }
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

              {/* Fila 2: Apellido(s) y Correo Electrónico */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Apellido(s)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Apellidos completos"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
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
              
              {/* Mensaje de estado para información personal */}
              {profileMessage && (
                <div className={`alert ${profileMessageType === 'success' ? 'alert-primary' : 'alert-danger'} text-center mt-3`} role="alert">
                  <span className="material-icons me-2" style={{verticalAlign: 'middle'}}>
                    {profileMessageType === 'success' ? 'check_circle' : 'error'}
                  </span>
                  {profileMessage}
                </div>
              )}
              
              <div className="d-flex justify-content-center gap-3 mt-4">
                <button 
                  type="button"
                  className="btn btn-primary d-flex align-items-center" 
                  onClick={handleSaveProfile}
                  disabled={isUpdatingProfile}
                >
                  {isUpdatingProfile ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <span className="material-icons me-2">save</span>
                      Guardar cambios
                    </>
                  )}
                </button>
                <button 
                  type="button"
                  className="btn btn-outline-secondary d-flex align-items-center" 
                  onClick={handleCancelProfile}
                  disabled={isUpdatingProfile}
                >
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
                      <span className="input-group-text p-0">
                        <button 
                          className="btn btn-link text-muted border-0 h-100 px-3" 
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          <span className="material-icons" style={{fontSize: '20px'}}>
                            {showCurrentPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </span>
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
                      <span className="input-group-text p-0">
                        <button 
                          className="btn btn-link text-muted border-0 h-100 px-3" 
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          <span className="material-icons" style={{fontSize: '20px'}}>
                            {showNewPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </span>
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
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <span className="input-group-text p-0">
                        <button 
                          className="btn btn-link text-muted border-0 h-100 px-3" 
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          <span className="material-icons" style={{fontSize: '20px'}}>
                            {showConfirmPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </span>
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
                      disabled={!passwordValidation.isValid || isChangingPassword}
                      onClick={handleChangePassword}
                    >
                      {isChangingPassword ? (
                        <>
                          <div className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></div>
                          Cambiando contraseña...
                        </>
                      ) : (
                        <>
                          <span className="material-icons me-2">lock</span>
                          Cambiar contraseña
                        </>
                      )}
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
