"use client";

import { useAuth } from '../../hooks/useAuth';
import Sidebar from './sidebar/Sidebar';
import LogoutModal from '../modal/LogoutModal';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PageLayout({ children, activeSection }) {
  const { isAuthenticated, handleLogout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  // Solo renderizar si está autenticado, no hacer redirección aquí
  // La redirección se maneja en el dashboard layout
  if (!isAuthenticated) {
    return null; // Dejar que el dashboard layout maneje la redirección
  }

  const handleSectionChange = (section) => {
    if (section === 'cerrar-sesion') {
      setShowLogoutModal(true);
      return;
    }
    
    // Navegar a las diferentes secciones
    switch (section) {
      case 'usuarios':
        router.push('/dashboard/usuarios');
        break;
      case 'mi-perfil':
        router.push('/dashboard/mi-perfil');
        break;
      default:
        break;
    }
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    
    try {
      // Ejecutar logout
      if (handleLogout) {
        handleLogout();
      }
      
      // La redirección se manejará automáticamente por el dashboard layout
      // al detectar que ya no está autenticado
    } catch (error) {
      console.error('Error during logout:', error);
      // En caso de error, forzar redirección
      router.replace('/');
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };


  
  return (
    <div className="dashboard">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange} 
      />
      <main className="main-content">
        {children}
      </main>
      
      <LogoutModal 
        isOpen={showLogoutModal}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </div>
  );
}
