"use client";

import { useState, useEffect } from 'react';
import AddUserModal from '../modal/AddUserModal';
import { getAllUsers, updateUser, createUser } from '../../lib/api/auth';

export default function Usuarios() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchName, setSearchName] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // Para manejar el usuario en edición
  const [currentPage, setCurrentPage] = useState(1);
  const USERS_PER_PAGE = 5;

  // Cargar usuarios al montar el componente
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await getAllUsers();
      
      if (result.success) {
        setUsers(result.data);
      } else {
        setError(result.error || 'Error al cargar usuarios');
      }
    } catch (error) {
      console.error('Error cargando usuarios:', error);
      setError('Error inesperado al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  // Función helper para formatear el nombre completo
  const getFullName = (user) => {
    return `${user.name} ${user.lastName}`.trim();
  };

  // Función helper para formatear el rol
  const formatRole = (role) => {
    switch (role) {
      case 'super-admin':
        return 'Super Administrador';
      case 'user':
        return 'Usuario';
      default:
        return role;
    }
  };

  // Filtrar usuarios
  const filteredUsers = users.filter(user => {
    const fullName = getFullName(user);
    const matchesName = fullName.toLowerCase().includes(searchName.toLowerCase());
    const userRole = formatRole(user.rol);
    const matchesRole = filterRole === '' || userRole.toLowerCase().includes(filterRole.toLowerCase());
    return matchesName && matchesRole;
  });

  // Paginación
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Funciones de paginación
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Reset página cuando cambian los filtros
  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
    setCurrentPage(1);
  };

  const handleRoleFilterChange = (e) => {
    setFilterRole(e.target.value);
    setCurrentPage(1);
  };

  const handleModifyUser = (userId) => {
    const userToEdit = users.find(user => user.id === userId);
    if (userToEdit) {
      setEditingUser(userToEdit);
      setShowAddUserModal(true);
    }
  };

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleCloseModal = () => {
    setShowAddUserModal(false);
    setEditingUser(null); // Limpiar el usuario en edición
  };

  const handleSaveUser = async (userData) => {
    try {
      if (editingUser) {
        // Estamos editando un usuario existente
        const result = await updateUser(editingUser.id, userData);
        
        if (result.success) {
          // Recargar la lista de usuarios
          await loadUsers();
          
          // Devolver resultado exitoso al modal
          return { success: true, message: result.message };
        } else {
          console.error('Error al actualizar usuario:', result.error);
          // Devolver error al modal
          return { success: false, error: result.error };
        }
      } else {
        // Estamos creando un nuevo usuario
        const newUserData = {
          email: userData.email,
          name: userData.nombres,
          lastName: userData.apellidos,
          phoneNumber: userData.telefono,
          password: userData.password
        };
        
        const result = await createUser(newUserData);
        
        if (result.success) {
          // Recargar la lista de usuarios
          await loadUsers();
          
          // Devolver resultado exitoso al modal
          return { success: true, message: result.message };
        } else {
          console.error('Error al crear usuario:', result.error);
          // Devolver error al modal
          return { success: false, error: result.error };
        }
      }
    } catch (error) {
      console.error('Error en handleSaveUser:', error);
      return { success: false, error: 'Error inesperado al procesar la solicitud' };
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="mb-0">Usuarios</h1>
            <div className="d-flex gap-2">
              <button 
                className="btn btn-outline-secondary d-flex align-items-center"
                onClick={loadUsers}
                disabled={loading}
              >
                <span className="material-icons me-2">refresh</span>
                Actualizar
              </button>
              <button 
                className="btn btn-primary d-flex align-items-center"
                onClick={handleAddUser}
              >
                <span className="material-icons me-2">add</span>
                Agregar Usuario
              </button>
            </div>
          </div>

          {/* Filtros */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <label className="form-label">Buscar por nombre</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Buscar usuario..."
                    value={searchName}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Filtrar por rol</label>
                  <select 
                    className="form-select"
                    value={filterRole}
                    onChange={handleRoleFilterChange}
                  >
                    <option value="">Todos los roles</option>
                    <option value="usuario">Usuario</option>
                    <option value="super administrador">Super Administrador</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="alert alert-danger" role="alert">
              <span className="material-icons me-2">error</span>
              {error}
              <button 
                className="btn btn-sm btn-outline-danger ms-3"
                onClick={loadUsers}
              >
                Reintentar
              </button>
            </div>
          )}

          {/* Tabla de usuarios */}
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Lista de Usuarios</h5>
              {!loading && (
                <span className="badge bg-info">
                  {filteredUsers.length} usuario{filteredUsers.length !== 1 ? 's' : ''} encontrado{filteredUsers.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p className="mt-2 text-muted">Cargando usuarios...</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>Nombre Completo</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.length > 0 ? (
                        currentUsers.map((user) => (
                          <tr key={user.id}>
                            <td>{getFullName(user)}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td>
                              <span className={`badge ${user.rol === 'super-admin' ? 'bg-danger' : 'bg-primary'}`}>
                                {formatRole(user.rol)}
                              </span>
                            </td>
                            <td>
                              <button 
                                className="btn btn-sm btn-outline-primary" 
                                title="Modificar"
                                onClick={() => handleModifyUser(user.id)}
                              >
                                <span className="material-icons">edit</span>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center py-4">
                            <div className="text-muted">
                              <span className="material-icons mb-2" style={{fontSize: '3rem'}}>search_off</span>
                              <p className="mb-0">No se encontraron usuarios que coincidan con los filtros aplicados.</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Paginación */}
              {filteredUsers.length > USERS_PER_PAGE && (
                <nav aria-label="Paginación de usuarios">
                  <ul className="pagination justify-content-center mt-4">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                      >
                        Anterior
                      </button>
                    </li>
                    
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                          <button 
                            className="page-link"
                            onClick={() => handlePageChange(pageNumber)}
                          >
                            {pageNumber}
                          </button>
                        </li>
                      );
                    })}
                    
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                      >
                        Siguiente
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal para agregar/editar usuario */}
      <AddUserModal 
        isOpen={showAddUserModal}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
        editingUser={editingUser} // Pasar los datos del usuario en edición
      />
    </div>
  );
}
