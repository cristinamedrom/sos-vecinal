import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { db } from '../config/firebase';
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

const RecepcionIncidencias = () => {
  const { currentUser } = useAuth();
  const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(currentUser.isCompany);
    if (!currentUser || !currentUser.isCompany || currentUser.isResident) {
      setLoading(false);
      return;
    }

    const fetchIncidencias = async () => {
      const q = query(
        collection(db, 'incidents'),
        where('type', '==', currentUser.companyType),
        orderBy('createdAt', 'desc')
      );

      try {
        const querySnapshot = await getDocs(q);
        const incidenciasData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate()
        }));
        setIncidencias(incidenciasData);
      } catch (error) {
        console.error('Error al obtener las incidencias:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidencias();
  }, [currentUser]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!currentUser || !currentUser.isCompany || currentUser.isResident) {
    return <div>No tienes permiso para acceder a esta página.</div>;
  }

  return (
    <div>
      <h2>Incidencias asignadas a mi empresa</h2>
      {incidencias.length > 0 ? (
        <ul>
          {incidencias.map(incidencia => (
            <li key={incidencia.id}>
              <p>Fecha de publicación: {incidencia.createdAt.toLocaleString()}</p>
              <p>Publicado por: {incidencia.reportedBy}</p>
              <p>Descripción: {incidencia.description}</p>
              <p>Tipo: {incidencia.type}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay incidencias asignadas a tu empresa en este momento.</p>
      )}
    </div>
  );
};

export default RecepcionIncidencias;
