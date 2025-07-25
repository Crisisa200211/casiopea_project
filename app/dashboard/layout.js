"use client";

import { useAuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardLayout({ children }) {
  const { isAuthenticated, loading } = useAuthContext();
  const router = useRouter();
  const [hasInitialized, setHasInitialized] = useState(false);

  // Marcar como inicializado después del primer render
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasInitialized(true);
    }, 100); // Breve delay para permitir que localStorage se cargue

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Solo redirigir si ya se inicializó y definitivamente no está autenticado
    if (hasInitialized && !loading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, loading, hasInitialized, router]);

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
