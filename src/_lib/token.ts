import { jwtDecode } from 'jwt-decode';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

interface TokenPayload {
  sub: string;
  exp: number;
}

export async function getUserSub() {
  const token = (await cookies()).get('access_token');
  if (!token) return null;

  try {
    const payload = jwtDecode<TokenPayload>(token.value);
    return payload.sub;
  } catch (err) {
    console.error('Token inválido', err);
    return null;
  }
}

export async function isTokenExpired(request: NextRequest) {
  const token = request.cookies.get('access_token');
  if (!token) {
    await fetch('/api/logout');
    return true;
  }
  try {
    const payload = jwtDecode<TokenPayload>(token.value);

    const currentTime = Date.now() / 1000;

    return payload.exp < currentTime;
  } catch {
    await fetch('/api/logout');
    return true;
  }
}
