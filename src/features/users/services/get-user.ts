import 'server-only';

import { User } from '@features/users/types';
import caller from '@lib/http/api-caller';

export async function getUser(token: string, sub: string): Promise<User> {
  return caller<User>(`/users/${sub}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}
