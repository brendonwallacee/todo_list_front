import { isTokenExpired } from '@features/auth/services/session';
import { cookies } from 'next/headers';
import { type MiddlewareConfig, NextRequest, NextResponse } from 'next/server';

const publicRoutes = [
  { path: '/', whenAuthenticated: 'next' },
  { path: '/register', whenAuthenticated: 'redirect' },
  { path: '/login', whenAuthenticated: 'redirect' },
  { path: '/hello', whenAuthenticated: 'next' },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/';

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path == path);
  const token = request.cookies.get('access_token')?.value;

  if (!token && publicRoute) {
    return NextResponse.next();
  }

  if (!token && !publicRoute) {
    const redirectUrl = new URL(
      REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE,
      request.url,
    );

    return NextResponse.redirect(redirectUrl);
  }

  if (token && publicRoute && publicRoute.whenAuthenticated == 'redirect') {
    const redirectUrl = new URL('/dashboard', request.url);

    return NextResponse.redirect(redirectUrl);
  }

  if (token && !publicRoute) {
    const isExpired = await isTokenExpired(request);
    if (!isExpired) {
      return NextResponse.next();
    } else {
      (await cookies()).delete('access_token');
      (await cookies()).delete('sub');
      const redirectUrl = new URL(
        REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE,
        request.url,
      );
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
};
