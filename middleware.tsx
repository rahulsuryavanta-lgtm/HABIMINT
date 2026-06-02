import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookies = request.cookies.get('habi_token');

  const { pathname } = new URL(request.url);


  const authPage = ['/login'];

  if (authPage.includes(pathname)) {
    if (!cookies) {
      return;
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  return

}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};
