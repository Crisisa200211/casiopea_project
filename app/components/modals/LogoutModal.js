"use client";

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="power-icon">
            <span className="material-icons">power_settings_new</span>
          </div>
        </div>
        
        <div className="modal-body">
          <h3>Cerrar sesión</h3>
          <p>¿Estás seguro que quieres cerrar sesión?</p>
        </div>
        
        <div className="modal-footer">
          <button 
            className="btn-cancel" 
            onClick={onClose}
          >
            Cancelar
          </button>
          <button 
            className="btn-confirm" 
            onClick={onConfirm}
          >
            Aceptar
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .modal-content {
          background: white;
          border-radius: 16px;
          width: 320px;
          max-width: 90vw;
          padding: 24px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }
        
        .modal-header {
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
        }
        
        .power-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          background-color: white;
          border-radius: 50%;
          margin: 0 auto 16px auto;
        }
        
        .power-icon .material-icons {
          color: #2196F3;
          font-size: 55px;
        }
        
        .modal-body h3 {
          font-size: 20px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 8px 0;
        }
        
        .modal-body p {
          font-size: 14px;
          color: #666;
          margin: 0 0 24px 0;
          line-height: 1.4;
        }
        
        .modal-footer {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        
        .btn-cancel,
        .btn-confirm {
          border: none;
          border-radius: 8px;
          padding: 10px 24px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 100px;
        }
        
        .btn-cancel {
          background-color: transparent;
          color: #2196F3;
          border: 1px solid #e0e0e0;
        }
        
        .btn-cancel:hover {
          background-color: #f5f5f5;
        }
        
        .btn-confirm {
          background-color: #2196F3;
          color: white;
        }
        
        .btn-confirm:hover {
          background-color: #1976D2;
        }
      `}</style>
    </div>
  );
}
