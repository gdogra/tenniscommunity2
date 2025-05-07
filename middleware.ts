// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt'; // alternative: custom JWT verification
import { auth } from './src/lib/firebase'; // only used if calling Firebase Admin

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('__session')?.value;

  // If no auth cookie/token, block access to protected routes
  const isLoggedIn = !!token;

  const { pathname } = request.nextUrl;

  const protectedPaths = ['/dashboard', '/matches'];
  const authPages = ['/login', '/signup'];

  // Redirect unauthenticated users from protected routes
  if (protectedPaths.some((path) => pathname.startsWith(path)) && !isLoggedIn) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  if (authPages.includes(pathname) && isLoggedIn) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/matches/:path*', '/login', '/signup'],
};
