import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import prisma from '../../backend/prisma/client';

const PublicacionIncidencia = () => {
  const { currentUser } = useAuth();
  const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    type: '',
    description: ''
  });

  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        const data = await prisma.incident.findMany({
          where: {
            reportedBy: { community: currentUser.community }
          },
          orderBy: {
            createdAt: 'desc'
          }
        });
        setIncidencias(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las incidencias:', error);
      }
    };

    if (currentUser) {
      fetchIncidencias();
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await prisma.incident.create({
        data: {
          type: formData.type,
          description: formData.description,
          reportedBy: {
            connect: { id: currentUser.id }
          }
        }
      });
      setIncidencias(prevIncidencias => [...prevIncidencias, formData]);
      setFormData({ type: '', description: '' });
    } catch (error) {
      console.error('Error al publicar la incidencia:', error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Publicar Incidencia</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="type">Tipo:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Publicar</button>
      </form>

      <h2>Incidencias</h2>
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

export default PublicacionIncidencia;
