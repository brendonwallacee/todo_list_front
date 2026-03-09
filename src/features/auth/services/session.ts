import 'server-only';

import { jwtDecode } from 'jwt-decode';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

interface TokenPayload {
  sub: string;
  exp: number;
}

function decodeToken(token: string) {
  return jwtDecode<TokenPayload>(token);
}

export function getUserSubFromToken(token: string) {
  try {
    return decodeToken(token).sub;
  } catch (err) {
    console.error('Token inválido', err);
    return null;
  }
}

export async function getUserSub() {
  const token = (await cookies()).get('access_token')?.value;
  if (!token) return null;

  return getUserSubFromToken(token);
}

export function isTokenValueExpired(token: string) {
  try {
    const payload = decodeToken(token);
    const currentTime = Date.now() / 1000;

    return payload.exp < currentTime;
  } catch {
    return true;
  }
}

export async function isTokenExpired(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  if (!token) {
    return true;
  }

  return isTokenValueExpired(token);
}

export async function clearSessionCookies() {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('sub');
}

export async function setSessionCookies(accessToken: string) {
  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === 'production';

  cookieStore.set('access_token', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
  });

  const sub = getUserSubFromToken(accessToken);

  if (!sub) {
    cookieStore.delete('sub');
    return;
  }

  cookieStore.set('sub', sub, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
  });
}
