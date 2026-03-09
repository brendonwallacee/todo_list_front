import { TodoState } from './todo-state';
import { z } from 'zod';

export const registerTodoSchema = z.object({
  title: z
    .string()
    .min(3, 'O título precisa ter pelo menos 3 caracteres')
    .max(20, 'limite ultrapassado'),
  description: z.string(),
  state: z.enum(TodoState),
});

export type RegisterTodo = z.infer<typeof registerTodoSchema>;
