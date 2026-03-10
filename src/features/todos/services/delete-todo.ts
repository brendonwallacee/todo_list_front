import 'server-only';

import caller from '@lib/http/api-caller';
import { Message } from '@lib/types';

export async function deleteTodo(token: string, id: number): Promise<Message> {
  return caller(`/todos/${id}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}
