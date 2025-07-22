"use client";

import { useState } from 'react';

// Hook para manejar la visibilidad de contraseñas
export const usePasswordVisibility = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const toggleNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);

  return {
    showPassword,
    showConfirmPassword,
    showNewPassword,
    showCurrentPassword,
    togglePassword,
    toggleConfirmPassword,
    toggleNewPassword,
    toggleCurrentPassword
  };
};
