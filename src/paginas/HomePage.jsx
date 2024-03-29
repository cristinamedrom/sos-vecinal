import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1><img className='logo' src="https://i.ibb.co/7C6X3Jm/sos-vecinal-logo.png"/> SOS Vecinal</h1>
            <h3>¿Tienes alguna incidencia en tu Comunidad?</h3>
            <p>
                En el portal de SOS Vecinal puedes registrarte junto a todos tu vecinos para dar el aviso de las incidencias más eficientemente,
                ya que la Administración gestionará la incidencia directamente con la correspondiente empresa reparadora para que esta vaya a
                solucionar la incidencia.
            </p>

            <Link to="/login">Iniciar Sesión</Link>
            <p>
                ¿No tienes una cuenta vecinal? <Link to="/signup">Regístrate</Link>
            </p>

            <h3>¿Quieres comenzar a trabajar con Comunidades</h3>
            <p>
                Si eres empresa y quieres trabajar solucionando incidencias a las Comunidades de Propietarios, en el portal de SOS Vecinal
                se te asignarán trabajos para realizar.
            </p>

            <Link to="/login">Iniciar Sesión</Link>
            <p>
                ¿No tienes una cuenta de empresa? <Link to="/signup">Regístrate</Link>
            </p>


        </div>
    );
};

export default HomePage;