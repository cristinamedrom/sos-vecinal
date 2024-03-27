import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthProvider';
import { db } from '../config/firebase';
import { collection, query, where, orderBy, getDocs, addDoc } from "firebase/firestore";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

const PublicacionIncidencia = () => {
  const { currentUser } = useAuth();
  const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [userCommunity, setUserCommunity] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (currentUser?.email) {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', currentUser.email));
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs[0]?.data();

        if (userData?.community) {
          setUserCommunity(userData.community);
          fetchIncidencias(userData.community);
        } else {
          console.log("No se encontró la comunidad del usuario.");
        }
      }
    };

    const fetchIncidencias = async (community) => {
      const q = query(
        collection(db, 'incidents'),
        where('community', '==', community),
        orderBy('createdAt', 'desc')
      );

      try {
        const querySnapshot = await getDocs(q);
        const incidenciasData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setIncidencias(incidenciasData);
      } catch (error) {
        console.error('Error al obtener las incidencias:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [currentUser, db]);

  const onSubmit = async (data) => {
    if (!userCommunity) {
      console.error('La comunidad del usuario no está definida.');
      return;
    }

    try {
      await addDoc(collection(db, 'incidents'), {
        ...data,
        community: userCommunity,
        reportedBy: currentUser.email,
        createdAt: new Date()
      });
      reset();
    } catch (error) {
      console.error('Error al publicar la incidencia:', error);
    }
  };

  const timeZone = 'Europe/Madrid';

  return (
    <div>
      <h2>Publicar Incidencia</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="type">Tipo:</label>
        <input type="text" id="type" {...register('type', { required: true })} />
        {errors.type && <span>Este campo es obligatorio</span>}

        <label htmlFor="description">Descripción:</label>
        <textarea id="description" {...register('description', { required: true })}></textarea>
        {errors.description && <span>Este campo es obligatorio</span>}

        <button type="submit">Publicar</button>
      </form>

      {loading ? <p>Cargando incidencias...</p> : (
        <>
          <h2>Incidencias</h2>
          <ul>
            {incidencias.map(incidencia => {
              const dateInSpain = utcToZonedTime(incidencia.createdAt.toDate(), timeZone);
              const formattedDate = format(dateInSpain, 'Pp', { locale: es });
              
              return (
                <li key={incidencia.id}>
                  <p>Fecha de publicación: {formattedDate}</p>
                  <p>Reportado por: {incidencia.reportedBy}</p>
                  <p>Tipo: {incidencia.type}</p>
                  <p>Descripción: {incidencia.description}</p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default PublicacionIncidencia;
