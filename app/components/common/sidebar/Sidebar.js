"use client";

import { useState } from 'react';
import './Sidebar.css';

export default function Sidebar({ activeSection, onSectionChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSectionClick = (section) => {
    onSectionChange(section);
    setIsOpen(false); // Cerrar sidebar en móvil al seleccionar
  };

  const mainMenuItems = [
    { id: 'mi-perfil', label: 'Mi perfil', icon: 'person' },
    { id: 'usuarios', label: 'Usuarios', icon: 'group' }
  ];

  const logoutItem = { id: 'cerrar-sesion', label: 'Cerrar sesión', icon: 'logout' };

  return (
    <>
      {/* Botón hamburguesa para móvil */}
      <button 
        className={`sidebar-toggle ${isOpen ? 'sidebar-toggle-hidden' : ''}`} 
        onClick={toggleSidebar}
      >
        <span className="material-icons">menu</span>
      </button>

      {/* Overlay para cerrar sidebar en móvil */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <nav className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-content">
          {/* Logo y título */}
          <div className="sidebar-header">
            <img 
              src="/logo.jpg" 
              alt="Casiopea Logo" 
              className="sidebar-logo"
            />
            <h2>CASIOPEA</h2>
          </div>

          {/* Menú de navegación */}
          <ul className="sidebar-menu">
            {mainMenuItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleSectionClick(item.id)}
                >
                  <span className="material-icons">{item.icon}</span>
                  <span className="sidebar-text">{item.label}</span>
                </button>
              </li>
            ))}
            
            {/* Cerrar sesión al final */}
            <li className="logout-section">
              <button
                className="sidebar-item logout-item"
                onClick={() => handleSectionClick(logoutItem.id)}
              >
                <span className="material-icons">{logoutItem.icon}</span>
                <span className="sidebar-text">{logoutItem.label}</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
