"use client";

import { useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import MiPerfil from './pages/MiPerfil';
import Usuarios from './pages/Usuarios';
import LogoutModal from './modals/LogoutModal';

export default function Dashboard({ onLogout }) {
  const [activeSection, setActiveSection] = useState('mi-perfil');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleSectionChange = (section) => {
    if (section === 'cerrar-sesion') {
      setShowLogoutModal(true);
      return;
    }
    setActiveSection(section);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    if (onLogout) {
      onLogout();
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'mi-perfil':
        return <MiPerfil />;
      case 'usuarios':
        return <Usuarios />;
      default:
        return <MiPerfil />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange} 
      />
      <main className="main-content">
        {renderContent()}
      </main>
      
      <LogoutModal 
        isOpen={showLogoutModal}
        onConfirm={handleLogoutConfirm}
        onClose={handleLogoutCancel}
      />
    </div>
  );
}
