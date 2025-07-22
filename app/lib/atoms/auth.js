import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Atom para el token JWT (persistido en localStorage)
export const tokenAtom = atomWithStorage('auth_token', null);

// Atom para los datos del usuario (persistido en localStorage)
export const userAtom = atomWithStorage('user_data', null);

// Atom para el estado de carga
export const loadingAtom = atom(false);

// Atom para errores de autenticación
export const authErrorAtom = atom(null);

// Atom derivado para verificar si el usuario está autenticado
export const isAuthenticatedAtom = atom(
  (get) => {
    const token = get(tokenAtom);
    const user = get(userAtom);
    return !!(token && user);
  }
);

// Atom para el estado general de autenticación
export const authStateAtom = atom(
  (get) => {
    const isAuthenticated = get(isAuthenticatedAtom);
    const loading = get(loadingAtom);
    const error = get(authErrorAtom);
    
    if (loading) return 'loading';
    if (error) return 'error';
    if (isAuthenticated) return 'authenticated';
    return 'unauthenticated';
  }
);

// Atom para limpiar el estado de autenticación
export const clearAuthAtom = atom(
  null,
  (get, set) => {
    set(tokenAtom, null);
    set(userAtom, null);
    set(authErrorAtom, null);
    set(loadingAtom, false);
  }
);
