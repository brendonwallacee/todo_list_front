import 'server-only';

import { RegisterUser } from '@features/users/schemas';
import caller from '@lib/http/api-caller';

export async function registerUser(data: RegisterUser) {
  return caller('/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
