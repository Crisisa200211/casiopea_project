"use client";

import './LogoutModal.css';

export default function LogoutModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container" onClick={handleModalClick}>
        <div className="modal-header">
          <span className="material-icons modal-icon">info</span>
          <h3>Confirmación</h3>
        </div>
        
        <div className="modal-body">
          <p>¿Estás seguro de que deseas cerrar sesión?</p>
        </div>
        
        <div className="modal-footer">
          <button 
            className="modal-btn modal-btn-secondary" 
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button 
            className="modal-btn modal-btn-primary" 
            onClick={onConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
