import React from 'react';
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";

export default function SignUpVecino() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: signupMutation } = useMutation({
    mutationKey: "signup",
    mutationFn: async ({ email, password, nombreCompleto }) => {
      const [nombre, apellidos] = nombreCompleto.split(' ');
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await db.collection('vecinos').doc(user.uid).set({
        nombreCompleto: nombreCompleto,
        email: email,
      });

      navigate('/');
    },
  });

  const onSubmit = async (data) => {
    signupMutation(data);
  };

  return (
    <div className="container mx-auto flex justify-center items-center flex-col min-h-[100vh] gap-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="nombreCompleto">
          Nombre y Apellidos
          <input
            className="input"
            type="text"
            name="nombreCompleto"
            {...register("nombreCompleto", { required: true })}
          />
          {errors.nombreCompleto && <span>Este campo es obligatorio</span>}
        </label>
        <label htmlFor="email">
          Email
          <input
            className="input"
            type="email"
            name="email"
            autoComplete="username"
            {...register("email", { required: true })}
          />
          {errors.email && <span>Este campo es obligatorio</span>}
        </label>
        <label htmlFor="password">
          Contraseña
          <input
            className="input"
            type="password"
            name="password"
            autoComplete="new-password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>Este campo es obligatorio</span>}
        </label>
        <button
          className="button"
          type="submit"
          disabled={signupMutation.isLoading}
        >
          Regístrate
        </button>
      </form>
    </div>
  );
}
