"use client";

import { useState } from 'react';
import Sidebar from '../common/sidebar/Sidebar';
import MiPerfil from './MiPerfil';
import Usuarios from './Usuarios';
import LogoutModal from '../modal/LogoutModal';

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
        onCancel={handleLogoutCancel}
      />
    </div>
  );
}
