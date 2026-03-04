import { z } from 'zod';
import { TodoState } from '@root/public/enums';

export const todoInputSchema = z.object({
  title: z
    .string()
    .min(3, 'O título precisa ter pelo menos 3 caracteres')
    .max(20, 'limite ultrapassado'),
  description: z.string(),
  state: z.enum(TodoState),
});

export const userSchema = z.object({
  username: z.string().min(3, 'Usuário deve ter pelo menos 3 caracteres'),
  email: z.email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export type TodoInput = z.infer<typeof todoInputSchema>;
export type UserInput = z.infer<typeof userSchema>;
