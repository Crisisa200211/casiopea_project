"use client";

import { useAuthContext } from '../../contexts/AuthContext';
import Sidebar from './sidebar/Sidebar';
import LogoutModal from '../modal/LogoutModal';
import LoadingScreen from '../auth/LoadingScreen';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PageLayout({ children, activeSection }) {
  const { isAuthenticated, handleLogout } = useAuthContext();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const router = useRouter();

  // Inicialización una sola vez
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 100); // Breve delay para evitar flash

    return () => clearTimeout(timer);
  }, []);

  // Redirigir a la página principal si no está autenticado
  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isInitializing, router]);

  // Solo mostrar loading durante la inicialización inicial
  if (isInitializing) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return null; // Mientras se hace la redirección
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
    if (handleLogout) {
      handleLogout();
      // Redirigir después del logout
      router.push('/');
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
