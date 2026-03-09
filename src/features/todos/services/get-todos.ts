import 'server-only';

import { TodoList } from '@features/todos/types';
import caller from '@lib/http/api-caller';

export async function getTodos(token: string): Promise<TodoList> {
  return caller<TodoList>('/todos/?limit=10&offset=0', {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}
