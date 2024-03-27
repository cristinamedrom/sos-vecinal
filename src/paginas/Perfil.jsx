import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthProvider';
import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";

const Perfil = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (currentUser?.email) {
      const fetchData = async () => {
        const docRef = doc(db, 'users', currentUser.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("El perfil del usuario no existe.");
        }
      };
      fetchData();
    }
  }, [currentUser]);

  const onSubmit = async (data) => {
    try {
      await setDoc(doc(db, 'users', currentUser.email), {
        ...userData,
        ...data,
      }, { merge: true });
      setUserData(prev => ({...prev, ...data}));
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
    }
  };

  return (
    <div>
      {userData && (
        <>
          <h2>Perfil de {userData.fullName}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {userData.isResident ? (
              <>
                <label htmlFor="community">Comunidad</label>
                <input type="text" {...register('community', { required: userData.isResident })} defaultValue={userData.community || ''} />
                {errors.community && <span>Este campo es obligatorio</span>}

                <label htmlFor="property">Propiedad</label>
                <input type="text" {...register('property', { required: userData.isResident })} defaultValue={userData.property || ''} />
                {errors.property && <span>Este campo es obligatorio</span>}
              </>
            ) : userData.isCompany ? (
              <>
                <label htmlFor="companyType">Tipo de Empresa</label>
                <input type="text" {...register('companyType', { required: userData.isCompany })} defaultValue={userData.companyType || ''} />
                {errors.companyType && <span>Este campo es obligatorio</span>}
              </>
            ) : null}
            <button type="submit">Guardar</button>
          </form>
          <div>
            {userData.isResident && (
              <>
                <p>Comunidad: {userData.community}</p>
                <p>Propiedad: {userData.property}</p>
              </>
            )}
            {userData.isCompany && <p>Tipo de Empresa: {userData.companyType}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default Perfil;
