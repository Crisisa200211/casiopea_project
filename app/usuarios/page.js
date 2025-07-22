"use client";

import PageLayout from '../components/PageLayout';
import Usuarios from '../components/pages/Usuarios';

export default function UsuariosPage() {
  return (
    <PageLayout activeSection="usuarios">
      <Usuarios />
    </PageLayout>
  );
}
