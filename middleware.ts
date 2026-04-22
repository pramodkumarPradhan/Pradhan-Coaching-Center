import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the user is trying to access a protected route
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    // Check if the auth cookie exists
    const adminToken = request.cookies.get('admin_token');

    // If there is no token, redirect to the login page
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
