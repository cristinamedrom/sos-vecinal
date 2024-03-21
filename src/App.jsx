import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from "./paginas/HomePage";
import Login from './paginas/Login';
import SignUp from './paginas/SignUp';
import PublicacionIncidencia from './paginas/PublicacionIncidencia';
import RecepcionIncidencias from './paginas/RecepcionIncidencias';
import Perfil from './paginas/Perfil';
import NavbarResidente from './componentes/NavbarResidente';
import NavbarEmpresa from './componentes/NavbarEmpresa';
import RequireAuth from "./componentes/ProtectedRoute";
import { auth } from './config/firebase';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

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
    auth.signOut();
    setCurrentUser(null);
    console.log('Cierre de sesión exitoso');
  };

  const handleRegister = (user) => {
    console.log('Registro exitoso:', user);
  };

  return (
    <div>
      {currentUser?.isResident && <NavbarResidente />}
      {currentUser?.isCompany && <NavbarEmpresa />}
      
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
