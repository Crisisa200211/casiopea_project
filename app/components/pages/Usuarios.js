"use client";

import { useState } from 'react';

export default function Usuarios() {
  const [users] = useState([
    { id: 1, nombre: 'Juan Pérez', email: 'juan@demo.com', departamento: 'Sistemas', estado: 'Activo' },
    { id: 2, nombre: 'María García', email: 'maria@demo.com', departamento: 'RRHH', estado: 'Activo' },
    { id: 3, nombre: 'Carlos López', email: 'carlos@demo.com', departamento: 'Ventas', estado: 'Inactivo' },
    { id: 4, nombre: 'Ana Martínez', email: 'ana@demo.com', departamento: 'Administración', estado: 'Activo' },
    { id: 5, nombre: 'Pedro González', email: 'pedro@demo.com', departamento: 'Sistemas', estado: 'Activo' },
  ]);

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Usuarios</h1>
            <button className="btn btn-primary">
              <span className="material-icons me-2">add</span>
              Nuevo Usuario
            </button>
          </div>

          {/* Filtros */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <label className="form-label">Buscar por nombre</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Buscar usuario..."
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Departamento</label>
                  <select className="form-select">
                    <option value="">Todos</option>
                    <option value="sistemas">Sistemas</option>
                    <option value="rrhh">RRHH</option>
                    <option value="ventas">Ventas</option>
                    <option value="administracion">Administración</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Estado</label>
                  <select className="form-select">
                    <option value="">Todos</option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label className="form-label">&nbsp;</label>
                  <button className="btn btn-outline-primary d-block w-100">
                    <span className="material-icons">search</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de usuarios */}
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Departamento</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.nombre}</td>
                        <td>{user.email}</td>
                        <td>{user.departamento}</td>
                        <td>
                          <span className={`badge ${user.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>
                            {user.estado}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <button className="btn btn-sm btn-outline-primary" title="Editar">
                              <span className="material-icons">edit</span>
                            </button>
                            <button className="btn btn-sm btn-outline-info" title="Ver detalles">
                              <span className="material-icons">visibility</span>
                            </button>
                            <button className="btn btn-sm btn-outline-danger" title="Eliminar">
                              <span className="material-icons">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
              <nav aria-label="Paginación de usuarios">
                <ul className="pagination justify-content-center mt-4">
                  <li className="page-item disabled">
                    <span className="page-link">Anterior</span>
                  </li>
                  <li className="page-item active">
                    <span className="page-link">1</span>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">2</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">3</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">Siguiente</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
