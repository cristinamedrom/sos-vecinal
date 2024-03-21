import React from 'react';
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";

export default function SignUpEmpresas() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: signupMutation } = useMutation({
    mutationKey: "signup",
    mutationFn: async ({ nombreEmpresa, email, password }) => {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await db.collection('empresas').doc(user.uid).set({
        nombreEmpresa: nombreEmpresa,
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
        <label htmlFor="nombreEmpresa">
          Nombre de la Empresa
          <input
            className="input"
            type="text"
            name="nombreEmpresa"
            {...register("nombreEmpresa", { required: true })}
          />
          {errors.nombreEmpresa && <span>Este campo es obligatorio.</span>}
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
          {errors.email && <span>Este campo es obligatorio.</span>}
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
          {errors.password && <span>Este campo es obligatorio.</span>}
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
