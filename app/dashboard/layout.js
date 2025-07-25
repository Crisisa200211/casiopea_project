"use client";

import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardLayout({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [hasInitialized, setHasInitialized] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);

  // Marcar como inicializado después del primer render
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Solo redirigir una vez y si ya se inicializó
    if (hasInitialized && !loading && !isAuthenticated && !hasRedirected) {
      setHasRedirected(true);
      router.replace('/'); // Usar replace para evitar historial
    }
  }, [isAuthenticated, loading, hasInitialized, hasRedirected, router]);

  // Mostrar loading mientras verifica autenticación o durante inicialización
  if (loading || !hasInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Cargando...</div>
      </div>
    );
  }

  // Si no está autenticado, no mostrar contenido
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
