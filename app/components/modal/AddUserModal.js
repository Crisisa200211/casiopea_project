"use client";

import { useState, useEffect } from 'react';
import './AddUserModal.css';

export default function AddUserModal({ isOpen, onClose, onSave, editingUser }) {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Poblar formulario cuando se está editando un usuario
  useEffect(() => {
    if (editingUser) {
      setFormData({
        nombres: editingUser.name || '',
        apellidos: editingUser.lastName || '',
        email: editingUser.email || '',
        telefono: editingUser.phoneNumber || '',
        password: '',
        confirmPassword: ''
      });
    } else {
      // Limpiar formulario para nuevo usuario
      setFormData({
        nombres: '',
        apellidos: '',
        email: '',
        telefono: '',
        password: '',
        confirmPassword: ''
      });
    }
    setErrors({});
    setSuccessMessage('');
    setErrorMessage('');
  }, [editingUser, isOpen]);

  if (!isOpen) return null;

  // Validación de contraseña segura
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

  const passwordValidation = validatePassword(formData.password);

  // Validar teléfono (solo números, máximo 10 dígitos)
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({ ...prev, telefono: value }));
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar errores cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombres.trim()) {
      newErrors.nombres = 'El nombre es requerido';
    }

    if (!formData.apellidos.trim()) {
      newErrors.apellidos = 'Los apellidos son requeridos';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (formData.telefono.length !== 10) {
      newErrors.telefono = 'El teléfono debe tener 10 dígitos';
    }

    // Validar contraseña solo si no estamos editando un usuario o si se ingresó una contraseña
    if (!editingUser) {
      // Para nuevo usuario, la contraseña es requerida
      if (!formData.password) {
        newErrors.password = 'La contraseña es requerida';
      } else if (!passwordValidation.isValid) {
        newErrors.password = 'La contraseña no cumple con los requisitos de seguridad';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirma la contraseña';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Guardar usuario
  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let userData;
      
      if (editingUser) {
        // Para edición, solo enviar los campos necesarios (sin contraseña)
        userData = {
          email: formData.email,
          name: formData.nombres,
          lastName: formData.apellidos,
          phoneNumber: formData.telefono
        };
      } else {
        // Para nuevo usuario, incluir contraseña
        userData = {
          nombres: formData.nombres,
          apellidos: formData.apellidos,
          email: formData.email,
          telefono: formData.telefono,
          password: formData.password
        };
      }
      
      // Llamar a onSave y esperar el resultado
      const result = await onSave(userData);
      
      // Si onSave devuelve un resultado exitoso, mostrar mensaje de éxito
      if (result && result.success) {
        setSuccessMessage(editingUser ? 'Usuario actualizado exitosamente' : 'Usuario creado exitosamente');
        
        // NO cerrar automáticamente - el usuario debe cerrar manualmente
      } else if (result && !result.success) {
        setErrorMessage(result.error || 'Error al procesar la solicitud');
      }
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      setErrorMessage(editingUser ? 'Error al actualizar el usuario' : 'Error al crear el usuario');
    } finally {
      setIsLoading(false);
    }
  };

  // Cerrar modal y limpiar formulario
  const handleClose = () => {
    setFormData({
      nombres: '',
      apellidos: '',
      email: '',
      telefono: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setSuccessMessage('');
    setErrorMessage('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="add-user-modal-overlay" onClick={handleOverlayClick}>
      <div className="add-user-modal-container" onClick={handleModalClick}>
        <div className="add-user-modal-header">
          <h4 className="mb-0">
            {editingUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
          </h4>
          <button 
            className="btn-close" 
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </div>
        
        <div className="add-user-modal-body">
          {/* Mensajes de éxito y error */}
          {successMessage && (
            <div className="alert alert-success d-flex align-items-center" role="alert">
              <span className="material-icons me-2">check_circle</span>
              {successMessage}
            </div>
          )}
          
          {errorMessage && (
            <div className="alert alert-danger d-flex align-items-center" role="alert">
              <span className="material-icons me-2">error</span>
              {errorMessage}
            </div>
          )}
          
          <form>
            {/* Nombres y Apellidos */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Nombre(s)</label>
                <input
                  type="text"
                  className={`form-control ${errors.nombres ? 'is-invalid' : ''}`}
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleInputChange}
                  placeholder="Ingresa el nombre"
                />
                {errors.nombres && <div className="invalid-feedback">{errors.nombres}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Apellido(s)</label>
                <input
                  type="text"
                  className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`}
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleInputChange}
                  placeholder="Ingresa los apellidos"
                />
                {errors.apellidos && <div className="invalid-feedback">{errors.apellidos}</div>}
              </div>
            </div>

            {/* Email y Teléfono */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ejemplo@correo.com"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Número telefónico (sin lada)</label>
                <input
                  type="text"
                  className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                  name="telefono"
                  value={formData.telefono}
                  onChange={handlePhoneChange}
                  placeholder="1234567890"
                  maxLength="10"
                />
                {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
              </div>
            </div>

            {/* Campos de contraseña - solo para nuevos usuarios */}
            {!editingUser && (
              <>
                {/* Contraseña */}
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Ingresa la contraseña"
                    />
                    <button 
                      className="btn btn-outline-secondary" 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className="material-icons">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                  
                  {/* Indicadores de validación de contraseña */}
                  {formData.password && (
                    <div className="password-requirements mt-2">
                      <small className="text-muted">Requisitos de contraseña:</small>
                      <div className="requirement-list">
                        <div className={`requirement ${passwordValidation.minLength ? 'valid' : 'invalid'}`}>
                          <span className="material-icons">{passwordValidation.minLength ? 'check' : 'close'}</span>
                          Al menos 8 caracteres
                        </div>
                        <div className={`requirement ${passwordValidation.hasUpperCase ? 'valid' : 'invalid'}`}>
                          <span className="material-icons">{passwordValidation.hasUpperCase ? 'check' : 'close'}</span>
                          Una letra mayúscula
                        </div>
                        <div className={`requirement ${passwordValidation.hasLowerCase ? 'valid' : 'invalid'}`}>
                          <span className="material-icons">{passwordValidation.hasLowerCase ? 'check' : 'close'}</span>
                          Una letra minúscula
                        </div>
                        <div className={`requirement ${passwordValidation.hasNumbers ? 'valid' : 'invalid'}`}>
                          <span className="material-icons">{passwordValidation.hasNumbers ? 'check' : 'close'}</span>
                          Un número
                        </div>
                        <div className={`requirement ${passwordValidation.hasSpecialChar ? 'valid' : 'invalid'}`}>
                          <span className="material-icons">{passwordValidation.hasSpecialChar ? 'check' : 'close'}</span>
                          Un carácter especial
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirmar Contraseña */}
                <div className="mb-3">
                  <label className="form-label">Confirmar contraseña</label>
                  <div className="input-group">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirma la contraseña"
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
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                  </div>
                  
                  {/* Indicador de coincidencia de contraseñas */}
                  {formData.password && formData.confirmPassword && (
                    <div className="mt-2">
                      <div className={`requirement ${formData.password === formData.confirmPassword ? 'valid' : 'invalid'}`}>
                        <span className="material-icons">
                          {formData.password === formData.confirmPassword ? 'check' : 'close'}
                        </span>
                        {formData.password === formData.confirmPassword 
                          ? 'Las contraseñas coinciden' 
                          : 'Las contraseñas no coinciden'
                        }
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </form>
        </div>
        
        <div className="add-user-modal-footer">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={handleClose}
            disabled={isLoading}
          >
            {successMessage ? 'Cerrar' : 'Cancelar'}
          </button>
          {!successMessage && (
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={handleSave}
              disabled={isLoading || (!editingUser && (!passwordValidation.isValid || formData.password !== formData.confirmPassword))}
            >
              {isLoading ? (
                <>
                  <div className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></div>
                  {editingUser ? 'Actualizando...' : 'Guardando...'}
                </>
              ) : (
                <>
                  <span className="material-icons me-2">{editingUser ? 'edit' : 'save'}</span>
                  {editingUser ? 'Actualizar Usuario' : 'Guardar Usuario'}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
