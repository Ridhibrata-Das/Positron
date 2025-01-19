import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // For now, we'll just simulate authentication
  // In a real application, you would check for valid session/token
  const isAuthenticated = true // This should be replaced with actual auth check

  // Check if the request is for a dashboard route
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      // Redirect to role selection page if not authenticated
      return NextResponse.redirect(new URL('/role-selection', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*'
} 