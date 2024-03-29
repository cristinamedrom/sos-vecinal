import React, { useState } from 'react';
import { Routes, Route, useLocation, BrowserRouter, useNavigate } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import HomePage from "./paginas/HomePage";
import Login from './paginas/Login';
import SignUp from './paginas/SignUp';
import PublicacionIncidencia from './paginas/PublicacionIncidencia';
import RecepcionIncidencias from './paginas/RecepcionIncidencias';
import Perfil from './paginas/Perfil';
import { auth } from './config/firebase';


const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (userData) => {
    try {
      const { email, password } = userData;
      await auth.signInWithEmailAndPassword(email, password);
      setCurrentUser(userData);
      console.log('Inicio de sesión exitoso');
    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      setCurrentUser(null);
      console.log('Cierre de sesión exitoso');
      navigate('/');
    }).catch((error) => {
      console.error('Error al cerrar sesión', error);
    });
  };

  const handleRegister = (user) => {
    console.log('Registro exitoso:', user);
  };

  return (
    <div>
      {location.pathname !== "/" && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/incidencias/vecino" element={<PublicacionIncidencia />} />
        <Route path="/incidencias/empresa" element={<RecepcionIncidencias />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </div>
  );
};


export default App;
