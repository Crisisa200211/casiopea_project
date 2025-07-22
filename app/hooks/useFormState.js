"use client";

import { useState } from 'react';

// Hook para manejar formularios con validación
export const useFormState = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const updateField = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const setFieldError = (name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const markFieldTouched = (name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
    setTouched({});
  };

  const isFieldValid = (name) => {
    return !errors[name] && touched[name];
  };

  const hasErrors = () => {
    return Object.values(errors).some(error => error);
  };

  return {
    formData,
    errors,
    touched,
    updateField,
    setFieldError,
    markFieldTouched,
    resetForm,
    isFieldValid,
    hasErrors,
    setFormData,
    setErrors
  };
};
