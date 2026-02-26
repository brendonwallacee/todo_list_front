"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
  username: z.string().min(3, "Usuário deve ter pelo menos 3 caracteres"),
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string(),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas devem ser iguais",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

type FormRegisterProps = {
  action: (data: RegisterFormData) => void;
};

export default function FormRegister({ action: onSubmitForm }: FormRegisterProps) {

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  function onSubmit(data: RegisterFormData) {
    onSubmitForm(data);
  }

  return (
    <div>
      <form 
      className="flex flex-col space-y-4" 
      onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label>Usuário:</label>
          <input
            {...register("username")}
            className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 focus:outline-none focus:border-green-500"
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-1">Email:</label>
          <input
            {...register("email")}
            className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 focus:outline-none focus:border-green-500"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1">Senha:</label>
          <input
            type="password"
            {...register("password")}
            className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1">Repita a senha:</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="bg-green-600 font-bold text-font-secondary px-4 py-2 rounded-lg hover:bg-green-500 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed hover:disabled:bg-green-600"
        >
          Cadastrar
        </button>
      </form>
    </div>
  )
}