import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { db } from '../config/firebase';

const RecepcionIncidencias = () => {
  const { currentUser } = useAuth();
  const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        if (!currentUser.isCompany) {
          return;
        }

        const querySnapshot = await db.collection('incidents')
          .where('type', '==', currentUser.companyType)
          .orderBy('createdAt', 'desc')
          .get();

        const data = querySnapshot.docs.map(doc => doc.data());
        setIncidencias(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las incidencias:', error);
      }
    };

    if (currentUser && currentUser.isCompany) {
      fetchIncidencias();
    }
  }, [currentUser]);

  if (!currentUser || !currentUser.isCompany) {
    return <div>No tienes permiso para acceder a esta página.</div>;
  }

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Recepción de Incidencias</h2>
      <ul>
        {incidencias.map(incidencia => (
          <li key={incidencia.id}>
            <p>Tipo: {incidencia.type}</p>
            <p>Descripción: {incidencia.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecepcionIncidencias;
