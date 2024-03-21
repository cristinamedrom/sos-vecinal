import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCompany, setIsCompany] = useState(false);
  const [isResident, setIsResident] = useState(true);

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await fetch(`${SERVER_URL}/api/registro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName,
          email: email,
        }),
      });

      navigate('/perfil');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleRegistro}>
        <label>Nombre Completo / Nombre de la Empresa</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <br />
        <br />
        <label>Correo Electrónico</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <br />
        <label>Contraseña</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <br />
        <div>
          <input type="checkbox" checked={isCompany} onChange={(e) => setIsCompany(e.target.checked)} />
          <label>Empresa</label>
        </div>
        <br />
        <div>
          <input type="checkbox" checked={isResident} onChange={(e) => setIsResident(e.target.checked)} />
          <label>Vecino</label>
        </div>
        <br />
        <br />
        <button type="submit">Registrarse</button>
      </form>

      <p>
        ¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link>
      </p>
    </div>
  );
};

export default SignUp;
