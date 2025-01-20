import { verifyToken } from './server/utils/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get('token')?.value;

  if (pathname.startsWith('/dashboard')) {
    if (!token || !(verifyToken(token))) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } else if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
    if (token && verifyToken(token)) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  } else if (pathname.startsWith('/api') && !pathname.startsWith('/api/auth')) {
    if (!token || !(verifyToken(token))) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/signup',
    '/api/:path*'
  ]
};