import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const NavbarResidente = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      console.log('Cierre de sesión exitoso');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav>
      <ul>
        <li><Link to="/perfil">Perfil</Link></li>
        <li><Link to="/incidencias/vecino">Publicación de incidencias</Link></li>
        <li><button onClick={handleLogout}>Cerrar sesión</button></li>
      </ul>
    </nav>
  );
};

export default NavbarResidente;
