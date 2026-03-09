import 'server-only';

import caller from '@lib/http/api-caller';

type LoginResponse = {
  access_token: string;
  token_type?: string;
};

export async function loginUser(
  username: string,
  password: string,
): Promise<LoginResponse> {
  const params = new URLSearchParams({
    username,
    password,
  });

  return caller<LoginResponse>('/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });
}
