"use client";

import PageLayout from '../../components/common/PageLayout';
import Usuarios from '../../components/dashboard/Usuarios';

export default function UsuariosPage() {
  return (
    <PageLayout activeSection="usuarios">
      <Usuarios />
    </PageLayout>
  );
}
