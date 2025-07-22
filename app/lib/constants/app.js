// Rutas de la aplicación
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROFILE: '/dashboard/mi-perfil',
  USERS: '/dashboard/usuarios',
  
  // API routes (futuro)
  API: {
    AUTH: '/api/auth',
    USERS: '/api/users',
    PROFILE: '/api/profile'
  }
};

// Configuración de navegación
export const NAV_ITEMS = [
  {
    id: 'mi-perfil',
    label: 'Mi perfil',
    icon: 'person',
    href: ROUTES.PROFILE
  },
  {
    id: 'usuarios',
    label: 'Usuarios',
    icon: 'group',
    href: ROUTES.USERS
  }
];

// Configuración de la aplicación
export const APP_CONFIG = {
  name: 'CASIOPEA',
  version: '1.0.0',
  description: 'Sistema de gestión corporativa',
  logo: '/logo.jpg'
};
