import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthProvider';
import { db } from '../config/firebase';

const Perfil = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          const userDoc = await db.collection('users').doc(currentUser.uid).get();
          if (userDoc.exists) {
            setUserData(userDoc.data());
          } else {
            console.log('No se encontraron datos para este usuario.');
          }
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
      };
      fetchUserData();
    }
  }, [currentUser]);

  const onSubmit = async (data) => {
    try {
      await db.collection('users').doc(currentUser.uid).update(data);
      console.log('Datos del usuario actualizados correctamente.');
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
