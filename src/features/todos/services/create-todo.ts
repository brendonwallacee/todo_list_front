import 'server-only';

import { RegisterTodo } from '@features/todos/schemas';
import caller from '@lib/http/api-caller';

export async function createTodo(token: string, data: RegisterTodo) {
  return caller('/todos/', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
