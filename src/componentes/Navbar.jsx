import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Navbar = ({ onLogout }) => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  return (
    <nav>
      <div className='navFlex'>
        <p>
          <Link to="/perfil">Perfil</Link>
        </p>
         
          <p>
            <Link to="/incidencias/empresa">Recepción de incidencias</Link>
          </p>
        
        
          <p>
            <Link to="/incidencias/vecino">Publicación de incidencias</Link>
          </p>
        
        <p onClick={onLogout}>Cerrar sesión</p>
      </div>
    </nav>
  );
};

export default Navbar;
