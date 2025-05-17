import { NextResponse } from 'next/server';

// Add any paths that should be accessible without authentication
const publicPaths = [
  '/Login/Student_Login',
  '/Login/Admin_Login',
  '/signup/student',
  '/',
  '/forgot-password/student'
];

export function middleware(request) {
  const token = request.cookies.get('studentToken');
  const { pathname } = request.nextUrl;

  // Check if the path is public
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // If the path is not public and there's no token, redirect to login
  if (!isPublicPath && !token) {
    const loginUrl = new URL('/Login/Student_Login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If we have a token and try to access login/signup pages, redirect to dashboard
  if (token && isPublicPath) {
    const dashboardUrl = new URL('/student/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 