import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { db } from '../config/firebase';

const Perfil = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      const fetchData = async () => {
        try {
          const docRef = db.collection('users').doc(currentUser.uid);
          const docSnapshot = await docRef.get();
          if (docSnapshot.exists()) {
            setUserData(docSnapshot.data());
          }
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
      };
      fetchData();
    }
  }, [currentUser]);

  const onSubmit = async (data) => {
    try {
      await db.collection('users').doc(currentUser.uid).set(data, { merge: true });
      navigate('/');
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
    }
  };

  return (
    <div>
      {userData && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Perfil de {userData.fullName}</h2>
          {userData.isResident && (
            <>
              <label htmlFor="community">Comunidad</label>
              <input
                className="input"
                type="text"
                name="community"
                defaultValue={userData.community}
                {...register('community', { required: true })}
              />
              {errors.community && <span>Este campo es obligatorio</span>}
              <label htmlFor="property">Propiedad</label>
              <input
                className="input"
                type="text"
                name="property"
                defaultValue={userData.property}
                {...register('property', { required: true })}
              />
              {errors.property && <span>Este campo es obligatorio</span>}
            </>
          )}
          {userData.isCompany && (
            <>
              <label htmlFor="companyType">Tipo de Empresa</label>
              <input
                className="input"
                type="text"
                name="companyType"
                defaultValue={userData.companyType}
                {...register('companyType', { required: true })}
              />
              {errors.companyType && <span>Este campo es obligatorio</span>}
            </>
          )}
          <button className="button" type="submit">Guardar</button>
        </form>
      )}
    </div>
  );
};

export default Perfil;
